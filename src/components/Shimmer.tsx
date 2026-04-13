import { useState, useEffect, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ShimmerProps {
  children: ReactNode;
  className?: string;
  duration?: number;
}

export default function Shimmer({ children, className, duration = 1200 }: ShimmerProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (isLoading) {
    return (
      <div className={cn("relative overflow-hidden rounded-lg bg-primary/5", className)}>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
        <div className="invisible">{children}</div>
      </div>
    );
  }

  return <div className={cn("animate-in fade-in duration-500", className)}>{children}</div>;
}
