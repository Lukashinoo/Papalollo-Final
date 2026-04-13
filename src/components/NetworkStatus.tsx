import { useState, useEffect } from "react";
import { WifiOff, Wifi } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const NetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showRestored, setShowRestored] = useState(false);
  const [minimized, setMinimized] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowRestored(true);
      setMinimized(false);
      setTimeout(() => setShowRestored(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowRestored(false);
      setMinimized(false);
      // Auto-minimize after 5 seconds
      setTimeout(() => setMinimized(true), 5000);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const isVisible = !isOnline || showRestored;

  return (
    <div className="fixed bottom-6 left-0 w-full z-[100] flex justify-center pointer-events-none px-4">
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            key="network-status"
            layout
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="pointer-events-auto"
            onMouseEnter={() => !isOnline && setMinimized(false)}
            onClick={() => !isOnline && setMinimized(!minimized)}
          >
            <motion.div 
              layout
              className={`px-4 py-3 rounded-full shadow-lg flex items-center gap-3 cursor-pointer overflow-hidden transition-colors duration-500 ${
                showRestored 
                  ? 'bg-green-600 text-white border border-green-400/20' 
                  : 'bg-destructive text-destructive-foreground border border-destructive-foreground/20'
              } ${!showRestored && minimized ? 'w-14 h-14 justify-center px-0' : 'max-w-md'}`}
            >
              <motion.div layout className="relative flex items-center justify-center shrink-0">
                {showRestored ? (
                  <Wifi className="w-5 h-5 relative z-10" />
                ) : (
                  <WifiOff className={`w-5 h-5 relative z-10 ${!minimized ? 'animate-pulse text-white' : ''}`} />
                )}
                {!showRestored && minimized && (
                  <span className="absolute inset-0 rounded-full animate-ping bg-destructive-foreground/30" />
                )}
              </motion.div>
              
              <AnimatePresence mode="wait">
                {(!minimized || showRestored) && (
                  <motion.span 
                    key="text"
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                    className="font-body text-sm font-medium whitespace-nowrap overflow-hidden"
                  >
                    {showRestored ? "Verbindung wiederhergestellt" : "Keine Internetverbindung"}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NetworkStatus;
