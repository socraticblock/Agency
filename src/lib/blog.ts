/**
 * Blog system for genezisi.com
 * Lightweight, file-based blog registry with full SEO support.
 */

export interface BlogArticle {
  slug: string;
  title: string;
  metaDescription: string;
  readingTime: string;
  lastUpdated: string;
  primaryKeyword: string;
  tags: string[];
  /** ISO date for sorting / sitemap */
  publishedAt: string;
  heroStat?: { value: string; label: string };
  /** Sections — each has an H2 heading and an array of content blocks */
  sections: BlogSection[];
}

export interface BlogSection {
  heading: string;
  blocks: BlogBlock[];
}

export type BlogBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "callout"; text: string }
  | { type: "comparisonTable"; headers: string[]; rows: string[][] }
  | { type: "cta"; text: string; href: string; label: string };

/* -------------------------------------------------------------------------- */
/*  Article Registry                                                          */
/* -------------------------------------------------------------------------- */

const articles: BlogArticle[] = [
  {
    slug: "georgian-businesses-invisible-online",
    title:
      "Why 93% of Georgian Businesses Are Invisible Online (And How to Fix It in 2026)",
    metaDescription:
      "Only 7% of Georgian SMEs have a website. Here's why your Tbilisi business is losing clients — and the fastest ways to build your digital presence starting from 1,299 GEL.",
    readingTime: "6 min read",
    lastUpdated: "April 2026",
    primaryKeyword: "Georgian business website",
    tags: [
      "Georgian business website",
      "Tbilisi web design",
      "digital presence Georgia",
      "small business website Georgia",
      "GEL pricing",
    ],
    publishedAt: "2026-04-17",
    heroStat: { value: "93%", label: "of Georgian SMEs lack a website" },
    sections: [
      {
        heading: "The Digital Reality of Georgian Small Business",
        blocks: [
          {
            type: "paragraph",
            text: "Walk through any neighbourhood in Tbilisi — Saburtalo, Vake, Vera — and you'll see the same pattern. A dental clinic, a law firm, a real estate agency, a beauty salon. Each one serves dozens of clients a week. Yet search for any of them on Google and you'll find… a Facebook page. Maybe an Instagram account. Often nothing at all.",
          },
          {
            type: "paragraph",
            text: "The numbers tell the story. 97.5% of Georgian small businesses rely exclusively on Facebook or Instagram for their online presence. Only 7% have a dedicated website. In a country where digital adoption is accelerating — especially with the influx of remote workers, expats, and tourists — this gap is a competitive disadvantage that compounds every month.",
          },
          {
            type: "callout",
            text: "Facebook is rented land. You don't own your audience, you can't control the algorithm, and a single policy change can erase years of content and customer relationships overnight.",
          },
          {
            type: "paragraph",
            text: "For a Georgian professional — a lawyer in Saburtalo, a real estate agent in Vake, a clinic director in Vera — this isn't just a marketing problem. It's a revenue problem. Every month without a proper digital presence means lost clients who are actively searching for exactly the services you offer.",
          },
        ],
      },
      {
        heading: "What Your Business Is Losing Without a Website",
        blocks: [
          {
            type: "paragraph",
            text: "If you're a Georgian professional relying solely on social media, here's what you're giving up every single day:",
          },
          {
            type: "list",
            items: [
              "<strong>Google Search Traffic</strong> — When someone searches 'best lawyer in Tbilisi' or 'apartment for sale in Vake,' Google can't show your Facebook page. Websites rank. Social pages don't. That's thousands of potential clients going to competitors who invested in a proper site.",
              "<strong>Professional Credibility</strong> — A custom domain (yourbusiness.ge or yourbusiness.com) signals permanence and trust. Studies show 75% of consumers judge a business's credibility based on its website. No website = 'are they still operating?'",
              "<strong>Data Ownership</strong> — On social media, the platform owns your customer data. With your own website, you capture leads, build an email list, and own the relationship. This is your business's digital asset.",
              "<strong>Expat and International Clients</strong> — Georgia's growing expat community (remote workers, digital nomads, foreign investors) doesn't browse Georgian Facebook groups. They search Google. They visit websites. They expect professional digital experiences.",
              "<strong>24/7 Sales Representative</strong> — Your website works around the clock — answering questions, showcasing your work, collecting leads, even booking appointments — while you sleep.",
            ],
          },
        ],
      },
      {
        heading: "4 Ways to Establish Your Digital Presence",
        blocks: [
          {
            type: "paragraph",
            text: "You don't need a Fortune 500 budget to go online. Here are four paths, from the fastest to the most powerful:",
          },
          {
            type: "list",
            items: [
              "<strong>Digital Business Card — from 150 ₾</strong> (+ 120 ₾/yr hosting) — A shareable, interactive digital card with your contact info, services, and social links. Perfect for professionals who need a polished online identity today. <a href='/en/start' class='text-emerald-400 hover:text-emerald-300 underline underline-offset-2'>Create yours →</a>",
              "<strong>Professional Site — 1,299 ₾</strong> — A clean, professional custom website that covers your services, about section, testimonials, and contact form. Ideal for lawyers, consultants, clinics, and freelancers. <a href='/en/pricing' class='text-emerald-400 hover:text-emerald-300 underline underline-offset-2'>See pricing →</a>",
              "<strong>Professional Custom Site — 1,299 ₾</strong> — A multi-page, fully bespoke website with custom animations, advanced SEO, booking integrations, and a content management system. Built to compete with top-tier international firms. <a href='/en/architect?tier=professional' class='text-emerald-400 hover:text-emerald-300 underline underline-offset-2'>Start building →</a>",
              "<strong>Command Center (1,999 ₾) & E-Commerce HQ (starting 3,999 ₾)</strong> — For businesses ready to dominate. The Command Center adds advanced dashboards, CRM integration, and multi-language support. The E-Commerce HQ is a full online store with payment processing, inventory management, and Georgian bank integrations. <a href='/en/pricing' class='text-emerald-400 hover:text-emerald-300 underline underline-offset-2'>Explore tiers →</a>",
            ],
          },
          {
            type: "callout",
            text: "Every Genezisi website package includes full ownership of your code, no monthly platform fees forever, and hosting you control. The Digital Business Card has a separate annual hosting fee of 120 ₾/year.",
          },
        ],
      },
      {
        heading: "Why Georgian Professionals Choose Genezisi",
        blocks: [
          {
            type: "paragraph",
            text: "Genezisi was built specifically for the Georgian market. We understand the unique needs of Tbilisi businesses because we are one. Here's what sets us apart:",
          },
          {
            type: "list",
            items: [
              "<strong>Pay in GEL</strong> — All pricing is in Georgian Lari. No exchange rate surprises, no foreign transaction fees. What you see is what you pay.",
              "<strong>TBC & Bank of Georgia Payments</strong> — We integrate directly with Georgia's two largest banks for seamless payment processing on your site.",
              "<strong>RS.ge Integration</strong> — Your business registration and legal compliance, connected directly to Georgia's Revenue Service portal.",
              "<strong>Tri-Lingual by Default</strong> — Georgian, English, and Russian. Your site speaks to every audience in Georgia — locals, expats, and international clients.",
              "<strong>Full Ownership</strong> — You own 100% of your code, domain, and data. No vendor lock-in. No monthly subscriptions that increase every year.",
              "<strong>Built in Tbilisi</strong> — Local support, in-person consultations, and a team that understands Georgian business culture and regulations.",
            ],
          },
        ],
      },
      {
        heading: "Real-World Examples",
        blocks: [
          {
            type: "callout",
            text: "The following before-and-after scenarios are illustrative examples showing the typical transformation Georgian businesses experience when moving from social-only to a professional website.",
          },
          {
            type: "paragraph",
            text: "<strong>Mariam — Lawyer, Saburtalo</strong>",
          },
          {
            type: "comparisonTable",
            headers: ["Before (Facebook only)", "After (Genezisi website)"],
            rows: [
              [
                "Found through word-of-mouth only",
                "Appears on Google for 'lawyer Tbilisi' searches",
              ],
              [
                "Sends PDF portfolio via Messenger",
                "Professional case studies on her website",
              ],
              [
                "No way to book online",
                "Online booking with calendar integration",
              ],
              [
                "Invisible to expat clients",
                "English-language version attracts international clients",
              ],
              [
                "~8 new inquiries/month",
                "~35 new inquiries/month within 90 days",
              ],
            ],
          },
          {
            type: "paragraph",
            text: "<strong>Giorgi — Real Estate Agent, Vake</strong>",
          },
          {
            type: "comparisonTable",
            headers: ["Before (Instagram only)", "After (Genezisi website)"],
            rows: [
              [
                "Posts listings on Instagram stories (disappear in 24h)",
                "Permanent property listings with search and filters",
              ],
              [
                "Clients message for details one-by-one",
                "Automated property details, maps, and virtual tours",
              ],
              [
                "No lead capture system",
                "Contact forms and WhatsApp integration",
              ],
              [
                "Only Georgian-speaking clients",
                "Tri-lingual site serves local, expat, and Russian buyers",
              ],
              [
                "~5 serious leads/month",
                "~28 qualified leads/month within 60 days",
              ],
            ],
          },
        ],
      },
      {
        heading: "How to Get Started Today",
        blocks: [
          {
            type: "paragraph",
            text: "Your competitors are already online. Every day you wait is another day of lost revenue. Here's how to take the first step:",
          },
          {
            type: "list",
            items: [
              "<strong>Need something today?</strong> — Create your <a href='/en/start' class='text-emerald-400 hover:text-emerald-300 underline underline-offset-2'>Digital Business Card in 5 minutes</a>. From 150 ₾.",
              "<strong>Ready for a real website?</strong> — Explore our <a href='/en/pricing' class='text-emerald-400 hover:text-emerald-300 underline underline-offset-2'>transparent pricing in GEL</a>. Professional sites from 1,299 ₾.",
              "<strong>Want a custom build?</strong> — Use our <a href='/en/architect?tier=professional' class='text-emerald-400 hover:text-emerald-300 underline underline-offset-2'>Architect Studio</a> to design your perfect site.",
              "<strong>Prefer to talk?</strong> — Message us on <a href='https://wa.me/995579723564' class='text-emerald-400 hover:text-emerald-300 underline underline-offset-2' target='_blank'>WhatsApp</a>. We respond within the hour.",
            ],
          },
          {
            type: "paragraph",
            text: "Georgia's digital economy is growing fast. The businesses that invest in their online presence today will dominate search results, attract the best clients, and build lasting digital assets. Don't let another month go by being invisible online.",
          },
          {
            type: "cta",
            text: "Start building your digital presence today.",
            href: "/en/start",
            label: "Get Started →",
          },
        ],
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                    */
/* -------------------------------------------------------------------------- */

export function getAllArticles(): BlogArticle[] {
  return [...articles].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getAllSlugs(): string[] {
  return articles.map((a) => a.slug);
}
