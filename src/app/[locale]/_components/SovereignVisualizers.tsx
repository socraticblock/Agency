"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import { Lock } from "lucide-react";

// --- Animated Lighthouse Score Helper ---
interface AnimatedLighthouseScoreProps {
  value: number;
  duration?: number;
  small?: boolean;
}

export function AnimatedLighthouseScore({ value, duration = 0.8, small = false }: AnimatedLighthouseScoreProps) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(count, value, {
      duration,
      ease: "circOut",
    });
    
    const unsubscribe = rounded.on("change", (v) => setDisplayValue(v));
    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [count, value, duration, rounded]);

  const size = small ? "w-20 h-20" : "w-28 h-28";
  const strokeWidth = small ? "4" : "6";
  const radius = small ? "32" : "45";
  const textSize = small ? "text-xl" : "text-3xl";
  const viewbox = small ? "0 0 80 80" : "0 0 112 112";
  const center = small ? "40" : "56";

  return (
    <div className={`relative flex items-center justify-center ${size}`}>
      <svg className="absolute w-full h-full -rotate-90" viewBox={viewbox}>
        <circle cx={center} cy={center} r={radius} className="stroke-emerald-400/10" strokeWidth={strokeWidth} fill="transparent" />
        <motion.circle
          cx={center}
          cy={center}
          r={radius}
          className="stroke-emerald-400"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: value / 100 }}
          transition={{ duration, ease: "circOut" }}
        />
      </svg>
      <div className="flex flex-col items-center justify-center z-10">
        <div className={`${textSize} font-black font-space text-emerald-300`}>{displayValue}</div>
        {!small && <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest mt-0.5">PERFORMANCE</span>}
      </div>
    </div>
  );
}

// --- Visualizers ---

export function DesignVisual() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const items = [
    { title: "Mesh", icon: "📊" },
    { title: "Fluid", icon: "🌊" },
    { title: "Geo", icon: "📐" },
  ];

  return (
    <div className="grid grid-cols-6 gap-2 w-full h-full max-w-[420px] p-2 items-center">
      {items.map((item, i) => {
        const isHovered = hoveredIndex === i;
        const colSpan = hoveredIndex === null ? "col-span-2" : isHovered ? "col-span-4" : "col-span-1";

        return (
          <motion.div
            key={i}
            layout
            onHoverStart={() => setHoveredIndex(i)}
            onHoverEnd={() => setHoveredIndex(null)}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            whileHover={{ scale: 1.02, zIndex: 10 }}
            className={`relative ${colSpan} h-40 rounded-2xl glass-card backdrop-blur-md border border-white/10 flex flex-col items-center justify-center p-3 cursor-pointer overflow-hidden group`}
          >
            {/* Radial Mouse Track following Spotlight Glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_center,_rgba(16,185,129,0.12),_transparent_70%)]" />

            <div className="flex flex-col items-center gap-1 z-10">
              <span className="text-lg">{item.icon}</span>
              <span className="text-[8px] font-bold text-white/80 font-space uppercase tracking-wider">{item.title}</span>
            </div>

            {/* Subconscious UI Abstract Content layout */}
            <div className="absolute inset-0 z-0 flex flex-col items-center justify-center mt-6">
              {i === 0 && (
                <div className="flex gap-1 items-end h-8">
                  {[35, 65, 45, 85].map((h, idx) => (
                    <motion.div
                      key={idx}
                      className="w-1 bg-emerald-400/30 rounded-t-sm"
                      animate={{ height: isHovered ? `${h}%` : "30%" }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    />
                  ))}
                </div>
              )}
              {i === 1 && (
                <motion.div
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/10 flex items-center justify-center"
                  animate={{ rotate: isHovered ? 180 : 0, scale: isHovered ? 1.1 : 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                />
              )}
              {i === 2 && (
                <div className="grid grid-cols-2 gap-0.5">
                  {[1, 2, 3, 4].map((_, idx) => (
                    <motion.div
                      key={idx}
                      className="w-1.5 h-1.5 bg-emerald-300/20 rounded-sm"
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
    </div>
  );
}

export function SpeedVisual() {
  return (
    <div className="flex flex-col items-center gap-4">
      <AnimatedLighthouseScore value={100} duration={0.8} />
      <div className="px-5 py-3 rounded-2xl border border-white/10 bg-[#0a0a0a] flex items-center gap-4">
        <div className="h-4 w-4 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-sm font-bold text-white">Next.js Edge Speed</span>
      </div>
      <div className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 mt-2">✅ Core Web Vitals Passed</div>
    </div>
  );
}

export function BridgeVisual() {
  return (
    <div className="w-full h-full flex items-center justify-center p-2">
      <div className="relative w-full max-w-[340px] flex justify-between items-center">
        <div className="flex flex-col gap-4 z-10">
          {["Instagram", "TikTok", "Facebook"].map((item) => (
            <motion.div
              key={item}
              className="px-3 py-1.5 rounded-xl border border-white/5 bg-white/5 flex items-center gap-2 text-[10px] font-bold text-slate-300"
            >
              <div className="h-1.5 w-1.5 rounded-full bg-blue-400" />
              {item}
            </motion.div>
          ))}
        </div>
        <div className="absolute inset-0">
          <svg className="w-full h-full" viewBox="0 0 340 180">
            {[40, 75, 110].map((y, i) => (
              <motion.path
                key={i}
                d={`M 110 ${y} Q 170 ${y} 210 90`}
                fill="transparent"
                className="stroke-emerald-400/20"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: i * 0.2 }}
              />
            ))}
          </svg>
        </div>
        <motion.div className="glass-card flex flex-col items-center justify-center p-3 rounded-2xl border border-emerald-400/20 w-[110px] h-[110px] z-10">
          <Lock className="h-6 w-6 text-emerald-400 mb-1" />
          <div className="text-[10px] font-bold text-white">Your Platform</div>
          <div className="text-[8px] font-mono text-emerald-300 mt-1 uppercase">100% Owned</div>
        </motion.div>
      </div>
    </div>
  );
}

export function InterceptVisual() {
  const [lang, setLang] = useState<"EN" | "GE" | "RU">("EN");
  const [isPaid, setIsPaid] = useState(false);
  const [selectedBank, setSelectedBank] = useState<"tbc" | "bog" | null>(null);

  const text = {
    EN: { summary: "Order Summary", item: "Elite Implementation", pay: "Pay with" },
    GE: { summary: "შეკვეთის ჯამი", item: "ელიტური იმპლემენტაცია", pay: "გადახდა" },
    RU: { summary: "Сумма заказа", item: "Элитная реализация", pay: "Оплатить с" }
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-2">
      <AnimatePresence mode="wait">
        {!isPaid ? (
          <motion.div
            key="checkout"
            layoutId="checkout-container"
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="w-[260px] bg-[#090909] border border-white/10 rounded-2xl p-3 flex flex-col gap-3 shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
            exit={{ scale: 0.8, opacity: 0 }}
          >
            {/* Header Language Toggle */}
            <div className="flex justify-between items-center bg-white/5 rounded-xl p-0.5">
              {["EN", "GE", "RU"].map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l as any)}
                  className={`px-2 py-1 rounded-lg text-[9px] font-bold font-space transition-all w-full text-center ${
                    lang === l ? "bg-emerald-400 text-black shadow-sm" : "text-slate-400 hover:text-white"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            {/* Body */}
            <AnimatePresence mode="wait">
              <motion.div
                key={lang}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.15 }}
                className="space-y-1.5 border-b border-white/5 pb-2 border-dashed"
              >
                <div className="text-[9px] font-space font-bold uppercase tracking-wider text-slate-500">{text[lang].summary}</div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-white font-semibold">{text[lang].item}</span>
                  <span className="text-xs font-black font-space text-emerald-300">350 ₾</span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Payment Selection */}
            <div className="space-y-1.5">
              <div className="text-[8px] font-bold text-slate-400 mb-1">{text[lang].pay}:</div>
              <div className="grid grid-cols-2 gap-1.5">
                {["tbc", "bog"].map((bank) => (
                  <button
                    key={bank}
                    onClick={() => {
                      setSelectedBank(bank as any);
                      setTimeout(() => setIsPaid(true), 600);
                    }}
                    className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all ${
                      selectedBank === bank
                        ? "border-emerald-400 bg-emerald-500/5"
                        : "border-white/5 bg-white/[0.02] hover:bg-white/5"
                    }`}
                  >
                    <div className="h-5 w-8 flex items-center justify-center">
                      {bank === "tbc" ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <rect width="24" height="24" rx="4" fill="#00A0E3"/>
                          <path d="M6 12h12M12 6v12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="10" fill="#FF5000"/>
                          <path d="M8 12h8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      )}
                    </div>
                    <span className="text-[9px] font-black font-space mt-1 uppercase text-white">
                      {bank === "tbc" ? "TBC" : "BOG"}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            layoutId="checkout-container"
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="w-[180px] h-[140px] bg-[#0c0c0c] border border-emerald-500/30 rounded-2xl flex flex-col items-center justify-center gap-2 shadow-[0_0_30px_rgba(16,185,129,0.15)] overflow-hidden"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.2 }}
              className="h-9 w-9 rounded-full bg-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.4)] flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="text-[10px] font-black font-space text-emerald-300">SUCCESSFUL!</div>
              <div className="text-[8px] text-slate-400 mt-0.5">Booking Confirmed 🧾</div>
            </motion.div>

            <motion.button
              onClick={() => { setIsPaid(false); setSelectedBank(null); }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="px-1.5 py-0.5 rounded-md border border-white/10 text-[7px] font-bold text-slate-500 hover:text-white mt-0.5"
            >
              Reset
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ConversionVisual() {
  const [conversationIndex, setConversationIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setConversationIndex((prev) => (prev === 2 ? 0 : prev + 1));
    }, 9000);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div className="w-full relative min-h-[220px] flex items-center justify-center">
      <AnimatePresence mode="wait">
        {conversationIndex === 0 ? (
          <motion.div key="book-mesh" className="clay-card border border-white/10 bg-[#070707] rounded-2xl p-4 w-[240px] shadow-[0_4px_30px_rgba(0,0,0,0.5)] flex flex-col gap-2" initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: -10 }}>
            <div className="text-[9px] font-space font-bold uppercase tracking-widest text-slate-400">Dynamic Booking Mesh</div>
            <div className="text-[11px] font-bold text-white mt-1">Select A Time:</div>
            <div className="grid grid-cols-4 gap-1">
              {["Mo", "Tu", "We", "Th"].map((day, i) => (
                <div key={i} className={`p-1 text-center rounded-md border text-[9px] font-bold ${i === 2 ? "bg-emerald-500/10 border-emerald-400/30 text-emerald-300" : "bg-white/5 border-white/5 text-slate-400"}`}>{day}</div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-1 mt-1">
              {["10:00 AM", "11:30 AM"].map((time, i) => (
                <div key={i} className={`p-1 text-center rounded-md border text-[8px] font-bold ${i === 0 ? "bg-emerald-400 text-black" : "bg-white/5 border-white/5 text-slate-300"}`}>{time}</div>
              ))}
            </div>
            <motion.button whileHover={{ scale: 1.02 }} className="w-full mt-1 bg-white/5 text-white font-space font-bold text-[9px] py-1.5 rounded-xl border border-white/10">Confirm</motion.button>
          </motion.div>
        ) : conversationIndex === 1 ? (
          <motion.div key="checkout-adv" className="clay-card border border-white/10 bg-[#070707] rounded-2xl p-4 w-[240px] shadow-[0_4px_30px_rgba(0,0,0,0.5)] flex flex-col gap-2" initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: -10 }}>
            <div className="text-[9px] font-space font-bold uppercase tracking-widest text-slate-400">Fluid Checkout</div>
            <div className="flex justify-between items-center bg-white/5 p-2 rounded-xl border border-white/5">
              <div className="text-[10px] font-bold text-white">Elite Template</div>
              <div className="text-xs font-black font-space text-emerald-400">350 ₾</div>
            </div>
            <motion.button whileHover={{ scale: 1.02 }} className="w-full bg-emerald-400 text-black font-space font-bold text-[10px] py-1.5 rounded-xl">Pay 300 ₾</motion.button>
          </motion.div>
        ) : (
          <motion.div key="cta-popover" className="clay-card border border-white/10 bg-[#070707] rounded-2xl p-4 w-[240px] shadow-[0_4px_30px_rgba(0,0,0,0.5)] flex flex-col gap-2 text-center" initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: -10 }}>
            <div className="text-[10px] font-black font-space text-emerald-300">🎉 DISCOUNT APPLIED!</div>
            <p className="text-[9px] text-slate-200">Book within 10 minutes and save absolute layout.</p>
            <motion.button whileHover={{ scale: 1.02 }} className="w-full bg-emerald-400 text-black font-space font-bold text-[10px] py-1.5 rounded-xl">Claim Now</motion.button>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-1 bg-black/30 backdrop-blur-md px-1.5 py-0.5 rounded-full">
        {[0, 1, 2].map((idx) => <div key={idx} className={`h-1 w-1 rounded-full ${conversationIndex === idx ? "bg-emerald-400" : "bg-white/20"}`} />)}
      </div>
    </div>
  );
}

export function VaultVisual() {
  const [conversationIndex, setConversationIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setDirection(1);
      setConversationIndex((prev) => (prev === 2 ? 0 : prev + 1));
    }, 9000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const chats = [
    [
      { text: "Is the 12-week hypertrophy program still open?", isOwn: false },
      { text: "Absolutely. The 12-week Hypertrophy track is live—specifically engineered for maximum quad density and lower-body power.", isOwn: true },
      { text: "Yes, please! I'm in.", isOwn: false },
      { text: "Excellent. Secure your spot here: [train.ge/legs] — or if you'd like to review your specific goals 1-on-1, book a direct strategy session here: [Link]", isOwn: true, isLink: true },
    ],
    [
      { text: "Do you have the Oversized Black Hoodie in size M?", isOwn: false },
      { text: "Yes! We have 3 left in stock. It features heavy 400gsm combed cotton for a perfect boxy fit.", isOwn: true },
      { text: "Perfect, I'm taking one.", isOwn: false },
      { text: "Awesome. Secure your order here: [shop.ge/hoodie] — or book a fit consultation if you'd like sizing help: [Link]", isOwn: true, isLink: true },
    ],
    [
      { text: "Is the Vake penthouse still available for viewing?", isOwn: false },
      { text: "It is! We are holding viewings this Thursday for the 3-bedroom layout with mountain views.", isOwn: true },
      { text: "I'd love to view it.", isOwn: false },
      { text: "Perfect! Secure a private walkthrough slot here: [home.ge/vake] — or schedule a direct advisor call here: [Link]", isOwn: true, isLink: true },
    ],
  ];

  return (
    <div className="w-full relative min-h-[220px] flex items-center justify-center">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={conversationIndex}
          custom={direction}
          initial={{ opacity: 0, x: direction * 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -direction * 40 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="w-full max-w-xs space-y-1.5 p-4 flex flex-col"
        >
          {chats[conversationIndex].map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.3, duration: 0.25 }}
              className={`p-2 rounded-xl text-[10px] max-w-[85%] font-medium leading-normal ${
                msg.isOwn
                  ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-100 ml-auto shadow-[0_4px_15px_rgba(16,185,129,0.05)]"
                  : "bg-white/5 border border-white/10 text-slate-300"
              }`}
            >
              {msg.isLink ? (
                <span className="break-words">
                  {msg.text.includes("[") ? (
                    msg.text.split(/\[(.*?)\]/).map((part, idx) => 
                      idx % 2 === 1 ? (
                        <span key={idx} className="underline text-emerald-400 font-bold cursor-pointer">{part}</span>
                      ) : part
                    )
                  ) : (
                    msg.text
                  )}
                </span>
              ) : (
                msg.text
              )}
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-1 bg-black/30 backdrop-blur-md px-1.5 py-0.5 rounded-full z-20">
        {[0, 1, 2].map((idx) => (
          <button
            key={idx}
            onClick={() => {
              setDirection(idx > conversationIndex ? 1 : -1);
              setConversationIndex(idx);
              setIsPaused(true);
            }}
            className="p-0.5 focus:outline-none"
          >
            <div className={`h-1 w-1 rounded-full transition-all duration-300 ${conversationIndex === idx ? "bg-emerald-400 w-2.5" : "bg-white/20"}`} />
          </button>
        ))}
      </div>
    </div>
  );
}
