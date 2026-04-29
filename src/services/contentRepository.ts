import {
  allFlashcards,
  allQuizQuestions,
  assessmentFrameworks,
  caseScenarios,
  conditionCatalogue,
  conditions,
  investigationLibrary,
  medicalManagementTopics,
  outcomeMeasures,
  pathophysiologyTopics,
  redFlags,
  sourceReferences,
  treatmentReasoningEntries,
} from "../data/content";

// Swap these local reads for API/database calls when a backend or CMS is introduced.
export const contentRepository = {
  getConditions: () => conditions,
  getConditionCatalogue: () => conditionCatalogue,
  getPathophysiologyTopics: () => pathophysiologyTopics,
  getMedicalManagementTopics: () => medicalManagementTopics,
  getInvestigations: () => investigationLibrary,
  getTreatmentReasoningEntries: () => treatmentReasoningEntries,
  getAssessmentFrameworks: () => assessmentFrameworks,
  getRedFlags: () => redFlags,
  getOutcomeMeasures: () => outcomeMeasures,
  getCaseScenarios: () => caseScenarios,
  getFlashcards: () => allFlashcards,
  getQuizQuestions: () => allQuizQuestions,
  getSourceReferences: () => sourceReferences,
};
