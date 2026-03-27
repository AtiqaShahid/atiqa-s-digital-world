import { motion } from "framer-motion";

interface HeroZoneProps {
  onNavigate: (zone: string) => void;
}

const HeroZone = ({ onNavigate }: HeroZoneProps) => {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mb-4"
      >
        <div className="inline-flex items-center gap-2 glass-panel-subtle rounded-full px-4 py-2 mb-8">
          <div className="h-2 w-2 rounded-full bg-neon-green animate-pulse" />
          <span className="font-mono text-xs text-muted-foreground">Available for collaboration</span>
        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="text-5xl sm:text-7xl md:text-8xl font-display font-bold tracking-tight mb-4"
      >
        <span className="gradient-text">Atiqa</span>{" "}
        <span className="text-foreground">Shahid</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="font-mono text-sm sm:text-base text-muted-foreground max-w-xl mb-4"
      >
        Full Stack Developer · Creative Web Builder · Data Analysis Learner
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-sm text-muted-foreground/70 max-w-md mb-10 leading-relaxed"
      >
        Building immersive digital experiences at the intersection of code, creativity, and data.
        Welcome to my world — explore freely.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="flex flex-wrap gap-3 justify-center"
      >
        <button
          onClick={() => onNavigate("projects")}
          className="group relative px-6 py-3 rounded-lg font-display font-medium text-sm text-primary-foreground overflow-hidden transition-transform hover:scale-105"
          style={{ background: "var(--gradient-hero)" }}
        >
          <span className="relative z-10">Explore Projects</span>
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-[linear-gradient(135deg,hsl(270_80%_60%),hsl(195_100%_50%))]" />
        </button>
        <button
          onClick={() => onNavigate("about")}
          className="px-6 py-3 rounded-lg font-display font-medium text-sm glass-panel hover-glow transition-transform hover:scale-105"
        >
          About Me
        </button>
        <button
          onClick={() => onNavigate("contact")}
          className="px-6 py-3 rounded-lg font-display font-medium text-sm border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all hover:scale-105"
        >
          Contact
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] text-muted-foreground/50 tracking-widest uppercase">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-5 h-8 rounded-full border border-primary/30 flex justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-primary/60" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroZone;
