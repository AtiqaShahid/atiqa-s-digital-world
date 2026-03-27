import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Copy, Check } from "lucide-react";
import { useState } from "react";

const ContactZone = () => {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  };

  const contactInfo = [
    { icon: Mail, label: "Email", value: "atiqashahid@email.com", field: "email" },
    { icon: Phone, label: "Phone", value: "+92 XXX XXXXXXX", field: "phone" },
    { icon: MapPin, label: "Location", value: "Pakistan", field: "location" },
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

      <div className="grid sm:grid-cols-3 gap-4 w-full max-w-2xl mb-10">
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
