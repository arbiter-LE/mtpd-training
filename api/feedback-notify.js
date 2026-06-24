import tls from 'node:tls';

// Emails Andrew whenever an officer files a content flag. Triggered by a
// Supabase Database Webhook on INSERT into public.feedback (configured on
// each department's project), NOT by the browser — so the notification
// can't be spoofed or skipped, and fires on the real DB row.
//
// Sends through Google Workspace SMTP, same proven path as api/contact.js
// (Resend junks at agency mail filters; Google inboxes reliably). Kept
// self-contained — no shared import — so this never affects the contact form.
//
// Required Vercel env vars:
//   GMAIL_USER             — Workspace mailbox (defaults to andrew@arbiterle.com)
//   GMAIL_APP_PASSWORD     — Google App Password for that mailbox (already set)
//   FEEDBACK_NOTIFY_SECRET — shared secret; must match the webhook's
//                            x-feedback-secret header on every Supabase project

const SMTP_HOST = 'smtp.gmail.com';
const SMTP_PORT = 465; // implicit TLS
const GMAIL_USER = process.env.GMAIL_USER || 'andrew@arbiterle.com';
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
const NOTIFY_SECRET = process.env.FEEDBACK_NOTIFY_SECRET;

// Strip CR/LF so field values can't inject extra SMTP headers.
const cleanHeader = (s = '') => String(s).replace(/[\r\n]+/g, ' ').trim();

// Escape HTML so flag text can't inject markup into the notification email.
const esc = (s = '') => String(s)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

const CATEGORY_LABELS = {
  legal:    'Legal Reference / Case Law',
  sop:      'Order / SOP',
  scenario: 'Scenario Issue',
  quiz:     'Quiz Question',
  content:  'Content Accuracy',
  other:    'Other',
};

// Minimal SMTP-over-TLS sender. SMTP is lock-step: read one reply, send the
// next command, repeat. Throws on any unexpected status.
function sendMail({ from, to, subject, html }) {
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
          `Subject: ${subject}`,
          `Date: ${new Date().toUTCString()}`,
          'MIME-Version: 1.0',
          'Content-Type: text/html; charset=utf-8',
        ].join('\r\n');

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

  // Reject anything without the shared secret — keeps the endpoint from being
  // used to spam the inbox. Fails closed if the env var isn't configured.
  if (!NOTIFY_SECRET || req.headers['x-feedback-secret'] !== NOTIFY_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (!GMAIL_APP_PASSWORD) {
    console.error('feedback-notify: GMAIL_APP_PASSWORD not set');
    return res.status(500).json({ error: 'Email not configured' });
  }

  // Supabase webhook payload: { type, table, record, old_record, ... }
  const record = (req.body && req.body.record) || req.body || {};
  const dept = cleanHeader(req.headers['x-dept'] || 'Arbiter LE');
  const badge   = esc(record.badge_number || 'unknown');
  const modTitle = esc(record.module_title || record.module_id || 'General');
  const catLabel = esc(CATEGORY_LABELS[record.category] || record.category || 'Other');
  const text    = esc(record.feedback || '(no description provided)');
  const when    = record.submitted_at
    ? new Date(record.submitted_at).toLocaleString('en-US', { timeZone: 'America/New_York' }) + ' ET'
    : new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }) + ' ET';

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;color:#1a2a3a">
      <div style="background:#0f1e2e;padding:24px 32px;border-bottom:3px solid #c8902a">
        <span style="color:#c8902a;font-weight:800;font-size:18px;letter-spacing:2px">ARBITER LE</span>
        <span style="color:#8aabcc;font-size:13px;margin-left:12px">Content Flag · ${esc(dept)}</span>
      </div>
      <div style="padding:32px">
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:8px 0;color:#8aabcc;font-size:12px;width:130px">DEPARTMENT</td><td style="padding:8px 0;font-weight:600">${esc(dept)}</td></tr>
          <tr><td style="padding:8px 0;color:#8aabcc;font-size:12px">MODULE</td><td style="padding:8px 0;font-weight:600">${modTitle}</td></tr>
          <tr><td style="padding:8px 0;color:#8aabcc;font-size:12px">CATEGORY</td><td style="padding:8px 0">${catLabel}</td></tr>
          <tr><td style="padding:8px 0;color:#8aabcc;font-size:12px">BADGE</td><td style="padding:8px 0">${badge}</td></tr>
          <tr><td style="padding:8px 0;color:#8aabcc;font-size:12px">SUBMITTED</td><td style="padding:8px 0">${esc(when)}</td></tr>
        </table>
        <div style="margin-top:20px;padding:16px 20px;background:#f5f7f9;border-left:3px solid #c8902a;border-radius:3px">
          <div style="color:#8aabcc;font-size:11px;letter-spacing:1px;margin-bottom:8px">DESCRIPTION</div>
          <div style="white-space:pre-wrap;line-height:1.5">${text}</div>
        </div>
        <div style="margin-top:24px;padding-top:20px;border-top:1px solid #e5e5e5;color:#8aabcc;font-size:12px">
          Review and resolve in the admin panel's <strong>Feedback</strong> tab.
        </div>
      </div>
    </div>
  `;

  try {
    await sendMail({
      from: `Arbiter LE <${GMAIL_USER}>`,
      to: GMAIL_USER,
      subject: cleanHeader(`🚩 Content Flag — ${dept} · ${record.module_title || record.module_id || 'General'}`),
      html,
    });
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('feedback-notify error:', err);
    return res.status(500).json({ error: 'Email failed' });
  }
}
