══════════════════════════════════════════ */
const SCENARIO_VEHICLE_PURSUITS = {
  id: 'scenario-pursuits',
  title: 'Route 29 / Swamp Creek Road — Pursuit Decision',
  location: 'Route 29, Marlborough Township, PA',
  totalDecisions: 3,
  nodes: {
    'start': {
      type: 'scene', time: '01:14', weather: 'Overcast / 47°F', unit: 'Patrol Unit 1',
      narrative: [
        'You initiate a traffic stop on Route 29 for a vehicle traveling 72 mph in a 45 zone. The vehicle — a dark blue Honda Accord — slows and pulls partially toward the shoulder, then accelerates rapidly, running through a red light at the Swamp Creek Road intersection and continuing southbound.',
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
      situation: 'The pursuit has continued for approximately 90 seconds. The vehicle has taken a turn onto a residential road — Magazine Road. Speeds are now 55 mph on a 25 mph residential street. A second patrol unit has caught up and is now positioned two car lengths behind you, making this a two-unit pursuit. Dispatch has run the plate — it returns to a Marcus Webb, 23, with a suspended license. No felony warrants. Your supervisor comes over the radio and asks for your recommendation to continue or terminate.\n\nA third patrol unit is requesting to join from the opposite end of Magazine Road.',
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

function getVehiclePursuitQuestions() {
  return [
    {
      scenario: 'You initiate a traffic stop for a broken taillight. The driver accelerates away. Within the first 30 seconds of pursuit, what is your required immediate action under MTPD ALO 4.02?',
      text: 'What must you do immediately upon initiating a vehicle pursuit?',
      options: [
        'Notify your backup unit and pursue until they arrive to establish a two-unit formation.',
        'Immediately notify communications of: your unit, the nature of the offense, direction and approximate speed, and vehicle description — and request supervisor authorization.',
        'Pursue until the vehicle is identified, then reassess based on the offense.',
        'Contact dispatch only if the pursuit extends beyond your patrol sector.'
      ],
      correct: 1,
      feedback: 'Correct. MTPD ALO 4.02 requires immediate notification to communications upon initiating a pursuit, including your unit, nature of the offense, direction of travel, approximate speed, and vehicle description. Supervisor notification and authorization are required. This communication obligation is not optional and is not contingent on how long the pursuit lasts — it applies from the moment a vehicle fails to stop.'
    },
    {
      scenario: 'A pursuit is ongoing. You are the primary unit. A second patrol unit requests to join the pursuit, and a third unit is positioning to cut off the suspect ahead.',
      text: 'Under MTPD ALO 4.02, what is the maximum number of patrol units permitted to participate in a vehicle pursuit?',
      options: [
        'No limit — additional units improve safety through containment.',
        'Three units — primary, secondary, and one interdiction unit.',
        'Two units maximum — any additional patrol units shall not join the pursuit.',
        'Determined by supervisor discretion at the time of the pursuit.'
      ],
      correct: 2,
      feedback: 'Correct. MTPD ALO 4.02 sets a hard limit of two patrol units in any vehicle pursuit. A third unit may not join the pursuit regardless of operational rationale. If road interdiction is needed, stop sticks are the authorized tactical option — deployed by a unit not actively in pursuit, with supervisor authorization. "Additional units improve safety" is not an exception to the two-unit maximum.'
    },
    {
      scenario: 'A pursuit has been ongoing for two minutes. Dispatch confirms the suspect\'s identity as David Carr, 24, wanted on a misdemeanor bench warrant for failure to appear. Road conditions are wet. The suspect has entered a residential neighborhood at approximately 50 mph.',
      text: 'Which of the following best describes the correct termination analysis under MTPD ALO 4.02?',
      options: [
        'Continue — a bench warrant confirms the subject has failed to comply with the courts, justifying pursuit.',
        'Continue — the suspect\'s identity is not yet 100% confirmed from visual ID, only from plate.',
        'Terminate — when the suspect\'s identity is known and arrest can be accomplished by other means, combined with dangerous road conditions, the factors support termination.',
        'Termination requires supervisor order. An officer cannot unilaterally recommend termination.'
      ],
      correct: 2,
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
        'A pursuit report must be completed. The supervisor is required to complete a Pursuit Review Form within 24 hours of any pursuit.',
        'Submit a Use of Force Report since the pursuit involved emergency equipment.'
      ],
      correct: 2,
      feedback: 'Correct. MTPD ALO 4.02 requires documentation of every pursuit — whether it results in apprehension or termination. The supervisor is required to complete a Pursuit Review Form within 24 hours. The officer documents: basis for initiation, notifications made, time and basis of termination, last known location, and suspect identity if known. All pursuit reports are reviewed at the command level. Documentation of a terminated pursuit is not optional — termination is a tactical decision that must be as thoroughly documented as any other use of police authority.'
    },
    {
      scenario: 'During a pursuit, a second officer joins without being directed to do so by dispatch or the supervisor. The primary unit does not object.',
      text: 'What does MTPD ALO 4.02 require regarding additional pursuit units?',
      options: [
        'Any officer who observes a pursuit may join — it is a tactical decision made in the field.',
        'The supervisor controls the number of units in a pursuit. Additional units require supervisor authorization, and the two-unit maximum applies regardless of officer initiative.',
        'A second unit may join automatically — ALO 4.02 permits two units.',
        'Additional units are allowed if the suspect is believed to be armed.'
      ],
      correct: 1,
      feedback: 'Correct. MTPD ALO 4.02 caps pursuit units at two and requires supervisor control over pursuit decisions, including unit count. A third officer joining on their own initiative violates policy regardless of the suspect\'s behavior or the primary unit\'s silence. The supervisor may authorize a second unit — but that authorization must exist. Document any unauthorized joining and notify the supervisor immediately.'
    },
    {
      scenario: 'You are the primary pursuit unit. The suspect enters a school zone during active school hours.',
      text: 'Under ALO 4.02, what does this circumstance require?',
      options: [
        'Continue the pursuit but reduce speed to match the school zone limit.',
        'Immediately notify dispatch and the supervisor. The school zone during active hours is a mandatory termination factor — the pursuit must be discontinued.',
        'Continue the pursuit at normal speed — school hours do not affect pursuit authority.',
        'Terminate only if school children are visible in the area.'
      ],
      correct: 1,
      feedback: 'Correct. MTPD ALO 4.02 lists specific mandatory termination factors — circumstances under which the pursuit must end regardless of the suspect\'s offense. An active school zone during school hours is among the highest-risk environments and triggers mandatory termination. Notify dispatch and your supervisor immediately, document the termination reason, and shift to investigative follow-up. The risk to children and civilians outweighs the apprehension interest in virtually all circumstances.'
    },
    {
      scenario: 'A pursuit is terminated by supervisor order. The suspect is seen exiting the vehicle two blocks ahead and running into a residential area.',
      text: 'What are your obligations immediately after pursuit termination?',
      options: [
        'Continue following on foot — the termination order applied to the vehicle pursuit only.',
        'Stop your vehicle, document the suspect\'s last known location, description, and direction of travel, broadcast to dispatch, and await further direction from the supervisor.',
        'The case is effectively closed once the pursuit is terminated — document the termination and clear.',
        'Begin a foot pursuit independently — supervisor authority does not extend to foot pursuit decisions.'
      ],
      correct: 1,
      feedback: 'Correct. Pursuit termination ends the vehicle pursuit. Your immediate obligations are: stop your vehicle safely, document the suspect\'s last known description, position, and direction of flight, and broadcast to dispatch. The supervisor then directs next steps — which may include perimeter establishment, K9, or area canvass. Initiating a unilateral foot pursuit into a residential area following a vehicle pursuit termination raises independent safety and policy concerns that require supervisor direction.'
    },
  ];
}

