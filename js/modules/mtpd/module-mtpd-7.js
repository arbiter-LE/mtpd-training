/* ═══════════════════════════════════════════
   MTPD — Module 7: Leadership & Supervision

   Reading extracted byte-for-byte from the former app.js hardcoded
   branch. Supervisor variants anchored to MTPD ALO 1.01 (chain of
   command) and the law in the reading (Terry v. Ohio; 18 Pa. C.S.
   § 3503). Never borrow EGPD policy, framing, or roads.
═══════════════════════════════════════════ */

const READING_LEADERSHIP = `
      <div class="content-block">
        <h4>Leading from the Patrol Level</h4>
        <p>Leadership in law enforcement doesn\'t begin at sergeant. It begins the moment a senior officer makes a decision that a junior officer watches and files away. Every call you handle, every interaction with a complainant, every use of discretion — someone is learning from it.</p>
        <p>Effective patrol-level leaders do three things consistently: they set the standard by example, they communicate clearly under pressure, and they take ownership of outcomes instead of deflecting accountability.</p>
      </div>
      <div class="content-block">
        <h4>Decision-Making Under Pressure</h4>
        <p>The hallmark of a supervisory mindset is not speed — it\'s clarity. Before acting on a high-stress call, effective leaders apply a simple filter: <em>What is the right outcome here, and what\'s the fastest responsible path to it?</em> This separates reactive officers from supervisory candidates.</p>
        <p>Research from the Police Executive Research Forum (PERF) identifies the top predictor of officer promotion as demonstrated judgment during ambiguous situations — not seniority, not test scores alone.</p>
        <div class="case-law-box">
          <div class="case-title">Terry v. Ohio, 392 U.S. 1 (1968)</div>
          <p>An investigative stop requires individualized reasonable articulable suspicion of criminal activity. Presence in a location — even in a group — does not supply the basis for individual stops. Leaders who understand this standard make better decisions faster, and teach the officers around them to do the same. A supervisor who bypasses this standard to clear a call fast exposes the department to civil liability and trains junior officers to do the same.</p>
        </div>
      </div>
      <div class="content-block">
        <h4>Accountability vs. Blame</h4>
        <p>Accountability means owning the outcome of your decisions — good or bad. Blame is pointing outward. The distinction matters on every call, but it matters most when something goes wrong. Officers who demonstrate accountability without being prompted earn supervisory trust faster than any other quality.</p>
        <p>When correcting a junior officer, the method matters as much as the correction itself. Public corrections damage working relationships and shut down the learning. Private, direct, one-on-one feedback — delivered without condescension — is the model that builds rather than breaks.</p>
        <div class="sop-box">
          <div class="sop-title">MTPD ALO 1.01 — Chain of Command</div>
          <p>All officers are expected to operate within the chain of command and to support supervisory decisions in the field. Officers who identify concerns with a directive shall address them through proper channels — not in the field in front of personnel or the public. Senior officers carry responsibility for modeling this standard in every patrol contact.</p>
        </div>
      </div>
      <div class="content-block">
        <h4>18 Pa. C.S. § 3503 — Criminal Trespass</h4>
        <p>For a lawful trespass warning to support enforcement, property must be posted with conspicuous signage, fenced in a manner designed to exclude intruders, or the subject must have received direct communication that entry is not permitted. Officers responding to "loitering" complaints must assess whether the trespass statute\'s elements are actually met before taking enforcement action — understanding this law before arriving on scene is part of patrol-level leadership.</p>
        <button class="btn-launch" onclick="startScenario('leadership')">Proceed to Scenario Exercise →</button>
      </div>
    `;

/* ══════════════════════════════════════════
   SUPERVISOR OVERLAY — Leadership & Supervision (MTPD)
══════════════════════════════════════════ */
const SUPERVISOR_LEADERSHIP = `
  <div class="content-block">
    <h4>Supervisor Focus</h4>
    <h2>Everything the patrol officer just read about leading by example, you now do from the rank that makes it official. The squad models what you model.</h2>
    <p>At the patrol level, leadership is influence without authority. As a supervisor, you have the authority — and with it the obligation to set the standard on purpose. The officers watching you will adopt how you make decisions under pressure, how you correct mistakes, and whether you own outcomes or deflect them. ALO 1.01 makes you responsible for modeling the chain-of-command standard in every contact, and Terry and the trespass statute are the kinds of decisions where your example either raises the squad's judgment or lowers it.</p>
  </div>
  <div class="content-block">
    <h4>Correct in Private, Support in Public</h4>
    <h2>How you correct is itself the lesson the rest of the squad learns.</h2>
    <p>ALO 1.01 requires officers to operate within the chain of command and to raise concerns through proper channels — not in the field in front of personnel or the public. That cuts both ways for a supervisor. When you correct an officer, do it privately, directly, and without condescension: public corrections damage the working relationship and shut down the learning, and they tell every other officer present that a mistake means humiliation. When an officer disagrees with your directive in the field, you hold the chain of command in the moment and take the substantive concern through channels afterward — and you model exactly that when a directive from above lands on you. The officers learn the standard from how you carry it, not from how you describe it.</p>
  </div>
  <div class="content-block">
    <h4>Teach the Terry Standard — Don't Bypass It to Clear a Call</h4>
    <p>Under Terry v. Ohio, an investigative stop requires individualized reasonable articulable suspicion of criminal activity — presence in a location, even in a group, does not supply the basis for individual stops. As a supervisor you set the squad's habits here. If you direct or tolerate a group stop with no individualized suspicion to clear a "loitering" call quickly, you have trained your officers to do the same and exposed the department to civil liability. The leadership move is to teach the standard so officers make better decisions faster — articulate the individualized suspicion or do not make the stop. The same discipline applies to a trespass complaint: under 18 Pa. C.S. § 3503, enforcement requires conspicuous posting, exclusionary fencing, or direct communication that entry is not permitted, so before anyone is warned or charged, confirm the statute's elements are actually met rather than treating a "loitering" call as automatic enforcement.</p>
  </div>
  <div class="content-block">
    <h4>Model Accountability, Not Blame</h4>
    <ul class="key-points">
      <li><strong>Own the outcome</strong> — Accountability is owning your decisions, good or bad; blame is pointing outward. When something on your shift goes wrong, the squad watches whether you account for it or deflect — and they will copy whichever they see.</li>
      <li><strong>Reward unprompted accountability</strong> — An officer who owns a mistake without being cornered into it is showing the single trait that most earns supervisory trust. Recognize it; do not punish the honesty.</li>
      <li><strong>Decision filter under pressure</strong> — Teach the squad the leader's filter: what is the right outcome here, and what is the fastest responsible path to it? Clarity, not speed, is the supervisory standard.</li>
    </ul>
  </div>
  <div class="content-block">
    <h4>From Catch to Correction</h4>
    <p>Your patrol-level leadership shows up in how the officers around you make decisions when you are not watching. Coach the Terry and § 3503 standards before they are needed, correct privately, and model accountability so it spreads. A pattern — an officer who repeatedly stops on hunch alone, or undermines directives in front of the public — is a documented coaching and, if it persists, a supervisory issue you address through channels. The standard you model in every contact is the one the squad makes its own.</p>
  </div>
`;

function getLeadershipSupervisorQuestions() {
  return [
    {
      scenario: 'On a call with several officers and members of the public present, a junior officer questions your directive loudly and starts arguing the point in front of everyone.',
      text: 'What does MTPD ALO 1.01 indicate is the correct handling, both in the moment and after?',
      options: [
        'Argue the point back at the officer in front of everyone present, so that your authority is clearly established.',
        'Drop your directive immediately and entirely, so that the junior officer does not feel challenged by you.',
        'Order the officer off the call and write him up on the spot, in front of the whole group on scene.',
        'Hold the chain of command in the moment — the directive stands and is followed — and take the officer\'s substantive concern through proper channels privately afterward, because ALO 1.01 requires concerns to be raised through channels, not in the field in front of personnel or the public.'
      ],
      correct: 3,
      feedback: 'Correct. MTPD ALO 1.01 requires officers to operate within the chain of command and raise concerns through proper channels rather than in the field in front of personnel or the public. The directive holds in the moment; the concern is addressed privately through channels afterward.'
    },
    {
      scenario: 'You need to correct an officer who mishandled a contact. Other officers and a complainant are still on scene.',
      text: 'What is the leadership-consistent way to deliver the correction?',
      options: [
        'Correct the officer immediately and publicly on scene, so that everyone present learns from the mistake at once.',
        'Deliver the correction privately, directly, and without condescension once you can do so away from the public and the rest of the squad, because public corrections damage the relationship and shut down the learning.',
        'Say nothing at all to the officer about it, in order to avoid any appearance of conflict on scene.',
        'Have another officer on the squad relay the correction to him, so that you are not personally involved.'
      ],
      correct: 1,
      feedback: 'Correct. The module\'s standard — reinforced by the chain-of-command expectation in ALO 1.01 — is that private, direct, one-on-one feedback builds while public correction breaks. Correct privately and without condescension; the manner of correction is itself the lesson the squad absorbs.'
    },
    {
      scenario: 'Responding to a "group loitering" complaint, a newer officer on your squad starts to detain everyone present to "sort them out," with nothing individualized about any one person.',
      text: 'What is your supervisory move under Terry v. Ohio?',
      options: [
        'Let him detain the entire group — presence at the scene of the complaint is enough to stop everyone there.',
        'Direct the officer to detain only the people in the group who happen to look nervous to him.',
        'Stop the group detention and coach the standard — Terry requires individualized reasonable articulable suspicion for each person, and presence in a location, even in a group, does not supply it; have the officer articulate individualized suspicion or not make the stop.',
        'Tell the officer to just clear the call as fast as he possibly can, however he himself sees fit.'
      ],
      correct: 2,
      feedback: 'Correct. Terry v. Ohio requires individualized reasonable articulable suspicion; presence in a location, even in a group, is not a basis for individual stops. The supervisory move is to teach the standard and require individualized suspicion — bypassing it to clear a call fast trains officers wrong and exposes the department to liability.'
    },
    {
      scenario: 'A business owner wants several people removed and charged with trespass for standing in a parking lot. There is no posted signage, no exclusionary fencing, and no one has been told to leave. A squad officer asks whether he should start charging them.',
      text: 'How do you guide him under 18 Pa. C.S. § 3503?',
      options: [
        'Hold off on enforcement until the statute\'s elements are met — § 3503 requires conspicuous posting, exclusionary fencing, or direct communication that entry is not permitted; without one of those, give lawful notice first rather than charging on the owner\'s say-so.',
        'Charge them — a property owner\'s request to have people removed is by itself sufficient for trespass enforcement.',
        'Detain everyone present in the lot under Terry while you investigate the possible trespass further.',
        'Tell the owner that there is simply nothing the police can ever do about people standing in a parking lot.'
      ],
      correct: 0,
      feedback: 'Correct. 18 Pa. C.S. § 3503 requires conspicuous posting, exclusionary fencing, or direct communication that entry is not permitted before a trespass warning supports enforcement. The supervisor guides the officer to confirm the elements — typically by giving lawful notice first — rather than charging on the owner\'s request alone.'
    },
    {
      scenario: 'After a call on your shift goes sideways, an officer immediately blames dispatch, the complainant, and his partner, and accepts no part of the outcome himself. The rest of the squad is watching how you respond.',
      text: 'What does modeling accountability require of you here?',
      options: [
        'Endorse the officer\'s deflection openly, so that he feels fully supported by you in front of the rest of the squad.',
        'Reinforce accountability — privately address the deflection, have the officer account for his own decisions, and own your share of the shift\'s outcome openly, because the squad copies whether their supervisor accounts for outcomes or points outward.',
        'Blame the officer publicly in front of the squad, in order to make a clear example out of him for the others.',
        'Ignore the deflection entirely — how individual officers choose to handle blame is not a supervisory concern.'
      ],
      correct: 1,
      feedback: 'Correct. Accountability is owning decisions; blame is pointing outward, and the squad adopts whichever the supervisor models. The move is to address the deflection privately, require the officer to account for his own decisions, and own your share openly — modeling the trait that most earns supervisory trust.'
    },
    {
      scenario: 'An officer comes to you and, unprompted, admits he made a poor decision on a call earlier that created a problem, and asks how to make it right.',
      text: 'What is the supervisory response most consistent with building the squad\'s standard?',
      options: [
        'Punish the admission harshly and visibly, in order to deter the officer and others from future mistakes.',
        'Tell him to simply never mention the decision again, and then move on from it without any further discussion.',
        'Recognize the unprompted accountability, address the underlying decision constructively, and work the corrective path with him, because owning a mistake without being cornered is the trait that most earns supervisory trust and you do not want to train officers to hide it.',
        'Bring the officer\'s mistake up in front of the whole squad later, using it as a cautionary tale for everyone.'
      ],
      correct: 2,
      feedback: 'Correct. Officers who demonstrate accountability without being prompted are showing the single trait that most earns supervisory trust. Punishing the honesty trains officers to hide mistakes. Recognize the accountability, address the decision constructively, and work the correction.'
    },
    {
      scenario: 'A high-stress call is unfolding and a junior officer freezes, looking to you for what "fast" looks like. You want to model the supervisory decision-making the module describes.',
      text: 'What is the leader\'s decision filter you should demonstrate and teach?',
      options: [
        'Apply the clarity filter — what is the right outcome here, and what is the fastest responsible path to it — because the hallmark of a supervisory mindset is clarity, not raw speed, and demonstrated judgment in ambiguous situations is the top predictor of promotion.',
        'Act as fast as is physically possible in the moment — sheer speed is the real mark of a supervisor.',
        'Wait for someone of a higher rank to arrive on scene before you do anything at all about the call.',
        'Default immediately to the most forceful option available, in order to look decisive in front of the officer.'
      ],
      correct: 0,
      feedback: 'Correct. The module identifies clarity, not speed, as the supervisory hallmark, and the leader\'s filter is "what is the right outcome here, and what is the fastest responsible path to it?" PERF research identifies demonstrated judgment in ambiguous situations as the top predictor of promotion — model and teach that filter.'
    },
    {
      scenario: 'One officer on your squad has repeatedly made group stops on "loitering" calls without individualized suspicion and has twice undercut your directives in front of the public. You have coached him on both points before.',
      text: 'What is the appropriate supervisory response now?',
      options: [
        'Keep coaching the officer informally each time and simply hope that the lesson eventually sticks with him.',
        'Stop giving that particular officer any directives at all on calls, in order to avoid being undercut by him.',
        'Take no action — the suspicionless stops and field disagreements are really just personality differences.',
        'Move to documented coaching and, if it persists, a supervisory issue addressed through channels and training on the Terry standard and ALO 1.01, because a repeated pattern after coaching is no longer a one-off and carries liability and chain-of-command consequences.'
      ],
      correct: 3,
      feedback: 'Correct. One instance is a coaching moment; a documented pattern after coaching — suspicionless group stops and field insubordination — is a supervisory issue to address through proper channels with documented coaching and training on Terry and ALO 1.01, consistent with the chain-of-command standard you are charged with modeling.'
    },
  ];
}

/* ══════════════════════════════════════════
   SUPERVISOR SCENARIO — Leadership & Supervision (MTPD)
   You are the supervisor on a Main Street loitering call with Officer
   Marsh on your squad. Fictional officer.
══════════════════════════════════════════ */
const SCENARIO_LEADERSHIP_SUP = {
  id: 'scenario-leadership-sup',
  title: 'Supervisor on Scene — Main Street Loitering Call',
  location: 'Main Street, Marlborough Township, PA',
  totalDecisions: 3,
  nodes: {
    'start': {
      type: 'scene',
      time: '21:10',
      weather: 'Clear, warm',
      unit: 'Shift Supervisor',
      narrative: [
        'You respond as the shift supervisor to a "group loitering" complaint at a business lot on Main Street. A business owner wants a group of people standing in the lot removed and charged.',
        'Officer Marsh, newer to the squad, arrives with you. How you handle the law, the correction, and your own example will set what Marsh carries to the next call.'
      ],
      next: 'd1'
    },
    'd1': {
      type: 'decision',
      decisionNumber: 1,
      situation: 'Marsh moves to detain the entire group "to sort them out." Nothing about any individual suggests a specific crime — they are simply standing in the lot. There is no posted signage, no fencing, and no one has been told to leave.',
      question: 'What do you do?',
      options: [
        { text: 'Let Marsh detain the group — they are at the scene of the complaint.', next: 'c1a', quality: 'bad', shortLabel: 'Allowed a suspicionless group detention' },
        { text: 'Stop the group detention and coach the standard on the spot — Terry needs individualized suspicion, and § 3503 needs posting, fencing, or notice before trespass enforcement; give lawful notice first if removal is warranted.', next: 'c1b', quality: 'good', shortLabel: 'Taught Terry and § 3503 before acting' },
        { text: 'Tell Marsh to detain only the ones who "look nervous."', next: 'c1c', quality: 'bad', shortLabel: 'Substituted a hunch for suspicion' },
        { text: 'Tell Marsh to just clear the call fast however he wants.', next: 'c1d', quality: 'bad', shortLabel: 'Prioritized speed over the standard' },
      ]
    },
    'c1a': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'You Just Trained the Wrong Habit',
      heading: 'A group detention on presence alone is a Terry violation — and now it\'s Marsh\'s template.',
      narrative: [
        'Letting Marsh detain everyone with no individualized suspicion exposes the department to a civil claim and teaches your newest officer that "everyone at the scene" is a lawful basis to stop people. It is not.',
        'What you permit, you teach.'
      ],
      legal: 'Terry v. Ohio (1968): an investigative stop requires individualized reasonable articulable suspicion; presence in a location, even in a group, does not supply it.',
      next: 'd2'
    },
    'c1b': {
      type: 'consequence', outcomeClass: 'outcome-good', outcomeLabel: 'Taught the Standard in Real Time',
      heading: 'You held the line on Terry and § 3503 and turned the call into a lesson.',
      narrative: [
        'You stop the group detention, quietly walk Marsh through the individualized-suspicion requirement, and explain that trespass enforcement needs posting, fencing, or actual notice — so if the owner wants people gone, lawful notice comes first. Marsh handles it correctly, and he carries the standard to the next call.',
        'Teaching the standard before it is needed is patrol-level leadership from the supervisor\'s seat.'
      ],
      legal: 'Terry v. Ohio (1968): individualized reasonable articulable suspicion. 18 Pa. C.S. § 3503: posting, exclusionary fencing, or direct communication that entry is not permitted before trespass enforcement.',
      next: 'd2'
    },
    'c1c': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Nervous Is Not Suspicion',
      heading: '"Looks nervous" is not the individualized basis Terry requires.',
      narrative: [
        'Directing Marsh to detain the ones who "look nervous" swaps a hunch for the articulable, individualized suspicion the law demands, and teaches him to do the same. Nervousness alone does not establish reasonable suspicion of a specific crime.',
        'Require articulable individualized facts, or no stop.'
      ],
      legal: 'Terry v. Ohio (1968): the suspicion must be individualized and articulable as to criminal activity — not a general impression.',
      next: 'd2'
    },
    'c1d': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Speed Is Not the Standard',
      heading: 'Telling Marsh to clear it fast however he wants invites the violation.',
      narrative: [
        'Prioritizing speed over the standard is exactly what the module warns against — the supervisory hallmark is clarity, not speed, and "clear it fast" on this call points straight to a suspicionless stop or an unlawful trespass charge.',
        'Give Marsh the filter: the right outcome, and the fastest responsible path to it.'
      ],
      legal: 'Terry v. Ohio (1968) and 18 Pa. C.S. § 3503 set the standards that "clear it fast" would bypass; clarity, not speed, is the supervisory mark.',
      next: 'd2'
    },
    'd2': {
      type: 'decision',
      decisionNumber: 2,
      situation: 'As you sort the call out, Marsh openly disagrees with how you are handling it and starts arguing the point in front of the group and the business owner.',
      question: 'How do you handle the field disagreement?',
      options: [
        { text: 'Argue it out with Marsh in front of everyone to assert your authority.', next: 'c2a', quality: 'bad', shortLabel: 'Argued in front of the public' },
        { text: 'Hold the directive in the moment, keep it professional, and tell Marsh you will hear his concern privately after the call — then actually do.', next: 'c2b', quality: 'good', shortLabel: 'Chain of command now, concern through channels after' },
        { text: 'Abandon your approach on the spot so Marsh stops pushing back.', next: 'c2c', quality: 'bad', shortLabel: 'Caved to avoid public conflict' },
        { text: 'Dress Marsh down publicly and order him back to his car.', next: 'c2d', quality: 'bad', shortLabel: 'Publicly humiliated the officer' },
      ]
    },
    'c2a': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'A Public Argument Undermines You Both',
      heading: 'Trading arguments in front of the public is exactly what ALO 1.01 forbids.',
      narrative: [
        'Arguing it out in front of the group and the owner undercuts the chain of command in the moment and tells everyone present that directives are negotiable on the street. It also models for Marsh that field disagreements are settled by who argues loudest.',
        'Hold the line now; take the substance through channels later.'
      ],
      legal: 'MTPD ALO 1.01: concerns with a directive are raised through proper channels — not in the field in front of personnel or the public.',
      next: 'd3'
    },
    'c2b': {
      type: 'consequence', outcomeClass: 'outcome-good', outcomeLabel: 'Held the Chain, Heard the Officer',
      heading: 'Directive stands in the field; the concern goes through channels after.',
      narrative: [
        'You keep it professional, the directive holds, and you tell Marsh you will hear him out after the call — then you follow through and actually listen. Marsh learns both halves of ALO 1.01 by watching you live it: support the decision in the field, raise the concern through channels.',
        'That is the chain-of-command standard the policy charges you to model.'
      ],
      legal: 'MTPD ALO 1.01: operate within the chain of command and support supervisory decisions in the field; raise concerns through proper channels.',
      next: 'd3'
    },
    'c2c': {
      type: 'consequence', outcomeClass: 'outcome-neutral', outcomeLabel: 'Don\'t Cave to End the Friction',
      heading: 'Abandoning a correct approach because an officer pushed back teaches the wrong lesson.',
      narrative: [
        'If your handling was right, dropping it in the field to stop the pushback rewards public argument and tells Marsh that persistence overrides the chain of command. Hold the directive and take his concern through channels.',
        'Listen later — but do not let the field become the place decisions get re-litigated.'
      ],
      legal: 'MTPD ALO 1.01: supervisory decisions are supported in the field; concerns are addressed through channels, not by capitulation on scene.',
      next: 'd3'
    },
    'c2d': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Right to Correct, Wrong to Humiliate',
      heading: 'A public dressing-down breaks the officer and the squad\'s trust in you.',
      narrative: [
        'Marsh did need correcting, but humiliating him in front of the public and the group shuts down the learning and tells the whole squad that a mistake means humiliation. The correction belongs in private, direct and without condescension.',
        'Hold the line on scene; correct him away from the audience.'
      ],
      legal: 'MTPD ALO 1.01 and the module\'s standard: hold the chain of command in the field, but deliver correction privately — public correction damages the relationship and the learning.',
      next: 'd3'
    },
    'd3': {
      type: 'decision',
      decisionNumber: 3,
      situation: 'The call ends without incident. Privately afterward, Marsh — unprompted — tells you he realizes he was about to make an unlawful stop and handled the disagreement poorly, and asks how to do better.',
      question: 'How do you respond?',
      options: [
        { text: 'Write him up formally for both the near-stop and the field disagreement to make the point stick.', next: 'c3a', quality: 'risky', shortLabel: 'Punished the honesty' },
        { text: 'Recognize the unprompted accountability, walk him through the Terry and § 3503 standards and the chain-of-command point, and treat it as the teaching moment it is.', next: 'c3b', quality: 'good', shortLabel: 'Rewarded accountability, coached the standards' },
        { text: 'Tell him to forget it ever happened and never bring it up again.', next: 'c3c', quality: 'bad', shortLabel: 'Buried the learning' },
        { text: 'Raise it as a cautionary tale in front of the whole squad at briefing.', next: 'c3d', quality: 'bad', shortLabel: 'Made a public example of a private admission' },
      ]
    },
    'c3a': {
      type: 'consequence', outcomeClass: 'outcome-neutral', outcomeLabel: 'You Just Taught Him to Stop Talking',
      heading: 'Formally punishing an unprompted admission trains officers to hide mistakes.',
      narrative: [
        'Marsh owned his mistake before anyone cornered him — the exact trait that earns supervisory trust. Meeting that with formal discipline teaches him, and the squad, that honesty is dangerous and mistakes are better concealed.',
        'There is a place for documentation when patterns persist; an unprompted first-time admission is a teaching moment.'
      ],
      legal: 'Module standard: officers who demonstrate accountability without being prompted earn supervisory trust; punishing the honesty trains concealment.',
      next: 'debrief'
    },
    'c3b': {
      type: 'consequence', outcomeClass: 'outcome-good', outcomeLabel: 'The Moment Leadership Pays Off',
      heading: 'You rewarded the accountability and turned it into real learning.',
      narrative: [
        'You acknowledge that owning the mistake unprompted is exactly the right instinct, then walk Marsh through the individualized-suspicion standard, the § 3503 elements, and the chain-of-command point about raising concerns through channels. He leaves better, and more likely to come to you next time.',
        'This is the whole game: model the standard, correct in private, and make accountability safe so it spreads.'
      ],
      legal: 'Terry v. Ohio (1968); 18 Pa. C.S. § 3503; MTPD ALO 1.01 — taught constructively in a private correction.',
      next: 'debrief'
    },
    'c3c': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'A Wasted Teaching Moment',
      heading: '"Forget it" throws away the most coachable moment you\'ll get.',
      narrative: [
        'Telling Marsh to forget it leaves the underlying Terry and § 3503 gaps uncorrected and signals that you would rather not engage. The officer came to you ready to learn; meeting that with silence wastes it.',
        'Walk him through the standards — that is the point of the conversation.'
      ],
      legal: 'Module standard: the correction and the teaching are the supervisor\'s job; an unaddressed legal gap will resurface on the next call.',
      next: 'debrief'
    },
    'c3d': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Don\'t Make a Private Admission Public',
      heading: 'Turning his honest admission into a squad-wide cautionary tale punishes the trust he showed you.',
      narrative: [
        'Marsh confided his mistake privately. Airing it at briefing as an example humiliates him and tells the whole squad that honesty with you becomes a public lesson — so they will stop being honest.',
        'Keep the correction private; teach the standards to the squad in the abstract if it is a common gap.'
      ],
      legal: 'MTPD ALO 1.01 and the module standard: correction is private and direct; public exposure of a private admission breaks trust and the learning.',
      next: 'debrief'
    },
    'debrief': { type: 'debrief' },
  }
};
