import { useState, useCallback, useRef, useEffect } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import Minimap from "@/components/Minimap";
import Scene3D from "@/components/Scene3D";
import HeroZone from "@/components/zones/HeroZone";
import ProjectsZone from "@/components/zones/ProjectsZone";
import SkillsZone from "@/components/zones/SkillsZone";
import AboutZone from "@/components/zones/AboutZone";
import ContactZone from "@/components/zones/ContactZone";

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  const [activeZone, setActiveZone] = useState("hero");
  const containerRef = useRef<HTMLDivElement>(null);
  const zoneRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const navigateTo = useCallback((zone: string) => {
    setActiveZone(zone);
    zoneRefs.current[zone]?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const zones = ["hero", "projects", "skills", "about", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-zone");
            if (id) setActiveZone(id);
          }
        });
      },
      { threshold: 0.4 }
    );

    zones.forEach((z) => {
      const el = zoneRefs.current[z];
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [loaded]);

  if (!loaded) {
    return <LoadingScreen onComplete={() => setLoaded(true)} />;
  }

  return (
    <div className="relative bg-background">
      <Scene3D />
      <Navbar activeZone={activeZone} onNavigate={navigateTo} />
      <Minimap activeZone={activeZone} onNavigate={navigateTo} />

      <div ref={containerRef} className="relative z-10 overflow-y-auto h-screen snap-y snap-mandatory" style={{ scrollBehavior: "smooth" }}>
        <div ref={(el) => { zoneRefs.current["hero"] = el; }} data-zone="hero" className="snap-start">
          <HeroZone onNavigate={navigateTo} />
        </div>
        <div ref={(el) => { zoneRefs.current["projects"] = el; }} data-zone="projects" className="snap-start">
          <ProjectsZone />
        </div>
        <div ref={(el) => { zoneRefs.current["skills"] = el; }} data-zone="skills" className="snap-start">
          <SkillsZone />
        </div>
        <div ref={(el) => { zoneRefs.current["about"] = el; }} data-zone="about" className="snap-start">
          <AboutZone />
        </div>
        <div ref={(el) => { zoneRefs.current["contact"] = el; }} data-zone="contact" className="snap-start">
          <ContactZone />
        </div>
      </div>
    </div>
  );
};

export default Index;
