"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useMotionValue, animate, useMotionValueEvent } from "framer-motion";
import { getMessages } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

const MIN_REVENUE = 5;
const MAX_REVENUE = 200;
const LOSS_PCT = 0.12;
const RECOVERY_PCT = 0.85;

function formatGEL(n: number) {
  return new Intl.NumberFormat("ka-GE", {
    style: "decimal",
    maximumFractionDigits: 0,
  }).format(n);
}

export function ROICalculator({ locale }: { locale: Locale }) {
  const t = getMessages(locale);
  const [revenueK, setRevenueK] = useState(50);
  const lossMotion = useMotionValue(0);
  const recoveredMotion = useMotionValue(0);
  const [displayLoss, setDisplayLoss] = useState(0);
  const [displayRecovered, setDisplayRecovered] = useState(0);

  useMotionValueEvent(lossMotion, "change", (v) => setDisplayLoss(v));
  useMotionValueEvent(recoveredMotion, "change", (v) => setDisplayRecovered(v));

  const monthlyGEL = revenueK * 1000;
  const annualLoss = monthlyGEL * 12 * LOSS_PCT;
  const recovered = annualLoss * RECOVERY_PCT;

  const updateCounters = useCallback(() => {
    animate(lossMotion, annualLoss, { duration: 0.6, ease: [0.22, 1, 0.36, 1] });
    animate(recoveredMotion, recovered, { duration: 0.6, ease: [0.22, 1, 0.36, 1] });
  }, [annualLoss, recovered, lossMotion, recoveredMotion]);

  useEffect(() => {
    updateCounters();
  }, [revenueK, updateCounters]);

  const normalized = (revenueK - MIN_REVENUE) / (MAX_REVENUE - MIN_REVENUE);
  const auroraColor = interpolateRedToEmerald(normalized);

  return (
    <section className="relative mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <motion.div
        className="absolute inset-0 -z-10 rounded-3xl"
        animate={{
          background: `linear-gradient(135deg, rgba(25,28,32,0.98) 0%, ${auroraColor} 50%, rgba(25,28,32,0.98) 100%)`,
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />
      <div className="relative z-10 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] backdrop-blur-xl">
        <h2 className="text-center text-2xl font-semibold text-slate-100 sm:text-3xl">
          {t.roi.title}
        </h2>
        <p className="mt-3 text-center text-sm text-slate-400">
          {t.roi.subheading}
        </p>

        <div className="mt-10">
          <label className="block text-sm font-medium text-slate-300">
            {t.roi.sliderLabel}
          </label>
          <div className="relative mt-3 flex items-center gap-4">
            <CustomSlider
              value={revenueK}
              min={MIN_REVENUE}
              max={MAX_REVENUE}
              onChange={setRevenueK}
              ariaLabel={t.roi.sliderLabel}
            />
            <span className="min-w-[5rem] tabular-nums text-slate-200">
              {revenueK}k GEL
            </span>
          </div>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
              {t.roi.potentialLoss}
            </p>
            <p className="mt-2 text-2xl font-bold tabular-nums text-red-300 sm:text-3xl">
              {formatGEL(displayLoss)} GEL
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
              {t.roi.kvaliRecovered}
            </p>
            <p className="mt-2 text-2xl font-bold tabular-nums text-emerald-300 sm:text-3xl">
              {formatGEL(displayRecovered)} GEL
            </p>
          </div>
        </div>

        <p className="mt-10 text-center text-sm font-medium tracking-wide text-slate-300">
          {t.roi.valueTagline}
        </p>
      </div>
    </section>
  );
}

function interpolateRedToEmerald(t: number) {
  const r = Math.round(80 - t * 64);
  const g = Math.round(40 + t * 145);
  const b = Math.round(45 + t * 84);
  return `rgba(${r},${g},${b},${0.4 + t * 0.35})`;
}

function CustomSlider({
  value,
  min,
  max,
  onChange,
  ariaLabel,
}: {
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
  ariaLabel: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div ref={trackRef} className="relative h-3 flex-1">
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={ariaLabel}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
      />
      <div className="pointer-events-none absolute inset-0 rounded-full bg-slate-800">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-emerald-500/40 transition-[width] duration-150"
          style={{ width: `${pct}%` }}
        />
        <motion.div
          className="absolute top-1/2 h-8 w-8 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.4)] backdrop-blur-md will-change-transform"
          style={{ left: `calc(${pct}% - 16px)` }}
        />
      </div>
    </div>
  );
}
