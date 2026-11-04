import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { Navbar } from "../../../_components/Navbar";
import { GlobalFooter } from "../../../_components/GlobalFooter";
import { getArticleBySlug } from "@/lib/blog";
import type { BlogBlock, BlogSection } from "@/lib/blog";
import { legacyServiceMetadata } from "@/lib/legacy-service-metadata";

/*
 * No `generateStaticParams` here on purpose.
 *
 * The root layout (`src/app/layout.tsx`) reads `headers()` to set the document
 * language, so every page is dynamic. A child page that still declares static
 * params is advertised as prerendered but produces zero paths at build time, and
 * the on-demand render then fails with DYNAMIC_SERVER_USAGE (HTTP 500) for every
 * article URL. Dropping the declaration keeps the route honestly dynamic.
 */
export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { robots: { index: false, follow: false } };
  return legacyServiceMetadata(`/blog/${slug}`, article.title, article.metaDescription);
}

function ArticleBlock({ block }: { block: BlogBlock }) {
  if (block.type === "paragraph") {
    return <p className="mt-4 text-base leading-8 text-white/75 sm:text-lg">{block.text}</p>;
  }
  if (block.type === "list") {
    return (
      <ul className="mt-5 list-disc space-y-3 pl-6 text-base leading-8 text-white/75 marker:text-emerald-300">
        {block.items.map(item => <li key={item}>{item}</li>)}
      </ul>
    );
  }
  if (block.type === "callout") {
    return <aside className="mt-6 rounded-xl border border-emerald-300/20 bg-emerald-300/[0.06] p-5 text-sm leading-7 text-emerald-100 sm:text-base">{block.text}</aside>;
  }
  if (block.type === "source") {
    const local = block.href.startsWith("/");
    return <p className="mt-3 text-sm leading-7">
      {local
        ? <Link href={block.href} className="text-emerald-300 underline underline-offset-4 hover:text-emerald-200">{block.label}</Link>
        : <a href={block.href} target="_blank" rel="noopener noreferrer" className="text-emerald-300 underline underline-offset-4 hover:text-emerald-200">{block.label}</a>}
    </p>;
  }
  return null;
}

export default async function BlogArticlePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (locale !== "en") permanentRedirect(`/en/blog/${slug}`);
  const article = getArticleBySlug(slug);
  if (!article) notFound();
  const articleUrl = `https://genezisi.com/en/blog/${article.slug}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription,
    mainEntityOfPage: articleUrl,
    datePublished: article.publishedAt,
    dateModified: "2026-11-04",
    author: { "@type": "Organization", name: "Genezisi" },
    publisher: { "@type": "Organization", name: "Genezisi", url: "https://genezisi.com" },
    inLanguage: "en",
  };
  return (
    <>
      <Navbar locale="en" />
      <main className="min-h-screen bg-[#050505] text-white">
        <article className="mx-auto max-w-3xl px-5 pb-24 pt-16 sm:px-8 sm:pt-24">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-white/50">
            <Link href="/en/blog" className="hover:text-emerald-300">Journal</Link>
            <span aria-hidden className="mx-2">/</span>
            <span>{article.audience === "international" ? "Business guide" : "Regional guide"}</span>
          </nav>
          <header>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">Genezisi Journal · {article.readingTime}</p>
            <h1 className="mt-5 text-[clamp(2rem,4.5vw,3.8rem)] font-black leading-[1.08] tracking-[-0.045em]">{article.title}</h1>
            <p className="mt-7 text-lg leading-8 text-white/65">{article.metaDescription}</p>
            <p className="mt-4 text-xs text-white/50">By Genezisi · Updated {article.lastUpdated}</p>
          </header>
          <div className="mt-12 border-t border-white/10 pt-3">
            {article.sections.map((section: BlogSection, i) => (
              <section key={section.heading} className="mt-11">
                <h2 className="text-2xl font-bold tracking-tight">{section.heading}</h2>
                {section.blocks.map((block, j) => <ArticleBlock key={j} block={block} />)}
              </section>
            ))}
          </div>
          <aside className="mt-16 rounded-2xl border border-white/10 bg-white/[0.035] p-7">
            <h2 className="text-xl font-bold">Planning a project?</h2>
            <p className="mt-3 text-base leading-7 text-white/70">Genezisi scopes websites, AI systems and automation around what your business actually needs—without fixed-price packages.</p>
            <Link href="/en/pricing" className="mt-5 inline-flex min-h-12 items-center rounded-full bg-white px-6 text-sm font-bold text-black hover:bg-emerald-100">Discuss a bespoke project</Link>
          </aside>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
        </article>
      </main>
      <GlobalFooter locale="en" />
    </>
  );
}
