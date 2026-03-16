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
    <div className="clay-card clay-card-hover mx-auto max-w-4xl border-emerald-500/40 p-6 shadow-2xl shadow-[inset_0_1px_0_0_rgba(16,185,129,0.2),0_0_30px_rgba(16,185,129,0.15)] sm:p-10">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-slate-100 sm:text-3xl">
          {t.leadTools?.friction?.title ?? 'The "Link-in-Bio" Race'}
        </h2>
        <p className="mt-2 text-slate-400">
          {t.leadTools?.friction?.subtitle}
        </p>
      </div>

      <div className="mb-8 flex justify-center">
        <button
          onClick={startRace}
          disabled={isRacing}
          className="rounded-xl bg-indigo-500/20 px-8 py-3 font-medium text-indigo-200 transition hover:bg-indigo-500/30 disabled:opacity-50"
        >
          {raceStep === 5
            ? t.leadTools?.friction?.startAgain ?? "Run again"
            : isRacing
              ? t.leadTools?.friction?.racing ?? "Simulating..."
              : t.leadTools?.friction?.start ?? "Start journey"}
        </button>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Standard Route */}
        <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6">
          <h3 className="mb-4 text-center text-lg font-semibold text-red-300">
            {t.leadTools?.friction?.standardRouteTitle ?? "Standard Setup"}
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
            {t.leadTools?.friction?.premiumRouteTitle ?? "Premium Storefront"}
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
                    {t.leadTools?.friction?.premiumStepLabel ??
                      "Instant load & checkout"}
                  </p>
                  <p className="mt-2 font-mono text-xl font-bold text-emerald-400">
                    {t.leadTools?.friction?.premiumStepDropoff ??
                      "Minimal drop-off"}
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
