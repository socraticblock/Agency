"use client";

import { m, AnimatePresence } from "framer-motion";
import { User, Building, X } from "lucide-react";

interface VipCheckInModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: { name: string; company: string; email: string; preference: string };
  setLead: React.Dispatch<React.SetStateAction<{ name: string; company: string; email: string; preference: string }>>;
  onSecure: () => void;
  vipError: string | null;
}

export default function VipCheckInModal({
  isOpen,
  onClose,
  lead,
  setLead,
  onSecure,
  vipError,
}: VipCheckInModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <m.div
          key="vip-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={onClose}
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
              onClick={onClose}
              className="absolute right-3 top-3 inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-slate-500 transition-colors hover:text-white sm:right-4 sm:top-4"
            >
              <X className="h-5 w-5" />
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
                <User className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  autoComplete="name"
                  placeholder="Full name"
                  value={lead.name}
                  onChange={(e) => setLead({ ...lead, name: e.target.value })}
                  className="touch-form-control w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-9 pr-3 text-base text-white placeholder:text-slate-600 focus:border-emerald-400 focus:outline-none"
                />
              </div>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  autoComplete="organization"
                  placeholder="Company name"
                  value={lead.company}
                  onChange={(e) => setLead({ ...lead, company: e.target.value })}
                  className="touch-form-control w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-9 pr-3 text-base text-white placeholder:text-slate-600 focus:border-emerald-400 focus:outline-none"
                />
              </div>
            </div>
            {vipError && (
              <p className="mt-3 text-[11px] text-red-400 font-bold font-space">{vipError}</p>
            )}
            <div className="mt-8 flex flex-col gap-2">
              <button
                type="button"
                onClick={onSecure}
                className="w-full py-3.5 bg-emerald-400 text-black font-space font-black text-xs uppercase rounded-xl shadow-[0_10px_30px_rgba(16,185,129,0.25)] hover:bg-emerald-300 transition-all"
              >
                Secure my blueprint
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full py-2 text-[10px] font-space font-bold text-slate-500 uppercase tracking-wider hover:text-slate-300 transition-colors"
              >
                Back to audit
              </button>
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
