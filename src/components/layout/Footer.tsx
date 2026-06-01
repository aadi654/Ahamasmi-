import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-background pt-24 pb-12 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-24">
          <div className="md:col-span-2">
            <h2 className="text-4xl md:text-6xl font-light mb-6 tracking-tight">
              Ahamasmi Architect
            </h2>
            <p className="text-muted max-w-sm text-sm tracking-wide leading-relaxed">
              Architecturing lines for lives
            </p>
          </div>
          
          <div className="flex flex-col gap-4">
            <h3 className="text-saffron uppercase tracking-widest text-xs mb-2">Studio</h3>
            <Link href="/projects" className="hover:text-saffron transition-colors text-sm w-fit">Projects</Link>
            <Link href="/studio" className="hover:text-saffron transition-colors text-sm w-fit">About</Link>
            <Link href="/philosophy" className="hover:text-saffron transition-colors text-sm w-fit">Philosophy</Link>
          </div>
          
          <div className="flex flex-col gap-4">
            <h3 className="text-saffron uppercase tracking-widest text-xs mb-2">Connect</h3>
            <a href="https://www.instagram.com/ahamasmiarchitect/" className="hover:text-saffron transition-colors text-sm w-fit flex items-center gap-1 group">
              Instagram <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            <a href="https://www.linkedin.com/in/ahamasmi-architect-1a9b3a170/" className="hover:text-saffron transition-colors text-sm w-fit flex items-center gap-1 group">
              LinkedIn <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            <Link href="/contact" className="hover:text-saffron transition-colors text-sm w-fit">Contact Us</Link>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-muted/20 text-xs text-muted tracking-wide">
          <p>&copy; {new Date().getFullYear()} Ahamasmi Architect. All Rights Reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
