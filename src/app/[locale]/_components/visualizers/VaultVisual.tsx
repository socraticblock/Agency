"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
