"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  clamp, contourPath, contourPoints, contentOpacity, geometryProgress,
  mix, morphContour, MORPH_SECONDS, SHAPE_POINTS, type Rect,
} from "./bubbleMotion";
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

/** Source bubble is drawn in a 400-square viewbox with a radius of 173. */
const C = 200, R = 173, EDGE = 18, TAU = Math.PI * 2;
const VIEWBOX = 400;
const SOURCE_SCALE = R / C;
const MAX_MOTION_DT = 1.9;

type Contact = { radius: number; angle: number; direction: number; intensity: number };
type Perimeter = {
  offset: number[];
  velocity: number[];
  outline: SVGPathElement;
  light: SVGPathElement;
  contact: Contact | null;
  lastRadius: number | null;
  lastDirection: number;
};

type MorphSession = {
  source: Rect;
  destination: Rect;
  sourceTitle: DOMRect;
  sourceIndex: DOMRect;
  sourceShort: DOMRect;
  sourceMore: DOMRect;
  titleTarget: DOMRect;
};

function motionDisabled() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function sourceCircle(node: HTMLButtonElement): Rect {
  const r = node.getBoundingClientRect();
  const size = Math.min(r.width, r.height) * SOURCE_SCALE;
  return { left: r.left + (r.width - size) / 2, top: r.top + (r.height - size) / 2, width: size, height: size };
}

function sourceTextRect(node: HTMLElement, selector: string): DOMRect {
  return (node.querySelector(selector) ?? node).getBoundingClientRect();
}

/** Same closed contour, fill and reflection for all three service bubbles. */
function orbPath(offset: number[]): string {
  const p = offset.map((r, i) => {
    const a = -Math.PI / 2 + i * TAU / SHAPE_POINTS;
    return { x: C + Math.cos(a) * (R + r), y: C + Math.sin(a) * (R + r) };
  });
  return contourPath(p);
}

const STATIC_ORB_PATH = orbPath(Array(SHAPE_POINTS).fill(0));

export function BubbleMorphStudy() {
  const [active, setActive] = useState<number | null>(null);
  const [ready, setReady] = useState(false);
  const hostRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const sourceRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const svgRef = useRef<SVGSVGElement>(null);
  const shapeRef = useRef<SVGPathElement>(null);
  const reflectionRef = useRef<SVGPathElement>(null);
  const underlayRef = useRef<SVGPathElement>(null);
  const highStopRef = useRef<SVGStopElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const titleSlotRef = useRef<HTMLDivElement>(null);
  const incomingRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const indexGhostRef = useRef<HTMLSpanElement>(null);
  const shortGhostRef = useRef<HTMLSpanElement>(null);
  const moreGhostRef = useRef<HTMLSpanElement>(null);
  const dropletsRef = useRef<HTMLDivElement>(null);
  const chosenRef = useRef<number | null>(null);
  const busyRef = useRef(false);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const pendingCloseRef = useRef(false);
  const closeServiceRef = useRef<() => void>(() => {});
  const sessionRef = useRef<MorphSession | null>(null);

  const readCardRect = useCallback((): Rect => {
    const content = incomingRef.current, host = hostRef.current;
    if (!content || !host) return { left: 12, top: 12, width: 320, height: 520 };
    const w = window.innerWidth, h = window.innerHeight;
    const side = w < 821 ? 12 : 32;
    const topBottom = h < 700 ? 12 : Math.min(38, Math.round(h * .037));
    const width = Math.min(w < 821 ? 780 : 850, w - side * 2);
    const clone = content.cloneNode(true) as HTMLDivElement;
    Object.assign(clone.style, {
      position: "fixed", left: "-10000px", top: "0", width: `${width}px`,
      height: "auto", minHeight: "0", maxHeight: "none", overflow: "visible",
      visibility: "hidden", opacity: "0", transform: "none", pointerEvents: "none",
    });
    host.appendChild(clone);
    const requiredHeight = Math.ceil(clone.getBoundingClientRect().height) + 2;
    clone.remove();
    const availableHeight = h - topBottom * 2;
    const height = Math.min(Math.max(requiredHeight, Math.min(410, availableHeight)), availableHeight);
    return { left: (w - width) / 2, top: (h - height) / 2, width, height };
  }, []);

  const positionContent = useCallback((destination: Rect) => {
    const content = incomingRef.current;
    if (!content) return;
    Object.assign(content.style, {
      left: `${destination.left}px`, top: `${destination.top}px`,
      width: `${destination.width}px`, height: `${destination.height}px`,
    });
    const svg = svgRef.current;
    if (svg) svg.setAttribute("viewBox", `0 0 ${window.innerWidth} ${window.innerHeight}`);
  }, []);

  const makeSession = useCallback((index: number, destination: Rect): MorphSession | null => {
    const source = sourceRefs.current[index];
    const slot = titleSlotRef.current;
    if (!source || !slot) return null;
    return {
      source: sourceCircle(source), destination,
      sourceTitle: sourceTextRect(source, `.${styles.orbTitle}`),
      sourceIndex: sourceTextRect(source, `.${styles.orbIndex}`),
      sourceShort: sourceTextRect(source, `.${styles.orbShort}`),
      sourceMore: sourceTextRect(source, `.${styles.orbMore}`),
      titleTarget: slot.getBoundingClientRect(),
    };
  }, []);

  /** The subtitle/index disappear gently, but the service title remains ONE
   * visible DOM heading throughout the transition. No duplicate crossfade. */
  const renderText = useCallback((session: MorphSession, opened: number) => {
    const title = titleRef.current;
    const index = indexGhostRef.current, short = shortGhostRef.current, more = moreGhostRef.current;
    if (!title || !index || !short || !more) return;
    const p = opened; // May overshoot by ~2%, as a real damped spring does.
    const final = session.titleTarget;
    const source = session.sourceTitle;
    const naturalHeight = Math.max(1, title.offsetHeight);
    const sourceScale = clamp(source.height / Math.max(1, naturalHeight), .3, 1.4);
    const dx = source.left - final.left;
    const dy = source.top - final.top;
    const scale = mix(sourceScale, 1, p);
    title.style.left = `${final.left}px`;
    title.style.top = `${final.top}px`;
    title.style.transform = `translate3d(${(dx * (1 - p)).toFixed(2)}px,${(dy * (1 - p)).toFixed(2)}px,0) scale(${scale.toFixed(5)})`;
    title.dataset.scale = String(scale);
    const place = (element: HTMLElement, original: DOMRect, opacity: number) => {
      element.style.left = `${original.left}px`;
      element.style.top = `${original.top}px`;
      element.style.width = `${original.width}px`;
      element.style.opacity = opacity.toFixed(3);
    };
    const ghostOpacity = 1 - clamp(p / .31);
    place(index, session.sourceIndex, ghostOpacity);
    place(short, session.sourceShort, ghostOpacity);
    place(more, session.sourceMore, ghostOpacity);
  }, []);

  const drawSurface = useCallback((session: MorphSession, seconds: number, opening: boolean, reduced: boolean) => {
    const shape = shapeRef.current, light = reflectionRef.current, base = underlayRef.current, content = incomingRef.current;
    if (!shape || !light || !base || !content) return;
    const from = opening ? session.source : session.destination;
    const to = opening ? session.destination : session.source;
    const points = morphContour(from, to, seconds, opening, reduced);
    const path = contourPath(points);
    // The same contour is the fill boundary, reflection boundary and only stroke.
    shape.setAttribute("d", path);
    light.setAttribute("d", path);
    base.setAttribute("d", path);
    const progress = geometryProgress(seconds, reduced);
    const opened = opening ? progress : 1 - progress;
    const density = clamp((opened - .28) / .64);
    // An opaque depth layer grows into the card: background headings never
    // bleed through the text, while the closed bubble remains translucent.
    base.style.fillOpacity = String(density * .98);
    if (highStopRef.current) {
      const lightness = Math.round(mix(112, 73, density));
      const green = Math.round(mix(166, 127, density));
      const blue = Math.round(mix(117, 88, density));
      highStopRef.current.setAttribute("stop-color", `rgb(${lightness},${green},${blue})`);
    }
    renderText(session, opened);
    const opacity = contentOpacity(progress, opening, seconds);
    content.style.opacity = opacity.toFixed(3);
    content.style.transform = `translate3d(0,${(9 * (1 - opacity)).toFixed(2)}px,0)`;
    content.style.pointerEvents = "none"; // Enabled only after the full opening settles.
  }, [renderText]);

  const droplets = useCallback((session: MorphSession) => {
    if (motionDisabled() || !dropletsRef.current) return;
    const cx = session.source.left + session.source.width / 2;
    const cy = session.source.top + session.source.height / 2;
    // A tiny detachment near the membrane, not a general particle burst.
    [ { x: -.79, y: -.57, radius: 5 }, { x: .93, y: -.37, radius: 7 } ].forEach((p, i) => {
      const d = document.createElement("span");
      d.className = styles.droplet;
      d.style.left = `${cx + p.x * session.source.width * .49}px`;
      d.style.top = `${cy + p.y * session.source.height * .49}px`;
      d.style.width = d.style.height = `${p.radius}px`;
      dropletsRef.current?.appendChild(d);
      const a = d.animate([
        { transform: "translate(0,0) scale(.35)", opacity: 0, offset: 0 },
        { transform: `translate(${p.x * 8}px,${p.y * 6}px) scale(1)`, opacity: .6, offset: .22 },
        { transform: `translate(${p.x * (18+i*5)}px,${p.y * (19+i*7)}px) scale(.45)`, opacity: 0, offset: 1 },
      ], { duration: 540 + i * 90, easing: "cubic-bezier(.2,.72,.27,1)", fill: "forwards" });
      void a.finished.finally(() => d.remove()).catch(() => d.remove());
    });
  }, []);

  const cancelCurrentAnimation = useCallback(() => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
  }, []);

  const animateSurface = useCallback((session: MorphSession, opening: boolean, done: () => void) => {
    cancelCurrentAnimation();
    const reduced = motionDisabled();
    const duration = opening ? MORPH_SECONDS.open : MORPH_SECONDS.close;
    let started: number | null = null;
    let emitted = false;
    const frame = (time: number) => {
      if (started === null) started = time;
      const seconds = reduced ? duration : Math.min(duration, (time - started) / 1000);
      drawSurface(session, seconds, opening, reduced);
      if (opening && !emitted && seconds >= .12) { emitted = true; droplets(session); }
      if (seconds < duration) rafRef.current = requestAnimationFrame(frame);
      else { rafRef.current = null; done(); }
    };
    // Synchronize first geometry with the render commit before any paint.
    drawSurface(session, 0, opening, reduced);
    if (reduced) { drawSurface(session, duration, opening, true); done(); }
    else rafRef.current = requestAnimationFrame(frame);
  }, [cancelCurrentAnimation, drawSurface, droplets]);

  const openService = useCallback((index: number, source: HTMLButtonElement) => {
    if (busyRef.current || chosenRef.current !== null) return;
    busyRef.current = true;
    pendingCloseRef.current = false;
    openerRef.current = source;
    chosenRef.current = index;
    setReady(false);
    setActive(index);
  }, []);

  useLayoutEffect(() => {
    if (active === null) return;
    const rect = readCardRect();
    positionContent(rect);
    const session = makeSession(active, rect);
    if (!session) { busyRef.current = false; return; }
    sessionRef.current = session;
    overlayRef.current?.focus({ preventScroll: true });
    animateSurface(session, true, () => {
      // A changed viewport during the morph gets measured at rest.
      const adjusted = readCardRect();
      positionContent(adjusted);
      const settled = makeSession(active, adjusted);
      if (settled) { sessionRef.current = settled; drawSurface(settled, 2, true, motionDisabled()); }
      busyRef.current = false;
      if (incomingRef.current) incomingRef.current.style.pointerEvents = "auto";
      setReady(true);
      closeRef.current?.focus({ preventScroll: true });
      if (pendingCloseRef.current) {
        pendingCloseRef.current = false;
        requestAnimationFrame(() => closeServiceRef.current());
      }
    });
  // The callback is intentionally started once per selected bubble, not on ready.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const closeService = useCallback(() => {
    if (chosenRef.current === null) return;
    if (busyRef.current) { pendingCloseRef.current = true; return; }
    const index = chosenRef.current;
    const old = sessionRef.current;
    if (!old) return;
    busyRef.current = true;
    if (incomingRef.current) incomingRef.current.style.pointerEvents = "none";
    setReady(false);
    const destination = readCardRect();
    positionContent(destination);
    const session = makeSession(index, destination) ?? old;
    sessionRef.current = session;
    animateSurface(session, false, () => {
      chosenRef.current = null;
      sessionRef.current = null;
      setActive(null);
      busyRef.current = false;
      requestAnimationFrame(() => openerRef.current?.focus({ preventScroll: true }));
    });
  }, [animateSurface, makeSession, positionContent, readCardRect]);

  useEffect(() => { closeServiceRef.current = closeService; }, [closeService]);

  useEffect(() => {
    if (active === null) return;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); closeService(); return; }
      if (event.key !== "Tab") return;
      if (!ready) { event.preventDefault(); return; }
      const root = incomingRef.current;
      if (!root) return;
      const focusables = Array.from(root.querySelectorAll<HTMLButtonElement | HTMLAnchorElement>('button:not([disabled]),a[href]'));
      if (!focusables.length) return;
      const first = focusables[0], last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    const resize = () => {
      if (busyRef.current || chosenRef.current === null) return;
      const destination = readCardRect();
      positionContent(destination);
      const session = makeSession(chosenRef.current, destination);
      if (session) { sessionRef.current = session; drawSurface(session, 2, true, motionDisabled()); }
    };
    document.addEventListener("keydown", keydown);
    window.addEventListener("resize", resize);
    return () => {
      document.body.style.overflow = oldOverflow;
      document.removeEventListener("keydown", keydown);
      window.removeEventListener("resize", resize);
    };
  }, [active, closeService, drawSurface, makeSession, positionContent, readCardRect, ready]);

  useEffect(() => () => cancelCurrentAnimation(), [cancelCurrentAnimation]);

  // Edge-only soap membrane: velocity-based force, coupled nearby particles,
  // frame-time-aware integration, and ONE contour used for fill and highlight.
  useEffect(() => {
    const buttons = sourceRefs.current.filter((b): b is HTMLButtonElement => Boolean(b));
    const perimeters: Perimeter[] = buttons.map(button => {
      const outline = button.querySelector<SVGPathElement>("[data-bubble-outline]");
      const light = button.querySelector<SVGPathElement>("[data-bubble-light]");
      if (!outline || !light) throw new Error("Missing bubble membrane paths");
      return { offset: Array(SHAPE_POINTS).fill(0), velocity: Array(SHAPE_POINTS).fill(0),
        outline, light, contact: null, lastRadius: null, lastDirection: 0 };
    });
    let frameId = 0, lastFrame = 0;
    const tick = () => { if (frameId === 0) frameId = requestAnimationFrame(draw); };
    function draw(now: number) {
      frameId = 0;
      const dt = lastFrame ? Math.min(MAX_MOTION_DT, Math.max(.4, (now - lastFrame) / (1000 / 60))) : 1;
      lastFrame = now;
      let moving = false;
      perimeters.forEach(state => {
        const contact = state.contact;
        const strength = contact ? Math.max(0, 1 - Math.abs(contact.radius - R) / EDGE) : 0;
        let max = 0;
        const nextVelocity = state.velocity.slice();
        for (let i = 0; i < SHAPE_POINTS; i += 1) {
          const angle = -Math.PI / 2 + i * TAU / SHAPE_POINTS;
          const offsetAngle = contact ? Math.atan2(Math.sin(angle - contact.angle), Math.cos(angle - contact.angle)) : 0;
          const local = contact ? Math.exp(-.5 * (offsetAngle / .21) ** 2) : 0;
          const desired = contact && !motionDisabled() ? local * strength * contact.direction * 16 * contact.intensity : 0;
          const neighbors = state.offset[(i+SHAPE_POINTS-1)%SHAPE_POINTS] + state.offset[(i+1)%SHAPE_POINTS] - 2 * state.offset[i];
          const acceleration = (desired - state.offset[i]) * .105 + neighbors * .057;
          nextVelocity[i] = (state.velocity[i] + acceleration * dt) * Math.pow(.78, dt);
          max = Math.max(max, Math.abs(nextVelocity[i]) + Math.abs(desired - state.offset[i]));
        }
        state.velocity = nextVelocity;
        for (let i = 0; i < SHAPE_POINTS; i += 1) state.offset[i] += state.velocity[i] * dt;
        const path = orbPath(state.offset);
        state.outline.setAttribute("d", path);
        state.light.setAttribute("d", path);
        if (max > .04) moving = true;
      });
      if (moving) tick(); else lastFrame = 0;
    }
    const release = (state: Perimeter) => { state.contact = null; state.lastRadius = null; state.lastDirection = 0; tick(); };
    const removers = buttons.map((button, i) => {
      const state = perimeters[i];
      const move = (event: PointerEvent) => {
        if (busyRef.current || chosenRef.current !== null || event.pointerType === "touch" || motionDisabled()) return;
        const bounds = button.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width * VIEWBOX;
        const y = (event.clientY - bounds.top) / bounds.height * VIEWBOX;
        const dx = x - C, dy = y - C, distance = Math.hypot(dx, dy);
        if (Math.abs(distance - R) > EDGE) { release(state); return; }
        const angle = Math.atan2(dy, dx);
        const radialMotion = (event.movementX * Math.cos(angle) + event.movementY * Math.sin(angle)) * VIEWBOX / bounds.width;
        const delta = state.lastRadius === null ? radialMotion : distance - state.lastRadius;
        if (Math.abs(delta) > .12) state.lastDirection = Math.sign(delta);
        state.lastRadius = distance;
        state.contact = { radius: distance, angle, direction: state.lastDirection, intensity: clamp(Math.abs(delta)/4,.35,1) };
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
    draw(0);
    return () => { removers.forEach(fn => fn()); if (frameId) cancelAnimationFrame(frameId); };
  }, []);

  const service = SERVICES[active ?? 0];
  return (
    <div className={styles.study} ref={hostRef}>
      <main className={styles.stage} inert={active !== null}>
        <header className={styles.top}><span className={styles.brand}>GENEZISI</span><span className={styles.prototypeLabel}>What I do / Contour motion study</span></header>
        <div className={styles.intro}>
          <div className={styles.eyebrow}>What I do</div>
          <h1>Built around what<br /><em>your business needs.</em></h1>
          <p>Websites, AI systems, and automation. Each can stand on its own—or work together when it makes sense.</p>
        </div>
        <section className={styles.orbit} aria-label="Explore Genezisi services">
          {SERVICES.map((v, i) => (
            <div className={`${styles.orbWrap} ${active === i ? styles.orbHidden : ""}`} key={v.index}>
              <button ref={(node: HTMLButtonElement | null) => { sourceRefs.current[i] = node; }} className={styles.orb} type="button" aria-label={`Explore ${v.title.replace(".", "")}`} aria-haspopup="dialog" onClick={(e: { currentTarget: HTMLButtonElement }) => openService(i, e.currentTarget)}>
                <svg viewBox="0 0 400 400" aria-hidden="true" focusable="false">
                  <defs>
                    <radialGradient id={`service-${i}-fill`} cx="29%" cy="19%" r="87%"><stop offset="0" stopColor="#70a675" stopOpacity=".87"/><stop offset=".38" stopColor="#285e3d" stopOpacity=".95"/><stop offset=".82" stopColor="#0d2f1e"/><stop offset="1" stopColor="#07170f"/></radialGradient>
                    <radialGradient id={`service-${i}-light`} cx="27%" cy="15%" r="78%"><stop offset="0" stopColor="#e8ffdd" stopOpacity=".24"/><stop offset=".35" stopColor="#b9eeb5" stopOpacity=".055"/><stop offset="1" stopColor="#d7ffd3" stopOpacity=".07"/></radialGradient>
                  </defs>
                  <path data-bubble-outline d={STATIC_ORB_PATH} fill={`url(#service-${i}-fill)`} stroke="rgba(220,246,209,.71)" strokeWidth="1.5" />
                  <path data-bubble-light d={STATIC_ORB_PATH} fill={`url(#service-${i}-light)`} pointerEvents="none" />
                </svg>
                <span className={styles.orbContents}>
                  <span className={styles.orbIndex}>{v.index}</span>
                  <span className={styles.orbTitle}>{v.title}</span>
                  <span className={styles.orbShort}>{v.short}</span>
                  <span className={styles.orbMore}>Explore <span aria-hidden="true">↗</span></span>
                </span>
              </button>
            </div>
          ))}
        </section>
        <div className={styles.footnote}>Independent when needed. Connected when useful.</div>
        <p className={styles.guidance}>Move across a bubble&apos;s rim to feel its membrane. Tap or click to discover the service.</p>
        <footer className={styles.bottom}><span>GENEZISI / Experimental preview</span><span>SVG contour · Spring physics · Reduced motion</span></footer>
      </main>
      <div className={`${styles.backdrop} ${active !== null ? styles.backdropVisible : ""}`} aria-hidden="true" onClick={closeService}/>
      {active !== null && (
        <div ref={overlayRef} tabIndex={-1} className={styles.morphLayer} role="dialog" aria-modal="true" aria-labelledby="bubble-card-title" aria-describedby="bubble-card-description">
          <svg ref={svgRef} className={styles.morphSvg} viewBox="0 0 100 100" aria-hidden="true" focusable="false" preserveAspectRatio="none">
            <defs>
              <radialGradient id="genezisi-morph-fill" cx="29%" cy="19%" r="87%"><stop ref={highStopRef} offset="0" stopColor="#70a675" stopOpacity=".87"/><stop offset=".38" stopColor="#285e3d" stopOpacity=".95"/><stop offset=".82" stopColor="#0d2f1e"/><stop offset="1" stopColor="#07170f"/></radialGradient>
              <radialGradient id="genezisi-morph-light" cx="27%" cy="15%" r="78%"><stop offset="0" stopColor="#e8ffdd" stopOpacity=".24"/><stop offset=".35" stopColor="#b9eeb5" stopOpacity=".055"/><stop offset="1" stopColor="#d7ffd3" stopOpacity=".07"/></radialGradient>
            </defs>
            <path ref={underlayRef} fill="#071d13" fillOpacity="0" pointerEvents="none"/>
            <path ref={shapeRef} fill="url(#genezisi-morph-fill)" stroke="rgba(220,246,209,.71)" strokeWidth="1.25" vectorEffect="non-scaling-stroke"/>
            <path ref={reflectionRef} fill="url(#genezisi-morph-light)" pointerEvents="none"/>
          </svg>
          <span ref={indexGhostRef} className={styles.ghostIndex} aria-hidden="true">{service.index}</span>
          <span ref={shortGhostRef} className={styles.ghostShort} aria-hidden="true">{service.short}</span>
          <span ref={moreGhostRef} className={styles.ghostMore} aria-hidden="true">Explore ↗</span>
          <h2 ref={titleRef} className={styles.morphTitle} id="bubble-card-title">{service.title}</h2>
          <section className={styles.cardContent} ref={incomingRef}>
            <div className={styles.cardTop}>
              <span className={styles.cardIndex}>{service.index}</span>
              <button ref={closeRef} type="button" className={styles.close} aria-label="Close service details" onClick={closeService}>
                <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 5l14 14M19 5L5 19" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>
              </button>
            </div>
            <div className={styles.titleSlot} ref={titleSlotRef} aria-hidden="true">{service.title}</div>
            <p className={styles.cardStrap}>{service.strap}</p>
            <p className={styles.cardLead} id="bubble-card-description">{service.lead}</p>
            <div className={styles.cardRule}/>
            <div className={styles.cardColumns}>
              <div><div className={styles.cardLabel}>What we can build</div><ul className={styles.cardList}>{service.items.map(item => <li key={item}>{item}</li>)}</ul></div>
              <div><div className={styles.cardLabel}>Why it matters</div><p className={styles.cardResult}>{service.result}</p></div>
            </div>
            <p className={styles.cardCaption}>Illustrative capabilities · Tailored to your project</p>
          </section>
        </div>
      )}
      <div className={styles.dropletLayer} ref={dropletsRef} aria-hidden="true" />
    </div>
  );
}