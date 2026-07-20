"use client";

import { useEffect, useState } from "react";

interface CounterProps {
  to: number;
  suffix?: string;
  start: boolean;
}

export function Counter({ to, suffix = "", start }: CounterProps) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;

    let t0: number | null = null;
    const duration = 1600;

    const tick = (now: number) => {
      if (!t0) t0 = now;
      const progress = Math.min((now - t0) / duration, 1);
      setValue(Math.round(progress * to));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [start, to]);

  return (
    <>
      {value.toLocaleString()}
      {suffix}
    </>
  );
}
