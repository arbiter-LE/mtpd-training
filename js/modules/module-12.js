
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
      feedback: 'Correct. The subject poses no immediate threat to bystanders, and the threat is currently self-directed. Establishing distance and cover — without drawing — and initiating calm verbal contact is both tactically sound and policy-compliant. Drawing a firearm on a person in psychological crisis whose threat is not directed at officers typically escalates the encounter. MTPD ALO 5.4 requires de-escalation techniques when tactically feasible, which they are here.'
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
