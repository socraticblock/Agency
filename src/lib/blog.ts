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
    slug: "website-cost-georgia-2026",
    title: "Website Cost in Georgia 2026 — Real Prices from Georgian Agencies",
    metaDescription:
      "How much does a website cost in Georgia? We researched real quotes from Tbilisi agencies — landing pages from ₾300, corporate sites ₾1,500-5,000, e-commerce ₾3,000-15,000. See where Genezisi fits.",
    readingTime: "5 min read",
    lastUpdated: "April 2026",
    primaryKeyword: "website cost Georgia",
    tags: [
      "website cost Georgia",
      "Georgian web design price",
      "Tbilisi web agency",
      "e-commerce price Tbilisi",
      "GEL pricing",
    ],
    publishedAt: "2026-04-17",
    heroStat: { value: "₾300", label: "floor for a professional landing page" },
    sections: [
      {
        heading: "Why Website Pricing in Georgia Is a Black Box",
        blocks: [
          {
            type: "paragraph",
            text: "Try searching \"how much does a website cost in Georgia\" and you'll find almost nothing. Unlike the US or UK, Georgian agencies rarely publish pricing. The result: business owners either overpay for a simple site or go to a freelancer at ₾200 and get something that damages their brand. This guide fixes that.",
          },
          {
            type: "paragraph",
            text: "We researched real quotes and published rates from Tbilisi studios — Web Tbilisi, TbilisiWeb, Wevosoft, DEL-OPS — and cross-referenced with recent 2025-2026 pricing guides. Here's what a website actually costs in Georgia right now.",
          },
        ],
      },
      {
        heading: "Landing Pages: ₾300–700",
        blocks: [
          {
            type: "paragraph",
            text: "A landing page is a single-page website — one scroll, one clear action (call, book, WhatsApp). Good for local service businesses that just need to be findable.",
          },
          {
            type: "comparisonTable",
            headers: ["Provider", "Price", "What's Included"],
            rows: [
              ["Freelancers", "₾200–500", "Basic, no support, inconsistent quality"],
              ["TbilisiWeb", "From ₾300", "Budget-friendly, established studio"],
              ["Wevosoft (2026 guide)", "₾300–800", "Modern approach, more pages"],
              ["Web Tbilisi", "$500–700 (~₾175–245)", "USD-denominated, international quality"],
            ],
          },
          {
            type: "callout",
            text: "₾300 GEL is the real floor for a professional landing page from an established studio. Freelancers at ₾200-300 exist but often deliver template-quality work with no ongoing support.",
          },
        ],
      },
      {
        heading: "Corporate & Multi-Page Sites: ₾1,500–5,000",
        blocks: [
          {
            type: "paragraph",
            text: "A proper multi-page website — Home, About, Services, Contact — for a small business or professional practice (lawyer, consultant, clinic). This is where most Georgian SMEs need to be.",
          },
          {
            type: "comparisonTable",
            headers: ["Provider", "Price", "Notes"],
            rows: [
              ["TbilisiWeb", "₾1,500–5,000", "Depends on pages and features"],
              ["Wevosoft", "₾1,500–5,000", "2026 pricing guide"],
              ["Web Tbilisi", "$700–1,500 (~₾245–525)", "USD-denominated"],
              ["DEL-OPS", "Custom", "Full-service, higher-end"],
            ],
          },
          {
            type: "callout",
            text: "The ₾1,500–5,000 range is the \"honest mid-market\" for Georgian web design. Below ₾1,500 you're in freelancer territory. Above ₾5,000 you're paying for premium branding agencies.",
          },
        ],
      },
      {
        heading: "E-Commerce Sites: ₾3,000–15,000+",
        blocks: [
          {
            type: "paragraph",
            text: "A full online store with product pages, shopping cart, checkout, and payment integration. For Georgian businesses ready to sell online — especially relevant given the 35-40% year-over-year growth in Georgian e-commerce.",
          },
          {
            type: "comparisonTable",
            headers: ["Provider", "Price", "Notes"],
            rows: [
              ["TbilisiWeb", "₾3,000–15,000+", "Full e-commerce capability"],
              ["DEL-OPS", "Custom", "Complex builds"],
              ["Web Tbilisi", "Custom, from $200/mo", "Monthly retainer model"],
              ["Market range", "₾3,000–15,000", "Basic to advanced"],
            ],
          },
          {
            type: "paragraph",
            text: "Georgian e-commerce is growing fast — the market reached GEL 3.5 billion in 2024. TBC Pay and Bank of Georgia payment gateways are now mature. Businesses that set up e-commerce now will own search results for years.",
          },
        ],
      },
      {
        heading: "Where Genezisi Fits",
        blocks: [
          {
            type: "paragraph",
            text: "Genezisi sits below the traditional agency mid-market while offering more structure and reliability than freelancers:",
          },
          {
            type: "comparisonTable",
            headers: ["Product", "Price", "vs. Market"],
            rows: [
              ["Digital Business Card", "₾150–350 + ₾120/yr", "No direct competitor in Georgia"],
              ["Professional Website", "₾999", "Below ₾1,500 agency floor"],
              ["Command Center", "₾1,999", "Below ₾1,500–5,000 agency range"],
              ["E-Commerce HQ", "From ₾3,999", "At the lower end of ₾3,000–15,000 range"],
            ],
          },
          {
            type: "paragraph",
            text: "All Genezisi websites include: custom design, bilingual EN/KA (plus Russian), TBC/BOG payment integration ready, 45-day warranty on Professional/Command Center, 100-day warranty on E-Commerce, and full code ownership — no monthly platform fees.",
          },
        ],
      },
      {
        heading: "How to Choose the Right Website Type",
        blocks: [
          {
            type: "list",
            items: [
              "<strong>Just need to be findable?</strong> A Digital Business Card from ₾150 is the fastest path. Shareable via link, QR code, and WhatsApp. No maintenance needed.",
              "<strong>Solicitors, doctors, consultants:</strong> Professional Website at ₾999 — multi-page, professional design, contact forms, SEO-optimized for Google.",
              "<strong>High-volume or e-commerce ready:</strong> Command Center (₾1,999) with CRM integrations, or E-Commerce HQ from ₾3,999 with full online store.",
              "<strong>Not sure?</strong> Message Genezisi on <a href='https://wa.me/995579723564' target='_blank' class='text-emerald-400 hover:text-emerald-300 underline underline-offset-2'>WhatsApp</a>. We respond within the hour and will tell you honestly what you need.",
            ],
          },
          {
            type: "cta",
            text: "Get a professional website at Georgian prices.",
            href: "/en/pricing",
            label: "View All Pricing →",
          },
        ],
      },
    ],
  },
  {
    slug: "digital-business-card-vs-paper",
    title: "Digital Business Card vs Paper — Why Georgian Professionals Are Switching",
    metaDescription:
      "Paper business cards are lost, outdated, and invisible online. Here's why thousands of Georgian professionals — lawyers, doctors, consultants — are switching to digital cards from ₾150.",
    readingTime: "4 min read",
    lastUpdated: "April 2026",
    primaryKeyword: "digital business card Georgia",
    tags: [
      "digital business card Georgia",
      "electronic business card",
      "QR code card Tbilisi",
      "professional networking Tbilisi",
      "Genezisi card",
    ],
    publishedAt: "2026-04-17",
    heroStat: { value: "0", label: "paper cards shared on WhatsApp" },
    sections: [
      {
        heading: "The Problem with Paper Cards in 2026",
        blocks: [
          {
            type: "paragraph",
            text: "You hand someone a paper business card. They put it in their wallet — next to 47 other cards. Three weeks later, they can't find it. Or they photograph it, forget to save the number, and it disappears into their camera roll. Meanwhile, your carefully designed card is sitting at the bottom of a drawer somewhere in Saburtalo.",
          },
          {
            type: "paragraph",
            text: "Paper cards have three fatal flaws in the digital age: they can't be updated, they can't be shared instantly, and they have zero online presence. When someone receives your card and wants to look up your business on Google — they can't.",
          },
          {
            type: "list",
            items: [
              "<strong>Lost</strong> — Paper cards end up in drawers, get thrown away, or stay in wallets for years after you've changed jobs.",
              "<strong>Outdated</strong> — Change your number or move offices? Print new cards. At ₾20–50 per card for 100, that's real money every time something changes.",
              "<strong>Invisible</strong> — Your paper card has no Google presence. When a potential client searches for your business, they find nothing.",
              "<strong>Unshareable</strong> — You can't send a paper card via WhatsApp. In Georgia, where WhatsApp is the dominant business communication tool, this is a serious limitation.",
            ],
          },
        ],
      },
      {
        heading: "What Is a Digital Business Card?",
        blocks: [
          {
            type: "paragraph",
            text: "A digital business card is a web page — optimized for mobile — that contains all your professional information. Instead of handing over paper, you share a link or QR code. The recipient opens it on their phone, instantly saves your contact, clicks through to your website or Instagram, and can WhatsApp you in one tap.",
          },
          {
            type: "paragraph",
            text: "Genezisi digital cards include: your photo, name, title, company, phone, email, website, social links, services, and a personal message. All in Georgian and English. From ₾150 setup + ₾120/year hosting.",
          },
        ],
      },
      {
        heading: "Paper vs Digital: Side by Side",
        blocks: [
          {
            type: "comparisonTable",
            headers: ["Feature", "Paper Card", "Genezisi Digital Card"],
            rows: [
              ["Share via WhatsApp", "❌ Impossible", "✅ One tap"],
              ["Update contact info", "❌ Reprint cards", "✅ Edit instantly"],
              ["Appears on Google", "❌ No", "✅ Yes — indexed automatically"],
              ["QR code", "✅ Static, dull", "✅ Animated, scannable"],
              ["Includes photo/bio", "❌ Name + number only", "✅ Full profile"],
              ["Works internationally", "❌ Useless abroad", "✅ Any phone, any country"],
              ["Year 1 cost (100 cards)", "₾20–50", "₾150 + ₾120/yr hosting"],
              ["Multi-language", "❌ One language only", "✅ Georgian + English"],
            ],
          },
        ],
      },
      {
        heading: "Why Georgian Professionals Are Making the Switch",
        blocks: [
          {
            type: "paragraph",
            text: "Georgia's business culture is evolving fast. The influx of remote workers, digital nomads, and international investors has raised expectations. A paper card handed to an expat or foreign investor signals: \"this person is not digitally native.\"",
          },
          {
            type: "paragraph",
            text: "Meanwhile, WhatsApp has become the default business communication tool in Georgia. A digital card that opens directly into a WhatsApp chat — that's the interaction Georgian professionals actually want.",
          },
          {
            type: "list",
            items: [
              "<strong>Georgian + English</strong> — Serve both local and international clients. Paper cards can't do this.",
              "<strong>TBC & BOG Payments</strong> — Genezisi cards can include your payment links. Paper cards never could.",
              "<strong>₾150 — No Georgian competitor</strong> — There is no other Georgian digital card platform. International tools (Blinq, Popl) don't support Georgian language or TBC/BOG payments.",
              "<strong>One card, lifetime updates</strong> — Change your number? Update once. Your card is always current.",
            ],
          },
        ],
      },
      {
        heading: "Who Should Get a Digital Card?",
        blocks: [
          {
            type: "list",
            items: [
              "<strong>Freelancers and consultants</strong> — Architects, lawyers, therapists, tutors. You're always networking. A digital card means every conversation ends with an instant follow-up.",
              "<strong>Real estate agents</strong> — Property listings change daily. Your digital card can link to current inventory. Paper can't.",
              "<strong>Small business owners</strong> — Café owners, shop managers, restaurant operators. Put your card on the counter as a QR code. Customers scan and save.",
              "<strong>Job seekers and students</strong> — Make a strong first impression at career fairs and networking events.",
            ],
          },
          {
            type: "callout",
            text: "Genezisi is the only Georgian platform offering digital business cards with Georgian language support, TBC/BOG payment links, and WhatsApp-native sharing. Starting at ₾150.",
          },
          {
            type: "cta",
            text: "Create your digital business card today.",
            href: "/en/start",
            label: "Get Started →",
          },
        ],
      },
    ],
  },
  {
    slug: "facebook-page-costing-customers-georgia",
    title: "Why Your Facebook Page Is Costing You Customers in Georgia",
    metaDescription:
      "Only 7% of Georgian SMEs have a website. Here's the uncomfortable truth about relying on Facebook or Instagram for your business — and the simple fix that starts from ₾150.",
    readingTime: "5 min read",
    lastUpdated: "April 2026",
    primaryKeyword: "Facebook page vs website Georgia",
    tags: [
      "Georgian business website",
      "Facebook page Georgia",
      "digital presence Tbilisi",
      "SME website Georgia",
      "GEL 299 website",
    ],
    publishedAt: "2026-04-17",
    heroStat: { value: "93%", label: "of Georgian SMEs have no website" },
    sections: [
      {
        heading: "The Uncomfortable Truth About Facebook in Georgia",
        blocks: [
          {
            type: "paragraph",
            text: "Walk through any neighborhood in Tbilisi — Saburtalo, Vake, Old Town — and count the businesses that have a proper website. A dental clinic, a law firm, a furniture shop, a café. Search for any of them on Google. More often than not: a Facebook page. Maybe an Instagram. Often nothing at all.",
          },
          {
            type: "paragraph",
            text: "The numbers are striking. According to ISET Policy Institute research, only 7% of Georgian small and medium enterprises have a dedicated website. That means 93% of Georgian SMEs are essentially invisible to the 60%+ of potential customers who use Google to find local businesses every day.",
          },
          {
            type: "callout",
            text: "Facebook is rented land. You don't own your audience, you can't control the algorithm, and a single policy change can erase years of content overnight. Your Facebook page can be suspended. Your Instagram can be hacked. Your Google Business Profile can be disputed. Your website — you own it.",
          },
        ],
      },
      {
        heading: "5 Ways Your Facebook Page Is Losing You Customers",
        blocks: [
          {
            type: "list",
            items: [
              "<strong>Google Can't Index Your Facebook Page Properly</strong> — When someone searches \"best dentist Vake Tbilisi,\" Google shows websites and Google Business Profiles — not Facebook pages buried in the social graph. Your potential clients find your competitors instead.",
              "<strong>The Algorithm Controls Your Visibility</strong> — In 2024-2025, Facebook's organic reach for business pages dropped to 2-5%. You are paying to play in your own digital house. A website's visibility, by contrast, compounds over time through SEO.",
              "<strong>No Professional Credibility Signal</strong> — 75% of consumers judge a business's credibility based on its website design. A Facebook page with a cover photo and \"contact us for prices\" tells customers nothing. A professional website with your services, testimonials, and portfolio says: \"we're legitimate.\"",
              "<strong>You Can't Own the Customer Relationship</strong> — On Facebook, Mark Zuckerberg owns the data. On your website, you do. Email signups, contact form submissions, booking requests — these are your customers, not Facebook's.",
              "<strong>International Clients Can't Find You</strong> — Georgia's expat community (digital nomads, remote workers, foreign investors) doesn't browse Georgian Facebook groups. They search Google. If your business isn't there, you don't exist to them.",
            ],
          },
        ],
      },
      {
        heading: "What You Lose Every Day Without a Website",
        blocks: [
          {
            type: "paragraph",
            text: "For a Georgian professional — a lawyer, dentist, accountant, or consultant — every day without a website means:",
          },
          {
            type: "list",
            items: [
              "<strong>Lost search traffic</strong> — Someone in Vake searches \"family lawyer near me.\" Your competitor's website appears. Yours doesn't. You lost a client before they even knew you existed.",
              "<strong>No 24/7 sales presence</strong> — Your website works while you sleep. It answers questions, shows your portfolio, collects leads. Your Facebook page just sits there.",
              "<strong>Price shoppers have nothing to compare</strong> — Georgian clients who want to compare options need something to compare. No website = no comparison = they go with whoever appears first on Google.",
              "<strong>No local SEO foundation</strong> — The only local SEO tools available without a website are Google Business Profile and Facebook. These are useful but insufficient — they don't give you control over your narrative.",
            ],
          },
        ],
      },
      {
        heading: "The Fastest Path to a Real Digital Presence",
        blocks: [
          {
            type: "paragraph",
            text: "You don't need a ₾10,000 budget to go digital. Here's what actually works for Georgian businesses in 2026:",
          },
          {
            type: "comparisonTable",
            headers: ["Product", "Price", "Best For"],
            rows: [
              ["Digital Business Card", "From ₾150 + ₾120/yr", "Instant, shareable professional identity"],
              ["Professional Website", "₾999", "Multi-page, SEO-ready business site"],
              ["Command Center", "₾1,999", "CRM, booking, multi-language"],
              ["E-Commerce HQ", "From ₾3,999", "Selling products online"],
            ],
          },
          {
            type: "paragraph",
            text: "The fastest move: a Genezisi Digital Business Card at ₾150. It takes minutes to create, gives you a shareable link and QR code, appears on Google when someone searches your name, and signals that you're a modern, professional operation.",
          },
          {
            type: "paragraph",
            text: "From there, the upgrade path is clear: ₾999 for a full professional website when you're ready to compete on Google search.",
          },
          {
            type: "cta",
            text: "Stop renting Facebook's land. Own your digital presence.",
            href: "/en/start",
            label: "Get Started from ₾150 →",
          },
        ],
      },
    ],
  },
  {
    slug: "georgian-businesses-invisible-online",
    title:
      "Why 93% of Georgian Businesses Are Invisible Online (And How to Fix It in 2026)",
    metaDescription:
      "Only 7% of Georgian SMEs have a website. Here's why your Tbilisi business is losing clients — and the fastest ways to build your digital presence starting from 999 GEL.",
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
              "<strong>Professional Site — 999 ₾</strong> — A clean, professional custom website that covers your services, about section, testimonials, and contact form. Ideal for lawyers, consultants, clinics, and freelancers. <a href='/en/pricing' class='text-emerald-400 hover:text-emerald-300 underline underline-offset-2'>See pricing →</a>",
              "<strong>Professional Custom Site — 999 ₾</strong> — A clean, professional custom website with advanced SEO, booking integrations, and conversion-optimized layout. <a href='/en/pricing' class='text-emerald-400 hover:text-emerald-300 underline underline-offset-2'>See pricing →</a>",
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
              "<strong>Ready for a real website?</strong> — Explore our <a href='/en/pricing' class='text-emerald-400 hover:text-emerald-300 underline underline-offset-2'>transparent pricing in GEL</a>. Professional sites from 999 ₾.",
              "<strong>Want a custom build?</strong> — Explore our <a href='/en/pricing' class='text-emerald-400 hover:text-emerald-300 underline underline-offset-2'>pricing tiers</a> or message us on <a href='https://wa.me/995579723564' class='text-emerald-400 hover:text-emerald-300 underline underline-offset-2' target='_blank'>WhatsApp</a>.",
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
