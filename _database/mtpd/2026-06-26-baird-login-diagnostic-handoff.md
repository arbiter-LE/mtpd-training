# MTPD — Baird Login Diagnostic & Auth_UID Audit Handoff
**Date:** 2026-06-26  
**For:** Claude Code  
**Status:** Read-only investigation complete. One action item remains — fix Baird's password.

---

## What Was Run

Full MTPD auth_uid audit + Baird login diagnostic via Supabase SQL editor (MTPD project: `lkikznncbpfcmgnnyigj`).

---

## Finding 1 — MTPD auth_uid audit: CLEAN

All 6 officers have valid, live auth_uid linkage. No relink needed. No silently-rejected completions from this cause.

| Badge | Name | Auth Email | UID Live |
|-------|------|-----------|---------|
| 79C | Chief Morgan | dmorgan@marlboroughpa.org | ✅ |
| healthcheck | Health Check Bot | healthcheck@arbiterle.com | ✅ |
| 7906 | Officer Cartagena | ccartagena@marlboroughpa.org | ✅ |
| 7903 | Officer Curtis | acurtis@marlboroughpa.org | ✅ |
| 7904 | Officer Mortimer | mmortimer@marlboroughpa.org | ✅ |
| 79S | Sgt. Baird | tbaird@marlboroughpa.org | ✅ |

The original Step 1 email-join query returned NULL for everyone because `officers.email` was NULL for all rows. **This has been fixed** (see Finding 2).

---

## Finding 2 — officers.email was NULL; now fixed

The `officers.email` column existed but was never populated. Fixed in same session:

**File:** `_database/mtpd/2026-06-26-mtpd-populate-officer-emails.sql` (already executed)

All 5 real officer rows now have `email_matches = true` against their live auth account. The email-based relink script (`2026-06-23-mtpd-audit-relink-auth-uid.sql`) will now work correctly if ever needed.

---

## Finding 3 — Baird login issue: PASSWORD PROBLEM, not data

Baird's account is clean at every level. The failure is a password issue.

**Auth account facts:**
- `email_confirmed_at`: 2026-05-31 — confirmed
- `banned_until`: NULL — not banned
- `last_sign_in_at`: **2026-05-31 09:55:30** — last successful login was May 31, before the relaunch
- `recovery_sent_at`: **2026-06-25 11:31:23 UTC** — password reset email sent yesterday
- `raw_app_meta_data`: `{"provider": "email"}` — standard email/password login
- `raw_user_meta_data`: `{"email_verified": true}` — verified

**Completions:** 0 rows. Baird has never gotten through the door since the June 24 relaunch.

**What happened:** His original password (set during May manual setup) stopped working. Either he forgot it, or it was reset during admin work. A recovery email was sent June 25 — unknown if he received and used it.

**Risk:** `@marlboroughpa.org` may have O365 filtering that quarantines the Resend recovery email, same issue that hit EGPD at launch.

---

## Action Required — Baird Password Reset

**Option A (preferred):** Check with Baird directly — did he get the reset email (sent 6/25) and successfully set a new password? If yes, he may already be in.

**Option B (if email didn't land):** Manually set his password via Supabase Auth dashboard:
- Project: MTPD (`lkikznncbpfcmgnnyigj`)
- Go to: Authentication > Users > tbaird@marlboroughpa.org > Send password reset OR set directly
- Convention from onboarding runbook: `MTPD` + badge = `MTPD79S` (or whatever Andrew wants to set)
- Deliver the password to Baird out-of-band (text, in person)

**Do NOT send another recovery email** until confirming O365 isn't eating them.

---

## No Other Officers Affected

Only Baird has zero completions and a recent recovery_sent event. All other officers' auth accounts show no anomalies. No action needed for anyone else.

---

## Files Created This Session

| File | What |
|------|------|
| `_database/mtpd/2026-06-26-mtpd-populate-officer-emails.sql` | Populated officers.email for all 5 real officers (already executed) |
| `_database/mtpd/2026-06-26-baird-login-diagnostic-handoff.md` | This file |

The staged audit SQL at `_database/mtpd/2026-06-23-mtpd-audit-relink-auth-uid.sql` was NOT executed — no relink was needed.
