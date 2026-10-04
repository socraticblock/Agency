import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

function ensureRegistered() {
  if (typeof window === "undefined") return false;
  if (!registered) {
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
    registered = true;
  }
  return true;
}

export function createDesktopSignalTimeline(root: HTMLElement | null) {
  if (!root || !ensureRegistered()) return () => {};

  const media = gsap.matchMedia();

  media.add(
    "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
    () => {
      const scope = gsap.context(() => {
        const intro = root.querySelector<HTMLElement>("[data-hero-intro]");
        const surface = root.querySelector<HTMLElement>("[data-hero-surface]");
        const enquiry = root.querySelector<HTMLElement>("[data-hero-enquiry]");
        const system = root.querySelector<HTMLElement>("[data-hero-system]");
        const action = root.querySelector<HTMLElement>("[data-hero-action]");
        const owner = root.querySelector<HTMLElement>("[data-hero-owner]");
        const resolved = root.querySelector<HTMLElement>("[data-hero-resolved]");
        const signal = root.querySelector<SVGGElement>("[data-hero-signal]");
        const signalPath = root.querySelector<SVGPathElement>("[data-signal-path]");
        const activePath = root.querySelector<SVGPathElement>("[data-signal-active]");
        const reviewPath = root.querySelector<SVGPathElement>("[data-review-path]");
        const reviewActive = root.querySelector<SVGPathElement>("[data-review-active]");

        if (
          !surface ||
          !enquiry ||
          !system ||
          !action ||
          !owner ||
          !resolved ||
          !signal ||
          !signalPath ||
          !activePath ||
          !reviewPath ||
          !reviewActive
        ) {
          return;
        }

        gsap.set(enquiry, { autoAlpha: 0 });
        gsap.set([system, action, owner, resolved, signal], { autoAlpha: 0 });
        gsap.set([activePath, reviewActive], { attr: { "stroke-dashoffset": 1 } });

        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        timeline.to(enquiry, { autoAlpha: 1, duration: 8 }, 12);

        timeline.to(surface, {
          x: "-10vw",
          scale: 0.88,
          rotation: -3,
          duration: 14,
          transformOrigin: "100% 50%",
        }, 24);
        if (intro) timeline.to(intro, { autoAlpha: 0, duration: 8 }, 26);

        timeline.to(signal, { autoAlpha: 1, duration: 3 }, 30);
        timeline.to(activePath, { attr: { "stroke-dashoffset": 0.55 }, duration: 12 }, 30);
        timeline.to(
          signal,
          {
            motionPath: {
              path: signalPath,
              align: signalPath,
              alignOrigin: [0.5, 0.5],
              autoRotate: false,
              start: 0,
              end: 0.45,
            },
            duration: 12,
          },
          30,
        );

        timeline.to(system, { autoAlpha: 1, duration: 5 }, 40);

        timeline.to(activePath, { attr: { "stroke-dashoffset": 0 }, duration: 15 }, 48);
        timeline.to(
          signal,
          {
            motionPath: {
              path: signalPath,
              align: signalPath,
              alignOrigin: [0.5, 0.5],
              autoRotate: false,
              start: 0.45,
              end: 1,
            },
            duration: 15,
          },
          48,
        );
        timeline.to(action, { autoAlpha: 1, duration: 5 }, 60);
        timeline.to(system, { autoAlpha: 0.34, duration: 5 }, 64);

        timeline.to(reviewActive, { attr: { "stroke-dashoffset": 0 }, duration: 10 }, 70);
        timeline.to(
          signal,
          {
            motionPath: {
              path: reviewPath,
              align: reviewPath,
              alignOrigin: [0.5, 0.5],
              autoRotate: false,
              start: 0,
              end: 1,
            },
            duration: 10,
          },
          70,
        );
        timeline.to(owner, { autoAlpha: 1, duration: 4 }, 78);
        timeline.to(action, { autoAlpha: 0.32, duration: 4 }, 80);

        timeline.to(surface, { autoAlpha: 0.12, duration: 7 }, 86);
        timeline.to([system, action, owner], { autoAlpha: 0, duration: 7 }, 87);
        timeline.to(signal, { autoAlpha: 0, duration: 4 }, 89);
        timeline.to(resolved, { autoAlpha: 1, duration: 8 }, 86);
        timeline.to([activePath, reviewActive], { opacity: 0.18, duration: 4 }, 95);
        timeline.to({}, { duration: 5 }, 95);

        requestAnimationFrame(() => ScrollTrigger.refresh());
      }, root);

      return () => scope.revert();
    },
  );

  return () => media.revert();
}
