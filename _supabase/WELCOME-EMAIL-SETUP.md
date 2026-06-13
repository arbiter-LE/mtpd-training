# Officer Welcome Email — Setup Guide

Sends a branded **"set your password"** welcome email to officers. The email carries a
secure recovery link (Supabase Auth) that lands the officer on the platform's
set-new-password screen — the same flow as "Forgot password" in the app. No password
ever travels in plaintext.

**Stack:** Supabase Admin API (`generateLink`) → Resend → officer's department email

**Two delivery paths:**
- **One-time batch** (`_supabase/scripts/batch-welcome.ts`) — for a roster that is
  *already seeded* (e.g. EGPD). The webhook does NOT fire for existing rows.
- **Webhook** (the Edge Function) — fires automatically for officers added *later*.

> ⚠️ **Do not send to real officers without Andrew's explicit OK.** Both paths are safe
> to deploy/stage; the batch script is **dry-run by default** and sends nothing until
> you pass `--send`.

---

## Prerequisites (per department project)

1. **`email` column on `officers`** — run `_database/<dept>/...add-officer-email.sql` if not already present. Every officer row that should receive mail needs a valid `email`.
2. **Resend** is already live for the platform (auth emails send from `noreply@arbiterle.com`). Reuse the same Resend API key.
3. **Deno** — ships with the Supabase CLI. Used to run the function and the batch script.

---

## A. One-time batch send (seeded roster — e.g. EGPD)

This is what EGPD needs: the roster is seeded, so we send each existing officer a
set-password link. The script is **idempotent** — it creates a Supabase Auth user
(no password, email-confirmed) for any officer that doesn't have one yet, then mints
the recovery link.

```bash
export SUPABASE_URL="https://<egpd-project-ref>.supabase.co"
export SUPABASE_SERVICE_ROLE_KEY="<egpd service_role key>"   # Settings → API
export RESEND_API_KEY="<resend key>"
export PLATFORM_URL="https://egpd.arbiterle.com"

# 1) DRY RUN — lists who would receive mail. Creates nothing, sends nothing.
deno run --allow-net --allow-env _supabase/scripts/batch-welcome.ts

# 2) Single live test to yourself before the full run:
deno run --allow-net --allow-env _supabase/scripts/batch-welcome.ts --send --only=you@arbiterle.com

# 3) Full live send (only after Andrew's OK):
deno run --allow-net --allow-env _supabase/scripts/batch-welcome.ts --send
```

The `service_role` key is admin-level — keep it in your shell only, never commit it.

---

## B. Webhook for officers added later (optional)

Once the batch is done, wire the webhook so future hires get the email automatically
on insert.

### 1. Deploy the function

```bash
cd _supabase
supabase functions deploy send-welcome-email --project-ref <egpd-project-ref>
```

### 2. Set environment variables

In **Dashboard → Settings → Edge Functions** (these are NOT auto-injected):

| Variable | Value |
|----------|-------|
| `RESEND_API_KEY` | your Resend API key |
| `PLATFORM_URL` | `https://egpd.arbiterle.com` |

`SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are injected automatically — don't set them.

### 3. Create the database webhook

**Dashboard → Database → Webhooks → Create new webhook:**

| Field | Value |
|-------|-------|
| Name | `welcome-email-on-insert` |
| Table | `officers` |
| Events | `INSERT` only |
| Type | Supabase Edge Function |
| Function | `send-welcome-email` |

Officers with no `email` or `role = 'admin'` are skipped silently.

---

## Per-department checklist

Each department has its own isolated Supabase project. To enable for a new agency:

1. Ensure the `email` column + populated emails on `officers`.
2. Run the **dry-run batch** against their project ref to preview.
3. Get Andrew's OK, then `--send`.
4. (Optional) Deploy the function + webhook for future hires, with `PLATFORM_URL` set to their subdomain.

---

## C. Automated launch-morning send (EGPD — 08:00 ET June 17)

Fully server-side: a pg_cron job on EGPD's Postgres triggers the `send-welcome-batch`
edge function once at launch time, then unschedules itself. No laptop required.
The batch stamps `welcome_sent_at` per officer, so it can never double-send.

**Set this up in the days before launch — all on the EGPD project:**

1. **Generate a trigger secret** (keep it; you'll use it twice):
   ```bash
   openssl rand -hex 24
   ```

2. **Deploy the batch function** with JWT verification off (it's gated by the secret):
   ```bash
   cd _supabase
   supabase functions deploy send-welcome-batch --no-verify-jwt --project-ref <EGPD-REF>
   ```

3. **Set its env vars** — Dashboard → Settings → Edge Functions:
   | Variable | Value |
   |----------|-------|
   | `RESEND_API_KEY` | your Resend key |
   | `PLATFORM_URL` | `https://egpd.arbiterle.com` |
   | `BATCH_SECRET` | the secret from step 1 |

4. **Pre-flight test** (do NOT skip) — before scheduling, fire the manual script as a
   single live test to *yourself* to prove the whole chain end-to-end:
   ```bash
   deno run --allow-net --allow-env _supabase/scripts/batch-welcome.ts --send --only=andrew@arbiterle.com
   ```
   Click the link in your inbox, confirm it lands on the EGPD set-password screen, and
   confirm you received exactly **one** email (verifies `generateLink` doesn't also send).

5. **Schedule it** — open `_supabase/egpd-welcome-cron.sql`, replace `<EGPD-REF>` and
   `<BATCH_SECRET>`, and run it in the EGPD SQL Editor. It adds the guard column,
   enables `pg_cron`/`pg_net`, and schedules the one-time job for 12:00 UTC June 17.

6. **Verify it's armed:**
   ```sql
   select jobname, schedule, active from cron.job where jobname = 'egpd-welcome-launch';
   ```

7. **After 08:00 ET June 17, confirm delivery** (alongside the chief's confirmation):
   ```sql
   select count(*) filter (where welcome_sent_at is not null) as welcomed,
          count(*) filter (where welcome_sent_at is null and role <> 'admin') as not_yet
   from public.officers;
   ```
   Cross-check the Resend dashboard for the "Welcome to Arbiter LE" sends.

> **Timezone:** pg_cron runs in UTC. June 17 is EDT (UTC−4), so 08:00 ET = 12:00 UTC →
> cron `0 12 17 6 *`. If you ever move this to a winter date (EST, UTC−5), 08:00 ET = 13:00 UTC.

---

## How an officer experiences it

1. Receives "Welcome to Arbiter LE — Set Your Password".
2. Clicks **Set Your Password** → lands on their department login at `PLATFORM_URL` in recovery mode.
3. Sets a password, signs in with **email + password**.
4. The set-password link expires after a limited time (Supabase project setting); if it lapses they use **Forgot password** on the login page for a fresh one.
