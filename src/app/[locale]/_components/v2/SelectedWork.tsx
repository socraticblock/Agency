import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { V2Copy } from "./hero.copy";

/**
 * Project identity and destinations are shared across languages; only the
 * headings, statuses, descriptions and alt text are localised.
 */
const PROJECTS = [
  {
    name: "TK Counsel",
    href: "https://tkcounsel.com/",
    image: "/work-previews/tk-counsel.webp",
  },
  {
    name: "Frankencoin Desk",
    href: "https://www.frankencoindesk.com/",
    image: "/work-previews/frankencoin-desk.png",
  },
  {
    name: "Her House Pilates",
    href: "https://her-house-pilates.vercel.app/",
    image: "/work-previews/her-house-pilates.webp",
  },
] as const;

export function SelectedWork({ copy }: { copy: V2Copy }) {
 const meta=[{status:copy.tkStatus,body:copy.tkBody,category:copy.legalCategory,alt:copy.altTk},{status:copy.frankStatus,body:copy.frankBody,category:copy.productCategory,alt:copy.altFranken},{status:copy.pilatesStatus,body:copy.pilatesBody,category:copy.wellnessCategory,alt:copy.altPilates}];
 return <section id="work" className="scroll-mt-16 bg-[#e6ded2] px-5 py-20 text-[#173327] sm:px-8 lg:py-28"><div className="mx-auto max-w-[92rem]"><p className="text-[11px] font-extrabold uppercase tracking-[.2em] text-[#173327]/70">{copy.work}</p><div className="mt-4 flex flex-col gap-5 border-b border-[#173327]/20 pb-10 lg:flex-row lg:items-end lg:justify-between"><h2 className="max-w-[10ch] text-[clamp(3rem,5vw,5.5rem)] font-black leading-[.9] tracking-[-.055em]">{copy.proof}</h2><p className="max-w-xl text-base leading-7 text-[#173327]/75">{copy.workIntro}</p></div><div className="mt-10 grid gap-7 lg:grid-cols-3 lg:gap-8">
 {PROJECTS.map((p,i)=><article key={p.name}><a href={p.href} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-4 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-[#173327] focus-visible:ring-offset-4 focus-visible:ring-offset-[#e6ded2] lg:block"><div className="relative aspect-[16/10] w-[38%] shrink-0 overflow-hidden rounded-[16px] bg-[#0a0e18] lg:w-full lg:rounded-[20px]"><Image src={p.image} alt={meta[i].alt} fill sizes="(max-width: 1023px) 40vw, 33vw" className="object-cover object-top transition-transform duration-300 motion-reduce:transition-none group-hover:scale-[1.015] motion-reduce:group-hover:scale-100 group-focus-visible:scale-[1.015]"/></div><div className="min-w-0 lg:mt-5"><ProjectText name={p.name} status={meta[i].status} category={meta[i].category} body={meta[i].body} link={i===2?copy.explorePrototype:copy.viewWebsite}/></div></a></article>)}
 </div></div></section>;
}
function ProjectText({name,status,category,body,link}:{name:string;status:string;category:string;body:string;link:string}){return <><p className="text-[11px] font-extrabold uppercase tracking-[.14em] text-[#173327]/70">{status} · {category}</p><h3 className="mt-2 text-xl font-black tracking-[-.035em] transition-colors group-hover:text-[#285a42] group-focus-visible:text-[#285a42] motion-reduce:transition-none lg:text-2xl">{name}</h3><p className="mt-2 text-sm leading-6 text-[#173327]/75 lg:mt-3">{body}</p><span className="mt-3 inline-flex items-center gap-2 text-sm font-extrabold lg:mt-4">{link}<ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-focus-visible:translate-x-0.5 group-focus-visible:-translate-y-0.5 motion-reduce:transition-none motion-reduce:transform-none" aria-hidden/></span></>;}
