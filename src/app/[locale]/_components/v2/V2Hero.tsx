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
 */
export function V2Hero({ copy, contactHref }: { copy: V2Copy; contactHref: string }) {
  return (
    <section className="v2-home relative overflow-hidden bg-[#02060b] px-5 pb-20 pt-28 text-white sm:px-8 sm:pt-32 lg:flex lg:min-h-[calc(100svh-64px)] lg:items-center lg:pb-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_34%,rgba(165,243,252,.055),transparent_30%)]" />
      <div className="relative mx-auto w-full max-w-[92rem]">
        <div className="v2-hero-enter">
          <h1 className="text-[clamp(3.55rem,7vw,7.5rem)] font-black leading-[.88] tracking-[-.06em]"><span className="hidden whitespace-pre-line lg:inline">{copy.heroDesktop}</span><span className="whitespace-pre-line lg:hidden">{copy.heroMobile}</span></h1>
          <p className="mt-7 max-w-[36rem] text-[17px] leading-8 text-white/62 sm:text-lg">{copy.heroSub}</p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href={contactHref} target="_blank" rel="noopener noreferrer" className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-5 text-sm font-extrabold text-[#071019] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"><MessageCircle className="h-4 w-4" aria-hidden />{copy.message}<span className="transition-transform group-hover:translate-x-0.5" aria-hidden>→</span></a>
            <a href="#work" className="group inline-flex min-h-12 items-center gap-2 px-2 text-sm font-extrabold text-white/72 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200">{copy.seeWork}<ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-y-0.5" aria-hidden /></a>
          </div>
        </div>
      </div>
    </section>
  );
}
