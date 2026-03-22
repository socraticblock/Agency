import {
  STANDARD_QUESTIONS,
  UPGRADE_QUESTIONS,
  FOUNDATION_SPECIFIC_MAP,
  MODULE_QUESTIONS_MAP,
} from "./discoveryDefinitions";

export type DiscoveryQuestion = {
  id: string;
  label: string;
  title?: string;
  description?: string;
  type?: string;
  placeholder?: string;
  options?: unknown;
  [key: string]: unknown;
};

export function buildDiscoveryQuestions(args: {
  foundation: string | null;
  selectedModules: string[];
  isUpgrade: boolean;
}): DiscoveryQuestion[] {
  const { foundation, selectedModules, isUpgrade } = args;

  if (isUpgrade) {
    return UPGRADE_QUESTIONS.map((q, i) => ({
      ...q,
      label: `Question ${(i + 1).toString().padStart(2, "0")}`,
    })) as DiscoveryQuestion[];
  }

  const spec = FOUNDATION_SPECIFIC_MAP[foundation || ""] || [];
  const dynamicModuleQs: typeof spec = [];

  for (const modId of selectedModules || []) {
    if (MODULE_QUESTIONS_MAP[modId]) {
      dynamicModuleQs.push(...MODULE_QUESTIONS_MAP[modId]);
    }
  }

  const combined = [...STANDARD_QUESTIONS, ...spec, ...dynamicModuleQs];
  return combined.map((q, i) => ({
    ...q,
    label: `Question ${(i + 1).toString().padStart(2, "0")}`,
  })) as DiscoveryQuestion[];
}

/** Same rules as `isDiscoveryComplete` for a single question — use for Continue / keyboard so users cannot advance past e.g. incomplete color palettes. */
export function isAnswerValidForDiscoveryQuestion(
  question: { id: string },
  value: unknown
): boolean {
  const v = value;
  if (v === undefined || v === null) return false;
  if (typeof v === "string") return v.trim().length > 0;
  if (Array.isArray(v)) {
    if (question.id === "color_palette") {
      return (
        v.length >= 3 &&
        v.every((c) => typeof c === "string" && String(c).trim().length > 0)
      );
    }
    return v.length > 0;
  }
  return true;
}

export function isDiscoveryComplete(
  answers: Record<string, unknown>,
  questions: { id: string }[]
): boolean {
  return questions.every((q) =>
    isAnswerValidForDiscoveryQuestion(q, answers[q.id])
  );
}
