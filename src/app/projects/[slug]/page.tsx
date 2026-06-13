"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { use, useEffect, useRef } from "react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
};

const imageReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } },
};

const projectOrder = [
  { id: "the-courtyard-house", title: "The Courtyard House" },
  { id: "serenity-pavilion", title: "Serenity Pavilion" },
  { id: "urban-oasis", title: "Urban Oasis" },
  { id: "hillside-retreat", title: "Hillside Retreat" },
];

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
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2940&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=2940&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600121848594-d8644e57abab?q=80&w=2940&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=2940&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607688066-890987f18a86?q=80&w=2940&auto=format&fit=crop",
    ],
  };
};

type ProjectData = ReturnType<typeof getProjectData>;

function EditorialImage({
  src,
  alt,
  className,
  priority = false,
}: {
  src: string;
  alt: string;
  className: string;
  priority?: boolean;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={imageReveal}
      className={`group relative overflow-hidden bg-muted/20 ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      />
    </motion.div>
  );
}

function PinnedHorizontalGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0vw", "-322vw"]
  );

  return (
    <>
      <section ref={sectionRef} className="relative hidden h-[520vh] md:block">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <motion.div style={{ x }} className="flex gap-[8vw] pl-[11vw] pr-[11vw]">
            {images.map((img, idx) => (
              <div key={img} className="group relative h-[76vh] w-[78vw] shrink-0 overflow-hidden bg-muted/20">
                <Image
                  src={img}
                  alt={`${title} gallery ${idx + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="space-y-16 px-6 py-16 md:hidden">
        {images.map((img, idx) => (
          <EditorialImage
            key={img}
            src={img}
            alt={`${title} gallery ${idx + 1}`}
            className="aspect-[4/5]"
          />
        ))}
      </section>
    </>
  );
}

function FinalImageSequence({ project }: { project: ProjectData }) {
  return (
    <>
      <section className="pb-32 px-6 container mx-auto">
        <EditorialImage
          src={project.visualImages[0]}
          alt={`${project.title} primary view`}
          className="min-h-[70vh] md:aspect-[16/9]"
          priority
        />
      </section>

      <PinnedHorizontalGallery
        images={project.visualImages.slice(1, 6)}
        title={project.title}
      />

      <section className="pt-20 pb-0 md:pt-32 md:pb-0">
        <EditorialImage
          src={project.visualImages[6]}
          alt={`${project.title} closing view`}
          className="h-[84vh] w-full"
        />
      </section>
    </>
  );
}

export default function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const project = getProjectData(resolvedParams.slug);
  const currentProjectIndex = projectOrder.findIndex((item) => item.id === resolvedParams.slug);
  const nextProject = projectOrder[
    currentProjectIndex >= 0 ? (currentProjectIndex + 1) % projectOrder.length : 0
  ];

  useEffect(() => {
    if (sessionStorage.getItem("next-project-scroll-top") !== "true") return;

    sessionStorage.removeItem("next-project-scroll-top");
    window.history.scrollRestoration = "manual";

    const scrollToTop = (behavior: ScrollBehavior) => {
      window.scrollTo({ top: 0, left: 0, behavior });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    scrollToTop("auto");
    requestAnimationFrame(() => scrollToTop("smooth"));
    const timeoutId = window.setTimeout(() => scrollToTop("auto"), 120);

    return () => window.clearTimeout(timeoutId);
  }, [resolvedParams.slug]);

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

      <FinalImageSequence project={project} />

      {/* Next Project CTA */}
      <section className="py-32 md:py-40 bg-foreground text-background">
        <div className="container mx-auto px-6 flex flex-col items-center text-center">
          <span className="uppercase tracking-widest text-xs text-muted mb-8">Next Project</span>
          <Link
            href={`/projects/${nextProject.id}`}
            className="group"
            scroll={false}
            onClick={() => {
              sessionStorage.setItem("next-project-scroll-top", "true");
            }}
          >
            <h2 className="text-4xl md:text-7xl font-light tracking-tighter hover:text-saffron transition-colors duration-500 flex items-center gap-6">
              {nextProject.title} <ArrowRight size={48} className="opacity-0 -translate-x-10 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500" />
            </h2>
          </Link>
        </div>
      </section>
    </div>
  );
}
