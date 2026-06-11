/* ══════════════════════════════════════════
   SCENARIO — Use of Force (EGPD)
══════════════════════════════════════════ */
const SCENARIO_USE_OF_FORCE = {
  id: 'scenario-use-of-force',
  title: 'Washington St — Domestic Disturbance',
  location: 'Washington St, East Greenville Borough, PA',
  totalDecisions: 3,
  nodes: {
    'start': {
      type: 'scene', time: '19:43', weather: 'Dusk / Clear', unit: 'Patrol Unit 5',
      narrative: [
        'You respond to a domestic disturbance call on Washington St. A neighbor reported a loud argument. As you arrive, you observe a male subject — later identified as a 38-year-old resident — standing on the front porch, yelling toward the front door.',
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
        { text: 'Deploy your CEW (Taser). He has a potential impact weapon and is advancing — force is justified.', next: 'c1b', quality: 'risky', shortLabel: 'Immediate CEW deployment' },
        { text: 'Draw your firearm and issue commands to stop. The flashlight is a deadly weapon.', next: 'c1c', quality: 'bad', shortLabel: 'Firearm drawn — potentially excessive' },
        { text: 'Advance toward him to close distance and attempt to control the situation before he reaches you.', next: 'c1d', quality: 'bad', shortLabel: 'Closed distance — poor tactics' },
      ]
    },
    'c1a': {
      type: 'consequence', outcomeClass: 'outcome-good', outcomeLabel: 'Proportionate — Tactically Sound',
      heading: 'He stops.',
      narrative: [
        'Your commands are clear and authoritative. The subject stops at approximately 15 feet. He continues to yell but is no longer advancing. Your partner arrives 40 seconds later. Together you continue issuing commands. The subject eventually drops the flashlight and is taken into custody without further incident.',
        'Verbal Control is Use of Force Level 1 under General Order 1.3.1(B). No physical force was applied. You still note this contact in your report — the policy treats verbal control as the foundation of the continuum, and documenting it establishes the full sequence of escalation (or, here, the absence of escalation) if the encounter is later reviewed.'
      ],
      legal: 'General Order 1.3.1(B)(1): Verbal Control — Use of Force Level 1. The manner and tone of an officer\'s commands can be an effective means of exerting control without progressing to a higher level of force. General Order 1.3, Policy section: officers shall never use a greater degree of force than is lawful, reasonable, and necessary, and force ends immediately when resistance ceases.',
      next: 'd2a'
    },
    'd2a': {
      type: 'decision', decisionNumber: 2,
      situation: 'Your supervisor asks how you would document this contact. The subject stopped when commanded — no weapon was deployed, no physical contact made.',
      question: 'Which documentation correctly reflects General Order 1.3\'s requirements?',
      options: [
        { text: '"Subject was aggressive and I feared for my safety. Verbal commands used to gain compliance."', next: 'c2a_wrong', quality: 'bad', shortLabal: 'Conclusory', shortLabel: 'Conclusory — no factual basis' },
        { text: '"Subject advancing approximately 25 feet, holding aluminum flashlight raised at shoulder height, yelling, non-responsive to officer presence. Officer issued verbal commands (Use of Force Level 1) and created distance. Subject complied. No further force used or required."', next: 'c2a_right', quality: 'good', shortLabel: 'Specific, factual, ties to continuum level' },
        { text: '"No force used. Subject complied with verbal commands. No report required."', next: 'c2a_none', quality: 'bad', shortLabel: 'Incorrect — no use of force occurred at all' },
        { text: '"Used verbal commands per training. Situation resolved without injury."', next: 'c2a_wrong', quality: 'bad', shortLabel: 'Incomplete — missing factual basis' },
      ]
    },
    'c2a_none': {
      type: 'consequence', outcomeClass: 'outcome-neutral', outcomeLabel: 'Reasonable, But Specificity Still Matters',
      heading: 'A brief note still belongs in the incident report.',
      narrative: [
        'General Order 1.3.6(A) requires a "Use of Force Report" specifically when an officer discharges a firearm, takes action resulting in injury, uses or is alleged to have used physical force, applies force through lethal or less-lethal weapons, or applies Level 3 force or greater. A purely verbal contact that never escalated past Level 1, with no weapon displayed and no physical contact, does not by itself trigger the formal Use of Force Report under 1.3.6(A).',
        'That said, "no report required" as a blanket statement risks under-documenting a contact involving an advancing subject with a raised impact weapon. At minimum, the incident report narrative should reflect what you observed and how it was resolved — so the record is complete if the subject\'s account differs later.'
      ],
      legal: 'General Order 1.3.6(A): a "Use of Force Report" is required for firearm discharge, any action resulting in or alleged to result in injury, use or alleged use of physical force, application of lethal or less-lethal weapons, or Level 3 force or greater. Verbal control alone does not trigger this specific form, but the underlying incident report should still document the encounter.',
      next: 'd3'
    },
    'c2a_wrong': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Insufficient Documentation',
      heading: 'Missing the facts.',
      narrative: [
        'General Order 1.3, Policy section, requires that officers "be able to articulate the need and justification for the use of force and the reason(s) why the level of force utilized was selected." "Feared for my safety" and "per training" are conclusions, not the facts that justify the conclusion.',
        'A defensible narrative documents what you observed — distance, the subject\'s actions, the item in hand, his behavior — and connects that to the specific Use of Force Continuum level applied (here, Level 1: Verbal Control).'
      ],
      legal: 'General Order 1.3, Policy: "Officers using force must be able to articulate the need and justification for the use of force and the reason(s) why the level of force utilized was selected. Full disclosure of the circumstances requiring the use of force, and the type and extent of force, shall be thoroughly documented."',
      next: 'd3'
    },
    'c2a_right': {
      type: 'consequence', outcomeClass: 'outcome-good', outcomeLabel: 'Well-Documented',
      heading: 'Facts, plus the continuum level applied.',
      narrative: [
        'Your account documents the specific facts — distance, the item in the subject\'s hand, his behavior, non-responsiveness — and identifies the Use of Force Continuum level applied (Level 1: Verbal Control) and the outcome (compliance, no further force).',
        'This satisfies General Order 1.3\'s requirement that officers articulate the need and justification for the force used and the reason the level selected was appropriate.'
      ],
      legal: 'General Order 1.3.1(B): the Use of Force Continuum establishes use of force options and their appropriate application, beginning with Verbal Control (Level 1). General Order 1.3, Policy: officers must articulate the justification for the force used and the reason the selected level was appropriate.',
      next: 'd3'
    },
    'c1b': {
      type: 'consequence', outcomeClass: 'outcome-neutral', outcomeLabel: 'Force Applied — Justification Required',
      heading: 'CEW deployed.',
      narrative: [
        'You deploy your CEW. The subject goes down at 20 feet. He is secured without further incident. The flashlight is photographed and collected as evidence.',
        'Per General Order 1.3.6(A), a CEW deployment requires a "Use of Force Report" completed before the end of your shift. Per General Order 1.3.5, because the CEW was used, EMS shall be summoned to evaluate the subject — this is required regardless of whether an injury is visible.'
      ],
      legal: 'General Order 1.3.6(A): officers shall complete a Use of Force Report whenever they apply force through lethal or less-lethal weapons. General Order 1.3.5(A): EMS shall examine, treat, and/or transport a subject following a use of force when an injury is known or suspected.',
      next: 'd2b'
    },
    'd2b': {
      type: 'decision', decisionNumber: 2,
      situation: 'The subject is secured and awaiting EMS. Your supervisor asks whether a verbal warning was given before the CEW was deployed, and whether General Order 1.3.4\'s restrictions on CEW use were considered.',
      question: 'What does your documentation reflect?',
      options: [
        { text: 'You issued one warning before deploying — "Stop or I\'ll tase you" — and you confirm the subject was standing on dry pavement, with no indication of pacemaker, pregnancy, or small stature. You document both.', next: 'c2b_right', quality: 'good', shortLabel: 'Warning given, GO 1.3.4 factors documented' },
        { text: 'You did not give a verbal warning. You document the threat accurately and explain why the speed and distance of the advance did not allow time for a warning, and you confirm the GO 1.3.4 surface/subject considerations were checked.', next: 'c2b_honest', quality: 'good', shortLabel: 'No warning — accurately documented with GO 1.3.4 factors' },
        { text: 'You document that you issued a verbal warning, though you did not.', next: 'c2b_false', quality: 'bad', shortLabel: 'Inaccurate — overstate warning given' },
        { text: 'You note the deployment was effective and do not address the warning question or the GO 1.3.4 factors.', next: 'c2b_weak', quality: 'risky', shortLabel: 'Incomplete — GO 1.3.4 factors not addressed' },
      ]
    },
    'c2b_false': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'False Report — Severe Consequences',
      heading: 'This ends careers.',
      narrative: [
        'Body camera footage shows no warning was given. Your report says one was. That discrepancy, discovered in review, constitutes filing a false report — a criminal offense in Pennsylvania and a terminable offense at nearly every department. The CEW deployment itself may have been justifiable. The false report is not.',
        'Document what happened. Not what you wish had happened.'
      ],
      legal: 'Falsifying a police report violates 18 Pa. C.S. § 4906. General Order 1.3.6(D)-(F): all Use of Force Reports are reviewed by the Chief of Police or designee for compliance, and findings of non-compliance may result in remedial training, a Professional Conduct investigation, or discipline.',
      next: 'd3'
    },
    'c2b_weak': {
      type: 'consequence', outcomeClass: 'outcome-neutral', outcomeLabel: 'Documentation Is Thin',
      heading: 'General Order 1.3.4\'s CEW factors need to be addressed.',
      narrative: [
        'General Order 1.3.4(D) lists factors that must inform CEW use, including the subject\'s apparent age, size, and any visible indication of pregnancy, pacemaker, or ill health, and 1.3.4(D)(b)/(e) address whether the subject\'s fall could result in death (e.g., near water or an elevated structure) and whether a verbal warning was given when circumstances permitted.',
        '"The deployment was effective" does not address whether these factors were considered. A complete report walks through them, even briefly, so a reviewer can see that GO 1.3.4 was followed.'
      ],
      legal: 'General Order 1.3.4(D): the CEW shall not be used where a subject\'s fall could likely result in death, and officers should be aware of greater injury risk for children, the elderly, persons of small stature, and those who may be pregnant, have a pacemaker, or are in obvious ill health. 1.3.4(D)(f): a verbal warning should be given when circumstances permit.',
      next: 'd3'
    },
    'c2b_honest': {
      type: 'consequence', outcomeClass: 'outcome-good', outcomeLabel: 'Accurate Documentation',
      heading: 'Honesty, plus the GO 1.3.4 checklist.',
      narrative: [
        'Your report accurately reflects that no verbal warning was issued and explains why — General Order 1.3.4(D)(f) requires a warning "when circumstances permit," not in every case. The speed and distance of the advance did not permit one here.',
        'You also document that the surface and subject did not present the fall-risk or vulnerability factors addressed in 1.3.4(D) — confirming those were considered even though they did not change the outcome.'
      ],
      legal: 'General Order 1.3.4(D)(f): a verbal warning that a CEW will be used, and an opportunity to comply, "should be given by the officer prior to discharging a CEW" when circumstances permit and it is tactically sound — it is not an absolute prerequisite. 1.3.4(D): fall-risk and subject-vulnerability factors must be considered.',
      next: 'd3'
    },
    'c2b_right': {
      type: 'consequence', outcomeClass: 'outcome-good', outcomeLabel: 'Well-Documented Force Decision',
      heading: 'Solid report.',
      narrative: [
        'Your documentation confirms a verbal warning was given consistent with General Order 1.3.4(D)(f), and that the surface and subject did not present the fall-risk or vulnerability concerns addressed elsewhere in 1.3.4(D). The Use of Force Report is complete before end of shift per 1.3.6(A)(4), and EMS evaluation is documented per 1.3.5.'
      ],
      legal: 'General Order 1.3.4(D): CEW use must account for fall risk and subject vulnerability factors, and a verbal warning should be given when circumstances permit. General Order 1.3.6(A)(4): the Use of Force Report shall be completed prior to the officer concluding the shift during which the use of force occurred.',
      next: 'd3'
    },
    'c1c': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Potentially Excessive — Civil Exposure',
      heading: 'A flashlight at 25 feet may not justify a firearm.',
      narrative: [
        'The subject stops when he sees your weapon drawn. He drops the flashlight and begins to comply. No shots are fired. He is arrested without further incident.',
        'Three weeks later, your department receives a civil rights complaint. The subject\'s attorney argues that drawing a firearm against an unarmed subject — a flashlight is not a firearm — at 25 feet, without attempting verbal commands or less-lethal options, was excessive given General Order 1.3\'s continuum and the "lawful, reasonable, and necessary" standard.'
      ],
      legal: 'General Order 1.3, Policy: officers "shall never use a greater degree of force than that which is lawful, reasonable, and necessary for the specific situation." General Order 1.3.1(C)(2): nothing in the continuum requires escalating through every level, but skipping directly to a firearm against an impact weapon at 25 feet, without attempting verbal commands or less-lethal options, will face significant scrutiny.',
      next: 'd2c'
    },
    'd2c': {
      type: 'decision', decisionNumber: 2,
      situation: 'Internal affairs is reviewing the incident under General Order 1.3.6(D)-(F). They ask you to explain your force decision. Which response best supports your position?',
      question: 'How do you articulate your use of force decision?',
      options: [
        { text: '"I believed my life was in danger and I reacted accordingly."', next: 'c2c_wrong', quality: 'bad', shortLabel: 'Subjective — no factual basis' },
        { text: '"The subject was advancing rapidly with a raised impact weapon. At 25 feet and closing, I assessed the threat as immediate. I presented my firearm to create compliance. In hindsight, verbal commands first, per Use of Force Level 1, would have been the correct starting point. I document this as a lesson applied."', next: 'c2c_honest', quality: 'good', shortLabel: 'Honest, specific, self-aware' },
        { text: '"The flashlight was a deadly weapon and justified deadly force options under 1.3.2."', next: 'c2c_over', quality: 'bad', shortLabel: 'Overstated — unsupported claim' },
        { text: '"I followed my training and assessed the threat in real time."', next: 'c2c_wrong', quality: 'bad', shortLabel: 'Vague — no factual basis' },
      ]
    },
    'c2c_wrong': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Cannot Withstand Scrutiny',
      heading: 'Not specific enough.',
      narrative: [
        'Subjective statements and vague references to training do not satisfy General Order 1.3\'s requirement that officers "articulate the need and justification for the use of force and the reason(s) why the level of force utilized was selected." Internal affairs and civil courts evaluate facts — distance, speed, the item in hand, available options, and actions taken. Generic responses invite adverse findings.'
      ],
      legal: null, next: 'd3'
    },
    'c2c_over': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Legally Unsupportable',
      heading: 'An aluminum flashlight is not a deadly weapon under General Order 1.3.2.',
      narrative: [
        'General Order 1.3.2 authorizes deadly force only where the action is in defense of human life, or where the person to be arrested has committed or attempted a forcible felony, or is attempting to escape and possesses a deadly weapon, or otherwise indicates they will endanger human life or inflict serious bodily injury unless arrested without delay.',
        'A flashlight, without more, does not place this encounter within 1.3.2\'s definition of a deadly-force situation. Overstating the threat to justify the force decision is worse than honestly acknowledging the force decision was made quickly and imperfectly.'
      ],
      legal: 'General Order 1.3.2(A): deadly force is justified only in defense of human life, or where the subject has committed or attempted a forcible felony, or is attempting to escape while possessing a deadly weapon or otherwise indicating he/she will endanger life or inflict serious bodily injury unless arrested without delay.',
      next: 'd3'
    },
    'c2c_honest': {
      type: 'consequence', outcomeClass: 'outcome-good', outcomeLabel: 'Credible and Defensible',
      heading: 'Honesty with accountability.',
      narrative: [
        'Acknowledging what you observed, why you responded the way you did, and what you would do differently demonstrates credibility and self-awareness — both of which matter significantly in internal review under General Order 1.3.6(D)-(F) and in civil litigation. The complaint is closed. The department notes the incident for training purposes per 1.3.6(F)(a).',
        'Officers who can articulate their decisions honestly — including their limitations — are far more defensible than those who can\'t.'
      ],
      legal: 'General Order 1.3.6(F): reports found to indicate non-compliance may be directed to remedial training, a Professional Conduct investigation, or disciplinary action depending on the circumstances. Honest, specific documentation supports a remedial-training outcome rather than a disciplinary one.',
      next: 'd3'
    },
    'c1d': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Poor Tactics — Escalated Situation',
      heading: 'You closed distance on an armed subject.',
      narrative: [
        'Advancing toward a subject holding an impact weapon eliminates your reaction time and removes your tactical options. At 10 feet, the subject swings the flashlight. It connects with your left forearm before you can control his arm. Your partner arrives to find you engaged in a physical struggle.',
        'The incident results in documented injury to you, a Use of Force Report under General Order 1.3.6(A)(2) (action resulting in injury to another, and physical force used against you), a workers\' compensation claim, and a tactical debrief from your sergeant.'
      ],
      legal: 'General Order 1.3.6(A): a Use of Force Report is required whenever an officer takes any action that results in, or is alleged to have resulted in, any injury, or uses or is alleged to have used physical force. Closing distance on a subject with an impact weapon eliminates the ability to transition between force options and dramatically increases injury risk to both parties.',
      next: 'd2d'
    },
    'd2d': {
      type: 'decision', decisionNumber: 2,
      situation: 'During the tactical debrief, your sergeant asks what your initial assessment was when you saw the subject with the flashlight. What should your answer reflect?',
      question: 'What is the correct takeaway from this encounter?',
      options: [
        { text: '"I thought I could control him before he reached me."', next: 'c2d_wrong', quality: 'bad', shortLabel: 'Overconfidence — wrong lesson' },
        { text: '"Distance, cover, and verbal commands — Use of Force Level 1 — should have been my first response. Closing distance eliminated my options and increased risk."', next: 'c2d_right', quality: 'good', shortLabel: 'Correct tactical lesson identified' },
        { text: '"I reacted the way I was trained."', next: 'c2d_wrong', quality: 'bad', shortLabel: 'Deflects accountability' },
        { text: '"The situation was unpredictable and I did the best I could."', next: 'c2d_wrong', quality: 'bad', shortLabel: 'Does not identify the error' },
      ]
    },
    'c2d_wrong': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Lesson Not Applied',
      heading: 'The debrief exists for a reason.',
      narrative: [
        'An officer who cannot identify their tactical error in debrief is an officer who will repeat it. The Use of Force Continuum begins with Verbal Control for a reason — distance and cover are force multipliers that keep options open. Closing on an armed subject removes both, and skips past Level 1 without justification.'
      ],
      legal: null, next: 'd3'
    },
    'c2d_right': {
      type: 'consequence', outcomeClass: 'outcome-good', outcomeLabel: 'Correct Assessment',
      heading: 'Right lesson. Apply it.',
      narrative: [
        'Your sergeant agrees. The debrief is documented. You identify the tactical error clearly: distance, cover, and Level 1 verbal commands first, always. The incident goes into your training record as a learning event under General Order 1.3.6(F)(a) (remedial training), not a misconduct finding.',
        'Officers who can identify and articulate their errors are the ones who improve.'
      ],
      legal: 'General Order 1.3.1(B)(1): Verbal Control — Use of Force Level 1 — is the foundation of the continuum. General Order 1.3.6(F)(a): remedial training is an available, non-disciplinary outcome where a report indicates a tactical or policy gap rather than misconduct.',
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
          text: 'Tell your supervisor you need a moment to come down physiologically, then provide a professional overview of events — what the threat was, what force was used, and why — and complete the written Use of Force Report before end of shift as required by General Order 1.3.6.',
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
        'A total refusal on scene with civilian witnesses present, after a use of force, raises questions rather than protecting you. Your supervisor needs basic facts to manage the scene and to determine whether General Order 1.3.7 (removal from line-duty pending administrative review) applies.',
        'The correct approach: provide a professional, factual overview of the threat and your response. Invoke your right to representation if the conversation moves toward a formal administrative interview.'
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
        'Asking for a brief moment is not weakness — it is evidence-based practice. The critical overview (threat, force used, why) gives your supervisor what they need for immediate scene management. Your written Use of Force Report, completed before end of shift per General Order 1.3.6(A)(4) and after the stress response has subsided, captures the full accurate account.',
        'This approach is consistent with General Order 1.3.6 and protects the integrity of your documentation.'
      ],
      legal: 'General Order 1.3.6(A)(4): the Use of Force Report shall be completed prior to the officer(s) concluding the shift during which the use of force occurred. Reports written during acute stress response are more likely to contain inaccuracies — allow physiological recovery before writing, but the report is still due before shift end.',
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
        'The professional approach is an immediate factual overview (threat, force, reason) and a complete written Use of Force Report before end of shift, per General Order 1.3.6(A)(4).'
      ],
      legal: 'General Order 1.3.6(A)(4) sets the reporting deadline (before end of shift) precisely because it allows for a brief recovery period while still requiring same-shift documentation. Courts and administrative bodies compare officers\' initial verbal statements to later written reports — discrepancies, even those caused by normal stress physiology, can be used to challenge credibility.',
      next: 'debrief'
    },
    'debrief': { type: 'debrief' }
  }
};

function getUseOfForceQuestions() {
  return [
    {
      scenario: 'You respond to a domestic disturbance. A subject advances toward you holding a metal flashlight raised at shoulder height. He is approximately 25 feet away and not responding to your presence.',
      text: 'Under General Order 1.3, what is the foundation of the Use of Force Continuum and where does it start?',
      options: [
        'The continuum starts with Escort (Level 2), since Verbal Control is not considered a use of force.',
        'The continuum begins with Verbal Control (Level 1) — advice, persuasion, admonitions, or orders, where tone and volume can establish control without progressing to a higher level of force.',
        'The continuum has no defined starting point — officers may begin at whatever level they assess as necessary.',
        'The continuum begins with Escort and Control and Compliance combined as Level 1.'
      ],
      correct: 1,
      feedback: 'Correct. General Order 1.3.1(B)(1) establishes Verbal Control as Use of Force Level 1 — advice, persuasion, admonitions, or orders, where the manner, volume, and tone of an officer\'s commands can be an effective means of exerting control without having to progress to a higher level of force.'
    },
    {
      scenario: 'After a CEW deployment during a domestic disturbance call, your supervisor instructs you to complete the appropriate paperwork. Your body camera captured the full incident.',
      text: 'Under General Order 1.3.6, when must a "Use of Force Report" be completed?',
      options: [
        'Only if the subject is injured or claims injury.',
        'Whenever an officer discharges a firearm (other than training/recreational/animal disposal), takes action resulting in or alleged to result in injury or death, uses or is alleged to use physical force, applies lethal or less-lethal weapons, or applies Level 3 force or greater.',
        'Only when the District Attorney\'s office requests it.',
        'Only for incidents involving a firearm discharge.'
      ],
      correct: 1,
      feedback: 'Correct. General Order 1.3.6(A) lists the triggers for a Use of Force Report broadly: firearm discharge (with the animal-disposal exception, which uses an incident report instead), any action resulting in or alleged to result in injury or death, use or alleged use of physical force, application of force through lethal or less-lethal weapons, and Level 3 (OC) force or anything greater than Level 4.'
    },
    {
      scenario: 'A use of force report states: "Subject was aggressive and I feared for my safety. I used verbal commands to gain compliance." A reviewer questions whether this satisfies General Order 1.3.',
      text: 'Why is this documentation insufficient under General Order 1.3?',
      options: [
        'It fails to note the subject\'s criminal history.',
        'General Order 1.3, Policy, requires officers to articulate the need and justification for the force used and the reason the level selected was appropriate — "feared for my safety" is a conclusion, not the supporting facts.',
        'It does not state whether a supervisor was present.',
        'It is sufficient — stating that the officer feared for their safety satisfies the policy.'
      ],
      correct: 1,
      feedback: 'Correct. General Order 1.3, Policy section, states: "Officers using force must be able to articulate the need and justification for the use of force and the reason(s) why the level of force utilized was selected. Full disclosure of the circumstances requiring the use of force, and the type and extent of force, shall be thoroughly documented." A conclusory statement of fear does not meet this standard — the report must describe what was observed.'
    },
    {
      scenario: 'You draw your firearm in response to a subject advancing with a raised aluminum flashlight from 25 feet. No shots are fired. The subject complies. Three weeks later your department receives a civil rights complaint.',
      text: 'Under General Order 1.3.2, when is deadly force justified?',
      options: [
        'Whenever a subject advances toward an officer while holding any object.',
        'Only when the action is in defense of human life (including the officer\'s own), or in defense of a person in imminent danger of serious physical injury, or where the person to be arrested has committed or attempted a forcible felony or is attempting to escape while possessing a deadly weapon or otherwise indicating they will endanger life or inflict serious bodily injury unless arrested without delay.',
        'Whenever a supervisor authorizes it over the radio, regardless of the circumstances.',
        'Whenever the subject fails to comply with a verbal command within a reasonable time.'
      ],
      correct: 1,
      feedback: 'Correct. General Order 1.3.2(A) limits deadly force to situations where it is in defense of human life or a person in imminent danger of serious physical injury, or where the subject has committed or attempted a forcible felony or is attempting to escape while possessing a deadly weapon or otherwise indicating they will endanger life or inflict serious bodily injury unless arrested without delay. An aluminum flashlight at 25 feet, without more, does not establish these conditions.'
    },
    {
      scenario: 'During a use of force debrief, your sergeant asks why you advanced toward a subject holding an impact weapon rather than creating distance and issuing verbal commands.',
      text: 'How does General Order 1.3.1 frame the relationship between Verbal Control (Level 1) and higher levels of force?',
      options: [
        'Officers must always begin at Level 1 and may never skip to a higher level regardless of circumstances.',
        'The continuum is escalated only when each lower level has been examined or discarded as impractical, or has been tried and failed — though the policy also notes that any level can be skipped in escalation, or de-escalated, given the presenting circumstances.',
        'Higher levels of force are mandatory once a subject is non-compliant for any reason.',
        'The continuum applies only to arrests, not to officer-safety encounters like this one.'
      ],
      correct: 1,
      feedback: 'Correct. General Order 1.3.1(B) frames the continuum as escalating "only when each lower level of force has been examined or discarded as impractical in the current circumstance, or which has been tried and has failed." 1.3.1(C)(2) clarifies that any given level can be skipped in escalation, or reduced, depending on the presenting circumstances — but that flexibility does not excuse failing to consider Level 1 (distance, cover, verbal commands) as the starting point absent a reason to skip it.'
    },
    {
      scenario: 'An officer applies a control hold to a handcuffed, compliant subject who is seated in the patrol vehicle. The subject has not resisted since being cuffed. The hold causes injury.',
      text: 'How does General Order 1.3\'s Policy section address force against a subject who is no longer resisting?',
      options: [
        'The hold is justified because the subject was under arrest and force may continue throughout custody.',
        '"The use of physical force will end immediately when resistance ceases, when resistance has been overcome, or when the arrest has been accomplished." A handcuffed, compliant subject presents none of these conditions for continued force.',
        'The hold is justified if the officer subjectively perceived any risk, regardless of the subject\'s compliance.',
        'General Order 1.3 does not address force against subjects who are already in custody.'
      ],
      correct: 1,
      feedback: 'Correct. General Order 1.3, Policy, states that "the use of physical force will end immediately when resistance ceases, when resistance has been overcome, or when the arrest has been accomplished." A handcuffed, compliant subject who is not resisting falls squarely within this requirement — continued force in this situation is inconsistent with the policy.'
    },
    {
      scenario: 'During a struggle, an officer uses a takedown that causes a subject to strike their head on the pavement. The officer states they followed department training exactly.',
      text: 'Under General Order 1.3, does following department training automatically satisfy the policy\'s requirements?',
      options: [
        'Yes — documented compliance with training is a complete defense under the policy.',
        'Not necessarily — General Order 1.3, Policy, separately requires that the force used be "lawful, reasonable, and necessary for the specific situation," and 1.3.1(A)(1) ties legal justification to the Pennsylvania Crimes Code and applicable case law, independent of training compliance.',
        'Yes — General Order 1.3.6(D) states that training compliance ends the review process automatically.',
        'No — General Order 1.3 prohibits all takedowns regardless of circumstances.'
      ],
      correct: 1,
      feedback: 'Correct. General Order 1.3, Policy, requires that force never exceed what is "lawful, reasonable, and necessary for the specific situation," and 1.3.1(A)(1) states that the Pennsylvania Crimes Code, Title 18, Chapter 5, and related case law (including federal case law binding through the 14th Amendment) "establish the only legally binding restrictions regarding the use of force." Following department training is relevant but does not, by itself, satisfy this independent legal standard.'
    },
    {
      scenario: 'A subject who has been placed in handcuffs suddenly begins banging their head against the inside of the patrol vehicle door.',
      text: 'Which response is most consistent with General Order 1.3\'s Use of Force Continuum?',
      options: [
        'No intervention is appropriate — the subject is only harming themselves.',
        'Escalate immediately to the highest available force option to stop the behavior as quickly as possible.',
        'Attempt verbal intervention (Level 1) first, then apply only the minimum level of force necessary to prevent injury, escalating further only if that level proves ineffective — consistent with 1.3.1(B)\'s level-by-level approach.',
        'Remove the subject from the vehicle immediately regardless of the force required, since any force is justified by self-harm.'
      ],
      correct: 2,
      feedback: 'Correct. General Order 1.3.1(B) establishes a continuum that escalates only when a lower level has been tried and failed or is impractical. A handcuffed subject engaging in self-harm presents a specific, limited situation: verbal intervention (Level 1) is the starting point, with physical intervention limited to the minimum necessary to prevent injury, escalating only if that proves insufficient.'
    },
  ];
}
