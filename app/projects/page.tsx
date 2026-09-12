import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/ProjectCard";
import Card3D from "@/components/Card3D";
import { projects, otherRepos } from "@/content/projects";
import { ExternalLink, FolderGit2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Projects",
  description: "Bioinformatics software and research projects: BioSeqInsight, the scRNA-seq analysis platform, and other work."
};

export default function ProjectsPage() {
  return (
    <Container className="py-12 sm:py-16">
      <SectionHeading
        eyebrow="Software & Tools"
        title="Bioinformatics Engineering Projects"
        description="Each project below is a structured case study: the underlying biological problem, computational design, technology stack, and verified outcomes."
      />

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>

      {/* Other repositories */}
      <div className="mt-16 border-t border-line/80 pt-10 dark:border-line-dark/80">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-bio-cyan/15 text-bio-cyan dark:bg-cyan-500/20 dark:text-cyan-400">
            <FolderGit2 size={18} />
          </span>
          <div>
            <h2 className="font-serif text-lg font-semibold text-ink-900 dark:text-ink-100">
              Other Repositories & Academic Coursework
            </h2>
            <p className="text-xs text-ink-500 dark:text-cyan-300/80">
              Foundational scripts, algorithmic explorations, and engineering utilities.
            </p>
          </div>
        </div>

        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {otherRepos.map((r) => (
            <li key={r.name}>
              <Card3D maxTilt={3} className="h-full">
                <div className="flex h-full flex-col justify-between rounded-xl border border-line/80 bg-white/75 p-4 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-bio-cyan/50 hover:shadow-glow dark:border-line-dark/80 dark:bg-slate-900/60 sm:p-5">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate font-serif text-sm font-semibold text-ink-900 dark:text-ink-100">{r.name}</span>
                      <a
                        href={r.url}
                        target="_blank"
                        rel="noreferrer"
                        className="shrink-0 text-ink-400 transition-colors hover:text-bio-cyan dark:hover:text-cyan-400"
                        aria-label={`View repository ${r.name}`}
                      >
                        <ExternalLink size={14} />
                      </a>
                    </div>
                    <p className="mt-2 text-justify text-xs leading-relaxed text-ink-600 dark:text-ink-300">
                      {r.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-2 border-t border-line/60 dark:border-line-dark/60">
                    <span className="font-mono text-[11px] text-bio-cyan dark:text-cyan-300">
                      {r.tech}
                    </span>
                  </div>
                </div>
              </Card3D>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}
