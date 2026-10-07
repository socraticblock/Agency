import type { Dispatch, SetStateAction } from "react";
import type { Lane1CustomizerState } from "../../lib/types";

export interface SectionProps {
  state: Lane1CustomizerState;
  setState: Dispatch<SetStateAction<Lane1CustomizerState>>;
  patch: (p: Partial<Lane1CustomizerState>) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const fieldClass = "start-field mt-1.5 w-full";
export const labelClass = "start-label mb-1.5";
