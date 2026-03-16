"use client";

import { motion } from "framer-motion";
import { Twitter, Zap, Instagram, Youtube, Facebook, Video } from "lucide-react";

const items = [
  { icon: Twitter, text: "X STRATEGISTS" },
  { icon: Zap, text: "AGENCY OWNERS" },
  { icon: Instagram, text: "INSTAGRAM CREATORS" },
  { icon: Youtube, text: "YOUTUBE BRANDS" },
  { icon: Facebook, text: "FACEBOOK BUSINESS" },
  { icon: Video, text: "TIKTOK CREATORS" },
];

export function ScrollingBanner() {
  // Single set of items for finite back-and-forth drift
  const duplicatedItems = [...items];

  return (
    <div className="w-full overflow-hidden border-y border-emerald-400/10 bg-black/30 backdrop-blur-sm py-4 select-none">
      <motion.div
        className="flex items-center gap-12 whitespace-nowrap px-4"
        initial={{ x: "60%" }}
        animate={{ x: "-40%" }}
        transition={{
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          duration: 20,
        }}
      >
        {duplicatedItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="flex items-center gap-2.5">
              <Icon className="h-4 w-4 text-emerald-400" />
              <span className="font-space text-xs font-bold uppercase tracking-wider text-white">
                {item.text}
              </span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
