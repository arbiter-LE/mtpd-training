# EGPD completions / auth_uid — RESOLVED (false alarm)

**Date opened:** 2026-06-19 · **Date closed:** 2026-06-19
**Project:** EGPD Supabase — `https://kczrylxnrzkcwgivlqrs.supabase.co`
**Outcome:** No bug. Platform healthy. One forward fix applied (see below).

---

## What was suspected
Officers were logging in but no completions appeared, so this session theorized a
broken RLS write path: that officers' `officers.auth_uid` was unlinked (a gap in
the June 17 launch via `set-passwords.ts`), causing RLS to silently reject
completion writes.

## What was actually found (verified in Supabase SQL Editor, 2026-06-19)
- **All 7 real officers are linked** — `officers.auth_uid` matches their
  `auth.users` id. The proposed re-link `UPDATE` was a **no-op (0 rows)**.
- **RLS policies are correct** — write policy gates on
  `officers.auth_uid = auth.uid()`; with officers linked, writes work.
- **The write path works** — 1 completion already in the table: ADMIN-EGPD
  (Andrew), "Search & Seizure — Fourth Amendment", 75/100, passed.
- Only unlinked row is the Health Check Bot (not a real officer).
- Linkage was handled at launch by the saved Supabase query
  **"Seed Officers and Link Auth Records,"** not by `set-passwords.ts`.

The suspected bug **did not exist** — the diagnosis inherited a faulty premise.

## The real signal: engagement, not tech
Officers have logged in but none have completed Module 1 (unlocked June 17). This
is behavioral, not technical. Lever = a Chief/Sgt nudge to complete Module 1.
Monitor with `_supabase/scripts/login-activity.ts` (read-only; shows last login,
auth-link status, modules passed).

## Forward fix — APPLIED this session
`_supabase/scripts/set-passwords.ts` now **self-links `auth_uid`** when it creates
an account (or finds an officer with a missing/stale link), so future onboards
never depend on the separate "Seed Officers and Link Auth Records" query. Type-checked
clean. Recommended: run it in dry-run before the next agency to confirm `would link`
counts look right.

## Artifacts
- `_database/egpd/2026-06-19-egpd-relink-auth-uid.sql` — idempotent re-link +
  before/after verification queries. Safe to keep as a break-glass tool; it was a
  no-op here but is the right fix if linkage ever drifts.
- `_supabase/scripts/login-activity.ts` — engagement/linkage monitor.
