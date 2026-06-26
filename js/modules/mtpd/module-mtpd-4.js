/* ═══════════════════════════════════════════
   MTPD — Module 4: Crisis Intervention & De-Escalation

   Reading extracted byte-for-byte from the former app.js hardcoded
   branch. Supervisor variants anchored to MTPD ALO 5.4, the PA Mental
   Health Procedures Act 50 P.S. § 7302, PA Act 59 of 2020, and MTPD
   Orders 4.07 / 3.02. Never borrow EGPD policy, framing, or roads.
═══════════════════════════════════════════ */

const READING_CRISIS = `
      <div class="content-block">
        <h4>Scenario</h4>
        <h2>A mother calls because her son hasn\'t taken his medication in two days, said he didn\'t want to be here anymore, and won\'t answer her calls. He\'s at his house on Main Street. You\'re first on scene.</h2>
        <p>This module covers Crisis Intervention Team (CIT) principles, the Pennsylvania Mental Health Procedures Act, de-escalation techniques specific to mental health encounters, and the legal framework for 302 involuntary examinations.</p>
      </div>
      <div class="content-block">
        <h4>Core Principle</h4>
        <h2>Mental Health Calls Are Different — and the Law Reflects That</h2>
        <p>Individuals in mental health crisis do not respond to commands, authority, or force the way non-crisis individuals do. What triggers compliance in a standard encounter frequently triggers flight-or-fight in someone experiencing acute psychiatric distress. The approach that works on a combative suspect can transform a distressed person into a dangerous situation.</p>
        <p>Pennsylvania law and department policy recognize this. MTPD ALO 5.4 requires officers to consider and employ de-escalation techniques in all situations where it is safe and feasible to do so, and PA Act 59 of 2020 mandates annual statewide training in de-escalation. This is not optional guidance — it is a documented requirement.</p>
        <div class="case-law-box">
          <div class="case-title">Pennsylvania Mental Health Procedures Act — 50 P.S. § 7302</div>
          <p>A 302 involuntary examination may be initiated by a law enforcement officer when a person poses a clear and present danger to themselves or others based on a recent overt act, attempt, or threat. The officer must document the specific factual basis — a general mental health crisis or prior psychiatric history alone does not satisfy the standard. When criteria are met, document precisely. When they aren\'t, don\'t force the standard.</p>
        </div>
        <div class="case-law-box">
          <div class="case-title">PA Act 59 of 2020 &amp; MTPD ALO 5.4 — De-escalation</div>
          <p>Pennsylvania Act 59 of 2020 mandates annual de-escalation training for municipal officers — including techniques for interacting with individuals whose behavior indicates mental illness, intellectual disability, or autism. MTPD ALO 5.4 makes the operational requirement explicit: officers shall consider and employ de-escalation techniques where safe and feasible. In mental health encounters, your approach itself — your tone, distance, pace, and language — is part of your tactical and legal decision-making. Document de-escalation efforts as carefully as you document force.</p>
        </div>
      </div>
      <div class="content-block">
        <h4>CIT Principles for Initial Contact</h4>
        <ul class="key-points">
          <li><strong>Slow down</strong> — Time is almost always your ally in a mental health call. A 20-minute contact that builds rapport is more likely to resolve safely than a 2-minute intervention that escalates to force.</li>
          <li><strong>Reduce your energy</strong> — Match your tone and pace to the outcome you want. Calm approach invites calm response. Authoritative commands invite fight-or-flight.</li>
          <li><strong>Use the person\'s name</strong> — It humanizes the interaction and signals that you are there as a person, not a threat.</li>
          <li><strong>Offer choices, not commands</strong> — "Would you be willing to talk to me for a minute?" is more effective than "Come over here." Autonomy reduces threat response.</li>
          <li><strong>Position for safety without appearing tactical</strong> — Know where your partner is. Know the exits. Don\'t make your safety positioning visible in your demeanor.</li>
        </ul>
      </div>
      <div class="content-block">
        <h4>The 302 Process</h4>
        <h2>Know the standard. Document to it. Don\'t overreach it.</h2>
        <p>A 302 involuntary examination is a significant legal intervention — it removes a person\'s liberty without their consent. The criteria exist for a reason, and courts have scrutinized 302 initiations that weren\'t grounded in documented specific facts.</p>
        <p>The standard requires a <strong>recent overt act, attempt, or threat</strong> establishing clear and present danger. Past psychiatric history supports context — it does not, by itself, establish current criteria. A statement like "I don\'t want to be here anymore," combined with medication non-compliance and a 2-day crisis episode, begins to build the standard. Document every element you observed. Let the facts carry the 302, not your general assessment that the situation seemed serious.</p>
        <div class="sop-box">
          <div class="sop-title">MTPD Order 4.07 — Juvenile Detention Rules</div>
          <p>Juveniles shall not be detained in any lockup or cell that houses adults. When secure detention of a juvenile is necessary, it is limited to identification, investigation, processing, and transfer — and may <strong>not exceed six hours</strong> in any case. Juveniles held in secure detention must be separated from adult offenders by sight and sound and under continuous visual supervision of a sworn officer at all times.</p>
          <p>Fingerprints and photographs shall be taken of any juvenile alleged to have committed an act designated as a misdemeanor or felony. Juvenile records are kept separate from adult records and are not disclosed to the public without Chief of Police authorization.</p>
        </div>
        <div class="sop-box">
          <div class="sop-title">MTPD Order 3.02 — Temporary Detention</div>
          <p>All detainees in the temporary holding area shall be thoroughly searched prior to entry regardless of any prior field search. Males, females, and juveniles under arrest must be separated by sight and sound using separate rooms or areas. All firearms must be secured in designated lock boxes before entry into any temporary detention area. Detainees may not be left unsupervised for more than <strong>10 minutes</strong> under any circumstances, and must be physically secured during any period of non-supervision.</p>
        </div>
        <button class="btn-launch" onclick="startScenario('crisis-intervention')">Proceed to Scenario Exercise →</button>
      </div>
    `;

/* ══════════════════════════════════════════
   SUPERVISOR OVERLAY — Crisis Intervention (MTPD)
══════════════════════════════════════════ */
const SUPERVISOR_CRISIS = `
  <div class="content-block">
    <h4>Supervisor Focus</h4>
    <h2>On a mental health call, your two highest-value contributions are time and air cover — protecting the officer who is doing patient de-escalation, and reviewing the 302 before it removes someone's liberty.</h2>
    <p>Mental health calls reward patience and punish urgency, and the pressure to "wrap it up" almost always comes from above. As the supervisor you set the clock. You also review the legal product: a 302 is an involuntary deprivation of liberty that must rest on documented specific facts, and a de-escalation record under ALO 5.4 is part of the force file if the call ever turns. Get both right.</p>
  </div>
  <div class="content-block">
    <h4>Reviewing the 302 — Document to the Standard, Don't Overreach It</h4>
    <h2>A 302 needs a recent overt act, attempt, or threat — not a history and a hunch.</h2>
    <p>Under 50 P.S. § 7302, an officer may initiate an involuntary examination only when the person poses a clear and present danger to self or others based on a recent overt act, attempt, or threat. When you review a 302, look for the specific facts: what the person said or did, when, and why it establishes current danger. Prior psychiatric history is context — it does not, by itself, satisfy the standard, and a 302 built on history alone is the kind courts scrutinize. The supervisory failure runs both ways: approving a 302 that overreaches the standard exposes the department, and discouraging a 302 that the facts clearly support leaves a dangerous situation unaddressed. Hold the record to the facts.</p>
  </div>
  <div class="content-block">
    <h4>Protecting De-escalation Under ALO 5.4</h4>
    <ul class="key-points">
      <li><strong>Time is the tactic</strong> — When the officer on scene reports the subject is calming and the approach is working, an abrupt change in tactics can re-escalate after rapport was built. If you push to "wrap it up" over a working de-escalation, you may own the escalation that follows. Support patient de-escalation when you get a clear status update.</li>
      <li><strong>Document the effort</strong> — ALO 5.4 requires officers to document the specific de-escalation techniques used, the subject's response, and why de-escalation was or was not continued. On review, confirm that record exists — it is part of the file if the encounter later involves force.</li>
      <li><strong>Safe and feasible is a genuine assessment</strong> — ALO 5.4 requires de-escalation where safe and feasible, judged on the totality. Confirm the report reflects a real assessment, not a conclusion written after force was already chosen.</li>
    </ul>
  </div>
  <div class="content-block">
    <h4>If the Subject Is Detained — Orders 3.02 and 4.07</h4>
    <ul class="key-points">
      <li><strong>Temporary detention (3.02)</strong> — Confirm the detainee was searched before entry regardless of any field search, firearms were secured in lock boxes, males/females/juveniles were separated by sight and sound, and no detainee was left unsupervised more than 10 minutes. These are continuous-supervision rules, and a crisis subject in custody is exactly who they protect.</li>
      <li><strong>Juveniles (4.07)</strong> — A juvenile is never held in a cell that houses adults, secure detention is limited to identification/investigation/processing/transfer and may not exceed six hours, and the juvenile is separated from adults by sight and sound under continuous visual supervision of a sworn officer.</li>
    </ul>
  </div>
  <div class="content-block">
    <h4>From Catch to Correction</h4>
    <p>A 302 written to the standard protects the subject, the officer, and the department; a thin de-escalation record undermines the officer's own decisions later. Coach to documenting the facts that carry a 302 and the techniques that satisfy ALO 5.4. When you see a pattern — 302s resting on history alone, or de-escalation never documented — make it a training issue and escalate as warranted. Every record you approve carries your name.</p>
  </div>
`;

function getCrisisSupervisorQuestions() {
  return [
    {
      scenario: 'You review a 302 an officer initiated. The factual basis reads: "Subject has a long history of mental illness and prior psychiatric hospitalizations. Family is concerned. Subject taken for involuntary examination."',
      text: 'What is the correct supervisory assessment under 50 P.S. § 7302?',
      options: [
        'Approve it — a well-documented prior psychiatric history is by itself sufficient to support a 302.',
        'Flag it — § 7302 requires a recent overt act, attempt, or threat establishing clear and present danger; prior history alone does not satisfy the standard, so the record must establish the specific recent facts or the 302 overreaches.',
        'Approve it — once family expresses concern, the officer has no discretion but to initiate a 302.',
        'Reject the entire welfare-check contact as improper, on the basis that a 302 was considered at all.'
      ],
      correct: 1,
      feedback: 'Correct. 50 P.S. § 7302 requires a recent overt act, attempt, or threat establishing clear and present danger. Past psychiatric history is context, not the standard. A 302 grounded only in history is the kind courts scrutinize, and the record must show the specific recent facts.'
    },
    {
      scenario: 'An officer on a welfare check reports by radio that the subject is steadily calming down, the de-escalation approach is working, and he expects a voluntary resolution if given more time. From the station, command is suggesting it is time to "wrap it up and clear the call."',
      text: 'What is the appropriate supervisory action?',
      options: [
        'Direct the officer to move to a physical resolution now, in order to clear the call as quickly as possible.',
        'Order an immediate 302 to bring the call to an end, regardless of whether the § 7302 criteria are met.',
        'Tell the officer to simply leave the scene, so that the subject is forced to make a decision on his own.',
        'Support continued de-escalation for a defined additional window based on the officer\'s status update, because an abrupt change in tactics after rapport was built can re-escalate the situation, and ALO 5.4 favors de-escalation where safe and feasible.'
      ],
      correct: 3,
      feedback: 'Correct. When the officer reports de-escalation is working, an abrupt tactical change can re-escalate the encounter. ALO 5.4 favors de-escalation where safe and feasible. The supervisor supports a defined additional time window rather than forcing a fast physical resolution. Time spent on a call does not, by itself, create § 7302 criteria.'
    },
    {
      scenario: 'A use-of-force report from a mental health call documents the force in detail but says nothing about whether de-escalation was attempted, what techniques were used, or how the subject responded before force was applied.',
      text: 'What should your review require under MTPD ALO 5.4?',
      options: [
        'Return it to document the de-escalation assessment and efforts — the specific techniques used, the subject\'s response, and why de-escalation was or was not continued — because ALO 5.4 requires that record and it is part of the force file.',
        'Nothing needs to change here — de-escalation is optional on these calls and need not be documented at all.',
        'Approve it as written — the detailed force documentation alone is sufficient for a report of this kind.',
        'Remove the use of force from the report entirely, since de-escalation was never mentioned in the narrative.'
      ],
      correct: 0,
      feedback: 'Correct. MTPD ALO 5.4 requires officers to document the specific de-escalation techniques used, the subject\'s response, and why de-escalation was or was not continued. On a force-involved mental health call, that record is part of the file and must be present before approval.'
    },
    {
      scenario: 'A subject taken into custody following a mental health crisis is placed in the temporary holding area. The officer field-searched him at the scene and tells you a second search before entry "would be redundant."',
      text: 'What does MTPD Order 3.02 require?',
      options: [
        'Skip the second search on entry — the officer\'s prior field search at the scene already satisfies the requirement.',
        'Place the subject in any cell that happens to be available, since he is not a criminal arrestee in custody.',
        'Require a thorough search before entry to the temporary holding area regardless of any prior field search, because Order 3.02 mandates it — along with securing firearms in lock boxes and not leaving the detainee unsupervised more than 10 minutes.',
        'Leave the subject unsupervised in the holding area while the officer steps away to complete his paperwork.'
      ],
      correct: 2,
      feedback: 'Correct. MTPD Order 3.02 requires every detainee to be thoroughly searched before entry to the temporary holding area regardless of any prior field search, firearms secured in lock boxes, and no detainee left unsupervised for more than 10 minutes. A crisis subject in custody is exactly who these continuous-supervision rules protect.'
    },
    {
      scenario: 'A 16-year-old in apparent crisis is taken into secure detention pending transfer. An officer places the juvenile in a holding cell adjacent to an adult arrestee, within sight and sound, to keep both under one officer\'s watch.',
      text: 'How do you correct this under MTPD Order 4.07?',
      options: [
        'Correct it immediately — Order 4.07 prohibits detaining a juvenile in a cell that houses adults and requires separation from adults by sight and sound under continuous visual supervision of a sworn officer, with secure detention limited to identification, investigation, processing, and transfer.',
        'Approve it as arranged — keeping both the juvenile and the adult under one officer is the most efficient supervision.',
        'Allow it to stand, as long as the juvenile is ultimately released from detention within 24 hours.',
        'Move the adult arrestee instead, and leave the juvenile unsupervised in the adjacent holding cell.'
      ],
      correct: 0,
      feedback: 'Correct. MTPD Order 4.07 bars holding a juvenile in a cell that houses adults and requires sight-and-sound separation under continuous visual supervision of a sworn officer. Secure detention is limited to identification, investigation, processing, and transfer and may not exceed six hours.'
    },
    {
      scenario: 'An officer\'s initial approach on a mental health call was loud and command-driven, the subject escalated, and force followed. The report frames the escalation as solely the subject\'s unpredictability and does not address the approach.',
      text: 'What is the supervisory review point under ALO 5.4 and CIT principles?',
      options: [
        'Accept the framing — mental health subjects are inherently unpredictable and the approach is irrelevant.',
        'Note that an authoritative, command-driven approach frequently triggers escalation in crisis, and ALO 5.4 calls for de-escalation where safe and feasible; the report should honestly assess the approach and the de-escalation opportunity, not attribute the outcome solely to the subject.',
        'Discipline the subject\'s family members for having called the police about him in the first place.',
        'Approve it without any comment, on the basis that the use of force itself was thoroughly documented.'
      ],
      correct: 1,
      feedback: 'Correct. CIT principles recognize that authoritative commands often trigger fight-or-flight in someone in crisis, and ALO 5.4 calls for de-escalation where safe and feasible. The review point is an honest assessment of the approach and the de-escalation opportunity — not attributing the escalation solely to the subject.'
    },
    {
      scenario: 'An officer wants to initiate a 302 on a calm, cooperative subject solely because the subject experiences a diagnosed condition, with no recent overt act, attempt, or threat described.',
      text: 'What is your guidance?',
      options: [
        'Approve the 302 — the subject\'s diagnosed condition is by itself enough to meet the § 7302 standard.',
        'Initiate the 302 anyway just to be cautious, since the subject\'s liberty interests are secondary to safety.',
        'Do not initiate on these facts — § 7302 requires a recent overt act, attempt, or threat establishing clear and present danger; a diagnosis without such conduct does not meet the standard, and the record should reflect that the criteria were not met.',
        'Direct the officer to detain the subject under the temporary-detention order instead of pursuing a 302.'
      ],
      correct: 2,
      feedback: 'Correct. 50 P.S. § 7302 requires a recent overt act, attempt, or threat establishing clear and present danger. A diagnosis alone, with a calm and cooperative subject and no qualifying conduct, does not meet the standard. The supervisor guides documenting that the criteria were not met rather than overreaching the 302.'
    },
    {
      scenario: 'Reviewing recent calls, you find one officer\'s mental health reports consistently omit any de-escalation documentation and twice initiated 302s supported only by psychiatric history. You discussed the 302 standard with this officer once before.',
      text: 'What is the appropriate supervisory response now?',
      options: [
        'Continue with informal reminders — the officer is conscientious overall and will most likely improve on his own.',
        'Take no action at this point, since each of these mental health calls is genuinely a separate event.',
        'Quietly stop assigning the officer to mental health calls, without documenting any of the underlying concerns.',
        'Move to documented corrective action and targeted training on the § 7302 standard and ALO 5.4 documentation, because a repeated pattern after coaching is a supervisory and training issue; escalate as the pattern warrants.'
      ],
      correct: 3,
      feedback: 'Correct. One instance is a coaching moment; a documented pattern after coaching — 302s on history alone and missing de-escalation records — is a supervisory and training issue requiring documented corrective action and escalation tied to the § 7302 standard and ALO 5.4.'
    },
  ];
}

/* ══════════════════════════════════════════
   SUPERVISOR SCENARIO — Crisis Intervention (MTPD)
   You supervise Officer Kessler's Main Street welfare check by radio,
   then review the 302 and the report. Fictional officer.
══════════════════════════════════════════ */
const SCENARIO_CRISIS_SUP = {
  id: 'scenario-crisis-intervention-sup',
  title: 'Supervisor Review — Main Street Welfare Check',
  location: 'Shift Supervisor — Main Street Welfare Check',
  totalDecisions: 3,
  nodes: {
    'start': {
      type: 'scene',
      time: '19:20',
      weather: 'Clear, dusk',
      unit: 'Shift Supervisor',
      narrative: [
        'Officer Kessler is on a welfare check at a Main Street residence — a man whose mother reports he stopped his medication two days ago and said "he didn\'t want to be here anymore." You are running the shift and monitoring by radio.',
        'How you manage the clock, the 302 decision, and the after-action record will shape whether this resolves safely and holds up on review.'
      ],
      next: 'd1'
    },
    'd1': {
      type: 'decision',
      decisionNumber: 1,
      situation: 'Twenty-five minutes in, Kessler advises the subject is calmer, talking with him, and likely to agree to a voluntary evaluation with a little more time. Another command voice on the channel suggests Kessler "speed it up and clear the call."',
      question: 'How do you handle the clock?',
      options: [
        { text: 'Direct Kessler to move to a physical resolution and clear the call.', next: 'c1a', quality: 'bad', shortLabel: 'Forced a fast physical resolution' },
        { text: 'Back Kessler\'s read — authorize a defined additional window since de-escalation is working, and ask for a status check at the end of it.', next: 'c1b', quality: 'good', shortLabel: 'Protected the working de-escalation' },
        { text: 'Order an immediate 302 to end the call.', next: 'c1c', quality: 'bad', shortLabel: 'Forced a 302 to clear the call' },
        { text: 'Tell Kessler to step back and leave so the subject decides on his own.', next: 'c1d', quality: 'risky', shortLabel: 'Pulled the officer mid-contact' },
      ]
    },
    'c1a': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'You Owned the Escalation',
      heading: 'Forcing speed onto a working de-escalation is how a calm contact turns into a fight.',
      narrative: [
        'Kessler had rapport and a likely voluntary outcome. Pushing to a physical resolution to clear the call re-escalated the subject — and the force that followed traces directly to the order to rush.',
        'On a mental health call, time is the tactic. As the supervisor, you set the clock; you set it wrong.'
      ],
      legal: 'MTPD ALO 5.4: officers shall consider and employ de-escalation where safe and feasible — supported, not overridden, by the supervisor.',
      next: 'd2'
    },
    'c1b': {
      type: 'consequence', outcomeClass: 'outcome-good', outcomeLabel: 'Air Cover for the De-escalation',
      heading: 'You gave the officer time and asked for a status check — the highest-value thing a supervisor does here.',
      narrative: [
        'You authorize a defined additional window and ask Kessler to update you at the end of it. A few minutes later the subject agrees to a voluntary evaluation and walks out without force.',
        'Patient de-escalation with clear status communication is exactly what good supervision supports.'
      ],
      legal: 'MTPD ALO 5.4: de-escalation where safe and feasible. PA Act 59 of 2020: annual de-escalation training reflects the expectation that officers are given room to use it.',
      next: 'd2'
    },
    'c1c': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'A 302 Is Not a Clearing Tool',
      heading: 'Ordering a 302 to end the call skips the standard and the working voluntary path.',
      narrative: [
        'Kessler was minutes from a voluntary evaluation. Forcing a 302 to clear the call deprives the subject of liberty as a matter of convenience and may not even meet § 7302 if the facts don\'t establish clear and present danger from a recent act.',
        'Let the facts — and the working de-escalation — drive the outcome, not the radio backlog.'
      ],
      legal: '50 P.S. § 7302: an involuntary examination requires a recent overt act, attempt, or threat establishing clear and present danger — not the supervisor\'s wish to clear a call.',
      next: 'd2'
    },
    'c1d': {
      type: 'consequence', outcomeClass: 'outcome-neutral', outcomeLabel: 'Don\'t Pull the Contact Mid-Stride',
      heading: 'Withdrawing the officer during a working contact can collapse the rapport he built.',
      narrative: [
        'Telling Kessler to leave abandons a contact that was succeeding and leaves a possibly at-risk person alone after a disclosure about not wanting to be here. The better move was to back his read and give him a defined window.',
        'Support the de-escalation; don\'t strand it.'
      ],
      legal: 'MTPD ALO 5.4: de-escalation where safe and feasible — sustained with supervisory support, not abandoned.',
      next: 'd2'
    },
    'd2': {
      type: 'decision',
      decisionNumber: 2,
      situation: 'The subject ultimately declines voluntary evaluation, and Kessler initiates a 302. His draft factual basis reads only: "Subject has a history of mental health issues and his mother is worried about him." Kessler did, on scene, hear the subject repeat that he "didn\'t want to be here anymore" and saw the two-day medication lapse.',
      question: 'How do you handle the 302 documentation?',
      options: [
        { text: 'Approve it — the history and the mother\'s concern are enough.', next: 'c2a', quality: 'bad', shortLabel: 'Approved a history-only 302' },
        { text: 'Return it to document the recent overt act/threat and current facts — the repeated statement, the medication lapse, the crisis episode — so the § 7302 standard is met on the record, not on history alone.', next: 'c2b', quality: 'good', shortLabel: 'Required the § 7302 specific facts' },
        { text: 'Reject the 302 — a person who declines evaluation cannot be held.', next: 'c2c', quality: 'bad', shortLabel: 'Wrongly treated refusal as a bar' },
        { text: 'Approve it and tell Kessler to add details later if anyone asks.', next: 'c2d', quality: 'risky', shortLabel: 'Deferred the documentation' },
      ]
    },
    'c2a': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'History Alone Won\'t Hold',
      heading: 'A 302 resting on history and worry is the kind courts scrutinize.',
      narrative: [
        'Kessler actually had the facts that meet the standard — the repeated statement, the medication lapse, the crisis. But the record you approved doesn\'t state them, so on review the 302 looks like it rested on history alone.',
        'The deprivation of liberty is real; the documentation has to carry it.'
      ],
      legal: '50 P.S. § 7302: a recent overt act, attempt, or threat establishing clear and present danger — prior history alone does not satisfy the standard.',
      next: 'd3'
    },
    'c2b': {
      type: 'consequence', outcomeClass: 'outcome-good', outcomeLabel: 'Documented to the Standard',
      heading: 'You made the record state the recent facts that actually meet § 7302.',
      narrative: [
        'You return the draft and Kessler documents the repeated "didn\'t want to be here anymore," the two-day medication lapse, and the ongoing crisis — the specific, recent facts establishing clear and present danger. The 302 now stands on the standard, not on history.',
        'Same outcome for the subject, but a record that protects him, the officer, and the department.'
      ],
      legal: '50 P.S. § 7302: clear and present danger based on a recent overt act, attempt, or threat — documented with specific facts.',
      next: 'd3'
    },
    'c2c': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Refusal Is Not a Bar',
      heading: 'The whole point of a 302 is that it is involuntary.',
      narrative: [
        'A subject\'s refusal of voluntary evaluation does not defeat a 302 — if the § 7302 criteria are met, the examination is involuntary by design. Rejecting the 302 because the subject declined leaves a person who met the standard without intervention.',
        'The question is whether the facts meet § 7302, not whether the subject consents.'
      ],
      legal: '50 P.S. § 7302: an involuntary examination applies precisely when the criteria are met and the subject does not consent.',
      next: 'd3'
    },
    'c2d': {
      type: 'consequence', outcomeClass: 'outcome-neutral', outcomeLabel: 'Document It Now',
      heading: 'A 302\'s factual basis is written when the facts are fresh, not "later if asked."',
      narrative: [
        'Deferring the specific facts leaves an involuntary commitment supported on paper only by history and worry until someone challenges it. By then memory has faded and the record looks thin.',
        'Have Kessler document the recent overt act and current facts before the 302 is finalized.'
      ],
      legal: '50 P.S. § 7302: the specific factual basis establishing clear and present danger is documented contemporaneously.',
      next: 'd3'
    },
    'd3': {
      type: 'decision',
      decisionNumber: 3,
      situation: 'The subject is brought to the station to await transport for the involuntary examination. The holding area already has an adult arrestee from another call. An officer asks whether he can put the subject in the open cell next to the arrestee and step away to start the paperwork.',
      question: 'How do you direct the temporary detention under MTPD Order 3.02?',
      options: [
        { text: 'Allow it — both can be watched from the paperwork desk nearby.', next: 'c3a', quality: 'bad', shortLabel: 'Left detainees with gaps in supervision' },
        { text: 'Require a search before entry regardless of the field search, firearms secured in lock boxes, separation by sight and sound, and no lapse in supervision beyond 10 minutes — assign coverage before anyone steps away.', next: 'c3b', quality: 'good', shortLabel: 'Enforced the Order 3.02 detention rules' },
        { text: 'Skip the search since the subject is a crisis case, not a criminal arrestee.', next: 'c3c', quality: 'bad', shortLabel: 'Waived the mandatory search' },
        { text: 'Leave the subject alone in the cell while the officer does paperwork across the room.', next: 'c3d', quality: 'risky', shortLabel: 'Unsupervised crisis subject' },
      ]
    },
    'c3a': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Glancing Over Is Not Supervision',
      heading: 'A crisis subject and an arrestee left to a desk glance is the gap Order 3.02 forbids.',
      narrative: [
        'Watching "from nearby" while doing paperwork is not the continuous supervision the order requires, and placing the two without proper separation and search invites a serious incident — exactly the risk highest with a subject in crisis.',
        'Set up the detention correctly before anyone\'s attention is split.'
      ],
      legal: 'MTPD Order 3.02: search before entry, firearms in lock boxes, separation by sight and sound, no detainee unsupervised more than 10 minutes.',
      next: 'debrief'
    },
    'c3b': {
      type: 'consequence', outcomeClass: 'outcome-good', outcomeLabel: 'Detention Done Right',
      heading: 'You enforced the search, separation, and continuous-supervision rules before stepping away.',
      narrative: [
        'You direct a search before entry, confirm firearms are secured, separate the crisis subject from the arrestee by sight and sound, and assign coverage so no one is unsupervised beyond the limit. The paperwork waits until supervision is set.',
        'These are the rules that prevent the worst outcomes with an at-risk person in custody.'
      ],
      legal: 'MTPD Order 3.02: thorough search regardless of prior field search, firearms in lock boxes, sight-and-sound separation, no unsupervised period over 10 minutes.',
      next: 'debrief'
    },
    'c3c': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'The Search Is Not Optional',
      heading: 'A crisis subject is exactly who the pre-entry search protects.',
      narrative: [
        'Waiving the search because the subject is a crisis case rather than a criminal arrestee ignores the order and the risk — an at-risk person with an undetected means of self-harm is the nightmare the rule exists to prevent.',
        'Search before entry, every detainee, regardless of any field search.'
      ],
      legal: 'MTPD Order 3.02: all detainees thoroughly searched before entry to the temporary holding area regardless of any prior field search.',
      next: 'debrief'
    },
    'c3d': {
      type: 'consequence', outcomeClass: 'outcome-neutral', outcomeLabel: 'Don\'t Split the Watch',
      heading: 'Leaving a crisis subject alone for paperwork is the supervision gap the order limits.',
      narrative: [
        'An at-risk person awaiting a 302 transport should not be left unsupervised. Order 3.02 caps any unsupervised period and requires physical security during non-supervision; paperwork does not override that.',
        'Assign coverage first, then complete the paperwork.'
      ],
      legal: 'MTPD Order 3.02: no detainee left unsupervised more than 10 minutes and physically secured during any non-supervision.',
      next: 'debrief'
    },
    'debrief': { type: 'debrief' },
  }
};
