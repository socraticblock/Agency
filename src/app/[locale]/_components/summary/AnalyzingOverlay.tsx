"use client";

import { m, AnimatePresence } from "framer-motion";

interface AnalyzingOverlayProps {
  isVisible: boolean;
  progress: number;
  loadingPhrases: string[];
  loadingIndex: number;
}

export default function AnalyzingOverlay({
  isVisible,
  progress,
  loadingPhrases,
  loadingIndex,
}: AnalyzingOverlayProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex flex-col items-center justify-center p-6 gap-6"
        >
          <div className="w-full max-w-xs flex flex-col items-center gap-4">
            <m.div
              key={loadingIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center min-h-[4.5rem] flex flex-col items-center justify-start px-1"
            >
              <span className="text-[9px] font-black font-space text-emerald-400 uppercase tracking-widest bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/20">
                ARCHITECT AI ACTIVE
              </span>
              <p className="text-xs font-black text-white mt-2 leading-relaxed tracking-wide">
                {loadingPhrases[loadingIndex]}
              </p>
            </m.div>

            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden border border-white/5 shadow-inner">
              <m.div
                className="h-full bg-gradient-to-r from-emerald-500 to-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.6)]"
                style={{ width: `${progress}%` }}
              />
            </div>

            <span className="text-xs font-black text-slate-500 font-space tracking-tight">
              {progress}% CALCULATED
            </span>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
