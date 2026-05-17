"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
};

export default function StudioPage() {
  return (
    <div className="bg-background min-h-screen pt-32 pb-24">
      {/* Header */}
      <section className="px-6 container mx-auto mb-24">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="max-w-4xl"
        >
          <h1 className="text-5xl md:text-8xl font-light tracking-tighter mb-8">The Studio</h1>
          <p className="text-2xl md:text-3xl font-light leading-relaxed text-muted max-w-2xl text-balance">
            We are a collective of architects, thinkers, and makers dedicated to crafting spaces that resonate with the human spirit.
          </p>
        </motion.div>
      </section>

      {/* Hero Image */}
      <section className="px-6 container mx-auto mb-32">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="relative h-[60vh] md:h-[80vh] w-full bg-muted/20"
        >
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2938&auto=format&fit=crop"
            alt="Studio Interior"
            fill
            className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            priority
          />
        </motion.div>
      </section>

      {/* Values/Culture */}
      <section className="px-6 container mx-auto mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
          >
            <h2 className="text-3xl font-light tracking-tight mb-6">Our Process</h2>
            <p className="text-muted leading-relaxed tracking-wide mb-6">
              Every project begins with deep listening. We immerse ourselves in the site&apos;s history, the local climate, and the client&apos;s aspirations. By stripping away the unnecessary, we uncover the essence of the space.
            </p>
            <p className="text-muted leading-relaxed tracking-wide">
              We prototype, iterate, and obsess over details. The transition of materials, the play of light at different times of the day &mdash; everything is meticulously planned.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
          >
            <div className="relative aspect-square w-full md:w-4/5 ml-auto bg-muted/20">
              <Image
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2831&auto=format&fit=crop"
                alt="Process & Models"
                fill
                className="object-cover grayscale"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
