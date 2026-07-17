"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Counter } from "./counter";

const STATS = [
  { value: 500, suffix: "+", labelKey: "societiesServed" },
  { value: 50000, suffix: "+", labelKey: "activeResidents" },
  { value: 99, suffix: "%", labelKey: "uptimeGuarantee" },
  { value: 3, suffix: "", labelKey: "languagesSupported" },
] as const;

export function StatBand() {
  const t = useTranslations("home");
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-20 px-6" style={{ background: "#111111" }}>
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {STATS.map((s) => (
          <div key={s.labelKey} className="text-center">
            <div
              className="text-4xl md:text-5xl font-extrabold text-white mb-2 font-[family-name:var(--font-heading)]"
              style={{ letterSpacing: "-0.03em" }}
            >
              <Counter to={s.value} suffix={s.suffix} start={started} />
            </div>
            <div className="text-gray-500 text-sm font-medium">{t(`stats.${s.labelKey}`)}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
