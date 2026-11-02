"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./BubbleMorphStudy.module.css";

type Service = {
  index: string;
  category: string;
  title: string;
  short: string;
  strap: string;
  lead: string;
  items: string[];
  result: string;
};

const SERVICES: Service[] = [
  {
    index: "01 / DIGITAL EXPERIENCES", category: "Digital experiences", title: "Websites.",
    short: "A distinctive presence, carefully built for your business.",
    strap: "Your digital first impression, considered from every angle.",
    lead: "We design and develop distinctive websites and web applications built around the people who use them. Clear communication, purposeful interaction and responsive performance matter as much as appearance.",
    items: ["Professional and business websites", "Landing pages and digital experiences", "Custom web applications", "Mobile-responsive interfaces"],
    result: "Visitors understand what you offer, trust what they see, and can take the next step with confidence.",
  },
  {
    index: "02 / USEFUL INTELLIGENCE", category: "Useful intelligence", title: "AI systems.",
    short: "Make information easier to understand and use.",
    strap: "Information that works harder for your team.",
    lead: "We build practical AI-assisted tools that can work with business information, interpret requests, and help people find answers or prepare useful outputs—with human judgment retained where it matters.",
    items: ["AI assistants for defined tasks", "Knowledge and document search", "Request and information analysis", "Drafting and review workflows"],
    result: "Less time searching and sorting; more time spent making informed decisions and helping customers.",
  },
  {
    index: "03 / CONNECTED WORK", category: "Connected work", title: "Automation.",
    short: "Less routine work. More room for what matters.",
    strap: "Better flow, with fewer repetitive steps.",
    lead: "We connect everyday tools and processes so repeatable work can happen more consistently. From receiving requests to updating records and notifying your team, the workflow is designed around how your business operates.",
    items: ["Forms and enquiry handling", "Notifications and follow-ups", "Data movement between tools", "Scheduling and task workflows"],
    result: "Important steps are easier to follow, information travels to the right place, and your team keeps control.",
  },
];

const COUNT = 80, C = 200, R = 173, TAU = Math.PI * 2, EDGE = 18;

type Contact = { radius: number; angle: number; direction: number };
type Surface = {
  offset: number[]; velocity: number[]; shape: SVGPathElement;
  highlight: SVGPathElement; contact: Contact | null;
  lastRadius: number | null; lastDirection: number;
};
type Rect = { left: number; top: number; width: number; height: number };

function pathFor(displacements: number[]): string {
  const points = displacements.map((r, i) => {
    const a = -Math.PI / 2 + i * TAU / COUNT;
    return [C + Math.cos(a) * (R + r), C + Math.sin(a) * (R + r)];
  });
  const middle = (p: number[], q: number[]) => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
  let p = middle(points[COUNT - 1], points[0]);
  let d = `M${p[0].toFixed(2)} ${p[1].toFixed(2)}`;
  for (let i = 0; i < COUNT; i += 1) {
    p = middle(points[i], points[(i + 1) % COUNT]);
    d += ` Q${points[i][0].toFixed(2)} ${points[i][1].toFixed(2)} ${p[0].toFixed(2)} ${p[1].toFixed(2)}`;
  }
  return d + " Z";
}

function morphTransform(from: Rect, to: Rect): string {
  const dx = from.left + from.width / 2 - (to.left + to.width / 2);
  const dy = from.top + from.height / 2 - (to.top + to.height / 2);
  return `translate3d(${dx.toFixed(2)}px,${dy.toFixed(2)}px,0) scale(${(from.width / to.width).toFixed(5)},${(from.height / to.height).toFixed(5)})`;
}

export function BubbleMorphStudy() {
  const [active, setActive] = useState<number | null>(null);
  const [readable, setReadable] = useState(false);
  const studyRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);
  const bubbleRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const activeRef = useRef<number | null>(null);
  const busyRef = useRef(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const startRef = useRef<Rect | null>(null);
  const animationRef = useRef<Animation | null>(null);
  const timerRef = useRef<number | null>(null);
  const prefersReduced = useCallback(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches, []);

  const targetRect = useCallback((): Rect => {
    const content = contentRef.current;
    const host = studyRef.current;
    if (!content || !host) return { left: 0, top: 0, width: 320, height: 500 };
    const vw = window.innerWidth, vh = window.innerHeight;
    const hm = vw < 821 ? 12 : 32;
    const vm = vh < 700 ? 12 : Math.min(36, Math.round(vh * .035));
    const width = Math.min(vw < 821 ? 780 : 850, vw - hm * 2);
    const clone = content.cloneNode(true) as HTMLDivElement;
    Object.assign(clone.style, {
      position: "fixed", left: "-10000px", top: "0", width: `${width}px`, height: "auto",
      minHeight: "0", maxHeight: "none", overflow: "visible", opacity: "0",
      pointerEvents: "none", transform: "none", visibility: "hidden",
    });
    host.appendChild(clone);
    const required = Math.ceil(clone.getBoundingClientRect().height) + 4;
    clone.remove();
    const available = vh - vm * 2;
    const height = Math.min(Math.max(required, Math.min(430, available)), available);
    return { left: (vw - width) / 2, top: (vh - height) / 2, width, height };
  }, []);

  const applyRect = useCallback((r: Rect) => {
    const root = rootRef.current;
    if (!root) return;
    Object.assign(root.style, {
      left: `${r.left}px`, top: `${r.top}px`, width: `${r.width}px`,
      height: `${r.height}px`, borderRadius: "30px", transform: "none",
    });
  }, []);

  const morph = useCallback(async (source: Rect, dest: Rect, opening: boolean) => {
    const root = rootRef.current;
    if (!root || prefersReduced()) return;
    const from = morphTransform(source, dest);
    const frames: Keyframe[] = opening ? [
      { transform: from, borderRadius: "50%", offset: 0, easing: "cubic-bezier(.23,.68,.23,1)" },
      { transform: "translate3d(0,-7px,0) scale(1.017,.987)", borderRadius: "34px", offset: .72, easing: "cubic-bezier(.26,.7,.3,1)" },
      { transform: "translate3d(0,3px,0) scale(.992,1.007)", borderRadius: "28px", offset: .88, easing: "ease-out" },
      { transform: "none", borderRadius: "30px", offset: 1 },
    ] : [
      { transform: "none", borderRadius: "30px", offset: 0, easing: "cubic-bezier(.4,0,.3,.76)" },
      { transform: "translate3d(0,4px,0) scale(1.009,.993)", borderRadius: "33px", offset: .22, easing: "cubic-bezier(.2,.5,.3,1)" },
      { transform: from, borderRadius: "50%", offset: 1 },
    ];
    const animation = root.animate(frames, { duration: opening ? 860 : 710, easing: "linear", fill: "both" });
    animationRef.current = animation;
    try { await animation.finished; } catch { /* Cancelled during unmount. */ }
    if (animationRef.current === animation) animationRef.current = null;
    animation.cancel();
  }, [prefersReduced]);

  const droplets = useCallback((source: Rect) => {
    if (prefersReduced() || !dropRef.current) return;
    const cx = source.left + source.width / 2, cy = source.top + source.height / 2;
    const particles = [[-.85, -.5], [-.15, -1], [.7, -.6], [.96, .1], [.26, .85]];
    particles.forEach(([dx, dy], i) => {
      const el = document.createElement("span");
      el.className = styles.drop;
      const size = 4 + (i % 3) * 2;
      Object.assign(el.style, { width: `${size}px`, height: `${size}px`, left: `${cx + dx * source.width * .44}px`, top: `${cy + dy * source.height * .44}px` });
      dropRef.current?.appendChild(el);
      const a = el.animate([
        { opacity: 0, transform: "translate(0,0) scale(.4)" },
        { opacity: .85, offset: .18, transform: `translate(${dx * 11}px,${dy * 9}px) scale(1)` },
        { opacity: 0, transform: `translate(${dx * (20 + i * 5)}px,${dy * (15 + i * 6)}px) scale(.5)` },
      ], { duration: 470 + i * 48, easing: "cubic-bezier(.16,.66,.35,1)", fill: "forwards" });
      a.finished.then(() => el.remove()).catch(() => el.remove());
    });
  }, [prefersReduced]);

  const openCard = (index: number, button: HTMLButtonElement) => {
    if (busyRef.current || activeRef.current !== null) return;
    busyRef.current = true;
    activeRef.current = index;
    triggerRef.current = button;
    startRef.current = button.getBoundingClientRect();
    setReadable(false);
    setActive(index);
  };

  useLayoutEffect(() => {
    if (active === null || !startRef.current || !rootRef.current) return;
    const source = startRef.current;
    const dest = targetRect();
    if (contentRef.current) contentRef.current.scrollTop = 0;
    applyRect(dest);
    droplets(source);
    const work = morph(source, dest, true);
    timerRef.current = window.setTimeout(() => {
      setReadable(true);
      closeRef.current?.focus({ preventScroll: true });
    }, prefersReduced() ? 0 : 560);
    void work.then(() => {
      if (activeRef.current === active) {
        applyRect(targetRect());
        busyRef.current = false;
      }
    });
    // One opening animation per selected service. Content visibility is separate.
  }, [active, applyRect, droplets, morph, prefersReduced, targetRect]);

  const closeCard = useCallback(async () => {
    const index = activeRef.current;
    if (index === null || busyRef.current) return;
    busyRef.current = true;
    setReadable(false);
    const start = targetRect();
    const target = bubbleRefs.current[index]?.getBoundingClientRect();
    applyRect(start);
    if (target) await morph(target, start, false);
    activeRef.current = null;
    setActive(null);
    busyRef.current = false;
    window.requestAnimationFrame(() => triggerRef.current?.focus({ preventScroll: true }));
  }, [applyRect, morph, targetRect]);

  useEffect(() => {
    if (active === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); void closeCard(); return; }
      if (e.key !== "Tab" || !contentRef.current) return;
      const nodes = Array.from(contentRef.current.querySelectorAll<HTMLButtonElement | HTMLAnchorElement>('button:not([disabled]),a[href]'));
      if (!nodes.length) return;
      const first = nodes[0], last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    const onResize = () => {
      if (!busyRef.current) applyRect(targetRect());
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [active, applyRect, closeCard, targetRect]);

  useEffect(() => () => {
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    animationRef.current?.cancel();
  }, []);

  // Lightweight perimeter-only SVG membrane physics. This never tracks a
  // pointer in the center of the circle and does not depend on React renders.
  useEffect(() => {
    const buttons = bubbleRefs.current.filter((node): node is HTMLButtonElement => Boolean(node));
    const surfaces: Surface[] = buttons.map(button => {
      const shape = button.querySelector<SVGPathElement>("[data-shape]");
      const highlight = button.querySelector<SVGPathElement>("[data-highlight]");
      if (!shape || !highlight) throw new Error("Bubble SVG is incomplete");
      return { offset: Array(COUNT).fill(0), velocity: Array(COUNT).fill(0), shape, highlight, contact: null, lastRadius: null, lastDirection: 0 };
    });
    let frame = 0;
    const tick = () => { if (!frame) frame = requestAnimationFrame(draw); };
    function draw() {
      frame = 0; let moving = false;
      for (const state of surfaces) {
        const contact = state.contact;
        let max = 0;
        const falloff = contact ? Math.max(0, 1 - Math.abs(contact.radius - R) / EDGE) : 0;
        for (let j = 0; j < COUNT; j += 1) {
          const a = -Math.PI / 2 + j * TAU / COUNT;
          const angle = contact ? Math.atan2(Math.sin(a - contact.angle), Math.cos(a - contact.angle)) : 0;
          const local = contact ? Math.exp(-.5 * (angle / .25) ** 2) : 0;
          const goal = contact && !prefersReduced() ? local * falloff * contact.direction * 18 : 0;
          const neighbors = (state.offset[(j + COUNT - 1) % COUNT] + state.offset[(j + 1) % COUNT] - 2 * state.offset[j]) * .05;
          state.velocity[j] = (state.velocity[j] + (goal - state.offset[j]) * .11 + neighbors) * .79;
          max = Math.max(max, Math.abs(state.velocity[j]) + Math.abs(goal - state.offset[j]));
        }
        for (let j = 0; j < COUNT; j += 1) state.offset[j] += state.velocity[j];
        const d = pathFor(state.offset);
        state.shape.setAttribute("d", d);
        state.highlight.setAttribute("d", d);
        if (max > .035) moving = true;
      }
      if (moving) tick();
    }
    function release(state: Surface) {
      state.contact = null; state.lastRadius = null; state.lastDirection = 0; tick();
    }
    const cleanups = buttons.map((button, i) => {
      const state = surfaces[i];
      const move = (e: PointerEvent) => {
        if (prefersReduced() || busyRef.current || activeRef.current !== null || e.pointerType === "touch") return;
        const r = button.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width * 400, y = (e.clientY - r.top) / r.height * 400;
        const dx = x - C, dy = y - C, distance = Math.hypot(dx, dy);
        if (Math.abs(distance - R) > EDGE) { release(state); return; }
        if (state.lastRadius !== null) {
          const step = distance - state.lastRadius;
          if (Math.abs(step) > .18) state.lastDirection = Math.sign(step);
        }
        state.lastRadius = distance;
        state.contact = { radius: distance, angle: Math.atan2(dy, dx), direction: state.lastDirection };
        tick();
      };
      const leave = () => release(state);
      button.addEventListener("pointermove", move);
      button.addEventListener("pointerleave", leave);
      button.addEventListener("pointercancel", leave);
      return () => {
        button.removeEventListener("pointermove", move);
        button.removeEventListener("pointerleave", leave);
        button.removeEventListener("pointercancel", leave);
      };
    });
    draw();
    return () => { cleanups.forEach(fn => fn()); if (frame) cancelAnimationFrame(frame); };
  }, [prefersReduced]);

  const service = SERVICES[active ?? 0];
  return (
    <div className={styles.study} ref={studyRef}>
      <main className={styles.stage} inert={active !== null}>
        <header className={styles.top}><span className={styles.brand}>GENEZISI</span><span className={styles["prototype-label"]}>What I do / React motion study</span></header>
        <div className={styles.intro}>
          <div className={styles.eyebrow}>What I do</div>
          <h1>Built around what<br /><em>your business needs.</em></h1>
          <p>Websites, AI systems, and automation. Each can stand on its own—or work together when it makes sense.</p>
        </div>
        <section className={styles.orbit} aria-label="Explore Genezisi services">
          {SERVICES.map((v, i) => (
            <div className={`${styles["orb-wrap"]} ${active === i ? styles["is-opening"] : ""}`} key={v.index}>
              <button ref={node => { bubbleRefs.current[i] = node; }} className={styles.orb} type="button" aria-label={`Explore ${v.title.replace(".", "")}`} aria-haspopup="dialog" onClick={e => openCard(i, e.currentTarget)}>
                <svg viewBox="0 0 400 400" aria-hidden="true" focusable="false">
                  <defs>
                    <radialGradient id={`orb-${i}-fill`} cx="29%" cy="19%" r="87%"><stop offset="0" stopColor="#70a675" stopOpacity=".87"/><stop offset=".38" stopColor="#285e3d" stopOpacity=".95"/><stop offset=".82" stopColor="#0d2f1e"/><stop offset="1" stopColor="#07170f"/></radialGradient>
                    <radialGradient id={`orb-${i}-light`} cx="27%" cy="15%" r="78%"><stop offset="0" stopColor="#e8ffdd" stopOpacity=".24"/><stop offset=".35" stopColor="#b9eeb5" stopOpacity=".055"/><stop offset="1" stopColor="#d7ffd3" stopOpacity=".07"/></radialGradient>
                  </defs>
                  <path data-shape stroke="rgba(220,246,209,.71)" strokeWidth="1.5" fill={`url(#orb-${i}-fill)`}/>
                  <path data-highlight fill={`url(#orb-${i}-light)`}/>
                  <ellipse cx="123" cy="84" rx="79" ry="31" transform="rotate(-25 123 84)" fill="#e5ffdb" opacity=".06"/>
                </svg>
                <span className={styles["orb-contents"]}>
                  <span className={styles["orb-no"]}>{v.index}</span>
                  <span className={styles["orb-title"]}>{v.title}</span>
                  <span className={styles["orb-short"]}>{v.short}</span>
                  <span className={styles["orb-more"]}>Explore <span aria-hidden="true">↗</span></span>
                </span>
              </button>
            </div>
          ))}
        </section>
        <div className={styles.footnote}>Independent when needed. Connected when useful.</div>
        <p className={styles.guidance}>Touch or cross a bubble&apos;s edge to see the elastic membrane. Tap or click any bubble to open it.</p>
        <footer className={styles.bottom}><span>GENEZISI / Concept study</span><span>React + CSS + SVG · Responsive · Reduced motion</span></footer>
      </main>
      <div className={`${styles.backdrop} ${active !== null ? styles.visible : ""}`} aria-hidden="true" onClick={() => void closeCard()} />
      <section ref={rootRef} className={`${styles.reveal} ${active !== null ? styles["is-active"] : ""} ${readable ? styles["is-readable"] : ""}`} role="dialog" aria-modal={active !== null} aria-labelledby="bubble-card-title" aria-hidden={active === null} tabIndex={-1}>
        <div className={styles["card-content"]} ref={contentRef}>
          <div className={styles["card-top"]}>
            <span className={styles["card-index"]}>{service.index}</span>
            <button ref={closeRef} type="button" className={styles.close} aria-label="Close service details" onClick={() => void closeCard()}>
              <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 5l14 14M19 5L5 19" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>
            </button>
          </div>
          <h2 className={styles["card-title"]} id="bubble-card-title">{service.title}</h2>
          <p className={styles["card-strap"]}>{service.strap}</p>
          <p className={styles["card-lead"]}>{service.lead}</p>
          <div className={styles["card-rule"]} />
          <div className={styles["card-columns"]}>
            <div><div className={styles["card-label"]}>What we can build</div><ul className={styles["card-list"]}>{service.items.map(item => <li key={item}>{item}</li>)}</ul></div>
            <div><div className={styles["card-label"]}>Why it matters</div><p className={styles["card-result"]}>{service.result}</p></div>
          </div>
          <p className={styles["card-caption"]}>Illustrative capabilities · Tailored to your project</p>
        </div>
      </section>
      <div ref={dropRef} className={styles["droplet-layer"]} aria-hidden="true" />
    </div>
  );
}