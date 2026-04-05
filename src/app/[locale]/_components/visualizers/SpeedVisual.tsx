"use client";

import { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

// --- Animated Lighthouse Score Helper ---
interface AnimatedLighthouseScoreProps {
  value: number;
  duration?: number;
  small?: boolean;
}

export function AnimatedLighthouseScore({ value, duration = 0.8, small = false }: AnimatedLighthouseScoreProps) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(count, value, {
      duration,
      ease: "circOut",
    });
    
    const unsubscribe = rounded.on("change", (v) => setDisplayValue(v));
    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [count, value, duration, rounded]);

  const size = small ? "w-20 h-20" : "w-28 h-28";
  const strokeWidth = small ? "4" : "6";
  const radius = small ? "32" : "45";
  const textSize = small ? "text-xl" : "text-3xl";
  const viewbox = small ? "0 0 80 80" : "0 0 112 112";
  const center = small ? "40" : "56";

  return (
    <div className={`relative flex items-center justify-center ${size}`}>
      <svg className="absolute w-full h-full -rotate-90" viewBox={viewbox}>
        <circle cx={center} cy={center} r={radius} className="stroke-emerald-400/10" strokeWidth={strokeWidth} fill="transparent" />
        <motion.circle
          cx={center}
          cy={center}
          r={radius}
          className="stroke-emerald-400"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: value / 100 }}
          transition={{ duration, ease: "circOut" }}
        />
      </svg>
      <div className="flex flex-col items-center justify-center z-10">
        <div className={`${textSize} font-black font-space text-emerald-300`}>{displayValue}</div>
        {!small && <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest mt-0.5">PERFORMANCE</span>}
      </div>
    </div>
  );
}

export function SpeedVisual() {
  return (
    <div className="flex flex-col items-center gap-4">
      <AnimatedLighthouseScore value={100} duration={0.8} />
      <div className="px-5 py-3 rounded-2xl border border-white/10 bg-[#0a0a0a] flex items-center gap-4">
        <div className="h-4 w-4 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-sm font-bold text-white">Next.js Edge Speed</span>
      </div>
      <div className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 mt-2">✅ Core Web Vitals Passed</div>
    </div>
  );
}
