import type { DigitalCardTierId } from "./digital-card-product";
import {
  DIGITAL_CARD_HOSTING_ANNUAL_GEL,
  DIGITAL_CARD_TIER_SETUP_GEL,
} from "./digital-card-product";

/** @deprecated Legacy add-on amounts — not used for Digital Card tier display; kept for reference / imports. */
export const ADDON_EXTRA_LANG_SELF_GEL = 50;
export const ADDON_EXTRA_LANG_PRO_GEL = 150;
export const ADDON_GOOGLE_MAP_GEL = 0;

// RENEWAL COPY note: This is now context-dependent; 
// defaulting to subdomain hosting value for generic copy references.
export const LANE1_RENEWAL_COPY_GEL = DIGITAL_CARD_HOSTING_ANNUAL_GEL.subdomain;

/** @deprecated Use tier setup fees; kept to avoid breaking unknown imports. */
export const LANE1_BASE_GEL = 450;

export function getDigitalCardSetupFeeGel(tier: DigitalCardTierId): number {
  return DIGITAL_CARD_TIER_SETUP_GEL[tier];
}

export function getDigitalCardHostingAnnualGel(tier: DigitalCardTierId): number {
  return DIGITAL_CARD_HOSTING_ANNUAL_GEL[tier];
}

export function getDigitalCardPricingSummary(tier: DigitalCardTierId): {
  setupGel: number;
  hostingAnnualGel: number;
} {
  return {
    setupGel: getDigitalCardSetupFeeGel(tier),
    hostingAnnualGel: getDigitalCardHostingAnnualGel(tier),
  };
}
