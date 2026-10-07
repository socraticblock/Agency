import type { ReactNode } from "react";

/** Single restrained cyan signal used across the V2 homepage. */
export function Signal({ quiet = false }: { quiet?: boolean }) {
  const glow = quiet
    ? "h-2 w-2 shadow-[0_0_12px_rgba(34,211,238,.45)]"
    : "h-3 w-3 shadow-[0_0_14px_rgba(34,211,238,.95),0_0_40px_rgba(34,211,238,.45)]";
  return <span aria-hidden className={"inline-block rounded-full bg-cyan-200 " + glow} />;
}

function Bar({ className }: { className: string }) {
  return <span aria-hidden className={"block rounded-full " + className} />;
}

function SystemRow({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <div className="flex items-center gap-3 rounded-[10px] border border-white/[.06] px-3 py-2.5">
      <span
        aria-hidden
        className={
          "h-1.5 w-1.5 shrink-0 rounded-full " +
          (active ? "bg-cyan-200 shadow-[0_0_10px_rgba(165,243,252,.7)]" : "bg-white/20")
        }
      />
      <div className="min-w-0 flex-1">
        <p className="truncate text-[10px] font-extrabold uppercase tracking-[.14em] text-white/62">{label}</p>
        <div className="mt-2 space-y-1">
          <Bar className="h-1 w-[70%] bg-white/[.08]" />
          <Bar className="h-1 w-[46%] bg-white/[.06]" />
        </div>
      </div>
    </div>
  );
}

function Frame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={"rounded-[16px] border border-white/[.08] bg-[#0a141f] p-4 " + className}>
      {children}
    </div>
  );
}

/**
 * Genezisi-owned abstract/editorial interface.
 *
 * Deliberately contains no client identity, no client enquiry and no marketing
 * claim: only the Genezisi wordmark, structural UI shapes, editorial content
 * blocks and a single live cyan signal. Purely presentational.
 */
export function HeroInterface() {
  return (
    <div
      aria-hidden
      className="relative overflow-hidden rounded-[24px] border border-white/[.1] bg-[#071019] p-3 shadow-[0_30px_90px_rgba(0,0,0,.38)] sm:p-5"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_86%_12%,rgba(165,243,252,.07),transparent_30%)]" />

      <div className="relative flex items-center justify-between px-1 pb-4">
        <span className="font-space text-[11px] font-black uppercase tracking-[.28em] text-white/85">
          Genezisi
        </span>
        <span className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[.2em] text-cyan-100/60">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-200 shadow-[0_0_10px_rgba(165,243,252,.75)]" />
          Live
        </span>
      </div>

      <div className="relative grid gap-3 sm:grid-cols-[1.06fr_.94fr]">
        <Frame>
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
            <Bar className="ml-2 h-1.5 w-16 bg-white/10" />
          </div>

          <div className="mt-5 space-y-2.5">
            <Bar className="h-3 w-[86%] bg-white/[.16]" />
            <Bar className="h-3 w-[58%] bg-white/[.11]" />
          </div>

          <div className="mt-4 space-y-1.5">
            <Bar className="h-1.5 w-full bg-white/[.07]" />
            <Bar className="h-1.5 w-[74%] bg-white/[.07]" />
          </div>

          <div className="mt-5 h-16 rounded-[10px] border border-white/[.07] bg-[radial-gradient(circle_at_28%_28%,rgba(165,243,252,.12),transparent_62%)]" />

          <div className="mt-4 flex items-center gap-2">
            <span className="h-6 w-20 rounded-full bg-white/85" />
            <span className="h-6 w-14 rounded-full border border-white/[.14]" />
          </div>
        </Frame>

        <Frame className="flex flex-col">
          <span className="text-[9px] font-black uppercase tracking-[.18em] text-white/40">System</span>
          <div className="mt-4 space-y-2">
            <SystemRow label="Website" />
            <SystemRow label="Systems" active />
            <SystemRow label="Workflow" />
          </div>
          <div className="mt-auto flex items-center gap-3 pt-4">
            <span className="h-px flex-1 bg-white/[.09]" />
            <Signal quiet />
            <span className="text-[9px] font-black uppercase tracking-[.18em] text-white/38">Ready</span>
          </div>
        </Frame>
      </div>
    </div>
  );
}
