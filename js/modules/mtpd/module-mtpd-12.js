/* ═══════════════════════════════════════════
   MTPD — Module 12: De-escalation

   Reading extracted byte-for-byte from the former app.js hardcoded
   branch. Supervisor variants anchored to MTPD ALO 5.4 and the law in
   the reading (Graham v. Connor; PA MHPA 50 P.S. § 7302; Act 59 of
   2020). Never borrow EGPD policy, framing, or roads.
═══════════════════════════════════════════ */

const READING_DEESCALATION = `
      <div class="content-block">
        <h4>Scenario</h4>
        <h2>A call for a disorderly person at the township park. When you arrive, a man in his 40s is pacing, yelling at no one in particular, and refuses to acknowledge your presence. Bystanders are backing away. You\'re alone for the next four minutes.</h2>
        <p>This module covers the Graham v. Connor framework as it applies to force avoidance, MTPD ALO 5.4 de-escalation requirements, the Pennsylvania Mental Health Procedures Act § 7302, and CIT protocols for high-tension contacts.</p>
      </div>
      <div class="content-block">
        <h4>Core Principle</h4>
        <h2>De-escalation Is Not Passivity — It Is a Legal Requirement and a Tactical Skill</h2>
        <p>MTPD ALO 5.4 requires officers to consider and employ de-escalation techniques in all situations where it is safe and feasible to do so before applying physical force, and Pennsylvania Act 59 of 2020 mandates annual statewide training in de-escalation. This is not a recommendation — it is a documented policy requirement. Officers who skip de-escalation when time and safety permitted are not only making a tactical error; they are creating policy violations and legal exposure for themselves and the department.</p>
        <p>De-escalation is not about backing down. It is about deploying your most effective tools first. Verbal skills, tactical positioning, time, and tone are tools. In most encounters involving a non-compliant or agitated person, they are more effective than physical force — and they build the documented record that protects you if force eventually becomes necessary.</p>
        <div class="case-law-box">
          <div class="case-title">Graham v. Connor, 490 U.S. 386 (1989) — De-escalation Dimension</div>
          <p>Graham established objective reasonableness as the standard for every use of force. Pennsylvania courts have applied this standard to ask not only whether the force used was reasonable, but whether the officer took reasonable steps to avoid the need for force. An officer who bypasses available de-escalation when time and safety permitted will face scrutiny under this standard in any resulting civil or criminal proceeding.</p>
        </div>
        <div class="case-law-box">
          <div class="case-title">Pennsylvania Mental Health Procedures Act — 50 P.S. § 7302</div>
          <p>When a contact involves a person who may be experiencing acute psychiatric distress, § 7302 provides authority for involuntary examination when there is a recent overt act, attempt, or threat establishing clear and present danger. The officer\'s approach — particularly whether de-escalation was employed first — is part of the record when a 302 is initiated. Document de-escalation efforts with the same specificity you document any other use of authority.</p>
        </div>
      </div>
      <div class="content-block">
        <h4>MTPD ALO 5.4 — De-escalation Policy</h4>
        <div class="sop-box">
          <div class="sop-title">MTPD Order 5.4 — When De-escalation Is Required</div>
          <p>Officers shall consider and employ de-escalation techniques in all situations where it is safe and feasible to do so before applying physical force. The determination of safety and feasibility is made by the officer on scene, based on the totality of circumstances — but it must be a genuine assessment, not a conclusion reached after the decision to use force was already made. When de-escalation is employed, officers shall document the specific techniques used, the subject\'s response, and the reason de-escalation was or was not continued.</p>
        </div>
        <div class="sop-box">
          <div class="sop-title">MTPD Order 5.4 — Core De-escalation Techniques</div>
          <p>Authorized and expected de-escalation techniques include: creating distance and slowing the pace of the encounter; using calm, non-threatening verbal communication; giving the subject space to make voluntary choices; reducing the number of officers present when safe; using a designated primary contact officer while others maintain supporting positions; and requesting CIT-trained personnel or mental health resources when available and appropriate.</p>
        </div>
      </div>
      <div class="content-block">
        <h4>CIT Protocols for High-Tension Contacts</h4>
        <h2>The tactical framework doesn\'t change. Your tools do.</h2>
        <ul class="key-points">
          <li><strong>Create time and space.</strong> Distance is your greatest asset. A subject who cannot close with you cannot harm you. Tactical positioning that creates space also reduces the subject\'s perception of threat — lowering the probability of escalation.</li>
          <li><strong>Lower your energy to lower theirs.</strong> Calm, even tone. Slow pace. No sudden movements. The officer\'s nervous system sets the ceiling for the encounter — if you are escalating, the encounter will escalate with you.</li>
          <li><strong>Use the person\'s name when known.</strong> Names humanize the contact and signal that you are addressing a specific person, not a threat to be managed.</li>
          <li><strong>One officer speaks.</strong> Multiple simultaneous voices create sensory overload for someone in acute distress. Designate the contact officer. Others hold position and monitor.</li>
          <li><strong>Validate before directing.</strong> "I can see you\'re upset" is not agreement — it is acknowledgment that reduces defensive arousal and opens the window for compliance. Validation comes before direction.</li>
          <li><strong>Know your escalation thresholds.</strong> De-escalation is not infinite. If the subject closes distance aggressively, displays a weapon, or takes an action creating imminent threat, your force options are live. Document the specific change in circumstances that closed the de-escalation window.</li>
        </ul>
        <button class="btn-launch" onclick="startScenario('de-escalation')">Proceed to Scenario Exercise →</button>
      </div>
    `;

/* ══════════════════════════════════════════
   SUPERVISOR OVERLAY — De-escalation (MTPD)
══════════════════════════════════════════ */
const SUPERVISOR_DEESCALATION = `
  <div class="content-block">
    <h4>Supervisor Focus</h4>
    <h2>ALO 5.4 makes de-escalation a documented requirement, not a preference — so on review, the absence of de-escalation where it was safe and feasible is a policy problem, and its presence is part of the record that protects the officer.</h2>
    <p>De-escalation sits at the intersection of policy, tactics, and liability. When you review a force-involved contact, you are answering two questions: did the officer consider and employ de-escalation where it was safe and feasible, as ALO 5.4 requires, and did the report document the effort with the specificity the order demands? Under the Graham de-escalation dimension, courts ask not only whether the force was reasonable but whether the officer took reasonable steps to avoid it — which means the de-escalation record is part of the force file, every time.</p>
  </div>
  <div class="content-block">
    <h4>Was De-escalation Considered Where It Was Safe and Feasible?</h4>
    <h2>"Safe and feasible" is a genuine on-scene assessment — not a line written after force was already chosen.</h2>
    <p>ALO 5.4 requires officers to consider and employ de-escalation in all situations where it is safe and feasible before applying physical force, and it is explicit that the safety-and-feasibility determination must be a genuine assessment, not a conclusion reached after the decision to use force was already made. On review, when a report shows time and space were available — a single agitated subject, distance, no immediate threat — and the officer closed distance and went hands-on without any de-escalation, that is a policy gap to address, not a judgment to rubber-stamp. The Graham de-escalation dimension makes it a liability gap too: bypassing available de-escalation when time and safety permitted invites scrutiny in any civil or criminal proceeding.</p>
  </div>
  <div class="content-block">
    <h4>Document the Effort to the ALO 5.4 Standard</h4>
    <ul class="key-points">
      <li><strong>Specific techniques, response, and continuation</strong> — When de-escalation is employed, ALO 5.4 requires the report to document the specific techniques used, the subject's response, and the reason de-escalation was or was not continued. A report that says only "attempted to de-escalate" does not meet the standard; return it for the specifics.</li>
      <li><strong>The record protects the officer</strong> — A documented de-escalation effort is the officer's best evidence under the Graham de-escalation dimension that reasonable steps to avoid force were taken. A thin record on a sound de-escalation is a documentation fix, not a force problem.</li>
      <li><strong>Part of the 302 record too</strong> — Where a contact involves apparent psychiatric distress and a 302 follows, § 7302 makes the officer's approach — particularly whether de-escalation was employed first — part of the record. Confirm both the de-escalation and the § 7302 basis are documented.</li>
    </ul>
  </div>
  <div class="content-block">
    <h4>Recognize the Authorized Techniques on Review</h4>
    <p>ALO 5.4 names the expected techniques, and your review should recognize them: creating distance and slowing the pace, calm non-threatening verbal communication, giving the subject space to make voluntary choices, reducing the number of officers present when safe, using a designated primary contact officer while others support, and requesting CIT or mental-health resources when available and appropriate. When a report reflects these, it reflects the standard. When a force-involved report reflects none of them on a contact where they were feasible, that is the catch. And support the officers who use them: an officer who took time, created space, and called for resources made the right call even when force ultimately became necessary, and your review should say so.</p>
  </div>
  <div class="content-block">
    <h4>From Catch to Correction</h4>
    <p>Coach officers to treat de-escalation as a tool deployed first and documented fully, not a box checked after force. A single thin record is a coaching moment and a rewrite; a pattern of force applied without considering available de-escalation, or de-escalation never documented, is a supervisory and training issue you address and escalate — and one with direct Graham-dimension liability exposure. Every force report you approve is a representation that reasonable steps to avoid force were taken and recorded.</p>
  </div>
`;

function getDeescalationSupervisorQuestions() {
  return [
    {
      scenario: 'You review a use-of-force report from a disorderly-person call. A single agitated man was pacing and yelling but had no weapon and made no specific threat. The report shows the officer closed distance immediately, gave one command, and took the man to the ground. There is nothing about distance, time, verbal techniques, or resources.',
      text: 'What is the correct supervisory assessment under MTPD ALO 5.4?',
      options: [
        'Address the policy gap — ALO 5.4 required the officer to consider and employ de-escalation where it was safe and feasible, and with a single unarmed subject, distance, and no immediate threat, the report shows none was attempted; that is a policy and Graham-dimension problem, not a judgment to rubber-stamp.',
        'Approve it — once a subject becomes agitated like this, immediate physical control is always justified.',
        'Return it to the officer only for a more detailed written description of how the takedown was performed.',
        'Approve it on the basis that the subject was being non-compliant with the officer at the time.'
      ],
    },
    {
      scenario: 'A report\'s only reference to de-escalation reads: "Attempted to de-escalate the subject but it was unsuccessful, so force was used." Nothing describes what was tried or how the subject responded.',
      text: 'What does ALO 5.4 require before you approve it?',
      options: [
        'Approve it — simply stating in the report that de-escalation was attempted is sufficient for the standard.',
        'Reject the use of force outright, on the basis that the attempted de-escalation ultimately failed.',
        'Approve it now and just add the missing de-escalation details to the narrative yourself.',
        'Return it for the specifics ALO 5.4 requires — the specific techniques used, the subject\'s response, and the reason de-escalation was or was not continued — because a bare "attempted to de-escalate" does not meet the documentation standard and is also the officer\'s best protection under Graham.'
      ],
    },
    {
      scenario: 'A use-of-force report states the officer "determined de-escalation was not safe or feasible." The narrative shows the officer reached that conclusion only after he had already decided to go hands-on, and the scene had a single subject at a distance with no weapon.',
      text: 'How do you handle the "not safe or feasible" determination?',
      options: [
        'Accept it as written — the officer on scene has sole and total discretion to declare de-escalation infeasible.',
        'Challenge it — ALO 5.4 requires the safety-and-feasibility determination to be a genuine assessment, not a conclusion reached after the decision to use force was already made; on these facts de-escalation appears to have been feasible, so the report and the decision need to be addressed.',
        'Approve it on the basis that the officer used exactly the right policy language in the determination.',
        'Return it to the officer only to fix and clean up the wording of the feasibility determination.'
      ],
    },
    {
      scenario: 'An officer took time, created distance, used a calm tone, requested a CIT-trained unit, and gave the subject choices. The subject still escalated to an imminent threat and force became necessary. The report documents all of it.',
      text: 'What is the correct supervisory review outcome?',
      options: [
        'Flag the officer for using force on the subject despite having de-escalated the encounter first.',
        'Return it on the basis that proper de-escalation should have prevented the need for any force at all.',
        'Affirm that the officer met the ALO 5.4 standard — the authorized techniques were used and documented, and de-escalation does not mean force is never justified; the documented effort is exactly what protects the officer under the Graham de-escalation dimension.',
        'Approve it, but note for the officer that requesting a CIT-trained unit was ultimately unnecessary.'
      ],
    },
    {
      scenario: 'A contact involved a person in apparent psychiatric distress, force was used, and a 302 was initiated. The report documents the force but says nothing about whether de-escalation was attempted first or the specific § 7302 basis for the 302.',
      text: 'What does your review require?',
      options: [
        'Approve it — the use of force and the 302 are entirely separate matters from de-escalation here.',
        'Approve the use of force as documented, but go ahead and void the 302 the officer initiated.',
        'Approve it on the basis that a 302 involuntary commitment does not actually require any narrative.',
        'Return it to document both the de-escalation approach and the specific § 7302 basis — because under § 7302 the officer\'s approach, particularly whether de-escalation was employed first, is part of the record when a 302 is initiated, and ALO 5.4 requires the de-escalation effort to be documented.'
      ],
    },
    {
      scenario: 'A newer officer asks you whether de-escalation means he is supposed to "just stand there and take it" from an aggressive subject.',
      text: 'How do you frame it for him?',
      options: [
        'Explain that de-escalation is not passivity but deploying the most effective tools first — time, distance, tone, positioning, resources — which are often more effective than force and build the record that protects him; force remains available when safety requires it.',
        'Tell him yes — de-escalation ultimately means avoiding the use of force no matter what happens.',
        'Tell him that de-escalation is really just paperwork and that he should ignore it tactically on calls.',
        'Tell him to use force first so that he stays safe, and then go back and de-escalate afterward.'
      ],
    },
    {
      scenario: 'You want to confirm an officer\'s report reflects the ALO 5.4 authorized techniques on a successful de-escalation.',
      text: 'Which set of actions reflects the techniques ALO 5.4 names?',
      options: [
        'Closing distance quickly, raising your volume, and issuing rapid commands in order to establish control.',
        'Surrounding the subject with as many officers as possible and then shouting commands at him together.',
        'Creating distance and slowing the pace, calm non-threatening communication, giving the subject space to make voluntary choices, reducing officers present when safe, using a designated primary contact officer, and requesting CIT or mental-health resources when appropriate.',
        'Immediately deploying a hands-on control technique in order to prevent any possible escalation.'
      ],
    },
    {
      scenario: 'Over several incidents, one officer\'s force reports repeatedly show no consideration of de-escalation on contacts where time and space were available, and twice declared it "not feasible" only after deciding to use force. You coached him on ALO 5.4 after the first report.',
      text: 'What is the appropriate supervisory response now?',
      options: [
        'Keep coaching the officer informally on it — he is decisive on calls and he clearly means well.',
        'Move to documented corrective action and targeted training on the ALO 5.4 de-escalation requirement and the Graham de-escalation dimension, because a repeated pattern after coaching is a supervisory and training issue with direct liability exposure; escalate as warranted.',
        'Stop reviewing his use-of-force reports as closely going forward, in order to save yourself some time.',
        'Take no action at all — each one of the uses of force was genuinely a separate situation.'
      ],
    },
  ];
}

/* ══════════════════════════════════════════
   SUPERVISOR SCENARIO — De-escalation (MTPD)
   You review Officer Okafor's use-of-force report from a township-park
   disorderly call. Fictional officer.
══════════════════════════════════════════ */
const SCENARIO_DEESCALATION_SUP = {
  id: 'scenario-de-escalation-sup',
  title: 'Supervisor Review — Township Park Use of Force',
  location: 'Report Review Desk, Marlborough Township, PA',
  totalDecisions: 3,
  nodes: {
    'start': {
      type: 'scene',
      time: '20:15',
      weather: 'Clear, mild',
      unit: 'Shift Supervisor',
      narrative: [
        'Officer Okafor\'s use-of-force report from a disorderly-person call at the township park is in your review queue. The subject was a single man, pacing and yelling, no weapon, no specific threat — and the encounter ended in a takedown.',
        'Under ALO 5.4, de-escalation is a documented requirement, and under the Graham de-escalation dimension the de-escalation record is part of the force file. Your review tests both.'
      ],
      next: 'd1'
    },
    'd1': {
      type: 'decision',
      decisionNumber: 1,
      situation: 'The report shows Okafor arrived, walked straight up to the pacing man, gave one loud command, and took him to the ground when he didn\'t comply. There was distance available, no weapon, no immediate threat, and bystanders had already backed away. Nothing in the report addresses de-escalation.',
      question: 'How do you handle it?',
      options: [
        { text: 'Approve it — an agitated, non-compliant subject justifies immediate control.', next: 'c1a', quality: 'bad', shortLabel: 'Approved force with no de-escalation' },
        { text: 'Address the policy gap — ALO 5.4 required considering and employing de-escalation where safe and feasible, and with distance, no weapon, and no immediate threat, none was attempted; that is a policy and Graham-dimension problem.', next: 'c1b', quality: 'good', shortLabel: 'Flagged the missing de-escalation' },
        { text: 'Return it only for a better description of the takedown.', next: 'c1c', quality: 'risky', shortLabel: 'Treated a policy gap as a writing gap' },
        { text: 'Approve it because the subject ignored the command.', next: 'c1d', quality: 'bad', shortLabel: 'Let non-compliance excuse skipping de-escalation' },
      ]
    },
    'c1a': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Force First, Policy Skipped',
      heading: 'A single unarmed subject with distance available is exactly where de-escalation was required.',
      narrative: [
        'Approving immediate force on an agitated but unarmed, non-threatening subject ratifies skipping a documented policy requirement. ALO 5.4 required considering de-escalation where it was safe and feasible, and the Graham de-escalation dimension asks whether reasonable steps to avoid force were taken — here, none were.',
        'Non-compliance alone does not unlock immediate force when time and space were available.'
      ],
      legal: 'MTPD ALO 5.4: consider and employ de-escalation where safe and feasible before physical force. Graham v. Connor (1989): courts ask whether reasonable steps to avoid force were taken.',
      next: 'd2'
    },
    'c1b': {
      type: 'consequence', outcomeClass: 'outcome-good', outcomeLabel: 'Caught the Policy Gap',
      heading: 'You held the contact to ALO 5.4 and the Graham de-escalation dimension.',
      narrative: [
        'You flag that with a single unarmed subject, distance, and no immediate threat, de-escalation was safe and feasible and ALO 5.4 required it to be considered and employed first. You address the decision and the missing record, not as a writing issue but as a policy and liability gap.',
        'This is the catch that keeps a force decision — and the department — defensible.'
      ],
      legal: 'MTPD ALO 5.4: de-escalation considered and employed where safe and feasible. Graham v. Connor (1989): reasonable steps to avoid force are part of the reasonableness analysis.',
      next: 'd2'
    },
    'c1c': {
      type: 'consequence', outcomeClass: 'outcome-neutral', outcomeLabel: 'Not Just a Writing Problem',
      heading: 'A better takedown description does not address skipped de-escalation.',
      narrative: [
        'Returning it only for takedown detail treats a policy and liability gap as a wording issue. The problem is not how the takedown was described — it is that de-escalation was feasible and neither considered nor employed.',
        'Address the de-escalation gap itself.'
      ],
      legal: 'MTPD ALO 5.4: the requirement is to consider and employ de-escalation where feasible; the gap is substantive, not stylistic.',
      next: 'd2'
    },
    'c1d': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Non-Compliance Is Not the Trigger',
      heading: 'Ignoring one command does not make immediate force the policy-compliant choice.',
      narrative: [
        'Approving on the basis that the subject ignored a command skips the ALO 5.4 question entirely: with distance and no threat, de-escalation was feasible and required first. Non-compliance is the situation de-escalation is built for, not an exception to it.',
        'Address the missing de-escalation.'
      ],
      legal: 'MTPD ALO 5.4: de-escalation is required where safe and feasible before force; non-compliance does not remove that requirement when time and space exist.',
      next: 'd2'
    },
    'd2': {
      type: 'decision',
      decisionNumber: 2,
      situation: 'You also note the report states, in one line, that Okafor "determined de-escalation was not safe or feasible." The surrounding narrative makes clear he reached that conclusion only after he had already decided to go hands-on, on a scene with one unarmed subject at a distance.',
      question: 'How do you handle the "not safe or feasible" determination?',
      options: [
        { text: 'Accept it — the determination is solely the on-scene officer\'s call.', next: 'c2a', quality: 'bad', shortLabel: 'Rubber-stamped a post-hoc determination' },
        { text: 'Challenge it — ALO 5.4 requires a genuine assessment, not a conclusion reached after force was already decided; on these facts de-escalation appears feasible, so the determination and the decision behind it must be addressed.', next: 'c2b', quality: 'good', shortLabel: 'Tested the genuineness of the determination' },
        { text: 'Approve it because the officer used the correct policy phrase.', next: 'c2c', quality: 'bad', shortLabel: 'Accepted the magic words' },
        { text: 'Return it only to reword the determination more carefully.', next: 'c2d', quality: 'risky', shortLabel: 'Treated it as a wording fix' },
      ]
    },
    'c2a': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'A Post-Hoc Label Isn\'t an Assessment',
      heading: 'ALO 5.4 forbids exactly this — a feasibility call made after the force decision.',
      narrative: [
        'Accepting "not safe or feasible" as unreviewable lets a conclusion reached after the decision to use force stand in for the genuine assessment ALO 5.4 demands. On a scene with one unarmed subject at a distance, that determination does not hold.',
        'The order anticipates this move and rejects it.'
      ],
      legal: 'MTPD ALO 5.4: the safety-and-feasibility determination must be a genuine assessment, not a conclusion reached after the decision to use force was already made.',
      next: 'd3'
    },
    'c2b': {
      type: 'consequence', outcomeClass: 'outcome-good', outcomeLabel: 'You Tested the Determination',
      heading: 'You held the feasibility call to the genuine-assessment standard.',
      narrative: [
        'You point out that the report shows the "not feasible" conclusion came after Okafor had already decided to go hands-on, and that with one unarmed subject at a distance de-escalation was feasible. You address both the documentation and the underlying decision.',
        'A genuine assessment is the standard; the order will not let a post-hoc label substitute for it.'
      ],
      legal: 'MTPD ALO 5.4: a genuine on-scene safety-and-feasibility assessment, not a post-hoc conclusion.',
      next: 'd3'
    },
    'c2c': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'The Magic Words Don\'t Work',
      heading: 'Using the policy phrase does not make the determination genuine.',
      narrative: [
        'Approving because Okafor wrote "not safe or feasible" rewards the right words over the actual assessment ALO 5.4 requires. The facts — and the timing of the conclusion — show the determination was not genuine.',
        'Look at the assessment, not the phrasing.'
      ],
      legal: 'MTPD ALO 5.4: the determination is judged on whether it was a genuine assessment, not on whether the policy language appears.',
      next: 'd3'
    },
    'c2d': {
      type: 'consequence', outcomeClass: 'outcome-neutral', outcomeLabel: 'Rewording Misses the Point',
      heading: 'A more careful sentence does not make a post-hoc determination genuine.',
      narrative: [
        'Returning it just to reword the determination treats a substantive problem as a phrasing one. The issue is that the feasibility call was made after the force decision — better wording cannot fix that.',
        'Address the genuineness of the assessment and the decision.'
      ],
      legal: 'MTPD ALO 5.4: the requirement is a genuine assessment; rewording a post-hoc conclusion does not satisfy it.',
      next: 'd3'
    },
    'd3': {
      type: 'decision',
      decisionNumber: 3,
      situation: 'Consider a different officer\'s report from a similar park call. There, the officer created distance, used a calm tone, gave the subject choices, and requested a CIT-trained unit; the subject still escalated to an imminent threat and force became necessary. The report documents the specific techniques, the subject\'s responses, and why de-escalation could not be continued.',
      question: 'What is your review outcome on this second report?',
      options: [
        { text: 'Flag the officer for using force even though he de-escalated.', next: 'c3a', quality: 'bad', shortLabel: 'Penalized a sound de-escalation' },
        { text: 'Affirm it meets the ALO 5.4 standard — the authorized techniques were used and documented, force became necessary only on an imminent threat, and the record is the officer\'s protection under the Graham de-escalation dimension.', next: 'c3b', quality: 'good', shortLabel: 'Affirmed a documented, compliant effort' },
        { text: 'Return it because de-escalation should have prevented all force.', next: 'c3c', quality: 'bad', shortLabel: 'Treated de-escalation as a force guarantee' },
        { text: 'Approve it but tell the officer requesting CIT was overkill.', next: 'c3d', quality: 'risky', shortLabel: 'Undercut a correct resource request' },
      ]
    },
    'c3a': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'You Punished the Right Behavior',
      heading: 'Flagging an officer who de-escalated and then used necessary force teaches the squad to skip de-escalation.',
      narrative: [
        'De-escalation does not mean force is never justified. This officer used and documented the authorized techniques and went hands-on only when the subject created an imminent threat. Flagging him for that tells every officer watching that de-escalating just earns a write-up.',
        'This is the report you hold up as the standard, not the one you flag.'
      ],
      legal: 'MTPD ALO 5.4: de-escalation is employed where safe and feasible; force remains available when safety requires it. Graham v. Connor (1989): the documented effort supports reasonableness.',
      next: 'debrief'
    },
    'c3b': {
      type: 'consequence', outcomeClass: 'outcome-good', outcomeLabel: 'Affirmed the Standard',
      heading: 'You recognized a textbook ALO 5.4 effort and said so.',
      narrative: [
        'You affirm that the officer met the standard: the authorized techniques — distance, calm tone, choices, CIT request — were used and documented, the subject\'s responses are recorded, and force became necessary only on an imminent threat. The documented effort is exactly what protects the officer under the Graham de-escalation dimension.',
        'Affirming sound de-escalation is as important as catching its absence — it tells the squad the effort is seen and valued.'
      ],
      legal: 'MTPD ALO 5.4: authorized techniques used and documented (techniques, response, continuation). Graham v. Connor (1989): documented reasonable steps to avoid force support the reasonableness of the force ultimately used.',
      next: 'debrief'
    },
    'c3c': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'De-escalation Is Not a Guarantee',
      heading: 'Requiring that de-escalation prevent all force misunderstands the policy.',
      narrative: [
        'Returning the report because force still occurred treats de-escalation as a guarantee against force. It is not — it is the requirement to deploy the most effective tools first, which this officer did. When the subject created an imminent threat, force was justified and documented.',
        'Approve and affirm it.'
      ],
      legal: 'MTPD ALO 5.4: de-escalation is required where safe and feasible; it does not eliminate force as an option when safety requires it.',
      next: 'debrief'
    },
    'c3d': {
      type: 'consequence', outcomeClass: 'outcome-neutral', outcomeLabel: 'Don\'t Undercut the Resource Request',
      heading: 'Calling the CIT request overkill discourages exactly the right instinct.',
      narrative: [
        'Requesting CIT-trained personnel early is one of the authorized ALO 5.4 techniques, and second-guessing it as overkill teaches the officer to hesitate next time. Requesting resources before force becomes unavoidable is the standard, not an excess.',
        'Affirm the request along with the rest of the effort.'
      ],
      legal: 'MTPD ALO 5.4: requesting CIT-trained personnel or mental-health resources when available and appropriate is an authorized and expected technique.',
      next: 'debrief'
    },
    'debrief': { type: 'debrief' },
  }
};
