import { useState, useEffect } from "react";
import { WifiOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  src: string;
  alt: string;
  className?: string;
}

const ShimmerImage = ({ src, alt, className }: Props) => {
  const [imageState, setImageState] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [minTimePassed, setMinTimePassed] = useState(false);

  useEffect(() => {
    // Random delay between 500ms and 1000ms for staggered loading
    const randomDelay = Math.floor(Math.random() * 500) + 500;
    const timer = setTimeout(() => {
      setMinTimePassed(true);
    }, randomDelay);
    return () => clearTimeout(timer);
  }, []);

  const showShimmer = !minTimePassed || imageState === 'loading';
  const showError = minTimePassed && imageState === 'error';
  // If it's loaded, we always show it (even if offline later). 
  // If it's error, we don't show the broken image icon.
  const showImage = imageState === 'loaded' || imageState === 'loading';

  return (
    <div className={cn("relative overflow-hidden bg-primary/5", className)}>
      {showShimmer && !showError && (
        <div className="absolute inset-0 rounded-lg overflow-hidden flex items-center justify-center z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
        </div>
      )}
      {showError && (
        <div className="absolute inset-0 rounded-lg overflow-hidden flex items-center justify-center z-10 bg-primary/5">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
          <div className="relative z-20 flex flex-col items-center justify-center text-primary/50">
            <WifiOff className="w-8 h-8 animate-pulse" />
          </div>
        </div>
      )}
      {showImage && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setImageState('loaded')}
          onError={() => setImageState('error')}
          className={cn(
            "w-full h-full object-cover transition-opacity duration-700",
            (imageState === 'loaded' && minTimePassed) ? "opacity-100" : "opacity-0"
          )}
        />
      )}
    </div>
  );
};

export default ShimmerImage;
