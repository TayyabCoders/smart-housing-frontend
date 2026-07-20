"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Check } from "lucide-react";
import { BaseGrid } from "@/components/shared/base-grid";

export function ShowcaseSection() {
  const t = useTranslations("home");

  const features = [
    { key: "layoutSystem" },
    { key: "formBuilder" },
    { key: "realtimeDashboard" },
    { key: "enterpriseAuth" },
    { key: "uiComponents" },
    { key: "stateManagement" },
    { key: "testingSuite" },
    { key: "performance" },
    { key: "storybook" },
    { key: "socketTesting" },
    { key: "apiNetworking" },
    { key: "logging" },
    { key: "theming" },
    { key: "styling" },
  ];

  return (
    <section className="py-20 px-6 bg-white dark:bg-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <BaseGrid columns={{ sm: 1, lg: 2 }} gap={12} className="items-center">
          {/* Left Column - Text and Features */}
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
              {t("showcase.title")}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 transition-colors duration-300">
              {t("showcase.description")}
            </p>

            {/* Features Grid */}
            <BaseGrid columns={{ sm: 1, md: 2 }} gap={4}>
              {features.map((feature) => (
                <div key={feature.key} className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900 border border-blue-300 dark:border-blue-700 shadow-sm">
                    <Check className="w-6 h-6 text-blue-600 dark:text-blue-400" strokeWidth={2.5} />
                  </span>
                  <span className="text-gray-800 dark:text-gray-200 font-medium transition-colors duration-300">
                    {t(`showcase.features.${feature.key}`)}
                  </span>
                </div>
              ))}
            </BaseGrid>
          </div>

          {/* Right Column - Image Showcase */}
          <div className="pt-8 lg:pt-0">
            <div className="relative rounded-2xl overflow-hidden border border-gray-300 dark:border-gray-800 bg-gray-100 dark:bg-gray-900/50 backdrop-blur-sm p-8 transition-colors duration-300 h-full w-full flex flex-col justify-center">
              <div className="relative rounded-lg overflow-hidden w-full h-[600px] lg:h-[700px]">
                <Image
                  src="https://images.unsplash.com/photo-1558002038-1055907df827?w=1200&q=80"
                  alt={t("showcase.imageAlt")}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
              </div>
            </div>
          </div>
        </BaseGrid>
      </div>
    </section>
  );
}
