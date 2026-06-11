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
      text: 'Under Commonwealth v. Gary and Pennsylvania\'s automobile exception, what does the odor of marijuana establish?',
      options: [
        'Reasonable suspicion to extend the stop and call for a K9.',
        'Probable cause to conduct a warrantless search of the vehicle.',
        'The odor alone is insufficient — you must observe marijuana in plain view.',
        'You must apply for a search warrant before proceeding.'
      ],
      correct: 1,
      feedback: 'Correct. Commonwealth v. Gary (2014) adopted the federal automobile exception in Pennsylvania — probable cause alone supports a warrantless vehicle search without requiring exigent circumstances. Pennsylvania courts have consistently recognized the odor of marijuana emanating from a vehicle as establishing probable cause for a search. Document the specific basis: where detected, strength of the odor, and any corroborating factors. A K9 is not required when the officer independently has probable cause.'
    },
    {
      scenario: 'You are conducting a lawful probable-cause vehicle search. The driver says loudly: "You need a warrant. I don\'t consent to this search."',
      text: 'How does the driver\'s objection affect the legality of your search?',
      options: [
        'The objection requires you to stop and document before proceeding.',
        'The objection is a valid invocation of Fourth Amendment rights that suspends the search.',
        'The objection is irrelevant — probable cause under the automobile exception is not consent-based.',
        'You must inform him of your legal basis before continuing.'
      ],
      correct: 2,
      feedback: 'Correct. The automobile exception is not consent-based. When you have probable cause under Commonwealth v. Gary, consent is irrelevant and an objection does not vitiate the legal basis for the search. The driver\'s statement should be documented verbatim in your report — it is relevant context — but it does not alter the lawfulness of the search. Stopping a lawful probable-cause search because a subject objects is a legal error. If he physically interferes, that is a separate criminal matter.'
    },
    {
      scenario: 'You are preparing your report for a vehicle search conducted on probable cause based on the odor of marijuana. Your draft currently reads: "Upon approaching the vehicle, I detected an odor of marijuana."',
      text: 'What is the most significant problem with this probable cause documentation?',
      options: [
        'It does not include the driver\'s response to the search.',
        'It is a conclusion without the specific, articulable facts that support it — insufficient for a suppression hearing.',
        'It does not specify which officer detected the odor.',
        'It must reference Commonwealth v. Gary by name to be legally sufficient.'
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
