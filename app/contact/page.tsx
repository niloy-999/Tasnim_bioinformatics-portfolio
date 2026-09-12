import type { Metadata } from "next";
import { Mail, Github, Linkedin, ExternalLink } from "lucide-react";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Card3D from "@/components/Card3D";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch for research collaboration, graduate opportunities, or computational biology projects."
};

const contacts = [
  {
    label: "Academic email",
    value: site.email,
    href: `mailto:${site.email}`,
    icon: <Mail size={18} className="text-bio-cyan dark:text-cyan-400" />
  },
  {
    label: "Secondary email",
    value: site.secondaryEmail,
    href: `mailto:${site.secondaryEmail}`,
    icon: <Mail size={18} className="text-bio-emerald dark:text-emerald-400" />
  },
  {
    label: "GitHub",
    value: "github.com/niloy-999",
    href: site.links.github,
    icon: <Github size={18} className="text-ink-700 dark:text-cyan-300" />,
    external: true
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/tasnim-ul-islam",
    href: site.links.linkedin,
    icon: <Linkedin size={18} className="text-bio-blue dark:text-blue-400" />,
    external: true
  },
  {
    label: "ORCID",
    value: "0009-0001-2023-2015",
    href: site.links.orcid,
    icon: <ExternalLink size={18} className="text-bio-emerald dark:text-emerald-400" />,
    external: true
  },
  {
    label: "ResearchGate",
    value: "View profile",
    href: site.links.researchgate,
    icon: <ExternalLink size={18} className="text-bio-cyan dark:text-cyan-400" />,
    external: true
  }
];

export default function ContactPage() {
  return (
    <Container className="py-12 sm:py-16">
      <SectionHeading
        eyebrow="Direct Inquiries"
        title="Get in Touch"
        description="Interested in research collaboration, graduate opportunities, computational biology, and bioinformatics projects."
      />

      <p className="prose-body mt-4 max-w-prose text-sm leading-relaxed sm:text-base">
        If you&apos;re a prospective supervisor or researcher, feel free to reach out
        directly — I&apos;m happy to share code repositories, genomic datasets, or additional technical detail on any project.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {contacts.map((c) => (
          <Card3D key={c.label} maxTilt={3}>
            <a
              href={c.href}
              target={c.external ? "_blank" : undefined}
              rel={c.external ? "noreferrer" : undefined}
              className="flex items-center gap-3.5 rounded-xl border border-line/80 bg-white/75 p-5 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-bio-cyan hover:shadow-glow dark:border-cyan-500/30 dark:bg-slate-900/70 dark:hover:border-cyan-400"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-ink-100/80 dark:bg-slate-800/80">
                {c.icon}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-mono font-medium text-ink-500 dark:text-cyan-300/80">{c.label}</p>
                <p className="mt-0.5 truncate text-sm font-semibold text-ink-900 dark:text-ink-100">{c.value}</p>
              </div>
            </a>
          </Card3D>
        ))}
      </div>

      <div className="mt-12 rounded-xl border border-line/80 bg-white/60 p-6 backdrop-blur-sm dark:border-line-dark/80 dark:bg-slate-900/50">
        <p className="font-serif text-base font-semibold text-ink-900 dark:text-ink-100">Institution & Location</p>
        <p className="mt-1 text-sm text-ink-600 dark:text-ink-300">{site.institution}</p>
        <p className="text-xs text-ink-500 dark:text-ink-400">{site.location}</p>
      </div>
    </Container>
  );
}
