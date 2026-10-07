import { ArrowDownRight, MessageCircle } from "lucide-react";
import type { V2Copy } from "./hero.copy";
import { HeroInterface, Signal } from "./HeroInterface";

export function V2Hero({ copy, contactHref }: { copy: V2Copy; contactHref: string }) {
  return (
    <section className="v2-home relative overflow-hidden bg-[#02060b] px-5 pb-20 pt-28 text-white sm:px-8 sm:pt-32 lg:flex lg:min-h-[calc(100svh-64px)] lg:items-center lg:pb-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_34%,rgba(165,243,252,.055),transparent_28%)]" />
      <div className="relative mx-auto w-full max-w-[92rem]">
        <div className="grid items-center gap-12 lg:grid-cols-[.46fr_.54fr] lg:gap-14 xl:gap-20">
          <div className="v2-hero-enter">
            <div className="flex items-center gap-3 text-[10px] font-extrabold uppercase tracking-[.22em] text-white/58"><Signal quiet /><span>{copy.services}</span></div>
            <h1 className="mt-6 text-[clamp(3.55rem,7vw,7.5rem)] font-black leading-[.88] tracking-[-.06em]"><span className="hidden whitespace-pre-line lg:inline">{copy.heroDesktop}</span><span className="whitespace-pre-line lg:hidden">{copy.heroMobile}</span></h1>
            <p className="mt-7 max-w-[36rem] text-[17px] leading-8 text-white/62 sm:text-lg">{copy.heroSub}</p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a href={contactHref} target="_blank" rel="noopener noreferrer" className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-5 text-sm font-extrabold text-[#071019] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"><MessageCircle className="h-4 w-4" aria-hidden />{copy.message}<span className="transition-transform group-hover:translate-x-0.5" aria-hidden>→</span></a>
              <a href="#work" className="group inline-flex min-h-12 items-center gap-2 px-2 text-sm font-extrabold text-white/72 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200">{copy.seeWork}<ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-y-0.5" aria-hidden /></a>
            </div>
          </div>
          <div className="v2-hero-enter v2-hero-enter-delay relative min-w-0">
            <HeroInterface />
            <div className="mt-3 grid grid-cols-2 gap-2 text-[10px] font-extrabold uppercase tracking-[.13em] text-white/46 sm:grid-cols-3">
              {[copy.websiteTitle, copy.aiTitle, copy.automationTitle].map((label, i) => <div key={label} className="flex min-h-11 items-center gap-2 rounded-[14px] border border-white/[.08] px-3"><span className={i === 1 ? "h-1.5 w-1.5 rounded-full bg-cyan-200" : "h-1.5 w-1.5 rounded-full bg-white/20"} aria-hidden /><span className="truncate">{label}</span></div>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
