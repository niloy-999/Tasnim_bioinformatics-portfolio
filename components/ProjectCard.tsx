import Link from "next/link";
import { Github, ArrowUpRight, ExternalLink } from "lucide-react";
import StatusBadge from "@/components/StatusBadge";
import Card3D from "@/components/Card3D";
import type { Project } from "@/content/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Card3D maxTilt={4} className="h-full">
      <div className="group flex h-full flex-col rounded-xl border border-line/90 bg-white/70 p-5 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-bio-cyan/60 hover:shadow-glow dark:border-line-dark/80 dark:bg-ink-900/50 dark:hover:border-cyan-500/50">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <StatusBadge status={project.status} />
          <span className="font-mono text-xs text-ink-400 dark:text-ink-500">{project.period}</span>
        </div>

        <h3 className="mt-3 font-serif text-xl font-semibold text-ink-900 transition-colors group-hover:text-bio-cyan dark:text-ink-100 dark:group-hover:text-cyan-400">
          {project.name}
        </h3>

        <p className="mt-1 text-sm font-medium text-ink-600 dark:text-ink-300">
          {project.tagline}
        </p>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
          {project.result}
        </p>

        {/* Tech tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.technology.slice(0, 5).map((t) => (
            <span
              key={t}
              className="rounded-md border border-line/70 bg-ink-100/60 px-2 py-0.5 font-mono text-[11px] text-ink-600 dark:border-line-dark/70 dark:bg-ink-800/60 dark:text-ink-300"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Footer actions */}
        <div className="mt-5 flex items-center justify-between border-t border-line/80 pt-3 text-sm dark:border-line-dark/80">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1 font-medium text-ink-900 transition-colors hover:text-bio-cyan dark:text-ink-100 dark:hover:text-cyan-400"
          >
            Case study <ArrowUpRight size={15} />
          </Link>

          <div className="flex items-center gap-3">
            {project.doi && (
              <a
                href={project.doi}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 font-mono text-xs text-amber-600 hover:underline dark:text-amber-400"
              >
                <ExternalLink size={13} /> DOI
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-ink-500 transition-colors hover:text-bio-cyan dark:text-ink-400 dark:hover:text-cyan-400"
              >
                <Github size={15} /> Code
              </a>
            )}
          </div>
        </div>
      </div>
    </Card3D>
  );
}
