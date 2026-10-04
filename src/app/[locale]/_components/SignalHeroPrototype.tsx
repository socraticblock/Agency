import { ArrowUpRight, MessageCircle } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { WHATSAPP_INTAKE } from "@/constants/content";
import { getV2Copy } from "./v2/hero.copy";
import { V2Hero } from "./v2/V2Hero";
import { V2Lab } from "./v2/V2Lab";

const V2_WHATSAPP_MESSAGE: Record<Locale, string> = {
  en: "Hi Genezisi, I have something I’d like to build. Can we talk?",
  ka: "გამარჯობა Genezisi, მაქვს იდეა, რომლის შექმნაც მინდა. შეგვიძლია ვისაუბროთ?",
};

function ProjectCover({
  variant,
  title,
  status,
  category,
  tagline,
}: {
  variant: "legal" | "product" | "wellness";
  title: string;
  status: string;
  category: string;
  tagline: string;
}) {
  if (variant === "product") {
    return (
      <div className="relative min-h-[52vw] overflow-hidden rounded-[2rem] bg-[#071321] p-5 text-white sm:min-h-[520px] lg:min-h-[650px]">
        <div className="relative z-20 flex justify-between rounded-full border border-white/10 bg-[#071321]/88 px-4 py-3 text-[9px] font-black uppercase tracking-[.18em] text-white/62 backdrop-blur-sm">
          <span>{title} · {status}</span>
          <span>{category}</span>
        </div>
        <div className="absolute inset-x-[5%] bottom-[6%] top-[18%] overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0b1725] shadow-[0_30px_90px_rgba(0,0,0,.35)]">
          <img
            src="/work-previews/frankencoin-desk.png"
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-top brightness-110 saturate-[.88]"
          />
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[.06]" />
        </div>
      </div>
    );
  }

  if (variant === "wellness") {
    return (
      <div className="relative min-h-[52vw] overflow-hidden rounded-[2rem] bg-[#e8dfd3] p-5 text-[#171513] sm:min-h-[520px] lg:min-h-[650px]">
        <div className="relative z-20 flex justify-between rounded-full bg-[#f8f3ec]/92 px-4 py-3 text-[9px] font-black uppercase tracking-[.18em] text-black/58">
          <span>{title} · {status}</span>
          <span>{category}</span>
        </div>
        <div className="absolute inset-x-[5%] bottom-[6%] top-[18%] overflow-hidden rounded-[1.7rem] bg-[#f7f1e8] shadow-[0_35px_90px_rgba(67,45,30,.18)]">
          <div className="grid h-full md:grid-cols-[.82fr_1.18fr]">
            <div className="relative z-10 flex flex-col justify-between p-[8%] md:p-[10%]">
              <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-[.2em] text-black/48">
                <span>HER HOUSE</span>
                <span>Vera · Tbilisi</span>
              </div>
              <div>
                <p className="text-[9px] font-black uppercase tracking-[.18em] text-black/42">Luxury women&apos;s wellness club</p>
                <p className="mt-4 max-w-[8ch] text-[clamp(2.4rem,5.3vw,5rem)] font-black leading-[.86] tracking-[-.06em]">
                  More than a workout. It&apos;s your place.
                </p>
                <div className="mt-7 flex flex-wrap gap-2 text-[9px] font-black uppercase tracking-[.14em] text-black/58">
                  <span className="rounded-full bg-[#171513] px-3 py-2 text-white">Book your class</span>
                  <span className="rounded-full border border-black/15 px-3 py-2">View schedule</span>
                </div>
              </div>
            </div>
            <div className="relative min-h-56 overflow-hidden bg-[#cdb9a1]">
              <img
                src="https://her-house-pilates.vercel.app/assets/webp/hero-studio.webp"
                alt=""
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/12 via-transparent to-white/10" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-[52vw] overflow-hidden rounded-[2rem] bg-[#d8d4ce] p-5 text-[#101114] sm:min-h-[520px] lg:min-h-[650px]">
      <div className="relative z-20 flex justify-between rounded-full bg-[#f5f3ef]/94 px-4 py-3 text-[9px] font-black uppercase tracking-[.18em] text-black/58">
        <span>{title} · {status}</span>
        <span>{category}</span>
      </div>
      <div className="absolute inset-x-[5%] bottom-[6%] top-[18%] overflow-hidden rounded-[1.7rem] bg-[#f7f6f2] shadow-[0_35px_90px_rgba(0,0,0,.14)]">
        <div className="flex h-full flex-col p-[6%]">
          <div className="flex items-center justify-between border-b border-black/10 pb-4 text-[9px] font-black uppercase tracking-[.18em] text-black/45">
            <span>TK Counsel Georgia</span>
            <span>Services · About · News · Contact</span>
          </div>
          <div className="flex flex-1 flex-col justify-center py-8">
            <p className="text-[9px] font-black uppercase tracking-[.18em] text-black/42">Based in Tbilisi, Georgia</p>
            <p className="mt-5 max-w-[12ch] text-[clamp(2.25rem,4.9vw,4.8rem)] font-black leading-[.88] tracking-[-.055em]">
              Expert Legal Counsel for the International Community in Georgia
            </p>
            <div className="mt-8 grid gap-2 sm:grid-cols-2">
              {["Residency & Migration", "Corporate & Business", "Employment", "Real Estate & Property"].map((practice) => (
                <div key={practice} className="rounded-xl border border-black/10 bg-white/55 px-4 py-3 text-[10px] font-black uppercase tracking-[.12em] text-black/58">
                  {practice}
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-end justify-between border-t border-black/10 pt-4 text-[9px] font-black uppercase tracking-[.16em] text-black/42">
            <span>{tagline}</span>
            <span>View all services →</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SignalHeroPrototype({ locale }: { locale: Locale }) {
  const copy = getV2Copy(locale);
  const waHref =
    "https://wa.me/" +
    WHATSAPP_INTAKE +
    "?text=" +
    encodeURIComponent(V2_WHATSAPP_MESSAGE[locale]);

  const capabilities = [
    ["01", copy.websiteTitle, copy.websiteBody],
    ["02", copy.aiTitle, copy.aiBody],
    ["03", copy.automationTitle, copy.automationBody],
  ];
  const labSteps = [
    copy.receiveStep,
    copy.understandStep,
    copy.actionStep,
    copy.exceptionStep,
    copy.outcomeStep,
  ];
  const labDetails = [
    copy.customerMessage,
    copy.parsedRequest,
    `${copy.availability}: ${copy.availabilityTime}`,
    `${copy.needsReview}: ${copy.owner}`,
    copy.resolvedOutcome,
  ];

  return (
    <main className="bg-[#02060b] text-white">
      <header className="fixed inset-x-0 top-0 z-[90] border-b border-white/[.05] bg-[#02060b]/92">
        <div className="mx-auto flex h-16 max-w-[92rem] items-center justify-between gap-2 px-5 sm:gap-6 sm:px-8">
          <a
            href={"/" + locale + "/v2-prototype"}
            className="rounded-sm font-space text-xs font-black uppercase tracking-[.26em] text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200 sm:text-sm sm:tracking-[.42em]"
          >
            Genezisi
          </a>
          <nav aria-label="Primary" className="hidden items-center gap-7 text-sm font-bold text-white/60 lg:flex">
            <a className="hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200" href="#work">{copy.navWork}</a>
            <a className="hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200" href="#capabilities">{copy.navCapabilities}</a>
            <a className="hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200" href="#about">{copy.navAbout}</a>
          </nav>
          <a
            href={locale === "en" ? "/ka/v2-prototype" : "/en/v2-prototype"}
            lang={locale === "en" ? "ka" : "en"}
            hrefLang={locale === "en" ? "ka" : "en"}
            aria-label={locale === "en" ? "ქართული ვერსია" : "English version"}
            className="flex min-h-11 min-w-11 items-center justify-center rounded-full text-[11px] font-black text-white/65 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200 sm:hidden"
          >
            {locale === "en" ? "KA" : "EN"}
          </a>
          <nav aria-label="Language" className="hidden items-center gap-2 text-xs font-black text-white/60 sm:flex">
            <a href="/en/v2-prototype" lang="en" hrefLang="en" aria-current={locale === "en" ? "page" : undefined} className="rounded-sm px-1.5 py-1 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200">EN</a>
            <span aria-hidden className="text-white/25">·</span>
            <a href="/ka/v2-prototype" lang="ka" hrefLang="ka" aria-current={locale === "ka" ? "page" : undefined} className="rounded-sm px-1.5 py-1 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200">KA</a>
          </nav>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-11 items-center gap-2 rounded-full bg-white px-3 text-xs font-black text-[#071019] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200 sm:px-4 sm:text-sm"
          >
            <MessageCircle className="hidden h-4 w-4 min-[360px]:block" aria-hidden />
            {copy.message}
          </a>
        </div>
      </header>

      <V2Hero copy={copy} />

      <section
        id="work"
        className="scroll-mt-20 bg-[#f0ece5] px-5 py-28 text-[#101114] [content-visibility:auto] [contain-intrinsic-size:1200px] sm:px-8 lg:py-40"
      >
        <div className="mx-auto max-w-[92rem]">
          <p className="text-[10px] font-black uppercase tracking-[.22em] text-black/60">{copy.work}</p>
          <h2 className="mt-5 max-w-[9ch] text-[clamp(3.5rem,8vw,8rem)] font-black leading-[.86] tracking-[-.065em]">{copy.proof}</h2>

          <div className="mt-20 space-y-24 lg:mt-28 lg:space-y-36">
            <article className="grid gap-7 lg:grid-cols-[1.35fr_.65fr] lg:items-end">
              <ProjectCover
                variant="legal"
                title="TK Counsel"
                status={copy.tkStatus}
                category={copy.legalCategory}
                tagline={copy.tkTagline}
              />
              <div className="pb-2">
                <p className="text-3xl font-black tracking-[-.04em]">TK Counsel</p>
                <p className="mt-4 max-w-md text-base leading-7 text-black/60">{copy.tkBody}</p>
                <a href="https://tkcounsel.com/" target="_blank" rel="noopener noreferrer" className="group mt-6 inline-flex items-center gap-2 rounded-sm text-sm font-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black">
                  {copy.viewWebsite}
                  <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden />
                </a>
              </div>
            </article>

            <article className="grid gap-7 lg:grid-cols-[.65fr_1.35fr] lg:items-end">
              <div className="order-2 pb-2 lg:order-1">
                <p className="text-3xl font-black tracking-[-.04em]">Frankencoin Desk</p>
                <p className="mt-4 max-w-md text-base leading-7 text-black/60">{copy.frankBody}</p>
                <a href="https://www.frankencoindesk.com/" target="_blank" rel="noopener noreferrer" className="group mt-6 inline-flex items-center gap-2 rounded-sm text-sm font-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black">
                  {copy.viewWebsite}
                  <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden />
                </a>
              </div>
              <div className="order-1 lg:order-2">
                <ProjectCover
                  variant="product"
                  title="Frankencoin Desk"
                  status={copy.frankStatus}
                  category={copy.productCategory}
                  tagline=""
                />
              </div>
            </article>

            <article className="grid gap-7 lg:grid-cols-[1.35fr_.65fr] lg:items-end">
              <ProjectCover
                variant="wellness"
                title="Her House Pilates"
                status={copy.pilatesStatus}
                category={copy.wellnessCategory}
                tagline={copy.pilatesTagline}
              />
              <div className="pb-2">
                <p className="text-3xl font-black tracking-[-.04em]">Her House Pilates</p>
                <p className="mt-4 max-w-md text-base leading-7 text-black/60">{copy.pilatesBody}</p>
                <a href="https://her-house-pilates.vercel.app/" target="_blank" rel="noopener noreferrer" className="group mt-6 inline-flex items-center gap-2 rounded-sm text-sm font-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black">
                  {copy.viewWebsite}
                  <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden />
                </a>
              </div>
            </article>
          </div>

          <div className="mt-20 flex flex-col gap-5 border-t border-black/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-xl font-black tracking-[-.025em]">{copy.workContact}</p>
            <a href={waHref} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 w-fit items-center gap-3 rounded-full bg-[#101114] px-5 text-sm font-black text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black">
              <MessageCircle className="h-4 w-4" aria-hidden />
              {copy.message}
            </a>
          </div>
        </div>
      </section>

      <section
        id="capabilities"
        className="scroll-mt-20 bg-[#02060b] px-5 py-28 [content-visibility:auto] [contain-intrinsic-size:800px] sm:px-8 lg:py-40"
      >
        <div className="mx-auto max-w-[92rem]">
          <p className="text-[10px] font-black uppercase tracking-[.22em] text-white/60">{copy.capabilities}</p>
          <div className="mt-12 border-y border-white/10">
            {capabilities.map(([n, title, body]) => (
              <div
                key={n}
                className="group relative grid gap-4 border-b border-white/10 py-9 last:border-b-0 sm:grid-cols-[80px_.8fr_1.2fr] sm:items-baseline lg:py-14"
              >
                <span className="absolute bottom-5 left-0 top-5 w-px origin-top scale-y-0 bg-cyan-100/55 transition-transform duration-500 ease-out group-hover:scale-y-100" aria-hidden />
                <span className="text-xs font-black text-white/28 transition-colors group-hover:text-cyan-100/55">{n}</span>
                <h3 className="flex items-center gap-4 text-3xl font-black tracking-[-.045em] sm:text-5xl">
                  {title}
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-white/15 transition-[background-color,box-shadow] duration-300 group-hover:bg-cyan-200 group-hover:shadow-[0_0_14px_rgba(165,243,252,.55)]" />
                </h3>
                <p className="max-w-xl text-base leading-7 text-white/55 transition-colors group-hover:text-white/68">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#02060b] px-5 py-20 [content-visibility:auto] [contain-intrinsic-size:800px] sm:px-8 lg:py-32">
        <div className="mx-auto max-w-[92rem] border-t border-white/10 pt-14">
          <div className="mb-12 max-w-3xl">
            <p className="text-[10px] font-black uppercase tracking-[.22em] text-cyan-100/55">{copy.lab}</p>
            <h2 className="mt-5 text-5xl font-black leading-[.9] tracking-[-.055em] sm:text-7xl">{copy.labTitle}</h2>
          </div>
          <V2Lab
            steps={labSteps}
            details={labDetails}
            customerMessage={copy.customerMessage}
            resolvedOutcome={copy.resolvedOutcome}
            eyebrow={copy.lab}
            requestLabel={copy.newEnquiry}
            stateLabel={copy.systemRevealed}
          />
        </div>
      </section>

      <section
        id="about"
        className="scroll-mt-20 bg-[#e8e1d7] px-5 py-28 text-[#101114] [content-visibility:auto] [contain-intrinsic-size:700px] sm:px-8 lg:py-40"
      >
        <div className="mx-auto max-w-[92rem]">
          <div className="flex items-center justify-between border-b border-black/15 pb-5 text-[10px] font-black uppercase tracking-[.22em] text-black/60">
            <span>{copy.small}</span>
            <span>{copy.founderLabel}</span>
          </div>
          <div className="mt-12 grid gap-12 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
            <h2 className="max-w-[9ch] text-[clamp(3.8rem,8vw,8rem)] font-black leading-[.84] tracking-[-.07em]">{copy.founderTitle}</h2>
            <div className="border-l border-black/15 pl-6 sm:pl-8">
              <p className="max-w-xl text-lg leading-8 text-black/65">{copy.founderBody}</p>
              <p className="mt-8 text-sm font-black uppercase tracking-[.14em] text-black/60">{copy.founderLabel}</p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="bg-[#02060b] px-5 py-28 [content-visibility:auto] [contain-intrinsic-size:700px] sm:px-8 lg:py-44"
      >
        <div className="mx-auto max-w-[92rem]">
          <p className="text-[10px] font-black uppercase tracking-[.22em] text-white/60">{copy.contact}</p>
          <h2 className="mt-6 max-w-[8ch] text-[clamp(4rem,10vw,10rem)] font-black leading-[.82] tracking-[-.07em]">{copy.contactTitle}</h2>
          <p className="mt-8 max-w-xl text-lg leading-8 text-white/55">{copy.contactBody}</p>
          <a href={waHref} target="_blank" rel="noopener noreferrer" className="mt-10 inline-flex min-h-14 items-center gap-3 rounded-full bg-white px-6 text-base font-black text-[#071019] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200">
            <MessageCircle className="h-5 w-5" aria-hidden />
            {copy.startWhatsApp}
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </a>
          <div className="mt-28 flex items-center justify-between border-t border-white/10 pt-7 text-[10px] font-black uppercase tracking-[.2em] text-white/30">
            <span>Genezisi</span>
            <span>{copy.services}</span>
          </div>
        </div>
      </section>
    </main>
  );
}
