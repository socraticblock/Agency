import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { WHATSAPP_INTAKE, WHATSAPP_DEFAULT_MESSAGE } from "@/constants/content";
import { Navbar } from "../_components/Navbar";
import { getPricingTierPayloads } from "./pricingTierData";
import { PricingTierDeck } from "./PricingTierDeck";
import { PricingComparisonSection } from "./PricingComparisonSection";
import { PricingModuleShowcase } from "./PricingModuleShowcase";
import { PricingCustomBridge } from "./PricingCustomBridge";

const PRICING_FAQ = [
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
    question: "Should I use the configurator or talk to you directly?",
    answer:
      "Use WhatsApp or a strategy call if you want guidance choosing a tier, have a non-standard scope, or prefer a conversation first. Use the Architect configurator if you already know your tier and want to explore modules and Shield options interactively. Both are valid.",
  },
  {
    question: "Do I really own the code after launch?",
    answer:
      "Yes. You own your digital asset. We deliver full project handoff with access transfer so you are never trapped in vendor lock-in.",
  },
  {
    question: "What happens after you finish building?",
    answer:
      "We run launch QA and a defined bug-warranty window. Essential includes a written launch guide (PDF). Professional and higher include a recorded training touchpoint as scoped in your tier. For ongoing improvements and response SLAs, Shield plans are available.",
  },
  {
    question: "Can I upgrade later if I start with Essential?",
    answer:
      "Yes. Many clients start lean and expand. Upgrade paths depend on what is already shipped; we credit or scope migration work transparently during planning.",
  },
  {
    question: "Can I switch between packages later?",
    answer:
      "Yes. Businesses change—we can plan upgrades (for example, from Essential toward Professional) as a scoped migration rather than a surprise rebuild.",
  },
  {
    question: "How do payments work? Do you offer installments?",
    answer:
      "We structure payment options around project scope. Installment-style splits may be available on Essential and Professional—confirmed during strategy scoping.",
  },
  {
    question: "What if I need changes after the project ends?",
    answer:
      "You can request additional revisions after delivery through scoped updates. For continuous improvements and support response SLAs, Shield plans are available.",
  },
  {
    question: "How long until my site is live?",
    answer:
      "Typical delivery starts at 7–10 business days for Essential and increases with system complexity for higher tiers. Final timelines depend on content readiness, revision rounds, and integration depth.",
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  await params;
  return {
    title: "Pricing — Professional Websites for Georgian Businesses | Genezisi",
    description:
      "Four transparent packages. No hidden fees. Full ownership included. Compare foundations, optional Shield plans, and add-on modules.",
  };
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = (locale === "en" ? "en" : "ka") as Locale;
  const tiers = getPricingTierPayloads();
  const waHref = `https://wa.me/${WHATSAPP_INTAKE}?text=${encodeURIComponent(WHATSAPP_DEFAULT_MESSAGE)}`;

  return (
    <>
      <Navbar locale={lang} />
      <main className="min-h-screen bg-[#060c22]">
        <section className="relative mx-auto flex min-h-[55vh] max-w-7xl flex-col justify-center overflow-hidden px-6 py-16 sm:px-10 lg:px-16">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.16)_0%,rgba(6,12,34,0.95)_58%)]" />
          <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:28px_28px]" />

          <div className="relative z-10 max-w-3xl">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.28em] text-emerald-400">
              Pricing
            </p>
            <h1 className="text-balance text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Professional websites built for Georgian businesses
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
              Four transparent packages. No hidden fees. Full ownership included. See what fits your
              stage.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href="#foundations"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-emerald-500 px-7 py-3 text-sm font-black uppercase tracking-wider text-slate-950 transition hover:bg-emerald-400"
              >
                See packages
              </a>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 bg-white/5 px-7 py-3 text-sm font-bold uppercase tracking-wider text-slate-200 transition hover:bg-white/10"
              >
                Message on WhatsApp
              </a>
            </div>
          </div>
        </section>

        <section
          id="foundations"
          className="mx-auto w-full max-w-7xl scroll-mt-28 px-6 pb-8 sm:px-10 lg:px-16"
        >
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

          <PricingTierDeck locale={lang} tiers={tiers} />
        </section>

        <PricingComparisonSection />

        <section className="mx-auto w-full max-w-7xl px-6 pb-24 sm:px-10 lg:px-16">
          <div className="mb-6 text-center md:text-left">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-emerald-400">
              Beyond packages
            </p>
            <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">
              Need something unique?
            </h2>
            <p className="mx-auto mt-2 max-w-3xl text-sm text-slate-400 md:mx-0">
              Custom builds and legacy rescues do not always fit a standard card. Start with a
              focused conversation.
            </p>
          </div>
          <PricingCustomBridge />
        </section>

        <PricingModuleShowcase />

        <section className="mx-auto w-full max-w-5xl px-6 py-20 sm:px-10">
          <div className="mb-8 text-center">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-emerald-400">FAQ</p>
            <h2 className="mt-3 text-2xl font-black tracking-tight text-white sm:text-3xl">
              Frequently asked questions
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
              Let&apos;s build something impressive together
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-200">
              No pressure, no sales tactics—just a conversation about your goals.
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-xs text-slate-500">
              Built with Next.js · Hosted on Vercel Edge
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={`/${lang}/book-strategy`}
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-emerald-400 px-7 py-3 text-sm font-black uppercase tracking-wider text-slate-950 transition hover:bg-emerald-300 sm:w-auto"
              >
                Book free strategy call
              </a>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-white/25 bg-white/5 px-7 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:border-emerald-300/60 hover:text-emerald-200 sm:w-auto"
              >
                WhatsApp us
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
