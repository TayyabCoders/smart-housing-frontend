"use client";

import { useTranslations } from "next-intl";
import NextLink from "next/link";
import { useParams } from "next/navigation";
import { Check } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";

const CHECK_KEYS: [string, string][] = [
  ["layoutSystem", "formBuilder"],
  ["realtimeDashboard", "enterpriseAuth"],
  ["uiComponents", "stateManagement"],
  ["testingSuite", "performance"],
  ["storybook", "socketTesting"],
  ["apiNetworking", "logging"],
  ["theming", "styling"],
];

export function DashboardChecklistSection() {
  const t = useTranslations("home");
  const params = useParams();
  const locale = (params.locale as string) ?? "en";
  const headRef = useReveal<HTMLDivElement>();
  const listRef = useReveal<HTMLDivElement>();

  return (
    <section id="dashboard" className="py-28 px-6" style={{ background: "#f9fafb" }}>
      <div className="max-w-7xl mx-auto">
        <div ref={headRef} className="sr mb-16">
          <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-4">
            {t("dashboardSection.eyebrow")}
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2
              className="text-4xl md:text-5xl font-extrabold text-gray-900 max-w-xl font-[family-name:var(--font-heading)]"
              style={{ letterSpacing: "-0.025em", lineHeight: 1.1 }}
            >
              {t("showcase.title")}
            </h2>
            <p className="text-gray-500 text-base max-w-sm leading-relaxed">
              {t("showcase.description")}
            </p>
          </div>
        </div>

        <div ref={listRef} className="sr grid md:grid-cols-2 gap-2.5">
          {CHECK_KEYS.map(([left, right], i) => (
            <div key={i} className="contents">
              {[left, right].map((key) => (
                <div
                  key={key}
                  className="flex items-center gap-3.5 px-5 py-4 rounded-xl bg-white transition-all duration-200 hover:shadow-sm group"
                  style={{ border: "1px solid #e5e7eb" }}
                >
                  <div
                    className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ background: "#111111" }}
                  >
                    <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                  </div>
                  <span className="text-gray-700 text-sm font-medium group-hover:text-gray-900 transition-colors">
                    {t(`showcase.features.${key}`)}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-3">
          <NextLink
            href={`/${locale}/dashboard`}
            className="font-semibold px-6 py-3 rounded-xl text-sm transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 text-center"
            style={{ background: "#111111", color: "#ffffff" }}
          >
            {t("dashboardSection.viewDemo")}
          </NextLink>
          <button
            type="button"
            className="font-semibold px-6 py-3 rounded-xl text-sm transition-all duration-200 hover:bg-gray-100 text-center"
            style={{ border: "1px solid #d1d5db", color: "#374151" }}
          >
            {t("dashboardSection.bookCall")}
          </button>
        </div>
      </div>
    </section>
  );
}
