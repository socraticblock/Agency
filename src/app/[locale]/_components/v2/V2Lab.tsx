"use client";

import { useState } from "react";
import {
  BellRing,
  CalendarCheck,
  CircleAlert,
  Mail,
  ScanText,
  Check,
} from "lucide-react";
import type { V2Copy } from "./hero.copy";

function StepDot({ active, complete }: { active: boolean; complete: boolean }) {
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

function MicroLabel({ children, tone = "cyan" }: { children: React.ReactNode; tone?: "cyan" | "warm" }) {
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

/** One believable interface state. Rendered identically on desktop and mobile. */
function DemoState({ index, copy }: { index: number; copy: V2Copy }) {
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

export function V2Lab({ copy }: { copy: V2Copy }) {
  const steps = [copy.receiveStep, copy.understandStep, copy.actionStep, copy.exceptionStep, copy.outcomeStep];
  const [active, setActive] = useState(0);
  const progress = ((active + 1) / steps.length) * 100;

  return (
    <>
      {/* Desktop: steps on the left, one persistent interface stage on the right. */}
      <div className="hidden gap-12 lg:grid lg:grid-cols-[.92fr_1.08fr] xl:gap-16">
        <div className="self-start">
          <p className="text-[11px] font-extrabold uppercase tracking-[.2em] text-cyan-100/58">
            {copy.systemEyebrow}
          </p>
          <h2 className="mt-5 max-w-[12ch] text-[clamp(3rem,4.4vw,4.6rem)] font-black leading-[.92] tracking-[-.055em]">
            {copy.labTitle}
          </h2>

          <div className="relative mt-10 border-y border-white/10">
            <div className="pointer-events-none absolute bottom-7 left-[34px] top-7 w-px bg-white/10" aria-hidden />
            {steps.map((step, index) => {
              const isActive = active === index;
              const isComplete = index < active;

              return (
                <button
                  key={step}
                  type="button"
                  onClick={() => setActive(index)}
                  aria-pressed={isActive}
                  aria-controls="genezisi-lab-desktop-state"
                  className={
                    "group relative grid min-h-20 w-full grid-cols-[70px_1fr_auto] items-center gap-4 border-b border-white/10 py-5 text-left transition-colors duration-300 last:border-b-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200 " +
                    (isActive ? "bg-white/[.035]" : "hover:bg-white/[.018]")
                  }
                >
                  <span className="relative z-10 flex items-center justify-center">
                    <StepDot active={isActive} complete={isComplete} />
                  </span>
                  <span>
                    <span
                      className={
                        "block text-[9px] font-black uppercase tracking-[.18em] transition-colors " +
                        (isActive ? "text-cyan-100/65" : "text-white/30")
                      }
                    >
                      0{index + 1}
                    </span>
                    <span
                      className={
                        "mt-2 block max-w-2xl text-2xl font-black tracking-[-.02em] transition-[color,transform] duration-300 " +
                        (isActive ? "translate-x-1 text-white" : "text-white/58")
                      }
                    >
                      {step}
                    </span>
                  </span>
                  <span
                    aria-hidden
                    className={
                      "mr-2 text-sm font-black transition-colors " +
                      (isActive ? "text-cyan-100/62" : "text-white/20")
                    }
                  >
                    {isActive ? "●" : isComplete ? "✓" : "→"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="self-start">
          <div
            id="genezisi-lab-desktop-state"
            aria-live="polite"
            className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#071019] p-8 shadow-[0_32px_90px_rgba(0,0,0,.28)]"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_16%,rgba(165,243,252,.09),transparent_26%)]" aria-hidden />

            <div className="relative flex items-center justify-between gap-4 text-[9px] font-black uppercase tracking-[.2em] text-white/42">
              <span>{copy.lab}</span>
              <span>0{active + 1} / 0{steps.length}</span>
            </div>

            <div className="relative mt-7">
              <DemoState index={active} copy={copy} />
            </div>

            <div className="relative mt-8 h-px overflow-hidden bg-white/10" aria-hidden>
              <div
                className="h-px bg-cyan-100/75 transition-[width] duration-500 ease-out"
                style={{ width: progress + "%" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: one state open at a time. */}
      <div className="lg:hidden">
        <p className="text-[11px] font-extrabold uppercase tracking-[.2em] text-cyan-100/58">
          {copy.systemEyebrow}
        </p>
        <h2 className="mt-5 max-w-[14ch] text-[clamp(2.6rem,9vw,3.4rem)] font-black leading-[.92] tracking-[-.05em]">
          {copy.labTitle}
        </h2>

        <div className="mt-9 border-y border-white/10">
          {steps.map((step, index) => {
            const isActive = active === index;
            const isComplete = index < active;
            const panelId = `genezisi-lab-panel-${index}`;
            const buttonId = `genezisi-lab-button-${index}`;

            return (
              <div key={step} className="border-b border-white/10 last:border-b-0">
                <button
                  id={buttonId}
                  type="button"
                  onClick={() => setActive(index)}
                  aria-expanded={isActive}
                  aria-controls={panelId}
                  className="grid min-h-20 w-full grid-cols-[34px_1fr_auto] items-center gap-3 py-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"
                >
                  <span className="flex items-center justify-center">
                    <StepDot active={isActive} complete={isComplete} />
                  </span>
                  <span>
                    <span
                      className={
                        "block text-[9px] font-black uppercase tracking-[.18em] transition-colors duration-300 " +
                        (isActive ? "text-cyan-100/65" : "text-white/30")
                      }
                    >
                      0{index + 1}
                    </span>
                    <span
                      className={
                        "mt-1.5 block text-xl font-black tracking-[-.025em] transition-colors duration-300 " +
                        (isActive ? "text-white" : "text-white/58")
                      }
                    >
                      {step}
                    </span>
                  </span>
                  <span
                    aria-hidden
                    className={
                      "mr-1 text-lg transition-[color,transform] duration-300 " +
                      (isActive ? "rotate-45 text-cyan-100/70" : "text-white/24")
                    }
                  >
                    +
                  </span>
                </button>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  aria-hidden={!isActive}
                  className={
                    "grid transition-[grid-template-rows,opacity] duration-[280ms] ease-[cubic-bezier(.22,1,.36,1)] " +
                    (isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")
                  }
                >
                  <div className="overflow-hidden">
                    <div
                      className={
                        "mb-6 ml-[34px] transition-transform duration-[280ms] ease-[cubic-bezier(.22,1,.36,1)] " +
                        (isActive ? "translate-y-0" : "-translate-y-2")
                      }
                    >
                      <DemoState index={index} copy={copy} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
