import { WHATSAPP_INTAKE } from "@/constants/content";
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
    lines.push("ციფრული ვიზიტკა — სრული ტექსტი უკვე დავაკოპირე; ქვემოთ ჩავკოპირებ შემდეგ შეტყობინებაში.");
    lines.push(`შეკვეთის ID: ${orderId}`);
    if (options?.incompleteChecklist) {
      lines.push("");
      lines.push("შენიშვნა: სავალდებულო ჩეკლისტი გამოვტოვე — გთხოვთ დამიდასტუროთ.");
    }
  } else {
    lines.push("Hi Genezisi!");
    lines.push("Digital Business Card order — I copied my full build from your site; pasting it in my NEXT message.");
    lines.push(`Order ID: ${orderId}`);
    if (options?.incompleteChecklist) {
      lines.push("");
      lines.push("Note: I skipped some required checklist items — please confirm with me.");
    }
  }

  const message = lines.join("\n");
  const phone = normalizeWaDigits();
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
