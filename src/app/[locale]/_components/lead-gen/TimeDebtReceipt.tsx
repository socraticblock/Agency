"use client";

import { useState, useMemo, useEffect, useRef, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LeadCaptureForm } from "./LeadCaptureForm";
import { getMessages, type Locale } from "@/lib/i18n";
import { AuditCitation } from "./AuditCitation";
import { Scan, X } from "lucide-react";

interface TimeDebtReceiptProps {
  locale: Locale;
  isDashboard?: boolean;
}

export const TimeDebtReceipt = memo(function TimeDebtReceipt({ locale, isDashboard }: TimeDebtReceiptProps) {
  const [hoursPerWeek, setHoursPerWeek] = useState(5);
  const [hourlyRate, setHourlyRate] = useState(15.6);
  const [isPrinting, setIsPrinting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const t = getMessages(locale);
  const receiptRef = useRef<HTMLDivElement>(null);

  const monthlyHours = hoursPerWeek * 4;
  const monthlyDebt = monthlyHours * hourlyRate;

  const handlePrint = () => {
    setIsPrinting(false);
    setTimeout(() => setIsPrinting(true), 100);
  };

  useEffect(() => {
    if (isPrinting && receiptRef.current) {
      const timer = setTimeout(() => {
        receiptRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isPrinting]);

  const content = (
    <div className={`flex flex-col gap-6 ${isDashboard ? "px-0 pb-12 pt-0" : "grid md:grid-cols-2 md:gap-8"}`}>
      {/* Controls */}
      <motion.div
        layout
        initial={false}
        animate={{
          opacity: isPrinting && isDashboard ? 0.4 : 1,
          height: isPrinting && isDashboard ? "auto" : "auto",
          scale: isPrinting && isDashboard ? 0.98 : 1
        }}
        className={`space-y-6 transition-all duration-700 ${isDashboard ? "px-4 pt-4" : ""}`}
      >
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


      </motion.div>

      {/* Receipt Visualization */}
      <motion.div
        layout
        ref={receiptRef}
        className={`relative flex justify-center overflow-hidden rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/5 ${isDashboard ? "p-8 m-4" : "p-6 min-h-[300px]"}`}
      >
        {isDashboard && (
          <div className="absolute bottom-4 right-4 z-10">
            {/* Science moved to global LeadGenHub Stage HUD */}
          </div>
        )}
        {!isPrinting && (
           <div className="flex items-center justify-center text-[10px] font-black uppercase tracking-widest text-slate-700">
              Awaiting Calculation...
           </div>
        )}
        <AnimatePresence mode="wait">
          {isPrinting && (
            <motion.div
              key="logic-receipt-actual"
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
      </motion.div>
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
                toolName="Time Debt Receipt"
                painPoint={`Reclaiming ${monthlyDebt} GEL/mo worth of time`}
                ctaText={t.calcReceipt.ctaText}
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
});
