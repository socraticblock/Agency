"use client";

import { motion } from "framer-motion";
import { Twitter, Users, Instagram, Youtube, Briefcase, Camera, GraduationCap, ShoppingBag } from "lucide-react";

const items = [
  { icon: Twitter, text: "STRATEGISTS" },
  { icon: Users, text: "AGENCY OWNERS" },
  { icon: Briefcase, text: "BUSINESS OWNERS" },
  { icon: Users, text: "COACHES" },
  { icon: Camera, text: "PHOTOGRAPHERS" },
  { icon: GraduationCap, text: "EDUCATORS" },
  { icon: ShoppingBag, text: "BOUTIQUES" },
  { icon: Instagram, text: "INSTAGRAM CREATORS" },
  { icon: Youtube, text: "YOUTUBE BRANDS" },
];

export function ScrollingBanner() {
  const duplicatedItems = [...items, ...items];

  return (
    <div className="w-full border-y border-teal-500/10 bg-slate-950/20 py-5 select-none z-20 relative overflow-hidden">
      <motion.div 
        className="w-max flex items-center whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 35,
        }}
      >
        {duplicatedItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="flex items-center font-space">
              <div className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-teal-400" />
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-100">
                  {item.text}
                </span>
              </div>
              {/* Packed inner spacing enables perfect absolute math divisors */}
              <div className="text-slate-600 font-mono px-8">-</div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
