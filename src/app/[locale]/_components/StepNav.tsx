"use client";

import { Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { memo } from "react";

interface StepNavProps {
  step: 1 | 2 | 3 | 4 | 5;
  goToStep: (s: 1 | 2 | 3 | 4 | 5) => boolean;
  canGoToStep: (s: number) => boolean;
  stepLabels: { num: string; label: string }[];
}

export default memo(function StepNav({ step, goToStep, canGoToStep, stepLabels }: StepNavProps) {
  return (
    <div className="flex items-center w-full max-w-md mx-auto sm:mx-0">
      {stepLabels.map((s, i) => {
        const stepNum = (i + 1) as 1 | 2 | 3 | 4 | 5;
        const isActive = step === stepNum;
        const isCompleted = step > stepNum;
        const isClickable = canGoToStep(stepNum) && step !== 5;

        return (
          <div key={s.num} className="flex items-center flex-1">
            <button
              type="button"
              onClick={() => goToStep(stepNum)}
              disabled={!isClickable}
              aria-current={isActive ? "step" : undefined}
              aria-disabled={!isClickable || undefined}
              className={`flex items-center gap-2 transition-all duration-300 ${
                !isClickable ? "opacity-30 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-black font-space border-2 transition-all duration-300 ${
                isActive
                  ? "bg-emerald-500 border-emerald-500 text-black scale-110"
                  : isCompleted
                    ? "bg-emerald-500/20 border-emerald-500 text-emerald-400"
                    : "bg-zinc-900 border-zinc-700 text-zinc-500"
              }`}>
                {isCompleted ? <Check className="h-3.5 w-3.5" /> : s.num}
              </div>
              <span className={`text-xs font-bold font-space hidden sm:block ${
                isActive ? "text-white" : "text-zinc-500"
              }`}>{s.label}</span>
            </button>
            {i < stepLabels.length - 1 && (
              <div className={`flex-1 h-px mx-2 transition-colors duration-300 ${
                step > stepNum ? "bg-emerald-500/50" : "bg-zinc-800"
              }`} />
            )}
          </div>
        );
      })}
    </div>
  );
});
