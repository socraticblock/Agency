"use client";

export function TypographyHexColorRow({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const safe = /^#[0-9A-Fa-f]{6}$/.test(value.trim()) ? value.trim() : "#1a2744";
  return (
    <div className="space-y-1">
      <span className="start-label block">{label}</span>
      <div className="flex flex-wrap items-center gap-2">
        <input
          type="color"
          value={safe}
          onChange={(e) => onChange(e.target.value)}
          className="h-9 w-14 cursor-pointer rounded border border-slate-200 bg-white"
          aria-label={`${label} color`}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Auto (from preset)"
          className="h-9 min-w-[8rem] flex-1 rounded border border-slate-200 px-2 font-mono text-xs"
          spellCheck={false}
        />
        {value.trim() ? (
          <button
            type="button"
            className="text-[10px] font-semibold uppercase text-slate-500 underline"
            onClick={() => onChange("")}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}
