import { motion } from "framer-motion";
import { Mail, MapPin, Copy, Check, Github, Linkedin } from "lucide-react";
import { useState } from "react";

const ContactZone = () => {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  };

  const contactInfo = [
    { icon: Mail, label: "Email", value: "atiqashahid03011@gmail.com", field: "email" },
    { icon: MapPin, label: "Location", value: "Pakistan", field: "location" },
  ];

  return (
    <div className="relative z-10 h-full px-6 py-20 max-w-4xl mx-auto flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <span className="font-mono text-xs text-neon-pink tracking-widest uppercase">Connect</span>
        <h2 className="text-3xl sm:text-5xl font-display font-bold mt-2 mb-4">
          Let's Build Something{" "}
          <span className="gradient-text">Great</span>
        </h2>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          Have an idea, project, or just want to chat? I'd love to hear from you.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-4 w-full max-w-md mb-6">
        {contactInfo.map((info, i) => (
          <motion.button
            key={info.field}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => copyToClipboard(info.value, info.field)}
            className="glass-panel rounded-xl p-5 text-center hover-glow transition-all group"
          >
            <info.icon className="h-5 w-5 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider mb-1">{info.label}</p>
            <p className="text-sm font-display text-foreground">{info.value}</p>
            <div className="mt-2 flex items-center justify-center gap-1 text-[10px] text-muted-foreground">
              {copied === info.field ? (
                <><Check className="h-3 w-3 text-neon-green" /> Copied!</>
              ) : (
                <><Copy className="h-3 w-3" /> Click to copy</>
              )}
            </div>
          </motion.button>
        ))}
      </div>

      {/* Social Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex items-center gap-3 mb-8"
      >
        <a
          href="https://github.com/AtiqaShahid"
          target="_blank"
          rel="noopener noreferrer"
          className="glass-panel rounded-lg px-5 py-3 flex items-center gap-2 hover-glow transition-all hover:scale-105 group"
        >
          <Github className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
          <span className="font-display text-sm text-foreground">GitHub</span>
        </a>
        <a
          href="https://www.linkedin.com/in/atiqa-shahid/"
          target="_blank"
          rel="noopener noreferrer"
          className="glass-panel rounded-lg px-5 py-3 flex items-center gap-2 transition-all hover:scale-110 group"
          style={{
            boxShadow: "0 0 20px hsl(195 100% 50% / 0.2), 0 0 40px hsl(270 80% 60% / 0.1)",
          }}
        >
          <Linkedin className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
          <span className="font-display text-sm text-foreground">LinkedIn</span>
        </a>
      </motion.div>

      {/* Primary LinkedIn CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-panel rounded-xl p-8 w-full max-w-lg text-center"
      >
        <h3 className="font-display font-semibold text-lg mb-3">Ready to connect?</h3>
        <p className="text-sm text-muted-foreground mb-6">LinkedIn is the fastest way to reach me.</p>
        <a
          href="https://www.linkedin.com/in/atiqa-shahid/"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-display font-medium text-sm text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_hsl(195_100%_50%/0.4),0_0_60px_hsl(270_80%_60%/0.2)]"
          style={{ background: "var(--gradient-hero)" }}
        >
          <Linkedin className="h-5 w-5 group-hover:rotate-6 transition-transform" />
          Connect on LinkedIn
        </a>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="font-mono text-[10px] text-muted-foreground/40 mt-10 text-center"
      >
        Designed & built by Atiqa Shahid · {new Date().getFullYear()}
      </motion.p>
    </div>
  );
};

export default ContactZone;
