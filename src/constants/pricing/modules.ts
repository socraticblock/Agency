import type { Module } from './types';

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
    name: 'Merchant API — Client Has Key',
    priceGEL: 800,
    whatItIs: 'Connecting your existing bank-approved Merchant ID to your site with custom HMAC security and Bank-Audit compliance. For businesses who already have a bank-approved Merchant ID but need the technical bridge.',
    howItHelps: 'Allows you to accept GEL/USD/EUR directly into your local account with 0.1s transaction latency.',
    lawyerRole: 'Oversees merchant processing compliance, verifying corporate data structure aligns with local anti-money-laundering (AML) banking settlements.'
  },
  {
    id: 'pay-gateway-full',
    category: 'Georgian Advantage',
    name: 'Merchant API — We Handle Bank',
    priceGEL: 1500,
    whatItIs: 'Full merchant onboarding + integration. We handle the bank visits, KYC clearance, merchant approval, and the technical bridge — end to end.',
    howItHelps: 'Turnkey payment setup. You don\'t visit a branch or fill out bank forms — we handle everything from application to live transactions.',
    lawyerRole: 'Oversees merchant processing compliance, verifies corporate data structure aligns with local anti-money-laundering (AML) banking settlements.'
  },
  {
    id: 'gita-grant',
    category: 'Georgian Advantage',
    name: 'GITA Grant Advisory',
    priceGEL: 1500,
    whatItIs: 'Strategic technical auditing and documentation for the 150,000 GEL matching grant.',
    howItHelps: 'Aligns your tech stack with GITA\'s "Global Innovation" criteria to maximize your chances of winning the grant.',
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
    whatItIs: 'Complex documentation for Georgia\'s 15% cashback investment programs.',
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
    howItHelps: "It's like looking over your customers' shoulders. You can watch real screen recordings of their visits to see exactly where they get confused or frustrated. This lets us fix the 'dead zones' and make the path to buying from you as smooth as possible."
  },
  {
    id: 'seo-audit',
    category: 'Marketing',
    name: 'Legacy SEO Migration & Audit',
    priceGEL: 800,
    whatItIs: `A deep-cycle technical audit and data-preservation map of your current digital footprint. We analyze every existing URL, keyword ranking, and backlink your business currently owns to ensure your transition to the Genezisi infrastructure is mathematically flawless.`,
    howItHelps: `It provides SEO Insurance. Moving to a new site without a migration map is the #1 way businesses lose 50–80% of their Google traffic overnight. We build a '301-Redirect Bridge' that tells Google exactly where your old pages went, preserving your authority and ensuring your ranking growth continues from day one without a reset.`
  },
  {
    id: 'local-seo',
    category: 'Marketing',
    name: 'Local SEO Pack & Map Dominance',
    priceGEL: 1500,
    whatItIs: `Strategic optimization engineered to dominate geographic search results (e.g., 'Best service in Tbilisi'). We inject 'Local Schema' markup into your code and optimize your Google Business Profile to ensure you appear in the coveted 'Map Pack' for high-intent local queries.`,
    howItHelps: `It captures customers exactly when they are ready to buy. Most local searches happen on mobile with immediate intent; by outranking your neighbors in the map pack, you drive direct physical traffic and phone inquiries. This is the single most effective way to dominate your specific territory and capture local market share.`
  },
  {
    id: 'multilingual',
    category: 'Marketing',
    name: 'Global Market Expansion (Multilingual)',
    priceGEL: 800,
    whatItIs: `A professional-grade technical 'Hreflang' architecture that supports native sub-directories for different languages (GEO/EN/RU). We don't use 'auto-translate' widgets; we build a clean, multi-route system that allows Google to index each language version of your site separately.`,
    howItHelps: `It triples your potential audience. In a globalized hub like Georgia, offering your service only in one language leaves 60% of the money on the table. By giving EN and RU speakers a native experience, you lower 'bounce rates' and massively increase international lead conversion while ranking on foreign-language search engines.`
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
    whatItIs: `An automated server-side 'webhook' bridge that connects your DCC Blog directly to your professional social channels (LinkedIn, IG, FB). When you publish an update to your site, it is automatically formatted and distributed across your social ecosystem instantly.`,
    howItHelps: `It buys you back dozens of hours of manual labor per month. It ensures your brand stays active and authoritative 24/7 without you ever having to remember to 'post' something. Consistency is the only way to build digital authority, and this module automates that consistency forever.`
  },
  {
    id: 'cro-audit',
    category: 'Marketing',
    name: 'CRO Behavioral Audit',
    priceGEL: 1500,
    recommendation: 'RECOMMENDED WITH GA4 & HEATMAPS',
    whatItIs: "An expert manual review of your website's performance. I personally analyze the data collected by your GA4 and Heatmap modules to find the 'hidden friction'—the exact moments where potential customers get confused and leave.",
    howItHelps: "Data is just numbers unless you have an architect to read it. I translate your recordings and charts into a clear 'battle plan' of which words, colors, and layouts need to change to double your sales. It's the final step to ensuring your marketing budget isn't being wasted."
  },
  {
    id: 'exit-pop',
    category: 'Marketing',
    name: 'Lead Capture Exit Pop-ups',
    priceGEL: 400,
    whatItIs: "A friendly 'final check' for your visitors. It's a smart window that only appears when someone is clearly about to leave your site—like moving their mouse toward the 'close' button. It's a graceful way to offer a parting gift, like a discount or a helpful guide, before they go.",
    howItHelps: "It rescues potential customers who are about to vanish. Instead of losing them forever, you give them one last reason to stay in touch. It's a low-pressure way to turn a 'goodbye' into a new lead, often recovering up to 15% of the visitors you were about to lose.\n\n[ ℹ️ SOURCE: ] Verified recovery benchmarks from Conversion Sciences & OptinMonster case studies."
  },

  // ==========================================
  // 3. FUNCTIONAL BUSINESS ENGINES
  // ==========================================
  {
    id: 'sms-hub',
    category: 'Business Engines',
    name: 'Direct SMS Hub',
    priceGEL: 650,
    whatItIs: "A direct-to-phone alert system. Instead of relying on emails that end up in 'Spam,' we connect your store to a professional SMS gateway that sends automated text messages to your customers for order updates.",
    howItHelps: "It builds massive trust. In Georgia, everyone checks their SMS immediately. By sending a text that says 'Your order is on the way!' or 'We've received your payment,' you make the customer feel safe and taken care of. It virtually eliminates the 'Where is my order?' phone calls, saving your team hours of support time every week."
  },
  {
    id: 'calendar-sync',
    category: 'Business Engines',
    name: 'Real-Time Calendar Sync',
    priceGEL: 1200,
    timeSaved: 10,
    whatItIs: `A seamless, 2-way API bridge between your website and your professional calendar (Google or Outlook). We build a live availability interface that allows clients to book meetings with you based on your actual, real-time schedule.`,
    howItHelps: `It eliminates the 'Email Tag' friction that kills sales. When a lead is hot, they can book you in 3 clicks instead of waiting 4 hours for a reply. It ensures zero double-bookings and professional scheduling 'buffer zones,' transforming your site into an elite personal assistant that manages your time for you.`
  },
  {
    id: 'deposit-logic',
    category: 'Business Engines',
    name: 'Deposit Payment Logic',
    priceGEL: 1500,
    whatItIs: `A secure financial transaction layer that integrates directly with Georgian merchant gateways (TBC/BOG). We build a checkout logic that requires a specific deposit or full payment before a booking or service is confirmed.`,
    howItHelps: `It stops 'No-Shows' and filters out time-wasters. By requiring 'skin in the game' (a 100 ₾ or 500 ₾ commitment), you ensure every lead on your calendar is a serious, paying customer. This stabilizes your cash flow and protects your most valuable asset: your time.`
  },
  {
    id: 'multi-filter',
    category: 'Business Engines',
    name: 'Multi-Criteria Filtering',
    priceGEL: 1500,
    whatItIs: "A heavy-duty 'Smart Search' engine for your products. It allows customers to filter through your inventory by price, size, color, brand, and technical specs all at once—without ever having to wait for a page to reload.",
    howItHelps: "It kills 'Search Frustration.' If a customer has to click through 10 pages to find a 'Blue XL Shirt,' they will leave. This is the 0.1% architecture used by giants like Amazon and Farfetch. It makes your entire catalog easy to browse in seconds, which directly increases your sales and keeps people on your site longer."
  },
  {
    id: 'map-marker',
    category: 'Business Engines',
    name: 'Custom Map Integration',
    priceGEL: 1200,
    whatItIs: "A high-end, branded map experience. We go beyond a simple 'contact' page and build an interactive map using elite tools (like MapBox) that shows your physical locations, pick-up points, or delivery zones in your brand's specific colors and style.",
    howItHelps: "It makes your brand look local and established. For businesses with physical stores or specific delivery areas in Tbilisi or Batumi, this visual transparency builds immediate trust. It shows your customers exactly where you are and makes the 'pick-up' option feel like a premium, organized experience."
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
    priceGEL: 5000,
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
    whatItIs: "The 'Monthly Revenue' engine. We build the logic that allows you to sell products on a recurring basis—think 'Wine of the Month' clubs, beauty boxes, or membership access—where the customer is billed automatically every month.",
    howItHelps: "It creates predictable cash flow. Instead of hunting for new customers every single day, you build a loyal base that pays you on autopilot. This is the fastest way to increase the total value of your business, as recurring revenue is much more stable than one-time sales."
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
    howItHelps: "It's like having a 24/7 receptionist that never makes a mistake. It saves you 10+ hours a month by handling basic requests automatically, only alerting you when a high-value lead is ready to talk. Because it uses a guided button system, it's 100% reliable, works perfectly on mobile, and has zero monthly API costs."
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
    whatItIs: `A sophisticated bi-directional data pipeline. We connect your website's lead forms directly to your sales software (HubSpot, Salesforce, Pipedrive), ensuring every visitor inquiry is automatically categorized and injected into your sales funnel.`,
    howItHelps: `It ensures Zero Lead Leakage. Every inquiry is captured, tracked, and ready for follow-up within seconds. It allows your sales team to see exactly what a customer looked at before they called, giving you the 'insider info' needed to close high-ticket deals with precision.`
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
    whatItIs: "A 'Digital Assistant' for your entire business ecosystem. We write custom code that makes your website talk to your other tools—automatically updating stock levels across social media platforms and syncing every day's profit data directly into your accounting software.",
    howItHelps: "It lets you scale without hiring an admin team. While the foundation handles the legal receipts, this module handles the business of growing. It eliminates manual data entry, prevents 'double-selling' on different platforms, and ensures your books are always 100% accurate without you ever touching a spreadsheet."
  },

  // ==========================================
  // 6. CREATIVE & CONTENT ADD-ONS
  // ==========================================
  {
    id: 'extra-page',
    category: 'Creative',
    name: 'Additional Static Page',
    priceGEL: 450,
    whatItIs: `A single, high-performance static node built into your core infrastructure.`,
    howItHelps: `Best for 'Our Story' or 'Return Policy' pages. Allows your digital real estate to grow alongside your business without cluttering the main navigation.`
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
    whatItIs: "A custom, code-driven document generation engine. We architect and design high-fidelity PDF templates for your business—including professional invoices, detailed packing slips, and branded shipping manifests—that are automatically generated for every order the moment it is placed.",
    howItHelps: "It creates a 'Luxury Post-Purchase Loop.' Your brand's premium identity shouldn't end at the 'Buy' button; it should follow the product into the customer's hands. This module eliminates manual paperwork while building elite trust through beautiful documentation design anchors. When a customer opens a package and finds a pixel-perfect, branded invoice, it subconsciously justifies your premium pricing and turns a simple transaction into a world-class brand experience."
  },
  {
    id: 'micro-animations',
    category: 'Creative',
    name: 'Micro-Animations',
    priceGEL: 800,
    whatItIs: `High-end motion and magnetic triggers that make standard interactions on product triggers feel satisfying and premium.`,
    howItHelps: `Standardized '0.1% Luxury' indicators. Simple kinetic prompts keep users engaged longer and increase clicking satisfying micro-interactions.`
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
    priceGEL: 0,
    whatItIs: 'PDF/video training materials for your team.',
    howItHelps: 'Delivered as comprehensive documentation and video walkthroughs — included free with every build.'
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
    priceGEL: 150,
    whatItIs: 'Hourly developer support — add a pro to your team on demand.',
    howItHelps: 'Elastic scaling. Add a pro developer to your team only when you need them, without the overhead of a full-time hire.'
  },
  {
    id: 'compliance-audit',
    category: 'Operational',
    name: 'Compliance Audit',
    priceGEL: 1200,
    whatItIs: "A legal and digital 'Shield' check. We perform a deep-dive review of your site's Terms and Conditions, Privacy Policies, and Refund Logic to ensure they meet both Georgian E-commerce laws and international security standards.",
    howItHelps: "It protects you from 'Legal Nightmares.' In the world of online sales, a single mistake in your refund policy or a data security flaw can lead to massive fines or bank penalties. This audit gives you 'Sleep-at-night' insurance, making sure your business is legally airtight and your customers feel safe entering their card details.",
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
