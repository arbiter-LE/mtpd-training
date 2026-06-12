// Arbiter LE — Officer Welcome Email
// Supabase Edge Function
//
// Triggered by a database webhook on INSERT to the officers table.
// Sends a welcome email via Resend to the new officer.
//
// Required environment variables (set in Supabase Dashboard → Settings → Edge Functions):
//   RESEND_API_KEY   — your Resend API key
//   PLATFORM_URL     — base URL, e.g. https://arbiterle.com (no trailing slash)

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!;
const PLATFORM_URL   = Deno.env.get('PLATFORM_URL') ?? 'https://arbiterle.com';
const FROM_ADDRESS   = 'Arbiter LE <noreply@arbiterle.com>';

serve(async (req) => {
  // Supabase database webhooks POST a payload with { type, table, record, old_record }
  const payload = await req.json();

  // Only act on INSERT events
  if (payload.type !== 'INSERT') {
    return new Response('ignored', { status: 200 });
  }

  const officer = payload.record as {
    badge_number: string;
    name:         string;
    rank:         string;
    email:        string | null;
    role:         string;
  };

  // Skip if no email or if this is an admin account
  if (!officer.email || officer.role === 'admin') {
    return new Response('skipped', { status: 200 });
  }

  // Derive department login URL from the request origin header
  // Webhook origin will be the Supabase project — we reconstruct from the officer's dept
  // For now we use the PLATFORM_URL env var as the base and admins configure per-dept
  const loginUrl = PLATFORM_URL;

  const emailHtml = buildWelcomeEmail({
    name:       officer.name,
    rank:       officer.rank,
    badge:      officer.badge_number,
    loginUrl,
  });

  const res = await fetch('https://api.resend.com/emails', {
    method:  'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type':  'application/json',
    },
    body: JSON.stringify({
      from:    FROM_ADDRESS,
      to:      [officer.email],
      subject: 'Welcome to Arbiter LE Training',
      html:    emailHtml,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error('Resend error:', err);
    return new Response(`Resend error: ${err}`, { status: 500 });
  }

  return new Response('sent', { status: 200 });
});

// ── Email template ────────────────────────────────────────────────────────────

interface WelcomeEmailParams {
  name:     string;
  rank:     string;
  badge:    string;
  loginUrl: string;
}

function buildWelcomeEmail({ name, rank, badge, loginUrl }: WelcomeEmailParams): string {
  // Extract first name for greeting
  const firstName = name.replace(/^(Officer|Corporal|Sergeant|Lieutenant|Captain|Detective)\s+/i, '').split(' ')[0];

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Arbiter LE Training</title>
</head>
<body style="margin:0;padding:0;background-color:#e6eef5;font-family:'Segoe UI',system-ui,-apple-system,sans-serif;">

  <!-- Wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#e6eef5;padding:40px 0;">
    <tr>
      <td align="center">

        <!-- Card -->
        <table width="560" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:10px;overflow:hidden;border:1px solid #c4d6e4;max-width:560px;box-shadow:0 4px 20px rgba(10,24,40,0.10);">

          <!-- Header bar -->
          <tr>
            <td style="background:linear-gradient(135deg,#0a1828 0%,#152638 100%);padding:28px 40px;text-align:center;border-bottom:3px solid #c8902a;">
              <p style="margin:0;font-size:10px;letter-spacing:3px;color:#8aabcc;text-transform:uppercase;font-weight:700;">Law Enforcement Training</p>
              <h1 style="margin:8px 0 0;font-size:26px;font-weight:700;color:#dce8f0;letter-spacing:2px;">ARBITER LE</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px;">

              <p style="margin:0 0 6px;font-size:11px;letter-spacing:2px;color:#5a7a92;text-transform:uppercase;font-weight:700;">Welcome,</p>
              <h2 style="margin:0 0 20px;font-size:22px;font-weight:700;color:#0a1828;">${name}</h2>

              <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#182535;">
                Your Arbiter LE training account is active. You have been enrolled in your department's online training program. Each module is scenario-based and built around your patrol area.
              </p>

              <!-- Credentials box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#edf3f8;border:1px solid #c4d6e4;border-radius:8px;margin:24px 0;">
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0 0 14px;font-size:10px;letter-spacing:2px;color:#5a7a92;text-transform:uppercase;font-weight:700;">Login Credentials</p>

                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:5px 0;font-size:13px;color:#5a7a92;width:110px;">Login URL</td>
                        <td style="padding:5px 0;font-size:13px;color:#0a1828;font-weight:700;">${loginUrl}</td>
                      </tr>
                      <tr>
                        <td style="padding:5px 0;font-size:13px;color:#5a7a92;">Badge #</td>
                        <td style="padding:5px 0;font-size:13px;color:#0a1828;font-weight:700;">${badge}</td>
                      </tr>
                      <tr>
                        <td style="padding:5px 0;font-size:13px;color:#5a7a92;">Rank</td>
                        <td style="padding:5px 0;font-size:13px;color:#0a1828;font-weight:700;">${rank}</td>
                      </tr>
                      <tr>
                        <td style="padding:5px 0;font-size:13px;color:#5a7a92;">Password</td>
                        <td style="padding:5px 0;font-size:13px;color:#182535;">Contact your supervisor for your initial password.</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- How it works -->
              <p style="margin:0 0 12px;font-size:10px;letter-spacing:2px;color:#5a7a92;text-transform:uppercase;font-weight:700;">How It Works</p>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:8px 0;vertical-align:top;width:28px;">
                    <span style="display:inline-block;width:20px;height:20px;background-color:#0a1828;border-radius:50%;text-align:center;line-height:20px;font-size:11px;font-weight:700;color:#c8902a;">1</span>
                  </td>
                  <td style="padding:8px 0;font-size:14px;color:#182535;line-height:1.5;">
                    Modules unlock weekly. Log in, complete the reading, work through the scenario, and pass the quiz.
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;vertical-align:top;width:28px;">
                    <span style="display:inline-block;width:20px;height:20px;background-color:#0a1828;border-radius:50%;text-align:center;line-height:20px;font-size:11px;font-weight:700;color:#c8902a;">2</span>
                  </td>
                  <td style="padding:8px 0;font-size:14px;color:#182535;line-height:1.5;">
                    Each module has a due date. Modules marked overdue are tracked in your department's compliance report.
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;vertical-align:top;width:28px;">
                    <span style="display:inline-block;width:20px;height:20px;background-color:#0a1828;border-radius:50%;text-align:center;line-height:20px;font-size:11px;font-weight:700;color:#c8902a;">3</span>
                  </td>
                  <td style="padding:8px 0;font-size:14px;color:#182535;line-height:1.5;">
                    You can retake quizzes as many times as needed. Your best score is recorded.
                  </td>
                </tr>
              </table>

              <!-- CTA button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin:32px 0 0;">
                <tr>
                  <td align="center">
                    <a href="${loginUrl}" style="display:inline-block;background:linear-gradient(135deg,#0a1828 0%,#152638 100%);color:#dce8f0;text-decoration:none;font-size:14px;font-weight:700;padding:14px 40px;border-radius:8px;letter-spacing:1px;text-transform:uppercase;border-bottom:3px solid #c8902a;">
                      Go to Training Platform
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:18px 40px;border-top:1px solid #c4d6e4;text-align:center;background-color:#edf3f8;">
              <p style="margin:0;font-size:12px;color:#5a7a92;line-height:1.6;">
                Arbiter LE &middot; arbiterle.com<br>
                Questions? Contact your department administrator.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`.trim();
}
