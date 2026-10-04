"use client";

import { useMemo } from "react";
import { CalendarDays, Check, MessageCircle, UserRoundCheck } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { WHATSAPP_INTAKE } from "@/constants/content";

const MESSAGE = "Can I book a consultation next Tuesday?";
const PROTOTYPE_MESSAGE = "Hi Genezisi, I have something I'd like to build. Can we talk?";

function Signal({ quiet = false }: { quiet?: boolean }) {
  return <span aria-hidden className={`inline-block rounded-full bg-cyan-200 ${quiet ? "h-2 w-2 shadow-[0_0_12px_rgba(34,211,238,.45)]" : "h-3 w-3 shadow-[0_0_14px_rgba(34,211,238,.95),0_0_40px_rgba(34,211,238,.45)]"}`} />;
}

function SiteSurface({ enquiry = false, compact = false }: { enquiry?: boolean; compact?: boolean }) {
  return (
    <div className={`relative overflow-hidden rounded-[2rem] bg-[#e9e4dc] text-[#101114] shadow-[0_45px_120px_rgba(0,0,0,.45)] ${compact ? "min-h-[330px]" : "min-h-[430px]"}`}>
      <div className="flex items-center justify-between px-6 py-5 text-[10px] font-black uppercase tracking-[.18em] text-black/45">
        <span>Atelier North</span><span>Consultations</span>
      </div>
      <div className="grid min-h-[360px] grid-cols-1 md:grid-cols-[1.1fr_.9fr]">
        <div className="flex flex-col justify-end p-6 sm:p-9">
          <p className="max-w-[9ch] text-[clamp(2.5rem,5vw,5.8rem)] font-black leading-[.86] tracking-[-.06em]">Make room for better work.</p>
          <p className="mt-5 max-w-sm text-sm leading-6 text-black/55">A focused consultation for businesses ready to simplify what happens next.</p>
          <span className="mt-7 w-fit rounded-full bg-[#111318] px-5 py-3 text-xs font-black text-white">Book a consultation</span>
        </div>
        <div className="relative m-3 min-h-[230px] overflow-hidden rounded-[1.5rem] bg-[#c8b9a3] md:m-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_35%,rgba(255,255,255,.7),transparent_28%),linear-gradient(145deg,transparent,rgba(0,0,0,.18))]" />
          <p className="absolute bottom-5 left-5 max-w-[13ch] text-2xl font-black leading-none tracking-[-.04em]">Quiet thinking. Clear decisions.</p>
        </div>
      </div>
      {enquiry && (
        <div className="absolute bottom-5 right-5 max-w-[min(88%,390px)] rounded-[1.4rem] bg-[#11151a] p-4 text-white shadow-2xl">
          <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[.18em] text-white/35"><Signal /> New enquiry</div>
          <p className="mt-3 text-base font-semibold leading-6">“{MESSAGE}”</p>
        </div>
      )}
    </div>
  );
}

function Understanding() {
  return (
    <div className="max-w-xl">
      <p className="text-[10px] font-black uppercase tracking-[.2em] text-white/32">Request understood</p>
      <p className="mt-4 text-3xl font-black tracking-[-.045em] sm:text-5xl">Tuesday. Consultation. Check availability.</p>
      <div className="mt-7 flex items-center gap-3 text-sm text-white/52"><Signal /><span>The request becomes a useful next step.</span></div>
    </div>
  );
}

function Availability() {
  return (
    <div className="w-full max-w-xl rounded-[2rem] bg-[#f1eee8] p-6 text-[#111318] shadow-[0_40px_100px_rgba(0,0,0,.35)] sm:p-8">
      <div className="flex items-center gap-4"><CalendarDays className="h-6 w-6" /><div><p className="text-xs font-black uppercase tracking-[.16em] text-black/35">Availability</p><p className="mt-1 text-2xl font-black">Tuesday · 14:00</p></div></div>
      <div className="mt-8 divide-y divide-black/10 border-y border-black/10">
        {["Request recorded","Time available","Confirmation prepared"].map(x => <div key={x} className="flex items-center gap-3 py-4 text-sm font-semibold"><Check className="h-4 w-4" />{x}</div>)}
      </div>
    </div>
  );
}

function Owner() {
  return (
    <div className="w-full max-w-lg">
      <div className="flex items-center gap-4"><div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black"><UserRoundCheck className="h-5 w-5" /></div><div><p className="text-[10px] font-black uppercase tracking-[.18em] text-white/35">Needs review</p><p className="text-xl font-black">Socratic · Owner</p></div></div>
      <p className="mt-7 max-w-md text-2xl font-semibold leading-tight text-white/78">Automation handles the repetition. Judgment stays with a person.</p>
      <div className="mt-7 h-px w-full bg-gradient-to-r from-amber-200/45 to-transparent" />
    </div>
  );
}

function FrameShell({ index, label, children }: { index: string; label: string; children: React.ReactNode }) {
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden border-b border-white/[.06] bg-[#02060b] px-5 pb-10 pt-24 text-white sm:px-8 lg:px-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_30%,rgba(34,211,238,.055),transparent_26%)]" />
      <div className="relative mx-auto flex w-full max-w-[92rem] items-center justify-between text-[9px] font-black uppercase tracking-[.2em] text-white/28"><span>{index}</span><span>{label}</span></div>
      <div className="relative mx-auto flex w-full max-w-[92rem] flex-1 items-center py-10">{children}</div>
    </section>
  );
}

export function SignalHeroPrototype({ locale }: { locale: Locale }) {
  const waHref = useMemo(() => `https://wa.me/${WHATSAPP_INTAKE}?text=${encodeURIComponent(PROTOTYPE_MESSAGE)}`, []);
  return (
    <main className="bg-[#02060b] text-white">
      <header className="fixed inset-x-0 top-0 z-[90] bg-[#02060b]/78 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[92rem] items-center justify-between px-5 sm:px-8">
          <a href={`/${locale}`} className="font-space text-sm font-black uppercase tracking-[.42em] text-white">Genezisi</a>
          <a href={waHref} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center gap-2 rounded-full bg-white px-4 text-sm font-black text-[#071019]"><MessageCircle className="h-4 w-4" />Message me</a>
        </div>
      </header>

      <FrameShell index="01" label="First impression">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div><p className="text-[10px] font-black uppercase tracking-[.22em] text-white/38">Websites · AI · Automation</p><h1 className="mt-5 max-w-[8ch] text-[clamp(3.5rem,7.8vw,8.5rem)] font-black leading-[.84] tracking-[-.065em]">Your website is only the beginning.</h1><p className="mt-7 max-w-lg text-base leading-7 text-white/48">Beautiful digital experiences, with useful systems working underneath.</p></div>
          <SiteSurface />
        </div>
      </FrameShell>

      <FrameShell index="02" label="Enquiry received">
        <div className="grid w-full items-center gap-8 lg:grid-cols-[.55fr_1.45fr]"><div><p className="text-[10px] font-black uppercase tracking-[.2em] text-cyan-100/55">Receive</p><h2 className="mt-4 text-4xl font-black tracking-[-.05em] sm:text-6xl">Someone asks.</h2></div><SiteSurface enquiry /></div>
      </FrameShell>

      <FrameShell index="03" label="System revealed">
        <div className="relative grid w-full items-center gap-10 lg:grid-cols-[1.15fr_.85fr]">
          <div className="relative z-20 origin-right lg:-rotate-[3deg] lg:scale-[.88]"><SiteSurface enquiry compact /></div>
          <div className="relative z-10 lg:-ml-16"><Understanding /><svg aria-hidden className="mt-10 h-24 w-full" viewBox="0 0 500 100" preserveAspectRatio="none"><path d="M0 55 C130 55 160 15 280 50 S410 72 500 28" fill="none" stroke="rgba(255,255,255,.1)" strokeWidth="1.5"/><circle cx="280" cy="50" r="5" fill="#a5f3fc"/></svg></div>
        </div>
      </FrameShell>

      <FrameShell index="04" label="Useful action">
        <div className="grid w-full items-center gap-12 lg:grid-cols-2"><div><p className="text-[10px] font-black uppercase tracking-[.2em] text-cyan-100/55">Route</p><h2 className="mt-5 max-w-[8ch] text-5xl font-black leading-[.9] tracking-[-.055em] sm:text-7xl">The request becomes useful.</h2><p className="mt-7 flex items-center gap-3 text-sm text-white/45"><Signal />{MESSAGE}</p></div><Availability /></div>
      </FrameShell>

      <FrameShell index="05" label="Human judgment">
        <div className="grid w-full items-center gap-14 lg:grid-cols-[1.1fr_.9fr]"><div><Availability /></div><Owner /></div>
      </FrameShell>

      <FrameShell index="06" label="Resolved">
        <div className="w-full">
          <div className="mx-auto max-w-5xl text-center"><div className="mx-auto mb-7 flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[.2em] text-white/32"><Signal quiet />Signal resolved</div><h2 className="text-[clamp(3.4rem,8vw,8rem)] font-black leading-[.86] tracking-[-.065em]">Beautiful on the surface.<br/><span className="text-white/45">Useful underneath.</span></h2><p className="mt-9 text-sm font-semibold text-white/35">See the work ↓</p></div>
        </div>
      </FrameShell>
    </main>
  );
}
