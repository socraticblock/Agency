"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { SHIELD_TIERS, type ShieldTier } from "@/constants/pricing";
import {
  buildPricingTierWhatsAppUrl,
  openPricingWhatsApp,
} from "@/lib/pricingWhatsApp";
import type { PricingTierPayload } from "./pricingTierData";

function formatShieldPrice(t: ShieldTier): string {
  if (t.priceGEL <= 0) return "Included";
  return `${t.priceGEL.toLocaleString("en-US")} ₾/mo`;
}

export function PricingTierDeck({
  locale,
  tiers,
}: {
  locale: string;
  tiers: PricingTierPayload[];
}) {
  const [expandedTierId, setExpandedTierId] = useState<string | null>(null);
  const [selectedShieldId, setSelectedShieldId] = useState<string>("0");

  const shieldById = useMemo(() => {
    const m = new Map<string, ShieldTier>();
    SHIELD_TIERS.forEach((t) => m.set(String(t.id), t));
    return m;
  }, []);

  function toggleExpand(foundationId: string) {
    setExpandedTierId((prev) => (prev === foundationId ? null : foundationId));
  }

  function openWaForTier(
    tier: PricingTierPayload,
    opts: { skipShield: boolean }
  ) {
    const selected = shieldById.get(selectedShieldId);
    const url = buildPricingTierWhatsAppUrl({
      tierName: tier.name,
      priceLabel: `${tier.priceFormatted}`,
      deliveryTime: tier.delivery,
      featureLines: tier.whatsappFeatureLines,
      shieldTier: opts.skipShield ? undefined : selected,
      skipShieldLine: opts.skipShield,
    });
    openPricingWhatsApp(url);
  }

  return (
    <div className="grid gap-5 lg:grid-cols-4">
      {tiers.map((tier) => {
        const expanded = expandedTierId === tier.foundationId;
        return (
          <article
            key={tier.foundationId}
            className={`relative flex min-h-[560px] flex-col rounded-2xl border bg-[#0a1125]/85 p-6 shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-[min-height] duration-300 motion-reduce:transition-none ${tier.orderClass} ${
              tier.recommended
                ? "border-emerald-400/60 ring-1 ring-emerald-400/40"
                : "border-white/10"
            }`}
          >
            <div className="min-h-7">
              {tier.recommended ? (
                <span className="absolute -top-3 left-6 inline-flex rounded-full border border-emerald-300/60 bg-emerald-400/15 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-emerald-300">
                  Recommended
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
              <p className="text-4xl font-black tracking-tight text-emerald-300">
                {tier.priceFormatted}
              </p>
              {tier.installmentLabel ? (
                <p className="mt-1 text-xs font-semibold text-slate-400">
                  {tier.installmentLabel}
                </p>
              ) : null}
              <p className="mt-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                {tier.delivery}
              </p>
            </div>

            <div className="mt-6 flex flex-1 flex-col gap-4">
              {tier.features.map((group) => (
                <div key={`${tier.foundationId}-${group.category}`}>
                  <p className="mb-1 text-[11px] font-black uppercase tracking-wider text-slate-200">
                    {group.category}
                  </p>
                  <ul className="space-y-1">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-1.5 text-[12px] leading-snug text-slate-300"
                      >
                        <span className="mt-[2px] shrink-0 text-emerald-400">✓</span>
                        <span
                          className={
                            tier.foundationId === "cms" &&
                            item.includes("100% custom")
                              ? "font-bold text-slate-100"
                              : undefined
                          }
                        >
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {tier.exclusionNote ? (
                <p className="text-[11px] italic leading-snug text-slate-500">
                  {tier.exclusionNote}
                </p>
              ) : null}
            </div>

            <div className="mt-6 space-y-3">
              <button
                type="button"
                aria-expanded={expanded}
                onClick={() => toggleExpand(tier.foundationId)}
                className={`inline-flex w-full min-h-12 items-center justify-center rounded-xl px-4 py-3 text-center text-xs font-black uppercase tracking-wider transition ${
                  tier.recommended
                    ? "bg-emerald-400 text-slate-950 hover:bg-emerald-300"
                    : "border border-white/20 bg-transparent text-slate-100 hover:border-emerald-400/50 hover:text-emerald-300"
                }`}
              >
                {tier.primaryCtaLabel}
              </button>

              <Link
                href={`/${locale}/architect?tier=${tier.architectTierSlug}`}
                className="block text-center text-[11px] font-bold uppercase tracking-wider text-slate-500 underline-offset-4 transition hover:text-emerald-400/90"
              >
                Or configure it yourself →
              </Link>

              <p className="text-[11px] text-slate-500">{tier.audience}</p>
            </div>

            {expanded ? (
              <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 motion-reduce:animate-none">
                <p className="text-sm font-black text-white">Choose your protection plan</p>
                <p className="mt-1 text-[11px] text-slate-500">
                  Optional — monthly Shield add-on. Not required to message us.
                </p>

                <fieldset className="mt-4 space-y-2">
                  <legend className="sr-only">Shield tier</legend>
                  {SHIELD_TIERS.map((s) => (
                    <label
                      key={s.id}
                      className={`flex cursor-pointer items-start gap-3 rounded-lg border px-3 py-2.5 text-left transition ${
                        selectedShieldId === String(s.id)
                          ? "border-emerald-400/50 bg-emerald-500/10"
                          : "border-white/10 hover:border-white/20"
                      }`}
                    >
                      <input
                        type="radio"
                        className="mt-1 h-4 w-4 accent-emerald-400"
                        name={`shield-${tier.foundationId}`}
                        value={String(s.id)}
                        checked={selectedShieldId === String(s.id)}
                        onChange={() => setSelectedShieldId(String(s.id))}
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-bold text-white">
                          {s.name}
                        </span>
                        <span className="text-xs font-semibold text-emerald-400">
                          {formatShieldPrice(s)}
                        </span>
                        <span className="mt-0.5 block text-[11px] text-slate-500">
                          {s.description}
                        </span>
                      </span>
                    </label>
                  ))}
                </fieldset>

                <div className="mt-4 flex flex-col gap-2 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="button"
                    className="text-left text-[12px] font-semibold text-slate-500 underline decoration-slate-600 underline-offset-2 hover:text-slate-300"
                    onClick={() => openWaForTier(tier, { skipShield: true })}
                  >
                    Skip Shield selection →
                  </button>
                  <button
                    type="button"
                    className="inline-flex min-h-11 items-center justify-center rounded-xl bg-emerald-500 px-4 py-2.5 text-xs font-black uppercase tracking-wider text-slate-950 hover:bg-emerald-400"
                    onClick={() => openWaForTier(tier, { skipShield: false })}
                  >
                    Continue to WhatsApp →
                  </button>
                </div>
              </div>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}
