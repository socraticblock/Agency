import type { ReactNode } from "react";
import { ArrowDownRight } from "lucide-react";
import type { V2Copy } from "./hero.copy";
import {
  Availability,
  Owner,
  Resolved,
  Signal,
  SiteSurface,
  Understanding,
} from "./HeroVisuals";

function StoryStep({
  index,
  label,
  title,
  children,
}: {
  index: number;
  label: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <article className="relative border-t border-white/[.08] py-14 sm:py-20 lg:py-24">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,.34fr)_minmax(0,.66fr)] lg:gap-16">
        <div className="relative lg:pr-10">
          <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[.2em] text-white/38">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-cyan-100/25 bg-cyan-100/[.04] text-cyan-100/72">
              0{index}
            </span>
            <span>{label}</span>
          </div>
          <h3 className="mt-5 max-w-[10ch] text-[clamp(2.5rem,5vw,5.2rem)] font-black leading-[.9] tracking-[-.055em]">
            {title}
          </h3>
          <div className="mt-7 flex items-center gap-3 text-[10px] font-black uppercase tracking-[.18em] text-cyan-100/45">
            <Signal quiet />
            <span>Signal</span>
          </div>
        </div>

        <div className="relative min-w-0">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-8 bg-[radial-gradient(circle_at_55%_45%,rgba(34,211,238,.055),transparent_54%)]"
          />
          <div className="relative">{children}</div>
        </div>
      </div>
    </article>
  );
}

function RequestCard({ copy }: { copy: V2Copy }) {
  return (
    <div className="w-full max-w-2xl overflow-hidden rounded-[2rem] border border-white/[.08] bg-[#0b1118] shadow-[0_30px_90px_rgba(0,0,0,.28)]">
      <div className="flex items-center justify-between gap-4 border-b border-white/[.07] px-6 py-4 text-[9px] font-black uppercase tracking-[.18em] text-white/38">
        <span>{copy.demoLabel}</span>
        <span>{copy.receive}</span>
      </div>
      <div className="p-6 sm:p-8">
        <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[.18em] text-cyan-100/62">
          <Signal />
          {copy.newEnquiry}
        </div>
        <p className="mt-6 max-w-xl text-2xl font-black leading-tight tracking-[-.035em] text-white sm:text-4xl">
          “{copy.customerMessage}”
        </p>
        <div className="mt-8 flex items-center gap-4 border-t border-white/10 pt-5 text-[10px] font-black uppercase tracking-[.18em] text-white/38">
          <span className="h-px flex-1 bg-gradient-to-r from-cyan-100/55 to-white/5" />
          {copy.route}
          <ArrowDownRight className="h-4 w-4 text-cyan-100/65" aria-hidden />
        </div>
      </div>
    </div>
  );
}

export function V2Hero({ copy }: { copy: V2Copy }) {
  const flow = [
    copy.receive,
    copy.requestUnderstood,
    copy.usefulAction,
    copy.humanJudgment,
    copy.resolved,
  ];

  return (
    <>
      <section className="relative overflow-hidden bg-[#02060b] px-5 pb-20 pt-28 text-white sm:px-8 sm:pt-32 lg:flex lg:min-h-[100svh] lg:items-center lg:pb-24 lg:pt-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_32%,rgba(34,211,238,.08),transparent_27%),radial-gradient(circle_at_16%_78%,rgba(255,255,255,.028),transparent_29%)]"
        />
        <div className="relative mx-auto w-full max-w-[92rem]">
          <div className="grid items-center gap-12 lg:grid-cols-[.78fr_1.22fr] lg:gap-16 xl:gap-24">
            <div className="v2-hero-enter">
              <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[.22em] text-white/58">
                <Signal quiet />
                <span>{copy.services}</span>
              </div>
              <h1 className="mt-6 max-w-[8ch] text-[clamp(3.5rem,8.2vw,8.5rem)] font-black leading-[.82] tracking-[-.07em]">
                {copy.hero}
              </h1>
              <p className="mt-7 max-w-xl text-[17px] leading-8 text-white/58 sm:text-lg">
                {copy.heroSub}
              </p>
              <a
                href="#work"
                className="mt-9 inline-flex min-h-12 items-center gap-3 rounded-full border border-white/15 bg-white/[.04] px-5 text-sm font-black text-white transition-[background-color,border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-white/28 hover:bg-white/[.08] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"
              >
                {copy.seeWork}
                <ArrowDownRight className="h-4 w-4 text-cyan-100/70" aria-hidden />
              </a>
            </div>

            <div className="v2-hero-enter v2-hero-enter-delay relative min-w-0">
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-10 rounded-[3rem] bg-cyan-300/[.035] blur-3xl"
              />
              <div className="relative">
                <SiteSurface copy={copy} enquiry />
                <div className="mt-4 grid gap-3 text-[9px] font-black uppercase tracking-[.16em] text-white/38 sm:grid-cols-2">
                  <div className="flex items-center gap-3 rounded-full border border-white/[.07] bg-white/[.025] px-4 py-3">
                    <Signal quiet />
                    <span>{copy.newEnquiry}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3 rounded-full border border-white/[.07] bg-white/[.025] px-4 py-3">
                    <span>{copy.requestUnderstood}</span>
                    <span className="text-cyan-100/62">→</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="v2-hero-enter v2-hero-enter-late mt-14 hidden border-y border-white/[.08] sm:grid sm:grid-cols-5">
            {flow.map((item, index) => (
              <div
                key={item}
                className="relative flex min-h-20 items-center gap-3 border-r border-white/[.08] px-4 last:border-r-0 lg:px-5"
              >
                <span className="text-[9px] font-black text-cyan-100/45">0{index + 1}</span>
                <span className="text-[10px] font-black uppercase leading-5 tracking-[.13em] text-white/46">
                  {item}
                </span>
                {index < flow.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute -right-1 top-1/2 z-10 h-2 w-2 -translate-y-1/2 rounded-full bg-cyan-200/65 shadow-[0_0_14px_rgba(165,243,252,.34)]"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="story"
        aria-labelledby="genezisi-story-title"
        className="relative overflow-hidden bg-[#02060b] px-5 pb-20 text-white sm:px-8 lg:pb-32"
      >
        <div className="mx-auto max-w-[92rem]">
          <div className="border-t border-white/[.08] py-16 sm:py-20 lg:grid lg:grid-cols-[.72fr_1.28fr] lg:gap-16 lg:py-28">
            <p className="text-[10px] font-black uppercase tracking-[.22em] text-cyan-100/52">
              {copy.systemRevealed}
            </p>
            <div className="mt-6 lg:mt-0">
              <h2
                id="genezisi-story-title"
                className="max-w-[12ch] text-[clamp(3rem,7vw,7.6rem)] font-black leading-[.84] tracking-[-.065em]"
              >
                {copy.surfaceUseful}
                <br />
                <span className="text-white/48">{copy.underneathUseful}</span>
              </h2>
              <p className="mt-7 max-w-2xl text-base leading-7 text-white/55 sm:text-lg sm:leading-8">
                {copy.resolvedOutcome}
              </p>
            </div>
          </div>

          <StoryStep index={1} label={copy.receive} title={copy.someoneAsks}>
            <RequestCard copy={copy} />
          </StoryStep>

          <StoryStep
            index={2}
            label={copy.requestUnderstood}
            title={copy.understandStep}
          >
            <div className="rounded-[2rem] border border-white/[.08] bg-[#071019] p-6 shadow-[0_30px_90px_rgba(0,0,0,.22)] sm:p-8">
              <Understanding copy={copy} />
            </div>
          </StoryStep>

          <StoryStep
            index={3}
            label={copy.usefulAction}
            title={copy.actionStep}
          >
            <Availability copy={copy} />
          </StoryStep>

          <StoryStep
            index={4}
            label={copy.humanJudgment}
            title={copy.exceptionStep}
          >
            <div className="rounded-[2rem] border border-amber-100/[.08] bg-[#080d13] p-6 shadow-[0_30px_90px_rgba(0,0,0,.22)] sm:p-8">
              <Owner copy={copy} />
            </div>
          </StoryStep>

          <StoryStep
            index={5}
            label={copy.resolved}
            title={copy.outcomeStep}
          >
            <div className="rounded-[2rem] border border-white/[.08] bg-[#050a10] px-5 py-10 sm:px-8 sm:py-14">
              <Resolved copy={copy} />
            </div>
          </StoryStep>
        </div>
      </section>
    </>
  );
}
