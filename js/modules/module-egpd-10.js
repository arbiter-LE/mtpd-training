
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
      legal: 'Pennsylvania Rules of Criminal Procedure Rule 573: Evidence collected or compromised in violation of proper procedures is subject to suppression. First officer scene preservation duties include preventing unauthorized access to the crime scene by all persons, including victims and property owners, until CIU/detectives assume control.',
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
        'Allow them to do a quick walkthrough with you present so you can document missing items.',
        'Keep them out of the structure until detectives or crime scene personnel have documented and cleared the scene.',
        'Let them check rooms that were not directly affected by the break-in.',
        'Allow access to any area not immediately adjacent to the point of entry.'
      ],
      correct: 1,
      feedback: 'Correct. First officers own the scene until it is formally handed off to detectives or crime scene personnel. All unauthorized persons — including victims and property owners — must be kept out of the crime scene until it has been documented. Any person who enters before documentation can contaminate fingerprints, trace evidence, and body position. This is one of the most common chain of custody vulnerabilities in burglary cases.'
    },
    {
      scenario: 'You discover a cell phone on the floor of a burglary scene that clearly does not belong to the homeowners. Detectives are 15 minutes out.',
      text: 'What is the correct procedure for this item before detectives arrive?',
      options: [
        'Photograph it in place and pick it up to prevent it from being accidentally kicked or moved.',
        'Leave it exactly as found, document its location in your notes, and prevent anyone from entering the area.',
        'Place it in an evidence bag and secure it in your patrol vehicle to protect it.',
        'Ask the homeowners if they recognize it before taking any action.'
      ],
      correct: 1,
      feedback: 'Correct. In-place documentation before collection is mandatory. The item must be photographed in its discovered location by the collecting officer — in this case, the detective. Your role as the first officer is to preserve the scene, document observations, and prevent unauthorized access. Moving or bagging the item before it is photographed in place breaks the chain of custody, even with good intentions.'
    },
    {
      scenario: 'Your supervisor orders you to collect two items of evidence and transport them to the station immediately so you can clear for a priority call.',
      text: 'What is the correct response?',
      options: [
        'Follow the order — supervisor authority supersedes standard evidence protocols.',
        'Collect the items and transport them, but document the supervisor\'s name in the chain of custody.',
        'Advise the supervisor of the situation, including the detective ETA, and request a brief delay or a second unit to hold the scene.',
        'Refuse the order and remain on scene regardless of the supervisor\'s directive.'
      ],
      correct: 2,
      feedback: 'Correct. Advising your supervisor of the situation — detective ETA, the evidence involved, and the chain of custody risk — is the professional response. Supervisors can make informed decisions when given accurate information. Improvised collection without proper packaging and in-place documentation creates suppression vulnerabilities that can destroy a prosecution. Option D (outright refusal) is not the answer — communication is.'
    },
    {
      scenario: 'You need to document a piece of evidence before a detective arrives. The scene is outdoors and the item is on the ground.',
      text: 'Which of the following best describes proper in-place documentation before collection?',
      options: [
        'Write a detailed description of the item in your notebook.',
        'Photograph the item from multiple angles in its exact discovered position, including a scale reference if available, before anyone touches it.',
        'Sketch the scene and mark the item\'s approximate location.',
        'Verbally describe the item to dispatch so it is recorded on the radio log.'
      ],
      correct: 1,
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
        'Document the collection: time, location, who collected it, the kit number, how it was sealed, and how it was transported from the hospital to the property room — with your continuous control or handoff documentation at each step.',
        'The hospital\'s records constitute the chain of custody for any sample collected in a medical facility.',
        'Chain of custody only applies to physical evidence at crime scenes, not medical samples.'
      ],
      correct: 1,
      feedback: 'Correct. Blood samples in DUI cases require a documented chain of custody from collection to analysis. Your documentation should include: the date and time of collection, the nurse\'s name and facility, the kit ID number, how the sample was sealed and labeled, your transport from the hospital, and your property room submission with time and submission number. Any gap in this chain can result in suppression or weight challenges at trial. Pennsylvania DUI prosecutions frequently hinge on chain of custody integrity.'
    },
    {
      scenario: 'You are securing a crime scene and notice a firearm on the ground. Another officer present suggests photographing it and leaving it for detectives to collect rather than recovering it yourself.',
      text: 'What is the appropriate response?',
      options: [
        'Follow the suggestion — detectives have the authority and training to collect firearms.',
        'Recover the firearm yourself according to department protocol: photograph it in place, note the exact location, collect it using appropriate safety procedures, and document the recovery in your report.',
        'Secure the area around the firearm and await detective arrival without touching or documenting it.',
        'The suggestion is correct if detectives will arrive within two hours.'
      ],
      correct: 1,
      feedback: 'Correct. Leaving evidence unattended and uncollected at an unsecured crime scene creates chain of custody problems and evidence integrity risk. If you are the officer present and the scene requires evidence collection, that is your responsibility unless department protocol specifically directs otherwise. Photograph in place, document location, collect using protocol, and complete the chain with proper property room submission. Detectives can also be involved in analysis — but initial collection and documentation is the responding officer\'s responsibility.'
    },
    {
      scenario: 'You retrieve previously submitted evidence from the property room for an upcoming court appearance. When you sign it out, you notice the evidence seal appears to have been disturbed.',
      text: 'What is your obligation?',
      options: [
        'Sign it out and proceed to court — it may just be a storage issue.',
        'Refuse to sign it out, notify the property room supervisor immediately, document the observation, and notify the prosecutor before the court date. The integrity of the evidence is now in question.',
        'Re-seal the evidence and note the re-sealing in your report.',
        'Inspect the contents to determine if anything is missing before deciding how to proceed.'
      ],
      correct: 1,
      feedback: 'Correct. A disturbed evidence seal is a chain of custody integrity issue that must be reported before the evidence goes to court. Taking it to court with an observed integrity question — without disclosure — creates a much larger problem than addressing it before trial. Notify the property room supervisor, document your observation contemporaneously, and notify the prosecutor so they can make an informed decision about how to proceed. The prosecutor may have the ability to address it; taking it to court without disclosure does not.'
    },
  ];
}
