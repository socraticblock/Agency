"use client";

import { useMemo, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Bot,
  CalendarDays,
  Check,
  MessageCircle,
  UserRoundCheck,
} from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { WHATSAPP_INTAKE } from "@/constants/content";

const SIGNAL = "#22d3ee";
const SIGNAL_2 = "#34d399";
const PROTOTYPE_MESSAGE =
  "Hi Genezisi, I have something I'd like to build. Can we talk?";

function SignalDot({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`inline-flex h-3 w-3 rounded-full shadow-[0_0_24px_rgba(34,211,238,0.9)] ${className}`}
      style={{ background: `linear-gradient(135deg, ${SIGNAL_2}, ${SIGNAL})` }}
    />
  );
}

function MiniWindow({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-[1.4rem] border border-white/10 bg-[#07111d]/92 shadow-[0_28px_80px_rgba(0,0,0,0.38)] backdrop-blur-xl ${className}`}
    >
      <div className="flex h-10 items-center gap-2 border-b border-white/8 px-4">
        <span className="h-2 w-2 rounded-full bg-white/16" />
        <span className="h-2 w-2 rounded-full bg-white/10" />
        <span className="h-2 w-2 rounded-full bg-white/10" />
        <span className="ml-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/38">
          {title}
        </span>
      </div>
      {children}
    </div>
  );
}

function WebsitePanel() {
  return (
    <MiniWindow title="Your business" className="h-full">
      <div className="grid h-[calc(100%-2.5rem)] grid-cols-[1.05fr_.95fr] gap-6 p-6 md:p-8">
        <div className="flex flex-col justify-center">
          <span className="mb-5 w-fit rounded-full border border-emerald-300/15 bg-emerald-300/5 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-emerald-200/75">
            Premium service
          </span>
          <p className="max-w-[13ch] text-3xl font-black leading-[0.98] tracking-[-0.035em] text-white sm:text-4xl lg:text-5xl">
            A beautiful first impression.
          </p>
          <p className="mt-4 max-w-sm text-sm leading-6 text-white/46">
            Clear design, fast pages, and one obvious next step.
          </p>
          <div className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-black text-[#06101a]">
            Book a consultation
          </div>
        </div>
        <div className="relative hidden overflow-hidden rounded-[1.1rem] border border-white/10 bg-[radial-gradient(circle_at_50%_35%,rgba(34,211,238,.18),transparent_34%),linear-gradient(145deg,#0a1724,#07101a)] sm:block">
          <div className="absolute inset-x-7 top-7 h-10 rounded-xl border border-white/8 bg-white/[0.035]" />
          <div className="absolute inset-x-7 top-24 space-y-3">
            <div className="h-2 w-4/5 rounded-full bg-white/14" />
            <div className="h-2 w-3/5 rounded-full bg-white/8" />
            <div className="mt-7 h-20 rounded-2xl border border-white/8 bg-white/[0.035]" />
          </div>
          <div className="absolute bottom-7 right-7 flex h-14 w-14 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-300/10">
            <SignalDot />
          </div>
        </div>
      </div>
    </MiniWindow>
  );
}

function AssistantPanel() {
  return (
    <MiniWindow title="Assistant" className="h-full">
      <div className="flex h-[calc(100%-2.5rem)] flex-col justify-center p-6">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-300/15 bg-cyan-300/8 text-cyan-200">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-bold text-white">Request understood</p>
            <p className="text-xs text-white/38">Checking the useful next step</p>
          </div>
        </div>
        <div className="rounded-2xl border border-white/8 bg-white/[0.035] p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-white/32">
            Customer
          </p>
          <p className="mt-2 text-base font-semibold leading-6 text-white/88">
            “Can I book a consultation next Tuesday?”
          </p>
        </div>
        <div className="mt-3 rounded-2xl border border-cyan-300/10 bg-cyan-300/[0.035] p-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-100/70">
            <SignalDot className="h-2.5 w-2.5" />
            Checking availability
          </div>
        </div>
      </div>
    </MiniWindow>
  );
}

function BookingPanel() {
  return (
    <MiniWindow title="Booking" className="h-full">
      <div className="flex h-[calc(100%-2.5rem)] flex-col justify-center p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-300/15 bg-emerald-300/8 text-emerald-200">
            <CalendarDays className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-bold text-white">Tuesday</p>
            <p className="text-xs text-white/40">14:00 · available</p>
          </div>
        </div>
        <div className="mt-6 space-y-3">
          {["Request recorded", "Time checked", "Confirmation prepared"].map(
            (label) => (
              <div
                key={label}
                className="flex items-center gap-3 rounded-xl border border-white/7 bg-white/[0.025] px-4 py-3"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-300/10 text-emerald-200">
                  <Check className="h-3 w-3" />
                </span>
                <span className="text-sm text-white/68">{label}</span>
              </div>
            ),
          )}
        </div>
      </div>
    </MiniWindow>
  );
}

function OwnerPanel() {
  return (
    <MiniWindow title="Owner" className="h-full">
      <div className="flex h-[calc(100%-2.5rem)] flex-col justify-center p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.035] text-white">
            <UserRoundCheck className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-bold text-white">New consultation</p>
            <p className="text-xs text-white/40">Tuesday · 14:00</p>
          </div>
        </div>
        <div className="mt-6 rounded-2xl border border-white/8 bg-white/[0.03] p-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/30">
            Context
          </p>
          <p className="mt-2 text-sm leading-6 text-white/66">
            Customer asked for a consultation. Availability was checked and the
            request is ready.
          </p>
        </div>
        <div className="mt-3 flex items-center justify-between rounded-2xl border border-amber-300/12 bg-amber-300/[0.035] p-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-amber-100/45">
              Human review
            </p>
            <p className="mt-1 text-sm font-semibold text-white/76">
              Exception? It comes to you.
            </p>
          </div>
          <span className="h-2.5 w-2.5 rounded-full bg-amber-200 shadow-[0_0_18px_rgba(253,230,138,.55)]" />
        </div>
      </div>
    </MiniWindow>
  );
}

export function SignalHeroPrototype({ locale }: { locale: Locale }) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const waHref = useMemo(
    () =>
      `https://wa.me/${WHATSAPP_INTAKE}?text=${encodeURIComponent(
        PROTOTYPE_MESSAGE,
      )}`,
    [],
  );

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const heroCopyOpacity = useTransform(
    scrollYProgress,
    [0, 0.12, 0.23],
    [1, 1, 0],
  );
  const heroCopyY = useTransform(scrollYProgress, [0, 0.23], [0, -52]);

  const siteX = useTransform(scrollYProgress, [0.15, 0.42], ["0%", "-30%"]);
  const siteScale = useTransform(scrollYProgress, [0.15, 0.42], [1, 0.82]);
  const siteRotate = useTransform(scrollYProgress, [0.15, 0.42], [0, -5]);

  const systemOpacity = useTransform(
    scrollYProgress,
    [0.28, 0.4, 0.86],
    [0, 1, 1],
  );
  const systemY = useTransform(scrollYProgress, [0.28, 0.44], [40, 0]);

  const signalLeft = useTransform(
    scrollYProgress,
    [0.18, 0.36, 0.56, 0.74],
    ["23%", "46%", "68%", "84%"],
  );
  const signalTop = useTransform(
    scrollYProgress,
    [0.18, 0.36, 0.56, 0.74],
    ["58%", "43%", "58%", "43%"],
  );
  const signalOpacity = useTransform(
    scrollYProgress,
    [0.12, 0.2, 0.82, 0.9],
    [0, 1, 1, 0],
  );

  const finalOpacity = useTransform(
    scrollYProgress,
    [0.82, 0.93],
    [0, 1],
  );
  const finalY = useTransform(scrollYProgress, [0.82, 0.93], [28, 0]);

  const motionStyle = reduceMotion
    ? undefined
    : {
        opacity: heroCopyOpacity,
        y: heroCopyY,
      };

  return (
    <main className="min-h-screen bg-[#02060b] text-white">
      <header className="fixed inset-x-0 top-0 z-[80] border-b border-white/[0.06] bg-[#02060b]/72 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[92rem] items-center justify-between px-4 sm:px-6 lg:px-8">
          <a
            href={`/${locale}`}
            className="font-space text-sm font-black uppercase tracking-[0.42em] text-emerald-300"
          >
            Genezisi
          </a>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-cyan-300/16 bg-cyan-300/[0.06] px-4 text-sm font-bold text-white transition hover:border-cyan-300/30 hover:bg-cyan-300/[0.1]"
          >
            <MessageCircle className="h-4 w-4 text-cyan-200" />
            Message me
          </a>
        </div>
      </header>

      <section
        ref={sectionRef}
        className="relative h-[360vh] min-h-[2200px]"
      >
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_66%_38%,rgba(34,211,238,.12),transparent_28%),radial-gradient(circle_at_20%_15%,rgba(52,211,153,.08),transparent_22%)]" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] [background-size:56px_56px]" />

          <motion.div
            style={motionStyle}
            className="absolute left-1/2 top-[15%] z-30 w-[min(92vw,82rem)] -translate-x-1/2"
          >
            <p className="mb-5 text-[10px] font-black uppercase tracking-[0.24em] text-emerald-200/62 sm:text-xs">
              Websites · AI · Automation
            </p>
            <h1 className="max-w-[9.5ch] text-[clamp(3.2rem,8.5vw,8.8rem)] font-black leading-[0.86] tracking-[-0.055em] text-white">
              Your website is only the beginning.
            </h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-white/52 sm:text-lg">
              Genezisi designs the experience people see — and the systems that
              make something useful happen next.
            </p>
          </motion.div>

          {/* Desktop spatial story */}
          <div className="absolute inset-x-0 bottom-[7%] top-[34%] hidden lg:block">
            <motion.div
              style={
                reduceMotion
                  ? { x: "-30%", scale: 0.82, rotateY: -5 }
                  : { x: siteX, scale: siteScale, rotateY: siteRotate }
              }
              className="absolute left-[18%] top-[7%] z-20 h-[63%] w-[48%] origin-center [perspective:1200px]"
            >
              <WebsitePanel />
            </motion.div>

            <motion.div
              style={
                reduceMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: systemOpacity, y: systemY }
              }
              className="absolute inset-0 z-10"
            >
              <div className="absolute left-[45%] top-[3%] h-[38%] w-[24%]">
                <AssistantPanel />
              </div>
              <div className="absolute left-[60%] top-[48%] h-[39%] w-[20%]">
                <BookingPanel />
              </div>
              <div className="absolute right-[4%] top-[7%] h-[45%] w-[19%]">
                <OwnerPanel />
              </div>

              <svg
                aria-hidden
                className="absolute inset-0 h-full w-full overflow-visible"
                viewBox="0 0 1000 520"
                preserveAspectRatio="none"
              >
                <path
                  d="M 350 310 C 420 250, 440 210, 510 205 S 640 300, 690 330 S 790 245, 855 210"
                  fill="none"
                  stroke="rgba(255,255,255,.08)"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  d="M 855 210 C 900 225, 920 270, 930 315"
                  fill="none"
                  stroke="rgba(253,230,138,.18)"
                  strokeWidth="2"
                  strokeDasharray="5 8"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>

              <motion.div
                style={
                  reduceMotion
                    ? {
                        left: "84%",
                        top: "43%",
                        opacity: 0,
                      }
                    : {
                        left: signalLeft,
                        top: signalTop,
                        opacity: signalOpacity,
                      }
                }
                className="absolute z-40 -translate-x-1/2 -translate-y-1/2"
              >
                <span className="block h-4 w-4 rounded-full bg-cyan-200 shadow-[0_0_12px_rgba(34,211,238,.95),0_0_40px_rgba(34,211,238,.55)]" />
              </motion.div>
            </motion.div>
          </div>

          {/* Mobile: one primary panel at a time. Same story, different choreography. */}
          <div className="absolute inset-x-4 bottom-[8%] top-[39%] lg:hidden">
            <motion.div
              style={
                reduceMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: systemOpacity, y: systemY }
              }
              className="relative h-full"
            >
              <motion.div
                style={{
                  opacity: reduceMotion
                    ? 0
                    : useTransform(
                        scrollYProgress,
                        [0.22, 0.32, 0.42],
                        [1, 1, 0],
                      ),
                }}
                className="absolute inset-0"
              >
                <WebsitePanel />
              </motion.div>

              <motion.div
                style={{
                  opacity: reduceMotion
                    ? 0
                    : useTransform(
                        scrollYProgress,
                        [0.34, 0.44, 0.54, 0.6],
                        [0, 1, 1, 0],
                      ),
                }}
                className="absolute inset-0"
              >
                <AssistantPanel />
              </motion.div>

              <motion.div
                style={{
                  opacity: reduceMotion
                    ? 0
                    : useTransform(
                        scrollYProgress,
                        [0.54, 0.62, 0.7, 0.76],
                        [0, 1, 1, 0],
                      ),
                }}
                className="absolute inset-0"
              >
                <BookingPanel />
              </motion.div>

              <motion.div
                style={{
                  opacity: reduceMotion
                    ? 1
                    : useTransform(
                        scrollYProgress,
                        [0.7, 0.79, 0.92],
                        [0, 1, 1],
                      ),
                }}
                className="absolute inset-0"
              >
                <OwnerPanel />
              </motion.div>

              <div className="pointer-events-none absolute left-5 top-5 z-50 flex items-center gap-2 rounded-full border border-cyan-200/12 bg-[#03101a]/75 px-3 py-2 backdrop-blur">
                <SignalDot className="h-2.5 w-2.5" />
                <span className="text-[9px] font-black uppercase tracking-[0.18em] text-cyan-100/55">
                  The Signal
                </span>
              </div>
            </motion.div>
          </div>

          <motion.div
            style={
              reduceMotion
                ? { opacity: 1, y: 0 }
                : { opacity: finalOpacity, y: finalY }
            }
            className="pointer-events-none absolute inset-x-0 bottom-[7%] z-50 mx-auto w-[min(92vw,78rem)]"
          >
            <div className="flex items-end justify-between gap-8 border-t border-white/10 pt-5">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-100/45">
                  Signal resolved
                </p>
                <p className="mt-2 max-w-2xl text-2xl font-black tracking-[-0.035em] text-white sm:text-4xl">
                  Beautiful on the surface. Useful underneath.
                </p>
              </div>
              <span className="hidden text-sm font-semibold text-white/35 sm:block">
                Scroll to the work ↓
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-28 pt-24 sm:px-6 lg:px-8">
        <p className="text-[10px] font-black uppercase tracking-[0.22em] text-emerald-200/55">
          Prototype boundary
        </p>
        <h2 className="mt-4 max-w-3xl text-4xl font-black leading-[0.96] tracking-[-0.045em] sm:text-6xl">
          This is where selected work will take over.
        </h2>
        <p className="mt-6 max-w-xl text-base leading-7 text-white/48">
          The production V2 homepage will become deliberately calmer here:
          fewer cards, larger project imagery, concise proof, and a direct
          message path.
        </p>
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-5 text-sm font-black text-[#06101a]"
        >
          <MessageCircle className="h-4 w-4" />
          Message me
        </a>
      </section>
    </main>
  );
}
