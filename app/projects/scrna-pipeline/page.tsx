import type { Metadata } from "next";
import ProjectTemplate from "@/components/ProjectTemplate";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "scRNA-seq Analysis Platform",
  description: "Interactive Streamlit app for single-cell RNA-seq QC, embedding, and clustering."
};

export default function ScrnaPage() {
  const project = projects.find((p) => p.slug === "scrna-pipeline")!;
  return <ProjectTemplate project={project} />;
}
