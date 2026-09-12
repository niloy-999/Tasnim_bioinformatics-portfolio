import Link from "next/link";
import { ArrowUpRight, Github, FileDown } from "lucide-react";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import StatGrid from "@/components/StatGrid";
import PublicationCard from "@/components/PublicationCard";
import { site } from "@/content/site";
import { thesis } from "@/content/thesis";
import { bfri } from "@/content/bfri";
import { publications } from "@/content/publications";

const researchThemes = [
  { n: "01", title: "Computational Genomics", href: "/research/bfri", desc: "Reference-guided WGS and functional annotation." },
  { n: "02", title: "Mitochondrial & Evolutionary Genomics", href: "/research/mitochondrial-genomics", desc: "Genome architecture, codon usage, Ka/Ks selection." },
  { n: "03", title: "Population Genetics", href: "/research/bfri", desc: "Haplotype diversity, AMOVA, phylogeography." },
  { n: "04", title: "DNA–Protein Representation Learning", href: "/thesis", desc: "Cross-modal contrastive alignment and attention." },
  { n: "05", title: "Machine Learning for Biological Sequences", href: "/thesis", desc: "Foundation model adaptation (DNABERT-2, ESM-2)." },
  { n: "06", title: "Bioinformatics Software", href: "/projects", desc: "Local sequence tools and single-cell platforms." }
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-grid-lines bg-grid dark:border-line-dark">
        <Container className="py-16 sm:py-24">
          <p className="sequence-strip mb-6 text-[11px] text-ink-300 dark:text-ink-600">
            ATG GCC AAA TCG AAT ATT GGA ATC GAA TAT TGG AAT GAC GTC ATT GCT ATC GGA ATA TTG
          </p>
          <h1 className="max-w-3xl font-serif text-4xl font-semibold leading-tight text-ink-900 dark:text-ink-100 sm:text-5xl">
            {site.name}
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-ink-600 dark:text-ink-300">
            Bioinformatics Engineering · Computational Biology · Genomics · Deep Learning
          </p>
          <p className="prose-body mt-6 max-w-2xl text-base">{site.statement}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/research"
              className="inline-flex items-center gap-2 bg-ink-900 px-5 py-2.5 text-sm font-medium text-paper hover:bg-ink-700 dark:bg-amber-500 dark:text-ink-900 dark:hover:bg-amber-400"
            >
              Explore my research <ArrowUpRight size={15} />
            </Link>
            <a
              href={site.links.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-line px-5 py-2.5 text-sm font-medium text-ink-800 hover:border-amber-500 hover:text-amber-600 dark:border-line-dark dark:text-ink-100"
            >
              <Github size={15} /> View GitHub
            </a>
            <Link
              href="/cv"
              className="inline-flex items-center gap-2 border border-line px-5 py-2.5 text-sm font-medium text-ink-800 hover:border-amber-500 hover:text-amber-600 dark:border-line-dark dark:text-ink-100"
            >
              <FileDown size={15} /> Download CV
            </Link>
          </div>
        </Container>
      </section>

      {/* PI-focused strip */}
      <section className="border-b border-line bg-ink-900 dark:border-line-dark dark:bg-ink-800">
        <Container className="flex flex-col items-start justify-between gap-4 py-6 sm:flex-row sm:items-center">
          <p className="text-sm text-ink-200">
            Are you a researcher or prospective supervisor?
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <Link href="/thesis" className="text-paper hover:text-amber-400">Explore my thesis →</Link>
            <Link href="/research" className="text-paper hover:text-amber-400">View research →</Link>
            <Link href="/publications" className="text-paper hover:text-amber-400">Browse publications →</Link>
            <Link href="/contact" className="text-paper hover:text-amber-400">Contact me →</Link>
          </div>
        </Container>
      </section>

      {/* Research at a glance */}
      <section className="border-b border-line py-16 dark:border-line-dark">
        <Container>
          <SectionHeading eyebrow="Overview" title="Research at a Glance" />
          <div className="mt-8 grid gap-px overflow-hidden border border-line bg-line dark:border-line-dark dark:bg-line-dark sm:grid-cols-2 lg:grid-cols-3">
            {researchThemes.map((t) => (
              <Link
                key={t.title}
                href={t.href}
                className="group bg-paper p-6 transition-colors hover:bg-ink-100 dark:bg-paper-dark dark:hover:bg-ink-800"
              >
                <span className="font-mono text-xs text-amber-600 dark:text-amber-400">{t.n}</span>
                <h3 className="mt-2 font-serif text-lg font-semibold text-ink-900 dark:text-ink-100">
                  {t.title}
                </h3>
                <p className="mt-1 text-sm text-ink-600 dark:text-ink-300">{t.desc}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs text-ink-400 group-hover:text-amber-600 dark:text-ink-500 dark:group-hover:text-amber-400">
                  Read more <ArrowUpRight size={12} />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured: Thesis */}
      <section className="border-b border-line py-16 dark:border-line-dark">
        <Container>
          <SectionHeading eyebrow="Featured research · Undergraduate thesis" title={thesis.title} />
          <p className="prose-body mt-4 max-w-3xl">{thesis.researchQuestion}</p>
          <div className="mt-6">
            <StatGrid
              stats={[
                { value: `${(thesis.finalTest.accuracy * 100).toFixed(1)}%`, label: "Test accuracy" },
                { value: thesis.finalTest.f1.toFixed(3), label: "Test F1-score" },
                { value: thesis.finalTest.rocAuc.toFixed(3), label: "ROC-AUC" },
                { value: thesis.finalTest.mcc.toFixed(3), label: "MCC" }
              ]}
            />
          </div>
          <Link
            href="/thesis"
            className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-amber-600 hover:underline dark:text-amber-400"
          >
            Read the full thesis breakdown <ArrowUpRight size={14} />
          </Link>
        </Container>
      </section>

      {/* Featured: BFRI */}
      <section className="border-b border-line py-16 dark:border-line-dark">
        <Container>
          <SectionHeading eyebrow="Featured research · BFRI internship" title={bfri.title} />
          <p className="prose-body mt-4 max-w-3xl">{bfri.summary}</p>
          <div className="mt-6">
            <StatGrid
              stats={[
                { value: "868.2 Mb", label: "Tor tor consensus genome" },
                { value: "97.8%", label: "BUSCO completeness" },
                { value: "48,169", label: "Predicted genes" },
                { value: "900+", label: "Population-genetic sequences analyzed" }
              ]}
            />
          </div>
          <Link
            href="/research/bfri"
            className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-amber-600 hover:underline dark:text-amber-400"
          >
            Explore the BFRI research page <ArrowUpRight size={14} />
          </Link>
        </Container>
      </section>

      {/* Publication */}
      <section className="border-b border-line py-16 dark:border-line-dark">
        <Container>
          <SectionHeading eyebrow="Publication" title="Peer-reviewed & in-progress work" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {publications.slice(0, 2).map((p) => (
              <PublicationCard key={p.title} pub={p} />
            ))}
          </div>
          <Link
            href="/publications"
            className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-amber-600 hover:underline dark:text-amber-400"
          >
            View all publications & manuscripts <ArrowUpRight size={14} />
          </Link>
        </Container>
      </section>

      {/* Contact CTA */}
      <section className="py-16">
        <Container className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-ink-900 dark:text-ink-100">
              Let&apos;s talk research.
            </h2>
            <p className="mt-1 text-ink-600 dark:text-ink-300">
              Open to graduate opportunities and collaboration in computational biology.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-ink-900 px-5 py-2.5 text-sm font-medium text-paper hover:bg-ink-700 dark:bg-amber-500 dark:text-ink-900 dark:hover:bg-amber-400"
          >
            Get in touch <ArrowUpRight size={15} />
          </Link>
        </Container>
      </section>
    </>
  );
}
