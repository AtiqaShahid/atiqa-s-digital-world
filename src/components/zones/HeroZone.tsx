import { motion } from "framer-motion";
import { useMouseParallax } from "@/hooks/useMouseParallax";

interface HeroZoneProps {
  onNavigate: (zone: string) => void;
}

const HeroZone = ({ onNavigate }: HeroZoneProps) => {
  const mouse = useMouseParallax(1);

  return (
    <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center overflow-hidden">
      {/* Parallax floating decorative elements */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ transform: `translate(${mouse.x * -15}px, ${mouse.y * -15}px)` }}
      >
        <div className="absolute top-[15%] left-[10%] w-40 h-40 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-[20%] right-[15%] w-56 h-56 rounded-full bg-secondary/5 blur-3xl" />
        <div className="absolute top-[40%] right-[8%] w-2 h-2 rounded-full bg-primary/40 animate-pulse" />
        <div className="absolute bottom-[35%] left-[12%] w-1.5 h-1.5 rounded-full bg-neon-green/50 animate-pulse" />
      </div>

      <div style={{ transform: `translate(${mouse.x * -8}px, ${mouse.y * -8}px)` }}>
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
          style={{ transform: `translate(${mouse.x * 5}px, ${mouse.y * 5}px)` }}
        >
          <span className="gradient-text">Atiqa</span>{" "}
          <span className="text-foreground">Shahid</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="font-mono text-sm sm:text-base text-muted-foreground max-w-xl mb-4 mx-auto"
          style={{ transform: `translate(${mouse.x * 3}px, ${mouse.y * 3}px)` }}
        >
          Full Stack Developer · Creative Web Builder · Data Analysis Learner
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-sm text-muted-foreground/70 max-w-md mb-10 leading-relaxed mx-auto"
        >
          Building immersive digital experiences at the intersection of code, creativity, and data.
          Welcome to my world — explore freely.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="flex flex-wrap gap-3 justify-center"
        style={{ transform: `translate(${mouse.x * 2}px, ${mouse.y * 2}px)` }}
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

      {/* Floating insight tooltips on hover */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute top-[20%] right-[8%] hidden lg:block"
      >
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="glass-panel-subtle rounded-lg px-3 py-2 group cursor-default"
        >
          <span className="font-mono text-[10px] text-muted-foreground/50 group-hover:text-primary/80 transition-colors">
            "Built AI-powered analytics system"
          </span>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0 }}
        className="absolute bottom-[25%] left-[6%] hidden lg:block"
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }}
          className="glass-panel-subtle rounded-lg px-3 py-2 group cursor-default"
        >
          <span className="font-mono text-[10px] text-muted-foreground/50 group-hover:text-primary/80 transition-colors">
            "Designed full-scale e-commerce platform"
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroZone;
