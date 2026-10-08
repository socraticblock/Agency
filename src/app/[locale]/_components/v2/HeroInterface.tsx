import type { V2Copy } from "./hero.copy";

/** Single restrained cyan signal used across the V2 homepage. */
export function Signal({ quiet = false }: { quiet?: boolean }) {
  const glow = quiet
    ? "h-2 w-2 shadow-[0_0_12px_rgba(34,211,238,.45)]"
    : "h-3 w-3 shadow-[0_0_14px_rgba(34,211,238,.95),0_0_40px_rgba(34,211,238,.45)]";
  return <span aria-hidden className={"inline-block rounded-full bg-cyan-200 " + glow} />;
}

/**
 * The hero's right-hand plate.
 *
 * Type-led, deliberately not a mock application. The previous version imitated
 * a browser window — three dots, seven placeholder bars, two buttons with no
 * labels — so it read as a loading skeleton, and its six labels (LIVE, SYSTEM,
 * WEBSITE, SYSTEMS, WORKFLOW, READY) were hardcoded English inside the Georgian
 * page.
 *
 * This states the three things Genezisi builds, in the visitor's language and
 * from the same copy module as the rest of the page, with one cyan signal
 * marking the active node. Every string here is roadmap copy.
 *
 * Presentational (`aria-hidden`): the same three capabilities are already
 * stated in the hero copy and again in the "What I do" section, so exposing
 * them here would only repeat them.
 */
export function HeroInterface({ copy }: { copy: V2Copy }) {
  const nodes = [
    { label: copy.websiteTitle, active: false },
    { label: copy.aiTitle, active: true },
    { label: copy.automationTitle, active: false },
  ];

  return (
    <div
      aria-hidden
      className="relative overflow-hidden rounded-[24px] border border-white/[.12] bg-[#08131f] p-6 shadow-[0_30px_90px_rgba(0,0,0,.45)] sm:p-8"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_16%,rgba(165,243,252,.07),transparent_34%)]" />

      <div className="relative flex items-center justify-between">
        <span className="font-space text-[11px] font-black uppercase tracking-[.28em] text-white">
          Genezisi
        </span>
        <span className="h-2 w-2 rounded-full bg-white/25" />
      </div>

      <ul className="relative mt-7">
        {nodes.map((node) => (
          <li
            key={node.label}
            className="flex items-center gap-4 border-t border-white/[.1] py-6 last:border-b"
          >
            <span
              className={
                "h-2 w-2 shrink-0 rounded-full " +
                (node.active ? "bg-cyan-200 shadow-[0_0_14px_rgba(165,243,252,.75)]" : "bg-white/25")
              }
            />
            <span
              className={
                "min-w-0 flex-1 truncate text-xl font-black tracking-[-.025em] sm:text-2xl " +
                (node.active ? "text-white" : "text-white/58")
              }
            >
              {node.label}
            </span>
            {node.active && <span className="text-cyan-100/70">→</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
