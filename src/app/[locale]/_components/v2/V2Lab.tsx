import type { V2Copy } from "./hero.copy";
import { DemoState } from "./SystemDemoState";
import { V2LabStage } from "./V2LabStage";

/**
 * System in Action.
 *
 * Desktop: five tab controls driving one persistent interface stage.
 * Mobile: the same five states laid out as a scroll-through timeline, so the
 * whole story reads by scrolling — no taps required. The timeline is plain
 * server-rendered markup; only the desktop stage needs client state.
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

        <ol className="relative mt-10 border-l border-white/[.14] pl-6">
          {steps.map((step, index) => (
            <li key={step} className="v2-reveal relative pb-11 last:pb-0">
              <span
                aria-hidden
                className="absolute -left-[31px] top-1 h-3 w-3 rounded-full border border-cyan-100/50 bg-cyan-100/30 shadow-[0_0_12px_rgba(165,243,252,.35)]"
              />
              <p className="text-[9px] font-black uppercase tracking-[.18em] text-cyan-100/60">
                0{index + 1}
              </p>
              <h3 className="mt-1.5 text-2xl font-black tracking-[-.03em] text-white">{step}</h3>
              <div className="mt-4">
                <DemoState index={index} copy={copy} />
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-8 flex items-center gap-3 text-[9px] font-black uppercase tracking-[.18em] text-white/42">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-200" aria-hidden />
          {copy.lab}
        </p>
      </div>
    </>
  );
}
