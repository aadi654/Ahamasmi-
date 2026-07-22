import { notFound } from "next/navigation";
import { getAllProjects, getProjectBySlug } from "@/content/projects";
import { ProjectDetailClient } from "./ProjectDetailClient";

export function generateStaticParams() {
  return getAllProjects().map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailClient project={project} />;
}
