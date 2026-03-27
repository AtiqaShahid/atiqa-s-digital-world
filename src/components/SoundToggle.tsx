import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

interface SoundToggleProps {
  muted: boolean;
  onToggle: () => void;
}

const SoundToggle = ({ muted, onToggle }: SoundToggleProps) => {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.8 }}
      onClick={onToggle}
      className="fixed bottom-6 right-6 z-50 glass-panel rounded-full p-3 hover-glow transition-all hover:scale-110"
      title={muted ? "Unmute sounds" : "Mute sounds"}
    >
      {muted ? (
        <VolumeX className="h-4 w-4 text-muted-foreground" />
      ) : (
        <Volume2 className="h-4 w-4 text-primary" />
      )}
    </motion.button>
  );
};

export default SoundToggle;
