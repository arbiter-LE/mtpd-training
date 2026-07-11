import { sendMail, cleanHeader, esc, GMAIL_USER, GMAIL_APP_PASSWORD } from './_lib/smtp.js';

// Agency onboarding submissions (arbiterle.com/onboarding, final step) POST
// here so Andrew is notified the moment a chief submits — the downloadable
// .txt the form also produces is a receipt/backup, not the delivery path.
// The form degrades gracefully: if this endpoint fails, the chief still gets
// the file plus the manual "email it to andrew@" instructions.
//
// Attachments (roster spreadsheet, badge image, signed documents) still
// arrive by email from the agency — this carries the form data only.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const b = req.body || {};
  const {
    agencyName, agencyShort, subdomain, state, jurisdiction,
    goLive, billingName, billingEmail, rosterFileName, sopLink,
    policyUOF, policyPursuits, policyDV, notes,
  } = b;
  const roads = Array.isArray(b.roads) ? b.roads.map(r => String(r)).filter(Boolean).slice(0, 40) : [];
  const adminBadges = Array.isArray(b.adminBadges) ? b.adminBadges.map(x => String(x)).filter(Boolean).slice(0, 40) : [];

  if (!agencyName || !billingEmail) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  if (!GMAIL_APP_PASSWORD) {
    console.error('Onboard handler: GMAIL_APP_PASSWORD not set');
    return res.status(500).json({ error: 'Email not configured' });
  }

  const row = (label, value, strong) => `
    <tr><td style="padding:7px 0;color:#8aabcc;font-size:12px;width:170px;vertical-align:top">${label}</td>
    <td style="padding:7px 0;${strong ? 'font-weight:600' : ''}">${esc(String(value || '')) || '—'}</td></tr>`;

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:640px;color:#1a2a3a">
      <div style="background:#0f1e2e;padding:24px 32px;border-bottom:3px solid #c8902a">
        <span style="color:#c8902a;font-weight:800;font-size:18px;letter-spacing:2px">ARBITER LE</span>
        <span style="color:#8aabcc;font-size:13px;margin-left:12px">Agency Onboarding Submission</span>
      </div>
      <div style="padding:32px">
        <p style="margin:0 0 18px;font-size:15px"><b>${esc(agencyName)}</b> submitted the onboarding application.</p>

        <p style="margin:18px 0 4px;color:#0f1e2e;font-weight:700;font-size:12px;letter-spacing:1px">AGENCY IDENTITY</p>
        <table style="width:100%;border-collapse:collapse">
          ${row('Full Legal Name', agencyName, true)}
          ${row('Abbreviation', agencyShort)}
          ${row('Requested Platform URL', subdomain ? subdomain + '.arbiterle.com' : '')}
          ${row('State', state)}
          ${row('Jurisdiction Type', jurisdiction)}
        </table>

        <p style="margin:18px 0 4px;color:#0f1e2e;font-weight:700;font-size:12px;letter-spacing:1px">ROSTER</p>
        <table style="width:100%;border-collapse:collapse">
          ${row('Roster File (arrives by email)', rosterFileName)}
          ${row('SOP / Policy Link', sopLink)}
          ${row('Admin Badge #s', adminBadges.join(', '))}
        </table>

        <p style="margin:18px 0 4px;color:#0f1e2e;font-weight:700;font-size:12px;letter-spacing:1px">LOCALIZATION</p>
        <table style="width:100%;border-collapse:collapse">
          ${row('Roads / Intersections', roads.length ? roads.map(esc).join('<br/>') : '')}
          ${row('Use of Force Policy', policyUOF)}
          ${row('Motor Vehicle Pursuits', policyPursuits)}
          ${row('Domestic Violence Policy', policyDV)}
          ${row('Additional Notes', notes)}
        </table>

        <p style="margin:18px 0 4px;color:#0f1e2e;font-weight:700;font-size:12px;letter-spacing:1px">PROGRAM SETUP</p>
        <table style="width:100%;border-collapse:collapse">
          ${row('Requested Go-Live', goLive)}
          ${row('Billing Contact', billingName)}
          ${row('Billing Email', billingEmail, true)}
        </table>

        <div style="margin-top:24px;padding-top:24px;border-top:1px solid #e5e5e5">
          <a href="mailto:${esc(billingEmail)}?subject=Re: Arbiter LE Onboarding — ${esc(agencyShort || agencyName)}" style="background:#c8902a;color:#fff;text-decoration:none;padding:12px 28px;border-radius:3px;font-weight:700;font-size:13px;letter-spacing:1px">Reply to ${esc(billingName || 'the agency')}</a>
          <p style="margin:16px 0 0;color:#8aabcc;font-size:12px">Still to arrive by email: roster spreadsheet, badge image, signed NDA + Service Agreement.</p>
        </div>
      </div>
    </div>
  `;

  try {
    await sendMail({
      from: `Arbiter LE <${GMAIL_USER}>`,
      to: GMAIL_USER,
      replyTo: cleanHeader(billingEmail),
      subject: cleanHeader(`Agency Onboarding Submission — ${agencyShort || agencyName}`),
      html,
    });
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Onboard handler error:', err);
    return res.status(500).json({ error: 'Email failed' });
  }
}
