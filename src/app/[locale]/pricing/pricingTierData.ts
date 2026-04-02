import { FOUNDATIONS, type Foundation } from "@/constants/pricing";

/** URL/query slug for /architect?tier= */
export type ArchitectTierSlug =
  | "essential"
  | "professional"
  | "command-center"
  | "ecommerce-hq";

const FOUNDATION_ID_ORDER = ["landing", "cms", "saas", "ecomm"] as const;

const FOUNDATION_TO_SLUG: Record<(typeof FOUNDATION_ID_ORDER)[number], ArchitectTierSlug> = {
  landing: "essential",
  cms: "professional",
  saas: "command-center",
  ecomm: "ecommerce-hq",
};

/** Feature groups shown on pricing cards (aligned with FOUNDATIONS economics). */
const TIER_FEATURES: Record<
  (typeof FOUNDATION_ID_ORDER)[number],
  Array<{ category: string; items: string[] }>
> = {
  landing: [
    {
      category: "Design",
      items: [
        "Template-based design (choose from 3 curated layouts)",
        "Mobile-responsive layout",
      ],
    },
    {
      category: "Functionality",
      items: [
        "Contact form (name, email, message → email delivery)",
        "Basic SEO meta tags setup",
        "SSL security certificate",
      ],
    },
    {
      category: "Ownership & support",
      items: [
        "Source code ownership (GitHub transfer)",
        "Hosting deployment assistance",
        "30-day bug-fix warranty + 1 revision round",
      ],
    },
  ],
  cms: [
    {
      category: "Design",
      items: [
        "100% custom design from scratch",
        "Conversion-optimized layout architecture",
        "Mobile-first responsive design",
      ],
    },
    {
      category: "Functionality",
      items: [
        "Advanced contact form (file uploads, dropdowns)",
        "Social proof section (testimonials + video embeds)",
        "Google Analytics 4 setup + event tracking",
        "Full SEO suite (schema markup, OG tags, sitemap)",
        "Performance optimization (under 2.5s load target)",
      ],
    },
    {
      category: "Support",
      items: ["1-hour video training session (recorded)", "90-day warranty + 2 revision rounds"],
    },
  ],
  saas: [
    {
      category: "Design & site",
      items: [
        "4-page custom-designed site (Home, About, Services, Blog)",
        "Blog-ready architecture (MDX or integrated blog path)",
        "Lead capture + email notification system",
      ],
    },
    {
      category: "Operations",
      items: [
        "Visual content workflow (media pipeline guidance)",
        "SEO foundation + content strategy guide",
        "VIP strategy onboarding session (recorded)",
        "Documentation vault (README + walkthroughs)",
      ],
    },
    {
      category: "Support",
      items: [
        "90-day warranty + priority support",
        "3 revision rounds total (project scope)",
        "Quarterly performance review (first 90 days)",
      ],
    },
  ],
  ecomm: [
    {
      category: "Storefront",
      items: [
        "Custom Next.js storefront with Georgian checkout focus",
        "TBC Bank + BOG iPay integration",
        "Product catalog setup and inventory workflows",
        "Checkout flow optimization",
      ],
    },
    {
      category: "Compliance & ops",
      items: [
        "RS.ge electronic receipts (tax reporting path)",
        "Order management training",
        "Store policy pages (shipping, returns, privacy)",
      ],
    },
    {
      category: "Support",
      items: ["Staff training on admin workflows", "90-day warranty + 4 revision rounds", "Performance tuning pass"],
    },
  ],
};

/** Tailwind order classes: mobile Professional-first, desktop Essential-first. */
const ORDER_CLASSES: Record<(typeof FOUNDATION_ID_ORDER)[number], string> = {
  landing: "order-2 lg:order-1",
  cms: "order-1 lg:order-2",
  saas: "order-3 lg:order-3",
  ecomm: "order-4 lg:order-4",
};

export type PricingTierPayload = {
  foundationId: string;
  architectTierSlug: ArchitectTierSlug;
  emoji: string;
  name: string;
  tagline: string;
  priceFormatted: string;
  priceGEL: number;
  delivery: string;
  audience: string;
  recommended: boolean;
  installmentLabel?: string;
  exclusionNote?: string;
  features: Array<{ category: string; items: string[] }>;
  orderClass: string;
  /** Lines for WhatsApp (plain strings) */
  whatsappFeatureLines: string[];
  primaryCtaLabel: string;
};

function formatPriceGel(n: number): string {
  return `${n.toLocaleString("en-US")} ₾`;
}

function flattenFeaturesForWa(groups: Array<{ category: string; items: string[] }>): string[] {
  return groups.flatMap((g) => g.items);
}

export function getPricingTierPayloads(): PricingTierPayload[] {
  return FOUNDATION_ID_ORDER.map((fid) => {
    const f = FOUNDATIONS.find((x) => x.id === fid) as Foundation;
    const features = TIER_FEATURES[fid];
    const slug = FOUNDATION_TO_SLUG[fid];

    return {
      foundationId: f.id,
      architectTierSlug: slug,
      emoji: f.emoji ?? "",
      name: f.name,
      tagline: f.tagline ?? "",
      priceFormatted: formatPriceGel(f.priceGEL),
      priceGEL: f.priceGEL,
      delivery: f.deliveryTimeline ?? "",
      audience: f.audienceLabel ?? "",
      recommended: Boolean(f.isRecommendedTier),
      installmentLabel: f.installmentLabel,
      exclusionNote:
        fid === "landing"
          ? "*Template-based design • Limited customization • Fast launch*"
          : undefined,
      features,
      orderClass: ORDER_CLASSES[fid],
      whatsappFeatureLines: flattenFeaturesForWa(features),
      primaryCtaLabel: "Build this package",
    };
  });
}
