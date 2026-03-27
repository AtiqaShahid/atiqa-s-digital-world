import { motion } from "framer-motion";

const AboutZone = () => {
  return (
    <div className="relative z-10 min-h-screen px-6 py-24 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <span className="font-mono text-xs text-neon-purple tracking-widest uppercase">Story</span>
        <h2 className="text-3xl sm:text-4xl font-display font-bold mt-2">
          <span className="gradient-text">About</span> Me
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-panel rounded-xl p-6 space-y-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="h-6 w-1 rounded-full bg-primary" />
            <h3 className="font-display font-semibold text-lg">The Journey</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            I started as a curious learner fascinated by how websites come to life. That curiosity turned into a passion 
            for full-stack development — crafting experiences that are both beautiful and functional.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            From building responsive landing pages to developing full-stack platforms, each project has been a step 
            deeper into the craft. I don't just write code — I solve problems creatively.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-panel rounded-xl p-6 space-y-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="h-6 w-1 rounded-full bg-neon-purple" />
            <h3 className="font-display font-semibold text-lg">What Drives Me</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            I believe great software sits at the intersection of design thinking, technical precision, and user empathy. 
            That's the sweet spot I aim for with every project.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Currently expanding into data analysis — learning Python, SQL, Power BI, and Tableau to bring 
            data-driven insights into my development workflow and unlock new ways of building smarter products.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-panel rounded-xl p-6 md:col-span-2"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="h-6 w-1 rounded-full bg-neon-green" />
            <h3 className="font-display font-semibold text-lg">Quick Facts</h3>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { label: "Focus", value: "Full Stack Development", icon: "🚀" },
              { label: "Growing In", value: "Data Analysis & Visualization", icon: "📊" },
              { label: "Philosophy", value: "Build beautiful, functional things", icon: "✨" },
            ].map((fact) => (
              <div key={fact.label} className="glass-panel-subtle rounded-lg p-4 text-center">
                <span className="text-2xl mb-2 block">{fact.icon}</span>
                <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider mb-1">{fact.label}</p>
                <p className="text-sm font-display font-medium text-foreground">{fact.value}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutZone;
