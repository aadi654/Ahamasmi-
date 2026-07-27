"use client";

import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
};

type ActiveTab = "academy" | "design-research";

type PublicationSpread = {
  src: string;
  alt: string;
  label: string;
  width: number;
  height: number;
};

type Publication = {
  id: string;
  type: "article" | "feature";
  title: string;
  eyebrow?: string;
  metadata?: string;
  description: string;
  spreads: PublicationSpread[];
  ctaLabel: string;
  alignment: "image-left" | "image-right";
};

type AcademyCredential = {
  id: string;
  title: string;
  labelLines: string[];
  image: string;
  alt: string;
  previewAlt: string;
  width: number;
  height: number;
  triggerLabel: string;
};

const sections: Array<{
  id: ActiveTab;
  eyebrow: string;
  label: string;
  title: string;
  body: string[];
}> = [
  {
    id: "academy",
    eyebrow: "Academy",
    label: "Academy",
    title: "A focused learning environment for taekwondo and personal growth.",
    body: [
      "The academy introduces structured training, student development, workshops, and educational programming. Final content can include class formats, instructors, curriculum, registrations, and the Deccan Taekwondo Academy relationship.",
    ],
  },
  {
    id: "design-research",
    eyebrow: "Design & Research",
    label: "Design & Research",
    title: "Movement as knowledge.\nDiscipline as a way of becoming.",
    body: [
      "Ahamasmiyodhah approaches martial arts as more than physical training. It is a way of understanding the body, building awareness, strengthening character, and discovering how discipline shapes the individual and the community.",
      "Through design, research, education, and lived practice, we explore the relationship between movement, culture, space, pedagogy, and personal growth. The intention is to document knowledge, question inherited methods, and create thoughtful frameworks that allow martial traditions to remain meaningful for future generations.",
    ],
  },
];

const ACADEMY_WHATSAPP_NUMBER = "919270384782";
const INTEREST_OPTIONS = ["Yes", "Maybe / Need more information", "Not immediately"] as const;
const JOINING_OPTIONS = ["Immediately", "Within one month", "Within three months", "Just exploring"] as const;
const MARTIAL_ARTS_OPTIONS = [
  "Taekwondo",
  "Self-defence",
  "Fitness and conditioning",
  "Not sure yet",
] as const;

type InterestOption = (typeof INTEREST_OPTIONS)[number] | "";
type JoiningOption = (typeof JOINING_OPTIONS)[number] | "";
type MartialArtsOption = (typeof MARTIAL_ARTS_OPTIONS)[number] | "";

type AcademyFormData = {
  name: string;
  email: string;
  address: string;
  phoneNumber: string;
  yearLeftMartialArts: string;
  interestedInStartingAgain: InterestOption;
  preferredJoiningTime: JoiningOption;
  martialArtsPreference: MartialArtsOption;
  comment: string;
};

type FormErrors = Partial<Record<keyof AcademyFormData, string>>;

const initialAcademyFormData: AcademyFormData = {
  name: "",
  email: "",
  address: "",
  phoneNumber: "",
  yearLeftMartialArts: "",
  interestedInStartingAgain: "",
  preferredJoiningTime: "",
  martialArtsPreference: "",
  comment: "",
};

const academyAffiliations = [
  {
    name: "World Taekwondo",
    caption: "International affiliation",
    logo: "/images/academy/world-taekwondo-logo.png",
  },
  {
    name: "ITKBA",
    caption: "Martial arts affiliation",
    logo: "/images/academy/itkba-logo.png",
  },
] as const;

const academyLead = {
  name: "Niket Sunil Upase",
  rank: "Black Belt, 3rd Dan",
  academy: "Deccan Taekwondo Academy",
  federation: "World Taekwondo Federation",
  image: "/images/academy/academy-lead.jpeg",
} as const;

const academyCredential = {
  id: "itkba-black-belt",
  title: "Black Belt Certification - ITKBA",
  labelLines: ["BLACK BELT", "CERTIFICATION - ITKBA"],
  image: "/images/academy/black-belt-certificate.jpeg",
  alt: "Preview of black belt certification",
  previewAlt: "Full preview of Niket Sunil Upase black belt certification",
  width: 1600,
  height: 1200,
  triggerLabel: "View black belt certification credential",
} satisfies AcademyCredential;

const academyCredentials = [
  {
    id: "kukkiwon-3rd-dan",
    title: "Kukkiwon 3rd Dan Certification",
    labelLines: ["KUKKIWON 3RD DAN", "CERTIFICATION"],
    image: "/images/academy/kukkiwon-3rd-dan-certificate.jpeg",
    alt: "Kukkiwon certificate awarded to Niket Sunil Upase for successfully completing the 3rd Dan Taekwondo promotion test.",
    previewAlt:
      "Kukkiwon certificate awarded to Niket Sunil Upase for successfully completing the 3rd Dan Taekwondo promotion test.",
    width: 1087,
    height: 1600,
    triggerLabel: "Open Kukkiwon 3rd Dan certificate for Niket Sunil Upase",
  },
  academyCredential,
] satisfies AcademyCredential[];

const publications: Publication[] = [
  {
    id: "copper-facades-covid-spread",
    type: "article",
    title: "Use of Copper on Façades to Reduce COVID Spread",
    metadata: "Material Research · Façade Design · 2020",
    description:
      "A published study examining copper as an architectural façade material and its relationship with hygiene, durability, ventilation, material ageing, fenestration, maintenance, and public health.",
    spreads: [
      {
        src: "/images/ahamasmiyodhah/design-research/copper-facades-covid-spread-pages-26-27.jpeg",
        label: "Pages 26–27",
        alt: "Magazine spread titled Use of Copper on Façades to Reduce COVID Spread, showing architectural copper cladding, doors, windows, façade applications, and published research.",
        width: 1189,
        height: 790,
      },
      {
        src: "/images/ahamasmiyodhah/design-research/facade-materials-pages-28-29.jpeg",
        label: "Pages 28–29",
        alt: "Continued magazine spread about copper façade materials, fenestration, ventilation, patina, maintenance, architectural applications, and author Ar. Niket Sunil Upase.",
        width: 1017,
        height: 670,
      },
    ],
    ctaLabel: "View publication",
    alignment: "image-left",
  },
  {
    id: "cladding-cover-story",
    type: "feature",
    eyebrow: "Featured In",
    title: "Cover Story: Contemporary Approaches to Cladding",
    description:
      "Ahamasmi Architect founder Ar. Niket Sunil Upase was featured alongside architectural practitioners discussing cladding, material expression, thermal performance, maintenance, and building-envelope design.",
    spreads: [
      {
        src: "/images/ahamasmiyodhah/design-research/cladding-cover-story.jpeg",
        label: "Cover story",
        alt: "Magazine cover-story page featuring Ar. Niket Sunil Upase and other architects discussing cladding design.",
        width: 733,
        height: 840,
      },
    ],
    ctaLabel: "View feature",
    alignment: "image-right",
  },
];

const WhatsAppIcon = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className="h-4 w-4 shrink-0"
    fill="currentColor"
  >
    <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.91-2.2-.24-.58-.48-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.06 2.88 1.21 3.07.15.2 2.09 3.19 5.06 4.47.71.3 1.26.48 1.69.62.71.23 1.35.2 1.86.12.57-.08 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35ZM12.05 2a9.94 9.94 0 0 0-8.46 15.16L2.5 21.5l4.44-1.04A9.94 9.94 0 1 0 12.05 2Zm0 18.22a8.25 8.25 0 0 1-4.2-1.15l-.3-.18-2.63.62.63-2.57-.2-.32a8.22 8.22 0 1 1 6.7 3.6Z" />
  </svg>
);

type AcademyImageProps = {
  src: string;
  alt: string;
  placeholderLabel: string;
  className: string;
  imageClassName: string;
  placeholderClassName?: string;
};

const AcademyImage = ({
  src,
  alt,
  placeholderLabel,
  className,
  imageClassName,
  placeholderClassName = "border border-foreground/10 bg-foreground/[0.03]",
}: AcademyImageProps) => {
  const [hasImageError, setHasImageError] = useState(false);

  return (
    <div className={`relative overflow-hidden ${hasImageError ? placeholderClassName : ""} ${className}`}>
      {!hasImageError ? (
        <Image
          src={src}
          alt={alt}
          fill
          unoptimized
          sizes="(min-width: 1024px) 33vw, 100vw"
          onError={() => setHasImageError(true)}
          className={imageClassName}
        />
      ) : (
        <div className="flex h-full min-h-full items-center justify-center px-5 text-center text-xs uppercase tracking-[0.18em] text-muted">
          {placeholderLabel}
        </div>
      )}
    </div>
  );
};

type AcademyLogoMarkProps = {
  src: string;
  alt: string;
};

const AcademyLogoMark = ({ src, alt }: AcademyLogoMarkProps) => (
  <div className="relative h-32 w-full lg:h-36">
    <Image
      src={src}
      alt={alt}
      fill
      unoptimized
      sizes="(min-width: 1024px) 18vw, 45vw"
      className="object-contain object-left"
    />
  </div>
);

type CredentialLightboxProps = {
  credential: AcademyCredential | null;
  onClose: () => void;
};

const CredentialLightbox = ({ credential, onClose }: CredentialLightboxProps) => {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const isOpen = Boolean(credential);

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const focusableElements = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])',
      );
      const focusable = Array.from(focusableElements ?? []).filter(
        (element) => !element.hasAttribute("disabled"),
      );

      if (focusable.length === 0) return;

      const firstElement = focusable[0];
      const lastElement = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!credential || typeof document === "undefined") return null;

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${credential.title} preview`}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 px-5 py-20 backdrop-blur-sm sm:px-6"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="relative mx-auto flex min-h-[calc(100vh-10rem)] min-h-[calc(100dvh-10rem)] w-full max-w-5xl items-center justify-center">
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close credential preview"
          className="fixed right-4 top-4 z-[60] border border-foreground/20 bg-background px-4 py-3 text-xs uppercase tracking-widest text-foreground transition-colors hover:border-saffron hover:text-saffron focus:outline-none focus:ring-2 focus:ring-saffron focus:ring-offset-2 focus:ring-offset-background md:right-6 md:top-6"
        >
          Close
        </button>
        <Image
          src={credential.image}
          alt={credential.previewAlt}
          width={credential.width}
          height={credential.height}
          unoptimized
          sizes="(min-width: 1280px) min(90vw, 1024px), calc(100vw - 40px)"
          className="h-auto max-h-[calc(100vh-10rem)] max-h-[calc(100dvh-10rem)] w-auto max-w-[min(90vw,1024px)] object-contain border border-foreground/10 bg-white"
        />
      </div>
    </div>,
    document.body,
  );
};

type PublicationLightboxProps = {
  publication: Publication | null;
  spreadIndex: number;
  onPreviousSpread: () => void;
  onNextSpread: () => void;
  onClose: () => void;
  shouldReduceMotion: boolean;
};

const PublicationLightbox = ({
  publication,
  spreadIndex,
  onPreviousSpread,
  onNextSpread,
  onClose,
  shouldReduceMotion,
}: PublicationLightboxProps) => {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const isOpen = Boolean(publication);
  const spreadCount = publication?.spreads.length ?? 0;
  const safeSpreadIndex = Math.min(Math.max(spreadIndex, 0), Math.max(spreadCount - 1, 0));
  const spread = publication?.spreads[safeSpreadIndex];
  const hasMultipleSpreads = spreadCount > 1;
  const canGoPrevious = safeSpreadIndex > 0;
  const canGoNext = safeSpreadIndex < spreadCount - 1;

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === "ArrowLeft" && hasMultipleSpreads) {
        event.preventDefault();
        if (canGoPrevious) onPreviousSpread();
        return;
      }

      if (event.key === "ArrowRight" && hasMultipleSpreads) {
        event.preventDefault();
        if (canGoNext) onNextSpread();
        return;
      }

      if (event.key !== "Tab") return;

      const focusableElements = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])',
      );
      const focusable = Array.from(focusableElements ?? []).filter(
        (element) => !element.hasAttribute("disabled"),
      );

      if (focusable.length === 0) return;

      const firstElement = focusable[0];
      const lastElement = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    canGoNext,
    canGoPrevious,
    hasMultipleSpreads,
    isOpen,
    onClose,
    onNextSpread,
    onPreviousSpread,
  ]);

  if (!publication || !spread || typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${publication.id}-viewer-title`}
        className="fixed inset-0 z-[80] overflow-y-auto bg-black/90 px-4 py-20 backdrop-blur-sm sm:px-6 md:py-24"
        initial={shouldReduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={shouldReduceMotion ? undefined : { opacity: 0 }}
        transition={{ duration: 0.2, ease: [0.76, 0, 0.24, 1] }}
        onClick={(event) => {
          if (event.target === event.currentTarget) onClose();
        }}
      >
        <h2 id={`${publication.id}-viewer-title`} className="sr-only">
          {publication.title}
        </h2>
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close publication viewer"
          className="fixed right-4 top-4 z-[90] border border-white/25 bg-black px-4 py-3 text-xs font-medium uppercase tracking-widest text-white transition-colors hover:border-saffron hover:text-saffron focus:outline-none focus:ring-2 focus:ring-saffron focus:ring-offset-2 focus:ring-offset-black md:right-6 md:top-6"
        >
          Close
        </button>
        <motion.div
          className="mx-auto flex min-h-[calc(100vh-10rem)] w-full flex-col items-center justify-start"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? undefined : { opacity: 0, y: 10 }}
          transition={{ duration: 0.25, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="w-full max-w-[1120px]">
            <AnimatePresence mode={shouldReduceMotion ? "sync" : "wait"}>
              <motion.div
                key={spread.src}
                initial={shouldReduceMotion ? false : { opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={shouldReduceMotion ? undefined : { opacity: 0, x: -10 }}
                transition={{ duration: 0.18, ease: [0.76, 0, 0.24, 1] }}
                className="w-full"
              >
                <Image
                  src={spread.src}
                  alt={spread.alt}
                  width={spread.width}
                  height={spread.height}
                  unoptimized
                  sizes="(min-width: 1280px) 1120px, calc(100vw - 32px)"
                  className="h-auto w-full border border-white/10 bg-white"
                />
              </motion.div>
            </AnimatePresence>

            {hasMultipleSpreads && (
              <div className="mt-5 flex w-full flex-wrap items-center justify-between gap-4 text-xs font-medium uppercase tracking-[0.2em] text-white">
                <button
                  type="button"
                  onClick={onPreviousSpread}
                  disabled={!canGoPrevious}
                  aria-label="Show previous publication spread"
                  className="min-h-11 text-left transition-colors hover:text-saffron focus:outline-none focus-visible:text-saffron disabled:cursor-not-allowed disabled:text-white/35"
                >
                  ← Previous
                </button>
                <span
                  className="text-saffron"
                  aria-label={`Image ${safeSpreadIndex + 1} of ${spreadCount}`}
                  aria-live="polite"
                >
                  {`${safeSpreadIndex + 1} / ${spreadCount}`}
                </span>
                <button
                  type="button"
                  onClick={onNextSpread}
                  disabled={!canGoNext}
                  aria-label="Show next publication spread"
                  className="min-h-11 text-right transition-colors hover:text-saffron focus:outline-none focus-visible:text-saffron disabled:cursor-not-allowed disabled:text-white/35"
                >
                  Next →
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body,
  );
};

type PublicationFeatureProps = {
  publication: Publication;
  onOpen: (publication: Publication, spreadIndex: number, trigger: HTMLElement) => void;
  shouldReduceMotion: boolean;
};

const PublicationFeature = ({
  publication,
  onOpen,
  shouldReduceMotion,
}: PublicationFeatureProps) => {
  const [currentSpreadIndex, setCurrentSpreadIndex] = useState(0);
  const isImageLeft = publication.alignment === "image-left";
  const isFeature = publication.type === "feature";
  const currentSpread = publication.spreads[currentSpreadIndex] ?? publication.spreads[0];
  const hasMultipleSpreads = publication.spreads.length > 1;
  const canGoPrevious = currentSpreadIndex > 0;
  const canGoNext = currentSpreadIndex < publication.spreads.length - 1;
  const mediaDesktopOrder = isImageLeft ? "lg:order-1" : "lg:order-2";
  const copyDesktopOrder = isImageLeft ? "lg:order-2" : "lg:order-1";
  const gridClass = isFeature
    ? "lg:grid-cols-[minmax(0,0.48fr)_minmax(0,0.52fr)]"
    : isImageLeft
      ? "lg:grid-cols-[minmax(0,0.66fr)_minmax(18rem,0.34fr)]"
      : "lg:grid-cols-[minmax(18rem,0.34fr)_minmax(0,0.66fr)]";
  const imageSizes = isFeature
    ? "(min-width: 1024px) 48vw, 100vw"
    : "(min-width: 1024px) 66vw, 100vw";

  const goToPreviousSpread = () => {
    setCurrentSpreadIndex((current) => Math.max(current - 1, 0));
  };

  const goToNextSpread = () => {
    setCurrentSpreadIndex((current) => Math.min(current + 1, publication.spreads.length - 1));
  };

  return (
    <motion.article
      aria-labelledby={`${publication.id}-title`}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
      className={`grid grid-cols-1 gap-8 border-t border-foreground/10 pt-10 md:gap-10 lg:items-center lg:gap-14 ${gridClass}`}
    >
      <div className={`order-1 max-w-xl ${copyDesktopOrder} ${isFeature ? "lg:max-w-lg" : ""}`}>
        {publication.eyebrow && (
          <div className="mb-5 text-xs font-medium uppercase tracking-[0.22em] text-saffron">
            {publication.eyebrow}
          </div>
        )}
        <h3
          id={`${publication.id}-title`}
          className="text-2xl font-light leading-tight tracking-tight text-foreground md:text-4xl"
        >
          {publication.title}
        </h3>
        {publication.metadata && (
          <p className="mt-5 text-xs font-medium uppercase leading-relaxed tracking-[0.2em] text-muted">
            {publication.metadata}
          </p>
        )}
        <p className="mt-6 max-w-[62ch] text-base leading-relaxed tracking-wide text-muted md:text-lg">
          {publication.description}
        </p>
        <button
          type="button"
          onClick={(event) => onOpen(publication, currentSpreadIndex, event.currentTarget)}
          className="group mt-8 hidden items-center gap-3 text-sm font-medium uppercase tracking-widest text-foreground transition-colors hover:text-saffron focus:outline-none focus-visible:text-saffron lg:inline-flex"
        >
          {publication.ctaLabel}
          <ArrowRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transition-none"
          />
        </button>
      </div>

      <div className={`order-2 ${mediaDesktopOrder}`}>
        <button
          type="button"
          onClick={(event) => onOpen(publication, currentSpreadIndex, event.currentTarget)}
          aria-label={`Open ${publication.title}, ${currentSpread.label.toLowerCase()}`}
          className="group block w-full overflow-hidden border border-foreground/10 bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <AnimatePresence mode={shouldReduceMotion ? "sync" : "wait"}>
            <motion.div
              key={currentSpread.src}
              initial={shouldReduceMotion ? false : { opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, x: -8 }}
              transition={{ duration: 0.18, ease: [0.76, 0, 0.24, 1] }}
            >
              <Image
                src={currentSpread.src}
                alt={currentSpread.alt}
                width={currentSpread.width}
                height={currentSpread.height}
                unoptimized
                sizes={imageSizes}
                className="h-auto w-full transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-[1.012] motion-reduce:transition-none"
              />
            </motion.div>
          </AnimatePresence>
        </button>

        {hasMultipleSpreads && (
          <div className="mt-4 flex flex-wrap items-center justify-between gap-x-5 gap-y-3 text-xs font-medium uppercase tracking-[0.2em]">
            <button
              type="button"
              onClick={goToPreviousSpread}
              disabled={!canGoPrevious}
              aria-label="Show previous publication spread"
              className="min-h-11 text-foreground transition-colors hover:text-saffron focus:outline-none focus-visible:text-saffron disabled:cursor-not-allowed disabled:text-muted/45"
            >
              ← Previous
            </button>
            <span
              className="text-saffron"
              aria-label={`Image ${currentSpreadIndex + 1} of ${publication.spreads.length}`}
              aria-live="polite"
            >
              {`${currentSpreadIndex + 1} / ${publication.spreads.length}`}
            </span>
            <button
              type="button"
              onClick={goToNextSpread}
              disabled={!canGoNext}
              aria-label="Show next publication spread"
              className="min-h-11 text-foreground transition-colors hover:text-saffron focus:outline-none focus-visible:text-saffron disabled:cursor-not-allowed disabled:text-muted/45"
            >
              Next →
            </button>
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={(event) => onOpen(publication, currentSpreadIndex, event.currentTarget)}
        className="group order-3 inline-flex items-center gap-3 justify-self-start text-sm font-medium uppercase tracking-widest text-foreground transition-colors hover:text-saffron focus:outline-none focus-visible:text-saffron lg:hidden"
      >
        {publication.ctaLabel}
        <ArrowRight
          size={16}
          className="transition-transform duration-300 group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transition-none"
        />
      </button>
    </motion.article>
  );
};

type SelectedPublicationsProps = {
  onOpen: (publication: Publication, spreadIndex: number, trigger: HTMLElement) => void;
  shouldReduceMotion: boolean;
};

const SelectedPublications = ({ onOpen, shouldReduceMotion }: SelectedPublicationsProps) => (
  <section aria-labelledby="selected-publications-heading" className="mt-20 md:mt-28">
    <div className="mb-14 max-w-3xl md:mb-18">
      <span className="mb-5 block text-xs font-medium uppercase tracking-widest text-saffron">
        Selected Publications
      </span>
      <h2
        id="selected-publications-heading"
        className="text-3xl font-light leading-tight tracking-tight text-foreground md:text-5xl"
      >
        Research made visible.
      </h2>
      <p className="mt-6 max-w-2xl text-base leading-relaxed tracking-wide text-muted md:text-lg">
        Essays, material studies, and published conversations exploring architecture,
        façades, health, culture, and the built environment.
      </p>
    </div>

    <div className="space-y-16 md:space-y-24">
      {publications.map((publication) => (
        <PublicationFeature
          key={publication.id}
          publication={publication}
          onOpen={onOpen}
          shouldReduceMotion={shouldReduceMotion}
        />
      ))}
    </div>

    <div className="mt-16 border-t border-foreground/10 pt-8 md:mt-24">
      <p className="text-xs font-medium uppercase tracking-[0.22em] text-saffron">
        Research Themes
      </p>
      <p className="mt-4 text-base leading-relaxed tracking-wide text-foreground md:text-lg">
        Materiality / Façades / Health / Culture / Education
      </p>
    </div>
  </section>
);

const AcademyCredentials = () => {
  const [selectedCredential, setSelectedCredential] = useState<AcademyCredential | null>(null);
  const credentialTriggerRef = useRef<HTMLButtonElement | null>(null);

  const openCredential = (credential: AcademyCredential, trigger: HTMLButtonElement) => {
    credentialTriggerRef.current = trigger;
    setSelectedCredential(credential);
  };

  const closeCredential = () => {
    const trigger = credentialTriggerRef.current;
    setSelectedCredential(null);
    window.requestAnimationFrame(() => trigger?.focus());
  };

  return (
    <aside className="min-w-0" aria-label="Academy credentials and affiliations">
      <div className="space-y-12 xl:sticky xl:top-32 xl:self-start">
        <section>
          <h3 className="mb-6 text-xs font-medium uppercase tracking-widest text-saffron">Affiliations</h3>
          <div className="grid grid-cols-2 gap-x-10 gap-y-7">
            {academyAffiliations.map((affiliation) => (
              <div key={affiliation.name} className="min-w-0">
                <AcademyLogoMark
                  src={affiliation.logo}
                  alt={`${affiliation.name} affiliation logo`}
                />
                <p className="mt-5 text-xs font-medium uppercase tracking-[0.18em] text-foreground">
                  {affiliation.name}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{affiliation.caption}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-foreground/10 pt-10">
          <h3 className="mb-6 text-xs font-medium uppercase tracking-widest text-saffron">Academy Lead</h3>
          <div className="grid grid-cols-1 gap-10 xl:grid-cols-[minmax(12rem,0.38fr)_minmax(18rem,0.52fr)] xl:items-start xl:gap-12">
            <div className="min-w-0 max-w-[17rem] lg:max-w-none">
              <div className="w-full max-w-[14rem]">
                <AcademyImage
                  src={academyLead.image}
                  alt="Portrait of Academy lead Niket Sunil Upase"
                  placeholderLabel="Academy lead portrait unavailable"
                  className="aspect-[4/5]"
                  imageClassName="h-full w-full object-contain"
                />
              </div>
              <div className="mt-6">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-foreground">
                  {academyLead.name}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{academyLead.rank}</p>
                <p className="text-sm leading-relaxed text-muted">{academyLead.academy}</p>
                <p className="text-sm leading-relaxed text-muted">{academyLead.federation}</p>
              </div>
            </div>

            <div className="flex min-w-0 max-w-[24rem] flex-col gap-10">
              {academyCredentials.map((credential) => (
                <button
                  key={credential.id}
                  type="button"
                  onClick={(event) => openCredential(credential, event.currentTarget)}
                  className={`block min-w-0 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                    credential.id === "kukkiwon-3rd-dan" ? "w-full max-w-[14rem]" : "w-full"
                  }`}
                  aria-label={credential.triggerLabel}
                >
                  <div
                    className="relative w-full border border-foreground/10 bg-foreground/[0.02]"
                    style={{ aspectRatio: `${credential.width} / ${credential.height}` }}
                  >
                    <Image
                      src={credential.image}
                      alt={credential.alt}
                      fill
                      unoptimized
                      sizes="(min-width: 1280px) 14vw, (min-width: 1024px) 18vw, (min-width: 640px) 42vw, 100vw"
                      className="object-contain"
                    />
                  </div>
                  <p className="mt-5 text-sm font-medium uppercase tracking-[0.18em] text-foreground">
                    {credential.labelLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </section>

        <CredentialLightbox credential={selectedCredential} onClose={closeCredential} />
      </div>
    </aside>
  );
};

export default function AhamasmiyodhahPage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("academy");
  const [formData, setFormData] = useState<AcademyFormData>(initialAcademyFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [selectedPublication, setSelectedPublication] = useState<Publication | null>(null);
  const [selectedPublicationSpreadIndex, setSelectedPublicationSpreadIndex] = useState(0);
  const publicationTriggerRef = useRef<HTMLElement | null>(null);
  const tabRefs = useRef<Record<ActiveTab, HTMLButtonElement | null>>({
    academy: null,
    "design-research": null,
  });
  const shouldReduceMotion = useReducedMotion();
  const activeSection = sections.find((section) => section.id === activeTab) ?? sections[0];

  useEffect(() => {
    const selectHashTab = () => {
      const hashTab = window.location.hash.replace("#", "");

      if (hashTab === "academy" || hashTab === "design-research") {
        setActiveTab(hashTab);
      }
    };

    selectHashTab();
    window.addEventListener("hashchange", selectHashTab);

    return () => window.removeEventListener("hashchange", selectHashTab);
  }, []);

  const validateForm = (data: AcademyFormData) => {
    const nextErrors: FormErrors = {};

    if (!data.name.trim()) nextErrors.name = "Please enter your name.";
    if (!data.email.trim()) {
      nextErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (!data.address.trim()) nextErrors.address = "Please enter your address.";
    if (!data.yearLeftMartialArts.trim()) {
      nextErrors.yearLeftMartialArts = "Please tell us which year you left martial arts.";
    }
    if (!data.interestedInStartingAgain) {
      nextErrors.interestedInStartingAgain = "Please select your current interest level.";
    }
    if (!data.preferredJoiningTime) {
      nextErrors.preferredJoiningTime = "Please select when you are thinking of joining.";
    }

    return nextErrors;
  };

  const updateField = (field: keyof AcademyFormData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const selectTab = (tab: ActiveTab) => {
    setActiveTab(tab);
  };

  const openPublication = (publication: Publication, spreadIndex: number, trigger: HTMLElement) => {
    publicationTriggerRef.current = trigger;
    setSelectedPublicationSpreadIndex(
      Math.min(Math.max(spreadIndex, 0), publication.spreads.length - 1),
    );
    setSelectedPublication(publication);
  };

  const closePublication = () => {
    const trigger = publicationTriggerRef.current;
    setSelectedPublication(null);
    window.requestAnimationFrame(() => {
      trigger?.focus();
      window.setTimeout(() => trigger?.focus(), 0);
    });
  };

  const showPreviousPublicationSpread = () => {
    setSelectedPublicationSpreadIndex((current) => Math.max(current - 1, 0));
  };

  const showNextPublicationSpread = () => {
    setSelectedPublicationSpreadIndex((current) =>
      selectedPublication
        ? Math.min(current + 1, selectedPublication.spreads.length - 1)
        : current,
    );
  };

  const handleTabKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;

    event.preventDefault();

    const currentIndex = sections.findIndex((section) => section.id === activeTab);
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const nextIndex = (currentIndex + direction + sections.length) % sections.length;
    const nextTab = sections[nextIndex].id;

    setActiveTab(nextTab);
    tabRefs.current[nextTab]?.focus();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateForm(formData);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    const message = `Hello, I would like to enquire about martial arts training through the Ahamasmiyodhah Academy.

Name: ${formData.name.trim()}
Email: ${formData.email.trim()}
Phone Number: ${formData.phoneNumber.trim()}
Address: ${formData.address.trim()}
Year I left martial arts: ${formData.yearLeftMartialArts.trim()}
Interested in starting again: ${formData.interestedInStartingAgain}
Preferred joining time: ${formData.preferredJoiningTime}
Martial arts preference: ${formData.martialArtsPreference || "Not specified"}
Comment: ${formData.comment.trim() || "Not specified"}`;

    const whatsappUrl = `https://wa.me/${ACADEMY_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="bg-background min-h-screen pt-32 pb-32">
      <section className="px-6 container mx-auto">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="max-w-5xl"
        >
          <span className="text-saffron uppercase tracking-widest text-xs font-medium mb-6 block">Ahamasmiyodhah</span>
          <h1 className="text-5xl md:text-8xl font-light tracking-tighter mb-8">
            Education through discipline, movement, and culture.
          </h1>
          <p className="text-xl md:text-2xl text-muted font-light leading-relaxed max-w-3xl">
            A class 42 registered educational initiative exploring martial arts, research, and education through a people-centric lens.
          </p>

          <div
            role="tablist"
            aria-label="Ahamasmiyodhah Academy and Design & Research sections"
            onKeyDown={handleTabKeyDown}
            className="mt-14 flex flex-wrap items-center gap-x-12 gap-y-5 border-b border-foreground/10"
          >
            {sections.map((section) => {
              const isActive = activeTab === section.id;

              return (
                <button
                  key={section.id}
                  ref={(element) => {
                    tabRefs.current[section.id] = element;
                  }}
                  type="button"
                  role="tab"
                  id={`${section.id}-tab`}
                  aria-selected={isActive}
                  aria-controls={`${section.id}-tabpanel`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => selectTab(section.id)}
                  className={`border-b py-4 text-sm uppercase tracking-widest transition-colors focus:outline-none focus-visible:text-saffron ${
                    isActive
                      ? "border-saffron text-saffron"
                      : "border-transparent text-muted hover:text-foreground"
                  }`}
                >
                  {section.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        <div className="mt-12 max-w-[88rem]">
          <motion.section
            key={activeTab}
            role="tabpanel"
            id={`${activeTab}-tabpanel`}
            aria-labelledby={`${activeTab}-tab`}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
          >
            {activeTab === "academy" ? (
              <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(420px,1fr)] lg:items-start lg:gap-x-14 xl:grid-cols-[minmax(0,1fr)_minmax(640px,1.1fr)] xl:gap-x-16">
                <div className="min-w-0 max-w-3xl">
                  <span className="text-saffron uppercase tracking-widest text-xs font-medium mb-5 block">
                    {activeSection.eyebrow}
                  </span>
                  <h2 className="text-3xl md:text-5xl font-light tracking-tight leading-tight mb-8 whitespace-pre-line">
                    {activeSection.title}
                  </h2>
                  <div className="space-y-5 text-muted leading-relaxed tracking-wide text-lg max-w-2xl">
                    {activeSection.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>

                  <div id="academy-enquiry" className="mt-10 border-t border-foreground/10 pt-10">
                        <div className="mb-10 max-w-2xl">
                          <p className="text-saffron uppercase tracking-widest text-xs font-medium mb-3">
                            Academy Enquiry
                          </p>
                          <p className="text-muted leading-relaxed tracking-wide">
                            Your details will open in WhatsApp for review before you send the message.
                          </p>
                        </div>

                        <form className="contact-form flex flex-col gap-10" onSubmit={handleSubmit} noValidate>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                            <div className="group">
                              <label
                                htmlFor="academy-name"
                                className="block text-muted text-xs uppercase tracking-widest mb-3 group-focus-within:text-saffron transition-colors"
                              >
                                Name *
                              </label>
                              <input
                                type="text"
                                id="academy-name"
                                name="name"
                                value={formData.name}
                                onChange={(event) => updateField("name", event.target.value)}
                                placeholder="Enter your name"
                                aria-invalid={Boolean(errors.name)}
                                aria-describedby={errors.name ? "academy-name-error" : undefined}
                                className="w-full bg-transparent border-b border-foreground/20 py-4 focus:outline-none focus:border-saffron transition-colors"
                              />
                              {errors.name && <p id="academy-name-error" className="text-saffron text-xs mt-3">{errors.name}</p>}
                            </div>

                            <div className="group">
                              <label
                                htmlFor="academy-email"
                                className="block text-muted text-xs uppercase tracking-widest mb-3 group-focus-within:text-saffron transition-colors"
                              >
                                Email *
                              </label>
                              <input
                                type="email"
                                id="academy-email"
                                name="email"
                                value={formData.email}
                                onChange={(event) => updateField("email", event.target.value)}
                                placeholder="Enter your email address"
                                aria-invalid={Boolean(errors.email)}
                                aria-describedby={errors.email ? "academy-email-error" : undefined}
                                className="w-full bg-transparent border-b border-foreground/20 py-4 focus:outline-none focus:border-saffron transition-colors"
                              />
                              {errors.email && <p id="academy-email-error" className="text-saffron text-xs mt-3">{errors.email}</p>}
                            </div>

                            <div className="group">
                              <label
                                htmlFor="academy-phone"
                                className="block text-muted text-xs uppercase tracking-widest mb-3 group-focus-within:text-saffron transition-colors"
                              >
                                Phone Number
                              </label>
                              <input
                                type="tel"
                                id="academy-phone"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={(event) => updateField("phoneNumber", event.target.value)}
                                placeholder="Enter your phone number"
                                className="w-full bg-transparent border-b border-foreground/20 py-4 focus:outline-none focus:border-saffron transition-colors"
                              />
                            </div>

                            <div className="group">
                              <label
                                htmlFor="academy-year-left"
                                className="block text-muted text-xs uppercase tracking-widest mb-3 group-focus-within:text-saffron transition-colors"
                              >
                                Which year did you leave martial arts? *
                              </label>
                              <input
                                type="text"
                                id="academy-year-left"
                                name="yearLeftMartialArts"
                                value={formData.yearLeftMartialArts}
                                onChange={(event) => updateField("yearLeftMartialArts", event.target.value)}
                                placeholder="Example: 2018"
                                aria-invalid={Boolean(errors.yearLeftMartialArts)}
                                aria-describedby={errors.yearLeftMartialArts ? "academy-year-left-error" : undefined}
                                className="w-full bg-transparent border-b border-foreground/20 py-4 focus:outline-none focus:border-saffron transition-colors"
                              />
                              {errors.yearLeftMartialArts && (
                                <p id="academy-year-left-error" className="text-saffron text-xs mt-3">
                                  {errors.yearLeftMartialArts}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="group">
                            <label
                              htmlFor="academy-address"
                              className="block text-muted text-xs uppercase tracking-widest mb-3 group-focus-within:text-saffron transition-colors"
                            >
                              Address *
                            </label>
                            <textarea
                              id="academy-address"
                              name="address"
                              value={formData.address}
                              onChange={(event) => updateField("address", event.target.value)}
                              placeholder="Enter your address"
                              rows={4}
                              aria-invalid={Boolean(errors.address)}
                              aria-describedby={errors.address ? "academy-address-error" : undefined}
                              className="w-full bg-transparent border-b border-foreground/20 py-4 focus:outline-none focus:border-saffron transition-colors resize-none"
                            />
                            {errors.address && <p id="academy-address-error" className="text-saffron text-xs mt-3">{errors.address}</p>}
                          </div>

                          <div className="group">
                            <p className="block text-muted text-xs uppercase tracking-widest mb-3">
                              Are you interested in starting your martial arts journey again? *
                            </p>
                            <div
                              className="grid grid-cols-1 gap-3 sm:grid-cols-3"
                              role="radiogroup"
                              aria-label="Are you interested in starting your martial arts journey again?"
                            >
                              {INTEREST_OPTIONS.map((option) => {
                                const isSelected = formData.interestedInStartingAgain === option;

                                return (
                                  <button
                                    key={option}
                                    type="button"
                                    role="radio"
                                    aria-checked={isSelected}
                                    onClick={() => updateField("interestedInStartingAgain", option)}
                                    className={`rounded-full border px-4 py-3 text-xs uppercase tracking-widest transition-colors focus:outline-none focus:border-saffron ${
                                      isSelected
                                        ? "border-saffron bg-saffron text-background"
                                        : "border-foreground/20 text-muted hover:border-saffron hover:text-foreground"
                                    }`}
                                  >
                                    {option}
                                  </button>
                                );
                              })}
                            </div>
                            {errors.interestedInStartingAgain && (
                              <p className="text-saffron text-xs mt-3">{errors.interestedInStartingAgain}</p>
                            )}
                          </div>

                          <div className="group">
                            <p className="block text-muted text-xs uppercase tracking-widest mb-3">
                              When are you thinking of joining martial arts? *
                            </p>
                            <div
                              className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
                              role="radiogroup"
                              aria-label="When are you thinking of joining martial arts?"
                            >
                              {JOINING_OPTIONS.map((option) => {
                                const isSelected = formData.preferredJoiningTime === option;

                                return (
                                  <button
                                    key={option}
                                    type="button"
                                    role="radio"
                                    aria-checked={isSelected}
                                    onClick={() => updateField("preferredJoiningTime", option)}
                                    className={`rounded-full border px-4 py-3 text-xs uppercase tracking-widest transition-colors focus:outline-none focus:border-saffron ${
                                      isSelected
                                        ? "border-saffron bg-saffron text-background"
                                        : "border-foreground/20 text-muted hover:border-saffron hover:text-foreground"
                                    }`}
                                  >
                                    {option}
                                  </button>
                                );
                              })}
                            </div>
                            {errors.preferredJoiningTime && (
                              <p className="text-saffron text-xs mt-3">{errors.preferredJoiningTime}</p>
                            )}
                          </div>

                          <div className="group">
                            <p className="block text-muted text-xs uppercase tracking-widest mb-3">
                              Which form of martial arts would you like to learn?
                            </p>
                            <div
                              className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
                              role="radiogroup"
                              aria-label="Which form of martial arts would you like to learn?"
                            >
                              {MARTIAL_ARTS_OPTIONS.map((option) => {
                                const isSelected = formData.martialArtsPreference === option;

                                return (
                                  <button
                                    key={option}
                                    type="button"
                                    role="radio"
                                    aria-checked={isSelected}
                                    onClick={() => updateField("martialArtsPreference", option)}
                                    className={`rounded-full border px-4 py-3 text-xs uppercase tracking-widest transition-colors focus:outline-none focus:border-saffron ${
                                      isSelected
                                        ? "border-saffron bg-saffron text-background"
                                        : "border-foreground/20 text-muted hover:border-saffron hover:text-foreground"
                                    }`}
                                  >
                                    {option}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          <div className="group">
                            <label
                              htmlFor="academy-comment"
                              className="block text-muted text-xs uppercase tracking-widest mb-3 group-focus-within:text-saffron transition-colors"
                            >
                              Comment
                            </label>
                            <textarea
                              id="academy-comment"
                              name="comment"
                              value={formData.comment}
                              onChange={(event) => updateField("comment", event.target.value)}
                              placeholder="Add anything else you would like us to know"
                              rows={5}
                              className="w-full bg-transparent border-b border-foreground/20 py-4 focus:outline-none focus:border-saffron transition-colors resize-none"
                            />
                          </div>

                          <button
                            type="submit"
                            className="group inline-flex max-w-full self-start items-center gap-4 rounded-full bg-foreground px-8 py-4 text-left text-sm uppercase leading-relaxed tracking-widest text-background transition-colors duration-300 hover:bg-saffron focus:outline-none focus:ring-2 focus:ring-saffron focus:ring-offset-2 focus:ring-offset-background"
                          >
                            <span className="flex min-w-0 flex-wrap items-center gap-2">
                              <WhatsAppIcon />
                              SUBMIT ACADEMY ENQUIRY ON WHATSAPP
                            </span>
                            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                          </button>
                        </form>
                  </div>
                </div>

                <AcademyCredentials />
              </div>
            ) : (
              <div>
                <div className="max-w-4xl">
                  <span className="text-saffron uppercase tracking-widest text-xs font-medium mb-5 block">
                    {activeSection.eyebrow}
                  </span>
                  <h2 className="text-3xl md:text-5xl font-light tracking-tight leading-tight mb-8 whitespace-pre-line">
                    {activeSection.title}
                  </h2>
                  <div className="space-y-5 text-muted leading-relaxed tracking-wide text-lg max-w-2xl">
                    {activeSection.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                    <p>
                      Alongside its exploration of movement and pedagogy, Ahamasmiyodhah
                      documents architectural inquiry through material studies, published
                      writing, and conversations around the built environment.
                    </p>
                  </div>
                </div>
                <SelectedPublications
                  onOpen={openPublication}
                  shouldReduceMotion={Boolean(shouldReduceMotion)}
                />
              </div>
            )}
          </motion.section>
        </div>
      </section>
      <PublicationLightbox
        publication={selectedPublication}
        spreadIndex={selectedPublicationSpreadIndex}
        onPreviousSpread={showPreviousPublicationSpread}
        onNextSpread={showNextPublicationSpread}
        onClose={closePublication}
        shouldReduceMotion={Boolean(shouldReduceMotion)}
      />
    </div>
  );
}
