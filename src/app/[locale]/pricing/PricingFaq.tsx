"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { trackPricingEvent } from "@/lib/pricingAnalytics";

const ITEMS: { q: string; a: string }[] = [
  {
    q: "Do I own the source code?",
    a: "Yes. Packages include source ownership transfer (e.g. GitHub) so your site is your asset — not a locked-in subscription.",
  },
  {
    q: "Can I upgrade later?",
    a: "Absolutely. Many clients start with Essential or Professional and expand when they need more pages, modules, or commerce.",
  },
  {
    q: "How long until launch?",
    a: "Each card lists a delivery window. E-commerce and larger builds take longer because of bank approvals, integrations, and QA.",
  },
  {
    q: "What about payments and RS.ge?",
    a: "E-Commerce HQ includes Georgian gateway integration (TBC/BOG) and the RS.ge fiscal flow as part of the storefront scope.",
  },
  {
    q: "What if I need something custom?",
    a: "Use Command Center for structured multi-page systems, or talk to us on WhatsApp for bespoke software — we scope before we build.",
  },
];

export function PricingFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="pricing-faq" aria-labelledby="pricing-faq-title" className="scroll-mt-24">
      <h2 id="pricing-faq-title" className="text-2xl font-black text-white sm:text-3xl">
        FAQ
      </h2>
      <p className="mt-2 max-w-prose text-sm font-medium text-slate-400">
        Short answers — ask us anything on WhatsApp for your specific case.
      </p>
      <ul className="mt-6 space-y-2">
        {ITEMS.map((item, i) => {
          const isOpen = open === i;
          return (
            <li key={item.q} className="rounded-xl border border-white/10 bg-white/[0.02]">
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left"
                onClick={() => {
                  setOpen(isOpen ? null : i);
                  if (!isOpen) {
                    trackPricingEvent("pricing_faq_open", { index: String(i) });
                  }
                }}
                aria-expanded={isOpen}
              >
                <span className="font-bold text-white">{item.q}</span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-slate-500 transition ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              {isOpen && (
                <p className="max-w-prose border-t border-white/5 px-4 pb-4 pt-2 text-sm leading-relaxed text-slate-400">
                  {item.a}
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
