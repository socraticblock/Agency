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
    <div
      className={
        "flex items-center gap-3 rounded-[10px] border px-3 py-2.5 " +
        (active ? "border-cyan-100/35 bg-cyan-100/[.06]" : "border-white/[.1]")
      }
    >
      <span
        aria-hidden
        className={
          "h-2 w-2 shrink-0 rounded-full " +
          (active ? "bg-cyan-200 shadow-[0_0_12px_rgba(165,243,252,.8)]" : "bg-white/30")
        }
      />
      <div className="min-w-0 flex-1">
        <p
          className={
            "truncate text-[10px] font-extrabold uppercase tracking-[.14em] " +
            (active ? "text-white" : "text-white/70")
          }
        >
          {label}
        </p>
        <div className="mt-2 space-y-1">
          <Bar className="h-1 w-[70%] bg-white/18" />
          <Bar className="h-1 w-[46%] bg-white/13" />
        </div>
      </div>
      {active && <span aria-hidden className="mr-0.5 text-[11px] font-black text-cyan-100/80">→</span>}
    </div>
  );
}

function Frame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={"rounded-[16px] border border-white/[.12] bg-[#0c1826] p-4 " + className}>
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
      className="relative overflow-hidden rounded-[24px] border border-white/[.14] bg-[#08131f] p-3 shadow-[0_30px_90px_rgba(0,0,0,.45)] sm:p-5"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_86%_12%,rgba(165,243,252,.09),transparent_32%)]" />

      <div className="relative flex items-center justify-between px-1 pb-4">
        <span className="font-space text-[11px] font-black uppercase tracking-[.28em] text-white">
          Genezisi
        </span>
        <span className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[.2em] text-cyan-100/75">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-200 shadow-[0_0_10px_rgba(165,243,252,.85)]" />
          Live
        </span>
      </div>

      <div className="relative grid gap-3 sm:grid-cols-[1.06fr_.94fr]">
        {/* A composed editorial page: nav strip, headline, body, media, actions. */}
        <Frame>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-white/30" />
            <span className="h-2 w-2 rounded-full bg-white/30" />
            <span className="h-2 w-2 rounded-full bg-white/30" />
            <Bar className="ml-2 h-2 w-14 bg-white/25" />
            <Bar className="ml-auto h-2 w-8 bg-white/15" />
          </div>

          <div className="mt-6 space-y-2.5">
            <Bar className="h-3.5 w-[88%] bg-white/32" />
            <Bar className="h-3.5 w-[58%] bg-white/24" />
          </div>

          <div className="mt-4 space-y-2">
            <Bar className="h-1.5 w-full bg-white/16" />
            <Bar className="h-1.5 w-[74%] bg-white/13" />
          </div>

          <div className="mt-5 h-16 rounded-[10px] border border-white/[.14] bg-[radial-gradient(circle_at_28%_28%,rgba(165,243,252,.2),transparent_64%)]" />

          <div className="mt-4 flex items-center gap-2">
            <span className="flex h-7 w-20 items-center justify-center rounded-full bg-white/90 text-[11px] font-black leading-none text-[#071019]">
              →
            </span>
            <span className="flex h-7 w-16 items-center justify-center gap-1 rounded-full border border-white/20">
              <span className="h-1 w-4 rounded-full bg-white/35" />
              <span className="h-1 w-3 rounded-full bg-white/25" />
            </span>
          </div>
        </Frame>

        <Frame className="flex flex-col">
          <span className="text-[9px] font-black uppercase tracking-[.18em] text-white/55">System</span>
          <div className="mt-4 space-y-2">
            <SystemRow label="Website" />
            <SystemRow label="Systems" active />
            <SystemRow label="Workflow" />
          </div>
          <div className="mt-auto flex items-center gap-3 pt-4">
            <span className="h-px flex-1 bg-white/15" />
            <Signal quiet />
            <span className="text-[9px] font-black uppercase tracking-[.18em] text-white/55">Ready</span>
          </div>
        </Frame>
      </div>
    </div>
  );
}
