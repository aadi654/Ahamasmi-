"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const categories = ["All", "Residential", "Cultural", "Commercial"];

const projects = [
  {
    id: "the-courtyard-house",
    title: "The Courtyard House",
    category: "Residential",
    location: "Bangalore",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2940&auto=format&fit=crop",
    aspect: "aspect-[4/5]",
  },
  {
    id: "serenity-pavilion",
    title: "Serenity Pavilion",
    category: "Cultural",
    location: "Kerala",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2940&auto=format&fit=crop",
    aspect: "aspect-[3/4]",
  },
  {
    id: "urban-oasis",
    title: "Urban Oasis",
    category: "Commercial",
    location: "Mumbai",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2940&auto=format&fit=crop",
    aspect: "aspect-square",
  },
  {
    id: "hillside-retreat",
    title: "Hillside Retreat",
    category: "Residential",
    location: "Pune",
    image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=2788&auto=format&fit=crop",
    aspect: "aspect-[4/3]",
  }
];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = projects.filter(
    (p) => activeCategory === "All" || p.category === activeCategory
  );

  return (
    <div className="bg-background min-h-screen pt-32 pb-24 px-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-24 md:mb-32 max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="text-5xl md:text-8xl font-light tracking-tighter mb-8"
          >
            Selected Works
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex flex-wrap gap-6"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-sm uppercase tracking-widest transition-colors duration-300 relative ${
                  activeCategory === cat ? "text-saffron" : "text-muted hover:text-foreground"
                }`}
              >
                {cat}
                {activeCategory === cat && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute -bottom-2 left-0 right-0 h-[1px] bg-saffron"
                  />
                )}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Gallery Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-24">
          <AnimatePresence>
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                className={`group ${idx % 2 === 1 ? "md:mt-32" : ""}`}
              >
                <Link href={`/projects/${project.id}`} className="block">
                  <div className={`relative ${project.aspect} overflow-hidden mb-6 bg-muted/20`}>
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105 group-hover:opacity-90"
                    />
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-light mb-2 group-hover:text-saffron transition-colors">{project.title}</h3>
                      <p className="text-muted tracking-wide text-sm">{project.category} &mdash; {project.location}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
