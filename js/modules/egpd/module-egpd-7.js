/* ══════════════════════════════════════════
   READING — Leadership & Supervision (EGPD)
══════════════════════════════════════════ */
const READING_LEADERSHIP = `
  <div class="content-block">
    <h4>Scenario</h4>
    <h2>You're the senior officer. Your junior partner wants to run six teenagers in a hotel parking lot near Main St &amp; 2nd St "to see what pops." What you do in the next two minutes is a legal decision, a supervisory decision, and a lesson your partner will carry to every call you're not on.</h2>
    <p>This module covers the legal foundations a field leader enforces, the craft of correcting and developing junior officers, and the integrity decisions that define supervisory readiness before any rank is awarded.</p>
  </div>
  <div class="content-block">
    <h4>The Legal Floor a Leader Holds</h4>
    <h2>Leadership in the field starts with knowing what the law actually permits.</h2>
    <div class="case-law-box">
      <div class="case-title">Terry v. Ohio, 392 U.S. 1 (1968)</div>
      <p>An investigative stop requires <strong>individualized</strong> reasonable articulable suspicion of criminal activity. Group presence — even in response to a complaint — does not supply the basis for stopping any individual in the group. Running subjects without that foundation creates Fourth Amendment violations and civil exposure, and a senior officer who allows it trains the next violation.</p>
    </div>
    <div class="case-law-box">
      <div class="case-title">18 Pa. C.S. § 3503 — Criminal Trespass (Defiant Trespasser)</div>
      <p>Lawful trespass enforcement requires notice: the property posted with conspicuous signage, fenced in a manner designed to exclude intruders, or the subject having received direct prior communication that entry is not permitted. A property owner's call to police — even repeated calls — does not substitute for proper notice. The professional response without notice in place: document the request, disperse voluntarily where possible, and advise the owner on the formal process for the future.</p>
    </div>
  </div>
  <div class="content-block">
    <h4>Developing Officers</h4>
    <h2>What you model today gets repeated tomorrow — on calls where you're not there.</h2>
    <ul class="key-points">
      <li><strong>Correct privately, directly, briefly.</strong> Corrections delivered one-on-one, without an audience, grounded in law and policy, build the officer. Public corrections create resentment and close down learning. "Here's why I took it that way — no posted signage, no articulable suspicion for individual stops. Twenty minutes of clean contact beats a civil complaint." That's the whole lesson.</li>
      <li><strong>Friction is an opening.</strong> A junior officer's frustration ("that took 20 minutes — we could've been done in five") is a teaching moment. Let it pass unaddressed and their default — move fast, run everyone — survives to the next solo shift.</li>
      <li><strong>Judgment is the credential.</strong> Police Executive Research Forum (PERF) leadership research identifies demonstrated judgment in ambiguous situations — not seniority, arrest statistics, or test scores — as the strongest predictor of supervisory readiness. Brief, direct, one-on-one corrections are among the highest-value supervisory actions available at the patrol level.</li>
      <li><strong>Accountability means owning outcomes.</strong> Own the decision and the result, explain the reasoning, identify what you'd change. That is distinct from blame (pointing outward) and from collapsing under critique. Officers who show this pattern earn supervisory trust faster than any other quality.</li>
    </ul>
  </div>
  <div class="content-block">
    <h4>Supervisory Situations</h4>
    <h2>The recurring tests — and the professional responses.</h2>
    <ul class="key-points">
      <li><strong>Officers disputing publicly:</strong> separate them immediately, move it out of public view, hear both sides individually, then address the conduct (the public dispute) and the underlying issue (the disagreement) as two distinct matters. Taking sides publicly costs you both officers.</li>
      <li><strong>A pattern forming (three lates in two weeks):</strong> have the direct, documented conversation now — name the pattern, state the expectation, ask if there's something you should know. A formal reprimand without a prior conversation skips the coaching step; waiting for a fourth occurrence normalizes the conduct.</li>
      <li><strong>A subordinate frustrated with command-level policy:</strong> acknowledge the concern, explain the policy as best you know it, and direct them to the appropriate channel — union, chain of command, formal feedback. Venting alongside them undermines your authority; dismissing them ends their engagement.</li>
    </ul>
  </div>
  <div class="content-block">
    <h4>Integrity Under Pressure</h4>
    <h2>Your report is not negotiable — and pressure to change it gets documented.</h2>
    <p>A police report is a sworn document. "We handle things in-house" is not authority over your documentation — altering a report under social pressure is falsification under 18 Pa. C.S. § 4904 (unsworn falsification to authorities), and it compounds whatever the original issue was with a second, more serious one.</p>
    <p>When a colleague — at any seniority — pressures you to change a report: acknowledge the concern without validating it, state clearly that the report reflects what occurred and will not change, and report the conversation to your supervisor. Contemporaneous reporting creates a protected record; silence, even without compliance, can later read as acquiescence. This moment — a hallway, no cameras — is exactly where the credibility that supervision requires is built or lost.</p>
    <button class="btn-launch" onclick="startScenario('egpd-leadership')">Proceed to Scenario Exercise →</button>
  </div>
`;

/* ══════════════════════════════════════════
   SCENARIO — Leadership & Supervision (EGPD)
══════════════════════════════════════════ */
const SCENARIO_LEADERSHIP = {
  title: 'Leadership & Supervision',
  location: 'Hotel Parking Lot, Main St & 2nd St',
  totalDecisions: 3,
  nodes: {
    start: {
      type: 'scene',
      time: '1423',
      weather: 'Clear',
      unit: 'Unit 7903',
      narrative: [
        'You are on patrol with Officer Brooks, who has 18 months on the job. You are the senior officer. A resident flags you down near Main St & 2nd St and reports that a group of teenagers has been blocking a hotel parking lot entrance for over two hours. The owner called twice but received no response.',
        'As you pull into the lot, you observe six teenagers — loud, some with open beverages, but no visible weapons and no evidence of a crime in progress. No trespassing signage is visible. The hotel manager steps outside and gestures at the group.',
        'Brooks says without hesitation: "Let\'s just run them all — if anything pops we can lock someone up and that clears the lot fast."'
      ],
      next: 'd1'
    },
    d1: {
      type: 'decision',
      decisionNumber: 1,
      situation: 'Brooks is already stepping toward the group. The hotel manager is watching. The teenagers have noticed you.',
      question: 'How do you handle the initial approach?',
      options: [
        {
          text: 'Follow Brooks\'s lead — run all six, see what comes back, and clear the scene efficiently.',
          shortLabel: 'Run everyone without articulated basis',
          quality: 'bad',
          next: 'c1-bad'
        },
        {
          text: 'Take point, make contact with the group and the manager, assess for actual violations before any enforcement action.',
          shortLabel: 'Measured contact — assess before acting',
          quality: 'good',
          next: 'c1-good'
        }
      ]
    },
    'c1-bad': {
      type: 'consequence',
      outcomeClass: 'outcome-bad',
      outcomeLabel: 'Fourth Amendment Exposure',
      heading: 'Running everyone without articulable suspicion creates legal liability — and sends Brooks the wrong lesson.',
      narrative: [
        'Terry v. Ohio requires individualized reasonable articulable suspicion before a stop. Presence in a parking lot, even in a group, does not establish that threshold absent specific conduct. Running all six without a lawful basis exposes the department to civil liability and suppresses any evidence obtained.',
        'Two of the six have no record. The other four return nothing actionable. The lot is cleared — but the department absorbs the liability, and Brooks walks away believing this is the correct approach.',
        'As the senior officer, your actions are the standard Brooks will apply on calls where you\'re not there to supervise. What you model today gets repeated tomorrow.'
      ],
      legal: 'Terry v. Ohio (1968): An investigative stop requires individualized reasonable articulable suspicion of criminal activity. Group presence does not supply the basis for individual stops. Running subjects without that foundation creates Fourth Amendment violations and civil exposure.',
      next: 'd2'
    },
    'c1-good': {
      type: 'consequence',
      outcomeClass: 'outcome-good',
      outcomeLabel: 'Measured and Legally Sound',
      heading: 'You assessed the situation before acting. That\'s the standard.',
      narrative: [
        'You speak with the hotel manager — who has not filed a formal trespass notice and has no posted signage meeting Pennsylvania\'s trespass statute requirements. Two of the teenagers leave voluntarily during the conversation. You document the manager\'s request and advise them on the formal trespass process for future incidents.',
        'The remaining four disperse without enforcement action. No Fourth Amendment exposure. Clean documentation.',
        'More importantly: Brooks observed you slow down a fast situation and make a reasoned decision. That\'s a lesson that doesn\'t require a classroom.'
      ],
      legal: '18 Pa. C.S. § 3503 (Criminal Trespass): For a lawful trespass order, the property must be posted, fenced, or the subject must have received direct communication that entry is not permitted. Without posted signage or a prior warning, presence alone does not support trespass. Advise the manager on proper notice procedures.',
      next: 'd2'
    },
    d2: {
      type: 'decision',
      decisionNumber: 2,
      situation: 'Back in the car. Brooks seems frustrated — quiet, stiff. As you clear the call, Brooks says: "That took 20 minutes. We could\'ve been done in five."',
      question: 'How do you respond?',
      options: [
        {
          text: 'Let it go — minor friction, not worth the conversation. You\'ll work it out.',
          shortLabel: 'Ignore the friction',
          quality: 'bad',
          next: 'c2-bad'
        },
        {
          text: 'Address it directly, one-on-one, explain your reasoning — no lecture, no audience.',
          shortLabel: 'Direct one-on-one correction',
          quality: 'good',
          next: 'c2-good'
        }
      ]
    },
    'c2-bad': {
      type: 'consequence',
      outcomeClass: 'outcome-bad',
      outcomeLabel: 'Missed Teaching Moment',
      heading: 'You kept the peace but lost the opportunity.',
      narrative: [
        'Brooks\'s frustration was an opening — a chance to explain the legal reasoning behind the decision and build a better officer. You let it close.',
        'Without correction, Brooks\'s default remains: move fast, run everyone, clear the call. On a solo patrol next week, that default leads to a Fourth Amendment violation with no senior officer to slow it down.',
        'Supervisory leadership is not only about making the right call in the field. It\'s about ensuring the officers around you understand why the right call was right.'
      ],
      legal: 'PERF Leadership Research: The top predictor of supervisory readiness is demonstrated judgment in ambiguous situations. Teaching moments — especially brief, direct, one-on-one corrections — are among the highest-value supervisory actions available at the patrol level.',
      next: 'd3'
    },
    'c2-good': {
      type: 'consequence',
      outcomeClass: 'outcome-good',
      outcomeLabel: 'Effective Patrol-Level Supervision',
      heading: 'You addressed it cleanly. No lecture, no audience, one clear message.',
      narrative: [
        '"Here\'s why I took it that way — no posted signage, no prior warning, no articulable suspicion for individual stops. Running them was a Fourth Amendment problem waiting to happen. Twenty minutes of clean contact beats a civil complaint." That\'s all it takes.',
        'No embarrassment. No public correction. Brooks heard the reasoning and has something to work with.',
        'This is what patrol-level supervision looks like — brief, direct, grounded in law and policy, and delivered without an audience. It doesn\'t require a sergeant\'s badge.'
      ],
      legal: 'Senior officers are expected to model and reinforce professional standards in the field. Correction of junior officer conduct should occur through proper channels and, where possible, privately — to preserve working relationships and reinforce the lesson without public friction.',
      next: 'd3'
    },

    'd3': {
      type: 'decision',
      decisionNumber: 3,
      situation: 'You have completed your report on the incident. As you are leaving the supervisor\'s office, a senior officer — someone with 18 years on the job — pulls you aside and says: "I heard what you wrote up. Look, the rookie doesn\'t need this on his record. You\'re going to make his career harder. We handle things in-house." Two other officers are within earshot.',
      question: 'How do you respond?',
      options: [
        {
          text: 'Tell him you understand, and you\'ll see if there\'s anything you can adjust in the report before it is finalized.',
          shortLabel: 'Agree to reconsider the report',
          quality: 'bad',
          next: 'c3-bad'
        },
        {
          text: 'Acknowledge his concern directly, be clear that the report reflects what occurred and will not change, and report the conversation to your supervisor.',
          shortLabel: 'Hold the line, report the pressure',
          quality: 'good',
          next: 'c3-good'
        },
        {
          text: 'Tell him this is not the place for this conversation and walk away.',
          shortLabel: 'Shut it down without reporting it',
          quality: 'risky',
          next: 'c3-neutral'
        }
      ]
    },
    'c3-bad': {
      type: 'consequence',
      outcomeClass: 'outcome-bad',
      outcomeLabel: 'Integrity Violation',
      heading: 'Altering a report under social pressure is misconduct — regardless of seniority.',
      narrative: [
        'A police report is a sworn document. Adjusting it because a colleague applied pressure is not "handling things in-house" — it is falsifying an official record. Seniority is not authority over your report. Years on the job do not create the right to influence documentation.',
        'If this surfaces later — and these things surface — you are not just facing a policy violation. You are facing potential criminal charges, termination, and the destruction of a career built on discipline and integrity.',
        'The sergeant\'s bars you are working toward require that you hold this line now, when it costs something. That is what leadership actually is.'
      ],
      legal: '18 Pa. C.S. § 4904 — Unsworn falsification to authorities. Altering a police report at the request of another officer compounds the original issue with a second, more serious one. Report the pressure to your chain of command immediately.',
      next: 'debrief'
    },
    'c3-good': {
      type: 'consequence',
      outcomeClass: 'outcome-good',
      outcomeLabel: 'Leadership Under Pressure',
      heading: 'Holding the line and reporting the pressure is what integrity looks like in practice.',
      narrative: [
        'You acknowledged his concern without validating it, stated clearly where you stand, and removed any ambiguity about whether the report will change. That is the response of someone who understands that leadership is not about popularity — it is about consistency.',
        'Reporting the conversation to your supervisor is not "ratting." It is protecting yourself, protecting the department, and ensuring that the pressure you experienced is documented. If this officer is doing this with you, he is doing it with others.',
        'This moment — quiet, no cameras, in a hallway — is exactly where character is built or lost. You chose correctly.'
      ],
      legal: 'Supervisors are obligated to document attempts to influence official reports. Reporting the conversation creates a record that protects you if the situation escalates. Failure to report may later appear as tacit acquiescence to the pressure.',
      next: 'debrief'
    },
    'c3-neutral': {
      type: 'consequence',
      outcomeClass: 'outcome-neutral',
      outcomeLabel: 'Incomplete Response',
      heading: 'Walking away without reporting leaves the pressure unaddressed.',
      narrative: [
        'Refusing to engage in the moment was the right instinct. But walking away without reporting what just happened means the conversation disappears — no record, no accountability, no protection for you if it comes up again.',
        'The senior officer just asked you to alter a sworn document in front of witnesses. That is not a minor hallway comment. If the report is later challenged, or if this officer makes a formal complaint against you, the absence of your timely report of this conversation is a problem.',
        'Shut it down and document it. Both steps.'
      ],
      legal: 'Officers who receive pressure to alter documentation should report it to their chain of command promptly. Contemporaneous reporting creates a protected record. Silence — even without compliance — can later be interpreted as ambiguous.',
      next: 'debrief'
    },
    debrief: { type: 'debrief' }
  }
};

function getLeadershipQuestions() {
  return [
    {
      scenario: 'You are the senior officer on a call. A junior officer suggests running all subjects present without any individualized basis.',
      text: 'Under Terry v. Ohio, what is required before conducting an investigative stop of an individual?',
      options: [
        'The officer\'s general experience and instinct that something is wrong.',
        'Individualized reasonable articulable suspicion of criminal activity.',
        'Probable cause that a crime has been committed.',
        'Group presence in a high-crime area is sufficient.'
      ],
      correct: 1,
      feedback: 'Correct. Terry v. Ohio (1968) requires individualized, reasonable articulable suspicion of criminal activity before an investigative stop. Group presence does not supply the basis for individual stops. A senior officer who corrects this in the field prevents a Fourth Amendment violation and trains the junior officer for future calls.'
    },
    {
      scenario: 'A hotel manager has called twice about teenagers loitering in their parking lot. There is no posted trespass signage and no prior warning given to the subjects.',
      text: 'Under 18 Pa. C.S. § 3503, what is required before a trespass enforcement is lawful?',
      options: [
        'The property owner\'s verbal request to officers is sufficient to authorize trespass enforcement.',
        'The property must be posted with conspicuous signage, fenced to exclude intruders, or the subject must have received prior direct communication that entry is prohibited.',
        'Any commercial property open to the public is exempt from trespass protections.',
        'Repeated calls to police by the property owner establish the required notice.'
      ],
      correct: 1,
      feedback: 'Correct. 18 Pa. C.S. § 3503 requires that property be posted with conspicuous signage, fenced in a manner designed to exclude intruders, or that the subject have received direct prior communication that entry is not permitted. An owner\'s call to police does not substitute for proper notice. Advise the owner on the formal trespass process rather than taking unlawful enforcement action.'
    },
    {
      scenario: 'After a call, a junior officer expresses frustration with your approach, saying it took longer than necessary.',
      text: 'According to PERF research, what is the strongest predictor of supervisory readiness in patrol officers?',
      options: [
        'Total years of service and seniority.',
        'Number of arrests and enforcement statistics.',
        'Demonstrated judgment in ambiguous situations.',
        'Performance on written promotional examinations.'
      ],
      correct: 2,
      feedback: 'Correct. Police Executive Research Forum (PERF) research identifies demonstrated judgment in ambiguous situations as the top predictor of supervisory readiness — not seniority or test scores. Officers who make consistent, law-grounded decisions in unclear situations, and who correct others through those situations, demonstrate the core supervisory competency before ever holding the rank.'
    },
    {
      scenario: 'A junior officer made an error on a recent call. You want to correct the behavior.',
      text: 'What is the most effective and professionally appropriate method for correcting a junior officer\'s conduct?',
      options: [
        'Address it on scene to reinforce the standard in real time while the situation is fresh.',
        'Document the error in writing and submit to the chain of command for formal action.',
        'Address it privately and directly, one-on-one, without an audience.',
        'Wait for the annual evaluation period to address behavioral patterns.'
      ],
      correct: 2,
      feedback: 'Correct. Corrections to junior officer conduct are most effective when delivered privately and directly, without an audience. Public corrections damage working relationships, create resentment, and close down the learning. A brief, private, law-grounded correction — delivered calmly — builds the officer rather than shuts them down. Departmental chain-of-command standards support addressing concerns through proper channels, not in the field in front of personnel or the public.'
    },
    {
      scenario: 'You make a call on a difficult scene that a supervisor later questions. The outcome was not ideal but your reasoning was sound.',
      text: 'Which behavior best demonstrates the accountability that supervisory leaders are known for?',
      options: [
        'Documenting that the conditions you faced made any other outcome impossible.',
        'Identifying which other factors and personnel contributed to the outcome.',
        'Owning the decision and the outcome, explaining your reasoning, and identifying what you\'d do differently.',
        'Deferring to the supervisor\'s assessment to preserve the working relationship.'
      ],
      correct: 2,
      feedback: 'Correct. Accountability means owning the decision and the outcome — good or bad — explaining the reasoning behind it clearly, and identifying what you\'d change. This is distinct from blame (pointing outward) and from self-flagellation (collapsing under the critique). Officers who demonstrate this pattern consistently earn supervisory trust faster than any other quality. It is the leadership behavior that gets noticed without requiring a sergeant\'s badge.'
    },
    {
      scenario: 'You are acting as a field supervisor when two officers under your supervision begin a verbal dispute in the station parking lot over a call handling decision. Other officers are watching.',
      text: 'What is the appropriate supervisory response?',
      options: [
        'Let them resolve it themselves — interpersonal disputes among officers are not supervisor business.',
        'Take sides with the officer whose position you believe is more sound.',
        'Separate them immediately, move the conversation out of public view, hear both perspectives individually, and address the conduct and the underlying issue separately.',
        'Document the dispute and submit it up the chain without intervening.'
      ],
      correct: 2,
      feedback: 'Correct. Public disputes among officers damage unit cohesion and public trust. The first priority is de-escalation: separate the parties and move the conversation to a private setting. Then address the conduct (the public dispute) and the underlying issue (the disagreement about the call) as two distinct matters. Taking sides publicly undermines your credibility as a supervisor with both officers and the watching team. Document as appropriate, but intervention — not documentation — is the immediate response.'
    },
    {
      scenario: 'An officer under your supervision has been late to shift three times in two weeks. You have not formally addressed it yet. The officer is otherwise a strong performer.',
      text: 'What is the supervisory best practice at this stage?',
      options: [
        'Wait for a fourth occurrence before taking action — three is within normal variation.',
        'Issue a formal written reprimand immediately to establish a record.',
        'Have a direct, documented conversation now: name the pattern, state the expectation clearly, and ask if there is something you should know. Give the officer the opportunity to respond before any formal action.',
        'Mention it casually to the officer — a formal conversation would be disproportionate for a performance issue.'
      ],
      correct: 2,
      feedback: 'Correct. Three occurrences in two weeks is a pattern that requires direct supervisor engagement. Waiting creates a pattern of unchallenged conduct. A formal written reprimand without a prior conversation skips the coaching step. The correct approach is a direct, documented conversation: state what you observed, set the expectation, listen for context (there may be a wellness or personal issue), and document the conversation. This protects the officer, you, and the department if escalation becomes necessary.'
    },
    {
      scenario: 'A subordinate officer comes to you frustrated about a department policy they believe is unfair. The policy is set at the command level and is not one you have authority to change.',
      text: 'What is the appropriate supervisory response?',
      options: [
        'Agree with the officer and validate their frustration — it builds trust.',
        'Tell the officer policies are not up for discussion and redirect them to their duties.',
        'Acknowledge their concern, explain what the policy requires and why it exists to the extent you know, and encourage them to raise concerns through the appropriate channel (union, chain of command, formal feedback process) if they believe it warrants review.',
        'Promise to raise the issue at the next supervisors\' meeting without follow-through.'
      ],
      correct: 2,
      feedback: 'Correct. Officers who feel unheard disengage. Dismissing the concern damages trust. Agreeing and venting with a subordinate about command decisions undermines your authority and theirs. The professional response: acknowledge the concern, explain the policy to the best of your knowledge, and direct them to the proper channel for formal feedback. This respects their voice while reinforcing the chain of command and your own professional standing.'
    },
  ];
}
