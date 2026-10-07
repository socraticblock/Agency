"use client";

import { useState } from "react";
import { WHATSAPP_INTAKE } from "@/constants/content";
import type { Locale } from "@/lib/i18n";

interface Step {
  question: string;
  options: { label: string; value: string }[];
}

const STEPS: Step[] = [
  {
    question: "What best describes your business?",
    options: [
      { label: "Solo professional / Freelancer", value: "pro" },
      { label: "Growing business (5-20 staff)", value: "cc" },
      { label: "Retail / E-Commerce", value: "ecomm" },
    ],
  },
  {
    question: "What's the main goal?",
    options: [
      { label: "Professional online presence", value: "pro" },
      { label: "Automate operations + dashboard", value: "cc" },
      { label: "Sell products online", value: "ecomm" },
    ],
  },
  {
    question: "What's your budget range?",
    options: [
      { label: "Around 1,300 ₾", value: "pro" },
      { label: "Around 2,000 ₾", value: "cc" },
      { label: "4,000 ₾+", value: "ecomm" },
    ],
  },
];

const RESULT_MAP: Record<string, { tier: string; label: string; price: string }> = {
  pro: { tier: "professional", label: "Professional", price: "999 ₾" },
  cc: { tier: "command-center", label: "Command Center", price: "1,999 ₾" },
  ecomm: { tier: "ecommerce-hq", label: "E-Commerce HQ", price: "starting 3,999 ₾" },
};

export function TierPickerQuiz({ locale: _locale }: { locale: Locale }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const pick = (value: string) => {
    const next = [...answers, value];
    setAnswers(next);
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers([]);
  };

  if (answers.length === STEPS.length) {
    const counts: Record<string, number> = {};
    answers.forEach((a) => (counts[a] = (counts[a] || 0) + 1));
    const winner = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
    const result = RESULT_MAP[winner];
    const waText = encodeURIComponent(
      `Hi Genezisi! The quiz suggested ${result.label} (${result.price}) for me. Can we discuss?`
    );

    return (
      <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/5 p-6 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">Quiz Result</p>
        <h3 className="mt-2 text-xl font-black text-white">{result.label}</h3>
        <p className="mt-1 text-lg font-bold text-emerald-400">{result.price}</p>
        <a
          href={`https://wa.me/${WHATSAPP_INTAKE}?text=${waText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex min-h-[48px] items-center justify-center rounded-xl bg-emerald-500 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-400"
        >
          Discuss on WhatsApp
        </a>
        <button
          onClick={reset}
          className="mt-3 block w-full text-xs text-slate-400 underline underline-offset-2 hover:text-white"
        >
          Retake quiz
        </button>
      </div>
    );
  }

  const current = STEPS[step];

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
        Step {step + 1} of {STEPS.length}
      </p>
      <h3 className="mt-3 text-lg font-bold text-white">{current.question}</h3>
      <div className="mt-4 flex flex-col gap-2">
        {current.options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => pick(opt.value)}
            className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-left text-sm font-medium text-white transition hover:border-emerald-400/40 hover:bg-emerald-500/10"
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
