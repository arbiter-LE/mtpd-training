# Cowork Handoff — MTPD Supervisor Track (Supabase)

**Date:** 2026-06-23
**Project:** MTPD — `lkikznncbpfcmgnnyigj` (mtpd.arbiterle.com)
**Status:** Code is deployed & live (commit `2d6830b`). The ONLY remaining action is the SQL below.

## What's already done (no action needed)
- All 12 MTPD modules now carry the supervisor track (reading overlay + supervisor scenario + 8 graded supervisor questions). Live in production.
- `registry.js` has `features.supervisorTrack: true` for MTPD.
- The feature is **dormant until the SQL runs**. Without the `track` column, every user — including the three supervisors — falls back to patrol content. Patrol experience is unchanged either way. Admins can already preview both tracks via the in-app "Viewing as" toggle.

## The one action — run this SQL against the MTPD project
File: `_database/mtpd/2026-06-23-add-supervisor-track.sql`

```sql
ALTER TABLE public.officers
  ADD COLUMN IF NOT EXISTS track text NOT NULL DEFAULT 'patrol'
  CHECK (track IN ('patrol','supervisor'));

UPDATE public.officers
   SET track = 'supervisor'
 WHERE badge_number IN ('79C', '79S', '7903');

SELECT badge_number, name, rank, role, track
  FROM public.officers
 ORDER BY role DESC, badge_number;
```

## Notes
- **Additive & safe.** `ADD COLUMN IF NOT EXISTS` with a default + three targeted `UPDATE`s. Nothing dropped or altered. No RLS change needed — `track` is read via the existing `select('*')` on `officers`.
- **Three supervisors:** `79C`, `79S`, `7903` (Andrew). They keep their existing `role`; `track='supervisor'` is independent of `role` (role = dashboard access; track = which content/quiz is served).
- **Expected verification output:** every officer has a `track` value; `79C`, `79S`, `7903` read `supervisor`, everyone else `patrol`.
- Mirrors the EGPD setup: `_database/egpd/2026-06-14-add-supervisor-track.sql` / `_supabase/COWORK-HANDOFF-supervisor-track.md`.
- The supervisor track is additive — it does not touch patrol content or patrol quizzes, so running this does not invalidate any existing patrol completion records.
