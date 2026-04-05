import { m } from "framer-motion";
import { CheckCircle } from "lucide-react";
import type { QuestionInputProps } from "./types";

export function CardsInput({
  q,
  answers,
  handleSelect,
}: QuestionInputProps) {
  return (
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
  );
}

export function TabsInput({ q, answers, handleSelect }: QuestionInputProps) {
  return (
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
  );
}

export function ToggleInput({ q, answers, handleSelect }: QuestionInputProps) {
  return (
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
  );
}
