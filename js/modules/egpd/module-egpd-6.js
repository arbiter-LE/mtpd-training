/* ══════════════════════════════════════════
   READING — Motor Vehicle Pursuits (EGPD)
══════════════════════════════════════════ */
const READING_VEHICLE_PURSUITS = `
  <div class="content-block">
    <h4>Scenario</h4>
    <h2>A sedan with an expired registration accelerates away from your stop near Main St &amp; 6th St at 0114 hours. Whether you may pursue is not a judgment call — the department's Motor Vehicle Pursuits Directive has already decided it.</h2>
    <p>This module covers the directive's offense threshold, the Pursuit Decision-Making Matrix, unit responsibilities, and the regulations that govern every pursuit from initiation to termination.</p>
  </div>
  <div class="content-block">
    <h4>The Offense Threshold</h4>
    <h2>Pursuit is reserved for forcible felonies and deadly-weapon escapes.</h2>
    <div class="sop-box">
      <div class="sop-title">Motor Vehicle Pursuits Directive — Purpose</div>
      <p>"The offense for which the vehicle is being pursued must constitute the commission of, or attempt to commit, a forcible felony against a person, or the offender is attempting to escape and possesses a deadly weapon, or otherwise indicates that he/she will endanger human life or inflict serious bodily injury unless arrested without delay." And the governing priority: "While police officers are to make reasonable efforts to apprehend the drivers and occupants of fleeing vehicles, the safety of the public and persons involved in the pursuit is the most important priority."</p>
    </div>
    <p>The directive defines a <strong>forcible felony</strong> as "the crimes of murder, voluntary manslaughter, rape, robbery, kidnapping (except parental kidnapping not involving force), involuntary deviate sexual intercourse, arson endangering persons, aggravated assault causing serious bodily injury." Fleeing a lawful stop does not, by itself, elevate the offense level — an equipment violation plus flight is still a summary-level matter.</p>
  </div>
  <div class="content-block">
    <h4>The Pursuit Decision-Making Matrix</h4>
    <h2>For misdemeanors and infractions, the answer is the same at every risk level.</h2>
    <ul class="key-points">
      <li><strong>Forcible Felony — Imminent Threat:</strong> "May pursue: continue to assess risks" at Low and Moderate risk. At High risk: "May pursue: discontinue if risks exceed known threat to public safety if capture is delayed."</li>
      <li><strong>Felony — Property:</strong> "Do not pursue, or terminate" — at every risk level.</li>
      <li><strong>Misdemeanors:</strong> "Do not pursue, or terminate" at Low and Moderate; "Do not pursue" at High.</li>
      <li><strong>Infractions (Summary):</strong> "Do not pursue, or terminate" at Low and Moderate; "Do not pursue" at High.</li>
    </ul>
    <p>There is no "continue briefly to assess" category for misdemeanors and infractions. If new information later establishes a forcible felony or a deadly-weapon indicator, that is a new pursuit decision made at that time, on its own facts — each decision is evaluated on what is known when it is made. Officers weigh the directive's criteria continuously: safety risk, seriousness of the offense, potential for harm if the suspect escapes, road and weather conditions, vehicle type, time of day, distance and duration, location (residential areas, parks, school zones), the likelihood of later identification, and officer experience. "Participation in a motor vehicle pursuit does not relieve police officers from the statutory duty to drive with due regard for the safety of all persons."</p>
  </div>
  <div class="content-block">
    <h4>Responsibilities</h4>
    <h2>The primary unit owns the information flow.</h2>
    <ul class="key-points">
      <li><strong>Initiating officer (primary unit)</strong> shall provide the dispatcher: "location and direction of travel; description of the fleeing vehicle and occupant(s) if possible; reason for the motor vehicle pursuit including the seriousness of the offenses involved; information which would aid in the apprehension"; and "any information which would be useful in evaluating the risks." The primary unit updates dispatch on progress and requests additional units. An unmarked vehicle relinquishes the pursuit to a marked unit as soon as prudent; every pursuing vehicle uses functioning emergency lights and siren.</li>
      <li><strong>Secondary unit</strong> assists, notifies dispatch when joining, relays information if the primary cannot, and "shall not pass the primary unit unless directed to do so."</li>
      <li><strong>Communications Center</strong> clears the primary frequency with a tone alert, notifies the shift supervisor, notifies adjacent jurisdictions the pursuit may enter, keeps a written record, and runs CLEAN/NCIC checks on the suspect vehicle.</li>
      <li><strong>Field supervisor</strong> monitors by radio, ensures compliance with the directive and the matrix, orders termination when continuation would not be reasonable or prudent, and terminates East Greenville participation in another jurisdiction's pursuit when the criteria require it.</li>
    </ul>
  </div>
  <div class="content-block">
    <h4>Vehicle Pursuit Regulations</h4>
    <h2>The rules that end pursuits — and the ones that prohibit ending them by force.</h2>
    <ul class="key-points">
      <li><strong>Regulation 1:</strong> Any officer terminates "when the hazardous condition caused by the events surrounding the pursuit outweighs the need to apprehend the fleeing vehicle."</li>
      <li><strong>Regulations 2–4:</strong> Terminate on loss of radio communications; when sight of the offender is lost for more than a brief period; and "when sufficient information has been obtained to identify and apprehend the offender later."</li>
      <li><strong>Regulation 5:</strong> "Disciplinary action will not be taken against police personnel for deciding to terminate a pursuit."</li>
      <li><strong>Regulations 6–7:</strong> All officers immediately terminate on a supervisor's direction — and the decision to terminate "shall be immediately and clearly communicated to the dispatcher via the Montgomery County Department of Emergency Communications Police Radio System."</li>
      <li><strong>Regulation 8:</strong> "The discharge of firearms from a moving vehicle during a motor vehicle pursuit is strictly prohibited, EXCEPT as the ultimate measure of self-defense or defense of another, when the suspect is employing deadly force." A weapon displayed but not fired does not meet this standard.</li>
      <li><strong>Regulation 9:</strong> Discharging firearms at moving vehicles, "ramming or other intervention constituting vehicular contact" (including PIT), and "roadblocks or other roadway obstacles" involve deadly force, are regulated by 18 PA C.S.A. § 508 and General Orders 1.3.1/1.3.2, and "are strictly prohibited, unless and only if deadly force is authorized."</li>
      <li><strong>Regulation 10:</strong> SUVs and vehicles not pursuit-rated, and vehicles transporting non-sworn persons, shall not become directly involved.</li>
      <li><strong>Regulation 11:</strong> "Unless otherwise approved by a supervisor the pursuit shall consist of the primary and secondary unit only. Other police units should be responding and positioning themselves as to monitor escape routes, and channel (not block) the pursuit." Offense severity does not create an exception — only supervisor approval does.</li>
      <li><strong>Regulations 13–16:</strong> Pursuits originating from traffic infractions or misdemeanors are terminated as soon as possible; ensure medical assistance to anyone injured; never pursue the wrong direction on a limited-access highway; communicate with neighboring jurisdictions a pursuit may enter.</li>
      <li><strong>Regulation 17:</strong> "Pursuits originating outside East Greenville and entering East Greenville shall not be joined or continued by East Greenville Police Officers." The supervisor/OIC requests information and determines what assistance is to be provided.</li>
    </ul>
    <button class="btn-launch" onclick="startScenario('egpd-vehicle-pursuits')">Proceed to Scenario Exercise →</button>
  </div>
`;

/* ══════════════════════════════════════════
   SCENARIO — Motor Vehicle Pursuits (EGPD)
══════════════════════════════════════════ */
const SCENARIO_VEHICLE_PURSUITS = {
  id: 'scenario-pursuits',
  title: 'Main Street — Pursuit Decision',
  location: 'Main St & 6th St, East Greenville Borough, PA',
  totalDecisions: 3,
  nodes: {
    'start': {
      type: 'scene', time: '01:14', weather: 'Overcast / 47°F', unit: 'Patrol Unit 1',
      narrative: [
        'You attempt a traffic stop near Main St & 6th St on a sedan with an expired registration. The vehicle slows, then accelerates away westbound on Main Street, running the stop sign at Main St & 2nd St.',
        'You activate your emergency lights and siren and advise dispatch. The time is 0114 hours. There is light traffic. You have a partial plate. You have no information indicating the vehicle is connected to any other crime — at this point, the only known offense is the expired registration and now fleeing a traffic stop.'
      ],
      next: 'd1'
    },
    'd1': {
      type: 'decision',
      decisionNumber: 1,
      situation: 'The vehicle is now two blocks ahead, continuing west on Main Street at roughly 50 mph in a 25 mph zone. The only known offenses are an equipment violation (expired registration) and fleeing a traffic stop — both summary-level matters. No information suggests the occupants are armed or have committed a forcible felony. Residential side streets are ahead.',
      question: 'Applying the Pursuit Decision-Making Matrix, what is your correct course of action?',
      options: [
        {
          text: 'Continue the pursuit — fleeing from a lawful stop justifies continued pursuit regardless of the underlying offense.',
          shortLabel: 'Continue pursuit aggressively',
          quality: 'bad',
          next: 'c1-bad'
        },
        {
          text: 'Continue briefly while you assess whether the vehicle is connected to a more serious offense, then decide.',
          shortLabel: 'Continue briefly to assess',
          quality: 'risky',
          next: 'c1-neutral'
        },
        {
          text: 'Do not pursue — terminate now. The known offenses are summary/equipment-level matters, and the Pursuit Decision-Making Matrix directs "do not pursue, or terminate" for infractions and misdemeanors regardless of risk level.',
          shortLabel: 'Terminate — infraction-level offense',
          quality: 'good',
          next: 'c1-good'
        }
      ]
    },
    'c1-bad': {
      type: 'consequence',
      outcomeClass: 'outcome-bad',
      outcomeLabel: 'Policy Violation',
      heading: 'A pursuit at this offense level is not authorized.',
      narrative: [
        'The Motor Vehicle Pursuits Directive states that the offense for which a vehicle is pursued "must constitute the commission of, or attempt to commit, a forcible felony against a person, or the offender is attempting to escape and possesses a deadly weapon, or otherwise indicates that he/she will endanger human life or inflict serious bodily injury unless arrested without delay."',
        'An expired registration and fleeing a traffic stop satisfy none of these conditions. The Pursuit Decision-Making Matrix is explicit: for Misdemeanors and Infractions (Summary), the directive at every risk level — Low, Moderate, and High — reads "Do not pursue, or terminate."',
        '"Fleeing a lawful stop" does not, by itself, elevate the offense level. Continuing this pursuit through residential side streets at 50 mph for an equipment violation is the exact scenario the matrix is designed to prevent.'
      ],
      legal: 'Motor Vehicle Pursuits Directive: pursuit requires a forcible felony, or an offender attempting to escape who possesses a deadly weapon or otherwise indicates he/she will endanger life or inflict serious bodily injury. Pursuit Decision-Making Matrix: Misdemeanors and Infractions — "Do not pursue, or terminate" at Low, Moderate, and High risk.',
      next: 'd2'
    },
    'c1-good': {
      type: 'consequence',
      outcomeClass: 'outcome-good',
      outcomeLabel: 'Correct Application',
      heading: 'Termination is required at this offense level.',
      narrative: [
        'You discontinue the pursuit. The Pursuit Decision-Making Matrix directs "do not pursue, or terminate" for Misdemeanors and Infractions (Summary) at every level of risk — Low, Moderate, and High. An expired registration and fleeing a traffic stop do not meet the directive\'s threshold for initiating or continuing a pursuit, which requires a forcible felony or an indication the offender will endanger life or inflict serious bodily injury.',
        'You notify dispatch that you are terminating, broadcast the vehicle description, direction of travel, and partial plate, and clearly communicate the termination via the Montgomery County Department of Emergency Communications Police Radio System.',
        'You are not finished — you can still run the partial plate, canvass the area, and follow up. But the pursuit itself ends here.'
      ],
      legal: 'Pursuit Decision-Making Matrix: Misdemeanors/Infractions — "Do not pursue, or terminate." Vehicle Pursuit Regulation 7: when a pursuit is terminated, the decision shall be immediately and clearly communicated to the dispatcher via the Montgomery County Department of Emergency Communications Police Radio System.',
      next: 'd2'
    },
    'c1-neutral': {
      type: 'consequence',
      outcomeClass: 'outcome-neutral',
      outcomeLabel: 'Policy Violation — Delayed',
      heading: '"Continue while assessing" is still a pursuit at an offense level that does not permit one.',
      narrative: [
        'The Pursuit Decision-Making Matrix does not include a "continue briefly to assess" category for infractions and misdemeanors — at every risk level, the directive is "do not pursue, or terminate."',
        'Every additional second of pursuit at 50 mph through a residential area, for an offense that does not meet the directive\'s threshold, is itself a violation — regardless of what you find out afterward.',
        'If new information later establishes a forcible felony or a deadly-weapon indicator, that is a new pursuit decision, made at that time, on its own facts — not a justification for continuing past the point the matrix already required termination.'
      ],
      legal: 'Pursuit Decision-Making Matrix: for Misdemeanors and Infractions, the directive is "do not pursue, or terminate" at all risk levels — there is no provision for continuing pending further information.',
      next: 'd2'
    },
    'd2': {
      type: 'decision',
      decisionNumber: 2,
      situation: 'You terminate and broadcast the vehicle description and partial plate. Two minutes later, dispatch advises that a vehicle matching your description was just used in an armed robbery of a store on Washington St — the suspect displayed a handgun. The vehicle is now back in view, westbound on Main Street. You re-establish contact and the vehicle accelerates away again. A second patrol unit falls in behind you as the secondary unit. A third unit, off-duty and on its own initiative, asks to join from the opposite direction.',
      question: 'What is your decision now, and how do you handle the third unit?',
      options: [
        {
          text: 'Initiate the pursuit — armed robbery is a forcible felony and the suspect is known to possess a deadly weapon. Allow the third unit to join given the severity of the offense.',
          shortLabel: 'Pursue, allow third unit due to severity',
          quality: 'bad',
          next: 'c2-bad'
        },
        {
          text: 'Initiate the pursuit — armed robbery with a displayed handgun meets the directive\'s criteria. Notify dispatch with location, direction, vehicle/occupant description, and the reason for the pursuit. The pursuit shall consist of the primary and secondary unit only — direct the third unit to a position to monitor escape routes, not to join.',
          shortLabel: 'Pursue, primary + secondary only',
          quality: 'good',
          next: 'c2-good'
        },
        {
          text: 'Decline to pursue — you already terminated once, and re-engaging could be seen as inconsistent.',
          shortLabel: 'Decline to re-engage',
          quality: 'risky',
          next: 'c2-neutral'
        }
      ]
    },
    'c2-bad': {
      type: 'consequence',
      outcomeClass: 'outcome-bad',
      outcomeLabel: 'Policy Violation — Third Unit',
      heading: 'The pursuit is justified. The third unit is not.',
      narrative: [
        'Initiating the pursuit is correct: armed robbery is a forcible felony, and the suspect has displayed a handgun — both conditions the directive requires before a pursuit may be initiated.',
        'But Vehicle Pursuit Regulation 11 is explicit: "Unless otherwise approved by a supervisor the pursuit shall consist of the primary and secondary unit only. Other police units should be responding and positioning themselves as to monitor escape routes, and channel (not block) the pursuit." Severity of the underlying offense does not create an exception — only supervisor approval does.',
        'A third unit joining without that approval, on its own initiative, is a regulation violation regardless of how serious the triggering crime is.'
      ],
      legal: 'Vehicle Pursuit Regulation 11: the pursuit shall consist of the primary and secondary unit only, unless otherwise approved by a supervisor. Other units should position to monitor escape routes and channel — not block — the pursuit.',
      next: 'd3'
    },
    'c2-good': {
      type: 'consequence',
      outcomeClass: 'outcome-good',
      outcomeLabel: 'Correct Application',
      heading: 'Pursuit initiated on proper grounds; unit count handled correctly.',
      narrative: [
        'Armed robbery is a forcible felony, and the suspect has displayed a handgun — this satisfies the directive\'s threshold for initiating a pursuit (a forcible felony against a person, with an offender shown to possess a deadly weapon).',
        'As the initiating officer, you provide dispatch with location and direction of travel, a description of the vehicle and occupants, the reason for the pursuit, and any information useful in evaluating risk — as required of the primary unit.',
        'Per Vehicle Pursuit Regulation 11, the pursuit is limited to your unit (primary) and the second patrol unit (secondary) unless a supervisor approves otherwise. The third unit is directed to position itself to monitor escape routes and channel — not block — the pursuit, rather than joining directly.'
      ],
      legal: 'Motor Vehicle Pursuits Directive: pursuit may be initiated for a forcible felony where the offender possesses a deadly weapon. Initiating Officer responsibilities: provide location/direction, vehicle and occupant description, reason for pursuit, and risk-relevant information. Regulation 11: primary and secondary unit only absent supervisor approval; other units monitor escape routes and channel, not block.',
      next: 'd3'
    },
    'c2-neutral': {
      type: 'consequence',
      outcomeClass: 'outcome-neutral',
      outcomeLabel: 'Incorrect — Pursuit Is Justified',
      heading: 'A prior termination does not bar a new pursuit on new facts.',
      narrative: [
        'Each pursuit decision is made on the facts known at that time. Your earlier termination was correct given what you knew then — an equipment violation. The new information (armed robbery, handgun displayed) is an independent basis that satisfies the directive\'s criteria for initiating a pursuit.',
        '"Consistency" with an earlier decision is not a factor the directive asks you to weigh. Declining to act on a forcible-felony-with-deadly-weapon report because you terminated a different pursuit minutes earlier leaves an armed robbery suspect unaddressed.',
        'Re-engage, notify dispatch with the required information, and proceed under Regulation 11\'s primary/secondary unit limits.'
      ],
      legal: 'Motor Vehicle Pursuits Directive: pursuit criteria are evaluated on the facts known at the time of the decision. A forcible felony with a displayed deadly weapon meets the threshold for initiation independent of any prior, unrelated pursuit decision.',
      next: 'd3'
    },
    'd3': {
      type: 'decision',
      decisionNumber: 3,
      situation: 'The pursuit continues west on Main Street toward Washington St. The right-rear window of the suspect vehicle rolls down and the front-seat passenger leans out, pointing a handgun in your direction, but does not fire. Your secondary unit is directly behind you. The road ahead is residential.',
      question: 'What is your response?',
      options: [
        {
          text: 'Attempt a PIT maneuver immediately to disable the vehicle before the passenger can fire.',
          shortLabel: 'Attempt PIT to end the threat',
          quality: 'bad',
          next: 'c3-bad'
        },
        {
          text: 'Discharge your weapon at the suspect vehicle now, while continuing the pursuit, since a firearm has been displayed.',
          shortLabel: 'Discharge firearm at vehicle now',
          quality: 'risky',
          next: 'c3-neutral'
        },
        {
          text: 'Do not discharge your weapon and do not attempt PIT, ramming, or a roadblock — both are strictly prohibited unless deadly force is authorized under 18 PA C.S.A. § 508. Continuously reassess whether the hazard now outweighs the need for apprehension, and be prepared to terminate and communicate that decision immediately to dispatch.',
          shortLabel: 'Hold fire, no PIT — reassess and be ready to terminate',
          quality: 'good',
          next: 'c3-good'
        }
      ]
    },
    'c3-bad': {
      type: 'consequence',
      outcomeClass: 'outcome-bad',
      outcomeLabel: 'Policy Violation',
      heading: 'PIT and ramming are strictly prohibited absent authorized deadly force.',
      narrative: [
        'Vehicle Pursuit Regulation 9 states that "ramming or other intervention constituting vehicular contact" and "roadblocks or other roadway obstacles or obstructions" involve the use or potential use of deadly force, are regulated by 18 PA C.S.A. § 508 and General Department Orders 1.3.1 and 1.3.2, and "are strictly prohibited, unless and only if deadly force is authorized."',
        'A passenger pointing — but not firing — a weapon is a serious escalation that must be communicated immediately, but it does not by itself convert a PIT maneuver into an authorized use of deadly force. That determination is governed by General Order 1.3 and § 508, not by an officer\'s independent decision in the moment to "end the threat" via vehicle contact.',
        'The correct response is to communicate the threat immediately, continuously reassess under Regulation 1, and be prepared to terminate.'
      ],
      legal: 'Vehicle Pursuit Regulation 9: ramming, vehicular contact, and roadblocks are strictly prohibited unless deadly force is authorized under 18 PA C.S.A. § 508 and General Orders 1.3.1/1.3.2.',
      next: 'debrief'
    },
    'c3-good': {
      type: 'consequence',
      outcomeClass: 'outcome-good',
      outcomeLabel: 'Correct Application',
      heading: 'Hold fire, no vehicle contact, continuous reassessment.',
      narrative: [
        'Regulation 8 prohibits the discharge of firearms from a moving vehicle during a pursuit, except as the ultimate measure of self-defense or defense of another when the suspect is employing deadly force. A handgun pointed but not fired has not yet reached that threshold, though it materially changes the risk picture.',
        'Regulation 9 prohibits ramming, vehicular contact, and roadblocks unless deadly force is authorized under 18 PA C.S.A. § 508 and General Orders 1.3.1/1.3.2 — an officer cannot use a PIT maneuver as a substitute for that determination.',
        'You broadcast the weapon display to dispatch and the secondary unit immediately. Per Regulation 1, a motor vehicle pursuit "shall be terminated and discontinued by any police officer when the hazardous condition caused by the events surrounding the pursuit outweighs the need to apprehend the fleeing vehicle." You continue to weigh that balance in real time, and if you terminate, you communicate it clearly per Regulation 7 via the Montgomery County Department of Emergency Communications Police Radio System.'
      ],
      legal: 'Regulation 8: firearm discharge from a moving vehicle prohibited except as ultimate self-defense/defense-of-others against an offender employing deadly force. Regulation 9: ramming/contact/roadblocks prohibited absent authorized deadly force under 18 PA C.S.A. § 508 and GO 1.3.1/1.3.2. Regulation 1: terminate when hazard outweighs need to apprehend. Regulation 7: termination communicated immediately via Montgomery County Dept. of Emergency Communications.',
      next: 'debrief'
    },
    'c3-neutral': {
      type: 'consequence',
      outcomeClass: 'outcome-bad',
      outcomeLabel: 'Policy Violation',
      heading: 'A displayed weapon does not by itself authorize discharging your firearm at the vehicle.',
      narrative: [
        'Regulation 8 prohibits the discharge of firearms from a moving vehicle during a pursuit, with one narrow exception: "as the ultimate measure of self-defense or defense of another, when the suspect is employing deadly force." Pointing a weapon without firing, while a serious threat indicator, has not been described here as the suspect actively employing deadly force against you at this instant.',
        'Discharging a firearm at a moving vehicle on a residential street, based on a display rather than an active attack, creates exactly the risk to officers, occupants, and bystanders that Regulation 8 is written to prevent.',
        'The correct response is to communicate the threat, hold fire absent an actual deadly-force attack, and continuously reassess under Regulation 1 whether the pursuit should be terminated.'
      ],
      legal: 'Vehicle Pursuit Regulation 8: discharge of firearms from a moving vehicle during a pursuit is strictly prohibited except as the ultimate measure of self-defense or defense of another when the suspect is employing deadly force.',
      next: 'debrief'
    },
    'debrief': { type: 'debrief' }
  }
};

function getVehiclePursuitQuestions() {
  return [
    {
      scenario: 'You attempt a traffic stop for a broken taillight. The driver accelerates away. There is no information suggesting any other offense.',
      text: 'Under the Motor Vehicle Pursuits Directive, what offense level is required before a pursuit may be initiated or continued?',
      options: [
        'Any offense — fleeing a lawful stop is itself sufficient grounds for pursuit.',
        'The offense must constitute, or be an attempt to commit, a forcible felony against a person, or the offender must be attempting to escape while possessing a deadly weapon or otherwise indicating they will endanger life or inflict serious bodily injury unless arrested without delay.',
        'Any offense above a summary citation, including misdemeanors of any kind.',
        'The directive does not specify an offense threshold — it is left to officer discretion.'
      ],
      correct: 1,
      feedback: 'Correct. The directive states that the offense for which a vehicle is pursued must constitute the commission of, or attempt to commit, a forcible felony against a person, or the offender must be attempting to escape while possessing a deadly weapon or otherwise indicating he/she will endanger human life or inflict serious bodily injury unless arrested without delay. A broken taillight and flight alone do not meet this threshold.'
    },
    {
      scenario: 'You initiate a pursuit that meets the directive\'s criteria.',
      text: 'As the initiating police officer (primary unit), what information must you provide to the police dispatcher?',
      options: [
        'Only your unit number and that a pursuit is occurring.',
        'Location and direction of travel, a description of the fleeing vehicle and occupants if possible, the reason for the pursuit including the seriousness of the offense, information that would aid apprehension, and any information useful in evaluating the risks of the pursuit.',
        'Only the vehicle description and license plate, once available.',
        'Nothing — the secondary unit is responsible for all dispatcher communication.'
      ],
      correct: 1,
      feedback: 'Correct. The Initiating Police Officer (Primary Unit) shall provide the dispatcher with: location and direction of travel; a description of the fleeing vehicle and occupant(s) if possible; the reason for the pursuit including the seriousness of the offenses involved; information that would aid in apprehension; and any information useful in evaluating the risks or potential risks of the pursuit. The primary unit is also responsible for updating dispatch on the pursuit\'s progress and requesting additional units.'
    },
    {
      scenario: 'A pursuit is in progress. You are the primary unit. A secondary unit has fallen in behind you. A third marked unit, on its own initiative, begins to follow as well.',
      text: 'What do the Vehicle Pursuit Regulations require regarding the number of units in a pursuit?',
      options: [
        'The pursuit shall consist of the primary and secondary unit only, unless otherwise approved by a supervisor — other units should position to monitor escape routes and channel, not block, the pursuit.',
        'Any marked unit may join a pursuit at will, as additional units improve the odds of apprehension.',
        'A maximum of four units may participate, two per direction of travel.',
        'Unit count is unrestricted as long as each unit notifies dispatch before joining.'
      ],
      correct: 0,
      feedback: 'Correct. Vehicle Pursuit Regulation 11 states: "Unless otherwise approved by a supervisor the pursuit shall consist of the primary and secondary unit only. Other police units should be responding and positioning themselves as to monitor escape routes, and channel (not block) the pursuit to assist in limiting the area covered." A third unit joining the active pursuit without supervisor approval violates this regulation.'
    },
    {
      scenario: 'During a pursuit, you identify an opportunity to perform a PIT maneuver or use your vehicle to block the suspect vehicle\'s path.',
      text: 'Under the Vehicle Pursuit Regulations, when are ramming, vehicular contact, or roadblocks permitted?',
      options: [
        'Whenever a supervisor authorizes it, regardless of the underlying offense.',
        'They are strictly prohibited in all circumstances, with no exceptions.',
        'They involve the use or potential use of deadly force under 18 PA C.S.A. § 508 and General Orders 1.3.1/1.3.2, and are strictly prohibited unless and only if deadly force is authorized.',
        'They are permitted at speeds below 25 mph regardless of the offense.'
      ],
      correct: 2,
      feedback: 'Correct. Regulation 9 identifies ramming or other vehicular-contact intervention, and roadblocks or other roadway obstacles, as actions involving the use or potential use of deadly force, regulated by 18 PA C.S.A. § 508 (Use of Force in Law Enforcement) and General Department Orders 1.3.1 and 1.3.2. These actions "are strictly prohibited, unless and only if deadly force is authorized" — they are not a routine pursuit-ending option.'
    },
    {
      scenario: 'During a pursuit, an occupant of the fleeing vehicle displays a firearm but has not fired it.',
      text: 'Under Regulation 8, when may an officer discharge a firearm at a vehicle during a pursuit?',
      options: [
        'Whenever a weapon is visible in the suspect vehicle.',
        'The discharge of firearms from a moving vehicle during a pursuit is strictly prohibited, except as the ultimate measure of self-defense or defense of another when the suspect is employing deadly force.',
        'Only with prior verbal authorization from a supervisor over the radio.',
        'At the discretion of the secondary unit, to support the primary unit.'
      ],
      correct: 1,
      feedback: 'Correct. Regulation 8 states: "The discharge of firearms from a moving vehicle during a motor vehicle pursuit is strictly prohibited, EXCEPT as the ultimate measure of self-defense or defense of another, when the suspect is employing deadly force." A weapon merely being visible or displayed does not, by itself, meet this standard.'
    },
    {
      scenario: 'A pursuit is initiated for a vehicle with a suspended-registration plate after the driver fails to stop. No other offense is known. Road conditions are dry and traffic is light.',
      text: 'Applying the Pursuit Decision-Making Matrix, what is the correct course of action for an offense at the Misdemeanor or Infraction (Summary) level?',
      options: [
        '"May pursue: continue to assess risks," the same as a forcible felony, since road conditions are favorable.',
        '"Do not pursue, or terminate" — this applies at Low, Moderate, and High risk levels for both Misdemeanors and Infractions (Summary).',
        'Pursue only during daylight hours; terminate automatically after dark.',
        'The matrix does not address misdemeanors or infractions — officer discretion controls.'
      ],
      correct: 1,
      feedback: 'Correct. The Pursuit Decision-Making Matrix lists "Do not pursue, or terminate" for Misdemeanors at Low and Moderate risk, and "Do not pursue, or terminate" for Misdemeanors at High risk; the same result applies across all risk levels for Infractions (Summary). Favorable road conditions do not change this — the matrix ties the outcome to the seriousness of the offense, not just the risk level.'
    },
    {
      scenario: 'A vehicle pursuit that began in a neighboring jurisdiction crosses into East Greenville Borough.',
      text: 'Under Vehicle Pursuit Regulation 17, what is the obligation of East Greenville Police Officers regarding this pursuit?',
      options: [
        'East Greenville officers shall immediately join and take over the pursuit since it is now in their jurisdiction.',
        'Pursuits originating outside East Greenville and entering East Greenville shall not be joined or continued by East Greenville Police Officers; the supervisor/OIC shall request information about the pursuit and determine what assistance, if any, is to be provided.',
        'East Greenville officers must establish a roadblock at the borough line to stop the pursuit before it enters.',
        'No action is required or permitted — East Greenville officers must remain uninvolved entirely, including declining requests for information.'
      ],
      correct: 1,
      feedback: 'Correct. Regulation 17 states that pursuits originating outside East Greenville and entering East Greenville shall not be joined or continued by East Greenville Police Officers. The supervisor/OIC shall request information relating to the nature of the pursuit and shall determine what assistance is requested and direct what assistance is to be provided — meaning some coordinated assistance is possible, but East Greenville officers do not join or continue the pursuit itself.'
    },
    {
      scenario: 'A pursuit is terminated by order of the Police Field Supervisor.',
      text: 'Under Vehicle Pursuit Regulation 7, how must the termination be communicated?',
      options: [
        'It does not need to be communicated immediately — it can be noted in the incident report afterward.',
        'The order or decision to terminate shall be immediately and clearly communicated to the dispatcher via the Montgomery County Department of Emergency Communications Police Radio System.',
        'Only the primary unit\'s supervisor needs to be informed, by phone, after the shift ends.',
        'Termination is communicated only if the suspect vehicle is later apprehended by another agency.'
      ],
      correct: 1,
      feedback: 'Correct. Regulation 7 requires that when a pursuit is terminated, the order or decision to terminate "shall be immediately and clearly communicated to the dispatcher via the Montgomery County Department of Emergency Communications Police Radio System." This ensures all units and the Communications Center are aware the pursuit has ended without delay.'
    },
  ];
}
