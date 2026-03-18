import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const About = () => {
  return (
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
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-8">
            Crafting Stories Through Visuals
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            I'm a passionate visual storyteller with a deep love for cinematic editing, 
            content that connects, and the bleeding edge of AI-generated art. Every frame 
            I touch is designed to evoke emotion and leave a lasting impression.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed">
            From commercial campaigns to social reels, from brand films to AI-powered 
            concept visuals — I bring a unique blend of technical precision and creative 
            vision to every project.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
