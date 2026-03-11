"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SCAN_STEPS_STANDARD = [
  "Initializing Kvali Crawler v4.0...",
  "Analyzing DOM structure for conversion bottlenecks...",
  "Mapping local search authority in Georgia...",
  "Calculating market capture deficit...",
  "Synchronizing with Digital Revenue Agents...",
  "Finalizing Infrastructure Blueprint...",
];

const SCAN_STEPS_GENESIS = [
  "No infrastructure detected. Initiating Market Gap Analysis...",
  "Scanning local Tbilisi/Batumi competitors...",
  "Calculating digital market share deficit...",
  "Mapping unclaimed local search intent...",
  "Synchronizing with Digital Revenue Agents...",
  "Finalizing Opportunity Assessment...",
];

const SCAN_DURATION_MS = 3500;
const COMPLETE_DELAY_MS = 800;

export const BoardroomScanner = ({
  isGenesis,
  onComplete,
}: {
  isGenesis: boolean;
  onComplete: () => void;
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const scanSteps = isGenesis ? SCAN_STEPS_GENESIS : SCAN_STEPS_STANDARD;

  useEffect(() => {
    const start = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      const p = Math.min((elapsed / SCAN_DURATION_MS) * 100, 100);
      setProgress(p);
      if (p >= 100) {
        clearInterval(timer);
        setTimeout(onComplete, COMPLETE_DELAY_MS);
      }
    }, 400);
    return () => clearInterval(timer);
  }, [onComplete]);

  useEffect(() => {
    const stepIndex = Math.min(
      Math.floor((progress / 100) * scanSteps.length),
      scanSteps.length - 1
    );
    setCurrentStep(stepIndex);
  }, [progress, scanSteps.length]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505]/95 backdrop-blur-2xl">
      <div className="w-full max-w-2xl px-6">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-12 shadow-2xl isolate z-10">
          <motion.div
            initial={{ top: "-10%" }}
            animate={{ top: "110%" }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00FF80]/50 to-transparent blur-sm"
          />
          <div className="relative z-10 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-[#00FF80]">
                Boardroom Analysis In Progress
              </h2>
              <span className="font-mono text-xl text-white">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="h-[2px] w-full bg-white/10">
              <motion.div
                className="h-full bg-[#00FF80] shadow-[0_0_15px_rgba(0,255,128,0.5)]"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="h-6 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentStep}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  className="font-mono text-sm text-slate-400"
                >
                  {`> `}
                  {scanSteps[currentStep]}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
