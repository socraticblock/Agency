import type { Locale } from "@/lib/i18n";
import { WHATSAPP_INTAKE } from "@/constants/content";
import { getV2Copy } from "./v2/hero.copy";
import { StudioHeader } from "./v2/StudioHeader";
import { V2Hero } from "./v2/V2Hero";
import { SelectedWork } from "./v2/SelectedWork";
import { Capabilities } from "./v2/Capabilities";
import { V2Lab } from "./v2/V2Lab";
import { FounderClose, StudioFooter } from "./v2/FounderClose";

const V2_WHATSAPP_MESSAGE: Record<Locale,string>={en:"Hi Genezisi, I have something I'd like to build. Can we talk?",ka:"გამარჯობა Genezisi, მაქვს იდეა, რომლის შექმნაც მინდა. შეგვიძლია ვისაუბროთ?"};

export function SignalHeroPrototype({locale}:{locale:Locale}){
 const copy=getV2Copy(locale);
 const waHref="https://wa.me/"+WHATSAPP_INTAKE+"?text="+encodeURIComponent(V2_WHATSAPP_MESSAGE[locale]);
 return <main lang={locale} className="v2-home bg-[#02060b] text-white">
  <StudioHeader locale={locale} copy={copy} contactHref={waHref}/>
  <V2Hero copy={copy} contactHref={waHref}/>
  <SelectedWork copy={copy}/>
  <Capabilities copy={copy}/>
  <section className="bg-[#02060b] px-5 py-20 sm:px-8 lg:py-28"><div className="mx-auto max-w-[92rem] border-t border-white/10 pt-14"><V2Lab copy={copy}/></div></section>
  <FounderClose copy={copy} contactHref={waHref}/>
  <StudioFooter copy={copy} locale={locale}/>
 </main>;
}
