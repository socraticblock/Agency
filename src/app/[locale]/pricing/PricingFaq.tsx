"use client";

import { useState } from "react";

interface FaqItem {
  q: string;
  a: string;
}

const FAQ: FaqItem[] = [
  {
    q: "What's the difference between Professional, Command Center, and E-Commerce HQ?",
    a: "Professional is a fully custom landing page — one powerful page with 4 sections, optimized for conversions. Command Center adds multi-page structure (Home + About + Contact + 1 more), a dashboard, CMS, multi-language support, and priority support. E-Commerce HQ is a complete online store with payment processing, inventory management, and Georgian bank integrations.",
  },
  {
    q: "What does 'starting from' mean for E-Commerce HQ?",
    a: "E-Commerce HQ starts at 3,999 ₾ for a 5-page online store with full payment and inventory capabilities. The final price depends on the number of products, custom integrations, and additional modules you choose.",
  },
  {
    q: "What is a Shield plan?",
    a: "Shields are yearly support and maintenance plans. They include bug fixes, security patches, content updates, uptime monitoring, and performance optimization. There are four tiers: Guardian (120 ₾/yr), Sentinel (500 ₾/yr), Fortress (1,500 ₾/yr), and Citadel (3,000 ₾/yr).",
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
    a: "We accept bank transfer (GEL), card payment, and PayPal for international clients. Payment terms are discussed during the consultation on WhatsApp.",
  },
  {
    q: "How long does delivery take?",
    a: "Professional sites take 7-10 business days. Command Center takes 10-15 business days. E-Commerce HQ takes 20+ business days depending on scope. All timelines are confirmed during the planning phase.",
  },
  {
    q: "Do you offer payment plans?",
    a: "We keep pricing simple — one-time payment per project. For larger projects like E-Commerce HQ, we can discuss milestones during the WhatsApp consultation.",
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
        {FAQ.map((item, i) => (
          <div
            key={i}
            className="rounded-xl border border-white/10 bg-white/[0.02] transition"
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full items-center justify-between px-5 py-4 text-left"
            >
              <span className="text-sm font-bold text-white">{item.q}</span>
              <span className="text-lg text-slate-400">{open === i ? "−" : "+"}</span>
            </button>
            {open === i && (
              <div className="px-5 pb-4 text-sm text-slate-300">{item.a}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
