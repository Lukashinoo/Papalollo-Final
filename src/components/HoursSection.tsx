import { useState, useRef, useEffect } from "react";
import { MapPin, Truck, ShoppingBag, CreditCard, Smartphone, Banknote, Clock, ExternalLink, Copy, Check, ChevronDown } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import Shimmer from "@/components/Shimmer";

const hours = [
  { day: "Montag", time: "16:45 – 21:45", closed: false, jsDay: 1 },
  { day: "Dienstag", time: "16:45 – 21:45", closed: false, jsDay: 2 },
  { day: "Mittwoch", time: "16:45 – 21:45", closed: false, jsDay: 3 },
  { day: "Donnerstag", time: "Ruhetag", closed: true, jsDay: 4 },
  { day: "Freitag", time: "16:45 – 21:45", closed: false, jsDay: 5 },
  { day: "Samstag", time: "16:45 – 21:45", closed: false, jsDay: 6 },
  { day: "Sonntag", time: "16:45 – 21:45", closed: false, jsDay: 0 },
];

const paymentMethods = [
  { name: "Barzahlung", icon: Banknote },
  { name: "EC-Karte", icon: CreditCard },
  { name: "VISA", icon: CreditCard },
  { name: "MasterCard", icon: CreditCard },
  { name: "AMEX", icon: CreditCard },
  { name: "Apple Pay", icon: Smartphone },
  { name: "Kontaktlos", icon: Smartphone },
  { name: "Maestro", icon: CreditCard },
  { name: "Debitkarte", icon: CreditCard },
];

const openTime = 16 * 60 + 45; // 16:45
const closeTime = 21 * 60 + 45; // 21:45

const HoursSection = () => {
  const [copied, setCopied] = useState(false);
  const [isStatusExpanded, setIsStatusExpanded] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [lastUpdateSeconds, setLastUpdateSeconds] = useState(0);
  
  const statusContainerRef = useRef<HTMLDivElement>(null);
  const collapseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      setLastUpdateSeconds(0);
    }, 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const secondsTimer = setInterval(() => {
      setLastUpdateSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(secondsTimer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (statusContainerRef.current && !statusContainerRef.current.contains(e.target as Node)) {
        if (isStatusExpanded) {
          if (collapseTimeoutRef.current) clearTimeout(collapseTimeoutRef.current);
          setIsStatusExpanded(false);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isStatusExpanded]);

  const handleMouseEnter = () => {
    // Only expand on hover for non-touch devices
    if (window.matchMedia("(hover: hover)").matches) {
      if (collapseTimeoutRef.current) clearTimeout(collapseTimeoutRef.current);
      setIsStatusExpanded(true);
    }
  };

  const handleMouseLeave = () => {
    if (window.matchMedia("(hover: hover)").matches && isStatusExpanded) {
      collapseTimeoutRef.current = setTimeout(() => {
        setIsStatusExpanded(false);
      }, 1500);
    }
  };

  const handleStatusClick = () => {
    if (collapseTimeoutRef.current) clearTimeout(collapseTimeoutRef.current);
    setIsStatusExpanded(!isStatusExpanded);
  };
  
  const today = currentTime.getDay();
  const currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();
  const currentTimeInMinutes = currentHour * 60 + currentMinute;
  
  const isThursday = today === 4;
  const isOpen = !isThursday && currentTimeInMinutes >= openTime && currentTimeInMinutes < closeTime;
  const isClosingSoon = isOpen && (closeTime - currentTimeInMinutes <= 60);
  const isOpeningSoon = !isOpen && !isThursday && (openTime - currentTimeInMinutes <= 60 && openTime - currentTimeInMinutes > 0);

  const getNextOpeningTime = () => {
    if (isOpen) return null;
    let nextDay = today;
    if (currentTimeInMinutes >= closeTime) {
      nextDay = (today + 1) % 7;
    }
    if (nextDay === 4) {
      nextDay = 5;
    }
    const dayName = hours.find(h => h.jsDay === nextDay)?.day;
    return `${dayName}, 16:45 Uhr`;
  };

  const getTimeDifference = (targetTimeInMinutes: number, nextDayOffset: number = 0) => {
    const diff = targetTimeInMinutes - currentTimeInMinutes + (nextDayOffset * 24 * 60);
    if (diff < 0) return "";
    const h = Math.floor(diff / 60);
    const m = diff % 60;
    if (h > 0 && m > 0) return `in ${h} Std. und ${m} Min.`;
    if (h > 0) return `in ${h} Std.`;
    return `in ${m} Min.`;
  };

  const getNextOpeningTimeDiff = () => {
    if (isOpen) return "";
    let nextDayOffset = 0;
    const targetTime = openTime;
    
    if (currentTimeInMinutes >= closeTime) {
      nextDayOffset = 1;
    }
    
    // If today is Wednesday and it's past close time, next open is Friday (+2 days)
    if (today === 3 && currentTimeInMinutes >= closeTime) {
      nextDayOffset = 2;
    }
    // If today is Thursday, next open is Friday (+1 day from Thursday)
    if (today === 4) {
      nextDayOffset = 1;
    }

    return getTimeDifference(targetTime, nextDayOffset);
  };

  const statusColor = isOpen 
    ? (isClosingSoon ? "bg-yellow-100 text-yellow-700 border-yellow-200" : "bg-green-100 text-green-700 border-green-200")
    : (isOpeningSoon ? "bg-yellow-100 text-yellow-700 border-yellow-200" : "bg-red-100 text-red-700 border-red-200");
    
  const dotColor = isOpen 
    ? (isClosingSoon ? "bg-yellow-500" : "bg-green-500")
    : (isOpeningSoon ? "bg-yellow-500" : "bg-red-500");

  const statusText = isOpen 
    ? (isClosingSoon ? "Schließt bald" : "Jetzt geöffnet")
    : (isOpeningSoon ? "Öffnet bald" : "Derzeit geschlossen");

  const copyAddress = () => {
    navigator.clipboard.writeText("Kirchgasse 14, 65396 Walluf, Deutschland");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="hours" className="py-20 md:py-28 bg-cream relative overflow-hidden">
      <div className="container relative z-10">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <AnimatedSection>
              <Shimmer duration={800} className="w-fit rounded-md mb-3">
                <p className="text-primary font-body text-sm uppercase tracking-[0.2em]">Öffnungszeiten</p>
              </Shimmer>
              <Shimmer duration={1000} className="w-fit rounded-md mb-6">
                <h2 className="font-display text-5xl md:text-6xl font-bold text-foreground italic tracking-tight">Wann Sie uns besuchen können</h2>
              </Shimmer>
              
              {/* Status Indicator */}
              <Shimmer duration={1200} className="rounded-2xl w-fit">
                <motion.div 
                  layout
                  ref={statusContainerRef}
                  className={`relative mb-8 transition-all duration-500 ease-out ${isStatusExpanded ? "z-20" : "z-10"}`}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onClick={handleStatusClick}
                >
                  <motion.div layout className={`inline-flex flex-col gap-1 px-5 py-3 rounded-2xl transition-colors duration-500 cursor-pointer shadow-sm hover:shadow-lg ${
                    isStatusExpanded 
                      ? (isOpen ? (isClosingSoon ? "bg-yellow-100 border-yellow-300" : "bg-green-100 border-green-300") : (isOpeningSoon ? "bg-yellow-100 border-yellow-300" : "bg-red-100 border-red-300"))
                      : statusColor
                  } border`}>
                    <motion.div layout className="flex items-center gap-3">
                      <div className="relative flex items-center justify-center">
                        <span className={`w-3 h-3 rounded-full ${dotColor}`} />
                        <span className={`absolute inset-0 rounded-full animate-ping opacity-50 ${dotColor}`} />
                      </div>
                      <span className={`text-base md:text-lg font-display font-bold tracking-wide ${
                        isOpen ? (isClosingSoon ? "text-yellow-800" : "text-green-800") : (isOpeningSoon ? "text-yellow-800" : "text-red-800")
                      }`}>
                        {statusText}
                      </span>
                      <ChevronDown className={`w-5 h-5 transition-transform duration-500 ${isStatusExpanded ? "rotate-180" : "rotate-0"} ${
                        isOpen ? (isClosingSoon ? "text-yellow-800" : "text-green-800") : (isOpeningSoon ? "text-yellow-800" : "text-red-800")
                      }`} />
                    </motion.div>
                    
                    {/* Expanded Info */}
                    <AnimatePresence>
                      {isStatusExpanded && (
                        <motion.div
                          layout
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-2 pt-3 mt-3 border-t border-black/10">
                            <p className={`text-sm font-body ${isOpen ? (isClosingSoon ? "text-yellow-900/80" : "text-green-900/80") : (isOpeningSoon ? "text-yellow-900/80" : "text-red-900/80")}`}>
                              Es ist {currentHour.toString().padStart(2, '0')}:{currentMinute.toString().padStart(2, '0')} Uhr.
                            </p>
                            <p className={`text-sm font-body font-medium ${isOpen ? (isClosingSoon ? "text-yellow-900" : "text-green-900") : (isOpeningSoon ? "text-yellow-900" : "text-red-900")}`}>
                              {isOpen ? (
                                <>Das Restaurant schließt um 21:45 Uhr ({getTimeDifference(closeTime)}).</>
                              ) : (
                                <>Das Restaurant öffnet {getNextOpeningTime()} ({getNextOpeningTimeDiff()}).</>
                              )}
                            </p>
                            <div className="flex items-center gap-1.5 mt-2 opacity-60">
                              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                              <span className="text-[10px] font-body uppercase tracking-wider">Last Update {lastUpdateSeconds} seconds ago</span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              </Shimmer>
            </AnimatedSection>

            <div className="space-y-2">
              {hours.map((h, i) => {
                const isToday = h.jsDay === today;
                return (
                  <AnimatedSection key={h.day} delay={i * 80}>
                    <Shimmer duration={1000 + i * 100} className="rounded-lg">
                      <div className={`flex justify-between items-center py-3 px-3 rounded-lg border transition-all duration-300 cursor-pointer hover:scale-[1.02] hover:shadow-md hover:border-primary/20 ${
                        isToday
                          ? "bg-primary/5 border-primary/20 shadow-sm scale-[1.01]"
                          : "border-transparent hover:bg-background/40"
                      } ${h.closed && !isToday ? "opacity-50" : ""}`}>
                        <div className="flex items-center gap-2">
                          <Clock className={`w-4 h-4 ${isToday ? "text-primary" : "text-primary/60"}`} />
                          <span className={`font-body font-medium text-sm md:text-base ${isToday ? "text-primary font-semibold" : "text-foreground"}`}>
                            {h.day}
                            {isToday && <span className="ml-2 text-[10px] bg-primary text-primary-foreground px-2 py-0.5 rounded-full uppercase tracking-wider">Heute</span>}
                          </span>
                        </div>
                        <span className={`font-body text-sm ${h.closed ? "text-destructive font-medium" : isToday ? "text-primary font-semibold" : "text-muted-foreground"}`}>{h.time}</span>
                      </div>
                    </Shimmer>
                  </AnimatedSection>
                );
              })}
            </div>

            <AnimatedSection delay={600}>
              <Shimmer duration={1800} className="rounded-lg mt-8">
                <div className="bg-background/50 backdrop-blur-sm rounded-lg p-5 border border-border shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-md hover:border-primary/20 cursor-pointer">
                  <div className="flex items-center gap-2 mb-3">
                    <Truck className="w-5 h-5 text-primary" />
                    <p className="font-body font-semibold text-foreground">Liefergebiete</p>
                  </div>
                  <div className="space-y-2 text-sm font-body text-muted-foreground">
                    <p><span className="font-medium text-foreground">Ab 10€</span> (Liefergebühr 2,00€): Walluf (Nieder & Ober)</p>
                    <p><span className="font-medium text-foreground">Ab 20€</span> (Liefergebühr 2,50€): Eltville, Martinsthal, Erbach, Schierstein, Frauenstein & Kiedrich</p>
                    <p><span className="font-medium text-foreground">Ab 60€</span>: Kostenlose Lieferung</p>
                  </div>
                </div>
              </Shimmer>
            </AnimatedSection>
          </div>

          <div className="space-y-8">
            <AnimatedSection delay={200}>
              <Shimmer duration={1400} className="rounded-xl">
                <div>
                  <p className="text-primary font-body text-sm uppercase tracking-[0.2em] mb-3">Standort</p>
                  <div className="flex items-center justify-between gap-3 mb-4 bg-background/40 p-4 rounded-xl border border-border">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <div>
                        <p className="font-body font-medium text-foreground">Kirchgasse 14</p>
                        <p className="font-body text-muted-foreground text-sm">65396 Walluf, Deutschland</p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copyAddress}
                      className={`shrink-0 gap-2 font-body text-xs h-9 px-4 border-primary/20 transition-all duration-300 ${
                        copied ? "bg-green-500 text-white border-green-500 hover:bg-green-600 hover:text-white" : "hover:bg-primary/5 hover:text-primary"
                      }`}
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          Kopiert
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          Kopieren
                        </>
                      )}
                    </Button>
                  </div>
                  <div className="rounded-xl overflow-hidden shadow-md h-48 border border-border">
                    <iframe
                      title="Papa Lollo Standort"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2558.5!2d8.168!3d50.041!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bdc1f5a3c7e8d1%3A0x2a5b7c9d8e4f6a1b!2sKirchgasse%2014%2C%2065396%20Walluf!5e0!3m2!1sde!2sde!4v1700000000000"
                      className="w-full h-full border-0"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      allowFullScreen
                    />
                  </div>
                  <div className="flex gap-2 mt-3">
                    <a
                      href="https://maps.apple.com/place?address=Kirchgasse+14%2C+65396+Walluf%2C+Deutschland&coordinate=50.034568%2C8.160830&name=Kirchgasse+14"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 bg-background rounded-lg px-3 py-2.5 text-xs font-body font-medium text-foreground shadow-sm border border-border hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-primary" />
                      Apple Maps
                    </a>
                    <a
                      href="https://www.google.com/maps/place/Papa+Lollo+(zum+Treppchen)/@50.034568,8.1582721,17z/data=!3m1!4b1!4m6!3m5!1s0x47bd9549cddbb073:0x6a8b4978db036c73!8m2!3d50.0345646!4d8.160847!16s%2Fg%2F11k9zd88k1?entry=ttu&g_ep=EgoyMDI2MDQwOC4wIKXMDSoASAFQAw%3D%3D"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 bg-background rounded-lg px-3 py-2.5 text-xs font-body font-medium text-foreground shadow-sm border border-border hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-primary" />
                      Google Maps
                    </a>
                  </div>
                </div>
              </Shimmer>
            </AnimatedSection>

            <AnimatedSection delay={400}>
              <Shimmer duration={1600} className="rounded-xl">
                <div>
                  <p className="text-primary font-body text-sm uppercase tracking-[0.2em] mb-3">Services</p>
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2 bg-background/50 backdrop-blur-sm rounded-lg px-4 py-3 shadow-sm border border-border hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                      <Truck className="w-5 h-5 text-primary" />
                      <span className="font-body text-sm text-foreground">Lieferservice</span>
                    </div>
                    <div className="flex items-center gap-2 bg-background/50 backdrop-blur-sm rounded-lg px-4 py-3 shadow-sm border border-border hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                      <ShoppingBag className="w-5 h-5 text-primary" />
                      <span className="font-body text-sm text-foreground">Zum Mitnehmen</span>
                    </div>
                  </div>
                </div>
              </Shimmer>
            </AnimatedSection>

            <AnimatedSection delay={500}>
              <Shimmer duration={1800} className="rounded-xl">
                <div>
                  <p className="text-primary font-body text-sm uppercase tracking-[0.2em] mb-3">Zahlungsmöglichkeiten</p>
                  <div className="flex flex-wrap gap-2">
                    {paymentMethods.map((m) => {
                      const Icon = m.icon;
                      return (
                        <span key={m.name} className="inline-flex items-center gap-1.5 bg-background/50 backdrop-blur-sm rounded-md px-3 py-1.5 text-[10px] font-body text-muted-foreground shadow-sm border border-border hover:border-primary/30 hover:text-foreground transition-colors">
                          <Icon className="w-3 h-3" />
                          {m.name}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </Shimmer>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HoursSection;
