import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import StatGrid from "@/components/StatGrid";
import PipelineDiagram from "@/components/PipelineDiagram";
import Figure from "@/components/Figure";
import Card3D from "@/components/Card3D";
import { bfri } from "@/content/bfri";
import { Activity, Dna, FileText, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "BFRI Research — Fish Genomics",
  description: "Reference-guided whole-genome assembly of Tor tor and population genomics of Tor tor and Tenualosa ilisha at the Bangladesh Fisheries Research Institute."
};

export default function BfriPage() {
  const w = bfri.wgs;
  const pg = bfri.populationGenomics;

  return (
    <Container className="py-12 sm:py-16">
      <SectionHeading
        eyebrow="Research · BFRI Internship"
        title={bfri.title}
        description={`${bfri.host} · ${bfri.year}`}
      />

      <div className="mt-6 rounded-2xl border border-line/80 bg-white/75 p-6 shadow-sm backdrop-blur-md dark:border-line-dark/80 dark:bg-slate-900/60 sm:p-7">
        <p className="text-justify text-sm leading-relaxed text-ink-800 dark:text-ink-200 sm:text-base sm:leading-8">
          {bfri.summary}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 text-xs text-ink-500 dark:text-cyan-300/80 sm:text-sm">
        <span className="font-medium text-ink-700 dark:text-ink-200">Supervised by:</span>
        {bfri.supervisors.map((s) => (
          <span key={s.name} className="font-medium text-bio-cyan dark:text-cyan-300">
            {s.name} ({s.role})
          </span>
        ))}
      </div>

      {/* Wet lab */}
      <section className="mt-12">
        <h2 className="font-serif text-xl font-semibold text-ink-900 dark:text-ink-100">
          Biological Materials & Sample Preparation
        </h2>
        <p className="mt-2 text-sm text-ink-600 dark:text-ink-300">
          Species studied: <span className="italic font-medium">{bfri.species.join(" and ")}</span>.
        </p>
        <ol className="mt-5 grid gap-3 text-sm text-ink-700 dark:text-ink-200 sm:grid-cols-2">
          {bfri.wetLab.steps.map((s, i) => (
            <li key={s}>
              <Card3D maxTilt={2} className="h-full">
                <div className="flex h-full items-start gap-2.5 rounded-xl border border-line/80 bg-white/75 p-4 shadow-sm backdrop-blur-sm dark:border-line-dark/80 dark:bg-slate-900/60">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded font-mono text-xs font-semibold text-bio-cyan dark:text-cyan-300 bg-bio-cyan/15">
                    {i + 1}
                  </span>
                  <p className="text-justify text-xs leading-relaxed text-ink-600 dark:text-ink-300">{s}</p>
                </div>
              </Card3D>
            </li>
          ))}
        </ol>
        <div className="mt-6 max-w-md">
          <Figure
            src="/figures/agarose-gel-pcr.jpg"
            alt="Agarose gel electrophoresis confirming PCR amplification"
            caption="Agarose gel electrophoresis confirming successful PCR amplification of target mitochondrial loci prior to sequencing."
            source="BFRI internship report, Fig. p.22"
            aspect="aspect-[3/4]"
          />
        </div>
      </section>

      {/* WGS section */}
      <section className="mt-16 border-t border-line/80 pt-12 dark:border-line-dark/80">
        <h2 className="font-serif text-2xl font-semibold text-ink-900 dark:text-ink-100">
          {w.title}
        </h2>
        <div className="mt-4 rounded-2xl border border-line/80 bg-white/75 p-6 shadow-sm backdrop-blur-md dark:border-line-dark/80 dark:bg-slate-900/60 sm:p-7">
          <p className="text-justify text-sm leading-relaxed text-ink-800 dark:text-ink-200 sm:text-base sm:leading-7">{w.objective}</p>
          <div className="mt-4 border-t border-line/60 pt-3 text-xs text-ink-500 dark:border-line-dark/60 dark:text-cyan-300/80">
            <p><strong>Reference:</strong> {w.reference}</p>
            <p className="mt-1">
              <strong>Sequencing:</strong> {w.sequencing.platform}, {w.sequencing.readLength} ·{" "}
              {w.sequencing.forwardReads.toLocaleString()} forward + {w.sequencing.reverseReads.toLocaleString()} reverse reads
            </p>
          </div>
        </div>

        <h3 className="mt-10 font-serif text-lg font-semibold text-ink-900 dark:text-ink-100">
          Computational Assembly Pipeline
        </h3>
        <div className="mt-4">
          <PipelineDiagram steps={w.pipeline} />
        </div>

        <h3 className="mt-10 font-serif text-lg font-semibold text-ink-900 dark:text-ink-100">
          Assembly & Annotation Results
        </h3>
        <div className="mt-4">
          <StatGrid
            stats={[
              { value: w.results.consensusGenome.length, label: "Consensus genome length" },
              { value: w.results.buscoGenome.complete.split(" ")[0], label: "BUSCO completeness" },
              { value: w.results.quast.n50, label: "N50" },
              { value: w.results.mapping.meanDepth, label: "Mean coverage depth" },
              { value: w.results.annotation.finalGenes.toLocaleString(), label: "Predicted genes" },
              { value: w.results.annotation.mrnaTranscripts.toLocaleString(), label: "mRNA transcripts" },
              { value: w.results.annotation.avgProteinLength, label: "Avg. protein length" },
              { value: w.results.annotation.proteinsWithDiamondHits, label: "Homology hits" }
            ]}
          />
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Card3D maxTilt={2}>
            <div className="rounded-2xl border border-line/80 bg-white/75 p-6 shadow-sm backdrop-blur-sm dark:border-line-dark/80 dark:bg-slate-900/60">
              <h4 className="font-serif text-base font-semibold text-ink-900 dark:text-ink-100">Read processing & mapping</h4>
              <dl className="mt-4 space-y-2 text-xs text-ink-600 dark:text-ink-300">
                <div className="flex justify-between"><dt>Raw reads (total)</dt><dd className="font-mono">{(w.results.rawReads.forward + w.results.rawReads.reverse).toLocaleString()}</dd></div>
                <div className="flex justify-between"><dt>Q30 rate after fastp</dt><dd className="font-mono">{w.results.afterFastp.q30RateAfter}</dd></div>
                <div className="flex justify-between"><dt>Duplication rate</dt><dd className="font-mono">{w.results.afterFastp.duplicationRate}</dd></div>
                <div className="flex justify-between"><dt>Reads mapped</dt><dd className="font-mono">{w.results.mapping.totalMapped}</dd></div>
                <div className="flex justify-between"><dt>Properly paired</dt><dd className="font-mono">{w.results.mapping.properlyPaired}</dd></div>
              </dl>
            </div>
          </Card3D>

          <Card3D maxTilt={2}>
            <div className="rounded-2xl border border-line/80 bg-white/75 p-6 shadow-sm backdrop-blur-sm dark:border-line-dark/80 dark:bg-slate-900/60">
              <h4 className="font-serif text-base font-semibold text-ink-900 dark:text-ink-100">Variants & consensus</h4>
              <dl className="mt-4 space-y-2 text-xs text-ink-600 dark:text-ink-300">
                <div className="flex justify-between"><dt>Total variant records</dt><dd className="font-mono">{w.results.variants.totalRecords.toLocaleString()}</dd></div>
                <div className="flex justify-between"><dt>SNPs</dt><dd className="font-mono">{w.results.variants.snps.toLocaleString()}</dd></div>
                <div className="flex justify-between"><dt>Indels</dt><dd className="font-mono">{w.results.variants.indels.toLocaleString()}</dd></div>
                <div className="flex justify-between"><dt>Ti/Tv ratio</dt><dd className="font-mono">{w.results.variants.tiTvRatio}</dd></div>
                <div className="flex justify-between"><dt>Net length change</dt><dd className="font-mono">{w.results.consensusGenome.netDeltaFromReference}</dd></div>
              </dl>
            </div>
          </Card3D>
        </div>

        <div className="mt-6 rounded-2xl border border-line/80 bg-white/75 p-6 shadow-sm backdrop-blur-sm dark:border-line-dark/80 dark:bg-slate-900/60">
          <h4 className="font-serif text-base font-semibold text-ink-900 dark:text-ink-100">Functional annotation coverage</h4>
          <dl className="mt-4 grid gap-x-8 gap-y-2 text-xs text-ink-600 dark:text-ink-300 sm:grid-cols-2">
            <div className="flex justify-between"><dt>Proteins with GO terms</dt><dd className="font-mono">{w.results.annotation.proteinsWithGO}</dd></div>
            <div className="flex justify-between"><dt>Proteins with KEGG Orthology</dt><dd className="font-mono">{w.results.annotation.proteinsWithKO}</dd></div>
            <div className="flex justify-between"><dt>Proteins with EC numbers</dt><dd className="font-mono">{w.results.annotation.proteinsWithEC}</dd></div>
            <div className="flex justify-between"><dt>Unique GO terms</dt><dd className="font-mono">{w.results.annotation.uniqueGoTerms.toLocaleString()}</dd></div>
            <div className="flex justify-between"><dt>Unique KEGG pathways</dt><dd className="font-mono">{w.results.annotation.uniqueKeggPathways}</dd></div>
            <div className="flex justify-between"><dt>Unique COG classes</dt><dd className="font-mono">{w.results.annotation.uniqueCogClasses}</dd></div>
          </dl>
        </div>
      </section>

      {/* Population genomics */}
      <section className="mt-16 border-t border-line/80 pt-12 dark:border-line-dark/80">
        <h2 className="font-serif text-2xl font-semibold text-ink-900 dark:text-ink-100">
          {pg.title}
        </h2>
        <div className="mt-4 rounded-2xl border border-line/80 bg-white/75 p-6 shadow-sm backdrop-blur-md dark:border-line-dark/80 dark:bg-slate-900/60 sm:p-7">
          <p className="text-justify text-sm leading-relaxed text-ink-800 dark:text-ink-200 sm:text-base sm:leading-7">{pg.objective}</p>
          <p className="mt-2 text-xs font-mono text-ink-500 dark:text-cyan-300/80">{pg.scale}</p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Card3D maxTilt={2}>
            <div className="rounded-2xl border border-line/80 bg-white/75 p-6 shadow-sm backdrop-blur-sm dark:border-line-dark/80 dark:bg-slate-900/60">
              <h4 className="font-serif text-base font-semibold text-ink-900 dark:text-ink-100">T. ilisha — COI marker</h4>
              <dl className="mt-4 space-y-2 text-xs text-ink-600 dark:text-ink-300">
                <div className="flex justify-between"><dt>Sequences (after trimming)</dt><dd className="font-mono">{pg.ilishaCoi.sequencesAfterTrimming}</dd></div>
                <div className="flex justify-between"><dt>Unique haplotypes</dt><dd className="font-mono">{pg.ilishaCoi.uniqueHaplotypes}</dd></div>
                <div className="flex justify-between"><dt>Singleton haplotypes</dt><dd className="font-mono">{pg.ilishaCoi.singletonHaplotypes}</dd></div>
                <div className="flex justify-between"><dt>Most common haplotype</dt><dd className="font-mono">{pg.ilishaCoi.mostCommonHaplotype}</dd></div>
                <div className="flex justify-between"><dt>AMOVA (among populations)</dt><dd className="font-mono">{pg.ilishaCoi.amova.amongPopulationsPct}</dd></div>
              </dl>
            </div>
          </Card3D>

          <Card3D maxTilt={2}>
            <div className="rounded-2xl border border-line/80 bg-white/75 p-6 shadow-sm backdrop-blur-sm dark:border-line-dark/80 dark:bg-slate-900/60">
              <h4 className="font-serif text-base font-semibold text-ink-900 dark:text-ink-100">T. ilisha — Cyt b marker</h4>
              <dl className="mt-4 space-y-2 text-xs text-ink-600 dark:text-ink-300">
                <div className="flex justify-between"><dt>Sequences (deduplicated)</dt><dd className="font-mono">{pg.ilishaCytB.sequencesAfterDedup}</dd></div>
                <div className="flex justify-between"><dt>Unique haplotypes</dt><dd className="font-mono">{pg.ilishaCytB.uniqueHaplotypes}</dd></div>
                <div className="flex justify-between"><dt>Length range</dt><dd className="font-mono text-right text-xs">{pg.ilishaCytB.lengthRange}</dd></div>
              </dl>
            </div>
          </Card3D>
        </div>

        <div className="mt-6 rounded-2xl border border-amber-500/40 bg-amber-500/10 p-5 text-sm dark:border-amber-400/30 dark:bg-amber-950/20">
          <p className="font-medium text-amber-900 dark:text-amber-200">Marker Comparison</p>
          <p className="mt-2 text-justify text-xs leading-relaxed text-ink-700 dark:text-ink-200 sm:text-sm">{pg.comparison.conclusion}</p>
          <p className="mt-1 font-mono text-xs text-amber-700 dark:text-amber-400">{pg.comparison.tajimasD}</p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Figure
            src="/figures/haplotype-network-coi.png"
            alt="Haplotype network from mitochondrial marker data"
            caption="Median-joining haplotype network built in PopART, coloured by sampling locality."
            source="BFRI internship report, Fig. p.72"
          />
          <Figure
            src="/figures/tortor-sampling-map.png"
            alt="Geographic sampling distribution map"
            caption="Geographic distribution of Tor tor sampling localities used in the population-genetic analysis."
            source="BFRI internship report, Fig. p.102"
          />
        </div>

        <h3 className="mt-10 font-serif text-lg font-semibold text-ink-900 dark:text-ink-100">
          Tor tor Population Structure
        </h3>
        <div className="mt-4">
          <StatGrid
            stats={[
              { value: `${pg.tortorPopgen.sequences}`, label: "Sequences analyzed" },
              { value: pg.tortorPopgen.polymorphicSites, label: "Polymorphic sites" },
              { value: pg.tortorPopgen.amova.amongPopulationsPct, label: "AMOVA — among populations" },
              { value: pg.tortorPopgen.amova.withinPopulationsPct, label: "AMOVA — within populations" }
            ]}
          />
        </div>
        <p className="mt-4 text-justify text-xs leading-relaxed text-ink-700 dark:text-ink-200 sm:text-sm">{pg.tortorPopgen.geographicSpread}</p>
        <p className="mt-2 text-justify text-xs leading-relaxed text-ink-700 dark:text-ink-200 sm:text-sm">{pg.tortorPopgen.diversityHighlights}</p>

        <Figure
          src="/figures/fst-heatmap-tortor.png"
          alt="Pairwise FST heatmap across Tor tor populations"
          caption="Pairwise fixation index (FST) heatmap summarizing genetic differentiation among sampled Tor tor populations."
          source="BFRI internship report, Fig. p.100"
          aspect="aspect-[4/3]"
        />
      </section>

      {/* Novelty & limitations */}
      <section className="mt-16 border-t border-line/80 pt-12 dark:border-line-dark/80">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-line/80 bg-white/75 p-6 shadow-sm backdrop-blur-sm dark:border-line-dark/80 dark:bg-slate-900/60">
            <h2 className="font-serif text-lg font-semibold text-ink-900 dark:text-ink-100">
              Contribution & Novelty
            </h2>
            <ul className="mt-4 space-y-2.5 text-xs text-ink-600 dark:text-ink-300">
              {bfri.novelty.points.map((p) => (
                <li key={p} className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-bio-emerald" />
                  <span className="text-justify leading-relaxed">{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-line/80 bg-white/75 p-6 shadow-sm backdrop-blur-sm dark:border-line-dark/80 dark:bg-slate-900/60">
            <h2 className="font-serif text-lg font-semibold text-ink-900 dark:text-ink-100">
              Limitations
            </h2>
            <ul className="mt-4 space-y-2.5 text-xs text-ink-600 dark:text-ink-300">
              {bfri.limitations.map((p) => (
                <li key={p} className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                  <span className="text-justify leading-relaxed">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </Container>
  );
}
