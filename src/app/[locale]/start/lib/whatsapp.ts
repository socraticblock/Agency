import { WHATSAPP_INTAKE } from "@/constants/content";
import { DIGITAL_CARD_ORDER_SCHEMA_VERSION } from "./digital-card-product";
import { buildOrderSummaryLines, buildOrderSummaryLinesKa } from "./order-payload";
import type { Lane1CustomizerState } from "./types";

function normalizeWaDigits(): string {
  return WHATSAPP_INTAKE.replace(/\D/g, "");
}

export type Lane1WhatsAppUrlOptions = {
  /** Customer skipped strict checklist; operator should confirm missing items. */
  incompleteChecklist?: boolean;
};

/** Compact message for users who prefer direct communication in WhatsApp. */
export function buildLane1WhatsAppUrl(
  state: Lane1CustomizerState,
  orderId: string,
  options?: Lane1WhatsAppUrlOptions,
): string {
  const lines: string[] = [];
  if (state.primaryLang === "ka") {
    lines.push("გამარჯობა Genezisi! ციფრული ვიზიტკის შესახებ პირდაპირ WhatsApp-ში კომუნიკაცია მირჩევნია.");
    lines.push("");
    lines.push(`შეკვეთა · სქემა v${DIGITAL_CARD_ORDER_SCHEMA_VERSION}`);
    lines.push("");
    lines.push(...buildOrderSummaryLinesKa(state, orderId));
    if (options?.incompleteChecklist) {
      lines.push("");
      lines.push("შენიშვნა: კლიენტმა გამოტოვა სავალდებულო ჩეკლისტი — გთხოვთ გადაამოწმოთ.");
    }
  } else {
    lines.push("Hi Genezisi! I prefer to communicate directly via WhatsApp about my Digital Business Card.");
    lines.push("");
    lines.push(`ORDER · schema v${DIGITAL_CARD_ORDER_SCHEMA_VERSION}`);
    lines.push("");
    lines.push(...buildOrderSummaryLines(state, orderId));
    if (options?.incompleteChecklist) {
      lines.push("");
      lines.push("Note: I continued without completing the required checklist — please confirm details.");
    }
  }

  const message = lines.join("\n");
  const phone = normalizeWaDigits();
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
