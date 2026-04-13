import { useState, useEffect } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import ShimmerImage from "@/components/ShimmerImage";
import CountUp from "@/components/CountUp";
import Shimmer from "@/components/Shimmer";
import interiorImg from "@/assets/restaurant-interior.jpg";
import exteriorImg from "@/assets/restaurant-exterior.jpg";
import exterior2Img from "@/assets/exterior2.jpg";
import papaLolloImg from "@/assets/Papa-Lollo-IMG-4753-jpeg.jpg";

const images = [papaLolloImg, interiorImg, exteriorImg, exterior2Img];

const AboutSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="about" className="py-20 md:py-28 bg-background relative overflow-hidden">
      <div className="container relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <AnimatedSection delay={0}>
            <div className="rounded-2xl overflow-hidden shadow-2xl relative h-[350px] md:h-[450px] border border-border/50">
              {images.map((img, i) => (
                <div
                  key={i}
                  className="absolute inset-0 transition-all duration-1000 ease-in-out"
                  style={{
                    opacity: i === current ? 1 : 0,
                    transform: i === current ? "scale(1)" : "scale(1.05)",
                  }}
                >
                  <ShimmerImage src={img} alt={`Papa Lollo ${i + 1}`} className="h-full" />
                </div>
              ))}
              {/* Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      i === current ? "bg-primary-foreground w-4" : "bg-primary-foreground/40"
                    }`}
                  />
                ))}
              </div>
            </div>
          </AnimatedSection>
          <div>
            <AnimatedSection delay={100}>
              <p className="text-primary font-body text-sm uppercase tracking-[0.2em] mb-3">Über uns</p>
            </AnimatedSection>
            <AnimatedSection delay={200}>
              <h2 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-6 italic tracking-tight">
                Willkommen bei Papa Lollo
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={300}>
              <p className="text-muted-foreground font-body leading-relaxed mb-4">
                Unser Vater wanderte 1975 nach Deutschland ein und zaubert seitdem als Koch in der italienischen Küche. Im März 2023 ließen wir uns von seiner Leidenschaft inspirieren und eröffneten unser eigenes Restaurant.
              </p>
            </AnimatedSection>
            <AnimatedSection delay={400}>
              <p className="text-muted-foreground font-body leading-relaxed mb-8">
                Wir führen den Laden mit viel Herz und Liebe. Jede Pizza und jede Pasta wird frisch zubereitet und mit Liebe serviert. Unser Restaurant trägt den liebevollen Spitznamen unseres Papas: „Lollo".
              </p>
            </AnimatedSection>
            <AnimatedSection delay={500}>
              <div className="grid grid-cols-3 gap-4 md:gap-8">
                <Shimmer duration={1200} className="rounded-xl">
                  <div className="text-center p-4 rounded-xl bg-cream/50 border border-border/50 h-full hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                    <p className="font-display text-3xl md:text-4xl font-bold text-primary mb-1">
                      <CountUp to={50} suffix="+" />
                    </p>
                    <p className="text-[10px] md:text-xs text-muted-foreground font-body uppercase tracking-wider">Jahre Erfahrung</p>
                  </div>
                </Shimmer>
                <Shimmer duration={1400} className="rounded-xl">
                  <div className="text-center p-4 rounded-xl bg-cream/50 border border-border/50 h-full hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                    <p className="font-display text-3xl md:text-4xl font-bold text-primary mb-1">
                      <CountUp to={4.7} decimals={1} />
                    </p>
                    <p className="text-[10px] md:text-xs text-muted-foreground font-body uppercase tracking-wider">Google Bewertung</p>
                  </div>
                </Shimmer>
                <Shimmer duration={1600} className="rounded-xl">
                  <div className="text-center p-4 rounded-xl bg-cream/50 border border-border/50 h-full hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                    <p className="font-display text-3xl md:text-4xl font-bold text-primary mb-1">
                      <CountUp to={10} suffix="%" />
                    </p>
                    <p className="text-[10px] md:text-xs text-muted-foreground font-body uppercase tracking-wider">Rabatt bei Abholung</p>
                  </div>
                </Shimmer>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
