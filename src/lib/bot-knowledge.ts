// Genezisi AI Support Bot — Knowledge Base
// SOURCE OF TRUTH: foundations.ts, shields.ts, digital-card-product.ts, modules.ts
// Rule: If it changes in those files, update this file to match.

export const knowledgeBaseVersion = "2026-04-21-v3";

export const knowledgeBase = {
  version: knowledgeBaseVersion,
  businessName: "Genezisi",
  botName: "Sophiko AI",
  tagline:
    "Escape the social media trap. We build a permanent, high-speed digital home for your brand that sells 24/7.",
  location: "Tbilisi, Georgia",
  websiteTiers: [
    {
      name: "Professional",
      price: "999 ₾",
      deliveryTimeline: "7-10 business days",
      revisionRounds: 2,
      warrantyDays: 45,
      description:
        "A strategically crafted landing page optimized to turn visitors into leads. Built from scratch — no templates, no limitations.",
      features: [
        "100% custom design from scratch (no templates)",
        "4 pre-built sections included (choose any 4 from: Services, About, Testimonials, Gallery, Video, Booking)",
        "Additional sections available as add-ons — ₾50 each",
        "Mobile-first responsive approach",
        "Conversion-optimized layout architecture",
        "Subtle scroll animations and hover effects",
        "Advanced contact form (file uploads, dropdowns)",
        "Social proof section (testimonials, logos, video)",
        "Google Analytics 4 + event tracking (included)",
        "Full SEO suite (schema, OG tags, sitemap)",
        "Performance optimization (<2.5s load target)",
        "CRM-ready integration prep",
        "Source code ownership + technical docs",
        "45-day comprehensive warranty",
        "2 revision rounds",
      ],
      notIncluded: [
        "CMS/Dashboard — not available. Content changes require a request to us.",
        "Multi-language — available as add-on (₾500 technical setup)",
        "Blog — not available. Available on Command Center and above.",
        "Additional pages — not available. This is a single landing page.",
      ],
      bestFor: [
        "B2B Consultants & Coaches",
        "Creative & Marketing Agencies",
        "High-Ticket Service Providers",
        "Professional Personal Brands",
      ],
    },
    {
      name: "Command Center",
      price: "1,999 ₾",
      deliveryTimeline: "10-15 business days",
      revisionRounds: 3,
      warrantyDays: 75,
      description:
        "Multi-page website: Home + About + Contact + 1 page of your choice (Blog, Services, Portfolio, etc.).",
      features: [
        "4 pages: Home + About + Contact + 1 of your choice",
        "CMS Dashboard — you publish updates, change prices, add photos without a developer",
        "Multi-Language (EN/GE) — Georgian and English included in base",
        "Basic Analytics — Google Analytics 4 included",
        "Priority Support — faster response times than Professional",
        "75-Day Warranty — full coverage on any bugs or breakages",
        "3 revision rounds",
        "Full Code Ownership — no lock-in",
      ],
      recommendedShield: "Micro Shield (₾500/yr)",
      bestFor: [
        "Service teams replacing manual DM operations",
        "Operators needing clear workflow orchestration",
        "Brands preparing to scale with structured systems",
      ],
    },
    {
      name: "E-Commerce HQ",
      price: "starting 3,999 ₾",
      deliveryTimeline: "20-30 business days",
      revisionRounds: 4,
      warrantyDays: 100,
      description:
        "Full online store with CMS dashboard, Business Cockpit, and everything you need to launch.",
      features: [
        "5 pages: Home + Shop + Products + About + Contact",
        "Full CMS Dashboard — you add products, update prices, manage stock",
        "Business Cockpit — private dashboard for revenue, orders, invoice printing",
        "GA4 + Advanced Conversion Tracking (included)",
        "English only — multi-language add-on available (₾500)",
        "Source Code Ownership — no lock-in",
        "100-Day Warranty",
        "4 revision rounds",
      ],
      addOnsForECommerce: [
        "Bank Integration (you have merchant keys) — ₾500",
        "Bank Integration + Lawyer (we handle everything) — ₾1,500",
        "RS.ge Fiscal Sync — ₾1,200",
      ],
      bestFor: [
        "Boutique Owners wanting a premium home",
        "Wine & Jewelry Makers (Global/Local)",
        "Artisans looking to automate back-office flow",
      ],
    },
  ],

  digitalBusinessCard: {
    tiers: [
      {
        name: "Subdomain",
        setupFee: "150 ₾",
        hostingAnnual: "50 ₾/yr",
        url: "yourname.genezisi.com",
      },
      {
        name: "Professional",
        setupFee: "250 ₾",
        hostingAnnual: "50 ₾/yr",
        url: "Your own custom domain",
      },
      {
        name: "Executive (VIP)",
        setupFee: "350 ₾",
        hostingAnnual: "120 ₾/yr",
        url: "Genezisi manages your domain",
      },
    ],
    features: [
      "Live customizer (WYSIWYG — what you see is what you get)",
      "Order via WhatsApp",
      "Custom URL: genezisi.com/c/[your-name]",
      "Accent color customization",
      "Photo + title + company + links",
      "Georgian and English language support",
      "No coding required",
    ],
    orderProcess:
      "1. Choose your card tier → 2. Customize in real-time → 3. Pay via bank transfer → 4. Live in 24 hours",
  },

  shieldPlans: [
    {
      name: "Reputation Scout",
      price: "120 ₾/year",
      level: "Basic",
      description: "The bare minimum to exist safely on the web.",
      perks: [
        "SSL monitoring — site always shows secure padlock",
        "Blacklist monitoring — daily checks against email spam lists",
        "Backup with every change — we back up whenever we make changes",
        "Domain included — we buy your .ge domain, always yours",
      ],
    },
    {
      name: "Micro Shield",
      price: "500 ₾/year",
      level: "Proactive",
      description:
        "Protects 100/100 speeds from natural performance decay.",
      recommendedFor: "Command Center clients",
      perks: [
        "Global content delivery — instant loading for visitors anywhere in Georgia",
        "60-second uptime checks — we know within a minute if your site goes down",
        "Daily backups (30-day rollback) — restore any version from the last 30 days",
        "Database speed optimisation — keeps your site fast over time",
        "Security patching — critical software lock downs against bots",
      ],
    },
    {
      name: "Active Shield",
      price: "1,500 ₾/year",
      level: "Guardian",
      description:
        "A developer on-call to optimise your layout as your audience grows.",
      perks: [
        "Malware Shield Pro — real-time brute force armour hardening for login surfaces",
        "Enterprise Speed Turbo — advanced server-side tuning to maintain 90+ PageSpeed scores",
        "Priority Support — VIP placement in the development and modification queue",
        "Conversion Audits — bi-weekly traffic insights to suggest sales improvements",
      ],
    },
    {
      name: "Enterprise Shield",
      price: "3,000 ₾/year",
      level: "Immune",
      description:
        "Defenders of revenue against bank outages, algorithm shifts, and tax penalties.",
      perks: [
        "4-Hour SLA — critical failure response guarantee within 4 hours",
        "AI-Sentinel Triage — automated error-resolution for soft timeouts and API lags",
        "Algorithm Immunity — shielding for Instagram/Bank APIs against platform shifts",
        "1% Threshold Tracker — automated alerts to protect your Micro-Business tax status",
      ],
    },
  ],

  addOns: [
    {
      name: "Multilingual Setup (Technical)",
      price: "500 ₾",
      description:
        "Code architecture for multi-language SEO. In-house Georgian translation available at ₾100/hour.",
    },
    {
      name: "Bank Integration (you have merchant keys)",
      price: "500 ₾",
      description:
        "Connecting your existing bank-approved Merchant ID to your site with custom HMAC security.",
    },
    {
      name: "Bank Integration + Lawyer (we handle everything)",
      price: "1,500 ₾",
      description:
        "Full merchant onboarding + integration. We handle the bank visits, KYC clearance, and technical bridge.",
    },
    {
      name: "RS.ge Fiscal Sync",
      price: "1,200 ₾",
      description:
        "Real-time API bridge between your checkout and RS.ge. Every sale generates an automated e-tax invoice.",
    },
    {
      name: "Additional Static Page",
      price: "450 ₾",
      description:
        "A single high-performance static page (e.g., Our Story, Return Policy).",
    },
    {
      name: "Professional Copywriting",
      price: "300 ₾",
      description:
        "High-performance sales messaging using AIDA framework (Attention, Interest, Desire, Action).",
    },
  ],

  process: [
    {
      step: 1,
      name: "Discovery Call",
      description:
        "30-minute call to understand your goals, audience, and vision.",
    },
    {
      step: 2,
      name: "Blueprint Design",
      description:
        "We create the wireframe and design direction. You review and approve.",
    },
    {
      step: 3,
      name: "Development",
      description: "We build your website. You watch the progress.",
    },
    {
      step: 4,
      name: "Testing & Handover",
      description:
        "Final review, training on the CMS, and launch.",
    },
  ],

  payment: {
    methods: [
      "Bank transfer (TBC)",
      "Bank of Georgia transfer",
      "Cryptocurrency (USDT) — contact first",
    ],
    currency: "GEL (Georgian Lari)",
    note: "All prices are in GEL unless specified otherwise.",
  },

  contact: {
    whatsapp:
      "https://wa.me/995579723564?text=Hi%20Genezisi!%20I%27m%20interested%20in%20discussing%20a%20project.%20Can%20we%20talk%3F",
    whatsappEscalation:
      "https://wa.me/995579723564?text=Hi%20Genezisi!%20I%20have%20a%20question%20the%20bot%20couldn%27t%20answer.",
    email: "architect@genezisi.com",
    website: "https://genezisi.com",
  },

  faq: [
    {
      q: "How long does a website take?",
      a: "Professional: 7-10 business days. Command Center: 10-15 business days. E-Commerce HQ: 20-30 business days.",
    },
    {
      q: "Do you do Georgian language websites?",
      a: "Yes. Command Center includes Georgian and English by default. Professional and E-Commerce are English only, with multilingual available as a ₾500 add-on. In-house Georgian translation at ₾100/hour.",
    },
    {
      q: "Can I accept TBC or Bank of Georgia payments?",
      a: "Yes, as a paid add-on. If you already have merchant keys, it's ₾500. If you need us to handle everything including bank visits and compliance, it's ₾1,500.",
    },
    {
      q: "Do you use templates?",
      a: "Never. Every Genezisi website is 100% custom, designed specifically for your brand from scratch.",
    },
    {
      q: "What if something breaks after launch?",
      a: "All sites come with a warranty: 45 days (Professional), 75 days (Command Center), 100 days (E-Commerce HQ). For ongoing peace of mind, our Shield plans cover maintenance from ₾120/yr.",
    },
    {
      q: "Can I see your previous work?",
      a: "Yes — during our discovery call we share relevant case studies from our portfolio.",
    },
    {
      q: "What's the difference between a website and a digital business card?",
      a: "A digital business card (₾150-350 setup + ₾50-120/yr hosting) is a single-page profile for sharing contact info and social links. A website is a full digital home with multiple pages, CMS, analytics, and more.",
    },
    {
      q: "Can I upgrade from Professional to Command Center?",
      a: "Yes. We can expand your Professional site into a Command Center. The cost is the price difference plus any additional work required.",
    },
    {
      q: "What is the Micro Shield recommended for?",
      a: "Micro Shield (₾500/yr) is recommended for Command Center clients. It includes global content delivery, 60-second uptime checks, daily backups with 30-day rollback, and security patching.",
    },
    {
      q: "Do I own my website code?",
      a: "Yes. You receive full code ownership on all tiers — no vendor lock-in.",
    },
    {
      q: "What payment methods do you accept?",
      a: "Bank transfer (TBC or Bank of Georgia), and cryptocurrency (USDT) by prior arrangement.",
    },
    {
      q: "What's RS.ge Fiscal Sync?",
      a: "It's a ₾1,200 add-on that creates a real-time API bridge between your checkout and the Georgian Revenue Service. Every sale generates an automated electronic tax invoice.",
    },
    {
      q: "Is E-Commerce HQ payment integration included?",
      a: "No. Bank integration is a separate add-on: ₾500 if you already have merchant keys, or ₾1,500 if you need us to handle the full bank onboarding with legal compliance. RS.ge fiscal sync is an additional ₾1,200.",
    },
  ],
};

export function buildSystemPrompt(): string {
  return `You are Sophiko AI, a helpful AI assistant for Genezisi — a digital agency based in Tbilisi, Georgia.

Your job is to answer visitor questions about Genezisi services using ONLY the information provided in your knowledge base below. If you don't know something, say so clearly and offer to connect them with the team via WhatsApp.

IMPORTANT RULES:
- Only use facts from the knowledge base. Do NOT make up prices, features, or timelines.
- If a question is outside your knowledge base, respond: "I'm not sure about that. Would you like to chat with our team directly on WhatsApp?"
- Be friendly, professional, and BRIEF. 2-4 short sentences max per reply.
- Always be honest about limitations.
- For pricing questions, quote the exact price. One price, one sentence.
- For complex questions (custom builds, enterprise needs), recommend a discovery call.
- Respond in the same language the visitor uses (Georgian or English).
- If asked about competitors or other agencies, politely redirect to Genezisi's strengths.
- Never discuss internal operations, costs, or business strategy.
- When asked for contact info, provide BOTH:
  WhatsApp link (must be raw URL, no markdown): https://wa.me/995579723564
  Phone number (for copy-paste): +995 579 723 564
  Email: architect@genezisi.com

FORMATTING RULES (CRITICAL):
- NO markdown links (like [text](url)). Use raw URLs only.
- NO markdown tables. EVER. Use plain text only.
- NO asterisks for bold/italic. Use plain text only.
- Use simple line breaks between items. Example:
  Professional — 999 ₾ (7-10 days)
  Command Center — 1,999 ₾ (10-15 days)
  E-Commerce HQ — from 3,999 ₾ (20-30 days)
- Keep responses SHORT. Chat format, not essay format.
- NEVER say payment integration is included in any tier. It is ALWAYS a paid add-on.

KNOWLEDGE BASE:
${JSON.stringify(knowledgeBase, null, 2)}`;
}
