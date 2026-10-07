import { Bot, MonitorSmartphone, Workflow } from "lucide-react";
import type { V2Copy } from "./hero.copy";

export function Capabilities({ copy }: { copy: V2Copy }) {
 const items=[{Icon:MonitorSmartphone,title:copy.websiteTitle,body:copy.websiteBody},{Icon:Bot,title:copy.aiTitle,body:copy.aiBody},{Icon:Workflow,title:copy.automationTitle,body:copy.automationBody}];
 return <section id="capabilities" className="scroll-mt-16 bg-[#02060b] px-5 py-20 sm:px-8 lg:py-28"><div className="mx-auto max-w-[92rem]"><p className="text-[11px] font-extrabold uppercase tracking-[.2em] text-white/48">{copy.capabilitiesEyebrow}</p><div className="mt-9 grid gap-4 md:grid-cols-3">{items.map(({Icon,title,body})=><article key={title} className="flex gap-5 rounded-[20px] border border-white/[.1] p-6 transition-colors hover:bg-white/[.02] md:block md:min-h-64 md:p-7 lg:p-9"><Icon className="h-6 w-6 shrink-0 text-cyan-100/72" strokeWidth={1.6} aria-hidden/><div className="min-w-0"><h2 className="text-xl font-black tracking-[-.035em] md:mt-12 md:text-2xl">{title}</h2><p className="mt-3 max-w-sm text-base leading-7 text-white/56 md:mt-4">{body}</p></div></article>)}</div></div></section>;
}
