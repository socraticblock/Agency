"use client";

import { motion } from "framer-motion";
import { AuditCitation } from "./lead-gen/AuditCitation";

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

export function TrustMetrics() {
  return (
    <div className="clay-card clay-card-hover rounded-2xl shadow-xl p-8 sm:p-10 h-full max-w-3xl mx-auto">
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
      <div className="mt-8">
        <AuditCitation
          dataPoint="84% of consumers believe a business with a website is more credible."
          explanation="Creating a dedicated digital destination builds instant legitimacy. Consumers look for the security, structure, and professional detail that only a custom workspace can offer compared to a social profile feed."
          source="Verisign Consumer Surveys"
        />
      </div>
    </div>
  );
}
