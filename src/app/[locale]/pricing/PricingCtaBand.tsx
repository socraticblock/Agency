"use client";

import { trackPricingEvent } from "@/lib/pricingAnalytics";
import { WHATSAPP_INTAKE } from "@/constants/content";
import type { Locale } from "@/lib/i18n";

type Placement = "hero" | "mid" | "footer";

interface PricingCtaBandProps {
  locale: Locale;
  placement: Placement;
  className?: string;
}

const WA_TEXT =
  "Hi Genezisi! I saw your pricing page and want to discuss the right package for my business.";

export function PricingCtaBand({ locale, placement, className = "" }: PricingCtaBandProps) {
  const wa = `https://wa.me/${WHATSAPP_INTAKE}?text=${encodeURIComponent(WA_TEXT)}`;

  const onWa = () => {
    trackPricingEvent("pricing_whatsapp_click", { placement });
  };

  return (
    <div
      className={`flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center ${className}`}
    >
      <a
        href={wa}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onWa}
        className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-emerald-500 px-6 py-3 text-center text-sm font-black uppercase tracking-wide text-slate-950 shadow-[0_0_24px_rgba(16,185,129,0.35)] transition hover:bg-emerald-400"
      >
        Let&apos;s Talk — WhatsApp
      </a>
    </div>
  );
}
