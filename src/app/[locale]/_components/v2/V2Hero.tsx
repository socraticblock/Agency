"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import type { V2Copy } from "./hero.copy";
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

function MobileRail({
  active,
  branch = false,
  born = false,
}: {
  active: boolean;
  branch?: boolean;
  born?: boolean;
}) {
  const path = branch
    ? "M17 8 V52 C17 68 10 76 7 96 M17 52 C17 68 24 76 27 96"
    : "M17 8 V104";

  return (
    <svg
      aria-hidden
      className="h-28 w-9 shrink-0 overflow-visible"
      viewBox="0 0 34 112"
    >
      <path
        d={path}
        fill="none"
        stroke="rgba(255,255,255,.12)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d={path}
        pathLength="1"
        fill="none"
        stroke="rgba(165,243,252,.72)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="1"
        strokeDashoffset={active ? "0" : "1"}
        style={{ transition: "stroke-dashoffset 520ms cubic-bezier(.22,1,.36,1)" }}
      />
      {!born && (
        <g
          style={{
            transform: active ? "translateY(72px)" : "translateY(0)",
            transition: "transform 520ms cubic-bezier(.22,1,.36,1)",
            transformOrigin: "17px 24px",
          }}
        >
          <circle cx="17" cy="24" r="8" fill="rgba(165,243,252,.12)" />
          <circle cx="17" cy="24" r="4.25" fill="#a5f3fc" />
        </g>
      )}
    </svg>
  );
}

function MobileChapter({
  index,
  active,
  label,
  branch,
  born,
  children,
}: {
  index: number;
  active: boolean;
  label: string;
  branch?: boolean;
  born?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      data-mobile-chapter
      data-index={index}
      className="relative grid min-h-[58svh] grid-cols-[36px_1fr] items-center gap-4 border-t border-white/[.055] py-14 first:min-h-[100svh] first:border-t-0 first:pt-24 last:min-h-[82svh] sm:gap-7 sm:py-20"
    >
      <div className="flex h-full min-h-36 items-center justify-center">
        <MobileRail active={active} branch={branch} born={born} />
      </div>
      <div
        className={
          "min-w-0 transition-[opacity,transform] duration-500 ease-out " +
          (active ? "translate-y-0 opacity-100" : "translate-y-3 opacity-55")
        }
      >
        <div className="mb-5 flex items-center justify-between gap-4 text-[9px] font-black uppercase tracking-[.2em] text-white/35">
          <span>0{index + 1}</span>
          <span>{label}</span>
        </div>
        {children}
      </div>
    </section>
  );
}

export function V2Hero({ copy }: { copy: V2Copy }) {
  const desktopStoryRef = useRef<HTMLDivElement>(null);
  const mobileStoryRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [mobileStep, setMobileStep] = useState(0);

  useLayoutEffect(() => {
    if (reduceMotion || typeof window === "undefined") return;

    const media = window.matchMedia("(min-width: 1024px)");
    let generation = 0;
    let cleanup = () => {};

    const syncDesktopTimeline = () => {
      generation += 1;
      const currentGeneration = generation;
      cleanup();
      cleanup = () => {};

      if (!media.matches) return;

      void import("./hero.timeline").then(({ createDesktopSignalTimeline }) => {
        if (currentGeneration !== generation || !media.matches) return;
        cleanup = createDesktopSignalTimeline(desktopStoryRef.current);
      });
    };

    syncDesktopTimeline();
    media.addEventListener("change", syncDesktopTimeline);

    return () => {
      generation += 1;
      media.removeEventListener("change", syncDesktopTimeline);
      cleanup();
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion || !mobileStoryRef.current) return;

    const chapters = Array.from(
      mobileStoryRef.current.querySelectorAll<HTMLElement>("[data-mobile-chapter]"),
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;
        const index = Number((visible.target as HTMLElement).dataset.index);
        if (Number.isFinite(index)) setMobileStep(index);
      },
      {
        rootMargin: "-24% 0px -36% 0px",
        threshold: [0.15, 0.35, 0.55],
      },
    );

    chapters.forEach((chapter) => observer.observe(chapter));
    return () => observer.disconnect();
  }, [reduceMotion]);

  if (reduceMotion) {
    return <StaticStory copy={copy} />;
  }

  return (
    <>
      <div ref={desktopStoryRef} className="relative hidden h-[290svh] lg:block">
        <div className="sticky top-0 h-[100svh] overflow-hidden bg-[#02060b] px-12 pt-24">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_74%_32%,rgba(34,211,238,.07),transparent_28%)]" />
          <div className="relative mx-auto h-full max-w-[92rem]">
            <svg
              aria-hidden
              className="pointer-events-none absolute inset-0 z-10 h-full w-full"
              viewBox="0 0 1400 800"
              preserveAspectRatio="none"
            >
              <path
                data-signal-path
                d="M1010 270 C1120 260 1165 350 1070 420 S990 520 1045 585"
                fill="none"
                stroke="rgba(255,255,255,.09)"
                strokeWidth="2"
                strokeDasharray="5 9"
              />
              <path
                data-signal-active
                pathLength="1"
                strokeDasharray="1"
                strokeDashoffset="1"
                d="M1010 270 C1120 260 1165 350 1070 420 S990 520 1045 585"
                fill="none"
                stroke="rgba(165,243,252,.72)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                data-review-path
                d="M1045 585 C900 625 610 635 355 585"
                fill="none"
                stroke="rgba(255,255,255,.1)"
                strokeWidth="2"
                strokeDasharray="3 11"
              />
              <path
                data-review-active
                pathLength="1"
                strokeDasharray="1"
                strokeDashoffset="1"
                d="M1045 585 C900 625 610 635 355 585"
                fill="none"
                stroke="rgba(165,243,252,.72)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M1045 575 l10 10 -10 10 -10 -10 z"
                fill="rgba(255,255,255,.18)"
              />
              <g data-hero-signal className="invisible opacity-0">
                <circle r="14" fill="rgba(165,243,252,.12)" />
                <circle r="6" fill="#a5f3fc" />
              </g>
            </svg>

            <div data-hero-intro className="absolute left-0 top-[15%] z-30 w-[42%] max-w-[44rem]">
              <p className="text-[10px] font-black uppercase tracking-[.22em] text-white/60">{copy.services}</p>
              <h1 className="mt-5 max-w-[7ch] text-[clamp(4.8rem,7.2vw,8.2rem)] font-black leading-[.84] tracking-[-.065em]">{copy.hero}</h1>
              <p className="mt-7 max-w-md text-base leading-7 text-white/55">{copy.heroSub}</p>
            </div>

            <div data-hero-surface className="absolute right-0 top-[20%] z-40 w-[54%] origin-right">
              <SiteSurface copy={copy} enquiry deferredEnquiry />
            </div>

            <div data-hero-system className="absolute right-[4%] top-[31%] z-20 w-[36%] invisible opacity-0">
              <Understanding copy={copy} />
            </div>
            <div data-hero-action className="absolute bottom-[10%] right-[7%] z-30 w-[34%] invisible opacity-0">
              <Availability copy={copy} />
            </div>
            <div data-hero-owner className="absolute bottom-[13%] left-[7%] z-30 w-[32%] invisible opacity-0">
              <Owner copy={copy} />
            </div>
            <div data-hero-resolved className="absolute inset-x-0 top-1/2 z-50 -translate-y-1/2 invisible opacity-0">
              <Resolved copy={copy} />
            </div>

            <div className="absolute bottom-7 left-0 right-0 flex justify-between text-[9px] font-black uppercase tracking-[.2em] text-white/30">
              <span>{copy.receive}</span>
              <span>{copy.route}</span>
              <span>{copy.humanJudgment}</span>
              <span>{copy.resolved}</span>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={mobileStoryRef}
        className="relative overflow-hidden bg-[#02060b] px-5 text-white sm:px-8 lg:hidden"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_12%,rgba(34,211,238,.06),transparent_22%)]" />

        <div className="relative mx-auto max-w-3xl">
          <MobileChapter index={0} active={mobileStep === 0} label={copy.firstImpression} born>
            <p className="text-[10px] font-black uppercase tracking-[.22em] text-white/60">{copy.services}</p>
            <h1 className="mt-5 max-w-[8ch] text-[clamp(2.9rem,12vw,5.2rem)] font-black leading-[.84] tracking-[-.065em]">{copy.hero}</h1>
            <p className="mt-6 max-w-md text-[17px] leading-7 text-white/60">{copy.heroSub}</p>
            <MobileSurfacePreview copy={copy} />
          </MobileChapter>

          <MobileChapter index={1} active={mobileStep === 1} label={copy.enquiryReceived} born>
            <p className="text-[10px] font-black uppercase tracking-[.2em] text-cyan-100/65">{copy.receive}</p>
            <h2 className="mt-4 text-5xl font-black tracking-[-.05em]">{copy.someoneAsks}</h2>
            <div className="mt-8 rounded-[1.6rem] bg-[#11151a] p-6 shadow-2xl ring-1 ring-white/[.06]">
              <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[.18em] text-white/60">
                <Signal /> {copy.newEnquiry}
              </div>
              <p className="mt-5 text-2xl font-black leading-tight">“{copy.customerMessage}”</p>
              <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-4 text-[10px] font-black uppercase tracking-[.18em] text-cyan-100/60">
                <span className="h-px flex-1 bg-cyan-100/25" />
                {copy.route}
              </div>
            </div>
          </MobileChapter>

          <MobileChapter index={2} active={mobileStep === 2} label={copy.systemRevealed}>
            <Understanding copy={copy} />
          </MobileChapter>

          <MobileChapter index={3} active={mobileStep === 3} label={copy.usefulAction}>
            <Availability copy={copy} />
          </MobileChapter>

          <MobileChapter index={4} active={mobileStep === 4} label={copy.humanJudgment} branch>
            <Owner copy={copy} />
          </MobileChapter>

          <MobileChapter index={5} active={mobileStep === 5} label={copy.resolved} born>
            <Resolved copy={copy} />
          </MobileChapter>
        </div>
      </div>
    </>
  );
}
