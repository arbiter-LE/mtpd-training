
/* ── Reading: Officer Wellness ──────────── */
const READING_WELLNESS = `
  <div class="content-block">
    <h4>Scenario</h4>
    <h2>After a difficult child welfare call, your partner of three years says it flatly, like a fact: "I don't feel anything anymore. I haven't in a while." No supervisors around. He's unlocking his car. What you do with that sentence may be the most important intervention of your career.</h2>
    <p>This module covers the recognized signs of operational stress injury, the peer's role in early intervention, the confidentiality protections that make help safe to seek, and the standard you owe yourself.</p>
  </div>
  <div class="content-block">
    <h4>Recognizing the Signs</h4>
    <h2>Emotional numbing is a symptom, not adaptation.</h2>
    <ul class="key-points">
      <li><strong>The vocabulary:</strong> secondary traumatic stress (STS) and operational stress injury (OSI) are documented occupational health conditions in law enforcement — physiological responses to sustained trauma exposure, not character failures. Emotional numbing, depersonalization ("watching everything from far away"), detachment, and loss of empathy are recognized symptoms and the pathway to burnout.</li>
      <li><strong>The visible pattern:</strong> behavioral change observed by peers — increased callouts, short temper on calls, dark humor that shifts in character, withdrawal from the squad, coming in early and leaving late without explanation — is among the earliest indicators of distress, often visible to colleagues before it surfaces in self-report or supervisory review. No single behavior alarms; the accumulating pattern is the signal.</li>
      <li><strong>The stakes:</strong> the Ruderman Family Foundation's 2018 white paper found police officers and firefighters more likely to die by suicide than in the line of duty — and identified stigma around seeking help as the central barrier to early intervention.</li>
    </ul>
  </div>
  <div class="content-block">
    <h4>The Peer's Role</h4>
    <h2>Officers in distress rarely ask first. That's why peers go first.</h2>
    <p>Law enforcement culture selects for people who push through difficulty without complaint — the same trait that makes officers effective makes them unlikely to reach out. Waiting for a struggling colleague to come to you usually means waiting for a crisis. The research-supported first response is direct, private engagement: name what you've noticed, without accusation or pressure; create space to talk; mention peer support or EAP as something that exists for exactly this; follow up.</p>
    <p>When informal support hasn't produced change and performance begins creating safety risk on calls — a freeze at a key moment, a partner you had to cover — the threshold for escalating support (not discipline) has been crossed. Tell them what you observed, tell them you're going to peer support, give them the chance to self-refer first, and follow through. That is not betrayal; an officer who cannot safely perform their duties is a danger to themselves, their partners, and the public — and protecting them from intervention is abandonment dressed as loyalty.</p>
  </div>
  <div class="content-block">
    <h4>The Protections</h4>
    <h2>Confidentiality is real — and knowing its actual limits makes it credible.</h2>
    <p>In Pennsylvania, communications from a law enforcement officer to a critical incident stress management team member are confidential under 42 Pa.C.S. § 5950 and cannot be disclosed in legal proceedings without the officer's consent; § 5952 extends protections to trained peer support members. Confidentiality is not absolute — communications indicating a clear and present danger, and (under standard program design) disclosures of criminal conduct, fall outside it, the same limits that apply to mental health professionals. Peer support officers state these limits up front.</p>
    <p>A voluntary wellness contact or EAP self-referral is distinct from a fitness-for-duty evaluation: the former is confidential and does not automatically trigger administrative action; the latter is a formal administrative process. EGPD's own General Order 1.3.7 reflects the same philosophy after the most serious incidents — mandatory post-shooting psychological evaluation at department expense, with reassignment that "shall not be considered a suspension or disciplinary action." Early, voluntary engagement is consistently associated with better outcomes and longer careers.</p>
  </div>
  <div class="content-block">
    <h4>The Standard You Owe Yourself</h4>
    <h2>Stop saying "fine" when you're not.</h2>
    <p>Three days of five-hour sleep produces impairment comparable to an unlawful blood alcohol level — and officers in that state are making high-stakes decisions. A personal day is rest, not a plan; if you return, say "fine" at the next check-in, and resume the same pace, you've pressed pause on the pattern, not addressed it. The wellness-informed answer to a sergeant's "how are you holding up?" is calibrated honesty: acknowledge the weight, note what's stable, name what you're monitoring in yourself — without dramatizing or minimizing. Critical incident debriefs work the same way: normalized, encouraged, standard practice — because early engagement with post-incident support measurably reduces long-term psychological injury.</p>
    <button class="btn-launch" onclick="startScenario('egpd-officer-wellness')">Proceed to Scenario Exercise →</button>
  </div>
`;

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
        'You\'ve worked with your patrol partner, Officer Hartman, for three years. He\'s one of the best officers in the division — reliable, calm under pressure, good instincts. Over the last two months, something has changed.',
        'He\'s been calling out more. When he\'s in, he\'s short-tempered on calls — snapping at complainants, using dismissive language he wouldn\'t have used before. Last week he made a sarcastic comment about a suicide call that made you uncomfortable. Tonight, after a difficult child welfare check, he said flatly: "I don\'t feel anything anymore. I haven\'t in a while."',
        'You\'re both in the parking lot after shift. No supervisors around. He didn\'t say it looking for a response — he said it like a fact.'
      ],
      next: 'd1'
    },
    d1: {
      type: 'decision',
      decisionNumber: 1,
      situation: 'Hartman\'s statement — "I don\'t feel anything anymore" — is sitting in the air between you. He\'s unlocking his car. He\'s not visibly distressed, but what he said describes a significant psychological symptom.',
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
      heading: 'You said nothing. Three weeks later, Hartman was involved in a use-of-force incident that is now under review.',
      narrative: [
        'Emotional numbing — "I don\'t feel anything anymore" — is a recognized symptom of operational stress injury and secondary trauma. It is not a rough patch. It is a warning sign that a person\'s psychological resources have been depleted.',
        'Hartman\'s behavior on calls deteriorated over the following weeks. The use-of-force incident was not egregious, but his report documentation was inconsistent and his on-scene demeanor was captured on body camera in a way that raised questions.',
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
      situation: 'Over the next week, Hartman\'s behavior on calls has not improved. You\'ve spoken with him twice informally. He hasn\'t reached out to peer support. Yesterday he was visibly impaired in his judgment during a domestic — he froze at a key moment and you had to step in. You are now genuinely concerned about his safety and the safety of others on calls with him.',
      question: 'What do you do?',
      options: [
        {
          text: 'Stay in the informal lane. He knows you\'re there. Pushing harder or going to a supervisor would feel like a betrayal. The code holds — you handle it internally.',
          shortLabel: 'Stay informal — don\'t escalate, protect the relationship',
          quality: 'bad',
          next: 'c2-bad'
        },
        {
          text: 'Tell Hartman directly that what you saw yesterday crosses a line — that you\'re concerned about him and you\'re going to talk to the peer support coordinator. Give him the chance to get ahead of it himself. Then follow through.',
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
        'Hartman froze again the following Tuesday — this time during a foot pursuit. He lost the subject and submitted a report that left out the freeze entirely. A supervisor reviewing the body camera footage noticed the gap and opened an investigation.',
        'The internal review uncovered three weeks of documented behavioral decline. When asked whether other officers had observed changes, your name came up. You had said nothing.',
        'The code of silence that felt like loyalty was actually abandonment. Hartman needed intervention, not protection from the truth about what was happening to him. An officer who cannot safely perform their duties on calls is a danger to themselves, their partners, and the public. Peer support exists for this reason.'
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
        '"Hartman, what happened yesterday on that call — I can\'t pretend I didn\'t see it. I\'m not going to your supervisor to burn you. I\'m going to peer support because I\'m worried about you and I need someone with more tools than I have. I want you to make the call today. If you do, I\'ll back you all the way."',
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
        'Secondary traumatic stress or operational stress injury — characterized by emotional numbing, detachment, and depersonalization.',
        'Normal stress adaptation — a sign the officer is getting better at compartmentalization.',
        'Burnout from shift work — resolved by taking a vacation.',
        'A personality trait unrelated to the job.'
      ],
      correct: 0,
      feedback: 'Correct. Emotional numbing, depersonalization ("watching from far away"), and loss of empathy are recognized symptoms of secondary traumatic stress (STS) and operational stress injury (OSI) — documented occupational health conditions in law enforcement. These are not personality failures or signs of weakness. They are physiological responses to sustained exposure to trauma and high-stakes stress. Identifying them early is the difference between intervention and crisis.'
    },
    {
      scenario: 'A fellow officer has been short-tempered on calls, called out sick multiple times in the past month, and made a dark comment about not caring whether he comes home after shift.',
      text: 'What is the most appropriate response from a peer?',
      options: [
        'Report him to the shift supervisor immediately without speaking to him first.',
        'Ignore the comment — dark humor is normal in law enforcement.',
        'Contact his family to let them know he may need help.',
        'Speak with him directly, express concern without judgment, and inform him of the peer support program. If safety concerns persist, involve a peer support officer.'
      ],
      correct: 3,
      feedback: 'Correct. The appropriate first step is a direct, private conversation — without judgment, without escalating immediately to administration. Peer support exists for exactly this scenario. The comment about not caring whether he comes home is a warning sign that warrants a response beyond dark humor dismissal. If after a peer conversation there are continuing safety concerns — particularly around fitness for duty — involving a peer support officer or supervisor becomes the appropriate next step.'
    },
    {
      scenario: 'An officer contacts the department\'s peer support program. What confidentiality protections apply?',
      text: 'Under Pennsylvania law and standard peer support program design, peer support contacts are:',
      options: [
        'Fully confidential with no exceptions — nothing discussed can ever be disclosed.',
        'Reported to the officer\'s supervisor automatically.',
        'Confidential but subject to mandatory disclosure if the officer reveals intent to harm themselves or others, or describes conduct that constitutes a crime.',
        'Included in the officer\'s personnel file as a wellness record.'
      ],
      correct: 2,
      feedback: 'Correct. Peer support contacts are confidential under Pennsylvania law and standard peer support program design — but confidentiality is not absolute. If an officer discloses imminent intent to harm themselves or others, or describes conduct constituting a criminal offense, disclosure may be required. This is the same standard that applies to mental health professionals. Peer support officers are trained to communicate these limits clearly at the start of any contact. The goal is to encourage use of the program, not to create false expectations about absolute confidentiality.'
    },
    {
      scenario: 'You notice that sleep disruption, irritability, and difficulty concentrating have been affecting your own performance for the past several weeks, particularly after a difficult call involving a child fatality.',
      text: 'According to first responder wellness research, what is the appropriate action for an officer experiencing these symptoms?',
      options: [
        'Self-refer to the peer support program or employee assistance program (EAP) — early self-referral is encouraged and does not automatically trigger a fitness-for-duty evaluation.',
        'Push through — these symptoms are normal and will resolve on their own.',
        'Immediately disclose the symptoms to your supervisor to avoid liability.',
        'Wait until annual evaluation to discuss with the department psychologist.'
      ],
      correct: 0,
      feedback: 'Correct. Self-referral to peer support or the EAP is the appropriate early action and does not automatically trigger administrative review or fitness-for-duty evaluation. Wellness research and standard peer support program design distinguish between voluntary wellness contacts — which are confidential — and formal fitness-for-duty evaluations, which are administrative in nature and involve a different process. Early intervention is far less disruptive than waiting for symptoms to escalate to a point where administrative action becomes necessary.'
    },
    {
      scenario: 'Your partner\'s performance on calls has declined noticeably over several weeks. You\'ve spoken with him informally twice. He has not contacted peer support. Yesterday he froze during a domestic disturbance response and you had to step in to manage the situation.',
      text: 'What is the appropriate action at this point?',
      options: [
        'Continue informal peer support — he will come around in his own time.',
        'Contact his family and let them know what you observed.',
        'File a formal complaint with internal affairs about the performance issue.',
        'Tell him directly what you observed and that you intend to contact peer support on his behalf. Give him the opportunity to self-refer first. Then follow through.'
      ],
      correct: 3,
      feedback: 'Correct. When informal support has not produced change and officer performance is creating safety concerns on active calls, the threshold for escalating support — not discipline — has been crossed. The correct approach is transparency: tell him what you observed, give him the opportunity to self-refer, and make clear you are following through regardless. This is not a betrayal — it is the highest form of partner loyalty. An officer who cannot safely perform their duties is a danger to themselves, their partners, and the public.'
    },
    {
      scenario: 'An officer in your squad has been making comments that concern you — dark humor that has shifted over the past month, coming in early and leaving late without explanation, and declining to join the group for lunch. No single behavior is alarming, but the pattern has been building.',
      text: 'What is the appropriate response from a peer?',
      options: [
        'Engage the officer directly and privately. Name what you have noticed without accusation. Create space for them to talk if they want to. Mention peer support as an option. Follow up.',
        'Report the officer to the supervisor — the pattern suggests a performance issue.',
        'Mention it to another colleague to see if they have noticed the same thing.',
        'Wait and watch — officers sometimes go through phases and recover on their own.'
      ],
      correct: 0,
      feedback: 'Correct. Behavioral pattern changes are among the most reliable early indicators of officer distress. No single behavior may trigger concern, but the accumulated pattern is the signal. Direct, private peer engagement — without accusation, without pressure — is the research-supported first response. "I\'ve noticed you seem different lately and I just wanted to check in" costs nothing and can save a career or a life. Peer support contacts are confidential.'
    },
    {
      scenario: 'A critical incident debrief is scheduled for officers involved in an officer-involved shooting. An involved officer tells you they do not intend to attend — "I\'m fine, I don\'t need to talk about it."',
      text: 'What does the research say about mandatory versus voluntary debriefs, and what is the appropriate peer response?',
      options: [
        'Respect their decision — mandatory mental health participation is counterproductive and violates autonomy.',
        'Normalize the debrief without pressure: explain it is standard practice, not an indication of weakness, and that research shows engagement with post-incident support significantly reduces long-term psychological impact. Encourage attendance without mandating it.',
        'The officer should be required to attend — waivers should not be permitted after OIS events.',
        'Alert the supervisor so they can make attendance mandatory.'
      ],
      correct: 1,
      feedback: 'Correct. Critical incident debriefs serve both immediate and long-term wellness functions. The research consistently shows that early engagement with post-incident support reduces the incidence of PTSD and long-term psychological injury. Normalizing participation — "everyone goes through this, it\'s part of the protocol" — reduces stigma without coercion. Coercing participation produces defensive engagement. The peer\'s role is to normalize and encourage, not to enforce.'
    },
    {
      scenario: 'You have been through a difficult three months: a line-of-duty death in your department, two major felony arrests, and a contested use-of-force review. You are sleeping well and your home life is stable. At your quarterly check-in, the sergeant asks how you are doing.',
      text: 'What does a wellness-informed response to that question look like?',
      options: [
        '"Fine" — the sergeant is asking as a formality and the answer should be brief.',
        'Deflect the question — wellness check-ins are a compliance exercise and detailed responses invite unwanted attention.',
        '"I\'m handling it" — officers are expected to manage operational stress without external support.',
        'Provide an honest, calibrated update: acknowledge the weight of the past three months, note what is currently stable, and mention anything that you are monitoring in yourself — without dramatizing or minimizing.'
      ],
      correct: 3,
      feedback: 'Correct. A wellness-informed officer knows how to give an honest calibrated answer: neither dramatizing nor minimizing. You can acknowledge that the past three months were heavy, note that you are currently stable, and mention anything you are paying attention to in yourself. This kind of honest self-awareness is not weakness — it is the professional capacity to monitor your own system the same way you monitor your patrol vehicle. Supervisors who ask are trying to lead. Let them.'
    },
  ];
}

/* ══════════════════════════════════════════
   SUPERVISOR OVERLAY — Officer Wellness (EGPD)
   The peer catches it; the supervisor owns the system around it —
   culture, the official mechanisms, GO 1.3.7, and modeling honesty.
══════════════════════════════════════════ */
const SUPERVISOR_WELLNESS = `
  <div class="content-block">
    <h4>Supervisor Focus</h4>
    <h2>A peer catches it in the parking lot. You build the conditions that decide whether anyone says it out loud.</h2>
    <p>The officer version of this module is about the peer who hears "I don't feel anything anymore" at midnight and what they do next. As a supervisor you own the system around that moment: whether your squad believes help is safe to seek, whether the official mechanisms are ready when informal support is not enough, and whether your own reflexive "fine" at every check-in is teaching your people to say it back. The sergeant asking "how are you holding up?" in this module is you — and how you ask, and how you answer when asked, sets the squad's permission to be honest.</p>
  </div>
  <div class="content-block">
    <h4>The Stigma Problem Is Yours to Solve</h4>
    <p>The Ruderman finding — that officers are more likely to die by suicide than in the line of duty, with stigma as the central barrier — is, for a supervisor, a culture problem you control. Officers will not use a resource they believe will cost them their assignment or their standing, so your job is to make the safe path legible: a voluntary wellness contact or EAP self-referral is confidential and distinct from a fitness-for-duty evaluation, peer support and critical-incident-stress-management communications are confidential under 42 Pa.C.S. § 5950 and § 5952, and accessing them is not a career risk. Say that out loud, repeatedly — and back it with how you actually treat the officer who uses it. One officer quietly penalized for seeking help teaches the whole squad never to.</p>
  </div>
  <div class="content-block">
    <h4>Know and Use the Official Mechanisms</h4>
    <p>When informal peer support is not enough, you are the one who moves it into the official lane — and the line between support and discipline has to stay clean. A wellness referral and a fitness-for-duty evaluation are different things: the first protects and is confidential, the second is a formal administrative process, and confusing them in front of your people poisons the well. GO 1.3.7 models the department's own philosophy after the most serious incidents — mandatory post-incident psychological evaluation at department expense, with reassignment that "shall not be considered a suspension or disciplinary action." Use that same framing of support, not punishment, whenever you act, and make sure both the officer and the squad understand which lane they are in.</p>
  </div>
  <div class="content-block">
    <h4>When You Must Act</h4>
    <ul class="key-points">
      <li><strong>The duty to act.</strong> An officer who cannot safely perform — a freeze at a key moment, a partner who had to cover — has crossed from informal support to escalated support (not discipline). Protecting them from intervention is abandonment dressed as loyalty.</li>
      <li><strong>Lead with transparency.</strong> Tell the officer what you observed, that you are moving to peer support because you are concerned, and give them the chance to self-refer first — then follow through.</li>
      <li><strong>Do not let the code of silence operate on your watch.</strong> When a review later asks who saw the decline, "everyone noticed and no one said anything" is a culture failure you own. Make raising concern about a colleague safe and expected.</li>
      <li><strong>Reassignment is protection, not a mark.</strong> Frame any administrative assignment during recovery as space to recover, consistent with GO 1.3.7's non-disciplinary model — not as a stain on the officer's record.</li>
    </ul>
  </div>
  <div class="content-block">
    <h4>How You Ask, and How You Answer</h4>
    <h2>"How are you holding up?" is a real question, or it is noise. Make it real.</h2>
    <p>A check-in delivered as a formality gets "fine" and teaches the officer the question was theater. Ask it like you mean it, in a setting that allows a real answer, and be ready to actually receive one. And model the answer: a sergeant visibly running on three days of five-hour sleep, snapping and saying "fine," is training the squad to do exactly the same. The wellness-informed answer — and the one you want your people to learn — is calibrated honesty: acknowledge the weight, name what is stable, say what you are watching in yourself. When your officers see you do that, "fine" stops being the only acceptable answer on the shift.</p>
  </div>
  <div class="content-block">
    <h4>Watch the Cumulative Load — and Normalize the Debrief</h4>
    <p>You are positioned to see what no single officer sees: who has absorbed the line-of-duty death, the child fatality, the contested use-of-force review, the run of nights without enough sleep. Three days of five-hour sleep produces impairment comparable to an unlawful blood alcohol level, and your people are making high-stakes decisions in that state. Track the load, rotate exposure where you can, normalize critical-incident debriefs as standard practice rather than a signal of weakness, and treat your own numbness as the same warning you would act on in someone else. Early, normalized engagement is what produces the careers that last — and keeping your people whole is the part of this job that no arrest total will ever measure.</p>
  </div>
`;

function getWellnessSupervisorQuestions() {
  return [
    {
      scenario: 'You want fewer of your officers to suffer in silence with operational stress. You are thinking about how to use the Ruderman Foundation finding that officers are more likely to die by suicide than in the line of duty, with stigma as the central barrier.',
      text: 'As a supervisor, how do you act on this?',
      options: [
        'Treat the stigma as a culture problem you control: make the safe path legible by stating clearly and repeatedly that wellness contacts and EAP are confidential and distinct from fitness-for-duty, and back it by how you treat officers who use them — because one officer quietly penalized for seeking help teaches the whole squad not to.',
        'Treat it as an individual problem — each officer is responsible for their own mental health.',
        'Require every officer to attend mandatory counseling to remove the stigma.',
        'Avoid discussing mental health so officers do not feel singled out.'
      ],
      correct: 0,
      feedback: 'Correct. For a supervisor, the stigma the Ruderman white paper identifies is a culture problem within their control. Making the confidential, non-career-threatening path legible — and proving it by how officers who seek help are treated — is the work. A single officer punished for reaching out undoes it for everyone.'
    },
    {
      scenario: 'You are moving a struggling officer\'s situation from informal peer support into an official channel.',
      text: 'Why must the distinction between a wellness referral and a fitness-for-duty evaluation stay clean?',
      options: [
        'They are the same thing, so the distinction does not matter.',
        'Because only fitness-for-duty evaluations are confidential.',
        'Because wellness referrals are always disciplinary and should be treated as such.',
        'Because a wellness referral is protective and confidential while a fitness-for-duty evaluation is a formal administrative process — confusing the two in front of your people frames support as punishment and discourages everyone from ever seeking help.'
      ],
      correct: 3,
      feedback: 'Correct. A wellness referral protects and is confidential; a fitness-for-duty evaluation is a formal administrative process. Keeping the lanes distinct — and being clear which one an officer is in — is what prevents support from being experienced as discipline, which is what keeps officers willing to engage.'
    },
    {
      scenario: 'An officer in your command has just been through a serious critical incident, and you are deciding how to handle the post-incident period.',
      text: 'How does GO 1.3.7 model the department\'s approach, and how should you frame it?',
      options: [
        'It treats post-incident reassignment as a suspension, so you should frame it as discipline.',
        'It leaves all post-incident wellness to the officer\'s discretion with no department role.',
        'It requires post-incident psychological evaluation at department expense and provides that reassignment "shall not be considered a suspension or disciplinary action" — so you frame any administrative assignment during recovery as support and space to recover, not punishment.',
        'It prohibits any reassignment after a critical incident.'
      ],
      correct: 2,
      feedback: 'Correct. GO 1.3.7 reflects the support-not-punishment philosophy: mandatory post-incident psychological evaluation at department expense, with reassignment that is expressly not a suspension or disciplinary action. A supervisor uses that same framing whenever acting on wellness — protection and recovery, not a mark against the officer.'
    },
    {
      scenario: 'One of your officers has been declining for weeks. Informal peer support has not changed things, and yesterday the officer froze during a domestic and a partner had to step in to manage the scene.',
      text: 'What is your obligation now?',
      options: [
        'Keep it informal and protect the officer\'s privacy — escalating would feel like a betrayal.',
        'Act: the officer has crossed from informal support to escalated support (not discipline). Tell them what you observed, that you are moving to peer support because you are concerned, give them the chance to self-refer first, and follow through — an officer who cannot safely perform is a danger to themselves, their partners, and the public.',
        'Open an internal affairs complaint about the performance failure.',
        'Wait for another incident before doing anything, to be sure it is a pattern.'
      ],
      correct: 1,
      feedback: 'Correct. When informal support has not worked and performance is creating a safety risk, the threshold for escalated support has been crossed. The right move is transparency plus follow-through: name what you saw, move to peer support, and give the officer the chance to self-refer. Protecting an unsafe officer from intervention is abandonment dressed as loyalty.'
    },
    {
      scenario: 'After an officer\'s breakdown, a review finds that many people on the squad had noticed the decline for weeks, but no one said anything.',
      text: 'What does this reveal, and what is the supervisor\'s responsibility?',
      options: [
        'It reveals a culture failure the supervisor owns: making it safe and expected to raise concern about a colleague is the supervisor\'s job, and a squad where everyone notices but no one speaks is a condition the supervisor is responsible for changing.',
        'Nothing — what officers choose to report among themselves is not a supervisory matter.',
        'It shows the officers were correct to stay silent and protect their colleague.',
        'It is solely the fault of the individual officers who failed to report.'
      ],
      correct: 0,
      feedback: 'Correct. "Everyone noticed and no one said anything" is a culture failure a supervisor owns. The code of silence operating around officer wellness is something the supervisor is responsible for dismantling — by making it safe and expected to raise concern about a colleague before a crisis.'
    },
    {
      scenario: 'You ask an officer "how are you holding up?" as you pass in the hallway, and get a quick "fine" without breaking stride.',
      text: 'What does a wellness-informed supervisor understand about that exchange?',
      options: [
        'It confirms the officer is doing well and no follow-up is needed.',
        'A check-in delivered as a formality reliably gets "fine" and teaches the officer the question was theater — so the practice is to ask it like you mean it, in a setting that allows a real answer, and be ready to receive one.',
        'Officers should be required to give a detailed wellness report on demand.',
        'The hallway is the ideal place for meaningful wellness conversations.'
      ],
      correct: 1,
      feedback: 'Correct. A perfunctory check-in produces a reflexive "fine" and signals that the question is theater. A wellness-informed supervisor asks in a way and a setting that make a real answer possible, and is prepared to actually receive one.'
    },
    {
      scenario: 'You have been running on three days of five-hour sleep, you have been short with your squad, and you keep answering "fine" when anyone asks how you are doing.',
      text: 'Why does your own behavior here matter as a supervisor?',
      options: [
        'It does not — a supervisor\'s personal wellness is separate from the squad\'s.',
        'Because supervisors are exempt from wellness expectations and should hide any strain.',
        'Because your example sets the squad\'s permission: a visibly depleted supervisor snapping and saying "fine" trains officers to do the same, while modeling calibrated honesty — acknowledging the weight, naming what is stable, saying what you are watching in yourself — shows them that "fine" is not the only acceptable answer.',
        'Because the impairment from sleep loss only affects line officers, not supervisors.'
      ],
      correct: 2,
      feedback: 'Correct. A supervisor models the squad\'s wellness norms. A depleted supervisor masking it with "fine" teaches officers to mask too; modeling calibrated honesty gives them permission to answer honestly. And sleep-deprivation impairment — comparable to an unlawful BAC at three days of five-hour sleep — affects the supervisor\'s high-stakes decisions just as much.'
    },
    {
      scenario: 'You notice one of your officers has absorbed a string of traumatic incidents over a short span — a line-of-duty death, a child fatality, and a contested use-of-force review — on top of heavy overtime.',
      text: 'What is the appropriate supervisory action?',
      options: [
        'Leave it alone — officers are expected to handle whatever the job brings.',
        'Manage the cumulative load you are uniquely positioned to see: track the exposure, rotate hard calls where possible, normalize critical-incident debriefs as standard practice rather than a sign of weakness, and watch for sleep-driven impairment in high-stakes decisions.',
        'Assign the officer more high-stress calls to build resilience.',
        'Wait for the officer to show a visible breakdown before acting.'
      ],
      correct: 1,
      feedback: 'Correct. The supervisor sees the accumulation no single officer can — the run of traumatic calls plus sleep deficit. Tracking the load, rotating exposure, and normalizing debriefs as routine (not weakness) is the supervisory work, and three days of five-hour sleep produces impairment comparable to an unlawful BAC in someone making life-and-death decisions.'
    },
  ];
}

/* ══════════════════════════════════════════
   SUPERVISOR SCENARIO — Officer Wellness (EGPD)
   Owning the system around the moment a peer catches it. Officer Pruitt.
══════════════════════════════════════════ */
const SCENARIO_WELLNESS_SUP = {
  id: 'scenario-wellness-sup',
  title: 'Supervisor — The System Around Wellness',
  location: 'Patrol Division, East Greenville Borough, PA',
  totalDecisions: 3,
  nodes: {
    'start': {
      type: 'scene', time: '22:00', weather: 'End of Shift', unit: 'Squad Supervisor',
      narrative: [
        'A peer catches it in the parking lot. You build the conditions that decide whether anyone says it out loud. Officer Pruitt has been declining for weeks, and as a supervisor you own the system around that moment: whether your squad believes help is safe to seek, and whether the official mechanisms are ready when informal support isn\'t enough.',
        'The sergeant asking "how are you holding up?" is you — and how you handle the next three things sets the squad\'s permission to be honest.'
      ],
      next: 'd1'
    },
    'd1': {
      type: 'decision', decisionNumber: 1,
      situation: 'You want fewer of your officers suffering in silence. The Ruderman finding is in your head — officers are more likely to die by suicide than in the line of duty, with stigma as the central barrier.',
      question: 'How do you act on it as a supervisor?',
      options: [
        { text: 'Treat the stigma as a culture problem you control — say clearly and repeatedly that wellness contacts and EAP are confidential and distinct from fitness-for-duty, and back it by how you treat officers who use them.', next: 'c1a', quality: 'good', shortLabel: 'Made the safe path legible' },
        { text: 'Treat it as an individual problem — each officer is responsible for their own mental health.', next: 'c1b', quality: 'bad', shortLabel: 'Made it the individual\'s problem' },
        { text: 'Require every officer to attend mandatory counseling to remove the stigma.', next: 'c1c', quality: 'bad', shortLabel: 'Mandated counseling for everyone' },
        { text: 'Avoid discussing mental health so officers don\'t feel singled out.', next: 'c1d', quality: 'bad', shortLabel: 'Avoided the topic' },
      ]
    },
    'c1a': {
      type: 'consequence', outcomeClass: 'outcome-good', outcomeLabel: 'You Made Help Safe to Seek',
      heading: 'The stigma the Ruderman white paper identifies is a culture problem within your control.',
      narrative: [
        'You make the safe path legible: a voluntary wellness contact or EAP self-referral is confidential and distinct from a fitness-for-duty evaluation, peer-support and CISM communications are confidential under 42 Pa.C.S. § 5950 and § 5952, and using them is not a career risk. Then you prove it by how you treat the officers who reach out.',
        'Officers won\'t use a resource they think will cost them their standing. One officer quietly penalized for seeking help teaches the whole squad never to — and you are the one who sets that either way.'
      ],
      legal: '42 Pa.C.S. § 5950 (CISM confidentiality) and § 5952 (trained peer-support members); EAP confidentiality. A voluntary wellness contact is distinct from a fitness-for-duty evaluation.',
      next: 'd2'
    },
    'c1b': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'You Can\'t Outsource the Culture',
      heading: 'Calling it an individual problem ignores the part you actually control.',
      narrative: [
        'Treating wellness as each officer\'s private responsibility abandons the lever a supervisor holds — the culture that decides whether help feels safe to seek. The Ruderman finding is precisely that stigma, not the absence of resources, is the barrier, and stigma is a supervisory and cultural problem.',
        'Make the confidential, non-career-threatening path legible, and back it with how you treat people who use it.'
      ],
      legal: 'Officer-wellness research: stigma is the central barrier to early intervention, and it is addressed at the culture level the supervisor controls.',
      next: 'd2'
    },
    'c1c': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Mandates Don\'t Remove Stigma',
      heading: 'Compelling everyone into counseling produces defensive compliance, not trust.',
      narrative: [
        'Mandatory counseling for the whole squad treats a trust problem with a coercion solution. It produces guarded, going-through-the-motions participation and can deepen the sense that needing help is a mark against you — the opposite of what reduces stigma.',
        'The work is making voluntary, confidential help credible and safe, and proving it by example.'
      ],
      legal: 'Officer-wellness research: voluntary, confidential engagement is associated with better outcomes; coerced participation tends to be defensive.',
      next: 'd2'
    },
    'c1d': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Silence Is the Stigma',
      heading: 'Not talking about it lets the stigma stand.',
      narrative: [
        'Avoiding the subject so no one feels singled out leaves the existing silence — and the existing stigma — exactly in place. Officers read that silence as confirmation that wellness isn\'t something you raise here.',
        'Name the resources, name the confidentiality, and normalize using them. The supervisor\'s voice is part of what makes help safe to seek.'
      ],
      legal: 'Officer-wellness research: normalizing resources and confidentiality reduces stigma; silence reinforces it.',
      next: 'd2'
    },
    'd2': {
      type: 'decision', decisionNumber: 2,
      situation: 'Pruitt has kept declining. Informal support hasn\'t changed things, and yesterday he froze during a domestic and a partner had to step in to manage the scene.',
      question: 'What do you do?',
      options: [
        { text: 'Act — this is escalated support, not discipline. Tell Pruitt what you observed, that you\'re moving to peer support because you\'re concerned, give him the chance to self-refer first, and follow through.', next: 'c2a', quality: 'good', shortLabel: 'Escalated support with transparency' },
        { text: 'Keep it informal and protect his privacy — escalating would feel like a betrayal.', next: 'c2b', quality: 'bad', shortLabel: 'Stayed informal' },
        { text: 'Open an internal affairs complaint about the performance failure.', next: 'c2c', quality: 'bad', shortLabel: 'Opened an IA complaint' },
        { text: 'Wait for another incident before doing anything, to be sure it\'s a pattern.', next: 'c2d', quality: 'bad', shortLabel: 'Waited for another incident' },
      ]
    },
    'c2a': {
      type: 'consequence', outcomeClass: 'outcome-good', outcomeLabel: 'Escalated Support, the Right Way',
      heading: 'When performance creates a safety risk, the threshold for escalated support — not discipline — is crossed.',
      narrative: [
        'You tell Pruitt plainly what you saw, that you\'re moving to peer support because you\'re concerned for him, and that he should make the call himself first — and you follow through regardless. An officer who can\'t safely perform is a danger to himself, his partners, and the public, and protecting him from intervention is abandonment dressed as loyalty.',
        'Transparency plus follow-through is the move: support, not punishment, but support that actually happens.'
      ],
      legal: '42 Pa.C.S. § 5950 / § 5952 (confidential peer support). When informal support fails and safety is at risk, escalated support is the response.',
      next: 'd3'
    },
    'c2b': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Loyalty Misapplied',
      heading: 'Staying informal after a freeze on a call leaves an unsafe officer on the street.',
      narrative: [
        'Keeping it informal to protect Pruitt\'s privacy, after he froze on a domestic and a partner had to cover, leaves a genuine safety risk in place. The code of silence that feels like loyalty is actually abandonment — Pruitt needs intervention, not protection from the truth about what\'s happening to him.',
        'Move to escalated support, with transparency and follow-through.'
      ],
      legal: 'Officer-wellness practice: when performance creates safety risk, escalated support is warranted; allowing an unsafe officer to continue is a danger and a liability.',
      next: 'd3'
    },
    'c2c': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Wrong Lane',
      heading: 'An IA complaint treats an operational-stress crisis as misconduct.',
      narrative: [
        'Opening an internal affairs complaint frames Pruitt\'s freeze — a likely operational-stress response — as a disciplinary matter. That both misses the wellness intervention he needs and tells the squad that struggling gets you investigated, which guarantees no one will admit to struggling.',
        'The lane here is escalated support: transparency, peer support, follow-through — kept clearly distinct from discipline.'
      ],
      legal: 'Officer-wellness practice: wellness escalation is distinct from a disciplinary or fitness-for-duty process; conflating them discourages help-seeking.',
      next: 'd3'
    },
    'c2d': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Waiting Is a Gamble',
      heading: 'You already have the pattern — and the next incident could be the serious one.',
      narrative: [
        'Waiting for another incident to be "sure" ignores that the freeze on the domestic, after weeks of decline and failed informal support, is the pattern. The next event you\'re waiting on could be the one where someone gets hurt.',
        'Act now: escalated support, transparently, with follow-through.'
      ],
      legal: 'Officer-wellness practice: a documented decline plus a safety-relevant failure is sufficient to act; waiting risks a worse outcome.',
      next: 'd3'
    },
    'd3': {
      type: 'decision', decisionNumber: 3,
      situation: 'Separately, another officer on your squad has just been through a serious critical incident. You\'re deciding how to handle the post-incident period and how to frame it for her and the squad.',
      question: 'How do you frame it?',
      options: [
        { text: 'Use GO 1.3.7\'s model — mandatory post-incident psychological evaluation at department expense, with reassignment that "shall not be considered a suspension or disciplinary action" — and present any administrative assignment as support and space to recover.', next: 'c3a', quality: 'good', shortLabel: 'Framed it as support, per GO 1.3.7' },
        { text: 'Frame the post-incident reassignment as a suspension, so it\'s clear it\'s serious.', next: 'c3b', quality: 'bad', shortLabel: 'Framed it as discipline' },
        { text: 'Leave the post-incident period entirely to the officer\'s discretion, with no department role.', next: 'c3c', quality: 'bad', shortLabel: 'Left it to the officer' },
      ]
    },
    'c3a': {
      type: 'consequence', outcomeClass: 'outcome-good', outcomeLabel: 'Support, Not Punishment',
      heading: 'GO 1.3.7 already models the department\'s philosophy — use it.',
      narrative: [
        'You apply the framing GO 1.3.7 sets after the most serious incidents: a mandatory psychological evaluation at department expense, with reassignment that is expressly not a suspension or disciplinary action. You present the administrative assignment as space to recover, and you make sure both the officer and the squad understand which lane she\'s in.',
        'Keeping support and discipline cleanly separate — and saying so out loud — is what keeps officers willing to engage after the next critical incident.'
      ],
      legal: 'GO 1.3.7: mandatory post-incident psychological evaluation at department expense; reassignment "shall not be considered a suspension or disciplinary action."',
      next: 'debrief'
    },
    'c3b': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Poisoned the Well',
      heading: 'Framing post-incident support as a suspension teaches everyone to dread the support.',
      narrative: [
        'Calling the reassignment a suspension turns GO 1.3.7\'s protective measure into a punishment in the squad\'s eyes. The next officer who goes through a critical incident will fight the evaluation and hide the strain, because you taught them support and discipline are the same thing.',
        'GO 1.3.7 is explicit that the reassignment is not disciplinary — frame it that way.'
      ],
      legal: 'GO 1.3.7: post-incident reassignment is expressly not a suspension or disciplinary action; framing it as discipline misstates the policy.',
      next: 'debrief'
    },
    'c3c': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'The Department Has a Role',
      heading: 'Leaving it entirely to the officer ignores what GO 1.3.7 requires.',
      narrative: [
        'After a serious critical incident, GO 1.3.7 provides for a mandatory evaluation at department expense and a non-disciplinary reassignment — this is not left to the officer\'s discretion, precisely because officers in that moment tend to wave off help they need.',
        'Apply the policy, and frame it as the support it is.'
      ],
      legal: 'GO 1.3.7: post-incident psychological evaluation is mandatory and at department expense; it is not discretionary for the officer.',
      next: 'debrief'
    },
    'debrief': { type: 'debrief' }
  }
};
