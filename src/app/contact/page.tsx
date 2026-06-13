"use client";

import { FormEvent, useState } from "react";
import { motion, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
};

const MAX_FILES = 5;
const MAX_FILE_SIZE = 5 * 1024 * 1024;

type FormErrors = Partial<Record<keyof ContactFormData | "uploadedFiles", string>>;

type ContactFormData = {
  name: string;
  phoneNumber: string;
  email: string;
  siteDetails: string;
  projectDetails: string;
  uploadedFiles: File[];
};

const initialFormData: ContactFormData = {
  name: "",
  phoneNumber: "",
  email: "",
  siteDetails: "",
  projectDetails: "",
  uploadedFiles: [],
};

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (data: ContactFormData) => {
    const nextErrors: FormErrors = {};

    if (!data.name.trim()) nextErrors.name = "Please enter your full name.";
    if (!data.phoneNumber.trim()) nextErrors.phoneNumber = "Please enter your phone number.";
    if (!data.email.trim()) {
      nextErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (!data.siteDetails.trim()) nextErrors.siteDetails = "Please provide site details.";
    if (!data.projectDetails.trim()) nextErrors.projectDetails = "Please provide project details.";
    if (data.uploadedFiles.length > MAX_FILES) nextErrors.uploadedFiles = "Maximum 5 files allowed.";
    if (data.uploadedFiles.some((file) => file.size > MAX_FILE_SIZE)) {
      nextErrors.uploadedFiles = "Each file must be 5 MB or smaller.";
    }

    return nextErrors;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateForm(formData);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    const submissionPayload = {
      name: formData.name.trim(),
      phoneNumber: formData.phoneNumber.trim(),
      email: formData.email.trim(),
      siteDetails: formData.siteDetails.trim(),
      projectDetails: formData.projectDetails.trim(),
      uploadedFiles: formData.uploadedFiles,
    };

    console.info("Contact form submission", submissionPayload);
  };

  const updateField = (field: keyof Omit<ContactFormData, "uploadedFiles">, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const updateFiles = (files: FileList | null) => {
    const uploadedFiles = files ? Array.from(files) : [];

    setFormData((current) => ({ ...current, uploadedFiles }));
    setErrors((current) => ({ ...current, uploadedFiles: undefined }));
  };

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
            <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
              <div className="group">
                <label 
                  htmlFor="name" 
                  className="block text-muted text-xs uppercase tracking-widest mb-3 group-focus-within:text-saffron transition-colors"
                >
                  Name *
                </label>
                <input 
                  type="text" 
                  id="name" 
                  name="name"
                  value={formData.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  placeholder="Enter your full name" 
                  className="w-full bg-transparent border-b border-foreground/20 py-4 focus:outline-none focus:border-saffron peer transition-colors"
                />
                {errors.name && <p className="text-saffron text-xs mt-3">{errors.name}</p>}
              </div>
              
              <div className="group">
                <label 
                  htmlFor="phoneNumber" 
                  className="block text-muted text-xs uppercase tracking-widest mb-3 group-focus-within:text-saffron transition-colors"
                >
                  Phone Number *
                </label>
                <input 
                  type="tel" 
                  id="phoneNumber" 
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={(event) => updateField("phoneNumber", event.target.value)}
                  placeholder="Enter your phone number" 
                  className="w-full bg-transparent border-b border-foreground/20 py-4 focus:outline-none focus:border-saffron peer transition-colors"
                />
                {errors.phoneNumber && <p className="text-saffron text-xs mt-3">{errors.phoneNumber}</p>}
              </div>

              <div className="group">
                <label 
                  htmlFor="email" 
                  className="block text-muted text-xs uppercase tracking-widest mb-3 group-focus-within:text-saffron transition-colors"
                >
                  Email *
                </label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  value={formData.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  placeholder="Enter your email address" 
                  className="w-full bg-transparent border-b border-foreground/20 py-4 focus:outline-none focus:border-saffron peer transition-colors"
                />
                {errors.email && <p className="text-saffron text-xs mt-3">{errors.email}</p>}
              </div>

              <div className="group">
                <label 
                  htmlFor="siteDetails" 
                  className="block text-muted text-xs uppercase tracking-widest mb-3 group-focus-within:text-saffron transition-colors"
                >
                  Site Details *
                </label>
                <textarea 
                  id="siteDetails" 
                  name="siteDetails"
                  value={formData.siteDetails}
                  onChange={(event) => updateField("siteDetails", event.target.value)}
                  placeholder="Location, site size, existing conditions, plot details, city, etc." 
                  rows={4}
                  className="w-full bg-transparent border-b border-foreground/20 py-4 focus:outline-none focus:border-saffron peer transition-colors resize-none"
                />
                {errors.siteDetails && <p className="text-saffron text-xs mt-3">{errors.siteDetails}</p>}
              </div>

              <div className="group">
                <label 
                  htmlFor="projectDetails" 
                  className="block text-muted text-xs uppercase tracking-widest mb-3 group-focus-within:text-saffron transition-colors"
                >
                  Project Details *
                </label>
                <textarea 
                  id="projectDetails" 
                  name="projectDetails"
                  value={formData.projectDetails}
                  onChange={(event) => updateField("projectDetails", event.target.value)}
                  placeholder="Describe your project requirements, scope, vision, timeline, and any other relevant details." 
                  rows={5}
                  className="w-full bg-transparent border-b border-foreground/20 py-4 focus:outline-none focus:border-saffron peer transition-colors resize-none"
                />
                {errors.projectDetails && <p className="text-saffron text-xs mt-3">{errors.projectDetails}</p>}
              </div>

              <div className="group">
                <label 
                  htmlFor="uploadedFiles" 
                  className="block text-muted text-xs uppercase tracking-widest mb-3 group-focus-within:text-saffron transition-colors"
                >
                  File Upload
                </label>
                <input
                  type="file"
                  id="uploadedFiles"
                  name="uploadedFiles"
                  multiple
                  onChange={(event) => updateFiles(event.target.files)}
                  className="w-full bg-transparent border-b border-foreground/20 py-4 focus:outline-none focus:border-saffron transition-colors file:mr-6 file:rounded-full file:border-0 file:bg-foreground file:px-5 file:py-2 file:text-xs file:uppercase file:tracking-widest file:text-background file:transition-colors hover:file:bg-saffron"
                />
                <p className="text-muted text-sm leading-relaxed mt-4">
                  Upload reference images, drawings, site photographs, inspiration images, or supporting documents.
                  <br />
                  Maximum 5 files. Maximum 5 MB per file.
                </p>
                {errors.uploadedFiles && <p className="text-saffron text-xs mt-3">{errors.uploadedFiles}</p>}
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
