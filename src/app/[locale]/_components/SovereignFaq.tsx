"use client";

import type { Locale } from "@/lib/i18n";

const FAQ_ITEMS = [
  {
    q: "Why not Shopify?",
    a: "Shopify is a mall. You rent space and attention from the platform. Kvali is a weapon: a sovereign environment tuned for speed, intent capture, and owned revenue.",
  },
  {
    q: "Is the AI real?",
    a: "Yes. We deploy autonomous agents trained on your specific offers, objections, and workflows so they can qualify, answer, and book without you watching DMs.",
  },
  {
    q: "What does the monthly fee cover?",
    a: "The fee covers managed infrastructure, edge security, uptime, and continuous AI refinement so your environment stays fast, safe, and smarter than last month.",
  },
];

export function SovereignFaq({ locale }: { locale: Locale }) {
  return (
    <section className="mx-auto max-w-3xl px-4 pb-20 pt-8 sm:px-6">
      <div className="mb-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400">
          Hard Truths
        </p>
        <p className="mt-2 text-lg font-semibold text-white">
          Questions your current stack can&apos;t answer.
        </p>
      </div>
      <div className="space-y-4 text-left">
        {FAQ_ITEMS.map((item) => (
          <div
            key={item.q}
            className="rounded-2xl border border-white/10 bg-black/40 p-5"
          >
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-200">
              {item.q}
            </h3>
            <p className="mt-2 text-sm text-slate-300">{item.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

