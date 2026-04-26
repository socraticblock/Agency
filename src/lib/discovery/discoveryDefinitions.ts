import { 
  Shield, 
  Zap, 
  Lock, 
  Cpu, 
  CreditCard, 
  Globe, 
  Palette,
  MessageSquare,
  Users,
  TrendingUp,
  BarChart3
} from "lucide-react";

export const STANDARD_QUESTIONS = [
  {
    id: "projectGoal",
    title: "The Primary Objective",
    description: "What is the single most important outcome for this new digital home?",
    type: "cards",
    options: [
      { 
        value: "conversion", 
        label: "Direct Sales", 
        desc: "Optimized for frictionless 2-click booking and payments.",
        icon: Zap 
      },
      { 
        value: "authority", 
        label: "Authority", 
        desc: "Focus on brand storytelling, premium visuals, and social proof.",
        icon: Shield 
      },
      { 
        value: "automation", 
        label: "Efficiency", 
        desc: "Automate routine inquiries and scheduling to reclaim your focus.",
        icon: Cpu 
      }
    ]
  },
  {
    id: "currentRevenue",
    title: "Revenue Profile",
    description: "What's the current monthly volume handled through manual DMs? (GEL)",
    type: "tabs",
    options: ["0 - 2,000", "2,000 - 5,000", "5,000 - 15,000", "15,000+"]
  },
  {
    id: "mainPainPoint",
    title: "Operational Bottleneck",
    description: "What's the most frustrating part of your current workflow?",
    type: "toggle",
    options: [
      "Answering the same questions daily",
      "Manual bank transfer tracking",
      "Low reach on social platforms",
      "Inconsistent brand presentation"
    ]
  },
  {
    id: "designVibe",
    title: "Visual Identity",
    description: "How should the interface feel to your audience?",
    type: "cards",
    options: [
      { value: "minimal", label: "Minimalist", desc: "Clean, spacious, high-end editorial feel.", icon: Lock },
      { value: "kinetic", label: "Dynamic", desc: "Interactive, fluid motion, energetic.", icon: Zap },
      { value: "sovereign", label: "Sovereign", desc: "Dark mode, glassmorphic, premium tech aesthetic.", icon: Shield }
    ]
  }
];

export const UPGRADE_QUESTIONS = [
  {
    id: "currentSite",
    title: "Current Setup",
    description: "What are you using today for your digital presence?",
    type: "input",
    placeholder: "e.g. Wix, Linktree, Instagram-only"
  },
  {
    id: "upgradeReason",
    title: "Reason for Evolution",
    description: "Why is the current setup no longer sufficient for your growth?",
    type: "textarea",
    placeholder: "e.g. Too slow, hard to manage payments, looks generic..."
  }
];

export const FOUNDATION_SPECIFIC_MAP: Record<string, any[]> = {
  "bridge": [
    {
      id: "dataIndependence",
      title: "Data Strategy",
      description: "How do you currently store customer contact information?",
      type: "tabs",
      options: ["Social DMs", "WhatsApp Chat", "Notion/Excel", "No central system"]
    }
  ],
  "intercept": [
    {
      id: "bankPreference",
      title: "Banking Infrastructure",
      description: "Which Georgian bank do you intend to use for local payments?",
      type: "cards",
      options: [
        { value: "tbc", label: "TBC Bank", desc: "Native TBC Checkout integration.", icon: CreditCard },
        { value: "bog", label: "Bank of Georgia", desc: "Direct BoG iPay gateway.", icon: CreditCard }
      ]
    }
  ],
  "vault": [
    {
      id: "aiTone",
      title: "AI Personality",
      description: "How should your AI assistant communicate with customers?",
      type: "tabs",
      options: ["Polite & Formal", "Friendly & Direct", "Enthusiastic", "Brief & Efficient"]
    }
  ]
};

export const MODULE_QUESTIONS_MAP: Record<string, any[]> = {
  "analytics": [
    {
      id: "keyMetrics",
      title: "Success Metrics",
      description: "Which metrics do you want to track most closely?",
      type: "tags",
      options: ["Conversion Rate", "Time on Page", "Top Traffic Sources", "Click Maps"]
    }
  ],
  "booking": [
    {
      id: "bookingType",
      title: "Scheduling Logic",
      description: "What are we booking through the platform?",
      type: "tabs",
      options: ["1-on-1 Calls", "Physical Services", "Classes/Events"]
    }
  ]
};
