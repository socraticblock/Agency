"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LeadCaptureForm } from "./LeadCaptureForm";

interface TimeDebtReceiptProps {
  locale: string;
}

export function TimeDebtReceipt({ locale }: TimeDebtReceiptProps) {
  const [hoursPerWeek, setHoursPerWeek] = useState(15);
  const [hourlyRate, setHourlyRate] = useState(50);
  const [isPrinting, setIsPrinting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const monthlyHours = hoursPerWeek * 4;
  const monthlyDebt = monthlyHours * hourlyRate;

  const handlePrint = () => {
    setIsPrinting(false);
    setTimeout(() => setIsPrinting(true), 100);
  };

  return (
    <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-black/40 p-6 shadow-2xl backdrop-blur-xl sm:p-10">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-slate-100 sm:text-3xl">
          The "Hourly Wage" DM Eliminator
        </h2>
        <p className="mt-2 text-slate-400">
          You didn't start a business to be a full-time messaging assistant.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Controls */}
        <div className="space-y-6">
          <div>
            <label className="mb-2 flex justify-between text-sm font-medium text-slate-300">
              <span>Hours/week answering DMs</span>
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
              <span>Your Hourly CEO Rate (GEL)</span>
              <span className="text-emerald-400">{hourlyRate}₾/hr</span>
            </label>
            <input
              type="range"
              min="10"
              max="500"
              step="10"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-white/10 accent-emerald-500"
            />
          </div>

          <button
            onClick={handlePrint}
            className="w-full rounded-xl bg-slate-800 px-6 py-3 font-medium text-slate-200 transition hover:bg-slate-700"
          >
            Calculate Time Debt
          </button>

          {isPrinting && !showForm && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              onClick={() => setShowForm(true)}
              className="mt-4 w-full rounded-xl bg-emerald-500/20 px-6 py-3 font-medium text-emerald-200 transition hover:bg-emerald-500/30"
            >
              Automate Your DMs. Reclaim {hoursPerWeek} hours/week.
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
                  <h3 className="text-lg font-bold">TIME DEBT RECEIPT</h3>
                  <p className="text-xs text-gray-500">Monthly Statement</p>
                </div>

                <div className="mb-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Admin Tasks:</span>
                    <span>{monthlyHours} hrs</span>
                  </div>
                  <div className="flex justify-between">
                    <span>CEO Rate:</span>
                    <span>{hourlyRate}₾/hr</span>
                  </div>
                </div>

                <div className="border-t-2 border-dashed border-gray-400 pt-4">
                  <div className="flex justify-between text-base font-bold text-red-600">
                    <span>TOTAL LOST:</span>
                    <span>{monthlyDebt.toLocaleString()}₾</span>
                  </div>
                </div>

                <div className="mt-6 text-center text-xs text-gray-500">
                  <p>Stop acting as a customer service bot.</p>
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
          painPoint={`Losing ${monthlyDebt} GEL/mo on manual DMs`}
          ctaText="Automate your DMs. Reclaim your time."
        />
      )}
    </div>
  );
}
