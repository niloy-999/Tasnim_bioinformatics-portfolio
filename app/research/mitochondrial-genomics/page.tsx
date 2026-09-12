import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import StatGrid from "@/components/StatGrid";
import Figure from "@/components/Figure";
import { bfri } from "@/content/bfri";

export const metadata: Metadata = {
  title: "Mitochondrial Genomics Showcase",
  description: "Complete mitochondrial genome analysis of Tor tor and Tenualosa ilisha: architecture, codon usage, tRNA structure, and selection analysis."
};

export default function MitoPage() {
  const m = bfri.mitogenomics;
  const t = m.tortor;
  const i = m.ilisha;

  return (
    <Container className="py-14">
      <SectionHeading
        eyebrow="Research · Mitochondrial Genomics"
        title={m.title}
        description={m.objective}
      />

      <p className="mt-4 text-sm text-ink-500 dark:text-ink-400">{m.dataCollection}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {m.tools.map((tool) => (
          <span key={tool} className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[11px] text-ink-500 dark:border-line-dark dark:text-ink-400">
            {tool}
          </span>
        ))}
      </div>

      {/* Tor tor section */}
      <section className="mt-14 border-t border-line pt-10 dark:border-line-dark">
        <h2 className="font-serif text-2xl font-semibold text-ink-900 dark:text-ink-100">
          Tor tor mitogenome
        </h2>
        <p className="mt-1 font-mono text-sm text-ink-500 dark:text-ink-400">
          NCBI accession {t.accession}
        </p>

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

        <p className="prose-body mt-6 max-w-prose text-sm">{t.genes}. {t.pcgSpan}.</p>

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
          <div className="border border-line p-5 text-sm dark:border-line-dark">
            <h3 className="font-medium text-ink-900 dark:text-ink-100">Codon usage (RSCU)</h3>
            <p className="mt-2 text-ink-600 dark:text-ink-300">{t.rscu}</p>
          </div>
          <div className="border border-line p-5 text-sm dark:border-line-dark">
            <h3 className="font-medium text-ink-900 dark:text-ink-100">tRNA secondary structure</h3>
            <p className="mt-2 text-ink-600 dark:text-ink-300">{t.trnaStructure}</p>
          </div>
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

        <div className="mt-8 border border-line p-5 text-sm dark:border-line-dark">
          <h3 className="font-medium text-ink-900 dark:text-ink-100">Selection analysis (Ka/Ks)</h3>
          <p className="mt-2 text-ink-600 dark:text-ink-300">{t.kaks.note}</p>
          <div className="mt-3 flex flex-wrap gap-6 text-ink-700 dark:text-ink-200">
            <span>Most relaxed constraint: <span className="font-mono">{t.kaks.mostRelaxed}</span></span>
            <span>Most conserved: <span className="font-mono">{t.kaks.mostConserved}</span></span>
          </div>
        </div>
      </section>

      {/* Ilisha section */}
      <section className="mt-16 border-t border-line pt-10 dark:border-line-dark">
        <h2 className="font-serif text-2xl font-semibold text-ink-900 dark:text-ink-100">
          Tenualosa ilisha mitogenome
        </h2>
        <p className="mt-1 font-mono text-sm text-ink-500 dark:text-ink-400">
          NCBI accession {i.accession}
        </p>

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

        <div className="mt-8 border border-line p-5 text-sm dark:border-line-dark">
          <h3 className="font-medium text-ink-900 dark:text-ink-100">Selection analysis (Ka/Ks)</h3>
          <p className="mt-2 text-ink-600 dark:text-ink-300">{i.kaks.note}</p>
        </div>
      </section>

      <p className="mt-12 border-t border-line pt-6 text-xs text-ink-400 dark:border-line-dark dark:text-ink-500">
        Figures reproduced from the BFRI internship report and associated analysis notebooks.
        Manuscripts on this work are currently under review or in revision — see{" "}
        <a href="/publications" className="underline hover:text-amber-600">Publications</a>.
      </p>
    </Container>
  );
}
