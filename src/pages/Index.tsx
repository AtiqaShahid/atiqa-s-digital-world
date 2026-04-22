import { useState, useCallback, useEffect, useRef } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import Minimap from "@/components/Minimap";
import Scene3D from "@/components/Scene3D";
import SoundToggle from "@/components/SoundToggle";
import HeroZone from "@/components/zones/HeroZone";
import ProjectsZone from "@/components/zones/ProjectsZone";
import SkillsZone from "@/components/zones/SkillsZone";
import AboutZone from "@/components/zones/AboutZone";
import ContactZone from "@/components/zones/ContactZone";
import { useSoundSystem } from "@/hooks/useSoundSystem";
import { AnimatePresence, motion } from "framer-motion";

const ZONES = ["hero", "projects", "skills", "about", "contact"];

const zoneTransition = {
  initial: { opacity: 0, scale: 0.95, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95, y: -20 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
};

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  const [activeZone, setActiveZone] = useState("hero");
  const [cinematicDone, setCinematicDone] = useState(false);
  const { muted, toggleMute } = useSoundSystem();
  const scrollCooldown = useRef(false);
  const touchStartY = useRef(0);

  const navigateTo = useCallback((zone: string) => {
    if (zone === activeZone) return;
    setActiveZone(zone);
  }, [activeZone]);

  // Scroll-driven zone navigation
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // If inside a scrollable overlay with content, allow native scroll
      const target = e.target as HTMLElement;
      const scrollable = target.closest('[data-zone-content]');
      if (scrollable) {
        const el = scrollable as HTMLElement;
        const canScrollDown = el.scrollTop + el.clientHeight < el.scrollHeight - 10;
        const canScrollUp = el.scrollTop > 10;
        if ((e.deltaY > 0 && canScrollDown) || (e.deltaY < 0 && canScrollUp)) {
          return; // Allow native scroll inside zone content
        }
      }

      e.preventDefault();
      if (scrollCooldown.current) return;

      const currentIdx = ZONES.indexOf(activeZone);
      let nextIdx = currentIdx;

      if (e.deltaY > 30) {
        nextIdx = Math.min(currentIdx + 1, ZONES.length - 1);
      } else if (e.deltaY < -30) {
        nextIdx = Math.max(currentIdx - 1, 0);
      }

      if (nextIdx !== currentIdx) {
        scrollCooldown.current = true;
        setActiveZone(ZONES[nextIdx]);
        setTimeout(() => { scrollCooldown.current = false; }, 1200);
      }
    };

    // Touch support for mobile
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (scrollCooldown.current) return;
      const deltaY = touchStartY.current - e.changedTouches[0].clientY;
      const currentIdx = ZONES.indexOf(activeZone);
      let nextIdx = currentIdx;

      if (deltaY > 60) nextIdx = Math.min(currentIdx + 1, ZONES.length - 1);
      else if (deltaY < -60) nextIdx = Math.max(currentIdx - 1, 0);

      if (nextIdx !== currentIdx) {
        scrollCooldown.current = true;
        setActiveZone(ZONES[nextIdx]);
        setTimeout(() => { scrollCooldown.current = false; }, 1200);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [activeZone]);

  // Keyboard navigation (1-5 keys)
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const idx = parseInt(e.key) - 1;
      if (idx >= 0 && idx < ZONES.length) {
        setActiveZone(ZONES[idx]);
      }
      // Arrow keys
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        const cur = ZONES.indexOf(activeZone);
        if (cur < ZONES.length - 1) setActiveZone(ZONES[cur + 1]);
      }
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        const cur = ZONES.indexOf(activeZone);
        if (cur > 0) setActiveZone(ZONES[cur - 1]);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeZone]);

  // Cinematic intro timer
  useEffect(() => {
    if (loaded) {
      const t = setTimeout(() => setCinematicDone(true), 3500);
      return () => clearTimeout(t);
    }
  }, [loaded]);

  if (!loaded) {
    return <LoadingScreen onComplete={() => setLoaded(true)} />;
  }

  return (
    <div className="relative bg-background w-screen h-screen overflow-hidden">
      <Scene3D activeZone={activeZone} />
      
      {/* Cinematic intro overlay removed per user request */}

      <Navbar activeZone={activeZone} onNavigate={navigateTo} />
      <Minimap activeZone={activeZone} onNavigate={navigateTo} />
      <SoundToggle muted={muted} onToggle={toggleMute} />

      {/* Floating capability tags */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: cinematicDone ? 1 : 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="fixed bottom-6 left-6 z-40 hidden md:flex gap-2"
      >
        {["AI", "3D", "Full Stack", "E-commerce"].map((tag, i) => (
          <motion.span
            key={tag}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + i * 0.15 }}
            className="font-mono text-[10px] px-2.5 py-1 rounded-full glass-panel-subtle text-muted-foreground/60 tracking-wider"
          >
            {tag}
          </motion.span>
        ))}
      </motion.div>

      {/* Scroll hint */}
      {activeZone === "hero" && cinematicDone && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[10px] text-muted-foreground/40 tracking-widest uppercase">
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border border-muted-foreground/20 flex justify-center pt-1.5"
          >
            <div className="w-1 h-2 rounded-full bg-primary/50" />
          </motion.div>
        </motion.div>
      )}

      {/* Zone progress indicator */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-1.5">
        {ZONES.map((z, i) => (
          <div
            key={z}
            className={`w-0.5 transition-all duration-700 rounded-full ${
              ZONES.indexOf(activeZone) >= i
                ? "h-6 bg-primary/60"
                : "h-3 bg-muted-foreground/15"
            }`}
          />
        ))}
      </div>

      {/* Zone content overlays */}
      <div className="relative z-10 w-full h-full">
        <AnimatePresence mode="wait">
          {activeZone === "hero" && (
            <motion.div key="hero" {...zoneTransition} className="absolute inset-0">
              <HeroZone onNavigate={navigateTo} />
            </motion.div>
          )}
          {activeZone === "projects" && (
            <motion.div key="projects" {...zoneTransition} className="absolute inset-0 overflow-y-auto" data-zone-content>
              <ProjectsZone />
            </motion.div>
          )}
          {activeZone === "skills" && (
            <motion.div key="skills" {...zoneTransition} className="absolute inset-0 overflow-y-auto" data-zone-content>
              <SkillsZone />
            </motion.div>
          )}
          {activeZone === "about" && (
            <motion.div key="about" {...zoneTransition} className="absolute inset-0 overflow-y-auto" data-zone-content>
              <AboutZone />
            </motion.div>
          )}
          {activeZone === "contact" && (
            <motion.div key="contact" {...zoneTransition} className="absolute inset-0 overflow-y-auto" data-zone-content>
              <ContactZone />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Index;
