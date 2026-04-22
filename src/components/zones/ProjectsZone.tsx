import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ExternalLink, X, Github } from "lucide-react";

interface Project {
  name: string;
  description: string;
  highlights?: string[];
  positioning?: string;
  tech: string[];
  link?: string;
  githubLink?: string;
  featured?: boolean;
  status?: string;
  category: "web" | "data";
}

const featuredProjects: Project[] = [
  {
    name: "PersonaX",
    description: "A full-scale AI-powered personalization and productivity platform focused on intelligent dashboards, habit optimization, and user-driven customization.",
    highlights: [
      "Built a dynamic dashboard system with draggable and persistent widgets per user",
      "Engineered a personalized onboarding flow with adaptive questioning logic",
      "Developed an AI suggestion engine providing actionable, behavior-based improvements",
      "Implemented user-specific state persistence for layouts, preferences, and widgets",
      "Designed a modular widget system for habits, productivity, and lifestyle tracking",
      "Integrated intelligent recommendation logic for continuous user improvement",
      "Created a responsive UI optimized for both desktop and mobile experiences",
    ],
    positioning: "A production-level platform combining personalization, habit intelligence, and adaptive user experience.",
    tech: ["React", "AI Systems", "Personalization", "Dashboards", "Full Stack", "UX Optimization"],
    link: "https://personax-seven.vercel.app/",
    featured: true,
    category: "web",
  },
  {
    name: "Nocturne Café Experience",
    description: "An immersive café-themed interactive website combining storytelling, atmosphere, and interactive UI experiences.",
    highlights: [
      "Built a cinematic café environment with atmospheric UI design",
      "Implemented interactive room-based navigation system",
      "Created menu system with smooth animations and transitions",
      "Integrated immersive storytelling elements tied to café experience",
      "Optimized 3D-style visual depth and ambient interaction flow",
    ],
    positioning: "A narrative-driven digital experience blending UI design, storytelling, and immersive interaction.",
    tech: ["React", "Three.js", "R3F", "Tailwind CSS", "Framer Motion", "JS Animations"],
    link: "https://nocturne-cafe.vercel.app/",
    featured: true,
    category: "web",
  },
  {
    name: "Hooked on Kawaii",
    description: "A full-scale AI-powered e-commerce and community platform with advanced user interaction and analytics systems.",
    highlights: [
      "Built a complete e-commerce system (products, cart, orders, payments)",
      "Developed role-based dashboards (admin & customer) with full control systems",
      "Engineered a social community layer (posts, likes, engagement features)",
      "Integrated AI chatbot for user support and interaction",
      "Designed an AI analytics system to predict product trends and optimize revenue strategies",
      "Implemented data-driven dashboards for sales insights and performance tracking",
    ],
    positioning: "A production-level platform combining commerce, community, and AI-driven decision systems.",
    tech: ["React", "AI Analytics", "E-commerce", "Dashboards", "Community", "Full Stack"],
    link: "https://hooked-on-kawaii.vercel.app/",
    featured: true,
    category: "web",
  },
  {
    name: "Gilded Cocoa",
    description: "A luxury e-commerce brand website for premium handcrafted chocolate products with immersive storytelling and elegant UI experience.",
    highlights: [
      "Built a high-end luxury storefront with smooth 3D-inspired UI transitions",
      "Designed premium product showcase pages with storytelling-driven layout",
      "Implemented responsive e-commerce flow (product browsing, cart experience)",
      "Integrated modern animations for premium brand feel",
      "Optimized for performance and cinematic visual experience",
    ],
    positioning: "A luxury digital brand experience focused on emotion-driven product presentation and premium UI storytelling.",
    tech: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "Node.js", "UI Animations"],
    link: "https://gilded-cocoa.vercel.app/",
    featured: true,
    category: "web",
  },
  {
    name: "Ingeniors",
    description: "A modern interactive platform combining 3D web experiences, AI systems, and geospatial data visualization.",
    highlights: [
      "Developed a 3D immersive interface using Three.js / React Three Fiber for interactive exploration",
      "Integrated real-time map systems (Mapbox/Google Maps) with dynamic data overlays",
      "Built an AI-powered chatbot for intelligent user interaction and assistance",
      "Designed an impact dashboard with live analytics and data visualization",
      "Engineered scalable APIs to manage dynamic content and system interactions",
    ],
    positioning: "Bridges creative 3D web development with real-world data systems and AI integration.",
    tech: ["React", "Three.js", "R3F", "Mapbox", "AI/Chatbot", "APIs", "Full Stack"],
    link: "https://ingeniors.vercel.app/",
    featured: true,
    category: "web",
  },
];

const smallerProjects: Project[] = [
  {
    name: "Personal Portfolio",
    description: "A custom-designed 3D portfolio showcasing projects and skills with interactive elements and immersive navigation.",
    tech: ["React", "Three.js", "Tailwind", "Framer Motion"],
    category: "web",
  },
  {
    name: "Blog Homepage",
    description: "Clean blog layout with responsive grid, reading-time estimates, and modern design patterns.",
    tech: ["React", "CSS Grid", "Responsive"],
    category: "web",
  },
  {
    name: "Task Management App",
    description: "A productivity application with drag-and-drop task organization, priority levels, and progress tracking.",
    tech: ["React", "TypeScript", "Tailwind CSS", "DnD"],
    category: "web",
  },
  {
    name: "Weather Dashboard",
    description: "Real-time weather visualization app with interactive maps, forecasts, and location-based insights.",
    tech: ["React", "APIs", "Charts", "Geolocation"],
    category: "web",
  },
  {
    name: "Customer Churn Analysis",
    description: "Data analysis project identifying key factors in customer churn using statistical methods and predictive modeling.",
    tech: ["Python", "Pandas", "Data Analysis", "Visualization"],
    githubLink: "https://github.com/AtiqaShahid/Customer-Churn-analysis",
    category: "data",
  },
  {
    name: "Sales Dashboard",
    description: "Interactive sales analytics dashboard with KPIs, trend visualizations, and data-driven decision support.",
    tech: ["Power BI", "SQL", "DAX"],
    status: "In Progress",
    category: "data",
  },
];

const ProjectCard = ({ project, index, onClick, small }: { project: Project; index: number; onClick: () => void; small?: boolean }) => {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    const tilt = small ? 4 : 6;
    e.currentTarget.style.transform = `perspective(800px) rotateY(${x * tilt}deg) rotateX(${-y * tilt}deg) translateY(-4px)`;
  };
  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) translateY(0px)";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: "transform 0.2s ease-out", transformStyle: "preserve-3d" }}
      className={`group glass-panel rounded-xl cursor-pointer hover-glow ${
        small ? "p-4" : project.featured ? "p-5 md:col-span-2 border-primary/20" : "p-5"
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className={`h-2 w-2 rounded-full ${project.category === "data" ? "bg-neon-green" : "bg-primary"}`} />
          {project.featured && !small && (
            <span className="font-mono text-[10px] uppercase tracking-wider text-primary">Featured</span>
          )}
          {project.status && (
            <span className="font-mono text-[10px] uppercase tracking-wider text-neon-orange">{project.status}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {project.githubLink && <Github className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />}
          {project.link && <ExternalLink className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />}
        </div>
      </div>

      <h3 className={`font-display font-semibold text-foreground group-hover:text-primary transition-colors ${small ? "text-sm mb-1" : "mb-2"}`}>
        {project.name}
      </h3>
      <p className={`text-muted-foreground leading-relaxed mb-2 ${small ? "text-[11px] line-clamp-1" : "text-xs line-clamp-2"}`}>
        {project.description}
      </p>
      {project.positioning && !small && (
        <p className="text-[10px] text-primary/70 font-mono mb-3 line-clamp-1">→ {project.positioning}</p>
      )}
      <div className="flex flex-wrap gap-1.5">
        {(small ? project.tech.slice(0, 3) : project.tech).map((t) => (
          <span key={t} className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{t}</span>
        ))}
      </div>
    </motion.div>
  );
};

const ProjectsZone = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="relative z-10 min-h-full px-6 py-20 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <span className="font-mono text-xs text-primary tracking-widest uppercase">Portfolio</span>
        <h2 className="text-3xl sm:text-4xl font-display font-bold mt-2">
          <span className="gradient-text">Selected</span> Works
        </h2>
        <p className="text-sm text-muted-foreground mt-2 max-w-md">
          A collection of projects spanning web development and data analysis.
        </p>
      </motion.div>

      {/* Featured Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
        {featuredProjects.map((project, i) => (
          <ProjectCard key={project.name} project={project} index={i} onClick={() => setSelectedProject(project)} />
        ))}
      </div>

      {/* My Smaller Steps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px flex-1 bg-border/30" />
          <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase">My Smaller Steps</span>
          <div className="h-px flex-1 bg-border/30" />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {smallerProjects.map((project, i) => (
          <ProjectCard key={project.name} project={project} index={i + 4} onClick={() => setSelectedProject(project)} small />
        ))}
      </div>

      {/* Project Spotlight Modal — cinematic reveal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-background/85"
            onClick={() => setSelectedProject(null)}
          >
            {/* Animated spotlight glow behind panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(circle at center, hsl(195 100% 50% / 0.15) 0%, transparent 50%)",
              }}
            />
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="glass-panel rounded-2xl p-8 max-w-lg w-full max-h-[80vh] overflow-y-auto relative"
              style={{
                boxShadow: "0 0 60px hsl(195 100% 50% / 0.25), 0 0 120px hsl(270 80% 60% / 0.15)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className={`h-2 w-2 rounded-full ${selectedProject.category === "data" ? "bg-neon-green" : "bg-primary"}`} />
                  <span className="font-mono text-xs text-muted-foreground uppercase">
                    {selectedProject.category === "data" ? "Data Analysis" : "Web Development"}
                  </span>
                </div>
                <h3 className="text-2xl font-display font-bold">{selectedProject.name}</h3>
              </div>
              <button onClick={() => setSelectedProject(null)} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">{selectedProject.description}</p>

            {selectedProject.highlights && (
              <ul className="space-y-2 mb-4">
                {selectedProject.highlights.map((h, i) => (
                  <li key={i} className="text-xs text-muted-foreground leading-relaxed flex gap-2">
                    <span className="text-primary mt-0.5">▸</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            )}

            {selectedProject.positioning && (
              <p className="text-xs text-primary/80 font-mono mb-6 italic">→ {selectedProject.positioning}</p>
            )}

            <div className="flex flex-wrap gap-2 mb-6">
              {selectedProject.tech.map((t) => (
                <span key={t} className="font-mono text-xs px-3 py-1 rounded-full border border-border text-muted-foreground">{t}</span>
              ))}
            </div>
            <div className="flex items-center gap-3">
              {selectedProject.link && (
                <a href={selectedProject.link} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-display font-medium text-primary-foreground transition-transform hover:scale-105"
                  style={{ background: "var(--gradient-hero)" }}>
                  View Live <ExternalLink className="h-4 w-4" />
                </a>
              )}
              {selectedProject.githubLink && (
                <a href={selectedProject.githubLink} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-display font-medium border border-border text-foreground hover:border-primary/30 transition-all hover:scale-105">
                  GitHub <Github className="h-4 w-4" />
                </a>
              )}
              {selectedProject.status && (
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-mono text-neon-orange border border-neon-orange/30">
                  🚧 {selectedProject.status}
                </span>
              )}
            </div>
          </motion.div>
        </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectsZone;
