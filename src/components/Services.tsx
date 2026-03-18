import { motion } from "framer-motion";
import { Film, Megaphone, Sparkles } from "lucide-react";

const services = [
  {
    icon: Film,
    title: "Video Editing",
    description: "Cinematic edits, commercials, reels, and brand films crafted with precision and emotion.",
  },
  {
    icon: Megaphone,
    title: "Content Creation",
    description: "Scroll-stopping social media content and branding visuals that amplify your message.",
  },
  {
    icon: Sparkles,
    title: "AI Visualization",
    description: "AI-generated visuals, concept design, and futuristic creative experiences powered by cutting-edge tools.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Services = () => {
  return (
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
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
            What I Do
          </h2>
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
};

export default Services;
