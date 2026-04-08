"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { Lane1CustomizerState, SectionId } from "../../lib/types";

interface SectionEditorDrawerProps {
  activeSection: SectionId | null;
  setActiveSection: (sectionId: SectionId | null) => void;
  state: Lane1CustomizerState;
  useSecondary: boolean;
  patch: (p: Partial<Lane1CustomizerState>) => void;
  setServiceLine: (i: number, v: string) => void;
  setServiceDescriptionLine: (i: number, v: string) => void;
}

export function SectionEditorDrawer({
  activeSection,
  setActiveSection,
  state,
  useSecondary,
  patch,
  setServiceLine,
  setServiceDescriptionLine,
}: SectionEditorDrawerProps) {
  const isOpen = activeSection === "about" || activeSection === "services";
  if (!isOpen) return null;

  const aboutValue = useSecondary ? state.aboutBioSecondary : state.aboutBio;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[250] hidden md:block"
      >
        <button
          type="button"
          className="absolute inset-0 bg-black/25 backdrop-blur-[1px]"
          onClick={() => setActiveSection(null)}
          aria-label="Close section editor"
        />
        <motion.aside
          initial={{ x: 28, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 28, opacity: 0 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="absolute right-4 top-4 h-[calc(100vh-2rem)] w-[min(460px,46vw)] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl"
        >
          <div className="mb-4 flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {activeSection === "about" ? "Edit About" : "Edit Services"}
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                {activeSection === "about"
                  ? "Update your About section content."
                  : "Manage your visible services and descriptions."}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setActiveSection(null)}
              className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
              aria-label="Close editor"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {activeSection === "about" ? (
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                About text
              </label>
              <textarea
                value={aboutValue}
                onChange={(e) =>
                  patch(useSecondary ? { aboutBioSecondary: e.target.value } : { aboutBio: e.target.value })
                }
                placeholder="Tell visitors who you are and what you do..."
                className="min-h-[220px] w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-800 outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
              />
            </div>
          ) : (
            <div className="space-y-4">
              {Array.from({ length: state.serviceCount }).map((_, i) => {
                const title = useSecondary ? state.serviceAreasSecondary[i] ?? "" : state.serviceAreas[i] ?? "";
                const description = useSecondary
                  ? state.serviceDescriptionsSecondary[i] ?? ""
                  : state.serviceDescriptions[i] ?? "";
                return (
                  <div key={i} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                    <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                      Service {i + 1}
                    </p>
                    <input
                      value={title}
                      onChange={(e) => setServiceLine(i, e.target.value)}
                      placeholder={`Service ${i + 1} title`}
                      className="mb-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
                    />
                    <textarea
                      value={description}
                      onChange={(e) => setServiceDescriptionLine(i, e.target.value)}
                      placeholder="Service description..."
                      className="min-h-[88px] w-full rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-800 outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
                    />
                  </div>
                );
              })}
            </div>
          )}
        </motion.aside>
      </motion.div>
    </AnimatePresence>
  );
}
