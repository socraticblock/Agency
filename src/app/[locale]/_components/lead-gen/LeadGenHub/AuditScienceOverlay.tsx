import { motion, AnimatePresence } from "framer-motion";
import { AuditCitation } from "../AuditCitation";

export function AuditScienceOverlay({
  isScienceOpen,
  setIsScienceOpen,
  TOOL_IDS,
  activeIndex,
  t,
}: {
  isScienceOpen: boolean;
  setIsScienceOpen: (v: boolean) => void;
  TOOL_IDS: string[];
  activeIndex: number;
  t: any;
}) {
  return (
    <AnimatePresence>
      {isScienceOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsScienceOpen(false)}
          className="fixed inset-0 z-[600] flex items-center justify-center p-6 bg-zinc-950/90 backdrop-blur-3xl cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl relative cursor-default"
          >
            <button
              onClick={() => setIsScienceOpen(false)}
              className="absolute -top-12 right-0 h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="clay-card p-2">
              {(() => {
                const currentTool = TOOL_IDS[activeIndex];
                let data = { point: "", explanation: "", source: "" };

                if (currentTool === 'audience') {
                  data = {
                    point: t.leadTools?.audience?.citationPoint,
                    explanation: t.leadTools?.audience?.citationExplanation,
                    source: t.leadTools?.audience?.citationSource
                  };
                } else if (currentTool === 'weekend') {
                  data = {
                    point: "82% of consumers demand an immediate response.",
                    explanation: "Modern commerce operates 24/7. When your business sleeps, your competitors don't.",
                    source: "HubSpot Consumer Survey / Sprout Social Index"
                  };
                } else if (currentTool === 'friction') {
                  data = {
                    point: t.leadTools?.friction?.citationPoint,
                    explanation: t.leadTools?.friction?.citationExplanation,
                    source: t.leadTools?.friction?.citationSource
                  };
                } else if (currentTool === 'time') {
                  data = {
                    point: "Context switching costs 23 minutes of focus per interruption.",
                    explanation: "Every time you pause deep work to answer a basic 'how much is this?' DM, you pay a massive Time Debt.",
                    source: "UC Irvine Study"
                  };
                } else if (currentTool === 'risk') {
                  data = {
                    point: t.leadTools?.risk?.citationPoint,
                    explanation: t.leadTools?.risk?.citationExplanation,
                    source: t.leadTools?.risk?.citationSource
                  };
                }

                return (
                  <AuditCitation
                    dataPoint={data.point}
                    explanation={data.explanation}
                    source={data.source}
                  />
                );
              })()}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
