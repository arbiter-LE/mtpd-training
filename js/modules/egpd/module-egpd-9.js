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
      legal: 'EGPD General Order 4.13 — Officers shall provide DV victims with accurate information about the criminal justice process, including arraignment, bail, and protective order procedures. Victim notification requirements under Pennsylvania law (23 Pa. C.S. § 6106) include providing information about available legal remedies and victim services.',
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
      legal: 'Pennsylvania Act 192 provide confidentiality protections for peer support contacts. EAP services are confidential and do not affect employment status in most circumstances. Officers should be aware of these protections so they can accurately convey them to peers seeking help.',
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
