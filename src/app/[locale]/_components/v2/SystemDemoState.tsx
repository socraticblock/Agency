import {
  BellRing,
  CalendarCheck,
  CircleAlert,
  Mail,
  ScanText,
  Check,
} from "lucide-react";
import type { V2Copy } from "./hero.copy";

export function StepDot({ active, complete }: { active: boolean; complete: boolean }) {
  return (
    <span
      aria-hidden
      className={
        "h-3 w-3 rounded-full border transition-[background-color,border-color,box-shadow,transform] duration-300 " +
        (active
          ? "scale-110 border-cyan-100 bg-cyan-200 shadow-[0_0_20px_rgba(165,243,252,.65)]"
          : complete
            ? "border-cyan-100/45 bg-cyan-100/35"
            : "border-white/20 bg-[#02060b]")
      }
    />
  );
}

export function MicroLabel({
  children,
  tone = "cyan",
}: {
  children: React.ReactNode;
  tone?: "cyan" | "warm";
}) {
  return (
    <p
      className={
        "text-[9px] font-black uppercase tracking-[.18em] " +
        (tone === "warm" ? "text-amber-100/80" : "text-cyan-100/62")
      }
    >
      {children}
    </p>
  );
}

/** One believable interface state. Shared by the desktop stage and the mobile timeline. */
export function DemoState({ index, copy }: { index: number; copy: V2Copy }) {
  const d = copy.demo;

  if (index === 0) {
    return (
      <div className="rounded-[1.35rem] border border-white/[.09] bg-white/[.035] p-5">
        <div className="flex items-center gap-3">
          <Mail className="h-3.5 w-3.5 text-cyan-100/70" aria-hidden />
          <MicroLabel>{d.enquiryLabel}</MicroLabel>
        </div>
        <dl className="mt-5 space-y-4">
          <div>
            <dt className="text-[9px] font-black uppercase tracking-[.16em] text-white/38">{d.fromLabel}</dt>
            <dd className="mt-1 break-all text-sm font-semibold text-white/85">{d.fromValue}</dd>
          </div>
          <div>
            <dt className="text-[9px] font-black uppercase tracking-[.16em] text-white/38">{d.subjectLabel}</dt>
            <dd className="mt-1 text-sm font-semibold text-white/85">{d.subjectValue}</dd>
          </div>
          <div>
            <dt className="text-[9px] font-black uppercase tracking-[.16em] text-white/38">{d.messageLabel}</dt>
            <dd className="mt-1 text-sm font-semibold leading-6 text-white/72">{d.messageValue}</dd>
          </div>
        </dl>
      </div>
    );
  }

  if (index === 1) {
    return (
      <div className="rounded-[1.35rem] border border-white/[.09] bg-white/[.035] p-5">
        <div className="flex items-center gap-3">
          <ScanText className="h-3.5 w-3.5 text-cyan-100/70" aria-hidden />
          <MicroLabel>{d.intentLabel}</MicroLabel>
        </div>
        <dl className="mt-5 divide-y divide-white/[.08] border-y border-white/[.08]">
          {d.intentRows.map((row) => (
            <div key={row.label} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3">
              <dt className="text-[9px] font-black uppercase tracking-[.16em] text-white/38">{row.label}</dt>
              <dd className="text-sm font-bold text-white/88">{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    );
  }

  if (index === 2) {
    return (
      <div className="rounded-[1.35rem] border border-white/[.09] bg-white/[.035] p-5">
        <div className="flex items-center gap-3">
          <CalendarCheck className="h-3.5 w-3.5 text-cyan-100/70" aria-hidden />
          <MicroLabel>{d.actionLabel}</MicroLabel>
        </div>
        <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
          <p className="text-3xl font-black tracking-[-.04em] text-white">{d.actionTime}</p>
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-100/30 bg-cyan-100/[.07] px-3 py-1.5 text-[10px] font-black uppercase tracking-[.16em] text-cyan-100/85">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-200" aria-hidden />
            {d.actionStatus}
          </span>
        </div>
        <div className="mt-5 flex items-center gap-3 border-t border-white/[.08] pt-4 text-sm font-semibold text-white/78">
          <Check className="h-4 w-4 text-cyan-100/70" aria-hidden />
          {d.actionDraft}
        </div>
      </div>
    );
  }

  if (index === 3) {
    return (
      <div className="rounded-[1.35rem] border border-amber-200/30 bg-amber-100/[.05] p-5">
        <div className="flex items-center gap-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-amber-200/45 bg-amber-100/10">
            <CircleAlert className="h-4 w-4 text-amber-100" aria-hidden />
          </span>
          <MicroLabel tone="warm">{d.reviewLabel}</MicroLabel>
        </div>
        <p className="mt-5 text-xl font-black tracking-[-.03em] text-white">{d.reviewTitle}</p>
        <p className="mt-3 text-sm font-semibold leading-6 text-white/68">{d.reviewBody}</p>
      </div>
    );
  }

  return (
    <div className="rounded-[1.35rem] border border-cyan-100/25 bg-cyan-100/[.04] p-5">
      <div className="flex items-center gap-3">
        <BellRing className="h-3.5 w-3.5 text-cyan-100/70" aria-hidden />
        <MicroLabel>{d.resolvedLabel}</MicroLabel>
      </div>
      <div className="mt-5 space-y-4">
        <div>
          <p className="text-base font-black tracking-[-.02em] text-white">{d.resolvedOwnerTitle}</p>
          <p className="mt-1 text-sm font-semibold leading-6 text-white/66">{d.resolvedOwnerBody}</p>
        </div>
        <div className="border-t border-white/[.1] pt-4">
          <p className="text-base font-black tracking-[-.02em] text-white">{d.resolvedCustomerTitle}</p>
          <p className="mt-1 text-sm font-semibold leading-6 text-white/66">{d.resolvedCustomerBody}</p>
        </div>
      </div>
    </div>
  );
}
