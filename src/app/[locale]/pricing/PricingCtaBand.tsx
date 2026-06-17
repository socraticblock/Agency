"use client";

import { MessageCircle } from "lucide-react";
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
  "Hi Genezisi! I saw your packages and want advice on the right website package for my business.";

export function PricingCtaBand({ placement, className = "" }: PricingCtaBandProps) {
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
        className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 px-6 py-3 text-center text-sm font-black text-slate-950 shadow-[0_0_24px_rgba(16,185,129,0.35)] transition hover:scale-[1.02]"
      >
        <MessageCircle className="h-4 w-4" />
        Get package advice
      </a>
    </div>
  );
}
