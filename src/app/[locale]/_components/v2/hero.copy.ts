import type { Locale } from "@/lib/i18n";

export type SystemDemoRow = { label: string; value: string };

/** Copy for the five distinct states of the "System in Action" demo. */
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
    fromValue: "sarah.lin@greenwayapp.com",
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
    fromValue: "sarah.lin@greenwayapp.com",
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

export function getV2Copy(locale: Locale): V2Copy {
  return locale === "ka" ? KA : EN;
}
