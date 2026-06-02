"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";

const MotionLink = motion.create(Link);

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
};

const stagger: Variants = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function Home() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        <Image
          src="/ahamasmi-hero-approved-final.jpg"
          alt="Ahamasmi Architecture Hero"
          fill
          className="object-cover scale-105"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
        
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 lg:p-24 pb-24 md:pb-24">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="text-white max-w-4xl"
          >
            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl lg:text-9xl font-light tracking-tighter mb-4">
              Spatial
            </motion.h1>
            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl lg:text-9xl font-light tracking-tighter mb-8 md:mb-12 text-saffron">
              Narratives
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg md:text-xl font-light tracking-wide max-w-lg opacity-90">
              We design environments that blur the boundaries between nature, culture, and human experience.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Preview */}
      <section className="py-32 md:py-48 px-6 container mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="max-w-5xl mx-auto"
        >
          <p className="text-3xl md:text-5xl lg:text-6xl font-light leading-[1.2] md:leading-tight tracking-tight text-foreground text-balance">
            Architecture is not just about building structures. It is the art of <span className="text-saffron italic">shaping experiences</span> and crafting timeless connections between humans and space.
          </p>
          <div className="mt-16 border-t border-foreground/10 pt-8 flex items-center justify-between">
            <span className="uppercase tracking-widest text-xs font-medium text-muted">Ahamasmi Studio</span>
            <Link href="/philosophy" className="group flex items-center gap-2 text-sm uppercase tracking-widest hover:text-saffron transition-colors">
              Our Philosophy <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Featured Projects */}
      <section className="py-24 px-6 container mx-auto">
        <div className="flex justify-between items-end mb-16 md:mb-24">
          <h2 className="text-4xl md:text-6xl font-light tracking-tight">Selected Works</h2>
          <Link href="/projects" className="hidden md:flex items-center gap-2 uppercase tracking-widest text-xs hover:text-saffron transition-colors group">
            View All <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
          {/* Project 1 */}
          <MotionLink
            href="/projects/the-courtyard-house"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="group block mt-0 md:mt-24"
          >
            <div className="relative aspect-[4/5] overflow-hidden mb-6 bg-muted/20">
              <Image
                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2940&auto=format&fit=crop"
                alt="The Courtyard House"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </div>
            <h3 className="text-2xl font-light mb-2 group-hover:text-saffron transition-colors">The Courtyard House</h3>
            <p className="text-muted tracking-wide text-sm">Residential &mdash; Bangalore</p>
          </MotionLink>

          {/* Project 2 */}
          <MotionLink
            href="/projects/serenity-pavilion"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="group block"
          >
            <div className="relative aspect-[3/4] overflow-hidden mb-6 bg-muted/20">
              <Image
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2940&auto=format&fit=crop"
                alt="Serenity Pavilion"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </div>
            <h3 className="text-2xl font-light mb-2 group-hover:text-saffron transition-colors">Serenity Pavilion</h3>
            <p className="text-muted tracking-wide text-sm">Cultural &mdash; Kerala</p>
          </MotionLink>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 md:py-48 bg-foreground text-background">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-5xl md:text-8xl font-light tracking-tighter mb-8">Start a Project</h2>
            <p className="text-muted text-lg md:text-xl max-w-2xl mx-auto mb-16 font-light">
              Let&apos;s collaborate to build something extraordinary. We are currently accepting new commissions for 2027.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-4 text-background bg-saffron px-8 py-4 rounded-full text-sm uppercase tracking-widest hover:bg-white hover:text-foreground transition-colors duration-300"
            >
              Contact Us <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
