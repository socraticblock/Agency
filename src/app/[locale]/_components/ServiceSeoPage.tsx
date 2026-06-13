import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { WHATSAPP_DEFAULT_MESSAGE, WHATSAPP_INTAKE } from "@/constants/content";
import { ArrowLeft, ArrowRight, Check, MessageCircle } from "lucide-react";

const waHref = `https://wa.me/${WHATSAPP_INTAKE}?text=${encodeURIComponent(
  WHATSAPP_DEFAULT_MESSAGE,
)}`;

interface ServiceSeoPageProps {
  locale: Locale;
  eyebrow: string;
  title: string;
  intro: string;
  bullets: string[];
  bestFor: string[];
  sections: Array<{
    title: string;
    body: string;
  }>;
}

export function ServiceSeoPage({
  locale,
  eyebrow,
  title,
  intro,
  bullets,
  bestFor,
  sections,
}: ServiceSeoPageProps) {
  return (
    <main className="min-h-screen bg-[#02060d] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.16),transparent_36%),radial-gradient(circle_at_0%_30%,rgba(16,185,129,0.12),transparent_30%)]" />
      <div className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 text-sm font-bold text-emerald-300 transition hover:text-emerald-200"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Genezisi
        </Link>

        <section className="grid gap-10 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-emerald-300">
              {eyebrow}
            </p>
            <h1 className="mt-4 max-w-4xl font-[family:var(--font-playfair),serif] text-5xl font-bold leading-tight text-white sm:text-6xl">
              {title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/78 sm:text-lg">
              {intro}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-400 px-7 text-base font-black text-slate-950"
              >
                <MessageCircle className="h-5 w-5" />
                Book a website call
              </a>
              <Link
                href={`/${locale}/pricing`}
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/[0.03] px-7 text-base font-black text-white"
              >
                See packages
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/55 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
            <h2 className="text-xl font-black text-white">What this includes</h2>
            <ul className="mt-5 space-y-3">
              {bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3 text-sm leading-6 text-white/80">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-300" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="grid gap-5 py-8 lg:grid-cols-3">
          {sections.map((section) => (
            <article
              key={section.title}
              className="rounded-2xl border border-white/10 bg-slate-900/45 p-6"
            >
              <h2 className="text-xl font-black text-white">{section.title}</h2>
              <p className="mt-3 text-sm leading-7 text-white/75">{section.body}</p>
            </article>
          ))}
        </section>

        <section className="py-8">
          <div className="rounded-2xl border border-white/10 bg-[#07111f] p-6 sm:p-8">
            <h2 className="text-2xl font-black text-white">Best for</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {bestFor.map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm font-bold text-white/85"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
