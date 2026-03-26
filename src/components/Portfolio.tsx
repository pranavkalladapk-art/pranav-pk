import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ChevronDown, ExternalLink } from "lucide-react";

interface ProjectLink {
  label: string;
  url: string;
  youtubeId?: string;
}

interface Project {
  title: string;
  category: string;
  span: string;
  links: ProjectLink[];
  thumbnailYoutubeId?: string;
}

const projects: Project[] = [
  {
    title: "Brand Film",
    category: "Cinematic",
    span: "md:col-span-2",
    thumbnailYoutubeId: undefined,
    links: [
      { label: "Instagram Reel", url: "https://www.instagram.com/reel/DVixmaCghSe/" },
      { label: "Brand Film", url: "https://drive.google.com/file/d/1aveKwh1DQAobbZVRnZgOpKkPNPsFgO6M/view?usp=sharing" },
    ],
  },
  {
    title: "Product Video",
    category: "Commercial",
    span: "",
    links: [
      { label: "Product Video", url: "https://drive.google.com/file/d/11XUiwFwHLMcqxwMLrEqPbYZQYcDsowvl/view?usp=sharing" },
    ],
  },
  {
    title: "Reels Campaign",
    category: "Social Media",
    span: "",
    links: [
      { label: "Instagram Reel", url: "https://www.instagram.com/reel/DVixmaCghSe/" },
    ],
  },
  {
    title: "AI Dreamscape",
    category: "AI Visuals",
    span: "",
    links: [
      { label: "Instagram Reel", url: "https://www.instagram.com/reel/DSpvvr5iZ5V/" },
    ],
  },
  {
    title: "Documentary Short",
    category: "Cinematic",
    span: "",
    thumbnailYoutubeId: "V_8y-Ai3x5k",
    links: [
      { label: "YouTube", url: "https://youtu.be/V_8y-Ai3x5k", youtubeId: "V_8y-Ai3x5k" },
    ],
  },
  {
    title: "AI Concept",
    category: "AI Visuals",
    span: "md:col-span-2",
    links: [
      { label: "AI Concept", url: "https://drive.google.com/file/d/1tyxIa8d8opdpQe1E1ABQ-ieQjbSAqufJ/view?usp=sharing" },
    ],
  },
  {
    title: "Explore",
    category: "Other Main Contents",
    span: "",
    links: [],
  },
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
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

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
            <motion.div
              key={project.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`group relative rounded-xl overflow-hidden border border-border flex flex-col ${project.span} ${!project.thumbnailYoutubeId ? `bg-gradient-to-br ${colors[i]}` : ''}`}
            >
              {/* Card visual */}
              <div
                className="relative aspect-video flex-1 min-h-0 cursor-pointer"
                onClick={() => project.links.length > 0 && toggleExpand(i)}
              >
                {project.thumbnailYoutubeId && (
                  <img
                    src={`https://img.youtube.com/vi/${project.thumbnailYoutubeId}/hqdefault.jpg`}
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
                {project.links.length > 0 && (
                  <div className="absolute inset-0 bg-background/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="flex items-center gap-2">
                      <Play className="w-5 h-5 text-foreground" strokeWidth={1.5} />
                      <span className="text-sm text-foreground font-body">{project.links.length} {project.links.length === 1 ? 'video' : 'videos'}</span>
                      <ChevronDown className={`w-4 h-4 text-foreground transition-transform duration-300 ${expandedIndex === i ? 'rotate-180' : ''}`} />
                    </div>
                  </div>
                )}
              </div>

              {/* Expandable links list */}
              <AnimatePresence>
                {expandedIndex === i && project.links.length > 0 && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden bg-background/80 backdrop-blur-sm border-t border-border"
                  >
                    <div className="p-3 space-y-1">
                      {project.links.map((link, j) => (
                        <a
                          key={j}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-foreground/80 hover:text-foreground hover:bg-primary/10 transition-colors font-body"
                        >
                          <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
