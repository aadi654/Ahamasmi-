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

const imageReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } },
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
    visualImages: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2940&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687644-aac4c1566905?q=80&w=2940&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2940&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2940&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=80&w=2940&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?q=80&w=2940&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=2940&auto=format&fit=crop",
    ],
  };
};

export default function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const project = getProjectData(resolvedParams.slug);

  return (
    <div className="bg-background min-h-screen">
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

      {/* Large Hero Image */}
      <section className="pb-32 px-6 container mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={imageReveal}
          className="group relative min-h-[70vh] overflow-hidden bg-muted/20 md:aspect-[16/9]"
        >
          <Image
            src={project.visualImages[0]}
            alt={`${project.title} primary view`}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            priority
          />
        </motion.div>
      </section>

      {/* Full Width Image */}
      <section className="py-16 md:py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={imageReveal}
          className="group relative h-[80vh] w-full overflow-hidden bg-muted/20"
        >
          <Image
            src={project.visualImages[1]}
            alt={`${project.title} wide architectural view`}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        </motion.div>
      </section>

      {/* Two Column Detail Image Grid */}
      <section className="py-24 md:py-32 px-6 container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {project.visualImages.slice(2, 4).map((img, idx) => (
            <motion.div
              key={img}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={imageReveal}
              className={`group relative overflow-hidden bg-muted/20 ${idx === 0 ? "aspect-[4/5]" : "aspect-[3/4]"}`}
            >
              <Image
                src={img}
                alt={`${project.title} detail ${idx + 1}`}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Large Full Width Image */}
      <section className="py-16 md:py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={imageReveal}
          className="group relative h-[78vh] w-full overflow-hidden bg-muted/20"
        >
          <Image
            src={project.visualImages[4]}
            alt={`${project.title} spatial view`}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        </motion.div>
      </section>

      {/* Single Detail Image */}
      <section className="py-24 md:py-32 px-6 container mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={imageReveal}
          className="group relative mx-auto aspect-[4/5] max-w-4xl overflow-hidden bg-muted/20"
        >
          <Image
            src={project.visualImages[5]}
            alt={`${project.title} material detail`}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        </motion.div>
      </section>

      {/* Closing Image */}
      <section className="pt-16 pb-24 md:pt-24 md:pb-32">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={imageReveal}
          className="group relative h-[82vh] w-full overflow-hidden bg-muted/20"
        >
          <Image
            src={project.visualImages[6]}
            alt={`${project.title} closing view`}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
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
