"use client";

import { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LeadCaptureForm } from "./LeadCaptureForm";
import { getMessages, type Locale } from "@/lib/i18n";
import { AuditCitation } from "./AuditCitation";
import { Scan, X } from "lucide-react";

interface LostWeekendCalculatorProps {
  locale: Locale;
  isDashboard?: boolean;
}

export const LostWeekendCalculator = memo(function LostWeekendCalculator({ locale, isDashboard }: LostWeekendCalculatorProps) {
  const [dailySales, setDailySales] = useState(500);
  const [hoursOnline, setHoursOnline] = useState(10);
  const [showForm, setShowForm] = useState(false);
  const [tickingLoss, setTickingLoss] = useState(0);
  const t = getMessages(locale);

  // Calculate lost revenue based on international timezones and delay penalty
  const offlineHours = 24 - hoursOnline;
  const lostRevenuePerDay = (dailySales * 0.6).toFixed(0);
  const lostRevenuePerMonth = Number(lostRevenuePerDay) * 30;

  useEffect(() => {
    const interval = setInterval(() => {
      setTickingLoss((prev) => {
        const increment = Number(lostRevenuePerDay) / (24 * 60 * 60);
        const nextValue = prev + increment * 100;
        if (nextValue >= Number(lostRevenuePerDay)) {
          clearInterval(interval);
          return Number(lostRevenuePerDay);
        }
        return nextValue;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [lostRevenuePerDay]);

  useEffect(() => {
    setTickingLoss(0);
  }, [dailySales, hoursOnline]);

  const content = (
    <div className={`flex flex-col gap-6 ${isDashboard ? "px-0 pb-12 pt-0" : "grid md:grid-cols-2 md:gap-8"}`}>
      {/* Controls */}
      <div className={`space-y-6 ${isDashboard ? "px-4 pt-4" : ""}`}>
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
            style={{ touchAction: 'none' }}
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
            style={{ touchAction: 'none' }}
          />
        </div>

        <div className="relative rounded-xl border border-amber-500/30 bg-amber-500/10 p-4">
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


        </div>

        {!isDashboard && (
          <AuditCitation
            dataPoint="82% of consumers demand an immediate response."
            explanation="Modern commerce operates 24/7. When your business sleeps, your competitors don't."
            source="HubSpot Consumer Survey / Sprout Social Index"
          />
        )}

      </div>

      {/* Visualization */}
      <div className={`flex flex-col items-center justify-center rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/5 relative ${isDashboard ? "p-8 m-4" : "p-6"}`}>
        {isDashboard && (
          <div className="absolute bottom-4 right-4 z-10">
            {/* Science moved to global LeadGenHub Stage HUD */}
          </div>
        )}
        <div className="relative flex h-40 w-40 items-center justify-center rounded-full border-4 border-slate-800 sm:h-48 sm:w-48">
          <svg className="absolute inset-0 h-full w-full -rotate-90">
            <circle
              cx={isDashboard ? "80" : "96"}
              cy={isDashboard ? "80" : "96"}
              r={isDashboard ? "74" : "90"}
              fill="none"
              stroke="#f59e0b"
              strokeWidth="12"
              strokeDasharray={`${(offlineHours / 24) * (isDashboard ? 465 : 565)} ${isDashboard ? 465 : 565}`}
              className="transition-all duration-500 ease-in-out"
            />
            <circle
              cx={isDashboard ? "80" : "96"}
              cy={isDashboard ? "80" : "96"}
              r={isDashboard ? "74" : "90"}
              fill="none"
              stroke="#10b981"
              strokeWidth="12"
              strokeDasharray={`${(hoursOnline / 24) * (isDashboard ? 465 : 565)} ${isDashboard ? 465 : 565}`}
              strokeDashoffset={`${-(offlineHours / 24) * (isDashboard ? 465 : 565)}`}
              className="transition-all duration-500 ease-in-out"
            />
          </svg>
          <div className="text-center z-10">
            <span className="block text-[10px] uppercase tracking-wider text-slate-400">{t.midnightCalc.lostToday}</span>
            <motion.span
              className="block text-xl font-bold text-amber-400 font-mono sm:text-2xl"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {Math.floor(tickingLoss).toLocaleString()}₾
            </motion.span>
          </div>
        </div>
        <div className="mt-4 flex gap-4 text-[10px] font-medium">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-500"></div>
            <span className="text-slate-300">{t.midnightCalc.online}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-amber-500"></div>
            <span className="text-slate-300">{t.midnightCalc.offline}</span>
          </div>
        </div>
      </div>
    </div>
  );

  if (isDashboard) {
    return (
      <>
        {content}
        {showForm && (
           <div 
             onClick={() => setShowForm(false)}
             className="fixed inset-0 z-[110] bg-zinc-950 p-6 overflow-y-auto cursor-pointer"
           >
              <div 
                onClick={(e) => e.stopPropagation()}
                className="max-w-4xl mx-auto cursor-default"
              >
              <button 
                onClick={() => setShowForm(false)}
                className="mb-8 h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400"
              >
                ✕
              </button>
              <LeadCaptureForm
                locale={locale}
                toolName="Global Opportunity Calculator"
                painPoint={`Capturing ${lostRevenuePerMonth} GEL/mo during offline hours`}
                ctaText={t.midnightCalc.ctaText}
              />
              </div>
           </div>
        )}
      </>
    );
  }

  return (
    <div className="clay-card clay-card-hover mx-auto max-w-3xl border-emerald-500/40 p-5 md:p-10 shadow-2xl shadow-[inset_0_1px_0_0_rgba(16,185,129,0.2),0_0_30px_rgba(16,185,129,0.15)] md:p-10">
      <div className="mb-6 md:mb-8 text-center">
        <h2 className="text-2xl font-bold text-slate-100 sm:text-3xl">
          {t.midnightCalc.title}
        </h2>
        <p className="mt-2 text-slate-400">
          {t.midnightCalc.subtitle}
        </p>
      </div>
      {content}
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
});
