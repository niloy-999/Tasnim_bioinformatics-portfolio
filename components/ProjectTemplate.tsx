import { Github, ExternalLink } from "lucide-react";
import Container from "@/components/Container";
import StatusBadge from "@/components/StatusBadge";
import type { Project } from "@/content/projects";

export default function ProjectTemplate({ project }: { project: Project }) {
  return (
    <Container className="py-14">
      <div className="flex flex-wrap items-center gap-2">
        <StatusBadge status={project.status} />
        <span className="text-xs text-ink-400 dark:text-ink-500">{project.period}</span>
      </div>
      <h1 className="mt-3 font-serif text-3xl font-semibold text-ink-900 dark:text-ink-100">
        {project.name}
      </h1>
      <p className="mt-2 max-w-prose text-lg text-ink-600 dark:text-ink-300">{project.tagline}</p>

      <div className="mt-6 flex flex-wrap gap-4 text-sm">
        {project.github && (
          <a href={project.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 border border-line px-3 py-1.5 text-ink-700 hover:border-amber-500 hover:text-amber-600 dark:border-line-dark dark:text-ink-200">
            <Github size={14} /> Code
          </a>
        )}
        {project.demo && (
          <a href={project.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 border border-line px-3 py-1.5 text-ink-700 hover:border-amber-500 hover:text-amber-600 dark:border-line-dark dark:text-ink-200">
            <ExternalLink size={14} /> Live demo
          </a>
        )}
        {project.doi && (
          <a href={project.doi} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 border border-line px-3 py-1.5 text-ink-700 hover:border-amber-500 hover:text-amber-600 dark:border-line-dark dark:text-ink-200">
            <ExternalLink size={14} /> DOI
          </a>
        )}
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="font-serif text-lg font-semibold text-ink-900 dark:text-ink-100">Problem</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-600 dark:text-ink-300">{project.problem}</p>
        </div>
        <div>
          <h2 className="font-serif text-lg font-semibold text-ink-900 dark:text-ink-100">Approach</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-600 dark:text-ink-300">{project.approach}</p>
        </div>
      </div>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="font-serif text-lg font-semibold text-ink-900 dark:text-ink-100">Result</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-600 dark:text-ink-300">{project.result}</p>
        </div>
        <div>
          <h2 className="font-serif text-lg font-semibold text-ink-900 dark:text-ink-100">My Contribution</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-600 dark:text-ink-300">{project.contribution}</p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="font-serif text-lg font-semibold text-ink-900 dark:text-ink-100">Technology</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {project.technology.map((t) => (
            <span key={t} className="rounded-full border border-line px-3 py-1 font-mono text-xs text-ink-600 dark:border-line-dark dark:text-ink-300">
              {t}
            </span>
          ))}
        </div>
      </div>
    </Container>
  );
}
