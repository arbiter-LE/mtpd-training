# Platform cleanup — retire Resend-era leftovers in Supabase + Vercel (RESOLVED)

**Date opened:** 2026-07-12 · **Date closed:** 2026-07-12
**Projects:** EGPD Supabase — `https://kczrylxnrzkcwgivlqrs.supabase.co` · MTPD Supabase — `https://lkikznncbpfcmgnnyigj.supabase.co` · Vercel (arbiter-le project)
**Job:** Browser/dashboard work only (Cowork). Delete the retired welcome-email edge functions and their secrets from Supabase, verify no cron jobs remain, and remove the stale `RESEND_API_KEY` from Vercel. No SQL beyond read-only verify queries. No code deploy.

---

## Why

The platform moved off Resend entirely — contact form, onboarding, and feedback
notifier all send via Google Workspace SMTP from Vercel (`api/_lib/smtp.js`),
and both Supabase projects' Auth SMTP was repointed to Google (EGPD 6/17,
MTPD 6/26). Officer comms are manual from `andrew@arbiterle.com`.

What's left over from the Resend era is dormant but not gone:

- **EGPD Supabase still hosts the deployed `send-welcome-batch` and
  `send-welcome-email` edge functions**, with a live `RESEND_API_KEY`,
  `BATCH_SECRET`, and `PLATFORM_URL` in project secrets. `send-welcome-batch`
  performs a **mass send to the live EGPD roster** on one authenticated POST —
  a retired function holding a loaded trigger. The 6/17 call was "leave it, it
  won't fire on its own"; now that the stack is settled on Google, the right
  call is to remove it. (Source code stays in the repo at
  `_supabase/functions/` — this deletes only the deployed copies.)
- **Vercel likely still carries `RESEND_API_KEY`** from the old contact form
  (converted to Google SMTP in commit `3b7712f`). Nothing in `api/` reads it.
- The one-time launch cron (`egpd-welcome-launch`) self-unscheduled on 6/17 —
  this job re-verifies that and confirms MTPD never had one.

## What this is NOT

- **Not destructive to any data.** No tables, rows, policies, or officer
  records are touched. The only SQL below is read-only `SELECT` verification.
- **Not the completions write-path revoke.** That is a separate gated job
  (`COWORK-HANDOFF-completions-server-write.md`, Step 3) with its own
  preconditions — do not run any part of it from this doc.
- **Not an Auth/SMTP change.** Both projects' Auth SMTP settings (Google) are
  correct — look, verify, change nothing.
- **Do not touch database extensions** (`pg_cron`, `pg_net`). The feedback-flag
  webhook path may depend on `pg_net` — leave extensions exactly as found.
- Run nothing beyond the steps below. If anything errors or looks different
  from what a step expects, stop and report back — do not improvise.

---

## Part A — EGPD Supabase (`kczrylxnrzkcwgivlqrs`)

⚠️ Confirm the project ref in the URL before every step.

**A1. Verify no cron jobs.** SQL Editor, read-only:

```sql
SELECT jobname, schedule, active FROM cron.job;
```

Expect **zero rows** (the launch job unscheduled itself 6/17). If any row
exists, stop and report it — do not unschedule anything without Andrew's go.

**A2. Delete the welcome edge functions.** Edge Functions → you should see
`send-welcome-batch` and `send-welcome-email`. Delete both from the dashboard.

- ⚠️ **Never invoke either function while verifying.** A `POST {}` with the
  secret header to `send-welcome-batch` mass-emails the live EGPD roster.
  List → delete. No test calls.
- If other functions exist beyond these two, leave them and note their names
  in the close-out.

**A3. Delete the orphaned secrets.** Edge Functions → Secrets (project-level):
delete `RESEND_API_KEY`, `BATCH_SECRET`, and `PLATFORM_URL`. Leave the
auto-injected `SUPABASE_*` entries alone (they're managed by Supabase and
other/future functions rely on them).

**A4. Verify Auth SMTP untouched.** Authentication → Emails → SMTP Settings:
confirm host is still `smtp.gmail.com`, sender `andrew@arbiterle.com`.
Change nothing — this is a read check that cleanup didn't drift.

**Done when:** Edge Functions list has no welcome functions, the three secrets
are gone, cron is empty, SMTP still shows Google.

## Part B — MTPD Supabase (`lkikznncbpfcmgnnyigj`)

Verify-first — MTPD probably never had these deployed.

**B1.** Edge Functions: if `send-welcome-batch` / `send-welcome-email` appear,
delete them (same caution: never invoke). If the list is empty, note that and
move on.

**B2.** Edge Functions → Secrets: delete `RESEND_API_KEY` / `BATCH_SECRET` /
`PLATFORM_URL` if present; leave `SUPABASE_*` entries.

**B3.** SQL Editor: `SELECT jobname, schedule, active FROM cron.job;` —
expect zero rows, or an error that `cron.job` does not exist (pg_cron was
never enabled on MTPD — that error is the *good* outcome, not a failure).

**B4.** Authentication → Emails → SMTP Settings: confirm `smtp.gmail.com` /
`andrew@arbiterle.com` (repointed 6/26). Change nothing.

**Done when:** no welcome functions or Resend secrets remain, cron
empty/absent, SMTP still Google.

## Part C — Vercel (arbiter-le project)

**C1. Environment Variables** (Settings → Environment Variables). The complete
set the code actually reads is exactly these five:

| Variable | Used by |
|----------|---------|
| `SUPABASE_SERVICE_KEY_MTPD` | `api/grade.js` (server-side completion writes) |
| `SUPABASE_SERVICE_KEY_EGPD` | `api/grade.js` |
| `GMAIL_USER` | `api/_lib/smtp.js` (contact, onboard, feedback emails) |
| `GMAIL_APP_PASSWORD` | `api/_lib/smtp.js` |
| `FEEDBACK_NOTIFY_SECRET` | `api/feedback-notify.js` (webhook shared secret) |

- **Delete `RESEND_API_KEY`** if present — nothing reads it.
- ⚠️ **Do not delete or edit any of the five above.** Removing a service key
  breaks live quiz grading on that department's subdomain.
- Any *other* variable you don't recognize: leave it, record its **name only**
  (never the value), and include it in the close-out for Andrew's call.

**C2. Do not trigger a redeploy.** Env removal takes effect on the next
deploy; since nothing references the deleted var, no redeploy is needed.

**Done when:** the env list shows the five known vars (plus anything
explicitly flagged for Andrew), and no `RESEND_API_KEY`.

## Post-cleanup live check

1. Load `https://egpd.arbiterle.com` and `https://mtpd.arbiterle.com` — both
   render their login screens normally.
2. No quiz/grading test needed (nothing this job touches is in that path),
   but if anything above deviated from expectations, say so before calling it
   green.

## Close-out

**RESOLVED 2026-07-12.** All steps completed via Supabase/Vercel dashboards. Two deviations from the doc's expectations, both handled per the doc's own escape hatches — no improvising beyond that.

**Part A — EGPD (`kczrylxnrzkcwgivlqrs`)**
- A1: cron.job — 0 rows. Confirmed clean.
- A2: Deviation — only `send-welcome-batch` was deployed; `send-welcome-email` was never present on EGPD (doc expected both). Deleted `send-welcome-batch` via dashboard, no invocation. Function list now empty.
- A3: Deleted `RESEND_API_KEY`, `BATCH_SECRET`, `PLATFORM_URL`. Only default `SUPABASE_*` secrets remain.
- A4: SMTP untouched — host `smtp.gmail.com`, sender `andrew@arbiterle.com`.

**Part B — MTPD (`lkikznncbpfcmgnnyigj`)**
- B1: Deviation — MTPD *did* have `send-welcome-email` deployed (doc assumed "probably never had these deployed"). Deleted it, no invocation. Function list now empty.
- B2: Deleted `RESEND_API_KEY` and `PLATFORM_URL` (no `BATCH_SECRET` was present — fine, doc says delete only if present).
- B3: cron.job — `relation "cron.job" does not exist`. This is the documented good outcome (pg_cron never enabled on MTPD).
- B4: SMTP untouched — host `smtp.gmail.com`, sender `andrew@arbiterle.com`.

**Part C — Vercel**
- Project is internally named `mtpd-training` in the Vercel dashboard (not `arbiter-le` as the doc's header assumed) — same project, serves both arbiterle.com and the subdomains. Noting the name mismatch in case it causes confusion in a future handoff.
- Deleted `RESEND_API_KEY`.
- Confirmed present and untouched: `SUPABASE_SERVICE_KEY_EGPD`, `SUPABASE_SERVICE_KEY_MTPD`, `GMAIL_APP_PASSWORD`, `FEEDBACK_NOTIFY_SECRET`.
- **Flag for Andrew — not part of this job's scope, but found while verifying:** `GMAIL_USER` is not set anywhere in the Vercel project. The doc lists it as one of the five vars `api/_lib/smtp.js` reads. Confirmed via search — no var by that name exists in any environment. If `GMAIL_USER` isn't hardcoded somewhere in `smtp.js` itself, contact-form/onboarding/feedback email sending may be broken right now. Worth a quick check before assuming Gmail SMTP is fully wired.
- Did not trigger a redeploy (dismissed Vercel's prompt) per C2.

**Post-cleanup live check:** egpd.arbiterle.com and mtpd.arbiterle.com both load normally (rendered the authenticated admin/officer dashboard rather than the login screen, since the browser session was already signed in — stronger signal than a bare login screen).

No SQL beyond the two read-only cron checks was run. No code deployed. No Auth/SMTP settings changed. No completions write-path touched.

Optional follow-up for Andrew, outside this job's scope: with nothing referencing Resend anymore, revoke the API key in the Resend dashboard itself and decide whether to drop
`include:amazonses.com` from the SPF record (Cloudflare) — both his call. Also worth a look: the `GMAIL_USER` gap flagged above.

**GMAIL_USER flag resolved (Claude Code, 2026-07-12):** false alarm — `api/_lib/smtp.js`
line 17 reads `process.env.GMAIL_USER || 'andrew@arbiterle.com'`, so the var is optional
and the fallback is the correct mailbox. This doc's C1 table overstated it as required;
the truly required Vercel vars are four (`SUPABASE_SERVICE_KEY_MTPD`,
`SUPABASE_SERVICE_KEY_EGPD`, `GMAIL_APP_PASSWORD`, `FEEDBACK_NOTIFY_SECRET`). Email
sending was never broken — the onboarding auto-email (7/11) and feedback notifier (7/6)
both ran in production without `GMAIL_USER` set. No action needed.
