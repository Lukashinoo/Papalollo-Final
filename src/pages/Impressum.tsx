import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import Shimmer from "@/components/Shimmer";

const Impressum = () => {
  return (
    <div className="min-h-screen bg-cream py-20 px-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl">
        <AnimatedSection>
          <div className="mb-8">
            <Link to="/">
              <Button variant="outline" className="gap-2 border-primary/20 text-primary hover:bg-primary/5 hover:text-primary rounded-full px-6">
                <ArrowLeft className="w-4 h-4" />
                Zurück zur Startseite
              </Button>
            </Link>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <div className="bg-background rounded-3xl p-8 md:p-12 shadow-xl border border-border">
            <Shimmer duration={800} className="w-fit rounded-md mb-3">
              <p className="text-primary font-body text-sm uppercase tracking-[0.2em]">Rechtliches</p>
            </Shimmer>
            <Shimmer duration={1000} className="w-fit rounded-md mb-10">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground italic tracking-tight">Impressum</h1>
            </Shimmer>

            <div className="space-y-8">
              <AnimatedSection delay={200}>
                <Shimmer duration={1200} className="rounded-md">
                  <div>
                    <h2 className="font-body text-sm uppercase tracking-wider text-muted-foreground mb-2">Betreiber</h2>
                    <p className="font-body text-lg text-foreground font-medium">Usman Butt</p>
                  </div>
                </Shimmer>
              </AnimatedSection>

              <AnimatedSection delay={300}>
                <Shimmer duration={1300} className="rounded-md">
                  <div>
                    <h2 className="font-body text-sm uppercase tracking-wider text-muted-foreground mb-2">Adresse</h2>
                    <p className="font-body text-lg text-foreground">
                      Kirchgasse 14<br />
                      65396 Walluf<br />
                      Deutschland
                    </p>
                  </div>
                </Shimmer>
              </AnimatedSection>

              <AnimatedSection delay={400}>
                <Shimmer duration={1400} className="rounded-md">
                  <div>
                    <h2 className="font-body text-sm uppercase tracking-wider text-muted-foreground mb-2">Kontakt</h2>
                    <p className="font-body text-lg text-foreground">
                      Telefon: <a href="tel:+4961239340889" className="text-primary hover:underline">+49 6123 9340889</a><br />
                      E-Mail: <a href="mailto:papalollozumtreppchen@gmail.com" className="text-primary hover:underline">papalollozumtreppchen@gmail.com</a>
                    </p>
                  </div>
                </Shimmer>
              </AnimatedSection>

              <AnimatedSection delay={500}>
                <Shimmer duration={1500} className="rounded-md">
                  <div>
                    <h2 className="font-body text-sm uppercase tracking-wider text-muted-foreground mb-2">UmsatzSteuernummer</h2>
                    <p className="font-body text-lg text-foreground">DE362514035</p>
                  </div>
                </Shimmer>
              </AnimatedSection>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Impressum;
