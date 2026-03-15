"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LeadCaptureForm } from "./LeadCaptureForm";
import { AuditCitation } from "./AuditCitation";
import type { Locale } from "@/lib/i18n";

interface PlatformRiskMeterProps {
  locale: Locale;
}

export function PlatformRiskMeter({ locale }: PlatformRiskMeterProps) {
  const [answers, setAnswers] = useState<Record<number, boolean | null>>({
    0: null,
    1: null,
    2: null,
  });
  const [showForm, setShowForm] = useState(false);

  const questions = [
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

  // Calculate rotation for the gauge needle (-90 to 90 degrees)
  // Base is 90 (Green/Safe). Each "No" drops it by 60 degrees.
  const calculateRotation = () => {
    if (answeredCount === 0) return 90; // Start at safe
    const score = yesCount / answeredCount; // 0 to 1
    return -90 + score * 180;
  };

  const needleRotation = calculateRotation();

  // Determine risk level color
  const getRiskColor = () => {
    if (needleRotation < -30) return "#ef4444"; // Red
    if (needleRotation < 30) return "#f59e0b"; // Amber
    return "#10b981"; // Emerald
  };

  return (
    <div className="clay-card clay-card-hover mx-auto max-w-3xl p-6 shadow-2xl sm:p-10">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-slate-100 sm:text-3xl">
          The "Platform Risk" Stress Test
        </h2>
        <p className="mt-2 text-slate-400">
          Are you building your business on rented land?
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Quiz */}
        <div className="space-y-6">
          {questions.map((q, index) => (
            <div
              key={index}
              className={`rounded-xl border p-4 transition-all ${
                answers[index] !== null
                  ? "border-white/10 bg-white/5 opacity-50"
                  : "border-indigo-500/30 bg-indigo-500/10"
              }`}
            >
              <p className="mb-3 text-sm font-medium text-slate-200">{q}</p>
              <div className="flex gap-3">
                <button
                  onClick={() => handleAnswer(index, true)}
                  className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition ${
                    answers[index] === true
                      ? "bg-emerald-500/20 text-emerald-300"
                      : "bg-white/5 text-slate-400 hover:bg-white/10"
                  }`}
                >
                  Yes
                </button>
                <button
                  onClick={() => handleAnswer(index, false)}
                  className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition ${
                    answers[index] === false
                      ? "bg-red-500/20 text-red-300"
                      : "bg-white/5 text-slate-400 hover:bg-white/10"
                  }`}
                >
                  No
                </button>
              </div>
            </div>
          ))}

          {isComplete && !showForm && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-red-500/30 bg-red-500/10 p-4"
            >
              <p className="text-sm font-medium text-red-200">
                You are one false report away from losing your entire income stream.
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="mt-4 w-full rounded-xl bg-emerald-500/20 px-6 py-3 font-medium text-emerald-200 transition hover:bg-emerald-500/30"
              >
                Build a Digital Fortress
              </button>
            </motion.div>
          )}

          <div className="mt-4">
            <AuditCitation 
              dataPoint="Platform locks and bans can halt standard revenue overnight."
              explanation="Relying purely on third-party channels places your growth curve inside a locked black box. Smart operators transition visitors into independent CRM assets immediately on landing pages."
              source="Small Business Administration / Commerce Benchmarks"
            />
          </div>
        </div>

        {/* Meter Visualization */}
        <div className="flex flex-col items-center justify-center rounded-2xl bg-black/60 p-6 border border-white/5">
          <h3 className="mb-6 text-lg font-semibold text-slate-300">
            Ownership Score
          </h3>
          
          <div className="relative flex h-48 w-48 items-end justify-center overflow-hidden">
            {/* Gauge Background */}
            <div className="absolute top-0 h-48 w-48 rounded-t-full border-[24px] border-b-0 border-slate-800"></div>
            
            {/* Colored Segments */}
            <svg className="absolute top-0 h-48 w-48" viewBox="0 0 200 100">
              <path d="M 24 100 A 76 76 0 0 1 76 24" fill="none" stroke="#ef4444" strokeWidth="24" />
              <path d="M 76 24 A 76 76 0 0 1 124 24" fill="none" stroke="#f59e0b" strokeWidth="24" />
              <path d="M 124 24 A 76 76 0 0 1 176 100" fill="none" stroke="#10b981" strokeWidth="24" />
            </svg>

            {/* Needle */}
            <motion.div
              className="absolute bottom-0 h-32 w-2 origin-bottom rounded-t-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
              initial={{ rotate: 90 }}
              animate={{ rotate: needleRotation }}
              transition={{ type: "spring", stiffness: 50, damping: 15 }}
            />
            
            {/* Center Pivot */}
            <div className="absolute -bottom-3 h-6 w-6 rounded-full bg-slate-200 shadow-lg"></div>
          </div>

          <motion.div
            className="mt-8 text-center text-xl font-bold"
            animate={{ color: getRiskColor() }}
          >
            {isComplete
              ? yesCount === 3
                ? "Safe"
                : yesCount === 2
                ? "Vulnerable"
                : "Critical Risk"
              : "Testing..."}
          </motion.div>
        </div>
      </div>

      {/* Lead Capture Form */}
      {showForm && (
        <LeadCaptureForm
          locale={locale}
          toolName="Platform Risk Meter"
          painPoint={`High Platform Risk: ${3 - yesCount} vulnerabilities`}
          ctaText="Build your digital fortress. Own your platform."
        />
      )}
    </div>
  );
}
