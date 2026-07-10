# Arbiter LE — Legal Review Packet

**Prepared:** 2026-06-18 · **Updated:** 2026-07-06 · **For:** Andrew's review + business-lawyer meeting (Leah Westerman)
**Purpose:** A single inventory of every legal document and binding piece of verbiage across the platform — what it is, where it lives, its status, and what to ask the lawyer.

> All documents now live in one shelf: **`_legal-docs/`** (corporate / agreements / policies / insurance). Agency-specific *signed* copies stay siloed in `Agency Onboarding/<DEPT>/`. This packet is the map; `_legal-docs/README.md` is the folder guide.

---

## 0. What changed (2026-07-06)

- **Ran a contract-review pass** (Claude's `legal:triage-nda` / `legal:review-contract` skills) across every current legal document as a first-pass screen ahead of the lawyer.
- **Fixed a real gap in the Pilot NDA template:** it protected Arbiter's IP/business info from the agency (unilateral, correctly) but had no clause protecting an agency's own general orders/SOPs from being shared or reused across agencies — the informal cross-agency-confidentiality rule this platform already runs by wasn't actually promised to the agency in writing. Added new **Section 4 — Confidentiality of Agency-Provided Materials** to `agreements/2026-06-05-pilot-nda.docx` (mutual obligation, mirrors Section 2/3 structure, explicitly excludes Officer Data so it doesn't collide with the DPA's terms). Template-only fix — EGPD never signed a separate NDA, so nothing retroactive to execute there. Subsequent sections renumbered 5–11.
- **Independently corroborated §2.3 (no paid MSA yet) and §2.5 (confirm EGPD executed the DPA)** — the skill-based review surfaced the same two gaps already tracked below. Did not touch §2.5 / DPA execution this pass — Andrew is handling that directly.
- This screening pass is not a substitute for Leah's review — flagging it as a first-pass only, per the skill's own disclaimer.

## 0a. What changed (2026-06-22)

- **Consolidated** all legal documents into `_legal-docs/`; retired the scattered `_business/` and `_legal-review/` shelves and the duplicate templates in `Agency Onboarding/`.
- **Drafted the Platform User Agreement (Terms of Use)** — the item Andrew listed to the lawyer and the #1 structural gap (§2.1). Draft, for counsel.
- **Created a standalone Platform Use & Disclaimer** `.docx` (verbatim from the in-app modal) so the lawyer can review that language as a document.
- **Rebranded the IP Documentation** to the Arbiter house style.
- **Closed the public-exposure gap (§2.7):** `_legal-docs` and `*.docx` are both in `.vercelignore`.

---

## 1. The Inventory

### A. Corporate / formation
| Document | Location | Status | Notes |
|---|---|---|---|
| **Certificate of Organization** (PA filing approval) | `_legal-docs/corporate/2026-06-04-arbiter-le-certificate-of-organization-filing-approval.pdf` | **Approved 6/4/26** — saved 6/22 | Dept. of State approval notice. Entity/Document ID 0015534221, filed 6/3/26. This is the approval record; download the **stamped certificate** from file.dos.pa.gov (My Work Queue) before the 60-day window closes (~8/2/26). |
| **Operating Agreement** (single-member LLC, PA) | `_legal-docs/corporate/2026-06-04-arbiter-le-operating-agreement.docx` | Draft — confirm signed | Clean single-member, member-managed, PA Title 15, disregarded-entity tax, indemnification of member. Principal office 112 E 6th St, Lansdale. |
| **IP / Authorship Documentation** | `_legal-docs/corporate/2026-05-20-arbiter-le-ip-documentation.docx` | Self-declared, **unnotarized**; rebranded 6/22 | Establishes Andrew as sole author of curriculum, engine, UI. Notary line still blank. |

### B. Agreements
| Document | Location | Status | Notes |
|---|---|---|---|
| **Pilot Program Service Agreement** (EGPD, signed) | `Agency Onboarding/EGPD/2026-05-31-EGPD-pilot-service-agreement.docx` | EGPD signed (Chief Halteman) | Reviewed by reference — kept siloed, not copied into `_legal-docs/`. No-cost, 3-month, 12-module. Limitation-of-liability, IP, data-ownership-to-agency, "path to paid" clauses. |
| **Pilot NDA** | `_legal-docs/agreements/2026-06-05-pilot-nda.docx` | Template — **updated 7/6** | 3-yr term + 3-yr survival, PA law, equitable remedies. Now mutual on agency-provided policy materials (§4) — see §2.8. |
| **Platform User Agreement (Terms of Use)** | `_legal-docs/agreements/2026-06-22-arbiter-le-user-agreement.docx` | **NEW — draft for counsel** | Acceptance/clickwrap, license, acceptable use, IP, warranty disclaimer, liability cap, indemnification, PA governing law. Incorporates the Privacy/DPA and Platform Use & Disclaimer by reference. Bracketed notes flag open questions. |

### C. Policies
| Document | Location | Status | Notes |
|---|---|---|---|
| **Privacy Policy + Data Processing Agreement** (bundle) | `_legal-docs/policies/2026-06-06-arbiter-le-privacy-policy-dpa.docx` | Template — **confirm EGPD executed the DPA** | Part I = Privacy Policy. Part II = DPA (controller/processor, Supabase named sub-processor, 72-hr breach notice, audit rights). |
| **Platform Use & Disclaimer** (standalone) | `_legal-docs/policies/2026-06-22-arbiter-le-platform-use-disclaimer.docx` | **NEW — verbatim from in-app modal** | Training-tool / not-legal-advice / not-certification language as a reviewable document. |

### D. Insurance
| Document | Location | Status | Notes |
|---|---|---|---|
| **Miscellaneous Professional Liability application** (RSUI) | `_legal-docs/insurance/2026-06-08-arbiter-le-mpl-application-v2.docx` | **In negotiation — NOT bound** (as of 6/18) | Claims-made MPL form. Platform is live without coverage in force. **See §3.** RSUI's own form — left unbranded. |

### E. Live, public-facing verbiage (already on the site / in the app)
| Item | Location | Status | Notes |
|---|---|---|---|
| **Privacy Policy (web)** | `Marketing/privacy-policy.html` — live at arbiterle.com/privacy-policy | Published, effective 6/6/26 | Near-identical to Part I of the DPA bundle but **maintained separately** → drift risk (see §2.2). |
| **Platform Use & Disclaimer modal** | `index.html` (modal, ~846–872) | Live in-app | Strong defensive language. **But there is no acceptance/click-through — officers don't agree to it.** The new User Agreement is the vehicle to fix this (see §2.1). |
| **Marketing footer terms** | `Marketing/index.html` | Live | "Annual contracts only · Pricing subject to change." `onboarding.html` has placeholder NDA/Service-Agreement download buttons (`href="#"`). |

> Separate from this packet: `_legal/citations-registry.md` governs **case-law/statute cites inside training content** — a different system, already maintained. Not part of the lawyer's corporate/contracts review.

---

## 2. Gaps & Issues I'd Flag

**2.1 — Terms of Use / clickwrap — NOW DRAFTED, needs two things from here.** The Platform User Agreement now exists (`agreements/`) and pulls the liability and "not legal advice" disclaimers in as accepted terms. Two follow-ups: (a) **counsel review** of the draft, and (b) a **dev task** to present it for affirmative acceptance at first login (a real click-through), since today the in-app modal is not a clickwrap. Drafting the doc is step one; making acceptance binding is step two.

**2.2 — Privacy Policy exists in two places.** The live `privacy-policy.html` and Part I of the DPA `.docx` are maintained separately and already differ slightly in section numbering. Pick one canonical source; generate the other from it. Ask the lawyer to bless one version.

**2.3 — No *paid* Service Agreement yet.** Only the no-cost pilot agreement exists. The pilot's "Path to Paid Engagement" clause defers paid terms to a future contract. **EGPD's pilot ends ~Sept 17.** A paid MSA template ready before then directly serves the one metric that matters — Chief Halteman signing. Highest-leverage item for the lawyer to draft.

**2.4 — Liability exposure on the core product.** Training → officer acts → agency sued → training gets pointed at. Ask the lawyer: are the disclaimers enforceable as-is, are they stronger now that the User Agreement makes them accepted terms, and which way should indemnification run in the *paid* agreement? (The User Agreement flags this in a bracketed note.)

**2.5 — EGPD's Service Agreement never references the DPA — DECIDED: not reopening signed EGPD paperwork.** Confirmed the gap (Section 10 of the signed Agreement means the DPA was never actually incorporated), drafted a one-page addendum to fix it, but **Andrew's call (7/6): EGPD's agreement is signed and stays as-is — no amendments to already-executed agency paperwork.** Draft addendum archived, not pursued: `_archive/business-records/2026-07-06-egpd-dpa-addendum-NOT-PURSUED.docx`. The lesson carries forward instead — see new §2.9.

**2.6 — IP protection beyond the self-declaration.** The authorship doc is unnotarized and self-made. Worth asking: copyright registration on the curriculum, trademark on "Arbiter LE" and the seal.

**2.7 — Public-exposure risk — RESOLVED.** `_legal-docs` and `*.docx` are both in `.vercelignore`; the legal docs are not tracked in git. Verify nothing legal is fetchable after any deploy (curl check).

**2.8 — Agency policy confidentiality — RESOLVED in the template (7/6).** The Pilot NDA only bound the agency, not Arbiter, so there was no written promise to keep an agency's general orders/SOPs confidential or to avoid reusing them with another department — even though that's already an operating rule. Fixed by adding a mutual Section 4 to the NDA template. Ask the lawyer to sanity-check the language; it's not retroactive (EGPD never signed a standalone NDA), so it only protects agencies onboarded going forward.

**2.9 — Policy going forward: signed EGPD paperwork is final; the DPA-incorporation gap gets fixed at the template level, not by reopening EGPD.** Per Andrew (7/6): once an agency's agreement is signed, it doesn't get reopened for drafting fixes found later. The actual fix applies to the next agency's paperwork instead:
- The **Pilot NDA template** already carries the fix forward (§2.8).
- The **Platform User Agreement draft** (`agreements/2026-06-22-arbiter-le-user-agreement.docx`) already incorporates the DPA by reference in its own Section 7 — correct as drafted.
- **When the paid MSA gets drafted** (§2.3, post-pilot, Agency #3+), it must explicitly incorporate the DPA in its own text from day one — don't let a future agency's paperwork ship without that reference, the way EGPD's did.

---

## 3. Time-Critical — Before / Around Launch
1. **MPL insurance is in negotiation, NOT bound (confirmed 6/18).** EGPD is live and processing officer data with no professional-liability coverage in force. Mitigating it now: the LLC liability shield, the signed pilot agreement's limitation-of-liability clause, and the "training tool / not legal advice" disclaimers. That's tail-risk, not naked exposure — but MPL is the backstop for exactly the claim type those disclaimers are weakest against. **Get it bound before the pilot converts to paid; sooner is better.** Don't pause the pilot over it.
2. **EGPD DPA executed?** See 2.5.

---

## 4. Questions to Bring to the Lawyer
1. Review the **Platform User Agreement** draft — is the structure right, and does presenting it as a first-login clickwrap make the liability/"not legal advice" disclaimers enforceable as accepted terms?
2. Will you draft a **paid Master Service Agreement** template for post-pilot conversion (EGPD first)?
3. Are the **limitation-of-liability and "training tool, not legal advice"** disclaimers strong/enforceable for a law-enforcement training product? Which way should indemnification run with a paying agency?
4. Any **CJIS or PA criminal-justice data** rules that touch officer training records, or is this ordinary employment/training data?
5. Is the **single-member Operating Agreement** sufficient as-is, and is it properly executed with a registered agent on file?
6. Should we **register copyright** on the curriculum and **trademark** "Arbiter LE" / the seal? Is notarizing the IP record worth it?
7. Is the **controller/processor DPA framing** (agency = controller, Arbiter = processor, Supabase = sub-processor) correct, and is the 72-hr breach-notice obligation one we can actually meet?

---

*Maintained at `_legal-docs/LEGAL-REVIEW-PACKET.md` (internal — gitignored, never deploys).*
