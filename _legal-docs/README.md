# _legal-docs — Arbiter LE legal documents & policies

The single home for Arbiter LE's company-level legal documents — the counterpart
to `_marketing/` and the retired `_business/` shelf. This is the set assembled for
the business-lawyer review (Leah Westerman) ahead of binding the insurance plan.

**Internal only.** The folder and every `*.docx` are in `.vercelignore` — nothing
here deploys. Superseded versions go to `_archive/business-records/`; keep only the
current one here.

## Layout

| Folder | Holds |
|--------|-------|
| `corporate/` | Certificate of Organization (filing approval), Operating Agreement, IP Documentation |
| `agreements/` | Pilot NDA (template), Platform User Agreement (Terms of Use) |
| `policies/` | Privacy Policy + DPA (bundle), Platform Use & Disclaimer |
| `insurance/` | Miscellaneous Professional Liability application (RSUI) |
| `_build/` | `generate-legal-docs.js` — regenerates the branded docs from the house template |

## Current documents

| File | What it is | Status |
|------|-----------|--------|
| `corporate/2026-06-04-arbiter-le-certificate-of-organization-filing-approval.pdf` | PA Dept. of State filing-approval record (Entity ID 0015534221, filed 6/3/26) | **Saved 6/22**; pull stamped cert from file.dos.pa.gov before ~8/2/26 |
| `corporate/2026-06-04-arbiter-le-operating-agreement.docx` | Single-member LLC operating agreement (PA) | Existing |
| `corporate/2026-05-20-arbiter-le-ip-documentation.docx` | Authorship/ownership record | **Rebranded 6/22**; still unnotarized |
| `agreements/2026-06-05-pilot-nda.docx` | Pilot NDA template | Existing |
| `agreements/2026-06-22-arbiter-le-user-agreement.docx` | Platform User Agreement / Terms of Use | **NEW 6/22 — draft for counsel** |
| `policies/2026-06-06-arbiter-le-privacy-policy-dpa.docx` | Privacy Policy (Part I) + DPA (Part II) | Existing |
| `policies/2026-06-22-arbiter-le-platform-use-disclaimer.docx` | Standalone Platform Use & Disclaimer | **NEW 6/22 — verbatim from in-app modal** |
| `insurance/2026-06-08-arbiter-le-mpl-application-v2.docx` | RSUI MPL application (claims-made) | Existing — not yet bound |

## Related / referenced (not duplicated here, to avoid drift)

- **EGPD pilot service agreement** (signed) — stays siloed at
  `Agency Onboarding/EGPD/2026-05-31-EGPD-pilot-service-agreement.docx` (cross-agency
  confidentiality). Reviewed by reference, not copied into this shelf.
- **Privacy Policy (web)** — live at arbiterle.com/privacy-policy → `Marketing/privacy-policy.html`.
- **In-app Platform Use & Disclaimer** — `index.html` (modal). The standalone `.docx`
  in `policies/` reproduces it verbatim.
- `_legal/` — citations registry + verification tooling. Legal *content* inside
  training modules; a separate system, not part of this corporate/contracts review.

## Regenerating the branded docs

```bash
cd _legal-docs/_build
NODE_PATH=/opt/homebrew/lib/node_modules node generate-legal-docs.js
```

House style: Segoe UI · Navy `#182535`/`#0A1828` · Gold `#C8902A` · Steel `#5A7A92`,
MISSION banner, branded header/footer. See `LEGAL-REVIEW-PACKET.md` for the full
inventory, open issues, and questions for the lawyer.
