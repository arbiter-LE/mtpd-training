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

### `pricing/` — the rate card (single source of truth)
| File | What it is |
|------|-----------|
| `2026-06-03-arbiter-rate-card-v19.pdf` | **Current** rate card. This is the one you send. |

One current rate card lives here. Every superseded version (v2–v18) is in
`_archive/rate-cards/`. Never stack old versions back in here.
Note: the final per-agency number is set after the EGPD pilot.

### `prospects/` — pipeline lists & tracking
| File | What it is |
|------|-----------|
| `2026-06-03-PA-small-dept-prospect-list.xlsx` | PA small-department prospect list |
| `2026-06-03-lansdale-1hr-prospect-list.xlsx` | Lansdale-area (1hr radius) prospect list |

The live sales tracker `2026-06-20-arbiter-le-tracker.xlsx` currently lives in
the repo root (it was open when this folder was built). Move it here when free.

### `collateral/` — finished pieces to hand a chief/prospect
| File | What it is |
|------|-----------|
| `2026-06-20-arbiter-le-chief-leave-behind.pdf` | The chief leave-behind (one-page sell) |
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
