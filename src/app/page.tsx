"use client";

import { useEffect, useRef } from "react";
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

const heroLogoMetrics = {
  imageWidth: 1658,
  horizontalLineStartX: 501,
  horizontalLineEndX: 1343,
} as const;

const brandLineStartRatio = heroLogoMetrics.horizontalLineStartX / heroLogoMetrics.imageWidth;
const brandLineEndRatio = heroLogoMetrics.horizontalLineEndX / heroLogoMetrics.imageWidth;
const brandTrackingRatio = 0.19;

function HeroBrandName() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const boldRef = useRef<HTMLSpanElement>(null);
  const regularRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const heading = headingRef.current;
    const boldText = boldRef.current;
    const regularText = regularRef.current;
    const frame = heading?.closest<HTMLElement>(".hero-artwork-frame");
    if (!heading || !boldText || !regularText || !frame) return;

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) return;

    let animationFrame = 0;
    let cancelled = false;

    const textRuns = [
      { text: "AHAMASMI", weight: 700 },
      { text: " ", weight: 400 },
      { text: "ARCHITECT", weight: 400 },
    ] as const;

    const measureBrand = (fontSize: number, letterSpacing: number, fontFamily: string) => {
      let cursor = 0;
      let visibleLeft = Number.POSITIVE_INFINITY;
      let visibleRight = Number.NEGATIVE_INFINITY;

      for (const run of textRuns) {
        context.font = `${run.weight} ${fontSize}px ${fontFamily}`;

        for (const character of run.text) {
          const metrics = context.measureText(character);
          const glyphLeft = cursor - metrics.actualBoundingBoxLeft;
          const glyphRight = cursor + metrics.actualBoundingBoxRight;

          if (character !== " ") {
            visibleLeft = Math.min(visibleLeft, glyphLeft);
            visibleRight = Math.max(visibleRight, glyphRight);
          }

          cursor += metrics.width + letterSpacing;
        }
      }

      return {
        left: Number.isFinite(visibleLeft) ? visibleLeft : 0,
        right: Number.isFinite(visibleRight) ? visibleRight : cursor,
        width: Number.isFinite(visibleLeft) && Number.isFinite(visibleRight) ? visibleRight - visibleLeft : cursor,
      };
    };

    const fitBrandToLine = () => {
      if (cancelled) return;

      const frameWidth = frame.getBoundingClientRect().width;
      if (!frameWidth) return;

      const targetLeft = frameWidth * brandLineStartRatio;
      const targetWidth = frameWidth * (brandLineEndRatio - brandLineStartRatio);
      const fontFamily = window.getComputedStyle(heading).fontFamily;

      let low = 6;
      let high = Math.max(12, targetWidth / 6);

      for (let index = 0; index < 28; index += 1) {
        const mid = (low + high) / 2;
        const measured = measureBrand(mid, mid * brandTrackingRatio, fontFamily);

        if (measured.width > targetWidth) {
          high = mid;
        } else {
          low = mid;
        }
      }

      let fontSize = low;
      let letterSpacing = fontSize * brandTrackingRatio;
      const measured = measureBrand(fontSize, letterSpacing, fontFamily);
      let headingLeft = targetLeft - measured.left;

      heading.style.setProperty("--hero-brand-left", `${headingLeft}px`);
      heading.style.setProperty("--hero-brand-font-size", `${fontSize}px`);
      heading.style.setProperty("--hero-brand-letter-spacing", `${letterSpacing}px`);

      for (let index = 0; index < 2; index += 1) {
        const frameLeft = frame.getBoundingClientRect().left;
        const boldRect = boldText.getBoundingClientRect();
        const regularRect = regularText.getBoundingClientRect();
        const renderedLeft = boldRect.left - frameLeft;
        const renderedRight = regularRect.right - frameLeft - letterSpacing;
        const renderedWidth = renderedRight - renderedLeft;

        if (renderedWidth > 0) {
          const correction = targetWidth / renderedWidth;
          fontSize *= correction;
          letterSpacing *= correction;

          heading.style.setProperty("--hero-brand-font-size", `${fontSize}px`);
          heading.style.setProperty("--hero-brand-letter-spacing", `${letterSpacing}px`);
        }
      }

      const frameLeft = frame.getBoundingClientRect().left;
      const boldRect = boldText.getBoundingClientRect();
      headingLeft += targetLeft - (boldRect.left - frameLeft);
      heading.style.setProperty("--hero-brand-left", `${headingLeft}px`);
    };

    const scheduleFit = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(fitBrandToLine);
    };

    const resizeObserver = new ResizeObserver(scheduleFit);
    resizeObserver.observe(frame);

    scheduleFit();
    document.fonts?.ready.then(scheduleFit);
    document.fonts?.addEventListener("loadingdone", scheduleFit);
    window.addEventListener("resize", scheduleFit);
    window.addEventListener("orientationchange", scheduleFit);

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      document.fonts?.removeEventListener("loadingdone", scheduleFit);
      window.removeEventListener("resize", scheduleFit);
      window.removeEventListener("orientationchange", scheduleFit);
    };
  }, []);

  return (
    <h1 ref={headingRef} className="hero-brand-name" aria-label="Ahamasmi Architect">
      <span ref={boldRef} className="hero-brand-ahamasmi">AHAMASMI</span>{" "}
      <span ref={regularRef} className="hero-brand-architect">ARCHITECT</span>
    </h1>
  );
}

function HeroLogoArtwork() {
  return (
    <svg
      className="hero-logo-artwork"
      viewBox="0 0 1658 949"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="heroLeftVerticalFade" x1="0" y1="64" x2="0" y2="463" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="white" stopOpacity="0.05" />
          <stop offset="0.43" stopColor="white" stopOpacity="0.2" />
          <stop offset="0.58" stopColor="white" stopOpacity="1" />
          <stop offset="1" stopColor="white" stopOpacity="1" />
        </linearGradient>
        <linearGradient id="heroRightVerticalFade" x1="0" y1="-3000" x2="0" y2="463" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="white" stopOpacity="0" />
          <stop offset="0.55" stopColor="white" stopOpacity="0.05" />
          <stop offset="0.82" stopColor="white" stopOpacity="0.22" />
          <stop offset="0.94" stopColor="white" stopOpacity="1" />
          <stop offset="1" stopColor="white" stopOpacity="1" />
        </linearGradient>
        <linearGradient id="heroHorizontalExtensionFade" x1="501" y1="0" x2="6000" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="white" stopOpacity="1" />
          <stop offset="0.42" stopColor="white" stopOpacity="1" />
          <stop offset="0.64" stopColor="white" stopOpacity="0.16" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="heroSlantFade" x1="462" y1="317" x2="-400" y2="4000" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="white" stopOpacity="1" />
          <stop offset="0.28" stopColor="white" stopOpacity="1" />
          <stop offset="0.48" stopColor="white" stopOpacity="0.28" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M 462 317 L -400 4000"
        fill="none"
        stroke="url(#heroSlantFade)"
        strokeLinecap="butt"
        strokeWidth="6"
      />
      <path
        d="M 501 64 L 501 463"
        fill="none"
        stroke="url(#heroLeftVerticalFade)"
        strokeLinecap="butt"
        strokeWidth="5"
      />
      <path
        d="M 501 463 L 6000 463"
        fill="none"
        stroke="url(#heroHorizontalExtensionFade)"
        strokeLinecap="butt"
        strokeWidth="5"
      />
      <path
        d="M 1343 -3000 L 1343 463"
        fill="none"
        stroke="url(#heroRightVerticalFade)"
        strokeLinecap="butt"
        strokeWidth="5"
      />
    </svg>
  );
}

export default function Home() {
  const featuredProjects = getFeaturedProjects().slice(0, 2);

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="home-hero relative w-full overflow-hidden">
        <div className="hero-artwork-frame absolute pointer-events-none">
          <HeroLogoArtwork />
          <HeroBrandName />
        </div>
        <p className="hero-signature">I am Architect</p>
        <style jsx global>{`
          .home-hero {
            min-height: 100vh;
            min-height: 100svh;
            background: #e27703;
          }

          .hero-artwork-frame {
            --hero-brand-left: ${brandLineStartRatio * 100}%;
            --hero-brand-font-size: clamp(0.9rem, 3.6vw, 3.875rem);
            --hero-brand-letter-spacing: clamp(0.16em, 0.65vw, 0.22em);
            aspect-ratio: 1658 / 949;
            left: 50%;
            top: 50%;
            width: min(103.625rem, 100vw);
            overflow: visible;
            transform: translate(-50%, -50%);
          }

          .hero-logo-artwork {
            display: block;
            height: 100%;
            left: 0;
            overflow: visible;
            position: absolute;
            top: 0;
            width: 100%;
          }

          .hero-brand-name,
          .hero-signature {
            color: #fff;
            font-style: normal;
          }

          .hero-brand-name {
            align-items: baseline;
            display: block;
            font-size: var(--hero-brand-font-size);
            left: var(--hero-brand-left);
            letter-spacing: var(--hero-brand-letter-spacing);
            line-height: 0.9;
            margin: 0;
            position: absolute;
            top: 53.25%;
            white-space: nowrap;
            width: max-content;
          }

          .hero-brand-ahamasmi {
            font-weight: 700;
          }

          .hero-brand-architect {
            font-weight: 400;
          }

          .hero-signature {
            bottom: clamp(1.75rem, 5.25vw, 3.45rem);
            font-size: clamp(1.05rem, 1.57vw, 1.625rem);
            font-weight: 400;
            line-height: 1;
            margin: 0;
            position: absolute;
            right: clamp(1.5rem, 3vw, 3.45rem);
            z-index: 1;
          }

          @media (min-width: 768px) and (max-width: 1023px) {
            .hero-artwork-frame {
              top: 42svh;
            }
          }

          @media (max-height: 720px) and (min-aspect-ratio: 2 / 1) {
            .hero-artwork-frame {
              width: min(103.625rem, 100vw, calc(100svh * 1658 / 949));
            }
          }

          @media (max-width: 767px) {
            .hero-artwork-frame {
              top: max(12rem, 34svh);
              width: min(103.625rem, 100vw, calc(62svh * 1658 / 949));
            }

            .hero-brand-name {
              font-size: var(--hero-brand-font-size);
              letter-spacing: var(--hero-brand-letter-spacing);
            }

            .hero-signature {
              bottom: clamp(1.5rem, 8svh, 3rem);
              right: clamp(1.25rem, 6vw, 2rem);
            }
          }

          @media (max-height: 500px) and (orientation: landscape) {
            .home-hero {
              min-height: 42rem;
            }

            .hero-artwork-frame {
              top: 20.625rem;
              width: min(48.75rem, calc(100vw - 2rem));
            }

            .hero-signature {
              bottom: 2rem;
            }
          }

          @media (max-width: 380px) {
            .hero-brand-name {
              font-size: var(--hero-brand-font-size);
              letter-spacing: var(--hero-brand-letter-spacing);
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
            Architecture is not only about designing spaces. It is the art of crafting the space to <span className="text-saffron italic">add value to your life</span> and invoking timeless connections between yourself and space.
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
