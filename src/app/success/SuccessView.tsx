"use client";

import { useEffect, useState } from "react";

function useCountdown(targetMs: number) {
  const [remaining, setRemaining] = useState(targetMs);

  useEffect(() => {
    const end = Date.now() + targetMs;
    const tick = () => {
      const left = Math.max(0, end - Date.now());
      setRemaining(left);
      if (left > 0) requestAnimationFrame(tick);
    };
    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [targetMs]);

  const h = Math.floor(remaining / (1000 * 60 * 60));
  const m = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
  return { hours: h, minutes: m };
}

export default function SuccessView() {
  const twentyFourHours = 24 * 60 * 60 * 1000;
  const { hours, minutes } = useCountdown(twentyFourHours);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#050505] px-6 text-center">
      <div className="noise-overlay" aria-hidden />

      <div className="relative z-10 mb-8 flex h-28 w-28 items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-emerald-500/20 shadow-[0_0_60px_rgba(16,185,129,0.4)]" />
        <div className="absolute flex h-24 w-24 items-center justify-center rounded-full border-2 border-emerald-500/50 shadow-[0_0_40px_rgba(16,185,129,0.3),inset_0_2px_10px_rgba(0,0,0,0.3)]">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-12 w-12 text-emerald-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
      </div>

      <h1 className="relative z-10 mb-4 text-4xl font-black uppercase tracking-tight text-white">
        Sovereignty Initialized.
      </h1>

      <p className="relative z-10 mb-8 max-w-md font-mono text-sm leading-relaxed text-slate-300">
        Your environment is currently being architected on the edge.
        <br />
        <br />
        <span className="bg-slate-900 px-2 py-1 text-white">Notice:</span> Our
        Lead Architect will contact you via WhatsApp or Email within{" "}
        <span className="font-semibold">24 hours</span> to begin the extraction.
      </p>

      <p className="relative z-10 font-mono text-sm uppercase tracking-[0.2em] text-emerald-400">
        Architect contact in{" "}
        <span className="tabular-nums text-white">
          {hours}h {minutes}m
        </span>
      </p>

      <div className="relative z-10 mt-12 h-1 w-64 overflow-hidden rounded-full bg-slate-900">
        <div
          className="h-full bg-emerald-500 transition-[width] duration-1000"
          style={{ width: "1%" }}
        />
      </div>
      <p className="relative z-10 mt-3 text-[10px] uppercase tracking-[0.2em] text-zinc-500">
        Infrastructure scaffolding...
      </p>
    </div>
  );
}
