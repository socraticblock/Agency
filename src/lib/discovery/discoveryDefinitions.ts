import {
  Heart,
  Shield,
  Layout,
  Zap,
  Award,
  Target,
  Globe,
  Smartphone,
  Link2,
  Tv,
  ShoppingBag,
} from "lucide-react";

/** Serializable question shape for foundation/module-specific discovery (options vary by type). */
export type DiscoveryQuestionDef = {
  id: string;
  title: string;
  description: string;
  type: string;
  placeholder?: string;
  options?: unknown;
  allowCustom?: boolean;
  count?: number;
};

export const STANDARD_QUESTIONS = [
  {
    id: "design_style",
    title: "The Design Style",
    description: "Select your aesthetic direction.",
    type: "cards",
    options: [
      { value: "minimal", label: "Clean & Minimal", icon: Layout, desc: "Typography-driven layouts without distraction." },
      { value: "luxury", label: "Dark & Luxurious", icon: Shield, desc: "Deep contrast, polished gradients, and premium space." },
      { value: "energetic", label: "Bold & Energetic", icon: Zap, desc: "Vibrant, motion-heavy interfaces that pop off screen." },
      { value: "futuristic", label: "Futuristic & Tech", icon: Target, desc: "Grid lines, absolute precision, and cyber accents." },
      { value: "editorial", label: "Editorial", icon: Award, desc: "Magazine-like layouts focusing on elite photography." },
    ],
  },
  {
    id: "color_palette",
    title: "The 3-Color Signature",
    description: "Pick 3 colors you want to see working together on your platform.",
    type: "color-palette",
  },
  {
    id: "inspiration",
    title: "The Inspiration Gallery",
    description: "Link all the websites you love browsing or admire visually.",
    type: "textarea",
    placeholder: "https://site1.com\nhttps://site2.com",
  },
  {
    id: "typography",
    title: "Typography Choice",
    description: "What kind of font suits your brand personality?",
    type: "tabs",
    options: ["Sharp & Modern", "Classic & Timeless", "Unique & Script"],
    allowCustom: true,
  },
  {
    id: "pitch",
    title: "The One-Sentence Pitch",
    description: "In one sentence, what is the primary purpose of your website?",
    type: "textarea",
    placeholder: "Example: To sell premium coffee subscriptions...",
  },
  {
    id: "north_star",
    title: "The North Star",
    description: "What is the single most important action for a visitor?",
    type: "cards",
    options: [
      { value: "products", label: "Sell Products", icon: Target, desc: "High-speed cart conversions focusing on e-commerce." },
      { value: "calls", label: "Book a Call", icon: Award, desc: "Qualify high-ticket leads directly onto your calendar." },
      { value: "audience", label: "Grow My Audience", icon: Heart, desc: "Capture emails and expand your digital community footprint." },
      { value: "authority", label: "Build Authority", icon: Shield, desc: "A prestigious digital headquarters that elevates your trust." },
      { value: "support", label: "Automate Support", icon: Zap, desc: "Self-service client portals that drastically reduce tickets." },
      { value: "app", label: "Deliver a Tool", icon: Layout, desc: "SaaS execution handling complex data or logic tools." },
    ],
  },
  {
    id: "emotional_hook",
    title: "The Emotional Hook",
    description: "How should someone feel the moment they land on your page?",
    type: "tags",
    options: ["Inspired", "Safe", "Impressed", "Powerful", "Relaxed", "Challenged"],
    allowCustom: true,
  },
];

export const UPGRADE_QUESTIONS = [
  {
    id: "upgrade_platform",
    title: "The Current Engine",
    description: "What platform is your current site running on?",
    type: "cards",
    options: [
      { value: "wordpress", label: "WordPress", icon: Layout, desc: "The legacy open-source engine." },
      { value: "wix", label: "Wix / Squarespace", icon: Shield, desc: "Closed-ecosystem DIY builders." },
      { value: "custom", label: "Custom / HTML", icon: Zap, desc: "Hard-coded tech stack." },
    ],
  },
  {
    id: "upgrade_concern",
    title: "The Critical Concern",
    description: "What's the #1 issue dragging your performance down?",
    type: "tags",
    options: ["Page Speed (Lighthouse)", "Security / Bot Attacks", "Legal Compliance", "Clunky Editing UX"],
  },
  {
    id: "upgrade_url",
    title: "Domain Status",
    description: "Drop your current site URL below for evaluation access.",
    type: "input",
    placeholder: "https://yourbrand.com",
  },
];

export const FOUNDATION_SPECIFIC_MAP: Record<string, any[]> = {
  landing: [
    {
      id: "hero_offer",
      title: "The Hero Offer",
      description: "What is the primary prize they get for clicking the button?",
      type: "textarea",
      placeholder: "e.g., A free guide, 30% discount, a discovery call",
    },
    {
      id: "pain_point",
      title: "The Pain Point",
      description: "What is the #1 frustration your customer is feeling right now that this page solves?",
      type: "textarea",
    },
    {
      id: "transformation",
      title: "The Transformation",
      description: "Describe the 'Before' vs. 'After'—how does their life change after using your product/service?",
      type: "textarea",
    },
    {
      id: "social_proof",
      title: "The Social Proof",
      description: "What is your most impressive result?",
      type: "input",
      placeholder: "Example: 500+ items or Five-Star feedback",
    },
    {
      id: "visual_trust",
      title: "The Visual Trust",
      description: "Do you have logos of media outlets or big brands you’ve worked with?",
      type: "tabs",
      options: ["I have logos ready", "Not yet"],
    },
    {
      id: "urgency",
      title: "The Urgency",
      description: "Why should they buy today instead of tomorrow?",
      type: "textarea",
      placeholder: "Limited offer vs Permanent solution",
    },
  ],
  cms: [
    {
      id: "anchor_platform",
      title: "The Anchor Platform",
      description: "Which social platform is the 'heart' of your brand right now?",
      type: "cards",
      options: [
        { value: "instagram", label: "Instagram", icon: Smartphone, desc: "Visual storytelling and DMs." },
        { value: "youtube", label: "YouTube", icon: Tv, desc: "Long-form search-based video." },
        { value: "tiktok", label: "TikTok", icon: Zap, desc: "High velocity short-form." },
        { value: "linkedin", label: "LinkedIn", icon: Link2, desc: "B2B networking and professional lean gen." },
        { value: "twitter", label: "Twitter / X", icon: Globe, desc: "Real-time thought leadership." },
      ],
    },
    {
      id: "lead_magnet",
      title: "The Lead Magnet",
      description: "What is the 'Bribe' we are using to get their email address?",
      type: "tags",
      options: ["Checklist", "Mini-Course", "PDF Guide", "Resource Vault", "Discount Code", "Free Consultation"],
      allowCustom: true,
    },
    {
      id: "dm_killer",
      title: "The DM Killer: Automation Logic",
      description: "What is the #1 question that haunts your DMs?",
      type: "textarea",
      placeholder: "Describe the DM headache...",
    },
    {
      id: "content_pillars",
      title: "The Content Pillars",
      description: "What are the 3 main topics you want to be known for as an authority?",
      type: "multi-input",
      count: 3,
    },
    {
      id: "ultimate_destination",
      title: "The Ultimate Destination",
      description: "Where is the 'End Game' for your followers?",
      type: "tags",
      options: ["Private Group", "Paid Course", "High-Ticket Service", "Value Content", "Physical Product", "Software (SaaS)", "Newsletter", "Event / Retreat"],
      allowCustom: true,
    },
    {
      id: "authority_count",
      title: "The Authority Number",
      description: "What is your joint follower count across all platforms?",
      type: "input",
      placeholder: "e.g. 50,000",
    },
  ],
  ecomm: [
    {
      id: "fulfillment_logic",
      title: "The Fulfillment Logic",
      description: "How are orders handled?",
      type: "cards",
      options: [
        { value: "physical", label: "Physical Shipping", icon: ShoppingBag, desc: "Logistics and shipping." },
        { value: "digital", label: "Digital Download", icon: Zap, desc: "Automated digital delivery." },
        { value: "service", label: "Service Booking", icon: Award, desc: "Calendar consultation scheduling." },
      ],
    },
    {
      id: "catalog_size",
      title: "The Catalog Size",
      description: "What is the scale of your current launch catalog?",
      type: "tabs",
      options: ["Hero Products (1-5)", "Medium Catalog (6-49)", "Massive Catalog (50+)"],
    },
    {
      id: "market_reach",
      title: "The Market Reach",
      description: "Are we selling locally or expanding to a global audience?",
      type: "tabs",
      options: ["Locally (TBC/BoG)", "Globally (Stripe/PayPal)"],
    },
    { id: "upsell", title: "The High-Ticket Upsell", description: "What is the one thing people usually buy after they purchase your main product?", type: "input" },
    {
      id: "cart_rescue",
      title: "The Cart Rescue",
      description: "Do you want to offer a one-time discount code to bring back abandoned carts?",
      type: "tabs",
      options: ["Yes, automate discount", "No"],
    },
    {
      id: "unboxing_vibe",
      title: "The Unboxing Vibe",
      description: "What should the 'Thank You' email feel like?",
      type: "tabs",
      options: ["Professional & Formal", "Friendly & High-Energy"],
    },
  ],
  saas: [
    {
      id: "core_function",
      title: "The Magic Button",
      description: "What is the core technical function of your software tool?",
      type: "textarea",
      placeholder: "Example: It calculates ROI; It manages a database...",
    },
    {
      id: "revenue_model",
      title: "The Revenue Model",
      description: "Is this a paid subscription (SaaS)?",
      type: "tabs",
      options: ["Free Value-Add Tool", "Paid Subscription (SaaS)"],
    },
    {
      id: "user_hierarchy",
      title: "User Hierarchy",
      description: "Will there be different login levels?",
      type: "tags",
      options: ["Single Tier", "Admin vs Member", "Client vs Freelancer"],
    },
    { id: "two_minute_win", title: "The 2-Minute Win", description: "What is the one thing a user should achieve within 2 minutes?", type: "input" },
    {
      id: "device_priority",
      title: "Device Priority",
      description: "Will your users be using this primarily on Mobile or Desktop?",
      type: "tabs",
      options: ["Mobile phones on the go", "Desktop at their desk", "Unified setup"],
    },
    {
      id: "data_bridge",
      title: "The Data Bridge",
      description: "Does this app need to 'talk' to other tools like Google Sheets or Slack?",
      type: "textarea",
      placeholder: "Describe any integrations needed (Zapier, CRMs...)",
    },
  ],
};

export const MODULE_QUESTIONS_MAP: Record<string, DiscoveryQuestionDef[]> = {
  "pay-gateway": [
    {
      id: "pay_gateway_node",
      title: "Primary Settlement",
      description: "Which banking node handles your daily operations?",
      type: "tabs",
      options: ["TBC Bank", "Bank of Georgia", "International Gateway"],
    },
  ],
  "fiscal-sync": [
    {
      id: "fiscal_sync_type",
      title: "Revenue Classification",
      description: "Does your model require physical delivery notes (RS.ge Waybills) or instant digital tax invoicing?",
      type: "tabs",
      options: ["Physical Waybills", "Digital Tax Invoices"],
    },
  ],
  "gita-grant": [
    {
      id: "gita_grant_tax",
      title: "Tax Optimization",
      description: "Is your LLC currently registered as an 'International Company' or 'Virtual Zone' to maximize GITA benefits?",
      type: "tabs",
      options: ["International Company", "Virtual Zone", "Not Registered Yet"],
    },
  ],
  multilingual: [
    {
      id: "multilingual_nodes",
      title: "Geographic Expansion",
      description: "Which specific language nodes are mandatory for your launch? (e.g., GE/EN/RU)",
      type: "input",
      placeholder: "e.g., GE, EN, RU",
    },
  ],
  "multi-filter": [
    {
      id: "multi_filter_priority",
      title: "The Search Priority",
      description: "What are the top 3 attributes your clients prioritize? (e.g., Price, Neighborhood, Availability)",
      type: "input",
      placeholder: "e.g., Price, Neighborhood, Location",
    },
  ],
  "calendar-sync": [
    {
      id: "calendar_sync_type",
      title: "Booking Architecture",
      description: "Are we scheduling 1-on-1 private consultations or high-capacity group sessions?",
      type: "tabs",
      options: ["1-on-1 Consultations", "Group Sessions"],
    },
  ],
  "listing-portal": [
    {
      id: "listing_portal_inventory",
      title: "Inventory Control",
      description: "Is this a closed ecosystem (staff only) or a multi-vendor marketplace (open for external sellers)?",
      type: "tabs",
      options: ["Closed Ecosystem", "Multi-Vendor Marketplace"],
    },
  ],
  "course-tracking": [
    {
      id: "course_tracking_gating",
      title: "Learning Retention",
      description: "Is the curriculum strictly video-based, or do we require interactive gating (Quizzes/Certifications)?",
      type: "tabs",
      options: ["Video-Based Only", "Interactive Gating (Quizzes)"],
    },
  ],
  "recurring-bill": [
    {
      id: "recurring_bill_strategy",
      title: "Retention Strategy",
      description: "Do you require a 'Free Trial' lead magnet or a multi-tiered subscription model?",
      type: "tabs",
      options: ["Free Trial Magnet", "Multi-Tiered Model"],
    },
  ],
  "rule-chatbot": [
    {
      id: "chatbot_support_filter",
      title: "The Support Filter",
      description: "What is the most repetitive question your staff answers manually every single day?",
      type: "textarea",
      placeholder: "Describe the repetitive FAQ...",
    },
  ],
  "ai-kb": [
    {
      id: "ai_kb_source",
      title: "The Knowledge Source",
      description: "Is the AI pulling logic from official PDFs, company policies, or your personal video transcripts?",
      type: "tags",
      options: ["Official PDFs", "Company Policies", "Video Transcripts", "Custom Docs"],
    },
  ],
  "rpa-auto": [
    {
      id: "rpa_auto_bottleneck",
      title: "Operational Bottleneck",
      description: "What single manual task consumes more than 5 hours of your team's week?",
      type: "textarea",
      placeholder: "Describe the time-consuming task...",
    },
  ],
  "hubspot-sync": [
    {
      id: "hubspot_sync_routing",
      title: "Pipeline Routing",
      description: "At which specific deal stage should a new lead land inside your CRM?",
      type: "input",
      placeholder: "e.g., Lead In, Contacted, Qualified",
    },
  ],
  "pro-copy": [
    {
      id: "pro_copy_frequency",
      title: "Brand Frequency",
      description: "What tone of voice should the 'Architect' use to speak to your clients?",
      type: "tabs",
      options: ["Professional / Elite", "Bold / Direct", "Warm / Approachable"],
    },
  ],
};
