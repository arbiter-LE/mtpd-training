/* ══════════════════════════════════════════
   READING — Domestic Violence (EGPD)
══════════════════════════════════════════ */
const DEBRIEF_DOMESTIC_VIOLENCE = `
  <h3>Key Legal Principles — Domestic Violence Response</h3>
  <p><strong>DV is investigated and managed as any other crime — EGPD General Order 4.13.</strong> The directive implements 23 Pa.C.S. (the Domestic Relations title), including Section 6105's law-enforcement responsibilities. All active domestic incidents are treated as high risk: avoid sirens and lights near the scene, approach from flanking positions, and make an external assessment before any committed approach.</p>
  <p><strong>Mandatory arrest on probable cause — GO 4.13.5(A).</strong> When recent physical injury or other corroborative evidence is observed, the officer shall arrest without a warrant when probable cause exists for the enumerated offenses (Simple Assault, Aggravated Assault, REAP, Terroristic Threats, Stalking, and others). Victim consent and supervisor authorization are absent from that provision — a fresh injury plus a consistent account establishes PC, and the arrest is then required. The defendant cannot be released instead of being taken before an issuing authority.</p>
  <p><strong>Victim preference does not control; charging belongs to the Commonwealth.</strong> A request for no arrest is a common, expected trauma response and does not change the obligation. Once the mandatory arrest is made, the charging decision is the Commonwealth's — the officer's duty is the lawful arrest and thorough documentation.</p>
  <p><strong>Mandatory weapon seizure — GO 4.13.6.</strong> The arresting officer shall seize all weapons used by the defendant in the commission of the offense — a weapon is defined by how it was used, not what it is or who owns it (a cell phone used to strike a victim qualifies). Seizure is mandatory, not a consent request, and the weapon is processed with a proper chain of custody and held until the court's disposition.</p>
  <p><strong>Victim-rights notification — GO 4.13.7.</strong> Every DV response requires oral and written notice (English and Spanish) of safe shelter, DV services, the hotline, and the right to petition for a Protection From Abuse order under 23 Pa.C.S. Ch. 61. The victim acknowledges receipt by signature, attached to the incident report. The obligation does not depend on whether the victim appears cooperative.</p>
  <p><strong>PFA enforcement — GO 4.13.9 / 4.13.10.</strong> An officer may arrest for a protection-order violation on probable cause whether or not it occurred in the officer's presence; for a final order, arrest is required, with Indirect Criminal Contempt charged in addition to any other charges. Notification efforts to the protected party are documented as a Supplemental Incident Report — and a violation disclosed during a follow-up contact triggers these obligations the moment it is disclosed.</p>
`;

const READING_DOMESTIC_VIOLENCE = `
  <div class="content-block">
    <h4>Scenario</h4>
    <h2>A 911 hang-up on Cherry Street. A neighbor hears shouting and breaking glass. The woman who answers the door has a bruise forming under her eye and tells you she doesn't want to press charges. Department policy has already answered most of the questions you're about to face.</h2>
    <p>This module covers EGPD General Order 4.13 — the department's Domestic Violence directive — from response and mandatory arrest through weapon seizure, victim notification, PFA enforcement, and reporting.</p>
  </div>
  <div class="content-block">
    <h4>General Order 4.13 — Policy</h4>
    <h2>Domestic violence is investigated and managed as any other crime.</h2>
    <div class="sop-box">
      <div class="sop-title">GO 4.13, Policy</div>
      <p>"It is the policy of the department to view domestic violence as being within the scope of the criminal justice system and to ensure that incidents of domestic violence are investigated and managed as any other crime, regardless of the relationship of the victim and the offender." The directive implements 23 Pa.C.S. (the Domestic Relations title), including Section 6105's responsibilities for law enforcement agencies.</p>
    </div>
    <div class="sop-box">
      <div class="sop-title">GO 4.13.2 — Response Procedures</div>
      <p>"Responding officers should avoid any use of sirens and emergency lights in the vicinity of the scene of the incident" and "should not park police vehicles directly in front of any residence... but rather, approach the site from flanking positions that yield the most advantageous tactical considerations. All active domestic related incidents shall be considered high risk and be approached using standard precautionary measures." Make an initial external assessment before any committed approach; a hostage or barricade indication means containment and a supervisor, not entry.</p>
    </div>
  </div>
  <div class="content-block">
    <h4>GO 4.13.5 — Required Arrests Upon Probable Cause</h4>
    <h2>This arrest decision is yours to evaluate — not the victim's to grant.</h2>
    <div class="sop-box">
      <div class="sop-title">GO 4.13.5(A) — The Mandatory Arrest Provision</div>
      <p>"When recent physical injury to a victim or other corroborative evidence, is observed by an officer investigating a domestic violence incident, the officer shall arrest without a warrant, as in a felony, when probable cause exists to believe the following crimes have been committed against a spouse or other person with whom the alleged person resides or has formerly resided: Involuntary Manslaughter [Pa.C.S. 2504], Simple Assault [Pa.C.S. 2701], Aggravated Assault [Pa.C.S. 2702 (a)(3),(4),(5)], Recklessly Endangering [Pa.C.S. 2705], Terroristic Threats [Pa C.S. 2706], Stalking [Pa C.S. 2709.1]."</p>
    </div>
    <p>Note what is absent from that provision: victim consent, and supervisor authorization. A visible fresh injury plus a consistent victim account establishes probable cause for Simple Assault — and the arrest is then required. Victims frequently request no arrest; that is a common, expected trauma response, and it does not change the obligation. Once a mandatory arrest is made, the charging decision belongs to the Commonwealth, not the victim. The defendant is removed from the scene, transported for processing, and afforded a preliminary arraignment — "in no case shall the arresting officer release the defendant from custody rather than taking the defendant before an issuing authority."</p>
  </div>
  <div class="content-block">
    <h4>GO 4.13.6 — Seizure of Weapons</h4>
    <h2>A weapon is defined by how it was used — not by what it is or who owns it.</h2>
    <div class="sop-box">
      <div class="sop-title">GO 4.13.6 — Weapon Seizure Requirements</div>
      <p>"The arresting officer shall seize all weapons used by the defendant in the commission of an alleged offense." Seized weapons "shall be secured and processed in accordance with proper evidence collection and preservation practices," "maintained with a proper chain of custody and entered into the property management system," with "custody... maintained until a disposition of the case is determined by a court of jurisdiction."</p>
    </div>
    <p>A cell phone used to strike a victim is a weapon used in the commission of the offense — seizure is mandatory, not discretionary, and it does not depend on anyone's consent. Do not frame a mandatory evidence seizure as a consent request; consent can be refused, and the stated basis for your action matters in court.</p>
  </div>
  <div class="content-block">
    <h4>GO 4.13.7 — Victim Rights Notifications</h4>
    <h2>Oral and written notice, every DV response — with a signed receipt.</h2>
    <p>Upon responding to a domestic violence case, the officer shall provide the abused person with oral and written notice of the availability of safe shelter and domestic violence services, including the hotline number. The written notice (in English and Spanish) advises the victim of the right to petition for a Protection From Abuse order under 23 Pa.C.S. Ch. 61 — including orders restraining the abuser, directing the abuser to leave the household, protecting the residence, school, business, or place of employment, and addressing custody and support. The victim acknowledges receipt by signature, and the receipt is returned and attached to the incident report.</p>
  </div>
  <div class="content-block">
    <h4>GO 4.13.9 / 4.13.10 — Protection Orders</h4>
    <h2>A final PFA violation is a mandatory arrest — whenever it is disclosed.</h2>
    <div class="sop-box">
      <div class="sop-title">GO 4.13.9 — Enforcement</div>
      <p>An officer may arrest for a Protection Order violation upon probable cause "whether or not the violation of the Order occurred in the presence of the officer." For final orders: "A police officer shall arrest a defendant for violating an order issued under 23 Pa.C.S., Chapter 61" — verified through CLEAN or the issuing authority. Following arrest, "a charge of 'Indirect Criminal Contempt' shall be completed by the arresting officer, in addition to any other charges," and the defendant is taken before the court without unnecessary delay.</p>
    </div>
    <p>Under GO 4.13.10, the arresting officer makes reasonable efforts to notify the protected party of the arrest as soon as possible, and of the disposition at arraignment within 24 hours — and "all notices, and actions completed in attempting notice, shall be documented by the officer as a Supplemental Incident Report." A PFA violation disclosed during a follow-up call — even one the victim never reported at the time — triggers these obligations the moment it is disclosed.</p>
  </div>
  <div class="content-block">
    <h4>GO 4.13.11 — Required Reports</h4>
    <h2>The narrative standard — including when you don't arrest.</h2>
    <p>Incident report narratives should include, where applicable: the relationship between victim and accused; weapons used or threatened; <strong>"a description of any injuries observed by the officer"</strong> and <strong>"a description of any injuries described by the victim, but not observed by the officer, and an indication that the injury was not observed"</strong>; evidence tending to establish that a crime was committed; whether an arrest was made or the reason for electing not to arrest; children present; and prior incidents known to the officer or reported by the victim or witnesses.</p>
    <div class="sop-box">
      <div class="sop-title">GO 4.13.11(A)(3)(b) — The Non-Arrest Explanation</div>
      <p>"If the officer did not arrest or seek an arrest warrant, even though probable cause existed and an arrest was authorized, a detailed explanation of the reason(s) for the officer's decision not to arrest shall be included in the narrative section of the incident report." "Parties separated for the evening. No arrest made." does not satisfy this requirement.</p>
    </div>
    <button class="btn-launch" onclick="startScenario('egpd-domestic-violence')">Proceed to Scenario Exercise →</button>
  </div>
`;

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
        'Dispatch advises a 911 hang-up from a residence on Cherry Street. A second call came in from a neighbor reporting shouting and what sounded like breaking glass. The registered resident is Danielle Weaver, 27. CLEAN returns a prior incident at this address eight months ago — a DV report, no arrest at the time.',
        'You and your backup unit arrive two minutes apart. Per EGPD General Order 4.13.2, you avoid using sirens and emergency lights in the vicinity of the scene, and approach from flanking positions rather than parking directly in front of the residence. The house is dark except for a light in a rear room. You hear a male voice raised inside. As you approach the front door, a woman opens it. She has a visible bruise forming under her left eye. She says quietly: "He left out the back." A male is seen walking quickly toward the tree line.'
      ],
      next: 'd1'
    },
    'd1': {
      type: 'decision',
      decisionNumber: 1,
      situation: 'You are at the front door with Danielle Weaver. She has a fresh bruise under her left eye. She tells you the male who just fled is her husband, Brian Weaver, 30. She says they had an argument, he "pushed her into the door frame," and she hit her face. She now says she does not want to press charges. Your backup unit is at the rear of the property watching the tree line.\n\nDanielle says: "I just want him to leave for the night. Can you just make him come back and get his stuff and go somewhere else?"',
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
        'EGPD General Order 4.13.5 does not require supervisor authorization before making a DV arrest when probable cause exists. Taking time to consult before acting — while a subject is actively fleeing — may allow Brian Weaver to exit the area entirely.',
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
        'Under General Order 4.13.5, this arrest is mandatory. Victim preference is not a controlling factor. You immediately advise dispatch of a fleeing DV suspect, update your backup unit on Brian Weaver\'s description and direction, and begin the process for apprehension.',
        'You also begin the General Order 4.13.7 victim notification requirements and start your narrative checklist for documentation under 4.13.11.'
      ],
      legal: 'EGPD General Order 4.13.5(A): officers shall arrest without a warrant, as in a felony, when probable cause exists for Simple Assault [18 Pa.C.S. 2701] against a household member. The probable cause determination is the officer\'s — a visible injury plus a consistent victim account satisfies the standard.',
      next: 'd2'
    },
    'd2': {
      type: 'decision',
      decisionNumber: 2,
      situation: 'Brian Weaver is located at a neighbor\'s property two blocks away and taken into custody without incident. Back at the residence, Danielle is cooperative. While speaking with her, she shows you a cracked phone screen and says Brian struck her in the face with his cell phone during the argument before she opened the door for you. The phone is sitting on the kitchen counter.\n\nDanielle asks you to just note the phone in the report. "He\'s already in custody," she says. "It\'s just his phone, he\'ll need it back."',
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
      situation: 'Two hours after Brian Weaver\'s arrest, Danielle calls the station. She is upset. She says she wants to drop the charges and get the phone back. While on the call, she also mentions that Brian has a final Protection From Abuse order against him from a prior relationship — and that he showed up at her workplace on Cherry Street last week, which she never reported. Your supervisor patches the call to you.',
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
        'Honor the victim\'s preference — she is the protected party, and her consent controls the arrest decision.',
        'Consult your supervisor before making an arrest; mandatory arrest requires supervisor authorization when the victim objects.',
        'If you observe recent physical injury and probable cause exists to believe Simple Assault was committed against a household member, arrest without a warrant is required — victim consent is not a required element.',
        'Make a report and refer the case to detectives for a follow-up arrest.'
      ],
    },
    {
      scenario: 'You arrest a subject for Simple Assault of his wife. During the arrest, you confirm he struck her with his cell phone, which is sitting on the kitchen counter. The wife asks you to leave it — "it\'s his phone, he\'ll need it back."',
      text: 'What is your obligation regarding the phone under EGPD General Order 4.13.6?',
      options: [
        'Seize the phone. A weapon used by the defendant in the commission of an alleged offense must be seized, secured, and entered into the property management system with chain of custody.',
        'Advise her to hold onto the phone for him and document the advisory in your report.',
        'Leave the phone — the subject is already in custody and no longer has access to it.',
        'Request a warrant before seizing personal property belonging to the arrested subject.'
      ],
    },
    {
      scenario: 'You complete a DV arrest. The officer who investigated the prior incident at this address eight months ago elected not to arrest, despite probable cause being present, and wrote in the report only: "Parties separated for the evening. No arrest made."',
      text: 'Under EGPD General Order 4.13.11, what documentation standard applies when an officer has probable cause but elects not to arrest?',
      options: [
        'No additional documentation is required beyond noting that no arrest was made.',
        'The officer must document only the victim\'s refusal to cooperate.',
        'The officer must obtain supervisor sign-off in the report acknowledging the decision not to arrest.',
        'If the officer did not arrest even though probable cause existed and an arrest was authorized, a detailed explanation of the reason(s) for the decision not to arrest must be included in the narrative — "No arrest made" is not sufficient.'
      ],
    },
    {
      scenario: 'You are completing your DV incident report. The victim tells you about injuries you cannot see — she says her ribs are sore and she believes one may be cracked, though there is no visible bruising or marks.',
      text: 'How should this reported but unobserved injury be documented under EGPD General Order 4.13.11?',
      options: [
        'Do not include unverified injuries in the report — document only what you directly observed.',
        'Photograph the area and include your own assessment of whether the injury appears credible.',
        'Include a description of any injuries observed by the officer, AND a description of any injuries described by the victim but not observed, with an indication that the injury was not observed.',
        'Have the victim sign a separate statement about the injury and attach it to your report.'
      ],
    },
    {
      scenario: 'You are responding to a domestic disturbance call on Cherry Street. Dispatch advises possible DV in progress.',
      text: 'Under EGPD General Order 4.13.2, what is the required approach for a domestic disturbance call?',
      options: [
        'Avoid the use of sirens and emergency lights in the vicinity of the scene, and approach from flanking positions rather than parking directly in front of the residence.',
        'Respond with full lights and sirens to establish rapid scene presence and deter ongoing violence.',
        'Stage one block away and wait for backup before making any approach at all.',
        'Approach code 3 to within a quarter mile, then switch to code 1 for the final approach.'
      ],
    },
    {
      scenario: 'A victim in a domestic violence case discloses, during a follow-up call, that the offender — who is subject to a final PFA order against her — appeared at her workplace last week, which she never reported.',
      text: 'Under EGPD General Order 4.13.9, what is your obligation regarding this disclosure?',
      options: [
        'The PFA violation is a civil matter — refer her to court to report it.',
        'Take no action, since the violation occurred in the past and was not witnessed by an officer.',
        'Advise her to file a private criminal complaint with the District Attorney\'s office.',
        'Document the violation. A police officer shall arrest a defendant for violating a final PFA order issued under 23 Pa.C.S. Chapter 61, with a charge of Indirect Criminal Contempt prepared in addition to any other charges.'
      ],
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
    },
    {
      scenario: 'You arrest a defendant for violating a final Protection From Abuse order. The defendant is processed and arraigned.',
      text: 'Under EGPD General Order 4.13.10, what is your obligation to the protected party after the arrest?',
      options: [
        'Make reasonable efforts to notify the protected party of the defendant\'s arrest as soon as possible, and document all notice attempts as a Supplemental Incident Report.',
        'No further notification is required once the arrest is made — the court will notify the victim of next steps.',
        'Notify the protected party only if they specifically request to be informed.',
        'Notification is the responsibility of the District Attorney\'s office, not the arresting officer.'
      ],
    },
  ];
}

/* ══════════════════════════════════════════
   SUPERVISOR OVERLAY — Domestic Violence (EGPD)
   Built on GO 4.13's mandatory provisions — the supervisor's
   review is where those mandates hold or quietly erode.
══════════════════════════════════════════ */
const SUPERVISOR_DOMESTIC_VIOLENCE = `
  <div class="content-block">
    <h4>Supervisor Focus</h4>
    <h2>GO 4.13 takes the hardest domestic-violence decisions out of the moment and puts them in policy. Your review is where policy actually holds.</h2>
    <p>Domestic violence is the area where an officer faces the most pressure to do the wrong thing for sympathetic reasons — a victim begging not to arrest, a quiet scene, a long night. General Order 4.13 answers most of those questions in advance with mandatory provisions, and your review is where those mandates are enforced or quietly eroded. The directive treats domestic violence "as any other crime, regardless of the relationship of the victim and the offender." Your job is to make sure the report you approve reflects that — not the path of least resistance an exhausted officer took at 3 a.m.</p>
  </div>
  <div class="content-block">
    <h4>The Most Important Review You Do — the Non-Arrest</h4>
    <h2>When there was no arrest, read the narrative first.</h2>
    <p>The most consequential thing you review in a DV report is a decision not to arrest. GO 4.13.11(A)(3)(b) requires that when probable cause existed and an arrest was authorized but the officer did not arrest, the narrative contain a detailed explanation of the reasons. "Parties separated for the evening. No arrest made." does not satisfy it — and a report like that, waved through, is exactly the eight-months-ago history that haunts the next call to the same address. On any DV non-arrest, confirm whether observed injury plus probable cause for a 4.13.5 offense were present. If they were, the question is not how well the officer explained the non-arrest — it is why an arrest was not made at all.</p>
  </div>
  <div class="content-block">
    <h4>Mandatory Arrest and the Limits of the Victim's Role</h4>
    <p>GO 4.13.5 requires a warrantless arrest, as in a felony, when recent physical injury is observed and probable cause exists for the listed offenses against a household member. Two things you confirm on review and reinforce with your officers: victim consent is not an element — a request for no arrest is a common, expected trauma response that does not change the obligation; and supervisor authorization is not a precondition — officers act on the probable cause they have and brief you after, rather than waiting for permission while a suspect walks into the tree line. Once a mandatory arrest is made, the charging decision belongs to the Commonwealth, not the victim — and protecting that is your job. An informal "let's sit down and talk about dropping the charges" with a recanting victim is a case-integrity problem you head off before it happens.</p>
  </div>
  <div class="content-block">
    <h4>The Mandatory Mechanics You Verify on Every DV Report</h4>
    <ul class="key-points">
      <li><strong>Weapon seizure (4.13.6).</strong> Any item used in the commission of the offense — a phone, a lamp, anything — is evidence and "shall be seized," processed with chain of custody, and held until court disposition. Confirm it was seized as evidence, not framed as a consent request. Consent can be refused; the stated basis matters in court.</li>
      <li><strong>Victim-rights notification (4.13.7).</strong> Oral and written notice of shelter, services, the hotline, and PFA rights under 23 Pa.C.S. Ch. 61, with the victim's signed receipt attached to the report. A DV report missing the signed receipt is incomplete and goes back.</li>
      <li><strong>PFA enforcement (4.13.9 / 4.13.10).</strong> A final-PFA violation is a mandatory arrest whenever it is disclosed — even a past, unreported one — with an Indirect Criminal Contempt charge and protected-party notification documented as a Supplemental Incident Report. Confirm disclosed violations were acted on, not merely noted in passing.</li>
      <li><strong>Narrative completeness (4.13.11).</strong> Relationship, weapons used or threatened, injuries observed AND injuries reported-but-not-observed with that distinction stated, children present, and prior incidents known or reported.</li>
    </ul>
  </div>
  <div class="content-block">
    <h4>Patterns, Repeat Addresses, and Lethality</h4>
    <p>Domestic violence is where the patterns in your reports carry the highest stakes. A repeat address, an escalating series of "no arrest" contacts, a victim who recants and re-reports — these are the signals that precede the worst outcomes, and you see them across reports in a way no single officer can. Track repeat locations, flag escalation, and make sure a string of under-documented non-arrests is caught as a pattern and corrected. In domestic violence, the report you wave through is sometimes the warning no one acted on.</p>
  </div>
  <div class="content-block">
    <h4>The High-Risk Approach Is Yours to Enforce</h4>
    <p>GO 4.13.2 treats every active domestic as high risk: no sirens or emergency lights in the vicinity of the scene, flanking approach rather than parking out front, an external assessment before any committed approach, and — on a hostage or barricade indication — containment and a supervisor, not entry. As the supervisor you own the tactical posture as much as the legal one. Make sure your units approach the way the directive requires and are backed and braced, because domestic calls injure more officers than almost any other run they will take.</p>
  </div>
`;

function getDomesticViolenceSupervisorQuestions() {
  return [
    {
      scenario: 'A DV report you are reviewing shows the officer observed a fresh injury and had a consistent victim account — probable cause for Simple Assault against a household member — but made no arrest. The narrative reads, in full: "Parties separated for the evening. No arrest made."',
      text: 'What is the correct supervisory action?',
      options: [
        'Approve it — the officer documented that the parties separated, which resolves the incident.',
        'Approve it, but add a note reminding the officer to write more next time.',
        'Approve it, because arrest is discretionary when the parties separate voluntarily.',
        'Reject it: GO 4.13.11(A)(3)(b) requires a detailed explanation when probable cause existed but no arrest was made — and where observed injury plus PC for a 4.13.5 offense were present, the deeper question is why a mandatory arrest was not made at all.'
      ],
    },
    {
      scenario: 'An officer on a DV scene radios you for authorization to arrest. He has observed a fresh injury and has probable cause for Simple Assault, but the victim is objecting to an arrest, and the suspect is still on scene.',
      text: 'How do you respond?',
      options: [
        'Tell the officer to hold off until you arrive to personally authorize the arrest.',
        'Tell the officer to defer to the victim\'s wishes, since she is the protected party.',
        'Advise that no authorization is needed: under GO 4.13.5 the arrest is mandatory once probable cause exists, victim consent is not an element, and the officer should act now and brief you after — waiting risks the suspect leaving.',
        'Direct the officer to take a report and refer the matter to detectives for a warrant.'
      ],
    },
    {
      scenario: 'A DV report documents that the officer seized the phone the defendant used to strike the victim, but records it as a "consent seizure" — the victim gave permission to take it.',
      text: 'How should you treat this on review?',
      options: [
        'Correct the stated basis: under GO 4.13.6 a weapon used in the commission of the offense shall be seized as evidence regardless of consent. Framing a mandatory evidence seizure as a consent seizure creates a vulnerability, because consent can be refused and the stated basis matters in court.',
        'Approve it — consent was obtained, so the seizure is properly documented.',
        'Reject the seizure entirely, because the victim should not be asked about the defendant\'s property.',
        'Require a warrant before the phone can be held as evidence.'
      ],
    },
    {
      scenario: 'You are reviewing a completed DV incident report. It documents the arrest, the injuries, and the weapon seizure, but there is no signed victim-rights receipt attached.',
      text: 'Is the report complete?',
      options: [
        'Yes — the arrest and evidence are documented, which is what matters.',
        'Yes — victim notification is only required if the victim asks about her options.',
        'No — but only the hotline number is required, not a signed receipt.',
        'No — GO 4.13.7 requires oral and written notice of shelter, services, the hotline, and PFA rights, with the victim\'s signed receipt attached to the report. Missing the signed receipt makes the report incomplete; return it.'
      ],
    },
    {
      scenario: 'A DV report notes, in a single passing line, that the victim disclosed the defendant — who is subject to a final PFA order — had shown up at her workplace the prior week, which she never reported. The officer took no action on that disclosure.',
      text: 'What does your review require?',
      options: [
        'Nothing — the workplace incident is in the past and was not witnessed by an officer.',
        'The disclosed final-PFA violation must be acted on: GO 4.13.9 makes arrest mandatory for a Chapter 61 final-order violation whether or not it occurred in an officer\'s presence, with an Indirect Criminal Contempt charge and protected-party notification documented as a Supplemental Incident Report.',
        'Refer the victim to civil court to handle the PFA violation herself.',
        'Note it for intelligence only; a past violation cannot be charged.'
      ],
    },
    {
      scenario: 'A victim from an active DV case calls the station wanting to "drop the charges." The handling officer proposes inviting her in for an informal sit-down to discuss the charges and the seized phone.',
      text: 'What is the correct supervisory guidance?',
      options: [
        'Redirect it: once a mandatory arrest is made the charging decision belongs to the Commonwealth, not the victim. Informal contact about dropping charges threatens case integrity; explain the framework professionally and document all post-arrest victim contact.',
        'Approve the informal meeting — accommodating the victim builds trust.',
        'Tell the officer to grant the request and release the phone, since the victim no longer wants to proceed.',
        'Have the officer avoid all contact with the victim until the case is closed.'
      ],
    },
    {
      scenario: 'Reviewing reports across your squad, you notice the same residential address has generated several domestic calls over the past year, several ending in under-documented non-arrests, with escalating injuries described each time.',
      text: 'What is your supervisory responsibility?',
      options: [
        'None — each call stands on its own, and prior calls are not relevant to new ones.',
        'Bar officers from responding to that address to avoid liability.',
        'Treat the pattern as a high-priority signal: track the repeat location, flag the escalation, correct the non-arrest documentation going forward, and ensure the history informs the response — DV patterns across reports precede the worst outcomes and only the supervisor sees them.',
        'Wait until a serious injury occurs before treating the address differently.'
      ],
    },
    {
      scenario: 'Your units are dispatched to an active domestic disturbance. You are coordinating the response.',
      text: 'Under GO 4.13.2, what approach should you ensure your officers use?',
      options: [
        'A full lights-and-sirens code-3 response to establish presence quickly.',
        'No sirens or emergency lights in the vicinity of the scene, a flanking approach rather than parking directly in front, and an external assessment before any committed approach — with containment and a supervisor, not entry, on any hostage or barricade indication.',
        'A single officer making rapid entry to separate the parties before backup arrives.',
        'Staging a block away indefinitely until the parties exit on their own.'
      ],
    },
  ];
}

/* ══════════════════════════════════════════
   SUPERVISOR SCENARIO — Domestic Violence (EGPD)
   GO 4.13 review of Officer Briggs's Cherry St domestic.
══════════════════════════════════════════ */
const SCENARIO_DOMESTIC_VIOLENCE_SUP = {
  id: 'scenario-dv-sup',
  title: 'Supervisor Review — Cherry St Domestic',
  location: 'Report Review Desk, East Greenville Borough, PA',
  totalDecisions: 3,
  nodes: {
    'start': {
      type: 'scene', time: '23:55', weather: 'Report Review', unit: 'Reviewing Supervisor',
      narrative: [
        'Officer Briggs\'s report from a domestic on Cherry St is in your review queue. A 911 hang-up; the woman who answered the door had a fresh bruise forming under her eye; the husband fled out the back before officers arrived.',
        'General Order 4.13 takes the hardest DV decisions out of the moment and puts them in policy. Your review is where those mandatory provisions hold — or quietly erode.'
      ],
      next: 'd1'
    },
    'd1': {
      type: 'decision', decisionNumber: 1,
      situation: 'Briggs observed the fresh injury and had a consistent victim account — probable cause for Simple Assault against a household member. But no arrest was made, and the narrative reads, in full: "Parties separated for the evening. No arrest made."',
      question: 'How do you handle the report?',
      options: [
        { text: 'Approve it — the parties separated, so the situation resolved itself.', next: 'c1a', quality: 'bad', shortLabel: 'Approved the non-arrest as written' },
        { text: 'Reject it — GO 4.13.11(A)(3)(b) requires a detailed explanation when PC existed, and where observed injury plus PC for a 4.13.5 offense were present, the deeper failure is that no mandatory arrest was made at all.', next: 'c1b', quality: 'good', shortLabel: 'Flagged the missing mandatory arrest' },
        { text: 'Approve it but add a note reminding Briggs to write more next time.', next: 'c1c', quality: 'risky', shortLabel: 'Approved with a reminder to write more' },
        { text: 'Approve it — arrest is discretionary when the parties separate voluntarily.', next: 'c1d', quality: 'bad', shortLabel: 'Treated the arrest as discretionary' },
      ]
    },
    'c1a': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'A Mandatory Arrest Was Missed',
      heading: 'GO 4.13.5 doesn\'t let the parties separating substitute for an arrest.',
      narrative: [
        'When an officer observes recent physical injury and has probable cause for Simple Assault against a household member, GO 4.13.5 requires a warrantless arrest, as in a felony. Approving "parties separated, no arrest" signs off on a policy violation — and this is exactly the eight-months-ago history that haunts the next call to the same address.',
        'Domestic violence is investigated and managed "as any other crime, regardless of the relationship." Your signature is supposed to enforce that.'
      ],
      legal: 'GO 4.13.5(A): officers shall arrest without a warrant when recent physical injury is observed and PC exists for the listed offenses, including Simple Assault (18 Pa.C.S. § 2701).',
      next: 'd2'
    },
    'c1b': {
      type: 'consequence', outcomeClass: 'outcome-good', outcomeLabel: 'Caught the Real Failure',
      heading: 'You read the non-arrest first — and saw it for what it was.',
      narrative: [
        'You reject the report. GO 4.13.11(A)(3)(b) requires a detailed explanation when PC existed and no arrest was made, and "parties separated, no arrest" does not satisfy it. But the deeper issue is not the thin writing — it is that observed injury plus PC for a 4.13.5 offense made the arrest mandatory, and one was not made.',
        'The non-arrest is the most consequential thing you review in a DV report. You treated it that way.'
      ],
      legal: 'GO 4.13.5 (mandatory arrest on PC) and GO 4.13.11(A)(3)(b) (detailed non-arrest explanation required). Where injury and PC were present, the failure is the non-arrest itself.',
      next: 'd2'
    },
    'c1c': {
      type: 'consequence', outcomeClass: 'outcome-neutral', outcomeLabel: 'You Fixed the Symptom',
      heading: 'A reminder to write more misses that the arrest itself was required.',
      narrative: [
        'Telling Briggs to write more next time treats this as a documentation gap. It is more than that: with observed injury and PC for Simple Assault, GO 4.13.5 made the arrest mandatory. Better writing about a non-arrest does not cure a non-arrest that should not have happened.',
        'Address the actual failure — the missing mandatory arrest — not just the thin narrative.'
      ],
      legal: 'GO 4.13.5: the arrest was mandatory on PC. The documentation standard in 4.13.11(A)(3)(b) is secondary to the arrest obligation here.',
      next: 'd2'
    },
    'c1d': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Not Discretionary',
      heading: 'GO 4.13.5 makes the arrest mandatory — separation doesn\'t change that.',
      narrative: [
        'Treating the arrest as discretionary because the parties separated misreads the policy. GO 4.13.5 requires the arrest on probable cause; victim consent is not an element, and neither is whether the parties have separated for the night.',
        'Approving this on a discretion theory institutionalizes exactly the under-enforcement the directive was written to end.'
      ],
      legal: 'GO 4.13.5(A): mandatory warrantless arrest on PC; not discretionary, and not contingent on the parties\' separation.',
      next: 'd2'
    },
    'd2': {
      type: 'decision', decisionNumber: 2,
      situation: 'The husband was later located and arrested. Two more things in the file: Briggs documented that the husband struck the victim with his cell phone but left the phone at the scene "since he\'s in custody and it\'s his property," and there is no signed victim-rights receipt attached.',
      question: 'What does your review require?',
      options: [
        { text: 'Approve it — the phone is the arrestee\'s property and the notification can happen later.', next: 'c2a', quality: 'bad', shortLabel: 'Approved despite the two gaps' },
        { text: 'Flag both — GO 4.13.6 makes a weapon used in the offense a mandatory evidence seizure regardless of ownership, and GO 4.13.7 requires the victim\'s signed rights receipt attached to the report.', next: 'c2b', quality: 'good', shortLabel: 'Flagged the seizure and the missing receipt' },
        { text: 'Approve the phone decision — it belongs to the husband — but ask for the receipt.', next: 'c2c', quality: 'bad', shortLabel: 'Accepted leaving the weapon behind' },
        { text: 'Require a warrant before the phone can be seized as evidence.', next: 'c2d', quality: 'bad', shortLabel: 'Demanded a warrant for the weapon' },
      ]
    },
    'c2a': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Evidence Left Behind',
      heading: 'A weapon used in the offense isn\'t the arrestee\'s personal property to leave.',
      narrative: [
        'The phone was the instrument of the assault, which makes it evidence of the crime — GO 4.13.6 requires the arresting officer to seize all weapons used in the commission of an alleged offense, regardless of who owns it. Approving the report with the weapon left at the scene loses evidence supporting the charge, and the missing signed victim-rights receipt leaves the report incomplete under 4.13.7.',
        'Both are mandatory mechanics. Your review is where they get verified.'
      ],
      legal: 'GO 4.13.6 (seize weapons used in the offense; chain of custody) and GO 4.13.7 (oral and written victim notice with a signed receipt attached).',
      next: 'd3'
    },
    'c2b': {
      type: 'consequence', outcomeClass: 'outcome-good', outcomeLabel: 'Caught Both Mandatory Steps',
      heading: 'You verified the seizure and the victim-rights receipt — the mechanics that don\'t bend.',
      narrative: [
        'You flag that the phone, used to strike the victim, is evidence that GO 4.13.6 requires be seized and processed with chain of custody regardless of ownership, and that the report is incomplete without the signed victim-rights receipt GO 4.13.7 requires. Both go back before the report is filed.',
        'These are the mandatory mechanics a reviewer checks on every DV report — and "it\'s his phone" does not override an evidence seizure.'
      ],
      legal: 'GO 4.13.6: weapon used in the offense seized and processed. GO 4.13.7: oral/written notice and signed receipt attached to the incident report.',
      next: 'd3'
    },
    'c2c': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Half Right',
      heading: 'Getting the receipt is correct; accepting the abandoned weapon is not.',
      narrative: [
        'You were right to require the victim-rights receipt, but accepting that the phone could be left because it belongs to the husband misses that it is evidence first and property second. GO 4.13.6 makes seizing a weapon used in the offense mandatory regardless of ownership.',
        'Require both: the seizure and the receipt.'
      ],
      legal: 'GO 4.13.6: a weapon used in the commission of the offense is seized as evidence regardless of ownership.',
      next: 'd3'
    },
    'c2d': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'No Warrant Needed',
      heading: 'GO 4.13.6 is independent seizure authority — a warrant isn\'t the issue.',
      narrative: [
        'Demanding a warrant for the phone misreads the basis. GO 4.13.6 provides independent authority to seize a weapon used in the commission of an alleged offense — the seizure is mandatory and does not depend on a warrant or on consent. The error in the report is that the weapon was left behind, not that it lacked a warrant.',
        'Direct the seizure under 4.13.6, processed with chain of custody.'
      ],
      legal: 'GO 4.13.6: mandatory seizure of a weapon used in the offense; independent of warrant or consent.',
      next: 'd3'
    },
    'd3': {
      type: 'decision', decisionNumber: 3,
      situation: 'Two hours later the victim calls the station wanting to drop the charges. While on the line, she mentions the husband — who is subject to a final PFA order from a prior relationship — showed up at her workplace last week, which she never reported. Briggs asks how to handle it.',
      question: 'What do you direct?',
      options: [
        { text: 'Tell Briggs to invite her in for an informal sit-down to talk through dropping the charges.', next: 'c3a', quality: 'bad', shortLabel: 'Invited an informal drop-the-charges meeting' },
        { text: 'Explain the charging decision belongs to the Commonwealth once a mandatory arrest is made, and act on the disclosed final-PFA violation — mandatory arrest under 4.13.9, an Indirect Criminal Contempt charge, and a Supplemental Incident Report.', next: 'c3b', quality: 'good', shortLabel: 'Protected the case and acted on the PFA violation' },
        { text: 'Have Briggs transfer the call to another unit without briefing anyone on the background.', next: 'c3c', quality: 'risky', shortLabel: 'Cold-transferred the call' },
      ]
    },
    'c3a': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Case-Integrity Risk',
      heading: 'An informal drop-the-charges meeting threatens the case — and buries a reportable PFA violation.',
      narrative: [
        'Recantation is a well-documented DV response, but under GO 4.13 the charging decision belongs to the Commonwealth once a mandatory arrest is made, not the victim. An informal sit-down to discuss dropping charges is a case-integrity problem — and by steering toward it, you never act on the final-PFA violation she just disclosed, which is itself a mandatory-arrest matter under 4.13.9.',
        'Two failures in one move: the case and the PFA violation both slip.'
      ],
      legal: 'GO 4.13.5 / 4.13.9: charging is the Commonwealth\'s after a mandatory arrest; a disclosed final-PFA violation must be acted on regardless of when it occurred.',
      next: 'debrief'
    },
    'c3b': {
      type: 'consequence', outcomeClass: 'outcome-good', outcomeLabel: 'Protected the Case, Acted on the Violation',
      heading: 'You explained the framework and treated the disclosure as the mandatory-arrest matter it is.',
      narrative: [
        'You have Briggs explain, professionally and without judgment, that the arrest proceeded under mandatory authority and the charging decision is the Commonwealth\'s. And you treat the workplace appearance as a disclosed final-PFA violation: GO 4.13.9 makes arrest mandatory whether or not it occurred in an officer\'s presence, with an Indirect Criminal Contempt charge and the contact documented as a Supplemental Incident Report.',
        'A disclosed violation that gets only "noted" has not been handled. You handled it.'
      ],
      legal: 'GO 4.13.9 (mandatory arrest for a final-PFA violation, ICC charge) and 4.13.10 (protected-party notification documented as a Supplemental Incident Report).',
      next: 'debrief'
    },
    'c3c': {
      type: 'consequence', outcomeClass: 'outcome-neutral', outcomeLabel: 'The Disclosure Could Be Lost',
      heading: 'A cold transfer risks the PFA violation getting dropped in the handoff.',
      narrative: [
        'Transferring without a brief leaves the receiving officer blind to who the victim is, what was seized, and — critically — that she just disclosed a final-PFA violation that triggers a mandatory arrest under 4.13.9. A thirty-second brief before any transfer is part of a professional handoff.',
        'However it is routed, the disclosed violation has to be documented and acted on, not lost.'
      ],
      legal: 'GO 4.13.9 / 4.13.10: obligations attach the moment a violation is disclosed; a transfer must carry the facts so the receiving officer can act and document.',
      next: 'debrief'
    },
    'debrief': { type: 'debrief' }
  }
};
