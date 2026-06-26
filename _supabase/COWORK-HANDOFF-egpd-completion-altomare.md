# COWORK HANDOFF — EGPD: Officer completion not appearing (pilot-critical)

> **CLOSED 2026-06-25 — ROOT CAUSE FOUND IN CLIENT CODE, NO DB ACTION NEEDED.**
> Andrew ran the live query (EGPD project `kczrylxnrzkcwgivlqrs`): Altomare (8509) has
> BOTH rows stored and passed — `egpd-search-seizure` 100% (6/22) and `egpd-use-of-force`
> 100% (6/25) — and `auth_linked: true`. The data was never missing. The real defect:
> `loadOfficerCompletions()` was defined in `config.js` but **never called** on officer
> login, so `completionData` loaded empty and the dashboard showed only modules finished
> in the current session (M2), making prior modules (M1) look wiped. Fixed in `js/app.js`
> `mountOfficerSession` — it now awaits `loadOfficerCompletions(badge)` before rendering.
> Shared-engine change (MTPD + EGPD), smoke-tested. **Cowork: nothing to do here.**
> A brief earlier note in this file (since corrected) wrongly predicted a missing M1 row —
> that hypothesis was wrong; the live data settled it.

**Created:** 2026-06-22 · **Closed:** 2026-06-25 · **Project:** EGPD Supabase

## Original symptom (2026-06-22, do not delete)
Officer Altomare replied to Andrew's check-in email (2026-06-22) saying he finished
Module 1. It was **not showing on the admin side** of the dashboard.

## Likely cause (needs live-DB confirmation)
Completions only persist if that officer's `officers.auth_uid` is linked to their
`auth.users` id — every write policy on the `completions` table gates on
`auth_uid = auth.uid()`. If the link is missing/stale, Postgres **silently rejects**
the insert.

Compounding it: the client save path (`js/config.js:131 saveCompletionToSupabase`)
does **not** check the `error` returned by `.upsert()`, and the officer's screen flips
to "results / passed" regardless. So a rejected write looks like success to the officer
and leaves nothing in the table.

## What Cowork needs to do (has live Supabase access; Claude Code does not)
Run against the **EGPD** Supabase project:

```sql
-- 1) Is Altomare's Auth account linked? (the RLS gate)
SELECT o.badge_number, o.name, o.email, o.role,
       o.auth_uid AS officer_auth_uid,
       u.id        AS auth_users_id,
       (o.auth_uid = u.id) AS linked
FROM officers o
LEFT JOIN auth.users u ON lower(u.email) = lower(o.email)
WHERE o.name ILIKE '%altomare%';

-- 2) Does any completion row exist for him?
SELECT c.badge_number, c.module_id, c.module_title, c.passed,
       c.last_score, c.attempts, c.completed_date, c.updated_at
FROM completions c
JOIN officers o ON o.badge_number = c.badge_number
WHERE o.name ILIKE '%altomare%';
```

## Interpretation / remedy
- **`linked = false`/null** → cause confirmed. Run the idempotent relink
  (`_database/egpd/2026-06-19-egpd-relink-auth-uid.sql`, the `UPDATE` step), then Andrew
  asks Altomare to redo Module 1 once (~15 min) — it'll save this time. His original
  attempt was rejected and was never stored.
- **`linked = true` but no completion row** → he didn't submit/pass the quiz, or he
  completed before the last relink. Same remedy: redo once.
- **completion row exists** → it's saving; the admin dashboard view is stale →
  hard-refresh.

## Report back
The two fields that settle it: `linked` (query 1) and whether query 2 returns any row.

## Ownership split
- **Cowork (this handoff):** confirm linkage + presence of an `egpd-search-seizure`
  (Module 1) completion row on live EGPD DB; relink if needed; have Andrew ask Altomare
  to redo Module 1 once. **← open item.**
- **Claude Code:** ✅ DONE — silent-swallow bug patched; a rejected write now warns the
  officer ("Your score could not be saved…") instead of faking a pass. Shipped in
  commit `cc9ffca` (`js/app.js` finishQuiz, lines ~1070–1078). No further code work.
