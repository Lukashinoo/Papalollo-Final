import { useState, useRef } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import Shimmer from "@/components/Shimmer";
import CountUp from "@/components/CountUp";
import { ChevronDown, ChevronUp } from "lucide-react";

const reviews = [
  { name: "Lukas Wilhelm", source: "Google", rating: 5, text: "Super lecker geschmeckt. Service war sehr gut und das Essen unvergesslich. Wir kommen auf jeden Fall wieder!" },
  { name: "Ingo Pannhoff", source: "Google", rating: 5, text: "Wir hatten Pizza, Schnitzel und Lasagne. Alles war sehr lecker. Dazu ein aufmerksamer und netter Service. Wir kommen wieder!" },
  { name: "DP ABC", source: "Google", rating: 4, text: "Pizza zum Mitnehmen vor Ort geordert. Wartezeit 15 min. Super leckere Pizza, knuspriger Teig, frisch zubereitet. Am Belag wird nicht gespart." },
  { name: "Binetti", source: "Google", rating: 5, text: "Hier gibt es die besten Pizzen der Umgebung. Auch die Pastagerichte sind klasse." },
  { name: "Ralph Wiedekind", source: "Google", rating: 5, text: "Eine der beste Pizzen die ich bisher gegessen habe. Sehr netter Service. Absolut empfehlenswert." },
  { name: "Joel Mendes Gomes", source: "Google", rating: 5, text: "Sehr lecker richtig gute chicken Fingers Pasta cabonara sehr lecker und cremig Service sehr gut und eine sehr gemütliche Einrichtung große Auswahl an Gerichte." },
  { name: "Ali Bt", source: "Google", rating: 5, text: "Das Essen ist wirklich top und ich bin erst mal sehr lecker gibt es in Walluf und ich bin stolz auf den Koch und Applaus." },
  { name: "Christine", source: "Google", rating: 4, text: "Die Bestellung kam viel früher als bei Lieferando angegeben. Auf der Karte finden sich Gerichte aus vielen verschiedenen Bereichen. Wir waren allesamt zufrieden. Preislich war es völlig angemessen." },
  { name: "Fynn55 Gabriel", source: "Google", rating: 4, text: "Das Essen ist super, und gerade die besonderen Pizzakombinahtionen sind der Hammer." },
  { name: "Gentrit Bekaj", source: "Google", rating: 5, text: "Ein kulinarisches Highlight." },
  { name: "Britta Jung", source: "Google", rating: 5, text: "Wir haben online bestellt und es gab leider eine kleine Verwechslung bei der Lieferung. Das Restaurant hat aber prompt gehandelt und alles zurecht gerückt." },
  { name: "Filip Paff", source: "Google", rating: 5, text: "Sehr nette und verständliche Mitarbeiter. Essen ist Preis Leistung mäßig kaum schlagbar. Im Lokal selbst ein sehr gutes Klima. Alles in einem top Laden 👍" },
  { name: "Nino Tauber", source: "Google", rating: 5, text: "Hier wird wirklich hochwertiges, frisches, leckeres Essen serviert. Zugegeben anfangs war ich etwas skeptisch, da die Karte doch etwas exotischer ist als man es erwarten würde." },
  { name: "Shazeb J", source: "Google", rating: 5, text: "Nach einem Spaziergang in Walluf bin ich auf das Restaurant gestoßen. Das Essen war köstlich und sehr vielfältig." },
  { name: "Amtul BT", source: "Google", rating: 5, text: "Ich bin wirklich von dem Essen sehr begeistert vor allem die Penne San Marino war super lecker!" },
  { name: "Sarah Haag", source: "Google", rating: 5, text: "Freundlich/sympathisch bei Bestellungen und Lieferung. Alles kam pünktlich und heiß daheim an. Cannelloni, Salat - einfach lecker!" },
  { name: "Mr C", source: "Google", rating: 5, text: "In diesem Restaurant habe ich die leckerste Pizza meines Lebens gegessen! Der knusprige Teig, die großzügigen Beläge und der perfekte Schmelz des Käses haben mich überzeugt." },
];

const Star = ({ filled }: { filled: boolean }) => (
  <svg className={`w-4 h-4 ${filled ? "text-warm" : "text-warm/30"}`} fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const ReviewsSection = () => {
  const [expanded, setExpanded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const visible = expanded ? reviews : reviews.slice(0, 3);

  const toggleExpanded = () => {
    if (expanded && sectionRef.current) {
      // When collapsing, scroll back to the top of the section to prevent layout shift jumping
      const y = sectionRef.current.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    setExpanded(!expanded);
  };

  return (
    <section id="reviews" ref={sectionRef} className="py-20 md:py-28 bg-background relative overflow-hidden">
      <div className="container relative z-10">
        <AnimatedSection>
          <div className="text-center mb-14">
            <p className="text-primary font-body text-sm uppercase tracking-[0.2em] mb-3">Bewertungen</p>
            <h2 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-4 italic tracking-tight">Was unsere Gäste sagen</h2>
            <div className="flex items-center justify-center gap-3">
              <span className="font-display text-4xl font-bold text-primary">
                <CountUp to={4.7} decimals={1} />
              </span>
              <span className="text-muted-foreground font-body">/5 aus 87 Bewertungen</span>
            </div>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {visible.map((r, i) => (
            <AnimatedSection key={r.name} delay={i < 3 ? i * 150 : 0}>
              <Shimmer duration={1000 + i * 100}>
                <div className="bg-card rounded-2xl p-6 shadow-sm border border-border/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} filled={j < r.rating} />
                    ))}
                  </div>
                  <p className="text-foreground font-body text-sm leading-relaxed mb-6 flex-grow italic">"{r.text}"</p>
                  <div className="flex items-center justify-between pt-4 border-t border-border/30">
                    <p className="font-body font-semibold text-sm text-foreground">{r.name}</p>
                    <span className="text-[10px] text-muted-foreground font-body uppercase tracking-wider bg-muted/50 px-2 py-1 rounded-md">{r.source}</span>
                  </div>
                </div>
              </Shimmer>
            </AnimatedSection>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={toggleExpanded}
            className="inline-flex items-center gap-2 text-primary font-body font-semibold text-sm hover:text-primary/80 transition-all group"
          >
            {expanded ? "Weniger anzeigen" : "Alle Bewertungen ansehen"}
            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all">
              {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
