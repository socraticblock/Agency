import type { V2Copy } from "./hero.copy";
import { DemoState } from "./SystemDemoState";
import { V2LabStage } from "./V2LabStage";

/**
 * System in Action.
 *
 * Desktop: five tab controls driving one persistent interface stage.
 * Mobile: a sticky card stack — each step pins under the header and the next
 * slides up over it, so the five states are read one at a time by scrolling
 * alone. Pure `position: sticky` (no scroll-jacking, no autoplay, no carousel)
 * and fully server-rendered: only the desktop stage needs client state.
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

        <ol className="mt-9">
          {steps.map((step, index) => (
            <li key={step} className="sticky" style={{ top: `calc(4.5rem + ${index * 2.5}rem)` }}>
              <div
                className="mb-4 flex min-h-[420px] flex-col rounded-[26px] border border-white/[.13] bg-[#0a141f] p-5 shadow-[0_-18px_50px_rgba(0,0,0,.55)]"
                style={{ minHeight: "54svh" }}
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-cyan-100/40 bg-cyan-100/10 text-[10px] font-black text-cyan-100/85">
                    {index + 1}
                  </span>
                  <p className="truncate text-[9px] font-black uppercase tracking-[.18em] text-white/38">
                    {copy.lab}
                  </p>
                </div>

                <h3 className="mt-4 text-2xl font-black tracking-[-.03em] text-white">{step}</h3>

                <div className="mt-5">
                  <DemoState index={index} copy={copy} />
                </div>
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-4 flex items-center gap-3 text-[9px] font-black uppercase tracking-[.18em] text-white/42">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-200" aria-hidden />
          {copy.lab}
        </p>
      </div>
    </>
  );
}
