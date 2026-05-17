"use client";

import { motion, Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
};

export default function PhilosophyPage() {
  return (
    <div className="bg-background min-h-screen pt-32 pb-32">
      <section className="px-6 container mx-auto">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="max-w-3xl mb-32"
        >
          <span className="text-saffron uppercase tracking-widest text-xs font-medium mb-6 block">Our Ethos</span>
          <h1 className="text-4xl md:text-6xl font-light tracking-tight leading-tight">
            We believe that architecture should evoke emotion, respect the earth, and stand the test of time.
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="md:col-span-6 md:col-start-7"
          >
            <h2 className="text-2xl font-light mb-6 text-foreground">Spatial Purity</h2>
            <p className="text-muted leading-relaxed tracking-wide mb-16 text-lg">
              We seek the purest form of space. By reducing elements to their essential state, we allow light, shadow, and materiality to speak the loudest. Whitespace is not empty; it is the canvas upon which life unfolds.
            </p>

            <h2 className="text-2xl font-light mb-6 text-foreground">Honest Materiality</h2>
            <p className="text-muted leading-relaxed tracking-wide mb-16 text-lg">
              Materials should age gracefully, acquiring patina and character over time. We favor exposed concrete, natural wood, raw steel, and locally sourced stone &mdash; materials that ground a structure to its environment.
            </p>

            <h2 className="text-2xl font-light mb-6 text-foreground">Human-Centric Design</h2>
            <p className="text-muted leading-relaxed tracking-wide text-lg">
              Ultimately, we design for the human scale. How does a space make you feel when you enter it? How does the acoustics shape a conversation? Our architecture is a quiet backdrop to the vibrant lives lived within it.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
