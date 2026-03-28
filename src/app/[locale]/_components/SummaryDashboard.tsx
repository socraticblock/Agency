"use client";

import { AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { FOUNDATIONS } from "@/constants/pricing";
import { buildLoadingPhrases } from "@/constants/content";
import { getOrCreateBlueprintId } from "@/lib/blueprint/clientBlueprintId";

import ReviewPhase from "./summary/ReviewPhase";
import AnalyzingOverlay from "./summary/AnalyzingOverlay";
import HandoverFlow from "./summary/HandoverFlow";
import VipCheckInModal from "./summary/VipCheckInModal";

function truncateDisplay(s: string, max: number): string {
  const t = s.trim();
  if (!t) return "";
  return t.length <= max ? t : `${t.slice(0, max)}…`;
}

export type SummaryDashboardProps = {
  foundation: string | null;
  selectedModules: string[];
  answers: Record<string, unknown>;
  goToStep: (s: 1 | 2 | 3 | 4 | 5) => boolean;
  setDiscoveryStep: (n: number) => void;
  setIsEditing: (v: boolean) => void;
  moduleQuantities: Record<string, number>;
  shieldTier: number;
  oneTimeTotal: number;
  monthlyTotal: number;
};

export default function SummaryDashboard({
  foundation,
  selectedModules,
  answers,
  goToStep,
  setDiscoveryStep,
  setIsEditing,
  moduleQuantities,
  shieldTier,
  oneTimeTotal,
  monthlyTotal,
}: SummaryDashboardProps) {
  // ── Stage Machine ──
  const [stages, setStage] = useState<"review" | "analyzing" | "handover">("review");
  const [progress, setProgress] = useState(0);
  const [loadingIndex, setLoadingIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [blueprintId, setBlueprintId] = useState<string | null>(null);
  const [vipModalOpen, setVipModalOpen] = useState(false);
  const [vipError, setVipError] = useState<string | null>(null);

  // ── Lead State ──
  const [lead, setLead] = useState<{ name: string; company: string; email: string; preference: string }>(() => {
    if (typeof window === "undefined") return { name: "", company: "", email: "", preference: "whatsapp" };
    try {
      const saved = localStorage.getItem("genezisi_lead_node");
      if (saved) return JSON.parse(saved);
    } catch {}
    return { name: "", company: "", email: "", preference: "whatsapp" };
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("genezisi_lead_node", JSON.stringify(lead));
    }
  }, [lead]);

  const [emailRequested, setEmailRequested] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [priority, setPriority] = useState<"whatsapp" | "email" | null>(null);
  const [isSuccessDispatched, setIsSuccessDispatched] = useState(false);

  // ── Derived ──
  const activeFoundation = FOUNDATIONS.find((f) => f.id === foundation);
  const palette = answers["color_palette"];
  const colors = Array.isArray(palette) ? (palette as string[]) : (["#10b981"] as string[]);
  const dominantColor = colors[0] || "#10b981";

  const loadingPhrases = useMemo(
    () =>
      buildLoadingPhrases({
        company: truncateDisplay(lead.company, 40),
        name: truncateDisplay(lead.name, 36),
        foundationName: activeFoundation?.name || "Foundation",
        dominantColor,
      }),
    [activeFoundation?.name, dominantColor, lead.company, lead.name]
  );

  // ── Analyzing Animation ──
  useEffect(() => {
    if (stages !== "analyzing") return;
    setProgress(0);
    setLoadingIndex(0);

    const phraseLen = loadingPhrases.length;
    const textInterval = setInterval(() => {
      setLoadingIndex((prev) => (prev + 1) % phraseLen);
    }, 800);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(textInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => {
      clearInterval(textInterval);
      clearInterval(progressInterval);
    };
  }, [stages, loadingPhrases]);

  // ── VIP Modal Escape ──
  useEffect(() => {
    if (!vipModalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setVipModalOpen(false);
        setVipError(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [vipModalOpen]);

  // ── Handlers ──
  const handleEdit = (stepNum: 1 | 2 | 3 | 4 | 5, questionIndex?: number) => {
    goToStep(stepNum);
    setIsEditing(true);
    if (questionIndex !== undefined) {
      setDiscoveryStep(questionIndex);
    }
  };

  const openVipCheckIn = () => {
    setSubmitError(null);
    setVipError(null);
    if (lead.name.trim() && lead.company.trim()) {
      void secureBlueprintAndAnalyze();
    } else {
      setVipModalOpen(true);
    }
  };

  const secureBlueprintAndAnalyze = async () => {
    const name = lead.name.trim();
    const company = lead.company.trim();
    if (!name || !company) {
      setVipError("Please enter your full name and company name.");
      return;
    }
    setVipError(null);
    setVipModalOpen(false);
    setStage("analyzing");
    setSubmitError(null);

    try {
      const id = getOrCreateBlueprintId();
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setBlueprintId(id);
      setStage("handover");
    } catch (error: unknown) {
      console.error("BLUEPRINT HANDOVER FAILURE:", error);
      const message = error instanceof Error ? error.message : "Connection Failed - Try Again";
      setSubmitError(message);
      setStage("review");
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blueprintId) return;
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const httpRes = await fetch("/api/blueprint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: lead.email.trim(),
          answers,
          foundation,
          selectedModules,
          moduleQuantities,
          shieldTier,
          oneTimeTotal,
          monthlyTotal,
          blueprintId,
          leadName: lead.name.trim(),
          leadCompany: lead.company.trim(),
          preference: priority || lead.preference,
          skipAdmin: isSuccessDispatched,
        }),
      });
      const json = (await httpRes.json()) as { success?: boolean; error?: string };

      if (!httpRes.ok || !json.success) {
        throw new Error(json.error || `Request failed (${httpRes.status})`);
      }
      if (isSuccessDispatched) {
        setIsEmailSent(true);
      } else {
        setIsSuccessDispatched(true);
      }
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : "Could not send email. Try again or use WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Render ──
  return (
    <div className="w-full max-w-[1440px] px-8 mx-auto py-10 flex flex-col gap-8">
      <AnimatePresence mode="wait">
        {stages === "review" && (
          <ReviewPhase
            foundation={foundation}
            selectedModules={selectedModules}
            answers={answers}
            shieldTier={shieldTier}
            oneTimeTotal={oneTimeTotal}
            monthlyTotal={monthlyTotal}
            handleEdit={handleEdit}
            openVipCheckIn={openVipCheckIn}
            submitError={submitError}
          />
        )}

        {stages === "handover" && (
          <HandoverFlow
            blueprintId={blueprintId}
            lead={lead}
            setLead={setLead}
            priority={priority}
            setPriority={setPriority}
            isSuccessDispatched={isSuccessDispatched}
            setIsSuccessDispatched={setIsSuccessDispatched}
            emailRequested={emailRequested}
            setEmailRequested={setEmailRequested}
            isEmailSent={isEmailSent}
            setIsEmailSent={setIsEmailSent}
            isSubmitting={isSubmitting}
            submitError={submitError}
            handleLeadSubmit={handleLeadSubmit}
            setStage={setStage}
            answers={answers}
            foundation={foundation}
            selectedModules={selectedModules}
            moduleQuantities={moduleQuantities}
            shieldTier={shieldTier}
            oneTimeTotal={oneTimeTotal}
            monthlyTotal={monthlyTotal}
          />
        )}
      </AnimatePresence>

      <AnalyzingOverlay
        isVisible={stages === "analyzing"}
        progress={progress}
        loadingPhrases={loadingPhrases}
        loadingIndex={loadingIndex}
      />

      <VipCheckInModal
        isOpen={vipModalOpen}
        onClose={() => {
          setVipModalOpen(false);
          setVipError(null);
        }}
        lead={lead}
        setLead={setLead}
        onSecure={() => void secureBlueprintAndAnalyze()}
        vipError={vipError}
      />
    </div>
  );
}
