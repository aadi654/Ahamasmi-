"use client";

import { motion, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
};

export default function ContactPage() {
  return (
    <div className="bg-background min-h-screen pt-32 pb-32">
      <section className="px-6 container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <h1 className="text-5xl md:text-8xl font-light tracking-tighter mb-8">Namaste.</h1>
            <p className="text-xl text-muted font-light mb-16 max-w-sm leading-relaxed">
              We are currently accepting new commissions for residential and cultural projects.
            </p>
            
            <div className="space-y-8">
              <div>
                <p className="text-saffron uppercase tracking-widest text-xs font-medium mb-2">Email</p>
                <a href="mailto:studio@ahamasmi.com" className="text-xl hover:text-saffron transition-colors">
                  studio@ahamasmi.com
                </a>
              </div>
              <div>
                <p className="text-saffron uppercase tracking-widest text-xs font-medium mb-2">Phone</p>
                <p className="text-xl">+91 98765 43210</p>
              </div>
              <div>
                <p className="text-saffron uppercase tracking-widest text-xs font-medium mb-2">Studio</p>
                <p className="text-xl text-muted">
                  123 Design District<br />
                  Bangalore, Karnataka<br />
                  India 560001
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="bg-muted/5 p-8 md:p-12 rounded-sm"
          >
            <form className="flex flex-col gap-10" onSubmit={(e) => e.preventDefault()}>
              <div className="relative group">
                <input 
                  type="text" 
                  id="name" 
                  placeholder=" " 
                  className="w-full bg-transparent border-b border-foreground/20 py-4 focus:outline-none focus:border-saffron peer transition-colors"
                />
                <label 
                  htmlFor="name" 
                  className="absolute left-0 top-4 text-muted cursor-text transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-saffron peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-xs"
                >
                  Name
                </label>
              </div>
              
              <div className="relative group">
                <input 
                  type="email" 
                  id="email" 
                  placeholder=" " 
                  className="w-full bg-transparent border-b border-foreground/20 py-4 focus:outline-none focus:border-saffron peer transition-colors"
                />
                <label 
                  htmlFor="email" 
                  className="absolute left-0 top-4 text-muted cursor-text transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-saffron peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-xs"
                >
                  Email
                </label>
              </div>

              <div className="relative group">
                <textarea 
                  id="message" 
                  placeholder=" " 
                  rows={4}
                  className="w-full bg-transparent border-b border-foreground/20 py-4 focus:outline-none focus:border-saffron peer transition-colors resize-none"
                />
                <label 
                  htmlFor="message" 
                  className="absolute left-0 top-4 text-muted cursor-text transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-saffron peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-xs"
                >
                  Project Details
                </label>
              </div>

              <button className="group self-start flex items-center gap-4 text-background bg-foreground px-8 py-4 rounded-full text-sm uppercase tracking-widest hover:bg-saffron transition-colors duration-300 mt-4">
                Submit Request <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
