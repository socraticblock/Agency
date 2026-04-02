import { FOUNDATIONS, type Foundation } from "@/constants/pricing";

/** Card order on `/pricing` (matches marketing story arc). */
export const PRICING_TIER_ORDER = ["landing", "cms", "saas", "ecomm"] as const;

export function getOrderedPricingFoundations(): Foundation[] {
  return PRICING_TIER_ORDER.map((id) => FOUNDATIONS.find((f) => f.id === id)!);
}

export function tierPrimaryHref(locale: string, f: Foundation): string {
  const path = f.ctaHref ?? `/architect?tier=professional`;
  return `/${locale}${path.startsWith("/") ? path : `/${path}`}`;
}

export function priceDisplayLabel(f: Foundation): string {
  if (f.isBespoke) return f.customPriceLabel ?? "Custom quote";
  return `${f.priceGEL.toLocaleString("ka-GE")} ₾`;
}
