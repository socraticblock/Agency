"use client";

import { FOUNDATIONS } from "@/constants/pricing";
import { WHATSAPP_INTAKE } from "@/constants/content";
import { TierDeckItem as PricingTierDeckType } from "./pricingTierData";
import Link from "next/link";
import { useParams } from "next/navigation";

const WA_BASE = `https://wa.me/${WHATSAPP_INTAKE}`;

function formatPrice(gel: number) {
  return gel.toLocaleString("ka-GE") + " ₾";
}

type BuyerCardCopy = {
  promise: string;
  bestFor: string;
  deliverables: string[];
  goodToKnow: string[];
};

const BUYER_CARD_COPY: Record<string, BuyerCardCopy> = {
  cms: {
    promise: "A custom one-page website built to convert visitors into calls, messages, or bookings.",
    bestFor:
      "Service businesses that need a sharp online presence without a full admin dashboard.",
    deliverables: [
      "Custom website design from scratch",
      "One-page website with up to 4 sections",
      "Choose sections like Services, About, Testimonials, Gallery, Video, or Booking",
      "Mobile-friendly layout for phones, tablets, and desktop",
      "Visitor-focused layout built around your main call-to-action",
      "Subtle scroll and hover animations",
    ],
    goodToKnow: [
      "Add-ons are available based on your needs.",
      "One language is included (Georgian or English).",
      "Georgian/English bilingual setup is available for 150 ₾.",
      "Extra sections are available for 50 ₾ each.",
    ],
  },
  saas: {
    promise: "A complete business website you can update yourself.",
    bestFor:
      "Growing businesses that need multiple pages and an easy admin dashboard.",
    deliverables: [
      "4 pages included: Home, About, Contact, plus 1 page of your choice",
      "Easy admin dashboard to update text, photos, prices, and announcements",
      "One language included (Georgian or English)",
      "Google Analytics setup so you can see visits and clicks",
      "Priority support with faster replies",
      "Source code ownership",
    ],
    goodToKnow: [
      "Add-ons are available based on your needs.",
      "One language is included (Georgian or English).",
      "Georgian/English bilingual setup is available for 150 ₾.",
      "Extra pages are available and can be tailored to your business.",
    ],
  },
  ecomm: {
    promise: "A full online store with products, orders, tracking, and management tools.",
    bestFor:
      "Businesses that want to sell products online and manage the store without a developer.",
    deliverables: [
      "5 pages included: Home, Shop, Products, About, Contact",
      "Product dashboard to add products, edit prices, update photos, and manage stock",
      "Order management dashboard",
      "Revenue and sales overview",
      "Invoice printing",
      "Google Analytics + advanced conversion tracking",
      "Source code ownership",
    ],
    goodToKnow: [
      "Add-ons are available based on your needs.",
      "One language is included (Georgian or English).",
      "Georgian/English bilingual setup is available for 150 ₾.",
      "Advanced integrations and custom workflows are available as add-ons.",
    ],
  },
};

export function PricingTierDeck({ tiers }: { tiers: PricingTierDeckType[] }) {
  const params = useParams();
  const locale = params?.locale || "en";

  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {tiers.map((tier, idx) => {
        const foundation = FOUNDATIONS.find((f) => f.id === tier.id);
        const cardCopy = BUYER_CARD_COPY[tier.id];
        if (!foundation || !cardCopy) return null;

        const waText = encodeURIComponent(
          tier.id === "ecomm" 
            ? `Hi Genezisi! I'm interested in the E-Commerce HQ package (starting 3,999 ₾). Can we discuss next steps?`
            : `Hi Genezisi! I'm interested in the ${tier.label} package. Can we discuss next steps?`
        );

        const isPopular = tier.badge === "Most Popular";

        return (
          <div
            key={foundation.id}
            className={`relative flex flex-col rounded-2xl border transition-shadow hover:shadow-lg ${
              isPopular
                ? "border-emerald-400/50 bg-emerald-500/5 shadow-[0_0_32px_rgba(16,185,129,0.15)]"
                : "border-white/10 bg-white/[0.02]"
            }`}
          >
            {/* Badge */}
            {tier.badge && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-500 px-3 py-0.5 text-[10px] font-black uppercase tracking-widest text-slate-950">
                {tier.badge}
              </span>
            )}

            <div className="flex flex-1 flex-col gap-4 p-6">
              {/* Header */}
              <div>
                <h3 className="text-lg font-black text-white">{tier.label}</h3>
                <p className="mt-1 text-sm text-slate-300">{cardCopy.promise}</p>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black font-space text-white">
                  {foundation.customPriceLabel ?? formatPrice(foundation.priceGEL)}
                </span>
              </div>

              {/* Best for */}
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">Best for</p>
                <p className="mt-1 text-xs text-slate-300">{cardCopy.bestFor}</p>
              </div>

              {/* You get */}
              <div>
                <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-emerald-300">You get</p>
                <ul className="flex flex-col gap-1.5 text-sm text-slate-300">
                  {cardCopy.deliverables.map((deliverable) => (
                    <li key={deliverable} className="flex items-start gap-2">
                      <span className="mt-1 text-emerald-400">✓</span>
                      <span>{deliverable}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Timeline + warranty */}
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Timeline</p>
                  <p className="mt-1 text-xs font-semibold text-slate-200">{foundation.deliveryTimeline}</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Warranty</p>
                  <p className="mt-1 text-xs font-semibold text-slate-200">{foundation.warrantyDays}-day bug warranty</p>
                </div>
              </div>

              {/* Good to know */}
              <div className="rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Good to know</p>
                <ul className="mt-2 space-y-1.5 text-xs text-slate-300">
                  {cardCopy.goodToKnow.map((note) => (
                    <li key={note} className="flex items-start gap-2">
                      <span className="text-emerald-400">-</span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Spacer */}
              <div className="mt-auto" />

              {/* CTA */}
              {foundation.id === 'cms' || foundation.id === 'saas' || foundation.id === 'ecomm' ? (
                <div className="flex flex-col gap-2 mt-2">
                  <Link
                    href={`/${locale}/pricing/${
                      foundation.id === 'cms' ? 'professional' : 
                      foundation.id === 'saas' ? 'command-center' : 
                      'e-commerce'
                    }`}
                    className="inline-flex min-h-[48px] items-center justify-center rounded-xl text-center text-sm font-bold transition border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20"
                  >
                    More information →
                  </Link>
                  <a
                    href={`${WA_BASE}?text=${waText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-emerald-500 text-center text-sm font-bold text-slate-950 transition hover:bg-emerald-400"
                  >
                    Get started →
                  </a>
                </div>
              ) : (
                <a
                  href={`${WA_BASE}?text=${waText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-2 inline-flex min-h-[48px] items-center justify-center rounded-xl text-center text-sm font-bold transition ${
                    isPopular
                      ? "bg-emerald-500 text-slate-950 hover:bg-emerald-400"
                      : "border border-white/10 bg-white/5 text-white hover:bg-white/10"
                  }`}
                >
                  Get Started on WhatsApp
                </a>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
