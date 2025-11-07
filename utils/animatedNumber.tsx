"use client";

import { useEffect, useState } from "react";

export const AnimatedNumber = ({
  value,
  duration = 1000,
}: {
  value: any;
  duration?: number;
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setDisplayValue(
        Math.floor(progress * parseInt(value.replace(/\D/g, "")))
      );
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [value, duration]);

  return <>{displayValue.toLocaleString()}+</>;
};
