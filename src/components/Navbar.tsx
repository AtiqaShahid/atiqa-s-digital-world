import { motion } from "framer-motion";

const zones = [
  { id: "hero", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

interface NavbarProps {
  activeZone: string;
  onNavigate: (zone: string) => void;
}

const Navbar = ({ activeZone, onNavigate }: NavbarProps) => {
  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
    >
      <button onClick={() => onNavigate("hero")} className="flex items-center gap-2 group">
        <div className="h-8 w-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
          <span className="neon-text font-bold text-sm">A</span>
        </div>
        <span className="font-display font-semibold text-foreground text-sm hidden sm:block">
          Atiqa Shahid
        </span>
      </button>

      <div className="glass-panel-subtle rounded-full px-1 py-1 flex gap-1">
        {zones.map((zone) => (
          <button
            key={zone.id}
            onClick={() => onNavigate(zone.id)}
            className={`relative px-4 py-2 rounded-full text-xs font-display font-medium transition-all duration-300 ${
              activeZone === zone.id
                ? "text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {activeZone === zone.id && (
              <motion.div
                layoutId="nav-active"
                className="absolute inset-0 rounded-full"
                style={{ background: "var(--gradient-hero)" }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{zone.label}</span>
          </button>
        ))}
      </div>

      <div className="w-24" />
    </motion.nav>
  );
};

export default Navbar;
