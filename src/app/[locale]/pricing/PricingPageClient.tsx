"use client";

import { useEffect, useRef } from "react";
import type { Locale } from "@/lib/i18n";
import { trackPricingEvent } from "@/lib/pricingAnalytics";
import { getOrderedPricingFoundations } from "./pricingTierData";
import { PricingCtaBand } from "./PricingCtaBand";
import { PricingProofStrip } from "./PricingProofStrip";
import { PricingTierDeck } from "./PricingTierDeck";
import { PricingComparisonSection } from "./PricingComparisonSection";
import { TierPickerQuiz } from "./TierPickerQuiz";
import { PricingFaq } from "./PricingFaq";

interface PricingPageClientProps {
  locale: Locale;
}

export function PricingPageClient({ locale }: PricingPageClientProps) {
  const tiers = getOrderedPricingFoundations();
  const faqSeen = useRef(false);

  useEffect(() => {
    const el = document.getElementById("pricing-faq");
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting && !faqSeen.current) {
          faqSeen.current = true;
          trackPricingEvent("pricing_faq_inview");
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 pt-10 sm:px-6 sm:pt-14">
      <header className="text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400/90">Pricing</p>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-5xl sm:leading-tight">
          Choose your growth engine.
          <span className="block text-emerald-400">Launch fast. Own it forever.</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base font-medium leading-relaxed text-slate-400 sm:text-lg">
          Transparent GEL pricing for Georgian businesses — full ownership, clear timelines, and no hidden
          platform rent.
        </p>
        <div className="mt-8">
          <PricingCtaBand locale={locale} placement="hero" />
        </div>
      </header>

      <div className="mt-16">
        <PricingProofStrip />
      </div>

      <div className="mt-16">
        <TierPickerQuiz locale={locale} />
      </div>

      <div className="mt-16">
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-black text-white sm:text-3xl">Packages</h2>
            <p className="mt-1 text-sm font-medium text-slate-400">
              Four foundations. Expand any card for the full scope.
            </p>
          </div>
        </div>
        <PricingTierDeck locale={locale} tiers={tiers} />
      </div>

      <div className="mt-16">
        <PricingComparisonSection />
        <div className="mt-10 flex justify-center">
          <PricingCtaBand locale={locale} placement="mid" />
        </div>
      </div>

      <div className="mt-20">
        <PricingFaq />
      </div>

      <div className="mt-16 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-10 text-center sm:px-12">
        <div className="mx-auto max-w-xl">
          <p className="text-lg font-black text-white sm:text-xl">Ready to scope your build?</p>
          <p className="mt-2 text-sm text-slate-400 font-medium">
            Open the Architect Studio, book a call, or message us on WhatsApp — same team, same ownership
            promise.
          </p>
          <div className="mt-6">
            <PricingCtaBand locale={locale} placement="footer" />
          </div>
        </div>
      </div>
    </div>
  );
}
