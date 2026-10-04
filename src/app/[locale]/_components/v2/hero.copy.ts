import type { Locale } from "@/lib/i18n";

export type V2Copy = {
  services: string;
  hero: string;
  heroSub: string;
  message: string;
  navWork: string;
  navCapabilities: string;
  navAbout: string;
  firstImpression: string;
  enquiryReceived: string;
  receive: string;
  someoneAsks: string;
  systemRevealed: string;
  usefulAction: string;
  route: string;
  requestUseful: string;
  humanJudgment: string;
  resolved: string;
  signalResolved: string;
  surfaceUseful: string;
  underneathUseful: string;
  resolvedOutcome: string;
  seeWork: string;
  work: string;
  proof: string;
  capabilities: string;
  lab: string;
  labTitle: string;
  small: string;
  founderTitle: string;
  founderBody: string;
  contact: string;
  contactTitle: string;
  contactBody: string;
  startWhatsApp: string;
  consultations: string;
  siteHeadline: string;
  siteBody: string;
  book: string;
  siteVisual: string;
  newEnquiry: string;
  customerMessage: string;
  requestUnderstood: string;
  parsedRequest: string;
  requestNextStep: string;
  availability: string;
  requestRecorded: string;
  timeAvailable: string;
  confirmationPrepared: string;
  needsReview: string;
  owner: string;
  ownerBody: string;
  receiveStep: string;
  understandStep: string;
  actionStep: string;
  exceptionStep: string;
  outcomeStep: string;
  websiteTitle: string;
  websiteBody: string;
  aiTitle: string;
  aiBody: string;
  automationTitle: string;
  automationBody: string;
  tkBody: string;
  frankBody: string;
  pilatesBody: string;
  viewWebsite: string;
  founderLabel: string;
  workContact: string;
  availabilityTime: string;
  legalCategory: string;
  productCategory: string;
  wellnessCategory: string;
  tkTagline: string;
  pilatesTagline: string;
};

const EN: V2Copy = {
  services: "Websites · AI · Automation",
  hero: "Your website is only the beginning.",
  heroSub: "Beautiful digital experiences, with useful systems working underneath.",
  message: "Message me",
  navWork: "Work",
  navCapabilities: "What I build",
  navAbout: "About",
  firstImpression: "First impression",
  enquiryReceived: "Enquiry received",
  receive: "Receive",
  someoneAsks: "Someone asks.",
  systemRevealed: "System revealed",
  usefulAction: "Useful action",
  route: "Route",
  requestUseful: "The request becomes useful.",
  humanJudgment: "Human judgment",
  resolved: "Resolved",
  signalResolved: "Signal resolved",
  surfaceUseful: "Beautiful on the surface.",
  underneathUseful: "Useful underneath.",
  resolvedOutcome: "The request is structured, the time is checked, and the owner gets a clear next step.",
  seeWork: "See the work ↓",
  work: "Selected work",
  proof: "Proof, not promises.",
  capabilities: "What I build",
  lab: "Genezisi Lab · Internal demo",
  labTitle: "See what the system actually does.",
  small: "Small by design",
  founderTitle: "You work with the person doing the work.",
  founderBody: "No account-manager layer and no pretend giant team. Genezisi stays small so design, technical decisions and communication stay close together.",
  contact: "Have something to build?",
  contactTitle: "Message me.",
  contactBody: "A website, an AI system, an automation—or something that combines them. Start with a message.",
  startWhatsApp: "Start on WhatsApp",
  consultations: "Consultations",
  siteHeadline: "Make room for better work.",
  siteBody: "A focused consultation for businesses ready to simplify what happens next.",
  book: "Book a consultation",
  siteVisual: "Quiet thinking. Clear decisions.",
  newEnquiry: "New enquiry",
  customerMessage: "Can I book a consultation next Tuesday?",
  requestUnderstood: "Request understood",
  parsedRequest: "Tuesday. Consultation. Check availability.",
  requestNextStep: "The request becomes a useful next step.",
  availability: "Availability",
  requestRecorded: "Request recorded",
  timeAvailable: "Time available",
  confirmationPrepared: "Confirmation prepared",
  needsReview: "Needs review",
  owner: "Socratic · Owner",
  ownerBody: "Automation handles the repetition. Judgment stays with a person.",
  receiveStep: "Receive the request",
  understandStep: "Understand the intent",
  actionStep: "Take the useful action",
  exceptionStep: "Send exceptions to a person",
  outcomeStep: "Deliver a clear next step to the owner",
  websiteTitle: "Websites",
  websiteBody: "Clear, distinctive digital experiences built to earn attention and trust.",
  aiTitle: "AI systems",
  aiBody: "Useful assistants and intelligent tools shaped around real business work.",
  automationTitle: "Automation",
  automationBody: "Connected workflows that remove repetitive steps while keeping people in control.",
  tkBody: "A professional service website built around clarity, credibility and a serious first impression.",
  frankBody: "A complex product frontend where trust, information hierarchy and user confidence matter.",
  pilatesBody: "A luxury wellness concept with schedule, booking flow and a mobile-first experience.",
  viewWebsite: "View website",
  founderLabel: "Socraticblock · Founder",
  workContact: "Have something at this level in mind? Message me.",
  availabilityTime: "Tuesday · 14:00",
  legalCategory: "Legal / Professional",
  productCategory: "Product / Crypto",
  wellnessCategory: "Wellness / Studio",
  tkTagline: "Counsel with clarity.",
  pilatesTagline: "Move with intention.",
};

const KA: V2Copy = {
  services: "ვებსაიტები · AI · ავტომატიზაცია",
  hero: "თქვენი ვებსაიტი მხოლოდ დასაწყისია.",
  heroSub: "გამორჩეული ციფრული გამოცდილება და სასარგებლო სისტემები, რომლებიც მის უკან მუშაობს.",
  message: "მომწერეთ",
  navWork: "ნამუშევრები",
  navCapabilities: "რას ვქმნი",
  navAbout: "ჩვენ შესახებ",
  firstImpression: "პირველი შთაბეჭდილება",
  enquiryReceived: "მოთხოვნა მიღებულია",
  receive: "მიღება",
  someoneAsks: "კლიენტი გწერთ.",
  systemRevealed: "სისტემა ჩანს",
  usefulAction: "სასარგებლო მოქმედება",
  route: "გადამისამართება",
  requestUseful: "მოთხოვნა სასარგებლო ნაბიჯად გარდაიქმნება.",
  humanJudgment: "ადამიანის გადაწყვეტილება",
  resolved: "დასრულებულია",
  signalResolved: "Signal დასრულებულია",
  surfaceUseful: "გარედან ლამაზი.",
  underneathUseful: "შიგნით სასარგებლო.",
  resolvedOutcome: "მოთხოვნა დალაგებულია, დრო შემოწმებულია და მფლობელი მკაფიო შემდეგ ნაბიჯს იღებს.",
  seeWork: "ნახეთ ნამუშევრები ↓",
  work: "რჩეული ნამუშევრები",
  proof: "საქმე, არა დაპირებები.",
  capabilities: "რას ვქმნი",
  lab: "Genezisi Lab · შიდა დემო",
  labTitle: "ნახეთ, რას აკეთებს სისტემა სინამდვილეში.",
  small: "განზრახ პატარა გუნდი",
  founderTitle: "თქვენ მუშაობთ უშუალოდ იმ ადამიანთან, ვინც საქმეს აკეთებს.",
  founderBody: "არ არის ანგარიშების მენეჯერების შრე და არც ხელოვნურად დიდი გუნდი. Genezisi პატარა რჩება, რათა დიზაინი, ტექნიკური გადაწყვეტილებები და კომუნიკაცია ერთმანეთთან ახლოს იყოს.",
  contact: "გაქვთ იდეა?",
  contactTitle: "მომწერეთ.",
  contactBody: "ვებსაიტი, AI სისტემა, ავტომატიზაცია — ან მათი კომბინაცია. ყველაფერი ერთი შეტყობინებით იწყება.",
  startWhatsApp: "დაიწყეთ WhatsApp-ზე",
  consultations: "კონსულტაციები",
  siteHeadline: "გაათავისუფლეთ ადგილი უკეთესი მუშაობისთვის.",
  siteBody: "კონცენტრირებული კონსულტაცია ბიზნესებისთვის, რომლებსაც შემდეგი ნაბიჯების გამარტივება სურთ.",
  book: "დაჯავშნეთ კონსულტაცია",
  siteVisual: "მშვიდი აზროვნება. მკაფიო გადაწყვეტილებები.",
  newEnquiry: "ახალი მოთხოვნა",
  customerMessage: "შემიძლია კონსულტაცია მომავალ სამშაბათს დავჯავშნო?",
  requestUnderstood: "მოთხოვნა გაგებულია",
  parsedRequest: "სამშაბათი. კონსულტაცია. ხელმისაწვდომობის შემოწმება.",
  requestNextStep: "მოთხოვნა შემდეგ სასარგებლო ნაბიჯად გარდაიქმნება.",
  availability: "ხელმისაწვდომობა",
  requestRecorded: "მოთხოვნა ჩაწერილია",
  timeAvailable: "დრო თავისუფალია",
  confirmationPrepared: "დადასტურება მზადაა",
  needsReview: "საჭიროა გადახედვა",
  owner: "Socratic · მფლობელი",
  ownerBody: "ავტომატიზაცია რუტინულ ნაბიჯებს ასრულებს. საბოლოო გადაწყვეტილება ადამიანს რჩება.",
  receiveStep: "მოთხოვნის მიღება",
  understandStep: "განზრახვის გაგება",
  actionStep: "სასარგებლო მოქმედების შესრულება",
  exceptionStep: "გამონაკლისის ადამიანთან გადაგზავნა",
  outcomeStep: "მფლობელისთვის მკაფიო შემდეგი ნაბიჯის მიწოდება",
  websiteTitle: "ვებსაიტები",
  websiteBody: "მკაფიო და გამორჩეული ციფრული გამოცდილება, რომელიც ყურადღებასა და ნდობას იმსახურებს.",
  aiTitle: "AI სისტემები",
  aiBody: "სასარგებლო ასისტენტები და ინტელექტუალური ხელსაწყოები, მორგებული რეალურ სამუშაოზე.",
  automationTitle: "ავტომატიზაცია",
  automationBody: "დაკავშირებული პროცესები, რომლებიც იმეორებად ნაბიჯებს ამცირებს და კონტროლს ადამიანთან ტოვებს.",
  tkBody: "პროფესიული სერვისის ვებსაიტი, შექმნილი სიცხადის, სანდოობისა და ძლიერი პირველი შთაბეჭდილების გარშემო.",
  frankBody: "რთული პროდუქტის ფრონტენდი, სადაც ნდობა, ინფორმაციის იერარქია და მომხმარებლის თავდაჯერებულობა მნიშვნელოვანია.",
  pilatesBody: "პრემიუმ wellness კონცეფცია განრიგით, დაჯავშნის პროცესით და mobile-first გამოცდილებით.",
  viewWebsite: "ნახეთ ვებსაიტი",
  founderLabel: "Socraticblock · დამფუძნებელი",
  workContact: "გსურთ მსგავსი დონის პროექტი? მომწერეთ.",
  availabilityTime: "სამშაბათი · 14:00",
  legalCategory: "იურიდიული / პროფესიული",
  productCategory: "პროდუქტი / კრიპტო",
  wellnessCategory: "ველნესი / სტუდია",
  tkTagline: "სიცხადე იურიდიულ სერვისში.",
  pilatesTagline: "იმოძრავეთ გააზრებულად.",
};

export function getV2Copy(locale: Locale): V2Copy {
  return locale === "ka" ? KA : EN;
}
