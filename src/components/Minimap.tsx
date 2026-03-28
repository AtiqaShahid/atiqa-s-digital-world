import { motion } from "framer-motion";

const zones = [
  { id: "hero", label: "Home", icon: "◆" },
  { id: "projects", label: "Projects", icon: "◈" },
  { id: "skills", label: "Skills", icon: "◇" },
  { id: "about", label: "About", icon: "○" },
  { id: "contact", label: "Contact", icon: "◎" },
];

interface MinimapProps {
  activeZone: string;
  onNavigate: (zone: string) => void;
}

const Minimap = ({ activeZone, onNavigate }: MinimapProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-2"
    >
      <div className="glass-panel-subtle rounded-full px-2 py-3 flex flex-col items-center gap-3">
        {zones.map((zone) => (
          <button
            key={zone.id}
            onClick={() => onNavigate(zone.id)}
            className="group relative flex items-center"
          >
            <span className="absolute right-8 glass-panel-subtle rounded px-2 py-1 font-mono text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap capitalize">
              {zone.label}
            </span>
            <div
              className={`h-3 w-3 rounded-full transition-all duration-500 ${
                activeZone === zone.id
                  ? "bg-primary scale-125 shadow-[0_0_12px_hsl(195_100%_50%/0.7)]"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/60 hover:scale-110"
              }`}
            />
          </button>
        ))}
      </div>
      <span className="font-mono text-[8px] text-muted-foreground/40 mt-1 tracking-widest uppercase">
        Navigate
      </span>
    </motion.div>
  );
};

export default Minimap;
