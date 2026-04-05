"use client";

import { m } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";

interface DiscoveryFooterProps {
  step: number;
  questionsLength: number;
  canPrimaryAction: boolean;
  isAnalyzing: boolean;
  isEditing: boolean;
  finishError: string | null;
  viewportOffset: number;
  qType: string;
  handlePrev: () => void;
  handleNext: () => void;
  handlesSubmit: () => void;
  goToStep: (s: 1 | 2 | 3 | 4 | 5) => boolean;
  setIsEditing: (v: boolean) => void;
}

export function DiscoveryFooter({
  step,
  questionsLength,
  canPrimaryAction,
  isAnalyzing,
  isEditing,
  finishError,
  viewportOffset,
  qType,
  handlePrev,
  handleNext,
  handlesSubmit,
  goToStep,
  setIsEditing,
}: DiscoveryFooterProps) {
  const isLast = step === questionsLength - 1;
  const primaryAction = isLast ? handlesSubmit : handleNext;
  const primaryLabel = isAnalyzing ? "Processing..." : isLast ? "Generate Blueprint" : "Continue";

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 md:static md:mt-8 md:z-auto"
      style={{ bottom: `${viewportOffset}px` }}
    >
      {/* Mobile footer */}
      <div className="md:hidden backdrop-blur-xl bg-zinc-950/80 border-t border-white/5 px-4 py-3 flex items-center gap-3">
        <m.button type="button" whileTap={{ scale: 0.96 }} onClick={handlePrev}
          className="flex items-center justify-center gap-2 h-12 w-12 shrink-0 rounded-xl border border-white/5 hover:bg-white/5 text-slate-400 hover:text-white transition-all"
        >
          <ArrowLeft className="h-4 w-4" />
        </m.button>

        {isEditing && (
          <m.button type="button" whileTap={{ scale: 0.98 }} onClick={() => { setIsEditing(false); goToStep(5); }}
            className="shrink-0 h-12 px-3 rounded-xl border border-white/10 text-slate-400 font-space text-[10px] font-bold uppercase tracking-widest hover:text-white transition-all"
          >
            Save & Return
          </m.button>
        )}

        <m.button type="button" whileTap={{ scale: 0.97 }} onClick={primaryAction} disabled={!canPrimaryAction || isAnalyzing}
          className={`flex-1 h-12 flex items-center justify-center gap-2 rounded-xl font-space text-xs font-black uppercase tracking-wider transition-all duration-300 ${
            canPrimaryAction && !isAnalyzing
              ? "bg-emerald-500 text-black shadow-[0_8px_20px_-8px_rgba(16,185,129,0.4)] hover:bg-emerald-400 active:scale-95"
              : "bg-zinc-800 text-zinc-500 cursor-not-allowed opacity-50"
          }`}
        >
          {primaryLabel}
          {!isAnalyzing && <ArrowRight className="h-4 w-4" />}
        </m.button>
      </div>

      {/* Desktop footer */}
      <div className="hidden md:flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full flex-col items-stretch gap-2 sm:w-auto sm:items-end order-1 sm:order-2">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
            {isEditing && (
              <m.button type="button" whileTap={{ scale: 0.98 }} onClick={() => { setIsEditing(false); goToStep(5); }}
                className="min-h-11 cursor-pointer rounded-full border border-white/10 px-5 py-3 font-space text-xs font-bold uppercase tracking-widest text-slate-400 transition-all duration-300 hover:border-emerald-500/40 hover:text-white sm:px-6 sm:py-3.5"
              >
                SAVE AND RETURN TO SUMMARY
              </m.button>
            )}
            <m.button type="button" whileTap={{ scale: 0.98 }} onClick={primaryAction} disabled={!canPrimaryAction || isAnalyzing}
              className={`group relative flex min-h-12 w-full items-center justify-center gap-3 rounded-full px-6 py-3.5 font-space text-xs font-bold uppercase tracking-widest transition-all duration-300 sm:w-auto sm:px-8 ${
                canPrimaryAction && !isAnalyzing
                  ? "bg-emerald-500 text-black shadow-[0_10px_30px_-10px_rgba(16,185,129,0.3)] hover:shadow-[0_15px_40px_-5px_rgba(16,185,129,0.4)] hover:bg-emerald-400 active:scale-95"
                  : "bg-zinc-800 text-zinc-500 cursor-not-allowed opacity-50"
              }`}
            >
              {primaryLabel}
              {!isAnalyzing && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
            </m.button>
          </div>
          {finishError && (
            <p className="text-[10px] text-amber-400 font-bold font-space text-right max-w-xs leading-snug">{finishError}</p>
          )}
          <span className="font-space text-[9px] text-slate-600 uppercase tracking-widest text-right mt-1 block">
            {["input", "textarea", "multi-input"].includes(String(qType ?? ""))
              ? "[ Press Cmd/Ctrl + Enter ↵ ]"
              : "[ Press Enter ↵ ]"}
          </span>
        </div>

        {step > 0 && (
          <m.button type="button" whileTap={{ scale: 0.98 }} onClick={handlePrev}
            className="order-2 sm:order-1 group flex min-h-11 items-center gap-2 font-space text-[11px] uppercase tracking-widest transition-colors text-slate-500 hover:text-white sm:mr-auto"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            Previous
          </m.button>
        )}
      </div>

      {finishError && (
        <p className="md:hidden text-[10px] text-amber-400 font-bold font-space text-center px-4 pb-2">{finishError}</p>
      )}
    </div>
  );
}
