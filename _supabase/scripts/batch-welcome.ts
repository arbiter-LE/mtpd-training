// Arbiter LE — One-time welcome-email batch sender
//
// Sends the "set your password" welcome email to an ALREADY-SEEDED roster. The
// INSERT webhook only fires for officers added after it is created, so existing
// rosters (like EGPD's) need this one-time pass.
//
// SAFE BY DEFAULT: runs in DRY RUN unless you pass --send. Dry run creates no
// Auth users and sends no email — it only lists who WOULD receive one.
//
// Run with Deno (ships with the Supabase CLI):
//
//   export SUPABASE_URL="https://<egpd-project-ref>.supabase.co"
//   export SUPABASE_SERVICE_ROLE_KEY="<egpd service_role key>"
//   export RESEND_API_KEY="<resend key>"
//   export PLATFORM_URL="https://egpd.arbiterle.com"
//
//   # 1) Preview — no users created, no email sent:
//   deno run --allow-net --allow-env _supabase/scripts/batch-welcome.ts
//
//   # 2) Send for real (creates Auth users as needed, sends email):
//   deno run --allow-net --allow-env _supabase/scripts/batch-welcome.ts --send
//
// Optional: --only=alice@dept.gov,bob@dept.gov  → restrict to specific addresses
//           (use this to send yourself a single live test before the full run).

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { sendWelcomeToOfficer, type Officer } from '../functions/_shared/welcome.ts';

const SUPABASE_URL     = reqEnv('SUPABASE_URL');
const SERVICE_ROLE_KEY = reqEnv('SUPABASE_SERVICE_ROLE_KEY');
const RESEND_API_KEY   = reqEnv('RESEND_API_KEY');
const PLATFORM_URL     = reqEnv('PLATFORM_URL');

const args   = Deno.args;
const dryRun = !args.includes('--send');
const onlyArg = args.find((a) => a.startsWith('--only='));
const only   = onlyArg ? onlyArg.slice('--only='.length).split(',').map((s) => s.trim().toLowerCase()) : null;

function reqEnv(name: string): string {
  const v = Deno.env.get(name);
  if (!v) {
    console.error(`Missing required env var: ${name}`);
    Deno.exit(1);
  }
  return v;
}

const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

console.log(`\nArbiter LE welcome batch — ${dryRun ? 'DRY RUN (no users created, no email sent)' : 'LIVE SEND'}`);
console.log(`Target platform: ${PLATFORM_URL}`);
if (only) console.log(`Restricted to: ${only.join(', ')}`);
console.log('');

const { data: officers, error } = await admin
  .from('officers')
  .select('badge_number, name, rank, email, role')
  .neq('role', 'admin')
  .not('email', 'is', null);

if (error) {
  console.error('Failed to load roster:', error.message);
  Deno.exit(1);
}

let sent = 0, skipped = 0, failed = 0;

for (const o of (officers ?? []) as Officer[]) {
  if (only && (!o.email || !only.includes(o.email.toLowerCase()))) {
    continue;
  }
  try {
    const r = await sendWelcomeToOfficer(admin, o, {
      platformUrl: PLATFORM_URL,
      resendKey:   RESEND_API_KEY,
      dryRun,
    });
    if (r.status === 'skipped') { skipped++; console.log(`  skip  ${r.email}  (${r.reason})`); }
    else                        { sent++;    console.log(`  ${dryRun ? 'would send' : 'SENT '}  ${r.email}`); }
  } catch (err) {
    failed++;
    console.error(`  FAIL  ${o.email}  ${err instanceof Error ? err.message : String(err)}`);
  }
}

console.log(`\nDone. ${dryRun ? 'would send' : 'sent'}: ${sent} · skipped: ${skipped} · failed: ${failed}\n`);
if (dryRun) console.log('No email was sent. Re-run with --send to deliver.\n');
