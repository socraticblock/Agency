"use client";

import { useState, useEffect, type ComponentType } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Zap, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react";
import {
  buildDiscoveryQuestions,
  isDiscoveryComplete,
  isAnswerValidForDiscoveryQuestion,
} from "@/lib/discovery/buildDiscoveryQuestions";

export {
  STANDARD_QUESTIONS,
  UPGRADE_QUESTIONS,
  FOUNDATION_SPECIFIC_MAP,
  MODULE_QUESTIONS_MAP,
} from "@/lib/discovery/discoveryDefinitions";

export default function DiscoveryModule({
  foundation,
  selectedModules,
  goToStep,
  answers,
  setAnswers,
  discoveryStep: step,
  setDiscoveryStep: setStep,
}: {
  foundation: string | null;
  selectedModules: string[];
  goToStep: (s: 1 | 2 | 3 | 4 | 5) => boolean;
  answers: Record<string, unknown>;
  setAnswers: React.Dispatch<React.SetStateAction<Record<string, unknown>>>;
  discoveryStep: number;
  setDiscoveryStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [finishError, setFinishError] = useState<string | null>(null);

  const IS_UPGRADE = foundation === "upgrade";
  const QUESTIONS = buildDiscoveryQuestions({
    foundation,
    selectedModules,
    isUpgrade: IS_UPGRADE,
  });

  const maxStep = Math.max(0, QUESTIONS.length - 1);
  const safeStep = Math.min(step, maxStep);
  const q = QUESTIONS[safeStep];

  useEffect(() => {
    if (step !== safeStep) {
      setStep(safeStep);
    }
  }, [step, safeStep, setStep]);

  // Keyboard Navigation Hook
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isInputText = e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement;

      if (!q) return;

      if (e.key === 'Enter') {
        if (isInputText) {
          if (e.metaKey || e.ctrlKey) {
            e.preventDefault();
            if (isAnswerValidForDiscoveryQuestion(q, answers[q.id])) {
              if (step === QUESTIONS.length - 1) {
                if (isDiscoveryComplete(answers, QUESTIONS)) handlesSubmit();
              } else handleNext();
            }
          }
          return;
        }

        if (isAnswerValidForDiscoveryQuestion(q, answers[q.id])) {
          if (step === QUESTIONS.length - 1) {
            if (isDiscoveryComplete(answers, QUESTIONS)) handlesSubmit();
          } else handleNext();
        }
        return;
      }

      if (isInputText) return;

      const num = parseInt(e.key);
      if (!isNaN(num) && num > 0) {
        if (['cards', 'tabs', 'toggle'].includes(q.type as string)) {
          const opts = q.options as any[];
          if (opts && opts[num - 1]) {
            const val = typeof opts[num - 1] === 'string' ? opts[num - 1] : opts[num - 1].value;
            handleSelectForce(q.id, val, q.type as string);
          }
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [step, QUESTIONS, answers]);

  const handleSelectForce = (qId: string, value: unknown, type: string) => {
    setAnswers((prev) => ({ ...prev, [qId]: value }));
    const autoAdvance = ["cards", "tabs", "toggle", "tags"];
    if (autoAdvance.includes(type) && step < QUESTIONS.length - 1) {
      setTimeout(() => handleNext(), 300);
    }
  };

  const handleSelect = (qId: string, value: unknown) => {
    if (!q) return;
    handleSelectForce(qId, value, q.type as string);
  };

  const handlesSubmit = () => {
    setFinishError(null);
    if (!isDiscoveryComplete(answers, QUESTIONS)) {
      setFinishError(
        "Every discovery question must be answered. Use Previous to find any missing step."
      );
      return;
    }
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      const moved = goToStep(5);
      if (!moved) {
        setFinishError(
          "Could not open the audit. Your answers may be out of sync — go back through discovery or reset and try again."
        );
      }
    }, 1500);
  };

  const handleNext = () => {
    if (step < QUESTIONS.length - 1) setStep(s => s + 1);
  };

  const handlePrev = () => {
    if (step > 0) setStep(s => s - 1);
  };

  if (!q) return null;

  const currentAnswerOk = isAnswerValidForDiscoveryQuestion(q, answers[q.id]);
  const canPrimaryAction =
    safeStep === QUESTIONS.length - 1
      ? currentAnswerOk && isDiscoveryComplete(answers, QUESTIONS)
      : currentAnswerOk;

  return (
    <div className="flex-1 w-full max-w-4xl mx-auto py-8 lg:py-16">

      <div className="glass-card relative rounded-[2rem] p-8 md:p-14 shadow-2xl overflow-hidden border border-emerald-500/10 bg-zinc-950/80 backdrop-blur-2xl min-h-[500px] flex flex-col">
        {/* Glow Effects */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-500/5 blur-[100px] pointer-events-none" />

        {/* Segmented Progress Bar */}
        <div className="absolute top-0 left-0 w-full px-8 md:px-14 pt-6 flex gap-1.5 z-20">
          {QUESTIONS.map((_, i) => (
            <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-500 ${i < safeStep ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                : i === safeStep ? "bg-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.8)]"
                  : "bg-white/10"
              }`} />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <m.div
            key={safeStep}
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="flex flex-col flex-grow mt-8 z-10"
          >
            <div className="space-y-3 relative">
              <span className="font-space text-emerald-400 text-[10px] font-bold tracking-[0.2em] uppercase">
                Step {safeStep + 1}: {q.label || "Discovery"}
              </span>
              <h2 className="font-space text-3xl md:text-5xl font-black text-white leading-[1.1] tracking-tight">
                {q.title}
              </h2>
              {q.description && (
                <p className="text-slate-400 font-sans text-sm max-w-2xl mt-2 leading-relaxed">
                  {q.description}
                </p>
              )}
            </div>

            <div className="mt-10 flex-grow flex flex-col justify-center">

              {/* === CARDS === */}
              {q.type === "cards" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
                  {((q.options as any[]) || []).map((opt, i) => {
                    const Icon = opt.icon;
                    const isSelected = answers[q.id] === opt.value;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => handleSelect(q.id, opt.value)}
                        className={`group relative text-left p-6 md:p-8 rounded-2xl transition-all duration-300 overflow-hidden ${isSelected
                            ? "bg-emerald-500/10 border-2 border-emerald-500 shadow-[inset_0_0_30px_rgba(16,185,129,0.1)]"
                            : "bg-zinc-900/40 hover:bg-zinc-800/80 border border-white/10 hover:border-emerald-500/40"
                          }`}
                      >
                        {isSelected && (
                          <div className="absolute top-4 right-4 text-emerald-400">
                            <CheckCircle className="h-5 w-5 fill-emerald-500/20" />
                          </div>
                        )}
                        <div className={`absolute top-4 left-4 font-space text-[10px] rounded-full w-6 h-6 flex items-center justify-center border font-bold ${isSelected ? "text-emerald-400 border-emerald-400/40 bg-emerald-500/10" : "text-slate-500 border-white/10"
                          }`}>
                          {i + 1}
                        </div>
                        <div className="mt-8">
                          {Icon && <Icon className={`h-8 w-8 mb-4 ${isSelected ? "text-emerald-400" : "text-slate-400 group-hover:text-emerald-400 transition-colors"}`} />}
                          <h3 className={`font-space text-lg font-bold ${isSelected ? "text-emerald-400" : "text-white group-hover:text-slate-200"}`}>{opt.label}</h3>
                          {opt.desc && <p className="font-sans text-xs text-slate-400 mt-2 leading-relaxed">{opt.desc}</p>}
                        </div>
                        <div className={`mt-6 font-space text-[9px] uppercase tracking-widest ${isSelected ? "text-emerald-500/60" : "text-slate-600"}`}>
                          [ Press {i + 1} ]
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* === TABS === */}
              {q.type === "tabs" && (
                <div className="flex flex-col gap-4 w-fit">
                  <div className="flex flex-wrap gap-2 bg-zinc-900/50 p-2 rounded-2xl border border-white/10 w-fit">
                    {(q.options as string[])?.map((opt, i) => {
                      const isSelected = answers[q.id] === opt;
                      return (
                        <button
                          key={opt}
                          onClick={() => handleSelect(q.id, opt)}
                          className={`px-5 py-2.5 flex items-center gap-2 rounded-xl text-xs md:text-sm font-bold font-space transition-all duration-300 ${isSelected
                              ? "bg-emerald-400 text-black shadow-md shadow-emerald-500/20"
                              : "text-slate-400 hover:text-white hover:bg-white/5"
                            }`}
                        >
                          {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-black" />}
                          {opt}
                          <span className={`text-[8px] ml-1 opacity-50 ${isSelected ? "text-black" : "hidden md:inline"}`}>[{i + 1}]</span>
                        </button>
                      );
                    })}
                  </div>
                  {Boolean((q as { allowCustom?: boolean }).allowCustom) && (
                    <input
                      type="text"
                      placeholder="Or type custom..."
                      value={!(q.options as string[])?.includes(answers[q.id] as string) ? (answers[q.id] as string || "") : ""}
                      onChange={(e) => handleSelect(q.id, e.target.value)}
                      className="w-full bg-transparent border-b border-white/20 focus:border-emerald-400 text-sm font-medium text-white py-2 focus:ring-0 placeholder:text-slate-600 transition-colors"
                    />
                  )}
                </div>
              )}

              {/* === INPUT === */}
              {q.type === "input" && (
                <div className="w-full">
                  <input
                    type="text"
                    autoFocus
                    placeholder={q.placeholder as string | undefined}
                    value={(answers[q.id] as string) || ""}
                    onChange={(e) =>
                      setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))
                    }
                    className="w-full bg-transparent border-0 border-b-2 border-white/10 focus:border-emerald-400 text-3xl font-black text-white py-4 focus:ring-0 placeholder:text-slate-600 transition-colors"
                  />
                </div>
              )}

              {/* === TEXTAREA === */}
              {q.type === "textarea" && (
                <div className="w-full">
                  <textarea
                    autoFocus
                    placeholder={q.placeholder as string | undefined}
                    value={(answers[q.id] as string) || ""}
                    onChange={(e) =>
                      setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))
                    }
                    className="w-full bg-zinc-900/30 border border-white/10 focus:border-emerald-400 rounded-2xl text-xl font-medium text-white p-6 focus:ring-0 placeholder:text-slate-600 transition-colors resize-none h-40"
                  />
                </div>
              )}

              {/* === TAGS === */}
              {q.type === "tags" && (
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap gap-3">
                    {(q.options as string[])?.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleSelect(q.id, opt)}
                        className={`px-4 py-2 rounded-full border text-xs font-bold font-space transition-all duration-300 ${answers[q.id] === opt
                            ? "border-emerald-400 bg-emerald-500/20 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                            : "border-white/10 bg-white/5 text-slate-400 hover:border-white/30 hover:text-white"
                          }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {Boolean((q as { allowCustom?: boolean }).allowCustom) && (
                    <input
                      type="text"
                      placeholder="Or type custom entry..."
                      value={!(q.options as string[])?.includes(answers[q.id] as string) ? (answers[q.id] as string || "") : ""}
                      onChange={(e) => handleSelect(q.id, e.target.value)}
                      className="max-w-xs bg-transparent border-b border-white/20 focus:border-emerald-400 text-sm font-medium text-white py-2 focus:ring-0 placeholder:text-slate-600 transition-colors"
                    />
                  )}
                </div>
              )}

              {/* === MULTI-INPUT === */}
              {q.type === "multi-input" && (
                <div className="w-full flex flex-col gap-5">
                  {Array.from({
                    length: Math.max(1, Number((q as { count?: number }).count) || 3),
                  }).map((_, i) => (
                    <input
                      key={i}
                      type="text"
                      autoFocus={i === 0}
                      placeholder={`Item ${i + 1} ...`}
                      value={((answers[q.id] as string[]) || [])[i] || ""}
                      onChange={(e) => {
                        const current = [...((answers[q.id] as string[]) || [])];
                        current[i] = e.target.value;
                        setAnswers((prev) => ({ ...prev, [q.id]: current }));
                      }}
                      className="w-full max-w-2xl bg-transparent border-0 border-b-2 border-white/10 focus:border-emerald-400 text-2xl font-black text-white py-2 focus:ring-0 placeholder:text-slate-700 transition-colors"
                    />
                  ))}
                </div>
              )}

              {/* === TOGGLE === */}
              {q.type === "toggle" && (
                <div className="flex flex-col gap-3 w-full max-w-md">
                  {(q.options as string[])?.map((opt, i) => (
                    <button
                      key={opt}
                      onClick={() => handleSelect(q.id, opt)}
                      className={`p-4 rounded-xl border text-left text-sm font-bold font-space transition-all duration-300 flex justify-between items-center ${answers[q.id] === opt
                          ? "border-emerald-400 bg-emerald-500/10 text-emerald-400"
                          : "border-white/5 bg-white/[0.02] hover:bg-white/5 text-slate-300"
                        }`}
                    >
                      {opt}
                      <span className="text-[9px] opacity-40">[{i + 1}]</span>
                    </button>
                  ))}
                </div>
              )}

              {/* === COLOR PALETTE === */}
              {q.type === "color-palette" && (
                <div className="flex items-center mx-auto md:mx-0 gap-6 bg-zinc-900/50 p-6 rounded-3xl border border-white/10 w-fit">
                  {[0, 1, 2].map((i) => (
                    <input
                      key={i}
                      type="color"
                      value={
                        (answers[q.id] as string[] | undefined)?.[i] || "#10b981"
                      }
                      onChange={(e) => {
                        const current = [
                          ...((answers[q.id] as string[]) || ["#10b981", "#10b981", "#10b981"]),
                        ];
                        current[i] = e.target.value;
                        setAnswers((prev) => ({ ...prev, [q.id]: current }));
                      }}
                      className="h-16 w-16 cursor-pointer rounded-full bg-transparent border-4 border-white/10 hover:border-emerald-400 transition-all shadow-xl"
                    />
                  ))}
                </div>
              )}

            </div>
          </m.div>
        </AnimatePresence>

        {/* Footer Navigation */}
        <div className="mt-12 pt-8 border-t border-white/10 flex items-center justify-between z-20">
          <button
            onClick={handlePrev}
            disabled={safeStep === 0}
            className={`group flex items-center gap-2 font-space text-[11px] uppercase tracking-widest transition-colors ${safeStep === 0 ? "opacity-0 pointer-events-none" : "text-slate-500 hover:text-white"}`}
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            Previous
          </button>

          <div className="flex flex-col items-end gap-2">
            <button
              onClick={safeStep === QUESTIONS.length - 1 ? handlesSubmit : handleNext}
              disabled={!canPrimaryAction || isAnalyzing}
              className={`group relative flex items-center gap-3 px-8 py-3.5 rounded-full font-space font-bold uppercase tracking-widest text-xs transition-all duration-300 ${canPrimaryAction && !isAnalyzing
                  ? "bg-emerald-500 text-black shadow-[0_10px_30px_-10px_rgba(16,185,129,0.3)] hover:shadow-[0_15px_40px_-5px_rgba(16,185,129,0.4)] hover:bg-emerald-400 active:scale-95"
                  : "bg-zinc-800 text-zinc-500 cursor-not-allowed opacity-50"
                }`}
            >
              {isAnalyzing ? "Processing..." : safeStep === QUESTIONS.length - 1 ? "Generate Blueprint" : "Continue"}
              {!isAnalyzing && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
            </button>
            {finishError && (
              <p className="text-[10px] text-amber-400 font-bold font-space text-right max-w-xs leading-snug">
                {finishError}
              </p>
            )}
            <span className="font-space text-[9px] text-slate-600 uppercase tracking-widest text-right mt-1 block">
              {["input", "textarea", "multi-input"].includes(String(q.type ?? ""))
                ? "[ Press Cmd/Ctrl + Enter ↵ ]"
                : "[ Press Enter ↵ ]"}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
