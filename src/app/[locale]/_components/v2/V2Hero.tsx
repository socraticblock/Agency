"use client";

import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
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

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onStoreChange: () => void) {
  const media = window.matchMedia(REDUCED_MOTION_QUERY);
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

function MobileRail({
  active,
  completed,
  branch = false,
  born = false,
}: {
  active: boolean;
  completed: boolean;
  branch?: boolean;
  born?: boolean;
}) {
  const basePath = branch
    ? "M17 8 V46 M17 46 C17 59 8 72 7 98 M17 46 C17 59 26 72 27 98"
    : "M17 8 V104";
  const activePath = branch
    ? "M17 8 V46 C17 59 8 72 7 98"
    : "M17 8 V104";
  const filled = !born && (active || completed);
  const dotTransform = active
    ? branch
      ? "translate(-10px,74px)"
      : "translate(0,74px)"
    : "translate(0,0)";

  return (
    <svg
      aria-hidden
      className="h-28 w-9 shrink-0 overflow-visible"
      viewBox="0 0 34 112"
    >
      <path
        d={basePath}
        fill="none"
        stroke="rgba(255,255,255,.14)"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d={activePath}
        pathLength="1"
        fill="none"
        stroke="rgba(165,243,252,.82)"
        strokeWidth="2.35"
        strokeLinecap="round"
        strokeDasharray="1"
        strokeDashoffset={filled ? "0" : "1"}
        style={{ transition: "stroke-dashoffset 460ms cubic-bezier(.22,1,.36,1)" }}
      />
      {!born && (
        <g
          style={{
            opacity: active ? 1 : 0,
            transform: dotTransform,
            transition:
              "transform 460ms cubic-bezier(.22,1,.36,1), opacity 140ms ease-out",
            transformOrigin: "17px 24px",
          }}
        >
          <circle cx="17" cy="24" r="10" fill="rgba(165,243,252,.13)" />
          <circle cx="17" cy="24" r="4.75" fill="#a5f3fc" />
        </g>
      )}
    </svg>
  );
}

function MobileChapter({
  index,
  active,
  completed,
  label,
  branch,
  born,
  children,
}: {
  index: number;
  active: boolean;
  completed: boolean;
  label: string;
  branch?: boolean;
  born?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      data-mobile-chapter
      data-index={index}
      className="relative grid min-h-[50svh] grid-cols-[36px_1fr] items-center gap-4 border-t border-white/[.055] py-10 first:min-h-[92svh] first:border-t-0 first:pt-24 last:min-h-[76svh] sm:gap-7 sm:py-14"
    >
      <div className="flex h-full min-h-32 items-center justify-center">
        <MobileRail active={active} completed={completed} branch={branch} born={born} />
      </div>
      <div
        className={
          "min-w-0 transition-[opacity,transform] duration-[400ms] ease-out " +
          (active ? "translate-y-0 opacity-100" : "translate-y-2 opacity-45")
        }
      >
        <div className="mb-5 flex items-center justify-between gap-4 text-[9px] font-black uppercase tracking-[.2em] text-white/38">
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
  const reduceMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );
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
    if (reduceMotion || !mobileStoryRef.current || typeof window === "undefined") return;

    const media = window.matchMedia("(max-width: 1023px)");
    let observer: IntersectionObserver | null = null;

    const connect = () => {
      observer?.disconnect();
      observer = null;
      if (!media.matches || !mobileStoryRef.current) return;

      const chapters = Array.from(
        mobileStoryRef.current.querySelectorAll<HTMLElement>("[data-mobile-chapter]"),
      );

      const pickNearestChapter = () => {
        const focusY = window.innerHeight * 0.45;
        let nearestIndex: number | null = null;
        let nearestDistance = Number.POSITIVE_INFINITY;

        chapters.forEach((chapter) => {
          const rect = chapter.getBoundingClientRect();
          if (rect.bottom <= 0 || rect.top >= window.innerHeight) return;

          const index = Number(chapter.dataset.index);
          const distance = Math.abs(rect.top + rect.height / 2 - focusY);
          if (Number.isFinite(index) && distance < nearestDistance) {
            nearestDistance = distance;
            nearestIndex = index;
          }
        });

        if (nearestIndex !== null) setMobileStep(nearestIndex);
      };

      observer = new IntersectionObserver(pickNearestChapter, {
        rootMargin: "-18% 0px -18% 0px",
        threshold: [0, 0.22, 0.5],
      });

      chapters.forEach((chapter) => observer?.observe(chapter));
      pickNearestChapter();
    };

    connect();
    media.addEventListener("change", connect);

    return () => {
      media.removeEventListener("change", connect);
      observer?.disconnect();
    };
  }, [reduceMotion]);

  if (reduceMotion) return <StaticStory copy={copy} />;

  return (
    <>
      <div ref={desktopStoryRef} className="relative hidden h-[275svh] lg:block">
        <div className="sticky top-0 h-[100svh] overflow-hidden bg-[#02060b] px-12 pt-24">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_73%_34%,rgba(34,211,238,.075),transparent_27%),radial-gradient(circle_at_18%_72%,rgba(255,255,255,.025),transparent_28%)]" />
          <div className="relative mx-auto h-full max-w-[92rem]">
            <svg
              aria-hidden
              className="pointer-events-none absolute inset-0 z-20 h-full w-full"
              viewBox="0 0 1400 800"
              preserveAspectRatio="none"
            >
              <g data-hero-routes className="invisible opacity-0">
                <path
                  data-signal-path
                  d="M900 500 C965 455 1025 395 1085 365 S1100 505 1060 575"
                  fill="none"
                  stroke="rgba(255,255,255,.14)"
                  strokeWidth="2"
                  strokeDasharray="5 9"
                />
                <path
                  data-signal-active
                  pathLength="1"
                  strokeDasharray="1"
                  strokeDashoffset="1"
                  d="M900 500 C965 455 1025 395 1085 365 S1100 505 1060 575"
                  fill="none"
                  stroke="rgba(165,243,252,.86)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <path
                  data-review-path
                  d="M1060 575 C900 620 680 626 480 575"
                  fill="none"
                  stroke="rgba(255,255,255,.13)"
                  strokeWidth="2"
                  strokeDasharray="4 10"
                />
                <path
                  data-review-active
                  pathLength="1"
                  strokeDasharray="1"
                  strokeDashoffset="1"
                  d="M1060 575 C900 620 680 626 480 575"
                  fill="none"
                  stroke="rgba(165,243,252,.86)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <circle cx="1085" cy="365" r="5" fill="rgba(165,243,252,.24)" />
                <circle cx="1060" cy="575" r="5" fill="rgba(165,243,252,.24)" />
                <g data-hero-signal className="invisible opacity-0">
                  <circle r="18" fill="rgba(165,243,252,.12)" />
                  <circle r="7" fill="#a5f3fc" />
                </g>
              </g>
            </svg>

            <div data-hero-intro className="absolute left-0 top-[14%] z-30 w-[43%] max-w-[44rem]">
              <p className="text-[10px] font-black uppercase tracking-[.22em] text-white/60">{copy.services}</p>
              <h1 className="mt-5 max-w-[7ch] text-[clamp(4.8rem,7.2vw,8.2rem)] font-black leading-[.84] tracking-[-.065em]">{copy.hero}</h1>
              <p className="mt-7 max-w-md text-base leading-7 text-white/56">{copy.heroSub}</p>
            </div>

            <div data-hero-surface className="absolute right-[1%] top-[19%] z-40 w-[55%] origin-right">
              <SiteSurface copy={copy} enquiry deferredEnquiry />
            </div>

            <div data-hero-system className="absolute right-[3%] top-[26%] z-30 w-[40%] invisible opacity-0">
              <div className="rounded-[2rem] border border-white/[.08] bg-[#071019]/94 p-8 shadow-[0_32px_90px_rgba(0,0,0,.34)]">
                <div className="mb-6 flex items-center gap-3 text-[9px] font-black uppercase tracking-[.2em] text-cyan-100/55">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-200 shadow-[0_0_14px_rgba(165,243,252,.55)]" />
                  {copy.systemRevealed}
                </div>
                <Understanding copy={copy} />
              </div>
            </div>

            <div data-hero-action className="absolute bottom-[10%] right-[4%] z-30 w-[38%] invisible opacity-0">
              <div className="mb-4 text-[9px] font-black uppercase tracking-[.2em] text-cyan-100/55">{copy.usefulAction}</div>
              <Availability copy={copy} />
            </div>

            <div data-hero-owner className="absolute bottom-[10%] left-[7%] z-30 w-[34%] invisible opacity-0">
              <div className="mb-4 text-[9px] font-black uppercase tracking-[.2em] text-amber-100/50">{copy.humanJudgment}</div>
              <Owner copy={copy} />
            </div>

            <div
              data-hero-resolution-wash
              aria-hidden
              className="pointer-events-none absolute -bottom-4 -left-[20vw] -right-[20vw] -top-24 z-40 invisible bg-[#02060b] opacity-0"
            />

            <div data-hero-resolved className="absolute inset-x-0 top-1/2 z-50 -translate-y-1/2 invisible opacity-0">
              <Resolved copy={copy} />
            </div>

            <div data-hero-progress className="absolute bottom-7 left-0 right-0 z-10 flex justify-between text-[9px] font-black uppercase tracking-[.2em] text-white/28">
              <span>{copy.receive}</span>
              <span>{copy.requestUnderstood}</span>
              <span>{copy.usefulAction}</span>
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
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_12%,rgba(34,211,238,.065),transparent_22%)]" />

        <div className="relative mx-auto max-w-3xl">
          <MobileChapter index={0} active={mobileStep === 0} completed={mobileStep > 0} label={copy.firstImpression} born>
            <p className="text-[10px] font-black uppercase tracking-[.22em] text-white/60">{copy.services}</p>
            <h1 className="mt-5 max-w-[8ch] text-[clamp(2.9rem,12vw,5.2rem)] font-black leading-[.84] tracking-[-.065em]">{copy.hero}</h1>
            <p className="mt-6 max-w-md text-[17px] leading-7 text-white/60">{copy.heroSub}</p>
            <MobileSurfacePreview copy={copy} />
          </MobileChapter>

          <MobileChapter index={1} active={mobileStep === 1} completed={mobileStep > 1} label={copy.enquiryReceived} born>
            <p className="text-[10px] font-black uppercase tracking-[.2em] text-cyan-100/65">{copy.receive}</p>
            <h2 className="mt-4 text-5xl font-black tracking-[-.05em]">{copy.someoneAsks}</h2>
            <div className="mt-7 rounded-[1.6rem] bg-[#11151a] p-6 shadow-2xl ring-1 ring-white/[.07]">
              <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[.18em] text-white/60">
                <Signal /> {copy.newEnquiry}
              </div>
              <p className="mt-5 text-2xl font-black leading-tight">“{copy.customerMessage}”</p>
              <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-4 text-[10px] font-black uppercase tracking-[.18em] text-cyan-100/65">
                <span className="h-px flex-1 bg-cyan-100/30" />
                {copy.route}
              </div>
            </div>
          </MobileChapter>

          <MobileChapter index={2} active={mobileStep === 2} completed={mobileStep > 2} label={copy.systemRevealed}>
            <Understanding copy={copy} />
          </MobileChapter>

          <MobileChapter index={3} active={mobileStep === 3} completed={mobileStep > 3} label={copy.usefulAction}>
            <Availability copy={copy} />
          </MobileChapter>

          <MobileChapter index={4} active={mobileStep === 4} completed={mobileStep > 4} label={copy.humanJudgment} branch>
            <Owner copy={copy} />
          </MobileChapter>

          <MobileChapter index={5} active={mobileStep === 5} completed={false} label={copy.resolved} born>
            <Resolved copy={copy} />
          </MobileChapter>
        </div>
      </div>
    </>
  );
}
