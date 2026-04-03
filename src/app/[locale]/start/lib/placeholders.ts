import type { Lane1CustomizerState, SectorId } from "./types";

type PartialPlaceholder = Pick<
  Lane1CustomizerState,
  | "name"
  | "title"
  | "phone"
  | "email"
  | "address"
  | "hours"
  | "practiceHeading"
  | "serviceAreas"
> & { serviceCount: number };

const PLACEHOLDERS: Record<SectorId, PartialPlaceholder> = {
  lawyers: {
    name: "Mikadze & Partners",
    title: "Civil law · Tbilisi",
    phone: "+995 555 12 34 56",
    email: "office@mikzadze.ge",
    address: "12 Vazha-Pshavela Ave, Tbilisi",
    hours: "Mon–Fri 10:00–18:00",
    practiceHeading: "Practice areas",
    serviceCount: 3,
    serviceAreas: ["Contracts", "Employment law", "Corporate advisory", ""],
  },
  realestate: {
    name: "Tbilisi Property Group",
    title: "Real estate agent",
    phone: "+995 555 98 76 54",
    email: "hello@tbilisiproperty.ge",
    address: "5 Chabukiani St, Tbilisi",
    hours: "Daily 11:00–19:00",
    practiceHeading: "Services",
    serviceCount: 3,
    serviceAreas: ["Buy & sell", "Rentals", "Valuations", ""],
  },
  consultants: {
    name: "Growth Lab Georgia",
    title: "Business consultant",
    phone: "+995 555 11 22 33",
    email: "contact@growthlab.ge",
    address: "9 Chabukiani St, Office 4, Tbilisi",
    hours: "Mon–Fri 09:00–17:00",
    practiceHeading: "Practice areas",
    serviceCount: 3,
    serviceAreas: ["Strategy", "Operations", "Finance", ""],
  },
  restaurants: {
    name: "Chanchiki",
    title: "Georgian kitchen · Tbilisi",
    phone: "+995 555 44 55 66",
    email: "reserve@chanchiki.ge",
    address: "3 Shardeni St, Tbilisi",
    hours: "12:00–23:00",
    practiceHeading: "Menu & service",
    serviceCount: 3,
    serviceAreas: ["Lunch", "Dinner", "Wine & events", ""],
  },
};

export function getSectorPlaceholder(sectorId: SectorId): PartialPlaceholder {
  return PLACEHOLDERS[sectorId];
}

export const SECTOR_LABELS: Record<
  SectorId,
  { titleKa: string; titleEn: string; descKa: string; descEn: string }
> = {
  lawyers: {
    titleKa: "იურისტები",
    titleEn: "Lawyers",
    descKa: "ადვოკატები და იურიდიული ფირმები",
    descEn: "Attorneys and law firms",
  },
  realestate: {
    titleKa: "უძრავი ქონება",
    titleEn: "Real estate",
    descKa: "აგენტები და ბროკერები",
    descEn: "Agents and brokers",
  },
  consultants: {
    titleKa: "კონსულტანტები",
    titleEn: "Consultants",
    descKa: "ბიზნესი და სტრატეგია",
    descEn: "Business and strategy",
  },
  restaurants: {
    titleKa: "რესტორნები",
    titleEn: "Restaurants",
    descKa: "სასურველი და კაფეები",
    descEn: "Dining and cafés",
  },
};
