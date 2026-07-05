# COWORK — EGPD email deliverability (RESOLVED + one config task)

**Date:** 2026-06-17 (updated evening — supersedes the earlier version of this file)
**Status:** EGPD pilot is **live and unblocked**. The deliverability mystery is **solved**, and the security/config follow-ups are **done**. One configuration task remains: repoint Supabase Auth SMTP off Resend so password-reset emails actually land.

**EGPD Supabase project ref:** `kczrylxnrzkcwgivlqrs`

---

## The diagnosis (settled tonight — read this first)

- **`egreenville.org` runs on Microsoft 365 / Exchange Online Protection.** Its MX is `egreenville-org.mail.protection.outlook.com`. (Chief Halteman said "we don't use O365" — he's not the backend owner; the MX is unambiguous Microsoft.)
- **Root cause = sending reputation on the Resend path, nothing else.** `arbiterle.com` is a new domain on Resend's **shared IPs**, which Microsoft junks by reflex. DNS/auth was never broken — Resend showed "Delivered" because Microsoft's gateway accepted the handshake, then filed it in users' Junk.
- **Proven fix path:** Andrew sent from **`andrew@arbiterle.com` (Google Workspace)** → an EGPD officer **received it in inbox**. Same domain, but riding Google's trusted IP reputation + DKIM (`google._domainkey`, live 6/17) + aligned SPF → passes DMARC → inboxes at Microsoft.
- **Decision:** Andrew sends all officer comms **manually from `andrew@arbiterle.com`** for the pilot. The borough O365 allowlist is **no longer required** (it was the old plan; the Google path doesn't depend on the borough doing anything).

---

## ✅ Already done (do not redo)

1. **`service_role` key rotated.** Old `sb_secret_6Ugez…` revoked; replacement is `egpd_admin_scripts` (`sb_secret_M1TZE…`). Edge functions unaffected (they use the auto-injected legacy `SUPABASE_SERVICE_ROLE_KEY` JWT, not `sb_secret_*`). Grab the new key from Settings → API Keys when running `set-passwords.ts` / `batch-welcome.ts`.
2. **Recovery-link expiry fixed.** Was **90 days** (7776000s) — a liability, not the assumed 1h. Now **24h** (86400s) in Auth → Email.
3. **SPF authorizes both paths.** `v=spf1 include:_spf.google.com include:amazonses.com ~all` (Google + Resend/SES). Done in Cloudflare.
4. **Google Workspace DKIM live.** `google._domainkey.arbiterle.com` generated + added; status "Authenticating email with DKIM."

---

## 🔧 THE ONE TASK: repoint Supabase Auth SMTP from Resend → Google Workspace

**Why:** password-reset / recovery emails are sent by Supabase Auth's custom SMTP, currently pointed at **Resend** → junked at Microsoft. Repoint it to Google so resets ride the **proven-good** `andrew@` path. This automates the exact send we confirmed tonight; the in-app reset flow itself needs no changes.

**Steps:**
1. **App Password** (Andrew's Google account, one-time): myaccount.google.com → Security → 2-Step Verification ON → **App passwords** → name "Supabase EGPD" → copy the 16-char code. *(Andrew must generate this — it's his account.)*
2. **EGPD Supabase → Authentication → Emails → SMTP Settings**, replace Resend values with:
   | Field | Value |
   |-------|-------|
   | Host | `smtp.gmail.com` |
   | Port | `587` |
   | Username | `andrew@arbiterle.com` |
   | Password | *(16-char app password)* |
   | Sender email | `andrew@arbiterle.com` |
   | Sender name | `Arbiter LE` |
3. **Test:** trigger a password reset on egpd.arbiterle.com → confirm it lands in **inbox**, not Junk.

**Notes:**
- Sender is `andrew@`, not `noreply@` — intentional. Better for a reset (recognizable, replies reach a human). Don't set up a `noreply@` send-as alias.
- Capacity: `smtp.gmail.com` ≈ 2,000 msgs/day — far beyond a 5-officer pilot's resets.
- **Backstop:** if Google SMTP ever fails, `set-passwords.ts` sets a temp password directly to text out. Emergency lever only, not primary.

---

## No longer needed / retired

- **O365 allowlist** — dropped from must-have to optional; manual `andrew@` path doesn't need it.
- **Resend domain warm-up** — abandoned for the pilot; we're not building Resend reputation, we're using Google's.
- **Recurring Resend reminder job** — none exists. The only cron ever written (`egpd-welcome-cron.sql`) was a one-time launch send that self-unschedules; it fired and removed itself 6/17. Verify with `select jobname, schedule, active from cron.job;` (expect empty).
- **`send-welcome-batch` edge function** — still calls Resend directly, but it's not scheduled and Andrew's going manual on welcome/comms, so it's effectively retired. Leave it; it won't fire on its own.

---

## Reference files

- `_supabase/scripts/set-passwords.ts` — email-free temp-password setter (backstop)
- `_supabase/functions/_shared/welcome.ts` — recovery link generation (`type: recovery`)
- `js/app.js` — recovery landing handler (`_recoveryLanding`, `_recoveryLinkError`)

## What happened (for the record)

- EGPD launch day: welcome emails showed "Delivered" in Resend but were junked by egreenville.org's Microsoft filter (new-domain/shared-IP reputation). Recovery flow compounded it.
- Resolved same day via `set-passwords.ts` (direct temp passwords, handed out manually); officers logged in, pilot unblocked.
- Evening: confirmed Google-path (`andrew@`) inboxes where Resend doesn't; locked in manual comms + this SMTP repoint as the durable fix.
