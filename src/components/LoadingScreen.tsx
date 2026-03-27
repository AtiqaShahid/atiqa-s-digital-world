import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 600);
          return 100;
        }
        return p + 2;
      });
    }, 40);
    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    if (progress > 30) setPhase(1);
    if (progress > 60) setPhase(2);
    if (progress > 90) setPhase(3);
  }, [progress]);

  const messages = [
    "Initializing environment...",
    "Loading 3D assets...",
    "Compiling shaders...",
    "Welcome, Explorer.",
  ];

  return (
    <AnimatePresence>
      {progress < 100 && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid-floor scanline absolute inset-0 opacity-30" />
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative mb-12"
          >
            <div className="h-20 w-20 rounded-full border-2 border-primary/30 animate-rotate-slow" />
            <div className="absolute inset-2 rounded-full border border-neon-purple/50 animate-rotate-slow" style={{ animationDirection: 'reverse', animationDuration: '15s' }} />
            <div className="absolute inset-4 rounded-full bg-primary/10 flex items-center justify-center">
              <div className="h-4 w-4 rounded-full bg-primary shadow-[0_0_20px_hsl(195_100%_50%/0.8)]" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="gradient-text text-2xl font-bold font-display mb-2"
          >
            ATIQA SHAHID
          </motion.h1>

          <motion.p
            key={phase}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-mono text-sm text-muted-foreground mb-8"
          >
            {messages[phase]}
          </motion.p>

          <div className="w-64 h-1 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: "var(--gradient-hero)", width: `${progress}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>
          <p className="font-mono text-xs text-muted-foreground mt-3">{progress}%</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
