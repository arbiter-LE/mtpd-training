# Arbiter LE — Department Configuration Options

Collected during onboarding. Each option is confirmed with the department contact before go-live and recorded here for reference.

---

## 1. Module Schedule Cadence

How frequently modules are due.

| Option | Description |
|--------|-------------|
| **Weekly** | One module due per week. Higher pace — suited for departments that want training completed quickly or have a shorter contract term. |
| **Biweekly** *(default)* | One module due every two weeks. Current MTPD schedule. Allows officers time to complete without feeling pressured alongside shift work. |

**Recorded in:** `scheduleStart` + schedule logic in `js/config.js` (or department registry once per-department cadence is implemented).

---

## 2. Automated Email — Officer Welcome

Sends a branded welcome email to each officer automatically when their account is created.

| | |
|--|--|
| **Trigger** | INSERT to `officers` table |
| **Sends to** | Officer's department email |
| **Contains** | Login URL, badge number, rank, instruction to contact supervisor for password |
| **Requires** | `email` column populated on officer rows |

**Status for MTPD:** Live as of 2026-06-07. Not sent retroactively to existing officers.

---

## 3. Automated Email — Weekly Compliance Digest

Sends a weekly summary report to the department admin / chief showing training completion across the roster.

| | |
|--|--|
| **Trigger** | Scheduled — every Monday morning (or department-preferred day) |
| **Sends to** | Admin email address(es) on file |
| **Contains** | % complete by officer, overdue count, modules due that week |
| **Purpose** | Chiefs see compliance status without logging in |

**Status:** Planned. Not yet built.

---

## 4. Automated Email — Overdue Escalation

Sends an alert to the admin when an officer's module passes its due date without a passing completion.

| | |
|--|--|
| **Trigger** | Scheduled check — runs nightly, alerts on newly overdue officers |
| **Sends to** | Admin email address(es) on file |
| **Contains** | Officer name, badge number, module that is overdue |
| **Purpose** | Proactive — admin is notified rather than having to check the dashboard |

**Status:** Planned. Not yet built.

---

## Department Options Record

Fill this out during onboarding for each agency.

| Option | MTPD | [Next Dept] |
|--------|------|-------------|
| Module cadence | Biweekly | |
| Welcome email | ✅ Live | |
| Weekly compliance digest | Pending | |
| Overdue escalation | Pending | |
| Admin email for digests/alerts | TBD | |
| Digest send day | TBD | |
