"use client";

import { motion } from "framer-motion";
import { Lock } from "lucide-react";

export function BridgeVisual() {
  return (
    <div className="w-full h-full flex items-center justify-center p-2">
      <div className="relative w-full max-w-[340px] flex justify-between items-center">
        <div className="flex flex-col gap-4 z-10">
          {["Instagram", "TikTok", "Facebook"].map((item) => (
            <motion.div
              key={item}
              className="px-3 py-1.5 rounded-xl border border-white/5 bg-white/5 flex items-center gap-2 text-[10px] font-bold text-slate-300"
            >
              <div className="h-1.5 w-1.5 rounded-full bg-blue-400" />
              {item}
            </motion.div>
          ))}
        </div>
        <div className="absolute inset-0">
          <svg className="w-full h-full" viewBox="0 0 340 180">
            {[40, 75, 110].map((y, i) => (
              <motion.path
                key={i}
                d={`M 110 ${y} Q 170 ${y} 210 90`}
                fill="transparent"
                className="stroke-emerald-400/20"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: i * 0.2 }}
              />
            ))}
          </svg>
        </div>
        <motion.div className="glass-card flex flex-col items-center justify-center p-3 rounded-2xl border border-emerald-400/20 w-[110px] h-[110px] z-10">
          <Lock className="h-6 w-6 text-emerald-400 mb-1" />
          <div className="text-[10px] font-bold text-white">Your Platform</div>
          <div className="text-[8px] font-mono text-emerald-300 mt-1 uppercase">100% Owned</div>
        </motion.div>
      </div>
    </div>
  );
}
