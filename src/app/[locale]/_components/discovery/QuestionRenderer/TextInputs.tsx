import { m, AnimatePresence } from "framer-motion";
import TextareaAutosize from "react-textarea-autosize";
import { Trash2, Plus } from "lucide-react";
import type { QuestionRendererProps } from "./types";

export function TextInput({ q, answers, setAnswers }: QuestionRendererProps) {
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

export function TextareaInput({ q, answers, setAnswers }: QuestionRendererProps) {
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

export function MultiInput({ q, getListAnswers, updateListAnswer, addListItem, removeListItem }: QuestionRendererProps) {
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
