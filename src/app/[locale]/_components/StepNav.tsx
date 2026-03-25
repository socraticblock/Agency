"use client";

import { Check } from "lucide-react";
import { memo } from "react";

interface StepNavProps {
  step: 1 | 2 | 3 | 4 | 5;
  goToStep: (s: 1 | 2 | 3 | 4 | 5) => boolean;
  canGoToStep: (s: number) => boolean;
  stepLabels: { num: string; label: string }[];
}

export default memo(function StepNav({ step, goToStep, canGoToStep, stepLabels }: StepNavProps) {
  return (
    <div className="mx-auto flex w-full max-w-md items-center overflow-x-auto overflow-y-visible pb-1 scrollbar-none sm:mx-0 sm:overflow-visible sm:pb-0">
      {stepLabels.map((s, i) => {
        const stepNum = (i + 1) as 1 | 2 | 3 | 4 | 5;
        const isActive = step === stepNum;
        const isCompleted = step > stepNum;
        const isClickable = canGoToStep(stepNum) && step !== 5;

        return (
          <div key={s.num} className="flex min-w-[4.25rem] flex-1 flex-shrink-0 items-center sm:min-w-0">
            <button
              type="button"
              onClick={() => goToStep(stepNum)}
              disabled={!isClickable}
              aria-current={isActive ? "step" : undefined}
              aria-disabled={!isClickable || undefined}
              className={`flex min-h-11 min-w-11 items-center gap-2 rounded-lg py-1 pr-1 transition-all duration-300 sm:min-h-0 sm:min-w-0 sm:rounded-none sm:py-0 sm:pr-0 ${
                !isClickable ? "cursor-not-allowed opacity-30" : "cursor-pointer"
              }`}
            >
              <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border-2 font-space text-xs font-black transition-all duration-300 sm:h-8 sm:w-8 ${
                isActive
                  ? "bg-emerald-500 border-emerald-500 text-black scale-110"
                  : isCompleted
                    ? "bg-emerald-500/20 border-emerald-500 text-emerald-400"
                    : "bg-zinc-900 border-zinc-700 text-zinc-500"
              }`}>
                {isCompleted ? <Check className="h-3.5 w-3.5" /> : s.num}
              </div>
              <span className={`hidden text-xs font-bold font-space sm:block ${
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
