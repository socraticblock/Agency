"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Sparkles } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { trackPricingEvent } from "@/lib/pricingAnalytics";
import { tierPrimaryHref } from "./pricingTierData";
import { FOUNDATIONS, type Foundation } from "@/constants/pricing";

const OPTIONS: { id: string; label: string; hint: string }[] = [
  {
    id: "landing",
    label: "One focused landing page for leads",
    hint: "Fastest path to credibility",
  },
  {
    id: "cms",
    label: "Custom site built to convert",
    hint: "Most teams start here",
  },
  {
    id: "saas",
    label: "Multi-page HQ + content + operations",
    hint: "When you outgrow a single page",
  },
  {
    id: "ecomm",
    label: "E-commerce with Georgian payments & tax",
    hint: "TBC / BOG / RS.ge",
  },
];

function getFoundation(id: string): Foundation | undefined {
  return FOUNDATIONS.find((f) => f.id === id);
}

interface TierPickerQuizProps {
  locale: Locale;
}

export function TierPickerQuiz({ locale }: TierPickerQuizProps) {
  const [picked, setPicked] = useState<string | null>(null);
  const selected = picked ? getFoundation(picked) : null;

  return (
    <section
      aria-labelledby="tier-quiz-heading"
      className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] px-6 py-8 sm:px-10"
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
        <Sparkles className="h-6 w-6 shrink-0 text-emerald-400" aria-hidden />
        <div>
          <h2 id="tier-quiz-heading" className="text-lg font-black text-white sm:text-xl">
            Not sure which package fits?
          </h2>
          <p className="text-sm font-medium text-slate-400">
            Pick the closest match — we’ll send you to the right next step.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {OPTIONS.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => {
              setPicked(opt.id);
              trackPricingEvent("pricing_quiz_pick", { tierId: opt.id });
            }}
            className={`rounded-xl border px-4 py-4 text-left transition ${
              picked === opt.id
                ? "border-emerald-500/60 bg-emerald-500/10"
                : "border-white/10 bg-white/[0.02] hover:border-white/20"
            }`}
          >
            <p className="font-black text-white">{opt.label}</p>
            <p className="mt-1 text-xs font-medium text-slate-500">{opt.hint}</p>
          </button>
        ))}
      </div>

      {selected && (
        <div className="mt-6 flex flex-col gap-3 rounded-xl border border-white/10 bg-black/20 p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-300">
            <span className="font-bold text-white">Suggested:</span> {selected.name} —{" "}
            {selected.tagline}
          </p>
          <Link
            href={tierPrimaryHref(locale, selected)}
            onClick={() => trackPricingEvent("pricing_quiz_cta", { tierId: selected.id })}
            className="inline-flex items-center justify-center gap-1 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-black uppercase tracking-wide text-slate-950 hover:bg-emerald-400"
          >
            Continue <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </section>
  );
}
