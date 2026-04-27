/** Digital Card product primitives — tiers, hosting, order schema version. */

export type DigitalCardTierId = "subdomain" | "professional" | "executive";

/** WhatsApp order text + order file metadata; bump when the operator-facing summary contract changes. */
export const DIGITAL_CARD_ORDER_SCHEMA_VERSION = 6 as const;

export const DIGITAL_CARD_HOSTING_ANNUAL_GEL: Record<DigitalCardTierId, number> = {
  subdomain: 150,
  professional: 150,
  executive: 200,
};

export const DIGITAL_CARD_TIER_SETUP_GEL: Record<DigitalCardTierId, number> = {
  subdomain: 150,
  professional: 250,
  executive: 350,
};

export const DIGITAL_CARD_TIERS: readonly DigitalCardTierId[] = [
  "subdomain",
  "professional",
  "executive",
] as const;

export function isDigitalCardTierId(v: unknown): v is DigitalCardTierId {
  return v === "subdomain" || v === "professional" || v === "executive";
}

export function digitalCardTierLabelEn(tier: DigitalCardTierId): string {
  switch (tier) {
    case "subdomain":
      return "Subdomain";
    case "professional":
      return "Professional";
    case "executive":
      return "Executive (VIP)";
    default:
      return tier;
  }
}

export function digitalCardTierLabelKa(tier: DigitalCardTierId): string {
  switch (tier) {
    case "subdomain":
      return "სუბდომენი";
    case "professional":
      return "პროფესიონალი";
    case "executive":
      return "ექსეკუტივი (VIP)";
    default:
      return tier;
  }
}
