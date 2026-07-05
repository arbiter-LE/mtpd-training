# MTPD — repoint Auth SMTP off Resend → Google (same fix as EGPD)

**Date:** 2026-06-26
**Status:** ONE config task. Mirrors the EGPD fix from 6/17 that was never applied to MTPD.
**MTPD Supabase project ref:** `lkikznncbpfcmgnnyigj`

---

## Why this exists

Resend was retired at the **application** level (contact form → Gmail SMTP; welcome edge
functions dormant). But **Supabase Auth's recovery/reset emails are sent by a separate
per-project SMTP setting** in the dashboard. EGPD's was repointed Resend → Google on 6/17.
**MTPD's never was.**

Consequence: every MTPD password-reset email still rides Resend's shared IPs and gets
junked at `marlboroughpa.org`'s Microsoft filter — the same reputation failure that hit
EGPD at launch. This is the most likely reason **Sgt. Baird's 6/25 recovery email did not
get him in** (see `_database/mtpd/2026-06-26-baird-login-diagnostic-handoff.md`).

The Google `andrew@arbiterle.com` path is already **proven to inbox at Microsoft filters**
(confirmed against egreenville.org, which is O365). `arbiterle.com` already has live Google
DKIM (`google._domainkey`) and aligned SPF from the EGPD work — no DNS changes needed.

---

## THE TASK — repoint MTPD Auth SMTP to Google Workspace

**Step 1 — App Password (Andrew only; his Google account, his 2FA):**
myaccount.google.com → Security → 2-Step Verification ON → **App passwords** →
name it **"Supabase MTPD"** → copy the 16-char code.
*(Generate a fresh one rather than reusing the EGPD one — separate names let you revoke
either independently.)*

**Step 2 — MTPD Supabase → Authentication → Emails → SMTP Settings**, replace the Resend
values with:

| Field | Value |
|-------|-------|
| Host | `smtp.gmail.com` |
| Port | `587` |
| Username | `andrew@arbiterle.com` |
| Password | *(16-char "Supabase MTPD" app password)* |
| Sender email | `andrew@arbiterle.com` |
| Sender name | `Arbiter LE` |

**Step 3 — while you're in Auth → Email,** confirm the recovery-link expiry is sane
(EGPD's was found at 90 days — a liability). Set to **24h** (`86400s`) if it isn't already.

**Step 4 — Test:** trigger a password reset on mtpd.arbiterle.com for a test/own account →
confirm it lands in **inbox**, not Junk.

---

## Then close out Baird

Once SMTP is repointed and the test inboxes, Baird can be handled cleanly two ways:
- **Send him a fresh reset** — it'll now ride the proven-good Google path.
- **Or** set his password directly in Auth and hand it to him out-of-band (per the Baird
  diagnostic handoff). Either works; the SMTP fix is what makes the reset-email route
  reliable for him *and* the rest of the relaunched team going forward.

---

## Notes

- Sender is `andrew@`, not `noreply@` — intentional (recognizable; replies reach a human).
- Capacity: `smtp.gmail.com` ≈ 2,000 msgs/day — far beyond MTPD's needs.
- After this, Resend is genuinely used **nowhere live** across both projects. Update the
  launch-day-deliverability memory note to reflect MTPD is now also off Resend.
- **Backstop:** `_supabase/scripts/set-passwords.ts` sets a temp password directly (email-
  free) if Google SMTP ever fails. Emergency lever only.
