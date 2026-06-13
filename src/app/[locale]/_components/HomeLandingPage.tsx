"use client";

import Link from "next/link";
import { useState } from "react";
import type { Locale } from "@/lib/i18n";
import { WHATSAPP_DEFAULT_MESSAGE, WHATSAPP_INTAKE } from "@/constants/content";
import {
  ArrowRight,
  Box,
  CalendarDays,
  Check,
  Code2,
  Instagram,
  Layers3,
  Linkedin,
  Mail,
  Menu,
  MessageCircle,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Smartphone,
  X,
  Zap,
} from "lucide-react";

const waHref = `https://wa.me/${WHATSAPP_INTAKE}?text=${encodeURIComponent(
  WHATSAPP_DEFAULT_MESSAGE,
)}`;

const navItems = [
  { label: "Work", href: "/work" },
  { label: "Packages", href: "/pricing" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#final-cta" },
];

const proofChips = [
  { label: "Custom design", icon: Sparkles },
  { label: "Fast loading", icon: Zap },
  { label: "Mobile-first", icon: Smartphone },
  { label: "Google-ready", icon: Search },
  { label: "Booking / payments / WhatsApp", icon: CalendarDays },
];

const buildTypes = [
  {
    title: "Booking websites",
    body: "Get more bookings with a smooth booking experience.",
    icon: CalendarDays,
    href: "/booking-websites",
  },
  {
    title: "Service websites",
    body: "Present your services clearly and win more trust.",
    icon: Sparkles,
    href: "/service-websites",
  },
  {
    title: "Online stores",
    body: "Sell products online with clean, fast, conversion-focused stores.",
    icon: ShoppingBag,
    href: "/online-stores",
  },
];

const selectedWork = [
  {
    title: "TK Counsel",
    type: "Legal / Professional",
    description:
      "Professional service website focused on clarity, credibility, and a serious first impression.",
    url: "https://tkcounsel.com/",
    cta: "View website",
    embeddable: true,
    palette: "from-slate-100 via-stone-200 to-slate-500",
    previewHeadline: "Counsel with clarity.",
    previewSubline: "Legal guidance built around trust.",
    previewCta: "Request counsel",
    previewNav: ["Practice", "About", "Contact"],
    previewStats: ["Clarity", "Trust", "Action"],
    dark: false,
  },
  {
    title: "Frankencoin Desk",
    type: "SaaS / Crypto",
    description:
      "Complex product frontend focused on trust, clarity, and user confidence.",
    url: "https://www.frankencoindesk.com/",
    cta: "View website",
    embeddable: false,
    screenshot: "/work-previews/frankencoin-desk.png",
    palette: "from-slate-950 via-blue-950 to-cyan-700",
    previewHeadline: "All your crypto. One desk.",
    previewSubline: "Track, analyze, and manage your portfolio.",
    previewCta: "Get started",
    previewNav: ["Features", "Pricing", "Docs"],
    previewStats: ["Portfolio", "Signals", "Security"],
    dark: true,
  },
  {
    title: "Her House Pilates",
    type: "Wellness / Studio",
    description:
      "Luxury wellness website concept with schedule, booking flow, and mobile-first design.",
    url: "https://her-house-pilates.vercel.app/",
    cta: "View website",
    embeddable: true,
    palette: "from-stone-200 via-amber-100 to-stone-500",
    previewHeadline: "Move with intention.",
    previewSubline: "Luxury Pilates schedule and booking flow.",
    previewCta: "Book a class",
    previewNav: ["Classes", "About", "Pricing"],
    previewStats: ["Schedule", "Studio", "Booking"],
    dark: false,
  },
  {
    title: "Sakartvelo Defenders",
    type: "Civic / Community",
    description:
      "Public-facing website experience with strong identity, clear messaging, and action-focused layout.",
    url: "https://sakartvelo-defenders.vercel.app/",
    cta: "View website",
    embeddable: false,
    screenshot: "/work-previews/sakartvelo-defenders.png",
    palette: "from-red-950 via-slate-950 to-emerald-900",
    previewHeadline: "Defend what matters.",
    previewSubline: "A clear civic message with action at the center.",
    previewCta: "Join the effort",
    previewNav: ["Mission", "Stories", "Action"],
    previewStats: ["Identity", "Clarity", "Action"],
    dark: true,
  },
];

const processSteps = [
  {
    title: "Website diagnosis",
    body: "I analyze your business, goals, audience, and current online presence.",
  },
  {
    title: "Design direction",
    body: "We define the structure, visual style, pages, and conversion path.",
  },
  {
    title: "Build & integrations",
    body: "I build the website and connect the tools you need: forms, WhatsApp, booking, analytics, payments, or CMS.",
  },
  {
    title: "Launch & handover",
    body: "We launch, test, connect the domain, and I give you clear guidance.",
  },
];

const packages = [
  {
    title: "Starter Website",
    price: "999",
    icon: Box,
    bullets: [
      "Up to 5 sections/pages",
      "Custom responsive design",
      "Contact / WhatsApp integration",
      "Basic SEO setup",
    ],
  },
  {
    title: "Business Website",
    price: "1,999",
    icon: Layers3,
    badge: "Most popular",
    bullets: [
      "Up to 10 pages",
      "Advanced design structure",
      "Booking / forms / integrations",
      "Basic SEO + speed optimization",
      "Training & handover",
    ],
  },
  {
    title: "Commerce / Booking System",
    price: "3,999",
    icon: ShoppingBag,
    bullets: [
      "E-commerce or booking system",
      "Payments integration",
      "Product / service management",
      "Advanced SEO & speed",
      "Priority support",
    ],
  },
];

const trustPoints = [
  { label: "Direct communication", icon: MessageCircle },
  { label: "100% custom work", icon: Code2 },
  { label: "No templates", icon: Sparkles },
  { label: "Long-term support", icon: ShieldCheck },
];

function HeroVisual() {
  return (
    <div className="relative mx-auto mt-8 min-h-[18rem] w-full max-w-xl lg:mt-0 lg:max-w-none">
      <div className="absolute inset-x-8 top-4 h-56 rounded-full border border-cyan-400/60 bg-cyan-400/10 blur-[1px] shadow-[0_0_80px_rgba(34,211,238,0.38)]" />
      <div className="absolute bottom-0 left-8 right-6 h-24 rounded-[50%] bg-black/70 blur-2xl" />
      <div className="absolute left-2 top-10 hidden w-[78%] rotate-[-3deg] rounded-[1.4rem] border border-white/15 bg-slate-950/90 p-4 shadow-2xl shadow-cyan-950/60 sm:block">
        <div className="flex items-center justify-between border-b border-white/10 pb-3 text-[10px] uppercase tracking-[0.2em] text-slate-400">
          <span>Your business</span>
          <span className="rounded-full bg-emerald-400 px-3 py-1 font-bold text-slate-950">
            Book a call
          </span>
        </div>
        <div className="grid grid-cols-[1fr_1.1fr] gap-5 pt-6">
          <div>
            <p className="font-[family:var(--font-playfair),serif] text-3xl font-bold leading-tight text-white">
              Elevate your business online.
            </p>
            <p className="mt-3 text-xs leading-relaxed text-slate-400">
              Websites that build trust and bring customers.
            </p>
            <div className="mt-5 h-8 w-28 rounded-md bg-cyan-400/80" />
          </div>
          <div className="relative min-h-44 overflow-hidden rounded-xl border border-cyan-300/20 bg-gradient-to-br from-slate-900 via-cyan-950/60 to-slate-950">
            <div className="absolute left-10 top-8 h-28 w-28 rotate-45 border border-cyan-200/40 bg-cyan-300/10 shadow-[0_0_45px_rgba(34,211,238,0.35)]" />
            <div className="absolute left-20 top-14 h-24 w-24 rotate-45 border border-emerald-300/30 bg-emerald-300/10" />
            <div className="absolute bottom-4 left-5 right-5 h-16 rounded-full bg-black/30 blur-lg" />
          </div>
        </div>
      </div>
      <div className="relative ml-auto mr-2 mt-4 w-[74%] max-w-sm rounded-[2rem] border border-white/15 bg-slate-950 p-3 shadow-2xl shadow-cyan-950/60 sm:mr-0 sm:mt-28 sm:w-[44%]">
        <div className="rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/70 p-5">
          <div className="mx-auto mb-5 h-1.5 w-16 rounded-full bg-white/20" />
          <p className="font-[family:var(--font-playfair),serif] text-2xl font-bold leading-tight text-white">
            Look serious online.
          </p>
          <p className="mt-3 text-xs leading-relaxed text-slate-400">
            Clear design. Fast pages. Easy booking.
          </p>
          <div className="mt-5 inline-flex rounded-lg bg-emerald-400 px-4 py-2 text-xs font-black text-slate-950">
            Book a call
          </div>
          <div className="mt-8 space-y-2">
            <div className="h-2 rounded-full bg-white/15" />
            <div className="h-2 w-2/3 rounded-full bg-cyan-300/40" />
            <div className="h-2 w-1/2 rounded-full bg-emerald-300/40" />
          </div>
        </div>
      </div>
    </div>
  );
}

function WorkMockup({
  item,
}: {
  item: (typeof selectedWork)[number];
}) {
  const surfaceText = item.dark ? "text-white" : "text-slate-950";
  const mutedText = item.dark ? "text-white/65" : "text-slate-950/58";
  const navText = item.dark ? "text-white/55" : "text-slate-950/48";
  const line = item.dark ? "bg-white/18" : "bg-slate-950/16";
  const accentLine = item.dark ? "bg-cyan-300/70" : "bg-emerald-500/50";

  return (
    <div className={`relative h-[20rem] overflow-hidden rounded-xl bg-gradient-to-br ${item.palette} p-3 sm:h-[22rem]`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_34%,rgba(34,211,238,0.32),transparent_31%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(2,6,13,0.18))]" />
      <div className="relative h-full overflow-hidden rounded-lg border border-white/25 bg-slate-950/15 shadow-2xl backdrop-blur-[2px]">
        <div className="flex h-9 items-center gap-2 border-b border-white/18 bg-slate-950/18 px-3">
          <span className="h-2 w-2 rounded-full bg-red-300/80" />
          <span className="h-2 w-2 rounded-full bg-amber-300/80" />
          <span className="h-2 w-2 rounded-full bg-emerald-300/80" />
          <span className={`ml-2 text-[9px] font-black uppercase tracking-[0.22em] ${navText}`}>
            {item.title}
          </span>
          <span
            className={`ml-auto rounded-full px-2 py-0.5 text-[8px] font-black uppercase tracking-[0.12em] ${
              item.dark ? "bg-white/12 text-white" : "bg-slate-950/10 text-slate-950"
            }`}
          >
            Live
          </span>
        </div>

        {item.embeddable || item.screenshot ? (
          <div className="relative h-[calc(100%-2.25rem)] overflow-hidden bg-slate-950">
            {item.embeddable ? (
              <iframe
                src={item.url}
                title={`${item.title} live website preview`}
                loading="lazy"
                scrolling="no"
                tabIndex={-1}
                className="pointer-events-none absolute left-0 top-0 h-[150%] w-[150%] origin-top-left scale-[0.667] border-0 bg-white"
              />
            ) : (
              <div
                className="absolute inset-0 bg-cover bg-top"
                style={{ backgroundImage: `url(${item.screenshot})` }}
                aria-label={`${item.title} website screenshot preview`}
              />
            )}
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-950/80 to-transparent" />
            <div className="pointer-events-none absolute bottom-3 left-3 rounded-full border border-white/15 bg-slate-950/75 px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-white shadow-lg backdrop-blur-md">
              {item.embeddable ? "Live website preview" : "Website screenshot preview"}
            </div>
          </div>
        ) : (
        <div className="grid h-[calc(100%-2.25rem)] grid-cols-[1fr_8.5rem] gap-3 p-4 sm:grid-cols-[1fr_11rem] sm:p-5">
          <div className="min-w-0">
            <div className="hidden items-center gap-4 sm:flex">
              {item.previewNav.map((nav) => (
                <span key={nav} className={`text-[9px] font-bold uppercase tracking-[0.12em] ${navText}`}>
                  {nav}
                </span>
              ))}
            </div>

            <div className="mt-5 max-w-[19rem] sm:mt-8">
              <p className={`font-[family:var(--font-playfair),serif] text-3xl font-bold leading-tight sm:text-4xl ${surfaceText}`}>
                {item.previewHeadline}
              </p>
              <p className={`mt-3 hidden max-w-xs text-xs leading-5 sm:block ${mutedText}`}>
                {item.previewSubline}
              </p>
              <div
                className={`mt-5 inline-flex h-9 items-center rounded-lg px-5 text-xs font-black ${
                  item.dark ? "bg-cyan-400 text-slate-950" : "bg-white text-slate-950"
                }`}
              >
                {item.previewCta}
              </div>
            </div>

            <div className="mt-8 hidden grid-cols-3 gap-3 sm:grid">
              {item.previewStats.map((stat) => (
                <div key={stat} className="rounded-lg border border-white/15 bg-white/10 p-2">
                  <div className={`h-1.5 w-12 rounded-full ${accentLine}`} />
                  <p className={`mt-2 text-[8px] font-black uppercase tracking-[0.13em] ${navText}`}>
                    {stat}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex items-end justify-center">
            <div className="absolute bottom-2 h-20 w-full rounded-[50%] bg-black/20 blur-xl" />
            <div className="relative h-[14.75rem] w-28 rounded-[1.7rem] border border-white/35 bg-slate-950/25 p-2 shadow-2xl backdrop-blur-md sm:h-[16.5rem] sm:w-32">
              <div className="mx-auto mb-5 h-1.5 w-11 rounded-full bg-white/35" />
              <div className="space-y-3">
                <div className={`h-3 rounded-full ${line}`} />
                <div className={`h-3 w-4/5 rounded-full ${line}`} />
                <div className={`h-3 w-3/5 rounded-full ${accentLine}`} />
              </div>
              <div className="mt-8 space-y-2">
                <div className="h-12 rounded-xl border border-white/20 bg-white/10" />
                <div className="grid grid-cols-2 gap-2">
                  <div className="h-10 rounded-lg border border-white/15 bg-white/10" />
                  <div className="h-10 rounded-lg border border-white/15 bg-white/10" />
                </div>
              </div>
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}

export function HomeLandingPage({ locale }: { locale: Locale }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen overflow-hidden bg-[#02060d] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.16),transparent_36%),radial-gradient(circle_at_0%_30%,rgba(16,185,129,0.12),transparent_30%)]" />
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#030812]/85 backdrop-blur-xl">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
          <Link
            href={`/${locale}`}
            className="font-space text-lg font-black uppercase tracking-[0.48em] text-emerald-300 sm:text-xl"
          >
            Genezisi
          </Link>
          <div className="hidden items-center gap-10 text-sm font-bold text-slate-200 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href.startsWith("#") ? item.href : `/${locale}${item.href}`}
                className="transition hover:text-emerald-300"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 px-4 text-sm font-black text-slate-950 shadow-[0_0_28px_rgba(16,185,129,0.28)] transition hover:scale-[1.02] sm:px-5"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Book a call</span>
            </a>
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((value) => !value)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white lg:hidden"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
        {menuOpen && (
          <div className="border-t border-white/10 bg-slate-950/95 px-4 py-4 lg:hidden">
            <div className="mx-auto grid max-w-7xl gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href.startsWith("#") ? item.href : `/${locale}${item.href}`}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-bold text-slate-200"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      <section className="relative mx-auto grid max-w-7xl gap-8 px-4 pb-10 pt-10 sm:px-6 sm:pt-16 lg:grid-cols-[1fr_0.95fr] lg:items-center lg:px-8 lg:pb-16">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/5 px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-emerald-200">
            <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
            Premium web design & development
          </div>
          <h1 className="mt-6 max-w-4xl font-[family:var(--font-playfair),serif] text-5xl font-bold leading-[0.98] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Premium websites for businesses that want to{" "}
            <span className="bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
              look serious online.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            I design and build fast, beautiful websites for coaches, clinics,
            studios, restaurants, shops, and local service businesses - so
            customers trust you faster and book you easier.
          </p>
          <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-400 px-7 text-base font-black text-slate-950 shadow-[0_0_34px_rgba(16,185,129,0.28)] transition hover:scale-[1.02]"
            >
              <MessageCircle className="h-5 w-5" />
              Book a website call
            </a>
            <a
              href="#packages"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/[0.03] px-7 text-base font-black text-white transition hover:border-cyan-300/60 hover:bg-white/[0.06]"
            >
              See packages
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
        <HeroVisual />
        <div className="lg:col-span-2">
          <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
            {proofChips.map((chip) => {
              const Icon = chip.icon;
              return (
                <div
                  key={chip.label}
                  className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.035] px-3 text-center text-xs font-bold text-slate-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:px-4"
                >
                  <Icon className="h-4 w-4 shrink-0 text-emerald-300" />
                  <span>{chip.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-black tracking-tight text-white">
          What I build
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {buildTypes.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.title}
                href={`/${locale}${item.href}`}
                className="group flex items-center gap-5 rounded-2xl border border-white/10 bg-slate-900/45 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition hover:border-emerald-300/40 hover:bg-slate-900/65"
              >
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-300">
                  <Icon className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">{item.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-300">{item.body}</p>
                </div>
                <ArrowRight className="ml-auto hidden h-5 w-5 text-slate-500 transition group-hover:text-emerald-300 sm:block md:hidden" />
              </Link>
            );
          })}
        </div>
      </section>

      <section id="work" className="scroll-anchor-target relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-black tracking-tight text-white">
          Some of my work
        </h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {selectedWork.map((item) => (
            <a
              key={item.title}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/45 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
            >
              <WorkMockup item={item} />
              <div className="p-3">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-lg font-black text-white">{item.title}</h3>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-bold text-slate-300">
                    {item.type}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  {item.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-emerald-300">
                  {item.cta}
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section id="process" className="scroll-anchor-target relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-black tracking-tight text-white">
          Simple process
        </h2>
        <div className="mt-8 grid gap-4 lg:grid-cols-4 lg:gap-0">
          {processSteps.map((step, index) => (
            <article key={step.title} className="relative flex gap-4 lg:block lg:px-4 lg:text-center">
              <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cyan-300 bg-slate-950 text-sm font-black text-white shadow-[0_0_24px_rgba(34,211,238,0.22)] lg:mx-auto">
                {index + 1}
              </div>
              {index < processSteps.length - 1 && (
                <div className="absolute left-5 top-10 h-[calc(100%+1rem)] w-px bg-cyan-300/40 lg:left-1/2 lg:top-5 lg:h-px lg:w-full" />
              )}
              <div className="pb-2 lg:mt-6">
                <h3 className="font-black text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{step.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="packages" className="scroll-anchor-target relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-black tracking-tight text-white">
          Packages
        </h2>
        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          {packages.map((pkg) => {
            const Icon = pkg.icon;
            return (
              <article
                key={pkg.title}
                className={`relative rounded-2xl border bg-slate-900/50 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] ${
                  pkg.badge
                    ? "border-emerald-400/70 shadow-[0_0_38px_rgba(16,185,129,0.12)]"
                    : "border-white/10"
                }`}
              >
                {pkg.badge && (
                  <span className="absolute right-0 top-0 rounded-bl-xl rounded-tr-2xl bg-emerald-400 px-4 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-slate-950">
                    {pkg.badge}
                  </span>
                )}
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-200">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-black text-white">{pkg.title}</h3>
                </div>
                <div className="mt-8 flex items-end gap-3">
                  <span className="pb-2 text-sm font-bold text-slate-300">from</span>
                  <span className="font-space text-5xl font-black text-white">
                    {pkg.price}
                  </span>
                  <span className="pb-2 text-sm font-bold uppercase text-slate-300">
                    GEL
                  </span>
                </div>
                <ul className="mt-8 space-y-3">
                  {pkg.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 text-sm leading-6 text-slate-300">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-300" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid overflow-hidden rounded-2xl border border-white/10 bg-[#07111f] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] lg:grid-cols-[0.75fr_1.35fr_0.8fr]">
          <div className="relative min-h-56 bg-gradient-to-br from-emerald-400/20 via-cyan-400/10 to-slate-950">
            <div className="absolute bottom-0 left-6 h-44 w-40 rounded-t-full bg-slate-950/80 shadow-[0_0_50px_rgba(34,211,238,0.35)]" />
            <div className="absolute bottom-20 left-16 h-16 w-16 rounded-full bg-gradient-to-br from-slate-200 to-slate-500" />
            <div className="absolute bottom-0 left-2 right-0 h-28 bg-gradient-to-t from-slate-950 to-transparent" />
          </div>
          <div className="p-6 sm:p-8">
            <h2 className="font-[family:var(--font-playfair),serif] text-3xl font-bold leading-tight text-white sm:text-4xl">
              Built by Socratic, founder of{" "}
              <span className="text-emerald-300">Genezisi.</span>
            </h2>
            <p
              className="mt-4 text-sm leading-7 sm:text-base"
              style={{ color: "rgba(255, 255, 255, 0.82)" }}
            >
              I work directly with every client from start to finish. No account
              managers, no templates, no shortcuts. Just clean design, solid
              code, and websites that help your business look serious and grow.
            </p>
          </div>
          <div className="border-t border-white/10 bg-slate-950/20 p-6 sm:p-8 lg:border-l lg:border-t-0">
            <ul className="space-y-4">
              {trustPoints.map((point) => {
                const Icon = point.icon;
                return (
                  <li key={point.label} className="flex items-center gap-3 text-sm font-bold text-slate-200">
                    <Icon className="h-5 w-5 text-emerald-300" />
                    {point.label}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      <section id="final-cta" className="scroll-anchor-target relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 rounded-2xl border border-white/10 bg-[#07111f] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:p-8 lg:grid-cols-[0.7fr_1.3fr_0.8fr] lg:items-center">
          <div className="flex justify-center lg:justify-start">
            <div className="flex h-32 w-32 items-center justify-center rounded-full border border-cyan-300/60 bg-cyan-400/10 font-space text-6xl text-emerald-300 shadow-[0_0_50px_rgba(34,211,238,0.35)]">
              G
            </div>
          </div>
          <div>
            <h2 className="font-[family:var(--font-playfair),serif] text-3xl font-bold leading-tight text-white sm:text-4xl">
              Want a website that makes your business{" "}
              <span className="text-emerald-300">look serious?</span>
            </h2>
            <p
              className="mt-3 text-sm leading-7 sm:text-base"
              style={{ color: "rgba(255, 255, 255, 0.82)" }}
            >
              Send me your Instagram, current website, or idea. I&apos;ll tell
              you what I would build and what package fits.
            </p>
          </div>
          <div className="text-center">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-400 px-6 text-base font-black text-slate-950 shadow-[0_0_34px_rgba(16,185,129,0.28)] transition hover:scale-[1.02] lg:w-auto"
            >
              <MessageCircle className="h-5 w-5" />
              Book a website call
            </a>
            <p className="mt-3 text-xs font-medium text-slate-400">
              Quick reply on WhatsApp
            </p>
          </div>
        </div>
      </section>

      <footer className="relative mx-auto flex max-w-7xl flex-col gap-5 px-4 pb-8 pt-2 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <Link
          href={`/${locale}`}
          className="font-space text-lg font-black uppercase tracking-[0.48em] text-emerald-300"
        >
          Genezisi
        </Link>
        <p className="text-sm text-slate-500">Premium websites. Built to perform.</p>
        <div className="flex items-center gap-4 text-slate-300">
          <a href="https://www.instagram.com/" aria-label="Instagram" className="transition hover:text-emerald-300">
            <Instagram className="h-5 w-5" />
          </a>
          <a href="https://www.linkedin.com/" aria-label="LinkedIn" className="transition hover:text-emerald-300">
            <Linkedin className="h-5 w-5" />
          </a>
          <a href={waHref} aria-label="WhatsApp" className="transition hover:text-emerald-300">
            <MessageCircle className="h-5 w-5" />
          </a>
          <a href="mailto:hello@genezisi.com" aria-label="Email" className="transition hover:text-emerald-300">
            <Mail className="h-5 w-5" />
          </a>
        </div>
      </footer>
    </main>
  );
}
