import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "../../_components/Navbar";
import { GlobalFooter } from "../../_components/GlobalFooter";
import { getArticleBySlug, getAllSlugs } from "@/lib/blog";
import type { Locale } from "@/lib/i18n";
import { createLocalBusinessSeo } from "@/lib/seo";
import type { BlogSection, BlogBlock } from "@/lib/blog";
import { ArrowLeft } from "lucide-react";

function normalizeLocale(locale: string | undefined): Locale {
  if (locale && (locale === "en" || locale === "ka")) return locale;
  return "en";
}

/* -------------------------------------------------------------------------- */
/*  Static Params                                                              */
/* -------------------------------------------------------------------------- */

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

/* -------------------------------------------------------------------------- */
/*  Metadata                                                                   */
/* -------------------------------------------------------------------------- */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const lang = normalizeLocale(locale);
  const article = getArticleBySlug(slug);
  if (!article) return {};

  const { metadata } = createLocalBusinessSeo({
    name: article.title,
    description: article.metaDescription,
    locale: lang,
    path: `/blog/${slug}`,
  });
  return metadata;
}

/* -------------------------------------------------------------------------- */
/*  Block Renderer                                                             */
/* -------------------------------------------------------------------------- */

function renderBlock(block: BlogBlock, idx: number) {
  switch (block.type) {
    case "paragraph":
      return (
        <p
          key={idx}
          className="mb-5 text-base leading-[1.8] text-slate-300 sm:text-lg sm:leading-[1.85]"
          dangerouslySetInnerHTML={{ __html: block.text }}
        />
      );

    case "list":
      return (
        <ul key={idx} className="mb-6 list-none space-y-3 pl-0">
          {block.items.map((item, i) => (
            <li
              key={i}
              className="relative pl-6 text-base leading-[1.8] text-slate-300 before:absolute before:left-0 before:top-[0.6em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-emerald-400/60 sm:text-lg"
              dangerouslySetInnerHTML={{ __html: item }}
            />
          ))}
        </ul>
      );

    case "callout":
      return (
        <div
          key={idx}
          className="mb-6 rounded-xl border border-emerald-500/10 bg-emerald-500/[0.04] px-5 py-4 text-sm leading-relaxed text-emerald-200/80 sm:text-base"
        >
          <span className="mr-2 text-emerald-400">💡</span>
          {block.text}
        </div>
      );

    case "comparisonTable":
      return (
        <div
          key={idx}
          className="mb-6 overflow-hidden rounded-xl border border-white/[0.06]"
        >
          <table className="w-full text-sm sm:text-base">
            <thead>
              <tr className="border-b border-white/[0.06] bg-white/[0.03]">
                {block.headers.map((h, i) => (
                  <th
                    key={i}
                    className="px-4 py-3 text-left font-bold text-slate-300"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr
                  key={i}
                  className="border-b border-white/[0.03] last:border-0"
                >
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className={`px-4 py-3 text-slate-400 ${j === 1 ? "text-emerald-300/80" : ""}`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "cta":
      return (
        <div
          key={idx}
          className="my-10 flex flex-col items-center gap-4 rounded-2xl border border-emerald-500/15 bg-emerald-500/[0.04] px-6 py-8 text-center"
        >
          <p className="text-lg font-semibold text-white">{block.text}</p>
          <Link
            href={block.href}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-400/60 bg-emerald-500/10 px-6 py-2.5 text-sm font-bold text-emerald-100 shadow-[0_0_30px_rgba(16,185,129,0.2)] transition-all hover:bg-emerald-500/20 hover:shadow-[0_0_50px_rgba(16,185,129,0.3)]"
          >
            {block.label}
          </Link>
        </div>
      );

    default:
      return null;
  }
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                       */
/* -------------------------------------------------------------------------- */

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const lang = normalizeLocale(locale);
  const article = getArticleBySlug(slug);

  if (!article) notFound();

  return (
    <>
      <Navbar locale={lang} />
      <main className="relative min-h-screen bg-[#050505] text-slate-100 selection:bg-emerald-500/30">
        {/* Article header */}
        <header className="mx-auto max-w-3xl px-4 pt-24 pb-8 sm:px-6 sm:pt-32">
          <Link
            href={`/${lang}/blog`}
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-emerald-400"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Blog
          </Link>

          <div className="mb-4 flex flex-wrap items-center gap-3 text-xs text-slate-500">
            <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 font-bold text-emerald-400">
              {article.readingTime}
            </span>
            <span>Updated {article.lastUpdated}</span>
            <span className="rounded-full bg-white/[0.04] px-2.5 py-0.5 font-semibold uppercase tracking-wider">
              {article.primaryKeyword}
            </span>
          </div>

          <h1 className="text-2xl font-black leading-tight tracking-tight text-white sm:text-3xl md:text-4xl md:leading-[1.2]">
            {article.title}
          </h1>

          {article.heroStat && (
            <div className="mt-6 inline-flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-5 py-3">
              <span className="text-3xl font-black text-emerald-400">
                {article.heroStat.value}
              </span>
              <span className="text-sm font-semibold text-slate-400">
                {article.heroStat.label}
              </span>
            </div>
          )}
        </header>

        {/* Article body */}
        <article className="mx-auto max-w-3xl px-4 pb-24 sm:px-6">
          {article.sections.map((section: BlogSection, sIdx: number) => (
            <section key={sIdx} className="mb-12">
              <h2 className="mb-5 text-xl font-bold text-white sm:text-2xl">
                {section.heading}
              </h2>
              {section.blocks.map((block: BlogBlock, bIdx: number) =>
                renderBlock(block, bIdx),
              )}
            </section>
          ))}

          {/* Bottom CTA band */}
          <div className="mt-16 flex flex-col items-center gap-4 border-t border-white/[0.06] pt-10 text-center">
            <p className="text-lg font-semibold text-white">
              Ready to build your digital presence?
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/en/start"
                className="rounded-full border border-emerald-400/60 bg-emerald-500/10 px-5 py-2 text-sm font-bold text-emerald-100 transition-all hover:bg-emerald-500/20"
              >
                Digital Business Card →
              </Link>
              <Link
                href="/en/pricing"
                className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-2 text-sm font-bold text-slate-300 transition-all hover:bg-white/[0.06]"
              >
                View Pricing
              </Link>
              <a
                href="https://wa.me/995579723564"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-2 text-sm font-bold text-slate-300 transition-all hover:bg-white/[0.06]"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </article>
      </main>
      <GlobalFooter locale={lang} />
    </>
  );
}
