import { ArrowDownRight, MessageCircle } from "lucide-react";
import type { V2Copy } from "./hero.copy";

/**
 * The hero is text-only by owner decision.
 *
 * It previously carried a right-hand artwork panel. Everything that panel could
 * say was already said by the sub-headline directly beside it — the brief
 * mandates supporting copy naming "websites, AI systems and automations" and
 * also asked for nodes naming the same three — so it read as the page repeating
 * itself inside one viewport. Removed rather than kept as decoration.
 *
 * Type scale follows the MotionSites craft rules: a single grotesk system at
 * display weight, ~72-96px desktop / ~36-48px mobile, tracking in the
 * -0.02em..-0.05em band, and a clear scale contrast against the body copy.
 * The previous values sat outside all three bands (7vw -> 100.8px at 1440,
 * -0.06em tracking) and read as the generic AI-landing-page register.
 */
export function V2Hero({ copy, contactHref }: { copy: V2Copy; contactHref: string }) {
  return (
    <section className="v2-home relative overflow-hidden bg-[#02060b] px-5 pb-20 pt-28 text-white sm:px-8 sm:pt-32 lg:flex lg:min-h-[calc(100svh-64px)] lg:items-center lg:pb-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_34%,rgba(165,243,252,.055),transparent_30%)]" />
      <div className="relative mx-auto w-full max-w-[92rem]">
        <div className="text-center">
          <p className="v2-hero-eyebrow text-[11px] font-extrabold uppercase tracking-[.2em] text-white/48">
            {copy.services}
          </p>
          <h1 className="mt-5 text-[clamp(2.55rem,6.1vw,6rem)] font-black leading-[.92] tracking-[-.035em] v2-hero-headline">
            <span className="hidden whitespace-pre-line lg:inline">{copy.heroDesktop}</span>
            <span className="whitespace-pre-line lg:hidden">{copy.heroMobile}</span>
          </h1>
          <p className="v2-hero-sub mx-auto mt-7 max-w-[34rem] text-[17px] leading-8 text-white/62 sm:text-lg">
            {copy.heroSub}
          </p>
          <div className="v2-hero-actions mt-9 flex flex-wrap items-center justify-center gap-3">
            <a href={contactHref} target="_blank" rel="noopener noreferrer" className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-5 text-sm font-extrabold text-[#071019] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"><MessageCircle className="h-4 w-4" aria-hidden />{copy.message}<span className="transition-transform group-hover:translate-x-0.5" aria-hidden>→</span></a>
            <a href="#work" className="group inline-flex min-h-12 items-center gap-2 px-2 text-sm font-extrabold text-white/72 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200">{copy.seeWork}<ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-y-0.5" aria-hidden /></a>
          </div>
        </div>
      </div>
    </section>
  );
}
