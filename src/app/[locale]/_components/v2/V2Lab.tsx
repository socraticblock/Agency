"use client";

import { useState } from "react";

export function V2Lab({
  steps,
  details,
  customerMessage,
  resolvedOutcome,
  eyebrow,
  requestLabel,
  stateLabel,
}: {
  steps: string[];
  details: string[];
  customerMessage: string;
  resolvedOutcome: string;
  eyebrow: string;
  requestLabel: string;
  stateLabel: string;
}) {
  const [active, setActive] = useState(0);
  const progress = ((active + 1) / steps.length) * 100;
  const complete = active === steps.length - 1;

  return (
    <div className="grid gap-10 lg:grid-cols-[.88fr_1.12fr] lg:gap-16">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#071019] p-6 shadow-[0_32px_90px_rgba(0,0,0,.28)] sm:p-8">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_16%,rgba(165,243,252,.09),transparent_26%)]" />

          <div className="relative flex items-center justify-between gap-4 text-[9px] font-black uppercase tracking-[.2em] text-white/42">
            <span>{eyebrow}</span>
            <span>0{active + 1} / 0{steps.length}</span>
          </div>

          <div className="relative mt-8 rounded-[1.45rem] border border-white/[.08] bg-white/[.035] p-5">
            <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-[.18em] text-cyan-100/62">
              <span className="h-2.5 w-2.5 rounded-full bg-cyan-200 shadow-[0_0_20px_rgba(165,243,252,.65)]" />
              {requestLabel}
            </div>
            <p className="mt-4 text-base font-semibold leading-6 text-white/72">“{customerMessage}”</p>
          </div>

          <div className="relative my-5 flex items-center gap-3" aria-hidden>
            <span className="h-px flex-1 bg-white/10" />
            <span className="h-2 w-2 rounded-full bg-cyan-200 shadow-[0_0_14px_rgba(165,243,252,.55)]" />
            <span className="h-px flex-1 bg-white/10" />
          </div>

          <div className="relative rounded-[1.45rem] bg-[#f0ece5] p-5 text-[#101114]">
            <p className="text-[9px] font-black uppercase tracking-[.18em] text-black/42">{stateLabel}</p>
            <p className="mt-3 text-2xl font-black leading-tight tracking-[-.035em]">{steps[active]}</p>
            <p className="mt-5 text-sm font-semibold leading-6 text-black/58">{details[active]}</p>
            {complete && (
              <div className="mt-5 border-t border-black/10 pt-5 text-sm font-semibold leading-6 text-black/62">
                {resolvedOutcome}
              </div>
            )}
          </div>

          <div className="relative mt-8 h-px overflow-hidden bg-white/10">
            <div
              className="h-px bg-cyan-100/75 transition-[width] duration-500 ease-out"
              style={{ width: progress + "%" }}
            />
          </div>
        </div>
      </div>

      <div className="relative border-y border-white/10">
        <div className="pointer-events-none absolute bottom-7 left-[23px] top-7 w-px bg-white/10 sm:left-[34px]" />
        {steps.map((step, index) => {
          const isActive = active === index;
          const isComplete = index < active;

          return (
            <button
              key={step}
              type="button"
              onClick={() => setActive(index)}
              onFocus={() => setActive(index)}
              onMouseEnter={() => setActive(index)}
              aria-pressed={isActive}
              className="group relative grid min-h-24 w-full grid-cols-[48px_1fr_auto] items-center gap-4 border-b border-white/10 py-5 text-left last:border-b-0 sm:grid-cols-[70px_1fr_auto] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"
            >
              <span className="relative z-10 flex items-center justify-center">
                <span
                  className={
                    "h-3 w-3 rounded-full border transition-[background-color,border-color,box-shadow,transform] duration-300 " +
                    (isActive
                      ? "scale-110 border-cyan-100 bg-cyan-200 shadow-[0_0_20px_rgba(165,243,252,.65)]"
                      : isComplete
                        ? "border-cyan-100/45 bg-cyan-100/35"
                        : "border-white/20 bg-[#02060b]")
                  }
                />
              </span>
              <span>
                <span className={"block text-[9px] font-black uppercase tracking-[.18em] transition-colors " + (isActive ? "text-cyan-100/65" : "text-white/30")}>
                  0{index + 1}
                </span>
                <span className={"mt-2 block max-w-2xl text-xl font-black tracking-[-.02em] transition-[color,transform] duration-300 sm:text-2xl " + (isActive ? "translate-x-1 text-white" : "text-white/58")}>
                  {step}
                </span>
              </span>
              <span
                aria-hidden
                className={"mr-2 text-sm font-black transition-colors " + (isActive ? "text-cyan-100/62" : "text-white/20")}
              >
                {isActive ? "●" : isComplete ? "✓" : "→"}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
