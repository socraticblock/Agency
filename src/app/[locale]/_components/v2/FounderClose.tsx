import { MessageCircle } from "lucide-react";
import type { V2Copy } from "./hero.copy";

export function FounderClose({ copy, contactHref }: { copy: V2Copy; contactHref: string }) {
  return <section id="about" className="scroll-mt-16 bg-[#f0ece5] px-5 py-20 text-[#101114] sm:px-8 lg:py-28"><div className="mx-auto grid max-w-[92rem] gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-end"><div><p className="text-[11px] font-extrabold uppercase tracking-[.2em] text-black/50">{copy.founderEyebrow}</p><h2 className="mt-5 max-w-[10ch] text-[clamp(3rem,5vw,5.5rem)] font-black leading-[.9] tracking-[-.055em]">{copy.founderTitle}</h2></div><div><p className="max-w-xl text-lg leading-8 text-black/62">{copy.founderBody}</p><p className="mt-4 max-w-xl text-base leading-7 text-black/55">{copy.founderBodySecond}</p><a href={contactHref} target="_blank" rel="noopener noreferrer" className="group mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-[#101114] px-5 text-sm font-extrabold text-white"><MessageCircle className="h-4 w-4" aria-hidden/>{copy.startWhatsApp}<span className="transition-transform group-hover:translate-x-0.5" aria-hidden>→</span></a></div></div></section>;
}

export function StudioFooter({ copy }: { copy: V2Copy }) {
  return <footer className="bg-[#02060b] px-5 py-7 text-white sm:px-8"><div className="mx-auto flex max-w-[92rem] flex-col gap-3 text-[10px] font-extrabold uppercase tracking-[.18em] text-white/38 sm:flex-row sm:items-center sm:justify-between"><span>Genezisi</span><span>{copy.services}</span></div></footer>;
}