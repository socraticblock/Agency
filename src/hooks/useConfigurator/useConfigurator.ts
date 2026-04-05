"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { type ServiceItem, FOUNDATIONS, getAccessibleModuleIdsByFoundation } from "../../constants/pricing";
import { clearBlueprintSessionId } from "../../lib/blueprint/clientBlueprintId";
import { buildDiscoveryQuestions, isDiscoveryComplete } from "../../lib/discovery/buildDiscoveryQuestions";

import { type ConfigState, STORAGE_KEY } from "./types";
import { getInitialState, usePersistence } from "./persistence";
import { usePricingLogic } from "./usePricingLogic";
import { useURLSync } from "./useURLSync";

export function useConfigurator() {
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
  const [urlSynced, setUrlSynced] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const prevFoundationRef = useRef<string | null>(foundation || null);
  const accessibleModuleIds = useMemo(
    () => getAccessibleModuleIdsByFoundation(foundation),
    [foundation]
  );

  const canGoToStep = useCallback(
    (s: number) => {
      if (s === 1) return true;
      const isBespoke = FOUNDATIONS.find(f => f.id === foundation)?.isBespoke;
      if (isBespoke) return false;

      if (s === 2 || s === 3 || s === 4) return !!foundation;
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

  useEffect(() => {
    setHydrated(true);
  }, []);

  useURLSync(hydrated, urlSynced, setUrlSynced, foundation, setFoundation);

  useEffect(() => {
    if (hydrated && !canGoToStep(step)) {
      setStep(1);
    }
  }, [hydrated, step, canGoToStep, setStep]);

  useEffect(() => {
    if (!hydrated) return;
    if (foundation !== prevFoundationRef.current) {
      const allowed = new Set(getAccessibleModuleIdsByFoundation(foundation));
      setSelectedModules((prev) => prev.filter((id) => allowed.has(id)));
      setModuleQuantities((prev) => {
        const next: Record<string, number> = {};
        for (const [id, qty] of Object.entries(prev)) {
          if (allowed.has(id)) next[id] = qty;
        }
        return next;
      });
      setAnswers({});
      setDiscoveryStep(0);
      prevFoundationRef.current = foundation || null;
    }
  }, [foundation, hydrated, setSelectedModules]);

  usePersistence({
    hydrated,
    foundation,
    selectedModules,
    moduleQuantities,
    shieldTier,
    step,
    answers,
    discoveryStep,
  });

  const clearConfiguration = () => {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
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

  const toggleModule = useCallback((id: string) => {
    if (foundation === "landing") return;
    const allowed = new Set(accessibleModuleIds);
    if (!allowed.has(id)) return;
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
  }, [foundation, accessibleModuleIds]);

  const updateQuantity = useCallback((id: string, qty: number) => {
    setModuleQuantities(prev => ({ ...prev, [id]: Math.max(0, qty) }));
  }, []);

  const pricingControls = usePricingLogic({
    foundation,
    selectedModules,
    moduleQuantities,
    shieldTier,
    isUSD,
  });

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
    toggleModule,
    clearConfiguration,
    accessibleModuleIds,
    answers,
    setAnswers,
    discoveryStep,
    setDiscoveryStep,
    isEditing,
    setIsEditing,
    moduleQuantities,
    updateQuantity,
    ...pricingControls,
  };
}
