import type { HomeLocale } from "@/lib/home-i18n";

/** Final approved Card 3–4 story; English source is founder-reviewed, KA/NL are integration translations. */
const COPY: Record<HomeLocale,{
  depthLeft:string;depthRight:string;approach:string;context:string;eyebrow:string;
  first:string;second:string;intro:string;
  steps:[{index:string;symbol:string;title:string;description:string},
         {index:string;symbol:string;title:string;description:string},
         {index:string;symbol:string;title:string;description:string}];
  bottomLeft:string;bottomRight:string;
  studio:string;principle:string;kicker:string;cFirst:string;cSecond:string;closing:string;
}> = {
  en: {
    depthLeft:"02 / From interface to environment",depthRight:"Built around your ideas",
    approach:"OUR APPROACH",context:"A CONSIDERED PROCESS / NOT A TEMPLATE",
    eyebrow:"FROM THE FIRST QUESTION TO SOMETHING REAL",
    first:"From idea to a",second:"working solution.",
    intro:"We start with the challenge, shape the right experience, and build what makes it work. No technology for its own sake.",
    steps:[
      {index:"01 / DISCOVER",symbol:"◇",title:"Understand",description:"Identify the real challenge, who it affects, and what a better result should achieve."},
      {index:"02 / DESIGN",symbol:"╱",title:"Create",description:"Design a tailored experience and choose the right systems to bring it together."},
      {index:"03 / BUILD",symbol:"✳",title:"Make it real",description:"Engineer, connect, test, and refine something people can genuinely use."}
    ],
    bottomLeft:"THOUGHT THROUGH / BUILT WITH PURPOSE",bottomRight:"FROM CONCEPT TO CRAFT",
    studio:"GENEZISI / INDEPENDENT DIGITAL STUDIO",principle:"04 — OUR PRINCIPLE",kicker:"ONE SIMPLE BELIEF",
    cFirst:"Made to be seen.",cSecond:"Built to work.",closing:"GENEZISI · INDEPENDENT BY DESIGN"
  },
  ka: {
    depthLeft:"02 / ინტერფეისიდან გარემომდე",depthRight:"თქვენი იდეების გარშემო",
    approach:"ჩვენი მიდგომა",context:"გააზრებული პროცესი / არა შაბლონი",
    eyebrow:"პირველი კითხვიდან რეალურ შედეგამდე",
    first:"იდეიდან",second:"მოქმედ გადაწყვეტამდე.",
    intro:"ვიწყებთ გამოწვევის გააზრებით, ვქმნით შესაბამის გამოცდილებას და ვაშენებთ სისტემას, რომელიც რეალურად მუშაობს. ტექნოლოგია თვითმიზანი არ არის.",
    steps:[
      {index:"01 / შესწავლა",symbol:"◇",title:"გააზრება",description:"ვარკვევთ რეალურ გამოწვევას, ვის ეხება და როგორი უნდა იყოს უკეთესი შედეგი."},
      {index:"02 / დიზაინი",symbol:"╱",title:"შექმნა",description:"ვქმნით მორგებულ გამოცდილებას და ვარჩევთ მისთვის შესაბამის სისტემებს."},
      {index:"03 / განხორციელება",symbol:"✳",title:"რეალობად ქცევა",description:"ვაშენებთ, ვაკავშირებთ, ვამოწმებთ და ვხვეწთ გამოსაყენებელ გადაწყვეტას."}
    ],
    bottomLeft:"გააზრებული / მიზნობრივად შექმნილი",bottomRight:"იდეიდან განხორციელებამდე",
    studio:"GENEZISI / დამოუკიდებელი ციფრული სტუდია",principle:"04 — ჩვენი პრინციპი",kicker:"ერთი მარტივი რწმენა",
    cFirst:"შესამჩნევად შექმნილი.",cSecond:"საქმისთვის გამართული.",closing:"GENEZISI · დამოუკიდებელი მიდგომა"
  },
  nl: {
    depthLeft:"02 / Van interface naar omgeving",depthRight:"Gebouwd rond jouw ideeën",
    approach:"ONZE AANPAK",context:"DOORDACHT PROCES / GEEN SJABLOON",
    eyebrow:"VAN DE EERSTE VRAAG TOT IETS ECHTS",
    first:"Van idee naar een",second:"werkende oplossing.",
    intro:"We beginnen bij de uitdaging, vormen de juiste ervaring en bouwen wat die laat werken. Technologie is nooit een doel op zich.",
    steps:[
      {index:"01 / ONTDEKKEN",symbol:"◇",title:"Begrijpen",description:"Breng de werkelijke uitdaging in kaart, wie ermee te maken heeft en wat beter moet."},
      {index:"02 / ONTWERPEN",symbol:"╱",title:"Creëren",description:"Ontwerp een ervaring op maat en kies de systemen die daarbij passen."},
      {index:"03 / BOUWEN",symbol:"✳",title:"Realiseren",description:"Bouw, verbind, test en verfijn iets dat mensen echt kunnen gebruiken."}
    ],
    bottomLeft:"DOORDACHT / MET EEN DOEL GEBOUWD",bottomRight:"VAN CONCEPT TOT VAKWERK",
    studio:"GENEZISI / ONAFHANKELIJKE DIGITALE STUDIO",principle:"04 — ONS PRINCIPE",kicker:"ÉÉN EENVOUDIGE OVERTUIGING",
    cFirst:"Gemaakt om op te vallen.",cSecond:"Gebouwd om te werken.",closing:"GENEZISI · ONAFHANKELIJK ONTWORPEN"
  }
};

export function JourneyScenes({ locale }: { locale: HomeLocale }) {
  const t=COPY[locale];
  return (
    <>
      <div className="depth">
        <div className="depth-space" aria-hidden="true">
          <div className="room-architecture">
            <div className="room-ceiling"/><div className="room-floor"/>
            <div className="room-wall left"/><div className="room-wall right"/>
            <div className="room-frame near"/><div className="room-frame far"/>
            <div className="threshold-assembly">
              <div className="threshold-column left"/><div className="threshold-column right"/>
              <div className="threshold-lintel"/>
              <div className="threshold-seam first"/><div className="threshold-seam second"/>
              <div className="threshold-centerline"/>
            </div>
          </div>
          <div className="rails">
            <div className="rail left"/><div className="rail right"/>
            <div className="rail left far"/><div className="rail right far"/><div className="ground-lines"/>
          </div>
          <div className="fold-planes"><div className="fold-pane left"/><div className="fold-pane right"/></div>
          <span className="depth-tag">{t.depthLeft}</span><span className="depth-tag right">{t.depthRight}</span>
        </div>
        <div className="reading card3-stage" role="region" aria-label={t.approach}>
          <div className="reading-ink card3-ink">
            <div className="card3-topbar">
              <span className="card3-ident">G<span className="card3-dot">.</span> / {t.approach}</span>
              <span className="card3-context">{t.context}</span>
              <span className="card3-counter">03 — 04</span>
            </div>
            <div className="card3-hero">
              <div className="card3-hero-rule" aria-hidden="true"><i/><i/></div>
              <div className="card3-story-content">
                <span className="card3-eyebrow">{t.eyebrow}</span>
                <h2><span>{t.first}</span> <em>{t.second}</em></h2>
                <p>{t.intro}</p>
              </div>
              <div className="card3-hero-motif" aria-hidden="true"><i/><i/><i/></div>
            </div>
            <div className="card3-system card3-process" aria-label={t.approach}>
              {t.steps.map((step,i)=>(
                <div key={step.index} className={["card3-step card3-step-understand","card3-step card3-step-create","card3-step card3-step-real"][i]}>
                  <div className="card3-step-heading">
                    <span className="card3-step-index">{step.index}</span>
                    <span className="card3-step-symbol" aria-hidden="true">{step.symbol}</span>
                  </div>
                  <strong>{step.title}</strong><p>{step.description}</p>
                </div>
              ))}
            </div>
            <div className="card3-bottom">
              <span>{t.bottomLeft}</span><span>{t.bottomRight}</span>
              <span className="card3-progress" aria-hidden="true"><i/></span>
            </div>
          </div>
        </div>
      </div>
      <section className="reveal card4-resolution" aria-label={t.cFirst+" "+t.cSecond}>
        <div className="c-topline"><span>{t.studio}</span><span>{t.principle}</span></div>
        <div className="c-center"><p className="c-kicker">{t.kicker}</p>
          <h2>{t.cFirst}<br/><em>{t.cSecond}</em></h2>
        </div>
        <div className="c-lastline">
          <span>{t.closing}</span><span className="card4-signature" aria-hidden="true"><i/><i/><i/></span>
        </div>
      </section>
    </>
  );
}
