"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LeadCaptureForm } from "./LeadCaptureForm";
import { AuditCitation } from "./AuditCitation";
import type { Locale } from "@/lib/i18n";

interface FrictionRaceSimulatorProps {
  locale: Locale;
}

export function FrictionRaceSimulator({ locale }: FrictionRaceSimulatorProps) {
  const [isRacing, setIsRacing] = useState(false);
  const [raceStep, setRaceStep] = useState(0);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (isRacing && raceStep < 5) {
      const timer = setTimeout(() => {
        setRaceStep((prev) => prev + 1);
      }, 1500); // 1.5 seconds per step for the slow route
      return () => clearTimeout(timer);
    } else if (raceStep === 5) {
      setIsRacing(false);
    }
  }, [isRacing, raceStep]);

  const startRace = () => {
    setRaceStep(0);
    setIsRacing(true);
  };

  const standardSteps = [
    { label: "Click Bio Link", dropoff: "0%" },
    { label: "Load Linktree...", dropoff: "20%" },
    { label: "Find Store Link", dropoff: "45%" },
    { label: "Load Clunky Site...", dropoff: "65%" },
    { label: "Checkout (Maybe)", dropoff: "80% Drop-off" },
  ];

  return (
    <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-black/40 p-6 shadow-2xl backdrop-blur-xl sm:p-10">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-slate-100 sm:text-3xl">
          The "Link-in-Bio" Race
        </h2>
        <p className="mt-2 text-slate-400">
          Every extra tap costs you 20% of your conversions.
        </p>
      </div>

      <div className="mb-8 flex justify-center">
        <button
          onClick={startRace}
          disabled={isRacing}
          className="rounded-xl bg-indigo-500/20 px-8 py-3 font-medium text-indigo-200 transition hover:bg-indigo-500/30 disabled:opacity-50"
        >
          {raceStep === 5 ? "Race Again" : isRacing ? "Racing..." : "Start Race"}
        </button>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Standard Route */}
        <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6">
          <h3 className="mb-4 text-center text-lg font-semibold text-red-300">
            Standard Setup
          </h3>
          <div className="relative h-64 overflow-hidden rounded-xl border border-white/10 bg-black/50 p-4">
            <AnimatePresence mode="popLayout">
              {raceStep > 0 && (
                <motion.div
                  key={raceStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex h-full flex-col items-center justify-center text-center"
                >
                  <div className="mb-4 text-4xl">⏳</div>
                  <p className="text-lg font-medium text-slate-200">
                    {standardSteps[Math.min(raceStep - 1, 4)].label}
                  </p>
                  <p className="mt-2 font-mono text-xl font-bold text-red-400">
                    {standardSteps[Math.min(raceStep - 1, 4)].dropoff}
                  </p>
                </motion.div>
              )}
              {raceStep === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex h-full items-center justify-center text-slate-500"
                >
                  Ready...
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Kvali Route */}
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">
          <h3 className="mb-4 text-center text-lg font-semibold text-emerald-300">
            Premium Storefront
          </h3>
          <div className="relative h-64 overflow-hidden rounded-xl border border-white/10 bg-black/50 p-4">
            <AnimatePresence mode="popLayout">
              {raceStep > 0 && (
                <motion.div
                  key="kvali-done"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex h-full flex-col items-center justify-center text-center"
                >
                  <div className="mb-4 text-4xl">⚡</div>
                  <p className="text-lg font-medium text-slate-200">
                    Instant Load & Checkout
                  </p>
                  <p className="mt-2 font-mono text-xl font-bold text-emerald-400">
                    0% Drop-off
                  </p>
                </motion.div>
              )}
              {raceStep === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex h-full items-center justify-center text-slate-500"
                >
                  Ready...
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <div className="w-full max-w-md bg-white/[0.03] border border-white/5 rounded-2xl p-4">
          <AuditCitation 
            dataPoint="A 0.1s improvement increases conversions by 8.4%."
            explanation="Generic Link-in-bio templates carry heavy tracking scripts that delay node rendering. A mere 0.1s delay can reduce checkouts by 8.4%. We build on statically optimized Next.js Edge CDNs for absolute sub-second delivery."
            source="Google / Deloitte 'Milliseconds Make Millions' Study"
          />
        </div>
      </div>

      {raceStep === 5 && !showForm && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 text-center"
        >
          <button
            onClick={() => setShowForm(true)}
            className="rounded-xl bg-emerald-500/20 px-8 py-4 text-lg font-medium text-emerald-200 transition hover:bg-emerald-500/30"
          >
            Stop making it hard to buy. Upgrade now.
          </button>
        </motion.div>
      )}

      {/* Lead Capture Form */}
      {showForm && (
        <LeadCaptureForm
          locale={locale}
          toolName="Friction Race Simulator"
          painPoint="High drop-off rate from Linktree/clunky site"
          ctaText="Upgrade to a high-speed, frictionless storefront."
        />
      )}
    </div>
  );
}
