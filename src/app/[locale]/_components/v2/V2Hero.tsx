import { Fragment } from "react";
import Script from "next/script";
import type { HomeLocale } from "@/lib/home-i18n";
import type { V2Copy } from "./hero.copy";

/**
 * Approved Screen 01 opening, integrated with the real homepage.
 * The work CTA is a real #work link first; the optional V6.5 passage
 * enhances it only on supported devices. No prototype Work markup here.
 */
const ENTRY: Record<HomeLocale, {
  eyebrow: string;
  intro: string;
  explore: string;
  contact: string;
  footer: string;
  scroll: string;
}> = {
  en: {
    eyebrow: "Digital solutions studio",
    intro: "We build websites, create AI systems, and automate everyday tasks. You can choose one service or combine them.",
    explore: "Explore our work",
    contact: "Start a project",
    footer: "Websites · Automation · AI systems",
    scroll: "Explore below",
  },
  ka: {
    eyebrow: "ციფრული გადაწყვეტილებების სტუდია",
    intro: "ვქმნით ვებსაიტებსა და AI სისტემებს და ვახორციელებთ ყოველდღიური პროცესების ავტომატიზაციას. შეგიძლიათ აირჩიოთ ერთი სერვისი ან მათი კომბინაცია.",
    explore: "ნახეთ ჩვენი ნამუშევრები",
    contact: "დავიწყოთ პროექტი",
    footer: "ვებსაიტები · ავტომატიზაცია · AI სისტემები",
    scroll: "გაიგეთ მეტი",
  },
  nl: {
    eyebrow: "Studio voor digitale oplossingen",
    intro: "We bouwen websites, ontwikkelen AI-systemen en automatiseren dagelijkse taken. Kies één dienst of combineer ze.",
    explore: "Ontdek ons werk",
    contact: "Start een project",
    footer: "Websites · Automatisering · AI-systemen",
    scroll: "Ontdek meer",
  },
};

/** Approved four-frame Card 2 composition, localized independently of Screen 01. */
const CARD2: Record<HomeLocale,{
  availabilityLong:string;availabilityShort:string;concept:string;
  built:string;around:string;ideas:string;intro:string;
  serviceLabels:[string,string,string];titles:[string,string,string];
  summaries:[string,string,string];
}> = {
 en:{
  availabilityLong:"INDEPENDENT OR CONNECTED",availabilityShort:"SEPARATE OR TOGETHER",
  concept:"YOUR IDEA / OUR CRAFT",built:"Built",around:"around",ideas:"your ideas.",
  intro:"Create something new. Improve what exists. Make everyday work easier.",
  serviceLabels:["01 / DIGITAL EXPERIENCES","02 / CONNECTED WORK","03 / USEFUL INTELLIGENCE"],
  titles:["Websites","Automation","AI systems"],
  summaries:["Thoughtful sites & applications","Workflows that connect your tools","Assistants built for real tasks"]
 },
 ka:{
  availabilityLong:"დამოუკიდებლად ან ერთად",availabilityShort:"ცალ-ცალკე ან ერთად",
  concept:"თქვენი იდეა / ჩვენი საქმე",built:"შექმნილი",around:"თქვენი",ideas:"იდეებისთვის.",
  intro:"შევქმნათ ახალი, გავაუმჯობესოთ არსებული და გავამარტივოთ ყოველდღიური სამუშაო.",
  serviceLabels:["01 / ციფრული გამოცდილება","02 / დაკავშირებული პროცესები","03 / სასარგებლო ინტელექტი"],
  titles:["ვებსაიტები","ავტომატიზაცია","AI სისტემები"],
  summaries:["გააზრებული საიტები და აპლიკაციები","პროცესები, რომლებიც თქვენს ხელსაწყოებს აკავშირებს","რეალურ ამოცანებზე მორგებული ასისტენტები"]
 },
 nl:{
  availabilityLong:"AFZONDERLIJK OF VERBONDEN",availabilityShort:"APART OF SAMEN",
  concept:"JOUW IDEE / ONS VAKMANSCHAP",built:"Gebouwd",around:"rond",ideas:"jouw ideeën.",
  intro:"Creëer iets nieuws. Verbeter wat bestaat. Maak dagelijks werk eenvoudiger.",
  serviceLabels:["01 / DIGITALE ERVARINGEN","02 / VERBONDEN WERK","03 / BRUIKBARE INTELLIGENTIE"],
  titles:["Websites","Automatisering","AI-systemen"],
  summaries:["Doordachte sites en applicaties","Workflows die je tools verbinden","Assistenten voor echte taken"]
 }
};

export function V2Hero({
  locale,
  copy,
  contactHref,
}: {
  locale: HomeLocale;
  copy: V2Copy;
  contactHref: string;
}) {
  const entry = ENTRY[locale];
  const card = CARD2[locale];
  const lines = copy.heroDesktop.split("\n");
  return (
    <>
      <section className="opening" id="top" aria-label={entry.eyebrow}>
        <div className="intro">
          <p className="eyebrow">{entry.eyebrow}</p>
          <h1>
            {lines.map((line, index) => (
              <Fragment key={index}>
                {index > 0 && <br />}
                {index === lines.length - 1 ? <em>{line}</em> : line}
              </Fragment>
            ))}
          </h1>
          <p className="body">{entry.intro}</p>
          <div className="actions">
            <a className="button primary" href="#work">
              {entry.explore}<span aria-hidden="true">↗</span>
            </a>
            <a className="button" href={contactHref} target="_blank" rel="noopener noreferrer">
              {entry.contact}<span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div className="interface-wrap" aria-hidden="true">
          <div className="stack">
            <div className="sheet" />
            <div className="sheet two" />
            <div className="site-window card2-window">
              <div className="window-head card2-head">
                <span>{locale==="en"?"THREE DISCIPLINES":locale==="ka"?"სამი მიმართულება":"DRIE DISCIPLINES"}</span>
                <small>
                  <span className="card2-availability-long">{card.availabilityLong}</span>
                  <span className="card2-availability-short">{card.availabilityShort}</span>
                </small>
              </div>
              <div className="window-core card2-core">
                <div className="window-copy card2-intro">
                  <small>{card.concept}</small>
                  <strong>{card.built}<br />{" "}{card.around}<br /><em>{card.ideas}</em></strong>
                  <p>{card.intro}</p>
                </div>
                <div className="disciplines card2-disciplines">
                  {card.titles.map((title,i)=>(
                    <div key={title} className="discipline card2-discipline">
                      <div className="card2-service">
                        <span>{card.serviceLabels[i]}</span><b>{title}</b><p>{card.summaries[i]}</p>
                      </div>
                      {i===0 ? (
                        <svg className="card2-mark" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true" focusable="false">
                          <rect x="5" y="9" width="38" height="29" rx="1"/><path d="M5 16H43M12 12.5h2M18 12.5h2M24 22h13M24 28h10"/><rect x="11" y="22" width="9" height="10" rx=".5"/>
                        </svg>
                      ):i===1 ? (
                        <svg className="card2-mark" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true" focusable="false">
                          <rect x="4" y="18" width="11" height="12" rx="1"/><rect x="33" y="18" width="11" height="12" rx="1"/><rect x="20" y="4" width="8" height="9" rx="1"/><rect x="20" y="35" width="8" height="9" rx="1"/><path d="M15 24h5m8 0h5M24 13v7m0 8v7"/><circle cx="24" cy="24" r="4"/>
                        </svg>
                      ):(
                        <svg className="card2-mark" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" aria-hidden="true" focusable="false">
                          <path d="M24 5 40 14.5v19L24 43 8 33.5v-19Z"/><path d="m24 14 9 5.4v9.2L24 34l-9-5.4v-9.2Z"/><path d="M24 14v20M15 19.4l18 9.2M33 19.4l-18 9.2"/><circle cx="24" cy="24" r="2.2" fill="currentColor" stroke="none"/>
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="window-foot card2-foot" aria-hidden="true">
                <span className="card2-foot-motif"><i/><i/><i/></span>
              </div>
            </div>
          </div>
        </div>
        <div className="opening-foot" aria-hidden="true">
          <span>Genezisi / 2026</span>
          <span>{entry.footer}</span>
          <span>{entry.scroll} ↓</span>
        </div>
      </section>
      <Script src="/flagship-journey/infinite-bc/digital-passage-nav.js" strategy="afterInteractive" />
    </>
  );
}
