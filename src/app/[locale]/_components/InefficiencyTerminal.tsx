"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { Locale } from "@/lib/i18n";
import { calculateAnnualLeak } from "./useInefficiencyCalculator";

type Props = {
  locale: Locale;
};

export function InefficiencyTerminal({ locale }: Props) {
  const [audience, setAudience] = useState<number>(10000);
  const [aov, setAov] = useState<number>(100);
  const [monthlyDMs, setMonthlyDMs] = useState<number>(50);
  const [leak, setLeak] = useState<number>(0);

  useEffect(() => {
    const annualLeak = calculateAnnualLeak({
      audience,
      averageOrderValue: aov,
      monthlyDMs,
    });
    setLeak(annualLeak);
  }, [audience, aov, monthlyDMs]);

  const severeLeak = leak > 50000;

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.75)] backdrop-blur-xl">
        <h2 className="text-2xl font-bold uppercase tracking-tight text-white sm:text-3xl">
          Sovereign Diagnostic Terminal
        </h2>
        <div className="mt-8 space-y-6">
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
              Audience Size
            </label>
            <input
              type="range"
              min={1000}
              max={500000}
              step={1000}
              value={audience}
              onChange={(e) => setAudience(Number(e.target.value) || 0)}
              className="mt-2 w-full accent-emerald-500"
            />
            <p className="mt-1 font-mono text-sm text-emerald-400">
              {audience.toLocaleString("en-US")}
            </p>
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
              Avg. Order Value (₾)
            </label>
            <input
              type="number"
              value={aov}
              min={0}
              onChange={(e) => setAov(Number(e.target.value) || 0)}
              className="mt-2 w-full border-b border-white/20 bg-transparent p-2 font-mono text-sm text-white outline-none focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
              Monthly DMs
            </label>
            <input
              type="number"
              value={monthlyDMs}
              min={0}
              onChange={(e) => setMonthlyDMs(Number(e.target.value) || 0)}
              className="mt-2 w-full border-b border-white/20 bg-transparent p-2 font-mono text-sm text-white outline-none focus:border-emerald-500"
            />
          </div>
          <div className="mt-8 border-t border-white/10 pt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
              Annual Revenue Leakage
            </p>
            <motion.div
              animate={
                severeLeak
                  ? { x: [0, -2, 2, -2, 2, 0] }
                  : { x: 0 }
              }
              transition={
                severeLeak
                  ? { repeat: Infinity, duration: 0.22 }
                  : { duration: 0.2 }
              }
              className="mt-3 font-mono text-4xl font-black text-red-500 sm:text-5xl"
            >
              {Math.round(leak).toLocaleString("en-US")} GEL
            </motion.div>
            <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-slate-500">
              Calculated from 20% algorithmic tax + 15% manual DM friction (annualized).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

