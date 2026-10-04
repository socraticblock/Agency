"use client";

import { useLayoutEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import type { V2Copy } from "./hero.copy";
import {
  createDesktopSignalTimeline,
  createMobileSignalTimeline,
} from "./hero.timeline";
import {
  Availability,
  MobileSurfacePreview,
  Owner,
  Resolved,
  Signal,
  SiteSurface,
  StaticStory,
  Understanding,
} from "./HeroVisuals";

export function V2Hero({ copy }: { copy: V2Copy }) {
  const desktopStoryRef = useRef<HTMLDivElement>(null);
  const mobileStoryRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (reduceMotion) return;
    const cleanDesktop = createDesktopSignalTimeline(desktopStoryRef.current);
    const cleanMobile = createMobileSignalTimeline(mobileStoryRef.current);
    return () => {
      cleanDesktop();
      cleanMobile();
    };
  }, [reduceMotion]);

  if (reduceMotion) {
    return <StaticStory copy={copy} />;
  }

  return (
    <>
      <div ref={desktopStoryRef} className="relative hidden h-[360svh] lg:block">
        <div className="sticky top-0 h-[100svh] overflow-hidden bg-[#02060b] px-12 pt-24">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_74%_32%,rgba(34,211,238,.07),transparent_28%)]" />
          <div className="relative mx-auto h-full max-w-[92rem]">
            <svg aria-hidden className="pointer-events-none absolute inset-0 z-10 h-full w-full" viewBox="0 0 1400 800" preserveAspectRatio="none">
              <path data-signal-path d="M1010 270 C1120 260 1165 350 1070 420 S940 535 1045 585 C900 625 610 635 355 585" fill="none" stroke="rgba(255,255,255,.09)" strokeWidth="2" strokeDasharray="5 9" />
              <path data-signal-active pathLength="1" strokeDasharray="1" strokeDashoffset="1" d="M1010 270 C1120 260 1165 350 1070 420 S940 535 1045 585 C900 625 610 635 355 585" fill="none" stroke="rgba(165,243,252,.72)" strokeWidth="2.5" strokeLinecap="round" />
            </svg>

            <div data-hero-intro className="absolute left-0 top-[15%] z-30 w-[42%] max-w-[44rem]">
              <p className="text-[10px] font-black uppercase tracking-[.22em] text-white/60">{copy.services}</p>
              <h1 className="mt-5 max-w-[7ch] text-[clamp(4.8rem,7.2vw,8.2rem)] font-black leading-[.84] tracking-[-.065em]">{copy.hero}</h1>
              <p className="mt-7 max-w-md text-base leading-7 text-white/55">{copy.heroSub}</p>
            </div>

            <div data-hero-surface className="absolute right-0 top-[20%] z-40 w-[54%] origin-right">
              <SiteSurface copy={copy} enquiry deferredEnquiry />
            </div>

            <div data-hero-system className="absolute right-[4%] top-[31%] z-20 w-[36%] opacity-0"><Understanding copy={copy} /></div>
            <div data-hero-action className="absolute bottom-[10%] right-[7%] z-30 w-[34%] opacity-0"><Availability copy={copy} /></div>
            <div data-hero-owner className="absolute bottom-[13%] left-[7%] z-30 w-[32%] opacity-0"><Owner copy={copy} /></div>
            <div data-hero-resolved className="absolute inset-x-0 top-1/2 z-50 -translate-y-1/2 opacity-0"><Resolved copy={copy} /></div>

            <div data-hero-signal aria-hidden className="pointer-events-none absolute left-0 top-0 z-[70] opacity-0">
              <div className="flex items-center gap-3"><span className="text-[9px] font-black uppercase tracking-[.18em] text-cyan-100/60">Signal</span><Signal /></div>
            </div>

            <div className="absolute bottom-7 left-0 right-0 flex justify-between text-[9px] font-black uppercase tracking-[.2em] text-white/30"><span>{copy.receive}</span><span>{copy.route}</span><span>{copy.humanJudgment}</span><span>{copy.resolved}</span></div>
          </div>
        </div>
      </div>

      <div ref={mobileStoryRef} className="relative h-[280svh] lg:hidden">
        <div className="sticky top-0 h-[100svh] overflow-hidden bg-[#02060b] px-5 pb-8 pt-24 sm:px-8">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_25%,rgba(34,211,238,.065),transparent_32%)]" />
          <div data-mobile-signal aria-hidden className="pointer-events-none absolute right-5 top-[26%] z-40 flex items-center gap-2 opacity-0 sm:right-8"><span className="text-[8px] font-black uppercase tracking-[.16em] text-cyan-100/60">Signal</span><Signal /></div>

          <div data-mobile-step className="absolute inset-x-5 top-24 bottom-8 flex flex-col justify-center sm:inset-x-8">
            <p className="text-[10px] font-black uppercase tracking-[.22em] text-white/60">{copy.services}</p>
            <h1 className="mt-5 max-w-[8ch] text-[clamp(3.2rem,13vw,5.5rem)] font-black leading-[.84] tracking-[-.065em]">{copy.hero}</h1>
            <p className="mt-6 max-w-md text-[17px] leading-7 text-white/60">{copy.heroSub}</p>
            <MobileSurfacePreview copy={copy} />
          </div>

          <div data-mobile-step className="absolute inset-x-5 top-24 bottom-8 flex flex-col justify-center opacity-0 sm:inset-x-8">
            <p className="text-[10px] font-black uppercase tracking-[.2em] text-cyan-100/65">{copy.receive}</p>
            <h2 className="mt-4 text-5xl font-black tracking-[-.05em]">{copy.someoneAsks}</h2>
            <div className="mt-8 rounded-[1.6rem] bg-[#11151a] p-6 shadow-2xl"><div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[.18em] text-white/60"><Signal /> {copy.newEnquiry}</div><p className="mt-5 text-2xl font-black leading-tight">“{copy.customerMessage}”</p></div>
          </div>

          <div data-mobile-step className="absolute inset-x-5 top-24 bottom-8 flex items-center opacity-0 sm:inset-x-8"><Understanding copy={copy} /></div>
          <div data-mobile-step className="absolute inset-x-5 top-24 bottom-8 flex items-center opacity-0 sm:inset-x-8"><Availability copy={copy} /></div>
          <div data-mobile-step className="absolute inset-x-5 top-24 bottom-8 flex items-center opacity-0 sm:inset-x-8"><Owner copy={copy} /></div>
          <div data-mobile-step className="absolute inset-x-5 top-24 bottom-8 flex items-center opacity-0 sm:inset-x-8"><Resolved copy={copy} /></div>
        </div>
      </div>
    </>
  );
}
