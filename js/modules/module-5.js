══════════════════════════════════════════ */
const SCENARIO_DOMESTIC_VIOLENCE = {
  id: 'scenario-dv',
  title: 'Old Skippack Road — Domestic Disturbance',
  location: 'Old Skippack Road, Marlborough Township, PA',
  totalDecisions: 3,
  nodes: {
    'start': {
      type: 'scene', time: '22:47', weather: 'Clear / 54°F', unit: 'Patrol Unit 2',
      narrative: [
        'Dispatch advises a 911 hang-up from a residence on Old Skippack Road. A second call came in from a neighbor reporting shouting and what sounded like breaking glass. The registered resident is Jessica Harmon, 29. PA JNET returns a prior incident at this address eight months ago — a DV report, no arrest at the time.',
        'You and your backup unit arrive two minutes apart. No lights or sirens within one block of the residence, per MTPD ALO 4.13. The house is dark except for a light in a rear room. You hear a male voice raised inside. As you approach the front door, a woman opens it. She has a visible bruise forming under her left eye. She says quietly: "He left out the back." A male is seen walking quickly toward the tree line.'
      ],
      next: 'd1'
    },
    'd1': {
      type: 'decision',
      decisionNumber: 1,
      situation: 'You are at the front door with Jessica Harmon. She has a fresh bruise under her left eye. She tells you the male who just fled is her husband, Marcus Harmon, 31. She says they had an argument, he "pushed her into the door frame," and she hit her face. She now says she does not want to press charges. Your backup unit is at the rear of the property watching the tree line.\n\nJessica says: "I just want him to leave for the night. Can you just make him come back and get his stuff and go somewhere else?"',
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
          text: 'Determine whether probable cause exists for a Simple Assault arrest based on your own observations and Jessica\'s statement — victim consent is not required under MTPD ALO 4.13.',
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
        'Under MTPD ALO 4.13, in every domestic violence incident involving Simple Assault between household members where the officer has probable cause — based on their own observations or victim statement — arrest is mandatory. Victim consent is not a required element and victim preference does not control the decision.',
        'Jessica has a visible fresh injury consistent with her account. Your observations plus her statement establish probable cause for Simple Assault. Not making that arrest is a policy violation, regardless of what Jessica wants.',
        'Victims in DV situations frequently request no arrest — this is common and expected. It cannot override your obligation under ALO 4.13. Your role is to document, make the required arrest, and ensure victim notifications are completed.',
        'Additionally: you now have a fleeing subject. Your backup needs updated tasking immediately.'
      ],
      legal: 'MTPD ALO 4.13: "In every domestic violence incident in which the police have probable cause, based on their own observations or the statements of witnesses or the victim, to believe that an assault has been committed... officers shall arrest the primary aggressor." Victim consent is not listed as a required element — because it is not.',
      next: 'd2'
    },
    'c1-neutral': {
      type: 'consequence',
      outcomeClass: 'outcome-neutral',
      outcomeLabel: 'Delay Creates Risk',
      heading: 'Supervisor consultation is not required to make a mandatory arrest.',
      narrative: [
        'MTPD ALO 4.13 does not require supervisor authorization before making a DV arrest when probable cause exists. Taking time to consult before acting — while a subject is actively fleeing — may allow Marcus Harmon to exit the area entirely.',
        'The correct approach is to immediately act on the probable cause you already have, notify dispatch of the pursuit of a fleeing DV suspect, and brief your supervisor as part of your follow-up — not as a precondition.',
        'Documentation and supervisor notification are required after the fact, not before.'
      ],
      legal: 'ALO 4.13: Officers shall arrest the primary aggressor when PC exists. Notification to supervisor is required — but is not a precondition for the arrest. Waiting in a fleeing-suspect scenario without a clear reason creates legal and tactical risk.',
      next: 'd2'
    },
    'c1-good': {
      type: 'consequence',
      outcomeClass: 'outcome-good',
      outcomeLabel: 'Correct Application of Mandatory Arrest',
      heading: 'Probable cause is yours to evaluate — not the victim\'s to grant.',
      narrative: [
        'You observe a fresh bruise under Jessica\'s left eye. She provides a statement that her husband pushed her into the door frame. That combination — your direct observation of injury plus a victim statement of recent physical contact by the accused — establishes probable cause for Simple Assault.',
        'Under MTPD ALO 4.13, this arrest is mandatory. Victim preference is not a controlling factor. You immediately advise dispatch of a fleeing DV suspect, update your backup unit on Marcus Harmon\'s description and direction, and begin the process for apprehension.',
        'You also initiate the ALO 4.13 victim notification requirements and begin your narrative checklist for documentation.'
      ],
      legal: 'MTPD ALO 4.13: Officers shall arrest the primary aggressor based on their own observations or victim/witness statements. The probable cause determination is the officer\'s — not the victim\'s. A visible injury plus a consistent victim account satisfies the standard.',
      next: 'd2'
    },
    'd2': {
      type: 'decision',
      decisionNumber: 2,
      situation: 'Marcus Harmon is located at a neighbor\'s property two blocks away and taken into custody without incident. Back at the residence, Jessica is cooperative. While speaking with her, she mentions that Marcus keeps "a few guns" in the bedroom closet — hunting rifles and a handgun. She shows you a Protection From Abuse order that was issued three weeks ago. The PFA is a final order that prohibits Marcus from possessing firearms.\n\nJessica asks you to just list the guns in the report. "He\'s already in custody," she says. "He\'ll probably just turn them over later."',
      question: 'What is your obligation regarding the firearms in the residence?',
      options: [
        {
          text: 'Document the firearms in the report as requested. Marcus is in custody, the PFA is active, and he can surrender them through the legal process.',
          shortLabel: 'Document only — leave firearms for legal process',
          quality: 'bad',
          next: 'c2-bad'
        },
        {
          text: 'Seize the firearms from the residence now. A valid PFA prohibiting possession is in effect, Marcus is the subject of a DV arrest, and leaving known firearms at the scene creates immediate risk.',
          shortLabel: 'Seize firearms — PFA + DV arrest requires it',
          quality: 'good',
          next: 'c2-good'
        },
        {
          text: 'Ask Jessica for consent to take the guns "for safekeeping" and document it as a consent seizure.',
          shortLabel: 'Request victim consent for "safekeeping" seizure',
          quality: 'risky',
          next: 'c2-neutral'
        }
      ]
    },
    'c2-bad': {
      type: 'consequence',
      outcomeClass: 'outcome-bad',
      outcomeLabel: 'Dangerous Outcome',
      heading: 'Leaving firearms at a DV scene following an arrest is a documented risk factor for homicide.',
      narrative: [
        'A valid PFA order prohibiting firearm possession is in effect. Marcus Harmon has just been arrested for assault of the protected party. Firearms are present at the residence and confirmed to be his.',
        'MTPD ALO 4.13 requires officers to seize firearms when a DV arrest is made and the subject is prohibited from possession. This is not discretionary documentation — it is a mandatory action.',
        'Firearms in the home of a DV victim following an arrest of the abuser represent one of the highest-documented lethality risk factors. "He can turn them over later" is not an acceptable justification for non-action when you have the legal authority and departmental obligation to act now.',
        'Document the seizure on a Property Record Form before end of shift per ALO 3.05/3.06.'
      ],
      legal: 'MTPD ALO 4.13: Officers shall seize firearms when a person is arrested for a crime of violence involving a family or household member and is subject to a court order prohibiting possession. The PFA is confirmed. The arrest is complete. The seizure obligation is triggered.',
      next: 'd3'
    },
    'c2-good': {
      type: 'consequence',
      outcomeClass: 'outcome-good',
      outcomeLabel: 'Correct Mandatory Action',
      heading: 'A PFA + DV arrest triggers mandatory firearms seizure.',
      narrative: [
        'You seize the firearms from the residence. A valid final PFA order is in effect prohibiting Marcus Harmon from possessing firearms. He has just been arrested for assault of the protected party. Both conditions triggering mandatory seizure under ALO 4.13 are satisfied.',
        'You complete a Property Record Form for each firearm before end of shift per MTPD ALO 3.05/3.06, documenting each firearm\'s make, model, and serial number, and securing them in the property room.',
        'You also complete the required victim notification checklist under ALO 4.13: provide Jessica with the DV resource card, advise her of the arraignment timeline, explain bail conditions if set, and document completion of notifications in your report narrative.'
      ],
      legal: 'ALO 4.13: Mandatory firearms seizure when arrest is made and subject is prohibited from possession under a PFA order. ALO 3.05/3.06: Property Record Form required for each seized item before end of shift. Chain of custody begins the moment you take possession.',
      next: 'd3'
    },
    'c2-neutral': {
      type: 'consequence',
      outcomeClass: 'outcome-neutral',
      outcomeLabel: 'Correct Result — Wrong Authority',
      heading: 'Consent works here, but you don\'t need it — and relying on it creates a vulnerability.',
      narrative: [
        'Jessica consents to the seizure, and you take the firearms. The outcome is correct — the firearms are removed from the residence. However, framing this as a consent seizure creates an unnecessary legal vulnerability.',
        'You have independent statutory authority to seize those firearms: a valid PFA order prohibiting possession is confirmed, and a DV arrest has been made. That authority does not require the victim\'s consent — and it should not be contingent on it.',
        'If Jessica had refused consent, framing it as a consent request would have left you without a clear path forward. Document the seizure under ALO 4.13 mandatory authority and the PFA — not as a consent search.'
      ],
      legal: 'ALO 4.13 provides independent authority for firearms seizure when a DV arrest is made and a protective order prohibiting possession is in effect. Consent is not required and should not be the stated basis for the seizure. Use the correct legal authority in your documentation.',
      next: 'd3'
    },

    'd3': {
      type: 'decision',
      decisionNumber: 3,
      situation: 'Two hours after Marcus Harmon\'s arrest, Jessica calls the station. She is upset. She says she wants to drop the charges, she wants the guns back, and she is threatening to file a complaint against you for "stealing" the firearms. Your supervisor patches the call to you.',
      question: 'How do you handle Jessica\'s call?',
      options: [
        {
          text: 'Tell her to come in and you will sit down with her to discuss the firearms and the charges.',
          shortLabel: 'Invite her in to discuss informally',
          quality: 'bad',
          next: 'c3-bad'
        },
        {
          text: 'Explain clearly and professionally: the arrest was made under mandatory arrest authority and is not subject to victim withdrawal; the firearms were seized under ALO 4.13 and the active PFA and cannot be returned without a court order; document the call and notify your supervisor.',
          shortLabel: 'Explain the legal framework, document the call',
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
      heading: 'Informal conversations with DV victims about active cases create significant risk.',
      narrative: [
        'An informal sit-down about the charges and firearms is exactly the kind of contact that should not happen outside of supervised, documented channels. Any concessions or impressions you create in that meeting — even unintentionally — can undermine the prosecution and expose you to accusations of witness tampering.',
        'DV victims frequently recant or attempt to intervene in prosecutions. This is expected and does not change your obligations. The charges move forward under the Commonwealth\'s authority, not hers. The firearms hold is governed by court order and ALO 4.13 — not by her request.',
        'Document the call. Notify your supervisor. That is your role at this stage.'
      ],
      legal: 'Under ALO 4.13, once a mandatory arrest is made the charging decision is not the victim\'s. Firearms seized under an active PFA require a court order for return. Informal discussions with witnesses in active cases create evidentiary and ethical risk. Document all post-arrest victim contact.',
      next: 'debrief'
    },
    'c3-good': {
      type: 'consequence',
      outcomeClass: 'outcome-good',
      outcomeLabel: 'Professional and Legally Correct',
      heading: 'Explaining the legal framework clearly protects Jessica and the case.',
      narrative: [
        'Victims of domestic violence often attempt to recant or intervene in cases — this is a well-documented response, not evidence that the incident did not occur. Your job is to explain the process accurately and without judgment.',
        'By clearly stating that the arrest proceeded under mandatory authority, that the firearms are held per ALO 4.13 and the active PFA, and that return requires a court order, you give her accurate information and set realistic expectations.',
        'Documenting the contact and notifying your supervisor ensures the detective or prosecutor handling the case is aware of her current position. That contact record may become important at trial.'
      ],
      legal: 'ALO 4.13 mandatory arrest authority is independent of victim preference. Active PFA firearms seizures are governed by 23 Pa. C.S. § 6108 — return of seized firearms requires a court order. Document all post-arrest victim contact per department protocol.',
      next: 'debrief'
    },
    'c3-neutral': {
      type: 'consequence',
      outcomeClass: 'outcome-neutral',
      outcomeLabel: 'Incomplete Handoff',
      heading: 'Transferring without a brief leaves your supervisor unprepared.',
      narrative: [
        'Your supervisor cannot handle this call effectively without context: who she is, what was seized, what the legal basis was, what she is alleging. A cold transfer puts them in the position of either stumbling through the call or asking her to hold while they find your report.',
        'A 30-second brief before transferring — victim\'s name, what happened, what the call is about — is part of professional handoff. It protects the supervisor, the case, and your documentation.',
        'Brief before you transfer. Always.'
      ],
      legal: 'Post-arrest victim contacts in DV cases are sensitive and should be handled by a supervisor or detective with full case knowledge. Ensure any transfer includes a factual brief so the receiving officer can respond accurately and document the contact properly.',
      next: 'debrief'
    },
    'debrief': { type: 'debrief' }
  }
};

/* ══════════════════════════════════════════
   SCENARIO — Motor Vehicle Pursuits
══════════════════════════════════════════ */

function getDomesticViolenceQuestions() {
  return [
    {
      scenario: 'You respond to a DV call and observe the victim has a fresh bruise consistent with her account that her husband struck her. She tells you she does not want to press charges and asks you to make him leave for the night.',
      text: 'Under MTPD ALO 4.13, what is your obligation?',
      options: [
        'Honor the victim\'s preference — she is the protected party and her consent controls the arrest decision.',
        'If you have probable cause based on your observations or victim/witness statements, arrest of the primary aggressor is mandatory — victim consent is not a required element.',
        'Consult with your supervisor before making an arrest. Mandatory arrest requires supervisor authorization when the victim objects.',
        'Make a report and refer the case to detectives for follow-up arrest.'
      ],
      correct: 1,
      feedback: 'Correct. MTPD ALO 4.13 requires arrest of the primary aggressor in domestic violence incidents when probable cause exists — based on officer observations, victim statements, or witness statements. Victim preference does not control the arrest decision and is not a required element. A visible injury plus a consistent victim account establishes probable cause. The officer does not need the victim\'s consent or supervisor authorization to make the arrest.'
    },
    {
      scenario: 'You arrest a subject for Simple Assault of his wife. Upon securing him, you learn from his wife that there is a final PFA order in effect prohibiting him from possessing firearms. She tells you there are three firearms — two rifles and a handgun — in the bedroom closet.',
      text: 'What is your obligation regarding those firearms under MTPD ALO 4.13?',
      options: [
        'Advise the wife to secure the firearms herself and document the advisory in your report.',
        'Seize the firearms. A DV arrest combined with a protective order prohibiting possession triggers a mandatory firearms seizure obligation.',
        'Leave the firearms — the subject is already in custody and no longer has immediate access.',
        'Request a warrant before seizing firearms from a residence that is not the subject\'s primary address.'
      ],
      correct: 1,
      feedback: 'Correct. MTPD ALO 4.13 requires officers to seize firearms when a person is arrested for a domestic violence offense and is subject to a court order prohibiting firearm possession. Both conditions are present: a DV arrest and a confirmed final PFA order. The firearms are in the residence. The seizure is mandatory — not discretionary. Each seized firearm must be documented on a Property Record Form before end of shift per ALO 3.05/3.06.'
    },
    {
      scenario: 'You complete a DV arrest. The officer who investigated the prior incident at this address eight months ago elected not to arrest and wrote in the report only: "Parties separated for the evening. No arrest made."',
      text: 'Under MTPD ALO 4.13, what documentation standard applies when an officer has probable cause but elects not to arrest?',
      options: [
        'No additional documentation is required beyond noting that no arrest was made.',
        'The officer must document the victim\'s refusal to cooperate.',
        'The narrative must contain a detailed explanation of the specific reasons probable cause was not found or the specific reasons the officer elected not to arrest — "No arrest made" is not sufficient.',
        'The officer must obtain supervisor sign-off in the report acknowledging the decision not to arrest.'
      ],
      correct: 2,
      feedback: 'Correct. MTPD ALO 4.13 requires a detailed explanation in the narrative when an officer has probable cause but elects not to arrest. "Parties separated for the evening. No arrest made." does not satisfy this requirement. The narrative must address specifically: whether probable cause existed, and if it did, the specific documented reasons for not arresting. This protects the department, documents the officer\'s decision-making, and creates a record for future incidents at the same address.'
    },
    {
      scenario: 'You are completing your DV incident report. The victim informed you of injuries she says she sustained that are not visible to you — she says her ribs are sore and believes she may have cracked one.',
      text: 'How should this reported but unobserved injury be documented under MTPD ALO 4.13?',
      options: [
        'Do not include unverified injuries in the report — document only what you directly observed.',
        'Include the reported injury but clearly note that it was reported by the victim and not observed by the officer.',
        'Photograph the area and include your assessment of whether the injury appears credible.',
        'Have the victim sign a separate statement about the injury and attach it to your report.'
      ],
      correct: 1,
      feedback: 'Correct. The MTPD ALO 4.13 DV narrative checklist specifically requires documentation of both: injuries observed by the officer AND injuries reported by the victim but not observed — noted clearly as not observed. This distinction protects the officer from a later claim that an injury was concealed, while accurately representing the limits of the officer\'s personal observations. Both types of injury information belong in the narrative with clear attribution.'
    },
    {
      scenario: 'You are responding to a domestic disturbance. Dispatch advises possible DV in progress.',
      text: 'Under MTPD ALO 4.13, what is the required approach protocol for a domestic disturbance call?',
      options: [
        'Respond with full lights and sirens to establish rapid scene presence and deter ongoing violence.',
        'Stage one block away and wait for backup before any approach.',
        'Approach the scene without lights or sirens within one block of the reported location to avoid alerting subjects and allow for tactical assessment before contact.',
        'Approach code 3 to within a quarter mile, then switch to code 1 for final approach.'
      ],
      correct: 2,
      feedback: 'Correct. MTPD ALO 4.13 requires officers to approach domestic disturbance calls without lights or sirens within one block of the reported location. This approach protects officers by allowing for tactical assessment before making contact — and prevents alerting subjects inside the residence that police are arriving, which could trigger escalation, flight, or violence against the victim. Response to DV calls presents unique officer safety risks, and the approach protocol is a specific safety measure, not a suggestion.'
    },
    {
      scenario: 'You respond to a domestic disturbance and both parties have visible injuries. Each claims the other was the primary aggressor.',
      text: 'Under MTPD ALO 4.13, how do you determine who to arrest?',
      options: [
        'Arrest both parties — dual injuries require dual arrests.',
        'Arrest neither party — contradictory accounts create too much uncertainty.',
        'Evaluate the evidence to identify the primary aggressor: consider relative injury severity, prior history, threat of future harm, and whether one party acted in self-defense.',
        'Arrest the party who initiated the 911 call — they are more likely to be the victim.'
      ],
      correct: 2,
      feedback: 'Correct. ALO 4.13 and Pennsylvania DV law require identification of the primary aggressor when both parties claim victimhood. Dual arrests are disfavored and should be rare. Relevant factors: comparative severity of injuries, any history at the address, statements made, evidence of defensive injury patterns, and whether one party acted in self-defense. Document your reasoning thoroughly — primary aggressor determinations are scrutinized in court.'
    },
    {
      scenario: 'A victim in a domestic violence case has a prior Protection From Abuse order against the offender. The offender is present at the victim\'s residence when you arrive.',
      text: 'What is your obligation regarding the PFA violation?',
      options: [
        'The PFA violation is a civil matter — refer the victim to court to report the violation.',
        'Arrest the offender for criminal contempt of the PFA. A PFA violation is a criminal offense in Pennsylvania — it is not a civil enforcement matter for officers.',
        'Document the violation and advise the victim on how to file a contempt petition.',
        'Take no action on the PFA unless the victim specifically requests enforcement.'
      ],
      correct: 1,
      feedback: 'Correct. Under 23 Pa. C.S. § 6113, violation of a final PFA order is a criminal offense — indirect criminal contempt — and is not a civil matter. Officers who observe a violation have authority and obligation to arrest. Victim preference does not control the enforcement decision on a PFA violation any more than it does on the underlying assault. Document the violation, the PFA status, and your enforcement action.'
    },
    {
      scenario: 'After a DV arrest, you complete your ALO 4.13 notifications and documentation. The victim asks you: "What happens now? Will he be back tonight?"',
      text: 'What is your obligation and your appropriate response?',
      options: [
        'Tell her you are not able to predict what the court will do — that is the district attorney\'s job.',
        'Provide the required victim notifications: explain the arrest process, bail considerations, available emergency PFA options, victim services contact, and the steps for requesting a court order if she does not have one.',
        'Refer all questions to the district attorney\'s office — officers should not discuss court proceedings.',
        'Assure her that the offender will be held overnight as a matter of policy.'
      ],
      correct: 1,
      feedback: 'Correct. ALO 4.13 requires victim notification at the scene. This includes: explaining the charges filed, the likelihood of bail processing (which may mean release), how to obtain an emergency PFA if one is not in place, victim services contact information, and safety planning resources. Telling her you "cannot predict" the outcome without providing this framework abandons the notification requirement. Never make guarantees about detention — bail is a court function — but you must give her the information she needs to protect herself.'
    },
  ];
}

