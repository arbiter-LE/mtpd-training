# _marketing — Arbiter LE marketing & business collateral

The single home for finished, sendable marketing/sales/brand material. If you
need to grab something to send a chief or prospect, look here first.

**Internal only.** This folder is in `.vercelignore` — nothing here deploys to
the public site. Never paste real officer data into anything here.

---

## What's where

### `brand/` — identity & design language
| File | What it is |
|------|-----------|
| `2026-06-15-arbiter-le-brand-identity.pdf` | The brand identity (logo, palette, usage) |
| `2026-06-15-arbiter-le-brand-philosophy.md` | "Calibrated Authority" — the written design philosophy |
| `2026-06-03-rate-card-design-philosophy.md` | Design rationale behind the rate card |

Brand palette (also in `css/styles.css`): navy `#0a1828`, gold `#c8902a`,
steel `#3c6478`. EGPD theme is the charcoal-green/gold variant.

### Pricing — the leave-behind *is* the rate card

The standalone rate-card PDF was **retired 2026-06-23**. The chief leave-behind
in `collateral/` is now the single source of truth for pricing — it carries the
current tiers, so there's no separate rate card to keep in sync. Retired rate
cards (v2–v19) live in `_archive/rate-cards/`.

**Current tiers (effective 2026-06-23, FOR AGENCY USE — not on the public site):**
Tier 1: 1–10 officers = **$1,800/yr** · Tier 2: 11–20 = **$2,400/yr** ·
Tier 3: 21–25 = **$3,000/yr**. Three flat tiers by size, hard-capped at 25,
annual billing paid upfront, no free trial. To change pricing, edit
`_guide_build/leave-behind.html` and re-run `print-leave-behind.mjs`.

### `prospects/` — the lead pipeline
| File | What it is |
|------|-----------|
| `2026-06-22-arbiter-le-lead-tracker.xlsx` | **The live lead tracker.** This is the one you work from. |

One tracker, three tabs: **Dashboard** (funnel counts + overdue / due-this-week
flags), **Pipeline** (one department per row — stage & priority dropdowns,
follow-up dates auto-highlight red when overdue / gold when due ≤7 days), and
**How to Use**. The EGPD row is the live anchor; its real next action is the
pilot-to-paid conversion (tracked for 2026-09-17). Drop prospect names straight
into the Pipeline tab. Regenerate from `_dev/build-lead-tracker.py`.

Superseded by the above (were empty placeholder shells, removed 6/22): the
`2026-06-03` PA-small-dept / Lansdale-1hr lists and the empty root
`2026-06-20-arbiter-le-tracker.xlsx`.

### `collateral/` — finished pieces to hand a chief/prospect
| File | What it is |
|------|-----------|
| `2026-06-23-arbiter-le-chief-leave-behind.pdf` | The chief leave-behind (one-page sell) — **also the rate card**; carries the current pricing tiers. This is the one you send. |
| `2026-06-21-arbiter-prospect-one-pager.svg` | "What your department gets" — 4 pillars (design-feature build) |
| `2026-06-21-arbiter-how-it-works.svg` | "How Arbiter LE works" — 5-step flow (design-feature build) |

**No module counts or cadence** in any prospect-facing piece until the numbers
are locked post-pilot (Andrew, 6/21). Keep value language cadence-neutral.

---

## The collateral "factory" — `_guide_build/` (separate folder)

The polished multi-page PDFs are *generated* from HTML sources + print scripts
in `_guide_build/`. That's the factory; this folder is the shelf. To change a
generated PDF, edit its source there and re-run its print script — don't edit
the PDF copy. Factory outputs include:
- Chief Q&A Field Guide, Client FAQ, Agency Onboarding Checklist, EGPD User Guide

The `.svg` one-pagers above were built with the in-chat design feature
(art mode, brand palette) — see the `project-design-feature-brand` memory note
for how to regenerate or make new ones on-brand.
