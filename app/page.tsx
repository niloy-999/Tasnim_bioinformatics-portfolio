import Link from "next/link";
import { ArrowUpRight, Github, FileDown, Sparkles, BookOpen, Layers, Dna, Cpu, Activity } from "lucide-react";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import StatGrid from "@/components/StatGrid";
import PublicationCard from "@/components/PublicationCard";
import HeroProfileImage from "@/components/HeroProfileImage";
import Card3D from "@/components/Card3D";
import { site } from "@/content/site";
import { thesis } from "@/content/thesis";
import { bfri } from "@/content/bfri";
import { publications } from "@/content/publications";

const researchThemes = [
  { n: "01", title: "Computational Genomics", href: "/research/bfri", desc: "Reference-guided WGS, assembly scaffolding, and comprehensive functional annotation." },
  { n: "02", title: "Mitochondrial & Evolutionary Genomics", href: "/research/mitochondrial-genomics", desc: "Comparative mitogenome architecture, codon usage bias (RSCU), and Ka/Ks selection." },
  { n: "03", title: "Population Genetics", href: "/research/bfri", desc: "Haplotype network diversity, AMOVA, Tajima's D, and phylogeography of indigenous fishes." },
  { n: "04", title: "DNA–Protein Representation Learning", href: "/thesis", desc: "Cross-modal contrastive alignment (InfoNCE) with multimodal attention architectures." },
  { n: "05", title: "Sequence Foundation Models", href: "/thesis", desc: "Genomic language model adaptation using DNABERT-2 and ESM-2 for gene discovery." },
  { n: "06", title: "Bioinformatics Software Engineering", href: "/projects", desc: "Local sequence exploratory desktop tools and interactive single-cell analysis platforms." }
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-line/80 dark:border-line-dark/80">
        <Container className="py-12 sm:py-16 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Left Column: Academic Bio & CTAs */}
            <div className="lg:col-span-7">
              {/* Live Bio Badge */}
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-bio-cyan/30 bg-white/70 px-3 py-1 text-xs font-mono font-medium text-ink-700 shadow-sm backdrop-blur-md dark:border-cyan-500/30 dark:bg-ink-900/70 dark:text-cyan-300">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-bio-emerald opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-bio-emerald"></span>
                </span>
                Bioinformatics Engineer · Final Year @ BAU
              </div>

              {/* Name & Academic Title */}
              <h1 className="font-serif text-3xl font-bold tracking-tight text-ink-900 dark:text-ink-100 sm:text-5xl lg:text-5xl">
                {site.name}
              </h1>

              <p className="mt-3 text-base font-medium text-bio-cyan dark:text-cyan-400 sm:text-lg">
                Bioinformatics Engineering · Computational Biology · Genomics · Deep Learning
              </p>

              <p className="prose-body mt-4 max-w-2xl text-sm leading-relaxed text-ink-700 dark:text-ink-200 sm:text-base">
                {site.statement}
              </p>

              {/* Action Buttons */}
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  href="/research"
                  className="btn-primary"
                >
                  Explore Research <ArrowUpRight size={16} />
                </Link>

                <a
                  href={site.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary"
                >
                  <Github size={16} /> GitHub
                </a>

                <Link
                  href="/cv"
                  className="btn-secondary"
                >
                  <FileDown size={16} /> Curriculum Vitae
                </Link>
              </div>

              {/* Key Portfolio Metrics Highlights */}
              <div className="mt-8 grid grid-cols-2 gap-3 border-t border-line/80 pt-6 sm:grid-cols-4 dark:border-line-dark/80">
                <Link
                  href="/publications"
                  className="group rounded-xl border border-line/70 bg-white/70 p-3 backdrop-blur-md transition-all duration-300 hover:border-bio-cyan/60 hover:shadow-glow dark:border-line-dark/70 dark:bg-slate-900/60 dark:hover:border-cyan-400"
                >
                  <p className="font-mono text-xl font-bold text-bio-cyan transition-colors group-hover:text-cyan-500 dark:text-cyan-300">07+</p>
                  <p className="font-serif text-xs font-semibold text-ink-900 dark:text-ink-100">Publications</p>
                  <p className="text-[10px] text-ink-500 dark:text-ink-400">1 Springer · 6 Pipeline</p>
                </Link>

                <Link
                  href="/projects"
                  className="group rounded-xl border border-line/70 bg-white/70 p-3 backdrop-blur-md transition-all duration-300 hover:border-bio-emerald/60 hover:shadow-glow dark:border-line-dark/70 dark:bg-slate-900/60 dark:hover:border-emerald-400"
                >
                  <p className="font-mono text-xl font-bold text-bio-emerald transition-colors group-hover:text-emerald-500 dark:text-emerald-300">11+</p>
                  <p className="font-serif text-xs font-semibold text-ink-900 dark:text-ink-100">Projects</p>
                  <p className="text-[10px] text-ink-500 dark:text-ink-400">Software &amp; Repos</p>
                </Link>

                <Link
                  href="/thesis"
                  className="group rounded-xl border border-line/70 bg-white/70 p-3 backdrop-blur-md transition-all duration-300 hover:border-purple-500/60 hover:shadow-glow dark:border-line-dark/70 dark:bg-slate-900/60 dark:hover:border-purple-400"
                >
                  <p className="font-mono text-xl font-bold text-purple-600 transition-colors group-hover:text-purple-500 dark:text-purple-300">02</p>
                  <p className="font-serif text-xs font-semibold text-ink-900 dark:text-ink-100">Thesis &amp; BFRI</p>
                  <p className="text-[10px] text-ink-500 dark:text-ink-400">AI ML &amp; WGS Study</p>
                </Link>

                <Link
                  href="/skills"
                  className="group rounded-xl border border-line/70 bg-white/70 p-3 backdrop-blur-md transition-all duration-300 hover:border-amber-500/60 hover:shadow-glow dark:border-line-dark/70 dark:bg-slate-900/60 dark:hover:border-amber-400"
                >
                  <p className="font-mono text-xl font-bold text-amber-500 transition-colors group-hover:text-amber-600 dark:text-amber-300">50+</p>
                  <p className="font-serif text-xs font-semibold text-ink-900 dark:text-ink-100">Bio Skills</p>
                  <p className="text-[10px] text-ink-500 dark:text-ink-400">Genomics, AI &amp; Code</p>
                </Link>
              </div>
            </div>

            {/* Right Column: Hero Profile Image with 3D Tilt and Lab HUD */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <HeroProfileImage />
            </div>
          </div>
        </Container>
      </section>

      {/* Prospective Supervisor / PI Banner */}
      <section className="border-b border-line/80 bg-ink-900 text-white dark:border-line-dark/80 dark:bg-slate-900/95 dark:backdrop-blur-md">
        <Container className="flex flex-col items-start justify-between gap-4 py-5 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-bio-cyan/20 text-cyan-300">
              <Sparkles size={16} />
            </span>
            <p className="text-sm font-medium text-ink-100">
              Looking for a graduate researcher or computational biology collaborator?
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium">
            <Link href="/thesis" className="rounded-md border border-cyan-400/40 bg-cyan-500/10 px-2.5 py-1 text-cyan-300 hover:bg-cyan-400 hover:text-slate-950 transition-colors">Thesis Overview →</Link>
            <Link href="/research" className="rounded-md border border-emerald-400/40 bg-emerald-500/10 px-2.5 py-1 text-emerald-300 hover:bg-emerald-400 hover:text-slate-950 transition-colors">BFRI Genomics →</Link>
            <Link href="/publications" className="rounded-md border border-amber-400/40 bg-amber-500/10 px-2.5 py-1 text-amber-300 hover:bg-amber-400 hover:text-slate-950 transition-colors">Publications →</Link>
            <Link href="/contact" className="rounded-md border border-white/30 bg-white/10 px-2.5 py-1 text-white hover:bg-white hover:text-slate-950 transition-colors">Get in touch →</Link>
          </div>
        </Container>
      </section>

      {/* Research at a Glance */}
      <section className="border-b border-line/80 py-16 dark:border-line-dark/80">
        <Container>
          <SectionHeading
            eyebrow="Research Scope"
            title="Research at a Glance"
            description="Focusing on genomic data engineering, sequence representation learning, and evolutionary biology."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {researchThemes.map((t) => (
              <Card3D key={t.title} maxTilt={5}>
                <Link
                  href={t.href}
                  className="group flex h-full flex-col rounded-xl border border-line/80 bg-white/70 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-bio-cyan/60 hover:shadow-glow dark:border-line-dark/80 dark:bg-ink-900/50 dark:hover:border-cyan-500/50"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-bio-cyan dark:text-cyan-400">{t.n}</span>
                    <ArrowUpRight size={15} className="text-ink-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-bio-cyan dark:text-ink-500 dark:group-hover:text-cyan-400" />
                  </div>
                  <h3 className="mt-3 font-serif text-lg font-semibold text-ink-900 transition-colors group-hover:text-bio-cyan dark:text-ink-100 dark:group-hover:text-cyan-400">
                    {t.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
                    {t.desc}
                  </p>
                </Link>
              </Card3D>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured: Undergraduate Thesis */}
      <section className="border-b border-line/80 py-16 dark:border-line-dark/80">
        <Container>
          <Card3D maxTilt={2}>
            <div className="rounded-2xl border border-line/80 bg-white/75 p-6 shadow-sm backdrop-blur-md dark:border-line-dark/80 dark:bg-slate-900/60 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-bio-cyan/40 bg-bio-cyan/10 px-3 py-1 text-xs font-mono font-medium text-bio-cyan dark:text-cyan-400">
                  <Cpu size={13} /> Featured Research · Undergraduate Thesis
                </span>
                <span className="font-mono text-xs text-ink-400 dark:text-ink-500">Session 2025–2026</span>
              </div>

              <h2 className="mt-4 font-serif text-2xl font-bold text-ink-900 dark:text-ink-100 sm:text-3xl">
                {thesis.title}
              </h2>

              <p className="mt-4 max-w-4xl text-justify text-sm leading-relaxed text-ink-700 dark:text-ink-200 sm:text-base sm:leading-7">
                {thesis.researchQuestion}
              </p>

              <div className="mt-6">
                <StatGrid
                  stats={[
                    { value: `${(thesis.finalTest.accuracy * 100).toFixed(1)}%`, label: "Test accuracy" },
                    { value: thesis.finalTest.f1.toFixed(3), label: "Test F1-score" },
                    { value: thesis.finalTest.rocAuc.toFixed(3), label: "ROC-AUC" },
                    { value: thesis.finalTest.mcc.toFixed(3), label: "Matthews Corr. Coeff." }
                  ]}
                />
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Link
                  href="/thesis"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-bio-cyan hover:underline dark:text-cyan-400"
                >
                  Read full thesis breakdown & cross-modal architecture <ArrowUpRight size={15} />
                </Link>
              </div>
            </div>
          </Card3D>
        </Container>
      </section>

      {/* Featured: BFRI Internship */}
      <section className="border-b border-line/80 py-16 dark:border-line-dark/80">
        <Container>
          <Card3D maxTilt={2}>
            <div className="rounded-2xl border border-line/80 bg-white/75 p-6 shadow-sm backdrop-blur-md dark:border-line-dark/80 dark:bg-slate-900/60 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-bio-emerald/40 bg-bio-emerald/10 px-3 py-1 text-xs font-mono font-medium text-bio-emerald dark:text-emerald-400">
                  <Activity size={13} /> Featured Genomics · BFRI Internship
                </span>
                <span className="font-mono text-xs text-ink-400 dark:text-ink-500">2026 · Fish Genomics Lab</span>
              </div>

              <h2 className="mt-4 font-serif text-2xl font-bold text-ink-900 dark:text-ink-100 sm:text-3xl">
                {bfri.title}
              </h2>

              <p className="mt-4 max-w-4xl text-justify text-sm leading-relaxed text-ink-700 dark:text-ink-200 sm:text-base sm:leading-7">
                {bfri.summary}
              </p>

              <div className="mt-6">
                <StatGrid
                  stats={[
                    { value: "868.2 Mb", label: "Tor tor consensus genome" },
                    { value: "97.8%", label: "BUSCO completeness" },
                    { value: "48,169", label: "Predicted genes" },
                    { value: "900+", label: "Population sequences" }
                  ]}
                />
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Link
                  href="/research/bfri"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-bio-emerald hover:underline dark:text-emerald-400"
                >
                  Explore the BFRI research & assembly pipeline <ArrowUpRight size={15} />
                </Link>
              </div>
            </div>
          </Card3D>
        </Container>
      </section>

      {/* Publications Preview */}
      <section className="border-b border-line/80 py-16 dark:border-line-dark/80">
        <Container>
          <SectionHeading
            eyebrow="Publications & Manuscripts"
            title="Peer-reviewed & in-progress work"
            description="Work spanning algorithmic computational biology, single-cell analysis, and gene family characterization."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {publications.slice(0, 2).map((p) => (
              <Card3D key={p.title} maxTilt={3}>
                <PublicationCard pub={p} />
              </Card3D>
            ))}
          </div>
          <div className="mt-8">
            <Link
              href="/publications"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-bio-cyan hover:underline dark:text-cyan-400"
            >
              View all publications, manuscripts & abstracts <ArrowUpRight size={15} />
            </Link>
          </div>
        </Container>
      </section>

      {/* Contact CTA */}
      <section className="py-16">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-line/90 bg-white/70 p-6 backdrop-blur-md dark:border-cyan-500/30 dark:bg-slate-900/80 dark:shadow-glow sm:flex-row sm:items-center sm:p-10">
            <div>
              <h2 className="font-serif text-2xl font-bold text-ink-900 dark:text-ink-100 sm:text-3xl">
                Let&apos;s talk research & collaboration.
              </h2>
              <p className="mt-2 text-sm text-ink-600 dark:text-ink-300 sm:text-base">
                Open to graduate opportunities, doctoral studies, and computational biology projects.
              </p>
            </div>
            <Link
              href="/contact"
              className="btn-primary shrink-0 px-6 py-3"
            >
              Get in touch <ArrowUpRight size={16} />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
