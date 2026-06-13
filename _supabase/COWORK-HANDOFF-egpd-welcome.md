# Cowork Handoff — EGPD launch-morning welcome emails

**Goal:** Arm an automated send so every EGPD officer receives their "set your password"
welcome email at **08:00 ET on June 17** (= 12:00 UTC). A `pg_cron` job calls an edge
function that sends the mail, stamps each officer, and unschedules itself. All setup is
done in the **EGPD Supabase project** via the dashboard — no local toolchain needed.

> This is a real send to real police officers, gated by Andrew. Do NOT do the full send
> while testing. The only live action before launch is **one** test email to Andrew
> (see step 5). The cron is what sends to everyone on June 17.

---

## ⚠️ Read first — the one dangerous action

The function does the full mass send when it receives `POST {}` (empty body) with the
secret header. **Never send an empty-body request before launch** — it would email the
whole roster immediately. Pre-flight testing always uses `{"onlyEmail":"..."}`.

---

## What you need from Andrew (gather in-session, never commit these)

| Item | Where it lives |
|------|----------------|
| EGPD Supabase project access | He logs you into the EGPD project dashboard |
| EGPD **project ref** | Dashboard URL / Settings → General |
| **Resend API key** | Same key the platform already uses for auth email |
| A `BATCH_SECRET` | Generate one: any 48-char hex (e.g. run `openssl rand -hex 24`) |
| Andrew's **test inbox** | An address he controls, for the step-5 pre-flight |

---

## Assets in this repo (`_supabase/`)

- `cowork/send-welcome-batch.dashboard.ts` — **single-file** function to paste into the
  dashboard editor. (Source of truth = `functions/send-welcome-batch/index.ts` + `functions/_shared/welcome.ts`.)
- `egpd-welcome-cron.sql` — the schedule + guard column to run in the SQL Editor.

If the Cowork session can't see this repo, have Andrew paste the contents of those two
files into the session.

---

## Steps (all in the EGPD Supabase dashboard)

**1. Create the function.** Edge Functions → Create function → name it exactly
`send-welcome-batch`. Paste the entire contents of
`_supabase/cowork/send-welcome-batch.dashboard.ts`. Deploy **with "Verify JWT" turned
OFF** (it's gated by the secret instead).

**2. Set the function secrets.** Edge Functions → send-welcome-batch → Secrets (or
Project Settings → Edge Functions):
| Name | Value |
|------|-------|
| `RESEND_API_KEY` | Resend key |
| `PLATFORM_URL` | `https://egpd.arbiterle.com` |
| `BATCH_SECRET` | the secret you generated |

(`SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are injected automatically — don't add them.)

**3. Add the guard column + enable extensions.** SQL Editor, run:
```sql
alter table public.officers add column if not exists welcome_sent_at timestamptz;
create extension if not exists pg_cron;
create extension if not exists pg_net;
```
(pg_cron / pg_net can also be toggled under Database → Extensions.)

**4. Confirm the roster is ready.** SQL Editor:
```sql
select count(*) as will_receive
from public.officers
where role <> 'admin' and email is not null and welcome_sent_at is null;
```
The number should match the EGPD officer count Andrew expects. If it's 0 or wrong, STOP
and check with Andrew before going further.

**5. Pre-flight test — ONE email to Andrew.** This proves the whole chain without
touching the roster. From the dashboard function "Invoke"/test panel (or any HTTP tool),
send:
- Method: `POST`
- Header: `X-Batch-Secret: <BATCH_SECRET>`
- Body: `{"onlyEmail":"<andrew-test-inbox>"}`

Andrew should receive exactly **one** "Welcome to Arbiter LE" email, click **Set Your
Password**, and land on the EGPD set-password screen. Then delete the leftover test user:
Authentication → Users → find the test address → delete. If anything looks wrong, fix
before scheduling.

**6. Schedule the launch.** Open `_supabase/egpd-welcome-cron.sql`, replace `<EGPD-REF>`
and `<BATCH_SECRET>` with the real values, and run it in the SQL Editor. It schedules a
one-time job (`egpd-welcome-launch`) for 12:00 UTC June 17 that fires the function with
an empty body, then unschedules itself.

**7. Confirm it's armed.** SQL Editor:
```sql
select jobname, schedule, active from cron.job where jobname = 'egpd-welcome-launch';
```
You should see one active row with schedule `0 12 17 6 *`. Done — nothing else to do
until launch.

---

## After 08:00 ET June 17 — verify delivery

```sql
select count(*) filter (where welcome_sent_at is not null) as welcomed,
       count(*) filter (where welcome_sent_at is null and role <> 'admin') as not_yet
from public.officers;
```
`welcomed` should equal the officer count and `not_yet` should be 0. Cross-check the
Resend dashboard for the sends. Andrew is also confirming receipt with Chief Halteman.

---

## If you need to cancel or re-run

- **Cancel before launch:** `select cron.unschedule('egpd-welcome-launch');`
- **Someone got missed:** the function is safe to re-run with `POST {}` + the secret — it
  only emails officers whose `welcome_sent_at` is still null, so it won't double-send.
- **Resend/timezone notes:** June 17 is EDT (UTC−4) → 08:00 ET = 12:00 UTC. A winter date
  would be EST (UTC−5) → 13:00 UTC.
