"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { Foundation } from "@/constants/pricing";
import type { Locale } from "@/lib/i18n";
import { buildPricingTierWhatsAppUrl, openPricingWhatsApp } from "@/lib/pricingWhatsApp";
import { trackPricingEvent } from "@/lib/pricingAnalytics";
import { priceDisplayLabel, tierPrimaryHref } from "./pricingTierData";

const PREVIEW_COUNT = 4;

interface PricingTierDeckProps {
  locale: Locale;
  tiers: Foundation[];
}

export function PricingTierDeck({ locale, tiers }: PricingTierDeckProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggle = (id: string) => {
    setExpanded((prev) => {
      const next = !prev[id];
      if (next) {
        trackPricingEvent("pricing_tier_expand", { tierId: id });
      }
      return { ...prev, [id]: next };
    });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {tiers.map((f) => {
        const scope = f.scope ?? [];
        const preview = scope.slice(0, PREVIEW_COUNT);
        const rest = scope.slice(PREVIEW_COUNT);
        const hasMore = rest.length > 0;
        const isOpen = expanded[f.id] ?? false;
        const primaryHref = tierPrimaryHref(locale, f);
        const priceLabel = priceDisplayLabel(f);

        const waUrl = buildPricingTierWhatsAppUrl({
          projectType: "tier-package",
          tierName: f.name,
          priceLabel,
          deliveryTime: f.deliveryTimeline ?? "",
          featureLines: preview.map((line) => line.replace(/^[^|]+\|\s*/, "")),
          skipShieldLine: true,
        });

        return (
          <article
            key={f.id}
            className={`relative flex flex-col rounded-2xl border p-6 sm:p-8 ${
              f.isRecommendedTier
                ? "border-emerald-500/50 bg-emerald-500/[0.06] shadow-[0_0_40px_rgba(16,185,129,0.12)]"
                : "border-white/10 bg-white/[0.02]"
            }`}
          >
            {f.isRecommendedTier && (
              <span className="absolute right-4 top-4 rounded-full bg-emerald-400 px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-slate-950">
                Recommended
              </span>
            )}
            <div className="mb-4 flex items-start gap-2">
              {f.emoji && <span className="text-2xl leading-none">{f.emoji}</span>}
              <div>
                <h3 className="text-xl font-black tracking-tight text-white">{f.name}</h3>
                {f.tagline && <p className="mt-1 text-sm font-medium text-slate-400">{f.tagline}</p>}
              </div>
            </div>

            <div className="mb-4">
              <p className="text-3xl font-black tabular-nums text-white sm:text-4xl">
                {f.isBespoke ? f.customPriceLabel ?? "Custom quote" : `${f.priceGEL.toLocaleString("ka-GE")} ₾`}
              </p>
              {f.installmentLabel && (
                <p className="mt-1 text-sm font-medium text-emerald-400/90">{f.installmentLabel}</p>
              )}
            </div>

            <ul className="mb-4 space-y-2 text-sm text-slate-300">
              {f.deliveryTimeline && (
                <li>
                  <span className="font-bold text-slate-500">Timeline: </span>
                  {f.deliveryTimeline}
                </li>
              )}
              {typeof f.revisionRounds === "number" && (
                <li>
                  <span className="font-bold text-slate-500">Revisions: </span>
                  {f.revisionRounds} round{f.revisionRounds === 1 ? "" : "s"}
                </li>
              )}
              {typeof f.warrantyDays === "number" && (
                <li>
                  <span className="font-bold text-slate-500">Warranty: </span>
                  {f.warrantyDays} days
                </li>
              )}
            </ul>

            <p className="mb-3 text-xs font-black uppercase tracking-wider text-slate-500">Includes</p>
            <ul className="mb-4 space-y-2">
              {(isOpen ? scope : preview).map((line, idx) => (
                <li key={`${f.id}-${idx}`} className="flex gap-2 text-sm text-slate-300">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500/80" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>

            {hasMore && (
              <button
                type="button"
                onClick={() => toggle(f.id)}
                className="mb-6 flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-emerald-400 hover:text-emerald-300"
              >
                {isOpen ? (
                  <>
                    Show less <ChevronUp className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    Full details ({rest.length} more) <ChevronDown className="h-4 w-4" />
                  </>
                )}
              </button>
            )}

            <div className="mt-auto flex flex-col gap-2 border-t border-white/10 pt-6">
              <Link
                href={primaryHref}
                onClick={() =>
                  trackPricingEvent("pricing_tier_primary_cta", { tierId: f.id, href: primaryHref })
                }
                className="inline-flex min-h-[48px] w-full items-center justify-center rounded-xl bg-emerald-500 px-4 py-3 text-center text-sm font-black uppercase tracking-wide text-slate-950 transition hover:bg-emerald-400"
              >
                {f.ctaLabel ?? "Get started"}
              </Link>
              <button
                type="button"
                onClick={() => {
                  trackPricingEvent("pricing_tier_whatsapp", { tierId: f.id });
                  openPricingWhatsApp(waUrl);
                }}
                className="inline-flex min-h-[48px] w-full items-center justify-center rounded-xl border border-white/15 bg-transparent px-4 py-3 text-sm font-bold text-white transition hover:bg-white/5"
              >
                Questions? WhatsApp us
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}
