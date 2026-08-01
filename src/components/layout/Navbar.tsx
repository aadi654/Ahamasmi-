"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/ahamasmiyodhah", label: "Ahamasmiyodhah" },
  { href: "/i-am", label: "I AM" },
  { href: "/contact", label: "Contact" },
];

const projectSubmenuLinks = [
  { href: "/projects", label: "Architecture" },
  { href: "/projects", label: "Interior" },
  { href: "/projects", label: "BIM" },
  { href: "/projects", label: "Urban Design" },
];

const aySubmenuLinks = [
  { href: "/ahamasmiyodhah#academy", label: "Academy" },
  { href: "/ahamasmiyodhah#design-research", label: "Design & Research" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<"projects" | "ahamasmiyodhah" | null>(null);
  const [activeSubmenuLeft, setActiveSubmenuLeft] = useState<number | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const hasHero = pathname === "/";
  const showProjectsSubmenu = pathname !== "/";
  const showAhamasmiyodhahSubmenu = pathname !== "/";
  const isDarkBg = hasHero && !isScrolled;
  const textColorClass = isDarkBg ? "text-white" : "text-foreground";
  const projectSubmenuTextClass =
    isDarkBg ? "text-white/56 hover:text-white" : "text-foreground/56 hover:text-foreground";
  const projectSubmenuSeparatorClass =
    isDarkBg ? "text-white/24" : "text-foreground/35";
  const activeSubmenuLinks =
    activeSubmenu === "projects"
      ? projectSubmenuLinks
      : activeSubmenu === "ahamasmiyodhah"
        ? aySubmenuLinks
        : [];
  const isHomePage = pathname === "/";
  const isActiveLink = (href: string) => (href === "/" ? pathname === href : pathname === href || pathname.startsWith(`${href}/`));
  const showPersistentActiveState = (href: string) => isActiveLink(href) && !isHomePage;
  const getLinkTextClass = (href: string) => (showPersistentActiveState(href) ? "text-saffron" : textColorClass);
  const getUnderlineClass = (href: string) => (showPersistentActiveState(href) ? "w-full" : "w-0 group-hover:w-full");
  const getMobileLinkTextClass = (href: string) => (showPersistentActiveState(href) ? "text-saffron" : "text-foreground");
  const getMobileUnderlineClass = (href: string) => (showPersistentActiveState(href) ? "w-[calc(100%-2rem)]" : "w-0 group-hover:w-[calc(100%-2rem)]");
  const updateSubmenuPosition = (element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    setActiveSubmenuLeft(rect.left + rect.width / 2);
  };
  const closeMobileMenu = () => {
    setIsOpen(false);
    setActiveSubmenu(null);
    setActiveSubmenuLeft(null);
  };

  return (
    <header
      onMouseLeave={() => {
        setActiveSubmenu(null);
        setActiveSubmenuLeft(null);
      }}
      className={`pointer-events-none fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        isScrolled ? "bg-background/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 h-24 flex items-center justify-between pointer-events-auto">
        <Link href="/" className={`-translate-x-2 text-3xl tracking-widest uppercase font-medium z-50 transition-colors duration-300 ${textColorClass}`}>
          Ahamasmi Architect
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden translate-x-6 md:flex gap-10">
          {links.map((link) => (
            link.label === "Projects" ? (
              <div
                key={link.href}
                className="relative group/projects"
                onMouseEnter={(event) => {
                  if (!showProjectsSubmenu) return;
                  setActiveSubmenu("projects");
                  updateSubmenuPosition(event.currentTarget);
                }}
                onFocus={(event) => {
                  if (!showProjectsSubmenu) return;
                  setActiveSubmenu("projects");
                  updateSubmenuPosition(event.currentTarget);
                }}
              >
                <Link
                  href={link.href}
                  className={`text-lg tracking-wide transition-colors duration-300 relative group ${getLinkTextClass(link.href)} hover:text-saffron`}
                >
                  {link.label}
                  <span className={`absolute -bottom-1 left-0 h-[1px] bg-saffron transition-all duration-300 ${getUnderlineClass(link.href)}`} />
                </Link>
              </div>
            ) : link.label === "Ahamasmiyodhah" ? (
              <div
                key={link.href}
                className="relative group/ay"
                onMouseEnter={(event) => {
                  if (!showAhamasmiyodhahSubmenu) return;
                  setActiveSubmenu("ahamasmiyodhah");
                  updateSubmenuPosition(event.currentTarget);
                }}
                onFocus={(event) => {
                  if (!showAhamasmiyodhahSubmenu) return;
                  setActiveSubmenu("ahamasmiyodhah");
                  updateSubmenuPosition(event.currentTarget);
                }}
              >
                <Link
                  href={link.href}
                  className={`text-lg tracking-wide transition-colors duration-300 relative group ${getLinkTextClass(link.href)} hover:text-saffron`}
                >
                  {link.label}
                  <span className={`absolute -bottom-1 left-0 h-[1px] bg-saffron transition-all duration-300 ${getUnderlineClass(link.href)}`} />
                </Link>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                onMouseEnter={() => {
                  setActiveSubmenu(null);
                  setActiveSubmenuLeft(null);
                }}
                onFocus={() => {
                  setActiveSubmenu(null);
                  setActiveSubmenuLeft(null);
                }}
                className={`text-lg ${link.label === "I AM" ? "tracking-[0.14em]" : "tracking-wide"} transition-colors duration-300 relative group ${getLinkTextClass(link.href)} hover:text-saffron`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-[1px] bg-saffron transition-all duration-300 ${getUnderlineClass(link.href)}`} />
              </Link>
            )
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden z-50 text-foreground mix-blend-difference text-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-controls="mobile-navigation"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <div
        className={`relative hidden min-h-12 w-full px-6 md:block ${
          activeSubmenu ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          style={{ left: activeSubmenuLeft ?? "50%" }}
          className={`absolute top-0 flex w-max max-w-[min(90vw,760px)] -translate-x-1/2 flex-wrap items-center justify-center gap-y-4 px-2 py-2 text-sm tracking-[0.2em] transition-opacity duration-200 ${
            activeSubmenu ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          {activeSubmenuLinks.map((item, index) => (
            <div key={item.label} className="flex items-center">
              <Link
                href={item.href}
                className={`group relative pb-2 transition-colors duration-300 ${projectSubmenuTextClass}`}
              >
                {item.label}
                <span className="absolute bottom-0 left-0 h-[1px] w-full origin-left scale-x-0 bg-saffron transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
              {index < activeSubmenuLinks.length - 1 && (
                <span className={`mx-4 ${projectSubmenuSeparatorClass}`}>/</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="pointer-events-auto fixed inset-0 bg-background z-40 flex flex-col items-center justify-center"
          >
            <nav className="pointer-events-auto flex flex-col gap-8 text-center" aria-label="Mobile navigation">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  className="pointer-events-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                >
                  <Link
                    href={link.href}
                    onClick={closeMobileMenu}
                    className={`group pointer-events-auto relative inline-flex min-h-12 items-center justify-center px-4 text-4xl sm:text-5xl ${link.label === "I AM" ? "tracking-[0.14em]" : "tracking-wide"} ${getMobileLinkTextClass(link.href)} hover:text-saffron focus:outline-none focus:text-saffron transition-colors duration-300`}
                  >
                    {link.label}
                    <span className={`absolute bottom-0 left-1/2 h-[1px] -translate-x-1/2 bg-saffron transition-all duration-300 ${getMobileUnderlineClass(link.href)}`} />
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
