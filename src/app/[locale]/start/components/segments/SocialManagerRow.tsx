"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import type { SocialPlatformId } from "../../lib/types";

const SOCIAL_LABELS: Record<SocialPlatformId, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  linkedin: "LinkedIn",
  tiktok: "TikTok",
  youtube: "YouTube",
};

const SOCIAL_PLACEHOLDERS: Record<SocialPlatformId, string> = {
  facebook: "https://facebook.com/yourpage",
  instagram: "https://instagram.com/yourname",
  linkedin: "https://linkedin.com/in/yourname",
  tiktok: "https://tiktok.com/@yourname",
  youtube: "https://youtube.com/@yourchannel",
};

function isLikelyUrl(value: string): boolean {
  const v = value.trim();
  if (!v) return true;
  return /^https?:\/\/\S+/i.test(v);
}

export function SocialManagerRow({
  id,
  checked,
  canMoveUp,
  canMoveDown,
  value,
  onToggle,
  onMove,
  onChangeUrl,
  useSecondary,
}: {
  id: SocialPlatformId;
  checked: boolean;
  canMoveUp: boolean;
  canMoveDown: boolean;
  value: string;
  onToggle: () => void;
  onMove: (dir: -1 | 1) => void;
  onChangeUrl: (id: SocialPlatformId, value: string) => void;
  useSecondary: boolean;
}) {
  const urlOk = isLikelyUrl(value);
  const inputId = `social-toggle-${id}`;
  return (
    <div className={`rounded-lg border border-white/10 px-2.5 py-2 text-xs ${checked ? "bg-white/10" : "bg-white/[0.03]"}`}>
      <div className="flex items-center gap-2">
        <input id={inputId} type="checkbox" checked={checked} onChange={onToggle} className="h-3.5 w-3.5" />
        <label htmlFor={inputId} className="flex-1 cursor-pointer">
          {SOCIAL_LABELS[id]}
        </label>
        <div className="flex gap-1">
          <button type="button" disabled={!canMoveUp} onClick={() => onMove(-1)} className="rounded p-1 text-white/70 transition hover:bg-white/10 hover:text-white disabled:opacity-30" aria-label={`Move ${SOCIAL_LABELS[id]} up`}>
            <ChevronUp className="h-3.5 w-3.5" />
          </button>
          <button type="button" disabled={!canMoveDown} onClick={() => onMove(1)} className="rounded p-1 text-white/70 transition hover:bg-white/10 hover:text-white disabled:opacity-30" aria-label={`Move ${SOCIAL_LABELS[id]} down`}>
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
      {checked ? (
        <div className="mt-2">
          <input
            type="url"
            value={value}
            placeholder={SOCIAL_PLACEHOLDERS[id]}
            onChange={(e) => onChangeUrl(id, e.target.value)}
            className={`w-full rounded-md border bg-white/10 px-2 py-1.5 text-xs text-white placeholder:text-white/35 focus:outline-none ${urlOk ? "border-white/20 focus:border-white/40" : "border-amber-300/70 focus:border-amber-200"}`}
          />
          {!urlOk ? <p className="mt-1 text-[10px] text-amber-200">{useSecondary ? "გამოიყენე სრული URL https://-ით" : "Use full URL starting with https://"}</p> : null}
        </div>
      ) : null}
    </div>
  );
}
