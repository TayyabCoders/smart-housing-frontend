"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import NextLink from "next/link";
import { useReveal } from "@/hooks/use-reveal";

export function CTASection() {
  const t = useTranslations("home");
  const params = useParams();
  const locale = (params.locale as string) ?? "en";
  const isUrdu = params.locale === "ur";
  const ref = useReveal<HTMLDivElement>();

  return (
    <section className="py-28 px-6" style={{ background: "#f9fafb" }}>
      <div className="max-w-3xl mx-auto text-center">
        <div ref={ref} className="sr">
          <h2
            className={`text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 font-[family-name:var(--font-heading)] ${isUrdu ? "font-urdu" : ""}`}
            style={{ letterSpacing: "-0.03em", lineHeight: 1.05 }}
          >
            {t("cta.titleLine1")}
            <br />
            {t("cta.titleLine2")}
          </h2>
          <p
            className={`text-gray-500 text-lg mb-10 max-w-xl mx-auto leading-relaxed ${isUrdu ? "font-urdu" : ""}`}
          >
            {t("cta.description")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <NextLink
              href={`/${locale}/signup`}
              className="font-semibold px-8 py-4 rounded-xl text-sm transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
              style={{ background: "#111111", color: "#ffffff" }}
            >
              {t("cta.primaryButton")}
            </NextLink>
            <button
              type="button"
              className="font-semibold px-8 py-4 rounded-xl text-sm transition-all duration-200 hover:bg-gray-100"
              style={{ border: "1px solid #d1d5db", color: "#374151" }}
            >
              {t("cta.secondaryButton")}
            </button>
          </div>
          <p className="text-gray-400 text-xs mt-6">{t("cta.trustLine")}</p>
        </div>
      </div>
    </section>
  );
}
