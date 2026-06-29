
/* ── Reading: Evidence & Chain of Custody (EGPD) ─ */
const DEBRIEF_EVIDENCE = `
  <h3>Key Legal Principles — Evidence &amp; Chain of Custody</h3>
  <p><strong>The first officer owns the scene until handoff.</strong> No unauthorized access — including victims and property owners — until detectives or crime scene personnel have documented and cleared it. Scene contamination is the most common chain-of-custody vulnerability in burglary prosecutions; collect names, contacts, and a preliminary missing-items list from outside the perimeter.</p>
  <p><strong>Document before you touch.</strong> Photograph each item from multiple angles in its exact discovered position, with a scale reference where available, before anyone moves it. Even "protective" moving or bagging before in-place photography breaks the chain — good intentions included. Written descriptions and sketches supplement photographs; they do not replace them.</p>
  <p><strong>Package by evidence type.</strong> Biological material goes in paper — never airtight plastic, which traps moisture and degrades DNA; hard items go in plastic, sealed and labeled. Improvised packaging from a patrol trunk is how location data on a phone becomes inadmissible.</p>
  <p><strong>Every handler is documented.</strong> Name, time, and reason for each transfer, from collection through property-room submission to lab intake. For a hospital blood draw in a DUI case: collection date/time, nurse and facility, kit ID, how it was sealed, transport, and submission — Pennsylvania DUI prosecutions frequently hinge on exactly that record. Surface supervisor pressure to shortcut with communication, not silent compliance or flat refusal.</p>
  <p><strong>Testify to what you documented — 18 Pa. C.S. § 4902.</strong> Testify to exactly what your records show and acknowledge gaps without speculating; asserting confidence about a period you don't remember is speculation under oath, and perjury is where overstated certainty lands. Courts forgive minor documentation gaps where procedure is established and integrity is corroborated — they do not forgive a witness caught overstating. If a seal looks disturbed, stop, notify the property-room supervisor, document it contemporaneously, and tell the prosecutor before the court date.</p>
`;

const READING_EVIDENCE = `
  <div class="content-block">
    <h4>Scenario</h4>
    <h2>First on scene at a residential burglary on Cherry St: a smashed rear window, a screwdriver with paint transfer, a cell phone that isn't the homeowners'. Detectives are 25 minutes out, the homeowners want inside, and your supervisor wants you clear for another call. Every pressure on you right now points toward breaking the chain.</h2>
    <p>This module covers first-officer scene preservation, in-place documentation, forensic packaging, the chain of custody from collection to courtroom — and how to testify about it honestly.</p>
  </div>
  <div class="content-block">
    <h4>First Officer Responsibilities</h4>
    <h2>You own the scene until you hand it off — and ownership means keeping everyone out.</h2>
    <ul class="key-points">
      <li><strong>No unauthorized access — including victims and property owners</strong> — until detectives or crime scene personnel have documented and cleared the scene. A well-meaning homeowner who kicks a phone under the refrigerator or picks up the screwdriver has just handed defense counsel a contamination argument. Scene contamination is the most common chain-of-custody vulnerability in burglary prosecutions.</li>
      <li><strong>Get what you need from outside the perimeter:</strong> names, contact information, and a preliminary list of known missing items can all be collected in the driveway, documented in your notes, without anyone entering the scene.</li>
      <li><strong>Leave items exactly as found.</strong> Document locations in your notes and prevent access. Even "protective" moving or bagging of an item before it is photographed in place breaks the chain — good intentions included.</li>
    </ul>
  </div>
  <div class="content-block">
    <h4>Collection Standards</h4>
    <h2>In-place photography first. Correct packaging always. Every handler documented.</h2>
    <ul class="key-points">
      <li><strong>In-place documentation:</strong> photograph the item from multiple angles in its exact discovered position, with a scale reference where available, before anyone touches it. Written descriptions and sketches supplement photography — they do not replace it.</li>
      <li><strong>Packaging by evidence type:</strong> biological material (blood, saliva, tissue, swabs) goes in <strong>paper</strong> — never airtight plastic, which traps moisture, accelerates bacterial growth, and degrades DNA. Hard items — tools, electronics — go in plastic, sealed and labeled. Improvised packaging from a patrol trunk is how location data on a suspect's phone becomes inadmissible.</li>
      <li><strong>The chain itself:</strong> every person who handles the evidence is documented — name, time, and reason for transfer — from collection through property room submission to lab intake. For a hospital blood draw in a DUI case: date and time of collection, the nurse's name and facility, the kit ID number, how it was sealed, your transport, and your property room submission. Pennsylvania DUI prosecutions frequently hinge on exactly this record.</li>
      <li><strong>A firearm at an unsecured scene</strong> is the responding officer's responsibility: photograph in place, note the exact location, collect using safety protocol, and document the recovery. Leaving evidence unattended for hours awaiting detectives creates the gap you were trying to avoid.</li>
      <li><strong>Supervisor pressure to shortcut?</strong> Communicate, don't just comply — and don't flatly refuse. "Detectives are 8 minutes out; if I collect now without proper packaging and in-place photography, we risk the chain of custody" gives a supervisor what they need to make an informed call. Improvised collection to clear a call faster is how prosecutions collapse months later.</li>
    </ul>
  </div>
  <div class="content-block">
    <h4>When the Chain Is Questioned</h4>
    <h2>Honest testimony about what you documented beats false certainty every time.</h2>
    <p>Six months from now, defense counsel will find the four-hour window you can't specifically remember. Testify to exactly what your documentation shows; acknowledge gaps without speculating about what occurred during them. Asserting confidence about a period you have no memory of is not testimony — it is speculation under oath, and 18 Pa. C.S. § 4902 (perjury) is where overstated certainty lands. Pennsylvania courts allow for minor documentation gaps where standard procedure is established and the evidence's integrity is corroborated; they do not forgive a witness caught overstating.</p>
    <p>Prepare by reviewing your documentation before trial, identifying gaps before defense counsel does, and flagging them to the prosecutor. And if you ever sign evidence out and the seal looks disturbed: stop, notify the property room supervisor, document the observation contemporaneously, and tell the prosecutor before the court date — never carry a known integrity question into a courtroom undisclosed.</p>
    <button class="btn-launch" onclick="startScenario('egpd-evidence-chain-of-custody')">Proceed to Scenario Exercise →</button>
  </div>
`;

/* ── Scenario: Evidence & Chain of Custody (EGPD) ─ */
const SCENARIO_EVIDENCE = {
  title: 'Evidence & Chain of Custody',
  location: 'Residential Burglary — Cherry St, East Greenville Borough, PA',
  totalDecisions: 3,
  nodes: {
    start: {
      type: 'scene',
      time: '1422',
      weather: 'Clear, 74°F',
      unit: 'Unit 7903',
      narrative: [
        'You are the first officer on scene at a reported residential burglary on Cherry St. Homeowners returned from a weekend away to find a rear window smashed and the house ransacked. They are standing in the driveway.',
        'You clear the residence and confirm it is unoccupied. Inside the kitchen you find the point of entry — a broken pane in the back door. On the floor near the sink you observe a flathead screwdriver with what appears to be paint transfer, and a cell phone that does not belong to the homeowners.',
        'The homeowners have not entered the kitchen. You have not touched anything. Detectives have been notified and are en route — ETA 25 minutes.'
      ],
      next: 'd1'
    },
    d1: {
      type: 'decision',
      decisionNumber: 1,
      situation: 'The screwdriver and cell phone are clearly visible on the kitchen floor. The homeowners are asking if they can come inside to check what was taken. Detectives are 25 minutes out.',
      question: 'How do you handle the scene and the homeowners?',
      options: [
        {
          text: 'Let the homeowners do a quick walkthrough to identify what\'s missing — you need that information for the report and they are eager to help. You\'ll document the evidence after they finish.',
          shortLabel: 'Allow homeowner walkthrough to identify missing items',
          quality: 'bad',
          next: 'c1-bad'
        },
        {
          text: 'Keep the homeowners out of the kitchen and away from the evidence. Explain that detectives need to see it undisturbed. Get their information and a preliminary list of known missing items from the driveway.',
          shortLabel: 'Preserve scene — get info from homeowners outside',
          quality: 'good',
          next: 'c1-good'
        }
      ]
    },
    'c1-bad': {
      type: 'consequence',
      outcomeClass: 'outcome-bad',
      outcomeLabel: 'Scene Compromised',
      heading: 'The homeowners moved through the kitchen. The cell phone was accidentally kicked. The screwdriver has new fingerprints on it.',
      narrative: [
        'The homeowners meant well. They moved quickly through the kitchen, bumped the cell phone under the refrigerator, and one of them picked up the screwdriver to look at it before you could stop them.',
        'The scene is compromised. The forensic value of both items has been significantly reduced. Detectives will note the contamination in their report. If this case goes to prosecution, defense counsel will use the compromised chain of custody to challenge the evidence.',
        'Preserving the scene is not a courtesy to detectives — it is a legal requirement. First officers own the scene until they hand it off. That ownership means keeping everyone out, including victims.'
      ],
      legal: 'Compromised scenes are attacked two ways: at suppression (Pa.R.Crim.P. 581) where collection procedures are challenged, and at trial, where contamination and chain gaps go to the weight and credibility of the evidence. First officer scene preservation duties include preventing unauthorized access to the crime scene by all persons, including victims and property owners, until detectives assume control.',
      next: 'd2'
    },
    'c1-good': {
      type: 'consequence',
      outcomeClass: 'outcome-good',
      outcomeLabel: 'Scene Preserved',
      heading: 'You held the line. The homeowners are frustrated but cooperative. The evidence is untouched.',
      narrative: [
        '"I need you to stay outside for now. I know that\'s hard — it\'s your house. Detectives are coming and they need to see everything exactly as it is. The more we preserve right now, the better chance we have of identifying who did this."',
        'They understood. You got their names, contact info, and a verbal list of high-value items they knew were in the house — cash in the bedroom, a laptop, jewelry. You documented it in your notes without anyone entering the kitchen.',
        'The scene is intact. The cell phone and screwdriver are exactly where the burglar left them.'
      ],
      legal: 'First officer responsibilities: Establish and maintain a crime scene perimeter. No unauthorized access — including by victims and property owners — until detectives or crime scene personnel assume control and document the scene. Scene contamination is the most common chain of custody vulnerability in burglary prosecutions.',
      next: 'd2'
    },
    d2: {
      type: 'decision',
      decisionNumber: 2,
      situation: 'Detectives have not yet arrived. Your supervisor calls and asks you to collect the cell phone and screwdriver and transport them to the station so you can clear for a high-priority call across the borough.',
      question: 'How do you handle the supervisor\'s directive?',
      options: [
        {
          text: 'Follow the order. Package both items in whatever bags you have in your patrol car, note the time collected, and transport them to the station. You\'ll write up the chain of custody later.',
          shortLabel: 'Collect and transport as directed — document later',
          quality: 'bad',
          next: 'c2-bad'
        },
        {
          text: 'Advise your supervisor of the situation — detectives are 10 minutes out, the scene is preserved, and improvised packaging could compromise the forensic value of both items. Request a brief delay or a second unit to hold the scene.',
          shortLabel: 'Advise supervisor — request brief hold or second unit',
          quality: 'good',
          next: 'c2-good'
        }
      ]
    },
    'c2-bad': {
      type: 'consequence',
      outcomeClass: 'outcome-bad',
      outcomeLabel: 'Chain of Custody Broken',
      heading: 'The improvised collection created a chain of custody gap that followed the case through prosecution.',
      narrative: [
        'Patrol car evidence bags are not standardized forensic packaging. The screwdriver was placed in a plastic shopping bag from your trunk. The cell phone went into an unsealed paper envelope. Neither item was photographed in place before collection.',
        'At the station, you wrote the chain of custody entry from memory — approximate times, no witness signature for the transfer. The packaging was not heat-sealed.',
        'Defense counsel filed a suppression motion three months later. The cell phone data — which included location information placing the suspect near the scene — was ruled inadmissible. The prosecution\'s case collapsed. Proper packaging and documentation would have prevented it.'
      ],
      legal: 'Pennsylvania chain of custody requirements: Each person who handles evidence must be documented — name, time, and reason for transfer. Evidence must be collected using appropriate forensic packaging and documented with in-place photography before collection. Gaps in chain of custody create suppression vulnerabilities that defense counsel are trained to exploit.',
      next: 'd3'
    },
    'c2-good': {
      type: 'consequence',
      outcomeClass: 'outcome-good',
      outcomeLabel: 'Proper Handoff — Evidence Intact',
      heading: 'You pushed back correctly. Detectives arrived, documented everything in place, and collected with proper chain of custody.',
      narrative: [
        '"Sarge, detectives are 8 minutes out. The scene is clean — two items untouched on the kitchen floor. If I collect now without proper packaging and in-place photography, we risk the chain of custody. I\'d rather hold 8 more minutes and hand this off correctly than compromise a prosecution."',
        'There was a pause. "Understood. Hold the scene. I\'ll get another unit for the other call."',
        'Detectives photographed both items in place, collected with proper forensic packaging, and signed the initial chain of custody with you as the preserving officer. The cell phone was later linked to a suspect with a prior residential burglary conviction. The case went to trial with clean evidence.'
      ],
      legal: 'In-place documentation before collection: All evidence must be photographed in its discovered location before being moved or collected. Proper forensic packaging — paper bags for biological material, plastic for hard items, sealed and labeled — is required for chain of custody integrity. The preserving officer\'s name is part of the chain — document your role accurately.',
      next: 'd3'
    },

    'd3': {
      type: 'decision',
      decisionNumber: 3,
      situation: 'Six months later, you are testifying at trial. Defense counsel is cross-examining you on chain of custody. She points to a period of approximately four hours between your logging the evidence into the property room and the forensic lab\'s receipt timestamp — and suggests there is an unexplained gap. You do not have a specific memory of those four hours because it was a standard transfer on a night with several other calls. Your documentation shows the transfer was completed but does not include the handoff contact\'s name.',
      question: 'How do you respond under oath?',
      options: [
        {
          text: 'Testify that you are confident the evidence was not tampered with during that window — you would have noticed any issue.',
          shortLabel: 'Assert confidence — evidence was not tampered with',
          quality: 'bad',
          next: 'c3-bad'
        },
        {
          text: 'Testify to exactly what your documentation shows. State that you do not have a specific memory of the transfer contact but that the documented chain reflects standard procedure. Acknowledge the documentation gap without speculating about what occurred during it.',
          shortLabel: 'Testify to documentation, acknowledge gap honestly',
          quality: 'good',
          next: 'c3-good'
        },
        {
          text: 'Say that standard procedure was followed and that you cannot speak to specific details beyond what is in your report.',
          shortLabel: 'Reference standard procedure, decline specifics',
          quality: 'risky',
          next: 'c3-neutral'
        }
      ]
    },
    'c3-bad': {
      type: 'consequence',
      outcomeClass: 'outcome-bad',
      outcomeLabel: 'Perjury Risk',
      heading: 'Asserting facts you cannot actually attest to is perjury — regardless of belief.',
      narrative: [
        'Testifying that you are "confident" something did not happen when you have no memory of the specific period is not testimony — it is speculation stated as fact, under oath. It does not matter that you believe the evidence was handled correctly. You cannot testify to what you did not witness.',
        'Defense counsel has now established that your memory of this transfer is limited. If you assert certainty, she will press for details you cannot provide. When you cannot provide them, your credibility collapses — and takes the prosecution\'s case with it.',
        'Honest testimony about what you know and do not know is stronger than false certainty. Prosecutors know how to work with gaps in documentation. They cannot work with a witness who has been caught overstating.'
      ],
      legal: '18 Pa. C.S. § 4902 — Perjury. Testifying to facts you cannot actually recall constitutes false testimony under oath. Additionally, the gap in documentation should have been identified and disclosed to the prosecutor before trial — that is your obligation when you review your notes prior to testimony.',
      next: 'debrief'
    },
    'c3-good': {
      type: 'consequence',
      outcomeClass: 'outcome-good',
      outcomeLabel: 'Credible and Correct',
      heading: 'Honest, specific testimony about what you documented is the most legally defensible position.',
      narrative: [
        'Acknowledging what is in your documentation, what you recall, and where your documentation has a gap is exactly what courts expect from honest witnesses. You are not required to have a perfect memory — you are required to tell the truth about what you have.',
        'The prosecution can address the documentation gap through the lab\'s intake records, the property room log, and through the forensic analyst\'s testimony. Your role is to testify truthfully to your part of the chain.',
        'Officers who testify precisely — without embellishment, without minimizing gaps — are the most credible witnesses. That credibility is earned over years and lost in seconds.'
      ],
      legal: 'Pennsylvania Rules of Evidence and case law on chain of custody allow for minor documentation gaps when standard procedure is established and the evidence\'s integrity is corroborated by other evidence. Honest acknowledgment of a gap, without speculation, is legally preferable to contested false certainty.',
      next: 'debrief'
    },
    'c3-neutral': {
      type: 'consequence',
      outcomeClass: 'outcome-neutral',
      outcomeLabel: 'Technically Safe — But Evasive',
      heading: 'Referring to standard procedure without addressing the specific gap leaves the impression of avoidance.',
      narrative: [
        'Saying "standard procedure was followed" when you cannot specifically recall the transfer is accurate — but it is the kind of answer that looks evasive under cross-examination. Defense counsel will follow up, and if you cannot provide specific details to back up the procedure claim, you lose credibility.',
        'The better answer: testify to what you documented, acknowledge the gap, and let the record stand as it is. That is honest and specific without overreaching.',
        'Prepare your testimony by reviewing your report thoroughly before trial and identifying gaps before defense counsel does. Notify the prosecutor of any documentation issues — that is part of your job.'
      ],
      legal: 'Witnesses who give procedural, nonspecific answers invite follow-up questioning that exposes the gaps they were trying to avoid. Specific, honest testimony is more defensible than generalized procedure references. Review documentation before testifying and flag issues to the prosecutor.',
      next: 'debrief'
    },
    debrief: { type: 'debrief' }
  }
};

function getEvidenceQuestions() {
  return [
    {
      scenario: 'You are the first officer at a residential burglary. The homeowners are on scene and want to walk through the house to check what was taken.',
      text: 'What is the correct approach to managing the homeowners\' access to the scene?',
      options: [
        'Keep them out of the structure until detectives or crime scene personnel have documented and cleared the scene.',
        'Allow them to do a quick walkthrough with you present so you can document missing items.',
        'Let them check rooms that were not directly affected by the break-in.',
        'Allow access to any area not immediately adjacent to the point of entry.'
      ],
      correct: 0,
      feedback: 'Correct. First officers own the scene until it is formally handed off to detectives or crime scene personnel. All unauthorized persons — including victims and property owners — must be kept out of the crime scene until it has been documented. Any person who enters before documentation can contaminate fingerprints, trace evidence, and body position. This is one of the most common chain of custody vulnerabilities in burglary cases.'
    },
    {
      scenario: 'You discover a cell phone on the floor of a burglary scene that clearly does not belong to the homeowners. Detectives are 15 minutes out.',
      text: 'What is the correct procedure for this item before detectives arrive?',
      options: [
        'Photograph it in place and pick it up to prevent it from being accidentally kicked or moved.',
        'Place it in an evidence bag and secure it in your patrol vehicle to protect it.',
        'Ask the homeowners if they recognize it before taking any action.',
        'Leave it exactly as found, document its location in your notes, and prevent anyone from entering the area.'
      ],
      correct: 3,
      feedback: 'Correct. In-place documentation before collection is mandatory. The item must be photographed in its discovered location by the collecting officer — in this case, the detective. Your role as the first officer is to preserve the scene, document observations, and prevent unauthorized access. Moving or bagging the item before it is photographed in place breaks the chain of custody, even with good intentions.'
    },
    {
      scenario: 'Your supervisor orders you to collect two items of evidence and transport them to the station immediately so you can clear for a priority call.',
      text: 'What is the correct response?',
      options: [
        'Advise the supervisor of the situation, including the detective ETA, and request a brief delay or a second unit to hold the scene.',
        'Follow the order — supervisor authority supersedes standard evidence protocols.',
        'Collect the items and transport them, but document the supervisor\'s name in the chain of custody.',
        'Refuse the order and remain on scene regardless of the supervisor\'s directive.'
      ],
      correct: 0,
      feedback: 'Correct. Advising your supervisor of the situation — detective ETA, the evidence involved, and the chain of custody risk — is the professional response. Supervisors can make informed decisions when given accurate information. Improvised collection without proper packaging and in-place documentation creates suppression vulnerabilities that can destroy a prosecution. Outright refusal of the order is not the answer either — communication is.'
    },
    {
      scenario: 'You need to document a piece of evidence before a detective arrives. The scene is outdoors and the item is on the ground.',
      text: 'Which of the following best describes proper in-place documentation before collection?',
      options: [
        'Write a detailed description of the item in your notebook.',
        'Sketch the scene and mark the item\'s approximate location.',
        'Verbally describe the item to dispatch so it is recorded on the radio log.',
        'Photograph the item from multiple angles in its exact discovered position, including a scale reference if available, before anyone touches it.'
      ],
      correct: 3,
      feedback: 'Correct. In-place photography from multiple angles — including a scale reference — is the standard for documenting physical evidence before collection. Written descriptions and sketches are supplementary documentation tools, not substitutes for photography. The photograph establishes the item\'s position, condition, and location at the moment of discovery — which is critical when chain of custody is challenged in court.'
    },
    {
      scenario: 'You collect a biological swab from a crime scene. What is the correct packaging for this item?',
      text: 'Biological evidence must be packaged in:',
      options: [
        'A sealed plastic bag with an evidence sticker.',
        'A paper bag or paper envelope — never airtight plastic — to allow moisture to escape and prevent degradation.',
        'Any available container, as long as it is sealed and labeled.',
        'Aluminum foil wrap with a chain of custody tag attached.'
      ],
      correct: 1,
      feedback: 'Correct. Biological evidence — blood, saliva, tissue — must be packaged in paper, not plastic. Airtight plastic traps moisture and accelerates bacterial growth, which degrades DNA and can render biological evidence useless. Proper forensic packaging for biological items is paper bags or paper envelopes, air-dried before sealing. Hard evidence like tools or electronics goes in plastic. Knowing which packaging applies to which evidence type is a basic chain of custody requirement.'
    },
    {
      scenario: 'You collect a blood sample from a DUI suspect at the hospital. The sample is collected by a nurse using a department-approved kit. You witness the collection.',
      text: 'What documentation steps are required to preserve the chain of custody for this sample?',
      options: [
        'Document that you were present — the nurse\'s records handle the rest.',
        'The hospital\'s records constitute the chain of custody for any sample collected in a medical facility.',
        'Document the collection: time, location, who collected it, the kit number, how it was sealed, and how it was transported from the hospital to the property room — with your continuous control or handoff documentation at each step.',
        'Chain of custody only applies to physical evidence at crime scenes, not medical samples.'
      ],
      correct: 2,
      feedback: 'Correct. Blood samples in DUI cases require a documented chain of custody from collection to analysis. Your documentation should include: the date and time of collection, the nurse\'s name and facility, the kit ID number, how the sample was sealed and labeled, your transport from the hospital, and your property room submission with time and submission number. Any gap in this chain can result in suppression or weight challenges at trial. Pennsylvania DUI prosecutions frequently hinge on chain of custody integrity.'
    },
    {
      scenario: 'You are securing a crime scene and notice a firearm on the ground. Another officer present suggests photographing it and leaving it for detectives to collect rather than recovering it yourself.',
      text: 'What is the appropriate response?',
      options: [
        'Follow the suggestion — detectives have the authority and training to collect firearms.',
        'Secure the area around the firearm and await detective arrival without touching or documenting it.',
        'The suggestion is correct if detectives will arrive within two hours.',
        'Recover the firearm yourself according to department protocol: photograph it in place, note the exact location, collect it using appropriate safety procedures, and document the recovery in your report.'
      ],
      correct: 3,
      feedback: 'Correct. Leaving evidence unattended and uncollected at an unsecured crime scene creates chain of custody problems and evidence integrity risk. If you are the officer present and the scene requires evidence collection, that is your responsibility unless department protocol specifically directs otherwise. Photograph in place, document location, collect using protocol, and complete the chain with proper property room submission. Detectives can also be involved in analysis — but initial collection and documentation is the responding officer\'s responsibility.'
    },
    {
      scenario: 'You retrieve previously submitted evidence from the property room for an upcoming court appearance. When you sign it out, you notice the evidence seal appears to have been disturbed.',
      text: 'What is your obligation?',
      options: [
        'Refuse to sign it out, notify the property room supervisor immediately, document the observation, and notify the prosecutor before the court date. The integrity of the evidence is now in question.',
        'Sign it out and proceed to court — it may just be a storage issue.',
        'Re-seal the evidence and note the re-sealing in your report.',
        'Inspect the contents to determine if anything is missing before deciding how to proceed.'
      ],
      correct: 0,
      feedback: 'Correct. A disturbed evidence seal is a chain of custody integrity issue that must be reported before the evidence goes to court. Taking it to court with an observed integrity question — without disclosure — creates a much larger problem than addressing it before trial. Notify the property room supervisor, document your observation contemporaneously, and notify the prosecutor so they can make an informed decision about how to proceed. The prosecutor may have the ability to address it; taking it to court without disclosure does not.'
    },
  ];
}

/* ══════════════════════════════════════════
   SUPERVISOR OVERLAY — Evidence & Chain of Custody (EGPD)
   The module's decisive mistake is a supervisor's order. The
   overlay owns that, and the property-room/system responsibility.
══════════════════════════════════════════ */
const SUPERVISOR_EVIDENCE = `
  <div class="content-block">
    <h4>Supervisor Focus</h4>
    <h2>In this module the pressure to break the chain comes from a supervisor on the radio. That supervisor is you.</h2>
    <p>Most of these scenarios test the officer. This one tests you. The decisive mistake in the module — "collect the items, transport them, clear for the priority call" — is a supervisor's order, given for a real and sympathetic reason: you have another call holding and a finite number of units. The supervisory discipline is to recognize that the eight minutes you save by shortcutting a scene can cost a prosecution six months later, and to solve the staffing problem without solving it on the evidence. Resource the scene; do not sacrifice it.</p>
  </div>
  <div class="content-block">
    <h4>Answer the Pushback Correctly</h4>
    <p>When an officer keys up and says, "Sarge, detectives are eight minutes out — if I collect now without proper packaging and in-place photography we risk the chain of custody," that officer is doing exactly what this department needs. The wrong response is to override them to clear a call; the right one is "Understood — hold the scene, I'll get another unit." An officer with the judgment and the spine to push back on a shortcut is protecting the case and the department, and how you receive that pushback decides whether they ever offer it again. Reward it. A supervisor who punishes a well-reasoned objection trains compliance — and compliance is how chains of custody break.</p>
  </div>
  <div class="content-block">
    <h4>Read the Chain for the Gap Before Defense Counsel Does</h4>
    <p>Every person who handles evidence is documented — name, time, reason for transfer — from collection through property-room submission to lab intake, and your review reads for the break in that sequence. The unsigned transfer, the four-hour window with no handoff name, the item collected before it was photographed in place, biological material sealed in plastic instead of paper: each is a vulnerability a reviewer can catch while it is still fixable. For a DUI blood draw, confirm the full record — collection time, the nurse and facility, the kit ID, the seal, the transport, the property-room submission — because Pennsylvania DUI prosecutions hinge on exactly that chain. Catching the gap on review and disclosing it to the prosecutor is far better than discovering it on the stand.</p>
  </div>
  <div class="content-block">
    <h4>You Own the System, Not Just the Case</h4>
    <ul class="key-points">
      <li><strong>Integrity is a department responsibility.</strong> Seals, logs, submission discipline, and a property room that can withstand an audit are systems you own — a weak system turns every officer's good collection into a vulnerability.</li>
      <li><strong>A disturbed seal is a stop-everything event.</strong> If an officer reports a seal that looks tampered, it is documented contemporaneously, the property-room supervisor is notified, and the prosecutor is told before the court date — never carried into a courtroom undisclosed.</li>
      <li><strong>Standardize the kit.</strong> Improvised packaging from a patrol trunk is a recurring, preventable failure — make sure your units carry and use proper forensic packaging so the chain never depends on what happened to be in someone's trunk.</li>
      <li><strong>Reinforce first-officer ownership.</strong> The responding officer owns the scene until handoff, including keeping victims and owners out — the most common contamination in burglary cases is the well-meaning homeowner.</li>
    </ul>
  </div>
  <div class="content-block">
    <h4>Prepare Officers to Testify Honestly</h4>
    <p>Six months out, defense counsel finds the gap and your officer is on the stand. Prepare them: review the documentation before trial, identify the gaps before the defense does, flag them to the prosecutor, and testify to exactly what the record shows — acknowledging a gap without speculating about it. The officer who asserts false certainty about a window they do not remember is one 18 Pa. C.S. § 4902 (perjury) problem away from losing the case and their credibility in every future one. Build the culture where an honest "I don't recall that specific transfer, but the documented chain reflects standard procedure" is understood as strength — because courts forgive a minor documented gap far sooner than a witness caught overstating.</p>
  </div>
  <div class="content-block">
    <h4>The Standard You Set Is the One That Survives a Busy Night</h4>
    <p>Evidence discipline erodes under exactly the conditions you manage — short staffing, stacked calls, the pull to clear a scene and move on. Every shortcut you authorize, and every one you refuse, tells your officers what the real standard is when the board is full. Hold it when it is inconvenient, resource the scenes that need holding, and make proper collection the path of least resistance rather than the heroic exception — because the case that collapses at trial is almost always the one where someone, somewhere, decided eight minutes mattered more than the chain.</p>
  </div>
`;

function getEvidenceSupervisorQuestions() {
  return [
    {
      scenario: 'You have a high-priority call holding across the borough and a finite number of units. One of your officers is preserving a burglary scene with two items of evidence untouched on the floor; detectives are eight minutes out.',
      text: 'What is the correct supervisory move?',
      options: [
        'Solve the staffing problem without sacrificing the scene: hold the scene for the handoff and send another unit to the priority call — the minutes saved by shortcutting collection can cost the prosecution months later.',
        'Order the officer to bag the items in whatever is in the patrol car and transport them so they can clear for the priority call.',
        'Tell the officer to leave the evidence unattended and respond to the priority call now.',
        'Cancel the detectives and have the patrol officer process the scene alone to save time.'
      ],
      correct: 0,
      feedback: 'Correct. The decisive mistake in this scenario is a supervisor\'s order to shortcut a preserved scene to clear a call. The discipline is to resource the scene — hold it for proper handoff and route another unit to the priority call — because improvised collection to save eight minutes is how prosecutions collapse.'
    },
    {
      scenario: 'You order an officer to collect and transport evidence to clear for another call. The officer responds: "Sarge, detectives are eight minutes out — if I collect now without proper packaging and in-place photography, we risk the chain of custody."',
      text: 'What is the right response?',
      options: [
        'Override the officer — your order to clear the call stands regardless.',
        'Reprimand the officer for questioning a direct order.',
        'Tell the officer to collect the evidence but document that they objected.',
        'Support the officer: "Understood, hold the scene, I\'ll get another unit." The officer is protecting the case, and rewarding that judgment is what keeps officers willing to raise it.'
      ],
      correct: 3,
      feedback: 'Correct. An officer who pushes back on a shortcut with sound reasoning is doing exactly what the department needs. The right response is to hold the scene and resource the other call. How a supervisor receives that pushback determines whether officers ever offer it again — punishing it trains the compliance that breaks chains of custody.'
    },
    {
      scenario: 'During pre-trial review of a case file, you find the chain-of-custody record has an approximately four-hour transfer window with no handoff contact name and no signature for the transfer.',
      text: 'What should you do?',
      options: [
        'Nothing — minor gaps are common and the defense probably will not notice.',
        'Instruct the officer to fill in a plausible name and time from memory.',
        'Catch it now: the unsigned, unnamed transfer is a fixable, disclosable vulnerability. Flag it to the prosecutor before trial so it can be addressed, rather than letting the officer discover it under cross-examination.',
        'Remove the evidence from the case to avoid the issue.'
      ],
      correct: 2,
      feedback: 'Correct. A reviewer who reads the chain for the break can catch the unsigned transfer while it is still fixable. Disclosing it to the prosecutor before trial is far better than discovering it on the stand — and fabricating a name to close the gap would be a far more serious problem.'
    },
    {
      scenario: 'A report shows that an officer collected a biological swab from a scene and sealed it in a plastic evidence bag.',
      text: 'How should you handle this on review?',
      options: [
        'Approve it — any sealed, labeled container is acceptable for evidence.',
        'Correct it: biological evidence must be packaged in paper, not airtight plastic, which traps moisture and degrades DNA. Address the specific item and treat the error as a training and kit-standardization issue.',
        'Approve it as long as the bag was labeled correctly.',
        'Reject the entire case because the swab is now worthless.'
      ],
      correct: 1,
      feedback: 'Correct. Biological material goes in paper; airtight plastic traps moisture, accelerates bacterial growth, and degrades DNA. The reviewer catches the packaging error, addresses the specific item, and treats the recurring risk as a training and kit-standardization responsibility.'
    },
    {
      scenario: 'An officer signs evidence out of the property room for an upcoming court date and reports to you that the seal appears to have been disturbed.',
      text: 'What is the correct protocol?',
      options: [
        'Stop: have the officer document the observation contemporaneously, notify the property-room supervisor, and notify the prosecutor before the court date — a known integrity question is never carried into a courtroom undisclosed.',
        'Tell the officer to take it to court anyway — it is probably just a storage artifact.',
        'Have the officer re-seal the evidence and note the re-sealing.',
        'Tell the officer to open it and confirm nothing is missing before court.'
      ],
      correct: 0,
      feedback: 'Correct. A disturbed seal is a chain-of-custody integrity event. It is documented contemporaneously, the property-room supervisor is notified, and the prosecutor is told before the court date. Carrying a known integrity question into court undisclosed creates a far larger problem than addressing it beforehand.'
    },
    {
      scenario: 'You are explaining to a newer supervisor why chain-of-custody integrity is a supervisory and department responsibility, not just an individual officer\'s.',
      text: 'What is the best explanation?',
      options: [
        'It is not — chain of custody is entirely the collecting officer\'s job.',
        'Because supervisors personally collect all evidence.',
        'Because only supervisors are allowed to testify about evidence.',
        'Because integrity depends on systems the supervisor owns — seals, logs, submission discipline, an auditable property room, and standardized packaging — and a weak system turns every officer\'s careful collection into a vulnerability.'
      ],
      correct: 3,
      feedback: 'Correct. Chain-of-custody integrity rests on systems — seals, logs, submission discipline, an auditable property room, and standardized forensic packaging — that are supervisory responsibilities. When the system is weak, even a careful collection becomes a vulnerability, which is why it is a department-level concern.'
    },
    {
      scenario: 'One of your officers will be cross-examined on a documentation gap in a chain of custody at an upcoming trial.',
      text: 'How do you prepare the officer?',
      options: [
        'Tell the officer to assert confidently that the evidence was never tampered with, to project authority.',
        'Advise the officer to answer every chain-of-custody question with "standard procedure was followed."',
        'Have the officer review the documentation beforehand, identify the gap before the defense does, flag it to the prosecutor, and testify to exactly what the record shows — acknowledging the gap without speculating, since false certainty about an unremembered window risks perjury under 18 Pa. C.S. § 4902.',
        'Tell the officer to avoid the subject and let the prosecutor handle it.'
      ],
      correct: 2,
      feedback: 'Correct. The officer should review the documentation, surface the gap early, flag it to the prosecutor, and testify truthfully to the record while acknowledging the gap. Asserting false certainty about an unremembered period is speculation under oath and a § 4902 perjury risk — and courts forgive a documented gap far sooner than a witness caught overstating.'
    },
    {
      scenario: 'Your unit is short-staffed and calls are stacking up. You notice the temptation — across several scenes — to clear faster by cutting corners on evidence handling.',
      text: 'What is your responsibility as the supervisor in these conditions?',
      options: [
        'Authorize shortcuts during busy periods — efficiency has to win when the board is full.',
        'Hold the standard when it is inconvenient: every shortcut you authorize or refuse signals the real standard to your officers, so resource the scenes that need holding and make proper collection the path of least resistance rather than the heroic exception.',
        'Leave it to each officer to decide how much to cut under pressure.',
        'Reduce evidence collection requirements during high-call-volume shifts.'
      ],
      correct: 1,
      feedback: 'Correct. Evidence discipline erodes under exactly the conditions a supervisor manages — short staffing and stacked calls. What you authorize and what you refuse defines the real standard, so the job is to hold it when it is inconvenient, resource the scenes that need it, and make proper collection the default rather than a heroic exception.'
    },
  ];
}

/* ══════════════════════════════════════════
   SUPERVISOR SCENARIO — Evidence & Chain of Custody (EGPD)
   The shortcut pressure is the supervisor's. Officer Whitt at the
   Cherry St burglary scene.
══════════════════════════════════════════ */
const SCENARIO_EVIDENCE_SUP = {
  id: 'scenario-evidence-sup',
  title: 'Supervisor — Cherry St Burglary Scene',
  location: 'Cherry St, East Greenville Borough, PA',
  totalDecisions: 3,
  nodes: {
    'start': {
      type: 'scene', time: '14:30', weather: 'Clear / 74°F', unit: 'Shift Supervisor',
      narrative: [
        'A high-priority call is holding across the borough and you have a finite number of units. Officer Whitt is first on a residential burglary on Cherry St — a smashed window, a screwdriver with paint transfer, and a cell phone that isn\'t the homeowners\' on the kitchen floor. Detectives are eight minutes out.',
        'In most of these scenarios the pressure to break the chain comes from the field. In this one, it comes from you.'
      ],
      next: 'd1'
    },
    'd1': {
      type: 'decision', decisionNumber: 1,
      situation: 'Whitt has the scene preserved and the evidence untouched. You need a unit for the priority call.',
      question: 'What do you do?',
      options: [
        { text: 'Hold the scene for the eight-minute handoff and send a different unit to the priority call — the minutes saved by shortcutting can cost the prosecution months later.', next: 'c1a', quality: 'good', shortLabel: 'Resourced the scene, didn\'t sacrifice it' },
        { text: 'Order Whitt to bag the items in whatever is in his patrol car and transport them so he can clear.', next: 'c1b', quality: 'bad', shortLabel: 'Ordered the improvised collection' },
        { text: 'Tell Whitt to leave the evidence and respond to the priority call now.', next: 'c1c', quality: 'bad', shortLabel: 'Left the evidence unattended' },
        { text: 'Cancel the detectives and have Whitt process the scene alone to save time.', next: 'c1d', quality: 'bad', shortLabel: 'Cancelled detectives to save time' },
      ]
    },
    'c1a': {
      type: 'consequence', outcomeClass: 'outcome-good', outcomeLabel: 'Resourced the Scene',
      heading: 'You solved the staffing problem without solving it on the evidence.',
      narrative: [
        'You hold the scene for the handoff and route another unit to the priority call. The eight minutes you\'d save by shortcutting collection can cost a prosecution six months later, and the discipline is to fix the staffing problem somewhere other than the chain of custody.',
        'Detectives arrive, photograph in place, collect with proper packaging, and sign the chain with Whitt as the preserving officer. The case proceeds with clean evidence.'
      ],
      legal: 'Chain-of-custody practice: in-place photography before collection, proper forensic packaging, and documented handlers. Improvised collection to clear a call faster is how prosecutions collapse.',
      next: 'd2'
    },
    'c1b': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'You Ordered the Break',
      heading: 'Patrol-trunk bags and no in-place photos is how the cell-phone data gets suppressed.',
      narrative: [
        'Ordering Whitt to bag the items in whatever\'s in his car, with no in-place photography and no proper packaging, is the decisive mistake — and it\'s yours. Months later a suppression motion excludes the cell-phone location data, and the case collapses. The eight minutes weren\'t worth the prosecution.',
        'The decision not to break the chain was yours to make. You made the wrong one.'
      ],
      legal: 'Chain-of-custody practice: improvised packaging and missing in-place documentation create suppression vulnerabilities that defense counsel are trained to exploit.',
      next: 'd2'
    },
    'c1c': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Evidence Left Unattended',
      heading: 'An unsecured scene with no one on it is a contamination argument waiting to happen.',
      narrative: [
        'Pulling Whitt off and leaving the evidence unattended hands the defense a contamination and chain-of-custody argument — anyone could have entered, the items could be moved, damaged, or disputed. First-officer scene preservation exists precisely to prevent this.',
        'Hold the scene and resource the other call.'
      ],
      legal: 'Chain-of-custody practice: the first officer owns the scene until handoff; leaving evidence unattended creates integrity and contamination problems.',
      next: 'd2'
    },
    'c1d': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Wrong Way to Save Time',
      heading: 'Cancelling detectives to have a patrol officer rush the scene trades the case for the clock.',
      narrative: [
        'Cancelling the crime-scene resources to have Whitt process a burglary alone, under time pressure, abandons the in-place documentation and proper packaging the case needs. You\'d save minutes and lose the forensic value of the screwdriver and phone.',
        'Let the detectives do their job; resource the priority call another way.'
      ],
      legal: 'Chain-of-custody practice: proper collection and in-place documentation protect the evidence; rushing the scene to save time defeats the purpose.',
      next: 'd2'
    },
    'd2': {
      type: 'decision', decisionNumber: 2,
      situation: 'Suppose you had pushed to collect. Whitt keys up: "Sarge, detectives are eight minutes out — if I collect now without proper packaging and in-place photography, we risk the chain of custody."',
      question: 'How do you respond to the pushback?',
      options: [
        { text: 'Support it — "Understood, hold the scene, I\'ll get another unit." The officer is protecting the case, and rewarding that judgment keeps officers willing to raise it.', next: 'c2a', quality: 'good', shortLabel: 'Backed the officer\'s pushback' },
        { text: 'Override the officer — your order to clear the call stands regardless.', next: 'c2b', quality: 'bad', shortLabel: 'Overrode the pushback' },
        { text: 'Reprimand the officer for questioning a direct order.', next: 'c2c', quality: 'bad', shortLabel: 'Reprimanded the officer' },
        { text: 'Tell the officer to collect the evidence but document that he objected.', next: 'c2d', quality: 'risky', shortLabel: 'Collected anyway, noted the objection' },
      ]
    },
    'c2a': {
      type: 'consequence', outcomeClass: 'outcome-good', outcomeLabel: 'Rewarded the Right Instinct',
      heading: 'An officer with the judgment and the spine to push back on a shortcut is protecting the case.',
      narrative: [
        'You back him — hold the scene, get another unit. Whitt is doing exactly what the department needs, and how you receive that pushback determines whether he, or anyone, ever offers it again.',
        'A supervisor who punishes a well-reasoned objection trains compliance, and compliance is how chains of custody break. You reinforced the opposite.'
      ],
      legal: 'Chain-of-custody practice: the preserving officer\'s judgment protects the prosecution; the supervisor\'s job is to resource the scene, not to override sound objections.',
      next: 'd3'
    },
    'c2b': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Overrode the Save',
      heading: 'Overriding a sound objection to clear a call is how the case is lost — and how you lose the next warning.',
      narrative: [
        'Forcing the improvised collection over Whitt\'s correct objection produces the suppression problem he was trying to prevent. And it teaches him — and everyone who hears about it — to stop raising these flags, which is how the next chain breaks silently.',
        'The right response was to hold the scene and resource the other call.'
      ],
      legal: 'Chain-of-custody practice: improvised collection compromises the evidence; overriding the objection both risks the case and suppresses future warnings.',
      next: 'd3'
    },
    'c2c': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Punished the Judgment',
      heading: 'Reprimanding the officer for the objection trains the compliance that breaks chains.',
      narrative: [
        'Treating a well-reasoned chain-of-custody objection as insubordination teaches the squad never to question a shortcut again. That is precisely backward: you want officers who will key up and protect the case, even when it complicates your staffing.',
        'Reward the pushback; resource the scene.'
      ],
      legal: 'Chain-of-custody practice: an officer protecting the chain is doing the department\'s work; punishing it produces silent failures.',
      next: 'd3'
    },
    'c2d': {
      type: 'consequence', outcomeClass: 'outcome-neutral', outcomeLabel: 'The Note Doesn\'t Fix It',
      heading: 'Collecting anyway and noting the objection still breaks the chain.',
      narrative: [
        'Having Whitt collect improperly but document that he objected preserves a paper trail and still loses the evidence. The note doesn\'t cure the suppression problem; the improvised collection does the damage either way.',
        'The point of the objection is to change the decision — hold the scene and get another unit.'
      ],
      legal: 'Chain-of-custody practice: documenting an objection does not remediate an improper collection; the evidence is still compromised.',
      next: 'd3'
    },
    'd3': {
      type: 'decision', decisionNumber: 3,
      situation: 'Weeks later, in pre-trial review of a different case file, you find the chain-of-custody record has an approximately four-hour transfer window with no handoff contact name and no signature.',
      question: 'What do you do?',
      options: [
        { text: 'Catch it now and flag it to the prosecutor before trial — the unsigned, unnamed transfer is a fixable, disclosable vulnerability, far better surfaced now than discovered under cross-examination.', next: 'c3a', quality: 'good', shortLabel: 'Disclosed the gap to the prosecutor' },
        { text: 'Nothing — minor gaps are common and the defense probably won\'t notice.', next: 'c3b', quality: 'bad', shortLabel: 'Let the gap ride' },
        { text: 'Have the officer fill in a plausible name and time from memory to close the gap.', next: 'c3c', quality: 'bad', shortLabel: 'Filled in the gap from memory' },
      ]
    },
    'c3a': {
      type: 'consequence', outcomeClass: 'outcome-good', outcomeLabel: 'Surfaced It Before the Stand',
      heading: 'A reviewer who reads the chain for the break can fix it while it\'s still fixable.',
      narrative: [
        'You flag the unsigned, unnamed four-hour transfer to the prosecutor before trial so it can be addressed — through the lab intake records, the property-room log, and the analyst\'s testimony — rather than discovered by defense counsel under cross-examination.',
        'Catching the gap on review and disclosing it is far better than an officer stumbling into it on the stand and having his credibility, and the case, collapse.'
      ],
      legal: '18 Pa. C.S. § 4902 (perjury) backdrop: an officer who overstates certainty about an unremembered window risks false testimony; disclosing the documented gap pre-trial avoids that.',
      next: 'debrief'
    },
    'c3b': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Hoping It\'s Missed',
      heading: 'Counting on the defense not noticing is not a plan.',
      narrative: [
        'Letting the gap ride bets the case on defense counsel missing a documentation hole they are specifically trained to find. When they find it at trial — with no advance disclosure — it lands as a surprise that undermines the whole chain, instead of a managed issue.',
        'Flag it to the prosecutor now, while it\'s still fixable.'
      ],
      legal: 'Chain-of-custody practice: documentation gaps are best surfaced and disclosed pre-trial; an undisclosed gap discovered at trial does maximum damage.',
      next: 'debrief'
    },
    'c3c': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'That\'s Fabrication',
      heading: 'Filling in a name and time from memory invents a record.',
      narrative: [
        'Directing the officer to supply a plausible name and time to close the gap manufactures chain-of-custody documentation that doesn\'t reflect what actually happened — a far more serious problem than the gap itself, and one that can constitute false official statements.',
        'Disclose the real gap to the prosecutor. Never paper it over.'
      ],
      legal: '18 Pa. C.S. § 4902 / § 4904: fabricating a chain-of-custody entry is a false official statement, not a fix.',
      next: 'debrief'
    },
    'debrief': { type: 'debrief' }
  }
};
