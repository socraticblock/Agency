"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info } from "lucide-react";

export interface AuditCitationProps {
  source: string;
  explanation: string;
  dataPoint: string;
}

export function AuditCitation({ source, explanation, dataPoint }: AuditCitationProps) {
  return (
    <div className="mt-4 rounded-xl bg-white/[0.02] border border-white/5 p-4 relative overflow-hidden">
      {/* GLOW BAR AT TOP */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />

      <div className="space-y-2 relative z-10">
        <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-emerald-400">
          <Info className="h-3.5 w-3.5" />
          <span>The Science</span>
        </div>

        <p className="text-sm font-semibold text-slate-100 leading-snug">
          "{dataPoint}"
        </p>

        <p className="text-xs text-slate-400 leading-relaxed">
          {explanation}
        </p>

        <div className="flex items-center gap-1 text-[9px] text-slate-500 pt-1.5 border-t border-white/5 mt-1">
          <span>Verified Source:</span>
          <span className="font-medium text-emerald-300/80 font-mono">{source}</span>
        </div>
      </div>
    </div>
  );
}
