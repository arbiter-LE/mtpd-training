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
        'Any offense above a summary citation, including misdemeanors of any kind.',
        'The directive does not specify an offense threshold — it is left to officer discretion.',
        'The offense must constitute, or be an attempt to commit, a forcible felony against a person, or the offender must be attempting to escape while possessing a deadly weapon or otherwise indicating they will endanger life or inflict serious bodily injury unless arrested without delay.'
      ],
      correct: 3,
      feedback: 'Correct. The directive states that the offense for which a vehicle is pursued must constitute the commission of, or attempt to commit, a forcible felony against a person, or the offender must be attempting to escape while possessing a deadly weapon or otherwise indicating he/she will endanger human life or inflict serious bodily injury unless arrested without delay. A broken taillight and flight alone do not meet this threshold.'
    },
    {
      scenario: 'You initiate a pursuit that meets the directive\'s criteria.',
      text: 'As the initiating police officer (primary unit), what information must you provide to the police dispatcher?',
      options: [
        'Location and direction of travel, a description of the fleeing vehicle and occupants if possible, the reason for the pursuit including the seriousness of the offense, information that would aid apprehension, and any information useful in evaluating the risks of the pursuit.',
        'Only your unit number and that a pursuit is occurring.',
        'Only the vehicle description and license plate, once available.',
        'Nothing — the secondary unit is responsible for all dispatcher communication.'
      ],
      correct: 0,
      feedback: 'Correct. The Initiating Police Officer (Primary Unit) shall provide the dispatcher with: location and direction of travel; a description of the fleeing vehicle and occupant(s) if possible; the reason for the pursuit including the seriousness of the offenses involved; information that would aid in apprehension; and any information useful in evaluating the risks or potential risks of the pursuit. The primary unit is also responsible for updating dispatch on the pursuit\'s progress and requesting additional units.'
    },
    {
      scenario: 'A pursuit is in progress. You are the primary unit. A secondary unit has fallen in behind you. A third marked unit, on its own initiative, begins to follow as well.',
      text: 'What do the Vehicle Pursuit Regulations require regarding the number of units in a pursuit?',
      options: [
        'Any marked unit may join a pursuit at will, as additional units improve the odds of apprehension.',
        'A maximum of four units may participate, two per direction of travel.',
        'The pursuit shall consist of the primary and secondary unit only, unless otherwise approved by a supervisor — other units should position to monitor escape routes and channel, not block, the pursuit.',
        'Unit count is unrestricted as long as each unit notifies dispatch before joining.'
      ],
      correct: 2,
      feedback: 'Correct. Vehicle Pursuit Regulation 11 states: "Unless otherwise approved by a supervisor the pursuit shall consist of the primary and secondary unit only. Other police units should be responding and positioning themselves as to monitor escape routes, and channel (not block) the pursuit to assist in limiting the area covered." A third unit joining the active pursuit without supervisor approval violates this regulation.'
    },
    {
      scenario: 'During a pursuit, you identify an opportunity to perform a PIT maneuver or use your vehicle to block the suspect vehicle\'s path.',
      text: 'Under the Vehicle Pursuit Regulations, when are ramming, vehicular contact, or roadblocks permitted?',
      options: [
        'Whenever a supervisor authorizes it, regardless of the underlying offense.',
        'They are strictly prohibited in all circumstances, with no exceptions.',
        'They are permitted at speeds below 25 mph regardless of the offense.',
        'They involve the use or potential use of deadly force under 18 PA C.S.A. § 508 and General Orders 1.3.1/1.3.2, and are strictly prohibited unless and only if deadly force is authorized.'
      ],
      correct: 3,
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
        '"Do not pursue, or terminate" — this applies at Low, Moderate, and High risk levels for both Misdemeanors and Infractions (Summary).',
        '"May pursue: continue to assess risks," the same as a forcible felony, since road conditions are favorable.',
        'Pursue only during daylight hours; terminate automatically after dark.',
        'The matrix does not address misdemeanors or infractions — officer discretion controls.'
      ],
      correct: 0,
      feedback: 'Correct. The Pursuit Decision-Making Matrix lists "Do not pursue, or terminate" for Misdemeanors at Low and Moderate risk, and "Do not pursue, or terminate" for Misdemeanors at High risk; the same result applies across all risk levels for Infractions (Summary). Favorable road conditions do not change this — the matrix ties the outcome to the seriousness of the offense, not just the risk level.'
    },
    {
      scenario: 'A vehicle pursuit that began in a neighboring jurisdiction crosses into East Greenville Borough.',
      text: 'Under Vehicle Pursuit Regulation 17, what is the obligation of East Greenville Police Officers regarding this pursuit?',
      options: [
        'East Greenville officers shall immediately join and take over the pursuit since it is now in their jurisdiction.',
        'East Greenville officers must establish a roadblock at the borough line to stop the pursuit before it enters.',
        'Pursuits originating outside East Greenville and entering East Greenville shall not be joined or continued by East Greenville Police Officers; the supervisor/OIC shall request information about the pursuit and determine what assistance, if any, is to be provided.',
        'No action is required or permitted — East Greenville officers must remain uninvolved entirely, including declining requests for information.'
      ],
      correct: 2,
      feedback: 'Correct. Regulation 17 states that pursuits originating outside East Greenville and entering East Greenville shall not be joined or continued by East Greenville Police Officers. The supervisor/OIC shall request information relating to the nature of the pursuit and shall determine what assistance is requested and direct what assistance is to be provided — meaning some coordinated assistance is possible, but East Greenville officers do not join or continue the pursuit itself.'
    },
    {
      scenario: 'A pursuit is terminated by order of the Police Field Supervisor.',
      text: 'Under Vehicle Pursuit Regulation 7, how must the termination be communicated?',
      options: [
        'It does not need to be communicated immediately — it can be noted in the incident report afterward.',
        'Only the primary unit\'s supervisor needs to be informed, by phone, after the shift ends.',
        'Termination is communicated only if the suspect vehicle is later apprehended by another agency.',
        'The order or decision to terminate shall be immediately and clearly communicated to the dispatcher via the Montgomery County Department of Emergency Communications Police Radio System.'
      ],
      correct: 3,
      feedback: 'Correct. Regulation 7 requires that when a pursuit is terminated, the order or decision to terminate "shall be immediately and clearly communicated to the dispatcher via the Montgomery County Department of Emergency Communications Police Radio System." This ensures all units and the Communications Center are aware the pursuit has ended without delay.'
    },
  ];
}

/* ══════════════════════════════════════════
   SUPERVISOR OVERLAY — Motor Vehicle Pursuits (EGPD)
   The field supervisor is a named, real-time role in the
   directive — a live control on the event, not a later reviewer.
══════════════════════════════════════════ */
const SUPERVISOR_VEHICLE_PURSUITS = `
  <div class="content-block">
    <h4>Supervisor Focus</h4>
    <h2>In a pursuit the directive names you. The field supervisor is a live control on the event — not a reviewer after the fact.</h2>
    <p>Most of your supervisory work is review. A pursuit is different: the Motor Vehicle Pursuits Directive makes the field supervisor a participant in real time — monitoring by radio, ensuring compliance with the directive and the matrix, and ordering termination when continuation is no longer reasonable or prudent. The officer in the car has tunnel vision by design; you have the radio, the whole board, and the authority to end it. The priority the directive sets — "the safety of the public and persons involved in the pursuit is the most important priority" — is yours to enforce in the exact moment the officer's adrenaline is arguing the other way.</p>
  </div>
  <div class="content-block">
    <h4>Monitor Against the Matrix — Out Loud, in Real Time</h4>
    <h2>Your first question is always the offense level.</h2>
    <p>The matrix decides most pursuits before judgment enters: for misdemeanors and infractions the answer is "do not pursue, or terminate" at every risk level, and a pursuit may be initiated or continued only for a forcible felony, or an offender escaping who possesses a deadly weapon or otherwise indicates he will endanger life. As you monitor, the offense level is your first question — and "fleeing a lawful stop" does not elevate it. An equipment violation plus flight is still a summary matter, and a pursuit running on that is one you terminate, not one you wait out. If new information later establishes a forcible felony, that is a new decision on its own facts; it never retroactively justifies the seconds that preceded it.</p>
  </div>
  <div class="content-block">
    <h4>Termination Is Your Call — and It Is Protected</h4>
    <p>The directive gives you the termination authority and removes the disincentive to use it. Regulation 1: any officer terminates when the hazard outweighs the need to apprehend. Regulation 5: "disciplinary action will not be taken against police personnel for deciding to terminate a pursuit." Regulation 6: all officers immediately terminate on a supervisor's direction. Read together: you are expected to terminate when the balance tips, your officers are protected for doing so on their own, and your order ends it for everyone. When you order a termination it "shall be immediately and clearly communicated to the dispatcher via the Montgomery County Department of Emergency Communications Police Radio System" (Regulation 7) — confirm it was acknowledged, not merely transmitted.</p>
  </div>
  <div class="content-block">
    <h4>The Control Points Only You Hold</h4>
    <ul class="key-points">
      <li><strong>Unit count (Regulation 11).</strong> The pursuit is primary and secondary only unless you approve otherwise. Severity of the offense does not expand it — only your approval does. A unit joining on its own initiative is yours to redirect to monitor escape routes and channel (not block) the pursuit.</li>
      <li><strong>Deadly-force interventions (Regulations 8 and 9).</strong> Firearm discharge from a moving vehicle, PIT, ramming, and roadblocks are deadly force under 18 PA C.S.A. § 508 and General Orders 1.3.1/1.3.2 — strictly prohibited unless deadly force is authorized. An officer cannot self-authorize a PIT to "end the threat"; a displayed-but-not-fired weapon is not an active deadly-force attack, and that determination runs through § 508 and GO 1.3.</li>
      <li><strong>Outside pursuits (Regulation 17).</strong> A pursuit entering East Greenville from another jurisdiction "shall not be joined or continued" by your officers. The supervisor/OIC requests information and determines what assistance, if any, is provided — that decision is yours, not the responding officer's.</li>
      <li><strong>Vehicle and occupant limits (Regulation 10).</strong> Non-pursuit-rated vehicles and any vehicle carrying non-sworn passengers do not become directly involved. Watch the board for who is actually rolling.</li>
    </ul>
  </div>
  <div class="content-block">
    <h4>Manage the Board, Not Just the Chase</h4>
    <p>The primary unit owns the information flow; you own the picture around it. Make sure the Communications Center clears the frequency with a tone alert, notifies adjacent jurisdictions the pursuit may enter, runs CLEAN/NCIC on the suspect vehicle, and keeps the written record — and that units are positioned to channel escape routes rather than stack up behind the primary. Your role is to keep the response proportionate and contained: channel, not block; monitor, not swarm — so the apprehension never costs more than the offense is worth.</p>
  </div>
  <div class="content-block">
    <h4>After the Pursuit — Review, and the Culture You Protect</h4>
    <p>When it ends, the review is yours too. Was the offense threshold actually met at initiation? Did the unit count stay within Regulation 11 or your approval? Were any prohibited interventions used, and were they authorized through § 508 and GO 1.3 if so? Then reinforce the culture Regulation 5 was written to protect: an officer who terminated a pursuit that was slipping past the matrix made the right call, and your debrief should say so plainly. What you praise — disciplined termination, not merely a successful apprehension — is what your officers will reach for on the next one.</p>
  </div>
`;

function getVehiclePursuitSupervisorQuestions() {
  return [
    {
      scenario: 'A pursuit has just been called out over the radio. You are the field supervisor on duty.',
      text: 'Under the Motor Vehicle Pursuits Directive, what is your role?',
      options: [
        'To be a live control on the event: monitor by radio, ensure compliance with the directive and the Pursuit Decision-Making Matrix, and order termination when continuation is no longer reasonable or prudent.',
        'To review the pursuit paperwork after the incident concludes; the supervisor has no role during the pursuit itself.',
        'To take over as the primary unit so the most senior officer is leading the chase.',
        'To stay off the radio so the primary unit\'s transmissions are not interrupted.'
      ],
      correct: 0,
      feedback: 'Correct. The directive makes the field supervisor a real-time participant: monitoring by radio, ensuring compliance with the directive and the matrix, and ordering termination when continuation would not be reasonable or prudent. The officer in the car has tunnel vision; the supervisor has the whole board and the authority to end the pursuit.'
    },
    {
      scenario: 'You are monitoring a pursuit by radio. The primary unit reports the only known offenses are an expired registration and fleeing the stop. The vehicle is running through residential streets at high speed.',
      text: 'What should you do?',
      options: [
        'Let it continue — the driver\'s decision to flee elevates the matter and justifies the pursuit.',
        'Wait to see whether the vehicle is connected to a more serious crime before deciding.',
        'Authorize additional units to help end the pursuit faster.',
        'Order termination: under the matrix, misdemeanors and infractions are "do not pursue, or terminate" at every risk level, and fleeing a lawful stop does not elevate a summary offense.'
      ],
      correct: 3,
      feedback: 'Correct. The matrix directs "do not pursue, or terminate" for misdemeanors and infractions at all risk levels. An expired registration plus flight is a summary matter, and flight does not raise the offense level. The supervisor terminates it; if a forcible felony later emerges, that is a separate decision on its own facts.'
    },
    {
      scenario: 'An officer on her own initiative terminated a pursuit when the hazard began to outweigh the need to apprehend, and the suspect got away. Another supervisor wants her counseled for "letting him go."',
      text: 'What is the correct position?',
      options: [
        'Counsel the officer — terminating a pursuit that could have ended in an arrest reflects poorly on the unit.',
        'Take no position; pursuit decisions are not a supervisory concern once the pursuit ends.',
        'Support the officer: Regulation 5 states that disciplinary action will not be taken against personnel for deciding to terminate a pursuit, and the directive makes public and officer safety the highest priority. Her decision should be reinforced, not punished.',
        'Discipline the primary unit\'s partner instead for not taking over.'
      ],
      correct: 2,
      feedback: 'Correct. Regulation 5 explicitly protects the decision to terminate from discipline, and Regulation 1 makes termination the right call when the hazard outweighs the need to apprehend. Punishing a sound termination undermines exactly the judgment the directive is built to encourage.'
    },
    {
      scenario: 'A justified pursuit for an armed robbery is underway with a primary and a secondary unit. A third unit joins on its own initiative, citing the seriousness of the offense.',
      text: 'As the supervisor, what do you do about the third unit?',
      options: [
        'Allow it — the seriousness of an armed robbery justifies additional units joining the pursuit.',
        'Redirect it: under Regulation 11 the pursuit is the primary and secondary unit only unless you approve otherwise. Direct the third unit to position to monitor escape routes and channel — not join — the pursuit. Severity does not expand the unit count; only your approval does.',
        'Order all three units to box in the suspect vehicle immediately.',
        'Remove the secondary unit so the third can take its place.'
      ],
      correct: 1,
      feedback: 'Correct. Regulation 11 limits the pursuit to the primary and secondary unit unless a supervisor approves otherwise, with other units positioning to monitor escape routes and channel the pursuit. The seriousness of the underlying crime is not an exception — only supervisor approval is.'
    },
    {
      scenario: 'During a pursuit, the primary unit radios you asking for permission to perform a PIT maneuver to end it. The suspect displayed a handgun a moment ago but has not fired.',
      text: 'How do you respond?',
      options: [
        'Do not authorize a PIT on these facts: ramming and vehicular contact are deadly force under Regulation 9, strictly prohibited unless deadly force is authorized under 18 PA C.S.A. § 508 and GO 1.3.1/1.3.2. A displayed-but-not-fired weapon is not an active deadly-force attack; communicate the threat and continuously reassess termination.',
        'Authorize the PIT — a displayed weapon justifies using the vehicle to stop the threat.',
        'Tell the primary it is their call to make in the moment.',
        'Authorize the secondary unit to discharge a firearm at the tires instead.'
      ],
      correct: 0,
      feedback: 'Correct. Regulation 9 treats PIT, ramming, and roadblocks as deadly force, prohibited unless deadly force is authorized under § 508 and GO 1.3. A weapon displayed but not fired has not reached the threshold of the suspect employing deadly force. An officer cannot use a PIT as a substitute for that determination, and the supervisor should not authorize one here.'
    },
    {
      scenario: 'A pursuit that began in a neighboring jurisdiction crosses into East Greenville. One of your officers asks whether to join and take it over.',
      text: 'What is your decision under Regulation 17?',
      options: [
        'Direct the officer to join and assume the pursuit, since it is now in East Greenville.',
        'Order a roadblock at the borough line to stop the pursuit before it enters.',
        'Tell the officer to stay completely uninvolved, including refusing to gather any information.',
        'Direct that East Greenville officers shall not join or continue the pursuit; as supervisor/OIC you request information about the nature of the pursuit and determine what assistance, if any, is to be provided.'
      ],
      correct: 3,
      feedback: 'Correct. Regulation 17 provides that pursuits originating outside East Greenville and entering it shall not be joined or continued by East Greenville officers. The supervisor/OIC requests information and determines what assistance is provided — coordinated support is possible, but joining the pursuit is not, and that decision is the supervisor\'s.'
    },
    {
      scenario: 'You have decided that an ongoing pursuit must end and you order termination.',
      text: 'Under Regulation 7, what must happen with that order?',
      options: [
        'It can be documented in the after-action report; immediate communication is not required.',
        'Only the primary unit needs to hear it, by phone, after the pursuit.',
        'The decision to terminate shall be immediately and clearly communicated to the dispatcher via the Montgomery County Department of Emergency Communications Police Radio System — and you should confirm it was acknowledged, not just transmitted.',
        'It takes effect only once the suspect vehicle is out of sight.'
      ],
      correct: 2,
      feedback: 'Correct. Regulation 7 requires that a termination be immediately and clearly communicated to dispatch via the Montgomery County radio system so all units and the Communications Center know the pursuit has ended. A supervisor should verify the termination was acknowledged across the involved units.'
    },
    {
      scenario: 'In a post-pursuit debrief, one officer terminated a marginal pursuit per the matrix and the suspect escaped, while another made a risky high-speed apprehension on a separate call that barely stayed within policy.',
      text: 'What should your debrief reinforce?',
      options: [
        'Praise only the apprehension — results are what matter in pursuit work.',
        'Reinforce the disciplined termination as the model: public and officer safety is the directive\'s highest priority, Regulation 5 protects the decision to terminate, and what you praise is what officers will repeat on the next pursuit.',
        'Criticize the officer who terminated for not finding a way to make the arrest.',
        'Avoid comment on either decision to prevent second-guessing.'
      ],
      correct: 1,
      feedback: 'Correct. The directive makes safety the highest priority and Regulation 5 protects termination decisions from discipline. A supervisor who praises disciplined termination — not just successful apprehension — shapes the judgment officers will bring to the next pursuit. Rewarding only results trains the wrong instinct.'
    },
  ];
}

/* ══════════════════════════════════════════
   SUPERVISOR SCENARIO — Motor Vehicle Pursuits (EGPD)
   The field supervisor as a live control on Officer Tana's pursuit.
══════════════════════════════════════════ */
const SCENARIO_VEHICLE_PURSUITS_SUP = {
  id: 'scenario-pursuits-sup',
  title: 'Field Supervisor — Main St Pursuit',
  location: 'Main St & 6th St, East Greenville Borough, PA',
  totalDecisions: 3,
  nodes: {
    'start': {
      type: 'scene', time: '01:14', weather: 'Overcast / 47°F', unit: 'Field Supervisor',
      narrative: [
        'Officer Tana has just called out a pursuit near Main St & 6th St. You are the field supervisor on duty — and in a pursuit the Motor Vehicle Pursuits Directive does not make you a reviewer after the fact. It names you a live control on the event.',
        'The officer in the car has tunnel vision by design. You have the radio, the whole board, and the authority to end it. The directive\'s priority is yours to enforce: "the safety of the public and persons involved in the pursuit is the most important priority."'
      ],
      next: 'd1'
    },
    'd1': {
      type: 'decision', decisionNumber: 1,
      situation: 'Tana reports the only known offenses are an expired registration and fleeing the stop. The vehicle is running through residential streets at roughly 50 mph.',
      question: 'What do you do?',
      options: [
        { text: 'Order termination — the matrix is "do not pursue, or terminate" for misdemeanors and infractions at every risk level, and fleeing a lawful stop doesn\'t elevate a summary offense.', next: 'c1a', quality: 'good', shortLabel: 'Ordered termination per the matrix' },
        { text: 'Let it continue — fleeing from a lawful stop justifies the pursuit.', next: 'c1b', quality: 'bad', shortLabel: 'Let it run on the flight alone' },
        { text: 'Wait to see whether the vehicle is connected to a more serious crime before deciding.', next: 'c1c', quality: 'risky', shortLabel: 'Waited for more information' },
        { text: 'Authorize additional units to help end the pursuit faster.', next: 'c1d', quality: 'bad', shortLabel: 'Added units to a non-qualifying pursuit' },
      ]
    },
    'c1a': {
      type: 'consequence', outcomeClass: 'outcome-good', outcomeLabel: 'Terminated to the Matrix',
      heading: 'Offense level first — and an expired registration is not a pursuit.',
      narrative: [
        'You order termination. The matrix directs "do not pursue, or terminate" for misdemeanors and infractions at every risk level, and a pursuit may be initiated or continued only for a forcible felony or a deadly-weapon escape. An expired registration plus flight is a summary matter, and flight does not raise it.',
        'You confirm the termination is acknowledged across the units. If a forcible felony later emerges, that is a new decision on its own facts.'
      ],
      legal: 'Pursuit Decision-Making Matrix: misdemeanors/infractions — "do not pursue, or terminate" at all risk levels. Regulation 7: termination communicated immediately via the Montgomery County radio system.',
      next: 'd2'
    },
    'c1b': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Flight Isn\'t the Threshold',
      heading: 'A summary offense doesn\'t become a pursuit because the driver ran.',
      narrative: [
        'Letting the pursuit run because the driver fled inverts the directive. The offense level is the threshold, and "fleeing a lawful stop" does not, by itself, elevate an equipment violation — every additional second at 50 mph through a residential area for a summary offense is the exact risk the matrix exists to prevent.',
        'Your first question on any pursuit is the offense level. Here it required termination.'
      ],
      legal: 'Pursuit directive: pursuit requires a forcible felony or a deadly-weapon escape. Flight from a lawful stop does not elevate a summary offense.',
      next: 'd2'
    },
    'c1c': {
      type: 'consequence', outcomeClass: 'outcome-neutral', outcomeLabel: 'Waiting Is Still Pursuing',
      heading: '"Continue while I assess" is a pursuit the matrix already says to terminate.',
      narrative: [
        'There is no "continue briefly to assess" category for infractions and misdemeanors — at every risk level the directive is "do not pursue, or terminate." Every second you wait is a continued pursuit at an offense level that does not permit one, regardless of what you learn afterward.',
        'Terminate now. If new information establishes a forcible felony, that is a fresh decision made at that time.'
      ],
      legal: 'Pursuit Decision-Making Matrix: for misdemeanors and infractions there is no provision for continuing pending further information.',
      next: 'd2'
    },
    'c1d': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'More Units, More Risk',
      heading: 'Adding units to a pursuit that shouldn\'t exist multiplies the hazard.',
      narrative: [
        'Authorizing additional units to end a non-qualifying pursuit faster compounds the problem — more vehicles at speed through residential streets for a summary offense, which is precisely the public-safety risk the directive prioritizes against.',
        'The pursuit should be terminated, not reinforced.'
      ],
      legal: 'Pursuit directive: safety of the public is the most important priority; the matrix requires termination for this offense level, not added units.',
      next: 'd2'
    },
    'd2': {
      type: 'decision', decisionNumber: 2,
      situation: 'Moments later dispatch advises the vehicle matches one used in an armed robbery — a handgun was displayed. That is a forcible felony, and a pursuit is now justified. A third unit, on its own initiative, falls in behind the primary and secondary, citing the seriousness of the crime.',
      question: 'What do you do about the third unit?',
      options: [
        { text: 'Allow it — an armed robbery is serious enough to justify additional units joining.', next: 'c2a', quality: 'bad', shortLabel: 'Let severity expand the pursuit' },
        { text: 'Redirect it — under Regulation 11 the pursuit is primary and secondary only unless you approve otherwise; position the third unit to monitor escape routes and channel, not join.', next: 'c2b', quality: 'good', shortLabel: 'Held it to primary + secondary' },
        { text: 'Order all three units to box in the suspect vehicle immediately.', next: 'c2c', quality: 'bad', shortLabel: 'Ordered an immediate box-in' },
        { text: 'Remove the secondary unit so the third can take its place.', next: 'c2d', quality: 'bad', shortLabel: 'Swapped units mid-pursuit' },
      ]
    },
    'c2a': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Severity Doesn\'t Expand It',
      heading: 'Only supervisor approval expands the unit count — not the seriousness of the crime.',
      narrative: [
        'Initiating the pursuit is now correct, but allowing a third unit to join on its own initiative violates Regulation 11: the pursuit is the primary and secondary unit only unless a supervisor approves otherwise. The seriousness of the underlying offense is not an exception — only your approval is.',
        'A unit freelancing into the pursuit is a regulation violation no matter how serious the triggering crime.'
      ],
      legal: 'Regulation 11: primary and secondary unit only unless otherwise approved by a supervisor; other units monitor escape routes and channel, not join.',
      next: 'd3'
    },
    'c2b': {
      type: 'consequence', outcomeClass: 'outcome-good', outcomeLabel: 'Held the Unit Count',
      heading: 'You let the pursuit proceed on proper grounds and kept the geometry under control.',
      narrative: [
        'An armed robbery with a displayed handgun meets the threshold, so the pursuit is justified — and you hold it to the primary and secondary unit, directing the third to position to monitor escape routes and channel rather than join. Regulation 11 reserves that expansion to your approval alone.',
        'Channel, not swarm. You kept the response proportionate while it ran.'
      ],
      legal: 'Regulation 11: the pursuit is primary and secondary only absent supervisor approval; other units position to monitor and channel.',
      next: 'd3'
    },
    'c2c': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'A Box-In Is Deadly Force',
      heading: 'Ordering three units to box in a moving vehicle isn\'t a control tactic.',
      narrative: [
        'Boxing in a moving suspect vehicle is vehicular contact — a deadly-force intervention under Regulation 9, strictly prohibited unless deadly force is authorized under 18 PA C.S.A. § 508 and GO 1.3.1/1.3.2. Ordering it here, before that determination, is both a unit-count and a deadly-force violation in one move.',
        'Keep it to primary and secondary, channel the escape routes, and reassess continuously.'
      ],
      legal: 'Regulation 9: ramming, vehicular contact, and roadblocks are deadly force, prohibited unless deadly force is authorized under § 508 and GO 1.3.1/1.3.2.',
      next: 'd3'
    },
    'c2d': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Unnecessary Churn',
      heading: 'Swapping the secondary for the third unit mid-pursuit creates risk for no reason.',
      narrative: [
        'Removing the secondary so the third can take over introduces confusion and maneuvering into an active pursuit with no benefit. Regulation 11 already gives you a clean structure — primary and secondary, with other units channeling — and the third unit\'s right place is monitoring escape routes, not replacing a unit already in position.',
        'Leave the structure intact and direct the third unit to channel.'
      ],
      legal: 'Regulation 11: primary and secondary unit only unless a supervisor approves otherwise; other units monitor and channel.',
      next: 'd3'
    },
    'd3': {
      type: 'decision', decisionNumber: 3,
      situation: 'The pursuit continues toward a residential stretch. The front-seat passenger leans out and points a handgun in the primary unit\'s direction but does not fire. The primary radios you asking for permission to perform a PIT maneuver to end it.',
      question: 'How do you respond?',
      options: [
        { text: 'Authorize the PIT — a displayed weapon justifies using the vehicle to stop the threat.', next: 'c3a', quality: 'bad', shortLabel: 'Authorized the PIT' },
        { text: 'Do not authorize it — ramming and vehicular contact are deadly force under Regulation 9, prohibited unless deadly force is authorized under § 508 and GO 1.3; a displayed-but-not-fired weapon is not an active deadly-force attack. Communicate the threat and reassess termination.', next: 'c3b', quality: 'good', shortLabel: 'Denied the PIT, reassessed termination' },
        { text: 'Tell the primary it\'s his call to make in the moment.', next: 'c3c', quality: 'risky', shortLabel: 'Punted the decision to the primary' },
        { text: 'Authorize the secondary unit to discharge a firearm at the tires instead.', next: 'c3d', quality: 'bad', shortLabel: 'Authorized shooting at the vehicle' },
      ]
    },
    'c3a': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'PIT Isn\'t a Shortcut',
      heading: 'A displayed weapon doesn\'t convert a PIT into authorized deadly force.',
      narrative: [
        'Authorizing the PIT treats a deadly-force intervention as a routine pursuit-ender. Regulation 9 makes ramming and vehicular contact deadly force, strictly prohibited unless deadly force is authorized under § 508 and GO 1.3 — and a handgun pointed but not fired has not reached the threshold of the suspect employing deadly force.',
        'An officer cannot use a PIT as a substitute for that determination, and you should not authorize one on these facts.'
      ],
      legal: 'Regulation 9: PIT/ramming/roadblocks prohibited unless deadly force is authorized under 18 PA C.S.A. § 508 and GO 1.3.1/1.3.2.',
      next: 'debrief'
    },
    'c3b': {
      type: 'consequence', outcomeClass: 'outcome-good', outcomeLabel: 'Held the Deadly-Force Line',
      heading: 'You denied the PIT and kept the decision where the policy puts it.',
      narrative: [
        'You decline to authorize the PIT: a weapon displayed but not fired is not the suspect employing deadly force, and Regulation 9 prohibits vehicular contact unless deadly force is authorized under § 508 and GO 1.3. You have the threat broadcast immediately and continuously weigh, under Regulation 1, whether the hazard now outweighs the need to apprehend — ready to terminate and communicate it.',
        'The threat changed the risk picture, not the legal threshold for ramming a car on a residential street.'
      ],
      legal: 'Regulation 8 (firearm discharge from a moving vehicle prohibited except as the ultimate self-defense against an offender employing deadly force), Regulation 9 (deadly-force interventions prohibited absent authorization), Regulation 1 (terminate when hazard outweighs need to apprehend).',
      next: 'debrief'
    },
    'c3c': {
      type: 'consequence', outcomeClass: 'outcome-neutral', outcomeLabel: 'That\'s Your Call to Make',
      heading: 'A deadly-force intervention isn\'t something to leave to the officer with tunnel vision.',
      narrative: [
        'Telling the primary it\'s his call abdicates exactly the control the directive puts in your hands. A PIT is a deadly-force decision governed by § 508 and GO 1.3, and you — with the radio and the whole board — are part of that determination, not a bystander to it.',
        'Deny the PIT on these facts, have the threat communicated, and keep weighing termination.'
      ],
      legal: 'Regulation 9 and the field-supervisor role: deadly-force interventions are not the contact officer\'s unilateral call; the supervisor is a live control on the event.',
      next: 'debrief'
    },
    'c3d': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Shooting at the Car Is Worse',
      heading: 'Authorizing fire at a moving vehicle on a residential street is the catastrophe Regulation 8 prevents.',
      narrative: [
        'Discharging a firearm at the suspect vehicle, based on a display rather than an active deadly-force attack, violates Regulation 8 and creates exactly the risk to officers, occupants, and bystanders the regulation is written to prevent. "Shoot the tires" is not a controlled option on a residential street at speed.',
        'Hold fire absent an actual deadly-force attack, communicate the threat, and reassess termination under Regulation 1.'
      ],
      legal: 'Regulation 8: discharge of firearms from a moving vehicle during a pursuit is strictly prohibited except as the ultimate measure of self-defense or defense of another when the suspect is employing deadly force.',
      next: 'debrief'
    },
    'debrief': { type: 'debrief' }
  }
};
