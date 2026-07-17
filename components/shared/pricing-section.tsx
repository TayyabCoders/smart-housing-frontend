"use client";

import { useTranslations } from "next-intl";
import { useReveal } from "@/hooks/use-reveal";
import { PricingCard } from "./pricing-card";

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  period: string;
  features: string[];
  buttonText: string;
  buttonVariant: "default" | "outline";
  isPopular?: boolean;
}

export function PricingSection() {
  const t = useTranslations("home.pricing");
  const headRef = useReveal<HTMLDivElement>();

  const plans: PricingPlan[] = [
    {
      id: "basic",
      name: t("plans.basic.name"),
      description: t("plans.basic.description"),
      price: 9,
      period: t("period"),
      features: [
        t("plans.basic.features.0"),
        t("plans.basic.features.1"),
        t("plans.basic.features.2"),
        t("plans.basic.features.3"),
      ],
      buttonText: t("getStarted"),
      buttonVariant: "outline",
    },
    {
      id: "pro",
      name: t("plans.pro.name"),
      description: t("plans.pro.description"),
      price: 29,
      period: t("period"),
      features: [
        t("plans.pro.features.0"),
        t("plans.pro.features.1"),
        t("plans.pro.features.2"),
        t("plans.pro.features.3"),
        t("plans.pro.features.4"),
        t("plans.pro.features.5"),
      ],
      buttonText: t("getStarted"),
      buttonVariant: "default",
      isPopular: true,
    },
    {
      id: "team",
      name: t("plans.team.name"),
      description: t("plans.team.description"),
      price: 79,
      period: t("period"),
      features: [
        t("plans.team.features.0"),
        t("plans.team.features.1"),
        t("plans.team.features.2"),
        t("plans.team.features.3"),
        t("plans.team.features.4"),
        t("plans.team.features.5"),
        t("plans.team.features.6"),
        t("plans.team.features.7"),
      ],
      buttonText: t("contactSales"),
      buttonVariant: "outline",
    },
  ];

  return (
    <section id="pricing" className="py-28 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div ref={headRef} className="sr text-center mb-16">
          <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-4">
            {t("eyebrow")}
          </p>
          <h2
            className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-5 font-[family-name:var(--font-heading)]"
            style={{ letterSpacing: "-0.025em" }}
          >
            {t("title")}
          </h2>
          <p className="text-gray-500 text-lg">{t("subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 items-center">
          {plans.map((plan, idx) => (
            <PricingCard key={plan.id} plan={plan} delay={idx as 0 | 1 | 2} />
          ))}
        </div>
      </div>
    </section>
  );
}
