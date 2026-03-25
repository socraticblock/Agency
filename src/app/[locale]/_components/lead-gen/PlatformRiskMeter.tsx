"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LeadCaptureForm } from "./LeadCaptureForm";
import { AuditCitation } from "./AuditCitation";
import { getMessages, type Locale } from "@/lib/i18n";

interface PlatformRiskMeterProps {
  locale: Locale;
  isDashboard?: boolean;
}

export function PlatformRiskMeter({ locale, isDashboard }: PlatformRiskMeterProps) {
  const [answers, setAnswers] = useState<Record<number, boolean | null>>({
    0: null,
    1: null,
    2: null,
  });
  const [showForm, setShowForm] = useState(false);
  const t = getMessages(locale);

  const questions: string[] =
    t.leadTools?.risk?.questions ??
    [
      "Do you have a list of your customers' emails?",
      "Would your business survive if your Instagram was locked tomorrow?",
      "Do you own your own website domain?",
    ];

  const handleAnswer = (index: number, answer: boolean) => {
    setAnswers((prev) => ({ ...prev, [index]: answer }));
  };

  const answeredCount = Object.values(answers).filter((a) => a !== null).length;
  const yesCount = Object.values(answers).filter((a) => a === true).length;
  const isComplete = answeredCount === questions.length;

  const calculateRotation = () => {
    if (answeredCount === 0) return 90;
    const score = yesCount / answeredCount;
    return -90 + score * 180;
  };

  const needleRotation = calculateRotation();

  const getRiskColor = () => {
    if (needleRotation < -30) return "#ef4444";
    if (needleRotation < 30) return "#f59e0b";
    return "#10b981";
  };

  const content = (
    <div className={`grid gap-8 md:grid-cols-2 ${isDashboard ? "flex-grow flex flex-col-reverse justify-end" : ""}`}>
      {/* Quiz / Controls */}
      <div className={`space-y-4 ${isDashboard ? "px-6 pb-20 pt-4" : ""}`}>
        {questions.map((q, index) => (
          <div
            key={index}
            className={`rounded-xl border p-3 transition-all ${
              answers[index] !== null
                ? "border-white/10 bg-white/5 opacity-50"
                : "border-indigo-500/30 bg-indigo-500/10"
            }`}
          >
            <p className="mb-2 text-xs font-medium text-slate-200">
              {q}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => handleAnswer(index, true)}
                className={`flex-1 rounded-lg px-4 py-2 text-xs font-medium transition ${
                  answers[index] === true
                    ? "bg-emerald-500/20 text-emerald-300"
                    : "bg-white/5 text-slate-400 hover:bg-white/10"
                }`}
              >
                {t.leadTools?.risk?.yes ?? "Yes"}
              </button>
              <button
                onClick={() => handleAnswer(index, false)}
                className={`flex-1 rounded-lg px-4 py-2 text-xs font-medium transition ${
                  answers[index] === false
                    ? "bg-red-500/20 text-red-300"
                    : "bg-white/5 text-slate-400 hover:bg-white/10"
                }`}
              >
                {t.leadTools?.risk?.no ?? "No"}
              </button>
            </div>
          </div>
        ))}

        {isComplete && !showForm && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-xl border border-red-500/30 bg-red-500/10 p-4 ${isDashboard ? "mt-2" : ""}`}
          >
            <p className="text-xs font-medium text-red-200">
              {t.leadTools?.risk?.promptBody}
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="mt-3 w-full rounded-xl bg-emerald-500 px-6 py-3 font-bold text-slate-950 transition hover:bg-emerald-400 shadow-[0_4px_15px_rgba(16,185,129,0.3)]"
            >
              {t.leadTools?.risk?.promptCta}
            </button>
          </motion.div>
        )}

        {!isDashboard && (
          <div className="mt-4">
            <AuditCitation 
              dataPoint={t.leadTools?.risk?.citationPoint}
              explanation={t.leadTools?.risk?.citationExplanation}
              source={t.leadTools?.risk?.citationSource}
            />
          </div>
        )}
      </div>

      {/* Meter Visualization */}
      <div className={`flex flex-col items-center justify-center rounded-2xl bg-black/60 border border-white/5 ${isDashboard ? "min-h-[40%] m-4" : "p-6"}`}>
        <h3 className="mb-4 text-sm font-semibold text-slate-300 uppercase tracking-widest">
          {t.leadTools?.risk?.ownershipScoreLabel ?? "Ownership Score"}
        </h3>
        
        <div className="relative flex h-32 w-32 items-end justify-center overflow-hidden sm:h-40 sm:w-40">
          {/* Gauge Background */}
          <div className="absolute top-0 h-32 w-32 rounded-t-full border-[16px] border-b-0 border-slate-800 sm:h-40 sm:w-40 sm:border-[20px]"></div>
          
          {/* Colored Segments */}
          <svg className="absolute top-0 h-32 w-32 sm:h-40 sm:w-40" viewBox="0 0 200 100">
            <path d="M 24 100 A 76 76 0 0 1 76 24" fill="none" stroke="#ef4444" strokeWidth="24" />
            <path d="M 76 24 A 76 76 0 0 1 124 24" fill="none" stroke="#f59e0b" strokeWidth="24" />
            <path d="M 124 24 A 76 76 0 0 1 176 100" fill="none" stroke="#10b981" strokeWidth="24" />
          </svg>

          {/* Needle */}
          <motion.div
            className="absolute bottom-0 h-24 w-1.5 origin-bottom rounded-t-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)] sm:h-28"
            initial={{ rotate: 90 }}
            animate={{ rotate: needleRotation }}
            transition={{ type: "spring", stiffness: 50, damping: 15 }}
          />
          
          {/* Center Pivot */}
          <div className="absolute -bottom-2 h-4 w-4 rounded-full bg-slate-200 shadow-lg"></div>
        </div>

        <motion.div
          className="mt-6 text-center text-lg font-black uppercase tracking-widest"
          animate={{ color: getRiskColor() }}
        >
          {answeredCount > 0
            ? yesCount / answeredCount > 0.66
              ? t.leadTools?.risk?.scoreSafe ?? "Safe"
              : yesCount / answeredCount >= 0.33
              ? t.leadTools?.risk?.scoreMedium ?? "Vulnerable"
              : t.leadTools?.risk?.scoreLow ?? "Critical Risk"
            : t.leadTools?.risk?.scorePending ?? "Testing..."}
        </motion.div>
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
                toolName="Platform Risk Meter"
                painPoint={`${t.leadTools?.risk?.leadPainPointPrefix} ${3 - yesCount} ${t.leadTools?.risk?.leadPainPointSuffix}`}
                ctaText={t.leadTools?.risk?.leadCta}
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
          {t.leadTools?.risk?.title ?? 'The "Platform Risk" Stress Test'}
        </h2>
        <p className="mt-2 text-slate-400">
          {t.leadTools?.risk?.subtitle}
        </p>
      </div>
      {content}
      {showForm && (
        <LeadCaptureForm
          locale={locale}
          toolName="Platform Risk Meter"
          painPoint={`${t.leadTools?.risk?.leadPainPointPrefix} ${3 - yesCount} ${t.leadTools?.risk?.leadPainPointSuffix}`}
          ctaText={t.leadTools?.risk?.leadCta}
        />
      )}
    </div>
  );
}
