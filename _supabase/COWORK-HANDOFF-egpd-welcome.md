# Cowork Handoff — EGPD launch-morning welcome emails

> ## ✅ ALREADY DEPLOYED & ARMED — DO NOT RE-RUN THE DEPLOY STEPS BELOW
>
> Deployed and armed by Cowork **2026-06-13**, and **re-verified 2026-06-14**: exactly one
> active cron job `egpd-welcome-launch` (jobid 1) in the EGPD project, targeting EGPD's own
> function URL, schedule `0 12 17 6 *`, `active=true`. No duplicate in EGPD; MTPD has no
> `pg_cron` at all. The roster is clean — exactly 3 recipients (Oliver 8507, Altomare 8509,
> Hopwood 8510), no PREVIEW, no `8508`.
>
> **Running STEP 0's create/secrets/schedule steps again would create a duplicate function
> or cron.** This doc is retained for reference and for the **post-launch verification** and
> **cancel/re-run** procedures only. If you need to confirm it's still armed, run the verify
> query (not the deploy): `select jobname, schedule, active from cron.job where jobname = 'egpd-welcome-launch';`

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

## STEP 0 — Roster integrity gate (do this FIRST, before anything else)

The cron emails **every non-admin officer row**, so the roster must be exactly right
*before* the function is armed. As of 2026-06-14 there is a **known anomaly**: a phantom
`8508` row that is NOT in the seed roster and that Andrew confirmed does not belong to a
real officer.

The authoritative roster (`_database/egpd/2026-06-11-egpd-seed-roster.sql`, confirmed
complete by Andrew 2026-06-11) is exactly:

| Badge | Name | Role | Gets welcome email? |
|-------|------|------|---------------------|
| 85C  | Chief Halteman  | admin   | No (admins are skipped) |
| 85S1 | Sgt. Mascio     | admin   | No (admins are skipped) |
| 8507 | Officer Oliver  | officer | **Yes** |
| 8509 | Officer Altomare| officer | **Yes** |
| 8510 | Officer Hopwood | officer | **Yes** |

So **exactly three officers should receive the welcome email**: Oliver, Altomare,
Hopwood. A platform admin row (e.g. `ADMIN-EGPD`) is fine — admins are skipped. A
`PREVIEW`/test row should NOT be present (a `2026-06-11-egpd-remove-preview-account.sql`
exists for that).

Run, and resolve with Andrew before continuing:

```sql
-- 1. Full roster — eyeball every row
select badge_number, name, rank, role, email, (auth_uid is not null) as auth_linked
from public.officers order by role desc, badge_number;

-- 2. The phantom row specifically — what is it?
select * from public.officers where badge_number = '8508';

-- 3. Exactly who will receive the email — must be ONLY Oliver/Altomare/Hopwood
select badge_number, name, email
from public.officers
where role <> 'admin' and email is not null;
```

**Hard gate — do NOT arm the email until ALL of these are true:**
- Query 3 returns exactly the three expected officers — **no `8508`, no `PREVIEW`, no strangers.**
- Any stray row is removed **only with Andrew's explicit go, as a scoped DELETE naming the EGPD project** (e.g. `delete from public.officers where badge_number = '8508';`) — never a blind delete, and only after Andrew confirms what the row is. Show him `select *` for the row first.
- Any `welcome-email-on-insert` database webhook is **disabled** (Dashboard → Database → Webhooks) — otherwise roster edits can fire live emails.

Only when the roster is provably clean do you proceed to the steps below.

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
This must equal **3** (Oliver, Altomare, Hopwood) and the identity check in STEP 0 must
already have passed. If the count is not 3, or STEP 0 hasn't been cleared, STOP — the
roster gate comes first.

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

---

## Ready-to-paste kickoff prompt (Claude-in-Chrome / Cowork session)

> You're finishing EGPD launch readiness in the **EGPD Supabase dashboard** (project
> `kczrylxnrzkcwgivlqrs`). Two tasks, strictly in order: **(1)** confirm the officers
> roster is clean, then **(2)** arm the launch-morning welcome-email automation. Follow
> `_supabase/COWORK-HANDOFF-egpd-welcome.md` exactly — STEP 0 first.
>
> **Rules — do not break these:**
> - **Never** send an empty-body POST to the `send-welcome-batch` function before launch.
>   Empty body = immediate mass send to the whole roster. Pre-flight is
>   `{"onlyEmail":"<Andrew's inbox>"}` only.
> - **Roster gate (STEP 0) must pass before arming.** The recipient list must be exactly
>   three officers — Oliver (8507), Altomare (8509), Hopwood (8510). There is a known
>   phantom row **`8508`** that is NOT in the seed and must be resolved with Andrew first.
>   `PREVIEW` should not be present.
> - **No DELETE or other destructive SQL** without Andrew's explicit confirmation naming
>   the EGPD project. Show him `select *` of the row first.
> - Confirm any `welcome-email-on-insert` database webhook is **disabled**.
>
> **You'll need from Andrew:** dashboard access, the Resend API key, a `BATCH_SECRET`
> (`openssl rand -hex 24`), and his test inbox. **Stop and ask him before any
> irreversible step** — removing a roster row, scheduling the cron, or sending. The cron
> fires automatically at **12:00 UTC June 17 (08:00 ET)** and self-unschedules.
