import type { Metadata } from "next";
import { Mail, Github, Linkedin, ExternalLink } from "lucide-react";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch for research collaboration, graduate opportunities, or computational biology projects."
};

export default function ContactPage() {
  return (
    <Container className="py-14">
      <SectionHeading eyebrow="Contact" title="Get in touch" />

      <p className="prose-body mt-4 max-w-prose">
        Interested in research collaboration, graduate opportunities, computational biology, and
        bioinformatics projects. If you&apos;re a prospective supervisor, feel free to reach out
        directly — I&apos;m happy to share code, data, or additional detail on any project.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <a
          href={`mailto:${site.email}`}
          className="flex items-center gap-3 border border-line p-5 hover:border-amber-500 dark:border-line-dark"
        >
          <Mail size={18} className="text-amber-600 dark:text-amber-400" />
          <div>
            <p className="text-sm font-medium text-ink-900 dark:text-ink-100">Academic email</p>
            <p className="text-sm text-ink-600 dark:text-ink-300">{site.email}</p>
          </div>
        </a>

        <a
          href={`mailto:${site.secondaryEmail}`}
          className="flex items-center gap-3 border border-line p-5 hover:border-amber-500 dark:border-line-dark"
        >
          <Mail size={18} className="text-amber-600 dark:text-amber-400" />
          <div>
            <p className="text-sm font-medium text-ink-900 dark:text-ink-100">Secondary email</p>
            <p className="text-sm text-ink-600 dark:text-ink-300">{site.secondaryEmail}</p>
          </div>
        </a>

        <a
          href={site.links.github}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 border border-line p-5 hover:border-amber-500 dark:border-line-dark"
        >
          <Github size={18} className="text-amber-600 dark:text-amber-400" />
          <div>
            <p className="text-sm font-medium text-ink-900 dark:text-ink-100">GitHub</p>
            <p className="text-sm text-ink-600 dark:text-ink-300">github.com/niloy-999</p>
          </div>
        </a>

        <a
          href={site.links.linkedin}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 border border-line p-5 hover:border-amber-500 dark:border-line-dark"
        >
          <Linkedin size={18} className="text-amber-600 dark:text-amber-400" />
          <div>
            <p className="text-sm font-medium text-ink-900 dark:text-ink-100">LinkedIn</p>
            <p className="text-sm text-ink-600 dark:text-ink-300">linkedin.com/in/tasnim-ul-islam</p>
          </div>
        </a>

        <a
          href={site.links.orcid}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 border border-line p-5 hover:border-amber-500 dark:border-line-dark"
        >
          <ExternalLink size={18} className="text-amber-600 dark:text-amber-400" />
          <div>
            <p className="text-sm font-medium text-ink-900 dark:text-ink-100">ORCID</p>
            <p className="text-sm text-ink-600 dark:text-ink-300">0009-0001-2023-2015</p>
          </div>
        </a>

        <a
          href={site.links.researchgate}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 border border-line p-5 hover:border-amber-500 dark:border-line-dark"
        >
          <ExternalLink size={18} className="text-amber-600 dark:text-amber-400" />
          <div>
            <p className="text-sm font-medium text-ink-900 dark:text-ink-100">ResearchGate</p>
            <p className="text-sm text-ink-600 dark:text-ink-300">View profile</p>
          </div>
        </a>
      </div>

      <div className="mt-10 border-t border-line pt-6 text-sm text-ink-500 dark:border-line-dark dark:text-ink-400">
        <p className="font-medium text-ink-700 dark:text-ink-200">Institution</p>
        <p>{site.institution}</p>
        <p>{site.location}</p>
      </div>
    </Container>
  );
}
