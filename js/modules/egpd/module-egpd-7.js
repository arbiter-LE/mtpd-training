/* ══════════════════════════════════════════
   READING — Leadership & Supervision (EGPD)
══════════════════════════════════════════ */
const DEBRIEF_LEADERSHIP = `
  <h3>Key Legal Principles — Leadership &amp; Supervision</h3>
  <p><strong>A field leader holds the legal floor — Terry v. Ohio (1968).</strong> An investigative stop requires individualized reasonable articulable suspicion; group presence — even in response to a complaint — does not supply a basis to stop any individual. A senior officer who allows suspicionless "run everyone" stops trains the next Fourth Amendment violation and the civil exposure that follows.</p>
  <p><strong>Trespass enforcement requires notice — 18 Pa. C.S. § 3503.</strong> Lawful enforcement against a defiant trespasser requires conspicuous posted signage, a fence designed to exclude, or direct prior communication that entry is not permitted. A property owner's call — even repeated calls — does not substitute for notice. Without it, document the request, disperse voluntarily where possible, and advise the owner on the formal process.</p>
  <p><strong>What you model gets repeated.</strong> Correct privately, directly, and briefly, grounded in law and policy; public correction creates resentment and closes down learning. PERF leadership research identifies demonstrated judgment in ambiguous situations — not seniority or arrest counts — as the strongest predictor of supervisory readiness, and brief one-on-one corrections are among the highest-value patrol-level supervisory actions.</p>
  <p><strong>Handle the recurring supervisory tests deliberately.</strong> Separate publicly disputing officers and address the conduct and the underlying issue as distinct matters; address a forming pattern with a direct, documented conversation before formal discipline; and route a subordinate's policy frustration to the proper channel rather than venting alongside them or dismissing them.</p>
  <p><strong>Report integrity under pressure — 18 Pa. C.S. § 4904.</strong> A police report is a sworn document; "we handle things in-house" is not authority over your documentation. Altering a report under social pressure is unsworn falsification. Acknowledge the concern without validating it, state that the report reflects what occurred and will not change, and report the conversation to a supervisor — contemporaneous reporting creates a protected record, while silence can later read as acquiescence.</p>
`;

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
        'Individualized reasonable articulable suspicion of criminal activity.',
        'The officer\'s general experience and instinct that something is wrong.',
        'Probable cause that a crime has been committed.',
        'Group presence in a high-crime area is sufficient.'
      ],
    },
    {
      scenario: 'A hotel manager has called twice about teenagers loitering in their parking lot. There is no posted trespass signage and no prior warning given to the subjects.',
      text: 'Under 18 Pa. C.S. § 3503, what is required before a trespass enforcement is lawful?',
      options: [
        'The property owner\'s verbal request to officers is sufficient to authorize trespass enforcement.',
        'Any commercial property open to the public is exempt from trespass protections.',
        'The property must be posted with conspicuous signage, fenced to exclude intruders, or the subject must have received prior direct communication that entry is prohibited.',
        'Repeated calls to police by the frustrated property owner are themselves enough to establish the required notice, so once an owner has complained often enough the posting, fencing, and direct-communication elements no longer need to be separately shown.'
      ],
    },
    {
      scenario: 'After a call, a junior officer expresses frustration with your approach, saying it took longer than necessary.',
      text: 'According to PERF research, what is the strongest predictor of supervisory readiness in patrol officers?',
      options: [
        'Total years of service and seniority.',
        'Number of arrests and enforcement statistics.',
        'Performance on written promotional examinations.',
        'Demonstrated judgment in ambiguous situations.'
      ],
    },
    {
      scenario: 'A junior officer made an error on a recent call. You want to correct the behavior.',
      text: 'What is the most effective and professionally appropriate method for correcting a junior officer\'s conduct?',
      options: [
        'Address it privately and directly, one-on-one, without an audience.',
        'Address it on scene to reinforce the standard in real time while the situation is fresh.',
        'Document the error in writing and submit to the chain of command for formal action.',
        'Wait for the annual evaluation period to address behavioral patterns.'
      ],
    },
    {
      scenario: 'You make a call on a difficult scene that a supervisor later questions. The outcome was not ideal but your reasoning was sound.',
      text: 'Which behavior best demonstrates the accountability that supervisory leaders are known for?',
      options: [
        'Documenting that the conditions you faced made any other outcome impossible.',
        'Identifying which other factors and personnel contributed to the outcome.',
        'Deferring to the supervisor\'s assessment to preserve the working relationship.',
        'Owning the decision and the outcome, explaining your reasoning, and identifying what you\'d do differently.'
      ],
    },
    {
      scenario: 'You are acting as a field supervisor when two officers under your supervision begin a verbal dispute in the station parking lot over a call handling decision. Other officers are watching.',
      text: 'What is the appropriate supervisory response?',
      options: [
        'Let them resolve it themselves — interpersonal disputes among officers are not supervisor business.',
        'Separate them immediately, move the conversation out of public view, hear both perspectives individually, and address the conduct and the underlying issue separately.',
        'Take sides with the officer whose position you believe is more sound.',
        'Document the dispute and submit it up the chain without intervening.'
      ],
    },
    {
      scenario: 'An officer under your supervision has been late to shift three times in two weeks. You have not formally addressed it yet. The officer is otherwise a strong performer.',
      text: 'What is the supervisory best practice at this stage?',
      options: [
        'Wait for a fourth occurrence before taking action — three is within normal variation.',
        'Issue a formal written reprimand immediately, before speaking with the officer at all, in order to establish a documented record right away, treating the paper trail as more important than first having a direct conversation about the pattern of lateness.',
        'Have a direct, documented conversation now: name the pattern, state the expectation clearly, and ask if there is something you should know. Give the officer the opportunity to respond before any formal action.',
        'Mention it casually to the officer — a formal conversation would be disproportionate for a performance issue.'
      ],
    },
    {
      scenario: 'A subordinate officer comes to you frustrated about a department policy they believe is unfair. The policy is set at the command level and is not one you have authority to change.',
      text: 'What is the appropriate supervisory response?',
      options: [
        'Acknowledge their concern, explain what the policy requires and why it exists to the extent you know, and encourage them to raise concerns through the appropriate channel (union, chain of command, formal feedback process) if they believe it warrants review.',
        'Agree openly with the officer and validate their frustration with the policy, on the view that taking their side builds trust and rapport, even though it means quietly undercutting a department policy that you are responsible for upholding in front of the rest of the squad.',
        'Tell the officer policies are not up for discussion and redirect them to their duties.',
        'Promise to raise the issue at the next supervisors\' meeting without follow-through.'
      ],
    },
  ];
}

/* ══════════════════════════════════════════
   SUPERVISOR OVERLAY — Leadership & Supervision (EGPD)
   The patrol module earns the rank through judgment; the overlay
   exercises it — progressive discipline, culture, integrity, development.
══════════════════════════════════════════ */
const SUPERVISOR_LEADERSHIP = `
  <div class="content-block">
    <h4>Supervisor Focus</h4>
    <h2>Everything that made you ready for the rank now operates at scale — with formal tools, a paper trail, and people who answer to you.</h2>
    <p>The officer-level version of this material is about demonstrating the judgment that earns supervision. You are past that. As a supervisor the same instincts — slow the fast situation, correct privately, own the outcome — now carry formal weight: your correction can become documented progressive discipline, your example sets a squad's culture, and you are the person to whom integrity problems get reported rather than the one reporting them. The craft does not change. The stakes and the tools do.</p>
  </div>
  <div class="content-block">
    <h4>Coaching vs. Formal Action — Knowing the Line</h4>
    <h2>Most development happens in conversation. Know when it has to become a record.</h2>
    <p>The highest-value supervisory action is still the brief, private, law-grounded correction, and most officer development should live there — in conversations that never generate paper. But you also own the escalation. A single lapse is a coaching moment; a pattern, like three lates in two weeks, is a direct, documented conversation now — name the pattern, state the expectation, ask whether there is something you should know — before it becomes a formal reprimand. Skipping the coaching step straight to discipline breeds resentment; waiting past a clear pattern for a "fourth occurrence" normalizes it. The judgment you are paid for is knowing which rung of that ladder a situation sits on, and documenting from the moment it leaves coaching.</p>
  </div>
  <div class="content-block">
    <h4>You Set the Floor Others Train To</h4>
    <p>A senior officer's example trains the next call they are not on. A supervisor's example trains a squad. When you let a junior officer "run everyone in the lot" slide, or wave through a report that says only "resisted arrest," you have not made one exception — you have set the floor. Terry still requires individualized reasonable suspicion; 18 Pa. C.S. § 3503 still requires actual notice before trespass enforcement; the legal floor you hold is the legal floor your people will hold when you are off shift. Reinforcing it in the moment — and praising the officer who slowed a fast situation down rather than the one who cleared it fastest — is how the standard survives contact with a busy night.</p>
  </div>
  <div class="content-block">
    <h4>The Recurring Supervisory Tests</h4>
    <ul class="key-points">
      <li><strong>Officers disputing in public.</strong> Separate them immediately, move it out of public view, hear each individually, then address the conduct (the public dispute) and the underlying disagreement as two distinct matters. Taking a public side costs you both officers.</li>
      <li><strong>A subordinate frustrated with command policy you cannot change.</strong> Acknowledge the concern, explain the policy as best you know it, and route them to the proper channel — union, chain of command, formal feedback. Venting alongside them undermines your authority; dismissing them ends their engagement.</li>
      <li><strong>A pattern forming.</strong> Move to a documented conversation before formal action; the record protects the officer, you, and the department if escalation becomes necessary.</li>
      <li><strong>Accountability.</strong> Model owning outcomes — the decision, the result, what you would change — because your people calibrate their own accountability to yours.</li>
    </ul>
  </div>
  <div class="content-block">
    <h4>You Are Now the One Integrity Gets Reported To</h4>
    <h2>The pressure that used to come at you now comes through you.</h2>
    <p>In the patrol scenario a senior officer leaned on the reporting officer to soften a report — "we handle things in-house." As a supervisor you are on the other end of that dynamic. Two obligations follow. First, you never apply that pressure: a report reflects what occurred, and "fixing" it for a struggling officer is unsworn falsification under 18 Pa. C.S. § 4904 — your rank makes it worse, not better. Second, when an officer brings you a report of pressure to alter documentation, you document it and act, because if it is happening to them it is happening to others, and your response is the signal that decides whether your people trust the chain of command with the truth.</p>
  </div>
  <div class="content-block">
    <h4>Develop People on Purpose</h4>
    <p>The patrol leader corrects what goes wrong in front of them. A supervisor develops people deliberately. PERF's research ties supervisory readiness to demonstrated judgment in ambiguous situations — so create those reps: debrief the calls that went right and ask why, hand a capable officer the next ambiguous call and watch how they reason through it, name the judgment you want and praise it when you see it. The officers you develop on purpose are the ones who will hold the line on the shift you are not working — and building them is the part of the job that outlasts any single arrest, report, or call.</p>
  </div>
`;

function getLeadershipSupervisorQuestions() {
  return [
    {
      scenario: 'An officer on your squad has been late to shift three times in two weeks. The officer is otherwise a strong performer, and you have not formally addressed it yet.',
      text: 'What is the correct supervisory action at this stage?',
      options: [
        'Issue a formal written reprimand immediately to establish a record.',
        'Wait for a fourth occurrence before doing anything, since three is within normal variation.',
        'Have a direct, documented conversation now — name the pattern, state the expectation, and ask if there is something you should know — before any formal action, while still creating a record.',
        'Mention it casually with no documentation, since the officer is a strong performer.'
      ],
    },
    {
      scenario: 'A junior officer on your squad wants to run a group of subjects with no individualized basis "to see what pops." You correct it. A peer supervisor asks why you make a big deal of small field calls.',
      text: 'Why does holding this line matter beyond the single call?',
      options: [
        'It does not really matter — running names is harmless and clears scenes quickly.',
        'Because the subjects who were swept up in the suspicionless stop might later file formal complaints against the department, and the possibility of those complaints is really the only meaningful risk the situation actually presents to you and to the officer as the supervisor on duty.',
        'Because senior officers are required to make all stop decisions personally.',
        'Because the legal floor you hold becomes the floor your officers hold when you are off shift: Terry requires individualized reasonable suspicion, and allowing a suspicionless sweep both creates Fourth Amendment exposure now and trains the next violation on a call you will not be on.'
      ],
    },
    {
      scenario: 'Two officers under your supervision begin a heated dispute about a call in the station parking lot. Several other officers are watching.',
      text: 'What is the correct supervisory response?',
      options: [
        'Separate them immediately, move the conversation out of public view, hear each perspective individually, and then address the public conduct and the underlying disagreement as two distinct matters — without taking a public side.',
        'Let them work it out — interpersonal disputes are not a supervisor\'s concern.',
        'Side openly with whichever officer is correct about the call to settle it fast.',
        'Document the public argument between the two officers and forward the matter straight up the chain of command without personally intervening at the scene at all, on the view that a higher-ranking supervisor is better placed to sort out the underlying dispute.'
      ],
    },
    {
      scenario: 'An officer on your squad is frustrated with a command-level policy they believe is unfair. You do not have authority to change it.',
      text: 'What is the appropriate supervisory response?',
      options: [
        'Agree with the officer\'s complaint and vent alongside them about the policy, on the theory that commiserating openly builds rapport and shows the officer that you are on their side, even though the policy is one you are personally charged with enforcing.',
        'Acknowledge the concern, explain what the policy requires and why to the extent you know it, and route the officer to the proper channel — union, chain of command, or formal feedback — if they believe it warrants review.',
        'Tell the officer that policy is not open for discussion and send them back to work.',
        'Promise to raise it at the next supervisors\' meeting without intending to follow through.'
      ],
    },
    {
      scenario: 'A struggling officer wrote a report with a problem in it. Another supervisor quietly suggests you "fix it in-house" to keep it off the officer\'s record and protect his career.',
      text: 'What is your obligation?',
      options: [
        'Adjust the report discreetly — protecting a developing officer\'s record is part of supporting your people.',
        'Have the officer rewrite it to say whatever keeps it off his record.',
        'Approve the report as written and say nothing at all about the altered account, on the reasoning that it is ultimately the officer\'s own report and not yours, so the responsibility for what it says rests entirely with the officer who wrote and submitted it in the first place.',
        'Refuse: a report reflects what occurred, and altering it is unsworn falsification under 18 Pa. C.S. § 4904. Your rank makes that worse, not better — handle the underlying performance issue through coaching or progressive discipline, not by changing the record.'
      ],
    },
    {
      scenario: 'An officer on your squad comes to you privately and reports that a senior officer pressured them to alter a report, saying the department "handles things in-house."',
      text: 'How do you respond?',
      options: [
        'Document the report of pressure and act on it through the chain of command — if it is happening to this officer it is likely happening to others, and your response signals whether your people can trust the chain with the truth.',
        'Tell the officer to handle it themselves and avoid the senior officer.',
        'Advise the officer to quietly change the report to smooth things over and avoid any further conflict with the person who applied the pressure, treating a quiet edit to the record as the path of least resistance for everyone involved here.',
        'Take no action unless the officer files a formal written complaint first.'
      ],
    },
    {
      scenario: 'A call you supervised ended with a less-than-ideal outcome, though your decision-making was sound given what you knew. A superior questions the result.',
      text: 'Which behavior best models the accountability you want your officers to learn?',
      options: [
        'Emphasize that the conditions made any other outcome impossible.',
        'Identify which other personnel and factors contributed to the result.',
        'Own the decision and the outcome, explain the reasoning behind it, and identify what you would do differently — because your officers calibrate their own accountability to what they see you model.',
        'Defer entirely to the superior\'s assessment to preserve the relationship.'
      ],
    },
    {
      scenario: 'You want to build the judgment of the officers on your squad over time, not just correct mistakes as they happen.',
      text: 'What distinguishes deliberate development from simply correcting errors?',
      options: [
        'There is really no difference between the two at all — correcting officers\' errors as they happen to occur, one at a time, is the entire substance of officer development, and there is nothing further a supervisor needs to do deliberately to build good judgment over the course of a career.',
        'Deliberate development creates judgment reps on purpose: debrief calls that went right and ask why, assign a capable officer the next ambiguous call and observe their reasoning, and name and praise the judgment you want — building officers who hold the line on shifts you do not work.',
        'Deliberate development means sending officers to more outside training and otherwise leaving them alone.',
        'Deliberate development is the responsibility of the training division, not the field supervisor.'
      ],
    },
  ];
}

/* ══════════════════════════════════════════
   SUPERVISOR SCENARIO — Leadership & Supervision (EGPD)
   Exercising the rank across one shift with junior Officer Ferro.
══════════════════════════════════════════ */
const SCENARIO_LEADERSHIP_SUP = {
  id: 'scenario-leadership-sup',
  title: 'Supervisor — A Shift That Tests the Rank',
  location: 'Patrol Division, East Greenville Borough, PA',
  totalDecisions: 3,
  nodes: {
    'start': {
      type: 'scene', time: '15:00', weather: 'Clear', unit: 'Squad Supervisor',
      narrative: [
        'You have the squad today. The instincts that earned you the rank — slow the fast situation, correct privately, own the outcome — now carry formal weight: your correction can become documented progressive discipline, and your example sets the squad\'s culture.',
        'Three things land this shift, and each one tests how you exercise the rank.'
      ],
      next: 'd1'
    },
    'd1': {
      type: 'decision', decisionNumber: 1,
      situation: 'Officer Ferro, otherwise a strong performer, has been late to shift three times in two weeks. You have not formally addressed it yet.',
      question: 'What do you do?',
      options: [
        { text: 'Have a direct, documented conversation now — name the pattern, state the expectation, and ask if there\'s something you should know — before any formal action, while still creating a record.', next: 'c1a', quality: 'good', shortLabel: 'Documented coaching conversation now' },
        { text: 'Issue a formal written reprimand immediately to establish a record.', next: 'c1b', quality: 'risky', shortLabel: 'Jumped to a written reprimand' },
        { text: 'Wait for a fourth occurrence before doing anything — three is within normal variation.', next: 'c1c', quality: 'bad', shortLabel: 'Waited for a fourth instance' },
        { text: 'Mention it casually in passing, with no documentation.', next: 'c1d', quality: 'bad', shortLabel: 'Casual, undocumented mention' },
      ]
    },
    'c1a': {
      type: 'consequence', outcomeClass: 'outcome-good', outcomeLabel: 'The Right Rung of the Ladder',
      heading: 'A documented conversation now — pattern, expectation, and a chance to surface context.',
      narrative: [
        'You name the pattern, state the expectation clearly, and ask whether there\'s something you should know — there may be a wellness or personal issue behind it. You document the conversation. This is the right rung: coaching before formal action, with a record that protects Ferro, you, and the department if it escalates.',
        'Skipping straight to discipline breeds resentment; waiting for a fourth instance normalizes the conduct. You did neither.'
      ],
      legal: null,
      next: 'd2'
    },
    'c1b': {
      type: 'consequence', outcomeClass: 'outcome-neutral', outcomeLabel: 'Skipped the Coaching Step',
      heading: 'A written reprimand before a conversation skips a rung — and breeds resentment.',
      narrative: [
        'Jumping straight to a formal reprimand on a strong performer, without first having the direct conversation, skips the coaching step and teaches Ferro to fear the process rather than correct the behavior. It also forecloses the chance to learn whether something is driving the lateness.',
        'Have the documented conversation first. Escalate to formal discipline only if the pattern continues after that.'
      ],
      legal: null,
      next: 'd2'
    },
    'c1c': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Waiting Normalizes It',
      heading: 'Three lates in two weeks is already a pattern.',
      narrative: [
        'Waiting for a fourth occurrence tells Ferro — and anyone watching — that the standard is negotiable. A pattern of unchallenged conduct is exactly how small issues become large ones, and the longer you wait the harder it is to address fairly.',
        'Engage now, with a documented conversation.'
      ],
      legal: null,
      next: 'd2'
    },
    'c1d': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'No Record, No Standard',
      heading: 'A casual, undocumented mention isn\'t supervision — it\'s avoidance.',
      narrative: [
        'A passing comment with no documentation neither sets a clear expectation nor creates the record you\'ll need if the pattern continues. It lets you feel like you addressed it while leaving the standard exactly where it was.',
        'Name the pattern directly, set the expectation, and document the conversation.'
      ],
      legal: null,
      next: 'd2'
    },
    'd2': {
      type: 'decision', decisionNumber: 2,
      situation: 'Later, two officers on your squad begin a heated dispute about a call in the station parking lot. Several other officers are watching.',
      question: 'How do you respond?',
      options: [
        { text: 'Separate them immediately, move it out of public view, hear each perspective individually, then address the public conduct and the underlying disagreement as two distinct matters — without taking a public side.', next: 'c2a', quality: 'good', shortLabel: 'Separated, private, addressed both issues' },
        { text: 'Side openly with whichever officer is right about the call to settle it fast.', next: 'c2b', quality: 'bad', shortLabel: 'Took a public side' },
        { text: 'Let them work it out — interpersonal disputes aren\'t a supervisor\'s concern.', next: 'c2c', quality: 'bad', shortLabel: 'Let them sort it out' },
        { text: 'Document it and forward it up the chain without intervening.', next: 'c2d', quality: 'risky', shortLabel: 'Documented without intervening' },
      ]
    },
    'c2a': {
      type: 'consequence', outcomeClass: 'outcome-good', outcomeLabel: 'De-escalated, Then Addressed',
      heading: 'Intervention first, then the two issues handled separately.',
      narrative: [
        'You separate them, move the conversation out of public view, hear each side individually, and then deal with the public conduct and the underlying disagreement as distinct matters. Taking a public side would have cost you credibility with both officers and the watching squad.',
        'The immediate job was de-escalation; the follow-up was treating the conduct and the substance separately. You did both.'
      ],
      legal: null,
      next: 'd3'
    },
    'c2b': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'You Lost Both Officers',
      heading: 'Taking a public side in a parking-lot dispute undermines you with everyone watching.',
      narrative: [
        'Publicly siding with one officer to end it fast humiliates the other in front of the squad and signals that the way to win a disagreement is to argue loudest where the supervisor can hear. You damage your credibility with both officers and the team.',
        'Separate them, hear each privately, and address the conduct and the substance apart from each other.'
      ],
      legal: null,
      next: 'd3'
    },
    'c2c': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Cohesion Erodes',
      heading: 'A public dispute among your officers is exactly a supervisor\'s concern.',
      narrative: [
        'Letting it run damages unit cohesion and public trust, and signals that this kind of confrontation is acceptable on your watch. The first priority is intervention — separate the parties and move it private — not standing back.',
        'Then address the conduct and the underlying issue as two matters.'
      ],
      legal: null,
      next: 'd3'
    },
    'c2d': {
      type: 'consequence', outcomeClass: 'outcome-neutral', outcomeLabel: 'Documentation Isn\'t Intervention',
      heading: 'Writing it up while it plays out in public skips the part only you can do now.',
      narrative: [
        'Documenting may be appropriate afterward, but kicking it up the chain as your first and only move leaves the dispute escalating in front of the squad. The immediate response is to intervene — separate, move private, hear both sides — and then handle conduct and substance.',
        'Intervene first; document as a follow-up if warranted.'
      ],
      legal: null,
      next: 'd3'
    },
    'd3': {
      type: 'decision', decisionNumber: 3,
      situation: 'End of shift, a senior officer with eighteen years on pulls you aside — two other officers within earshot — about a struggling junior officer\'s report that has a problem in it. "Look, the kid doesn\'t need this on his record. We handle things in-house. Just fix it."',
      question: 'How do you respond?',
      options: [
        { text: 'Quietly adjust the report to keep the problem off the junior officer\'s record.', next: 'c3a', quality: 'bad', shortLabel: 'Altered the report to protect the kid' },
        { text: 'Refuse — a report reflects what occurred, and altering it is unsworn falsification under 18 Pa. C.S. § 4904; your rank makes that worse. Handle the underlying performance issue through coaching or progressive discipline, not by changing the record.', next: 'c3b', quality: 'good', shortLabel: 'Held the line, addressed performance properly' },
        { text: 'Have the junior officer rewrite the report to bury the problem.', next: 'c3c', quality: 'bad', shortLabel: 'Had it rewritten to hide the issue' },
      ]
    },
    'c3a': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Falsification With a Stripe',
      heading: '"Handling it in-house" by altering a report is a crime — and your rank makes it worse.',
      narrative: [
        'A police report is a sworn document. Adjusting it to keep a problem off an officer\'s record is unsworn falsification under 18 Pa. C.S. § 4904, and a supervisor doing it compounds the original issue with the authority of rank. Seniority — the senior officer\'s or yours — is not authority over the truth of a report.',
        'If this surfaces, it is not a policy violation; it is a criminal one, and it takes your career with it.'
      ],
      legal: '18 Pa. C.S. § 4904: altering a report to change what it reflects is unsworn falsification. Rank does not create authority over documentation.',
      next: 'debrief'
    },
    'c3b': {
      type: 'consequence', outcomeClass: 'outcome-good', outcomeLabel: 'Held the Line',
      heading: 'The report reflects what occurred; the performance issue gets handled the right way.',
      narrative: [
        'You decline to alter the report — it reflects what happened, and changing it is falsification under § 4904, made worse by your rank. The struggling officer\'s problem is real and gets addressed through coaching or progressive discipline, which actually helps him, rather than through a falsified record that endangers you both.',
        'Holding this line now, in a hallway with witnesses, is exactly the integrity the rank requires.'
      ],
      legal: '18 Pa. C.S. § 4904: a report reflects what occurred; performance issues are addressed through coaching or progressive discipline, not by altering the record.',
      next: 'debrief'
    },
    'c3c': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Same Crime, One Step Removed',
      heading: 'Having him rewrite it to bury the problem is still falsifying the record.',
      narrative: [
        'Directing the junior officer to rewrite the report to hide the problem doesn\'t launder it — it just adds him to the falsification and uses your rank to pressure him into it. The report still has to reflect what actually occurred.',
        'Address the underlying performance issue openly through coaching or progressive discipline, and leave the record honest.'
      ],
      legal: '18 Pa. C.S. § 4904: rewriting a report to conceal a problem is falsification regardless of who holds the pen.',
      next: 'debrief'
    },
    'debrief': { type: 'debrief' }
  }
};
