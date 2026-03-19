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
}

export interface Foundation extends ServiceItem {
  description: string;
  concept: string;
  strategy: string;
  scope: string[];
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
    scope: [
      '1 Perfectly Crafted Page (Zero fluff, all results)', 
      'Smart Lead Capture (Leads delivered to you instantly)', 
      'Conversion-First Layout (Designed to make people click)'
    ],
    concept: 'One perfect page designed to do one thing: turn a visitor into a customer. We remove the fluff and leave only the results.',
    strategy: "Focus is the new currency. By removing navigation menus and distractions, we eliminate the 'Paradox of Choice,' leading your visitor on a single, straight path to your 'Buy' button.",
    howItWorks: 'Removes navigation friction to prevent users from wandering, focusing 100% of the energy on a single call-to-action.',
    proFeatures: [
      { title: 'Strategically Engineered', desc: 'Built for results, not just looks. Every element is placed to move people closer to a "Yes".' },
      { title: 'Conversion-Centered Layout', desc: 'A visual path that guides your visitors directly to your "Buy" or "Book" button without distractions.' },
      { title: 'Lead Capture Logic', desc: 'A smart, secure system that catches every lead and delivers them to your hands instantly.' }
    ],
    bestFor: ["Influencers with 1 Specific Offer", "Webinar & Event Hosts", "Real Estate 'Hero' Listings", "Digital Product Launchers"],
    roiNote: "Designed to maximize your ad-spend ROI."
  },
  {
    id: 'cms',
    name: 'Digital Command Center',
    category: 'Base',
    priceGEL: 6750,
    description: "Your professional headquarters. This moves you from a 'one-man show' to a 'global brand' with a system you can actually control.",
    scope: [
      '4 Professional Foundational Pages (Home, About, Contact, Blog)', 
      'Visual Brand Dashboard (Total control over your content)', 
      'Media Asset Vault (High-speed home for your photos/videos)'
    ],
    concept: "Your professional headquarters. This moves you from a 'one-man show' to a 'global brand' with a system you can actually control.",
    strategy: "This is about Authority. We use a 'Headless' architecture to separate your design from your content. This means you can update your brand story in seconds via your dashboard without ever needing a developer.",
    howItWorks: 'You get a simplified social media-style editor to change photos and text without touching code.',
    proFeatures: [
      { title: 'Visual CMA Interface', desc: 'Intuitive "drag-and-drop" updates to your brand story.' },
      { title: 'Media Asset Library', desc: 'A centralized, optimized vault for high-res brand photography and videos.' },
      { title: 'Dynamic Blog Framework', desc: 'Automatically categorizes thought leadership for SEO dominance.' }
    ],
    bestFor: ["B2B Consultants & Coaches", "Creative & Marketing Agencies", "High-Ticket Service Providers", "Professional Personal Brands"],
    roiNote: "Built for owner-independence and authority."
  },
  {
    id: 'ecomm',
    name: '24/7 E-commerce Storefront',
    category: 'Base',
    priceGEL: 12150,
    description: "An automated sales machine that handles the hard work—payments, stock, and shipping—so you can focus on creating.",
    scope: [
      'Full Transactional Core (Shop, Product, Checkout)', 
      'Inventory Control Center (Real-time stock tracking)', 
      'Admin Sales Dashboard (Your business cockpit)'
    ],
    concept: "An automated sales machine that handles the hard work—payments, stock, and shipping—so you can focus on creating.",
    strategy: "Friction is the enemy of sales. We build a high-speed 'Checkout Tunnel' designed to keep the psychological momentum going until the payment is confirmed, while handling stock and shipping in the background.",
    howItWorks: 'Handles money, shipping, and stock tracking so the entrepreneur can focus on creating.',
    proFeatures: [
      { title: 'Automated Inventory Sync', desc: 'Real-time updates to stock levels with "Sold Out" alerts.' },
      { title: 'Secure Checkout Tunnel', desc: 'High-security protocol handling global cards and 2026 data standards.' },
      { title: 'Administrative Sales Dashboard', desc: 'Comprehensive backend view of revenue, orders, and shipping.' }
    ],
    bestFor: ["Niche Boutique Owners", "Merch & Apparel Creators", "Digital Asset Sellers", "Artisanal Exporters (Wine/Jewelry)"],
    roiNote: "Automates overheads to scale sales flawlessly."
  },
  {
    id: 'saas',
    name: 'Custom Web Application',
    category: 'Base',
    priceGEL: 40500,
    description: "A dedicated software tool built to solve a specific problem for your community at infinite scale. This is a sellable asset, not just a site.",
    scope: [
      'Core SaaS Logic Architecture (The brain of your tool)', 
      'Private User Accounts (Secure doors for every member)', 
      'Scale-Ready Database (Built for 10 or 10,000 users)'
    ],
    concept: "A dedicated software tool built to solve a specific problem for your community at infinite scale. This is a sellable asset, not just a site.",
    strategy: "This is a sellable business asset, not just a site. By using 'Multi-Tenancy' logic, we ensure every user has a secure, private experience within your system, making it a scalable platform for your community.",
    howItWorks: 'Uses custom logic (like fitness calculators or booking systems) to solve niche problems for your community.',
    proFeatures: [
      { title: 'Role-Based Access (RBAC)', desc: 'Custom permission levels (Free User, VIP Member, Admin).' },
      { title: 'Custom API Integration', desc: 'Connecting your logic to Google Maps, OpenAI, or logistics trackers.' },
      { title: 'Scalable Foundation', desc: 'Technical foundation built for thousands of concurrent users without slowing down.' }
    ],
    bestFor: ["Private Membership Communities", "EdTech & Online Academies", "Niche SaaS Founders", "Booking & Management Tools"],
    roiNote: "Creates scalable MRR digital business asset flaws setups."
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
    ]
  }
];

export const MODULES: Module[] = [
  // ==========================================
  // 1. GEORGIAN ADVANTAGE (Legal & Financial)
  // ==========================================
  {
    id: 'bank-rep',
    category: 'Georgian Advantage',
    name: 'Bank Integration Representative',
    priceGEL: 1500,
    whatItIs: 'Full legal representation to TBC or BOG via Power of Attorney (POA).',
    howItHelps: 'We handle the bureaucracy, certified translations, and KYC meetings so your tax ID links to your gateway without you visiting a branch.',
    lawyerRole: 'Drafts the POA, verifies notary translations, and ensures banking KYC compliance.'
  },
  {
    id: 'pay-gateway',
    category: 'Georgian Advantage',
    name: 'Payment Gateway Setup',
    priceGEL: 800,
    whatItIs: 'Technical API engineering to bridge your site with TBC, BOG, or Liberty Bank.',
    howItHelps: 'Allows you to accept GEL/USD/EUR directly into your local account with 0.1s transaction latency.'
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
    whatItIs: 'Custom event tracking architecture (scroll depth, CTA clicks, video watch-time).',
    howItHelps: 'Shows exactly where you are losing money in your funnel so you can make data-driven marketing decisions.'
  },
  {
    id: 'heatmap',
    category: 'Marketing',
    name: 'Heatmap & Recording',
    priceGEL: 500,
    whatItIs: 'Setup of Hotjar or Microsoft Clarity behavioral analysis tools.',
    howItHelps: 'Allows you to watch recordings of users interacting with your site to identify "dead zones" where they get stuck.'
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
    whatItIs: 'Infrastructure to test two versions of a headline or button simultaneously.',
    howItHelps: 'Lets the data decide what works. Increases conversion rates by scientifically proving which design generates more clicks.'
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
    whatItIs: 'A manual expert audit to identify user "friction" points.',
    howItHelps: 'Translates data into strategy. We tell you exactly what colors, words, and layouts to change to double your sales.'
  },
  {
    id: 'exit-pop',
    category: 'Marketing',
    name: 'Lead Capture Exit Pop-ups',
    priceGEL: 400,
    whatItIs: 'Intelligent triggers that detect when a user is about to close the tab.',
    howItHelps: 'Recovers up to 15% of lost traffic by offering a lead magnet or discount in the final second.'
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
  // 4. SECURITY, SPEED & OPTIMIZATION
  // ==========================================
  {
    id: 'speed-turbo',
    category: 'Security & Speed',
    name: 'Enterprise Speed Turbo',
    priceGEL: 700,
    whatItIs: 'Image-edge caching and server-side rendering (SSR) optimization.',
    howItHelps: 'Hits a 90+ PageSpeed score. 0.1s speed increase = 8.4% revenue boost in 2026.'
  },
  {
    id: 'cdn-config',
    category: 'Security & Speed',
    name: 'CDN Configuration',
    priceGEL: 500,
    whatItIs: 'Global distribution of your site data across international servers.',
    howItHelps: 'Ensures your site is fast for fans in London/NYC as it is in Tbilisi.'
  },
  {
    id: 'malware-shield',
    category: 'Security & Speed',
    name: 'Malware Shield',
    priceGEL: 1350,
    whatItIs: 'System hardening and real-time brute-force protection.',
    howItHelps: 'Reputation insurance. Stops hackers from turning your site into a "red flag" on Google.'
  },
  {
    id: 'offsite-backup',
    category: 'Security & Speed',
    name: 'Off-Site Backups',
    priceGEL: 300,
    whatItIs: 'Automated secondary cloud storage on AWS or S3.',
    howItHelps: 'Zero data loss. If the main server fails, we restore your business in minutes from a hidden vault.'
  },
  {
    id: 'uptime-monitor',
    category: 'Security & Speed',
    name: 'Uptime Monitoring',
    priceGEL: 400,
    whatItIs: '24/7 pings and alert systems.',
    howItHelps: 'If your site goes down, we know instantly—often fixing it before you even wake up.'
  },
  {
    id: 'sec-patching',
    category: 'Security & Speed',
    name: 'Security Patching',
    priceGEL: 500,
    whatItIs: 'Proactive updates for system core and dependencies.',
    howItHelps: 'Keeps the "doors" locked. 96% of hacks happen through outdated software.'
  },
  {
    id: 'db-cleanup',
    category: 'Security & Speed',
    name: 'Database Cleanup',
    priceGEL: 400,
    whatItIs: 'Removing "digital junk" from your data tables.',
    howItHelps: 'Keeps the "brain" fast. Improves retrieval times for orders and customer searches.'
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
    whatItIs: 'Pre-scripted FAQ and lead capture automation.',
    howItHelps: 'Answers basic questions instantly 24/7, freeing you from "Is this available?" DMs.'
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
    whatItIs: 'High-conversion writing per page.',
    howItHelps: 'Turning visitors into buyers. We write the words that trigger the psychological urge to click "Buy".'
  },
  {
    id: 'photography',
    category: 'Creative',
    name: 'Product Photography',
    priceGEL: 300,
    whatItIs: 'Studio or on-site professional shoots.',
    howItHelps: 'Premium visuals justify premium prices. High-res imagery is the #1 factor in E-commerce trust.'
  },
  {
    id: 'ugc-video',
    category: 'Creative',
    name: 'UGC Video Production',
    priceGEL: 250,
    whatItIs: 'Influencer-style "User Generated" video ads.',
    howItHelps: 'High social proof. Real people using your products generate 4x more engagement than corporate ads.'
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
    whatItIs: 'Custom JS/CSS interactions and fluid hovers.',
    howItHelps: 'The "0.1% Elite" feel. Small details that signal to high-ticket clients that they are in a premium space.'
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
      { title: 'Blacklist Monitoring', desc: 'Stops your site/emails going to spam.' }
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
      { title: 'CWV Speed Reports', desc: 'Monthly proof your site is 100/100 fast.' },
      { title: 'Kinetic Uptime Pings', desc: 'Global pings every 60s to check fixes.' },
      { title: 'Time-Machine Backups', desc: 'Daily database restores if anything breaks.' },
      { title: 'Security Patching', desc: 'Critical software lock downs against bots.' }
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
      { title: '2 Adjustments / mo', desc: 'Minor UI/Copy tweaks without hourly rates.' },
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
