"use client";

import { useState, type ComponentType } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Zap } from "lucide-react";
import {
  buildDiscoveryQuestions,
  isDiscoveryComplete,
} from "@/lib/discovery/buildDiscoveryQuestions";

function hasAnswer(val: unknown): boolean {
  if (val === undefined || val === null) return false;
  if (typeof val === "string") return val.trim().length > 0;
  if (Array.isArray(val)) return val.length > 0;
  return true;
}

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
  discoveryStep,
  setDiscoveryStep,
}: {
  foundation: string | null;
  selectedModules: string[];
  goToStep: (s: 1 | 2 | 3 | 4 | 5) => void;
  answers: Record<string, unknown>;
  setAnswers: React.Dispatch<React.SetStateAction<Record<string, unknown>>>;
  discoveryStep: number;
  setDiscoveryStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  const step = discoveryStep;
  const setStep = setDiscoveryStep;
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const IS_UPGRADE = foundation === "upgrade";

  const QUESTIONS = buildDiscoveryQuestions({
    foundation,
    selectedModules,
    isUpgrade: IS_UPGRADE,
  });

  const handleSelect = (qId: string, value: unknown) => {
    setAnswers((prev) => ({ ...prev, [qId]: value }));

    const optionsWithSingleSelect = ["cards", "tabs", "toggle", "tags"];
    const currentQ = QUESTIONS[step];
    if (currentQ && optionsWithSingleSelect.includes(String(currentQ.type))) {
      if (step < QUESTIONS.length - 1) {
        setTimeout(() => {
          setStep((prev) => prev + 1);
          const nextEl = document.getElementById(
            `question-${QUESTIONS[step + 1]?.id}`
          );
          if (nextEl) nextEl.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 400);
      }
    }
  };

  const handlesSubmit = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      goToStep(5);
    }, 1500);
  };

  const isCompleted = isDiscoveryComplete(answers, QUESTIONS);

  return (
    <div className="flex-1 w-full max-w-xl mx-auto py-10 pb-[60vh]">
      <AnimatePresence mode="wait">
        <m.div className="space-y-40">
          <div className="text-center pb-10 pt-5">
            <h1 className="text-3xl font-black font-space text-white tracking-tight">
              Discovery Briefing
            </h1>
            <p className="text-emerald-400 font-bold font-space text-xs tracking-widest uppercase mt-1">
              Define Your North Star
            </p>
          </div>
          {QUESTIONS.map((q, idx) => {
            const isActive = step === idx;
            return (
              <m.div
                key={q.id}
                id={`question-${q.id}`}
                initial={{ opacity: 0.2, y: 50 }}
                animate={{
                  opacity: isActive ? 1 : 0.2,
                  y: 0,
                  scale: isActive ? 1 : 0.95,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className={`flex flex-col items-center justify-center text-center space-y-4 transition-all duration-300 min-h-[40vh] py-16 ${isActive ? "pointer-events-auto" : "pointer-events-none"}`}
              >
                <span className="text-xs font-black font-space text-emerald-400 uppercase tracking-widest text-2xl">
                  {q.label}
                </span>
                <h2 className="text-3xl font-black font-space text-white tracking-tight">
                  {q.title}
                </h2>
                <p className="text-sm text-slate-400 max-w-sm">{q.description}</p>

                <div className="w-full mt-4 flex justify-center">
                  {q.type === "cards" && (
                    <div className="grid grid-cols-3 gap-2 w-full">
                      {(
                        q.options as
                          | { value: string; label: string; icon: ComponentType<{ className?: string }> }[]
                          | undefined
                      )?.map((opt) => {
                          const Icon = opt.icon;
                          return (
                            <button
                              key={opt.value}
                              onClick={() => handleSelect(q.id, opt.value)}
                              className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                                answers[q.id] === opt.value
                                  ? "border-emerald-400 bg-emerald-500/10 text-emerald-300"
                                  : "border-white/5 bg-white/[0.02] hover:bg-white/5 text-slate-300"
                              }`}
                            >
                              <Icon className="h-5 w-5 text-emerald-400" />
                              <span className="text-[9px] font-black font-space uppercase">
                                {opt.label}
                              </span>
                            </button>
                          );
                        }
                      )}
                    </div>
                  )}

                  {q.type === "color" && (
                    <div className="flex flex-col items-center gap-3">
                      <div className="flex items-center gap-2 bg-white/5 p-1.5 rounded-xl border border-white/10">
                        <input
                          type="color"
                          onChange={(e) =>
                            setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))
                          }
                          value={(answers[q.id] as string) || "#10b981"}
                          className="h-8 w-8 cursor-pointer rounded-md bg-transparent border-0"
                        />
                      </div>
                      <button
                        onClick={() => {
                          setStep(idx + 1);
                          const nextEl = document.getElementById(`question-${idx + 2}`);
                          if (nextEl) nextEl.scrollIntoView({ behavior: "smooth", block: "center" });
                        }}
                        className="px-3 py-1.5 bg-emerald-400 rounded-lg text-black font-space font-black text-[10px] uppercase cursor-pointer hover:bg-emerald-300"
                      >
                        Next
                      </button>
                    </div>
                  )}

                  {q.type === "color-palette" && (
                    <div className="flex flex-col items-center gap-4">
                      <div className="flex items-center gap-4 bg-white/5 p-3 rounded-2xl border border-white/10">
                        {[0, 1, 2].map((i) => (
                          <input
                            key={i}
                            type="color"
                            value={
                              (answers[q.id] as string[] | undefined)?.[i] || "#10b981"
                            }
                            onChange={(e) => {
                              const current = [
                                ...((answers[q.id] as string[]) || [
                                  "#10b981",
                                  "#10b981",
                                  "#10b981",
                                ]),
                              ];
                              current[i] = e.target.value;
                              setAnswers((prev) => ({ ...prev, [q.id]: current }));
                            }}
                            className="h-12 w-12 cursor-pointer rounded-full bg-transparent border-2 border-white/20 hover:border-emerald-400 transition-all"
                          />
                        ))}
                      </div>
                      <button
                        onClick={() => {
                          setStep(idx + 1);
                          const nextEl = document.getElementById(
                            `question-${QUESTIONS[idx + 1]?.id}`
                          );
                          if (nextEl)
                            nextEl.scrollIntoView({ behavior: "smooth", block: "center" });
                        }}
                        className="px-3 py-1.5 bg-emerald-400 rounded-lg text-black font-space font-black text-[10px] uppercase cursor-pointer hover:bg-emerald-300"
                      >
                        Next
                      </button>
                    </div>
                  )}

                  {q.type === "input" && (
                    <div className="flex flex-col items-center gap-3 w-full">
                      <input
                        type="text"
                        placeholder={q.placeholder as string | undefined}
                        value={(answers[q.id] as string) || ""}
                        onChange={(e) =>
                          setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && hasAnswer(answers[q.id])) {
                            if (idx === QUESTIONS.length - 1) {
                              handlesSubmit();
                            } else {
                              setStep(idx + 1);
                              const nextEl = document.getElementById(
                                `question-${QUESTIONS[idx + 1]?.id}`
                              );
                              if (nextEl)
                                nextEl.scrollIntoView({ behavior: "smooth", block: "center" });
                            }
                          }
                        }}
                        className="w-full text-center bg-transparent border-b-2 border-white/10 focus:border-emerald-400 text-3xl font-black text-white py-2 focus:outline-none focus:ring-0 placeholder:text-white/10"
                      />
                      {hasAnswer(answers[q.id]) && (
                        <button
                          onClick={
                            idx === QUESTIONS.length - 1
                              ? handlesSubmit
                              : () => {
                                  setStep(idx + 1);
                                  const nextEl = document.getElementById(
                                    `question-${QUESTIONS[idx + 1]?.id}`
                                  );
                                  if (nextEl)
                                    nextEl.scrollIntoView({
                                      behavior: "smooth",
                                      block: "center",
                                    });
                                }
                          }
                          className="mt-2 px-3 py-1.5 bg-emerald-400 rounded-lg text-black font-space font-black text-[10px] uppercase cursor-pointer flex items-center gap-1 hover:bg-emerald-300 transition-all"
                        >
                          {idx === QUESTIONS.length - 1 ? "Generate My Blueprint" : "Next →"}
                        </button>
                      )}
                    </div>
                  )}

                  {q.type === "textarea" && (
                    <div className="flex flex-col items-center gap-3 w-full">
                      <textarea
                        placeholder={q.placeholder as string | undefined}
                        value={(answers[q.id] as string) || ""}
                        onChange={(e) =>
                          setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey && hasAnswer(answers[q.id])) {
                            e.preventDefault();
                            if (idx === QUESTIONS.length - 1) {
                              handlesSubmit();
                            } else {
                              setStep(idx + 1);
                              const nextEl = document.getElementById(
                                `question-${QUESTIONS[idx + 1]?.id}`
                              );
                              if (nextEl)
                                nextEl.scrollIntoView({ behavior: "smooth", block: "center" });
                            }
                          }
                        }}
                        className="w-full text-center bg-transparent border-b-2 border-white/10 focus:border-emerald-400 text-xl font-bold text-white py-2 focus:outline-none focus:ring-0 placeholder:text-white/10 resize-none h-24"
                      />
                      {q.id === "pitch" &&
                        typeof answers[q.id] === "string" &&
                        (answers[q.id] as string).trim().split(/\s+/).length > 20 && (
                          <p className="text-[10px] text-amber-300 font-bold bg-amber-500/5 px-2 py-0.5 rounded border border-amber-500/10">
                            Try to keep it under 20 words for maximum impact.
                          </p>
                        )}
                      {hasAnswer(answers[q.id]) && (
                        <button
                          onClick={
                            idx === QUESTIONS.length - 1
                              ? handlesSubmit
                              : () => {
                                  setStep(idx + 1);
                                  const nextEl = document.getElementById(
                                    `question-${QUESTIONS[idx + 1]?.id}`
                                  );
                                  if (nextEl)
                                    nextEl.scrollIntoView({
                                      behavior: "smooth",
                                      block: "center",
                                    });
                                }
                          }
                          className="mt-2 px-3 py-1.5 bg-emerald-400 rounded-lg text-black font-space font-black text-[10px] uppercase cursor-pointer flex items-center gap-1 hover:bg-emerald-300 transition-all"
                        >
                          {idx === QUESTIONS.length - 1 ? "Generate My Blueprint" : "Next →"}
                        </button>
                      )}
                    </div>
                  )}

                  {q.type === "tabs" && (
                    <div className="flex gap-1.5 bg-white/5 p-1 rounded-xl border border-white/5">
                      {(q.options as string[])?.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => handleSelect(q.id, opt)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold font-space transition-all ${
                            answers[q.id] === opt
                              ? "bg-emerald-400 text-black shadow-sm"
                              : "text-slate-400 hover:text-white"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}

                  {q.type === "toggle" && (
                    <div className="flex flex-col gap-1.5 w-full">
                      {(q.options as string[])?.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => handleSelect(q.id, opt)}
                          className={`p-2.5 rounded-xl border text-left text-xs font-bold font-space ${
                            answers[q.id] === opt
                              ? "border-emerald-400 bg-emerald-500/10 text-emerald-300"
                              : "border-white/5 bg-white/[0.02] hover:bg-white/5 text-slate-300"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}

                  {q.type === "tags" && (
                    <div className="flex flex-wrap gap-1.5 justify-center">
                      {(q.options as string[])?.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => handleSelect(q.id, opt)}
                          className={`px-3 py-1.5 rounded-full border text-[11px] font-bold font-space transition-all ${
                            answers[q.id] === opt
                              ? "border-emerald-400 bg-emerald-400 text-black"
                              : "border-white/10 bg-white/5 text-slate-400 hover:border-white/20"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                  {idx === QUESTIONS.length - 1 && hasAnswer(answers[q.id]) && (
                    <m.button
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      onClick={handlesSubmit}
                      disabled={isAnalyzing}
                      className="mt-6 px-5 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-black font-space font-black text-xs uppercase rounded-xl flex items-center justify-center gap-1.5 shadow-[0_10px_25px_rgba(16,185,129,0.3)] cursor-pointer transition-all mx-auto z-50 relative"
                    >
                      {isAnalyzing ? "Generating..." : "Generate Infrastructure Blueprint"}
                      <Zap className="h-3.5 w-3.5 fill-current" />
                    </m.button>
                  )}
                </div>
              </m.div>
            );
          })}

          {isCompleted && (
            <m.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 10 }}
              onClick={handlesSubmit}
              disabled={isAnalyzing}
              className="w-full py-2.5 rounded-xl bg-emerald-400 text-black font-space font-black text-xs uppercase shadow-lg flex items-center justify-center gap-2 hover:bg-emerald-300 transition-all cursor-pointer"
            >
              {isAnalyzing ? "Reviewing..." : "Submit for Architectural Review"}
            </m.button>
          )}
        </m.div>
      </AnimatePresence>
    </div>
  );
}
