"use client";

import { FOUNDATIONS } from "@/constants/pricing";
import { WHATSAPP_INTAKE } from "@/constants/content";
import { TierDeckItem as PricingTierDeckType } from "./pricingTierData";

const WA_BASE = `https://wa.me/${WHATSAPP_INTAKE}`;

function formatPrice(gel: number) {
  return gel.toLocaleString("ka-GE") + " ₾";
}

export function PricingTierDeck({ tiers }: { tiers: PricingTierDeckType[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {tiers.map((tier, idx) => {
        const foundation = FOUNDATIONS.find((f) => f.id === tier.id);
        if (!foundation) return null;

        const waText = encodeURIComponent(
          `Hi Genezisi! I'm interested in the ${tier.label} tier (${formatPrice(foundation.priceGEL)}). Can we discuss next steps?`
        );

        const isPopular = tier.badge === "Most Popular";

        return (
          <div
            key={foundation.id}
            className={`relative flex flex-col rounded-2xl border transition-shadow hover:shadow-lg ${
              isPopular
                ? "border-emerald-400/50 bg-emerald-500/5 shadow-[0_0_32px_rgba(16,185,129,0.15)]"
                : "border-white/10 bg-white/[0.02]"
            }`}
          >
            {/* Badge */}
            {tier.badge && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-500 px-3 py-0.5 text-[10px] font-black uppercase tracking-widest text-slate-950">
                {tier.badge}
              </span>
            )}

            <div className="flex flex-1 flex-col gap-4 p-6">
              {/* Header */}
              <div>
                <h3 className="text-lg font-black text-white">{tier.label}</h3>
                <p className="mt-1 text-xs text-slate-400">{foundation.tagline}</p>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black font-space text-white">
                  {foundation.customPriceLabel ?? formatPrice(foundation.priceGEL)}
                </span>
              </div>

              {/* Meta */}
              <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-wider text-slate-400">
                <span className="rounded-full border border-white/10 px-2 py-0.5">
                  {foundation.warrantyDays}d warranty
                </span>
                <span className="rounded-full border border-white/10 px-2 py-0.5">
                  {foundation.deliveryTimeline}
                </span>
                {foundation.id === 'ecomm' && (
                  <span className="rounded-full border border-white/10 px-2 py-0.5">
                    5 pages included
                  </span>
                )}
              </div>

              {/* Highlights */}
              <ul className="flex flex-col gap-1.5 text-sm text-slate-300">
                {foundation.scope.slice(0, 6).map((h) => (
                  <li key={h} className="flex items-start gap-2">
                    <span className="mt-1 text-emerald-400">✓</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              {/* Spacer */}
              <div className="mt-auto" />

              {/* CTA */}
              <a
                href={`${WA_BASE}?text=${waText}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-2 inline-flex min-h-[48px] items-center justify-center rounded-xl text-center text-sm font-bold transition ${
                  isPopular
                    ? "bg-emerald-500 text-slate-950 hover:bg-emerald-400"
                    : "border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20"
                }`}
              >
                Get Started on WhatsApp
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}
