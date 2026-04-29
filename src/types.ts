export type Specialty =
  | "Musculoskeletal"
  | "Neurology"
  | "Respiratory"
  | "Cardiorespiratory and acute care"
  | "Older adult rehab"
  | "Paediatrics"
  | "Pelvic health";

export type Setting = string;
export type Priority =
  | "Core NHS physio condition"
  | "Common ward-based condition"
  | "Common outpatient condition"
  | "Specialist but important"
  | "Red flag or urgent escalation condition";
export type Difficulty = "Student" | "Band 5" | "Band 6";
export type ConfidenceStatus = "Not Started" | "Learning" | "Needs Review" | "Confident";
export type SourceType =
  | "NICE guidance"
  | "NHS resource"
  | "CSP resource"
  | "Physiopedia page"
  | "Cochrane review"
  | "Peer-reviewed article"
  | "Local trust policy placeholder"
  | "Textbook placeholder"
  | "Other reputable educational source";

export type ManagementType = "medical" | "surgical" | "physiotherapy" | "education" | "monitoring" | "escalation";

export interface SourceReference {
  id: string;
  sourceName: string;
  sourceType: SourceType;
  authorOrOrganisation: string;
  year: string;
  link: string;
  notes: string;
  dateLastReviewed: string;
  confidenceLevel: "High" | "Moderate" | "Placeholder";
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  relatedTopic: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  relatedTopic: string;
  difficultyLevel: Difficulty;
}

export interface MedicationSummary {
  drugClass: string;
  examples: string[];
  mechanism: string;
  whyUsed: string;
  keySideEffects: string[];
  physiotherapyRelevance: string;
}

export interface Investigation {
  id: string;
  title: string;
  category: "blood test" | "imaging" | "cardiac" | "respiratory" | "neurological" | "special test";
  whatItShows: string;
  whyUseful: string;
  escalationTriggers: string[];
  sources: string[];
}

export interface TreatmentReasoningEntry {
  id: string;
  treatmentOrManagementOption: string;
  type: ManagementType;
  howItWorks: string;
  whyUsed: string;
  whenUsed: string;
  cautionsOrContraindications: string;
  physiotherapyRelevance: string;
  documentationExample: string;
}

export interface RespiratoryPhysioTreatment {
  id: string;
  title: string;
  whatItIs: string;
  howToApply: string;
  whyItHelps: string;
  whenToUse: string;
  cautions: string;
  stopSigns: string[];
  documentationExample: string;
}

export interface Condition {
  id: string;
  title: string;
  specialty: Specialty;
  setting: Setting[];
  priority: Priority;
  tags: string[];
  difficulty: Difficulty;
  overview: {
    definition: string;
    commonPatientGroups: string[];
    commonNhsSettings: string[];
    whyPhysiosNeedToUnderstandIt: string;
  };
  pathophysiology: {
    normal: string;
    whatGoesWrong: string;
    diseaseMechanism: string;
    levels: string;
    acuteVsChronic: string;
    symptomLink: string;
    functionLink: string;
    complications: string[];
    prognosis: string;
  };
  clinicalPresentation: {
    symptoms: string[];
    signs: string[];
    subjectiveFindings: string[];
    objectiveFindings: string[];
    functionalImpact: string[];
    redFlagSymptoms: string[];
    differentials: string[];
  };
  investigations: Investigation[];
  medicalManagement: {
    firstLine: string[];
    medications: MedicationSummary[];
    monitoring: string[];
    oxygenTherapy?: string;
    surgicalManagement?: string;
    escalationOptions: string[];
    mdtInvolvement: string[];
    urgentMedicalReview: string[];
  };
  physiotherapyRelevance: {
    whyItMatters: string;
    assessmentConsiderations: string[];
    functionalImpact: string[];
    treatmentPrecautions: string[];
    rehabilitationConsiderations: string[];
    dischargePlanning: string[];
    pauseOrEscalate: string[];
  };
  respiratoryPhysioTreatments: RespiratoryPhysioTreatment[];
  treatmentReasoningTable: TreatmentReasoningEntry[];
  redFlags: string[];
  nhsConsiderations: {
    commonNhsSetting: string[];
    referralPathways: string[];
    mdtRoles: string[];
    medicalTeamInvolvement: string[];
    dischargePlanningPoints: string[];
    localTrustPolicyReminders: string[];
    patientEducationConsiderations: string[];
  };
  revisionSummary: {
    pathophysiologyPoints: string[];
    medicalManagementPoints: string[];
    physiotherapyRelevancePoints: string[];
    commonMistakes: string[];
    interviewTalkingPoints: string[];
  };
  flashcards: Flashcard[];
  quizQuestions: QuizQuestion[];
  sources: string[];
  dateLastReviewed: string;
}

export interface PathophysiologyTopic {
  id: string;
  title: string;
  simpleExplanation: string;
  detailedExplanation: string;
  linkedConditions: string[];
  clinicalSigns: string[];
  physioImportance: string;
  escalationPoints: string[];
  sources: string[];
}

export interface MedicalManagementTopic {
  id: string;
  title: string;
  whatItIs: string;
  howItWorks: string;
  whyUsed: string;
  linkedConditions: string[];
  commonSideEffects: string[];
  physiotherapyRelevance: string;
  escalationPoints: string[];
  sources: string[];
}

export interface AssessmentFramework {
  id: string;
  title: string;
  setting: string;
  sections: Array<{ heading: string; prompts: string[] }>;
}

export interface RedFlag {
  id: string;
  title: string;
  linkedSpecialties: Specialty[];
  warningSigns: string[];
  immediateActions: string[];
  whoToEscalateTo: string[];
  documentation: string[];
  nhsSafetyReminder: string;
  sources: string[];
}

export interface OutcomeMeasure {
  id: string;
  title: string;
  whatItMeasures: string;
  whenToUse: string;
  howToPerform: string;
  scoring: string;
  interpretation: string;
  limitations: string;
  documentationExample: string;
  sources: string[];
}

export interface CaseScenario {
  id: string;
  title: string;
  setting: Setting;
  difficulty: Difficulty;
  patientStory: string;
  presentation: string[];
  investigations: string[];
  pathophysiologyReasoning: string;
  medicalManagement: string[];
  physiotherapySafety: string[];
  escalationTriggers: string[];
  questions: string[];
  modelAnswer: string;
  sources: string[];
}

export interface UserProgress {
  favourites: string[];
  bookmarks: string[];
  confidenceRatings: Record<string, ConfidenceStatus>;
  quizScores: Record<string, number>;
  recentlyViewed: string[];
  weakAreas: string[];
  flashcardSeen: Record<string, number>;
  streak: number;
  lastRevisionDate?: string;
}
