"use client";

import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { useReveal } from "@/hooks/use-reveal";
import { PricingPlan } from "./pricing-section";

interface PricingCardProps {
  plan: PricingPlan;
  delay: 0 | 1 | 2;
}

export function PricingCard({ plan, delay }: PricingCardProps) {
  const t = useTranslations("home.pricing");
  const ref = useReveal<HTMLDivElement>();
  const highlight = !!plan.isPopular;

  return (
    <div
      ref={ref}
      className={`sr sr-scale d-${delay} relative rounded-2xl p-8 flex flex-col transition-all duration-300 hover:-translate-y-1`}
      style={{
        background: highlight ? "#111111" : "#ffffff",
        border: highlight ? "none" : "1px solid #e5e7eb",
        boxShadow: highlight ? "0 24px 64px rgba(0,0,0,0.2)" : "0 1px 3px rgba(0,0,0,0.04)",
      }}
    >
      {highlight && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="text-xs font-bold px-3.5 py-1.5 rounded-full bg-white text-gray-900 shadow-sm border border-gray-100">
            {t("mostPopular")}
          </span>
        </div>
      )}

      <div className="mb-6 pt-1">
        <h3
          className="font-bold text-xl mb-1.5 font-[family-name:var(--font-heading)]"
          style={{ color: highlight ? "#ffffff" : "#111111" }}
        >
          {plan.name}
        </h3>
        <p style={{ color: highlight ? "#9ca3af" : "#6b7280", fontSize: "0.875rem" }}>
          {plan.description}
        </p>
      </div>

      <div className="mb-7">
        <span
          className="text-5xl font-extrabold font-[family-name:var(--font-heading)]"
          style={{ color: highlight ? "#ffffff" : "#111111", letterSpacing: "-0.03em" }}
        >
          ${plan.price}
        </span>
        <span style={{ color: highlight ? "#6b7280" : "#9ca3af", fontSize: "0.875rem" }}>
          {" "}
          {plan.period}
        </span>
      </div>

      <ul className="space-y-3 flex-1 mb-7">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <Check
              className="w-4 h-4 mt-0.5 flex-shrink-0"
              style={{ color: highlight ? "#a5b4fc" : "#111111" }}
              strokeWidth={2.5}
            />
            <span className="text-sm" style={{ color: highlight ? "#d1d5db" : "#374151" }}>
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <button
        className="w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:opacity-85"
        style={{
          background: highlight ? "#ffffff" : "#111111",
          color: highlight ? "#111111" : "#ffffff",
        }}
      >
        {plan.buttonText}
      </button>
    </div>
  );
}
