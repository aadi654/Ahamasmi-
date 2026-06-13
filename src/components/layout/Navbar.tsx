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
  { href: "/philosophy", label: "Philosophy" },
  { href: "/contact", label: "Contact" },
];

const projectSubmenuLinks = [
  { href: "/projects", label: "Architecture" },
  { href: "/projects", label: "Interior" },
  { href: "/projects", label: "BIM" },
  { href: "/projects", label: "Urban Design" },
  { href: "/projects", label: "Design & Research" },
];

const aySubmenuLinks = [
  { href: "/ahamasmiyodhah#research", label: "Research" },
  { href: "/ahamasmiyodhah#academy", label: "Academy" },
  { href: "/ahamasmiyodhah#collaborations", label: "Collaborations" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const hasHero = pathname === "/" || (pathname.startsWith("/projects/") && pathname !== "/projects");
  const showProjectsSubmenu = pathname !== "/";
  const showAhamasmiyodhahSubmenu = pathname !== "/";
  const isDarkBg = hasHero && !isScrolled;
  const textColorClass = isDarkBg ? "text-white" : "text-foreground";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        isScrolled ? "bg-background/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 h-24 flex items-center justify-between">
        <Link href="/" className={`-translate-x-2 text-3xl tracking-widest uppercase font-medium z-50 transition-colors duration-300 ${textColorClass}`}>
          Ahamasmi Architect
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden translate-x-6 md:flex gap-10">
          {links.map((link) => (
            link.label === "Projects" ? (
              <div key={link.href} className="relative group/projects">
                <Link
                  href={link.href}
                  className={`text-lg tracking-wide transition-colors duration-300 relative group ${textColorClass} hover:text-saffron`}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-saffron transition-all duration-300 group-hover:w-full" />
                </Link>
                {showProjectsSubmenu && (
                  <div className="absolute left-1/2 top-full mt-6 -translate-x-1/2 translate-y-2 opacity-0 pointer-events-none group-hover/projects:translate-y-0 group-hover/projects:opacity-100 group-hover/projects:pointer-events-auto transition-all duration-200 ease-out before:absolute before:-top-6 before:left-0 before:h-6 before:w-full before:content-['']">
                    <div className="flex items-center gap-10 whitespace-nowrap rounded-[6px] bg-white/85 px-8 py-4 text-foreground opacity-70 shadow-[0_12px_40px_rgba(0,0,0,0.12)] backdrop-blur-2xl">
                      {projectSubmenuLinks.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="text-sm tracking-wide text-[#000000] transition-colors duration-300 hover:text-saffron"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : link.label === "Ahamasmiyodhah" ? (
              <div key={link.href} className="relative group/ay">
                <Link
                  href={link.href}
                  className={`text-lg tracking-wide transition-colors duration-300 relative group ${textColorClass} hover:text-saffron`}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-saffron transition-all duration-300 group-hover:w-full" />
                </Link>
                {showAhamasmiyodhahSubmenu && (
                  <div className="absolute left-1/2 top-full mt-6 -translate-x-1/2 translate-y-2 opacity-0 pointer-events-none group-hover/ay:translate-y-0 group-hover/ay:opacity-100 group-hover/ay:pointer-events-auto transition-all duration-200 ease-out before:absolute before:-top-6 before:left-0 before:h-6 before:w-full before:content-['']">
                    <div className="flex items-center gap-10 whitespace-nowrap rounded-[6px] bg-white/85 px-8 py-4 text-foreground opacity-70 shadow-[0_12px_40px_rgba(0,0,0,0.12)] backdrop-blur-2xl">
                      {aySubmenuLinks.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="text-sm tracking-wide text-[#000000] transition-colors duration-300 hover:text-saffron"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`text-lg tracking-wide transition-colors duration-300 relative group ${textColorClass} hover:text-saffron`}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-saffron transition-all duration-300 group-hover:w-full" />
              </Link>
            )
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden z-50 text-foreground mix-blend-difference text-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-background z-40 flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col gap-8 text-center">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-4xl sm:text-5xl tracking-wide hover:text-saffron transition-colors duration-300"
                  >
                    {link.label}
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
