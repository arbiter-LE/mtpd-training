/* ══════════════════════════════════════════
   READING — Report Writing (EGPD)
══════════════════════════════════════════ */
const DEBRIEF_REPORT_WRITING = `
  <h3>Key Legal Principles — Report Writing</h3>
  <p><strong>Write soon, from verified sources, in your own voice.</strong> Reports should be written as soon as safely possible while observations are accurate, and reviewed against body camera footage and field notes before writing. A police report is a sworn account of the officer's <em>personal</em> observations — you document what you witnessed, not what a partner did out of your view.</p>
  <p><strong>Facts, not conclusions.</strong> "Resisted arrest," "became combative," "based on training and experience" tell a reader what to conclude without the facts to evaluate it — they do not survive cross-examination. The standard is specific, sequential, body-movement-level documentation a judge can use to reconstruct the encounter.</p>
  <p><strong>Probable cause rests on articulable facts — Illinois v. Gates (1983).</strong> Probable cause is evaluated on the totality of the circumstances and must be supported by specific articulable facts, not conclusory statements. "Training and experience" is valid only when tethered to the specific facts you observed for the specific offense charged.</p>
  <p><strong>The use-of-force narrative — EGPD General Order 1.3.</strong> Officers must articulate the need and justification for the force and why that level was selected, thoroughly documented. Every narrative should capture the subject's specific action, the specific force applied, the sequence and timeline, and what followed — compliance, injury, medical response.</p>
  <p><strong>Report integrity is non-negotiable.</strong> What appears in quotation marks must be what was actually said. Reconstructing a quote, or silently inserting facts into a finished report, is a false official statement under 18 Pa. C.S. § 4904 (unsworn falsification) and § 4906 (false reports). Use a documented supplement instead; distinguish direct quotes, paraphrase, and observation.</p>
  <p><strong>Document the stop that ends without an arrest.</strong> A decision not to arrest or search can be legally sound; failing to record what you observed is not. Undocumented observations cannot support future probable cause, cannot corroborate another investigation, and are lost if you are called to testify.</p>
`;

const READING_REPORT_WRITING = `
  <div class="content-block">
    <h4>Scenario</h4>
    <h2>A foot pursuit at Main St &amp; 4th St ends in a takedown and an arrest. Now you have to write the report. The DA's office will read it. So will defense counsel — line by line, against your body camera footage.</h2>
    <p>This module covers what separates a report that builds a case from a report that loses one: contemporaneous documentation, facts over conclusions, and absolute integrity in what appears on the page.</p>
  </div>
  <div class="content-block">
    <h4>Core Principle</h4>
    <h2>Write soon, write from verified sources, write your own observations.</h2>
    <ul class="key-points">
      <li><strong>Contemporaneous documentation.</strong> Reports should be written as soon as safely possible after an incident, while observations are most accurate. Memory degrades within hours — a report written at 2:15 AM from recollection alone will be missing distances, exact commands, and timeline. The goal is a record that reflects your knowledge at the time of the event, not your reconstructed memory.</li>
      <li><strong>Review your sources first.</strong> When body camera footage and field notes exist, review them before writing. A report that says the subject "immediately fled" when the footage shows a 4-second pause hands defense counsel a credibility attack — even when you were being honest. Precision grounded in verified facts is the defense.</li>
      <li><strong>Your report, your observations.</strong> A police report is a sworn account of the officer's personal observations. A partner who arrived during the takedown can document what they personally witnessed from arrival forward — they cannot document your pursuit, your contact, or your use of force. A narrative written by an officer who was not present for the events is hearsay and creates problems no writing skill can fix.</li>
    </ul>
  </div>
  <div class="content-block">
    <h4>Facts vs. Conclusions</h4>
    <h2>"Resisted arrest" is a conclusion. Courts need the facts underneath it.</h2>
    <p>Legal conclusions — "resisted arrest," "became combative," "force was proportionate," "based on my training and experience, I believed the subject was involved in criminal activity" — tell a reader what to conclude without giving them the facts to evaluate the conclusion. They do not survive cross-examination.</p>
    <p>The defensible standard is specific, sequential, body-movement-level documentation: <em>"As I attempted to apply handcuffs, subject tensed both arms, pulled away, and rotated his body toward me. I applied a forward leg sweep, bringing subject to a controlled ground position. Subject ceased active resistance. Handcuffs applied."</em> A judge reading that can reconstruct the encounter. The same rule applies to observations: not "seemed nervous," but "hands visibly trembling, voice elevated in pitch, avoided eye contact, checked mirrors repeatedly."</p>
    <div class="case-law-box">
      <div class="case-title">Illinois v. Gates, 462 U.S. 213 (1983)</div>
      <p>Probable cause is evaluated under the totality of the circumstances — and it must be supported by specific articulable facts, not conclusory statements. "Training and experience" references are valid only when tethered to stated facts: what you observed, heard, and detected, and how those specific facts established probable cause for the specific offense charged.</p>
    </div>
    <div class="sop-box">
      <div class="sop-title">EGPD General Order 1.3 — The Use of Force Narrative Standard</div>
      <p>"Officers using force must be able to articulate the need and justification for the use of force and the reason(s) why the level of force utilized was selected. Full disclosure of the circumstances requiring the use of force, and the type and extent of force, shall be thoroughly documented." Every use of force narrative should capture: the subject's specific action that prompted the response, the specific force applied, the sequence and timeline, and what happened after — compliance, injury, medical response.</p>
    </div>
  </div>
  <div class="content-block">
    <h4>Report Integrity</h4>
    <h2>What appears in quotation marks must be what was actually said.</h2>
    <p>A police report is a legal document. Reconstructing a quote you did not capture — even when the "spirit" is accurate — is a false official statement. Under 18 Pa. C.S. § 4904 (unsworn falsification to authorities) and § 4906 (false reports), fabricated content creates criminal exposure, and a single discovered reconstruction destroys your credibility as a witness in every future case.</p>
    <ul class="key-points">
      <li><strong>Gap in your notes?</strong> Follow up with the witness or victim, document the follow-up contact (date, time, method), and distinguish clearly between direct quotes, paraphrased summaries, and your own observations.</li>
      <li><strong>Forgot something after filing?</strong> Document it now as a supplement, noting that it was captured from memory rather than contemporaneous notes. Omitting known facts weakens the case; silently inserting them into a finished report is misconduct. Transparency preserves both the information and your integrity.</li>
      <li><strong>Writing around a gap doesn't work either.</strong> "Victim provided a statement consistent with the injuries observed" is conclusory — it avoids fabrication but may fail to establish probable cause. Get the detail and document it properly.</li>
    </ul>
  </div>
  <div class="content-block">
    <h4>Stops That End Without an Arrest</h4>
    <h2>Field intelligence that isn't recorded doesn't exist.</h2>
    <p>The decision not to arrest or not to search can be legally sound. Failing to document what you observed is not. Undocumented observations cannot support a future probable cause determination, cannot corroborate another department's investigation, and are lost entirely if you are later called to testify. Every stop that generates observations — out-of-state plates, masking odors, behavioral indicators, a tag forwarded for regional awareness — deserves a complete CAD entry, even when the contact ends with a warning.</p>
    <button class="btn-launch" onclick="startScenario('egpd-report-writing')">Proceed to Scenario Exercise →</button>
  </div>
`;

/* ══════════════════════════════════════════
   SCENARIO — Report Writing (EGPD)
══════════════════════════════════════════ */
const SCENARIO_REPORT_WRITING = {
  id: 'scenario-report-writing',
  title: 'Main St & 4th St — Foot Pursuit',
  location: 'Main St & 4th St, East Greenville Borough, PA',
  totalDecisions: 3,
  nodes: {
    'start': {
      type: 'scene', time: '23:52', weather: 'Clear / 48°F', unit: 'Patrol Unit 2',
      narrative: [
        'You stop a vehicle near Main St & 4th St for traveling 54 in a 35. As you approach on foot, the driver exits the vehicle and immediately flees on foot into an adjacent parking lot. You pursue.',
        'After a 200-yard foot chase, you close on the subject. As you attempt to take him to the ground, he spins and shoves you. You apply a leg sweep and bring him to the ground. He is handcuffed without further resistance. He is transported to Montgomery County lockup on charges of fleeing and eluding, resisting arrest, and the underlying traffic violation.',
        'Now you need to write the report. The DA\'s office will review it. So will defense counsel.'
      ],
      next: 'd1'
    },
    'd1': {
      type: 'decision', decisionNumber: 1,
      situation: 'You are back at your patrol vehicle. The subject has been transported. Your body camera captured the entire incident. You have a report to write.',
      question: 'How do you approach writing the report?',
      options: [
        { text: 'Write the full narrative immediately from memory — it\'s freshest right now.', next: 'c1a', quality: 'risky', shortLabel: 'Wrote from memory immediately' },
        { text: 'Review your body camera footage first, take detailed notes on the timeline, then write the report.', next: 'c1b', quality: 'good', shortLabel: 'Reviewed footage first, then wrote' },
        { text: 'Wait until you\'re back at the station and have time to sit down and focus. You\'ll remember it clearly enough.', next: 'c1c', quality: 'bad', shortLabel: 'Waited — relied on memory later' },
        { text: 'Ask your partner to write the narrative since they arrived and witnessed the takedown.', next: 'c1d', quality: 'bad', shortLabel: 'Delegated your narrative to your partner' },
      ]
    },
    'c1a': {
      type: 'consequence', outcomeClass: 'outcome-neutral', outcomeLabel: 'Memory Alone Has Gaps',
      heading: 'You wrote it fast — but accurately?',
      narrative: [
        'Your narrative is written within 20 minutes of the incident. At the preliminary hearing, defense counsel plays body camera footage and asks you to explain why your report states the subject "immediately fled" but the footage shows a 4-second pause between your approach and his exit from the vehicle.',
        'It\'s a minor discrepancy — but you didn\'t review the footage before writing. You wrote from memory. Defense uses it to suggest your entire account is imprecise.'
      ],
      legal: null, next: 'd2a'
    },
    'c1b': {
      type: 'consequence', outcomeClass: 'outcome-good', outcomeLabel: 'Grounded in Verified Facts',
      heading: 'Your report will match the footage.',
      narrative: [
        'You spend 12 minutes reviewing the body camera footage and taking notes on exact timestamps, distances, and sequence of events. The report you write is precise, sequential, and matches the camera to the second.',
        'At the preliminary hearing, defense counsel plays the footage. It matches your report exactly. The case is bound over for court.'
      ],
      legal: null, next: 'd2b'
    },
    'c1c': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Memory Degraded — Report Compromised',
      heading: 'Two hours later, details are already fading.',
      narrative: [
        'By the time you sit down to write, it\'s 2:15 AM. You are confident in the broad strokes but uncertain about the sequence of events leading up to the takedown. You write what you remember. The report is missing specific distances, the exact verbal commands you issued, and a clear timeline.',
        'Defense counsel uses those gaps at the preliminary hearing to attack the credibility of your entire account. The case is continued.'
      ],
      legal: 'Reports should be written as soon as possible after an incident, while observations are most accurate. The goal is contemporaneous documentation — a record that reflects your knowledge at the time of the event, not your reconstructed memory hours later.',
      next: 'd3'
    },
    'c1d': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Your Observations Cannot Be Delegated',
      heading: 'Your partner cannot write your account.',
      narrative: [
        'Your partner arrived during the takedown — they did not observe the foot pursuit, the initial approach, or the subject\'s actions leading to resistance. A report written by your partner about your observations is hearsay and legally problematic.',
        'Each officer writes their own report from their own perspective. Asking your partner to write your narrative — even with good intentions — creates a chain of custody problem with the evidence of your own conduct.'
      ],
      legal: 'Police reports are sworn accounts of an officer\'s personal observations. Your partner can document what they personally witnessed upon arrival — they cannot document your chase, your use of force, or your observations. Those require your report, in your words.',
      next: 'd3'
    },
    'd2a': {
      type: 'decision', decisionNumber: 2,
      situation: 'Defense counsel is now focusing on your description of the takedown. Your report states the subject "resisted arrest." Defense argues this is vague and inadequate to support the use of force.',
      question: 'Which version of the takedown documentation is legally defensible?',
      options: [
        { text: '"Subject resisted arrest and a takedown was necessary."', next: 'c2_wrong', quality: 'bad', shortLabel: 'Vague conclusion — no facts' },
        { text: '"As I attempted to control subject\'s right arm, subject spun counterclockwise and struck my forearm with his elbow. I applied a forward leg sweep, bringing subject to the ground. Subject ceased resistance upon impact. Handcuffs applied."', next: 'c2_right', quality: 'good', shortLabel: 'Specific, sequential, factual' },
        { text: '"Subject was combative. Used takedown per training. Subject complied."', next: 'c2_wrong', quality: 'bad', shortLabel: 'Minimal — missing the key facts' },
        { text: '"Force used was proportionate to resistance encountered."', next: 'c2_wrong', quality: 'bad', shortLabel: 'Legal conclusion without factual support' },
      ]
    },
    'd2b': {
      type: 'decision', decisionNumber: 2,
      situation: 'You are writing the section of the report that describes the physical takedown. Your body camera footage is clear and matches your notes.',
      question: 'Which description of the takedown is correct?',
      options: [
        { text: '"Subject resisted and was taken to the ground."', next: 'c2_wrong', quality: 'bad', shortLabel: 'Vague — no actionable facts' },
        { text: '"As I attempted to apply handcuffs, subject tensed both arms, pulled away, and rotated his body toward me. I applied a forward leg sweep to bring subject to a controlled ground position. Subject ceased active resistance. Handcuffs applied without further incident."', next: 'c2_right', quality: 'good', shortLabel: 'Specific, body-movement-level detail' },
        { text: '"Used approved takedown technique on resisting subject."', next: 'c2_wrong', quality: 'bad', shortLabel: 'References training but no factual detail' },
        { text: '"Subject became combative. Force was necessary and proportionate."', next: 'c2_wrong', quality: 'bad', shortLabel: 'Conclusory — missing the sequence' },
      ]
    },
    'c2_wrong': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Report Cannot Support the Charge',
      heading: 'Conclusions don\'t survive cross-examination. Facts do.',
      narrative: [
        '"Resisted arrest" tells a judge nothing. What did the subject do, specifically? Which arm? Which direction? What was the triggering movement? These are the facts a report needs to support a resisting arrest charge and to demonstrate that your force response was proportionate to that specific resistance.',
        'A vague report puts your case at risk and puts you at risk.'
      ],
      legal: 'Reports documenting use of force must describe the specific actions of the subject that prompted the response and the specific force applied. "Resisted" is a legal conclusion. The underlying facts — movement, direction, body mechanics — are what make the conclusion supportable.',
      next: 'd3'
    },
    'c2_right': {
      type: 'consequence', outcomeClass: 'outcome-good', outcomeLabel: 'Report Supports the Charge',
      heading: 'That\'s the standard.',
      narrative: [
        'Your report documents the subject\'s specific actions — the arm tension, the rotation, the direction of pull — and your specific response. A judge reading this can reconstruct the encounter. Defense counsel has no gap to exploit.',
        'The resisting arrest charge is supported. The use of force is documented at a level that survives scrutiny. This is professional report writing.'
      ],
      legal: 'Every use of force report should document: (1) the specific action by the subject that prompted the response, (2) the specific force applied, (3) the sequence and timeline, and (4) what happened after — compliance, injury, medical response. Each element protects both the officer and the case.',
      next: 'd3'
    },

    'd3': {
      type: 'decision',
      decisionNumber: 3,
      situation: 'Your supervisor has returned the report with a notation: "Timeline unclear — cannot determine sequence of events from narrative. Key elements missing: victim statement, specific injury description, and your articulation of probable cause. Revise and resubmit." You have your field notes but some of your notes are sparse on one key piece — the exact words the victim used when you interviewed her.',
      question: 'How do you handle the revision, specifically the gap in your field notes?',
      options: [
        {
          text: 'Reconstruct the victim\'s statement using your memory and what "probably" was said — the intent was accurate even if the exact words are gone.',
          shortLabel: 'Reconstruct statement from memory',
          quality: 'bad',
          next: 'c3-bad'
        },
        {
          text: 'Contact the victim to clarify and document the follow-up contact in your report. Use your notes for everything else. Note clearly in the report what is a direct quote versus a summary of the interview.',
          shortLabel: 'Follow up with victim, document accurately',
          quality: 'good',
          next: 'c3-good'
        },
        {
          text: 'Write around the gap — use general language like "victim provided a statement consistent with the injuries observed" without quoting her directly.',
          shortLabel: 'Write around the gap with general language',
          quality: 'risky',
          next: 'c3-neutral'
        }
      ]
    },
    'c3-bad': {
      type: 'consequence',
      outcomeClass: 'outcome-bad',
      outcomeLabel: 'Integrity Violation',
      heading: 'Reconstructing quotes you do not have is fabrication — regardless of intent.',
      narrative: [
        'A police report is a legal document. What appears in quotation marks must be what was actually said. Writing reconstructed language as if it were a direct statement is a false official statement — even if your intent is accurate, even if the "spirit" of it is right.',
        'If this discrepancy surfaces in court — and defense attorneys are skilled at finding them — it does not just affect this case. It goes to your credibility as a witness in every future case and creates potential criminal exposure for you.',
        'The right path is always the one that keeps your documentation tied to verifiable, documented facts.'
      ],
      legal: 'False official statements, even in police reports, can constitute criminal conduct under 18 Pa. C.S. § 4904. Additionally, fabricated or reconstructed witness quotes discovered in court can result in case dismissal and officer discipline. Document only what you can verify.',
      next: 'debrief'
    },
    'c3-good': {
      type: 'consequence',
      outcomeClass: 'outcome-good',
      outcomeLabel: 'Professional Documentation Standard',
      heading: 'Following up and documenting accurately is the correct approach.',
      narrative: [
        'A follow-up contact with the victim to clarify her statement is entirely appropriate, especially when you are producing a revised report. Document the follow-up contact with date, time, and method.',
        'In your report, distinguish clearly between direct quotes, paraphrased summaries, and your own observations. This distinction matters in court and demonstrates that you understand what a legally reliable report looks like.',
        'A report revised with additional verification is stronger than the original — not weaker. Your supervisor\'s feedback is an opportunity to build a tighter, more defensible document.'
      ],
      legal: 'Pennsylvania Rules of Criminal Procedure require that police reports contain sufficient facts to establish probable cause. Reports that distinguish between officer observations, direct victim quotes, and summaries are significantly more defensible in suppression hearings and trial.',
      next: 'debrief'
    },
    'c3-neutral': {
      type: 'consequence',
      outcomeClass: 'outcome-neutral',
      outcomeLabel: 'Technically Safe, Practically Weak',
      heading: 'Vague language avoids fabrication but leaves the report legally insufficient.',
      narrative: [
        'Using general summary language instead of specific content does not constitute a false report — but it may still fail to establish probable cause if the summary is not specific enough to meet the legal standard.',
        'Phrases like "victim provided a statement consistent with the injuries observed" are conclusory — they tell the reader your conclusion but not the underlying facts. A judge reviewing a warrant application or a jury hearing testimony needs the specific facts, not a conclusion.',
        'Take the extra step: follow up with the victim, get the detail you need, and document it properly. That is the difference between a report that survives and one that collapses.'
      ],
      legal: 'Illinois v. Gates (1983) and its Pennsylvania equivalents require that probable cause be supported by specific articulable facts — not conclusory statements. "Statement consistent with injuries" is a conclusion. What did she say? What injuries? Document those specifics.',
      next: 'debrief'
    },
    'debrief': { type: 'debrief' }
  }
};

function getReportWritingQuestions() {
  return [
    {
      scenario: 'After a foot pursuit and use of force incident, you write your report from memory two hours later. At the preliminary hearing, defense counsel notes your report states the subject "immediately fled" — but body camera footage shows a 4-second pause between your approach and the subject\'s exit from the vehicle.',
      text: 'What does this discrepancy most directly demonstrate?',
      options: [
        'That a report written from memory — without first reviewing available footage or notes — can contain imprecise language that gives the defense an opening to attack the officer\'s credibility.',
        'That the officer knowingly filed a false report and is subject to criminal prosecution for the inconsistency.',
        'That body camera footage may not be used at a preliminary hearing to contradict an officer\'s sworn written narrative.',
        'That the defense has no valid argument, because brief timing discrepancies are expected and carry no weight in court.'
      ],
    },
    {
      scenario: 'You arrest a subject for resisting arrest after a foot pursuit. Your report documents the use of force as: "Subject resisted arrest. Force was used and was proportionate to the resistance encountered."',
      text: 'What is the fundamental legal problem with this documentation?',
      options: [
        'The report should have been written by the supervising officer, not the officer who used the force.',
        'The report is legally sufficient — courts routinely accept general use-of-force summaries from trained officers.',
        'The report fails to include the subject\'s prior criminal history, which is required for legal sufficiency.',
        '"Resisted arrest" and "proportionate" are legal conclusions, not factual descriptions — they tell a reader what to conclude without the specific facts that support it.'
      ],
    },
    {
      scenario: 'Your partner arrived during the takedown phase of a foot pursuit incident. They did not witness the initial stop, the foot chase, or the beginning of the resistance. You ask them to write the use of force narrative because they have stronger writing skills.',
      text: 'Why is this approach legally problematic?',
      options: [
        'It is acceptable — assigning the strongest writer to the narrative is standard practice in high-stress incidents.',
        'It is problematic only if your partner was off-duty or outside their jurisdiction at the time of the incident.',
        'A police report is a sworn account of personal observations — your partner can document only what they witnessed on arrival, not the stop, the chase, or the use of force they did not see.',
        'It is a concern only if the case reaches trial — preliminary hearings do not require the reporting officer to testify.'
      ],
    },
    {
      scenario: 'A subject shoves you during an arrest. Your partner witnesses the incident. In your report, you need to describe the physical interaction.',
      text: 'Which description of the use of force best satisfies the legal standard for police reports in Pennsylvania?',
      options: [
        '"As I attempted to apply handcuffs, the subject tensed both arms, pulled away, and rotated his body toward me. I applied a forward leg sweep, bringing him to a controlled ground position. The subject ceased active resistance and handcuffs were applied."',
        '"Subject actively resisted a lawful arrest and became combative; reasonable physical force was applied and was proportionate to the level of resistance encountered until compliance was achieved."',
        '"Used an approved takedown technique on the resisting subject, consistent with the defensive tactics training received at the academy."',
        '"Subject resisted arrest. Physical force was used. The incident was resolved without serious injury to either party."'
      ],
    },
    {
      scenario: 'After a traffic stop that ends without an arrest, you observe a vehicle with out-of-state plates, a strong smell of air freshener, and a hidden compartment indicator near the center console. You note it in your memory but do not document it.',
      text: 'Why does failing to document observations from an inconclusive stop create a problem?',
      options: [
        'It does not create a problem — documentation is only required when an arrest is actually made.',
        'It is a minor administrative oversight that a supervisor can correct after the fact.',
        'It creates a problem only if the same vehicle is later stopped again by the same officer.',
        'Undocumented field intelligence cannot support probable cause in a future encounter, cannot corroborate another agency\'s investigation, and is lost if the officer is later called to testify.'
      ],
    },
    {
      scenario: 'Your report documents that a subject "seemed nervous" during a traffic stop. Defense counsel objects that this is a conclusory opinion, not a fact.',
      text: 'How should officer observations be documented to withstand this challenge?',
      options: [
        '"Seemed nervous" is adequate — courts recognize that officers rely on experiential shorthand.',
        'Document the specific, observable behaviors behind that assessment: "the subject\'s hands were visibly trembling, his voice was elevated in pitch, he avoided eye contact, and he repeatedly checked his mirrors after stopping."',
        'Replace "seemed nervous" with the more precise legal term "appeared agitated and noncompliant."',
        'Omit the observation entirely, since a subjective impression cannot be quantified for the record.'
      ],
    },
    {
      scenario: 'While completing your arrest report, you realize you forgot to document a witness statement that you took at the scene. The witness has since left the area.',
      text: 'What is the appropriate course of action?',
      options: [
        'Insert the statement into the original report as though it had been recorded there from the start.',
        'Omit the statement — if it cannot be verified against your notes, it should not appear in the report.',
        'Document what you recall of the statement now as a supplement, noting in the report that it was not captured in contemporaneous notes and is recalled from memory.',
        'Take no action yourself — wait for your supervisor to decide whether anything may be added to a completed report.'
      ],
    },
    {
      scenario: 'A sergeant reviewing your report notes that your probable cause section reads: "Based on my training and experience, I believed the subject was involved in criminal activity."',
      text: 'What is the primary deficiency in this probable cause statement?',
      options: [
        'It references training and experience, which courts do not permit officers to rely on.',
        'It fails to cite the specific statute the subject is believed to have violated.',
        'Nothing — probable cause does not need to be articulated in an arrest report.',
        'It is conclusory — it states the officer\'s conclusion without the specific, articulable facts that led to it.'
      ],
    },
  ];
}

/* ══════════════════════════════════════════
   SUPERVISOR OVERLAY — Report Writing (EGPD)
   The report-review craft: how a supervisor reads, returns,
   and develops officers through the reports that cross the desk.
══════════════════════════════════════════ */
const SUPERVISOR_REPORT_WRITING = `
  <div class="content-block">
    <h4>Supervisor Focus</h4>
    <h2>Your notation on a returned report teaches more report-writing than any classroom — if it is specific enough to act on.</h2>
    <p>In this module the officer's report came back with a sergeant's notation. From your side of the desk, that notation is the highest-leverage coaching you do. Every report you approve carries your name; every report you return is a lesson. And the discipline of review mirrors the discipline of writing: be specific. "Needs work" teaches nothing. "Timeline unclear — sequence the takedown movement by movement, and tie each force application to the resistance that prompted it" teaches the standard and tells the officer exactly what a defensible report looks like.</p>
  </div>
  <div class="content-block">
    <h4>Read Every Report for Conclusions Wearing the Clothes of Facts</h4>
    <h2>The most common defect you will return is the conclusion that pretends to be a fact.</h2>
    <p>"Resisted arrest." "Became combative." "Appeared nervous." "Based on my training and experience, I believed the subject was involved in criminal activity." Each tells the reader what to conclude without the facts to evaluate it, and none survives cross-examination. On review, mark every such phrase and require the facts underneath: which arm, which direction, the triggering movement, the officer's specific response, and what happened after. The same rule governs probable cause — under <em>Illinois v. Gates</em> (1983), PC rests on specific articulable facts. "I believed the subject was involved in criminal activity" is a conclusion you send back for the facts that support it, with the training-and-experience reference tethered to what was actually observed.</p>
  </div>
  <div class="content-block">
    <h4>Some Problems Are Not Writing Problems</h4>
    <h2>A few returns are not coaching. They are integrity findings — and only the reviewer catches them.</h2>
    <p>Most returns improve prose. A few are different in kind. If a report's quoted statements, timeline, or use-of-force account conflict with the body-camera footage, you are no longer editing — you are looking at a possible false official statement under 18 Pa. C.S. § 4904 (unsworn falsification) and § 4906 (false reports), and that is a Professional Conduct matter, not a revise-and-resubmit. This is why review means actually comparing the report against the footage and the field notes, not just reading for clarity. A reconstructed quote, a sequence that does not match the video, a fact that surfaced only after a legal challenge — each is a flag you cannot coach away, and missing it because you only read the words is the failure that follows the case into court.</p>
  </div>
  <div class="content-block">
    <h4>Returning a Report for a Gap — the Right Way and the Wrong Way</h4>
    <ul class="key-points">
      <li><strong>Direct the right fix.</strong> When a gap exists — a missing victim quote, an unclear injury description — instruct the officer to follow up with the witness or victim and document the follow-up contact (date, time, method), not to reconstruct from memory. Reconstructing a quote is fabrication even when the spirit is accurate.</li>
      <li><strong>Don't accept writing around the gap.</strong> Conclusory filler — "victim provided a statement consistent with the injuries observed" — avoids fabrication but may fail to establish probable cause. Return it for the specific detail; a clean-sounding conclusion is still a conclusion.</li>
      <li><strong>Late facts go in disclosed, never silent.</strong> A fact discovered after filing belongs in a supplement that notes it was captured from memory rather than contemporaneous notes. A silent insertion into a finished report is misconduct; a disclosed supplement is integrity. Make sure your officers know the difference before they need it.</li>
    </ul>
  </div>
  <div class="content-block">
    <h4>Contemporaneous Documentation and the Stops That Never Became Arrests</h4>
    <p>Two habits to reinforce on review. First, contemporaneous documentation: reports written hours later from memory lose distances, exact commands, and timeline. Encourage officers to review footage and notes and write as soon as safely possible — and when they didn't, read for the tell-tale gaps and missing sequence. Second, hold the same standard for stops that ended without an arrest. Field intelligence that is not recorded does not exist, and a CAD entry of "warning issued" preserves nothing for the next investigation. The contacts that never became arrests are the ones most likely to be under-documented — and the ones most easily fixed by a supervisor who insists on the standard before the record is closed.</p>
  </div>
  <div class="content-block">
    <h4>The Reviewer Is Also a Developer</h4>
    <p>Track what you return. One officer who writes conclusions instead of facts is a coaching conversation. A squad that does it is a training need you own. The patterns in the reports you review are the clearest signal you have of where your people need development, and addressing them upstream — a roll-call standard, a worked example, a targeted session — is how the report-writing SOP becomes a habit rather than a correction you make one report at a time.</p>
  </div>
`;

function getReportWritingSupervisorQuestions() {
  return [
    {
      scenario: 'An officer\'s arrest report is unclear and conclusory in places. You are returning it for revision.',
      text: 'Which supervisory notation best develops the officer and produces a defensible report?',
      options: [
        '"Approved with reservations — I\'ll note my concerns to you verbally at some point later."',
        '"Rewrite the whole thing from scratch; this draft simply is not good enough to file."',
        '"Timeline unclear — sequence the takedown movement by movement, tie each force application to the specific resistance that prompted it, and replace \'resisted arrest\' with what the subject physically did."',
        '"Needs work — please revise the weak sections and resubmit for review."'
      ],
    },
    {
      scenario: 'A report you are reviewing documents a use of force as: "Subject resisted arrest. Force was used and was proportionate to the resistance encountered."',
      text: 'What is the correct supervisory action?',
      options: [
        'Return it — "resisted arrest" and "proportionate" are conclusions, not facts. Require the body-movement-level detail (which arm, which direction, the triggering movement, the officer\'s response, the outcome) that supports the charge and survives cross-examination.',
        'Edit the conclusions into specific facts yourself, then approve the report so it does not bounce again.',
        'Forward it to discipline, since wording this inadequate reflects a performance problem.',
        'Approve it — courts accept general use-of-force summaries from officers in routine cases.'
      ],
    },
    {
      scenario: 'A report\'s probable cause section reads, in full: "Based on my training and experience, I believed the subject was involved in criminal activity."',
      text: 'How should you handle this on review?',
      options: [
        'Reject the arrest outright, since an officer who cites "training and experience" has effectively admitted the stop lacked probable cause.',
        'Approve it, but instruct the officer to delete the training-and-experience language, which courts do not allow.',
        'Approve it — a reference to the officer\'s training and experience is enough to establish probable cause on its own.',
        'Return it — under Illinois v. Gates, probable cause must rest on specific articulable facts. "I believed" is a conclusion; the report must state what was observed, heard, and detected, with training and experience tethered to those facts.'
      ],
    },
    {
      scenario: 'While reviewing a report, you compare it to the body-camera footage and find the officer\'s written account of the takedown materially conflicts with what the video shows.',
      text: 'How should you treat this finding?',
      options: [
        'As a routine revise-and-resubmit — return it for the officer to align the wording with the footage.',
        'As a possible integrity matter — a report conflicting with the footage may be a false official statement under 18 Pa. C.S. § 4904 and § 4906, handled as a Professional Conduct matter rather than a writing correction.',
        'As acceptable — a written report and body-camera footage are not expected to match in detail.',
        'As a footage error; defer to the officer\'s written account over the video.'
      ],
    },
    {
      scenario: 'You are training a newer supervisor on how to review reports.',
      text: 'What is the essential discipline of report review that catches integrity problems?',
      options: [
        'Comparing the report against the available body-camera footage and field notes — not just reading the words — so reconstructed quotes, mismatched sequences, and after-the-fact facts are caught before the report becomes the record.',
        'Reading the report carefully for clarity and grammar, then approving it once it reads cleanly and professionally.',
        'Confirming that the report contains both a probable cause section and a use-of-force section before approving it.',
        'Relying on the officer\'s certification that the report is accurate, since the officer was the one present at the scene.'
      ],
    },
    {
      scenario: 'An officer\'s field notes are missing the exact words a victim used. You are returning the report and instructing the officer on how to close the gap.',
      text: 'What should you direct the officer to do?',
      options: [
        'Direct the officer to reconstruct the victim\'s statement from memory, since the officer recalls the gist of what was said.',
        'Direct the officer to insert an approximate quote in quotation marks and add a note that it is "close enough."',
        'Direct the officer to contact the victim to clarify, document the follow-up (date, time, method), and distinguish in the report between direct quotes, paraphrased summaries, and the officer\'s own observations.',
        'Direct the officer to leave the statement out entirely rather than risk any inaccuracy in the record.'
      ],
    },
    {
      scenario: 'An officer resubmits a revised report. The victim-statement section now reads: "Victim provided a statement consistent with the injuries observed."',
      text: 'Is this revision acceptable?',
      options: [
        'Yes — by avoiding any fabricated detail, the revision satisfies the standard.',
        'Yes — in police reports, a general summary is preferred over specific quotes and injury descriptions.',
        'No — and the officer should be disciplined for resubmitting such a weak revision.',
        'No — it is conclusory and may fail to establish probable cause. Return it for the specific content of the statement and the specific injuries, obtained and documented properly.'
      ],
    },
    {
      scenario: 'An officer comes to you because they realized, after filing, that they omitted a witness statement taken at the scene.',
      text: 'What is the correct supervisory guidance?',
      options: [
        'Tell the officer to insert the statement into the original report as if it had been recorded there from the start.',
        'Have the officer document it as a disclosed supplement, noting it was captured from memory rather than contemporaneous notes — never a silent insertion into the finished report.',
        'Tell the officer to leave it out, since it was not part of the originally filed report.',
        'Direct the officer to hold the statement and add it only if the defense later raises the issue.'
      ],
    },
  ];
}

/* ══════════════════════════════════════════
   SUPERVISOR SCENARIO — Report Writing (EGPD)
   The report-review craft: reviewing Officer Vance's foot-pursuit
   report before it's filed.
══════════════════════════════════════════ */
const SCENARIO_REPORT_WRITING_SUP = {
  id: 'scenario-report-writing-sup',
  title: 'Supervisor Review — Main St Foot Pursuit',
  location: 'Report Review Desk, East Greenville Borough, PA',
  totalDecisions: 3,
  nodes: {
    'start': {
      type: 'scene', time: '00:30', weather: 'Report Review', unit: 'Reviewing Supervisor',
      narrative: [
        'Officer Vance\'s report from a foot pursuit and takedown near Main St & 4th St is in your review queue before it goes to the DA. Vance stopped a speeding vehicle, the driver fled on foot, and after a chase the subject shoved him and was taken to the ground.',
        'The body camera captured the whole encounter. The DA will read this report, and so will defense counsel — line by line, against the footage. Your review is the last check before it becomes the record.'
      ],
      next: 'd1'
    },
    'd1': {
      type: 'decision', decisionNumber: 1,
      situation: 'The use-of-force section reads, in full: "Subject resisted arrest. Force was used and was proportionate to the resistance encountered."',
      question: 'How do you handle it?',
      options: [
        { text: 'Approve it — courts accept general use-of-force summaries from officers.', next: 'c1a', quality: 'bad', shortLabel: 'Approved the conclusory summary' },
        { text: 'Return it for the body-movement-level facts — which arm, which direction, the triggering movement, the officer\'s response, the outcome — that support the charge and survive cross-examination.', next: 'c1b', quality: 'good', shortLabel: 'Returned for specific, sequential facts' },
        { text: 'Edit the conclusions into facts yourself and approve it.', next: 'c1c', quality: 'bad', shortLabel: 'Rewrote the officer\'s observations' },
        { text: 'Forward it to discipline because the wording is inadequate.', next: 'c1d', quality: 'risky', shortLabel: 'Escalated weak wording to discipline' },
      ]
    },
    'c1a': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Conclusions Don\'t Survive Cross',
      heading: '"Resisted" and "proportionate" tell a judge nothing.',
      narrative: [
        '"Resisted arrest" and "proportionate" are legal conclusions, not facts. They tell the reader what to conclude without the specific actions — which arm moved, in which direction, what triggered the response — that a resisting charge and a force decision actually rest on. Approved as written, this report hands defense counsel a credibility attack and may not support the charge.',
        'And it is checkable: the body camera will show exactly what happened, and a conclusory report that doesn\'t match the video is worse than no report.'
      ],
      legal: 'Reports documenting force must describe the subject\'s specific actions and the specific force applied. "Resisted" is a conclusion; the underlying body-movement facts are what make it supportable.',
      next: 'd2'
    },
    'c1b': {
      type: 'consequence', outcomeClass: 'outcome-good', outcomeLabel: 'Returned for the Facts',
      heading: 'You sent it back for the sequential, body-movement detail that survives a motion.',
      narrative: [
        'Your notation is specific: sequence the takedown movement by movement, tie each application of force to the resistance that prompted it, and replace "resisted arrest" with what the subject physically did. That is the standard, and a precise notation teaches it better than any classroom.',
        'A report written to that level lets a judge reconstruct the encounter and leaves defense counsel no gap to exploit.'
      ],
      legal: 'A defensible use-of-force narrative documents the specific action by the subject, the specific force applied, the sequence, and the outcome. Each element protects the officer and the charge.',
      next: 'd2'
    },
    'c1c': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Not Yours to Write',
      heading: 'Only the officer can attest to what the officer observed.',
      narrative: [
        'Editing the conclusions into facts yourself means putting observations into a sworn report that you did not make — what Vance saw and felt is his to attest to, not yours to supply. The report stops being a reliable account of his perceptions, and that surfaces badly under cross-examination.',
        'Return it with a specific notation and have Vance write his own observations to the standard.'
      ],
      legal: 'Police reports are sworn accounts of the reporting officer\'s personal observations. A supervisor returns and coaches; the supervisor does not author the officer\'s account.',
      next: 'd2'
    },
    'c1d': {
      type: 'consequence', outcomeClass: 'outcome-neutral', outcomeLabel: 'Coaching, Not Discipline',
      heading: 'A weak first draft is a teaching moment, not misconduct.',
      narrative: [
        'Jumping to discipline over conclusory wording skips the development step and teaches officers to fear the review rather than learn from it. Most report defects are exactly this: a fixable writing problem that a specific notation corrects.',
        'Return it for the facts. Save discipline for integrity problems — which the next step is about.'
      ],
      legal: null,
      next: 'd2'
    },
    'd2': {
      type: 'decision', decisionNumber: 2,
      situation: 'You do what review actually requires and compare the report against the body-camera footage. The takedown account in the report materially conflicts with what the video shows.',
      question: 'How do you treat this finding?',
      options: [
        { text: 'As a routine revise-and-resubmit — return it for Vance to align the wording with the footage.', next: 'c2a', quality: 'bad', shortLabel: 'Treated it as a wording fix' },
        { text: 'As a possible integrity matter — a report conflicting with the footage may be a false official statement under 18 Pa. C.S. § 4904 / § 4906, handled as a Professional Conduct matter, not coaching.', next: 'c2b', quality: 'good', shortLabel: 'Escalated as a possible false statement' },
        { text: 'As acceptable — written reports and footage are not expected to match exactly.', next: 'c2c', quality: 'bad', shortLabel: 'Accepted the mismatch' },
        { text: 'Defer to Vance\'s written account over the video.', next: 'c2d', quality: 'bad', shortLabel: 'Took the report over the footage' },
      ]
    },
    'c2a': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'This Isn\'t a Wording Fix',
      heading: 'A report that conflicts with the footage is not a prose problem.',
      narrative: [
        'Returning it as a routine revise-and-resubmit treats a possible false statement as a style note. A material conflict between the report and the video is exactly the integrity flag a reviewer exists to catch — and "fix the wording so it matches the video now" risks coaching an officer into conforming a false account rather than addressing it.',
        'This goes to Professional Conduct, not back to the keyboard.'
      ],
      legal: '18 Pa. C.S. § 4904 (unsworn falsification) / § 4906 (false reports): a report that materially conflicts with the evidence raises a false-statement question, distinct from a writing correction.',
      next: 'd3'
    },
    'c2b': {
      type: 'consequence', outcomeClass: 'outcome-good', outcomeLabel: 'Caught the Integrity Flag',
      heading: 'You compared the report to the footage — and treated the conflict as what it is.',
      narrative: [
        'A material conflict between the written account and the video is a possible false official statement under 18 Pa. C.S. § 4904 / § 4906, and it is handled as a Professional Conduct matter — not coaching, not a rewrite. The discipline that catches this is the discipline of actually comparing the report to the source material, not just reading it for clarity.',
        'Missing this because you only read the words is the failure that follows a case into court.'
      ],
      legal: '18 Pa. C.S. § 4904 / § 4906: a report conflicting with the body-camera footage is a possible false statement, addressed through Professional Conduct rather than revision.',
      next: 'd3'
    },
    'c2c': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Not Acceptable',
      heading: 'A material conflict with the footage is not normal variation.',
      narrative: [
        'Minor differences in emphasis are one thing; a material conflict between the report\'s account of the takedown and what the video shows is another. Waving it through as expected variation lets a possible false statement become the official record, and it tells your officers the video and the report don\'t have to agree.',
        'Treat the conflict as the integrity flag it is.'
      ],
      legal: '18 Pa. C.S. § 4904 / § 4906: a material report-vs-footage conflict is a false-statement question, not acceptable variance.',
      next: 'd3'
    },
    'c2d': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'The Video Doesn\'t Defer',
      heading: 'Choosing the written account over the footage is how the problem reaches court intact.',
      narrative: [
        'Defaulting to Vance\'s report over the video resolves the conflict in exactly the wrong direction. The footage is the contemporaneous record; a report that contradicts it is the document with the problem, and accepting it over the video means the false statement survives your review.',
        'The conflict is a Professional Conduct matter, and the footage is the reference.'
      ],
      legal: '18 Pa. C.S. § 4904 / § 4906: where the report conflicts with the footage, the footage governs the integrity question; the conflict is investigated, not resolved in favor of the report.',
      next: 'd3'
    },
    'd3': {
      type: 'decision', decisionNumber: 3,
      situation: 'A separate report from Vance has a gap: his field notes are missing the victim\'s exact words. He tells you he closed the gap by reconstructing the quote from memory — "the gist is right."',
      question: 'What do you direct him to do?',
      options: [
        { text: 'Leave the reconstructed quote in — the gist is accurate, and that\'s close enough.', next: 'c3a', quality: 'bad', shortLabel: 'Allowed a reconstructed quote' },
        { text: 'Contact the victim to clarify, document the follow-up (date, time, method), and distinguish in the report between direct quotes, paraphrased summaries, and his own observations.', next: 'c3b', quality: 'good', shortLabel: 'Directed verification, not reconstruction' },
        { text: 'Have him write around it — "victim provided a statement consistent with the injuries observed" — without quoting her.', next: 'c3c', quality: 'risky', shortLabel: 'Wrote around the gap with conclusory language' },
      ]
    },
    'c3a': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Reconstruction Is Fabrication',
      heading: 'What appears in quotation marks must be what was actually said.',
      narrative: [
        'A reconstructed quote presented as a direct statement is a false official statement, even when the spirit is accurate and the intent is honest. If it surfaces in court — and defense attorneys find these — it does not just affect this case; it goes to Vance\'s credibility as a witness in every future one, and creates criminal exposure under 18 Pa. C.S. § 4904.',
        'Allowing it tells your officers that "close enough" is acceptable in a sworn document. It is not.'
      ],
      legal: '18 Pa. C.S. § 4904: a reconstructed quote written as a direct statement is unsworn falsification. Document only what can be verified.',
      next: 'debrief'
    },
    'c3b': {
      type: 'consequence', outcomeClass: 'outcome-good', outcomeLabel: 'Verification, Not Reconstruction',
      heading: 'You directed the right way to close a gap — follow up and document, never reconstruct.',
      narrative: [
        'You have Vance contact the victim to clarify, document the follow-up contact with date, time, and method, and clearly distinguish direct quotes from summaries and from his own observations. A report revised with additional verification is stronger than the original, not weaker.',
        'That is the standard your review reinforces — gaps get closed by verification, and the document stays tied to verifiable facts.'
      ],
      legal: 'Pennsylvania practice requires reports to contain sufficient verified facts; distinguishing quotes, summaries, and observations is what makes a report defensible at a hearing.',
      next: 'debrief'
    },
    'c3c': {
      type: 'consequence', outcomeClass: 'outcome-neutral', outcomeLabel: 'Avoids Fabrication, Fails the Standard',
      heading: 'Writing around the gap is honest — and still legally thin.',
      narrative: [
        '"Victim provided a statement consistent with the injuries observed" avoids fabrication, but it is conclusory and may fail to establish probable cause if the actual content matters. Under Illinois v. Gates, the report needs specific articulable facts — the words she actually used — not a clean-sounding summary.',
        'Don\'t settle for writing around it. Direct Vance to get the detail and document it properly.'
      ],
      legal: 'Illinois v. Gates (1983): probable cause rests on specific articulable facts under the totality. A conclusory summary may not meet that standard even though it avoids fabrication.',
      next: 'debrief'
    },
    'debrief': { type: 'debrief' }
  }
};
