import { useState, useEffect } from "react";
import { format, addDays, isThursday, setHours, setMinutes, isBefore, startOfToday } from "date-fns";
import { Calendar as CalendarIcon, Clock, Users, MessageSquare, CheckCircle2, AlertCircle, Check, FileText, Cpu, Lock, ShieldCheck, Wifi, Server, Link, Package, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import AnimatedSection from "@/components/AnimatedSection";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const inputClasses = "bg-primary-foreground/5 border-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/30 focus:border-primary/50 focus:ring-primary/20 transition-all duration-300";

const timeSlots = [];
for (let hour = 16; hour <= 20; hour++) {
  for (let minute = 0; minute < 60; minute += 15) {
    if (hour === 16 && minute < 45) continue;
    if (hour === 20 && minute > 45) continue;
    timeSlots.push(`${hour}:${minute === 0 ? "00" : minute}`);
  }
}

const ReservationSection = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submissionStep, setSubmissionStep] = useState(0);
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [guests, setGuests] = useState("");
  const [message, setMessage] = useState("");
  
  // Validation state
  const [phoneError, setPhoneError] = useState("");

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const validatePhone = (value: string) => {
    const phoneRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/;
    if (value && !phoneRegex.test(value)) {
      setPhoneError("Bitte geben Sie eine gültige Telefonnummer ein.");
      return false;
    }
    if (value && value.length < 6) {
      setPhoneError("Telefonnummer ist zu kurz.");
      return false;
    }
    setPhoneError("");
    return true;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPhone(val);
    if (val) validatePhone(val);
    else setPhoneError("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!isOnline) {
      toast.error("Reservierung aktuell nicht möglich (keine Internetverbindung)");
      return;
    }
    
    if (!validatePhone(phone)) {
      toast.error("Bitte überprüfen Sie Ihre Telefonnummer.");
      return;
    }
    
    if (!date || !time) {
      toast.error("Bitte wählen Sie ein Datum und eine Uhrzeit aus.");
      return;
    }
    
    setSubmissionStep(1);
    
    // Step 1: Processing
    await new Promise(r => setTimeout(r, 1500));
    setSubmissionStep(2);
    
    // Step 2: Encrypting
    await new Promise(r => setTimeout(r, 1500));
    setSubmissionStep(3);
    
    // Step 3: Connecting
    await new Promise(r => setTimeout(r, 1500));
    setSubmissionStep(4);
    
    // Step 4: Connected
    await new Promise(r => setTimeout(r, 1000));
    setSubmissionStep(5);
    
    // Step 5: Transmitting
    await new Promise(r => setTimeout(r, 2000));
    setSubmissionStep(6);
    
    // Step 6: Complete
    await new Promise(r => setTimeout(r, 1500));
    
    setSubmitted(true);
    setSubmissionStep(0);
    setName("");
    setEmail("");
    setPhone("");
    setGuests("");
    setMessage("");
    setDate(undefined);
    setTime(undefined);
    toast.success("Reservierungsanfrage gesendet! Wir melden uns in Kürze.");
  };

  const disabledDays = (date: Date) => {
    return isThursday(date) || isBefore(date, startOfToday());
  };

  const isPhoneValid = phone.length >= 6 && !phoneError;
  const isNameValid = name.length > 2;
  const isEmailValid = email.includes("@") && email.includes(".");
  const isGuestsValid = parseInt(guests) > 0 && parseInt(guests) <= 20;
  const isDateValid = !!date;
  const isTimeValid = !!time;
  const isMessageValid = message.length > 0;

  const renderSubmissionStep = () => {
    switch (submissionStep) {
      case 1:
        return (
          <motion.div key="step1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="flex flex-col items-center">
            <div className="relative w-24 h-24 mb-6">
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 3, ease: "linear" }} className="absolute inset-0 flex items-center justify-center">
                <Cpu className="w-16 h-16 text-primary/50" />
              </motion.div>
              <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} className="absolute inset-0 flex items-center justify-center">
                <FileText className="w-8 h-8 text-primary" />
              </motion.div>
            </div>
            <h3 className="text-2xl font-display font-bold text-primary-foreground">Daten werden verarbeitet...</h3>
          </motion.div>
        );
      case 2:
        return (
          <motion.div key="step2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="flex flex-col items-center">
            <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }} className="absolute">
                <ShieldCheck className="w-20 h-20 text-green-500/20" />
              </motion.div>
              <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                <Lock className="w-10 h-10 text-primary" />
              </motion.div>
            </div>
            <h3 className="text-2xl font-display font-bold text-primary-foreground">Daten werden verschlüsselt...</h3>
          </motion.div>
        );
      case 3:
        return (
          <motion.div key="step3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="flex flex-col items-center">
            <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
              <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                <Wifi className="w-16 h-16 text-primary" />
              </motion.div>
            </div>
            <h3 className="text-2xl font-display font-bold text-primary-foreground">Verbindung zum Server wird hergestellt...</h3>
          </motion.div>
        );
      case 4:
        return (
          <motion.div key="step4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="flex flex-col items-center">
            <div className="relative w-24 h-24 mb-6 flex items-center justify-center gap-4">
              <Server className="w-12 h-12 text-primary" />
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
                <Link className="w-8 h-8 text-green-500" />
              </motion.div>
            </div>
            <h3 className="text-2xl font-display font-bold text-primary-foreground">Verbindung hergestellt</h3>
          </motion.div>
        );
      case 5:
        return (
          <motion.div key="step5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="flex flex-col items-center">
            <div className="relative w-48 h-24 mb-6 flex items-center justify-between px-4">
              <Lock className="w-10 h-10 text-primary z-10" />
              <motion.div 
                initial={{ x: -20, opacity: 0 }} 
                animate={{ x: 100, opacity: [0, 1, 1, 0] }} 
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                className="absolute left-10"
              >
                <Package className="w-8 h-8 text-primary/70" />
              </motion.div>
              <Database className="w-12 h-12 text-primary z-10" />
            </div>
            <h3 className="text-2xl font-display font-bold text-primary-foreground text-center">Verschlüsselte Übermittlung der Daten an unsere Server...</h3>
          </motion.div>
        );
      case 6:
        return (
          <motion.div key="step6" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.2 }} className="flex flex-col items-center">
            <motion.div initial={{ scale: 0, rotate: -45 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", damping: 12 }} className="mb-6">
              <CheckCircle2 className="w-24 h-24 text-green-500" />
            </motion.div>
            <h3 className="text-3xl font-display font-bold text-primary-foreground">Übermittlung abgeschlossen</h3>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="reservation" className="py-20 md:py-28 bg-foreground relative overflow-hidden">
      <AnimatePresence>
        {submissionStep > 0 && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(16px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/80"
          >
            <div className="relative w-full max-w-lg p-8 flex flex-col items-center text-center">
              <AnimatePresence mode="wait">
                {renderSubmissionStep()}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-10">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-warm rounded-full blur-3xl" />
      </div>

      <div className="container max-w-3xl relative z-10">
        <AnimatedSection>
          <div className="text-center mb-12">
            <p className="text-primary font-body text-sm uppercase tracking-[0.2em] mb-3">Reservierung</p>
            <h2 className="font-display text-5xl md:text-6xl font-bold text-primary-foreground mb-4 italic tracking-tight">Tisch reservieren</h2>
            <p className="text-primary-foreground/60 font-body max-w-lg mx-auto">
              Senden Sie Ihre Reservierungsanfrage und wir melden uns schnellstmöglich bei Ihnen.
            </p>
          </div>
        </AnimatedSection>

        {submitted ? (
          <AnimatedSection>
            <div className="text-center py-16 bg-primary-foreground/5 rounded-3xl border border-primary-foreground/10 backdrop-blur-sm">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="text-primary w-10 h-10" />
              </div>
              <h3 className="text-primary-foreground font-display text-2xl font-bold mb-3">Anfrage gesendet!</h3>
              <p className="text-primary-foreground/60 font-body max-w-xs mx-auto">
                Vielen Dank für Ihre Reservierung. Wir prüfen die Verfügbarkeit und melden uns in Kürze bei Ihnen.
              </p>
              <Button 
                variant="outline" 
                className="mt-8 border-primary text-primary hover:bg-primary hover:text-primary-foreground" 
                onClick={() => setSubmitted(false)}
              >
                Weitere Reservierung
              </Button>
            </div>
          </AnimatedSection>
        ) : (
          <AnimatedSection delay={200}>
            <div className="relative">
              <div className={cn(
                "bg-primary-foreground/5 p-6 md:p-10 rounded-3xl border border-primary-foreground/10 backdrop-blur-sm shadow-2xl transition-all duration-500",
                !isOnline && "blur-sm opacity-60 pointer-events-none select-none"
              )}>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <AnimatedSection delay={300}>
                    <div className="space-y-2 relative">
                      <label className="text-xs font-body uppercase tracking-wider text-primary-foreground/50 ml-1">Name</label>
                      <div className="relative">
                        <Input 
                          placeholder="Ihr Name *" 
                          required 
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className={cn(inputClasses, isNameValid && "border-green-500/50 focus:border-green-500/50 pr-10")} 
                        />
                        {isNameValid && <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />}
                      </div>
                    </div>
                  </AnimatedSection>
                  <AnimatedSection delay={400}>
                    <div className="space-y-2 relative">
                      <label className="text-xs font-body uppercase tracking-wider text-primary-foreground/50 ml-1">E-Mail</label>
                      <div className="relative">
                        <Input 
                          type="email" 
                          placeholder="E-Mail-Adresse *" 
                          required 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className={cn(inputClasses, isEmailValid && "border-green-500/50 focus:border-green-500/50 pr-10")} 
                        />
                        {isEmailValid && <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />}
                      </div>
                    </div>
                  </AnimatedSection>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <AnimatedSection delay={500}>
                    <div className="space-y-2 relative">
                      <label className="text-xs font-body uppercase tracking-wider text-primary-foreground/50 ml-1">Telefon</label>
                      <div className="relative">
                        <Input 
                          type="tel" 
                          placeholder="Telefonnummer *" 
                          required 
                          value={phone}
                          onChange={handlePhoneChange}
                          className={cn(
                            inputClasses, 
                            phoneError && "border-destructive/50 focus:border-destructive/50 focus:ring-destructive/20",
                            isPhoneValid && "border-green-500/50 focus:border-green-500/50 pr-10"
                          )} 
                        />
                        {isPhoneValid && <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />}
                        {phoneError && <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-destructive" />}
                      </div>
                      {phoneError && <p className="text-[10px] text-destructive absolute -bottom-4 left-1">{phoneError}</p>}
                    </div>
                  </AnimatedSection>
                  <AnimatedSection delay={600}>
                    <div className="space-y-2 relative">
                      <label className="text-xs font-body uppercase tracking-wider text-primary-foreground/50 ml-1">Personen</label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-foreground/30" />
                        <Input 
                          type="number" 
                          min={1} 
                          max={20} 
                          placeholder="Anzahl Gäste *" 
                          required 
                          value={guests}
                          onChange={(e) => setGuests(e.target.value)}
                          className={cn(inputClasses, "pl-10", isGuestsValid && "border-green-500/50 focus:border-green-500/50 pr-10")} 
                        />
                        {isGuestsValid && <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />}
                      </div>
                    </div>
                  </AnimatedSection>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <AnimatedSection delay={700}>
                    <div className="space-y-2 relative">
                      <label className="text-xs font-body uppercase tracking-wider text-primary-foreground/50 ml-1">Datum</label>
                      <div className="relative">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-body h-11",
                                inputClasses,
                                !date && "text-primary-foreground/30",
                                isDateValid && "border-green-500/50 focus:border-green-500/50 pr-10"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                              {date ? format(date, "PPP", { locale: undefined }) : <span>Datum auswählen *</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0 bg-foreground border-primary-foreground/10" align="start">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={setDate}
                              disabled={disabledDays}
                              initialFocus
                              className="bg-foreground text-primary-foreground"
                            />
                          </PopoverContent>
                        </Popover>
                        {isDateValid && <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500 pointer-events-none" />}
                      </div>
                    </div>
                  </AnimatedSection>

                  <AnimatedSection delay={800}>
                    <div className="space-y-2 relative">
                      <label className="text-xs font-body uppercase tracking-wider text-primary-foreground/50 ml-1">Uhrzeit</label>
                      <div className="relative">
                        <Select onValueChange={setTime} required>
                          <SelectTrigger className={cn("h-11 font-body", inputClasses, !time && "text-primary-foreground/30", isTimeValid && "border-green-500/50 focus:border-green-500/50 pr-10")}>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-primary" />
                              <SelectValue placeholder="Uhrzeit auswählen *" />
                            </div>
                          </SelectTrigger>
                          <SelectContent className="bg-foreground border-primary-foreground/10 text-primary-foreground max-h-64">
                            {timeSlots.map((slot) => (
                              <SelectItem key={slot} value={slot} className="focus:bg-primary focus:text-primary-foreground">
                                {slot} Uhr
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {isTimeValid && <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500 pointer-events-none" />}
                      </div>
                    </div>
                  </AnimatedSection>
                </div>

                <AnimatedSection delay={900}>
                  <div className="space-y-2 relative">
                    <label className="text-xs font-body uppercase tracking-wider text-primary-foreground/50 ml-1">Nachricht</label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-primary-foreground/30" />
                      <Textarea 
                        placeholder="Ihre Nachricht (optional)" 
                        maxLength={500} 
                        rows={3} 
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className={cn(inputClasses, "pl-10 pt-2.5", isMessageValid && "border-green-500/50 focus:border-green-500/50 pr-10")} 
                      />
                      {isMessageValid && <Check className="absolute right-3 top-3 w-4 h-4 text-green-500 pointer-events-none" />}
                    </div>
                  </div>
                </AnimatedSection>

                <AnimatedSection delay={1000}>
                  <Button 
                    type="submit" 
                    size="lg" 
                    disabled={loading || !isOnline}
                    className={cn(
                      "w-full text-base font-body font-semibold h-12 shadow-xl hover:scale-[1.01] transition-all",
                      isOnline 
                        ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-primary/20" 
                        : "bg-muted text-muted-foreground cursor-not-allowed"
                    )}
                  >
                    {loading ? "Wird gesendet..." : !isOnline ? "Offline" : "Jetzt Reservierung anfragen"}
                  </Button>
                </AnimatedSection>
                
                <AnimatedSection delay={1100}>
                  <p className="text-[10px] text-center text-primary-foreground/30 font-body uppercase tracking-widest">
                    Donnerstags haben wir Ruhetag
                  </p>
                </AnimatedSection>
              </form>
            </div>

            {!isOnline && (
              <div className="absolute inset-0 z-50 flex items-center justify-center p-6">
                <div className="bg-foreground/90 backdrop-blur-md p-8 rounded-2xl border border-destructive/30 shadow-2xl text-center max-w-sm w-full animate-in fade-in zoom-in-95 duration-500">
                  <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="w-8 h-8 text-destructive animate-pulse" />
                  </div>
                  <h3 className="text-primary-foreground font-display text-xl font-bold mb-2">Sie sind offline</h3>
                  <p className="text-primary-foreground/70 font-body text-sm">
                    Eine Reservierung ist derzeit nicht möglich. Bitte überprüfe deine Verbindung.
                  </p>
                </div>
              </div>
            )}
            </div>
          </AnimatedSection>
        )}
      </div>
    </section>
  );
};

export default ReservationSection;
