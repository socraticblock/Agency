"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export function DesignVisual() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const items = [
    { title: "Mesh", icon: "📊" },
    { title: "Fluid", icon: "🌊" },
    { title: "Geo", icon: "📐" },
  ];

  return (
    <div className="flex flex-row w-full h-full items-center overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-4 -mb-4">
      {items.map((item, i) => {
        const isHovered = hoveredIndex === i;

        return (
          <motion.div
            key={i}
            layout="position"
            onHoverStart={() => setHoveredIndex(i)}
            onHoverEnd={() => setHoveredIndex(null)}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            whileHover={{ scale: 1.02, zIndex: 10 }}
            className="relative flex-none w-[85%] md:w-1/3 min-w-[85%] md:min-w-0 mx-2 h-40 rounded-2xl glass-card backdrop-blur-sm border border-white/10 flex flex-col items-center justify-center p-3 cursor-pointer overflow-hidden group snap-center"
          >
            {/* Radial Mouse Track following Spotlight Glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_center,_rgba(16,185,129,0.12),_transparent_70%)]" />

            <div className="flex flex-col items-center gap-1 z-10">
              <span className="text-lg">{item.icon}</span>
              <span className="text-[10px] font-bold text-white/80 font-space uppercase tracking-wider">{item.title}</span>
            </div>

            {/* Content for each visualizer */}
            <div className="absolute inset-0 z-0 flex flex-col items-center justify-center mt-6">
              {i === 0 && (
                <div className="flex gap-1 items-end h-8">
                  {[35, 65, 45, 85].map((h, idx) => (
                    <motion.div
                      key={idx}
                      className="w-1.5 bg-emerald-400/30 rounded-t-sm"
                      animate={{ height: isHovered ? `${h}%` : "30%" }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    />
                  ))}
                </div>
              )}
              {i === 1 && (
                <motion.div
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/10 flex items-center justify-center"
                  animate={{ rotate: isHovered ? 180 : 0, scale: isHovered ? 1.1 : 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                />
              )}
              {i === 2 && (
                <div className="grid grid-cols-2 gap-1">
                  {[1, 2, 3, 4].map((_, idx) => (
                    <motion.div
                      key={idx}
                      className="w-2.5 h-2.5 bg-emerald-300/20 rounded-sm"
                      animate={{ scale: isHovered ? [1, 1.2, 1] : 1 }}
                      transition={{ repeat: isHovered ? Infinity : 0, duration: 1.5, delay: idx * 0.1 }}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        );
      })}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
