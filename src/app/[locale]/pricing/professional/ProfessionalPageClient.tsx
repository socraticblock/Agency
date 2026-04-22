"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, X, Shield, Smartphone, Zap, Code, Search, Settings2, RefreshCcw, Handshake } from "lucide-react";
import { WHATSAPP_INTAKE } from "@/constants/content";
import { SHIELD_TIERS } from "@/constants/pricing";

const WA_BASE = `https://wa.me/${WHATSAPP_INTAKE}`;

export function ProfessionalPageClient() {
  const [shieldModalOpen, setShieldModalOpen] = useState(false);

  const waText = encodeURIComponent(
    "Hi Genezisi! I'm interested in the Professional package. Can we discuss next steps?"
  );
  const waLink = `${WA_BASE}?text=${waText}`;

  return (
    <div className="mx-auto max-w-5xl px-4 pb-24 pt-10 sm:px-6 sm:pt-14">
      {/* Back to Pricing */}
      <div className="mb-8">
        <Link href="/en/pricing" className="text-sm font-bold text-emerald-400 hover:underline">
          ← Back to Packages
        </Link>
      </div>

      <header className="mb-16 border-b border-white/10 pb-12">
        <h1 className="text-4xl font-black text-white sm:text-6xl">
          Professional <span className="text-emerald-400">— ₾999</span>
        </h1>
        <p className="mt-4 text-xl font-medium text-slate-300">
          One-page custom landing website. Built in 7–10 days.
        </p>
      </header>

      {/* CORE FEATURES GRID */}
      <section className="mb-16">
        <div className="mb-8">
          <h2 className="text-2xl font-black text-white sm:text-3xl">What You Get</h2>
          <p className="mt-2 text-slate-400">Everything needed for a premium digital footprint.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <FeatureCard 
            icon={<Settings2 className="h-6 w-6 text-emerald-400" />}
            title="100% Custom Design — No Templates"
            body="Your website is designed from scratch for your brand and your goals. No pre-made templates, no template colours or layouts. Every pixel is built for you. This means your site will look and feel like you — not like every other business using the same template."
          />
          <FeatureCard 
            icon={<Smartphone className="h-6 w-6 text-emerald-400" />}
            title="Mobile-First Responsive"
            body="Over 70% of your Georgian clients will visit your website from their phone. We design mobile-first — your site looks and works perfectly on phones first, then scales up to desktop. No pinching, no horizontal scrolling, no broken layouts."
          />
          <FeatureCard 
            icon={<Zap className="h-6 w-6 text-emerald-400" />}
            title="Performance Optimised"
            body="Your site is built for speed — target load time under 2.5 seconds. Fast sites rank higher on Google and keep mobile visitors from bouncing."
          />
          <FeatureCard 
            icon={<Handshake className="h-6 w-6 text-emerald-400" />}
            title="Conversion-Optimised Layout"
            body="Your page isn't just beautiful — it's built to turn visitors into leads. Every section, every button, every blank space is placed strategically to guide your visitor toward taking action: filling out your form, booking a call, or messaging you on WhatsApp."
          />
          <FeatureCard 
            icon={<Search className="h-6 w-6 text-emerald-400" />}
            title="Full SEO Suite Included"
            body={
              <ul className="mt-2 space-y-1 text-sm text-slate-300 list-disc ml-4">
                <li>Google Analytics 4 + event tracking</li>
                <li>Schema markup for richer Google results</li>
                <li>Open Graph tags for social sharing</li>
                <li>XML sitemap to help Google index you</li>
              </ul>
            }
          />
          <FeatureCard 
            icon={<Code className="h-6 w-6 text-emerald-400" />}
            title="Source Code Ownership"
            body="When we're done, you own your website's code. We hand it over. No lock-in, no monthly platform fees. Your website is your asset."
          />
        </div>
      </section>

      {/* 6 SECTIONS */}
      <section className="mb-16 rounded-3xl border border-white/5 bg-white/[0.02] p-6 sm:p-10">
        <h2 className="text-2xl font-black text-white sm:text-3xl">6 Pre-Built Sections — Pick Any 4</h2>
        <p className="mt-2 text-slate-400 mb-6">
          Your landing page is built from our section library. You choose any 4 of the following:
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {["Services", "About", "Testimonials", "Gallery", "Video", "Booking"].map((sec) => (
            <div key={sec} className="flex items-center gap-3 rounded-xl bg-black/20 px-4 py-3 border border-white/5">
              <Check className="h-5 w-5 text-emerald-500" />
              <span className="font-bold text-white">{sec}</span>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-slate-300">
          <strong>Recommended:</strong> Services + About + Testimonials + Gallery.<br/>
          Think something else would work better? No problem. This is a custom build — tell us what you have in mind and our architect will work with you.
        </p>
      </section>

      {/* ADDITIONAL PERKS */}
      <section className="mb-16 grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 p-6 bg-zinc-900/50">
          <h3 className="font-bold text-white mb-2">Subtle Scroll Animations</h3>
          <p className="text-sm text-slate-400">Gentle text fades, floating images, and glowing buttons. Apple-style polish, not a carnival.</p>
        </div>
        <div className="rounded-2xl border border-white/10 p-6 bg-zinc-900/50">
          <h3 className="font-bold text-white mb-2">Advanced Contact Form</h3>
          <p className="text-sm text-slate-400">Dropdowns, file uploads, and date pickers. Submissions go straight to your WhatsApp.</p>
        </div>
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">
          <RefreshCcw className="mb-3 h-6 w-6 text-emerald-400" />
          <h3 className="font-bold text-emerald-400 mb-2">Warranty &amp; Revisions</h3>
          <p className="text-sm text-slate-400">
            <strong>45-Day Warranty:</strong> We fix any breaks free of charge.<br/>
            <strong>2 Revision Rounds:</strong> Two full rounds of changes during the build.
          </p>
        </div>
      </section>

      {/* WHAT'S NOT INCLUDED */}
      <section className="mb-16 border-t border-red-500/20 pt-12">
        <h2 className="text-2xl font-black text-red-400 sm:text-3xl">What's Not Included (Important)</h2>
        <div className="mt-6 grid gap-4">
          <div className="rounded-xl border border-red-500/10 bg-red-500/5 p-5">
            <h4 className="font-bold text-white">Additional pages</h4>
            <p className="text-sm text-slate-400 mt-1">Professional is one landing page. Need Home + About + Contact as separate pages? That's Command Center (₾1,999)</p>
          </div>
          <div className="rounded-xl border border-red-500/10 bg-red-500/5 p-5">
            <h4 className="font-bold text-white">CMS / content management</h4>
            <p className="text-sm text-slate-400 mt-1">You cannot update content yourself. Changes go through us. Want to manage your own content? See Command Center</p>
          </div>
          <div className="rounded-xl border border-red-500/10 bg-red-500/5 p-5">
            <h4 className="font-bold text-white">Blog / News section</h4>
            <p className="text-sm text-slate-400 mt-1">Not available on Professional. See Command Center</p>
          </div>
        </div>
      </section>

      {/* ADD ONS */}
      <section className="mb-16">
         <h2 className="text-2xl font-black text-white sm:text-3xl">Available Add-Ons</h2>
         <p className="mt-2 text-slate-400 mb-6">Tell us during the onboarding brief if you'd like any of these.</p>
         <div className="grid gap-6 md:grid-cols-2">
           <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">
             <h4 className="font-bold text-white mb-1">Additional Sections — ₾50 each</h4>
             <p className="text-sm text-slate-400">Need more than 4 sections? You can add any of the remaining sections from our library to your landing page at a flat rate. Custom section requests are always welcome.</p>
           </div>
           <div className="rounded-2xl border border-white/10 p-6">
             <h4 className="font-bold text-white mb-1">Multi-Language Setup — ₾150</h4>
             <p className="text-sm text-slate-400">Your site, in two languages. We handle the technical setup — the language switcher, routing visitors to the right version, and implementing both sets of content. For the actual translation: use our in-house translator (₾100/hour), hire your own, or translate it yourself using Google Docs and we'll implement both versions.</p>
           </div>
           <div className="rounded-2xl border border-white/10 p-6">
             <h4 className="font-bold text-white mb-1">Professional Copywriting — ₾600</h4>
             <p className="text-sm text-slate-400">We write your page copy using AIDA framework (Attention, Interest, Desire, Action). Give us your brief, we write all the text for your 4 sections. Ideal if you want professional, persuasive copy but don't have time to write it yourself.</p>
           </div>
           <div className="rounded-2xl border border-white/10 p-6">
             <h4 className="font-bold text-white mb-1">Lead Capture Exit Pop-ups — ₾300</h4>
             <p className="text-sm text-slate-400">When a visitor is about to leave your page, a subtle pop-up appears with a special offer or a reminder to book a call. Captures leads who would otherwise bounce without taking action.</p>
           </div>
           <div className="rounded-2xl border border-white/10 p-6 bg-white/[0.02]">
             <h4 className="font-bold text-white mb-1">Anything else? Just ask</h4>
             <p className="text-sm text-slate-400">If you need something not listed — tell us what you have in mind and we'll scope it for you.</p>
           </div>
         </div>
      </section>

      {/* SHIELD */}
      <section className="mb-32">
        <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-8 sm:p-12">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-8 w-8 text-emerald-400" />
            <h2 className="text-2xl font-black text-white sm:text-3xl">Shield — Hosting &amp; Security</h2>
          </div>
          <p className="text-slate-300 max-w-2xl text-lg mb-8">
            Shield is required for all websites. We buy your .ge domain (yours forever), host it securely with SSL, and extend your warranty.
          </p>

          <div className="grid gap-6 md:grid-cols-2 lg:gap-10">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-6">
               <h4 className="text-xl font-bold text-white">Reputation Scout — ₾120/yr</h4>
               <ul className="mt-4 space-y-4 text-sm text-slate-300">
                 <li className="flex gap-2">
                   <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                   <div>
                     <span className="font-bold text-white block">SSL monitoring</span>
                     <span className="text-xs text-slate-400">Prevents "Not Secure" browser warnings</span>
                   </div>
                 </li>
                 <li className="flex gap-2">
                   <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                   <div>
                     <span className="font-bold text-white block">Blacklist monitoring</span>
                     <span className="text-xs text-slate-400">Daily checks to keep your domain out of spam lists</span>
                   </div>
                 </li>
                 <li className="flex gap-2">
                   <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                   <div>
                     <span className="font-bold text-white block">Backed up with every developer change</span>
                     <span className="text-xs text-slate-400">Your site is safe whenever we work on it</span>
                   </div>
                 </li>
                 <li className="flex gap-2">
                   <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                   <div>
                     <span className="font-bold text-white block">Domain included</span>
                     <span className="text-xs text-slate-400">We buy your .ge domain for you (yours forever)</span>
                   </div>
                 </li>
               </ul>
            </div>
            
            <div className="rounded-2xl border border-white/10 bg-black/20 p-6">
               <h4 className="text-xl font-bold text-white">Micro Shield — ₾500/yr</h4>
               <p className="mt-2 text-sm font-medium text-slate-400">Everything in Reputation Scout, plus:</p>
               <ul className="mt-4 space-y-4 text-sm text-slate-300">
                 <li className="flex gap-2">
                   <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                   <div>
                     <span className="font-bold text-white block">Global content delivery</span>
                     <span className="text-xs text-slate-400">For instant loading anywhere in Georgia</span>
                   </div>
                 </li>
                 <li className="flex gap-2">
                   <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                   <div>
                     <span className="font-bold text-white block">60-second automated uptime checks</span>
                     <span className="text-xs text-slate-400">We know within a minute if your site goes down</span>
                   </div>
                 </li>
                 <li className="flex gap-2">
                   <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                   <div>
                     <span className="font-bold text-white block">Daily backups (30-day rollback)</span>
                     <span className="text-xs text-slate-400">Roll back any change within 30 days</span>
                   </div>
                 </li>
                 <li className="flex gap-2">
                   <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                   <div>
                     <span className="font-bold text-white block">Database speed optimisation</span>
                     <span className="text-xs text-slate-400">Keeps your site fast over time</span>
                   </div>
                 </li>
                 <li className="flex gap-2">
                   <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                   <div>
                     <span className="font-bold text-white block">Security patching</span>
                     <span className="text-xs text-slate-400">Ongoing protection against new vulnerabilities</span>
                   </div>
                 </li>
               </ul>
            </div>
          </div>

          <div className="mt-8 text-center sm:text-left">
            <button 
              onClick={() => setShieldModalOpen(true)}
              className="text-sm font-bold text-emerald-400 hover:text-emerald-300 hover:underline transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 flex items-center gap-1 mx-auto sm:mx-0"
            >
              [See full Shield comparison →]
            </button>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <div className="text-center">
        <h2 className="text-3xl font-black text-white sm:text-4xl">Ready to start? Let's talk.</h2>
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex min-h-[56px] items-center justify-center rounded-xl bg-emerald-500 px-10 text-center text-lg font-bold text-slate-950 transition hover:bg-emerald-400"
        >
          Chat with us on WhatsApp →
        </a>
      </div>

      {/* SHIELD MODAL */}
      {shieldModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl bg-zinc-950 border border-white/10 p-6 sm:p-10 shadow-2xl">
            <button 
              onClick={() => setShieldModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            
            <div className="mb-10 pr-12">
              <h2 className="text-3xl font-black text-emerald-400 flex items-center gap-3">
                <Shield className="h-8 w-8" />
                Sentinel Protocol Shields
              </h2>
              <p className="mt-3 text-slate-400 max-w-2xl">
                Infrastructure and revenue protection plans. Shield is mandatory for all live websites to ensure security, speed, and continuous operation.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {SHIELD_TIERS.map((tier) => (
                <div 
                  key={tier.id} 
                  className={`relative flex flex-col rounded-2xl border p-6 transition-colors ${
                    tier.isRecommended
                      ? "border-emerald-500/40 bg-emerald-500/5 shadow-[0_0_30px_rgba(16,185,129,0.1)]"
                      : "border-white/10 bg-white/5"
                  }`}
                >
                  {tier.isRecommended && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-500 px-3 py-0.5 text-[10px] font-black uppercase tracking-widest text-slate-950">
                      Recommended
                    </span>
                  )}
                  
                  <div className="mb-4">
                    <h4 className="text-lg font-black text-white">{tier.name}</h4>
                    <div className="mt-1 flex items-baseline gap-1">
                      <span className="text-xl font-black font-space text-emerald-400">
                        {tier.priceGEL === 0 ? "Included" : `${tier.priceGEL} ₾/yr`}
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-slate-400">{tier.description}</p>
                  </div>
                  
                  <hr className="my-4 border-white/10" />
                  
                  <ul className="flex flex-col gap-3">
                    {tier.perks.map((perk, j) => (
                      <li key={j} className="flex gap-2">
                        <span className="mt-0.5 text-emerald-400 shrink-0">✓</span>
                        <div>
                          <p className="text-xs font-bold text-white leading-tight">{perk.title}</p>
                          <p className="mt-0.5 text-[11px] text-slate-400 leading-tight">{perk.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            
            <div className="mt-10 pt-6 border-t border-white/10 text-center">
               <button 
                 onClick={() => setShieldModalOpen(false)}
                 className="inline-flex h-12 items-center justify-center rounded-xl bg-white/10 px-8 text-sm font-bold text-white hover:bg-white/20 transition-colors"
               >
                 Close Comparison
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FeatureCard({ icon, title, body }: { icon: React.ReactNode, title: string, body: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:bg-white/[0.04] transition-colors">
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-black/50 border border-white/5 shadow-inner">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <div className="text-sm text-slate-400 leading-relaxed">{body}</div>
    </div>
  );
}
