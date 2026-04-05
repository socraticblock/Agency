import { useState } from "react";

export function ServiceCountStepper({
  value,
  onChange,
}: {
  value: number;
  onChange: (n: number) => void;
}) {
  const [pulse, setPulse] = useState(false);
  function bump(delta: number) {
    const n = Math.min(4, Math.max(1, value + delta));
    if (n !== value) {
      onChange(n);
      setPulse(true);
      window.setTimeout(() => setPulse(false), 150);
    }
  }
  return (
    <div className="flex items-center justify-center gap-4 py-1">
      <button
        type="button"
        disabled={value <= 1}
        onClick={() => bump(-1)}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-[#F3F4F6] text-lg font-semibold text-[#111827] transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Decrease service count"
      >
        −
      </button>
      <span
        className={`min-w-[2rem] text-center text-xl font-semibold tabular-nums transition-transform duration-150 ${
          pulse ? "scale-125" : "scale-100"
        }`}
      >
        {value}
      </span>
      <button
        type="button"
        disabled={value >= 4}
        onClick={() => bump(1)}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-[#F3F4F6] text-lg font-semibold text-[#111827] transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Increase service count"
      >
        +
      </button>
    </div>
  );
}
