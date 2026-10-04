import type { ReactNode } from "react";
import { CalendarDays, Check, UserRoundCheck } from "lucide-react";
import type { V2Copy } from "./hero.copy";

export function Signal({ quiet = false }: { quiet?: boolean }) {
  const glow = quiet
    ? "h-2 w-2 shadow-[0_0_12px_rgba(34,211,238,.45)]"
    : "h-3 w-3 shadow-[0_0_14px_rgba(34,211,238,.95),0_0_40px_rgba(34,211,238,.45)]";
  return <span aria-hidden className={"inline-block rounded-full bg-cyan-200 " + glow} />;
}

export function SiteSurface({
  copy,
  enquiry = false,
  compact = false,
  deferredEnquiry = false,
}: {
  copy: V2Copy;
  enquiry?: boolean;
  compact?: boolean;
  deferredEnquiry?: boolean;
}) {
  const showEnquiry = enquiry;
  return (
    <div className={"relative overflow-hidden rounded-[2rem] bg-[#e9e4dc] text-[#101114] shadow-[0_45px_120px_rgba(0,0,0,.45)] " + (compact ? "min-h-[250px] sm:min-h-[330px]" : "min-h-[430px]")}>
      <div className="flex items-center justify-between px-6 py-5 text-[10px] font-black uppercase tracking-[.18em] text-black/60">
        <span>{copy.demoLabel} · Atelier North</span><span>{copy.consultations}</span>
      </div>
      <div className="grid min-h-[230px] grid-cols-1 sm:min-h-[360px] md:grid-cols-[1.1fr_.9fr]">
        <div className="flex flex-col justify-end p-6 sm:p-9">
          <p className="max-w-[9ch] text-[clamp(2rem,8vw,5.8rem)] font-black leading-[.86] tracking-[-.06em]">{copy.siteHeadline}</p>
          <p className="mt-5 hidden max-w-sm text-sm leading-6 text-black/65 sm:block">{copy.siteBody}</p>
          <span className="mt-7 hidden w-fit rounded-full bg-[#111318] px-5 py-3 text-xs font-black text-white sm:inline-block">{copy.book}</span>
        </div>
        <div className="relative m-3 hidden min-h-[230px] overflow-hidden rounded-[1.5rem] bg-[#c8b9a3] sm:block md:m-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_35%,rgba(255,255,255,.7),transparent_28%),linear-gradient(145deg,transparent,rgba(0,0,0,.18))]" />
          <p className="absolute bottom-5 left-5 max-w-[14ch] text-2xl font-black leading-none tracking-[-.04em]">{copy.siteVisual}</p>
        </div>
      </div>
      {showEnquiry && (
        <div
          data-hero-enquiry={deferredEnquiry ? "" : undefined}
          className={"absolute bottom-5 right-5 max-w-[min(88%,390px)] rounded-[1.4rem] bg-[#11151a] p-4 text-white shadow-2xl " + (deferredEnquiry ? "opacity-0" : "")}
        >
          <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[.18em] text-white/60"><Signal /> {copy.newEnquiry}</div>
          <p className="mt-3 text-base font-semibold leading-6">“{copy.customerMessage}”</p>
        </div>
      )}
    </div>
  );
}

export function MobileSurfacePreview({ copy }: { copy: V2Copy }) {
  return (
    <div className="relative mt-6 min-h-[132px] overflow-hidden rounded-[1.4rem] bg-[#e9e4dc] p-4 text-[#101114] shadow-[0_24px_60px_rgba(0,0,0,.35)]">
      <div className="flex items-center justify-between text-[8px] font-black uppercase tracking-[.16em] text-black/60">
        <span>Atelier North</span><span>{copy.consultations}</span>
      </div>
      <div className="mt-7 grid grid-cols-[1.2fr_.8fr] items-end gap-4">
        <p className="max-w-[10ch] text-2xl font-black leading-[.88] tracking-[-.05em]">{copy.siteHeadline}</p>
        <div className="h-16 rounded-[1rem] bg-[radial-gradient(circle_at_60%_35%,rgba(255,255,255,.75),transparent_28%),linear-gradient(145deg,#c8b9a3,#968a7c)]" />
      </div>
    </div>
  );
}

export function Understanding({ copy }: { copy: V2Copy }) {
  return (
    <div className="max-w-xl">
      <p className="text-[10px] font-black uppercase tracking-[.2em] text-white/60">{copy.requestUnderstood}</p>
      <p className="mt-4 text-3xl font-black tracking-[-.045em] sm:text-5xl">{copy.parsedRequest}</p>
      <div className="mt-7 flex items-center gap-3 text-sm text-white/60"><Signal /><span>{copy.requestNextStep}</span></div>
    </div>
  );
}

export function Availability({ copy }: { copy: V2Copy }) {
  const rows = [copy.requestRecorded, copy.timeAvailable, copy.confirmationPrepared];
  return (
    <div className="w-full max-w-xl rounded-[2rem] bg-[#f1eee8] p-6 text-[#111318] shadow-[0_40px_100px_rgba(0,0,0,.35)] sm:p-8">
      <div className="flex items-center gap-4">
        <CalendarDays className="h-6 w-6" aria-hidden />
        <div>
          <p className="text-xs font-black uppercase tracking-[.16em] text-black/60">{copy.availability}</p>
          <p className="mt-1 text-2xl font-black">{copy.availabilityTime}</p>
        </div>
      </div>
      <div className="mt-8 divide-y divide-black/10 border-y border-black/10">
        {rows.map((x) => <div key={x} className="flex items-center gap-3 py-4 text-sm font-semibold"><Check className="h-4 w-4" aria-hidden />{x}</div>)}
      </div>
    </div>
  );
}

export function Owner({ copy }: { copy: V2Copy }) {
  return (
    <div className="w-full max-w-lg">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black"><UserRoundCheck className="h-5 w-5" aria-hidden /></div>
        <div><p className="text-[10px] font-black uppercase tracking-[.18em] text-white/60">{copy.needsReview}</p><p className="text-xl font-black">{copy.owner}</p></div>
      </div>
      <p className="mt-7 max-w-md text-2xl font-semibold leading-tight text-white/80">{copy.ownerBody}</p>
      <div aria-hidden className="mt-7 h-px w-full bg-gradient-to-r from-amber-200/45 to-transparent" />
    </div>
  );
}

export function Resolved({ copy }: { copy: V2Copy }) {
  return (
    <div className="mx-auto max-w-5xl text-center">
      <div className="mx-auto mb-7 flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[.2em] text-white/60"><Signal quiet />{copy.signalResolved}</div>
      <h2 className="text-[clamp(3.1rem,8vw,8rem)] font-black leading-[.86] tracking-[-.065em]">{copy.surfaceUseful}<br /><span className="text-white/55">{copy.underneathUseful}</span></h2>
      <p className="mx-auto mt-7 max-w-xl text-base leading-7 text-white/60">{copy.resolvedOutcome}</p>
      <a href="#work" className="mt-8 inline-flex min-h-11 items-center rounded-full px-4 text-sm font-semibold text-white/65 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200">{copy.seeWork}</a>
    </div>
  );
}

function StaticFrame({
  index,
  label,
  children,
}: {
  index: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-x-hidden border-b border-white/[.06] bg-[#02060b] px-5 pb-10 pt-24 text-white sm:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_30%,rgba(34,211,238,.055),transparent_26%)]" />
      <div className="relative mx-auto flex w-full max-w-[92rem] items-center justify-between text-[9px] font-black uppercase tracking-[.2em] text-white/35"><span>{index}</span><span>{label}</span></div>
      <div className="relative mx-auto flex w-full max-w-[92rem] flex-1 items-center py-10">{children}</div>
    </section>
  );
}

export function StaticStory({ copy }: { copy: V2Copy }) {
  return (
    <div>
      <StaticFrame index="01" label={copy.firstImpression}>
        <div className="grid w-full items-center gap-10">
          <div><p className="text-[10px] font-black uppercase tracking-[.22em] text-white/60">{copy.services}</p><h1 className="mt-5 max-w-[8ch] text-[clamp(3.3rem,10vw,6rem)] font-black leading-[.84] tracking-[-.065em]">{copy.hero}</h1><p className="mt-7 max-w-lg text-base leading-7 text-white/55">{copy.heroSub}</p></div>
          <SiteSurface copy={copy} compact />
        </div>
      </StaticFrame>
      <StaticFrame index="02" label={copy.enquiryReceived}>
        <div className="w-full"><p className="text-[10px] font-black uppercase tracking-[.2em] text-cyan-100/65">{copy.receive}</p><h2 className="mt-4 text-5xl font-black tracking-[-.05em]">{copy.someoneAsks}</h2><div className="mt-10"><SiteSurface copy={copy} enquiry compact /></div></div>
      </StaticFrame>
      <StaticFrame index="03" label={copy.systemRevealed}><Understanding copy={copy} /></StaticFrame>
      <StaticFrame index="04" label={copy.usefulAction}><Availability copy={copy} /></StaticFrame>
      <StaticFrame index="05" label={copy.humanJudgment}><Owner copy={copy} /></StaticFrame>
      <StaticFrame index="06" label={copy.resolved}><div className="w-full"><Resolved copy={copy} /></div></StaticFrame>
    </div>
  );
}
