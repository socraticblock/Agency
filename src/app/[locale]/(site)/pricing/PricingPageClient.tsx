"use client";

import { useEffect, useRef } from "react";
import { Check, ShieldCheck } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { trackPricingEvent } from "@/lib/pricingAnalytics";
import { SHIELD_TIERS } from "@/constants/pricing";
import { getPricingTierData } from "./pricingTierData";
import { PricingComparisonSection } from "./PricingComparisonSection";
import { PricingCtaBand } from "./PricingCtaBand";
import { PricingFaq } from "./PricingFaq";
import { PricingProofStrip } from "./PricingProofStrip";
import { PricingTierDeck } from "./PricingTierDeck";

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
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 pt-10 sm:px-6 sm:pt-14">
      <header className="mx-auto max-w-4xl text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400/90">
          Packages
        </p>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-5xl sm:leading-tight">
          Pick the website foundation that fits how your business sells.
          <span className="block bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Launch fast. Own it forever.
          </span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base font-medium leading-relaxed text-slate-400 sm:text-lg">
          Transparent GEL pricing for Georgian businesses, with no platform rent, clear delivery windows,
          and direct guidance if you are unsure which package fits.
        </p>
        <div className="mt-7">
          <PricingCtaBand locale={locale} placement="hero" />
        </div>
      </header>

      <div className="mt-14">
        <PricingProofStrip />
      </div>

      <section id="packages" className="scroll-anchor-target mt-16">
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-black text-white sm:text-3xl">Packages</h2>
            <p className="mt-1 text-sm font-medium text-slate-400">
              Three foundations. Expand any card for full scope, timeline, warranty, and fit.
            </p>
          </div>
        </div>
        <PricingTierDeck tiers={tiers} />
      </section>

      <section className="mt-16">
        <PricingComparisonSection locale={locale} />

        <div
          id="shield-callout"
          className="mx-auto mt-24 max-w-7xl rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-10"
        >
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-400/25 bg-emerald-400/10 text-emerald-300">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-2xl font-black text-white sm:text-4xl">
              Shield: infrastructure, security, and warranty
            </h3>
            <p className="mt-4 text-base leading-relaxed text-slate-400">
              Every package is launched with secure hosting setup, deployment safety checks, and a clear bug warranty.
              Optional Shield support can add deeper monitoring, backups, and faster response coverage.
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
                    <span className="font-space text-2xl font-black text-emerald-400">
                      {tier.priceGEL === 0 ? "Included" : `${tier.priceGEL} GEL/yr`}
                    </span>
                  </div>
                  <p className="mt-2 min-h-[32px] text-xs text-slate-400">{tier.description}</p>
                </div>

                <hr className="my-4 border-white/10" />

                <ul className="flex flex-col gap-3">
                  {tier.perks.map((perk) => (
                    <li key={perk.title} className="flex gap-3">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                      <div>
                        <p className="text-xs font-bold leading-tight text-white">{perk.title}</p>
                        <p className="mt-0.5 text-[11px] leading-tight text-slate-400">{perk.desc}</p>
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
      </section>

      <div id="pricing-faq" className="scroll-anchor-target mt-20">
        <PricingFaq />
      </div>

      <section className="mt-16 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-10 text-center sm:px-12">
        <div className="mx-auto max-w-xl">
          <p className="text-lg font-black text-white sm:text-xl">Not sure which package fits?</p>
          <p className="mt-2 text-sm font-medium text-slate-400">
            Send your current website, Instagram, or idea. I will recommend the smallest package that can do the job properly.
          </p>
          <div className="mt-6">
            <PricingCtaBand locale={locale} placement="footer" />
          </div>
        </div>
      </section>
    </div>
  );
}
