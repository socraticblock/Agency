"use client";

import { m, AnimatePresence } from "framer-motion";
import { CheckCircle, Plus, Trash2 } from "lucide-react";
import TextareaAutosize from "react-textarea-autosize";

interface QuestionRendererProps {
  q: any;
  answers: Record<string, unknown>;
  handleSelect: (qId: string, value: unknown, isCustom?: boolean) => void;
  toggleMultiSelectOption: (qId: string, option: string) => void;
  setAnswers: React.Dispatch<React.SetStateAction<Record<string, unknown>>>;
  getListAnswers: () => string[];
  updateListAnswer: (index: number, value: string) => void;
  addListItem: () => void;
  removeListItem: (index: number) => void;
}

export function QuestionRenderer({
  q,
  answers,
  handleSelect,
  toggleMultiSelectOption,
  setAnswers,
  getListAnswers,
  updateListAnswer,
  addListItem,
  removeListItem,
}: QuestionRendererProps) {
  // === CARDS ===
  if (q.type === "cards") {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
        {((q.options as any[]) || []).map((opt: any, i: number) => {
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
                  isSelected ? "text-emerald-400 border-emerald-400/40 bg-emerald-500/10" : "text-slate-500 border-white/10"
                }`}
              >
                {i + 1}
              </div>
              <div
                className={`hidden md:flex absolute top-4 left-4 font-space text-[10px] rounded-full w-6 h-6 items-center justify-center border font-bold ${
                  isSelected ? "text-emerald-400 border-emerald-400/40 bg-emerald-500/10" : "text-slate-500 border-white/10"
                }`}
              >
                {i + 1}
              </div>
              <div className="mt-5 md:mt-8">
                {Icon && (
                  <Icon className={`h-5 w-5 md:h-8 md:w-8 mb-2 md:mb-4 ${isSelected ? "text-emerald-400" : "text-slate-400 group-hover:text-emerald-400 transition-colors"}`} />
                )}
                <h3 className={`font-space text-sm md:text-lg font-bold leading-snug ${isSelected ? "text-emerald-400" : "text-white group-hover:text-slate-200"}`}>
                  {opt.label}
                </h3>
                {opt.desc && <p className="font-sans text-[10px] md:text-xs text-slate-400 mt-1 leading-relaxed line-clamp-3">{opt.desc}</p>}
              </div>
              <div className={`hidden md:block mt-6 font-space text-[9px] uppercase tracking-widest ${isSelected ? "text-emerald-500/60" : "text-slate-600"}`}>
                [ Press {i + 1} ]
              </div>
            </m.button>
          );
        })}
      </div>
    );
  }

  // === TABS ===
  if (q.type === "tabs") {
    return (
      <div className="flex flex-col gap-4 w-fit">
        <div className="flex flex-wrap gap-2 bg-zinc-900/50 p-2 rounded-2xl border border-white/10 w-fit">
          {(q.options as string[])?.map((opt: string, i: number) => {
            const isSelected = answers[q.id] === opt;
            return (
              <m.button key={opt} whileTap={{ scale: 0.96 }} onClick={() => handleSelect(q.id, opt)}
                className={`flex min-h-11 items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold font-space transition-all duration-300 md:px-5 md:text-sm ${
                  isSelected ? "bg-emerald-400 text-black shadow-md shadow-emerald-500/20" : "text-slate-400 hover:text-white hover:bg-white/5"
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
          <input type="text" placeholder="Or type custom..."
            value={!(q.options as string[])?.includes(answers[q.id] as string) ? (answers[q.id] as string) || "" : ""}
            onChange={(e) => handleSelect(q.id, e.target.value, true)}
            className="touch-form-control w-full border-b border-white/20 bg-transparent py-2 text-base font-medium text-white placeholder:text-slate-600 transition-colors focus:border-emerald-400 focus:ring-0"
          />
        )}
      </div>
    );
  }

  // === INPUT ===
  if (q.type === "input") {
    return (
      <div className="w-full">
        <input type="text" autoFocus placeholder={q.placeholder as string | undefined}
          value={(answers[q.id] as string) || ""}
          onChange={(e) => setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))}
          className="w-full border-0 border-b-2 border-white/10 bg-transparent py-3 text-xl font-black text-white placeholder:text-slate-600 transition-colors focus:border-emerald-400 focus:ring-0 sm:text-3xl"
        />
      </div>
    );
  }

  // === TEXTAREA ===
  if (q.type === "textarea") {
    return (
      <div className="w-full">
        <TextareaAutosize autoFocus minRows={2} maxRows={10} placeholder={q.placeholder as string | undefined}
          value={(answers[q.id] as string) || ""}
          onChange={(e) => setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))}
          className="w-full resize-none rounded-xl border border-white/10 bg-zinc-900/30 p-4 text-base font-medium text-white placeholder:text-slate-600 transition-all focus:border-emerald-400 focus:ring-0 sm:p-5 sm:text-lg leading-relaxed"
        />
      </div>
    );
  }

  // === TAGS ===
  if (q.type === "tags") {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-2 md:gap-3">
          {(q.options as string[])?.map((opt: string) => (
            <m.button key={opt} whileTap={{ scale: 0.96 }} onClick={() => handleSelect(q.id, opt)}
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
          <input type="text" placeholder="Or type custom entry..."
            value={!(q.options as string[])?.includes(answers[q.id] as string) ? (answers[q.id] as string) || "" : ""}
            onChange={(e) => handleSelect(q.id, e.target.value, true)}
            className="touch-form-control max-w-xs border-b border-white/20 bg-transparent py-2 text-base font-medium text-white placeholder:text-slate-600 transition-colors focus:border-emerald-400 focus:ring-0"
          />
        )}
      </div>
    );
  }

  // === MULTI-SELECT ===
  if (q.type === "multi-select") {
    return (
      <div className="flex flex-col gap-2.5 w-full max-w-2xl">
        {(q.options as string[])?.map((opt: string, i: number) => {
          const selected = Array.isArray(answers[q.id]) && (answers[q.id] as string[]).includes(opt);
          return (
            <m.button key={opt} whileTap={{ scale: 0.98 }} onClick={() => toggleMultiSelectOption(q.id, opt)}
              className={`p-3.5 md:p-4 rounded-xl border text-left text-sm font-bold font-space transition-all duration-300 flex justify-between items-center ${
                selected ? "border-emerald-400 bg-emerald-500/10 text-emerald-400" : "border-white/5 bg-white/[0.02] hover:bg-white/5 text-slate-300"
              }`}
            >
              <span>{opt}</span>
              <span className="text-[9px] opacity-60">{selected ? "✓" : `[${i + 1}]`}</span>
            </m.button>
          );
        })}
      </div>
    );
  }

  // === MULTI-INPUT ===
  if (q.type === "multi-input") {
    return (
      <div className="w-full flex flex-col gap-3">
        <AnimatePresence>
          {getListAnswers().map((val, i) => (
            <m.div key={i} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, height: 0 }} className="flex items-center gap-2">
              <span className="text-[10px] font-black font-space text-slate-600 w-5 shrink-0 text-center">{i + 1}</span>
              <input type="text" autoFocus={i === 0} placeholder={`Item ${i + 1}...`} value={val}
                onChange={(e) => updateListAnswer(i, e.target.value)}
                className="flex-1 border-0 border-b-2 border-white/10 bg-transparent py-2 text-base md:text-xl font-black text-white placeholder:text-slate-700 transition-colors focus:border-emerald-400 focus:ring-0"
              />
              {getListAnswers().length > 1 && (
                <button type="button" onClick={() => removeListItem(i)} className="text-slate-600 hover:text-red-400 transition-colors">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              )}
            </m.div>
          ))}
        </AnimatePresence>
        <button type="button" onClick={addListItem} className="flex items-center gap-1.5 text-slate-500 hover:text-emerald-400 text-xs font-bold font-space uppercase tracking-wider mt-1 transition-colors w-fit">
          <Plus className="h-3.5 w-3.5" /> Add Another
        </button>
      </div>
    );
  }

  // === TOGGLE ===
  if (q.type === "toggle") {
    return (
      <div className="flex flex-col gap-2.5 w-full max-w-md">
        {(q.options as string[])?.map((opt: string, i: number) => (
          <m.button key={opt} whileTap={{ scale: 0.98 }} onClick={() => handleSelect(q.id, opt)}
            className={`p-3.5 md:p-4 rounded-xl border text-left text-sm font-bold font-space transition-all duration-300 flex justify-between items-center ${
              answers[q.id] === opt ? "border-emerald-400 bg-emerald-500/10 text-emerald-400" : "border-white/5 bg-white/[0.02] hover:bg-white/5 text-slate-300"
            }`}
          >
            {opt}
            <span className="text-[9px] opacity-40">[{i + 1}]</span>
          </m.button>
        ))}
      </div>
    );
  }

  // === COLOR PALETTE ===
  if (q.type === "color-palette") {
    return (
      <div className="mx-auto flex w-full max-w-full flex-wrap items-center justify-center gap-4 rounded-3xl border border-white/10 bg-zinc-900/50 p-4 sm:w-fit sm:max-w-none sm:justify-start sm:gap-6 sm:p-6 md:mx-0">
        {[0, 1, 2].map((i) => (
          <input key={i} type="color"
            value={(answers[q.id] as string[] | undefined)?.[i] || "#10b981"}
            onChange={(e) => {
              const current = [...((answers[q.id] as string[]) || ["#10b981", "#10b981", "#10b981"])];
              current[i] = e.target.value;
              setAnswers((prev) => ({ ...prev, [q.id]: current }));
            }}
            className="h-14 w-14 cursor-pointer rounded-full border-4 border-white/10 bg-transparent shadow-xl transition-all hover:border-emerald-400 sm:h-16 sm:w-16"
          />
        ))}
      </div>
    );
  }

  return null;
}
