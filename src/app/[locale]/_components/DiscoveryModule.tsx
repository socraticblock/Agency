"use client";

import { useState, useEffect, useRef } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Zap, CheckCircle, ArrowRight, ArrowLeft, Plus, Trash2 } from "lucide-react";
import TextareaAutosize from "react-textarea-autosize";
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
  const [viewportOffset, setViewportOffset] = useState(0);

  // Visual Viewport tracking for "Above Keyboard" sticky footer
  useEffect(() => {
    if (typeof window === "undefined" || !window.visualViewport) return;

    const handleVisualUpdate = () => {
      const vv = window.visualViewport;
      if (!vv) return;
      // Calculate how much the viewport is offset from the bottom of the window
      const offset = window.innerHeight - vv.height - vv.offsetTop;
      setViewportOffset(Math.max(0, offset));
    };

    window.visualViewport.addEventListener("resize", handleVisualUpdate);
    window.visualViewport.addEventListener("scroll", handleVisualUpdate);
    handleVisualUpdate();

    return () => {
      window.visualViewport?.removeEventListener("resize", handleVisualUpdate);
      window.visualViewport?.removeEventListener("scroll", handleVisualUpdate);
    };
  }, []);

  const IS_UPGRADE = foundation === "upgrade";
  const QUESTIONS = buildDiscoveryQuestions({
    foundation,
    selectedModules,
    isUpgrade: IS_UPGRADE,
  });

  const questionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const maxStep = Math.max(0, QUESTIONS.length - 1);
  const safeStep = Math.min(step, maxStep);
  const q = QUESTIONS[safeStep];

  useEffect(() => {
    if (step !== safeStep) {
      setStep(safeStep);
    }
    if (questionRef.current) {
      const yOffset = -80;
      const y = questionRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, [step, safeStep, setStep]);

  // Keyboard Navigation Hook
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isInputText =
        e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement;
      if (!q) return;
      if (e.key === "Enter") {
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
        if (["cards", "tabs", "toggle"].includes(q.type as string)) {
          const opts = q.options as any[];
          if (opts && opts[num - 1]) {
            const val = typeof opts[num - 1] === "string" ? opts[num - 1] : opts[num - 1].value;
            handleSelectForce(q.id, val, q.type as string);
          }
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [step, QUESTIONS, answers]);

  const handleSelectForce = (qId: string, value: unknown, type: string, isCustom = false) => {
    setAnswers((prev) => ({ ...prev, [qId]: value }));
    const autoAdvance = ["cards", "tabs", "toggle", "tags"];
    if (autoAdvance.includes(type) && step < QUESTIONS.length - 1 && !isCustom) {
      setTimeout(() => handleNext(), 300);
    }
  };

  const handleSelect = (qId: string, value: unknown, isCustom = false) => {
    if (!q) return;
    handleSelectForce(qId, value, q.type as string, isCustom);
  };

  const toggleMultiSelectOption = (qId: string, option: string) => {
    const existing = Array.isArray(answers[qId]) ? (answers[qId] as string[]) : [];
    const next = existing.includes(option)
      ? existing.filter((item) => item !== option)
      : [...existing, option];
    setAnswers((prev) => ({ ...prev, [qId]: next }));
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
      setIsEditing(false);
      const moved = goToStep(5);
      if (!moved) {
        setFinishError(
          "Could not open the audit. Your answers may be out of sync — go back through discovery or reset and try again."
        );
      }
    }, 1500);
  };

  const handleNext = () => {
    if (step < QUESTIONS.length - 1) setStep((s) => s + 1);
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep((s) => s - 1);
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

  // Dynamic list helpers for multi-input (URL lists)
  const getListAnswers = (): string[] => {
    const val = answers[q.id];
    if (Array.isArray(val)) return val as string[];
    return [""];
  };

  const updateListAnswer = (index: number, value: string) => {
    const current = getListAnswers();
    const updated = [...current];
    updated[index] = value;
    setAnswers((prev) => ({ ...prev, [q.id]: updated }));
  };

  const addListItem = () => {
    setAnswers((prev) => ({ ...prev, [q.id]: [...getListAnswers(), ""] }));
  };

  const removeListItem = (index: number) => {
    const updated = getListAnswers().filter((_, i) => i !== index);
    setAnswers((prev) => ({ ...prev, [q.id]: updated.length ? updated : [""] }));
  };

  return (
    <div 
      className="flex-1 w-full max-w-4xl mx-auto pb-32 lg:pb-24 transition-[padding] duration-200"
      style={{ paddingBottom: viewportOffset > 0 ? `${viewportOffset + 128}px` : undefined }}
    >
      {/* Section Header */}
      <div className="mb-4 px-1">
        <h3 className="text-xl font-black font-space tracking-tight text-white flex items-center gap-2">
          4. Strategic Discovery
        </h3>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          Fine-tune the logic and requirements of your architecture.
        </p>
      </div>

      <div
        ref={questionRef}
        className="glass-card relative rounded-[1.5rem] md:rounded-[2rem] p-5 md:p-14 shadow-2xl overflow-hidden border border-emerald-500/10 bg-zinc-950/80 backdrop-blur-2xl min-h-[300px] md:min-h-[500px] flex flex-col"
      >
        {/* Glow */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-500/5 blur-[100px] pointer-events-none" />

        <AnimatePresence mode="wait">
          <m.div
            key={safeStep}
            initial={{ opacity: 0, y: 20, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 350, damping: 32 }}
            className="flex flex-col flex-grow z-10"
          >
            {/* ── Compressed Header ── */}
            <div className="flex flex-col gap-1 mb-4 md:mb-6">
              {/* Step pill + title on same line */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-space text-[9px] font-black uppercase tracking-[0.18em] px-2.5 py-1 rounded-full whitespace-nowrap">
                  <Zap className="h-2.5 w-2.5" />
                  {safeStep + 1} / {QUESTIONS.length}
                </span>
              </div>
              <h2 className="font-space text-2xl md:text-5xl font-black text-white leading-tight tracking-tight">
                {q.title}
              </h2>
              {q.description && (
                <p className="text-slate-400 font-sans text-xs md:text-sm leading-relaxed mt-1">
                  {q.description}
                </p>
              )}
            </div>

            {/* ── Inputs ── */}
            <div className="flex-grow flex flex-col justify-center">

              {/* === CARDS — 2x2 mobile grid === */}
              {q.type === "cards" && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
                  {((q.options as any[]) || []).map((opt, i) => {
                    const Icon = opt.icon;
                    const isSelected = answers[q.id] === opt.value;
                    return (
                      <m.button
                        key={opt.value}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => handleSelect(q.id, opt.value)}
                        className={`group relative text-left p-3 md:p-8 rounded-xl md:rounded-2xl transition-all duration-300 overflow-hidden ${
                          isSelected
                            ? "bg-emerald-500/10 border-2 border-emerald-500 shadow-[inset_0_0_20px_rgba(16,185,129,0.1)]"
                            : "bg-zinc-900/40 hover:bg-zinc-800/80 border border-white/10 hover:border-emerald-500/40"
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute top-2 right-2 text-emerald-400">
                            <CheckCircle className="h-4 w-4 fill-emerald-500/20" />
                          </div>
                        )}
                        <div
                          className={`md:hidden absolute top-2 left-2 font-space text-[9px] rounded-full w-5 h-5 flex items-center justify-center border font-bold ${
                            isSelected
                              ? "text-emerald-400 border-emerald-400/40 bg-emerald-500/10"
                              : "text-slate-500 border-white/10"
                          }`}
                        >
                          {i + 1}
                        </div>
                        {/* Desktop number */}
                        <div
                          className={`hidden md:flex absolute top-4 left-4 font-space text-[10px] rounded-full w-6 h-6 items-center justify-center border font-bold ${
                            isSelected
                              ? "text-emerald-400 border-emerald-400/40 bg-emerald-500/10"
                              : "text-slate-500 border-white/10"
                          }`}
                        >
                          {i + 1}
                        </div>
                        <div className="mt-5 md:mt-8">
                          {Icon && (
                            <Icon
                              className={`h-5 w-5 md:h-8 md:w-8 mb-2 md:mb-4 ${
                                isSelected
                                  ? "text-emerald-400"
                                  : "text-slate-400 group-hover:text-emerald-400 transition-colors"
                              }`}
                            />
                          )}
                          <h3
                            className={`font-space text-sm md:text-lg font-bold leading-snug ${
                              isSelected ? "text-emerald-400" : "text-white group-hover:text-slate-200"
                            }`}
                          >
                            {opt.label}
                          </h3>
                          {opt.desc && (
                            <p className="font-sans text-[10px] md:text-xs text-slate-400 mt-1 leading-relaxed line-clamp-3">
                              {opt.desc}
                            </p>
                          )}
                        </div>
                        <div
                          className={`hidden md:block mt-6 font-space text-[9px] uppercase tracking-widest ${
                            isSelected ? "text-emerald-500/60" : "text-slate-600"
                          }`}
                        >
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
                          className={`flex min-h-11 items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold font-space transition-all duration-300 md:px-5 md:text-sm ${
                            isSelected
                              ? "bg-emerald-400 text-black shadow-md shadow-emerald-500/20"
                              : "text-slate-400 hover:text-white hover:bg-white/5"
                          }`}
                        >
                          {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-black" />}
                          {opt}
                          <span className={`text-[8px] ml-1 opacity-50 ${isSelected ? "text-black" : "hidden md:inline"}`}>
                            [{i + 1}]
                          </span>
                        </m.button>
                      );
                    })}
                  </div>
                  {Boolean((q as { allowCustom?: boolean }).allowCustom) && (
                    <input
                      type="text"
                      placeholder="Or type custom..."
                      value={
                        !(q.options as string[])?.includes(answers[q.id] as string)
                          ? (answers[q.id] as string) || ""
                          : ""
                      }
                      onChange={(e) => handleSelect(q.id, e.target.value, true)}
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
                    className="w-full border-0 border-b-2 border-white/10 bg-transparent py-3 text-xl font-black text-white placeholder:text-slate-600 transition-colors focus:border-emerald-400 focus:ring-0 sm:text-3xl"
                  />
                </div>
              )}

              {/* === TEXTAREA — Auto-expanding === */}
              {q.type === "textarea" && (
                <div className="w-full">
                  <TextareaAutosize
                    autoFocus
                    minRows={2}
                    maxRows={10}
                    placeholder={q.placeholder as string | undefined}
                    value={(answers[q.id] as string) || ""}
                    onChange={(e) =>
                      setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))
                    }
                    className="w-full resize-none rounded-xl border border-white/10 bg-zinc-900/30 p-4 text-base font-medium text-white placeholder:text-slate-600 transition-all focus:border-emerald-400 focus:ring-0 sm:p-5 sm:text-lg leading-relaxed"
                  />
                </div>
              )}

              {/* === TAGS === */}
              {q.type === "tags" && (
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {(q.options as string[])?.map((opt) => (
                      <m.button
                        key={opt}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => handleSelect(q.id, opt)}
                        className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full border text-xs font-bold font-space transition-all duration-300 ${
                          answers[q.id] === opt
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
                      value={
                        !(q.options as string[])?.includes(answers[q.id] as string)
                          ? (answers[q.id] as string) || ""
                          : ""
                      }
                      onChange={(e) => handleSelect(q.id, e.target.value, true)}
                      className="touch-form-control max-w-xs border-b border-white/20 bg-transparent py-2 text-base font-medium text-white placeholder:text-slate-600 transition-colors focus:border-emerald-400 focus:ring-0"
                    />
                  )}
                </div>
              )}

              {/* === MULTI-SELECT === */}
              {q.type === "multi-select" && (
                <div className="flex flex-col gap-2.5 w-full max-w-2xl">
                  {(q.options as string[])?.map((opt, i) => {
                    const selected = Array.isArray(answers[q.id]) && (answers[q.id] as string[]).includes(opt);
                    return (
                      <m.button
                        key={opt}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => toggleMultiSelectOption(q.id, opt)}
                        className={`p-3.5 md:p-4 rounded-xl border text-left text-sm font-bold font-space transition-all duration-300 flex justify-between items-center ${
                          selected
                            ? "border-emerald-400 bg-emerald-500/10 text-emerald-400"
                            : "border-white/5 bg-white/[0.02] hover:bg-white/5 text-slate-300"
                        }`}
                      >
                        <span>{opt}</span>
                        <span className="text-[9px] opacity-60">{selected ? "✓" : `[${i + 1}]`}</span>
                      </m.button>
                    );
                  })}
                </div>
              )}

              {/* === MULTI-INPUT — Dynamic URL List === */}
              {q.type === "multi-input" && (
                <div className="w-full flex flex-col gap-3">
                  <AnimatePresence>
                    {getListAnswers().map((val, i) => (
                      <m.div
                        key={i}
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-center gap-2"
                      >
                        <span className="text-[10px] font-black font-space text-slate-600 w-5 shrink-0 text-center">
                          {i + 1}
                        </span>
                        <input
                          type="text"
                          autoFocus={i === 0}
                          placeholder={`Item ${i + 1}...`}
                          value={val}
                          onChange={(e) => updateListAnswer(i, e.target.value)}
                          className="flex-1 border-0 border-b-2 border-white/10 bg-transparent py-2 text-base md:text-xl font-black text-white placeholder:text-slate-700 transition-colors focus:border-emerald-400 focus:ring-0"
                        />
                        {getListAnswers().length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeListItem(i)}
                            className="text-slate-600 hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </m.div>
                    ))}
                  </AnimatePresence>
                  <button
                    type="button"
                    onClick={addListItem}
                    className="flex items-center gap-1.5 text-slate-500 hover:text-emerald-400 text-xs font-bold font-space uppercase tracking-wider mt-1 transition-colors w-fit"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add Another
                  </button>
                </div>
              )}

              {/* === TOGGLE === */}
              {q.type === "toggle" && (
                <div className="flex flex-col gap-2.5 w-full max-w-md">
                  {(q.options as string[])?.map((opt, i) => (
                    <m.button
                      key={opt}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSelect(q.id, opt)}
                      className={`p-3.5 md:p-4 rounded-xl border text-left text-sm font-bold font-space transition-all duration-300 flex justify-between items-center ${
                        answers[q.id] === opt
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
                      value={(answers[q.id] as string[] | undefined)?.[i] || "#10b981"}
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
      </div>

      {/* ── Sticky Glassmorphic Action Zone ── */}
      <div 
        className="fixed bottom-0 left-0 right-0 z-50 md:static md:mt-8 md:z-auto"
        style={{ bottom: `${viewportOffset}px` }}
      >
        <div className="md:hidden backdrop-blur-xl bg-zinc-950/80 border-t border-white/5 px-4 py-3 flex items-center gap-3">
          {/* Back */}
          <m.button
            type="button"
            whileTap={{ scale: 0.96 }}
            onClick={handlePrev}
            className="flex items-center justify-center gap-2 h-12 w-12 shrink-0 rounded-xl border border-white/5 hover:bg-white/5 text-slate-400 hover:text-white transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
          </m.button>

          {/* Edit shortcut */}
          {isEditing && (
            <m.button
              type="button"
              whileTap={{ scale: 0.98 }}
              onClick={() => { setIsEditing(false); goToStep(5); }}
              className="shrink-0 h-12 px-3 rounded-xl border border-white/10 text-slate-400 font-space text-[10px] font-bold uppercase tracking-widest hover:text-white transition-all"
            >
              Save & Return
            </m.button>
          )}

          {/* Continue */}
          <m.button
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={safeStep === QUESTIONS.length - 1 ? handlesSubmit : handleNext}
            disabled={!canPrimaryAction || isAnalyzing}
            className={`flex-1 h-12 flex items-center justify-center gap-2 rounded-xl font-space text-xs font-black uppercase tracking-wider transition-all duration-300 ${
              canPrimaryAction && !isAnalyzing
                ? "bg-emerald-500 text-black shadow-[0_8px_20px_-8px_rgba(16,185,129,0.4)] hover:bg-emerald-400 active:scale-95"
                : "bg-zinc-800 text-zinc-500 cursor-not-allowed opacity-50"
            }`}
          >
            {isAnalyzing ? "Processing..." : safeStep === QUESTIONS.length - 1 ? "Generate Blueprint" : "Continue"}
            {!isAnalyzing && <ArrowRight className="h-4 w-4" />}
          </m.button>
        </div>

        {/* Desktop footer (unchanged layout) */}
        <div className="hidden md:flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex w-full flex-col items-stretch gap-2 sm:w-auto sm:items-end order-1 sm:order-2">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
              {isEditing && (
                <m.button
                  type="button"
                  whileTap={{ scale: 0.98 }}
                  onClick={() => { setIsEditing(false); goToStep(5); }}
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
                className={`group relative flex min-h-12 w-full items-center justify-center gap-3 rounded-full px-6 py-3.5 font-space text-xs font-bold uppercase tracking-widest transition-all duration-300 sm:w-auto sm:px-8 ${
                  canPrimaryAction && !isAnalyzing
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

          {safeStep > 0 && (
            <m.button
              type="button"
              whileTap={{ scale: 0.98 }}
              onClick={handlePrev}
              className="order-2 sm:order-1 group flex min-h-11 items-center gap-2 font-space text-[11px] uppercase tracking-widest transition-colors text-slate-500 hover:text-white sm:mr-auto"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
              Previous
            </m.button>
          )}
        </div>

        {/* Error on desktop */}
        {finishError && (
          <p className="md:hidden text-[10px] text-amber-400 font-bold font-space text-center px-4 pb-2">
            {finishError}
          </p>
        )}
      </div>
    </div>
  );
}
