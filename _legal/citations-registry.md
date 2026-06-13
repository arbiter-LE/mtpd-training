# Arbiter LE — Verified Legal Citations Registry

**This file is the single source of truth for every statute, case, and legal authority cited anywhere in the platform.**

Internal only — listed in `.vercelignore`, never deploys.

## Rules (the no-memory gate)

1. **No legal citation ships unless it is in this registry with status `GOOD LAW` and a verification date within the cadence window.**
2. **Holdings are verified against a primary source — never written from memory.** Primary source = the statute text (legis.state.pa.us / pacodeandbulletin.gov) or the court opinion (pacourts.us, supreme.justia.com, official reporter). Secondary sources (law firm summaries, Justia case pages) are acceptable corroboration, not the sole basis.
3. **Before committing any content that adds or changes a legal citation, run `_legal/check-citations.sh`** (deliverable #2) and resolve every flag.
4. **Anything marked `OVERRULED` / `SUPERSEDED` may appear in content ONLY in explicit "this is no longer good law" framing** — never taught as current law.
5. **Re-verification cadence:** see bottom of file. Re-verify all `GOOD LAW` entries **quarterly** and **before every new agency onboard**.

Verification status legend: `GOOD LAW` · `OVERRULED` · `PENDING` (catalogued, primary-source verification not yet done — do **not** ship in new content until cleared).

---

## Verified — Pennsylvania statutes & rules

| Authority | Citation | Holding / effect (one line) | Status | Verified | Source | Used in |
|---|---|---|---|---|---|---|
| PA Act 57 of 2020 | Act 57 of 2020 (44 Pa.C.S. ch. on LE background investigations) | Police **hiring** law: statewide separation-records database + mandatory background investigations. **NOT** use-of-force or de-escalation. | GOOD LAW | 2026-06-13 | pa.gov/MPOETC; legis.state.pa.us | app.js |
| PA Act 59 of 2020 | Act 59 of 2020 | Mandatory annual **use-of-force & de-escalation training**; mental-health evaluations after deadly force. | GOOD LAW | 2026-06-13 | pa.gov/MPOETC; law.justia.com | modules-mtpd.js, scenarios-mtpd.js, app.js |
| MHPA § 302 | 50 P.S. § 7302 | Authorizes involuntary emergency examination on **clear and present danger** to self/others (behavior within 30 days); officer who personally witnesses may take person for exam, no warrant needed. | GOOD LAW | 2026-06-13 | legis.state.pa.us (Act 143 of 1976); 55 Pa. Code §5100.86 | scenarios-mtpd.js, EGPD modules |
| CISM confidentiality | 42 Pa.C.S. § 5950 | Critical-incident-stress-management team member may not be compelled to disclose an officer's confidential communications. | GOOD LAW | 2026-06-13 | codes.findlaw.com; law.justia.com | scenarios-mtpd.js |
| Peer-support confidentiality | 42 Pa.C.S. § 5952 | Peer-support member may not be compelled to disclose an officer's confidential communications; coparticipants likewise bound. | GOOD LAW | 2026-06-13 | codes.findlaw.com | scenarios-mtpd.js |
| Use of force in LE | 18 Pa.C.S. § 508 | Justification for police use of force/deadly force in effecting arrest; deadly force limited to substantial risk of death/SBI. | GOOD LAW | 2026-06-13 | law.justia.com (Title 18 ch.5) | EGPD modules |
| Suppression procedure | Pa.R.Crim.P. 581 (234 Pa. Code r. 581) | Procedure for motion to suppress; must state grounds with particularity; waived if not timely raised in omnibus motion. | GOOD LAW | 2026-06-13 | pacodeandbulletin.gov; pacourts.us | scenarios-mtpd.js |

## Verified — Pennsylvania case law

| Authority | Citation | Holding (one line) | Status | Verified | Source | Used in |
|---|---|---|---|---|---|---|
| Commonwealth v. Alexander | 243 A.3d 177 (Pa. 2020) | Under Art. I § 8, a warrantless vehicle search requires **both probable cause AND exigent circumstances**; warrant is the default. **Overruled Gary.** | GOOD LAW | 2026-06-13 | pacourts.us opinion J-51-2020; supreme.justia.com | modules-mtpd.js, scenarios-mtpd.js, app.js, index.html, EGPD-8 |
| Commonwealth v. Barr | 266 A.3d 25 (Pa. 2021) | Odor of marijuana **alone** no longer establishes probable cause (medical-marijuana lawful); remains a **factor in the totality**. | GOOD LAW | 2026-06-13 | Pa. Supreme Ct.; princelaw.com; inquirer.com | modules-mtpd.js, scenarios-mtpd.js, app.js, index.html, EGPD-8 |
| Commonwealth v. Gary | 104 A.3d 1169 (Pa. 2014) | Adopted federal automobile exception (PC alone authorized warrantless vehicle search). **OVERRULED by Alexander (2020).** | **OVERRULED** | 2026-06-13 | pacourts.us; inquirer.com | index.html (historical only), EGPD-8/EGPD-1 (as overruled) |
| Commonwealth v. Enimpah | 104 A.3d 469 (Pa. 2014) | At suppression, the **Commonwealth bears the burden of production** — defendant need not first prove a privacy interest. | GOOD LAW | 2026-06-13 | law.justia.com; caselaw.findlaw.com | scenarios-mtpd.js |

## Verified — federal case law

| Authority | Citation | Holding (one line) | Status | Verified | Source | Used in |
|---|---|---|---|---|---|---|
| Graham v. Connor | 490 U.S. 386 (1989) | Excessive-force claims judged under Fourth Amendment **objective reasonableness** from perspective of officer on scene; factors: severity of crime, immediate threat, active resistance/flight. | GOOD LAW | 2026-06-13 | caselaw.findlaw.com; oyez.org | modules-mtpd.js, scenarios-mtpd.js, app.js, index.html |
| Tennessee v. Garner | 471 U.S. 1 (1985) | Deadly force on a fleeing suspect is a seizure; permissible only on probable cause the suspect poses a **significant threat of death/SBI**. | GOOD LAW | 2026-06-13 | supreme.justia.com; caselaw.findlaw.com | modules-mtpd.js, scenarios-mtpd.js |
| Rodriguez v. United States | 575 U.S. 348 (2015) | Absent reasonable suspicion, **extending** a completed traffic stop for a dog sniff violates the Fourth Amendment; sniff is not part of the traffic mission. | GOOD LAW | 2026-06-13 | supreme.justia.com | modules-mtpd.js, scenarios-mtpd.js |
| Arizona v. Gant | 556 U.S. 332 (2009) | Vehicle search incident to arrest only if arrestee unsecured and within reaching distance, **or** reasonable to believe evidence of the crime of arrest is inside. | GOOD LAW | 2026-06-13 | tile.loc.gov (USRep); supreme.justia.com | modules-mtpd.js, scenarios-mtpd.js |
| Fields v. City of Philadelphia | 862 F.3d 353 (3d Cir. 2017) | First Amendment protects **photographing/filming/recording police** performing official duties in public; controlling in PA (3d Cir.). | GOOD LAW | 2026-06-13 | harvardlawreview.org; law.justia.com (3d Cir.) | scenarios-mtpd.js |

---

## PENDING primary-source verification

Catalogued from the codebase but **not yet re-verified against a primary source this cycle.** Most appear in MTPD live content and/or the uncommitted EGPD modules. **Do not add these to new content, and do not let EGPD go live, until each is moved to a `GOOD LAW` row above with a source.** Holdings are intentionally omitted here to avoid memory-based assertions.

**Federal cases:** Terry v. Ohio (392 U.S. 1, 1968) · Pennsylvania v. Mimms (434 U.S. 106, 1977) · Maryland v. Wilson (519 U.S. 408, 1997) · Florida v. Jimeno (500 U.S. 248, 1991) · Schneckloth v. Bustamonte (412 U.S. 218, 1973) · Illinois v. Gates (462 U.S. 213, 1983) · Horton v. California (496 U.S. 128, 1990) · Chimel v. California (395 U.S. 752, 1969) · Garrity v. New Jersey (385 U.S. 493, 1967) · Scott v. Harris (550 U.S. 372, 2007) · County of Sacramento v. Lewis (523 U.S. 833, 1998) · Miranda v. Arizona (384 U.S. 436, 1966) · Carroll v. United States (267 U.S. 132, 1925) · Glik v. Cunniffe (655 F.3d 78, 1st Cir. 2011) · 42 U.S.C. § 1983.

**PA cases:** Commonwealth v. Macolino (469 A.2d 132, Pa. 1983 — constructive possession).

**PA statutes (Title 18 & firearms — verify exact section text & current status):** § 2701 (simple assault) · § 3503 (criminal trespass) · § 4902 (perjury) · § 4904 (unsworn falsification) · § 4906 (false reports to LE) · § 4303 · § 3105 · § 6102 · § 6105 (persons not to possess firearms) · § 6106 (carrying firearm w/o license) · § 6108 (carrying firearms on public streets in Philadelphia) · § 6113 · 18 U.S.C. § 922 (federal firearms).

---

## Re-verification cadence (deliverable #3)

- **Quarterly:** re-verify every `GOOD LAW` entry against its primary source; update the `Verified` date. Next due: **2026-09-13**.
- **Before every new agency onboard:** full pass of this registry + clear all `PENDING` rows that the new agency's content relies on.
- **On any legal-content change:** the author re-verifies the specific citation touched and runs `_legal/check-citations.sh`.
- **Watch items (law that moved recently — recheck for further change):** Alexander/Barr line of PA vehicle-search cases; PA marijuana statutes; MPOETC Acts 57/59 implementing regulations.

_Last full review: 2026-06-13._
