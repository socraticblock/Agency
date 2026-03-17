'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, MessageCircle } from 'lucide-react';

export default function FloatingStrategist() {
  const [isOpen, setIsOpen] = useState(false);

  // Configuration links OR can be configured via props
  const telegramUrl = "https://t.me/KvaliStrategistBot";
  const whatsappUrl = "https://wa.me/your_phone_number"; // Replace with actual

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Menu Options */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="flex flex-col gap-2 w-64 bg-zinc-950/80 backdrop-blur-xl border border-white/10 rounded-2xl p-2.5 shadow-2xl origin-bottom-right"
          >
            <a
              href={telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-emerald-500/5 transition-all border border-transparent hover:border-emerald-500/20 group"
            >
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform duration-300">
                <Bot size={18} />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-zinc-100 group-hover:text-emerald-400 transition-colors">Consult the AI</span>
                <span className="text-xs text-zinc-400">Pre-qualify and strategize</span>
              </div>
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-emerald-500/5 transition-all border border-transparent hover:border-emerald-500/20 group border-t border-t-white/5"
            >
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform duration-300">
                <MessageCircle size={18} />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-zinc-100 group-hover:text-emerald-400 transition-colors">Human Handshake</span>
                <span className="text-xs text-zinc-400">Direct WhatsApp payload</span>
              </div>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Trigger Button */}
      <motion.button
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 100, damping: 20 }}
        onClick={toggleMenu}
        className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-zinc-950/70 backdrop-blur-md border border-white/10 hover:border-emerald-500/30 transition-all duration-300 group shadow-xl hover:shadow-emerald-500/5 hover-emerald-500/5 cursor-pointer text-left select-none"
      >
        <div className="relative">
          <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></div>
          <div className="absolute inset-0 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping"></div>
        </div>
        <span className="text-sm font-medium tracking-wide text-zinc-300 group-hover:text-white transition-colors">
          Strategist Active — Response <span className="font-mono text-emerald-400 font-bold">&lt; 2s</span>
        </span>
      </motion.button>
    </div>
  );
}
