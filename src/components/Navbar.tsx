import { useState, useEffect } from "react";
import { Menu, X, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import ShimmerImage from "@/components/ShimmerImage";
import logoImg from "@/assets/logo.png";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Start", href: "#hero" },
  { label: "Über uns", href: "#about" },
  { label: "Speisekarte", href: "#menu" },
  { label: "Bewertungen", href: "#reviews" },
  { label: "Öffnungszeiten", href: "#hours" },
  { label: "Kontakt", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isReservationVisible, setIsReservationVisible] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsReservationVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.2 }
    );

    const resSection = document.getElementById("reservation");
    if (resSection) {
      observer.observe(resSection);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (resSection) observer.unobserve(resSection);
    };
  }, []);

  const scrollTo = (href: string) => {
    setOpen(false);
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 150);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    show: { 
      opacity: 1, 
      height: "auto", 
      transition: { duration: 0.4, ease: "easeInOut", staggerChildren: 0.05, delayChildren: 0.1 } 
    },
    exit: { 
      opacity: 0, 
      height: 0, 
      transition: { duration: 0.3, ease: "easeInOut" } 
    }
  };

  const mobileItemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-foreground/90 backdrop-blur-md">
      <div className="container flex items-center justify-between h-16">
        <motion.a 
          href="/" 
          onClick={(e) => { e.preventDefault(); window.location.reload(); }} 
          className="flex items-center gap-2 group"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="h-10 w-10 rounded-full border-2 border-primary/20 shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:border-primary/50 group-hover:shadow-primary/20 overflow-hidden">
            <ShimmerImage 
              src={logoImg} 
              alt="Papa Lollo Logo" 
              className="h-full w-full"
            />
          </div>
          <span className="hidden font-display text-2xl font-bold text-primary-foreground tracking-wide">
            Papa Lollo
          </span>
        </motion.a>

        <motion.div 
          className="hidden md:flex items-center gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? "show" : "hidden"}
        >
          <div className={`flex items-center gap-6 transition-transform duration-500 ease-out ${isScrolled ? "translate-x-0" : "translate-x-8"}`}>
            {navLinks.map((l) => (
              <motion.button 
                key={l.href} 
                variants={itemVariants}
                onClick={() => scrollTo(l.href)} 
                className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors font-body"
              >
                {l.label}
              </motion.button>
            ))}
          </div>
          <motion.div 
            variants={itemVariants}
            className={`flex items-center gap-4 transition-all duration-500 ease-out overflow-hidden ${isScrolled ? "opacity-100 max-w-[400px] translate-x-0" : "opacity-0 max-w-0 translate-x-12 pointer-events-none"}`}
          >
            <a
              href="https://papa-lollo.order.app.hd.digital/menus"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-orange-500 text-white font-body text-sm font-semibold hover:bg-orange-600 transition-all hover:scale-105 shadow-md shadow-orange-500/20 whitespace-nowrap"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Jetzt bestellen
            </a>
            <AnimatePresence>
              {!isReservationVisible && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, width: 0 }}
                  animate={{ opacity: 1, scale: 1, width: "auto" }}
                  exit={{ 
                    opacity: [1, 0.5, 1, 0.5, 0], 
                    scale: [1, 1.05, 1, 0.9, 0],
                    filter: ["brightness(1)", "brightness(1.5)", "brightness(1)", "brightness(1.5)", "brightness(1)"],
                    width: 0,
                    transition: { duration: 0.6 }
                  }}
                  className="overflow-hidden"
                >
                  <Button size="sm" variant="outline" onClick={() => scrollTo("#reservation")} className="rounded-full border-primary text-primary-foreground bg-primary hover:bg-primary/90 whitespace-nowrap">
                    Reservieren
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        <button className="md:hidden text-primary-foreground p-2" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div 
            variants={mobileMenuVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="md:hidden overflow-hidden bg-foreground/95 backdrop-blur-md border-t border-primary-foreground/10"
          >
            <div className="px-4 py-6 space-y-2">
              {navLinks.map((l) => (
                <motion.button
                  key={l.href}
                  variants={mobileItemVariants}
                  onClick={() => scrollTo(l.href)}
                  className="block w-full text-left px-4 py-3 rounded-xl text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 font-body text-base transition-all duration-300"
                >
                  {l.label}
                </motion.button>
              ))}
              
              <AnimatePresence>
                {isScrolled && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: "auto", marginTop: 24 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-4 pt-4 pb-2 space-y-4 border-t border-primary-foreground/10 overflow-hidden"
                  >
                    <a
                      href="https://papa-lollo.order.app.hd.digital/menus"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full px-4 py-3.5 rounded-xl bg-orange-500 text-white font-body text-base font-semibold hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Jetzt bestellen
                    </a>
                    <Button size="lg" variant="outline" className="w-full rounded-xl border-primary text-primary-foreground bg-primary hover:bg-primary/90 text-base py-6" onClick={() => scrollTo("#reservation")}>
                      Tisch reservieren
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
