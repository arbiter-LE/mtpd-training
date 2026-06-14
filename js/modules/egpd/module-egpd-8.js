/* ══════════════════════════════════════════
   READING — Traffic Stops & Vehicle Contacts (EGPD)
══════════════════════════════════════════ */
const READING_TRAFFIC_STOPS = `
  <div class="content-block">
    <h4>Scenario</h4>
    <h2>A brake-light stop on Blaker Dr. A moderate odor of marijuana from the open window, shaking hands, a frozen passenger. What you may lawfully do next has changed twice in the last decade — and officers trained on the old rules lose suppression hearings.</h2>
    <p>This module covers the controlling law of the vehicle stop: occupant control, stop duration, Pennsylvania's current vehicle search standard, documentation, and the situations that test your judgment at the roadside.</p>
  </div>
  <div class="content-block">
    <h4>Controlling the Stop</h4>
    <h2>Occupants out of the vehicle: settled. Extending the stop: strictly limited.</h2>
    <div class="case-law-box">
      <div class="case-title">Pennsylvania v. Mimms, 434 U.S. 106 (1977) / Maryland v. Wilson, 519 U.S. 408 (1997)</div>
      <p><em>Mimms</em>: officers may order the driver out of a lawfully stopped vehicle as a matter of course — no additional justification required. <em>Wilson</em> extends that authority to passengers. The officer-safety interest outweighs the minimal added intrusion. The order must serve genuine safety purposes — not the suppression of protected activity like recording.</p>
    </div>
    <div class="case-law-box">
      <div class="case-title">Rodriguez v. United States, 575 U.S. 348 (2015)</div>
      <p>A stop may not be extended beyond the time needed to complete its purpose — citation, records checks, documents returned — without independent reasonable suspicion. Refusal to consent to a search is not reasonable suspicion; exercising a constitutional right cannot be the basis for detention. Once the purpose is complete and no independent basis exists, return the documents and let the driver leave.</p>
    </div>
  </div>
  <div class="content-block">
    <h4>Vehicle Searches — Pennsylvania's Current Standard</h4>
    <h2>Two cases changed everything. Know them both.</h2>
    <div class="case-law-box">
      <div class="case-title">Commonwealth v. Alexander, 243 A.3d 177 (Pa. 2020)</div>
      <p>Overruled <em>Commonwealth v. Gary</em> (2014). Under Article I, Section 8 of the Pennsylvania Constitution, a warrantless vehicle search requires <strong>both probable cause and exigent circumstances</strong> — either alone is insufficient. Obtaining a warrant is the default; a reviewing court will ask whether exigency made getting one not reasonably practicable. A stopped vehicle with controlled occupants is rarely an exigency.</p>
    </div>
    <div class="case-law-box">
      <div class="case-title">Commonwealth v. Barr, 266 A.3d 25 (Pa. 2021)</div>
      <p>Because medical marijuana is lawful in Pennsylvania, the odor of marijuana <strong>alone</strong> no longer establishes probable cause. Odor remains a legitimate factor in the totality of the circumstances — odor plus corroborating observations (behavior, plain-view material, admissions) can still build probable cause.</p>
    </div>
    <p>The roadside sequence under current law: document the odor and every corroborating observation with specificity; develop the totality within the stop's lawful scope; and when probable cause exists without true exigency — secure the vehicle and apply for the warrant. A warrant-authorized search does not depend on the subject's consent, and an objection ("I don't consent — I know my rights") does not suspend it. Document the objection verbatim and proceed within the warrant's scope. Consent is different: when consent is the legal basis of a search, its withdrawal ends the search.</p>
  </div>
  <div class="content-block">
    <h4>The Documentation Standard</h4>
    <h2>"Detected an odor of marijuana" is a conclusion — and a suppression vulnerability.</h2>
    <p>At a suppression hearing the Commonwealth must establish the factual basis for probable cause with specificity. Proper documentation includes: the precise location where the odor was detected ("upon approaching the open driver's window"), its strength and character, when it was detected relative to the contact, and every corroborating behavioral observation. After <em>Barr</em>, where odor is only a factor, the corroborating facts are not garnish — they are the probable cause.</p>
  </div>
  <div class="content-block">
    <h4>Roadside Judgment Calls</h4>
    <ul class="key-points">
      <li><strong>Missing registration with a plausible explanation</strong> — a recent purchase, a receipt in hand: verify through the MDT, document what the driver provided and what your check returned, and use discretion consistent with department policy. Impoundment and arrest are disproportionate to a verifiable explanation.</li>
      <li><strong>Suspected impairment despite adequate SFSTs</strong> — passing field sobriety tests reduces probable cause but does not automatically eliminate it; impairment can be drug-based. Document every observation (driving pattern, physical indicators, each SFST component), consider a Drug Recognition Expert evaluation where available, and decide on the documented totality — never on intuition alone.</li>
      <li><strong>Vehicle registered to a warrant subject, license comes back to someone else</strong> — a driver matching the registered owner's physical description provides reasonable suspicion to investigate further under Terry: ask the driver to step out, request additional identifying information, and resolve the identity question. Arrest requires probable cause developed through that investigation, not the plate return alone.</li>
      <li><strong>A bystander or passenger recording you</strong> — under <em>Fields v. City of Philadelphia</em> (3d Cir. 2017), the First Amendment protects recording police performing official duties in public. Do not order recording stopped, and do not dress a recording objection up as an "officer safety" order — courts look to actual motivation. Your professional conduct is the answer to the camera.</li>
    </ul>
    <button class="btn-launch" onclick="startScenario('egpd-traffic-stops')">Proceed to Scenario Exercise →</button>
  </div>
`;

/* ══════════════════════════════════════════
   SCENARIO — Traffic Stops & Vehicle Contacts (EGPD)
══════════════════════════════════════════ */
const SCENARIO_TRAFFIC_STOPS = {
  title: 'Traffic Stops & Vehicle Contacts',
  location: 'Blaker Dr',
  totalDecisions: 3,
  nodes: {
    start: {
      type: 'scene',
      time: '2147',
      weather: 'Clear / Dark',
      unit: 'Unit 7903',
      narrative: [
        'You are on patrol on Blaker Dr. You observe a 2019 Honda Civic with a non-functioning driver-side brake light. You initiate a traffic stop.',
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
          text: 'Return the documents and conclude the stop — after Commonwealth v. Barr, the odor means nothing in Pennsylvania, and there is no lawful basis to do anything further.',
          shortLabel: 'Conclude stop — treat odor as legally meaningless',
          quality: 'bad',
          next: 'c1-bad'
        },
        {
          text: 'Treat the odor as one factor in the totality of the circumstances. Document your specific observations — the odor, the shaking hands, the avoidance — and continue the investigation lawfully: if probable cause develops and no exigency exists, secure the vehicle and apply for a search warrant.',
          shortLabel: 'Odor = one factor — build totality, warrant if PC develops',
          quality: 'good',
          next: 'c1-good'
        }
      ]
    },
    'c1-bad': {
      type: 'consequence',
      outcomeClass: 'outcome-bad',
      outcomeLabel: 'Incorrect Application of PA Search Law',
      heading: 'Barr made odor insufficient by itself — it did not make odor meaningless.',
      narrative: [
        'Commonwealth v. Barr (2021) holds that the odor of marijuana alone no longer establishes probable cause in Pennsylvania, because medical marijuana made lawful possession common. But the same decision preserves odor as a legitimate factor in the totality of the circumstances.',
        'Here you have more than odor: a moderate odor from the open window, visibly shaking hands, eye-contact avoidance, and a frozen passenger. Walking away without documenting those observations — or developing them through lawful conversation during the stop you are still completing — abandons an investigation the law permits.',
        'And if the totality does ripen into probable cause, Commonwealth v. Alexander (2020) tells you what comes next: not a roadside search, but a secured vehicle and a warrant application, unless true exigent circumstances exist.'
      ],
      legal: 'Commonwealth v. Barr, 266 A.3d 25 (Pa. 2021): the odor of marijuana is a factor in the totality of the circumstances but cannot establish probable cause alone. Commonwealth v. Alexander, 243 A.3d 177 (Pa. 2020): a warrantless vehicle search requires both probable cause and exigent circumstances — obtaining a warrant is the default. Rodriguez v. United States (2015) governs the stop\'s duration: investigation within the stop\'s lawful scope is permitted; extension requires independent reasonable suspicion.',
      next: 'd2'
    },
    'c1-good': {
      type: 'consequence',
      outcomeClass: 'outcome-good',
      outcomeLabel: 'Correct — Current Pennsylvania Law Applied',
      heading: 'Odor is a factor. The totality builds probable cause. The warrant does the rest.',
      narrative: [
        'You document the specifics in real time: moderate odor of marijuana from the open driver\'s window detected on approach, the driver\'s visibly shaking hands, his avoidance of eye contact, the passenger\'s frozen posture. During the stop, in plain view, you also observe loose plant material on the center console. The totality now establishes probable cause.',
        'Under Commonwealth v. Alexander, probable cause alone does not authorize a roadside search — a warrantless vehicle search requires probable cause AND exigent circumstances. The vehicle is stopped, the occupants are controlled, and nothing prevents you from getting a warrant. So you order both occupants out (Pennsylvania v. Mimms and Maryland v. Wilson authorize this as a matter of course), secure the vehicle, and apply for a search warrant.',
        'Your affidavit writes itself, because you documented the basis with specificity: what you smelled, where and when you detected it, what you observed, and the plain-view corroboration.'
      ],
      legal: 'Pennsylvania v. Mimms (1977): officers may order the driver out of a lawfully stopped vehicle as a matter of course. Maryland v. Wilson (1997): extends Mimms to passengers. Commonwealth v. Barr (2021): odor is a factor, not standalone probable cause. Commonwealth v. Alexander (2020): absent exigent circumstances, probable cause leads to a warrant — not a warrantless roadside search.',
      next: 'd2'
    },
    d2: {
      type: 'decision',
      decisionNumber: 2,
      situation: 'The vehicle was secured and your search warrant application — built on the odor, the behavioral observations, and the plant material in plain view — was approved by the on-call magisterial district judge. Both occupants are out of the vehicle. As you begin executing the warrant, the driver, standing at the rear, says: "You can\'t search my car. I don\'t consent to this. I know my rights." The passenger is cooperative and quiet.',
      question: 'How do you respond to the driver\'s objection?',
      options: [
        {
          text: 'Explain briefly that the search is authorized by a warrant and his consent is not required — proceed with the search, and document his objection verbatim in the report.',
          shortLabel: 'Explain warrant authority, proceed, document objection',
          quality: 'good',
          next: 'c2-good'
        },
        {
          text: 'Stop the search — he has clearly invoked his rights, and proceeding over an explicit objection risks suppression.',
          shortLabel: 'Stop search on driver\'s objection',
          quality: 'bad',
          next: 'c2-bad'
        }
      ]
    },
    'c2-bad': {
      type: 'consequence',
      outcomeClass: 'outcome-bad',
      outcomeLabel: 'Incorrect — Objection Does Not Override a Warrant',
      heading: 'A subject\'s objection does not nullify judicial authorization. The search is lawful.',
      narrative: [
        'A search warrant is judicial authorization. It does not depend on the subject\'s consent, and an objection — however emphatic — does not suspend it. "I don\'t consent" matters when consent is the legal basis for a search; it is irrelevant when a warrant is.',
        'The Fourth Amendment prohibits unreasonable searches. A search executed under a valid warrant, within its scope, is the constitutional gold standard of reasonableness. Stopping a warrant-authorized search because a subject objects is a tactical and legal error.',
        'Stopping here leaves evidence in the vehicle, fails to execute lawful judicial process, and signals to the subject that objections override legal authority.'
      ],
      legal: 'A warrant-authorized search does not require consent, and an objection cannot vitiate it. Document the objection verbatim in your report — it is relevant context — but it does not alter the legal basis for the search. If the subject physically interferes with the search, that is a separate criminal matter.',
      next: 'd3'
    },
    'c2-good': {
      type: 'consequence',
      outcomeClass: 'outcome-good',
      outcomeLabel: 'Correct — A Warrant Does Not Require Consent',
      heading: 'Brief, calm, accurate explanation. Proceed. Document.',
      narrative: [
        '"I\'m not asking for consent — this search is authorized by a warrant signed by a judge. You can observe from here." That\'s the entire conversation. No argument, no escalation.',
        'Document the driver\'s objection verbatim in your report. It is relevant context and demonstrates your awareness that the subject disputed the search — and that your legal basis was independent of his consent.',
        'The search proceeds. If contraband is found, the warrant, the affidavit\'s specific probable cause documentation, and the chain of custody are the foundation of the prosecution. Your report language matters as much as the physical evidence.'
      ],
      legal: 'Consent is irrelevant when a search is authorized by a warrant. Document: (1) the specific observations that built probable cause and when each was made, (2) the warrant\'s issuance and scope, (3) the driver\'s verbal objection and your response, (4) items found and their exact location in the vehicle. Vague probable cause documentation — "detected an odor of marijuana" without detail — is what gets affidavits and searches challenged.',
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
      legal: 'The First Amendment right to record police in public was affirmed for the Third Circuit (which covers Pennsylvania) in Fields v. City of Philadelphia (2017). Officers may not lawfully seize recording devices or order people to stop recording without consent or independent legal justification. Doing so creates civil liability.',
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
      legal: 'Fields v. City of Philadelphia, 862 F.3d 353 (3d Cir. 2017) — the controlling case for Pennsylvania — holds that the First Amendment protects photographing, filming, and audio recording of police performing official duties in public, by anyone with a recording device. Glik v. Cunniffe (1st Cir. 2011) reached the same conclusion. Pennsylvania law does not prohibit recording law enforcement performing official duties in public spaces.',
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

function getTrafficStopQuestions() {
  return [
    {
      scenario: 'You conduct a lawful traffic stop for an equipment violation. After making contact with the driver, you determine you want him to step out of the vehicle.',
      text: 'Under Pennsylvania v. Mimms, what is required before ordering a driver to exit a lawfully stopped vehicle?',
      options: [
        'Reasonable suspicion that the driver is armed or dangerous.',
        'Probable cause of a separate criminal offense.',
        'No additional justification — Mimms authorizes ordering the driver out as a matter of course.',
        'The driver must be informed of the reason before exiting.'
      ],
      correct: 2,
      feedback: 'Correct. Pennsylvania v. Mimms (1977) established that officers may order the driver of a lawfully stopped vehicle to exit as a matter of course, without articulating additional justification. The government\'s interest in officer safety during a traffic stop outweighs the minimal intrusion of requiring the driver to stand outside. Maryland v. Wilson (1997) extends this authority to all passengers.'
    },
    {
      scenario: 'You stop a vehicle for a broken taillight. After issuing the warning and preparing to return the driver\'s documents, you decide to ask for consent to search the vehicle. The driver says no.',
      text: 'Under Rodriguez v. United States, what must you do at this point?',
      options: [
        'You may detain the vehicle briefly while waiting for a K9 unit to arrive.',
        'You may ask follow-up questions to develop reasonable suspicion before releasing.',
        'You must return the documents and allow the driver to leave — no independent basis for extension exists.',
        'Refusal to consent is itself reasonable suspicion, justifying continued detention.'
      ],
      correct: 2,
      feedback: 'Correct. Rodriguez v. United States (2015) prohibits extending a stop beyond its lawful purpose without independent reasonable suspicion. Once the citation is issued and documents are ready to be returned, the stop\'s purpose is complete. Refusal to consent is not reasonable suspicion — exercising a constitutional right cannot be used as the basis for detention. Without independent articulable suspicion, you must return the documents and allow departure.'
    },
    {
      scenario: 'During a traffic stop, you detect a strong odor of marijuana emanating from the interior of the vehicle. The registration and license are clean.',
      text: 'Under Commonwealth v. Barr (2021) and Commonwealth v. Alexander (2020), what does the odor of marijuana establish, and what does a vehicle search require?',
      options: [
        'The odor alone establishes probable cause, and probable cause alone supports an immediate warrantless search.',
        'The odor is one factor in the totality of the circumstances — it cannot establish probable cause alone — and even with probable cause, a warrantless vehicle search requires exigent circumstances. The default is to secure the vehicle and obtain a warrant.',
        'The odor is legally meaningless in Pennsylvania and may not be considered at all.',
        'The odor establishes reasonable suspicion that obligates you to call a K9 before any further action.'
      ],
      correct: 1,
      feedback: 'Correct. Commonwealth v. Barr (2021): because medical marijuana is lawful in Pennsylvania, odor alone no longer establishes probable cause — but it remains a legitimate factor in the totality of the circumstances. Commonwealth v. Alexander (2020) overruled Commonwealth v. Gary and held that a warrantless vehicle search requires both probable cause AND exigent circumstances; obtaining a warrant is the default. Document the specific basis: where the odor was detected, its strength, and the corroborating factors that complete the totality.'
    },
    {
      scenario: 'You are executing a search warrant on a vehicle, issued on probable cause you developed during a stop. The driver says loudly: "You need my permission. I don\'t consent to this search."',
      text: 'How does the driver\'s objection affect the legality of your search?',
      options: [
        'The objection requires you to stop and re-apply for a warrant that addresses it.',
        'The objection is a valid invocation of Fourth Amendment rights that suspends the search.',
        'The objection is irrelevant — a warrant-authorized search does not depend on consent. Document the objection verbatim and proceed.',
        'You must obtain a supervisor\'s approval to continue over an explicit objection.'
      ],
      correct: 2,
      feedback: 'Correct. A search warrant is judicial authorization — it does not require the subject\'s consent, and an objection does not vitiate it. Consent matters when consent is the legal basis for the search (and consent searches end when consent is withdrawn); it is irrelevant when a warrant is the basis. Document the driver\'s statement verbatim — it is relevant context — and proceed within the warrant\'s scope. If he physically interferes, that is a separate criminal matter.'
    },
    {
      scenario: 'You are preparing your warrant affidavit and report for a vehicle search based on the odor of marijuana combined with other observations. Your draft currently reads: "Upon approaching the vehicle, I detected an odor of marijuana."',
      text: 'What is the most significant problem with this probable cause documentation?',
      options: [
        'It does not include the driver\'s response to the search.',
        'It is a conclusion without the specific, articulable facts that support it — insufficient for a suppression hearing.',
        'It does not specify which officer detected the odor.',
        'It must reference Commonwealth v. Alexander by name to be legally sufficient.'
      ],
      correct: 1,
      feedback: 'Correct. "Detected an odor of marijuana" is a conclusion, not documentation of probable cause. At a suppression hearing, the Commonwealth must establish the factual basis for probable cause with specificity. Proper documentation includes: the precise location where the odor was detected (e.g., "upon approaching the driver\'s open window"), the strength and character of the odor, when it was detected relative to the contact, and any corroborating behavioral observations. Vague probable cause language is the most common suppression vulnerability in vehicle search cases in Pennsylvania.'
    },
    {
      scenario: 'During a routine traffic stop, the driver produces a valid driver\'s license but no registration. The driver states the registration is in the mail and shows you a receipt for a recently purchased vehicle.',
      text: 'What is the appropriate course of action?',
      options: [
        'Issue a citation for failure to produce registration and impound the vehicle.',
        'Verify the vehicle\'s status through your MDT, document the driver\'s explanation and the receipt, and use discretion consistent with department policy — temporary registration documentation may be verifiable.',
        'Release the driver without any documentation — a receipt is sufficient proof of ownership.',
        'Arrest the driver for operating without registration until ownership can be confirmed.'
      ],
      correct: 1,
      feedback: 'Correct. A recent vehicle purchase may explain absent registration. MDT checks can verify recent sales and registration status. Discretion — guided by department policy and the totality of the circumstances — is appropriate here. Document what you observed, what the driver provided, and what your check returned. Impoundment and arrest are disproportionate responses to a verifiable, plausible explanation. Thorough documentation protects you regardless of the disposition.'
    },
    {
      scenario: 'You stop a vehicle and develop reasonable articulable suspicion that the driver may be impaired. The driver performs adequately on field sobriety tests but you still have concerns based on your observations.',
      text: 'What is the appropriate next step?',
      options: [
        'Make the arrest anyway based on your gut — officers have broad discretion in DUI cases.',
        'Release the driver — passing field sobriety tests is a complete defense to DUI arrest.',
        'Document your specific observations thoroughly, consider requesting a DRE evaluation if available, and make an arrest decision based on the totality of articulable, documented facts — not on intuition alone.',
        'Administer a preliminary breath test and arrest only if it returns above .08.'
      ],
      correct: 2,
      feedback: 'Correct. DUI arrests require probable cause grounded in specific articulable facts. Passing SFSTs reduces the available PC but does not automatically eliminate it — impairment can be drug-based, and not all impairment registers on breath tests. A Drug Recognition Expert (DRE) evaluation may establish additional facts. Whatever your decision, document every observation: driving pattern, physical indicators, performance on each SFST component, and any statements. Arrests made on intuition without documented PC do not survive prosecution.'
    },
    {
      scenario: 'You conduct a traffic stop on a vehicle registered to someone with a felony warrant. The driver\'s license comes back to a different person with no warrants. The driver matches the physical description of the registered owner.',
      text: 'What is your legal authority and appropriate approach?',
      options: [
        'Arrest the driver immediately — the vehicle is registered to a felony warrant subject.',
        'The plate return is not sufficient — release the driver since the license came back clean.',
        'You have reasonable suspicion to investigate further. Ask the driver to step out, request additional identifying information, and determine through investigation whether the driver is the registered owner or another person.',
        'Run the license only — if it comes back clean the stop must end.'
      ],
      correct: 2,
      feedback: 'Correct. A vehicle registered to a felony warrant subject, combined with a driver who physically matches that subject, provides reasonable suspicion to investigate further even when the presented license comes back to a different name. People use false identification. Requesting additional information and extending the stop for this specific investigation purpose is lawful under Terry. Document the specific articulable facts supporting your continued investigation. An arrest requires probable cause established through the investigation — not just the plate return.'
    },
  ];
}

/* ══════════════════════════════════════════
   SUPERVISOR OVERLAY — Traffic Stops (EGPD)
   Reviewing the highest-volume report for two clocks and a camera:
   Rodriguez duration, Alexander/Barr search authority, recording.
══════════════════════════════════════════ */
const SUPERVISOR_TRAFFIC_STOPS = `
  <div class="content-block">
    <h4>Supervisor Focus</h4>
    <h2>The traffic stop is the most common report you review — and the most common place a suppression motion or a civil complaint is born.</h2>
    <p>Your officers run more traffic stops than any other contact, which makes the traffic-stop report the highest-volume thing you review and the most frequent source of suppression motions and citizen complaints. Review it for two clocks and one camera: how long the stop lasted and what justified each extension; what authority — warrant or consent — the search rested on; and how the officer handled being recorded. Get those right on review and most of your department's Fourth and First Amendment exposure never leaves your desk.</p>
  </div>
  <div class="content-block">
    <h4>The Rodriguez Clock</h4>
    <h2>Read the timeline for the moment the stop's purpose ended.</h2>
    <p>Under Rodriguez v. United States, a stop may not last longer than the time needed to complete its purpose — citation, records checks, documents returned — without independent reasonable suspicion. On review, find the moment the purpose was complete and ask what justified anything after it. The trap is the refusal-to-consent extension: a driver saying "no" to a search is not reasonable suspicion, because exercising a constitutional right cannot be the basis for detention. A report that prolongs a completed stop on a refusal, or stalls for a K9 with no independent suspicion, is a suppression problem you catch before it is filed. Mimms and Wilson let your officers order occupants out as a matter of course — they do not let them hold a finished stop open.</p>
  </div>
  <div class="content-block">
    <h4>The Alexander / Barr Search Review</h4>
    <p>The post-Alexander, post-Barr review is the search-and-seizure standard applied to the roadside: a warrantless vehicle search requires probable cause AND exigent circumstances, and a stopped vehicle with controlled occupants is rarely an exigency. After Barr, odor is a factor in the totality, not standalone probable cause. So when a report shows a warrantless roadside search, confirm both prongs are stated as facts; when it shows a warrant, confirm the affidavit's probable cause is specific. And recognize the officer who secured the vehicle and obtained a warrant rather than searching at the roadside — that is current Pennsylvania law done exactly right, and your review should say so out loud.</p>
  </div>
  <div class="content-block">
    <h4>Reviewing the Affidavit and the Warrant Execution</h4>
    <ul class="key-points">
      <li><strong>Affidavit specificity.</strong> "Detected an odor of marijuana" is a conclusion and the most common suppression vulnerability in vehicle cases. The affidavit must state where the odor was detected, its strength and character, when, and every corroborating observation — after Barr the corroboration is the probable cause, not garnish. Return thin affidavits before they reach the judge.</li>
      <li><strong>Warrant vs. consent.</strong> A warrant-authorized search does not depend on consent, and a driver's objection — "I don't consent" — does not suspend it. Confirm the report proceeded within the warrant's scope and documented the objection verbatim. Where consent was the basis instead, confirm the search stopped if consent was withdrawn.</li>
      <li><strong>Identity investigations.</strong> A plate returning to a warrant subject plus a driver matching the description is reasonable suspicion to investigate under Terry — not probable cause to arrest on the plate alone. Confirm any arrest was built on the investigation, not the registration return.</li>
    </ul>
  </div>
  <div class="content-block">
    <h4>The Camera Is a Supervisory Issue Too</h4>
    <h2>A pretextual "officer safety" order is one a reviewer can see through — and so can a jury.</h2>
    <p>Under Fields v. City of Philadelphia, the First Amendment protects recording police performing official duties in public. On review and in the field, watch for the recording objection dressed up as an "officer safety" order — courts look to the actual motivation, and so should you. If a report orders a bystander or passenger to stop filming, or returns them to a vehicle on a safety rationale the body-camera footage contradicts, that is a constitutional and complaint exposure you address directly. Teach your officers the line: a genuine safety concern about someone outside a vehicle is documented and real; the camera is not the concern, and their professional conduct is the answer to it.</p>
  </div>
  <div class="content-block">
    <h4>Patterns and the Disparity Question</h4>
    <p>Traffic enforcement is where patterns matter most to public trust. Across your officers' stops you can see what no single stop shows: who is getting extended detentions and consent-search requests, whether "odor" is doing too much work in one officer's reports, whether refusals are quietly becoming reasons to prolong. Review for those patterns, correct the documentation habits that produce suppression, and keep the stop data clean — because in traffic enforcement the aggregate is the story the department will someday have to answer for, and you are the first person positioned to see it.</p>
  </div>
`;

function getTrafficStopSupervisorQuestions() {
  return [
    {
      scenario: 'A traffic-stop report shows the officer completed the citation and records check and had the documents ready to return, then held the driver and asked for consent to search. The driver refused. The officer kept the driver detained while waiting for a K9, with no other articulated basis.',
      text: 'What is the correct supervisory assessment?',
      options: [
        'Approve it — officers may always hold a vehicle for a K9 once they suspect drugs.',
        'Flag it as a suppression problem: under Rodriguez v. United States the stop could not be extended past its completed purpose without independent reasonable suspicion, and refusal to consent is not reasonable suspicion.',
        'Approve it because the driver\'s refusal to consent is itself suspicious.',
        'Approve it as long as the K9 ultimately alerted.'
      ],
      correct: 1,
      feedback: 'Correct. Rodriguez v. United States (2015) bars extending a stop beyond the time needed to complete its purpose without independent reasonable suspicion. The purpose was complete when the documents were ready to return, and a refusal to consent cannot supply reasonable suspicion. Holding the driver for a K9 on that basis is an unlawful extension you catch on review.'
    },
    {
      scenario: 'A report articulates, as part of the basis for prolonging a stop, that "the driver refused to consent to a search, which heightened the officer\'s suspicion."',
      text: 'How should you treat that articulation?',
      options: [
        'Accept it — a refusal to consent is a reasonable factor to weigh.',
        'Reject it: exercising a constitutional right cannot be the basis for detention, so a refusal to consent is not reasonable suspicion and cannot justify extending the stop. The extension is unlawful absent independent articulable facts.',
        'Accept it if the officer also noted the driver seemed nervous.',
        'Accept it because the driver could have consented if he had nothing to hide.'
      ],
      correct: 1,
      feedback: 'Correct. A refusal to consent is the exercise of a right and cannot be used as reasonable suspicion or as a reason to prolong a stop. A report that leans on the refusal to justify an extension documents its own Fourth Amendment problem — the reviewer flags it.'
    },
    {
      scenario: 'A report shows the officer developed probable cause during a stop, then — with the vehicle stopped and occupants controlled — secured the vehicle and obtained a search warrant rather than searching at the roadside.',
      text: 'How should you assess this on review?',
      options: [
        'Mark it inefficient — the officer should have searched immediately to save time.',
        'Recognize it as exactly correct under current Pennsylvania law: Commonwealth v. Alexander requires probable cause and exigent circumstances for a warrantless vehicle search, a controlled scene is rarely exigent, and the warrant is the default — acknowledge the officer\'s judgment.',
        'Flag it because obtaining a warrant suggests the probable cause was weak.',
        'Require the officer to justify why no exigency existed before approving.'
      ],
      correct: 1,
      feedback: 'Correct. Under Commonwealth v. Alexander (2020), a warrantless vehicle search needs both probable cause and exigent circumstances, and a stopped vehicle with controlled occupants rarely supplies exigency. Securing the vehicle and getting a warrant is the model behavior — and recognizing it in review reinforces the habit you want repeated.'
    },
    {
      scenario: 'A warrant affidavit for a vehicle search comes to you for review before it goes to the magisterial district judge. The probable cause section reads, in full: "Upon approaching the vehicle, I detected an odor of marijuana."',
      text: 'What should you do?',
      options: [
        'Forward it — the odor of marijuana is sufficient probable cause for the warrant.',
        'Return it: "detected an odor of marijuana" is a conclusion and the most common suppression vulnerability. After Barr the affidavit must state where the odor was detected, its strength and character, when, and the corroborating observations that complete the probable cause.',
        'Forward it but tell the officer to cite Alexander by name.',
        'Reject the warrant entirely because odor can never support a vehicle search.'
      ],
      correct: 1,
      feedback: 'Correct. A conclusory odor statement is the classic affidavit weakness. Under Commonwealth v. Barr odor is only a factor, so the corroborating facts are the probable cause — the affidavit needs the specific location, strength, timing, and behavioral observations before it goes to the judge.'
    },
    {
      scenario: 'A report states that the officer stopped executing a valid search warrant on a vehicle because the driver objected, saying "I don\'t consent to this search."',
      text: 'How should you handle this on review?',
      options: [
        'Approve it — the driver\'s objection properly suspended the search.',
        'Correct it: a warrant-authorized search does not depend on consent, and an objection does not suspend it. The officer should have proceeded within the warrant\'s scope and documented the objection verbatim — stopping was an error to address.',
        'Approve it but require a new warrant addressing the objection.',
        'Treat the objection as withdrawal of consent that ended the search.'
      ],
      correct: 1,
      feedback: 'Correct. Consent is irrelevant when a warrant is the basis for a search; an objection is relevant context to document, not grounds to stop. The officer should have continued within the warrant\'s scope. The reviewer corrects the misunderstanding so it is not repeated.'
    },
    {
      scenario: 'Body-camera footage shows an officer ordered a bystander on the public sidewalk to stop filming a traffic stop. The officer\'s report characterizes the order as based on "officer safety."',
      text: 'What is the correct supervisory response?',
      options: [
        'Accept the officer-safety rationale at face value and approve the report.',
        'Address it directly: under Fields v. City of Philadelphia the First Amendment protects recording police in public, courts look to the actual motivation, and a recording objection dressed up as "officer safety" — contradicted here by the footage — is a constitutional and complaint exposure.',
        'Approve it because any recording during a stop is a legitimate safety concern.',
        'Take no action unless the bystander files a formal complaint.'
      ],
      correct: 1,
      feedback: 'Correct. Fields v. City of Philadelphia (3d Cir. 2017) protects recording police performing public duties. Where the body-camera footage contradicts a stated "officer safety" rationale for stopping a recording, the pretext is visible to a reviewer and to a court. The supervisor addresses it directly and teaches the line between a genuine safety concern and suppressing a camera.'
    },
    {
      scenario: 'A report documents an arrest whose sole stated basis is that the stopped vehicle\'s plate returned to a subject with a felony warrant — even though the driver presented a license in a different name that came back clean.',
      text: 'What does your review require?',
      options: [
        'Approve it — a vehicle registered to a warrant subject justifies arresting the driver.',
        'Flag it: the plate return plus a matching description is reasonable suspicion to investigate under Terry, not probable cause to arrest. Any arrest must be built on the identity investigation, not the registration return alone.',
        'Approve it because the clean license is probably fraudulent.',
        'Reject the stop entirely as unsupported.'
      ],
      correct: 1,
      feedback: 'Correct. A plate returning to a warrant subject, with a driver matching the description, supports a reasonable-suspicion investigation under Terry — stepping the driver out and resolving identity. Probable cause to arrest must come from that investigation, not from the registration return by itself.'
    },
    {
      scenario: 'Reviewing one officer\'s traffic stops over time, you notice a recurring pattern: stops frequently extended after the citation is complete, repeated consent-search requests, and searches resting heavily on "odor" with little corroboration.',
      text: 'What is your supervisory responsibility?',
      options: [
        'None — each stop is evaluated alone and prior stops are irrelevant.',
        'Review the pattern: correct the documentation and detention habits that produce suppression and complaints, reinforce the Rodriguez and Barr standards, and keep the stop data clean — the aggregate is a public-trust and liability issue you are first positioned to see.',
        'Wait until a suppression motion is granted before addressing anything.',
        'Increase the officer\'s stop quota to improve enforcement numbers.'
      ],
      correct: 1,
      feedback: 'Correct. Traffic enforcement patterns visible only in the aggregate — extended detentions, frequent consent requests, odor-only searches — are exactly what a supervisor is positioned to catch and correct. Addressing the habits upstream prevents suppression and complaints and protects the department on the disparity questions it may later have to answer.'
    },
  ];
}
