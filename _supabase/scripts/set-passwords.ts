// Arbiter LE — Direct password setter (email-free officer onboarding)
//
// WHY THIS EXISTS: welcome emails deliver fine (Resend shows "Delivered"), but a
// new sending domain lands in a government O365 Junk/quarantine, and the recovery
// link expires in ~1h. This bypasses email entirely: it sets a temp password on
// each officer's Auth account directly, then prints email + temp password so you
// can hand them out by text/phone. Officers change it later via "Forgot password".
//
// SELF-LINKING: when it creates an account (or finds an officer whose
// officers.auth_uid is missing/stale), it writes auth_uid back so RLS lets that
// officer save their own completions. Onboarding never depends on a separate
// seed/link query. (Fixes the 6/17 EGPD gap where new accounts went unlinked.)
//
// SAFE BY DEFAULT: runs in DRY RUN unless you pass --send. Dry run sets nothing —
// it only previews who would be updated/linked and the temp passwords it WOULD set.
//
// Run with Deno (ships with the Supabase CLI):
//
//   export SUPABASE_URL="https://<egpd-project-ref>.supabase.co"
//   export SUPABASE_SERVICE_ROLE_KEY="<egpd service_role key>"
//
//   # 1) Preview — sets nothing:
//   deno run --allow-net --allow-env _supabase/scripts/set-passwords.ts
//
//   # 2) Apply for real:
//   deno run --allow-net --allow-env _supabase/scripts/set-passwords.ts --send
//
// Optional: --only=moliver@egreenville.org,mhopwood@egreenville.org
//           → restrict to specific addresses.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL     = reqEnv('SUPABASE_URL');
const SERVICE_ROLE_KEY = reqEnv('SUPABASE_SERVICE_ROLE_KEY');

const args    = Deno.args;
const dryRun  = !args.includes('--send');
const onlyArg = args.find((a) => a.startsWith('--only='));
const only    = onlyArg ? onlyArg.slice('--only='.length).split(',').map((s) => s.trim().toLowerCase()) : null;

function reqEnv(name: string): string {
  const v = Deno.env.get(name);
  if (!v) { console.error(`Missing required env var: ${name}`); Deno.exit(1); }
  return v;
}

// Readable temp password: word + 4 digits, e.g. "Arbiter-7413". >=8 chars,
// letters + digits, no ambiguous characters, easy to read over the phone.
function tempPassword(): string {
  const n = Math.floor(1000 + Math.random() * 9000);
  return `Arbiter-${n}`;
}

const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

console.log(`\nArbiter LE password setter — ${dryRun ? 'DRY RUN (nothing changed)' : 'LIVE — setting passwords'}`);
if (only) console.log(`Restricted to: ${only.join(', ')}`);
console.log('');

// Whole roster — including admins (Chief / Sgt). They never got a welcome
// email (the welcome flow skips admins), so they have no other way in.
const { data: officers, error } = await admin
  .from('officers')
  .select('badge_number, name, rank, email, role, auth_uid')
  .not('email', 'is', null);

if (error) { console.error('Failed to load roster:', error.message); Deno.exit(1); }

// One page of Auth users covers a pilot-size roster; match email → id.
const { data: list, error: listErr } = await admin.auth.admin.listUsers({ page: 1, perPage: 200 });
if (listErr) { console.error('Failed to list auth users:', listErr.message); Deno.exit(1); }
const idByEmail = new Map(list.users.map((u) => [(u.email ?? '').toLowerCase(), u.id]));

const results: { name: string; email: string; temp: string }[] = [];
let done = 0, skipped = 0, failed = 0, linked = 0;

for (const o of officers ?? []) {
  const email = (o.email ?? '').toLowerCase();
  if (!email) { skipped++; continue; }
  if (only && !only.includes(email)) continue;

  const temp = tempPassword();

  try {
    let id = idByEmail.get(email);

    // A new account always needs linking; an existing one needs it only if
    // officers.auth_uid is missing or points at the wrong user.
    let needsLink = !id || o.auth_uid !== id;

    // Create the Auth user if it doesn't exist yet (email-confirmed, with the temp password).
    if (!id) {
      if (dryRun) {
        console.log(`  would CREATE + set + link  ${email}`);
        results.push({ name: o.name, email: o.email!, temp });
        done++; linked++;
        continue;
      }
      const { data: created, error: cErr } = await admin.auth.admin.createUser({
        email: o.email!, password: temp, email_confirm: true,
      });
      if (cErr || !created?.user) throw new Error(cErr?.message ?? 'createUser returned no user');
      id = created.user.id;
    } else if (!dryRun) {
      const { error: uErr } = await admin.auth.admin.updateUserById(id, { password: temp });
      if (uErr) throw new Error(uErr.message);
    }

    // Self-link: write officers.auth_uid so RLS lets this officer save their own
    // completions. Onboarding must NOT depend on a separate seed/link query.
    if (needsLink && !dryRun) {
      const { error: lErr } = await admin
        .from('officers')
        .update({ auth_uid: id })
        .eq('badge_number', o.badge_number);
      if (lErr) throw new Error(`auth_uid link failed: ${lErr.message}`);
      linked++;
    }

    console.log(`  ${dryRun ? 'would set' : 'SET '}${needsLink ? ' + link' : ''}  ${email}`);
    results.push({ name: o.name, email: o.email!, temp });
    done++;
  } catch (err) {
    failed++;
    console.error(`  FAIL  ${email}  ${err instanceof Error ? err.message : String(err)}`);
  }
}

console.log(`\nDone. ${dryRun ? 'would set' : 'set'}: ${done} · ${dryRun ? 'would link' : 'linked'}: ${linked} · skipped: ${skipped} · failed: ${failed}\n`);

if (results.length) {
  console.log('─'.repeat(52));
  console.log('HAND THESE OUT (login at https://egpd.arbiterle.com):');
  console.log('─'.repeat(52));
  for (const r of results) {
    console.log(`  ${r.name}`);
    console.log(`    email:    ${r.email}`);
    console.log(`    password: ${r.temp}`);
    console.log('');
  }
}
if (dryRun) console.log('DRY RUN — no passwords were set. Re-run with --send to apply.\n');
