"use client";

import { ChangeEvent, FormEvent, useState } from "react";
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

const getFileKey = (file: File) => `${file.name}-${file.size}-${file.lastModified}`;

const formatFileSize = (size: number) => {
  if (size < 1024 * 1024) return `${Math.max(1, Math.round(size / 1024))} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
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

  const updateFiles = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files ?? []);

    if (selectedFiles.length === 0) return;

    const nextFiles = [...formData.uploadedFiles];
    const existingFileKeys = new Set(nextFiles.map(getFileKey));
    const messages: string[] = [];

    selectedFiles.forEach((file) => {
      if (file.size > MAX_FILE_SIZE) {
        messages.push(`${file.name} is larger than 5 MB.`);
        return;
      }

      const fileKey = getFileKey(file);
      if (existingFileKeys.has(fileKey)) {
        if (!messages.includes("This file has already been added.")) {
          messages.push("This file has already been added.");
        }
        return;
      }

      if (nextFiles.length >= MAX_FILES) {
        if (!messages.includes("You can upload a maximum of 5 files.")) {
          messages.push("You can upload a maximum of 5 files.");
        }
        return;
      }

      nextFiles.push(file);
      existingFileKeys.add(fileKey);
    });

    setFormData((current) => ({ ...current, uploadedFiles: nextFiles }));
    setErrors((current) => ({
      ...current,
      uploadedFiles: messages.length > 0 ? messages.join(" ") : undefined,
    }));

    event.target.value = "";
  };

  const removeUploadedFile = (indexToRemove: number) => {
    setFormData((current) => ({
      ...current,
      uploadedFiles: current.uploadedFiles.filter((_, index) => index !== indexToRemove),
    }));
    setErrors((current) => ({ ...current, uploadedFiles: undefined }));
  };

  const hasMaxFiles = formData.uploadedFiles.length >= MAX_FILES;

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
                <p className="text-xl">+91 87629 10876</p>
              </div>
              <div>
                <p className="text-saffron uppercase tracking-widest text-xs font-medium mb-2">Studio</p>
                <p className="text-xl text-muted">
                  Sampurna Chambers,<br />
                  Vasavi Temple St,<br />
                  Vishweshwarapura,<br />
                  Basavanagudi,<br />
                  Bengaluru, Karnataka 560004
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
            <form className="contact-form flex flex-col gap-10" onSubmit={handleSubmit}>
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
                <div className="border-b border-foreground/20 pb-5 transition-colors group-focus-within:border-saffron">
                  <input
                    type="file"
                    id="uploadedFiles"
                    name="uploadedFiles"
                    multiple
                    disabled={hasMaxFiles}
                    onChange={updateFiles}
                    className="sr-only"
                  />
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <label
                      htmlFor="uploadedFiles"
                      aria-disabled={hasMaxFiles}
                      className={`inline-flex w-fit items-center justify-center rounded-full px-5 py-2 text-xs uppercase tracking-widest transition-colors ${
                        hasMaxFiles
                          ? "cursor-not-allowed bg-foreground/10 text-foreground/38"
                          : "cursor-pointer bg-foreground text-background hover:bg-saffron"
                      }`}
                    >
                      Choose files
                    </label>
                    <p className="text-xs uppercase tracking-[0.18em] text-muted">
                      {formData.uploadedFiles.length}/{MAX_FILES} files
                    </p>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-muted">
                    Upload up to 5 files. Maximum 5 MB per file.
                  </p>

                  {hasMaxFiles && (
                    <p className="mt-3 text-xs uppercase tracking-[0.18em] text-foreground/50">
                      Maximum 5 files added.
                    </p>
                  )}

                  {formData.uploadedFiles.length > 0 && (
                    <div className="mt-6 space-y-3">
                      {formData.uploadedFiles.map((file, index) => (
                        <div
                          key={getFileKey(file)}
                          className="flex items-center gap-4 border-t border-foreground/10 pt-3"
                        >
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm tracking-wide text-foreground">{file.name}</p>
                            <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted">
                              {formatFileSize(file.size)}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeUploadedFile(index)}
                            className="shrink-0 text-xs uppercase tracking-[0.18em] text-foreground/48 transition-colors hover:text-saffron"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
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
