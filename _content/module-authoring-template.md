# Module Authoring Template

Reverse-engineered from `module-mtpd-1.js` (Search & Seizure) — the module you've already approved and shipped. This is the shape every new module, patrol or supervisor, template or new-client, has to match. It doesn't replace `CLAUDE.md` (that's still law on roads, policy verbatim, citation registry, etc.) — it's the structural spec CLAUDE.md doesn't spell out: what files, sections, and schemas a module is actually made of.

## 1. A module is five pieces, four files

| Piece | Lives in | Required? |
|---|---|---|
| Reading content (`READING_*`) | `module-<dept>-N.js` | Always |
| Supervisor overlay (`SUPERVISOR_*`) | `module-<dept>-N.js` | If dept has `features.supervisorTrack` |
| Patrol scenario tree (`SCENARIO_*`) | `scenarios-<dept>.js` | Always |
| Supervisor scenario tree (`SCENARIO_*_SUP`) | `module-<dept>-N.js` | If supervisor track |
| Quiz question banks (`get*Questions()`, `get*SupervisorQuestions()`) | `modules-<dept>.js` | Always (both tracks if applicable) |

The module list entry in `modules-<dept>.js` wires them together — `id`, `category`, `title`, `description`, `duration`, `weekNumber`, then pointers to each piece above. Supervisor content is never duplicated law — it's the patrol reading plus an overlay injected via `withSupervisorOverlay()`, so there's one source of truth for the underlying policy/case law.

## 2. Reading content structure

Built from `content-block` divs, in this order:

1. **Scenario hook** — `<h4>Scenario</h4>`, then an `<h2>` posing a concrete situation on an approved road, then a one-line `<p>` framing what the module covers.
2. **Core Principle** — the legal/doctrinal foundation, `<h2>` headline + `<p>` explanation, with `case-law-box` divs for each cited case (`case-title` + holding, plain English, no paraphrasing of the holding itself).
3. **Agency Order section(s)** — headed by the actual order number (`MTPD Order 1.2 — Limits of Authority`), `<h2>` takeaway line, then one or more `sop-box` divs per sub-topic, each with `sop-title` and the policy text. **Policy quotes inside `sop-box` are verbatim, in quotation marks where directly quoted.**
4. **Key points list** — `<ul class="key-points">`, each `<li>` a `<strong>` term + one-line application.
5. **Documentation/practical standard** — the "how this shows up in your report" section, contrasting a bad example against a good one, closing with any mandatory recording/reporting order (e.g. Order 2.1 MDVARS).
6. **Launch button** — `<button class="btn-launch" onclick="startScenario('<scenario-id>')">Proceed to Scenario Exercise →</button>` — always the last element, always this exact pattern.

## 3. Supervisor overlay

Injected via `withSupervisorOverlay(base, overlay)` right before the launch button — same `content-block` structure, but every section reframes the same law/orders through a **review lens**, not new authority:

- What the supervisor is signing off on and why it matters (opens every overlay).
- A "reviewing X under Order Y" section that names the single most common defect reviewers miss.
- A **distinction section** — this is the load-bearing pattern in the approved module: teach the reader to separate a *writing problem* (fixable with a better sentence) from a *legal defect* (not fixable by rewriting). Every supervisor overlay should have one of these.
- A checklist-style `key-points` section covering the other doctrines in play.
- A "verify the recording exists" or equivalent compliance-check section.
- Closes on escalation: coaching → documented corrective action → pattern recognition. Never skip straight to discipline; never let a pattern ride.

## 4. Scenario tree schema

```js
const SCENARIO_X = {
  id: 'scenario-id',
  title: 'Human-readable title',
  location: 'Specific location, Agency\'s Jurisdiction, PA',   // approved roads only
  totalDecisions: N,
  nodes: {
    start: { type: 'scene', time, weather/unit context, narrative: [...], next: 'd1' },
    d1: {
      type: 'decision', decisionNumber: 1,
      situation: '...', question: '...',
      options: [
        { text, next, quality: 'good'|'risky'|'bad', shortLabel }
        // 4 options per decision; exactly one 'good'
      ]
    },
    c1a: {
      type: 'consequence', outcomeClass: 'outcome-good'|'outcome-neutral'|'outcome-bad',
      outcomeLabel, heading, narrative: [...],
      legal: '...',   // cites the specific order/case that makes this right or wrong
      next: 'd2'
    },
    // ... repeat decision/consequence pairs
    debrief: { type: 'debrief' }
  }
};
```

Rules that fall out of the approved module:
- **Every consequence node carries a `legal` line** citing the specific order or case — no consequence is "just" narratively bad, it's legally traceable.
- **Bad options are plausible, not cartoonish.** The wrong answers in Module 1 are mistakes a real officer could actually make (approve on PC alone, fix wording instead of the defect, manufacture exigency) — never a strawman.
- **`risky` is its own category**, distinct from `bad` — the "technically not wrong yet, but not the standard" option (e.g., "return it for a rewrite" when the real problem isn't the writing).
- Fictional officer names only (Brandt, etc.) — never a real department member.

## 5. Quiz question schema

```js
{
  scenario: 'Short fact pattern.',
  text: 'The actual question.',
  options: [ 'right answer', 'wrong', 'wrong', 'wrong' ]   // first item is correct in source; UI shuffles
}
```

- **Minimum 8 per track** (already in CLAUDE.md — repeating because it's load-bearing here too).
- Every question must be answerable from the reading alone — no outside knowledge. If you can't point to the sentence in `READING_*` that answers it, cut the question.
- Fact patterns are scenario-based, not definition lookups ("You stop a vehicle for a defective headlight..." not "What is the Fourth Amendment?").
- Wrong options represent real misconceptions (e.g., "general consent covers all locked containers") — not throwaway distractors.

## 6. Tone

Second person, present tense, addressed to the officer/supervisor directly ("What happens next will be decided — and scrutinized — based on your training, your judgment, and your documentation"). Plain-English legal explanation, never dumbed down. Consequences are direct about what goes wrong — suppressed evidence, dismissed case, credibility hit — no softening.

## 7. Pre-ship checklist (cross-ref CLAUDE.md)

- [ ] Anchors to at least one of this agency's actual orders, quoted verbatim
- [ ] All case law verified against primary source, logged in `_legal/citations-registry.md` as `GOOD LAW`
- [ ] `_legal/check-citations.sh` run clean
- [ ] All roads on that agency's approved list
- [ ] ≥8 quiz questions per track, every one traceable to the reading
- [ ] No real names
- [ ] Supervisor overlay (if applicable) reframes, doesn't duplicate, the same law
- [ ] Andrew's review before anything ships
