══════════════════════════════════════════ */
const SCENARIO_USE_OF_FORCE = {
  id: 'scenario-use-of-force',
  title: 'Sumneytown Pike — Domestic Disturbance',
  location: 'Sumneytown Pike, Marlborough Township, PA',
  totalDecisions: 3,
  nodes: {
    'start': {
      type: 'scene', time: '19:43', weather: 'Dusk / Clear', unit: 'Patrol Unit 5',
      narrative: [
        'You respond to a domestic disturbance call on Sumneytown Pike. A neighbor reported a loud argument. As you arrive, you observe a male subject — later identified as 38-year-old resident — standing on the front porch, yelling toward the front door.',
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

function getUseOfForceQuestions() {
  return [
    {
      scenario: 'You respond to a domestic disturbance. A subject advances toward you holding a metal flashlight raised at shoulder height. He is approximately 25 feet away and not responding to your presence.',
      text: 'Under Graham v. Connor, which three factors are courts required to consider when evaluating the reasonableness of a use of force?',
      options: [
        'The officer\'s intent, the subject\'s criminal history, and whether the subject was injured.',
        'The severity of the crime at issue, whether the subject poses an immediate threat, and whether the subject is actively resisting or evading.',
        'Whether verbal commands were given, whether a supervisor was notified, and whether the officer followed training.',
        'The number of officers present, the subject\'s mental state, and whether force was the last resort.'
      ],
      correct: 1,
      feedback: 'Correct. Graham v. Connor (1989) established the objective reasonableness standard and requires courts to evaluate: (1) the severity of the crime at issue, (2) whether the subject poses an immediate threat to officers or others, and (3) whether the subject is actively resisting arrest or attempting to evade by flight. These three factors are the foundation of every use of force analysis in American law enforcement.'
    },
    {
      scenario: 'After a Taser deployment during a domestic disturbance call, your supervisor instructs you to complete a use of force report. Your body camera captured the full incident.',
      text: 'Under Pennsylvania Act 57 of 2020, which of the following is a reportable use of force under Pennsylvania law?',
      options: [
        'Only deployments of CEW (Taser), OC spray, or physical control techniques resulting in injury.',
        'Any intentional use of force against a person, including display of a weapon and verbal commands used to compel compliance in a threatening encounter.',
        'Only incidents involving injury to the subject or the officer.',
        'Any use of force that results in a complaint by the subject or a civilian witness.'
      ],
      correct: 1,
      feedback: 'Correct. PA Act 57 of 2020 defines reportable use of force broadly to include any intentional act used to compel compliance — including display of a weapon and verbal commands in circumstances where non-compliance would result in physical force. When in doubt, document. A report filed and not needed is far less damaging than a report that should have been filed and wasn\'t.'
    },
    {
      scenario: 'A use of force report states: "Subject was aggressive and I feared for my safety. I used verbal commands to gain compliance." Defense counsel argues the report does not satisfy the Graham standard.',
      text: 'Why is this documentation legally insufficient?',
      options: [
        'It fails to note the number of verbal commands issued and the exact words used.',
        'It uses subjective, conclusory language rather than the specific, articulable facts required to establish objective reasonableness.',
        'It does not include the subject\'s criminal history or prior interactions with the department.',
        'It is legally sufficient — an officer\'s stated fear for safety satisfies Graham v. Connor.'
      ],
      correct: 1,
      feedback: 'Correct. Graham v. Connor is evaluated from the perspective of a reasonable officer based on facts — not the officer\'s subjective feelings. "Feared for my safety" is a conclusion. A legally defensible report documents the specific facts: distance, the subject\'s actions, the weapon or threat, the speed of advance, and how each Graham factor applies. Courts and juries evaluate facts, not feelings.'
    },
    {
      scenario: 'You draw your firearm in response to a subject advancing with a raised aluminum flashlight from 25 feet. No shots are fired. The subject complies. Three weeks later you receive a civil rights complaint.',
      text: 'Which principle best describes why drawing a firearm as a first response — without verbal commands or less-lethal options — creates legal exposure in this situation?',
      options: [
        'Drawing a firearm is per se unlawful without a supervisor\'s authorization.',
        'Graham v. Connor requires that the force used be proportionate to the threat as it actually existed, not the threat feared — a flashlight at 25 feet without prior commands may not justify a firearm as an initial response.',
        'Civil rights complaints automatically succeed when a firearm is drawn without firing.',
        'Pennsylvania law prohibits drawing a firearm on any subject who has not produced a firearm themselves.'
      ],
      correct: 1,
      feedback: 'Correct. Graham evaluates whether the force was objectively reasonable given the totality of circumstances at the moment force was applied. A flashlight is a serious impact weapon — but at 25 feet, without first attempting verbal commands or less-lethal options, drawing a firearm as an opening response will face significant scrutiny. Proportionality and progression of force are central to the analysis.'
    },
    {
      scenario: 'During a use of force debrief, your sergeant asks why you advanced toward a subject holding an impact weapon rather than creating distance and issuing verbal commands.',
      text: 'What is the correct tactical and legal principle that applies to this situation?',
      options: [
        'Officers are required to close distance to minimize public exposure during use of force incidents.',
        'Distance is a tactical asset — closing on a subject with an impact weapon eliminates reaction time and removes force options. Verbal commands at distance are almost always the correct first response.',
        'Advancing toward the subject demonstrates control of the situation and reduces civilian risk.',
        'The decision to close distance is always at the officer\'s discretion and is not reviewable under Graham.'
      ],
      correct: 1,
      feedback: 'Correct. Distance management is a fundamental officer safety and use of force principle. Closing on a subject with a raised impact weapon eliminates the reactionary gap — the time and space needed to assess and respond to an attack. The Tueller Drill (21-foot rule) illustrates how quickly this gap collapses. Verbal commands at distance give the subject an opportunity to comply and the officer a range of options. Advancing removes both.'
    },
    {
      scenario: 'An officer applies a control hold to a handcuffed, compliant subject who is seated in the patrol vehicle. The subject has not resisted since being cuffed. The hold causes injury.',
      text: 'How would courts most likely evaluate this under Graham v. Connor?',
      options: [
        'The hold is likely justified because the subject was under arrest.',
        'Courts would likely find the force unreasonable because a handcuffed, compliant subject presents no ongoing threat justifying continued force.',
        'The hold is justified if the officer perceived any risk, regardless of the subject\'s compliance.',
        'Courts evaluate only whether the officer followed department policy — not the objective circumstances.'
      ],
      correct: 1,
      feedback: 'Correct. Graham v. Connor requires courts to evaluate whether force was objectively reasonable given the totality of the circumstances at the moment it was applied. A handcuffed, compliant subject who has not resisted presents minimal threat. Force applied in this context is likely to be found unreasonable. The threat assessment must reflect the current situation, not a prior state of resistance.'
    },
    {
      scenario: 'During a struggle, an officer uses a take-down that causes a subject to strike their head on the pavement. The officer followed department training exactly.',
      text: 'Does compliance with training automatically insulate the officer from civil liability under federal law?',
      options: [
        'Yes — documented compliance with department training establishes a complete defense.',
        'No — department training sets the minimum standard; the constitutional standard of objective reasonableness is independent and may require more.',
        'Yes — qualified immunity applies whenever an officer follows trained procedures.',
        'No — officers are liable any time a subject is injured during a use of force.'
      ],
      correct: 1,
      feedback: 'Correct. Department training and policy compliance is evidence of reasonableness but does not automatically satisfy the constitutional standard. Graham v. Connor establishes an independent objective reasonableness test. An officer who follows policy but applies force in a way that is constitutionally unreasonable under the totality of circumstances may still face § 1983 civil liability.'
    },
    {
      scenario: 'A subject who has been placed in handcuffs suddenly begins banging their head against the inside of the patrol vehicle door.',
      text: 'Which use of force option is most consistent with the use-of-force continuum in this situation?',
      options: [
        'No intervention is appropriate — the subject is only harming themselves.',
        'Escalate to the highest available option to stop the behavior quickly.',
        'Attempt verbal intervention first, then apply the minimum force necessary to prevent the subject from injuring themselves, consistent with the threat level presented.',
        'Remove the subject from the vehicle immediately regardless of the force required.'
      ],
      correct: 2,
      feedback: 'Correct. The use-of-force continuum requires force proportionate to the threat. A handcuffed subject engaging in self-harm presents a specific, limited threat. Verbal de-escalation is the starting point. If physical intervention becomes necessary, it should be the minimum needed to prevent injury — escalating only if that minimum proves insufficient. Removing the subject from the vehicle may be appropriate but should not require excessive force.'
    },
  ];
}

