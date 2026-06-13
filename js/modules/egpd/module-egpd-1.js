/* ══════════════════════════════════════════
   READING — Search & Seizure (EGPD)
══════════════════════════════════════════ */
const READING_SEARCH_SEIZURE = `
  <div class="content-block">
    <h4>Scenario</h4>
    <h2>You stop a vehicle on Blaker Dr for a tail light. The driver is nervous. You detect an odor you recognize as marijuana. What happens next will be decided — and scrutinized — based on your training, your judgment, and your documentation.</h2>
    <p>This module covers what the Fourth Amendment and the Pennsylvania Constitution require of you at every decision point of a search or seizure — and why Pennsylvania officers operate under stricter rules than the federal floor.</p>
  </div>
  <div class="content-block">
    <h4>Core Principle</h4>
    <h2>Warrantless searches are presumptively unreasonable.</h2>
    <p>The Fourth Amendment protects persons against unreasonable searches and seizures. Pennsylvania adds a second layer: Article I, Section 8 of the Pennsylvania Constitution, which Pennsylvania courts have repeatedly held provides <strong>greater</strong> privacy protection than the federal baseline. The foundational rule in both systems: a warrantless search is presumptively unreasonable, and the burden is on the Commonwealth — not the defendant — to justify it.</p>
    <div class="case-law-box">
      <div class="case-title">Terry v. Ohio, 392 U.S. 1 (1968)</div>
      <p>Officers may conduct a brief investigatory stop based on reasonable, articulable suspicion that criminal activity is afoot. A protective frisk for weapons requires separate justification — reasonable suspicion that the person is armed and dangerous. A frisk on that basis does not require consent, and a refusal of consent neither eliminates Terry authority nor supplies suspicion that was not already there.</p>
    </div>
    <div class="case-law-box">
      <div class="case-title">Commonwealth v. Enimpah, 106 A.3d 695 (Pa. 2014)</div>
      <p>At a suppression hearing, the Commonwealth bears the burden of production and persuasion to establish that the challenged evidence was lawfully obtained. Practically, that burden is carried — or dropped — by the specificity of the officer's report and testimony. A report built on conclusions gives the Commonwealth nothing to carry it with.</p>
    </div>
  </div>
  <div class="content-block">
    <h4>Vehicle Searches in Pennsylvania — Current Law</h4>
    <h2>Probable cause alone does not get you into a vehicle in this Commonwealth.</h2>
    <p>This is the area where Pennsylvania law has moved most in the last decade, and where officers trained on older standards make suppression-hearing mistakes.</p>
    <div class="case-law-box">
      <div class="case-title">Commonwealth v. Alexander, 243 A.3d 177 (Pa. 2020)</div>
      <p>The Pennsylvania Supreme Court overruled <em>Commonwealth v. Gary</em> (2014) and held that under Article I, Section 8, a warrantless vehicle search requires <strong>both probable cause and exigent circumstances</strong>. Either alone is insufficient. Obtaining a warrant is the default; if you search without one, a court will ask whether exigency made getting a warrant not reasonably practicable.</p>
    </div>
    <div class="case-law-box">
      <div class="case-title">Commonwealth v. Barr, 266 A.3d 25 (Pa. 2021)</div>
      <p>Because medical marijuana is lawful in Pennsylvania, the odor of marijuana <strong>alone</strong> no longer establishes probable cause. Odor remains a legitimate <em>factor</em> in the totality of the circumstances — it simply cannot do the job by itself. Odor plus corroborating observations, documented with specificity, can still build probable cause.</p>
    </div>
    <p>The practical sequence on a vehicle stop: treat odor as one factor, develop and document the totality, and when probable cause exists without true exigency — secure the vehicle and get the warrant. A K9 open-air sniff, supported by independent reasonable suspicion under <em>Rodriguez</em>, can contribute to probable cause; it does not eliminate the warrant requirement.</p>
  </div>
  <div class="content-block">
    <h4>Recognized Exceptions to the Warrant Requirement</h4>
    <ul class="key-points">
      <li><strong>Consent</strong> — Must be voluntary, not the product of duress or coercion (<em>Schneckloth v. Bustamonte</em>, 1973). Scope is measured by objective reasonableness — what a reasonable person would have understood by the exchange (<em>Florida v. Jimeno</em>, 1991). General consent to search a vehicle does not automatically include a locked container; consent to search a living room does not extend to an attached garage. When scope is ambiguous, clarify before you proceed.</li>
      <li><strong>Search Incident to Lawful Arrest</strong> — Extends to the person and the area within their immediate control at the time of arrest (<em>Chimel v. California</em>, 1969). A backpack being worn at arrest qualifies. <em>Arizona v. Gant</em> (2009) sharply limits vehicle searches incident to arrest — know the distinction.</li>
      <li><strong>Plain View</strong> — Requires lawful presence, an item in plain view, and incriminating character that is immediately apparent (<em>Horton v. California</em>, 1990). Applies during consent searches and warrant executions alike — but a locked safe, unlisted documents, or items needing further examination do not satisfy "immediately apparent."</li>
      <li><strong>Terry Frisk</strong> — Reasonable suspicion the person is armed and dangerous authorizes a pat-down for weapons. Consent is a separate authority; its refusal changes nothing about Terry.</li>
      <li><strong>Abandonment</strong> — Property voluntarily abandoned carries no Fourth Amendment expectation of privacy. The controlling question is the voluntary relinquishment of control, not whether the property landed on public or private ground.</li>
      <li><strong>Exigent Circumstances</strong> — Hot pursuit, imminent destruction of evidence, immediate threat to safety. Exigency cannot be manufactured by officer conduct — and in Pennsylvania it is a required element, alongside probable cause, of any warrantless vehicle search.</li>
    </ul>
  </div>
  <div class="content-block">
    <h4>The Documentation Standard</h4>
    <h2>Vague reports lose suppression hearings. Specific reports win them.</h2>
    <p>Courts do not evaluate your instincts. They evaluate whether a reasonable officer, with your training and experience, observing the specific facts you documented, would reach the conclusion you reached. "Appeared nervous" and "detected an odor of marijuana" are conclusions. "Driver would not maintain eye contact, hands visibly trembling on the wheel, responses delayed approximately two seconds; strong odor consistent with fresh marijuana from the open driver's window at approximately three feet, consistent with training and seven years of patrol experience" — that is a foundation a court can evaluate.</p>
    <p>Consent documentation must address voluntariness, not just the fact of consent: the exact words of the request and response, weapon status, tone, the subject's apparent condition, and the absence of coercion. And every stop that generates observations — including stops that end in a warning — deserves complete documentation. Field intelligence that is not recorded does not exist.</p>
    <button class="btn-launch" onclick="startScenario('egpd-search-seizure')">Proceed to Scenario Exercise →</button>
  </div>
`;

/* ══════════════════════════════════════════
   SCENARIO — Search & Seizure (EGPD)
══════════════════════════════════════════ */
const SCENARIO_SEARCH_SEIZURE = {
  id: 'scenario-search-seizure',
  title: 'Blaker Dr — Traffic Stop',
  location: 'Blaker Dr, East Greenville Borough, PA',
  totalDecisions: 3,
  nodes: {

    /* ── OPENING SCENE ─────────────────── */
    'start': {
      type: 'scene',
      time: '22:17',
      weather: 'Clear / 54°F',
      unit: 'Patrol Unit 3',
      narrative: [
        'You are on routine patrol on Blaker Dr when you observe a silver Honda Civic traveling at the posted speed. The driver\'s side tail light is out — a clear equipment violation under 75 Pa. C.S. § 4303.',
        'You initiate a traffic stop. The vehicle pulls into the well-lit parking lot of a closed business. Dispatch is notified. You approach the driver\'s window.'
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
          text: 'Immediately ask the driver to step out and search the vehicle. The odor of marijuana gives you probable cause, and probable cause is all you need.',
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
        'Six weeks later, defense counsel files a motion to suppress — and wins on two independent grounds. First, under Commonwealth v. Barr (2021), the odor of marijuana alone no longer establishes probable cause in Pennsylvania, and your report documents the supporting observations only as driver "appeared nervous" — conclusory language the court cannot weigh. Second, under Commonwealth v. Alexander (2020), even probable cause would not have justified this search: a warrantless vehicle search in Pennsylvania requires probable cause AND exigent circumstances, and no exigency existed — the vehicle was stopped, the scene controlled. Evidence suppressed. Case dismissed.'
      ],
      legal: 'Commonwealth v. Alexander (2020): warrantless vehicle searches in Pennsylvania require both probable cause and exigent circumstances — a warrant is the default. Commonwealth v. Barr (2021): the odor of marijuana is a factor in the totality of the circumstances but cannot establish probable cause by itself. And at the suppression hearing, the Commonwealth bears the burden of proving the search lawful (Commonwealth v. Enimpah, 2014) — a burden a conclusory report cannot carry.',
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
        'Montgomery County K9 Unit arrives 11 minutes later. The handler conducts a free air sniff of the vehicle exterior. The dog alerts on the driver\'s door seam. The alert, combined with your documented observations, establishes probable cause. With no exigent circumstances — the vehicle is stopped and the occupants controlled — you secure the vehicle and obtain a search warrant, as Commonwealth v. Alexander requires. The search locates 14 grams of marijuana, a digital scale, and $840 in cash in the center console, all of it on a warrant that will survive any suppression motion.'
      ],
      legal: 'Rodriguez v. United States (2015) limits how long a traffic stop may be extended for a dog sniff — it cannot extend the stop\'s duration beyond what is needed for the original purpose without independent reasonable suspicion. Here, the odor plus your documented behavioral observations provide that suspicion, and your CAD documentation preserves the timeline. Commonwealth v. Alexander (2020): once probable cause exists, absent exigent circumstances the next step is a warrant — not a roadside search.',
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
        'You determine you don\'t have sufficient grounds to search and issue the written warning for the equipment violation. The vehicle departs.',
        'Two hours and fourteen minutes later, a neighboring department conducts a traffic stop on the same vehicle. They recover 200 grams of methamphetamine, a firearm, and $4,200 in cash. Your sergeant contacts you the following morning. He wants to know what you observed and what you documented during your stop.'
      ],
      legal: null,
      next: 'd2d'
    },
    'd2d': {
      type: 'decision',
      decisionNumber: 2,
      situation: 'The neighboring department wants your observations from the earlier stop to support their probable cause documentation. Your sergeant is asking the same question. What did you put in CAD at the time of the stop?',
      question: 'Which documentation approach protects you and provides investigative value?',
      options: [
        {
          text: '"Traffic stop — equipment violation — written warning issued — released at 22:31."',
          next: 'c2d_wrong',
          quality: 'bad',
          shortLabel: 'Minimal — no investigative record'
        },
        {
          text: '"Traffic stop, Blaker Dr. Equipment violation — broken tail light. On approach, officer detected odor consistent with marijuana. Driver exhibited nervous behavior: no eye contact, hands trembling, delayed responses. Insufficient PC to conduct search at time of contact. Written warning issued. Driver released at 22:31. Observations documented for intelligence. PA tag [XXX-XXXX] forwarded to dispatch for regional awareness."',
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
        'Minimal documentation means your observations — which could have supported the other department\'s investigation and potentially connected the vehicle to a larger network — are lost. You cannot corroborate their stop, cannot testify to what you observed, and your department has no intelligence record of the contact.',
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
        'Your CAD documentation becomes part of the other department\'s probable cause timeline. Your observations are admissible and corroborate the investigation. The intelligence record demonstrates that your department was alert, professional, and operating within the law.',
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
      scenario: 'You stop a vehicle and develop probable cause to search based on the odor of marijuana combined with other observations. Your report later states only that the driver "appeared nervous" and you "detected an odor of marijuana."',
      text: 'What is the primary legal problem with this documentation in a Pennsylvania suppression hearing?',
      options: [
        'Nervousness alone can never contribute to a probable cause determination in Pennsylvania.',
        'The documentation uses conclusory language without the specific, articulable facts required to support the probable cause determination.',
        'Reports may only describe observations made after the search began, not before.',
        'There is no legal problem — odor plus nervous behavior always establishes probable cause in Pennsylvania courts.'
      ],
      correct: 1,
      feedback: 'Correct. Pennsylvania courts require specific, articulable facts — not conclusory statements. "Appeared nervous" is a conclusion. A legally defensible report requires specificity: what specific behaviors, what odor characteristics, from what distance, and how your training and experience informed your assessment. This matters doubly after Commonwealth v. Barr (2021), where odor is only a factor in the totality — and at the suppression hearing the Commonwealth bears the burden of proving the search lawful (Commonwealth v. Enimpah, 2014), which a conclusory report cannot carry.'
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
