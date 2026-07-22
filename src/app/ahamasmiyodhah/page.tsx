"use client";

import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
};

type ActiveTab = "academy" | "design-research";

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
  image: "/images/academy/academy-lead.jpeg",
} as const;

const academyCredential = {
  title: "Black Belt Certification",
  image: "/images/academy/black-belt-certificate.jpeg",
} as const;

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
  isOpen: boolean;
  onClose: () => void;
};

const CredentialLightbox = ({ isOpen, onClose }: CredentialLightboxProps) => {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);

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

  if (!isOpen || typeof document === "undefined") return null;

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Black belt certification credential preview"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 px-5 py-8 backdrop-blur-sm"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="relative flex max-h-full w-full max-w-5xl items-center justify-center">
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close credential preview"
          className="absolute right-0 top-0 z-10 border border-foreground/20 bg-background px-4 py-3 text-xs uppercase tracking-widest text-foreground transition-colors hover:border-saffron hover:text-saffron focus:outline-none focus:ring-2 focus:ring-saffron focus:ring-offset-2 focus:ring-offset-background"
        >
          Close
        </button>
        <AcademyImage
          src={academyCredential.image}
          alt="Full preview of Niket Sunil Upase black belt certification"
          placeholderLabel="Certificate preview unavailable"
          className="mt-16 flex aspect-[4/3] max-h-[78vh] w-full max-w-4xl items-center justify-center bg-foreground/[0.02]"
          imageClassName="max-h-[78vh] w-full object-contain"
        />
      </div>
    </div>,
    document.body,
  );
};

const AcademyCredentials = () => {
  const [isCredentialOpen, setIsCredentialOpen] = useState(false);
  const credentialTriggerRef = useRef<HTMLButtonElement | null>(null);

  const closeCredential = () => {
    setIsCredentialOpen(false);
    window.requestAnimationFrame(() => credentialTriggerRef.current?.focus());
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
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] sm:items-start">
            <div className="min-w-0">
              <AcademyImage
                src={academyLead.image}
                alt="Portrait of Academy lead Niket Sunil Upase"
                placeholderLabel="Academy lead portrait unavailable"
                className="aspect-[4/5]"
                imageClassName="h-full w-full object-contain"
              />
              <div className="mt-6">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-foreground">
                  {academyLead.name}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{academyLead.rank}</p>
                <p className="text-sm leading-relaxed text-muted">{academyLead.academy}</p>
              </div>
            </div>

            <button
              ref={credentialTriggerRef}
              type="button"
              onClick={() => setIsCredentialOpen(true)}
              className="block min-w-0 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-label="View black belt certification credential"
            >
              <AcademyImage
                src={academyCredential.image}
                alt="Preview of black belt certification"
                placeholderLabel="Certificate preview unavailable"
                className="aspect-[4/3] border border-foreground/10 bg-foreground/[0.02]"
                imageClassName="h-full w-full object-contain"
              />
              <p className="mt-5 text-sm font-medium uppercase tracking-[0.18em] text-foreground">
                {academyCredential.title}
              </p>
            </button>
          </div>
        </section>

        <CredentialLightbox isOpen={isCredentialOpen} onClose={closeCredential} />
      </div>
    </aside>
  );
};

export default function AhamasmiyodhahPage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("academy");
  const [formData, setFormData] = useState<AcademyFormData>(initialAcademyFormData);
  const [errors, setErrors] = useState<FormErrors>({});
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
              <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(420px,1fr)] lg:items-start lg:gap-x-14 xl:grid-cols-[minmax(0,1.25fr)_minmax(500px,1.05fr)] xl:gap-x-16">
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
                </div>
              </div>
            )}
          </motion.section>
        </div>
      </section>
    </div>
  );
}
