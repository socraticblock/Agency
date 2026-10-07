"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { SHIELD_TIERS } from "@/constants/pricing";

interface FaqItem {
  q: string;
  a: string;
}

const shieldSummary = SHIELD_TIERS.map(
  (tier) => `${tier.name} (${tier.priceGEL.toLocaleString("ka-GE")} GEL/yr)`,
).join(", ");

const FAQ: FaqItem[] = [
  {
    q: "What's the difference between Professional, Command Center, and E-Commerce HQ?",
    a: "Professional is a fully custom landing page: one focused page with 4 sections, optimized for conversions. Command Center adds multi-page structure, a CMS-ready foundation, multi-language support, and priority support. E-Commerce HQ is a complete online store with payment processing, inventory management, and Georgian bank integrations.",
  },
  {
    q: "What does 'starting from' mean for E-Commerce HQ?",
    a: "E-Commerce HQ starts at 3,999 GEL for a 5-page online store with full payment and inventory capabilities. The final price depends on the number of products, custom integrations, and additional modules you choose.",
  },
  {
    q: "What is a Shield plan?",
    a: `Shields are yearly support and maintenance plans. They include monitoring, backups, security patching, performance optimization, and priority support depending on tier. Current tiers are ${shieldSummary}.`,
  },
  {
    q: "How does the warranty work?",
    a: "Every foundation comes with a built-in warranty: Professional (45 days), Command Center (75 days), and E-Commerce HQ (100 days). During this period, any bugs or issues are fixed at no extra cost.",
  },
  {
    q: "Can I add more pages later?",
    a: "Additional pages are available for Command Center and E-Commerce HQ plans. Each additional page can be added as a module through the Architect Studio.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept bank transfer in GEL, card payment, and PayPal for international clients. Payment terms are discussed during the consultation on WhatsApp.",
  },
  {
    q: "How long does delivery take?",
    a: "Professional sites take 7-10 business days. Command Center takes 10-15 business days. E-Commerce HQ takes 20+ business days depending on scope. All timelines are confirmed during the planning phase.",
  },
  {
    q: "Do you offer payment plans?",
    a: "We keep pricing simple with one-time payment per project. For larger projects like E-Commerce HQ, we can discuss milestones during the WhatsApp consultation.",
  },
];

export function PricingFaq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <h2 className="mb-8 text-center text-2xl font-black text-white">
        Frequently Asked Questions
      </h2>
      <div className="flex flex-col gap-2">
        {FAQ.map((item, i) => {
          const isOpen = open === i;
          return (
            <div
              key={item.q}
              className="rounded-xl border border-white/10 bg-white/[0.02] transition"
            >
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="text-sm font-bold text-white">{item.q}</span>
                {isOpen ? (
                  <Minus className="h-4 w-4 shrink-0 text-slate-400" />
                ) : (
                  <Plus className="h-4 w-4 shrink-0 text-slate-400" />
                )}
              </button>
              {isOpen && (
                <div className="px-5 pb-4 text-sm leading-6 text-slate-300">{item.a}</div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
