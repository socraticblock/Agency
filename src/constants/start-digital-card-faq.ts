export type StartDigitalCardFaqItem = {
  id: string;
  question: string;
  answer: string;
};

/** Exactly 24 items — UI shows 5, then reveals in groups of 5. */
export const START_DIGITAL_CARD_FAQ_ITEMS: readonly StartDigitalCardFaqItem[] = [
  {
    id: "dc-faq-1",
    question: "What is a digital business card?",
    answer:
      "A smart, shareable online profile that replaces your paper card: name, photo, contact info, social links, services, and QR — one page that works on any phone or computer. Share via WhatsApp, bios, or QR.",
  },
  {
    id: "dc-faq-2",
    question: "How is this different from a regular website?",
    answer:
      "It loads fast, is built for mobile sharing, and costs a fraction of a full site. What you see in the customizer is what you get — professional design with minimal friction.",
  },
  {
    id: "dc-faq-3",
    question: "How long until my card goes live?",
    answer:
      "Usually within 3 working days (Mon–Sat) after we confirm your order and payment. Up to 5 working days when we’re busy. Executive clients get priority in the queue.",
  },
  {
    id: "dc-faq-4",
    question: "Do I need any technical skills?",
    answer:
      "No. Customize on this page — type, click, and see changes instantly. When you’re ready, tap Order on WhatsApp and we handle the rest.",
  },
  {
    id: "dc-faq-5",
    question: "Can I see examples of finished cards?",
    answer:
      "We’re adding a small portfolio of example cards here soon. Ask us on WhatsApp in the meantime and we’ll share links.",
  },
  {
    id: "dc-faq-6",
    question: "What are the pricing tiers?",
    answer:
      "Three tiers, same premium card: Subdomain (150₾ setup + 50₾/yr) at genezisi.com/your-name; Professional (250₾ + 50₾/yr) on your domain with a PDF setup guide; Executive (350₾ + 120₾/yr) with domain handled for you and VIP support.",
  },
  {
    id: "dc-faq-7",
    question: "Is there a one-time payment without yearly hosting?",
    answer:
      "No. Annual hosting keeps your card live, fast, and secure. Without hosting, the page can’t stay on the internet.",
  },
  {
    id: "dc-faq-8",
    question: "What does the annual hosting cover?",
    answer:
      "Hosting keeps your card online 24/7 on secure, fast infrastructure. Change policies (minor vs major, limits by tier) are separate — see our update policy, not “unlimited edits” by default.",
  },
  {
    id: "dc-faq-9",
    question: "What payment methods do you accept?",
    answer:
      "Bank transfer. After you order via WhatsApp we send payment details. Production starts after payment is confirmed.",
  },
  {
    id: "dc-faq-10",
    question: "Can I change my information after my card goes live?",
    answer:
      "Yes. Minor changes (phone, email, address, hours) follow your tier’s policy. Major changes (photo, bio, services, sections, socials, layout, company/title) count against your tier’s yearly allowance.",
  },
  {
    id: "dc-faq-11",
    question: 'What counts as a "major" vs "minor" change?',
    answer:
      "Minor: phone, email, physical address, working hours. Major: new/changed photo or crop/filter, bio, services, sections, social links, layout tweaks, company name or title changes.",
  },
  {
    id: "dc-faq-12",
    question: "How often can I request changes?",
    answer:
      "Minor changes: up to once per month for most tiers — send everything in one WhatsApp message. Executive: no monthly cap on minor changes. Major changes: per your tier’s yearly quota.",
  },
  {
    id: "dc-faq-13",
    question: "What if I need more than my tier allows?",
    answer:
      "Extra major changes are 30₾ each. If you often need more, consider upgrading your tier.",
  },
  {
    id: "dc-faq-14",
    question: "What URL will my card have?",
    answer:
      "By default genezisi.com/your-name on Subdomain. Professional and Executive use your own domain (e.g. yourname.ge).",
  },
  {
    id: "dc-faq-15",
    question: "What if I already own a domain?",
    answer:
      "Choose Professional. Keep the domain at your registrar; we send a PDF to point DNS to our servers.",
  },
  {
    id: "dc-faq-16",
    question: "Can I upgrade from a subdomain to my own domain later?",
    answer:
      "Yes. Upgrade fee matches the price difference between tiers; you’ll purchase the domain and follow our setup guide (or choose Executive for hands-off setup).",
  },
  {
    id: "dc-faq-17",
    question: "Can I have two domains pointing to my card?",
    answer:
      "Yes on Professional if you own both — follow the guide for each; no extra Genezisi fee for that. Executive: additional domains have a separate fee per your agreement.",
  },
  {
    id: "dc-faq-18",
    question: "What happens if I don't renew hosting?",
    answer:
      "We remind you before expiry. If you don’t renew, the card goes offline. Data may be retained for a limited window — confirm details on WhatsApp.",
  },
  {
    id: "dc-faq-19",
    question: "How do I share my card?",
    answer:
      "WhatsApp or any messenger, social bios, email signature, or your QR code.",
  },
  {
    id: "dc-faq-20",
    question: "Is my card mobile-friendly?",
    answer:
      "Yes — optimized for phones first; also works on tablets and desktops.",
  },
  {
    id: "dc-faq-21",
    question: "Does my card work without internet?",
    answer:
      "It’s a web page — it needs a connection to load. It’s built to load quickly even on mobile data.",
  },
  {
    id: "dc-faq-22",
    question: "How do I contact you?",
    answer:
      "WhatsApp. We reply within a few hours during business hours (Mon–Sat, 10:00–19:00).",
  },
  {
    id: "dc-faq-23",
    question: "Is my data secure?",
    answer:
      "Your card is served over HTTPS. We don’t sell your data. Hosting follows sensible security practices — ask for details if you need them.",
  },
  {
    id: "dc-faq-24",
    question: "What is your refund policy?",
    answer:
      "Orders reflect what you configured in the live preview. After the card is published, we don’t offer refunds — you see exactly what you order.",
  },
];
