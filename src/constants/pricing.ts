export interface ProFeature {
  title: string;
  desc: string;
}

export interface StrategicBackingItem {
  title: string;
  fact: string;
  reality: string;
  cost: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  category: string;
  priceGEL: number;
  description?: string;
  technicalSpec?: string;
  roiNote?: string;
  concept?: string;
  strategy?: string;
  howItWorks?: string;
  proFeatures?: ProFeature[];
  bestFor?: string[];
  tooltip?: string;
  timeSaved?: number;
  scope?: string[];
  whatItIs?: string;
  howItHelps?: string;
  lawyerRole?: string;
  strategicBacking?: StrategicBackingItem[];
  recommendation?: string;
}

export interface Foundation extends ServiceItem {
  description: string;
  concept: string;
  strategy: string;
  scope: string[];
  recommendedModules?: string[];
  inheritedValue?: { id: string, name: string, priceGEL: number };
}

export interface Module extends ServiceItem {
  whatItIs?: string;
  howItHelps?: string;
  lawyerRole?: string;
}

export const FOUNDATIONS: Foundation[] = [
  {
    id: 'landing',
    name: 'High-Conversion Landing Page',
    category: 'Base',
    priceGEL: 2699,
    description: 'One perfect page designed to do one thing: turn a visitor into a customer. We remove the fluff and leave only the results.',
    concept: 'One perfect page designed to do one thing: turn a visitor into a customer. We remove the fluff and leave only the results.',
    strategy: "Focus is the new currency. By removing navigation menus and distractions, we eliminate the 'Paradox of Choice,' leading your visitor on a single, straight path to your 'Buy' button.",
    howItWorks: 'Removes navigation friction to prevent users from wandering, focusing 100% of the energy on a single call-to-action.',
    scope: [
      'Structure | 1 Perfectly Crafted Sales Node (Zero fluff, 100% focused on one absolute target offer)', 
      'Capture | Smart Lead Capture Vault (Catches every inquiry instantly so they don\'t go back to Google)', 
      'Design | Conversion-First Wireframe (Designed psychologically to guide visitors to the absolute "Yes" button)'
    ],
    bestFor: ["Influencers with 1 Specific Offer", "Webinar & Event Hosts", "Real Estate 'Hero' Listings", "Digital Product Launchers"],
    roiNote: "Designed to maximize your ad-spend ROI.",
    recommendedModules: ['exit-pop', 'ga4-analytics', 'pro-copy', 'ab-testing', 'heatmap', 'cro-audit', 'rule-chatbot', 'ugc-video', 'micro-animations', 'extra-page']
  },
  {
    id: 'cms',
    name: 'Digital Command Center',
    category: 'Base',
    priceGEL: 6750,
    description: "Your professional headquarters. This moves you from a 'one-man show' to a 'global brand' with a system you can actually control.",
    scope: [
      'Nodes | 4 Foundational Brand Nodes (Professional Home, About, Contact, Blog)', 
      'CMS | Visual Content Dashboard (A private drag-and-drop editor to update text and photos in seconds—without ever needing to pay a developer)',
      'Blog | Automated Authority Engine (A blog system that automatically categorizes your thought leadership for absolute Google SEO dominance)',
      'Leads | Centralized Lead Vault (A secure database that stores every inquiry so you never lose a potential customer)',
      'Assets | High-Speed Media Vault (An optimized cloud home for your brand’s high-res photography and videos)',
      'Training | VIP System Onboarding (Includes 1-on-1 strategic training and a custom documentation vault for owner-independence)'
    ],
    concept: "Your professional headquarters. This moves you from a 'one-man show' to a 'global brand' with a system you can actually control.",
    strategy: "\"The Command Center moves you from 'renting' a site to 'owning' an asset. We separate your visual design from your business data. This means you can update your brand story yourself in real-time, while the underlying code stays lightning-fast, secure, and ready to scale. You get total control—and you stop paying hourly developer fees just to swap a photo or update text.\"",
    howItWorks: 'You get a simplified social media-style editor to change photos and text without touching code.',

    bestFor: ["B2B Consultants & Coaches", "Creative & Marketing Agencies", "High-Ticket Service Providers", "Professional Personal Brands"],
    roiNote: "Built for owner-independence and authority.",
    recommendedModules: ['calendar-sync', 'hubspot-sync', 'social-sync', 'local-seo', 'multilingual', 'seo-audit', 'deposit-logic', 'micro-animations', 'extra-page', 'map-marker', 'doc-template']
  },
  {
    id: 'ecomm',
    name: '24/7 E-commerce Storefront',
    category: 'Base',
    priceGEL: 12150,
    inheritedValue: { id: 'cms', name: "Digital Command Center Core", priceGEL: 6750 },
    description: "An automated sales machine featuring Native RS.ge Fiscalization Sync to handle the hard work—payments, stock, and shipping—so you can focus on creating.",
    concept: "An automated sales machine featuring Native RS.ge Fiscalization Sync to handle the hard work—payments, stock, and shipping—so you can focus on creating.",
    strategy: "Friction is the enemy of sales. We build a high-speed 'Checkout Tunnel' designed to keep the psychological momentum going until the payment is confirmed, while handling stock and shipping in the background.",
    howItWorks: 'Handles money, shipping, and stock tracking so the entrepreneur can focus on creating.',
    scope: [
      'Commerce | Full Transactional Core (The Shop, Product nodes, and high-speed Checkout Tunnel)', 
      'Inventory | Automated Control Center (Real-time stock tracking with "Sold Out" safeguards)', 
      'FinTech | Merchant API (TBC/BOG/Stripe) integration for seamless transaction processing',
      'Admin | Visual Sales Cockpit (A backend dashboard to view revenue, handle orders, and print shipping in seconds)'
    ],
    bestFor: ["Niche Boutique Owners", "Merch & Apparel Creators", "Digital Asset Sellers", "Artisanal Exporters (Wine/Jewelry)"],
    roiNote: "Automates overheads to scale sales flawlessly.",
    recommendedModules: ['pay-gateway', 'fiscal-sync', 'micro-animations', 'sms-hub', 'multi-filter', 'recurring-bill', 'compliance-audit', 'rpa-auto', 'extra-page', 'map-marker', 'doc-template']
  },
  {
    id: 'saas',
    name: 'Custom Web Application',
    category: 'Base',
    priceGEL: 40500,
    inheritedValue: { id: 'cms', name: "Digital Command Center Core", priceGEL: 6750 },
    description: "A dedicated software tool built to solve a specific problem for your community at infinite scale. This is a sellable asset, not just a site.",
    concept: "A dedicated software tool built to solve a specific problem for your community at infinite scale. This is a sellable asset, not just a site.",
    strategy: "This is a sellable business asset, not just a site. By using 'Multi-Tenancy' logic, we ensure every user has a secure, private experience within your system, making it a scalable platform for your community.",
    howItWorks: 'Uses custom logic (like fitness calculators or booking systems) to solve niche problems for your community.',
    scope: [
      'Brain | Core SaaS Logic Architecture (The logic workflows allowing users to calculate or manage tools)', 
      'Access | Secure RBAC Accounts (Different access gates for Free Users, VIPs, and System Admins)', 
      'Scale | Infinite-Scale Database Node (A database frame built to support concurrent users without slowing down)'
    ],
    bestFor: ["Private Membership Communities", "EdTech & Online Academies", "Niche SaaS Founders", "Booking & Management Tools"],
    roiNote: "Creates scalable MRR digital business asset flaws setups.",
    recommendedModules: ['micro-animations', 'recurring-bill', 'course-tracking', 'api-opt', 'tech-doc', 'ai-sprint', 'ai-kb', 'auto-cert', 'listing-portal', 'sla-support', 'staff-aug']
  },
  {
    id: 'upgrade',
    name: 'The Existing Site Infrastructure Upgrade',
    category: 'Base',
    priceGEL: 1200, 
    description: 'Keep the "House" (your design), but replace the "Plumbing and Electricity" (the code). We make your current site safe, fast, and legal.',
    concept: 'Keep the "House" (your design), but replace the "Plumbing and Electricity" (the code). We make your current site safe, fast, and legal.',
    strategy: 'Why your current site is a liability: 96% of hacks target old code, and non-compliance with 2024 data laws can lead to 20,000 GEL fines. We don\'t just "update"—we protect.',
    scope: [
      'Technical & Security Audit (We find every hidden weakness)', 
      '2026 Performance Injection (Making your site feel "New" again)', 
      'Legal Compliance Roadmap (Ensuring you meet the latest data laws)'
    ],
    howItWorks: 'The Reality Check: Most websites built before 2025 are "Digital Liabilities." They are slow, vulnerable to 2026 bot attacks, and legally non-compliant with the latest data laws. We don\'t just "tinker"—we perform a surgical replacement. You keep your design, but we swap the "Brain" for our high-performance Sentinel engine, instantly turning a risk into a fortress.',
    bestFor: ["Frustrated WordPress/Wix Owners", "Businesses with 'Slow' Sites", "Brands Needing GITA/Legal Compliance", "Legacy Sites Built Before 2025"],
    lawyerRole: 'Professional legal audit in cooperation with a licensed attorney performing compliance audits on existing data handling, legally certifying protection against Georgian Fine anchors.',
    roiNote: "Eliminates legal risk and fixes revenue leakage.",
    strategicBacking: [
      {
        title: '🛡️ Security Obsolescence (The "Open Door" Effect)',
        fact: '96% of successful website breaches in 2025 targeted sites with outdated third-party dependencies (plugins, themes, or PHP versions).',
        reality: 'If your site was built more than 18 months ago, its defendse were designed to fight 2023-era bots. 2026 automated AI brute-force attacks find "Zero-Day" vulnerabilities fast.',
        cost: 'Professional malware recovery starts at 1,350 GEL, plus crippling Google ranking blacklist recovery time overheads.'
      },
      {
        title: '⚖️ Regulatory Drift (The "Legal Trap")',
        fact: 'Georgia’s Personal Data Protection Law (2024) updated requirements for user consent, data encryption, and "The Right to be Forgotten."',
        reality: 'Most legacy sites (especially Wix/WP) use "Standard" cookie banners that do NOT meet strict 2026 active consent requirements.',
        cost: 'Non-compliance carries administrative fines of up to 20,000 GEL. Your site isn\'t just slow; it’s a legal time bomb.'
      },
      {
        title: '📉 Revenue Leakage (The "0.1s Rule")',
        fact: 'Google’s Core Web Vitals are now the absolute primary organic ranking criteria.',
        reality: 'Legacy themes are often bloated with "Dead CSS" and unoptimized JS anchors bloating paint workloads.',
        cost: 'For every 0.1s delay stat loses 8.4% conversion revenue. Losing standard 10,000 GEL setups "burns" 800 GEL monthly workloads sets.'
      }
    ],
    recommendedModules: ['compliance-audit', 'seo-audit', 'micro-animations', 'ga4-analytics', 'heatmap', 'cro-audit', 'api-opt', 'adj-credits']
  }
];

export const MODULES: Module[] = [
  // ==========================================
  // 1. GEORGIAN ADVANTAGE (Legal & Financial)
  // ==========================================
  {
    id: 'bank-rep',
    category: 'Georgian Advantage',
    name: 'Bank Onboarding & Legal Rep (POA)',
    priceGEL: 1000,
    whatItIs: 'We handle the Bureaucracy. Includes POA drafting, notary coordination, and KYC clearance for foreign/remote founders.',
    howItHelps: 'We handle the bureaucracy, certified translations, and KYC meetings so your tax ID links to your gateway without you visiting a branch.',
    lawyerRole: 'Drafts the POA, verifies notary translations, and ensures banking KYC compliance.'
  },
  {
    id: 'pay-gateway',
    category: 'Georgian Advantage',
    name: 'Merchant API & Gateway Integration',
    priceGEL: 800,
    whatItIs: 'We handle the Code. Connecting your Merchant ID to your site with custom HMAC security and Bank-Audit compliance. (For businesses who already have a bank-approved Merchant ID but need the technical bridge).',
    howItHelps: 'Allows you to accept GEL/USD/EUR directly into your local account with 0.1s transaction latency.',
    lawyerRole: 'Oversees merchant processing compliance, verifying corporate data structure aligns with local anti-money-laundering (AML) banking settlements.'
  },
  {
    id: 'gita-grant',
    category: 'Georgian Advantage',
    name: 'GITA Grant Advisory',
    priceGEL: 1500,
    whatItIs: 'Strategic technical auditing and documentation for the 150,000 GEL matching grant.',
    howItHelps: 'Aligns your tech stack with GITA’s "Global Innovation" criteria to maximize your chances of winning the grant.',
    lawyerRole: 'Legal review of the technical submission to ensure it meets government innovation mandates.'
  },
  {
    id: 'virtual-office',
    category: 'Georgian Advantage',
    name: 'Virtual Office Setup',
    priceGEL: 400,
    whatItIs: 'Official legal address registration for your business tax ID.',
    howItHelps: 'Provides a permanent, credible legal home for your brand in Tbilisi, required for bank accounts and contracts.',
    lawyerRole: 'Ensures the rental agreement and legal address meet House of Justice requirements.'
  },
  {
    id: 'fdi-support',
    category: 'Georgian Advantage',
    name: 'FDI Grant Support',
    priceGEL: 2500,
    whatItIs: 'Complex documentation for Georgia’s 15% cashback investment programs.',
    howItHelps: 'Unlocks thousands in government cashback for physical investments like hardware or studios.',
    lawyerRole: 'Legal verification of capital investment records for FDI compliance.'
  },
  {
    id: 'fiscal-sync',
    category: 'Georgian Advantage',
    name: 'Fiscalization Sync',
    priceGEL: 1200,
    timeSaved: 5,
    whatItIs: 'Real-time API bridge between your checkout and RS.ge (Revenue Service).',
    howItHelps: 'Every sale generates an automated electronic tax invoice. Eliminates manual bookkeeping and prevents RS fines.',
    lawyerRole: 'Ensures data reporting logic complies with the Tax Code of Georgia.'
  },

  // ==========================================
  // 2. MARKETING & CONVERSION PERFORMANCE
  // ==========================================
  {
    id: 'ga4-analytics',
    category: 'Marketing',
    name: 'Advanced GA4 Analytics',
    priceGEL: 1200,
    whatItIs: "A smart tracking system that records exactly how people use your site. We don't just count visitors; we measure how far they scroll, which buttons they actually click, and how much of your videos they truly watch.",
    howItHelps: "It stops the guessing game. You will see exactly where people get confused or leave your site, giving you the 'why' behind your sales. This allows you to stop wasting money on ads that don't work and focus on what actually turns visitors into customers."
  },
  {
    id: 'heatmap',
    category: 'Marketing',
    name: 'Heatmap & Recording',
    priceGEL: 500,
    whatItIs: "A visual map of your website. We install a tool that shows you exactly where people are clicking, how far they scroll, and what parts of your page they are completely ignoring.",
    howItHelps: "It’s like looking over your customers' shoulders. You can watch real screen recordings of their visits to see exactly where they get confused or frustrated. This lets us fix the 'dead zones' and make the path to buying from you as smooth as possible."
  },
  {
    id: 'seo-audit',
    category: 'Marketing',
    name: 'One-Time SEO Audit',
    priceGEL: 800,
    whatItIs: 'A deep-crawl technical audit of your site’s indexing health.',
    howItHelps: 'Finds and fixes "hidden" errors that prevent Google from showing your site in search results.'
  },
  {
    id: 'local-seo',
    category: 'Marketing',
    name: 'Local SEO Pack',
    priceGEL: 1500,
    whatItIs: 'Optimization for Georgian search intent and Google Map Pack dominance.',
    howItHelps: 'Ensures your business is the #1 choice when a local client searches for your service in Tbilisi/Batumi.'
  },
  {
    id: 'multilingual',
    category: 'Marketing',
    name: 'Multilingual Engine',
    priceGEL: 800,
    whatItIs: 'Technical Hreflang setup per additional language layer (GE/EN/RU).',
    howItHelps: 'Unlocks international markets. Studies show localized content gets 3x more conversions than generic translations.'
  },
  {
    id: 'ab-testing',
    category: 'Marketing',
    name: 'A/B Testing Framework',
    priceGEL: 1200,
    whatItIs: "A live experiment for your website. We show two different versions of a section—like a headline, an image, or a button—to different visitors at the same time. Then, we track which version gets more clicks or sales.",
    howItHelps: "It takes the guessing out of your business. Instead of wondering which message or design works better, you let your actual customers tell you with their actions. This ensures your site is always improving and making you as much money as possible."
  },
  {
    id: 'social-sync',
    category: 'Marketing',
    name: 'Social Media Auto-Posting',
    priceGEL: 800,
    timeSaved: 8,
    whatItIs: 'Automated sync between your site blog and Instagram/LinkedIn/Facebook.',
    howItHelps: 'Saves hours of manual work. Posting once on your site pushes the content everywhere instantly.'
  },
  {
    id: 'cro-audit',
    category: 'Marketing',
    name: 'CRO Behavioral Audit',
    priceGEL: 1500,
    recommendation: 'RECOMMENDED WITH GA4 & HEATMAPS',
    whatItIs: "An expert manual review of your website's performance. I personally analyze the data collected by your GA4 and Heatmap modules to find the 'hidden friction'—the exact moments where potential customers get confused and leave.",
    howItHelps: "Data is just numbers unless you have an architect to read it. I translate your recordings and charts into a clear 'battle plan' of which words, colors, and layouts need to change to double your sales. It’s the final step to ensuring your marketing budget isn't being wasted."
  },
  {
    id: 'exit-pop',
    category: 'Marketing',
    name: 'Lead Capture Exit Pop-ups',
    priceGEL: 400,
    whatItIs: "A friendly 'final check' for your visitors. It’s a smart window that only appears when someone is clearly about to leave your site—like moving their mouse toward the 'close' button. It’s a graceful way to offer a parting gift, like a discount or a helpful guide, before they go.",
    howItHelps: "It rescues potential customers who are about to vanish. Instead of losing them forever, you give them one last reason to stay in touch. It’s a low-pressure way to turn a 'goodbye' into a new lead, often recovering up to 15% of the visitors you were about to lose.\n\n[ ℹ️ SOURCE: ] Verified recovery benchmarks from Conversion Sciences & OptinMonster case studies."
  },

  // ==========================================
  // 3. FUNCTIONAL BUSINESS ENGINES
  // ==========================================
  {
    id: 'sms-hub',
    category: 'Business Engines',
    name: 'Direct SMS Hub',
    priceGEL: 650,
    whatItIs: 'Integration with Silknet or Magti API for automated SMS notifications.',
    howItHelps: '98% open rate. Send order confirmations or login codes directly to your clients’ phones.'
  },
  {
    id: 'calendar-sync',
    category: 'Business Engines',
    name: 'Real-Time Calendar Sync',
    priceGEL: 1200,
    timeSaved: 10,
    whatItIs: '2-way bridge between your site and Google/Outlook calendars.',
    howItHelps: 'Eliminates double-booking. Clients see your real-time availability and book/pay in one fluid motion.'
  },
  {
    id: 'deposit-logic',
    category: 'Business Engines',
    name: 'Deposit Payment Logic',
    priceGEL: 1500,
    whatItIs: 'Technical checkout flow for partial upfront payments.',
    howItHelps: 'Guarantees your income. Ensures clients have "skin in the game" before you start work or hold a slot.'
  },
  {
    id: 'multi-filter',
    category: 'Business Engines',
    name: 'Multi-Criteria Filtering',
    priceGEL: 4500,
    whatItIs: 'Search logic for high-volume catalogs (Real Estate, Listings).',
    howItHelps: 'Allows users to find what they want instantly among thousands of items. Critical for a premium user experience.'
  },
  {
    id: 'map-marker',
    category: 'Business Engines',
    name: 'Custom Map Integration',
    priceGEL: 1200,
    whatItIs: 'Custom Google Maps API with neighborhood/luxury markers.',
    howItHelps: 'Visualizes your reach. Essential for real estate or local agencies to show property locations.'
  },
  {
    id: 'listing-portal',
    category: 'Business Engines',
    name: 'Listing Portal',
    priceGEL: 5500,
    whatItIs: 'Allowing external vendors to post their own content/products.',
    howItHelps: 'Transforms your site from a store to a Marketplace. You take a cut of every transaction made by others.'
  },
  {
    id: 'course-tracking',
    category: 'Business Engines',
    name: 'Course Tracking Logic',
    priceGEL: 8000,
    timeSaved: 20,
    whatItIs: 'Gated content system with student progress bars and quizzes.',
    howItHelps: 'The core of a Digital Academy. Automates your education business so it runs without you.'
  },
  {
    id: 'auto-cert',
    category: 'Business Engines',
    name: 'Automated Certification',
    priceGEL: 1200,
    whatItIs: 'Dynamic PDF generation for graduates.',
    howItHelps: 'Increases student completion rates. Students receive a branded diploma instantly upon finishing your course.'
  },
  {
    id: 'recurring-bill',
    category: 'Business Engines',
    name: 'Subscription Billing',
    priceGEL: 2500,
    whatItIs: 'Infrastructure for recurring membership payments.',
    howItHelps: 'Builds predictable Monthly Recurring Revenue (MRR). Automatically bills clients every month.'
  },



  // ==========================================
  // 5. ADVANCED AUTOMATION & AI
  // ==========================================
  {
    id: 'rule-chatbot',
    category: 'AI & Automation',
    name: 'Rule-Based Chatbot',
    priceGEL: 2700,
    timeSaved: 10,
    whatItIs: "A smart, guided assistant for your website. Instead of making your customers type out long questions, we provide clear 'Quick-Reply' buttons that answer their top needs—like pricing, services, or booking—instantly and accurately.",
    howItHelps: "It’s like having a 24/7 receptionist that never makes a mistake. It saves you 10+ hours a month by handling basic requests automatically, only alerting you when a high-value lead is ready to talk. Because it uses a guided button system, it’s 100% reliable, works perfectly on mobile, and has zero monthly API costs."
  },
  {
    id: 'ai-sprint',
    category: 'AI & Automation',
    name: 'AI Agent Sprint',
    priceGEL: 50000,
    timeSaved: 40,
    whatItIs: '5-week build for a custom, actionable AI business logic.',
    howItHelps: 'Replaces a full-time staff member. An AI that can actually take actions in your business tools.'
  },
  {
    id: 'ai-kb',
    category: 'AI & Automation',
    name: 'AI Knowledge Base (RAG)',
    priceGEL: 5000,
    timeSaved: 15,
    whatItIs: 'Feeding your private PDFs and videos to a custom AI brain.',
    howItHelps: 'Acts as your digital clone. It answers fan questions exactly like you would, using your specific tone and knowledge.'
  },
  {
    id: 'hubspot-sync',
    category: 'AI & Automation',
    name: 'HubSpot/CRM Integration',
    priceGEL: 2500,
    whatItIs: 'Connecting your sales forms directly to your sales pipeline.',
    howItHelps: 'Ensures no lead is ever forgotten. Every signup is automatically categorized for your follow-up.'
  },
  {
    id: 'api-opt',
    category: 'AI & Automation',
    name: 'API Optimization',
    priceGEL: 1500,
    whatItIs: 'Refining data-flow between different tools.',
    howItHelps: 'Reduces server costs and increases speed by ensuring tools talk to each other efficiently.'
  },
  {
    id: 'rpa-auto',
    category: 'AI & Automation',
    name: 'RPA Automation',
    priceGEL: 3000,
    timeSaved: 10,
    whatItIs: 'Automating manual, repetitive invoicing or data entry.',
    howItHelps: 'Saves 40+ hours a month. Replaces human data entry with 100% accurate software robots.'
  },

  // ==========================================
  // 6. CREATIVE & CONTENT ADD-ONS
  // ==========================================
  {
    id: 'extra-page',
    category: 'Creative',
    name: 'Additional Static Page',
    priceGEL: 450,
    whatItIs: "A single, fixed-content expansion (e.g., Privacy Policy, Team Bio). This is a static node and does not include a CMS Dashboard or Blog functionality. For self-managed, dynamic growth, see the Digital Command Center foundation.",
    howItHelps: "It lets your website grow as your business does. Instead of a cluttered site, you can give each important detail its own professional home. This keeps your brand organized and allows you to scale your online presence without needing a full rebuild later.\n\n⚠️ ARCHITECT'S NOTE:\n\"This is a fixed-content expansion. It is designed for information that stays consistent. If you need a dynamic, self-managed Blog Engine or a Content Dashboard, we recommend the Digital Command Center foundation.\""
  },
  {
    id: 'brand-identity',
    category: 'Creative',
    name: 'Brand Identity Pack',
    priceGEL: 1500,
    whatItIs: 'Logo, typography, and professional brand guidelines.',
    howItHelps: 'Consistency = Trust. Ensures your website looks as professional as a Fortune 500 company.'
  },
  {
    id: 'pro-copy',
    category: 'Creative',
    name: 'Professional Copywriting',
    priceGEL: 300,
    whatItIs: "High-performance sales messaging engineered using the AIDA framework (Attention, Interest, Desire, Action). We architect a narrative that hooks your visitors' attention, builds genuine interest in your service, creates a deep desire for the solution, and triggers a clear call to action.",
    howItHelps: "Design grabs attention, but words make the sale. Professional messaging transforms your website from a passive brochure into a persuasive 24/7 salesperson. By speaking directly to your customer's needs through a proven psychological funnel, we significantly increase your conversion rates and ensure your brand's value is felt."
  },
  {
    id: 'doc-template',
    category: 'Creative',
    name: 'Document Templates',
    priceGEL: 400,
    whatItIs: 'Custom branded invoices, contracts, and decks.',
    howItHelps: 'Every touchpoint looks elite. Even your "boring" invoices will reinforce your brand quality.'
  },
  {
    id: 'micro-animations',
    category: 'Creative',
    name: 'Micro-Animations',
    priceGEL: 800,
    whatItIs: "Advanced motion design and kinetic interactions. We use elite libraries like Framer Motion to engineer subtle, 'Apple-level' responses—magnetic buttons, smooth scroll-reveals, and fluid transitions that make your website feel alive, responsive, and premium.",
    howItHelps: "The '0.1% Luxury' signal. High-ticket clients value attention to detail. These micro-interactions build subconscious trust and signal that your business operates at the highest professional level. It keeps users engaged longer and transforms a standard browsing session into a world-class digital experience."
  },

  // ==========================================
  // 7. POST-LAUNCH & OPERATIONAL
  // ==========================================
  {
    id: 'sla-support',
    category: 'Operational',
    name: 'SLA Priority Support',
    priceGEL: 500,
    whatItIs: 'Guaranteed 4-hour emergency response times.',
    howItHelps: 'Peace of mind. You never have to wait days for a fix; we are on standby 24/7.'
  },
  {
    id: 'knowledge-transfer',
    category: 'Operational',
    name: 'Knowledge Transfer',
    priceGEL: 400,
    whatItIs: '1-on-1 staff training session.',
    howItHelps: 'Empowerment. We teach your team how to manage the new infrastructure so you don’t need a developer for every tiny change.'
  },
  {
    id: 'tech-doc',
    category: 'Operational',
    name: 'Tech Documentation',
    priceGEL: 1500,
    whatItIs: 'Architecture manuals and logic flowcharts.',
    howItHelps: 'Future-proofing. If you ever hire more devs, they can understand your system in minutes rather than weeks.'
  },
  {
    id: 'staff-aug',
    category: 'Operational',
    name: 'Staff Augmentation',
    priceGEL: 120,
    whatItIs: 'Renting a developer hourly bank.',
    howItHelps: 'Elastic scaling. Add a pro developer to your team only when you need them, without the overhead of a full-time hire.'
  },
  {
    id: 'compliance-audit',
    category: 'Operational',
    name: 'Compliance Audit',
    priceGEL: 1200,
    whatItIs: 'GDPR and Georgian Personal Data Protection Law audit.',
    howItHelps: 'Legal immunity. Prevents government fines up to 20,000 GEL by ensuring your data handling is 100% legal.',
    lawyerRole: 'Professional legal audit of your data storage and cookie policies.'
  },
  {
    id: 'adj-credits',
    category: 'Operational',
    name: 'Adjustment Credits',
    priceGEL: 750,
    whatItIs: 'Pre-paid bundle of 10 minor site adjustments.',
    howItHelps: 'Saves 30% vs. hourly rates. The fastest way to keep your site fresh as your business evolves.'
  }
];

export interface ShieldPerk {
  title: string;
  desc: string;
}

export const SHIELD_TIERS = [
  { 
    id: 0, 
    name: 'Reputation Scout', 
    priceGEL: 0, 
    level: 'Basic', 
    risk: 'High', 
    perks: [
      { title: 'SSL Oversight', desc: 'Prevents "Not Secure" browser lockouts.' },
      { title: 'Blacklist Monitoring', desc: 'Stops your site/emails going to spam.' },
      { title: 'AWS Backup Node', desc: 'Basic off-site recovery points saving cycles.' }
    ], 
    description: 'The bare minimum to exist safely on the web.' 
  },
  { 
    id: 1, 
    name: 'Micro Shield', 
    priceGEL: 200, 
    level: 'Proactive', 
    risk: 'Medium', 
    isRecommended: true,
    perks: [
      { title: 'CDN Configuration', desc: 'Global image edge caching frame routing.' },
      { title: 'Kinetic Uptime Pings', desc: 'Global pings every 60s to check fixes.' },
      { title: 'Time-Machine Backups', desc: 'Daily database restores if anything breaks.' },
      { title: 'Security Patching', desc: 'Critical software lock downs against bots.' },
      { title: 'Database Cleanup', desc: 'Remove clean index junk tables bloating speed.' }
    ], 
    description: 'Protects 100/100 speeds from natural performance decay.' 
  },
  { 
    id: 2, 
    name: 'Active Shield', 
    priceGEL: 650, 
    level: 'Guardian', 
    risk: 'Low', 
    perks: [
      { title: 'Includes Micro Shield+', desc: 'All Tier 2 advantages included.' },
      { title: 'Malware Shield Pro', desc: 'Real-time brute force armor hardening defenses.' },
      { title: 'Enterprise Speed Turbo', desc: 'Hits 90+ Pagespeeds server-side rendering.' },
      { title: 'Priority Support Queue', desc: 'Guaranteed support queue placement.' },
      { title: 'Conversion Audits', desc: 'Bi-weekly suggests to increase sales.' }
    ], 
    description: 'A developer on-call to optimize your layout as your audience grows.' 
  },
  { 
    id: 3, 
    name: 'Enterprise Shield', 
    priceGEL: 3250, 
    level: 'Immune', 
    risk: 'None', 
    perks: [
      { title: 'Includes Active Shield+', desc: 'All Tier 3 advantages included.' },
      { title: '4-Hour SLA Guarantee', desc: 'Critical failure response inside 4 hours.' },
      { title: 'AI-Sentinel Triage', desc: 'Website auto-resolves soft load errors.' },
      { title: 'Algorithm Immunity', desc: 'Bypasses broken Instagram or bank APIs.' },
      { title: '1% Threshold Tracker', desc: 'Trigger alerts preserving tax status limits.' }
    ], 
    description: 'Defenders of revenue against bank outages, algorithm shifts, and tax penalties.' 
  }
];
