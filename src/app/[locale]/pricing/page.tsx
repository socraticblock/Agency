import type { Locale } from "@/lib/i18n";
import { Navbar } from "../_components/Navbar";

type TierCard = {
  id: string;
  emoji: string;
  name: string;
  tagline: string;
  price: string;
  delivery: string;
  cta: string;
  ctaHref: string;
  audience: string;
  recommended?: boolean;
  exclusionNote?: string;
  features: Array<{ category: string; items: string[] }>;
};

type ModuleCategory = {
  id: string;
  icon: string;
  name: string;
  moduleCount: number;
  fromPriceGEL: number;
};

type PricingFaq = {
  question: string;
  answer: string;
};

const PRICING_TIERS: TierCard[] = [
  {
    id: "essential",
    emoji: "✨",
    name: "Essential",
    tagline: "Your first professional web presence.",
    price: "999 ₾",
    delivery: "7-10 days delivery",
    cta: "Start My Essential Site",
    ctaHref: "/book-strategy",
    audience: "Perfect for: Solo consultants testing the waters",
    exclusionNote:
      "*Template-based design • Limited customization • Perfect for launching fast*",
    features: [
      {
        category: "Design",
        items: ["Premium template setup", "Brand color sync", "Mobile responsive"],
      },
      {
        category: "Functionality",
        items: ["Lead capture form", "WhatsApp CTA integration", "Basic analytics"],
      },
      {
        category: "Support",
        items: ["Launch QA checklist", "90-day bug warranty"],
      },
    ],
  },
  {
    id: "professional",
    emoji: "⭐",
    name: "Professional",
    tagline: "A premium conversion foundation for serious growth.",
    price: "2,299 ₾",
    delivery: "12-16 days delivery",
    cta: "Build My Professional Site",
    ctaHref: "/architect?tier=professional",
    audience: "Perfect for: Service brands scaling client acquisition",
    recommended: true,
    features: [
      {
        category: "Design",
        items: [
          "Custom visual direction",
          "Conversion-focused page architecture",
          "Premium motion interactions",
        ],
      },
      {
        category: "Functionality",
        items: [
          "Advanced lead routing",
          "CRM-ready forms",
          "Social proof module system",
          "On-page trust stack",
        ],
      },
      {
        category: "Performance",
        items: [
          "Speed optimization pass",
          "Structured SEO baseline",
          "Technical QA matrix",
        ],
      },
      {
        category: "Support",
        items: ["Priority launch support", "90-day bug warranty"],
      },
    ],
  },
  {
    id: "command-center",
    emoji: "🧠",
    name: "Command Center",
    tagline: "Your operations and sales infrastructure hub.",
    price: "4,999 ₾",
    delivery: "3-4 weeks delivery",
    cta: "Configure My Command Center",
    ctaHref: "/architect?tier=command-center",
    audience: "Perfect for: Teams replacing manual DM workflows",
    features: [
      {
        category: "Design",
        items: [
          "Full custom UI system",
          "Dashboard-first architecture",
          "Multi-state interaction design",
        ],
      },
      {
        category: "Functionality",
        items: [
          "Workflow automation hooks",
          "Calendar + booking logic",
          "Advanced segmentation funnels",
          "Internal ops visibility panels",
        ],
      },
      {
        category: "Performance",
        items: [
          "Scalable build architecture",
          "Enhanced technical QA protocol",
          "Launch hardening checklist",
        ],
      },
      {
        category: "Support",
        items: ["Post-launch optimization window", "90-day bug warranty"],
      },
    ],
  },
  {
    id: "ecommerce",
    emoji: "💰",
    name: "E-Commerce HQ",
    tagline: "A 24/7 storefront engineered for conversion velocity.",
    price: "7,999 ₾",
    delivery: "4-6 weeks delivery",
    cta: "Build My E-Commerce Empire",
    ctaHref: "/architect?tier=ecommerce-hq",
    audience: "Perfect for: Product brands scaling online revenue",
    features: [
      {
        category: "Design",
        items: [
          "Premium product UI system",
          "Collection and PDP architecture",
          "Conversion-first checkout journey",
        ],
      },
      {
        category: "Functionality",
        items: [
          "Catalog + inventory logic",
          "Payment workflow integration",
          "Upsell and bundle framework",
          "Abandonment recovery hooks",
        ],
      },
      {
        category: "Performance",
        items: [
          "Commerce performance tuning",
          "Technical SEO e-commerce baseline",
          "Load resilience QA testing",
        ],
      },
      {
        category: "Support",
        items: ["Launch supervision sprint", "90-day bug warranty"],
      },
    ],
  },
];

const MODULE_CATEGORIES: ModuleCategory[] = [
  {
    id: "georgian-advantage",
    icon: "🇬🇪",
    name: "Georgian Advantage",
    moduleCount: 6,
    fromPriceGEL: 600,
  },
  {
    id: "marketing-seo",
    icon: "📈",
    name: "Marketing & SEO",
    moduleCount: 7,
    fromPriceGEL: 400,
  },
  {
    id: "business-engines",
    icon: "⚙️",
    name: "Business Engines",
    moduleCount: 8,
    fromPriceGEL: 700,
  },
  {
    id: "ai-automation",
    icon: "🤖",
    name: "AI & Automation",
    moduleCount: 5,
    fromPriceGEL: 800,
  },
  {
    id: "creative-extras",
    icon: "🎨",
    name: "Creative Extras",
    moduleCount: 6,
    fromPriceGEL: 300,
  },
  {
    id: "operations",
    icon: "🛡️",
    name: "Operations",
    moduleCount: 5,
    fromPriceGEL: 500,
  },
];

const PRICING_FAQ: PricingFaq[] = [
  {
    question: "Why should not I just use Wix/Squarespace?",
    answer:
      "Those platforms are fine for basic pages, but they lock your business into monthly platform costs and limited technical control. Your Genezisi build is engineered for Georgian market workflows, local integrations, and long-term ownership.",
  },
  {
    question: "What is the difference between Essential and Professional?",
    answer:
      "Essential is a premium template-based launch path for speed. Professional is a custom conversion architecture with deeper UX strategy, richer trust systems, and stronger scaling readiness.",
  },
  {
    question: "Do I really own the code after launch?",
    answer:
      "Yes. You own your digital asset. We deliver full project handoff with access transfer so you are never trapped in vendor lock-in.",
  },
  {
    question: "What happens after you finish building?",
    answer:
      "We run launch QA, handoff guidance, and a defined bug-warranty window. If you want ongoing improvements, you can continue with Shield support options.",
  },
  {
    question: "Can I upgrade later if I start with Essential?",
    answer:
      "Yes. Most clients can upgrade as they grow. Upgrade credits and migration scope depend on your selected modules and current build state.",
  },
  {
    question: "How do payments work? Do you offer installments?",
    answer:
      "We structure payment options around project scope, including split-payment paths for qualified builds. Exact installment availability is confirmed during strategy scoping.",
  },
  {
    question: "What if I need changes after the project ends?",
    answer:
      "You can request additional revisions after delivery through scoped updates. For continuous improvements and support response SLAs, Shield plans are available.",
  },
  {
    question: "How long until my site is live?",
    answer:
      "Typical delivery starts at 7-10 days for Essential and increases by system complexity for higher tiers. Final timelines depend on content readiness, revision rounds, and integration depth.",
  },
];

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = (locale === "en" ? "en" : "ka") as Locale;

  return (
    <>
      <Navbar locale={lang} />
      <main className="min-h-screen bg-[#060c22]">
        <section className="relative mx-auto flex min-h-[65vh] max-w-7xl flex-col justify-center overflow-hidden px-6 py-16 sm:px-10 lg:px-16">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.16)_0%,rgba(6,12,34,0.95)_58%)]" />
          <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:28px_28px]" />

          <div className="relative z-10 max-w-3xl">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.28em] text-emerald-400">
              Pricing
            </p>
            <h1 className="text-balance text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Invest in Your Digital Real Estate
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
              Not an expense, an owned digital asset designed to convert demand into predictable revenue.
              Choose the foundation that matches your stage.
            </p>
            <p className="mt-2 max-w-2xl text-sm text-slate-400">
              Built for Georgian LLC owners who need speed, credibility, and operational clarity.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href={`/${lang}/architect`}
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-emerald-500 px-7 py-3 text-sm font-black uppercase tracking-wider text-slate-950 transition hover:bg-emerald-400"
              >
                Compare Foundations
              </a>
              <a
                href={`/${lang}/architect`}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 bg-white/5 px-7 py-3 text-sm font-bold uppercase tracking-wider text-slate-200 transition hover:bg-white/10"
              >
                Need Custom Architecture?
              </a>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-6 pb-24 sm:px-10 lg:px-16">
          <div className="mb-8 flex flex-col gap-3">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-emerald-400">
              Foundations
            </p>
            <h2 className="text-2xl font-black text-white sm:text-3xl">
              Choose your investment level
            </h2>
            <p className="max-w-3xl text-sm text-slate-400 sm:text-base">
              Four clear paths. Start lean, or deploy the full engine now.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {PRICING_TIERS.map((tier) => (
              <article
                key={tier.id}
                className={`relative flex h-full min-h-[720px] flex-col rounded-2xl border bg-[#0a1125]/85 p-6 shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl ${
                  tier.recommended
                    ? "border-emerald-400/60 ring-1 ring-emerald-400/40"
                    : "border-white/10"
                }`}
              >
                <div className="min-h-7">
                  {tier.recommended ? (
                    <span className="absolute -top-3 left-6 inline-flex rounded-full border border-emerald-300/60 bg-emerald-400/15 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-emerald-300">
                      ⭐ Recommended
                    </span>
                  ) : null}
                </div>

                <div className="mt-1">
                  <h3 className="text-xl font-black uppercase tracking-tight text-white">
                    {tier.emoji} {tier.name}
                  </h3>
                  <p className="mt-1 text-sm italic text-slate-400">{tier.tagline}</p>
                </div>

                <div className="mt-6">
                  <p className="text-4xl font-black tracking-tight text-emerald-300">{tier.price}</p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-400">
                    ⏱️ {tier.delivery}
                  </p>
                </div>

                <div className="mt-6 flex flex-1 flex-col gap-4">
                  {tier.features.map((group) => (
                    <div key={`${tier.id}-${group.category}`}>
                      <p className="mb-1 text-[11px] font-black uppercase tracking-wider text-slate-200">
                        {group.category}
                      </p>
                      <ul className="space-y-1">
                        {group.items.map((item) => (
                          <li key={item} className="flex items-start gap-1.5 text-[12px] leading-snug text-slate-300">
                            <span className="mt-[2px] text-emerald-400">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}

                  {tier.exclusionNote ? (
                    <p className="text-[11px] italic leading-snug text-slate-500">{tier.exclusionNote}</p>
                  ) : null}
                </div>

                <div className="mt-6">
                  <a
                    href={`/${lang}${tier.ctaHref}`}
                    className={`inline-flex w-full items-center justify-center rounded-xl px-4 py-3 text-center text-xs font-black uppercase tracking-wider transition ${
                      tier.recommended
                        ? "bg-emerald-400 text-slate-950 hover:bg-emerald-300"
                        : "border border-white/20 bg-transparent text-slate-100 hover:border-emerald-400/50 hover:text-emerald-300"
                    }`}
                  >
                    {tier.cta}
                  </a>
                  <p className="mt-2 text-[11px] text-slate-500">{tier.audience}</p>
                </div>
              </article>
            ))}
          </div>

          {/* Section 3: Custom-project bridge for non-standard buyers */}
          <div className="mt-14 rounded-2xl border border-white/10 bg-[#0b1327]/80 p-6 text-center shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-8">
            <h3 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
              Need a custom architecture?
            </h3>
            <p className="mx-auto mt-3 max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-base">
              Building something unique? We handle custom software architecture, legacy system modernization,
              and enterprise-grade solutions. We will scope your exact requirements in one focused conversation.
            </p>

            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={`/${lang}/book-strategy`}
                className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-emerald-400 px-6 py-3 text-sm font-black uppercase tracking-wider text-slate-950 transition hover:bg-emerald-300 sm:w-auto"
              >
                Discuss Custom Project
              </a>
              <a
                href={`/${lang}/architect`}
                className="inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-bold uppercase tracking-wider text-slate-100 transition hover:border-emerald-400/40 hover:text-emerald-300 sm:w-auto"
              >
                Explore Package Builder
              </a>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200/80 bg-slate-50 px-6 py-20 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 text-center">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-emerald-700">
                Module Preview
              </p>
              <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                Supercharge Your Build With Add-On Modules
              </h2>
              <p className="mx-auto mt-3 max-w-3xl text-sm text-slate-600 sm:text-base">
                Starting from the Professional tier, enhance your site with powerful integrations and
                automations.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {MODULE_CATEGORIES.map((category) => (
                <a
                  key={category.id}
                  href={`/${lang}/architect`}
                  className="group rounded-2xl border border-slate-300 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-400/60 hover:shadow-[0_12px_30px_rgba(16,185,129,0.12)]"
                >
                  <p className="text-2xl" aria-hidden>
                    {category.icon}
                  </p>
                  <h3 className="mt-3 text-lg font-black text-slate-900">{category.name}</h3>
                  <p className="mt-1 text-sm text-slate-600">({category.moduleCount} modules)</p>
                  <p className="mt-1 text-sm font-bold text-emerald-700">
                    From {category.fromPriceGEL} ₾
                  </p>
                  <p className="mt-3 text-xs font-bold uppercase tracking-wider text-slate-500 group-hover:text-emerald-700">
                    Explore modules in architect
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-5xl px-6 py-20 sm:px-10">
          <div className="mb-8 text-center">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-emerald-400">FAQ</p>
            <h2 className="mt-3 text-2xl font-black tracking-tight text-white sm:text-3xl">
              Frequently Asked Questions
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-400 sm:text-base">
              Clear answers before you commit time or budget.
            </p>
          </div>

          <div className="space-y-3">
            {PRICING_FAQ.map((item) => (
              <details
                key={item.question}
                className="group rounded-xl border border-white/10 bg-[#0b1327]/80 p-5 transition hover:border-emerald-400/40"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-sm font-black text-white sm:text-base">
                  <span>{item.question}</span>
                  <span className="text-emerald-300 transition group-open:rotate-45" aria-hidden>
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="border-t border-white/10 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.18),rgba(5,10,26,0.96)_58%)] px-6 py-24 text-center sm:px-10">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
              Ready to Build Your Digital Headquarters?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-200">
              Join Georgian businesses upgrading their online presence. Start with a conversation, no
              commitment required.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={`/${lang}/book-strategy`}
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-emerald-400 px-7 py-3 text-sm font-black uppercase tracking-wider text-slate-950 transition hover:bg-emerald-300 sm:w-auto"
              >
                Book Free Strategy Call
              </a>
              <a
                href={`/${lang}/book-strategy`}
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-white/25 bg-white/5 px-7 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:border-emerald-300/60 hover:text-emerald-200 sm:w-auto"
              >
                Or Send Us a Message
              </a>
            </div>

            <p className="mt-4 text-xs font-medium uppercase tracking-wider text-slate-300/90">
              Typically responds within 24 hours
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
