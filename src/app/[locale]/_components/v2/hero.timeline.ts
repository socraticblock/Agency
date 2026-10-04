import { gsap, MotionPathPlugin, ScrollTrigger } from "gsap/all";

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
    {
      desktop: "(min-width: 1024px)",
      motion: "(prefers-reduced-motion: no-preference)",
    },
    (context) => {
      if (!context.conditions?.desktop || !context.conditions?.motion) return;

      const scope = gsap.context(() => {
        const intro = root.querySelector<HTMLElement>("[data-hero-intro]");
        const surface = root.querySelector<HTMLElement>("[data-hero-surface]");
        const enquiry = root.querySelector<HTMLElement>("[data-hero-enquiry]");
        const system = root.querySelector<HTMLElement>("[data-hero-system]");
        const action = root.querySelector<HTMLElement>("[data-hero-action]");
        const owner = root.querySelector<HTMLElement>("[data-hero-owner]");
        const resolved = root.querySelector<HTMLElement>("[data-hero-resolved]");
        const signal = root.querySelector<HTMLElement>("[data-hero-signal]");
        const signalPath = root.querySelector<SVGPathElement>("[data-signal-path]");
        const activePath = root.querySelector<SVGPathElement>("[data-signal-active]");

        if (!surface || !enquiry || !system || !action || !owner || !resolved || !signal || !signalPath || !activePath) {
          return;
        }

        gsap.set(enquiry, { autoAlpha: 0 });
        gsap.set([system, action, owner, resolved, signal], { autoAlpha: 0 });
        gsap.set(activePath, { attr: { "stroke-dashoffset": 1 } });

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

        // Receive
        timeline.to(enquiry, { autoAlpha: 1, duration: 10 }, 15);
        timeline.to(signal, { autoAlpha: 1, duration: 5 }, 18);

        // Surface -> system reveal
        timeline.to(surface, { x: "-12vw", scale: 0.86, rotation: -4, duration: 15, transformOrigin: "100% 50%" }, 28);
        if (intro) timeline.to(intro, { autoAlpha: 0, duration: 9 }, 28);
        timeline.to(system, { autoAlpha: 1, duration: 10 }, 32);

        // Route the same Signal through the visible path.
        timeline.to(activePath, { attr: { "stroke-dashoffset": 0 }, duration: 58 }, 28);
        timeline.to(
          signal,
          {
            motionPath: {
              path: signalPath,
              align: signalPath,
              alignOrigin: [0.5, 0.5],
              autoRotate: false,
              start: 0,
              end: 1,
            },
            duration: 58,
          },
          28,
        );

        // Useful action
        timeline.to(action, { autoAlpha: 1, duration: 10 }, 58);
        timeline.to(system, { autoAlpha: 0.3, duration: 8 }, 66);

        // Human review
        timeline.to(owner, { autoAlpha: 1, duration: 8 }, 75);
        timeline.to(action, { autoAlpha: 0.35, duration: 6 }, 80);

        // Resolve into stillness
        timeline.to(surface, { autoAlpha: 0.16, duration: 8 }, 86);
        timeline.to([system, action, owner], { autoAlpha: 0, duration: 8 }, 88);
        timeline.to(signal, { autoAlpha: 0, duration: 5 }, 91);
        timeline.to(resolved, { autoAlpha: 1, duration: 10 }, 86);
        timeline.to({}, { duration: 4 }, 96);

        requestAnimationFrame(() => ScrollTrigger.refresh());
      }, root);

      return () => scope.revert();
    },
  );

  return () => media.revert();
}

export function createMobileSignalTimeline(root: HTMLElement | null) {
  if (!root || !ensureRegistered()) return () => {};

  const media = gsap.matchMedia();

  media.add(
    {
      mobile: "(max-width: 1023px)",
      motion: "(prefers-reduced-motion: no-preference)",
    },
    (context) => {
      if (!context.conditions?.mobile || !context.conditions?.motion) return;

      const scope = gsap.context(() => {
        const steps = Array.from(root.querySelectorAll<HTMLElement>("[data-mobile-step]"));
        const signal = root.querySelector<HTMLElement>("[data-mobile-signal]");
        if (steps.length < 6) return;

        gsap.set(steps, { autoAlpha: 0 });
        gsap.set(steps[0], { autoAlpha: 1 });
        if (signal) gsap.set(signal, { autoAlpha: 0, y: 0 });

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

        if (signal) {
          timeline.to(signal, { autoAlpha: 1, duration: 0.35 }, 0.7);
          timeline.to(signal, { y: "54vh", duration: 4.2 }, 0.9);
          timeline.to(signal, { autoAlpha: 0, duration: 0.35 }, 5.1);
        }

        for (let index = 0; index < steps.length - 1; index += 1) {
          const position = 0.72 + index * 0.92;
          timeline.to(steps[index], { autoAlpha: 0, duration: 0.3 }, position);
          timeline.to(steps[index + 1], { autoAlpha: 1, duration: 0.3 }, position + 0.12);
        }

        requestAnimationFrame(() => ScrollTrigger.refresh());
      }, root);

      return () => scope.revert();
    },
  );

  return () => media.revert();
}
