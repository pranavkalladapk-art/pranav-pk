import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Tools from "@/components/Tools";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <main className="bg-background text-foreground overflow-x-hidden">
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Tools />
      <Contact />
      <footer className="py-8 text-center text-muted-foreground text-sm font-body border-t border-border">
        © 2026 Pranav. All rights reserved.
      </footer>
    </main>
  );
};

export default Index;
