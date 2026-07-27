"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CSSProperties, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ProtectedImage } from "@/components/protected-image";
import {
  getNextProject,
  Project,
  ProjectGalleryImage,
  projectCategoryLabels,
} from "@/content/projects";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
};

const imageReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } },
};

type GallerySequence = {
  primaryImage: ProjectGalleryImage;
  middleImages: ProjectGalleryImage[];
  closingImage?: ProjectGalleryImage;
};

function getImageDisplayStyle(
  image: ProjectGalleryImage,
  maxHeightVh = 76,
  maxWidthVw = 86,
  upscaleLimit = 1.25
): CSSProperties | undefined {
  if (!image.width || !image.height) {
    return undefined;
  }

  const aspectRatio = image.width / image.height;

  return {
    width: `min(${maxWidthVw}vw, ${Math.round(image.width * upscaleLimit)}px, calc(${maxHeightVh}vh * ${aspectRatio}))`,
    height: "auto",
  };
}

function getGallerySequence(project: Project): GallerySequence {
  const images = [
    {
      src: project.coverImage,
      alt: project.coverAlt || `${project.title} primary view`,
      width: project.coverWidth,
      height: project.coverHeight,
    },
    ...project.gallery,
  ].filter((image, index, list) => {
    return list.findIndex((item) => item.src === image.src) === index;
  });

  const [primaryImage, ...remainingImages] = images;
  const closingImage =
    remainingImages.length > 0 ? remainingImages[remainingImages.length - 1] : undefined;
  const middleImages = closingImage ? remainingImages.slice(0, -1) : remainingImages;

  return {
    primaryImage,
    middleImages,
    closingImage,
  };
}

function EditorialImage({
  image,
  alt,
  className,
  imageClassName = "w-full h-auto",
  imageStyle,
  priority = false,
  sizes = "100vw",
}: {
  image: ProjectGalleryImage;
  alt: string;
  className: string;
  imageClassName?: string;
  imageStyle?: CSSProperties;
  priority?: boolean;
  sizes?: string;
}) {
  const hasDimensions = typeof image.width === "number" && typeof image.height === "number";

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={imageReveal}
      className={`group overflow-hidden ${className}`}
    >
      {hasDimensions ? (
        <ProtectedImage
          src={image.src}
          alt={alt}
          width={image.width}
          height={image.height}
          priority={priority}
          sizes={sizes}
          style={imageStyle}
          className={`object-contain transition-transform duration-700 ease-out ${imageClassName}`}
        />
      ) : (
        <ProtectedImage
          src={image.src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      )}
    </motion.div>
  );
}

function PinnedHorizontalGallery({
  images,
  title,
}: {
  images: ProjectGalleryImage[];
  title: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [travelDistance, setTravelDistance] = useState(0);
  const [sectionHeight, setSectionHeight] = useState("140vh");
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -travelDistance]
  );
  const measureTrack = useCallback(() => {
    if (!trackRef.current) {
      return;
    }

    const viewportWidth = window.innerWidth;
    const travel = Math.max(0, trackRef.current.scrollWidth - viewportWidth);
    setTravelDistance(travel);
    setSectionHeight(`${Math.max(window.innerHeight * 1.4, travel + window.innerHeight * 1.05)}px`);
  }, []);

  useEffect(() => {
    measureTrack();
    const timeoutId = window.setTimeout(measureTrack, 120);
    window.addEventListener("resize", measureTrack);

    const resizeObserver = new ResizeObserver(measureTrack);
    if (trackRef.current) {
      resizeObserver.observe(trackRef.current);
    }

    document.fonts?.ready.then(measureTrack);

    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener("resize", measureTrack);
      resizeObserver.disconnect();
    };
  }, [images, measureTrack]);

  if (images.length === 0) {
    return null;
  }

  return (
    <>
      <section
        ref={sectionRef}
        style={{ height: sectionHeight }}
        className="relative hidden md:block"
      >
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <motion.div ref={trackRef} style={{ x }} className="flex w-max items-center gap-[8vw] pl-[11vw] pr-[11vw]">
            {images.map((img, idx) => (
              <div key={img.src} className={`group relative flex shrink-0 items-center justify-center ${img.width && img.height ? "h-fit w-fit overflow-visible" : "h-[76vh] w-[78vw] overflow-hidden"}`}>
                {img.width && img.height ? (
                  <ProtectedImage
                    src={img.src}
                    alt={img.alt || `${title} gallery ${idx + 1}`}
                    width={img.width}
                    height={img.height}
                    sizes="(min-width: 768px) 86vw, 100vw"
                    style={getImageDisplayStyle(img)}
                    onLoad={measureTrack}
                    className="max-h-[76vh] max-w-[86vw] object-contain transition-transform duration-700 ease-out"
                  />
                ) : (
                  <ProtectedImage
                    src={img.src}
                    alt={img.alt || `${title} gallery ${idx + 1}`}
                    fill
                    sizes="78vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="space-y-16 px-6 py-16 md:hidden">
        {images.map((img, idx) => (
          <EditorialImage
            key={img.src}
            image={img}
            alt={img.alt || `${title} gallery ${idx + 1}`}
            className={img.width && img.height ? "mx-auto w-full" : "relative aspect-[4/5]"}
            imageClassName="mx-auto h-auto w-full"
          />
        ))}
      </section>
    </>
  );
}

function FinalImageSequence({ project }: { project: Project }) {
  const { primaryImage, middleImages, closingImage } = getGallerySequence(project);

  return (
    <>
      <section className="pb-32 px-6 container mx-auto">
        <EditorialImage
          image={primaryImage}
          alt={primaryImage.alt || `${project.title} primary view`}
          className={primaryImage.width && primaryImage.height ? "mx-auto flex w-full justify-center" : "relative min-h-[70vh] md:aspect-[16/9]"}
          imageClassName="mx-auto max-w-full object-contain"
          imageStyle={getImageDisplayStyle(primaryImage, 78, 100, 1.25)}
          priority
          sizes="(min-width: 768px) 100vw, 100vw"
        />
      </section>

      <PinnedHorizontalGallery
        images={middleImages}
        title={project.title}
      />

      {closingImage && (
        <section className="pt-20 pb-0 md:pt-32 md:pb-0">
          <EditorialImage
            image={closingImage}
            alt={closingImage.alt || `${project.title} closing view`}
            className={closingImage.width && closingImage.height ? "mx-auto flex w-full items-center justify-center" : "relative h-[84vh] w-full"}
            imageClassName="mx-auto max-h-[84vh] max-w-full object-contain"
            imageStyle={getImageDisplayStyle(closingImage, 84, 100, 1.25)}
          />
        </section>
      )}
    </>
  );
}

export function ProjectDetailClient({ project }: { project: Project }) {
  const nextProject = getNextProject(project.slug);
  const metadataItems = useMemo(
    () => [
      project.location ? { label: "Location", value: project.location } : null,
      { label: "Category", value: projectCategoryLabels[project.category] },
      project.completionYear ? { label: "Year", value: project.completionYear } : null,
      project.area ? { label: "Area", value: project.area } : null,
    ].filter(Boolean) as { label: string; value: string }[],
    [project]
  );

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
  }, [project.slug]);

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
              {metadataItems.map((item) => (
                <div key={item.label}>
                  <p className="text-muted tracking-widest uppercase text-xs mb-1">{item.label}</p>
                  <p>{item.value}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <FinalImageSequence project={project} />

      {/* Next Project CTA */}
      {nextProject && (
        <section className="py-32 md:py-40 bg-foreground text-background">
          <div className="container mx-auto px-6 flex flex-col items-center text-center">
            <span className="uppercase tracking-widest text-xs text-muted mb-8">Next Project</span>
            <Link
              href={`/projects/${nextProject.slug}`}
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
      )}
    </div>
  );
}
