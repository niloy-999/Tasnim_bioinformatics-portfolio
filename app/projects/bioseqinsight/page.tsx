import type { Metadata } from "next";
import ProjectTemplate from "@/components/ProjectTemplate";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "BioSeqInsight",
  description: "Local desktop tool for DNA sequence analysis and protein structure lookup."
};

export default function BioSeqInsightPage() {
  const project = projects.find((p) => p.slug === "bioseqinsight")!;
  return <ProjectTemplate project={project} />;
}
