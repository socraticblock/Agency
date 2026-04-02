"use client";

import { m } from "framer-motion";
import { Edit2, Layout, Check, ArrowRight, Shield, Scale, TrendingUp, Zap, Cpu, Palette, Settings } from "lucide-react";
import { MODULES, FOUNDATIONS, SHIELD_TIERS, type ServiceItem } from "@/constants/pricing";
import { useMemo } from "react";
import { buildDiscoveryQuestions } from "@/lib/discovery/buildDiscoveryQuestions";
import { DISCOVERY_QUESTION_LABELS } from "@/lib/discovery/discoveryQuestionLabels";

function hasAnswer(val: unknown): boolean {
  if (val === undefined || val === null) return false;
  if (typeof val === "string") return val.trim().length > 0;
  if (Array.isArray(val)) return val.length > 0;
  return true;
}

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "Georgian Advantage": Scale,
  "Marketing": TrendingUp,
  "Business Engines": Zap,
  "AI & Automation": Cpu,
  "Creative": Palette,
  "Operational": Settings,
};

function getCleanScope(item: string) {
  if (!item) return "";
  if (item.includes("|")) return item.split("|")[1].trim();
  return item;
}

interface ReviewPhaseProps {
  foundation: string | null;
  selectedModules: string[];
  answers: Record<string, unknown>;
  shieldTier: number;
  oneTimeTotal: number;
  monthlyTotal: number;
  handleEdit: (stepNum: 1 | 2 | 3 | 4 | 5, questionIndex?: number) => void;
  openVipCheckIn: () => void;
  submitError: string | null;
}

export default function ReviewPhase({
  foundation,
  selectedModules,
  answers,
  shieldTier,
  oneTimeTotal,
  monthlyTotal,
  handleEdit,
  openVipCheckIn,
  submitError,
}: ReviewPhaseProps) {
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

  return (
    <m.div
      key="audit-grid"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95, y: -20 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-8 w-full"
    >
      <div>
        <h1 className="text-xl font-black font-space tracking-tight text-white flex items-center gap-2">
          5. Final Audit Summary
        </h1>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          Review your digital infrastructure blueprints before deployment indexation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Box 1: Infrastructure Summary */}
        <div
          style={{ willChange: "transform, opacity" }}
          className="glass-card border border-white/5 bg-white/[0.02] backdrop-blur-md p-8 rounded-2xl flex flex-col gap-4 relative overflow-hidden group h-full"
        >
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
            {activeFoundation?.deliveryTimeline ? (
              <div className="text-xs text-slate-400">
                ⏱️ Delivery: <span className="font-semibold text-slate-200">{activeFoundation.deliveryTimeline}</span>
              </div>
            ) : null}
            {activeFoundation ? (
              <div className="text-xs text-slate-400">
                Base investment:{" "}
                <span className="font-semibold text-emerald-300">{activeFoundation.priceGEL.toLocaleString()} ₾</span>
              </div>
            ) : null}
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

        {/* Box 2: Visual Identity */}
        <div
          style={{ willChange: "transform, opacity" }}
          className="glass-card border border-white/5 bg-white/[0.02] backdrop-blur-md p-8 rounded-2xl flex flex-col gap-4 relative overflow-hidden group h-full"
        >
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
                      {Array.isArray(answers["color_palette"]) &&
                        (answers["color_palette"] as string[]).map((c: string, i: number) => (
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

        {/* Box 3: Brand Strategy */}
        <div
          style={{ willChange: "transform, opacity" }}
          className="glass-card border border-white/5 bg-white/[0.02] backdrop-blur-md p-8 rounded-2xl flex flex-col gap-4 relative overflow-hidden group h-full"
        >
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
                <p className="text-xs text-white font-medium italic leading-relaxed pl-2.5 border-l border-emerald-500/20">
                  &quot;{String(answers["pitch"])}&quot;
                </p>
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

      {/* Deep-Dive Strategy Specifications */}
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
                !["design_style", "color_palette", "typography", "pitch", "north_star", "emotional_hook"].includes(key)
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
                <div key={key} className="text-xs space-y-1 bg-white/[0.02] p-3 rounded-xl border border-white/5 flex flex-col relative group">
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
                  <p className="text-white font-medium leading-relaxed break-words">{displayVal}</p>
                </div>
              );
            })}
        </div>
      </div>

      {/* Manifest Block */}
      <div className="w-full bg-black/60 backdrop-blur-md border border-white/5 p-6 rounded-2xl grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 items-center min-h-[140px]">
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
          {activeFoundation?.id === "ecomm" && (
            <div className="flex gap-1.5 items-center justify-center mt-2.5">
              <span className="text-[8px] font-bold text-slate-500 border border-white/5 bg-white/5 px-1 py-0.5 rounded leading-none">
                TBC/BOG INTEGRATED
              </span>
              <span className="text-[8px] font-bold text-slate-500 border border-white/5 bg-white/5 px-1 py-0.5 rounded leading-none">
                RS.GE COMPLIANT
              </span>
            </div>
          )}
        </div>

        {/* Column 2: Extensional Upgrades */}
        <div className="flex flex-col gap-1.5 md:border-r border-white/5 md:pr-4 h-full justify-center items-center text-center">
          <div className="flex items-center gap-1.5 justify-center">
            <Shield className="h-4 w-4 text-emerald-400" />
            <span className="text-xs font-black font-space text-white uppercase tracking-wider">MODULAR EXTENSION NODES</span>
          </div>
          <div className="flex flex-wrap gap-1 mt-1 justify-center">
            {activeModules.map((m) => {
              const IconComponent = m.category && categoryIcons[m.category] ? categoryIcons[m.category] : Shield;
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
            <p className="text-xl font-black font-mono text-emerald-400 whitespace-nowrap">
              {oneTimeTotal.toLocaleString()} ₾ One-Time
            </p>
            {monthlyTotal > 0 && (
              <p className="text-xs font-bold font-mono text-emerald-300 whitespace-nowrap">
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
                <span className="leading-tight">
                  {activeFoundation?.warrantyDays ? `${activeFoundation.warrantyDays}-DAY ENGINEERING WARRANTY` : "ENGINEERING WARRANTY INCLUDED"}
                </span>
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
  );
}
