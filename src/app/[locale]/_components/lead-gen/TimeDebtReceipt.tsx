"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LeadCaptureForm } from "./LeadCaptureForm";
import { getMessages, type Locale } from "@/lib/i18n";
import { AuditCitation } from "./AuditCitation";

interface TimeDebtReceiptProps {
  locale: Locale;
  isDashboard?: boolean;
}

export function TimeDebtReceipt({ locale, isDashboard }: TimeDebtReceiptProps) {
  const [hoursPerWeek, setHoursPerWeek] = useState(15);
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

  const content = (
    <div className={`grid gap-8 md:grid-cols-2 ${isDashboard ? "flex-grow flex flex-col-reverse justify-end" : ""}`}>
      {/* Controls */}
      <div className={`space-y-6 ${isDashboard ? "px-6 pb-20 pt-4" : ""}`}>
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
            style={{ touchAction: 'none' }}
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
            style={{ touchAction: 'none' }}
          />
        </div>

        <button
          onClick={handlePrint}
          className="w-full rounded-xl bg-slate-800 px-6 py-3 font-medium text-slate-200 transition hover:bg-slate-700 active:scale-95"
        >
          {t.calcReceipt.calculateBtn}
        </button>

        {!isDashboard && (
           <AuditCitation
             dataPoint="Context switching costs 23 minutes of focus per interruption."
             explanation="Every time you pause deep work to answer a basic 'how much is this?' DM, you pay a massive Time Debt."
             source="UC Irvine 'The Cost of Interrupted Work' Study"
           />
        )}

        {isPrinting && !showForm && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: isDashboard ? 0.5 : 2 }}
            onClick={() => setShowForm(true)}
            className="mt-4 w-full rounded-xl bg-emerald-500/20 px-6 py-3 font-medium text-emerald-200 transition hover:bg-emerald-500/30"
          >
            {t.calcReceipt.protectBtn}
          </motion.button>
        )}
      </div>

      {/* Receipt Visualization */}
      <div className={`relative flex justify-center overflow-hidden rounded-2xl bg-black/60 border border-white/5 ${isDashboard ? "min-h-[40%] m-4" : "p-6 min-h-[300px]"}`}>
        {!isPrinting && (
           <div className="flex items-center justify-center text-[10px] font-black uppercase tracking-widest text-slate-700">
              Awaiting Calculation...
           </div>
        )}
        <AnimatePresence>
          {isPrinting && (
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className={`w-full max-w-[220px] bg-white p-5 font-mono text-[11px] text-black shadow-lg ${isDashboard ? "h-fit" : ""}`}
              style={{
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 95% 98%, 90% 100%, 85% 98%, 80% 100%, 75% 98%, 70% 100%, 65% 98%, 60% 100%, 55% 98%, 50% 100%, 45% 98%, 40% 100%, 35% 98%, 30% 100%, 25% 98%, 20% 100%, 15% 98%, 10% 100%, 5% 98%, 0 100%)",
              }}
            >
              <div className="mb-4 border-b border-dashed border-gray-400 pb-3 text-center">
                <h3 className="text-sm font-bold">{t.calcReceipt.receiptTitle}</h3>
                <p className="text-[10px] text-gray-500">{t.calcReceipt.receiptSub}</p>
              </div>

              <div className="mb-4 space-y-1.5">
                <div className="flex justify-between">
                  <span>{t.calcReceipt.receiptAdmin}</span>
                  <span>{monthlyHours} hrs</span>
                </div>
                <div className="flex justify-between">
                  <span>{t.calcReceipt.receiptBurden}</span>
                  <span>{hourlyRate.toFixed(1)}₾/hr</span>
                </div>
              </div>

              <div className="border-t border-dashed border-gray-400 pt-3">
                <div className="flex justify-between text-sm font-bold text-red-600">
                  <span>TOTAL:</span>
                  <span>{monthlyDebt.toLocaleString(undefined, { maximumFractionDigits: 0 })}₾</span>
                </div>
              </div>

              <div className="mt-4 text-center text-[9px] leading-tight text-gray-500">
                <p>{t.calcReceipt.receiptFooter}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );

  if (isDashboard) {
    return (
      <>
        {content}
        {showForm && (
           <div className="fixed inset-0 z-[110] bg-zinc-950 p-6 overflow-y-auto">
              <button 
                onClick={() => setShowForm(false)}
                className="mb-8 h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400"
              >
                ✕
              </button>
              <LeadCaptureForm
                locale={locale}
                toolName="Time Debt Receipt"
                painPoint={`Reclaiming ${monthlyDebt} GEL/mo worth of time`}
                ctaText={t.calcReceipt.ctaText}
              />
           </div>
        )}
      </>
    );
  }

  return (
    <div className="clay-card clay-card-hover mx-auto max-w-3xl border-emerald-500/40 p-5 md:p-10 shadow-2xl shadow-[inset_0_1px_0_0_rgba(16,185,129,0.2),0_0_30px_rgba(16,185,129,0.15)] md:p-10">
      <div className="mb-6 md:mb-8 text-center">
        <h2 className="text-2xl font-bold text-slate-100 sm:text-3xl">
          {t.calcReceipt.title}
        </h2>
        <p className="mt-2 text-slate-400">
          {t.calcReceipt.subtitle}
        </p>
      </div>
      {content}
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
