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
        const resolutionWash = root.querySelector<HTMLElement>("[data-hero-resolution-wash]");
        const routes = root.querySelector<SVGGElement>("[data-hero-routes]");
        const progress = root.querySelector<HTMLElement>("[data-hero-progress]");
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
          !resolutionWash ||
          !routes ||
          !signal ||
          !signalPath ||
          !activePath ||
          !reviewPath ||
          !reviewActive
        ) {
          return;
        }

        gsap.set(enquiry, { autoAlpha: 0, y: 10 });
        gsap.set([system, action, owner, resolved, resolutionWash, routes, signal], { autoAlpha: 0 });
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

        timeline.to(enquiry, { autoAlpha: 1, y: 0, duration: 7, ease: "power2.out" }, 8);

        timeline.to(
          surface,
          {
            x: "-31vw",
            scale: 0.82,
            rotation: -2,
            duration: 13,
            transformOrigin: "100% 48%",
            ease: "power2.inOut",
          },
          20,
        );
        if (intro) timeline.to(intro, { autoAlpha: 0, y: -18, duration: 8 }, 22);
        timeline.to(routes, { autoAlpha: 1, duration: 4 }, 27);

        timeline.to(signal, { autoAlpha: 1, duration: 2 }, 29);
        timeline.to(activePath, { attr: { "stroke-dashoffset": 0.52 }, duration: 13 }, 29);
        timeline.to(
          signal,
          {
            motionPath: {
              path: signalPath,
              align: signalPath,
              alignOrigin: [0.5, 0.5],
              autoRotate: false,
              start: 0,
              end: 0.48,
            },
            duration: 13,
          },
          29,
        );
        timeline.to(system, { autoAlpha: 1, y: 0, duration: 5, ease: "power2.out" }, 39);

        timeline.to(activePath, { attr: { "stroke-dashoffset": 0 }, duration: 14 }, 47);
        timeline.to(
          signal,
          {
            motionPath: {
              path: signalPath,
              align: signalPath,
              alignOrigin: [0.5, 0.5],
              autoRotate: false,
              start: 0.48,
              end: 1,
            },
            duration: 14,
          },
          47,
        );
        timeline.to(action, { autoAlpha: 1, y: 0, duration: 5, ease: "power2.out" }, 58);
        timeline.to(system, { autoAlpha: 0.28, scale: 0.96, duration: 5 }, 61);

        timeline.to(reviewActive, { attr: { "stroke-dashoffset": 0 }, duration: 11 }, 68);
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
            duration: 11,
          },
          68,
        );
        timeline.to(owner, { autoAlpha: 1, x: 0, duration: 5, ease: "power2.out" }, 76);
        timeline.to(action, { autoAlpha: 0.25, scale: 0.97, duration: 4 }, 79);

        timeline.to(surface, { autoAlpha: 0, scale: 0.78, duration: 3 }, 82);
        timeline.to([system, action, owner], { autoAlpha: 0, duration: 3 }, 82);
        timeline.to([signal, routes], { autoAlpha: 0, duration: 3 }, 82);
        if (progress) timeline.to(progress, { autoAlpha: 0, duration: 3 }, 82);
        timeline.to(resolutionWash, { autoAlpha: 1, duration: 3, ease: "power1.inOut" }, 82);
        timeline.to(resolved, { autoAlpha: 1, duration: 4, ease: "power2.out" }, 86);
        timeline.to({}, { duration: 12 }, 90);

        requestAnimationFrame(() => ScrollTrigger.refresh());
      }, root);

      return () => scope.revert();
    },
  );

  return () => media.revert();
}
