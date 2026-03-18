import { motion } from "framer-motion";
import { Instagram, Linkedin, Youtube, Send } from "lucide-react";
import { useState, FormEvent } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
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
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
            Let's Create Together
          </h2>
          <p className="text-muted-foreground text-lg">
            Let's create something amazing together.
          </p>
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
            <input
              type="text"
              placeholder="Name"
              required
              className="w-full px-5 py-3.5 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground font-body text-sm focus:outline-none focus:border-primary/50 transition-colors"
            />
            <input
              type="email"
              placeholder="Email"
              required
              className="w-full px-5 py-3.5 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground font-body text-sm focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>
          <textarea
            placeholder="Tell me about your project..."
            rows={5}
            required
            className="w-full px-5 py-3.5 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground font-body text-sm focus:outline-none focus:border-primary/50 transition-colors resize-none"
          />
          <button
            type="submit"
            className="w-full py-3.5 rounded-lg bg-primary text-primary-foreground font-body font-medium text-sm tracking-wide glow-primary transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
          >
            {submitted ? "Message Sent!" : (
              <>
                Send Message <Send className="w-4 h-4" strokeWidth={1.5} />
              </>
            )}
          </button>
        </motion.form>

        {/* Social links */}
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
            { icon: Linkedin, href: "#", label: "LinkedIn" },
            { icon: Youtube, href: "#", label: "YouTube" },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-muted-foreground transition-all duration-300 hover:border-primary/50 hover:text-foreground"
            >
              <Icon className="w-5 h-5" strokeWidth={1.5} />
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
