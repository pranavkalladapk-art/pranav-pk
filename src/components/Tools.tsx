import { motion } from "framer-motion";

const tools = [
  "Adobe Premiere Pro",
  "After Effects",
  "DaVinci Resolve",
  "Google AI",
  "Higgsfield",
  "Freepik",
  "Photoshop",
  "CapCut",
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Tools = () => {
  return (
    <section id="tools" className="py-28 px-6">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-primary mb-3 font-body">Tools</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
            My Toolkit
          </h2>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {tools.map((tool) => (
            <span
              key={tool}
              className="px-5 py-2.5 rounded-full glass text-sm text-foreground font-body tracking-wide transition-all duration-300 hover:border-primary/40"
            >
              {tool}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Tools;
