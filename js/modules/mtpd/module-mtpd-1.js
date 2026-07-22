/* ═══════════════════════════════════════════
   MTPD — Module 1: Search & Seizure (Fourth Amendment)

   Reading content extracted byte-for-byte from the former hardcoded
   branch in app.js (renderModuleContent) so the patrol reading is
   unchanged. Supervisor variants added here (MTPD now runs the
   supervisor track — registry features.supervisorTrack).

   Anchored ONLY to MTPD's own orders (Order 1.2, Order 2.1) and
   MTPD's approved roads. Never borrow EGPD policy, framing, or roads.
   The scenario graph (SCENARIO_SEARCH_SEIZURE) and patrol quiz
   (getSearchSeizureQuestions) still live in scenarios-mtpd.js /
   modules-mtpd.js — this file adds the reading const + supervisor set.
═══════════════════════════════════════════ */

const READING_SEARCH_SEIZURE = `
      <div class="content-block">
        <h4>Scenario</h4>
        <h2>You stop a vehicle on Route 29 in Marlborough Township. The driver is nervous. You smell marijuana. What happens next will be decided — and scrutinized — based on your training, your judgment, and your documentation.</h2>
        <p>This module covers what the Fourth Amendment requires of you at every decision point — and what it doesn\'t protect you from if you get it wrong in court or on paper.</p>
      </div>
      <div class="content-block">
        <h4>Core Principle</h4>
        <h2>The Fourth Amendment & Probable Cause in Pennsylvania</h2>
        <p>The Fourth Amendment protects persons against unreasonable searches and seizures. Pennsylvania provides additional protection under Article I, Section 8 of the Pennsylvania Constitution — in some circumstances, state courts apply stronger protections than the federal floor.</p>
        <p>The foundational rule: <strong>warrantless searches are presumptively unreasonable.</strong> Exceptions exist, but the burden is always on the government to justify the search — and that justification lives or dies in your documentation.</p>
        <div class="case-law-box">
          <div class="case-title">Terry v. Ohio, 392 U.S. 1 (1968)</div>
          <p>Officers may conduct a brief investigatory stop based on reasonable, articulable suspicion that criminal activity is afoot. A protective frisk for weapons requires separate justification — officer safety grounded in specific, articulable facts, not a general hunch.</p>
        </div>
        <div class="case-law-box">
          <div class="case-title">Commonwealth v. Barr, 266 A.3d 25 (Pa. 2021)</div>
          <p>Because medical marijuana is lawful in Pennsylvania, the odor of marijuana alone no longer establishes probable cause to search a vehicle. Odor remains a legitimate factor in the totality of the circumstances — but it must be combined with other specific, documented observations. Courts scrutinize whether the officer\'s testimony is specific, credible, and grounded in documented observations — not conclusions.</p>
        </div>
        <div class="case-law-box">
          <div class="case-title">Rodriguez v. United States, 575 U.S. 348 (2015)</div>
          <p>A traffic stop may not be extended — even briefly — for a dog sniff beyond the time needed to complete the purpose of the stop, without independent reasonable suspicion. Timeline documentation is essential whenever K9 is involved.</p>
        </div>
      </div>
      <div class="content-block">
        <h4>MTPD Order 1.2 — Limits of Authority</h4>
        <h2>Pennsylvania gives you less than you might think on vehicle searches.</h2>
        <p>The federal automobile exception allows a warrantless vehicle search based on probable cause alone. <strong>Pennsylvania does not.</strong> Under the Pennsylvania Constitution, probable cause alone — without accompanying exigent circumstances — does not justify a warrantless vehicle search. This is a stricter standard than the federal floor, and it applies to every stop you make in this jurisdiction.</p>
        <div class="sop-box">
          <div class="sop-title">MTPD Order 1.2 — Vehicle Searches</div>
          <p>"Probable Cause to search, without any accompanying exigent circumstances, does not justify a warrantless search of a vehicle." Warrantless vehicle searches are permitted only via: consent, plain view, officer safety frisk of passenger compartment, or exigent circumstances — and exigency cannot be created by officer action.</p>
        </div>
        <div class="sop-box">
          <div class="sop-title">MTPD Order 1.2 — Consent Searches</div>
          <p>When a subject grants consent to search, officers shall use the department\'s <strong>Search and Seizure Consent Form (Attachment D)</strong> or ensure consent is recorded by mobile vehicle camera. If neither is used, the officer must provide a detailed written explanation in the incident report of how consent was given, the officer\'s demeanor, whether weapons were drawn, and the subject\'s apparent condition. Undocumented consent is legally vulnerable consent.</p>
        </div>
        <div class="sop-box">
          <div class="sop-title">MTPD Order 1.2 — Crime Scene Searches</div>
          <p>"There is no crime scene exception to the search warrant requirement." When first on scene, your job is to preserve and secure — not to search. Warrantless entry of a residence is permitted only for consent, probable cause with specific exigent circumstances, or hot pursuit. When in doubt, secure the scene and get the warrant.</p>
        </div>
        <div class="sop-box">
          <div class="sop-title">MTPD Order 1.2 — Inventory Searches</div>
          <p>Inventory searches shall be conducted on all vehicles placed in the department\'s impound lot and must be documented on the Vehicle Inventory Report form. Officers shall <strong>not</strong> conduct an inventory search when the sole purpose is to find evidence of a crime — this circumvents the warrant requirement. If evidence is discovered during an inventory search, <strong>stop the inventory and secure a search warrant before continuing.</strong></p>
        </div>
      </div>
      <div class="content-block">
        <h4>Recognized Exceptions to the Warrant Requirement</h4>
        <ul class="key-points">
          <li><strong>Consent</strong> — Must be voluntary, not the product of coercion. Use the Consent Form or document thoroughly in your report.</li>
          <li><strong>Automobile Exception (PA)</strong> — Requires probable cause AND exigent circumstances. Odor alone no longer establishes PC (Barr); it is one factor in the totality — and even with PC you still need exigency in Pennsylvania.</li>
          <li><strong>Search Incident to Lawful Arrest</strong> — Limited to the person and the area within their immediate control at the time of arrest.</li>
          <li><strong>Plain View</strong> — You are lawfully present, the item is visible, and its incriminating character is immediately apparent.</li>
          <li><strong>Exigent Circumstances</strong> — Hot pursuit, imminent destruction of evidence, or immediate threat to safety. Cannot be manufactured by the officer.</li>
          <li><strong>Inventory Search</strong> — Must follow MTPD policy, use the Vehicle Inventory Report form, and cannot be used as a pretext search.</li>
        </ul>
      </div>
      <div class="content-block">
        <h4>The Documentation Standard</h4>
        <h2>Vague reports lose cases. Specific reports build them.</h2>
        <p>Courts do not evaluate your instincts. They evaluate whether a reasonable officer, with your specific training and experience, facing the specific facts you documented, would conclude that criminal activity was afoot. Generic conclusions cannot answer that question. Specific, articulable observations can.</p>
        <p>"Appeared nervous" carries no legal weight. "Driver would not maintain eye contact, hands were visibly trembling on the steering wheel, and responses were delayed approximately two seconds" — that\'s a probable cause foundation.</p>
        <div class="sop-box">
          <div class="sop-title">MTPD Order 2.1 — MDVARS Mandatory Recording</div>
          <p>In-car video recording (MDVARS) is mandatory for all vehicle stops, pedestrian stops, vehicle searches, and any other significant law enforcement activity. The system auto-activates when emergency lights are activated or speed exceeds 75 mph. Officers must inform subjects their conversation is being recorded: <em>"I am Officer _____ of the Law Enforcement Training Platform. For documentation purposes this event is being recorded."</em></p>
          <p>Erasing, altering, or interfering with any MDVARS recording is strictly prohibited. All recordings are retained a minimum of 90 days. A court order or subpoena is required for release to non-criminal justice entities.</p>
        </div>
        <button class="btn-launch" onclick="startScenario('search-seizure')">Proceed to Scenario Exercise →</button>
      </div>
    `;

/* ══════════════════════════════════════════
   SUPERVISOR OVERLAY — Search & Seizure (MTPD)
   Injected into the officer reading before the scenario button by
   withSupervisorOverlay(). Command lens on the same MTPD orders and
   law the patrol officer just read — no new legal authority beyond
   what is GOOD LAW in the citations registry; review craft + MTPD practice.
══════════════════════════════════════════ */
const SUPERVISOR_SEARCH_SEIZURE = `
  <div class="content-block">
    <h4>Supervisor Focus</h4>
    <h2>The report is now yours. Your approval is a representation that this stop, this search, and this documentation will survive scrutiny.</h2>
    <p>As a supervisor you are the last review before an officer's work becomes the official record and the foundation of a prosecution. A suppression problem is cheap to fix at your desk and expensive to fix in a motion hearing weeks later. Your task at review is not to rewrite the officer's report — it is to know, on sight, the difference between a report that needs a better sentence and a search that no sentence can save.</p>
  </div>
  <div class="content-block">
    <h4>Reviewing a Vehicle Search Under MTPD Order 1.2</h4>
    <h2>In Pennsylvania, probable cause is not the finish line — exigency is.</h2>
    <p>MTPD Order 1.2 states it plainly: <em>"Probable Cause to search, without any accompanying exigent circumstances, does not justify a warrantless search of a vehicle."</em> This tracks <em>Commonwealth v. Alexander</em> (2020), where the Pennsylvania Supreme Court held that under Article I, Section 8 a warrantless vehicle search requires <strong>both</strong> probable cause and exigent circumstances — the warrant is the default. The single most common review catch in this Commonwealth is a report that establishes solid probable cause and then stops there. When you review a vehicle-search arrest, look for both elements stated as facts. If the report shows the vehicle was stopped and the scene controlled — driver detained, a second unit present, no flight risk — ask the question the suppression court will ask: <em>what made obtaining a warrant impracticable?</em> If the honest answer is "nothing," the officer should have secured the vehicle and sought a warrant. Order 1.2 also forecloses the shortcut: exigency cannot be created by officer action.</p>
    <p>Note what this is not. Where the report's facts establish probable cause, the defect in a warrantless vehicle search is rarely the probable cause itself — it is the <strong>missing exigency</strong>. Do not return such a report for a better-written justification of the probable cause. That treats a legal defect as a writing problem.</p>
  </div>
  <div class="content-block">
    <h4>The Review Distinction That Matters Most</h4>
    <h2>You cannot fix an unlawful search with better writing.</h2>
    <p>Two reports can carry the identical phrase "appeared nervous." In one, the stop and search were lawful and the officer simply wrote conclusions instead of facts — that report goes back for a rewrite to the specificity standard the module teaches: specific behaviors, sensory detail, distance, duration, and how the officer's training and experience informed the assessment. In the other, the search itself had no lawful basis — and no amount of specificity will rescue it. The supervisor's core skill is telling these two apart <em>before</em> the report is filed. Assess the legality of the search first; assess the quality of the documentation second.</p>
  </div>
  <div class="content-block">
    <h4>Reviewing Consent, Scope, and Plain View</h4>
    <ul class="key-points">
      <li><strong>Consent documentation (Order 1.2)</strong> — A report that says only "driver consented" does not meet MTPD policy. Order 1.2 requires the Search and Seizure Consent Form (Attachment D) or a recording on the mobile vehicle camera; absent either, the officer must provide a detailed written explanation of how consent was given, the officer's demeanor, whether weapons were drawn, and the subject's apparent condition. Return it before filing — undocumented consent is legally vulnerable consent.</li>
      <li><strong>Consent scope</strong> — Under <em>Florida v. Jimeno</em> (1991) scope is measured by objective reasonableness. If an officer opened a locked container on a general consent to "search the vehicle" without clarifying scope, flag it — that is a suppression exposure, not a clean search, unless an independent basis is documented.</li>
      <li><strong>Plain view</strong> — Confirm the report establishes lawful presence and that the incriminating nature was immediately apparent (<em>Horton v. California</em>, 1990). "Might contain contraband" is not "immediately apparent."</li>
      <li><strong>Inventory ≠ investigation (Order 1.2)</strong> — An inventory search whose evident purpose is to find evidence is a pretext that circumvents the warrant requirement. If the report shows evidence was discovered during an inventory and the officer kept going, that is the catch: Order 1.2 requires the officer to stop the inventory and secure a warrant before continuing.</li>
      <li><strong>Stop duration (Rodriguez)</strong> — Where a K9 is involved, confirm the timeline shows the sniff did not extend the stop beyond its mission absent independent reasonable suspicion.</li>
    </ul>
  </div>
  <div class="content-block">
    <h4>Order 2.1 — Verify the Recording Exists</h4>
    <p>MTPD Order 2.1 makes MDVARS recording mandatory for all vehicle stops, pedestrian stops, and vehicle searches. Part of approving a search report is confirming the recording is present and intact. A vehicle-search report with no associated MDVARS recording and no explanation is an open question, not a closed file — the recording is your best corroboration of how consent was obtained and how the search was conducted. If the system was not activated, that is a separate policy issue to address on its own terms; do not let it ride through unaddressed because the case looks clean on paper. Erasing or altering a recording is strictly prohibited and is never a documentation matter.</p>
  </div>
  <div class="content-block">
    <h4>From Catch to Correction</h4>
    <p>Catching the defect is half the job. The purpose of this platform — and of supervisory review — is to make the order the natural habit. When you return a report, document what you returned and why, coach to the standard, and track patterns. One officer searching without articulating exigency is a coaching moment. The same officer doing it a third time is a supervisory and training issue, and an unaddressed pattern becomes the department's exposure, not just the officer's. Review, document, coach, and escalate when the pattern warrants it.</p>
    <p>Hold the same standard for the stops that did not end in arrest. A legally correct decision not to search still demands complete documentation of what was observed; field intelligence that is not recorded does not exist, and a stop logged only as "warning issued" preserves nothing for the next investigation. Every report you approve carries your name.</p>
  </div>
`;

function getSearchSeizureSupervisorQuestions() {
  return [
    {
      scenario: 'You are reviewing an arrest report before it is filed. The officer establishes solid probable cause to search a vehicle stopped on Route 29 — but the narrative shows the vehicle was stopped, the driver was detained, and a second unit was on scene. The officer then searched the vehicle at the roadside without a warrant. The report says nothing about exigent circumstances.',
      text: 'What should your review flag under MTPD Order 1.2?',
      options: [
        'Nothing — probable cause by itself fully authorizes a warrantless vehicle search in Pennsylvania, the same way it does under the federal automobile exception, so the report is complete as written, needs no separate showing of exigency, and can be approved and forwarded to the District Attorney as it stands.',
        'Approve it — the probable cause here is strong enough that establishing separate exigent circumstances is unnecessary and the search will hold up on that strength alone.',
        'The only problem is that the officer did not photograph the vehicle before searching it; once that documentation is added the warrantless search is fully supported.',
        'The report is missing exigent circumstances. Order 1.2 and Commonwealth v. Alexander require probable cause AND exigency for a warrantless vehicle search; with the scene controlled, the officer should have secured the vehicle and obtained a warrant.'
      ],
    },
    {
      scenario: 'An officer\'s report establishes probable cause to search a vehicle, but the warrantless search was conducted at the roadside on a controlled scene with no exigency stated. A colleague suggests you return the report for a more specific, detailed write-up of the probable cause so the search will hold up.',
      text: 'Is "rewrite the probable cause section" the correct supervisory response?',
      options: [
        'Yes — once the probable cause is described with enough specificity and detail, the warrantless search becomes justified and the report will survive a suppression motion.',
        'No. The probable cause is not the weak point — the missing exigency Order 1.2 requires is. A better-written justification of the same warrantless search on a controlled scene does not cure it; address it as training and corrective action.',
        'Yes — probable cause is never sufficient on its own in Pennsylvania, so rewriting the narrative more persuasively is the only thing that can save this particular search.',
        'No — you should simply approve it as written, because probable cause by itself authorizes the vehicle search and no further justification is needed.'
      ],
    },
    {
      scenario: 'Two arrest reports cross your desk the same shift. Both contain the phrase "the driver appeared nervous." In Report A, the underlying stop and search were lawful and well-supported; the officer simply wrote conclusions. In Report B, the search had no lawful basis to begin with.',
      text: 'What is the correct supervisory response to each?',
      options: [
        'Return Report A for a rewrite to the specificity standard; flag Report B as an unlawful search that better writing cannot cure. Assess legality first, then documentation.',
        'Return both reports for the same specificity rewrite, because the underlying problem in each one is the conclusory "appeared nervous" language and nothing more.',
        'Approve both as written — "appeared nervous" is an acceptable and well-understood shorthand in a police report, so neither report needs to be returned.',
        'Return Report B for a specificity rewrite and approve Report A as written, since the unlawful search can be cured with a more detailed narrative.'
      ],
    },
    {
      scenario: 'An officer\'s report documents a consent search of a vehicle on Route 29. The only entry regarding consent reads, in full: "Driver consented to the search." No Consent Form is attached and the narrative does not mention the mobile vehicle camera.',
      text: 'What is the appropriate supervisory action before this report is filed?',
      options: [
        'Approve it — the officer stated in the narrative that the driver consented to the search, and that statement is all that department policy requires for a consent search.',
        'Approve it as written for this report to avoid holding up the filing, but verbally tell the officer, as an informal aside, to do a better and more thorough job of documenting how consent was obtained the next time a situation like this one comes up, treating the bare entry as good enough for now and a habit to polish later.',
        'Return it before filing — Order 1.2 requires the Search and Seizure Consent Form (Attachment D) or a mobile-vehicle-camera recording; absent either, the officer must provide a detailed written explanation of how consent was given, the officer\'s demeanor, whether weapons were drawn, and the subject\'s apparent condition.',
        'Reject the arrest entirely — a consent search supported only by a verbal exchange can never be documented sufficiently to survive a challenge, so the whole case fails.'
      ],
    },
    {
      scenario: 'During your review you find that an officer obtained a general verbal consent to "search the vehicle," then opened a locked container in the trunk and recovered contraband. The report does not show that the officer clarified whether the consent reached the locked container or that any other basis authorized opening it.',
      text: 'How should you assess the scope of this search?',
      options: [
        'Under Florida v. Jimeno, consent scope is measured by objective reasonableness; a general consent does not automatically reach a locked container. Flag it as a suppression exposure and require the independent legal basis for opening it to be documented if one exists.',
        'General consent to search a vehicle automatically includes every locked container found inside it, so the officer\'s search of the locked container was clean and needs no further review.',
        'The locked container itself created independent probable cause the moment the officer saw it, so the scope of the driver\'s consent is irrelevant to whether the search was lawful.',
        'The search is fine as long as the officer genuinely and honestly believed that the general consent to search the vehicle also reached the locked container in the trunk, because in a consent search it is the officer\'s subjective good-faith belief about the scope — not any objective standard — that ultimately controls the question.'
      ],
    },
    {
      scenario: 'An officer\'s report describes an inventory search of an impounded vehicle. Midway through, the narrative notes the officer located a small quantity of suspected narcotics in a closed console compartment — and then kept searching the rest of the vehicle and its containers for additional evidence.',
      text: 'What is the supervisory catch under MTPD Order 1.2?',
      options: [
        'Nothing is wrong here — an inventory search authorizes a complete search of the vehicle and everything inside it, so the officer was entitled to keep going after finding the narcotics.',
        'The officer should have first arrested the registered owner of the vehicle before continuing the inventory search of the remaining compartments and containers.',
        'The only issue here is a paperwork one — the inventory was simply not logged on the Vehicle Inventory Report form, and once that missing form is completed and attached to the file the search itself is perfectly fine and needs no further scrutiny from you at review.',
        'Order 1.2 requires that once evidence is discovered during an inventory the officer stop the inventory and secure a search warrant before continuing; an inventory whose evident purpose becomes finding evidence is a pretext that circumvents the warrant requirement.'
      ],
    },
    {
      scenario: 'A report documents a vehicle stop and a subsequent vehicle search on Route 29. There is no MDVARS recording associated with the stop in the file, and the narrative does not mention the in-car camera at all.',
      text: 'How should you handle this on review under MTPD Order 2.1?',
      options: [
        'Approve it — MDVARS recordings are optional under department policy, and the written report stands on its own without any accompanying video of the stop.',
        'Order 2.1 makes MDVARS recording mandatory for vehicle stops and searches; treat the missing recording as an open question — require the officer to locate and document the recording, and if the system was not activated, address that as a separate policy issue rather than letting it ride.',
        'Suppress the search yourself at the review stage, because the missing MDVARS recording alone renders the entire vehicle search legally invalid.',
        'Approve it, but quietly delete the report from the records system so that the missing-recording gap can never surface in discovery and be used by the defense later on, keeping the case clean on paper by making sure the absence of the MDVARS video is never documented anywhere it could be found.'
      ],
    },
    {
      scenario: 'Over a one-month span, the same officer has now submitted three vehicle-search reports that establish probable cause but never articulate the exigent circumstances Order 1.2 requires. You coached the officer verbally after the first one.',
      text: 'What is the appropriate supervisory response now?',
      options: [
        'Give him just one more verbal reminder — he is a genuinely good officer, he clearly means well, and he will almost certainly come around on his own after one more informal conversation about the exigency requirement, the same way most officers correct a small documentation habit without any need for a formal file.',
        'Nothing further is needed here; each of the three stops is a separate event, the officer means well, and there is no real pattern that requires a formal response.',
        'Reassign the officer away from all traffic enforcement duties permanently and effective immediately, without creating any documentation of the reason for the move.',
        'Move beyond a single coaching moment: documented corrective action and targeted training now, because a repeated pattern after coaching is a supervisory and training issue and an unaddressed pattern becomes the department\'s exposure — escalate as the pattern warrants.'
      ],
    },
    {
      scenario: 'An officer lawfully decided not to search a vehicle after a Route 29 stop because the basis was lacking. The CAD entry for the stop reads, in full: "Traffic stop — equipment violation — written warning issued — released."',
      text: 'Is this documentation acceptable on supervisory review?',
      options: [
        'Yes — the officer made the correct legal decision not to search the vehicle, so a minimal CAD entry is entirely sufficient and nothing more needs to be recorded.',
        'Yes — because no arrest was ultimately made and no evidence was seized during the course of this particular stop, no further documentation beyond the brief CAD entry is required of the officer, and holding him to an arrest-level reporting standard for a stop that produced nothing would be unnecessary.',
        'No — the decision not to search can be legally correct while the documentation is still deficient. Hold the same standard as an arrest report: the officer\'s observations should be documented completely, because field intelligence that is not recorded does not exist.',
        'No — the officer should have gone ahead and searched the vehicle anyway in order to be thorough, and the documentation problem flows from that failure to search.'
      ],
    },
  ];
}

/* ══════════════════════════════════════════
   SUPERVISOR SCENARIO — Search & Seizure (MTPD)
   The command-lens exercise: you review Officer Brandt's Route 29
   arrest report before it's filed. Same kind of incident as the
   patrol scenario, but the supervisor's decisions. Fictional officer.
══════════════════════════════════════════ */
const SCENARIO_SEARCH_SEIZURE_SUP = {
  id: 'scenario-search-seizure-sup',
  title: 'Supervisor Review — Route 29 Stop',
  location: 'Report Review Desk, Marlborough Township, PA',
  totalDecisions: 3,
  nodes: {
    'start': {
      type: 'scene',
      time: '23:30',
      weather: 'End of Shift',
      unit: 'Shift Supervisor',
      narrative: [
        'End of shift. Officer Brandt\'s arrest report from a vehicle stop on Route 29 is in your review queue — your approval puts it into the case file and on its way to the District Attorney.',
        'The stop began as a defective-headlight equipment violation. Brandt reports detecting an odor of marijuana, searching the vehicle at the roadside, and recovering roughly 12 grams and a digital scale. Both occupants were out of the car and a second unit was on scene. Your signature is a representation that this stop, this search, and this documentation will survive a suppression hearing.'
      ],
      next: 'd1'
    },
    'd1': {
      type: 'decision',
      decisionNumber: 1,
      situation: 'You read the report. Brandt establishes probable cause from the odor and the driver\'s admission to recent use. But the search was warrantless and conducted at the roadside, and the narrative is clear that the vehicle was stopped, both occupants were controlled, and a second unit was present. There is no mention of exigent circumstances and no warrant.',
      question: 'How do you handle the report?',
      options: [
        { text: 'Approve it as written — there is probable cause, and probable cause authorizes a vehicle search.', next: 'c1a', quality: 'bad', shortLabel: 'Approved on probable cause alone' },
        { text: 'Return it for a rewrite — once Brandt describes the odor with more specificity, the search is justified.', next: 'c1b', quality: 'risky', shortLabel: 'Sent back for a better-written odor description' },
        { text: 'Flag the missing exigency, not the writing — under Order 1.2 and Alexander a warrantless vehicle search needs PC AND exigency, and a controlled scene is no exigency. Hold the filing and address it as training and corrective action.', next: 'c1c', quality: 'good', shortLabel: 'Identified missing exigency, not a writing problem' },
        { text: 'Sign it, but add your own note that exigent circumstances existed because the car could have been driven away.', next: 'c1d', quality: 'bad', shortLabel: 'Manufactured exigency to save the search' },
      ]
    },
    'c1a': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'You Approved a Suppression-Bound Case',
      heading: 'Probable cause alone doesn\'t get into a vehicle in this Commonwealth — and now your name is on it.',
      narrative: [
        'Weeks later the evidence is suppressed and the case is dismissed. MTPD Order 1.2 is explicit that probable cause without accompanying exigent circumstances does not justify a warrantless vehicle search, and Commonwealth v. Alexander makes the warrant the default. A stopped, controlled vehicle is not an exigency.',
        'Worse than the lost case: Brandt now believes a warrantless roadside search on probable cause alone is approved practice, because you approved it. What you sign is what your officers learn.'
      ],
      legal: 'MTPD Order 1.2: "Probable Cause to search, without any accompanying exigent circumstances, does not justify a warrantless search of a vehicle." Commonwealth v. Alexander (2020): a warrantless vehicle search requires both probable cause and exigent circumstances — the warrant is the default.',
      next: 'd2'
    },
    'c1b': {
      type: 'consequence', outcomeClass: 'outcome-neutral', outcomeLabel: 'You Can\'t Write Your Way Out of This',
      heading: 'A better sentence won\'t supply an exigency that wasn\'t there.',
      narrative: [
        'Returning the report for more specific language treats this like a documentation problem. It isn\'t. The probable cause is not the weak point — the report establishes it. The search rested on probable cause with no exigency on a controlled scene, so it is suppression-bound no matter how well it is written.',
        'The supervisor\'s core skill is telling a writing problem from a legal defect. This is the second kind. Sending it back for prose tells Brandt the fix is wording, when the lesson is the missing exigency and the warrant he should have sought.'
      ],
      legal: 'MTPD Order 1.2 / Commonwealth v. Alexander: probable cause still requires accompanying exigent circumstances for a warrantless vehicle search. Specificity cures a conclusory report; it cannot cure a missing exigency.',
      next: 'd2'
    },
    'c1c': {
      type: 'consequence', outcomeClass: 'outcome-good', outcomeLabel: 'Caught Before It Was Filed',
      heading: 'You separated the legal defect from the writing — exactly the review that protects the department.',
      narrative: [
        'You hold the filing, document the issue, and set up a coaching conversation with Brandt. The probable cause was sound; the problem was the warrantless search on a controlled scene with no exigency. Under Order 1.2 the lawful path was to secure the vehicle and seek a warrant — and Order 1.2 also forecloses creating exigency by officer action.',
        'A defect caught at your desk is a training moment. The same defect discovered at a suppression hearing is a dismissed case and a credibility hit. You bought the cheaper one.'
      ],
      legal: 'MTPD Order 1.2: PC without accompanying exigency does not justify a warrantless vehicle search; exigency cannot be created by officer action. Commonwealth v. Alexander (2020): warrant is the default for vehicle searches in Pennsylvania.',
      next: 'd2'
    },
    'c1d': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'You Made It Worse',
      heading: 'Writing in an exigency that didn\'t exist is a credibility problem on top of a search problem.',
      narrative: [
        'A stopped vehicle with both occupants out and a second unit on scene is not an exigency, and adding a supervisor\'s note claiming one is overstating the facts to fit the search. Defense counsel will dismantle it, and an inaccurate justification undermines the evidence and your own credibility as a reviewer.',
        'Order 1.2 says exigency cannot be created by officer action — and it certainly cannot be created on paper after the fact. Overstating an exigency to rescue a decision is always worse on review than honestly acknowledging the decision was wrong.'
      ],
      legal: 'MTPD Order 1.2: exigency cannot be created by officer action. Commonwealth v. Alexander (2020): exigency must be real — a controlled roadside scene does not qualify.',
      next: 'd2'
    },
    'd2': {
      type: 'decision',
      decisionNumber: 2,
      situation: 'Setting the search aside, you notice a pattern: this is the third report this month in which Brandt searched a vehicle on probable cause without ever articulating exigent circumstances. You coached him verbally after the first one.',
      question: 'How do you handle the pattern?',
      options: [
        { text: 'One more verbal reminder — he\'s a good officer, he\'ll come around.', next: 'c2a', quality: 'risky', shortLabel: 'Another informal verbal coaching' },
        { text: 'Documented corrective action plus targeted training now — a repeated pattern after coaching is a supervisory and training issue, and an unaddressed pattern is the department\'s exposure.', next: 'c2b', quality: 'good', shortLabel: 'Documented corrective action + training' },
        { text: 'Nothing — each stop is a separate event and he means well.', next: 'c2c', quality: 'bad', shortLabel: 'Took no action on the pattern' },
        { text: 'Pull him off traffic enforcement permanently, effective immediately, with no paperwork.', next: 'c2d', quality: 'bad', shortLabel: 'Undocumented permanent reassignment' },
      ]
    },
    'c2a': {
      type: 'consequence', outcomeClass: 'outcome-neutral', outcomeLabel: 'Coaching Already Failed Once',
      heading: 'You already tried the verbal reminder — and here is the third report.',
      narrative: [
        'A fourth informal conversation is unlikely to change what three searches and one prior coaching did not. The behavior is now a pattern, and a pattern that lives only in your memory is a pattern the department cannot show it addressed.',
        'Verbal coaching is the right first step. After it fails, the next step is documented corrective action and training — not a louder version of the step that already failed.'
      ],
      legal: 'MTPD Order 1.2 sets the standard the searches keep missing; the supervisory obligation is to bring the officer into compliance and create a record of having done so.',
      next: 'd3'
    },
    'c2b': {
      type: 'consequence', outcomeClass: 'outcome-good', outcomeLabel: 'You Treated the Pattern as a Pattern',
      heading: 'Documented corrective action plus training — the response a repeated, coached-but-uncorrected issue requires.',
      narrative: [
        'You document the three instances, the prior coaching, and a specific corrective plan with targeted training on Order 1.2 and the exigency requirement. The record protects the officer, you, and the department, and it gives Brandt a clear standard to meet.',
        'One unlawful search is a coaching moment. The same defect three times after coaching is a supervisory and training issue — and an unaddressed pattern becomes the department\'s liability, not just the officer\'s.'
      ],
      legal: 'Supervisory standard: review, document, coach, and escalate when the pattern warrants it. The underlying requirement is MTPD Order 1.2 (PC plus exigency for warrantless vehicle searches).',
      next: 'd3'
    },
    'c2c': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'You Let the Pattern Ride',
      heading: 'Treating each unlawful search as a one-off is how a training issue becomes a liability.',
      narrative: [
        'Doing nothing leaves the same defect in place for the next stop and the next case. When one of these suppressions surfaces a pattern in discovery, the question will not be only why the officer searched — it will be what the supervisor did after the first two.',
        'An unaddressed pattern of unlawful searches becomes the department\'s exposure. "He means well" is not a record of corrective action.'
      ],
      legal: 'MTPD Order 1.2 sets the standard; the supervisory failure is allowing repeated, known non-compliance to continue without documented correction.',
      next: 'd3'
    },
    'c2d': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Right Concern, Wrong Process',
      heading: 'A permanent reassignment with no paperwork solves nothing and creates its own problems.',
      narrative: [
        'An undocumented, permanent removal from a duty assignment skips the corrective process the officer is owed, creates a personnel and potential grievance problem, and still leaves no record that the underlying search issue was identified and addressed.',
        'The behavior calls for documented corrective action and targeted training tied to Order 1.2 — a measured, recorded response — not an off-the-books reassignment.'
      ],
      legal: 'Supervisory standard: documented corrective action and training proportionate to the issue; the underlying requirement is MTPD Order 1.2.',
      next: 'd3'
    },
    'd3': {
      type: 'decision',
      decisionNumber: 3,
      situation: 'You move to the rest of the file. Brandt\'s narrative says only "driver consented to a search of the vehicle." No Search and Seizure Consent Form (Attachment D) is attached, and there is no MDVARS recording associated with the stop — the in-car camera is never mentioned.',
      question: 'How do you handle the consent documentation and the missing recording before this report is filed?',
      options: [
        { text: 'Approve it — Brandt wrote that the driver consented, and that is enough.', next: 'c3a', quality: 'bad', shortLabel: 'Approved a bare "driver consented"' },
        { text: 'Return it before filing — Order 1.2 requires the Consent Form, a camera recording, or a detailed written explanation of the consent; and Order 2.1 makes MDVARS mandatory, so the missing recording is an open question to resolve, addressed as a separate policy issue if the camera was not activated.', next: 'c3b', quality: 'good', shortLabel: 'Returned for Order 1.2 consent + Order 2.1 recording' },
        { text: 'Approve the report but make a note to remind Brandt about consent forms at the next squad meeting.', next: 'c3c', quality: 'risky', shortLabel: 'Approved now, general reminder later' },
        { text: 'Strike the consent search from the report and rely only on the odor to justify the search.', next: 'c3d', quality: 'bad', shortLabel: 'Edited the officer\'s narrative to swap the basis' },
      ]
    },
    'c3a': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Undocumented Consent Is Vulnerable Consent',
      heading: 'A bare "driver consented" gives a suppression court nothing to weigh — and no recording backs it up.',
      narrative: [
        'On a motion to suppress, the consent becomes a credibility contest with no documentation and no video to support the officer. MTPD Order 1.2 sets a specific consent-documentation standard precisely so this does not happen, and Order 2.1 required a recording that is now unexplained.',
        'Approving it as written passes both gaps straight into the case file under your signature.'
      ],
      legal: 'MTPD Order 1.2: consent searches require the Consent Form (Attachment D), a mobile-vehicle-camera recording, or a detailed written explanation. MTPD Order 2.1: MDVARS recording is mandatory for vehicle stops and searches.',
      next: 'debrief'
    },
    'c3b': {
      type: 'consequence', outcomeClass: 'outcome-good', outcomeLabel: 'Both Gaps Closed Before Filing',
      heading: 'You held the report for the consent documentation Order 1.2 requires and ran down the missing recording.',
      narrative: [
        'You return the report for the consent documentation the order requires — the Consent Form, the camera recording, or a detailed written account of how consent was given, the officer\'s demeanor, whether weapons were drawn, and the subject\'s apparent condition. Separately, you treat the absent MDVARS recording as its own question: locate it, or address the non-activation as a policy matter on its own terms.',
        'Two different problems, handled as two different problems — the documentation gap and the recording gap — before either becomes part of the permanent record.'
      ],
      legal: 'MTPD Order 1.2 (consent-documentation standard) and MTPD Order 2.1 (mandatory MDVARS recording for vehicle stops and searches).',
      next: 'debrief'
    },
    'c3c': {
      type: 'consequence', outcomeClass: 'outcome-neutral', outcomeLabel: 'Filed Now, Fixed Never',
      heading: 'A reminder at the next squad meeting does not fix the report that is being filed today.',
      narrative: [
        'Once you approve it, the deficient consent entry and the unexplained missing recording are in the case file. A general future reminder is fine as training, but it does nothing for this report, this consent, and this prosecution.',
        'The time to meet the Order 1.2 documentation standard is before filing, not after the case has moved on.'
      ],
      legal: 'MTPD Order 1.2: undocumented consent is legally vulnerable consent — the documentation belongs in the report before it is filed. MTPD Order 2.1: the recording question is resolved now, not later.',
      next: 'debrief'
    },
    'c3d': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Don\'t Rewrite the Officer\'s Account',
      heading: 'Swapping the legal basis in the officer\'s narrative is not your job — and it papers over both problems.',
      narrative: [
        'Editing Brandt\'s report to drop the consent and lean on the odor changes the officer\'s sworn account of what happened, and it still leaves the warrantless-search exigency problem from earlier unresolved. The supervisor\'s role at review is to identify defects and return them for correction by the officer — not to author a new theory of the search.',
        'The consent documentation gap is fixed by getting the documentation the order requires, not by deleting the consent from the record.'
      ],
      legal: 'MTPD Order 1.2 sets the consent-documentation standard the report must meet; the report is the officer\'s account to correct, not the supervisor\'s to rewrite.',
      next: 'debrief'
    },
    'debrief': { type: 'debrief' },
  }
};
