"use client";

import { useEffect, useState } from "react";
import type { Lane1CustomizerState } from "../lib/types";
import { TypographyHexColorRow } from "./segments/TypographyHexColorRow";

type OverlaySlot = 1 | 2 | 3;

/** One color row + stop selector for overlay gradients (replaces multiple native color inputs). */
export function BackgroundOverlayUnifiedColors({
  state,
  onPatch,
  useSecondary,
}: {
  state: Lane1CustomizerState;
  onPatch: (p: Partial<Lane1CustomizerState["style"]>) => void;
  useSecondary?: boolean;
}) {
  const { bgOverlayId, bgOverlayColor1, bgOverlayColor2, bgOverlayColor3 } = state.style;
  const [slot, setSlot] = useState<OverlaySlot>(1);

  useEffect(() => {
    setSlot(1);
  }, [bgOverlayId]);

  const maxSlot: OverlaySlot =
    bgOverlayId === "mesh" ? 3 : bgOverlayId === "solid" ? 1 : bgOverlayId === "none" ? 1 : 2;

  useEffect(() => {
    if (slot > maxSlot) setSlot(maxSlot);
  }, [maxSlot, slot]);

  const value = slot === 1 ? bgOverlayColor1 : slot === 2 ? bgOverlayColor2 : bgOverlayColor3;
  const onColorChange = (v: string) => {
    if (slot === 1) onPatch({ bgOverlayColor1: v });
    else if (slot === 2) onPatch({ bgOverlayColor2: v });
    else onPatch({ bgOverlayColor3: v });
  };

  const stopLabel =
    slot === 1
      ? useSecondary
        ? "ფერი 1 (ძირითადი)"
        : "Color 1 (primary)"
      : slot === 2
        ? useSecondary
          ? "ფერი 2"
          : "Color 2"
        : useSecondary
          ? "ფერი 3"
          : "Color 3";

  if (bgOverlayId === "none") return null;

  const stopPillClass = (n: OverlaySlot) =>
    slot === n
      ? "border-[#1A2744] bg-white text-[#1A2744] shadow-sm ring-2 ring-[#1A2744]/20"
      : "border-slate-200/90 bg-white/90 text-slate-700 [@media(hover:hover)]:hover:border-slate-300 [@media(hover:hover)]:hover:bg-slate-50/80";

  return (
    <div className="space-y-3">
      {bgOverlayId !== "solid" ? (
        <div className="space-y-2">
          <span className="block text-[10px] font-bold uppercase tracking-wide text-slate-500">
            {useSecondary ? "გრადიენტის სტოპები" : "Gradient stops"}
          </span>
          <div
            className="flex flex-wrap gap-2"
            role="radiogroup"
            aria-label={useSecondary ? "გრადიენტის სტოპი" : "Gradient color stop"}
          >
            {([1, 2, 3] as const)
              .filter((n) => n <= maxSlot)
              .map((n) => (
                <button
                  key={n}
                  type="button"
                  role="radio"
                  aria-checked={slot === n}
                  onClick={() => setSlot(n)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${stopPillClass(n)}`}
                >
                  {useSecondary ? `სტოპი ${n}` : `Stop ${n}`}
                </button>
              ))}
          </div>
        </div>
      ) : null}
      <TypographyHexColorRow
        label={bgOverlayId === "solid" ? (useSecondary ? "გადაფარვის ფერი" : "Overlay color") : stopLabel}
        value={value}
        onChange={onColorChange}
        useSecondary={useSecondary}
      />
    </div>
  );
}
