/* ═══════════════════════════════════════════
   MTPD — Module 6: Motor Vehicle Pursuits

   Reading extracted byte-for-byte from the former app.js hardcoded
   branch. Supervisor variants anchored to MTPD ALO 4.02 and the law in
   the reading (Scott v. Harris; County of Sacramento v. Lewis).
   Never borrow EGPD policy, framing, or roads.
═══════════════════════════════════════════ */

const READING_VEHICLE_PURSUITS = `
      <div class="content-block">
        <h4>Scenario</h4>
        <h2>A traffic stop on Route 29 at 0114 hours. Defective taillight. The driver looks at you in the mirror — and goes. In the next 90 seconds, every decision you make will be measured against policy, civil liability, and the safety of every person on those roads.</h2>
        <p>This module covers MTPD ALO 4.02 pursuit authorization, required communications, termination criteria, prohibited tactics, stop stick deployment, and mandatory post-pursuit reporting.</p>
      </div>
      <div class="content-block">
        <h4>Core Principle</h4>
        <h2>The Right to Pursue Is Not the Obligation to Continue</h2>
        <p>Vehicle pursuits represent one of the highest-risk activities in law enforcement — for officers, the public, and the fleeing subject. The legal authority to pursue a fleeing vehicle does not mean that continuing the pursuit is always the correct decision. MTPD ALO 4.02 exists to ensure that pursuit decisions are evaluated against documented criteria, not adrenaline.</p>
        <p>Pursuits are authorized when the need to apprehend immediately outweighs the danger created by the pursuit. That calculus changes in real time — and officers are required to keep evaluating it throughout every pursuit.</p>
        <div class="case-law-box">
          <div class="case-title">Scott v. Harris, 550 U.S. 372 (2007)</div>
          <p>The Supreme Court held that officers do not violate the Fourth Amendment by taking action to end a dangerous high-speed pursuit that threatens innocent lives, even when that action creates a risk of serious injury to the fleeing suspect. However, the Court noted that the legality of pursuit tactics is always evaluated against the totality of the circumstances — including whether the pursuit itself was appropriate. This decision is frequently cited in pursuit-related civil litigation.</p>
        </div>
        <div class="case-law-box">
          <div class="case-title">County of Sacramento v. Lewis, 523 U.S. 833 (1998)</div>
          <p>The Supreme Court established that in high-speed pursuits, officers are liable under the Fourteenth Amendment\'s substantive due process clause only if their conduct shocks the conscience. However, the Court also noted that where officers have time to deliberate — including about whether to initiate or continue a pursuit — a different standard may apply. Documented decision-making is your protection.</p>
        </div>
      </div>
      <div class="content-block">
        <h4>MTPD ALO 4.02 — Pursuit Authorization</h4>
        <h2>Know the policy before the stop — because there is no time to look it up at 80 mph.</h2>
        <div class="sop-box">
          <div class="sop-title">MTPD ALO 4.02 — Immediate Notification Requirements</div>
          <p>Upon initiating a pursuit, officers shall <strong>immediately</strong> notify communications of: their unit number, the nature of the offense prompting the pursuit, current direction of travel, approximate speed, and vehicle description. Supervisor notification and authorization are required. This communication is mandatory from the moment a vehicle fails to stop — not after the pursuit is established.</p>
        </div>
        <div class="sop-box">
          <div class="sop-title">MTPD ALO 4.02 — Two-Unit Maximum</div>
          <p>A maximum of <strong>two patrol units</strong> shall participate in any vehicle pursuit. Additional patrol units shall not join the pursuit. This is a hard limit, not a guideline subject to supervisor override. If containment or road interdiction is needed, <strong>stop stick deployment</strong> is the authorized tactic — carried out by a unit not actively in pursuit, with supervisor authorization.</p>
        </div>
        <div class="sop-box">
          <div class="sop-title">MTPD ALO 4.02 — PIT Maneuvers Prohibited</div>
          <p>Precision Immobilization Technique (PIT) maneuvers are <strong>strictly prohibited</strong> under MTPD ALO 4.02. This prohibition is absolute — there is no circumstance, supervisor authorization level, or offense severity that authorizes a PIT maneuver under this policy. Stop sticks are the authorized alternative for vehicle interdiction.</p>
        </div>
        <div class="sop-box">
          <div class="sop-title">MTPD ALO 4.02 — Termination Criteria</div>
          <p>Officers and supervisors shall terminate a pursuit when: (1) the danger to officers or the public outweighs the need for immediate apprehension; (2) the suspect\'s identity is known and arrest can be accomplished by other means; (3) the offense is a summary violation and apprehension can be made at a later time; or (4) a superior officer orders termination. Termination must be documented with the specific basis for the decision.</p>
        </div>
      </div>
      <div class="content-block">
        <h4>Continuous Evaluation Factors</h4>
        <h2>Every 30 seconds of a pursuit, these factors must be re-evaluated.</h2>
        <ul class="key-points">
          <li><strong>Nature of the offense</strong> — A summary violation weights strongly toward termination when identity is known. A violent felony weights toward continuation.</li>
          <li><strong>Suspect identity</strong> — Once identity is confirmed and a later arrest is feasible, continuation must be re-justified.</li>
          <li><strong>Road and traffic conditions</strong> — Residential roads, pedestrian presence, intersections, and weather all change the calculus in real time.</li>
          <li><strong>Time of day</strong> — Late night pursuits on residential roads carry different risk profiles than pursuits on open roads.</li>
          <li><strong>Available units</strong> — Two-unit maximum means you\'re already at capacity when backup arrives. Communicate, coordinate, contain.</li>
          <li><strong>Your speed and the subject\'s speed</strong> — Gap closing means reduced reaction time for both the officer and any person or vehicle in the path.</li>
        </ul>
      </div>
      <div class="content-block">
        <h4>Post-Pursuit Reporting</h4>
        <h2>Termination is as important to document as initiation.</h2>
        <p>Every vehicle pursuit — whether it ends in apprehension or termination — requires documentation. The officer documents the basis for initiation, all notifications made, the basis and time of termination, and the last known location and direction of travel. The on-duty supervisor is required to complete a Pursuit Review Form within 24 hours of any pursuit.</p>
        <p>Incomplete pursuit documentation is a department liability exposure and creates gaps in the record that will be exploited if a civil action follows. Document every decision as it was made — because "I was evaluating the factors" is not documentation.</p>
        <div class="sop-box">
          <div class="sop-title">MTPD ALO 4.02 — Stop Stick Authorization</div>
          <p>Stop sticks (tire deflation devices) may be deployed in front of a fleeing vehicle only with supervisor authorization and only by a unit <strong>not actively participating in the pursuit.</strong> The deploying unit must provide the pursuing unit with precise deployment location. Stop stick deployment is the department-authorized alternative to additional pursuit units and PIT maneuvers — use it as intended.</p>
        </div>
        <button class="btn-launch" onclick="startScenario('vehicle-pursuits')">Proceed to Scenario Exercise →</button>
      </div>
    `;

/* ══════════════════════════════════════════
   SUPERVISOR OVERLAY — Vehicle Pursuits (MTPD)
══════════════════════════════════════════ */
const SUPERVISOR_VEHICLE_PURSUITS = `
  <div class="content-block">
    <h4>Supervisor Focus</h4>
    <h2>In a pursuit, ALO 4.02 names you specifically: supervisor authorization, supervisor control of the units, the supervisor's power to terminate, and the supervisor's Pursuit Review Form. This is the module where you are on the radio, not just at the desk.</h2>
    <p>A pursuit is a live event you help run. The officer manages the car; you manage the bigger picture — whether the pursuit is justified to continue, how many units are in it, whether to deploy stop sticks, and when to call it off. After it ends, you own the review. Your judgment in those minutes is the difference between a clean apprehension and a civil action.</p>
  </div>
  <div class="content-block">
    <h4>Authorize, Then Keep Evaluating Termination</h4>
    <h2>The right to pursue is not the obligation to continue — and you have the authority to end it.</h2>
    <p>ALO 4.02 requires supervisor notification and authorization, and it requires officers and supervisors to terminate when (1) the danger outweighs the need for immediate apprehension, (2) the suspect's identity is known and arrest can be made by other means, (3) the offense is a summary violation and a later arrest is feasible, or (4) a superior officer orders termination. As the supervisor you are not a spectator to that calculus — you run it in real time against what you are hearing: the offense, the speed, the road, the time of night, the traffic. When a pursuit for a minor offense pushes into a residential area in wet conditions and the driver is identified, the criteria point to termination, and you can order it. A documented decision to terminate is never the wrong call to have to defend.</p>
  </div>
  <div class="content-block">
    <h4>The Hard Limits You Enforce on the Radio</h4>
    <ul class="key-points">
      <li><strong>Two-unit maximum</strong> — No more than two patrol units in any pursuit. It is a hard limit, not subject to supervisor override — meaning you cannot waive it to add a third unit. Keep additional units out of the pursuit and positioned to contain.</li>
      <li><strong>PIT is prohibited, absolutely</strong> — There is no circumstance, authorization level, or offense severity that permits a PIT under ALO 4.02. If you hear an officer set one up, stop it.</li>
      <li><strong>Stop sticks are the authorized alternative</strong> — Stop sticks may be deployed only with your authorization and only by a unit not actively in the pursuit, and the deploying unit must give the pursuing unit precise deployment location. That is the tool for interdiction — not a third pursuit car, not a PIT.</li>
    </ul>
  </div>
  <div class="content-block">
    <h4>The Pursuit Review Form Is Yours</h4>
    <p>Every pursuit — apprehension or termination — requires documentation, and ALO 4.02 puts a specific obligation on the on-duty supervisor: complete the Pursuit Review Form within 24 hours of any pursuit. This is not the officer's report; it is your review of the event. Confirm the officer's report documents the basis for initiation, the notifications made, the basis and time of termination, and the last known location and direction — and complete your form on time. A terminated pursuit is documented as thoroughly as one that ends in arrest; "we called it off" is not a reason to skip the paperwork. Incomplete pursuit documentation is a department liability exposure, and the review form is the record that shows the decisions were made deliberately.</p>
  </div>
  <div class="content-block">
    <h4>From Catch to Correction</h4>
    <p>Pursuits are decided by deliberation, and under County of Sacramento v. Lewis deliberate decisions are exactly what gets scrutinized — documented decision-making is the protection. Coach officers to communicate the evaluation factors in real time and to document termination as carefully as initiation. A pattern of pursuits continued past the termination criteria, extra units joining, or missing review forms is a training and supervisory issue you address and escalate. Every pursuit you authorize and every review form you sign carries your name.</p>
  </div>
`;

function getVehiclePursuitSupervisorQuestions() {
  return [
    {
      scenario: 'You are the on-duty supervisor. An officer is pursuing a vehicle that fled a stop for a defective taillight. Dispatch has confirmed the registered owner\'s identity, the pursuit has entered a residential area, roads are wet, and speeds are climbing. The officer asks to continue.',
      text: 'What does MTPD ALO 4.02 direct you to do?',
      options: [
        'Authorize continuation — the driver\'s flight justifies pursuing regardless of the original offense.',
        'Order termination — the criteria are met: a summary-level offense, the suspect\'s identity is known and a later arrest is feasible, and the danger (residential area, wet roads, rising speed) outweighs the need for immediate apprehension.',
        'Tell the officer it is entirely his decision whether to continue.',
        'Authorize a third unit to join and box the vehicle in.'
      ],
      correct: 1,
      feedback: 'Correct. MTPD ALO 4.02 termination criteria are squarely met: the offense is minor, the suspect is identified and can be arrested later, and the danger outweighs the need for immediate apprehension. Officers and supervisors shall terminate in these conditions, and a documented decision to terminate is the defensible one.'
    },
    {
      scenario: 'During an authorized pursuit with two units already engaged, a third officer radios that he is close and asks to join to help box the suspect in.',
      text: 'What is your direction under MTPD ALO 4.02?',
      options: [
        'Approve it — as supervisor you can authorize a third unit when it improves containment.',
        'Deny it — the two-unit maximum is a hard limit not subject to supervisor override; keep the third unit out of the pursuit and have it position to contain, using stop sticks if interdiction is needed.',
        'Approve it only if the third unit stays a half-mile back.',
        'Approve a fourth unit as well to fully surround the vehicle.'
      ],
      correct: 1,
      feedback: 'Correct. MTPD ALO 4.02 sets a hard two-unit maximum that is expressly not subject to supervisor override. The third unit shall not join. It can position to contain, and stop sticks — deployed by a unit not in the pursuit, with your authorization — are the authorized interdiction tactic.'
    },
    {
      scenario: 'An officer in a pursuit radios that he has a clean angle and intends to execute a PIT maneuver to end it, and asks for your go-ahead.',
      text: 'How do you respond under MTPD ALO 4.02?',
      options: [
        'Authorize the PIT since you are the supervisor and speeds are dangerous.',
        'Prohibit it — PIT maneuvers are strictly and absolutely prohibited under ALO 4.02 with no circumstance, authorization level, or offense severity creating an exception; direct stop sticks by a non-pursuing unit instead if interdiction is warranted.',
        'Authorize the PIT only below 45 mph.',
        'Tell the officer to use his own judgment on the PIT.'
      ],
      correct: 1,
      feedback: 'Correct. MTPD ALO 4.02 prohibits PIT maneuvers absolutely — no circumstance, supervisor authorization, or offense severity authorizes one. Stop sticks, deployed by a unit not actively in the pursuit with supervisor authorization, are the authorized alternative.'
    },
    {
      scenario: 'Interdiction is warranted in an ongoing pursuit. You are weighing stop stick deployment.',
      text: 'What does MTPD ALO 4.02 require for a lawful stop stick deployment?',
      options: [
        'Any unit, including a pursuing unit, may deploy stop sticks at will to end the pursuit faster.',
        'Stop sticks may be deployed only with supervisor authorization, only by a unit not actively participating in the pursuit, and the deploying unit must provide the pursuing unit with precise deployment location.',
        'Stop sticks require no authorization since they are a less-lethal option.',
        'Stop sticks may only be deployed after a PIT maneuver has failed.'
      ],
      correct: 1,
      feedback: 'Correct. MTPD ALO 4.02 authorizes stop sticks only with supervisor authorization and only by a unit not actively in the pursuit, and requires the deploying unit to give the pursuing unit precise deployment location. It is the authorized alternative to additional pursuit units and to PIT maneuvers.'
    },
    {
      scenario: 'A pursuit you supervised was terminated by your order when it became too dangerous. The next day you realize no Pursuit Review Form has been completed, and an officer suggests skipping it "since the pursuit was called off and nobody was caught."',
      text: 'What does MTPD ALO 4.02 require?',
      options: [
        'Skip it — review forms are only needed when a pursuit ends in an arrest.',
        'Complete the Pursuit Review Form within 24 hours — the on-duty supervisor must complete it for any pursuit, and a terminated pursuit is documented as thoroughly as one ending in apprehension.',
        'Have the fleeing driver complete a statement instead of a review form.',
        'Document it only if a civil complaint is later filed.'
      ],
      correct: 1,
      feedback: 'Correct. MTPD ALO 4.02 requires the on-duty supervisor to complete a Pursuit Review Form within 24 hours of any pursuit, regardless of outcome. Termination is as important to document as initiation; skipping the form because no one was caught is a documentation failure and a liability exposure.'
    },
    {
      scenario: 'Reviewing an officer\'s pursuit report, you find it documents the chase well but says nothing about the basis or time of termination or the suspect\'s last known location and direction. The officer notes only that he "broke off when it got too hairy."',
      text: 'What do you require before the documentation is complete?',
      options: [
        'Nothing — "broke off when it got too hairy" adequately explains the termination.',
        'Return it for the specific termination basis and time, the notifications made, and the last known location and direction of travel, because ALO 4.02 requires a terminated pursuit to be documented with the specific basis for the decision.',
        'Approve it — termination details are optional once a pursuit ends.',
        'Replace the officer\'s account with your own summary of the pursuit.'
      ],
      correct: 1,
      feedback: 'Correct. MTPD ALO 4.02 requires documentation of the basis and time of termination, the notifications made, and the last known location and direction of travel. "Broke off when it got too hairy" is a conclusion, not the specific basis the order requires.'
    },
    {
      scenario: 'At the very start of a pursuit, before any supervisor involvement, the initiating officer has not yet advised dispatch of the offense, direction, speed, or vehicle description — he is just driving.',
      text: 'What does ALO 4.02 require regarding notification, and what is your role?',
      options: [
        'Notification can wait until the pursuit is established and a supervisor is looped in.',
        'Notification is mandatory immediately upon initiating the pursuit — unit, offense, direction, speed, and vehicle description — and supervisor notification and authorization are required, so you should be brought in from the outset, not after the fact.',
        'Only the vehicle description must be broadcast; the rest is optional.',
        'The officer may broadcast nothing until the pursuit ends to avoid radio congestion.'
      ],
      correct: 1,
      feedback: 'Correct. MTPD ALO 4.02 requires immediate notification upon initiating a pursuit — unit, nature of the offense, direction, approximate speed, and vehicle description — and requires supervisor notification and authorization. The communication is mandatory from the moment the vehicle fails to stop, which is what brings the supervisor into the decision early.'
    },
    {
      scenario: 'Over a few months, one officer has initiated several pursuits for minor offenses and continued them past the point where identity was known and the danger had risen, requiring you to order termination each time. You have discussed the termination criteria with him before.',
      text: 'What is the appropriate supervisory response now?',
      options: [
        'Keep ordering termination each time and leave it at that.',
        'Move to documented corrective action and targeted training on the ALO 4.02 termination criteria and continuous-evaluation factors, because a repeated pattern after coaching is a supervisory and training issue with significant liability exposure; escalate as warranted.',
        'Stop authorizing the officer to make traffic stops entirely.',
        'Take no action — each pursuit was a separate situation.'
      ],
      correct: 1,
      feedback: 'Correct. One instance is a coaching moment; a documented pattern after coaching — pursuits continued past the termination criteria — is a supervisory and training issue requiring documented corrective action and escalation, tied to the ALO 4.02 criteria and the real civil-liability exposure pursuits carry.'
    },
  ];
}

/* ══════════════════════════════════════════
   SUPERVISOR SCENARIO — Vehicle Pursuits (MTPD)
   You are the on-duty supervisor running Officer Pruitt's Route 29
   pursuit in real time, then completing the review. Fictional officer.
══════════════════════════════════════════ */
const SCENARIO_VEHICLE_PURSUITS_SUP = {
  id: 'scenario-vehicle-pursuits-sup',
  title: 'Supervisor Control — Route 29 Pursuit',
  location: 'Shift Supervisor — Route 29, Marlborough Township, PA',
  totalDecisions: 3,
  nodes: {
    'start': {
      type: 'scene',
      time: '01:14',
      weather: 'Wet roads, light rain',
      unit: 'Shift Supervisor',
      narrative: [
        'Officer Pruitt advises he is in pursuit: a vehicle fled a traffic stop on Route 29 for a defective taillight. You are the on-duty supervisor — ALO 4.02 requires your notification and authorization, and you control how this runs.',
        'Rain is falling, the roads are wet, and the broadcast is coming in fast.'
      ],
      next: 'd1'
    },
    'd1': {
      type: 'decision',
      decisionNumber: 1,
      situation: 'Within two minutes, dispatch confirms the registered owner\'s identity from the plate, the pursuit has turned off Route 29 toward a residential stretch near Swamp Creek Road, and speeds are climbing on wet pavement. Pruitt asks to keep going.',
      question: 'What do you do?',
      options: [
        { text: 'Authorize continuation — he ran, so the pursuit is justified.', next: 'c1a', quality: 'bad', shortLabel: 'Continued a minor-offense pursuit' },
        { text: 'Order termination — summary-level offense, identity known with a later arrest feasible, and danger now outweighing the need for immediate apprehension; document the basis.', next: 'c1b', quality: 'good', shortLabel: 'Terminated on the ALO 4.02 criteria' },
        { text: 'Tell Pruitt it is his call whether to continue.', next: 'c1c', quality: 'bad', shortLabel: 'Abdicated the supervisor decision' },
        { text: 'Authorize a third unit to join and box the vehicle in.', next: 'c1d', quality: 'bad', shortLabel: 'Added a third unit' },
      ]
    },
    'c1a': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Chasing a Taillight Into a Neighborhood',
      heading: 'Flight does not transform a defective-taillight stop into a pursuit worth the risk.',
      narrative: [
        'You authorized continuation into a residential area on wet roads for a summary offense with the driver already identified. Every ALO 4.02 termination factor pointed the other way, and if anyone is hurt the deliberate decision to continue is yours.',
        'The right to pursue was never the obligation to continue.'
      ],
      legal: 'MTPD ALO 4.02 termination criteria: terminate when danger outweighs the need for immediate apprehension and when identity is known and a later arrest is feasible.',
      next: 'd2'
    },
    'c1b': {
      type: 'consequence', outcomeClass: 'outcome-good', outcomeLabel: 'Called It Right',
      heading: 'You ran the criteria in real time and ordered termination.',
      narrative: [
        'You direct Pruitt to terminate, slow down, and clear the area, and you note the basis: minor offense, identified driver, rising danger on wet residential roads. The vehicle is gone, but the registered owner can be pursued through a warrant — safely, on your terms.',
        'A documented decision to terminate is never the wrong call to have to defend.'
      ],
      legal: 'MTPD ALO 4.02: officers and supervisors shall terminate when the danger outweighs the need to apprehend, when identity is known and a later arrest is feasible, or for a summary offense apprehendable later.',
      next: 'd2'
    },
    'c1c': {
      type: 'consequence', outcomeClass: 'outcome-neutral', outcomeLabel: 'That Decision Is Yours',
      heading: 'ALO 4.02 names the supervisor in the termination decision — don\'t hand it back.',
      narrative: [
        'Telling Pruitt it is entirely his call ignores that the order makes termination a shared officer-and-supervisor responsibility, and you have the clearer picture of the offense, the road, and the risk. Leaving him alone with it in the moment is abdicating your role.',
        'Make the call: on these facts, terminate.'
      ],
      legal: 'MTPD ALO 4.02: officers and supervisors shall terminate under the criteria; supervisor authorization and control are built into the policy.',
      next: 'd2'
    },
    'c1d': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'You Can\'t Add the Third Car',
      heading: 'The two-unit maximum is a hard limit you cannot override.',
      narrative: [
        'Authorizing a third unit to box in the vehicle violates ALO 4.02\'s hard two-unit maximum — which is expressly not subject to supervisor override — and adds risk to a pursuit that should be terminated outright on the criteria.',
        'Fewer cars and a termination order, not more cars and a box-in.'
      ],
      legal: 'MTPD ALO 4.02: maximum of two patrol units; additional units shall not join; the limit is not subject to supervisor override.',
      next: 'd2'
    },
    'd2': {
      type: 'decision',
      decisionNumber: 2,
      situation: 'Imagine instead the pursuit is for a confirmed armed-robbery suspect and remains justified. Two units are engaged. A third officer asks to join to help, and Pruitt radios that he has an angle for a PIT maneuver to end it.',
      question: 'How do you manage the units and the tactic?',
      options: [
        { text: 'Authorize the third unit and approve the PIT to end it quickly.', next: 'c2a', quality: 'bad', shortLabel: 'Added a unit and approved a PIT' },
        { text: 'Hold the line at two units, prohibit the PIT, and authorize stop sticks deployed by a non-pursuing unit with precise location passed to the pursuing unit.', next: 'c2b', quality: 'good', shortLabel: 'Enforced limits; authorized stop sticks' },
        { text: 'Approve the PIT but keep the third unit out.', next: 'c2c', quality: 'bad', shortLabel: 'Allowed the prohibited PIT' },
        { text: 'Add the third unit but deny the PIT.', next: 'c2d', quality: 'bad', shortLabel: 'Exceeded the two-unit max' },
      ]
    },
    'c2a': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Two Violations Under Pressure',
      heading: 'A serious offense doesn\'t unlock a third unit or a PIT — both are barred.',
      narrative: [
        'The severity of the offense does not waive the two-unit maximum or the absolute PIT prohibition. Authorizing both put extra units and a prohibited tactic into an already dangerous event, on your authority.',
        'The authorized path was stop sticks by a non-pursuing unit — not a third car and a PIT.'
      ],
      legal: 'MTPD ALO 4.02: hard two-unit maximum (no override); PIT strictly prohibited regardless of offense severity; stop sticks are the authorized interdiction tactic.',
      next: 'd3'
    },
    'c2b': {
      type: 'consequence', outcomeClass: 'outcome-good', outcomeLabel: 'Limits Held, Right Tool Chosen',
      heading: 'Two units, no PIT, stop sticks deployed correctly — the authorized way to end it.',
      narrative: [
        'You keep the pursuit at two units, prohibit the PIT, and authorize stop sticks deployed by a unit not in the pursuit, with the precise deployment location passed to Pruitt. The interdiction is done within policy even on a serious offense.',
        'Holding the limits under pressure is exactly the supervisor\'s job in a pursuit.'
      ],
      legal: 'MTPD ALO 4.02: two-unit maximum; PIT prohibited; stop sticks only with supervisor authorization, by a non-pursuing unit, with precise location to the pursuing unit.',
      next: 'd3'
    },
    'c2c': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'The PIT Is Never Authorized',
      heading: 'Keeping the third unit out is right; approving the PIT is not.',
      narrative: [
        'You got the unit limit right, but ALO 4.02 prohibits PIT maneuvers absolutely — there is no offense severity or authorization level that permits one. Approving it is a clear policy violation.',
        'Direct stop sticks by a non-pursuing unit instead.'
      ],
      legal: 'MTPD ALO 4.02: PIT maneuvers are strictly prohibited; no circumstance or authorization creates an exception.',
      next: 'd3'
    },
    'c2d': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Still Too Many Cars',
      heading: 'Denying the PIT is right; adding the third unit breaks the hard limit.',
      narrative: [
        'You correctly refused the PIT, but authorizing a third unit violates the two-unit maximum, which is not subject to your override. Keep the extra unit out and use stop sticks for interdiction.',
        'Two units, stop sticks, no PIT.'
      ],
      legal: 'MTPD ALO 4.02: maximum of two patrol units, not subject to supervisor override; stop sticks are the authorized interdiction tactic.',
      next: 'd3'
    },
    'd3': {
      type: 'decision',
      decisionNumber: 3,
      situation: 'The pursuit you terminated earlier is over with no apprehension. The next morning, no Pursuit Review Form has been completed. Pruitt\'s report documents the initiation but is vague on the termination, and he suggests skipping the review form "since we called it off and didn\'t catch anyone."',
      question: 'How do you handle the documentation?',
      options: [
        { text: 'Skip the review form — it was a terminated pursuit with no arrest.', next: 'c3a', quality: 'bad', shortLabel: 'Skipped the Pursuit Review Form' },
        { text: 'Complete the Pursuit Review Form within 24 hours and have Pruitt document the specific termination basis and time and the last known location and direction.', next: 'c3b', quality: 'good', shortLabel: 'Completed the review + tightened the report' },
        { text: 'Have Pruitt complete the review form instead of doing it yourself.', next: 'c3c', quality: 'risky', shortLabel: 'Pushed your review duty to the officer' },
        { text: 'Wait to see if a civil complaint comes in before documenting anything.', next: 'c3d', quality: 'bad', shortLabel: 'Documented only if sued' },
      ]
    },
    'c3a': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'No Form, Maximum Exposure',
      heading: 'A terminated pursuit with no review form is the gap a plaintiff\'s attorney loves.',
      narrative: [
        'Skipping the Pursuit Review Form because no one was caught leaves the department with no documented account of a high-risk event you ordered terminated. If anything surfaces later, there is nothing showing the decisions were deliberate.',
        'Termination is documented as thoroughly as apprehension — that is the point of the form.'
      ],
      legal: 'MTPD ALO 4.02: the on-duty supervisor must complete a Pursuit Review Form within 24 hours of any pursuit, regardless of outcome.',
      next: 'debrief'
    },
    'c3b': {
      type: 'consequence', outcomeClass: 'outcome-good', outcomeLabel: 'Documented Like It Mattered — Because It Did',
      heading: 'You completed your review form and tightened the officer\'s termination record.',
      narrative: [
        'You complete the Pursuit Review Form within 24 hours and have Pruitt document the specific basis and time of termination and the last known location and direction. The record now shows a deliberate, criteria-based decision from start to finish.',
        'Under the deliberation standard, that documented decision-making is exactly the protection the department needs.'
      ],
      legal: 'MTPD ALO 4.02: supervisor completes the Pursuit Review Form within 24 hours; the officer documents initiation, notifications, termination basis and time, and last known location. County of Sacramento v. Lewis (1998): deliberate decisions are judged by documented reasoning.',
      next: 'debrief'
    },
    'c3c': {
      type: 'consequence', outcomeClass: 'outcome-neutral', outcomeLabel: 'The Review Form Is Yours',
      heading: 'The officer\'s report and your review form are two different records.',
      narrative: [
        'Pushing the Pursuit Review Form onto Pruitt confuses his account of the pursuit with your supervisory review of it. ALO 4.02 assigns the review form to the on-duty supervisor for a reason — it is the command-level look at the event.',
        'Have Pruitt complete his report; you complete the review form.'
      ],
      legal: 'MTPD ALO 4.02: the Pursuit Review Form is the on-duty supervisor\'s responsibility, distinct from the officer\'s pursuit report.',
      next: 'debrief'
    },
    'c3d': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Document Now, Not If Sued',
      heading: 'Waiting for a lawsuit to document a pursuit is exactly backwards.',
      narrative: [
        'The review form exists so the record is made while the facts are fresh and the decisions are clear — not reconstructed after a complaint arrives. Waiting guarantees a thin, late record if litigation ever comes.',
        'Complete the form within 24 hours, regardless of whether anyone complains.'
      ],
      legal: 'MTPD ALO 4.02: the Pursuit Review Form is completed within 24 hours of any pursuit as a matter of course.',
      next: 'debrief'
    },
    'debrief': { type: 'debrief' },
  }
};
