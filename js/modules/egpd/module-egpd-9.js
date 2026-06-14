/* ══════════════════════════════════════════
   READING — Emotional Intelligence (EGPD)
══════════════════════════════════════════ */
const READING_EI = `
  <div class="content-block">
    <h4>Scenario</h4>
    <h2>A follow-up welfare check on a DV victim. She answers the door with crossed arms: "I already talked to your people." There's a bruise on her forearm that isn't in the original report. The next sixty seconds decide whether you leave with evidence and her trust — or with a closed door.</h2>
    <p>This module covers emotional intelligence as an operational skill: trauma-informed victim contact, self-regulation under provocation, reading and supporting the officers around you — and yourself.</p>
  </div>
  <div class="content-block">
    <h4>Trauma-Informed Victim Contact</h4>
    <h2>Hostility from a victim is a trauma response — not deception, and not a closed case.</h2>
    <ul class="key-points">
      <li><strong>The first 60 seconds carry the contact.</strong> IACP research on victim engagement identifies officer demeanor in the opening moments as the strongest predictor of victim cooperation with the criminal justice process. Victims who experience the initial contact as controlling, dismissive, or skeptical are significantly less likely to give statements or pursue protective orders.</li>
      <li><strong>Read the behavior correctly.</strong> Hostility, minimization, and recantation are normal, self-protective trauma responses in DV victims — rooted in fear, shame, prior negative law-enforcement experiences, and the dynamics of abusive relationships. They are not indicators of deception, and they are not evidence the incident was minor.</li>
      <li><strong>Acknowledge before you ask.</strong> Leading with the evidence ("explain that bruise") treats a person in crisis like a subject and closes the door. Acknowledging her position without challenging it — "I'm not here to make anything harder; you don't have to talk to me" — keeps the window open.</li>
      <li><strong>Never offer false reassurance.</strong> A victim who has been through the system knows arraignment timelines and bail realities. "He's not getting out anytime soon" is recognized instantly as untrue, and it collapses the trust you built. The professional response is honest and actionable: what the arraignment process actually looks like, what a PFA order is and how to get one today, and how to reach the victim advocate. EGPD General Order 4.13.7 requires officers to provide DV victims oral and written notice of available services and their rights under 23 Pa.C.S. Ch. 61 — accurate information is a policy obligation, not a courtesy.</li>
      <li><strong>New evidence in a follow-up is still evidence.</strong> An injury identified during a welfare contact is documented in a supplemental report with specificity: location, approximate size and coloration, the victim's account of when and how it occurred (clearly attributed), and photographs. In many DV prosecutions, the follow-up contact contains the most damaging evidence.</li>
    </ul>
  </div>
  <div class="content-block">
    <h4>Self-Regulation</h4>
    <h2>The officer's nervous system sets the ceiling of the encounter.</h2>
    <p>Self-regulation is the ability to manage your own emotional state under provocation — absorbing hostility without returning it, and responding from training and judgment rather than reaction. A hostile, irrational, or disrespectful subject is typically responding to fear, pain, or trauma, not targeting you personally. Officers who match hostility with hostility escalate encounters that could have been contained; self-regulation is a tactical skill that directly affects call outcomes, use-of-force rates, and community trust.</p>
    <p>It applies between officers too. When a partner's approach escalates a scene, the move is to absorb it — step in, redirect the subject's attention to you, re-stabilize with a quiet tone — and address the partner privately after the scene resolves. Public correction of a partner is itself an escalation. And when a person in custody discloses personal trauma during transport, brief genuine acknowledgment — "that sounds really hard" — without interrogation or exploitation is both the ethical and the professionally sound response.</p>
  </div>
  <div class="content-block">
    <h4>Reading the Officers Around You — and Yourself</h4>
    <h2>Emotional numbness on scenes that used to affect you is a signal, not adaptation.</h2>
    <p>Feeling nothing on calls that previously had impact is a recognized early indicator of secondary traumatic stress and the pathway to burnout — not strength, and not normal compartmentalization. The same applies to a partner gone quiet, short-tempered, and withdrawn over weeks: behavioral pattern change is among the earliest visible signs of operational stress, and a direct, private check-in — naming what you've noticed, without pressure, mentioning peer support or EAP as an option — is the intervention that research supports.</p>
    <p>In Pennsylvania, communications with critical incident stress management team members are confidential under 42 Pa.C.S. § 5950, and § 5952 extends protections to trained peer support members. EAP services are confidential. Early, voluntary engagement with these resources produces dramatically better outcomes than crisis-point intervention — and knowing the protections accurately means you can convey them credibly to a colleague who needs them.</p>
    <button class="btn-launch" onclick="startScenario('egpd-emotional-intelligence')">Proceed to Scenario Exercise →</button>
  </div>
`;

/* ══════════════════════════════════════════
   SCENARIO — Emotional Intelligence (EGPD)
══════════════════════════════════════════ */
const SCENARIO_EI = {
  title: 'Emotional Intelligence',
  location: 'Residence — Follow-Up DV Contact',
  totalDecisions: 3,
  nodes: {
    start: {
      type: 'scene',
      time: '1035',
      weather: 'Overcast',
      unit: 'Unit 7903',
      narrative: [
        'You are conducting a follow-up welfare check on a DV victim from an arrest made three nights ago. The subject, a woman in her mid-30s, was listed as the victim. The arrested subject was her husband — still in custody pending arraignment.',
        'She answers the door, crosses her arms, and says flatly: "I already talked to your people. I don\'t have anything else to say." Her two children — approximately 7 and 10 — are visible behind her in the living room.',
        'She looks exhausted. There is a bruise on her forearm that was not documented in the original report.'
      ],
      next: 'd1'
    },
    d1: {
      type: 'decision',
      decisionNumber: 1,
      situation: 'She is clearly hostile to your presence. The undocumented bruise concerns you. You have no legal obligation to force entry — this is a voluntary follow-up contact.',
      question: 'How do you open this conversation?',
      options: [
        {
          text: 'Be direct: identify the bruise and ask her to explain it. You need the documentation and she needs to understand this is a serious matter.',
          shortLabel: 'Lead with the bruise — direct and documentation-focused',
          quality: 'bad',
          next: 'c1-bad'
        },
        {
          text: 'Acknowledge her position without challenging it. Let her know you\'re there because you wanted to check in — not to take anything from her. Give her space to decide how the conversation goes.',
          shortLabel: 'Acknowledge her position — create space',
          quality: 'good',
          next: 'c1-good'
        }
      ]
    },
    'c1-bad': {
      type: 'consequence',
      outcomeClass: 'outcome-bad',
      outcomeLabel: 'Approach Shut the Door',
      heading: 'Leading with the bruise made her defensive. The conversation ended before it started.',
      narrative: [
        'She looked at the bruise, looked at you, and said: "I bumped into a door. We\'re fine. Are we done?" She stepped back and closed the door.',
        'You had a genuine opportunity to build enough trust for her to give you information that could protect her and her children. The approach — clinical, accusatory in tone, documentation-first — treated her like a subject rather than a person in crisis.',
        'Emotional intelligence in this context does not mean avoiding hard facts. It means understanding that a defensive, exhausted DV victim will not respond to pressure the way a cooperative witness will. The goal was information. The approach prevented it.'
      ],
      legal: 'EGPD General Order 4.13 — Follow-up contacts with DV victims should prioritize safety assessment and victim cooperation. Trauma-informed approach: victims of domestic violence often present as hostile or uncooperative due to fear, shame, and past negative law enforcement experiences — not because they have nothing to say.',
      next: 'd2'
    },
    'c1-good': {
      type: 'consequence',
      outcomeClass: 'outcome-good',
      outcomeLabel: 'She Stayed at the Door',
      heading: 'You didn\'t push. She didn\'t close it.',
      narrative: [
        '"I\'m not here to make anything harder. I just wanted to make sure you and the kids are okay. You don\'t have to talk to me." You said it without breaking eye contact, without a notepad out, without stepping forward.',
        'She paused. The hostility didn\'t disappear — but she didn\'t close the door. The children are still visible. You notice the younger one watching you.',
        'You have a narrow window. What you do next determines whether she gives you anything useful.'
      ],
      legal: 'Trauma-informed victim contact: Victims who experience the initial contact as controlling or threatening are significantly less likely to cooperate with prosecution. IACP research shows that officer demeanor in follow-up contacts is the strongest predictor of victim engagement with the criminal justice process.',
      next: 'd2'
    },
    d2: {
      type: 'decision',
      decisionNumber: 2,
      situation: 'She is still at the door. After a moment she says quietly: "He\'s going to be out soon. I know how this works." She glances at the kids.',
      question: 'How do you respond?',
      options: [
        {
          text: 'Reassure her: "He\'s not getting out anytime soon. You have nothing to worry about." Keep the tone positive — she needs confidence right now.',
          shortLabel: 'Reassure — minimize the threat',
          quality: 'bad',
          next: 'c2-bad'
        },
        {
          text: 'Be honest about what you know, and give her something actionable: her options, the victim advocate contact, and what she can do today if she wants to.',
          shortLabel: 'Honest, actionable — her options, victim advocate',
          quality: 'good',
          next: 'c2-good'
        }
      ]
    },
    'c2-bad': {
      type: 'consequence',
      outcomeClass: 'outcome-bad',
      outcomeLabel: 'False Reassurance — Lost Her Trust',
      heading: 'She knows he could be released at arraignment. You told her he couldn\'t. She stopped listening.',
      narrative: [
        'She has been through this before. She knows arraignment timelines, bail processes, and what "not getting out anytime soon" actually means in practice. When you overstated it, she recognized it — and the trust you\'d built in the last two minutes collapsed.',
        '"Okay. Thanks." She closed the door.',
        'False reassurance is one of the most damaging things an officer can offer a DV victim. It is not kindness — it is a failure to respect her intelligence and her reality. She will be less likely to call for help the next time because she knows she cannot rely on accurate information from law enforcement.'
      ],
      legal: 'EGPD General Order 4.13.7 — Officers shall provide DV victims oral and written notice of the availability of safe shelter and domestic violence services, and of their rights under 23 Pa.C.S. Ch. 61. Accurate information about the criminal justice process — arraignment, bail, protective order procedures — is part of that obligation; misleading reassurance is inconsistent with it.',
      next: 'd3'
    },
    'c2-good': {
      type: 'consequence',
      outcomeClass: 'outcome-good',
      outcomeLabel: 'Honest and Actionable',
      heading: 'You gave her the truth and something to do with it.',
      narrative: [
        '"I\'m not going to tell you he can\'t get out — arraignment is in the next 24 hours and I don\'t control that. What I can tell you is that there\'s a victim advocate who can walk you through a PFA today if you want one. That\'s real protection. And my number is on this card if anything changes tonight."',
        'She took the card. She told you about the bruise on her arm — three days old, from the same night. She let you photograph it.',
        'You left with documented evidence, a victim who engaged with the process, and a PFA referral in motion. That outcome came directly from how you managed the first 60 seconds of the conversation.'
      ],
      legal: 'EGPD General Order 4.13 — Officers shall provide victims with information about the victim advocate program and PFA application process at every DV contact. 23 Pa. C.S. § 6102 et seq. (Protection From Abuse Act): A PFA may be obtained through the court of common pleas. Victim advocates can assist with emergency filings. Document all new evidence — including injuries identified during follow-up contacts — in a supplemental report.',
      next: 'd3'
    },

    'd3': {
      type: 'decision',
      decisionNumber: 3,
      situation: 'You are back at the station after a difficult call involving a child — a welfare check that turned into a CYFD referral. You handled it professionally. As you sit at your desk writing the report, you notice your partner sitting alone in the break room, staring at the table. They have not said anything since you cleared the scene. They declined lunch. This partner has seemed "off" for the past three weeks — quieter than usual, short-tempered on a couple of calls.',
      question: 'What do you do?',
      options: [
        {
          text: 'Give them space — if they wanted to talk, they would come to you.',
          shortLabel: 'Give them space, don\'t push',
          quality: 'bad',
          next: 'c3-bad'
        },
        {
          text: 'Go to them, sit down, and check in directly — name what you have noticed over the past few weeks and today, and let them talk. Mention peer support or EAP as an option without pressure.',
          shortLabel: 'Check in directly, name what you see, offer support',
          quality: 'good',
          next: 'c3-good'
        },
        {
          text: 'Mention it to the sergeant so they can follow up — it\'s above your pay grade.',
          shortLabel: 'Flag it to the sergeant and step back',
          quality: 'risky',
          next: 'c3-neutral'
        }
      ]
    },
    'c3-bad': {
      type: 'consequence',
      outcomeClass: 'outcome-bad',
      outcomeLabel: 'Missed Intervention',
      heading: 'Officers in distress rarely ask for help first — that is the nature of the profession.',
      narrative: [
        'Law enforcement culture, by design, selects for people who push through difficulty without complaint. That trait — which makes officers effective in the field — is also what makes them less likely to reach out when they are struggling.',
        'Waiting for your partner to come to you may mean waiting until a crisis. The three-week pattern you have observed, combined with today\'s call, is a signal. Ignoring signals is not giving someone space — it is leaving them alone in a hard place.',
        'You do not have to have the right words. You just have to show up and ask.'
      ],
      legal: 'Officer wellness policy encourages peer-level intervention and support. Peer support contacts are confidential. Waiting for formal distress before acting is inconsistent with the peer support model — early intervention is the goal.',
      next: 'debrief'
    },
    'c3-good': {
      type: 'consequence',
      outcomeClass: 'outcome-good',
      outcomeLabel: 'Peer Leadership in Practice',
      heading: 'Naming what you see, without pressure, is what peer support actually looks like.',
      narrative: [
        'You do not need a title to do this. You do not need to diagnose or fix anything. Sitting down and saying "Hey, I\'ve noticed you\'ve seemed off for a few weeks — and today was a rough call. You good?" costs nothing and can mean everything.',
        'Mentioning peer support or EAP without pressure keeps the door open without creating shame. Officers are more likely to use resources when a trusted colleague mentioned them — not when they find a brochure on a bulletin board.',
        'This is leadership. It does not happen in briefings. It happens in break rooms.'
      ],
      legal: '42 Pa.C.S. § 5950 makes communications to critical incident stress management team members confidential, and § 5952 extends protections to trained peer support members. EAP services are confidential and do not affect employment status in most circumstances. Officers should be aware of these protections so they can accurately convey them to peers seeking help.',
      next: 'debrief'
    },
    'c3-neutral': {
      type: 'consequence',
      outcomeClass: 'outcome-neutral',
      outcomeLabel: 'Partial — Loses the Human Element',
      heading: 'Flagging to the sergeant is not wrong — but it is not enough.',
      narrative: [
        'A supervisor check-in may be appropriate, especially if the pattern is affecting performance. But kicking it upward as your first and only move skips the most important step: the peer connection.',
        'Your partner trusts you. They have worked beside you. A sergeant check-in has a different weight — it can feel evaluative, even when it is not meant to be. You have the ability to make the first contact in a way the sergeant cannot.',
        'Do both: check in yourself first, and mention your concern to the sergeant as a follow-up — not instead of — your own engagement.'
      ],
      legal: 'Supervisors have a duty to address performance concerns that may indicate wellness issues. Peer contacts, however, remain confidential under department policy and are not a substitute for peer support — they are a complementary mechanism. The peer connection comes first.',
      next: 'debrief'
    },
    debrief: { type: 'debrief' }
  }
};

function getEIQuestions() {
  return [
    {
      scenario: 'You arrive for a follow-up welfare check on a domestic violence victim. She answers the door with crossed arms and says she doesn\'t want to talk.',
      text: 'According to IACP research, what is the strongest predictor of victim cooperation with the criminal justice process?',
      options: [
        'The severity of the documented injuries from the original incident.',
        'Whether the victim has retained a private attorney.',
        'Officer demeanor in the first 60 seconds of the victim contact.',
        'The number of prior DV incidents on record at the address.'
      ],
      correct: 2,
      feedback: 'Correct. IACP research consistently identifies officer demeanor in the first 60 seconds of a victim contact as the strongest predictor of victim cooperation. Victims who experience the initial contact as controlling, dismissive, or skeptical are significantly less likely to provide statements or pursue protective orders. The officer\'s emotional approach is not separate from the investigation — it is part of it.'
    },
    {
      scenario: 'A DV victim presents as hostile and minimizes the incident, saying nothing happened and she just wants everyone to leave.',
      text: 'What is the most accurate interpretation of this behavior from a trauma-informed perspective?',
      options: [
        'The victim is likely being deceptive and may be filing a false report.',
        'This is a normal trauma response — hostility and minimization are self-protective behaviors common in DV victims.',
        'The victim\'s demeanor indicates the incident was minor and enforcement action may be unwarranted.',
        'Hostility toward police indicates the victim may be under the control of the suspect.'
      ],
      correct: 1,
      feedback: 'Correct. Hostility, minimization, and recantation are normal trauma responses in domestic violence victims — they are not indicators of deception. These behaviors stem from fear, shame, prior negative law enforcement experiences, and the complex dynamics of abusive relationships. A trauma-informed officer recognizes this pattern and adjusts their approach accordingly rather than misreading it as uncooperativeness or deception.'
    },
    {
      scenario: 'A DV victim says: "He\'s going to be out soon anyway. I know how this works." She appears fearful but resigned.',
      text: 'What is the most appropriate and professionally sound response?',
      options: [
        'Reassure her that he will not be released anytime soon to build her confidence.',
        'Provide accurate information about the arraignment process, the victim advocate program, and the PFA option — honest and actionable.',
        'Explain that you cannot make predictions about the criminal justice process and redirect to your required documentation.',
        'Tell her that her cooperation will influence whether he stays in custody.'
      ],
      correct: 1,
      feedback: 'Correct. DV victims with prior experience in the justice system know when they are being given false reassurance — and when it happens, it destroys the trust you were building. The professionally sound response is accurate information: what the arraignment process looks like, what a PFA order is and how to get one today, and how to reach the victim advocate. Honest and actionable beats reassuring and inaccurate every time. Providing misleading information about custody violates EGPD General Order 4.13 notification requirements.'
    },
    {
      scenario: 'During a follow-up contact, a DV victim shows you a bruise on her arm that was not documented in the original report.',
      text: 'What is the correct documentation action?',
      options: [
        'Note the bruise verbally in your CAD entry and follow up at the next contact.',
        'Document the injury in a supplemental report, including a description of the injury, its location, the victim\'s account of how it occurred, and any photographs taken.',
        'The follow-up contact is welfare only — injuries discovered during welfare checks are documented by the detective assigned to the case.',
        'Document only if the victim signs a medical release authorizing you to include her injury in official reports.'
      ],
      correct: 1,
      feedback: 'Correct. Evidence identified during follow-up contacts is still evidence. A supplemental report must document the injury with specificity: location on the body, approximate size and coloration, the victim\'s statement about when and how it occurred (clearly attributed to her), and whether photographs were taken. Follow-up contact documentation is not secondary to the original report — in many DV cases it contains the most damaging evidence. There is no medical release requirement for documenting observable injuries.'
    },
    {
      scenario: 'Self-regulation is described in emotional intelligence research as a critical law enforcement skill.',
      text: 'In a law enforcement context, what does self-regulation most accurately describe?',
      options: [
        'Completing all required reports and documentation within department timeframes.',
        'The ability to manage your emotional response under pressure — absorbing provocation and responding from training rather than reaction.',
        'Regulating the use of force to the minimum required by the circumstances.',
        'Managing officer wellness through exercise, sleep, and mental health practices.'
      ],
      correct: 1,
      feedback: 'Correct. Self-regulation in emotional intelligence is the ability to manage your own emotional state — specifically under provocation. A hostile, irrational, or disrespectful subject is typically responding to fear, pain, or trauma, not personally targeting the officer. Officers who match hostility with hostility escalate situations that could have been contained. Self-regulation is not passivity — it is an active choice to respond from training and judgment rather than from reaction. It is a tactical skill that directly affects call outcomes, use of force rates, and community relationships.'
    },
    {
      scenario: 'You are de-escalating a volatile domestic disturbance call. Your partner, without warning, raises their voice and issues a command that significantly escalates the primary subject\'s agitation.',
      text: 'What is the most effective response in the moment?',
      options: [
        'Correct your partner\'s approach out loud — the subject needs to see you are handling it.',
        'Step in front of your partner, calmly redirect the subject\'s attention to you, and use a quiet, steady tone to re-establish rapport. Address your partner\'s approach privately after the scene is resolved.',
        'Follow your partner\'s lead — contradicting them on scene undermines unit authority.',
        'Request a supervisor to take over — the call has been compromised.'
      ],
      correct: 1,
      feedback: 'Correct. On-scene contradictions between partners escalate situations and undermine both officers\' authority. The effective response is to absorb the escalation by redirecting the subject\'s focus to you, using calm tone and de-escalation language to re-stabilize. Address your partner\'s approach privately and professionally after the scene is resolved. This preserves safety, partnership, and your credibility. Publicly correcting a partner is itself an escalation.'
    },
    {
      scenario: 'A subject you have arrested becomes tearful and discloses personal trauma during transport. They are not making threats, not a danger to themselves, and are cooperative.',
      text: 'What is the emotionally intelligent officer response?',
      options: [
        'Redirect immediately to booking logistics — personal disclosures during transport are not your role.',
        'Encourage them to keep talking — it builds rapport and may produce admissible statements.',
        'Acknowledge the disclosure with brief, genuine recognition: "That sounds really hard." Do not interrogate, do not dismiss. Remain professional and compassionate without soliciting further statements.',
        'Inform them that anything they say can be used against them before they say anything further.'
      ],
      correct: 2,
      feedback: 'Correct. A brief, genuine human acknowledgment — without interrogation, without dismissal — is both ethical and professionally appropriate. You are not a counselor, but you are not required to be cold either. Do not solicit further statements that could create custodial interrogation issues. Do not exploit emotional vulnerability for investigative purposes. Simply acknowledging someone\'s pain is part of the professional treatment every person in custody deserves.'
    },
    {
      scenario: 'After several months of increasingly difficult calls, you notice that you no longer feel anything on scenes that previously affected you. You are efficient, but emotionally flat.',
      text: 'This pattern most likely reflects which occupational health phenomenon, and what is the recommended response?',
      options: [
        'Adaptation — officers develop appropriate emotional distance over time. No action needed.',
        'Secondary traumatic stress or emotional numbing, which are recognized risk factors for burnout and long-term psychological impact. The recommended response is early engagement with peer support or EAP resources.',
        'Burnout — which requires immediate medical leave.',
        'Compassion fatigue — which resolves on its own with adequate rest.'
      ],
      correct: 1,
      feedback: 'Correct. Emotional numbing — feeling nothing on scenes that previously had impact — is a recognized early indicator of secondary traumatic stress and the pathway to burnout. It is not strength or adaptation; it is a signal. EAP and peer support resources exist specifically for this reason and carry confidentiality protections. The research is clear: early intervention produces significantly better outcomes than crisis-point intervention. If you recognize this in yourself, act early.'
    },
  ];
}

/* ══════════════════════════════════════════
   SUPERVISOR OVERLAY — Emotional Intelligence (EGPD)
   EI as a supervisory function: model self-regulation, coach
   trauma-informed contact, read your officers, watch the load.
══════════════════════════════════════════ */
const SUPERVISOR_EI = `
  <div class="content-block">
    <h4>Supervisor Focus</h4>
    <h2>Your nervous system set the ceiling on a scene as an officer. As a supervisor it sets the ceiling on a squad.</h2>
    <p>The officer version of this module is about managing yourself and reading the person in front of you. As a supervisor the same skill operates on your people: your regulation under pressure is the temperature the whole squad takes its cue from, reading your officers is now part of the job rather than a kindness, and the trauma-informed contact you model becomes the department's victim-engagement standard. Emotional intelligence stops being a personal trait and becomes a supervisory function.</p>
  </div>
  <div class="content-block">
    <h4>Make Trauma-Informed Contact a Coached Standard</h4>
    <p>The IACP finding the officer learned — that demeanor in the first 60 seconds is the strongest predictor of victim cooperation — is something you now enforce across a squad. On review and in debrief, treat a closed door on a DV follow-up not as "the victim wouldn't talk" but as a contact worth examining: did the officer lead with the evidence, or acknowledge before asking? Did they offer false reassurance — "he's not getting out" — that a system-experienced victim sees through, or honest, actionable information plus the GO 4.13.7 notice of services and rights under 23 Pa.C.S. Ch. 61? Hostility, minimization, and recantation are trauma responses, not closed cases. An officer who reads them as deception is one whose victim-contact technique you coach — because in many DV prosecutions the follow-up holds the most damaging evidence.</p>
  </div>
  <div class="content-block">
    <h4>Model and Protect Self-Regulation</h4>
    <p>Self-regulation is a tactical skill that drives use-of-force rates and complaints, and your officers calibrate theirs to yours. The supervisor who stays level when a subject — or an officer — is hostile teaches that the badge absorbs provocation rather than returning it. Watch for the partner-escalation dynamic on scene and in reports: the move is to absorb and redirect, then correct privately, because a public correction of an officer is itself an escalation. What you model on a chaotic scene, and how you debrief the officer who lost composure — privately, as development, not humiliation — is how regulation spreads through a squad.</p>
  </div>
  <div class="content-block">
    <h4>Reading Your Officers Is the Job Now</h4>
    <ul class="key-points">
      <li><strong>Behavioral change is the early signal.</strong> A normally steady officer gone quiet, short-tempered, and withdrawn over weeks is showing the earliest visible sign of operational stress — and you see it across shifts in a way a single partner cannot.</li>
      <li><strong>Numbness is a red flag, not resilience.</strong> An officer — or you — feeling nothing on calls that used to land is an early indicator of secondary traumatic stress, not strength. Name it rather than admire it.</li>
      <li><strong>The direct, private check-in is the supported intervention.</strong> Name what you have noticed without pressure, mention peer support or EAP as an option, and do it before the crisis, not after.</li>
      <li><strong>Do not outsource the human step.</strong> Flagging an officer to your own supervisor or to wellness services is appropriate as a follow-up — never as a substitute for the conversation only you, who works beside them, can have.</li>
    </ul>
  </div>
  <div class="content-block">
    <h4>Know the Protections So You Can Convey Them Credibly</h4>
    <p>An officer will not engage a resource they believe is not confidential. In Pennsylvania, communications with critical incident stress management team members are confidential under 42 Pa.C.S. § 5950, and § 5952 extends protections to trained peer support members; EAP services are confidential as well. Knowing those protections accurately — not vaguely — is what lets you tell a struggling officer the truth about what reaching out actually risks, which is usually far less than they fear. Early, voluntary engagement produces dramatically better outcomes than crisis-point intervention, and your credibility about confidentiality is often the difference between an officer who calls and one who does not.</p>
  </div>
  <div class="content-block">
    <h4>The Cumulative Load Is Yours to Watch</h4>
    <p>No single call breaks an officer; the accumulation does, and you are positioned to see the accumulation. Track the run of hard calls a particular officer has absorbed — the child welfare check, the fatal, the suicide — rotate exposure where you can, build the debrief and the check-in into the rhythm of the unit rather than reserving them for after a catastrophe, and treat your own numbness as the same signal you would act on in someone else. The officers you keep whole are the ones still doing this work, and doing it well, years from now.</p>
  </div>
`;

function getEISupervisorQuestions() {
  return [
    {
      scenario: 'An officer\'s DV follow-up contact ended with the victim closing the door. The report summarizes it as "victim uncooperative, refused to provide a statement."',
      text: 'How should you handle this in review and debrief?',
      options: [
        'Accept the summary — if the victim refused to talk, there is nothing more to examine.',
        'Examine the contact itself: did the officer lead with the evidence or acknowledge before asking? Hostility and a closed door are trauma responses, not a closed case, and the technique is coachable — especially since the follow-up often holds the most damaging DV evidence.',
        'Direct the officer to force the issue more firmly at the next contact.',
        'Close the case, since an uncooperative victim cannot be prosecuted.'
      ],
      correct: 1,
      feedback: 'Correct. "Victim uncooperative" is often a technique problem, not a dead end. IACP research ties cooperation to the officer\'s demeanor in the first 60 seconds; hostility and minimization are trauma responses. A supervisor coaches the trauma-informed approach because the follow-up contact frequently contains the most important evidence in a DV prosecution.'
    },
    {
      scenario: 'A report shows the officer told a fearful DV victim, "He\'s not getting out anytime soon — you have nothing to worry about," to reassure her.',
      text: 'What is your supervisory assessment?',
      options: [
        'It was a kind and appropriate way to calm the victim.',
        'It was a mistake to coach: a system-experienced victim recognizes false reassurance about arraignment and bail, and it collapses trust. GO 4.13.7 requires accurate information about services and rights under 23 Pa.C.S. Ch. 61 — honest and actionable beats reassuring and inaccurate.',
        'It was fine because the officer was trying to help.',
        'It was acceptable as long as the officer also took a report.'
      ],
      correct: 1,
      feedback: 'Correct. False reassurance is one of the most damaging things an officer can offer a DV victim — they know how arraignment and bail work, and the overstatement destroys trust. The standard, consistent with GO 4.13.7, is accurate information plus actionable options (PFA, victim advocate). The supervisor coaches honest and actionable.'
    },
    {
      scenario: 'On a volatile call you are supervising, one of your officers raises their voice and issues a command that visibly escalates the subject.',
      text: 'What is the right response, in the moment and afterward?',
      options: [
        'Correct the officer out loud immediately so the subject sees you are taking control.',
        'Absorb the escalation in the moment — step in, redirect the subject\'s attention, re-stabilize with a calm tone — and address the officer\'s approach privately afterward, because public correction of an officer is itself an escalation and you model regulation for the squad.',
        'Let the officer continue so as not to undermine their authority.',
        'Pull the officer from the scene and finish the call yourself without comment.'
      ],
      correct: 1,
      feedback: 'Correct. The effective move is to absorb and redirect, then correct privately. A public correction escalates the scene and undermines the officer. How a supervisor handles this — calm in the moment, development in private — models the self-regulation that drives use-of-force rates and complaints across the whole squad.'
    },
    {
      scenario: 'A normally steady, even-keeled officer on your squad has been quiet, short-tempered on a couple of calls, and withdrawn for about three weeks.',
      text: 'What is your supervisory responsibility?',
      options: [
        'Wait for the officer to come to you — pushing would be intrusive.',
        'Recognize the behavioral change as an early sign of operational stress and have a direct, private check-in — name what you have noticed without pressure and mention peer support or EAP — before it reaches a crisis.',
        'Document the short temper as a performance issue and move toward discipline.',
        'Ignore it unless it begins to affect the officer\'s arrest numbers.'
      ],
      correct: 1,
      feedback: 'Correct. A marked behavioral pattern change is among the earliest visible signs of operational stress, and a supervisor sees it across shifts. The supported intervention is a direct, private check-in — naming the change without pressure and offering resources — done early, not after a crisis.'
    },
    {
      scenario: 'An officer tells you they have stopped feeling anything on scenes that used to affect them, and frames it as a sign they are getting tougher and more professional.',
      text: 'How should you read and respond to this?',
      options: [
        'Affirm it — emotional distance is healthy adaptation that comes with experience.',
        'Treat it as a red flag, not resilience: emotional numbing is an early indicator of secondary traumatic stress and a pathway to burnout. Name it as such and encourage early, confidential engagement with peer support or EAP.',
        'Note it approvingly as evidence the officer is ready for higher-stress assignments.',
        'Take no action unless the officer\'s performance declines.'
      ],
      correct: 1,
      feedback: 'Correct. Feeling nothing on calls that used to land is an early indicator of secondary traumatic stress, not strength or adaptation. A supervisor names it rather than admiring it and points the officer toward early, confidential intervention — which produces far better outcomes than waiting for a crisis.'
    },
    {
      scenario: 'You are concerned about a struggling officer and consider simply flagging them to your own supervisor and the wellness program.',
      text: 'Is that sufficient?',
      options: [
        'Yes — escalating to your supervisor and wellness discharges your responsibility.',
        'No — flagging upward is appropriate as a follow-up but not a substitute for the direct, peer-level check-in only you, who works beside the officer, can have. Do the human step first, then involve other resources.',
        'Yes — peer-level conversations are outside a supervisor\'s role.',
        'No — you should avoid involving wellness entirely and handle it alone.'
      ],
      correct: 1,
      feedback: 'Correct. A sergeant or wellness referral carries a different, more evaluative weight, and kicking it upward as the only move skips the most important step. The peer connection — naming what you see, without pressure — comes first; the formal follow-up complements it rather than replacing it.'
    },
    {
      scenario: 'You want to encourage a reluctant officer to use peer support or EAP, but the officer is worried it will end up in their personnel file or affect their job.',
      text: 'Why does it matter that you know the confidentiality protections accurately?',
      options: [
        'It does not — the officer should use the resources regardless of the details.',
        'Because an officer will not engage a resource they believe is not confidential, and accurate knowledge — that 42 Pa.C.S. § 5950 protects critical incident stress management communications, § 5952 extends it to trained peer support members, and EAP is confidential — lets you tell them the truth about the low risk, which is often what decides whether they reach out.',
        'Because you are required to record which officers use which services.',
        'Because confidentiality protections do not apply to law enforcement.'
      ],
      correct: 1,
      feedback: 'Correct. Officers do not use resources they think are not confidential. Knowing the protections accurately — 42 Pa.C.S. § 5950 and § 5952 for peer/CISM communications, and EAP confidentiality — lets a supervisor convey the truth credibly, and that credibility is frequently the difference between an officer who calls and one who does not.'
    },
    {
      scenario: 'Over a short span, one of your officers has handled a string of traumatic calls — a child welfare seizure, a fatal crash, and a completed suicide.',
      text: 'What is the appropriate supervisory action?',
      options: [
        'Nothing specific — each officer is expected to handle whatever calls come their way.',
        'Manage the cumulative load: it is the accumulation, not a single call, that breaks officers, and you are positioned to see it. Track the exposure, rotate hard calls where possible, and build debriefs and check-ins into the unit\'s rhythm rather than reserving them for after a catastrophe.',
        'Wait until the officer requests time off before taking any action.',
        'Assign the officer additional high-stress calls to build tolerance.'
      ],
      correct: 1,
      feedback: 'Correct. No single call breaks an officer; the accumulation does, and the supervisor is the one positioned to see the run of hard calls. Tracking exposure, rotating where possible, and building debriefs and check-ins into the routine — rather than waiting for a crisis — is how a supervisor keeps officers whole over a career.'
    },
  ];
}
