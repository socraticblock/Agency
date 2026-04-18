import { WHATSAPP_INTAKE } from "@/constants/content";
import type { ShieldTier } from "@/constants/pricing";

export type PricingWhatsAppProjectType =
  | "tier-package"
  | "custom-software"
  | "legacy-upgrade";

export interface PricingTierWhatsAppInput {
  tierName?: string;
  priceLabel?: string;
  deliveryTime?: string;
  featureLines?: string[];
  shieldTier?: ShieldTier | null;
  /** If true, omit paid shield line (user skipped selection). */
  skipShieldLine?: boolean;
  projectType?: PricingWhatsAppProjectType;
}

function normalizeWaPhone(digits: string): string {
  const trimmed = digits.replace(/\D/g, "");
  return trimmed;
}

/**
 * Rich inquiry message for pricing tier + optional Shield selection.
 */
export function buildPricingTierWhatsAppUrl(input: PricingTierWhatsAppInput): string {
  const phone = normalizeWaPhone(WHATSAPP_INTAKE);
  const projectType = input.projectType ?? "tier-package";

  let message = "";

  if (projectType === "tier-package") {
    const tierName = input.tierName ?? "";
    const priceLabel = input.priceLabel ?? "";
    const delivery = input.deliveryTime ?? "";
    const lines = input.featureLines ?? [];
    message = `Hi Genezisi! I'm interested in the ${tierName} package.\n\n`;
    message += `PACKAGE: ${tierName}\n`;
    message += `INVESTMENT: ${priceLabel}\n`;
    message += `ESTIMATED DELIVERY: ${delivery}\n\n`;
    message += `WHAT'S INCLUDED:\n`;
    const linesTrimmed = lines.slice(0, 8);
    linesTrimmed.forEach((line) => {
      message += `• ${line}\n`;
    });
    message += `\n`;
    if (input.skipShieldLine) {
      message += `PROTECTION PLAN: I'll confirm Shield on the call.\n\n`;
    } else if (input.shieldTier && input.shieldTier.priceGEL > 0) {
      message += `PROTECTION PLAN: ${input.shieldTier.name} (${input.shieldTier.name === "Reputation Scout" ? "Included" : input.shieldTier.priceGEL + " ₾/yr"})\n\n`;
    } else if (input.shieldTier && input.shieldTier.priceGEL === 0) {
      message += `PROTECTION PLAN: ${input.shieldTier.name} (included)\n\n`;
    } else {
      message += `PROTECTION PLAN: Reputation Scout (included)\n\n`;
    }
    message += `ABOUT MY BUSINESS:\n`;
    message += `- Industry: \n`;
    message += `- Timeline: \n\n`;
    message += `Can we discuss next steps? Thanks!`;
  } else if (projectType === "custom-software") {
    message =
      "Hi Genezisi!\n\nI'm interested in CUSTOM SOFTWARE ARCHITECTURE.\n\n" +
      "Project type: custom build (portal, internal tool, complex app)\n" +
      "Budget: starting from 4,000+ ₾\n\n" +
      "Can we discuss requirements?\nThanks!";
  } else {
    message =
      "Hi Genezisi!\n\nI'm interested in SITE RESCUE & MODERNIZATION.\n\n" +
      "Current situation: existing site needs audit and modernization.\n\n" +
      "Can we talk?\nThanks!";
  }

  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encoded}`;
}

export function openPricingWhatsApp(url: string): void {
  if (typeof window === "undefined") return;
  window.open(url, "_blank", "noopener,noreferrer");
}
