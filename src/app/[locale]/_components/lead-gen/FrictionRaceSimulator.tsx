"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LeadCaptureForm } from "./LeadCaptureForm";
import { AuditCitation } from "./AuditCitation";
import { getMessages, type Locale } from "@/lib/i18n";
import { Scan, X, Play } from "lucide-react";

interface FrictionRaceSimulatorProps {
  locale: Locale;
  isDashboard?: boolean;
}

export function FrictionRaceSimulator({ locale, isDashboard }: FrictionRaceSimulatorProps) {
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

  const content = (
    <div className={`flex flex-col gap-6 ${isDashboard ? "px-0 pb-12 pt-0" : "grid md:grid-cols-2 md:gap-8"}`}>
      {/* Controls & Action Zone */}
      <div className={`space-y-6 ${isDashboard ? "px-4 pt-4" : ""}`}>
        {!isDashboard && (
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
        )}

        {/* Info Cards */}
        <div className="grid grid-cols-1 gap-4">
           {!isDashboard && (
              <p className="text-sm text-slate-400 text-center mb-2">
                {t.leadTools?.friction?.subtitle}
              </p>
           )}
           <div className="rounded-xl border border-red-500/10 bg-red-500/5 p-4">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-red-300 mb-2">
                 {t.leadTools?.friction?.standardRouteTitle}
              </h4>
              <p className="text-xs text-slate-400">
                 Typical 5-step social media checkout funnel.
              </p>
           </div>
           <div className="relative rounded-xl border border-emerald-500/10 bg-emerald-500/5 p-4">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-2">
                 {t.leadTools?.friction?.premiumRouteTitle}
              </h4>
              <p className="text-xs text-slate-400">
                 Optimized 1-step direct storefront.
              </p>

           </div>
        </div>


        {isDashboard && (
           <div className="flex flex-col gap-4">
               <motion.div
                 animate={!isRacing && raceStep === 0 ? {
                   scale: [1, 1.01, 1],
                   filter: ["drop-shadow(0 0 0px rgba(16, 185, 129, 0))", "drop-shadow(0 0 12px rgba(16, 185, 129, 0.4))", "drop-shadow(0 0 0px rgba(16, 185, 129, 0))"]
                 } : {}}
                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                 className="w-full"
               >
                 <button
                   onClick={startRace}
                   disabled={isRacing}
                   className="group relative w-full overflow-hidden rounded-xl bg-emerald-500 px-6 py-4 font-black uppercase tracking-widest text-slate-950 shadow-[0_4px_20px_rgba(16,185,129,0.3)] transition-all hover:bg-emerald-400 disabled:opacity-50 active:scale-95"
                 >
                   <span className="relative z-10">
                     {raceStep === 5 ? "Reset Simulation" : isRacing ? "Computing..." : "Start Journey"}
                   </span>
                   {/* Haptic Glow on click */}
                   <motion.div 
                     whileTap={{ scale: 2, opacity: 0 }}
                     className="absolute inset-0 z-0 bg-white/20 opacity-0 rounded-full scale-0"
                   />
                 </button>
               </motion.div>
              
              {raceStep === 5 && !showForm && (
                <button
                  onClick={() => setShowForm(true)}
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-6 py-4 font-bold text-white"
                >
                  View Solution
                </button>
              )}
           </div>
        )}

      </div>

      {/* Race Visualization */}
      <div className={`grid grid-cols-2 gap-3 shrink-0 relative ${isDashboard ? "px-4 pt-4" : ""}`}>
        {isDashboard && (
          <div className="absolute bottom-4 right-4 z-10">
            {/* Science moved to global LeadGenHub Stage HUD */}
          </div>
        )}
        {/* Standard Route */}
        <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-4 backdrop-blur-sm">
          <h3 className="mb-3 text-center text-[9px] font-black font-space uppercase tracking-wider text-red-300">
            Standard
          </h3>
          <div className={`relative overflow-hidden rounded-xl border border-white/5 bg-white/[0.03] backdrop-blur-xl flex items-center justify-center ${isDashboard ? "h-32" : "h-48 md:h-64"}`}>
            <AnimatePresence mode="popLayout">
               {raceStep === 0 && (
                 <motion.div 
                   key="idle-shimmer-standard"
                   initial={{ opacity: 0 }}
                   animate={{ opacity: [0.1, 0.25, 0.1] }}
                   transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                   className="absolute inset-0 shimmer-premium"
                 />
               )}
              {raceStep > 0 && (
                <motion.div
                  key={raceStep}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col items-center justify-center text-center p-2"
                >
                  <p className="text-[10px] font-bold text-slate-200 font-space leading-tight mb-1">
                    {standardSteps[Math.min(raceStep - 1, 4)].label}
                  </p>
                  <p className="font-black text-sm font-space text-red-400 whitespace-nowrap">
                    {standardSteps[Math.min(raceStep - 1, 4)].dropoff}
                  </p>
                </motion.div>
              )}
              {raceStep === 0 && (
                <span className="text-[9px] font-black text-slate-600">IDLE</span>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Genezisi Route */}
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 backdrop-blur-sm">
          <h3 className="mb-3 text-center text-[9px] font-black font-space uppercase tracking-wider text-emerald-300">
            Premium
          </h3>
          <div className={`relative overflow-hidden rounded-xl border border-white/5 bg-white/[0.03] backdrop-blur-xl flex items-center justify-center ${isDashboard ? "h-32" : "h-48 md:h-64"}`}>
            <AnimatePresence mode="popLayout">
               {raceStep === 0 && (
                 <motion.div 
                   key="idle-shimmer-premium"
                   initial={{ opacity: 0 }}
                   animate={{ opacity: [0.1, 0.25, 0.1] }}
                   transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                   className="absolute inset-0 shimmer-premium"
                 />
               )}
              {raceStep > 0 && (
                <motion.div
                  key="genezisi-done"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center p-2"
                >
                  <div className="h-8 w-8 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-300"><path d="M20 6 9 17l-5-5"/></svg>
                  </div>
                  <p className="text-[10px] font-black font-space text-emerald-400 uppercase tracking-wide">
                    {t.leadTools?.friction?.premiumStepDropoff}
                  </p>
                </motion.div>
              )}
              {raceStep === 0 && (
                <span className="text-[9px] font-black text-slate-600">IDLE</span>
              )}
            </AnimatePresence>
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
           <div className="fixed inset-0 z-[110] bg-zinc-950 p-6 overflow-y-auto">
              <button 
                onClick={() => setShowForm(false)}
                className="mb-8 h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400"
              >
                ✕
              </button>
              <LeadCaptureForm
                locale={locale}
                toolName="Link-in-Bio Friction Simulator"
                painPoint={t.leadTools?.friction?.leadPainPoint}
                ctaText={t.leadTools?.friction?.leadCta}
              />
           </div>
        )}
      </>
    );
  }

  return (
    <div className="clay-card clay-card-hover mx-auto max-w-4xl border-emerald-500/40 p-5 md:p-10 shadow-2xl shadow-[inset_0_1px_0_0_rgba(16,185,129,0.2),0_0_30px_rgba(16,185,129,0.15)] md:p-10">
      <div className="mb-6 md:mb-8 text-center">
        <h2 className="text-2xl font-bold text-slate-100 sm:text-3xl">
          {t.leadTools?.friction?.title ?? 'The "Link-in-Bio" Race'}
        </h2>
      </div>

      {content}

      {/* Lead Capture Form */}
      {showForm && (
        <LeadCaptureForm
          locale={locale}
          toolName="Link-in-Bio Friction Simulator"
          painPoint={t.leadTools?.friction?.leadPainPoint}
          ctaText={t.leadTools?.friction?.leadCta}
        />
      )}
    </div>
  );
}
