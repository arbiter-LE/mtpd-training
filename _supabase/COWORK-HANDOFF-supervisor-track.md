# Cowork Handoff — EGPD Supervisor Track

**Prepared by Claude Code, 2026-06-14.** Everything in the codebase is done and verified; this doc covers the two steps that live outside Claude Code: the **Supabase schema change** and the **production commit/deploy**. Both are gated on Andrew's review of the content first.

---

## Status at handoff

- ✅ All 12 EGPD supervisor layers authored (reading overlay + 8 graded quiz questions each = 96 questions), wired into `modules-egpd.js`.
- ✅ Role-aware resolver in `js/app.js` (`effectiveTrack` / `activeQuestions` / `activeContentHtml`).
- ✅ Admin-only "Viewing as: Patrol | Supervisor" preview toggle (dashboard + reading screen).
- ✅ Validated: full `MODULES` build passes, citation gate green (no overruled-as-current law, no conflations), live-browser resolver + toggle confirmed, no console errors.
- ✅ **Shipped to production** 2026-06-14 — commit `11f7c28` (supervisor track) + `cac4bc0` (registry-driven loader). Live and verified on `egpd.arbiterle.com`.
- 📄 Review packet for Andrew: `Agency Onboarding/EGPD/2026-06-14-supervisor-track-review.md` (every overlay section map + all 96 questions with keyed answers).

**The ONLY remaining action is STEP 1 (the SQL) below.** STEP 2 (commit/deploy) is already done. The feature is **dormant until the SQL runs** — without the `track` column, every user (including Halteman/Mascio) falls back to patrol content, though admins can already preview both tracks via the in-app "Viewing as" toggle. Patrol experience is unchanged either way.

---

## STEP 1 — Supabase schema change (EGPD project)

**Project:** `kczrylxnrzkcwgivlqrs` (EGPD — `egpd.arbiterle.com`). **Do not run against MTPD.**

**Source of truth:** `_database/egpd/2026-06-14-add-supervisor-track.sql`

Run in the EGPD project's **SQL Editor**:

```sql
ALTER TABLE public.officers
  ADD COLUMN IF NOT EXISTS track text NOT NULL DEFAULT 'patrol'
  CHECK (track IN ('patrol','supervisor'));

UPDATE public.officers
   SET track = 'supervisor'
 WHERE badge_number IN ('85C', '85S1');   -- Chief Halteman, Sgt. Mascio

SELECT badge_number, name, rank, role, track
  FROM public.officers
 ORDER BY role DESC, badge_number;
```

**Expected verification output:** every officer has a `track` value; `85C` (Halteman) and `85S1` (Mascio) read `supervisor`, everyone else `patrol`. Additive only — `ADD COLUMN` with a default + two targeted `UPDATE`s. Nothing dropped.

**Safety notes:**
- No destructive SQL. No RLS change. No data deleted.
- Re-runnable: `IF NOT EXISTS` + idempotent `UPDATE`.
- Per project rule, this schema change requires Andrew's explicit go on the EGPD project by name — confirm before running.

---

## STEP 2 — Commit & deploy ✅ DONE (2026-06-14)

Shipped in commits `11f7c28` + `cac4bc0`, verified live. Kept here for the record; nothing to do.

<details><summary>Original deploy notes</summary>

Main is production; show the diff first.

Files in the change:
- `js/app.js` — resolver + preview toggle + logout reset
- `js/config.js` — `previewTrackOverride` state
- `js/modules/egpd/module-egpd-1..12.js` — supervisor overlay + questions (each)
- `js/modules/egpd/modules-egpd.js` — `withSupervisorOverlay` + per-module wiring
- `index.html` — toggle containers
- `css/styles.css` — toggle styles
- `_database/egpd/2026-06-14-add-supervisor-track.sql` — migration (internal; `_database/` is in `.vercelignore`)

Internal files NOT to deploy (confirm they stay `.vercelignore`'d): `_database/`, `_supabase/`, `Agency Onboarding/` (incl. the review packet). Already covered by `.vercelignore`.

Proposed commit message:

```
Add EGPD supervisor track: role-gated reading overlay + graded quizzes

Each of the 12 EGPD modules now serves a command-lens supervisor reading
(officer reading + overlay) and an 8-question graded supervisor quiz when
currentUser.track === 'supervisor'. Patrol content is unchanged.

Admin "Viewing as: Patrol | Supervisor" toggle lets admins preview either
track without affecting how supervisors are scored on their own track.
Requires the track column on EGPD officers (see _database/egpd/
2026-06-14-add-supervisor-track.sql).

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>
```

**Verify after deploy** (per project rule — anything touching content/registry gets checked on the live URL): on `egpd.arbiterle.com`, admin login → "Viewing as" toggle flips reading + quiz; patrol officer login → unchanged.

</details>

---

## STEP 3 — Post-deploy spot-check (Andrew or Cowork)

Once SQL + deploy are both done:
1. Log in as Halteman (`85C`) or Mascio (`85S1`) on `egpd.arbiterle.com` → confirm they land on the admin console (role unchanged) and that opening a module as a supervisor serves the supervisor reading + supervisor quiz.
2. Log in as any patrol officer → confirm the reading and quiz are the original patrol versions and no "Viewing as" toggle appears.
3. Confirm a supervisor quiz attempt records a completion normally.

## Timing note
EGPD modules unlock one per week starting June 17 (Module 1 first). The supervisor track is **additive** — landing it before June 17 is cleanest, but because it doesn't alter patrol content or patrol quizzes, it can also go in after launch without invalidating any patrol records. Only the two supervisors are affected.
