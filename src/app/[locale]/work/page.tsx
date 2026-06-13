import type { Metadata } from "next";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Website Work and Previews | Genezisi",
  description:
    "Preview websites built by Genezisi for professional services, SaaS, wellness studios, and civic projects.",
};

const workItems = [
  {
    title: "TK Counsel",
    type: "Legal / Professional",
    url: "https://tkcounsel.com/",
    embeddable: true,
    description:
      "Professional service website focused on credibility, serious positioning, and clear contact paths.",
    palette: "from-slate-100 via-stone-200 to-slate-500",
    previewHeadline: "Counsel with clarity.",
    previewSubline: "Legal guidance built around trust.",
    previewCta: "Request counsel",
    previewNav: ["Practice", "About", "Contact"],
    previewStats: ["Clarity", "Trust", "Action"],
    dark: false,
  },
  {
    title: "Frankencoin Desk",
    type: "SaaS / Crypto",
    url: "https://www.frankencoindesk.com/",
    embeddable: false,
    screenshot: "/work-previews/frankencoin-desk.png",
    description:
      "Complex product frontend that makes crypto tooling feel clearer, safer, and more confident.",
    palette: "from-slate-950 via-blue-950 to-cyan-700",
    previewHeadline: "All your crypto. One desk.",
    previewSubline: "Track, analyze, and manage your portfolio.",
    previewCta: "Get started",
    previewNav: ["Features", "Pricing", "Docs"],
    previewStats: ["Portfolio", "Signals", "Security"],
    dark: true,
  },
  {
    title: "Her House Pilates",
    type: "Wellness / Studio",
    url: "https://her-house-pilates.vercel.app/",
    embeddable: true,
    description:
      "Luxury wellness website concept with schedule, booking flow, and mobile-first design.",
    palette: "from-stone-200 via-amber-100 to-stone-500",
    previewHeadline: "Move with intention.",
    previewSubline: "Luxury Pilates schedule and booking flow.",
    previewCta: "Book a class",
    previewNav: ["Classes", "About", "Pricing"],
    previewStats: ["Schedule", "Studio", "Booking"],
    dark: false,
  },
  {
    title: "Sakartvelo Defenders",
    type: "Civic / Community",
    url: "https://sakartvelo-defenders.vercel.app/",
    embeddable: false,
    screenshot: "/work-previews/sakartvelo-defenders.png",
    description:
      "Public-facing website with strong identity, clear messaging, and action-focused layout.",
    palette: "from-red-950 via-slate-950 to-emerald-900",
    previewHeadline: "Defend what matters.",
    previewSubline: "A clear civic message with action at the center.",
    previewCta: "Join the effort",
    previewNav: ["Mission", "Stories", "Action"],
    previewStats: ["Identity", "Clarity", "Action"],
    dark: true,
  },
];

function BrowserPreview({ item }: { item: (typeof workItems)[number] }) {
  const surfaceText = item.dark ? "text-white" : "text-slate-950";
  const mutedText = item.dark ? "text-white/65" : "text-slate-950/58";
  const navText = item.dark ? "text-white/55" : "text-slate-950/48";
  const line = item.dark ? "bg-white/18" : "bg-slate-950/16";
  const accentLine = item.dark ? "bg-cyan-300/70" : "bg-emerald-500/50";

  return (
    <div className={`relative min-h-[24rem] overflow-hidden rounded-2xl bg-gradient-to-br ${item.palette} p-4`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_34%,rgba(34,211,238,0.32),transparent_31%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(2,6,13,0.18))]" />
      <div className="relative h-full min-h-[22rem] overflow-hidden rounded-xl border border-white/25 bg-slate-950/15 shadow-2xl backdrop-blur-[2px]">
        <div className="flex h-11 items-center gap-2 border-b border-white/18 bg-slate-950/18 px-4">
          <span className="h-2.5 w-2.5 rounded-full bg-red-300/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-300/80" />
          <span className={`ml-3 text-[10px] font-black uppercase tracking-[0.22em] ${navText}`}>
            {item.title}
          </span>
          <div className="ml-auto hidden items-center gap-5 lg:flex">
            {item.previewNav.map((nav) => (
              <span key={nav} className={`text-[9px] font-bold uppercase tracking-[0.12em] ${navText}`}>
                {nav}
              </span>
            ))}
          </div>
        </div>

        {item.embeddable || item.screenshot ? (
          <div className="relative min-h-[calc(22rem-2.75rem)] overflow-hidden bg-slate-950">
            {item.embeddable ? (
              <iframe
                src={item.url}
                title={`${item.title} live website preview`}
                loading="lazy"
                tabIndex={-1}
                className="pointer-events-none absolute left-0 top-0 h-[150%] w-[150%] origin-top-left scale-[0.667] border-0 bg-white"
              />
            ) : (
              <div
                className="absolute inset-0 bg-cover bg-top"
                style={{ backgroundImage: `url(${item.screenshot})` }}
                aria-label={`${item.title} website screenshot preview`}
              />
            )}
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/85 to-transparent" />
            <div className="pointer-events-none absolute bottom-4 left-4 rounded-full border border-white/15 bg-slate-950/75 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-white shadow-lg backdrop-blur-md">
              {item.embeddable ? "Live website preview" : "Website screenshot preview"}
            </div>
          </div>
        ) : (
        <div className="grid min-h-[calc(22rem-2.75rem)] grid-cols-[1fr_10rem] gap-4 p-5 sm:grid-cols-[1fr_13rem]">
          <div className="min-w-0">
            <div className="mt-8 max-w-[24rem]">
              <p className={`font-[family:var(--font-playfair),serif] text-4xl font-bold leading-tight sm:text-5xl ${surfaceText}`}>
                {item.previewHeadline}
              </p>
              <p className={`mt-4 max-w-sm text-sm leading-6 ${mutedText}`}>
                {item.previewSubline}
              </p>
              <div className={`mt-6 inline-flex h-11 items-center rounded-lg px-6 text-sm font-black ${item.dark ? "bg-cyan-400 text-slate-950" : "bg-white text-slate-950"}`}>
                {item.previewCta}
              </div>
            </div>

            <div className="mt-10 hidden grid-cols-3 gap-3 sm:grid">
              {item.previewStats.map((stat) => (
                <div key={stat} className="rounded-xl border border-white/15 bg-white/10 p-3">
                  <div className={`h-1.5 w-14 rounded-full ${accentLine}`} />
                  <p className={`mt-2 text-[9px] font-black uppercase tracking-[0.13em] ${navText}`}>
                    {stat}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex items-end justify-center">
            <div className="absolute bottom-2 h-24 w-full rounded-[50%] bg-black/20 blur-xl" />
            <div className="relative h-[18rem] w-36 rounded-[2.25rem] border border-white/35 bg-slate-950/25 p-3 shadow-2xl backdrop-blur-md sm:h-[19rem] sm:w-40">
              <div className="mx-auto mb-8 h-1.5 w-14 rounded-full bg-white/35" />
              <div className="space-y-3">
                <div className={`h-3 rounded-full ${line}`} />
                <div className={`h-3 w-4/5 rounded-full ${line}`} />
                <div className={`h-3 w-3/5 rounded-full ${accentLine}`} />
              </div>
              <div className="mt-10 space-y-3">
                <div className="h-16 rounded-xl border border-white/20 bg-white/10" />
                <div className="grid grid-cols-2 gap-2">
                  <div className="h-12 rounded-lg border border-white/15 bg-white/10" />
                  <div className="h-12 rounded-lg border border-white/15 bg-white/10" />
                </div>
              </div>
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = (locale === "ka" ? "ka" : "en") as Locale;

  return (
    <main className="min-h-screen bg-[#02060d] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.16),transparent_36%),radial-gradient(circle_at_0%_30%,rgba(16,185,129,0.12),transparent_30%)]" />
      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href={`/${lang}`}
          className="inline-flex items-center gap-2 text-sm font-bold text-emerald-300 transition hover:text-emerald-200"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Genezisi
        </Link>

        <header className="py-12 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-emerald-300">
            Website previews
          </p>
          <h1 className="mx-auto mt-4 max-w-4xl font-[family:var(--font-playfair),serif] text-5xl font-bold leading-tight text-white sm:text-6xl">
            A closer look at websites built by Genezisi.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/75">
            These previews show the type of serious, custom digital presence I build:
            professional, fast, mobile-aware, and clear about the next action.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-2">
          {workItems.map((item) => (
            <a
              key={item.title}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group overflow-hidden rounded-3xl border border-white/10 bg-slate-900/45 p-3 transition hover:border-emerald-300/50"
            >
              <BrowserPreview item={item} />
              <div className="p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-2xl font-black text-white">{item.title}</h2>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-bold text-slate-300">
                    {item.type}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-7 text-white/75">{item.description}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-emerald-300">
                  Open live site
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </div>
            </a>
          ))}
        </section>
      </div>
    </main>
  );
}
