"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Heart, Shield, Layout, Zap, Award, Target, Check, Globe, Users, ShoppingBag, Database, Smartphone, Link2, TrendingUp, Tv, FileText } from "lucide-react";

export default function DiscoveryModule({ foundation, selectedModules, shieldTier, goToStep, answers, setAnswers, discoveryStep, setDiscoveryStep }: any) {
  const step = discoveryStep;
  const setStep = setDiscoveryStep;
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const IS_UPGRADE = foundation === 'upgrade';

  const STANDARD_QUESTIONS = [
    {
      id: 1,
      label: "Question 01",
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
      id: 2,
      label: "Question 02",
      title: "The 3-Color Signature",
      description: "Pick 3 colors you want to see working together on your platform.",
      type: "color-palette"
    },
    {
      id: 3,
      label: "Question 03",
      title: "The Inspiration Gallery",
      description: "Link all the websites you love browsing or admire visually.",
      type: "textarea",
      placeholder: "https://site1.com\nhttps://site2.com"
    },
    {
      id: 4,
      label: "Question 04",
      title: "Typography Choice",
      description: "What kind of font suits your brand personality?",
      type: "tabs",
      options: ["Sharp & Modern", "Classic & Timeless", "Unique & Script"]
    },
    {
      id: 5,
      label: "Question 05",
      title: "The One-Sentence Pitch",
      description: "In one sentence, what is the primary purpose of this website?",
      type: "textarea",
      placeholder: "Example: To sell premium coffee subscriptions..."
    },
    {
      id: 6,
      label: "Question 06",
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
      id: 7,
      label: "Question 07",
      title: "The Emotional Hook",
      description: "How should someone feel the moment they land on your page?",
      type: "tags",
      options: ["Inspired", "Safe", "Impressed", "Powerful", "Relaxed", "Challenged"]
    }
  ];

  const UPGRADE_QUESTIONS = [
    {
      id: 1,
      label: "Question 01",
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
      id: 2,
      label: "Question 02",
      title: "The Critical Concern",
      description: "What's the #1 issue dragging your performance down?",
      type: "tags",
      options: ["Page Speed (Lighthouse)", "Security / Bot Attacks", "Legal Compliance", "Clunky Editing UX"]
    },
    {
      id: 3,
      label: "Question 03",
      title: "Domain Status",
      description: "Drop your current site URL below for evaluation access.",
      type: "input",
      placeholder: "https://yourbrand.com"
    }
  ];

  const FOUNDATION_SPECIFIC_MAP: Record<string, any[]> = {
    landing: [
      { id: 8, title: "The Hero Offer", description: "What is the primary prize they get for clicking the button?", type: "textarea", placeholder: "e.g., A free guide, 30% discount, a discovery call" },
      { id: 9, title: "The Pain Point", description: "What is the #1 frustration your customer is feeling right now that this page solves?", type: "textarea" },
      { id: 10, title: "The Transformation", description: "Describe the 'Before' vs. 'After'—how does their life change after using your product/service?", type: "textarea" },
      { id: 11, title: "The Social Proof", description: "What is your most impressive result? (e.g., 500+ clients served, $1M+ generated)", type: "input", placeholder: "Example: 500+ items or Five-Star feedback" },
      { id: 12, title: "The Visual Trust", description: "Do you have logos of media outlets or big brands you’ve worked with?", type: "tabs", options: ["I have logos ready", "Not yet"] },
      { id: 13, title: "The Urgency", description: "Why should they buy today instead of tomorrow?", type: "textarea", placeholder: "Limited offer vs Permanent solution" }
    ],
    cms: [
      { id: 8, title: "The Anchor Platform", description: "Which social platform is the 'heart' of your brand right now?", type: "cards", options: [
        { value: "instagram", label: "Instagram", icon: Smartphone },
        { value: "youtube", label: "YouTube", icon: Tv },
        { value: "tiktok", label: "TikTok", icon: Zap },
        { value: "linkedin", label: "LinkedIn", icon: Link2 },
        { value: "twitter", label: "Twitter / X", icon: Globe }
      ]},
      { id: 9, title: "The Lead Magnet", description: "What is the 'Bribe' we are using to get their email address?", type: "input", placeholder: "e.g. Weekly newsletter, private PDF, community link" },
      { id: 10, title: "The Face of the Brand", description: "Is this a Personal Brand or a Corporate Brand?", type: "tabs", options: ["Personal Brand (Me)", "Corporate Brand (Company)"] },
      { id: 11, title: "The Content Pillars", description: "What are the 3 main topics you want to be known for as an authority?", type: "textarea", placeholder: "1. Topic A\n2. Topic B\n3. Topic C" },
      { id: 12, title: "The Ultimate Destination", description: "Where is the 'End Game' for your followers?", type: "tags", options: ["Private Group", "Paid Course", "High-Ticket Service", "Value content"] },
      { id: 13, title: "The Authority Number", description: "What is your total combined follower/subscriber count across all platforms?", type: "input", placeholder: "e.g. 50,000" }
    ],
    ecomm: [
      { id: 8, title: "The Fulfillment Logic", description: "How are orders handled?", type: "cards", options: [
        { value: "physical", label: "Physical Shipping", icon: ShoppingBag },
        { value: "digital", label: "Digital Download", icon: Zap },
        { value: "service", label: "Service Booking", icon: Award }
      ]},
      { id: 9, title: "The Catalog Size", description: "What is the scale of your current launch catalog?", type: "tabs", options: ["Hero Products (1-5)", "Medium Catalog (6-49)", "Massive Catalog (50+)"] },
      { id: 10, title: "The Market Reach", description: "Are we selling locally or expanding to a global audience?", type: "tabs", options: ["Locally (TBC/BoG)", "Globally (Stripe/PayPal)"] },
      { id: 11, title: "The High-Ticket Upsell", description: "What is the one thing people usually buy after they purchase your main product?", type: "input" },
      { id: 12, title: "The Cart Rescue", description: "Do you want to offer a one-time discount code to bring back abandoned carts?", type: "tabs", options: ["Yes, automate discount", "No"] },
      { id: 13, title: "The Unboxing Vibe", description: "What should the 'Thank You' email feel like?", type: "tabs", options: ["Professional & Formal", "Friendly & High-Energy"] }
    ],
    saas: [
      { id: 8, title: "The Magic Button", description: "What is the core technical function of your software tool?", type: "textarea", placeholder: "Example: It calculates ROI; It manages a database..." },
      { id: 9, title: "The Revenue Model", description: "Is this a free value-add tool for your brand, or a paid subscription (SaaS)?", type: "tabs", options: ["Free Value-Add Tool", "Paid Subscription (SaaS)"] },
      { id: 10, title: "User Hierarchy", description: "Will there be different login levels?", type: "tags", options: ["Single Tier", "Admin vs Member", "Client vs Freelancer"] },
      { id: 11, title: "The 2-Minute Win", description: "What is the one thing a user should achieve within 2 minutes of logging in?", type: "input" },
      { id: 12, title: "Device Priority", description: "Will your users be using this primarily on Mobile or Desktop?", type: "tabs", options: ["Mobile phones on the go", "Desktop at their desk", "Unified setup"] },
      { id: 13, title: "The Data Bridge", description: "Does this app need to 'talk' to other tools like Google Sheets or Slack?", type: "textarea", placeholder: "Describe any integrations needed (Zapier, CRMs...)" }
    ]
  };

  const getQuestions = () => {
    if (IS_UPGRADE) return UPGRADE_QUESTIONS;
    const spec = FOUNDATION_SPECIFIC_MAP[foundation as string] || [];
    const specWithIds = spec.map((q, i) => ({
      ...q,
      id: STANDARD_QUESTIONS.length + 1 + i,
      label: `Question ${(STANDARD_QUESTIONS.length + 1 + i).toString().padStart(2, '0')}`
    }));
    return [...STANDARD_QUESTIONS, ...specWithIds];
  };

  const QUESTIONS = getQuestions();

  const handleSelect = (qId: number, value: any) => {
    setAnswers((prev: any) => ({ ...prev, [qId]: value }));
    const optionsWithSingleSelect = ["cards", "tabs", "toggle", "tags"];
    if (optionsWithSingleSelect.includes(QUESTIONS[step].type)) {
      if (step < QUESTIONS.length - 1) {
          setTimeout(() => {
              setStep((prev: any) => prev + 1);
              const nextEl = document.getElementById(`question-${step + 2}`);
              if (nextEl) nextEl.scrollIntoView({ behavior: "smooth", block: "center" });
          }, 400);
      } else {
          setTimeout(() => {
              handlesSubmit();
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
                        <button onClick={() => { setStep(idx + 1); const nextEl = document.getElementById(`question-${idx + 2}`); if (nextEl) nextEl.scrollIntoView({ behavior: "smooth", block: "center" }); }} className="px-3 py-1.5 bg-emerald-400 rounded-lg text-black font-space font-black text-[10px] uppercase cursor-pointer hover:bg-emerald-300">Next</button>
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
                                const nextEl = document.getElementById(`question-${idx + 2}`);
                                if (nextEl) nextEl.scrollIntoView({ behavior: "smooth", block: "center" });
                              }
                            }
                          }}
                          className="w-full text-center bg-transparent border-b-2 border-white/10 focus:border-emerald-400 text-3xl font-black text-white py-2 focus:outline-none focus:ring-0 placeholder:text-white/10"
                        />
                        {answers[q.id] && (
                          <button
                            onClick={idx === QUESTIONS.length - 1 ? handlesSubmit : () => { setStep(idx + 1); const nextEl = document.getElementById(`question-${idx + 2}`); if (nextEl) nextEl.scrollIntoView({ behavior: "smooth", block: "center" }); }}
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
                                const nextEl = document.getElementById(`question-${idx + 2}`);
                                if (nextEl) nextEl.scrollIntoView({ behavior: "smooth", block: "center" });
                              }
                            }
                          }}
                          className="w-full text-center bg-transparent border-b-2 border-white/10 focus:border-emerald-400 text-xl font-bold text-white py-2 focus:outline-none focus:ring-0 placeholder:text-white/10 resize-none h-24"
                        />
                        {answers[q.id] && (
                          <button
                            onClick={idx === QUESTIONS.length - 1 ? handlesSubmit : () => { setStep(idx + 1); const nextEl = document.getElementById(`question-${idx + 2}`); if (nextEl) nextEl.scrollIntoView({ behavior: "smooth", block: "center" }); }}
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
                {isAnalyzing ? "Generating..." : "Generate My Blueprint"}
              </m.button>
            )}
          </m.div>
      </AnimatePresence>
    </div>
  );
}
