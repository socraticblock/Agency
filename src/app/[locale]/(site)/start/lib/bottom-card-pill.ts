export type BottomCardPillId = "background" | "look" | "type" | "experience";

/** Exclusive open state for the four bottom card editor pills (lifted to `BusinessCardTemplate`). */
export type BottomPillPanelProps = {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
};
