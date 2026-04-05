import type React from "react";

export interface QuestionRendererProps {
  q: any;
  answers: Record<string, unknown>;
  handleSelect: (qId: string, value: unknown, isCustom?: boolean) => void;
  toggleMultiSelectOption: (qId: string, option: string) => void;
  setAnswers: React.Dispatch<React.SetStateAction<Record<string, unknown>>>;
  getListAnswers: () => string[];
  updateListAnswer: (index: number, value: string) => void;
  addListItem: () => void;
  removeListItem: (index: number) => void;
}
