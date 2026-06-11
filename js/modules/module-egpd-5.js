/* ══════════════════════════════════════════
   SCENARIO — Domestic Violence (EGPD)
══════════════════════════════════════════ */
const SCENARIO_DOMESTIC_VIOLENCE = {
  id: 'scenario-dv',
  title: 'Cherry Street — Domestic Disturbance',
  location: 'Cherry Street, East Greenville Borough, PA',
  totalDecisions: 3,
  nodes: {
    'start': {
      type: 'scene', time: '22:47', weather: 'Clear / 54°F', unit: 'Patrol Unit 2',
      narrative: [
        'Dispatch advises a 911 hang-up from a residence on Cherry Street. A second call came in from a neighbor reporting shouting and what sounded like breaking glass. The registered resident is Danielle Cruz, 27. CLEAN returns a prior incident at this address eight months ago — a DV report, no arrest at the time.',
        'You and your backup unit arrive two minutes apart. Per EGPD General Order 4.13.2, you avoid using sirens and emergency lights in the vicinity of the scene, and approach from flanking positions rather than parking directly in front of the residence. The house is dark except for a light in a rear room. You hear a male voice raised inside. As you approach the front door, a woman opens it. She has a visible bruise forming under her left eye. She says quietly: "He left out the back." A male is seen walking quickly toward the tree line.'
      ],
      next: 'd1'
    },
    'd1': {
      type: 'decision',
      decisionNumber: 1,
      situation: 'You are at the front door with Danielle Cruz. She has a fresh bruise under her left eye. She tells you the male who just fled is her husband, Brian Cruz, 30. She says they had an argument, he "pushed her into the door frame," and she hit her face. She now says she does not want to press charges. Your backup unit is at the rear of the property watching the tree line.\n\nDanielle says: "I just want him to leave for the night. Can you just make him come back and get his stuff and go somewhere else?"',
      question: 'What is your immediate course of action regarding a potential arrest?',
      options: [
        {
          text: 'Honor the victim\'s request — she does not want to press charges, so no arrest is made. Document the incident and offer resources.',
          shortLabel: 'No arrest — victim\'s request honored',
          quality: 'bad',
          next: 'c1-bad'
        },
        {
          text: 'Take a full report and consult with your supervisor before making an arrest decision.',
          shortLabel: 'Take report, consult supervisor',
          quality: 'risky',
          next: 'c1-neutral'
        },
        {
          text: 'Determine whether probable cause exists for a Simple Assault arrest based on your own observations and Danielle\'s statement — under General Order 4.13.5, this arrest is mandatory once probable cause is established.',
          shortLabel: 'Assess PC for mandatory arrest independently',
          quality: 'good',
          next: 'c1-good'
        }
      ]
    },
    'c1-bad': {
      type: 'consequence',
      outcomeClass: 'outcome-bad',
      outcomeLabel: 'Policy Violation',
      heading: 'The victim\'s preference does not determine your arrest decision.',
      narrative: [
        'Under EGPD General Order 4.13.5, when an officer investigating a domestic violence incident observes recent physical injury to a victim, and probable cause exists to believe Simple Assault was committed against a person with whom the offender resides, the officer shall arrest without a warrant, as in a felony.',
        'Danielle has a visible fresh injury consistent with her account. Your observations plus her statement establish probable cause for Simple Assault under 18 Pa.C.S. § 2701. Departmental policy is explicit that domestic violence is investigated and managed "as any other crime, regardless of the relationship of the victim and the offender." Not making this arrest is a policy violation, regardless of what Danielle wants.',
        'Victims in DV situations frequently request no arrest — this is common and expected. It does not change the officer\'s obligation under 4.13.5. Your role is to document, make the required arrest, and complete the victim notification requirements.',
        'Additionally: you now have a fleeing subject. Your backup needs updated tasking immediately.'
      ],
      legal: 'EGPD General Order 4.13.5(A): "When recent physical injury to a victim... is observed by an officer investigating a domestic violence incident, the officer shall arrest without a warrant, as in a felony, when probable cause exists to believe [Simple Assault, 18 Pa.C.S. 2701, among other offenses] has been committed." Victim consent is not listed as a required element.',
      next: 'd2'
    },
    'c1-neutral': {
      type: 'consequence',
      outcomeClass: 'outcome-neutral',
      outcomeLabel: 'Delay Creates Risk',
      heading: 'Supervisor consultation is not required to make a mandatory arrest.',
      narrative: [
        'EGPD General Order 4.13.5 does not require supervisor authorization before making a DV arrest when probable cause exists. Taking time to consult before acting — while a subject is actively fleeing — may allow Brian Cruz to exit the area entirely.',
        'The correct approach is to immediately act on the probable cause you already have, notify dispatch of the fleeing DV suspect, and brief your supervisor as part of your follow-up — not as a precondition.',
        'Documentation and supervisor notification happen after the fact, not before.'
      ],
      legal: 'General Order 4.13.5: the officer shall arrest when probable cause exists. Supervisor notification is part of post-arrest reporting under 4.13.11 — it is not a precondition for the arrest. Waiting in a fleeing-suspect scenario without a clear reason creates legal and tactical risk.',
      next: 'd2'
    },
    'c1-good': {
      type: 'consequence',
      outcomeClass: 'outcome-good',
      outcomeLabel: 'Correct Application of Mandatory Arrest',
      heading: 'Probable cause is yours to evaluate — not the victim\'s to grant.',
      narrative: [
        'You observe a fresh bruise under Danielle\'s left eye. She provides a statement that her husband pushed her into the door frame. That combination — your direct observation of injury plus a victim statement of recent physical contact by the accused — establishes probable cause for Simple Assault under 18 Pa.C.S. § 2701.',
        'Under General Order 4.13.5, this arrest is mandatory. Victim preference is not a controlling factor. You immediately advise dispatch of a fleeing DV suspect, update your backup unit on Brian Cruz\'s description and direction, and begin the process for apprehension.',
        'You also begin the General Order 4.13.7 victim notification requirements and start your narrative checklist for documentation under 4.13.11.'
      ],
      legal: 'EGPD General Order 4.13.5(A): officers shall arrest without a warrant, as in a felony, when probable cause exists for Simple Assault [18 Pa.C.S. 2701] against a household member. The probable cause determination is the officer\'s — a visible injury plus a consistent victim account satisfies the standard.',
      next: 'd2'
    },
    'd2': {
      type: 'decision',
      decisionNumber: 2,
      situation: 'Brian Cruz is located at a neighbor\'s property two blocks away and taken into custody without incident. Back at the residence, Danielle is cooperative. While speaking with her, she shows you a cracked phone screen and says Brian struck her in the face with his cell phone during the argument before she opened the door for you. The phone is sitting on the kitchen counter.\n\nDanielle asks you to just note the phone in the report. "He\'s already in custody," she says. "It\'s just his phone, he\'ll need it back."',
      question: 'What is your obligation regarding the phone used in the assault?',
      options: [
        {
          text: 'Note the phone in the report as requested, but leave it on the counter — Brian is in custody and it\'s his personal property.',
          shortLabel: 'Document only — leave the phone',
          quality: 'bad',
          next: 'c2-bad'
        },
        {
          text: 'Seize the phone as the weapon used in the commission of the assault, and process it into evidence with proper chain of custody.',
          shortLabel: 'Seize the phone — weapon used in the offense',
          quality: 'good',
          next: 'c2-good'
        },
        {
          text: 'Ask Danielle for consent to take the phone "for safekeeping" and document it as a consent seizure.',
          shortLabel: 'Request victim consent for "safekeeping" seizure',
          quality: 'risky',
          next: 'c2-neutral'
        }
      ]
    },
    'c2-bad': {
      type: 'consequence',
      outcomeClass: 'outcome-bad',
      outcomeLabel: 'Evidence Left Behind',
      heading: 'A weapon used in the commission of the offense must be seized, regardless of who it belongs to.',
      narrative: [
        'EGPD General Order 4.13.6(A) requires the arresting officer to seize all weapons used by the defendant in the commission of an alleged offense. Brian used the phone as the instrument of the assault — that makes it evidence of the crime, not just his personal property.',
        'Leaving it on the counter at "his" request, relayed through Danielle, means evidence supporting the Simple Assault charge is left unsecured at a scene you are about to leave. It can be lost, damaged, or its condition disputed later.',
        '"It\'s just his phone, he\'ll need it back" does not override the seizure requirement — the phone\'s status as evidence is determined by how it was used, not by its owner\'s preference.'
      ],
      legal: 'EGPD General Order 4.13.6(A): "The arresting officer shall seize all weapons used by the defendant in the commission of an alleged offense." Subsections B–D require the item to be secured, processed, and entered into the property management system with proper chain of custody.',
      next: 'd3'
    },
    'c2-good': {
      type: 'consequence',
      outcomeClass: 'outcome-good',
      outcomeLabel: 'Correct Mandatory Action',
      heading: 'A weapon used in the offense is evidence, and seizure is mandatory.',
      narrative: [
        'You seize the phone. Brian used it as the instrument of the assault on Danielle, which makes it a weapon used in the commission of an alleged offense under General Order 4.13.6(A) — seizure is mandatory, not discretionary.',
        'You photograph the phone and the cracked screen at the scene, then secure it and process it into the property management system with a documented chain of custody, per 4.13.6(B)–(C). It will remain in custody until a court of jurisdiction issues a disposition order, per 4.13.6(D).',
        'You also begin the General Order 4.13.7 victim notification checklist: provide Danielle with the written and oral notice of her rights under 23 Pa.C.S. Ch. 61, including the domestic violence hotline number, and have her sign the acknowledgment of receipt for attachment to your incident report.'
      ],
      legal: 'General Order 4.13.6: weapons used in the commission of an alleged offense shall be seized, secured, and entered into the property management system with proper chain of custody, and held until court disposition.',
      next: 'd3'
    },
    'c2-neutral': {
      type: 'consequence',
      outcomeClass: 'outcome-neutral',
      outcomeLabel: 'Correct Result — Wrong Authority',
      heading: 'Consent works here, but you don\'t need it — and relying on it creates a vulnerability.',
      narrative: [
        'Danielle consents and you take the phone. The outcome is correct — the item is removed from the scene. But framing this as a consent seizure creates an unnecessary legal vulnerability.',
        'You have independent authority under General Order 4.13.6(A): the phone was used as a weapon in the commission of the alleged offense, so seizure is mandatory regardless of anyone\'s consent.',
        'If Danielle had refused, framing it as a consent request would have left you without a clear stated basis for taking it. Document the seizure under 4.13.6 — as evidence of the offense — not as a consent search.'
      ],
      legal: 'General Order 4.13.6(A) provides independent authority to seize a weapon used in the commission of an alleged offense. Consent is not required and should not be the stated basis for the seizure.',
      next: 'd3'
    },
    'd3': {
      type: 'decision',
      decisionNumber: 3,
      situation: 'Two hours after Brian Cruz\'s arrest, Danielle calls the station. She is upset. She says she wants to drop the charges and get the phone back. While on the call, she also mentions that Brian has a final Protection From Abuse order against him from a prior relationship — and that he showed up at her workplace on Cherry Street last week, which she never reported. Your supervisor patches the call to you.',
      question: 'How do you handle Danielle\'s call?',
      options: [
        {
          text: 'Tell her to come in and you will sit down with her informally to discuss the charges and the phone.',
          shortLabel: 'Invite her in to discuss informally',
          quality: 'bad',
          next: 'c3-bad'
        },
        {
          text: 'Explain clearly and professionally that the arrest proceeded under mandatory arrest authority and is not subject to withdrawal, and that the phone is held as evidence pending court disposition. Separately, document the PFA violation she just disclosed — a violation of a final PFA order is a mandatory arrest under 4.13.9, regardless of when it occurred.',
          shortLabel: 'Explain the framework and document the PFA violation',
          quality: 'good',
          next: 'c3-good'
        },
        {
          text: 'Transfer her to your supervisor without briefing them on the background.',
          shortLabel: 'Transfer the call without briefing supervisor',
          quality: 'risky',
          next: 'c3-neutral'
        }
      ]
    },
    'c3-bad': {
      type: 'consequence',
      outcomeClass: 'outcome-bad',
      outcomeLabel: 'Protocol Violation',
      heading: 'Informal conversations with DV victims about active cases create significant risk — and a reportable PFA violation goes undocumented.',
      narrative: [
        'An informal sit-down about the charges and the phone is exactly the kind of contact that should not happen outside of supervised, documented channels. Any concessions or impressions you create in that meeting — even unintentionally — can undermine the prosecution.',
        'DV victims frequently recant or attempt to intervene in prosecutions. Under General Order 4.13, the charging decision is the Commonwealth\'s, not the victim\'s, once a mandatory arrest has been made.',
        'More importantly, by steering the conversation toward an informal meeting, you never follow up on the PFA violation Danielle just disclosed — Brian appearing at her workplace in violation of a final PFA order. That is a separate mandatory-arrest matter under 4.13.9 that now goes undocumented.'
      ],
      legal: 'General Order 4.13.5/4.13.9: once a mandatory arrest is made, the charging decision is not the victim\'s. A disclosed PFA violation must be documented and acted on under 4.13.9 regardless of when it occurred. Document all post-arrest victim contact.',
      next: 'debrief'
    },
    'c3-good': {
      type: 'consequence',
      outcomeClass: 'outcome-good',
      outcomeLabel: 'Professional and Legally Correct',
      heading: 'Explaining the legal framework — and following up on the disclosed PFA violation — protects Danielle and the case.',
      narrative: [
        'Victims of domestic violence often attempt to recant or intervene — this is a well-documented response, not evidence that the incident did not occur. Your job is to explain the process accurately and without judgment.',
        'By stating that the arrest proceeded under mandatory authority and that the phone is held as evidence pending court disposition under 4.13.6(D), you give Danielle accurate information and realistic expectations.',
        'By treating Brian\'s appearance at her workplace as a separate disclosed PFA violation, you trigger General Order 4.13.9 — a police officer shall arrest a defendant for violating a final PFA order under 23 Pa.C.S. Chapter 61, with a charge of Indirect Criminal Contempt prepared in addition to any other charges. You document the call as a Supplemental Incident Report and notify your supervisor.'
      ],
      legal: 'General Order 4.13.9(B): "A police officer shall arrest a defendant for violating an order issued under 23 Pa.C.S., Chapter 61." 4.13.9(C)(2): a charge of Indirect Criminal Contempt shall be completed in addition to any other charges. 4.13.10(E): all notices and actions shall be documented as a Supplemental Incident Report.',
      next: 'debrief'
    },
    'c3-neutral': {
      type: 'consequence',
      outcomeClass: 'outcome-neutral',
      outcomeLabel: 'Incomplete Handoff',
      heading: 'Transferring without a brief leaves your supervisor unprepared — and the disclosed PFA violation may be lost.',
      narrative: [
        'Your supervisor cannot handle this call effectively without context: who Danielle is, what was seized and why, and — critically — that she just disclosed a separate PFA violation by Brian at her workplace last week.',
        'A cold transfer risks that disclosure getting lost in the handoff. A 30-second brief before transferring — victim\'s name, what happened, what evidence was seized, and the newly disclosed PFA violation — is part of a professional handoff.',
        'Brief before you transfer. The PFA violation under 4.13.9 still needs to be documented and acted on regardless of who handles the call.'
      ],
      legal: 'General Order 4.13.9 obligations attach the moment a violation is disclosed, regardless of which officer takes the report. Ensure any transfer includes a factual brief so the receiving officer can act on it and document the contact properly.',
      next: 'debrief'
    },
    'debrief': { type: 'debrief' }
  }
};

function getDomesticViolenceQuestions() {
  return [
    {
      scenario: 'You respond to a DV call and observe the victim has a fresh bruise consistent with her account that her husband struck her. She tells you she does not want to press charges and asks you to make him leave for the night.',
      text: 'Under EGPD General Order 4.13.5, what is your obligation?',
      options: [
        'Honor the victim\'s preference — she is the protected party and her consent controls the arrest decision.',
        'If you observe recent physical injury and probable cause exists to believe Simple Assault was committed against a household member, arrest without a warrant is required — victim consent is not a required element.',
        'Consult with your supervisor before making an arrest. Mandatory arrest requires supervisor authorization when the victim objects.',
        'Make a report and refer the case to detectives for follow-up arrest.'
      ],
      correct: 1,
      feedback: 'Correct. General Order 4.13.5(A) requires officers to arrest without a warrant, as in a felony, when recent physical injury to a victim is observed and probable cause exists to believe Simple Assault (18 Pa.C.S. 2701) was committed against a household member. Departmental policy treats domestic violence "as any other crime, regardless of the relationship of the victim and offender." Victim preference does not control the arrest decision and supervisor authorization is not a precondition.'
    },
    {
      scenario: 'You arrest a subject for Simple Assault of his wife. During the arrest, you confirm he struck her with his cell phone, which is sitting on the kitchen counter. The wife asks you to leave it — "it\'s his phone, he\'ll need it back."',
      text: 'What is your obligation regarding the phone under EGPD General Order 4.13.6?',
      options: [
        'Advise her to hold onto the phone and document the advisory in your report.',
        'Seize the phone. A weapon used by the defendant in the commission of an alleged offense must be seized, secured, and entered into the property management system with chain of custody.',
        'Leave the phone — the subject is already in custody and no longer has access to it.',
        'Request a warrant before seizing personal property belonging to the arrested subject.'
      ],
      correct: 1,
      feedback: 'Correct. General Order 4.13.6(A) requires the arresting officer to seize all weapons used by the defendant in the commission of an alleged offense. The phone, used to strike the victim, falls under this requirement regardless of ownership. Subsections B-D require it be secured, processed with proper chain of custody, and held until a court issues a disposition order.'
    },
    {
      scenario: 'You complete a DV arrest. The officer who investigated the prior incident at this address eight months ago elected not to arrest, despite probable cause being present, and wrote in the report only: "Parties separated for the evening. No arrest made."',
      text: 'Under EGPD General Order 4.13.11, what documentation standard applies when an officer has probable cause but elects not to arrest?',
      options: [
        'No additional documentation is required beyond noting that no arrest was made.',
        'The officer must document the victim\'s refusal to cooperate.',
        'If the officer did not arrest even though probable cause existed and an arrest was authorized, a detailed explanation of the reason(s) for the decision not to arrest must be included in the narrative — "No arrest made" is not sufficient.',
        'The officer must obtain supervisor sign-off in the report acknowledging the decision not to arrest.'
      ],
      correct: 2,
      feedback: 'Correct. General Order 4.13.11(A)(3)(b) requires that if an officer did not arrest or seek an arrest warrant despite probable cause and an authorized arrest, a detailed explanation of the reason for that decision must be included in the narrative. "Parties separated for the evening. No arrest made." does not satisfy this requirement.'
    },
    {
      scenario: 'You are completing your DV incident report. The victim tells you about injuries you cannot see — she says her ribs are sore and she believes one may be cracked, though there is no visible bruising or marks.',
      text: 'How should this reported but unobserved injury be documented under EGPD General Order 4.13.11?',
      options: [
        'Do not include unverified injuries in the report — document only what you directly observed.',
        'Include a description of any injuries observed by the officer, AND a description of any injuries described by the victim but not observed, with an indication that the injury was not observed.',
        'Photograph the area and include your assessment of whether the injury appears credible.',
        'Have the victim sign a separate statement about the injury and attach it to your report.'
      ],
      correct: 1,
      feedback: 'Correct. General Order 4.13.11(A)(3)(a)(5)-(6) requires the narrative to include both a description of injuries observed by the officer and a description of injuries described by the victim but not observed — with a clear indication that the injury was not observed by the officer. Both belong in the report with clear attribution.'
    },
    {
      scenario: 'You are responding to a domestic disturbance call on Cherry Street. Dispatch advises possible DV in progress.',
      text: 'Under EGPD General Order 4.13.2, what is the required approach for a domestic disturbance call?',
      options: [
        'Respond with full lights and sirens to establish rapid scene presence and deter ongoing violence.',
        'Avoid the use of sirens and emergency lights in the vicinity of the scene, and approach from flanking positions rather than parking directly in front of the residence.',
        'Stage one block away and wait for backup before any approach.',
        'Approach code 3 to within a quarter mile, then switch to code 1 for final approach.'
      ],
      correct: 1,
      feedback: 'Correct. General Order 4.13.2(C) directs responding officers to avoid sirens and emergency lights in the vicinity of the scene, and to avoid parking directly in front of the residence — instead approaching from flanking positions that yield the most advantageous tactical considerations. All active domestic incidents are considered high risk and approached using standard precautionary measures.'
    },
    {
      scenario: 'A victim in a domestic violence case discloses, during a follow-up call, that the offender — who is subject to a final PFA order against her — appeared at her workplace last week, which she never reported.',
      text: 'Under EGPD General Order 4.13.9, what is your obligation regarding this disclosure?',
      options: [
        'The PFA violation is a civil matter — refer her to court to report it.',
        'Document the violation. A police officer shall arrest a defendant for violating a final PFA order issued under 23 Pa.C.S. Chapter 61, with a charge of Indirect Criminal Contempt prepared in addition to any other charges.',
        'Take no action since the violation occurred in the past and was not witnessed by an officer.',
        'Advise her to file a private criminal complaint with the District Attorney\'s office.'
      ],
      correct: 1,
      feedback: 'Correct. General Order 4.13.9(A) authorizes arrest for a PFA violation upon probable cause "whether or not the violation of the Order occurred in the presence of the officer." 4.13.9(B) makes arrest mandatory for violations of a Chapter 61 order, and 4.13.9(C)(2) requires a charge of Indirect Criminal Contempt in addition to any other charges. The disclosure must be documented and acted on under 4.13.10(E) as a Supplemental Incident Report.'
    },
    {
      scenario: 'You respond to a domestic violence incident and confirm abuse occurred.',
      text: 'Under EGPD General Order 4.13.7, what notice must you provide to the victim?',
      options: [
        'A verbal acknowledgment that you understand the situation — written notice is optional.',
        'Oral and written notice of the availability of safe shelter and domestic violence services, including the hotline number, and the victim\'s rights under 23 Pa.C.S. Ch. 61 — with the victim signing a receipt to be attached to the incident report.',
        'A copy of the arrest report only, once charges are filed.',
        'Notice is only required if the victim explicitly requests information about her legal options.'
      ],
      correct: 1,
      feedback: 'Correct. General Order 4.13.7(A) requires the officer to provide oral and written notice of the availability of safe shelter and domestic violence services, including the hotline number, and of the victim\'s right to seek a Protection from Abuse order under 23 Pa.C.S. Ch. 61. 4.13.7(B) requires the victim to sign a receipt acknowledging the notice, which is attached to the incident report required under 4.13.10.'
    },
    {
      scenario: 'You arrest a defendant for violating a final Protection From Abuse order. The defendant is processed and arraigned.',
      text: 'Under EGPD General Order 4.13.10, what is your obligation to the protected party after the arrest?',
      options: [
        'No further notification is required once the arrest is made — the court will notify the victim of next steps.',
        'Make reasonable efforts to notify the protected party of the defendant\'s arrest as soon as possible, and document all notice attempts as a Supplemental Incident Report.',
        'Notify the protected party only if they specifically request to be informed.',
        'Notification is the responsibility of the District Attorney\'s office, not the arresting officer.'
      ],
      correct: 1,
      feedback: 'Correct. General Order 4.13.10(A) requires the arresting officer to make reasonable efforts to notify any adult protected by a Chapter 61 order of the defendant\'s arrest as soon as possible following the arrest, and to notify them of the disposition following arraignment within 24 hours. 4.13.10(E) requires all notices and attempted notices to be documented as a Supplemental Incident Report attached to the original case report.'
    },
  ];
}
