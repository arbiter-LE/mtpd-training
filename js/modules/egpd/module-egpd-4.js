/* ══════════════════════════════════════════
   READING — Crisis Intervention (EGPD)
══════════════════════════════════════════ */
const READING_CRISIS = `
  <div class="content-block">
    <h4>Scenario</h4>
    <h2>A welfare check near 3rd St &amp; State St: a 31-year-old man in crisis for two days, off his medication, who told his mother he "didn't want to be here anymore." How you approach the first thirty feet determines everything that follows.</h2>
    <p>This module covers Pennsylvania's Mental Health Procedures Act, Crisis Intervention Team (CIT) contact principles, and the legal boundaries of voluntary and involuntary intervention.</p>
  </div>
  <div class="content-block">
    <h4>The Legal Framework</h4>
    <h2>The 302 is a civil tool with a specific threshold — not a shortcut.</h2>
    <div class="case-law-box">
      <div class="case-title">Mental Health Procedures Act — 50 P.S. § 7302</div>
      <p>An officer may initiate an involuntary emergency examination (a "302") when a person is severely mentally disabled and in need of immediate treatment — posing a <strong>clear and present danger to themselves or others, based on a recent overt act, attempt, or threat</strong>. The officer must document the specific factual basis. A general mental health crisis, agitation, or psychiatric history alone does not satisfy the standard; psychosis alone does not satisfy it either. This is a civil process — the person is transported for psychiatric evaluation, not arrest.</p>
    </div>
    <ul class="key-points">
      <li><strong>Voluntary means voluntary — at every moment.</strong> A person who agreed to voluntary transport may withdraw consent at any point before transport. Once withdrawn, the prior agreement is void. Proceeding anyway, without 302 criteria currently met, is unlawful detention. Family pressure does not create legal authority; neither does your belief that the person needs help.</li>
      <li><strong>Coercion vitiates consent.</strong> "You have to come — transport is already waiting" implies consequences that do not exist. Transport obtained through pressure or deception is not voluntary, creates civil liability, and undermines any subsequent evaluation.</li>
      <li><strong>If criteria are met, use the tool.</strong> Re-engage, reassess against the 302 standard, and if the person presents a clear and present danger — initiate the formal process. If not: document the contact thoroughly, provide crisis resources, and coordinate family and mental-health follow-up. A well-documented welfare contact is a professional outcome.</li>
      <li><strong>Warrantless entry needs more than worry.</strong> A statement about access to a means of self-harm, without more, may not meet the exigent-circumstances threshold for entering a residence. Courts ask whether the threat was immediate and specific. Work toward consent — it is always cleaner.</li>
    </ul>
  </div>
  <div class="content-block">
    <h4>CIT Contact Principles</h4>
    <h2>A person in crisis does not process authority the way a compliant subject does.</h2>
    <p>Commands that produce compliance in routine encounters frequently trigger fight-or-flight in someone in acute distress. The approach matters more than the words. National best practice — PERF's ICAT decision-making model and the CIT (Memphis Model) framework adopted nationwide — directs officers to use de-escalation whenever it is safe and feasible. So does this department's expectation, reflected in General Order 1.3's emphasis on obtaining control rather than forcing submission.</p>
    <ul class="key-points">
      <li><strong>Slow, low, and level.</strong> Approach at a non-threatening angle, slow your movement, quiet your voice, get on the person's level when safe. "Your mom asked me to come check on you. Mind if I sit with you for a minute?" opens doors that commands close.</li>
      <li><strong>Ride out the spike.</strong> When an escalation spike hits — pacing, yelling, agitation — reduce your own energy, create space, and wait. Spikes are self-limiting when they aren't fed. More commands or closing distance during a spike prolongs it.</li>
      <li><strong>Address disclosures directly and calmly.</strong> If the person mentions "something inside he could use," you cannot ignore it — and you don't have to break rapport to address it. A calm clarifying question ("Are you telling me you have a gun inside?") assesses the threat without triggering defensiveness, and opens the path to voluntary surrender of the weapon.</li>
      <li><strong>Weapon knowledge changes positioning, not posture.</strong> Knowing a firearm is in the house informs where you stand, where your partner stands, and what you watch. It does not convert a welfare check into a tactical operation — a distressed person on his porch is not a SWAT call.</li>
      <li><strong>Don't confirm or challenge psychotic content.</strong> Work around hallucinations by addressing the emotional state: "I can see this is really distressing for you." Offer limited choices to restore a sense of agency. Challenging delusions intensifies distress; confirming them reinforces it.</li>
      <li><strong>One voice, defined roles.</strong> One officer leads contact; others hold safety positions without appearing tactical. On high-risk geometry (a ledge, a rooftop), establish a perimeter, reduce stimulation, request CIT and mobile crisis resources early, and initiate calm contact while they respond.</li>
    </ul>
  </div>
  <div class="content-block">
    <h4>Time Is a Tactic</h4>
    <h2>De-escalation that is working is never a delay.</h2>
    <p>Thirty-five minutes of verbal contact that is producing calm is the approach succeeding, not failing. When a supervisor asks for status, give an honest progress report — the subject is de-escalating, an abrupt tactical change risks re-escalation, recommend a defined additional window. Good supervisors support patient de-escalation when they get clear communication. And time spent on a call never substitutes for the 302's legal standard: clear and present danger is established by the person's conduct, not by your investment in the encounter.</p>
    <button class="btn-launch" onclick="startScenario('egpd-crisis-intervention')">Proceed to Scenario Exercise →</button>
  </div>
`;

/* ══════════════════════════════════════════
   SCENARIO — Crisis Intervention (EGPD)
══════════════════════════════════════════ */
const SCENARIO_CRISIS = {
  id: 'scenario-crisis',
  title: '3rd St & State St — Welfare Check',
  location: '3rd St & State St, East Greenville Borough, PA',
  totalDecisions: 3,
  nodes: {
    'start': {
      type: 'scene', time: '14:22', weather: 'Overcast / 61°F', unit: 'Patrol Unit 4',
      narrative: [
        'You are dispatched to a welfare check at a residential address near 3rd St & State St. The caller is the subject\'s mother. She reports that her 31-year-old son has been in a mental health crisis for approximately two days, has not taken his prescribed medication, and made a statement this morning about "not wanting to be here anymore."',
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
      legal: 'Pennsylvania\'s Mental Health Procedures Act (MHPA, 50 P.S. § 7302) authorizes involuntary examination when a person poses a clear and present danger to themselves or others. But getting to that point safely requires de-escalation, not escalation. National best practice — PERF\'s ICAT model and CIT protocols — directs officers to use de-escalation whenever it is safe and feasible.',
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
      legal: 'De-escalation is not just a technique — under nationally recognized standards (PERF ICAT, CIT) and the department\'s expectations, officers should employ de-escalation whenever it is safe and feasible. Documented de-escalation efforts protect the officer and the department.',
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
        'The family member\'s pressure does not create legal authority. Your belief that he needs help does not create legal authority. What creates legal authority is meeting the criteria under 50 P.S. § 7302 (MHPA § 302): clear and present danger to self or others based on observed behavior.',
        'If he no longer meets those criteria, you document and disengage. If he does still meet them, initiate an involuntary commitment — do not manufacture a different basis.'
      ],
      legal: '50 P.S. § 7302 (MHPA § 302) authorizes involuntary emergency examination when an officer observes conduct constituting clear and present danger to self or others. Voluntary transport requires ongoing voluntary consent. Withdrawal of consent without § 302 authority present means the transport cannot proceed.',
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

function getCrisisQuestions() {
  return [
    {
      scenario: 'You respond to a welfare check. A neighbor reports a 31-year-old male has been in a mental health crisis for two days, has not taken his medication, and said "he didn\'t want to be here anymore." He is seated on his front porch when you arrive.',
      text: 'Under Pennsylvania\'s Mental Health Procedures Act (50 P.S. § 7302), what is required before an officer may initiate an involuntary examination (302)?',
      options: [
        'A licensed mental health professional must be physically on scene to make the clear-and-present-danger determination before the officer may act.',
        'The subject must have a prior psychiatric history documented in a law enforcement or hospital database.',
        'Two officers must independently agree that the subject meets the criteria for involuntary examination.',
        'The person must pose a clear and present danger to self or others based on a recent overt act, attempt, or threat, and the officer must document the specific factual basis for that determination.'
      ],
      correct: 3,
      feedback: 'Correct. PA MHPA Section 302 authorizes involuntary examination when a person poses a clear and present danger based on a recent overt act, attempt, or threat to themselves or others. Officers must document the specific factual basis — a general mental health crisis or past history alone does not satisfy the standard. A statement like "not wanting to be here anymore," combined with medication non-compliance and a 2-day crisis, begins to establish criteria — but the officer must assess and document carefully.'
    },
    {
      scenario: 'You make initial contact with a subject in a mental health crisis. Your authoritative tone and direct approach cause him to snap upright, begin yelling, and retreat toward his front door.',
      text: 'What does this outcome illustrate about initial contact during mental health calls?',
      options: [
        'For a person in mental health crisis, authoritative commands and a direct approach frequently trigger escalation rather than compliance; a calm, low-key approach reduces that risk.',
        'Mental health subjects are inherently unpredictable, so the outcome cannot be attributed to the officer\'s approach at all.',
        'Authoritative commands are always appropriate during mental health calls, because officers must establish control immediately.',
        'The officer should never have made contact without a mental health co-responder physically present.'
      ],
      correct: 0,
      feedback: 'Correct. Crisis Intervention Training (CIT) research consistently shows that individuals in mental health crisis respond to authoritative commands differently than non-crisis individuals. Commands that trigger compliance in normal encounters frequently trigger fight-or-flight responses in someone in acute distress. A calm, low-key approach — slow movement, quiet voice, non-threatening positioning — significantly reduces escalation risk. National best practice — PERF\'s ICAT model and CIT protocols — directs officers to use de-escalation whenever it is safe and feasible.'
    },
    {
      scenario: 'A subject in a mental health crisis has been escalating. He is now pacing and yelling, but has no visible weapon and has not made a specific threat. Your partner has just arrived.',
      text: 'What is the most effective de-escalation technique at this stage?',
      options: [
        'Issue clear, authoritative commands for him to stop pacing and face you, establishing control before you re-engage.',
        'Immediately initiate a 302 involuntary examination — the situation has now exceeded the threshold for voluntary intervention.',
        'Close the distance to project confidence and prevent him from moving toward the residence.',
        'Reduce your own volume and energy, create space, and let the escalation spike pass before you re-engage.'
      ],
      correct: 3,
      feedback: 'Correct. When a person in mental health crisis reaches an escalation spike — elevated voice, physical agitation, non-responsive behavior — the most effective de-escalation technique is to reduce your own energy, not match it. Back off, lower your voice, and wait. Escalation spikes are self-limiting when they aren\'t fed. Matching volume, issuing commands, or closing distance during a spike almost always prolongs or worsens it. Give the spike time to pass, then re-engage with calm contact.'
    },
    {
      scenario: 'While talking with a subject on a welfare check, he discloses that there is "something inside he could use" if things got bad enough. He is still calm and making eye contact with you.',
      text: 'What is the most appropriate response to this disclosure?',
      options: [
        'Maintain the conversation as-is — addressing the disclosure directly could break the rapport you have built.',
        'Ask him directly and calmly what he means — "Are you telling me you have a gun inside?" — and respond based on his answer.',
        'Immediately back away from the porch and call for tactical support before saying anything more.',
        'Tell him you need to go inside and secure whatever it is before the conversation continues.'
      ],
      correct: 1,
      feedback: 'Correct. A disclosure of potential access to a means of self-harm cannot be ignored, but it also doesn\'t require breaking the therapeutic contact you\'ve established. A calm, direct clarifying question — asked in the same quiet tone — allows you to assess the actual threat level without triggering defensiveness. If he confirms a firearm, you can work toward voluntary surrender through the rapport you\'ve built. Ignoring the disclosure or over-reacting both carry significant risk.'
    },
    {
      scenario: 'You know from the subject\'s mother that he owns a shotgun stored in his hall closet. Your partner is arriving. The subject is seated on his porch and unaware you spoke to his mother.',
      text: 'How should knowledge of the shotgun affect your approach?',
      options: [
        'It should sharpen your tactical awareness and partner positioning without changing your calm, non-threatening approach — the goal is still de-escalation through contact.',
        'It should not affect your approach at all — the firearm is inside the residence and the subject is outside.',
        'It should trigger a full tactical response, since the presence of a firearm makes this a SWAT-level incident.',
        'It should prompt an immediate 302 — access to a firearm combined with suicidal ideation satisfies the legal threshold.'
      ],
      correct: 0,
      feedback: 'Correct. Knowledge of a potential weapon changes your tactical awareness — where you position, where your partner stands, what you\'re watching for — but it does not change the fundamental approach principle for a mental health welfare check. The subject is a person in crisis, not a tactical threat. A calm, respectful approach remains the correct first contact. Your partner\'s positioning can account for the safety concern without that concern becoming visible in your demeanor or approach.'
    },
    {
      scenario: 'You arrive at a call and observe a subject sitting on a rooftop ledge, legs dangling, not responding to initial verbal contact. Witnesses say the subject has been there for 20 minutes.',
      text: 'What is the priority sequence for this CIT response?',
      options: [
        'Physical containment first, then verbal contact once the subject is in custody.',
        'Immediate forced intervention — time on the ledge only creates increasing danger.',
        'Wait for a mental health professional to arrive before attempting any engagement at all.',
        'Establish a safe perimeter, reduce stimulation, request CIT and the mobile crisis team, and begin calm, non-threatening verbal contact through one primary voice.'
      ],
      correct: 3,
      feedback: 'Correct. CIT protocol prioritizes a calm environment, single-officer verbal contact, and preservation of time and distance. Perimeter control reduces stimulation and prevents additional escalation. Requesting specialized resources early ensures they are available if needed. Immediate forced intervention in a high-ledge scenario carries extreme safety risk for both subject and officer. Waiting entirely for a clinician is not feasible — officers must initiate contact while resources respond.'
    },
    {
      scenario: 'During a mental health call, a subject begins making statements suggesting they may be experiencing command hallucinations. They are becoming increasingly agitated.',
      text: 'Which de-escalation approach is most appropriate when working with a subject experiencing possible psychosis?',
      options: [
        'Challenge the hallucinations directly to help the subject distinguish reality from the experience.',
        'Request immediate psychiatric hold authority, since active psychosis automatically meets § 302 criteria.',
        'Avoid confirming or challenging the hallucinations; focus on the person\'s emotional state and safety, use a calm low tone, and offer limited choices to restore a sense of control.',
        'Match the subject\'s emotional intensity for a few minutes to build rapport before redirecting.'
      ],
      correct: 2,
      feedback: 'Correct. Challenging hallucinations can intensify distress and agitation. Confirming them may reinforce delusional thinking. CIT training teaches officers to work around the psychotic content by focusing on the emotional experience: "I can see this is really distressing for you." Offering limited choices ("Would you like to sit over here or stay where you are?") restores a sense of agency. Psychosis alone does not automatically meet § 302 criteria — it requires clear and present danger behavior.'
    },
    {
      scenario: 'You have been working a mental health call for 35 minutes using verbal de-escalation. The subject is calmer but still refusing all assistance. Your sergeant is asking for a status update and suggesting it may be time to "wrap it up."',
      text: 'How do you handle the supervisor\'s suggestion?',
      options: [
        'Give an honest status update — the subject is de-escalating and the approach is working, and an abrupt change in tactics now may re-escalate — and recommend continuing for a defined additional period.',
        'Follow the supervisor\'s direction and begin moving toward a physical resolution.',
        'Tell the subject you have to leave, which will force a decision from them.',
        'Immediately initiate a § 302 hold — the time already spent justifies an involuntary commitment.'
      ],
      correct: 0,
      feedback: 'Correct. De-escalation takes time — that is not a failure. Communicate progress honestly to your supervisor: the subject is calmer, the tactic is working, and an abrupt change in approach after 35 minutes of relationship-building can re-escalate the situation significantly. Propose a defined additional time window. Good supervisors support patient de-escalation when they receive clear status communication. § 302 requires evidence of clear and present danger — time spent on a call does not create that legal standard.'
    },
  ];
}

/* ══════════════════════════════════════════
   SUPERVISOR OVERLAY — Crisis Intervention (EGPD)
   The supervisor's role: resource and protect de-escalation,
   review the 302 against its legal standard, catch consent traps.
══════════════════════════════════════════ */
const SUPERVISOR_CRISIS = `
  <div class="content-block">
    <h4>Supervisor Focus</h4>
    <h2>When de-escalation is working, your job is to protect the clock — not run it out.</h2>
    <p>On a crisis call you are often not the contact officer. You are the voice on the radio asking for status, or the supervisor on the perimeter deciding what to commit. Both roles carry the same trap: the pull to "wrap it up." A subject who is calmer after 35 minutes is the approach succeeding, and an abrupt tactical change risks re-escalation. When your officer gives you an honest progress report — subject de-escalating, recommend a defined additional window — supporting that is the supervisory decision that keeps everyone safe. Time spent never substitutes for the 302's legal standard, but your impatience never justifies ending an approach that is working.</p>
  </div>
  <div class="content-block">
    <h4>You Own the Environment Around the Contact</h4>
    <h2>The contact officer manages the person. You manage the scene.</h2>
    <p>While your officer works the conversation, you work the conditions: establish a perimeter, reduce stimulation — lights, sirens, the number of officers visible — keep one primary voice with defined roles, and request CIT and mobile-crisis resources early, before they are needed rather than after. On high-risk geometry such as a ledge or a rooftop, that resourcing decision is yours to make and to document. And calibrate the response to the threat actually presented, not the one you fear: a distressed person legally owning a firearm and seated on his porch is not a SWAT call. Escalating the response to match a weapon you merely know about manufactures the crisis you were called to prevent — and exposes the department.</p>
  </div>
  <div class="content-block">
    <h4>Read Every 302 for the Standard, Not the Worry</h4>
    <h2>The question on review is the one the court will ask.</h2>
    <p>When a 302 reaches you, test it against 50 P.S. § 7302: does the documentation show a clear and present danger to self or others based on a recent overt act, attempt, or threat? Agitation, psychiatric history, medication non-compliance, and psychosis alone do not satisfy the standard — the report must state the specific conduct. A 302 written to "resolve the situation" rather than because the criteria were met is a civil-liberty problem and a liability, and catching it before it becomes the department's is your job. If the criteria are genuinely met, the tool is appropriate and the report should show why; if they are not, the answer is a documented welfare contact, not a manufactured commitment.</p>
  </div>
  <div class="content-block">
    <h4>The Consent Traps Only a Reviewer Reliably Catches</h4>
    <ul class="key-points">
      <li><strong>Withdrawn consent.</strong> Voluntary transport requires ongoing consent. If the report shows the subject agreed and then changed their mind, the prior agreement is void — proceeding without current 302 criteria is unlawful detention. Read for the moment consent was withdrawn and what happened next.</li>
      <li><strong>Coerced consent.</strong> "Transport is already waiting" and "you have to come" imply consequences that do not exist. Transport obtained by pressure or deception is not voluntary and creates civil liability — flag the language wherever it appears.</li>
      <li><strong>Warrantless entry.</strong> A statement about access to a means of self-harm, without more, may not meet the exigency threshold for entering a residence. Confirm the report establishes an immediate, specific threat or consent — not just concern.</li>
      <li><strong>Family pressure.</strong> A family member's urging does not create legal authority. Make sure neither your officer's report nor your own on-scene decision rests on it.</li>
    </ul>
  </div>
  <div class="content-block">
    <h4>Reward the De-escalation You Want Repeated</h4>
    <p>General Order 1.3 emphasizes obtaining control rather than forcing submission, and de-escalation is the department's expectation whenever it is safe and feasible. On review, confirm the report documents the de-escalation effort — the approach, the time taken, the resources requested, the choices offered — because that record protects the officer and the department. And recognize the outcome for what it is: a well-documented welfare contact that ended without a transport, with crisis resources provided and family coordinated, is a professional success, not a non-event. What you acknowledge in review is what your officers will reach for on the next call.</p>
  </div>
  <div class="content-block">
    <h4>After the Call — the Part That Isn't in the Statute</h4>
    <p>Crisis calls take a toll, and a suicidal-subject contact — especially one that ends badly — is exactly the kind of incident a supervisor should flag for peer support and a personal check-in, not just a report review. Closing the loop runs two directions: on the person (mobile crisis or community follow-up offered and documented) and on the officer (a conversation, not a form). None of that appears in 50 P.S. § 7302, but it shows up in whether your people are still standing a year from now.</p>
  </div>
`;

function getCrisisSupervisorQuestions() {
  return [
    {
      scenario: 'An officer is 35 minutes into a mental health call using verbal de-escalation. The subject is noticeably calmer but still refusing assistance. The officer reports the approach is working and recommends a defined additional window. You feel pressure to clear the call.',
      text: 'What is the correct supervisory response?',
      options: [
        'Direct the officer to move to a physical resolution to clear the call.',
        'Order an immediate 302, since the call has already taken too long.',
        'Support a defined additional window: a subject who is de-escalating reflects the approach succeeding, and an abrupt tactical change after relationship-building risks re-escalation. Time on the call is a tactic when it is working.',
        'Pull the officer off and replace them with a fresh unit to restart the contact.'
      ],
      correct: 2,
      feedback: 'Correct. De-escalation that is producing calm is the approach working, not failing. When the contact officer gives an honest progress report, supporting a defined additional window is the supervisory decision that protects everyone. Time spent never creates the 302 legal standard, but it should not be cut short when it is working.'
    },
    {
      scenario: 'A subject in a mental health crisis legally owns a firearm kept inside his home. He is seated on his porch, distressed but not threatening anyone, and engaging with your contact officer. You are making the resourcing decision.',
      text: 'How should you calibrate the response?',
      options: [
        'Request a SWAT/tactical team — the presence of a firearm makes this a tactical incident.',
        'Order officers to make immediate entry to secure the firearm before continuing.',
        'Clear all units and disengage entirely, since a firearm is present in the home.',
        'Calibrate to the threat actually presented: establish a perimeter, reduce stimulation, and request CIT and mobile-crisis resources while the contact officer maintains a calm approach. A distressed person on his porch is not a SWAT call.'
      ],
      correct: 3,
      feedback: 'Correct. Knowledge of a legally owned firearm informs positioning and awareness — it does not convert a welfare check into a tactical operation. Escalating the response to match a weapon you merely know about, rather than a threat actually presented, manufactures the crisis and exposes the department. Perimeter, reduced stimulation, and CIT/mobile-crisis resources are the right calls.'
    },
    {
      scenario: 'A 302 from one of your officers documents that the subject was agitated, had a psychiatric history, and had stopped taking medication. It does not describe any recent overt act, attempt, or threat to self or others.',
      text: 'How should you handle this 302 on review?',
      options: [
        'Flag it — under 50 P.S. § 7302 a 302 requires a clear and present danger based on a recent overt act, attempt, or threat. History, agitation, and medication non-compliance alone do not meet the standard; the report must state the specific dangerous conduct or it does not support an involuntary commitment.',
        'Approve it — agitation plus a psychiatric history and medication non-compliance satisfies the 302 standard.',
        'Approve it, since the officer was clearly acting out of concern for the subject\'s welfare.',
        'Forward it to the magistrate without review, since 302 determinations are medical, not supervisory.'
      ],
      correct: 0,
      feedback: 'Correct. 50 P.S. § 7302 requires clear and present danger based on a recent overt act, attempt, or threat. Agitation, history, and medication non-compliance do not by themselves satisfy that standard. A 302 lacking the specific dangerous conduct is a civil-liberty and liability problem the reviewer must catch.'
    },
    {
      scenario: 'A report shows the subject initially agreed to voluntary transport for evaluation, then changed his mind in the parking lot and said he was not going. He was calm and coherent and not under any commitment order. The officer placed him in the vehicle and transported him anyway, without assessing 302 criteria.',
      text: 'What is your finding?',
      options: [
        'No issue — the subject\'s earlier agreement to go was binding consent.',
        'No issue — the officer\'s good-faith belief that the subject needed help supplied the authority.',
        'This is unlawful detention: voluntary consent can be withdrawn at any time before transport, the prior agreement is void once withdrawn, and absent current 302 criteria there was no authority to transport.',
        'The transport was lawful because a family member urged the officer to take him.'
      ],
      correct: 2,
      feedback: 'Correct. Voluntary means voluntary at every moment. Once consent is withdrawn the prior agreement is void, and transporting without current 50 P.S. § 7302 criteria is unlawful detention. Neither the officer\'s belief nor family pressure creates legal authority.'
    },
    {
      scenario: 'On review, a report\'s basis for transport reads: "Advised subject that transport was already en route and that he had to come with us." The subject then complied.',
      text: 'How should you treat this on review?',
      options: [
        'Accept it — the subject ultimately agreed, so consent was given.',
        'Flag it as coercion: implying the subject had no choice when he legally did is pressure, not consent. Coerced transport is not voluntary, creates civil liability, and undermines the evaluation.',
        'Accept it because logistics had already been arranged.',
        'Treat it as a 302, since the subject was transported.'
      ],
      correct: 1,
      feedback: 'Correct. Coercion vitiates consent. "Transport is already waiting / you have to come" implies consequences that do not exist. Transport obtained through pressure or deception is not voluntary and exposes the department — a flag the reviewer raises before the report closes.'
    },
    {
      scenario: 'A report documents that the officer entered the subject\'s residence based solely on the subject\'s earlier statement that there was "something inside he could use." There is no documented consent and no description of an immediate, specific threat at the time of entry.',
      text: 'What should your review of the entry conclude?',
      options: [
        'The entry was clearly justified — any mention of a means of self-harm authorizes entry.',
        'The entry was lawful because the officer was conducting a welfare check at the time.',
        'Entry into a residence never requires separate justification during a mental health call.',
        'The entry is questionable: a statement about access to a means of self-harm, without more, may not meet the exigency threshold for a warrantless entry. The report needs an immediate, specific threat or documented consent — flag the gap.'
      ],
      correct: 3,
      feedback: 'Correct. PA courts evaluate whether the threat was immediate and specific. A general statement about a means of self-harm, without more, may not satisfy exigent circumstances for a warrantless entry. The reviewer flags the entry where the report does not establish immediacy or consent.'
    },
    {
      scenario: 'An officer\'s welfare-check report ends with no transport: the subject did not meet 302 criteria, but the report documents the de-escalation approach used, the time taken, crisis resources provided, and coordination with the family for follow-up.',
      text: 'How should you assess this outcome on review?',
      options: [
        'Recognize it as a professional success: a well-documented welfare contact with de-escalation, resources, and family coordination is a sound outcome — and acknowledging it reinforces the practice you want repeated on the next call.',
        'Mark it deficient, because no enforcement action or transport resulted from the call.',
        'Require the officer to file a 302 retroactively to justify the time spent on scene.',
        'Take no notice — outcomes without arrests do not warrant supervisory attention.'
      ],
      correct: 0,
      feedback: 'Correct. A documented welfare contact that ends without a transport, with resources provided and family coordinated, is a professional outcome. Documented de-escalation protects the officer and the department, and recognizing it in review reinforces the behavior you want your officers to repeat.'
    },
    {
      scenario: 'One of your officers has just handled a difficult call involving a suicidal subject. The report is complete and accurate.',
      text: 'Beyond reviewing the report, what is part of your supervisory responsibility?',
      options: [
        'Nothing further — once the report is accurate, the supervisor\'s role is finished.',
        'Close the loop on the officer\'s well-being: flag the incident for peer support and conduct a personal check-in, recognizing that suicidal-subject calls take a toll that a completed report does not capture.',
        'Order the officer back into service immediately to demonstrate resilience.',
        'Document that the officer showed no visible distress and move on.'
      ],
      correct: 1,
      feedback: 'Correct. Crisis calls, especially suicidal-subject contacts, take a toll. A supervisor\'s job includes flagging the incident for peer support and a genuine check-in — a conversation, not just a form. That follow-through is part of keeping officers healthy over the long run, even though it appears nowhere in the statute.'
    },
  ];
}

/* ══════════════════════════════════════════
   SUPERVISOR SCENARIO — Crisis Intervention (EGPD)
   Field-supervising Officer Cole's 3rd & State welfare check,
   then reviewing the 302.
══════════════════════════════════════════ */
const SCENARIO_CRISIS_SUP = {
  id: 'scenario-crisis-sup',
  title: 'Supervisor — 3rd & State Welfare Check',
  location: '3rd St & State St, East Greenville Borough, PA',
  totalDecisions: 3,
  nodes: {
    'start': {
      type: 'scene', time: '14:55', weather: 'Overcast / 61°F', unit: 'Field Supervisor',
      narrative: [
        'You are the field supervisor monitoring Officer Cole\'s welfare check near 3rd St & State St — a man in crisis, off his medication, who told his mother he "didn\'t want to be here anymore." Cole is the contact officer; you have the radio and the whole board.',
        'On a crisis call your job is to resource and protect the de-escalation while it works, and to review the paperwork that follows. The contact officer manages the person; you manage the scene.'
      ],
      next: 'd1'
    },
    'd1': {
      type: 'decision', decisionNumber: 1,
      situation: 'Thirty-five minutes in, Cole radios that the subject is noticeably calmer but still refusing assistance, and recommends a defined additional window. You have another call holding and feel the pull to clear this one.',
      question: 'How do you respond?',
      options: [
        { text: 'Support a defined additional window — a subject who is de-escalating reflects the approach working, and an abrupt change risks re-escalation.', next: 'c1a', quality: 'good', shortLabel: 'Supported a defined window' },
        { text: 'Direct Cole to move to a physical resolution to clear the call.', next: 'c1b', quality: 'bad', shortLabel: 'Ordered a physical resolution' },
        { text: 'Order an immediate 302 because the call has taken too long.', next: 'c1c', quality: 'bad', shortLabel: 'Ordered a 302 to end the call' },
        { text: 'Pull Cole off and send a fresh unit to restart the contact.', next: 'c1d', quality: 'bad', shortLabel: 'Replaced the contact officer mid-call' },
      ]
    },
    'c1a': {
      type: 'consequence', outcomeClass: 'outcome-good', outcomeLabel: 'Protected the Clock',
      heading: 'De-escalation that is working is not a delay — and supporting it is your call.',
      narrative: [
        'You grant a defined additional window and route the holding call to another unit. A subject who is calmer after thirty-five minutes is the approach succeeding, and an abrupt tactical change to save time is what re-escalates these encounters.',
        'When the contact officer gives an honest progress report, backing it is the supervisory decision that keeps everyone safe.'
      ],
      legal: 'PA Mental Health Procedures Act (50 P.S. § 7302) and CIT/ICAT practice: de-escalation is the tactically superior option when time and safety permit; time spent does not by itself create the 302 standard, and it should not be cut short when it is working.',
      next: 'd2'
    },
    'c1b': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'You Re-escalated It',
      heading: 'Forcing a resolution on a subject who was de-escalating is how these go wrong.',
      narrative: [
        'Ordering a physical resolution because the call is taking time throws away the one thing that was working. A person in crisis who has been calming for thirty-five minutes can decompensate instantly when the approach abruptly changes, and now your officers are forcing contact on someone who was nearly there voluntarily.',
        'Impatience is not a tactical assessment. The right call was to protect the window.'
      ],
      legal: '50 P.S. § 7302: a 302 requires clear and present danger, not a desire to clear the call. CIT practice: forced contact on a decompensating subject is predictably dangerous to everyone.',
      next: 'd2'
    },
    'c1c': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Time Doesn\'t Make a 302',
      heading: 'A 302 needs clear and present danger — not a long call.',
      narrative: [
        'Ordering an involuntary commitment to end a call substitutes the clock for the legal standard. Under 50 P.S. § 7302 a 302 requires a clear and present danger based on a recent overt act, attempt, or threat — the duration of the contact is not evidence of that.',
        'If the criteria are genuinely met, the tool is appropriate; if they are not, the answer is more time or a documented welfare contact, not a manufactured commitment.'
      ],
      legal: '50 P.S. § 7302: clear and present danger based on a recent overt act, attempt, or threat. Time on the call does not satisfy the standard.',
      next: 'd2'
    },
    'c1d': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Threw Away the Rapport',
      heading: 'Swapping the contact officer mid-call resets everything that was working.',
      narrative: [
        'Cole has spent thirty-five minutes building a fragile rapport. Pulling him and inserting a fresh officer forces the subject to start over with a stranger, which on a crisis call usually means re-escalation, not a clean handoff.',
        'Support the officer who has the connection. Resource him; don\'t replace him.'
      ],
      legal: 'CIT practice: continuity of a single primary voice is central to de-escalation. Disrupting an effective contact for a fresh unit risks re-escalation.',
      next: 'd2'
    },
    'd2': {
      type: 'decision', decisionNumber: 2,
      situation: 'New information: the subject legally owns a firearm kept inside the house. He is seated on his porch, distressed but not threatening anyone, still engaging with Cole. One responding unit suggests calling out SWAT.',
      question: 'How do you resource the scene?',
      options: [
        { text: 'Request a SWAT/tactical team — a firearm in the house makes this a tactical incident.', next: 'c2a', quality: 'bad', shortLabel: 'Escalated to SWAT' },
        { text: 'Calibrate to the threat actually presented — perimeter, reduce stimulation, request CIT and mobile crisis, keep Cole on calm contact.', next: 'c2b', quality: 'good', shortLabel: 'Calibrated: perimeter + CIT, not SWAT' },
        { text: 'Order officers to make immediate entry to secure the firearm.', next: 'c2c', quality: 'bad', shortLabel: 'Ordered entry to secure the gun' },
        { text: 'Clear all units and disengage entirely, since a firearm is present.', next: 'c2d', quality: 'bad', shortLabel: 'Disengaged because a gun was present' },
      ]
    },
    'c2a': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Manufactured the Crisis',
      heading: 'A distressed man on his porch is not a SWAT call.',
      narrative: [
        'Escalating the response to match a weapon you merely know about, rather than a threat actually presented, manufactures the very crisis you were called to prevent — and exposes the department. A legally owned firearm inside the house informs positioning and awareness; it does not convert a welfare check into a tactical operation.',
        'The right resourcing is a perimeter, reduced stimulation, and CIT or mobile crisis — not a tactical team.'
      ],
      legal: 'Graham v. Connor and CIT practice: the response is calibrated to the threat presented. Knowledge of a firearm changes positioning, not the nature of the call.',
      next: 'd3'
    },
    'c2b': {
      type: 'consequence', outcomeClass: 'outcome-good', outcomeLabel: 'Calibrated to the Threat',
      heading: 'You managed the environment without inflating the response.',
      narrative: [
        'You establish a perimeter, reduce stimulation, request CIT and mobile crisis, and keep Cole on calm contact. The firearm informs where your people stand and what they watch — it does not change the basic principle that a calm, respectful approach is the correct first contact on a mental-health call.',
        'On high-risk geometry that resourcing decision is yours to make and document. You made the proportionate one.'
      ],
      legal: 'CIT practice: perimeter, reduced stimulation, and early specialized resources are the right response to a contained crisis; the calm approach continues while they respond.',
      next: 'd3'
    },
    'c2c': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Entry Without a Basis',
      heading: 'Forcing entry to grab the gun blows up a contact that was working.',
      narrative: [
        'Ordering entry to secure a firearm the subject has not threatened anyone with abandons the de-escalation and likely triggers the exact crisis you were preventing — and a warrantless entry on these facts is legally shaky besides. The subject is engaging on his porch; the firearm is a positioning concern, not a reason to breach.',
        'Contain, resource, and keep the conversation going.'
      ],
      legal: '50 P.S. § 7302 and Fourth Amendment exigency: a statement about a means of self-harm, without more, may not meet the threshold for warrantless entry. Work toward consent and de-escalation.',
      next: 'd3'
    },
    'c2d': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Abandonment Isn\'t an Option',
      heading: 'Disengaging from a suicidal subject because a gun is in the house leaves him alone in crisis.',
      narrative: [
        'Clearing all units because a firearm is present abandons a person who is a clear welfare concern and was actively engaging with your officer. The presence of a legally owned firearm calls for careful positioning and resources, not withdrawal.',
        'Stay, contain, and bring CIT and mobile crisis to the scene.'
      ],
      legal: 'CIT practice and duty of care: a contained, engaging crisis subject is managed with resources and positioning, not by disengaging because a weapon is in the home.',
      next: 'd3'
    },
    'd3': {
      type: 'decision', decisionNumber: 3,
      situation: 'The call resolved with a voluntary evaluation. Now Cole\'s paperwork is in front of you. His 302 petition documents agitation, a psychiatric history, and medication non-compliance — but no recent overt act, attempt, or threat. A separate line notes he told the subject "transport is already waiting" to get him to agree.',
      question: 'How do you handle the review?',
      options: [
        { text: 'Approve the 302 — agitation, history, and non-compliance are enough.', next: 'c3a', quality: 'bad', shortLabel: 'Approved a 302 without the standard' },
        { text: 'Flag both issues — the 302 lacks the clear-and-present-danger conduct § 7302 requires, and "transport is already waiting" is coercion, not voluntary consent.', next: 'c3b', quality: 'good', shortLabel: 'Flagged the 302 standard and the coercion' },
        { text: 'Approve it because Cole was genuinely concerned for the subject\'s welfare.', next: 'c3c', quality: 'bad', shortLabel: 'Approved on the officer\'s good intentions' },
      ]
    },
    'c3a': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'That\'s Not the Standard',
      heading: 'History and agitation alone don\'t meet § 7302.',
      narrative: [
        'Approving this 302 signs off on an involuntary commitment that does not meet its legal threshold. Under 50 P.S. § 7302 a 302 requires a clear and present danger based on a recent overt act, attempt, or threat — agitation, a psychiatric history, and medication non-compliance are not that, and a 302 written without the conduct is a civil-liberty problem and a liability.',
        'It is your job to catch this before it becomes the department\'s.'
      ],
      legal: '50 P.S. § 7302: clear and present danger based on a recent overt act, attempt, or threat; history and non-compliance alone do not satisfy it.',
      next: 'debrief'
    },
    'c3b': {
      type: 'consequence', outcomeClass: 'outcome-good', outcomeLabel: 'Caught Both Traps',
      heading: 'You read the 302 for the standard, and the consent for coercion.',
      narrative: [
        'You flag that the 302 documentation lacks the specific dangerous conduct § 7302 requires, and that "transport is already waiting" implies a consequence that did not exist — coercion, not voluntary consent. Transport obtained by pressure is not voluntary and exposes the department; an involuntary commitment without the clear-and-present-danger conduct does not hold.',
        'These are exactly the traps a reviewer reliably catches and a single officer in the moment may not.'
      ],
      legal: '50 P.S. § 7302: a 302 requires clear and present danger. Coerced transport — implying the subject has no choice when he legally does — is not voluntary consent.',
      next: 'debrief'
    },
    'c3c': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Good Intentions Aren\'t the Test',
      heading: 'Concern for welfare is not the legal standard for an involuntary commitment.',
      narrative: [
        'Cole\'s concern was genuine, and that is not what § 7302 measures. The standard is a clear and present danger based on the subject\'s conduct — and approving a 302 because the officer meant well lets sympathy substitute for the legal threshold the document requires.',
        'If the criteria are met, document the conduct; if they are not, a documented welfare contact is the right outcome.'
      ],
      legal: '50 P.S. § 7302: the test is the subject\'s dangerous conduct, not the officer\'s concern. Sympathy does not satisfy the standard.',
      next: 'debrief'
    },
    'debrief': { type: 'debrief' }
  }
};
