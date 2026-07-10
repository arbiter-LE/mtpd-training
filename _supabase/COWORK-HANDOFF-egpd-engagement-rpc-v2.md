# EGPD engagement-stats RPC v2 — deploy in SQL Editor (OPEN)

**Date opened:** 2026-07-10 · **Date closed:** —
**Project:** EGPD Supabase — `https://kczrylxnrzkcwgivlqrs.supabase.co`
**Job:** Run one CREATE OR REPLACE FUNCTION block in the EGPD SQL Editor, verify the counts, close this doc.

---

## Why

The automated Monday engagement report reads aggregate stats from the
`egpd_engagement_stats()` RPC. The v1 roster filter excluded only badge
`'PREVIEW'`, so it also counted two synthetic platform seats as EGPD officers:

- Andrew's owner account — badge `ADMIN-EGPD`, email `andrew@arbiterle.com`,
  which carries **one test pass** (Search & Seizure, 75/100, from launch testing)
- The Health Check Bot — badge `healthcheck`

Result: the Week 4 report said **7 officers / 16 passes / 2 at zero** while the
admin dashboard correctly showed **5 officers / 15 passes / 1 at zero** (caught
by Andrew 2026-07-10 comparing the report against the live dashboard).

v2 mirrors the dashboard's `isPlatformAccount()` rule from `js/app.js` exactly:
exclude badges `PREVIEW`/`healthcheck`, badges starting `ADMIN-`, and any
`@arbiterle.com` email.

## What this is NOT

- **Not destructive.** `CREATE OR REPLACE FUNCTION` + grant statements only.
  No table changes, no rows touched, no data deleted.
- **Not a schema migration.** Officer data is unaffected.
- Run nothing beyond the block below. If anything errors, stop and report back —
  do not improvise fixes.

---

## Steps

1. Open the **EGPD** Supabase project (`kczrylxnrzkcwgivlqrs`) → **SQL Editor**.
   ⚠️ Confirm the project ref in the URL before running — never run this on the
   MTPD project (`lkikznncbpfcmgnnyigj`).
2. Paste and run the entire block below (also saved in the company repo at
   `_database/egpd/2026-07-10-egpd-engagement-stats-rpc-v2.sql`).
3. Run the sanity check and compare against the expected values in Step 4.

```sql
CREATE OR REPLACE FUNCTION public.egpd_engagement_stats()
RETURNS json
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public, pg_temp
AS $$
  WITH roster AS (
    -- Real trainees only — mirrors isPlatformAccount() in js/app.js.
    SELECT badge_number
    FROM officers
    WHERE badge_number NOT IN ('PREVIEW', 'healthcheck')
      AND badge_number NOT LIKE 'ADMIN-%'
      AND coalesce(lower(email), '') NOT LIKE '%@arbiterle.com'
  ),
  passes AS (
    SELECT c.module_id, c.updated_at, c.badge_number
    FROM completions c
    JOIN roster r ON r.badge_number = c.badge_number
    WHERE c.passed = TRUE
  )
  SELECT json_build_object(
    'generated_at',         now(),
    'total_officers',       (SELECT count(*) FROM roster),
    'officers_active_7d',   (SELECT count(DISTINCT badge_number) FROM passes
                               WHERE updated_at >= now() - interval '7 days'),
    'officers_with_zero',   (SELECT count(*) FROM roster r
                               WHERE NOT EXISTS (
                                 SELECT 1 FROM passes p WHERE p.badge_number = r.badge_number)),
    'modules_passed_total', (SELECT count(*) FROM passes),
    'modules_passed_7d',    (SELECT count(*) FROM passes
                               WHERE updated_at >= now() - interval '7 days'),
    'per_module',           (SELECT coalesce(
                               json_agg(json_build_object('module_id', module_id,
                                                          'passed_count', cnt)
                                        ORDER BY module_id), '[]'::json)
                             FROM (SELECT module_id, count(*) AS cnt
                                   FROM passes GROUP BY module_id) m)
  );
$$;

REVOKE ALL ON FUNCTION public.egpd_engagement_stats() FROM public;
GRANT EXECUTE ON FUNCTION public.egpd_engagement_stats() TO anon, authenticated;

-- Sanity check:
SELECT public.egpd_engagement_stats();
```

4. **Verify** the sanity-check JSON shows (values as of 2026-07-10 — passes may
   tick up if officers train in the meantime, but officer counts must match):
   - `total_officers`: **5**
   - `modules_passed_total`: **15**
   - `officers_with_zero`: **1**
   - If `total_officers` is still 7, the function didn't replace — check you ran
     the full block in the right project and re-run.
5. **Verify the public GET path** (what the report runtime uses). Open this URL
   in a browser tab — it should return the same JSON:
   `https://kczrylxnrzkcwgivlqrs.supabase.co/rest/v1/rpc/egpd_engagement_stats?apikey=sb_publishable_W9kN8bhnwKwMCwKv5zu5GA_xhiq-vXR`
   (That key is the public client-side publishable key — safe in a URL.)

## Close-out

When Steps 4–5 both check out, note the verified counts + date at the top of
this doc, mark it RESOLVED, and tell Andrew it's done so the Claude Code session
can re-pull the stats and issue the final corrected Week 4 report draft
(the two stale Week 4 drafts in Gmail should be deleted — one has blank numbers,
one has the inflated 7/16/2 numbers).
