import type { HomeLocale } from "@/lib/home-i18n";

/** Homepage-ready, localized copy for the approved bubble capabilities section. */
export type BubbleService = {
  index: string;
  title: string;
  short: string;
  strap: string;
  lead: string;
  items: string[];
  result: string;
};

export type BubbleCopy = {
  eyebrow: string;
  headlineLead: string;
  headlineEm: string;
  intro: string;
  exploreServices: string;
  explore: string;
  close: string;
  whatWeBuild: string;
  whyItMatters: string;
  caption: string;
  footnote: string;
  guidance: string;
  screenReaderHint: string;
  services: [BubbleService, BubbleService, BubbleService];
};

const EN: BubbleCopy = {
  eyebrow: "What I do",
  headlineLead: "Built around what",
  headlineEm: "your business needs.",
  intro: "Websites, AI systems, and automation. Each can stand on its own—or work together when it makes sense.",
  exploreServices: "Explore Genezisi services",
  explore: "Explore",
  close: "Close service details",
  whatWeBuild: "What we can build",
  whyItMatters: "Why it matters",
  caption: "Illustrative capabilities · Tailored to your project",
  footnote: "Independent when needed. Connected when useful.",
  guidance: "Move across a bubble's rim to feel its membrane. Tap or click to discover the service.",
  screenReaderHint: "Select a service to read its description. Close with Escape or the close button.",
  services: [
    {
      index: "01 / DIGITAL EXPERIENCES", title: "Websites.",
      short: "A distinctive presence, carefully built for your business.",
      strap: "Your digital first impression, considered from every angle.",
      lead: "We design and develop distinctive websites and web applications built around the people who use them. Clear communication, purposeful interaction and responsive performance matter as much as appearance.",
      items: ["Professional and business websites", "Landing pages and digital experiences", "Custom web applications", "Mobile-responsive interfaces"],
      result: "Visitors understand what you offer, trust what they see, and can take the next step with confidence.",
    },
    {
      index: "02 / USEFUL INTELLIGENCE", title: "AI systems.",
      short: "Make information easier to understand and use.",
      strap: "Information that works harder for your team.",
      lead: "We build practical AI-assisted tools that can work with business information, interpret requests, and help people find answers or prepare useful outputs—with human judgment retained where it matters.",
      items: ["AI assistants for defined tasks", "Knowledge and document search", "Request and information analysis", "Drafting and review workflows"],
      result: "Less time searching and sorting; more time spent making informed decisions and helping customers.",
    },
    {
      index: "03 / CONNECTED WORK", title: "Automation.",
      short: "Less routine work. More room for what matters.",
      strap: "Better flow, with fewer repetitive steps.",
      lead: "We connect everyday tools and processes so repeatable work can happen more consistently. From receiving requests to updating records and notifying your team, the workflow is designed around how your business operates.",
      items: ["Forms and enquiry handling", "Notifications and follow-ups", "Data movement between tools", "Scheduling and task workflows"],
      result: "Important steps are easier to follow, information travels to the right place, and your team keeps control.",
    },
  ],
};

const KA: BubbleCopy = {
  eyebrow: "რას ვაკეთებ",
  headlineLead: "შექმნილი იმისთვის,",
  headlineEm: "რაც თქვენს ბიზნესს სჭირდება.",
  intro: "ვებსაიტები, AI სისტემები და ავტომატიზაცია. თითოეულს შეუძლია დამოუკიდებლად იმუშაოს ან საჭიროების შემთხვევაში სხვებს დაუკავშირდეს.",
  exploreServices: "გაეცანით Genezisi-ს მომსახურებებს",
  explore: "გაიგეთ მეტი",
  close: "მომსახურების აღწერის დახურვა",
  whatWeBuild: "რისი შექმნა შეგვიძლია",
  whyItMatters: "რატომ არის მნიშვნელოვანი",
  caption: "შესაძლებლობების მაგალითები · თქვენს პროექტზე მორგებული",
  footnote: "დამოუკიდებლად — როცა საჭიროა. ერთად — როცა სასარგებლოა.",
  guidance: "შეეხეთ წრის კიდეს ელასტიკური ეფექტის სანახავად. მომსახურების გასაცნობად დააჭირეთ წრეს.",
  screenReaderHint: "აირჩიეთ მომსახურება დეტალური აღწერის სანახავად. დასახურად გამოიყენეთ Escape ან დახურვის ღილაკი.",
  services: [
    {
      index: "01 / ციფრული გამოცდილება", title: "ვებსაიტები.",
      short: "გამორჩეული ციფრული სივრცე თქვენი ბიზნესისთვის.",
      strap: "პირველი ციფრული შთაბეჭდილება, გააზრებული ყველა დეტალში.",
      lead: "ვქმნით ვებსაიტებსა და ვებაპლიკაციებს მათი მომხმარებლების საჭიროებების გათვალისწინებით. მკაფიო კომუნიკაცია, მიზანმიმართული ინტერაქცია და სხვადასხვა მოწყობილობაზე სწრაფი მუშაობა ჩვენთვის ისეთივე მნიშვნელოვანია, როგორც გარეგნული იერსახე.",
      items: ["ბიზნესისა და პროფესიული მომსახურების ვებსაიტები", "სარეკლამო გვერდები და ინტერაქტიული გამოცდილებები", "ინდივიდუალური ვებაპლიკაციები", "მობილურ მოწყობილობებზე მორგებული ინტერფეისები"],
      result: "სტუმრები უკეთ იგებენ, რას სთავაზობთ, ენდობიან თქვენს ციფრულ სივრცეს და მარტივად გადადიან შემდეგ ნაბიჯზე.",
    },
    {
      index: "02 / სასარგებლო ინტელექტი", title: "AI სისტემები.",
      short: "ინფორმაცია, რომლის გაგება და გამოყენება უფრო მარტივია.",
      strap: "ინფორმაცია, რომელიც თქვენს გუნდს უკეთ ეხმარება.",
      lead: "ვქმნით პრაქტიკულ AI ინსტრუმენტებს, რომლებიც მუშაობენ ბიზნესის ინფორმაციასთან, აანალიზებენ მოთხოვნებს, ეხმარებიან ადამიანებს პასუხების მოძიებასა და სასარგებლო მასალების მომზადებაში. მნიშვნელოვან გადაწყვეტილებებში საბოლოო კონტროლი ადამიანს რჩება.",
      items: ["კონკრეტულ ამოცანებზე მორგებული AI ასისტენტები", "ცოდნის ბაზებსა და დოკუმენტებში ძიება", "მოთხოვნებისა და ინფორმაციის ანალიზი", "ტექსტის მომზადებისა და გადამოწმების პროცესები"],
      result: "ნაკლები დრო ინფორმაციის ძიებასა და დახარისხებაზე, მეტი დრო გააზრებულ გადაწყვეტილებებსა და მომხმარებლებზე.",
    },
    {
      index: "03 / დაკავშირებული პროცესები", title: "ავტომატიზაცია.",
      short: "ნაკლები რუტინა. მეტი დრო მნიშვნელოვანი საქმისთვის.",
      strap: "გამართული პროცესები ნაკლები განმეორებადი ნაბიჯით.",
      lead: "ვაკავშირებთ ყოველდღიურ ინსტრუმენტებსა და სამუშაო პროცესებს, რათა განმეორებადი ამოცანები თანმიმდევრულად სრულდებოდეს. მოთხოვნის მიღებიდან ჩანაწერების განახლებამდე და გუნდის ინფორმირებამდე, პროცესს თქვენი ბიზნესის მუშაობის წესზე ვარგებთ.",
      items: ["ფორმებისა და შემოსული მოთხოვნების დამუშავება", "შეტყობინებები და შემდგომი კომუნიკაცია", "ინფორმაციის გადატანა სხვადასხვა ინსტრუმენტს შორის", "დაგეგმვისა და ამოცანების მართვის პროცესები"],
      result: "მნიშვნელოვანი ნაბიჯები უფრო მარტივად კონტროლდება, ინფორმაცია საჭირო ადგილას მიდის და გუნდი პროცესს მართავს.",
    },
  ],
};

const NL: BubbleCopy = {
  eyebrow: "Wat ik doe",
  headlineLead: "Gebouwd rond wat",
  headlineEm: "jouw onderneming nodig heeft.",
  intro: "Websites, AI-systemen en automatisering. Elk afzonderlijk inzetbaar, of samen wanneer dat zinvol is.",
  exploreServices: "Ontdek de diensten van Genezisi",
  explore: "Ontdek",
  close: "Sluit de dienstdetails",
  whatWeBuild: "Wat we kunnen bouwen",
  whyItMatters: "Waarom het belangrijk is",
  caption: "Voorbeelden van mogelijkheden · Op maat van jouw project",
  footnote: "Afzonderlijk waar nodig. Verbonden waar nuttig.",
  guidance: "Beweeg langs de rand van een bol voor het elastische effect. Klik of tik om meer te ontdekken.",
  screenReaderHint: "Kies een dienst voor meer informatie. Sluit met Escape of de sluitknop.",
  services: [
    {
      index: "01 / DIGITALE ERVARINGEN", title: "Websites.",
      short: "Een onderscheidende online uitstraling, zorgvuldig uitgewerkt.",
      strap: "Een sterke digitale eerste indruk, tot in de details.",
      lead: "We ontwerpen en bouwen onderscheidende websites en webapplicaties voor de mensen die ze gebruiken. Heldere communicatie, doelgerichte interacties en vlotte prestaties op elk scherm zijn even belangrijk als het ontwerp zelf.",
      items: ["Websites voor bedrijven en vrije beroepen", "Landingspagina's en interactieve ervaringen", "Webapplicaties op maat", "Mobielvriendelijke interfaces"],
      result: "Bezoekers begrijpen sneller wat je aanbiedt, krijgen vertrouwen en vinden vlot hun volgende stap.",
    },
    {
      index: "02 / BRUIKBARE INTELLIGENTIE", title: "AI-systemen.",
      short: "Informatie makkelijker begrijpen en benutten.",
      strap: "Laat informatie beter werken voor je team.",
      lead: "We bouwen praktische AI-ondersteunde tools die bedrijfsinformatie gebruiken, vragen interpreteren en mensen helpen antwoorden te vinden of bruikbare teksten voor te bereiden. Waar menselijk oordeel nodig is, blijft de controle bij mensen.",
      items: ["AI-assistenten voor afgebakende taken", "Zoeken in kennisbanken en documenten", "Analyse van vragen en informatie", "Werkstromen voor opstellen en nakijken"],
      result: "Minder tijd kwijt aan zoeken en sorteren, meer tijd voor doordachte beslissingen en klanten.",
    },
    {
      index: "03 / VERBONDEN WERK", title: "Automatisering.",
      short: "Minder routinewerk. Meer ruimte voor wat telt.",
      strap: "Een vlottere werking met minder repetitieve stappen.",
      lead: "We verbinden de tools en processen die je dagelijks gebruikt, zodat terugkerende taken consistenter verlopen. Van vragen ontvangen tot gegevens bijwerken en je team verwittigen: de werkstroom sluit aan bij hoe je onderneming werkt.",
      items: ["Formulieren en aanvragen verwerken", "Meldingen en opvolging", "Gegevens uitwisselen tussen tools", "Planning en taakbeheer"],
      result: "Belangrijke stappen blijven overzichtelijk, informatie komt op de juiste plek terecht en je team houdt de controle.",
    },
  ],
};

const BUBBLE_COPY: Record<HomeLocale, BubbleCopy> = { en: EN, ka: KA, nl: NL };
export function getBubbleCopy(locale: HomeLocale): BubbleCopy {
  return BUBBLE_COPY[locale];
}
