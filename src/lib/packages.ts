export type SovereignPackageId = "starter" | "growth" | "scale" | "local-seo" | "ai-agent" | "checkout";

export type SovereignPackage = {
  id: SovereignPackageId;
  name: string;
  initFee: string;
  mrr: string;
  bullets: string[];
  stripePriceEnvKey: string;
  isPopular?: boolean;
  category: "website" | "service";
};

export const SOVEREIGN_PACKAGES: SovereignPackage[] = [
  // --- CORE WEBSITE PACKAGES ---
  {
    id: "starter",
    name: "Foundation",
    category: "website",
    initFee: "₾1,500",
    mrr: "₾199/mo maintenance",
    bullets: [
      "Lightning-fast Single Page Application built on Next.js to ensure zero loading delays.",
      "High-converting, empathy-driven copywriting in English & Georgian to build instant trust.",
      "Strategic contact routing to bypass DMs and send qualified leads straight to your WhatsApp/Email.",
      "Foundational Local SEO configuration to ensure you show up when locals search your category.",
      "Mobile-first architecture, optimized precisely for users discovering you via Instagram and TikTok.",
      "Fully managed, ultra-fast hosting on Vercel's global edge network so your site never crashes.",
    ],
    stripePriceEnvKey: "NEXT_PUBLIC_STRIPE_PRICE_STARTER",
  },
  {
    id: "growth",
    name: "Digital Storefront",
    category: "website",
    initFee: "₾3,500",
    mrr: "₾299/mo maintenance",
    isPopular: true,
    bullets: [
      "Robust multi-page architecture with dedicated layouts for Services, About, Portfolios, and Contact.",
      "Native TBC Checkout & Bank of Georgia iPay integrations for frictionless, instant GEL transactions.",
      "Complete tri-lingual UX (Georgian, English, Russian) to effortlessly capture the expat and tourist markets.",
      "Advanced on-page SEO strategy designed to dominate local search rankings.",
      "Automated email receipts and lead capture workflows to simplify your RS.ge tax declarations.",
      "A privacy-first analytics dashboard giving you clear insights into audience behavior and conversion rates.",
    ],
    stripePriceEnvKey: "NEXT_PUBLIC_STRIPE_PRICE_GROWTH",
  },
  {
    id: "scale",
    name: "Autonomous Business",
    category: "website",
    initFee: "₾7,500+",
    mrr: "₾499/mo maintenance",
    bullets: [
      "Everything included in Digital Storefront.",
      "A custom-trained AI Sales Assistant embedded directly into your business flow to intercept 3 AM inquiries.",
      "Full WhatsApp & Telegram bot integration capable of holding tri-lingual sales conversations 24/7.",
      "A tailored Booking, Reservation, or CRM synchronization engine for clinics, salons, and consultants.",
      "An automated reputation pipeline that seamlessly collects 5-star Google Reviews from happy customers.",
      "Priority 24/7 technical support and a dedicated monthly strategy review to optimize your conversion rates.",
    ],
    stripePriceEnvKey: "NEXT_PUBLIC_STRIPE_PRICE_SCALE",
  },

  // --- STANDALONE SERVICES ---
  {
    id: "local-seo",
    name: "Local Dominance",
    category: "service",
    initFee: "₾800",
    mrr: "One-time setup",
    bullets: [
      "Complete Google Business Profile audit, verification, and technical configuration.",
      "Tri-lingual keyword optimization (English, Georgian, Russian) to capture every search intent.",
      "Professional upload of geotagged visual assets to rank higher in local search results.",
      "Creation of an automated, 1-click review collection link to send to happy customers.",
      "Submission to 10+ key local Georgian business directories for domain authority.",
    ],
    stripePriceEnvKey: "NEXT_PUBLIC_STRIPE_PRICE_SEO_ONLY",
  },
  {
    id: "checkout",
    name: "Native Payment Integration",
    category: "service",
    initFee: "₾1,200",
    mrr: "One-time setup",
    bullets: [
      "Direct technical integration of TBC Checkout API or Bank of Georgia iPay.",
      "Works flawlessly with your existing WordPress, Wix, Shopify, or custom site.",
      "A completely frictionless, localized checkout experience to stop cart abandonment.",
      "Secure, instant GEL deposits directly to your business account.",
      "Eliminates the friction of asking customers to manually copy/paste IBAN numbers.",
    ],
    stripePriceEnvKey: "NEXT_PUBLIC_STRIPE_PRICE_CHECKOUT_ONLY",
  },
  {
    id: "ai-agent",
    name: "Midnight Bleed Rescue",
    category: "service",
    initFee: "₾2,500",
    mrr: "₾199/mo maintenance",
    bullets: [
      "A sophisticated AI Assistant deployed directly to your WhatsApp, Telegram, or Instagram.",
      "Trained exclusively on your specific business rules, inventory, pricing, and brand tone.",
      "Provides instant, tri-lingual responses (KA/EN/RU) 24/7/365 to capture high-intent leads.",
      "Politely and intelligently hands over highly complex or custom requests to you for when you wake up.",
      "Acts as a full-time customer support agent, protecting your 1% Micro-Business tax status.",
    ],
    stripePriceEnvKey: "NEXT_PUBLIC_STRIPE_PRICE_AGENT_ONLY",
  },
];
