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
  audience: string;
  recommended?: boolean;
  exclusionNote?: string;
  features: Array<{ category: string; items: string[] }>;
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
    price: "5,999 ₾",
    delivery: "3-4 weeks delivery",
    cta: "Configure My Command Center",
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
    emoji: "🛒",
    name: "E-commerce HQ",
    tagline: "A 24/7 storefront engineered for conversion velocity.",
    price: "10,999 ₾",
    delivery: "4-6 weeks delivery",
    cta: "Build My E-Commerce Empire",
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
                    href={`/${lang}/architect`}
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
      </main>
    </>
  );
}
