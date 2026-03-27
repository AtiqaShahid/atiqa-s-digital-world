import { motion } from "framer-motion";
import { useState } from "react";

interface SkillCategory {
  name: string;
  color: string;
  skills: string[];
}

const categories: SkillCategory[] = [
  {
    name: "Frontend",
    color: "text-primary",
    skills: ["HTML", "CSS", "JavaScript", "React", "Responsive Design"],
  },
  {
    name: "Full Stack",
    color: "text-neon-purple",
    skills: ["Full Stack Development", "REST APIs", "Node.js"],
  },
  {
    name: "Data Tools",
    color: "text-neon-green",
    skills: ["Python", "SQL", "Power BI", "Tableau", "NumPy", "Pandas", "Matplotlib"],
  },
  {
    name: "Dev Tools",
    color: "text-neon-orange",
    skills: ["Git", "GitHub", "VS Code", "CLI"],
  },
  {
    name: "Soft Skills",
    color: "text-neon-pink",
    skills: ["Problem Solving", "Critical Thinking", "Team Collaboration", "Creativity"],
  },
];

const SkillNode = ({ skill, index, catIndex }: { skill: string; index: number; catIndex: number }) => {
  const [hovered, setHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: catIndex * 0.1 + index * 0.05, type: "spring", stiffness: 300 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative px-4 py-2 rounded-lg font-mono text-xs cursor-default transition-all duration-300 ${
        hovered
          ? "glass-panel shadow-[var(--shadow-neon)] scale-110"
          : "glass-panel-subtle"
      }`}
    >
      {skill}
      {hovered && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-primary"
        />
      )}
    </motion.div>
  );
};

const SkillsZone = () => {
  return (
    <div className="relative z-10 min-h-screen px-6 py-24 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <span className="font-mono text-xs text-neon-green tracking-widest uppercase">Capabilities</span>
        <h2 className="text-3xl sm:text-4xl font-display font-bold mt-2">
          <span className="gradient-text">Skills</span> Lab
        </h2>
        <p className="text-sm text-muted-foreground mt-2 max-w-md">
          An evolving toolkit across web development, data analysis, and beyond.
        </p>
      </motion.div>

      {/* Terminal Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-panel rounded-xl overflow-hidden mb-8"
      >
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/50">
          <div className="h-3 w-3 rounded-full bg-destructive/60" />
          <div className="h-3 w-3 rounded-full bg-neon-orange/60" />
          <div className="h-3 w-3 rounded-full bg-neon-green/60" />
          <span className="font-mono text-[10px] text-muted-foreground ml-2">skills_lab.tsx</span>
        </div>
        <div className="p-6">
          <p className="font-mono text-xs text-muted-foreground mb-1">
            <span className="text-neon-purple">const</span> <span className="text-primary">developer</span> = {"{"} 
          </p>
          <p className="font-mono text-xs text-muted-foreground ml-4">
            <span className="text-neon-green">name</span>: <span className="text-neon-orange">"Atiqa Shahid"</span>,
          </p>
          <p className="font-mono text-xs text-muted-foreground ml-4">
            <span className="text-neon-green">role</span>: <span className="text-neon-orange">"Full Stack Developer"</span>,
          </p>
          <p className="font-mono text-xs text-muted-foreground ml-4">
            <span className="text-neon-green">passion</span>: <span className="text-neon-orange">"Building beautiful, functional things"</span>,
          </p>
          <p className="font-mono text-xs text-muted-foreground ml-4">
            <span className="text-neon-green">learning</span>: <span className="text-neon-orange">"Data Analysis & Visualization"</span>
          </p>
          <p className="font-mono text-xs text-muted-foreground">{"};"}</p>
        </div>
      </motion.div>

      <div className="space-y-8">
        {categories.map((cat, catIndex) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: catIndex * 0.1 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`h-1.5 w-1.5 rounded-full ${cat.color.replace("text-", "bg-")}`} />
              <h3 className={`font-display font-semibold text-sm ${cat.color}`}>{cat.name}</h3>
              <div className="flex-1 h-px bg-border/30" />
            </div>
            <div className="flex flex-wrap gap-2">
              {cat.skills.map((skill, i) => (
                <SkillNode key={skill} skill={skill} index={i} catIndex={catIndex} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SkillsZone;
