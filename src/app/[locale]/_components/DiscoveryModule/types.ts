import type React from "react";

export interface QuestionInputProps {
  q: any;
  answers: Record<string, unknown>;
  handleSelect: (qId: string, value: unknown, isCustom?: boolean) => void;
  setAnswers: React.Dispatch<React.SetStateAction<Record<string, unknown>>>;
  toggleMultiSelectOption: (qId: string, option: string) => void;
  getListAnswers: () => string[];
  updateListAnswer: (index: number, value: string) => void;
  removeListItem: (index: number) => void;
  addListItem: () => void;
}
