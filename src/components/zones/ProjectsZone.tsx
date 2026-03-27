import { motion } from "framer-motion";
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

const projects: Project[] = [
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

const ProjectCard = ({ project, index, onClick }: { project: Project; index: number; onClick: () => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.08, duration: 0.5 }}
    onClick={onClick}
    className={`group glass-panel rounded-xl p-5 cursor-pointer hover-glow transition-all duration-300 hover:-translate-y-1 ${
      project.featured ? "md:col-span-2 border-primary/20" : ""
    }`}
  >
    <div className="flex items-start justify-between mb-3">
      <div className="flex items-center gap-2">
        <div className={`h-2 w-2 rounded-full ${project.category === "data" ? "bg-neon-green" : "bg-primary"}`} />
        {project.featured && (
          <span className="font-mono text-[10px] uppercase tracking-wider text-primary">Featured</span>
        )}
        {project.status && (
          <span className="font-mono text-[10px] uppercase tracking-wider text-neon-orange">{project.status}</span>
        )}
      </div>
      <div className="flex items-center gap-2">
        {project.githubLink && (
          <Github className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
        )}
        {project.link && (
          <ExternalLink className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
        )}
      </div>
    </div>

    <h3 className="font-display font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
      {project.name}
    </h3>
    <p className="text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-2">
      {project.description}
    </p>
    {project.positioning && (
      <p className="text-[10px] text-primary/70 font-mono mb-3 line-clamp-1">
        → {project.positioning}
      </p>
    )}
    <div className="flex flex-wrap gap-1.5">
      {project.tech.map((t) => (
        <span key={t} className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
          {t}
        </span>
      ))}
    </div>
  </motion.div>
);

const ProjectsZone = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="relative z-10 min-h-screen px-6 py-24 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <span className="font-mono text-xs text-primary tracking-widest uppercase">Portfolio</span>
        <h2 className="text-3xl sm:text-4xl font-display font-bold mt-2">
          <span className="gradient-text">Selected</span> Works
        </h2>
        <p className="text-sm text-muted-foreground mt-2 max-w-md">
          A collection of projects spanning web development and data analysis.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project, i) => (
          <ProjectCard key={project.name} project={project} index={i} onClick={() => setSelectedProject(project)} />
        ))}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-background/80 backdrop-blur-sm"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-panel rounded-2xl p-8 max-w-lg w-full max-h-[80vh] overflow-y-auto"
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
              <p className="text-xs text-primary/80 font-mono mb-6 italic">
                → {selectedProject.positioning}
              </p>
            )}

            <div className="flex flex-wrap gap-2 mb-6">
              {selectedProject.tech.map((t) => (
                <span key={t} className="font-mono text-xs px-3 py-1 rounded-full border border-border text-muted-foreground">
                  {t}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-3">
              {selectedProject.link && (
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-display font-medium text-primary-foreground transition-transform hover:scale-105"
                  style={{ background: "var(--gradient-hero)" }}
                >
                  View Live <ExternalLink className="h-4 w-4" />
                </a>
              )}
              {selectedProject.githubLink && (
                <a
                  href={selectedProject.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-display font-medium border border-border text-foreground hover:border-primary/30 transition-all hover:scale-105"
                >
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
    </div>
  );
};

export default ProjectsZone;
