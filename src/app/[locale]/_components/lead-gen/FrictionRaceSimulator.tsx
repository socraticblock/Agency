"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LeadCaptureForm } from "./LeadCaptureForm";
import { AuditCitation } from "./AuditCitation";
import { getMessages, type Locale } from "@/lib/i18n";

interface FrictionRaceSimulatorProps {
  locale: Locale;
}

export function FrictionRaceSimulator({ locale }: FrictionRaceSimulatorProps) {
  const [isRacing, setIsRacing] = useState(false);
  const [raceStep, setRaceStep] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const t = getMessages(locale);

  useEffect(() => {
    if (isRacing && raceStep < 5) {
      const timer = setTimeout(() => {
        setRaceStep((prev) => prev + 1);
      }, 1500); 
      return () => clearTimeout(timer);
    } else if (raceStep === 5) {
      setIsRacing(false);
    }
  }, [isRacing, raceStep]);

  const startRace = () => {
    setRaceStep(1); 
    setIsRacing(true);
  };

  const standardSteps =
    t.leadTools?.friction?.standardSteps ??
    [
      { label: "Tap bio link", dropoff: "0% drop-off" },
      { label: "Wait for link-in-bio to load", dropoff: "20% leave here" },
      { label: "Look for the right button", dropoff: "45% have left" },
      { label: "Load a slow or clunky site", dropoff: "65% have left" },
      { label: "Maybe reach checkout", dropoff: "80% total drop-off" },
    ];

  return (
    <div className="clay-card clay-card-hover mx-auto max-w-4xl border-emerald-500/40 p-5 md:p-10 shadow-2xl shadow-[inset_0_1px_0_0_rgba(16,185,129,0.2),0_0_30px_rgba(16,185,129,0.15)] md:p-10">
      <div className="mb-6 md:mb-8 text-center">
        <h2 className="text-2xl font-bold text-slate-100 sm:text-3xl">
          {t.leadTools?.friction?.title ?? 'The "Link-in-Bio" Race'}
        </h2>
        <p className="mt-2 text-slate-400">
          {t.leadTools?.friction?.subtitle}
        </p>
      </div>

      <div className="mb-6 md:mb-8 flex justify-center">
        <button
          onClick={(e) => {
            e.stopPropagation();
            startRace();
          }}
          disabled={isRacing}
          className="relative z-30 rounded-xl bg-indigo-500/20 px-8 py-3 font-medium text-indigo-200 transition hover:bg-indigo-500/30 disabled:opacity-50 cursor-pointer"
        >
          {raceStep === 5
            ? t.leadTools?.friction?.startAgain ?? "Run again"
            : isRacing
              ? t.leadTools?.friction?.racing ?? "Simulating..."
              : "Start Race"}
        </button>
      </div>

      <div className="grid gap-5 md:gap-8 md:grid-cols-2">
        {/* Standard Route */}
        <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6 backdrop-blur-sm">
          <h3 className="mb-4 text-center text-xs font-black font-space uppercase tracking-wider text-red-300 flex items-center justify-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-red-400 animate-pulse" />
            {t.leadTools?.friction?.standardRouteTitle ?? "Standard Setup"}
          </h3>
          <div className="relative h-48 md:h-64 overflow-hidden rounded-xl border border-white/5 bg-black/40 p-4 flex items-center justify-center">
            <AnimatePresence mode="popLayout">
              {raceStep > 0 && (
                <motion.div
                  key={raceStep}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="flex h-full flex-col items-center justify-center text-center p-2"
                >
                  <div className="h-10 w-10 rounded-full border-2 border-red-400/30 border-t-red-400 animate-spin mb-3 flex items-center justify-center">
                    <span className="text-xs font-bold text-red-400">{3.1 + raceStep}s</span>
                  </div>
                  <p className="text-sm font-bold text-slate-200 font-space tracking-tight">
                    {standardSteps[Math.min(raceStep - 1, 4)].label}
                  </p>
                  <p className="mt-1 font-black text-lg font-space text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.1)]">
                    {standardSteps[Math.min(raceStep - 1, 4)].dropoff}
                  </p>
                </motion.div>
              )}
              {raceStep === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex h-full items-center justify-center text-xs font-black font-space uppercase tracking-widest text-slate-500"
                >
                  Ready..
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Genezisi Route */}
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 backdrop-blur-sm">
          <h3 className="mb-4 text-center text-xs font-black font-space uppercase tracking-wider text-emerald-300 flex items-center justify-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {t.leadTools?.friction?.premiumRouteTitle ?? "Premium Storefront"}
          </h3>
          <div className="relative h-48 md:h-64 overflow-hidden rounded-xl border border-white/5 bg-black/40 p-4 flex items-center justify-center">
            <AnimatePresence mode="popLayout">
              {raceStep > 0 && (
                <motion.div
                  key="genezisi-done"
                  initial={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="absolute inset-0 flex h-full flex-col items-center justify-center text-center p-4 bg-emerald-500/[0.02]"
                >
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: "100%" }} 
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="h-1 bg-emerald-400 rounded-full w-full max-w-[120px] mb-4 shadow-[0_0_15px_rgba(52,211,153,0.5)]"
                  />
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1, type: "spring", stiffness: 400 }}
                    className="h-12 w-12 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center animate-pulse shadow-[0_0_25px_rgba(52,211,153,0.25)] mb-3"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-300"><path d="M20 6 9 17l-5-5"/></svg>
                  </motion.div>
                  <p className="text-sm font-black font-space text-white">
                    {t.leadTools?.friction?.premiumStepLabel ?? "Instant load & checkout"}
                  </p>
                  <p className="mt-1 font-black text-base font-space text-emerald-400 uppercase tracking-wide">
                    {t.leadTools?.friction?.premiumStepDropoff ?? "Minimal drop-off"}
                  </p>
                </motion.div>
              )}
              {raceStep === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex h-full items-center justify-center text-xs font-black font-space uppercase tracking-widest text-slate-500"
                >
                  Ready..
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <div className="w-full max-w-md">
          <AuditCitation 
            dataPoint={t.leadTools?.friction?.citationPoint}
            explanation={t.leadTools?.friction?.citationExplanation}
            source={t.leadTools?.friction?.citationSource}
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
            {t.leadTools?.friction?.buttonCta ??
              "Make it easy to say yes."}
          </button>
        </motion.div>
      )}

      {/* Lead Capture Form */}
      {showForm && (
        <LeadCaptureForm
          locale={locale}
          toolName="Friction Race Simulator"
          painPoint={t.leadTools?.friction?.leadPainPoint}
          ctaText={t.leadTools?.friction?.leadCta}
        />
      )}
    </div>
  );
}
