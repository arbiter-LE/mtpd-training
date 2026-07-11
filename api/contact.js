import { sendMail, cleanHeader, esc, GMAIL_USER, GMAIL_APP_PASSWORD } from './_lib/smtp.js';

// Demo-request notifications. The Google Workspace SMTP sender (never
// Resend) is shared with the other notification endpoints — see
// api/_lib/smtp.js for the transport and required Vercel env vars.

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
