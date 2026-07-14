# Resend full retirement — revoke key + remove DNS authorization (RESOLVED)

**Date opened:** 2026-07-12 · **Date closed:** 2026-07-12
**Systems:** Resend dashboard (resend.com) · Cloudflare DNS (zone `arbiterle.com`)
**Job:** Browser work only (Cowork). Revoke the unused Resend API key, remove the
`arbiterle.com` domain from Resend, and delete the DNS records that still authorize
the retired Resend/SES path to send as arbiterle.com. No Supabase, no Vercel, no code.
**Preconditions:** none — the deployed Resend infrastructure was already deleted from
Supabase and Vercel on 2026-07-12 (`COWORK-HANDOFF-platform-cleanup.md`). Nothing
references Resend anywhere.

---

## Why

Resend was fully retired from the live platform (Google SMTP everywhere since
6/17–6/26; deployed edge functions and secrets deleted 7/12). But two leftovers
still *authorize* Resend/Amazon SES to send email as `arbiterle.com`:

- The SPF record still includes `amazonses.com`
- The `resend._domainkey` DKIM record is still published

Until these go, a vendor the platform no longer uses holds standing permission
to send mail as the brand domain. Removing them closes the last door.

## What this is NOT

- **Not a mail migration.** Google Workspace records stay exactly as they are.
- **Do NOT touch:** the root **MX** records (Google mail), **`google._domainkey`**
  (live DKIM — deleting it breaks outbound authentication), **`_dmarc`**, and any
  records for **`mtpd`**, **`egpd`**, **`www`**, or the apex A/CNAME (those serve
  the live sites).
- If a record doesn't match what a step describes, leave it and report back —
  do not improvise.

---

## Step 1 — Resend dashboard (do this BEFORE the DNS edits)

1. Sign in at resend.com (Andrew's account/session).
2. **API Keys** → delete/revoke every key listed. (The platform's copies were
   already deleted from Supabase and Vercel — nothing breaks.)
3. **Domains** → remove/delete `arbiterle.com`. This ends Resend's claim on the
   domain entirely.

**Done when:** no active API keys, no domains listed in Resend.

## Step 2 — Cloudflare DNS (zone `arbiterle.com`)

1. **Edit the SPF record** — the root TXT currently reading:
   `v=spf1 include:_spf.google.com include:amazonses.com ~all`
   Remove ` include:amazonses.com` so the value is exactly:
   `v=spf1 include:_spf.google.com ~all`
   (Edit in place — do not delete-and-recreate, and do not touch any other TXT.)
2. **Delete the `resend._domainkey` record** (TXT or CNAME — whichever type it is).
3. **Check for Resend bounce records:** if any records exist on a **`send`**
   subdomain (typically an MX and/or TXT mentioning `amazonses.com` or
   `feedback-smtp`), delete those too. If the `send` subdomain has records that
   do NOT mention amazonses/feedback-smtp, leave them and report back.

**Done when:** SPF shows only the Google include; no `resend._domainkey`; no
Resend `send` subdomain records remain; MX / `google._domainkey` / `_dmarc` /
site records all untouched.

## Step 3 — Verify

1. In Cloudflare, re-read the DNS list and confirm the do-not-touch records are
   all still present and unmodified: root MX (Google), `google._domainkey`,
   `_dmarc`, and the site records (apex, `www`, `mtpd`, `egpd`).
2. External check via Google's dig tool (`toolbox.googleapps.com/apps/dig`):
   - TXT for `arbiterle.com` → SPF shows `v=spf1 include:_spf.google.com ~all`
   - TXT for `resend._domainkey.arbiterle.com` → no record
   - TXT for `google._domainkey.arbiterle.com` → still returns the DKIM key
   (Propagation can lag a few minutes — re-check rather than re-edit.)

## Close-out — RESOLVED 2026-07-12

**Resend dashboard:**
- Deleted all 6 API keys (EGPD Welcome Batch, Health Check, Vercel Contact
  Form, Arbiter Edge Function, Supabase MTPD 2, Supabase MTPD). API keys page
  now shows "No API keys yet."
- Deleted the `arbiterle.com` domain from Resend. Domains page now shows
  "No domains yet."

**Cloudflare DNS (zone `arbiterle.com`):**
- Note: the zone lives under the **curtisandrew129@gmail.com** Cloudflare
  account, not the andrew@arbiterle.com account (that one is empty — no
  zones). Use the gmail account for any future DNS work on this domain.
- Edited the root SPF TXT record in place — removed `include:amazonses.com`.
  Now reads exactly: `v=spf1 include:_spf.google.com ~all`.
- Deleted the `resend._domainkey.arbiterle.com` TXT record (the Resend/SES
  DKIM key).
- **No `send` subdomain records existed** — checked the full record list (13
  records total, 12 after deletion) and there was no MX or TXT on a `send`
  subdomain. Nothing to remove there; matches the doc's "if not present,
  report back" contingency.
- Do-not-touch records confirmed untouched: root MX ×3 (Google), 
  `google._domainkey` (DKIM), `_dmarc`, and site records (apex, `www`, `mtpd`,
  `egpd` — all still CNAME to Vercel).

**External verification (Google dig tool):**
- `TXT arbiterle.com` → `v=spf1 include:_spf.google.com ~all` ✓
- `TXT resend._domainkey.arbiterle.com` → Record not found ✓
- `TXT google._domainkey.arbiterle.com` → DKIM key still returns ✓

Resend is fully retired — no active keys, no domain claim, no DNS
authorization remaining. Told the Claude Code Training Platform session to
drop the "DNS cleanup open" flag from the email-stack memory.
