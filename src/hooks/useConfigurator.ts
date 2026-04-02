"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { ServiceItem, FOUNDATIONS, MODULES, SHIELD_TIERS } from "@/constants/pricing";
import { clearBlueprintSessionId } from "@/lib/blueprint/clientBlueprintId";
import {
  buildDiscoveryQuestions,
  isDiscoveryComplete,
} from "@/lib/discovery/buildDiscoveryQuestions";
import { z } from "zod";
import { formatPrice as formatPricePure, EXCHANGE_RATE } from "@/utils/format";

const STORAGE_KEY = "genezisi_architect_config";

const configSchema = z.object({
  step: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]).optional(),
  foundation: z.string().nullable().optional(),
  selectedModules: z.array(z.string()).optional(),
  moduleQuantities: z.record(z.string(), z.number()).optional(),
  shieldTier: z.number().min(0).max(3).optional(),
  answers: z.record(z.string(), z.unknown()).optional(),
  discoveryStep: z.number().optional(),
});

type ConfigState = z.infer<typeof configSchema>;

// ── Phase B Fix #1: Single localStorage parse ──
function getInitialState(): ConfigState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const result = configSchema.safeParse(JSON.parse(raw));
    return result.success ? result.data : null;
  } catch {
    return null;
  }
}

export function useConfigurator() {
  // Parse localStorage ONCE and spread into all initializers
  const [initial] = useState<ConfigState | null>(getInitialState);

  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(initial?.step ?? 1);
  const [foundation, setFoundation] = useState<string | null>(initial?.foundation ?? null);
  const [selectedModules, setSelectedModules] = useState<string[]>(initial?.selectedModules ?? []);
  const [moduleQuantities, setModuleQuantities] = useState<Record<string, number>>(initial?.moduleQuantities ?? {});
  const [shieldTier, setShieldTier] = useState<number>(initial?.shieldTier ?? 0);
  const [answers, setAnswers] = useState<Record<string, unknown>>(initial?.answers ?? {});

  const [discoveryStep, setDiscoveryStep] = useState<number>(0);
  const [isEditing, setIsEditing] = useState(false);
  const [isUSD, setIsUSD] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [drawerItem, setDrawerItem] = useState<ServiceItem | null>(null);
  const [mobileIndex, setMobileIndex] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const prevFoundationRef = useRef<string | null>(foundation || null);

  // Conditional step navigation
  const canGoToStep = useCallback(
    (s: number) => {
      if (s === 1) return true;
      const isBespoke = FOUNDATIONS.find(f => f.id === foundation)?.isBespoke;
      if (isBespoke) return false;

      if (s === 2) return !!foundation;
      if (s === 3) return !!foundation;
      if (s === 4) return !!foundation;
      if (s === 5) {
        if (!foundation) return false;
        const qs = buildDiscoveryQuestions({
          foundation,
          selectedModules,
          isUpgrade: foundation === "upgrade",
        });
        return isDiscoveryComplete(answers, qs);
      }
      return false;
    },
    [foundation, selectedModules, answers]
  );

  // Hydrate flag on mount
  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated && !canGoToStep(step)) {
      setStep(1);
    }
  }, [hydrated, step, canGoToStep, setStep]);

  // Reset Discovery when Foundation changes
  useEffect(() => {
    if (!hydrated) return;
    if (foundation !== prevFoundationRef.current) {
      setSelectedModules([]);
      setModuleQuantities({});
      setAnswers({});
      setDiscoveryStep(0);
      prevFoundationRef.current = foundation || null;
    }
  }, [foundation, hydrated, setSelectedModules]);

  // ── Phase B Fix #2: Debounced localStorage persistence ──
  const persistTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!hydrated) return;

    // Clear any pending write
    if (persistTimerRef.current) {
      clearTimeout(persistTimerRef.current);
    }

    persistTimerRef.current = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          foundation,
          selectedModules,
          moduleQuantities,
          shieldTier,
          step,
          answers,
          discoveryStep,
        }));
      } catch {}
    }, 250);

    return () => {
      if (persistTimerRef.current) {
        clearTimeout(persistTimerRef.current);
      }
    };
  }, [foundation, selectedModules, moduleQuantities, shieldTier, step, hydrated, answers, discoveryStep]);

  const clearConfiguration = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    clearBlueprintSessionId();
    setFoundation(null);
    setSelectedModules([]);
    setModuleQuantities({});
    setShieldTier(0);
    setAnswers({});
    setDiscoveryStep(0);
    setStep(1);
    setIsUSD(false);
    setIsEditing(false);
    setDrawerItem(null);
    setIsModalOpen(false);
    setMobileIndex(0);
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

  const goToStep = useCallback((s: 1 | 2 | 3 | 4 | 5): boolean => {
    if (!canGoToStep(s)) return false;
    setStep(s);
    return true;
  }, [canGoToStep]);

  const selectFoundationAndAdvance = useCallback((id: string) => {
    setFoundation(id);
    setStep(2);
    setDrawerItem(null);
  }, []);

  const exchangeRate = EXCHANGE_RATE;

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

  // ── Phase B Fix #3: formatPrice wraps the pure utility ──
  const formatPrice = useCallback(
    (price: number) => formatPricePure(price, isUSD),
    [isUSD]
  );

  const toggleModule = useCallback((id: string) => {
    if (foundation === "landing") return;
    setSelectedModules(prev => {
      const isRemoving = prev.includes(id);
      if (isRemoving) {
        setModuleQuantities((q) => {
          const next = { ...q };
          delete next[id];
          return next;
        });
        return prev.filter((m) => m !== id);
      } else {
        setModuleQuantities(q => ({ ...q, [id]: (q[id] !== undefined && q[id] > 0) ? q[id] : 1 }));
        return [...prev, id];
      }
    });
  }, [foundation]);

  const updateQuantity = useCallback((id: string, qty: number) => {
    setModuleQuantities(prev => ({ ...prev, [id]: Math.max(0, qty) }));
  }, []);

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
    selectFoundationAndAdvance,
    activeFoundation,
    oneTimeTotal,
    monthlyTotal,
    savingsUSD,
    hasGita,
    formatPrice,
    toggleModule,
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
