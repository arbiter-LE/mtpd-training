/* EGPD — production module list. Builds MODULES from js/modules/egpd/module-egpd-N.js (loaded first by index.html). */
const MODULES = [
    { id: 'egpd-search-seizure', category: 'Constitutional Law', title: 'Search & Seizure — Fourth Amendment', description: 'EGPD', duration: '20–25 min', weekNumber: 1, scenario: SCENARIO_SEARCH_SEIZURE, questions: getSearchSeizureQuestions() },
    { id: 'egpd-use-of-force', category: 'Use of Force', title: 'Use of Force Continuum', description: 'EGPD', duration: '15–20 min', weekNumber: 2, scenario: SCENARIO_USE_OF_FORCE, questions: getUseOfForceQuestions() },
    { id: 'egpd-report-writing', category: 'Documentation', title: 'Professional Report Writing', description: 'EGPD', duration: '10–15 min', weekNumber: 3, scenario: SCENARIO_REPORT_WRITING, questions: getReportWritingQuestions() },
    { id: 'egpd-crisis-intervention', category: 'Crisis Response', title: 'Crisis Intervention & De-Escalation', description: 'EGPD', duration: '20–25 min', weekNumber: 4, scenario: SCENARIO_CRISIS, questions: getCrisisQuestions() },
    { id: 'egpd-domestic-violence', category: 'Domestic Violence', title: 'Domestic Violence Response', description: 'EGPD', duration: '20–25 min', weekNumber: 5, scenario: SCENARIO_DOMESTIC_VIOLENCE, questions: getDomesticViolenceQuestions() },
    { id: 'egpd-vehicle-pursuits', category: 'Traffic & Pursuits', title: 'Motor Vehicle Pursuits', description: 'EGPD', duration: '15–20 min', weekNumber: 6, scenario: SCENARIO_VEHICLE_PURSUITS, questions: getVehiclePursuitQuestions() },
    { id: 'egpd-leadership', category: 'Professional Development', title: 'Leadership & Supervision', description: 'EGPD', duration: '20–25 min', weekNumber: 7, scenario: SCENARIO_LEADERSHIP, questions: getLeadershipQuestions() },
    { id: 'egpd-traffic-stops', category: 'Traffic & Contacts', title: 'Traffic Stops & Vehicle Contacts', description: 'EGPD', duration: '20–25 min', weekNumber: 8, scenario: SCENARIO_TRAFFIC_STOPS, questions: getTrafficStopQuestions() },
    { id: 'egpd-emotional-intelligence', category: 'Professional Development', title: 'Emotional Intelligence', description: 'EGPD', duration: '15–20 min', weekNumber: 9, scenario: SCENARIO_EI, questions: getEIQuestions() },
    { id: 'egpd-evidence-chain-of-custody', category: 'Investigations', title: 'Evidence & Chain of Custody', description: 'EGPD', duration: '15–20 min', weekNumber: 10, scenario: SCENARIO_EVIDENCE, questions: getEvidenceQuestions() },
    { id: 'egpd-officer-wellness', category: 'Wellness', title: 'Officer Wellness', description: 'EGPD', duration: '15–20 min', weekNumber: 11, scenario: SCENARIO_WELLNESS, questions: getWellnessQuestions() },
    { id: 'egpd-de-escalation', category: 'Use of Force', title: 'De-escalation', description: 'EGPD', duration: '15–20 min', weekNumber: 12, scenario: SCENARIO_DEESCALATION, questions: getDeescalationQuestions() },
];
