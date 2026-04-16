import { WHATSAPP_INTAKE } from "@/constants/content";
import { digitalCardTierLabelEn, digitalCardTierLabelKa } from "./digital-card-product";
import type { Lane1CustomizerState } from "./types";

function normalizeWaDigits(): string {
  return WHATSAPP_INTAKE.replace(/\D/g, "");
}

export type Lane1WhatsAppUrlOptions = {
  /** Customer skipped strict checklist; operator should confirm missing items. */
  incompleteChecklist?: boolean;
};

/**
 * Short `wa.me` text only. Customer copies the full build from the site and pastes it as a follow-up message.
 */
export function buildLane1WhatsAppOpenerUrl(
  state: Lane1CustomizerState,
  orderId: string,
  options?: Lane1WhatsAppUrlOptions,
): string {
  const lines: string[] = [];
  if (state.primaryLang === "ka") {
    lines.push("გამარჯობა Genezisi!");
    lines.push(`მსურს შევიკვეთო ციფრული ვიზიტკა — ${digitalCardTierLabelKa(state.selectedTier)} · შეკვეთის ID: ${orderId}`);
    if (options?.incompleteChecklist) {
      lines.push("");
      lines.push("შენიშვნა: სავალდებულო ჩეკლისტი გამოვტოვე — გთხოვთ დამიდასტუროთ.");
    }
  } else {
    lines.push("Hi Genezisi!");
    lines.push(`I would like to order the Digital Business Card — ${digitalCardTierLabelEn(state.selectedTier)} · ID: ${orderId}`);
    if (options?.incompleteChecklist) {
      lines.push("");
      lines.push("Note: I skipped some required checklist items — please confirm with me.");
    }
  }

  const message = lines.join("\n");
  const phone = normalizeWaDigits();
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
