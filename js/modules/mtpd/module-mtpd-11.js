/* ═══════════════════════════════════════════
   MTPD — Module 11: Officer Wellness

   Reading extracted byte-for-byte from the former app.js hardcoded
   branch. Supervisor variants anchored to the MTPD Peer Support
   Program, EAP policy, and confidentiality-limit policy in the reading.
   Never borrow EGPD policy, framing, or roads.
═══════════════════════════════════════════ */

const READING_WELLNESS = `
      <div class="content-block">
        <h4>Scenario</h4>
        <h2>Your partner is one of the best you\'ve worked with — sharp, calm, and reliable. In the last six weeks, he\'s called in three times, snapped at dispatch twice, and told you the job "just doesn\'t bother him anymore." Something\'s wrong. What do you do?</h2>
        <p>This module covers secondary traumatic stress, the MTPD peer support program, EAP services, the difference between performance management and wellness intervention, and the specific warning signs that require action — not silence.</p>
      </div>
      <div class="content-block">
        <h4>Core Principle</h4>
        <h2>Secondary Traumatic Stress Is a Physiological Reality</h2>
        <p>Secondary traumatic stress (STS) — sometimes called vicarious trauma or compassion fatigue — is not weakness. It is a documented psychological and physiological response to repeated exposure to the trauma of others. Law enforcement officers are among the highest-risk populations for STS, PTSD, and occupational depression. The culture of silence around these conditions kills officers — and it is the culture you have the authority to change.</p>
        <p>The research is unambiguous: law enforcement officers die by suicide at rates significantly higher than line-of-duty deaths. The threat is real, it affects experienced officers as much as new ones, and it is preventable with early recognition and access to appropriate support.</p>
        <div class="case-law-box">
          <div class="case-title">Secondary Traumatic Stress — Recognized Symptom Profile</div>
          <p>STS presents differently from acute PTSD but is equally serious. Recognized indicators include emotional numbing ("the job doesn\'t bother me anymore"), social withdrawal, increased cynicism or irritability, sleep disruption, increased alcohol use, intrusive thoughts, hypervigilance off-duty, and unexplained physical symptoms. Many officers experiencing STS are the last to recognize it in themselves — which is why peer recognition matters more than self-identification.</p>
        </div>
      </div>
      <div class="content-block">
        <h4>MTPD Resources — What\'s Available and How It Works</h4>
        <div class="sop-box">
          <div class="sop-title">MTPD Peer Support Program</div>
          <p>The MTPD peer support program connects officers experiencing stress, trauma, or personal difficulty with trained peer counselors — fellow officers who have completed peer support training and are authorized to provide confidential, non-clinical support. Peer support contacts are confidential within the limits described in the program policy. Contacting peer support is not a disciplinary matter and does not affect fitness-for-duty status. It is the correct first step for officers experiencing stress who are not in acute crisis.</p>
        </div>
        <div class="sop-box">
          <div class="sop-title">Employee Assistance Program (EAP)</div>
          <p>The department\'s EAP provides free, confidential access to licensed mental health professionals for officers and their immediate family members. EAP services are provided by an independent contractor outside the department\'s chain of command — participation is not reported to supervisors. Sessions are limited per policy year; officers requiring ongoing care can be referred to long-term resources through EAP. Confidentiality limitations apply when there is an imminent risk of harm to self or others, disclosure of a serious criminal offense, or a court order requiring disclosure.</p>
        </div>
        <div class="sop-box">
          <div class="sop-title">Confidentiality Limits — What the Program Can and Cannot Protect</div>
          <p>Both peer support and EAP operate under confidentiality protections — but those protections have defined limits. Mandatory disclosure applies when: there is an imminent risk of harm to the officer or another person; there is disclosure of a serious criminal offense; or a court order requires disclosure. Officers should understand these limits before contact. Knowing them prevents surprises and allows officers to make informed decisions about what to disclose and to whom.</p>
        </div>
      </div>
      <div class="content-block">
        <h4>Warning Signs — What Requires Action</h4>
        <h2>Silence is not a brotherhood value. Recognition is.</h2>
        <ul class="key-points">
          <li><strong>Emotional numbing or detachment</strong> — "Nothing bothers me anymore" is not resilience. It is a warning sign. An officer who has stopped being affected by serious incidents has not gotten stronger — their nervous system has adapted in a way that will eventually break through in a more destructive form.</li>
          <li><strong>Behavioral changes</strong> — Increased absences, poor judgment on calls, aggression, withdrawal from family or coworkers, or a pattern of risk-taking behavior that wasn\'t previously present.</li>
          <li><strong>Increased substance use</strong> — Alcohol as a coping mechanism is the most common self-medication pattern in law enforcement. It is also the most reliable predictor of accelerating decline if not addressed early.</li>
          <li><strong>Statements suggesting hopelessness</strong> — Any statement suggesting the officer does not see a future, does not care what happens to them, or has been making final arrangements requires immediate action. Don\'t rationalize it. Ask directly. Contact peer support or EAP without delay.</li>
        </ul>
        <p>Your obligation as a fellow officer is not to diagnose — it is to notice, to say something directly, and to point toward resources. You may be the only person who sees it early enough to matter.</p>
        <button class="btn-launch" onclick="startScenario('officer-wellness')">Proceed to Scenario Exercise →</button>
      </div>
    `;

/* ══════════════════════════════════════════
   SUPERVISOR OVERLAY — Officer Wellness (MTPD)
══════════════════════════════════════════ */
const SUPERVISOR_WELLNESS = `
  <div class="content-block">
    <h4>Supervisor Focus</h4>
    <h2>You are positioned to see the warning signs earliest and you have the authority to act on them. The hardest part of this module for a supervisor is telling a wellness problem from a performance problem.</h2>
    <p>The signs of secondary traumatic stress — absences, irritability, withdrawal, emotional numbing, slipping judgment — look a lot like a discipline problem from the supervisor's chair, and treating them as one can push a struggling officer further from help. Your job is to recognize the pattern, respond as a wellness concern first, connect the officer to the right resource, and understand the confidentiality limits well enough to act correctly when an officer's safety is at stake. You may be the person who sees it early enough to matter.</p>
  </div>
  <div class="content-block">
    <h4>Wellness Intervention vs. Performance Management</h4>
    <h2>A sudden change in a reliable officer is a signal, not just a write-up.</h2>
    <p>When a previously sharp officer starts calling in, snapping at dispatch, withdrawing, or saying "the job doesn't bother me anymore," the discipline path and the wellness path point in opposite directions. Emotional numbing is a recognized STS indicator, not resilience; behavioral changes and increased absences are on the warning-sign list. The supervisor's first move on a sudden decline in a reliable officer is a direct, private wellness conversation and a pointer to resources — not a stack of write-ups that confirm to the officer that no one sees what is actually happening. There is a place for performance management, but leading with it on a wellness pattern drives the problem underground. Notice, say something directly, and point toward support.</p>
  </div>
  <div class="content-block">
    <h4>Know the Resources and How They Work</h4>
    <ul class="key-points">
      <li><strong>Peer support — the right first step for stress short of acute crisis</strong> — Confidential within policy limits, non-disciplinary, and it does not affect fitness-for-duty status. For an officer carrying stress who is not in acute crisis, peer support is the correct first referral, and you can make that clear without it becoming a personnel action.</li>
      <li><strong>EAP — confidential, outside the chain of command</strong> — Free licensed mental-health access for officers and immediate family, provided by an independent contractor; participation is not reported to supervisors. You can point an officer to EAP; you will not, and should not expect to, receive a report that they went.</li>
      <li><strong>Don't make wellness a disciplinary record</strong> — Reaching out to peer support or EAP is not a disciplinary matter. Treating an officer's use of support as a mark against them is exactly the culture of silence the module says kills officers.</li>
    </ul>
  </div>
  <div class="content-block">
    <h4>The Confidentiality Limits — and the Statement You Never Rationalize</h4>
    <p>Peer support and EAP are confidential, but the protection has defined limits: mandatory disclosure applies when there is an imminent risk of harm to the officer or another person, disclosure of a serious criminal offense, or a court order. The one you must act on is imminent risk of harm. Any statement suggesting an officer does not see a future, does not care what happens to them, or has been making final arrangements requires immediate action — you do not rationalize it, explain it away, or wait. Ask directly, stay with the officer, and engage peer support or EAP without delay; an imminent-risk situation is the defined limit where confidentiality yields to safety. Recognizing the warning sign and acting on it now is the whole point.</p>
  </div>
  <div class="content-block">
    <h4>From Recognition to Action</h4>
    <p>Your obligation is not to diagnose — it is to notice, to say something directly, and to point toward resources, then to follow up. Build a squad culture where reaching for peer support or EAP is normal, not a confession, because silence is the actual threat. When you see the pattern, separate it from performance, make the referral, and for any sign of imminent risk, act immediately. You may be the only person who sees it early enough to matter.</p>
  </div>
`;

function getWellnessSupervisorQuestions() {
  return [
    {
      scenario: 'One of your most reliable officers has, over six weeks, called in three times, snapped at dispatch twice, withdrawn from the squad, and told you "the job just doesn\'t bother me anymore." Your instinct is to start documenting attendance and attitude problems.',
      text: 'What is the supervisory move most consistent with this module?',
      options: [
        'Open a formal performance file on him and discipline both the absences and the attitude problems.',
        'Ignore the whole pattern entirely, at least unless and until his actual work product formally fails.',
        'Recognize the pattern as possible secondary traumatic stress and lead with a direct, private wellness conversation and a referral to resources — emotional numbing and behavioral changes are warning signs, and leading with discipline drives a wellness problem underground.',
        'Quietly reassign him to a quieter beat or a different shift, without ever talking to him directly about any of what you have noticed, on the assumption that changing his environment will address the warning signs more gently than a direct wellness conversation with him ever would.'
      ],
    },
    {
      scenario: 'An officer carrying visible stress is not in acute crisis but is clearly struggling. He asks you, quietly, where he could turn that "won\'t end up in my file or cost me my badge."',
      text: 'What do you tell him about peer support?',
      options: [
        'Tell him that any kind of help he seeks out will ultimately be reported up the chain of command.',
        'Point him to the MTPD peer support program — it is confidential within policy limits, is not a disciplinary matter, does not affect fitness-for-duty status, and is the correct first step for stress short of acute crisis.',
        'Tell him to just tough it out on his own, so that nothing at all ends up going on his record.',
        'Tell him that he must request and complete a formal fitness-for-duty evaluation first, before anything else.'
      ],
    },
    {
      scenario: 'You refer an officer to the EAP. A week later you expect a report confirming he attended and what was discussed so you can "keep tabs on his progress."',
      text: 'What does the EAP policy actually provide?',
      options: [
        'The EAP reports both the officer\'s attendance and the session content back to the referring supervisor.',
        'The supervisor is required to sit in on the officer\'s EAP sessions himself in order to verify attendance and confirm that the officer is genuinely engaging with the process, so that participation is documented and reported up the chain of command for the file.',
        'The EAP is only ever available to an officer after a formal disciplinary referral has been made.',
        'EAP services are provided by an independent contractor outside the chain of command and participation is not reported to supervisors; you can point an officer to EAP, but you will not receive a report that he went or what was discussed.'
      ],
    },
    {
      scenario: 'During a candid conversation, an officer makes a statement suggesting he does not see a future and has "been getting his affairs in order lately." He then shrugs it off as "just talk."',
      text: 'What does this module require you to do?',
      options: [
        'Treat it as a statement requiring immediate action — do not rationalize it; ask directly, stay with him, and engage peer support or EAP without delay, because imminent risk of harm is the defined limit where confidentiality yields to safety.',
        'Accept his explanation that it was just talk and move on, so that you do not overreact to the comment.',
        'Wait a few days to see whether his overall mood improves on its own before you do anything about it.',
        'Document the officer\'s comment for his performance file and then plan to address it with him at his next regularly scheduled review, treating a statement about not wanting to wake up as a performance-tracking matter rather than an immediate-risk situation to act on now.'
      ],
    },
    {
      scenario: 'An officer asks you, before opening up, exactly what peer support and EAP can and cannot keep confidential.',
      text: 'How do you describe the confidentiality limits accurately?',
      options: [
        'Tell him that absolutely everything he says is fully protected, with no exceptions to it whatsoever.',
        'Explain that peer support and EAP are confidential but with defined limits — mandatory disclosure applies when there is an imminent risk of harm to himself or others, disclosure of a serious criminal offense, or a court order requiring disclosure.',
        'Tell him plainly that nothing he says in those peer-support or EAP conversations is actually confidential in any way at all and that it can all come back to the department, so he should be very careful about what he chooses to disclose to anyone in those sessions.',
        'Tell him that you, as his supervisor, personally decide what does and does not stay confidential.'
      ],
    },
    {
      scenario: 'Another supervisor remarks that an officer who reached out to peer support "clearly can\'t handle the job" and suggests it should weigh against him for a specialized assignment.',
      text: 'How do you respond, consistent with the program and the module\'s message?',
      options: [
        'Agree with him — seeking out support clearly shows that the officer is unfit for demanding assignments.',
        'Stay neutral on it — how individual officers view help-seeking is really just a personal opinion.',
        'Push back — contacting peer support is not a disciplinary matter and does not affect fitness-for-duty status; treating it as a mark against the officer is exactly the culture of silence the module says kills officers.',
        'Suggest that the officer simply be passed over quietly for the assignment, to avoid any controversy.'
      ],
    },
    {
      scenario: 'You notice an officer\'s alcohol use has clearly increased and is being used to cope, alongside growing irritability and withdrawal — but he is not in acute crisis and has made no statements of hopelessness.',
      text: 'What is the supervisory approach?',
      options: [
        'Address it as an early warning sign — increased substance use is the most common self-medication pattern and the most reliable predictor of accelerating decline if not addressed early — with a direct private conversation and a peer support referral now.',
        'Do nothing about it for now, at least until his work formally fails or he says something genuinely alarming.',
        'Order an immediate mandatory fitness-for-duty evaluation and simultaneously begin the termination process against him, treating the increased drinking as grounds for removing the officer from the job rather than as an early warning sign to address with support and a referral.',
        'Mention the drinking to him jokingly, so that the whole thing does not feel like such a big deal.'
      ],
    },
    {
      scenario: 'You want to reduce the stigma on your squad so officers actually use peer support and EAP before they reach crisis.',
      text: 'What supervisory approach best reflects this module\'s message?',
      options: [
        'Tell the squad plainly that needing any kind of help is a weakness that they should always hide.',
        'Require all officers under your command to disclose any counseling or peer support they seek directly to you personally, so that you can keep track of who is struggling, on the theory that visibility into their help-seeking makes you a more effective supervisor.',
        'Avoid the entire topic of wellness completely, so that no one on the squad ever feels singled out.',
        'Build a culture where reaching for peer support or EAP is normal rather than a confession — because silence is the actual threat — and model recognition by noticing, speaking directly, and pointing toward resources.'
      ],
    },
  ];
}

/* ══════════════════════════════════════════
   SUPERVISOR SCENARIO — Officer Wellness (MTPD)
   You are the supervisor recognizing warning signs in Officer Ferris.
   Fictional officer.
══════════════════════════════════════════ */
const SCENARIO_WELLNESS_SUP = {
  id: 'scenario-officer-wellness-sup',
  title: 'Supervisor Action — Recognizing the Signs',
  location: 'Shift Supervisor — Officer Wellness',
  totalDecisions: 3,
  nodes: {
    'start': {
      type: 'scene',
      time: '15:00',
      weather: 'Shift Briefing',
      unit: 'Shift Supervisor',
      narrative: [
        'Officer Ferris has been one of your most dependable people for years. Over the last six weeks he has called in three times, snapped at dispatch twice, pulled back from the squad, and told another officer the job "just doesn\'t bother him anymore."',
        'From the supervisor\'s chair this could read as an attendance-and-attitude problem. It could also be something far more serious. How you read it, and what you do, may matter more than any other call you handle this month.'
      ],
      next: 'd1'
    },
    'd1': {
      type: 'decision',
      decisionNumber: 1,
      situation: 'You have to decide how to frame what you\'re seeing in Ferris — a previously reliable officer with new absences, irritability, withdrawal, and emotional numbing.',
      question: 'How do you approach it?',
      options: [
        { text: 'Open a performance file and start documenting the absences and the attitude.', next: 'c1a', quality: 'bad', shortLabel: 'Led with discipline' },
        { text: 'Read the sudden change as a possible wellness issue — emotional numbing and behavioral changes are STS warning signs — and have a direct, private conversation, pointing him toward resources.', next: 'c1b', quality: 'good', shortLabel: 'Led with a wellness conversation' },
        { text: 'Wait and see whether his work formally fails before doing anything.', next: 'c1c', quality: 'bad', shortLabel: 'Waited for failure' },
        { text: 'Reassign him quietly to a slower beat and say nothing.', next: 'c1d', quality: 'risky', shortLabel: 'Moved him without engaging' },
      ]
    },
    'c1a': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'You Confirmed His Worst Fear',
      heading: 'Leading with a discipline file tells a struggling officer that no one sees what\'s really happening.',
      narrative: [
        'Documenting the absences and attitude treats emotional numbing and withdrawal — recognized STS warning signs — as a conduct problem. It pushes Ferris further into silence and away from the help that could change the trajectory.',
        'There is a place for performance management, but leading with it on a wellness pattern is exactly backwards.'
      ],
      legal: 'Module standard: emotional numbing and behavioral changes are STS indicators; leading with discipline drives a wellness problem underground.',
      next: 'd2'
    },
    'c1b': {
      type: 'consequence', outcomeClass: 'outcome-good', outcomeLabel: 'You Read It Right',
      heading: 'You treated a sudden change in a reliable officer as the signal it is.',
      narrative: [
        'You pull Ferris aside privately, tell him plainly that you\'ve noticed the change and you\'re concerned about him, and you point him toward support rather than a write-up. He doesn\'t open up all at once — but the door is open, and he knows someone saw.',
        'Noticing, saying something directly, and pointing toward resources is the whole job here.'
      ],
      legal: 'Module standard: notice, speak directly, and point toward resources; recognize STS warning signs as wellness concerns, not conduct problems.',
      next: 'd2'
    },
    'c1c': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Waiting Is the Wrong Bet',
      heading: 'By the time the work formally fails, the window to help early is gone.',
      narrative: [
        'Waiting for a formal failure ignores that the warning signs are already here and that officers experiencing STS are often the last to recognize it in themselves. Early recognition is the thing that works; waiting forfeits it.',
        'You may be the only person positioned to see it early enough to matter.'
      ],
      legal: 'Module standard: STS is preventable with early recognition; the warning signs require action, not a wait-and-see.',
      next: 'd2'
    },
    'c1d': {
      type: 'consequence', outcomeClass: 'outcome-neutral', outcomeLabel: 'A Move Is Not a Conversation',
      heading: 'Quietly reassigning Ferris sidesteps the one thing he needs — to be seen and engaged.',
      narrative: [
        'Shifting him to a slower beat without a word may reduce his load, but it skips the direct conversation and the resources, and it can read as a silent demotion. The intervention here is to engage, not to relocate.',
        'Talk to him; point him to support.'
      ],
      legal: 'Module standard: the obligation is to notice, say something directly, and point toward resources — not to manage the problem silently.',
      next: 'd2'
    },
    'd2': {
      type: 'decision',
      decisionNumber: 2,
      situation: 'In the conversation, Ferris asks — guardedly — where he could turn that "won\'t wreck my career," and what would actually stay confidential. He is clearly stressed but is not in acute crisis.',
      question: 'How do you guide him?',
      options: [
        { text: 'Tell him anything he says to anyone will get back to the chain.', next: 'c2a', quality: 'bad', shortLabel: 'Misstated confidentiality, deterred help' },
        { text: 'Point him to peer support as the right first step — confidential within limits, non-disciplinary, no effect on fitness-for-duty — and accurately describe the limits (imminent harm, serious crime, court order).', next: 'c2b', quality: 'good', shortLabel: 'Accurate resources + confidentiality limits' },
        { text: 'Tell him everything is fully confidential with no exceptions to reassure him.', next: 'c2c', quality: 'risky', shortLabel: 'Overpromised confidentiality' },
        { text: 'Tell him to just handle it on his own to keep it off the books.', next: 'c2d', quality: 'bad', shortLabel: 'Reinforced the silence' },
      ]
    },
    'c2a': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'You Shut the Door',
      heading: 'Telling him everything gets back to the chain guarantees he reaches out to no one.',
      narrative: [
        'That\'s not how peer support or EAP work — both are confidential within defined limits and EAP sits outside the chain of command entirely. Misstating it confirms his fear and keeps him isolated.',
        'Give him the accurate picture so he\'ll actually use the help.'
      ],
      legal: 'MTPD peer support and EAP: confidential within policy limits; EAP is outside the chain of command and not reported to supervisors.',
      next: 'd3'
    },
    'c2b': {
      type: 'consequence', outcomeClass: 'outcome-good', outcomeLabel: 'The Right Door, Honestly Described',
      heading: 'You gave him peer support as the first step and the truth about its limits.',
      narrative: [
        'You explain that peer support is confidential within policy limits, is not a disciplinary matter, and does not affect his fitness-for-duty status — the right first step for stress short of crisis — and you\'re honest about the limits: imminent harm, a serious criminal offense, or a court order. He knows exactly what he\'s walking into, which is what lets him walk in.',
        'Accurate information is what makes the resource usable.'
      ],
      legal: 'MTPD peer support: confidential within limits, non-disciplinary, no fitness-for-duty effect; confidentiality limits are imminent harm, serious crime, or court order.',
      next: 'd3'
    },
    'c2c': {
      type: 'consequence', outcomeClass: 'outcome-neutral', outcomeLabel: 'Don\'t Overpromise',
      heading: 'Promising no exceptions sets him up for a damaging surprise.',
      narrative: [
        'Telling Ferris everything is absolutely confidential is inaccurate — the limits for imminent harm, serious crime, and court orders exist. If one is ever triggered, the broken promise destroys his trust in you and the program.',
        'Describe the limits honestly; the truth is reassuring enough.'
      ],
      legal: 'MTPD peer support and EAP: confidentiality has defined limits; officers are entitled to know them before disclosing.',
      next: 'd3'
    },
    'c2d': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'That\'s the Culture That Kills',
      heading: '"Handle it on your own" is the silence the module warns is lethal.',
      narrative: [
        'Telling Ferris to manage it himself to keep it off the books reinforces exactly the culture of silence the module identifies as a deadly threat. He came to you for a door; you closed it.',
        'Point him to peer support and stay engaged.'
      ],
      legal: 'Module standard: the culture of silence kills officers; the supervisor\'s job is to point toward resources, not away from them.',
      next: 'd3'
    },
    'd3': {
      type: 'decision',
      decisionNumber: 3,
      situation: 'Near the end of the conversation, Ferris says quietly that lately he doesn\'t really see a future for himself and has "started getting his affairs in order." He immediately waves it off as "just venting."',
      question: 'What do you do?',
      options: [
        { text: 'Accept that it was just venting and wrap up the conversation.', next: 'c3a', quality: 'bad', shortLabel: 'Rationalized a hopelessness statement' },
        { text: 'Treat it as imminent risk requiring immediate action — ask directly, stay with him, and engage peer support or EAP right now, because this is the defined limit where confidentiality yields to safety.', next: 'c3b', quality: 'good', shortLabel: 'Acted immediately on imminent risk' },
        { text: 'Tell him to take a few days off and check back with him next week.', next: 'c3c', quality: 'bad', shortLabel: 'Delayed action on a crisis statement' },
        { text: 'Note the comment in his file and bring it up at his next review.', next: 'c3d', quality: 'bad', shortLabel: 'Filed it instead of acting' },
      ]
    },
    'c3a': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'The One Thing You Never Rationalize',
      heading: 'A statement about not seeing a future and getting affairs in order is not "just venting."',
      narrative: [
        'Accepting the wave-off rationalizes exactly the kind of statement the module says requires immediate action. The "just venting" minimization is common and is not a reason to stand down.',
        'This is the moment everything else in the module was preparing you for — and it requires acting now, not letting it pass.'
      ],
      legal: 'Module standard: statements suggesting no future or final arrangements require immediate action; do not rationalize them.',
      next: 'debrief'
    },
    'c3b': {
      type: 'consequence', outcomeClass: 'outcome-good', outcomeLabel: 'You Acted When It Counted',
      heading: 'You recognized imminent risk and moved immediately — exactly right.',
      narrative: [
        'You don\'t let the "just venting" wave-off end it. You ask him directly, you stay with him, and you engage peer support or EAP right then — treating it as the imminent-risk situation it is, where confidentiality yields to safety. You don\'t leave him alone with it.',
        'Recognizing the warning sign and acting on it without delay is the entire point of this training — and the kind of moment where a supervisor saves a life.'
      ],
      legal: 'Module standard: hopelessness/final-arrangements statements require immediate action — ask directly, stay with the officer, engage resources; imminent risk of harm is the confidentiality limit where safety controls.',
      next: 'debrief'
    },
    'c3c': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'A Crisis Statement Can\'t Wait a Week',
      heading: 'Time off and a check-in next week leaves him alone with the exact risk you just heard.',
      narrative: [
        'Sending Ferris home and planning to follow up later responds to an imminent-risk statement with delay. Statements suggesting no future require action now — not a scheduled check-in after days alone.',
        'Stay with him and engage resources immediately.'
      ],
      legal: 'Module standard: imminent-risk statements require immediate action, not a deferred follow-up.',
      next: 'debrief'
    },
    'c3d': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'You Filed an Emergency',
      heading: 'Documenting it for a future review treats a safety crisis as paperwork.',
      narrative: [
        'Noting the comment for his next review responds to a potential life-safety emergency with a filing action. The statement demands an immediate, direct response and engagement of resources — not a note to revisit later.',
        'Act now; the file is not the intervention.'
      ],
      legal: 'Module standard: statements suggesting no future or final arrangements require immediate action, not documentation for a later date.',
      next: 'debrief'
    },
    'debrief': { type: 'debrief' },
  }
};
