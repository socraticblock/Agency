"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ServiceItem } from "@/constants/pricing";

interface FoundationCardProps {
  f: ServiceItem;
  isSelected: boolean;
  onClick: () => void;
  formatPrice: (p: number) => string;
}

const CARD_STYLES = {
  base: "relative text-left p-5 rounded-2xl border backdrop-blur-md flex flex-col justify-between min-h-[160px] h-auto transition-all",
  selected: "border-emerald-500 bg-emerald-500/[0.04] shadow-[0_0_40px_rgba(16,185,129,0.12)]",
  idle: "border-zinc-800/60 bg-zinc-900/30 hover:bg-zinc-900/60 hover:border-zinc-700"
};

export default function FoundationCard({ f, isSelected, onClick, formatPrice }: FoundationCardProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const background = useTransform(
    [glowX, glowY],
    ([xVal, yVal]) => `radial-gradient(140px circle at ${xVal}px ${yVal}px, rgba(16,185,129,0.18), transparent)`
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    glowX.set(mouseX);
    glowY.set(mouseY);
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      whileHover={{ scale: 1.02 }}
      className={`group ${CARD_STYLES.base} ${isSelected ? CARD_STYLES.selected : CARD_STYLES.idle}`}
    >
      <motion.div 
        style={{ background }} 
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" 
      />
      {isSelected && (
        <motion.div
          layoutId="foundationGlow"
          className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_center,_rgba(16,185,129,0.2),_transparent)] pointer-events-none"
        />
      )}
      <div className="flex flex-col z-10" style={{ transform: "translateZ(30px)" }}>
        <h4 className="text-base font-black text-white mt-0.5">{f.name}</h4>
        <p className="text-sm text-slate-400 mt-1 leading-relaxed font-medium">{f.concept}</p>
      </div>

      <div className="flex justify-between items-end mt-auto w-full pt-2 border-t border-zinc-900/40 z-10" style={{ transform: "translateZ(15px)" }}>
        <div />
        <span className="text-sm font-black font-space text-emerald-300">
          {formatPrice(f.priceGEL)}
        </span>
      </div>
    </motion.button>
  );
}
