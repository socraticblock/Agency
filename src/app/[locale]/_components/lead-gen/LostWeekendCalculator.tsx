"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LeadCaptureForm } from "./LeadCaptureForm";

interface LostWeekendCalculatorProps {
  locale: string;
}

export function LostWeekendCalculator({ locale }: LostWeekendCalculatorProps) {
  const [dailySales, setDailySales] = useState(500);
  const [hoursOnline, setHoursOnline] = useState(10);
  const [showForm, setShowForm] = useState(false);
  const [tickingLoss, setTickingLoss] = useState(0);

  // Calculate lost revenue based on offline hours
  // Assuming 40% of sales happen during offline hours (nighttime/weekends)
  const offlineHours = 24 - hoursOnline;
  const lostRevenuePerDay = (dailySales * 0.4 * (offlineHours / 14)).toFixed(0);
  const lostRevenuePerMonth = Number(lostRevenuePerDay) * 30;

  // Ticking effect for visual impact
  useEffect(() => {
    const interval = setInterval(() => {
      setTickingLoss((prev) => {
        const increment = Number(lostRevenuePerDay) / (24 * 60 * 60); // per second
        return prev + increment * 100; // speed up for effect
      });
    }, 50);
    return () => clearInterval(interval);
  }, [lostRevenuePerDay]);

  // Reset ticking when inputs change
  useEffect(() => {
    setTickingLoss(Number(lostRevenuePerMonth) / 30);
  }, [dailySales, hoursOnline, lostRevenuePerMonth]);

  return (
    <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-black/40 p-6 shadow-2xl backdrop-blur-xl sm:p-10">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-slate-100 sm:text-3xl">
          The "Lost Weekend" Calculator
        </h2>
        <p className="mt-2 text-slate-400">
          How much money are you losing while you sleep?
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Controls */}
        <div className="space-y-6">
          <div>
            <label className="mb-2 flex justify-between text-sm font-medium text-slate-300">
              <span>Average Daily Sales via DMs (GEL)</span>
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
              <span>Hours Awake/Online per Day</span>
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
              The Cost of Sleep
            </h3>
            <p className="mt-2 text-sm text-slate-300">
              Your customers are shopping at 11 PM. Your business is closed. You are losing an estimated{" "}
              <strong className="text-amber-400">
                {lostRevenuePerMonth.toLocaleString()} GEL
              </strong>{" "}
              every month.
            </p>
          </div>

          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="w-full rounded-xl bg-emerald-500/20 px-6 py-3 font-medium text-emerald-200 transition hover:bg-emerald-500/30"
            >
              Automate Your Sales 24/7
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
              <span className="block text-xs uppercase tracking-wider text-slate-400">Lost Today</span>
              <span className="block text-2xl font-bold text-amber-400 font-mono">
                {Math.floor(tickingLoss).toLocaleString()}₾
              </span>
            </div>
          </div>
          <div className="mt-6 flex gap-4 text-xs font-medium">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
              <span className="text-slate-300">Online</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-amber-500"></div>
              <span className="text-slate-300">Offline (Losing Money)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lead Capture Form */}
      {showForm && (
        <LeadCaptureForm
          locale={locale}
          toolName="Lost Weekend Calculator"
          painPoint={`Losing ${lostRevenuePerMonth} GEL/mo due to offline hours`}
          ctaText="Deploy a 24/7 automated sales assistant."
        />
      )}
    </div>
  );
}
