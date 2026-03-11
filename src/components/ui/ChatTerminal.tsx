"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SOVEREIGN_CONCIERGE_SYSTEM_PROMPT } from "@/lib/agents/sovereignConciergePrompt";

type Props = {
  locale?: string;
  onSend?: (message: string) => void;
};

/**
 * Terminal-style chat UI for the Kvali Sovereign Concierge.
 * Backend (e.g. agency-agents) should use SOVEREIGN_CONCIERGE_SYSTEM_PROMPT
 * when processing messages.
 */
export function ChatTerminal({ locale = "en", onSend }: Props) {
  const [input, setInput] = useState("");
  const [lines, setLines] = useState<{ role: "user" | "assistant"; text: string }[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = input.trim();
    if (!msg) return;
    setLines((prev) => [...prev, { role: "user", text: msg }]);
    setInput("");
    onSend?.(msg);
    // Placeholder reply until backend is wired
    setLines((prev) => [
      ...prev,
      {
        role: "assistant",
        text: "Share your Instagram handle and your biggest conversion bottleneck. If you have 10k+ followers or 10k+ GEL monthly revenue, I’ll provide your Sovereignty Score and a link to the Lead Architect’s calendar.",
      },
    ]);
  };

  return (
    <div className="glass-card max-w-2xl rounded-2xl overflow-hidden">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-2 w-2 rounded-full bg-red-500" />
        <span className="h-2 w-2 rounded-full bg-amber-400" />
        <span className="h-2 w-2 rounded-full bg-emerald-500" />
        <span className="ml-2 font-mono text-xs text-zinc-500">
          Kvali Sovereign Concierge
        </span>
      </div>
      <div className="max-h-80 overflow-y-auto p-4 font-mono text-sm">
        {lines.length === 0 && (
          <p className="text-zinc-500">
            Ask for Instagram handle and conversion bottleneck. Qualify 10k+
            followers or 10k+ GEL/mo → Sovereignty Score + calendar link.
          </p>
        )}
        {lines.map((line, i) => (
          <div
            key={i}
            className={
              line.role === "user"
                ? "mt-2 text-emerald-300"
                : "mt-2 text-slate-300"
            }
          >
            {line.role === "user" ? "> " : ""}
            {line.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="border-t border-white/10 p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-lg border border-white/10 bg-black/40 px-3 py-2 font-mono text-sm text-white outline-none focus:border-emerald-500"
          />
          <motion.button
            type="submit"
            whileTap={{ scale: 0.98 }}
            className="rounded-lg bg-emerald-500 px-4 py-2 font-mono text-xs font-semibold text-black"
          >
            Send
          </motion.button>
        </div>
      </form>
    </div>
  );
}
