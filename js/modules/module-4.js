══════════════════════════════════════════ */
const SCENARIO_CRISIS = {
  id: 'scenario-crisis',
  title: 'Main Street — Welfare Check',
  location: 'Main Street, Marlborough Township, PA',
  totalDecisions: 3,
  nodes: {
    'start': {
      type: 'scene', time: '14:22', weather: 'Overcast / 61°F', unit: 'Patrol Unit 4',
      narrative: [
        'You are dispatched to a welfare check at a residential address on Main Street. The caller is the subject\'s mother. She reports that her 31-year-old son has been in a mental health crisis for approximately two days, has not taken his prescribed medication, and made a statement this morning about "not wanting to be here anymore."',
        'She does not know if he has access to weapons. He lives alone. You arrive to find the subject seated on his front porch steps, rocking slowly, arms folded across his chest. He appears to be speaking quietly to himself. He does not acknowledge your approach.'
      ],
      next: 'd1'
    },
    'd1': {
      type: 'decision', decisionNumber: 1,
      situation: 'The subject is non-responsive to your presence. He is not displaying any visible weapon. He appears distressed, not threatening. You are approximately 30 feet away.',
      question: 'How do you make initial contact?',
      options: [
        { text: 'Approach directly and authoritatively. Identify yourself and ask him to stand and face you.', next: 'c1a', quality: 'bad', shortLabel: 'Direct authoritative approach — escalating' },
        { text: 'Stay at your vehicle. Call for backup and a mental health co-responder before making any contact.', next: 'c1b', quality: 'risky', shortLabel: 'Staged at vehicle — waiting for backup' },
        { text: 'Approach slowly at a non-threatening angle. Speak in a calm, quiet voice: "Hey — my name\'s [name] from your department. Your mom asked me to come check on you. Mind if I sit with you for a minute?"', next: 'c1c', quality: 'good', shortLabel: 'Calm, low-key approach — CIT principles' },
        { text: 'Call the mother back to gather more information before making any contact with the subject.', next: 'c1d', quality: 'risky', shortLabel: 'Called mother for more information first' },
      ]
    },
    'c1a': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Subject Escalated — Crisis Deepened',
      heading: 'He didn\'t respond to authority — he responded to it.',
      narrative: [
        'Your direct approach and commanding tone cause the subject to snap upright. He begins yelling, pacing the porch, and moves toward the front door. You have lost the window for a calm contact. The situation has escalated from a distressed subject to a potential crisis standoff.',
        'For individuals in a mental health crisis, authoritative commands often trigger fight-or-flight responses that have nothing to do with compliance. The approach matters more than the words.'
      ],
      legal: 'Pennsylvania\'s Mental Health Procedures Act (MHPA, 50 P.S. § 7302) authorizes involuntary examination when a person poses a clear and present danger to themselves or others. But getting to that point safely requires de-escalation, not escalation. PA Act 57 of 2020 requires officers to consider de-escalation whenever it is safe to do so.',
      next: 'd2a'
    },
    'c1b': {
      type: 'consequence', outcomeClass: 'outcome-neutral', outcomeLabel: 'Safe — But Window Narrowing',
      heading: 'You\'re staged. Now what?',
      narrative: [
        'You maintain your position at your vehicle. Your partner arrives four minutes later. A mental health co-responder is 20 minutes out. During that time, the subject stands, looks toward his vehicle, and begins walking toward it.',
        'He may be retrieving something. He may be attempting to leave. You now have to make a decision about whether to intercept.'
      ],
      legal: null, next: 'd2b'
    },
    'c1c': {
      type: 'consequence', outcomeClass: 'outcome-good', outcomeLabel: 'Contact Established — Subject Talking',
      heading: 'He\'s talking.',
      narrative: [
        'Your calm approach and non-threatening posture work. The subject looks up after your first sentence. He does not speak immediately, but he doesn\'t move away either. You slow your approach, take a position at his level — seated on the steps nearby — and wait.',
        'After 90 seconds, he says: "She shouldn\'t have called you." You respond: "She was worried. I\'m not here to do anything — just to talk." He begins speaking. After several minutes of conversation, he mentions there is "something inside he could use" if things got bad enough.'
      ],
      legal: null, next: 'd2c'
    },
    'c1d': {
      type: 'consequence', outcomeClass: 'outcome-neutral', outcomeLabel: 'More Information — Now Act on It',
      heading: 'His mother tells you he has a shotgun.',
      narrative: [
        'The mother confirms he owns a shotgun, kept in a hall closet. He purchased it legally. She does not know if he has loaded it. He has no history of violence toward others, but three prior 302 evaluations for suicidal ideation.',
        'You now have information that changes your approach. The situation is more complex than it appeared. Your partner is 3 minutes out.'
      ],
      legal: null, next: 'd2d'
    },
    'd2a': {
      type: 'decision', decisionNumber: 2,
      situation: 'The subject is now pacing the porch and yelling. He has not produced a weapon. Your partner is arriving. How do you de-escalate from this position?',
      question: 'What is your next action?',
      options: [
        { text: 'Maintain your position, reduce your own volume and tone, and wait for him to exhaust the initial spike before speaking again.', next: 'c2a_right', quality: 'good', shortLabel: 'Waited out the spike — reduced own energy' },
        { text: 'Issue commands for him to stop pacing and face you.', next: 'c2a_wrong', quality: 'bad', shortLabel: 'More commands — continued escalation' },
        { text: 'Approach the porch to get closer to him.', next: 'c2a_wrong', quality: 'bad', shortLabel: 'Closed distance — escalating' },
        { text: 'Request a 302 involuntary evaluation immediately.', next: 'c2a_302', quality: 'risky', shortLabel: 'Immediate 302 request' },
      ]
    },
    'c2a_wrong': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Continued Escalation',
      heading: 'More commands won\'t help right now.',
      narrative: [
        'A person in a mental health crisis who is already elevated does not respond to additional commands the way a non-crisis individual might. Issuing more commands or closing distance at this point prolongs the escalation and increases danger to both parties.',
        'The correct move after an escalation spike is to reduce your own energy, create space, and wait. Let the spike pass before re-engaging.'
      ],
      legal: null, next: 'd3'
    },
    'c2a_302': {
      type: 'consequence', outcomeClass: 'outcome-neutral', outcomeLabel: '302 Criteria Must Be Met',
      heading: 'A 302 requires clear and present danger.',
      narrative: [
        'A 302 involuntary examination under the Pennsylvania MHPA requires that the person poses a clear and present danger to themselves or others. Agitation and a history of crisis alone may not meet the standard if no specific threat has been communicated. Document carefully.',
        'The 302 can be the right tool — but it needs to be grounded in documented criteria, not just a desire to resolve the situation quickly.'
      ],
      legal: '50 P.S. § 7302 authorizes involuntary examination for persons who pose a clear and present danger based on a recent overt act, attempt, or threat. The officer must document the specific basis for the 302 — a general mental health crisis without a specific threat may not satisfy the standard.',
      next: 'd3'
    },
    'c2a_right': {
      type: 'consequence', outcomeClass: 'outcome-good', outcomeLabel: 'De-Escalation Working',
      heading: 'The spike passes.',
      narrative: [
        'You reduce your own volume, step back slightly, and wait. Your partner arrives and mirrors your calm energy. After approximately three minutes, the subject stops pacing and sits back down. You re-engage with the same low-key approach: "That looked rough. You okay?" He begins to talk.',
        'The situation has returned to a workable contact. You can now work toward a voluntary evaluation or a 302 if criteria are met.'
      ],
      legal: 'De-escalation is not just a technique — under PA Act 57 of 2020 and department policy, officers are required to consider de-escalation whenever it is safe and feasible. Documented de-escalation efforts protect the officer and the department.',
      next: 'd3'
    },
    'd2b': {
      type: 'decision', decisionNumber: 2,
      situation: 'The subject is walking toward his vehicle. You don\'t know if he is retrieving something, attempting to leave, or both.',
      question: 'How do you respond?',
      options: [
        { text: 'Intercept him physically before he reaches the vehicle.', next: 'c2b_wrong', quality: 'bad', shortLabel: 'Physical intercept — premature force' },
        { text: 'Call out to him calmly by name: "Hey — where are you headed? Can you hang tight for a second?" Make contact before he reaches the vehicle.', next: 'c2b_right', quality: 'good', shortLabel: 'Verbal intercept — calm tone' },
        { text: 'Draw your weapon and order him to stop.', next: 'c2b_force', quality: 'bad', shortLabel: 'Weapon drawn — excessive for current threat' },
        { text: 'Let him reach the vehicle and see what he does.', next: 'c2b_wait', quality: 'risky', shortLabel: 'Waited — unknown risk allowed to develop' },
      ]
    },
    'c2b_wrong': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Force Without Justification',
      heading: 'He hasn\'t done anything yet.',
      narrative: [
        'Physically intercepting a subject who is walking — with no weapon visible, no threat made — is a use of force without a clear legal basis. If the subject was simply going to get his keys or phone, you\'ve now created an incident out of a non-incident and potentially triggered the exact crisis you were trying to prevent.'
      ],
      legal: null, next: 'd3'
    },
    'c2b_force': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Excessive — No Threat Present',
      heading: 'A weapon is not justified here.',
      narrative: [
        'Drawing your weapon on a distressed person walking toward a vehicle — with no visible weapon, no threatening statement, no overt act — is excessive and likely to catastrophically escalate the situation. A person in crisis who sees a drawn firearm may interpret it as confirmation of their worst fears.'
      ],
      legal: 'Graham v. Connor requires that force be objectively reasonable based on the threat as it exists at the moment force is applied. Walking toward a vehicle is not, by itself, a threat that justifies displaying a firearm.',
      next: 'd3'
    },
    'c2b_wait': {
      type: 'consequence', outcomeClass: 'outcome-neutral', outcomeLabel: 'Risk Allowed to Develop',
      heading: 'He opens the glove box.',
      narrative: [
        'He reaches the vehicle and opens the passenger door. You cannot see what is in the glove box from your position. You now have a subject with potential access to a weapon and no verbal contact established. The risk profile has increased significantly.',
        'A calm verbal intercept before he reached the vehicle could have maintained control of the situation without force.'
      ],
      legal: null, next: 'd3'
    },
    'c2b_right': {
      type: 'consequence', outcomeClass: 'outcome-good', outcomeLabel: 'Contact Maintained',
      heading: 'He stops.',
      narrative: [
        'He hears his name and pauses. He turns toward you. "I just need to get something," he says. You respond: "That\'s fine — just talk to me first. What do you need?" He says his phone charger. You offer to get it with him. He agrees. Contact is maintained. You accompany him to the vehicle.',
        'Calm verbal intercept preserved the situation without force.'
      ],
      legal: 'Crisis intervention is built on maintaining contact and communication. Verbal de-escalation — including using the person\'s name, acknowledging their autonomy, and offering non-threatening choices — is consistently more effective than commands or force in mental health encounters.',
      next: 'd3'
    },
    'd2c': {
      type: 'decision', decisionNumber: 2,
      situation: 'The subject has disclosed that there is "something inside he could use" if things got bad enough. You don\'t know if this means a firearm, medication, or something else. He is still calm and talking to you.',
      question: 'How do you respond to this disclosure?',
      options: [
        { text: 'Ask him directly: "Are you telling me you have a gun inside?" and prepare to act on his answer.', next: 'c2c_direct', quality: 'good', shortLabel: 'Direct, calm clarifying question' },
        { text: 'Immediately back away and call for backup and tactical support.', next: 'c2c_tactical', quality: 'risky', shortLabel: 'Withdrew for tactical support' },
        { text: 'Ignore the statement and keep the conversation going — you don\'t want to break the rapport.', next: 'c2c_ignore', quality: 'bad', shortLabel: 'Ignored the disclosure' },
        { text: 'Tell him you need to go inside and secure whatever it is before you continue talking.', next: 'c2c_enter', quality: 'bad', shortLabel: 'Pushed to enter — broke rapport' },
      ]
    },
    'c2c_direct': {
      type: 'consequence', outcomeClass: 'outcome-good', outcomeLabel: 'Disclosure Handled Correctly',
      heading: 'He tells you.',
      narrative: [
        'He pauses, looks at you, and nods. "It\'s my dad\'s shotgun. I haven\'t loaded it." You maintain your calm tone: "Thank you for telling me that. That helps me understand. Would you be willing to let my partner hold onto it while we keep talking — just so we don\'t have to think about it?" After a moment, he agrees.',
        'Your partner retrieves the shotgun. The conversation continues. You coordinate with a mental health co-responder for a voluntary evaluation. He agrees to go.'
      ],
      legal: 'Voluntary weapon surrender during a mental health encounter, achieved through rapport and calm communication, is almost always preferable to a forced entry or a physical intervention. Document the disclosure, the request, the voluntary surrender, and the outcome. This protects everyone involved.',
      next: 'd3'
    },
    'c2c_tactical': {
      type: 'consequence', outcomeClass: 'outcome-neutral', outcomeLabel: 'Rapport Lost — Situation Hardens',
      heading: 'You broke contact. He noticed.',
      narrative: [
        'You step back and call dispatch. The subject sees you withdraw and his demeanor shifts. He goes back inside and locks the door. A 90-minute standoff follows before a mental health co-responder talks him out.',
        'Withdrawing without explanation when a person in crisis has just disclosed something vulnerable often reads as rejection or threat. The disclosure was an opening. Backing away closed it.'
      ],
      legal: null, next: 'd3'
    },
    'c2c_ignore': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Threat Not Addressed',
      heading: 'You cannot ignore a weapon disclosure.',
      narrative: [
        'Ignoring a statement about access to a means of self-harm — in a welfare check for suicidal ideation — is a failure of both your duty of care and your tactical responsibility. The rapport you built has value, but it cannot come at the cost of a disclosed safety threat.',
        'The disclosure needed to be addressed — calmly, directly, and without breaking the connection you\'d built.'
      ],
      legal: null, next: 'd3'
    },
    'c2c_enter': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Rapport Broken — Entry Legally Questionable',
      heading: 'Pushing to enter ended the conversation.',
      narrative: [
        'He immediately withdraws when you suggest entering his home. "You\'re not coming in" — he stands up and moves toward the door. The rapport you built over 15 minutes is gone in 10 seconds.',
        'Additionally, without consent or a warrant, entering his residence requires a recognized exception — exigent circumstances or a 302 — neither of which is fully established yet based on the disclosure alone.'
      ],
      legal: 'A statement about access to a means of self-harm, without more, may not by itself meet the exigent circumstances threshold for a warrantless entry. PA courts evaluate whether the threat was immediate and specific. Document carefully. When in doubt, work toward consent — it\'s always cleaner than forced entry.',
      next: 'd3'
    },
    'd2d': {
      type: 'decision', decisionNumber: 2,
      situation: 'You now know he owns a shotgun and has a history of suicidal ideation. Your partner is 2 minutes out. The subject is still seated on the porch, unaware you spoke to his mother. How do you make initial contact?',
      question: 'How do you approach, knowing what you now know?',
      options: [
        { text: 'Approach with your partner, both in full uniform with hands near your weapons. Announce yourselves and ask him to step off the porch.', next: 'c2d_wrong', quality: 'bad', shortLabel: 'Tactical approach — escalating for the situation' },
        { text: 'Wait for your partner to arrive, then approach together — one officer in the lead for conversation, one positioned for safety — with a calm, low-key opening.', next: 'c2d_right', quality: 'good', shortLabel: 'Coordinated calm approach with safety positioning' },
        { text: 'Approach alone immediately — you don\'t want him to feel surrounded when your partner arrives.', next: 'c2d_solo', quality: 'risky', shortLabel: 'Solo approach before backup arrives' },
        { text: 'Call for SWAT — the presence of a firearm makes this a tactical situation.', next: 'c2d_swat', quality: 'bad', shortLabel: 'SWAT requested — disproportionate response' },
      ]
    },
    'c2d_wrong': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Tactical Approach Escalated Crisis',
      heading: 'He read that as a threat.',
      narrative: [
        'Two officers approaching in a tactical posture — hands near weapons, commanding tone — caused the subject to retreat inside immediately. You have lost access. The situation is now a barricaded subject call.',
        'The information about the shotgun should inform your safety positioning and awareness — not your approach posture. He is a person in crisis, not a subject of a tactical operation.'
      ],
      legal: null, next: 'd3'
    },
    'c2d_solo': {
      type: 'consequence', outcomeClass: 'outcome-neutral', outcomeLabel: 'Contact Made — Safety Exposure',
      heading: 'Contact made. Safety positioning thin.',
      narrative: [
        'You make contact before your partner arrives. The subject engages and is willing to talk. But you are alone with a subject you know has a shotgun inside, in a mental health crisis, with a history of suicidal ideation. Your safety positioning is not where it needs to be.',
        'Waiting 90 seconds for your partner would have given you both the contact and the coverage.'
      ],
      legal: null, next: 'd3'
    },
    'c2d_swat': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Disproportionate Response',
      heading: 'SWAT is not the tool for this situation.',
      narrative: [
        'A distressed person in a mental health crisis, legally owning a firearm, seated on his porch and not threatening anyone, does not meet the threshold for a SWAT response. Deploying a tactical team to this situation would escalate it catastrophically and expose the department to significant civil liability.',
        'Information about a legally owned firearm changes your approach and awareness — it does not automatically change the nature of the call.'
      ],
      legal: null, next: 'd3'
    },
    'c2d_right': {
      type: 'consequence', outcomeClass: 'outcome-good', outcomeLabel: 'Contact Established — Safety Maintained',
      heading: 'Coordinated and calm.',
      narrative: [
        'Your partner arrives. You brief them quickly on what you know. You take the lead on conversation; your partner positions to your offset for safety awareness without appearing tactical. You approach with the same low-key opening: "Hey — your mom was worried about you. Mind if we talk for a minute?"',
        'He looks up, nods. Contact is established. Your awareness of the shotgun informs your positioning — not your demeanor. That\'s the right balance.'
      ],
      legal: 'Crisis intervention and officer safety are not mutually exclusive. Knowing about a potential weapon changes your tactical awareness — where you position, where your partner stands, what you observe. It does not change the basic principle that a calm, respectful approach is almost always the correct first contact in a mental health call.',
      next: 'd3'
    },

    'd3': {
      type: 'decision',
      decisionNumber: 3,
      situation: 'The subject agreed to voluntary transport for a mental health evaluation. You are walking him toward your patrol vehicle in the parking lot when he stops, sits down on the curb, and says: "I changed my mind. I\'m not going. I feel better now." He is calm, coherent, and no longer making statements about harming himself. He is not under an involuntary commitment order at this point. His family member, who arrived on scene, is urging you to force him to go.',
      question: 'What is your correct course of action?',
      options: [
        {
          text: 'He agreed to go, so you can physically place him in the vehicle — consent was already given.',
          shortLabel: 'Place him in vehicle — prior consent binds him',
          quality: 'bad',
          next: 'c3-bad'
        },
        {
          text: 'Acknowledge his change of mind. Re-engage de-escalation. Assess current state for involuntary commitment criteria. If criteria are not met, document the interaction, provide crisis resources, and coordinate with the family and mental health follow-up services.',
          shortLabel: 'Re-engage, reassess commitment criteria, document',
          quality: 'good',
          next: 'c3-good'
        },
        {
          text: 'Tell him he has to come because you already called it in and transport is waiting.',
          shortLabel: 'Pressure him using the logistics as leverage',
          quality: 'risky',
          next: 'c3-neutral'
        }
      ]
    },
    'c3-bad': {
      type: 'consequence',
      outcomeClass: 'outcome-bad',
      outcomeLabel: 'Civil Rights Violation',
      heading: 'Voluntary consent can be withdrawn at any time — placing him in the vehicle without legal authority is unlawful detention.',
      narrative: [
        'Voluntary is exactly what it says. He can withdraw consent at any point prior to transport. Once he withdraws consent, the prior agreement is void. Physically placing him in the vehicle now — without a valid § 302 emergency commitment or other lawful authority — constitutes unlawful detention, and potentially assault.',
        'The family member\'s pressure does not create legal authority. Your belief that he needs help does not create legal authority. What creates legal authority is meeting the criteria under 50 Pa. C.S. § 302: clear and present danger to self or others based on observed behavior.',
        'If he no longer meets those criteria, you document and disengage. If he does still meet them, initiate an involuntary commitment — do not manufacture a different basis.'
      ],
      legal: '50 Pa. C.S. § 302 authorizes involuntary emergency examination when an officer observes conduct constituting clear and present danger to self or others. Voluntary transport requires ongoing voluntary consent. Withdrawal of consent without § 302 authority present means the transport cannot proceed.',
      next: 'debrief'
    },
    'c3-good': {
      type: 'consequence',
      outcomeClass: 'outcome-good',
      outcomeLabel: 'Legally and Tactically Sound',
      heading: 'Reassessment, documentation, and connecting to follow-up services is the correct response.',
      narrative: [
        'Re-engaging de-escalation honors his autonomy while giving you accurate information about his current state. If the conversation reveals he still meets § 302 criteria — statements about self-harm, visible behavior indicating imminent danger — you now have a lawful basis for an involuntary commitment.',
        'If he does not meet those criteria: document the full interaction, your assessment, the resources provided, and the follow-up coordination with the family. Note that mobile crisis support or a community health follow-up was offered.',
        'This documentation protects you and creates a record that may be critical if he escalates later. A well-documented welfare contact is a professional outcome.'
      ],
      legal: 'Withdrawal of voluntary consent must be honored. Re-engagement and reassessment is the CIT-trained approach. If § 302 criteria are met, initiate the formal process. If not, document the contact thoroughly — including crisis resources provided and family coordination — per department crisis response protocol.',
      next: 'debrief'
    },
    'c3-neutral': {
      type: 'consequence',
      outcomeClass: 'outcome-neutral',
      outcomeLabel: 'Coercive — Creates Liability',
      heading: 'Using logistics as leverage is coercion — it does not create lawful consent.',
      narrative: [
        'Telling someone they "have to" go because of administrative considerations (you called it in, transport is waiting) implies consequences that do not exist and may constitute coercion. Coerced consent is not lawful consent.',
        'If he complies under this kind of pressure and later claims he was forced, you have a documentation problem — and potentially a legal one. The same outcome you wanted (getting him evaluated) is achievable through proper channels.',
        'If § 302 criteria still exist, invoke them. If they do not, document and disengage. Those are the correct options.'
      ],
      legal: 'Coercion vitiates consent. Transport obtained through pressure or deception — including implying the subject has no choice when they legally do — is not voluntary. This creates civil liability and undermines the legitimacy of any subsequent evaluation.',
      next: 'debrief'
    },
    'debrief': { type: 'debrief' }
  }
};


/* ══════════════════════════════════════════
   SCENARIO — Domestic Violence Response
══════════════════════════════════════════ */

function getCrisisQuestions() {
  return [
    {
      scenario: 'You respond to a welfare check. A neighbor reports a 31-year-old male has been in a mental health crisis for two days, has not taken his medication, and said "he didn\'t want to be here anymore." He is seated on his front porch when you arrive.',
      text: 'Under Pennsylvania\'s Mental Health Procedures Act (50 P.S. § 7302), what is required before an officer may initiate an involuntary examination (302)?',
      options: [
        'The subject must have a prior psychiatric history documented in law enforcement databases.',
        'A licensed mental health professional must be on scene to make the determination.',
        'The person must pose a clear and present danger to themselves or others based on a recent overt act, attempt, or threat — the officer must document the specific basis for the determination.',
        'Two officers must agree that the subject meets the criteria for involuntary examination.'
      ],
      correct: 2,
      feedback: 'Correct. PA MHPA Section 302 authorizes involuntary examination when a person poses a clear and present danger based on a recent overt act, attempt, or threat to themselves or others. Officers must document the specific factual basis — a general mental health crisis or past history alone does not satisfy the standard. A statement like "not wanting to be here anymore," combined with medication non-compliance and a 2-day crisis, begins to establish criteria — but the officer must assess and document carefully.'
    },
    {
      scenario: 'You make initial contact with a subject in a mental health crisis. Your authoritative tone and direct approach cause him to snap upright, begin yelling, and retreat toward his front door.',
      text: 'What does this outcome illustrate about initial contact during mental health calls?',
      options: [
        'Mental health subjects are inherently unpredictable and the outcome cannot be attributed to the officer\'s approach.',
        'Authoritative commands are always appropriate during mental health calls because officers must establish control immediately.',
        'For individuals in mental health crisis, authoritative commands and direct approaches frequently trigger escalation rather than compliance — a calm, low-key approach reduces the risk of escalation.',
        'The officer should have waited for a mental health co-responder before making any contact.'
      ],
      correct: 2,
      feedback: 'Correct. Crisis Intervention Training (CIT) research consistently shows that individuals in mental health crisis respond to authoritative commands differently than non-crisis individuals. Commands that trigger compliance in normal encounters frequently trigger fight-or-flight responses in someone in acute distress. A calm, low-key approach — slow movement, quiet voice, non-threatening positioning — significantly reduces escalation risk. PA Act 57 of 2020 requires officers to consider de-escalation whenever it is safe and feasible.'
    },
    {
      scenario: 'A subject in a mental health crisis has been escalating. He is now pacing and yelling, but has no visible weapon and has not made a specific threat. Your partner has just arrived.',
      text: 'What is the most effective de-escalation technique at this stage?',
      options: [
        'Issue clear, authoritative commands for him to stop pacing and face you — establish control before re-engaging.',
        'Reduce your own volume and energy, create space, and wait for the escalation spike to pass before re-engaging.',
        'Immediately initiate a 302 involuntary examination — the situation has exceeded the threshold for voluntary intervention.',
        'Close distance to demonstrate confidence and prevent him from moving toward the residence.'
      ],
      correct: 1,
      feedback: 'Correct. When a person in mental health crisis reaches an escalation spike — elevated voice, physical agitation, non-responsive behavior — the most effective de-escalation technique is to reduce your own energy, not match it. Back off, lower your voice, and wait. Escalation spikes are self-limiting when they aren\'t fed. Matching volume, issuing commands, or closing distance during a spike almost always prolongs or worsens it. Give the spike time to pass, then re-engage with calm contact.'
    },
    {
      scenario: 'While talking with a subject on a welfare check, he discloses that there is "something inside he could use" if things got bad enough. He is still calm and making eye contact with you.',
      text: 'What is the most appropriate response to this disclosure?',
      options: [
        'Maintain conversation — addressing the disclosure directly could break the rapport you\'ve built.',
        'Immediately back away and call for tactical support.',
        'Ask him directly and calmly what he means — "Are you telling me you have a gun inside?" — and respond based on his answer.',
        'Tell him you need to go inside and secure whatever it is before you continue the conversation.'
      ],
      correct: 2,
      feedback: 'Correct. A disclosure of potential access to a means of self-harm cannot be ignored, but it also doesn\'t require breaking the therapeutic contact you\'ve established. A calm, direct clarifying question — asked in the same quiet tone — allows you to assess the actual threat level without triggering defensiveness. If he confirms a firearm, you can work toward voluntary surrender through the rapport you\'ve built. Ignoring the disclosure or over-reacting both carry significant risk.'
    },
    {
      scenario: 'You know from the subject\'s mother that he owns a shotgun stored in his hall closet. Your partner is arriving. The subject is seated on his porch and unaware you spoke to his mother.',
      text: 'How should knowledge of the shotgun affect your approach?',
      options: [
        'It should trigger a full tactical response — the presence of a firearm makes this a SWAT-level incident.',
        'It should not affect your approach — the firearm is inside and the subject is outside.',
        'It should inform your tactical awareness and partner positioning without changing your calm, non-threatening approach posture — the goal is still de-escalation through contact.',
        'You should immediately request a 302 — access to a firearm combined with suicidal ideation satisfies the legal threshold.'
      ],
      correct: 2,
      feedback: 'Correct. Knowledge of a potential weapon changes your tactical awareness — where you position, where your partner stands, what you\'re watching for — but it does not change the fundamental approach principle for a mental health welfare check. The subject is a person in crisis, not a tactical threat. A calm, respectful approach remains the correct first contact. Your partner\'s positioning can account for the safety concern without that concern becoming visible in your demeanor or approach.'
    },
    {
      scenario: 'You arrive at a call and observe a subject sitting on a rooftop ledge, legs dangling, not responding to initial verbal contact. Witnesses say the subject has been there for 20 minutes.',
      text: 'What is the priority sequence for this CIT response?',
      options: [
        'Physical containment first, then verbal contact once the subject is in custody.',
        'Immediate forced intervention — time on the ledge creates increasing danger.',
        'Establish a safe perimeter, reduce stimulation, request CIT resources and mental health crisis team, and initiate calm, non-threatening verbal contact — one primary voice.',
        'Wait for a mental health professional to arrive before any engagement.'
      ],
      correct: 2,
      feedback: 'Correct. CIT protocol prioritizes a calm environment, single-officer verbal contact, and preservation of time and distance. Perimeter control reduces stimulation and prevents additional escalation. Requesting specialized resources early ensures they are available if needed. Immediate forced intervention in a high-ledge scenario carries extreme safety risk for both subject and officer. Waiting entirely for a clinician is not feasible — officers must initiate contact while resources respond.'
    },
    {
      scenario: 'During a mental health call, a subject begins making statements suggesting they may be experiencing command hallucinations. They are becoming increasingly agitated.',
      text: 'Which de-escalation approach is most appropriate when working with a subject experiencing possible psychosis?',
      options: [
        'Challenge the hallucinations directly — help them distinguish reality from the experience.',
        'Avoid confirming or challenging the hallucinations; focus on the person\'s emotional state and safety; use a calm, low tone; offer limited choices to restore a sense of control.',
        'Request immediate psychiatric hold authority — psychosis automatically meets § 302 criteria.',
        'Match the subject\'s emotional intensity to build rapport.'
      ],
      correct: 1,
      feedback: 'Correct. Challenging hallucinations can intensify distress and agitation. Confirming them may reinforce delusional thinking. CIT training teaches officers to work around the psychotic content by focusing on the emotional experience: "I can see this is really distressing for you." Offering limited choices ("Would you like to sit over here or stay where you are?") restores a sense of agency. Psychosis alone does not automatically meet § 302 criteria — it requires clear and present danger behavior.'
    },
    {
      scenario: 'You have been working a mental health call for 35 minutes using verbal de-escalation. The subject is calmer but still refusing all assistance. Your sergeant is asking for a status update and suggesting it may be time to "wrap it up."',
      text: 'How do you handle the supervisor\'s suggestion?',
      options: [
        'Follow the supervisor\'s direction and move toward a physical resolution.',
        'Provide an honest status update: the subject is de-escalating, the approach is working, and an abrupt change in tactics at this point may re-escalate. Recommend continuing for a defined additional period.',
        'Tell the subject you have to leave, which will prompt a decision from them.',
        'Immediately initiate a § 302 hold — the time spent justifies the involuntary commitment.'
      ],
      correct: 1,
      feedback: 'Correct. De-escalation takes time — that is not a failure. Communicate progress honestly to your supervisor: the subject is calmer, the tactic is working, and an abrupt change in approach after 35 minutes of relationship-building can re-escalate the situation significantly. Propose a defined additional time window. Good supervisors support patient de-escalation when they receive clear status communication. § 302 requires evidence of clear and present danger — time spent on a call does not create that legal standard.'
    },
  ];
}


