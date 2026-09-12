import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import StatGrid from "@/components/StatGrid";
import Figure from "@/components/Figure";
import Card3D from "@/components/Card3D";
import { bfri } from "@/content/bfri";
import { Dna, Activity, Microscope } from "lucide-react";

export const metadata: Metadata = {
  title: "Mitochondrial Genomics Showcase",
  description: "Complete mitochondrial genome analysis of Tor tor and Tenualosa ilisha: architecture, codon usage, tRNA structure, and selection analysis."
};

export default function MitoPage() {
  const m = bfri.mitogenomics;
  const t = m.tortor;
  const i = m.ilisha;

  return (
    <Container className="py-12 sm:py-16">
      <SectionHeading
        eyebrow="Research · Mitochondrial Genomics"
        title={m.title}
        description={m.objective}
      />

      <div className="mt-6 rounded-2xl border border-line/80 bg-white/75 p-6 shadow-sm backdrop-blur-md dark:border-line-dark/80 dark:bg-slate-900/60 sm:p-7">
        <p className="text-justify text-sm leading-relaxed text-ink-800 dark:text-ink-200 sm:text-base sm:leading-7">
          {m.dataCollection}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5 border-t border-line/60 pt-3 dark:border-line-dark/60">
          {m.tools.map((tool) => (
            <span
              key={tool}
              className="rounded-md border border-line/80 bg-paper/70 px-2.5 py-1 font-mono text-[11px] text-ink-600 dark:border-line-dark/80 dark:bg-slate-800/70 dark:text-cyan-300"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>

      {/* Tor tor section */}
      <section className="mt-14 border-t border-line/80 pt-10 dark:border-line-dark/80">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-serif text-2xl font-semibold text-ink-900 dark:text-ink-100">
            Tor tor Mitogenome Architecture
          </h2>
          <span className="font-mono text-xs text-bio-cyan dark:text-cyan-300">
            NCBI Accession: {t.accession}
          </span>
        </div>

        <div className="mt-6">
          <StatGrid
            stats={[
              { value: t.length, label: "Genome length" },
              { value: t.gcContent, label: "GC content" },
              { value: `${t.skew.atSkew}`, label: "AT-skew" },
              { value: `${t.skew.gcSkew}`, label: "GC-skew" }
            ]}
          />
        </div>

        <p className="mt-6 text-justify text-sm leading-relaxed text-ink-700 dark:text-ink-200">
          {t.genes}. {t.pcgSpan}.
        </p>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <Figure
            src="/figures/tor-tor-mitogenome-map.png"
            alt="Circular map of the Tor tor mitochondrial genome"
            caption="Circular genome map: 13 protein-coding genes, 22 tRNAs, 2 rRNAs, and the control region (D-loop), with per-gene GC content shown in parentheses."
            source="Own annotation, MitoAnnotator / Proksee"
          />
          <Figure
            src="/figures/cyprinid-ml-tree.png"
            alt="Maximum-likelihood phylogenetic tree of Tor and related cyprinids"
            caption="Maximum-likelihood tree (IQ-TREE, 13 concatenated PCGs, 1000 ultrafast bootstraps) placing Tor as a distinct, well-supported clade relative to Labeo and Cyprinus outgroups."
            source="Own analysis, IQ-TREE + iTOL"
          />
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Card3D maxTilt={2}>
            <div className="h-full rounded-2xl border border-line/80 bg-white/75 p-6 shadow-sm backdrop-blur-sm dark:border-line-dark/80 dark:bg-slate-900/60">
              <h3 className="font-serif text-base font-semibold text-ink-900 dark:text-ink-100">Codon usage (RSCU)</h3>
              <p className="mt-3 text-justify text-xs leading-relaxed text-ink-600 dark:text-ink-300 sm:text-sm">{t.rscu}</p>
            </div>
          </Card3D>

          <Card3D maxTilt={2}>
            <div className="h-full rounded-2xl border border-line/80 bg-white/75 p-6 shadow-sm backdrop-blur-sm dark:border-line-dark/80 dark:bg-slate-900/60">
              <h3 className="font-serif text-base font-semibold text-ink-900 dark:text-ink-100">tRNA secondary structure</h3>
              <p className="mt-3 text-justify text-xs leading-relaxed text-ink-600 dark:text-ink-300 sm:text-sm">{t.trnaStructure}</p>
            </div>
          </Card3D>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <Figure
            src="/figures/rscu-analysis.png"
            alt="Relative synonymous codon usage (RSCU) bar chart"
            caption="RSCU values across all synonymous codon families in the Tor tor mitogenome, showing translational bias toward Leucine and Serine."
            source="Own analysis, PhyloSuite"
          />
          <Figure
            src="/figures/trna-secondary-structures.png"
            alt="Predicted tRNA cloverleaf secondary structures"
            caption="Predicted secondary structures for the 22 mitochondrial tRNAs; 21 fold into the canonical cloverleaf, with tRNA-Ser(GCT) lacking the D-arm."
            source="MITOS2 (Galaxy)"
          />
        </div>

        <div className="mt-8 rounded-2xl border border-line/80 bg-white/75 p-6 shadow-sm backdrop-blur-sm dark:border-line-dark/80 dark:bg-slate-900/60">
          <h3 className="font-serif text-base font-semibold text-ink-900 dark:text-ink-100">Selection analysis (Ka/Ks)</h3>
          <p className="mt-2 text-justify text-xs leading-relaxed text-ink-600 dark:text-ink-300 sm:text-sm">{t.kaks.note}</p>
          <div className="mt-3 flex flex-wrap gap-6 text-xs sm:text-sm text-ink-700 dark:text-ink-200">
            <span>Most relaxed constraint: <span className="font-mono text-bio-cyan dark:text-cyan-300">{t.kaks.mostRelaxed}</span></span>
            <span>Most conserved: <span className="font-mono text-bio-emerald dark:text-emerald-300">{t.kaks.mostConserved}</span></span>
          </div>
        </div>
      </section>

      {/* Ilisha section */}
      <section className="mt-16 border-t border-line/80 pt-10 dark:border-line-dark/80">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-serif text-2xl font-semibold text-ink-900 dark:text-ink-100">
            Tenualosa ilisha Mitogenome
          </h2>
          <span className="font-mono text-xs text-bio-cyan dark:text-cyan-300">
            NCBI Accession: {i.accession}
          </span>
        </div>

        <div className="mt-6">
          <StatGrid
            stats={[
              { value: i.length, label: "Genome length" },
              { value: i.gcContent, label: "GC content" },
              { value: `${i.skew.atSkew}`, label: "AT-skew" },
              { value: `${i.skew.gcSkew}`, label: "GC-skew" }
            ]}
          />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <Figure
            src="/figures/ilisha-mitogenome-map.png"
            alt="GC skew map of the Tenualosa ilisha mitogenome"
            caption="GC skew (+/−) distribution across the T. ilisha mitochondrial genome, highlighting strand asymmetry in nucleotide composition."
            source="Own analysis"
          />
          <Figure
            src="/figures/control-region-sliding-window.png"
            alt="Sliding-window nucleotide diversity across the control region"
            caption="Sliding-window polymorphism analysis of the ~1,200 bp control region, showing three distinct diversity peaks."
            source="Own analysis"
          />
        </div>

        <div className="mt-8 rounded-2xl border border-line/80 bg-white/75 p-6 shadow-sm backdrop-blur-sm dark:border-line-dark/80 dark:bg-slate-900/60">
          <h3 className="font-serif text-base font-semibold text-ink-900 dark:text-ink-100">Selection analysis (Ka/Ks)</h3>
          <p className="mt-2 text-justify text-xs leading-relaxed text-ink-600 dark:text-ink-300 sm:text-sm">{i.kaks.note}</p>
        </div>
      </section>
    </Container>
  );
}
