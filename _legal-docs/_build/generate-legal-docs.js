/*
 * Arbiter LE — legal document generator
 * Produces branded .docx for the legal-review bundle from a single house template.
 * Run:  NODE_PATH=/opt/homebrew/lib/node_modules node generate-legal-docs.js
 *
 * House style (mirrors the operating agreement / NDA family):
 *   Font  Segoe UI · Navy 182535 / 0A1828 · Gold C8902A · Steel 5A7A92
 *   Hairline C4D6E4 · Tint EDF3F8 · US Letter, 1" margins
 */
const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, BorderStyle, WidthType, ShadingType,
  PageNumber, TabStopType, TabStopPosition, LevelFormat,
} = require("docx");

const FONT = "Segoe UI";
const NAVY = "182535";
const NAVY_DARK = "0A1828";
const GOLD = "C8902A";
const STEEL = "5A7A92";
const HAIR = "C4D6E4";
const CONTENT_W = 9360; // 12240 - 2*1440

const MISSION =
  "To hold law enforcement to the standard the badge demands — through training that is disciplined, documented, and built to last.";

// ---- building blocks --------------------------------------------------------

const run = (text, o = {}) =>
  new TextRun({ text, font: FONT, size: o.size || 20, bold: o.bold || false,
    italics: o.italics || false, color: o.color || NAVY, allCaps: o.caps || false });

// Centered title block on page 1
function titleBlock(title, subtitle, tagText) {
  const out = [
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 0, after: 60 },
      children: [run("ARBITER LE LLC", { size: 36, bold: true, color: NAVY })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 0, after: subtitle ? 60 : 200 },
      children: [run(title, { size: 26, bold: true, color: NAVY, caps: true })] }),
  ];
  if (subtitle)
    out.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 0, after: 200 },
      children: [run(subtitle, { size: 20, color: STEEL })] }));
  // Mission banner — gold label + white text on dark navy (matches signature-table palette)
  out.push(new Table({
    width: { size: CONTENT_W, type: WidthType.DXA }, columnWidths: [CONTENT_W],
    borders: noBorders(),
    rows: [new TableRow({ children: [new TableCell({
      width: { size: CONTENT_W, type: WidthType.DXA },
      shading: { fill: NAVY_DARK, type: ShadingType.CLEAR },
      margins: { top: 120, bottom: 120, left: 200, right: 200 },
      children: [new Paragraph({ spacing: { before: 0, after: 0 }, children: [
        new TextRun({ text: "MISSION   ", font: FONT, size: 18, bold: true, color: GOLD, allCaps: true }),
        new TextRun({ text: MISSION, font: FONT, size: 18, color: "FFFFFF" }),
      ] })],
    })] })],
  }));
  // Tag line under the banner (effective date / draft notice)
  if (tagText)
    out.push(new Paragraph({ spacing: { before: 160, after: 40 }, alignment: AlignmentType.CENTER,
      border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: GOLD, space: 6 } },
      children: [run(tagText, { size: 18, bold: true, color: GOLD, caps: true })] }));
  else
    out.push(new Paragraph({ spacing: { before: 120, after: 40 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: GOLD, space: 6 } }, children: [run("", {})] }));
  return out;
}

const noBorders = () => ({
  top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE },
  left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE },
  insideHorizontal: { style: BorderStyle.NONE }, insideVertical: { style: BorderStyle.NONE },
});

const h2 = (text) => new Paragraph({ spacing: { before: 240, after: 80 },
  children: [run(text, { size: 22, bold: true, color: NAVY })] });

const p = (text, runs) => new Paragraph({ spacing: { before: 0, after: 120 },
  children: runs || [run(text, { size: 20 })] });

// paragraph with mixed runs, lets us bold a lead-in
const pr = (...children) => new Paragraph({ spacing: { before: 0, after: 120 }, children });

const li = (text) => new Paragraph({ numbering: { reference: "bullets", level: 0 },
  spacing: { before: 0, after: 80 }, children: [run(text, { size: 20 })] });

const letterItem = (label, text) => new Paragraph({ spacing: { before: 0, after: 80 }, indent: { left: 480, hanging: 280 },
  children: [run(label + "  ", { size: 20, bold: true }), run(text, { size: 20 })] });

function brandHeader() {
  return new Header({ children: [new Paragraph({
    spacing: { before: 0, after: 0 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: HAIR, space: 4 } },
    tabStops: [{ type: TabStopType.RIGHT, position: 9360 }],
    children: [
      new TextRun({ text: "ARBITER LE", font: FONT, size: 16, bold: true, color: NAVY, allCaps: true }),
      new TextRun({ text: "\tLAW ENFORCEMENT TRAINING PLATFORM", font: FONT, size: 14, color: STEEL, allCaps: true }),
    ],
  })] });
}

function brandFooter(docLabel) {
  return new Footer({ children: [new Paragraph({
    spacing: { before: 0, after: 0 },
    border: { top: { style: BorderStyle.SINGLE, size: 4, color: HAIR, space: 4 } },
    tabStops: [{ type: TabStopType.CENTER, position: 4680 }, { type: TabStopType.RIGHT, position: 9360 }],
    children: [
      new TextRun({ text: "CONFIDENTIAL", font: FONT, size: 14, color: STEEL, allCaps: true }),
      new TextRun({ text: "\t" + docLabel, font: FONT, size: 14, color: STEEL }),
      new TextRun({ text: "\tPage ", font: FONT, size: 14, color: STEEL }),
      new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: 14, color: STEEL }),
      new TextRun({ text: " of ", font: FONT, size: 14, color: STEEL }),
      new TextRun({ children: [PageNumber.TOTAL_PAGES], font: FONT, size: 14, color: STEEL }),
    ],
  })] });
}

function buildDoc(docLabel, children) {
  return new Document({
    creator: "Arbiter LE LLC",
    numbering: { config: [{ reference: "bullets", levels: [{ level: 0, format: LevelFormat.BULLET,
      text: "•", alignment: AlignmentType.LEFT,
      style: { paragraph: { indent: { left: 480, hanging: 240 } } } }] }] },
    styles: { default: { document: { run: { font: FONT, size: 20, color: NAVY } } } },
    sections: [{
      properties: { page: { size: { width: 12240, height: 15840 },
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440, header: 720, footer: 600 } } },
      headers: { default: brandHeader() },
      footers: { default: brandFooter(docLabel) },
      children,
    }],
  });
}

const OUT = path.resolve(__dirname, "..");
const save = (doc, rel) => Packer.toBuffer(doc).then((b) => {
  const f = path.join(OUT, rel); fs.writeFileSync(f, b); console.log("wrote", rel);
});

// ============================================================================
// DOC 1 — PLATFORM USER AGREEMENT (Terms of Use)   [NEW]
// ============================================================================
function userAgreement() {
  const c = [];
  c.push(...titleBlock("Platform User Agreement", "Terms of Use — Arbiter LE Law Enforcement Training Platform",
    "Draft for Legal Review — June 22, 2026"));

  c.push(p("This Platform User Agreement (“Agreement” or “Terms”) governs access to and use of the Arbiter LE law enforcement training platform and all related software, content, and services (collectively, the “Platform”) operated by Arbiter LE LLC, a Pennsylvania limited liability company (“Arbiter LE,” “we,” “us,” or “our”). These Terms apply to each law enforcement agency that subscribes to or pilots the Platform (an “Agency”) and to each individual the Agency authorizes to access the Platform, including officers and administrators (each an “Authorized User”)."));

  c.push(h2("1. Acceptance of These Terms"));
  c.push(p("By accessing or using the Platform, the Agency and each Authorized User agree to be bound by these Terms. An individual who accepts these Terms on behalf of an Agency represents that they are authorized to bind that Agency. If you do not agree to these Terms, do not access or use the Platform. Where the Platform presents these Terms for affirmative acceptance (for example, a check-box or “I Agree” action at first login), completing that action constitutes acceptance."));

  c.push(h2("2. Definitions"));
  c.push(letterItem("a.", "“Platform” means the Arbiter LE training application, its training modules, scenarios, quizzes, debriefs, dashboards, and supporting software and documentation."));
  c.push(letterItem("b.", "“Content” means all curriculum, scenarios, quiz questions, reference material, text, graphics, and design elements made available through the Platform."));
  c.push(letterItem("c.", "“Authorized User” means an officer, administrator, or other individual the Agency authorizes to access the Platform under the Agency’s account."));
  c.push(letterItem("d.", "“Officer Data” means data relating to an Authorized User that is processed through the Platform, as further described in the Privacy Policy and Data Processing Agreement."));

  c.push(h2("3. License and Access"));
  c.push(p("Subject to these Terms and to the Agency’s applicable service agreement or pilot agreement, Arbiter LE grants the Agency a limited, non-exclusive, non-transferable, non-sublicensable right to access and use the Platform during the subscription or pilot term solely for the internal training of the Agency’s Authorized Users. No other rights are granted. The Platform is licensed, not sold."));

  c.push(h2("4. Accounts and Security"));
  c.push(p("The Agency is responsible for provisioning, supervising, and deactivating its Authorized Users. Authorized Users must keep their credentials confidential, may not share accounts, and must promptly notify the Agency and Arbiter LE of any suspected unauthorized access. The Agency is responsible for all activity occurring under its account and its Authorized Users’ credentials."));

  c.push(h2("5. Acceptable Use"));
  c.push(p("Authorized Users and the Agency shall not, and shall not permit any third party to:"));
  c.push(letterItem("a.", "copy, modify, distribute, sell, rent, sublicense, or create derivative works from the Platform or Content except as expressly permitted;"));
  c.push(letterItem("b.", "reverse engineer, decompile, disassemble, or attempt to derive the source code or underlying structure of the Platform;"));
  c.push(letterItem("c.", "access the Platform to build or inform a competing product, or scrape, harvest, or bulk-extract Content;"));
  c.push(letterItem("d.", "share, resell, or provide access to the Platform to any individual or organization that is not an Authorized User of the Agency;"));
  c.push(letterItem("e.", "use the Platform in violation of any applicable law, or to circumvent any security, access, or usage limitation."));

  c.push(h2("6. Intellectual Property"));
  c.push(p("As between the parties, Arbiter LE owns and retains all right, title, and interest in and to the Platform and the Content, including all curriculum, scenario design, software, user interface, and associated documentation, and all related intellectual property rights. These Terms do not transfer any ownership interest. Any feedback or suggestions provided by the Agency or an Authorized User may be used by Arbiter LE without restriction or obligation."));

  c.push(h2("7. Agency Policy and Officer Data"));
  c.push(pr(run("The Platform supplements, and does not replace, the Agency’s own policies, general orders, standard operating procedures, and chain-of-command directives. The Agency’s policy controls in the event of any conflict. The collection and processing of Officer Data is governed by the ", { size: 20 }),
    run("Arbiter LE Privacy Policy and Data Processing Agreement", { size: 20, bold: true }),
    run(", which is incorporated into these Terms by reference. The Agency acts as the controller of Officer Data and Arbiter LE acts as the processor, as further described in that document.", { size: 20 })));

  c.push(h2("8. Training Tool — Not Operational Authority or Legal Advice"));
  c.push(p("The Platform is a training and professional-development tool. It does not create, replace, or modify any Agency policy, and it does not constitute legal advice, legal interpretation, or a legal determination of any kind. Completion of any module, scenario, or quiz reflects participation in training only; it is not a certification of legal compliance, an endorsement of any action depicted, and does not establish a standard of care for any real-world incident. The Agency and its Authorized Users remain responsible for acting in accordance with current law and current Agency policy. These principles are stated in full in the Platform Use & Disclaimer, which is incorporated into these Terms by reference."));

  c.push(h2("9. Disclaimer of Warranties"));
  c.push(p("The Platform and Content are provided “AS IS” and “AS AVAILABLE,” without warranties of any kind, whether express, implied, or statutory, including any implied warranties of merchantability, fitness for a particular purpose, title, and non-infringement. Arbiter LE does not warrant that the Platform will be uninterrupted or error-free, or that legal or policy references in the Content are current as of any particular date. Officers are responsible for staying current on legal developments through their Agency’s official channels."));

  c.push(h2("10. Limitation of Liability"));
  c.push(p("To the maximum extent permitted by law, Arbiter LE shall not be liable for any indirect, incidental, special, consequential, exemplary, or punitive damages, or for any loss of data, profits, or goodwill, arising out of or relating to the Platform, whether based in contract, tort, or any other theory, even if advised of the possibility of such damages. To the maximum extent permitted by law, Arbiter LE’s total aggregate liability arising out of or relating to the Platform shall not exceed the amounts paid by the Agency to Arbiter LE for the Platform during the twelve (12) months preceding the event giving rise to the claim, or, where the Agency participates under a no-cost pilot, one hundred dollars ($100)."));

  c.push(h2("11. Indemnification"));
  c.push(pr(run("The Agency shall indemnify and hold harmless Arbiter LE from and against third-party claims arising out of the Agency’s or its Authorized Users’ misuse of the Platform or breach of these Terms. ", { size: 20 }),
    run("[For counsel: confirm direction and scope of indemnification for the paid Master Service Agreement — mutual vs. one-way, and treatment of claims alleging reliance on training content.]", { size: 20, italics: true, color: STEEL })));

  c.push(h2("12. Term, Suspension, and Termination"));
  c.push(p("These Terms apply for the duration of the Agency’s subscription or pilot term and any period during which an Authorized User accesses the Platform. Arbiter LE may suspend or terminate access for any breach of these Terms or for conduct that risks harm to the Platform or other users. Upon termination, the license in Section 3 ends and Authorized Users must cease accessing the Platform. Sections that by their nature should survive termination (including Sections 6, 9, 10, 11, and 14) survive."));

  c.push(h2("13. Changes to These Terms"));
  c.push(p("Arbiter LE may update these Terms from time to time. Material changes will be communicated to the Agency through the Platform or by email to the Agency administrator. Continued use of the Platform after an update takes effect constitutes acceptance of the updated Terms."));

  c.push(h2("14. Governing Law and Venue"));
  c.push(p("These Terms are governed by and construed in accordance with the laws of the Commonwealth of Pennsylvania, without regard to its conflict-of-law principles. The parties consent to the exclusive jurisdiction and venue of the state and federal courts located in Montgomery County, Pennsylvania, for any dispute arising out of or relating to these Terms or the Platform."));

  c.push(h2("15. General"));
  c.push(p("These Terms, together with the Agency’s service or pilot agreement and the documents incorporated by reference, constitute the entire agreement between the parties regarding the Platform and supersede all prior understandings on that subject. If any provision is held unenforceable, the remaining provisions remain in effect. No waiver is effective unless in writing. The Agency may not assign these Terms without Arbiter LE’s prior written consent. Notices to Arbiter LE may be sent to the principal office at 112 E 6th Street, Lansdale, PA 19446."));

  c.push(h2("16. Acknowledgment"));
  c.push(p("By accessing or using the Arbiter LE Platform, the Agency and each Authorized User acknowledge that they have read, understood, and agree to be bound by these Terms and by the Platform Use & Disclaimer and Privacy Policy and Data Processing Agreement incorporated herein."));

  c.push(new Paragraph({ spacing: { before: 280, after: 0 }, border: { top: { style: BorderStyle.SINGLE, size: 6, color: GOLD, space: 6 } },
    children: [run("DRAFT — prepared for review by Andrew Curtis and counsel (Arbiter LE LLC). Not legal advice. Bracketed notes flag open questions for the attorney.", { size: 16, italics: true, color: STEEL })] }));

  return buildDoc("Platform User Agreement", c);
}

// ============================================================================
// DOC 2 — PLATFORM USE & DISCLAIMER (standalone)   [NEW; verbatim from in-app modal]
// ============================================================================
function platformDisclaimer() {
  const c = [];
  c.push(...titleBlock("Platform Use & Disclaimer", "Arbiter LE Law Enforcement Training Platform",
    "Effective June 6, 2026"));

  c.push(p("This statement governs the use of the Arbiter LE training platform (the “Platform”) and the role it plays relative to department policy and the law. The same statement is presented to users within the Platform itself. It is reproduced here in full."));

  c.push(h2("Training Tool, Not Operational Authority"));
  c.push(p("Arbiter LE is a training and professional development platform. It is designed to reinforce knowledge, sharpen decision-making, and support readiness — it does not create, replace, or modify any department’s policies, general orders, standard operating procedures, or chain-of-command directives."));
  c.push(pr(run("If anything presented in a module appears to conflict with your department’s current policy, ", { size: 20 }),
    run("your department’s policy controls.", { size: 20, bold: true }),
    run(" Report the conflict to your supervisor or training coordinator so it can be corrected.", { size: 20 })));

  c.push(h2("Not Legal Advice"));
  c.push(p("Scenarios, quiz questions, and reference material on this platform are for training purposes only and do not constitute legal advice, legal interpretation, or a legal determination of any kind. They are not a substitute for case-specific legal review."));
  c.push(pr(run("For questions involving the application of law to an actual incident — including but not limited to use-of-force review, search and seizure, charging decisions, or evidentiary matters — ", { size: 20 }),
    run("consult your supervisor and your District Attorney’s Office.", { size: 20, bold: true }),
    run(" The DA’s Office has final say on legal questions arising from real incidents. Nothing on this platform overrides that authority.", { size: 20 })));

  c.push(h2("Currency of Legal References"));
  c.push(p("Case law and statutory references included in modules are reviewed for accuracy as of the date noted within that module. Law changes. Officers are responsible for staying current on legal developments through their department’s official channels and are expected to act on current law and current department policy, regardless of what a training module states."));

  c.push(h2("Completion Is Not Certification"));
  c.push(p("Completing a module, scenario, or quiz on this platform reflects participation in training. It is not a certification of legal compliance, a department endorsement of any action depicted, and does not establish a standard of care for any real-world incident."));

  c.push(h2("Scope"));
  c.push(p("This platform is a supplement to — never a replacement for — your department’s training program, policy manual, and the law. When in doubt, policy and law govern. This platform does not."));

  c.push(new Paragraph({ spacing: { before: 280, after: 0 }, border: { top: { style: BorderStyle.SINGLE, size: 6, color: GOLD, space: 6 } },
    children: [run("This standalone document reproduces the in-application Platform Use & Disclaimer verbatim. Source: Arbiter LE Platform, “Platform Use & Disclaimer.”", { size: 16, italics: true, color: STEEL })] }));

  return buildDoc("Platform Use & Disclaimer", c);
}

// ============================================================================
// DOC 3 — INTELLECTUAL PROPERTY DOCUMENTATION (rebranded; content preserved)
// ============================================================================
function labelValue(label, value) {
  return new Paragraph({ spacing: { before: 0, after: 80 }, children: [
    run(label + ":  ", { size: 20, bold: true, color: STEEL, caps: false }),
    run(value, { size: 20, color: NAVY }),
  ] });
}

function ipDocumentation() {
  const c = [];
  c.push(...titleBlock("Intellectual Property Documentation", "Formal Record of Authorship & Ownership",
    "Confidential — Document v1.0 — May 20, 2026"));

  c.push(h2("Ownership & Authorship"));
  c.push(labelValue("Creator", "Andrew Curtis"));
  c.push(labelValue("Date of Creation", "May 20, 2026"));
  c.push(labelValue("Platform Name", "Arbiter LE"));
  c.push(labelValue("Document Purpose", "Formal intellectual property record establishing prior authorship and ownership of the Arbiter LE law enforcement training platform."));

  c.push(h2("Platform Concept"));
  c.push(p("Arbiter LE is a self-contained, browser-based law enforcement training platform designed to deliver standardized, scenario-based professional development to sworn officers. The platform is built to hold departments to measurable training standards through structured curriculum, interactive decision-making scenarios, and automated compliance tracking."));
  c.push(p("The platform is deployed as a single HTML file requiring no server infrastructure, no external dependencies, and no specialized software — making it immediately accessible to any department regardless of technical capacity."));

  c.push(h2("Proprietary Components"));
  c.push(p("The following components constitute the original, proprietary work of the creator:"));
  c.push(li("12-module law enforcement training curriculum covering Search & Seizure, Use of Force, Report Writing, Crisis Intervention, Domestic Violence Response, Motor Vehicle Pursuits, Leadership & Supervision, Traffic Stops & Vehicle Contacts, Emotional Intelligence, Evidence & Chain of Custody, Officer Wellness, and De-escalation"));
  c.push(li("Branching scenario engine with officer decision points, consequence modeling, and legal debrief sequences"));
  c.push(li("Module-level quiz system with automated scoring and completion tracking"));
  c.push(li("Badge number-authenticated officer login system with role-based access (officer and administrator)"));
  c.push(li("Administrative compliance dashboard displaying per-officer module completion, quiz scores, and training status"));
  c.push(li("Badge-inspired visual design system derived from department insignia, including color palette, layout architecture, and UI component library"));
  c.push(li("Integration of jurisdiction-specific general orders, Pennsylvania criminal procedure rules, and case law (Graham v. Connor, Terry v. Ohio, and others) into training content"));

  c.push(h2("Intended Market & Application"));
  c.push(labelValue("Primary Market", "Municipal and county law enforcement agencies"));
  c.push(labelValue("Secondary Market", "Public safety consulting firms, accreditation bodies, regional training consortiums"));
  c.push(labelValue("Delivery Model", "Standalone browser-based deployment; potential for hosted SaaS or licensed white-label distribution"));
  c.push(labelValue("Competitive Gap", "Existing platforms (Lexipol, Vector Solutions) require expensive subscriptions and IT infrastructure. Arbiter LE is designed to be immediately deployable at low cost to under-resourced departments."));

  c.push(h2("Ownership Declaration"));
  c.push(p("I, Andrew Curtis, hereby declare that I am the sole original author and creator of the Arbiter LE training platform, including all curriculum content, software architecture, scenario design, user interface, and associated documentation as described in this record. This platform was conceived, developed, and documented beginning on May 20, 2026."));
  c.push(p("This document is intended to establish a timestamped record of intellectual property ownership and prior authorship. All commercial rights, licensing rights, and derivative rights are retained by the creator. No portion of this platform has been transferred, assigned, or licensed to any third party as of the date of this document."));

  // Signature block (navy/gold, matches family)
  c.push(new Paragraph({ spacing: { before: 200, after: 80 }, children: [run("Signature", { size: 18, color: STEEL })] }));
  c.push(new Paragraph({ spacing: { before: 0, after: 40 }, children: [run("___________________________________", { size: 20 })] }));
  c.push(new Paragraph({ spacing: { before: 0, after: 120 }, children: [run("Andrew Curtis", { size: 20, bold: true })] }));
  c.push(new Paragraph({ spacing: { before: 0, after: 40 }, children: [run("Date", { size: 18, color: STEEL })] }));
  c.push(new Paragraph({ spacing: { before: 0, after: 120 }, children: [run("May 20, 2026", { size: 20 })] }));

  c.push(h2("Notarization (Optional — Recommended for Commercial Use)"));
  c.push(p("Sworn to and subscribed before me this _______ day of _____________, 2026."));
  c.push(new Paragraph({ spacing: { before: 120, after: 40 }, children: [run("___________________________________", { size: 20 })] }));
  c.push(new Paragraph({ spacing: { before: 0, after: 0 }, children: [run("Notary Public Signature & Seal", { size: 18, color: STEEL })] }));

  c.push(new Paragraph({ spacing: { before: 280, after: 0 }, border: { top: { style: BorderStyle.SINGLE, size: 6, color: GOLD, space: 6 } },
    children: [run("Retention note: this document should be emailed to yourself, uploaded to cloud storage, and retained in your personal records as timestamped proof of authorship.", { size: 16, italics: true, color: STEEL })] }));

  return buildDoc("IP Documentation", c);
}

// ---- run --------------------------------------------------------------------
(async () => {
  await save(userAgreement(), "agreements/2026-06-22-arbiter-le-user-agreement.docx");
  await save(platformDisclaimer(), "policies/2026-06-22-arbiter-le-platform-use-disclaimer.docx");
  await save(ipDocumentation(), "corporate/2026-05-20-arbiter-le-ip-documentation.docx");
})();
