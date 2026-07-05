# COWORK HANDOFF — MTPD: audit officer auth_uid linkage (preventive)

**Created:** 2026-06-23 · **Project:** MTPD Supabase (`lkikznncbpfcmgnnyigj`) · **Owner of fix:** Cowork (live DB access)

## Why this exists
EGPD had a "completions never save / module won't show complete" bug. Root cause was
**not code** — it was data: officers whose `officers.auth_uid` was NULL/stale. Every
write policy on `completions` gates on `auth_uid = auth.uid()`, so an unlinked officer's
save is **silently rejected** by RLS and the module never shows complete.

The Arbiter engine is shared (MTPD + EGPD run identical save/load code), and the
silent-swallow code bug is already fixed (commit `cc9ffca` — officers now see a "could
not be saved" warning). **But auth_uid linkage is per-Supabase-project and does NOT carry
over from the EGPD fix.** MTPD uses the exact same RLS gate, so the same vulnerability is
structurally present.

Two reasons to check MTPD now rather than assume it's fine:
1. MTPD officers were linked **manually by badge** (the "Assign Auth UIDs by Badge"
   query), not by an automated email join — manual links go stale when Auth accounts are
   recreated.
2. MTPD is mid **team relaunch** — any officer whose Auth account was created/recreated
   after the manual linkage pass would be unlinked.

This is preventive. No officer has reported a problem yet; we want to catch it before the
relaunched team starts completing modules.

## What Cowork needs to do
Run against the **MTPD** Supabase project. The script is ready:
**`_database/mtpd/2026-06-23-mtpd-audit-relink-auth-uid.sql`**

- **Step 1 (read-only) settles it.** Lists every officer with a `linked` column.
- If **all officers `linked = true`** → MTPD is clean. Stop. Nothing else to do.
- If **any `false`/null row** → that's the EGPD bug present on MTPD. Run **Step 2** (the
  idempotent `UPDATE` — links by email, no deletes), then run **Step 3** to confirm every
  row is now `linked = true`.

## Report back
1. Did Step 1 show any unlinked officers? If so, **which badges/names**.
2. If you ran the relink, confirm Step 3 shows all `linked = true`.

## If officers were unlinked (Andrew's follow-up — do NOT do this yourself)
Completions those officers attempted *while unlinked* were rejected by RLS and were never
stored. After relinking, the affected officers must **redo only the affected modules**
once — the next attempt saves correctly. Andrew decides who to contact and how; do not
email officers.

## Ownership split
- **Cowork (this handoff):** run the audit on live MTPD DB, relink if needed, report which
  badges (if any) were affected.
- **Claude Code:** none — the code fix already shipped. This is data-only.
