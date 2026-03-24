"use client";

import { m, AnimatePresence } from "framer-motion";
import { Edit2, Layout, Check, LayoutDashboard, ArrowRight, CheckCircle2, Shield, Scale, TrendingUp, Zap, Cpu, Palette, Settings } from "lucide-react";
import { MODULES, FOUNDATIONS, SHIELD_TIERS, type ServiceItem } from "@/constants/pricing";
import { useState, useEffect, useMemo } from "react";
import { buildDiscoveryQuestions } from "@/lib/discovery/buildDiscoveryQuestions";
import { DISCOVERY_QUESTION_LABELS } from "@/lib/discovery/discoveryQuestionLabels";
import { useConfigurator } from "@/hooks/useConfigurator";

function hasAnswer(val: unknown): boolean {
  if (val === undefined || val === null) return false;
  if (typeof val === "string") return val.trim().length > 0;
  if (Array.isArray(val)) return val.length > 0;
  return true;
}

function truncateDisplay(s: string, max: number): string {
  const t = s.trim();
  if (!t) return "";
  return t.length <= max ? t : `${t.slice(0, max)}…`;
}

/** Matches FoundationGrid / primary intake line */
const WHATSAPP_INTAKE = "995591039019";

import { Smartphone, Mail, Building, User, X } from "lucide-react";
import { getOrCreateBlueprintId } from "@/lib/blueprint/clientBlueprintId";

export type SummaryDashboardProps = {
  foundation: string | null;
  selectedModules: string[];
  answers: Record<string, unknown>;
  goToStep: (s: 1 | 2 | 3 | 4 | 5) => boolean;
  setDiscoveryStep: (n: number) => void;
  setIsEditing: (v: boolean) => void;
  moduleQuantities: Record<string, number>;
  shieldTier: number;
  oneTimeTotal: number;
  monthlyTotal: number;
};

export default function SummaryDashboard({
  foundation,
  selectedModules,
  answers,
  goToStep,
  setDiscoveryStep,
  setIsEditing,
  moduleQuantities,
  shieldTier,
  oneTimeTotal,
  monthlyTotal,
}: SummaryDashboardProps) {
  const config = useConfigurator();
  const [isWhatsAppClicked, setIsWhatsAppClicked] = useState(false);
  const activeFoundation = FOUNDATIONS.find((f) => f.id === foundation);
  const activeModules = (selectedModules || [])
    .map((id: string) => MODULES.find((m) => m.id === id))
    .filter(Boolean) as ServiceItem[];

  const foundationSubHeaders: Record<string, string> = {
    landing: "1 Sales Node | Conversion Architecture",
    cms: "4 Core Nodes | Visual Content Dashboard",
    ecomm: "4 Nodes Core | E-Commerce Tunnel",
    saas: "Bespoke Logic Frame | Infinite Scale",
    upgrade: "Technical Diagnosis | Legacy Refactor"
  };

  const categoryIcons: Record<string, any> = {
    "Georgian Advantage": Scale,
    "Marketing": TrendingUp,
    "Business Engines": Zap,
    "AI & Automation": Cpu,
    "Creative": Palette,
    "Operational": Settings
  };

  const getCleanScope = (item: string) => {
    if (!item) return "";
    if (item.includes('|')) return item.split('|')[1].trim();
    return item;
  };

  const IS_UPGRADE = foundation === "upgrade";
  const validKeys = useMemo(
    () =>
      buildDiscoveryQuestions({
        foundation,
        selectedModules: selectedModules || [],
        isUpgrade: IS_UPGRADE,
      }).map((q) => q.id),
    [foundation, selectedModules, IS_UPGRADE]
  );

  const [stages, setStage] = useState<"review" | "analyzing" | "handover">("review");
  const [progress, setProgress] = useState(0);
  const [loadingIndex, setLoadingIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [blueprintId, setBlueprintId] = useState<string | null>(null);
  const [vipModalOpen, setVipModalOpen] = useState(false);
  const [vipError, setVipError] = useState<string | null>(null);

  /** Name + company captured in VIP modal before analyze; email on handover */
  const [lead, setLead] = useState<{ name: string; company: string; email: string; preference: string }>(() => {
    if (typeof window === "undefined") return { name: "", company: "", email: "", preference: "whatsapp" };
    try {
      const saved = localStorage.getItem("genezisi_lead_node");
      if (saved) return JSON.parse(saved);
    } catch {}
    return { name: "", company: "", email: "", preference: "whatsapp" };
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("genezisi_lead_node", JSON.stringify(lead));
    }
  }, [lead]);

  const [emailRequested, setEmailRequested] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [priority, setPriority] = useState<'whatsapp' | 'email' | null>(null);
  const [isSuccessDispatched, setIsSuccessDispatched] = useState(false);

  const handleEdit = (stepNum: 1 | 2 | 3 | 4 | 5, questionIndex?: number) => {
    goToStep(stepNum);
    setIsEditing(true);
    if (questionIndex !== undefined) {
      setDiscoveryStep(questionIndex);
    }
  };

  const palette = answers["color_palette"];
  const colors = Array.isArray(palette)
    ? (palette as string[])
    : (["#10b981"] as string[]);
  const dominantColor = colors[0] || "#10b981";

  const loadingPhrases = useMemo(() => {
    const companyShort = truncateDisplay(lead.company, 40) || "your company";
    const nameShort = truncateDisplay(lead.name, 36) || "you";
    return [
      `Securing nodes for ${companyShort}...`,
      `Linking blueprint to ${nameShort}...`,
      `Analyzing ${activeFoundation?.name || "Foundation"} infrastructure nodes...`,
      `Validating ${dominantColor} palette against conversion psychology...`,
      `Calculating server edge distribution for local nodes...`,
      `Finalizing your architecture brief...`,
    ];
  }, [activeFoundation?.name, dominantColor, lead.company, lead.name]);

  useEffect(() => {
    if (stages !== "analyzing") return;

    setProgress(0);
    setLoadingIndex(0);

    const phraseLen = loadingPhrases.length;
    const textInterval = setInterval(() => {
      setLoadingIndex((prev) => (prev + 1) % phraseLen);
    }, 800);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(textInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => {
      clearInterval(textInterval);
      clearInterval(progressInterval);
    };
  }, [stages, loadingPhrases]);

  useEffect(() => {
    if (!vipModalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setVipModalOpen(false);
        setVipError(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [vipModalOpen]);

  const openVipCheckIn = () => {
    setSubmitError(null);
    setVipError(null);
    if (lead.name.trim() && lead.company.trim()) {
      void secureBlueprintAndAnalyze();
    } else {
      setVipModalOpen(true);
    }
  };

  const secureBlueprintAndAnalyze = async () => {
    const name = lead.name.trim();
    const company = lead.company.trim();
    if (!name || !company) {
      setVipError("Please enter your full name and company name.");
      return;
    }
    setVipError(null);
    setVipModalOpen(false);
    setStage("analyzing");
    setSubmitError(null);

    try {
      const id = getOrCreateBlueprintId();

      await new Promise((resolve) => setTimeout(resolve, 1500));
      setBlueprintId(id);
      setStage("handover");
    } catch (error: unknown) {
      console.error("BLUEPRINT HANDOVER FAILURE:", error);
      const message =
        error instanceof Error ? error.message : "Connection Failed - Try Again";
      setSubmitError(message);
      setStage("review");
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blueprintId) return;
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const httpRes = await fetch("/api/blueprint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: lead.email.trim(),
          answers,
          foundation,
          selectedModules,
          moduleQuantities,
          shieldTier,
          oneTimeTotal,
          monthlyTotal,
          blueprintId,
          leadName: lead.name.trim(),
          leadCompany: lead.company.trim(),
          preference: priority || lead.preference,
          skipAdmin: isSuccessDispatched,
        }),
      });
      const json = (await httpRes.json()) as { success?: boolean; error?: string };

      if (!httpRes.ok || !json.success) {
        throw new Error(json.error || `Request failed (${httpRes.status})`);
      }
      if (isSuccessDispatched) {
        setIsEmailSent(true);
      } else {
        setIsSuccessDispatched(true);
      }
    } catch (err: unknown) {
      setSubmitError(
        err instanceof Error ? err.message : "Could not send email. Try again or use WhatsApp."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const colorPalette = answers["color_palette"];

  return (
    <div className="w-full max-w-[1440px] px-8 mx-auto py-10 flex flex-col gap-8">
      <AnimatePresence mode="wait">
        {stages === "review" && (
          <m.div
            key="audit-grid"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col gap-8 w-full"
          >
            <div className="text-center">
              <h1 className="text-3xl font-space font-black text-white flex items-center justify-center gap-2">
                <LayoutDashboard className="h-7 w-7 text-emerald-400" />
                THE ARCHITECT&apos;S AUDIT
              </h1>
              <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
                Review your digital infrastructure blueprints before deployment indexation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Box 1 */}
              <div className="glass-card border border-white/5 bg-white/[0.02] backdrop-blur-xl p-8 rounded-2xl flex flex-col gap-4 relative overflow-hidden group h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent opacity-50" />
                <div className="flex justify-between items-center border-b border-white/5 pb-2 z-10">
                  <span className="text-xs font-black font-space text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    01. Infrastructure Summary
                  </span>
                </div>
                <div className="space-y-2.5 z-10 flex-1 flex flex-col justify-center">
                  {activeFoundation && (
                    <div className="flex items-center gap-2 bg-white/5 p-2 rounded-xl border border-white/5">
                      <div className="flex items-center gap-2 text-sm font-bold text-white">
                        <Layout className="h-4 w-4 text-emerald-400" />
                        {activeFoundation.name}
                      </div>
                      {shieldTier !== undefined && shieldTier !== null && (
                        <div 
                          onClick={() => handleEdit(3)}
                          className="flex items-center gap-1.5 text-xs font-bold text-emerald-300 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)] shadow-[0_0_30px_-15px_rgba(16,185,129,0.2)] cursor-pointer hover:bg-emerald-500/20 transition-all hover:scale-105 group/shield"
                        >
                          <Shield className="h-3 w-3" />
                          <span>{SHIELD_TIERS.find((s) => s.id === shieldTier)?.name || "Standard Operations"}</span>
                          <Edit2 className="h-2.5 w-2.5 opacity-0 group-hover/shield:opacity-100 transition-opacity ml-0.5" />
                        </div>
                      )}
                    </div>
                  )}
                  {activeModules.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {activeModules.map((m) => (
                        <span
                          key={m.id}
                          onClick={() => handleEdit(2)}
                          className="text-xs bg-emerald-500/5 border border-emerald-500/10 px-2 py-1 rounded-md text-emerald-300 font-black font-space cursor-pointer hover:bg-emerald-500/15 transition-all hover:scale-105 flex items-center gap-1 group/module"
                        >
                          {m.name}
                          <Edit2 className="h-2 w-2 opacity-0 group-hover/module:opacity-100 transition-opacity" />
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Box 2 */}
              <div className="glass-card border border-white/5 bg-white/[0.02] backdrop-blur-xl p-8 rounded-2xl flex flex-col gap-4 relative overflow-hidden group h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent opacity-50" />
                <div className="flex justify-between items-center border-b border-white/5 pb-2 z-10">
                  <span className="text-xs font-black font-space text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    02. Visual Identity
                  </span>
                  <button
                    type="button"
                    onClick={() => handleEdit(4, 0)}
                    className="text-xs text-slate-500 hover:text-emerald-400 flex items-center gap-0.5 font-bold transition-all"
                  >
                    <Edit2 className="h-2.5 w-2.5" /> [Edit]
                  </button>
                </div>
                <div className="flex-1 flex flex-col justify-center z-10 w-full">
                  <div className="grid grid-cols-3 gap-3 pt-4 text-center">
                  {hasAnswer(answers["design_style"]) && (
                    <div className="flex flex-col items-center bg-white/[0.02] p-3 rounded-xl border border-white/5 h-20 relative group">
                      <span className="text-xs text-slate-500 font-bold font-space uppercase tracking-wider">STYLE</span>
                      <div className="flex-1 flex items-center justify-center w-full">
                        <span className="text-sm font-black text-emerald-300 font-space uppercase leading-none">
                          {String(answers["design_style"])}
                        </span>
                      </div>
                    </div>
                  )}
                  {!!answers["color_palette"] && (
                    <div className="flex flex-col items-center bg-white/[0.02] p-3 rounded-xl border border-white/5 h-20 relative group">
                      <span className="text-xs text-slate-500 font-bold font-space uppercase tracking-wider">PALETTE</span>
                      <div className="flex-1 flex items-center justify-center w-full">
                        <div className="flex items-center -space-x-1 h-4">
                          {Array.isArray(answers["color_palette"]) && (answers["color_palette"] as string[]).map((c: string, i: number) => (
                            <div key={i} className="h-3.5 w-3.5 rounded-full border border-white/10" style={{ backgroundColor: c }} />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  {hasAnswer(answers["typography"]) && (
                    <div className="flex flex-col items-center bg-white/[0.02] p-3 rounded-xl border border-white/5 h-20 relative group">
                      <span className="text-xs text-slate-500 font-bold font-space uppercase tracking-wider">FONT ANCHOR</span>
                      <div className="flex-1 flex items-center justify-center w-full">
                        <span className="text-xs font-black text-white font-space truncate max-w-full leading-none">
                          {String(answers["typography"])}
                        </span>
                      </div>
                    </div>
                  )}
                  </div>
                </div>
              </div>

              {/* Box 3 */}
              <div className="glass-card border border-white/5 bg-white/[0.02] backdrop-blur-xl p-8 rounded-2xl flex flex-col gap-4 relative overflow-hidden group h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent opacity-50" />
                <div className="flex justify-between items-center border-b border-white/5 pb-2 z-10">
                  <span className="text-xs font-black font-space text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    03. Brand Strategy
                  </span>
                  <button
                    type="button"
                    onClick={() => handleEdit(4, 4)}
                    className="text-xs text-slate-500 hover:text-emerald-400 flex items-center gap-0.5 font-bold transition-all"
                  >
                    <Edit2 className="h-2.5 w-2.5" /> [Edit]
                  </button>
                </div>
                <div className="space-y-2.5 z-10 flex-1 flex flex-col justify-center">
                  {hasAnswer(answers["pitch"]) && (
                    <div className="bg-white/[0.03] p-2.5 rounded-xl border border-emerald-500/10 shadow-[0_4px_20px_-10px_rgba(16,185,129,0.2)]">
                      <div className="flex items-center gap-1.5 mb-1">
                        <div className="h-1 w-1 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                        <p className="text-xs text-emerald-400 font-black uppercase tracking-wider font-space">STRATEGIC DIRECTIVE: PITCH</p>
                      </div>
                      <p className="text-xs text-white font-medium italic leading-relaxed pl-2.5 border-l border-emerald-500/20">&quot;{String(answers["pitch"])}&quot;</p>
                    </div>
                  )}
                  {hasAnswer(answers["north_star"]) && (
                    <div className="bg-white/[0.03] p-2.5 rounded-xl border border-emerald-500/10 shadow-[0_4px_20px_-10px_rgba(16,185,129,0.2)]">
                      <div className="flex items-center gap-1.5 mb-1">
                        <div className="h-1 w-1 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                        <p className="text-xs text-emerald-400 font-black uppercase tracking-wider font-space">STRATEGIC DIRECTIVE: TARGET MARKET</p>
                      </div>
                      <p className="text-xs text-emerald-300 font-bold pl-2.5 border-l border-emerald-500/20">{String(answers["north_star"])}</p>
                    </div>
                  )}
                  {hasAnswer(answers["emotional_hook"]) && (
                    <div className="bg-white/[0.03] p-2.5 rounded-xl border border-emerald-500/10 shadow-[0_4px_20px_-10px_rgba(16,185,129,0.2)]">
                      <div className="flex items-center gap-1.5 mb-1">
                        <div className="h-1 w-1 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                        <p className="text-xs text-emerald-400 font-black uppercase tracking-wider font-space">STRATEGIC DIRECTIVE: EMOTIONAL HOOK</p>
                      </div>
                      <p className="text-xs text-white font-bold pl-2.5 border-l border-emerald-500/20">{String(answers["emotional_hook"])}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="glass-card border border-white/5 bg-white/[0.02] p-5 rounded-2xl space-y-3 w-full">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-xs font-black font-space text-slate-400 uppercase tracking-wider">
                  04. Deep-Dive Strategy Specifications
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {Object.keys(answers)
                  .filter(
                    (key) =>
                      validKeys.includes(key) &&
                      ![
                        "design_style",
                        "color_palette",
                        "typography",
                        "pitch",
                        "north_star",
                        "emotional_hook",
                      ].includes(key)
                  )
                  .map((key) => {
                    const qIndex = validKeys.indexOf(key);
                    const val = answers[key];
                    if (val === undefined || val === null) return null;

                    let displayVal = String(val);
                    if (Array.isArray(val)) {
                      displayVal = val.filter((v) => typeof v === "string" && v.trim() !== "").join(", ");
                    } else if (typeof val === "boolean") {
                      displayVal = val ? "Yes" : "No";
                    }

                    if (!displayVal.trim()) return null;

                    return (
                      <div
                        key={key}
                        className="text-xs space-y-1 bg-white/[0.02] p-3 rounded-xl border border-white/5 flex flex-col relative group"
                      >
                        <button
                          type="button"
                          onClick={() => handleEdit(4, qIndex)}
                          className="absolute top-2 right-2 text-slate-500 hover:text-emerald-400 opacity-0 group-hover:opacity-100 flex items-center gap-0.5 font-bold text-[9px] transition-all"
                        >
                          <Edit2 className="h-2.5 w-2.5" /> [Edit]
                        </button>
                        <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider font-space">
                          {DISCOVERY_QUESTION_LABELS[key] || `Specification: ${key}`}
                        </span>
                        <p className="text-white font-medium leading-relaxed break-words">
                          {displayVal}
                        </p>
                      </div>
                    );
                  })}
              </div>
            </div>

            <div className="w-full bg-black/60 backdrop-blur-2xl border border-white/5 p-6 rounded-2xl grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 items-center min-h-[140px]">
              {/* Column 1: Dynamic Manifest */}
              <div className="flex flex-col gap-1.5 md:border-r border-white/5 md:pr-4 h-full justify-center items-center text-center">
                <div className="flex items-center gap-1.5 justify-center">
                  <Layout className="h-4 w-4 text-emerald-400" />
                  <span className="text-xs font-black font-space text-white uppercase tracking-wider">
                    {activeFoundation?.name || "Foundation"}
                  </span>
                </div>

                <ul className="space-y-1.5 mt-1 flex flex-col items-center w-full">
                  {activeFoundation?.scope?.map((item, idx) => (
                    <li key={idx} className="flex justify-center w-full">
                      <div className="flex items-start gap-1.5 text-left max-w-[380px] w-full">
                        <Check className="h-3.5 w-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-slate-300 leading-relaxed break-words">{getCleanScope(item)}</span>
                      </div>
                    </li>
                  ))}
                </ul>

                {activeFoundation?.id === 'ecomm' && (
                  <div className="flex gap-1.5 items-center justify-center mt-2.5">
                    <span className="text-[8px] font-bold text-slate-500 border border-white/5 bg-white/5 px-1 py-0.5 rounded leading-none">TBC/BOG INTEGRATED</span>
                    <span className="text-[8px] font-bold text-slate-500 border border-white/5 bg-white/5 px-1 py-0.5 rounded leading-none">RS.GE COMPLIANT</span>
                  </div>
                )}
              </div>

              {/* Column 2: Extensional Upgrades */}
              <div className="flex flex-col gap-1.5 md:border-r border-white/5 md:pr-4 h-full justify-center items-center text-center">
                <div className="flex items-center gap-1.5 justify-center">
                  <Shield className="h-4 w-4 text-emerald-400" />
                  <span className="text-xs font-black font-space text-white uppercase tracking-wider">
                    MODULAR EXTENSION NODES
                  </span>
                </div>
                <div className="flex flex-wrap gap-1 mt-1 justify-center">
                  {activeModules.map((m) => {
                    const mItem = m as any;
                    const IconComponent = mItem.category && categoryIcons[mItem.category] ? categoryIcons[mItem.category] : Shield;
                    return (
                      <span key={m.id} className="flex items-center gap-1 text-xs bg-emerald-500/5 border border-emerald-500/10 px-1.5 py-0.5 rounded text-emerald-300 font-bold">
                        <IconComponent className="h-3 w-3 flex-shrink-0" />
                        <span>{m.name}</span>
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Column 3: Secure Checkout & CTA */}
              <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
                <div>
                  <div className="bg-emerald-500/5 text-emerald-400 border border-emerald-400/20 px-3 py-1 rounded-full text-xs font-black shadow-[0_0_15px_rgba(16,185,129,0.1)] flex items-center justify-center gap-1.5 animate-pulse mx-auto mb-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    <span>READY FOR INDEXATION</span>
                  </div>
                  <p className="text-xl font-black font-mono text-emerald-400">
                    {oneTimeTotal.toLocaleString()} ₾ One-Time
                  </p>
                  {monthlyTotal > 0 && (
                    <p className="text-xs font-bold font-mono text-emerald-300">
                      +{monthlyTotal.toLocaleString()} ₾/mo Recurring
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1 text-xs font-space font-black uppercase text-center w-full">
                  <div className="flex justify-center w-full">
                    <div className="flex items-start gap-1.5 text-left max-w-[380px] w-full text-emerald-400">
                      <Check className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" />
                      <span className="leading-tight">FULL-CYCLE QUALITY ASSURANCE & SYSTEM FORENSICS</span>
                    </div>
                  </div>
                  <div className="flex justify-center w-full">
                    <div className="flex items-start gap-1.5 text-left max-w-[380px] w-full text-emerald-400">
                      <Check className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" />
                      <span className="leading-tight">ELITE PROJECT STEWARDSHIP</span>
                    </div>
                  </div>
                  <div className="flex justify-center w-full">
                    <div className="flex items-start gap-1.5 text-left max-w-[380px] w-full text-slate-400">
                      <Check className="h-3.5 w-3.5 flex-shrink-0 mt-0.5 text-emerald-400" />
                      <span className="leading-tight">100% SOURCE CODE & IP TRANSFER</span>
                    </div>
                  </div>
                  <div className="flex justify-center w-full">
                    <div className="flex items-start gap-1.5 text-left max-w-[380px] w-full text-slate-400">
                      <Check className="h-3.5 w-3.5 flex-shrink-0 mt-0.5 text-emerald-400" />
                      <span className="leading-tight">90-DAY ENGINEERING WARRANTY</span>
                    </div>
                  </div>
                </div>

                <div className="w-full flex flex-col items-center gap-1 mt-1">
                  <button
                    type="button"
                    onClick={openVipCheckIn}
                    className="w-full md:w-auto px-5 py-2 bg-emerald-400 text-black font-space font-black text-xs uppercase rounded-xl shadow-[0_5px_15px_rgba(16,185,129,0.3)] hover:bg-emerald-300 transition-all flex items-center justify-center gap-1.5 group cursor-pointer"
                  >
                    Submit Review <ArrowRight className="h-3.5 w-3.5 stroke-[3] group-hover:translate-x-1 transition-transform" />
                  </button>
                  {submitError && (
                    <p className="text-xs text-red-400 font-bold font-space bg-red-400/10 px-1.5 py-0.5 rounded border border-red-400/20">
                      {submitError}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </m.div>
        )}

        {stages === "handover" && (
          <m.div
            key="handover-ui"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5, type: "spring", bounce: 0.1 }}
            className="flex flex-col items-center gap-6 w-full max-w-xl mx-auto py-10"
          >
            <div className="text-center space-y-1">
              <div className="h-10 w-10 rounded-full bg-emerald-400 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.4)] mx-auto mb-2">
                <Check className="h-5 w-5 text-black stroke-[3]" />
              </div>
              <h2 className="text-lg font-black font-space text-white uppercase tracking-widest drop-shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                BLUEPRINT #{blueprintId} SECURED
              </h2>
              <p className="text-[11px] text-slate-400 font-medium">
                Your high-density architecture frame is compiled in the deployment matrix.
              </p>
              <div className="flex flex-col items-center gap-1.5 mt-2">
                <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider bg-emerald-400/10 px-3 py-0.5 rounded-full border border-emerald-400/20 inline-block">
                  Client: {lead.name} | {lead.company}
                </div>
              </div>
            </div>

            {isSuccessDispatched ? (
              <m.div 
                key="success" 
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }} 
                exit={{ opacity: 0, scale: 0.95 }} 
                className="p-8 border border-emerald-500/30 bg-emerald-500/5 rounded-2xl text-center shadow-[0_0_50px_-12px_rgba(16,185,129,0.15)] w-full max-w-md mx-auto"
              >
                <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight font-space">BROADCAST DISPATCHED</h3>
                <p className="text-slate-400 text-sm mb-6 max-w-[280px] mx-auto">
                  {priority === 'whatsapp' 
                    ? 'Your configuration has been indexed and sent to the vault. I am waiting for you on WhatsApp.' 
                    : 'Your configuration has been indexed. A formal Discovery Dossier has been securely dispatched to your email. The Architect will follow up shortly.'}
                </p>

                {priority === 'whatsapp' && (
                  <div className="mb-6 border-t border-white/5 pt-4 w-full text-left max-w-[280px] mx-auto">
                    <AnimatePresence mode="wait">
                      {!isEmailSent ? (
                        <m.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
                          <label className="text-[9px] uppercase font-black text-slate-400 font-space tracking-wider">
                            Would you also like a formal copy sent to your email?
                          </label>
                          <form onSubmit={handleLeadSubmit} className="flex gap-2">
                            <input 
                              type="email" 
                              required 
                              placeholder="Dispatch address" 
                              value={lead.email} 
                              onChange={(e) => setLead({ ...lead, email: e.target.value })} 
                              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-2 py-1.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-400" 
                            />
                            <button 
                              type="submit" 
                              disabled={isSubmitting} 
                              className="px-3 py-1.5 bg-emerald-400 text-black font-space font-black text-xs uppercase rounded-lg hover:bg-emerald-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {isSubmitting ? "..." : "Send"}
                            </button>
                          </form>
                        </m.div>
                      ) : (
                        <m.div key="text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-[10px] text-emerald-400 font-bold bg-emerald-500/5 p-2 rounded-lg border border-emerald-500/20">
                          A copy of your audit summary has been sent to your email.
                        </m.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
                <div className="flex flex-col gap-3.5 max-w-[220px] mx-auto mt-4 pt-4 border-t border-white/5">
                {priority === 'email' && (
                  <button 
                    type="button"
                    onClick={() => { 
                      setIsSuccessDispatched(false); 
                      setPriority('whatsapp'); 
                    }} 
                    className="flex items-center justify-center gap-1.5 text-[11px] text-emerald-400 font-bold uppercase tracking-wider hover:text-emerald-300 transition-colors cursor-pointer hover:underline underline-offset-4 mx-auto"
                  >
                    <Smartphone className="h-3.5 w-3.5 stroke-[2.5]" /> Switch to WhatsApp
                  </button>
                )}
                  <button 
                    type="button"
                    onClick={() => { setIsSuccessDispatched(false); setIsEmailSent(false); setStage("review"); }} 
                    className="text-[10px] text-slate-500 hover:text-slate-400 uppercase tracking-widest transition-colors font-space font-bold cursor-pointer"
                  >
                    Modify Configuration
                  </button>
                </div>
              </m.div>
            ) : (
              <>
                {priority === null ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                    <button 
                      type="button"
                      onClick={() => { setPriority('whatsapp'); setLead(prev => ({ ...prev, preference: 'whatsapp' })); }} 
                      className="glass-card p-6 border border-emerald-500/20 hover:border-emerald-400 bg-emerald-500/[0.02] text-center rounded-2xl transition-all cursor-pointer group"
                    >
                      <Smartphone className="h-6 w-6 text-emerald-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                      <h3 className="text-sm font-bold text-white font-space">Prioritize WhatsApp Chat</h3>
                      <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">Direct intake to an Architect node.</p>
                    </button>

                    <button 
                      type="button"
                      onClick={() => { setPriority('email'); setLead(prev => ({ ...prev, preference: 'email' })); }} 
                      className="glass-card p-6 border border-white/5 hover:border-white/10 bg-white/[0.02] text-center rounded-2xl transition-all cursor-pointer group"
                    >
                      <Mail className="h-6 w-6 text-slate-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                      <h3 className="text-sm font-bold text-white font-space">Prioritize Email Communication</h3>
                      <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">Request formal Discovery Dossiers.</p>
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4 w-full">
                    {priority === 'whatsapp' && (
                      <div className="glass-card border border-emerald-500/20 bg-emerald-500/[0.03] p-6 rounded-2xl flex flex-col gap-3 relative overflow-hidden group">
                        <AnimatePresence mode="wait">
                          <m.div key="prompt" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col gap-3">
                            <div className="absolute inset-x-0 bottom-0 top-[20%] bg-gradient-to-t from-emerald-500/10 to-transparent pointer-events-none" />
                            <div>
                              <span className="text-[9px] font-black font-space text-emerald-400 uppercase tracking-wider">🏛️ DIRECT HANDOVER</span>
                              <p className="text-sm font-bold text-white mt-0.5">Instant WhatsApp Broadcast</p>
                              <p className="text-[11px] text-slate-400 mt-1">Claim your seat in the direct intake loop with our Lead Builder right now.</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                const nameStr = lead.name.trim() || "Candidate";
                                const companyStr = lead.company.trim() || "my project";
                                const msg = emailRequested && lead.email.trim()
                                  ? `Hey Genezisi, I'm ${nameStr} from ${companyStr}. I just secured my blueprint and requested the dossier via email. Let's discuss the logic here.`
                                  : `Hey Genezisi, I'm ${nameStr} from ${companyStr}. I just finished my configuration. Let's skip the paperwork and discuss the North Star here.`;
                                window.open(`https://wa.me/${WHATSAPP_INTAKE}?text=${encodeURIComponent(msg)}`, "_blank");
                                setIsSuccessDispatched(true); // Auto route to grand success view layout securely setup index triggers setup concisely accurately
                                fetch("/api/blueprint", {
                                  method: "POST",
                                  headers: { "Content-Type": "application/json" },
                                  body: JSON.stringify({
                                    email: "", answers, foundation, selectedModules, moduleQuantities, shieldTier, oneTimeTotal, monthlyTotal, blueprintId,
                                    leadName: lead.name.trim(), leadCompany: lead.company.trim(), source: "whatsapp intake", preference: "whatsapp"
                                  }),
                                }).catch((err) => console.error("WhatsApp dispatch fail:", err));
                              }}
                              className="w-full mt-2 py-3 bg-emerald-400 text-black font-space font-black text-xs uppercase rounded-xl flex items-center justify-center gap-2 hover:bg-emerald-300 transition-all shadow-[0_5px_15px_rgba(16,185,129,0.3)] hover:scale-[1.02] active:scale-95 group index-trigger"
                            >
                              <Smartphone className="h-3.5 w-3.5" /> Open WhatsApp
                            </button>
                          </m.div>
                        </AnimatePresence>
                      </div>
                    )}

                    {(priority === 'email' || (priority === 'whatsapp' && emailRequested)) && (
                      <div className="glass-card border border-white/5 bg-white/[0.02] p-6 rounded-2xl flex flex-col gap-4 relative overflow-hidden">
                        <div className="flex items-center justify-between pb-2 border-b border-white/5">
                          <div>
                            <span className="text-[9px] font-black font-space text-slate-400 uppercase tracking-wider">📄 FULL PDF REPORT</span>
                            <p className="text-sm font-bold text-white mt-0.5">{priority === 'email' ? "Where should the Architect send your Dossier?" : "Discovery Dossier"}</p>
                          </div>
                          {priority === 'whatsapp' && (
                            <label className="flex items-center gap-2 cursor-pointer group">
                              <span className="text-[10px] text-slate-400 group-hover:text-emerald-400 transition-colors font-bold">Would you also like a copy sent to your records?</span>
                              <input type="checkbox" checked={emailRequested} onChange={(e) => setEmailRequested(e.target.checked)} className="accent-emerald-400 h-3.5 w-3.5 rounded border-white/10 bg-white/5" />
                            </label>
                          )}
                        </div>

                        <div className="space-y-3">
                          <p className="text-[11px] text-slate-400">We&apos;ll send the complete architecture PDF to the address below.</p>
                          <form onSubmit={handleLeadSubmit} className="space-y-3">
                            <div className="relative w-full">
                              <Mail className="absolute left-3 top-3.5 h-3.5 w-3.5 text-slate-500" />
                              <input type="email" required placeholder="Professional email for PDF delivery" value={lead.email} onChange={(e) => setLead({ ...lead, email: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-3 text-xs text-white focus:outline-none focus:border-emerald-400" />
                            </div>
                            {submitError && <p className="text-xs text-red-400 font-bold">{submitError}</p>}
                            <button type="submit" disabled={isSubmitting} className="w-full py-2.5 bg-white/5 border border-white/10 rounded-xl text-white font-space font-black text-xs uppercase hover:bg-white/10 transition-all flex items-center justify-center gap-1.5">
                              {isSubmitting ? "Sending…" : "Request PDF dossier"}
                            </button>
                          </form>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </m.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {stages === "analyzing" && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex flex-col items-center justify-center p-6 gap-6"
          >
            <div className="w-full max-w-xs flex flex-col items-center gap-4">
              <m.div
                key={loadingIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-center min-h-[4.5rem] flex flex-col items-center justify-start px-1"
              >
                <span className="text-[9px] font-black font-space text-emerald-400 uppercase tracking-widest bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/20">
                  ARCHITECT AI ACTIVE
                </span>
                <p className="text-xs font-black text-white mt-2 leading-relaxed tracking-wide">
                  {loadingPhrases[loadingIndex]}
                </p>
              </m.div>

              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden border border-white/5 shadow-inner">
                <m.div
                  className="h-full bg-gradient-to-r from-emerald-500 to-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.6)]"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <span className="text-xs font-black text-slate-500 font-space tracking-tight">
                {progress}% CALCULATED
              </span>
            </div>
          </m.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {vipModalOpen && (
          <m.div
            key="vip-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => {
              setVipModalOpen(false);
              setVipError(null);
            }}
          >
            <m.div
              initial={{ opacity: 0, scale: 0.96, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 14 }}
              transition={{ type: "spring", damping: 26, stiffness: 320 }}
              className="w-full max-w-md glass-card border border-emerald-500/20 bg-zinc-950/90 backdrop-blur-xl p-8 rounded-[1.75rem] shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                aria-label="Close"
                onClick={() => {
                  setVipModalOpen(false);
                  setVipError(null);
                }}
                className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors p-1 rounded-lg"
              >
                <X className="h-4 w-4" />
              </button>
              <span className="text-[9px] font-black font-space text-emerald-400 uppercase tracking-[0.2em]">
                VIP check-in
              </span>
              <h3 className="text-xl font-black font-space text-white mt-2 tracking-tight">
                Who are we building for?
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Your blueprint is almost locked. Tell us who you are so we can personalize your handover.
              </p>
              <div className="mt-6 space-y-4">
                <div className="relative">
                  <User className="absolute left-3 top-3 h-3.5 w-3.5 text-slate-500" />
                  <input
                    type="text"
                    autoComplete="name"
                    placeholder="Full name"
                    value={lead.name}
                    onChange={(e) => setLead({ ...lead, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-400"
                  />
                </div>
                <div className="relative">
                  <Building className="absolute left-3 top-3 h-3.5 w-3.5 text-slate-500" />
                  <input
                    type="text"
                    autoComplete="organization"
                    placeholder="Company name"
                    value={lead.company}
                    onChange={(e) => setLead({ ...lead, company: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-400"
                  />
                </div>

              </div>
              {vipError && (
                <p className="mt-3 text-[11px] text-red-400 font-bold font-space">{vipError}</p>
              )}
              <div className="mt-8 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => void secureBlueprintAndAnalyze()}
                  className="w-full py-3.5 bg-emerald-400 text-black font-space font-black text-xs uppercase rounded-xl shadow-[0_10px_30px_rgba(16,185,129,0.25)] hover:bg-emerald-300 transition-all"
                >
                  Secure my blueprint
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setVipModalOpen(false);
                    setVipError(null);
                  }}
                  className="w-full py-2 text-[10px] font-space font-bold text-slate-500 uppercase tracking-wider hover:text-slate-300 transition-colors"
                >
                  Back to audit
                </button>
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
