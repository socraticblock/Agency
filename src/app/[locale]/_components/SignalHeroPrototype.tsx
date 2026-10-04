"use client";

import { useMemo, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, CalendarDays, Check, MessageCircle, UserRoundCheck } from "lucide-react";
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
  const storyRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: storyRef, offset: ["start start", "end end"] });
  const signalY = useTransform(scrollYProgress, [0, .18, .38, .58, .78, 1], ["8%","22%","39%","56%","74%","92%"]);
  const signalOpacity = useTransform(scrollYProgress, [0,.04,.9,1], [0,1,1,0]);
  const surfaceX = useTransform(scrollYProgress, [.16,.34], ["0vw","-12vw"]);
  const surfaceScale = useTransform(scrollYProgress, [.16,.34], [1,.86]);
  const surfaceRotate = useTransform(scrollYProgress, [.16,.34], [0,-4]);
  const systemOpacity = useTransform(scrollYProgress, [.24,.38,.72,.86], [0,1,1,.25]);
  const actionOpacity = useTransform(scrollYProgress, [.42,.56,.78,.9], [0,1,1,.2]);
  const ownerOpacity = useTransform(scrollYProgress, [.64,.76,.92,1], [0,1,1,0]);
  const waHref = useMemo(() => `https://wa.me/${WHATSAPP_INTAKE}?text=${encodeURIComponent(PROTOTYPE_MESSAGE)}`, []);
  const ka = locale === "ka";
  const copy = ka ? {
    services: "ვებსაიტები · AI · ავტომატიზაცია", hero: "თქვენი ვებსაიტი მხოლოდ დასაწყისია.", heroSub: "გამორჩეული ციფრული გამოცდილება და სასარგებლო სისტემები, რომლებიც მის უკან მუშაობს.", message: "მომწერეთ", work: "რჩეული ნამუშევრები", proof: "საქმე, არა დაპირებები.", capabilities: "რას ვქმნი", lab: "Genezisi Lab · შიდა დემო", small: "განზრახ პატარა გუნდი", contact: "გაქვთ იდეა?", contactTitle: "მომწერეთ.", contactBody: "ვებსაიტი, AI სისტემა, ავტომატიზაცია — ან მათი კომბინაცია. ყველაფერი ერთი შეტყობინებით იწყება."
  } : {
    services: "{copy.services}", hero: "{copy.hero}", heroSub: "{copy.heroSub}", message: "Message me", work: "Selected work", proof: "Proof, not promises.", capabilities: "What I build", lab: "Genezisi Lab · Internal demo", small: "Small by design", contact: "Have something to build?", contactTitle: "Message me.", contactBody: "A website, an AI system, an automation—or something that combines them. Start with a message."
  };
  return (
    <main className="bg-[#02060b] text-white">
      <header className="fixed inset-x-0 top-0 z-[90] bg-[#02060b]/78 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[92rem] items-center justify-between px-5 sm:px-8">
          <a href={`/${locale}`} className="font-space text-sm font-black uppercase tracking-[.42em] text-white">Genezisi</a>
          <a href={waHref} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center gap-2 rounded-full bg-white px-4 text-sm font-black text-[#071019]"><MessageCircle className="h-4 w-4" />{copy.message}</a>
        </div>
      </header>

      <div ref={storyRef} className="relative hidden h-[360svh] lg:block">
        <div className="sticky top-0 h-[100svh] overflow-hidden bg-[#02060b] px-12 pt-24">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_74%_32%,rgba(34,211,238,.07),transparent_28%)]" />
          <div className="relative mx-auto flex h-full max-w-[92rem] items-center">
            <div className="absolute left-0 top-[15%] z-30 max-w-[44rem]">
              <p className="text-[10px] font-black uppercase tracking-[.22em] text-white/38">{copy.services}</p>
              <h1 className="mt-5 max-w-[7ch] text-[clamp(4.8rem,7.2vw,8.2rem)] font-black leading-[.84] tracking-[-.065em]">{copy.hero}</h1>
              <p className="mt-7 max-w-md text-base leading-7 text-white/48">{copy.heroSub}</p>
            </div>
            <motion.div style={{ x: surfaceX, scale: surfaceScale, rotate: surfaceRotate }} className="absolute right-0 top-[20%] z-40 w-[62%] origin-right"><SiteSurface enquiry /></motion.div>
            <motion.div style={{ opacity: systemOpacity }} className="absolute right-[4%] top-[30%] z-20 w-[36%]"><Understanding /></motion.div>
            <motion.div style={{ opacity: actionOpacity }} className="absolute bottom-[10%] right-[7%] z-30 w-[34%]"><Availability /></motion.div>
            <motion.div style={{ opacity: ownerOpacity }} className="absolute bottom-[13%] left-[7%] z-30 w-[32%]"><Owner /></motion.div>
            {!reduceMotion && <motion.div aria-hidden style={{ top: signalY, opacity: signalOpacity }} className="pointer-events-none absolute right-[2%] z-[70] -translate-y-1/2"><div className="flex items-center gap-3"><span className="text-[9px] font-black uppercase tracking-[.18em] text-cyan-100/35">Signal</span><Signal /></div></motion.div>}
            <div className="absolute bottom-7 left-0 right-0 flex justify-between text-[9px] font-black uppercase tracking-[.2em] text-white/22"><span>Receive</span><span>Route</span><span>Review</span><span>Resolve</span></div>
          </div>
        </div>
      </div>

      <div className="lg:hidden">
      <FrameShell index="01" label="First impression">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div><p className="text-[10px] font-black uppercase tracking-[.22em] text-white/38">{copy.services}</p><h1 className="mt-5 max-w-[8ch] text-[clamp(3.5rem,7.8vw,8.5rem)] font-black leading-[.84] tracking-[-.065em]">{copy.hero}</h1><p className="mt-7 max-w-lg text-base leading-7 text-white/48">{copy.heroSub}</p></div>
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
      </div>

      <section id="work" className="bg-[#f0ece5] px-5 py-28 text-[#101114] sm:px-8 lg:py-40">
        <div className="mx-auto max-w-[92rem]">
          <p className="text-[10px] font-black uppercase tracking-[.22em] text-black/38">{copy.work}</p>
          <h2 className="mt-5 max-w-[9ch] text-[clamp(3.5rem,8vw,8rem)] font-black leading-[.86] tracking-[-.065em]">{copy.proof}</h2>
          <div className="mt-20 space-y-24 lg:mt-28 lg:space-y-36">
            <a href="https://tkcounsel.com/" target="_blank" rel="noopener noreferrer" className="group grid gap-7 lg:grid-cols-[1.35fr_.65fr] lg:items-end">
              <div className="min-h-[52vw] overflow-hidden rounded-[2rem] bg-[#d9d2c8] p-7 sm:min-h-[520px] lg:min-h-[650px]">
                <div className="flex justify-between text-[9px] font-black uppercase tracking-[.18em] text-black/35"><span>TK Counsel</span><span>Legal / Professional</span></div>
                <div className="flex h-[80%] items-end"><p className="max-w-[8ch] text-[clamp(3rem,7vw,7rem)] font-black leading-[.86] tracking-[-.06em]">Counsel with clarity.</p></div>
              </div>
              <div className="pb-2"><p className="text-3xl font-black tracking-[-.04em]">TK Counsel</p><p className="mt-4 max-w-md text-base leading-7 text-black/55">A professional service website built around clarity, credibility and a serious first impression.</p><span className="mt-6 inline-flex items-center gap-2 text-sm font-black">View website <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-1 group-hover:-translate-y-1"/></span></div>
            </a>

            <a href="https://www.frankencoindesk.com/" target="_blank" rel="noopener noreferrer" className="group grid gap-7 lg:grid-cols-[.65fr_1.35fr] lg:items-end">
              <div className="order-2 pb-2 lg:order-1"><p className="text-3xl font-black tracking-[-.04em]">Frankencoin Desk</p><p className="mt-4 max-w-md text-base leading-7 text-black/55">A complex product frontend where trust, information hierarchy and user confidence matter.</p><span className="mt-6 inline-flex items-center gap-2 text-sm font-black">View website <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-1 group-hover:-translate-y-1"/></span></div>
              <div className="order-1 min-h-[52vw] overflow-hidden rounded-[2rem] bg-[#071321] p-7 text-white sm:min-h-[520px] lg:order-2 lg:min-h-[650px]">
                <div className="flex justify-between text-[9px] font-black uppercase tracking-[.18em] text-white/35"><span>Frankencoin Desk</span><span>Product / Crypto</span></div>
                <div className="relative mt-10 h-[75%] overflow-hidden rounded-[1.4rem] border border-white/10 bg-[url('/work-previews/frankencoin-desk.png')] bg-cover bg-top shadow-2xl"/>
              </div>
            </a>

            <a href="https://her-house-pilates.vercel.app/" target="_blank" rel="noopener noreferrer" className="group grid gap-7 lg:grid-cols-[1.35fr_.65fr] lg:items-end">
              <div className="min-h-[52vw] overflow-hidden rounded-[2rem] bg-[#d8c9b5] p-7 sm:min-h-[520px] lg:min-h-[650px]">
                <div className="flex justify-between text-[9px] font-black uppercase tracking-[.18em] text-black/35"><span>Her House Pilates</span><span>Wellness / Studio</span></div>
                <div className="flex h-[80%] items-center justify-center"><p className="max-w-[7ch] text-center text-[clamp(3rem,7vw,7rem)] font-black leading-[.86] tracking-[-.06em]">Move with intention.</p></div>
              </div>
              <div className="pb-2"><p className="text-3xl font-black tracking-[-.04em]">Her House Pilates</p><p className="mt-4 max-w-md text-base leading-7 text-black/55">A luxury wellness concept with schedule, booking flow and a mobile-first experience.</p><span className="mt-6 inline-flex items-center gap-2 text-sm font-black">View website <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-1 group-hover:-translate-y-1"/></span></div>
            </a>
          </div>
        </div>
      </section>

      <section id="capabilities" className="bg-[#02060b] px-5 py-28 sm:px-8 lg:py-40">
        <div className="mx-auto max-w-[92rem]">
          <p className="text-[10px] font-black uppercase tracking-[.22em] text-white/32">{copy.capabilities}</p>
          <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
            {[["01","Websites","Clear, distinctive digital experiences built to earn attention and trust."],["02","AI systems","Useful assistants and intelligent tools shaped around real business work."],["03","Automation","Connected workflows that remove repetitive steps while keeping people in control."]].map(([n,title,body]) => <div key={n} className="grid gap-4 py-9 sm:grid-cols-[80px_.8fr_1.2fr] sm:items-baseline lg:py-14"><span className="text-xs font-black text-white/25">{n}</span><h3 className="text-3xl font-black tracking-[-.045em] sm:text-5xl">{title}</h3><p className="max-w-xl text-base leading-7 text-white/45">{body}</p></div>)}
          </div>
        </div>
      </section>

      <section className="bg-[#02060b] px-5 py-20 sm:px-8 lg:py-32">
        <div className="mx-auto grid max-w-[92rem] gap-12 border-t border-white/10 pt-14 lg:grid-cols-[.7fr_1.3fr]">
          <div><p className="text-[10px] font-black uppercase tracking-[.22em] text-cyan-100/45">{copy.lab}</p><h2 className="mt-5 text-5xl font-black leading-[.9] tracking-[-.055em] sm:text-7xl">See what the system actually does.</h2></div>
          <div className="grid gap-3 sm:grid-cols-2">
            {["Receive the request","Understand the intent","Take the useful action","Send exceptions to a person"].map((x,i)=><div key={x} className="min-h-40 rounded-[1.5rem] bg-white/[.045] p-6"><span className="text-[10px] font-black text-white/22">0{i+1}</span><p className="mt-12 max-w-[14ch] text-xl font-black">{x}</p></div>)}
          </div>
        </div>
      </section>

      <section id="about" className="bg-[#e8e1d7] px-5 py-28 text-[#101114] sm:px-8 lg:py-40">
        <div className="mx-auto grid max-w-[92rem] gap-14 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
          <div className="aspect-[4/5] max-w-xl overflow-hidden rounded-[2rem] bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,.75),transparent_24%),linear-gradient(145deg,#b8aa97,#665f57)]"><div className="flex h-full items-end p-7 text-[10px] font-black uppercase tracking-[.2em] text-white/55">Founder · Genezisi</div></div>
          <div><p className="text-[10px] font-black uppercase tracking-[.22em] text-black/35">{copy.small}</p><h2 className="mt-5 max-w-[8ch] text-[clamp(3.5rem,7vw,7rem)] font-black leading-[.86] tracking-[-.065em]">You work with the person doing the work.</h2><p className="mt-8 max-w-xl text-lg leading-8 text-black/55">No account-manager layer and no pretend giant team. Genezisi stays small so design, technical decisions and communication stay close together.</p></div>
        </div>
      </section>

      <section id="contact" className="bg-[#02060b] px-5 py-28 sm:px-8 lg:py-44">
        <div className="mx-auto max-w-[92rem]">
          <p className="text-[10px] font-black uppercase tracking-[.22em] text-white/32">{copy.contact}</p>
          <h2 className="mt-6 max-w-[8ch] text-[clamp(4rem,10vw,10rem)] font-black leading-[.82] tracking-[-.07em]">{copy.contactTitle}</h2>
          <p className="mt-8 max-w-xl text-lg leading-8 text-white/45">{copy.contactBody}</p>
          <a href={waHref} target="_blank" rel="noopener noreferrer" className="mt-10 inline-flex min-h-14 items-center gap-3 rounded-full bg-white px-6 text-base font-black text-[#071019]"><MessageCircle className="h-5 w-5"/>Start on WhatsApp <ArrowUpRight className="h-4 w-4"/></a>
          <div className="mt-28 flex items-center justify-between border-t border-white/10 pt-7 text-[10px] font-black uppercase tracking-[.2em] text-white/25"><span>Genezisi</span><span>{copy.services}</span></div>
        </div>
      </section>
    </main>
  );
}
