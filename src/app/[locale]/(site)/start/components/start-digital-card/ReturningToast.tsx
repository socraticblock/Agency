"use client";

import { useEffect } from "react";
import { Sparkles } from "lucide-react";
import { START_DC_TOAST } from "@/constants/start-digital-card-copy";

type Props = {
  show: boolean;
  onDismiss: () => void;
};

export function ReturningToast({ show, onDismiss }: Props) {
  useEffect(() => {
    if (!show) return;
    const t = window.setTimeout(onDismiss, 3000);
    return () => window.clearTimeout(t);
  }, [show, onDismiss]);

  if (!show) return null;

  return (
    <div
      className="start-dc-toast fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-[165] flex items-center gap-2 rounded-lg border border-white/10 bg-slate-800 px-4 py-2 text-sm text-white shadow-lg"
      role="status"
    >
      <Sparkles className="h-4 w-4 shrink-0 text-emerald-400" aria-hidden />
      <span>{START_DC_TOAST.message} ✨</span>
    </div>
  );
}
