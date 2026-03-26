"use client";

import { useState, useRef, useEffect } from "react";
import { m, AnimatePresence, LazyMotion } from "framer-motion";

const loadFeatures = () => import("framer-motion").then(res => res.domMax);
import { useConfigurator } from "@/hooks/useConfigurator";
import ConfigSidebar from "./ConfigSidebar";
import ConfigDrawer from "./ConfigDrawer";
import ConfigModal from "./ConfigModal";
import dynamic from "next/dynamic";

import StepNav from "./StepNav";
import FoundationGrid from "./FoundationGrid";
import ModuleGrid from "./ModuleGrid";
import ShieldGrid from "./ShieldGrid";

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

  const topAnchorRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Only scroll if we are on client and hydrated
    if (!hydrated || !topAnchorRef.current) return;

    // First-Render Lock: Prevent yanking the user on initial page load
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Calculate Y offset (Navbar 64px + 16px buffer = 80px)
    const navOffset = 80;
    const elementPosition = topAnchorRef.current.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - navOffset;

    // Use smooth for internal selections (foundation/discovery) and instant for steps
    // For now, consistent smooth scroll for feedback.
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
    
    // Also reset the internal container scroll just in case
    if (scrollRef && 'current' in scrollRef && scrollRef.current) {
      scrollRef.current.scrollTo(0, 0);
    }
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
      <div className="relative mx-auto flex max-w-[1400px] flex-col gap-5 px-3 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-4 lg:flex-row">

        <div className="absolute inset-x-0 bottom-0 top-[20%] bg-gradient-to-t from-emerald-500/5 to-transparent pointer-events-none" />

        {/* Main Flow Side */}
        <div className="flex-grow flex flex-col gap-5 lg:w-2/3">
          {/* Progress Bar */}
          <div ref={topAnchorRef} />
          <StepNav step={step} goToStep={goToStep} canGoToStep={canGoToStep} stepLabels={stepLabels} />

          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-1 pb-12 scrollbar-none sm:pb-10 [-webkit-overflow-scrolling:touch]"
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
              />
            )}

            {step === 3 && (
              <ShieldGrid
                shieldTier={shieldTier}
                setShieldTier={setShieldTier}
                formatPrice={formatPrice}
                goToStep={goToStep}
                setIsModalOpen={setIsModalOpen}
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
          />
        )}

        {/* Modal / Drawer Overlay */}
        <ConfigDrawer
          drawerItem={drawerItem}
          setDrawerItem={setDrawerItem}
          setFoundation={setFoundation}
          toggleModule={toggleModule}
          selectedModules={selectedModules}
          activeFoundationId={foundation}
        />

        <ConfigModal
          isModalOpen={isModalOpen} // Changed from 'isOpen' to 'isModalOpen' to match existing prop
          setIsModalOpen={() => setIsModalOpen(false)} // Changed from 'onClose' to 'setIsModalOpen'
          activeFoundation={activeFoundation} // Added back based on original ConfigModal props
          selectedModules={selectedModules} // Added back
          formatPrice={formatPrice} // Added back
          foundationPrice={foundationPrice} // Added back
        />


      </div>
    </LazyMotion>
  );
}
