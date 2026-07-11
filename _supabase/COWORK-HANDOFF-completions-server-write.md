# Completions go server-write-only — 3-step deploy (OPEN)

**Date opened:** 2026-07-10 · **Date closed:** —
**Projects:** MTPD Supabase — `https://lkikznncbpfcmgnnyigj.supabase.co` · EGPD Supabase — `https://kczrylxnrzkcwgivlqrs.supabase.co` · Vercel (arbiter-le project)
**Job:** Three steps, strictly in order, spread over ~a week. Step 1 is browser work (Cowork). Step 2 is a Claude Code deploy (NOT Cowork). Step 3 is SQL Editor work (Cowork), only after Step 2 is verified and a few days have passed.

---

## Why

An officer's browser currently writes its own row to the `completions` table —
any signed-in officer could upsert a forged `passed = true` record with one
PostgREST call. This is the "completion-record write" residual of the
server-side hardening gate on the work board (HARD GATE before any paying
agency goes live; EGPD conversion ~2026-09-17).

The fix is already built and tested in the company repo (Claude Code session
2026-07-10, not yet deployed): `/api/grade {action:'finalize'}` now re-grades
the officer's committed answers server-side, derives the officer from their
verified JWT, and upserts the completion row itself using a per-department
service key that lives only in Vercel env vars. Once deployed and verified,
the officers' direct write path gets revoked in each Supabase project (Step 3)
— that revoke is what actually closes the hole.

## Why the order matters

- **Step 1 before Step 2:** if the code deploys before the env vars exist,
  every finalize call returns 503 and officers' passes queue client-side
  instead of recording. Nothing is lost (the queue replays), but don't create
  that window.
- **Step 2 before Step 3, with days between:** until Step 3 runs, the old
  direct write path still works — that's the safety net. Officers who had a
  completion stuck in their offline queue (legacy format) need time to sign
  in so it drains. Revoking early rejects those replays and a real pass could
  be dropped.

## What this is NOT

- Step 3 is **not destructive to data** — it drops one RLS *policy* per
  project. No table changes, no rows touched. Officers keep reading their own
  records; admins keep reading everything.
- Run nothing beyond the blocks below. If anything errors, stop and report
  back — do not improvise fixes.

---

## Step 1 — Service keys into Vercel (Cowork/browser; Andrew handles the keys)

The secret keys are credentials: **Andrew copies and pastes them himself.**
Claude (in Cowork or anywhere) navigates and verifies but never reads, types,
or stores the key values.

1. Open the **MTPD** Supabase project (`lkikznncbpfcmgnnyigj`) → **Settings →
   API keys**. Copy the **secret key** (`sb_secret_…`; on older projects this
   is the `service_role` key — either works).
2. Open Vercel → the Arbiter LE project → **Settings → Environment
   Variables**. Add:
   - Name: `SUPABASE_SERVICE_KEY_MTPD` · Value: the key from 1 ·
     Environment: **Production** (Preview optional).
3. Repeat for **EGPD** (`kczrylxnrzkcwgivlqrs`):
   - Name: `SUPABASE_SERVICE_KEY_EGPD` · Value: EGPD's secret key ·
     Environment: **Production**.
4. Names must match the code **exactly** (`SUPABASE_SERVICE_KEY_MTPD`,
   `SUPABASE_SERVICE_KEY_EGPD`). Don't redeploy from Vercel — Step 2's push
   picks the vars up.
5. ⚠️ Never put these keys in the repo, a chat, a doc, or a screenshot. If a
   key is ever exposed, rotate it in Supabase immediately.

**Done when:** both env vars show in Vercel's Production environment list.

## Step 2 — Deploy + live verify (Claude Code — the Training Platform project, NOT Cowork)

1. In the Claude Code Training Platform session, tell it **"ship it"** — the
   ship-safely gate shows the diff, runs the smoke test, and Andrew approves
   the commit/push. The change: `api/grade.js` finalize action + client
   rework in `js/app.js` / `js/config.js` (built and behavior-tested
   2026-07-10; 14 tests pass, smoke green on both departments).
2. After deploy, verify a pass records **through the server** on the live
   site: take any quiz as the preview/admin account on `egpd.arbiterle.com`
   and on `mtpd.arbiterle.com`, and confirm the results screen shows normally
   with **no** "score could not reach the server" warning.
3. If the warning appears, the env var name is wrong or missing — fix Step 1
   and re-test. Officers lose nothing in the meantime (old write path still
   open, queue replays).

**Done when:** a quiz pass on each subdomain records cleanly post-deploy.

> **Status 2026-07-11:** Deployed (commit `1adb53a`) and machine-verified live:
> new client on both subdomains, finalize endpoint fails closed (401 without a
> session), both sites render correct branding, internal docs 404, unknown
> subdomains NXDOMAIN. **Remaining for Step 2:** Andrew's live quiz pass as the
> preview account on each subdomain (2.2 above) — Claude has no login
> credentials, so this check is his. Step 3's ~3-day clock starts once that
> passes.

## Step 3 — Revoke the browser write path (Cowork/browser; ≥3 days after Step 2)

Preconditions — all three must be true:
- [ ] Step 2 verified on both subdomains
- [ ] At least ~3 days have passed since the deploy (offline queues drained)
- [ ] Andrew gives the go — this is the point of no return for client writes

Run in **each** project's SQL Editor. ⚠️ Check the project ref in the URL
before running — MTPD is `lkikznncbpfcmgnnyigj`, EGPD is
`kczrylxnrzkcwgivlqrs`. The block is identical for both (also saved locally
in the company repo: `_database/<dept>/2026-07-10-<dept>-completions-server-write-only.sql`).

```sql
-- 1) BEFORE: expect "Officers can write own completions" (cmd = ALL) present
SELECT policyname, cmd
FROM pg_policies
WHERE tablename = 'completions'
ORDER BY policyname;

-- 2) THE CHANGE — after this, no officer/authenticated write path remains.
--    The service key used by /api/grade bypasses RLS by design.
DROP POLICY IF EXISTS "Officers can write own completions" ON completions;

-- 3) AFTER: expect exactly two rows —
--      Admins can read all completions    | SELECT
--      Officers can read own completions  | SELECT
SELECT policyname, cmd
FROM pg_policies
WHERE tablename = 'completions'
ORDER BY policyname;
```

Then verify end-to-end on each subdomain:
1. **Forgery is dead:** signed in as the preview account, open the browser
   dev console and run
   `await _sb.from('completions').upsert({ badge_number: 'PREVIEW', module_id: 'x' })`
   — it must come back with a row-level-security / permission error.
2. **Real completions still record:** finish a quiz as the preview account —
   results screen shows normally, no server warning.

**Done when:** both checks pass on both subdomains.

## Close-out

Mark this doc RESOLVED with the date, and tell the Claude Code Training
Platform session it's done so the work board row ("Server-side hardening
residuals") gets updated — after this, the only remaining residual is
reading content in client JS (low stakes, parked post-pilot).
