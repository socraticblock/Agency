import type { HomeLocale } from "@/lib/home-i18n";

export type SystemDemoRow = { label: string; value: string };

/**
 * Copy for the five distinct states of the "System in Action" demo.
 *
 * The demo sender uses the IANA-reserved `example.com` domain, so the page never
 * displays a real third-party mailbox the studio has no relationship with.
 */
export type SystemDemoCopy = {
  enquiryLabel: string;
  fromLabel: string;
  fromValue: string;
  subjectLabel: string;
  subjectValue: string;
  messageLabel: string;
  messageValue: string;
  intentLabel: string;
  intentRows: SystemDemoRow[];
  actionLabel: string;
  actionTime: string;
  actionStatus: string;
  actionDraft: string;
  reviewLabel: string;
  reviewTitle: string;
  reviewBody: string;
  resolvedLabel: string;
  resolvedOwnerTitle: string;
  resolvedOwnerBody: string;
  resolvedCustomerTitle: string;
  resolvedCustomerBody: string;
};

export type V2Copy = {
  // identity + navigation
  services: string;
  message: string;
  seeWork: string;
  navWork: string;
  navCapabilities: string;
  navAbout: string;
  /** Accessible names for the two navigation landmarks (never hard-coded in JSX). */
  primaryNavLabel: string;
  languageNavLabel: string;
  // hero
  heroDesktop: string;
  heroMobile: string;
  heroSub: string;
  // selected work
  work: string;
  proof: string;
  workIntro: string;
  viewWebsite: string;
  tkStatus: string;
  frankStatus: string;
  pilatesStatus: string;
  tkBody: string;
  frankBody: string;
  pilatesBody: string;
  legalCategory: string;
  productCategory: string;
  wellnessCategory: string;
  /** Image alt text: describes what each preview actually shows. */
  altTk: string;
  altFranken: string;
  altPilates: string;
  // what I do
  capabilitiesEyebrow: string;
  websiteTitle: string;
  websiteBody: string;
  aiTitle: string;
  aiBody: string;
  automationTitle: string;
  automationBody: string;
  // system in action
  systemEyebrow: string;
  labTitle: string;
  lab: string;
  receiveStep: string;
  understandStep: string;
  actionStep: string;
  exceptionStep: string;
  outcomeStep: string;
  demo: SystemDemoCopy;
  // founder close + footer
  founderEyebrow: string;
  founderTitle: string;
  founderBody: string;
  founderBodySecond: string;
  startWhatsApp: string;
};

const EN: V2Copy = {
  services: "Websites · AI · Automation",
  message: "Message me",
  seeWork: "See selected work",
  navWork: "Work",
  navCapabilities: "What I do",
  navAbout: "About",
  primaryNavLabel: "Primary navigation",
  languageNavLabel: "Language",

  heroDesktop: "Your website\nis only the\nbeginning.",
  heroMobile: "Your website is\nonly the beginning.",
  heroSub: "Genezisi builds distinctive websites, AI systems and automations that make the business behind them work better.",

  work: "Selected work",
  proof: "Proof, not promises.",
  workIntro: "Websites, products and prototypes built around real business needs.",
  viewWebsite: "View website",
  tkStatus: "Live website",
  frankStatus: "Live product",
  pilatesStatus: "Prototype",
  tkBody: "A professional service website built around clarity, credibility and a serious first impression.",
  frankBody: "A complex product frontend where trust, information hierarchy and user confidence matter.",
  pilatesBody: "A wellness concept with schedule, booking flow and a mobile-first experience.",
  legalCategory: "Legal / Professional",
  productCategory: "Product / Crypto",
  wellnessCategory: "Wellness / Studio",
  altTk: "TK Counsel — website hero preview",
  altFranken: "Frankencoin Desk — product interface preview",
  altPilates: "Her House Pilates — studio photography from the prototype",

  capabilitiesEyebrow: "What I do",
  websiteTitle: "Websites",
  websiteBody: "Distinctive, high-performance websites built to make a strong first impression and turn interest into opportunities.",
  aiTitle: "AI systems",
  aiBody: "Useful systems that understand requests, use your business information and help move work forward.",
  automationTitle: "Automation",
  automationBody: "Practical workflows that connect your tools, remove repetitive steps and keep people in control.",

  systemEyebrow: "The system in action",
  labTitle: "See what the system actually does.",
  lab: "Genezisi Lab · Internal demo",
  receiveStep: "Receive the request",
  understandStep: "Understand the intent",
  actionStep: "Take the useful action",
  exceptionStep: "Send exceptions to a person",
  outcomeStep: "Deliver a clear next step",
  demo: {
    enquiryLabel: "New website enquiry",
    fromLabel: "From",
    fromValue: "sarah@example.com",
    subjectLabel: "Subject",
    subjectValue: "Consultation request",
    messageLabel: "Message",
    messageValue:
      "Hi, I'd like to book a consultation to discuss a new website for our company. Do you have availability next week?",
    intentLabel: "Request understood",
    intentRows: [
      { label: "Request type", value: "Website consultation" },
      { label: "Company", value: "Greenway" },
      { label: "Timing", value: "Next week" },
      { label: "Action", value: "Check availability" },
    ],
    actionLabel: "Availability checked",
    actionTime: "Tuesday · 14:00",
    actionStatus: "Available",
    actionDraft: "Draft confirmation ready",
    reviewLabel: "Needs review",
    reviewTitle: "Outside the standard scope",
    reviewBody:
      "The enquiry asks about something the system should not answer on its own. It goes to the owner with the full context, instead of guessing.",
    resolvedLabel: "Resolved",
    resolvedOwnerTitle: "Owner notified",
    resolvedOwnerBody: "Structured request, timing and a suggested reply — in one place.",
    resolvedCustomerTitle: "Next step sent",
    resolvedCustomerBody: "A confirmed time and a short reply, without a chase.",
  },

  founderEyebrow: "Founder-led studio",
  founderTitle: "You work with the person doing the work.",
  founderBody: "Genezisi is founder-led. You work directly with the person designing and building your project — from the first conversation to launch.",
  founderBodySecond: "Clear communication, practical advice and work built around your actual goals.",
  startWhatsApp: "Start on WhatsApp",
};

const KA: V2Copy = {
  services: "ვებსაიტები · AI · ავტომატიზაცია",
  message: "მომწერეთ",
  seeWork: "ნახეთ ნამუშევრები",
  navWork: "ნამუშევრები",
  navCapabilities: "რას ვაკეთებ",
  navAbout: "ჩვენ შესახებ",
  primaryNavLabel: "მთავარი ნავიგაცია",
  languageNavLabel: "ენა",

  heroDesktop: "თქვენი ვებსაიტი\nმხოლოდ\nდასაწყისია.",
  heroMobile: "თქვენი ვებსაიტი\nმხოლოდ დასაწყისია.",
  heroSub: "Genezisi ქმნის გამორჩეულ ვებსაიტებს, AI სისტემებსა და ავტომატიზაციას, რომლებიც მათ უკან მდგომ ბიზნესს უკეთ მუშაობაში ეხმარება.",

  work: "რჩეული ნამუშევრები",
  proof: "საქმე, არა დაპირებები.",
  workIntro: "ვებსაიტები, პროდუქტები და პროტოტიპები, შექმნილი რეალური ბიზნეს საჭიროებების გარშემო.",
  viewWebsite: "ნახეთ ვებსაიტი",
  tkStatus: "ცოცხალი ვებსაიტი",
  frankStatus: "ცოცხალი პროდუქტი",
  pilatesStatus: "პროტოტიპი",
  tkBody: "პროფესიული სერვისის ვებსაიტი, შექმნილი სიცხადის, სანდოობისა და ძლიერი პირველი შთაბეჭდილების გარშემო.",
  frankBody: "რთული პროდუქტის ფრონტენდი, სადაც ნდობა, ინფორმაციის იერარქია და მომხმარებლის თავდაჯერებულობა მნიშვნელოვანია.",
  pilatesBody: "ველნეს კონცეფცია განრიგით, დაჯავშნის პროცესით და mobile-first გამოცდილებით.",
  legalCategory: "იურიდიული / პროფესიული",
  productCategory: "პროდუქტი / კრიპტო",
  wellnessCategory: "ველნესი / სტუდია",
  altTk: "TK Counsel-ის ვებსაიტის წინასწარი ხედი",
  altFranken: "Frankencoin Desk-ის პროდუქტის ინტერფეისის წინასწარი ხედი",
  altPilates: "Her House Pilates-ის პროტოტიპის წინასწარი ხედი",

  capabilitiesEyebrow: "რას ვაკეთებ",
  websiteTitle: "ვებსაიტები",
  websiteBody: "გამორჩეული, სწრაფი ვებსაიტები, შექმნილი ძლიერი პირველი შთაბეჭდილებისთვის და ინტერესის შესაძლებლობად ქცევისთვის.",
  aiTitle: "AI სისტემები",
  aiBody: "სასარგებლო სისტემები, რომლებიც მოთხოვნებს იგებენ, თქვენს სამუშაო ინფორმაციას იყენებენ და საქმეს წინ წევენ.",
  automationTitle: "ავტომატიზაცია",
  automationBody: "პრაქტიკული პროცესები, რომლებიც ხელსაწყოებს აკავშირებენ, განმეორებად ნაბიჯებს ამცირებენ და კონტროლს ადამიანთან ტოვებენ.",

  systemEyebrow: "სისტემა მოქმედებაში",
  labTitle: "ნახეთ, რას აკეთებს სისტემა სინამდვილეში.",
  lab: "Genezisi Lab · შიდა დემო",
  receiveStep: "მოთხოვნის მიღება",
  understandStep: "განზრახვის გაგება",
  actionStep: "სასარგებლო მოქმედების შესრულება",
  exceptionStep: "გამონაკლისის ადამიანთან გადაგზავნა",
  outcomeStep: "მკაფიო შემდეგი ნაბიჯის მიწოდება",
  demo: {
    enquiryLabel: "ახალი მოთხოვნა ვებსაიტზე",
    fromLabel: "გამომგზავნი",
    fromValue: "sarah@example.com",
    subjectLabel: "თემა",
    subjectValue: "კონსულტაციის მოთხოვნა",
    messageLabel: "შეტყობინება",
    messageValue:
      "გამარჯობა, მინდა კონსულტაცია დავჯავშნო და განვიხილოთ ჩვენი კომპანიისთვის ახალი ვებსაიტი. გაქვთ თავისუფალი დრო მომავალ კვირას?",
    intentLabel: "მოთხოვნა გაგებულია",
    intentRows: [
      { label: "მოთხოვნის ტიპი", value: "ვებსაიტის კონსულტაცია" },
      { label: "კომპანია", value: "Greenway" },
      { label: "დრო", value: "მომავალი კვირა" },
      { label: "მოქმედება", value: "ხელმისაწვდომობის შემოწმება" },
    ],
    actionLabel: "ხელმისაწვდომობა შემოწმებულია",
    actionTime: "სამშაბათი · 14:00",
    actionStatus: "თავისუფალია",
    actionDraft: "დადასტურების პროექტი მზადაა",
    reviewLabel: "საჭიროა გადახედვა",
    reviewTitle: "სტანდარტულ ფარგლებს სცდება",
    reviewBody:
      "მოთხოვნა ეხება იმას, რაზეც სისტემა დამოუკიდებლად არ პასუხობს. ის სრული კონტექსტით გადაეგზავნება მფლობელს, ვარაუდის ნაცვლად.",
    resolvedLabel: "დასრულებულია",
    resolvedOwnerTitle: "მფლობელი ინფორმირებულია",
    resolvedOwnerBody: "დალაგებული მოთხოვნა, დრო და შემოთავაზებული პასუხი — ერთ ადგილას.",
    resolvedCustomerTitle: "შემდეგი ნაბიჯი გაგზავნილია",
    resolvedCustomerBody: "დადასტურებული დრო და მოკლე პასუხი — ზედმეტი მიმოწერის გარეშე.",
  },

  founderEyebrow: "დამფუძნებლის მიერ მართული სტუდია",
  founderTitle: "თქვენ მუშაობთ უშუალოდ იმ ადამიანთან, ვინც საქმეს აკეთებს.",
  founderBody: "Genezisi დამფუძნებლის მიერ მართული სტუდიაა. პროექტის პირველი საუბრიდან გაშვებამდე უშუალოდ იმ ადამიანთან მუშაობთ, ვინც მას დიზაინს უკეთებს და აშენებს.",
  founderBodySecond: "მკაფიო კომუნიკაცია, პრაქტიკული რჩევები და სამუშაო, რომელიც თქვენს რეალურ მიზნებზეა აგებული.",
  startWhatsApp: "დაიწყეთ WhatsApp-ზე",
};

/**
 * Belgian Dutch.
 *
 * Register: `je` / `jouw`, calm and practical, written for a Flemish
 * small-business owner reading on a phone. Transcreated rather than translated
 * word for word, so the short strings stay short on narrow screens.
 *
 * Editorial status: candidate copy supplied with the implementation brief and
 * lightly polished here. NOT native-certified — see
 * `docs/internationalization/nl-be-implementation-decisions.md`.
 *
 * No claim is made about a Belgian office, Dutch-language calls, prices or
 * clients: the studio is in Georgia and works remotely.
 */
const NL: V2Copy = {
  services: "Websites · AI · Automatisering",
  message: "Stuur me een bericht",
  seeWork: "Bekijk mijn werk",
  navWork: "Werk",
  navCapabilities: "Wat ik doe",
  navAbout: "Over mij",
  primaryNavLabel: "Hoofdnavigatie",
  languageNavLabel: "Taalkeuze",

  heroDesktop: "Je website is\nnog maar het\nbegin.",
  heroMobile: "Je website is\nnog maar het begin.",
  heroSub:
    "Genezisi bouwt onderscheidende websites, praktische AI-systemen en automatiseringen die je bedrijf beter laten werken.",

  work: "Geselecteerd werk",
  proof: "Bewijs, geen beloftes.",
  workIntro: "Websites, producten en prototypes gebouwd voor echte zakelijke behoeften.",
  viewWebsite: "Bekijk het project",
  tkStatus: "Live website",
  frankStatus: "Live product",
  pilatesStatus: "Prototype",
  tkBody:
    "Een website voor professionele dienstverlening, ontworpen met aandacht voor duidelijkheid, vertrouwen en een sterke eerste indruk.",
  frankBody:
    "Een uitgebreide productinterface waarin vertrouwen, duidelijke informatie en gebruiksgemak centraal staan.",
  pilatesBody:
    "Een wellnessconcept met lesrooster, boekingsproces en een ontwerp dat eerst voor mobiel is gemaakt.",
  legalCategory: "Juridisch / Professioneel",
  productCategory: "Product / Crypto",
  wellnessCategory: "Wellness / Studio",
  altTk: "TK Counsel — voorbeeld van de startpagina",
  altFranken: "Frankencoin Desk — voorbeeld van de productinterface",
  altPilates: "Her House Pilates — studiofoto uit het prototype",

  capabilitiesEyebrow: "Wat ik doe",
  websiteTitle: "Websites",
  websiteBody:
    "Onderscheidende, snelle websites die een sterke eerste indruk maken en interesse omzetten in nieuwe kansen.",
  aiTitle: "AI-systemen",
  aiBody:
    "Praktische systemen die vragen begrijpen, relevante bedrijfsinformatie gebruiken en het werk vooruithelpen.",
  automationTitle: "Automatisering",
  automationBody:
    "Praktische werkprocessen die je tools verbinden, terugkerende stappen wegnemen en de controle bij mensen laten.",

  systemEyebrow: "Het systeem in actie",
  labTitle: "Bekijk wat het systeem echt doet.",
  lab: "Genezisi Lab · Interne demonstratie",
  receiveStep: "De aanvraag ontvangen",
  understandStep: "De vraag begrijpen",
  actionStep: "De nuttige stap zetten",
  exceptionStep: "Uitzonderingen naar een persoon",
  outcomeStep: "Een duidelijke volgende stap",
  demo: {
    enquiryLabel: "Nieuwe websiteaanvraag",
    fromLabel: "Van",
    fromValue: "sarah@example.com",
    subjectLabel: "Onderwerp",
    subjectValue: "Vraag om een kennismakingsgesprek",
    messageLabel: "Bericht",
    messageValue:
      "Hallo, ik wil graag bespreken of jullie een nieuwe website voor ons bedrijf kunnen bouwen. Is er volgende week tijd voor een gesprek?",
    intentLabel: "De aanvraag begrepen",
    intentRows: [
      { label: "Type aanvraag", value: "Gesprek over een website" },
      { label: "Bedrijf", value: "Greenway" },
      { label: "Wanneer", value: "Volgende week" },
      { label: "Volgende stap", value: "Beschikbaarheid bekijken" },
    ],
    actionLabel: "Beschikbaarheid bekeken",
    actionTime: "Dinsdag · 14.00 uur",
    actionStatus: "Beschikbaar",
    actionDraft: "Conceptantwoord klaar",
    reviewLabel: "Controle nodig",
    reviewTitle: "Buiten de gewone opdracht",
    reviewBody:
      "De aanvraag gaat over iets wat het systeem niet zelfstandig mag beantwoorden. Daarom krijgt de eigenaar alle informatie om zelf te beslissen.",
    resolvedLabel: "Afgerond",
    resolvedOwnerTitle: "Eigenaar op de hoogte",
    resolvedOwnerBody:
      "De aanvraag, het gewenste moment en een voorstel voor het antwoord staan overzichtelijk bij elkaar.",
    resolvedCustomerTitle: "Duidelijke volgende stap",
    resolvedCustomerBody:
      "De klant krijgt een bevestiging en een helder vervolg, zonder onnodig heen-en-weer mailen.",
  },

  founderEyebrow: "Rechtstreeks met de oprichter",
  founderTitle: "Je werkt met de persoon die het zelf bouwt.",
  founderBody:
    "Genezisi wordt geleid door de oprichter. Van het eerste gesprek tot de lancering werk je rechtstreeks met degene die je project ontwerpt en ontwikkelt.",
  founderBodySecond:
    "Duidelijke communicatie, praktisch advies en oplossingen afgestemd op wat je bedrijf echt nodig heeft.",
  startWhatsApp: "Stuur een bericht via WhatsApp",
};

/**
 * Exhaustive by construction: adding a homepage language without providing its
 * copy is a type error, never a silent English fallback.
 */
const COPY = {
  en: EN,
  ka: KA,
  nl: NL,
} satisfies Record<HomeLocale, V2Copy>;

export function getV2Copy(locale: HomeLocale): V2Copy {
  return COPY[locale];
}
