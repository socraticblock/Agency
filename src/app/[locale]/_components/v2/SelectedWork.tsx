import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { V2Copy } from "./hero.copy";

const PROJECTS=[
 {name:"TK Counsel",href:"https://tkcounsel.com/",image:"/work-previews/tk-counsel-real.webp"},
 {name:"Frankencoin Desk",href:"https://www.frankencoindesk.com/",image:"/work-previews/frankencoin-desk.png"},
] as const;

export function SelectedWork({ copy }: { copy: V2Copy }) {
 const meta=[{status:copy.tkStatus,body:copy.tkBody,category:copy.legalCategory},{status:copy.frankStatus,body:copy.frankBody,category:copy.productCategory},{status:copy.pilatesStatus,body:copy.pilatesBody,category:copy.wellnessCategory}];
 return <section id="work" className="scroll-mt-16 bg-[#f0ece5] px-5 py-20 text-[#101114] sm:px-8 lg:py-28"><div className="mx-auto max-w-[92rem]"><p className="text-[11px] font-extrabold uppercase tracking-[.2em] text-black/52">{copy.work}</p><div className="mt-4 flex flex-col gap-5 border-b border-black/12 pb-10 lg:flex-row lg:items-end lg:justify-between"><h2 className="max-w-[10ch] text-[clamp(3rem,5vw,5.5rem)] font-black leading-[.9] tracking-[-.055em]">{copy.proof}</h2><p className="max-w-xl text-base leading-7 text-black/58">{copy.workIntro}</p></div><div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
 {PROJECTS.map((p,i)=><article key={p.name}><a href={p.href} target="_blank" rel="noopener noreferrer" className="group block"><div className="relative aspect-[16/10] overflow-hidden rounded-[20px] bg-[#0a0e18]"><Image src={p.image} alt={p.name+" project preview"} fill sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw" className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.015]"/></div><ProjectText name={p.name} status={meta[i].status} category={meta[i].category} body={meta[i].body} link={copy.viewWebsite}/></a></article>)}
 <article><a href="https://her-house-pilates.vercel.app/" target="_blank" rel="noopener noreferrer" className="group block"><div className="relative aspect-[16/10] overflow-hidden rounded-[20px] bg-[#e8dfd3] p-6"><div className="flex h-full flex-col justify-between rounded-[14px] border border-black/10 bg-[#f7f1e8] p-5"><div className="flex justify-between text-[10px] font-extrabold uppercase tracking-[.16em] text-black/45"><span>Her House</span><span>Vera · Tbilisi</span></div><div><p className="max-w-[9ch] text-[clamp(2rem,3vw,3.2rem)] font-black leading-[.9] tracking-[-.05em]">More than a workout.</p><div className="mt-5 h-1 w-12 bg-black/70"/></div></div></div><ProjectText name="Her House Pilates" status={meta[2].status} category={meta[2].category} body={meta[2].body} link={copy.viewWebsite}/></a></article>
 </div></div></section>;
}
function ProjectText({name,status,category,body,link}:{name:string;status:string;category:string;body:string;link:string}){return <><p className="mt-5 text-[11px] font-extrabold uppercase tracking-[.16em] text-black/45">{status} · {category}</p><h3 className="mt-2 text-2xl font-black tracking-[-.035em]">{name}</h3><p className="mt-3 text-sm leading-6 text-black/58">{body}</p><span className="mt-4 inline-flex items-center gap-2 text-sm font-extrabold">{link}<ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden/></span></>;}
