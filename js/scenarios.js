/* ═══════════════════════════════════════════
   Arbiter LE — Scenario Data
   All 12 training scenarios
═══════════════════════════════════════════ */

/* ══════════════════════════════════════════
   SCENARIO DATA — Search & Seizure
   Arbiter LE Demo / PA Law
══════════════════════════════════════════ */
const SCENARIO_SEARCH_SEIZURE = {
  id: 'scenario-search-seizure',
  title: 'Route 29 — Traffic Stop',
  location: 'Route 29 N, Millbrook Township, PA',
  totalDecisions: 3,
  nodes: {

    /* ── OPENING SCENE ─────────────────── */
    'start': {
      type: 'scene',
      time: '22:17',
      weather: 'Clear / 54°F',
      unit: 'Patrol Unit 3',
      narrative: [
        'You are on routine patrol on Route 29 northbound when you observe a silver Honda Civic traveling at the posted speed. The driver\'s side tail light is out — a clear equipment violation under 75 Pa. C.S. § 4303.',
        'You initiate a traffic stop. The vehicle pulls into the well-lit parking lot of a closed hardware store. Dispatch is notified. You approach the driver\'s window.'
      ],
      next: 'd1'
    },

    /* ── DECISION 1 ─────────────────────── */
    'd1': {
      type: 'decision',
      decisionNumber: 1,
      situation: 'As you reach the driver\'s window, you immediately detect a strong odor that you recognize from training and field experience as marijuana emanating from inside the vehicle. The driver — a male in his mid-thirties — will not maintain eye contact. His hands are visibly trembling on the steering wheel. His breathing is rapid. He answers your initial greeting with a two-second delay.',
      question: 'Based on your observations, what is your next action?',
      options: [
        {
          text: 'Immediately ask the driver to step out and search the vehicle. The odor of marijuana establishes probable cause under Pennsylvania law.',
          next: 'c1a',
          quality: 'risky',
          shortLabel: 'Searched immediately on odor alone'
        },
        {
          text: 'Inform the driver of your observations and ask for voluntary consent to search the vehicle.',
          next: 'c1b',
          quality: 'neutral',
          shortLabel: 'Requested consent to search'
        },
        {
          text: 'Return to your patrol vehicle, document your observations in CAD, and request K9 assistance.',
          next: 'c1c',
          quality: 'good',
          shortLabel: 'Requested K9 backup'
        },
        {
          text: 'Issue the written warning for the tail light, document your observations, and release the vehicle. You don\'t have enough to search.',
          next: 'c1d',
          quality: 'neutral',
          shortLabel: 'Issued warning and released'
        }
      ]
    },

    /* ══ PATH A: Immediate search ══ */
    'c1a': {
      type: 'consequence',
      outcomeClass: 'outcome-bad',
      outcomeLabel: 'Evidence Suppressed — Case Dismissed',
      heading: 'You search the vehicle.',
      narrative: [
        'You ask the driver to step out and conduct a search of the vehicle interior. Under the rear passenger seat you locate a plastic bag containing approximately 14 grams of marijuana and a digital scale. You place the driver under arrest and transport to the Montgomery County lockup.',
        'Six weeks later, defense counsel files a motion to suppress. At the suppression hearing, the court reviews your report. Your documentation states: driver "appeared nervous" and officer "detected the odor of marijuana." The court finds this conclusory language insufficient to establish the specificity required for probable cause under Commonwealth v. Enimpah (2014). The motion is granted. Evidence suppressed. The case is dismissed.'
      ],
      legal: 'The odor of marijuana may establish probable cause in Pennsylvania, but your documentation must be specific and articulable — not conclusory. "Appeared nervous" is a conclusion. Courts require specificity: which behaviors, what odor intensity, from what distance, and how your training and experience supported your assessment.',
      next: 'd2a'
    },
    'd2a': {
      type: 'decision',
      decisionNumber: 2,
      situation: 'Your supervisor asks you to identify the problem with your documentation and write it correctly for training purposes. Which version of the probable cause documentation is legally defensible?',
      question: 'Select the documentation that would survive a suppression hearing:',
      options: [
        {
          text: '"Driver appeared nervous and officer detected the odor of marijuana emanating from the vehicle."',
          next: 'c2a_wrong',
          quality: 'bad',
          shortLabel: 'Conclusory language — insufficient'
        },
        {
          text: '"Driver would not maintain eye contact. Hands were visibly trembling on the steering wheel. Driver\'s responses were delayed approximately two seconds. Officer detected a strong odor consistent with fresh marijuana emanating from the driver\'s side window from approximately three feet, consistent with officer\'s training and seven years of patrol experience."',
          next: 'c2a_right',
          quality: 'good',
          shortLabel: 'Specific, articulable facts — defensible'
        },
        {
          text: '"Driver was acting suspicious and vehicle smelled like drugs."',
          next: 'c2a_wrong',
          quality: 'bad',
          shortLabel: 'Vague and unprofessional'
        },
        {
          text: '"Officer had reasonable suspicion that criminal activity was occurring based on driver behavior and controlled substance odor."',
          next: 'c2a_wrong',
          quality: 'bad',
          shortLabel: 'Legal conclusion without factual basis'
        }
      ]
    },
    'c2a_wrong': {
      type: 'consequence',
      outcomeClass: 'outcome-bad',
      outcomeLabel: 'Insufficient — Still Won\'t Survive',
      heading: 'Still not enough.',
      narrative: [
        'This documentation repeats the core problem — it states conclusions without the underlying facts that support them. Defense counsel will dissect every vague term. "Acting suspicious" and "smelled like drugs" are opinions, not observations.',
        'Courts don\'t evaluate your instincts. They evaluate whether a reasonable officer, with your specific training and facing these specific facts, would conclude criminal activity was afoot. Generic language cannot answer that question.'
      ],
      legal: null,
      next: 'd3'
    },
    'c2a_right': {
      type: 'consequence',
      outcomeClass: 'outcome-good',
      outcomeLabel: 'Correct Documentation Standard',
      heading: 'That\'s the standard.',
      narrative: [
        'Specific behaviors. Specific sensory observations. Distance. Duration. The basis of your expertise. This is language that survives a suppression hearing because it allows the court to evaluate whether your conclusion was reasonable — not just whether you said the right words.',
        'Every report involving probable cause should be written to this standard, not because you expect to go to court, but because you might.'
      ],
      legal: 'Courts evaluate PC documentation by asking: would a reasonable officer with this training and experience, observing these specific facts, conclude that criminal activity was afoot? Generic conclusions don\'t answer that question. Specific observations do. This is the standard across all PA probable cause determinations.',
      next: 'd3'
    },

    /* ══ PATH B: Consent ══ */
    'c1b': {
      type: 'consequence',
      outcomeClass: 'outcome-neutral',
      outcomeLabel: 'Search Conducted — Consent Obtained',
      heading: 'You request consent.',
      narrative: [
        'You tell the driver: "Based on what I\'m detecting, I\'d like to search your vehicle. Do I have your permission to do that?" The driver pauses for approximately four seconds, then says, "I guess so." You conduct the search and locate 14 grams of marijuana and a digital scale under the rear seat.',
        'At the preliminary hearing, defense counsel argues the consent was the product of coercion — that the driver felt he had no real choice given your authority as an officer and the nature of the stop.'
      ],
      legal: null,
      next: 'd2b'
    },
    'd2b': {
      type: 'decision',
      decisionNumber: 2,
      situation: 'The outcome of the suppression hearing depends entirely on how you documented the consent. The legal standard is Schneckloth v. Bustamonte (1973) — consent must be voluntary, not the product of duress or coercion. Which report entry best demonstrates voluntary consent?',
      question: 'Select the documentation that protects the validity of the consent:',
      options: [
        {
          text: '"Driver consented to the search of his vehicle."',
          next: 'c2b_wrong',
          quality: 'bad',
          shortLabel: 'Bare consent — legally vulnerable'
        },
        {
          text: '"Officer asked driver: \'Do I have your permission to search your vehicle?\' Driver stated \'I guess so.\' Officer\'s weapon remained holstered throughout the encounter. Officer spoke in a calm, conversational tone. Driver did not appear confused, impaired, or under duress. Driver was not handcuffed or restrained at the time consent was given."',
          next: 'c2b_right',
          quality: 'good',
          shortLabel: 'Full voluntary consent documentation'
        },
        {
          text: '"Driver voluntarily agreed to the search after being asked by the officer."',
          next: 'c2b_wrong',
          quality: 'bad',
          shortLabel: 'Conclusory — no surrounding facts'
        },
        {
          text: '"Driver gave verbal consent. Search of vehicle conducted."',
          next: 'c2b_wrong',
          quality: 'bad',
          shortLabel: 'Minimal — no voluntariness context'
        }
      ]
    },
    'c2b_wrong': {
      type: 'consequence',
      outcomeClass: 'outcome-bad',
      outcomeLabel: 'Consent Suppressed',
      heading: 'Consent challenged successfully.',
      narrative: [
        'Bare documentation — "driver consented" — gives the court nothing to evaluate whether the consent was truly voluntary. The court weighs the driver\'s testimony against yours. Without documented context, the judge has no factual basis to find voluntariness beyond your assertion.',
        'The motion to suppress is granted. The marijuana and scale are excluded. The case is dismissed on the controlled substance charge.'
      ],
      legal: 'Consent documentation must address voluntariness, not just the act of consent. Document: the exact words of the request and response, weapon status, tone and demeanor, the subject\'s apparent condition, and any factors that demonstrate absence of coercion. Anything less invites a successful suppression motion.',
      next: 'd3'
    },
    'c2b_right': {
      type: 'consequence',
      outcomeClass: 'outcome-good',
      outcomeLabel: 'Consent Upheld — Case Proceeds',
      heading: 'Consent stands.',
      narrative: [
        'Your documentation gives the court a complete factual picture: the exact words used, your demeanor, your weapon status, and the driver\'s apparent condition. The court finds no basis to conclude the consent was involuntary. The suppression motion is denied. The evidence is admitted.',
        'The case proceeds. The driver pleads at the preliminary hearing.'
      ],
      legal: 'Consent documentation should always capture: (1) the exact language of your request and the driver\'s response, (2) whether any weapon was drawn, (3) your tone and demeanor, (4) the subject\'s apparent condition and demeanor, and (5) any circumstance that demonstrates the absence of coercion. This standard applies to every consent search.',
      next: 'd3'
    },

    /* ══ PATH C: K9 ══ */
    'c1c': {
      type: 'consequence',
      outcomeClass: 'outcome-good',
      outcomeLabel: 'Probable Cause Established by K9 Alert',
      heading: 'K9 is en route.',
      narrative: [
        'You return to your patrol vehicle. You document your observations in CAD in real time: odor detected, driver behavioral observations, and your request for K9. You have a lawful basis to maintain the stop — the equipment violation keeps the vehicle there while you develop the situation.',
        'Montgomery County K9 Unit arrives 11 minutes later. The handler conducts a free air sniff of the vehicle exterior. The dog alerts on the driver\'s door seam. Probable cause is now independently established. You conduct the search and locate 14 grams of marijuana, a digital scale, and $840 in cash in the center console.'
      ],
      legal: 'Rodriguez v. United States (2015) limits how long a traffic stop may be extended for a dog sniff — it cannot extend the stop\'s duration beyond what is needed for the original purpose without independent reasonable suspicion. Here, the odor you detected provides that independent reasonable suspicion. Your CAD documentation preserves the timeline.',
      next: 'd2c'
    },
    'd2c': {
      type: 'decision',
      decisionNumber: 2,
      situation: 'After you locate the marijuana, scale, and cash, the driver\'s passenger — a female in her mid-twenties — immediately and unprompted states: "That\'s mine, not his. He didn\'t know it was there." Both individuals are in the vehicle. The contraband was located behind the driver\'s seat.',
      question: 'How do you proceed?',
      options: [
        {
          text: 'Arrest both the driver and the passenger — both were present and constructive possession may apply to either.',
          next: 'c2c_both',
          quality: 'risky',
          shortLabel: 'Arrested both — constructive possession'
        },
        {
          text: 'Arrest the driver only — he is the registered owner and operator and had control of the vehicle.',
          next: 'c2c_driver',
          quality: 'risky',
          shortLabel: 'Arrested driver only'
        },
        {
          text: 'Separate both parties, conduct independent interviews, and make the arrest decision based on the totality of the investigation.',
          next: 'c2c_right',
          quality: 'good',
          shortLabel: 'Separated and investigated first'
        },
        {
          text: 'Release both — ownership is now disputed and you cannot determine who the contraband belongs to.',
          next: 'c2c_release',
          quality: 'bad',
          shortLabel: 'Released both — disputed ownership'
        }
      ]
    },
    'c2c_both': {
      type: 'consequence',
      outcomeClass: 'outcome-bad',
      outcomeLabel: 'Arrest Legally Exposed',
      heading: 'A dual arrest without investigation creates exposure.',
      narrative: [
        'Arresting both parties based solely on proximity and a spontaneous claim — without further investigation — creates significant legal exposure. Constructive possession in Pennsylvania requires proof that the defendant knowingly possessed the contraband and had the intent and ability to exercise control over it. Proximity alone is not enough.',
        'If the passenger\'s claim has merit and the investigation shows the driver had no knowledge, the driver\'s arrest may not survive a preliminary hearing. Separating and interviewing both parties first is the professionally and legally correct approach.'
      ],
      legal: 'Commonwealth v. Macolino (1983): constructive possession requires that the defendant knew of the presence of the contraband and had the intent and power to exercise control over it. Proximity creates an inference — it does not establish constructive possession alone. Dual arrests in shared-vehicle cases require investigation, not assumption.',
      next: 'd3'
    },
    'c2c_driver': {
      type: 'consequence',
      outcomeClass: 'outcome-bad',
      outcomeLabel: 'Investigation Incomplete',
      heading: 'Not that simple.',
      narrative: [
        'Vehicle ownership and control create an inference of knowledge and dominion — but the passenger\'s spontaneous statement cannot simply be dismissed. Arresting only the driver without investigating her claim leaves your case open to a successful preliminary hearing challenge if the investigation later supports her account.',
        'The correct move is to investigate before you arrest — not after.'
      ],
      legal: null,
      next: 'd3'
    },
    'c2c_right': {
      type: 'consequence',
      outcomeClass: 'outcome-good',
      outcomeLabel: 'Legally Sound — Case Proceeds',
      heading: 'Investigate first. Arrest second.',
      narrative: [
        'You separate both parties and advise them of their rights independently. You conduct separate interviews. The driver\'s and passenger\'s accounts are materially inconsistent on key details. The scale and cash are directly behind the driver\'s seat. The marijuana is packaged in a manner consistent with distribution.',
        'Based on the totality of the investigation, you develop probable cause to arrest the driver. The passenger\'s statement is documented in full and forwarded to the DA for independent review. The case holds at the preliminary hearing.'
      ],
      legal: 'When ownership of contraband is disputed in a shared vehicle, the investigation — not the spontaneous claim — governs the arrest decision. Document the full circumstances: location of contraband, packaging, what was in reach of whom, and the results of independent interviews. This is what survives a preliminary hearing.',
      next: 'd3'
    },
    'c2c_release': {
      type: 'consequence',
      outcomeClass: 'outcome-bad',
      outcomeLabel: 'Unjustified Release',
      heading: 'A release you cannot justify.',
      narrative: [
        'You have a K9 alert, recovered contraband, and two individuals in the vehicle. A spontaneous claim of ownership by one party does not eliminate probable cause for the search or the contraband itself. Releasing both parties without further investigation is not legally defensible and will not hold up to supervisor or prosecutorial review.',
        'A disputed claim of ownership is the beginning of an investigation — not the end of one.'
      ],
      legal: null,
      next: 'd3'
    },

    /* ══ PATH D: Issue warning / release ══ */
    'c1d': {
      type: 'consequence',
      outcomeClass: 'outcome-neutral',
      outcomeLabel: 'Vehicle Released — Observations Not Acted On',
      heading: 'You issue the warning and release.',
      narrative: [
        'You determine you don\'t have sufficient grounds to search and issue the written warning for the equipment violation. The vehicle departs northbound on Route 29.',
        'Two hours and fourteen minutes later, Upper Hanover Township PD conducts a traffic stop on the same vehicle on Route 663. They recover 200 grams of methamphetamine, a firearm, and $4,200 in cash. Your sergeant contacts you the following morning. He wants to know what you observed and what you documented during your stop.'
      ],
      legal: null,
      next: 'd2d'
    },
    'd2d': {
      type: 'decision',
      decisionNumber: 2,
      situation: 'Upper Hanover Township PD wants your observations from the earlier stop to support their probable cause documentation. Your sergeant is asking the same question. What did you put in CAD at the time of the stop?',
      question: 'Which documentation approach protects you and provides investigative value?',
      options: [
        {
          text: '"Traffic stop — equipment violation — written warning issued — released at 22:31."',
          next: 'c2d_wrong',
          quality: 'bad',
          shortLabel: 'Minimal — no investigative record'
        },
        {
          text: '"Traffic stop, Route 29 northbound at Baker Rd. Equipment violation — broken tail light. On approach, officer detected odor consistent with marijuana. Driver exhibited nervous behavior: no eye contact, hands trembling, delayed responses. Insufficient PC to conduct search at time of contact. Written warning issued. Driver released at 22:31. Observations documented for intelligence. PA tag [XXX-XXXX] forwarded to dispatch for zone awareness."',
          next: 'c2d_right',
          quality: 'good',
          shortLabel: 'Complete intelligence documentation'
        },
        {
          text: '"Traffic stop — driver nervous — warning issued — could not search — released."',
          next: 'c2d_wrong',
          quality: 'bad',
          shortLabel: 'Vague — no actionable intelligence'
        },
        {
          text: 'Nothing additional — the stop ended without an arrest, no report required.',
          next: 'c2d_wrong',
          quality: 'bad',
          shortLabel: 'No documentation — observations lost'
        }
      ]
    },
    'c2d_wrong': {
      type: 'consequence',
      outcomeClass: 'outcome-bad',
      outcomeLabel: 'No Investigative Value Preserved',
      heading: 'The observations are gone.',
      narrative: [
        'Minimal documentation means your observations — which could have supported Upper Hanover\'s investigation and potentially connected the vehicle to a larger network — are lost. You cannot corroborate their stop, cannot testify to what you observed, and Your department has no intelligence record of the contact.',
        'The decision to release was legally defensible. The failure to document was not. Your sergeant will remember this conversation.'
      ],
      legal: 'Every stop that generates observations — even stops that end without arrest — deserves complete documentation. Field intelligence is a law enforcement asset. When it isn\'t recorded, it doesn\'t exist.',
      next: 'd3'
    },
    'c2d_right': {
      type: 'consequence',
      outcomeClass: 'outcome-good',
      outcomeLabel: 'Intelligence Preserved — Department Protected',
      heading: 'This is professional police work.',
      narrative: [
        'Your CAD documentation becomes part of Upper Hanover\'s probable cause timeline. Your observations are admissible and corroborate the investigation. The intelligence record demonstrates that Your department was alert, professional, and operating within the law.',
        'Your decision not to search was legally correct. Your documentation shows that — and gives the investigation something to work with. Every stop deserves this level of documentation.'
      ],
      legal: 'The decision not to search can be legally sound and professionally correct. What is never acceptable is failing to document what you observed. Thorough documentation of an inconclusive stop creates intelligence value, protects the officer\'s decision-making, and preserves evidence that may support future probable cause.',
      next: 'd3'
    },

    /* ── DEBRIEF ────────────────────────── */

    'd3': {
      type: 'decision',
      decisionNumber: 3,
      situation: 'Back at the station, your supervisor reviews the arrest paperwork. The subject\'s attorney has already contacted the department alleging the search exceeded the scope of the vehicle owner\'s consent — specifically, that you had no authority to open the locked box in the trunk. Your supervisor asks you to walk through your documentation before anything is filed.',
      question: 'How do you handle the documentation and the consent scope challenge?',
      options: [
        {
          text: 'State in your report that general consent to search the vehicle covered all containers, without further elaboration.',
          shortLabel: 'Claim general consent covered the box',
          quality: 'bad',
          next: 'c3-bad'
        },
        {
          text: 'Document exactly what consent was given, what clarification you sought, and the legal basis for the search — plain view, specific consent expansion, or independent PC — whatever is accurate.',
          shortLabel: 'Document the actual scope and legal basis accurately',
          quality: 'good',
          next: 'c3-good'
        },
        {
          text: 'Wait to see what the prosecutor advises before putting specific legal reasoning in your report.',
          shortLabel: 'Hold off on legal reasoning — wait for prosecutor',
          quality: 'risky',
          next: 'c3-neutral'
        }
      ]
    },
    'c3-bad': {
      type: 'consequence',
      outcomeClass: 'outcome-bad',
      outcomeLabel: 'Suppression Risk',
      heading: 'Overstating consent scope creates a suppression problem.',
      narrative: [
        'Florida v. Jimeno (1991) makes clear that consent scope is objective — what a reasonable person would have understood. If you did not clarify whether the locked box was included, claiming it was covered by general consent is legally inaccurate and will not hold up.',
        'Inaccurate documentation does not protect the evidence — it undermines it. Defense counsel will exploit any gap between what you claim consent covered and what you can actually articulate. The result could be full suppression of the locked box and its contents.',
        'Document what actually happened. If there was a gap in your consent inquiry, that is a lesson for next time — not something to paper over.'
      ],
      legal: 'Florida v. Jimeno (1991): Consent scope is measured by objective reasonableness. An officer claiming general consent extended to a locked container without specific clarification risks suppression of that evidence at a motion hearing.',
      next: 'debrief'
    },
    'c3-good': {
      type: 'consequence',
      outcomeClass: 'outcome-good',
      outcomeLabel: 'Sound Documentation',
      heading: 'Accurate legal documentation protects the evidence and your credibility.',
      narrative: [
        'Your report articulates the exact consent given, whether you clarified the scope, and the independent legal basis for opening the locked container — whether that is plain view, expanded consent, or probable cause developed during the search.',
        'This is how legally defensible reports are built. The prosecutor now has everything needed to respond to the suppression motion: your documentation tells the story clearly, with the correct legal framework attached.',
        'Officers who understand search and seizure law write reports that survive motions to suppress. That is the standard.'
      ],
      legal: 'Horton v. California (1990) — plain view seizure requires lawful presence plus immediately apparent incriminating nature. Florida v. Jimeno — scope of consent is objective. Document which doctrine applies to each specific action taken during the search.',
      next: 'debrief'
    },
    'c3-neutral': {
      type: 'consequence',
      outcomeClass: 'outcome-neutral',
      outcomeLabel: 'Documentation Delayed',
      heading: 'Waiting on the prosecutor delays a report that should already reflect your observations.',
      narrative: [
        'Your report should document what you observed and did — not the legal conclusion. The prosecutor handles the legal argument; you handle the accurate factual record. Those are separate jobs.',
        'The longer you wait to document accurately, the more details fade and the more it looks like your report was shaped by legal strategy rather than by your contemporaneous observations.',
        'Write what you know now. Your attorney or prosecutor can advise on how to argue the law — but they cannot improve facts that are not in your report.'
      ],
      legal: 'Police reports are contemporaneous records. Courts scrutinize reports written or revised after legal challenges arise. Document what occurred at the time of the search, including the consent exchange, as accurately and specifically as possible.',
      next: 'debrief'
    },
    'debrief': { type: 'debrief' }
  }
};

/* ══════════════════════════════════════════
   SCENARIO — Use of Force
══════════════════════════════════════════ */
const SCENARIO_USE_OF_FORCE = {
  id: 'scenario-use-of-force',
  title: 'Mountain Road — Domestic Disturbance',
  location: 'Mountain Road, Millbrook Township, PA',
  totalDecisions: 3,
  nodes: {
    'start': {
      type: 'scene', time: '19:43', weather: 'Dusk / Clear', unit: 'Patrol Unit 5',
      narrative: [
        'You respond to a domestic disturbance call on Mountain Road. A neighbor reported a loud argument. As you arrive, you observe a male subject — later identified as 38-year-old resident — standing on the front porch, yelling toward the front door.',
        'He notices you approaching and turns in your direction. He is holding a large aluminum flashlight, raised at shoulder height. He begins walking toward you. You estimate he is approximately 25 feet away.'
      ],
      next: 'd1'
    },
    'd1': {
      type: 'decision', decisionNumber: 1,
      situation: 'The subject is advancing toward you, flashlight raised. His face is red, he is yelling incoherently, and he is not responding to your presence. You are in the open with no cover. Your partner has not yet arrived.',
      question: 'What is your immediate response?',
      options: [
        { text: 'Issue loud, clear verbal commands — "Stop! Police! Drop what\'s in your hand!" — while creating distance and moving laterally toward cover.', next: 'c1a', quality: 'good', shortLabel: 'Verbal commands with distance and cover' },
        { text: 'Deploy your Taser. He has a potential impact weapon and is advancing — force is justified.', next: 'c1b', quality: 'risky', shortLabel: 'Immediate Taser deployment' },
        { text: 'Draw your firearm and issue commands to stop. The flashlight is a deadly weapon.', next: 'c1c', quality: 'bad', shortLabel: 'Firearm drawn — potentially excessive' },
        { text: 'Advance toward him to close distance and attempt to control the situation before he reaches you.', next: 'c1d', quality: 'bad', shortLabel: 'Closed distance — poor tactics' },
      ]
    },
    'c1a': {
      type: 'consequence', outcomeClass: 'outcome-good', outcomeLabel: 'Proportionate — Tactically Sound',
      heading: 'He stops.',
      narrative: [
        'Your commands are clear and authoritative. The subject stops at approximately 15 feet. He continues to yell but is no longer advancing. Your partner arrives 40 seconds later. Together you continue issuing commands. The subject eventually drops the flashlight and is taken into custody without further incident.',
        'No physical force was applied beyond verbal commands. You file a use of force report because verbal commands in a threatening encounter meet the threshold — any intentional application of force, including voice commands used to compel compliance, is documented at your department.'
      ],
      legal: 'Graham v. Connor (1989) establishes the objective reasonableness standard for all use of force. Courts evaluate: (1) severity of the crime at issue, (2) whether the subject poses an immediate threat, and (3) whether the subject is actively resisting or evading. Distance, cover, and verbal de-escalation reduce liability and demonstrate restraint.',
      next: 'd2a'
    },
    'd2a': {
      type: 'decision', decisionNumber: 2,
      situation: 'Your supervisor requires a use of force report. The subject stopped when commanded — no weapon was deployed, no physical contact made. How do you document the Graham v. Connor analysis in your report?',
      question: 'Which documentation correctly applies the objective reasonableness standard?',
      options: [
        { text: '"Subject was aggressive and I feared for my safety. Verbal commands used to gain compliance."', next: 'c2a_wrong', quality: 'bad', shortLabel: 'Conclusory — no Graham analysis' },
        { text: '"Subject advancing approximately 25 feet, holding aluminum flashlight raised at shoulder height, yelling, non-responsive to officer presence. Severity: domestic disturbance, potential assault in progress. Threat level: immediate — improvised impact weapon. Resistance: active advance. Officer issued verbal commands and created distance. Subject complied. No weapon deployed."', next: 'c2a_right', quality: 'good', shortLabel: 'Full Graham three-factor analysis' },
        { text: '"No force used. Subject complied with verbal commands. No report required."', next: 'c2a_none', quality: 'bad', shortLabel: 'Incorrect — verbal commands require documentation' },
        { text: '"Used verbal commands per training. Situation resolved without injury."', next: 'c2a_wrong', quality: 'bad', shortLabel: 'Incomplete — missing factual basis' },
      ]
    },
    'c2a_none': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Documentation Error',
      heading: 'Verbal commands are a use of force.',
      narrative: [
        'Pennsylvania law and department policy define use of force to include any intentional act used to compel compliance, including voice commands in a threatening encounter. Failing to report this interaction leaves you exposed if the subject later claims excessive force, injuries, or civil rights violations.',
        'No report means no record. No record means no protection.'
      ],
      legal: 'Under PA Act 57 of 2020, officers must document any use of force, broadly defined. A reportable use of force includes the display of a weapon, physical force, and verbal commands used to compel compliance in circumstances where non-compliance would result in physical force. When in doubt, document.',
      next: 'd3'
    },
    'c2a_wrong': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Insufficient Documentation',
      heading: 'Missing the analysis.',
      narrative: [
        'Your report documents what happened but not why the force was objectively reasonable. Defense attorneys and civilian review boards don\'t evaluate your feelings — they evaluate your facts. "Feared for my safety" is a conclusion. It doesn\'t demonstrate that a reasonable officer in your position would have made the same call.',
        'The Graham three-factor analysis — severity, threat, resistance — needs to appear explicitly in every use of force report.'
      ],
      legal: null,
      next: 'd3'
    },
    'c2a_right': {
      type: 'consequence', outcomeClass: 'outcome-good', outcomeLabel: 'Report Legally Defensible',
      heading: 'That\'s the standard.',
      narrative: [
        'Your report walks through each Graham factor with specific, documented facts. A reviewer reading this report — a DA, an internal affairs investigator, a civil attorney — can trace exactly how you reached your force decision and why it was objectively reasonable.',
        'This is what use of force documentation looks like when it\'s done right.'
      ],
      legal: 'Graham v. Connor requires courts to evaluate the "totality of the circumstances" from the perspective of a reasonable officer on scene. Your report must give a future reader the ability to reconstruct that perspective from facts, not feelings. Severity + threat + resistance = the framework every report needs.',
      next: 'd3'
    },
    'c1b': {
      type: 'consequence', outcomeClass: 'outcome-neutral', outcomeLabel: 'Force Applied — Justification Required',
      heading: 'Taser deployed.',
      narrative: [
        'You deploy your Taser. The subject goes down at 20 feet. He is secured without further incident. The flashlight is photographed and collected as evidence.',
        'Your supervisor responds to the scene. You have a use of force report to complete. The district attorney\'s office will also review this incident given the Taser deployment.'
      ],
      legal: null,
      next: 'd2b'
    },
    'd2b': {
      type: 'decision', decisionNumber: 2,
      situation: 'The subject is secured and awaiting EMS — Taser deployments require medical evaluation at your department. Your supervisor asks whether verbal de-escalation was attempted before deployment. How do you respond?',
      question: 'What does your documentation reflect?',
      options: [
        { text: 'You issued one command before deploying — "Stop or I\'ll tase you." You document that commands were given.', next: 'c2b_weak', quality: 'risky', shortLabel: 'One command — minimal de-escalation documented' },
        { text: 'You did not attempt verbal commands first. You document the threat accurately and explain why immediate deployment was necessary given the distance and speed of advance.', next: 'c2b_honest', quality: 'good', shortLabel: 'Accurate documentation — no commands given' },
        { text: 'You document that you issued multiple commands before deploying, though you only issued one.', next: 'c2b_false', quality: 'bad', shortLabel: 'Inaccurate — overstate de-escalation' },
        { text: 'You note that de-escalation was not feasible given the immediacy of the threat and document the specific facts supporting that conclusion.', next: 'c2b_right', quality: 'good', shortLabel: 'Accurately documented threat and force decision' },
      ]
    },
    'c2b_false': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'False Report — Severe Consequences',
      heading: 'This ends careers.',
      narrative: [
        'Body camera footage shows one command was issued. Your report says multiple. That discrepancy, discovered in review, constitutes filing a false report — a criminal offense in Pennsylvania and a terminable offense at nearly every department. The use of force itself may have been justifiable. The false report is not.',
        'Document what happened. Not what you wish had happened.'
      ],
      legal: 'Falsifying a police report violates 18 Pa. C.S. § 4906 and department policy. Beyond criminal exposure, false reports destroy prosecutions, generate civil liability, and end careers. The force decision is reviewed. The report is the officer\'s character on paper.',
      next: 'd3'
    },
    'c2b_weak': {
      type: 'consequence', outcomeClass: 'outcome-neutral', outcomeLabel: 'Documentation Is Thin',
      heading: 'One command may not be enough.',
      narrative: [
        'A single command before Taser deployment will be scrutinized. The Graham analysis requires courts to consider whether less force was available. One command at a rapidly advancing subject may be defensible — but your report needs to explain why more commands were not feasible given the speed and distance of the advance.',
        'Thin documentation of de-escalation creates unnecessary exposure.'
      ],
      legal: null, next: 'd3'
    },
    'c2b_honest': {
      type: 'consequence', outcomeClass: 'outcome-good', outcomeLabel: 'Accurate Documentation',
      heading: 'Honesty protects you.',
      narrative: [
        'Your report accurately reflects that verbal commands were not issued prior to deployment and explains why — the speed of the advance, the distance, and the immediate threat posed by the raised impact weapon did not allow time for additional commands. That\'s a defensible force decision.',
        'Accurate documentation of a difficult situation is always better than inflated documentation that contradicts body camera footage.'
      ],
      legal: 'PA Act 57 of 2020 requires accurate, complete use of force reports. The law does not require de-escalation in every situation — it requires that force decisions be objectively reasonable. If a threat is immediate and de-escalation is not feasible, document that specifically.',
      next: 'd3'
    },
    'c2b_right': {
      type: 'consequence', outcomeClass: 'outcome-good', outcomeLabel: 'Well-Documented Force Decision',
      heading: 'Solid report.',
      narrative: [
        'Your documentation explains why de-escalation was not feasible given the immediacy of the threat — specific distance, speed of advance, raised weapon — and articulates the force decision using the Graham three-factor framework. The DA\'s office reviews it and closes the file.',
        'This is what good use of force documentation looks like.'
      ],
      legal: 'The Graham analysis — severity, immediacy of threat, active resistance or evasion — must appear in every use of force report. When de-escalation is not attempted, the report must explain why it was not feasible. Specificity is protection.',
      next: 'd3'
    },
    'c1c': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Potentially Excessive — Civil Exposure',
      heading: 'A flashlight at 25 feet may not justify a firearm.',
      narrative: [
        'The subject stops when he sees your weapon drawn. He drops the flashlight and begins to comply. No shots are fired. He is arrested without further incident.',
        'Three weeks later, your department receives a civil rights complaint. The subject\'s attorney argues that drawing a firearm against an unarmed subject — a flashlight is not a firearm — at 25 feet, without attempting verbal commands or less-lethal options, was excessive under Graham v. Connor. Your supervisor asks for your use of force justification.'
      ],
      legal: 'Graham v. Connor evaluates force against the threat actually presented, not the threat you feared. A flashlight is an improvised impact weapon — serious, but generally not classified as a deadly weapon at 25 feet. Drawing a firearm as a first response, without attempting verbal commands or less-lethal options, will face significant scrutiny.',
      next: 'd2c'
    },
    'd2c': {
      type: 'decision', decisionNumber: 2,
      situation: 'Internal affairs is reviewing the incident. They ask you to explain your force decision. Which response best supports your position?',
      question: 'How do you articulate your use of force decision?',
      options: [
        { text: '"I believed my life was in danger and I reacted accordingly."', next: 'c2c_wrong', quality: 'bad', shortLabel: 'Subjective — no Graham analysis' },
        { text: '"The subject was advancing rapidly with a raised impact weapon. At 25 feet and closing, I assessed the threat as immediate. I presented my firearm to create compliance. In hindsight, I would have issued verbal commands simultaneously. I document this as a lesson applied."', next: 'c2c_honest', quality: 'good', shortLabel: 'Honest, specific, self-aware' },
        { text: '"The flashlight was a deadly weapon and justified lethal force options."', next: 'c2c_over', quality: 'bad', shortLabel: 'Overstated — unsupported legal claim' },
        { text: '"I followed my training and assessed the threat in real time."', next: 'c2c_wrong', quality: 'bad', shortLabel: 'Vague — no factual basis' },
      ]
    },
    'c2c_wrong': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Cannot Withstand Scrutiny',
      heading: 'Not specific enough.',
      narrative: [
        'Subjective statements and vague references to training do not satisfy the Graham standard. Internal affairs and civil courts evaluate facts — distance, speed, weapon, available options, actions taken. Generic responses invite adverse findings.'
      ],
      legal: null, next: 'd3'
    },
    'c2c_over': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Legally Unsupportable',
      heading: 'An aluminum flashlight is not a firearm.',
      narrative: [
        'Claiming a flashlight qualifies as a deadly weapon justifying lethal force options — without additional circumstances — will not survive legal review. Overstating the threat to justify the force decision is worse than honestly acknowledging the force decision was made quickly and imperfectly.'
      ],
      legal: null, next: 'd3'
    },
    'c2c_honest': {
      type: 'consequence', outcomeClass: 'outcome-good', outcomeLabel: 'Credible and Defensible',
      heading: 'Honesty with accountability.',
      narrative: [
        'Acknowledging what you observed, why you responded the way you did, and what you would do differently demonstrates credibility and self-awareness — both of which matter significantly in internal review and civil litigation. The complaint is closed. The department notes the incident for training purposes.',
        'Officers who can articulate their decisions honestly — including their limitations — are far more defensible than those who can\'t.'
      ],
      legal: 'Graham v. Connor is evaluated from the perspective of a reasonable officer on scene, not with 20/20 hindsight. Honest, specific documentation of a rapid force decision — including acknowledgment of what could have been done differently — demonstrates professional judgment, not misconduct.',
      next: 'd3'
    },
    'c1d': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Poor Tactics — Escalated Situation',
      heading: 'You closed distance on an armed subject.',
      narrative: [
        'Advancing toward a subject holding an impact weapon eliminates your reaction time and removes your tactical options. At 10 feet, the subject swings the flashlight. It connects with your left forearm before you can control his arm. Your partner arrives to find you engaged in a physical struggle.',
        'The incident results in documented injury to you, a use of force report, a workers\' compensation claim, and a tactical debrief from your sergeant. The force outcome is reviewable.'
      ],
      legal: 'Distance is a tactical asset. Closing distance on a subject with an impact weapon eliminates your ability to transition between force options and dramatically increases injury risk to both parties. Verbal commands with distance and cover are almost always the correct first response.',
      next: 'd2d'
    },
    'd2d': {
      type: 'decision', decisionNumber: 2,
      situation: 'During the tactical debrief, your sergeant asks what your initial assessment was when you saw the subject with the flashlight. What should your answer reflect?',
      question: 'What is the correct takeaway from this encounter?',
      options: [
        { text: '"I thought I could control him before he reached me."', next: 'c2d_wrong', quality: 'bad', shortLabel: 'Overconfidence — wrong lesson' },
        { text: '"Distance, cover, and verbal commands should have been my first response. Closing distance eliminated my options and increased risk."', next: 'c2d_right', quality: 'good', shortLabel: 'Correct tactical lesson identified' },
        { text: '"I reacted the way I was trained."', next: 'c2d_wrong', quality: 'bad', shortLabel: 'Deflects accountability' },
        { text: '"The situation was unpredictable and I did the best I could."', next: 'c2d_wrong', quality: 'bad', shortLabel: 'Does not identify the error' },
      ]
    },
    'c2d_wrong': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Lesson Not Applied',
      heading: 'The debrief exists for a reason.',
      narrative: [
        'An officer who cannot identify their tactical error in debrief is an officer who will repeat it. Distance and cover are not suggestions — they are force multipliers that keep you in the fight and give you options. Closing on an armed subject removes both.'
      ],
      legal: null, next: 'd3'
    },
    'c2d_right': {
      type: 'consequence', outcomeClass: 'outcome-good', outcomeLabel: 'Correct Assessment',
      heading: 'Right lesson. Apply it.',
      narrative: [
        'Your sergeant agrees. The debrief is documented. You identify the tactical error clearly: distance and verbal commands first, always. The incident goes into your training record as a learning event, not a misconduct finding.',
        'Officers who can identify and articulate their errors are the ones who improve.'
      ],
      legal: 'Distance management is a fundamental officer safety principle. The reactionary gap — the distance required for an officer to respond to an attack — is approximately 21 feet for an edged weapon (Tueller Drill). Impact weapons require similar respect. Verbal commands at distance are almost always the first correct response.',
      next: 'd3'
    },

    'd3': {
      type: 'decision',
      decisionNumber: 3,
      situation: 'Your supervisor has arrived on scene. The subject is in custody and EMS is on the way. The supervisor asks for your initial verbal account of the use of force before you write your report. You are still in the middle of an adrenaline response — heart rate elevated, hands slightly unsteady. Two civilian witnesses are still nearby and observing.',
      question: 'How do you handle the supervisor\'s request for an immediate verbal account?',
      options: [
        {
          text: 'Provide a full, detailed account right now — walk through every action in sequence while it is still fresh.',
          shortLabel: 'Give full detailed account immediately',
          quality: 'risky',
          next: 'c3-neutral'
        },
        {
          text: 'Tell your supervisor you need a moment to come down physiologically, then provide a professional overview of events — what the threat was, what force was used, and why — and complete a thorough written report as required by ALO',
          shortLabel: 'Brief moment to stabilize, then professional overview',
          quality: 'good',
          next: 'c3-good'
        },
        {
          text: 'Tell your supervisor you are not saying anything until your union rep arrives.',
          shortLabel: 'Refuse to speak — union rep first',
          quality: 'bad',
          next: 'c3-bad'
        }
      ]
    },
    'c3-bad': {
      type: 'consequence',
      outcomeClass: 'outcome-bad',
      outcomeLabel: 'Creates More Risk',
      heading: 'A complete refusal on scene escalates an already visible situation.',
      narrative: [
        'You have a right to union representation, and invoking it for a formal administrative interview is appropriate and protected. But refusing to provide any information on scene — when your supervisor is conducting an initial safety assessment, not a formal interrogation — is a different matter.',
        'A total refusal on scene with civilian witnesses present, after a use of force, raises questions rather than protecting you. Your supervisor cannot complete an accurate incident report without basic facts.',
        'The correct approach: provide a professional, factual overview of the threat and your response. Invoke your right to representation if the conversation moves toward a formal administrative interview or if you are being treated as a subject of investigation.'
      ],
      legal: 'Garrity v. New Jersey (1967) protects officers from self-incrimination in compelled administrative statements. However, Garrity protections apply to formal compelled interrogations — not initial on-scene briefings. Know the distinction.',
      next: 'debrief'
    },
    'c3-good': {
      type: 'consequence',
      outcomeClass: 'outcome-good',
      outcomeLabel: 'Professional Response',
      heading: 'Physiological awareness plus accurate reporting is the professional standard.',
      narrative: [
        'High-stress incidents cause well-documented perceptual distortions — tunnel vision, time distortion, auditory exclusion, and memory gaps that fill in over the following 24-48 hours. Providing a detailed accounting while still in acute stress increases the chance of inaccuracies.',
        'Asking for a brief moment is not weakness — it is evidence-based practice. The critical overview (threat, force used, why) gives your supervisor what they need for immediate scene management. Your written report, completed after the stress response has subsided, captures the full accurate account.',
        'This approach is consistent with MTPD ALO use-of-force reporting requirements and protects the integrity of your documentation.'
      ],
      legal: 'Use-of-force reports must document the specific threat perceived, force applied, and the officer\'s reasoning under Graham v. Connor\'s objective reasonableness standard. Reports written during acute stress response are more likely to contain inaccuracies — allow physiological recovery before writing.',
      next: 'debrief'
    },
    'c3-neutral': {
      type: 'consequence',
      outcomeClass: 'outcome-neutral',
      outcomeLabel: 'Avoidable Risk',
      heading: 'Detailed immediate accounts carry memory accuracy risk after a high-stress event.',
      narrative: [
        'It feels like the right move — give all the details while they are fresh. But the research on officer-involved incidents shows that perceptual memory immediately after a high-stress event is often distorted and incomplete. Details correct themselves over the next 24-48 hours.',
        'A statement given immediately, in full detail, may contain inaccuracies that later appear as inconsistencies — even when you are being fully honest. Those inconsistencies become problems in administrative review and civil litigation.',
        'The professional approach is an immediate factual overview (threat, force, reason) and a complete written report after appropriate recovery time.'
      ],
      legal: 'Courts and administrative bodies compare officers\' initial verbal statements to later written reports. Discrepancies — even those caused by the normal physiology of stress response — can be used to challenge credibility. MTPD ALO establishes reporting timelines for this reason.',
      next: 'debrief'
    },
    'debrief': { type: 'debrief' }
  }
};

/* ══════════════════════════════════════════
   SCENARIO — Report Writing
══════════════════════════════════════════ */
const SCENARIO_REPORT_WRITING = {
  id: 'scenario-report-writing',
  title: 'Route 113 — Foot Pursuit',
  location: 'Route 113, Millbrook Township, PA',
  totalDecisions: 3,
  nodes: {
    'start': {
      type: 'scene', time: '23:52', weather: 'Clear / 48°F', unit: 'Patrol Unit 2',
      narrative: [
        'You stop a vehicle on Route 113 for traveling 54 in a 35. As you approach on foot, the driver exits the vehicle and immediately flees on foot into an adjacent parking lot. You pursue.',
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

/* ══════════════════════════════════════════
   SCENARIO — Crisis Intervention
══════════════════════════════════════════ */
const SCENARIO_CRISIS = {
  id: 'scenario-crisis',
  title: 'Covered Bridge Road — Welfare Check',
  location: 'Covered Bridge Road, Millbrook Township, PA',
  totalDecisions: 3,
  nodes: {
    'start': {
      type: 'scene', time: '14:22', weather: 'Overcast / 61°F', unit: 'Patrol Unit 4',
      narrative: [
        'You are dispatched to a welfare check at a residential address on Covered Bridge Road. The caller is the subject\'s mother. She reports that her 31-year-old son has been in a mental health crisis for approximately two days, has not taken his prescribed medication, and made a statement this morning about "not wanting to be here anymore."',
        'She does not know if he has access to weapons. He lives alone. You arrive to find the subject seated on his front porch steps, rocking slowly, arms folded across his chest. He appears to be speaking quietly to himself. He does not acknowledge your approach.'
      ],
      next: 'd1'
    },
    'd1': {
      type: 'decision', decisionNumber: 1,
      situation: 'The subject is non-responsive to your presence. He is not displaying any visible weapon. He appears distressed, not threatening. You are approximately 30 feet away.',
      question: 'How do you make initial contact?',
      options: [
        { text: 'Approach directly and authoritatively. Identify yourself and ask him to stand and face you.', next: 'c1a', quality: 'bad', shortLabel: 'Direct authoritative approach — escalating' },
        { text: 'Stay at your vehicle. Call for backup and a mental health co-responder before making any contact.', next: 'c1b', quality: 'risky', shortLabel: 'Staged at vehicle — waiting for backup' },
        { text: 'Approach slowly at a non-threatening angle. Speak in a calm, quiet voice: "Hey — my name\'s [name] from your department. Your mom asked me to come check on you. Mind if I sit with you for a minute?"', next: 'c1c', quality: 'good', shortLabel: 'Calm, low-key approach — CIT principles' },
        { text: 'Call the mother back to gather more information before making any contact with the subject.', next: 'c1d', quality: 'risky', shortLabel: 'Called mother for more information first' },
      ]
    },
    'c1a': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Subject Escalated — Crisis Deepened',
      heading: 'He didn\'t respond to authority — he responded to it.',
      narrative: [
        'Your direct approach and commanding tone cause the subject to snap upright. He begins yelling, pacing the porch, and moves toward the front door. You have lost the window for a calm contact. The situation has escalated from a distressed subject to a potential crisis standoff.',
        'For individuals in a mental health crisis, authoritative commands often trigger fight-or-flight responses that have nothing to do with compliance. The approach matters more than the words.'
      ],
      legal: 'Pennsylvania\'s Mental Health Procedures Act (MHPA, 50 P.S. § 7302) authorizes involuntary examination when a person poses a clear and present danger to themselves or others. But getting to that point safely requires de-escalation, not escalation. PA Act 57 of 2020 requires officers to consider de-escalation whenever it is safe to do so.',
      next: 'd2a'
    },
    'c1b': {
      type: 'consequence', outcomeClass: 'outcome-neutral', outcomeLabel: 'Safe — But Window Narrowing',
      heading: 'You\'re staged. Now what?',
      narrative: [
        'You maintain your position at your vehicle. Your partner arrives four minutes later. A mental health co-responder is 20 minutes out. During that time, the subject stands, looks toward his vehicle, and begins walking toward it.',
        'He may be retrieving something. He may be attempting to leave. You now have to make a decision about whether to intercept.'
      ],
      legal: null, next: 'd2b'
    },
    'c1c': {
      type: 'consequence', outcomeClass: 'outcome-good', outcomeLabel: 'Contact Established — Subject Talking',
      heading: 'He\'s talking.',
      narrative: [
        'Your calm approach and non-threatening posture work. The subject looks up after your first sentence. He does not speak immediately, but he doesn\'t move away either. You slow your approach, take a position at his level — seated on the steps nearby — and wait.',
        'After 90 seconds, he says: "She shouldn\'t have called you." You respond: "She was worried. I\'m not here to do anything — just to talk." He begins speaking. After several minutes of conversation, he mentions there is "something inside he could use" if things got bad enough.'
      ],
      legal: null, next: 'd2c'
    },
    'c1d': {
      type: 'consequence', outcomeClass: 'outcome-neutral', outcomeLabel: 'More Information — Now Act on It',
      heading: 'His mother tells you he has a shotgun.',
      narrative: [
        'The mother confirms he owns a shotgun, kept in a hall closet. He purchased it legally. She does not know if he has loaded it. He has no history of violence toward others, but three prior 302 evaluations for suicidal ideation.',
        'You now have information that changes your approach. The situation is more complex than it appeared. Your partner is 3 minutes out.'
      ],
      legal: null, next: 'd2d'
    },
    'd2a': {
      type: 'decision', decisionNumber: 2,
      situation: 'The subject is now pacing the porch and yelling. He has not produced a weapon. Your partner is arriving. How do you de-escalate from this position?',
      question: 'What is your next action?',
      options: [
        { text: 'Maintain your position, reduce your own volume and tone, and wait for him to exhaust the initial spike before speaking again.', next: 'c2a_right', quality: 'good', shortLabel: 'Waited out the spike — reduced own energy' },
        { text: 'Issue commands for him to stop pacing and face you.', next: 'c2a_wrong', quality: 'bad', shortLabel: 'More commands — continued escalation' },
        { text: 'Approach the porch to get closer to him.', next: 'c2a_wrong', quality: 'bad', shortLabel: 'Closed distance — escalating' },
        { text: 'Request a 302 involuntary evaluation immediately.', next: 'c2a_302', quality: 'risky', shortLabel: 'Immediate 302 request' },
      ]
    },
    'c2a_wrong': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Continued Escalation',
      heading: 'More commands won\'t help right now.',
      narrative: [
        'A person in a mental health crisis who is already elevated does not respond to additional commands the way a non-crisis individual might. Issuing more commands or closing distance at this point prolongs the escalation and increases danger to both parties.',
        'The correct move after an escalation spike is to reduce your own energy, create space, and wait. Let the spike pass before re-engaging.'
      ],
      legal: null, next: 'd3'
    },
    'c2a_302': {
      type: 'consequence', outcomeClass: 'outcome-neutral', outcomeLabel: '302 Criteria Must Be Met',
      heading: 'A 302 requires clear and present danger.',
      narrative: [
        'A 302 involuntary examination under the Pennsylvania MHPA requires that the person poses a clear and present danger to themselves or others. Agitation and a history of crisis alone may not meet the standard if no specific threat has been communicated. Document carefully.',
        'The 302 can be the right tool — but it needs to be grounded in documented criteria, not just a desire to resolve the situation quickly.'
      ],
      legal: '50 P.S. § 7302 authorizes involuntary examination for persons who pose a clear and present danger based on a recent overt act, attempt, or threat. The officer must document the specific basis for the 302 — a general mental health crisis without a specific threat may not satisfy the standard.',
      next: 'd3'
    },
    'c2a_right': {
      type: 'consequence', outcomeClass: 'outcome-good', outcomeLabel: 'De-Escalation Working',
      heading: 'The spike passes.',
      narrative: [
        'You reduce your own volume, step back slightly, and wait. Your partner arrives and mirrors your calm energy. After approximately three minutes, the subject stops pacing and sits back down. You re-engage with the same low-key approach: "That looked rough. You okay?" He begins to talk.',
        'The situation has returned to a workable contact. You can now work toward a voluntary evaluation or a 302 if criteria are met.'
      ],
      legal: 'De-escalation is not just a technique — under PA Act 57 of 2020 and department policy, officers are required to consider de-escalation whenever it is safe and feasible. Documented de-escalation efforts protect the officer and the department.',
      next: 'd3'
    },
    'd2b': {
      type: 'decision', decisionNumber: 2,
      situation: 'The subject is walking toward his vehicle. You don\'t know if he is retrieving something, attempting to leave, or both.',
      question: 'How do you respond?',
      options: [
        { text: 'Intercept him physically before he reaches the vehicle.', next: 'c2b_wrong', quality: 'bad', shortLabel: 'Physical intercept — premature force' },
        { text: 'Call out to him calmly by name: "Hey — where are you headed? Can you hang tight for a second?" Make contact before he reaches the vehicle.', next: 'c2b_right', quality: 'good', shortLabel: 'Verbal intercept — calm tone' },
        { text: 'Draw your weapon and order him to stop.', next: 'c2b_force', quality: 'bad', shortLabel: 'Weapon drawn — excessive for current threat' },
        { text: 'Let him reach the vehicle and see what he does.', next: 'c2b_wait', quality: 'risky', shortLabel: 'Waited — unknown risk allowed to develop' },
      ]
    },
    'c2b_wrong': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Force Without Justification',
      heading: 'He hasn\'t done anything yet.',
      narrative: [
        'Physically intercepting a subject who is walking — with no weapon visible, no threat made — is a use of force without a clear legal basis. If the subject was simply going to get his keys or phone, you\'ve now created an incident out of a non-incident and potentially triggered the exact crisis you were trying to prevent.'
      ],
      legal: null, next: 'd3'
    },
    'c2b_force': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Excessive — No Threat Present',
      heading: 'A weapon is not justified here.',
      narrative: [
        'Drawing your weapon on a distressed person walking toward a vehicle — with no visible weapon, no threatening statement, no overt act — is excessive and likely to catastrophically escalate the situation. A person in crisis who sees a drawn firearm may interpret it as confirmation of their worst fears.'
      ],
      legal: 'Graham v. Connor requires that force be objectively reasonable based on the threat as it exists at the moment force is applied. Walking toward a vehicle is not, by itself, a threat that justifies displaying a firearm.',
      next: 'd3'
    },
    'c2b_wait': {
      type: 'consequence', outcomeClass: 'outcome-neutral', outcomeLabel: 'Risk Allowed to Develop',
      heading: 'He opens the glove box.',
      narrative: [
        'He reaches the vehicle and opens the passenger door. You cannot see what is in the glove box from your position. You now have a subject with potential access to a weapon and no verbal contact established. The risk profile has increased significantly.',
        'A calm verbal intercept before he reached the vehicle could have maintained control of the situation without force.'
      ],
      legal: null, next: 'd3'
    },
    'c2b_right': {
      type: 'consequence', outcomeClass: 'outcome-good', outcomeLabel: 'Contact Maintained',
      heading: 'He stops.',
      narrative: [
        'He hears his name and pauses. He turns toward you. "I just need to get something," he says. You respond: "That\'s fine — just talk to me first. What do you need?" He says his phone charger. You offer to get it with him. He agrees. Contact is maintained. You accompany him to the vehicle.',
        'Calm verbal intercept preserved the situation without force.'
      ],
      legal: 'Crisis intervention is built on maintaining contact and communication. Verbal de-escalation — including using the person\'s name, acknowledging their autonomy, and offering non-threatening choices — is consistently more effective than commands or force in mental health encounters.',
      next: 'd3'
    },
    'd2c': {
      type: 'decision', decisionNumber: 2,
      situation: 'The subject has disclosed that there is "something inside he could use" if things got bad enough. You don\'t know if this means a firearm, medication, or something else. He is still calm and talking to you.',
      question: 'How do you respond to this disclosure?',
      options: [
        { text: 'Ask him directly: "Are you telling me you have a gun inside?" and prepare to act on his answer.', next: 'c2c_direct', quality: 'good', shortLabel: 'Direct, calm clarifying question' },
        { text: 'Immediately back away and call for backup and tactical support.', next: 'c2c_tactical', quality: 'risky', shortLabel: 'Withdrew for tactical support' },
        { text: 'Ignore the statement and keep the conversation going — you don\'t want to break the rapport.', next: 'c2c_ignore', quality: 'bad', shortLabel: 'Ignored the disclosure' },
        { text: 'Tell him you need to go inside and secure whatever it is before you continue talking.', next: 'c2c_enter', quality: 'bad', shortLabel: 'Pushed to enter — broke rapport' },
      ]
    },
    'c2c_direct': {
      type: 'consequence', outcomeClass: 'outcome-good', outcomeLabel: 'Disclosure Handled Correctly',
      heading: 'He tells you.',
      narrative: [
        'He pauses, looks at you, and nods. "It\'s my dad\'s shotgun. I haven\'t loaded it." You maintain your calm tone: "Thank you for telling me that. That helps me understand. Would you be willing to let my partner hold onto it while we keep talking — just so we don\'t have to think about it?" After a moment, he agrees.',
        'Your partner retrieves the shotgun. The conversation continues. You coordinate with a mental health co-responder for a voluntary evaluation. He agrees to go.'
      ],
      legal: 'Voluntary weapon surrender during a mental health encounter, achieved through rapport and calm communication, is almost always preferable to a forced entry or a physical intervention. Document the disclosure, the request, the voluntary surrender, and the outcome. This protects everyone involved.',
      next: 'd3'
    },
    'c2c_tactical': {
      type: 'consequence', outcomeClass: 'outcome-neutral', outcomeLabel: 'Rapport Lost — Situation Hardens',
      heading: 'You broke contact. He noticed.',
      narrative: [
        'You step back and call dispatch. The subject sees you withdraw and his demeanor shifts. He goes back inside and locks the door. A 90-minute standoff follows before a mental health co-responder talks him out.',
        'Withdrawing without explanation when a person in crisis has just disclosed something vulnerable often reads as rejection or threat. The disclosure was an opening. Backing away closed it.'
      ],
      legal: null, next: 'd3'
    },
    'c2c_ignore': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Threat Not Addressed',
      heading: 'You cannot ignore a weapon disclosure.',
      narrative: [
        'Ignoring a statement about access to a means of self-harm — in a welfare check for suicidal ideation — is a failure of both your duty of care and your tactical responsibility. The rapport you built has value, but it cannot come at the cost of a disclosed safety threat.',
        'The disclosure needed to be addressed — calmly, directly, and without breaking the connection you\'d built.'
      ],
      legal: null, next: 'd3'
    },
    'c2c_enter': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Rapport Broken — Entry Legally Questionable',
      heading: 'Pushing to enter ended the conversation.',
      narrative: [
        'He immediately withdraws when you suggest entering his home. "You\'re not coming in" — he stands up and moves toward the door. The rapport you built over 15 minutes is gone in 10 seconds.',
        'Additionally, without consent or a warrant, entering his residence requires a recognized exception — exigent circumstances or a 302 — neither of which is fully established yet based on the disclosure alone.'
      ],
      legal: 'A statement about access to a means of self-harm, without more, may not by itself meet the exigent circumstances threshold for a warrantless entry. PA courts evaluate whether the threat was immediate and specific. Document carefully. When in doubt, work toward consent — it\'s always cleaner than forced entry.',
      next: 'd3'
    },
    'd2d': {
      type: 'decision', decisionNumber: 2,
      situation: 'You now know he owns a shotgun and has a history of suicidal ideation. Your partner is 2 minutes out. The subject is still seated on the porch, unaware you spoke to his mother. How do you make initial contact?',
      question: 'How do you approach, knowing what you now know?',
      options: [
        { text: 'Approach with your partner, both in full uniform with hands near your weapons. Announce yourselves and ask him to step off the porch.', next: 'c2d_wrong', quality: 'bad', shortLabel: 'Tactical approach — escalating for the situation' },
        { text: 'Wait for your partner to arrive, then approach together — one officer in the lead for conversation, one positioned for safety — with a calm, low-key opening.', next: 'c2d_right', quality: 'good', shortLabel: 'Coordinated calm approach with safety positioning' },
        { text: 'Approach alone immediately — you don\'t want him to feel surrounded when your partner arrives.', next: 'c2d_solo', quality: 'risky', shortLabel: 'Solo approach before backup arrives' },
        { text: 'Call for SWAT — the presence of a firearm makes this a tactical situation.', next: 'c2d_swat', quality: 'bad', shortLabel: 'SWAT requested — disproportionate response' },
      ]
    },
    'c2d_wrong': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Tactical Approach Escalated Crisis',
      heading: 'He read that as a threat.',
      narrative: [
        'Two officers approaching in a tactical posture — hands near weapons, commanding tone — caused the subject to retreat inside immediately. You have lost access. The situation is now a barricaded subject call.',
        'The information about the shotgun should inform your safety positioning and awareness — not your approach posture. He is a person in crisis, not a subject of a tactical operation.'
      ],
      legal: null, next: 'd3'
    },
    'c2d_solo': {
      type: 'consequence', outcomeClass: 'outcome-neutral', outcomeLabel: 'Contact Made — Safety Exposure',
      heading: 'Contact made. Safety positioning thin.',
      narrative: [
        'You make contact before your partner arrives. The subject engages and is willing to talk. But you are alone with a subject you know has a shotgun inside, in a mental health crisis, with a history of suicidal ideation. Your safety positioning is not where it needs to be.',
        'Waiting 90 seconds for your partner would have given you both the contact and the coverage.'
      ],
      legal: null, next: 'd3'
    },
    'c2d_swat': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Disproportionate Response',
      heading: 'SWAT is not the tool for this situation.',
      narrative: [
        'A distressed person in a mental health crisis, legally owning a firearm, seated on his porch and not threatening anyone, does not meet the threshold for a SWAT response. Deploying a tactical team to this situation would escalate it catastrophically and expose the department to significant civil liability.',
        'Information about a legally owned firearm changes your approach and awareness — it does not automatically change the nature of the call.'
      ],
      legal: null, next: 'd3'
    },
    'c2d_right': {
      type: 'consequence', outcomeClass: 'outcome-good', outcomeLabel: 'Contact Established — Safety Maintained',
      heading: 'Coordinated and calm.',
      narrative: [
        'Your partner arrives. You brief them quickly on what you know. You take the lead on conversation; your partner positions to your offset for safety awareness without appearing tactical. You approach with the same low-key opening: "Hey — your mom was worried about you. Mind if we talk for a minute?"',
        'He looks up, nods. Contact is established. Your awareness of the shotgun informs your positioning — not your demeanor. That\'s the right balance.'
      ],
      legal: 'Crisis intervention and officer safety are not mutually exclusive. Knowing about a potential weapon changes your tactical awareness — where you position, where your partner stands, what you observe. It does not change the basic principle that a calm, respectful approach is almost always the correct first contact in a mental health call.',
      next: 'd3'
    },

    'd3': {
      type: 'decision',
      decisionNumber: 3,
      situation: 'The subject agreed to voluntary transport for a mental health evaluation. You are walking him toward your patrol vehicle in the parking lot when he stops, sits down on the curb, and says: "I changed my mind. I\'m not going. I feel better now." He is calm, coherent, and no longer making statements about harming himself. He is not under an involuntary commitment order at this point. His family member, who arrived on scene, is urging you to force him to go.',
      question: 'What is your correct course of action?',
      options: [
        {
          text: 'He agreed to go, so you can physically place him in the vehicle — consent was already given.',
          shortLabel: 'Place him in vehicle — prior consent binds him',
          quality: 'bad',
          next: 'c3-bad'
        },
        {
          text: 'Acknowledge his change of mind. Re-engage de-escalation. Assess current state for involuntary commitment criteria. If criteria are not met, document the interaction, provide crisis resources, and coordinate with the family and mental health follow-up services.',
          shortLabel: 'Re-engage, reassess commitment criteria, document',
          quality: 'good',
          next: 'c3-good'
        },
        {
          text: 'Tell him he has to come because you already called it in and transport is waiting.',
          shortLabel: 'Pressure him using the logistics as leverage',
          quality: 'risky',
          next: 'c3-neutral'
        }
      ]
    },
    'c3-bad': {
      type: 'consequence',
      outcomeClass: 'outcome-bad',
      outcomeLabel: 'Civil Rights Violation',
      heading: 'Voluntary consent can be withdrawn at any time — placing him in the vehicle without legal authority is unlawful detention.',
      narrative: [
        'Voluntary is exactly what it says. He can withdraw consent at any point prior to transport. Once he withdraws consent, the prior agreement is void. Physically placing him in the vehicle now — without a valid § 302 emergency commitment or other lawful authority — constitutes unlawful detention, and potentially assault.',
        'The family member\'s pressure does not create legal authority. Your belief that he needs help does not create legal authority. What creates legal authority is meeting the criteria under 50 Pa. C.S. § 302: clear and present danger to self or others based on observed behavior.',
        'If he no longer meets those criteria, you document and disengage. If he does still meet them, initiate an involuntary commitment — do not manufacture a different basis.'
      ],
      legal: '50 Pa. C.S. § 302 authorizes involuntary emergency examination when an officer observes conduct constituting clear and present danger to self or others. Voluntary transport requires ongoing voluntary consent. Withdrawal of consent without § 302 authority present means the transport cannot proceed.',
      next: 'debrief'
    },
    'c3-good': {
      type: 'consequence',
      outcomeClass: 'outcome-good',
      outcomeLabel: 'Legally and Tactically Sound',
      heading: 'Reassessment, documentation, and connecting to follow-up services is the correct response.',
      narrative: [
        'Re-engaging de-escalation honors his autonomy while giving you accurate information about his current state. If the conversation reveals he still meets § 302 criteria — statements about self-harm, visible behavior indicating imminent danger — you now have a lawful basis for an involuntary commitment.',
        'If he does not meet those criteria: document the full interaction, your assessment, the resources provided, and the follow-up coordination with the family. Note that mobile crisis support or a community health follow-up was offered.',
        'This documentation protects you and creates a record that may be critical if he escalates later. A well-documented welfare contact is a professional outcome.'
      ],
      legal: 'Withdrawal of voluntary consent must be honored. Re-engagement and reassessment is the CIT-trained approach. If § 302 criteria are met, initiate the formal process. If not, document the contact thoroughly — including crisis resources provided and family coordination — per department crisis response protocol.',
      next: 'debrief'
    },
    'c3-neutral': {
      type: 'consequence',
      outcomeClass: 'outcome-neutral',
      outcomeLabel: 'Coercive — Creates Liability',
      heading: 'Using logistics as leverage is coercion — it does not create lawful consent.',
      narrative: [
        'Telling someone they "have to" go because of administrative considerations (you called it in, transport is waiting) implies consequences that do not exist and may constitute coercion. Coerced consent is not lawful consent.',
        'If he complies under this kind of pressure and later claims he was forced, you have a documentation problem — and potentially a legal one. The same outcome you wanted (getting him evaluated) is achievable through proper channels.',
        'If § 302 criteria still exist, invoke them. If they do not, document and disengage. Those are the correct options.'
      ],
      legal: 'Coercion vitiates consent. Transport obtained through pressure or deception — including implying the subject has no choice when they legally do — is not voluntary. This creates civil liability and undermines the legitimacy of any subsequent evaluation.',
      next: 'debrief'
    },
    'debrief': { type: 'debrief' }
  }
};


/* ══════════════════════════════════════════
   SCENARIO — Domestic Violence Response
══════════════════════════════════════════ */
const SCENARIO_DOMESTIC_VIOLENCE = {
  id: 'scenario-dv',
  title: 'Old Skippack Road — Domestic Disturbance',
  location: 'Old Skippack Road, Millbrook Township, PA',
  totalDecisions: 3,
  nodes: {
    'start': {
      type: 'scene', time: '22:47', weather: 'Clear / 54°F', unit: 'Patrol Unit 2',
      narrative: [
        'Dispatch advises a 911 hang-up from a residence on Old Skippack Road. A second call came in from a neighbor reporting shouting and what sounded like breaking glass. The registered resident is Jessica Harmon, 29. PA JNET returns a prior incident at this address eight months ago — a DV report, no arrest at the time.',
        'You and your backup unit arrive two minutes apart. No lights or sirens within one block of the residence, per MTPD ALO 4.13. The house is dark except for a light in a rear room. You hear a male voice raised inside. As you approach the front door, a woman opens it. She has a visible bruise forming under her left eye. She says quietly: "He left out the back." A male is seen walking quickly toward the tree line.'
      ],
      next: 'd1'
    },
    'd1': {
      type: 'decision',
      decisionNumber: 1,
      situation: 'You are at the front door with Jessica Harmon. She has a fresh bruise under her left eye. She tells you the male who just fled is her husband, Marcus Harmon, 31. She says they had an argument, he "pushed her into the door frame," and she hit her face. She now says she does not want to press charges. Your backup unit is at the rear of the property watching the tree line.\n\nJessica says: "I just want him to leave for the night. Can you just make him come back and get his stuff and go somewhere else?"',
      question: 'What is your immediate course of action regarding a potential arrest?',
      options: [
        {
          text: 'Honor the victim\'s request — she does not want to press charges, so no arrest is made. Document the incident and offer resources.',
          shortLabel: 'No arrest — victim\'s request honored',
          quality: 'bad',
          next: 'c1-bad'
        },
        {
          text: 'Take a full report and consult with your supervisor before making an arrest decision.',
          shortLabel: 'Take report, consult supervisor',
          quality: 'risky',
          next: 'c1-neutral'
        },
        {
          text: 'Determine whether probable cause exists for a Simple Assault arrest based on your own observations and Jessica\'s statement — victim consent is not required under MTPD ALO 4.13.',
          shortLabel: 'Assess PC for mandatory arrest independently',
          quality: 'good',
          next: 'c1-good'
        }
      ]
    },
    'c1-bad': {
      type: 'consequence',
      outcomeClass: 'outcome-bad',
      outcomeLabel: 'Policy Violation',
      heading: 'The victim\'s preference does not determine your arrest decision.',
      narrative: [
        'Under MTPD ALO 4.13, in every domestic violence incident involving Simple Assault between household members where the officer has probable cause — based on their own observations or victim statement — arrest is mandatory. Victim consent is not a required element and victim preference does not control the decision.',
        'Jessica has a visible fresh injury consistent with her account. Your observations plus her statement establish probable cause for Simple Assault. Not making that arrest is a policy violation, regardless of what Jessica wants.',
        'Victims in DV situations frequently request no arrest — this is common and expected. It cannot override your obligation under ALO 4.13. Your role is to document, make the required arrest, and ensure victim notifications are completed.',
        'Additionally: you now have a fleeing subject. Your backup needs updated tasking immediately.'
      ],
      legal: 'MTPD ALO 4.13: "In every domestic violence incident in which the police have probable cause, based on their own observations or the statements of witnesses or the victim, to believe that an assault has been committed... officers shall arrest the primary aggressor." Victim consent is not listed as a required element — because it is not.',
      next: 'd2'
    },
    'c1-neutral': {
      type: 'consequence',
      outcomeClass: 'outcome-neutral',
      outcomeLabel: 'Delay Creates Risk',
      heading: 'Supervisor consultation is not required to make a mandatory arrest.',
      narrative: [
        'MTPD ALO 4.13 does not require supervisor authorization before making a DV arrest when probable cause exists. Taking time to consult before acting — while a subject is actively fleeing — may allow Marcus Harmon to exit the area entirely.',
        'The correct approach is to immediately act on the probable cause you already have, notify dispatch of the pursuit of a fleeing DV suspect, and brief your supervisor as part of your follow-up — not as a precondition.',
        'Documentation and supervisor notification are required after the fact, not before.'
      ],
      legal: 'ALO 4.13: Officers shall arrest the primary aggressor when PC exists. Notification to supervisor is required — but is not a precondition for the arrest. Waiting in a fleeing-suspect scenario without a clear reason creates legal and tactical risk.',
      next: 'd2'
    },
    'c1-good': {
      type: 'consequence',
      outcomeClass: 'outcome-good',
      outcomeLabel: 'Correct Application of Mandatory Arrest',
      heading: 'Probable cause is yours to evaluate — not the victim\'s to grant.',
      narrative: [
        'You observe a fresh bruise under Jessica\'s left eye. She provides a statement that her husband pushed her into the door frame. That combination — your direct observation of injury plus a victim statement of recent physical contact by the accused — establishes probable cause for Simple Assault.',
        'Under MTPD ALO 4.13, this arrest is mandatory. Victim preference is not a controlling factor. You immediately advise dispatch of a fleeing DV suspect, update your backup unit on Marcus Harmon\'s description and direction, and begin the process for apprehension.',
        'You also initiate the ALO 4.13 victim notification requirements and begin your narrative checklist for documentation.'
      ],
      legal: 'MTPD ALO 4.13: Officers shall arrest the primary aggressor based on their own observations or victim/witness statements. The probable cause determination is the officer\'s — not the victim\'s. A visible injury plus a consistent victim account satisfies the standard.',
      next: 'd2'
    },
    'd2': {
      type: 'decision',
      decisionNumber: 2,
      situation: 'Marcus Harmon is located at a neighbor\'s property two blocks away and taken into custody without incident. Back at the residence, Jessica is cooperative. While speaking with her, she mentions that Marcus keeps "a few guns" in the bedroom closet — hunting rifles and a handgun. She shows you a Protection From Abuse order that was issued three weeks ago. The PFA is a final order that prohibits Marcus from possessing firearms.\n\nJessica asks you to just list the guns in the report. "He\'s already in custody," she says. "He\'ll probably just turn them over later."',
      question: 'What is your obligation regarding the firearms in the residence?',
      options: [
        {
          text: 'Document the firearms in the report as requested. Marcus is in custody, the PFA is active, and he can surrender them through the legal process.',
          shortLabel: 'Document only — leave firearms for legal process',
          quality: 'bad',
          next: 'c2-bad'
        },
        {
          text: 'Seize the firearms from the residence now. A valid PFA prohibiting possession is in effect, Marcus is the subject of a DV arrest, and leaving known firearms at the scene creates immediate risk.',
          shortLabel: 'Seize firearms — PFA + DV arrest requires it',
          quality: 'good',
          next: 'c2-good'
        },
        {
          text: 'Ask Jessica for consent to take the guns "for safekeeping" and document it as a consent seizure.',
          shortLabel: 'Request victim consent for "safekeeping" seizure',
          quality: 'risky',
          next: 'c2-neutral'
        }
      ]
    },
    'c2-bad': {
      type: 'consequence',
      outcomeClass: 'outcome-bad',
      outcomeLabel: 'Dangerous Outcome',
      heading: 'Leaving firearms at a DV scene following an arrest is a documented risk factor for homicide.',
      narrative: [
        'A valid PFA order prohibiting firearm possession is in effect. Marcus Harmon has just been arrested for assault of the protected party. Firearms are present at the residence and confirmed to be his.',
        'MTPD ALO 4.13 requires officers to seize firearms when a DV arrest is made and the subject is prohibited from possession. This is not discretionary documentation — it is a mandatory action.',
        'Firearms in the home of a DV victim following an arrest of the abuser represent one of the highest-documented lethality risk factors. "He can turn them over later" is not an acceptable justification for non-action when you have the legal authority and departmental obligation to act now.',
        'Document the seizure on a Property Record Form before end of shift per ALO 3.05/3.06.'
      ],
      legal: 'MTPD ALO 4.13: Officers shall seize firearms when a person is arrested for a crime of violence involving a family or household member and is subject to a court order prohibiting possession. The PFA is confirmed. The arrest is complete. The seizure obligation is triggered.',
      next: 'd3'
    },
    'c2-good': {
      type: 'consequence',
      outcomeClass: 'outcome-good',
      outcomeLabel: 'Correct Mandatory Action',
      heading: 'A PFA + DV arrest triggers mandatory firearms seizure.',
      narrative: [
        'You seize the firearms from the residence. A valid final PFA order is in effect prohibiting Marcus Harmon from possessing firearms. He has just been arrested for assault of the protected party. Both conditions triggering mandatory seizure under ALO 4.13 are satisfied.',
        'You complete a Property Record Form for each firearm before end of shift per MTPD ALO 3.05/3.06, documenting each firearm\'s make, model, and serial number, and securing them in the property room.',
        'You also complete the required victim notification checklist under ALO 4.13: provide Jessica with the DV resource card, advise her of the arraignment timeline, explain bail conditions if set, and document completion of notifications in your report narrative.'
      ],
      legal: 'ALO 4.13: Mandatory firearms seizure when arrest is made and subject is prohibited from possession under a PFA order. ALO 3.05/3.06: Property Record Form required for each seized item before end of shift. Chain of custody begins the moment you take possession.',
      next: 'd3'
    },
    'c2-neutral': {
      type: 'consequence',
      outcomeClass: 'outcome-neutral',
      outcomeLabel: 'Correct Result — Wrong Authority',
      heading: 'Consent works here, but you don\'t need it — and relying on it creates a vulnerability.',
      narrative: [
        'Jessica consents to the seizure, and you take the firearms. The outcome is correct — the firearms are removed from the residence. However, framing this as a consent seizure creates an unnecessary legal vulnerability.',
        'You have independent statutory authority to seize those firearms: a valid PFA order prohibiting possession is confirmed, and a DV arrest has been made. That authority does not require the victim\'s consent — and it should not be contingent on it.',
        'If Jessica had refused consent, framing it as a consent request would have left you without a clear path forward. Document the seizure under ALO 4.13 mandatory authority and the PFA — not as a consent search.'
      ],
      legal: 'ALO 4.13 provides independent authority for firearms seizure when a DV arrest is made and a protective order prohibiting possession is in effect. Consent is not required and should not be the stated basis for the seizure. Use the correct legal authority in your documentation.',
      next: 'd3'
    },

    'd3': {
      type: 'decision',
      decisionNumber: 3,
      situation: 'Two hours after Marcus Harmon\'s arrest, Jessica calls the station. She is upset. She says she wants to drop the charges, she wants the guns back, and she is threatening to file a complaint against you for "stealing" the firearms. Your supervisor patches the call to you.',
      question: 'How do you handle Jessica\'s call?',
      options: [
        {
          text: 'Tell her to come in and you will sit down with her to discuss the firearms and the charges.',
          shortLabel: 'Invite her in to discuss informally',
          quality: 'bad',
          next: 'c3-bad'
        },
        {
          text: 'Explain clearly and professionally: the arrest was made under mandatory arrest authority and is not subject to victim withdrawal; the firearms were seized under ALO 4.13 and the active PFA and cannot be returned without a court order; document the call and notify your supervisor.',
          shortLabel: 'Explain the legal framework, document the call',
          quality: 'good',
          next: 'c3-good'
        },
        {
          text: 'Transfer her to your supervisor without briefing them on the background.',
          shortLabel: 'Transfer the call without briefing supervisor',
          quality: 'risky',
          next: 'c3-neutral'
        }
      ]
    },
    'c3-bad': {
      type: 'consequence',
      outcomeClass: 'outcome-bad',
      outcomeLabel: 'Protocol Violation',
      heading: 'Informal conversations with DV victims about active cases create significant risk.',
      narrative: [
        'An informal sit-down about the charges and firearms is exactly the kind of contact that should not happen outside of supervised, documented channels. Any concessions or impressions you create in that meeting — even unintentionally — can undermine the prosecution and expose you to accusations of witness tampering.',
        'DV victims frequently recant or attempt to intervene in prosecutions. This is expected and does not change your obligations. The charges move forward under the Commonwealth\'s authority, not hers. The firearms hold is governed by court order and ALO 4.13 — not by her request.',
        'Document the call. Notify your supervisor. That is your role at this stage.'
      ],
      legal: 'Under ALO 4.13, once a mandatory arrest is made the charging decision is not the victim\'s. Firearms seized under an active PFA require a court order for return. Informal discussions with witnesses in active cases create evidentiary and ethical risk. Document all post-arrest victim contact.',
      next: 'debrief'
    },
    'c3-good': {
      type: 'consequence',
      outcomeClass: 'outcome-good',
      outcomeLabel: 'Professional and Legally Correct',
      heading: 'Explaining the legal framework clearly protects Jessica and the case.',
      narrative: [
        'Victims of domestic violence often attempt to recant or intervene in cases — this is a well-documented response, not evidence that the incident did not occur. Your job is to explain the process accurately and without judgment.',
        'By clearly stating that the arrest proceeded under mandatory authority, that the firearms are held per ALO 4.13 and the active PFA, and that return requires a court order, you give her accurate information and set realistic expectations.',
        'Documenting the contact and notifying your supervisor ensures the detective or prosecutor handling the case is aware of her current position. That contact record may become important at trial.'
      ],
      legal: 'ALO 4.13 mandatory arrest authority is independent of victim preference. Active PFA firearms seizures are governed by 23 Pa. C.S. § 6108 — return of seized firearms requires a court order. Document all post-arrest victim contact per department protocol.',
      next: 'debrief'
    },
    'c3-neutral': {
      type: 'consequence',
      outcomeClass: 'outcome-neutral',
      outcomeLabel: 'Incomplete Handoff',
      heading: 'Transferring without a brief leaves your supervisor unprepared.',
      narrative: [
        'Your supervisor cannot handle this call effectively without context: who she is, what was seized, what the legal basis was, what she is alleging. A cold transfer puts them in the position of either stumbling through the call or asking her to hold while they find your report.',
        'A 30-second brief before transferring — victim\'s name, what happened, what the call is about — is part of professional handoff. It protects the supervisor, the case, and your documentation.',
        'Brief before you transfer. Always.'
      ],
      legal: 'Post-arrest victim contacts in DV cases are sensitive and should be handled by a supervisor or detective with full case knowledge. Ensure any transfer includes a factual brief so the receiving officer can respond accurately and document the contact properly.',
      next: 'debrief'
    },
    'debrief': { type: 'debrief' }
  }
};

/* ══════════════════════════════════════════
   SCENARIO — Motor Vehicle Pursuits
══════════════════════════════════════════ */
const SCENARIO_VEHICLE_PURSUITS = {
  id: 'scenario-pursuits',
  title: 'Route 29 / Swamp Pike — Pursuit Decision',
  location: 'Route 29, Millbrook Township, PA',
  totalDecisions: 3,
  nodes: {
    'start': {
      type: 'scene', time: '01:14', weather: 'Overcast / 47°F', unit: 'Patrol Unit 1',
      narrative: [
        'You initiate a traffic stop on Route 29 for a vehicle traveling 72 mph in a 45 zone. The vehicle — a dark blue Honda Accord — slows and pulls partially toward the shoulder, then accelerates rapidly, running through a red light at the Swamp Pike intersection and continuing southbound.',
        'You immediately activate your emergency equipment and advise dispatch. The time is 0114 hours. There is moderate late-night traffic. You have a partial plate. The vehicle has not been identified as stolen. The offense initiating the stop was a summary traffic violation.'
      ],
      next: 'd1'
    },
    'd1': {
      type: 'decision',
      decisionNumber: 1,
      situation: 'The vehicle is now approximately 200 yards ahead of you, running a second red light. Your speed is 80 mph. The offense was a traffic summary violation — speeding. No criminal indicators beyond flight. No known occupant identity. One unit is available as backup approximately 3 minutes out. Residential intersections are ahead on Route 29.',
      question: 'Under MTPD ALO 4.02, what is your correct course of action?',
      options: [
        {
          text: 'Continue the pursuit — the vehicle is fleeing and establishing pursuit priority is critical. Pursue until the threat is neutralized or the vehicle stops.',
          shortLabel: 'Continue pursuit aggressively',
          quality: 'bad',
          next: 'c1-bad'
        },
        {
          text: 'Continue the pursuit, but notify dispatch immediately, request backup, and prepare to reassess at the next decision point based on developing conditions.',
          shortLabel: 'Continue with notification and ongoing reassessment',
          quality: 'good',
          next: 'c1-good'
        },
        {
          text: 'Terminate the pursuit immediately — any fleeing vehicle constitutes an automatic termination regardless of circumstances.',
          shortLabel: 'Terminate immediately — automatic rule',
          quality: 'risky',
          next: 'c1-neutral'
        }
      ]
    },
    'c1-bad': {
      type: 'consequence',
      outcomeClass: 'outcome-bad',
      outcomeLabel: 'Policy Violation',
      heading: 'Unlimited pursuit for a summary offense violates MTPD ALO 4.02.',
      narrative: [
        'MTPD ALO 4.02 requires continuous evaluation of whether the danger created by a pursuit outweighs the benefit of apprehension. A summary traffic violation — speeding — is among the lowest-priority offense categories. The policy identifies the nature of the offense as a primary termination factor.',
        'Pursuing at high speed through residential intersections at 0114 hours for a speeding violation, without criminal indicators, without identity of the suspect, and without an imminent threat to public safety — creates risk that the policy exists to prevent.',
        'Additionally, ALO 4.02 limits pursuits to a maximum of two patrol units. Pursuit must be authorized by the on-duty supervisor when it extends beyond initial contact. "The vehicle is fleeing" is not an unlimited authorization to continue.'
      ],
      legal: 'MTPD ALO 4.02: Pursuits are authorized when the need to apprehend immediately outweighs the risk created. The nature of the offense, road conditions, and time of day are all required evaluation factors. Summary offenses are specifically cited as a termination consideration when identity is known or apprehension can be accomplished by other means.',
      next: 'd2'
    },
    'c1-good': {
      type: 'consequence',
      outcomeClass: 'outcome-good',
      outcomeLabel: 'Correct Application',
      heading: 'Pursuit with immediate notification and continuous reassessment.',
      narrative: [
        'You immediately advise dispatch of the pursuit, your location, direction of travel, vehicle description, and partial plate. You request backup and note the nature of the initiating offense.',
        'MTPD ALO 4.02 allows pursuit initiation when the need for immediate apprehension outweighs the risk created — but requires continuous evaluation. That evaluation includes: the nature of the offense, road and traffic conditions, available units, and whether the suspect\'s identity is known.',
        'At this moment, you have sufficient basis to continue — the vehicle is fleeing a lawful stop. But your obligation is to keep reassessing, not just to pursue. The next decision point will test that.'
      ],
      legal: 'ALO 4.02: Upon initiation of a pursuit, the officer shall immediately notify communications of: their unit, the nature of the offense, direction and approximate speed, vehicle description, and any other information available. Supervisor notification and authorization are required.',
      next: 'd2'
    },
    'c1-neutral': {
      type: 'consequence',
      outcomeClass: 'outcome-neutral',
      outcomeLabel: 'Partially Correct',
      heading: 'Termination may be correct — but the reason matters.',
      narrative: [
        'ALO 4.02 does not create an automatic termination rule for all pursuits. There are specific termination criteria, and the officer and supervisor must evaluate against those criteria continuously.',
        'Terminating this pursuit may well be the right outcome given the summary offense, unknown identity, and residential intersections ahead. But "automatic rule" is not the policy standard — continuous evaluation is.',
        'If you terminate, you do so because the specific factors support termination, not because flight automatically ends a pursuit. Document your reasoning.'
      ],
      legal: 'ALO 4.02 lists specific termination criteria including: when the danger to officers or the public outweighs the need for immediate apprehension, when the identity of the suspect is known and arrest can be made by other means, or when a superior officer orders termination.',
      next: 'd2'
    },
    'd2': {
      type: 'decision',
      decisionNumber: 2,
      situation: 'The pursuit has continued for approximately 90 seconds. The vehicle has taken a turn onto a residential road — Keeley Road. Speeds are now 55 mph on a 25 mph residential street. A second patrol unit has caught up and is now positioned two car lengths behind you, making this a two-unit pursuit. Dispatch has run the plate — it returns to a Marcus Webb, 23, with a suspended license. No felony warrants. Your supervisor comes over the radio and asks for your recommendation to continue or terminate.\n\nA third patrol unit is requesting to join from the opposite end of Keeley Road.',
      question: 'What is your recommendation to your supervisor, and what is your decision on the third unit?',
      options: [
        {
          text: 'Recommend termination. The suspect\'s identity is now known — Marcus Webb, suspended license. The offense is a summary/misdemeanor level. Residential roads at 55 mph creates extreme risk. Allow the third unit to join the pursuit.',
          shortLabel: 'Recommend termination — but add third unit',
          quality: 'risky',
          next: 'c2-neutral'
        },
        {
          text: 'Recommend termination. Identity is known, the offense is summary/misdemeanor level, and the residential road pursuit creates unacceptable risk. Decline the third unit — ALO 4.02 limits to two patrol units maximum.',
          shortLabel: 'Recommend termination — decline third unit',
          quality: 'good',
          next: 'c2-good'
        },
        {
          text: 'Recommend continuation — the suspect has a suspended license, evading arrest adds criminal charges, and you\'re close to apprehension. Allow the third unit to join for containment.',
          shortLabel: 'Continue pursuit — add third unit for containment',
          quality: 'bad',
          next: 'c2-bad'
        }
      ]
    },
    'c2-bad': {
      type: 'consequence',
      outcomeClass: 'outcome-bad',
      outcomeLabel: 'Two Policy Violations',
      heading: 'Continuing and adding a third unit both violate ALO 4.02.',
      narrative: [
        'First violation: ALO 4.02 specifically limits pursuits to a maximum of two patrol units. A third unit joining — regardless of role — violates this hard limit. Stop stick deployment is the authorized tactical option for road interdiction under ALO 4.02, not additional pursuit units.',
        'Second violation: All the termination criteria are now satisfied. The suspect\'s identity is confirmed. The offense is a summary violation (suspended license) plus fleeing/eluding — not a violent felony. Residential roads at 55 mph at 0114 hours creates significant risk to residents and officers. The policy factors weight strongly toward termination.',
        'Continuation at this point — past the moment all termination criteria are present — is not a judgment call. It is a policy violation. The supervisor who authorizes continuation is also accountable.'
      ],
      legal: 'ALO 4.02: Maximum of two patrol units in any pursuit. Termination is required when the danger to officers or the public outweighs the need for immediate apprehension — factors include identity known, offense level, and road conditions. All three are present.',
      next: 'd3'
    },
    'c2-good': {
      type: 'consequence',
      outcomeClass: 'outcome-good',
      outcomeLabel: 'Correct Application of ALO 4.02',
      heading: 'Termination recommended. Third unit declined. Both correct.',
      narrative: [
        'Your termination recommendation is grounded in the specific criteria ALO 4.02 identifies: suspect identity is known, the offense is summary/misdemeanor level, and residential road conditions at this speed create unacceptable risk.',
        'The third unit is declined because ALO 4.02 sets a hard limit of two patrol units in any pursuit. A third unit joining — even for containment — violates this limit. Stop sticks are the authorized road interdiction tool under department policy.',
        'After termination, you document: the basis for termination, the time you terminated, the last known location and direction of travel, the suspect\'s identity (Marcus Webb), and the offense. A pursuit report is completed before end of shift. Your supervisor\'s authorization is documented.'
      ],
      legal: 'ALO 4.02: Two-unit maximum — hard limit. Termination factors: identity known, offense level, road conditions. Post-pursuit reporting: supervisor completes a Pursuit Review Form within 24 hours. Stop sticks may be deployed in front of a fleeing vehicle only with supervisor authorization.',
      next: 'd3'
    },
    'c2-neutral': {
      type: 'consequence',
      outcomeClass: 'outcome-neutral',
      outcomeLabel: 'Half Right',
      heading: 'Termination recommendation is correct. Third unit is not.',
      narrative: [
        'Your termination recommendation is correct and well-grounded in ALO 4.02 criteria. Well done on that call.',
        'However: ALO 4.02 limits pursuits to a maximum of two patrol units. Allowing a third unit to join violates this policy regardless of the operational rationale. "Containment" does not create an exception to the two-unit limit.',
        'If road containment is needed, stop sticks are the authorized tactic — deployed by a unit that is not actively in pursuit, with supervisor authorization. The third unit should be directed to position for stop stick deployment if the supervisor authorizes it, not to join the pursuit.'
      ],
      legal: 'ALO 4.02: The two-unit maximum is a hard limit, not a guideline. A third unit joining in any capacity violates the policy. Stop stick deployment requires supervisor authorization and is the designated alternative to additional pursuit units.',
      next: 'd3'
    },

    'd3': {
      type: 'decision',
      decisionNumber: 3,
      situation: 'The pursuit ends when the vehicle crashes into a guardrail. The driver exits and flees on foot into a wooded area. You are the primary unit. Dashcam captured the full pursuit. Your backup unit is 45 seconds out. The driver is a white male, approximately 6\'0", dark jacket, last seen entering the tree line at the north end of the crash site.',
      question: 'What is your immediate priority?',
      options: [
        {
          text: 'Pursue the driver on foot immediately — you have a visual description and a head start.',
          shortLabel: 'Foot pursuit immediately, alone',
          quality: 'bad',
          next: 'c3-bad'
        },
        {
          text: 'Broadcast driver description and direction of travel to dispatch, secure the crash scene and any occupants, establish a perimeter, and request K9 and air support. Wait for backup before entering the wooded area.',
          shortLabel: 'Broadcast, secure scene, establish perimeter',
          quality: 'good',
          next: 'c3-good'
        },
        {
          text: 'Pursue on foot for two blocks to maintain visual, then return to the scene if you lose him.',
          shortLabel: 'Short foot pursuit, pull back if contact is lost',
          quality: 'risky',
          next: 'c3-neutral'
        }
      ]
    },
    'c3-bad': {
      type: 'consequence',
      outcomeClass: 'outcome-bad',
      outcomeLabel: 'Tactical and Policy Violation',
      heading: 'Solo foot pursuit into an unknown wooded environment is a documented officer safety failure.',
      narrative: [
        'A solo foot pursuit into a wooded area — with no backup on scene, unknown terrain, and a fleeing suspect whose threat level you cannot assess — is exactly the scenario pursuit policy is designed to prevent. The suspect may be armed. The terrain eliminates your tactical advantages. Your radio communication will degrade.',
        'The goal is apprehension, not a foot race. Broadcast the description, lock down the perimeter, and bring K9 and air support. The suspect\'s ability to flee into a wooded area does not create an emergency that justifies abandoning officer safety fundamentals.',
        'The dashcam has the full pursuit recorded. The crash vehicle is evidence. You will get this suspect.'
      ],
      legal: 'MTPD ALO 4.02 and foot pursuit policy require officers to weigh known risks against public safety benefit before initiating pursuit. Solo foot pursuit into unknown terrain without backup on scene does not meet that standard. Broadcast, contain, and coordinate.',
      next: 'debrief'
    },
    'c3-good': {
      type: 'consequence',
      outcomeClass: 'outcome-good',
      outcomeLabel: 'Tactically Sound',
      heading: 'Broadcast, contain, and coordinate — this is the professional pursuit conclusion.',
      narrative: [
        'Your broadcast gives every unit in the area a description and direction of travel immediately. Perimeter containment shrinks the suspect\'s exit options. K9 and air support are designed for exactly this scenario.',
        'Securing the crash scene prevents evidence loss and addresses any other vehicle occupants. Your dashcam documentation is intact. The investigation continues from a position of strength.',
        'Officers who resist the impulse to solo pursue and instead build a coordinated response achieve apprehension more often — and come home every shift.'
      ],
      legal: 'ALO 4.02 requires that pursuit decisions account for available resources and officer safety. Coordinated perimeter establishment with K9 support is the tactically and legally correct response to a fleeing subject who has entered terrain that compromises solo pursuit safety.',
      next: 'debrief'
    },
    'c3-neutral': {
      type: 'consequence',
      outcomeClass: 'outcome-neutral',
      outcomeLabel: 'Avoidable Risk',
      heading: 'A limited foot pursuit still carries the core risks — and rarely produces apprehension.',
      narrative: [
        'Two blocks into an unknown wooded area is enough distance to lose radio contact, lose visual orientation, and find yourself in a compromised tactical position. The "I\'ll just go a little way" approach is how officers end up isolated without backup in unfamiliar terrain.',
        'The suspect has the advantage in territory they chose. You do not. Broadcast and perimeter work from the moment the vehicle stops — that is when the coordinated response needs to begin, not after a short foot pursuit fails.',
        'Your backup is 45 seconds out. Wait those 45 seconds. Build the response right.'
      ],
      legal: 'Partial foot pursuits that are later abandoned still consume time and resources without the tactical benefit of a coordinated perimeter. Policy requires that officers assess threat level and available resources before initiating foot pursuit — the calculus does not change based on the intended distance.',
      next: 'debrief'
    },
    'debrief': { type: 'debrief' }
  }
};

/* ══════════════════════════════════════════
   SCENARIO DATA — Leadership & Supervision
   Arbiter LE Demo / PA Law
══════════════════════════════════════════ */
const SCENARIO_LEADERSHIP = {
  title: 'Leadership & Supervision',
  location: 'Sumneytown Hotel Parking Lot, Main Street',
  totalDecisions: 3,
  nodes: {
    start: {
      type: 'scene',
      time: '1423',
      weather: 'Clear',
      unit: 'Unit 7903',
      narrative: [
        'You are on patrol with Officer Cartagena, who has 18 months on the job. You are the senior officer. A resident flags you down on Main Street and reports that a group of teenagers has been blocking the Sumneytown Hotel parking lot entrance for over two hours. The owner called twice but received no response.',
        'As you pull into the lot, you observe six teenagers — loud, some with open beverages, but no visible weapons and no evidence of a crime in progress. No trespassing signage is visible. The hotel manager steps outside and gestures at the group.',
        'Cartagena says without hesitation: "Let\'s just run them all — if anything pops we can lock someone up and that clears the lot fast."'
      ],
      next: 'd1'
    },
    d1: {
      type: 'decision',
      decisionNumber: 1,
      situation: 'Cartagena is already stepping toward the group. The hotel manager is watching. The teenagers have noticed you.',
      question: 'How do you handle the initial approach?',
      options: [
        {
          text: 'Follow Cartagena\'s lead — run all six, see what comes back, and clear the scene efficiently.',
          shortLabel: 'Run everyone without articulated basis',
          quality: 'bad',
          next: 'c1-bad'
        },
        {
          text: 'Take point, make contact with the group and the manager, assess for actual violations before any enforcement action.',
          shortLabel: 'Measured contact — assess before acting',
          quality: 'good',
          next: 'c1-good'
        }
      ]
    },
    'c1-bad': {
      type: 'consequence',
      outcomeClass: 'outcome-bad',
      outcomeLabel: 'Fourth Amendment Exposure',
      heading: 'Running everyone without articulable suspicion creates legal liability — and sends Cartagena the wrong lesson.',
      narrative: [
        'Terry v. Ohio requires individualized reasonable articulable suspicion before a stop. Presence in a parking lot, even in a group, does not establish that threshold absent specific conduct. Running all six without a lawful basis exposes the department to civil liability and suppresses any evidence obtained.',
        'Two of the six have no record. The other four return nothing actionable. The lot is cleared — but the department absorbs the liability, and Cartagena walks away believing this is the correct approach.',
        'As the senior officer, your actions are the standard Cartagena will apply on calls where you\'re not there to supervise. What you model today gets repeated tomorrow.'
      ],
      legal: 'Terry v. Ohio (1968): An investigative stop requires individualized reasonable articulable suspicion of criminal activity. Group presence does not supply the basis for individual stops. Running subjects without that foundation creates Fourth Amendment violations and civil exposure.',
      next: 'd2'
    },
    'c1-good': {
      type: 'consequence',
      outcomeClass: 'outcome-good',
      outcomeLabel: 'Measured and Legally Sound',
      heading: 'You assessed the situation before acting. That\'s the standard.',
      narrative: [
        'You speak with the hotel manager — who has not filed a formal trespass notice and has no posted signage meeting Pennsylvania\'s trespass statute requirements. Two of the teenagers leave voluntarily during the conversation. You document the manager\'s request and advise them on the formal trespass process for future incidents.',
        'The remaining four disperse without enforcement action. No Fourth Amendment exposure. Clean documentation.',
        'More importantly: Cartagena observed you slow down a fast situation and make a reasoned decision. That\'s a lesson that doesn\'t require a classroom.'
      ],
      legal: '18 Pa. C.S. § 3503 (Criminal Trespass): For a lawful trespass order, the property must be posted, fenced, or the subject must have received direct communication that entry is not permitted. Without posted signage or a prior warning, presence alone does not support trespass. Advise the manager on proper notice procedures.',
      next: 'd2'
    },
    d2: {
      type: 'decision',
      decisionNumber: 2,
      situation: 'Back in the car. Cartagena seems frustrated — quiet, stiff. As you clear the call, Cartagena says: "That took 20 minutes. We could\'ve been done in five."',
      question: 'How do you respond?',
      options: [
        {
          text: 'Let it go — minor friction, not worth the conversation. You\'ll work it out.',
          shortLabel: 'Ignore the friction',
          quality: 'bad',
          next: 'c2-bad'
        },
        {
          text: 'Address it directly, one-on-one, explain your reasoning — no lecture, no audience.',
          shortLabel: 'Direct one-on-one correction',
          quality: 'good',
          next: 'c2-good'
        }
      ]
    },
    'c2-bad': {
      type: 'consequence',
      outcomeClass: 'outcome-bad',
      outcomeLabel: 'Missed Teaching Moment',
      heading: 'You kept the peace but lost the opportunity.',
      narrative: [
        'Cartagena\'s frustration was an opening — a chance to explain the legal reasoning behind the decision and build a better officer. You let it close.',
        'Without correction, Cartagena\'s default remains: move fast, run everyone, clear the call. On a solo patrol next week, that default leads to a Fourth Amendment violation with no senior officer to slow it down.',
        'Supervisory leadership is not only about making the right call in the field. It\'s about ensuring the officers around you understand why the right call was right.'
      ],
      legal: 'PERF Leadership Research: The top predictor of supervisory readiness is demonstrated judgment in ambiguous situations. Teaching moments — especially brief, direct, one-on-one corrections — are among the highest-value supervisory actions available at the patrol level.',
      next: 'd3'
    },
    'c2-good': {
      type: 'consequence',
      outcomeClass: 'outcome-good',
      outcomeLabel: 'Effective Patrol-Level Supervision',
      heading: 'You addressed it cleanly. No lecture, no audience, one clear message.',
      narrative: [
        '"Here\'s why I took it that way — no posted signage, no prior warning, no articulable suspicion for individual stops. Running them was a Fourth Amendment problem waiting to happen. Twenty minutes of clean contact beats a civil complaint." That\'s all it takes.',
        'No embarrassment. No public correction. Cartagena heard the reasoning and has something to work with.',
        'This is what patrol-level supervision looks like — brief, direct, grounded in law and policy, and delivered without an audience. It doesn\'t require a sergeant\'s badge.'
      ],
      legal: 'MTPD ALO 1.01 (Chain of Command): Senior officers are expected to model and reinforce professional standards in the field. Correction of junior officer conduct should occur through proper channels and, where possible, privately — to preserve working relationships and reinforce the lesson without public friction.',
      next: 'd3'
    },

    'd3': {
      type: 'decision',
      decisionNumber: 3,
      situation: 'You have completed your report on the incident. As you are leaving the supervisor\'s office, a senior officer — someone with 18 years on the job — pulls you aside and says: "I heard what you wrote up. Look, the rookie doesn\'t need this on his record. You\'re going to make his career harder. We handle things in-house." Two other officers are within earshot.',
      question: 'How do you respond?',
      options: [
        {
          text: 'Tell him you understand, and you\'ll see if there\'s anything you can adjust in the report before it is finalized.',
          shortLabel: 'Agree to reconsider the report',
          quality: 'bad',
          next: 'c3-bad'
        },
        {
          text: 'Acknowledge his concern directly, be clear that the report reflects what occurred and will not change, and report the conversation to your supervisor.',
          shortLabel: 'Hold the line, report the pressure',
          quality: 'good',
          next: 'c3-good'
        },
        {
          text: 'Tell him this is not the place for this conversation and walk away.',
          shortLabel: 'Shut it down without reporting it',
          quality: 'risky',
          next: 'c3-neutral'
        }
      ]
    },
    'c3-bad': {
      type: 'consequence',
      outcomeClass: 'outcome-bad',
      outcomeLabel: 'Integrity Violation',
      heading: 'Altering a report under social pressure is misconduct — regardless of seniority.',
      narrative: [
        'A police report is a sworn document. Adjusting it because a colleague applied pressure is not "handling things in-house" — it is falsifying an official record. Seniority is not authority over your report. Years on the job do not create the right to influence documentation.',
        'If this surfaces later — and these things surface — you are not just facing a policy violation. You are facing potential criminal charges, termination, and the destruction of a career built on discipline and integrity.',
        'The sergeant\'s bars you are working toward require that you hold this line now, when it costs something. That is what leadership actually is.'
      ],
      legal: '18 Pa. C.S. § 4904 — Unsworn falsification to authorities. Altering a police report at the request of another officer compounds the original issue with a second, more serious one. Report the pressure to your chain of command immediately.',
      next: 'debrief'
    },
    'c3-good': {
      type: 'consequence',
      outcomeClass: 'outcome-good',
      outcomeLabel: 'Leadership Under Pressure',
      heading: 'Holding the line and reporting the pressure is what integrity looks like in practice.',
      narrative: [
        'You acknowledged his concern without validating it, stated clearly where you stand, and removed any ambiguity about whether the report will change. That is the response of someone who understands that leadership is not about popularity — it is about consistency.',
        'Reporting the conversation to your supervisor is not "ratting." It is protecting yourself, protecting the department, and ensuring that the pressure you experienced is documented. If this officer is doing this with you, he is doing it with others.',
        'This moment — quiet, no cameras, in a hallway — is exactly where character is built or lost. You chose correctly.'
      ],
      legal: 'Supervisors are obligated to document attempts to influence official reports. Reporting the conversation creates a record that protects you if the situation escalates. Failure to report may later appear as tacit acquiescence to the pressure.',
      next: 'debrief'
    },
    'c3-neutral': {
      type: 'consequence',
      outcomeClass: 'outcome-neutral',
      outcomeLabel: 'Incomplete Response',
      heading: 'Walking away without reporting leaves the pressure unaddressed.',
      narrative: [
        'Refusing to engage in the moment was the right instinct. But walking away without reporting what just happened means the conversation disappears — no record, no accountability, no protection for you if it comes up again.',
        'The senior officer just asked you to alter a sworn document in front of witnesses. That is not a minor hallway comment. If the report is later challenged, or if this officer makes a formal complaint against you, the absence of your timely report of this conversation is a problem.',
        'Shut it down and document it. Both steps.'
      ],
      legal: 'Officers who receive pressure to alter documentation should report it to their chain of command promptly. Contemporaneous reporting creates a protected record. Silence — even without compliance — can later be interpreted as ambiguous.',
      next: 'debrief'
    },
    debrief: { type: 'debrief' }
  }
};

/* ══════════════════════════════════════════
   SCENARIO DATA — Traffic Stops & Vehicle Contacts
   Arbiter LE Demo / PA Law
══════════════════════════════════════════ */
const SCENARIO_TRAFFIC_STOPS = {
  title: 'Traffic Stops & Vehicle Contacts',
  location: 'Sumneytown Pike near Red Trail Parking Area',
  totalDecisions: 3,
  nodes: {
    start: {
      type: 'scene',
      time: '2147',
      weather: 'Clear / Dark',
      unit: 'Unit 7903',
      narrative: [
        'You are on patrol on Sumneytown Pike near the Red Trail parking area at Green Lane Park. You observe a 2019 Honda Civic with a non-functioning driver-side brake light. You initiate a traffic stop.',
        'The driver, a male in his late 20s, pulls over promptly. As you approach, you detect a moderate odor of marijuana emanating from the open driver window. The driver\'s hands are shaking and he is avoiding eye contact. A male passenger in the front seat stares straight ahead and does not move.',
        'The driver provides a valid Pennsylvania driver\'s license. The registration comes back clean — no wants or warrants on the vehicle or the driver.'
      ],
      next: 'd1'
    },
    d1: {
      type: 'decision',
      decisionNumber: 1,
      situation: 'You have completed the purpose of the stop — the equipment violation is documented and the license and registration are in hand. The odor of marijuana remains present. The driver has not consented to a search. You have not yet returned the documents.',
      question: 'What is your lawful course of action regarding the marijuana odor?',
      options: [
        {
          text: 'Return the documents and conclude the stop — the odor alone is insufficient probable cause in Pennsylvania given recent case law, and extending the stop without more risks a Rodriguez violation.',
          shortLabel: 'Conclude stop — odor insufficient for extension',
          quality: 'bad',
          next: 'c1-bad'
        },
        {
          text: 'The odor of marijuana from the vehicle, combined with the driver\'s behavior, provides probable cause to search the vehicle under Pennsylvania law — conduct the search without extending the stop\'s purpose.',
          shortLabel: 'Odor + conduct = probable cause — search without unnecessary extension',
          quality: 'good',
          next: 'c1-good'
        }
      ]
    },
    'c1-bad': {
      type: 'consequence',
      outcomeClass: 'outcome-bad',
      outcomeLabel: 'Incorrect Application of PA Search Law',
      heading: 'In Pennsylvania, odor of marijuana can establish probable cause to search a vehicle.',
      narrative: [
        'Rodriguez v. United States (2015) prohibits extending a stop beyond its original purpose without reasonable suspicion of additional criminal activity. That\'s the federal floor. But in Pennsylvania, the odor of marijuana emanating from a vehicle has consistently been held by courts to establish probable cause for a warrantless vehicle search under the automobile exception.',
        'Commonwealth v. Gary (2014) and subsequent Pennsylvania cases confirm that probable cause — including odor — supports a warrantless search. The stop is not being "extended" for an unrelated purpose; the search is proceeding on independent probable cause.',
        'Concluding the stop here without acting on that probable cause is both legally incorrect and a missed enforcement opportunity.'
      ],
      legal: 'Commonwealth v. Gary (2014): Pennsylvania adopted the federal automobile exception — probable cause alone supports a warrantless vehicle search without requiring exigent circumstances. Odor of marijuana emanating from a vehicle has been recognized by Pennsylvania courts as establishing probable cause. Rodriguez limits extensions without reasonable suspicion, but does not preclude action on independent probable cause developed during the stop.',
      next: 'd2'
    },
    'c1-good': {
      type: 'consequence',
      outcomeClass: 'outcome-good',
      outcomeLabel: 'Correct — Probable Cause Established',
      heading: 'Odor of marijuana establishes probable cause under Pennsylvania law. The search is lawful.',
      narrative: [
        'Commonwealth v. Gary (2014) confirmed Pennsylvania\'s adoption of the federal automobile exception — probable cause alone, without exigent circumstances, supports a warrantless vehicle search. The odor of marijuana from the vehicle provides that probable cause.',
        'You are not "extending" the stop for an unrelated purpose — you are acting on independent probable cause developed during a lawful stop. Rodriguez does not apply to restrict action based on probable cause that arises during the stop\'s execution.',
        'Order both occupants out of the vehicle (Mimms and Wilson authorize this), and conduct the search. Document the specific basis for probable cause: the odor, the driver\'s behavior, and the precise moment it was detected.'
      ],
      legal: 'Pennsylvania v. Mimms (1977): Officers may order the driver out of a stopped vehicle as a matter of course. Maryland v. Wilson (1997): Extends Mimms to passengers. Commonwealth v. Gary (2014): Probable cause supports a warrantless vehicle search in Pennsylvania. Document the basis for probable cause specifically — "odor of marijuana" requires a specific description of where it was detected, its strength, and the circumstances.',
      next: 'd2'
    },
    d2: {
      type: 'decision',
      decisionNumber: 2,
      situation: 'Both occupants are out of the vehicle. The driver, now standing at the rear, says: "You can\'t search my car without a warrant. I know my rights." The passenger is cooperative and quiet. You are about to begin the search.',
      question: 'How do you respond to the driver\'s objection?',
      options: [
        {
          text: 'Explain that his consent is not required because you have probable cause based on the marijuana odor — proceed with the search, document his objection in the report.',
          shortLabel: 'Explain legal basis, proceed, document objection',
          quality: 'good',
          next: 'c2-good'
        },
        {
          text: 'Stop the search — the driver has clearly invoked his rights and proceeding over his objection without a warrant risks suppression.',
          shortLabel: 'Stop search on driver\'s objection',
          quality: 'bad',
          next: 'c2-bad'
        }
      ]
    },
    'c2-bad': {
      type: 'consequence',
      outcomeClass: 'outcome-bad',
      outcomeLabel: 'Incorrect — Objection Does Not Override Probable Cause',
      heading: 'A subject\'s objection does not nullify probable cause. The search was lawful.',
      narrative: [
        'The automobile exception does not require consent. Probable cause — independently established through the odor and behavior — authorizes the search regardless of the driver\'s objection. His statement "I know my rights" is not an invocation of a right that applies here.',
        'The Fourth Amendment prohibits unreasonable searches. A search based on probable cause is not unreasonable. Stopping a lawful search because a subject objects is a tactical and legal error.',
        'Stopping here leaves contraband in the vehicle, fails to act on lawfully established probable cause, and signals to the subject that objections override established legal standards.'
      ],
      legal: 'The automobile exception (Carroll v. United States, 1925; Commonwealth v. Gary, 2014) is not consent-based. A subject\'s objection cannot vitiate probable cause. Document the objection in your report — it is relevant context — but it does not alter the legal basis for the search. If the subject physically interferes with the search, that is a separate criminal matter.',
      next: 'd3'
    },
    'c2-good': {
      type: 'consequence',
      outcomeClass: 'outcome-good',
      outcomeLabel: 'Correct — Probable Cause Does Not Require Consent',
      heading: 'Brief, calm, accurate explanation. Proceed. Document.',
      narrative: [
        '"I\'m not asking for consent — I have probable cause based on the odor of marijuana from your vehicle. You can observe from here." That\'s the entire conversation. No argument, no escalation.',
        'Document the driver\'s objection verbatim in your report. It is relevant context and demonstrates your awareness that the subject disputed the search — and that your legal basis was independent of his consent.',
        'The search proceeds. If contraband is found, the chain of custody and probable cause documentation are the foundation of the prosecution. Your report language matters as much as the physical evidence.'
      ],
      legal: 'Consent is irrelevant when probable cause exists under the automobile exception. Document: (1) the exact moment and location where the odor was detected, (2) the driver\'s behavior, (3) the driver\'s verbal objection and your response, (4) items found and their exact location in the vehicle. Vague probable cause documentation — "detected an odor of marijuana" without detail — creates suppression vulnerability at the preliminary hearing.',
      next: 'd3'
    },

    'd3': {
      type: 'decision',
      decisionNumber: 3,
      situation: 'You have completed the stop and are returning to your patrol vehicle to run the license. As you walk back, the front-seat passenger — who was not the subject of your investigation — exits the vehicle without being asked and begins recording you on their cell phone. They are standing on the public sidewalk. They have not interfered with the stop.',
      question: 'How do you respond to the passenger filming?',
      options: [
        {
          text: 'Tell the passenger to put the phone away and return to the vehicle — recording during an active traffic stop is a safety concern.',
          shortLabel: 'Order passenger to stop filming and return to vehicle',
          quality: 'bad',
          next: 'c3-bad'
        },
        {
          text: 'Continue your professional conduct. Filming by bystanders on public property is a First Amendment-protected activity. Do not address the recording — complete the stop as you would otherwise.',
          shortLabel: 'Continue normal stop — filming is protected',
          quality: 'good',
          next: 'c3-good'
        },
        {
          text: 'Order the passenger back into the vehicle for officer safety — do not address the filming directly.',
          shortLabel: 'Order return to vehicle on safety grounds only',
          quality: 'risky',
          next: 'c3-neutral'
        }
      ]
    },
    'c3-bad': {
      type: 'consequence',
      outcomeClass: 'outcome-bad',
      outcomeLabel: 'Constitutional Violation',
      heading: 'Ordering someone to stop filming police on public property is a First Amendment violation.',
      narrative: [
        'The right to record police performing their duties in a public space is well-established under the First Amendment. It is not contingent on your comfort level, the activity being recorded, or whether the person is a party to your stop.',
        'Ordering the passenger to stop filming creates a Fourth Amendment seizure issue (the passenger is being ordered to do something) and a First Amendment violation. If you then stop and frisk or detain them further based on the filming alone, you have compounded the violation.',
        'The correct response is to perform your duties professionally and allow the recording to happen. Your conduct is the answer to whatever concerns the filming might raise.'
      ],
      legal: 'First Amendment right to record police in public has been affirmed by multiple circuit courts. In the Third Circuit (which covers Pennsylvania), officers may not lawfully seize recording devices or order people to stop recording without consent or independent legal justification. Doing so creates civil liability.',
      next: 'debrief'
    },
    'c3-good': {
      type: 'consequence',
      outcomeClass: 'outcome-good',
      outcomeLabel: 'Correct Constitutional Response',
      heading: 'Professionalism on camera is just professionalism.',
      narrative: [
        'Recording does not change how you conduct the stop — and that is exactly the point. The conduct you would want captured on video is the conduct you should always be exhibiting. The presence of a camera should never alter your approach.',
        'By continuing without addressing the filming, you avoid a constitutional violation, demonstrate confidence in your own conduct, and complete the stop without unnecessary escalation.',
        'Officers who understand that transparency serves them professionally, legally, and in terms of public trust perform better in their careers and face fewer complaints.'
      ],
      legal: 'Glik v. Cunniffe (1st Cir.), Sharp v. Baltimore (4th Cir.), and Kelly v. Borough of Carlisle (3rd Cir.) establish the right to record police in public. Pennsylvania law does not prohibit recording of law enforcement performing official duties in public spaces.',
      next: 'debrief'
    },
    'c3-neutral': {
      type: 'consequence',
      outcomeClass: 'outcome-neutral',
      outcomeLabel: 'Legally Murky',
      heading: 'Officer safety is a valid basis to return occupants to a vehicle — but intent matters.',
      narrative: [
        'Ordering a passenger to return to a vehicle during a traffic stop on legitimate officer safety grounds is generally lawful under Pennsylvania v. Mimms and Maryland v. Wilson. But using "officer safety" as a pretext to stop the filming creates exactly the problem you were trying to avoid.',
        'If the real reason for the order is the filming, and the officer safety rationale is post-hoc, that will be apparent — on the video the passenger is recording, in the body cam footage, and in any subsequent review.',
        'If you have a genuine officer safety concern about the passenger being outside the vehicle, address it directly and document it. If the concern is the camera, let it go.'
      ],
      legal: 'Maryland v. Wilson (1997) permits officers to order passengers out of vehicles during a stop for officer safety. The order must be grounded in legitimate safety concerns — not in suppressing First Amendment-protected recording activity. Courts look to the actual motivation.',
      next: 'debrief'
    },
    debrief: { type: 'debrief' }
  }
};

/* ══════════════════════════════════════════
   SCENARIO DATA — Emotional Intelligence
   Arbiter LE Demo / PA Law
══════════════════════════════════════════ */
const SCENARIO_EI = {
  title: 'Emotional Intelligence',
  location: 'Residence — Follow-Up DV Contact',
  totalDecisions: 3,
  nodes: {
    start: {
      type: 'scene',
      time: '1035',
      weather: 'Overcast',
      unit: 'Unit 7903',
      narrative: [
        'You are conducting a follow-up welfare check on a DV victim from an arrest made three nights ago. The subject, a woman in her mid-30s, was listed as the victim. The arrested subject was her husband — still in custody pending arraignment.',
        'She answers the door, crosses her arms, and says flatly: "I already talked to your people. I don\'t have anything else to say." Her two children — approximately 7 and 10 — are visible behind her in the living room.',
        'She looks exhausted. There is a bruise on her forearm that was not documented in the original report.'
      ],
      next: 'd1'
    },
    d1: {
      type: 'decision',
      decisionNumber: 1,
      situation: 'She is clearly hostile to your presence. The undocumented bruise concerns you. You have no legal obligation to force entry — this is a voluntary follow-up contact.',
      question: 'How do you open this conversation?',
      options: [
        {
          text: 'Be direct: identify the bruise and ask her to explain it. You need the documentation and she needs to understand this is a serious matter.',
          shortLabel: 'Lead with the bruise — direct and documentation-focused',
          quality: 'bad',
          next: 'c1-bad'
        },
        {
          text: 'Acknowledge her position without challenging it. Let her know you\'re there because you wanted to check in — not to take anything from her. Give her space to decide how the conversation goes.',
          shortLabel: 'Acknowledge her position — create space',
          quality: 'good',
          next: 'c1-good'
        }
      ]
    },
    'c1-bad': {
      type: 'consequence',
      outcomeClass: 'outcome-bad',
      outcomeLabel: 'Approach Shut the Door',
      heading: 'Leading with the bruise made her defensive. The conversation ended before it started.',
      narrative: [
        'She looked at the bruise, looked at you, and said: "I bumped into a door. We\'re fine. Are we done?" She stepped back and closed the door.',
        'You had a genuine opportunity to build enough trust for her to give you information that could protect her and her children. The approach — clinical, accusatory in tone, documentation-first — treated her like a subject rather than a person in crisis.',
        'Emotional intelligence in this context does not mean avoiding hard facts. It means understanding that a defensive, exhausted DV victim will not respond to pressure the way a cooperative witness will. The goal was information. The approach prevented it.'
      ],
      legal: 'MTPD ALO 4.13 — Follow-up contacts with DV victims should prioritize safety assessment and victim cooperation. Trauma-informed approach: victims of domestic violence often present as hostile or uncooperative due to fear, shame, and past negative law enforcement experiences — not because they have nothing to say.',
      next: 'd2'
    },
    'c1-good': {
      type: 'consequence',
      outcomeClass: 'outcome-good',
      outcomeLabel: 'She Stayed at the Door',
      heading: 'You didn\'t push. She didn\'t close it.',
      narrative: [
        '"I\'m not here to make anything harder. I just wanted to make sure you and the kids are okay. You don\'t have to talk to me." You said it without breaking eye contact, without a notepad out, without stepping forward.',
        'She paused. The hostility didn\'t disappear — but she didn\'t close the door. The children are still visible. You notice the younger one watching you.',
        'You have a narrow window. What you do next determines whether she gives you anything useful.'
      ],
      legal: 'Trauma-informed victim contact: Victims who experience the initial contact as controlling or threatening are significantly less likely to cooperate with prosecution. IACP research shows that officer demeanor in follow-up contacts is the strongest predictor of victim engagement with the criminal justice process.',
      next: 'd2'
    },
    d2: {
      type: 'decision',
      decisionNumber: 2,
      situation: 'She is still at the door. After a moment she says quietly: "He\'s going to be out soon. I know how this works." She glances at the kids.',
      question: 'How do you respond?',
      options: [
        {
          text: 'Reassure her: "He\'s not getting out anytime soon. You have nothing to worry about." Keep the tone positive — she needs confidence right now.',
          shortLabel: 'Reassure — minimize the threat',
          quality: 'bad',
          next: 'c2-bad'
        },
        {
          text: 'Be honest about what you know, and give her something actionable: her options, the victim advocate contact, and what she can do today if she wants to.',
          shortLabel: 'Honest, actionable — her options, victim advocate',
          quality: 'good',
          next: 'c2-good'
        }
      ]
    },
    'c2-bad': {
      type: 'consequence',
      outcomeClass: 'outcome-bad',
      outcomeLabel: 'False Reassurance — Lost Her Trust',
      heading: 'She knows he could be released at arraignment. You told her he couldn\'t. She stopped listening.',
      narrative: [
        'She has been through this before. She knows arraignment timelines, bail processes, and what "not getting out anytime soon" actually means in practice. When you overstated it, she recognized it — and the trust you\'d built in the last two minutes collapsed.',
        '"Okay. Thanks." She closed the door.',
        'False reassurance is one of the most damaging things an officer can offer a DV victim. It is not kindness — it is a failure to respect her intelligence and her reality. She will be less likely to call for help the next time because she knows she cannot rely on accurate information from law enforcement.'
      ],
      legal: 'MTPD ALO 4.13 — Officers shall provide DV victims with accurate information about the criminal justice process, including arraignment, bail, and protective order procedures. Victim notification requirements under Pennsylvania law (23 Pa. C.S. § 6106) include providing information about available legal remedies and victim services.',
      next: 'd3'
    },
    'c2-good': {
      type: 'consequence',
      outcomeClass: 'outcome-good',
      outcomeLabel: 'Honest and Actionable',
      heading: 'You gave her the truth and something to do with it.',
      narrative: [
        '"I\'m not going to tell you he can\'t get out — arraignment is in the next 24 hours and I don\'t control that. What I can tell you is that there\'s a victim advocate who can walk you through a PFA today if you want one. That\'s real protection. And my number is on this card if anything changes tonight."',
        'She took the card. She told you about the bruise on her arm — three days old, from the same night. She let you photograph it.',
        'You left with documented evidence, a victim who engaged with the process, and a PFA referral in motion. That outcome came directly from how you managed the first 60 seconds of the conversation.'
      ],
      legal: 'MTPD ALO 4.13 — Officers shall provide victims with information about the victim advocate program and PFA application process at every DV contact. 23 Pa. C.S. § 6102 et seq. (Protection From Abuse Act): A PFA may be obtained through the court of common pleas. Victim advocates can assist with emergency filings. Document all new evidence — including injuries identified during follow-up contacts — in a supplemental report.',
      next: 'd3'
    },

    'd3': {
      type: 'decision',
      decisionNumber: 3,
      situation: 'You are back at the station after a difficult call involving a child — a welfare check that turned into a CYFD referral. You handled it professionally. As you sit at your desk writing the report, you notice your partner sitting alone in the break room, staring at the table. They have not said anything since you cleared the scene. They declined lunch. This partner has seemed "off" for the past three weeks — quieter than usual, short-tempered on a couple of calls.',
      question: 'What do you do?',
      options: [
        {
          text: 'Give them space — if they wanted to talk, they would come to you.',
          shortLabel: 'Give them space, don\'t push',
          quality: 'bad',
          next: 'c3-bad'
        },
        {
          text: 'Go to them, sit down, and check in directly — name what you have noticed over the past few weeks and today, and let them talk. Mention peer support or EAP as an option without pressure.',
          shortLabel: 'Check in directly, name what you see, offer support',
          quality: 'good',
          next: 'c3-good'
        },
        {
          text: 'Mention it to the sergeant so they can follow up — it\'s above your pay grade.',
          shortLabel: 'Flag it to the sergeant and step back',
          quality: 'risky',
          next: 'c3-neutral'
        }
      ]
    },
    'c3-bad': {
      type: 'consequence',
      outcomeClass: 'outcome-bad',
      outcomeLabel: 'Missed Intervention',
      heading: 'Officers in distress rarely ask for help first — that is the nature of the profession.',
      narrative: [
        'Law enforcement culture, by design, selects for people who push through difficulty without complaint. That trait — which makes officers effective in the field — is also what makes them less likely to reach out when they are struggling.',
        'Waiting for your partner to come to you may mean waiting until a crisis. The three-week pattern you have observed, combined with today\'s call, is a signal. Ignoring signals is not giving someone space — it is leaving them alone in a hard place.',
        'You do not have to have the right words. You just have to show up and ask.'
      ],
      legal: 'Officer wellness policy encourages peer-level intervention and support. Peer support contacts are confidential. Waiting for formal distress before acting is inconsistent with the peer support model — early intervention is the goal.',
      next: 'debrief'
    },
    'c3-good': {
      type: 'consequence',
      outcomeClass: 'outcome-good',
      outcomeLabel: 'Peer Leadership in Practice',
      heading: 'Naming what you see, without pressure, is what peer support actually looks like.',
      narrative: [
        'You do not need a title to do this. You do not need to diagnose or fix anything. Sitting down and saying "Hey, I\'ve noticed you\'ve seemed off for a few weeks — and today was a rough call. You good?" costs nothing and can mean everything.',
        'Mentioning peer support or EAP without pressure keeps the door open without creating shame. Officers are more likely to use resources when a trusted colleague mentioned them — not when they find a brochure on a bulletin board.',
        'This is leadership. It does not happen in briefings. It happens in break rooms.'
      ],
      legal: 'Pennsylvania Act 192 provide confidentiality protections for peer support contacts. EAP services are confidential and do not affect employment status in most circumstances. Officers should be aware of these protections so they can accurately convey them to peers seeking help.',
      next: 'debrief'
    },
    'c3-neutral': {
      type: 'consequence',
      outcomeClass: 'outcome-neutral',
      outcomeLabel: 'Partial — Loses the Human Element',
      heading: 'Flagging to the sergeant is not wrong — but it is not enough.',
      narrative: [
        'A supervisor check-in may be appropriate, especially if the pattern is affecting performance. But kicking it upward as your first and only move skips the most important step: the peer connection.',
        'Your partner trusts you. They have worked beside you. A sergeant check-in has a different weight — it can feel evaluative, even when it is not meant to be. You have the ability to make the first contact in a way the sergeant cannot.',
        'Do both: check in yourself first, and mention your concern to the sergeant as a follow-up — not instead of — your own engagement.'
      ],
      legal: 'Supervisors have a duty to address performance concerns that may indicate wellness issues. Peer contacts, however, remain confidential under MTPD policy and are not a substitute for peer support — they are a complementary mechanism. The peer connection comes first.',
      next: 'debrief'
    },
    debrief: { type: 'debrief' }
  }
};

/* ── Scenario: Evidence & Chain of Custody ─ */
const SCENARIO_EVIDENCE = {
  title: 'Evidence & Chain of Custody',
  location: 'Residential Burglary — 412 Maple Creek Drive, Harleysville',
  totalDecisions: 3,
  nodes: {
    start: {
      type: 'scene',
      time: '1422',
      weather: 'Clear, 74°F',
      unit: 'Unit 7903',
      narrative: [
        'You are the first officer on scene at a reported residential burglary. Homeowners returned from a weekend away to find a rear window smashed and the house ransacked. They are standing in the driveway.',
        'You clear the residence and confirm it is unoccupied. Inside the kitchen you find the point of entry — a broken pane in the back door. On the floor near the sink you observe a flathead screwdriver with what appears to be paint transfer, and a cell phone that does not belong to the homeowners.',
        'The homeowners have not entered the kitchen. You have not touched anything. Detectives have been notified and are en route — ETA 25 minutes.'
      ],
      next: 'd1'
    },
    d1: {
      type: 'decision',
      decisionNumber: 1,
      situation: 'The screwdriver and cell phone are clearly visible on the kitchen floor. The homeowners are asking if they can come inside to check what was taken. Detectives are 25 minutes out.',
      question: 'How do you handle the scene and the homeowners?',
      options: [
        {
          text: 'Let the homeowners do a quick walkthrough to identify what\'s missing — you need that information for the report and they are eager to help. You\'ll document the evidence after they finish.',
          shortLabel: 'Allow homeowner walkthrough to identify missing items',
          quality: 'bad',
          next: 'c1-bad'
        },
        {
          text: 'Keep the homeowners out of the kitchen and away from the evidence. Explain that detectives need to see it undisturbed. Get their information and a preliminary list of known missing items from the driveway.',
          shortLabel: 'Preserve scene — get info from homeowners outside',
          quality: 'good',
          next: 'c1-good'
        }
      ]
    },
    'c1-bad': {
      type: 'consequence',
      outcomeClass: 'outcome-bad',
      outcomeLabel: 'Scene Compromised',
      heading: 'The homeowners moved through the kitchen. The cell phone was accidentally kicked. The screwdriver has new fingerprints on it.',
      narrative: [
        'The homeowners meant well. They moved quickly through the kitchen, bumped the cell phone under the refrigerator, and one of them picked up the screwdriver to look at it before you could stop them.',
        'The scene is compromised. The forensic value of both items has been significantly reduced. Detectives will note the contamination in their report. If this case goes to prosecution, defense counsel will use the compromised chain of custody to challenge the evidence.',
        'Preserving the scene is not a courtesy to detectives — it is a legal requirement. First officers own the scene until they hand it off. That ownership means keeping everyone out, including victims.'
      ],
      legal: 'Pennsylvania Rules of Criminal Procedure Rule 573: Evidence collected or compromised in violation of proper procedures is subject to suppression. First officer scene preservation duties include preventing unauthorized access to the crime scene by all persons, including victims and property owners, until CIU/detectives assume control.',
      next: 'd2'
    },
    'c1-good': {
      type: 'consequence',
      outcomeClass: 'outcome-good',
      outcomeLabel: 'Scene Preserved',
      heading: 'You held the line. The homeowners are frustrated but cooperative. The evidence is untouched.',
      narrative: [
        '"I need you to stay outside for now. I know that\'s hard — it\'s your house. Detectives are coming and they need to see everything exactly as it is. The more we preserve right now, the better chance we have of identifying who did this."',
        'They understood. You got their names, contact info, and a verbal list of high-value items they knew were in the house — cash in the bedroom, a laptop, jewelry. You documented it in your notes without anyone entering the kitchen.',
        'The scene is intact. The cell phone and screwdriver are exactly where the burglar left them.'
      ],
      legal: 'First officer responsibilities: Establish and maintain a crime scene perimeter. No unauthorized access — including by victims and property owners — until detectives or crime scene personnel assume control and document the scene. Scene contamination is the most common chain of custody vulnerability in burglary prosecutions.',
      next: 'd2'
    },
    d2: {
      type: 'decision',
      decisionNumber: 2,
      situation: 'Detectives have not yet arrived. Your supervisor calls and asks you to collect the cell phone and screwdriver and transport them to the station so you can clear for a high-priority call across the township.',
      question: 'How do you handle the supervisor\'s directive?',
      options: [
        {
          text: 'Follow the order. Package both items in whatever bags you have in your patrol car, note the time collected, and transport them to the station. You\'ll write up the chain of custody later.',
          shortLabel: 'Collect and transport as directed — document later',
          quality: 'bad',
          next: 'c2-bad'
        },
        {
          text: 'Advise your supervisor of the situation — detectives are 10 minutes out, the scene is preserved, and improvised packaging could compromise the forensic value of both items. Request a brief delay or a second unit to hold the scene.',
          shortLabel: 'Advise supervisor — request brief hold or second unit',
          quality: 'good',
          next: 'c2-good'
        }
      ]
    },
    'c2-bad': {
      type: 'consequence',
      outcomeClass: 'outcome-bad',
      outcomeLabel: 'Chain of Custody Broken',
      heading: 'The improvised collection created a chain of custody gap that followed the case through prosecution.',
      narrative: [
        'Patrol car evidence bags are not standardized forensic packaging. The screwdriver was placed in a plastic shopping bag from your trunk. The cell phone went into an unsealed paper envelope. Neither item was photographed in place before collection.',
        'At the station, you wrote the chain of custody entry from memory — approximate times, no witness signature for the transfer. The packaging was not heat-sealed.',
        'Defense counsel filed a suppression motion three months later. The cell phone data — which included location information placing the suspect near the scene — was ruled inadmissible. The prosecution\'s case collapsed. Proper packaging and documentation would have prevented it.'
      ],
      legal: 'Pennsylvania chain of custody requirements: Each person who handles evidence must be documented — name, time, and reason for transfer. Evidence must be collected using appropriate forensic packaging and documented with in-place photography before collection. Gaps in chain of custody create suppression vulnerabilities that defense counsel are trained to exploit.',
      next: 'd3'
    },
    'c2-good': {
      type: 'consequence',
      outcomeClass: 'outcome-good',
      outcomeLabel: 'Proper Handoff — Evidence Intact',
      heading: 'You pushed back correctly. Detectives arrived, documented everything in place, and collected with proper chain of custody.',
      narrative: [
        '"Sarge, detectives are 8 minutes out. The scene is clean — two items untouched on the kitchen floor. If I collect now without proper packaging and in-place photography, we risk the chain of custody. I\'d rather hold 8 more minutes and hand this off correctly than compromise a prosecution."',
        'There was a pause. "Understood. Hold the scene. I\'ll get another unit for the other call."',
        'Detectives photographed both items in place, collected with proper forensic packaging, and signed the initial chain of custody with you as the preserving officer. The cell phone was later linked to a suspect with a prior residential burglary conviction. The case went to trial with clean evidence.'
      ],
      legal: 'In-place documentation before collection: All evidence must be photographed in its discovered location before being moved or collected. Proper forensic packaging — paper bags for biological material, plastic for hard items, sealed and labeled — is required for chain of custody integrity. The preserving officer\'s name is part of the chain — document your role accurately.',
      next: 'd3'
    },

    'd3': {
      type: 'decision',
      decisionNumber: 3,
      situation: 'Six months later, you are testifying at trial. Defense counsel is cross-examining you on chain of custody. She points to a period of approximately four hours between your logging the evidence into the property room and the forensic lab\'s receipt timestamp — and suggests there is an unexplained gap. You do not have a specific memory of those four hours because it was a standard transfer on a night with several other calls. Your documentation shows the transfer was completed but does not include the handoff contact\'s name.',
      question: 'How do you respond under oath?',
      options: [
        {
          text: 'Testify that you are confident the evidence was not tampered with during that window — you would have noticed any issue.',
          shortLabel: 'Assert confidence — evidence was not tampered with',
          quality: 'bad',
          next: 'c3-bad'
        },
        {
          text: 'Testify to exactly what your documentation shows. State that you do not have a specific memory of the transfer contact but that the documented chain reflects standard procedure. Acknowledge the documentation gap without speculating about what occurred during it.',
          shortLabel: 'Testify to documentation, acknowledge gap honestly',
          quality: 'good',
          next: 'c3-good'
        },
        {
          text: 'Say that standard procedure was followed and that you cannot speak to specific details beyond what is in your report.',
          shortLabel: 'Reference standard procedure, decline specifics',
          quality: 'risky',
          next: 'c3-neutral'
        }
      ]
    },
    'c3-bad': {
      type: 'consequence',
      outcomeClass: 'outcome-bad',
      outcomeLabel: 'Perjury Risk',
      heading: 'Asserting facts you cannot actually attest to is perjury — regardless of belief.',
      narrative: [
        'Testifying that you are "confident" something did not happen when you have no memory of the specific period is not testimony — it is speculation stated as fact, under oath. It does not matter that you believe the evidence was handled correctly. You cannot testify to what you did not witness.',
        'Defense counsel has now established that your memory of this transfer is limited. If you assert certainty, she will press for details you cannot provide. When you cannot provide them, your credibility collapses — and takes the prosecution\'s case with it.',
        'Honest testimony about what you know and do not know is stronger than false certainty. Prosecutors know how to work with gaps in documentation. They cannot work with a witness who has been caught overstating.'
      ],
      legal: '18 Pa. C.S. § 4902 — Perjury. Testifying to facts you cannot actually recall constitutes false testimony under oath. Additionally, the gap in documentation should have been identified and disclosed to the prosecutor before trial — that is your obligation when you review your notes prior to testimony.',
      next: 'debrief'
    },
    'c3-good': {
      type: 'consequence',
      outcomeClass: 'outcome-good',
      outcomeLabel: 'Credible and Correct',
      heading: 'Honest, specific testimony about what you documented is the most legally defensible position.',
      narrative: [
        'Acknowledging what is in your documentation, what you recall, and where your documentation has a gap is exactly what courts expect from honest witnesses. You are not required to have a perfect memory — you are required to tell the truth about what you have.',
        'The prosecution can address the documentation gap through the lab\'s intake records, the property room log, and through the forensic analyst\'s testimony. Your role is to testify truthfully to your part of the chain.',
        'Officers who testify precisely — without embellishment, without minimizing gaps — are the most credible witnesses. That credibility is earned over years and lost in seconds.'
      ],
      legal: 'Pennsylvania Rules of Evidence and case law on chain of custody allow for minor documentation gaps when standard procedure is established and the evidence\'s integrity is corroborated by other evidence. Honest acknowledgment of a gap, without speculation, is legally preferable to contested false certainty.',
      next: 'debrief'
    },
    'c3-neutral': {
      type: 'consequence',
      outcomeClass: 'outcome-neutral',
      outcomeLabel: 'Technically Safe — But Evasive',
      heading: 'Referring to standard procedure without addressing the specific gap leaves the impression of avoidance.',
      narrative: [
        'Saying "standard procedure was followed" when you cannot specifically recall the transfer is accurate — but it is the kind of answer that looks evasive under cross-examination. Defense counsel will follow up, and if you cannot provide specific details to back up the procedure claim, you lose credibility.',
        'The better answer: testify to what you documented, acknowledge the gap, and let the record stand as it is. That is honest and specific without overreaching.',
        'Prepare your testimony by reviewing your report thoroughly before trial and identifying gaps before defense counsel does. Notify the prosecutor of any documentation issues — that is part of your job.'
      ],
      legal: 'Witnesses who give procedural, nonspecific answers invite follow-up questioning that exposes the gaps they were trying to avoid. Specific, honest testimony is more defensible than generalized procedure references. Review documentation before testifying and flag issues to the prosecutor.',
      next: 'debrief'
    },
    debrief: { type: 'debrief' }
  }
};

/* ── Scenario: Officer Wellness ─────────── */
const SCENARIO_WELLNESS = {
  title: 'Officer Wellness',
  location: 'MTPD Patrol Division — End of Shift',
  totalDecisions: 3,
  nodes: {
    start: {
      type: 'scene',
      time: '2315',
      weather: 'Clear',
      unit: 'Unit 7903',
      narrative: [
        'You\'ve worked with your patrol partner, Officer Diaz, for three years. He\'s one of the best officers in the division — reliable, calm under pressure, good instincts. Over the last two months, something has changed.',
        'He\'s been calling out more. When he\'s in, he\'s short-tempered on calls — snapping at complainants, using dismissive language he wouldn\'t have used before. Last week he made a sarcastic comment about a suicide call that made you uncomfortable. Tonight, after a difficult child welfare check, he said flatly: "I don\'t feel anything anymore. I haven\'t in a while."',
        'You\'re both in the parking lot after shift. No supervisors around. He didn\'t say it looking for a response — he said it like a fact.'
      ],
      next: 'd1'
    },
    d1: {
      type: 'decision',
      decisionNumber: 1,
      situation: 'Diaz\'s statement — "I don\'t feel anything anymore" — is sitting in the air between you. He\'s unlocking his car. He\'s not visibly distressed, but what he said describes a significant psychological symptom.',
      question: 'How do you respond in this moment?',
      options: [
        {
          text: 'Let it go. He\'s been having a rough stretch and he\'ll work through it. Bringing it up could embarrass him or damage the working relationship. You\'ll keep an eye on him.',
          shortLabel: 'Let it go — don\'t make it awkward',
          quality: 'bad',
          next: 'c1-bad'
        },
        {
          text: 'Acknowledge what he said. Don\'t make it clinical — just stay in the moment with him. You don\'t need to fix it tonight. You just need him to know you heard it.',
          shortLabel: 'Stay in it — acknowledge what he said',
          quality: 'good',
          next: 'c1-good'
        }
      ]
    },
    'c1-bad': {
      type: 'consequence',
      outcomeClass: 'outcome-bad',
      outcomeLabel: 'The Moment Passed — And So Did He',
      heading: 'You said nothing. Three weeks later, Diaz was involved in a use-of-force incident that is now under review.',
      narrative: [
        'Emotional numbing — "I don\'t feel anything anymore" — is a recognized symptom of operational stress injury and secondary trauma. It is not a rough patch. It is a warning sign that a person\'s psychological resources have been depleted.',
        'Diaz\'s behavior on calls deteriorated over the following weeks. The use-of-force incident was not egregious, but his report documentation was inconsistent and his on-scene demeanor was captured on body camera in a way that raised questions.',
        'He is now facing an internal investigation. The outcome might have been different if someone had said something three weeks earlier. The most important intervention you will ever make for a fellow officer may happen in a parking lot at midnight — not on a critical incident.'
      ],
      legal: 'MTPD Wellness Policy / ALO 9.2 — Officers who observe signs of significant stress, psychological distress, or behavioral change in fellow officers are encouraged to report concerns to a peer support officer or supervisor. Peer support contacts are confidential. Early intervention protects both the officer and the department.',
      next: 'd2'
    },
    'c1-good': {
      type: 'consequence',
      outcomeClass: 'outcome-good',
      outcomeLabel: 'He Didn\'t Have to Explain It',
      heading: 'You didn\'t push. You stayed.',
      narrative: [
        '"Yeah. That call was rough." You didn\'t turn it into a conversation he didn\'t ask for. You just confirmed you heard him.',
        'He stopped with his hand on the door. "It\'s not just tonight. It\'s been a while." He paused. "I don\'t know what to do with that."',
        '"You don\'t have to know right now." You told him about the peer support program — not like a policy item, like something that exists for exactly this reason. You told him you\'d go with him if he wanted. He didn\'t say yes. But he didn\'t say no either. And he didn\'t get in the car and drive away like the conversation hadn\'t happened.'
      ],
      legal: 'Secondary traumatic stress and operational stress injury: Emotional numbing, detachment, and loss of empathy are recognized symptoms of cumulative trauma exposure in law enforcement. These are not character failures — they are physiological responses to sustained high-stress work. MTPD peer support contacts are confidential under Pennsylvania law and do not constitute a formal wellness referral unless the officer agrees.',
      next: 'd2'
    },
    d2: {
      type: 'decision',
      decisionNumber: 2,
      situation: 'Over the next week, Diaz\'s behavior on calls has not improved. You\'ve spoken with him twice informally. He hasn\'t reached out to peer support. Yesterday he was visibly impaired in his judgment during a domestic — he froze at a key moment and you had to step in. You are now genuinely concerned about his safety and the safety of others on calls with him.',
      question: 'What do you do?',
      options: [
        {
          text: 'Stay in the informal lane. He knows you\'re there. Pushing harder or going to a supervisor would feel like a betrayal. The code holds — you handle it internally.',
          shortLabel: 'Stay informal — don\'t escalate, protect the relationship',
          quality: 'bad',
          next: 'c2-bad'
        },
        {
          text: 'Tell Diaz directly that what you saw yesterday crosses a line — that you\'re concerned about him and you\'re going to talk to the peer support coordinator. Give him the chance to get ahead of it himself. Then follow through.',
          shortLabel: 'Tell him directly — involve peer support, give him the chance',
          quality: 'good',
          next: 'c2-good'
        }
      ]
    },
    'c2-bad': {
      type: 'consequence',
      outcomeClass: 'outcome-bad',
      outcomeLabel: 'It Escalated — On a Call',
      heading: 'The code held. So did the deterioration.',
      narrative: [
        'Diaz froze again the following Tuesday — this time during a foot pursuit. He lost the subject and submitted a report that left out the freeze entirely. A supervisor reviewing the body camera footage noticed the gap and opened an investigation.',
        'The internal review uncovered three weeks of documented behavioral decline. When asked whether other officers had observed changes, your name came up. You had said nothing.',
        'The code of silence that felt like loyalty was actually abandonment. Diaz needed intervention, not protection from the truth about what was happening to him. An officer who cannot safely perform their duties on calls is a danger to themselves, their partners, and the public. Peer support exists for this reason.'
      ],
      legal: 'Duty to partner and duty to intervene: Allowing an officer in psychological crisis to continue active patrol without intervention creates liability for the department and danger for the officer, their partners, and the public. Pennsylvania law does not impose criminal liability for failure to report officer wellness concerns — but departmental policy and professional obligation create clear expectations.',
      next: 'd3'
    },
    'c2-good': {
      type: 'consequence',
      outcomeClass: 'outcome-good',
      outcomeLabel: 'He Got Help. You Made the Call.',
      heading: 'It wasn\'t easy. It was right.',
      narrative: [
        '"Diaz, what happened yesterday on that call — I can\'t pretend I didn\'t see it. I\'m not going to your supervisor to burn you. I\'m going to peer support because I\'m worried about you and I need someone with more tools than I have. I want you to make the call today. If you do, I\'ll back you all the way."',
        'He was quiet for a long time. Then: "Okay."',
        'He contacted the peer support coordinator that afternoon. He was placed on a temporary administrative assignment while working with a department-connected therapist — not as a punishment, but to give him the space to recover. He came back to patrol eight weeks later. He told you it was the first time in two years he felt like himself.'
      ],
      legal: 'MTPD Peer Support Program: Peer support contacts are confidential and do not automatically trigger administrative action. Officers may self-refer or be referred by a colleague. A wellness referral is distinct from a fitness-for-duty evaluation — the latter involves formal administrative process. Peer support is the appropriate first step for stress-related concerns that do not involve immediate safety risk.',
      next: 'd3'
    },

    'd3': {
      type: 'decision',
      decisionNumber: 3,
      situation: 'After the conversation with your partner, you are driving back to the station. It has been a long month. You are working mandatory overtime, you snapped at your kids last week, and you have not slept more than five hours in three days. You find yourself thinking during the drive: "If I told anyone how I was actually doing, they would think I was weak. Or they\'d think I couldn\'t handle the job." Your sergeant, who you respect, has been asking how you are holding up. You have been saying "fine" every time.',
      question: 'What do you do with that realization?',
      options: [
        {
          text: 'Keep pushing through. Everyone is dealing with something. You can manage this.',
          shortLabel: 'Push through — everyone deals with it',
          quality: 'bad',
          next: 'c3-bad'
        },
        {
          text: 'The next time your sergeant asks, tell the truth — not everything, but something real. Or reach out to peer support or EAP on your own. The realization that you need to do something is the decision.',
          shortLabel: 'Be honest with your sergeant or access support',
          quality: 'good',
          next: 'c3-good'
        },
        {
          text: 'Take a personal day and use the rest to reset — you will be fine after a break.',
          shortLabel: 'Take a personal day, reset on your own',
          quality: 'risky',
          next: 'c3-neutral'
        }
      ]
    },
    'c3-bad': {
      type: 'consequence',
      outcomeClass: 'outcome-bad',
      outcomeLabel: 'Cumulative Risk',
      heading: 'Pushing through when the system is already telling you it is overloaded is not strength — it is a risk to you and the people around you.',
      narrative: [
        'Sleep deprivation at three days and five hours per night produces measurable impairment equivalent to a blood alcohol level above the legal driving limit. Officers in that state are making decisions in high-stakes environments. That is not manageable — that is a liability.',
        'The belief that needing support means weakness is the exact belief that law enforcement culture has been working to dismantle — because officers die from it. Secondary traumatic stress, burnout, and occupational cumulative trauma are physiological conditions, not character defects.',
        'You would not let a civilian drive impaired. Apply the same standard to yourself.'
      ],
      legal: 'Officer wellness policy and Pennsylvania law establish EAP and peer support protections specifically because the costs of untreated officer stress — to the officer, their family, the department, and the public — are well-documented. Accessing these resources is not a career risk. Continued unaddressed impairment is.',
      next: 'debrief'
    },
    'c3-good': {
      type: 'consequence',
      outcomeClass: 'outcome-good',
      outcomeLabel: 'The Right Decision',
      heading: 'Telling the truth — to yourself or one trusted person — is the hardest and most important step.',
      narrative: [
        'You do not have to give a detailed accounting. You do not have to break down. You just have to stop saying "fine" when you are not. That one shift — from a reflexive "fine" to a real answer — opens the door to everything that helps.',
        'EAP services are confidential and job-protected. Peer support contacts are confidential under MTPD policy. Your sergeant is asking because they are paying attention. Let them.',
        'The men who built careers that lasted, who stayed present for their families, who led effectively — they asked for help when they needed it. That is part of what made them credible.'
      ],
      legal: 'EAP (Employee Assistance Program) services are confidential and protected from disclosure in most employment contexts. Peer support contacts under MTPD policy carry confidentiality protections. Voluntary access to wellness resources does not affect employment status.',
      next: 'debrief'
    },
    'c3-neutral': {
      type: 'consequence',
      outcomeClass: 'outcome-neutral',
      outcomeLabel: 'Partial Reset — Not Sufficient',
      heading: 'A personal day helps — but it does not address the underlying pattern.',
      narrative: [
        'Rest is necessary. Taking a personal day when you are running on fumes is not wrong. But a single day off does not resolve three weeks of cumulative stress, a sleep deficit, and a pattern of not talking about what is actually happening.',
        'If you come back from the personal day, say "fine" to the next check-in question, and resume the same pace — you have not addressed anything. You have pressed pause.',
        'Use the day. And when you come back, take the next step: one honest conversation, one call to EAP, one peer support contact. The day off is step one, not the whole plan.'
      ],
      legal: 'Rest is a component of officer wellness — but single interventions are insufficient for cumulative occupational stress. MTPD wellness policy encourages early and ongoing use of peer support and EAP resources, not episodic crisis management.',
      next: 'debrief'
    },
    debrief: { type: 'debrief' }
  }
};

/* ── Scenario: De-escalation ────────────── */
const SCENARIO_DEESCALATION = {
  title: 'De-escalation',
  location: 'Indian Head Shopping Center Parking Lot, Route 63, Harleysville',
  totalDecisions: 3,
  nodes: {
    start: {
      type: 'scene',
      time: '1547',
      weather: 'Overcast, 61°F',
      unit: 'Unit 7903',
      narrative: [
        'Dispatch: "Unit 7903, respond to Indian Head Shopping Center — parking lot, male subject acting erratically. Caller says he\'s partially clothed, pacing, not responding to people talking to him. No weapons reported. No threats to bystanders."',
        'On arrival you locate the subject — male, mid-30s, no shirt, pacing near the cart return. He is not threatening anyone. He is holding a folding knife against his own forearm, not in a threatening posture — it appears self-directed. Bystanders have backed away.',
        'He sees you and starts speaking rapidly — a mix of coherent statements and fragmented phrases. "They\'re listening. They put something in my arm. I need it out. I need it out now." He is pressing the knife against his skin but has not cut himself yet. He is not advancing toward you.'
      ],
      next: 'd1'
    },
    d1: {
      type: 'decision',
      decisionNumber: 1,
      situation: 'The subject is armed, in apparent mental health crisis, and the threat is currently self-directed. He is agitated but not advancing. Additional units are 4 minutes out.',
      question: 'What is your immediate tactical and communication approach?',
      options: [
        {
          text: 'Draw your sidearm to establish a clear authority presence. Order him loudly and firmly to drop the knife. You have a right to establish control before this escalates.',
          shortLabel: 'Draw sidearm — give loud commands to drop knife',
          quality: 'bad',
          next: 'c1-bad'
        },
        {
          text: 'Establish distance and cover. Do not draw. Speak calmly — use his name if you can get it, keep your voice even, and slow the pace of the encounter. The goal right now is contact, not compliance.',
          shortLabel: 'Distance and cover — calm contact, no draw',
          quality: 'good',
          next: 'c1-good'
        }
      ]
    },
    'c1-bad': {
      type: 'consequence',
      outcomeClass: 'outcome-bad',
      outcomeLabel: 'Escalation — Subject in Crisis',
      heading: 'The presence of a drawn weapon and shouted commands triggered a fear response in an already fragmented mental state.',
      narrative: [
        'The moment you drew, he stopped pacing. His expression changed. He pressed the knife harder against his forearm. "Stay back. I know what you\'re going to do. I know what you\'re going to do."',
        'He has not advanced. But he has gone from agitated to terrified. A person in psychosis experiencing law enforcement as a threat does not respond to authority cues the way a person in a rational state does. The command presence that works in other contexts is accelerant here.',
        'You are now in a standoff with a mentally ill subject who believes you are going to hurt him, holding a knife to his own arm, with bystanders still in the area. The encounter has become more dangerous, not less.'
      ],
      legal: 'Graham v. Connor (1989): Use of force must be objectively reasonable given the totality of circumstances — including the subject\'s mental state, the threat level, and whether the threat is directed at officers or others. A subject in mental health crisis who poses no immediate threat to bystanders and whose threat is self-directed does not justify a drawn firearm at initial contact. De-escalation is required where tactically feasible.',
      next: 'd2'
    },
    'c1-good': {
      type: 'consequence',
      outcomeClass: 'outcome-good',
      outcomeLabel: 'Contact Without Escalation',
      heading: 'You slowed it down. He is still talking to you.',
      narrative: [
        'You positioned yourself at roughly 20 feet, with a parked vehicle at your flank for partial cover. Hands visible but not on your weapon. You spoke at normal volume — not loud, not commanding.',
        '"Hey. I\'m not here to hurt you. My name\'s Officer Curtis. What\'s your name?"',
        'He stopped pacing. "Marcus."',
        '"Marcus. I can see something\'s wrong. I\'m not going to rush you." You maintained eye contact. The knife was still in his hand. But he was talking. The window was open.'
      ],
      legal: 'MTPD De-escalation Policy / ALO 5.4: Officers shall use de-escalation techniques when tactically feasible before resorting to force. This includes: creating time and distance, using calm and non-threatening communication, avoiding commands that may trigger further distress in persons experiencing mental health crisis. CIT (Crisis Intervention Training) protocols apply.',
      next: 'd2'
    },
    d2: {
      type: 'decision',
      decisionNumber: 2,
      situation: 'Marcus is still holding the knife but is talking to you. He says he has not slept in four days and believes a tracking device was placed in his arm. He is clearly in a delusional state. Backup arrives — two units. One officer moves to flank position. Marcus notices and tightens his grip on the knife.',
      question: 'How do you direct the response now that backup is on scene?',
      options: [
        {
          text: 'Use the additional units to close distance and take him into custody. You have enough personnel now. Move fast, before he has a chance to act. The situation has gone on long enough.',
          shortLabel: 'Use backup to close and take him into custody now',
          quality: 'bad',
          next: 'c2-bad'
        },
        {
          text: 'Signal backup to hold position and stay back. You\'ve built minimal rapport — losing it now ends badly. Continue talking. Request Crisis Intervention dispatch. The goal is voluntary surrender, not forced takedown.',
          shortLabel: 'Hold backup — maintain rapport, request CIT',
          quality: 'good',
          next: 'c2-good'
        }
      ]
    },
    'c2-bad': {
      type: 'consequence',
      outcomeClass: 'outcome-bad',
      outcomeLabel: 'Forced Takedown — Officer Injured, Subject Injured',
      heading: 'Three officers moved in. Marcus cut himself and lacerated one officer\'s hand before being restrained.',
      narrative: [
        'When the officers moved, Marcus panicked. He slashed at his own arm first — a deep cut across the forearm — then spun and caught Officer Reyes\'s hand as she reached for the knife. The takedown required four officers and a taser deployment.',
        'Marcus is hospitalized. Reyes has a tendon laceration. The incident is under review.',
        'A person in full psychotic decompensation with a weapon against their own body does not respond to tactical closure the way a rational, resistant subject does. Forced contact in this state is predictably dangerous — not because the subject is violent by nature, but because fear and disorganization make their responses unpredictable. Time and rapport were the tools. They were abandoned.'
      ],
      legal: 'Tennessee v. Garner (1985) and Graham v. Connor (1989): The decision to use force — including tactical closure — must account for the severity of the threat, whether the subject poses an immediate danger, and whether de-escalation was exhausted. A subject whose threat is self-directed and who is actively engaging verbally with officers does not meet the threshold for forced custody without further de-escalation attempts.',
      next: 'd3'
    },
    'c2-good': {
      type: 'consequence',
      outcomeClass: 'outcome-good',
      outcomeLabel: 'Voluntary Surrender — No Force Required',
      heading: 'Fourteen minutes. He put the knife down himself.',
      narrative: [
        'You signaled the flanking officer back with a hand gesture — "hold." You kept talking to Marcus.',
        '"I hear you. Something is in your arm and it\'s hurting you and nobody is listening. I\'m listening right now. I don\'t want anyone to get hurt — including you. There are people who can actually help with this. Can you let me call them?"',
        'The crisis intervention officer arrived nine minutes later. Within five minutes of her arrival, Marcus set the knife on the ground and sat down. He was transported for an emergency psychiatric evaluation without a use-of-force incident. Reyes had no injury. Marcus received treatment. The situation was resolved because you protected the one thing that was working: the conversation.'
      ],
      legal: 'Pennsylvania Mental Health Procedures Act (50 P.S. § 7302): Officers may initiate an involuntary emergency examination when a person is severely mentally disabled and in need of immediate treatment. This is a civil process — not an arrest. CIT-trained officers and mobile crisis teams reduce use-of-force rates in mental health contacts by over 50% in documented studies. De-escalation is not delay — it is the tactically superior option when time and safety permit.',
      next: 'd3'
    },

    'd3': {
      type: 'decision',
      decisionNumber: 3,
      situation: 'The subject is now in handcuffs and being evaluated by EMS. Your de-escalation efforts were extensive and well-documented in your radio communications. After the scene stabilizes, the subject\'s adult son arrives. He is visibly upset and begins challenging you loudly in front of other residents who have gathered: "You had no right to put your hands on my father. You people don\'t know how to deal with mental illness. I want your badge number and I want to file a complaint right now."',
      question: 'How do you respond?',
      options: [
        {
          text: 'Explain to the son — in detail — everything you did and why, to demonstrate that you handled it correctly.',
          shortLabel: 'Defend your actions to the son on scene',
          quality: 'bad',
          next: 'c3-bad'
        },
        {
          text: 'Stay calm. Provide your name and badge number without hesitation. Acknowledge his concern without being defensive. Explain that he has every right to file a complaint and provide the process. Offer to connect him with your supervisor. Do not debate the incident on scene.',
          shortLabel: 'Calm, professional — provide info, offer supervisor',
          quality: 'good',
          next: 'c3-good'
        },
        {
          text: 'Tell him you understand he is upset, but this is not the time or place for this conversation, and walk away.',
          shortLabel: 'Acknowledge him briefly and disengage',
          quality: 'risky',
          next: 'c3-neutral'
        }
      ]
    },
    'c3-bad': {
      type: 'consequence',
      outcomeClass: 'outcome-bad',
      outcomeLabel: 'Escalation on Scene',
      heading: 'Defending your actions to an upset family member in public escalates rather than resolves.',
      narrative: [
        'You may be completely right about everything you did. That does not make the scene — in front of gathered neighbors, with an emotional family member — the right time or forum to make that case. Detailed justifications offered under pressure look defensive. They invite argument. And they occur in a context where nothing you say will land the way you intend.',
        'Your documentation, your radio communications, your body cam footage — those are where your conduct is recorded. That is where the record is. On scene, your job is to remain professional and de-escalate the family member, not to win an argument.',
        'The son is distressed. That is understandable. Treat his distress the same way you treated his father\'s.'
      ],
      legal: 'Statements made on scene during a complaint interaction may be subject to disclosure. Detailed defensive explanations given under emotional pressure can create inconsistencies with official reports. Refer complaints to the formal process — do not litigate incidents on the sidewalk.',
      next: 'debrief'
    },
    'c3-good': {
      type: 'consequence',
      outcomeClass: 'outcome-good',
      outcomeLabel: 'Professional and De-Escalating',
      heading: 'Your conduct on scene, after the incident, is part of the record too.',
      narrative: [
        'Providing your name and badge number without hesitation tells him — and everyone watching — that you have nothing to hide. Acknowledging his concern without defensiveness disarms the confrontation. Offering the complaint process and a supervisor contact gives him a path forward.',
        'You do not have to agree with his characterization. You do not have to defend yourself. You just have to be calm, respectful, and procedurally correct — which is exactly what you are.',
        'The officers who handle these post-incident family interactions well are the same ones who handle the calls well. The professionalism is the same. It does not go off when the handcuffs go on.'
      ],
      legal: 'Citizens have the right to file complaints against officers. Officers are required to provide identifying information when requested. Facilitating the complaint process — rather than discouraging it — is both legally correct and demonstrative of the confidence that comes with sound conduct.',
      next: 'debrief'
    },
    'c3-neutral': {
      type: 'consequence',
      outcomeClass: 'outcome-neutral',
      outcomeLabel: 'Incomplete Engagement',
      heading: 'Acknowledging and walking away leaves his concerns and his rights unaddressed.',
      narrative: [
        'The brief acknowledgment is better than defensiveness. But walking away without providing your name and badge number, without explaining the complaint process, and without connecting him to a supervisor leaves him with nothing — and leaves the impression that you are avoiding accountability.',
        'He has rights in this interaction. Providing your information and the complaint process is not optional. Doing it calmly, without argument, demonstrates the kind of professional confidence that makes complaints less likely, not more.',
        'Do not disengage before his basic questions are answered.'
      ],
      legal: 'Officers are required to provide identifying information upon request. Failure to do so creates a separate policy violation and potentially a civil rights claim. The complaint process should be facilitated, not minimized or avoided.',
      next: 'debrief'
    },
    debrief: { type: 'debrief' }
  }
};

/* ── Module Definitions ─────────────────── */
