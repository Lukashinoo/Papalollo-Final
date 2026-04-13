import { useEffect, useState, useRef } from "react";
import { animate, useInView, useMotionValue, useTransform } from "motion/react";

interface CountUpProps {
  to: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
}

export default function CountUp({ to, duration = 2, decimals = 0, suffix = "", prefix = "" }: CountUpProps) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    return prefix + latest.toFixed(decimals).replace(".", ",") + suffix;
  });
  const [displayValue, setDisplayValue] = useState(prefix + (0).toFixed(decimals).replace(".", ",") + suffix);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, to, {
        duration,
        ease: "easeOut",
        onUpdate: (latest) => {
          setDisplayValue(prefix + latest.toFixed(decimals).replace(".", ",") + suffix);
        }
      });
      return () => controls.stop();
    }
  }, [to, duration, isInView, prefix, suffix, decimals, count]);

  return <span ref={ref}>{displayValue}</span>;
}
