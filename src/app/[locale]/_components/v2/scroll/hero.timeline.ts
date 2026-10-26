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

        gsap.set(enquiry, { autoAlpha: 0, y: 8 });
        gsap.set(system, { autoAlpha: 0, y: 16, scale: 0.985 });
        gsap.set(action, { autoAlpha: 0, y: 16, scale: 0.985 });
        gsap.set(owner, { autoAlpha: 0, y: 14, scale: 0.99 });
        gsap.set([resolved, resolutionWash, routes, signal], { autoAlpha: 0 });
        gsap.set([activePath, reviewActive], { attr: { "stroke-dashoffset": 1 } });

        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.35,
            invalidateOnRefresh: true,
          },
        });

        // Immediate acknowledgement: visible response begins with the first scroll input.
        timeline.to(
          enquiry,
          { autoAlpha: 1, y: 0, duration: 6, ease: "power2.out" },
          0.1,
        );

        timeline.to(
          surface,
          {
            x: "-20vw",
            scale: 0.875,
            rotation: -1.25,
            duration: 14,
            transformOrigin: "100% 48%",
            ease: "power2.inOut",
          },
          1,
        );

        if (intro) {
          timeline.to(
            intro,
            { autoAlpha: 0, y: -14, duration: 9, ease: "power1.inOut" },
            3,
          );
        }

        timeline.to(routes, { autoAlpha: 1, duration: 7, ease: "power1.inOut" }, 10);
        timeline.to(signal, { autoAlpha: 1, duration: 5, ease: "power1.inOut" }, 12);

        timeline.to(
          activePath,
          { attr: { "stroke-dashoffset": 0.52 }, duration: 17, ease: "power1.inOut" },
          12,
        );
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
            duration: 17,
            ease: "power1.inOut",
          },
          12,
        );

        // The website relinquishes focus gradually while the system emerges.
        timeline.to(
          surface,
          {
            autoAlpha: 0,
            x: "-27vw",
            scale: 0.81,
            duration: 14,
            ease: "power2.inOut",
          },
          16,
        );
        timeline.to(
          system,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 12,
            ease: "power2.out",
          },
          22,
        );

        // Understand -> action: no dead interval between path progress and surface handoff.
        timeline.to(
          activePath,
          { attr: { "stroke-dashoffset": 0 }, duration: 16, ease: "power1.inOut" },
          30,
        );
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
            duration: 16,
            ease: "power1.inOut",
          },
          30,
        );
        timeline.to(
          action,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 11,
            ease: "power2.out",
          },
          40,
        );
        timeline.to(
          system,
          { autoAlpha: 0, y: -8, scale: 0.985, duration: 10, ease: "power1.inOut" },
          44,
        );

        // Action -> human review: concise handoff, still continuously changing.
        timeline.to(
          reviewActive,
          { attr: { "stroke-dashoffset": 0 }, duration: 14, ease: "power1.inOut" },
          51,
        );
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
            duration: 14,
            ease: "power1.inOut",
          },
          51,
        );
        timeline.to(
          owner,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 10,
            ease: "power2.out",
          },
          58,
        );
        timeline.to(
          action,
          { autoAlpha: 0, y: -8, scale: 0.985, duration: 9, ease: "power1.inOut" },
          61,
        );

        // Resolve: clear -> breathe -> slow reveal.
        timeline.to(
          owner,
          { autoAlpha: 0, y: -6, scale: 0.99, duration: 10, ease: "power1.inOut" },
          70,
        );
        timeline.to(
          [signal, routes],
          { autoAlpha: 0, duration: 9, ease: "power1.inOut" },
          71,
        );
        if (progress) {
          timeline.to(progress, { autoAlpha: 0, duration: 8, ease: "power1.inOut" }, 72);
        }
        timeline.to(
          resolutionWash,
          { autoAlpha: 1, duration: 9, ease: "power1.inOut" },
          73,
        );

        timeline.to({}, { duration: 4 }, 82);
        timeline.to(resolved, { autoAlpha: 1, duration: 11, ease: "power2.out" }, 86);
        timeline.to({}, { duration: 10 }, 97);

        requestAnimationFrame(() => ScrollTrigger.refresh());
      }, root);

      return () => scope.revert();
    },
  );

  return () => media.revert();
}
