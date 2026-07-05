# Arbiter LE — Operating Playbook

**Your field guide for directing Claude.** When something happens in the business, find the row, point me there. This is internal (in `.vercelignore` — never deploys). It's a living doc; tell me when reality changes and I'll update it.

---

## The 10-second discipline before any session

1. **Name the outcome, not the task.** "I want Chief Halteman to sign at the end of the pilot" beats "fix the dashboard." Tell me the outcome and I'll work backward to the task.
2. **One thing at a time.** Don't let me (or you) open a new front while the current one is unfinished. If you catch yourself adding scope, say "park it" and I'll hold it.
3. **If you're spinning, say so.** "I'm overthinking this" is a valid instruction. I'll name the decision and give you one action.

---

## Situation → Action map

Find what's happening. Use the trigger phrase or skill. The **Have ready** column is what I need from you to do it well.

### Growth & new agencies

| When this happens | Say / use | Have ready |
|---|---|---|
| An agency signs / says yes | `onboard-agency` skill — "onboard [dept]" | Signed agreement, provisioned Supabase project, badge PNG, roster, approved roads, start date |
| You're sizing up a prospect before they commit | Just talk to me — advisor mode | Who they are, dept size, what they've said |
| A prospect/agency sends a contract or NDA | `legal:review-contract` or `legal:triage-nda` — **I draft notes, you decide & sign** | The document |
| "What should I charge?" / pricing pressure | Advisor discussion first; rate card is the single source of truth | The current rate card, officer count, term |

### Product / content

| When this happens | Say / use | Have ready |
|---|---|---|
| Time to write or draft a module | `author-module` skill — "draft module N for [dept]" | The agency's **verbatim** policy text, approved roads, intent/key points |
| A scenario needs a road | Check the approved list in `CLAUDE.md`; if it's not there, **I stop and ask you** | Confirmation the road is in-jurisdiction |
| Adding or changing any legal citation | I check `_legal/citations-registry.md` (GOOD LAW only) + run `check-citations.sh`. **Never from memory.** | The statute/case; I verify against primary source |
| Reviewing a module before it ships | I QA against the content standards (≥8 traceable Qs, verbatim policy, no real names) | The module file |
| **A module is live and you want to change it** | **STOP** — live module lock. Changing a quiz mid-cycle voids officer records. Needs your explicit sign-off | Why the change is worth invalidating records |

### Code & shipping

| When this happens | Say / use | Have ready |
|---|---|---|
| About to deploy / push | `ship-safely` skill — right checks for what changed + diff + live-URL verify. **I show the diff first.** | — |
| You changed a shared file (`app.js`, `config.js`, `index.html`, `styles.css`, `registry.js`) | `node _dev/smoke-departments.js` is mandatory — one change touches every agency | — |
| Something broke on a live site | I diagnose, fix, and **verify on the live URL** before calling it done — same session | The symptom, which subdomain |
| You want proof a change works | `/verify` or `/code-review` | The change |
| Verifying public-exposure safety | I `curl` the file on the live host and show the 404 | — |

### Client communication

| When this happens | Say / use | Have ready |
|---|---|---|
| An email/proposal needs to go out | **I draft, you send.** Nothing client-facing leaves without your eyes on it | Audience, intent, any context |
| Officer welcome/invite emails | **Never fires without your explicit OK** — the auth flow auto-sends | Your go-ahead, the target Supabase project |

---

## The Arbiter-specific skills (your factory)

These are built for *this* business. They encode your guardrails so quality doesn't depend on either of us remembering.

| Skill | Fires when | What it guarantees |
|---|---|---|
| `onboard-agency` | New department, agreement signed | STOP-gate on preconditions; correct isolated keys; verbatim policy; approved roads; live-URL verify; 404 safety check |
| `author-module` | Drafting module content | Schema-correct reading + scenario + ≥8 traceable questions (+ supervisor variants); verbatim policy, approved roads, GOOD-LAW cites only |
| `ship-safely` | Any deploy | Right checks for the change + diff + both-subdomain live verify + public-exposure 404, in one pass |

---

## Guardrail commands (when they're non-negotiable)

- **`_legal/check-citations.sh`** — before committing anything that touches a legal citation. Hard-blocks overruled-as-current law.
- **`node _dev/smoke-departments.js`** — before shipping any change to a shared file.
- **`node _dev/validate-scenarios.js`** — after authoring/editing scenarios.
- **Show the diff** — before every commit to main. No exceptions.

---

## Generic plugin skills — the short list that fits you

You have ~80 marketplace skills available. **Ignore almost all of them** — they assume a QuickBooks/Stripe/HubSpot SMB you don't run. Adopting tools you don't need is its own overthinking. The ones worth reaching for:

- **`legal:review-contract` / `legal:triage-nda`** — when paper comes in from an agency or prospect (I draft, you sign).
- **`anthropic-skills:docx` / `pdf` / `xlsx`** — when you need a polished, printable deliverable (rate card, proposal, credential sheet).
- **`small-business:margin-analyzer`** — *later*, once you have real revenue across multiple agencies to model. Not yet.

Everything else: skip unless you have a specific reason.

---

## Recurring cadence (what to run, and when)

| Cadence | What | Trigger |
|---|---|---|
| Weekly (auto) | Full-repo backup to Google Drive | Mondays ~9 AM, launchd — verify it ran if in doubt |
| Quarterly | Re-verify every GOOD-LAW citation vs. primary source | **Next due 2026-09-13** |
| Before every new agency | Full legal-registry pass; clear any PENDING cites that agency relies on | Part of `onboard-agency` |
| 48–72h after any go-live | Post-onboarding checklist (login landed, no errors, admin sees roster) | Part of `onboard-agency` |

---

## Anti-patterns (don't let either of us do these)

- **Building the factory during a launch.** Infrastructure work waits behind the thing that's about to go live.
- **Adding the next agency before the current one is locked.** EGPD first. Always.
- **Quoting pricing, sending email, or signing anything without your review.** I draft; you decide.
- **Touching one department's files for another's request.** Never.
- **Paraphrasing policy or citing law from memory.** Verbatim, or verified, or it doesn't ship.
- **Calling a deploy done from the diff.** Live URL, both subdomains, or it's not done.

---

*Tell me when this drifts from reality and I'll update it. This doc should always describe how the business actually runs today.*
