"use client";

import { useEffect, useRef } from "react";
import type { Locale } from "@/lib/i18n";
import { trackPricingEvent } from "@/lib/pricingAnalytics";
import { getPricingTierData } from "./pricingTierData";
import { PricingCtaBand } from "./PricingCtaBand";
import { PricingProofStrip } from "./PricingProofStrip";
import { PricingTierDeck } from "./PricingTierDeck";
import { PricingComparisonSection } from "./PricingComparisonSection";
import { PricingFaq } from "./PricingFaq";
import { SHIELD_TIERS } from "@/constants/pricing";

interface PricingPageClientProps {
  locale: Locale;
}

export function PricingPageClient({ locale }: PricingPageClientProps) {
  const tiers = getPricingTierData(locale);
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
          <span className="block bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Launch fast. Own it forever.
          </span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base font-medium leading-relaxed text-slate-400 sm:text-lg">
          Transparent GEL pricing for Georgian businesses — full ownership, clear timelines, and no hidden
          platform rent.
        </p>
      </header>

      <div className="mt-16">
        <PricingProofStrip />
      </div>

      <div className="mt-16">
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-black text-white sm:text-3xl">Packages</h2>
            <p className="mt-1 text-sm font-medium text-slate-400">
              Three foundations. Expand any card for the full scope.
            </p>
          </div>
        </div>
        <PricingTierDeck tiers={tiers} />
      </div>

      <div className="mt-16">
        <PricingComparisonSection locale={locale} />
        
        {/* FULL SHIELD SHOWCASE */}
        <div id="shield-callout" className="mx-auto mt-24 max-w-7xl rounded-3xl border border-white/5 bg-white/[0.02] p-8 sm:p-12">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h3 className="text-2xl font-black text-white sm:text-4xl">
              🛡️ Shield — Infrastructure & Security
            </h3>
            <p className="mt-4 text-base text-slate-400">
              Every package includes secure hosting, automated backups, and proactive monitoring via our Sentinel Protocol. Shield also extends your warranty period.
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {SHIELD_TIERS.map((tier) => (
              <div 
                key={tier.id} 
                className={`relative flex flex-col rounded-2xl border p-6 transition-colors ${
                  tier.isRecommended
                    ? "border-emerald-500/40 bg-emerald-500/5 shadow-[0_0_30px_rgba(16,185,129,0.1)]"
                    : "border-white/10 bg-white/5"
                }`}
              >
                {tier.isRecommended && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-500 px-3 py-0.5 text-[10px] font-black uppercase tracking-widest text-slate-950">
                    Recommended
                  </span>
                )}
                
                <div className="mb-4">
                  <h4 className="text-lg font-black text-white">{tier.name}</h4>
                  <div className="mt-1 flex items-baseline gap-1">
                    <span className="text-2xl font-black font-space text-emerald-400">
                      {tier.priceGEL === 0 ? "Included" : `${tier.priceGEL} ₾/yr`}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-slate-400 min-h-[32px]">{tier.description}</p>
                </div>
                
                <hr className="my-4 border-white/10" />
                
                <ul className="flex flex-col gap-3">
                  {tier.perks.map((perk, j) => (
                    <li key={j} className="flex gap-3">
                      <span className="mt-0.5 text-emerald-400">✓</span>
                      <div>
                        <p className="text-xs font-bold text-white leading-tight">{perk.title}</p>
                        <p className="mt-0.5 text-[11px] text-slate-400 leading-tight">{perk.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex justify-center">
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
            Book a call or message us on WhatsApp — same team, same ownership
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
