export type SovereignPackageId = "bridge" | "network" | "empire";

export type SovereignPackage = {
  id: SovereignPackageId;
  name: string;
  initFee: string;
  mrr: string;
  bullets: string[];
  stripePriceEnvKey: string;
};

export const SOVEREIGN_PACKAGES: SovereignPackage[] = [
  {
    id: "bridge",
    name: "Grade 01: The Bridge",
    initFee: "₾1,500",
    mrr: "₾299/mo",
    bullets: [
      "Single-page extraction hub",
      "100ms load target on Vercel Edge",
      "Basic AI lead sorting pipeline",
    ],
    stripePriceEnvKey: "NEXT_PUBLIC_STRIPE_BRIDGE_PRICE_ID",
  },
  {
    id: "network",
    name: "Grade 02: The Network",
    initFee: "₾3,500",
    mrr: "₾499/mo",
    bullets: [
      "Multi-page luxury environment",
      "Advanced SEO and search dominance",
      "24/7 sales agent integration",
    ],
    stripePriceEnvKey: "NEXT_PUBLIC_STRIPE_NETWORK_PRICE_ID",
  },
  {
    id: "empire",
    name: "Grade 03: The Empire",
    initFee: "₾7,500+",
    mrr: "₾999/mo",
    bullets: [
      "Full DM-to-Web intercept stack",
      "Custom commerce / booking ecosystem",
      "Dedicated architectural oversight",
    ],
    stripePriceEnvKey: "NEXT_PUBLIC_STRIPE_EMPIRE_PRICE_ID",
  },
] as const;

