
/* ── Scenario: Officer Wellness ─────────── */
const SCENARIO_WELLNESS = {
  title: 'Officer Wellness',
  location: 'EGPD Patrol Division — End of Shift',
  totalDecisions: 3,
  nodes: {
    start: {
      type: 'scene',
      time: '2315',
      weather: 'Clear',
      unit: 'Unit 7903',
      narrative: [
        'You\'ve worked with your patrol partner, Officer Diaz, for three years. He\'s one of the best officers in the division — reliable, calm under pressure, good instincts. Over the last two months, something has changed.',
        'He\'s been calling out more. When he\'s in, he\'s short-tempered on calls — snapping at complainants, using dismissive language he wouldn\'t have used before. Last week he made a sarcastic comment about a suicide call that made you uncomfortable. Tonight, after a difficult child welfare check, he said flatly: "I don\'t feel anything anymore. I haven\'t in a while."',
        'You\'re both in the parking lot after shift. No supervisors around. He didn\'t say it looking for a response — he said it like a fact.'
      ],
      next: 'd1'
    },
    d1: {
      type: 'decision',
      decisionNumber: 1,
      situation: 'Diaz\'s statement — "I don\'t feel anything anymore" — is sitting in the air between you. He\'s unlocking his car. He\'s not visibly distressed, but what he said describes a significant psychological symptom.',
      question: 'How do you respond in this moment?',
      options: [
        {
          text: 'Let it go. He\'s been having a rough stretch and he\'ll work through it. Bringing it up could embarrass him or damage the working relationship. You\'ll keep an eye on him.',
          shortLabel: 'Let it go — don\'t make it awkward',
          quality: 'bad',
          next: 'c1-bad'
        },
        {
          text: 'Acknowledge what he said. Don\'t make it clinical — just stay in the moment with him. You don\'t need to fix it tonight. You just need him to know you heard it.',
          shortLabel: 'Stay in it — acknowledge what he said',
          quality: 'good',
          next: 'c1-good'
        }
      ]
    },
    'c1-bad': {
      type: 'consequence',
      outcomeClass: 'outcome-bad',
      outcomeLabel: 'The Moment Passed — And So Did He',
      heading: 'You said nothing. Three weeks later, Diaz was involved in a use-of-force incident that is now under review.',
      narrative: [
        'Emotional numbing — "I don\'t feel anything anymore" — is a recognized symptom of operational stress injury and secondary trauma. It is not a rough patch. It is a warning sign that a person\'s psychological resources have been depleted.',
        'Diaz\'s behavior on calls deteriorated over the following weeks. The use-of-force incident was not egregious, but his report documentation was inconsistent and his on-scene demeanor was captured on body camera in a way that raised questions.',
        'He is now facing an internal investigation. The outcome might have been different if someone had said something three weeks earlier. The most important intervention you will ever make for a fellow officer may happen in a parking lot at midnight — not on a critical incident.'
      ],
      legal: 'IACP officer wellness guidance and the COPS Office peer support research base: Peer-observed behavioral change is widely identified as one of the earliest indicators of operational stress injury — often visible to colleagues before it surfaces in self-report or supervisory review. Officers who observe signs of significant stress, psychological distress, or behavioral change in a colleague are encouraged to make contact and connect them with peer support. Early peer intervention is consistently identified as a high-leverage point for preventing escalation to crisis.',
      next: 'd2'
    },
    'c1-good': {
      type: 'consequence',
      outcomeClass: 'outcome-good',
      outcomeLabel: 'He Didn\'t Have to Explain It',
      heading: 'You didn\'t push. You stayed.',
      narrative: [
        '"Yeah. That call was rough." You didn\'t turn it into a conversation he didn\'t ask for. You just confirmed you heard him.',
        'He stopped with his hand on the door. "It\'s not just tonight. It\'s been a while." He paused. "I don\'t know what to do with that."',
        '"You don\'t have to know right now." You told him about the peer support program — not like a policy item, like something that exists for exactly this reason. You told him you\'d go with him if he wanted. He didn\'t say yes. But he didn\'t say no either. And he didn\'t get in the car and drive away like the conversation hadn\'t happened.'
      ],
      legal: 'Secondary traumatic stress and operational stress injury: Emotional numbing, detachment, and loss of empathy are recognized symptoms of cumulative trauma exposure in law enforcement. These are not character failures — they are physiological responses to sustained high-stress work. Peer support contacts are confidential under Pennsylvania law and do not constitute a formal wellness referral unless the officer agrees.',
      next: 'd2'
    },
    d2: {
      type: 'decision',
      decisionNumber: 2,
      situation: 'Over the next week, Diaz\'s behavior on calls has not improved. You\'ve spoken with him twice informally. He hasn\'t reached out to peer support. Yesterday he was visibly impaired in his judgment during a domestic — he froze at a key moment and you had to step in. You are now genuinely concerned about his safety and the safety of others on calls with him.',
      question: 'What do you do?',
      options: [
        {
          text: 'Stay in the informal lane. He knows you\'re there. Pushing harder or going to a supervisor would feel like a betrayal. The code holds — you handle it internally.',
          shortLabel: 'Stay informal — don\'t escalate, protect the relationship',
          quality: 'bad',
          next: 'c2-bad'
        },
        {
          text: 'Tell Diaz directly that what you saw yesterday crosses a line — that you\'re concerned about him and you\'re going to talk to the peer support coordinator. Give him the chance to get ahead of it himself. Then follow through.',
          shortLabel: 'Tell him directly — involve peer support, give him the chance',
          quality: 'good',
          next: 'c2-good'
        }
      ]
    },
    'c2-bad': {
      type: 'consequence',
      outcomeClass: 'outcome-bad',
      outcomeLabel: 'It Escalated — On a Call',
      heading: 'The code held. So did the deterioration.',
      narrative: [
        'Diaz froze again the following Tuesday — this time during a foot pursuit. He lost the subject and submitted a report that left out the freeze entirely. A supervisor reviewing the body camera footage noticed the gap and opened an investigation.',
        'The internal review uncovered three weeks of documented behavioral decline. When asked whether other officers had observed changes, your name came up. You had said nothing.',
        'The code of silence that felt like loyalty was actually abandonment. Diaz needed intervention, not protection from the truth about what was happening to him. An officer who cannot safely perform their duties on calls is a danger to themselves, their partners, and the public. Peer support exists for this reason.'
      ],
      legal: 'Duty to partner and duty to intervene: Allowing an officer in psychological crisis to continue active patrol without intervention creates liability for the department and danger for the officer, their partners, and the public. Pennsylvania law does not impose criminal liability for failure to report officer wellness concerns — but departmental policy and professional obligation create clear expectations.',
      next: 'd3'
    },
    'c2-good': {
      type: 'consequence',
      outcomeClass: 'outcome-good',
      outcomeLabel: 'He Got Help. You Made the Call.',
      heading: 'It wasn\'t easy. It was right.',
      narrative: [
        '"Diaz, what happened yesterday on that call — I can\'t pretend I didn\'t see it. I\'m not going to your supervisor to burn you. I\'m going to peer support because I\'m worried about you and I need someone with more tools than I have. I want you to make the call today. If you do, I\'ll back you all the way."',
        'He was quiet for a long time. Then: "Okay."',
        'He contacted the peer support coordinator that afternoon. He was placed on a temporary administrative assignment while working with a department-connected therapist — not as a punishment, but to give him the space to recover. He came back to patrol eight weeks later. He told you it was the first time in two years he felt like himself.'
      ],
      legal: 'IACP peer support program guidance: A peer-to-peer wellness contact is confidential and does not automatically trigger administrative action. Officers may self-refer or be referred by a colleague. A wellness referral is distinct from a fitness-for-duty evaluation — the latter involves a formal administrative process. Peer support is identified across law enforcement wellness research as an appropriate first step for stress-related concerns that do not involve immediate safety risk, precisely because it lowers the barrier officers face in seeking help.',
      next: 'd3'
    },

    'd3': {
      type: 'decision',
      decisionNumber: 3,
      situation: 'After the conversation with your partner, you are driving back to the station. It has been a long month. You are working mandatory overtime, you snapped at your kids last week, and you have not slept more than five hours in three days. You find yourself thinking during the drive: "If I told anyone how I was actually doing, they would think I was weak. Or they\'d think I couldn\'t handle the job." Your sergeant, who you respect, has been asking how you are holding up. You have been saying "fine" every time.',
      question: 'What do you do with that realization?',
      options: [
        {
          text: 'Keep pushing through. Everyone is dealing with something. You can manage this.',
          shortLabel: 'Push through — everyone deals with it',
          quality: 'bad',
          next: 'c3-bad'
        },
        {
          text: 'The next time your sergeant asks, tell the truth — not everything, but something real. Or reach out to peer support or EAP on your own. The realization that you need to do something is the decision.',
          shortLabel: 'Be honest with your sergeant or access support',
          quality: 'good',
          next: 'c3-good'
        },
        {
          text: 'Take a personal day and use the rest to reset — you will be fine after a break.',
          shortLabel: 'Take a personal day, reset on your own',
          quality: 'risky',
          next: 'c3-neutral'
        }
      ]
    },
    'c3-bad': {
      type: 'consequence',
      outcomeClass: 'outcome-bad',
      outcomeLabel: 'Cumulative Risk',
      heading: 'Pushing through when the system is already telling you it is overloaded is not strength — it is a risk to you and the people around you.',
      narrative: [
        'Sleep deprivation at three days and five hours per night produces measurable impairment equivalent to a blood alcohol level above the legal driving limit. Officers in that state are making decisions in high-stakes environments. That is not manageable — that is a liability.',
        'The belief that needing support means weakness is the exact belief that law enforcement culture has been working to dismantle — because officers die from it. Secondary traumatic stress, burnout, and occupational cumulative trauma are physiological conditions, not character defects.',
        'You would not let a civilian drive impaired. Apply the same standard to yourself.'
      ],
      legal: 'The Ruderman Family Foundation White Paper on Mental Health and Suicide of First Responders (2018) found that police officers and firefighters are more likely to die by suicide than in the line of duty, and identified stigma around seeking help as a central barrier to early intervention. EAP and peer support resources exist specifically to address this. Accessing them is not a career risk. Continued unaddressed impairment is.',
      next: 'debrief'
    },
    'c3-good': {
      type: 'consequence',
      outcomeClass: 'outcome-good',
      outcomeLabel: 'The Right Decision',
      heading: 'Telling the truth — to yourself or one trusted person — is the hardest and most important step.',
      narrative: [
        'You do not have to give a detailed accounting. You do not have to break down. You just have to stop saying "fine" when you are not. That one shift — from a reflexive "fine" to a real answer — opens the door to everything that helps.',
        'EAP services are confidential and job-protected. Peer support contacts are confidential under department policy. Your sergeant is asking because they are paying attention. Let them.',
        'The men who built careers that lasted, who stayed present for their families, who led effectively — they asked for help when they needed it. That is part of what made them credible.'
      ],
      legal: 'EAP (Employee Assistance Program) services are confidential and protected from disclosure in most employment contexts. Peer support contacts carry confidentiality protections under Pennsylvania law. Research on first responder wellness consistently finds that voluntary, early access to these resources does not affect employment status and is associated with longer, healthier careers.',
      next: 'debrief'
    },
    'c3-neutral': {
      type: 'consequence',
      outcomeClass: 'outcome-neutral',
      outcomeLabel: 'Partial Reset — Not Sufficient',
      heading: 'A personal day helps — but it does not address the underlying pattern.',
      narrative: [
        'Rest is necessary. Taking a personal day when you are running on fumes is not wrong. But a single day off does not resolve three weeks of cumulative stress, a sleep deficit, and a pattern of not talking about what is actually happening.',
        'If you come back from the personal day, say "fine" to the next check-in question, and resume the same pace — you have not addressed anything. You have pressed pause.',
        'Use the day. And when you come back, take the next step: one honest conversation, one call to EAP, one peer support contact. The day off is step one, not the whole plan.'
      ],
      legal: 'Rest is a component of officer wellness — but research on cumulative occupational stress is consistent that single interventions are insufficient on their own. IACP wellness guidance frames wellness as an ongoing practice — regular use of peer support and EAP resources — rather than episodic crisis management.',
      next: 'debrief'
    },
    debrief: { type: 'debrief' }
  }
};

/* ── Scenario: De-escalation ────────────── */

function getWellnessQuestions() {
  return [
    {
      scenario: 'After six months of heavy call volume including multiple traumatic incidents, an officer tells you: "I just don\'t care anymore. Nothing bothers me. I feel like I\'m watching everything from far away."',
      text: 'This description most closely matches which recognized condition in law enforcement?',
      options: [
        'Normal stress adaptation — a sign the officer is getting better at compartmentalization.',
        'Secondary traumatic stress or operational stress injury — characterized by emotional numbing, detachment, and depersonalization.',
        'Burnout from shift work — resolved by taking a vacation.',
        'A personality trait unrelated to the job.'
      ],
      correct: 1,
      feedback: 'Correct. Emotional numbing, depersonalization ("watching from far away"), and loss of empathy are recognized symptoms of secondary traumatic stress (STS) and operational stress injury (OSI) — documented occupational health conditions in law enforcement. These are not personality failures or signs of weakness. They are physiological responses to sustained exposure to trauma and high-stakes stress. Identifying them early is the difference between intervention and crisis.'
    },
    {
      scenario: 'A fellow officer has been short-tempered on calls, called out sick multiple times in the past month, and made a dark comment about not caring whether he comes home after shift.',
      text: 'What is the most appropriate response from a peer?',
      options: [
        'Report him to the shift supervisor immediately without speaking to him first.',
        'Ignore the comment — dark humor is normal in law enforcement.',
        'Speak with him directly, express concern without judgment, and inform him of the peer support program. If safety concerns persist, involve a peer support officer.',
        'Contact his family to let them know he may need help.'
      ],
      correct: 2,
      feedback: 'Correct. The appropriate first step is a direct, private conversation — without judgment, without escalating immediately to administration. Peer support exists for exactly this scenario. The comment about not caring whether he comes home is a warning sign that warrants a response beyond dark humor dismissal. If after a peer conversation there are continuing safety concerns — particularly around fitness for duty — involving a peer support officer or supervisor becomes the appropriate next step.'
    },
    {
      scenario: 'An officer contacts the department\'s peer support program. What confidentiality protections apply?',
      text: 'Under Pennsylvania law and standard peer support program design, peer support contacts are:',
      options: [
        'Fully confidential with no exceptions — nothing discussed can ever be disclosed.',
        'Confidential but subject to mandatory disclosure if the officer reveals intent to harm themselves or others, or describes conduct that constitutes a crime.',
        'Reported to the officer\'s supervisor automatically.',
        'Included in the officer\'s personnel file as a wellness record.'
      ],
      correct: 1,
      feedback: 'Correct. Peer support contacts are confidential under Pennsylvania law and standard peer support program design — but confidentiality is not absolute. If an officer discloses imminent intent to harm themselves or others, or describes conduct constituting a criminal offense, disclosure may be required. This is the same standard that applies to mental health professionals. Peer support officers are trained to communicate these limits clearly at the start of any contact. The goal is to encourage use of the program, not to create false expectations about absolute confidentiality.'
    },
    {
      scenario: 'You notice that sleep disruption, irritability, and difficulty concentrating have been affecting your own performance for the past several weeks, particularly after a difficult call involving a child fatality.',
      text: 'According to first responder wellness research, what is the appropriate action for an officer experiencing these symptoms?',
      options: [
        'Push through — these symptoms are normal and will resolve on their own.',
        'Self-refer to the peer support program or employee assistance program (EAP) — early self-referral is encouraged and does not automatically trigger a fitness-for-duty evaluation.',
        'Immediately disclose the symptoms to your supervisor to avoid liability.',
        'Wait until annual evaluation to discuss with the department psychologist.'
      ],
      correct: 1,
      feedback: 'Correct. Self-referral to peer support or the EAP is the appropriate early action and does not automatically trigger administrative review or fitness-for-duty evaluation. Wellness research and standard peer support program design distinguish between voluntary wellness contacts — which are confidential — and formal fitness-for-duty evaluations, which are administrative in nature and involve a different process. Early intervention is far less disruptive than waiting for symptoms to escalate to a point where administrative action becomes necessary.'
    },
    {
      scenario: 'Your partner\'s performance on calls has declined noticeably over several weeks. You\'ve spoken with him informally twice. He has not contacted peer support. Yesterday he froze during a domestic disturbance response and you had to step in to manage the situation.',
      text: 'What is the appropriate action at this point?',
      options: [
        'Continue informal peer support — he will come around in his own time.',
        'Contact his family and let them know what you observed.',
        'Tell him directly what you observed and that you intend to contact peer support on his behalf. Give him the opportunity to self-refer first. Then follow through.',
        'File a formal complaint with internal affairs about the performance issue.'
      ],
      correct: 2,
      feedback: 'Correct. When informal support has not produced change and officer performance is creating safety concerns on active calls, the threshold for escalating support — not discipline — has been crossed. The correct approach is transparency: tell him what you observed, give him the opportunity to self-refer, and make clear you are following through regardless. This is not a betrayal — it is the highest form of partner loyalty. An officer who cannot safely perform their duties is a danger to themselves, their partners, and the public.'
    },
    {
      scenario: 'An officer in your squad has been making comments that concern you — dark humor that has shifted over the past month, coming in early and leaving late without explanation, and declining to join the group for lunch. No single behavior is alarming, but the pattern has been building.',
      text: 'What is the appropriate response from a peer?',
      options: [
        'Report the officer to the supervisor — the pattern suggests a performance issue.',
        'Mention it to another colleague to see if they have noticed the same thing.',
        'Engage the officer directly and privately. Name what you have noticed without accusation. Create space for them to talk if they want to. Mention peer support as an option. Follow up.',
        'Wait and watch — officers sometimes go through phases and recover on their own.'
      ],
      correct: 2,
      feedback: 'Correct. Behavioral pattern changes are among the most reliable early indicators of officer distress. No single behavior may trigger concern, but the accumulated pattern is the signal. Direct, private peer engagement — without accusation, without pressure — is the research-supported first response. "I\'ve noticed you seem different lately and I just wanted to check in" costs nothing and can save a career or a life. Peer support contacts are confidential.'
    },
    {
      scenario: 'A critical incident debrief is scheduled for officers involved in an officer-involved shooting. An involved officer tells you they do not intend to attend — "I\'m fine, I don\'t need to talk about it."',
      text: 'What does the research say about mandatory versus voluntary debriefs, and what is the appropriate peer response?',
      options: [
        'Respect their decision — mandatory mental health participation is counterproductive and violates autonomy.',
        'The officer should be required to attend — waivers should not be permitted after OIS events.',
        'Normalize the debrief without pressure: explain it is standard practice, not an indication of weakness, and that research shows engagement with post-incident support significantly reduces long-term psychological impact. Encourage attendance without mandating it.',
        'Alert the supervisor so they can make attendance mandatory.'
      ],
      correct: 2,
      feedback: 'Correct. Critical incident debriefs serve both immediate and long-term wellness functions. The research consistently shows that early engagement with post-incident support reduces the incidence of PTSD and long-term psychological injury. Normalizing participation — "everyone goes through this, it\'s part of the protocol" — reduces stigma without coercion. Coercing participation produces defensive engagement. The peer\'s role is to normalize and encourage, not to enforce.'
    },
    {
      scenario: 'You have been through a difficult three months: a line-of-duty death in your department, two major felony arrests, and a contested use-of-force review. You are sleeping well and your home life is stable. At your quarterly check-in, the sergeant asks how you are doing.',
      text: 'What does a wellness-informed response to that question look like?',
      options: [
        '"Fine" — the sergeant is asking as a formality and the answer should be brief.',
        'Provide an honest, calibrated update: acknowledge the weight of the past three months, note what is currently stable, and mention anything that you are monitoring in yourself — without dramatizing or minimizing.',
        'Deflect the question — wellness check-ins are a compliance exercise and detailed responses invite unwanted attention.',
        '"I\'m handling it" — officers are expected to manage operational stress without external support.'
      ],
      correct: 1,
      feedback: 'Correct. A wellness-informed officer knows how to give an honest calibrated answer: neither dramatizing nor minimizing. You can acknowledge that the past three months were heavy, note that you are currently stable, and mention anything you are paying attention to in yourself. This kind of honest self-awareness is not weakness — it is the professional capacity to monitor your own system the same way you monitor your patrol vehicle. Supervisors who ask are trying to lead. Let them.'
    },
  ];
}
