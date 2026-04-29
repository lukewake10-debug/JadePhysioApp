import {
  AssessmentFramework,
  CaseScenario,
  Condition,
  Investigation,
  MedicalManagementTopic,
  OutcomeMeasure,
  PathophysiologyTopic,
  Priority,
  RedFlag,
  RespiratoryPhysioTreatment,
  SourceReference,
  Specialty,
  TreatmentReasoningEntry,
} from "../types";

export const safetyReminder =
  "Always check current NICE guidance, CSP guidance, local NHS trust policy, local escalation pathways, and senior advice before applying information clinically.";

const slug = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const sourceReferences: SourceReference[] = [
  {
    id: "nice-copd-ng115",
    sourceName: "Chronic obstructive pulmonary disease in over 16s: diagnosis and management",
    sourceType: "NICE guidance",
    authorOrOrganisation: "NICE",
    year: "2018, updated 2019",
    link: "https://www.nice.org.uk/guidance/ng115",
    notes: "Used as a high-level structure for COPD diagnosis, monitoring, exacerbation themes, oxygen and pulmonary rehabilitation prompts. Content is paraphrased.",
    dateLastReviewed: "2026-04-29",
    confidenceLevel: "High",
  },
  {
    id: "nice-stroke-ng236",
    sourceName: "Stroke rehabilitation in adults",
    sourceType: "NICE guidance",
    authorOrOrganisation: "NICE",
    year: "2023",
    link: "https://www.nice.org.uk/guidance/ng236",
    notes: "Used for stroke rehabilitation organisation, MDT and therapy intensity prompts. Content is paraphrased.",
    dateLastReviewed: "2026-04-29",
    confidenceLevel: "High",
  },
  {
    id: "nice-asthma-ng245",
    sourceName: "Asthma: diagnosis, monitoring and chronic asthma management",
    sourceType: "NICE guidance",
    authorOrOrganisation: "BTS, NICE and SIGN",
    year: "2024",
    link: "https://www.nice.org.uk/guidance/ng245",
    notes: "Used for asthma diagnostic and medicine categories. Acute local policies still need checking.",
    dateLastReviewed: "2026-04-29",
    confidenceLevel: "High",
  },
  {
    id: "nice-pneumonia-ng250",
    sourceName: "Pneumonia: diagnosis and management",
    sourceType: "NICE guidance",
    authorOrOrganisation: "NICE",
    year: "2025",
    link: "https://www.nice.org.uk/guidance/ng250",
    notes: "Used for pneumonia investigation and antimicrobial management structure. Content is paraphrased.",
    dateLastReviewed: "2026-04-29",
    confidenceLevel: "High",
  },
  {
    id: "nice-sepsis-ng253",
    sourceName: "Suspected sepsis in people aged 16 or over",
    sourceType: "NICE guidance",
    authorOrOrganisation: "NICE",
    year: "2025",
    link: "https://www.nice.org.uk/guidance/ng253",
    notes: "Used for sepsis recognition, NEWS2 and escalation structure. Content is paraphrased.",
    dateLastReviewed: "2026-04-29",
    confidenceLevel: "High",
  },
  {
    id: "nhs-conditions",
    sourceName: "NHS health A to Z condition pages",
    sourceType: "NHS resource",
    authorOrOrganisation: "NHS",
    year: "Current web resource",
    link: "https://www.nhs.uk/conditions/",
    notes: "Used as patient-facing cross-check for symptom framing. Content is paraphrased and simplified.",
    dateLastReviewed: "2026-04-29",
    confidenceLevel: "Moderate",
  },
  {
    id: "csp-resource-placeholder",
    sourceName: "CSP clinical resources and professional guidance",
    sourceType: "CSP resource",
    authorOrOrganisation: "Chartered Society of Physiotherapy",
    year: "Current web resource",
    link: "https://www.csp.org.uk/",
    notes: "Placeholder for CSP-specific review before production use.",
    dateLastReviewed: "2026-04-29",
    confidenceLevel: "Placeholder",
  },
  {
    id: "cochrane-placeholder",
    sourceName: "Cochrane Library review placeholder",
    sourceType: "Cochrane review",
    authorOrOrganisation: "Cochrane",
    year: "To be confirmed",
    link: "https://www.cochranelibrary.com/",
    notes: "Placeholder for future evidence summaries, especially respiratory airway clearance and exercise interventions.",
    dateLastReviewed: "2026-04-29",
    confidenceLevel: "Placeholder",
  },
  {
    id: "local-trust-placeholder",
    sourceName: "Local NHS trust policy placeholder",
    sourceType: "Local trust policy placeholder",
    authorOrOrganisation: "Local NHS trust",
    year: "Local document required",
    link: "#",
    notes: "Replace with local oxygen, escalation, tracheostomy, falls, mobilisation and on-call policies.",
    dateLastReviewed: "2026-04-29",
    confidenceLevel: "Placeholder",
  },
  {
    id: "textbook-placeholder",
    sourceName: "Clinical pathophysiology textbook placeholder",
    sourceType: "Textbook placeholder",
    authorOrOrganisation: "To be confirmed",
    year: "To be confirmed",
    link: "#",
    notes: "Placeholder for local education team-approved textbook references.",
    dateLastReviewed: "2026-04-29",
    confidenceLevel: "Placeholder",
  },
];

const sourceSet = ["nhs-conditions", "local-trust-placeholder", "textbook-placeholder"];

export const conditionCatalogue = {
  Musculoskeletal: [
    "Low back pain",
    "Sciatica",
    "Neck pain",
    "Rotator cuff related shoulder pain",
    "Frozen shoulder",
    "Hip osteoarthritis",
    "Knee osteoarthritis",
    "ACL injury",
    "Ankle sprain",
    "Tendinopathy",
    "Plantar fasciitis",
  ],
  Neurology: [
    "Stroke",
    "Parkinson's disease",
    "Multiple sclerosis",
    "Guillain-Barre syndrome",
    "Spinal cord injury",
    "Traumatic brain injury",
    "Functional neurological disorder",
    "Motor neurone disease",
  ],
  Respiratory: [
    "COPD exacerbation",
    "Pneumonia",
    "Bronchiectasis",
    "Asthma",
    "Atelectasis",
    "Pulmonary embolism",
    "Pleural effusion",
    "Pneumothorax",
    "Post-operative respiratory complications",
    "Tracheostomy management basics",
    "Type 1 and type 2 respiratory failure",
  ],
  "Cardiorespiratory and acute care": [
    "Heart failure",
    "Myocardial infarction",
    "Atrial fibrillation",
    "Sepsis",
    "ICU acquired weakness",
    "Frailty and deconditioning",
    "Post-operative complications",
    "Orthostatic hypotension",
  ],
  "Older adult rehab": ["Falls", "Fragility fracture", "Hip fracture", "Delirium", "Dementia-related mobility decline", "Reduced mobility and deconditioning"],
  Paediatrics: ["Developmental delay", "Cerebral palsy overview", "Talipes overview", "Paediatric respiratory conditions"],
  "Pelvic health": ["Pelvic girdle pain", "Urinary incontinence overview", "Postnatal return to activity"],
};

const inv = (
  id: string,
  title: string,
  category: Investigation["category"],
  whatItShows: string,
  whyUseful: string,
  escalationTriggers: string[],
  sources = sourceSet,
): Investigation => ({ id, title, category, whatItShows, whyUseful, escalationTriggers, sources });

export const investigationLibrary: Investigation[] = [
  inv("fbc", "FBC", "blood test", "Anaemia, white cell count and platelets.", "Screens infection, bleeding risk, fatigue contributors and treatment safety.", ["Markedly high or low WCC", "Severe anaemia with symptoms", "Unexpected thrombocytopenia"]),
  inv("crp", "CRP", "blood test", "Inflammatory burden and trend.", "Useful in infection, inflammatory disease and response to treatment.", ["Rapidly rising CRP with deterioration", "High CRP with sepsis features"]),
  inv("u-e", "U&Es", "blood test", "Renal function and electrolytes.", "Important before mobilisation where dehydration, AKI, diuretics or arrhythmia risk are present.", ["AKI", "Severe potassium abnormality", "Worsening renal function"]),
  inv("lfts", "LFTs", "blood test", "Liver injury, cholestasis and synthetic clues.", "Supports medication safety and systemic illness assessment.", ["Acute marked derangement", "Jaundice with acute deterioration"]),
  inv("abg-vbg", "ABG or VBG", "respiratory", "Oxygenation, ventilation, pH, lactate and CO2 retention pattern.", "Clarifies type 1 or type 2 respiratory failure and need for escalation.", ["pH falling", "Rising CO2 with drowsiness", "Severe hypoxaemia", "High lactate"]),
  inv("d-dimer", "D-dimer", "blood test", "Fibrin degradation marker.", "Can support VTE rule-out pathways when combined with pre-test probability.", ["Positive result with PE or DVT symptoms", "Do not use alone to reassure if high suspicion"]),
  inv("troponin", "Troponin", "cardiac", "Myocardial injury marker.", "Helps assess acute coronary syndrome or cardiac strain.", ["Elevated or rising troponin", "Chest pain, sweating or haemodynamic instability"]),
  inv("bnp", "BNP or NT-proBNP", "cardiac", "Cardiac stretch and heart failure likelihood.", "Supports heart failure assessment in breathlessness or oedema.", ["Very high BNP with acute breathlessness", "Pulmonary oedema signs"]),
  inv("ecg", "ECG", "cardiac", "Rhythm, rate, ischaemic changes and conduction problems.", "Screens AF, MI, arrhythmia and exercise safety.", ["New ST changes", "Fast AF with symptoms", "Heart block or unstable rhythm"]),
  inv("cxr", "Chest X-ray", "imaging", "Consolidation, oedema, collapse, effusion, pneumothorax and line positions.", "Common first-line imaging for acute respiratory symptoms.", ["New pneumothorax", "Worsening consolidation with sepsis", "Pulmonary oedema"]),
  inv("ct", "CT", "imaging", "Detailed cross-sectional anatomy, bleeding, PE, fracture or malignancy clues.", "Used when X-ray or clinical picture is insufficient.", ["Confirmed PE", "Cord compression suspicion", "Intracranial bleed"]),
  inv("mri", "MRI", "imaging", "Soft tissue, spine, brain and nerve detail.", "Useful for cauda equina, stroke detail, demyelination and spinal cord pathology.", ["Cord compression", "Cauda equina", "New acute CNS lesion"]),
  inv("spirometry", "Spirometry", "respiratory", "Obstructive or restrictive ventilatory pattern.", "Supports COPD, asthma and restrictive disease workup.", ["Unexpected severe obstruction", "Large decline from baseline"]),
  inv("peak-flow", "Peak flow", "respiratory", "Variable expiratory flow and response to treatment.", "Useful in asthma monitoring and acute deterioration.", ["Low or falling PEFR", "Poor response to bronchodilator"]),
  inv("cultures", "Sputum and blood cultures", "blood test", "Likely organism and antibiotic sensitivity.", "Supports targeted antibiotics in significant infection.", ["Positive blood culture", "Sepsis signs", "Resistant organism risk"]),
];

const airwayClearance: RespiratoryPhysioTreatment[] = [
  {
    id: "positioning",
    title: "Positioning",
    whatItIs: "Using upright, side-lying or modified postural positions to optimise ventilation, secretion movement and work of breathing.",
    howToApply: "Check observations, lines, drains and comfort; choose a position that improves breath sounds, oxygenation or secretion drainage; reassess within minutes.",
    whyItHelps: "Position changes can alter ventilation distribution, improve basal expansion, reduce dyspnoea and support sputum movement.",
    whenToUse: "Breathlessness, basal atelectasis, secretion retention, reduced lung volumes, post-operative respiratory compromise.",
    cautions: "Use caution with unstable observations, raised intracranial pressure, spinal precautions, reflux, haemodynamic instability or surgical restrictions.",
    stopSigns: ["SpO2 falls despite appropriate oxygen response", "Marked distress", "Chest pain", "New dizziness or hypotension"],
    documentationExample: "Positioned upright and left side-lying trials. SpO2, RR, work of breathing and sputum response monitored; best tolerated position recorded.",
  },
  {
    id: "acbt",
    title: "Active cycle of breathing technique",
    whatItIs: "A flexible cycle of breathing control, thoracic expansion exercises and forced expiration technique.",
    howToApply: "Teach relaxed breathing control, add 3-4 deep breaths with holds if tolerated, then huffs from appropriate lung volume, returning to breathing control.",
    whyItHelps: "Changes airflow behind secretions, improves collateral ventilation and moves sputum proximally without repeated hard coughing.",
    whenToUse: "Retained secretions, bronchiectasis, COPD exacerbation with sputum, post-operative sputum retention.",
    cautions: "Avoid over-fatiguing the patient; caution with bronchospasm, haemoptysis, untreated pneumothorax or severe desaturation.",
    stopSigns: ["Haemoptysis", "Wheeze or bronchospasm worsening", "Severe breathlessness", "New arrhythmia symptoms"],
    documentationExample: "ACBT taught with huffs; small volume sputum cleared, Borg and SpO2 monitored, independent practice plan agreed.",
  },
  {
    id: "pep",
    title: "Positive expiratory pressure",
    whatItIs: "Breathing out against resistance through a device to splint airways and aid secretion clearance.",
    howToApply: "Select local device, set resistance per competency, coach tidal breaths through the device with rests and huffs, clean equipment per policy.",
    whyItHelps: "Back pressure may reduce airway collapse, improve collateral ventilation and support mucus movement.",
    whenToUse: "Bronchiectasis, COPD with dynamic airway collapse, secretion retention where a device is locally indicated.",
    cautions: "Check local contraindications: untreated pneumothorax, significant haemoptysis, severe cardiovascular instability or inability to use device safely.",
    stopSigns: ["Chest pain", "Dizziness", "Haemoptysis", "Desaturation or distress"],
    documentationExample: "PEP completed: resistance, cycles, sputum volume/colour, response and cleaning advice documented.",
  },
  {
    id: "supported-cough",
    title: "Huffing and supported cough",
    whatItIs: "Using open-glottis huffs and supported cough to move and expectorate secretions while reducing pain or fatigue.",
    howToApply: "Coach medium or low-volume huffs, support incision or ribs with pillow/towel if appropriate, allow recovery breaths.",
    whyItHelps: "A huff maintains airway patency longer than a forceful cough and support can reduce pain-limited cough.",
    whenToUse: "Post-operative sputum retention, rib pain, weak cough, bronchiectasis or COPD with sputum.",
    cautions: "Avoid repeated maximal cough if exhausted, unstable, severe bronchospasm or high bleeding risk.",
    stopSigns: ["Severe pain", "Syncope", "Haemoptysis", "Unstable observations"],
    documentationExample: "Supported huff/cough practised with wound support; sputum cleared and pain score monitored.",
  },
  {
    id: "early-mobility",
    title: "Early mobilisation with oxygen monitoring",
    whatItIs: "Graded sitting, standing, marching or walking to improve ventilation, circulation and functional recovery.",
    howToApply: "Check NEWS2, oxygen prescription, lines and falls risk; mobilise at a safe dose; monitor SpO2, HR, BP, RR, Borg and symptoms.",
    whyItHelps: "Mobilisation increases tidal volume, supports secretion clearance, reduces deconditioning and informs discharge planning.",
    whenToUse: "Medically stable respiratory, post-operative and acute care patients with reduced mobility or atelectasis risk.",
    cautions: "Pause with unstable observations, uncontrolled pain, syncope, active chest pain, severe desaturation or new neurological signs.",
    stopSigns: ["SpO2 below agreed target", "Chest pain", "Severe breathlessness", "New confusion", "Collapse or near syncope"],
    documentationExample: "Mobilised 20 m with frame on prescribed oxygen; SpO2 range, Borg, rests, gait aid and plan documented.",
  },
];

const medication = (
  drugClass: string,
  examples: string[],
  mechanism: string,
  whyUsed: string,
  keySideEffects: string[],
  physiotherapyRelevance: string,
) => ({ drugClass, examples, mechanism, whyUsed, keySideEffects, physiotherapyRelevance });

const reasoning = (
  id: string,
  treatmentOrManagementOption: string,
  type: TreatmentReasoningEntry["type"],
  howItWorks: string,
  whyUsed: string,
  whenUsed: string,
  cautionsOrContraindications: string,
  physiotherapyRelevance: string,
  documentationExample: string,
): TreatmentReasoningEntry => ({ id, treatmentOrManagementOption, type, howItWorks, whyUsed, whenUsed, cautionsOrContraindications, physiotherapyRelevance, documentationExample });

const baseReasoningRows = (conditionId: string, title: string): TreatmentReasoningEntry[] => [
  reasoning(`${conditionId}-review`, "Senior or medical review", "escalation", "Brings medical decision-making to deterioration, diagnostic uncertainty or abnormal results.", "Reduces delay when presentation is unsafe for routine physiotherapy.", "New red flags, abnormal observations, concerning bloods or unexpected functional collapse.", "Do not continue treatment while trying to manage a medical emergency alone.", "Know when to stop, stay with the patient, call for help and document clearly.", `Escalated ${title} concern to nurse in charge/medical team; symptoms, observations and treatment stopped documented.`),
  reasoning(`${conditionId}-monitor`, "Observation and symptom monitoring", "monitoring", "Tracks physiological response before, during and after intervention.", "Detects deterioration and informs safe treatment dose.", "Before first assessment, during mobilisation, after respiratory treatment or if patient reports change.", "Single normal observation does not override clinical concern.", "Supports safe progression, regression or escalation.", `Baseline and post-treatment observations recorded for ${title}; response discussed with MDT.`),
];

const makeCards = (id: string, title: string, path: string, management: string, investigation: string, escalation: string) => [
  { id: `${id}-fc-1`, front: `What is the core pathophysiology of ${title}?`, back: path, relatedTopic: "Pathophysiology" },
  { id: `${id}-fc-2`, front: `Which medical management theme matters most in ${title}?`, back: management, relatedTopic: "Medical management" },
  { id: `${id}-fc-3`, front: `Which investigation helps confirm or risk-stratify ${title}?`, back: investigation, relatedTopic: "Investigations" },
  { id: `${id}-fc-4`, front: `When should physiotherapy pause or escalate in ${title}?`, back: escalation, relatedTopic: "Red flags" },
  { id: `${id}-fc-5`, front: `Why does ${title} affect function?`, back: "Symptoms, physiology, confidence, fatigue and safety constraints interact; revision should link the impairment to a real activity limitation.", relatedTopic: "Function" },
];

const makeQuiz = (id: string, title: string, correctPath: string, med: string, invText: string, redFlag: string, physio: string) => [
  {
    id: `${id}-q1`,
    question: `Which statement best explains the pathophysiology of ${title}?`,
    options: [correctPath, "It is mainly caused by voluntary avoidance of movement.", "It is only diagnosed by physiotherapy outcome measures.", "It has no relationship to symptoms."],
    correctAnswer: 0,
    explanation: "Revision reasoning should start from the mechanism, then link it to signs, investigations and safe treatment.",
    relatedTopic: "Pathophysiology",
    difficultyLevel: "Band 5" as const,
  },
  {
    id: `${id}-q2`,
    question: `Which medical management issue is most relevant in ${title}?`,
    options: ["Ignoring medicines during physiotherapy assessment", med, "Stopping all routine observations once physiotherapy arrives", "Using exercise prescription as first-line medical care"],
    correctAnswer: 1,
    explanation: "Physiotherapists do not prescribe most medicines, but they need to understand mechanisms, side effects and monitoring.",
    relatedTopic: "Medical management",
    difficultyLevel: "Band 5" as const,
  },
  {
    id: `${id}-q3`,
    question: `Which investigation is commonly useful in ${title}?`,
    options: ["No investigation can ever help", "Only grip strength", invText, "Only a falls diary"],
    correctAnswer: 2,
    explanation: "Investigations should be interpreted alongside the clinical picture and local escalation thresholds.",
    relatedTopic: "Investigations",
    difficultyLevel: "Band 5" as const,
  },
  {
    id: `${id}-q4`,
    question: `Which finding should trigger caution or escalation in ${title}?`,
    options: ["Expected mild fatigue after assessment", "Stable baseline symptoms", "Patient asks a question", redFlag],
    correctAnswer: 3,
    explanation: "Safety comes before completing a planned session. Stop, reassess and escalate using local pathways.",
    relatedTopic: "Escalation",
    difficultyLevel: "Band 6" as const,
  },
  {
    id: `${id}-q5`,
    question: `What is the safest physiotherapy reasoning approach for ${title}?`,
    options: [physio, "Treat without checking observations or restrictions", "Avoid all activity indefinitely", "Use the same intervention for every patient"],
    correctAnswer: 0,
    explanation: "Physiotherapy input should be individualised to presentation, physiology, precautions and patient goals.",
    relatedTopic: "Physiotherapy safety",
    difficultyLevel: "Band 5" as const,
  },
];

const detailedConditions: Array<Omit<Condition, "priority" | "tags">> = [
  {
    id: "copd-exacerbation",
    title: "COPD exacerbation",
    specialty: "Respiratory",
    setting: ["Respiratory ward", "Acute ward", "Emergency department"],
    difficulty: "Band 5",
    overview: {
      definition: "An acute, sustained worsening of COPD symptoms beyond usual day-to-day variation, commonly with increased breathlessness, cough or sputum change.",
      commonPatientGroups: ["Older adults", "Current or ex-smokers", "People with frequent infections or advanced airflow obstruction"],
      commonNhsSettings: ["ED", "acute medical unit", "respiratory ward", "community respiratory team"],
      whyPhysiosNeedToUnderstandIt: "Physiotherapists often assess sputum retention, work of breathing, oxygen response, exercise tolerance and discharge safety.",
    },
    pathophysiology: {
      normal: "Healthy airways keep calibre during expiration, cilia clear mucus and alveoli provide a large surface for gas exchange.",
      whatGoesWrong: "Chronic inflammation narrows small airways, damages alveolar attachments and increases mucus; exacerbations add acute airway inflammation and secretion load.",
      diseaseMechanism: "Triggers such as infection or pollution increase airway oedema, bronchoconstriction and mucus viscosity, worsening expiratory flow limitation and dynamic hyperinflation.",
      levels: "Cellular neutrophilic inflammation and oxidative stress affect epithelium; tissue-level airway remodelling and emphysema reduce elastic recoil; system-level V/Q mismatch causes hypoxaemia and sometimes hypercapnia.",
      acuteVsChronic: "Chronic COPD creates reduced reserve; acute exacerbation increases airway resistance, ventilatory demand and respiratory muscle workload.",
      symptomLink: "Air trapping and V/Q mismatch create breathlessness, wheeze, desaturation and fatigue; sputum changes reflect inflammation or infection.",
      functionLink: "Dynamic hyperinflation makes walking, washing and transfers harder because tidal breathing occurs at higher lung volumes with less inspiratory reserve.",
      complications: ["Type 2 respiratory failure", "Pneumonia", "Deconditioning", "Pulmonary hypertension", "Anxiety-driven breathlessness cycles"],
      prognosis: "Recovery varies; frequent exacerbations accelerate functional decline and increase admission risk, so optimisation and prevention matter.",
    },
    clinicalPresentation: {
      symptoms: ["Worse breathlessness", "Increased cough", "Sputum volume or colour change", "Wheeze", "Fatigue"],
      signs: ["Raised respiratory rate", "Use of accessory muscles", "Reduced air entry", "Wheeze", "Possible cyanosis or peripheral oedema"],
      subjectiveFindings: ["Baseline exercise tolerance", "Usual sputum", "Rescue pack use", "Inhaler technique", "Home oxygen or NIV history"],
      objectiveFindings: ["SpO2 against target range", "Borg breathlessness", "Cough effectiveness", "Sputum amount and colour", "Mobility tolerance"],
      functionalImpact: ["Reduced walking distance", "Difficulty washing or dressing", "Fear of breathlessness", "Delayed discharge"],
      redFlagSymptoms: ["Drowsiness", "Confusion", "Chest pain", "Haemoptysis", "Rapidly rising oxygen requirement"],
      differentials: ["Pneumonia", "Pulmonary embolism", "Heart failure", "Pneumothorax", "Acute coronary syndrome"],
    },
    investigations: investigationLibrary.filter((i) => ["fbc", "crp", "u-e", "abg-vbg", "ecg", "cxr", "spirometry", "cultures"].includes(i.id)),
    medicalManagement: {
      firstLine: ["Controlled oxygen to prescribed target range", "Short-acting bronchodilators", "Systemic corticosteroids when indicated", "Antibiotics if bacterial features are suspected", "NIV if acidotic hypercapnic respiratory failure meets local criteria"],
      medications: [
        medication("Short-acting bronchodilators", ["Salbutamol", "Ipratropium"], "Relax airway smooth muscle and reduce bronchoconstriction.", "Rapid symptom relief and improved expiratory airflow.", ["Tachycardia", "Tremor", "Dry mouth"], "Monitor HR, tremor, breathlessness and response before exercise or airway clearance."),
        medication("Corticosteroids", ["Prednisolone"], "Reduce airway inflammation.", "Short courses can shorten recovery in suitable exacerbations.", ["Hyperglycaemia", "Mood change", "Proximal weakness with repeated courses"], "Consider glucose, delirium risk and muscle weakness in rehab planning."),
        medication("Antibiotics", ["Amoxicillin", "Doxycycline", "Clarithromycin"], "Treat likely bacterial infection.", "Used when sputum purulence or infection signs suggest benefit.", ["GI upset", "Allergy", "QT concerns with some agents"], "Check nausea, diarrhoea, fatigue and infection control implications."),
      ],
      monitoring: ["NEWS2", "SpO2 target range", "ABG/VBG if CO2 retention risk", "Sputum", "Fluid balance", "Exercise response"],
      oxygenTherapy: "Use prescribed target saturations, commonly lower targets for CO2 retainers. Escalate if oxygen requirement rises or CO2 retention symptoms appear.",
      escalationOptions: ["Respiratory senior review", "NIV assessment", "Critical care outreach", "Antibiotic review", "Palliative breathlessness support where appropriate"],
      mdtInvolvement: ["Respiratory nurse", "Medical team", "Pharmacist", "Dietitian", "OT", "Community respiratory team"],
      urgentMedicalReview: ["New drowsiness or confusion", "pH falling or CO2 rising", "SpO2 below target despite oxygen", "Chest pain", "Haemoptysis"],
    },
    physiotherapyRelevance: {
      whyItMatters: "Physiotherapy may reduce secretion burden, support breathing control and restore safe mobility, but only after medical stability is checked.",
      assessmentConsiderations: ["Oxygen prescription", "ABG/VBG trend", "Sputum retention", "Work of breathing", "Baseline function"],
      functionalImpact: ["Reduced endurance", "Fear avoidance due to breathlessness", "Falls risk from fatigue or oxygen tubing"],
      treatmentPrecautions: ["Avoid over-fatiguing", "Respect target saturations", "Use pacing and rests", "Escalate CO2 narcosis signs"],
      rehabilitationConsiderations: ["Early mobilisation", "Breathing control", "Airway clearance if secretions", "Pulmonary rehab referral after discharge where suitable"],
      dischargePlanning: ["Inhaler confidence", "Sputum plan", "Oxygen arrangements", "Community respiratory follow-up"],
      pauseOrEscalate: ["Drowsiness", "New chest pain", "Severe desaturation", "Unstable RR or HR"],
    },
    respiratoryPhysioTreatments: airwayClearance,
    treatmentReasoningTable: [
      reasoning("copd-bronchodilators", "Bronchodilators", "medical", "Reduce airway smooth muscle tone.", "Improve airflow and symptoms.", "Acute breathlessness or wheeze as prescribed.", "Tachycardia or tremor may limit exercise tolerance.", "Check timing and response before mobilisation.", "Mobilised after nebuliser; HR, SpO2 and Borg monitored."),
      reasoning("copd-niv", "Non-invasive ventilation", "medical", "Supports ventilation and CO2 clearance through positive pressure.", "Treats selected acidotic hypercapnic exacerbations.", "When ABG and clinical criteria meet local protocol.", "Requires trained staff and close monitoring.", "Coordinate timing of airway clearance and mobility around NIV tolerance.", "NIV in use; physio session limited to positioning and secretion review."),
      ...baseReasoningRows("copd-exacerbation", "COPD exacerbation"),
      ...airwayClearance.slice(0, 4).map((t) => reasoning(`copd-${t.id}`, t.title, "physiotherapy", t.whyItHelps, t.whenToUse, t.whenToUse, t.cautions, "Use only after checking observations, target SpO2 and fatigue.", t.documentationExample)),
    ],
    redFlags: ["Acute respiratory deterioration", "Sepsis", "Cardiac chest pain", "Pulmonary embolism", "Unstable observations"],
    nhsConsiderations: {
      commonNhsSetting: ["AMU", "respiratory ward", "community respiratory service"],
      referralPathways: ["Pulmonary rehabilitation", "smoking cessation", "home oxygen assessment", "community respiratory nurse"],
      mdtRoles: ["Medical team manages acute treatment", "Nurses monitor oxygen and NEWS2", "Pharmacist reviews medicines", "Physio assesses secretions and mobility"],
      medicalTeamInvolvement: ["ABG interpretation", "NIV decisions", "antibiotic and steroid prescribing"],
      dischargePlanningPoints: ["Baseline mobility", "oxygen plan", "rescue pack understanding", "follow-up"],
      localTrustPolicyReminders: ["Oxygen policy", "NIV pathway", "on-call respiratory criteria"],
      patientEducationConsiderations: ["Breathlessness pacing", "sputum monitoring", "when to seek help"],
    },
    revisionSummary: {
      pathophysiologyPoints: ["Small airway inflammation", "Loss of elastic recoil", "Mucus hypersecretion", "Dynamic hyperinflation", "V/Q mismatch and CO2 retention risk"],
      medicalManagementPoints: ["Controlled oxygen", "Bronchodilators", "Steroids where indicated", "Antibiotics when bacterial features", "NIV for selected acidotic hypercapnia"],
      physiotherapyRelevancePoints: ["Assess sputum and cough", "Monitor oxygen response", "Use paced mobilisation"],
      commonMistakes: ["Treating breathlessness without checking ABG risk", "Ignoring target saturations", "Overloading a fatigued patient"],
      interviewTalkingPoints: ["Explain type 2 respiratory failure", "Reason through airway clearance", "Describe escalation for drowsy CO2 retainer"],
    },
    flashcards: makeCards("copd-exacerbation", "COPD exacerbation", "Airway inflammation, mucus and loss of recoil worsen airflow obstruction and gas exchange.", "Controlled oxygen, bronchodilators, steroids, antibiotics and NIV when indicated.", "ABG/VBG clarifies oxygenation, pH and CO2 retention.", "Drowsiness, rising CO2, falling pH, chest pain or severe desaturation."),
    quizQuestions: makeQuiz("copd-exacerbation", "COPD exacerbation", "Acute inflammation and mucus worsen chronic airflow obstruction and dynamic hyperinflation.", "Controlled oxygen and bronchodilators are central, with steroids/antibiotics/NIV depending on presentation.", "ABG or VBG plus CXR and inflammatory bloods can guide severity and differentials.", "New drowsiness or rising oxygen requirement with CO2 retention risk", "Check target saturations, fatigue and sputum before airway clearance or mobilisation."),
    sources: ["nice-copd-ng115", ...sourceSet],
    dateLastReviewed: "2026-04-29",
  },
  {
    id: "pneumonia",
    title: "Pneumonia",
    specialty: "Respiratory",
    setting: ["Respiratory ward", "Acute ward", "Community"],
    difficulty: "Band 5",
    overview: {
      definition: "Infection and inflammation of lung parenchyma causing alveolar filling and impaired gas exchange.",
      commonPatientGroups: ["Older adults", "People with frailty", "People with chronic lung disease", "Post-operative or immunocompromised patients"],
      commonNhsSettings: ["GP and community", "ED", "AMU", "respiratory ward"],
      whyPhysiosNeedToUnderstandIt: "Physiotherapists may see hypoxaemia, sputum retention, atelectasis, weakness and discharge delay after acute infection.",
    },
    pathophysiology: {
      normal: "Alveoli remain air-filled with thin respiratory membranes for diffusion; immune defences clear inhaled organisms.",
      whatGoesWrong: "Pathogens trigger alveolar inflammation, capillary leak and exudate, reducing ventilated alveolar surface area.",
      diseaseMechanism: "Neutrophils, cytokines and fluid enter alveoli, creating consolidation and V/Q mismatch; systemic inflammation drives fever and fatigue.",
      levels: "Cell-level immune activation causes exudate; organ-level consolidation reduces compliance; system-level hypoxaemia raises respiratory and cardiac demand.",
      acuteVsChronic: "Usually acute, but recovery may be slower with frailty, COPD, aspiration risk or resistant organisms.",
      symptomLink: "Consolidation and pleural irritation explain cough, sputum, breathlessness, fever and pleuritic pain.",
      functionLink: "Hypoxaemia, fever and catabolism reduce exercise tolerance and can precipitate delirium or falls in older adults.",
      complications: ["Sepsis", "Pleural effusion", "Empyema", "Respiratory failure", "Deconditioning"],
      prognosis: "Most improve with appropriate antimicrobials and supportive care, but older or frail patients may have prolonged functional recovery.",
    },
    clinicalPresentation: {
      symptoms: ["Cough", "Sputum", "Fever", "Breathlessness", "Pleuritic pain", "Confusion in older adults"],
      signs: ["Crackles", "Bronchial breathing", "Dull percussion", "Hypoxaemia", "Tachycardia"],
      subjectiveFindings: ["Onset", "Aspiration risk", "Baseline mobility", "Sputum", "Antibiotic start time"],
      objectiveFindings: ["NEWS2", "SpO2 and oxygen delivery", "Chest auscultation", "Mobility tolerance", "Cough effectiveness"],
      functionalImpact: ["Reduced walking", "Bed rest", "Falls risk", "Breathlessness with ADLs"],
      redFlagSymptoms: ["Sepsis features", "Haemoptysis", "Severe pleuritic pain", "Confusion", "Rising oxygen requirement"],
      differentials: ["COPD exacerbation", "PE", "Heart failure", "Lung cancer", "Atelectasis"],
    },
    investigations: investigationLibrary.filter((i) => ["fbc", "crp", "u-e", "abg-vbg", "cxr", "cultures"].includes(i.id)),
    medicalManagement: {
      firstLine: ["Antibiotics according to severity and local policy", "Oxygen if below target", "Fluids if dehydrated", "Analgesia for pleuritic pain", "VTE prophylaxis if admitted and appropriate"],
      medications: [
        medication("Antibiotics", ["Amoxicillin", "Doxycycline", "Co-amoxiclav", "IV options per policy"], "Inhibit or kill likely pathogens.", "Treat bacterial pneumonia or secondary bacterial infection.", ["GI upset", "Allergy", "C. difficile risk"], "Fatigue, diarrhoea or nausea can limit rehab tolerance; infection control matters."),
        medication("Analgesia", ["Paracetamol", "Opioids if severe pain"], "Reduces pain and sympathetic stress.", "Supports cough, deep breathing and mobilisation.", ["Drowsiness", "Constipation", "Nausea"], "Pain control may enable breathing exercises; sedation raises falls and respiratory risk."),
      ],
      monitoring: ["NEWS2", "Temperature", "SpO2", "Fluid balance", "CRP/WCC trend", "Sputum"],
      oxygenTherapy: "Titrate to prescribed target range and escalate if requirement rises or work of breathing worsens.",
      escalationOptions: ["Sepsis pathway", "Senior respiratory review", "Critical care outreach", "Repeat imaging if not improving"],
      mdtInvolvement: ["Medical team", "Nursing", "Pharmacist", "Physio", "Dietitian", "Speech and language therapy if aspiration risk"],
      urgentMedicalReview: ["Sepsis signs", "New confusion", "Hypotension", "Severe hypoxaemia", "Reduced consciousness"],
    },
    physiotherapyRelevance: {
      whyItMatters: "Input focuses on oxygen response, mobility, sputum clearance where retained, positioning and preventing deconditioning.",
      assessmentConsiderations: ["Severity", "oxygen", "sputum", "pain", "frailty", "aspiration risk"],
      functionalImpact: ["Fatigue", "desaturation on exertion", "reduced transfers"],
      treatmentPrecautions: ["Monitor oxygen", "avoid excessive fatigue", "infection control", "pain-limited cough"],
      rehabilitationConsiderations: ["Upright positioning", "ACBT if sputum retained", "early mobilisation", "pacing"],
      dischargePlanning: ["Baseline recovery", "falls risk", "ongoing oxygen", "community support"],
      pauseOrEscalate: ["NEWS2 rise", "new confusion", "severe desaturation", "hypotension"],
    },
    respiratoryPhysioTreatments: airwayClearance,
    treatmentReasoningTable: [
      reasoning("pneumonia-antibiotics", "Antibiotics", "medical", "Target likely organisms.", "Treat infection and reduce inflammatory burden.", "When pneumonia is clinically diagnosed according to local policy.", "Allergy, renal function and C. difficile risk.", "Improving infection control and symptoms supports rehab tolerance.", "Antibiotics noted; physio session timed around fatigue and observations."),
      ...baseReasoningRows("pneumonia", "pneumonia"),
      ...airwayClearance.slice(0, 3).map((t) => reasoning(`pneumonia-${t.id}`, t.title, "physiotherapy", t.whyItHelps, t.whenToUse, t.whenToUse, t.cautions, "Useful when secretions, atelectasis or immobility are present.", t.documentationExample)),
    ],
    redFlags: ["Sepsis", "Acute respiratory deterioration", "Pleural effusion or empyema", "Unstable observations"],
    nhsConsiderations: {
      commonNhsSetting: ["AMU", "respiratory ward", "frailty ward"],
      referralPathways: ["Community follow-up", "SALT if aspiration", "respiratory review if recurrent"],
      mdtRoles: ["Doctors prescribe and review antibiotics", "Nurses monitor NEWS2", "Physio supports airway clearance and mobility"],
      medicalTeamInvolvement: ["Severity scoring", "antibiotics", "fluid and oxygen plans"],
      dischargePlanningPoints: ["Mobility baseline", "oxygen need", "support at home", "safety-netting"],
      localTrustPolicyReminders: ["Antibiotic guideline", "oxygen policy", "sepsis screening"],
      patientEducationConsiderations: ["Complete medicines", "hydration", "breathlessness recovery", "when to seek help"],
    },
    revisionSummary: {
      pathophysiologyPoints: ["Alveolar exudate", "Consolidation", "V/Q mismatch", "Systemic inflammation", "Possible sepsis"],
      medicalManagementPoints: ["Antibiotics", "oxygen", "fluids", "analgesia", "monitor response"],
      physiotherapyRelevancePoints: ["Positioning", "airway clearance if secretions", "early mobilisation"],
      commonMistakes: ["Assuming all crackles need airway clearance", "Ignoring sepsis signs", "Mobilising without oxygen plan"],
      interviewTalkingPoints: ["Link consolidation to hypoxaemia", "Explain CURB-style severity thinking without replacing medical scoring", "Describe when to stop physio"],
    },
    flashcards: makeCards("pneumonia", "Pneumonia", "Infection fills alveoli with inflammatory exudate, causing consolidation and V/Q mismatch.", "Antibiotics, oxygen, fluids, analgesia and monitoring.", "CXR often confirms consolidation; bloods and cultures guide severity and treatment.", "Sepsis signs, confusion, hypotension or escalating oxygen."),
    quizQuestions: makeQuiz("pneumonia", "Pneumonia", "Alveolar infection causes exudate, consolidation and impaired gas exchange.", "Antibiotics and oxygen/supportive care are central, guided by severity and local policy.", "Chest X-ray, FBC/CRP and cultures may support diagnosis and severity monitoring.", "New confusion with fever, hypotension and rising respiratory rate", "Monitor SpO2 and NEWS2; use positioning, airway clearance if secretions and graded mobility."),
    sources: ["nice-pneumonia-ng250", ...sourceSet],
    dateLastReviewed: "2026-04-29",
  },
  {
    id: "bronchiectasis",
    title: "Bronchiectasis",
    specialty: "Respiratory",
    setting: ["Respiratory ward", "Community"],
    difficulty: "Band 5",
    overview: {
      definition: "Chronic abnormal bronchial dilatation associated with impaired mucus clearance and recurrent infection.",
      commonPatientGroups: ["People with recurrent chest infections", "Post-infective lung damage", "Immune or inflammatory conditions"],
      commonNhsSettings: ["Respiratory outpatients", "community respiratory", "respiratory ward during exacerbation"],
      whyPhysiosNeedToUnderstandIt: "Airway clearance, sputum monitoring and exacerbation recognition are central physiotherapy contributions.",
    },
    pathophysiology: {
      normal: "Cilia, airway calibre and mucus hydration work together to clear inhaled particles and organisms.",
      whatGoesWrong: "Bronchi become widened and scarred, mucus pools and infection-inflammation cycles further damage the airway wall.",
      diseaseMechanism: "Impaired clearance permits colonisation; neutrophilic inflammation releases enzymes that injure elastin and cartilage, worsening airway distortion.",
      levels: "Airway wall damage, mucus gland changes and bacterial load create chronic sputum and airflow limitation.",
      acuteVsChronic: "Chronic daily sputum may flare into exacerbations with greater volume, purulence, breathlessness and systemic symptoms.",
      symptomLink: "Pooled secretions cause cough, sputum and crackles; infection drives fever, fatigue and haemoptysis risk.",
      functionLink: "Daily sputum routines, breathlessness and fatigue can limit work, sleep, exercise and social participation.",
      complications: ["Haemoptysis", "Recurrent pneumonia", "Respiratory failure", "Reduced exercise capacity"],
      prognosis: "Stable disease can be managed with airway clearance and exacerbation plans; frequent infections increase decline risk.",
    },
    clinicalPresentation: {
      symptoms: ["Chronic productive cough", "Large volume sputum", "Exacerbations", "Breathlessness", "Fatigue"],
      signs: ["Crackles", "Wheeze", "Clubbing in some cases", "Desaturation in advanced disease"],
      subjectiveFindings: ["Usual sputum colour/volume", "Airway clearance routine", "Exacerbation frequency", "Haemoptysis history"],
      objectiveFindings: ["Sputum sample", "Chest auscultation", "Exercise tolerance", "SpO2 response"],
      functionalImpact: ["Time-consuming airway clearance", "reduced endurance", "sleep disruption"],
      redFlagSymptoms: ["Significant haemoptysis", "Sepsis signs", "Severe breathlessness", "rapid oxygen increase"],
      differentials: ["COPD", "Cystic fibrosis", "TB", "Lung cancer", "Pneumonia"],
    },
    investigations: investigationLibrary.filter((i) => ["fbc", "crp", "cxr", "ct", "spirometry", "cultures", "abg-vbg"].includes(i.id)),
    medicalManagement: {
      firstLine: ["Treat exacerbations with antibiotics guided by sputum and local policy", "Vaccination and prevention", "Bronchodilators if coexisting obstruction", "Specialist respiratory follow-up"],
      medications: [
        medication("Antibiotics", ["Culture-guided oral or IV antibiotics"], "Reduce bacterial load during exacerbation.", "Treat infective flares and reduce inflammatory damage.", ["GI upset", "resistance", "allergy"], "Sputum monitoring and fatigue influence treatment timing."),
        medication("Mucoactive therapy", ["Nebulised saline where prescribed"], "May improve mucus hydration.", "Supports clearance for selected patients.", ["Bronchospasm", "cough irritation"], "Physios often assess response and coordinate airway clearance."),
      ],
      monitoring: ["Sputum colour and volume", "exacerbation frequency", "SpO2", "weight", "exercise tolerance"],
      oxygenTherapy: "Only if hypoxaemic and prescribed; monitor during exertion and airway clearance.",
      escalationOptions: ["Respiratory review", "IV antibiotics", "haemoptysis pathway", "admission for severe exacerbation"],
      mdtInvolvement: ["Respiratory consultant", "respiratory physio", "nurse specialist", "microbiology", "dietitian"],
      urgentMedicalReview: ["Haemoptysis", "sepsis signs", "marked desaturation", "pleuritic pain with PE concern"],
    },
    physiotherapyRelevance: {
      whyItMatters: "Airway clearance technique selection, adherence and review are core to bronchiectasis care.",
      assessmentConsiderations: ["Sputum load", "haemoptysis", "technique preference", "exacerbation status"],
      functionalImpact: ["Fatigue", "reduced activity", "social embarrassment from sputum"],
      treatmentPrecautions: ["Haemoptysis", "bronchospasm", "desaturation", "infection control"],
      rehabilitationConsiderations: ["ACT choice", "PEP", "exercise", "pacing"],
      dischargePlanning: ["Clearance plan", "sputum sample advice", "when to seek review"],
      pauseOrEscalate: ["fresh haemoptysis", "sepsis", "severe desaturation"],
    },
    respiratoryPhysioTreatments: airwayClearance,
    treatmentReasoningTable: [
      reasoning("bronch-airway-clearance", "Individualised airway clearance", "physiotherapy", "Uses airflow, positioning and pressure changes to move secretions.", "Reduces sputum retention and symptom burden.", "Stable daily routine and exacerbations with increased sputum.", "Avoid or modify with haemoptysis or severe bronchospasm.", "Core physiotherapy intervention.", "Airway clearance plan reviewed; sputum response and warning signs documented."),
      ...baseReasoningRows("bronchiectasis", "bronchiectasis"),
      ...airwayClearance.map((t) => reasoning(`bronch-${t.id}`, t.title, "physiotherapy", t.whyItHelps, t.whenToUse, t.whenToUse, t.cautions, "Match technique to sputum load, preference and safety.", t.documentationExample)),
    ],
    redFlags: ["Haemoptysis", "Sepsis", "Acute respiratory deterioration"],
    nhsConsiderations: {
      commonNhsSetting: ["Respiratory outpatient", "community", "respiratory ward"],
      referralPathways: ["Specialist respiratory physiotherapy", "microbiology", "community respiratory team"],
      mdtRoles: ["Microbiology guides antibiotics", "physio optimises clearance", "medical team screens causes"],
      medicalTeamInvolvement: ["Exacerbation treatment", "haemoptysis management", "CT and cultures"],
      dischargePlanningPoints: ["Technique independence", "follow-up", "sputum plan"],
      localTrustPolicyReminders: ["PEP provision", "nebuliser policy", "infection control"],
      patientEducationConsiderations: ["Sputum colour changes", "routine adherence", "hydration", "exacerbation action plan"],
    },
    revisionSummary: {
      pathophysiologyPoints: ["Bronchial dilatation", "mucus pooling", "infection-inflammation cycle", "airway wall damage", "haemoptysis risk"],
      medicalManagementPoints: ["Culture-guided antibiotics", "vaccination", "specialist review", "mucoactives in selected cases", "monitor exacerbations"],
      physiotherapyRelevancePoints: ["ACT selection", "sputum monitoring", "exercise tolerance"],
      commonMistakes: ["Ignoring haemoptysis", "one-size-fits-all airway clearance", "not documenting sputum"],
      interviewTalkingPoints: ["Explain vicious cycle", "compare ACBT and PEP", "escalate haemoptysis"],
    },
    flashcards: makeCards("bronchiectasis", "Bronchiectasis", "Damaged dilated bronchi impair mucus clearance and create infection-inflammation cycles.", "Antibiotics for exacerbations, prevention and specialist respiratory care.", "CT confirms bronchial dilatation; sputum culture guides antibiotics.", "Haemoptysis, sepsis or acute respiratory deterioration."),
    quizQuestions: makeQuiz("bronchiectasis", "Bronchiectasis", "Bronchial dilatation impairs mucus clearance and drives recurrent infection.", "Culture-guided antibiotics and prevention plans are key medical themes.", "CT and sputum culture are important investigations.", "Fresh significant haemoptysis during airway clearance", "Individualise airway clearance and stop if bleeding or instability develops."),
    sources: ["cochrane-placeholder", ...sourceSet],
    dateLastReviewed: "2026-04-29",
  },
  {
    id: "asthma",
    title: "Asthma",
    specialty: "Respiratory",
    setting: ["Community", "Emergency department", "Acute ward"],
    difficulty: "Band 5",
    overview: {
      definition: "A variable airway disease involving inflammation, bronchial hyperresponsiveness and reversible airflow obstruction.",
      commonPatientGroups: ["Children and adults", "People with atopy", "People exposed to triggers such as viral illness, allergens, smoke or exercise"],
      commonNhsSettings: ["Primary care", "ED", "acute admissions", "respiratory clinic"],
      whyPhysiosNeedToUnderstandIt: "Physios need to recognise poor control, acute deterioration, exercise-related symptoms and medication effects before treatment.",
    },
    pathophysiology: {
      normal: "Airways regulate calibre while cilia and mucus protect the lungs; ventilation increases smoothly with exertion.",
      whatGoesWrong: "Inflamed hyperresponsive airways narrow episodically due to bronchoconstriction, mucosal oedema and mucus.",
      diseaseMechanism: "Triggers activate inflammatory pathways, smooth muscle constricts and airflow limitation becomes variable, especially on expiration.",
      levels: "Cellular inflammatory mediators affect airway epithelium; tissue oedema narrows bronchi; system-level obstruction creates wheeze and air trapping.",
      acuteVsChronic: "Acute attacks can deteriorate quickly; chronic poor control may remodel airways and reduce exercise confidence.",
      symptomLink: "Narrowed airways generate wheeze, cough, chest tightness and breathlessness, often variable over time.",
      functionLink: "Symptoms can limit sport, work, sleep and rehab participation, especially when triggers are not recognised.",
      complications: ["Life-threatening asthma attack", "Fatigue", "Anxiety", "Reduced activity", "Medication side effects"],
      prognosis: "Good control reduces risk, but acute severe asthma requires urgent medical management.",
    },
    clinicalPresentation: {
      symptoms: ["Wheeze", "Cough", "Chest tightness", "Breathlessness", "Nocturnal or trigger-related symptoms"],
      signs: ["Expiratory wheeze", "Tachypnoea", "Accessory muscle use", "Low peak flow", "Silent chest in severe attack"],
      subjectiveFindings: ["Triggers", "reliever use", "preventer adherence", "previous ICU/admission", "peak flow best"],
      objectiveFindings: ["SpO2", "PEFR", "RR", "speech ability", "work of breathing"],
      functionalImpact: ["Exercise avoidance", "sleep disturbance", "school or work absence"],
      redFlagSymptoms: ["Unable to complete sentences", "silent chest", "cyanosis", "exhaustion", "confusion"],
      differentials: ["Anaphylaxis", "COPD", "PE", "pneumonia", "vocal cord dysfunction"],
    },
    investigations: investigationLibrary.filter((i) => ["peak-flow", "spirometry", "abg-vbg", "cxr", "fbc", "crp"].includes(i.id)),
    medicalManagement: {
      firstLine: ["Reliever and anti-inflammatory inhaled therapy according to current guidance", "Acute bronchodilators", "Steroids for significant attacks", "Oxygen if hypoxaemic", "Emergency escalation for severe features"],
      medications: [
        medication("Inhaled corticosteroid-containing therapy", ["ICS-formoterol regimens per guidance", "maintenance inhaled corticosteroids"], "Reduces airway inflammation.", "Improves control and lowers exacerbation risk.", ["Oral thrush", "hoarse voice"], "Poor control affects exercise safety; check inhaler access and adherence prompts."),
        medication("Beta-2 agonist bronchodilators", ["Salbutamol", "Formoterol in combination inhalers"], "Relax bronchial smooth muscle.", "Relieve bronchoconstriction.", ["Tremor", "tachycardia", "palpitations"], "Monitor HR and symptoms during exercise."),
        medication("Systemic corticosteroids", ["Prednisolone"], "Suppress acute airway inflammation.", "Used in significant exacerbations.", ["Mood change", "hyperglycaemia", "sleep disruption"], "May affect energy, glucose and muscle symptoms."),
      ],
      monitoring: ["PEFR", "SpO2", "respiratory rate", "speech", "reliever use", "inhaler technique"],
      oxygenTherapy: "Use if hypoxaemic in acute attack; follow local emergency asthma policy.",
      escalationOptions: ["ED/medical emergency response", "nebulised therapy", "IV therapy per medical team", "critical care if life-threatening"],
      mdtInvolvement: ["GP/asthma nurse", "respiratory physician", "pharmacist", "physio for breathing pattern or exercise confidence when stable"],
      urgentMedicalReview: ["Silent chest", "exhaustion", "confusion", "cyanosis", "PEFR very low or falling"],
    },
    physiotherapyRelevance: {
      whyItMatters: "Most physio is not acute attack treatment, but safe exercise, breathing pattern work and recognition of deterioration matter.",
      assessmentConsiderations: ["Current control", "trigger history", "reliever use", "PEFR", "exercise response"],
      functionalImpact: ["exercise limitation", "anxiety about breathlessness", "sleep-related fatigue"],
      treatmentPrecautions: ["Avoid provoking symptoms", "ensure reliever available where appropriate", "stop severe wheeze"],
      rehabilitationConsiderations: ["Pacing", "breathing control if dysfunctional breathing", "graded exercise once stable"],
      dischargePlanning: ["Action plan awareness", "inhaler technique signposting", "trigger education"],
      pauseOrEscalate: ["severe breathlessness", "silent chest", "confusion", "cyanosis"],
    },
    respiratoryPhysioTreatments: [airwayClearance[0], airwayClearance[4]],
    treatmentReasoningTable: [
      reasoning("asthma-inhaled", "Inhaled anti-inflammatory therapy", "medical", "Targets airway inflammation.", "Reduces symptoms and future attacks.", "Long-term management and selected reliever strategies according to guidance.", "Adherence, technique and side effects matter.", "Poor control changes exercise risk.", "Discussed poor control indicators and advised medical/asthma nurse review."),
      ...baseReasoningRows("asthma", "asthma"),
    ],
    redFlags: ["Acute respiratory deterioration", "Unstable observations", "Anaphylaxis"],
    nhsConsiderations: {
      commonNhsSetting: ["Primary care", "ED", "respiratory clinic"],
      referralPathways: ["Asthma nurse", "respiratory clinic", "ED for severe attack"],
      mdtRoles: ["Medical/nursing lead acute management", "pharmacist checks inhaler", "physio supports exercise or breathing pattern when stable"],
      medicalTeamInvolvement: ["acute severity", "steroids", "oxygen", "admission"],
      dischargePlanningPoints: ["Action plan", "follow-up", "inhaler technique", "trigger management"],
      localTrustPolicyReminders: ["Acute asthma pathway", "nebuliser policy", "oxygen policy"],
      patientEducationConsiderations: ["Seek urgent help for severe symptoms", "avoid over-reliance on reliever", "know personal plan"],
    },
    revisionSummary: {
      pathophysiologyPoints: ["Airway inflammation", "bronchial hyperresponsiveness", "bronchoconstriction", "mucus", "variable airflow obstruction"],
      medicalManagementPoints: ["ICS-containing treatment", "relievers", "steroids for attacks", "oxygen if hypoxaemic", "urgent escalation for life-threatening signs"],
      physiotherapyRelevancePoints: ["Recognise attack", "safe graded exercise", "breathing pattern support when stable"],
      commonMistakes: ["Treating severe asthma as anxiety", "continuing exercise into wheeze", "forgetting inhaler technique"],
      interviewTalkingPoints: ["Explain silent chest", "medication side effects", "exercise precautions"],
    },
    flashcards: makeCards("asthma", "Asthma", "Variable airway inflammation causes bronchoconstriction, mucus and expiratory airflow limitation.", "ICS-containing therapy and bronchodilators are central; severe attacks need urgent medical care.", "Peak flow and spirometry support monitoring; ABG is for severe cases.", "Silent chest, exhaustion, cyanosis or confusion."),
    quizQuestions: makeQuiz("asthma", "Asthma", "Hyperresponsive inflamed airways narrow variably and cause wheeze and air trapping.", "Anti-inflammatory inhaled therapy and bronchodilators are central management themes.", "Peak flow or spirometry helps assess variable airflow limitation.", "Silent chest with exhaustion", "Stop exercise and escalate if severe symptoms or poor response to reliever occur."),
    sources: ["nice-asthma-ng245", ...sourceSet],
    dateLastReviewed: "2026-04-29",
  },
  {
    id: "pulmonary-embolism",
    title: "Pulmonary embolism",
    specialty: "Respiratory",
    setting: ["Emergency department", "Acute ward", "Respiratory ward"],
    difficulty: "Band 6",
    overview: {
      definition: "Obstruction of pulmonary arterial circulation, usually by thrombus from the deep veins.",
      commonPatientGroups: ["Post-operative patients", "immobile or frail patients", "cancer", "pregnancy/postpartum", "previous VTE"],
      commonNhsSettings: ["ED", "AMU", "respiratory ward", "post-operative wards"],
      whyPhysiosNeedToUnderstandIt: "PE can mimic deconditioning or respiratory disease; mobilisation decisions depend on anticoagulation, haemodynamic stability and local policy.",
    },
    pathophysiology: {
      normal: "Pulmonary arteries carry deoxygenated blood to ventilated alveoli for gas exchange with low vascular resistance.",
      whatGoesWrong: "A clot blocks part of the pulmonary vascular bed, increasing dead space and right ventricular afterload.",
      diseaseMechanism: "Obstruction and mediator release create V/Q mismatch, hypoxaemia, tachycardia and potential right heart strain.",
      levels: "Vascular occlusion affects perfusion; organ-level RV strain can reduce cardiac output; system-level shock may occur in massive PE.",
      acuteVsChronic: "Acute PE may resolve with treatment, but recurrent PE can lead to chronic thromboembolic pulmonary hypertension.",
      symptomLink: "Pleuritic pain, acute breathlessness, tachycardia and haemoptysis arise from vascular obstruction and pleural irritation.",
      functionLink: "Breathlessness, anxiety, tachycardia and anticoagulation considerations limit mobility until medically stable.",
      complications: ["Shock", "right heart strain", "hypoxaemia", "recurrent VTE", "chronic pulmonary hypertension"],
      prognosis: "Risk depends on clot burden, RV strain and comorbidity; timely anticoagulation and escalation are critical.",
    },
    clinicalPresentation: {
      symptoms: ["Sudden breathlessness", "pleuritic chest pain", "haemoptysis", "syncope", "calf pain/swelling"],
      signs: ["Tachycardia", "tachypnoea", "low SpO2", "hypotension if severe", "DVT signs"],
      subjectiveFindings: ["VTE risk factors", "recent surgery", "immobility", "cancer", "anticoagulant status"],
      objectiveFindings: ["SpO2", "HR/BP", "mobility tolerance", "calf screen within scope", "work of breathing"],
      functionalImpact: ["Reduced walking tolerance", "fear of exertion", "monitoring needs"],
      redFlagSymptoms: ["Syncope", "hypotension", "severe chest pain", "haemoptysis", "severe hypoxaemia"],
      differentials: ["MI", "pneumonia", "pneumothorax", "COPD exacerbation", "anxiety/panic"],
    },
    investigations: investigationLibrary.filter((i) => ["d-dimer", "ct", "ecg", "troponin", "abg-vbg", "cxr", "fbc", "u-e"].includes(i.id)),
    medicalManagement: {
      firstLine: ["Risk stratification", "Anticoagulation when indicated", "Oxygen if hypoxaemic", "Thrombolysis or intervention for high-risk PE", "Treat provoking factors"],
      medications: [
        medication("Anticoagulants", ["LMWH", "Apixaban", "Rivaroxaban", "Warfarin"], "Reduce clot extension and recurrence.", "Main treatment for most confirmed or strongly suspected PE.", ["Bleeding", "bruising", "drug interactions"], "Check falls risk, haemoptysis, post-op restrictions and local mobilisation policy."),
        medication("Thrombolytic therapy", ["Alteplase"], "Breaks down clot rapidly.", "Reserved for selected life-threatening PE with instability.", ["Major bleeding", "intracranial haemorrhage"], "Physio usually pauses; mobilisation only after senior medical guidance."),
      ],
      monitoring: ["SpO2", "HR/BP", "bleeding", "chest pain", "RV strain markers", "anticoagulation plan"],
      oxygenTherapy: "Give if hypoxaemic; escalating oxygen need requires medical review.",
      escalationOptions: ["Urgent medical review", "critical care", "thrombolysis pathway", "interventional radiology/cardiology in selected cases"],
      mdtInvolvement: ["Medical team", "haematology", "pharmacy", "critical care", "physio after stability"],
      urgentMedicalReview: ["Hypotension", "syncope", "severe hypoxaemia", "new haemoptysis", "suspected bleeding on anticoagulants"],
    },
    physiotherapyRelevance: {
      whyItMatters: "Physios may identify unexplained deterioration and need to balance mobilisation benefits against instability or bleeding risk.",
      assessmentConsiderations: ["confirmed/suspected status", "anticoagulation timing", "observations", "bleeding risk", "DVT symptoms"],
      functionalImpact: ["breathlessness", "tachycardia", "reduced confidence"],
      treatmentPrecautions: ["Do not treat unstable suspected PE as routine rehab", "check local mobilisation guidance", "watch bleeding"],
      rehabilitationConsiderations: ["graded mobility once stable", "pacing", "education within scope"],
      dischargePlanning: ["falls risk on anticoagulation", "breathlessness recovery", "VTE clinic follow-up"],
      pauseOrEscalate: ["chest pain", "syncope", "hypotension", "new haemoptysis"],
    },
    respiratoryPhysioTreatments: [airwayClearance[0], airwayClearance[4]],
    treatmentReasoningTable: [
      reasoning("pe-anticoag", "Anticoagulation", "medical", "Prevents clot propagation and recurrence.", "Allows endogenous fibrinolysis to work over time.", "Confirmed or suspected PE according to medical decision-making.", "Bleeding, falls and post-op risk.", "Check status before mobilisation and document response.", "Mobilised after confirmation of medical stability and anticoagulation plan."),
      ...baseReasoningRows("pulmonary-embolism", "pulmonary embolism"),
    ],
    redFlags: ["Pulmonary embolism", "Cardiac chest pain", "Acute respiratory deterioration", "DVT"],
    nhsConsiderations: {
      commonNhsSetting: ["ED", "AMU", "post-op ward"],
      referralPathways: ["VTE clinic", "respiratory follow-up", "anticoagulation clinic"],
      mdtRoles: ["Medical team leads diagnosis", "pharmacy supports anticoagulation", "physio supports graded function once stable"],
      medicalTeamInvolvement: ["risk stratification", "anticoagulation", "thrombolysis decisions"],
      dischargePlanningPoints: ["anticoagulant education", "bleeding safety", "mobility tolerance", "follow-up"],
      localTrustPolicyReminders: ["VTE pathway", "mobilisation after PE policy", "anticoagulation guidance"],
      patientEducationConsiderations: ["bleeding warning signs", "return for chest pain or severe breathlessness", "graded activity advice"],
    },
    revisionSummary: {
      pathophysiologyPoints: ["Pulmonary arterial obstruction", "V/Q mismatch", "dead space", "RV strain", "shock risk"],
      medicalManagementPoints: ["anticoagulation", "oxygen", "risk stratification", "thrombolysis in severe cases", "monitor bleeding"],
      physiotherapyRelevancePoints: ["recognise unexplained deterioration", "mobilise once stable", "falls risk on anticoagulants"],
      commonMistakes: ["Assuming anxiety", "mobilising unstable patient", "forgetting bleeding risk"],
      interviewTalkingPoints: ["Explain PE physiology", "mobility safety after anticoagulation", "red flags"],
    },
    flashcards: makeCards("pulmonary-embolism", "Pulmonary embolism", "A clot blocks pulmonary perfusion, causing V/Q mismatch and right heart strain.", "Anticoagulation is central; unstable cases may need thrombolysis or critical care.", "CTPA, D-dimer pathways, ECG/troponin and observations support diagnosis and risk.", "Syncope, hypotension, severe hypoxaemia or haemoptysis."),
    quizQuestions: makeQuiz("pulmonary-embolism", "Pulmonary embolism", "Pulmonary arterial clot increases dead space and can strain the right ventricle.", "Anticoagulation is the main treatment for many stable confirmed PEs.", "CT pulmonary angiography and D-dimer pathways may be used.", "Hypotension and syncope with acute breathlessness", "Check medical stability and anticoagulation plan before mobilisation."),
    sources: ["nhs-conditions", "local-trust-placeholder", "textbook-placeholder"],
    dateLastReviewed: "2026-04-29",
  },
  {
    id: "stroke",
    title: "Stroke",
    specialty: "Neurology",
    setting: ["Stroke unit", "Acute ward", "Community"],
    difficulty: "Band 5",
    overview: {
      definition: "A sudden focal neurological deficit caused by interruption of cerebral blood supply or intracranial bleeding.",
      commonPatientGroups: ["Older adults", "atrial fibrillation", "hypertension", "diabetes", "vascular risk factors"],
      commonNhsSettings: ["Hyperacute stroke unit", "stroke rehab ward", "early supported discharge", "community neuro"],
      whyPhysiosNeedToUnderstandIt: "Physios must link lesion effects to movement, balance, perception, fatigue, safety and recovery potential.",
    },
    pathophysiology: {
      normal: "Brain tissue relies on continuous oxygen and glucose delivery; motor, sensory and cognitive networks coordinate movement.",
      whatGoesWrong: "Ischaemia or haemorrhage injures neurons and supporting cells, disrupting networks controlling movement, sensation, balance, speech or attention.",
      diseaseMechanism: "Ischaemic core tissue dies quickly while penumbra may be salvageable; haemorrhage adds mass effect and pressure injury.",
      levels: "Cellular energy failure, excitotoxicity and oedema create tissue damage; system-level network disruption produces UMN signs and functional impairment.",
      acuteVsChronic: "Acute priorities are reperfusion/bleed management and stability; chronic recovery depends on neuroplasticity, practice and secondary prevention.",
      symptomLink: "Weakness, sensory loss, neglect, dysphasia or ataxia reflect the affected vascular territory and networks.",
      functionLink: "Impairments affect transfers, walking, arm use, swallowing safety, cognition and discharge needs.",
      complications: ["Falls", "aspiration pneumonia", "DVT", "shoulder pain", "spasticity", "fatigue", "depression"],
      prognosis: "Recovery is variable; early specialist stroke care and task-specific rehabilitation improve outcomes.",
    },
    clinicalPresentation: {
      symptoms: ["Face/arm/leg weakness", "speech disturbance", "vision loss", "sensory change", "sudden severe headache in some bleeds"],
      signs: ["UMN weakness", "hyperreflexia later", "neglect", "ataxia", "altered tone", "balance impairment"],
      subjectiveFindings: ["time of onset", "baseline function", "vascular risks", "swallow status", "fatigue"],
      objectiveFindings: ["tone", "strength", "sensation", "coordination", "sitting/standing balance", "gait"],
      functionalImpact: ["transfers", "walking", "upper limb function", "ADLs", "communication"],
      redFlagSymptoms: ["new neurological deterioration", "reduced consciousness", "severe headache", "new chest pain", "swallow/airway compromise"],
      differentials: ["TIA", "hypoglycaemia", "seizure", "migraine", "brain tumour", "functional neurological disorder"],
    },
    investigations: investigationLibrary.filter((i) => ["ct", "mri", "ecg", "fbc", "u-e", "cultures"].includes(i.id)),
    medicalManagement: {
      firstLine: ["Urgent brain imaging", "thrombolysis/thrombectomy assessment for eligible ischaemic stroke", "BP and glucose management", "swallow screen", "secondary prevention"],
      medications: [
        medication("Antiplatelets", ["Aspirin", "Clopidogrel"], "Reduce platelet aggregation.", "Secondary prevention for many ischaemic stroke patients.", ["Bleeding", "bruising", "GI irritation"], "Falls risk and bruising matter during mobility practice."),
        medication("Anticoagulants", ["Apixaban", "Warfarin"], "Reduce clot formation in AF-related stroke risk.", "Secondary prevention when indicated.", ["Bleeding", "drug interactions"], "Check timing after stroke and falls risk."),
        medication("Statins and antihypertensives", ["Atorvastatin", "ACE inhibitors"], "Reduce vascular risk.", "Secondary prevention.", ["Dizziness", "muscle aches", "hypotension"], "Monitor dizziness, postural BP and exercise tolerance."),
      ],
      monitoring: ["Neurological observations", "BP", "swallow status", "glucose", "mobility and falls risk"],
      escalationOptions: ["Stroke registrar", "hyperacute stroke team", "medical emergency response", "SALT for swallow", "neuropsychology"],
      mdtInvolvement: ["Stroke consultant", "nurse", "physio", "OT", "SALT", "dietitian", "psychology", "social work"],
      urgentMedicalReview: ["New weakness", "reduced consciousness", "seizure", "aspiration", "chest pain", "suspected DVT/PE"],
    },
    physiotherapyRelevance: {
      whyItMatters: "Physio assessment identifies impairment drivers, handling needs, mobility safety and task practice priorities.",
      assessmentConsiderations: ["medical stability", "swallow and fatigue", "neglect", "tone", "shoulder risk"],
      functionalImpact: ["bed mobility", "transfers", "walking", "stairs", "arm function"],
      treatmentPrecautions: ["BP extremes", "neurological deterioration", "unsafe swallow/airway", "fatigue overload"],
      rehabilitationConsiderations: ["task-specific practice", "strength", "balance", "gait", "family training"],
      dischargePlanning: ["equipment", "carer support", "ESD", "falls risk", "home environment"],
      pauseOrEscalate: ["new neuro signs", "chest pain", "sudden severe headache", "collapse"],
    },
    respiratoryPhysioTreatments: [],
    treatmentReasoningTable: [
      reasoning("stroke-thrombolysis", "Thrombolysis or thrombectomy assessment", "medical", "Restores or improves blood flow in eligible ischaemic stroke.", "Limits brain injury when used within strict criteria.", "Hyperacute phase only under stroke team.", "Bleeding risk and strict eligibility.", "Know post-procedure precautions and neuro observation sensitivity.", "Therapy timed around stroke unit guidance and neurological status."),
      reasoning("stroke-task-practice", "Task-specific rehabilitation", "physiotherapy", "Uses repeated meaningful practice to drive motor learning and neuroplasticity.", "Improves transfers, gait and functional independence.", "When medically stable and goals are clear.", "Avoid excessive fatigue, unsafe BP or new neuro signs.", "Core rehab method after stroke.", "Sit-to-stand practice completed with assistance level and response documented."),
      ...baseReasoningRows("stroke", "stroke"),
    ],
    redFlags: ["Acute stroke", "Neurological deterioration", "DVT", "Aspiration"],
    nhsConsiderations: {
      commonNhsSetting: ["HASU", "stroke unit", "community ESD"],
      referralPathways: ["Early supported discharge", "community neuro rehab", "spasticity clinic", "orthotics"],
      mdtRoles: ["SALT swallowing and communication", "OT ADLs", "physio mobility", "nursing 24-hour rehab"],
      medicalTeamInvolvement: ["acute diagnosis", "secondary prevention", "complications"],
      dischargePlanningPoints: ["home access", "carers", "equipment", "risk plan"],
      localTrustPolicyReminders: ["stroke pathway", "manual handling", "falls", "shoulder care"],
      patientEducationConsiderations: ["fatigue", "secondary prevention", "safe practice", "family involvement"],
    },
    revisionSummary: {
      pathophysiologyPoints: ["ischaemia or haemorrhage", "penumbra", "UMN signs", "neuroplasticity", "complications"],
      medicalManagementPoints: ["urgent imaging", "reperfusion assessment", "secondary prevention", "swallow screen", "risk monitoring"],
      physiotherapyRelevancePoints: ["task practice", "balance/gait", "discharge planning"],
      commonMistakes: ["missing new deterioration", "over-fatiguing", "poor shoulder handling"],
      interviewTalkingPoints: ["vascular territories", "tone vs weakness", "safe early mobilisation"],
    },
    flashcards: makeCards("stroke", "Stroke", "Focal brain injury from ischaemia or haemorrhage disrupts motor, sensory and cognitive networks.", "Urgent imaging, reperfusion assessment and secondary prevention.", "CT/MRI differentiates haemorrhage and ischaemia; ECG screens AF.", "New neurological deterioration or reduced consciousness."),
    quizQuestions: makeQuiz("stroke", "Stroke", "Brain ischaemia or bleeding damages networks controlling movement and function.", "Urgent imaging, reperfusion decisions and secondary prevention shape management.", "CT or MRI is central early investigation.", "New weakness during a physiotherapy session", "Stop, reassess neuro status and escalate urgently."),
    sources: ["nice-stroke-ng236", ...sourceSet],
    dateLastReviewed: "2026-04-29",
  },
  {
    id: "parkinsons-disease",
    title: "Parkinson's disease",
    specialty: "Neurology",
    setting: ["Community", "Neurology ward", "Frailty ward"],
    difficulty: "Band 5",
    overview: {
      definition: "A progressive neurodegenerative condition characterised by bradykinesia plus rigidity, tremor or postural instability.",
      commonPatientGroups: ["Older adults", "people with falls or freezing", "people admitted with medication timing problems"],
      commonNhsSettings: ["community neuro", "falls clinic", "acute wards", "neurology clinic"],
      whyPhysiosNeedToUnderstandIt: "Medication timing, freezing, falls, autonomic symptoms and swallowing/respiratory complications directly affect physiotherapy safety.",
    },
    pathophysiology: {
      normal: "Basal ganglia circuits help select, scale and automate movement using dopamine signalling.",
      whatGoesWrong: "Dopaminergic neurons degenerate, reducing basal ganglia output efficiency and impairing automatic movement.",
      diseaseMechanism: "Dopamine depletion alters direct and indirect pathways, causing bradykinesia, rigidity and reduced movement amplitude.",
      levels: "Cellular neurodegeneration affects substantia nigra; network dysfunction affects motor, autonomic, mood and cognitive systems.",
      acuteVsChronic: "Chronic progression can be punctuated by acute deterioration from missed medicines, infection or delirium.",
      symptomLink: "Bradykinesia causes slow movement; rigidity and postural changes affect gait; autonomic dysfunction can cause postural hypotension.",
      functionLink: "Transfers, gait initiation, turning, dual-tasking and falls risk are commonly affected.",
      complications: ["Falls", "aspiration", "freezing", "orthostatic hypotension", "delirium with admission", "deconditioning"],
      prognosis: "Progressive but variable; exercise, cueing, medicines and MDT support can maintain function.",
    },
    clinicalPresentation: {
      symptoms: ["Slowness", "stiffness", "tremor", "freezing", "falls", "fatigue", "constipation"],
      signs: ["bradykinesia", "rigidity", "shuffling gait", "reduced arm swing", "postural instability"],
      subjectiveFindings: ["medicine timings", "on/off periods", "falls", "freezing triggers", "swallow symptoms"],
      objectiveFindings: ["gait", "turning", "sit-to-stand", "balance", "postural BP"],
      functionalImpact: ["reduced walking confidence", "falls", "difficulty with ADLs"],
      redFlagSymptoms: ["sudden deterioration", "missed medicines", "new confusion", "aspiration symptoms", "syncope"],
      differentials: ["drug-induced parkinsonism", "stroke", "normal pressure hydrocephalus", "atypical parkinsonism"],
    },
    investigations: investigationLibrary.filter((i) => ["fbc", "u-e", "ct", "mri", "ecg"].includes(i.id)),
    medicalManagement: {
      firstLine: ["Dopaminergic medication tailored by specialist", "strict medicine timing in hospital", "falls and swallow assessment", "treat triggers for sudden decline"],
      medications: [
        medication("Dopamine replacement", ["Levodopa preparations"], "Increases dopamine availability.", "Improves bradykinesia and rigidity.", ["Dyskinesia", "nausea", "postural hypotension", "hallucinations"], "Schedule physio during best on period and monitor BP/mental state."),
        medication("Dopamine agonists and MAO-B inhibitors", ["Rotigotine", "Rasagiline"], "Stimulate dopamine pathways or reduce dopamine breakdown.", "Adjunct symptom control.", ["Sleepiness", "impulse control", "hypotension"], "Falls and alertness risks affect mobility."),
      ],
      monitoring: ["medicine timing", "falls", "swallow", "postural BP", "cognition"],
      escalationOptions: ["Parkinson's nurse", "neurology/geriatrics", "SALT", "pharmacy for missed doses"],
      mdtInvolvement: ["Parkinson's nurse", "pharmacist", "physio", "OT", "SALT", "dietitian"],
      urgentMedicalReview: ["sudden immobility", "neuroleptic malignant-like syndrome concern", "aspiration", "delirium", "syncope"],
    },
    physiotherapyRelevance: {
      whyItMatters: "Treatment timing, cueing and falls prevention are central to safe, useful rehab.",
      assessmentConsiderations: ["on/off state", "postural BP", "freezing", "cognition", "falls"],
      functionalImpact: ["transfers", "turning", "dual-task gait", "stairs"],
      treatmentPrecautions: ["hypotension", "fatigue", "freezing in clutter", "missed medicines"],
      rehabilitationConsiderations: ["external cueing", "large amplitude movement", "strength", "balance", "walking practice"],
      dischargePlanning: ["home hazards", "carer training", "medicine timing support", "community neuro"],
      pauseOrEscalate: ["syncope", "new confusion", "aspiration", "sudden severe decline"],
    },
    respiratoryPhysioTreatments: [],
    treatmentReasoningTable: [
      reasoning("pd-meds", "Time-critical Parkinson's medication", "medical", "Maintains dopaminergic state.", "Reduces off periods and immobility.", "Throughout admission and daily routine.", "Missed doses can cause marked deterioration.", "Plan sessions around on periods and escalate missed doses.", "Session completed during on period; freezing and BP response documented."),
      reasoning("pd-cueing", "Cueing and amplitude practice", "physiotherapy", "Uses external sensory cues and deliberate large movements to bypass impaired automaticity.", "Improves gait initiation, stride length and turning.", "Freezing, shuffling or reduced amplitude.", "Adapt for cognition, fatigue and falls risk.", "Core physiotherapy reasoning in Parkinson's.", "Auditory cueing trialled; stride length and freezing response recorded."),
      ...baseReasoningRows("parkinsons-disease", "Parkinson's disease"),
    ],
    redFlags: ["Neurological deterioration", "Falls with serious injury", "Safeguarding", "Unstable observations"],
    nhsConsiderations: {
      commonNhsSetting: ["community", "frailty ward", "neurology"],
      referralPathways: ["Parkinson's nurse", "community neuro", "falls service", "SALT"],
      mdtRoles: ["Pharmacist safeguards timing", "nurses monitor swallowing and falls", "physio supports gait and balance"],
      medicalTeamInvolvement: ["acute deterioration", "medicine changes", "delirium"],
      dischargePlanningPoints: ["falls plan", "equipment", "medicine support", "carers"],
      localTrustPolicyReminders: ["time-critical medicines", "falls", "swallow"],
      patientEducationConsiderations: ["cueing strategies", "activity", "falls safety", "medicine timing"],
    },
    revisionSummary: {
      pathophysiologyPoints: ["dopamine depletion", "basal ganglia circuits", "bradykinesia", "rigidity", "autonomic effects"],
      medicalManagementPoints: ["time-critical levodopa", "specialist titration", "side effects", "swallow", "treat triggers"],
      physiotherapyRelevancePoints: ["on/off timing", "cueing", "falls"],
      commonMistakes: ["ignoring medication timing", "missing postural hypotension", "dual-task overload"],
      interviewTalkingPoints: ["basal ganglia", "freezing strategy", "acute ward safety"],
    },
    flashcards: makeCards("parkinsons-disease", "Parkinson's disease", "Dopamine depletion in basal ganglia circuits impairs automatic movement.", "Levodopa and related medicines are time-critical and affect mobility.", "Clinical diagnosis is specialist-led; investigations often exclude differentials.", "Missed medicines, aspiration, syncope or sudden deterioration."),
    quizQuestions: makeQuiz("parkinsons-disease", "Parkinson's disease", "Dopaminergic degeneration disrupts basal ganglia movement scaling and automaticity.", "Time-critical dopaminergic medication shapes mobility and safety.", "Investigations may be used to exclude acute triggers or differentials.", "Sudden severe immobility after missed doses", "Schedule treatment in on period and monitor postural BP and freezing."),
    sources: ["nhs-conditions", ...sourceSet],
    dateLastReviewed: "2026-04-29",
  },
  {
    id: "low-back-pain",
    title: "Low back pain",
    specialty: "Musculoskeletal",
    setting: ["MSK outpatients", "Community"],
    difficulty: "Band 5",
    overview: {
      definition: "Pain or discomfort between the lower rib margins and buttock folds, with or without leg symptoms.",
      commonPatientGroups: ["Adults of working age", "older adults", "people with recurrent episodes"],
      commonNhsSettings: ["FCP", "MSK outpatients", "GP referral", "community"],
      whyPhysiosNeedToUnderstandIt: "Most cases are non-specific, but serious pathology and nerve compromise must be screened confidently.",
    },
    pathophysiology: {
      normal: "The lumbar spine, discs, joints, muscles and nervous system tolerate varied load and movement.",
      whatGoesWrong: "Pain may arise from sensitised spinal tissues, altered load tolerance, muscle guarding and nervous system amplification rather than a single visible lesion.",
      diseaseMechanism: "Mechanical, inflammatory, psychological and social factors interact to change nociception, movement confidence and function.",
      levels: "Tissue-level irritation can trigger pain; system-level sensitisation, sleep and stress can amplify symptoms.",
      acuteVsChronic: "Acute episodes often settle; persistent pain is influenced more by sensitisation, beliefs, conditioning and comorbidity.",
      symptomLink: "Guarding and sensitivity produce pain with bending, sitting or lifting; fear and poor sleep can increase perceived threat.",
      functionLink: "Pain reduces confidence with work, caring duties, transfers and exercise.",
      complications: ["Persistent disability", "work absence", "opioid reliance", "missed cauda equina or fracture"],
      prognosis: "Most improve, though recurrence is common; active self-management and red flag screening are key.",
    },
    clinicalPresentation: {
      symptoms: ["Back pain", "stiffness", "movement-related symptoms", "possible buttock or leg referral"],
      signs: ["guarding", "reduced range", "pain-limited function", "normal neuro exam in many cases"],
      subjectiveFindings: ["onset", "trauma", "systemic symptoms", "bladder/bowel/saddle symptoms", "work demands"],
      objectiveFindings: ["range", "neuro screen", "functional movements", "irritability", "gait"],
      functionalImpact: ["sitting", "lifting", "sleep", "work", "walking"],
      redFlagSymptoms: ["saddle anaesthesia", "new bladder/bowel dysfunction", "fever", "unexplained weight loss", "major trauma"],
      differentials: ["cauda equina", "fracture", "infection", "cancer", "inflammatory back pain", "renal/abdominal pathology"],
    },
    investigations: investigationLibrary.filter((i) => ["fbc", "crp", "mri", "ct"].includes(i.id)),
    medicalManagement: {
      firstLine: ["Advice to stay active", "analgesia review if needed", "screen red flags", "imaging only when indicated", "specialist referral for serious pathology or progressive deficit"],
      medications: [
        medication("Analgesia", ["Paracetamol in some contexts", "weak opioids only short term if appropriate"], "Reduces pain signalling.", "May support activity when pain is limiting.", ["drowsiness", "constipation", "nausea"], "Drowsiness and constipation affect mobility and safety."),
        medication("NSAIDs", ["Ibuprofen", "Naproxen"], "Reduce prostaglandin-mediated inflammation and pain.", "Short-term symptom control where safe.", ["GI bleed", "renal risk", "BP effects", "asthma sensitivity"], "Screen comorbidities and dizziness before exercise."),
      ],
      monitoring: ["neurological signs", "red flags", "function", "medicine side effects", "psychosocial barriers"],
      surgicalManagement: "Rare for non-specific pain; urgent surgical pathways for cauda equina or selected severe nerve compression.",
      escalationOptions: ["MSK interface", "spinal emergency pathway", "GP or ED", "pain service"],
      mdtInvolvement: ["GP", "FCP", "MSK physio", "spinal triage", "occupational health"],
      urgentMedicalReview: ["cauda equina symptoms", "progressive neurological deficit", "suspected infection/cancer/fracture"],
    },
    physiotherapyRelevance: {
      whyItMatters: "Physio helps classify risk, reassure, restore activity and identify serious pathology.",
      assessmentConsiderations: ["red flags", "neuro screen", "yellow flags", "irritability", "goals"],
      functionalImpact: ["work", "lifting", "sleep", "walking"],
      treatmentPrecautions: ["do not manipulate or exercise through red flags", "progress load gradually"],
      rehabilitationConsiderations: ["education", "graded activity", "strength", "return to work"],
      dischargePlanning: ["self-management", "flare plan", "work advice", "when to seek help"],
      pauseOrEscalate: ["cauda equina", "progressive deficit", "systemic illness"],
    },
    respiratoryPhysioTreatments: [],
    treatmentReasoningTable: [
      reasoning("lbp-education", "Education and active self-management", "education", "Reduces threat and supports graded return to normal movement.", "Most low back pain is not serious and benefits from activity.", "After screening red flags and neurological status.", "Avoid false reassurance if serious features present.", "Core MSK physiotherapy role.", "Explained findings, red flags and graded plan; patient goals documented."),
      ...baseReasoningRows("low-back-pain", "low back pain"),
    ],
    redFlags: ["Cauda equina syndrome", "Spinal fracture", "Infection", "Cancer"],
    nhsConsiderations: {
      commonNhsSetting: ["FCP", "MSK outpatient", "GP"],
      referralPathways: ["spinal emergency", "MSK interface", "pain service", "occupational health"],
      mdtRoles: ["FCP screens and manages", "GP prescribes/investigates", "spinal team handles urgent pathology"],
      medicalTeamInvolvement: ["red flags", "medicines", "imaging decisions"],
      dischargePlanningPoints: ["return to activity", "work advice", "flare plan"],
      localTrustPolicyReminders: ["cauda equina pathway", "imaging referral criteria"],
      patientEducationConsiderations: ["red flags", "stay active", "sleep and pacing"],
    },
    revisionSummary: {
      pathophysiologyPoints: ["multifactorial pain", "tissue sensitivity", "guarding", "sensitisation", "psychosocial interaction"],
      medicalManagementPoints: ["red flag screen", "limited imaging", "analgesia review", "urgent referral for CES", "self-management"],
      physiotherapyRelevancePoints: ["neuro screen", "education", "graded activity"],
      commonMistakes: ["over-pathologising scans", "missing CES", "passive-only care"],
      interviewTalkingPoints: ["explain non-specific LBP", "red flags", "yellow flags"],
    },
    flashcards: makeCards("low-back-pain", "Low back pain", "Usually multifactorial with tissue sensitivity, load tolerance and nervous system contributors.", "Advice, analgesia review and escalation only when indicated.", "MRI is reserved for serious pathology or specific indications, not routine pain.", "Saddle anaesthesia or bladder/bowel change."),
    quizQuestions: makeQuiz("low-back-pain", "Low back pain", "Pain commonly reflects sensitised tissues and nervous system response rather than one structural fault.", "Medical management emphasises red flag screening, advice and appropriate analgesia rather than routine imaging.", "MRI is useful when serious pathology or cauda equina is suspected.", "New urinary retention with saddle numbness", "Screen red flags and neuro status, then use education and graded activity."),
    sources: ["nhs-conditions", "local-trust-placeholder", "textbook-placeholder"],
    dateLastReviewed: "2026-04-29",
  },
  {
    id: "sciatica",
    title: "Sciatica",
    specialty: "Musculoskeletal",
    setting: ["MSK outpatients", "Community", "Emergency department"],
    difficulty: "Band 5",
    overview: {
      definition: "Leg-dominant pain in a sciatic distribution, commonly from lumbar nerve root irritation or compression.",
      commonPatientGroups: ["Adults with disc-related symptoms", "people with foraminal stenosis", "manual workers or sedentary workers"],
      commonNhsSettings: ["FCP", "MSK outpatients", "spinal triage", "ED if severe"],
      whyPhysiosNeedToUnderstandIt: "Neurological deficit and cauda equina screening determine urgency and safety.",
    },
    pathophysiology: {
      normal: "Lumbar nerve roots transmit motor, sensory and reflex information through foramina with adequate blood supply and space.",
      whatGoesWrong: "Disc material, inflammation or foraminal narrowing irritates the nerve root, creating radicular pain and possible conduction change.",
      diseaseMechanism: "Mechanical compression and inflammatory mediators sensitise the dorsal root ganglion, producing sharp leg pain and neural mechanosensitivity.",
      levels: "Nerve-root inflammation affects sensory fibres first; severe compression can impair myotomes and reflexes.",
      acuteVsChronic: "Acute disc-related sciatica often improves; chronic compression or stenosis may cause persistent symptoms.",
      symptomLink: "Dermatomal pain, paraesthesia, weakness and reflex changes map to the involved root.",
      functionLink: "Sitting, bending, walking or sleep may be limited by leg pain and neurodynamic sensitivity.",
      complications: ["Progressive neurological deficit", "cauda equina syndrome", "persistent disability"],
      prognosis: "Many improve conservatively, but progressive deficit or CES symptoms require urgent escalation.",
    },
    clinicalPresentation: {
      symptoms: ["leg-dominant pain", "paraesthesia", "numbness", "back pain", "cough/sneeze aggravation"],
      signs: ["positive neurodynamic tests", "myotomal weakness", "reflex change", "sensory change"],
      subjectiveFindings: ["dermatomal pattern", "bladder/bowel/saddle symptoms", "weakness", "night pain", "walking tolerance"],
      objectiveFindings: ["neuro screen", "SLR/slump", "gait", "heel/toe walking", "functional tolerance"],
      functionalImpact: ["sitting", "driving", "walking", "work", "sleep"],
      redFlagSymptoms: ["bilateral sciatica", "saddle anaesthesia", "bladder/bowel dysfunction", "progressive weakness"],
      differentials: ["peripheral neuropathy", "hip pathology", "vascular claudication", "cauda equina", "tumour/infection"],
    },
    investigations: investigationLibrary.filter((i) => ["mri", "ct", "fbc", "crp"].includes(i.id)),
    medicalManagement: {
      firstLine: ["Red flag and neuro screen", "analgesia review", "stay active advice", "MRI or spinal referral if severe/progressive or red flags", "surgical opinion for selected cases"],
      medications: [
        medication("Analgesia", ["NSAIDs if safe", "neuropathic agents in selected cases"], "Targets nociceptive or neuropathic pain mechanisms.", "Supports function while natural recovery occurs.", ["drowsiness", "dizziness", "GI/renal risks"], "Falls and driving safety may be affected."),
      ],
      monitoring: ["myotomes", "reflexes", "sensation", "pain distribution", "bladder/bowel symptoms"],
      surgicalManagement: "Microdiscectomy or decompression may be considered for persistent severe radiculopathy or progressive deficit; emergency decompression for CES.",
      escalationOptions: ["spinal emergency pathway", "MSK interface", "ED", "GP medication review"],
      mdtInvolvement: ["FCP", "GP", "spinal triage", "surgeon", "pain team"],
      urgentMedicalReview: ["CES symptoms", "progressive motor deficit", "severe unremitting pain with systemic features"],
    },
    physiotherapyRelevance: {
      whyItMatters: "Physio identifies radicular features, monitors neurology and supports safe activity.",
      assessmentConsiderations: ["neuro baseline", "irritability", "directional preference", "red flags"],
      functionalImpact: ["walking", "sitting", "work", "sleep"],
      treatmentPrecautions: ["do not worsen neurological signs", "avoid aggressive stretching of irritable nerve"],
      rehabilitationConsiderations: ["education", "positioning", "graded exposure", "strength once settled"],
      dischargePlanning: ["red flag safety-net", "work plan", "review interval"],
      pauseOrEscalate: ["worsening weakness", "bilateral symptoms", "bladder/bowel change"],
    },
    respiratoryPhysioTreatments: [],
    treatmentReasoningTable: [
      reasoning("sciatica-neuro", "Serial neurological monitoring", "monitoring", "Compares strength, reflex and sensory status over time.", "Detects deterioration requiring escalation.", "At assessment and review.", "Do not rely on pain alone.", "Essential for safe MSK reasoning.", "L5 myotome and sensation recorded; no deterioration since baseline."),
      ...baseReasoningRows("sciatica", "sciatica"),
    ],
    redFlags: ["Cauda equina syndrome", "Neurological deterioration", "Spinal fracture", "Cancer"],
    nhsConsiderations: {
      commonNhsSetting: ["FCP", "MSK", "spinal triage"],
      referralPathways: ["spinal emergency", "MSK interface", "pain service"],
      mdtRoles: ["FCP screens", "GP reviews medicine", "spinal team reviews surgical need"],
      medicalTeamInvolvement: ["imaging and medication", "urgent deficit"],
      dischargePlanningPoints: ["safety-net", "work", "activity modification"],
      localTrustPolicyReminders: ["CES pathway", "MRI criteria"],
      patientEducationConsiderations: ["urgent symptoms", "activity", "expected recovery"],
    },
    revisionSummary: {
      pathophysiologyPoints: ["nerve root irritation", "inflammatory mediators", "dermatomal pain", "myotomal weakness", "CES risk"],
      medicalManagementPoints: ["screen CES", "analgesia", "MRI if indicated", "spinal referral", "surgery for selected severe cases"],
      physiotherapyRelevancePoints: ["neuro screen", "graded activity", "safety-net"],
      commonMistakes: ["calling all leg pain sciatica", "missing progressive weakness", "overstretching irritable nerve"],
      interviewTalkingPoints: ["radiculopathy vs referred pain", "CES questions", "when to refer"],
    },
    flashcards: makeCards("sciatica", "Sciatica", "Nerve root inflammation or compression causes leg-dominant radicular symptoms.", "Analgesia, advice and spinal referral/imaging when indicated.", "MRI is useful when severe, progressive or red flag features exist.", "Bilateral symptoms, saddle numbness or bladder/bowel change."),
    quizQuestions: makeQuiz("sciatica", "Sciatica", "Nerve root irritation creates dermatomal pain and possible neurological deficit.", "Medical management includes red flag screening, analgesia and referral if progressive or severe.", "MRI can identify compressive pathology when indicated.", "Progressive foot drop with new bladder symptoms", "Record neuro baseline, safety-net and modify activity."),
    sources: ["nhs-conditions", "local-trust-placeholder", "textbook-placeholder"],
    dateLastReviewed: "2026-04-29",
  },
  {
    id: "heart-failure",
    title: "Heart failure",
    specialty: "Cardiorespiratory and acute care",
    setting: ["Acute ward", "Community", "Frailty ward"],
    difficulty: "Band 5",
    overview: {
      definition: "A syndrome where the heart cannot pump or fill effectively enough to meet body demands without raised filling pressures.",
      commonPatientGroups: ["Older adults", "ischaemic heart disease", "hypertension", "valve disease", "AF"],
      commonNhsSettings: ["acute medical ward", "cardiology", "frailty ward", "community heart failure team"],
      whyPhysiosNeedToUnderstandIt: "Fluid status, oxygenation, exertional symptoms and medication effects shape safe mobilisation.",
    },
    pathophysiology: {
      normal: "Cardiac output rises with demand through adequate preload, contractility, rhythm and vascular response.",
      whatGoesWrong: "Impaired systolic contraction or diastolic filling raises venous pressures and reduces reserve.",
      diseaseMechanism: "Neurohormonal activation initially compensates but promotes fluid retention and remodelling; pulmonary congestion impairs gas exchange.",
      levels: "Myocardial dysfunction affects chambers; vascular and renal systems retain salt/water; lungs may develop interstitial or alveolar oedema.",
      acuteVsChronic: "Chronic compensated heart failure can acutely decompensate with infection, arrhythmia, MI, fluid overload or missed medicines.",
      symptomLink: "Pulmonary congestion causes breathlessness and orthopnoea; low output causes fatigue; venous congestion causes oedema.",
      functionLink: "Walking, stairs and transfers are limited by breathlessness, fatigue, dizziness and fluid overload.",
      complications: ["Pulmonary oedema", "arrhythmia", "renal impairment", "falls", "hospital readmission"],
      prognosis: "Variable; optimisation, self-monitoring and rehabilitation improve quality of life and reduce admissions.",
    },
    clinicalPresentation: {
      symptoms: ["breathlessness", "orthopnoea", "fatigue", "ankle swelling", "weight gain"],
      signs: ["crackles", "oedema", "raised JVP", "tachycardia or AF", "low exercise tolerance"],
      subjectiveFindings: ["baseline walking", "orthopnoea pillows", "daily weights", "diuretic changes", "chest pain"],
      objectiveFindings: ["SpO2", "HR/BP", "oedema", "Borg", "mobility response"],
      functionalImpact: ["reduced walking", "stairs difficulty", "ADL fatigue"],
      redFlagSymptoms: ["acute pulmonary oedema", "chest pain", "syncope", "new confusion", "severe hypotension"],
      differentials: ["COPD", "pneumonia", "PE", "anaemia", "renal failure"],
    },
    investigations: investigationLibrary.filter((i) => ["bnp", "ecg", "cxr", "u-e", "fbc", "troponin", "abg-vbg"].includes(i.id)),
    medicalManagement: {
      firstLine: ["Diuretics for congestion", "heart failure disease-modifying medicines where appropriate", "treat trigger", "oxygen/ventilatory support if pulmonary oedema", "fluid and weight monitoring"],
      medications: [
        medication("Diuretics", ["Furosemide", "Bumetanide"], "Increase fluid excretion.", "Reduce congestion and breathlessness.", ["postural hypotension", "electrolyte imbalance", "renal changes"], "Check dizziness, BP and toileting needs before mobilisation."),
        medication("ACE inhibitors or ARNI", ["Ramipril", "Sacubitril/valsartan"], "Reduce neurohormonal stress and afterload.", "Improve symptoms and outcomes in selected heart failure.", ["hypotension", "renal changes", "cough"], "Monitor dizziness and exercise tolerance."),
        medication("Beta blockers", ["Bisoprolol", "Carvedilol"], "Slow heart rate and reduce sympathetic load.", "Improve long-term cardiac efficiency in selected patients.", ["bradycardia", "fatigue", "hypotension"], "HR response to exercise may be blunted."),
      ],
      monitoring: ["weight", "fluid balance", "U&Es", "BP", "HR/rhythm", "SpO2", "oedema"],
      oxygenTherapy: "Use for hypoxaemia; acute pulmonary oedema may need CPAP/NIV decisions by senior team.",
      escalationOptions: ["cardiology", "critical care outreach", "diuretic escalation", "ACS pathway"],
      mdtInvolvement: ["cardiology", "heart failure nurse", "pharmacist", "dietitian", "physio", "OT"],
      urgentMedicalReview: ["acute pulmonary oedema", "chest pain", "syncope", "severe hypotension", "new arrhythmia"],
    },
    physiotherapyRelevance: {
      whyItMatters: "Physio supports safe mobilisation, pacing and discharge function while respecting fluid and cardiac limits.",
      assessmentConsiderations: ["fluid status", "orthopnoea", "BP", "rhythm", "diuretic timing"],
      functionalImpact: ["reduced endurance", "falls from hypotension", "breathlessness"],
      treatmentPrecautions: ["avoid overexertion in decompensation", "monitor BP", "watch chest pain"],
      rehabilitationConsiderations: ["graded activity", "pacing", "cardiac rehab signpost", "strength"],
      dischargePlanning: ["stairs", "walking", "self-monitoring", "equipment"],
      pauseOrEscalate: ["chest pain", "syncope", "acute breathlessness", "severe desaturation"],
    },
    respiratoryPhysioTreatments: [airwayClearance[0], airwayClearance[4]],
    treatmentReasoningTable: [
      reasoning("hf-diuretics", "Diuretics", "medical", "Remove excess fluid.", "Reduce pulmonary and peripheral congestion.", "Fluid overload or decompensation.", "Hypotension, renal function and electrolyte issues.", "Mobilisation may improve after decongestion; monitor postural symptoms.", "Mobilised after diuretic timing considered; BP and breathlessness documented."),
      ...baseReasoningRows("heart-failure", "heart failure"),
    ],
    redFlags: ["Cardiac chest pain", "Acute respiratory deterioration", "Unstable observations"],
    nhsConsiderations: {
      commonNhsSetting: ["cardiology", "AMU", "frailty", "community"],
      referralPathways: ["heart failure nurse", "cardiac rehab", "community therapy"],
      mdtRoles: ["Cardiology optimises medicines", "nurses monitor fluid", "physio supports function"],
      medicalTeamInvolvement: ["diuresis", "echo/BNP", "arrhythmia", "ACS"],
      dischargePlanningPoints: ["weight monitoring", "stairs", "breathlessness plan", "follow-up"],
      localTrustPolicyReminders: ["acute pulmonary oedema", "oxygen/CPAP", "cardiac rehab referral"],
      patientEducationConsiderations: ["daily weight", "symptom escalation", "pacing"],
    },
    revisionSummary: {
      pathophysiologyPoints: ["reduced pump/filling reserve", "raised filling pressures", "fluid retention", "pulmonary congestion", "low output fatigue"],
      medicalManagementPoints: ["diuretics", "ACE/ARNI", "beta blockers", "monitor U&Es", "treat triggers"],
      physiotherapyRelevancePoints: ["monitor BP", "pace exercise", "cardiac rehab"],
      commonMistakes: ["mobilising acute pulmonary oedema", "ignoring postural hypotension", "expecting normal HR response on beta blockers"],
      interviewTalkingPoints: ["left vs right signs", "diuretics and physio", "when chest pain changes the plan"],
    },
    flashcards: makeCards("heart-failure", "Heart failure", "Impaired filling or pumping raises venous pressures and reduces cardiac reserve.", "Diuretics and disease-modifying cardiac medicines are key.", "BNP, ECG, CXR and echo-style pathways support diagnosis and severity.", "Chest pain, syncope, acute pulmonary oedema or severe hypotension."),
    quizQuestions: makeQuiz("heart-failure", "Heart failure", "Poor pump or filling function causes congestion and reduced reserve.", "Diuretics reduce congestion; cardiac medicines improve long-term control in selected patients.", "BNP, ECG and CXR help distinguish heart failure from respiratory causes.", "Acute breathlessness with frothy sputum and severe distress", "Monitor BP, SpO2 and symptoms; pace activity and escalate chest pain."),
    sources: ["nhs-conditions", ...sourceSet],
    dateLastReviewed: "2026-04-29",
  },
  {
    id: "sepsis",
    title: "Sepsis",
    specialty: "Cardiorespiratory and acute care",
    setting: ["Acute ward", "Emergency department", "ICU or step-down", "Frailty ward"],
    difficulty: "Band 6",
    overview: {
      definition: "Life-threatening organ dysfunction caused by a dysregulated host response to infection.",
      commonPatientGroups: ["older adults", "immunocompromised", "post-operative", "indwelling devices", "pneumonia or UTI"],
      commonNhsSettings: ["ED", "AMU", "wards", "ICU"],
      whyPhysiosNeedToUnderstandIt: "Physios may be first to notice deterioration during mobility or respiratory care and must escalate immediately.",
    },
    pathophysiology: {
      normal: "The immune system localises infection while circulation maintains tissue oxygen delivery.",
      whatGoesWrong: "A systemic inflammatory response causes vasodilation, capillary leak, microthrombosis and impaired oxygen use.",
      diseaseMechanism: "Cytokine activation and endothelial dysfunction reduce effective perfusion; lactate may rise as tissues shift metabolism.",
      levels: "Cellular mitochondrial stress, vascular leak and organ dysfunction combine to produce shock risk.",
      acuteVsChronic: "Sepsis is acute and time-critical; survivors often have prolonged weakness, delirium and deconditioning.",
      symptomLink: "Fever or hypothermia, tachycardia, tachypnoea, confusion and hypotension reflect systemic stress and hypoperfusion.",
      functionLink: "Weakness, delirium, dizziness and oxygen demand make routine mobilisation unsafe until stabilised.",
      complications: ["septic shock", "AKI", "respiratory failure", "delirium", "ICU acquired weakness", "death"],
      prognosis: "Early recognition, antimicrobials, fluids/source control and escalation improve outcomes; delayed recognition is dangerous.",
    },
    clinicalPresentation: {
      symptoms: ["fever or rigors", "confusion", "breathlessness", "reduced urine", "severe malaise", "dizziness"],
      signs: ["tachycardia", "tachypnoea", "hypotension", "mottled skin", "low SpO2", "altered consciousness"],
      subjectiveFindings: ["infection source", "new confusion", "urine output", "recent surgery", "immunosuppression"],
      objectiveFindings: ["NEWS2", "BP", "HR", "RR", "temperature", "mental state", "urine output if known"],
      functionalImpact: ["unsafe mobility", "collapse risk", "delirium", "post-sepsis weakness"],
      redFlagSymptoms: ["hypotension", "new confusion", "mottled skin", "high lactate", "rapid deterioration"],
      differentials: ["PE", "MI", "hypovolaemia", "anaphylaxis", "drug reaction"],
    },
    investigations: investigationLibrary.filter((i) => ["fbc", "crp", "u-e", "lfts", "abg-vbg", "cultures", "cxr"].includes(i.id)),
    medicalManagement: {
      firstLine: ["Urgent sepsis screening", "senior review", "blood cultures and lactate as indicated", "antibiotics", "IV fluids and oxygen if required", "source control"],
      medications: [
        medication("Antibiotics", ["Broad-spectrum per local policy"], "Treat likely pathogens early.", "Reduce infection burden and progression.", ["allergy", "renal considerations", "C. difficile"], "Physio should not delay urgent antibiotics; infection control and fatigue matter."),
        medication("IV fluids", ["Crystalloids"], "Increase circulating volume.", "Support perfusion in hypotension or hypovolaemia.", ["fluid overload", "worsening heart failure"], "Monitor breathlessness, oedema and haemodynamic response."),
        medication("Vasopressors", ["Noradrenaline in critical care"], "Increase vascular tone.", "Support blood pressure in septic shock.", ["limb ischaemia", "arrhythmia"], "Usually critical care; physio requires close senior coordination."),
      ],
      monitoring: ["NEWS2", "lactate", "urine output", "BP", "mental state", "temperature", "cultures"],
      oxygenTherapy: "Use if hypoxaemic according to prescription; escalating need is a deterioration sign.",
      escalationOptions: ["sepsis pathway", "critical care outreach", "medical emergency response", "source control team"],
      mdtInvolvement: ["medical team", "nursing", "microbiology", "pharmacy", "critical care", "physio during recovery"],
      urgentMedicalReview: ["any suspected sepsis with deterioration", "hypotension", "new confusion", "high lactate", "mottled skin"],
    },
    physiotherapyRelevance: {
      whyItMatters: "Physios must recognise unstable physiology and switch from treatment to escalation.",
      assessmentConsiderations: ["NEWS2", "infection signs", "mental state", "BP", "lactate if available"],
      functionalImpact: ["severe weakness", "delirium", "collapse", "ICU weakness"],
      treatmentPrecautions: ["do not mobilise unstable sepsis", "avoid delaying medical treatment", "infection control"],
      rehabilitationConsiderations: ["after stabilisation: graded mobilisation, respiratory care, pacing"],
      dischargePlanning: ["post-sepsis fatigue", "weakness", "community rehab", "safety-net"],
      pauseOrEscalate: ["suspected sepsis", "NEWS2 rise", "hypotension", "new confusion"],
    },
    respiratoryPhysioTreatments: [airwayClearance[0], airwayClearance[4]],
    treatmentReasoningTable: [
      reasoning("sepsis-escalation", "Immediate escalation", "escalation", "Activates time-critical assessment and treatment.", "Sepsis can progress rapidly to shock and organ failure.", "Any suspected sepsis with abnormal observations or clinical concern.", "Do not wait to finish physiotherapy assessment.", "Central safety behaviour.", "Treatment stopped; NEWS2 and concern escalated via local sepsis pathway."),
      ...baseReasoningRows("sepsis", "sepsis"),
    ],
    redFlags: ["Sepsis", "Unstable observations", "Acute respiratory deterioration"],
    nhsConsiderations: {
      commonNhsSetting: ["ED", "AMU", "ward", "ICU"],
      referralPathways: ["sepsis pathway", "critical care outreach", "community rehab after discharge"],
      mdtRoles: ["medical team leads sepsis care", "nursing monitors", "microbiology advises", "physio rehabilitates once stable"],
      medicalTeamInvolvement: ["antibiotics", "fluids", "source control", "critical care"],
      dischargePlanningPoints: ["fatigue", "weakness", "follow-up", "readmission advice"],
      localTrustPolicyReminders: ["sepsis screening", "NEWS2 escalation", "infection control"],
      patientEducationConsiderations: ["recovery may be slow", "return if infection symptoms recur", "pace activity"],
    },
    revisionSummary: {
      pathophysiologyPoints: ["dysregulated infection response", "vasodilation", "capillary leak", "microcirculatory dysfunction", "organ hypoperfusion"],
      medicalManagementPoints: ["recognition", "cultures/lactate", "antibiotics", "fluids", "source control/escalation"],
      physiotherapyRelevancePoints: ["stop treatment", "escalate", "rehab after stability"],
      commonMistakes: ["treating as simple deconditioning", "ignoring new confusion", "delaying escalation"],
      interviewTalkingPoints: ["NEWS2", "lactate", "why hypotension matters"],
    },
    flashcards: makeCards("sepsis", "Sepsis", "Dysregulated infection response causes vasodilation, leak and organ hypoperfusion.", "Antibiotics, fluids, cultures/lactate, source control and escalation.", "Blood cultures, lactate, FBC/CRP/U&Es and source imaging may guide care.", "Hypotension, new confusion, mottling or high lactate."),
    quizQuestions: makeQuiz("sepsis", "Sepsis", "Systemic dysregulated infection response impairs perfusion and oxygen use.", "Rapid antibiotics, fluids, source control and senior escalation are key.", "Lactate, cultures, bloods and source imaging support assessment.", "New confusion with hypotension and suspected infection", "Stop physiotherapy and escalate through local sepsis pathway."),
    sources: ["nice-sepsis-ng253", ...sourceSet],
    dateLastReviewed: "2026-04-29",
  },
  {
    id: "hip-fracture",
    title: "Hip fracture",
    specialty: "Older adult rehab",
    setting: ["Orthopaedic ward", "Frailty ward", "Community"],
    difficulty: "Band 5",
    overview: {
      definition: "A fracture of the proximal femur, commonly intracapsular or extracapsular, often after a fall in an older person.",
      commonPatientGroups: ["older adults", "osteoporosis", "falls risk", "cognitive impairment"],
      commonNhsSettings: ["ED", "orthopaedic trauma ward", "orthogeriatrics", "community rehab"],
      whyPhysiosNeedToUnderstandIt: "Medical stability, operation type, weight-bearing status, delirium and discharge planning shape rehab.",
    },
    pathophysiology: {
      normal: "The proximal femur transfers body weight through cortical and trabecular bone supported by muscle and balance systems.",
      whatGoesWrong: "Low bone density and falls load exceed bone strength, causing fracture, pain, bleeding and immobility.",
      diseaseMechanism: "Osteoporosis reduces trabecular architecture; trauma disrupts bone continuity and may impair femoral head blood supply in intracapsular fractures.",
      levels: "Bone injury causes inflammation and pain; systemic immobility drives deconditioning, delirium and cardiopulmonary risk.",
      acuteVsChronic: "Acute surgical fixation or replacement enables mobilisation; chronic recovery depends on strength, confidence and falls prevention.",
      symptomLink: "Pain, shortened/externally rotated limb and inability to weight bear reflect mechanical disruption.",
      functionLink: "Transfers, walking, stairs and self-care are immediately affected.",
      complications: ["delirium", "DVT/PE", "pneumonia", "pressure damage", "loss of independence"],
      prognosis: "Early surgery, orthogeriatric care and early mobilisation improve outcomes but many need increased support.",
    },
    clinicalPresentation: {
      symptoms: ["hip/groin pain", "inability to weight bear", "fall history", "fear", "confusion"],
      signs: ["shortened externally rotated leg", "pain on movement", "reduced mobility", "bruising"],
      subjectiveFindings: ["pre-fracture mobility", "falls circumstances", "home setup", "cognition", "bone health"],
      objectiveFindings: ["operation type", "weight-bearing status", "pain", "BP", "transfers", "gait aid"],
      functionalImpact: ["bed mobility", "transfers", "walking", "stairs", "ADLs"],
      redFlagSymptoms: ["post-op chest pain", "suspected DVT/PE", "delirium", "wound issues", "neurovascular compromise"],
      differentials: ["pelvic fracture", "soft tissue injury", "lumbar referral", "pathological fracture"],
    },
    investigations: investigationLibrary.filter((i) => ["cxr", "ct", "fbc", "u-e", "ecg"].includes(i.id)),
    medicalManagement: {
      firstLine: ["Analgesia", "urgent imaging", "surgery for most patients", "orthogeriatric optimisation", "VTE prophylaxis", "delirium prevention"],
      medications: [
        medication("Analgesia", ["Paracetamol", "opioids", "nerve block"], "Reduces pain signalling.", "Enables care and mobilisation.", ["drowsiness", "constipation", "delirium risk"], "Pain control supports mobility but sedation increases falls risk."),
        medication("Anticoagulant prophylaxis", ["LMWH"], "Reduces clot risk.", "Hip fracture and immobility increase VTE risk.", ["bleeding", "bruising"], "Watch wound bleeding and falls risk."),
        medication("Bone protection", ["Bisphosphonate", "vitamin D/calcium if indicated"], "Improves bone health over time.", "Secondary fracture prevention.", ["GI irritation", "muscle aches"], "Education and falls prevention link to medical plan."),
      ],
      monitoring: ["pain", "Hb", "BP", "delirium", "wound", "VTE signs", "mobility"],
      surgicalManagement: "Fixation, hemiarthroplasty or total hip replacement depending on fracture pattern and patient factors.",
      escalationOptions: ["orthogeriatrics", "orthopaedics", "anaesthetics/pain team", "medical review"],
      mdtInvolvement: ["orthopaedics", "orthogeriatrics", "nursing", "physio", "OT", "social work", "pharmacy"],
      urgentMedicalReview: ["chest pain", "new delirium", "hypotension", "suspected DVT/PE", "wound bleeding"],
    },
    physiotherapyRelevance: {
      whyItMatters: "Early mobilisation reduces complications and informs discharge planning.",
      assessmentConsiderations: ["operation", "weight-bearing", "hip precautions if any", "pain", "delirium", "BP"],
      functionalImpact: ["transfers", "walking", "stairs", "care needs"],
      treatmentPrecautions: ["postural hypotension", "anaemia", "wound", "weight-bearing status", "delirium"],
      rehabilitationConsiderations: ["bed exercises", "sit-to-stand", "gait re-education", "strength", "confidence"],
      dischargePlanning: ["home setup", "package of care", "equipment", "community rehab"],
      pauseOrEscalate: ["chest pain", "collapse", "new calf swelling", "wound concern"],
    },
    respiratoryPhysioTreatments: [],
    treatmentReasoningTable: [
      reasoning("hip-surgery", "Surgical fixation or replacement", "surgical", "Restores mechanical stability.", "Allows pain control and mobilisation.", "Most displaced or unstable hip fractures.", "Post-op restrictions, wound and weight-bearing instructions.", "Physio plan depends on operation note.", "Mobilised WBAT as per op note with frame; assistance and response documented."),
      reasoning("hip-early-mob", "Early mobilisation", "physiotherapy", "Loads tissues safely, improves circulation and reduces bed-rest complications.", "Restores function and supports discharge.", "Post-op once medically stable and instructions confirmed.", "Hypotension, delirium, pain, anaemia.", "Core orthopaedic ward role.", "Transferred bed-chair with assistance; BP and pain response documented."),
      ...baseReasoningRows("hip-fracture", "hip fracture"),
    ],
    redFlags: ["Falls with serious injury", "DVT", "Pulmonary embolism", "Delirium", "Unstable observations"],
    nhsConsiderations: {
      commonNhsSetting: ["orthopaedic trauma", "orthogeriatrics", "community rehab"],
      referralPathways: ["community therapy", "falls clinic", "fracture liaison", "social care"],
      mdtRoles: ["OT equipment", "physio mobility", "orthogeriatrics medical optimisation", "social work discharge"],
      medicalTeamInvolvement: ["surgery", "anaemia", "delirium", "bone health"],
      dischargePlanningPoints: ["stairs", "toileting", "care package", "equipment", "transport"],
      localTrustPolicyReminders: ["hip fracture pathway", "falls policy", "weight-bearing documentation"],
      patientEducationConsiderations: ["confidence", "walking aid", "falls prevention", "bone health"],
    },
    revisionSummary: {
      pathophysiologyPoints: ["osteoporotic bone", "fall load", "fracture stability", "pain/inflammation", "immobility complications"],
      medicalManagementPoints: ["analgesia", "surgery", "VTE prophylaxis", "delirium prevention", "bone health"],
      physiotherapyRelevancePoints: ["early mobilisation", "weight-bearing check", "discharge planning"],
      commonMistakes: ["not checking op note", "ignoring delirium", "underestimating postural hypotension"],
      interviewTalkingPoints: ["intracapsular vs extracapsular", "orthogeriatrics", "first mobilisation safety"],
    },
    flashcards: makeCards("hip-fracture", "Hip fracture", "Fragile bone plus fall load causes proximal femur fracture and immobility complications.", "Surgery, analgesia, VTE prophylaxis and orthogeriatric care.", "X-ray/CT confirm fracture; Hb, ECG and U&Es support perioperative safety.", "Chest pain, DVT/PE signs, delirium or wound bleeding."),
    quizQuestions: makeQuiz("hip-fracture", "Hip fracture", "Osteoporotic bone fails under fall load, causing pain and inability to weight bear.", "Surgery, analgesia, VTE prophylaxis and delirium prevention are key.", "Hip X-ray or CT confirms fracture; bloods/ECG support surgical optimisation.", "New calf swelling and acute breathlessness post-op", "Check operation note, weight-bearing, observations and pain before mobilisation."),
    sources: ["nhs-conditions", "local-trust-placeholder", "textbook-placeholder"],
    dateLastReviewed: "2026-04-29",
  },
];

export const pathophysiologyTopics: PathophysiologyTopic[] = [
  ["inflammation", "Inflammation", "Protective immune response to injury or infection.", "Vascular dilation, permeability and immune-cell recruitment explain heat, swelling, pain and altered function.", ["Pneumonia", "COPD exacerbation", "Low back pain"], ["heat", "swelling", "fever", "pain"], "Helps distinguish expected healing from infection or systemic deterioration.", ["spreading redness", "sepsis signs", "unexplained fever"]],
  ["tissue-healing", "Tissue healing", "The body repairs injured tissue through overlapping phases.", "Haemostasis, inflammation, proliferation and remodelling guide loading decisions after injury or surgery.", ["Hip fracture", "Ankle sprain", "Tendinopathy"], ["pain", "swelling", "reduced load tolerance"], "Informs staged loading and protection.", ["wound breakdown", "infection", "unexpected severe pain"]],
  ["pain-mechanisms", "Pain mechanisms", "Pain is an output of the nervous system when protection is judged necessary.", "Nociceptive, neuropathic and nociplastic mechanisms can overlap and change treatment reasoning.", ["Low back pain", "Sciatica"], ["allodynia", "guarding", "fear"], "Supports education and avoids over-pathologising scans.", ["night pain with systemic signs", "progressive neurology"]],
  ["nerve-compression", "Nerve compression", "Pressure or irritation can impair nerve signalling.", "Mechanical compression plus inflammation affects blood flow, ion channels and conduction.", ["Sciatica", "Carpal tunnel", "Spinal cord injury"], ["paraesthesia", "weakness", "reflex change"], "Requires neurological baseline and escalation if worsening.", ["progressive weakness", "cauda equina symptoms"]],
  ["demyelination", "Demyelination", "Loss of myelin slows or blocks nerve conduction.", "Immune-mediated CNS myelin injury explains relapsing neurological deficits in MS and conduction fatigue.", ["Multiple sclerosis"], ["fatigue", "weakness", "sensory change"], "Guides pacing and heat/fatigue management.", ["new severe relapse", "optic or spinal symptoms"]],
  ["neuroplasticity", "Neuroplasticity", "The nervous system can reorganise with practice and experience.", "Repetition, salience, intensity and feedback shape synaptic and network change after neurological injury.", ["Stroke", "Parkinson's disease"], ["improving skill", "motor learning"], "Explains task-specific practice.", ["new neurological deterioration"]],
  ["umN-lesions", "Upper motor neuron lesions", "Damage above the anterior horn cell changes voluntary movement and reflex control.", "Loss of descending inhibition can cause weakness, spasticity, hyperreflexia and synergy patterns.", ["Stroke", "Spinal cord injury"], ["spasticity", "clonus", "hyperreflexia"], "Helps interpret tone and functional movement.", ["new UMN signs", "rapid deterioration"]],
  ["hypoxia", "Hypoxia", "Insufficient oxygen reaches tissues.", "May result from V/Q mismatch, diffusion limitation, low inspired oxygen, anaemia or circulatory failure.", ["Pneumonia", "PE", "Heart failure"], ["desaturation", "confusion", "cyanosis"], "Determines treatment tolerance and escalation.", ["severe or worsening hypoxaemia"]],
  ["hypercapnia", "Hypercapnia", "Carbon dioxide retention from inadequate ventilation.", "Alveolar hypoventilation or severe V/Q mismatch raises CO2 and can cause acidosis, drowsiness and headache.", ["COPD exacerbation", "Respiratory failure"], ["drowsiness", "flushed skin", "headache"], "Physios must respect oxygen targets and ABG trends.", ["falling pH", "reduced consciousness"]],
  ["v-q-mismatch", "Ventilation-perfusion mismatch", "Airflow and blood flow are not matched.", "Pneumonia creates perfused but poorly ventilated units; PE creates ventilated but poorly perfused units.", ["Pneumonia", "PE", "COPD"], ["hypoxaemia", "tachypnoea"], "Explains why oxygen response and positioning matter.", ["rapid oxygen escalation"]],
  ["atelectasis", "Atelectasis", "Partial lung collapse.", "Low volumes, obstruction or compression reduce alveolar ventilation and compliance.", ["Post-operative respiratory complications", "Pneumonia"], ["reduced air entry", "desaturation"], "Positioning, deep breathing and mobility may help selected patients.", ["suspected pneumothorax", "unstable observations"]],
  ["heart-failure-physiology", "Heart failure physiology", "The heart cannot meet demand without raised pressures.", "Pump/filling impairment activates neurohormonal fluid retention and congestion.", ["Heart failure"], ["oedema", "orthopnoea", "crackles"], "Guides pacing and BP monitoring.", ["acute pulmonary oedema", "chest pain"]],
  ["sepsis-physiology", "Sepsis physiology", "Infection triggers dangerous organ dysfunction.", "Inflammation, vasodilation, capillary leak and microcirculatory failure reduce perfusion.", ["Sepsis", "Pneumonia"], ["hypotension", "confusion", "tachypnoea"], "Physio must stop routine treatment and escalate.", ["NEWS2 rise", "high lactate"]],
].map(([id, title, simpleExplanation, detailedExplanation, linkedConditions, clinicalSigns, physioImportance, escalationPoints]) => ({
  id: id as string,
  title: title as string,
  simpleExplanation: simpleExplanation as string,
  detailedExplanation: detailedExplanation as string,
  linkedConditions: linkedConditions as string[],
  clinicalSigns: clinicalSigns as string[],
  physioImportance: physioImportance as string,
  escalationPoints: escalationPoints as string[],
  sources: sourceSet,
}));

export const medicalManagementTopics: MedicalManagementTopic[] = [
  ["analgesia", "Analgesia", "Medicines used to reduce pain.", "Reduce nociceptive signalling or alter pain processing.", "Support comfort, breathing, sleep and mobility.", ["Low back pain", "Hip fracture"], ["drowsiness", "constipation", "nausea"], "Can enable rehab but may increase falls or respiratory risk.", ["over-sedation", "uncontrolled pain"]],
  ["nsaids", "NSAIDs", "Anti-inflammatory pain medicines.", "Reduce prostaglandin production.", "Short-term pain relief where safe.", ["Low back pain", "Osteoarthritis"], ["GI bleeding", "renal impairment", "BP rise"], "Check dizziness, renal risk and asthma sensitivity.", ["black stools", "AKI", "wheeze after dose"]],
  ["corticosteroids", "Corticosteroids", "Anti-inflammatory steroid medicines.", "Suppress inflammatory gene transcription and immune activation.", "COPD/asthma exacerbations and inflammatory conditions.", ["COPD exacerbation", "Asthma"], ["hyperglycaemia", "mood change", "proximal weakness"], "Affects glucose, mood and muscle performance.", ["severe hyperglycaemia", "delirium"]],
  ["antibiotics", "Antibiotics", "Medicines for bacterial infection.", "Kill bacteria or inhibit growth.", "Pneumonia, sepsis, infective exacerbations.", ["Pneumonia", "Sepsis", "Bronchiectasis"], ["allergy", "diarrhoea", "C. difficile"], "Do not delay urgent treatment; monitor fatigue and infection control.", ["anaphylaxis", "sepsis deterioration"]],
  ["bronchodilators", "Bronchodilators", "Medicines that widen airways.", "Relax airway smooth muscle.", "Airflow obstruction and wheeze.", ["COPD exacerbation", "Asthma"], ["tachycardia", "tremor"], "May improve tolerance but alter HR response.", ["severe tachycardia", "poor response in attack"]],
  ["nebulisers", "Nebulisers", "Aerosol delivery devices for inhaled medicine.", "Deliver medication during tidal breathing.", "Acute obstruction or patients unable to use inhalers.", ["COPD exacerbation", "Asthma"], ["tachycardia", "infection control/aerosol issues"], "Coordinate airway clearance timing and PPE/local policy.", ["worsening distress despite nebuliser"]],
  ["oxygen-therapy", "Oxygen therapy", "Supplemental oxygen for hypoxaemia.", "Raises inspired oxygen to improve arterial oxygenation.", "Respiratory failure, pneumonia, PE, heart failure.", ["COPD exacerbation", "Pneumonia", "PE"], ["dry mucosa", "CO2 retention risk in susceptible patients"], "Physios must know target range and delivery device.", ["rising requirement", "CO2 narcosis signs"]],
  ["anticoagulants", "Anticoagulants", "Medicines that reduce clot formation.", "Inhibit clotting cascade factors.", "Treat/prevent DVT, PE and AF-related stroke.", ["Pulmonary embolism", "Stroke", "Hip fracture"], ["bleeding", "bruising"], "Falls, wounds and haemoptysis change treatment risk.", ["major bleeding", "head injury on anticoagulants"]],
  ["antiplatelets", "Antiplatelets", "Medicines that reduce platelet aggregation.", "Reduce arterial clot formation.", "Secondary prevention after ischaemic stroke or MI.", ["Stroke", "MI"], ["bleeding", "GI irritation"], "Bruising/falls risk and surgery timing matter.", ["GI bleed", "new neuro signs after fall"]],
  ["beta-blockers", "Beta blockers", "Medicines that reduce sympathetic cardiac drive.", "Slow HR and reduce myocardial oxygen demand.", "Heart failure, AF, post-MI.", ["Heart failure", "Atrial fibrillation"], ["bradycardia", "fatigue", "hypotension"], "HR may not rise normally during exercise.", ["symptomatic bradycardia", "syncope"]],
  ["ace-inhibitors", "ACE inhibitors", "Blood pressure and heart failure medicines.", "Reduce angiotensin II and afterload.", "Heart failure, hypertension, renal protection.", ["Heart failure"], ["cough", "hypotension", "renal changes"], "Monitor dizziness and postural BP.", ["angioedema", "severe hypotension"]],
  ["diuretics", "Diuretics", "Medicines that increase fluid loss.", "Promote renal sodium and water excretion.", "Heart failure congestion and fluid overload.", ["Heart failure"], ["postural hypotension", "electrolyte imbalance"], "Toileting, dizziness and BP affect mobility.", ["collapse", "AKI", "severe electrolyte abnormality"]],
].map(([id, title, whatItIs, howItWorks, whyUsed, linkedConditions, commonSideEffects, physiotherapyRelevance, escalationPoints]) => ({
  id: id as string,
  title: title as string,
  whatItIs: whatItIs as string,
  howItWorks: howItWorks as string,
  whyUsed: whyUsed as string,
  linkedConditions: linkedConditions as string[],
  commonSideEffects: commonSideEffects as string[],
  physiotherapyRelevance: physiotherapyRelevance as string,
  escalationPoints: escalationPoints as string[],
  sources: sourceSet,
}));

export const redFlags: RedFlag[] = [
  ["cauda-equina", "Cauda equina syndrome", ["Musculoskeletal"], ["saddle anaesthesia", "new bladder or bowel dysfunction", "bilateral sciatica", "sexual dysfunction"], ["Stop routine physio", "urgent same-day emergency referral"], ["ED/spinal emergency pathway"], ["symptoms asked", "neuro findings", "time escalated"], "Do not delay escalation for a trial of treatment."],
  ["spinal-fracture", "Spinal fracture", ["Musculoskeletal", "Older adult rehab"], ["major trauma", "osteoporosis with severe pain", "steroid use", "night pain after fall"], ["immobilise if needed", "medical review"], ["ED/spinal team"], ["mechanism", "neuro status", "observations"], "Follow local spinal precautions."],
  ["infection", "Spinal or joint infection", ["Musculoskeletal"], ["fever", "severe constant pain", "immunosuppression", "recent infection"], ["urgent medical review"], ["GP/ED/medical team"], ["temperature", "red flags", "escalation"], "Infection can progress quickly."],
  ["cancer", "Suspected cancer", ["Musculoskeletal", "Neurology", "Respiratory"], ["unexplained weight loss", "history of cancer", "night pain", "progressive symptoms"], ["refer through appropriate urgent pathway"], ["GP/medical team"], ["screening findings", "advice given"], "Use local suspected cancer pathways."],
  ["dvt", "Deep vein thrombosis", ["Cardiorespiratory and acute care", "Older adult rehab"], ["unilateral calf swelling", "pain", "heat", "risk factors"], ["stop massage/exercise to limb", "medical review"], ["medical team/VTE pathway"], ["signs", "risk factors", "action"], "Do not treat suspected DVT as routine muscle pain."],
  ["pe", "Pulmonary embolism", ["Respiratory", "Cardiorespiratory and acute care"], ["sudden breathlessness", "pleuritic pain", "tachycardia", "syncope", "haemoptysis"], ["urgent medical review"], ["medical emergency/ED"], ["observations", "symptoms", "time escalated"], "PE can be life-threatening."],
  ["acute-stroke", "Acute stroke", ["Neurology"], ["face/arm/speech change", "new visual loss", "sudden ataxia", "new severe headache"], ["activate stroke pathway"], ["stroke team/999/ED"], ["time last known well", "signs", "escalation"], "Time-critical stroke pathways matter."],
  ["resp-deterioration", "Acute respiratory deterioration", ["Respiratory"], ["rising oxygen need", "severe breathlessness", "cyanosis", "silent chest", "drowsiness"], ["stop treatment", "ABCDE", "urgent escalation"], ["nurse in charge/medical team/outreach"], ["SpO2 device", "RR", "response"], "Know local oxygen and escalation policy."],
  ["sepsis", "Sepsis", ["Cardiorespiratory and acute care", "Respiratory", "Older adult rehab"], ["new confusion", "hypotension", "tachypnoea", "mottled skin", "suspected infection"], ["sepsis screening and urgent escalation"], ["medical team/sepsis pathway"], ["NEWS2", "infection source", "time escalated"], "Do not continue routine mobilisation in suspected unstable sepsis."],
  ["cardiac-chest-pain", "Cardiac chest pain", ["Cardiorespiratory and acute care"], ["central crushing pain", "sweating", "nausea", "radiation to arm/jaw", "breathlessness"], ["stop activity", "urgent medical review"], ["medical emergency/cardiology"], ["activity at onset", "observations", "ECG request"], "Treat as cardiac until assessed."],
  ["safeguarding", "Safeguarding", ["Paediatrics", "Older adult rehab", "Pelvic health"], ["disclosure", "unexplained injuries", "neglect", "coercion", "unsafe home"], ["follow safeguarding policy"], ["safeguarding lead"], ["facts not opinions", "who informed"], "Use local safeguarding procedures and senior advice."],
].map(([id, title, linkedSpecialties, warningSigns, immediateActions, whoToEscalateTo, documentation, nhsSafetyReminder]) => ({
  id: id as string,
  title: title as string,
  linkedSpecialties: linkedSpecialties as RedFlag["linkedSpecialties"],
  warningSigns: warningSigns as string[],
  immediateActions: immediateActions as string[],
  whoToEscalateTo: whoToEscalateTo as string[],
  documentation: documentation as string[],
  nhsSafetyReminder: nhsSafetyReminder as string,
  sources: sourceSet,
}));

export const outcomeMeasures: OutcomeMeasure[] = [
  ["10mwt", "10 Metre Walk Test", "Walking speed.", "Gait speed monitoring in neuro, frailty and respiratory rehab.", "Time middle 10 m with acceleration/deceleration as locally standardised.", "m/s.", "Higher speed usually indicates better walking capacity.", "Needs safe walking ability and consistent setup.", "10MWT 0.62 m/s with stick, supervision."],
  ["6mwt", "6 Minute Walk Test", "Functional exercise capacity.", "Cardiorespiratory and respiratory monitoring.", "Walk as far as possible in six minutes using standard instructions.", "Distance, SpO2, HR, Borg.", "Distance and desaturation trend inform capacity.", "Space, oxygen policy and safety required.", "6MWT 220 m, SpO2 94-89%, Borg 5."],
  ["tug", "Timed Up and Go", "Basic mobility and falls risk.", "Older adults, MSK and neuro screening.", "Stand from chair, walk 3 m, turn, return and sit.", "Time in seconds plus quality.", "Slower times suggest mobility limitation but are not diagnostic alone.", "Chair height and aids must be consistent.", "TUG 18 s with frame, standby assist."],
  ["berg", "Berg Balance Scale", "Static and dynamic balance.", "Neuro and falls rehab.", "14 balance tasks scored using standard criteria.", "0-56.", "Lower scores indicate greater balance limitation.", "Ceiling effects and time required.", "BBS 39/56; reduced single-leg and turning control."],
  ["mrs", "Modified Rankin Scale", "Global disability after stroke.", "Stroke outcome communication.", "Clinician-rated disability category.", "0-6.", "Higher score means greater disability.", "Less sensitive to specific impairment change.", "mRS estimated 3 on discharge planning discussion."],
  ["ems", "Elderly Mobility Scale", "Mobility in frail older adults.", "Ward rehab and discharge planning.", "Assesses lying, sitting, standing, gait and reach.", "0-20.", "Higher score indicates better mobility.", "May miss endurance and cognition issues.", "EMS 12/20, needs assist for transfers."],
  ["barthel", "Barthel Index", "ADL independence.", "General rehab and discharge planning.", "Score ADL domains.", "0-20 or 0-100 depending version.", "Higher score indicates more independence.", "Can miss quality and cognition.", "Barthel 65/100 with toileting assistance."],
  ["oss", "Oxford Shoulder Score", "Shoulder pain and function.", "MSK shoulder presentations.", "12 patient-rated items.", "0-48 depending scoring version.", "Track patient-perceived change.", "Use correct scoring direction.", "OSS 28/48 baseline."],
  ["odi", "Oswestry Disability Index", "Back-pain disability.", "Low back pain and sciatica.", "Patient questionnaire.", "Percentage disability.", "Higher percentage indicates greater disability.", "Affected by beliefs and context.", "ODI 34%, moderate disability."],
  ["mrc", "MRC Muscle Grading", "Manual muscle strength.", "Neuro, ICU and general weakness.", "Grade key muscle groups 0-5.", "0 no contraction to 5 normal power.", "Simple strength communication.", "Ordinal and examiner dependent.", "MRC hip flexion 3/5 bilaterally."],
  ["mas", "Modified Ashworth Scale", "Resistance to passive movement.", "Spasticity description.", "Move limb passively and score tone.", "0-4 with 1+.", "Higher score suggests more resistance.", "Velocity and positioning affect results.", "MAS elbow flexors 1+."],
  ["borg", "Borg RPE or breathlessness scale", "Perceived exertion or dyspnoea.", "Exercise and respiratory monitoring.", "Ask patient to rate intensity.", "Scale depends on version used.", "Tracks response and pacing.", "Subjective and needs explanation.", "Borg breathlessness 4/10 after 20 m."],
  ["nrs", "Pain numerical rating scale", "Pain intensity.", "Any painful condition.", "Ask 0-10 current/best/worst pain.", "0 no pain, 10 worst imaginable.", "Quick symptom monitoring.", "Does not capture quality or impact alone.", "Pain 6/10 on sit-to-stand, settled to 3/10."],
  ["5xsts", "5 Times Sit to Stand", "Functional lower limb strength and transfer speed.", "Older adults, MSK and neuro rehab.", "Time five sit-to-stands from standard chair.", "Seconds and movement quality.", "Slower time suggests reduced power or balance confidence.", "Requires safe independent or supervised standing.", "5xSTS 21 s using arms."],
].map(([id, title, whatItMeasures, whenToUse, howToPerform, scoring, interpretation, limitations, documentationExample]) => ({
  id,
  title,
  whatItMeasures,
  whenToUse,
  howToPerform,
  scoring,
  interpretation,
  limitations,
  documentationExample,
  sources: sourceSet,
}));

export const assessmentFrameworks: AssessmentFramework[] = [
  { id: "soap", title: "SOAP notes", setting: "All settings", sections: [{ heading: "Subjective", prompts: ["Presenting problem", "history", "patient goals"] }, { heading: "Objective", prompts: ["Observations", "assessment findings", "outcome measures"] }, { heading: "Assessment", prompts: ["Clinical impression", "risks", "problem list"] }, { heading: "Plan", prompts: ["Treatment", "escalation", "follow-up"] }] },
  { id: "subjective", title: "Subjective assessment", setting: "All settings", sections: [{ heading: "History", prompts: ["Onset", "aggravating/easing", "24-hour pattern", "red flags"] }] },
  { id: "objective", title: "Objective assessment", setting: "All settings", sections: [{ heading: "Core", prompts: ["Consent", "observations", "inspection", "function", "specific tests"] }] },
  { id: "msk", title: "MSK assessment", setting: "Outpatients", sections: [{ heading: "Screen", prompts: ["Red flags", "neuro", "irritability", "function"] }] },
  { id: "neuro", title: "Neurological assessment", setting: "Neuro wards/community", sections: [{ heading: "Systems", prompts: ["Tone", "power", "sensation", "coordination", "balance", "gait"] }] },
  { id: "resp", title: "Respiratory assessment", setting: "Respiratory ward", sections: [{ heading: "ABCDE", prompts: ["Oxygen", "RR", "work of breathing", "auscultation", "sputum", "cough"] }] },
  { id: "falls", title: "Falls assessment", setting: "Older adult rehab", sections: [{ heading: "Risk", prompts: ["History", "medicines", "vision", "feet", "home", "strength and balance"] }] },
  { id: "mobility", title: "Mobility assessment", setting: "Wards", sections: [{ heading: "Function", prompts: ["Bed mobility", "transfers", "walking aid", "stairs", "endurance"] }] },
  { id: "transfer", title: "Transfer assessment", setting: "Wards/community", sections: [{ heading: "Transfer", prompts: ["Surface height", "assistance", "equipment", "technique", "safety"] }] },
  { id: "balance", title: "Balance assessment", setting: "Neuro/falls", sections: [{ heading: "Balance", prompts: ["Static", "dynamic", "reactive", "dual task", "confidence"] }] },
  { id: "discharge", title: "Discharge planning checklist", setting: "All inpatient", sections: [{ heading: "Discharge", prompts: ["Baseline", "home setup", "equipment", "care", "transport", "follow-up"] }] },
  { id: "risk", title: "Risk assessment checklist", setting: "All settings", sections: [{ heading: "Risks", prompts: ["Consent", "capacity", "manual handling", "infection control", "falls", "red flags"] }] },
];

export const caseScenarios: CaseScenario[] = [
  {
    id: "acute-stroke-ward",
    title: "Acute stroke ward",
    setting: "Stroke unit",
    difficulty: "Band 5",
    patientStory: "72-year-old admitted with right MCA infarct, left weakness, neglect and fatigue.",
    presentation: ["Left inattention", "reduced sitting balance", "failed first swallow screen then cleared by SALT", "BP monitored"],
    investigations: ["CT head confirms ischaemic stroke", "ECG shows AF", "bloods monitored"],
    pathophysiologyReasoning: "Cortical network injury explains neglect and motor planning difficulty, not just weakness.",
    medicalManagement: ["secondary prevention", "AF anticoagulation timing decision", "swallow and nutrition plan"],
    physiotherapySafety: ["check neuro status", "BP", "fatigue", "shoulder handling"],
    escalationTriggers: ["new weakness", "reduced consciousness", "chest pain", "aspiration"],
    questions: ["What impairments limit sitting?", "How would you progress transfers?", "What would make you stop?"],
    modelAnswer: "Prioritise safe handling, sitting balance, attention cues and short task-specific practice. Escalate any neurological deterioration.",
    sources: ["nice-stroke-ng236", "local-trust-placeholder"],
  },
  {
    id: "resp-ward-copd",
    title: "Respiratory ward COPD exacerbation",
    setting: "Respiratory ward",
    difficulty: "Band 5",
    patientStory: "68-year-old with COPD, sputum retention and target SpO2 88-92%.",
    presentation: ["Wheeze", "green sputum", "Borg 6 on washing", "VBG being monitored"],
    investigations: ["CXR excludes pneumothorax", "VBG shows compensated CO2 retention", "CRP raised"],
    pathophysiologyReasoning: "Airflow obstruction and dynamic hyperinflation increase work of breathing; sputum load worsens V/Q mismatch.",
    medicalManagement: ["controlled oxygen", "nebulisers", "steroids", "antibiotics"],
    physiotherapySafety: ["target saturations", "fatigue", "drowsiness", "bronchospasm"],
    escalationTriggers: ["drowsiness", "pH drop", "rising oxygen need", "chest pain"],
    questions: ["Which airway clearance technique?", "What would you monitor?", "When would NIV be considered?"],
    modelAnswer: "Use positioning, ACBT or PEP if appropriate, with close SpO2/Borg monitoring and clear escalation for CO2 retention signs.",
    sources: ["nice-copd-ng115", "local-trust-placeholder"],
  },
  {
    id: "frailty-ward",
    title: "Frailty ward deconditioning",
    setting: "Frailty ward",
    difficulty: "Band 5",
    patientStory: "89-year-old admitted with pneumonia and delirium, now medically improving but below mobility baseline.",
    presentation: ["low confidence", "needs assistance to stand", "variable attention", "family concerned"],
    investigations: ["CRP improving", "CXR pneumonia", "U&Es normalising"],
    pathophysiologyReasoning: "Inflammation and bed rest accelerate sarcopenia and reduce physiological reserve.",
    medicalManagement: ["antibiotics complete", "delirium prevention", "nutrition and hydration"],
    physiotherapySafety: ["falls risk", "orthostatic BP", "cognition", "fatigue"],
    escalationTriggers: ["new confusion", "fall with injury", "sepsis signs"],
    questions: ["What is baseline?", "What blocks discharge?", "Which outcome measure helps?"],
    modelAnswer: "Assess transfers, gait, cognition and home needs. Use short functional practice and coordinate OT/social input.",
    sources: ["nhs-conditions", "local-trust-placeholder"],
  },
  {
    id: "ortho-post-op",
    title: "Orthopaedic post-op hip fracture",
    setting: "Orthopaedic ward",
    difficulty: "Band 5",
    patientStory: "83-year-old day one after hemiarthroplasty for intracapsular fracture.",
    presentation: ["pain 5/10", "WBAT in op note", "Hb slightly low", "mild postural symptoms"],
    investigations: ["post-op bloods", "ECG baseline", "X-ray confirms prosthesis"],
    pathophysiologyReasoning: "Fracture and surgery create pain and inflammation; immobility increases pulmonary and VTE risk.",
    medicalManagement: ["analgesia", "VTE prophylaxis", "delirium prevention"],
    physiotherapySafety: ["op note", "BP", "pain", "wound", "delirium"],
    escalationTriggers: ["chest pain", "calf swelling", "wound bleeding", "collapse"],
    questions: ["How do you first mobilise?", "What do you document?", "Who needs discharge involvement?"],
    modelAnswer: "Confirm restrictions, optimise pain, check BP, start bed-chair/standing and record assistance, aid and response.",
    sources: ["local-trust-placeholder"],
  },
  {
    id: "icu-step-down",
    title: "ICU step-down weakness",
    setting: "ICU or step-down",
    difficulty: "Band 6",
    patientStory: "58-year-old after sepsis and ventilation, now on step-down with global weakness.",
    presentation: ["MRC sum score reduced", "fatigue", "low mood", "desaturates on exertion"],
    investigations: ["ABG stable", "infection markers improving", "CXR resolving changes"],
    pathophysiologyReasoning: "Critical illness neuromyopathy, inflammation and bed rest reduce muscle force and endurance.",
    medicalManagement: ["infection treatment complete", "nutrition", "oxygen wean", "line management"],
    physiotherapySafety: ["lines", "BP", "SpO2", "fatigue", "delirium"],
    escalationTriggers: ["new sepsis", "respiratory deterioration", "arrhythmia"],
    questions: ["How do you dose rehab?", "What outcome measure?", "When stop?"],
    modelAnswer: "Use low-dose frequent mobilisation, monitor response and coordinate with nursing, OT and nutrition.",
    sources: ["local-trust-placeholder", "textbook-placeholder"],
  },
  {
    id: "msk-outpatient",
    title: "MSK outpatient sciatica",
    setting: "MSK outpatients",
    difficulty: "Band 5",
    patientStory: "45-year-old with six weeks of leg-dominant pain and intermittent foot tingling.",
    presentation: ["positive SLR", "no bladder symptoms", "mild L5 weakness unchanged"],
    investigations: ["none yet", "MRI only if worsening or referral criteria met"],
    pathophysiologyReasoning: "Inflamed nerve root can cause dermatomal pain and mechanosensitivity.",
    medicalManagement: ["analgesia review", "safety-netting", "spinal referral if progression"],
    physiotherapySafety: ["serial neuro", "CES questions", "avoid flare overload"],
    escalationTriggers: ["progressive weakness", "saddle numbness", "bladder/bowel change"],
    questions: ["What must you ask?", "How will you monitor?", "What education matters?"],
    modelAnswer: "Document neuro baseline and CES screen, explain recovery and red flags, and use graded activity within tolerance.",
    sources: ["local-trust-placeholder"],
  },
  {
    id: "general-medical-ward",
    title: "General medical ward sepsis recovery",
    setting: "Acute ward",
    difficulty: "Band 6",
    patientStory: "76-year-old treated for urosepsis, now weak but NEWS2 fluctuates.",
    presentation: ["tachycardic on standing", "fatigue", "reduced appetite", "family report confusion improving"],
    investigations: ["lactate normalised", "U&Es recovering", "cultures reviewed"],
    pathophysiologyReasoning: "Systemic inflammation and hypoperfusion cause weakness; recovery can be non-linear.",
    medicalManagement: ["antibiotics", "fluids reviewed", "source treated"],
    physiotherapySafety: ["NEWS2", "BP", "mental state", "urine output context"],
    escalationTriggers: ["new confusion", "hypotension", "fever", "rising NEWS2"],
    questions: ["Is today a rehab or escalation day?", "How would you dose mobility?", "What document?"],
    modelAnswer: "If stable, use short monitored mobility. If NEWS2 or mental state worsens, stop and escalate.",
    sources: ["nice-sepsis-ng253"],
  },
  {
    id: "community-falls",
    title: "Community falls patient",
    setting: "Community",
    difficulty: "Band 5",
    patientStory: "81-year-old with two falls, fear of walking outdoors and new antihypertensive.",
    presentation: ["slow gait", "postural dizziness", "reduced confidence", "no injury"],
    investigations: ["GP medication review pending", "vision check advised"],
    pathophysiologyReasoning: "Falls risk is multifactorial: strength, balance, vision, medicines, environment and confidence interact.",
    medicalManagement: ["medication review", "bone health", "vision/feet checks"],
    physiotherapySafety: ["postural BP", "home hazards", "cognition", "safeguarding"],
    escalationTriggers: ["syncope", "head injury on anticoagulants", "safeguarding concern"],
    questions: ["Which risks are modifiable?", "Which outcome measure?", "What safety-net?"],
    modelAnswer: "Use strength/balance assessment, home risk review, postural BP screening and onward referral where needed.",
    sources: ["local-trust-placeholder"],
  },
];

const redFlagPriorityTitles = new Set([
  "Cauda equina syndrome",
  "Metastatic spinal cord compression",
  "Spinal fracture",
  "Spinal infection",
  "Cancer-related spinal pain",
  "Acute stroke",
  "Transient ischaemic attack",
  "DVT",
  "Deep vein thrombosis",
  "Pulmonary embolism",
  "Acute coronary syndrome",
  "Sepsis",
  "Acute respiratory deterioration",
  "Pneumothorax",
  "Unstable observations",
  "Hypoxia",
  "Hypercapnia",
  "New neurological deficit",
  "Sudden severe headache",
  "Safeguarding concern",
  "Falls with suspected fracture",
  "Post-operative wound infection",
  "Compartment syndrome",
  "Serious adverse response to exercise or mobilisation",
]);

const categoryConfig: Record<string, { specialty: Specialty; tags: string[]; priority: Priority; difficulty: "Student" | "Band 5" | "Band 6" }> = {
  "Musculoskeletal Outpatients": { specialty: "Musculoskeletal", tags: ["MSK outpatient", "Primary care"], priority: "Common outpatient condition", difficulty: "Band 5" },
  "Rheumatology and Persistent Pain": { specialty: "Musculoskeletal", tags: ["MSK outpatient", "Primary care"], priority: "Specialist but important", difficulty: "Band 6" },
  "Trauma and Orthopaedics": { specialty: "Musculoskeletal", tags: ["Orthopaedics", "Trauma"], priority: "Common ward-based condition", difficulty: "Band 5" },
  "Neurology and Neurorehabilitation": { specialty: "Neurology", tags: ["Neurology", "Stroke", "Community rehab"], priority: "Core NHS physio condition", difficulty: "Band 5" },
  "Respiratory Physiotherapy and Respiratory Medicine": { specialty: "Respiratory", tags: ["Respiratory ward", "Acute medicine", "ICU"], priority: "Core NHS physio condition", difficulty: "Band 5" },
  "Cardiology and Cardiorespiratory Rehabilitation": { specialty: "Cardiorespiratory and acute care", tags: ["Cardiology", "Acute medicine", "Community rehab"], priority: "Common ward-based condition", difficulty: "Band 5" },
  "Acute Medicine, General Medicine and ICU": { specialty: "Cardiorespiratory and acute care", tags: ["Acute medicine", "ICU"], priority: "Common ward-based condition", difficulty: "Band 6" },
  "Older Adults, Frailty and Community Rehabilitation": { specialty: "Older adult rehab", tags: ["Older adults", "Community rehab"], priority: "Core NHS physio condition", difficulty: "Band 5" },
  "Vestibular Rehabilitation": { specialty: "Neurology", tags: ["Vestibular", "Community rehab"], priority: "Specialist but important", difficulty: "Band 6" },
  Paediatrics: { specialty: "Paediatrics", tags: ["Paediatrics"], priority: "Specialist but important", difficulty: "Band 5" },
  "Pelvic Health, Women's Health and Men's Health": { specialty: "Pelvic health", tags: ["Pelvic health"], priority: "Specialist but important", difficulty: "Band 6" },
  "Oncology, Haematology and Palliative Care": { specialty: "Cardiorespiratory and acute care", tags: ["Oncology", "Palliative care"], priority: "Specialist but important", difficulty: "Band 6" },
  "Amputee and Prosthetic Rehabilitation": { specialty: "Musculoskeletal", tags: ["Amputee rehab", "Community rehab"], priority: "Specialist but important", difficulty: "Band 6" },
  "Hand Therapy": { specialty: "Musculoskeletal", tags: ["Hand therapy", "MSK outpatient"], priority: "Specialist but important", difficulty: "Band 6" },
  "Learning Disability and Complex Disability": { specialty: "Neurology", tags: ["Community rehab", "Older adults"], priority: "Specialist but important", difficulty: "Band 6" },
  "Occupational Health and Primary Care": { specialty: "Musculoskeletal", tags: ["Occupational health", "Primary care"], priority: "Common outpatient condition", difficulty: "Band 5" },
  "Long-Term Conditions and Public Health": { specialty: "Cardiorespiratory and acute care", tags: ["Community rehab", "Primary care"], priority: "Common outpatient condition", difficulty: "Band 5" },
  "High Priority Red Flag Conditions": { specialty: "Cardiorespiratory and acute care", tags: ["Acute medicine", "Primary care"], priority: "Red flag or urgent escalation condition", difficulty: "Band 6" },
};

const extensiveConditionGroups: Array<{ category: keyof typeof categoryConfig; items: string[] }> = [
  {
    category: "Musculoskeletal Outpatients",
    items: `Non-specific low back pain
Acute low back pain
Chronic low back pain
Sciatica
Lumbar radiculopathy
Lumbar spinal stenosis
Lumbar disc herniation
Spondylolisthesis
Cervical radiculopathy
Neck pain
Whiplash-associated disorder
Thoracic spine pain
Coccydynia
Sacroiliac joint pain
Cauda equina syndrome
Vertebral compression fracture
Rotator cuff related shoulder pain
Rotator cuff tear
Subacromial pain syndrome
Frozen shoulder
Shoulder instability
Shoulder dislocation
Acromioclavicular joint injury
Glenohumeral osteoarthritis
Calcific tendinopathy
Biceps tendinopathy
Tennis elbow
Golfer's elbow
Olecranon bursitis
Carpal tunnel syndrome
De Quervain's tenosynovitis
Trigger finger
Dupuytren's contracture
Wrist sprain
Distal radius fracture rehabilitation
Hand osteoarthritis
Hip osteoarthritis
Femoroacetabular impingement
Greater trochanteric pain syndrome
Gluteal tendinopathy
Hip labral pathology
Hip dysplasia in adults
Iliopsoas tendinopathy
Adductor-related groin pain
Osteitis pubis
Pelvic girdle pain
Knee osteoarthritis
Patellofemoral pain
Meniscal injury
ACL injury
PCL injury
MCL injury
LCL injury
Patellar tendinopathy
IT band syndrome
Osgood-Schlatter disease
Baker's cyst
Lateral ankle sprain
Achilles tendinopathy
Achilles rupture
Plantar fasciitis
Posterior tibial tendon dysfunction
Peroneal tendinopathy
Ankle osteoarthritis
Metatarsalgia
Morton's neuroma
Hallux valgus
Hallux rigidus
Stress fracture
Flat foot
High arch foot pain
General tendinopathy
Muscle strain
Ligament sprain
Delayed onset muscle soreness
Hamstring injury
Calf strain
Quadriceps strain
Groin strain
Shin splints
Return to sport after injury
Overuse injury
Relative energy deficiency in sport overview`.split("\n"),
  },
  {
    category: "Rheumatology and Persistent Pain",
    items: `Rheumatoid arthritis
Ankylosing spondylitis
Axial spondyloarthritis
Psoriatic arthritis
Reactive arthritis
Polymyalgia rheumatica
Giant cell arteritis
Systemic lupus erythematosus overview
Gout
Pseudogout
Osteoporosis
Osteopenia
Fragility fracture
Vertebral compression fracture
Paget's disease of bone overview
Chronic primary pain
Fibromyalgia
Complex regional pain syndrome
Neuropathic pain
Central sensitisation
Chronic fatigue syndrome / ME overview
Long-term pain and deconditioning`.split("\n"),
  },
  {
    category: "Trauma and Orthopaedics",
    items: `Neck of femur fracture
Intertrochanteric hip fracture
Pelvic fracture
Acetabular fracture
Femoral shaft fracture
Tibial plateau fracture
Ankle fracture
Distal radius fracture
Proximal humerus fracture
Clavicle fracture
Rib fracture
Spinal fracture
Polytrauma rehabilitation
Total hip replacement
Total knee replacement
Partial knee replacement
Shoulder replacement
Hip hemiarthroplasty
Revision joint replacement
Post-operative hip precautions
Post-operative knee rehabilitation
Arthroscopy rehabilitation
Rotator cuff repair rehabilitation
ACL reconstruction rehabilitation
Meniscal repair rehabilitation
Spinal surgery rehabilitation
Amputation following trauma or vascular disease
Post-operative respiratory complications
Post-operative atelectasis
Post-operative pneumonia
Post-operative delirium
Post-operative pain
Wound infection
DVT after surgery
Pulmonary embolism after surgery
Reduced mobility after surgery`.split("\n"),
  },
  {
    category: "Neurology and Neurorehabilitation",
    items: `Ischaemic stroke
Haemorrhagic stroke
Transient ischaemic attack
Subarachnoid haemorrhage
Traumatic brain injury
Hypoxic brain injury
Brain tumour rehabilitation
Raised intracranial pressure overview
Post-stroke spasticity
Post-stroke shoulder pain
Pusher syndrome
Neglect after stroke
Ataxia after stroke
Dysphagia overview
Parkinson's disease
Multiple sclerosis
Motor neurone disease
Huntington's disease
Progressive supranuclear palsy
Multiple system atrophy
Cerebellar ataxia
Hereditary spastic paraplegia
Dementia-related mobility impairment
Guillain-Barre syndrome
Chronic inflammatory demyelinating polyneuropathy
Peripheral neuropathy
Diabetic neuropathy
Spinal cord injury
Cauda equina syndrome
Brown-Sequard syndrome overview
Transverse myelitis
Foot drop
Common peroneal nerve palsy
Brachial plexus injury
Functional neurological disorder
Functional gait disorder
Non-epileptic attack disorder overview
Vestibular migraine
Fatigue in neurological disease
Spasticity
Dystonia
Contracture in neurological disease`.split("\n"),
  },
  {
    category: "Respiratory Physiotherapy and Respiratory Medicine",
    items: `COPD
COPD exacerbation
Asthma
Acute asthma attack
Bronchiectasis
Cystic fibrosis overview
Small airways disease overview
Pneumonia
Aspiration pneumonia
Hospital-acquired pneumonia
COVID-19 respiratory complications
Influenza-related respiratory decline
Sepsis-related respiratory dysfunction
Pleurisy
Type 1 respiratory failure
Type 2 respiratory failure
Hypoxia
Hypercapnia
Ventilation-perfusion mismatch
Atelectasis
Acute respiratory distress syndrome
Pulmonary oedema
Pulmonary embolism
Pleural effusion
Pneumothorax
Haemothorax overview
Pulmonary hypertension
Interstitial lung disease
Pulmonary fibrosis
Sarcoidosis overview
Obesity hypoventilation syndrome
Sleep apnoea overview
Neuromuscular respiratory weakness
Retained secretions
Ineffective cough
Sputum retention
Mucus plugging
Tracheostomy management basics
Tracheostomy weaning basics
Laryngectomy overview
Suctioning considerations
Humidification issues
Speaking valve considerations
Dysfunctional breathing
Hyperventilation syndrome
Breathlessness management
Chronic cough
Panic-related breathlessness`.split("\n"),
  },
  {
    category: "Cardiology and Cardiorespiratory Rehabilitation",
    items: `Myocardial infarction
Angina
Heart failure with reduced ejection fraction
Heart failure with preserved ejection fraction
Atrial fibrillation
Bradycardia overview
Tachyarrhythmias overview
Hypertension
Orthostatic hypotension
Valvular heart disease overview
Endocarditis overview
Cardiomyopathy
Pericarditis
Cardiac arrest recovery
Post-cardiac surgery rehabilitation
Coronary artery bypass graft rehabilitation
Valve replacement rehabilitation
Pacemaker considerations
Implantable cardioverter defibrillator considerations
Peripheral arterial disease
Intermittent claudication
Critical limb ischaemia
Deep vein thrombosis
Pulmonary embolism
Varicose veins overview
Vascular surgery rehabilitation
Diabetic foot disease
Lower limb amputation due to vascular disease`.split("\n"),
  },
  {
    category: "Acute Medicine, General Medicine and ICU",
    items: `Sepsis
Acute kidney injury
Dehydration
Electrolyte imbalance
Anaemia
Hypoglycaemia
Hyperglycaemia
Diabetic ketoacidosis overview
Hyperosmolar hyperglycaemic state overview
Frailty syndrome
Syncope
Collapse of unknown cause
Reduced mobility due to acute illness
Hospital-acquired deconditioning
ICU acquired weakness
Critical illness polyneuropathy
Critical illness myopathy
Mechanical ventilation overview
Non-invasive ventilation overview
Delirium in ICU
Post-intensive care syndrome
Early mobilisation in ICU
Sedation-related weakness
Proning-related complications
Respiratory failure in ICU
Weaning from ventilation overview
Abdominal surgery rehabilitation
Thoracic surgery rehabilitation
Vascular surgery rehabilitation
Colorectal surgery rehabilitation
Upper GI surgery rehabilitation
Urological surgery rehabilitation
Post-operative ileus overview
Post-operative pain and reduced mobility
Enhanced recovery after surgery`.split("\n"),
  },
  {
    category: "Older Adults, Frailty and Community Rehabilitation",
    items: `Frailty syndrome
Sarcopenia
Deconditioning
Falls
Fear of falling
Reduced mobility
Reduced exercise tolerance
Functional decline
Immobility syndrome
Pressure ulcer risk overview
Malnutrition-related weakness
Polypharmacy and falls risk
Delirium
Dementia
Depression-related reduced activity
Anxiety-related avoidance
Parkinsonism in older adults
Hip fracture
Fragility fracture
Osteoporosis
Post-fall long lie
Recurrent falls
Orthostatic hypotension
Vestibular causes of falls
Urinary tract infection-related functional decline
Chest infection-related functional decline
End-of-life mobility considerations
Housebound deconditioning
Home safety and mobility decline
Stair difficulty
Transfer difficulty
Carer-dependent mobility
Reablement needs
Equipment-related mobility problems
Long-term condition self-management`.split("\n"),
  },
  {
    category: "Vestibular Rehabilitation",
    items: `Benign paroxysmal positional vertigo
Vestibular neuritis
Labyrinthitis
Unilateral vestibular hypofunction
Bilateral vestibular hypofunction
Meniere's disease
Vestibular migraine
Persistent postural-perceptual dizziness
Cervicogenic dizziness
Dizziness in older adults
Balance impairment
Falls related to vestibular dysfunction`.split("\n"),
  },
  {
    category: "Paediatrics",
    items: `Developmental delay
Global developmental delay
Developmental coordination disorder
Toe walking
Hypermobility in children
Torticollis
Plagiocephaly
Delayed walking
Gait abnormalities in children
Cerebral palsy
Spina bifida
Duchenne muscular dystrophy
Spinal muscular atrophy
Paediatric acquired brain injury
Paediatric spinal cord injury
Down syndrome-related motor delay
Neuromuscular weakness in children
Talipes equinovarus
Developmental dysplasia of the hip
Perthes disease
Slipped upper femoral epiphysis
Osgood-Schlatter disease
Sever's disease
Juvenile idiopathic arthritis
Paediatric fracture rehabilitation
Paediatric asthma
Bronchiolitis overview
Cystic fibrosis overview
Recurrent chest infections
Paediatric airway clearance needs
Neuromuscular respiratory weakness in children`.split("\n"),
  },
  {
    category: "Pelvic Health, Women's Health and Men's Health",
    items: `Pelvic girdle pain
Pregnancy-related back pain
Postnatal pelvic floor dysfunction
Stress urinary incontinence
Urge urinary incontinence
Mixed urinary incontinence
Pelvic organ prolapse
Diastasis recti
Perineal trauma overview
Caesarean section recovery
Return to exercise after pregnancy
Menopause-related pelvic health issues
Chronic pelvic pain
Vaginismus overview
Vulvodynia overview
Endometriosis-related pain overview
Bladder pain syndrome overview
Post-prostatectomy urinary incontinence
Pelvic floor dysfunction in men
Chronic prostatitis / chronic pelvic pain syndrome overview
Faecal incontinence
Constipation-related pelvic floor dysfunction
Obstructed defecation overview`.split("\n"),
  },
  {
    category: "Oncology, Haematology and Palliative Care",
    items: `Cancer-related fatigue
Metastatic spinal cord compression
Bone metastases
Brain tumour rehabilitation
Lung cancer rehabilitation
Breast cancer rehabilitation
Prostate cancer rehabilitation
Colorectal cancer rehabilitation
Head and neck cancer rehabilitation
Chemotherapy-induced peripheral neuropathy
Radiotherapy-related fibrosis
Cancer-related deconditioning
Post-cancer surgery rehabilitation
Multiple myeloma
Leukaemia-related deconditioning overview
Lymphoma-related deconditioning overview
Anaemia-related exercise intolerance
Thrombocytopenia precautions
Neutropenia precautions
Palliative rehabilitation
Breathlessness at end of life
Fatigue management in palliative care
Mobility at end of life
Positioning for comfort
Secretion management overview`.split("\n"),
  },
  {
    category: "Amputee and Prosthetic Rehabilitation",
    items: `Below-knee amputation
Above-knee amputation
Partial foot amputation
Upper limb amputation overview
Phantom limb pain
Residual limb pain
Contracture after amputation
Wound healing issues
Prosthetic gait training
Falls risk after amputation
Vascular amputee rehabilitation
Diabetic amputee rehabilitation
Trauma-related amputation`.split("\n"),
  },
  {
    category: "Hand Therapy",
    items: `Flexor tendon injury
Extensor tendon injury
Metacarpal fracture
Phalangeal fracture
Mallet finger
Boutonniere deformity
Swan neck deformity
Dupuytren's contracture
Trigger finger
De Quervain's tenosynovitis
Carpal tunnel syndrome
Cubital tunnel syndrome
Complex regional pain syndrome of the hand
Rheumatoid hand deformity
Thumb base osteoarthritis`.split("\n"),
  },
  {
    category: "Learning Disability and Complex Disability",
    items: `Cerebral palsy in adults
Learning disability and mobility decline
Postural management needs
Contracture management
Scoliosis in neurological disability
Respiratory complications in neurological disability
Dysphagia-related aspiration risk
Wheelchair-related posture problems
Long-term seating needs
Spasticity management
24-hour postural care overview`.split("\n"),
  },
  {
    category: "Occupational Health and Primary Care",
    items: `Work-related neck pain
Work-related low back pain
Repetitive strain injury
Work-related upper limb disorder
Desk-based postural pain
Manual handling injury
Occupational shoulder pain
Return-to-work planning
Fit note and work modification considerations
First contact physiotherapy MSK presentations
Suspected inflammatory arthritis
Suspected fracture
Suspected serious spinal pathology
Persistent pain in primary care
Early osteoarthritis management
Exercise referral considerations`.split("\n"),
  },
  {
    category: "Long-Term Conditions and Public Health",
    items: `Obesity-related mobility limitation
Diabetes-related mobility complications
Long COVID
Chronic fatigue after illness
Multimorbidity and deconditioning
Physical inactivity
Falls risk due to inactivity
Smoking-related respiratory decline
Alcohol-related neuropathy overview`.split("\n"),
  },
  {
    category: "High Priority Red Flag Conditions",
    items: `Cauda equina syndrome
Metastatic spinal cord compression
Spinal fracture
Spinal infection
Cancer-related spinal pain
Acute stroke
Transient ischaemic attack
DVT
Pulmonary embolism
Acute coronary syndrome
Sepsis
Acute respiratory deterioration
Pneumothorax
Unstable observations
Hypoxia
Hypercapnia
New neurological deficit
Sudden severe headache
Safeguarding concern
Falls with suspected fracture
Post-operative wound infection
Compartment syndrome
Serious adverse response to exercise or mobilisation`.split("\n"),
  },
];

const existingDetailedIds = new Set(detailedConditions.map((condition) => condition.id));
const existingDetailedTitles = new Set(detailedConditions.map((condition) => condition.title.toLowerCase()));

const conditionSummaryFor = (title: string, category: string, config: (typeof categoryConfig)[keyof typeof categoryConfig]) => {
  const lower = title.toLowerCase();
  const isRedFlag = redFlagPriorityTitles.has(title) || category === "High Priority Red Flag Conditions";
  const isResp = config.specialty === "Respiratory" || /(respiratory|pneumonia|asthma|copd|bronch|trache|sputum|cough|atelectasis|hypoxia|hypercapnia|pneumothorax|pleural|pulmonary|ventilation|breath|airway)/.test(lower);
  const isSurgical = /(fracture|replacement|repair|reconstruction|arthroscopy|surgery|post-operative|amputation|hemiarthroplasty|wound|trauma)/.test(lower);
  const isNeuro = config.specialty === "Neurology" || /(stroke|spasticity|neuropathy|brain|cord|nerve|dysphagia|dementia|parkinson|sclerosis|ataxia|foot drop)/.test(lower);
  const isPain = /(pain|fibromyalgia|sensitisation|fatigue|deconditioning|chronic)/.test(lower);

  const mechanism = isRedFlag
    ? `${title} is included as a high-priority safety presentation where the physiotherapy task is rapid recognition, stopping unsafe treatment and escalating through local NHS pathways.`
    : isResp
      ? `${title} commonly affects ventilation, perfusion, airway mechanics, secretion clearance, oxygenation or respiratory muscle load.`
      : isSurgical
        ? `${title} involves tissue injury, operative or post-trauma recovery, inflammation, pain, immobility risk and the need to match loading to medical or surgical restrictions.`
        : isNeuro
          ? `${title} affects neural signalling, motor control, sensation, balance, fatigue or autonomic function, linking pathology directly to safety and function.`
          : isPain
            ? `${title} is influenced by tissue sensitivity, nervous-system processing, fatigue, sleep, beliefs, activity tolerance and wider health factors.`
            : `${title} affects tissue, organ-system or whole-person function in ways physiotherapists need to understand before assessment, treatment or discharge planning.`;

  return { isRedFlag, isResp, isSurgical, isNeuro, isPain, mechanism };
};

const genericInvestigationsFor = (specialty: Specialty, title: string) => {
  const lower = title.toLowerCase();
  if (/(respiratory|pneumonia|asthma|copd|bronch|hypoxia|hypercapnia|pulmonary|pleural|pneumothorax|airway|trache|cough)/.test(lower)) {
    return investigationLibrary.filter((item) => ["fbc", "crp", "abg-vbg", "cxr", "spirometry", "cultures"].includes(item.id));
  }
  if (/(cardiac|heart|angina|infarction|fibrillation|brady|tachy|hypertension|syncope|dvt|embolism|vascular)/.test(lower)) {
    return investigationLibrary.filter((item) => ["ecg", "troponin", "bnp", "fbc", "u-e", "d-dimer"].includes(item.id));
  }
  if (specialty === "Neurology" || /(stroke|brain|cord|neuropathy|nerve|spasticity|dysphagia)/.test(lower)) {
    return investigationLibrary.filter((item) => ["ct", "mri", "fbc", "u-e", "ecg"].includes(item.id));
  }
  if (/(infection|sepsis|wound|delirium|kidney|anaemia|glucose|dehydration)/.test(lower)) {
    return investigationLibrary.filter((item) => ["fbc", "crp", "u-e", "lfts", "abg-vbg", "cultures"].includes(item.id));
  }
  return investigationLibrary.filter((item) => ["fbc", "crp", "u-e", "ct", "mri"].includes(item.id));
};

const generatedCondition = (title: string, category: keyof typeof categoryConfig): Condition => {
  const config = categoryConfig[category];
  const id = slug(title);
  const summary = conditionSummaryFor(title, category, config);
  const priority = summary.isRedFlag ? "Red flag or urgent escalation condition" : config.priority;
  const difficulty = summary.isRedFlag ? "Band 6" : config.difficulty;
  const tags = Array.from(new Set([...config.tags, category, priority]));
  const investigations = genericInvestigationsFor(config.specialty, title);
  const respTreatments = summary.isResp ? airwayClearance : [];
  const surgicalManagement = summary.isSurgical
    ? "Surgical or procedural management may be relevant. Confirm operative notes, restrictions, weight-bearing status, wound requirements and local post-operative protocols before treatment."
    : undefined;

  const pathPoint = summary.mechanism;
  const medPoint = summary.isRedFlag
    ? "Immediate medical review, emergency pathway activation and careful documentation are the priority."
    : "Medical management depends on diagnosis, severity, comorbidities, medicines, monitoring and national or local guidance.";
  const escalation = summary.isRedFlag
    ? "Treat as urgent: stop routine physiotherapy, assess ABCDE where appropriate, inform the nurse in charge or responsible clinician and use the local escalation pathway."
    : "Escalate new red flags, unstable observations, unexpected deterioration, serious investigation abnormalities or symptoms outside physiotherapy scope.";

  return {
    id,
    title,
    specialty: config.specialty,
    setting: tags,
    priority,
    tags,
    difficulty,
    overview: {
      definition: `${title} is included in the NHS physiotherapy revision library as a ${priority.toLowerCase()} seen across ${config.tags.join(", ")} settings.`,
      commonPatientGroups: ["People presenting in NHS physiotherapy-relevant pathways", "Patients with relevant comorbidity, functional decline or safety concerns", "Patients requiring MDT assessment, monitoring or onward referral"],
      commonNhsSettings: config.tags,
      whyPhysiosNeedToUnderstandIt: "Physiotherapists need enough medical understanding to screen safety, interpret function, communicate with the MDT and decide when treatment should pause or escalate.",
    },
    pathophysiology: {
      normal: "Normal movement and function depend on adequate tissue capacity, neurological control, cardiorespiratory reserve, cognition, pain modulation and environmental support.",
      whatGoesWrong: pathPoint,
      diseaseMechanism: `${title} should be reasoned from the underlying mechanism first, then linked to symptoms, observations, investigations and safe treatment limits.`,
      levels: "Consider cellular inflammation or degeneration, tissue injury, organ-system dysfunction and whole-person effects such as fatigue, fear, cognition, frailty or deconditioning.",
      acuteVsChronic: summary.isRedFlag ? "This may present acutely and requires urgent action rather than routine rehabilitation." : "Acute changes may need medical stabilisation; chronic changes often require risk management, education and graded function.",
      symptomLink: "Symptoms arise when the underlying pathology changes load tolerance, oxygen delivery, neural control, pain sensitivity, balance, strength or confidence.",
      functionLink: "Functional impact may include reduced mobility, transfers, gait, exercise tolerance, self-care, work, sport, family roles or discharge readiness.",
      complications: summary.isRedFlag ? ["Delayed escalation", "Neurological, respiratory, cardiac or systemic deterioration", "Avoidable harm"] : ["Pain or symptom persistence", "deconditioning", "falls risk", "delayed discharge", "psychological impact"],
      prognosis: summary.isRedFlag ? "Outcome depends on rapid recognition and timely escalation." : "Prognosis depends on severity, comorbidities, response to medical management, rehabilitation access and patient-specific goals.",
    },
    clinicalPresentation: {
      symptoms: ["Pain, breathlessness, weakness, dizziness, fatigue, altered sensation or reduced function depending on condition", "Change from baseline", "Patient or carer concern"],
      signs: ["Observation changes where relevant", "Reduced functional performance", "Condition-specific impairment pattern", "Potential red flags"],
      subjectiveFindings: ["Onset and progression", "Relevant past medical history", "Medication and treatment status", "Baseline function", "Red flag screening"],
      objectiveFindings: ["Observations", "specific system assessment", "functional task assessment", "outcome measure where appropriate", "response to treatment"],
      functionalImpact: ["Transfers", "walking", "stairs", "work or school", "ADLs", "exercise tolerance"],
      redFlagSymptoms: summary.isRedFlag ? ["Any features matching the urgent presentation", "rapid deterioration", "unstable observations"] : ["new neurological deficit", "chest pain", "severe breathlessness", "sepsis features", "safeguarding concern"],
      differentials: ["Serious pathology", "medical deterioration", "referred pain or systemic illness", "condition-specific mimics"],
    },
    investigations,
    medicalManagement: {
      firstLine: summary.isRedFlag
        ? ["Stop routine physiotherapy", "urgent clinical review", "follow local emergency pathway", "document findings and escalation"]
        : ["Confirm diagnosis and severity", "optimise medical treatment", "monitor observations and relevant bloods/imaging", "review medicines and comorbidities", "coordinate MDT plan"],
      medications: [
        medication("Condition-specific medicines", ["See local formulary and medical plan"], "Targets the relevant pathology, symptoms or risk factors.", medPoint, ["dizziness", "fatigue", "bleeding risk", "sedation", "glucose or BP effects depending on medicine"], "Physios should understand side effects that alter mobilisation, falls risk, respiratory status or exercise response."),
      ],
      monitoring: ["NEWS2 or relevant observations", "pain or symptom response", "functional tolerance", "investigation trend", "medicine side effects"],
      oxygenTherapy: summary.isResp ? "Check prescribed target saturations, delivery device, ABG/VBG trends where relevant and local oxygen policy before respiratory treatment or mobilisation." : undefined,
      surgicalManagement,
      escalationOptions: [escalation, "Use local NHS trust pathways and senior advice."],
      mdtInvolvement: ["medical team", "nursing", "physiotherapy", "occupational therapy", "pharmacy", "specialist team where relevant"],
      urgentMedicalReview: summary.isRedFlag ? ["Immediately if suspected"] : ["unstable observations", "new severe symptoms", "progressive neurological signs", "suspected infection, VTE, ACS or respiratory failure"],
    },
    physiotherapyRelevance: {
      whyItMatters: summary.isRedFlag ? "Physiotherapy relevance is mainly recognition, immediate action and documentation." : "Physiotherapy input should support safe assessment, education, function, risk reduction and discharge planning.",
      assessmentConsiderations: ["consent and capacity", "observations", "red flags", "baseline function", "medical restrictions", "patient goals"],
      functionalImpact: ["mobility", "transfers", "balance", "activity tolerance", "participation"],
      treatmentPrecautions: summary.isRedFlag ? ["do not continue routine treatment", "escalate urgently"] : ["monitor symptoms and observations", "respect medical/surgical restrictions", "avoid excessive fatigue or symptom flare"],
      rehabilitationConsiderations: summary.isRedFlag ? ["rehabilitation waits until medically assessed and safe"] : ["graded activity", "education", "specific impairment work", "self-management", "MDT discharge planning"],
      dischargePlanning: ["baseline comparison", "home or work demands", "equipment", "follow-up", "safety-netting"],
      pauseOrEscalate: [escalation],
    },
    respiratoryPhysioTreatments: respTreatments,
    treatmentReasoningTable: [
      reasoning(`${id}-medical`, "Medical assessment and management", "medical", "Clarifies diagnosis, severity and treatment priorities.", "Ensures physiotherapy is based on current clinical stability.", "Before progressing treatment when symptoms, observations or investigations are concerning.", "Do not work outside scope or delay urgent care.", "Shapes whether physio treats, modifies or escalates.", `Reviewed medical status for ${title}; relevant restrictions and escalation plan noted.`),
      reasoning(`${id}-physio`, summary.isResp ? "Respiratory physiotherapy where indicated" : "Concise physiotherapy assessment and function plan", "physiotherapy", summary.isResp ? "Uses positioning, airway clearance, breathing control and mobilisation to improve respiratory function where appropriate." : "Links impairment, safety and function to a proportionate plan.", summary.isResp ? "Relevant when secretions, atelectasis, breathlessness or exercise intolerance are present." : "Used when medically safe and functionally relevant.", "After screening red flags and confirming stability.", "Stop with deterioration, red flags or unacceptable response.", "Documents clinical reasoning, not just exercise choice.", `Physio assessment for ${title}: baseline, safety checks, intervention and response documented.`),
      ...baseReasoningRows(id, title),
    ],
    redFlags: summary.isRedFlag ? [title, "Unstable observations", "Rapid deterioration"] : ["Unstable observations", "New neurological deficit", "Sepsis", "DVT/PE", "Safeguarding concern"],
    nhsConsiderations: {
      commonNhsSetting: config.tags,
      referralPathways: ["local specialty pathway", "GP or consultant review", "community or outpatient physiotherapy", "urgent pathway if red flags"],
      mdtRoles: ["medical diagnosis and management", "nursing monitoring", "physiotherapy assessment and function", "OT discharge and ADLs", "pharmacy medicine review"],
      medicalTeamInvolvement: ["diagnosis", "investigation interpretation", "prescribing", "escalation decisions"],
      dischargePlanningPoints: ["baseline function", "risk", "support", "equipment", "follow-up"],
      localTrustPolicyReminders: ["check local referral criteria", "check escalation pathways", "check specialty protocols"],
      patientEducationConsiderations: ["safety-net symptoms", "expected recovery or progression", "who to contact", "self-management within scope"],
    },
    revisionSummary: {
      pathophysiologyPoints: [pathPoint, "Link mechanism to symptoms.", "Consider acute versus chronic change.", "Consider complications.", "Consider function and participation."],
      medicalManagementPoints: [medPoint, "Check relevant investigations.", "Monitor observations.", "Understand medicine side effects.", "Escalate deterioration."],
      physiotherapyRelevancePoints: summary.isRedFlag ? ["recognise", "stop", "escalate"] : ["screen safety", "assess function", "plan proportionate rehab"],
      commonMistakes: summary.isRedFlag ? ["continuing routine treatment", "delayed escalation", "poor documentation"] : ["focusing only on exercises", "missing medical context", "not documenting escalation thresholds"],
      interviewTalkingPoints: ["Explain pathophysiology simply.", "State key investigations.", "Describe medical management and physio safety.", "Name escalation triggers."],
    },
    flashcards: makeCards(id, title, pathPoint, medPoint, investigations[0]?.title ?? "Relevant investigations depend on presentation.", escalation),
    quizQuestions: makeQuiz(id, title, pathPoint, medPoint, investigations[0]?.title ?? "Relevant investigations depend on presentation.", escalation, summary.isRedFlag ? "Stop treatment and escalate urgently." : "Screen safety, monitor response and keep treatment proportionate."),
    sources: ["local-trust-placeholder", "nhs-conditions", "textbook-placeholder"],
    dateLastReviewed: "2026-04-29",
  };
};

const generatedConditions = extensiveConditionGroups
  .flatMap(({ category, items }) => items.map((item) => ({ category, title: item.trim() })).filter((item) => item.title.length > 0))
  .filter(({ title }) => !existingDetailedIds.has(slug(title)) && !existingDetailedTitles.has(title.toLowerCase()))
  .map(({ title, category }) => generatedCondition(title, category));

const defaultPriorityFor = (condition: Omit<Condition, "priority" | "tags">): Priority => {
  if (redFlagPriorityTitles.has(condition.title)) return "Red flag or urgent escalation condition";
  if (condition.specialty === "Respiratory" || condition.specialty === "Neurology" || condition.title === "Hip fracture") return "Core NHS physio condition";
  if (condition.setting.some((setting) => /ward|acute|stroke|frailty|orthopaedic/i.test(setting))) return "Common ward-based condition";
  return "Common outpatient condition";
};

const detailedWithMeta: Condition[] = detailedConditions.map((condition) => ({
  ...condition,
  priority: defaultPriorityFor(condition),
  tags: Array.from(new Set([...condition.setting, condition.specialty, defaultPriorityFor(condition)])),
}));

export const conditions: Condition[] = [...detailedWithMeta, ...generatedConditions];

export const allFlashcards = conditions.flatMap((condition) => condition.flashcards.map((card) => ({ ...card, conditionId: condition.id, conditionTitle: condition.title })));
export const allQuizQuestions = conditions.flatMap((condition) => condition.quizQuestions.map((question) => ({ ...question, conditionId: condition.id, conditionTitle: condition.title })));
export const treatmentReasoningEntries = conditions.flatMap((condition) => condition.treatmentReasoningTable.map((entry) => ({ ...entry, conditionId: condition.id, conditionTitle: condition.title, specialty: condition.specialty })));
