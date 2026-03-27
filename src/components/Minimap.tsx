import { motion } from "framer-motion";

const zones = [
  { id: "hero", label: "H", y: 0 },
  { id: "projects", label: "P", y: 1 },
  { id: "skills", label: "S", y: 2 },
  { id: "about", label: "A", y: 3 },
  { id: "contact", label: "C", y: 4 },
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
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-3 hidden md:flex"
    >
      {zones.map((zone) => (
        <button
          key={zone.id}
          onClick={() => onNavigate(zone.id)}
          className="group relative flex items-center"
        >
          <span className="absolute right-8 font-mono text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap capitalize">
            {zone.id}
          </span>
          <div
            className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
              activeZone === zone.id
                ? "bg-primary scale-125 shadow-[0_0_10px_hsl(195_100%_50%/0.6)]"
                : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
            }`}
          />
        </button>
      ))}
    </motion.div>
  );
};

export default Minimap;
