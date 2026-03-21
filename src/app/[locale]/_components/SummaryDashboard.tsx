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

export type SummaryDashboardProps = {
  foundation: string | null;
  selectedModules: string[];
  answers: Record<string, unknown>;
  goToStep: (s: 1 | 2 | 3 | 4 | 5) => void;
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

  const [stages, setStage] = useState<"review" | "analyzing" | "capture" | "success">("review");
  const [progress, setProgress] = useState(0);
  const [loadingIndex, setLoadingIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [email, setEmail] = useState("");

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

  const loadingPhrases = useMemo(
    () => [
      `Analyzing ${activeFoundation?.name || "Foundation"} infrastructure nodes...`,
      `Calculating server edge distribution for local nodes...`,
      `Validating ${dominantColor} palette against conversion psychology...`,
      `Finalizing 0.1% Business Strategy Brief...`,
    ],
    [activeFoundation?.name, dominantColor]
  );

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
          setTimeout(() => setStage("capture"), 400);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    return () => {
      clearInterval(textInterval);
      clearInterval(progressInterval);
    };
  }, [stages, loadingPhrases]);

  const handleConfirm = () => {
    setStage("analyzing");
  };

  const handleLeadSubmit = async () => {
    if (!email) return;
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/blueprint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          answers,
          foundation,
          selectedModules,
          moduleQuantities,
          shieldTier,
          oneTimeTotal,
          monthlyTotal,
        }),
      });
      let message = "Something went wrong. Please try again.";
      try {
        const data = (await res.json()) as { error?: string };
        if (data?.error) message = data.error;
      } catch {
        /* ignore */
      }
      if (!res.ok) {
        setSubmitError(message);
        return;
      }
      setStage("success");
    } catch (e) {
      console.error("Blueprint dispatch error:", e);
      setSubmitError("Network error. Check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const colorPalette = answers["color_palette"];

  return (
    <div className="w-full max-w-5xl mx-auto py-10 flex flex-col gap-8">
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
                  "inspiration",
                ].includes(key)
            )
            .map((key) => {
              if (!answers[key]) return null;
              const val = answers[key];
              return (
                <div
                  key={key}
                  className="text-xs space-y-1 bg-white/[0.02] p-3 rounded-xl border border-white/5 flex flex-col"
                >
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider font-space">
                    {DISCOVERY_QUESTION_LABELS[key] || `Specification: ${key}`}
                  </span>
                  <p className="text-white font-medium leading-relaxed">
                    {Array.isArray(val) ? val.join(", ") : String(val)}
                  </p>
                </div>
              );
            })}
        </div>
      </div>

      {stages === "review" && (
        <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center mt-4">
          <button
            type="button"
            onClick={handleConfirm}
            className="px-6 py-2.5 bg-emerald-400 text-black font-space font-black text-sm uppercase rounded-xl shadow-[0_10px_25px_rgba(16,185,129,0.2)] hover:bg-emerald-300 hover:scale-[1.02] transition-all flex items-center gap-1.5 group cursor-pointer"
          >
            Submit for Architectural Review
            <ArrowRight className="h-4 w-4 stroke-[3] group-hover:translate-x-1 transition-transform" />
          </button>
        </m.div>
      )}

      {stages === "capture" && (
        <m.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 rounded-2xl border border-emerald-400/20 max-w-md mx-auto w-full text-center space-y-5 flex flex-col items-center bg-zinc-950/80 shadow-2xl backdrop-blur-xl"
        >
          <div className="space-y-1.5">
            <span className="text-sm font-black font-space text-white uppercase tracking-widest drop-shadow-[0_0_10px_rgba(16,185,129,0.3)] flex items-center gap-1.5 justify-center">
              ARCHITECTURE BRIEF FINALIZED
            </span>
            <p className="text-[11px] text-slate-400 font-medium leading-relaxed max-w-md">
              Our Lead Architect has generated your 0.1% deployment strategy. Enter your professional email to lock
              in your configuration and receive your pricing audit.
            </p>
          </div>
          <div className="w-full space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="CEO@yourbrand.com"
              className="w-full bg-transparent border-0 border-b border-emerald-400/30 px-3 py-2 text-sm text-center focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/10 text-white font-medium placeholder:text-zinc-700 transition-all shadow-[0_4px_10px_rgba(16,185,129,0.02)]"
            />
            {submitError && (
              <p className="text-[11px] text-red-400 font-medium" role="alert">
                {submitError}
              </p>
            )}
            <button
              type="button"
              onClick={handleLeadSubmit}
              disabled={isSubmitting || !email}
              className="w-full py-2.5 rounded-xl bg-emerald-400 text-black font-space font-black text-xs uppercase hover:bg-emerald-300 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-[0_4px_15px_rgba(16,185,129,0.2)]"
            >
              {isSubmitting ? "Finalizing details..." : "SUBMIT FOR REVIEW"}
            </button>
          </div>
        </m.div>
      )}

      {stages === "success" && (
        <m.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-6 rounded-2xl border border-emerald-400/20 max-w-md mx-auto w-full text-center space-y-4 flex flex-col items-center bg-zinc-950/80 shadow-2xl backdrop-blur-xl"
        >
          <div className="h-10 w-10 rounded-full bg-emerald-400 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)]">
            <Check className="h-5 w-5 text-black stroke-[3]" />
          </div>
          <div className="space-y-1.5">
            <span className="text-sm font-black font-space text-white uppercase tracking-tight">BLUEPRINT RECEIVED</span>
            <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
              A Human Lead Architect is manual auditing your{" "}
              <span className="text-emerald-300 font-bold">{activeFoundation?.name || "Goals"}</span> against our
              framework systems. Your full deployment strategy will land in your inbox within 24 hours for direct
              evaluation reviews.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              const base = "Hey! I just submitted my ";
              const fName = activeFoundation?.name || "Foundation";
              const msg = encodeURIComponent(`${base}${fName} blueprint. Let's discuss the deployment.`);
              window.open(`https://wa.me/995555123456?text=${msg}`, "_blank");
            }}
            className="w-full max-w-xs py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-space font-black text-xs uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-1"
          >
            Talk to an Architect Now
          </button>
        </m.div>
      )}

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
                className="text-center h-8"
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
    </div>
  );
}
