"use client";

import NextLink from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

interface HeroSectionProps {
  isUrdu: boolean;
}

export function HeroSection({ isUrdu }: HeroSectionProps) {
  const t = useTranslations("home");
  const params = useParams();
  const locale = (params.locale as string) ?? "en";

  const logos = t.raw("hero.marqueeLogos") as string[];
  const tags = t.raw("hero.tags") as string[];

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "#0e1117", minHeight: "100vh" }}
    >
      {/* Subtle dot texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 inset-x-0 h-48 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #0e1117)" }}
      />

      <div className="relative max-w-7xl mx-auto px-6 pt-40 pb-28 flex flex-col items-center text-center">
        {/* Pill badge */}
        <div
          className="hero-1 inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 text-xs font-semibold tracking-wide"
          style={{
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.06)",
            color: "#94a3b8",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          {t("hero.waitlistBadge")}
        </div>

        {/* Headline */}
        <h1
          className={`hero-2 text-5xl md:text-7xl lg:text-[82px] font-extrabold leading-none tracking-tight text-white mb-7 max-w-4xl font-[family-name:var(--font-heading)] ${isUrdu ? "font-urdu" : ""}`}
          style={{ letterSpacing: "-0.03em" }}
        >
          {t("hero.titleLine1")}
          <br />
          <span style={{ color: "#a5b4fc" }}>{t("hero.titleHighlight")}</span>{" "}
          {t("hero.titleLine2")}
        </h1>

        {/* Sub */}
        <p
          className={`hero-3 text-slate-400 text-lg md:text-xl max-w-2xl leading-relaxed mb-10 ${isUrdu ? "font-urdu" : ""}`}
        >
          {t("hero.description")}
        </p>

        {/* CTAs */}
        <div className="hero-4 flex flex-col sm:flex-row items-center gap-3">
          <NextLink
            href={`/${locale}/dashboard`}
            className="group flex items-center gap-2 font-semibold px-7 py-3.5 rounded-xl text-sm transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
            style={{ background: "#ffffff", color: "#111111" }}
          >
            {t("hero.primaryButton")}
            <svg
              className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </NextLink>
          <NextLink
            href={`/${locale}/signup`}
            className="font-semibold px-7 py-3.5 rounded-xl text-sm transition-all duration-200 hover:bg-white/10"
            style={{ border: "1px solid rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.8)" }}
          >
            {t("hero.secondaryButton")}
          </NextLink>
        </div>

        {/* Trust line */}
        <p className="hero-5 text-slate-600 text-xs mt-8">{t("hero.trustLine")}</p>

        {/* Feature tags */}
        <div className="hero-5 mt-10 flex flex-wrap justify-center gap-3">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3.5 py-1.5 rounded-full text-xs font-medium"
              style={{
                background: "rgba(255,255,255,0.06)",
                color: "#64748b",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Marquee logo strip */}
      <div
        className="relative border-y overflow-hidden py-4"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div className="animate-marquee flex gap-12 whitespace-nowrap">
          {[...logos, ...logos].map((name, i) => (
            <span
              key={i}
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: "#374151" }}
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
