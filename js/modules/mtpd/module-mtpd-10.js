/* ═══════════════════════════════════════════
   MTPD — Module 10: Evidence & Chain of Custody

   Reading extracted byte-for-byte from the former app.js hardcoded
   branch. Supervisor variants anchored to MTPD Order 3.05/3.06 and the
   authority in the reading (PA Rules of Criminal Procedure — Rule 648).
   Never borrow EGPD policy, framing, or roads.
═══════════════════════════════════════════ */

const READING_EVIDENCE = `
      <div class="content-block">
        <h4>Scenario</h4>
        <h2>You\'re first on scene at a residential burglary. There\'s a crowbar on the porch, a shoeprint in the mud, and a victim telling you the suspect left 20 minutes ago. What you do with that evidence in the next 10 minutes will determine whether it ever reaches a jury.</h2>
        <p>This module covers chain of custody requirements under Pennsylvania Rules of Criminal Procedure, MTPD evidence packaging standards, in-place documentation, and the specific handling decisions that create — or destroy — a suppression vulnerability.</p>
      </div>
      <div class="content-block">
        <h4>Core Principle</h4>
        <h2>Chain of Custody Is Unbroken or It Is Broken</h2>
        <p>Chain of custody is the documented, unbroken record of every person who handled a piece of evidence — from the moment you first touched it to its admission at trial. A gap anywhere in that chain gives defense counsel the argument that the evidence was tampered with, contaminated, or substituted. Courts have suppressed otherwise compelling physical evidence because an officer couldn\'t account for where it was for two hours.</p>
        <p>Your job is to make the chain unbreakable. That starts with the first decision you make on scene: document before you touch.</p>
        <div class="case-law-box">
          <div class="case-title">Pennsylvania Rules of Criminal Procedure — Rule 648</div>
          <p>Pennsylvania requires that physical evidence introduced at trial be authenticated — its connection to the crime must be established through testimony. Chain of custody documentation is the foundation of authentication for physical evidence. Officers who maintain complete custody records protect the admissibility of every item they collect.</p>
        </div>
        <div class="case-law-box">
          <div class="case-title">Chain of Custody Challenge Standard</div>
          <p>Pennsylvania courts ask whether there is a reasonable probability the evidence was not altered or substituted. When an officer cannot account for evidence between the time of collection and submission to the property room, defense counsel can argue tampering or contamination. Your documentation — not your memory — is what answers that challenge at trial.</p>
        </div>
      </div>
      <div class="content-block">
        <h4>The Five Steps — Every Time</h4>
        <h2>These are not suggestions. They are the chain.</h2>
        <ul class="key-points">
          <li><strong>Step 1 — Document in place.</strong> Photograph and note the exact location of every item before moving it. Position, orientation, and spatial relationship to other items may be critical later. A photo taken after you moved it is not the same evidence.</li>
          <li><strong>Step 2 — Collect with minimal contact.</strong> Use gloves. Use appropriate collection tools. Contamination of DNA or fingerprint evidence cannot be undone. If you\'re not certain how to collect it, secure the scene and call for resources.</li>
          <li><strong>Step 3 — Package appropriately.</strong> Per MTPD ALO 3.05/3.06, all physical evidence is packaged in paper — biological evidence requires breathability that plastic prevents. Seal with evidence tape. Initial across the seal with date. Label with the RMS incident number, item number, and any hazard designation.</li>
          <li><strong>Step 4 — Complete the Property Record Form before end of shift.</strong> Every evidence item requires a Property Record Form documenting who collected it, when, where it was collected, how it was packaged, and custody from that moment forward. No exceptions.</li>
          <li><strong>Step 5 — Secure in temporary locker until property room access.</strong> Temporary evidence lockers are the authorized interim storage. Evidence does not sit in a patrol car, a locker room, or a desk. If the property room is inaccessible, the locker is the chain\'s next link — document the transfer.</li>
        </ul>
      </div>
      <div class="content-block">
        <h4>Suppression Vulnerabilities — How Chains Break</h4>
        <h2>Defense attorneys are looking for one of four things.</h2>
        <div class="sop-box">
          <div class="sop-title">MTPD Order 3.05/3.06 — Evidence Handling</div>
          <p>Evidence or property received by MTPD requires a Property Record Form completed before end of shift. The form documents every transaction in the chain — who had it, when, why it moved, and where it went. Every unsealed package must be noted. Every transfer requires documentation. The form is the chain — treat it as evidence itself.</p>
        </div>
        <p><strong>Gap in custody</strong> — any period the evidence cannot be accounted for. Prevent it by completing your Property Record Form while memory is fresh and securing items in designated lockers immediately.</p>
        <p><strong>Improper packaging</strong> — plastic bags for biological evidence allow decomposition and create defense challenges to DNA integrity. Use paper. Always paper for biologicals.</p>
        <p><strong>Failure to document in-place</strong> — a photograph of evidence after it has been moved cannot establish its original position. In-place documentation before first touch is non-negotiable.</p>
        <p><strong>Seal integrity failures</strong> — unsealed or re-sealed packaging creates an argument for tampering. If a package must be opened for testing, document every person present, the condition of the seal before opening, and the reason for opening.</p>
        <button class="btn-launch" onclick="startScenario('evidence-chain-of-custody')">Proceed to Scenario Exercise →</button>
      </div>
    `;

/* ══════════════════════════════════════════
   SUPERVISOR OVERLAY — Evidence & Chain of Custody (MTPD)
══════════════════════════════════════════ */
const SUPERVISOR_EVIDENCE = `
  <div class="content-block">
    <h4>Supervisor Focus</h4>
    <h2>The Property Record Form is the chain, and your review is the last point at which a broken chain can still be fixed instead of explained to a jury.</h2>
    <p>Physical evidence is suppressed not because it was the wrong evidence but because someone could not account for it. As the supervisor reviewing evidence submissions, you are checking that the chain is unbroken on paper: a Property Record Form completed before end of shift, proper packaging, intact seals, in-place documentation, and authorized storage. Catching a gap at your desk costs minutes. Catching it at trial costs the case.</p>
  </div>
  <div class="content-block">
    <h4>The Property Record Form Before End of Shift — Order 3.05/3.06</h4>
    <h2>"I'll log it tomorrow" is how the chain breaks.</h2>
    <p>MTPD Order 3.05/3.06 requires a Property Record Form completed before end of shift each time evidence or property is received — documenting who collected it, when, where, how it was packaged, and custody from that moment forward. The most common chain break is an officer carrying evidence to the next shift before logging it, leaving a period the item cannot be accounted for. On review, an officer's narrative that references seized evidence must have a corresponding completed Property Record Form, and the item must be in authorized storage — a temporary locker, not a patrol car, a locker room, or a desk. The form is the chain; treat a missing or deferred form as an incomplete submission, not a formality.</p>
  </div>
  <div class="content-block">
    <h4>The Four Ways Chains Break — What to Read For</h4>
    <ul class="key-points">
      <li><strong>Gap in custody</strong> — Any unaccounted-for period between collection and the property room. Confirm continuous, documented custody and immediate securing in a locker.</li>
      <li><strong>Improper packaging</strong> — Biological evidence in plastic decomposes and invites a DNA-integrity challenge. Order 3.05/3.06 requires paper for physical evidence; biologicals are always paper. Flag plastic-packaged biologicals.</li>
      <li><strong>Failure to document in-place</strong> — A photo taken after an item was moved cannot establish its original position. Confirm the report shows in-place documentation before first touch.</li>
      <li><strong>Seal integrity</strong> — Unsealed or re-sealed packaging is a tampering argument. Confirm items were sealed with evidence tape and initialed and dated across the seal, and that any opening for testing documents who was present, the seal condition before opening, and the reason.</li>
    </ul>
  </div>
  <div class="content-block">
    <h4>Why the Standard Is Absolute — Rule 648</h4>
    <p>Under Pennsylvania Rules of Criminal Procedure Rule 648, physical evidence must be authenticated — its connection to the crime established through testimony — and chain-of-custody documentation is the foundation of that authentication. Pennsylvania courts ask whether there is a reasonable probability the evidence was not altered or substituted, and it is the documentation, not the officer's memory, that answers the challenge. That is why "the form is the chain" is not a slogan: when you approve an evidence submission, you are vouching that the documentation can carry the authentication burden at trial. Hold every submission to that bar.</p>
  </div>
  <div class="content-block">
    <h4>From Catch to Correction</h4>
    <p>One missing Property Record Form is a coaching moment and a same-shift fix. An officer who repeatedly carries evidence over shifts, packages biologicals in plastic, or skips in-place documentation after coaching is a training and supervisory issue you document and escalate — because each gap is a future suppression motion. Every evidence submission you approve is one you are prepared to authenticate at trial.</p>
  </div>
`;

function getEvidenceSupervisorQuestions() {
  return [
    {
      scenario: 'An officer\'s burglary report references "a crowbar recovered from the scene and held as evidence." There is no Property Record Form in the submission, the item is in the officer\'s patrol car, and he plans to "log it in at the start of tomorrow\'s shift."',
      text: 'How do you handle this under MTPD Order 3.05/3.06?',
      options: [
        'Approve it — the Property Record Form can simply be completed whenever the officer next works a shift.',
        'Approve it now and just complete the missing Property Record Form for the crowbar yourself.',
        'Treat it as an incomplete submission — Order 3.05/3.06 requires a Property Record Form completed before end of shift and the item secured in authorized storage; evidence does not sit in a patrol car, and the deferral creates a gap in custody.',
        'Disregard the crowbar entirely, since it is mentioned only briefly within the burglary report.'
      ],
    },
    {
      scenario: 'A submission includes a bloodstained shirt collected as biological evidence, sealed inside a plastic zip bag.',
      text: 'What does your review require under MTPD Order 3.05/3.06?',
      options: [
        'Approve it — a tightly sealed plastic bag protects the bloodstained shirt evidence well enough.',
        'Direct that the shirt simply be frozen while still sealed inside the plastic zip bag instead.',
        'Approve it for now, but note the packaging issue in the officer\'s personnel file only.',
        'Return it for repackaging in paper — biological evidence requires the breathability paper provides; plastic allows decomposition and creates a DNA-integrity challenge, and Order 3.05/3.06 requires physical evidence packaged in paper.'
      ],
    },
    {
      scenario: 'An officer\'s report shows he picked up a knife from the floor, moved it to the kitchen counter for better lighting, and then photographed it there. There is no photograph of the knife in its original position.',
      text: 'What is the supervisory catch?',
      options: [
        'In-place documentation failure — a photograph taken after the item was moved cannot establish its original position; the chain requires documenting evidence in place before first touch, and this gap should be noted and the lesson reinforced.',
        'Nothing needs flagging — a clear photograph is a clear photograph, regardless of where it was actually taken.',
        'Direct the officer to move the knife back to the floor and then re-photograph it in that position.',
        'Suppress the knife as evidence entirely, on the basis that the officer moved it before photographing.'
      ],
    },
    {
      scenario: 'A submitted evidence package shows signs it was opened and re-taped, but the report says nothing about who opened it, when, why, or the condition of the seal before opening.',
      text: 'How do you handle the seal integrity issue?',
      options: [
        'Approve it — the evidence package is sealed shut now, which is really what matters most here.',
        'Return it for documentation of the opening — who was present, the condition of the seal before opening, and the reason — because unsealed or re-sealed packaging without documentation creates a tampering argument the chain must answer.',
        'Direct the officer to apply fresh evidence tape to the package and then say nothing further about it.',
        'Discard the item altogether and have the officer re-collect it again from the original scene.'
      ],
    },
    {
      scenario: 'During review you find an evidence item that was collected at 14:00 but, by the documentation, cannot be accounted for between collection and its 19:30 entry into the property room. The officer says he "had it the whole time."',
      text: 'What does the chain-of-custody standard require here?',
      options: [
        'Accept the officer\'s verbal statement that he personally had the item in his control the whole time.',
        'Approve the submission simply because the officer himself is generally credible and reliable.',
        'Suppress the item from evidence without conducting any further inquiry into the custody gap.',
        'Treat the unaccounted period as a gap in custody — Pennsylvania courts ask whether there is a reasonable probability the evidence was not altered or substituted, and it is documentation, not memory, that answers that; require the custody to be documented and securing in a locker not to be deferred again.'
      ],
    },
    {
      scenario: 'An officer asks why the Property Record Form matters so much when he clearly remembers exactly how he handled each item and can testify to it.',
      text: 'How do you explain the standard under Rule 648 and the challenge standard?',
      options: [
        'Tell him that his own memory of handling each item is sufficient and the form is really just bureaucracy.',
        'Tell him that the Property Record Form only truly matters in serious homicide cases, not routine ones.',
        'Explain that under Rule 648 physical evidence must be authenticated and chain-of-custody documentation is the foundation of that authentication; courts ask whether there is a reasonable probability the evidence was not altered, and documentation — not memory — answers that challenge at trial.',
        'Tell him to just keep a personal notebook of how he handled each item instead of filling out the form.'
      ],
    },
    {
      scenario: 'An officer submits several items from one scene with one Property Record Form that lumps them together, omitting individual item numbers, where each was collected, and how each was packaged.',
      text: 'What do you require before approving?',
      options: [
        'Approve it — using one single form for the entire scene is simpler and sufficient for the submission.',
        'Return it for complete per-item documentation — Order 3.05/3.06 requires the form to document each item\'s collection, packaging, and custody, with item numbers and labeling, because the form is the chain for every item, not a single summary.',
        'Approve it for now, but tell the officer that he should itemize each piece separately next time.',
        'Combine all of the items into one single sealed package, so that they match the lumped form.'
      ],
    },
    {
      scenario: 'Over several incidents, one officer has repeatedly carried evidence across shifts before completing the Property Record Form, packaged a biological item in plastic once, and skipped in-place documentation. You coached him on the chain after the first incident.',
      text: 'What is the appropriate supervisory response now?',
      options: [
        'Move to documented corrective action and targeted training on the Order 3.05/3.06 chain-of-custody requirements, because a repeated pattern after coaching is a supervisory and training issue, and each gap is a future suppression motion; escalate as warranted.',
        'Keep fixing each evidence submission individually as it comes in and continue coaching the officer only informally.',
        'Quietly stop assigning the officer to any calls that might generate physical evidence going forward.',
        'Approve the submissions as-is to keep the cases moving, and address the whole issue at his annual review.'
      ],
    },
  ];
}

/* ══════════════════════════════════════════
   SUPERVISOR SCENARIO — Evidence & Chain of Custody (MTPD)
   You review Officer Stokes's evidence submission from a Magazine Road
   burglary. Fictional officer.
══════════════════════════════════════════ */
const SCENARIO_EVIDENCE_SUP = {
  id: 'scenario-evidence-chain-of-custody-sup',
  title: 'Supervisor Review — Magazine Road Burglary Evidence',
  location: 'Evidence Review — Marlborough Township, PA',
  totalDecisions: 3,
  nodes: {
    'start': {
      type: 'scene',
      time: '05:50',
      weather: 'End of Shift',
      unit: 'Shift Supervisor',
      narrative: [
        'Officer Stokes\'s evidence submission from a residential burglary on Magazine Road is on your desk near end of shift. The narrative references a crowbar, a bloodstained cloth, and a knife.',
        'Your approval represents that this chain is unbroken on paper. Every item has to be accounted for before it moves toward the property room.'
      ],
      next: 'd1'
    },
    'd1': {
      type: 'decision',
      decisionNumber: 1,
      situation: 'The report references the crowbar "held as evidence," but there is no Property Record Form for it, the crowbar is still in Stokes\'s patrol car, and he tells you he will "log it in at the start of tomorrow\'s shift."',
      question: 'How do you handle it?',
      options: [
        { text: 'Approve it — the form can follow next shift.', next: 'c1a', quality: 'bad', shortLabel: 'Allowed an over-shift custody gap' },
        { text: 'Hold approval — require the Property Record Form completed before end of shift and the crowbar secured in a temporary locker tonight, because evidence does not sit in a patrol car.', next: 'c1b', quality: 'good', shortLabel: 'Closed the custody gap before approval' },
        { text: 'Approve it and complete the Property Record Form yourself.', next: 'c1c', quality: 'risky', shortLabel: 'Did the collecting officer\'s form' },
        { text: 'Tell Stokes to leave the crowbar in his car until he\'s back on.', next: 'c1d', quality: 'bad', shortLabel: 'Left evidence in personal control' },
      ]
    },
    'c1a': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'A Gap You Approved',
      heading: 'Evidence in a patrol car overnight with no form is the textbook chain break.',
      narrative: [
        'You approved a submission with the crowbar unaccounted for between collection and a next-shift log-in. Defense counsel only needs that gap to argue tampering or substitution, and the form that should have closed it tonight does not exist.',
        '"I\'ll log it tomorrow" is how chains break.'
      ],
      legal: 'MTPD Order 3.05/3.06: Property Record Form completed before end of shift; evidence secured in a temporary locker, never a patrol car.',
      next: 'd2'
    },
    'c1b': {
      type: 'consequence', outcomeClass: 'outcome-good', outcomeLabel: 'Chain Kept Intact',
      heading: 'You required the form and the locker tonight — the gap never opened.',
      narrative: [
        'You hold approval until Stokes completes the Property Record Form documenting collection and custody and secures the crowbar in a temporary locker with the transfer documented. The chain stays unbroken from the scene forward.',
        'Minutes at the desk tonight versus a suppression fight months from now — easy trade.'
      ],
      legal: 'MTPD Order 3.05/3.06: Property Record Form before end of shift; immediate securing in authorized storage with documented transfer.',
      next: 'd2'
    },
    'c1c': {
      type: 'consequence', outcomeClass: 'outcome-neutral', outcomeLabel: 'Not Your Form',
      heading: 'The collecting officer documents the chain — completing it for him misstates it.',
      narrative: [
        'A Property Record Form filled out by a supervisor who did not collect the crowbar misstates who handled it and when. The officer who recovered the item is the one who must document the chain from the moment of seizure.',
        'Require Stokes to complete his own form before you approve.'
      ],
      legal: 'MTPD Order 3.05/3.06: the form documents the collecting officer\'s custody; it is the chain and must be authored by the person who held the evidence.',
      next: 'd2'
    },
    'c1d': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Personal Control Is Not Custody',
      heading: 'Leaving the crowbar in Stokes\'s car overnight is the gap, not a workaround.',
      narrative: [
        'Telling Stokes to keep the crowbar in his car until his next shift is exactly the unauthorized-storage gap that destroys admissibility. Evidence belongs in a temporary locker, documented — not in personal control.',
        'Form and locker tonight.'
      ],
      legal: 'MTPD Order 3.05/3.06: evidence is secured in temporary lockers, not a patrol car or personal control; the transfer is documented.',
      next: 'd2'
    },
    'd2': {
      type: 'decision',
      decisionNumber: 2,
      situation: 'The bloodstained cloth has been collected and sealed inside a plastic zip bag for the submission.',
      question: 'What do you require for the biological evidence?',
      options: [
        { text: 'Approve it — a sealed plastic bag keeps it contained.', next: 'c2a', quality: 'bad', shortLabel: 'Approved a biological in plastic' },
        { text: 'Return it for repackaging in paper — biological evidence needs the breathability paper provides, and plastic invites decomposition and a DNA-integrity challenge.', next: 'c2b', quality: 'good', shortLabel: 'Required paper packaging' },
        { text: 'Direct that the bagged cloth be frozen as-is in the plastic.', next: 'c2c', quality: 'bad', shortLabel: 'Locked in the plastic-packaging error' },
        { text: 'Approve it and note the packaging issue only in the officer\'s file.', next: 'c2d', quality: 'risky', shortLabel: 'Documented but didn\'t fix it' },
      ]
    },
    'c2a': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Plastic Degrades the Case',
      heading: 'A biological in plastic decomposes — and the defense knows it.',
      narrative: [
        'Approving the bloodstained cloth in plastic lets decomposition begin and hands the defense a DNA-integrity challenge. Order 3.05/3.06 requires paper for physical evidence precisely so biologicals can breathe.',
        'Repackaging in paper now protects the evidence and the case.'
      ],
      legal: 'MTPD Order 3.05/3.06: physical evidence packaged in paper; biological evidence requires breathability plastic prevents.',
      next: 'd3'
    },
    'c2b': {
      type: 'consequence', outcomeClass: 'outcome-good', outcomeLabel: 'Repackaged Right',
      heading: 'You sent the biological back for paper before decomposition or a challenge set in.',
      narrative: [
        'You return the cloth for repackaging in paper, sealed and labeled per policy. The breathability preserves the sample and forecloses the DNA-integrity argument a plastic bag would have invited.',
        'For biologicals, it is always paper.'
      ],
      legal: 'MTPD Order 3.05/3.06: paper packaging for physical evidence; biologicals always paper.',
      next: 'd3'
    },
    'c2c': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Freezing Doesn\'t Fix Plastic',
      heading: 'Locking the cloth in plastic — frozen or not — keeps the packaging error in place.',
      narrative: [
        'Directing the bagged cloth to be frozen as-is preserves the wrong packaging and the challenge that comes with it. The requirement is paper for breathability, not plastic kept cold.',
        'Repackage in paper.'
      ],
      legal: 'MTPD Order 3.05/3.06: biological evidence is packaged in breathable paper.',
      next: 'd3'
    },
    'c2d': {
      type: 'consequence', outcomeClass: 'outcome-neutral', outcomeLabel: 'Noting It Isn\'t Fixing It',
      heading: 'Documenting the packaging error while approving it leaves the evidence degrading.',
      narrative: [
        'Recording the issue in the officer\'s file but approving the plastic-packaged biological still sends a degrading sample and a live DNA challenge forward. The fix is to repackage now, then coach.',
        'Return it for paper before approval.'
      ],
      legal: 'MTPD Order 3.05/3.06: the corrective is proper paper packaging, not a note alongside an approved error.',
      next: 'd3'
    },
    'd3': {
      type: 'decision',
      decisionNumber: 3,
      situation: 'The knife\'s package shows tape that was clearly cut and re-applied. The report says nothing about it. Separately, the report\'s only photo of the knife shows it on a kitchen counter — Stokes\'s narrative notes he moved it there from the floor "for a clearer picture," with no photo of its original position.',
      question: 'How do you handle the seal and the in-place documentation?',
      options: [
        { text: 'Approve it — the knife is sealed now and clearly photographed.', next: 'c3a', quality: 'bad', shortLabel: 'Ignored the seal and in-place gaps' },
        { text: 'Return it — require documentation of the seal opening (who, when, why, seal condition) and flag the in-place failure, since a photo taken after the knife was moved cannot establish its original position.', next: 'c3b', quality: 'good', shortLabel: 'Addressed seal integrity + in-place gap' },
        { text: 'Direct Stokes to re-tape the package and move the knife back for a new photo.', next: 'c3c', quality: 'bad', shortLabel: 'Staged the scene and hid the seal break' },
        { text: 'Approve it and remind Stokes about photos next time.', next: 'c3d', quality: 'risky', shortLabel: 'Deferred both issues' },
      ]
    },
    'c3a': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Two Open Doors for the Defense',
      heading: 'A re-taped seal with no record and a moved-then-photographed knife are both tampering arguments.',
      narrative: [
        'Approving it leaves an undocumented seal break and a photo that cannot establish the knife\'s original position — two separate arguments handed to defense counsel. Neither is cured by the knife being sealed and visible now.',
        'Both gaps had to be addressed before approval.'
      ],
      legal: 'MTPD Order 3.05/3.06: document every opening (who, when, why, seal condition); in-place documentation before first touch is non-negotiable.',
      next: 'debrief'
    },
    'c3b': {
      type: 'consequence', outcomeClass: 'outcome-good', outcomeLabel: 'Closed Both Gaps',
      heading: 'You required the seal documentation and flagged the in-place failure.',
      narrative: [
        'You return it for documentation of the seal opening — who was present, when, why, and the condition before opening — and you flag the in-place failure honestly: the after-move photo can\'t establish the knife\'s original position, and that goes in the record rather than being staged away. The chain is documented for what actually happened.',
        'Honesty about the in-place gap is part of the integrity the chain depends on.'
      ],
      legal: 'MTPD Order 3.05/3.06: seal openings documented; in-place documentation before first touch; Rule 648 authentication rests on accurate chain records.',
      next: 'debrief'
    },
    'c3c': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Don\'t Stage It Away',
      heading: 'Re-taping quietly and re-staging the photo manufactures a false record.',
      narrative: [
        'Directing Stokes to re-tape the package and move the knife back for a new "original" photo conceals the seal break and fabricates a scene that no longer exists. That is far worse than the original gaps — it is falsification.',
        'Document the seal opening truthfully and flag the in-place failure for what it is.'
      ],
      legal: 'MTPD Order 3.05/3.06 and Rule 648: the chain is documented truthfully; staging or concealing breaks the integrity authentication depends on.',
      next: 'debrief'
    },
    'c3d': {
      type: 'consequence', outcomeClass: 'outcome-neutral', outcomeLabel: 'These Don\'t Wait',
      heading: 'A reminder for next time leaves this knife\'s chain defective now.',
      narrative: [
        'Approving and reminding Stokes later leaves the undocumented seal break and the in-place gap in this case file. Both need to be addressed on this submission, before it moves forward.',
        'Return it for the seal documentation and flag the in-place issue now.'
      ],
      legal: 'MTPD Order 3.05/3.06: seal and in-place documentation are corrected on the submission, not deferred.',
      next: 'debrief'
    },
    'debrief': { type: 'debrief' },
  }
};
