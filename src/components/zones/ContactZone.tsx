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

  const socialLinks = [
    { icon: Github, label: "GitHub", href: "https://github.com/AtiqaShahid" },
    { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/atiqa-shahid" },
  ];

  return (
    <div className="relative z-10 min-h-screen px-6 py-24 max-w-4xl mx-auto flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
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
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-3 mb-10"
      >
        {socialLinks.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-panel rounded-lg px-5 py-3 flex items-center gap-2 hover-glow transition-all hover:scale-105 group"
          >
            <social.icon className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
            <span className="font-display text-sm text-foreground">{social.label}</span>
          </a>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-panel rounded-xl p-8 w-full max-w-lg"
      >
        <h3 className="font-display font-semibold text-lg mb-6 text-center">Send a Message</h3>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="font-mono text-xs text-muted-foreground mb-1 block">Name</label>
            <input
              type="text"
              placeholder="Your name"
              className="w-full bg-muted/50 border border-border/50 rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors font-display"
            />
          </div>
          <div>
            <label className="font-mono text-xs text-muted-foreground mb-1 block">Email</label>
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full bg-muted/50 border border-border/50 rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors font-display"
            />
          </div>
          <div>
            <label className="font-mono text-xs text-muted-foreground mb-1 block">Message</label>
            <textarea
              rows={4}
              placeholder="Tell me about your project..."
              className="w-full bg-muted/50 border border-border/50 rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors resize-none font-display"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-lg font-display font-medium text-sm text-primary-foreground transition-transform hover:scale-[1.02]"
            style={{ background: "var(--gradient-hero)" }}
          >
            Send Message
          </button>
        </form>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="font-mono text-[10px] text-muted-foreground/40 mt-12 text-center"
      >
        Designed & built by Atiqa Shahid · {new Date().getFullYear()}
      </motion.p>
    </div>
  );
};

export default ContactZone;
