"use client";

import { useState, useEffect, useRef } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Zap } from "lucide-react";
import {
  buildDiscoveryQuestions,
  isDiscoveryComplete,
  isAnswerValidForDiscoveryQuestion,
} from "@/lib/discovery/buildDiscoveryQuestions";

import { CardsInput, TabsInput, ToggleInput } from "./ChoiceInputs";
import { TextInput, TextareaInput, MultiInput } from "./TextInputs";
import { TagsInput, MultiSelectInput, ColorPaletteInput } from "./SelectInputs";
import { DiscoveryNavigation } from "./DiscoveryNavigation";

export {
  STANDARD_QUESTIONS,
  UPGRADE_QUESTIONS,
  FOUNDATION_SPECIFIC_MAP,
  MODULE_QUESTIONS_MAP,
} from "@/lib/discovery/discoveryDefinitions";

export function DiscoveryModule({
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

  const handleNext = () => {
    if (step < QUESTIONS.length - 1) setStep((s) => s + 1);
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
          const opts = q.options as { value: string }[] | string[] | undefined;
          const raw = opts?.[num - 1];
          if (raw) {
            const val = typeof raw === "string" ? raw : raw.value;
            handleSelectForce(q.id, val, q.type as string);
          }
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [step, QUESTIONS, answers, q]);

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

  const inputProps = {
    q,
    answers,
    handleSelect,
    setAnswers,
    toggleMultiSelectOption,
    getListAnswers,
    updateListAnswer,
    removeListItem,
    addListItem,
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
              {q.type === "cards" && <CardsInput {...inputProps} />}
              {q.type === "tabs" && <TabsInput {...inputProps} />}
              {q.type === "input" && <TextInput {...inputProps} />}
              {q.type === "textarea" && <TextareaInput {...inputProps} />}
              {q.type === "tags" && <TagsInput {...inputProps} />}
              {q.type === "multi-select" && <MultiSelectInput {...inputProps} />}
              {q.type === "multi-input" && <MultiInput {...inputProps} />}
              {q.type === "toggle" && <ToggleInput {...inputProps} />}
              {q.type === "color-palette" && <ColorPaletteInput {...inputProps} />}
            </div>
          </m.div>
        </AnimatePresence>
      </div>

      {/* ── Sticky Glassmorphic Action Zone ── */}
      <DiscoveryNavigation
        viewportOffset={viewportOffset}
        handlePrev={handlePrev}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        goToStep={goToStep}
        safeStep={safeStep}
        QUESTIONS={QUESTIONS}
        handlesSubmit={handlesSubmit}
        handleNext={handleNext}
        canPrimaryAction={canPrimaryAction}
        isAnalyzing={isAnalyzing}
        finishError={finishError}
        q={q}
      />
    </div>
  );
}
