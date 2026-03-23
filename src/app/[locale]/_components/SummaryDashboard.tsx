"use client";

import { m, AnimatePresence } from "framer-motion";
import { Edit2, Layout, Check, LayoutDashboard, ArrowRight } from "lucide-react";
import { MODULES, FOUNDATIONS, type ServiceItem } from "@/constants/pricing";
import { useState, useEffect, useMemo } from "react";
import { buildDiscoveryQuestions } from "@/lib/discovery/buildDiscoveryQuestions";
import { DISCOVERY_QUESTION_LABELS } from "@/lib/discovery/discoveryQuestionLabels";

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
  const activeFoundation = FOUNDATIONS.find((f) => f.id === foundation);
  const activeModules = (selectedModules || [])
    .map((id: string) => MODULES.find((m) => m.id === id))
    .filter(Boolean) as ServiceItem[];

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
  const [lead, setLead] = useState({ name: "", company: "", email: "" });

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
    setVipModalOpen(true);
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
        }),
      });
      const json = (await httpRes.json()) as { success?: boolean; error?: string };

      if (!httpRes.ok || !json.success) {
        throw new Error(json.error || `Request failed (${httpRes.status})`);
      }
      alert("✅ PDF dossier request sent — we’ll email you at the address you provided.");
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
    <div className="w-full max-w-5xl mx-auto py-10 flex flex-col gap-8">
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Box 1 */}
              <div className="glass-card border border-white/5 bg-white/[0.02] backdrop-blur-xl p-5 rounded-2xl flex flex-col gap-3 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent opacity-50" />
                <div className="flex justify-between items-center border-b border-white/5 pb-2 z-10">
                  <span className="text-xs font-black font-space text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    01. Infrastructure
                  </span>
                  <button
                    type="button"
                    onClick={() => handleEdit(1)}
                    className="text-[10px] text-slate-500 hover:text-emerald-400 flex items-center gap-0.5 font-bold transition-all"
                  >
                    <Edit2 className="h-2.5 w-2.5" /> [Edit]
                  </button>
                </div>
                <div className="space-y-2.5 z-10 flex-1 flex flex-col justify-center">
                  {activeFoundation && (
                    <div className="flex items-center gap-2 text-sm font-bold text-white bg-white/5 p-2 rounded-xl border border-white/5">
                      <Layout className="h-4 w-4 text-emerald-400" />
                      {activeFoundation.name}
                    </div>
                  )}
                  {activeModules.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {activeModules.map((m) => (
                        <span
                          key={m.id}
                          className="text-[9px] bg-emerald-500/5 border border-emerald-500/10 px-2 py-1 rounded-md text-emerald-300 font-black font-space"
                        >
                          {m.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Box 2 */}
              <div className="glass-card border border-white/5 bg-white/[0.02] backdrop-blur-xl p-5 rounded-2xl flex flex-col gap-3 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent opacity-50" />
                <div className="flex justify-between items-center border-b border-white/5 pb-2 z-10">
                  <span className="text-xs font-black font-space text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    02. Visual Identity
                  </span>
                  <button
                    type="button"
                    onClick={() => handleEdit(4, 0)}
                    className="text-[10px] text-slate-500 hover:text-emerald-400 flex items-center gap-0.5 font-bold transition-all"
                  >
                    <Edit2 className="h-2.5 w-2.5" /> [Edit]
                  </button>
                </div>
                <div className="space-y-3 z-10 flex-1 flex flex-col justify-center">
                  {hasAnswer(answers["design_style"]) && (
                    <div className="text-xs text-slate-400 flex justify-between items-center">
                      <span>Style:</span>
                      <span className="text-white font-black font-space uppercase bg-emerald-400/10 px-1.5 py-0.5 rounded text-[10px] text-emerald-300">
                        {String(answers["design_style"])}
                      </span>
                    </div>
                  )}
                  {Array.isArray(colorPalette) && colorPalette.length > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400">Palette:</span>
                      <div className="flex -space-x-1 h-5 rounded-lg overflow-hidden border border-white/10 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                        {(colorPalette as string[]).map((c: string, i: number) => (
                          <div
                            key={i}
                            className="h-full w-5 first:rounded-l-md last:rounded-r-md"
                            style={{ backgroundColor: c }}
                            title={c}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  {hasAnswer(answers["typography"]) && (
                    <div className="text-xs text-slate-400 flex justify-between items-center">
                      <span>Font Anchor:</span>
                      <span className="text-white font-bold">{String(answers["typography"])}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Box 3 */}
              <div className="glass-card border border-white/5 bg-white/[0.02] backdrop-blur-xl p-5 rounded-2xl flex flex-col gap-3 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent opacity-50" />
                <div className="flex justify-between items-center border-b border-white/5 pb-2 z-10">
                  <span className="text-xs font-black font-space text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    03. Brand Strategy
                  </span>
                  <button
                    type="button"
                    onClick={() => handleEdit(4, 4)}
                    className="text-[10px] text-slate-500 hover:text-emerald-400 flex items-center gap-0.5 font-bold transition-all"
                  >
                    <Edit2 className="h-2.5 w-2.5" /> [Edit]
                  </button>
                </div>
                <div className="space-y-3 z-10 flex-1 flex flex-col justify-center">
                  {hasAnswer(answers["pitch"]) && (
                    <p className="text-xs text-slate-300 italic font-medium leading-relaxed bg-white/5 p-2 rounded-xl border border-white/5">
                      &quot;{String(answers["pitch"])}&quot;
                    </p>
                  )}
                  <div className="flex flex-wrap gap-1">
                    {hasAnswer(answers["north_star"]) && (
                      <span className="text-[9px] bg-emerald-500/5 border border-emerald-500/10 text-emerald-300 px-1.5 py-0.5 rounded-md font-black font-space">
                        🎯 {String(answers["north_star"])}
                      </span>
                    )}
                    {hasAnswer(answers["emotional_hook"]) && (
                      <span className="text-[9px] bg-emerald-500/5 border border-emerald-500/10 text-emerald-300 px-1.5 py-0.5 rounded-md font-black font-space">
                        Hook: {String(answers["emotional_hook"])}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card border border-white/5 bg-white/[0.02] p-5 rounded-2xl space-y-3 w-full">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-xs font-black font-space text-slate-400 uppercase tracking-wider">
                  04. Deep-Dive Strategy Specifications
                </span>
                <button
                  type="button"
                  onClick={() => handleEdit(4, 7)}
                  className="text-[10px] text-slate-500 hover:text-emerald-400 flex items-center gap-0.5 font-bold transition-all"
                >
                  <Edit2 className="h-2.5 w-2.5" /> [Edit]
                </button>
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
                        className="text-xs space-y-1 bg-white/[0.02] p-3 rounded-xl border border-white/5 flex flex-col"
                      >
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

            <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-2 mt-4">
              <button
                type="button"
                onClick={openVipCheckIn}
                className="px-6 py-2.5 bg-emerald-400 text-black font-space font-black text-sm uppercase rounded-xl shadow-[0_10px_25px_rgba(16,185,129,0.2)] hover:bg-emerald-300 hover:scale-[1.02] transition-all flex items-center gap-1.5 group cursor-pointer"
              >
                Submit for Architectural Review
                <ArrowRight className="h-4 w-4 stroke-[3] group-hover:translate-x-1 transition-transform" />
              </button>
              {submitError && (
                <p className="text-[10px] text-red-400 font-bold font-space bg-red-400/10 px-2 py-0.5 rounded border border-red-400/20">
                  {submitError}
                </p>
              )}
            </m.div>
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
            </div>

            <div className="grid grid-cols-1 gap-4 w-full">
              {/* Box 1: Whatsapp */}
              <div className="glass-card border border-emerald-500/20 bg-emerald-500/[0.03] p-6 rounded-2xl flex flex-col gap-3 relative overflow-hidden group">
                <div className="absolute inset-x-0 bottom-0 top-[20%] bg-gradient-to-t from-emerald-500/10 to-transparent pointer-events-none" />
                <div>
                  <span className="text-[9px] font-black font-space text-emerald-400 uppercase tracking-wider">
                    🏛️ DIRECT HANDOVER
                  </span>
                  <p className="text-sm font-bold text-white mt-0.5">Instant WhatsApp Broadcast</p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Claim your seat in the direct intake loop with our Lead Builder right now.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const msg = `Hi Kvali! This is ${lead.name.trim()} from ${lead.company.trim()}. I just finished my audit (ID: ${blueprintId}). Let's talk about my project!`;
                    window.open(
                      `https://wa.me/${WHATSAPP_INTAKE}?text=${encodeURIComponent(msg)}`,
                      "_blank"
                    );
                  }}
                  className="w-full mt-2 py-3 bg-emerald-400 text-black font-space font-black text-xs uppercase rounded-xl flex items-center justify-center gap-2 hover:bg-emerald-300 transition-all shadow-[0_5px_15px_rgba(16,185,129,0.3)] hover:scale-[1.02] active:scale-95 group"
                >
                  <Smartphone className="h-3.5 w-3.5" />
                  Open WhatsApp
                </button>
              </div>

              {/* Email only — name & company were captured at VIP check-in */}
              <div className="glass-card border border-white/5 bg-white/[0.02] p-6 rounded-2xl flex flex-col gap-4 relative overflow-hidden">
                <div>
                  <span className="text-[9px] font-black font-space text-slate-400 uppercase tracking-wider">
                    📄 FULL PDF REPORT
                  </span>
                  <p className="text-sm font-bold text-white mt-0.5">Request your dossier by email</p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    We&apos;ll send the complete architecture PDF to the address below.
                  </p>
                </div>

                <form onSubmit={handleLeadSubmit} className="space-y-3">
                  <div className="relative w-full">
                    <Mail className="absolute left-3 top-3.5 h-3.5 w-3.5 text-slate-500" />
                    <input
                      type="email"
                      required
                      placeholder="Professional email for PDF delivery"
                      value={lead.email}
                      onChange={(e) => setLead({ ...lead, email: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-3 text-xs text-white focus:outline-none focus:border-emerald-400"
                    />
                  </div>

                  {submitError && (
                    <p className="text-[10px] text-red-400 font-bold">{submitError}</p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 bg-white/5 border border-white/10 rounded-xl text-white font-space font-black text-xs uppercase hover:bg-white/10 transition-all flex items-center justify-center gap-1.5"
                  >
                    {isSubmitting ? "Sending…" : "Request PDF dossier"}
                  </button>
                </form>
              </div>
            </div>
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

              <span className="text-[10px] font-black text-slate-500 font-space tracking-tight">
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
