import Link from "next/link";
import { Github, ArrowUpRight } from "lucide-react";
import StatusBadge from "@/components/StatusBadge";
import type { Project } from "@/content/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="flex flex-col border border-line p-5 dark:border-line-dark">
      <div className="flex flex-wrap items-center gap-2">
        <StatusBadge status={project.status} />
        <span className="text-xs text-ink-400 dark:text-ink-500">{project.period}</span>
      </div>
      <h3 className="mt-2 font-serif text-lg font-semibold text-ink-900 dark:text-ink-100">
        {project.name}
      </h3>
      <p className="mt-1 text-sm text-ink-600 dark:text-ink-300">{project.tagline}</p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
        {project.result}
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {project.technology.slice(0, 5).map((t) => (
          <span
            key={t}
            className="rounded-full border border-line px-2 py-0.5 font-mono text-[11px] text-ink-500 dark:border-line-dark dark:text-ink-400"
          >
            {t}
          </span>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-4 border-t border-line pt-3 text-sm dark:border-line-dark">
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1 font-medium text-ink-800 hover:text-amber-600 dark:text-ink-100 dark:hover:text-amber-400"
        >
          Case study <ArrowUpRight size={14} />
        </Link>
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-ink-500 hover:text-amber-600 dark:text-ink-400 dark:hover:text-amber-400"
          >
            <Github size={14} /> Code
          </a>
        )}
      </div>
    </div>
  );
}
