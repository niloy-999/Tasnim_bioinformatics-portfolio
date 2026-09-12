import type { Metadata } from "next";

import {
  GraduationCap,
  Briefcase,
  Sparkles,
  Compass,
  CheckCircle2,
} from "lucide-react";

import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Card3D from "@/components/Card3D";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Academic background, research experience, and scientific focus of Tasnim Ul Islam.",
};

const futureDirections = [
  "Conservation and population genomics of understudied or threatened freshwater fish species",
  "Biological foundation models and DNA–protein cross-modal representation learning",
  "Multimodal biological AI that preserves efficient single-modality DNA inference",
  "Comparative and evolutionary genomics (mitogenomics, codon bias, selection pressures)",
  "Reproducible bioinformatics pipeline engineering and scientific software development",
];

export default function AboutPage() {
  return (
    <Container className="py-12 sm:py-16">
      <SectionHeading
        eyebrow="Biographical & Academic Profile"
        title="Who I Am"
        description="Bioinformatics Engineering graduate from Bangladesh Agricultural University, specializing in computational genomics, biological sequence analysis, and machine learning."
      />

      {/* Main Narrative */}
      <div className="mt-8 space-y-4 rounded-2xl border border-line/80 bg-white/75 p-6 shadow-sm backdrop-blur-md dark:border-line-dark/80 dark:bg-slate-900/60 sm:p-8">
        <p className="text-justify text-sm leading-relaxed text-ink-700 dark:text-ink-200 sm:text-base sm:leading-8">
          I am a Bioinformatics Engineering graduate from Bangladesh Agricultural
          University, working at the intersection of computational genomics,
          evolutionary biology, and machine learning. My work has spanned three
          core domains: reference-guided whole-genome assembly and functional
          annotation, complete mitochondrial genome and population-genetic
          analysis of commercially important Bangladeshi fish species, and a
          DNA–protein cross-modal deep learning framework designed for discovering
          plastic-degrading genes in bacteria.
        </p>

        <p className="text-justify text-sm leading-relaxed text-ink-700 dark:text-ink-200 sm:text-base sm:leading-8">
          I am drawn to research problems where computational methods can
          meaningfully narrow down what a wet laboratory needs to experimentally
          validate — prioritizing candidate genes, flagging hidden population
          structures worth sampling further, or generating reference assemblies
          where none previously existed. I adhere strictly to scientific
          transparency: in silico predictions represent rigorous hypotheses to be
          experimentally challenged, not final biological conclusions.
        </p>
      </div>

      {/* Academic Background & Research Experience Grid */}
      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        {/* Academic Background */}
        <Card3D maxTilt={3}>
          <div className="flex h-full flex-col rounded-2xl border border-line/80 bg-white/75 p-6 shadow-sm backdrop-blur-sm dark:border-line-dark/80 dark:bg-slate-900/60 sm:p-7">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-bio-cyan/15 text-bio-cyan dark:bg-cyan-500/20 dark:text-cyan-400">
                <GraduationCap size={20} />
              </span>

              <div>
                <h2 className="font-serif text-lg font-semibold text-ink-900 dark:text-ink-100">
                  Academic Background
                </h2>

                <p className="text-xs font-mono text-ink-500 dark:text-cyan-300/80">
                  University & Pre-University Education
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-4">
              <div className="rounded-xl border border-line/70 bg-paper/60 p-4 dark:border-line-dark/70 dark:bg-slate-800/50">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-ink-900 dark:text-ink-100">
                    B.Sc. in Bioinformatics Engineering
                  </p>

                  <span className="rounded-full bg-bio-cyan/10 px-2.5 py-0.5 font-mono text-xs font-medium text-bio-cyan dark:bg-cyan-500/20 dark:text-cyan-300">
                    Completed 2026
                  </span>
                </div>

                <p className="mt-1 text-xs text-ink-600 dark:text-ink-300">
                  {site.institution}
                </p>

                {/* Academic Metrics */}
                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  <span className="rounded-md border border-line/80 bg-white/80 px-2 py-1 font-mono text-ink-700 dark:border-line-dark dark:bg-slate-900/80 dark:text-ink-200">
                    CGPA: <strong>3.51 / 4.00</strong>
                  </span>

                  <span className="rounded-md border border-line/80 bg-white/80 px-2 py-1 font-mono text-ink-700 dark:border-line-dark dark:bg-slate-900/80 dark:text-ink-200">
                    Merit Rank: <strong>5th</strong>
                  </span>

                  <span className="rounded-md border border-line/80 bg-white/80 px-2 py-1 font-mono text-ink-700 dark:border-line-dark dark:bg-slate-900/80 dark:text-ink-200">
                    Session: 2020–2024
                  </span>
                </div>
              </div>

              {/* Pre-University */}
              <div className="rounded-xl border border-line/70 bg-paper/60 p-4 dark:border-line-dark/70 dark:bg-slate-800/50">
                <p className="text-xs font-mono uppercase tracking-wider text-ink-400 dark:text-ink-500">
                  Pre-University Records
                </p>

                <div className="mt-2 space-y-1.5 text-xs text-ink-700 dark:text-ink-300">
                  <div className="flex justify-between">
                    <span>HSC — Kushtia Govt. College (2020)</span>
                    <strong className="font-mono text-amber-600 dark:text-amber-400">
                      GPA 5.00 / 5.00
                    </strong>
                  </div>

                  <div className="flex justify-between">
                    <span>SSC — Kushtia Zilla School (2018)</span>
                    <strong className="font-mono text-amber-600 dark:text-amber-400">
                      GPA 5.00 / 5.00
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card3D>

        {/* Research Experience */}
        <Card3D maxTilt={3}>
          <div className="flex h-full flex-col rounded-2xl border border-line/80 bg-white/75 p-6 shadow-sm backdrop-blur-sm dark:border-line-dark/80 dark:bg-slate-900/60 sm:p-7">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-bio-emerald/15 text-bio-emerald dark:bg-emerald-500/20 dark:text-emerald-400">
                <Briefcase size={20} />
              </span>

              <div>
                <h2 className="font-serif text-lg font-semibold text-ink-900 dark:text-ink-100">
                  Research Experience
                </h2>

                <p className="text-xs font-mono text-ink-500 dark:text-emerald-300/80">
                  Research, Internships & Projects
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-4">
              {/* BFRI */}
              <div className="rounded-xl border border-line/70 bg-paper/60 p-4 dark:border-line-dark/70 dark:bg-slate-800/50">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-ink-900 dark:text-ink-100">
                    Research Intern · Fish Genomics Lab
                  </p>

                  <span className="rounded-full bg-bio-emerald/10 px-2.5 py-0.5 font-mono text-xs font-medium text-bio-emerald dark:bg-emerald-500/20 dark:text-emerald-300">
                    2026
                  </span>
                </div>

                <p className="mt-1 text-xs text-bio-emerald dark:text-emerald-400">
                  Bangladesh Fisheries Research Institute (BFRI)
                </p>

                <p className="mt-2 text-justify text-xs leading-relaxed text-ink-600 dark:text-ink-300">
                  Conducted whole-genome assembly scaffolding, annotation,
                  mitogenomics, and population genomics of{" "}
                  <span className="italic">Tor tor</span> and{" "}
                  <span className="italic">Tenualosa ilisha</span> across
                  regional aquatic ecosystems.
                </p>
              </div>

              {/* Thesis */}
              <div className="rounded-xl border border-line/70 bg-paper/60 p-4 dark:border-line-dark/70 dark:bg-slate-800/50">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-ink-900 dark:text-ink-100">
                    Undergraduate Thesis Project
                  </p>

                  <span className="rounded-full bg-bio-violet/10 px-2.5 py-0.5 font-mono text-xs font-medium text-bio-violet dark:bg-purple-500/20 dark:text-purple-300">
                    2025 – 2026
                  </span>
                </div>

                <p className="mt-1 text-xs text-bio-violet dark:text-purple-400">
                  DNA–Protein Cross-Modal Deep Learning
                </p>

                <p className="mt-2 text-justify text-xs leading-relaxed text-ink-600 dark:text-ink-300">
                  Designed an InfoNCE-aligned cross-modal foundation model
                  framework leveraging DNABERT-2 and ESM-2 for candidate
                  plastic-degrading gene discovery in bacterial genomes.
                </p>
              </div>
            </div>
          </div>
        </Card3D>
      </div>

      {/* Computational & Scientific Interests */}
      <div className="mt-10 rounded-2xl border border-line/80 bg-white/75 p-6 shadow-sm backdrop-blur-md dark:border-line-dark/80 dark:bg-slate-900/60 sm:p-8">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-bio-cyan/15 text-bio-cyan dark:bg-cyan-500/20 dark:text-cyan-400">
            <Sparkles size={18} />
          </span>

          <h2 className="font-serif text-xl font-semibold text-ink-900 dark:text-ink-100">
            Computational & Scientific Interests
          </h2>
        </div>

        <p className="mt-4 text-justify text-sm leading-relaxed text-ink-700 dark:text-ink-200 sm:text-base sm:leading-8">
          My work so far has combined classical population-genetic and
          phylogenetic methods with modern sequence-representation learning. I
          am particularly interested in the point where these two traditions
          meet: using foundation models trained on massive biological sequence
          corpora (DNABERT-2, ESM-2) to complement, rather than replace, the
          careful dataset curation and evolutionary reasoning that population
          genetics and mitogenomics demand.
        </p>
      </div>

      {/* Future Research Direction */}
      <div className="mt-10 rounded-2xl border border-line/80 bg-gradient-to-br from-white/80 via-white/60 to-bio-cyan/5 p-6 shadow-sm backdrop-blur-md dark:border-cyan-500/30 dark:from-slate-900/80 dark:via-slate-900/60 dark:to-cyan-950/20 sm:p-8">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/15 text-amber-500 dark:bg-amber-500/20 dark:text-amber-400">
            <Compass size={18} />
          </span>

          <div>
            <h2 className="font-serif text-xl font-semibold text-ink-900 dark:text-ink-100">
              Future Research Direction
            </h2>

            <p className="text-xs text-ink-500 dark:text-cyan-300/80">
              Topics of interest for prospective doctoral supervisors and
              academic collaborators:
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {futureDirections.map((item) => (
            <div
              key={item}
              className="flex items-start gap-3 rounded-xl border border-line/60 bg-paper/70 p-3.5 backdrop-blur-sm dark:border-line-dark/60 dark:bg-slate-800/40"
            >
              <CheckCircle2
                size={16}
                className="mt-0.5 shrink-0 text-bio-cyan dark:text-cyan-400"
              />

              <p className="text-justify text-xs leading-relaxed text-ink-700 dark:text-ink-200 sm:text-sm">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}

