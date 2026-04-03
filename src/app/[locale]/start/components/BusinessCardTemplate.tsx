"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Scale,
  Briefcase,
  Building2,
  Sparkles,
  Phone,
  Mail,
  MessageCircle,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";
import type { Lane1CustomizerState } from "../lib/types";
import { resolveStyleVariables } from "../lib/presets";

const ICONS = [Scale, Briefcase, Building2, Sparkles];

function telHref(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return digits ? `tel:+${digits.replace(/^\+/, "")}` : "tel:";
}

function waHref(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (!digits) return "#";
  return `https://wa.me/${digits}`;
}

export function BusinessCardTemplate({
  state,
  previewLang,
  homeHref,
  ownerName,
}: {
  state: Lane1CustomizerState;
  /** Which language row to show for text fields */
  previewLang: "primary" | "secondary";
  homeHref: string;
  /** Footer © name */
  ownerName: string;
}) {
  const vars = resolveStyleVariables(state.style);
  const useSecondary =
    previewLang === "secondary" &&
    state.secondaryMode === "self";

  const name = useSecondary ? state.nameSecondary || state.name : state.name;
  const title = useSecondary ? state.titleSecondary || state.title : state.title;
  const address = useSecondary ? state.addressSecondary || state.address : state.address;
  const hours = useSecondary ? state.hoursSecondary || state.hours : state.hours;
  const practiceHeading =
    (useSecondary ? state.practiceHeadingSecondary : state.practiceHeading) ||
    "Practice areas";

  const serviceLines = state.serviceAreas.slice(0, state.serviceCount);

  const showSocial = (url: string) => url.trim().length > 0;

  return (
    <div
      className="mx-auto w-full max-w-[640px] text-[var(--text-primary)]"
      style={{
        ...vars,
        fontFamily: "var(--font-body)",
        background: "var(--bg-primary)",
      }}
    >
      {/* Section 1 — sticky header */}
      <header
        className="sticky top-0 z-20 flex items-center justify-between border-b px-4 py-3"
        style={{
          borderColor: "var(--accent)",
          background: "var(--bg-primary)",
        }}
      >
        <span
          className="max-w-[55%] truncate text-sm font-bold leading-tight md:text-base"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {name || "Your name"}
        </span>
        <a
          href={telHref(state.phone)}
          className="shrink-0 text-sm font-semibold underline decoration-2 underline-offset-2"
          style={{ color: "var(--accent)" }}
        >
          {state.phone || "+995…"}
        </a>
      </header>

      {/* Section 2 — hero */}
      <section className="px-4 pb-8 pt-8 text-left">
        <div className="flex flex-col items-start gap-4">
          <div
            className="relative h-[180px] w-[180px] shrink-0 overflow-hidden rounded-full border-4 bg-slate-200"
            style={{ borderColor: "var(--accent)" }}
          >
            {state.photoDataUrl ? (
              <Image
                src={state.photoDataUrl}
                alt=""
                width={180}
                height={180}
                className="h-full w-full object-cover"
                unoptimized
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-xs text-slate-500">
                Photo
              </div>
            )}
          </div>
          <div>
            <h1
              className="text-2xl font-bold leading-tight md:text-3xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {name || "—"}
            </h1>
            <p className="mt-2 text-base opacity-90">{title || "—"}</p>
          </div>
          <div
            className={`grid w-full gap-2 ${
              serviceLines.length >= 3 ? "grid-cols-2" : "grid-cols-1"
            }`}
          >
            {serviceLines.map((line, i) =>
              line.trim() ? (
                <div
                  key={i}
                  className="rounded border border-black/5 px-3 py-2 text-sm"
                  style={{ borderColor: "var(--accent-secondary)" }}
                >
                  {line}
                </div>
              ) : null
            )}
          </div>
          <a
            href={telHref(state.phone)}
            className="inline-flex min-h-[44px] items-center justify-center rounded-lg px-6 py-3 text-sm font-bold text-white"
            style={{ background: "var(--accent)" }}
          >
            Contact Me
          </a>
        </div>
      </section>

      {/* Section 3 — practice areas with icons */}
      <section className="border-t px-4 py-8" style={{ borderColor: "var(--accent-secondary)" }}>
        <h2
          className="mb-4 text-lg font-bold"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {practiceHeading}
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {serviceLines.map((line, i) => {
            if (!line.trim()) return null;
            const Icon = ICONS[i % ICONS.length];
            return (
              <li key={i} className="flex items-start gap-2">
                <Icon
                  className="mt-0.5 h-5 w-5 shrink-0"
                  style={{ color: "var(--accent)" }}
                  aria-hidden
                />
                <span className="text-sm leading-snug">{line}</span>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Section 4 — contact + footer */}
      <section className="border-t px-4 py-8" style={{ borderColor: "var(--accent-secondary)" }}>
        <div className="space-y-3 text-sm">
          <a
            href={telHref(state.phone)}
            className="flex items-center gap-2 font-semibold"
            style={{ color: "var(--accent)" }}
          >
            <Phone className="h-4 w-4" aria-hidden />
            {state.phone}
          </a>
          {state.email.trim() ? (
            <a
              href={`mailto:${state.email.trim()}`}
              className="flex items-center gap-2 underline"
            >
              <Mail className="h-4 w-4 shrink-0" aria-hidden />
              {state.email}
            </a>
          ) : null}
          <a
            href={waHref(state.phone)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-semibold"
            style={{ color: "var(--accent)" }}
          >
            <MessageCircle className="h-4 w-4" aria-hidden />
            WhatsApp
          </a>
          <div className="flex flex-wrap gap-3 pt-2">
            {showSocial(state.social.facebook) && (
              <a
                href={state.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent)]"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
              </a>
            )}
            {showSocial(state.social.instagram) && (
              <a
                href={state.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent)]"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
            )}
            {showSocial(state.social.linkedin) && (
              <a
                href={state.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent)]"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>
            )}
            {showSocial(state.social.tiktok) && (
              <a
                href={state.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent)]"
                aria-label="TikTok"
              >
                <span className="text-xs font-bold">TT</span>
              </a>
            )}
            {showSocial(state.social.youtube) && (
              <a
                href={state.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent)]"
                aria-label="YouTube"
              >
                <Youtube className="h-6 w-6" />
              </a>
            )}
            {state.social.extra.map((e, i) =>
              e.url.trim() ? (
                <a
                  key={i}
                  href={e.url.trim()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold underline"
                  style={{ color: "var(--accent)" }}
                >
                  {e.label || "Link"}
                </a>
              ) : null
            )}
          </div>
          {address.trim() ? (
            <p className="pt-2">
              {state.addGoogleMap ? (
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  {address}
                </a>
              ) : (
                address
              )}
            </p>
          ) : null}
          {hours.trim() ? <p>{hours}</p> : null}
          {state.addGoogleMap && address.trim() ? (
            <div className="mt-4 aspect-video w-full overflow-hidden rounded-lg bg-slate-200">
              <iframe
                title="Map"
                className="h-full w-full border-0"
                loading="lazy"
                src={`https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`}
              />
            </div>
          ) : null}
        </div>

        <footer className="mt-10 border-t pt-6 text-center text-xs opacity-80" style={{ borderColor: "var(--accent-secondary)" }}>
          <p>
            © {new Date().getFullYear()} {ownerName || "—"}. Built by{" "}
            <Link href={homeHref} className="underline font-semibold" style={{ color: "var(--accent)" }}>
              Genezisi
            </Link>
          </p>
        </footer>
      </section>
    </div>
  );
}
