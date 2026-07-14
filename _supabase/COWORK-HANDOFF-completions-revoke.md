# Completions write-path revoke — Step 3 standalone (RESOLVED 2026-07-14)

**Date opened:** 2026-07-12 · **Date closed:** **2026-07-14**

> **RESOLVED 2026-07-14.** SQL executed in BOTH projects (Cowork session,
> Andrew's explicit per-project confirmation for each). Before/after confirmed
> via `pg_policies` in each: `"Officers can write own completions"` dropped;
> exactly two SELECT policies remain (`Admins can read all completions`,
> `Officers can read own completions`). Live verification complete:
> - *Anon-role* forgery upsert rejected on both live sites via each page's
>   own `_sb` client — `42501 new row violates row-level security policy`
>   (HTTP 401), machine-verified.
> - *Signed-in* checks confirmed by Andrew on both subdomains 2026-07-14:
>   forgery upsert as the preview account returns the RLS error, and a real
>   quiz pass records normally with no server warning.
>
> The browser write path to `completions` is closed everywhere; the only
> write path is `/api/grade {action:'finalize'}` with the per-department
> service key. Same day, unlock dates also went server-side in that endpoint
> (commit `8f0997f`) — a locked module can't be graded or finalized except
> by the `can_preview` account.
**Projects:** MTPD Supabase — `https://lkikznncbpfcmgnnyigj.supabase.co` · EGPD Supabase — `https://kczrylxnrzkcwgivlqrs.supabase.co`
**Job:** SQL Editor work in BOTH projects (Cowork). Drop the one RLS policy that
still lets an officer's browser write its own completion rows. This is Step 3 of
`COWORK-HANDOFF-completions-server-write.md`, extracted here as a paste-ready
standalone. Earliest run date: **2026-07-14** (three days after Andrew's Step 2
quiz-pass verification on 2026-07-11 — see gate below).

---

## ⛔ GATE — all three must be true before running anything

- [x] **Andrew verified Step 2 live:** a quiz pass as the preview account recorded
      cleanly (no "score could not reach the server" warning) on BOTH
      `egpd.arbiterle.com` and `mtpd.arbiterle.com`. Date verified: **2026-07-11**.
- [x] **≥3 days have passed since that verification** (offline completion queues
      drained through the old path). Verification was 2026-07-11 → earliest run
      is **2026-07-14**. Run date: **2026-07-14**.
- [x] **Andrew gives the go in this Cowork session** — this is the point of no
      return for client-side completion writes. Given 2026-07-14, per project.

If any box is unchecked, stop. Do not run the SQL.

## Why

`/api/grade {action:'finalize'}` (deployed 7/11, commit `1adb53a`) now grades
answers server-side and writes the completion row itself via a service key that
lives only in Vercel. The officers' direct browser write path is still open as a
safety net — and it's the hole that lets any signed-in officer forge a
`passed = true` row with one PostgREST call. Dropping the policy closes it.
This clears the last hard-gate item of server-side hardening except reading
content (parked post-pilot).

## What this is NOT

- **Not destructive to data.** Drops one RLS *policy* per project — no tables,
  no rows, no schema. Officers keep reading their own records; admins keep
  reading everything. Server writes bypass RLS by design (service key).
- Run nothing beyond the blocks below. Errors or unexpected output → stop and
  report back.

---

## The change — run in EACH project's SQL Editor

⚠️ Check the project ref in the URL before running — MTPD is
`lkikznncbpfcmgnnyigj`, EGPD is `kczrylxnrzkcwgivlqrs`. The block is identical
for both (also in the repo: `_database/<dept>/2026-07-10-<dept>-completions-server-write-only.sql`).

```sql
-- 1) BEFORE: expect "Officers can write own completions" (cmd = ALL) present
SELECT policyname, cmd
FROM pg_policies
WHERE tablename = 'completions'
ORDER BY policyname;

-- 2) THE CHANGE — after this, no officer/authenticated write path remains.
DROP POLICY IF EXISTS "Officers can write own completions" ON completions;

-- 3) AFTER: expect exactly two rows —
--      Admins can read all completions    | SELECT
--      Officers can read own completions  | SELECT
SELECT policyname, cmd
FROM pg_policies
WHERE tablename = 'completions'
ORDER BY policyname;
```

## Verify end-to-end on EACH subdomain

1. **Forgery is dead:** signed in as the preview account, browser dev console:
   `await _sb.from('completions').upsert({ badge_number: 'PREVIEW', module_id: 'x' })`
   → must return a row-level-security / permission error.
2. **Real completions still record:** finish a quiz as the preview account —
   results screen shows normally, no server warning.

**Done when:** both checks pass on both subdomains.

## Close-out

Mark this doc RESOLVED with the date, mark Step 3 closed in
`COWORK-HANDOFF-completions-server-write.md` (same repo folder), and tell the
Claude Code Training Platform session so the work board and hardening memory
get updated.
