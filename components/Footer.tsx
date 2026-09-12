import Link from "next/link";
import { Github, Linkedin, ExternalLink, Mail, Dna, FileText } from "lucide-react";
import { site } from "@/content/site";

export default function Footer() {
  return (
    <footer className="border-t border-line/80 bg-paper/60 backdrop-blur-md dark:border-line-dark/80 dark:bg-paper-dark/60">
      <div className="mx-auto max-w-content px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Col 1: Identity */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-bio-cyan/15 text-bio-cyan dark:bg-bio-cyan/20">
                <Dna size={16} />
              </span>
              <p className="font-serif text-base font-semibold text-ink-900 dark:text-ink-100">
                Tasnim Ul Islam
              </p>
            </div>
            <p className="text-sm font-medium text-ink-700 dark:text-ink-200">
              Bioinformatics Engineering
            </p>
            <p className="text-xs leading-relaxed text-ink-500 dark:text-ink-400">
              Computational Biology · Genomics · Deep Learning · Mitochondrial Architecture
            </p>
            <p className="text-xs text-ink-400 dark:text-ink-500">
              Bangladesh Agricultural University
            </p>
          </div>

          {/* Col 2: Research & Code */}
          <div>
            <p className="text-xs font-mono uppercase tracking-wider text-ink-400 dark:text-ink-500">
              Research & Projects
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link className="text-ink-600 transition-colors hover:text-bio-cyan dark:text-ink-300 dark:hover:text-cyan-400" href="/thesis">
                  Undergraduate Thesis (ML)
                </Link>
              </li>
              <li>
                <Link className="text-ink-600 transition-colors hover:text-bio-cyan dark:text-ink-300 dark:hover:text-cyan-400" href="/research/bfri">
                  BFRI Fish Genomics
                </Link>
              </li>
              <li>
                <Link className="text-ink-600 transition-colors hover:text-bio-cyan dark:text-ink-300 dark:hover:text-cyan-400" href="/research/mitochondrial-genomics">
                  Mitochondrial Genomics
                </Link>
              </li>
              <li>
                <Link className="text-ink-600 transition-colors hover:text-bio-cyan dark:text-ink-300 dark:hover:text-cyan-400" href="/projects">
                  BioSeqInsight & scRNA-seq
                </Link>
              </li>
              <li>
                <Link className="text-ink-600 transition-colors hover:text-bio-cyan dark:text-ink-300 dark:hover:text-cyan-400" href="/publications">
                  Publications & Manuscripts
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Academic Profiles */}
          <div>
            <p className="text-xs font-mono uppercase tracking-wider text-ink-400 dark:text-ink-500">
              Profiles & Repos
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a
                  className="inline-flex items-center gap-1.5 text-ink-600 transition-colors hover:text-bio-cyan dark:text-ink-300 dark:hover:text-cyan-400"
                  href={site.links.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github size={14} /> GitHub (niloy-999)
                </a>
              </li>
              <li>
                <a
                  className="inline-flex items-center gap-1.5 text-ink-600 transition-colors hover:text-bio-cyan dark:text-ink-300 dark:hover:text-cyan-400"
                  href={site.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Linkedin size={14} /> LinkedIn
                </a>
              </li>
              <li>
                <a
                  className="inline-flex items-center gap-1.5 text-ink-600 transition-colors hover:text-bio-cyan dark:text-ink-300 dark:hover:text-cyan-400"
                  href={site.links.orcid}
                  target="_blank"
                  rel="noreferrer"
                >
                  <ExternalLink size={14} /> ORCID
                </a>
              </li>
              <li>
                <a
                  className="inline-flex items-center gap-1.5 text-ink-600 transition-colors hover:text-bio-cyan dark:text-ink-300 dark:hover:text-cyan-400"
                  href={site.links.researchgate}
                  target="_blank"
                  rel="noreferrer"
                >
                  <ExternalLink size={14} /> ResearchGate
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Resources & Contact */}
          <div>
            <p className="text-xs font-mono uppercase tracking-wider text-ink-400 dark:text-ink-500">
              Direct Contact
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link className="inline-flex items-center gap-1.5 text-ink-600 transition-colors hover:text-bio-cyan dark:text-ink-300 dark:hover:text-cyan-400" href="/cv">
                  <FileText size={14} /> Download Curriculum Vitae
                </Link>
              </li>
              <li>
                <Link className="text-ink-600 transition-colors hover:text-bio-cyan dark:text-ink-300 dark:hover:text-cyan-400" href="/skills">
                  Technical Stack & Skills
                </Link>
              </li>
              <li>
                <Link className="text-ink-600 transition-colors hover:text-bio-cyan dark:text-ink-300 dark:hover:text-cyan-400" href="/timeline">
                  Academic Timeline
                </Link>
              </li>
              <li className="pt-1">
                <a
                  className="inline-flex items-center gap-1.5 text-xs text-bio-cyan hover:underline dark:text-cyan-400"
                  href={`mailto:${site.email}`}
                >
                  <Mail size={13} /> {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 flex flex-col gap-2 border-t border-line/80 pt-6 text-xs text-ink-400 dark:border-line-dark/80 dark:text-ink-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Tasnim Ul Islam · Bioinformatics Engineering Portfolio</p>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-bio-emerald" />
            <span>Mymensingh, Bangladesh · Next.js & Three.js 3D</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
