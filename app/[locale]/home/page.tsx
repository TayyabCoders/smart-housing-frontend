"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useLayout } from "@/contexts/layout-context";
import { DynamicLayout } from "@/components/layout/dynamic-layout";
import { HeroSection } from "./components/hero-section";
import { PricingSection } from "@/components/shared/pricing-section";
import { CTASection } from "@/components/shared/cta-section";
import { FeaturesSection } from "./components/feature-section";
import { StatBand } from "./components/stat-band";
import { DashboardChecklistSection } from "./components/dashboard-checklist-section";
import { Footer } from "./components/footer";

export default function HomePage() {
  const { setLayoutType } = useLayout();
  const params = useParams();
  const isUrdu = params.locale === "ur";

  // Set layout to website type
  useEffect(() => {
    setLayoutType("website");
  }, [setLayoutType]);

  return (
    <DynamicLayout>
      <div className="min-h-screen flex flex-col relative overflow-hidden w-full bg-white">
        <HeroSection isUrdu={isUrdu} />
        <FeaturesSection />
        <StatBand />
        <DashboardChecklistSection />
        <PricingSection />
        <CTASection />
        <Footer />
      </div>
    </DynamicLayout>
  );
}
