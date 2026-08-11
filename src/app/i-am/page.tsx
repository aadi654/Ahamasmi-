"use client";

import { Fragment } from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { ProtectedImage } from "@/components/protected-image";

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

type StudioProfile = {
  name: string;
  role: string;
  image: string;
  alt: string;
  imagePosition?: string;
};

const studioLeaders: StudioProfile[] = [
  {
    name: "NEELAM MEHTA UPASE",
    role: "Principal Architect",
    image: "/images/team/neelam-mehta-upas.jpeg",
    alt: "Neelam Mehta Upase, Principal Architect",
    imagePosition: "center 52%",
  },
  {
    name: "AR. NIKET SUNIL UPASE",
    role: "Founder Architect",
    image: "/images/team/niket-sunil-upase.jpeg",
    alt: "Ar. Niket Sunil Upase, Founder Architect",
    imagePosition: "center center",
  },
];

const studioTeam: StudioProfile[] = [
  {
    name: "Yashwanth",
    role: "Networking Officer",
    image: "/images/team/yashwanth.jpg",
    alt: "Yashwanth, Networking Officer",
    imagePosition: "center 32%",
  },
  {
    name: "Nandini Choudhary",
    role: "Interior Designer",
    image: "/images/team/nandini-choudhary.jpg",
    alt: "Nandini Choudhary, Interior Designer",
    imagePosition: "center 28%",
  },
  {
    name: "Saraswathi Shette",
    role: "BIM Engineer",
    image: "/images/team/saraswathi-shette.jpg",
    alt: "Saraswathi Shette, BIM Engineer",
    imagePosition: "center 28%",
  },
  {
    name: "Shashank C. Balaji",
    role: "BIM Architect",
    image: "/images/team/shashank-c-balaji.jpg",
    alt: "Shashank C. Balaji, BIM Architect",
    imagePosition: "center 28%",
  },
  {
    name: "Yashaswini SM",
    role: "Junior Engineer",
    image: "/images/team/yashaswini-sm.jpg",
    alt: "Yashaswini SM, Junior Engineer",
    imagePosition: "center 30%",
  },
];

type Collaborator = {
  name: string;
  role: string;
  organisation: string;
  location: string;
  portrait: string;
  alt: string;
  objectPosition?: string;
};

type CollaborationLogo = {
  name: string;
  image: string;
  alt: string;
  className?: string;
  sizes?: string;
};

type TechnologyCollaborator = {
  name: string;
  role: string;
  detail: string;
  image: string;
  alt: string;
  objectPosition: string;
};

const collaborators: Collaborator[] = [
  {
    name: "Ar. Sharifah Alawiyah",
    role: "Managing Partner",
    organisation: "Designworks Architects & Consultants Sdn. Bhd.",
    location: "Malaysia",
    portrait: "/images/collaborators/sharifah-alawiyah.png",
    alt: "Ar. Sharifah Alawiyah, Managing Partner",
    objectPosition: "center 28%",
  },
  {
    name: "Melissa Kirchmann",
    role: "Founder",
    organisation: "ROOM DESIGN",
    location: "South Africa",
    portrait: "/images/collaborators/melissa-kirchman.png",
    alt: "Melissa Kirchmann, Founder of ROOM DESIGN",
    objectPosition: "center 34%",
  },
  {
    name: "SISIRA DISKUL",
    role: "Founder / Design Director",
    organisation: "9183 Design Co. Ltd.",
    location: "Thailand",
    portrait: "/images/collaborators/sisira-diskul.jpg",
    alt: "Sisira Diskul, Founder and Design Director of 9183 Design Co. Ltd.",
    objectPosition: "center 34%",
  },
  {
    name: "Janet Ewens",
    role: "Founder, Preventative Healthcare",
    organisation: "Babylon Health Hub",
    location: "London",
    portrait: "/images/collaborators/janet-ewens.jpg",
    alt: "Janet Ewens, Founder of Babylon Health Hub",
    objectPosition: "center 30%",
  },
  {
    name: "Udayan Deshpande",
    role: "Founder",
    organisation: "Home Awaits",
    location: "India",
    portrait: "/images/collaborators/udayan-deshpande.jpg",
    alt: "Udayan Deshpande, Founder of Home Awaits",
    objectPosition: "center 32%",
  },
];

const collaborationLogos: CollaborationLogo[] = [
  {
    name: "Designworks Architects & Consultants Sdn. Bhd.",
    image: "/images/collaborators/logos/designworks.png",
    alt: "Designworks Architects and Consultants logo",
    className: "h-16 max-w-[10rem]",
  },
  {
    name: "ROOM DESIGN",
    image: "/images/collaborators/logos/room-design.png",
    alt: "ROOM DESIGN logo",
    className: "h-16 max-w-[10rem]",
  },
  {
    name: "Babylon Health Hub",
    image: "/images/collaborators/logos/babylon-health-hub.jpg",
    alt: "Babylon Health Hub logo",
    className: "h-16 max-w-[11.75rem]",
  },
  {
    name: "Home Awaits",
    image: "/images/collaborators/logos/home-awaits.jpg",
    alt: "Home Awaits logo",
    className: "h-[4.5rem] max-w-[5rem]",
  },
  {
    name: "Mindful Solutions",
    image: "/images/collaborators/logos/mindful-solutions-dr-kiran-desai.jpeg",
    alt: "Mindful Solutions - Dr. Kiran J. Desai",
    className: "h-36 max-w-[9rem] sm:h-40 sm:max-w-[10rem] lg:h-44 lg:max-w-[12rem]",
    sizes: "(min-width: 1024px) 12rem, (min-width: 640px) 10rem, 44vw",
  },
  {
    name: "Vedlaxmi Engineering Solutions",
    image: "/images/collaborators/logos/vedlaxmi-engineering-solutions-logo.jpeg",
    alt: "Vedlaxmi Engineering Solutions",
    className: "h-20 max-w-[13rem] sm:max-w-[14rem] lg:max-w-[14.25rem]",
  },
];

const primaryCollaborationLogos = collaborationLogos.slice(0, 4);
const featuredCollaborationLogos = collaborationLogos.slice(4);

const technologyCollaborators: TechnologyCollaborator[] = [
  {
    name: "Prabodh Kotasthane",
    role: "Technology Advisor",
    detail: "Co-Founder, Zijus",
    image: "/images/collaborators/prabodh-kotasthane.jpg",
    alt: "Prabodh Kotasthane - Technology Advisor",
    objectPosition: "center 24%",
  },
  {
    name: "Aditya Deshpande",
    role: "Digital Product & Technology Partner",
    detail: "Web Platforms & Digital Systems",
    image: "/images/collaborators/aditya-deshpande.jpg",
    alt: "Aditya Deshpande - Digital Product and Technology Partner",
    objectPosition: "30% center",
  },
];

const institutionalCollaborator = {
  label: "Martial Arts & Education",
  eyebrow: "ITKBA",
  title: ["Indian Taekwondo", "Kick Boxing", "Association"],
  logo: "/images/collaborators/logos/itkba.png",
  logoAlt: "Indian Taekwondo Kick Boxing Association logo",
  description: "Part of Ahamasmi’s martial arts and educational network.",
};

const deccanTaekwondoAcademy = {
  eyebrow: "DECCAN",
  title: ["DECCAN TAEKWONDO", "ACADEMY"],
  logo: "/images/academy/world-taekwondo-logo.png",
  logoAlt: "World Taekwondo logo",
  description: "Part of Ahamasmi’s martial arts and educational network.",
};

type InstitutionalOrganisation = {
  eyebrow: string;
  title: string[];
  logo: string;
  logoAlt: string;
  description: string;
};

type GrandmasterProfileData = {
  name: string;
  details: string[];
  location?: string;
  image: string;
  alt: string;
  objectPosition: string;
};

type GrandmasterGroup = {
  heading: string;
  profiles: GrandmasterProfileData[];
};

const grandmasterGroups: GrandmasterGroup[] = [
  {
    heading: "ITKBA Grandmasters",
    profiles: [
      {
        name: "SHREE SANTOSH CHAVARE",
        details: [
          "Grandmaster, Indian Taekwondo Kick Boxing Association",
          "President, School of Chota Commandos",
        ],
        location: "Solapur, Maharashtra",
        image: "/images/collaborators/santosh-chavare.jpg",
        alt: "Shree Santosh Chavare",
        objectPosition: "center 28%",
      },
      {
        name: "SHREE ULHAAS CHAVARE",
        details: [
          "Secretary and Chief Instructor, Indian Taekwondo Kick Boxing Association",
          "Chief Instructor, School of Chota Commandos",
          "Sai Sham Lodge and Restaurant",
        ],
        location: "Solapur, Maharashtra",
        image: "/images/collaborators/ulhaas-chavare.jpg",
        alt: "Shree Ulhaas Chavare",
        objectPosition: "center 24%",
      },
    ],
  },
  {
    heading: "Deccan Grandmaster",
    profiles: [
      {
        name: "SHREE MUTHAPPA HL",
        details: [
          "Grandmaster, Deccan Taekwondo Academy",
          "7th Dan Black Belt",
          "World Taekwondo Federation",
          "Kukkiwon Taekwondo Headquarters",
        ],
        image: "/images/collaborators/muthappa-hl.png",
        alt: "Shree Muthappa HL, Grandmaster of Deccan Taekwondo Academy",
        objectPosition: "center 30%",
      },
    ],
  },
];

type TeamProfileProps = {
  member: StudioProfile;
  variant: "leadership" | "team";
};

const TeamProfile = ({ member, variant }: TeamProfileProps) => {
  const isLeadership = variant === "leadership";

  return (
    <motion.article
      variants={fadeUp}
      className={`group w-full border-t border-foreground/12 pt-5 ${
        isLeadership ? "mx-auto max-w-[30rem] md:max-w-none" : "mx-auto max-w-[20rem] xl:max-w-[10.5rem]"
      }`}
    >
      <div
        className={`relative overflow-hidden bg-foreground/[0.035] ${
          isLeadership ? "mb-5 aspect-[4/5]" : "mb-4 aspect-[4/5]"
        }`}
      >
        <ProtectedImage
          src={member.image}
          alt={member.alt}
          fill
          sizes={
            isLeadership
              ? "(min-width: 1024px) 42vw, (min-width: 768px) 45vw, 100vw"
              : "(min-width: 1280px) 10.5rem, (min-width: 1024px) 28vw, (min-width: 640px) 45vw, 100vw"
          }
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] motion-reduce:transition-none group-hover:scale-[1.015]"
          style={{ objectPosition: member.imagePosition ?? "center center" }}
        />
      </div>
      <div className="w-full">
        <h3
          className={`font-light leading-tight tracking-[0.08em] text-foreground ${
            isLeadership ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"
          }`}
        >
          {member.name}
        </h3>
        <p className="mt-2 text-sm uppercase tracking-[0.18em] text-foreground/58">
          {member.role}
        </p>
      </div>
    </motion.article>
  );
};

type OrganisationLogoProps = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
};

const OrganisationLogo = ({
  src,
  alt,
  className = "h-16 max-w-[15rem]",
  sizes = "(min-width: 768px) 15rem, 12rem",
}: OrganisationLogoProps) => (
  <div className={`relative w-full ${className}`}>
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      className="object-contain object-center"
    />
  </div>
);

const CollaborationLogoItem = ({
  logo,
  className = "min-h-24 sm:min-h-28",
}: {
  logo: CollaborationLogo;
  className?: string;
}) => (
  <motion.div
    key={logo.name}
    variants={fadeUp}
    className={`flex items-center justify-center px-2 opacity-[0.85] transition duration-300 ease-out hover:scale-[1.015] hover:opacity-100 motion-reduce:transition-none sm:px-4 ${className}`}
  >
    <OrganisationLogo
      src={logo.image}
      alt={logo.alt}
      className={logo.className ?? "h-16 max-w-[13rem]"}
      sizes={logo.sizes ?? "(min-width: 1024px) 13rem, (min-width: 768px) 12rem, 42vw"}
    />
  </motion.div>
);

const CollaboratorProfile = ({ collaborator }: { collaborator: Collaborator }) => (
  <motion.article variants={fadeUp} className="group mx-auto w-full max-w-[16.5rem] sm:mx-0">
    <div className="relative mb-5 aspect-[4/5] overflow-hidden bg-foreground/[0.035]">
      <ProtectedImage
        src={collaborator.portrait}
        alt={collaborator.alt}
        fill
        sizes="(min-width: 1280px) 16.5rem, (min-width: 768px) 32vw, 82vw"
        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] motion-reduce:transition-none group-hover:scale-[1.012]"
        style={{ objectPosition: collaborator.objectPosition ?? "center center" }}
      />
    </div>

    <div className="w-full">
      <h3 className="text-lg font-light uppercase leading-tight tracking-[0.08em] text-foreground md:text-xl">
        {collaborator.name}
      </h3>
      <p className="mt-2 text-sm leading-relaxed tracking-wide text-foreground/62">
        {collaborator.role}
      </p>
      <p className="mt-4 text-sm leading-relaxed tracking-wide text-foreground/72">
        {collaborator.organisation}
      </p>
      <p className="mt-3 text-xs uppercase tracking-[0.22em] text-foreground/48">
        {collaborator.location}
      </p>
    </div>
  </motion.article>
);

const SectionMarker = ({ label }: { label: string }) => (
  <div className="mb-10">
    <h3 className="text-xs font-medium uppercase tracking-[0.28em] text-saffron">
      {label}
    </h3>
  </div>
);

const CollaboratorsSection = () => (
  <section className="border-t border-foreground/10 pt-8">
    <SectionMarker label="Collaborators" />

    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={stagger}
      className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-6 lg:gap-x-12 lg:gap-y-18"
    >
      {collaborators.map((collaborator, index) => (
        <div
          key={collaborator.name}
          className={`lg:col-span-2 ${index === 3 ? "lg:col-start-2" : ""}`}
        >
          <CollaboratorProfile collaborator={collaborator} />
        </div>
      ))}
    </motion.div>
  </section>
);

const CollaborationNetwork = () => (
  <section className="border-t border-foreground/10 pt-8">
    <SectionMarker label="Collaboration Network" />
    <p className="mb-10 max-w-xl text-sm leading-relaxed tracking-wide text-foreground/62">
      Independent practices and organisations connected through shared work, knowledge, and exchange.
    </p>

    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={stagger}
      className="space-y-14 md:space-y-16 lg:space-y-18"
    >
      <div className="grid grid-cols-1 items-center gap-x-8 gap-y-12 min-[360px]:grid-cols-2 sm:gap-x-10 lg:grid-cols-4 lg:gap-x-12">
        {primaryCollaborationLogos.map((logo) => (
          <CollaborationLogoItem key={logo.name} logo={logo} />
        ))}
      </div>

      <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-12 gap-y-12 min-[360px]:grid-cols-2 md:gap-x-20 lg:max-w-3xl lg:gap-x-28">
        {featuredCollaborationLogos.map((logo) => (
          <CollaborationLogoItem
            key={logo.name}
            logo={logo}
            className="min-h-36 sm:min-h-40 lg:min-h-44"
          />
        ))}
      </div>
    </motion.div>
  </section>
);

const TechnologyCollaboratorProfile = ({
  collaborator,
}: {
  collaborator: TechnologyCollaborator;
}) => (
  <motion.article
    variants={fadeUp}
    className="group mx-auto w-full max-w-[18rem] md:max-w-none"
  >
    <div className="relative aspect-[4/5] overflow-hidden bg-foreground/[0.035]">
      <ProtectedImage
        src={collaborator.image}
        alt={collaborator.alt}
        fill
        sizes="(min-width: 1024px) 18rem, (min-width: 768px) 36vw, 86vw"
        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] motion-reduce:transition-none group-hover:scale-[1.015]"
        style={{ objectPosition: collaborator.objectPosition }}
      />
    </div>

    <div className="mt-6 w-full">
      <h3 className="text-xl font-light leading-tight tracking-[0.06em] text-foreground md:text-2xl">
        {collaborator.name}
      </h3>
      <p className="mt-2 text-sm uppercase leading-relaxed tracking-[0.18em] text-foreground/58">
        {collaborator.role}
      </p>
      <p className="mt-2 text-sm leading-relaxed tracking-wide text-foreground/62">
        {collaborator.detail}
      </p>
    </div>
  </motion.article>
);

const DigitalTechnologySection = () => (
  <section className="border-t border-foreground/10 pt-8">
    <SectionMarker label="Digital & Technology" />
    <p className="mb-14 max-w-xl text-sm leading-relaxed tracking-wide text-foreground/62 md:mb-16">
      Digital collaborators supporting Ahamasmi across technology, web platforms and evolving digital systems.
    </p>

    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={stagger}
      className="mx-auto grid max-w-4xl grid-cols-1 gap-14 md:grid-cols-2 md:gap-20 lg:max-w-[54rem] lg:gap-28"
    >
      {technologyCollaborators.map((collaborator) => (
        <TechnologyCollaboratorProfile
          key={collaborator.name}
          collaborator={collaborator}
        />
      ))}
    </motion.div>
  </section>
);

const GrandmasterProfile = ({ grandmaster }: { grandmaster: GrandmasterProfileData }) => (
  <motion.article variants={fadeUp} className="group mx-auto w-full max-w-[18rem] md:mx-0">
    <div className="relative mb-6 aspect-[4/5] overflow-hidden bg-foreground/[0.035]">
      <ProtectedImage
        src={grandmaster.image}
        alt={grandmaster.alt}
        fill
        sizes="(min-width: 1024px) 18rem, (min-width: 768px) 34vw, 82vw"
        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] motion-reduce:transition-none group-hover:scale-[1.012]"
        style={{ objectPosition: grandmaster.objectPosition }}
      />
    </div>

    <div className="max-w-md">
      <h4 className="text-lg font-light uppercase leading-tight tracking-[0.08em] text-foreground md:text-xl">
        {grandmaster.name}
      </h4>
      <div className="mt-4 space-y-2 text-sm leading-relaxed tracking-wide text-foreground/66">
        {grandmaster.details.map((detail) => (
          <p key={detail}>{detail}</p>
        ))}
      </div>
      {grandmaster.location && (
        <p className="mt-5 text-xs uppercase tracking-[0.22em] text-foreground/48">
          {grandmaster.location}
        </p>
      )}
    </div>
  </motion.article>
);

const InstitutionalOrganisationIntro = ({
  organisation,
}: {
  organisation: InstitutionalOrganisation;
}) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-80px" }}
    variants={fadeUp}
    className="grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,0.62fr)_minmax(0,1fr)] md:items-center md:gap-10"
  >
    <div>
      <div className="relative aspect-square w-full max-w-[11.5rem]">
        <Image
          src={organisation.logo}
          alt={organisation.logoAlt}
          fill
          sizes="(min-width: 768px) 11.5rem, 56vw"
          className="object-contain object-left"
        />
      </div>
    </div>

    <div className="max-w-xl">
      <p className="text-xs font-medium uppercase tracking-[0.28em] text-foreground/48">
        {organisation.eyebrow}
      </p>
      <h3 className="mt-5 text-3xl font-light uppercase leading-tight tracking-[0.08em] text-foreground md:text-4xl">
        {organisation.title.map((line) => (
          <Fragment key={line}>
            {line}
            <br />
          </Fragment>
        ))}
      </h3>
      <p className="mt-6 max-w-md text-base font-light leading-relaxed tracking-wide text-foreground/68">
        {organisation.description}
      </p>
    </div>
  </motion.div>
);

const GrandmasterGroup = ({ group }: { group: GrandmasterGroup }) => (
  <div>
    <p className="mb-8 text-xs font-medium uppercase tracking-[0.28em] text-saffron">
      {group.heading}
    </p>
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={stagger}
      className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-20 lg:max-w-3xl lg:gap-24"
    >
      {group.profiles.map((grandmaster) => (
        <GrandmasterProfile key={grandmaster.name} grandmaster={grandmaster} />
      ))}
    </motion.div>
  </div>
);

const InstitutionalCollaboratorFeature = () => (
  <section className="border-t border-foreground/10 pt-8">
    <SectionMarker label={institutionalCollaborator.label} />

    <div className="space-y-10 md:space-y-12">
      <InstitutionalOrganisationIntro organisation={institutionalCollaborator} />
      <GrandmasterGroup group={grandmasterGroups[0]} />

      <div className="pt-8 md:pt-10">
        <InstitutionalOrganisationIntro organisation={deccanTaekwondoAcademy} />
      </div>
      <GrandmasterGroup group={grandmasterGroups[1]} />
    </div>
  </section>
);

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
            The Collective
            <br />
            Behind Ahamasmi
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

        <div className="mx-auto max-w-6xl space-y-20 md:space-y-32">
          <div>
            <p className="mx-auto mb-9 max-w-4xl text-xs font-medium uppercase tracking-[0.28em] text-saffron">
              Studio Leadership
            </p>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
              className="mx-auto grid max-w-4xl grid-cols-1 gap-12 md:grid-cols-2 lg:gap-24"
            >
              {studioLeaders.map((member) => (
                <TeamProfile
                  key={member.name}
                  member={member}
                  variant="leadership"
                />
              ))}
            </motion.div>
          </div>

          <div>
            <p className="mx-auto mb-9 max-w-4xl text-xs font-medium uppercase tracking-[0.28em] text-saffron">
              Studio Team
            </p>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
              className="mx-auto grid max-w-4xl grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-x-9 xl:gap-y-12"
            >
              {studioTeam.map((member) => (
                <TeamProfile
                  key={member.name}
                  member={member}
                  variant="team"
                />
              ))}
            </motion.div>
          </div>
        </div>
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
            Ahamasmi grows through relationships across architecture, interiors, hospitality, wellbeing, education, and martial practice. Each collaboration brings a distinct form of knowledge—expanding how we understand people, place, material, and experience.
          </p>
        </motion.div>

        <div className="mx-auto max-w-6xl space-y-16 md:space-y-24">
          <CollaboratorsSection />
          <CollaborationNetwork />
          <DigitalTechnologySection />
          <InstitutionalCollaboratorFeature />
        </div>
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
