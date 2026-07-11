import tls from 'node:tls';

// Shared Google Workspace SMTP sender for the api/ functions (contact form,
// onboarding submissions). Google's sending reputation reliably inboxes;
// Resend's shared IPs were junked by Microsoft/O365 filters — never send
// through Resend. Uses only Node's built-in tls — no dependencies, no build
// step. Vercel does not expose files under api/_lib/ as endpoints, and this
// path must NOT go in .vercelignore (the functions import it at build time).
//
// Required Vercel env vars:
//   GMAIL_USER          — the Workspace mailbox (defaults to andrew@arbiterle.com)
//   GMAIL_APP_PASSWORD  — a Google App Password for that mailbox (16 chars)

const SMTP_HOST = 'smtp.gmail.com';
const SMTP_PORT = 465; // implicit TLS

export const GMAIL_USER = process.env.GMAIL_USER || 'andrew@arbiterle.com';
export const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;

// Strip CR/LF so user-supplied fields can't inject extra SMTP headers.
export const cleanHeader = (s = '') => String(s).replace(/[\r\n]+/g, ' ').trim();

// Escape HTML so user input can't inject markup into the notification email.
export const esc = (s = '') => String(s)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

// Minimal SMTP-over-TLS sender. SMTP is lock-step, so we read one reply,
// send the next command, and repeat. Throws on any unexpected status.
export function sendMail({ from, to, replyTo, subject, html }) {
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
