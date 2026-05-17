"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { use } from "react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
};

// Mock data fetcher for UI purposes
const getProjectData = (slug: string) => {
  return {
    title: slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
    category: "Residential",
    location: "Bangalore, India",
    year: "2025",
    area: "4,500 sqft",
    heroImage: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2940&auto=format&fit=crop",
    narrative: "Designed with a deep respect for the existing landscape, this project blurs the boundaries between the built environment and the natural world. The structure emerges organically, utilizing locally sourced materials to create a sustainable dialogue with its context. The core philosophy was to craft spaces that breathe, utilizing cross-ventilation and natural light to dictate the rhythm of the day.",
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2940&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2940&auto=format&fit=crop"
    ],
    fullWidthImage: "https://images.unsplash.com/photo-1600607687644-aac4c1566905?q=80&w=2940&auto=format&fit=crop",
  };
};

export default function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const project = getProjectData(resolvedParams.slug);

  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <section className="relative h-screen w-full">
        <Image
          src={project.heroImage}
          alt={project.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20" />
      </section>

      {/* Metadata & Title */}
      <section className="py-24 px-6 container mx-auto">
        <Link href="/projects" className="inline-flex items-center gap-2 text-sm uppercase tracking-widest hover:text-saffron transition-colors mb-16">
          <ArrowLeft size={16} /> Back to Projects
        </Link>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-8">
            <motion.h1 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tighter mb-8"
            >
              {project.title}
            </motion.h1>
          </div>
          <div className="md:col-span-4 md:mt-auto">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="grid grid-cols-2 gap-y-6 text-sm"
            >
              <div>
                <p className="text-muted tracking-widest uppercase text-xs mb-1">Location</p>
                <p>{project.location}</p>
              </div>
              <div>
                <p className="text-muted tracking-widest uppercase text-xs mb-1">Category</p>
                <p>{project.category}</p>
              </div>
              <div>
                <p className="text-muted tracking-widest uppercase text-xs mb-1">Year</p>
                <p>{project.year}</p>
              </div>
              <div>
                <p className="text-muted tracking-widest uppercase text-xs mb-1">Area</p>
                <p>{project.area}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Narrative */}
      <section className="py-24 px-6 container mx-auto">
        <div className="max-w-4xl mx-auto">
          <motion.p 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-2xl md:text-4xl font-light leading-relaxed tracking-tight"
          >
            {project.narrative}
          </motion.p>
        </div>
      </section>

      {/* Masonry Gallery */}
      <section className="py-24 px-6 container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
          {project.gallery.map((img, idx) => (
            <motion.div
              key={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className={`relative ${idx % 2 === 0 ? "aspect-[4/5]" : "aspect-[3/4] md:mt-24"} bg-muted/20`}
            >
              <Image src={img} alt="Gallery Image" fill className="object-cover" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Full Width Impact */}
      <section className="py-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="relative h-[80vh] w-full"
        >
          <Image src={project.fullWidthImage} alt="Details" fill className="object-cover" />
        </motion.div>
      </section>

      {/* Next Project CTA */}
      <section className="py-32 bg-foreground text-background">
        <div className="container mx-auto px-6 flex flex-col items-center text-center">
          <span className="uppercase tracking-widest text-xs text-muted mb-8">Next Project</span>
          <Link href="/projects/serenity-pavilion" className="group">
            <h2 className="text-4xl md:text-7xl font-light tracking-tighter hover:text-saffron transition-colors duration-500 flex items-center gap-6">
              Serenity Pavilion <ArrowRight size={48} className="opacity-0 -translate-x-10 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500" />
            </h2>
          </Link>
        </div>
      </section>
    </div>
  );
}
