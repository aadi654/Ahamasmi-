"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const categories = ["All", "Residential", "Cultural", "Commercial"];

const projectStats = [
  { value: "35+", label: "Projects" },
  { value: "8", label: "Cities" },
  { value: "4", label: "Disciplines" },
  { value: "12", label: "Years" },
];

const projects = [
  {
    id: "the-courtyard-house",
    title: "The Courtyard House",
    category: "Residential",
    location: "Bangalore",
    year: "2024",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2940&auto=format&fit=crop",
    aspect: "aspect-[4/5]",
  },
  {
    id: "serenity-pavilion",
    title: "Serenity Pavilion",
    category: "Cultural",
    location: "Kerala",
    year: "2023",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2940&auto=format&fit=crop",
    aspect: "aspect-[3/4]",
  },
  {
    id: "urban-oasis",
    title: "Urban Oasis",
    category: "Commercial",
    location: "Mumbai",
    year: "2022",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2940&auto=format&fit=crop",
    aspect: "aspect-square",
  },
  {
    id: "hillside-retreat",
    title: "Hillside Retreat",
    category: "Residential",
    location: "Pune",
    year: "2021",
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
    <div className="bg-background text-foreground min-h-screen">
      <section className="px-6 pt-36 pb-14 md:pt-44 md:pb-20">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="grid gap-12 md:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] md:items-end"
          >
            <div>
              <h1 className="text-5xl md:text-8xl font-light tracking-tighter mb-8">
                Selected Works
              </h1>
              <p className="max-w-2xl text-xl md:text-3xl font-light leading-snug text-foreground/85">
                Architecture as spatial storytelling.
                <br />
                A curated collection of built environments.
              </p>
            </div>

            <div className="md:pb-2">
              <p className="max-w-md text-sm md:text-base font-light leading-7 tracking-wide text-foreground/62">
                A collection of spaces shaped through
                <br className="hidden sm:block" />
                context, materiality and human experience.
              </p>
              <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-4">
                {projectStats.map((stat) => (
                  <div key={stat.label}>
                    <p className="text-2xl font-light tracking-tight text-foreground">{stat.value}</p>
                    <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-foreground/42">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-14 flex flex-wrap items-center gap-y-4 text-sm tracking-[0.2em]"
          >
            {categories.map((cat, index) => (
              <div key={cat} className="flex items-center">
                <button
                  onClick={() => setActiveCategory(cat)}
                  className={`group relative pb-2 transition-colors duration-300 ${
                    activeCategory === cat ? "text-saffron" : "text-foreground/56 hover:text-foreground"
                  }`}
                >
                  {cat}
                  <span
                    className={`absolute bottom-0 left-0 h-[1px] w-full origin-left bg-saffron transition-transform duration-300 ${
                      activeCategory === cat ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </button>
                {index < categories.length - 1 && (
                  <span className="mx-4 text-foreground/24">/</span>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="container mx-auto">
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
                    <div className={`relative ${project.aspect} overflow-hidden bg-muted/20`}>
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-black/22 to-transparent p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                        <div className="translate-y-3 transition-transform duration-500 group-hover:translate-y-0">
                          <h3 className="text-2xl font-light tracking-tight text-white">{project.title}</h3>
                          <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-3 text-xs uppercase tracking-[0.18em] text-white/72">
                            <p>{project.location}</p>
                            <p>{project.year}</p>
                            <p>{project.category}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
