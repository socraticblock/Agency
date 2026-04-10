"use client";

import { CreditCard, HelpCircle } from "lucide-react";
import { START_DC_BRAND, START_DC_CHROME } from "@/constants/start-digital-card-copy";

type Props = {
  onLogo: () => void;
  onPricing: () => void;
  onFaq: () => void;
};

export function StartChromeBar({ onLogo, onPricing, onFaq }: Props) {
  return (
    <header
      className="fixed right-0 left-0 z-[140] flex h-12 items-center justify-between border-b border-white/[0.06] bg-slate-950/80 px-4 backdrop-blur-md"
      style={{ top: "4rem" }}
    >
      <button
        type="button"
        onClick={onLogo}
        className="cursor-pointer text-sm font-semibold text-white/70 transition-colors hover:text-white"
      >
        {START_DC_BRAND}
      </button>
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={onPricing}
          className="cursor-pointer p-2 text-white/40 transition-colors hover:text-white/70"
          aria-label={START_DC_CHROME.pricingAria}
        >
          <CreditCard className="h-5 w-5" aria-hidden />
        </button>
        <button
          type="button"
          onClick={onFaq}
          className="cursor-pointer p-2 text-white/40 transition-colors hover:text-white/70"
          aria-label={START_DC_CHROME.faqAria}
        >
          <HelpCircle className="h-5 w-5" aria-hidden />
        </button>
      </div>
    </header>
  );
}
