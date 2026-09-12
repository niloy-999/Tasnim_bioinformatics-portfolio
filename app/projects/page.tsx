import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/ProjectCard";
import { projects, otherRepos } from "@/content/projects";
import { ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Projects",
  description: "Bioinformatics software and research projects: BioSeqInsight, the scRNA-seq analysis platform, and other work."
};

export default function ProjectsPage() {
  return (
    <Container className="py-14">
      <SectionHeading
        eyebrow="Projects"
        title="Tools & software"
        description="Each project below is a case study: the problem, what I built, and what it actually achieves — not just a repository link."
      />

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>

      <div className="mt-16 border-t border-line pt-10 dark:border-line-dark">
        <h2 className="font-serif text-lg font-semibold text-ink-900 dark:text-ink-100">
          Other repositories
        </h2>
        <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">
          Smaller coursework and side projects, for completeness.
        </p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {otherRepos.map((r) => (
            <li key={r.name} className="border border-line p-3 text-sm dark:border-line-dark">
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium text-ink-800 dark:text-ink-100">{r.name}</span>
                <a href={r.url} target="_blank" rel="noreferrer" className="shrink-0 text-ink-400 hover:text-amber-600 dark:hover:text-amber-400">
                  <ExternalLink size={13} />
                </a>
              </div>
              <p className="mt-1 text-ink-500 dark:text-ink-400">{r.desc}</p>
              <p className="mt-1 font-mono text-[11px] text-ink-400 dark:text-ink-500">{r.tech}</p>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}
