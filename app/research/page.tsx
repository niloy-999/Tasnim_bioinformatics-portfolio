import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Research",
  description: "Research areas: computational genomics, mitochondrial genomics, population genetics, and DNA-protein representation learning."
};

const areas = [
  {
    title: "BFRI Research — Fish Genomics",
    href: "/research/bfri",
    desc: "Reference-guided whole-genome assembly of Tor tor and large-scale population genomics of Tor tor and Tenualosa ilisha from COI and Cyt b markers.",
    tags: ["Genome assembly", "Population genetics", "Phylogeography"]
  },
  {
    title: "Mitochondrial Genomics Showcase",
    href: "/research/mitochondrial-genomics",
    desc: "Complete mitogenome architecture, codon usage bias, tRNA/rRNA secondary structure, and Ka/Ks selection analysis for two fish species.",
    tags: ["Mitogenomics", "RSCU", "Ka/Ks", "Comparative genomics"]
  },
  {
    title: "DNA–Protein Cross-Modal Learning (Thesis)",
    href: "/thesis",
    desc: "A multimodal deep learning framework using DNABERT-2 and ESM-2 to discover candidate plastic-degrading genes from bacterial DNA.",
    tags: ["Deep learning", "Foundation models", "Contrastive learning"]
  }
];

export default function ResearchIndexPage() {
  return (
    <Container className="py-14">
      <SectionHeading
        eyebrow="Research"
        title="What I work on"
        description="Three connected threads: classical genomics and population genetics at BFRI, and deep learning for biological sequences in my undergraduate thesis."
      />

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {areas.map((a) => (
          <Link
            key={a.href}
            href={a.href}
            className="group flex flex-col border border-line p-6 transition-colors hover:border-amber-500 dark:border-line-dark"
          >
            <h2 className="font-serif text-lg font-semibold text-ink-900 dark:text-ink-100">
              {a.title}
            </h2>
            <p className="mt-2 flex-1 text-sm text-ink-600 dark:text-ink-300">{a.desc}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {a.tags.map((t) => (
                <span key={t} className="rounded-full border border-line px-2 py-0.5 text-[11px] text-ink-500 dark:border-line-dark dark:text-ink-400">
                  {t}
                </span>
              ))}
            </div>
            <span className="mt-4 inline-flex items-center gap-1 text-sm text-ink-500 group-hover:text-amber-600 dark:text-ink-400 dark:group-hover:text-amber-400">
              Read more <ArrowUpRight size={14} />
            </span>
          </Link>
        ))}
      </div>
    </Container>
  );
}
