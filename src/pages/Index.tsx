import { useState, useCallback } from "react";
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

const zoneTransition = {
  initial: { opacity: 0, scale: 0.95, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95, y: -20 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
};

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  const [activeZone, setActiveZone] = useState("hero");
  const { muted, toggleMute } = useSoundSystem();

  const navigateTo = useCallback((zone: string) => {
    if (zone === activeZone) return;
    setActiveZone(zone);
  }, [activeZone]);

  if (!loaded) {
    return <LoadingScreen onComplete={() => setLoaded(true)} />;
  }

  return (
    <div className="relative bg-background w-screen h-screen overflow-hidden">
      <Scene3D activeZone={activeZone} />
      <Navbar activeZone={activeZone} onNavigate={navigateTo} />
      <Minimap activeZone={activeZone} onNavigate={navigateTo} />
      <SoundToggle muted={muted} onToggle={toggleMute} />

      {/* Zone content overlays — only active zone visible */}
      <div className="relative z-10 w-full h-full">
        <AnimatePresence mode="wait">
          {activeZone === "hero" && (
            <motion.div key="hero" {...zoneTransition} className="absolute inset-0 overflow-y-auto">
              <HeroZone onNavigate={navigateTo} />
            </motion.div>
          )}
          {activeZone === "projects" && (
            <motion.div key="projects" {...zoneTransition} className="absolute inset-0 overflow-y-auto">
              <ProjectsZone />
            </motion.div>
          )}
          {activeZone === "skills" && (
            <motion.div key="skills" {...zoneTransition} className="absolute inset-0 overflow-y-auto">
              <SkillsZone />
            </motion.div>
          )}
          {activeZone === "about" && (
            <motion.div key="about" {...zoneTransition} className="absolute inset-0 overflow-y-auto">
              <AboutZone />
            </motion.div>
          )}
          {activeZone === "contact" && (
            <motion.div key="contact" {...zoneTransition} className="absolute inset-0 overflow-y-auto">
              <ContactZone />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Index;
