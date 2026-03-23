
import React from 'react';
export default function Test(props: any) {
    const isWhatsAppClicked = false;
    const blueprintId = "123";
    const lead = { name: "Test", company: "Test" };
    const config = { answers: {}, foundation: "test", selectedModules: [], moduleQuantities: {}, shieldTier: 1, oneTimeTotal: 0, monthlyTotal: 0 };
    const WHATSAPP_INTAKE = "123";
    const handleEdit = (n: number) => {};
    const answers = {};
    const foundation = "test";
    const selectedModules = [];
    const moduleQuantities = {};
    const shieldTier = 1;
    const oneTimeTotal = 0;
    const monthlyTotal = 0;
    return (
        <div>
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
              <AnimatePresence mode="wait">
                {!isWhatsAppClicked ? (
                  <m.div
                    key="whatsapp-prompt"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="glass-card border border-emerald-500/20 bg-emerald-500/[0.03] p-6 rounded-2xl flex flex-col gap-3 relative overflow-hidden group w-full"
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
                        setIsWhatsAppClicked(true);
                        // Trigger background email notification with full payload
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
                          }),
                        }).catch((err) => console.error("WhatsApp dispatch fail:", err));

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
                  </m.div>
                ) : (
                  <m.div
                    key="whatsapp-success"
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="glass-card border border-emerald-500/20 bg-emerald-500/[0.03] p-6 rounded-2xl flex flex-col items-center justify-center text-center gap-3 relative overflow-hidden w-full"
                  >
                    <CheckCircle2 className="h-8 w-8 text-emerald-400 animate-pulse" />
                    <div>
                      <p className="text-sm font-bold text-white">Broadcast Dispatched</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">Linked to Blueprint #{blueprintId}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleEdit(1)}
                      className="mt-2 text-[10px] font-space font-bold text-emerald-400 hover:text-emerald-300 transition-colors uppercase tracking-wider flex items-center gap-1"
                    >
                      Modify Configuration
                    </button>
                  </m.div>
                )}
              </AnimatePresence>
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

      <AnimatePresence>
        
        </div>
    );
}
