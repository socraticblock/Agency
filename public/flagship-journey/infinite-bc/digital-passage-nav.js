/* GENEZISI / Screen 01 — Digital Passage.
 * Real CTA, real #work DOM. Visual scene loads on intent and never owns navigation.
 * Module fails? The normal anchor wins. No scroll hijack or synthetic Work page.
 */
(() => {
  "use strict";
  // Next's locale switch remounts the homepage without re-executing next/script.
  // Bind only the current anchor; abort old listeners on replacement.
  let binding = null;
  function attach() {
    const trigger = document.querySelector('.opening .actions a[href="#work"]');
    const target = document.getElementById("work");
    if (!trigger || !target) {
      binding?.stop();
      binding = null;
      return;
    }
    if (binding?.trigger === trigger) return;
    binding?.stop();
    const controller = new AbortController();

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const canAnimate = () =>
    !reduced.matches &&
    !navigator.connection?.saveData &&
    !document.hidden &&
    typeof window.WebGL2RenderingContext !== "undefined";

  let loading;
  let active = null;
  let ticket = 0;

  function preload() {
    if (!loading) {
      loading = import("/flagship-journey/infinite-bc/digital-passage-scene-v6-5.js").catch(error => {
        loading = null;
        throw error;
      });
    }
    return loading;
  }

  // Intent preloading avoids making everyone download a 3D engine.
  // The real link remains usable if modules, CDNs or WebGL are unavailable.
  trigger.addEventListener("pointerenter", () => { if (canAnimate()) preload().catch(() => {}); }, { passive: true, signal: controller.signal });
  trigger.addEventListener("focus", () => { if (canAnimate()) preload().catch(() => {}); }, { signal: controller.signal });
  trigger.addEventListener("pointerdown", () => { if (canAnimate()) preload().catch(() => {}); }, { passive: true, signal: controller.signal });

  function land() {
    if (location.hash !== "#work") history.pushState(null, "", "#work");
    const oldScroll = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "auto";
    try { target.scrollIntoView({ block: "start", behavior: "auto" }); }
    finally { document.documentElement.style.scrollBehavior = oldScroll; }
  }

  trigger.addEventListener("click", async event => {
    if (
      event.defaultPrevented || event.button !== 0 ||
      event.metaKey || event.ctrlKey || event.shiftKey || event.altKey ||
      trigger.target === "_blank" || !canAnimate()
    ) return;
    if (active) { event.preventDefault(); return; }
    event.preventDefault();
    document.documentElement.classList.add("genezisi-passage-pending");
    const token = ++ticket;
    const fromKeyboard = event.detail === 0;

    // Hard timeout: an optional cinematic effect must never block navigation.
    let timer;
    const gate = new Promise((_, reject) => {
      timer = setTimeout(() => reject(new Error("Scene load timeout")), 1500);
    });

    try {
      const scene = await Promise.race([preload(), gate]);
      if (token !== ticket) return; // Abandoned request: never undo Back/Forward.
      if (document.hidden || !canAnimate()) { land(); return; }
      let covered = false;
      const finish = () => {
        if (!covered) { covered = true; land(); }
        if (active) { active.dispose(); active = null; }
        if (fromKeyboard) {
          const heading = target.querySelector("h2");
          if (heading) {
            heading.tabIndex = -1;
            heading.focus({ preventScroll: true });
          }
        }
      };
      active = scene.createDigitalPassage({
        trigger,
        onCover: () => { if (!covered) { covered = true; land(); } },
        onFinish: finish,
        onError: error => { console.warn("[Genezisi Passage] graceful fallback", error); finish(); }
      });
      try { active.start(); } catch (error) { active?.dispose(); active = null; throw error; }
    } catch (error) {
      console.warn("[Genezisi Passage] direct Work fallback", error);
      if (token === ticket) land();
    } finally {
      clearTimeout(timer);
      document.documentElement.classList.remove("genezisi-passage-pending");
    }
  }, { signal: controller.signal });

  window.addEventListener("popstate", () => {
    // Back/Forward is user authority, never restart the Work transition.
    document.documentElement.classList.remove("genezisi-passage-pending");
    ++ticket;
    active?.dispose();
    active = null;
  }, { signal: controller.signal });
  reduced.addEventListener?.("change", () => {
    if (reduced.matches && active) {
      active.dispose();
      active = null;
      land();
    }
  }, { signal: controller.signal });

  window.addEventListener("pagehide", () => {
    document.documentElement.classList.remove("genezisi-passage-pending");
    ++ticket;
    active?.dispose();
    active = null;
  }, { signal: controller.signal });

    binding = {
      trigger,
      stop() {
        controller.abort();
        ++ticket;
        active?.dispose();
        active = null;
        document.documentElement.classList.remove("genezisi-passage-pending");
      }
    };
  }

  attach();
  const observer = new MutationObserver(attach);
  observer.observe(document.body, { childList: true, subtree: true });
  window.addEventListener("pagehide", () => {
    observer.disconnect();
    binding?.stop();
    binding = null;
  }, { once: true });
})();
