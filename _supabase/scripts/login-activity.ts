// Arbiter LE — Login & engagement check (READ ONLY)
//
// Prints the full roster with each officer's last sign-in and how many modules
// they've completed, plus a one-line summary. Changes nothing — safe to run any
// time to watch pilot engagement.
//
// Run with Deno (ships with the Supabase CLI):
//
//   export SUPABASE_URL="https://kczrylxnrzkcwgivlqrs.supabase.co"   # EGPD
//   export SUPABASE_SERVICE_ROLE_KEY="<egpd service_role key>"
//
//   deno run --allow-net --allow-env _supabase/scripts/login-activity.ts
//
// The service_role key lives only in your shell env — never in the repo.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL     = reqEnv('SUPABASE_URL');
const SERVICE_ROLE_KEY = reqEnv('SUPABASE_SERVICE_ROLE_KEY');

function reqEnv(name: string): string {
  const v = Deno.env.get(name);
  if (!v) { console.error(`Missing required env var: ${name}`); Deno.exit(1); }
  return v;
}

const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

// Roster
const { data: officers, error } = await admin
  .from('officers')
  .select('badge_number, name, rank, email, role, auth_uid')
  .not('email', 'is', null);
if (error) { console.error('Failed to load roster:', error.message); Deno.exit(1); }

// Auth users → login timestamps by email
const { data: list, error: listErr } = await admin.auth.admin.listUsers({ page: 1, perPage: 200 });
if (listErr) { console.error('Failed to list auth users:', listErr.message); Deno.exit(1); }
const authByEmail = new Map(
  list.users.map((u) => [(u.email ?? '').toLowerCase(), u]),
);

// Completion counts per officer, keyed by badge_number (PK of completions).
// We count modules actually PASSED — that's a real completion, not just an attempt.
const passedByBadge = new Map<string, number>();
try {
  const { data: comps } = await admin.from('completions').select('badge_number, passed');
  for (const c of comps ?? []) {
    if (!c.passed) continue;
    const b = String(c.badge_number ?? '');
    if (b) passedByBadge.set(b, (passedByBadge.get(b) ?? 0) + 1);
  }
} catch { /* table/column may differ — skip silently */ }

function fmt(ts: string | null | undefined): string {
  if (!ts) return 'never';
  const d = new Date(ts);
  return d.toISOString().replace('T', ' ').slice(0, 16) + ' UTC';
}

let loggedIn = 0, never = 0, noAccount = 0, anyCompletions = 0, unlinked = 0;

console.log('\nEGPD — Login & engagement\n' + '─'.repeat(84));
console.log('NAME'.padEnd(24) + 'LAST LOGIN'.padEnd(22) + 'LINK'.padEnd(10) + 'DONE  EMAIL');
console.log('─'.repeat(84));

for (const o of (officers ?? []).sort((a, b) => (a.name ?? '').localeCompare(b.name ?? ''))) {
  const email = (o.email ?? '').toLowerCase();
  const u = authByEmail.get(email);
  const last = u?.last_sign_in_at ?? null;
  const done = passedByBadge.get(String(o.badge_number ?? '')) ?? 0;
  if (done > 0) anyCompletions++;

  let status: string;
  if (!u) { status = 'NO AUTH ACCOUNT'; noAccount++; }
  else if (last) { status = fmt(last); loggedIn++; }
  else { status = 'never'; never++; }

  // auth_uid linkage — if this is broken, RLS silently blocks the officer's
  // completion writes (and breaks is_admin() for admins).
  let link: string;
  if (!u) link = '—';
  else if (!o.auth_uid) link = 'NO UID';
  else if (o.auth_uid === u.id) link = 'ok';
  else link = 'MISMATCH';
  if (u && link !== 'ok') unlinked++;

  console.log(
    (o.name ?? '').slice(0, 23).padEnd(24) +
    status.padEnd(22) +
    link.padEnd(10) +
    String(done).padEnd(6) +
    o.email,
  );
}

const total = officers?.length ?? 0;
console.log('─'.repeat(84));
console.log(
  `\n${loggedIn}/${total} have logged in at least once · ${never} never · ` +
  `${noAccount} have no auth account\n` +
  `${anyCompletions}/${total} have completed at least one module\n`,
);
if (unlinked > 0) {
  console.log(
    `⚠  ${unlinked} officer(s) with an auth account are NOT linked (auth_uid wrong/missing).\n` +
    `   RLS will silently reject their completion writes — fix the auth_uid link.\n`,
  );
}
