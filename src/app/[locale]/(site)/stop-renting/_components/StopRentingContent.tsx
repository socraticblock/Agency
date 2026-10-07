"use client";

import { motion } from "framer-motion";
import { Calendar, CreditCard, Magnet, BarChart3, ArrowRight } from "lucide-react";
import { KineticText } from "../../_components/KineticText";
import { MagneticButton } from "../../_components/MagneticButton";
import { ScrollReveal } from "../../_components/ScrollReveal";
import { TrueAudienceVisualizer } from "../../_components/lead-gen/TrueAudienceVisualizer";
import { TimeDebtReceipt } from "../../_components/lead-gen/TimeDebtReceipt";
import type { Locale } from "@/lib/i18n";

interface StopRentingContentProps {
  locale: Locale;
}

const MetricBar = ({ label, smValue, webValue }: { label: string; smValue: number; webValue: number }) => {
  return (
    <div>
      <div className="flex justify-between text-sm font-medium mb-2">
        <span className="text-slate-300">{label}</span>
      </div>
      <div className="space-y-3">
        <div className="relative h-8 bg-slate-800 rounded-md overflow-hidden flex items-center">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${smValue}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="absolute top-0 left-0 h-full bg-slate-600"
          />
          <span className="relative z-10 ml-3 text-xs font-bold text-white">
            Social Media: {smValue}%
          </span>
        </div>
        <div className="relative h-8 bg-slate-800 rounded-md overflow-hidden flex items-center">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${webValue}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            className="absolute top-0 left-0 h-full bg-emerald-500"
          />
          <span className="relative z-10 ml-3 text-xs font-bold text-slate-900">
            Custom Website: {webValue}%
          </span>
        </div>
      </div>
    </div>
  );
};

const TrustMetrics = () => {
  return (
    <div className="clay-card clay-card-hover bg-slate-900 rounded-2xl shadow-xl p-8 sm:p-10 border border-slate-800 h-full">
      <h2 className="text-2xl font-bold text-slate-100 mb-3 sm:text-3xl">
        Trust & Conversion Metrics
      </h2>
      <p className="text-slate-400 mb-8 max-w-lg">
        Consumers trust brands with professional websites. See how an Instagram page compares to a custom website across key performance indicators.
      </p>

      <div className="space-y-8">
        <MetricBar label="Perceived Brand Professionalism" smValue={40} webValue={95} />
        <MetricBar label="Customer Data Ownership" smValue={5} webValue={100} />
        <MetricBar label="Checkout Conversion Rate" smValue={25} webValue={75} />
      </div>
      <p className="text-sm text-emerald-400/80 mt-8 text-center font-medium">
        84% of consumers believe a business with a website is more credible.
      </p>
    </div>
  );
};

const BentoGrid = () => {
  const tools = [
    {
      icon: Calendar,
      title: "Automated Booking",
      desc: "No more 'What time are you available?' DMs. Integrated calendar systems let clients book and pay 24/7 without your input.",
      color: "text-amber-400",
      border: "border-amber-400/50",
    },
    {
      icon: CreditCard,
      title: "Secure Checkouts",
      desc: "Accept global and local payments securely. We integrate seamless checkout flows so you stop relying on manual bank transfers.",
      color: "text-blue-400",
      border: "border-blue-400/50",
    },
    {
      icon: Magnet,
      title: "Lead Generation",
      desc: "Capture emails and client data. Build an asset you own. If Instagram shuts down tomorrow, your customer list goes with you.",
      color: "text-amber-400",
      border: "border-amber-400/50",
    },
    {
      icon: BarChart3,
      title: "Deep Analytics",
      desc: "Stop guessing. We implement advanced tracking so you know exactly where your best customers are coming from and what they click.",
      color: "text-blue-400",
      border: "border-blue-400/50",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {tools.map((tool, i) => (
        <ScrollReveal key={i}>
          <div
            className={`clay-card clay-card-hover p-6 rounded-xl shadow-lg border-b-4 ${tool.border} bg-slate-900 h-full`}
          >
            <tool.icon className={`w-10 h-10 mb-4 ${tool.color}`} />
            <h3 className="text-xl font-bold text-slate-100 mb-2">{tool.title}</h3>
            <p className="text-sm text-slate-400">{tool.desc}</p>
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
};

const RoadmapTimeline = () => {
  const phases = [
    {
      title: "Phase 1: Discovery & Strategy",
      desc: "We analyze your current social media workflow, identify bottlenecks, and map out a site structure designed specifically to automate your biggest headaches.",
    },
    {
      title: "Phase 2: Custom Design & UX",
      desc: "No cheap templates. We craft a professional, mobile-first design that elevates your brand identity and builds immediate trust with visitors.",
    },
    {
      title: "Phase 3: Integration & Automations",
      desc: "We wire up the magic: payment gateways, automated booking forms, email marketing lists, and CRM connections.",
    },
    {
      title: "Phase 4: Launch & Handover",
      desc: "We launch your new business hub, ensure proper SEO indexing, and teach you how to easily manage your new digital real estate.",
    },
  ];

  return (
    <div className="max-w-3xl mx-auto mt-12 py-12 px-6 sm:px-12 bg-slate-900 rounded-3xl shadow-2xl border border-slate-800">
      <div className="flex flex-col">
        {phases.map((phase, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ delay: i * 0.2 }}
            className="flex gap-6 sm:gap-8"
          >
            {/* Timeline Line & Dot */}
            <div className="flex flex-col items-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 + 0.3, type: "spring" }}
                className="w-4 h-4 rounded-full bg-emerald-500 ring-4 ring-slate-900 z-10 mt-1.5 flex-shrink-0"
              />
              {/* Connects to the next item */}
              {i !== phases.length - 1 && (
                <div className="w-0.5 flex-grow bg-slate-800 my-2" />
              )}
            </div>
            {/* Content */}
            <div className={`${i !== phases.length - 1 ? "pb-12" : ""}`}>
              <h3 className="text-xl font-bold text-emerald-400">{phase.title}</h3>
              <p className="mt-2 text-slate-300">{phase.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export function StopRentingContent({ locale }: StopRentingContentProps) {
  return (
    <div className="relative overflow-hidden pb-24">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
        <KineticText
          text="Stop Renting Your Business Space."
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-slate-100 tracking-tight mb-8 max-w-4xl leading-tight"
          splitBy="word"
          delay={0.1}
        />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-xl text-slate-400 max-w-3xl mx-auto mb-12"
        >
          For Instagram and Facebook entrepreneurs in Tbilisi &amp; beyond: Relying
          solely on social algorithms is risky. Discover the hard data on why
          owning your platform is the ultimate growth hack, and the exact tools
          you need to automate your income.
        </motion.p>
        
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
        >
            <MagneticButton>
                <div className="flex items-center gap-2 px-8 py-4 bg-emerald-500 text-slate-900 font-bold rounded-full hover:bg-emerald-400 transition-colors">
                    See Your Real Numbers <ArrowRight className="w-5 h-5" />
                </div>
            </MagneticButton>
        </motion.div>
      </section>

      {/* The Social Media Trap */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="mb-12 text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-slate-100 mb-6">The Social Media Trap</h2>
            <p className="text-lg text-slate-400">
              You are building your empire on rented land. Over the last few years, organic reach on major social platforms has plummeted to force businesses to buy ads. If you don't own your audience, you don't own your business.
            </p>
          </div>
        </ScrollReveal>
        
        <ScrollReveal>
            <TrueAudienceVisualizer locale={locale} />
        </ScrollReveal>
      </section>

      {/* Time & Trust Metrics Split */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-stretch">
            <ScrollReveal className="h-full">
                <TimeDebtReceipt locale={locale} />
            </ScrollReveal>
            <ScrollReveal className="h-full">
                <TrustMetrics />
            </ScrollReveal>
        </div>
      </section>

      {/* The Ultimate Digital Toolkit */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <ScrollReveal>
            <div className="text-center mb-16 max-w-3xl mx-auto">
                <h2 className="text-4xl font-bold text-slate-100 mb-6">The Ultimate Digital Toolkit</h2>
                <p className="text-lg text-slate-400">
                    This is what we build. Transitioning from a social page to a fully automated business machine requires specific tools. Here is what your custom website will provide to scale your operations effortlessly.
                </p>
            </div>
        </ScrollReveal>

        <BentoGrid />
      </section>

      {/* Roadmap to Independence */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
         <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-4xl font-bold text-slate-100 mb-6">Your Roadmap to Independence</h2>
                <p className="text-lg text-slate-400">
                    Moving off rented land and onto your own platform is a 4-step process. Here is how we make it seamless.
                </p>
            </div>
        </ScrollReveal>

        <RoadmapTimeline />
      </section>
    </div>
  );
}
