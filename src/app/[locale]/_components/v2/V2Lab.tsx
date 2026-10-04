"use client";

import { useState } from "react";

export function V2Lab({
  steps,
  customerMessage,
  resolvedOutcome,
}: {
  steps: string[];
  customerMessage: string;
  resolvedOutcome: string;
}) {
  const [active, setActive] = useState(0);

  return (
    <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr]">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <div className="rounded-[1.8rem] border border-white/10 bg-white/[.025] p-6 sm:p-7">
          <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-[.2em] text-cyan-100/60">
            <span className="h-2.5 w-2.5 rounded-full bg-cyan-200 shadow-[0_0_16px_rgba(165,243,252,.65)]" />
            0{active + 1} / 0{steps.length}
          </div>
          <p className="mt-7 text-sm leading-6 text-white/50">“{customerMessage}”</p>
          <p className="mt-5 text-3xl font-black leading-tight tracking-[-.035em]">{steps[active]}</p>
          <div className="mt-8 h-px bg-white/10">
            <div
              className="h-px bg-cyan-100/70 transition-[width] duration-500 ease-out"
              style={{ width: ((active + 1) / steps.length) * 100 + "%" }}
            />
          </div>
          <p className="mt-7 text-sm leading-6 text-white/55">{resolvedOutcome}</p>
        </div>
      </div>

      <div className="border-y border-white/10">
        {steps.map((step, index) => {
          const isActive = active === index;
          return (
            <button
              key={step}
              type="button"
              onClick={() => setActive(index)}
              onFocus={() => setActive(index)}
              onMouseEnter={() => setActive(index)}
              aria-pressed={isActive}
              className="group grid min-h-24 w-full grid-cols-[48px_1fr_auto] items-center gap-4 border-b border-white/10 py-5 text-left last:border-b-0 sm:grid-cols-[70px_1fr_auto] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"
            >
              <span className={"text-[10px] font-black transition-colors " + (isActive ? "text-cyan-100" : "text-white/40")}>
                0{index + 1}
              </span>
              <span className={"max-w-2xl text-xl font-black tracking-[-.02em] transition-colors sm:text-2xl " + (isActive ? "text-white" : "text-white/58")}>
                {step}
              </span>
              <span
                aria-hidden
                className={
                  "mr-2 h-2.5 w-2.5 rounded-full transition-[background-color,box-shadow,transform] duration-300 " +
                  (isActive
                    ? "scale-100 bg-cyan-200 shadow-[0_0_18px_rgba(165,243,252,.6)]"
                    : "scale-75 bg-white/15")
                }
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
