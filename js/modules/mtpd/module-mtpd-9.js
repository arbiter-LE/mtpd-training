/* ═══════════════════════════════════════════
   MTPD — Module 9: Emotional Intelligence

   Reading extracted byte-for-byte from the former app.js hardcoded
   branch. Supervisor variants anchored to MTPD ALO 4.13 (follow-up
   victim contacts) and the IACP demeanor research in the reading.
   Never borrow EGPD policy, framing, or roads.
═══════════════════════════════════════════ */

const READING_EI = `
      <div class="content-block">
        <h4>What Emotional Intelligence Actually Means in the Field</h4>
        <p>Emotional intelligence (EI) is not a soft skill. In law enforcement, it is a tactical skill. It is the ability to read what is happening emotionally in an interaction — in the subject, in bystanders, and in yourself — and adjust your approach to get the outcome the situation actually requires.</p>
        <p>Psychologist Daniel Goleman identifies five components of EI: self-awareness, self-regulation, motivation, empathy, and social skill. In patrol work, self-regulation and empathy are the two that show up on every difficult call.</p>
      </div>
      <div class="content-block">
        <h4>Self-Regulation Under Pressure</h4>
        <p>Self-regulation is the ability to manage your own emotional response before it manages you. A subject who is hostile, irrational, or disrespectful is not targeting you personally — they are responding to fear, pain, trauma, or intoxication. Officers who respond to hostility with matching hostility escalate situations that could have been contained. Officers who absorb the first 10 seconds of aggression without matching it change the trajectory of the call.</p>
        <p>This is not passive. Self-regulation is an active choice made in real time. It requires awareness that you are being triggered and the discipline to respond from your training rather than your reaction.</p>
      </div>
      <div class="content-block">
        <h4>Empathy as a Tactical Tool</h4>
        <p>Empathy in law enforcement does not mean agreement. It means accurate perception of another person\'s emotional state — and using that perception to inform your approach. A DV victim who presents as hostile is not hostile toward you; she is protecting herself from a system that has failed her before. A subject in mental health crisis is not being difficult; he is terrified. Reading the actual situation — not the surface presentation — leads to better outcomes with less force.</p>
        <div class="case-law-box">
          <div class="case-title">IACP Research — Victim Cooperation and Officer Demeanor</div>
          <p>International Association of Chiefs of Police research consistently finds that officer demeanor in the first 60 seconds of a victim contact is the strongest predictor of whether that victim will cooperate with the criminal justice process. Victims who experience the initial contact as controlling, skeptical, or dismissive are significantly less likely to provide statements, testify, or seek protective orders. The officer\'s emotional approach is not separate from the investigation — it is part of it.</p>
        </div>
      </div>
      <div class="content-block">
        <h4>Trauma-Informed Contact</h4>
        <p>Domestic violence victims, assault victims, and survivors of chronic abuse often present behaviors that officers misread as uncooperativeness: hostility, minimization, recantation, or refusal to engage. These responses are normal trauma responses — not indicators of deception. A trauma-informed approach means understanding this, adjusting your pace and your language, and giving the person space to engage on their terms rather than yours.</p>
        <div class="sop-box">
          <div class="sop-title">MTPD ALO 4.13 — Follow-Up Victim Contacts</div>
          <p>Follow-up welfare checks on DV victims should prioritize safety assessment and victim engagement over documentation efficiency. Officers shall provide information about the victim advocate program and PFA process at every contact. A victim who leaves the contact better informed and feeling respected is more likely to cooperate with prosecution and more likely to call for help before the next incident escalates.</p>
        </div>
        <button class="btn-launch" onclick="startScenario('emotional-intelligence')">Proceed to Scenario Exercise →</button>
      </div>
    `;

/* ══════════════════════════════════════════
   SUPERVISOR OVERLAY — Emotional Intelligence (MTPD)
══════════════════════════════════════════ */
const SUPERVISOR_EI = `
  <div class="content-block">
    <h4>Supervisor Focus</h4>
    <h2>Your own regulation sets the ceiling for the whole squad, and the demeanor your officers bring to a victim is part of the investigation you are responsible for.</h2>
    <p>Emotional intelligence is a tactical skill at the patrol level and a force-multiplier at the supervisory level. The officers around you calibrate to your composure on a chaotic scene, and the outcomes of your shift's victim contacts turn on demeanor as much as on procedure. Your job is to model self-regulation, coach the officers whose approach is costing cooperation, and make sure follow-up victim contacts meet the ALO 4.13 standard rather than getting reduced to paperwork.</p>
  </div>
  <div class="content-block">
    <h4>Demeanor Is Part of the Case — IACP</h4>
    <h2>The first 60 seconds of a victim contact predict cooperation better than anything else.</h2>
    <p>IACP research consistently finds that officer demeanor in the first 60 seconds of a victim contact is the strongest predictor of whether the victim will cooperate with the criminal justice process — provide a statement, testify, seek a protective order. A controlling, skeptical, or dismissive first contact suppresses cooperation, which means an officer's emotional approach is not separate from the investigation; it is part of it. When you debrief a call where a victim "wouldn't cooperate," ask about the first minute. Often the cooperation problem is a demeanor problem you can coach — and the fix raises clearance and conviction outcomes, not just morale.</p>
  </div>
  <div class="content-block">
    <h4>Read Trauma as Trauma, Not Deception</h4>
    <ul class="key-points">
      <li><strong>Don't let officers misread trauma responses</strong> — Hostility, minimization, recantation, and refusal to engage are normal trauma responses, not indicators of deception. An officer who treats a recanting DV victim as a liar has misread the situation; coach the trauma-informed approach — adjust pace and language, give space, engage on the person's terms.</li>
      <li><strong>Empathy is accurate perception, not agreement</strong> — A hostile victim is often protecting herself from a system that failed her before; a "difficult" crisis subject is terrified. Teach officers to read the actual situation, which produces better outcomes with less force.</li>
      <li><strong>Self-regulation is the trainable core</strong> — Matching a subject's hostility escalates a call that could have been contained. Absorbing the first ten seconds without matching it changes the trajectory. This is an active choice, and the supervisor who models it teaches it.</li>
    </ul>
  </div>
  <div class="content-block">
    <h4>Hold Follow-Up Victim Contacts to ALO 4.13</h4>
    <p>ALO 4.13 sets the standard for follow-up DV victim contacts: prioritize safety assessment and victim engagement over documentation efficiency, and provide information about the victim advocate program and the PFA process at every contact. When you review or assign these follow-ups, confirm they are treated as engagement opportunities, not boxes to check — an officer who races a welfare check to clear it, skipping the advocate and PFA information, has missed the point of the contact. A victim who leaves better informed and feeling respected is more likely to cooperate with prosecution and to call for help before the next incident escalates. That outcome is the whole reason the contact exists.</p>
  </div>
  <div class="content-block">
    <h4>From Catch to Correction</h4>
    <p>Demeanor and self-regulation are coachable, and the payoff is measurable in cooperation and de-escalated calls. Debrief the first 60 seconds, model composure on chaotic scenes, and hold follow-up contacts to ALO 4.13. An officer whose approach repeatedly escalates contacts or suppresses victim cooperation after coaching is a training and supervisory issue you document and address. The emotional tone you set is the one your squad carries to the next victim.</p>
  </div>
`;

function getEISupervisorQuestions() {
  return [
    {
      scenario: 'An officer reports that a DV victim "wouldn\'t cooperate" and gave no statement. Reviewing his body camera, you see his first contact was clipped, skeptical, and focused on getting the call cleared. The victim shut down within the first minute.',
      text: 'What does the IACP research point you to address?',
      options: [
        'Nothing — some victims simply refuse to cooperate and demeanor is irrelevant.',
        'Coach the demeanor problem — IACP research finds officer demeanor in the first 60 seconds of a victim contact is the strongest predictor of cooperation, so a skeptical, dismissive opening likely suppressed the statement, and the emotional approach is part of the investigation.',
        'Discipline the victim for failing to cooperate with the investigation.',
        'Reassign the case to detectives without addressing the contact.'
      ],
      correct: 1,
      feedback: 'Correct. IACP research identifies officer demeanor in the first 60 seconds as the strongest predictor of victim cooperation. A clipped, skeptical opening that shut the victim down is a demeanor problem to coach — the officer\'s emotional approach is part of the investigation, not separate from it.'
    },
    {
      scenario: 'On a follow-up welfare check at a DV victim\'s home, an officer completes the contact in two minutes, documents "victim fine, no new issues," and does not provide victim advocate or PFA information because "she already knows the drill."',
      text: 'How do you handle this under MTPD ALO 4.13?',
      options: [
        'Approve it — a quick check that confirms the victim is fine is efficient.',
        'Return it and coach the standard — ALO 4.13 requires follow-up contacts to prioritize safety assessment and victim engagement over documentation efficiency and to provide victim advocate and PFA information at every contact, not just the first.',
        'Tell the officer to stop doing follow-up checks since they take too long.',
        'Approve it but mail the victim a pamphlet instead.'
      ],
      correct: 1,
      feedback: 'Correct. MTPD ALO 4.13 requires follow-up DV contacts to prioritize safety assessment and engagement over documentation efficiency and to provide victim advocate and PFA information at every contact. "She already knows" does not meet the standard; the contact exists to inform and engage, not just to clear.'
    },
    {
      scenario: 'A newer officer treats a DV victim who recanted her earlier statement as a liar who "wasted everyone\'s time," and says he is done taking her seriously.',
      text: 'What is the supervisory coaching point?',
      options: [
        'Agree — recantation proves the victim was never credible.',
        'Coach the trauma-informed view — recantation, minimization, and hostility are normal trauma responses, not indicators of deception; the approach should adjust pace and language and give the victim space, not write her off.',
        'Direct the officer to charge the victim with filing a false report.',
        'Tell the officer to avoid all contact with that victim going forward.'
      ],
      correct: 1,
      feedback: 'Correct. Recantation, minimization, hostility, and refusal to engage are recognized trauma responses, not proof of deception. The coaching point is the trauma-informed approach: adjust pace and language, give space, and engage on the victim\'s terms rather than writing her off.'
    },
    {
      scenario: 'On a chaotic, emotionally charged scene, an officer begins matching a hostile subject\'s volume and aggression, and the encounter is escalating. The rest of the squad is taking their cue from the rising tension.',
      text: 'What does emotionally intelligent supervision call for here?',
      options: [
        'Match the subject\'s intensity yourself to overwhelm the resistance.',
        'Model and direct self-regulation — lower your own energy and tone to reset the scene, because the officer\'s nervous system sets the ceiling for the encounter and the squad calibrates to your composure.',
        'Order maximum force immediately to end the standoff.',
        'Step back and let the escalation run its course.'
      ],
      correct: 1,
      feedback: 'Correct. Matching hostility escalates a containable call; absorbing it without matching changes the trajectory. Self-regulation is an active choice, and on scene the supervisor\'s composure sets the ceiling — modeling and directing a lower energy resets the encounter and the squad.'
    },
    {
      scenario: 'An officer is frustrated that a victim presenting as hostile and guarded "won\'t just answer the questions" so he can finish the report.',
      text: 'How do you reframe this for the officer using the empathy principle?',
      options: [
        'Tell him to demand answers more forcefully to get the report done.',
        'Reframe the hostility as likely self-protection from a system that has failed her before — empathy means accurately perceiving her emotional state and adjusting the approach, which produces better information and outcomes than pushing for speed.',
        'Tell him to skip the statement and close the case.',
        'Agree that an uncooperative victim is not worth the time.'
      ],
      correct: 1,
      feedback: 'Correct. Empathy is accurate perception of another\'s emotional state, not agreement. A hostile, guarded victim is often protecting herself, and reading the actual situation rather than the surface presentation leads to better information and outcomes — the opposite of pushing for speed.'
    },
    {
      scenario: 'You are about to walk onto a tense scene with several officers already keyed up. You know your demeanor will shape what happens next.',
      text: 'What is the emotionally intelligent supervisory move on arrival?',
      options: [
        'Arrive loud and forceful to assert immediate control.',
        'Arrive composed and deliberate, lowering the emotional temperature, because self-regulation is an active choice and the supervisor\'s tone sets the ceiling the rest of the scene calibrates to.',
        'Stay in the car until the officers resolve it themselves.',
        'Mirror the officers\' energy so they feel supported.'
      ],
      correct: 1,
      feedback: 'Correct. Self-regulation is an active, real-time choice, and on a tense scene the supervisor\'s composure sets the ceiling for everyone. Arriving composed and deliberate lowers the temperature; arriving loud or mirroring the keyed-up energy raises it.'
    },
    {
      scenario: 'An officer\'s instinct is good investigative work, but his blunt, skeptical style consistently produces less cooperative victims and more escalated subjects than his peers handling similar calls.',
      text: 'What is the supervisory approach?',
      options: [
        'Leave it alone — demeanor is personality and cannot be developed.',
        'Treat emotional intelligence as a trainable tactical skill and coach the specific behaviors — the first-60-second approach, self-regulation, and reading the situation — because demeanor drives cooperation and de-escalation outcomes, not just rapport.',
        'Limit the officer to calls with no victims or subjects.',
        'Rate his performance on reports alone and ignore the contacts.'
      ],
      correct: 1,
      feedback: 'Correct. Emotional intelligence is a trainable tactical skill, not fixed personality. The supervisor coaches the specific behaviors — the first-60-second approach, self-regulation, and accurate reading of the situation — because they measurably drive victim cooperation and de-escalation outcomes.'
    },
    {
      scenario: 'Over time, one officer repeatedly draws complaints of a dismissive demeanor, produces uncooperative victims, and skips the advocate and PFA information on follow-up DV contacts. You have coached him on demeanor and ALO 4.13 before.',
      text: 'What is the appropriate supervisory response now?',
      options: [
        'Keep coaching informally — these are interpersonal issues that resolve on their own.',
        'Move to documented corrective action and targeted training on the demeanor/first-60-second standard and the ALO 4.13 follow-up requirements, because a repeated pattern after coaching is a supervisory and training issue affecting victim cooperation and safety; escalate as warranted.',
        'Reassign him away from any victim contact without documentation.',
        'Take no action — demeanor complaints are subjective and not actionable.'
      ],
      correct: 1,
      feedback: 'Correct. One instance is a coaching moment; a documented pattern after coaching — dismissive demeanor, suppressed cooperation, and skipped ALO 4.13 follow-up requirements — is a supervisory and training issue requiring documented corrective action and escalation, with real consequences for victim cooperation and safety.'
    },
  ];
}

/* ══════════════════════════════════════════
   SUPERVISOR SCENARIO — Emotional Intelligence (MTPD)
   You supervise Officer Renner on and after a follow-up DV victim
   contact. Fictional officer.
══════════════════════════════════════════ */
const SCENARIO_EI_SUP = {
  id: 'scenario-emotional-intelligence-sup',
  title: 'Supervisor Review — Follow-Up Victim Contact',
  location: 'Follow-Up Victim Contact, Marlborough Township, PA',
  totalDecisions: 3,
  nodes: {
    'start': {
      type: 'scene',
      time: '16:40',
      weather: 'Overcast',
      unit: 'Shift Supervisor',
      narrative: [
        'Officer Renner handled a DV call earlier in the week and is now doing the follow-up welfare check on the victim. You are supervising the shift and reviewing how the original contact and the follow-up are going.',
        'Demeanor and engagement — not just procedure — will decide whether this victim cooperates and stays safe.'
      ],
      next: 'd1'
    },
    'd1': {
      type: 'decision',
      decisionNumber: 1,
      situation: 'Reviewing Renner\'s body camera from the original call, you see his first 60 seconds with the victim were clipped and skeptical — he led with "so what actually happened here" in a flat, doubting tone. The victim closed down and gave almost nothing. Renner wrote that she "refused to cooperate."',
      question: 'How do you handle it?',
      options: [
        { text: 'Accept his account — the victim simply refused to cooperate.', next: 'c1a', quality: 'bad', shortLabel: 'Took "refused to cooperate" at face value' },
        { text: 'Coach the first-60-second demeanor — his skeptical opening likely suppressed the statement, and per IACP research the emotional approach is part of the investigation, not separate from it.', next: 'c1b', quality: 'good', shortLabel: 'Coached the demeanor as part of the case' },
        { text: 'Tell Renner the victim is a lost cause and move on.', next: 'c1c', quality: 'bad', shortLabel: 'Wrote off the victim' },
        { text: 'Discipline Renner formally for the tone without explaining the standard.', next: 'c1d', quality: 'risky', shortLabel: 'Punished without coaching' },
      ]
    },
    'c1a': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'You Missed the Real Cause',
      heading: '"Refused to cooperate" was the symptom; the opening 60 seconds was the cause.',
      narrative: [
        'By accepting the account at face value, you let a coachable demeanor problem masquerade as an uncooperative victim. The statement that could have built the case never came, and Renner learns nothing — so the next victim gets the same opening.',
        'The first minute was the investigation, and it was lost.'
      ],
      legal: 'IACP research: officer demeanor in the first 60 seconds of a victim contact is the strongest predictor of cooperation; the emotional approach is part of the investigation.',
      next: 'd2'
    },
    'c1b': {
      type: 'consequence', outcomeClass: 'outcome-good', outcomeLabel: 'Coached the First Minute',
      heading: 'You connected the demeanor to the cooperation and made it a teaching moment.',
      narrative: [
        'You show Renner the footage, point out how the skeptical opening shut the victim down, and coach the first-60-second standard: a respectful, non-dismissive approach is part of the investigation, not a nicety. He sees it, and the follow-up is a chance to reset.',
        'Cooperation problems are often demeanor problems — and demeanor is coachable.'
      ],
      legal: 'IACP research: the first 60 seconds predicts cooperation; the officer\'s emotional approach is part of the investigation.',
      next: 'd2'
    },
    'c1c': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Don\'t Write Her Off',
      heading: 'Calling the victim a lost cause locks in the failed first contact.',
      narrative: [
        'Treating the victim as a lost cause confirms Renner\'s misread and forecloses the follow-up that could rebuild engagement. The guardedness was likely self-protection, not refusal.',
        'The follow-up exists precisely to reset a contact that started poorly.'
      ],
      legal: 'IACP research and the empathy principle: a guarded victim is often protecting herself; cooperation can be rebuilt with the right approach.',
      next: 'd2'
    },
    'c1d': {
      type: 'consequence', outcomeClass: 'outcome-neutral', outcomeLabel: 'Discipline Without the Lesson',
      heading: 'Punishing the tone without teaching the standard fixes nothing.',
      narrative: [
        'Formal discipline with no explanation leaves Renner resentful and no clearer on what good looks like. The point is to coach the first-60-second approach so the next contact lands differently.',
        'Teach the standard; reserve formal action for patterns that persist after coaching.'
      ],
      legal: 'IACP research: demeanor is a trainable, outcome-driving skill; coaching the standard is the corrective, not unexplained discipline.',
      next: 'd2'
    },
    'd2': {
      type: 'decision',
      decisionNumber: 2,
      situation: 'On the follow-up visit, the victim is hostile and guarded, and at one point minimizes the original incident and seems ready to recant. Renner radios you, frustrated, saying she is "lying now" and he wants to close it out.',
      question: 'What do you tell him?',
      options: [
        { text: 'Agree — the recantation proves she was never credible; close it.', next: 'c2a', quality: 'bad', shortLabel: 'Treated recantation as proof of lying' },
        { text: 'Reframe it as a trauma response — hostility, minimization, and recantation are normal, not deception; have him slow down, adjust his language, and give her space to engage on her terms.', next: 'c2b', quality: 'good', shortLabel: 'Coached the trauma-informed approach' },
        { text: 'Direct him to threaten her with a false-report charge.', next: 'c2c', quality: 'bad', shortLabel: 'Threatened the victim' },
        { text: 'Tell him to leave immediately and document her as uncooperative.', next: 'c2d', quality: 'risky', shortLabel: 'Bailed on the contact' },
      ]
    },
    'c2a': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Misread as Deception',
      heading: 'Recantation is a known trauma response, not proof she lied.',
      narrative: [
        'Agreeing that the recantation proves she was never credible writes off a victim showing a textbook trauma response and ends any chance of engagement. The case and her safety both lose.',
        'Read the trauma as trauma — that is the whole skill.'
      ],
      legal: 'Module standard: hostility, minimization, recantation, and refusal to engage are normal trauma responses, not indicators of deception.',
      next: 'd3'
    },
    'c2b': {
      type: 'consequence', outcomeClass: 'outcome-good', outcomeLabel: 'Read the Trauma',
      heading: 'You reframed the recantation as a trauma response and changed the approach.',
      narrative: [
        'You tell Renner to slow down, soften his language, and give her room to engage on her terms — the minimization and guardedness are normal, not deception. The contact steadies, and the victim stays connected to the process instead of being written off.',
        'A trauma-informed approach keeps the door open that a "she\'s lying" read would have slammed.'
      ],
      legal: 'Module standard: trauma responses are adjusted for with pace, language, and space — not treated as deception.',
      next: 'd3'
    },
    'c2c': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Threats Destroy the Contact',
      heading: 'Threatening a false-report charge re-traumatizes the victim and ends cooperation for good.',
      narrative: [
        'Directing Renner to threaten her treats a trauma response as a crime and guarantees she never trusts the department again — exactly the opposite of the engagement the contact is for.',
        'Slow down and engage; do not threaten.'
      ],
      legal: 'Module standard and ALO 4.13: follow-up contacts prioritize safety and engagement; trauma responses are not treated as deception or threatened into compliance.',
      next: 'd3'
    },
    'c2d': {
      type: 'consequence', outcomeClass: 'outcome-neutral', outcomeLabel: 'Don\'t Bail on the Engagement',
      heading: 'Leaving and labeling her uncooperative repeats the original mistake.',
      narrative: [
        'Pulling out and documenting "uncooperative" abandons the engagement the follow-up is meant to build and misreads the trauma response as refusal. Coach Renner to adjust and stay engaged.',
        'The point of the contact is engagement, not an exit.'
      ],
      legal: 'MTPD ALO 4.13: follow-up contacts prioritize safety assessment and victim engagement over documentation efficiency.',
      next: 'd3'
    },
    'd3': {
      type: 'decision',
      decisionNumber: 3,
      situation: 'As the contact winds down, Renner is ready to clear it. He has not provided the victim advocate program information or discussed the PFA process, telling you "she\'s been through this before, she knows the drill, and I need to get back in service."',
      question: 'How do you direct the close-out under MTPD ALO 4.13?',
      options: [
        { text: 'Let him clear it — she knows the resources already and service level is low.', next: 'c3a', quality: 'bad', shortLabel: 'Skipped the 4.13 information' },
        { text: 'Direct him to provide the victim advocate program information and discuss the PFA process before clearing — ALO 4.13 requires it at every contact, and engagement comes before documentation efficiency.', next: 'c3b', quality: 'good', shortLabel: 'Required the 4.13 advocate + PFA information' },
        { text: 'Tell him to mail her a pamphlet later instead.', next: 'c3c', quality: 'bad', shortLabel: 'Substituted a mailing for the contact' },
        { text: 'Approve the close-out and note the resources for next time.', next: 'c3d', quality: 'risky', shortLabel: 'Deferred the required information' },
      ]
    },
    'c3a': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: '"She Knows the Drill" Is Not the Standard',
      heading: 'ALO 4.13 requires the advocate and PFA information at every contact — including this one.',
      narrative: [
        'Letting Renner clear it without the advocate program and PFA information skips a required part of the follow-up and treats the contact as a box to check. A victim who leaves informed and respected is the one who calls before the next incident escalates — and that is the outcome you just passed up.',
        'Service level does not waive the standard.'
      ],
      legal: 'MTPD ALO 4.13: officers shall provide victim advocate and PFA information at every contact; engagement over documentation efficiency.',
      next: 'debrief'
    },
    'c3b': {
      type: 'consequence', outcomeClass: 'outcome-good', outcomeLabel: 'Closed It to Standard',
      heading: 'You required the advocate and PFA information before the contact ended.',
      narrative: [
        'You direct Renner to walk through the victim advocate program and the PFA process before clearing, regardless of prior contacts. The victim leaves better informed and treated with respect — more likely to cooperate and more likely to reach out before the next incident escalates.',
        'That outcome is the entire reason ALO 4.13 makes the follow-up an engagement, not a checkbox.'
      ],
      legal: 'MTPD ALO 4.13: provide victim advocate and PFA information at every contact; prioritize safety and engagement.',
      next: 'debrief'
    },
    'c3c': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'A Pamphlet Is Not a Contact',
      heading: 'Mailing information later substitutes paperwork for the engagement ALO 4.13 requires.',
      narrative: [
        'Promising to mail a pamphlet swaps the in-person advocate and PFA discussion — and the engagement that comes with it — for a piece of paper she may never read. The contact is the opportunity; do not defer it to the mail.',
        'Provide the information now, in person.'
      ],
      legal: 'MTPD ALO 4.13: the information is provided at the contact; engagement is the priority over documentation efficiency.',
      next: 'debrief'
    },
    'c3d': {
      type: 'consequence', outcomeClass: 'outcome-neutral', outcomeLabel: 'Don\'t Defer It',
      heading: '"Next time" leaves this contact short of the standard.',
      narrative: [
        'Approving the close-out and noting the resources for next time leaves this required contact incomplete. ALO 4.13 wants the advocate and PFA information at every contact, including this one.',
        'Have Renner provide it before he clears.'
      ],
      legal: 'MTPD ALO 4.13: victim advocate and PFA information provided at every contact, not deferred.',
      next: 'debrief'
    },
    'debrief': { type: 'debrief' },
  }
};
