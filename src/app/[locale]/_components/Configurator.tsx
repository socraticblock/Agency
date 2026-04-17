"use client";

import { useState, useRef, useEffect } from "react";
import { m, AnimatePresence, LazyMotion } from "framer-motion";

const loadFeatures = () => import("framer-motion").then(res => res.domMax);
import { useConfigurator } from "@/hooks/useConfigurator";
import ConfigSidebar from "./ConfigSidebar";
const ConfigDrawer = dynamic(() => import("./ConfigDrawer"), {
  ssr: false,
});
import ConfigModal from "./ConfigModal";
import dynamic from "next/dynamic";

import StepNav from "./StepNav";
import FoundationGrid from "./FoundationGrid";
import ModuleGrid from "./ModuleGrid";
import ShieldGrid from "./ShieldGrid";
import StudioHeader from "./StudioHeader";
import { useParams, useSearchParams } from "next/navigation";

const DiscoveryModule = dynamic(() => import("./DiscoveryModule"), {
  ssr: false,
  loading: () => <div className="text-center py-20 text-slate-500 font-space font-black text-xs animate-pulse">LOADING DISCOVERY SETUP...</div>
});

const SummaryDashboard = dynamic(() => import("./SummaryDashboard"), {
  ssr: false,
  loading: () => <div className="text-center py-20 text-slate-500 font-space font-black text-xs animate-pulse">LOADING AUDIT DASHBOARD...</div>
});

import { ArrowRight } from "lucide-react";

const stepLabels = [
  { num: "01", label: "Foundation" },
  { num: "02", label: "Modules" },
  { num: "03", label: "Shield" },
  { num: "04", label: "Discovery" },
  { num: "05", label: "Audit" },
];

export default function Configurator() {
  const {
    step,
    setStep,
    foundation,
    setFoundation,
    selectedModules,
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
    totalHoursSaved,
    accessibleModuleIds,
    answers,
    setAnswers,
    discoveryStep,
    setDiscoveryStep,
    isEditing,
    setIsEditing,
    clearConfiguration,
    moduleQuantities,
    updateQuantity,
  } = useConfigurator();

  const params = useParams();
  const searchParams = useSearchParams();
  const locale = (params.locale as string) || "en";
  const hasAppliedTierPreset = useRef(false);

  useEffect(() => {
    if (hasAppliedTierPreset.current) return;
    const requestedTier = searchParams.get("tier");
    if (!requestedTier) {
      hasAppliedTierPreset.current = true;
      return;
    }

    const tierMap: Record<string, string> = {
      professional: "cms",
      "command-center": "saas",
      "ecommerce-hq": "ecomm",
    };

    const mappedFoundation = tierMap[requestedTier.toLowerCase()];
    if (mappedFoundation && foundation !== mappedFoundation) {
      setFoundation(mappedFoundation);
      setStep(1);
    }
    hasAppliedTierPreset.current = true;
  }, [searchParams, foundation, setFoundation, setStep]);

  const topAnchorRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);
  const prevStepRef = useRef(step);

  useEffect(() => {
    // Only scroll if we are on client and hydrated
    if (!hydrated) return;

    // First-Render Lock: Prevent yanking the user on initial page load
    if (isFirstRender.current) {
      isFirstRender.current = false;
      prevStepRef.current = step;
      return;
    }

    const stepChanged = prevStepRef.current !== step;
    prevStepRef.current = step;

    // Ensure the DOM has finished its swap before scrolling
    requestAnimationFrame(() => {
      // Defer to internal scroll for discovery/audit (steps 4 and 5)
      if (step >= 4) return;

      // Calculate Y offset (Navbar 64px + 16px buffer = 80px)
      const navOffset = 80;
      const elementPosition = topAnchorRef.current?.getBoundingClientRect().top || 0;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      // Use 'auto' (instant) for step transitions to prevent layout-shift stall on mobile
      window.scrollTo({
        top: stepChanged ? 0 : offsetPosition,
        behavior: stepChanged ? "auto" : "smooth"
      });

      // Also reset the internal container scroll
      if (scrollRef && 'current' in scrollRef && scrollRef.current) {
        scrollRef.current.scrollTo(0, 0);
      }
    });
  }, [step, foundation, discoveryStep, hydrated, scrollRef]);

  if (!hydrated) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="h-6 w-6 border-b-2 border-emerald-400 rounded-full animate-spin" />
          <span className="text-xs font-bold text-zinc-500 font-space tracking-tight">Loading Builder Workspace...</span>
        </div>
      </div>
    );
  }

  return (
    <LazyMotion features={loadFeatures}>
      <StudioHeader locale={locale} />
      <div className="relative mx-auto flex max-w-[1400px] flex-col gap-5 px-3 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-4 lg:flex-row">

        <div className="absolute inset-x-0 bottom-0 top-[20%] bg-gradient-to-t from-emerald-500/5 to-transparent pointer-events-none" />

        {/* Main Flow Side */}
        <div className="flex-grow flex flex-col gap-5 lg:w-2/3">
          {/* Progress Bar */}
          <div ref={topAnchorRef} />

          <AnimatePresence mode="wait">
            {step === 1 && (
              <m.div
                key="hero-intro"
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: "auto", marginBottom: 24 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0, transition: { duration: 0.4, ease: "easeInOut" } }}
                className="flex flex-col gap-1 overflow-hidden"
              >
                <span className="text-xs font-black font-space uppercase tracking-widest text-emerald-400">Genezisi Architect Studio</span>
                <h1 className="font-space text-2xl font-black tracking-tight text-white md:text-3xl">
                  Build Your Digital Infrastructure
                </h1>
                <p className="max-w-xl text-base text-slate-400 sm:text-sm">
                  Design your asset from the ground up. Choose a foundation, customize with precision modules, and secure it with our Sentinel shield.
                </p>
              </m.div>
            )}
          </AnimatePresence>

          {step < 4 && (
            <StepNav step={step} goToStep={goToStep} canGoToStep={canGoToStep} stepLabels={stepLabels} />
          )}

          <div
            ref={scrollRef}
            className="flex-1 touch-manipulation overflow-y-auto px-1 pb-12 scrollbar-none sm:pb-10 [-webkit-overflow-scrolling:touch]"
          >
            {step === 1 && (
              <FoundationGrid
                foundation={foundation}
                setFoundation={setFoundation}
                activeFoundation={activeFoundation}
                formatPrice={formatPrice}
                scrollRef={scrollRef}
                handleScroll={handleScroll}
                mobileIndex={mobileIndex}
                setDrawerItem={setDrawerItem}
                goToStep={goToStep}
              />
            )}

            {step === 2 && (
              <ModuleGrid
                selectedModules={selectedModules}
                toggleModule={toggleModule}
                formatPrice={formatPrice}
                setDrawerItem={setDrawerItem}
                hasGita={hasGita}
                goToStep={goToStep}
                activeFoundation={activeFoundation}
                moduleQuantities={moduleQuantities}
                updateQuantity={updateQuantity}
                accessibleModuleIds={accessibleModuleIds}
              />
            )}

            {step === 3 && (
              <ShieldGrid
                shieldTier={shieldTier}
                setShieldTier={setShieldTier}
                formatPrice={formatPrice}
                goToStep={goToStep}
                setIsModalOpen={setIsModalOpen}
                foundationId={foundation}
              />
            )}

            {step === 4 && (
              <DiscoveryModule
                foundation={foundation}
                selectedModules={selectedModules}
                goToStep={goToStep}
                answers={answers}
                setAnswers={setAnswers}
                discoveryStep={discoveryStep}
                setDiscoveryStep={setDiscoveryStep}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
              />
            )}

            {step === 5 && (
              <SummaryDashboard
                foundation={foundation}
                selectedModules={selectedModules}
                shieldTier={shieldTier}
                answers={answers}
                goToStep={goToStep}
                setDiscoveryStep={setDiscoveryStep}
                setIsEditing={setIsEditing}
                moduleQuantities={moduleQuantities}
                oneTimeTotal={oneTimeTotal}
                monthlyTotal={monthlyTotal}
              />
            )}
          </div>

          {/* Persistent Footer Navigation */}

        </div>



        {step < 5 && (
          <ConfigSidebar
            activeFoundation={activeFoundation}
            selectedModules={selectedModules}
            moduleQuantities={moduleQuantities}
            oneTimeTotal={oneTimeTotal}
            monthlyTotal={monthlyTotal}
            isUSD={isUSD}
            setIsUSD={setIsUSD}
            formatPrice={formatPrice}
            savingsUSD={savingsUSD}
            setIsModalOpen={() => setIsModalOpen(true)}
            totalHoursSaved={totalHoursSaved}
            shieldTier={shieldTier}
            resetAll={clearConfiguration}
            step={step}
            goToStep={goToStep}
          />
        )}

        {/* Modal / Drawer Overlay */}
        <ConfigDrawer
          drawerItem={drawerItem}
          setDrawerItem={setDrawerItem}
          setFoundation={setFoundation}
          selectFoundationAndAdvance={selectFoundationAndAdvance}
          toggleModule={toggleModule}
          selectedModules={selectedModules}
          activeFoundationId={foundation}
        />

        <ConfigModal
          isModalOpen={isModalOpen} // Changed from 'isOpen' to 'isModalOpen' to match existing prop
          setIsModalOpen={() => setIsModalOpen(false)} // Changed from 'onClose' to 'setIsModalOpen'
          activeFoundation={activeFoundation} // Added back based on original ConfigModal props
          selectedModules={selectedModules} // Added back
          moduleQuantities={moduleQuantities}
          formatPrice={formatPrice} // Added back
          foundationPrice={foundationPrice} // Added back
        />


      </div>
    </LazyMotion>
  );
}
