/* ═══════════════════════════════════════════
   MTPD — Module 5: Domestic Violence Response

   Reading extracted byte-for-byte from the former app.js hardcoded
   branch. Supervisor variants anchored to MTPD ALO 4.13 and the law in
   the reading (23 Pa. C.S. § 6102; Lautenberg 18 U.S.C. § 922(g)(9)).
   Never borrow EGPD policy, framing, or roads.
═══════════════════════════════════════════ */

const READING_DOMESTIC_VIOLENCE = `
      <div class="content-block">
        <h4>Scenario</h4>
        <h2>A 911 hang-up from a residence on Upper Ridge Road. A neighbor heard shouting and breaking glass. When you arrive, the door opens before you knock — and the story becomes anything but simple.</h2>
        <p>This module covers mandatory arrest authority under MTPD ALO 4.13, PFA enforcement, victim notification requirements, mandatory firearms seizure, and the documentation standard that makes or breaks a DV prosecution.</p>
      </div>
      <div class="content-block">
        <h4>Core Principle</h4>
        <h2>Victim Preference Does Not Control Your Arrest Decision</h2>
        <p>Domestic violence calls are among the highest-risk, most legally complex incidents you handle. The victim is frequently in a protective relationship with the offender. Pressure to de-arrest, minimize, or "let the couple work it out" is common. Pennsylvania law and MTPD policy exist precisely to remove that pressure from the officer and place the decision where it belongs: on the evidence.</p>
        <p>If you have probable cause — based on your own observations, victim statement, or witness statement — arrest of the primary aggressor is mandatory. You do not need the victim\'s consent. You do not need supervisor pre-authorization. You need probable cause.</p>
        <div class="case-law-box">
          <div class="case-title">Pennsylvania Domestic Violence Law — 23 Pa. C.S. § 6102</div>
          <p>Pennsylvania\'s Protection From Abuse Act defines domestic violence and establishes civil and criminal remedies. A Protection From Abuse (PFA) order is an enforceable court order — violation is a criminal offense, not merely a civil matter. When you encounter a subject who has violated an active PFA order by being present at a protected person\'s location or making contact, that violation is an independently chargeable offense.</p>
        </div>
        <div class="case-law-box">
          <div class="case-title">Lautenberg Amendment — 18 U.S.C. § 922(g)(9)</div>
          <p>A federal firearm disability is imposed on any person convicted of a qualifying domestic violence misdemeanor or subject to a qualifying protective order. When a DV arrest subject is prohibited from firearm possession under a court order, officers are not only authorized but required under ALO 4.13 to seize any firearms present. This is both a state policy obligation and a federal law enforcement responsibility.</p>
        </div>
      </div>
      <div class="content-block">
        <h4>MTPD ALO 4.13 — Mandatory Arrest Authority</h4>
        <h2>When probable cause exists, the decision is made for you.</h2>
        <p>MTPD Order 4.13 establishes mandatory arrest protocols for domestic violence incidents. Officers shall arrest the primary aggressor when probable cause exists based on their observations or statements of witnesses or the victim. The policy covers incidents of Simple Assault, Harassment, and other qualifying offenses between household members or intimate partners.</p>
        <div class="sop-box">
          <div class="sop-title">MTPD ALO 4.13 — Approach Protocol</div>
          <p>Officers responding to domestic disturbance calls shall approach the scene <strong>without lights or sirens within one block of the reported location.</strong> DV calls present unique officer safety risks. Arrival without warning allows for tactical assessment before contact and does not alert subjects who may escalate or flee. This is a required protocol, not a suggestion.</p>
        </div>
        <div class="sop-box">
          <div class="sop-title">MTPD ALO 4.13 — Mandatory Arrest Standard</div>
          <p>In every domestic violence incident where officers have probable cause to believe Simple Assault or a related qualifying offense has been committed between household members or intimate partners, <strong>officers shall arrest the primary aggressor.</strong> Victim consent is not a required element. If probable cause exists but an officer elects not to arrest, the report narrative must contain a <strong>detailed explanation of the specific reasons</strong> — "No arrest made" is not documentation.</p>
        </div>
        <div class="sop-box">
          <div class="sop-title">MTPD ALO 4.13 — Mandatory Firearms Seizure</div>
          <p>When a person is arrested for a domestic violence offense and is subject to a court order prohibiting firearm possession (PFA or similar), <strong>officers shall seize any firearms present</strong> at the scene. Each seized firearm must be documented on a Property Record Form per ALO 3.05/3.06 before end of shift, with make, model, serial number, and chain of custody documented from the moment of seizure.</p>
        </div>
        <div class="sop-box">
          <div class="sop-title">MTPD ALO 4.13 — Victim Notification Requirements</div>
          <p>Following a DV arrest, officers shall provide the victim with the department\'s domestic violence resource card. Officers shall advise the victim of: the arraignment timeline, any bail conditions that are set, the existence and availability of shelter services, and their right to pursue a civil Protection From Abuse order. Completion of victim notifications shall be documented in the incident report narrative.</p>
        </div>
      </div>
      <div class="content-block">
        <h4>The 12-Item DV Narrative Checklist</h4>
        <h2>Every DV incident report narrative shall address each applicable item.</h2>
        <ul class="key-points">
          <li><strong>Victim\'s second permanent address</strong> and a close personal friend\'s contact information.</li>
          <li><strong>Relationship</strong> between victim and accused.</li>
          <li><strong>Date and time of the incident</strong> and whether the accused appeared intoxicated.</li>
          <li><strong>Weapons</strong> used or threatened.</li>
          <li><strong>Injuries observed by the officer</strong> — specific and descriptive.</li>
          <li><strong>Injuries reported by the victim but not observed</strong> — note clearly as "not observed."</li>
          <li><strong>Evidence establishing a crime was committed</strong> — what you observed that supports probable cause.</li>
          <li><strong>Whether arrest was made</strong> — or detailed explanation of why not.</li>
          <li><strong>Crimes charged.</strong></li>
          <li><strong>Bail set and conditions</strong> if the subject was arraigned.</li>
          <li><strong>Names and ages of any children present</strong> and their relocation address.</li>
          <li><strong>Previous incidents</strong> known to the officer or reported by the victim.</li>
        </ul>
      </div>
      <div class="content-block">
        <h4>PFA Enforcement</h4>
        <h2>A PFA order is a court order. Violation is a crime.</h2>
        <p>When you respond to a DV call and learn that a final or temporary PFA order is in effect, verify it through JNET/CLEAN. Presence of the subject at a protected location — or any contact with the protected party — is a criminal violation of the court order, independently chargeable regardless of whether any new physical violence occurred.</p>
        <p>Do not accept a subject\'s claim that "she invited me here" as a defense to a PFA violation. Under Pennsylvania law, the protected party cannot waive the order\'s protections on the subject\'s behalf. If the protected party invited contact in violation of the PFA, that may be relevant to prosecution — but it does not eliminate the officer\'s authority or obligation to address the violation.</p>
        <div class="sop-box">
          <div class="sop-title">MTPD ALO 4.13 — Never Release Instead of Transport</div>
          <p>When a person is arrested and must be taken to a district judge for arraignment, officers shall <strong>never release the defendant instead of taking them to the issuing authority.</strong> This prohibition applies regardless of circumstances — officer workload, victim request, or subject cooperation. An arrested DV subject goes to arraignment. Period.</p>
        </div>
        <button class="btn-launch" onclick="startScenario('domestic-violence')">Proceed to Scenario Exercise →</button>
      </div>
    `;

/* ══════════════════════════════════════════
   SUPERVISOR OVERLAY — Domestic Violence (MTPD)
══════════════════════════════════════════ */
const SUPERVISOR_DOMESTIC_VIOLENCE = `
  <div class="content-block">
    <h4>Supervisor Focus</h4>
    <h2>DV is where pressure to do the easy thing is highest and the cost of getting it wrong is greatest. Your review is the backstop that keeps the decision on the evidence.</h2>
    <p>Officers feel the pull to de-arrest, to "let them work it out," to skip the firearms seizure because the subject is already in custody. ALO 4.13 was written to take that pressure off the officer — and your review is where it gets enforced. When a DV packet reaches you, confirm the mandatory-arrest decision was driven by probable cause, the firearms obligation was met, the victim was notified, and the 12-item narrative is complete. These are the entries that protect the victim and survive in court.</p>
  </div>
  <div class="content-block">
    <h4>The Mandatory-Arrest Backstop</h4>
    <h2>Victim preference does not control the arrest decision — and it does not control your review of it.</h2>
    <p>Under ALO 4.13, when probable cause exists — from the officer's observations, the victim's statement, or a witness statement — arrest of the primary aggressor is mandatory. Victim consent is not an element, and supervisor pre-authorization is not required. On review, if you see a report where PC plainly existed and no arrest was made because "the victim didn't want to press charges," that is a policy failure to correct, not a judgment call to ratify. And where the officer had PC but elected not to arrest, ALO 4.13 requires a detailed explanation of the specific reasons — "No arrest made" does not survive your desk.</p>
    <p>Where both parties show injuries, confirm the report documents a real primary-aggressor analysis — comparative injury severity, history, defensive-injury patterns, self-defense — rather than a dual arrest built on the fact that both were hurt. Dual arrests are disfavored and scrutinized.</p>
  </div>
  <div class="content-block">
    <h4>The Firearms Seizure You Must Verify</h4>
    <p>When a person is arrested for a DV offense and is subject to a court order prohibiting firearm possession, ALO 4.13 makes seizure of any firearms present mandatory — and the Lautenberg Amendment makes the federal firearm disability real. "The subject is already in custody, the guns are secure in the house" is not a basis to skip it. On review, confirm any firearms present were seized and that each is documented on a Property Record Form per ALO 3.05/3.06 before end of shift, with make, model, serial number, and chain of custody from the moment of seizure. A DV arrest with a known PFA and firearms left in the residence is the catch.</p>
  </div>
  <div class="content-block">
    <h4>Notification, the Checklist, and Transport</h4>
    <ul class="key-points">
      <li><strong>Victim notification</strong> — Confirm the report documents that the victim received the resource card and was advised of the arraignment timeline, any bail conditions, shelter availability, and the right to pursue a PFA. Completion is documented in the narrative.</li>
      <li><strong>The 12-item checklist</strong> — Run it: relationship, weapons, injuries observed, injuries reported but not observed, children present and their relocation, prior incidents, and the rest, as applicable.</li>
      <li><strong>Never release instead of transport</strong> — An arrested DV subject goes to the issuing authority for arraignment. Officer workload, victim request, or subject cooperation never converts an arrest into a release. If a report shows a DV arrestee released in lieu of arraignment, that is a serious violation to address, not approve.</li>
      <li><strong>PFA violations are criminal</strong> — A subject present at a protected location or in contact with the protected party is independently chargeable, and "she invited me" is not a defense the protected party can give on the subject's behalf. Confirm the officer addressed the violation rather than treating it as civil.</li>
    </ul>
  </div>
  <div class="content-block">
    <h4>From Catch to Correction</h4>
    <p>A DV report you approve is a representation that the arrest decision, the firearms seizure, the notifications, and the documentation all met ALO 4.13. One gap is a coaching moment; a pattern — skipped seizures, "no arrest made" without explanation, incomplete checklists — is a training and supervisory issue you document and escalate. In DV, the record you enforce is often what stands between a victim and the next, worse call.</p>
  </div>
`;

function getDomesticViolenceSupervisorQuestions() {
  return [
    {
      scenario: 'You review a DV report. The officer documented a fresh bruise consistent with the victim\'s account that her husband struck her, establishing probable cause for Simple Assault. The narrative states no arrest was made "because the victim did not wish to press charges and asked us to have him leave for the night."',
      text: 'What is the correct supervisory action under MTPD ALO 4.13?',
      options: [
        'Approve it — the victim is the protected party and her preference controls the arrest decision.',
        'Approve it but require the officer to call the victim back to obtain her permission to arrest.',
        'Correct it — under ALO 4.13, when probable cause exists, arrest of the primary aggressor is mandatory and victim consent is not a required element; a documented injury plus a consistent account is probable cause, so the non-arrest is a policy failure to address.',
        'Refer the matter to detectives for a possible follow-up arrest some weeks later on.'
      ],
      correct: 2,
      feedback: 'Correct. MTPD ALO 4.13 makes arrest of the primary aggressor mandatory when probable cause exists, and victim consent is not a required element. A visible injury plus a consistent victim account establishes probable cause. Declining arrest because the victim did not want to press charges is a policy failure to correct.'
    },
    {
      scenario: 'An officer arrested a subject for Simple Assault against his wife. The report notes a final PFA order prohibiting the subject from possessing firearms and that the wife told the officer there are two rifles and a handgun in the bedroom closet. The narrative says the firearms were "left secured in the residence since the subject was already in custody."',
      text: 'What should your review require under MTPD ALO 4.13?',
      options: [
        'Require the firearms to be seized — a DV arrest combined with a court order prohibiting possession triggers mandatory seizure under ALO 4.13, with each firearm documented on a Property Record Form before end of shift; leaving them in the residence is the defect.',
        'Nothing needs to change — the subject is in custody and no longer has access, so the firearms can stay.',
        'Advise the wife to secure all three of the firearms herself and simply note that advisory in the report.',
        'Require the officer to obtain a separate search warrant before any of the firearms can be seized.'
      ],
      correct: 0,
      feedback: 'Correct. MTPD ALO 4.13 makes firearms seizure mandatory when a person is arrested for a DV offense and is subject to a court order prohibiting possession. Both conditions are present. "Already in custody" does not excuse the seizure, and each firearm must be documented on a Property Record Form per ALO 3.05/3.06.'
    },
    {
      scenario: 'A DV report shows both parties with visible injuries, each claiming the other started it. The officer arrested both, with the narrative stating only "both parties had injuries, dual arrest made."',
      text: 'How do you handle this on review?',
      options: [
        'Approve it — dual injuries on both parties categorically require that a dual arrest be made.',
        'Release both of the parties, on the basis that their accounts of the incident directly conflict.',
        'Approve it, but direct the officer to arrest only the party who actually called 911 that night.',
        'Return it — ALO 4.13 and PA DV law require identification of the primary aggressor through documented analysis (comparative injury severity, history, defensive-injury patterns, self-defense); dual arrests are disfavored and the report must show that reasoning.'
      ],
      correct: 3,
      feedback: 'Correct. ALO 4.13 requires identification of the primary aggressor when both claim victimhood. Dual arrests are disfavored and should be rare. The report must document the analysis — comparative injury severity, history, evidence of defensive injuries, and self-defense — not simply note that both were injured.'
    },
    {
      scenario: 'A DV arrest report is otherwise solid, but the narrative contains nothing about what the victim was told after the arrest — no mention of the resource card, arraignment timeline, bail conditions, shelter services, or her right to pursue a PFA.',
      text: 'What does ALO 4.13 require before you approve it?',
      options: [
        'Approve it — victim notification of this kind is a courtesy to the victim, not a documented requirement.',
        'Return it — ALO 4.13 requires officers to provide the resource card and advise the victim of the arraignment timeline, any bail conditions, shelter availability, and the right to pursue a PFA, with completion documented in the narrative.',
        'Approve it for now and simply have dispatch call the victim back later with all of the information.',
        'Approve it on the basis that the arrest itself is really what matters most in a case like this.'
      ],
      correct: 1,
      feedback: 'Correct. MTPD ALO 4.13 requires victim notification following a DV arrest — the resource card and advisement on arraignment timeline, bail conditions, shelter services, and the right to a PFA — with completion documented in the narrative. A report missing that record is incomplete.'
    },
    {
      scenario: 'A report shows a subject was arrested for a DV offense, but instead of transporting him to the district judge for arraignment, the officer released him at the scene "at the victim\'s request and to save time, since he was cooperative."',
      text: 'How do you handle this under MTPD ALO 4.13?',
      options: [
        'Approve it — releasing a cooperative subject at the victim\'s own request is reasonable officer discretion.',
        'Approve it, as long as the officer clearly documents the victim\'s request to release him in the report.',
        'Treat it as a serious violation — ALO 4.13 prohibits releasing an arrested defendant instead of taking them to the issuing authority, regardless of officer workload, victim request, or subject cooperation; an arrested DV subject goes to arraignment.',
        'Approve it for now, but require the officer to make a follow-up arrest of the subject the next day.'
      ],
      correct: 2,
      feedback: 'Correct. MTPD ALO 4.13 states officers shall never release the defendant instead of taking them to the issuing authority — the prohibition applies regardless of workload, victim request, or cooperation. Releasing an arrested DV subject in lieu of arraignment is a serious violation to address.'
    },
    {
      scenario: 'On a DV call, the officer learned a final PFA was in effect and the subject was present at the protected party\'s home. The subject said "she invited me over." The report treats the PFA as "a civil matter between them" and takes no enforcement action on the order.',
      text: 'What is the supervisory review point?',
      options: [
        'The report is correct — a PFA is a civil matter and the victim\'s invitation cures any violation of it.',
        'No enforcement action is needed here at all unless some new act of physical violence actually occurred.',
        'The officer should instead have arrested the protected party herself for inviting the subject over.',
        'A PFA violation is a criminal offense, independently chargeable; the protected party cannot waive the order\'s protections on the subject\'s behalf, so "she invited me" is not a defense, and the officer should have addressed the violation rather than treating it as civil.'
      ],
      correct: 3,
      feedback: 'Correct. Under Pennsylvania\'s PFA framework a violation is a criminal offense, independently chargeable regardless of new violence, and the protected party cannot waive the order on the subject\'s behalf. "She invited me" is not a defense, and treating the violation as civil is the review point to correct.'
    },
    {
      scenario: 'A DV incident report addresses the assault and arrest well but leaves the checklist items on children present and prior incidents blank, even though the officer\'s own narrative mentions a child was home and references "another call here last month."',
      text: 'What do you require under the ALO 4.13 narrative checklist?',
      options: [
        'Approve it — the arrest itself is documented in the report, which is ultimately what matters here.',
        'Return it to complete the applicable checklist items — including names and ages of children present and their relocation, and prior incidents known or reported — because ALO 4.13 requires the narrative to address each applicable item.',
        'Approve it and then add the missing checklist items yourself, from your own memory of the area.',
        'Approve it as submitted, but note the checklist gaps for discussion at the officer\'s annual review.'
      ],
      correct: 1,
      feedback: 'Correct. The ALO 4.13 narrative checklist requires the report to address each applicable item, including children present (with names, ages, and relocation) and previous incidents. The officer\'s own narrative flags both, so the report must be returned to complete them.'
    },
    {
      scenario: 'Reviewing recent DV calls, you find one officer has twice declined arrest where probable cause existed citing victim reluctance, and once left firearms in a residence after a DV arrest with an active PFA. You coached the officer on the mandatory-arrest standard after the first incident.',
      text: 'What is the appropriate supervisory response now?',
      options: [
        'Move to documented corrective action and targeted training on the ALO 4.13 mandatory-arrest and firearms-seizure requirements, because a repeated pattern after coaching is a supervisory and training issue with real victim-safety stakes; escalate as warranted.',
        'Keep coaching the officer informally — DV calls are emotionally complicated and the officer is clearly trying.',
        'Quietly reassign the officer away from all DV calls, without documenting any of the underlying concerns.',
        'Take no action at this time, since each of the calls involved a different victim and a different set of facts.'
      ],
      correct: 0,
      feedback: 'Correct. One instance is a coaching moment; a documented pattern after coaching — declined mandatory arrests and a skipped firearms seizure — is a supervisory and training issue requiring documented corrective action and escalation, with direct victim-safety stakes under ALO 4.13.'
    },
  ];
}

/* ══════════════════════════════════════════
   SUPERVISOR SCENARIO — Domestic Violence (MTPD)
   You review Officer Doran's Upper Ridge Road DV arrest before filing.
   Fictional officer.
══════════════════════════════════════════ */
const SCENARIO_DOMESTIC_VIOLENCE_SUP = {
  id: 'scenario-domestic-violence-sup',
  title: 'Supervisor Review — Upper Ridge Road DV',
  location: 'Report Review Desk, Marlborough Township, PA',
  totalDecisions: 3,
  nodes: {
    'start': {
      type: 'scene',
      time: '23:55',
      weather: 'Clear, cold',
      unit: 'Shift Supervisor',
      narrative: [
        'Officer Doran\'s report from a domestic on Upper Ridge Road is in your review queue. A 911 hang-up brought him there; he found a victim with a fresh injury and a household with an active PFA in the picture.',
        'Your approval is what files this DV case. The pressure points in DV are exactly the ones ALO 4.13 was written to hold the line on — and your review is that line.'
      ],
      next: 'd1'
    },
    'd1': {
      type: 'decision',
      decisionNumber: 1,
      situation: 'Doran documents a fresh bruise on the victim consistent with her statement that her husband struck her — clear probable cause for Simple Assault. The narrative then states: "Victim did not wish to press charges and asked that he just leave for the night. No arrest made."',
      question: 'How do you handle the arrest decision?',
      options: [
        { text: 'Approve it — the victim is the protected party and her wishes control.', next: 'c1a', quality: 'bad', shortLabel: 'Let victim preference control the arrest' },
        { text: 'Correct it — ALO 4.13 makes arrest of the primary aggressor mandatory where PC exists; victim consent is not an element, so the non-arrest must be addressed and the report cannot stand on "no arrest made."', next: 'c1b', quality: 'good', shortLabel: 'Enforced mandatory arrest' },
        { text: 'Approve it but tell Doran to note the victim\'s request more thoroughly.', next: 'c1c', quality: 'risky', shortLabel: 'Treated it as a documentation tweak' },
        { text: 'Approve it and refer the case to detectives for a possible later arrest.', next: 'c1d', quality: 'bad', shortLabel: 'Punted a mandatory arrest to detectives' },
      ]
    },
    'c1a': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Preference Is Not the Standard',
      heading: 'ALO 4.13 took this decision off the victim\'s shoulders — and off Doran\'s.',
      narrative: [
        'Probable cause was plain: a fresh injury and a consistent account. Approving a non-arrest because the victim did not want to press charges puts the pressure ALO 4.13 was written to remove right back onto the call — and leaves the primary aggressor home tonight.',
        'In DV, the next call to this address can be the worst one. The mandatory-arrest rule exists for exactly this moment.'
      ],
      legal: 'MTPD ALO 4.13: where PC exists, arrest of the primary aggressor is mandatory; victim consent is not a required element.',
      next: 'd2'
    },
    'c1b': {
      type: 'consequence', outcomeClass: 'outcome-good', outcomeLabel: 'Held the Line',
      heading: 'You enforced the mandatory-arrest standard the evidence required.',
      narrative: [
        'You direct that the arrest be made on the documented probable cause and the report corrected accordingly. Victim reluctance is real and the officer should respond to it with resources and notification — but it does not control the arrest decision under ALO 4.13.',
        'This is the backstop a supervisor exists to provide on a DV call.'
      ],
      legal: 'MTPD ALO 4.13: arrest of the primary aggressor is mandatory where PC exists from the officer\'s observations, the victim, or a witness; victim consent is not an element.',
      next: 'd2'
    },
    'c1c': {
      type: 'consequence', outcomeClass: 'outcome-neutral', outcomeLabel: 'Not a Wording Problem',
      heading: 'No amount of documenting the victim\'s request makes the non-arrest correct.',
      narrative: [
        'This is not a report that needs better phrasing about the victim\'s wishes — it is a mandatory arrest that did not happen. Treating it as a documentation tweak ratifies the wrong outcome.',
        'Direct the arrest and correct the report.'
      ],
      legal: 'MTPD ALO 4.13: mandatory arrest where PC exists; the issue is the arrest decision, not the documentation of the victim\'s preference.',
      next: 'd2'
    },
    'c1d': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Not a Detective Referral',
      heading: 'A mandatory arrest tonight is not a follow-up for next week.',
      narrative: [
        'Probable cause existed at the scene and the arrest was mandatory then. Punting it to detectives leaves the primary aggressor in the home and converts a required immediate arrest into an uncertain future one.',
        'Direct the arrest on the existing PC and correct the report.'
      ],
      legal: 'MTPD ALO 4.13: arrest of the primary aggressor is mandatory at the time PC exists.',
      next: 'd2'
    },
    'd2': {
      type: 'decision',
      decisionNumber: 2,
      situation: 'With the arrest now in order, the report notes a final PFA prohibiting the subject from possessing firearms, and the victim told Doran there are two rifles and a handgun in the bedroom closet. The narrative says the firearms were "left secured in the home since the subject was already in custody."',
      question: 'What do you require regarding the firearms?',
      options: [
        { text: 'Nothing — the subject is in custody, so the firearms are no longer a risk.', next: 'c2a', quality: 'bad', shortLabel: 'Left firearms in the residence' },
        { text: 'Require seizure of all firearms present and a Property Record Form for each before end of shift — a DV arrest plus a court order prohibiting possession triggers mandatory seizure under ALO 4.13.', next: 'c2b', quality: 'good', shortLabel: 'Enforced mandatory firearms seizure' },
        { text: 'Advise the victim to lock the firearms away herself and note it in the report.', next: 'c2c', quality: 'bad', shortLabel: 'Shifted the obligation to the victim' },
        { text: 'Require a separate search warrant before any firearm can be seized.', next: 'c2d', quality: 'risky', shortLabel: 'Added an unnecessary warrant step' },
      ]
    },
    'c2a': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'The Guns Stay, the Risk Stays',
      heading: 'Custody tonight does not address the firearms the order prohibits.',
      narrative: [
        'A DV arrestee subject to a PFA prohibiting possession will not be in custody forever, and the firearms left in the home are exactly what ALO 4.13 and the federal disability are meant to remove. "Already in custody" is not a basis to skip a mandatory seizure.',
        'This is the most common — and most dangerous — firearms catch on a DV review.'
      ],
      legal: 'MTPD ALO 4.13: mandatory seizure of firearms when a DV arrestee is subject to a court order prohibiting possession. 18 U.S.C. § 922(g)(9): the federal firearm disability is real.',
      next: 'd3'
    },
    'c2b': {
      type: 'consequence', outcomeClass: 'outcome-good', outcomeLabel: 'Mandatory Seizure Enforced',
      heading: 'You required the firearms seized and documented before end of shift.',
      narrative: [
        'You direct seizure of the rifles and handgun, with a Property Record Form for each — make, model, serial number, and chain of custody from the moment of seizure. The DV arrest plus the PFA prohibiting possession made it mandatory, not optional.',
        'The order exists precisely so the firearms are not waiting in the closet when the subject is released.'
      ],
      legal: 'MTPD ALO 4.13: mandatory firearms seizure; each firearm documented on a Property Record Form per ALO 3.05/3.06 before end of shift. 18 U.S.C. § 922(g)(9).',
      next: 'd3'
    },
    'c2c': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Not the Victim\'s Job',
      heading: 'Telling the victim to secure the firearms offloads a mandatory police obligation.',
      narrative: [
        'ALO 4.13 puts the seizure obligation on the officers, not the victim. Leaving the firearms with the victim to manage is both a policy failure and a safety problem.',
        'Direct seizure and documentation.'
      ],
      legal: 'MTPD ALO 4.13: officers shall seize any firearms present when the DV arrestee is subject to an order prohibiting possession.',
      next: 'd3'
    },
    'c2d': {
      type: 'consequence', outcomeClass: 'outcome-neutral', outcomeLabel: 'Right Instinct, Wrong Step',
      heading: 'The mandatory seizure under ALO 4.13 should not be stalled behind an unnecessary warrant.',
      narrative: [
        'Adding a warrant requirement before any seizure delays a mandatory action the order already requires given the DV arrest and the PFA prohibiting possession. Direct the seizure and document it; if a specific legal question about a particular item arises, address that on its own.',
        'The default here is seizure now, documented.'
      ],
      legal: 'MTPD ALO 4.13: mandatory firearms seizure on a DV arrest with a court order prohibiting possession.',
      next: 'd3'
    },
    'd3': {
      type: 'decision',
      decisionNumber: 3,
      situation: 'The rest of the report is thin: the victim-notification section is blank, and the checklist items on children present and prior incidents are empty even though the narrative mentions a child was home and "we were here a few weeks ago." Doran also asks whether, since the subject is calm and the victim asked, he can release him at the scene instead of transporting him for arraignment.',
      question: 'How do you handle notification, the checklist, and the transport question?',
      options: [
        { text: 'Let Doran release the subject at the scene and approve the report as written.', next: 'c3a', quality: 'bad', shortLabel: 'Released arrestee + approved a thin report' },
        { text: 'Require transport to the issuing authority for arraignment, completion of the victim notifications, and the applicable checklist items (children present, prior incidents) before approval.', next: 'c3b', quality: 'good', shortLabel: 'Enforced transport, notification, and checklist' },
        { text: 'Allow the release but require the notifications and checklist to be completed.', next: 'c3c', quality: 'bad', shortLabel: 'Fixed the paperwork, allowed the release' },
        { text: 'Approve the report now and follow up on the notifications and transport tomorrow.', next: 'c3d', quality: 'risky', shortLabel: 'Deferred required steps' },
      ]
    },
    'c3a': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'Two Violations at Once',
      heading: 'Releasing the arrestee and approving a blank-checklist report fails ALO 4.13 twice.',
      narrative: [
        'Releasing an arrested DV subject in lieu of arraignment is flatly prohibited, and approving a report with no victim notification and an incomplete checklist leaves the record — and the victim — unprotected. Cooperation and a victim\'s request never convert an arrest into a release.',
        'Both the transport and the documentation are mandatory.'
      ],
      legal: 'MTPD ALO 4.13: never release the defendant instead of transporting to the issuing authority; victim notification and the narrative checklist are required.',
      next: 'debrief'
    },
    'c3b': {
      type: 'consequence', outcomeClass: 'outcome-good', outcomeLabel: 'Transport, Notify, Document',
      heading: 'You enforced arraignment transport and a complete ALO 4.13 record.',
      narrative: [
        'You direct that the subject be transported to the issuing authority for arraignment — release is not an option regardless of cooperation or the victim\'s request — and require the victim notifications and the applicable checklist items completed before you approve. The record now protects the victim and stands up for prosecution.',
        'This is the DV review done right end to end: arrest on the evidence, firearms seized, subject arraigned, victim informed, narrative complete.'
      ],
      legal: 'MTPD ALO 4.13: never release instead of transport; provide and document victim notifications; complete the narrative checklist.',
      next: 'debrief'
    },
    'c3c': {
      type: 'consequence', outcomeClass: 'outcome-bad', outcomeLabel: 'The Release Is the Bigger Problem',
      heading: 'Fixing the paperwork doesn\'t cure releasing an arrestee who must be arraigned.',
      narrative: [
        'Completing the notifications and checklist is necessary, but allowing the scene release ignores the flat prohibition in ALO 4.13. An arrested DV subject goes to the issuing authority — period.',
        'Require transport and the documentation both.'
      ],
      legal: 'MTPD ALO 4.13: officers shall never release the defendant instead of taking them to the issuing authority.',
      next: 'debrief'
    },
    'c3d': {
      type: 'consequence', outcomeClass: 'outcome-neutral', outcomeLabel: 'These Don\'t Wait Until Tomorrow',
      heading: 'Transport and victim notification are tonight\'s obligations, not next shift\'s.',
      narrative: [
        'Approving now and deferring the transport and notifications risks the subject never reaching arraignment and the victim never receiving the information she needs to stay safe. Both are time-bound ALO 4.13 duties.',
        'Handle the transport, notification, and checklist before approval.'
      ],
      legal: 'MTPD ALO 4.13: arraignment transport and victim notification are required at the time of the arrest, documented in the report.',
      next: 'debrief'
    },
    'debrief': { type: 'debrief' },
  }
};
