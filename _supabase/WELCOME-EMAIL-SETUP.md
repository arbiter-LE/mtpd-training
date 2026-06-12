# Officer Welcome Email — Setup Guide

Sends a branded welcome email to each new officer automatically when their account is created.

**Stack:** Supabase Edge Function → Resend → officer's department email

---

## Step 1 — Run the SQL migration

In **Supabase Dashboard → SQL Editor**, run:

```
_database/2026-06-07-add-officer-email.sql
```

This adds the `email` column to the `officers` table. Do this for each department's Supabase project.

---

## Step 2 — Deploy the Edge Function

Install the Supabase CLI if you haven't:
```bash
brew install supabase/tap/supabase
supabase login
```

Deploy to MTPD's project:
```bash
cd _supabase
supabase functions deploy send-welcome-email --project-ref lkikznncbpfcmgnnyigj
```

---

## Step 3 — Set environment variables

In **Supabase Dashboard → Project Settings → Edge Functions**, add:

| Variable | Value |
|----------|-------|
| `RESEND_API_KEY` | Your Resend API key |
| `PLATFORM_URL` | `https://mtpd.arbiterle.com` |

---

## Step 4 — Create the database webhook

In **Supabase Dashboard → Database → Webhooks → Create new webhook**:

| Field | Value |
|-------|-------|
| Name | `welcome-email-on-insert` |
| Table | `officers` |
| Events | `INSERT` only |
| Type | Supabase Edge Function |
| Function | `send-welcome-email` |

---

## Step 5 — Add email when creating officers

When inserting officers (via SQL or future admin UI), include the `email` field:

```sql
INSERT INTO officers (badge_number, name, rank, role, email, password_hash)
VALUES ('1250', 'Officer A. Carter', 'Patrol Officer', 'officer',
        'acarter@marlborough-pa.gov',
        '2a97516c354b68848cdbd8f54a226a0a55b21ed138e207ad6c5cbb9c00aa5aea');
```

The welcome email fires automatically. Officers without an `email` value or with `role = 'admin'` are skipped silently.

---

## Per-department notes

Each department has its own Supabase project. To enable for a new agency:
1. Run the SQL migration on their project
2. Deploy the function to their project ref
3. Set `PLATFORM_URL` to their subdomain (e.g. `https://egpd.arbiterle.com`)
4. Create the webhook on their project

---

## Testing

Insert a test officer with your own email to verify:

```sql
INSERT INTO officers (badge_number, name, rank, role, email, password_hash)
VALUES ('TEST1', 'Officer Test User', 'Patrol Officer', 'officer',
        'your@email.com',
        '2a97516c354b68848cdbd8f54a226a0a55b21ed138e207ad6c5cbb9c00aa5aea');

-- Clean up after testing
DELETE FROM officers WHERE badge_number = 'TEST1';
```
