"use client";

import { useState, useRef, useEffect } from "react";
import { m, AnimatePresence, LazyMotion } from "framer-motion";

const loadFeatures = () => import("framer-motion").then(res => res.domMax);
import { useConfigurator } from "@/hooks/useConfigurator";
import { ServiceItem, MODULES, FOUNDATIONS } from "@/constants/pricing";
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
    handleScroll, // This might not be used with the new layout
    canGoToStep,
    goToStep,
    activeFoundation,
    oneTimeTotal,
    monthlyTotal,
    savingsUSD,
    hasGita,
    formatPrice,
    toggleModule,
    categories, // This might not be used with the new layout
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
  } = useConfigurator();

  useEffect(() => {
    if (scrollRef && 'current' in scrollRef && scrollRef.current) {
      scrollRef.current.scrollTo(0, 0);
    }
  }, [step, scrollRef]);

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
      <div className="flex min-h-screen bg-black relative">
        <div className="absolute inset-x-0 bottom-0 top-[20%] bg-gradient-to-t from-emerald-500/5 to-transparent pointer-events-none" />

        {/* Main Flow Side */}
        <div className="flex-grow flex flex-col gap-5 lg:w-2/3">
          {/* Progress Bar */}
          <StepNav step={step} goToStep={goToStep} canGoToStep={canGoToStep} stepLabels={stepLabels} />

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-1 pb-10 scrollbar-none">
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
                    categories={categories}
                    selectedModules={selectedModules}
                    toggleModule={toggleModule}
                    formatPrice={formatPrice}
                    setDrawerItem={setDrawerItem}
                    hasGita={hasGita}
                    goToStep={goToStep}
                    activeFoundation={activeFoundation}
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
                    setSelectedModules={setSelectedModules}
                    shieldTier={shieldTier}
                    goToStep={goToStep}
                    answers={answers}
                    setAnswers={setAnswers}
                    discoveryStep={discoveryStep}
                    setDiscoveryStep={setDiscoveryStep}
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
                  />
                )}
          </div>

          {/* Persistent Footer Navigation */}

        </div>

        <ConfigSidebar
          activeFoundation={activeFoundation}
          selectedModules={selectedModules}
          oneTimeTotal={oneTimeTotal}
          monthlyTotal={monthlyTotal}
          isUSD={isUSD}
          setIsUSD={setIsUSD}
          formatPrice={formatPrice}
          savingsUSD={savingsUSD}
          setIsModalOpen={() => setIsModalOpen(true)}
          totalHoursSaved={totalHoursSaved}
          shieldTier={shieldTier}
        />

        {/* Modal / Drawer Overlay */}
        <ConfigDrawer
          drawerItem={drawerItem}
          setDrawerItem={setDrawerItem}
          setFoundation={setFoundation}
          toggleModule={toggleModule}
          selectedModules={selectedModules}
        />

        <ConfigModal
          isModalOpen={isModalOpen} // Changed from 'isOpen' to 'isModalOpen' to match existing prop
          setIsModalOpen={() => setIsModalOpen(false)} // Changed from 'onClose' to 'setIsModalOpen'
          activeFoundation={activeFoundation} // Added back based on original ConfigModal props
          selectedModules={selectedModules} // Added back
          formatPrice={formatPrice} // Added back
          foundationPrice={foundationPrice} // Added back
        />

        {/* Sticky Return to Summary button */}
        {isEditing && step < 5 && (
          <m.button
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            onClick={() => {
              goToStep(5);
              setIsEditing(false);
            }}
            className="fixed bottom-6 right-6 bg-emerald-400 text-black font-space font-black text-xs uppercase px-5 py-3 rounded-full flex items-center gap-1.5 shadow-[0_10px_30px_rgba(16,185,129,0.4)] hover:scale-105 active:scale-95 transition-all z-50 cursor-pointer"
          >
            Return to Summary <ArrowRight className="h-3.5 w-3.5" />
          </m.button>
        )}
      </div>
    </LazyMotion>
  );
}
