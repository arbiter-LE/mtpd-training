// Arbiter LE — Officer Welcome Email (shared core)
//
// Used by BOTH:
//   • the send-welcome-email Edge Function (webhook on officers INSERT — future adds)
//   • _supabase/scripts/batch-welcome.ts (one-time send to an already-seeded roster)
//
// Model: "set your password" link.
//   Officers log in with EMAIL + PASSWORD (Supabase Auth). They have no password yet,
//   so the email carries a secure recovery link that drops them on the platform's
//   set-new-password screen — the same flow as "Forgot password" already live in app.js.
//
// A recovery link only works if a Supabase Auth user exists for the email. The roster
// lives in the `officers` table, which is NOT the same as an Auth user — so we create
// the Auth user (no password, email-confirmed) if it is missing, idempotently.

import type { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2';

export interface Officer {
  badge_number: string;
  name:         string;
  rank:         string;
  email:        string | null;
  role:         string;
}

export interface SendOptions {
  platformUrl: string;   // e.g. https://egpd.arbiterle.com — also the recovery redirect target
  resendKey:   string;
  dryRun:      boolean;  // true = generate link + render, but DO NOT send
}

const FROM_ADDRESS = 'Arbiter LE <noreply@arbiterle.com>';

export interface SendResult {
  email:   string;
  status:  'sent' | 'dry-run' | 'skipped';
  reason?: string;
}

/**
 * Full pipeline for one officer: ensure Auth user → generate set-password link →
 * render branded email → send via Resend (unless dryRun).
 */
export async function sendWelcomeToOfficer(
  admin:   SupabaseClient,
  officer: Officer,
  opts:    SendOptions,
): Promise<SendResult> {
  // Skip non-officers and rows without an email — never email an admin account.
  if (!officer.email || officer.role === 'admin') {
    return { email: officer.email ?? '(none)', status: 'skipped', reason: 'no email or admin role' };
  }

  const actionLink = await ensureUserAndRecoveryLink(admin, officer.email, opts.platformUrl);

  const html = buildWelcomeEmail({
    name:       officer.name,
    rank:       officer.rank,
    badge:      officer.badge_number,
    email:      officer.email,
    loginUrl:   opts.platformUrl,
    actionLink,
  });

  if (opts.dryRun) {
    return { email: officer.email, status: 'dry-run' };
  }

  const res = await fetch('https://api.resend.com/emails', {
    method:  'POST',
    headers: {
      'Authorization': `Bearer ${opts.resendKey}`,
      'Content-Type':  'application/json',
    },
    body: JSON.stringify({
      from:    FROM_ADDRESS,
      to:      [officer.email],
      subject: 'Welcome to Arbiter LE — Set Your Password',
      html,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Resend error for ${officer.email}: ${err}`);
  }

  return { email: officer.email, status: 'sent' };
}

/**
 * Idempotently ensure an Auth user exists for `email`, then mint a recovery
 * (set-password) link via the Admin API. generateLink RETURNS the link and does
 * not itself email the user, so we keep delivery in our own branded Resend send.
 */
export async function ensureUserAndRecoveryLink(
  admin:      SupabaseClient,
  email:      string,
  redirectTo: string,
): Promise<string> {
  // Create the Auth user if missing. No password (they set it via the link);
  // email_confirm so the recovery link is valid immediately.
  const { error: createErr } = await admin.auth.admin.createUser({
    email,
    email_confirm: true,
  });
  // "already registered" is the expected path on re-runs — anything else is real.
  if (createErr && !/already|registered|exists/i.test(createErr.message)) {
    throw new Error(`createUser failed for ${email}: ${createErr.message}`);
  }

  // Match the live "Forgot password" flow exactly (app.js doForgotPassword):
  // it redirects to origin + '/?reset=1', which the app detects to show the
  // set-password screen. PLATFORM_URL has no trailing slash.
  const { data, error } = await admin.auth.admin.generateLink({
    type:    'recovery',
    email,
    options: { redirectTo: `${redirectTo}/?reset=1` },
  });
  if (error || !data?.properties?.action_link) {
    throw new Error(`generateLink failed for ${email}: ${error?.message ?? 'no action_link'}`);
  }
  return data.properties.action_link;
}

// ── Email template ──────────────────────────────────────────────────────────

interface WelcomeEmailParams {
  name:       string;
  rank:       string;
  badge:      string;
  email:      string;
  loginUrl:   string;
  actionLink: string;
}

export function buildWelcomeEmail(p: WelcomeEmailParams): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Arbiter LE Training</title>
</head>
<body style="margin:0;padding:0;background-color:#e6eef5;font-family:'Segoe UI',system-ui,-apple-system,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#e6eef5;padding:40px 0;">
    <tr>
      <td align="center">

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
              <h2 style="margin:0 0 4px;font-size:22px;font-weight:700;color:#0a1828;">${p.name}</h2>
              <p style="margin:0 0 20px;font-size:12px;color:#5a7a92;">${p.rank} &middot; Badge ${p.badge}</p>

              <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#182535;">
                Your Arbiter LE training account is ready. You have been enrolled in your department's online training program — each module is scenario-based and built around your patrol area.
              </p>

              <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#182535;">
                To get started, set your password using the secure button below, then sign in.
              </p>

              <!-- Set password CTA -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
                <tr>
                  <td align="center">
                    <a href="${p.actionLink}" style="display:inline-block;background:linear-gradient(135deg,#0a1828 0%,#152638 100%);color:#dce8f0;text-decoration:none;font-size:14px;font-weight:700;padding:14px 44px;border-radius:8px;letter-spacing:1px;text-transform:uppercase;border-bottom:3px solid #c8902a;">
                      Set Your Password
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Sign-in details -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#edf3f8;border:1px solid #c4d6e4;border-radius:8px;margin:0 0 24px;">
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0 0 14px;font-size:10px;letter-spacing:2px;color:#5a7a92;text-transform:uppercase;font-weight:700;">Your Sign-In Details</p>
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:5px 0;font-size:13px;color:#5a7a92;width:110px;">Login URL</td>
                        <td style="padding:5px 0;font-size:13px;color:#0a1828;font-weight:700;">${p.loginUrl}</td>
                      </tr>
                      <tr>
                        <td style="padding:5px 0;font-size:13px;color:#5a7a92;">Your email</td>
                        <td style="padding:5px 0;font-size:13px;color:#0a1828;font-weight:700;">${p.email}</td>
                      </tr>
                    </table>
                    <p style="margin:14px 0 0;font-size:12px;color:#5a7a92;line-height:1.5;">
                      For security, the button above expires after a limited time. If it no longer works, use <strong>Forgot password</strong> on the login page to send yourself a fresh link.
                    </p>
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
