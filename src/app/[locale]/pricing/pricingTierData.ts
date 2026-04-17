import type { Locale } from "@/lib/i18n";

export interface TierDeckItem {
  id: string;
  label: string;
  badge?: string;
}

export function getPricingTierData(_locale: Locale): TierDeckItem[] {
  return [
    { id: "cms", label: "Professional", badge: undefined },
    { id: "saas", label: "Command Center", badge: "Most Popular" },
    { id: "ecomm", label: "E-Commerce HQ", badge: undefined },
  ];
}
