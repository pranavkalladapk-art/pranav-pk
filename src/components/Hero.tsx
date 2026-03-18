import { motion } from "framer-motion";
import profileImg from "@/assets/pranav-profile.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center mesh-gradient overflow-hidden px-6">
      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/5 blur-[120px] animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-secondary/5 blur-[150px] animate-float" style={{ animationDelay: "3s" }} />

      <div className="relative z-10 container mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        {/* Text */}
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
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Pranav
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0 mb-8 font-body leading-relaxed">
            I craft cinematic visuals, high-impact content, and AI-powered creative experiences.
          </p>
          <div className="flex gap-4 justify-center lg:justify-start">
            <a
              href="#portfolio"
              className="px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-body font-medium text-sm tracking-wide glow-primary transition-all duration-300 hover:scale-105"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="px-8 py-3.5 rounded-lg border border-border text-foreground font-body font-medium text-sm tracking-wide transition-all duration-300 hover:border-primary/50 hover:glow-primary"
            >
              Contact Me
            </a>
          </div>
        </motion.div>

        {/* Profile Image */}
        <motion.div
          className="flex-shrink-0"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/30 to-secondary/20 blur-2xl scale-110" />
            <img
              src={profileImg}
              alt="Pranav - Creative Professional"
              className="relative w-64 h-64 md:w-80 md:h-80 object-cover rounded-2xl glow-image"
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
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
};

export default Hero;
