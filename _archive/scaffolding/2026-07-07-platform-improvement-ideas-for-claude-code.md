# Platform Improvement Ideas — Handoff for Claude Code
Compiled 2026-07-07 from a Cowork research/brainstorm session (LMS competitor scan + platform UX pass). Nothing here has been built. Statuses below reflect what was decided vs. still open.

---

## 1. Chief-facing admin dashboard — ALREADY BUILT, no action needed
Initially flagged as a possible gap vs. competitors (PowerDMS, Vector Solutions). Checked the code — it already exists and covers it:
- `js/app.js` → `renderAdminDashboard()` (~line 1240), calls `renderAdminStats()` (~1269, completion-rate stat card), `renderAdminTable()` (~1310, per-officer completion table), `renderAdminModules()` (~1350, per-module score breakdown).
- Halteman logs in with `role: 'admin'` and lands on this directly.
- Also has: 4 admin tabs (Compliance Overview, Module Summary, Legal Citations, Officer Feedback), a printable compliance report (`printComplianceReport()`), and citation filtering by type.

No build needed here. Documented so it doesn't get re-flagged as a gap later.

**Adjacent, still open:** the Monday engagement report scheduled task can't Gmail-draft because the Gmail connector isn't authorized in Cowork sessions yet — that's a connector-auth fix on Andrew's end, not a code gap.

---

## 2. Spaced-repetition "refresher" feature — DESIGN DIRECTION SET, NOT BUILT
**The idea:** Lexipol's signature feature is a Daily Training Bulletin — <2 min policy excerpt + 1 question, daily, same content org-wide. The LDHF (low-dose high-frequency) research behind spaced retrieval is real and holds up outside law enforcement too (e.g. resuscitation-skill retention studies). Our version should NOT copy Lexipol's daily-content-pipeline model — no new authoring, no new legal-citation exposure. Instead: re-surface questions from modules an officer already completed, pulled from the existing quiz bank / `completionData` records.

**Decisions made so far:**
- **Targeting:** lean toward weak-spot targeting (resurface questions the officer got wrong on first attempt) over random pull or a universal daily bulletin. Stronger retention story, no new content pipeline to feed.
- **Cadence:** flat, independent weekly clock — NOT tied to the module-unlock schedule. Reasoning: hard-wiring it to "half the unlock interval" means every future cadence change (like the one just made) becomes a math problem. A flat clock survives cadence changes for free.
- **Delivery:** no email — officers ignore work email. Surface it in-app instead: on login, check "has it been ≥7 days since their last refresher?" and show it before anything else, reusing the existing due/overdue visual pattern already in the dashboard. This is passive (waits for next login), not a push.

**Still open / needs a decision before this gets built:**
- Graded (shows up on the admin dashboard as its own metric) or ungraded (soft retention nudge only)? Graded gives Halteman another number; ungraded is lower-risk and doesn't touch the live-module-lock rule.
- Accept "passive, surfaces on next login" as good enough, or is real reach (SMS) important enough to justify collecting officer personal cell numbers? SMS has real teeth but adds a privacy surface and a vendor dependency (Twilio or similar) that doesn't exist today.
- Naming — don't call it a "Daily Training Bulletin," that's Lexipol's product name.

**Reference for implementation pattern:** the EGPD supervisor-track feature (`_supabase/COWORK-HANDOFF-supervisor-track.md`, shipped commits `11f7c28` + `cac4bc0`) is a good precedent for how additive, registry-gated features get built here — role/feature-flag-driven in shared files, defaults safe when absent, doesn't touch live quiz content directly.

---

## 3. Due-date reminders — MENTIONED, NOT DESIGNED YET
Separate from the refresher: this is about not missing an assigned deadline, not about retention of past content. Every competitor platform has some version of it. Runs into the identical delivery problem as #2 — if it's solved for the refresher (in-app surfacing vs. SMS), the same mechanism should probably cover this too rather than solving delivery twice.

---

## 4. Training cadence change — PARTIALLY DECIDED, ONE EDIT PENDING
New standard going forward: modules unlock every other week (biweekly), due monthly.

**Scope confirmed by Andrew:** applies to MTPD (Andrew's own dept) and future agencies only. **EGPD (the pilot) is explicitly excluded** — its locked live cadence stays as-is (weekly unlock, biweekly-paired due) since officers are already mid-cycle and changing due dates under a paying pilot client isn't worth the risk.

**Pending edit (not yet made):** `js/departments/registry.js` — MTPD's cadence currently reads `unlockEveryDays: 14, duePeriodDays: 14, modulesPerPeriod: 1` (relaunched 2026-06-24). Unlock already matches biweekly; `duePeriodDays` needs to stretch to actually land on monthly (~30). Needs Andrew's go-ahead to edit + diff review before committing, since MTPD has officers mid-cycle since the relaunch. Cadence engine itself is in `js/config.js` (`deptCadence()`, ~line 12) — no engine change needed, just the MTPD data value.

---

## 5. Explicitly deprioritized — do not build without a reason to revisit
From the competitor scan, ruled out for now:
- Duolingo-style streaks/badges/leaderboards — wrong tone for a professional audience being told what training to do.
- AI-powered search / content generation — doesn't move Halteman's signing decision, pure distraction from the pilot.
- Deep certification-tracking / state-system integrations (Vector Solutions' strength) — a scale play for agency #3+, not relevant pre-EGPD-signature.

---

## 6. Standing strength — don't dilute chasing feature parity
The verbatim-policy-anchor model (every module cites the agency's actual GO/SOP language, never generic attorney-drafted policy like Lexipol) is the real differentiator against every competitor named above. Any new feature should reinforce that story, not distract from it.

---

## 7. Platform UX pass — findings from reading the actual code
Reviewed `index.html` and `css/styles.css` structurally (not a live click-through). Genuinely solid pieces already in place: persistent nav with officer name on every screen, in-context searchable glossary/reference tool reachable from module/scenario/quiz without losing place, a "Flag a content issue" button tied to content-traceability standards, Pause (not raw back) on scenario/quiz screens so state saves correctly, and a 4-tab admin console with a printable compliance report and citation filtering.

**Two things worth checking, unconfirmed either way:**
- **Mobile responsiveness.** Only one `@media` block exists in the whole stylesheet, and it's for print — no screen-size breakpoints found. Viewport meta tag is present, so it's not naive, but the admin table and legal-citation tables are wide multi-column layouts most likely to break or force horizontal scroll on a phone. Worth an actual on-phone test before assuming it's fine either way.
- **Accessibility.** Zero `aria-label` attributes found anywhere in the markup. Not urgent, but this sells into government procurement, and public-sector RFPs sometimes require a WCAG/accessibility statement. Cheaper to address early than retrofit later.

**Minor, not urgent:** no search/filter on the officer's own module list — a non-issue at 12 modules, would start to matter if module count grows significantly.
