import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import CountUp from "@/components/CountUp";
import ShimmerImage from "@/components/ShimmerImage";
import restaurantExterior from "@/assets/restaurant-exterior.jpg";
import logoImg from "@/assets/logo.png";
import { motion } from "framer-motion";

const HeroSection = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 300),
      setTimeout(() => setStep(2), 600),
      setTimeout(() => setStep(3), 900),
      setTimeout(() => setStep(4), 1200),
      setTimeout(() => setStep(5), 1500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const show = (s: number) =>
    step >= s ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6";

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <ShimmerImage src={restaurantExterior} alt="Papa Lollo zum Treppchen Außenansicht" className="w-full h-full" />
      </div>
      <div className="absolute inset-0 bg-foreground/60 backdrop-blur-[2px]" />

      <div className="relative z-10 text-center px-4 max-w-3xl flex flex-col items-center">
        <div className={`transition-all duration-700 ${show(1)}`}>
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="rounded-full p-1 bg-primary/10 backdrop-blur-sm mb-6 shadow-2xl shadow-primary/20"
          >
            <ShimmerImage 
              src={logoImg} 
              alt="Papa Lollo Logo" 
              className="h-24 w-24 md:h-32 md:w-32 rounded-full border-4 border-primary/40 shadow-inner"
            />
          </motion.div>
        </div>
        <p className={`text-primary font-body text-sm uppercase tracking-[0.3em] mb-4 transition-all duration-700 ${show(1)}`}>
          Seit 2023 in Walluf
        </p>
        <h1 className={`font-display text-7xl md:text-9xl font-bold text-primary-foreground mb-6 leading-tight transition-all duration-700 italic tracking-tighter ${show(2)}`}>
          Papa Lollo
        </h1>
        <p className={`text-primary-foreground font-body text-lg md:text-xl mb-2 transition-all duration-700 ${show(3)}`}>
          Über 50 Jahre Kocherfahrung
        </p>
        <p className={`text-primary-foreground/80 font-body text-base md:text-lg mb-10 max-w-xl mx-auto transition-all duration-700 ${show(3)}`}>
          Geschmack, den du sofort schmeckst! Authentische, hausgemachte Gerichte mit frischen Zutaten und viel Liebe.
        </p>
        <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 ${show(4)}`}>
          <a
            href="https://papa-lollo.order.app.hd.digital/menus"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-orange-500 text-white hover:bg-orange-600 text-base font-body font-semibold px-8 py-3 rounded-full hover:scale-105 transition-all shadow-lg shadow-orange-500/20"
          >
            <ExternalLink className="w-4 h-4" />
            Jetzt bestellen
          </a>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full border-primary text-primary-foreground bg-primary hover:bg-primary/90 text-base px-8 hover:scale-105 transition-all"
            onClick={() => scrollTo("#reservation")}
          >
            Tisch reservieren
          </Button>
        </div>

        <div className={`mt-12 flex items-center justify-center gap-3 text-primary-foreground transition-all duration-700 ${show(5)}`}>
          <span className="text-warm font-display text-3xl font-bold">
            <CountUp to={4.7} decimals={1} />
          </span>
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className={`w-4 h-4 ${i < 4 ? "text-warm" : "text-warm/40"}`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-sm font-body opacity-80">(87 Bewertungen)</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
