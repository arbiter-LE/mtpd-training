// Arbiter LE — send-welcome-batch (SINGLE-FILE dashboard-deploy copy)
// =====================================================================
// This is a self-contained copy of the send-welcome-batch edge function with the
// shared core inlined, so it can be pasted straight into the Supabase Dashboard
// edge-function editor — no CLI, no Deno, no multi-file imports.
//
// SOURCE OF TRUTH: _supabase/functions/send-welcome-batch/index.ts
//                + _supabase/functions/_shared/welcome.ts
// If you change those, regenerate this file.
//
// Deploy with JWT verification OFF (it is gated by BATCH_SECRET instead).
// Auto-injected by Supabase: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
// Set in the function's secrets: RESEND_API_KEY · PLATFORM_URL · BATCH_SECRET
//
// Usage:
//   • Launch (cron):  POST {}                       → emails all un-welcomed officers
//   • Pre-flight:     POST {"onlyEmail":"you@x.com"} → ONE sample email to that address
//   Both require header  X-Batch-Secret: <BATCH_SECRET>

import { serve }        from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient, type SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL     = Deno.env.get('SUPABASE_URL')!;
const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const RESEND_API_KEY   = Deno.env.get('RESEND_API_KEY')!;
const PLATFORM_URL     = Deno.env.get('PLATFORM_URL') ?? 'https://arbiterle.com';
const BATCH_SECRET     = Deno.env.get('BATCH_SECRET')!;
const FROM_ADDRESS     = 'Arbiter LE <noreply@arbiterle.com>';

const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

interface Officer {
  badge_number: string;
  name:         string;
  rank:         string;
  email:        string | null;
  role:         string;
}

serve(async (req) => {
  if (req.headers.get('X-Batch-Secret') !== BATCH_SECRET) {
    return new Response('forbidden', { status: 403 });
  }

  let body: { onlyEmail?: string } = {};
  try { body = await req.json(); } catch { /* empty body is the normal launch case */ }

  // TEST MODE — POST {"onlyEmail":"you@addr"} sends ONE real sample email to that
  // address with a working set-password link, independent of the roster. Creates an
  // Auth user for that address; delete it after testing (Auth → Users).
  if (body.onlyEmail) {
    try {
      const r = await sendWelcomeToOfficer({
        badge_number: 'TEST', name: 'Test Officer', rank: 'Patrol Officer',
        email: body.onlyEmail, role: 'officer',
      });
      return json({ test: true, ...r });
    } catch (err) {
      return new Response(`test send failed: ${msg(err)}`, { status: 500 });
    }
  }

  // LAUNCH — every officer with an email who has not yet been welcomed.
  const { data: officers, error } = await admin
    .from('officers')
    .select('id, badge_number, name, rank, email, role')
    .neq('role', 'admin')
    .not('email', 'is', null)
    .is('welcome_sent_at', null);

  if (error) return new Response(`roster load failed: ${error.message}`, { status: 500 });

  let sent = 0, skipped = 0, failed = 0;
  const failures: string[] = [];

  for (const o of (officers ?? []) as (Officer & { id: string })[]) {
    try {
      const r = await sendWelcomeToOfficer(o);
      if (r.status === 'skipped') { skipped++; continue; }
      const { error: stampErr } = await admin
        .from('officers')
        .update({ welcome_sent_at: new Date().toISOString() })
        .eq('id', o.id);
      if (stampErr) console.error(`sent but failed to stamp ${o.email}:`, stampErr.message);
      sent++;
    } catch (err) {
      failed++;
      failures.push(`${o.email}: ${msg(err)}`);
      console.error(`send failed for ${o.email}:`, err);
    }
  }

  return json({ sent, skipped, failed, failures }, failed > 0 ? 207 : 200);
});

function json(obj: unknown, status = 200): Response {
  return new Response(JSON.stringify(obj), { status, headers: { 'Content-Type': 'application/json' } });
}
function msg(err: unknown): string { return err instanceof Error ? err.message : String(err); }

// ── inlined shared core (mirror of functions/_shared/welcome.ts) ──────────────

async function sendWelcomeToOfficer(officer: Officer): Promise<{ email: string; status: 'sent' | 'skipped'; reason?: string }> {
  if (!officer.email || officer.role === 'admin') {
    return { email: officer.email ?? '(none)', status: 'skipped', reason: 'no email or admin role' };
  }
  const actionLink = await ensureUserAndRecoveryLink(admin, officer.email, PLATFORM_URL);
  const html = buildWelcomeEmail({
    name: officer.name, rank: officer.rank, badge: officer.badge_number,
    email: officer.email, loginUrl: PLATFORM_URL, actionLink,
  });
  const res = await fetch('https://api.resend.com/emails', {
    method:  'POST',
    headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: FROM_ADDRESS, to: [officer.email], subject: 'Welcome to Arbiter LE — Set Your Password', html }),
  });
  if (!res.ok) throw new Error(`Resend error for ${officer.email}: ${await res.text()}`);
  return { email: officer.email, status: 'sent' };
}

async function ensureUserAndRecoveryLink(client: SupabaseClient, email: string, redirectTo: string): Promise<string> {
  const { error: createErr } = await client.auth.admin.createUser({ email, email_confirm: true });
  if (createErr && !/already|registered|exists/i.test(createErr.message)) {
    throw new Error(`createUser failed for ${email}: ${createErr.message}`);
  }
  const { data, error } = await client.auth.admin.generateLink({
    type: 'recovery', email, options: { redirectTo: `${redirectTo}/?reset=1` },
  });
  if (error || !data?.properties?.action_link) {
    throw new Error(`generateLink failed for ${email}: ${error?.message ?? 'no action_link'}`);
  }
  return data.properties.action_link;
}

function buildWelcomeEmail(p: { name: string; rank: string; badge: string; email: string; loginUrl: string; actionLink: string }): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Welcome to Arbiter LE Training</title></head>
<body style="margin:0;padding:0;background-color:#e6eef5;font-family:'Segoe UI',system-ui,-apple-system,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#e6eef5;padding:40px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:10px;overflow:hidden;border:1px solid #c4d6e4;max-width:560px;box-shadow:0 4px 20px rgba(10,24,40,0.10);">
        <tr><td style="background:linear-gradient(135deg,#0a1828 0%,#152638 100%);padding:28px 40px;text-align:center;border-bottom:3px solid #c8902a;">
          <p style="margin:0;font-size:10px;letter-spacing:3px;color:#8aabcc;text-transform:uppercase;font-weight:700;">Law Enforcement Training</p>
          <h1 style="margin:8px 0 0;font-size:26px;font-weight:700;color:#dce8f0;letter-spacing:2px;">ARBITER LE</h1>
        </td></tr>
        <tr><td style="padding:36px 40px;">
          <p style="margin:0 0 6px;font-size:11px;letter-spacing:2px;color:#5a7a92;text-transform:uppercase;font-weight:700;">Welcome,</p>
          <h2 style="margin:0 0 4px;font-size:22px;font-weight:700;color:#0a1828;">${p.name}</h2>
          <p style="margin:0 0 20px;font-size:12px;color:#5a7a92;">${p.rank} &middot; Badge ${p.badge}</p>
          <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#182535;">Your Arbiter LE training account is ready. You have been enrolled in your department's online training program — each module is scenario-based and built around your patrol area.</p>
          <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#182535;">To get started, set your password using the secure button below, then sign in.</p>
          <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;"><tr><td align="center">
            <a href="${p.actionLink}" style="display:inline-block;background:linear-gradient(135deg,#0a1828 0%,#152638 100%);color:#dce8f0;text-decoration:none;font-size:14px;font-weight:700;padding:14px 44px;border-radius:8px;letter-spacing:1px;text-transform:uppercase;border-bottom:3px solid #c8902a;">Set Your Password</a>
          </td></tr></table>
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#edf3f8;border:1px solid #c4d6e4;border-radius:8px;margin:0 0 24px;"><tr><td style="padding:20px 24px;">
            <p style="margin:0 0 14px;font-size:10px;letter-spacing:2px;color:#5a7a92;text-transform:uppercase;font-weight:700;">Your Sign-In Details</p>
            <table cellpadding="0" cellspacing="0">
              <tr><td style="padding:5px 0;font-size:13px;color:#5a7a92;width:110px;">Login URL</td><td style="padding:5px 0;font-size:13px;color:#0a1828;font-weight:700;">${p.loginUrl}</td></tr>
              <tr><td style="padding:5px 0;font-size:13px;color:#5a7a92;">Your email</td><td style="padding:5px 0;font-size:13px;color:#0a1828;font-weight:700;">${p.email}</td></tr>
            </table>
            <p style="margin:14px 0 0;font-size:12px;color:#5a7a92;line-height:1.5;">For security, the button above expires after a limited time. If it no longer works, use <strong>Forgot password</strong> on the login page to send yourself a fresh link.</p>
          </td></tr></table>
          <p style="margin:0 0 12px;font-size:10px;letter-spacing:2px;color:#5a7a92;text-transform:uppercase;font-weight:700;">How It Works</p>
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="padding:8px 0;vertical-align:top;width:28px;"><span style="display:inline-block;width:20px;height:20px;background-color:#0a1828;border-radius:50%;text-align:center;line-height:20px;font-size:11px;font-weight:700;color:#c8902a;">1</span></td><td style="padding:8px 0;font-size:14px;color:#182535;line-height:1.5;">Modules unlock weekly. Log in, complete the reading, work through the scenario, and pass the quiz.</td></tr>
            <tr><td style="padding:8px 0;vertical-align:top;width:28px;"><span style="display:inline-block;width:20px;height:20px;background-color:#0a1828;border-radius:50%;text-align:center;line-height:20px;font-size:11px;font-weight:700;color:#c8902a;">2</span></td><td style="padding:8px 0;font-size:14px;color:#182535;line-height:1.5;">Each module has a due date. Modules marked overdue are tracked in your department's compliance report.</td></tr>
            <tr><td style="padding:8px 0;vertical-align:top;width:28px;"><span style="display:inline-block;width:20px;height:20px;background-color:#0a1828;border-radius:50%;text-align:center;line-height:20px;font-size:11px;font-weight:700;color:#c8902a;">3</span></td><td style="padding:8px 0;font-size:14px;color:#182535;line-height:1.5;">You can retake quizzes as many times as needed. Your best score is recorded.</td></tr>
          </table>
        </td></tr>
        <tr><td style="padding:18px 40px;border-top:1px solid #c4d6e4;text-align:center;background-color:#edf3f8;">
          <p style="margin:0;font-size:12px;color:#5a7a92;line-height:1.6;">Arbiter LE &middot; arbiterle.com<br>Questions? Contact your department administrator.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`.trim();
}
