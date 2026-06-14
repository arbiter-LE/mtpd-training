/* ══════════════════════════════════════════
   READING — Report Writing (EGPD)
══════════════════════════════════════════ */
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
        'That body camera footage is inadmissible to challenge an officer\'s written report.',
        'That the officer filed a false report and may face criminal charges.',
        'That reports written from memory — without reviewing available footage or notes — risk inaccuracies that undermine an officer\'s credibility on the stand.',
        'That the defense has no valid argument because small discrepancies are expected and admissible.'
      ],
      correct: 2,
      feedback: 'Correct. Memory degrades rapidly after a high-stress incident. Even minor discrepancies between a report and body camera footage — especially ones that can be attributed to imprecise language — give defense counsel an opening to challenge the officer\'s overall credibility. Best practice: review available footage and notes before writing, document as soon as safely possible after the incident, and use precise language grounded in verified facts.'
    },
    {
      scenario: 'You arrest a subject for resisting arrest after a foot pursuit. Your report documents the use of force as: "Subject resisted arrest. Force was used and was proportionate to the resistance encountered."',
      text: 'What is the fundamental legal problem with this documentation?',
      options: [
        'The report must include the subject\'s prior criminal history to be legally sufficient.',
        '"Resisted arrest" and "proportionate" are legal conclusions, not factual descriptions — they tell a reader what to conclude without providing the specific facts that support the conclusion.',
        'The report is legally sufficient — courts accept general use of force summaries from law enforcement officers.',
        'The report should have been written by the supervising officer, not the officer who used force.'
      ],
      correct: 1,
      feedback: 'Correct. "Resisted arrest" is a legal conclusion — it tells the reader what to conclude, not what happened. A legally defensible report requires specific, sequential facts: which body part moved, in which direction, what action the officer took in response, and what happened as a result. "Subject tensed both arms, pulled away, and rotated his body toward me. I applied a forward leg sweep" is defensible. "Subject resisted" is not.'
    },
    {
      scenario: 'Your partner arrived during the takedown phase of a foot pursuit incident. They did not witness the initial stop, the foot chase, or the beginning of the resistance. You ask them to write the use of force narrative because they have stronger writing skills.',
      text: 'Why is this approach legally problematic?',
      options: [
        'It is acceptable — partnership reports are standard practice in high-stress incidents.',
        'Police reports are sworn accounts of personal observations. Your partner cannot document your observations, your chase, or your use of force — only what they personally witnessed upon arrival.',
        'It is problematic only if your partner was off-duty at the time of the incident.',
        'It is only problematic if the case goes to trial — preliminary hearings do not require the reporting officer to testify.'
      ],
      correct: 1,
      feedback: 'Correct. Each officer reports their own observations. Your partner can document what they personally witnessed — specifically, events from their arrival forward. They cannot document the foot pursuit, the initial contact, or your use of force, because they did not observe those events. A report written by an officer who wasn\'t present for the documented events is hearsay, creates chain of custody issues, and will be attacked in court.'
    },
    {
      scenario: 'A subject shoves you during an arrest. Your partner witnesses the incident. In your report, you need to describe the physical interaction.',
      text: 'Which description of the use of force best satisfies the legal standard for police reports in Pennsylvania?',
      options: [
        '"Subject became combative. Force was necessary and proportionate to the resistance."',
        '"Used approved takedown technique on resisting subject per training received at the academy."',
        '"As I attempted to apply handcuffs, subject tensed both arms, pulled away, and rotated his body toward me. I applied a forward leg sweep, bringing subject to a controlled ground position. Subject ceased active resistance. Handcuffs applied."',
        '"Subject resisted arrest. Physical force was used. Incident resolved without serious injury."'
      ],
      correct: 2,
      feedback: 'Correct. The third option provides specific, sequential, body-movement-level documentation that allows any reader to reconstruct exactly what happened. It documents the subject\'s specific action, the officer\'s specific response, and the outcome — all three elements required for a use of force narrative that survives cross-examination and supports the underlying charge.'
    },
    {
      scenario: 'After a traffic stop that ends without an arrest, you observe a vehicle with out-of-state plates, a strong smell of air freshener, and a hidden compartment indicator near the center console. You note it in your memory but do not document it.',
      text: 'Why does failing to document observations from an inconclusive stop create a problem?',
      options: [
        'It doesn\'t — documentation is only required when an arrest is made.',
        'Undocumented observations cannot be used to support probable cause in future encounters, cannot corroborate other departments\' investigations, and are lost entirely if the officer is later called to testify.',
        'It is a minor administrative issue that supervision can correct after the fact.',
        'It creates a problem only if the same vehicle is stopped again by the same officer.'
      ],
      correct: 1,
      feedback: 'Correct. Every stop that generates observations — even stops that end without action — deserves documentation. Undocumented intelligence is lost intelligence. It cannot support a future probable cause determination, cannot corroborate another agency\'s investigation, and cannot be used to establish a pattern if the same subject is stopped again. Field intelligence is a law enforcement asset — if it isn\'t documented, it doesn\'t exist.'
    },
    {
      scenario: 'Your report documents that a subject "seemed nervous" during a traffic stop. Defense counsel objects that this is a conclusory opinion, not a fact.',
      text: 'How should officer observations be documented to withstand this challenge?',
      options: [
        '"Seemed nervous" is sufficient — courts understand that officers use experiential shorthand.',
        'Document the specific observable behaviors that led to that assessment: "Subject\'s hands were visibly trembling, voice elevated in pitch, avoided eye contact, and checked mirrors repeatedly after stopping."',
        'Replace "seemed nervous" with "appeared agitated" — more precise legal language.',
        'Omit the observation entirely if it cannot be precisely quantified.'
      ],
      correct: 1,
      feedback: 'Correct. Conclusory terms like "seemed nervous" or "appeared suspicious" are not facts — they are conclusions. Defense attorneys and courts will challenge them. The professional standard is to document the specific, observable behaviors that led to your assessment. Those specific facts speak for themselves and cannot be easily dismissed as officer opinion.'
    },
    {
      scenario: 'While completing your arrest report, you realize you forgot to document a witness statement that you took at the scene. The witness has since left the area.',
      text: 'What is the appropriate course of action?',
      options: [
        'Omit the statement — if you cannot verify the details, it should not be in the report.',
        'Document what you recall of the statement now, noting in the report that it was not captured in contemporaneous notes and that the account is from memory.',
        'Insert the statement into the original report as if it had been there from the start.',
        'Contact your supervisor before adding anything to a completed report.'
      ],
      correct: 1,
      feedback: 'Correct. Omitting known facts weakens the case. Altering a completed report retroactively without disclosure is misconduct. The correct approach is to document the statement as a supplement or addendum, note that it was captured from memory rather than contemporaneous notes, and be transparent about that limitation. This preserves the information while maintaining your integrity.'
    },
    {
      scenario: 'A sergeant reviewing your report notes that your probable cause section reads: "Based on my training and experience, I believed the subject was involved in criminal activity."',
      text: 'What is the primary deficiency in this probable cause statement?',
      options: [
        'It does not cite a specific statute.',
        'It is conclusory — it states your conclusion without documenting the specific articulable facts that led to it.',
        'It references training and experience, which courts disallow.',
        'Probable cause does not need to be articulated in arrest reports.'
      ],
      correct: 1,
      feedback: 'Correct. Probable cause must be grounded in specific, articulable facts — not in an officer\'s general conclusion. "I believed" is a conclusion. The report must document: what you observed, what you heard, what was said, what you detected, and how those specific facts — viewed through your training and experience — established probable cause for the specific offense charged. The training and experience reference is valid, but only when tethered to stated facts.'
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
        '"Needs work — revise and resubmit."',
        '"Timeline unclear — sequence the takedown movement by movement, and tie each force application to the specific resistance that prompted it. Replace \'resisted arrest\' with what the subject physically did."',
        '"Rewrite the whole thing, it isn\'t good enough."',
        '"Approved with reservations — I\'ll note my concerns verbally later."'
      ],
      correct: 1,
      feedback: 'Correct. A specific, actionable notation teaches the standard and tells the officer exactly what a defensible report requires. Vague notations ("needs work") teach nothing and produce another weak draft. The discipline of review mirrors the discipline of writing: be specific.'
    },
    {
      scenario: 'A report you are reviewing documents a use of force as: "Subject resisted arrest. Force was used and was proportionate to the resistance encountered."',
      text: 'What is the correct supervisory action?',
      options: [
        'Approve it — courts accept general use-of-force summaries from officers.',
        'Return it: "resisted arrest" and "proportionate" are conclusions, not facts. Require the body-movement-level detail — which arm, which direction, the triggering movement, the officer\'s response, and the outcome — that supports the charge and survives cross-examination.',
        'Edit the conclusions into facts yourself and approve it.',
        'Forward it to discipline because the wording is inadequate.'
      ],
      correct: 1,
      feedback: 'Correct. Conclusions like "resisted" and "proportionate" tell a reader what to conclude without the facts to evaluate it, and they do not survive cross-examination. The reviewer returns the report for the specific, sequential facts — not by rewriting the officer\'s observations, which only the officer can attest to.'
    },
    {
      scenario: 'A report\'s probable cause section reads, in full: "Based on my training and experience, I believed the subject was involved in criminal activity."',
      text: 'How should you handle this on review?',
      options: [
        'Approve it — a training-and-experience reference is sufficient to establish probable cause.',
        'Return it: under Illinois v. Gates, probable cause must rest on specific articulable facts. "I believed" is a conclusion; the report must state what was observed, heard, and detected, with the training-and-experience reference tethered to those facts.',
        'Reject the arrest entirely because the officer cited training and experience.',
        'Approve it but tell the officer to remove the training-and-experience language, which courts disallow.'
      ],
      correct: 1,
      feedback: 'Correct. Illinois v. Gates (1983) requires probable cause to be supported by specific articulable facts under the totality of the circumstances. A bare "I believed" is conclusory. The training-and-experience reference is valid only when tied to the facts actually observed — so the report goes back for those facts.'
    },
    {
      scenario: 'While reviewing a report, you compare it to the body-camera footage and find the officer\'s written account of the takedown materially conflicts with what the video shows.',
      text: 'How should you treat this finding?',
      options: [
        'As a routine revise-and-resubmit — return it for the officer to align the wording with the footage.',
        'As a possible integrity matter: a report conflicting with the footage may be a false official statement under 18 Pa. C.S. § 4904 and § 4906, which is a Professional Conduct matter rather than a writing correction.',
        'As acceptable — written reports and footage are not expected to match.',
        'As a footage error; defer to the officer\'s written account over the video.'
      ],
      correct: 1,
      feedback: 'Correct. A report that materially conflicts with the body-camera footage is not a prose problem. It raises a possible false official statement under 18 Pa. C.S. § 4904 / § 4906 and is handled as a Professional Conduct matter — distinct from coaching an officer on clearer writing.'
    },
    {
      scenario: 'You are training a newer supervisor on how to review reports.',
      text: 'What is the essential discipline of report review that catches integrity problems?',
      options: [
        'Reading the report quickly for clarity and grammar, then approving if it reads well.',
        'Actually comparing the report against the available body-camera footage and field notes — not just reading the words — so that reconstructed quotes, mismatched sequences, and after-the-fact facts are caught before the report becomes the record.',
        'Approving any report that contains a probable cause section, regardless of content.',
        'Relying on the officer\'s certification that the report is accurate and not reviewing source material.'
      ],
      correct: 1,
      feedback: 'Correct. The integrity flags — a reconstructed quote, a timeline that does not match the video, a fact that appeared only after a legal challenge — are visible only when the reviewer compares the report against the footage and notes. Reading for clarity alone misses exactly the problems that follow a case into court.'
    },
    {
      scenario: 'An officer\'s field notes are missing the exact words a victim used. You are returning the report and instructing the officer on how to close the gap.',
      text: 'What should you direct the officer to do?',
      options: [
        'Reconstruct the victim\'s statement from memory, since the officer remembers the gist of it.',
        'Contact the victim to clarify, document the follow-up contact (date, time, method), and distinguish clearly in the report between direct quotes, paraphrased summaries, and the officer\'s own observations.',
        'Leave the statement out entirely rather than risk any inaccuracy.',
        'Insert an approximate quote in quotation marks and note that it is "close enough."'
      ],
      correct: 1,
      feedback: 'Correct. The right way to close a gap is verification, not reconstruction. A follow-up contact documented with date, time, and method — with quotes, summaries, and observations clearly distinguished — strengthens the report. Reconstructing a quote from memory is fabrication, even when the spirit is accurate.'
    },
    {
      scenario: 'An officer resubmits a revised report. The victim-statement section now reads: "Victim provided a statement consistent with the injuries observed."',
      text: 'Is this revision acceptable?',
      options: [
        'Yes — it avoids fabrication, so it is sufficient.',
        'No — it is conclusory and may fail to establish probable cause. Return it for the specific content of the statement and the specific injuries, obtained and documented properly.',
        'Yes — general summaries are preferred over specific quotes in police reports.',
        'No — the officer should be disciplined for submitting a weak revision.'
      ],
      correct: 1,
      feedback: 'Correct. "Writing around the gap" with conclusory language avoids fabrication but can still fail the legal standard. Under Gates, probable cause needs specific articulable facts. Return the report for the actual content of the statement and the specific injuries — a clean-sounding conclusion is still a conclusion.'
    },
    {
      scenario: 'An officer comes to you because they realized, after filing, that they omitted a witness statement taken at the scene.',
      text: 'What is the correct supervisory guidance?',
      options: [
        'Tell the officer to insert the statement into the original report as if it had been there from the start.',
        'Have the officer document it as a disclosed supplement, noting that it was captured from memory rather than contemporaneous notes — never a silent insertion into the finished report.',
        'Tell the officer to omit it, since it was not in the original.',
        'Direct the officer to wait and add it only if the defense raises the issue.'
      ],
      correct: 1,
      feedback: 'Correct. Omitting known facts weakens the case, but silently inserting them into a finished report is misconduct. The correct path is a disclosed supplement that notes the information was captured from memory. Transparency preserves both the information and the officer\'s integrity.'
    },
  ];
}
