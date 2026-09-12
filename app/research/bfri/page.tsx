import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import StatGrid from "@/components/StatGrid";
import PipelineDiagram from "@/components/PipelineDiagram";
import Figure from "@/components/Figure";
import { bfri } from "@/content/bfri";

export const metadata: Metadata = {
  title: "BFRI Research — Fish Genomics",
  description: "Reference-guided whole-genome assembly of Tor tor and population genomics of Tor tor and Tenualosa ilisha at the Bangladesh Fisheries Research Institute."
};

export default function BfriPage() {
  const w = bfri.wgs;
  const pg = bfri.populationGenomics;

  return (
    <Container className="py-14">
      <SectionHeading
        eyebrow="Research · Internship"
        title={bfri.title}
        description={`${bfri.host} · ${bfri.year}`}
      />

      <p className="prose-body mt-6 max-w-prose">{bfri.summary}</p>

      <div className="mt-4 flex flex-wrap gap-2 text-sm text-ink-500 dark:text-ink-400">
        <span className="font-medium text-ink-700 dark:text-ink-200">Supervised by:</span>
        {bfri.supervisors.map((s) => (
          <span key={s.name}>{s.name} ({s.role})</span>
        ))}
      </div>

      {/* Wet lab */}
      <section className="mt-12">
        <h2 className="font-serif text-xl font-semibold text-ink-900 dark:text-ink-100">
          Biological Materials & Sample Preparation
        </h2>
        <p className="mt-2 text-sm text-ink-600 dark:text-ink-300">
          Species studied: {bfri.species.join(" and ")}.
        </p>
        <ol className="mt-4 grid gap-2 text-sm text-ink-700 dark:text-ink-200 sm:grid-cols-2">
          {bfri.wetLab.steps.map((s, i) => (
            <li key={s} className="flex gap-2 border border-line p-3 dark:border-line-dark">
              <span className="font-mono text-amber-600 dark:text-amber-400">{i + 1}.</span> {s}
            </li>
          ))}
        </ol>
        <div className="mt-4 max-w-md">
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
      <section className="mt-16 border-t border-line pt-12 dark:border-line-dark">
        <h2 className="font-serif text-2xl font-semibold text-ink-900 dark:text-ink-100">
          {w.title}
        </h2>
        <p className="prose-body mt-3 max-w-prose">{w.objective}</p>
        <p className="mt-2 text-sm text-ink-500 dark:text-ink-400">
          Reference: {w.reference}
        </p>
        <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">
          Sequencing: {w.sequencing.platform}, {w.sequencing.readLength} ·{" "}
          {w.sequencing.forwardReads.toLocaleString()} forward + {w.sequencing.reverseReads.toLocaleString()} reverse reads
        </p>

        <h3 className="mt-8 font-serif text-lg font-semibold text-ink-900 dark:text-ink-100">
          Computational Pipeline
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
              { value: w.results.annotation.proteinsWithDiamondHits, label: "Proteins with homology hits" }
            ]}
          />
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="border border-line p-5 text-sm dark:border-line-dark">
            <h4 className="font-medium text-ink-900 dark:text-ink-100">Read processing & mapping</h4>
            <dl className="mt-3 space-y-1.5 text-ink-600 dark:text-ink-300">
              <div className="flex justify-between"><dt>Raw reads (total)</dt><dd className="font-mono">{(w.results.rawReads.forward + w.results.rawReads.reverse).toLocaleString()}</dd></div>
              <div className="flex justify-between"><dt>Q30 rate after fastp</dt><dd className="font-mono">{w.results.afterFastp.q30RateAfter}</dd></div>
              <div className="flex justify-between"><dt>Duplication rate</dt><dd className="font-mono">{w.results.afterFastp.duplicationRate}</dd></div>
              <div className="flex justify-between"><dt>Reads mapped</dt><dd className="font-mono">{w.results.mapping.totalMapped}</dd></div>
              <div className="flex justify-between"><dt>Properly paired</dt><dd className="font-mono">{w.results.mapping.properlyPaired}</dd></div>
            </dl>
          </div>
          <div className="border border-line p-5 text-sm dark:border-line-dark">
            <h4 className="font-medium text-ink-900 dark:text-ink-100">Variants & consensus</h4>
            <dl className="mt-3 space-y-1.5 text-ink-600 dark:text-ink-300">
              <div className="flex justify-between"><dt>Total variant records</dt><dd className="font-mono">{w.results.variants.totalRecords.toLocaleString()}</dd></div>
              <div className="flex justify-between"><dt>SNPs</dt><dd className="font-mono">{w.results.variants.snps.toLocaleString()}</dd></div>
              <div className="flex justify-between"><dt>Indels</dt><dd className="font-mono">{w.results.variants.indels.toLocaleString()}</dd></div>
              <div className="flex justify-between"><dt>Ti/Tv ratio</dt><dd className="font-mono">{w.results.variants.tiTvRatio}</dd></div>
              <div className="flex justify-between"><dt>Net length change vs. reference</dt><dd className="font-mono">{w.results.consensusGenome.netDeltaFromReference}</dd></div>
            </dl>
          </div>
        </div>

        <div className="mt-6 border border-line p-5 text-sm dark:border-line-dark">
          <h4 className="font-medium text-ink-900 dark:text-ink-100">Functional annotation coverage</h4>
          <dl className="mt-3 grid gap-x-8 gap-y-1.5 text-ink-600 dark:text-ink-300 sm:grid-cols-2">
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
      <section className="mt-16 border-t border-line pt-12 dark:border-line-dark">
        <h2 className="font-serif text-2xl font-semibold text-ink-900 dark:text-ink-100">
          {pg.title}
        </h2>
        <p className="prose-body mt-3 max-w-prose">{pg.objective}</p>
        <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">{pg.scale}</p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="border border-line p-5 text-sm dark:border-line-dark">
            <h4 className="font-medium text-ink-900 dark:text-ink-100">T. ilisha — COI marker</h4>
            <dl className="mt-3 space-y-1.5 text-ink-600 dark:text-ink-300">
              <div className="flex justify-between"><dt>Sequences (after trimming)</dt><dd className="font-mono">{pg.ilishaCoi.sequencesAfterTrimming}</dd></div>
              <div className="flex justify-between"><dt>Unique haplotypes</dt><dd className="font-mono">{pg.ilishaCoi.uniqueHaplotypes}</dd></div>
              <div className="flex justify-between"><dt>Singleton haplotypes</dt><dd className="font-mono">{pg.ilishaCoi.singletonHaplotypes}</dd></div>
              <div className="flex justify-between"><dt>Most common haplotype</dt><dd className="font-mono">{pg.ilishaCoi.mostCommonHaplotype}</dd></div>
              <div className="flex justify-between"><dt>AMOVA (among populations)</dt><dd className="font-mono">{pg.ilishaCoi.amova.amongPopulationsPct}</dd></div>
            </dl>
          </div>
          <div className="border border-line p-5 text-sm dark:border-line-dark">
            <h4 className="font-medium text-ink-900 dark:text-ink-100">T. ilisha — Cyt b marker</h4>
            <dl className="mt-3 space-y-1.5 text-ink-600 dark:text-ink-300">
              <div className="flex justify-between"><dt>Sequences (deduplicated)</dt><dd className="font-mono">{pg.ilishaCytB.sequencesAfterDedup}</dd></div>
              <div className="flex justify-between"><dt>Unique haplotypes</dt><dd className="font-mono">{pg.ilishaCytB.uniqueHaplotypes}</dd></div>
              <div className="flex justify-between"><dt>Length range</dt><dd className="font-mono text-right text-xs">{pg.ilishaCytB.lengthRange}</dd></div>
            </dl>
          </div>
        </div>

        <div className="mt-6 border border-amber-500/40 bg-amber-100/40 p-5 text-sm dark:bg-amber-900/10">
          <p className="font-medium text-ink-900 dark:text-amber-200">Marker comparison</p>
          <p className="mt-2 text-ink-700 dark:text-ink-200">{pg.comparison.conclusion}</p>
          <p className="mt-1 text-ink-600 dark:text-ink-300">{pg.comparison.tajimasD}</p>
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
        <p className="prose-body mt-4 max-w-prose text-sm">{pg.tortorPopgen.geographicSpread}</p>
        <p className="prose-body mt-2 max-w-prose text-sm">{pg.tortorPopgen.diversityHighlights}</p>

        <Figure
          src="/figures/fst-heatmap-tortor.png"
          alt="Pairwise FST heatmap across Tor tor populations"
          caption="Pairwise fixation index (FST) heatmap summarizing genetic differentiation among sampled Tor tor populations."
          source="BFRI internship report, Fig. p.100"
          aspect="aspect-[4/3]"
        />
        <div className="mt-6" />
      </section>

      {/* Novelty & limitations */}
      <section className="mt-16 border-t border-line pt-12 dark:border-line-dark">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="font-serif text-lg font-semibold text-ink-900 dark:text-ink-100">
              Contribution & Novelty
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-ink-600 dark:text-ink-300">
              {bfri.novelty.points.map((p) => (
                <li key={p} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-serif text-lg font-semibold text-ink-900 dark:text-ink-100">
              Limitations
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-ink-600 dark:text-ink-300">
              {bfri.limitations.map((p) => (
                <li key={p} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-400" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <p className="mt-12 border-t border-line pt-6 text-xs text-ink-400 dark:border-line-dark dark:text-ink-500">
        Data source: BFRI internship report (2026). Several manuscripts drawing on this work are
        currently under review, in revision, or in preparation — see{" "}
        <a href="/publications" className="underline hover:text-amber-600">Publications</a>.
      </p>
    </Container>
  );
}
