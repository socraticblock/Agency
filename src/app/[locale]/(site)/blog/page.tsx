import type { Metadata } from "next";
import Link from "next/link";
import { permanentRedirect } from "next/navigation";
import { Navbar } from "../../_components/Navbar";
import { GlobalFooter } from "../../_components/GlobalFooter";
import { getAllArticles } from "@/lib/blog";
import { legacyServiceMetadata } from "@/lib/legacy-service-metadata";

export const metadata: Metadata = legacyServiceMetadata(
  "/blog",
  "Genezisi Journal — Websites, AI Systems & Automation",
  "Practical guides to commissioning websites, integrating business tools and using AI automation responsibly, from the Genezisi studio."
);

export default async function BlogIndex({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  // The articles are written in English. Do not serve untranslated bodies
  // under a Georgian-language URL.
  if (locale !== "en") permanentRedirect("/en/blog");
  const articles = getAllArticles();
  return (
    <>
      <Navbar locale="en" />
      <main className="min-h-screen bg-[#050505] text-white">
        <header className="mx-auto max-w-5xl px-5 pb-12 pt-20 sm:px-8 sm:pt-28">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">Genezisi Journal</p>
          <h1 className="mt-6 max-w-4xl text-[clamp(2.8rem,6vw,5rem)] font-black leading-[0.98] tracking-[-0.05em]">Better decisions. Better digital systems.</h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-white/70">
            Independent guidance on websites, useful AI automation, integrations and the decisions businesses make before building. International topics come first; selected regional guides remain available.
          </p>
        </header>
        <section className="mx-auto max-w-5xl px-5 pb-24 sm:px-8" aria-label="Articles">
          <div className="grid gap-5 md:grid-cols-2">
            {articles.map(article => (
              <article key={article.slug} className="rounded-2xl border border-white/10 bg-white/[0.035] p-6 transition-colors hover:border-emerald-300/40 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-300">
                  {article.audience === "international" ? "International guide" : "Regional guide"}
                </p>
                <h2 className="mt-4 text-2xl font-bold tracking-tight">
                  <Link href={`/en/blog/${article.slug}`} className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-200 hover:text-emerald-200">{article.title}</Link>
                </h2>
                <p className="mt-4 text-sm leading-7 text-white/70">{article.metaDescription}</p>
                <p className="mt-5 text-xs text-white/45">{article.readingTime} · Updated {article.lastUpdated}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <GlobalFooter locale="en" />
    </>
  );
}
