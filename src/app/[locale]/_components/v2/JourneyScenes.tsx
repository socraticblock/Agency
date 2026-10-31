import type { HomeLocale } from "@/lib/home-i18n";

const COPY: Record<HomeLocale, {
  depthLeft: string; depthRight: string; readingEyebrow: string; readingTitle: string;
  readingBody: string; readingFootLeft: string; readingFootRight: string;
  topLeft: string; topRight: string; kicker: string; cFirst: string; cSecond: string;
  description: string; one: string; two: string; three: string;
  oneSub: string; twoSub: string; threeSub: string; closingLeft: string; closingRight: string;
}> = {
  en: {
    depthLeft: "01 / The website, inside out", depthRight: "A considered digital system",
    readingEyebrow: "Beyond the interface / a single connected experience",
    readingTitle: "Beautiful on the surface. Purposeful underneath.",
    readingBody: "Good websites, dependable automation and practical AI can each solve a different problem. Together, they can make the whole experience more useful.",
    readingFootLeft: "One clear idea at a time", readingFootRight: "Continue",
    topLeft: "Digital experiences / systems / intelligence", topRight: "02 — Beyond the surface",
    kicker: "The work does not stop at the interface",
    cFirst: "Made to be seen.", cSecond: "Built to work.",
    description: "Considered digital experiences and the engineering behind them. Explore what we've made and how we work.",
    one: "Websites", two: "Automation", three: "AI systems",
    oneSub: "Designed to stand apart", twoSub: "Systems that connect", threeSub: "Engineering with oversight",
    closingLeft: "Genezisi · Independent by design", closingRight: "Continue to selected work",
  },
  ka: {
    depthLeft: "01 / ვებსაიტი შიგნიდან", depthRight: "გააზრებული ციფრული სისტემა",
    readingEyebrow: "ინტერფეისის მიღმა / ერთი დაკავშირებული გამოცდილება",
    readingTitle: "ლამაზი გარედან. სასარგებლო შიგნიდან.",
    readingBody: "ვებსაიტები, ავტომატიზაცია და პრაქტიკული AI სხვადასხვა ამოცანას წყვეტს. ერთად ისინი უფრო სასარგებლო გამოცდილებას ქმნიან.",
    readingFootLeft: "ერთი ნათელი იდეა", readingFootRight: "გაგრძელება",
    topLeft: "ციფრული გამოცდილება / სისტემები / ინტელექტი", topRight: "02 — ზედაპირის მიღმა",
    kicker: "საქმე ინტერფეისით არ მთავრდება",
    cFirst: "შესამჩნევად შექმნილი.", cSecond: "საქმისთვის გამართული.",
    description: "გააზრებული ციფრული გამოცდილება და მის უკან მდგომი ინჟინერია. ნახეთ ჩვენი ნამუშევრები და მიდგომა.",
    one: "ვებსაიტები", two: "ავტომატიზაცია", three: "AI სისტემები",
    oneSub: "გამორჩეული დიზაინი", twoSub: "დაკავშირებული პროცესები", threeSub: "პასუხისმგებლიანი ინჟინერია",
    closingLeft: "Genezisi · დამოუკიდებელი მიდგომა", closingRight: "ნამუშევრების ნახვა",
  },
  nl: {
    depthLeft: "01 / De website van binnenuit", depthRight: "Een doordacht digitaal systeem",
    readingEyebrow: "Achter de interface / één verbonden ervaring",
    readingTitle: "Mooi aan de buitenkant. Doelgericht vanbinnen.",
    readingBody: "Websites, betrouwbare automatisering en praktische AI lossen elk een ander probleem op. Samen maken ze de ervaring nuttiger.",
    readingFootLeft: "Eén helder idee tegelijk", readingFootRight: "Verder",
    topLeft: "Digitale ervaringen / systemen / intelligentie", topRight: "02 — Achter de buitenkant",
    kicker: "Het werk stopt niet bij de interface",
    cFirst: "Gemaakt om op te vallen.", cSecond: "Gebouwd om te werken.",
    description: "Doordachte digitale ervaringen en de techniek erachter. Ontdek wat we maken en hoe we werken.",
    one: "Websites", two: "Automatisering", three: "AI-systemen",
    oneSub: "Onderscheidend ontworpen", twoSub: "Verbonden processen", threeSub: "Techniek met toezicht",
    closingLeft: "Genezisi · Onafhankelijk ontworpen", closingRight: "Bekijk ons werk",
  },
};

export function JourneyScenes({ locale }: { locale: HomeLocale }) {
  const t = COPY[locale];
  return (
    <>
      <div className="depth">
        <div className="depth-space" aria-hidden="true">
          <div className="room-architecture">
            <div className="room-ceiling" /><div className="room-floor" />
            <div className="room-wall left" /><div className="room-wall right" />
            <div className="room-frame near" /><div className="room-frame far" />
          </div>
          <div className="rails">
            <div className="rail left" /><div className="rail right" />
            <div className="rail left far" /><div className="rail right far" />
            <div className="ground-lines" />
          </div>
          <div className="fold-planes"><div className="fold-pane left" /><div className="fold-pane right" /></div>
          <span className="depth-tag">{t.depthLeft}</span>
          <span className="depth-tag right">{t.depthRight}</span>
        </div>
        <div className="reading">
          <div className="reading-ink">
            <small>{t.readingEyebrow}</small>
            <h2>{t.readingTitle}</h2>
            <p>{t.readingBody}</p>
            <div className="reading-bottom"><span>{t.readingFootLeft}</span><span>{t.readingFootRight} ↓</span></div>
          </div>
        </div>
      </div>
      <section className="reveal" aria-label={t.cFirst + " " + t.cSecond}>
        <div className="c-topline"><span>{t.topLeft}</span><span>{t.topRight}</span></div>
        <div className="c-center">
          <p className="c-kicker">{t.kicker}</p>
          <h2>{t.cFirst}<br /><em>{t.cSecond}</em></h2>
          <p className="c-description">{t.description}</p>
          <div className="c-bands">
            <div><span>01</span><b>{t.one}</b><small>{t.oneSub}</small></div>
            <div><span>02</span><b>{t.two}</b><small>{t.twoSub}</small></div>
            <div><span>03</span><b>{t.three}</b><small>{t.threeSub}</small></div>
          </div>
        </div>
        <div className="c-lastline"><span>{t.closingLeft}</span><a href="#work">{t.closingRight} ↓</a></div>
      </section>
    </>
  );
}
