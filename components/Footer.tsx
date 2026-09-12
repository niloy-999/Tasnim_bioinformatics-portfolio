import Link from "next/link";
import { site } from "@/content/site";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-paper dark:border-line-dark dark:bg-paper-dark">
      <div className="mx-auto max-w-content px-5 py-10 md:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="font-serif text-base font-semibold text-ink-900 dark:text-ink-100">
              Tasnim Ul Islam
            </p>
            <p className="mt-1 text-sm text-ink-600 dark:text-ink-300">
              Bioinformatics Engineering
            </p>
            <p className="text-sm text-ink-500 dark:text-ink-400">
              Computational Biology · Genomics · Machine Learning
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-ink-400 dark:text-ink-500">
              Elsewhere
            </p>
            <ul className="mt-2 space-y-1 text-sm">
              <li>
                <a className="text-ink-600 hover:text-amber-600 dark:text-ink-300 dark:hover:text-amber-400" href={site.links.github} target="_blank" rel="noreferrer">
                  GitHub
                </a>
              </li>
              <li>
                <a className="text-ink-600 hover:text-amber-600 dark:text-ink-300 dark:hover:text-amber-400" href={site.links.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              </li>
              <li>
                <a className="text-ink-600 hover:text-amber-600 dark:text-ink-300 dark:hover:text-amber-400" href={site.links.orcid} target="_blank" rel="noreferrer">
                  ORCID
                </a>
              </li>
              <li>
                <a className="text-ink-600 hover:text-amber-600 dark:text-ink-300 dark:hover:text-amber-400" href={site.links.researchgate} target="_blank" rel="noreferrer">
                  ResearchGate
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-ink-400 dark:text-ink-500">
              Quick links
            </p>
            <ul className="mt-2 space-y-1 text-sm">
              <li><Link className="text-ink-600 hover:text-amber-600 dark:text-ink-300 dark:hover:text-amber-400" href="/timeline">Timeline</Link></li>
              <li><Link className="text-ink-600 hover:text-amber-600 dark:text-ink-300 dark:hover:text-amber-400" href="/skills">Skills</Link></li>
              <li><Link className="text-ink-600 hover:text-amber-600 dark:text-ink-300 dark:hover:text-amber-400" href="/cv">CV (PDF)</Link></li>
              <li>
                <a className="text-ink-600 hover:text-amber-600 dark:text-ink-300 dark:hover:text-amber-400" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-line pt-4 text-xs text-ink-400 dark:border-line-dark dark:text-ink-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Tasnim Ul Islam. Built with Next.js.</p>
          <p>Bangladesh Agricultural University, Mymensingh</p>
        </div>
      </div>
    </footer>
  );
}
