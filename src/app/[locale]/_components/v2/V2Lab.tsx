import type { CSSProperties } from "react";
import type { V2Copy } from "./hero.copy";
import { DemoState } from "./SystemDemoState";
import { V2LabStage } from "./V2LabStage";

/**
 * Each card's morph window, as a percentage of the stack's own scroll progress
 * (the stack's `cover` range). Derived from the card pitch: with 54svh cards the
 * per-card cycle is ~14.7% of that range at any viewport height, and the morph
 * must finish just before the next card covers the title.
 *
 * The last card is never covered, so it gets no window and no header title.
 */
const MORPH_RANGES: ReadonlyArray<{ from: string; to: string }> = [
  { from: "15%", to: "36%" },
  { from: "30%", to: "50%" },
  { from: "44%", to: "63%" },
  { from: "59%", to: "77%" },
];

type StackCardStyle = CSSProperties & { [key: `--${string}`]: string };

/**
 * System in Action.
 *
 * Desktop: five tab controls driving one persistent interface stage.
 * Mobile: a sticky card stack — each step pins under the header and the next
 * slides up over it, so the five states are read one at a time by scrolling
 * alone. As a card is covered, its display title condenses into the small title
 * beside its number (see `globals.css`; a no-op on browsers without
 * scroll-driven animations).
 *
 * Pure `position: sticky` — no scroll-jacking, no autoplay, no carousel — and
 * fully server-rendered: only the desktop stage needs client state.
 */
export function V2Lab({ copy }: { copy: V2Copy }) {
  const steps = [
    copy.receiveStep,
    copy.understandStep,
    copy.actionStep,
    copy.exceptionStep,
    copy.outcomeStep,
  ];

  return (
    <>
      <div className="hidden lg:block">
        <V2LabStage copy={copy} steps={steps} />
      </div>

      <div className="lg:hidden">
        <p className="text-[11px] font-extrabold uppercase tracking-[.2em] text-cyan-100/58">
          {copy.systemEyebrow}
        </p>
        <h2 className="mt-5 max-w-[14ch] text-[clamp(2.6rem,9vw,3.4rem)] font-black leading-[.92] tracking-[-.05em]">
          {copy.labTitle}
        </h2>
        <p className="mt-4 text-[10px] font-black uppercase tracking-[.18em] text-white/38">
          {copy.lab}
        </p>

        <ol className="v2-stack mt-9">
          {steps.map((step, index) => {
            const range = MORPH_RANGES[index];
            const cardStyle: StackCardStyle = {
              minHeight: "54svh",
              ...(range ? { "--v2-from": range.from, "--v2-to": range.to } : {}),
            };

            return (
              <li key={step} className="sticky" style={{ top: `calc(4.5rem + ${index * 2.5}rem)` }}>
                <div
                  className="mb-4 flex min-h-[420px] flex-col rounded-[26px] border border-white/[.13] bg-[#0a141f] p-5 shadow-[0_-18px_50px_rgba(0,0,0,.55)]"
                  style={cardStyle}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-cyan-100/40 bg-cyan-100/10 text-[10px] font-black text-cyan-100/85">
                      {index + 1}
                    </span>
                    {range && (
                      <h4 className="v2-title-sm truncate text-sm font-bold tracking-[-.01em] text-white">
                        {step}
                      </h4>
                    )}
                  </div>

                  <h3 className="v2-title-lg mt-4 text-2xl font-black tracking-[-.03em] text-white">
                    {step}
                  </h3>

                  <div className="mt-5">
                    <DemoState index={index} copy={copy} />
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </>
  );
}
