"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
};

const stagger: Variants = {
  visible: { transition: { staggerChildren: 0.08 } },
};

const lineGrow: Variants = {
  hidden: { scaleY: 0, opacity: 0 },
  visible: {
    scaleY: 1,
    opacity: 1,
    transition: { duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.15 },
  },
};

const teamMembers = [
  {
    name: "Principal Architect",
    category: "STUDIO DIRECTION",
    description: "Guides the architectural intent, client dialogue, and long-view design decisions.",
    pattern: "axis",
  },
  {
    name: "Design Lead",
    category: "CONCEPT & DEVELOPMENT",
    description: "Shapes spatial ideas into clear, considered architectural narratives.",
    pattern: "grid",
  },
  {
    name: "BIM / Documentation Lead",
    category: "TECHNICAL COORDINATION",
    description: "Builds precise documentation systems that carry design through execution.",
    pattern: "trace",
  },
  {
    name: "Interior Design Collaborator",
    category: "MATERIAL & EXPERIENCE",
    description: "Develops interior atmospheres through material, proportion, and detail.",
    pattern: "plane",
  },
  {
    name: "Urban Design Associate",
    category: "CONTEXT & SYSTEMS",
    description: "Studies movement, public life, and larger spatial relationships.",
    pattern: "field",
  },
  {
    name: "Design Research Collaborator",
    category: "RESEARCH & INQUIRY",
    description: "Connects design thinking with observation, culture, and evolving practice.",
    pattern: "line",
  },
];

const featuredTeamMember = teamMembers[0];
const supportingTeamMembers = teamMembers.slice(1);

const collaborationClusters = [
  {
    number: "01",
    label: "DESIGN LENS",
    title: "Design Disciplines",
    items: ["Architecture", "Interior", "Urban Design", "Design & Research"],
    description: "Spatial ideas shaped across architecture, interiors, cities, research, and cultural context.",
  },
  {
    number: "02",
    label: "TECHNICAL RIGOUR",
    title: "Technical Allies",
    items: ["BIM", "Structural", "Lighting"],
    description: "Precision from engineers, modelers, and specialists who help carry an idea into buildable form.",
  },
  {
    number: "03",
    label: "CRAFT & CONTEXT",
    title: "Material & Place",
    items: ["Landscape", "Artisans & Material Partners"],
    description: "Grounded partnerships with landscape, climate, craft, material, and the hands that shape detail.",
  },
];

export default function IAmPage() {
  return (
    <div className="bg-background min-h-screen pt-32 pb-32 text-foreground">
      <section className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="grid grid-cols-1 gap-14 border-b border-foreground/10 pb-28 pt-8 md:grid-cols-12 md:gap-16 md:pb-36 md:pt-14 lg:min-h-[62vh] lg:items-end"
        >
          <div className="md:col-span-8">
            <motion.span
              variants={fadeUp}
              className="mb-8 block text-xs font-medium uppercase tracking-[0.28em] text-saffron"
            >
              WHO WE ARE
            </motion.span>
            <div className="grid grid-cols-[1px_minmax(0,1fr)] gap-6 sm:gap-8">
              <motion.span
                variants={lineGrow}
                className="mt-2 h-full min-h-40 origin-top bg-saffron sm:min-h-48 md:min-h-56"
                aria-hidden="true"
              />
              <motion.h1
                variants={fadeUp}
                className="max-w-5xl text-5xl font-light leading-[1.02] tracking-tight text-balance sm:text-6xl md:text-7xl lg:text-8xl"
              >
                Ahamasmi.
                <br />
                I am, therefore I create.
              </motion.h1>
            </div>
          </div>
          <div className="flex items-end md:col-span-4">
            <motion.div
              variants={fadeUp}
              transition={{ delay: 0.22 }}
              className="max-w-md border-t border-foreground/10 pt-7 md:mb-3"
            >
              <p className="text-lg font-light leading-relaxed tracking-wide text-foreground/68 md:text-xl">
                Rooted in the idea of presence, Ahamasmi Architect is shaped by people, craft, collaboration, and consciousness — creating spaces that feel alive, meaningful, and deeply connected to place.
              </p>
              <p className="mt-10 text-xs font-medium uppercase tracking-[0.28em] text-foreground/45 transition-colors duration-300 hover:text-saffron">
                PEOPLE / CRAFT / PLACE
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="container mx-auto px-6 py-24 md:pb-28 md:pt-36">
        <div className="mb-14 grid grid-cols-1 gap-8 md:mb-20 md:grid-cols-12">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-4xl font-light tracking-tight text-balance md:col-span-7 md:text-6xl"
          >
            The Collective Behind Ahamasmi
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="self-end text-sm uppercase tracking-[0.22em] text-foreground/58 md:col-span-3 md:col-start-10"
          >
            MANY HANDS.
            <br />
            ONE VISION.
          </motion.p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.28fr)] lg:items-start"
        >
          <motion.article
            variants={fadeUp}
            className="group border-t border-foreground/12 pt-5 transition-transform duration-500 hover:-translate-y-1"
          >
            <div className="relative mb-8 aspect-[4/5] overflow-hidden bg-foreground/[0.035] transition-colors duration-500 group-hover:bg-foreground/[0.06]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_26%_22%,rgba(235,122,20,0.14),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.06),transparent_48%)] opacity-70" />
              <div className="absolute inset-x-8 top-8 h-px bg-foreground/12" />
              <div className="absolute bottom-8 left-8 top-8 w-px bg-foreground/12" />
              <div className="absolute bottom-14 right-8 h-24 w-24 border border-foreground/10" />
              <div className="absolute inset-x-8 bottom-8 h-px origin-left scale-x-0 bg-saffron transition-transform duration-700 group-hover:scale-x-100" />
              <span className="absolute left-8 top-12 text-xs uppercase tracking-[0.28em] text-foreground/48">
                01
              </span>
            </div>
            <div className="grid gap-8 border-t border-foreground/10 pt-6 sm:grid-cols-[80px_minmax(0,1fr)]">
              <span className="text-xs uppercase tracking-[0.28em] text-foreground/42">Featured</span>
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-saffron">{featuredTeamMember.category}</p>
                <h3 className="mt-4 text-3xl font-light tracking-tight text-foreground transition-colors duration-500 group-hover:text-foreground md:text-4xl">
                  {featuredTeamMember.name}
                </h3>
                <p className="mt-5 max-w-md text-base font-light leading-relaxed tracking-wide text-foreground/64 transition-colors duration-500 group-hover:text-foreground/78">
                  {featuredTeamMember.description}
                </p>
              </div>
            </div>
          </motion.article>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {supportingTeamMembers.map((member, index) => (
              <motion.article
                key={member.name}
                variants={fadeUp}
                className="group border-t border-foreground/12 pt-5 transition-transform duration-500 hover:-translate-y-1"
              >
                <div className="relative mb-6 aspect-[16/10] overflow-hidden bg-foreground/[0.035] transition-colors duration-500 group-hover:bg-foreground/[0.06]">
                  {member.pattern === "grid" && (
                    <>
                      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:28px_28px] opacity-70" />
                      <div className="absolute bottom-7 left-7 right-12 h-px bg-foreground/14" />
                    </>
                  )}
                  {member.pattern === "trace" && (
                    <>
                      <div className="absolute inset-0 bg-[linear-gradient(145deg,transparent_0%,transparent_45%,rgba(235,122,20,0.12)_46%,transparent_47%)]" />
                      <div className="absolute left-8 top-8 h-16 w-28 border border-foreground/10" />
                    </>
                  )}
                  {member.pattern === "plane" && (
                    <>
                      <div className="absolute inset-y-0 left-0 w-1/2 bg-foreground/[0.035]" />
                      <div className="absolute bottom-8 left-8 h-16 w-20 border-l border-t border-foreground/12" />
                    </>
                  )}
                  {member.pattern === "field" && (
                    <>
                      <div className="absolute left-8 top-8 h-2 w-2 rounded-full bg-saffron/50" />
                      <div className="absolute left-12 top-9 h-px w-32 bg-foreground/14" />
                      <div className="absolute bottom-8 right-8 h-20 w-px bg-foreground/14" />
                    </>
                  )}
                  {member.pattern === "line" && (
                    <>
                      <div className="absolute bottom-7 left-7 right-7 h-px bg-foreground/14" />
                      <div className="absolute bottom-7 left-7 h-20 w-px bg-foreground/14" />
                      <div className="absolute right-8 top-8 h-16 w-16 rounded-full border border-foreground/10" />
                    </>
                  )}
                  <div className="absolute inset-x-6 bottom-6 h-px origin-left scale-x-0 bg-saffron transition-transform duration-700 group-hover:scale-x-100" />
                  <span className="absolute left-6 top-6 text-xs uppercase tracking-[0.28em] text-foreground/48">
                    {String(index + 2).padStart(2, "0")}
                  </span>
                </div>
                <p className="text-xs uppercase tracking-[0.22em] text-saffron">{member.category}</p>
                <h3 className="mt-3 text-2xl font-light tracking-tight text-foreground transition-colors duration-500 group-hover:text-foreground">
                  {member.name}
                </h3>
                <p className="mt-4 text-sm leading-relaxed tracking-wide text-foreground/62 transition-colors duration-500 group-hover:text-foreground/76">
                  {member.description}
                </p>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="border-y border-foreground/10 py-24 md:py-36">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="container mx-auto grid grid-cols-1 gap-10 px-6 md:grid-cols-12 md:gap-16"
        >
          <h2 className="text-4xl font-light leading-tight tracking-tight text-balance md:col-span-5 md:text-6xl">
            A studio built through dialogue.
          </h2>
          <p className="text-2xl font-light leading-relaxed tracking-tight text-foreground/82 text-balance md:col-span-6 md:col-start-7 md:text-4xl">
            Every project at Ahamasmi is shaped through conversations — with clients, consultants, craftsmen, artists, engineers, and the landscape itself.
          </p>
        </motion.div>
      </section>

      <section className="container mx-auto px-6 py-24 md:py-36">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="mb-14 grid grid-cols-1 gap-8 md:grid-cols-12 md:mb-18"
        >
          <h2 className="text-4xl font-light tracking-tight text-balance md:col-span-6 md:text-6xl">
            Built Through Collaboration
          </h2>
          <p className="max-w-xl text-lg font-light leading-relaxed tracking-wide text-foreground/74 md:col-span-5 md:col-start-8 md:text-xl">
            Architecture at Ahamasmi is shaped by many voices — designers, engineers, makers, consultants, researchers, and site teams working together to turn intention into built form.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="grid grid-cols-1 gap-8 border-t border-foreground/10 pt-8 lg:grid-cols-3 lg:gap-0 lg:pt-0"
        >
          {collaborationClusters.map((cluster, index) => (
            <motion.article
              key={cluster.title}
              variants={fadeUp}
              className="group border-b border-foreground/10 pb-8 transition-all duration-500 hover:-translate-y-1 hover:border-foreground/18 hover:bg-foreground/[0.025] lg:border-b-0 lg:border-r lg:px-8 lg:py-8 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
            >
              <div className="mb-8 flex items-center justify-between gap-6">
                <span className="text-xs uppercase tracking-[0.28em] text-foreground/42">{cluster.number}</span>
                <div className="h-px flex-1 origin-left scale-x-75 bg-foreground/18 transition-all duration-700 group-hover:scale-x-100 group-hover:bg-saffron" />
              </div>
              <p className="text-xs uppercase tracking-[0.24em] text-saffron">{cluster.label}</p>
              <h3 className="mt-5 text-3xl font-light tracking-tight text-foreground md:text-4xl">{cluster.title}</h3>
              <p className="mt-6 text-sm leading-relaxed tracking-wide text-foreground/64 transition-colors duration-500 group-hover:text-foreground/78 lg:min-h-20">
                {cluster.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-x-3 gap-y-3 text-sm uppercase tracking-[0.11em] text-foreground/62">
                {cluster.items.map((item, itemIndex) => (
                  <span key={item} className="inline-flex items-center gap-3">
                    <span>{item}</span>
                    {itemIndex < cluster.items.length - 1 && <span className="text-foreground/24">/</span>}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </section>

      <section className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="border-t border-foreground/10 pt-20 text-center md:pt-28"
        >
          <p className="text-5xl font-light leading-[1.05] tracking-tight text-balance md:text-8xl">
            We are not a single voice.
          </p>
          <p className="mx-auto mt-4 max-w-5xl text-5xl font-light leading-[1.05] tracking-tight text-balance text-foreground/58 md:text-8xl">
            We are a collective way of seeing.
          </p>
          <Link
            href="/contact"
            className="group mt-14 inline-flex items-center gap-3 border border-foreground/18 px-7 py-4 text-sm uppercase tracking-widest transition-colors duration-300 hover:border-saffron hover:text-saffron"
          >
            Begin a conversation
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
