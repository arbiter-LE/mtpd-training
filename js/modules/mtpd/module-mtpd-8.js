/* ═══════════════════════════════════════════
   MTPD — Module 8: Traffic Stops & Vehicle Contacts

   Reading extracted byte-for-byte from the former app.js hardcoded
   branch. Supervisor variants anchored to the law in the reading
   (Mimms, Wilson, Rodriguez, Alexander, Barr) and MTPD Order 1.2's
   vehicle-search rule. Gary appears only as overruled.
   Never borrow EGPD policy, framing, or roads.
═══════════════════════════════════════════ */

const READING_TRAFFIC_STOPS = `
      <div class="content-block">
        <h4>Authority to Stop and Order Occupants Out</h4>
        <p>A traffic stop is a seizure under the Fourth Amendment. Its lawfulness depends on reasonable articulable suspicion of a traffic violation or equipment violation — a low threshold, but one that must exist. Once a lawful stop is initiated, established case law grants officers specific authority over vehicle occupants.</p>
        <div class="case-law-box">
          <div class="case-title">Pennsylvania v. Mimms, 434 U.S. 106 (1977)</div>
          <p>An officer may order the driver of a lawfully stopped vehicle to exit the vehicle as a matter of course — no additional justification required. The government\'s interest in officer safety outweighs the de minimis intrusion of requiring the driver to stand outside.</p>
        </div>
        <div class="case-law-box">
          <div class="case-title">Maryland v. Wilson, 519 U.S. 408 (1997)</div>
          <p>Mimms extends to passengers. Officers may order all occupants of a lawfully stopped vehicle to exit without articulating individualized justification. This authority exists independent of suspicion — it attaches to the lawful stop itself.</p>
        </div>
      </div>
      <div class="content-block">
        <h4>Extensions Beyond the Stop\'s Purpose</h4>
        <p>The duration of a traffic stop must be reasonably related to the purpose that justified it — checking documents, running plates, writing the citation. Any extension of the stop beyond that purpose requires independent reasonable suspicion of criminal activity.</p>
        <div class="case-law-box">
          <div class="case-title">Rodriguez v. United States, 575 U.S. 348 (2015)</div>
          <p>A stop prolonged beyond the time reasonably required to complete its mission — even by a de minimis amount — violates the Fourth Amendment absent reasonable suspicion of separate criminal activity. Officers may not delay return of documents or add investigative steps unrelated to the stop\'s purpose without articulable suspicion. However, Rodriguez does not restrict action on probable cause that develops during the lawful stop.</p>
        </div>
      </div>
      <div class="content-block">
        <h4>Probable Cause and the Automobile Exception in Pennsylvania</h4>
        <p>Pennsylvania does <strong>not</strong> follow the broad federal automobile exception. In <em>Commonwealth v. Alexander</em> (2020) the Pennsylvania Supreme Court overruled <em>Commonwealth v. Gary</em> (2014) and held that, under Article I, Section 8 of the Pennsylvania Constitution, a warrantless vehicle search requires <strong>both probable cause and exigent circumstances</strong> — obtaining a warrant is the default. Under <em>Commonwealth v. Barr</em> (2021), the odor of marijuana alone no longer establishes probable cause, though it remains a factor in the totality of the circumstances. Probable cause still requires specific, articulable facts supporting a reasonable belief that contraband or evidence of a crime is in the vehicle.</p>
        <p>Odor of marijuana from a vehicle has consistently been recognized by Pennsylvania courts as establishing probable cause. Document the odor specifically: where you detected it, its strength, the moment of detection, and any corroborating factors. Vague documentation creates suppression exposure at the preliminary hearing.</p>
        <div class="sop-box">
          <div class="sop-title">Probable Cause Documentation Standard</div>
          <p>When conducting a warrantless vehicle search, your report must establish the basis for probable cause with specificity — not conclusions. "Detected an odor of marijuana" is a conclusion. "Upon approaching the driver\'s window, detected a strong odor consistent with raw marijuana emanating from the vehicle interior" is documentation. The difference determines whether your evidence survives a suppression motion.</p>
        </div>
        <button class="btn-launch" onclick="startScenario('traffic-stops')">Proceed to Scenario Exercise →</button>
      </div>
    `;

/* ══════════════════════════════════════════
   SUPERVISOR OVERLAY — Traffic Stops (MTPD)
══════════════════════════════════════════ */
const SUPERVISOR_TRAFFIC_STOPS = `
  <div class="content-block">
    <h4>Supervisor Focus</h4>
    <h2>Traffic-stop arrests generate more suppression motions than almost any other category. On review, you are reading for three things: a lawful stop, a stop that wasn't unlawfully prolonged, and a search that had both probable cause and exigency.</h2>
    <p>Most traffic-stop cases are won or lost on details an officer can fix at the desk but a court cannot fix later: whether the stop was extended past its mission, whether occupant-removal authority was applied correctly, and whether a warrantless search met Pennsylvania's two-element standard. Your review is where those details get caught before they become a defense motion.</p>
  </div>
  <div class="content-block">
    <h4>Did the Stop Outlast Its Mission? — Rodriguez</h4>
    <h2>Even a few extra minutes can suppress the case.</h2>
    <p>Under Rodriguez v. United States, a stop prolonged beyond the time reasonably required to complete its mission — even by a de minimis amount — violates the Fourth Amendment absent independent reasonable suspicion. When you review a traffic-stop arrest, read the timeline: did the officer finish (or could have finished) the citation and then hold the driver for a dog sniff or unrelated questioning without articulating new suspicion? If so, the extension is the defect, and it is a search/seizure problem, not a writing problem. Rodriguez does not restrict action on probable cause that actually develops during the lawful stop — so the question on review is whether the report shows new, articulable suspicion arising before the stop's mission was complete.</p>
  </div>
  <div class="content-block">
    <h4>Occupant Authority and the PA Search Rule</h4>
    <ul class="key-points">
      <li><strong>Mimms / Wilson</strong> — Officers may order the driver (Mimms) and passengers (Wilson) out of a lawfully stopped vehicle as a matter of course, with no individualized justification. If a report over-justifies ordering occupants out — or an officer believed he needed suspicion to do so — that is a knowledge gap to coach, not a defect; the authority attaches to the lawful stop.</li>
      <li><strong>Alexander — PC plus exigency</strong> — Pennsylvania does not follow the broad federal automobile exception. Under Commonwealth v. Alexander, and consistent with MTPD Order 1.2, a warrantless vehicle search requires both probable cause and exigent circumstances; the warrant is the default. The most common review catch is a report establishing solid PC on a stopped, controlled vehicle with no exigency stated — secure the vehicle and get a warrant.</li>
      <li><strong>Barr — odor is a factor, not a basis</strong> — Under Commonwealth v. Barr, the odor of marijuana alone no longer establishes probable cause; it is one factor in the totality. A search resting on odor alone is a legal defect, not a documentation defect.</li>
    </ul>
  </div>
  <div class="content-block">
    <h4>Hold the PC Documentation to the Standard</h4>
    <p>Even when the search was lawful, the report has to prove it. The probable-cause documentation standard requires specificity, not conclusions: "detected an odor of marijuana" is a conclusion; "upon approaching the driver's window, detected a strong odor consistent with raw marijuana emanating from the vehicle interior," plus the corroborating factors in the totality, is documentation. On review, separate the two failure modes as always — a lawful search written conclusorily goes back for specificity; a search that lacked PC-plus-exigency, or rested on odor alone, is a legal defect no rewrite can cure.</p>
  </div>
  <div class="content-block">
    <h4>From Catch to Correction</h4>
    <p>Coach officers to document the stop's timeline as carefully as the search, and to articulate the totality behind probable cause. A pattern — stops routinely extended for sniffs without suspicion, or warrantless searches that never address exigency — is a training and supervisory issue you document and escalate. Every traffic-stop arrest you approve is one you are prepared to defend at a suppression hearing.</p>
  </div>
`;

function getTrafficStopSupervisorQuestions() {
  return [
    {
      scenario: 'You review a traffic-stop arrest. The timeline shows the officer completed the warning for the equipment violation, returned the driver\'s documents, and then held the driver an additional several minutes waiting for a K-9 to arrive for a sniff — with nothing in the report establishing new suspicion before the stop\'s mission was complete.',
      text: 'What is the correct supervisory assessment under Rodriguez v. United States?',
      options: [
        'Approve it — a short extension of a stop for a dog sniff is always permissible during any traffic stop.',
        'Return it only for a more detailed written description of how the K-9 sniff itself was conducted.',
        'Approve it on the basis that the K-9 sniff ultimately did find contraband inside the vehicle, treating the productive result of the search as after-the-fact confirmation that extending the stop to run the dog was justified, since the outcome proved the officer\'s instinct correct.',
        'Flag the extension as a seizure problem — Rodriguez holds that prolonging a stop beyond the time needed to complete its mission, even briefly, violates the Fourth Amendment absent independent reasonable suspicion, and the report shows none arose before the mission was complete.'
      ],
    },
    {
      scenario: 'An officer\'s report establishes solid probable cause to search a vehicle stopped on Sumneytown Pike, but the narrative shows the vehicle was stopped, the driver detained, and a second unit present. The officer searched at the roadside without a warrant and the report never addresses exigency.',
      text: 'What should your review flag?',
      options: [
        'Nothing needs to be flagged here — probable cause standing alone fully authorizes a warrantless vehicle search, so once the report establishes probable cause the roadside search is supported and the file can be approved as written and sent forward for charging.',
        'Approve it because the probable cause here is strong enough on its own to make exigency unnecessary.',
        'The missing exigency — under Commonwealth v. Alexander and MTPD Order 1.2, a warrantless vehicle search requires both probable cause and exigent circumstances; with the scene controlled, the officer should have secured the vehicle and obtained a warrant.',
        'The only issue is that the officer should have ordered the occupants out of the vehicle first.'
      ],
    },
    {
      scenario: 'An officer searched a vehicle based solely on the odor of marijuana, with nothing else in the totality documented. The vehicle was stopped and the occupants controlled.',
      text: 'How do you assess the basis for the search under Commonwealth v. Barr?',
      options: [
        'Approve it — the odor of marijuana, by itself, establishes probable cause to search the entire vehicle.',
        'Flag it — under Commonwealth v. Barr the odor of marijuana alone no longer establishes probable cause; it is one factor in the totality, so a search resting on odor alone is a legal defect, and exigency would still be required as well.',
        'Return it only for a more vivid and detailed written description of the marijuana odor the officer detected.',
        'Approve it on the basis that odor-of-marijuana cases are essentially never suppressed in Pennsylvania in practice, so the officer\'s reliance on the smell alone to justify the search is a safe bet that will hold up in court regardless of what the current case law technically says.'
      ],
    },
    {
      scenario: 'A new officer\'s report spends a paragraph justifying why he ordered the driver and passengers out of a lawfully stopped vehicle, stating he "developed enough suspicion to remove them." He seems to believe occupant removal requires individualized suspicion.',
      text: 'What do you address on review?',
      options: [
        'Coach the knowledge gap — under Mimms (driver) and Wilson (passengers), an officer may order occupants out of a lawfully stopped vehicle as a matter of course with no individualized justification; the authority attaches to the lawful stop itself.',
        'Direct him to always articulate individualized suspicion before removing any occupants, since the removal is itself a search.',
        'Flag the removal of the driver and passengers as an unlawful seizure of the occupants of the vehicle.',
        'Suppress the entire stop on the basis that the officer over-explained his actions in the report.'
      ],
    },
    {
      scenario: 'A traffic-stop search was lawful — the officer documented probable cause from multiple factors and articulated exigency. But the probable-cause section reads only: "Detected an odor of marijuana and the driver seemed nervous."',
      text: 'What does your review require?',
      options: [
        'Approve it — the search itself was lawful, so the wording of the probable-cause section does not really matter.',
        'Suppress the search outright yourself at the review stage simply because the conclusory word "nervous" appears in the officer\'s report, treating the presence of that single unsupported descriptor as fatal to the entire stop rather than as something to be cured by a more specific rewrite before filing.',
        'Return it for specificity — the probable-cause documentation standard requires facts, not conclusions: where the odor was detected, its strength and character, the moment of detection, and the specific behaviors behind "nervous" — because a lawful search still has to be proven in the report.',
        'Rewrite the probable-cause section of the report yourself, in order to save the officer some time.'
      ],
    },
    {
      scenario: 'During a lawful stop and before its mission was complete, an officer developed genuine, articulable new suspicion (open container in plain view, inconsistent travel story, visible contraband) and acted on it, extending the encounter.',
      text: 'Is this a Rodriguez problem on review?',
      options: [
        'Yes — any extension at all of a traffic stop\'s duration violates the rule in Rodriguez.',
        'Yes — the officer needed to obtain a warrant first, before extending the stop at all.',
        'No — but only because contraband was ultimately found during the extended portion of the encounter, so in your review\'s assessment it is the discovery itself that retroactively validates continuing the stop beyond its original traffic mission.',
        'No — Rodriguez does not restrict action on suspicion or probable cause that genuinely develops during the lawful stop; confirm the report documents the specific new facts that arose before the mission was complete.'
      ],
    },
    {
      scenario: 'A report relies on Commonwealth v. Gary — no longer good law — as if probable cause alone still authorizes a warrantless vehicle search in Pennsylvania.',
      text: 'How do you handle this on review?',
      options: [
        'Correct it — Commonwealth v. Gary was overruled by Commonwealth v. Alexander (2020); under current PA law a warrantless vehicle search requires both probable cause and exigent circumstances, so relying on it as current law is wrong.',
        'Approve it — under Pennsylvania law, probable cause alone is sufficient to search a vehicle without a warrant.',
        'Approve it as written, but ask the officer to also add a citation to Commonwealth v. Alexander.',
        'Suppress the search solely on the basis that an outdated case was cited in the report.'
      ],
    },
    {
      scenario: 'Over several weeks, one officer\'s traffic-stop arrests repeatedly show the stop extended for K-9 sniffs after the mission was complete with no documented new suspicion, and warrantless searches that never address exigency. You coached him on Rodriguez and Alexander after the first instance.',
      text: 'What is the appropriate supervisory response now?',
      options: [
        'Keep returning each deficient report to the officer individually as it comes in and continue coaching him only informally on each one, without ever escalating to documented corrective action or targeted training on the underlying Rodriguez and Alexander problems behind the pattern.',
        'Move to documented corrective action and targeted training on Rodriguez and the Alexander/Order 1.2 standard, because a repeated pattern after coaching is a supervisory and training issue with significant suppression and liability exposure; escalate as warranted.',
        'Quietly stop assigning the officer to any traffic enforcement, without documenting the underlying concerns.',
        'Approve the reports as-is to keep the cases moving, and revisit the whole issue at the officer\'s annual review.'
      ],
    },
  ];
}

/* ══════════════════════════════════════════
   SUPERVISOR SCENARIO — Traffic Stops (MTPD)
   You review Officer Calloway's Sumneytown Pike traffic-stop arrest.
   Fictional officer.
══════════════════════════════════════════ */
const SCENARIO_TRAFFIC_STOPS_SUP = {
  id: 'scenario-traffic-stops-sup',
  title: 'Supervisor Review — Sumneytown Pike Stop',
  location: 'Report Review Desk, Marlborough Township, PA',
  totalDecisions: 3,
  nodes: {
    'start': {
      type: 'scene',
      time: '02:05',
      weather: 'Clear, cold',
      unit: 'Shift Supervisor',
      narrative: [
        'Officer Calloway\'s arrest report from a traffic stop on Sumneytown Pike is in your queue. The stop began as an equipment violation and ended with a vehicle search and a narcotics recovery.',
        'Traffic-stop arrests draw suppression motions; your review is where the timeline and the search get tested first.'
      ],
      next: 'd1'
    },
    'd1': {
      type: 'decision',
      decisionNumber: 1,
      situation: 'The timeline shows Calloway finished the equipment warning and handed back the driver\'s documents, then held the driver several more minutes for a K-9 to arrive. The report states no new suspicion that arose before the warning was finished — Calloway just "had a feeling."',
      question: 'How do you handle the stop\'s duration?',
      options: [
        { text: 'Approve it — a short wait for a dog is a normal part of a traffic stop.', next: 'c1a', quality: 'bad', shortLabel: 'Approved an extended stop on a hunch' },
        { text: 'Flag the extension as a Rodriguez problem — the mission was complete and no independent suspicion was articulated, so holding the driver for the sniff is an unlawful seizure no rewrite fixes.', next: 'c1b', quality: 'good', shortLabel: 'Caught the Rodriguez extension' },
        { text: 'Return it for a better-written description of the K-9 deployment.', next: 'c1c', quality: 'risky', shortLabel: 'Treated a seizure defect as a writing issue' },
        { text: 'Approve it because the sniff led to the contraband.', next: 'c1d', quality: 'bad', shortLabel: 'Let the result excuse the seizure' },
      ]
    },
    'c1a': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'A Hunch Is Not Suspicion',
      heading: 'Holding the driver after the mission was done, on a feeling, is the Rodriguez violation.',
      narrative: [
        'You approved a stop that was prolonged past its mission with no articulable suspicion. At the suppression hearing the timeline tells the whole story, the evidence is suppressed, and your signature is on it.',
        '"Had a feeling" is exactly what Rodriguez does not permit.'
      ],
      legal: 'Rodriguez v. United States (2015): prolonging a stop beyond its mission, even de minimis, violates the Fourth Amendment absent independent reasonable suspicion.',
      next: 'd2'
    },
    'c1b': {
      type: 'consequence', outcomeClass: 'outcome-good', outcomeLabel: 'Caught the Extension',
      heading: 'You read the timeline and saw the seizure problem before the defense did.',
      narrative: [
        'You flag the post-mission extension: the warning was complete, documents were returned, and no new articulable suspicion was documented before the sniff. That is a Rodriguez seizure defect — a legal problem, not a wording one — and you route it accordingly rather than approving it.',
        'The timeline is the case; you read it like the suppression court will.'
      ],
      legal: 'Rodriguez v. United States (2015): no extension beyond the stop\'s mission without independent reasonable suspicion; suspicion that genuinely develops during the lawful stop is different.',
      next: 'd2'
    },
    'c1c': {
      type: 'consequence', outcomeClass: 'outcome-neutral', outcomeLabel: 'Wording Won\'t Save the Timeline',
      heading: 'A better-written sniff description does not cure a stop that outlasted its mission.',
      narrative: [
        'Returning it for prose treats a seizure defect as a documentation problem. If no suspicion arose before the mission was complete, no description of the K-9 deployment makes the extension lawful.',
        'This is a Rodriguez issue to flag, not a writing issue to polish.'
      ],
      legal: 'Rodriguez v. United States (2015): the defect is the unlawful extension itself; specificity cannot rehabilitate it.',
      next: 'd2'
    },
    'c1d': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'The Find Doesn\'t Cure the Seizure',
      heading: 'Suppression looks at the seizure, not the payoff.',
      narrative: [
        'Approving the stop because the sniff found drugs ignores that the extension was unlawful before the dog ever alerted. Courts suppress evidence obtained through an unlawfully prolonged stop regardless of what was found.',
        'The result does not launder the seizure.'
      ],
      legal: 'Rodriguez v. United States (2015): an unlawful extension taints what follows; the outcome does not validate the seizure.',
      next: 'd2'
    },
    'd2': {
      type: 'decision',
      decisionNumber: 2,
      situation: 'Set the timeline aside and assume new suspicion did arise lawfully, giving Calloway probable cause. The report shows the vehicle stopped, the driver out and controlled, a second unit on scene — and Calloway then searched the vehicle at the roadside without a warrant. The report never mentions exigency.',
      question: 'What do you flag about the search?',
      options: [
        { text: 'Nothing — probable cause authorizes the search in Pennsylvania.', next: 'c2a', quality: 'bad', shortLabel: 'Approved PC-only search' },
        { text: 'The missing exigency — under Alexander and MTPD Order 1.2 a warrantless vehicle search needs PC and exigency; on a controlled scene the lawful path was to secure the vehicle and get a warrant.', next: 'c2b', quality: 'good', shortLabel: 'Caught the missing exigency' },
        { text: 'Return it for a more detailed probable-cause write-up.', next: 'c2c', quality: 'risky', shortLabel: 'Confused the defect with the writing' },
        { text: 'Add a note that exigency existed because the car could be driven off.', next: 'c2d', quality: 'bad', shortLabel: 'Manufactured exigency' },
      ]
    },
    'c2a': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'PA Is Not the Federal Rule',
      heading: 'Probable cause alone does not get you into a vehicle in this Commonwealth.',
      narrative: [
        'You approved a warrantless search on PC alone with a controlled scene. Under Alexander and Order 1.2 that is suppression-bound — Pennsylvania requires exigency on top of probable cause.',
        'The strong PC is not the issue; the missing exigency is.'
      ],
      legal: 'Commonwealth v. Alexander (2020) and MTPD Order 1.2: a warrantless vehicle search requires both probable cause and exigent circumstances.',
      next: 'd3'
    },
    'c2b': {
      type: 'consequence', outcomeClass: 'outcome-good', outcomeLabel: 'Caught the Missing Exigency',
      heading: 'PC was there; exigency was not — and you flagged it before filing.',
      narrative: [
        'You hold the report and flag the warrantless roadside search on a controlled scene: under Alexander and Order 1.2 the lawful path was to secure the vehicle and seek a warrant. You route it as the legal issue it is, not a writing fix.',
        'This is the most common post-Alexander catch, and you made it at your desk instead of at a hearing.'
      ],
      legal: 'Commonwealth v. Alexander (2020); MTPD Order 1.2: probable cause plus exigency for a warrantless vehicle search, warrant as the default.',
      next: 'd3'
    },
    'c2c': {
      type: 'consequence', outcomeClass: 'outcome-neutral', outcomeLabel: 'Not a Writing Fix',
      heading: 'A better PC write-up does not supply the exigency the search lacked.',
      narrative: [
        'The probable cause is already strong; returning it for more PC detail aims at the wrong target. The defect is the absence of exigency on a controlled scene.',
        'Flag the exigency problem, not the prose.'
      ],
      legal: 'Commonwealth v. Alexander (2020); MTPD Order 1.2: exigency is a separate, required element a better PC paragraph cannot supply.',
      next: 'd3'
    },
    'c2d': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Don\'t Write In an Exigency',
      heading: 'A controlled scene is not an exigency, and inventing one on paper makes it worse.',
      narrative: [
        'A stopped vehicle with the driver out and a second unit present is not exigent, and adding a supervisor note claiming it could be driven off overstates the facts to fit the search. Defense counsel will take it apart and your credibility with it.',
        'Honestly flag the defect; do not paper over it.'
      ],
      legal: 'Commonwealth v. Alexander (2020); MTPD Order 1.2: exigency must be real and cannot be manufactured after the fact.',
      next: 'd3'
    },
    'd3': {
      type: 'decision',
      decisionNumber: 3,
      situation: 'Assume the search was ultimately lawful. The probable-cause section of the report reads, in full: "Detected an odor of marijuana and the driver seemed nervous, establishing probable cause to search."',
      question: 'How do you handle the probable-cause documentation?',
      options: [
        { text: 'Approve it — the search was lawful, so the wording is immaterial.', next: 'c3a', quality: 'risky', shortLabel: 'Approved conclusory PC language' },
        { text: 'Return it for specificity — where and how strong the odor, the moment of detection, the specific behaviors behind "nervous," and the corroborating totality — because odor alone is not PC under Barr and a lawful search still must be proven.', next: 'c3b', quality: 'good', shortLabel: 'Required specific PC documentation' },
        { text: 'Suppress the search yourself because "nervous" appears.', next: 'c3c', quality: 'bad', shortLabel: 'Overcorrected into suppression' },
        { text: 'Rewrite the probable-cause section yourself.', next: 'c3d', quality: 'bad', shortLabel: 'Authored the officer\'s PC' },
      ]
    },
    'c3a': {
      type: 'consequence', outcomeClass: 'outcome-neutral', outcomeLabel: 'Lawful but Undocumented',
      heading: 'A lawful search written in conclusions still loses at the hearing.',
      narrative: [
        'Approving "odor and seemed nervous" leaves a lawful search resting on conclusory language — and under Barr, odor alone is not PC, so the report needs the corroborating totality stated as facts. The defense will attack the gap whether or not the search was sound.',
        'Return it for the specifics before it becomes the record.'
      ],
      legal: 'Commonwealth v. Barr (2021): odor alone is not PC, only a factor in the totality. PC documentation standard: facts, not conclusions.',
      next: 'debrief'
    },
    'c3b': {
      type: 'consequence', outcomeClass: 'outcome-good', outcomeLabel: 'Documented to the Standard',
      heading: 'You held the PC section to specific, articulable facts.',
      narrative: [
        'You return it for where and how strong the odor was, when it was detected, the specific behaviors behind "nervous," and the other factors that together establish probable cause — because under Barr odor alone is not enough and the totality has to be on the page. The lawful search now reads like one.',
        'Specificity is the difference between evidence that survives a suppression motion and evidence that does not.'
      ],
      legal: 'Commonwealth v. Barr (2021): odor is a factor in the totality. PC documentation standard: specific, articulable facts establishing the basis for the search.',
      next: 'debrief'
    },
    'c3c': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Overcorrected',
      heading: 'The presence of "nervous" is a writing problem, not grounds to suppress.',
      narrative: [
        'Suppressing a lawful search because the report used the word "nervous" confuses a documentation weakness with a legal defect. The search was sound; the report just needs the specific facts behind the conclusions.',
        'Return it for specificity rather than throwing out good evidence.'
      ],
      legal: 'PC documentation standard: conclusory language is corrected by specificity; it does not, by itself, invalidate an otherwise lawful search.',
      next: 'debrief'
    },
    'c3d': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Not Yours to Write',
      heading: 'Authoring the officer\'s probable cause replaces his sworn account with yours.',
      narrative: [
        'Writing the PC section for Calloway substitutes your words for his observations and creates a credibility problem if he has to testify to facts he did not write. Return it with direction and let him document what he actually perceived.',
        'Direct the standard; he writes the facts.'
      ],
      legal: 'PC documentation standard: the report is the reporting officer\'s account; the supervisor directs correction, not authorship.',
      next: 'debrief'
    },
    'debrief': { type: 'debrief' },
  }
};
