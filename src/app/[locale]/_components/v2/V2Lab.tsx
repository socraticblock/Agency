"use client";

import { useState } from "react";

type LabProps = {
  steps: string[];
  details: string[];
  customerMessage: string;
  resolvedOutcome: string;
  eyebrow: string;
  requestLabel: string;
  stateLabel: string;
};

function StepDot({ active, complete }: { active: boolean; complete: boolean }) {
  return (
    <span
      className={
        "h-3 w-3 rounded-full border transition-[background-color,border-color,box-shadow,transform] duration-300 " +
        (active
          ? "scale-110 border-cyan-100 bg-cyan-200 shadow-[0_0_20px_rgba(165,243,252,.65)]"
          : complete
            ? "border-cyan-100/45 bg-cyan-100/35"
            : "border-white/20 bg-[#02060b]")
      }
    />
  );
}

export function V2Lab({
  steps,
  details,
  customerMessage,
  resolvedOutcome,
  eyebrow,
  requestLabel,
  stateLabel,
}: LabProps) {
  const [active, setActive] = useState(0);
  const progress = ((active + 1) / steps.length) * 100;
  const complete = active === steps.length - 1;

  return (
    <>
      <div className="hidden gap-12 lg:grid lg:grid-cols-[.9fr_1.1fr] xl:gap-16">
        <div className="self-start">
          <div
            id="genezisi-lab-desktop-state"
            aria-live="polite"
            className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#071019] p-8 shadow-[0_32px_90px_rgba(0,0,0,.28)]"
          >
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
              <p className="mt-4 text-base font-semibold leading-6 text-white/72">
                “{customerMessage}”
              </p>
            </div>

            <div className="relative my-5 flex items-center gap-3" aria-hidden>
              <span className="h-px flex-1 bg-white/10" />
              <span className="h-2 w-2 rounded-full bg-cyan-200 shadow-[0_0_14px_rgba(165,243,252,.55)]" />
              <span className="h-px flex-1 bg-white/10" />
            </div>

            <div className="relative rounded-[1.45rem] bg-[#f0ece5] p-5 text-[#101114]">
              <p className="text-[9px] font-black uppercase tracking-[.18em] text-black/42">
                {stateLabel}
              </p>
              <p className="mt-3 text-2xl font-black leading-tight tracking-[-.035em]">
                {steps[active]}
              </p>
              <p className="mt-5 text-sm font-semibold leading-6 text-black/58">
                {details[active]}
              </p>
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
          <div className="pointer-events-none absolute bottom-7 left-[34px] top-7 w-px bg-white/10" />
          {steps.map((step, index) => {
            const isActive = active === index;
            const isComplete = index < active;

            return (
              <button
                key={step}
                type="button"
                onClick={() => setActive(index)}
                aria-pressed={isActive}
                aria-controls="genezisi-lab-desktop-state"
                className={
                  "group relative grid min-h-24 w-full grid-cols-[70px_1fr_auto] items-center gap-4 border-b border-white/10 py-5 text-left transition-colors duration-300 last:border-b-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200 " +
                  (isActive ? "bg-white/[.035]" : "hover:bg-white/[.018]")
                }
              >
                <span className="relative z-10 flex items-center justify-center">
                  <StepDot active={isActive} complete={isComplete} />
                </span>
                <span>
                  <span
                    className={
                      "block text-[9px] font-black uppercase tracking-[.18em] transition-colors " +
                      (isActive ? "text-cyan-100/65" : "text-white/30")
                    }
                  >
                    0{index + 1}
                  </span>
                  <span
                    className={
                      "mt-2 block max-w-2xl text-2xl font-black tracking-[-.02em] transition-[color,transform] duration-300 " +
                      (isActive ? "translate-x-1 text-white" : "text-white/58")
                    }
                  >
                    {step}
                  </span>
                </span>
                <span
                  aria-hidden
                  className={
                    "mr-2 text-sm font-black transition-colors " +
                    (isActive ? "text-cyan-100/62" : "text-white/20")
                  }
                >
                  {isActive ? "●" : isComplete ? "✓" : "→"}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="border-y border-white/10 lg:hidden">
        {steps.map((step, index) => {
          const isActive = active === index;
          const isComplete = index < active;
          const panelId = `genezisi-lab-panel-${index}`;
          const buttonId = `genezisi-lab-button-${index}`;

          return (
            <div key={step} className="border-b border-white/10 last:border-b-0">
              <button
                id={buttonId}
                type="button"
                onClick={() => setActive(index)}
                aria-expanded={isActive}
                aria-controls={panelId}
                className="grid min-h-20 w-full grid-cols-[34px_1fr_auto] items-center gap-3 py-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"
              >
                <span className="flex items-center justify-center">
                  <StepDot active={isActive} complete={isComplete} />
                </span>
                <span>
                  <span
                    className={
                      "block text-[9px] font-black uppercase tracking-[.18em] transition-colors duration-300 " +
                      (isActive ? "text-cyan-100/65" : "text-white/30")
                    }
                  >
                    0{index + 1}
                  </span>
                  <span
                    className={
                      "mt-1.5 block text-xl font-black tracking-[-.025em] transition-colors duration-300 " +
                      (isActive ? "text-white" : "text-white/58")
                    }
                  >
                    {step}
                  </span>
                </span>
                <span
                  aria-hidden
                  className={
                    "mr-1 text-lg transition-[color,transform] duration-300 " +
                    (isActive ? "rotate-45 text-cyan-100/70" : "text-white/24")
                  }
                >
                  +
                </span>
              </button>

              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                aria-hidden={!isActive}
                className={
                  "grid transition-[grid-template-rows,opacity] duration-[420ms] ease-[cubic-bezier(.22,1,.36,1)] " +
                  (isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")
                }
              >
                <div className="overflow-hidden">
                  <div
                    className={
                      "mb-6 ml-[34px] rounded-[1.35rem] border border-white/[.08] bg-[#071019] p-5 transition-transform duration-[420ms] ease-[cubic-bezier(.22,1,.36,1)] " +
                      (isActive ? "translate-y-0" : "-translate-y-2")
                    }
                  >
                    {index === 0 && (
                      <div className="mb-4 rounded-xl border border-white/[.07] bg-white/[.035] p-4">
                        <p className="text-[9px] font-black uppercase tracking-[.18em] text-cyan-100/58">
                          {requestLabel}
                        </p>
                        <p className="mt-3 text-sm font-semibold leading-6 text-white/68">
                          “{customerMessage}”
                        </p>
                      </div>
                    )}

                    <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-[.18em] text-cyan-100/58">
                      <span className="h-2 w-2 rounded-full bg-cyan-200 shadow-[0_0_16px_rgba(165,243,252,.55)]" />
                      {stateLabel}
                    </div>
                    <p className="mt-4 text-lg font-black tracking-[-.02em] text-white">
                      {step}
                    </p>
                    <p className="mt-3 text-sm font-semibold leading-6 text-white/58">
                      {details[index]}
                    </p>

                    {index === steps.length - 1 && (
                      <p className="mt-4 border-t border-white/10 pt-4 text-sm font-semibold leading-6 text-white/68">
                        {resolvedOutcome}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
