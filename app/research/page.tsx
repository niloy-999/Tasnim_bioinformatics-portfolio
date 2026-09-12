import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Dna, Activity, Cpu } from "lucide-react";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Card3D from "@/components/Card3D";

export const metadata: Metadata = {
  title: "Research",
  description: "Research areas: computational genomics, mitochondrial genomics, population genetics, and DNA-protein representation learning."
};

const areas = [
  {
    title: "BFRI Research — Fish Genomics",
    href: "/research/bfri",
    desc: "Reference-guided whole-genome assembly of Tor tor and large-scale population genomics of Tor tor and Tenualosa ilisha from COI and Cyt b markers across regional aquatic ecosystems.",
    tags: ["Genome assembly", "Population genetics", "Phylogeography"],
    icon: <Activity size={20} className="text-bio-emerald dark:text-emerald-400" />
  },
  {
    title: "Mitochondrial Genomics Showcase",
    href: "/research/mitochondrial-genomics",
    desc: "Complete mitogenome architecture, codon usage bias (RSCU), tRNA/rRNA secondary structure, and Ka/Ks selection analysis for two economically vital fish species.",
    tags: ["Mitogenomics", "RSCU", "Ka/Ks", "Comparative genomics"],
    icon: <Dna size={20} className="text-bio-cyan dark:text-cyan-400" />
  },
  {
    title: "DNA–Protein Cross-Modal Learning (Thesis)",
    href: "/thesis",
    desc: "A multimodal deep learning framework utilizing DNABERT-2 and ESM-2 representations to discover candidate plastic-degrading genes from bacterial DNA sequences.",
    tags: ["Deep learning", "Foundation models", "Contrastive learning"],
    icon: <Cpu size={20} className="text-bio-violet dark:text-purple-400" />
  }
];

export default function ResearchIndexPage() {
  return (
    <Container className="py-12 sm:py-16">
      <SectionHeading
        eyebrow="Research Domains"
        title="What I Work On"
        description="Three connected threads: classical whole-genome assembly and population genetics at BFRI, and foundation model sequence representation learning in my undergraduate thesis."
      />

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {areas.map((a) => (
          <Card3D key={a.href} maxTilt={4} className="h-full">
            <Link
              href={a.href}
              className="group flex h-full flex-col rounded-2xl border border-line/80 bg-white/75 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-bio-cyan/60 hover:shadow-glow dark:border-line-dark/80 dark:bg-slate-900/60 dark:hover:border-cyan-400/50"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink-100/80 dark:bg-slate-800/80">
                  {a.icon}
                </span>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-paper text-ink-400 transition-colors group-hover:bg-bio-cyan/15 group-hover:text-bio-cyan dark:bg-slate-800 dark:text-ink-400 dark:group-hover:text-cyan-300">
                  <ArrowUpRight size={15} />
                </span>
              </div>

              <h2 className="mt-4 font-serif text-lg font-semibold text-ink-900 transition-colors group-hover:text-bio-cyan dark:text-ink-100 dark:group-hover:text-cyan-400">
                {a.title}
              </h2>

              <p className="mt-2.5 flex-1 text-justify text-xs leading-relaxed text-ink-600 dark:text-ink-300 sm:text-sm">
                {a.desc}
              </p>

              <div className="mt-5 flex flex-wrap gap-1.5 border-t border-line/70 pt-3 dark:border-line-dark/70">
                {a.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-line/80 bg-paper/60 px-2 py-0.5 font-mono text-[11px] text-ink-600 dark:border-line-dark/80 dark:bg-slate-800/60 dark:text-ink-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Link>
          </Card3D>
        ))}
      </div>
    </Container>
  );
}
