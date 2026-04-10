"use client";

import { Check } from "lucide-react";
import { START_DC_PRICING, START_DC_WELCOME } from "@/constants/start-digital-card-copy";
import type { DigitalCardTierId } from "../../lib/digital-card-product";
import { DIGITAL_CARD_TIER_SETUP_GEL } from "../../lib/digital-card-product";

type Props = {
  selectedTier: DigitalCardTierId;
  onSelectTier: (t: DigitalCardTierId) => void;
  onBack: () => void;
  onStartBuilding: () => void;
  isMobileStack: boolean;
};

const TIERS: DigitalCardTierId[] = ["executive", "professional", "subdomain"];

function TierCard({
  tier,
  selected,
  onSelect,
}: {
  tier: DigitalCardTierId;
  selected: boolean;
  onSelect: () => void;
}) {
  const p = START_DC_PRICING;
  const name =
    tier === "subdomain" ? p.tierSubdomain : tier === "professional" ? p.tierProfessional : p.tierExecutive;
  const bullets =
    tier === "subdomain"
      ? p.bulletSubdomain
      : tier === "professional"
        ? p.bulletProfessional
        : p.bulletExecutive;
  const badge =
    tier === "subdomain" ? p.subdomainBadge : tier === "executive" ? p.executiveBadge : null;
  const price = DIGITAL_CARD_TIER_SETUP_GEL[tier];
  const execBorder = tier === "executive";

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full rounded-xl border p-4 text-left transition-colors ${
        execBorder ? "border-emerald-500/30" : "border-white/[0.08]"
      } ${selected ? "bg-white/[0.06]" : "bg-white/[0.02]"} hover:bg-white/[0.05]`}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="font-semibold text-white">{name}</span>
        {badge ? (
          <span
            className={`text-xs ${tier === "executive" ? "font-medium text-emerald-400" : "text-white/40"}`}
          >
            {tier === "executive" ? `⭐ ${badge}` : badge}
          </span>
        ) : null}
      </div>
      <div className="mt-1 flex items-baseline gap-1">
        <span className="text-2xl font-bold text-white">{price}₾</span>
        <span className="text-xs text-white/40">{p.setupLabel}</span>
      </div>
      <div className="my-3 border-t border-white/10" />
      <ul className="space-y-1.5">
        {bullets.map((line) => (
          <li key={line} className="flex gap-2 text-xs text-white/80">
            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400/90" aria-hidden />
            <span>{line}</span>
          </li>
        ))}
      </ul>
    </button>
  );
}

export function OverlayPricingBody({
  selectedTier,
  onSelectTier,
  onBack,
  onStartBuilding,
  isMobileStack,
}: Props) {
  const p = START_DC_PRICING;
  const order = isMobileStack ? TIERS : (["subdomain", "professional", "executive"] as const);

  return (
    <div className="text-white">
      <button
        type="button"
        onClick={onBack}
        className="mb-4 text-sm text-white/50 transition-colors hover:text-white"
      >
        {p.back}
      </button>
      <h2 className="mb-6 text-xl font-bold">{p.title}</h2>
      <div
        className={
          isMobileStack ? "flex flex-col gap-3" : "grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-2 lg:gap-3"
        }
      >
        {order.map((tier) => (
          <TierCard
            key={tier}
            tier={tier}
            selected={selectedTier === tier}
            onSelect={() => onSelectTier(tier)}
          />
        ))}
      </div>
      <p className="mt-4 text-center text-xs text-white/40">{p.hostingNote}</p>
      <button
        type="button"
        onClick={onStartBuilding}
        className="mt-6 w-full rounded-lg bg-emerald-500 px-8 py-3 text-base font-semibold text-white shadow-lg shadow-emerald-500/20 transition-colors hover:bg-emerald-600"
      >
        {START_DC_WELCOME.startBuilding}
      </button>
    </div>
  );
}
