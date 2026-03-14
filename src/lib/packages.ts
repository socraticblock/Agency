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
    name: "Starter",
    initFee: "₾1,500",
    mrr: "₾299/mo maintenance",
    bullets: [
      "One beautiful, high-speed landing page",
      "Loads in under 1 second on any device",
      "Basic AI assistant to capture leads 24/7",
      "Google Maps & local SEO setup",
    ],
    stripePriceEnvKey: "NEXT_PUBLIC_STRIPE_BRIDGE_PRICE_ID",
  },
  {
    id: "network",
    name: "Growth",
    initFee: "₾3,500",
    mrr: "₾499/mo maintenance",
    bullets: [
      "Multi-page site built for conversions",
      "Advanced SEO to dominate local searches",
      "AI sales assistant — answers, sells, books calls",
      "Reputation system: reviews on autopilot",
      "Monthly performance reports",
    ],
    stripePriceEnvKey: "NEXT_PUBLIC_STRIPE_NETWORK_PRICE_ID",
  },
  {
    id: "empire",
    name: "Scale",
    initFee: "₾7,500+",
    mrr: "₾999/mo maintenance",
    bullets: [
      "Everything in Growth, plus:",
      "Custom booking or e-commerce system",
      "WhatsApp & Instagram DM automation",
      "Dedicated technical support & strategy",
      "Built to grow with your business",
    ],
    stripePriceEnvKey: "NEXT_PUBLIC_STRIPE_EMPIRE_PRICE_ID",
  },
] as const;
