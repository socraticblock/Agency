"use client";

import { m } from "framer-motion";
import { Lock, Download, ArrowLeft } from "lucide-react";
import { SHIELD_TIERS, type ShieldPerk } from "@/constants/pricing";

interface ShieldGridProps {
  shieldTier: number;
  setShieldTier: (tier: number) => void;
  formatPrice: (price: number) => string;
  goToStep: (s: 1 | 2 | 3 | 4) => void;
  setIsModalOpen: (val: boolean) => void;
  foundationId: string | null;
}

export default function ShieldGrid({
  shieldTier,
  setShieldTier,
  formatPrice,
  goToStep,
  setIsModalOpen,
  foundationId,
}: ShieldGridProps) {
  const emphasisByFoundation: Record<string, { tierId: number; badge: string; reason: string }> = {
    cms: {
      tierId: 0,
      badge: "Popular with Professional",
      reason: "Essential protection for your digital asset.",
    },
    saas: {
      tierId: 1,
      badge: "Recommended for Command Center",
      reason: "Balanced support + ongoing optimization.",
    },
    ecomm: {
      tierId: 2,
      badge: "Best for E-Commerce",
      reason: "Protect your revenue stream with maximum coverage.",
    },
  };
  const emphasis = foundationId ? emphasisByFoundation[foundationId] : undefined;

  return (
    <m.div
      key="step3"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col gap-4"
    >
      <div>
        <h3 className="text-xl font-black font-space tracking-tight text-white flex items-center gap-2">
          3. Secure Your Asset
        </h3>
        <p className="text-xs text-slate-500 font-medium mt-0.5">Protect your digital estate with the Sentinel active security protocol.</p>
      </div>

      <div className="bg-zinc-900/40 p-3 rounded-2xl border border-zinc-800/50 flex flex-col gap-1">
        <h4 className="text-[10px] font-black font-space tracking-[0.2em] text-emerald-400 uppercase">
          [ Sentinel Protocol Active ]
        </h4>
        <p className="text-sm text-slate-400 font-medium leading-relaxed">
          "Your website is your only owned real estate. Social media is rented space." Google blacklists 10,000 sites daily for security lapses. We are the 'Sentinel' protecting your asset flawlessly.
        </p>
      </div>

      <div className="flex items-center gap-3 relative">
        <div
          className="absolute inset-0 rounded-2xl opacity-[0.05] transition-colors duration-500"
          style={{
            background: shieldTier === 3
              ? "radial-gradient(circle at center, rgb(16,185,129), transparent)"
              : "transparent"
          }}
        />

        <div className="flex flex-col gap-2 w-full z-10">
          {SHIELD_TIERS.map((tier) => (
            <div
              key={tier.id}
              onClick={() => setShieldTier(tier.id)}
              className={`flex flex-col p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${shieldTier === tier.id
                  ? "border-emerald-500/60 bg-emerald-500/[0.05] shadow-[0_0_30px_rgba(16,185,129,0.08)]"
                  : "border-zinc-800 bg-zinc-900/40 hover:border-zinc-700 hover:bg-zinc-900/60"
                }`}
            >
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-3">
                  <Lock className={`h-4 w-4 ${shieldTier === tier.id ? "text-emerald-400" : "text-slate-600"}`} />
                  <div className="flex flex-col text-left">
                    <span className="text-sm font-black text-white flex items-center gap-1.5">
                      {tier.name}
                      {tier.isRecommended && <span className="text-[10px] bg-emerald-400 text-black px-1.5 py-0.5 rounded-full font-black">RECOMMENDED</span>}
                      {emphasis && emphasis.tierId === tier.id ? (
                        <span className="text-[10px] bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 px-1.5 py-0.5 rounded-full font-black">
                          {emphasis.badge}
                        </span>
                      ) : null}
                    </span>
                    {tier.description && <span className="text-xs text-slate-400 font-medium leading-normal mt-0.5">{tier.description}</span>}
                    {emphasis && emphasis.tierId === tier.id ? (
                      <span className="text-[11px] text-emerald-300/90 font-medium leading-normal mt-1">{emphasis.reason}</span>
                    ) : null}
                  </div>
                </div>
                <span className="text-sm font-black font-space text-emerald-400">
                  {tier.priceGEL === 0 ? "Included" : `${formatPrice(tier.priceGEL)}/yr`}
                </span>
              </div>

              {shieldTier === tier.id && (
                <m.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col gap-1 border-t border-zinc-800/80 mt-2 pt-2 w-full overflow-hidden"
                >
                  {tier.perks.map((perk, idx) => (
                    <div key={idx} className="flex flex-col text-xs text-slate-300 gap-0.5">
                      <div className="flex items-center gap-1.5">
                        <div className="h-1 w-1 bg-emerald-400 rounded-full" />
                        <span className="font-bold text-white text-xs">{perk.title}</span>
                      </div>
                      <span className="text-[11px] text-slate-400 ml-2.5 leading-normal">{perk.desc}</span>
                    </div>
                  ))}
                </m.div>
              )}
            </div>
          ))}
        </div>
      </div>

    </m.div>
  );
}
