"use client";

import { useEffect, useRef, useState } from "react";
import type { V2Copy } from "./hero.copy";
import { DemoState, StepDot } from "./SystemDemoState";

/**
 * Desktop / tablet-landscape only: the five steps as a column that scrolls past
 * one persistent interface stage. Mobile uses a scroll-through card stack
 * instead (see V2Lab).
 *
 * The step column is deliberately taller than the viewport. That height is the
 * whole mechanism: a sticky panel can only "follow the screen" while there is
 * column left to scroll past it, so the travel *is* the extra height — roughly
 * (+50px per row) of follow. Each row already needed about that much to read as
 * a step rather than a flicker, so the same height does both jobs.
 */
export function V2LabStage({ copy, steps }: { copy: V2Copy; steps: string[] }) {
  const [active, setActive] = useState(0);
  const stepRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const progress = ((active + 1) / steps.length) * 100;

  useEffect(() => {
    const nodes = stepRefs.current.filter(
      (node): node is HTMLButtonElement => node !== null,
    );
    if (nodes.length === 0) return;

    // A narrow band across the middle of the viewport decides the active step.
    // Of whatever falls inside that band, the block nearest dead centre wins.
    const observer = new IntersectionObserver(
      (entries) => {
        const inBand = entries.filter((entry) => entry.isIntersecting);
        if (inBand.length === 0) return;

        const centre = window.innerHeight / 2;
        let best = -1;
        let bestDistance = Number.POSITIVE_INFINITY;

        for (const entry of inBand) {
          const index = Number((entry.target as HTMLElement).dataset.step);
          if (!Number.isInteger(index)) continue;
          const { top, bottom } = entry.boundingClientRect;
          const distance = Math.abs((top + bottom) / 2 - centre);
          if (distance < bestDistance) {
            bestDistance = distance;
            best = index;
          }
        }

        if (best >= 0) setActive(best);
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const selectStep = (index: number) => {
    setActive(index);
    const node = stepRefs.current[index];
    if (!node) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // One source of truth: what activates a step is it sitting in the middle of
    // the viewport, so a click moves the page there instead of fighting the
    // observer the next time the user scrolls.
    node.scrollIntoView({ block: "center", behavior: reduced ? "auto" : "smooth" });
  };

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
                ref={(node) => {
                  stepRefs.current[index] = node;
                }}
                data-step={index}
                onClick={() => selectStep(index)}
                aria-pressed={isActive}
                aria-controls="genezisi-lab-desktop-state"
                className={
                  "group relative grid min-h-[130px] w-full grid-cols-[70px_1fr_auto] items-center gap-4 border-b border-white/10 py-5 text-left transition-colors duration-300 last:border-b-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200 " +
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

      <div className="sticky top-24 self-start">
        <div
          id="genezisi-lab-desktop-state"
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

          {/*
            All five states share one grid cell, so the panel is always as tall
            as the tallest state and never resizes under the reader. That also
            gives the ~200ms cross-fade the roadmap asks for — and it replaces
            an abrupt content swap, which was the only place on the page where a
            click produced no motion at all.
          */}
          <div className="relative mt-7 grid">
            {steps.map((step, index) => (
              <div
                key={step}
                aria-hidden={index !== active}
                className={
                  "col-start-1 row-start-1 transition-[opacity,transform] duration-200 ease-out " +
                  (index === active
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none translate-y-1.5 opacity-0")
                }
              >
                <DemoState index={index} copy={copy} />
              </div>
            ))}
          </div>

          <div className="relative mt-8 h-px overflow-hidden bg-white/10" aria-hidden>
            <div
              className="h-px bg-cyan-100/75 transition-[width] duration-500 ease-out"
              style={{ width: progress + "%" }}
            />
          </div>
        </div>

        {/*
          Announces the step that just became active, in the reader's own
          language — the titles come from the locale copy, so nothing hard-coded
          in English lands on the Georgian page. Deliberately not on the panel
          itself: an aria-live on the whole panel re-reads the counter and every
          demo field on each change.
        */}
        <p className="sr-only" aria-live="polite">
          {steps[active]}
        </p>
      </div>
    </div>
  );
}
