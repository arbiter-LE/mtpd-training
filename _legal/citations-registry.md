# Arbiter LE — Verified Legal Citations Registry

**This file is the single source of truth for every statute, case, and legal authority cited anywhere in the platform.**

Internal only — listed in `.vercelignore`, never deploys.

## Rules (the no-memory gate)

1. **No legal citation ships unless it is in this registry with status `GOOD LAW` and a verification date within the cadence window.**
2. **Holdings are verified against a primary source — never written from memory.** Primary source = the statute text (legis.state.pa.us / pacodeandbulletin.gov) or the court opinion (pacourts.us, supreme.justia.com, official reporter). Secondary sources (law firm summaries, Justia case pages) are acceptable corroboration, not the sole basis.
3. **Before committing any content that adds or changes a legal citation, run `_legal/check-citations.sh`** (deliverable #2) and resolve every flag.
4. **Anything marked `OVERRULED` / `SUPERSEDED` may appear in content ONLY in explicit "this is no longer good law" framing** — never taught as current law.
5. **Re-verification cadence:** see bottom of file. Re-verify all `GOOD LAW` entries **quarterly** and **before every new agency onboard**.

### The hallucination firewall (added 2026-06-18)

The #1 way AI gets a lawyer sanctioned is a **fabricated citation** — a case or statute that does not exist (see the Charlotin court-sanctions database, damiencharlotin.com/hallucinations, 1,600+ logged cases). Two tools enforce against it:

- **`_legal/check-citations.sh` — the deterministic wall (offline, runs on every commit).** Every `Name v. Name` case cite and every `Act NN of YYYY` / `NN Pa.C.S./U.S.C./P.S. § NNN` statute cite in content **must appear in this registry**. A cite that appears nowhere here is a **HARD BLOCK** — a hallucinated authority literally cannot ship because it was never hand-entered. A cite that is here but not on a `GOOD LAW` line **WARNs** (allowed in already-live content, never in new content).
- **`_legal/verify-citation.sh "Name v. Name" "123 U.S. 456"` — the existence check (on-demand, before you add a row).** Queries **CourtListener** (Free Law Project — a real legal database) to confirm the case exists and the reporter cite resolves. `FOUND` / `PARTIAL` (name exists, cite doesn't match) / `NOT FOUND`. Existence only — you still read the opinion for the holding. Statutes are not in CourtListener; verify those against legis.state.pa.us by hand.

The Charlotin site itself is **not** auto-checked: it catalogs *fake* cases that got filed, so it can't confirm whether *our* (real, landmark) cites are good — and it has no API and blocks bots. It is a **manual quarterly read**, logged in the cadence section below.

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
| Simple assault | 18 Pa.C.S. § 2701 | Attempting/causing bodily injury, or by physical menace putting another in fear of imminent serious bodily injury; generally M2. | GOOD LAW | 2026-06-13 | legis.state.pa.us (Title 18 ch.27) | EGPD modules |
| Criminal trespass | 18 Pa.C.S. § 3503 | Unlawfully entering/remaining in a building, occupied structure, or posted property; grading varies by circumstance. | GOOD LAW | 2026-06-13 | legis.state.pa.us (Title 18 ch.35) | EGPD modules |
| Perjury | 18 Pa.C.S. § 4902 | False material statement under oath in an official proceeding, known to be untrue; F3. | GOOD LAW | 2026-06-13 | legis.state.pa.us (Title 18 ch.49) | EGPD modules |
| Unsworn falsification to authorities | 18 Pa.C.S. § 4904 | Making a false written statement or submitting a forged/false document to a public servant with intent to mislead. | GOOD LAW | 2026-06-13 | legis.state.pa.us (Title 18 ch.49) | EGPD modules |
| False reports to law enforcement | 18 Pa.C.S. § 4906 | Knowingly giving false information to LE intending to implicate another, or filing a fictitious report of an offense/incident. | GOOD LAW | 2026-06-13 | legis.state.pa.us (Title 18 ch.49) | EGPD modules |
| Vehicle general lighting requirements | **75** Pa.C.S. § 4303 | Vehicle Code: vehicles on highways must have required lamps incl. **rear lamps / tail lamps** (a missing tail light is an equipment violation). **Title 75, not Title 18.** | GOOD LAW | 2026-06-13 | legis.state.pa.us (Title 75 ch.43) | EGPD-1 |
| Protection From Abuse Act — definitions | **23** Pa.C.S. § 6102 (et seq.) | Domestic Relations: definitions for the PFA Act ("abuse," "family or household members," etc.); a PFA is obtained through the court of common pleas. **Title 23, not Title 18.** | GOOD LAW | 2026-06-13 | legis.state.pa.us (Title 23 ch.61) | EGPD-9 |
| § 1983 civil action | 42 U.S.C. § 1983 | Private cause of action against a person who, under color of state law, deprives another of rights secured by the Constitution/federal law. | GOOD LAW | 2026-06-13 | law.cornell.edu/uscode/text/42/1983 | EGPD modules |
| Lautenberg Amendment / DV firearm disability | 18 U.S.C. § 922(g)(9) & (g)(8) | Unlawful for a person **convicted of a misdemeanor crime of domestic violence** (g)(9), or **subject to a qualifying DV protective order** (g)(8), to ship/transport/possess/receive a firearm or ammunition in or affecting interstate commerce. | GOOD LAW | 2026-06-18 | law.cornell.edu/uscode/text/18/922 | index.html, app.js |

## Verified — Pennsylvania case law

| Authority | Citation | Holding (one line) | Status | Verified | Source | Used in |
|---|---|---|---|---|---|---|
| Commonwealth v. Alexander | 243 A.3d 177 (Pa. 2020) | Under Art. I § 8, a warrantless vehicle search requires **both probable cause AND exigent circumstances**; warrant is the default. **Overruled Gary.** | GOOD LAW | 2026-06-13 | pacourts.us opinion J-51-2020; supreme.justia.com | modules-mtpd.js, scenarios-mtpd.js, app.js, index.html, EGPD-8 |
| Commonwealth v. Barr | 266 A.3d 25 (Pa. 2021) | Odor of marijuana **alone** no longer establishes probable cause (medical-marijuana lawful); remains a **factor in the totality**. | GOOD LAW | 2026-06-13 | Pa. Supreme Ct.; princelaw.com; inquirer.com | modules-mtpd.js, scenarios-mtpd.js, app.js, index.html, EGPD-8 |
| Commonwealth v. Gary | 104 A.3d 1169 (Pa. 2014) | Adopted federal automobile exception (PC alone authorized warrantless vehicle search). **OVERRULED by Alexander (2020).** | **OVERRULED** | 2026-06-13 | pacourts.us; inquirer.com | index.html (historical only), EGPD-8/EGPD-1 (as overruled) |
| Commonwealth v. Enimpah | 104 A.3d 469 (Pa. 2014) | At suppression, the **Commonwealth bears the burden of production** — defendant need not first prove a privacy interest. | GOOD LAW | 2026-06-13 | law.justia.com; caselaw.findlaw.com | scenarios-mtpd.js |
| Commonwealth v. Macolino | 469 A.2d 132 (Pa. 1983) | Constructive possession = **conscious dominion** (power + intent to control); possession need not be exclusive — two or more (incl. spouses with equal access) may jointly possess. | GOOD LAW | 2026-06-13 | law.justia.com (503 Pa. 201); caselaw.findlaw.com | EGPD modules |

## Verified — federal case law

| Authority | Citation | Holding (one line) | Status | Verified | Source | Used in |
|---|---|---|---|---|---|---|
| Graham v. Connor | 490 U.S. 386 (1989) | Excessive-force claims judged under Fourth Amendment **objective reasonableness** from perspective of officer on scene; factors: severity of crime, immediate threat, active resistance/flight. | GOOD LAW | 2026-06-13 | caselaw.findlaw.com; oyez.org | modules-mtpd.js, scenarios-mtpd.js, app.js, index.html |
| Tennessee v. Garner | 471 U.S. 1 (1985) | Deadly force on a fleeing suspect is a seizure; permissible only on probable cause the suspect poses a **significant threat of death/SBI**. | GOOD LAW | 2026-06-13 | supreme.justia.com; caselaw.findlaw.com | modules-mtpd.js, scenarios-mtpd.js |
| Rodriguez v. United States | 575 U.S. 348 (2015) | Absent reasonable suspicion, **extending** a completed traffic stop for a dog sniff violates the Fourth Amendment; sniff is not part of the traffic mission. | GOOD LAW | 2026-06-13 | supreme.justia.com | modules-mtpd.js, scenarios-mtpd.js |
| Arizona v. Gant | 556 U.S. 332 (2009) | Vehicle search incident to arrest only if arrestee unsecured and within reaching distance, **or** reasonable to believe evidence of the crime of arrest is inside. | GOOD LAW | 2026-06-13 | tile.loc.gov (USRep); supreme.justia.com | modules-mtpd.js, scenarios-mtpd.js |
| Fields v. City of Philadelphia | 862 F.3d 353 (3d Cir. 2017) | First Amendment protects **photographing/filming/recording police** performing official duties in public; controlling in PA (3d Cir.). | GOOD LAW | 2026-06-13 | harvardlawreview.org; law.justia.com (3d Cir.) | scenarios-mtpd.js, EGPD-8 |
| Terry v. Ohio | 392 U.S. 1 (1968) | Officer may make a brief investigative **stop** on reasonable suspicion of criminal activity, and a protective **frisk** for weapons when reasonably believing the person is **armed and dangerous**. | GOOD LAW | 2026-06-13 | law.cornell.edu/supremecourt/text/392/1 | EGPD modules |
| Pennsylvania v. Mimms | 434 U.S. 106 (1977) | Once a vehicle is lawfully stopped, an officer may order the **driver** out; the added intrusion is **de minimis** against officer-safety interests. | GOOD LAW | 2026-06-13 | law.cornell.edu/supremecourt/text/434/106 | EGPD modules |
| Maryland v. Wilson | 519 U.S. 408 (1997) | An officer making a lawful traffic stop may order **passengers** out of the vehicle pending completion of the stop; no individualized suspicion required. | GOOD LAW | 2026-06-13 | law.cornell.edu/supremecourt/text/519/408 | EGPD modules |
| Florida v. Jimeno | 500 U.S. 248 (1991) | General **consent** to search a vehicle extends to closed containers inside when **objectively reasonable** that the consent's scope reached them. | GOOD LAW | 2026-06-13 | law.cornell.edu/supremecourt/text/500/248 | EGPD modules |
| Schneckloth v. Bustamonte | 412 U.S. 218 (1973) | **Consent** voluntariness is judged by the **totality of the circumstances**; the prosecution need not prove the subject knew of the right to refuse. | GOOD LAW | 2026-06-13 | law.cornell.edu/supremecourt/text/412/218 | EGPD modules |
| Illinois v. Gates | 462 U.S. 213 (1983) | Probable cause from an informant's tip is judged under a **totality-of-the-circumstances** test (fair probability), replacing the rigid Aguilar-Spinelli two-prong test. | GOOD LAW | 2026-06-13 | law.cornell.edu/supremecourt/text/462/213 | EGPD modules |
| Horton v. California | 496 U.S. 128 (1990) | **Plain-view** seizure is valid where the item's incriminating character is immediately apparent and the officer has lawful access; **inadvertence is not required**. | GOOD LAW | 2026-06-13 | law.cornell.edu/supremecourt/text/496/128 | EGPD modules |
| Chimel v. California | 395 U.S. 752 (1969) | **Search incident to arrest** is limited to the arrestee's person and the area **within his immediate control** (reaching distance for a weapon or destructible evidence). | GOOD LAW | 2026-06-13 | law.cornell.edu/supremecourt/text/395/752 | EGPD modules |
| Garrity v. New Jersey | 385 U.S. 493 (1967) | Statements **compelled from officers under threat of job loss** (removal from office) are inadmissible against them in a subsequent criminal proceeding. | GOOD LAW | 2026-06-13 | law.cornell.edu/supremecourt/text/385/493 | EGPD modules |
| Glik v. Cunniffe | 655 F.3d 78 (1st Cir. 2011) | First Amendment protects **filming/recording police** performing duties in public (right clearly established). **Persuasive in PA — Fields (3d Cir.) controls.** | GOOD LAW | 2026-06-13 | law.justia.com (1st Cir.); journals.law.harvard.edu (CR-CL); aclum.org | EGPD-8 |
| Miranda v. Arizona | 384 U.S. 436 (1966) | Prosecution may not use statements from **custodial interrogation** unless procedural safeguards secured the Fifth Amendment privilege; before questioning, the person must be warned of the right to remain silent, that anything said may be used against them, and the right to counsel (**appointed if indigent**). | GOOD LAW | 2026-06-18 | law.cornell.edu/supremecourt/text/384/436 | index.html |
| County of Sacramento v. Lewis | 523 U.S. 833 (1998) | In a **substantive-due-process** claim arising from a high-speed police **pursuit**, only a **purpose to cause harm unrelated to the legitimate object of arrest** shocks the conscience; recklessness/deliberate indifference is insufficient. | GOOD LAW | 2026-06-18 | law.cornell.edu/supremecourt/text/523/833 | index.html, app.js |

---

## PENDING primary-source verification

Catalogued from the codebase but **not yet re-verified against a primary source this cycle.** **Do not add these to new content until each is moved to a `GOOD LAW` row above with a source.** Holdings are intentionally omitted here to avoid memory-based assertions.

**2026-06-13 — EGPD clearance:** every PENDING authority the EGPD modules actually cite has been verified against a primary source and promoted to `GOOD LAW` above. The items remaining below appear in **MTPD live content or nowhere yet** — they do **not** gate EGPD's June 17 launch, but MTPD's live cites should still be cleared on the next pass.

**2026-06-18 — partial MTPD clearance:** Miranda v. Arizona, County of Sacramento v. Lewis, and 18 U.S.C. § 922(g)(9)/(g)(8) verified against primary text (Cornell LII) and promoted to `GOOD LAW` above.

**Federal cases (MTPD-only — verify before next MTPD review):** Carroll v. United States (267 U.S. 132, 1925) · **Scott v. Harris (550 U.S. 372, 2007) — existence + exact reporter cite confirmed 2026-06-18 via CourtListener; HOLDING still PENDING** (every full-opinion mirror — Justia, FindLaw, Wikisource, CourtListener's authenticated API — bot-blocked this pass; pull the holding from an accessible primary source, e.g. govinfo.gov U.S. Reports PDF or Google Scholar, before promoting). Used in index.html, app.js.

**PA statutes (firearms — not used by EGPD; verify exact section text & status before any content uses them):** 18 Pa.C.S. § 3105 · § 6105 (persons not to possess firearms) · § 6106 (carrying firearm w/o license) · § 6108 (carrying firearms on public streets in Philadelphia) · § 6113.

> **Title correction (2026-06-13):** earlier drafts of this list mis-filed `§ 4303` and `§ 6102` under Title 18. The EGPD modules correctly cite **75 Pa.C.S. § 4303** (Vehicle Code — general lighting/tail lamps) and **23 Pa.C.S. § 6102** (Protection From Abuse Act — definitions). Both are now `GOOD LAW` above. There is no 18 Pa.C.S. § 4303/§ 6102 in EGPD content.

---

## Re-verification cadence (deliverable #3)

- **Quarterly:** re-verify every `GOOD LAW` entry against its primary source; update the `Verified` date. Next due: **2026-09-13**.
- **Before every new agency onboard:** full pass of this registry + clear all `PENDING` rows that the new agency's content relies on.
- **On any legal-content change:** the author re-verifies the specific citation touched and runs `_legal/check-citations.sh`. For a brand-new case being added to this registry, also run `_legal/verify-citation.sh` to confirm it exists.
- **Quarterly manual read:** skim the Charlotin hallucination database (damiencharlotin.com/hallucinations) for newly-flagged PA/3d-Cir. fabricated or misrepresented authorities, and confirm none match a cite we teach. Next due with the quarterly pass: **2026-09-13**.
- **Watch items (law that moved recently — recheck for further change):** Alexander/Barr line of PA vehicle-search cases; PA marijuana statutes; MPOETC Acts 57/59 implementing regulations.

_Last full review: 2026-06-13._
