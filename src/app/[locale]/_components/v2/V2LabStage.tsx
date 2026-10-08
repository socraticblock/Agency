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
 * column left to scroll past it, so the travel *is* the extra height.
 */
export function V2LabStage({ copy, steps }: { copy: V2Copy; steps: string[] }) {
  const [active, setActive] = useState(0);
  const stepRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const pendingRef = useRef<number | null>(null);
  const progress = ((active + 1) / steps.length) * 100;

  /*
    The active step is whichever row sits nearest the middle of the screen, read
    from the rows' real positions once per frame.

    This deliberately does NOT use an IntersectionObserver. An observer callback
    carries only the elements whose intersection just changed, so a winner picked
    from that list ignores every row that was already intersecting — and with
    rows taller than the trigger band that is the common case. The panel then
    freezes on the step you just left, because the only entry in the callback is
    the row that exited (and it gets filtered out as non-intersecting). That was
    the observed fault: stubborn going backwards, step 2 especially.
    Measuring positions removes the whole failure mode — there is always exactly
    one nearest row, so the panel always has a correct answer.
  */
  useEffect(() => {
    const nodes = stepRefs.current.filter(
      (node): node is HTMLButtonElement => node !== null,
    );
    if (nodes.length === 0) return;

    let frame = 0;

    const measure = () => {
      frame = 0;

      // The stage is display:none below lg, where the card stack is showing and
      // these rows have no boxes at all. Without this guard the maths would run
      // against zero rects on every phone scroll.
      if (nodes[0].getBoundingClientRect().height === 0) return;

      const line = window.innerHeight / 2;

      if (pendingRef.current !== null) {
        const rect = nodes[pendingRef.current].getBoundingClientRect();
        // A click asks the page to scroll to that row. Wait until the scroll
        // actually settles on it before handing control back to the position
        // rule — otherwise the panel flickers through every step in between.
        if (Math.abs((rect.top + rect.bottom) / 2 - line) < 8) {
          setActive(pendingRef.current);
          pendingRef.current = null;
        }
        return;
      }

      let best = 0;
      let bestDistance = Number.POSITIVE_INFINITY;

      for (let index = 0; index < nodes.length; index += 1) {
        const rect = nodes[index].getBoundingClientRect();
        const distance = Math.abs((rect.top + rect.bottom) / 2 - line);
        if (distance < bestDistance) {
          bestDistance = distance;
          best = index;
        }
      }

      setActive((current) => (current === best ? current : best));
    };

    const schedule = () => {
      if (frame === 0) frame = window.requestAnimationFrame(measure);
    };

    // Deliberate input means any click-scroll is over: the user is driving.
    const releasePending = () => {
      pendingRef.current = null;
    };

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("wheel", releasePending, { passive: true });
    window.addEventListener("touchstart", releasePending, { passive: true });
    window.addEventListener("keydown", releasePending);

    return () => {
      if (frame !== 0) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("wheel", releasePending);
      window.removeEventListener("touchstart", releasePending);
      window.removeEventListener("keydown", releasePending);
    };
  }, []);

  const selectStep = (index: number) => {
    pendingRef.current = index;
    setActive(index);
    const node = stepRefs.current[index];
    if (!node) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // One source of truth: what makes a step active is it sitting in the middle
    // of the screen, so a click moves the page there rather than setting state
    // behind the position rule's back.
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
            gives the ~200ms cross-fade the roadmap asks for.
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
          in English lands on the Georgian page.
        */}
        <p className="sr-only" aria-live="polite">
          {steps[active]}
        </p>
      </div>
    </div>
  );
}
