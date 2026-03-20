"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Heart, Shield, Layout, Zap, Award, Target, Check, Globe, Users, ShoppingBag, Database, Smartphone, Link2, TrendingUp, Tv, FileText } from "lucide-react";

export const STANDARD_QUESTIONS = [
    {
      id: "design_style",
      title: "The Design Style",
      description: "Select your aesthetic direction.",
      type: "cards",
      options: [
        { value: "minimal", label: "Clean & Minimal", icon: Layout },
        { value: "luxury", label: "Dark & Luxurious", icon: Shield },
        { value: "energetic", label: "Bold & Energetic", icon: Zap },
        { value: "futuristic", label: "Futuristic & Tech", icon: Target },
        { value: "editorial", label: "Editorial & Professional", icon: Award }
      ]
    },
    {
      id: "color_palette",
      title: "The 3-Color Signature",
      description: "Pick 3 colors you want to see working together on your platform.",
      type: "color-palette"
    },
    {
      id: "inspiration",
      title: "The Inspiration Gallery",
      description: "Link all the websites you love browsing or admire visually.",
      type: "textarea",
      placeholder: "https://site1.com\nhttps://site2.com"
    },
    {
      id: "typography",
      title: "Typography Choice",
      description: "What kind of font suits your brand personality?",
      type: "tabs",
      options: ["Sharp & Modern", "Classic & Timeless", "Unique & Script"]
    },
    {
      id: "pitch",
      title: "The One-Sentence Pitch",
      description: "In one sentence, what is the primary purpose of this website?",
      type: "textarea",
      placeholder: "Example: To sell premium coffee subscriptions..."
    },
    {
      id: "north_star",
      title: "The North Star",
      description: "What is the single most important action for a visitor?",
      type: "cards",
      options: [
        { value: "products", label: "Sell Products", icon: Target },
        { value: "calls", label: "Book a Call", icon: Award },
        { value: "audience", label: "Grow My Audience", icon: Heart },
        { value: "authority", label: "Build Authority", icon: Shield },
        { value: "support", label: "Automate Support", icon: Zap },
        { value: "app", label: "Deliver a Tool", icon: Layout }
      ]
    },
    {
      id: "emotional_hook",
      title: "The Emotional Hook",
      description: "How should someone feel the moment they land on your page?",
      type: "tags",
      options: ["Inspired", "Safe", "Impressed", "Powerful", "Relaxed", "Challenged"]
    }
];

export const UPGRADE_QUESTIONS = [
    {
      id: "upgrade_platform",
      title: "The Current Engine",
      description: "What platform is your current site running on?",
      type: "cards",
      options: [
        { value: "wordpress", label: "WordPress", icon: Layout },
        { value: "wix", label: "Wix / Squarespace", icon: Shield },
        { value: "custom", label: "Custom / HTML", icon: Zap }
      ]
    },
    {
      id: "upgrade_concern",
      title: "The Critical Concern",
      description: "What's the #1 issue dragging your performance down?",
      type: "tags",
      options: ["Page Speed (Lighthouse)", "Security / Bot Attacks", "Legal Compliance", "Clunky Editing UX"]
    },
    {
      id: "upgrade_url",
      title: "Domain Status",
      description: "Drop your current site URL below for evaluation access.",
      type: "input",
      placeholder: "https://yourbrand.com"
    }
];

export const FOUNDATION_SPECIFIC_MAP: Record<string, any[]> = {
    landing: [
      { id: "hero_offer", title: "The Hero Offer", description: "What is the primary prize they get for clicking the button?", type: "textarea", placeholder: "e.g., A free guide, 30% discount, a discovery call" },
      { id: "pain_point", title: "The Pain Point", description: "What is the #1 frustration your customer is feeling right now that this page solves?", type: "textarea" },
      { id: "transformation", title: "The Transformation", description: "Describe the 'Before' vs. 'After'—how does their life change after using your product/service?", type: "textarea" },
      { id: "social_proof", title: "The Social Proof", description: "What is your most impressive result?", type: "input", placeholder: "Example: 500+ items or Five-Star feedback" },
      { id: "visual_trust", title: "The Visual Trust", description: "Do you have logos of media outlets or big brands you’ve worked with?", type: "tabs", options: ["I have logos ready", "Not yet"] },
      { id: "urgency", title: "The Urgency", description: "Why should they buy today instead of tomorrow?", type: "textarea", placeholder: "Limited offer vs Permanent solution" }
    ],
    cms: [
      { id: "anchor_platform", title: "The Anchor Platform", description: "Which social platform is the 'heart' of your brand right now?", type: "cards", options: [
        { value: "instagram", label: "Instagram", icon: Smartphone },
        { value: "youtube", label: "YouTube", icon: Tv },
        { value: "tiktok", label: "TikTok", icon: Zap },
        { value: "linkedin", label: "LinkedIn", icon: Link2 },
        { value: "twitter", label: "Twitter / X", icon: Globe }
      ]},
      { id: "lead_magnet", title: "The Lead Magnet", description: "What is the 'Bribe' we are using to get their email address?", type: "input", placeholder: "e.g. Weekly newsletter, private PDF, community link" },
      { id: "dm_killer", title: "The DM Killer: Automation Logic", description: "What is the #1 question that haunts your DMs?", type: "textarea", placeholder: "Describe the DM headache..." },
      { id: "content_pillars", title: "The Content Pillars", description: "What are the 3 main topics you want to be known for as an authority?", type: "textarea", placeholder: "1. Topic A\n2. Topic B\n3. Topic C" },
      { id: "ultimate_destination", title: "The Ultimate Destination", description: "Where is the 'End Game' for your followers?", type: "tags", options: ["Private Group", "Paid Course", "High-Ticket Service", "Value content"] },
      { id: "authority_count", title: "The Authority Number", description: "What is your joint follower count across all platforms?", type: "input", placeholder: "e.g. 50,000" }
    ],
    ecomm: [
      { id: "fulfillment_logic", title: "The Fulfillment Logic", description: "How are orders handled?", type: "cards", options: [
        { value: "physical", label: "Physical Shipping", icon: ShoppingBag },
        { value: "digital", label: "Digital Download", icon: Zap },
        { value: "service", label: "Service Booking", icon: Award }
      ]},
      { id: "catalog_size", title: "The Catalog Size", description: "What is the scale of your current launch catalog?", type: "tabs", options: ["Hero Products (1-5)", "Medium Catalog (6-49)", "Massive Catalog (50+)"] },
      { id: "market_reach", title: "The Market Reach", description: "Are we selling locally or expanding to a global audience?", type: "tabs", options: ["Locally (TBC/BoG)", "Globally (Stripe/PayPal)"] },
      { id: "upsell", title: "The High-Ticket Upsell", description: "What is the one thing people usually buy after they purchase your main product?", type: "input" },
      { id: "cart_rescue", title: "The Cart Rescue", description: "Do you want to offer a one-time discount code to bring back abandoned carts?", type: "tabs", options: ["Yes, automate discount", "No"] },
      { id: "unboxing_vibe", title: "The Unboxing Vibe", description: "What should the 'Thank You' email feel like?", type: "tabs", options: ["Professional & Formal", "Friendly & High-Energy"] }
    ],
    saas: [
      { id: "core_function", title: "The Magic Button", description: "What is the core technical function of your software tool?", type: "textarea", placeholder: "Example: It calculates ROI; It manages a database..." },
      { id: "revenue_model", title: "The Revenue Model", description: "Is this a paid subscription (SaaS)?", type: "tabs", options: ["Free Value-Add Tool", "Paid Subscription (SaaS)"] },
      { id: "user_hierarchy", title: "User Hierarchy", description: "Will there be different login levels?", type: "tags", options: ["Single Tier", "Admin vs Member", "Client vs Freelancer"] },
      { id: "two_minute_win", title: "The 2-Minute Win", description: "What is the one thing a user should achieve within 2 minutes?", type: "input" },
      { id: "device_priority", title: "Device Priority", description: "Will your users be using this primarily on Mobile or Desktop?", type: "tabs", options: ["Mobile phones on the go", "Desktop at their desk", "Unified setup"] },
      { id: "data_bridge", title: "The Data Bridge", description: "Does this app need to 'talk' to other tools like Google Sheets or Slack?", type: "textarea", placeholder: "Describe any integrations needed (Zapier, CRMs...)" }
    ]
  };

export const MODULE_QUESTIONS_MAP: Record<string, any[]> = {
    'pay-gateway': [
      { id: "pay_gateway_node", title: "Primary Settlement", description: "Which banking node handles your daily operations?", type: "tabs", options: ["TBC Bank", "Bank of Georgia", "International Gateway"] }
    ],
    'fiscal-sync': [
      { id: "fiscal_sync_type", title: "Revenue Classification", description: "Does your model require physical delivery notes (RS.ge Waybills) or instant digital tax invoicing?", type: "tabs", options: ["Physical Waybills", "Digital Tax Invoices"] }
    ],
    'gita-grant': [
      { id: "gita_grant_tax", title: "Tax Optimization", description: "Is your LLC currently registered as an 'International Company' or 'Virtual Zone' to maximize GITA benefits?", type: "tabs", options: ["International Company", "Virtual Zone", "Not Registered Yet"] }
    ],
    'multilingual': [
      { id: "multilingual_nodes", title: "Geographic Expansion", description: "Which specific language nodes are mandatory for your launch? (e.g., GE/EN/RU)", type: "input", placeholder: "e.g., GE, EN, RU" }
    ],
    'multi-filter': [
      { id: "multi_filter_priority", title: "The Search Priority", description: "What are the top 3 attributes your clients prioritize? (e.g., Price, Neighborhood, Availability)", type: "input", placeholder: "e.g., Price, Neighborhood, Location" }
    ],
    'calendar-sync': [
      { id: "calendar_sync_type", title: "Booking Architecture", description: "Are we scheduling 1-on-1 private consultations or high-capacity group sessions?", type: "tabs", options: ["1-on-1 Consultations", "Group Sessions"] }
    ],
    'listing-portal': [
      { id: "listing_portal_inventory", title: "Inventory Control", description: "Is this a closed ecosystem (staff only) or a multi-vendor marketplace (open for external sellers)?", type: "tabs", options: ["Closed Ecosystem", "Multi-Vendor Marketplace"] }
    ],
    'course-tracking': [
      { id: "course_tracking_gating", title: "Learning Retention", description: "Is the curriculum strictly video-based, or do we require interactive gating (Quizzes/Certifications)?", type: "tabs", options: ["Video-Based Only", "Interactive Gating (Quizzes)"] }
    ],
    'recurring-bill': [
      { id: "recurring_bill_strategy", title: "Retention Strategy", description: "Do you require a 'Free Trial' lead magnet or a multi-tiered subscription model?", type: "tabs", options: ["Free Trial Magnet", "Multi-Tiered Model"] }
    ],
    'rule-chatbot': [
      { id: "chatbot_support_filter", title: "The Support Filter", description: "What is the most repetitive question your staff answers manually every single day?", type: "textarea", placeholder: "Describe the repetitive FAQ..." }
    ],
    'ai-kb': [
      { id: "ai_kb_source", title: "The Knowledge Source", description: "Is the AI pulling logic from official PDFs, company policies, or your personal video transcripts?", type: "tags", options: ["Official PDFs", "Company Policies", "Video Transcripts", "Custom Docs"] }
    ],
    'rpa-auto': [
      { id: "rpa_auto_bottleneck", title: "Operational Bottleneck", description: "What single manual task consumes more than 5 hours of your team's week?", type: "textarea", placeholder: "Describe the time-consuming task..." }
    ],
    'hubspot-sync': [
      { id: "hubspot_sync_routing", title: "Pipeline Routing", description: "At which specific deal stage should a new lead land inside your CRM?", type: "input", placeholder: "e.g., Lead In, Contacted, Qualified" }
    ],
    'pro-copy': [
      { id: "pro_copy_frequency", title: "Brand Frequency", description: "What tone of voice should the 'Architect' use to speak to your clients?", type: "tabs", options: ["Professional / Elite", "Bold / Direct", "Warm / Approachable"] }
    ]
  };

export default function DiscoveryModule({ foundation, selectedModules, shieldTier, goToStep, answers, setAnswers, discoveryStep, setDiscoveryStep }: any) {
  const step = discoveryStep;
  const setStep = setDiscoveryStep;
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const IS_UPGRADE = foundation === 'upgrade';



  const getQuestions = () => {
    if (IS_UPGRADE) return UPGRADE_QUESTIONS;
    const spec = FOUNDATION_SPECIFIC_MAP[foundation as string] || [];
    const dynamicModuleQs: any[] = [];
    
    (selectedModules || []).forEach((modId: string) => {
        if (MODULE_QUESTIONS_MAP[modId]) {
            dynamicModuleQs.push(...MODULE_QUESTIONS_MAP[modId]);
        }
    });

    const combined = [...STANDARD_QUESTIONS, ...spec, ...dynamicModuleQs];
    return combined.map((q, i) => ({
      ...q,
      label: `Question ${(i + 1).toString().padStart(2, '0')}`
    }));
  };

  const QUESTIONS = getQuestions();

  const handleSelect = (qId: string, value: any) => {
    setAnswers((prev: any) => ({ ...prev, [qId]: value }));



    const optionsWithSingleSelect = ["cards", "tabs", "toggle", "tags"];
    if (optionsWithSingleSelect.includes(QUESTIONS[step].type)) {
      if (step < QUESTIONS.length - 1) {
          setTimeout(() => {
              setStep((prev: any) => prev + 1);
              const nextEl = document.getElementById(`question-${QUESTIONS[step + 1]?.id}`);
              if (nextEl) nextEl.scrollIntoView({ behavior: "smooth", block: "center" });
          }, 400);
      }
    }
  };

  const handlesSubmit = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      goToStep(5);
    }, 1500);
  };

  const isCompleted = Object.keys(answers).length >= QUESTIONS.length;

  return (
    <div className="flex-1 w-full max-w-xl mx-auto py-10 pb-[60vh]">


      <AnimatePresence mode="wait">
          <m.div className="space-y-40">
            <div className="text-center pb-10 pt-5">
              <h1 className="text-3xl font-black font-space text-white tracking-tight">Discovery Briefing</h1>
              <p className="text-emerald-400 font-bold font-space text-xs tracking-widest uppercase mt-1">Define Your North Star</p>
            </div>
            {QUESTIONS.map((q, idx) => {
              const isActive = step === idx;
              return (
                <m.div
                  key={q.id}
                  id={`question-${q.id}`}
                  initial={{ opacity: 0.2, y: 50 }}
                  animate={{ opacity: isActive ? 1 : 0.2, y: 0, scale: isActive ? 1 : 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className={`flex flex-col items-center justify-center text-center space-y-4 transition-all duration-300 min-h-[40vh] py-16 ${isActive ? "pointer-events-auto" : "pointer-events-none"}`}
                >
                  <span className="text-xs font-black font-space text-emerald-400 uppercase tracking-widest text-2xl">
                    {q.label}
                  </span>
                  <h2 className="text-3xl font-black font-space text-white tracking-tight">
                    {q.title}
                  </h2>
                  <p className="text-sm text-slate-400 max-w-sm">
                    {q.description}
                  </p>

                  <div className="w-full mt-4 flex justify-center">
                    {q.type === "cards" && (
                      <div className="grid grid-cols-3 gap-2 w-full">
                        {q.options?.map((opt: any) => (
                          <button
                            key={opt.value}
                            onClick={() => handleSelect(q.id, opt.value)}
                            className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                              answers[q.id] === opt.value
                                ? "border-emerald-400 bg-emerald-500/10 text-emerald-300"
                                : "border-white/5 bg-white/[0.02] hover:bg-white/5 text-slate-300"
                            }`}
                          >
                            <opt.icon className="h-5 w-5 text-emerald-400" />
                            <span className="text-[9px] font-black font-space uppercase">
                              {opt.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}

                    {q.type === "color" && (
                      <div className="flex flex-col items-center gap-3">
                        <div className="flex items-center gap-2 bg-white/5 p-1.5 rounded-xl border border-white/10">
                          <input
                            type="color"
                            onChange={(e) => setAnswers((prev: any) => ({ ...prev, [q.id]: e.target.value }))}
                            value={answers[q.id] || "#10b981"}
                            className="h-8 w-8 cursor-pointer rounded-md bg-transparent border-0"
                          />
                        </div>
                        <button onClick={() => { setStep(idx + 1); const nextEl = document.getElementById(`question-${idx + 2}`); if (nextEl) nextEl.scrollIntoView({ behavior: "smooth", block: "center" }); }} className="px-3 py-1.5 bg-emerald-400 rounded-lg text-black font-space font-black text-[10px] uppercase cursor-pointer hover:bg-emerald-300">Next</button>
                      </div>
                    )}

                    {q.type === "color-palette" && (
                      <div className="flex flex-col items-center gap-4">
                        <div className="flex items-center gap-4 bg-white/5 p-3 rounded-2xl border border-white/10">
                          {[0, 1, 2].map((i) => (
                            <input
                              key={i}
                              type="color"
                              value={answers[q.id]?.[i] || "#10b981"}
                              onChange={(e) => {
                                const current = [...(answers[q.id] || ["#10b981", "#10b981", "#10b981"])];
                                current[i] = e.target.value;
                                setAnswers((prev: any) => ({ ...prev, [q.id]: current }));
                              }}
                              className="h-12 w-12 cursor-pointer rounded-full bg-transparent border-2 border-white/20 hover:border-emerald-400 transition-all"
                            />
                          ))}
                        </div>
                        <button onClick={() => { setStep(idx + 1); const nextEl = document.getElementById(`question-${QUESTIONS[idx + 1]?.id}`); if (nextEl) nextEl.scrollIntoView({ behavior: "smooth", block: "center" }); }} className="px-3 py-1.5 bg-emerald-400 rounded-lg text-black font-space font-black text-[10px] uppercase cursor-pointer hover:bg-emerald-300">Next</button>
                      </div>
                    )}

                    {q.type === "input" && (
                      <div className="flex flex-col items-center gap-3 w-full">
                        <input
                          type="text"
                          placeholder={q.placeholder}
                          value={answers[q.id] || ""}
                          onChange={(e) => setAnswers((prev: any) => ({ ...prev, [q.id]: e.target.value }))}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && answers[q.id]) {
                              if (idx === QUESTIONS.length - 1) {
                                handlesSubmit();
                              } else {
                                setStep(idx + 1);
                                const nextEl = document.getElementById(`question-${QUESTIONS[idx + 1]?.id}`);
                                if (nextEl) nextEl.scrollIntoView({ behavior: "smooth", block: "center" });
                              }
                            }
                          }}
                          className="w-full text-center bg-transparent border-b-2 border-white/10 focus:border-emerald-400 text-3xl font-black text-white py-2 focus:outline-none focus:ring-0 placeholder:text-white/10"
                        />
                        {answers[q.id] && (
                          <button
                            onClick={idx === QUESTIONS.length - 1 ? handlesSubmit : () => { setStep(idx + 1); const nextEl = document.getElementById(`question-${QUESTIONS[idx + 1]?.id}`); if (nextEl) nextEl.scrollIntoView({ behavior: "smooth", block: "center" }); }}
                            className="mt-2 px-3 py-1.5 bg-emerald-400 rounded-lg text-black font-space font-black text-[10px] uppercase cursor-pointer flex items-center gap-1 hover:bg-emerald-300 transition-all"
                          >
                            {idx === QUESTIONS.length - 1 ? "Generate My Blueprint" : "Next →"}
                          </button>
                        )}
                      </div>
                    )}

                    {q.type === "textarea" && (
                      <div className="flex flex-col items-center gap-3 w-full">
                        <textarea
                          placeholder={q.placeholder}
                          value={answers[q.id] || ""}
                          onChange={(e) => setAnswers((prev: any) => ({ ...prev, [q.id]: e.target.value }))}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey && answers[q.id]) {
                              e.preventDefault();
                              if (idx === QUESTIONS.length - 1) {
                                handlesSubmit();
                              } else {
                                setStep(idx + 1);
                                const nextEl = document.getElementById(`question-${QUESTIONS[idx + 1]?.id}`);
                                if (nextEl) nextEl.scrollIntoView({ behavior: "smooth", block: "center" });
                              }
                            }
                          }}
                          className="w-full text-center bg-transparent border-b-2 border-white/10 focus:border-emerald-400 text-xl font-bold text-white py-2 focus:outline-none focus:ring-0 placeholder:text-white/10 resize-none h-24"
                        />
                        {q.id === 5 && answers[q.id] && answers[q.id].trim().split(/\s+/).length > 20 && (
                          <p className="text-[10px] text-amber-300 font-bold bg-amber-500/5 px-2 py-0.5 rounded border border-amber-500/10">Try to keep it under 20 words for maximum impact.</p>
                        )}
                        {answers[q.id] && (
                          <button
                            onClick={idx === QUESTIONS.length - 1 ? handlesSubmit : () => { setStep(idx + 1); const nextEl = document.getElementById(`question-${QUESTIONS[idx + 1]?.id}`); if (nextEl) nextEl.scrollIntoView({ behavior: "smooth", block: "center" }); }}
                            className="mt-2 px-3 py-1.5 bg-emerald-400 rounded-lg text-black font-space font-black text-[10px] uppercase cursor-pointer flex items-center gap-1 hover:bg-emerald-300 transition-all"
                          >
                            {idx === QUESTIONS.length - 1 ? "Generate My Blueprint" : "Next →"}
                          </button>
                        )}
                      </div>
                    )}

                    {q.type === "tabs" && (
                      <div className="flex gap-1.5 bg-white/5 p-1 rounded-xl border border-white/5">
                        {q.options?.map((opt: any) => (
                          <button
                            key={opt}
                            onClick={() => handleSelect(q.id, opt)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold font-space transition-all ${
                              answers[q.id] === opt ? "bg-emerald-400 text-black shadow-sm" : "text-slate-400 hover:text-white"
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}

                    {q.type === "toggle" && (
                      <div className="flex flex-col gap-1.5 w-full">
                        {q.options?.map((opt: any) => (
                          <button
                            key={opt}
                            onClick={() => handleSelect(q.id, opt)}
                            className={`p-2.5 rounded-xl border text-left text-xs font-bold font-space ${
                              answers[q.id] === opt
                                ? "border-emerald-400 bg-emerald-500/10 text-emerald-300"
                                : "border-white/5 bg-white/[0.02] hover:bg-white/5 text-slate-300"
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}

                    {q.type === "tags" && (
                      <div className="flex flex-wrap gap-1.5 justify-center">
                        {q.options?.map((opt: any) => (
                          <button
                            key={opt}
                            onClick={() => handleSelect(q.id, opt)}
                            className={`px-3 py-1.5 rounded-full border text-[11px] font-bold font-space transition-all ${
                              answers[q.id] === opt ? "border-emerald-400 bg-emerald-400 text-black" : "border-white/10 bg-white/5 text-slate-400 hover:border-white/20"
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}
                    {idx === QUESTIONS.length - 1 && answers[q.id] && (
                      <m.button
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        onClick={handlesSubmit}
                        disabled={isAnalyzing}
                        className="mt-6 px-5 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-black font-space font-black text-xs uppercase rounded-xl flex items-center justify-center gap-1.5 shadow-[0_10px_25px_rgba(16,185,129,0.3)] cursor-pointer transition-all mx-auto z-50 relative"
                      >
                        {isAnalyzing ? "Generating..." : "Generate Infrastructure Blueprint"}
                        <Zap className="h-3.5 w-3.5 fill-current" />
                      </m.button>
                    )}
                  </div>
                </m.div>
              );
            })}

            {isCompleted && (
              <m.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 10 }}
                onClick={handlesSubmit}
                disabled={isAnalyzing}
                className="w-full py-2.5 rounded-xl bg-emerald-400 text-black font-space font-black text-xs uppercase shadow-lg flex items-center justify-center gap-2 hover:bg-emerald-300 transition-all cursor-pointer"
              >
                {isAnalyzing ? "Reviewing..." : "Submit for Architectural Review"}
              </m.button>
            )}
          </m.div>
      </AnimatePresence>
    </div>
  );
}
