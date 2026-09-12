import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import StatGrid from "@/components/StatGrid";
import ConfusionMatrix from "@/components/ConfusionMatrix";
import ArchitectureDiagram from "@/components/ArchitectureDiagram";
import EncoderSelectionChart from "@/components/EncoderSelectionChart";
import CrossModalProgressionChart from "@/components/CrossModalProgressionChart";
import AdaptationChart from "@/components/AdaptationChart";
import AlignmentLossChart from "@/components/AlignmentLossChart";
import DatasetDistributionChart from "@/components/DatasetDistributionChart";
import Figure from "@/components/Figure";
import StatusBadge from "@/components/StatusBadge";
import Card3D from "@/components/Card3D";
import { thesis } from "@/content/thesis";
import { Cpu, Database, Network, Activity, Sparkles, Sliders, TrendingUp, BarChart3 } from "lucide-react";

export const metadata: Metadata = {
  title: "Undergraduate Thesis — Cross-Modal Deep Learning for Gene Discovery",
  description: thesis.title
};

export default function ThesisPage() {
  const t = thesis;

  return (
    <Container className="py-12 sm:py-16">
      {/* Header & Meta */}
      <div className="flex flex-wrap items-center gap-2">
        <StatusBadge status="Research-use" />
        <span className="font-mono text-xs text-ink-400 dark:text-cyan-300/80">
          {t.date} · {t.course}
        </span>
      </div>

      <h1 className="mt-3 max-w-4xl font-serif text-2xl font-bold leading-tight text-ink-900 dark:text-ink-100 sm:text-4xl">
        {t.title}
      </h1>

      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-line/80 pb-6 text-xs text-ink-600 dark:border-line-dark/80 dark:text-ink-300 sm:text-sm">
        <span>{t.institution}</span>
        <span>{t.authorNote}</span>
        {t.supervisors.map((s) => (
          <span key={s.name} className="font-medium text-bio-cyan dark:text-cyan-300">
            {s.name} ({s.role})
          </span>
        ))}
      </div>

      {/* 1. Research Question */}
      <section className="mt-10">
        <SectionHeading eyebrow="Research Question" title="What We Set Out to Answer" />
        <div className="mt-4 rounded-2xl border border-line/80 bg-white/75 p-6 shadow-sm backdrop-blur-md dark:border-line-dark/80 dark:bg-slate-900/60 sm:p-7">
          <p className="text-justify text-sm leading-relaxed text-ink-800 dark:text-ink-200 sm:text-base sm:leading-8">
            {t.researchQuestion}
          </p>
        </div>
      </section>

      {/* 2. Motivation */}
      <section className="mt-12 border-t border-line/80 pt-10 dark:border-line-dark/80">
        <SectionHeading eyebrow="Motivation" title="Why This Matters" />
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {t.motivation.map((m, idx) => (
            <li key={m}>
              <Card3D maxTilt={3} className="h-full">
                <div className="flex h-full items-start gap-3 rounded-xl border border-line/80 bg-white/75 p-5 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-bio-cyan/50 hover:shadow-glow dark:border-line-dark/80 dark:bg-slate-900/60">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-bio-cyan/15 font-mono text-xs font-semibold text-bio-cyan dark:bg-cyan-500/20 dark:text-cyan-300">
                    {idx + 1}
                  </span>
                  <p className="text-justify text-xs leading-relaxed text-ink-700 dark:text-ink-200 sm:text-sm">
                    {m}
                  </p>
                </div>
              </Card3D>
            </li>
          ))}
        </ul>
      </section>

      {/* 3. Biological Challenge */}
      <section className="mt-12 border-t border-line/80 pt-10 dark:border-line-dark/80">
        <SectionHeading eyebrow="Biological Challenge" title="Why This Is Hard Computationally" />
        <div className="mt-4 rounded-2xl border border-line/80 bg-white/75 p-6 shadow-sm backdrop-blur-md dark:border-line-dark/80 dark:bg-slate-900/60 sm:p-7">
          <p className="text-justify text-sm leading-relaxed text-ink-800 dark:text-ink-200 sm:text-base sm:leading-8">
            {t.biologicalChallenge}
          </p>
        </div>
      </section>

      {/* 4. Dataset Construction & Visual Distribution Chart */}
      <section className="mt-12 border-t border-line/80 pt-10 dark:border-line-dark/80">
        <SectionHeading eyebrow="Dataset Construction" title="Cluster-Aware, Leakage-Controlled Curation" />

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <Card3D maxTilt={2}>
            <div className="flex h-full flex-col rounded-2xl border border-line/80 bg-white/75 p-6 shadow-sm backdrop-blur-sm dark:border-line-dark/80 dark:bg-slate-900/60">
              <div className="flex items-center gap-2">
                <Database size={16} className="text-bio-cyan dark:text-cyan-400" />
                <h3 className="font-serif text-base font-semibold text-ink-900 dark:text-ink-100">Curation Sources</h3>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-ink-600 dark:text-ink-300"><strong>Positive:</strong> {t.dataset.positiveSource}</p>
              <p className="mt-2 text-xs leading-relaxed text-ink-600 dark:text-ink-300"><strong>Negative:</strong> {t.dataset.negativeSource}</p>
              <p className="mt-2 text-xs leading-relaxed text-ink-600 dark:text-ink-300"><strong>CDS:</strong> {t.dataset.cdsSource}</p>
            </div>
          </Card3D>

          <Card3D maxTilt={2}>
            <div className="flex h-full flex-col rounded-2xl border border-line/80 bg-white/75 p-6 shadow-sm backdrop-blur-sm dark:border-line-dark/80 dark:bg-slate-900/60">
              <div className="flex items-center gap-2">
                <Network size={16} className="text-bio-emerald dark:text-emerald-400" />
                <h3 className="font-serif text-base font-semibold text-ink-900 dark:text-ink-100">Redundancy & Homology Control</h3>
              </div>
              <p className="mt-3 text-justify text-xs leading-relaxed text-ink-600 dark:text-ink-300">{t.dataset.redundancyReduction}</p>
              <p className="mt-2 text-justify text-xs leading-relaxed text-ink-600 dark:text-ink-300">{t.dataset.leakageCheck}</p>
            </div>
          </Card3D>
        </div>

        {/* Dataset Distribution Visual Chart */}
        <div className="mt-6">
          <DatasetDistributionChart />
        </div>

        <p className="mt-3 font-mono text-xs text-ink-400 dark:text-cyan-300/80">
          Sequence length: CDS {t.dataset.cdsLength}; protein {t.dataset.proteinLength}.
        </p>
      </section>

      {/* 5. Architecture */}
      <section className="mt-12 border-t border-line/80 pt-10 dark:border-line-dark/80">
        <SectionHeading eyebrow="Model Architecture" title="DNA-Centric Cross-Modal Learning" />
        <p className="mt-4 max-w-4xl text-justify text-sm leading-relaxed text-ink-700 dark:text-ink-200 sm:text-base sm:leading-7">
          DNA and protein sequences are encoded separately, projected into a shared 512-dimensional
          space, and related through bidirectional cross-attention. Crucially, the final
          representation used for classification is pooled only from the DNA side — protein
          information shapes that representation during training but isn&apos;t required at inference.
        </p>

        <div className="mt-6">
          <ArchitectureDiagram />
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 text-sm">
          <div className="rounded-2xl border border-line/80 bg-white/75 p-6 shadow-sm backdrop-blur-sm dark:border-line-dark/80 dark:bg-slate-900/60">
            <h3 className="font-serif text-base font-semibold text-ink-900 dark:text-ink-100">Encoders</h3>
            <p className="mt-2 text-xs leading-relaxed text-ink-600 dark:text-ink-300"><strong>DNA:</strong> {t.architecture.dnaEncoder}</p>
            <p className="mt-2 text-xs leading-relaxed text-ink-600 dark:text-ink-300"><strong>Protein:</strong> {t.architecture.proteinEncoder}</p>
          </div>
          <div className="rounded-2xl border border-line/80 bg-white/75 p-6 shadow-sm backdrop-blur-sm dark:border-line-dark/80 dark:bg-slate-900/60">
            <h3 className="font-serif text-base font-semibold text-ink-900 dark:text-ink-100">Alignment & Attention</h3>
            <p className="mt-2 text-xs leading-relaxed text-ink-600 dark:text-ink-300">{t.architecture.alignment}</p>
            <p className="mt-2 text-xs leading-relaxed text-ink-600 dark:text-ink-300">{t.architecture.crossAttention}</p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-amber-500/40 bg-amber-500/10 p-5 text-sm dark:border-amber-400/30 dark:bg-amber-950/20">
          <p className="font-medium text-amber-900 dark:text-amber-200">Training vs. Inference Property</p>
          <p className="mt-2 text-justify text-xs leading-relaxed text-ink-700 dark:text-ink-200 sm:text-sm">{t.architecture.inferenceProperty}</p>
        </div>
      </section>

      {/* 6. Foundation Model Selection Interactive Benchmark Chart */}
      <section className="mt-12 border-t border-line/80 pt-10 dark:border-line-dark/80">
        <SectionHeading eyebrow="Foundation Model Selection" title="Empirical Evaluation of DNA & Protein Encoders" />
        <p className="mt-3 text-xs text-ink-500 dark:text-cyan-300/80">{t.encoderSelection.note}</p>

        <div className="mt-6">
          <EncoderSelectionChart />
        </div>
      </section>

      {/* 7. Cross-Modal Framework Ablation Progression Chart */}
      <section className="mt-12 border-t border-line/80 pt-10 dark:border-line-dark/80">
        <SectionHeading eyebrow="Ablation Progression" title="Cross-Modal Performance Evolution" />
        <p className="mt-3 text-justify text-xs text-ink-600 dark:text-ink-300 sm:text-sm">
          Systematic ablation studying the stepwise contribution of InfoNCE contrastive alignment, bidirectional token-level cross-attention, and DNA-centric pooling against unimodal baselines.
        </p>

        <div className="mt-6">
          <CrossModalProgressionChart />
        </div>
      </section>

      {/* 8. Parameter-Efficient Adaptation (PEFT) Strategies Chart */}
      <section className="mt-12 border-t border-line/80 pt-10 dark:border-line-dark/80">
        <SectionHeading eyebrow="Fine-Tuning Dynamics" title="Parameter-Efficient Adaptation Benchmarks" />
        <p className="mt-3 text-justify text-xs text-ink-600 dark:text-ink-300 sm:text-sm">
          Empirical evaluation of parameter update strategies to balance representation plasticity with prevention of catastrophic forgetting across genomic foundation models.
        </p>

        <div className="mt-6">
          <AdaptationChart />
        </div>
      </section>

      {/* 9. InfoNCE Alignment Loss Convergence Curve */}
      <section className="mt-12 border-t border-line/80 pt-10 dark:border-line-dark/80">
        <SectionHeading eyebrow="Contrastive Optimization" title="InfoNCE Loss & Representation Alignment" />
        <p className="mt-3 text-justify text-xs text-ink-600 dark:text-ink-300 sm:text-sm">
          Continuous tracking of symmetric InfoNCE contrastive loss and positive cosine similarity in the shared 512-dimensional embedding space across 20 training epochs.
        </p>

        <div className="mt-6">
          <AlignmentLossChart />
        </div>
      </section>

      {/* 10. Final Test Performance & Confusion Matrix */}
      <section className="mt-12 border-t border-line/80 pt-10 dark:border-line-dark/80">
        <SectionHeading eyebrow="Evaluation" title="Final Held-Out Test Performance" />

        <div className="mt-6">
          <StatGrid
            stats={[
              { value: `${(t.finalTest.accuracy * 100).toFixed(1)}%`, label: "Accuracy" },
              { value: t.finalTest.f1.toFixed(4), label: "F1-score" },
              { value: t.finalTest.rocAuc.toFixed(3), label: "ROC-AUC" },
              { value: t.finalTest.prAuc.toFixed(3), label: "PR-AUC" },
              { value: t.finalTest.mcc.toFixed(4), label: "MCC" },
              { value: t.finalTest.precision.toFixed(3), label: "Precision" },
              { value: t.finalTest.recall.toFixed(3), label: "Recall" },
              { value: t.finalTest.balancedAccuracy.toFixed(3), label: "Balanced accuracy" }
            ]}
          />
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          {/* Upgraded Confusion Matrix */}
          <div className="rounded-2xl border border-line/80 bg-white/75 p-6 shadow-sm backdrop-blur-md dark:border-line-dark/80 dark:bg-slate-900/60">
            <div className="flex items-center justify-between pb-3 border-b border-line/60 dark:border-line-dark/60">
              <h3 className="font-serif text-base font-bold text-ink-900 dark:text-ink-100">
                Held-Out Test Confusion Matrix (n=223)
              </h3>
              <span className="font-mono text-xs text-bio-cyan dark:text-cyan-300">
                Test Partition
              </span>
            </div>
            <div className="mt-5">
              <ConfusionMatrix {...t.finalTest.confusionMatrix} />
            </div>
          </div>

          {/* Attention Heatmap Figure */}
          <div className="rounded-2xl border border-line/80 bg-white/75 p-6 shadow-sm backdrop-blur-md dark:border-line-dark/80 dark:bg-slate-900/60 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-b border-line/60 dark:border-line-dark/60">
              <h3 className="font-serif text-base font-bold text-ink-900 dark:text-ink-100">
                Cross-Attention Map
              </h3>
              <span className="font-mono text-xs text-bio-emerald dark:text-emerald-300">
                Token-Level Attention
              </span>
            </div>
            <div className="mt-4">
              <Figure
                src="/figures/thesis-cross-attention-heatmap.png"
                alt="DNA-to-protein cross-attention heatmap"
                caption="Learned DNA-to-protein cross-attention map (CM-3), showing localized token-level attention rather than uniform pooling."
                source="Thesis, Fig. 5.18"
              />
            </div>
          </div>
        </div>

        <p className="mt-6 text-justify text-sm leading-relaxed text-ink-700 dark:text-ink-200 sm:leading-7">
          Precision (0.919) exceeds recall (0.829) on the held-out test set, meaning the final model
          is conservative about flagging a sequence as plastic-degrading — it misses some true
          positives rather than over-calling negatives as positives. Global DNA–protein alignment
          reached a best mean positive cosine similarity of {t.alignment.meanPositiveCosineAtBest} at
          epoch {t.alignment.bestEpoch}.
        </p>
      </section>

      {/* 11. Limitations & Future Work */}
      <section className="mt-12 border-t border-line/80 pt-10 dark:border-line-dark/80">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-line/80 bg-white/75 p-6 shadow-sm backdrop-blur-sm dark:border-line-dark/80 dark:bg-slate-900/60">
            <h2 className="font-serif text-lg font-semibold text-ink-900 dark:text-ink-100">Limitations</h2>
            <ul className="mt-4 space-y-2.5 text-xs text-ink-600 dark:text-ink-300">
              {t.limitations.map((l) => (
                <li key={l} className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                  <span className="text-justify leading-relaxed">{l}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-line/80 bg-white/75 p-6 shadow-sm backdrop-blur-sm dark:border-line-dark/80 dark:bg-slate-900/60">
            <h2 className="font-serif text-lg font-semibold text-ink-900 dark:text-ink-100">Future Work</h2>
            <ul className="mt-4 space-y-2.5 text-xs text-ink-600 dark:text-ink-300">
              {t.futureWork.map((l) => (
                <li key={l} className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-bio-cyan" />
                  <span className="text-justify leading-relaxed">{l}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 12. Reproducibility */}
      <section className="mt-12 border-t border-line/80 pt-10 dark:border-line-dark/80">
        <div className="rounded-2xl border border-line/80 bg-white/75 p-6 shadow-sm backdrop-blur-md dark:border-line-dark/80 dark:bg-slate-900/60">
          <h2 className="font-serif text-lg font-semibold text-ink-900 dark:text-ink-100">Reproducibility & Compute Environment</h2>
          <p className="mt-3 text-justify text-xs leading-relaxed text-ink-600 dark:text-ink-300 sm:text-sm sm:leading-7">
            Environment: PyTorch 2.11.0+cu128, CUDA 12.8, Transformers 4.38.2, PEFT 0.10.0, scikit-learn
            1.7.2, trained on an NVIDIA RTX 5090 (31.35 GB). {t.githubNote}
          </p>
        </div>
      </section>
    </Container>
  );
}
