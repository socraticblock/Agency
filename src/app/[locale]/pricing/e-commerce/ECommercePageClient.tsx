"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, X, Shield, Smartphone, Zap, Code, Search, Settings2, RefreshCcw, Handshake } from "lucide-react";
import { WHATSAPP_INTAKE } from "@/constants/content";
import { SHIELD_TIERS } from "@/constants/pricing";

const WA_BASE = `https://wa.me/${WHATSAPP_INTAKE}`;

export function ECommercePageClient() {
  const [shieldModalOpen, setShieldModalOpen] = useState(false);

  const waText = encodeURIComponent(
    "Hi Genezisi! I'm interested in the E-Commerce HQ package (starting 3,999 ₾). Can we discuss next steps?"
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
          E-Commerce HQ <span className="text-emerald-400">— starting 3,999 ₾</span>
        </h1>
        <p className="mt-4 text-xl font-medium text-slate-300">
          The base price of ₾3,999 covers everything you need to launch. Add bank integration or RS.ge when you're ready. Built in 20-30 business days.
        </p>
        <p className="mt-2 text-sm font-bold text-emerald-400">
          Base package: English only. Multi-language setup available for ₾500.
        </p>
      </header>

      {/* CORE FEATURES GRID */}
      <section className="mb-16">
        <div className="mb-8">
          <h2 className="text-2xl font-black text-white sm:text-3xl">What You Get</h2>
          <p className="mt-2 text-slate-400">Everything needed for a premium digital storefront.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <FeatureCard 
            icon={<Settings2 className="h-6 w-6 text-emerald-400" />}
            title="5 Pages Built for Selling"
            body="Home, Shop, Products, About, Contact — all five pages included. Each page is fully editable through your CMS dashboard. No developer needed for content changes."
          />
          <FeatureCard 
            icon={<Smartphone className="h-6 w-6 text-emerald-400" />}
            title="Full CMS Dashboard"
            body="You add products, update prices, manage stock without touching code. You are completely independent via the CMS dashboard."
          />
          <FeatureCard 
            icon={<Zap className="h-6 w-6 text-emerald-400" />}
            title="Business Cockpit"
            body="Private dashboard for revenue, orders, and invoice printing in seconds."
          />
          <FeatureCard 
            icon={<Search className="h-6 w-6 text-emerald-400" />}
            title="GA4 + Conversion Tracking"
            body="Google Analytics 4 with advanced conversion tracking is included in the base package to monitor your sales pipeline."
          />
          <FeatureCard 
            icon={<RefreshCcw className="h-6 w-6 text-emerald-400" />}
            title="Warranty & Revisions"
            body="100-Day Warranty for full coverage on any bugs. Plus 4 deep revision rounds during the build process."
          />
          <FeatureCard 
            icon={<Code className="h-6 w-6 text-emerald-400" />}
            title="Source Code Ownership"
            body="You own everything legally. No lock-in, no holding custom code hostage."
          />
        </div>
      </section>



      {/* ADD ONS */}
      <section className="mb-16">
         <h2 className="text-2xl font-black text-white sm:text-3xl">Available Add-Ons</h2>
         <p className="mt-2 text-slate-400 mb-6">Tell us during the onboarding brief if you'd like any of these.</p>
         <div className="grid gap-6 md:grid-cols-2">
           <div className="rounded-2xl border border-white/10 p-6">
             <h4 className="font-bold text-white mb-1">Bank Integration — ₾500</h4>
             <p className="text-sm text-slate-400">Add direct payment processing (TBC/BOG/etc.) to your checkout if you already have your merchant keys.</p>
           </div>
           <div className="rounded-2xl border border-white/10 p-6">
             <h4 className="font-bold text-white mb-1">Bank Integration + Lawyer — ₾1,500</h4>
             <p className="text-sm text-slate-400">We handle the bank visits, forms, and compliance setup entirely for you alongside the technical integration.</p>
           </div>
           <div className="rounded-2xl border border-white/10 p-6">
             <h4 className="font-bold text-white mb-1">RS.ge Fiscal Sync — ₾1,200</h4>
             <p className="text-sm text-slate-400">Automated e-receipt creation directly to the Georgian Revenue Service for every order placed.</p>
           </div>
           <div className="rounded-2xl border border-white/10 p-6">
             <h4 className="font-bold text-white mb-1">Multi-Language Setup — ₾500</h4>
             <p className="text-sm text-slate-400">Technical setup for dual-language (Georgian/English). We handle the language switcher, routing visitors to the right version, and implementing both. For the actual translation: use our in-house translator (₾100/hour), hire your own, or translate it yourself and we'll implement both versions.</p>
           </div>
           <div className="rounded-2xl border border-white/10 p-6">
             <h4 className="font-bold text-white mb-1">Blog / News CMS — ₾800</h4>
             <p className="text-sm text-slate-400">Add a full blog or news section to your store. Publish articles, updates, and content marketing — all managed through your CMS dashboard.</p>
           </div>
           <div className="rounded-2xl border border-white/10 p-6">
             <h4 className="font-bold text-white mb-1">SMS Hub — ₾650</h4>
             <p className="text-sm text-slate-400">Automated text messages for order updates or shipping confirmations. In Georgia, everyone reads their SMS immediately — it builds trust and cuts "where is my order?" calls.</p>
           </div>
           <div className="rounded-2xl border border-white/10 p-6">
             <h4 className="font-bold text-white mb-1">Recurring Billing System — ₾2,500</h4>
             <p className="text-sm text-slate-400">Technical infrastructure to charge clients automatically on a monthly basis. Perfect for physical subscriptions or ongoing retainers (TBC/BOG tokenization).</p>
           </div>
           <div className="rounded-2xl border border-white/10 p-6">
             <h4 className="font-bold text-white mb-1">Additional Pages — ₾450/page</h4>
             <p className="text-sm text-slate-400">FAQ page, Shipping page, Returns page — any page beyond your 5 included: ₾450/page.</p>
           </div>
           <div className="rounded-2xl border border-white/10 p-6 bg-white/[0.02]">
             <h4 className="font-bold text-white mb-1">Anything else? Just ask</h4>
             <p className="text-sm text-slate-400">If it's not on this list (like recurring billing), we'll scope it for you.</p>
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

          <h4 className="font-bold text-emerald-400 uppercase tracking-widest text-sm mb-6">Recommended for E-Commerce HQ:</h4>
          
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
            
            <div className="relative rounded-2xl border border-emerald-500/50 bg-emerald-500/10 p-6 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
               <span className="absolute -top-3 left-6 rounded-full bg-emerald-500 px-3 py-0.5 text-[10px] font-black uppercase tracking-widest text-slate-950">
                 Recommended
               </span>
               <h4 className="text-xl font-bold text-white mt-2">Micro Shield — ₾500/yr</h4>
               <p className="mt-2 text-sm font-medium text-emerald-300">Everything in Reputation Scout, plus:</p>
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
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[56px] items-center justify-center rounded-xl bg-emerald-500 px-10 text-center text-lg font-bold text-slate-950 transition hover:bg-emerald-400 w-full sm:w-auto"
          >
            Chat with us on WhatsApp →
          </a>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[56px] items-center justify-center rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-10 text-center text-lg font-bold text-emerald-300 transition hover:bg-emerald-500/20 w-full sm:w-auto"
          >
            More information →
          </a>
        </div>
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
              {SHIELD_TIERS.map((tier) => {
                const isRecommended = tier.id === 1; // Micro Shield is recommended
                return (
                  <div 
                    key={tier.id} 
                    className={`relative flex flex-col rounded-2xl border p-6 transition-colors ${
                      isRecommended
                        ? "border-emerald-500/40 bg-emerald-500/5 shadow-[0_0_30px_rgba(16,185,129,0.1)]"
                        : "border-white/10 bg-white/5"
                    }`}
                  >
                    {isRecommended && (
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
                );
              })}
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
