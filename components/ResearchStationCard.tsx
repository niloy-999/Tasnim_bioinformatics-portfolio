"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Terminal,
  Dna,
  Cpu,
  Activity,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Copy,
  Check,
  Layers,
  Database,
  ExternalLink
} from "lucide-react";

type HubTab = "cross-modal" | "wgs-bfri" | "mitogenomics";

export default function ResearchStationCard() {
  const [activeTab, setActiveTab] = useState<HubTab>("cross-modal");
  const [copied, setCopied] = useState(false);

  const copySnippet = (snippet: string) => {
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tabs = [
    { id: "cross-modal" as HubTab, label: "AI & Foundation Models", icon: Cpu, badge: "Undergraduate Thesis" },
    { id: "wgs-bfri" as HubTab, label: "Whole Genome WGS", icon: Database, badge: "BFRI Project" },
    { id: "mitogenomics" as HubTab, label: "Mitogenomics", icon: Dna, badge: "Manuscript Under Review" }
  ];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-line/90 bg-white/95 p-5 shadow-2xl backdrop-blur-2xl transition-all duration-300 hover:border-bio-cyan/50 hover:shadow-glow dark:border-cyan-500/30 dark:bg-slate-900/95 dark:shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(6,182,212,0.15)] sm:p-6">

      {/* High-Tech Terminal Top Bar */}
      <div className="flex items-center justify-between border-b border-line/80 pb-3.5 dark:border-line-dark/80">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="ml-2 font-mono text-[11px] font-semibold text-ink-600 dark:text-cyan-300">
            tasnim@bio-hub: ~/research-telemetry
          </span>
        </div>

        <div className="flex items-center gap-1.5 font-mono text-[10px] text-ink-400 dark:text-cyan-400/80">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-bio-cyan opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-bio-cyan"></span>
          </span>
          <span>GPU: RTX 5090</span>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="mt-4 flex flex-wrap items-center gap-1.5 rounded-xl border border-line/70 bg-paper/80 p-1 dark:border-line-dark/70 dark:bg-slate-800/80">
        {tabs.map((t) => {
          const Icon = t.icon;
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-1.5 px-2 text-center font-mono text-xs font-semibold transition-all ${
                isActive
                  ? "bg-white text-ink-900 shadow-sm dark:bg-bio-cyan dark:text-slate-950"
                  : "text-ink-600 hover:text-ink-900 dark:text-ink-300 dark:hover:text-white"
              }`}
            >
              <Icon size={13} className={isActive ? "text-bio-cyan dark:text-slate-950" : "text-ink-400"} />
              <span className="truncate">{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Tab Panel 1: Cross-Modal Deep Learning */}
      {activeTab === "cross-modal" && (
        <div className="mt-4 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="rounded bg-bio-cyan/15 px-2 py-0.5 font-mono text-[10px] font-bold text-bio-cyan dark:bg-cyan-500/20 dark:text-cyan-300">
                DNA-PROTEIN CROSS-MODAL FRAMEWORK
              </span>
              <h3 className="mt-1.5 font-serif text-base font-bold text-ink-900 dark:text-white sm:text-lg">
                Contrastive Representation Alignment (InfoNCE)
              </h3>
            </div>
            <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
              91.03% Test Acc
            </span>
          </div>

          <p className="text-justify text-xs leading-relaxed text-ink-600 dark:text-ink-300">
            Aligns DNABERT-2 (768-d) genomic representations with ESM-2 (1280-d) protein foundation embeddings via 8-head cross-attention for bacterial plastic-degrading gene discovery.
          </p>

          {/* Telemetry Metrics Grid */}
          <div className="grid grid-cols-3 gap-2 font-mono text-xs">
            <div className="rounded-lg border border-line/60 bg-paper/60 p-2 text-center dark:border-line-dark/60 dark:bg-slate-800/50">
              <span className="text-[10px] text-ink-400">F1-SCORE</span>
              <p className="font-bold text-bio-cyan dark:text-cyan-300">0.8718</p>
            </div>
            <div className="rounded-lg border border-line/60 bg-paper/60 p-2 text-center dark:border-line-dark/60 dark:bg-slate-800/50">
              <span className="text-[10px] text-ink-400">ROC-AUC</span>
              <p className="font-bold text-bio-emerald dark:text-emerald-300">0.9680</p>
            </div>
            <div className="rounded-lg border border-line/60 bg-paper/60 p-2 text-center dark:border-line-dark/60 dark:bg-slate-800/50">
              <span className="text-[10px] text-ink-400">PRECISION</span>
              <p className="font-bold text-amber-500 dark:text-amber-300">91.89%</p>
            </div>
          </div>

          {/* Interactive Code Snippet Box */}
          <div className="relative rounded-xl border border-line/70 bg-ink-900 p-3 font-mono text-xs text-slate-200">
            <div className="flex items-center justify-between pb-1.5 text-[10px] text-cyan-400">
              <span>INFERENCE SCRIPT (DNA-ONLY)</span>
              <button
                onClick={() => copySnippet("python predict_plastic_genes.py --input genome.fasta --model CM-5 --threshold 0.85")}
                className="flex items-center gap-1 text-slate-300 hover:text-white"
              >
                {copied ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                <span>{copied ? "Copied!" : "Copy"}</span>
              </button>
            </div>
            <p className="truncate text-cyan-200/90 text-[11px]">
              $ python predict_plastic_genes.py --model CM-5 --threshold 0.85
            </p>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="font-mono text-[11px] text-ink-400 dark:text-ink-500">
              Status: Journal Paper in Prep
            </span>
            <Link
              href="/thesis"
              className="btn-primary inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold"
            >
              Explore Thesis Data <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      )}

      {/* Active Tab Panel 2: Whole Genome Sequencing (BFRI) */}
      {activeTab === "wgs-bfri" && (
        <div className="mt-4 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="rounded bg-bio-emerald/15 px-2 py-0.5 font-mono text-[10px] font-bold text-bio-emerald dark:bg-emerald-500/20 dark:text-emerald-300">
                BFRI NATIONAL GENOMICS PROJECT
              </span>
              <h3 className="mt-1.5 font-serif text-base font-bold text-ink-900 dark:text-white sm:text-lg">
                Tor tor Reference-Guided WGS Assembly
              </h3>
            </div>
            <span className="font-mono text-xs font-bold text-bio-emerald dark:text-emerald-400">
              868.2 Mb
            </span>
          </div>

          <p className="text-justify text-xs leading-relaxed text-ink-600 dark:text-ink-300">
            Comprehensive reference-guided scaffold assembly, repeat masking, variant calling, and functional KEGG/GO pathway annotation for the endangered mahseer (Tor tor).
          </p>

          {/* Telemetry Metrics Grid */}
          <div className="grid grid-cols-3 gap-2 font-mono text-xs">
            <div className="rounded-lg border border-line/60 bg-paper/60 p-2 text-center dark:border-line-dark/60 dark:bg-slate-800/50">
              <span className="text-[10px] text-ink-400">BUSCO SCORE</span>
              <p className="font-bold text-bio-emerald dark:text-emerald-300">93.4%</p>
            </div>
            <div className="rounded-lg border border-line/60 bg-paper/60 p-2 text-center dark:border-line-dark/60 dark:bg-slate-800/50">
              <span className="text-[10px] text-ink-400">GENES CODED</span>
              <p className="font-bold text-bio-cyan dark:text-cyan-300">48,169</p>
            </div>
            <div className="rounded-lg border border-line/60 bg-paper/60 p-2 text-center dark:border-line-dark/60 dark:bg-slate-800/50">
              <span className="text-[10px] text-ink-400">VARIANTS</span>
              <p className="font-bold text-amber-500 dark:text-amber-300">4.12M SNPs</p>
            </div>
          </div>

          {/* Pipeline Stage visual box */}
          <div className="rounded-xl border border-line/70 bg-ink-900 p-3 font-mono text-xs text-slate-200">
            <div className="flex items-center justify-between pb-1.5 text-[10px] text-emerald-400">
              <span>ACTIVE ASSEMBLY PIPELINE</span>
              <span>Illumina NovaSeq 6000</span>
            </div>
            <p className="text-emerald-200/90 text-[11px]">
              FastQC → Trimmomatic → BWA-MEM → GATK HaplotypeCaller → SnpEff
            </p>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="font-mono text-[11px] text-ink-400 dark:text-ink-500">
              Funded by: BFRI (Govt. of Bangladesh)
            </span>
            <Link
              href="/research/bfri"
              className="btn-primary inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold"
            >
              View WGS Case Study <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      )}

      {/* Active Tab Panel 3: Mitochondrial Genomics */}
      {activeTab === "mitogenomics" && (
        <div className="mt-4 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="rounded bg-purple-500/15 px-2 py-0.5 font-mono text-[10px] font-bold text-purple-600 dark:bg-purple-500/20 dark:text-purple-300">
                EVOLUTIONARY GENOMICS
              </span>
              <h3 className="mt-1.5 font-serif text-base font-bold text-ink-900 dark:text-white sm:text-lg">
                Hilsa Shad Mitogenomics & Phylogeny
              </h3>
            </div>
            <span className="font-mono text-xs font-bold text-bio-cyan dark:text-cyan-400">
              16,589 bp
            </span>
          </div>

          <p className="text-justify text-xs leading-relaxed text-ink-600 dark:text-ink-300">
            Full circular mitogenome architecture, codon usage bias (RSCU), tRNA secondary cloverleaf structures, and Bayesian phylogenetic reconstruction across Indo-Pacific clades.
          </p>

          {/* Telemetry Metrics Grid */}
          <div className="grid grid-cols-3 gap-2 font-mono text-xs">
            <div className="rounded-lg border border-line/60 bg-paper/60 p-2 text-center dark:border-line-dark/60 dark:bg-slate-800/50">
              <span className="text-[10px] text-ink-400">PCGs</span>
              <p className="font-bold text-purple-600 dark:text-purple-300">13 Genes</p>
            </div>
            <div className="rounded-lg border border-line/60 bg-paper/60 p-2 text-center dark:border-line-dark/60 dark:bg-slate-800/50">
              <span className="text-[10px] text-ink-400">tRNA + rRNA</span>
              <p className="font-bold text-bio-cyan dark:text-cyan-300">22 tRNAs / 2</p>
            </div>
            <div className="rounded-lg border border-line/60 bg-paper/60 p-2 text-center dark:border-line-dark/60 dark:bg-slate-800/50">
              <span className="text-[10px] text-ink-400">Ka/Ks STATUS</span>
              <p className="font-bold text-emerald-500 dark:text-emerald-300">&lt; 1 (Purifying)</p>
            </div>
          </div>

          {/* Pipeline Stage visual box */}
          <div className="rounded-xl border border-line/70 bg-ink-900 p-3 font-mono text-xs text-slate-200">
            <div className="flex items-center justify-between pb-1.5 text-[10px] text-purple-400">
              <span>PHYLOGENETIC ENGINE</span>
              <span>MrBayes &amp; IQ-TREE (GTR+G+I)</span>
            </div>
            <p className="text-purple-200/90 text-[11px]">
              1,000 Bootstrap Replicates · 10,000,000 MCMC Generations
            </p>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="font-mono text-[11px] text-ink-400 dark:text-ink-500">
              Status: Manuscript Under Review
            </span>
            <Link
              href="/research/mitochondrial-genomics"
              className="btn-primary inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold"
            >
              View Mitogenome Project <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      )}

    </div>
  );
}
