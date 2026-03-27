"use client";

import { useState, useEffect, useRef, type ComponentType } from "react";
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
  isEditing,
  setIsEditing,
}: {
  foundation: string | null;
  selectedModules: string[];
  goToStep: (s: 1 | 2 | 3 | 4 | 5) => boolean;
  answers: Record<string, unknown>;
  setAnswers: React.Dispatch<React.SetStateAction<Record<string, unknown>>>;
  discoveryStep: number;
  setDiscoveryStep: React.Dispatch<React.SetStateAction<number>>;
  isEditing: boolean;
  setIsEditing: (v: boolean) => void;
}) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [finishError, setFinishError] = useState<string | null>(null);

  const IS_UPGRADE = foundation === "upgrade";
  const QUESTIONS = buildDiscoveryQuestions({
    foundation,
    selectedModules,
    isUpgrade: IS_UPGRADE,
  });

  const questionRef = useRef<HTMLDivElement>(null);

  const maxStep = Math.max(0, QUESTIONS.length - 1);
  const safeStep = Math.min(step, maxStep);
  const q = QUESTIONS[safeStep];

  useEffect(() => {
    if (step !== safeStep) {
      setStep(safeStep);
    }
    
    // Scroll to question on step change
    if (questionRef.current) {
      const yOffset = -64; // Exactly match sticky header height to hide everything else
      const y = questionRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
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
      setIsEditing(false); // Safety: Natural completion resets editing mode
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
    if (step > 0) {
      setStep(s => s - 1);
    } else {
      goToStep(3);
    }
  };

  if (!q) return null;

  const currentAnswerOk = isAnswerValidForDiscoveryQuestion(q, answers[q.id]);
  const canPrimaryAction =
    safeStep === QUESTIONS.length - 1
      ? currentAnswerOk && isDiscoveryComplete(answers, QUESTIONS)
      : currentAnswerOk;

  return (
    <div className="flex-1 w-full max-w-4xl mx-auto py-8 lg:py-16">
      <div className="mb-6">
        <h3 className="text-xl font-black font-space tracking-tight text-white flex items-center gap-2">
          4. Strategic Discovery
        </h3>
        <p className="text-xs text-slate-500 font-medium mt-0.5">Fine-tune the logic and requirements of your bespoke architecture.</p>
      </div>

      <div ref={questionRef} className="glass-card relative rounded-[2rem] p-5 md:p-14 shadow-2xl overflow-hidden border border-emerald-500/10 bg-zinc-950/80 backdrop-blur-2xl min-h-[400px] md:min-h-[500px] flex flex-col">
        {/* Glow Effects */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-500/5 blur-[100px] pointer-events-none" />


        <AnimatePresence mode="wait">
          <m.div
            key={safeStep}
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="flex flex-col flex-grow mt-0 z-10"
          >
            <div className="space-y-3 relative">
              <span className="font-space text-emerald-400 text-[10px] font-bold tracking-[0.2em] uppercase">
                Question {safeStep + 1} of {QUESTIONS.length}
              </span>
              <h2 className="font-space text-3xl md:text-5xl font-black text-white leading-[1.7] tracking-tight">
                {q.title}
              </h2>
              {q.description && (
                <p className="text-slate-400 font-sans text-sm max-w-2xl mt-4leading-relaxed">
                  {q.description}
                </p>
              )}
            </div>

            <div className="mt-2 md:mt-4 flex-grow flex flex-col justify-center">

              {/* === CARDS === */}
              {q.type === "cards" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
                  {((q.options as any[]) || []).map((opt, i) => {
                    const Icon = opt.icon;
                    const isSelected = answers[q.id] === opt.value;
                    return (
                      <m.button
                        key={opt.value}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => handleSelect(q.id, opt.value)}
                        className={`group relative text-left p-5 md:p-8 rounded-2xl transition-all duration-300 overflow-hidden ${isSelected
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
                      </m.button>
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
                        <m.button
                          key={opt}
                          whileTap={{ scale: 0.96 }}
                          onClick={() => handleSelect(q.id, opt)}
                          className={`flex min-h-11 items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold font-space transition-all duration-300 md:px-5 md:text-sm ${isSelected
                            ? "bg-emerald-400 text-black shadow-md shadow-emerald-500/20"
                            : "text-slate-400 hover:text-white hover:bg-white/5"
                            }`}
                        >
                          {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-black" />}
                          {opt}
                          <span className={`text-[8px] ml-1 opacity-50 ${isSelected ? "text-black" : "hidden md:inline"}`}>[{i + 1}]</span>
                        </m.button>
                      );
                    })}
                  </div>
                  {Boolean((q as { allowCustom?: boolean }).allowCustom) && (
                    <input
                      type="text"
                      placeholder="Or type custom..."
                      value={!(q.options as string[])?.includes(answers[q.id] as string) ? (answers[q.id] as string || "") : ""}
                      onChange={(e) => handleSelect(q.id, e.target.value)}
                      className="touch-form-control w-full border-b border-white/20 bg-transparent py-2 text-base font-medium text-white placeholder:text-slate-600 transition-colors focus:border-emerald-400 focus:ring-0"
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
                    className="w-full border-0 border-b-2 border-white/10 bg-transparent py-4 text-2xl font-black text-white placeholder:text-slate-600 transition-colors focus:border-emerald-400 focus:ring-0 sm:text-3xl"
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
                    className="h-40 w-full resize-none rounded-2xl border border-white/10 bg-zinc-900/30 p-4 text-base font-medium text-white placeholder:text-slate-600 transition-colors focus:border-emerald-400 focus:ring-0 sm:p-6 sm:text-xl"
                  />
                </div>
              )}

              {/* === TAGS === */}
              {q.type === "tags" && (
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap gap-3">
                    {(q.options as string[])?.map((opt) => (
                      <m.button
                        key={opt}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => handleSelect(q.id, opt)}
                        className={`px-4 py-2 rounded-full border text-xs font-bold font-space transition-all duration-300 ${answers[q.id] === opt
                          ? "border-emerald-400 bg-emerald-500/20 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                          : "border-white/10 bg-white/5 text-slate-400 hover:border-white/30 hover:text-white"
                          }`}
                      >
                        {opt}
                      </m.button>
                    ))}
                  </div>
                  {Boolean((q as { allowCustom?: boolean }).allowCustom) && (
                    <input
                      type="text"
                      placeholder="Or type custom entry..."
                      value={!(q.options as string[])?.includes(answers[q.id] as string) ? (answers[q.id] as string || "") : ""}
                      onChange={(e) => handleSelect(q.id, e.target.value)}
                      className="touch-form-control max-w-xs border-b border-white/20 bg-transparent py-2 text-base font-medium text-white placeholder:text-slate-600 transition-colors focus:border-emerald-400 focus:ring-0"
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
                      className="w-full max-w-2xl border-0 border-b-2 border-white/10 bg-transparent py-2 text-xl font-black text-white placeholder:text-slate-700 transition-colors focus:border-emerald-400 focus:ring-0 sm:text-2xl"
                    />
                  ))}
                </div>
              )}

              {/* === TOGGLE === */}
              {q.type === "toggle" && (
                <div className="flex flex-col gap-3 w-full max-w-md">
                  {(q.options as string[])?.map((opt, i) => (
                    <m.button
                      key={opt}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSelect(q.id, opt)}
                      className={`p-4 rounded-xl border text-left text-sm font-bold font-space transition-all duration-300 flex justify-between items-center ${answers[q.id] === opt
                        ? "border-emerald-400 bg-emerald-500/10 text-emerald-400"
                        : "border-white/5 bg-white/[0.02] hover:bg-white/5 text-slate-300"
                        }`}
                    >
                      {opt}
                      <span className="text-[9px] opacity-40">[{i + 1}]</span>
                    </m.button>
                  ))}
                </div>
              )}

              {/* === COLOR PALETTE === */}
              {q.type === "color-palette" && (
                <div className="mx-auto flex w-full max-w-full flex-wrap items-center justify-center gap-4 rounded-3xl border border-white/10 bg-zinc-900/50 p-4 sm:w-fit sm:max-w-none sm:justify-start sm:gap-6 sm:p-6 md:mx-0">
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
                      className="h-14 w-14 cursor-pointer rounded-full border-4 border-white/10 bg-transparent shadow-xl transition-all hover:border-emerald-400 sm:h-16 sm:w-16"
                    />
                  ))}
                </div>
              )}

            </div>
          </m.div>
        </AnimatePresence>

        {/* Footer Navigation */}
        <div className="z-20 mt-8 md:mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 md:pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex w-full flex-col items-stretch gap-2 sm:w-auto sm:items-end order-1 sm:order-2">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
              {isEditing && (
                <m.button
                  type="button"
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setIsEditing(false);
                    goToStep(5);
                  }}
                  className="min-h-11 cursor-pointer rounded-full border border-white/10 px-5 py-3 font-space text-xs font-bold uppercase tracking-widest text-slate-400 transition-all duration-300 hover:border-emerald-500/40 hover:text-white sm:px-6 sm:py-3.5"
                >
                  SAVE AND RETURN TO SUMMARY
                </m.button>
              )}
              <m.button
                type="button"
                whileTap={{ scale: 0.98 }}
                onClick={safeStep === QUESTIONS.length - 1 ? handlesSubmit : handleNext}
                disabled={!canPrimaryAction || isAnalyzing}
                className={`group relative flex min-h-12 w-full items-center justify-center gap-3 rounded-full px-6 py-3.5 font-space text-xs font-bold uppercase tracking-widest transition-all duration-300 sm:w-auto sm:px-8 ${canPrimaryAction && !isAnalyzing
                  ? "bg-emerald-500 text-black shadow-[0_10px_30px_-10px_rgba(16,185,129,0.3)] hover:shadow-[0_15px_40px_-5px_rgba(16,185,129,0.4)] hover:bg-emerald-400 active:scale-95"
                  : "bg-zinc-800 text-zinc-500 cursor-not-allowed opacity-50"
                  }`}
              >
                {isAnalyzing ? "Processing..." : safeStep === QUESTIONS.length - 1 ? "Generate Blueprint" : "Continue"}
                {!isAnalyzing && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
              </m.button>
            </div>
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

          <m.button
            type="button"
            whileTap={{ scale: 0.98 }}
            onClick={handlePrev}
            className={`order-2 sm:order-1 group flex min-h-11 items-center gap-2 font-space text-[11px] uppercase tracking-widest transition-colors text-slate-500 hover:text-white sm:mr-auto`}
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            {safeStep === 0 ? "Back to Shield Selection" : "Previous"}
          </m.button>
        </div>

      </div>
    </div>
  );
}
