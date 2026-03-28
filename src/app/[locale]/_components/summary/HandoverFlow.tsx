"use client";

import { m, AnimatePresence } from "framer-motion";
import { CheckCircle2, Smartphone, Mail, Check } from "lucide-react";
import { WHATSAPP_INTAKE } from "@/constants/content";
import { type ServiceItem } from "@/constants/pricing";

interface HandoverFlowProps {
  blueprintId: string | null;
  lead: { name: string; company: string; email: string; preference: string };
  setLead: React.Dispatch<React.SetStateAction<{ name: string; company: string; email: string; preference: string }>>;
  priority: "whatsapp" | "email" | null;
  setPriority: (p: "whatsapp" | "email" | null) => void;
  isSuccessDispatched: boolean;
  setIsSuccessDispatched: (v: boolean) => void;
  emailRequested: boolean;
  setEmailRequested: (v: boolean) => void;
  isEmailSent: boolean;
  setIsEmailSent: (v: boolean) => void;
  isSubmitting: boolean;
  submitError: string | null;
  handleLeadSubmit: (e: React.FormEvent) => void;
  setStage: (s: "review" | "analyzing" | "handover") => void;
  // Data for WhatsApp dispatch
  answers: Record<string, unknown>;
  foundation: string | null;
  selectedModules: string[];
  moduleQuantities: Record<string, number>;
  shieldTier: number;
  oneTimeTotal: number;
  monthlyTotal: number;
}

export default function HandoverFlow({
  blueprintId,
  lead,
  setLead,
  priority,
  setPriority,
  isSuccessDispatched,
  setIsSuccessDispatched,
  emailRequested,
  setEmailRequested,
  isEmailSent,
  setIsEmailSent,
  isSubmitting,
  submitError,
  handleLeadSubmit,
  setStage,
  answers,
  foundation,
  selectedModules,
  moduleQuantities,
  shieldTier,
  oneTimeTotal,
  monthlyTotal,
}: HandoverFlowProps) {
  return (
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
            {priority === "whatsapp"
              ? "Your configuration has been indexed and sent to the vault. I am waiting for you on WhatsApp."
              : "Your configuration has been indexed. A formal Discovery Dossier has been securely dispatched to your email. The Architect will follow up shortly."}
          </p>

          {priority === "whatsapp" && (
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
                        className="touch-form-control min-w-0 flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-base text-white placeholder:text-slate-600 focus:border-emerald-400 focus:outline-none"
                      />
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="min-h-11 shrink-0 rounded-lg bg-emerald-400 px-4 py-2 font-space text-xs font-black uppercase text-black hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {isSubmitting ? "..." : "Send"}
                      </button>
                    </form>
                  </m.div>
                ) : (
                  <m.div
                    key="text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-[10px] text-emerald-400 font-bold bg-emerald-500/5 p-2 rounded-lg border border-emerald-500/20"
                  >
                    A copy of your audit summary has been sent to your email.
                  </m.div>
                )}
              </AnimatePresence>
            </div>
          )}
          <div className="flex flex-col gap-3.5 max-w-[220px] mx-auto mt-4 pt-4 border-t border-white/5">
            {priority === "email" && (
              <button
                type="button"
                onClick={() => {
                  setIsSuccessDispatched(false);
                  setPriority("whatsapp");
                }}
                className="flex items-center justify-center gap-1.5 text-[11px] text-emerald-400 font-bold uppercase tracking-wider hover:text-emerald-300 transition-colors cursor-pointer hover:underline underline-offset-4 mx-auto"
              >
                <Smartphone className="h-3.5 w-3.5 stroke-[2.5]" /> Switch to WhatsApp
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                setIsSuccessDispatched(false);
                setIsEmailSent(false);
                setStage("review");
              }}
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
                onClick={() => {
                  setPriority("whatsapp");
                  setLead((prev) => ({ ...prev, preference: "whatsapp" }));
                }}
                className="glass-card p-6 border border-emerald-500/20 hover:border-emerald-400 bg-emerald-500/[0.02] text-center rounded-2xl transition-all cursor-pointer group"
              >
                <Smartphone className="h-6 w-6 text-emerald-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <h3 className="text-sm font-bold text-white font-space">Prioritize WhatsApp Chat</h3>
                <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">Direct intake to an Architect node.</p>
              </button>

              <button
                type="button"
                onClick={() => {
                  setPriority("email");
                  setLead((prev) => ({ ...prev, preference: "email" }));
                }}
                className="glass-card p-6 border border-white/5 hover:border-white/10 bg-white/[0.02] text-center rounded-2xl transition-all cursor-pointer group"
              >
                <Mail className="h-6 w-6 text-slate-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <h3 className="text-sm font-bold text-white font-space">Prioritize Email Communication</h3>
                <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">Request formal Discovery Dossiers.</p>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 w-full">
              {priority === "whatsapp" && (
                <div className="glass-card border border-emerald-500/20 bg-emerald-500/[0.03] p-6 rounded-2xl flex flex-col gap-3 relative overflow-hidden group">
                  <AnimatePresence mode="wait">
                    <m.div
                      key="prompt"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex flex-col gap-3"
                    >
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
                          const nameStr = lead.name.trim() || "Candidate";
                          const companyStr = lead.company.trim() || "my project";
                          const msg =
                            emailRequested && lead.email.trim()
                              ? `Hey Genezisi, I'm ${nameStr} from ${companyStr}. I just secured my blueprint and requested the dossier via email. Let's discuss the logic here.`
                              : `Hey Genezisi, I'm ${nameStr} from ${companyStr}. I just finished my configuration. Let's skip the paperwork and discuss the North Star here.`;
                          window.open(
                            `https://wa.me/${WHATSAPP_INTAKE}?text=${encodeURIComponent(msg)}`,
                            "_blank"
                          );
                          setIsSuccessDispatched(true);
                          fetch("/api/blueprint", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                              email: "",
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
                              source: "whatsapp intake",
                              preference: "whatsapp",
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

              {(priority === "email" || (priority === "whatsapp" && emailRequested)) && (
                <div className="glass-card border border-white/5 bg-white/[0.02] p-6 rounded-2xl flex flex-col gap-4 relative overflow-hidden">
                  <div className="flex items-center justify-between pb-2 border-b border-white/5">
                    <div>
                      <span className="text-[9px] font-black font-space text-slate-400 uppercase tracking-wider">
                        📄 FULL PDF REPORT
                      </span>
                      <p className="text-sm font-bold text-white mt-0.5">
                        {priority === "email"
                          ? "Where should the Architect send your Dossier?"
                          : "Discovery Dossier"}
                      </p>
                    </div>
                    {priority === "whatsapp" && (
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <span className="text-[10px] text-slate-400 group-hover:text-emerald-400 transition-colors font-bold">
                          Would you also like a copy sent to your records?
                        </span>
                        <input
                          type="checkbox"
                          checked={emailRequested}
                          onChange={(e) => setEmailRequested(e.target.checked)}
                          className="accent-emerald-400 h-3.5 w-3.5 rounded border-white/10 bg-white/5"
                        />
                      </label>
                    )}
                  </div>

                  <div className="space-y-3">
                    <p className="text-[11px] text-slate-400">
                      We&apos;ll send the complete architecture PDF to the address below.
                    </p>
                    <form onSubmit={handleLeadSubmit} className="space-y-3">
                      <div className="relative w-full">
                        <Mail className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
                        <input
                          type="email"
                          required
                          placeholder="Professional email for PDF delivery"
                          value={lead.email}
                          onChange={(e) => setLead({ ...lead, email: e.target.value })}
                          className="touch-form-control w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-9 pr-3 text-base text-white focus:border-emerald-400 focus:outline-none"
                        />
                      </div>
                      {submitError && <p className="text-xs text-red-400 font-bold">{submitError}</p>}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex min-h-12 w-full items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/5 py-3 font-space text-xs font-black uppercase text-white transition-all hover:bg-white/10"
                      >
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
  );
}
