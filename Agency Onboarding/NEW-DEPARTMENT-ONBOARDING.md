# Arbiter LE — New Department Onboarding Guide
**Operator reference · Claude-assisted workflow**

---

## Overview

This document is your master runbook for onboarding a new police department onto the Arbiter LE training platform. Follow the phases in order. Each phase includes the information you need to collect and the Claude prompts you can paste directly to do the work.

Estimated time from signed agreement to live platform: **2–4 hours of active operator work** spread over 1–3 days.

---

## Information to Collect First

Before opening Claude or touching any code, get these items from the department contact:

### Department Identity
- [ ] Full legal department name (e.g., "Lansdale Borough Police Department")
- [ ] Short name / abbreviation (e.g., "LBPD")
- [ ] Subdomain preference (e.g., `lansdale` → `lansdale.arbiterle.com`)
- [ ] Department badge / patch image (PNG, ideally transparent background, ~200×200px)
- [ ] Primary jurisdiction (borough, township, city — affects scenario road names and legal citations)
- [ ] State (PA assumed unless told otherwise — affects statute references throughout modules)

### Roster
- [ ] Officer roster: name, badge number, rank for each officer
- [ ] Which badge number(s) should have admin role
- [ ] Preferred initial password format (or use default: `[DEPT PREFIX][badge#]` — e.g., `EGPD8507`, `MTPD1041`)

### Contract / Billing
- [ ] Service agreement signed and filed
- [ ] Rate card tier confirmed by officer count (Tier 1: 1–10 = $1,800/yr · Tier 2: 11–20 = $2,400/yr · Tier 3: 21–25 = $3,000/yr) — annual billing, paid upfront
- [ ] Billing contact email
- [ ] Program start date (determines `SCHEDULE_START` in config)

### Technical
- [ ] Preferred go-live date
- [ ] IT contact name + email (only needed if they want a custom domain like `training.theirdept.gov` — not required for standard setup)

---

## ⛔ GATE — Before any PAYING agency goes live (Agency #3 onward)

**Server-side quiz grading must be in place before the first paying agency launches.** Today, every quiz answer key ships as a plain `correct: N` field inside the public module JS (e.g. `js/modules/<dept>/module-<dept>-N.js`) — it's a static deploy, so anyone can read the full answer key via view-source or by fetching the file directly, and grading happens client-side where it can be bypassed.

This was an **accepted risk for the EGPD pilot only** (free, no score, no compliance stakes). It is **not** acceptable once an agency is paying and may treat a completion record as a compliance/training-credit artifact — a chief's IT contact finding the answers in view-source is a credibility and liability problem.

Scope of the fix (do it in isolation, not mid-pilot on a live agency):
- Move questions + answer keys into Supabase (out of the client JS).
- Send only question text + options to the browser; never the correct index.
- Grade server-side (edge function / RPC); client never sees the key.
- Rework the quiz UI to call the grading endpoint.
- Run `node _dev/smoke-departments.js` + verify completions still save on **every** live subdomain before cutover (shared-engine change — touches all agencies at once).

Tracked on the internal work board as the top post-pilot Business-Infrastructure item. **Do not onboard a paying agency until this is closed.**

---

## Phase 1 — Supabase Setup

### 1A. Create a New Supabase Project

1. Log into [supabase.com](https://supabase.com) → New Project
2. Name it after the department short name (e.g., `arbiterle-lbpd`)
3. Choose a strong database password and save it in your password manager
4. Region: US East (closest to PA departments)
5. Once provisioned, go to **Project Settings → API** and copy:
   - `Project URL` → `supabaseUrl`
   - `anon public` key → `supabaseKey`

### 1B. Run the Schema

Paste the contents of [`_database/2026-05-18-supabase-schema.sql`](_database/2026-05-18-supabase-schema.sql) into the Supabase SQL Editor and run it. This creates:
- `officers` table (badge_number, name, rank, role, password_hash)
- `completions` table (all training records)

### 1C. Enable RLS (for any department beyond the pilot)

Run [`_database/2026-05-31-rls-and-auth-uid.sql`](_database/2026-05-31-rls-and-auth-uid.sql) in the SQL Editor. This locks down data so officers can only see their own records.

### 1D. Seed the Roster

**Claude prompt — paste this with the roster filled in:**

```
I'm onboarding a new department onto the Arbiter LE platform.

Department: [FULL NAME]
Short name: [SHORT NAME]

Here is the officer roster:
[paste name, badge number, rank, and whether admin for each officer]

Generate a Supabase SQL INSERT block for the officers table using this schema:
  INSERT INTO officers (badge_number, name, rank, role, password_hash) VALUES ...

Rules:
- role is 'admin' for command staff listed, 'officer' for everyone else
- password_hash is 'unused' (login is Supabase Auth; the column is NOT NULL legacy)
- Use ON CONFLICT (badge_number) DO NOTHING
- Format cleanly with one officer per line
```

Run the generated SQL in the Supabase SQL Editor.

### 1E. Configure Auth URLs (REQUIRED — skipping this breaks password resets)

Supabase defaults its Site URL to `http://localhost:3000`. If you skip this step, every password-reset email the project sends will redirect officers to localhost and dead-end them. This bit both MTPD and EGPD in June 2026 — do it at project creation, not after the first lockout report.

In the new project: **Authentication → URL Configuration**

1. **Site URL:** `https://<subdomain>.arbiterle.com`
2. **Redirect URLs (allow-list)** — add:
   - `https://<subdomain>.arbiterle.com`
   - `https://<subdomain>.arbiterle.com/?reset=1`

The platform's reset flow sends officers to `/?reset=1`, where the in-app "Set New Password" screen takes over. No other URLs should be on the list.

### 1F. Configure Custom SMTP (Google Workspace — NOT Resend)

Without custom SMTP, Supabase's built-in mailer limits the project to ~2 auth emails per hour and deliverability is poor — unusable for a real roster.

> **Do not use Resend.** `arbiterle.com` on Resend's shared IPs is junked by reflex at Microsoft/Office 365 mail filters — which is what most agencies (`*.org` borough/township domains) run. This caused the EGPD launch-day login failure (welcome + reset emails landed in Junk) and an MTPD reset failure. The Google Workspace path (`andrew@arbiterle.com`) is proven to inbox at O365 filters. Route **all** auth email through Google.

In the new project: **Authentication → Emails → SMTP Settings**

1. Generate a fresh Google App Password: myaccount.google.com → Security → 2-Step Verification → **App passwords** → name it `Supabase <SUBDOMAIN>` (a distinct name per project lets you revoke one without touching the others). Copy the 16-char code.
2. Enable **Custom SMTP** and set:
   - Host: `smtp.gmail.com` · Port: `587`
   - Username: `andrew@arbiterle.com`
   - Password: the 16-char app password (password manager — never commit it)
   - Sender email: `andrew@arbiterle.com` · Sender name: `Arbiter LE`
   *(Sender is `andrew@`, not `noreply@`, on purpose — it's recognizable to officers and replies reach a human.)*
3. **Authentication → Email** — set the recovery/confirmation link expiry to **24h** (`86400` seconds). Supabase has defaulted new projects to 90 days, which is a security liability for a password-reset link.
4. Send a test password-reset email to an O365 mailbox and confirm it lands in the **inbox** (not Junk), arrives from `andrew@arbiterle.com`, and the link lands on the department subdomain — not localhost.

> Capacity: `smtp.gmail.com` ≈ 2,000 messages/day — far beyond any single agency's roster needs. Backstop if SMTP ever fails: `_supabase/scripts/set-passwords.ts` sets a temp password directly (email-free).

---

## Phase 2 — Platform Configuration

### 2A. Add the Department to the Registry

Open [`js/departments/registry.js`](js/departments/registry.js) and add a new entry to `DEPARTMENT_REGISTRY`. **All of these fields are required** — a missing `moduleScripts` loads no content and drops the subdomain to the "Department not recognized" screen:

```js
{
  subdomain: '[subdomain]',          // e.g., 'lansdale'
  name: '[Full Department Name]',
  shortName: '[SHORT]',
  displayName: '[Display Name]',     // shown on login + nav
  badge: 'assets/[subdomain]-badge.png',
  supabaseUrl: '[paste from 1A]',
  supabaseKey: '[paste from 1A]',
  scheduleStart: new Date('[YYYY-MM-DDT00:00:00]'), // first module opens
  // Standard paying-agency cadence is TWO modules/month (biweekly).
  cadence: { unlockEveryDays: 14, duePeriodDays: 14, modulesPerPeriod: 1, bufferPeriods: 1 },
  // Content files for THIS department, loaded in order by index.html.
  // Namespace every module id (e.g. 'lansdale-use-of-force') — ids must be
  // unique across departments (the smoke test enforces this).
  moduleScripts: [
    'js/modules/[subdomain]/module-[subdomain]-1.js',
    // … one per module …
    'js/modules/[subdomain]/modules-[subdomain].js', // builds MODULES from the above
  ],
  // Capability flags. Shared code branches on these, never on the subdomain.
  // Omit supervisorTrack unless this agency bought the supervisor track.
  features: {},
},
```

### 2B. Add the Badge Image

Drop the department badge PNG into the [`assets/`](assets/) folder named exactly as referenced above (e.g., `assets/lansdale-badge.png`).

If the department only has a JPG or a badge with a white background:

**Claude prompt:**
```
I have a police department badge image at [path]. 
Convert it to a PNG with a transparent background, ~200×200px, suitable for use as a nav logo on a dark background. Save it as assets/[subdomain]-badge.png.
```

### 2C. Set the Program Start Date

Open [`js/config.js`](js/config.js) and update `SCHEDULE_START` to the department's contract start date:

```js
const SCHEDULE_START = new Date('[YYYY-MM-DD]T00:00:00');
```

> **Note:** This is currently a single global value. When multiple departments are live simultaneously, this will need to move into the department registry per entry. Flag this before onboarding department #2.

---

## Phase 3 — Scenario & Module Localization

The current modules are written for Marlborough Township (roads, jurisdiction, MTPD ALO policy references). Each new department gets localized scenario text so officers see their own streets, policies, and department name.

### 3A. Gather Localization Details

Collect from the department:
- [ ] 3–5 major roads / intersections in their jurisdiction
- [ ] Department policy manual section numbers for: use of force, pursuits, domestic violence (if available)
- [ ] Any jurisdiction-specific statutes that differ from MTPD defaults

### 3B. Localize Scenarios

**Claude prompt — one per scenario file:**

```
I'm localizing the Arbiter LE scenario in js/modules/[module-file].js for a new department.

Department: [NAME], short name: [SHORT], jurisdiction: [BOROUGH/TOWNSHIP/CITY], state: PA

Replace:
- All references to "Marlborough Township" → "[jurisdiction name]"
- All references to "MTPD" → "[SHORT]"
- Road names (Route 29, Sumneytown Pike, etc.) → [list their roads]
- Policy references "ALO X.XX" → "[their policy section if known, otherwise remove the specific number and keep generic]"
- Keep all legal statute citations (Pa. C.S. §§) unchanged — those are statewide

Return the full updated file content.
```

> For the pilot workflow, you can skip full localization and do a find-and-replace of department name only. Full localization is a premium differentiator — consider pricing it accordingly.

### 3C. Create the Department Module Directory

```
js/modules/[subdomain]/
```

Store localized module files here so the main files stay as defaults. *(This directory structure is not yet implemented — see Phase 5 note.)*

---

## Phase 4 — Deployment

### 4A. Subdomain Setup

The platform is hosted on Vercel at `arbiterle.com`. You own this domain, so adding a new subdomain is entirely self-serve — no IT contact from the department needed.

1. Log into Vercel → arbiterle project → Settings → Domains
2. Add `[subdomain].arbiterle.com`
3. Vercel activates it automatically — typically live within a few minutes

> The only time you'd need the department's IT team is if they want a custom domain like `training.lansdale.gov`. In that case their IT points that domain at Vercel, which Vercel then maps to your site. For standard `[dept].arbiterle.com` subdomains, it's all on your side.

### 4B. Deploy Updated Code

```bash
git add js/departments/registry.js assets/[subdomain]-badge.png
git commit -m "Add [DEPARTMENT SHORT NAME] department"
git push
```

Vercel auto-deploys on push to main. Deployment takes ~30 seconds.

### 4C. Smoke Test

1. Navigate to `[subdomain].arbiterle.com`
2. Confirm the department badge loads in the nav
3. Log in with a test officer badge number and default password
4. Complete one module question to confirm Supabase write works
5. Log in as admin, confirm all officers appear in the dashboard

---

## Phase 5 — Handoff to Department

### 5A. Send the Admin Package

**Claude prompt:**
```
Draft a professional onboarding email for a new Arbiter LE department. 

Department: [NAME]
Admin contact: [NAME, TITLE]
Platform URL: [subdomain].arbiterle.com
Admin badge number: [BADGE]
Admin initial password: [DEPT PREFIX][BADGE] (e.g., EGPD85C)
Program start date: [DATE]
Number of officers: [N]

The email should:
- Welcome them and confirm they're live
- Give login instructions for the admin and note how to share officer credentials
- Explain the 2-per-month module cadence briefly
- Tell them who to contact for support (me)
- Be professional but not stiff — these are cops, not lawyers
- Be under 300 words
```

### 5B. Officer Credential Sheet

**Claude prompt:**
```
Generate a simple officer credential table for [DEPARTMENT NAME].

Platform URL: [subdomain].arbiterle.com

Officers:
[paste roster]

Format as a markdown table with columns: Officer Name | Badge # | Initial Password | Role
Initial password format: [DEPT PREFIX][badge_number] (e.g., EGPD8507)
Flag admin accounts in the Role column.

After the table, add one line: "Officers should change their password after first login."
```

---

## Phase 6 — Post-Onboarding Checklist

Run through this 48–72 hours after go-live:

- [ ] At least one officer has logged in (check Supabase `completions` table for any rows)
- [ ] No JavaScript errors in Vercel function logs
- [ ] Admin has accessed the dashboard and can see their roster
- [ ] Checkly health check passing (if configured for this department's URL)
- [ ] Contract copy filed in `Arbiter LE - Pilot Program/` folder
- [ ] Department added to your internal tracking (rate card tier, billing date, contact)

---

## Known Technical Debt to Address Before Department #2

These are issues that will cause problems at scale — fix them before the second department goes live:

1. **`SCHEDULE_START` is global** — currently a single date in `config.js`. Needs to move into `DEPARTMENT_REGISTRY` as a per-department field so multiple departments can have different start dates.

2. **Module files are not per-department** — scenarios are baked into the main JS files with MTPD content. Either implement `js/modules/[subdomain]/` directory loading or add a localization layer to the registry.

3. **Password hashing is client-side SHA-256** — acceptable for a pilot but not production-grade. Plan the Supabase Auth migration (partially drafted in `2026-05-29-supabase-auth-migration-plan.docx`) before department #3 or any public-facing deployment.

4. **No automated health checks per subdomain** — `checkly-health-check.js` exists but appears configured for one URL. Extend it to iterate the department registry.

---

## Quick Reference

| Item | Location |
|---|---|
| Department registry | `js/departments/registry.js` |
| Supabase schema | `_database/2026-05-18-supabase-schema.sql` |
| RLS setup | `_database/2026-05-31-rls-and-auth-uid.sql` |
| Module list | `js/modules.js` |
| Scenario files | `js/modules/module-1.js` through `module-12.js` |
| Config / schedule | `js/config.js` |
| Vercel config | `vercel.json` |
| Pilot agreements | `Arbiter LE - Pilot Program/` |
| Rate card (current) | The chief leave-behind in `_marketing/collateral/` carries the current tiers — there's no separate rate card. Retired versions in `_archive/rate-cards/`. |
