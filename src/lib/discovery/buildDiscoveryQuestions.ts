import {
  STANDARD_QUESTIONS,
  UPGRADE_QUESTIONS,
  FOUNDATION_SPECIFIC_MAP,
  MODULE_QUESTIONS_MAP
} from "./discoveryDefinitions";

interface DiscoveryOptions {
  foundation?: string | null;
  selectedModules?: string[] | null;
  isUpgrade?: boolean;
}

export function buildDiscoveryQuestions({
  foundation,
  selectedModules,
  isUpgrade = false
}: DiscoveryOptions) {
  let questions: any[] = [...STANDARD_QUESTIONS];

  if (isUpgrade) {
    questions = [...questions, ...UPGRADE_QUESTIONS];
  }

  if (foundation && FOUNDATION_SPECIFIC_MAP[foundation]) {
    questions = [...questions, ...FOUNDATION_SPECIFIC_MAP[foundation]];
  }

  if (selectedModules) {
    selectedModules.forEach(modId => {
      if (MODULE_QUESTIONS_MAP[modId]) {
        questions = [...questions, ...MODULE_QUESTIONS_MAP[modId]];
      }
    });
  }

  return questions;
}

export function isAnswerValidForDiscoveryQuestion(question: any, answer: any): boolean {
  if (answer === undefined || answer === null) return false;
  
  if (typeof answer === "string") {
    return answer.trim().length > 0;
  }
  
  if (Array.isArray(answer)) {
    return answer.length > 0;
  }
  
  if (typeof answer === "object") {
    return Object.keys(answer).length > 0;
  }
  
  return !!answer;
}

export function isDiscoveryComplete(answers: Record<string, any>, questions: any[]): boolean {
  return questions.every(q => isAnswerValidForDiscoveryQuestion(q, answers[q.id]));
}
