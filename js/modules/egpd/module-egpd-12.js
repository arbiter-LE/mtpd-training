
/* ── Reading: De-escalation ─────────────── */
const READING_DEESCALATION = `
  <div class="content-block">
    <h4>Scenario</h4>
    <h2>A plaza parking lot on Washington St. A man in crisis is pressing a folding knife against his own forearm, telling you "they put something in my arm." He hasn't threatened anyone but himself. What you do in the next sixty seconds either opens a conversation or starts a standoff.</h2>
    <p>This module covers de-escalation as a tactical discipline: the legal standard it operates under, the techniques that work on a subject in crisis, and the professionalism that continues after the scene resolves.</p>
  </div>
  <div class="content-block">
    <h4>The Legal Standard</h4>
    <h2>Reasonableness is judged on the totality — and mental state is part of the totality.</h2>
    <div class="case-law-box">
      <div class="case-title">Graham v. Connor, 490 U.S. 386 (1989)</div>
      <p>Force is evaluated by objective reasonableness from the perspective of a reasonable officer on scene, under the totality of the circumstances: the severity of the crime, whether the subject poses an immediate threat, and whether the subject is resisting or evading. A subject in mental health crisis whose threat is self-directed, who is not advancing, and who is engaging verbally does not present the threat picture that justifies a drawn firearm at initial contact — and prior violence history informs positioning and awareness, not the force applied to current behavior. Tennessee v. Garner (1985) adds the boundary for deadly force against fleeing subjects.</p>
    </div>
    <div class="sop-box">
      <div class="sop-title">EGPD General Order 1.3 — The Department's Own Floor</div>
      <p>"It is the policy of the department that all persons, regardless of their involvement in a situation, shall be treated with humanity, courtesy, and the dignity due any human being, to the extent that such treatment is allowed by the subject's resistance." Officers "shall not be argumentative or engage in acts that might incite a subject to become physically aggressive," and "emphasis shall always be upon obtaining control over the resistance situation rather than forcing submission." Verbal Control is Use of Force Level 1 — the foundation of the continuum.</p>
    </div>
    <div class="case-law-box">
      <div class="case-title">Mental Health Procedures Act — 50 P.S. § 7302</div>
      <p>Officers may initiate an involuntary emergency examination (302) when a person is severely mentally disabled and in need of immediate treatment — a clear and present danger to themselves or others, evidenced by the officer's observations. It is a civil process: transport for psychiatric evaluation, not arrest. That distinction shapes what you say to the subject and the family, and how you write the report. The 302 exists for situations that require it — not as a 10-minute shortcut around de-escalation that is working.</p>
    </div>
  </div>
  <div class="content-block">
    <h4>The Techniques</h4>
    <h2>Time and distance are tactical assets. A subject who is talking is not acting.</h2>
    <p>PERF's ICAT (Integrating Communications, Assessment, and Tactics) model — adopted nationally alongside CIT protocols developed through the Memphis Model — frames de-escalation as a decision-making discipline: when tactically feasible, create time and distance, communicate calmly, and avoid the authority cues that read as threat to a person in psychological crisis. CIT-trained responses measurably reduce use-of-force rates in mental health contacts.</p>
    <ul class="key-points">
      <li><strong>Distance, cover, holstered weapon.</strong> Position at distance with partial cover, hands visible. A drawn firearm and shouted commands are accelerant to a person in psychosis — command presence that works on a rational subject reads as confirmation of their worst fears.</li>
      <li><strong>Calm contact, normal volume, a name.</strong> "I'm not here to hurt you. My name's [yours]. What's yours?" A subject who gives you his name has started a conversation. Slow the pace. The goal at first contact is contact — not compliance.</li>
      <li><strong>Hold your backup.</strong> When tactical movement makes a subject in crisis tighten his grip, tactical movement has become a negative variable. Signal hold, keep talking, and request the right escalation: CIT officers or a mobile crisis team — not closure. A forced takedown on a decompensating subject with a blade against his own body is predictably dangerous to everyone, including your officers.</li>
      <li><strong>Ignore the gallery.</strong> "Just tase him and get it over with" is not a tactical input. Crowd management belongs to a secondary officer; force decisions belong to the circumstances, policy, and law.</li>
      <li><strong>Barricaded, no confirmed weapon, talking through a door:</strong> time, distance, communication. No ultimatums. Keep them engaged while specialized resources respond — a talking subject is within patrol scope to manage.</li>
    </ul>
  </div>
  <div class="content-block">
    <h4>After the Scene</h4>
    <h2>The professionalism doesn't go off when the handcuffs go on.</h2>
    <p>An upset family member demanding your badge number in front of a crowd is the last de-escalation of the call. Provide your name and badge number without hesitation — it is required, and hesitation reads as concealment. Acknowledge the concern without defensiveness, explain the complaint process, offer your supervisor. Do not litigate the incident on the sidewalk: detailed justifications under emotional pressure look defensive, invite argument, and can create inconsistencies with your official report. Your body camera, radio traffic, and documentation are where your conduct is recorded — facilitating the complaint process is what confidence in sound conduct looks like.</p>
    <p>And when a colleague asks why you spent 45 minutes on a call you could have "302'd in ten": the de-escalation worked. The subject left calm, connected to services, without unnecessary trauma — a better outcome for him, the community, and the department. Defending the professional use of de-escalation, by name and with reasoning, is how a culture that values it gets built.</p>
    <button class="btn-launch" onclick="startScenario('egpd-de-escalation')">Proceed to Scenario Exercise →</button>
  </div>
`;

/* ── Scenario: De-escalation ────────────── */
const SCENARIO_DEESCALATION = {
  title: 'De-escalation',
  location: 'Plaza Parking Lot, Washington St, East Greenville Borough, PA',
  totalDecisions: 3,
  nodes: {
    start: {
      type: 'scene',
      time: '1547',
      weather: 'Overcast, 61°F',
      unit: 'Unit 7903',
      narrative: [
        'Dispatch: "Unit 7903, respond to the plaza on Washington St — parking lot, male subject acting erratically. Caller says he\'s partially clothed, pacing, not responding to people talking to him. No weapons reported. No threats to bystanders."',
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
        '"Hey. I\'m not here to hurt you. My name\'s Officer Hale. What\'s your name?"',
        'He stopped pacing. "Marcus."',
        '"Marcus. I can see something\'s wrong. I\'m not going to rush you." You maintained eye contact. The knife was still in his hand. But he was talking. The window was open.'
      ],
      legal: 'PERF\'s Integrating Communications, Assessment, and Tactics (ICAT) Critical Decision-Making Model: When tactically feasible, officers should use de-escalation techniques before resorting to force — creating time and distance, using calm and non-threatening communication, and avoiding commands that may trigger further distress in persons experiencing mental health crisis. CIT (Crisis Intervention Team) protocols, developed through the Memphis Model and adopted nationally, apply directly to encounters like this one.',
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

function getDeescalationQuestions() {
  return [
    {
      scenario: 'You arrive at a parking lot where a male subject is pacing erratically, speaking to himself, and holding a knife against his own forearm. He is not advancing toward anyone. Bystanders have backed away.',
      text: 'What is the correct initial response?',
      options: [
        'Draw your firearm and order the subject to drop the knife immediately.',
        'Establish distance and cover, keep your weapon holstered, and initiate calm verbal contact.',
        'Wait for backup to arrive before making any contact.',
        'Attempt to disarm the subject immediately before the situation escalates.'
      ],
      correct: 1,
      feedback: 'Correct. The subject poses no immediate threat to bystanders, and the threat is currently self-directed. Establishing distance and cover — without drawing — and initiating calm verbal contact is both tactically sound and consistent with PERF\'s ICAT model and CIT research on encounters with subjects in mental health crisis. Drawing a firearm on a person in psychological crisis whose threat is not directed at officers typically escalates the encounter. De-escalation techniques should be used when tactically feasible, which they are here.'
    },
    {
      scenario: 'Graham v. Connor (1989) established the legal standard for evaluating officer use of force. What is that standard?',
      text: 'Under Graham v. Connor, use of force is evaluated by:',
      options: [
        'The subjective good faith of the officer at the time of the incident.',
        'Whether the force used was objectively reasonable from the perspective of a reasonable officer on the scene, given the totality of circumstances.',
        'Whether the officer followed department policy to the letter.',
        'Whether the subject sustained injury as a result of the force.'
      ],
      correct: 1,
      feedback: 'Correct. Graham v. Connor established the objective reasonableness standard — the constitutionality of force is evaluated from the perspective of a reasonable officer on the scene, given the totality of circumstances known at that moment. Key factors include: the severity of the crime, whether the subject poses an immediate threat, and whether the subject is resisting or evading. The standard is not perfection — it is objective reasonableness under the specific circumstances. Mental health status is one of those circumstances.'
    },
    {
      scenario: 'You have established verbal contact with a subject in mental health crisis who is holding a knife. Backup arrives and one officer moves to a flanking position. The subject notices and grips the knife more tightly.',
      text: 'How should you direct the response?',
      options: [
        'Signal backup to close in immediately — more personnel reduces risk.',
        'Signal backup to hold and maintain their current position. Continue verbal contact. Request crisis intervention resources.',
        'Have backup draw their weapons to establish overwhelming force presence.',
        'Step back and cede contact to the arriving officers who may have more experience.'
      ],
      correct: 1,
      feedback: 'Correct. When a subject in crisis reacts to tactical movement by increasing their defensive posture, tactical movement has become a negative variable. Hold position and maintain what is working: verbal contact. Closing in tactically on an agitated, armed, psychologically fragile subject without exhausting verbal de-escalation increases the probability of a use-of-force incident significantly. Requesting crisis intervention resources — a CIT officer or mobile crisis team — is the appropriate escalation, not tactical closure.'
    },
    {
      scenario: 'The Pennsylvania Mental Health Procedures Act (50 P.S. § 7302) authorizes police to initiate an involuntary emergency examination (302). What standard must be met?',
      text: 'A 302 involuntary examination requires that the person:',
      options: [
        'Has committed a crime and appears to have a mental health condition.',
        'Is severely mentally disabled and in need of immediate treatment — presenting a clear and present danger to themselves or others.',
        'Has been voluntarily diagnosed with a mental health condition.',
        'Has refused to follow officer commands on a previous call.'
      ],
      correct: 1,
      feedback: 'Correct. A 302 petition requires that the person be severely mentally disabled and in need of immediate treatment — typically evidenced by a clear and present danger to themselves or others based on the officer\'s observations. This is a civil mental health process, not an arrest. The subject is transported to a psychiatric facility for evaluation, not to a criminal detention facility. Understanding this distinction matters for how you communicate the process to the subject and their family, and it affects how you write your report.'
    },
    {
      scenario: 'During a verbal de-escalation attempt, you are approached by a bystander who says "just tase him and get it over with." The subject is not advancing, is still engaging verbally, and has not cut himself.',
      text: 'What is the correct response?',
      options: [
        'Consider the suggestion — bystander observations can provide tactical intelligence.',
        'Maintain focus on the subject and direct a partner or bystander management unit to move the crowd back. Do not let bystander pressure influence tactical decision-making.',
        'Use the taser immediately — public expectation for fast resolution creates accountability.',
        'Ask the bystander to leave and then reassess whether the taser is appropriate.'
      ],
      correct: 1,
      feedback: 'Correct. Tactical decisions are made based on the circumstances of the encounter, department policy, and law — not bystander pressure or expectations for speed. A subject who is not advancing, is engaging verbally, and has not harmed himself does not meet the force threshold that would justify CEW deployment. Crowd management is a legitimate tactical concern, but managing the crowd is the responsibility of a secondary officer — not an excuse to abandon de-escalation that is working.'
    },
    {
      scenario: 'A subject is barricaded inside a residence and has been making statements about not wanting to live. No weapons have been confirmed. They are communicating with officers through a door.',
      text: 'Which de-escalation principle is most critical in this scenario?',
      options: [
        'Establish authority immediately — the subject needs to understand they have no option but to comply.',
        'Prioritize time, distance, and communication. Maintain a calm, unhurried tone. Keep the subject talking. Avoid ultimatums. Allow time for their emotional state to stabilize.',
        'Attempt to enter the residence to remove the immediate threat of self-harm.',
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
        'Prior history informs your situational awareness and tactical positioning without determining the force level applied to current behavior. De-escalate based on current conduct; maintain awareness based on background.',
        'Disregard prior history — each contact must be evaluated on its own without bias.',
        'Inform the subject that you are aware of their history so they understand your level of preparation.'
      ],
      correct: 1,
      feedback: 'Correct. Prior history is relevant context for officer positioning, backup, and awareness — it is not a substitute for evaluating current behavior. A subject with a violence history who is currently agitated but not threatening does not receive a higher force level based on history alone. Courts apply Graham v. Connor to the specific facts of the specific encounter. De-escalate based on what is happening now; position yourself based on what you know from background. These are not mutually exclusive.'
    },
    {
      scenario: 'After a successful de-escalation in which a § 302 involuntary commitment was avoided, you return to the station to complete your paperwork. A colleague asks: "Why did you spend 45 minutes on that call? You could have 302\'d them in 10 minutes and been done."',
      text: 'Which response best reflects the professional value of de-escalation?',
      options: [
        '"You\'re right — I should have moved faster."',
        '"The de-escalation worked. He left the scene calm and connected to follow-up services. That outcome is better for him and for the community, and it avoids an involuntary commitment that may not have been legally warranted."',
        '"It felt like the right call but I\'m not sure I can always do it that way."',
        '"Some calls just take longer — it\'s not always about speed."'
      ],
      correct: 1,
      feedback: 'Correct. The professional response articulates the value of the outcome — not just the time spent. A subject who leaves a scene calm, with services connected, and without unnecessary trauma from involuntary commitment is a better outcome for public trust, community health, and department resources. § 302 authority exists for situations that require it — not as a shortcut when de-escalation is working. Defending the professional use of de-escalation, by name and with reasoning, contributes to a culture that values it.'
    },
  ];
}

/* ══════════════════════════════════════════
   SUPERVISOR OVERLAY — De-escalation (EGPD)
   De-escalation survives only if the department rewards it —
   a supervisory choice. Review force against the Graham threat picture.
══════════════════════════════════════════ */
const SUPERVISOR_DEESCALATION = `
  <div class="content-block">
    <h4>Supervisor Focus</h4>
    <h2>De-escalation is a tactic your officers will use only if the department actually values it. Whether it does is a choice you make every shift.</h2>
    <p>Officers learn fast what the department truly rewards — speed and a cleared call, or the forty-five minutes that ended without force. The "you could've 302'd him in ten" pressure in this module often comes from a supervisor, and your answer to it is the culture. On a crisis call your job is to resource and protect the de-escalation; after it, your job is to review the force decision honestly and praise the restraint the metrics will never capture. A department that values de-escalation is built one debrief at a time, by the supervisor who names a no-force outcome as the win it is.</p>
  </div>
  <div class="content-block">
    <h4>Review the Force Decision Against the Threat Picture</h4>
    <p>When you review a use of force — or a use of force avoided — on a subject in crisis, the lens is Graham v. Connor: objective reasonableness on the totality, including the subject's mental state and whether the threat is self-directed or aimed at others. A subject who is not advancing, is engaging verbally, and is holding a blade against his own arm does not present the threat picture that justifies a drawn firearm at initial contact — and a report that drew or closed on that picture is one you examine. Prior violence history informs positioning and awareness, not the force applied to current behavior, so watch for reports that import history to justify present force. Tennessee v. Garner sets the deadly-force boundary for fleeing subjects. The question on review is always the threat as it existed at the moment force was used — not the officer's discomfort with the situation.</p>
  </div>
  <div class="content-block">
    <h4>Resource and Protect — Do Not Rush</h4>
    <p>On scene you own the tempo and the resources. The most common way a workable crisis contact goes bad is tactical movement the subject reads as threat — a flanking officer who makes him tighten his grip. The supervisory move is to hold that movement, protect the conversation that is working, and request the right escalation: CIT officers or a mobile crisis team, not closure. De-escalation that is producing engagement is not delay, and "the situation has gone on long enough" is impatience, not a tactical assessment. Time and distance are assets you protect, and the 302 is for situations that require it under 50 P.S. § 7302 — not a ten-minute shortcut around a de-escalation that is working.</p>
  </div>
  <div class="content-block">
    <h4>The Control Points on a Crisis Force Scene</h4>
    <ul class="key-points">
      <li><strong>Hold the gallery out of the decision.</strong> "Just tase him" from a bystander is not a tactical input, and crowd management is a secondary officer's job — keep the force decision with the circumstances, policy, and law.</li>
      <li><strong>Calibrate to the threat presented.</strong> A self-directed knife and a talking subject is not a SWAT call or a takedown; escalating the response to the weapon rather than the behavior manufactures the danger.</li>
      <li><strong>Require the de-escalation to be documented.</strong> The report and radio traffic should show the time taken, the techniques used, the resources requested, and why force was or was not used — that record protects the officer and the department and models the standard.</li>
      <li><strong>Know the 302 line.</strong> Confirm any involuntary commitment rests on a clear-and-present-danger observation under 50 P.S. § 7302, not on convenience.</li>
    </ul>
  </div>
  <div class="content-block">
    <h4>The Post-Incident Interaction Is Part of the Call</h4>
    <p>The last de-escalation of a crisis call is often the upset family member demanding a badge number in front of a crowd, and how your officers handle it is part of the record. Reinforce the standard: provide name and badge number without hesitation — it is required, and hesitation reads as concealment — acknowledge the concern without defensiveness, explain the complaint process, and offer a supervisor, which may be you. Coach officers not to litigate the incident on the sidewalk; detailed justifications under emotional pressure look defensive and can create inconsistencies with the official report. The body camera, the radio traffic, and the documentation are where conduct is recorded, and facilitating a complaint is what confidence in sound conduct looks like. When the supervisor offered is you, model exactly that.</p>
  </div>
  <div class="content-block">
    <h4>Build the Culture by Defending It Out Loud</h4>
    <p>The metrics on a shift count arrests and cleared calls; they do not count the standoff that ended with a man setting a knife down and getting treatment. That gap is yours to close. Defend the professional use of de-escalation by name and with reasoning — in debriefs, in evaluations, in how you answer the officer who asks why a colleague spent forty-five minutes — because the only thing that turns de-escalation from a slogan into a habit is a supervisor who treats the no-force outcome as the best police work on the shift. CIT-trained responses measurably reduce use of force in mental health contacts; your recognition is what makes officers reach for them.</p>
  </div>
`;

function getDeescalationSupervisorQuestions() {
  return [
    {
      scenario: 'An officer spent forty-five minutes de-escalating a subject in crisis to a no-force outcome — the subject set down a knife and was connected to services. A colleague remarks that the officer could have "302\'d him in ten minutes and been done."',
      text: 'What is the correct supervisory stance?',
      options: [
        'Agree — efficiency matters, and a faster 302 would have cleared the call sooner.',
        'Name the outcome as the win it is: a subject who left calm and connected to services, without unnecessary trauma or an involuntary commitment that may not have been warranted, is the best police work on the shift — and de-escalation only becomes a habit if the supervisor rewards it.',
        'Stay neutral — it is not a supervisor\'s place to weigh in on how long a call took.',
        'Counsel the officer to be faster next time to keep the unit available.'
      ],
      correct: 1,
      feedback: 'Correct. Officers learn what the department actually rewards. A no-force outcome with the subject connected to services is the win, and the 302 is for situations that require it — not a shortcut around a working de-escalation. A supervisor who names that outcome as excellent police work is how a de-escalation culture gets built.'
    },
    {
      scenario: 'A report shows an officer drew a firearm at initial contact on a subject who was holding a knife against his own forearm, not advancing, and engaging verbally with officers.',
      text: 'How should you assess the force decision on review?',
      options: [
        'Approve it — any subject holding a weapon justifies a drawn firearm.',
        'Examine it under Graham v. Connor: a self-directed threat, a subject who is not advancing and is engaging verbally, does not present the threat picture that justifies a drawn firearm at initial contact, and de-escalation is required where tactically feasible.',
        'Approve it because the officer felt unsafe.',
        'Refer it straight to discipline without review.'
      ],
      correct: 1,
      feedback: 'Correct. Graham v. Connor judges force by objective reasonableness on the totality, including the subject\'s mental state and whether the threat is self-directed. A non-advancing, verbally engaging subject with a self-directed knife does not justify a drawn firearm at initial contact, and the reviewer examines that decision against the actual threat picture.'
    },
    {
      scenario: 'A use-of-force report on a subject in crisis justifies the force primarily by citing the subject\'s prior history of violence, although the subject\'s behavior at the time had not crossed into an immediate threat.',
      text: 'How should the prior history factor into your review?',
      options: [
        'Prior violence history justifies a higher force level regardless of current behavior.',
        'Flag the reasoning: prior history informs positioning and awareness, not the force applied to current behavior. Graham evaluates the threat as it existed at the moment force was used, so importing history to justify present force is a review concern.',
        'Disregard the history entirely as irrelevant bias.',
        'Approve it because any history of violence makes force reasonable.'
      ],
      correct: 1,
      feedback: 'Correct. Prior history is legitimate context for positioning, backup, and awareness — not a substitute for evaluating current behavior. Graham v. Connor applies to the specific facts of the specific encounter, so a report that leans on history to justify force against a non-threatening present behavior is one the reviewer flags.'
    },
    {
      scenario: 'You are supervising a crisis scene where an officer has built rapport with an armed subject. A flanking officer\'s movement causes the subject to tighten his grip on the knife.',
      text: 'What is the right supervisory move?',
      options: [
        'Order the flanking officer to keep closing to take the subject into custody quickly.',
        'Signal the flanking officer to hold, protect the conversation that is working, and request CIT or a mobile crisis team — tactical movement that escalates the subject has become a negative variable, and closure is not the goal.',
        'Have all officers draw weapons to establish overwhelming presence.',
        'Pull the contact officer back and restart the approach with fresh personnel.'
      ],
      correct: 1,
      feedback: 'Correct. When tactical movement makes a subject in crisis tighten up, the movement has become a negative variable. The supervisor holds it, protects the working conversation, and requests the right escalation — CIT or mobile crisis — rather than tactical closure on an armed, decompensating subject.'
    },
    {
      scenario: 'At a crisis scene, bystanders are loudly urging officers to "just tase him." The subject is self-directed with a knife, not advancing, and is still talking to officers.',
      text: 'How should you direct the response?',
      options: [
        'Factor in the bystander pressure — public expectation for a fast resolution matters.',
        'Keep the force decision with the circumstances, policy, and law: bystander pressure is not a tactical input, crowd management belongs to a secondary officer, and a self-directed, talking subject does not meet the threshold for a CEW deployment.',
        'Deploy the CEW to satisfy the crowd and resolve the scene quickly.',
        'Clear the scene of officers until the crowd disperses.'
      ],
      correct: 1,
      feedback: 'Correct. Tactical decisions rest on the circumstances, policy, and law — not bystander pressure or demands for speed. Crowd management is a secondary officer\'s responsibility, and a non-advancing, verbally engaging subject whose threat is self-directed does not meet the force threshold that would justify a CEW.'
    },
    {
      scenario: 'A report documents that an officer initiated a 302 involuntary commitment to resolve a crisis call quickly, even though the subject was calm, engaging verbally, and de-escalating.',
      text: 'What should your review confirm?',
      options: [
        'Nothing — a 302 is always justified when an officer wants to resolve a call.',
        'Confirm the 302 rests on a clear-and-present-danger observation under 50 P.S. § 7302: it is a civil tool for situations that require it, not a shortcut around a de-escalation that is working, and a 302 used for convenience is a review concern.',
        'Approve it because any mental health crisis automatically meets the 302 standard.',
        'Approve it because the call was resolved without a use of force.'
      ],
      correct: 1,
      feedback: 'Correct. A 302 under 50 P.S. § 7302 requires a clear and present danger to self or others based on the officer\'s observations. It exists for situations that require it — not as a ten-minute shortcut around a working de-escalation. The reviewer confirms the documented observations actually support the involuntary commitment.'
    },
    {
      scenario: 'After a crisis call, an upset family member loudly demands an officer\'s badge number and announces an intent to file a complaint, in front of a gathered crowd.',
      text: 'What standard should you reinforce — and model when the supervisor offered is you?',
      options: [
        'Have the officer refuse to engage and walk away to avoid escalation.',
        'Provide name and badge number without hesitation, acknowledge the concern without defensiveness, explain the complaint process, and offer a supervisor — without litigating the incident on the sidewalk, since the body camera and documentation are where conduct is recorded.',
        'Have the officer explain in detail why every action was justified to settle the matter on scene.',
        'Tell the family member that complaints are not accepted at the scene.'
      ],
      correct: 1,
      feedback: 'Correct. The post-incident interaction is the last de-escalation of the call. Providing identifying information without hesitation, acknowledging the concern, explaining the complaint process, and offering a supervisor is the standard — and litigating the incident on the sidewalk looks defensive and can create inconsistencies with the report. When the supervisor offered is you, model exactly that.'
    },
    {
      scenario: 'Your shift metrics count arrests and cleared calls but do not capture the standoff that ended with a subject voluntarily surrendering a weapon and getting treatment.',
      text: 'What is the supervisor\'s role in light of that gap?',
      options: [
        'Accept the metrics as the complete picture of performance.',
        'Close the gap by defending de-escalation explicitly — in debriefs, evaluations, and in answering the "why did it take so long" question — because recognition is what turns de-escalation from a slogan into a habit, and CIT-trained responses measurably reduce use of force in mental health contacts.',
        'Adjust the metrics to penalize calls that take longer than average.',
        'Leave recognition to formal awards and stay out of it day to day.'
      ],
      correct: 1,
      feedback: 'Correct. The metrics will not count the no-force standoff that ended well, so the supervisor closes that gap by defending de-escalation by name and with reasoning. That recognition is what makes officers reach for de-escalation, which CIT research shows measurably reduces use of force in mental health encounters.'
    },
  ];
}

/* ══════════════════════════════════════════
   SUPERVISOR SCENARIO — De-escalation (EGPD)
   Supervising Officer Doyle's Washington St plaza crisis, reviewing
   the force decision, and setting the culture.
══════════════════════════════════════════ */
const SCENARIO_DEESCALATION_SUP = {
  id: 'scenario-deescalation-sup',
  title: 'Supervisor — Washington St Plaza Crisis',
  location: 'Washington St, East Greenville Borough, PA',
  totalDecisions: 3,
  nodes: {
    'start': {
      type: 'scene', time: '15:47', weather: 'Overcast / 61°F', unit: 'Field Supervisor',
      narrative: [
        'You are supervising the plaza on Washington St, where Officer Doyle has made contact with a man in crisis who is pressing a folding knife against his own forearm. The threat is self-directed; the subject is talking to Doyle.',
        'De-escalation is a tactic your officers will use only if the department values it — and whether it does is a choice you make every shift. Today you resource the scene, review the force decision, and set the culture after.'
      ],
      next: 'd1'
    },
    'd1': {
      type: 'decision', decisionNumber: 1,
      situation: 'Doyle has built rapport — the subject is engaging and hasn\'t cut himself. A flanking officer shifts position, and the subject notices and tightens his grip on the knife.',
      question: 'How do you direct the response?',
      options: [
        { text: 'Signal the flanking officer to hold, protect the conversation that\'s working, and request CIT or a mobile crisis team — tactical movement that escalates the subject has become a negative variable.', next: 'c1a', quality: 'good', shortLabel: 'Held movement, protected the conversation' },
        { text: 'Order the flanking officer to keep closing and take the subject into custody.', next: 'c1b', quality: 'bad', shortLabel: 'Ordered tactical closure' },
        { text: 'Have all officers draw their weapons to establish a show of force.', next: 'c1c', quality: 'bad', shortLabel: 'Ordered a show of force' },
        { text: 'Pull Doyle and restart the contact with fresh personnel.', next: 'c1d', quality: 'bad', shortLabel: 'Swapped the contact officer' },
      ]
    },
    'c1a': {
      type: 'consequence', outcomeClass: 'outcome-good', outcomeLabel: 'Protected What Was Working',
      heading: 'When movement makes a subject in crisis tighten up, the movement is the problem.',
      narrative: [
        'You signal the flanking officer to hold and keep Doyle on the conversation, and you request CIT and mobile crisis. Tactical movement that causes a decompensating subject to tighten his grip has become a negative variable, and closure is not the goal — the working conversation is.',
        'A few minutes later the subject sets the knife down for the arriving crisis officer. No force, no injury, because you protected the one thing that was working.'
      ],
      legal: 'CIT/ICAT practice and GO 1.3 (control over the resistance situation rather than forcing submission): time and distance are tactical assets; tactical closure on an armed, decompensating subject is predictably dangerous.',
      next: 'd2'
    },
    'c1b': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Forced It',
      heading: 'Tactical closure on a self-directed, decompensating subject is how people get hurt.',
      narrative: [
        'Ordering the flanking officer to keep closing abandons the rapport Doyle built and forces contact on a subject who is fearful and disorganized. A person in psychotic decompensation with a blade against his own body does not respond to closure the way a rational, resistant subject does — the predictable result is the subject cutting himself, an officer injured, and a use of force that was avoidable.',
        'Time and rapport were the tools. Closure threw them away.'
      ],
      legal: 'Graham v. Connor and CIT practice: forced contact on a self-directed, engaging subject does not meet the threshold for custody without exhausting de-escalation.',
      next: 'd2'
    },
    'c1c': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Accelerant',
      heading: 'A show of force on a person in crisis confirms their worst fears.',
      narrative: [
        'Ordering officers to draw on a man holding a knife to his own arm — not advancing, engaging verbally — is accelerant. Command presence that works on a rational subject reads as confirmation of catastrophe to someone in psychosis, and the encounter goes from a workable contact to a standoff.',
        'Reduce stimulation, hold positions, and protect the conversation; don\'t escalate the display.'
      ],
      legal: 'CIT practice and GO 1.3: drawn weapons and shows of force escalate persons in psychological crisis; the calibrated response is distance, cover, and continued calm contact.',
      next: 'd2'
    },
    'c1d': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Reset the Rapport to Zero',
      heading: 'Swapping the contact officer mid-crisis forces the subject to start over with a stranger.',
      narrative: [
        'Pulling Doyle and inserting fresh personnel discards the fragile rapport that is the only thing keeping this contained. A person in crisis re-engaging with a new officer usually re-escalates, not resets cleanly.',
        'Support the officer who has the connection; resource him with CIT and positioning, don\'t replace him.'
      ],
      legal: 'CIT practice: continuity of a single primary voice is central; disrupting an effective contact risks re-escalation.',
      next: 'd2'
    },
    'd2': {
      type: 'decision', decisionNumber: 2,
      situation: 'On a similar call last month, you\'re reviewing the report. The officer drew his firearm at initial contact on a subject who was holding a knife to his own forearm, not advancing, and engaging verbally with officers.',
      question: 'How do you assess the force decision?',
      options: [
        { text: 'Examine it under Graham v. Connor — a self-directed threat, a subject not advancing and engaging verbally, does not present the threat picture that justifies a drawn firearm at initial contact, and de-escalation is required where tactically feasible.', next: 'c2a', quality: 'good', shortLabel: 'Examined it against the threat picture' },
        { text: 'Approve it — any subject holding a weapon justifies a drawn firearm.', next: 'c2b', quality: 'bad', shortLabel: 'Approved on the weapon alone' },
        { text: 'Approve it because the officer felt unsafe.', next: 'c2c', quality: 'bad', shortLabel: 'Approved on subjective fear' },
        { text: 'Refer it straight to discipline without reviewing the facts.', next: 'c2d', quality: 'bad', shortLabel: 'Jumped to discipline' },
      ]
    },
    'c2a': {
      type: 'consequence', outcomeClass: 'outcome-good', outcomeLabel: 'Judged It on the Facts',
      heading: 'Graham asks about the threat as it existed — not the officer\'s discomfort.',
      narrative: [
        'You evaluate the force under Graham v. Connor: objective reasonableness on the totality, including the subject\'s mental state and whether the threat is self-directed. A non-advancing subject, engaging verbally, with a knife against his own arm does not present the threat picture that justifies a drawn firearm at initial contact, and de-escalation was required where feasible.',
        'The question on review is always the threat at the moment force was used — and you held it to that.'
      ],
      legal: 'Graham v. Connor (1989): objective reasonableness on the totality, including mental state and whether the threat is self-directed; de-escalation is required where tactically feasible.',
      next: 'd3'
    },
    'c2b': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'A Weapon Isn\'t the Whole Picture',
      heading: 'Holding a weapon doesn\'t, by itself, justify a drawn firearm at initial contact.',
      narrative: [
        'Approving on the presence of a weapon alone skips the analysis Graham requires. A self-directed threat, a subject not advancing and engaging verbally, is a different threat picture than a subject attacking — and treating any weapon as automatic justification for a drawn firearm endorses exactly the escalation that gets crisis subjects killed.',
        'Evaluate the threat as it existed, and whether de-escalation was feasible.'
      ],
      legal: 'Graham v. Connor (1989): force is judged on the totality and the actual threat; a self-directed, non-advancing subject is not the same threat picture as an attack.',
      next: 'd3'
    },
    'c2c': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Subjective Fear Isn\'t the Test',
      heading: 'Graham is objective — what a reasonable officer faced, not what this one felt.',
      narrative: [
        'Approving because the officer felt unsafe substitutes a subjective standard for the objective one Graham sets. The review asks whether a reasonable officer, on these facts — self-directed threat, no advance, verbal engagement — would have drawn at initial contact, not whether this officer was afraid.',
        'Assess the objective threat picture and the feasibility of de-escalation.'
      ],
      legal: 'Graham v. Connor (1989): the standard is objective reasonableness from the perspective of a reasonable officer on scene, not the officer\'s subjective fear.',
      next: 'd3'
    },
    'c2d': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Review First',
      heading: 'Skipping the analysis to discipline gets the order wrong.',
      narrative: [
        'Referring it straight to discipline without examining the facts skips the review the decision requires. There may be a real problem here — a drawn firearm on a self-directed, engaging subject — but the finding has to come from applying Graham to the facts, and the outcome (training versus discipline) follows from that.',
        'Examine it against the threat picture first, then match the response to the finding.'
      ],
      legal: 'Graham v. Connor (1989): the force is analyzed on its facts; the supervisory outcome follows the finding, not a reflex to discipline.',
      next: 'd3'
    },
    'd3': {
      type: 'decision', decisionNumber: 3,
      situation: 'In a squad debrief, two outcomes sit side by side: Doyle spent forty-five minutes de-escalating the plaza subject to a no-force resolution — the man set the knife down and was connected to services — while another officer, on a separate call, made a risky high-speed apprehension that barely stayed within policy.',
      question: 'What does your debrief reinforce?',
      options: [
        { text: 'Reinforce Doyle\'s disciplined de-escalation as the model — public and officer safety is the priority, and your recognition is what makes officers reach for it; CIT-trained responses measurably reduce use of force.', next: 'c3a', quality: 'good', shortLabel: 'Praised the disciplined de-escalation' },
        { text: 'Praise only the apprehension — results are what matter.', next: 'c3b', quality: 'bad', shortLabel: 'Praised only the apprehension' },
        { text: 'Criticize Doyle for not finding a way to make an arrest.', next: 'c3c', quality: 'bad', shortLabel: 'Criticized the no-force outcome' },
        { text: 'Stay neutral on both to avoid second-guessing.', next: 'c3d', quality: 'risky', shortLabel: 'Said nothing about either' },
      ]
    },
    'c3a': {
      type: 'consequence', outcomeClass: 'outcome-good', outcomeLabel: 'Rewarded the Right Thing',
      heading: 'The metrics won\'t count the no-force standoff that ended well — so you do.',
      narrative: [
        'You name Doyle\'s outcome as the best police work on the shift: a man who left calm, connected to services, without unnecessary trauma or an involuntary commitment that may not have been warranted. Public and officer safety is the priority, and what you praise is what your officers will reach for on the next call.',
        'Defending de-escalation by name and with reasoning is the only thing that turns it from a slogan into a habit — and CIT-trained responses measurably reduce use of force in these encounters.'
      ],
      legal: 'GO 1.3 (obtaining control over forcing submission) and CIT research: de-escalation reduces use-of-force rates; supervisory recognition drives whether officers use it.',
      next: 'debrief'
    },
    'c3b': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Trained the Wrong Instinct',
      heading: 'Praising only the apprehension teaches officers that results beat restraint.',
      narrative: [
        'Holding up the risky apprehension as the win, while the disciplined no-force outcome goes unmentioned, tells the squad that speed and an arrest matter more than the safest resolution. That is exactly the instinct that produces avoidable force.',
        'Recognize the disciplined de-escalation — that is the behavior you want repeated.'
      ],
      legal: 'GO 1.3 and CIT research: rewarding only results trains the wrong instinct; the no-force outcome is the model.',
      next: 'debrief'
    },
    'c3c': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Punished the Best Outcome',
      heading: 'Criticizing a no-force resolution tells officers de-escalation isn\'t valued here.',
      narrative: [
        'Faulting Doyle for not finding a way to arrest a man who voluntarily surrendered a weapon and got help inverts the priority. Public and officer safety is the directive\'s highest priority, and a calm, connected-to-services resolution is the outcome the department wants.',
        'Praise it. What you criticize, your officers stop doing.'
      ],
      legal: 'GO 1.3: the safety of the public and persons involved is the highest priority; a voluntary, no-force resolution is the preferred outcome.',
      next: 'debrief'
    },
    'c3d': {
      type: 'consequence', outcomeClass: 'outcome-neutral', outcomeLabel: 'Silence Sends a Message Too',
      heading: 'Saying nothing leaves the metrics to do the talking — and they favor the arrest.',
      narrative: [
        'Staying neutral feels safe, but it lets the unspoken scoreboard — arrests and cleared calls — define success, which quietly favors the risky apprehension over the no-force outcome. The de-escalation that the numbers will never capture goes unrecognized.',
        'Close that gap out loud: name the disciplined de-escalation as the model.'
      ],
      legal: 'GO 1.3 and CIT research: supervisory recognition is what makes de-escalation a habit; silence cedes the message to the metrics.',
      next: 'debrief'
    },
    'debrief': { type: 'debrief' }
  }
};
