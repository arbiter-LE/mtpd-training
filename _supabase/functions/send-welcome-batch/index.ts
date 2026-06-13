// Arbiter LE — Scheduled welcome-email batch (server-side)
// Supabase Edge Function
//
// Invoked once by a pg_cron job at launch time (see _supabase/egpd-welcome-cron.sql).
// Sends the "set your password" welcome email to every officer who hasn't received
// one yet, then stamps welcome_sent_at so a re-run can never double-send.
//
// Deploy with JWT verification OFF (it is gated by a shared secret instead):
//   supabase functions deploy send-welcome-batch --no-verify-jwt --project-ref <ref>
//
// Auto-injected by Supabase: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
// Set in Dashboard → Settings → Edge Functions:
//   RESEND_API_KEY  · PLATFORM_URL (e.g. https://egpd.arbiterle.com) · BATCH_SECRET

import { serve }        from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { sendWelcomeToOfficer, type Officer } from '../_shared/welcome.ts';

const SUPABASE_URL     = Deno.env.get('SUPABASE_URL')!;
const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const RESEND_API_KEY   = Deno.env.get('RESEND_API_KEY')!;
const PLATFORM_URL     = Deno.env.get('PLATFORM_URL') ?? 'https://arbiterle.com';
const BATCH_SECRET     = Deno.env.get('BATCH_SECRET')!;

const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

serve(async (req) => {
  // Gate: only the cron job (which knows the secret) may trigger a mass send.
  if (req.headers.get('X-Batch-Secret') !== BATCH_SECRET) {
    return new Response('forbidden', { status: 403 });
  }

  let body: { onlyEmail?: string } = {};
  try { body = await req.json(); } catch { /* empty body is the normal launch case */ }

  // TEST MODE: POST {"onlyEmail":"you@addr"} → sends ONE real sample email to that
  // address (working set-password link), independent of the roster. Does not touch
  // the officers table. Creates an Auth user for that address — delete it after
  // testing (Dashboard → Authentication → Users) so it isn't left behind.
  if (body.onlyEmail) {
    try {
      const r = await sendWelcomeToOfficer(admin, {
        badge_number: 'TEST',
        name:         'Test Officer',
        rank:         'Patrol Officer',
        email:        body.onlyEmail,
        role:         'officer',
      }, { platformUrl: PLATFORM_URL, resendKey: RESEND_API_KEY, dryRun: false });
      return new Response(JSON.stringify({ test: true, ...r }), {
        status: 200, headers: { 'Content-Type': 'application/json' },
      });
    } catch (err) {
      return new Response(`test send failed: ${err instanceof Error ? err.message : String(err)}`, { status: 500 });
    }
  }

  // Only officers who have an email and have not already been welcomed.
  const { data: officers, error } = await admin
    .from('officers')
    .select('id, badge_number, name, rank, email, role')
    .neq('role', 'admin')
    .not('email', 'is', null)
    .is('welcome_sent_at', null);

  if (error) {
    console.error('roster load failed:', error.message);
    return new Response(`roster load failed: ${error.message}`, { status: 500 });
  }

  let sent = 0, skipped = 0, failed = 0;
  const failures: string[] = [];

  for (const o of (officers ?? []) as (Officer & { id: string })[]) {
    try {
      const r = await sendWelcomeToOfficer(admin, o, {
        platformUrl: PLATFORM_URL,
        resendKey:   RESEND_API_KEY,
        dryRun:      false,
      });
      if (r.status === 'skipped') { skipped++; continue; }

      // Stamp only on a confirmed send so a failure leaves the row eligible for retry.
      const { error: stampErr } = await admin
        .from('officers')
        .update({ welcome_sent_at: new Date().toISOString() })
        .eq('id', o.id);
      if (stampErr) console.error(`sent but failed to stamp ${o.email}:`, stampErr.message);

      sent++;
    } catch (err) {
      failed++;
      failures.push(`${o.email}: ${err instanceof Error ? err.message : String(err)}`);
      console.error(`send failed for ${o.email}:`, err);
    }
  }

  const summary = { sent, skipped, failed, failures };
  console.log('welcome batch complete:', JSON.stringify(summary));
  return new Response(JSON.stringify(summary), {
    status:  failed > 0 ? 207 : 200,
    headers: { 'Content-Type': 'application/json' },
  });
});
