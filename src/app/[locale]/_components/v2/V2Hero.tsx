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
  visualTop: string;
  visualNote: string;
  visualSurface: string;
  visualTitle: string;
  visualBody: string;
  design: string;
  connect: string;
  intelligence: string;
  websites: string;
  automation: string;
  aiSystems: string;
  visualBottom: string;
  visualExplore: string;
  footer: string;
  scroll: string;
}> = {
  en: {
    eyebrow: "Digital solutions studio",
    intro: "We build websites, create AI systems, and automate everyday tasks. You can choose one service or combine them.",
    explore: "Explore our work",
    contact: "Start a project",
    visualTop: "Three disciplines",
    visualNote: "Built to work independently / together",
    visualSurface: "The surface",
    visualTitle: "Form and\nfunction,\nconnected.",
    visualBody: "Thoughtfully composed digital experiences — with purposeful systems behind them.",
    design: "01 / Design",
    connect: "02 / Connection",
    intelligence: "03 / Intelligence",
    websites: "Websites",
    automation: "Automation",
    aiSystems: "AI systems",
    visualBottom: "Beyond the interface",
    visualExplore: "Explore the depth",
    footer: "Websites · Automation · AI systems",
    scroll: "Explore below",
  },
  ka: {
    eyebrow: "ციფრული გადაწყვეტილებების სტუდია",
    intro: "ვქმნით ვებსაიტებსა და AI სისტემებს და ვახორციელებთ ყოველდღიური პროცესების ავტომატიზაციას. შეგიძლიათ აირჩიოთ ერთი სერვისი ან მათი კომბინაცია.",
    explore: "ნახეთ ჩვენი ნამუშევრები",
    contact: "დავიწყოთ პროექტი",
    visualTop: "სამი მიმართულება",
    visualNote: "ცალ-ცალკე ან ერთად",
    visualSurface: "პირველი შთაბეჭდილება",
    visualTitle: "ფორმა და\nფუნქცია,\nერთად.",
    visualBody: "გააზრებული ციფრული გამოცდილება პრაქტიკული სისტემებით.",
    design: "01 / დიზაინი",
    connect: "02 / კავშირი",
    intelligence: "03 / ინტელექტი",
    websites: "ვებსაიტები",
    automation: "ავტომატიზაცია",
    aiSystems: "AI სისტემები",
    visualBottom: "ინტერფეისის მიღმა",
    visualExplore: "მეტი სიღრმე",
    footer: "ვებსაიტები · ავტომატიზაცია · AI სისტემები",
    scroll: "გაიგეთ მეტი",
  },
  nl: {
    eyebrow: "Studio voor digitale oplossingen",
    intro: "We bouwen websites, ontwikkelen AI-systemen en automatiseren dagelijkse taken. Kies één dienst of combineer ze.",
    explore: "Ontdek ons werk",
    contact: "Start een project",
    visualTop: "Drie disciplines",
    visualNote: "Afzonderlijk of samen",
    visualSurface: "De buitenkant",
    visualTitle: "Vorm en\nfunctie,\nverbonden.",
    visualBody: "Doordachte digitale ervaringen met doelgerichte systemen erachter.",
    design: "01 / Ontwerp",
    connect: "02 / Verbinding",
    intelligence: "03 / Intelligentie",
    websites: "Websites",
    automation: "Automatisering",
    aiSystems: "AI-systemen",
    visualBottom: "Meer dan de interface",
    visualExplore: "Ontdek de diepte",
    footer: "Websites · Automatisering · AI-systemen",
    scroll: "Ontdek meer",
  },
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
            <div className="site-window">
              <div className="window-head">
                <span>{entry.visualTop}</span>
                <small>{entry.visualNote}</small>
              </div>
              <div className="window-core">
                <div className="window-copy">
                  <small>{entry.visualSurface}</small>
                  <strong>{entry.visualTitle}</strong>
                  <p>{entry.visualBody}</p>
                </div>
                <div className="disciplines">
                  <div className="discipline"><span>{entry.design}</span><b>{entry.websites}</b></div>
                  <div className="discipline"><span>{entry.connect}</span><b>{entry.automation}</b></div>
                  <div className="discipline"><span>{entry.intelligence}</span><b>{entry.aiSystems}</b></div>
                </div>
              </div>
              <div className="window-foot">
                <span>{entry.visualBottom}</span>
                <span>{entry.visualExplore} ↓</span>
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
