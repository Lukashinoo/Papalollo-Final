import { Phone, Mail, MapPin } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

const ContactSection = () => (
  <section id="contact" className="py-20 md:py-28 bg-background relative overflow-hidden">
    <div className="container relative z-10">
      <AnimatedSection>
        <div className="text-center mb-14">
          <p className="text-primary font-body text-sm uppercase tracking-[0.2em] mb-3">Kontakt</p>
          <h2 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-4 italic tracking-tight">Alles auf einen Blick</h2>
        </div>
      </AnimatedSection>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 max-w-3xl mx-auto">
        <AnimatedSection delay={0}>
          <a href="https://www.google.com/maps/search/?api=1&query=Kirchgasse+14,+65396+Walluf" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center text-center p-6 rounded-lg bg-card shadow-sm border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group h-full">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <p className="font-body font-semibold text-foreground mb-1">Besuchen Sie uns</p>
            <p className="text-sm text-muted-foreground font-body">Kirchgasse 14<br />65396 Walluf</p>
          </a>
        </AnimatedSection>

        <AnimatedSection delay={150}>
          <a href="tel:+4961239340889" className="flex flex-col items-center text-center p-6 rounded-lg bg-card shadow-sm border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group h-full">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <Phone className="w-6 h-6 text-primary" />
            </div>
            <p className="font-body font-semibold text-foreground mb-1">Rufen Sie an</p>
            <p className="text-sm text-muted-foreground font-body">06123 9340889</p>
          </a>
        </AnimatedSection>

        <AnimatedSection delay={300}>
          <a href="mailto:papalollozumtreppchen@gmail.com" className="flex flex-col items-center text-center p-6 rounded-lg bg-card shadow-sm border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group h-full">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <p className="font-body font-semibold text-foreground mb-1">Schreiben Sie uns</p>
            <p className="text-sm text-muted-foreground font-body break-all">papalollozumtreppchen<wbr />@gmail.com</p>
          </a>
        </AnimatedSection>
      </div>
    </div>
  </section>
);

export default ContactSection;
