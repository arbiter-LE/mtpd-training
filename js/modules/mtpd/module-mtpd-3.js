/* ═══════════════════════════════════════════
   MTPD — Module 3: Professional Report Writing

   Reading extracted byte-for-byte from the former app.js hardcoded
   branch. Supervisor variants anchored to MTPD Orders 1.3 (UoF report
   separation), 4.13 (DV narrative checklist), 3.05/3.06 (Property
   Record Form), and 3.04 (report submission). Never borrow EGPD.
═══════════════════════════════════════════ */

const READING_REPORT_WRITING = `
      <div class="content-block">
        <h4>Scenario</h4>
        <h2>You\'ve made the arrest. The foot pursuit is over. The subject is on his way to Montgomery County lockup. Now comes the part that determines whether the case holds — or falls apart in a preliminary hearing six weeks from now.</h2>
        <p>This module covers the professional and legal standards for police report writing: when to write, what to include, and the specific difference between documentation that builds cases and documentation that destroys them.</p>
      </div>
      <div class="content-block">
        <h4>Core Principle</h4>
        <h2>The Report Is the Evidence</h2>
        <p>Police reports are sworn accounts of an officer\'s personal observations. They are the primary evidentiary document in a criminal case. They are reviewed by prosecutors, dissected by defense counsel, compared frame-by-frame against body camera footage, and read aloud in front of judges and juries.</p>
        <p>A report that is vague, conclusory, or inconsistent with available evidence does not just weaken a case — it undermines the officer\'s credibility on everything else they\'ve ever documented.</p>
        <div class="case-law-box">
          <div class="case-title">The Documentation Standard</div>
          <p>Pennsylvania courts require that use of force and probable cause documentation contain specific, articulable facts — not legal conclusions. "Resisted arrest" is a conclusion. "Subject tensed both arms, pulled away from my grip, and rotated his body toward me" is a fact. Facts survive cross-examination. Conclusions do not.</p>
        </div>
        <div class="case-law-box">
          <div class="case-title">Contemporaneous Documentation</div>
          <p>Reports should be written as close to the incident as safely possible. Memory degrades rapidly under stress — specific details, sequences, and exact words fade within hours. When body camera footage is available, review it before writing. Your report should match the footage exactly because it should be based on the same sequence of events.</p>
        </div>
        <div class="sop-box">
          <div class="sop-title">MTPD Order 1.3 — Use of Force Report Is a Separate Document</div>
          <p>The Use of Force Report (Attachment A, ALO 1.3) is an internal management document. It <strong>shall not be attached to your regular incident or supplemental report</strong> — ever. It shall not be released outside the department without the Chief of Police\'s specific authorization. It must be completed <strong>before you end your shift.</strong></p>
          <p>This separation matters: your incident report documents what happened for the case file. Your Use of Force Report documents your force decision for internal review. Confusing the two — or attaching them — creates evidentiary problems and policy violations.</p>
        </div>
      </div>
      <div class="content-block">
        <h4>What Every Use of Force Report Must Include</h4>
        <ul class="key-points">
          <li><strong>The subject\'s specific action</strong> — What did they do, physically? Which body part moved, in which direction, with what speed or force?</li>
          <li><strong>The officer\'s specific response</strong> — What force was applied? In what sequence? To what body part?</li>
          <li><strong>The outcome</strong> — Did the subject comply? Was injury assessed? Was medical attention provided?</li>
          <li><strong>The timeline</strong> — When did each action occur in the sequence? Timestamps matter when footage is reviewed.</li>
          <li><strong>The Graham factors</strong> — Severity of crime, immediacy of threat, active resistance. All three must appear explicitly.</li>
        </ul>
      </div>
      <div class="content-block">
        <h4>Factual vs. Conclusory Language</h4>
        <h2>The difference between winning and losing a suppression hearing is often one paragraph.</h2>
        <p>Defense attorneys are trained to find the gap between what your report says and what actually happened. Vague language creates gaps. Specific language closes them.</p>
        <p><strong>Conclusory (fails):</strong> "Subject resisted arrest and force was necessary."<br>
        <strong>Factual (holds up):</strong> "As I attempted to apply handcuffs, subject tensed both arms, pulled away from my grip, and rotated his upper body toward me. I applied a forward leg sweep, bringing subject to a controlled ground position. Subject ceased active resistance upon impact. Handcuffs applied."</p>
        <p>Every word in the second version answers a question a defense attorney would ask. That\'s the standard.</p>
        <div class="sop-box">
          <div class="sop-title">MTPD Order 4.13 — Domestic Violence Narrative Checklist</div>
          <p>Every DV incident report narrative shall include, when applicable and available: (1) victim\'s second permanent address and close personal friend\'s contact; (2) relationship between victim and accused; (3) date/time of incident and whether accused appeared intoxicated; (4) what weapons were used or threatened; (5) description of injuries observed by officer; (6) description of injuries reported by victim but not observed — noted as not observed; (7) documentation of evidence tending to establish a crime was committed; (8) whether arrest was made or reason for electing not to arrest; (9) crimes charged; (10) if arrested and arraigned — bail set and any bail conditions; (11) names and ages of any children present and their relocation addresses; (12) notation of previous incidents known to officer or reported by victim.</p>
          <p>If probable cause existed but officer elected not to arrest: the narrative must contain a <strong>detailed explanation</strong> of the reasons. "Did not arrest" is not documentation.</p>
        </div>
        <div class="sop-box">
          <div class="sop-title">MTPD Order 3.05/3.06 — Evidence Documentation</div>
          <p>Every time evidence or property is received, a <strong>Property Record Form</strong> must be completed before end of shift. The form documents chain of custody at every transaction — who had it, when, why it moved, and where. All physical evidence is packaged in paper, sealed with evidence tape, and initialed with date across the tape seal. Packaging is labeled with the RMS incident number, item number, and any hazard warnings. Evidence stored in temporary lockers until property room is accessible.</p>
        </div>
        <div class="sop-box">
          <div class="sop-title">MTPD Order 3.04 — Report Submission</div>
          <p>All reports shall be completed <strong>prior to end of tour of duty</strong> and submitted to the shift bin for supervisory approval, unless otherwise authorized by the shift supervisor. This applies to incident reports, arrest reports, use of force reports, and supplemental reports. Reports not submitted before end of shift require supervisor authorization — not officer discretion.</p>
        </div>
        <button class="btn-launch" onclick="startScenario('report-writing')">Proceed to Scenario Exercise →</button>
      </div>
    `;

/* ══════════════════════════════════════════
   SUPERVISOR OVERLAY — Report Writing (MTPD)
══════════════════════════════════════════ */
const SUPERVISOR_REPORT_WRITING = `
  <div class="content-block">
    <h4>Supervisor Focus</h4>
    <h2>Under Order 3.04, reports come to the shift bin for your approval. You are the standard the report must clear before it becomes evidence.</h2>
    <p>Report review is where most of a supervisor's quality control actually happens. A report you approve is a report you are vouching for — to the District Attorney, to a suppression court, and to a civil jury. Your job is to read every report against the standard the officers just learned: specific, articulable facts instead of conclusions, the required checklists complete, and the department's handling and timing rules met before the report leaves the bin.</p>
  </div>
  <div class="content-block">
    <h4>Conclusory vs. Factual — The Core Catch</h4>
    <h2>"Resisted arrest" tells you what to conclude. It does not tell you what happened.</h2>
    <p>The single most common report defect is conclusory language: "subject resisted," "force was necessary," "appeared nervous," "became combative." These are conclusions, not facts, and defense counsel lives in the gap between them and the footage. When you find one, return the report for body-movement-level specificity: which body part moved, in which direction, what the officer did in response, and what resulted. A report that reads "subject tensed both arms, pulled away, and rotated toward me; I applied a forward leg sweep" survives cross-examination. "Subject resisted" does not. Hold every officer to that standard before you sign.</p>
  </div>
  <div class="content-block">
    <h4>Reviewing a DV Report Against the Order 4.13 Checklist</h4>
    <ul class="key-points">
      <li><strong>Run the 12 items</strong> — Order 4.13 sets a specific DV narrative checklist. On review, confirm the applicable items are addressed: relationship, weapons, injuries observed, injuries reported but not observed (noted as not observed), evidence of the crime, children present and their relocation, prior incidents, and the rest.</li>
      <li><strong>The "elected not to arrest" trap</strong> — If probable cause existed and the officer did not arrest, Order 4.13 requires a detailed explanation of the specific reasons in the narrative. "No arrest made" is not documentation — return it. This is the entry most likely to be scrutinized later.</li>
      <li><strong>Injuries reported but not observed</strong> — Confirm the report distinguishes injuries the officer observed from those the victim reported but the officer did not observe, clearly noted as not observed. This protects the officer from a later claim of concealment and accurately bounds their personal observations.</li>
    </ul>
  </div>
  <div class="content-block">
    <h4>The Handling and Timing Rules You Enforce at the Bin</h4>
    <ul class="key-points">
      <li><strong>Order 3.04 — submission timing</strong> — Reports are completed before end of tour and submitted to the shift bin for supervisory approval. A report held past end of shift requires your authorization — it is not the officer's discretion. Do not let "I'll finish it tomorrow" become the norm.</li>
      <li><strong>Order 1.3 — UoF report separation</strong> — The Use of Force Report is internal and shall not be attached to the incident or supplemental report. If you find them attached at the bin, separate them before anything moves toward the case file.</li>
      <li><strong>Order 3.05/3.06 — Property Record Form</strong> — If the incident generated evidence, confirm a Property Record Form was completed before end of shift and the chain is documented. A narrative that mentions seized property with no corresponding Property Record Form is an incomplete submission.</li>
    </ul>
  </div>
  <div class="content-block">
    <h4>From Catch to Correction</h4>
    <p>Returning a report for specifics is not nitpicking — it is the cheapest point at which a case-killing gap gets fixed. One conclusory report is a coaching moment; an officer who repeatedly submits conclusion-driven narratives or incomplete DV checklists after coaching is a training issue you document and escalate. The habit you build at the bin is the habit that holds up in the courtroom. Every report you approve carries your name.</p>
  </div>
`;

function getReportWritingSupervisorQuestions() {
  return [
    {
      scenario: 'A use of force narrative in an arrest report submitted to the bin reads: "Subject resisted arrest. Force was applied and was proportionate to the resistance encountered. Subject was taken into custody."',
      text: 'What is the correct supervisory action before approving it?',
      options: [
        'Approve it — it states that the force was proportionate, which is the legal standard.',
        'Return it for body-movement-level specificity — which body part moved and in which direction, the officer\'s specific response, and the outcome — because "resisted" and "proportionate" are conclusions, not the articulable facts the documentation standard requires.',
        'Rewrite it yourself so the case is not delayed.',
        'Approve it but note that the officer should be more detailed in the future.'
      ],
      correct: 1,
      feedback: 'Correct. "Resisted arrest" and "proportionate" are legal conclusions. The standard requires specific, sequential facts a reader can reconstruct. Return it for the body-movement-level account before it becomes the evidentiary record.'
    },
    {
      scenario: 'A DV incident report shows the officer had probable cause for Simple Assault but did not arrest. The narrative on the no-arrest decision reads, in full: "Parties separated for the evening. No arrest made."',
      text: 'How do you handle this under MTPD Order 4.13?',
      options: [
        'Approve it — noting that no arrest was made is sufficient.',
        'Return it — Order 4.13 requires a detailed explanation of the specific reasons when probable cause existed but the officer elected not to arrest; "No arrest made" is not documentation.',
        'Order the officer to make the arrest now regardless of the circumstances.',
        'Approve it but add your own note explaining the likely reason.'
      ],
      correct: 1,
      feedback: 'Correct. MTPD Order 4.13 requires a detailed explanation of the specific reasons in the narrative whenever probable cause existed but the officer elected not to arrest. A bare "No arrest made" fails the standard and must be returned for the explanation.'
    },
    {
      scenario: 'Reviewing a DV report, you see the officer documented a visible bruise the victim attributes to being struck. The victim also told the officer her ribs were sore and she believed one might be cracked, but the officer could not observe that injury. The report lists only the bruise.',
      text: 'What does Order 4.13 require regarding the rib injury?',
      options: [
        'Leave it out — only injuries the officer directly observed belong in the report.',
        'Return it to add the reported-but-unobserved injury, clearly noted as reported by the victim and not observed by the officer, because Order 4.13\'s checklist requires both observed injuries and injuries reported but not observed.',
        'Have the victim sign a separate injury statement instead of documenting it in the narrative.',
        'Approve it — the bruise is enough to support the charge.'
      ],
      correct: 1,
      feedback: 'Correct. The Order 4.13 narrative checklist requires both injuries observed by the officer and injuries reported by the victim but not observed — noted clearly as not observed. Capturing both protects the officer from a concealment claim and accurately bounds their observations.'
    },
    {
      scenario: 'At end of tour, an officer submits a strong incident report. Stapled to the back as the final page is the Use of Force Report from the same arrest, and the packet is in the bin ready for you to approve and forward.',
      text: 'What is the supervisory action?',
      options: [
        'Approve the packet as a complete, well-organized record.',
        'Separate the Use of Force Report from the incident report before approving — Order 1.3 keeps the Use of Force Report as an internal management document that shall not be attached to the incident or supplemental report.',
        'Forward the entire packet, including the Use of Force Report, to the District Attorney.',
        'Reject the whole submission and make the officer start over.'
      ],
      correct: 1,
      feedback: 'Correct. MTPD Order 1.3 requires the Use of Force Report to stay separate from the incident/supplemental report and bars release outside the department without the Chief\'s authorization. Separate the documents at the bin; do not forward the force report with the case file.'
    },
    {
      scenario: 'An officer\'s arrest report narrative references "the knife recovered from the subject and secured as evidence," but there is no Property Record Form in the submission and the officer says he will "log it into evidence tomorrow."',
      text: 'How do you handle this under MTPD Order 3.05/3.06 and 3.04?',
      options: [
        'Approve the report — the Property Record Form can follow whenever the officer gets to it.',
        'Treat the submission as incomplete — Order 3.05/3.06 requires a Property Record Form completed before end of shift whenever evidence is received, and Order 3.04 requires reports completed before end of tour; require the form and chain documentation before approval.',
        'Approve it and create the Property Record Form yourself.',
        'Disregard the knife since it is mentioned only in passing.'
      ],
      correct: 1,
      feedback: 'Correct. MTPD Order 3.05/3.06 requires a Property Record Form completed before end of shift each time evidence is received, and Order 3.04 requires reports completed before end of tour. A narrative referencing seized evidence with no Property Record Form is an incomplete submission to be corrected before approval.'
    },
    {
      scenario: 'It is the end of shift. An officer with a completed arrest still pending tells you he is exhausted and wants to submit the report at the start of his next tour rather than tonight.',
      text: 'What does MTPD Order 3.04 require?',
      options: [
        'The officer may submit whenever convenient — report timing is at the officer\'s discretion.',
        'Reports are completed before end of tour and submitted to the shift bin; holding a report past end of shift requires your authorization as supervisor — it is not the officer\'s discretion — so you make the timing decision, not the officer.',
        'You must complete the report for the officer before he leaves.',
        'The report can be skipped entirely if the officer is too tired.'
      ],
      correct: 1,
      feedback: 'Correct. MTPD Order 3.04 requires reports completed before end of tour and submitted to the shift bin for supervisory approval, unless otherwise authorized by the shift supervisor. Carrying a report to the next tour requires the supervisor\'s authorization — the timing decision belongs to you, not the officer.'
    },
    {
      scenario: 'An officer\'s report states the subject "seemed nervous and was acting suspicious" as part of the basis for a vehicle search. Defense counsel will challenge this as conclusory.',
      text: 'What do you direct on review?',
      options: [
        'Nothing — "nervous" and "suspicious" are acceptable shorthand officers commonly use.',
        'Return it for the specific observable behaviors behind the assessment — trembling hands, elevated voice, repeated mirror checks, avoidance of eye contact — because conclusory descriptors will be challenged while specific facts speak for themselves.',
        'Replace "nervous" with "agitated" — a more precise legal term.',
        'Tell the officer to remove the observation entirely.'
      ],
      correct: 1,
      feedback: 'Correct. "Nervous" and "suspicious" are conclusions a court and defense counsel will challenge. The standard is to document the specific, observable behaviors that led to the assessment so the facts stand on their own — the same factual-not-conclusory standard the module teaches.'
    },
    {
      scenario: 'Over several weeks, the same officer repeatedly submits arrest reports with conclusory use-of-force language and DV narratives missing required checklist items. You have returned and coached on these before.',
      text: 'What is the appropriate supervisory response now?',
      options: [
        'Keep returning each report individually without any broader action.',
        'Move to documented corrective action and targeted training on the documentation standard and the Order 4.13 checklist, because a repeated pattern after coaching is a supervisory and training issue, and escalate as the pattern warrants.',
        'Stop reviewing that officer\'s reports as closely, since correcting them takes too long.',
        'Approve the reports to avoid delaying cases and address the writing only at the annual review.'
      ],
      correct: 1,
      feedback: 'Correct. One weak report is a coaching moment; a documented pattern after coaching is a supervisory and training issue requiring documented corrective action and escalation. Lowering the review standard or approving deficient reports to save time defeats the purpose of supervisory review.'
    },
  ];
}

/* ══════════════════════════════════════════
   SUPERVISOR SCENARIO — Report Writing (MTPD)
   You review Officer Vance's arrest packet at the bin. Fictional officer.
══════════════════════════════════════════ */
const SCENARIO_REPORT_WRITING_SUP = {
  id: 'scenario-report-writing-sup',
  title: 'Supervisor Review — End-of-Tour Report Bin',
  location: 'Report Review Desk, Marlborough Township, PA',
  totalDecisions: 3,
  nodes: {
    'start': {
      type: 'scene',
      time: '06:30',
      weather: 'End of Shift',
      unit: 'Shift Supervisor',
      narrative: [
        'End of tour. Officer Vance\'s arrest packet from a foot-pursuit arrest off Route 113 is in the shift bin for your approval — Order 3.04 routes it through you before it goes anywhere.',
        'The arrest involved a use of force, a DV component, and a recovered weapon. Your approval is what moves it toward the case file.'
      ],
      next: 'd1'
    },
    'd1': {
      type: 'decision',
      decisionNumber: 1,
      situation: 'The use-of-force portion of the narrative reads: "Subject resisted arrest. Force was used and was proportionate. Subject was taken into custody." There is nothing about what the subject did or what Vance did in response.',
      question: 'How do you handle it?',
      options: [
        { text: 'Approve it — it says the force was proportionate, which is the standard.', next: 'c1a', quality: 'bad', shortLabel: 'Approved conclusory force language' },
        { text: 'Return it for body-movement-level facts — what the subject did, the officer\'s specific response, and the outcome — before it becomes evidence.', next: 'c1b', quality: 'good', shortLabel: 'Returned for factual specificity' },
        { text: 'Rewrite the narrative yourself so the case is not delayed.', next: 'c1c', quality: 'bad', shortLabel: 'Authored the officer\'s narrative' },
        { text: 'Approve it now and tell Vance to write better reports going forward.', next: 'c1d', quality: 'risky', shortLabel: 'Approved with a verbal note' },
      ]
    },
    'c1a': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'You Approved the Gap',
      heading: '"Resisted" and "proportionate" are exactly what the defense wants in the record.',
      narrative: [
        'Six weeks later at the preliminary hearing, defense counsel reads the narrative aloud and asks Vance to describe what the subject actually did. The report gives him nothing to anchor to, and the credibility hit spreads to the rest of his testimony.',
        'You had the chance to fix it at the bin for free. Approving conclusions is approving the gap.'
      ],
      legal: 'Documentation standard: Pennsylvania courts require specific, articulable facts, not legal conclusions. "Resisted arrest" is a conclusion; facts survive cross-examination.',
      next: 'd2'
    },
    'c1b': {
      type: 'consequence', outcomeClass: 'outcome-good', outcomeLabel: 'Returned for the Facts',
      heading: 'You held the report to the standard before it left the bin.',
      narrative: [
        'You return it with specific direction: which body part moved and how, what Vance did in response, and the result. Vance rewrites it to read "subject tensed both arms, pulled away, and rotated toward me; I applied a forward leg sweep to a controlled ground position; resistance ceased."',
        'Now the report answers the questions a defense attorney will ask — before the attorney asks them.'
      ],
      legal: 'Documentation standard: specific, articulable, sequential facts a reader can reconstruct — not conclusions.',
      next: 'd2'
    },
    'c1c': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Not Yours to Write',
      heading: 'Authoring the officer\'s sworn account for him creates a credibility problem.',
      narrative: [
        'The report is Vance\'s sworn account of his own observations. Writing it for him — even accurately — substitutes your words for his and trains him to rely on you instead of articulating his own actions. On the stand, the mismatch shows.',
        'Return it with direction and let Vance write his own facts.'
      ],
      legal: 'Police reports are sworn accounts of the reporting officer\'s personal observations; the supervisor directs correction, not authorship.',
      next: 'd2'
    },
    'c1d': {
      type: 'consequence', outcomeClass: 'outcome-neutral', outcomeLabel: 'The Report Still Goes Out Weak',
      heading: 'A verbal note doesn\'t fix the report you just approved.',
      narrative: [
        'Approving the conclusory narrative and asking for better future reports leaves this case file with the gap intact. The coaching may help next time; it does nothing for the hearing on this arrest.',
        'The fix is to return this report now, then coach.'
      ],
      legal: 'Documentation standard: conclusory language is corrected before the report becomes the evidentiary record.',
      next: 'd2'
    },
    'd2': {
      type: 'decision',
      decisionNumber: 2,
      situation: 'The DV portion shows Vance had probable cause for Simple Assault but did not arrest. The only entry on that decision reads: "Parties calm on arrival. No arrest made." The checklist items on prior incidents and children present are also blank, and a child was noted elsewhere as being home.',
      question: 'How do you handle the DV documentation under Order 4.13?',
      options: [
        { text: 'Approve it — the officer noted that no arrest was made and that the parties were calm.', next: 'c2a', quality: 'bad', shortLabel: 'Accepted "no arrest made"' },
        { text: 'Return it — Order 4.13 requires a detailed explanation of the specific reasons for not arresting when PC existed, plus the applicable checklist items including children present and prior incidents.', next: 'c2b', quality: 'good', shortLabel: 'Required the 4.13 explanation + checklist' },
        { text: 'Approve it and open a separate use-of-force review instead.', next: 'c2c', quality: 'risky', shortLabel: 'Misrouted the issue' },
        { text: 'Order Vance to go back and arrest the subject now.', next: 'c2d', quality: 'bad', shortLabel: 'Directed a retroactive arrest' },
      ]
    },
    'c2a': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: '"No Arrest Made" Is Not Documentation',
      heading: 'Order 4.13 requires the reasons, and the checklist requires the child.',
      narrative: [
        'If this address generates another DV call, the record shows a non-arrest with no documented reasoning and a missing child entry. That gap is exactly what Order 4.13\'s detailed-explanation and checklist requirements exist to prevent.',
        'Approving it leaves the department exposed and the next officer blind.'
      ],
      legal: 'MTPD Order 4.13: a detailed explanation of the specific reasons is required when PC existed but no arrest was made; the narrative checklist requires children present and prior incidents.',
      next: 'd3'
    },
    'c2b': {
      type: 'consequence', outcomeClass: 'outcome-good', outcomeLabel: 'Held to the 4.13 Standard',
      heading: 'You required the explanation and the checklist before approval.',
      narrative: [
        'You return it for the specific reasons the arrest was declined and for the applicable checklist items — children present and their relocation, prior incidents known or reported. Vance completes them, and the record now stands on its own for the next officer and any later proceeding.',
        'The detailed non-arrest explanation is the entry most likely to be scrutinized later; you made sure it exists.'
      ],
      legal: 'MTPD Order 4.13: detailed explanation for a no-arrest decision where PC existed, plus the 12-item narrative checklist applied as applicable.',
      next: 'd3'
    },
    'c2c': {
      type: 'consequence', outcomeClass: 'outcome-neutral', outcomeLabel: 'Right Problem, Wrong Process',
      heading: 'This is a documentation gap under 4.13, not a use-of-force review.',
      narrative: [
        'Opening a use-of-force review does not address the missing non-arrest explanation or the blank checklist items, and approving the report leaves those gaps in the file. The correct step is to return the report for the Order 4.13 requirements.',
        'Route it as what it is: a DV documentation deficiency.'
      ],
      legal: 'MTPD Order 4.13: the narrative must carry the non-arrest explanation and the applicable checklist items.',
      next: 'd3'
    },
    'c2d': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Documentation, Not a Retroactive Arrest',
      heading: 'The issue is the missing explanation, not an order to arrest now.',
      narrative: [
        'Directing an after-the-fact arrest based on a documentation gap confuses the problem. The officer\'s non-arrest decision may have been sound — what is missing is the Order 4.13 explanation and checklist. Demand the documentation, not a retroactive arrest divorced from the original circumstances.',
        'Return it for the reasons and the checklist.'
      ],
      legal: 'MTPD Order 4.13: the requirement is a documented detailed explanation of the non-arrest decision, not a retroactive arrest.',
      next: 'd3'
    },
    'd3': {
      type: 'decision',
      decisionNumber: 3,
      situation: 'The narrative references "the folding knife recovered from the subject\'s waistband and secured as evidence." There is no Property Record Form in the packet, and it is now past end of tour. Vance says he will "log it into evidence at the start of his next shift."',
      question: 'How do you handle the evidence and timing before approving?',
      options: [
        { text: 'Approve the report now and let the Property Record Form follow next shift.', next: 'c3a', quality: 'bad', shortLabel: 'Approved with no Property Record Form' },
        { text: 'Treat it as an incomplete submission — Order 3.05/3.06 requires a Property Record Form before end of shift when evidence is received, and Order 3.04 requires reports completed before end of tour; require the form and chain documentation before approval.', next: 'c3b', quality: 'good', shortLabel: 'Required Property Record Form before approval' },
        { text: 'Approve it and complete the Property Record Form yourself.', next: 'c3c', quality: 'risky', shortLabel: 'Did the officer\'s evidence paperwork' },
        { text: 'Tell Vance to leave the knife in his patrol bag until next shift.', next: 'c3d', quality: 'bad', shortLabel: 'Left evidence improperly stored' },
      ]
    },
    'c3a': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'A Chain Gap, Approved',
      heading: 'Evidence referenced with no Property Record Form is an open chain-of-custody gap.',
      narrative: [
        'Letting the form wait until next shift creates exactly the unaccounted-for interval defense counsel argues as tampering or contamination. Order 3.05/3.06 requires the Property Record Form before end of shift, and Order 3.04 requires the report complete before end of tour.',
        'Approving it now puts your name on an incomplete submission with a custody gap baked in.'
      ],
      legal: 'MTPD Order 3.05/3.06: Property Record Form completed before end of shift whenever evidence is received. MTPD Order 3.04: reports completed before end of tour.',
      next: 'debrief'
    },
    'c3b': {
      type: 'consequence', outcomeClass: 'outcome-good', outcomeLabel: 'Complete Before Approval',
      heading: 'You required the Property Record Form and chain documentation before signing.',
      narrative: [
        'You hold the approval until Vance completes the Property Record Form, packages and seals the knife per policy, and secures it in a temporary locker with the transfer documented. The submission is now complete and the chain is intact from the moment of seizure.',
        'Closing the gap at the bin is far cheaper than explaining it at a suppression hearing.'
      ],
      legal: 'MTPD Order 3.05/3.06: Property Record Form before end of shift; package, seal, and document chain at every transaction. MTPD Order 3.04: reports completed before end of tour.',
      next: 'debrief'
    },
    'c3c': {
      type: 'consequence', outcomeClass: 'outcome-neutral', outcomeLabel: 'Not Your Form to Complete',
      heading: 'The collecting officer documents the chain — doing it for him breaks the record you\'re trying to protect.',
      narrative: [
        'A Property Record Form completed by a supervisor who did not collect or handle the knife misstates the chain of custody from the start. The officer who recovered and secured the evidence is the one who must document it.',
        'Require Vance to complete the form before you approve.'
      ],
      legal: 'MTPD Order 3.05/3.06: the chain is documented by those who handled the evidence; the form is the chain.',
      next: 'debrief'
    },
    'c3d': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Evidence Doesn\'t Live in a Patrol Bag',
      heading: 'Leaving the knife in personal gear overnight is the chain break, made worse.',
      narrative: [
        'Storing evidence in a patrol bag until next shift is precisely the unauthorized-storage gap that destroys admissibility. Order 3.05/3.06 requires packaging, sealing, and securing in a temporary locker with the transfer documented — not personal gear.',
        'Require proper packaging and locker storage tonight, with the Property Record Form completed.'
      ],
      legal: 'MTPD Order 3.05/3.06: physical evidence is packaged, sealed, and stored in temporary lockers until the property room is accessible; the Property Record Form is completed before end of shift.',
      next: 'debrief'
    },
    'debrief': { type: 'debrief' },
  }
};
