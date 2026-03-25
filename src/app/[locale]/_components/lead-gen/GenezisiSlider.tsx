"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface GenezisiSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (val: number) => void;
  suffix?: string;
  formatValue?: (val: number) => string;
}

export function GenezisiSlider({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  suffix = "",
  formatValue,
}: GenezisiSliderProps) {
  const [isTapping, setIsTapping] = useState(false);
  const percentage = ((value - min) / (max - min)) * 100;

  // For zero-lag visuals, we track the percentage
  const springConfig = { damping: 25, stiffness: 300 };
  const animatedPercentage = useSpring(percentage, springConfig);

  useEffect(() => {
    animatedPercentage.set(percentage);
  }, [percentage, animatedPercentage]);

  return (
    <div className="group relative flex flex-col gap-3">
      {/* Label and Value - Flex-col on mobile, between on destkop */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <label className="text-xs font-black uppercase tracking-widest text-slate-500 font-space">
          {label}
        </label>
        <span className="font-space text-sm font-black text-emerald-400">
          {formatValue ? formatValue(value) : value.toLocaleString()}{suffix}
        </span>
      </div>

      <div className="relative h-11 flex items-center">
        {/* Progress Track Background */}
        <div className="absolute h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
             {/* Progress Glow Fill */}
             <motion.div 
                className="h-full bg-gradient-to-r from-emerald-500/20 to-emerald-400"
                style={{ width: `${percentage}%` }}
             />
        </div>

        {/* The Native Input - Invisible but handles events */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          onPointerDown={() => setIsTapping(true)}
          onPointerUp={() => setIsTapping(false)}
          className="absolute inset-0 z-20 w-full cursor-pointer opacity-0"
          style={{ height: '44px' }} // The 44px Thumb Protocol hit-area
        />

        {/* Visual Custom Thumb */}
        <motion.div
           aria-hidden="true"
           className="absolute z-10 pointer-events-none"
           style={{ left: `calc(${percentage}% - 12px)` }}
           animate={{
              scale: isTapping ? 1.25 : 1, // Kinetic Affirmation
              boxShadow: isTapping 
                ? "0 0 25px rgba(16,185,129,0.5), 0 0 10px rgba(16,185,129,0.3)" 
                : "0 0 15px rgba(16,185,129,0.2)"
           }}
           transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
            <div className="h-6 w-6 rounded-full border-2 border-emerald-400 bg-zinc-950 flex items-center justify-center p-1 relative">
                <div className="h-full w-full rounded-full bg-emerald-400 shadow-[inset_0_0_8px_rgba(0,0,0,0.5)]" />
                
                {/* Micro-glow pulse */}
                <span className="absolute inset-0 rounded-full bg-emerald-400/20 animate-ping opacity-20" />
            </div>
        </motion.div>
      </div>

      <style jsx>{`
        /* Extra safety to ensure the native thumb spans the full height for the hit-box */
        input[type="range"]::-webkit-slider-thumb {
          width: 44px;
          height: 44px;
          -webkit-appearance: none;
        }
        input[type="range"]::-moz-range-thumb {
          width: 44px;
          height: 44px;
          border: none;
        }
      `}</style>
    </div>
  );
}
