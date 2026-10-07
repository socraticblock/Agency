"use client";

import { useEffect, useMemo, useState } from "react";
import { Globe, MessageCircle, PenTool, RefreshCw, Rocket, Shield, Smartphone } from "lucide-react";
import { START_DC_BRAND, START_DC_WELCOME } from "@/constants/start-digital-card-copy";

type Props = {
  onViewPricing: () => void;
  onViewFaq: () => void;
  onStartBuilding: () => void;
  onSkip: () => void;
};

export function OverlayWelcomeBody({ onViewPricing, onViewFaq, onStartBuilding, onSkip }: Props) {
  const v = START_DC_WELCOME;
  const typingPhrases = useMemo(
    () => ["Premium design.", "Zero friction.", "Stand out from your peers.", "Fast launch."],
    [],
  );
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setPrefersReducedMotion(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const current = typingPhrases[phraseIndex] ?? "";
    let delay = deleting ? 55 : 95;

    if (!deleting && typed === current) {
      delay = 1700;
    } else if (deleting && typed === "") {
      delay = 380;
    }

    const timer = window.setTimeout(() => {
      if (!deleting && typed === current) {
        setDeleting(true);
        return;
      }
      if (deleting && typed === "") {
        setDeleting(false);
        setPhraseIndex((i) => (i + 1) % typingPhrases.length);
        return;
      }
      setTyped(current.slice(0, deleting ? typed.length - 1 : typed.length + 1));
    }, delay);

    return () => window.clearTimeout(timer);
  }, [deleting, phraseIndex, prefersReducedMotion, typed, typingPhrases]);

  const subtitle = prefersReducedMotion
    ? "Premium design. Zero friction. Stand out from your peers. Fast launch."
    : typed;

  return (
    <div className="mx-auto w-full max-w-3xl text-center text-white">
      <p className="mb-3 text-lg font-black tracking-tight text-emerald-400">{START_DC_BRAND}</p>
      <h2 className="mb-2 text-2xl font-bold md:text-3xl">{v.headline}</h2>
      <p className="mb-2 min-h-6 text-sm !text-emerald-400 md:text-base" style={{ color: "#34d399" }}>
        <span className="!text-emerald-400" style={{ color: "#34d399" }}>{subtitle}</span>
        {!prefersReducedMotion ? <span className="ml-0.5 inline-block !text-emerald-400/90" style={{ color: "rgba(52, 211, 153, 0.9)" }}>|</span> : null}
      </p>
      <p className="mb-6 text-lg font-semibold text-emerald-400">{v.priceLine}</p>

      <div className="mb-6 grid grid-cols-3 gap-2 md:gap-3">
        {[
          { Icon: PenTool, title: v.stepDesignTitle, desc: v.stepDesignBody },
          { Icon: MessageCircle, title: v.stepOrderTitle, desc: v.stepOrderBody },
          { Icon: Rocket, title: v.stepLiveTitle, desc: v.stepLiveBody },
        ].map(({ Icon, title, desc }) => (
          <div key={title} className="start-dc-info-panel rounded-lg p-2 md:p-4">
            <Icon className="mx-auto mb-1 h-5 w-5 text-emerald-400/90 md:mb-2 md:h-6 md:w-6" aria-hidden />
            <p className="text-[10px] font-medium text-white md:text-sm">{title}</p>
            <p className="mt-0.5 text-[9px] leading-snug text-white/80 md:text-xs">{desc}</p>
          </div>
        ))}
      </div>

      <div className="mb-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {[
          { Icon: RefreshCw, label: v.featureLiveUpdates },
          { Icon: Shield, label: v.featureSecure },
          { Icon: Globe, label: v.featureDomain },
          { Icon: Smartphone, label: v.featureMobile },
        ].map(({ Icon, label }) => (
          <div key={label} className="flex flex-col items-center gap-1 text-white/50">
            <Icon className="h-4 w-4 shrink-0" aria-hidden />
            <span className="text-center text-[10px] md:text-xs">{label}</span>
          </div>
        ))}
      </div>

      <div className="mb-3 flex flex-wrap justify-center gap-2">
        <button
          type="button"
          onClick={onViewPricing}
          className="start-dc-info-panel rounded-lg px-4 py-2 text-sm text-white/80 transition-colors hover:text-white"
        >
          {v.viewPricing}
        </button>
        <button
          type="button"
          onClick={onViewFaq}
          className="start-dc-info-panel rounded-lg px-4 py-2 text-sm text-white/80 transition-colors hover:text-white"
        >
          {v.viewFaq}
        </button>
      </div>

      <button
        type="button"
        onClick={onStartBuilding}
        className="mb-3 w-full rounded-lg bg-emerald-500 px-8 py-3 text-base font-semibold text-white shadow-lg shadow-emerald-500/20 transition-colors hover:bg-emerald-600"
      >
        {v.startBuilding}
      </button>
      <button
        type="button"
        onClick={onSkip}
        className="text-sm text-white/50 underline-offset-2 transition-colors hover:text-white/80"
      >
        {v.skip}
      </button>
    </div>
  );
}
