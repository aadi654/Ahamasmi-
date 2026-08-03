"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { getFeaturedProjects } from "@/content/projects";
import { ProtectedImage } from "@/components/protected-image";

const MotionLink = motion.create(Link);

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
};

const stagger: Variants = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function Home() {
  const featuredProjects = getFeaturedProjects().slice(0, 2);

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        <Image
          src="/ahamasmi-hero-orange-saraswati-final.jpeg"
          alt="Ahamasmi Architecture Hero"
          fill
          className="hero-artwork object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/5" />
        
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 lg:p-24 pb-24 md:pb-24">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="text-white max-w-4xl"
          >
            <motion.h1 variants={fadeUp} className="text-[clamp(3rem,13vw,3.75rem)] md:text-[clamp(4rem,8vw,5rem)] lg:text-[clamp(4.5rem,8.2vw,7rem)] font-light leading-[0.98] tracking-[-0.03em] mb-4">
              Spaces That
            </motion.h1>
            <motion.h1 variants={fadeUp} className="text-[clamp(3rem,13vw,3.75rem)] md:text-[clamp(4rem,8vw,5rem)] lg:text-[clamp(4.5rem,8.2vw,7rem)] font-light leading-[0.98] tracking-[-0.03em] mb-8 md:mb-12">
              Become You
            </motion.h1>
            <motion.p variants={fadeUp} className="max-w-[34rem] text-lg font-light leading-[1.45] tracking-wide opacity-90 md:text-xl">
              Architecture shaped around who you are, how you live, and where you belong.
            </motion.p>
          </motion.div>
        </div>
        <style jsx global>{`
          .hero-artwork {
            object-position: center center;
            transform: translate3d(0, clamp(48px, 7vh, 72px), 0) scale(1.16);
            transform-origin: center;
          }

          @media (min-width: 1024px) and (max-height: 920px) {
            .hero-artwork {
              object-position: center top;
              transform: translate3d(0, clamp(88px, 11vh, 116px), 0) scale(1.2);
            }
          }

          @media (min-width: 1600px) and (max-height: 920px) {
            .hero-artwork {
              object-position: center top;
              transform: translate3d(0, clamp(104px, 12vh, 128px), 0) scale(1.2);
            }
          }

          @media (min-width: 1600px) and (min-height: 921px) {
            .hero-artwork {
              object-position: center top;
              transform: translate3d(0, clamp(92px, 9vh, 120px), 0) scale(1.18);
            }
          }

          @media (max-width: 767px) {
            .hero-artwork {
              transform: translate3d(0, clamp(32px, 6vh, 56px), 0) scale(1.14);
            }
          }
        `}</style>
      </section>

      {/* Studio Preview */}
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
            <Link href="/i-am" className="group flex items-center gap-2 text-sm uppercase tracking-widest hover:text-saffron transition-colors">
              I am <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
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
          {featuredProjects.map((project, index) => (
            <MotionLink
              key={project.id}
              href={`/projects/${project.slug}`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              className={`group block ${index === 0 ? "mt-0 md:mt-24" : ""}`}
            >
              <div className={`relative ${index === 0 ? "aspect-[4/5]" : "aspect-[3/4]"} overflow-hidden bg-muted/20`}>
                <ProtectedImage
                  src={project.coverImage}
                  alt={project.coverAlt || project.title}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-black/22 to-transparent p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="translate-y-3 transition-transform duration-500 group-hover:translate-y-0">
                    <h3 className="text-2xl font-light tracking-tight text-white">{project.title}</h3>
                    <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-3 text-xs uppercase tracking-[0.18em] text-white/72">
                      {project.location && <p>{project.location}</p>}
                      {project.completionYear && <p>{project.completionYear}</p>}
                      {project.subcategory && <p>{project.subcategory}</p>}
                    </div>
                  </div>
                </div>
              </div>
            </MotionLink>
          ))}
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
