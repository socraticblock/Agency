"use client";

import { useState } from "react";
import type { V2Copy } from "./hero.copy";
import { DemoState, StepDot } from "./SystemDemoState";

/**
 * Desktop only: the five steps as tabs driving one persistent interface stage.
 * Mobile uses a scroll-through timeline instead (see V2Lab).
 */
export function V2LabStage({ copy, steps }: { copy: V2Copy; steps: string[] }) {
  const [active, setActive] = useState(0);
  const progress = ((active + 1) / steps.length) * 100;

  return (
    <div className="grid gap-12 lg:grid-cols-[.92fr_1.08fr] xl:gap-16">
      <div className="self-start">
        <p className="text-[11px] font-extrabold uppercase tracking-[.2em] text-cyan-100/58">
          {copy.systemEyebrow}
        </p>
        <h2 className="mt-5 max-w-[12ch] text-[clamp(3rem,4.4vw,4.6rem)] font-black leading-[.92] tracking-[-.055em]">
          {copy.labTitle}
        </h2>

        <div className="relative mt-10 border-y border-white/10">
          <div className="pointer-events-none absolute bottom-7 left-[34px] top-7 w-px bg-white/10" aria-hidden />
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
                  "group relative grid min-h-20 w-full grid-cols-[70px_1fr_auto] items-center gap-4 border-b border-white/10 py-5 text-left transition-colors duration-300 last:border-b-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200 " +
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

      <div className="self-start">
        <div
          id="genezisi-lab-desktop-state"
          aria-live="polite"
          className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#071019] p-8 shadow-[0_32px_90px_rgba(0,0,0,.28)]"
        >
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_16%,rgba(165,243,252,.09),transparent_26%)]"
            aria-hidden
          />

          <div className="relative flex items-center justify-between gap-4 text-[9px] font-black uppercase tracking-[.2em] text-white/42">
            <span>{copy.lab}</span>
            <span>
              0{active + 1} / 0{steps.length}
            </span>
          </div>

          <div className="relative mt-7">
            <DemoState index={active} copy={copy} />
          </div>

          <div className="relative mt-8 h-px overflow-hidden bg-white/10" aria-hidden>
            <div
              className="h-px bg-cyan-100/75 transition-[width] duration-500 ease-out"
              style={{ width: progress + "%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
