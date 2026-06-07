# Arbiter LE — Training Platform

## What This Is
Multi-agency SaaS law enforcement training platform. Departments subscribe via subdomain; officers complete scenario-based modules tracked in Supabase.

**Live URL:** mtpd.arbiterle.com (training) · arbiterle.com (marketing)

---

## Architecture

**Single Vercel project** serving both sites via host-based rewrites in `vercel.json`:
- `arbiterle.com` → `/Marketing/index.html`
- `*.arbiterle.com` → root `index.html` (training platform, falls through)

**Stack:** Vanilla JS/HTML/CSS — no build step. Supabase for auth + Postgres. Deployed via git push to main.

**Multi-tenancy:** Each department gets a subdomain. Runtime detection in `js/departments/registry.js` maps subdomain → Supabase project. Each department has its own isolated Supabase project.

---

## Key Files — Check These First

| File | What It Is |
|------|-----------|
| `js/departments/registry.js` | Department registry — source of truth for what's live |
| `js/modules.js` | Module list, titles, week numbers |
| `js/modules/module-N.js` | Per-module content (reading, scenario, quiz) |
| `js/config.js` | Schedule engine, Supabase client init, state |
| `vercel.json` | Routing rules — host-based rewrites |
| `index.html` | Training platform entry point |
| `Marketing/index.html` | Marketing site |

---

## Rules

**Always check `registry.js` before claiming any department is live.**
MTPD is live. EGPD is commented out — not onboarded yet.

**Never overwrite Supabase URLs or anon keys in registry.js** without being explicitly asked. Each department has its own isolated Supabase project — mixing them up corrupts officer data.

**Never add a department to the registry as active** unless Andrew confirms the service agreement is signed and the Supabase project is ready.

**Vercel/Linux is case-sensitive. macOS is not.** Always match folder names exactly — `Marketing/` not `marketing/`, `assets/` not `Assets/`.

**Check `git log --oneline -10` at the start of any session** involving routing, deployment, or anything structural. The revert history matters.

---

## Current Live State (as of 2026-06-07)

- **MTPD** — Live. Schedule started June 1. 12 modules, weekly unlock, biweekly due dates.
- **EGPD** — Service agreement drafted, not signed. Registry entry commented out.
- **Email** — Full stack live: Cloudflare routing → Resend SMTP → Supabase auth emails from noreply@arbiterle.com.
- **Routing** — Case-sensitivity fix committed (6f5ea15). Vercel deploy pending confirmation.

---

## Adding a New Department

1. Get signed service agreement
2. Create Supabase project for the department
3. Add entry to `js/departments/registry.js` (uncomment template)
4. Add badge to `assets/`
5. Add subdomain CNAME in Cloudflare (proxy OFF)
6. Add domain alias in Vercel

---

## Commit Style

Short imperative subject line. Body explains the why if non-obvious.

```
Fix vercel.json case sensitivity — Marketing folder is capital M

Vercel runs Linux (case-sensitive). macOS hid the bug locally.
```
