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
