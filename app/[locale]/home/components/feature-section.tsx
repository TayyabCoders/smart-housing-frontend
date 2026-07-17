"use client";
import { useTranslations } from "next-intl";
import { ScanFace, Car, Video, Vote, MessageSquareWarning, Languages } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import { FeatureCard } from "./feature-card";
import type { Feature } from "../types/";

export function FeaturesSection() {
  const t = useTranslations("home");
  const headRef = useReveal<HTMLDivElement>();

  const features: Feature[] = [
    {
      id: "ai-automation",
      title: t("features.aiAutomation.title"),
      description: t("features.aiAutomation.description"),
      icon: ScanFace,
      isNew: true,
    },
    {
      id: "lightning-fast",
      title: t("features.lightningFast.title"),
      description: t("features.lightningFast.description"),
      icon: Car,
    },
    {
      id: "enterprise-security",
      title: t("features.enterpriseSecurity.title"),
      description: t("features.enterpriseSecurity.description"),
      icon: Video,
    },
    {
      id: "scalable-infrastructure",
      title: t("features.scalableInfrastructure.title"),
      description: t("features.scalableInfrastructure.description"),
      icon: Vote,
    },
    {
      id: "cloud-native",
      title: t("features.cloudNative.title"),
      description: t("features.cloudNative.description"),
      icon: MessageSquareWarning,
    },
    {
      id: "developer-first",
      title: t("features.developerFirst.title"),
      description: t("features.developerFirst.description"),
      icon: Languages,
    },
  ];

  return (
    <section id="features" className="py-28 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div ref={headRef} className="sr text-center mb-16">
          <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-4">
            {t("features.eyebrow")}
          </p>
          <h2
            className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-5 font-[family-name:var(--font-heading)]"
            style={{ letterSpacing: "-0.025em" }}
          >
            {t("features.title")}
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">{t("features.subtitle")}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => (
            <FeatureCard key={feature.id} feature={feature} delay={(i % 3) as 0 | 1 | 2} />
          ))}
        </div>
      </div>
    </section>
  );
}
