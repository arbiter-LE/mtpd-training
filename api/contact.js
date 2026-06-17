import tls from 'node:tls';

// Demo-request notifications send through Google Workspace SMTP (not Resend).
// Google's sending reputation reliably inboxes; Resend's shared IPs were unreliable.
// Uses only Node's built-in tls — no dependencies, no build step.
//
// Required Vercel env vars:
//   GMAIL_USER          — the Workspace mailbox (defaults to andrew@arbiterle.com)
//   GMAIL_APP_PASSWORD  — a Google App Password for that mailbox (16 chars)

const SMTP_HOST = 'smtp.gmail.com';
const SMTP_PORT = 465; // implicit TLS
const GMAIL_USER = process.env.GMAIL_USER || 'andrew@arbiterle.com';
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;

// Strip CR/LF so user-supplied fields can't inject extra SMTP headers.
const cleanHeader = (s = '') => String(s).replace(/[\r\n]+/g, ' ').trim();

// Escape HTML so user input can't inject markup into the notification email.
const esc = (s = '') => String(s)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

// Minimal SMTP-over-TLS sender. SMTP is lock-step, so we read one reply,
// send the next command, and repeat. Throws on any unexpected status.
function sendMail({ from, to, replyTo, subject, html }) {
  return new Promise((resolve, reject) => {
    const socket = tls.connect(SMTP_PORT, SMTP_HOST, { servername: SMTP_HOST });
    socket.setEncoding('utf8');
    socket.setTimeout(15000);

    let buffer = '';
    let resolveStep = null;

    const fail = (e) => {
      try { socket.destroy(); } catch { /* already closed */ }
      reject(e instanceof Error ? e : new Error(String(e)));
    };

    socket.on('timeout', () => fail(new Error('SMTP timeout')));
    socket.on('error', fail);

    // A complete SMTP reply ends in a line "NNN <text>" (space after the code).
    socket.on('data', (chunk) => {
      buffer += chunk;
      const lines = buffer.split('\r\n').filter(Boolean);
      const last = lines[lines.length - 1];
      if (last && /^\d{3} /.test(last)) {
        const code = parseInt(last.slice(0, 3), 10);
        const full = buffer;
        buffer = '';
        if (resolveStep) {
          const r = resolveStep;
          resolveStep = null;
          r({ code, full });
        }
      }
    });

    const read = () => new Promise((res) => { resolveStep = res; });
    const expect = ({ code, full }, ok, ctx) => {
      if (!ok.includes(code)) throw new Error(`SMTP ${ctx} failed: ${full.trim()}`);
    };

    (async () => {
      try {
        expect(await read(), [220], 'greeting');
        socket.write('EHLO arbiterle.com\r\n');
        expect(await read(), [250], 'EHLO');

        socket.write('AUTH LOGIN\r\n');
        expect(await read(), [334], 'AUTH');
        socket.write(Buffer.from(GMAIL_USER).toString('base64') + '\r\n');
        expect(await read(), [334], 'AUTH user');
        socket.write(Buffer.from(GMAIL_APP_PASSWORD).toString('base64') + '\r\n');
        expect(await read(), [235], 'AUTH password');

        socket.write(`MAIL FROM:<${GMAIL_USER}>\r\n`);
        expect(await read(), [250], 'MAIL FROM');
        socket.write(`RCPT TO:<${to}>\r\n`);
        expect(await read(), [250, 251], 'RCPT TO');
        socket.write('DATA\r\n');
        expect(await read(), [354], 'DATA');

        const headers = [
          `From: ${from}`,
          `To: ${to}`,
          replyTo ? `Reply-To: ${replyTo}` : null,
          `Subject: ${subject}`,
          `Date: ${new Date().toUTCString()}`,
          'MIME-Version: 1.0',
          'Content-Type: text/html; charset=utf-8',
        ].filter(Boolean).join('\r\n');

        // Normalize newlines and dot-stuff lines that begin with '.'.
        const body = html.replace(/\r?\n/g, '\r\n').replace(/\r\n\./g, '\r\n..');
        socket.write(`${headers}\r\n\r\n${body}\r\n.\r\n`);
        expect(await read(), [250], 'message body');

        socket.write('QUIT\r\n');
        socket.end();
        resolve();
      } catch (e) {
        fail(e);
      }
    })();
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, title, department, size, email, message } = req.body || {};

  // Basic validation
  if (!name || !department || !email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  if (!GMAIL_APP_PASSWORD) {
    console.error('Contact handler: GMAIL_APP_PASSWORD not set');
    return res.status(500).json({ error: 'Email not configured' });
  }

  const firstName = String(name).split(' ')[0];

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;color:#1a2a3a">
      <div style="background:#0f1e2e;padding:24px 32px;border-bottom:3px solid #c8902a">
        <span style="color:#c8902a;font-weight:800;font-size:18px;letter-spacing:2px">ARBITER LE</span>
        <span style="color:#8aabcc;font-size:13px;margin-left:12px">Demo Request</span>
      </div>
      <div style="padding:32px">
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:8px 0;color:#8aabcc;font-size:12px;width:130px">NAME</td><td style="padding:8px 0;font-weight:600">${esc(name)}</td></tr>
          <tr><td style="padding:8px 0;color:#8aabcc;font-size:12px">TITLE</td><td style="padding:8px 0">${esc(title) || '—'}</td></tr>
          <tr><td style="padding:8px 0;color:#8aabcc;font-size:12px">DEPARTMENT</td><td style="padding:8px 0;font-weight:600">${esc(department)}</td></tr>
          <tr><td style="padding:8px 0;color:#8aabcc;font-size:12px">OFFICERS</td><td style="padding:8px 0">${esc(size) || '—'}</td></tr>
          <tr><td style="padding:8px 0;color:#8aabcc;font-size:12px">EMAIL</td><td style="padding:8px 0"><a href="mailto:${esc(email)}" style="color:#c8902a">${esc(email)}</a></td></tr>
          ${message ? `<tr><td style="padding:8px 0;color:#8aabcc;font-size:12px;vertical-align:top">MESSAGE</td><td style="padding:8px 0">${esc(message)}</td></tr>` : ''}
        </table>
        <div style="margin-top:24px;padding-top:24px;border-top:1px solid #e5e5e5">
          <a href="mailto:${esc(email)}?subject=Re: Arbiter LE Demo Request" style="background:#c8902a;color:#fff;text-decoration:none;padding:12px 28px;border-radius:3px;font-weight:700;font-size:13px;letter-spacing:1px">Reply to ${esc(firstName)}</a>
        </div>
      </div>
    </div>
  `;

  try {
    await sendMail({
      from: `Arbiter LE <${GMAIL_USER}>`,
      to: GMAIL_USER,
      replyTo: cleanHeader(email),
      subject: cleanHeader(`Demo Request — ${department}`),
      html,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Contact handler error:', err);
    return res.status(500).json({ error: 'Email failed' });
  }
}
