# Length-Tell Fix — Platform-Wide (MTPD + EGPD)

**Opened:** 2026-07-22 · **Authorized by:** Andrew (explicit, incl. touching live content)
**Status:** COMPLETE 2026-07-22 — both departments done inline, all gates pass.
- MTPD: 193 questions, pick-longest 92% → **25%** (committed a8b4fa6)
- EGPD: 192 questions, pick-longest 96% → **25%**
- Method held: distractor text only; correct answers, option order, and answer
  keys byte-identical (no grade.js change). ~2 questions per set intentionally
  keep the correct answer longest, to avoid a reverse "never pick the longest" tell.

## The defect

Across every module, the correct answer is almost always the **longest, most-detailed
option**, because it carries the policy + reasoning + citation while distractors are
pithy. An officer can pass by picking the wordiest option without reading. Measured:

| Dept | Questions | Correct-is-longest | 
|------|-----------|--------------------|
| MTPD | 193 | 178 (92%) — Module 1 patrol already fixed 7/22 |
| EGPD | 192 | 185 (96%) |

This is the same class of defect the Chief flagged originally; the 6/25 pass fixed
**position** bias but its length-balancing did not actually work (correct still longest
platform-wide). This project closes the **length** tell.

## Goal / done-criteria

Per question set (module × track), reduce **correct-is-longest** from ~92–96% to
**≤ 30%** — enough that "pick the longest" scores below the 70% pass line and reads as
roughly random. NOT zero (correct-is-never-longest is a reverse tell).

## Method — distractor expansion ONLY

For ~75% of the questions in each set, expand **one existing distractor** with plausible,
substantive, still-wrong elaboration until it is longer than the correct option. Leave
~25% with the correct answer longest. That flips "longest" to a distractor most of the
time without creating a reverse tell.

## HARD GUARDRAILS (every executor follows these exactly)

1. **NEVER edit the correct answer's text.** Byte-for-byte identical before/after.
   (Correct answers carry verbatim General Orders / case-law text — untouchable.)
2. **NEVER change option ORDER.** The grading key (`_dev/answer-keys/<dept>.json`) is
   indexed by position. Reordering desyncs the key and corrupts grading. Edit distractor
   text **in place** only.
3. **NEVER add or change position/index → no `_dev` or `api/grade.js` edits.** Distractor
   text is not in the key or in grade.js. The key does not change in this project.
4. **Distractors must stay plainly WRONG and traceable-as-wrong** — a longer distractor
   must not become defensible or accidentally correct. Expand with a *wrong* rationale,
   not a hedge toward truth.
5. **No new road names** (approved-roads rule) and **no new case/statute citations**
   (citation registry). Do not add legal authorities to a distractor. Do not alter any
   verbatim policy text that appears anywhere.
6. **Keep valid JS** — escape apostrophes, keep the array shape, same question count and
   same 4 options per question.
7. **Match the module's voice** — professional, plausible operator-level wrong answers.
   Length-balance is invisible to the reader; it must not look padded.

## Verification (run after every batch)

- `node _dev/smoke-departments.js` — structure + key↔content sync (must PASS)
- `node _dev/validate-scenarios.js` — scenario graphs (must PASS)
- `bash _legal/check-citations.sh` — no new/broken cites (must PASS)
- Re-run the pick-longest measurement — each set ≤ 30%
- `git diff` guard: confirm **no correct-answer line and no `_dev`/`api/grade.js` line
  changed** (only distractor strings inside `options:` arrays)

## File layout (matters for parallelization)

- **MTPD patrol** — ALL 12 sets live in one file: `js/modules/mtpd/modules-mtpd.js`
  → must be edited serially (single writer) to avoid conflicts.
- **MTPD supervisor** — 12 separate files: `js/modules/mtpd/module-mtpd-N.js`
- **EGPD (both tracks)** — 12 separate files: `js/modules/egpd/module-egpd-N.js`
  → 24 independently-editable files (12 EGPD + 12 MTPD supervisor) + 1 shared MTPD-patrol file.

## Ship

One commit per department (or one combined), same deploy path as Module 1: push to main,
verify live that new distractor text is served on both subdomains. No grade.js change to
verify (key unchanged).

## Progress log

- 2026-07-22: Module 1 (MTPD search-seizure) patrol fully length-balanced + shipped
  (pick-longest 1/8). Supervisor set at parity (9/9) — will be brought down in this project.
