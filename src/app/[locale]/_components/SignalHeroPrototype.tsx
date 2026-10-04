"use client";

import { useMemo } from "react";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { WHATSAPP_DEFAULT_MESSAGE, WHATSAPP_INTAKE } from "@/constants/content";
import { getV2Copy } from "./v2/hero.copy";
import { V2Hero } from "./v2/V2Hero";

export function SignalHeroPrototype({ locale }: { locale: Locale }) {
  const copy = getV2Copy(locale);

  const waHref = useMemo(
    () => "https://wa.me/" + WHATSAPP_INTAKE + "?text=" + encodeURIComponent(WHATSAPP_DEFAULT_MESSAGE),
    [],
  );

  const capabilities = [
    ["01", copy.websiteTitle, copy.websiteBody],
    ["02", copy.aiTitle, copy.aiBody],
    ["03", copy.automationTitle, copy.automationBody],
  ];
  const labSteps = [copy.receiveStep, copy.understandStep, copy.actionStep, copy.exceptionStep, copy.outcomeStep];

  return (
    <main className="bg-[#02060b] text-white">
        <header className="fixed inset-x-0 top-0 z-[90] border-b border-white/[.05] bg-[#02060b]/92">
          <div className="mx-auto flex h-16 max-w-[92rem] items-center justify-between gap-6 px-5 sm:px-8">
            <a href={"/" + locale + "/v2-prototype"} className="rounded-sm font-space text-sm font-black uppercase tracking-[.42em] text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200">Genezisi</a>
            <nav aria-label="Primary" className="hidden items-center gap-7 text-sm font-bold text-white/60 lg:flex">
              <a className="hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200" href="#work">{copy.navWork}</a>
              <a className="hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200" href="#capabilities">{copy.navCapabilities}</a>
              <a className="hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200" href="#about">{copy.navAbout}</a>
            </nav>
            <nav aria-label="Language" className="hidden items-center gap-2 text-xs font-black text-white/60 sm:flex">
              <a href="/en/v2-prototype" lang="en" aria-current={locale === "en" ? "page" : undefined} className="rounded-sm px-1.5 py-1 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200">EN</a>
              <span aria-hidden className="text-white/25">·</span>
              <a href="/ka/v2-prototype" lang="ka" aria-current={locale === "ka" ? "page" : undefined} className="rounded-sm px-1.5 py-1 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200">KA</a>
            </nav>
            <a href={waHref} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center gap-2 rounded-full bg-white px-4 text-sm font-black text-[#071019] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"><MessageCircle className="h-4 w-4" aria-hidden />{copy.message}</a>
          </div>
        </header>

        <V2Hero copy={copy} />

        <section id="work" className="scroll-mt-20 bg-[#f0ece5] px-5 py-28 text-[#101114] sm:px-8 lg:py-40">
          <div className="mx-auto max-w-[92rem]">
            <p className="text-[10px] font-black uppercase tracking-[.22em] text-black/60">{copy.work}</p>
            <h2 className="mt-5 max-w-[9ch] text-[clamp(3.5rem,8vw,8rem)] font-black leading-[.86] tracking-[-.065em]">{copy.proof}</h2>
            <div className="mt-20 space-y-24 lg:mt-28 lg:space-y-36">
              <article className="grid gap-7 lg:grid-cols-[1.35fr_.65fr] lg:items-end">
                <div className="relative min-h-[52vw] overflow-hidden rounded-[2rem] bg-[#d9d2c8] p-4 sm:min-h-[520px] lg:min-h-[650px]">
                  <div className="relative z-20 flex justify-between rounded-full bg-[#f0ece5]/90 px-4 py-3 text-[9px] font-black uppercase tracking-[.18em] text-black/65"><span>TK Counsel · {copy.tkStatus}</span><span>{copy.legalCategory}</span></div>
                  <iframe
                    src="https://tkcounsel.com/"
                    title="TK Counsel live website preview"
                    loading="lazy"
                    scrolling="no"
                    tabIndex={-1}
                    aria-hidden
                    className="pointer-events-none absolute left-0 top-0 h-[140%] w-[140%] origin-top-left scale-[.715] border-0 bg-white"
                  />
                  <div aria-hidden className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10" />
                </div>
                <div className="pb-2"><p className="text-3xl font-black tracking-[-.04em]">TK Counsel</p><p className="mt-4 max-w-md text-base leading-7 text-black/60">{copy.tkBody}</p><a href="https://tkcounsel.com/" target="_blank" rel="noopener noreferrer" className="group mt-6 inline-flex items-center gap-2 rounded-sm text-sm font-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black">{copy.viewWebsite} <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden /></a></div>
              </article>

              <article className="grid gap-7 lg:grid-cols-[.65fr_1.35fr] lg:items-end">
                <div className="order-2 pb-2 lg:order-1"><p className="text-3xl font-black tracking-[-.04em]">Frankencoin Desk</p><p className="mt-4 max-w-md text-base leading-7 text-black/60">{copy.frankBody}</p><a href="https://www.frankencoindesk.com/" target="_blank" rel="noopener noreferrer" className="group mt-6 inline-flex items-center gap-2 rounded-sm text-sm font-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black">{copy.viewWebsite} <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden /></a></div>
                <div className="order-1 min-h-[52vw] overflow-hidden rounded-[2rem] bg-[#071321] p-7 text-white sm:min-h-[520px] lg:order-2 lg:min-h-[650px]">
                  <div className="flex justify-between text-[9px] font-black uppercase tracking-[.18em] text-white/60"><span>Frankencoin Desk · {copy.frankStatus}</span><span>{copy.productCategory}</span></div>
                  <div className="relative mt-10 h-[75%] overflow-hidden rounded-[1.4rem] border border-white/10 bg-[url('/work-previews/frankencoin-desk.png')] bg-cover bg-top shadow-2xl" />
                </div>
              </article>

              <article className="grid gap-7 lg:grid-cols-[1.35fr_.65fr] lg:items-end">
                <div className="relative min-h-[52vw] overflow-hidden rounded-[2rem] bg-[#d8c9b5] p-4 sm:min-h-[520px] lg:min-h-[650px]">
                  <div className="relative z-20 flex justify-between rounded-full bg-[#f0ece5]/90 px-4 py-3 text-[9px] font-black uppercase tracking-[.18em] text-black/65"><span>Her House Pilates · {copy.pilatesStatus}</span><span>{copy.wellnessCategory}</span></div>
                  <iframe
                    src="https://her-house-pilates.vercel.app/"
                    title="Her House Pilates live website preview"
                    loading="lazy"
                    scrolling="no"
                    tabIndex={-1}
                    aria-hidden
                    className="pointer-events-none absolute left-0 top-0 h-[140%] w-[140%] origin-top-left scale-[.715] border-0 bg-white"
                  />
                  <div aria-hidden className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10" />
                </div>
                <div className="pb-2"><p className="text-3xl font-black tracking-[-.04em]">Her House Pilates</p><p className="mt-4 max-w-md text-base leading-7 text-black/60">{copy.pilatesBody}</p><a href="https://her-house-pilates.vercel.app/" target="_blank" rel="noopener noreferrer" className="group mt-6 inline-flex items-center gap-2 rounded-sm text-sm font-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black">{copy.viewWebsite} <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden /></a></div>
              </article>
            </div>
          <div className="mt-20 flex flex-col gap-5 border-t border-black/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-xl font-black tracking-[-.025em]">{copy.workContact}</p>
            <a href={waHref} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 w-fit items-center gap-3 rounded-full bg-[#101114] px-5 text-sm font-black text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"><MessageCircle className="h-4 w-4" aria-hidden />{copy.message}</a>
          </div>
          </div>
        </section>

        <section id="capabilities" className="scroll-mt-20 bg-[#02060b] px-5 py-28 sm:px-8 lg:py-40">
          <div className="mx-auto max-w-[92rem]">
            <p className="text-[10px] font-black uppercase tracking-[.22em] text-white/60">{copy.capabilities}</p>
            <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
              {capabilities.map(([n, title, body]) => (
                <div key={n} className="grid gap-4 py-9 sm:grid-cols-[80px_.8fr_1.2fr] sm:items-baseline lg:py-14">
                  <span className="text-xs font-black text-white/30">{n}</span>
                  <h3 className="text-3xl font-black tracking-[-.045em] sm:text-5xl">{title}</h3>
                  <p className="max-w-xl text-base leading-7 text-white/55">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#02060b] px-5 py-20 sm:px-8 lg:py-32">
          <div className="mx-auto grid max-w-[92rem] gap-12 border-t border-white/10 pt-14 lg:grid-cols-[.7fr_1.3fr]">
            <div><p className="text-[10px] font-black uppercase tracking-[.22em] text-cyan-100/55">{copy.lab}</p><h2 className="mt-5 text-5xl font-black leading-[.9] tracking-[-.055em] sm:text-7xl">{copy.labTitle}</h2></div>
            <div className="border-y border-white/10">
              {labSteps.map((x, i) => (
                <div key={x} className="grid min-h-24 grid-cols-[48px_1fr] items-center gap-5 border-b border-white/10 py-5 last:border-b-0 sm:grid-cols-[70px_1fr]">
                  <span className="text-[10px] font-black text-white/45">0{i + 1}</span>
                  <p className="max-w-2xl text-xl font-black tracking-[-.02em] sm:text-2xl">{x}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="scroll-mt-20 bg-[#e8e1d7] px-5 py-28 text-[#101114] sm:px-8 lg:py-40">
          <div className="mx-auto max-w-[92rem]">
            <div className="flex items-center justify-between border-b border-black/15 pb-5 text-[10px] font-black uppercase tracking-[.22em] text-black/60"><span>{copy.small}</span><span>{copy.founderLabel}</span></div>
            <div className="mt-12 grid gap-12 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
              <h2 className="max-w-[9ch] text-[clamp(3.8rem,8vw,8rem)] font-black leading-[.84] tracking-[-.07em]">{copy.founderTitle}</h2>
              <div className="border-l border-black/15 pl-6 sm:pl-8"><p className="max-w-xl text-lg leading-8 text-black/65">{copy.founderBody}</p><p className="mt-8 text-sm font-black uppercase tracking-[.14em] text-black/60">{copy.founderLabel}</p></div>
            </div>
          </div>
        </section>

        <section id="contact" className="bg-[#02060b] px-5 py-28 sm:px-8 lg:py-44">
          <div className="mx-auto max-w-[92rem]">
            <p className="text-[10px] font-black uppercase tracking-[.22em] text-white/60">{copy.contact}</p>
            <h2 className="mt-6 max-w-[8ch] text-[clamp(4rem,10vw,10rem)] font-black leading-[.82] tracking-[-.07em]">{copy.contactTitle}</h2>
            <p className="mt-8 max-w-xl text-lg leading-8 text-white/55">{copy.contactBody}</p>
            <a href={waHref} target="_blank" rel="noopener noreferrer" className="mt-10 inline-flex min-h-14 items-center gap-3 rounded-full bg-white px-6 text-base font-black text-[#071019] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"><MessageCircle className="h-5 w-5" aria-hidden />{copy.startWhatsApp} <ArrowUpRight className="h-4 w-4" aria-hidden /></a>
            <div className="mt-28 flex items-center justify-between border-t border-white/10 pt-7 text-[10px] font-black uppercase tracking-[.2em] text-white/30"><span>Genezisi</span><span>{copy.services}</span></div>
          </div>
        </section>
    </main>
  );
}
