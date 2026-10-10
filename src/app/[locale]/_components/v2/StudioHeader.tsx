import Link from "next/link";
import {
  HOME_HREFLANG,
  HOME_LOCALE_LABEL,
  HOME_LOCALES,
  type HomeLocale,
} from "@/lib/home-i18n";
import type { V2Copy } from "./hero.copy";

/**
 * Fixed studio header.
 *
 * Three language controls plus the contact CTA have to survive a 320px phone
 * next to the wordmark. Gaps, tracking and CTA padding shrink first; nothing is
 * hidden, because changing language must never require opening a menu.
 */
export function StudioHeader({ locale, copy, contactHref }: { locale: HomeLocale; copy: V2Copy; contactHref: string }) {
  return <header className="fixed inset-x-0 top-0 z-[90] border-b border-white/10 bg-[#02060b]"><div className="mx-auto flex h-16 max-w-[92rem] items-center gap-2 px-3 sm:gap-4 sm:px-8 lg:px-12"><Link href={"/"+locale} className="mr-auto font-space text-[11px] font-black uppercase tracking-[.14em] text-white sm:text-sm sm:tracking-[.3em]">Genezisi</Link><nav aria-label={copy.primaryNavLabel} className="hidden items-center gap-7 text-sm font-semibold text-white/58 lg:flex"><a href="#work" className="hover:text-white">{copy.navWork}</a><a href="#capabilities" className="hover:text-white">{copy.navCapabilities}</a><a href="#about" className="hover:text-white">{copy.navAbout}</a></nav><nav aria-label={copy.languageNavLabel} className="flex shrink-0 items-center text-[11px] font-bold text-white/48">{HOME_LOCALES.map((tag,index)=><span key={tag} className="flex items-center">{index>0&&<span aria-hidden className="px-0.5 text-white/25">·</span>}<Link href={"/"+tag} lang={HOME_HREFLANG[tag]} hrefLang={HOME_HREFLANG[tag]} aria-current={locale===tag?"page":undefined} className="flex min-h-11 min-w-7 items-center justify-center px-1 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200 sm:min-w-8 sm:px-2">{HOME_LOCALE_LABEL[tag]}</Link></span>)}</nav><a href={contactHref} target="_blank" rel="noopener noreferrer" className="group inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-full bg-white px-3 text-[11px] font-extrabold text-[#071019] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200 sm:gap-2 sm:px-4 sm:text-sm">{copy.message}<span className="transition-transform group-hover:translate-x-0.5" aria-hidden>→</span></a></div></header>;
}
