import { useState, useCallback, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Film, Megaphone, Sparkles, Play, ChevronDown, ExternalLink, Instagram, Linkedin, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// ----- Data -----
const services = [
  { icon: Film, title: "Video Editing", description: "Cinematic edits, commercials, reels, and brand films crafted with precision and emotion." },
  { icon: Megaphone, title: "Content Creation", description: "Scroll-stopping social media content and branding visuals that amplify your message." },
  { icon: Sparkles, title: "AI Visualization", description: "AI-generated visuals, concept design, and futuristic creative experiences powered by cutting-edge tools." },
];

interface ProjectLink { label: string; url: string; youtubeId?: string; }
interface Project { title: string; category: string; span: string; links: ProjectLink[]; thumbnailYoutubeId?: string; }

const projects: Project[] = [
  {
    title: "Brand Film", category: "Cinematic", span: "md:col-span-2",
    links: [
      { label: "Instagram Reel", url: "https://www.instagram.com/reel/DVixmaCghSe/" },
      { label: "Brand Film", url: "https://drive.google.com/file/d/1aveKwh1DQAobbZVRnZgOpKkPNPsFgO6M/view?usp=sharing" },
      { label: "More Brand Films", url: "https://drive.google.com/drive/folders/1UyqRYxyA50j2lw1Ces2TM9YJJu3LmHN5?usp=sharing" },
    ],
  },
  {
    title: "Commercial Video", category: "Commercial", span: "",
    links: [
      { label: "Product Video", url: "https://drive.google.com/file/d/11XUiwFwHLMcqxwMLrEqPbYZQYcDsowvl/view?usp=sharing" },
      { label: "More Commercial Work", url: "https://drive.google.com/drive/folders/1wapvbBlE1SY6xj_I19cvsNCWXYQJO8fg?usp=sharing" },
    ],
  },
  {
    title: "Reels Campaign", category: "Social Media", span: "",
    links: [
      { label: "Instagram Reel", url: "https://www.instagram.com/reel/DVixmaCghSe/" },
      { label: "More Reels", url: "https://drive.google.com/drive/folders/1voKlqha0voyG1HmhqNj_zgfZwovoY6Jj?usp=sharing" },
    ],
  },
  {
    title: "AI Dreamscape", category: "AI Visuals", span: "",
    links: [
      { label: "Instagram Reel", url: "https://www.instagram.com/reel/DSpvvr5iZ5V/" },
      { label: "More AI Visuals", url: "https://drive.google.com/drive/folders/1Jku5nOI4v299DDuG6T69Fqk_b_IMWe1A?usp=sharing" },
    ],
  },
  {
    title: "Documentary Short", category: "Cinematic", span: "", thumbnailYoutubeId: "V_8y-Ai3x5k",
    links: [{ label: "YouTube", url: "https://youtu.be/V_8y-Ai3x5k", youtubeId: "V_8y-Ai3x5k" }],
  },
  {
    title: "AI Concept", category: "AI Visuals", span: "md:col-span-2",
    links: [{ label: "AI Concept", url: "https://drive.google.com/file/d/1tyxIa8d8opdpQe1E1ABQ-ieQjbSAqufJ/view?usp=sharing" }],
  },
  {
    title: "Explore", category: "Other Contents", span: "",
    links: [
      { label: "Explore Video", url: "https://drive.google.com/file/d/1mJ65SWNIjaeYbf221EFQnwa9Ar-Q6OGi/view?usp=sharing" },
      { label: "More Content", url: "https://drive.google.com/drive/folders/1LVWtoX6psSZgPsSCldt-mAJJhd921LDp?usp=sharing" },
      { label: "Additional Content", url: "https://drive.google.com/drive/folders/1jewetR8SuZCxNigbcUjEa0HRvYHQcNl5?usp=sharing" },
    ],
  },
];

const portfolioColors = [
  "from-primary/20 to-secondary/10",
  "from-secondary/20 to-primary/10",
  "from-primary/15 to-primary/5",
  "from-secondary/15 to-secondary/5",
  "from-primary/10 to-secondary/15",
  "from-secondary/10 to-primary/15",
  "from-primary/20 to-primary/10",
];

const tools = [
  "Adobe Premiere Pro", "After Effects", "DaVinci Resolve", "Google AI",
  "Higgsfield", "Freepik", "Photoshop", "CapCut",
];

// ----- Sections -----
const HeroSection = () => (
  <section className="relative min-h-screen flex items-center justify-center mesh-gradient overflow-hidden px-6">
    <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/5 blur-[120px] animate-float" />
    <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-secondary/5 blur-[150px] animate-float" style={{ animationDelay: "3s" }} />

    <div className="relative z-10 container mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
      <motion.div
        className="flex-1 text-center lg:text-left"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4 font-body">
          Video Editor · Content Creator · AI Visualizer
        </p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-800 text-foreground leading-[0.95] mb-6">
          Hi, I'm{" "}
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Pranav</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0 mb-8 font-body leading-relaxed">
          I craft cinematic visuals, high-impact content, and AI-powered creative experiences.
        </p>
        <div className="flex gap-4 justify-center lg:justify-start">
          <a href="#portfolio" className="px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-body font-medium text-sm tracking-wide glow-primary transition-all duration-300 hover:scale-105">View My Work</a>
          <a href="#contact" className="px-8 py-3.5 rounded-lg border border-border text-foreground font-body font-medium text-sm tracking-wide transition-all duration-300 hover:border-primary/50 hover:glow-primary">Contact Me</a>
        </div>
      </motion.div>
    </div>

    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2"
      animate={{ y: [0, 8, 0] }}
      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
    >
      <div className="w-5 h-8 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-1.5">
        <div className="w-1 h-2 rounded-full bg-muted-foreground/50" />
      </div>
    </motion.div>
  </section>
);

const AboutSection = () => (
  <section id="about" className="py-28 px-6">
    <div className="container mx-auto max-w-3xl">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="text-center"
      >
        <p className="text-sm uppercase tracking-[0.3em] text-primary mb-3 font-body">About</p>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-8">Crafting Stories Through Visuals</h2>
        <p className="text-muted-foreground text-lg leading-relaxed mb-6">
          I'm a passionate visual storyteller with a deep love for cinematic editing, content that connects, and the bleeding edge of AI-generated art. Every frame I touch is designed to evoke emotion and leave a lasting impression.
        </p>
        <p className="text-muted-foreground text-lg leading-relaxed">
          From commercial campaigns to social reels, from brand films to AI-powered concept visuals — I bring a unique blend of technical precision and creative vision to every project.
        </p>
      </motion.div>
    </div>
  </section>
);

const ServicesSection = () => (
  <section id="services" className="py-28 px-6">
    <div className="container mx-auto max-w-5xl">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <p className="text-sm uppercase tracking-[0.3em] text-primary mb-3 font-body">Services</p>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">What I Do</h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {services.map((service, i) => (
          <motion.div
            key={service.title}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="p-8 rounded-xl border border-border bg-card card-glow group"
          >
            <service.icon className="w-8 h-8 text-secondary mb-5 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.5} />
            <h3 className="text-xl font-display font-semibold text-foreground mb-3">{service.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const PortfolioSection = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const trackEvent = useCallback(async (projectTitle: string, eventType: 'view' | 'click', linkLabel?: string, linkUrl?: string) => {
    try {
      await supabase.from('portfolio_events').insert({
        project_title: projectTitle,
        event_type: eventType,
        link_label: linkLabel ?? null,
        link_url: linkUrl ?? null,
      });
    } catch {
      // Silent fail
    }
  }, []);

  const toggleExpand = (index: number) => {
    if (expandedIndex !== index) trackEvent(projects[index].title, 'view');
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
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">Selected Work</h2>
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
              className={`group relative rounded-xl overflow-hidden border border-border flex flex-col ${project.span} ${!project.thumbnailYoutubeId ? `bg-gradient-to-br ${portfolioColors[i]}` : ''}`}
            >
              <div
                className="relative aspect-video flex-1 min-h-0 cursor-pointer"
                onClick={() => project.links.length > 0 && toggleExpand(i)}
              >
                {project.thumbnailYoutubeId && (
                  <img
                    src={`https://img.youtube.com/vi/${project.thumbnailYoutubeId}/hqdefault.jpg`}
                    alt={project.title}
                    width={480}
                    height={360}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                )}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 transition-all duration-500 bg-background/40">
                  <span className="text-xs uppercase tracking-[0.2em] text-secondary/80 mb-2">{project.category}</span>
                  <h3 className="text-lg font-display font-semibold text-foreground text-center">{project.title}</h3>
                </div>
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
                          onClick={() => trackEvent(project.title, 'click', link.label, link.url)}
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

const ToolsSection = () => (
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
        <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">My Toolkit</h2>
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
          <span key={tool} className="px-5 py-2.5 rounded-full glass text-sm text-foreground font-body tracking-wide transition-all duration-300 hover:border-primary/40">
            {tool}
          </span>
        ))}
      </motion.div>
    </div>
  </section>
);

const ContactSection = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    try {
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: { name, email, message },
      });
      if (error) throw error;

      setSubmitted(true);
      toast.success("Message sent successfully!");
      form.reset();
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error('Error:', error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-28 px-6">
      <div className="container mx-auto max-w-2xl">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-primary mb-3 font-body">Contact</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">Let's Create Together</h2>
          <p className="text-muted-foreground text-lg">Let's create something amazing together.</p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-5"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <input type="text" name="name" placeholder="Name" required className="w-full px-5 py-3.5 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground font-body text-sm focus:outline-none focus:border-primary/50 transition-colors" />
            <input type="email" name="email" placeholder="Email" required className="w-full px-5 py-3.5 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground font-body text-sm focus:outline-none focus:border-primary/50 transition-colors" />
          </div>
          <textarea name="message" placeholder="Tell me about your project..." rows={5} required className="w-full px-5 py-3.5 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground font-body text-sm focus:outline-none focus:border-primary/50 transition-colors resize-none" />
          <button type="submit" disabled={loading} className="w-full py-3.5 rounded-lg bg-primary text-primary-foreground font-body font-medium text-sm tracking-wide glow-primary transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-50">
            {submitted ? "Message Sent!" : loading ? "Sending..." : (<>Send Message <Send className="w-4 h-4" strokeWidth={1.5} /></>)}
          </button>
        </motion.form>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center gap-5 mt-12"
        >
          {[
            { icon: Instagram, href: "https://www.instagram.com/an_owner_of_the_wizard_fingers/", label: "Instagram" },
            { icon: Linkedin, href: "https://www.linkedin.com/in/pranav-a-56191b367", label: "LinkedIn" },
          ].map(({ icon: Icon, href, label }) => (
            <a key={label} href={href} aria-label={label} className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-muted-foreground transition-all duration-300 hover:border-primary/50 hover:text-foreground">
              <Icon className="w-5 h-5" strokeWidth={1.5} />
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// ----- Page -----
const Index = () => {
  return (
    <main className="bg-background text-foreground overflow-x-hidden">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <PortfolioSection />
      <ToolsSection />
      <ContactSection />
      <footer className="py-8 text-center text-muted-foreground text-sm font-body border-t border-border">
        © 2026 Pranav. All rights reserved.
      </footer>
    </main>
  );
};

export default Index;
