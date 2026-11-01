import "./v2/scroll-journey.css";
import "./v2/entry-hero.css";
import "./v2/digital-passage.css";
import "./v2/approved-four-frame.css";
import Script from "next/script";
import { WHATSAPP_INTAKE } from "@/constants/content";
import { HOME_HTML_LANG, type HomeLocale } from "@/lib/home-i18n";
import { getV2Copy } from "./v2/hero.copy";
import { StudioHeader } from "./v2/StudioHeader";
import { V2Hero } from "./v2/V2Hero";
import { JourneyScenes } from "./v2/JourneyScenes";
import { SelectedWork } from "./v2/SelectedWork";
import { Capabilities } from "./v2/Capabilities";
import { V2Lab } from "./v2/V2Lab";
import { FounderClose, StudioFooter } from "./v2/FounderClose";

/**
 * The one WhatsApp message each language opens with. Same destination for all
 * three — only the pre-filled text differs, and `encodeURIComponent` runs once.
 */
const V2_WHATSAPP_MESSAGE: Record<HomeLocale, string> = {
  en: "Hi Genezisi, I have something I'd like to build. Can we talk?",
  ka: "გამარჯობა Genezisi, მაქვს იდეა, რომლის შექმნაც მინდა. შეგვიძლია ვისაუბროთ?",
  nl: "Hallo Genezisi, ik wil graag een project bespreken. Kunnen we even overleggen?",
};

export function SignalHeroPrototype({ locale }: { locale: HomeLocale }) {
  const copy = getV2Copy(locale);
  const waHref = "https://wa.me/" + WHATSAPP_INTAKE + "?text=" + encodeURIComponent(V2_WHATSAPP_MESSAGE[locale]);
  return <main lang={HOME_HTML_LANG[locale]} className="genezisi-entry-home v2-home bg-[#02060b] text-white">
    {/* Apply the native-scroll opening pose before the first browser paint.
        Without JavaScript the ordinary static hero remains readable. */}
    <script dangerouslySetInnerHTML={{ __html: 'if (window.matchMedia("(prefers-reduced-motion: no-preference)").matches) document.documentElement.classList.add("bc-motion-ready");' }} />
    <StudioHeader locale={locale} copy={copy} contactHref={waHref} />

    <div id="journey" className="journey" data-beat="opening">
      <div id="scene" className="scene">
        <V2Hero locale={locale} copy={copy} contactHref={waHref} />
        <JourneyScenes locale={locale} />
      </div>
    </div>
    {/* The original public motion.js URL existed before Card 3's visibility gate.
        A versioned URL prevents a stale cached controller from hiding Card 3
        behind the new stylesheet after release. Keep the same controller. */}
    <Script src="/flagship-journey/infinite-bc/motion.js?hero=approved-four-frame-2026-11-01" strategy="afterInteractive" />
    <SelectedWork copy={copy} />
    <Capabilities copy={copy} />
    <section className="bg-[#02060b] px-5 py-20 sm:px-8 lg:py-28"><div className="mx-auto max-w-[92rem] border-t border-white/10 pt-14"><V2Lab copy={copy} /></div></section>
    <FounderClose copy={copy} contactHref={waHref} />
    <StudioFooter copy={copy} locale={locale} />
  </main>;
}
