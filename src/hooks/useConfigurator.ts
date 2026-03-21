"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { ServiceItem, FOUNDATIONS, MODULES, SHIELD_TIERS } from "@/constants/pricing";
import { z } from "zod";

const STORAGE_KEY = "kvali_architect_config";

const configSchema = z.object({
  step: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]).optional(),
  foundation: z.string().nullable().optional(),
  selectedModules: z.array(z.string()).optional(),
  moduleQuantities: z.record(z.string(), z.number()).optional(),
  shieldTier: z.number().min(0).max(3).optional(),
  answers: z.record(z.string(), z.any()).optional(),
  discoveryStep: z.number().optional(),
});

export function useConfigurator() {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(() => {
    if (typeof window === "undefined") return 1;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const validated = configSchema.safeParse(JSON.parse(saved));
        if (validated.success && validated.data.step) return validated.data.step;
      }
    } catch {}
    return 1;
  });
  const [foundation, setFoundation] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const validated = configSchema.safeParse(JSON.parse(saved));
        if (validated.success && validated.data.foundation !== undefined) return validated.data.foundation;
      }
    } catch {}
    return null;
  });
  const [selectedModules, setSelectedModules] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const validated = configSchema.safeParse(JSON.parse(saved));
        if (validated.success && validated.data.selectedModules) return validated.data.selectedModules;
      }
    } catch {}
    return [];
  });
  const [moduleQuantities, setModuleQuantities] = useState<Record<string, number>>(() => {
    if (typeof window === "undefined") return {};
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const validated = configSchema.safeParse(JSON.parse(saved));
        if (validated.success && validated.data.moduleQuantities) return validated.data.moduleQuantities;
      }
    } catch {}
    return {};
  });

  const [shieldTier, setShieldTier] = useState<number>(() => {
    if (typeof window === "undefined") return 0;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const validated = configSchema.safeParse(JSON.parse(saved));
        if (validated.success && validated.data.shieldTier !== undefined) return validated.data.shieldTier;
      }
    } catch {}
    return 0;
  });

  const [answers, setAnswers] = useState<Record<string, any>>(() => {
    if (typeof window === "undefined") return {};
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const validated = configSchema.safeParse(JSON.parse(saved));
        if (validated.success && validated.data.answers) return validated.data.answers;
      }
    } catch {}
    return {};
  });

  const [discoveryStep, setDiscoveryStep] = useState<number>(0);
  const [isEditing, setIsEditing] = useState(false);
  const [isUSD, setIsUSD] = useState(false);


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [drawerItem, setDrawerItem] = useState<ServiceItem | null>(null);
  const [mobileIndex, setMobileIndex] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  // Conditional step navigation
  const canGoToStep = useCallback((s: number) => {
    if (s === 1) return true;
    if (s === 2) return !!foundation;
    if (s === 3) return !!foundation;
    if (s === 4) return !!foundation;
    if (s === 5) return !!foundation && Object.keys(answers).length > 0;
    return false;
  }, [foundation, selectedModules, answers]);

  // Hydrate from localStorage on mount
  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated && !canGoToStep(step)) {
      setStep(1);
    }
  }, [hydrated, step, canGoToStep, setStep]);

  // Persist state to localStorage
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        foundation,
        selectedModules,
        moduleQuantities,
        shieldTier,
        step,
        answers,
        discoveryStep
      }));
    } catch {}
  }, [foundation, selectedModules, moduleQuantities, shieldTier, step, hydrated, answers, discoveryStep]);

  const clearConfiguration = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    setFoundation(null);
    setSelectedModules([]);
    setShieldTier(0);
    setAnswers({});
    setDiscoveryStep(0);
    setStep(1);
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDrawerItem(null);
        setIsModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const width = scrollRef.current.clientWidth;
    const index = Math.round(scrollRef.current.scrollLeft / (width * 0.85));
    setMobileIndex(index);
  };



  const goToStep = useCallback((s: 1 | 2 | 3 | 4 | 5) => {
    if (canGoToStep(s)) setStep(s);
  }, [canGoToStep]);

  const exchangeRate = 2.7;

  // Calculations
  // Calculations
  const activeFoundation = useMemo(() => FOUNDATIONS.find(f => f.id === foundation), [foundation]);
  const foundationPrice = activeFoundation?.priceGEL || 0;

  const modulesPrice = useMemo(() => selectedModules.reduce((acc, id) => {
    const mod = MODULES.find(m => m.id === id);
    const qty = moduleQuantities[id] ?? 1;
    return acc + (mod?.priceGEL || 0) * qty;
  }, 0), [selectedModules, moduleQuantities]);

  const shieldPrice = useMemo(() => SHIELD_TIERS.find(s => s.id === shieldTier)?.priceGEL || 0, [shieldTier]);

  const oneTimeTotal = useMemo(() => foundationPrice + modulesPrice, [foundationPrice, modulesPrice]);
  const monthlyTotal = shieldPrice;

  const westernAgencyTotalUSD = 150 * 50;
  const currentTotalUSD = useMemo(() => oneTimeTotal / exchangeRate, [oneTimeTotal]);
  const savingsUSD = useMemo(() => westernAgencyTotalUSD - currentTotalUSD > 0 ? westernAgencyTotalUSD - currentTotalUSD : 0, [currentTotalUSD]);

  const hasGita = useMemo(() => selectedModules.some(id =>
    MODULES.find(m => m.id === id)?.category === "Georgian Advantage"
  ), [selectedModules]);

  const formatPrice = (price: number) => {
    const converted = isUSD ? price / exchangeRate : price;
    return isUSD
      ? `$${converted.toFixed(0)}`
      : `${price.toLocaleString('ka-GE')} ₾`;
  };

  const toggleModule = useCallback((id: string) => {
    setSelectedModules(prev => {
      const isRemoving = prev.includes(id);
      if (isRemoving) {
        setModuleQuantities(q => {
          const newQ = { ...q };
          // Do not delete to preserve "0" counter tracking on manual downgrades
          return newQ;
        });
        return prev.filter(m => m !== id);
      } else {
        setModuleQuantities(q => ({ ...q, [id]: (q[id] !== undefined && q[id] > 0) ? q[id] : 1 })); // preserve count or initialize at 1
        return [...prev, id];
      }
    });
  }, []);

  const updateQuantity = useCallback((id: string, qty: number) => {
    setModuleQuantities(prev => ({ ...prev, [id]: Math.max(0, qty) }));
  }, []);

  const categories = useMemo(() => Array.from(new Set(MODULES.map(m => m.category))), []);

  const totalHoursSaved = useMemo(() => {
    return selectedModules.reduce((acc, id) => {
      const mod = MODULES.find(m => m.id === id);
      return acc + (mod?.timeSaved || 0);
    }, 0);
  }, [selectedModules]);

  return {
    step,
    setStep,
    foundation,
    setFoundation,
    selectedModules,
    setSelectedModules,
    shieldTier,
    setShieldTier,
    isUSD,
    setIsUSD,
    isModalOpen,
    setIsModalOpen,
    drawerItem,
    setDrawerItem,
    mobileIndex,
    setMobileIndex,
    hydrated,
    setHydrated,
    scrollRef,
    handleScroll,
    canGoToStep,
    goToStep,
    activeFoundation,
    oneTimeTotal,
    monthlyTotal,
    savingsUSD,
    hasGita,
    formatPrice,
    toggleModule,
    categories,
    exchangeRate,
    foundationPrice,
    modulesPrice,
    clearConfiguration,
    totalHoursSaved,
    answers,
    setAnswers,
    discoveryStep,
    setDiscoveryStep,
    isEditing,
    setIsEditing,
    moduleQuantities,
    updateQuantity
  };
}
