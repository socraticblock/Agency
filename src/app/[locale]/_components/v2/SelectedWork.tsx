import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { V2Copy } from "./hero.copy";

const PROJECTS=[
 {name:"TK Counsel",href:"https://tkcounsel.com/",image:"/work-previews/tk-counsel-real.webp"},
 {name:"Frankencoin Desk",href:"https://www.frankencoindesk.com/",image:"/work-previews/frankencoin-desk.png"},
] as const;

export function SelectedWork({ copy }: { copy: V2Copy }) {
 const meta=[{status:copy.tkStatus,body:copy.tkBody,category:copy.legalCategory},{status:copy.frankStatus,body:copy.frankBody,category:copy.productCategory},{status:copy.pilatesStatus,body:copy.pilatesBody,category:copy.wellnessCategory}];
 return <section id="work" className="scroll-mt-16 bg-[#f0ece5] px-5 py-20 text-[#101114] sm:px-8 lg:py-28"><div className="mx-auto max-w-[92rem]"><p className="text-[11px] font-extrabold uppercase tracking-[.2em] text-black/52">{copy.work}</p><div className="mt-4 flex flex-col gap-5 border-b border-black/12 pb-10 lg:flex-row lg:items-end lg:justify-between"><h2 className="max-w-[10ch] text-[clamp(3rem,5vw,5.5rem)] font-black leading-[.9] tracking-[-.055em]">{copy.proof}</h2><p className="max-w-xl text-base leading-7 text-black/58">{copy.workIntro}</p></div><div className="mt-10 grid gap-7 lg:grid-cols-3 lg:gap-8">
 {PROJECTS.map((p,i)=><article key={p.name}><a href={p.href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 lg:block"><div className="relative aspect-[16/10] w-[38%] shrink-0 overflow-hidden rounded-[16px] bg-[#0a0e18] lg:w-full lg:rounded-[20px]"><Image src={p.image} alt={p.name+" — website preview"} fill sizes="(max-width: 1023px) 40vw, 33vw" className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.015]"/></div><div className="min-w-0 lg:mt-5"><ProjectText name={p.name} status={meta[i].status} category={meta[i].category} body={meta[i].body} link={copy.viewWebsite}/></div></a></article>)}

 <article><a href="https://her-house-pilates.vercel.app/" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 lg:block"><div className="relative aspect-[16/10] w-[38%] shrink-0 overflow-hidden rounded-[16px] bg-[#e8dfd3] lg:w-full lg:rounded-[20px]"><div className="flex h-full flex-col justify-between p-4 lg:p-6"><span className="text-[9px] font-extrabold uppercase tracking-[.16em] text-black/40 lg:text-[10px]">Her House</span><p className="text-[clamp(1.15rem,4.6vw,2.6rem)] font-black leading-[.95] tracking-[-.05em]">Prototype.</p></div></div><div className="min-w-0 lg:mt-5"><ProjectText name="Her House Pilates" status={meta[2].status} category={meta[2].category} body={meta[2].body} link={copy.viewWebsite}/></div></a></article>
 </div></div></section>;
}
function ProjectText({name,status,category,body,link}:{name:string;status:string;category:string;body:string;link:string}){return <><p className="text-[11px] font-extrabold uppercase tracking-[.14em] text-black/45">{status} · {category}</p><h3 className="mt-2 text-xl font-black tracking-[-.035em] lg:text-2xl">{name}</h3><p className="mt-2 hidden text-sm leading-6 text-black/58 lg:mt-3 lg:block">{body}</p><span className="mt-3 inline-flex items-center gap-2 text-sm font-extrabold lg:mt-4">{link}<ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden/></span></>;}
