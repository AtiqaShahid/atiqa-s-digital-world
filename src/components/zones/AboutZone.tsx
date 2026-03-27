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
            <h3 className="font-display font-semibold text-lg">The Vision</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            I'm a passionate Full Stack Developer driven by the excitement of turning ideas into powerful, immersive digital experiences. I don't just build websites—I craft environments that feel dynamic, interactive, and alive.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Every project I take on is an opportunity to blend creativity with logic, transforming simple concepts into visually engaging and highly functional platforms.
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
            <h3 className="font-display font-semibold text-lg">The Craft</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            With a strong grip on both frontend and backend development, I enjoy creating seamless systems where design meets performance. From fluid animations and modern UI/UX to robust architectures and API integrations, I focus on delivering experiences that are not only efficient but unforgettable.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            I'm especially drawn to pushing boundaries—adding depth, motion, and personality to make each product stand out.
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
            <h3 className="font-display font-semibold text-lg">The Journey</h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              For me, development is more than a skill—it's a creative process of innovation and problem-solving. I'm constantly exploring new technologies, refining my approach, and aiming to build solutions that make an impact.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Alongside this, I'm currently diving into Data Analysis—learning how to interpret data, uncover insights, and integrate intelligence into applications. It's an evolving journey, and I'm excited to merge development with data to create smarter, more meaningful digital experiences.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutZone;
