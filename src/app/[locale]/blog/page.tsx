import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "../_components/Navbar";
import { GlobalFooter } from "../_components/GlobalFooter";
import { getAllArticles } from "@/lib/blog";
import type { Locale } from "@/lib/i18n";
import { createLocalBusinessSeo } from "@/lib/seo";

function normalizeLocale(locale: string | undefined): Locale {
  if (locale && (locale === "en" || locale === "ka")) return locale;
  return "en";
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const lang = normalizeLocale(locale);
  const { metadata } = createLocalBusinessSeo({
    name: "Genezisi Blog — Insights for Georgian Businesses",
    description:
      "Expert guides on web design, digital strategy, and online growth for Georgian businesses. Practical advice from Tbilisi's digital agency.",
    locale: lang,
    path: "/blog",
  });
  return metadata;
}

export default async function BlogListPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = normalizeLocale(locale);
  const articles = getAllArticles();

  return (
    <>
      <Navbar locale={lang} />
      <main className="relative min-h-screen bg-[#050505] text-slate-100 selection:bg-emerald-500/30">
        {/* Hero */}
        <section className="mx-auto max-w-4xl px-4 pt-24 pb-12 sm:px-6 sm:pt-32">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-emerald-400">
            Blog
          </p>
          <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl">
            Insights for{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Georgian Businesses
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-400">
            Practical guides on digital strategy, web design, and online growth
            — written for Tbilisi professionals by Genezisi.
          </p>
        </section>

        {/* Article List */}
        <section className="mx-auto max-w-4xl px-4 pb-32 sm:px-6">
          <div className="space-y-6">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/${lang}/blog/${article.slug}`}
                className="group block rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all duration-300 hover:border-emerald-500/20 hover:bg-white/[0.04] sm:p-8"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1">
                    <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                      <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 font-bold text-emerald-400">
                        {article.readingTime}
                      </span>
                      <span>Updated {article.lastUpdated}</span>
                    </div>
                    <h2 className="text-lg font-bold text-white transition-colors group-hover:text-emerald-300 sm:text-xl">
                      {article.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400 line-clamp-2">
                      {article.metaDescription}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {article.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-white/[0.04] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  {article.heroStat && (
                    <div className="flex shrink-0 flex-col items-center rounded-xl border border-white/[0.06] bg-white/[0.02] px-5 py-3 text-center">
                      <span className="text-2xl font-black text-emerald-400">
                        {article.heroStat.value}
                      </span>
                      <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                        {article.heroStat.label}
                      </span>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>

          {articles.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-slate-500">
                More articles coming soon. Stay tuned.
              </p>
            </div>
          )}
        </section>
      </main>
      <GlobalFooter locale={lang} />
    </>
  );
}
