"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, CircleSlash } from "lucide-react";
import { SERVICE_ICON_MAP, CURATED_SERVICE_ICONS } from "../lib/service-icons";
import { useEffect, useRef } from "react";

interface ServiceIconPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (iconName: string | null) => void;
  currentIcon: string | null;
}

export function ServiceIconPicker({
  isOpen,
  onClose,
  onSelect,
  currentIcon,
}: ServiceIconPickerProps) {
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            ref={pickerRef}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="start-glass-heavy relative w-full max-w-md overflow-hidden bg-[#030717]/90 p-6 shadow-2xl"
            style={{ border: "1px solid rgba(16, 185, 129, 0.2)" }}
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">Choose an Icon</h3>
                <p className="text-sm text-slate-400">Select a professional symbol for this service.</p>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-2 text-slate-400 hover:bg-white/5 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-5 gap-3 max-h-[320px] overflow-y-auto pr-2 custom-scrollbar">
              {/* "None" Option */}
              <button
                onClick={() => {
                  onSelect(null);
                  onClose();
                }}
                className={`flex aspect-square flex-col items-center justify-center rounded-xl border transition-all ${
                  currentIcon === null
                    ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                    : "border-white/5 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                <CircleSlash className="h-6 w-6" />
                <span className="mt-1 text-[10px] font-medium font-sans uppercase tracking-wider">None</span>
              </button>

              {CURATED_SERVICE_ICONS.map((name) => {
                const Icon = SERVICE_ICON_MAP[name];
                const isSelected = currentIcon === name;
                return (
                  <button
                    key={name}
                    onClick={() => {
                      onSelect(name);
                      onClose();
                    }}
                    className={`flex aspect-square items-center justify-center rounded-xl border transition-all ${
                      isSelected
                        ? "border-emerald-500 bg-emerald-500/10 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                        : "border-white/5 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                    }`}
                    title={name}
                  >
                    <Icon className="h-6 w-6" />
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={onClose}
                className="rounded-lg bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
