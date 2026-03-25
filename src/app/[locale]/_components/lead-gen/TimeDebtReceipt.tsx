"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LeadCaptureForm } from "./LeadCaptureForm";
import { getMessages, type Locale } from "@/lib/i18n";
import { AuditCitation } from "./AuditCitation";

interface TimeDebtReceiptProps {
  locale: Locale;
}

export function TimeDebtReceipt({ locale }: TimeDebtReceiptProps) {
  const [hoursPerWeek, setHoursPerWeek] = useState(15);
  // Default to 15.6 GEL/hr which is ~2500 GEL net + 20% + 2% = ~3050 GEL monthly burden
  const [hourlyRate, setHourlyRate] = useState(15.6);
  const [isPrinting, setIsPrinting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const t = getMessages(locale);

  const monthlyHours = hoursPerWeek * 4;
  const monthlyDebt = monthlyHours * hourlyRate;

  const handlePrint = () => {
    setIsPrinting(false);
    setTimeout(() => setIsPrinting(true), 100);
  };

  return (
    <div className="clay-card clay-card-hover mx-auto max-w-3xl p-6 shadow-2xl sm:p-10 border-emerald-500/40 shadow-[inset_0_1px_0_0_rgba(16,185,129,0.2),0_0_30px_rgba(16,185,129,0.15)]">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-slate-100 sm:text-3xl">
          {t.calcReceipt.title}
        </h2>
        <p className="mt-2 text-slate-400">
          {t.calcReceipt.subtitle}
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Controls */}
        <div className="space-y-6">
          <div>
            <label className="mb-2 flex justify-between text-sm font-medium text-slate-300">
              <span>{t.calcReceipt.hoursLabel}</span>
              <span className="text-emerald-400">{hoursPerWeek} hrs</span>
            </label>
            <input
              type="range"
              min="1"
              max="40"
              step="1"
              value={hoursPerWeek}
              onChange={(e) => setHoursPerWeek(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-white/10 accent-emerald-500"
            />
          </div>

          <div>
            <label className="mb-2 flex justify-between text-sm font-medium text-slate-300">
              <span>{t.calcReceipt.rateLabel}</span>
              <span className="text-emerald-400">{hourlyRate.toFixed(1)}₾/hr</span>
            </label>
            <input
              type="range"
              min="5"
              max="100"
              step="0.5"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-white/10 accent-emerald-500"
            />
          </div>

          <button
            onClick={handlePrint}
            className="w-full rounded-xl bg-slate-800 px-6 py-3 font-medium text-slate-200 transition hover:bg-slate-700"
          >
            {t.calcReceipt.calculateBtn}
          </button>

          <AuditCitation
            dataPoint="Context switching costs 23 minutes of focus per interruption."
            explanation="Every time you pause deep work to answer a basic 'how much is this?' DM, you pay a massive Time Debt. Research shows it takes the human brain an average of 23 minutes to fully recover focus after a single context switch."
            source="UC Irvine 'The Cost of Interrupted Work' Study"
          />

          {isPrinting && !showForm && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              onClick={() => setShowForm(true)}
              className="mt-4 w-full rounded-xl bg-emerald-500/20 px-6 py-3 font-medium text-emerald-200 transition hover:bg-emerald-500/30"
            >
              {t.calcReceipt.protectBtn}
            </motion.button>
          )}
        </div>

        {/* Receipt Visualization */}
        <div className="relative flex justify-center overflow-hidden rounded-2xl bg-black/60 p-6 border border-white/5 min-h-[300px]">
          <AnimatePresence>
            {isPrinting && (
              <motion.div
                initial={{ y: "-100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="w-full max-w-[250px] bg-white p-6 font-mono text-sm text-black shadow-lg"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 100% 100%, 95% 98%, 90% 100%, 85% 98%, 80% 100%, 75% 98%, 70% 100%, 65% 98%, 60% 100%, 55% 98%, 50% 100%, 45% 98%, 40% 100%, 35% 98%, 30% 100%, 25% 98%, 20% 100%, 15% 98%, 10% 100%, 5% 98%, 0 100%)",
                  paddingBottom: "2rem"
                }}
              >
                <div className="mb-4 border-b-2 border-dashed border-gray-400 pb-4 text-center">
                  <h3 className="text-lg font-bold">{t.calcReceipt.receiptTitle}</h3>
                  <p className="text-xs text-gray-500">{t.calcReceipt.receiptSub}</p>
                </div>

                <div className="mb-4 space-y-2">
                  <div className="flex justify-between">
                    <span>{t.calcReceipt.receiptAdmin}</span>
                    <span>{monthlyHours} hrs</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t.calcReceipt.receiptBurden}</span>
                    <span>{hourlyRate.toFixed(1)}₾/hr</span>
                  </div>
                </div>

                <div className="border-t-2 border-dashed border-gray-400 pt-4">
                  <div className="flex justify-between text-base font-bold text-red-600">
                    <span>{t.calcReceipt.receiptTotal}</span>
                    <span>{monthlyDebt.toLocaleString(undefined, { maximumFractionDigits: 0 })}₾</span>
                  </div>
                </div>

                <div className="mt-6 text-center text-xs text-gray-500">
                  <p>{t.calcReceipt.receiptFooter}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Lead Capture Form */}
      {showForm && (
        <LeadCaptureForm
          locale={locale}
          toolName="Time Debt Receipt"
          painPoint={`Reclaiming ${monthlyDebt} GEL/mo worth of time`}
          ctaText={t.calcReceipt.ctaText}
        />
      )}
    </div>
  );
}
