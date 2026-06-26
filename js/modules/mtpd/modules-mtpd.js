/* ═══════════════════════════════════════════
   Arbiter LE — Module Definitions & Quiz Questions
═══════════════════════════════════════════ */

/* Supervisor track: the reading served to supervisors is the officer reading
   PLUS a command-lens overlay injected just before the scenario button. One
   source of truth for the base law (no duplicated legal text to drift); the
   resolver in app.js (activeContentHtml / activeQuestions) picks the supervisor
   variants when currentUser.track === 'supervisor'. Modules without supervisor
   variants fall back to the patrol content. */
function withSupervisorOverlay(base, overlay) {
  return base.replace(
    /(<button class="btn-launch"[^>]*>Proceed to Scenario Exercise →<\/button>)/,
    `</div>\n${overlay}\n  <div class="content-block">\n    $1`
  );
}

const MODULES = [
  {
    id: 'search-seizure',
    category: 'Constitutional Law',
    title: 'Search & Seizure — Fourth Amendment',
    description: 'Lawful search procedures, warrant requirements, and recognized exceptions under Pennsylvania law.',
    duration: '20–25 min',
    weekNumber: 1,
    contentHtml: READING_SEARCH_SEIZURE,
    supervisorContentHtml: withSupervisorOverlay(READING_SEARCH_SEIZURE, SUPERVISOR_SEARCH_SEIZURE),
    scenario: SCENARIO_SEARCH_SEIZURE,
    supervisorScenario: SCENARIO_SEARCH_SEIZURE_SUP,
    questions: getSearchSeizureQuestions(),
    supervisorQuestions: getSearchSeizureSupervisorQuestions(),
  },
  {
    id: 'use-of-force',
    category: 'Use of Force',
    title: 'Use of Force Continuum',
    description: 'Departmental policy, Graham v. Connor standards, and documentation requirements.',
    duration: '15–20 min',
    weekNumber: 2,
    contentHtml: READING_USE_OF_FORCE,
    supervisorContentHtml: withSupervisorOverlay(READING_USE_OF_FORCE, SUPERVISOR_USE_OF_FORCE),
    scenario: SCENARIO_USE_OF_FORCE,
    supervisorScenario: SCENARIO_USE_OF_FORCE_SUP,
    questions: getUseOfForceQuestions(),
    supervisorQuestions: getUseOfForceSupervisorQuestions(),
  },
  {
    id: 'report-writing',
    category: 'Documentation',
    title: 'Professional Report Writing',
    description: 'Accuracy, completeness, and legal defensibility of police reports.',
    duration: '10–15 min',
    weekNumber: 3,
    contentHtml: READING_REPORT_WRITING,
    supervisorContentHtml: withSupervisorOverlay(READING_REPORT_WRITING, SUPERVISOR_REPORT_WRITING),
    scenario: SCENARIO_REPORT_WRITING,
    supervisorScenario: SCENARIO_REPORT_WRITING_SUP,
    questions: getReportWritingQuestions(),
    supervisorQuestions: getReportWritingSupervisorQuestions(),
  },
  {
    id: 'crisis-intervention',
    category: 'Crisis Response',
    title: 'Crisis Intervention & De-Escalation',
    description: 'Recognizing mental health crises, de-escalation techniques, and CIT protocols.',
    duration: '20–25 min',
    weekNumber: 4,
    contentHtml: READING_CRISIS,
    supervisorContentHtml: withSupervisorOverlay(READING_CRISIS, SUPERVISOR_CRISIS),
    scenario: SCENARIO_CRISIS,
    supervisorScenario: SCENARIO_CRISIS_SUP,
    questions: getCrisisQuestions(),
    supervisorQuestions: getCrisisSupervisorQuestions(),
  },
  {
    id: 'domestic-violence',
    category: 'Domestic Violence',
    title: 'Domestic Violence Response',
    description: 'Response procedures, mandatory arrest authority, PFA enforcement, victim notifications, and required documentation under MTPD ALO 4.13.',
    duration: '20–25 min',
    weekNumber: 5,
    contentHtml: READING_DOMESTIC_VIOLENCE,
    supervisorContentHtml: withSupervisorOverlay(READING_DOMESTIC_VIOLENCE, SUPERVISOR_DOMESTIC_VIOLENCE),
    scenario: SCENARIO_DOMESTIC_VIOLENCE,
    supervisorScenario: SCENARIO_DOMESTIC_VIOLENCE_SUP,
    questions: getDomesticViolenceQuestions(),
    supervisorQuestions: getDomesticViolenceSupervisorQuestions(),
  },
  {
    id: 'vehicle-pursuits',
    category: 'Traffic & Pursuits',
    title: 'Motor Vehicle Pursuits',
    description: 'MTPD pursuit policy, termination criteria, prohibited tactics, stop stick deployment, and mandatory reporting under ALO 4.02.',
    duration: '15–20 min',
    weekNumber: 6,
    contentHtml: READING_VEHICLE_PURSUITS,
    supervisorContentHtml: withSupervisorOverlay(READING_VEHICLE_PURSUITS, SUPERVISOR_VEHICLE_PURSUITS),
    scenario: SCENARIO_VEHICLE_PURSUITS,
    supervisorScenario: SCENARIO_VEHICLE_PURSUITS_SUP,
    questions: getVehiclePursuitQuestions(),
    supervisorQuestions: getVehiclePursuitSupervisorQuestions(),
  },
  {
    id: 'leadership',
    category: 'Professional Development',
    title: 'Leadership & Supervision',
    description: 'Patrol-level leadership, supervisory decision-making, Terry standards, and mentoring junior officers.',
    duration: '20–25 min',
    weekNumber: 7,
    contentHtml: READING_LEADERSHIP,
    supervisorContentHtml: withSupervisorOverlay(READING_LEADERSHIP, SUPERVISOR_LEADERSHIP),
    scenario: SCENARIO_LEADERSHIP,
    supervisorScenario: SCENARIO_LEADERSHIP_SUP,
    questions: getLeadershipQuestions(),
    supervisorQuestions: getLeadershipSupervisorQuestions(),
  },
  {
    id: 'traffic-stops',
    category: 'Traffic & Contacts',
    title: 'Traffic Stops & Vehicle Contacts',
    description: 'Pennsylvania vehicle stop law, automobile exception, Mimms/Wilson authority, probable cause documentation, and Rodriguez limits.',
    duration: '20–25 min',
    weekNumber: 8,
    contentHtml: READING_TRAFFIC_STOPS,
    supervisorContentHtml: withSupervisorOverlay(READING_TRAFFIC_STOPS, SUPERVISOR_TRAFFIC_STOPS),
    scenario: SCENARIO_TRAFFIC_STOPS,
    supervisorScenario: SCENARIO_TRAFFIC_STOPS_SUP,
    questions: getTrafficStopQuestions(),
    supervisorQuestions: getTrafficStopSupervisorQuestions(),
  },
  {
    id: 'emotional-intelligence',
    category: 'Professional Development',
    title: 'Emotional Intelligence',
    description: 'Self-regulation, empathy in victim contacts, trauma-informed approach, and building cooperation with resistant subjects.',
    duration: '15–20 min',
    weekNumber: 9,
    contentHtml: READING_EI,
    supervisorContentHtml: withSupervisorOverlay(READING_EI, SUPERVISOR_EI),
    scenario: SCENARIO_EI,
    supervisorScenario: SCENARIO_EI_SUP,
    questions: getEIQuestions(),
    supervisorQuestions: getEISupervisorQuestions(),
  },
  {
    id: 'evidence-chain-of-custody',
    category: 'Investigations',
    title: 'Evidence & Chain of Custody',
    description: 'Proper evidence collection, packaging, documentation, and chain of custody integrity from first officer on scene through prosecution.',
    duration: '15–20 min',
    weekNumber: 10,
    contentHtml: READING_EVIDENCE,
    supervisorContentHtml: withSupervisorOverlay(READING_EVIDENCE, SUPERVISOR_EVIDENCE),
    scenario: SCENARIO_EVIDENCE,
    supervisorScenario: SCENARIO_EVIDENCE_SUP,
    questions: getEvidenceQuestions(),
    supervisorQuestions: getEvidenceSupervisorQuestions(),
  },
  {
    id: 'officer-wellness',
    category: 'Wellness',
    title: 'Officer Wellness',
    description: 'Recognizing operational stress injury and secondary trauma in yourself and your partners, and how to access support before a crisis.',
    duration: '15–20 min',
    weekNumber: 11,
    contentHtml: READING_WELLNESS,
    supervisorContentHtml: withSupervisorOverlay(READING_WELLNESS, SUPERVISOR_WELLNESS),
    scenario: SCENARIO_WELLNESS,
    supervisorScenario: SCENARIO_WELLNESS_SUP,
    questions: getWellnessQuestions(),
    supervisorQuestions: getWellnessSupervisorQuestions(),
  },
  {
    id: 'de-escalation',
    category: 'Use of Force',
    title: 'De-escalation',
    description: 'Verbal de-escalation techniques, crisis communication, time-distance-cover model, and tactical decision-making for mental health contacts.',
    duration: '15–20 min',
    weekNumber: 12,
    contentHtml: READING_DEESCALATION,
    supervisorContentHtml: withSupervisorOverlay(READING_DEESCALATION, SUPERVISOR_DEESCALATION),
    scenario: SCENARIO_DEESCALATION,
    supervisorScenario: SCENARIO_DEESCALATION_SUP,
    questions: getDeescalationQuestions(),
    supervisorQuestions: getDeescalationSupervisorQuestions(),
  },
];

function getSearchSeizureQuestions() {
  return [
    {
      scenario: 'You stop a vehicle for a defective headlight. The driver consents to a search. During the search, you locate a locked box in the trunk.',
      text: 'Regarding the scope of the consent, which statement is most accurate under Pennsylvania law?',
      options: [
        'General consent to search the vehicle includes all locked containers found inside.',
        'The scope of consent is measured by objective reasonableness — you must clarify whether the consent extends to the locked box or obtain specific additional consent.',
        'A locked container automatically establishes probable cause to search further without additional consent.',
        'You may force the lock open only if you have reasonable suspicion that it contains contraband.'
      ],
      correct: 1,
      feedback: 'Correct. Florida v. Jimeno (1991) established that the scope of consent is determined by objective reasonableness — what a reasonable person would have understood by the exchange. A general consent to search a vehicle does not automatically include a locked container. Clarify the scope or obtain specific consent.'
    },
    {
      scenario: 'You arrest a subject for disorderly conduct in a public parking lot. He is wearing a backpack at the time of the arrest.',
      text: 'Regarding search incident to arrest, which action is lawful?',
      options: [
        'You may search the backpack immediately, as it was on his person at the time of arrest.',
        'You may only search his person — a backpack is separate property requiring a warrant.',
        'You must secure the backpack and apply for a warrant before opening it.',
        'You may search the backpack only if you observe a weapon-shaped object through the fabric.'
      ],
      correct: 0,
      feedback: 'Correct. Chimel v. California (1969) established that a search incident to arrest extends to the person and the area within their immediate control at the time of arrest. A backpack being worn qualifies. Note: Arizona v. Gant (2009) significantly limits vehicle searches incident to arrest — know the distinction.'
    },
    {
      scenario: 'While on a consent search of an apartment, you observe a digital scale with white powder residue sitting openly on the kitchen counter.',
      text: 'Which doctrine authorizes seizure of the scale without a separate warrant?',
      options: [
        'Fruit of the poisonous tree — you were there on a different basis and cannot seize unrelated items.',
        'Plain view — you are lawfully present and the incriminating nature of the scale is immediately apparent.',
        'You cannot seize it without a separate warrant because your consent only covered what the occupant authorized.',
        'Exigent circumstances — the powder residue may be destroyed before a warrant can be obtained.'
      ],
      correct: 1,
      feedback: 'Correct. Under the plain view doctrine (Horton v. California, 1990), you may seize evidence without a warrant when you are lawfully present, the item is in plain view, and its incriminating character is immediately apparent. A scale with white powder residue in a residence meets this standard.'
    },
    {
      scenario: 'You stop a vehicle and develop probable cause to search based on the odor of marijuana. Your report later states only that the driver "appeared nervous" and you "detected an odor of marijuana."',
      text: 'What is the primary legal problem with this documentation in a Pennsylvania suppression hearing?',
      options: [
        'Nervousness alone can never contribute to a probable cause determination in Pennsylvania.',
        'The documentation uses conclusory language without the specific, articulable facts required to support the probable cause determination.',
        'Odor-based probable cause is no longer recognized in Pennsylvania following recent legislative changes.',
        'There is no legal problem — odor plus nervous behavior always establishes probable cause in Pennsylvania courts.'
      ],
      correct: 1,
      feedback: 'Correct. Pennsylvania courts require specific, articulable facts — not conclusory statements. "Appeared nervous" is a conclusion. A legally defensible report requires specificity: what specific behaviors, what odor characteristics, from what distance, and how your training and experience informed your assessment. Under Commonwealth v. Barr (2021), odor is only one factor in the totality of the circumstances — which makes specific, documented observations essential; a conclusory report cannot carry that analysis.'
    },
    {
      scenario: 'During a foot pursuit, a suspect tosses a bag into an open dumpster on the side of a private parking lot before you apprehend him.',
      text: 'Do you need a warrant to retrieve and search the bag?',
      options: [
        'Yes — it is located on private property and requires a warrant before you can access it.',
        'No — the suspect voluntarily abandoned the bag, relinquishing his Fourth Amendment expectation of privacy in it.',
        'No — the hot pursuit exception permits you to retrieve any evidence connected to the pursuit.',
        'Yes — abandonment only applies to property left in public locations, not private property.'
      ],
      correct: 1,
      feedback: 'Correct. When a person voluntarily abandons property, they forfeit their Fourth Amendment expectation of privacy in it. This is the abandonment doctrine. The location on private property is less determinative than the voluntary act of abandonment — courts look at whether the person intended to relinquish control over the item.'
    },
    {
      scenario: 'You respond to a call and the homeowner gives you permission to search the living room for a missing item. While searching, you enter the attached garage without being told you could.',
      text: 'Was your entry into the garage within the scope of the given consent?',
      options: [
        'Yes — consent to search the home includes all attached structures.',
        'No — consent is limited to the areas specifically described or reasonably implied by the consent given.',
        'Yes — garages are not protected under the Fourth Amendment because they are not living spaces.',
        'No — you needed a separate warrant to enter any room not explicitly named.'
      ],
      correct: 1,
      feedback: 'Correct. Consent is limited to the scope described or reasonably implied. Consent to search a living room does not automatically extend to an attached garage. If the consent was ambiguous about scope, you should have clarified before entering additional areas.'
    },
    {
      scenario: 'You stop a pedestrian and develop reasonable suspicion during the encounter. Before conducting a pat-down, the person states: "I do not consent to any search."',
      text: 'Which statement most accurately reflects your authority at this point?',
      options: [
        'The refusal eliminates all search authority — you cannot conduct a pat-down.',
        'If you have independent reasonable suspicion that the person is armed and dangerous, you may conduct a Terry pat-down for weapons regardless of their refusal to consent.',
        'Refusing consent is itself a basis to detain the person further for investigation.',
        'You may search only outer clothing because the person is already detained.'
      ],
      correct: 1,
      feedback: 'Correct. Terry v. Ohio (1968) established that a protective pat-down for weapons requires only reasonable suspicion that the person is armed and dangerous — it does not require consent. Consent is a separate authority. A refusal of consent does not eliminate Terry authority, nor does it extend your detention authority beyond what reasonable suspicion independently supports.'
    },
    {
      scenario: 'You are executing a search warrant for a residential address. The warrant specifically authorizes a search for stolen electronics.',
      text: 'Which item would you be authorized to seize under the plain view doctrine during execution of this warrant?',
      options: [
        'A locked safe — its contents might contain stolen electronics.',
        'A small bag of white powder on the kitchen counter with an incriminating nature immediately apparent.',
        'A cell phone, because electronics are specifically listed in the warrant.',
        'Documents on a desk that might identify co-conspirators.'
      ],
      correct: 1,
      feedback: 'Correct. The plain view doctrine (Horton v. California) permits seizure of items not named in the warrant when: (1) the officer is lawfully present, (2) the item is in plain view, and (3) the incriminating nature is immediately apparent. The white powder meets all three criteria. Locked safes, documents, and unlisted electronics do not independently satisfy the immediately apparent incriminating nature requirement without more.'
    },
  ];
}

function getUseOfForceQuestions() {
  return [
    {
      scenario: 'You respond to a domestic disturbance. A subject advances toward you holding a metal flashlight raised at shoulder height. He is approximately 25 feet away and not responding to your presence.',
      text: 'Under Graham v. Connor, which three factors are courts required to consider when evaluating the reasonableness of a use of force?',
      options: [
        'The severity of the crime at issue, whether the subject poses an immediate threat, and whether the subject is actively resisting or evading.',
        'The officer\'s intent, the subject\'s criminal history, and whether the subject sustained any injury.',
        'Whether verbal commands were given, whether a supervisor was notified, and whether the officer followed training.',
        'The number of officers present, the subject\'s mental state, and whether force was used only as a last resort.'
      ],
      correct: 0,
      feedback: 'Correct. Graham v. Connor (1989) established the objective reasonableness standard and requires courts to evaluate: (1) the severity of the crime at issue, (2) whether the subject poses an immediate threat to officers or others, and (3) whether the subject is actively resisting arrest or attempting to evade by flight. These three factors are the foundation of every use of force analysis in American law enforcement.'
    },
    {
      scenario: 'After a Taser deployment during a domestic disturbance call, your supervisor instructs you to complete a use of force report. Your body camera captured the full incident.',
      text: 'Under Pennsylvania law and department policy, which of the following is a reportable use of force?',
      options: [
        'Only deployments of CEW (Taser), OC spray, or physical control techniques that result in visible injury to the subject.',
        'Any use of force that results in a formal complaint by the subject or by a civilian witness to the encounter.',
        'Any intentional use of force against a person, including display of a weapon and verbal commands used to compel compliance in a threatening encounter.',
        'Only incidents that result in injury to the subject or the officer and are documented by a second responding officer.'
      ],
      correct: 2,
      feedback: 'Correct. Pennsylvania\'s use-of-force reporting requirements and department policy define reportable use of force broadly to include any intentional act used to compel compliance — including display of a weapon and verbal commands in circumstances where non-compliance would result in physical force. When in doubt, document. A report filed and not needed is far less damaging than a report that should have been filed and wasn\'t.'
    },
    {
      scenario: 'A use of force report states: "Subject was aggressive and I feared for my safety. I used verbal commands to gain compliance." Defense counsel argues the report does not satisfy the Graham standard.',
      text: 'Why is this documentation legally insufficient?',
      options: [
        'It fails to record the number of verbal commands issued, the exact words used, and the time that elapsed before compliance.',
        'It uses subjective, conclusory language rather than the specific, articulable facts required to establish objective reasonableness.',
        'It does not include the subject\'s criminal history or any record of prior interactions with the department.',
        'It is legally sufficient — an officer\'s stated fear for safety satisfies Graham v. Connor.'
      ],
      correct: 1,
      feedback: 'Correct. Graham v. Connor is evaluated from the perspective of a reasonable officer based on facts — not the officer\'s subjective feelings. "Feared for my safety" is a conclusion. A legally defensible report documents the specific facts: distance, the subject\'s actions, the weapon or threat, the speed of advance, and how each Graham factor applies. Courts and juries evaluate facts, not feelings.'
    },
    {
      scenario: 'You draw your firearm in response to a subject advancing with a raised aluminum flashlight from 25 feet. No shots are fired. The subject complies. Three weeks later you receive a civil rights complaint.',
      text: 'Which principle best describes why drawing a firearm as a first response — without verbal commands or less-lethal options — creates legal exposure in this situation?',
      options: [
        'Drawing a firearm is per se unlawful as a first response unless a supervisor has authorized lethal force in advance.',
        'A civil rights complaint automatically succeeds whenever an officer draws a firearm but does not discharge it.',
        'Pennsylvania law categorically prohibits drawing a firearm on any subject who has not first produced a firearm of their own.',
        'Graham v. Connor requires that the force used be proportionate to the threat as it actually existed, not the threat feared — a flashlight at 25 feet without prior commands may not justify a firearm as an initial response.'
      ],
      correct: 3,
      feedback: 'Correct. Graham evaluates whether the force was objectively reasonable given the totality of circumstances at the moment force was applied. A flashlight is a serious impact weapon — but at 25 feet, without first attempting verbal commands or less-lethal options, drawing a firearm as an opening response will face significant scrutiny. Proportionality and progression of force are central to the analysis.'
    },
    {
      scenario: 'During a use of force debrief, your sergeant asks why you advanced toward a subject holding an impact weapon rather than creating distance and issuing verbal commands.',
      text: 'What is the correct tactical and legal principle that applies to this situation?',
      options: [
        'Officers are required to close distance in order to minimize public exposure during use of force incidents.',
        'Advancing toward the subject demonstrates control of the situation and is the tactic most likely to reduce overall civilian risk.',
        'Distance is a tactical asset — closing on a subject with an impact weapon eliminates reaction time and removes force options. Verbal commands at distance are almost always the correct first response.',
        'The decision to close distance is always at the officer\'s discretion and is not reviewable under Graham.'
      ],
      correct: 2,
      feedback: 'Correct. Distance management is a fundamental officer safety and use of force principle. Closing on a subject with a raised impact weapon eliminates the reactionary gap — the time and space needed to assess and respond to an attack. The Tueller Drill (21-foot rule) illustrates how quickly this gap collapses. Verbal commands at distance give the subject an opportunity to comply and the officer a range of options. Advancing removes both.'
    },
    {
      scenario: 'An officer applies a control hold to a handcuffed, compliant subject who is seated in the patrol vehicle. The subject has not resisted since being cuffed. The hold causes injury.',
      text: 'How would courts most likely evaluate this under Graham v. Connor?',
      options: [
        'Courts would likely find the force unreasonable because a handcuffed, compliant subject presents no ongoing threat justifying continued force.',
        'The hold is likely justified, because the subject remained under arrest and in custody at the time.',
        'The hold is justified if the officer perceived any risk at all, regardless of the subject\'s compliance.',
        'Courts evaluate only whether the officer followed department policy — not the objective circumstances.'
      ],
      correct: 0,
      feedback: 'Correct. Graham v. Connor requires courts to evaluate whether force was objectively reasonable given the totality of the circumstances at the moment it was applied. A handcuffed, compliant subject who has not resisted presents minimal threat. Force applied in this context is likely to be found unreasonable. The threat assessment must reflect the current situation, not a prior state of resistance.'
    },
    {
      scenario: 'During a struggle, an officer uses a take-down that causes a subject to strike their head on the pavement. The officer followed department training exactly.',
      text: 'Does compliance with training automatically insulate the officer from civil liability under federal law?',
      options: [
        'Yes — documented compliance with department training establishes a complete defense to civil liability.',
        'Yes — qualified immunity always applies whenever an officer follows the procedures exactly as they were trained.',
        'No — officers are strictly liable any time a subject is injured during any use of force, regardless of reasonableness.',
        'No — department training sets the minimum standard; the constitutional standard of objective reasonableness is independent and may require more.'
      ],
      correct: 3,
      feedback: 'Correct. Department training and policy compliance is evidence of reasonableness but does not automatically satisfy the constitutional standard. Graham v. Connor establishes an independent objective reasonableness test. An officer who follows policy but applies force in a way that is constitutionally unreasonable under the totality of circumstances may still face § 1983 civil liability.'
    },
    {
      scenario: 'A subject who has been placed in handcuffs suddenly begins banging their head against the inside of the patrol vehicle door.',
      text: 'Which use of force option is most consistent with the use-of-force continuum in this situation?',
      options: [
        'No intervention is appropriate here, because the subject is only harming themselves and poses no threat to others.',
        'Attempt verbal intervention first, then apply the minimum force necessary to prevent the subject from injuring themselves, consistent with the threat level presented.',
        'Escalate immediately to the highest available force option in order to stop the behavior as quickly as possible.',
        'Remove the subject from the vehicle immediately, regardless of the amount of force that requires.'
      ],
      correct: 1,
      feedback: 'Correct. The use-of-force continuum requires force proportionate to the threat. A handcuffed subject engaging in self-harm presents a specific, limited threat. Verbal de-escalation is the starting point. If physical intervention becomes necessary, it should be the minimum needed to prevent injury — escalating only if that minimum proves insufficient. Removing the subject from the vehicle may be appropriate but should not require excessive force.'
    },
  ];
}

function getReportWritingQuestions() {
  return [
    {
      scenario: 'After a foot pursuit and use of force incident, you write your report from memory two hours later. At the preliminary hearing, defense counsel notes your report states the subject "immediately fled" — but body camera footage shows a 4-second pause between your approach and the subject\'s exit from the vehicle.',
      text: 'What does this discrepancy most directly demonstrate?',
      options: [
        'That body camera footage is generally inadmissible when it is used to challenge an officer\'s written report.',
        'That reports written from memory — without reviewing available footage or notes — risk inaccuracies that undermine an officer\'s credibility on the stand.',
        'That the officer knowingly filed a false report and may now face criminal charges for it.',
        'That the defense has no valid argument here, because small discrepancies like this are expected and fully admissible.'
      ],
      correct: 1,
      feedback: 'Correct. Memory degrades rapidly after a high-stress incident. Even minor discrepancies between a report and body camera footage — especially ones that can be attributed to imprecise language — give defense counsel an opening to challenge the officer\'s overall credibility. Best practice: review available footage and notes before writing, document as soon as safely possible after the incident, and use precise language grounded in verified facts.'
    },
    {
      scenario: 'You arrest a subject for resisting arrest after a foot pursuit. Your report documents the use of force as: "Subject resisted arrest. Force was used and was proportionate to the resistance encountered."',
      text: 'What is the fundamental legal problem with this documentation?',
      options: [
        'The report must include the subject\'s prior criminal history before it can be considered legally sufficient.',
        'The report is legally sufficient — courts routinely accept general use-of-force summaries from sworn law enforcement officers.',
        'The report should have been written by the supervising officer on scene, not by the officer who actually used force.',
        '"Resisted arrest" and "proportionate" are legal conclusions, not factual descriptions — they tell a reader what to conclude without providing the specific facts that support the conclusion.'
      ],
      correct: 3,
      feedback: 'Correct. "Resisted arrest" is a legal conclusion — it tells the reader what to conclude, not what happened. A legally defensible report requires specific, sequential facts: which body part moved, in which direction, what action the officer took in response, and what happened as a result. "Subject tensed both arms, pulled away, and rotated his body toward me. I applied a forward leg sweep" is defensible. "Subject resisted" is not.'
    },
    {
      scenario: 'Your partner arrived during the takedown phase of a foot pursuit incident. They did not witness the initial stop, the foot chase, or the beginning of the resistance. You ask them to write the use of force narrative because they have stronger writing skills.',
      text: 'Why is this approach legally problematic?',
      options: [
        'Police reports are sworn accounts of personal observations. Your partner cannot document your observations, your chase, or your use of force — only what they personally witnessed upon arrival.',
        'It is acceptable — joint partnership reports of this kind are standard practice during high-stress incidents.',
        'It is problematic only in the event that your partner happened to be off-duty at the time of the incident.',
        'It is only problematic if the case actually goes to trial — preliminary hearings do not require the reporting officer to testify.'
      ],
      correct: 0,
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
        'It doesn\'t create a problem — documentation of a stop is only required in cases where an arrest is actually made.',
        'It is a minor administrative issue that a supervisor can readily correct at some point after the fact.',
        'It creates a problem only in the event that the same vehicle is later stopped again by the same officer.',
        'Undocumented observations cannot be used to support probable cause in future encounters, cannot corroborate other departments\' investigations, and are lost entirely if the officer is later called to testify.'
      ],
      correct: 3,
      feedback: 'Correct. Every stop that generates observations — even stops that end without action — deserves documentation. Undocumented intelligence is lost intelligence. It cannot support a future probable cause determination, cannot corroborate another agency\'s investigation, and cannot be used to establish a pattern if the same subject is stopped again. Field intelligence is a law enforcement asset — if it isn\'t documented, it doesn\'t exist.'
    },
    {
      scenario: 'Your report documents that a subject "seemed nervous" during a traffic stop. Defense counsel objects that this is a conclusory opinion, not a fact.',
      text: 'How should officer observations be documented to withstand this challenge?',
      options: [
        '"Seemed nervous" is sufficient on its own — courts understand that officers routinely use this kind of experiential shorthand.',
        'Document the specific observable behaviors that led to that assessment: "Subject\'s hands were visibly trembling, voice elevated in pitch, avoided eye contact, and checked mirrors repeatedly after stopping."',
        'Replace "seemed nervous" with "appeared agitated," which is the more precise and defensible legal language.',
        'Omit the observation about nervousness entirely if it cannot be precisely quantified in the report.'
      ],
      correct: 1,
      feedback: 'Correct. Conclusory terms like "seemed nervous" or "appeared suspicious" are not facts — they are conclusions. Defense attorneys and courts will challenge them. The professional standard is to document the specific, observable behaviors that led to your assessment. Those specific facts speak for themselves and cannot be easily dismissed as officer opinion.'
    },
    {
      scenario: 'While completing your arrest report, you realize you forgot to document a witness statement that you took at the scene. The witness has since left the area.',
      text: 'What is the appropriate course of action?',
      options: [
        'Omit the statement — if you can no longer verify the specific details, it simply should not appear in the report.',
        'Insert the statement into the body of the original report as though it had been there from the very start.',
        'Document what you recall of the statement now, noting in the report that it was not captured in contemporaneous notes and that the account is from memory.',
        'Contact your supervisor first, before adding anything at all to a report you have already completed.'
      ],
      correct: 2,
      feedback: 'Correct. Omitting known facts weakens the case. Altering a completed report retroactively without disclosure is misconduct. The correct approach is to document the statement as a supplement or addendum, note that it was captured from memory rather than contemporaneous notes, and be transparent about that limitation. This preserves the information while maintaining your integrity.'
    },
    {
      scenario: 'A sergeant reviewing your report notes that your probable cause section reads: "Based on my training and experience, I believed the subject was involved in criminal activity."',
      text: 'What is the primary deficiency in this probable cause statement?',
      options: [
        'It is conclusory — it states your conclusion without documenting the specific articulable facts that led to it.',
        'It does not cite the specific Pennsylvania statute that the subject was believed to be violating.',
        'It references the officer\'s training and experience, which the courts categorically disallow.',
        'Probable cause of this kind does not actually need to be articulated anywhere in arrest reports.'
      ],
      correct: 0,
      feedback: 'Correct. Probable cause must be grounded in specific, articulable facts — not in an officer\'s general conclusion. "I believed" is a conclusion. The report must document: what you observed, what you heard, what was said, what you detected, and how those specific facts — viewed through your training and experience — established probable cause for the specific offense charged. The training and experience reference is valid, but only when tethered to stated facts.'
    },
  ];
}

function getCrisisQuestions() {
  return [
    {
      scenario: 'You respond to a welfare check. A neighbor reports a 31-year-old male has been in a mental health crisis for two days, has not taken his medication, and said "he didn\'t want to be here anymore." He is seated on his front porch when you arrive.',
      text: 'Under Pennsylvania\'s Mental Health Procedures Act (50 P.S. § 7302), what is required before an officer may initiate an involuntary examination (302)?',
      options: [
        'The subject must have a prior psychiatric history that is documented in law enforcement databases.',
        'A licensed mental health professional must be physically on scene to make the determination first.',
        'Two separate officers must independently agree that the subject meets the criteria for involuntary examination.',
        'The person must pose a clear and present danger to themselves or others based on a recent overt act, attempt, or threat — the officer must document the specific basis for the determination.'
      ],
      correct: 3,
      feedback: 'Correct. PA MHPA Section 302 authorizes involuntary examination when a person poses a clear and present danger based on a recent overt act, attempt, or threat to themselves or others. Officers must document the specific factual basis — a general mental health crisis or past history alone does not satisfy the standard. A statement like "not wanting to be here anymore," combined with medication non-compliance and a 2-day crisis, begins to establish criteria — but the officer must assess and document carefully.'
    },
    {
      scenario: 'You make initial contact with a subject in a mental health crisis. Your authoritative tone and direct approach cause him to snap upright, begin yelling, and retreat toward his front door.',
      text: 'What does this outcome illustrate about initial contact during mental health calls?',
      options: [
        'Mental health subjects are inherently unpredictable and the outcome cannot be attributed to the officer\'s approach.',
        'Authoritative commands are always appropriate during mental health calls because officers must establish control immediately.',
        'For individuals in mental health crisis, authoritative commands and direct approaches frequently trigger escalation rather than compliance — a calm, low-key approach reduces the risk of escalation.',
        'The officer should have waited for a trained mental health co-responder to arrive before making any contact at all.'
      ],
      correct: 2,
      feedback: 'Correct. Crisis Intervention Training (CIT) research consistently shows that individuals in mental health crisis respond to authoritative commands differently than non-crisis individuals. Commands that trigger compliance in normal encounters frequently trigger fight-or-flight responses in someone in acute distress. A calm, low-key approach — slow movement, quiet voice, non-threatening positioning — significantly reduces escalation risk. PA Act 59 of 2020 requires officers to consider de-escalation whenever it is safe and feasible.'
    },
    {
      scenario: 'A subject in a mental health crisis has been escalating. He is now pacing and yelling, but has no visible weapon and has not made a specific threat. Your partner has just arrived.',
      text: 'What is the most effective de-escalation technique at this stage?',
      options: [
        'Issue clear, authoritative commands for him to stop pacing and face you — establish control before re-engaging.',
        'Reduce your own volume and energy, create space, and wait for the escalation spike to pass before re-engaging.',
        'Immediately initiate a 302 involuntary examination — the situation has exceeded the threshold for voluntary intervention.',
        'Close distance to demonstrate confidence and prevent him from moving toward the residence.'
      ],
      correct: 1,
      feedback: 'Correct. When a person in mental health crisis reaches an escalation spike — elevated voice, physical agitation, non-responsive behavior — the most effective de-escalation technique is to reduce your own energy, not match it. Back off, lower your voice, and wait. Escalation spikes are self-limiting when they aren\'t fed. Matching volume, issuing commands, or closing distance during a spike almost always prolongs or worsens it. Give the spike time to pass, then re-engage with calm contact.'
    },
    {
      scenario: 'While talking with a subject on a welfare check, he discloses that there is "something inside he could use" if things got bad enough. He is still calm and making eye contact with you.',
      text: 'What is the most appropriate response to this disclosure?',
      options: [
        'Ask him directly and calmly what he means — "Are you telling me you have a gun inside?" — and respond based on his answer.',
        'Maintain the conversation as it is — addressing the disclosure directly could break the rapport you have built.',
        'Immediately back away from the porch and call for tactical support before continuing any contact.',
        'Tell him you need to go inside and secure whatever it is before you continue the conversation.'
      ],
      correct: 0,
      feedback: 'Correct. A disclosure of potential access to a means of self-harm cannot be ignored, but it also doesn\'t require breaking the therapeutic contact you\'ve established. A calm, direct clarifying question — asked in the same quiet tone — allows you to assess the actual threat level without triggering defensiveness. If he confirms a firearm, you can work toward voluntary surrender through the rapport you\'ve built. Ignoring the disclosure or over-reacting both carry significant risk.'
    },
    {
      scenario: 'You know from the subject\'s mother that he owns a shotgun stored in his hall closet. Your partner is arriving. The subject is seated on his porch and unaware you spoke to his mother.',
      text: 'How should knowledge of the shotgun affect your approach?',
      options: [
        'It should trigger a full tactical response — the presence of a firearm makes this a SWAT-level incident.',
        'It should not affect your approach at all — the firearm is inside the residence and the subject is outside on the porch.',
        'It should inform your tactical awareness and partner positioning without changing your calm, non-threatening approach posture — the goal is still de-escalation through contact.',
        'You should immediately request a 302 — access to a firearm combined with suicidal ideation satisfies the legal threshold.'
      ],
      correct: 2,
      feedback: 'Correct. Knowledge of a potential weapon changes your tactical awareness — where you position, where your partner stands, what you\'re watching for — but it does not change the fundamental approach principle for a mental health welfare check. The subject is a person in crisis, not a tactical threat. A calm, respectful approach remains the correct first contact. Your partner\'s positioning can account for the safety concern without that concern becoming visible in your demeanor or approach.'
    },
    {
      scenario: 'You arrive at a call and observe a subject sitting on a rooftop ledge, legs dangling, not responding to initial verbal contact. Witnesses say the subject has been there for 20 minutes.',
      text: 'What is the priority sequence for this CIT response?',
      options: [
        'Establish a safe perimeter, reduce stimulation, request CIT resources and mental health crisis team, and initiate calm, non-threatening verbal contact — one primary voice.',
        'Physical containment of the subject first, then verbal contact once the subject is safely in custody.',
        'Immediate forced intervention to pull him from the ledge — time on the ledge only creates increasing danger.',
        'Wait for a trained mental health professional to arrive on scene before attempting any engagement at all.'
      ],
      correct: 0,
      feedback: 'Correct. CIT protocol prioritizes a calm environment, single-officer verbal contact, and preservation of time and distance. Perimeter control reduces stimulation and prevents additional escalation. Requesting specialized resources early ensures they are available if needed. Immediate forced intervention in a high-ledge scenario carries extreme safety risk for both subject and officer. Waiting entirely for a clinician is not feasible — officers must initiate contact while resources respond.'
    },
    {
      scenario: 'During a mental health call, a subject begins making statements suggesting they may be experiencing command hallucinations. They are becoming increasingly agitated.',
      text: 'Which de-escalation approach is most appropriate when working with a subject experiencing possible psychosis?',
      options: [
        'Challenge the hallucinations directly — work to help them distinguish reality from the experience they are having.',
        'Request immediate psychiatric hold authority, since active psychosis automatically meets the § 302 criteria.',
        'Match the subject\'s emotional intensity and volume in order to build rapport with him quickly.',
        'Avoid confirming or challenging the hallucinations; focus on the person\'s emotional state and safety; use a calm, low tone; offer limited choices to restore a sense of control.'
      ],
      correct: 3,
      feedback: 'Correct. Challenging hallucinations can intensify distress and agitation. Confirming them may reinforce delusional thinking. CIT training teaches officers to work around the psychotic content by focusing on the emotional experience: "I can see this is really distressing for you." Offering limited choices ("Would you like to sit over here or stay where you are?") restores a sense of agency. Psychosis alone does not automatically meet § 302 criteria — it requires clear and present danger behavior.'
    },
    {
      scenario: 'You have been working a mental health call for 35 minutes using verbal de-escalation. The subject is calmer but still refusing all assistance. Your sergeant is asking for a status update and suggesting it may be time to "wrap it up."',
      text: 'How do you handle the supervisor\'s suggestion?',
      options: [
        'Follow the supervisor\'s direction without pushback and move the encounter toward a physical resolution now.',
        'Provide an honest status update: the subject is de-escalating, the approach is working, and an abrupt change in tactics at this point may re-escalate. Recommend continuing for a defined additional period.',
        'Tell the subject you have to leave shortly, which will prompt some kind of decision from them.',
        'Immediately initiate a § 302 hold — the time spent justifies the involuntary commitment.'
      ],
      correct: 1,
      feedback: 'Correct. De-escalation takes time — that is not a failure. Communicate progress honestly to your supervisor: the subject is calmer, the tactic is working, and an abrupt change in approach after 35 minutes of relationship-building can re-escalate the situation significantly. Propose a defined additional time window. Good supervisors support patient de-escalation when they receive clear status communication. § 302 requires evidence of clear and present danger — time spent on a call does not create that legal standard.'
    },
  ];
}


function getDomesticViolenceQuestions() {
  return [
    {
      scenario: 'You respond to a DV call and observe the victim has a fresh bruise consistent with her account that her husband struck her. She tells you she does not want to press charges and asks you to make him leave for the night.',
      text: 'Under MTPD ALO 4.13, what is your obligation?',
      options: [
        'If you have probable cause based on your observations or victim/witness statements, arrest of the primary aggressor is mandatory — victim consent is not a required element.',
        'Honor the victim\'s preference — she is the protected party and her consent controls the arrest decision.',
        'Consult with your supervisor before making an arrest. Mandatory arrest requires supervisor authorization when the victim objects.',
        'Make a report and refer the case to detectives for a follow-up arrest at a later date.'
      ],
      correct: 0,
      feedback: 'Correct. MTPD ALO 4.13 requires arrest of the primary aggressor in domestic violence incidents when probable cause exists — based on officer observations, victim statements, or witness statements. Victim preference does not control the arrest decision and is not a required element. A visible injury plus a consistent victim account establishes probable cause. The officer does not need the victim\'s consent or supervisor authorization to make the arrest.'
    },
    {
      scenario: 'You arrest a subject for Simple Assault of his wife. Upon securing him, you learn from his wife that there is a final PFA order in effect prohibiting him from possessing firearms. She tells you there are three firearms — two rifles and a handgun — in the bedroom closet.',
      text: 'What is your obligation regarding those firearms under MTPD ALO 4.13?',
      options: [
        'Advise the wife to secure the firearms herself and document the advisory in your report.',
        'Seize the firearms. A DV arrest combined with a protective order prohibiting possession triggers a mandatory firearms seizure obligation.',
        'Leave the firearms — the subject is already in custody and no longer has immediate access.',
        'Request a warrant before seizing firearms from a residence that is not the subject\'s primary address.'
      ],
      correct: 1,
      feedback: 'Correct. MTPD ALO 4.13 requires officers to seize firearms when a person is arrested for a domestic violence offense and is subject to a court order prohibiting firearm possession. Both conditions are present: a DV arrest and a confirmed final PFA order. The firearms are in the residence. The seizure is mandatory — not discretionary. Each seized firearm must be documented on a Property Record Form before end of shift per ALO 3.05/3.06.'
    },
    {
      scenario: 'You complete a DV arrest. The officer who investigated the prior incident at this address eight months ago elected not to arrest and wrote in the report only: "Parties separated for the evening. No arrest made."',
      text: 'Under MTPD ALO 4.13, what documentation standard applies when an officer has probable cause but elects not to arrest?',
      options: [
        'No additional documentation is required beyond noting in the report that no arrest was made.',
        'The officer must document the victim\'s refusal to cooperate with the investigation and prosecution.',
        'The officer must obtain supervisor sign-off in the report acknowledging the decision not to arrest.',
        'The narrative must contain a detailed explanation of the specific reasons probable cause was not found or the specific reasons the officer elected not to arrest — "No arrest made" is not sufficient.'
      ],
      correct: 3,
      feedback: 'Correct. MTPD ALO 4.13 requires a detailed explanation in the narrative when an officer has probable cause but elects not to arrest. "Parties separated for the evening. No arrest made." does not satisfy this requirement. The narrative must address specifically: whether probable cause existed, and if it did, the specific documented reasons for not arresting. This protects the department, documents the officer\'s decision-making, and creates a record for future incidents at the same address.'
    },
    {
      scenario: 'You are completing your DV incident report. The victim informed you of injuries she says she sustained that are not visible to you — she says her ribs are sore and believes she may have cracked one.',
      text: 'How should this reported but unobserved injury be documented under MTPD ALO 4.13?',
      options: [
        'Do not include unverified injuries in the report — document only what you directly observed.',
        'Photograph the area yourself and include your own assessment of whether the injury appears credible.',
        'Include the reported injury but clearly note that it was reported by the victim and not observed by the officer.',
        'Have the victim sign a separate written statement about the injury and attach it to your report.'
      ],
      correct: 2,
      feedback: 'Correct. The MTPD ALO 4.13 DV narrative checklist specifically requires documentation of both: injuries observed by the officer AND injuries reported by the victim but not observed — noted clearly as not observed. This distinction protects the officer from a later claim that an injury was concealed, while accurately representing the limits of the officer\'s personal observations. Both types of injury information belong in the narrative with clear attribution.'
    },
    {
      scenario: 'You are responding to a domestic disturbance. Dispatch advises possible DV in progress.',
      text: 'Under MTPD ALO 4.13, what is the required approach protocol for a domestic disturbance call?',
      options: [
        'Respond with full lights and sirens to establish rapid scene presence and deter ongoing violence.',
        'Approach the scene without lights or sirens within one block of the reported location to avoid alerting subjects and allow for tactical assessment before contact.',
        'Stage one full block away from the residence and wait for backup to arrive before making any approach.',
        'Approach code 3 to within a quarter mile, then switch to code 1 for the final approach.'
      ],
      correct: 1,
      feedback: 'Correct. MTPD ALO 4.13 requires officers to approach domestic disturbance calls without lights or sirens within one block of the reported location. This approach protects officers by allowing for tactical assessment before making contact — and prevents alerting subjects inside the residence that police are arriving, which could trigger escalation, flight, or violence against the victim. Response to DV calls presents unique officer safety risks, and the approach protocol is a specific safety measure, not a suggestion.'
    },
    {
      scenario: 'You respond to a domestic disturbance and both parties have visible injuries. Each claims the other was the primary aggressor.',
      text: 'Under MTPD ALO 4.13, how do you determine who to arrest?',
      options: [
        'Arrest both parties — dual injuries on both people categorically require a dual arrest here.',
        'Arrest neither party — the contradictory accounts simply create too much uncertainty to act.',
        'Arrest the party who first initiated the 911 call, since that person is more likely to be the victim.',
        'Evaluate the evidence to identify the primary aggressor: consider relative injury severity, prior history, threat of future harm, and whether one party acted in self-defense.'
      ],
      correct: 3,
      feedback: 'Correct. ALO 4.13 and Pennsylvania DV law require identification of the primary aggressor when both parties claim victimhood. Dual arrests are disfavored and should be rare. Relevant factors: comparative severity of injuries, any history at the address, statements made, evidence of defensive injury patterns, and whether one party acted in self-defense. Document your reasoning thoroughly — primary aggressor determinations are scrutinized in court.'
    },
    {
      scenario: 'A victim in a domestic violence case has a prior Protection From Abuse order against the offender. The offender is present at the victim\'s residence when you arrive.',
      text: 'What is your obligation regarding the PFA violation?',
      options: [
        'Arrest the offender for criminal contempt of the PFA. A PFA violation is a criminal offense in Pennsylvania — it is not a civil enforcement matter for officers.',
        'The PFA violation is a civil matter — refer the victim to court to report the violation herself.',
        'Document the violation and advise the victim on how to file a contempt petition with the court.',
        'Take no action at all on the PFA unless the victim specifically requests that you enforce it.'
      ],
      correct: 0,
      feedback: 'Correct. Under 23 Pa. C.S. § 6113, violation of a final PFA order is a criminal offense — indirect criminal contempt — and is not a civil matter. Officers who observe a violation have authority and obligation to arrest. Victim preference does not control the enforcement decision on a PFA violation any more than it does on the underlying assault. Document the violation, the PFA status, and your enforcement action.'
    },
    {
      scenario: 'After a DV arrest, you complete your ALO 4.13 notifications and documentation. The victim asks you: "What happens now? Will he be back tonight?"',
      text: 'What is your obligation and your appropriate response?',
      options: [
        'Tell her you are not able to predict what the court will ultimately do — that is the district attorney\'s job.',
        'Refer all of her questions to the district attorney\'s office, since officers should not discuss court proceedings.',
        'Provide the required victim notifications: explain the arrest process, bail considerations, available emergency PFA options, victim services contact, and the steps for requesting a court order if she does not have one.',
        'Assure her that the offender will be held in custody overnight, as a matter of standard department policy.'
      ],
      correct: 2,
      feedback: 'Correct. ALO 4.13 requires victim notification at the scene. This includes: explaining the charges filed, the likelihood of bail processing (which may mean release), how to obtain an emergency PFA if one is not in place, victim services contact information, and safety planning resources. Telling her you "cannot predict" the outcome without providing this framework abandons the notification requirement. Never make guarantees about detention — bail is a court function — but you must give her the information she needs to protect herself.'
    },
  ];
}

function getVehiclePursuitQuestions() {
  return [
    {
      scenario: 'You initiate a traffic stop for a broken taillight. The driver accelerates away. Within the first 30 seconds of pursuit, what is your required immediate action under MTPD ALO 4.02?',
      text: 'What must you do immediately upon initiating a vehicle pursuit?',
      options: [
        'Notify your backup unit and pursue until they arrive to establish a two-unit formation.',
        'Pursue until the vehicle is positively identified, then reassess the situation based on the offense.',
        'Immediately notify communications of: your unit, the nature of the offense, direction and approximate speed, and vehicle description — and request supervisor authorization.',
        'Contact dispatch only in the event that the pursuit extends beyond your assigned patrol sector.'
      ],
      correct: 2,
      feedback: 'Correct. MTPD ALO 4.02 requires immediate notification to communications upon initiating a pursuit, including your unit, nature of the offense, direction of travel, approximate speed, and vehicle description. Supervisor notification and authorization are required. This communication obligation is not optional and is not contingent on how long the pursuit lasts — it applies from the moment a vehicle fails to stop.'
    },
    {
      scenario: 'A pursuit is ongoing. You are the primary unit. A second patrol unit requests to join the pursuit, and a third unit is positioning to cut off the suspect ahead.',
      text: 'Under MTPD ALO 4.02, what is the maximum number of patrol units permitted to participate in a vehicle pursuit?',
      options: [
        'No limit — additional units improve safety through containment.',
        'Three units — a primary, a secondary, and one interdiction unit.',
        'Determined by supervisor discretion at the time of the pursuit.',
        'Two units maximum — any additional patrol units shall not join the pursuit.'
      ],
      correct: 3,
      feedback: 'Correct. MTPD ALO 4.02 sets a hard limit of two patrol units in any vehicle pursuit. A third unit may not join the pursuit regardless of operational rationale. If road interdiction is needed, stop sticks are the authorized tactical option — deployed by a unit not actively in pursuit, with supervisor authorization. "Additional units improve safety" is not an exception to the two-unit maximum.'
    },
    {
      scenario: 'A pursuit has been ongoing for two minutes. Dispatch confirms the suspect\'s identity as David Carr, 24, wanted on a misdemeanor bench warrant for failure to appear. Road conditions are wet. The suspect has entered a residential neighborhood at approximately 50 mph.',
      text: 'Which of the following best describes the correct termination analysis under MTPD ALO 4.02?',
      options: [
        'Terminate — when the suspect\'s identity is known and arrest can be accomplished by other means, combined with dangerous road conditions, the factors support termination.',
        'Continue — a bench warrant confirms the subject has failed to comply with the courts, justifying pursuit.',
        'Continue — the suspect\'s identity is not yet 100% confirmed from visual ID, only from the plate.',
        'Termination requires a supervisor order — an officer cannot unilaterally recommend that a pursuit be terminated.'
      ],
      correct: 0,
      feedback: 'Correct. MTPD ALO 4.02 lists specific termination factors including: the suspect\'s identity is known and arrest can be accomplished by other means, and when the danger to officers or the public outweighs the need for immediate apprehension. Both are present here: identity confirmed, misdemeanor warrant level offense, wet roads, residential neighborhood, 50 mph. Officers must continuously evaluate these factors and may recommend termination — supervisors may also order it. The subject does not need to be a flight risk from justice to have the pursuit terminated.'
    },
    {
      scenario: 'A pursuit is authorized and in progress. You identify an opportunity to execute a Precision Immobilization Technique (PIT) maneuver to end the pursuit.',
      text: 'Under MTPD ALO 4.02, what is the department\'s policy on PIT maneuvers?',
      options: [
        'PIT maneuvers are permitted with supervisor authorization at speeds below 45 mph.',
        'PIT maneuvers are prohibited under MTPD ALO 4.02.',
        'PIT maneuvers are permitted when the suspect poses an imminent threat of violence and no other option exists.',
        'PIT maneuvers require Chief of Police authorization before deployment.'
      ],
      correct: 1,
      feedback: 'Correct. MTPD ALO 4.02 specifically prohibits PIT (Precision Immobilization Technique) maneuvers. This is not a conditional prohibition — it is an absolute prohibition. Regardless of circumstances, supervisor authorization, or the nature of the offense, PIT maneuvers are not authorized under MTPD policy. The authorized alternative for vehicle interdiction is stop stick deployment, which requires supervisor authorization and is deployed by a unit not in active pursuit.'
    },
    {
      scenario: 'A pursuit is terminated per supervisor order. The suspect vehicle is last seen northbound on Geryville Pike. You have a positive ID on the driver.',
      text: 'What documentation is required following a terminated pursuit under MTPD ALO 4.02?',
      options: [
        'No report is required for a terminated pursuit — only completed pursuits resulting in arrest require documentation.',
        'Document the termination in your CAD notes and submit a supplemental report if the suspect is later apprehended.',
        'Submit a Use of Force Report, since the pursuit involved the use of emergency lights and siren equipment.',
        'A pursuit report must be completed. The supervisor is required to complete a Pursuit Review Form within 24 hours of any pursuit.'
      ],
      correct: 3,
      feedback: 'Correct. MTPD ALO 4.02 requires documentation of every pursuit — whether it results in apprehension or termination. The supervisor is required to complete a Pursuit Review Form within 24 hours. The officer documents: basis for initiation, notifications made, time and basis of termination, last known location, and suspect identity if known. All pursuit reports are reviewed at the command level. Documentation of a terminated pursuit is not optional — termination is a tactical decision that must be as thoroughly documented as any other use of police authority.'
    },
    {
      scenario: 'During a pursuit, a second officer joins without being directed to do so by dispatch or the supervisor. The primary unit does not object.',
      text: 'What does MTPD ALO 4.02 require regarding additional pursuit units?',
      options: [
        'The supervisor controls the number of units in a pursuit. Additional units require supervisor authorization, and the two-unit maximum applies regardless of officer initiative.',
        'Any officer who observes a pursuit may join it — it is a tactical decision made by each officer in the field.',
        'A second unit may join the pursuit automatically, since ALO 4.02 permits a total of two units.',
        'Additional units beyond two are allowed whenever the fleeing suspect is believed to be armed.'
      ],
      correct: 0,
      feedback: 'Correct. MTPD ALO 4.02 caps pursuit units at two and requires supervisor control over pursuit decisions, including unit count. A third officer joining on their own initiative violates policy regardless of the suspect\'s behavior or the primary unit\'s silence. The supervisor may authorize a second unit — but that authorization must exist. Document any unauthorized joining and notify the supervisor immediately.'
    },
    {
      scenario: 'You are the primary pursuit unit. The suspect enters a school zone during active school hours.',
      text: 'Under ALO 4.02, what does this circumstance require?',
      options: [
        'Continue the pursuit but reduce your speed to match the posted school zone speed limit.',
        'Continue the pursuit at normal speed — active school hours do not affect your pursuit authority.',
        'Immediately notify dispatch and the supervisor. The school zone during active hours is a mandatory termination factor — the pursuit must be discontinued.',
        'Terminate the pursuit only in the event that school children are actually visible in the area.'
      ],
      correct: 2,
      feedback: 'Correct. MTPD ALO 4.02 lists specific mandatory termination factors — circumstances under which the pursuit must end regardless of the suspect\'s offense. An active school zone during school hours is among the highest-risk environments and triggers mandatory termination. Notify dispatch and your supervisor immediately, document the termination reason, and shift to investigative follow-up. The risk to children and civilians outweighs the apprehension interest in virtually all circumstances.'
    },
    {
      scenario: 'A pursuit is terminated by supervisor order. The suspect is seen exiting the vehicle two blocks ahead and running into a residential area.',
      text: 'What are your obligations immediately after pursuit termination?',
      options: [
        'Continue following the suspect on foot — the termination order applied only to the vehicle pursuit itself.',
        'Stop your vehicle, document the suspect\'s last known location, description, and direction of travel, broadcast to dispatch, and await further direction from the supervisor.',
        'The case is effectively closed once the pursuit is terminated — simply document the termination and clear.',
        'Begin a foot pursuit independently, since supervisor authority does not extend to foot pursuit decisions.'
      ],
      correct: 1,
      feedback: 'Correct. Pursuit termination ends the vehicle pursuit. Your immediate obligations are: stop your vehicle safely, document the suspect\'s last known description, position, and direction of flight, and broadcast to dispatch. The supervisor then directs next steps — which may include perimeter establishment, K9, or area canvass. Initiating a unilateral foot pursuit into a residential area following a vehicle pursuit termination raises independent safety and policy concerns that require supervisor direction.'
    },
  ];
}

function getLeadershipQuestions() {
  return [
    {
      scenario: 'You are the senior officer on a call. A junior officer suggests running all subjects present without any individualized basis.',
      text: 'Under Terry v. Ohio, what is required before conducting an investigative stop of an individual?',
      options: [
        'The officer\'s general experience and instinct that something is wrong.',
        'Probable cause that a crime has actually been committed by the individual.',
        'Mere group presence in a designated high-crime area is sufficient.',
        'Individualized reasonable articulable suspicion of criminal activity.'
      ],
      correct: 3,
      feedback: 'Correct. Terry v. Ohio (1968) requires individualized, reasonable articulable suspicion of criminal activity before an investigative stop. Group presence does not supply the basis for individual stops. A senior officer who corrects this in the field prevents a Fourth Amendment violation and trains the junior officer for future calls.'
    },
    {
      scenario: 'A hotel manager has called twice about teenagers loitering in their parking lot. There is no posted trespass signage and no prior warning given to the subjects.',
      text: 'Under 18 Pa. C.S. § 3503, what is required before a trespass enforcement is lawful?',
      options: [
        'The property must be posted with conspicuous signage, fenced to exclude intruders, or the subject must have received prior direct communication that entry is prohibited.',
        'The property owner\'s verbal request to the officers on scene is sufficient to authorize trespass enforcement.',
        'Any commercial property that is open to the general public is exempt from the trespass protections.',
        'Repeated calls to the police by the property owner are enough to establish the required legal notice.'
      ],
      correct: 0,
      feedback: 'Correct. 18 Pa. C.S. § 3503 requires that property be posted with conspicuous signage, fenced in a manner designed to exclude intruders, or that the subject have received direct prior communication that entry is not permitted. An owner\'s call to police does not substitute for proper notice. Advise the owner on the formal trespass process rather than taking unlawful enforcement action.'
    },
    {
      scenario: 'After a call, a junior officer expresses frustration with your approach, saying it took longer than necessary.',
      text: 'According to PERF research, what is the strongest predictor of supervisory readiness in patrol officers?',
      options: [
        'Total years of service and seniority.',
        'Number of arrests and enforcement statistics.',
        'Demonstrated judgment in ambiguous situations.',
        'Performance on written promotional examinations.'
      ],
      correct: 2,
      feedback: 'Correct. Police Executive Research Forum (PERF) research identifies demonstrated judgment in ambiguous situations as the top predictor of supervisory readiness — not seniority or test scores. Officers who make consistent, law-grounded decisions in unclear situations, and who correct others through those situations, demonstrate the core supervisory competency before ever holding the rank.'
    },
    {
      scenario: 'A junior officer made an error on a recent call. You want to correct the behavior.',
      text: 'What is the most effective and professionally appropriate method for correcting a junior officer\'s conduct?',
      options: [
        'Address it on scene to reinforce the standard in real time while the situation is fresh.',
        'Address it privately and directly, one-on-one, without an audience.',
        'Document the error in writing and submit to the chain of command for formal action.',
        'Wait for the annual evaluation period to address behavioral patterns.'
      ],
      correct: 1,
      feedback: 'Correct. Corrections to junior officer conduct are most effective when delivered privately and directly, without an audience. Public corrections damage working relationships, create resentment, and close down the learning. A brief, private, law-grounded correction — delivered calmly — builds the officer rather than shuts them down. MTPD ALO 1.01 supports addressing concerns through proper channels, not in the field in front of personnel or the public.'
    },
    {
      scenario: 'You make a call on a difficult scene that a supervisor later questions. The outcome was not ideal but your reasoning was sound.',
      text: 'Which behavior best demonstrates the accountability that supervisory leaders are known for?',
      options: [
        'Owning the decision and the outcome, explaining your reasoning, and identifying what you\'d do differently.',
        'Documenting that the conditions you faced made any other outcome impossible.',
        'Identifying which other factors and personnel contributed to the outcome.',
        'Deferring to the supervisor\'s assessment to preserve the working relationship.'
      ],
      correct: 0,
      feedback: 'Correct. Accountability means owning the decision and the outcome — good or bad — explaining the reasoning behind it clearly, and identifying what you\'d change. This is distinct from blame (pointing outward) and from self-flagellation (collapsing under the critique). Officers who demonstrate this pattern consistently earn supervisory trust faster than any other quality. It is the leadership behavior that gets noticed without requiring a sergeant\'s badge.'
    },
    {
      scenario: 'You are acting as a field supervisor when two officers under your supervision begin a verbal dispute in the station parking lot over a call handling decision. Other officers are watching.',
      text: 'What is the appropriate supervisory response?',
      options: [
        'Let them resolve it themselves — interpersonal disputes among officers are not supervisor business.',
        'Take sides openly with the officer whose position on the call you personally believe is the more sound one.',
        'Separate them immediately, move the conversation out of public view, hear both perspectives individually, and address the conduct and the underlying issue separately.',
        'Document the dispute in writing and submit it up the chain of command without intervening yourself.'
      ],
      correct: 2,
      feedback: 'Correct. Public disputes among officers damage unit cohesion and public trust. The first priority is de-escalation: separate the parties and move the conversation to a private setting. Then address the conduct (the public dispute) and the underlying issue (the disagreement about the call) as two distinct matters. Taking sides publicly undermines your credibility as a supervisor with both officers and the watching team. Document as appropriate, but intervention — not documentation — is the immediate response.'
    },
    {
      scenario: 'An officer under your supervision has been late to shift three times in two weeks. You have not formally addressed it yet. The officer is otherwise a strong performer.',
      text: 'What is the supervisory best practice at this stage?',
      options: [
        'Wait for a fourth occurrence before taking any action — three lateness instances is within normal variation.',
        'Have a direct, documented conversation now: name the pattern, state the expectation clearly, and ask if there is something you should know. Give the officer the opportunity to respond before any formal action.',
        'Issue a formal written reprimand to the officer immediately, in order to establish a record of the lateness.',
        'Mention it casually to the officer — a formal conversation would be disproportionate for a performance issue.'
      ],
      correct: 1,
      feedback: 'Correct. Three occurrences in two weeks is a pattern that requires direct supervisor engagement. Waiting creates a pattern of unchallenged conduct. A formal written reprimand without a prior conversation skips the coaching step. The correct approach is a direct, documented conversation: state what you observed, set the expectation, listen for context (there may be a wellness or personal issue), and document the conversation. This protects the officer, you, and the department if escalation becomes necessary.'
    },
    {
      scenario: 'A subordinate officer comes to you frustrated about a department policy they believe is unfair. The policy is set at the command level and is not one you have authority to change.',
      text: 'What is the appropriate supervisory response?',
      options: [
        'Agree with the officer openly and validate their frustration about the policy — it builds trust with the squad.',
        'Tell the officer that department policies are not up for discussion and redirect them back to their duties.',
        'Promise to raise the issue at the next supervisors\' meeting, and then do not actually follow through on it.',
        'Acknowledge their concern, explain what the policy requires and why it exists to the extent you know, and encourage them to raise concerns through the appropriate channel (union, chain of command, formal feedback process) if they believe it warrants review.'
      ],
      correct: 3,
      feedback: 'Correct. Officers who feel unheard disengage. Dismissing the concern damages trust. Agreeing and venting with a subordinate about command decisions undermines your authority and theirs. The professional response: acknowledge the concern, explain the policy to the best of your knowledge, and direct them to the proper channel for formal feedback. This respects their voice while reinforcing the chain of command and your own professional standing.'
    },
  ];
}

function getTrafficStopQuestions() {
  return [
    {
      scenario: 'You conduct a lawful traffic stop for an equipment violation. After making contact with the driver, you determine you want him to step out of the vehicle.',
      text: 'Under Pennsylvania v. Mimms, what is required before ordering a driver to exit a lawfully stopped vehicle?',
      options: [
        'Reasonable suspicion that the driver is armed or otherwise presently dangerous.',
        'No additional justification — Mimms authorizes ordering the driver out as a matter of course.',
        'Probable cause of a separate criminal offense beyond the traffic violation.',
        'The driver must first be informed of the specific reason before being ordered to exit.'
      ],
      correct: 1,
      feedback: 'Correct. Pennsylvania v. Mimms (1977) established that officers may order the driver of a lawfully stopped vehicle to exit as a matter of course, without articulating additional justification. The government\'s interest in officer safety during a traffic stop outweighs the minimal intrusion of requiring the driver to stand outside. Maryland v. Wilson (1997) extends this authority to all passengers.'
    },
    {
      scenario: 'You stop a vehicle for a broken taillight. After issuing the warning and preparing to return the driver\'s documents, you decide to ask for consent to search the vehicle. The driver says no.',
      text: 'Under Rodriguez v. United States, what must you do at this point?',
      options: [
        'You must return the documents and allow the driver to leave — no independent basis for extension exists.',
        'You may detain the vehicle briefly at the roadside while waiting for a K9 unit to arrive on scene.',
        'You may continue asking the driver follow-up questions to develop reasonable suspicion before releasing him.',
        'The driver\'s refusal to consent is itself reasonable suspicion, which justifies a continued detention.'
      ],
      correct: 0,
      feedback: 'Correct. Rodriguez v. United States (2015) prohibits extending a stop beyond its lawful purpose without independent reasonable suspicion. Once the citation is issued and documents are ready to be returned, the stop\'s purpose is complete. Refusal to consent is not reasonable suspicion — exercising a constitutional right cannot be used as the basis for detention. Without independent articulable suspicion, you must return the documents and allow departure.'
    },
    {
      scenario: 'During a traffic stop, you detect a strong odor of marijuana emanating from the interior of the vehicle. The registration and license are clean.',
      text: 'Under current Pennsylvania law, what does the odor of marijuana emanating from a vehicle establish?',
      options: [
        'Probable cause to conduct an immediate warrantless search of the entire vehicle.',
        'Reasonable suspicion that automatically authorizes a K9 sniff of the vehicle\'s interior.',
        'Nothing at all — after recent case law the odor of marijuana is now legally irrelevant.',
        'One factor in the totality of the circumstances — by itself it no longer establishes probable cause.'
      ],
      correct: 3,
      feedback: 'Correct. Commonwealth v. Barr (2021): because medical marijuana is lawful in Pennsylvania, the odor of marijuana alone no longer establishes probable cause — but it remains a legitimate factor in the totality of the circumstances. And Commonwealth v. Alexander (2020) overruled Commonwealth v. Gary (2014): a warrantless vehicle search now requires both probable cause AND exigent circumstances, with a warrant as the default. Document the specific basis — where the odor was detected, its strength, and the corroborating factors that, together, build probable cause.'
    },
    {
      scenario: 'You have obtained a search warrant for a vehicle based on probable cause developed during a lawful stop. As you begin executing the warrant, the driver says loudly: "I don\'t consent to this search."',
      text: 'How does the driver\'s objection affect the legality of your search?',
      options: [
        'The objection requires you to stop the search and seek the driver\'s consent before proceeding any further.',
        'The objection is a valid invocation of Fourth Amendment rights that suspends the search.',
        'The objection is irrelevant — a search authorized by a warrant does not depend on the subject\'s consent.',
        'You must immediately terminate the search and apply to the court for an entirely new warrant.'
      ],
      correct: 2,
      feedback: 'Correct. A search warrant is judicial authorization; it does not depend on the subject\'s consent, and an objection — however emphatic — does not suspend it. Document the driver\'s statement verbatim in your report as relevant context, but it does not alter the lawfulness of a warrant-authorized search. (Under Commonwealth v. Alexander (2020), a warrantless vehicle search in Pennsylvania requires both probable cause and exigent circumstances, so a warrant is the default path.) If he physically interferes with the search, that is a separate criminal matter.'
    },
    {
      scenario: 'You are preparing the affidavit of probable cause for a vehicle search warrant. Your draft currently reads: "Upon approaching the vehicle, I detected an odor of marijuana."',
      text: 'What is the most significant problem with this probable cause documentation?',
      options: [
        'It is a conclusion without the specific, articulable facts that support it — insufficient for a suppression hearing.',
        'It does not include the driver\'s verbal response to the request to search the vehicle.',
        'It does not specify which one of the officers on scene actually detected the odor.',
        'It relies on the odor of marijuana, which can no longer be mentioned at all in a warrant affidavit.'
      ],
      correct: 0,
      feedback: 'Correct. "Detected an odor of marijuana" is a conclusion, not documentation of probable cause. At a suppression hearing, the Commonwealth must establish the factual basis for probable cause with specificity. Proper documentation includes: the precise location where the odor was detected (e.g., "upon approaching the driver\'s open window"), the strength and character of the odor, when it was detected relative to the contact, and any corroborating behavioral observations. Vague probable cause language is the most common suppression vulnerability in vehicle search cases in Pennsylvania.'
    },
    {
      scenario: 'During a routine traffic stop, the driver produces a valid driver\'s license but no registration. The driver states the registration is in the mail and shows you a receipt for a recently purchased vehicle.',
      text: 'What is the appropriate course of action?',
      options: [
        'Issue a citation for the failure to produce a registration and have the vehicle impounded from the scene.',
        'Verify the vehicle\'s status through your MDT, document the driver\'s explanation and the receipt, and use discretion consistent with department policy — temporary registration documentation may be verifiable.',
        'Release the driver without taking any documentation — the purchase receipt is sufficient proof of ownership.',
        'Arrest the driver for operating a vehicle without registration until ownership can be fully confirmed.'
      ],
      correct: 1,
      feedback: 'Correct. A recent vehicle purchase may explain absent registration. MDT checks can verify recent sales and registration status. Discretion — guided by department policy and the totality of the circumstances — is appropriate here. Document what you observed, what the driver provided, and what your check returned. Impoundment and arrest are disproportionate responses to a verifiable, plausible explanation. Thorough documentation protects you regardless of the disposition.'
    },
    {
      scenario: 'You stop a vehicle and develop reasonable articulable suspicion that the driver may be impaired. The driver performs adequately on field sobriety tests but you still have concerns based on your observations.',
      text: 'What is the appropriate next step?',
      options: [
        'Make the arrest anyway based on your gut feeling — officers have broad discretion in DUI cases like this.',
        'Release the driver now — passing the field sobriety tests is a complete and total defense to a DUI arrest.',
        'Document your specific observations thoroughly, consider requesting a DRE evaluation if available, and make an arrest decision based on the totality of articulable, documented facts — not on intuition alone.',
        'Administer a preliminary breath test at the scene and arrest only if it returns a result above .08.'
      ],
      correct: 2,
      feedback: 'Correct. DUI arrests require probable cause grounded in specific articulable facts. Passing SFSTs reduces the available PC but does not automatically eliminate it — impairment can be drug-based, and not all impairment registers on breath tests. A Drug Recognition Expert (DRE) evaluation may establish additional facts. Whatever your decision, document every observation: driving pattern, physical indicators, performance on each SFST component, and any statements. Arrests made on intuition without documented PC do not survive prosecution.'
    },
    {
      scenario: 'You conduct a traffic stop on a vehicle registered to someone with a felony warrant. The driver\'s license comes back to a different person with no warrants. The driver matches the physical description of the registered owner.',
      text: 'What is your legal authority and appropriate approach?',
      options: [
        'Arrest the driver immediately — the vehicle is registered to a subject with an active felony warrant.',
        'The plate return is not sufficient — release the driver, since the presented license came back clean.',
        'Run the presented license only — if that license comes back clean, then the traffic stop must end.',
        'You have reasonable suspicion to investigate further. Ask the driver to step out, request additional identifying information, and determine through investigation whether the driver is the registered owner or another person.'
      ],
      correct: 3,
      feedback: 'Correct. A vehicle registered to a felony warrant subject, combined with a driver who physically matches that subject, provides reasonable suspicion to investigate further even when the presented license comes back to a different name. People use false identification. Requesting additional information and extending the stop for this specific investigation purpose is lawful under Terry. Document the specific articulable facts supporting your continued investigation. An arrest requires probable cause established through the investigation — not just the plate return.'
    },
  ];
}

function getEIQuestions() {
  return [
    {
      scenario: 'You arrive for a follow-up welfare check on a domestic violence victim. She answers the door with crossed arms and says she doesn\'t want to talk.',
      text: 'According to IACP research, what is the strongest predictor of victim cooperation with the criminal justice process?',
      options: [
        'The severity of the documented injuries from the original incident.',
        'Whether the victim has retained a private attorney.',
        'Officer demeanor in the first 60 seconds of the victim contact.',
        'The number of prior DV incidents on record at the address.'
      ],
      correct: 2,
      feedback: 'Correct. IACP research consistently identifies officer demeanor in the first 60 seconds of a victim contact as the strongest predictor of victim cooperation. Victims who experience the initial contact as controlling, dismissive, or skeptical are significantly less likely to provide statements or pursue protective orders. The officer\'s emotional approach is not separate from the investigation — it is part of it.'
    },
    {
      scenario: 'A DV victim presents as hostile and minimizes the incident, saying nothing happened and she just wants everyone to leave.',
      text: 'What is the most accurate interpretation of this behavior from a trauma-informed perspective?',
      options: [
        'The victim is likely being deceptive and may even be filing a false report against him.',
        'The victim\'s demeanor indicates the incident was minor and enforcement action may be unwarranted.',
        'Hostility toward the police indicates the victim may be under the direct control of the suspect.',
        'This is a normal trauma response — hostility and minimization are self-protective behaviors common in DV victims.'
      ],
      correct: 3,
      feedback: 'Correct. Hostility, minimization, and recantation are normal trauma responses in domestic violence victims — they are not indicators of deception. These behaviors stem from fear, shame, prior negative law enforcement experiences, and the complex dynamics of abusive relationships. A trauma-informed officer recognizes this pattern and adjusts their approach accordingly rather than misreading it as uncooperativeness or deception.'
    },
    {
      scenario: 'A DV victim says: "He\'s going to be out soon anyway. I know how this works." She appears fearful but resigned.',
      text: 'What is the most appropriate and professionally sound response?',
      options: [
        'Reassure her that he will not be released from custody anytime soon, in order to build her confidence.',
        'Provide accurate information about the arraignment process, the victim advocate program, and the PFA option — honest and actionable.',
        'Explain that you cannot make predictions about the criminal justice process and redirect to your required documentation.',
        'Tell her that her own cooperation with the case will directly influence whether he stays in custody.'
      ],
      correct: 1,
      feedback: 'Correct. DV victims with prior experience in the justice system know when they are being given false reassurance — and when it happens, it destroys the trust you were building. The professionally sound response is accurate information: what the arraignment process looks like, what a PFA order is and how to get one today, and how to reach the victim advocate. Honest and actionable beats reassuring and inaccurate every time. Providing misleading information about custody violates MTPD ALO 4.13 notification requirements.'
    },
    {
      scenario: 'During a follow-up contact, a DV victim shows you a bruise on her arm that was not documented in the original report.',
      text: 'What is the correct documentation action?',
      options: [
        'Document the injury in a supplemental report, including a description of the injury, its location, the victim\'s account of how it occurred, and any photographs taken.',
        'Note the bruise verbally in your CAD entry for the call and follow up on it at the next victim contact.',
        'The follow-up contact is welfare only — injuries discovered during welfare checks are documented by the detective assigned to the case.',
        'Document it only if the victim signs a medical release authorizing you to include her injury in official reports.'
      ],
      correct: 0,
      feedback: 'Correct. Evidence identified during follow-up contacts is still evidence. A supplemental report must document the injury with specificity: location on the body, approximate size and coloration, the victim\'s statement about when and how it occurred (clearly attributed to her), and whether photographs were taken. Follow-up contact documentation is not secondary to the original report — in many DV cases it contains the most damaging evidence. There is no medical release requirement for documenting observable injuries.'
    },
    {
      scenario: 'Self-regulation is described in emotional intelligence research as a critical law enforcement skill.',
      text: 'In a law enforcement context, what does self-regulation most accurately describe?',
      options: [
        'Completing all required reports and documentation within the established department timeframes.',
        'Regulating the use of force down to the minimum amount required by the circumstances.',
        'Managing officer wellness through regular exercise, adequate sleep, and mental health practices.',
        'The ability to manage your emotional response under pressure — absorbing provocation and responding from training rather than reaction.'
      ],
      correct: 3,
      feedback: 'Correct. Self-regulation in emotional intelligence is the ability to manage your own emotional state — specifically under provocation. A hostile, irrational, or disrespectful subject is typically responding to fear, pain, or trauma, not personally targeting the officer. Officers who match hostility with hostility escalate situations that could have been contained. Self-regulation is not passivity — it is an active choice to respond from training and judgment rather than from reaction. It is a tactical skill that directly affects call outcomes, use of force rates, and community relationships.'
    },
    {
      scenario: 'You are de-escalating a volatile domestic disturbance call. Your partner, without warning, raises their voice and issues a command that significantly escalates the primary subject\'s agitation.',
      text: 'What is the most effective response in the moment?',
      options: [
        'Correct your partner\'s approach out loud on scene — the subject needs to see that you are the one handling it.',
        'Follow your partner\'s lead instead — contradicting them on scene undermines the unit\'s authority.',
        'Step in front of your partner, calmly redirect the subject\'s attention to you, and use a quiet, steady tone to re-establish rapport. Address your partner\'s approach privately after the scene is resolved.',
        'Request a supervisor to come and take over the call entirely, since it has now been compromised.'
      ],
      correct: 2,
      feedback: 'Correct. On-scene contradictions between partners escalate situations and undermine both officers\' authority. The effective response is to absorb the escalation by redirecting the subject\'s focus to you, using calm tone and de-escalation language to re-stabilize. Address your partner\'s approach privately and professionally after the scene is resolved. This preserves safety, partnership, and your credibility. Publicly correcting a partner is itself an escalation.'
    },
    {
      scenario: 'A subject you have arrested becomes tearful and discloses personal trauma during transport. They are not making threats, not a danger to themselves, and are cooperative.',
      text: 'What is the emotionally intelligent officer response?',
      options: [
        'Acknowledge the disclosure with brief, genuine recognition: "That sounds really hard." Do not interrogate, do not dismiss. Remain professional and compassionate without soliciting further statements.',
        'Redirect the conversation immediately to booking logistics — personal disclosures during transport are not your role.',
        'Encourage them to keep talking through it — it builds rapport and may even produce admissible statements.',
        'Inform them that anything they say can and will be used against them, before they say anything further.'
      ],
      correct: 0,
      feedback: 'Correct. A brief, genuine human acknowledgment — without interrogation, without dismissal — is both ethical and professionally appropriate. You are not a counselor, but you are not required to be cold either. Do not solicit further statements that could create custodial interrogation issues. Do not exploit emotional vulnerability for investigative purposes. Simply acknowledging someone\'s pain is part of the professional treatment every person in custody deserves.'
    },
    {
      scenario: 'After several months of increasingly difficult calls, you notice that you no longer feel anything on scenes that previously affected you. You are efficient, but emotionally flat.',
      text: 'This pattern most likely reflects which occupational health phenomenon, and what is the recommended response?',
      options: [
        'Adaptation — officers naturally develop an appropriate emotional distance over time, so no action is needed.',
        'Secondary traumatic stress or emotional numbing, which are recognized risk factors for burnout and long-term psychological impact. The recommended response is early engagement with peer support or EAP resources.',
        'Burnout — a condition which requires the officer to take an immediate period of medical leave.',
        'Compassion fatigue — a condition which typically resolves on its own with an adequate amount of rest.'
      ],
      correct: 1,
      feedback: 'Correct. Emotional numbing — feeling nothing on scenes that previously had impact — is a recognized early indicator of secondary traumatic stress and the pathway to burnout. It is not strength or adaptation; it is a signal. EAP and peer support resources exist specifically for this reason and carry confidentiality protections. The research is clear: early intervention produces significantly better outcomes than crisis-point intervention. If you recognize this in yourself, act early.'
    },
  ];
}

function getEvidenceQuestions() {
  return [
    {
      scenario: 'You are the first officer at a residential burglary. The homeowners are on scene and want to walk through the house to check what was taken.',
      text: 'What is the correct approach to managing the homeowners\' access to the scene?',
      options: [
        'Keep them out of the structure until detectives or crime scene personnel have documented and cleared the scene.',
        'Allow them to do a quick walkthrough of the house with you present so you can document the missing items.',
        'Let them check only the rooms that were not directly affected by the break-in itself.',
        'Allow them access to any area of the home not immediately adjacent to the point of entry.'
      ],
      correct: 0,
      feedback: 'Correct. First officers own the scene until it is formally handed off to detectives or crime scene personnel. All unauthorized persons — including victims and property owners — must be kept out of the crime scene until it has been documented. Any person who enters before documentation can contaminate fingerprints, trace evidence, and body position. This is one of the most common chain of custody vulnerabilities in burglary cases.'
    },
    {
      scenario: 'You discover a cell phone on the floor of a burglary scene that clearly does not belong to the homeowners. Detectives are 15 minutes out.',
      text: 'What is the correct procedure for this item before detectives arrive?',
      options: [
        'Photograph it in place and pick it up to prevent it from being accidentally kicked or moved.',
        'Leave it exactly as found, document its location in your notes, and prevent anyone from entering the area.',
        'Place it in an evidence bag and secure it in your patrol vehicle to protect it.',
        'Ask the homeowners if they recognize the phone at all before you take any further action with it.'
      ],
      correct: 1,
      feedback: 'Correct. In-place documentation before collection is mandatory. The item must be photographed in its discovered location by the collecting officer — in this case, the detective. Your role as the first officer is to preserve the scene, document observations, and prevent unauthorized access. Moving or bagging the item before it is photographed in place breaks the chain of custody, even with good intentions.'
    },
    {
      scenario: 'Your supervisor orders you to collect two items of evidence and transport them to the station immediately so you can clear for a priority call.',
      text: 'What is the correct response?',
      options: [
        'Follow the order — supervisor authority supersedes standard evidence protocols.',
        'Collect the items and transport them, but document the supervisor\'s name in the chain of custody.',
        'Advise the supervisor of the situation, including the detective ETA, and request a brief delay or a second unit to hold the scene.',
        'Refuse the order and remain on scene regardless of the supervisor\'s directive.'
      ],
      correct: 2,
      feedback: 'Correct. Advising your supervisor of the situation — detective ETA, the evidence involved, and the chain of custody risk — is the professional response. Supervisors can make informed decisions when given accurate information. Improvised collection without proper packaging and in-place documentation creates suppression vulnerabilities that can destroy a prosecution. Option D (outright refusal) is not the answer — communication is.'
    },
    {
      scenario: 'You need to document a piece of evidence before a detective arrives. The scene is outdoors and the item is on the ground.',
      text: 'Which of the following best describes proper in-place documentation before collection?',
      options: [
        'Write out a detailed written description of the item in your field notebook.',
        'Sketch the overall scene and mark the item\'s approximate location on the sketch.',
        'Verbally describe the item to dispatch so that it is recorded on the radio log.',
        'Photograph the item from multiple angles in its exact discovered position, including a scale reference if available, before anyone touches it.'
      ],
      correct: 3,
      feedback: 'Correct. In-place photography from multiple angles — including a scale reference — is the standard for documenting physical evidence before collection. Written descriptions and sketches are supplementary documentation tools, not substitutes for photography. The photograph establishes the item\'s position, condition, and location at the moment of discovery — which is critical when chain of custody is challenged in court.'
    },
    {
      scenario: 'You collect a biological swab from a crime scene. What is the correct packaging for this item?',
      text: 'Biological evidence must be packaged in:',
      options: [
        'A tightly sealed plastic bag with an evidence sticker applied to it.',
        'A paper bag or paper envelope — never airtight plastic — to allow moisture to escape and prevent degradation.',
        'Any available container at all, as long as it is sealed shut and clearly labeled.',
        'An aluminum foil wrap with a chain of custody tag securely attached to it.'
      ],
      correct: 1,
      feedback: 'Correct. Biological evidence — blood, saliva, tissue — must be packaged in paper, not plastic. Airtight plastic traps moisture and accelerates bacterial growth, which degrades DNA and can render biological evidence useless. Proper forensic packaging for biological items is paper bags or paper envelopes, air-dried before sealing. Hard evidence like tools or electronics goes in plastic. Knowing which packaging applies to which evidence type is a basic chain of custody requirement.'
    },
    {
      scenario: 'You collect a blood sample from a DUI suspect at the hospital. The sample is collected by a nurse using a department-approved kit. You witness the collection.',
      text: 'What documentation steps are required to preserve the chain of custody for this sample?',
      options: [
        'Document the collection: time, location, who collected it, the kit number, how it was sealed, and how it was transported from the hospital to the property room — with your continuous control or handoff documentation at each step.',
        'Document only that you were present for the collection — the nurse\'s medical records will handle all the rest.',
        'The hospital\'s own records constitute the chain of custody for any sample collected in a medical facility.',
        'Chain of custody only applies to physical evidence at crime scenes, not to medical samples like this one.'
      ],
      correct: 0,
      feedback: 'Correct. Blood samples in DUI cases require a documented chain of custody from collection to analysis. Your documentation should include: the date and time of collection, the nurse\'s name and facility, the kit ID number, how the sample was sealed and labeled, your transport from the hospital, and your property room submission with time and submission number. Any gap in this chain can result in suppression or weight challenges at trial. Pennsylvania DUI prosecutions frequently hinge on chain of custody integrity.'
    },
    {
      scenario: 'You are securing a crime scene and notice a firearm on the ground. Another officer present suggests photographing it and leaving it for detectives to collect rather than recovering it yourself.',
      text: 'What is the appropriate response?',
      options: [
        'Follow the other officer\'s suggestion — detectives have the authority and training to collect firearms.',
        'Secure the area around the firearm and await the detectives\' arrival without touching or documenting it.',
        'The other officer\'s suggestion is correct, as long as the detectives will arrive within two hours.',
        'Recover the firearm yourself according to department protocol: photograph it in place, note the exact location, collect it using appropriate safety procedures, and document the recovery in your report.'
      ],
      correct: 3,
      feedback: 'Correct. Leaving evidence unattended and uncollected at an unsecured crime scene creates chain of custody problems and evidence integrity risk. If you are the officer present and the scene requires evidence collection, that is your responsibility unless department protocol specifically directs otherwise. Photograph in place, document location, collect using protocol, and complete the chain with proper property room submission. Detectives can also be involved in analysis — but initial collection and documentation is the responding officer\'s responsibility.'
    },
    {
      scenario: 'You retrieve previously submitted evidence from the property room for an upcoming court appearance. When you sign it out, you notice the evidence seal appears to have been disturbed.',
      text: 'What is your obligation?',
      options: [
        'Sign it out and proceed on to court with it — the disturbed seal may just be an innocent storage issue.',
        'Re-seal the evidence package yourself and simply note the re-sealing in your report afterward.',
        'Refuse to sign it out, notify the property room supervisor immediately, document the observation, and notify the prosecutor before the court date. The integrity of the evidence is now in question.',
        'Inspect the contents yourself to determine if anything is missing before deciding how to proceed.'
      ],
      correct: 2,
      feedback: 'Correct. A disturbed evidence seal is a chain of custody integrity issue that must be reported before the evidence goes to court. Taking it to court with an observed integrity question — without disclosure — creates a much larger problem than addressing it before trial. Notify the property room supervisor, document your observation contemporaneously, and notify the prosecutor so they can make an informed decision about how to proceed. The prosecutor may have the ability to address it; taking it to court without disclosure does not.'
    },
  ];
}

function getWellnessQuestions() {
  return [
    {
      scenario: 'After six months of heavy call volume including multiple traumatic incidents, an officer tells you: "I just don\'t care anymore. Nothing bothers me. I feel like I\'m watching everything from far away."',
      text: 'This description most closely matches which recognized condition in law enforcement?',
      options: [
        'Normal stress adaptation — a sign the officer is getting better at compartmentalization.',
        'Burnout from shift work alone — a condition that is resolved by taking a vacation.',
        'A fixed personality trait that is entirely unrelated to the demands of the job.',
        'Secondary traumatic stress or operational stress injury — characterized by emotional numbing, detachment, and depersonalization.'
      ],
      correct: 3,
      feedback: 'Correct. Emotional numbing, depersonalization ("watching from far away"), and loss of empathy are recognized symptoms of secondary traumatic stress (STS) and operational stress injury (OSI) — documented occupational health conditions in law enforcement. These are not personality failures or signs of weakness. They are physiological responses to sustained exposure to trauma and high-stakes stress. Identifying them early is the difference between intervention and crisis.'
    },
    {
      scenario: 'A fellow officer has been short-tempered on calls, called out sick multiple times in the past month, and made a dark comment about not caring whether he comes home after shift.',
      text: 'What is the most appropriate response from a peer?',
      options: [
        'Speak with him directly, express concern without judgment, and inform him of the peer support program. If safety concerns persist, involve a peer support officer.',
        'Report him to the shift supervisor immediately, without first speaking to him about it yourself.',
        'Ignore the dark comment entirely — this kind of dark humor is normal in law enforcement work.',
        'Contact his family members directly to let them know that he may be in need of some help.'
      ],
      correct: 0,
      feedback: 'Correct. The appropriate first step is a direct, private conversation — without judgment, without escalating immediately to administration. Peer support exists for exactly this scenario. The comment about not caring whether he comes home is a warning sign that warrants a response beyond dark humor dismissal. If after a peer conversation there are continuing safety concerns — particularly around fitness for duty — involving a peer support officer or supervisor becomes the appropriate next step.'
    },
    {
      scenario: 'An officer contacts the department\'s peer support program. What confidentiality protections apply?',
      text: 'Under MTPD policy and Pennsylvania law, peer support contacts are:',
      options: [
        'Fully confidential with no exceptions at all — nothing discussed in them can ever be disclosed.',
        'Automatically reported, in summary, to the officer\'s direct supervisor after the contact.',
        'Confidential but subject to mandatory disclosure if the officer reveals intent to harm themselves or others, or describes conduct that constitutes a crime.',
        'Included in the officer\'s permanent personnel file as a documented wellness record.'
      ],
      correct: 2,
      feedback: 'Correct. Peer support contacts are confidential under MTPD policy and Pennsylvania law — but confidentiality is not absolute. If an officer discloses imminent intent to harm themselves or others, or describes conduct constituting a criminal offense, disclosure may be required. This is the same standard that applies to mental health professionals. Peer support officers are trained to communicate these limits clearly at the start of any contact. The goal is to encourage use of the program, not to create false expectations about absolute confidentiality.'
    },
    {
      scenario: 'You notice that sleep disruption, irritability, and difficulty concentrating have been affecting your own performance for the past several weeks, particularly after a difficult call involving a child fatality.',
      text: 'According to MTPD wellness policy, what is the appropriate action for an officer experiencing these symptoms?',
      options: [
        'Push through them — these symptoms are perfectly normal and will resolve entirely on their own in time.',
        'Self-refer to the peer support program or employee assistance program (EAP) — early self-referral is encouraged and does not automatically trigger a fitness-for-duty evaluation.',
        'Immediately disclose all of the symptoms to your supervisor, in order to avoid any personal liability.',
        'Wait until your annual evaluation to discuss the symptoms with the department psychologist then.'
      ],
      correct: 1,
      feedback: 'Correct. Self-referral to peer support or the EAP is the appropriate early action and does not automatically trigger administrative review or fitness-for-duty evaluation. MTPD wellness policy distinguishes between voluntary wellness contacts — which are confidential — and formal fitness-for-duty evaluations, which are administrative in nature and involve a different process. Early intervention is far less disruptive than waiting for symptoms to escalate to a point where administrative action becomes necessary.'
    },
    {
      scenario: 'Your partner\'s performance on calls has declined noticeably over several weeks. You\'ve spoken with him informally twice. He has not contacted peer support. Yesterday he froze during a domestic disturbance response and you had to step in to manage the situation.',
      text: 'What is the appropriate action at this point?',
      options: [
        'Tell him directly what you observed and that you intend to contact peer support on his behalf. Give him the opportunity to self-refer first. Then follow through.',
        'Continue with informal peer support only — he will most likely come around on his own in his own time.',
        'Contact his family members directly and let them know exactly what you have observed in him.',
        'File a formal complaint with internal affairs about the officer\'s ongoing performance issues.'
      ],
      correct: 0,
      feedback: 'Correct. When informal support has not produced change and officer performance is creating safety concerns on active calls, the threshold for escalating support — not discipline — has been crossed. The correct approach is transparency: tell him what you observed, give him the opportunity to self-refer, and make clear you are following through regardless. This is not a betrayal — it is the highest form of partner loyalty. An officer who cannot safely perform their duties is a danger to themselves, their partners, and the public.'
    },
    {
      scenario: 'An officer in your squad has been making comments that concern you — dark humor that has shifted over the past month, coming in early and leaving late without explanation, and declining to join the group for lunch. No single behavior is alarming, but the pattern has been building.',
      text: 'What is the appropriate response from a peer?',
      options: [
        'Report the officer to the shift supervisor — the building pattern suggests a real performance issue.',
        'Mention it quietly to another colleague first, to see if they have noticed the same thing in him.',
        'Wait and watch for now — officers sometimes go through difficult phases and recover on their own.',
        'Engage the officer directly and privately. Name what you have noticed without accusation. Create space for them to talk if they want to. Mention peer support as an option. Follow up.'
      ],
      correct: 3,
      feedback: 'Correct. Behavioral pattern changes are among the most reliable early indicators of officer distress. No single behavior may trigger concern, but the accumulated pattern is the signal. Direct, private peer engagement — without accusation, without pressure — is the research-supported first response. "I\'ve noticed you seem different lately and I just wanted to check in" costs nothing and can save a career or a life. Peer support contacts under MTPD policy are confidential.'
    },
    {
      scenario: 'A critical incident debrief is scheduled for officers involved in an officer-involved shooting. An involved officer tells you they do not intend to attend — "I\'m fine, I don\'t need to talk about it."',
      text: 'What does the research say about mandatory versus voluntary debriefs, and what is the appropriate peer response?',
      options: [
        'Respect their decision — mandatory mental health participation is counterproductive and violates autonomy.',
        'Normalize the debrief without pressure: explain it is standard practice, not an indication of weakness, and that research shows engagement with post-incident support significantly reduces long-term psychological impact. Encourage attendance without mandating it.',
        'The officer should be required to attend — waivers should not be permitted after OIS events.',
        'Alert the shift supervisor about it so that they can go ahead and make his attendance mandatory.'
      ],
      correct: 1,
      feedback: 'Correct. Critical incident debriefs serve both immediate and long-term wellness functions. The research consistently shows that early engagement with post-incident support reduces the incidence of PTSD and long-term psychological injury. Normalizing participation — "everyone goes through this, it\'s part of the protocol" — reduces stigma without coercion. Coercing participation produces defensive engagement. The peer\'s role is to normalize and encourage, not to enforce.'
    },
    {
      scenario: 'You have been through a difficult three months: a line-of-duty death in your department, two major felony arrests, and a contested use-of-force review. You are sleeping well and your home life is stable. At your quarterly check-in, the sergeant asks how you are doing.',
      text: 'What does a wellness-informed response to that question look like?',
      options: [
        '"Fine" — the sergeant is only asking as a formality, so the answer to give should be brief.',
        'Deflect the question — wellness check-ins are a compliance exercise and detailed responses invite unwanted attention.',
        'Provide an honest, calibrated update: acknowledge the weight of the past three months, note what is currently stable, and mention anything that you are monitoring in yourself — without dramatizing or minimizing.',
        '"I\'m handling it" — officers are expected to manage their operational stress without any external support.'
      ],
      correct: 2,
      feedback: 'Correct. A wellness-informed officer knows how to give an honest calibrated answer: neither dramatizing nor minimizing. You can acknowledge that the past three months were heavy, note that you are currently stable, and mention anything you are paying attention to in yourself. This kind of honest self-awareness is not weakness — it is the professional capacity to monitor your own system the same way you monitor your patrol vehicle. Supervisors who ask are trying to lead. Let them.'
    },
  ];
}

function getDeescalationQuestions() {
  return [
    {
      scenario: 'You arrive at a parking lot where a male subject is pacing erratically, speaking to himself, and holding a knife against his own forearm. He is not advancing toward anyone. Bystanders have backed away.',
      text: 'What is the correct initial response?',
      options: [
        'Draw your firearm and order the subject to drop the knife immediately.',
        'Establish distance and cover, keep your weapon holstered, and initiate calm verbal contact.',
        'Wait for backup units to arrive on scene before you make any contact at all with him.',
        'Attempt to disarm the subject immediately before the situation escalates.'
      ],
      correct: 1,
      feedback: 'Correct. The subject poses no immediate threat to bystanders, and the threat is currently self-directed. Establishing distance and cover — without drawing — and initiating calm verbal contact is both tactically sound and policy-compliant. Drawing a firearm on a person in psychological crisis whose threat is not directed at officers typically escalates the encounter. MTPD ALO 5.4 requires de-escalation techniques when tactically feasible, which they are here.'
    },
    {
      scenario: 'Graham v. Connor (1989) established the legal standard for evaluating officer use of force. What is that standard?',
      text: 'Under Graham v. Connor, use of force is evaluated by:',
      options: [
        'The subjective good faith of the officer at the time of the use-of-force incident.',
        'Whether the officer followed all of the relevant department policy to the very letter.',
        'Whether the force used was objectively reasonable from the perspective of a reasonable officer on the scene, given the totality of circumstances.',
        'Whether the subject ultimately sustained any injury as a direct result of the force.'
      ],
      correct: 2,
      feedback: 'Correct. Graham v. Connor established the objective reasonableness standard — the constitutionality of force is evaluated from the perspective of a reasonable officer on the scene, given the totality of circumstances known at that moment. Key factors include: the severity of the crime, whether the subject poses an immediate threat, and whether the subject is resisting or evading. The standard is not perfection — it is objective reasonableness under the specific circumstances. Mental health status is one of those circumstances.'
    },
    {
      scenario: 'You have established verbal contact with a subject in mental health crisis who is holding a knife. Backup arrives and one officer moves to a flanking position. The subject notices and grips the knife more tightly.',
      text: 'How should you direct the response?',
      options: [
        'Signal backup to hold and maintain their current position. Continue verbal contact. Request crisis intervention resources.',
        'Signal backup to close in on the subject immediately — additional personnel on scene reduces the overall risk.',
        'Have backup officers draw their weapons in order to establish an overwhelming show of force presence.',
        'Step back and cede the contact to the arriving officers, who may have more experience with this.'
      ],
      correct: 0,
      feedback: 'Correct. When a subject in crisis reacts to tactical movement by increasing their defensive posture, tactical movement has become a negative variable. Hold position and maintain what is working: verbal contact. Closing in tactically on an agitated, armed, psychologically fragile subject without exhausting verbal de-escalation increases the probability of a use-of-force incident significantly. Requesting crisis intervention resources — a CIT officer or mobile crisis team — is the appropriate escalation, not tactical closure.'
    },
    {
      scenario: 'The Pennsylvania Mental Health Procedures Act (50 P.S. § 7302) authorizes police to initiate an involuntary emergency examination (302). What standard must be met?',
      text: 'A 302 involuntary examination requires that the person:',
      options: [
        'Has committed some crime and also appears to have an underlying mental health condition.',
        'Has at some point been voluntarily diagnosed with a recognized mental health condition.',
        'Has refused to follow the lawful commands of an officer on some previous call for service.',
        'Is severely mentally disabled and in need of immediate treatment — presenting a clear and present danger to themselves or others.'
      ],
      correct: 3,
      feedback: 'Correct. A 302 petition requires that the person be severely mentally disabled and in need of immediate treatment — typically evidenced by a clear and present danger to themselves or others based on the officer\'s observations. This is a civil mental health process, not an arrest. The subject is transported to a psychiatric facility for evaluation, not to a criminal detention facility. Understanding this distinction matters for how you communicate the process to the subject and their family, and it affects how you write your report.'
    },
    {
      scenario: 'During a verbal de-escalation attempt, you are approached by a bystander who says "just tase him and get it over with." The subject is not advancing, is still engaging verbally, and has not cut himself.',
      text: 'What is the correct response?',
      options: [
        'Consider the bystander\'s suggestion — bystander observations can sometimes provide useful tactical intelligence.',
        'Use the taser on the subject immediately — public expectation for a fast resolution creates accountability.',
        'Maintain focus on the subject and direct a partner or bystander management unit to move the crowd back. Do not let bystander pressure influence tactical decision-making.',
        'Ask the bystander to leave the area and then reassess whether using the taser is now appropriate.'
      ],
      correct: 2,
      feedback: 'Correct. Tactical decisions are made based on the circumstances of the encounter, department policy, and law — not bystander pressure or expectations for speed. A subject who is not advancing, is engaging verbally, and has not harmed himself does not meet the force threshold that would justify CEW deployment. Crowd management is a legitimate tactical concern, but managing the crowd is the responsibility of a secondary officer — not an excuse to abandon de-escalation that is working.'
    },
    {
      scenario: 'A subject is barricaded inside a residence and has been making statements about not wanting to live. No weapons have been confirmed. They are communicating with officers through a door.',
      text: 'Which de-escalation principle is most critical in this scenario?',
      options: [
        'Establish authority immediately — the subject needs to understand they have no option but to comply.',
        'Prioritize time, distance, and communication. Maintain a calm, unhurried tone. Keep the subject talking. Avoid ultimatums. Allow time for their emotional state to stabilize.',
        'Attempt to enter the residence through the door to remove the immediate threat of self-harm to him.',
        'Advise dispatch that the situation requires SWAT — barricaded subjects are outside patrol scope.'
      ],
      correct: 1,
      feedback: 'Correct. In barricade and crisis scenarios, time and distance are tactical assets. A subject who is talking is a subject who is not acting. Pressure, ultimatums, and forced entry significantly increase the risk of a fatal outcome. Keeping the subject engaged, in a calm and low-pressure way, preserves options. Request specialized resources (crisis negotiators, CIT, mobile mental health) while maintaining contact. Barricaded subjects without confirmed weapons are within patrol scope to manage until specialized resources arrive.'
    },
    {
      scenario: 'You are on a call with a subject who is agitated and pacing. A colleague tells you the subject has a history of violence. The subject\'s behavior has not yet crossed into immediate threat territory.',
      text: 'How should the prior history factor into your de-escalation approach?',
      options: [
        'Prior violence history automatically justifies a higher level of force readiness that overrides de-escalation.',
        'Disregard the prior history entirely — each contact must be evaluated strictly on its own without any bias.',
        'Inform the subject directly that you are aware of his history, so that he understands your level of preparation.',
        'Prior history informs your situational awareness and tactical positioning without determining the force level applied to current behavior. De-escalate based on current conduct; maintain awareness based on background.'
      ],
      correct: 3,
      feedback: 'Correct. Prior history is relevant context for officer positioning, backup, and awareness — it is not a substitute for evaluating current behavior. A subject with a violence history who is currently agitated but not threatening does not receive a higher force level based on history alone. Courts apply Graham v. Connor to the specific facts of the specific encounter. De-escalate based on what is happening now; position yourself based on what you know from background. These are not mutually exclusive.'
    },
    {
      scenario: 'After a successful de-escalation in which a § 302 involuntary commitment was avoided, you return to the station to complete your paperwork. A colleague asks: "Why did you spend 45 minutes on that call? You could have 302\'d them in 10 minutes and been done."',
      text: 'Which response best reflects the professional value of de-escalation?',
      options: [
        '"The de-escalation worked. He left the scene calm and connected to follow-up services. That outcome is better for him and for the community, and it avoids an involuntary commitment that may not have been legally warranted."',
        '"You\'re right — I probably should have just moved faster and wrapped it up sooner."',
        '"It felt like the right call at the time, but I\'m not sure I can always do it that way."',
        '"Some calls just take a lot longer than others — it is not always about the speed."'
      ],
      correct: 0,
      feedback: 'Correct. The professional response articulates the value of the outcome — not just the time spent. A subject who leaves a scene calm, with services connected, and without unnecessary trauma from involuntary commitment is a better outcome for public trust, community health, and department resources. § 302 authority exists for situations that require it — not as a shortcut when de-escalation is working. Defending the professional use of de-escalation, by name and with reasoning, contributes to a culture that values it.'
    },
  ];
}

/* ── Screen Management ─────────────────── */
