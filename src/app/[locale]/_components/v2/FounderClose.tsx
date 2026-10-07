import { MessageCircle } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { V2Copy } from "./hero.copy";

export function FounderClose({ copy, contactHref }: { copy: V2Copy; contactHref: string }) {
  return (
    <section id="about" className="scroll-mt-16 bg-[#f0ece5] px-5 py-12 text-[#101114] sm:px-8 lg:py-14">
      <div className="mx-auto grid max-w-[92rem] gap-8 lg:grid-cols-[1.08fr_.92fr] lg:items-center">
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-[.24em] text-black/48">{copy.founderEyebrow}</p>
          <h2 className="mt-3 max-w-[11ch] text-[clamp(2.8rem,4.7vw,5rem)] font-black leading-[.88] tracking-[-.06em]">{copy.founderTitle}</h2>
        </div>
        <div>
          <p className="max-w-xl text-base leading-7 text-black/62">{copy.founderBody}</p>
          <p className="mt-3 max-w-xl text-sm leading-6 text-black/55">{copy.founderBodySecond}</p>
          <a href={contactHref} target="_blank" rel="noopener noreferrer" className="group mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-[#101114] px-5 text-sm font-extrabold text-white">
            <MessageCircle className="h-4 w-4" aria-hidden />
            {copy.startWhatsApp}
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export function StudioFooter({ copy, locale }: { copy: V2Copy; locale: Locale }) {
  return (
    <footer className="bg-[#02060b] px-5 py-6 text-white sm:px-8">
      <div className="mx-auto flex max-w-[92rem] flex-wrap items-center justify-between gap-x-5 gap-y-3 text-[9px] font-extrabold uppercase tracking-[.2em] text-white/45">
        <span className="tracking-[.3em] text-white/70">Genezisi</span>
        <nav aria-label="Language" className="flex items-center gap-2">
          <a href="/en" lang="en" hrefLang="en" aria-current={locale === "en" ? "page" : undefined} className="min-h-11 px-1 py-3 hover:text-white">EN</a>
          <span aria-hidden>·</span>
          <a href="/ka" lang="ka" hrefLang="ka" aria-current={locale === "ka" ? "page" : undefined} className="min-h-11 px-1 py-3 hover:text-white">KA</a>
        </nav>
        <span className="w-full text-right sm:w-auto">{copy.services}</span>
      </div>
    </footer>
  );
}
