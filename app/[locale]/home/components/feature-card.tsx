"use client";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useReveal } from "@/hooks/use-reveal";
import { Feature } from "../types";

interface FeatureCardProps {
  feature: Feature;
  delay: 0 | 1 | 2;
}

export function FeatureCard({ feature, delay }: FeatureCardProps) {
  const t = useTranslations("home");
  const Icon = feature.icon;
  const [hover, setHover] = useState(false);
  const ref = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`sr d-${delay} rounded-2xl p-7 flex flex-col transition-all duration-300 cursor-default`}
      style={{
        background: hover ? "#f9fafb" : "#ffffff",
        border: "1px solid #e5e7eb",
        transform: hover ? "translateY(-3px)" : "none",
        boxShadow: hover ? "0 12px 40px rgba(0,0,0,0.07)" : "0 1px 3px rgba(0,0,0,0.04)",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="flex items-start justify-between mb-5">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: "#f3f4f6", color: "#374151" }}
        >
          <Icon className="w-5 h-5" />
        </div>
        {feature.isNew && (
          <span
            className="text-xs font-bold px-2.5 py-1 rounded-full"
            style={{ background: "#ecfdf5", color: "#059669" }}
          >
            {t("features.newBadge")}
          </span>
        )}
      </div>

      <h3 className="font-bold text-gray-900 mb-2.5 text-[17px] font-[family-name:var(--font-heading)]">
        {feature.title}
      </h3>
      <p className="text-gray-500 text-sm leading-relaxed flex-1">{feature.description}</p>

      <button
        className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-gray-900 transition-all duration-150 group"
        style={{ opacity: hover ? 1 : 0.6 }}
      >
        {t("features.learnMore")}
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
      </button>
    </div>
  );
}
