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

        // Respond almost immediately after scroll begins.
        timeline.to(enquiry, { autoAlpha: 1, y: 0, duration: 5, ease: "power2.out" }, 2);

        // The website remains dominant only long enough to establish the request.
        timeline.to(
          surface,
          {
            x: "-22vw",
            scale: 0.86,
            rotation: -1.5,
            duration: 11,
            transformOrigin: "100% 48%",
            ease: "power2.inOut",
          },
          10,
        );
        if (intro) timeline.to(intro, { autoAlpha: 0, y: -18, duration: 7 }, 11);
        timeline.to(routes, { autoAlpha: 1, duration: 3 }, 18);

        timeline.to(signal, { autoAlpha: 1, duration: 2 }, 20);
        timeline.to(activePath, { attr: { "stroke-dashoffset": 0.52 }, duration: 11 }, 20);
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
            duration: 11,
          },
          20,
        );

        // Clear the large website before the system becomes the focal surface.
        timeline.to(
          surface,
          {
            autoAlpha: 0,
            x: "-28vw",
            scale: 0.8,
            duration: 7,
            ease: "power2.inOut",
          },
          23,
        );
        timeline.to(system, { autoAlpha: 1, y: 0, duration: 5, ease: "power2.out" }, 30);

        // Understand -> useful action.
        timeline.to(activePath, { attr: { "stroke-dashoffset": 0 }, duration: 12 }, 39);
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
            duration: 12,
          },
          39,
        );
        timeline.to(action, { autoAlpha: 1, y: 0, duration: 5, ease: "power2.out" }, 49);
        timeline.to(system, { autoAlpha: 0, scale: 0.97, duration: 5, ease: "power1.inOut" }, 50);

        // Useful action -> human review.
        timeline.to(reviewActive, { attr: { "stroke-dashoffset": 0 }, duration: 10 }, 60);
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
          60,
        );
        timeline.to(owner, { autoAlpha: 1, x: 0, duration: 5, ease: "power2.out" }, 68);
        timeline.to(action, { autoAlpha: 0, scale: 0.98, duration: 5, ease: "power1.inOut" }, 69);

        // Resolve in three beats: clear -> breathe -> reveal.
        timeline.to([owner, signal, routes], { autoAlpha: 0, duration: 5, ease: "power1.inOut" }, 78);
        if (progress) timeline.to(progress, { autoAlpha: 0, duration: 4 }, 79);
        timeline.to(resolutionWash, { autoAlpha: 1, duration: 5, ease: "power1.inOut" }, 80);
        timeline.to({}, { duration: 3 }, 85);
        timeline.to(resolved, { autoAlpha: 1, duration: 7, ease: "power2.out" }, 88);
        timeline.to({}, { duration: 15 }, 95);

        requestAnimationFrame(() => ScrollTrigger.refresh());
      }, root);

      return () => scope.revert();
    },
  );

  return () => media.revert();
}
