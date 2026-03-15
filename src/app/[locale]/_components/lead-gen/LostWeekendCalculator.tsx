"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LeadCaptureForm } from "./LeadCaptureForm";
import { getMessages, type Locale } from "@/lib/i18n";
import { AuditCitation } from "./AuditCitation";

interface LostWeekendCalculatorProps {
  locale: Locale;
}

export function LostWeekendCalculator({ locale }: LostWeekendCalculatorProps) {
  const [dailySales, setDailySales] = useState(500);
  const [hoursOnline, setHoursOnline] = useState(10);
  const [showForm, setShowForm] = useState(false);
  const [tickingLoss, setTickingLoss] = useState(0);
  const t = getMessages(locale);

  // Calculate lost revenue based on international timezones and delay penalty
  // Assuming 80% loss on leads that wait >12 hours (the 17-hour delay metric)
  const offlineHours = 24 - hoursOnline;
  // Let's assume you lose 60% of daily cross-border sales because of timezone delays
  const lostRevenuePerDay = (dailySales * 0.6).toFixed(0);
  const lostRevenuePerMonth = Number(lostRevenuePerDay) * 30;

  // Ticking effect for visual impact
  useEffect(() => {
    const interval = setInterval(() => {
      setTickingLoss((prev) => {
        const increment = Number(lostRevenuePerDay) / (24 * 60 * 60); // per second
        const nextValue = prev + increment * 100; // speed up for effect
        if (nextValue >= Number(lostRevenuePerDay)) {
          clearInterval(interval);
          return Number(lostRevenuePerDay);
        }
        return nextValue;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [lostRevenuePerDay]);

  // Reset ticking when inputs change
  useEffect(() => {
    setTickingLoss(0);
  }, [dailySales, hoursOnline]);

  return (
    <div className="clay-card clay-card-hover mx-auto max-w-3xl p-6 shadow-2xl sm:p-10 border-emerald-500/40 shadow-[inset_0_1px_0_0_rgba(16,185,129,0.2),0_0_30px_rgba(16,185,129,0.15)]">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-slate-100 sm:text-3xl">
          {t.midnightCalc.title}
        </h2>
        <p className="mt-2 text-slate-400">
          {t.midnightCalc.subtitle}
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Controls */}
        <div className="space-y-6">
          <div>
            <label className="mb-2 flex justify-between text-sm font-medium text-slate-300">
              <span>{t.midnightCalc.dailySalesLabel}</span>
              <span className="text-emerald-400">{dailySales}</span>
            </label>
            <input
              type="range"
              min="50"
              max="5000"
              step="50"
              value={dailySales}
              onChange={(e) => setDailySales(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-white/10 accent-emerald-500"
            />
          </div>

          <div>
            <label className="mb-2 flex justify-between text-sm font-medium text-slate-300">
              <span>{t.midnightCalc.hoursOnlineLabel}</span>
              <span className="text-emerald-400">{hoursOnline} hrs</span>
            </label>
            <input
              type="range"
              min="4"
              max="18"
              step="1"
              value={hoursOnline}
              onChange={(e) => setHoursOnline(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-white/10 accent-emerald-500"
            />
          </div>

          <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4">
            <h3 className="text-lg font-semibold text-amber-200">
              {t.midnightCalc.frictionTitle}
            </h3>
            <p className="mt-2 text-sm text-slate-300">
              {t.midnightCalc.frictionBody}{" "}
              <strong className="text-amber-400">
                {lostRevenuePerMonth.toLocaleString()}
              </strong>{" "}
              {t.midnightCalc.frictionSuffix}
            </p>

            <AuditCitation
              dataPoint="82% of consumers demand an immediate response."
              explanation="Modern commerce operates 24/7. When your business sleeps, your competitors don't. Studies show 82% of buyers expect responses in under 10 minutes for sales queries, else they abandon the purchase."
              source="HubSpot Consumer Survey / Sprout Social Index"
            />
          </div>

          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="w-full rounded-xl bg-emerald-500/20 px-6 py-3 font-medium text-emerald-200 transition hover:bg-emerald-500/30"
            >
              {t.midnightCalc.autoBtn}
            </button>
          )}
        </div>

        {/* Visualization */}
        <div className="flex flex-col items-center justify-center rounded-2xl bg-black/60 p-6 border border-white/5">
          <div className="relative flex h-48 w-48 items-center justify-center rounded-full border-4 border-slate-800">
            {/* Timeline representation */}
            <svg className="absolute inset-0 h-full w-full -rotate-90">
              <circle
                cx="96"
                cy="96"
                r="90"
                fill="none"
                stroke="#f59e0b" // amber-500
                strokeWidth="12"
                strokeDasharray={`${(offlineHours / 24) * 565} 565`}
                className="transition-all duration-500 ease-in-out"
              />
              <circle
                cx="96"
                cy="96"
                r="90"
                fill="none"
                stroke="#10b981" // emerald-500
                strokeWidth="12"
                strokeDasharray={`${(hoursOnline / 24) * 565} 565`}
                strokeDashoffset={`${-(offlineHours / 24) * 565}`}
                className="transition-all duration-500 ease-in-out"
              />
            </svg>
            <div className="text-center z-10">
              <span className="block text-xs uppercase tracking-wider text-slate-400">{t.midnightCalc.lostToday}</span>
              <span className="block text-2xl font-bold text-amber-400 font-mono">
                {Math.floor(tickingLoss).toLocaleString()}₾
              </span>
              {tickingLoss >= Number(lostRevenuePerDay) && (
                <span className="block text-[10px] uppercase tracking-wider text-amber-500/80 mt-1">per day</span>
              )}
            </div>
          </div>
          <div className="mt-6 flex gap-4 text-xs font-medium">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
              <span className="text-slate-300">{t.midnightCalc.online}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-amber-500"></div>
              <span className="text-slate-300">{t.midnightCalc.offline}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lead Capture Form */}
      {showForm && (
        <LeadCaptureForm
          locale={locale}
          toolName="Global Opportunity Calculator"
          painPoint={`Capturing ${lostRevenuePerMonth} GEL/mo during offline hours`}
          ctaText={t.midnightCalc.ctaText}
        />
      )}
    </div>
  );
}
