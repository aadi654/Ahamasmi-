"use client";

import { motion, Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
};

const sections = [
  {
    id: "research",
    eyebrow: "Research",
    title: "Movement, discipline, and learning as cultural practice.",
    body: "Ahamasmiyodhah explores the relationship between embodied training, education, space, and community. This section will later hold the client's Design & Research content around martial arts, pedagogy, and place.",
  },
  {
    id: "academy",
    eyebrow: "Academy",
    title: "A focused learning environment for taekwondo and personal growth.",
    body: "The academy introduces structured training, student development, workshops, and educational programming. Final content can include class formats, instructors, curriculum, registrations, and the Deccan Taekwondo Academy relationship.",
  },
  {
    id: "collaborations",
    eyebrow: "Collaborations",
    title: "Partnerships across education, culture, sport, and design.",
    body: "This space can feature institutional partnerships, community events, research collaborations, demonstrations, and interdisciplinary initiatives that connect Ahamasmiyodhah with schools, academies, and cultural organizations.",
  },
];

export default function AhamasmiyodhahPage() {
  return (
    <div className="bg-background min-h-screen pt-32 pb-32">
      <section className="px-6 container mx-auto">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="max-w-5xl mb-28"
        >
          <span className="text-saffron uppercase tracking-widest text-xs font-medium mb-6 block">Ahamasmiyodhah</span>
          <h1 className="text-5xl md:text-8xl font-light tracking-tighter mb-8">
            Education through discipline, movement, and culture.
          </h1>
          <p className="text-xl md:text-2xl text-muted font-light leading-relaxed max-w-3xl">
            A class 42 registered educational initiative exploring martial arts, research, and collaborations through a people-centric lens.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
          <div className="md:col-span-4">
            <div className="sticky top-32 space-y-5">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="block text-sm uppercase tracking-widest text-muted transition-colors duration-300 hover:text-saffron"
                >
                  {section.eyebrow}
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-8 space-y-24">
            {sections.map((section) => (
              <motion.section
                key={section.id}
                id={section.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeUp}
                className="scroll-mt-32 border-t border-foreground/10 pt-10"
              >
                <span className="text-saffron uppercase tracking-widest text-xs font-medium mb-5 block">
                  {section.eyebrow}
                </span>
                <h2 className="text-3xl md:text-5xl font-light tracking-tight leading-tight mb-8">
                  {section.title}
                </h2>
                <p className="text-muted leading-relaxed tracking-wide text-lg max-w-2xl">
                  {section.body}
                </p>
              </motion.section>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
