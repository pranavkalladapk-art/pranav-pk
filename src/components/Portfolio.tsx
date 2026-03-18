import { motion } from "framer-motion";
import { Play } from "lucide-react";

const projects = [
  { title: "Brand Film — Luxe", category: "Cinematic", span: "md:col-span-2", youtubeId: null },
  { title: "Product Launch", category: "Commercial", span: "", youtubeId: null },
  { title: "Reels Campaign", category: "Social Media", span: "", youtubeId: null },
  { title: "AI Dreamscape", category: "AI Visuals", span: "", youtubeId: null },
  { title: "Documentary Short", category: "Cinematic", span: "", youtubeId: "V_8y-Ai3x5k" },
  { title: "AI Concept Art", category: "AI Visuals", span: "md:col-span-2", youtubeId: null },
];

const colors = [
  "from-primary/20 to-secondary/10",
  "from-secondary/20 to-primary/10",
  "from-primary/15 to-primary/5",
  "from-secondary/15 to-secondary/5",
  "from-primary/10 to-secondary/15",
  "from-secondary/10 to-primary/15",
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Portfolio = () => {
  return (
    <section id="portfolio" className="py-28 px-6">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-primary mb-3 font-body">Portfolio</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
            Selected Work
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4">
          {projects.map((project, i) => (
            <motion.a
              key={project.title}
              href={project.youtubeId ? `https://youtu.be/${project.youtubeId}` : "#"}
              target={project.youtubeId ? "_blank" : undefined}
              rel={project.youtubeId ? "noopener noreferrer" : undefined}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`group relative rounded-xl overflow-hidden cursor-pointer aspect-video border border-border ${project.span} ${!project.youtubeId ? `bg-gradient-to-br ${colors[i]}` : ''}`}
            >
              {project.youtubeId && (
                <img
                  src={`https://img.youtube.com/vi/${project.youtubeId}/hqdefault.jpg`}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              )}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 transition-all duration-500 bg-background/40">
                <span className="text-xs uppercase tracking-[0.2em] text-secondary/80 mb-2">{project.category}</span>
                <h3 className="text-lg font-display font-semibold text-foreground text-center">{project.title}</h3>
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-background/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-14 h-14 rounded-full border-2 border-foreground/60 flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-500">
                  <Play className="w-6 h-6 text-foreground ml-0.5" strokeWidth={1.5} />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
