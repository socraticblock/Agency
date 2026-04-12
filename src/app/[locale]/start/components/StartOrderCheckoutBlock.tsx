"use client";

import { MessageCircle } from "lucide-react";
import { START_DC_ORDER_BLOCK, START_DC_PRICING } from "@/constants/start-digital-card-copy";
import type { DigitalCardTierId } from "../lib/digital-card-product";
import type { Lane1StatePatch } from "../lib/types";

const TIER_ORDER: DigitalCardTierId[] = ["subdomain", "professional", "executive"];

function tierPricingName(tier: DigitalCardTierId): string {
  const p = START_DC_PRICING;
  return tier === "subdomain"
    ? p.tierSubdomain
    : tier === "professional"
      ? p.tierProfessional
      : p.tierExecutive;
}

type Props = {
  selectedTier: DigitalCardTierId;
  digitalCardUrlHint: string;
  setupGel: number;
  hostingGel: number;
  waUrl: string;
  onPatch: (p: Lane1StatePatch) => void;
  onOrderClick: () => void;
};

export function StartOrderCheckoutBlock({
  selectedTier,
  digitalCardUrlHint,
  setupGel,
  hostingGel,
  waUrl,
  onPatch,
  onOrderClick,
}: Props) {
  const copy = START_DC_ORDER_BLOCK;

  const selectTier = (t: DigitalCardTierId) => {
    if (t === "professional") {
      onPatch({ selectedTier: t, digitalCardUrlHint: "" });
    } else {
      onPatch({ selectedTier: t });
    }
  };

  return (
    <div className="start-glass-heavy space-y-4 p-4 md:p-6">
      <p className="start-body text-center text-xs font-semibold uppercase tracking-wide text-[#64748b]">
        {copy.choosePlan}
      </p>
      <div
        className="flex flex-wrap items-center justify-center gap-2"
        role="group"
        aria-label={copy.choosePlan}
      >
        {TIER_ORDER.map((tier) => (
          <button
            key={tier}
            type="button"
            onClick={() => selectTier(tier)}
            className={`start-order-tier-btn ${selectedTier === tier ? "start-order-tier-btn--selected" : ""}`}
          >
            {tierPricingName(tier)}
          </button>
        ))}
      </div>
      <p className="start-body text-center">
        <span className="text-[#64748b]">Plan: </span>
        <span className="start-cta-price">{tierPricingName(selectedTier)}</span>
        <span className="text-[#64748b]">
          {" "}
          · {setupGel} ₾ setup + {hostingGel} ₾/yr hosting
        </span>
      </p>

      {selectedTier === "professional" ? (
        <p className="start-body mx-auto max-w-md text-center text-sm text-[#64748b]">{copy.professionalNote}</p>
      ) : null}

      {selectedTier === "subdomain" ? (
        <div className="space-y-2">
          <label className="start-body block text-center text-[#64748b]">
            <span className="mb-1 block text-xs">{copy.subdomainUrlLabel}</span>
            <input
              type="text"
              value={digitalCardUrlHint}
              onChange={(e) => onPatch({ digitalCardUrlHint: e.target.value })}
              placeholder={copy.subdomainUrlPlaceholder}
              className="start-field mx-auto max-w-md text-center"
              autoComplete="off"
            />
          </label>
          <p className="start-body text-center text-xs text-[#64748b]">{copy.subdomainHelper}</p>
        </div>
      ) : null}

      {selectedTier === "executive" ? (
        <div className="space-y-2">
          <label className="start-body block text-center text-[#64748b]">
            <span className="mb-1 block text-xs">{copy.executiveUrlLabel}</span>
            <input
              type="text"
              value={digitalCardUrlHint}
              onChange={(e) => onPatch({ digitalCardUrlHint: e.target.value })}
              placeholder={copy.executiveUrlPlaceholder}
              className="start-field mx-auto max-w-md text-center"
              autoComplete="off"
            />
          </label>
          <p className="start-body text-center text-xs text-[#64748b]">{copy.executiveHelper}</p>
        </div>
      ) : null}

      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onOrderClick}
        className="start-wa-cta mt-2 inline-flex w-full items-center justify-center gap-2"
      >
        <MessageCircle className="h-5 w-5 shrink-0" aria-hidden />
        Order on WhatsApp
      </a>
    </div>
  );
}
