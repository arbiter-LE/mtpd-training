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
| You want to move on go-to-market / prospects | Advisor mode + the lead tracker (`_marketing/prospects/`). **Gated on E&O insurance being bound — no outreach until then.** Meantime energy goes to GTM-readiness: rate card, prospect list, outreach sequence — ready to move the day insurance clears | What you want to prep next |
| Keeping EGPD warm | Not "convert them" anymore — preserve the relationship and earn Chief Halteman's peer reference/intro (the strongest thing in the sales bag). Don't over-index on completion numbers | Any signal from EGPD |
| A prospect/agency sends a contract or NDA | `legal:review-contract` or `legal:triage-nda` — **I draft notes, you decide & sign** | The document |
| "What should I charge?" / pricing pressure | Advisor discussion first; rate card is the single source of truth | The current rate card, officer count, term |

### Product / content

| When this happens | Say / use | Have ready |
|---|---|---|
| Time to write or draft a module | `author-module` skill — "draft module N for [dept]" | The agency's **verbatim** policy text, approved roads, intent/key points |
| A scenario needs a road | Check the approved list in `CLAUDE.md`; if it's not there, **I stop and ask you** | Confirmation the road is in-jurisdiction |
| Adding or changing any legal citation | I check `_legal/citations-registry.md` (GOOD LAW only) + run `check-citations.sh`. **Never from memory.** | The statute/case; I verify against primary source |
| Reviewing a module before it ships | I QA against the content standards (≥8 traceable Qs, balanced answer patterns, verbatim policy, no real names) | The module file |
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
| Officer welcome/credential emails | **Never goes out without your explicit OK.** Sent **manually from andrew@arbiterle.com** now (Resend retired 7/12; the old auto-welcome infra is dormant — don't resurrect it). Only Supabase Auth reset/confirm mail auto-sends, via Google SMTP. | Your go-ahead, the roster/credential sheet |

---

## The Arbiter-specific skills (your factory)

These are built for *this* business. They encode your guardrails so quality doesn't depend on either of us remembering.

| Skill | Fires when | What it guarantees |
|---|---|---|
| `onboard-agency` | New department, agreement signed | STOP-gate on preconditions; correct isolated keys; verbatim policy; approved roads; live-URL verify; 404 safety check |
| `author-module` | Drafting module content | Schema-correct reading + scenario + ≥8 traceable questions with balanced answer patterns (+ supervisor variants); verbatim policy, approved roads, GOOD-LAW cites only; answer keys built server-side |
| `ship-safely` | Any deploy | Right checks for the change + diff + both-subdomain live verify + public-exposure 404, in one pass |

---

## Guardrail commands (when they're non-negotiable)

- **`_legal/check-citations.sh`** — before committing anything that touches a legal citation. Hard-blocks overruled-as-current law.
- **`node _dev/smoke-departments.js`** — before shipping any change to a shared file. Also enforces answer-pattern integrity (no position/length tell) and server-side-only answer keys.
- **`node _dev/validate-scenarios.js`** — after authoring/editing scenarios.
- **`node _dev/build-answer-keys.js`** — after adding or changing any quiz question/answer. Moves keys server-side and regenerates the grader; quizzes won't grade until it's run.
- **Show the diff** — before every commit to main. No exceptions.

> These three gates (citations, smoke, scenarios) also fire automatically at pre-commit (`_dev/hooks/pre-commit` via `core.hooksPath`). That's a backstop — run them while iterating, don't discover a red at commit time.

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
- **Splitting attention across two active onboards.** Stand one agency fully live before starting the next — execution focus, one at a time. This is *not* "EGPD before the market": the market push proceeds regardless of EGPD's verdict and is gated on **E&O insurance being bound**, not on the pilot converting (reframed 2026-07-15). Don't let sunk cost in EGPD gate a forward market call.
- **Quoting pricing, sending email, or signing anything without your review.** I draft; you decide.
- **Touching one department's files for another's request.** Never.
- **Paraphrasing policy or citing law from memory.** Verbatim, or verified, or it doesn't ship.
- **Calling a deploy done from the diff.** Live URL, both subdomains, or it's not done.

---

*Tell me when this drifts from reality and I'll update it. This doc should always describe how the business actually runs today.*
