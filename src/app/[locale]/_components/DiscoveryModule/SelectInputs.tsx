import { m } from "framer-motion";
import type { QuestionInputProps } from "./types";

export function TagsInput({ q, answers, handleSelect }: QuestionInputProps) {
  return (
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
  );
}

export function MultiSelectInput({ q, answers, toggleMultiSelectOption }: QuestionInputProps) {
  return (
    <div className="flex flex-col gap-2.5 w-full max-w-2xl">
      {(q.options as string[])?.map((opt, i) => {
        const selected = Array.isArray(answers[q.id]) && (answers[q.id] as string[]).includes(opt);
        return (
          <m.button
            key={opt}
            whileTap={{ scale: 0.98 }}
            onClick={() => toggleMultiSelectOption?.(q.id, opt)}
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
  );
}

export function ColorPaletteInput({ q, answers, setAnswers }: QuestionInputProps) {
  return (
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
  );
}
