import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import StatGrid from "@/components/StatGrid";
import BarChart from "@/components/BarChart";
import ConfusionMatrix from "@/components/ConfusionMatrix";
import ArchitectureDiagram from "@/components/ArchitectureDiagram";
import Figure from "@/components/Figure";
import StatusBadge from "@/components/StatusBadge";
import { thesis } from "@/content/thesis";

export const metadata: Metadata = {
  title: "Thesis",
  description: thesis.title
};

export default function ThesisPage() {
  const t = thesis;

  return (
    <Container className="py-14">
      <div className="flex flex-wrap items-center gap-2">
        <StatusBadge status="Research-use" />
        <span className="text-xs text-ink-400 dark:text-ink-500">{t.date} · {t.course}</span>
      </div>
      <h1 className="mt-3 max-w-3xl font-serif text-3xl font-semibold leading-tight text-ink-900 dark:text-ink-100 sm:text-4xl">
        {t.title}
      </h1>
      <p className="mt-3 text-sm text-ink-500 dark:text-ink-400">{t.institution}</p>
      <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">{t.authorNote}</p>
      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm text-ink-600 dark:text-ink-300">
        {t.supervisors.map((s) => (
          <span key={s.name}>{s.name} — {s.role}</span>
        ))}
      </div>

      {/* Research question */}
      <section className="mt-10">
        <SectionHeading eyebrow="Research Question" title="What we set out to answer" />
        <p className="prose-body mt-4 max-w-prose text-base">{t.researchQuestion}</p>
      </section>

      {/* Motivation */}
      <section className="mt-12 border-t border-line pt-10 dark:border-line-dark">
        <SectionHeading eyebrow="Motivation" title="Why this matters" />
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {t.motivation.map((m) => (
            <li key={m} className="border border-line p-4 text-sm text-ink-600 dark:border-line-dark dark:text-ink-300">
              {m}
            </li>
          ))}
        </ul>
      </section>

      {/* Biological challenge */}
      <section className="mt-12 border-t border-line pt-10 dark:border-line-dark">
        <SectionHeading eyebrow="Biological Challenge" title="Why this is hard computationally" />
        <p className="prose-body mt-4 max-w-prose">{t.biologicalChallenge}</p>
      </section>

      {/* Dataset */}
      <section className="mt-12 border-t border-line pt-10 dark:border-line-dark">
        <SectionHeading eyebrow="Dataset Construction" title="A cluster-aware, leakage-controlled dataset" />
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="border border-line p-5 text-sm dark:border-line-dark">
            <h3 className="font-medium text-ink-900 dark:text-ink-100">Sources</h3>
            <p className="mt-2 text-ink-600 dark:text-ink-300">Positive: {t.dataset.positiveSource}</p>
            <p className="mt-2 text-ink-600 dark:text-ink-300">Negative: {t.dataset.negativeSource}</p>
            <p className="mt-2 text-ink-600 dark:text-ink-300">CDS: {t.dataset.cdsSource}</p>
          </div>
          <div className="border border-line p-5 text-sm dark:border-line-dark">
            <h3 className="font-medium text-ink-900 dark:text-ink-100">Redundancy control</h3>
            <p className="mt-2 text-ink-600 dark:text-ink-300">{t.dataset.redundancyReduction}</p>
            <p className="mt-3 text-ink-600 dark:text-ink-300">{t.dataset.leakageCheck}</p>
          </div>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="data-table min-w-[480px]">
            <thead>
              <tr>
                <th>Split</th>
                <th>Total</th>
                <th>Positive</th>
                <th>Negative</th>
                <th>Protein clusters</th>
              </tr>
            </thead>
            <tbody>
              {t.dataset.splits.map((s) => (
                <tr key={s.split}>
                  <td className="font-sans font-medium">{s.split}</td>
                  <td>{s.total}</td>
                  <td>{s.positive}</td>
                  <td>{s.negative}</td>
                  <td>{s.clusters}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-ink-400 dark:text-ink-500">
          Sequence length: CDS {t.dataset.cdsLength}; protein {t.dataset.proteinLength}.
        </p>
      </section>

      {/* Architecture */}
      <section className="mt-12 border-t border-line pt-10 dark:border-line-dark">
        <SectionHeading eyebrow="Model Architecture" title="DNA-centric cross-modal learning" />
        <p className="prose-body mt-4 max-w-prose text-sm">
          DNA and protein sequences are encoded separately, projected into a shared 512-dimensional
          space, and related through bidirectional cross-attention. Crucially, the final
          representation used for classification is pooled only from the DNA side — protein
          information shapes that representation during training but isn&apos;t required at inference.
        </p>
        <div className="mt-6">
          <ArchitectureDiagram />
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 text-sm">
          <div className="border border-line p-5 dark:border-line-dark">
            <h3 className="font-medium text-ink-900 dark:text-ink-100">Encoders</h3>
            <p className="mt-2 text-ink-600 dark:text-ink-300">DNA: {t.architecture.dnaEncoder}</p>
            <p className="mt-2 text-ink-600 dark:text-ink-300">Protein: {t.architecture.proteinEncoder}</p>
          </div>
          <div className="border border-line p-5 dark:border-line-dark">
            <h3 className="font-medium text-ink-900 dark:text-ink-100">Alignment & attention</h3>
            <p className="mt-2 text-ink-600 dark:text-ink-300">{t.architecture.alignment}</p>
            <p className="mt-2 text-ink-600 dark:text-ink-300">{t.architecture.crossAttention}</p>
          </div>
        </div>

        <div className="mt-6 border border-amber-500/40 bg-amber-100/40 p-5 text-sm dark:bg-amber-900/10">
          <p className="font-medium text-ink-900 dark:text-amber-200">Training vs. inference</p>
          <p className="mt-2 text-ink-700 dark:text-ink-200">{t.architecture.inferenceProperty}</p>
        </div>
      </section>

      {/* Encoder selection */}
      <section className="mt-12 border-t border-line pt-10 dark:border-line-dark">
        <SectionHeading eyebrow="Foundation Model Selection" title="Choosing DNABERT-2 and ESM-2" />
        <p className="mt-3 text-sm text-ink-500 dark:text-ink-400">{t.encoderSelection.note}</p>

        <div className="mt-6 grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="text-sm font-medium text-ink-900 dark:text-ink-100">DNA encoders (test ROC-AUC)</h3>
            <div className="mt-3">
              <BarChart
                max={1}
                bars={t.encoderSelection.dna.map((d) => ({
                  label: d.model,
                  value: d.rocAuc,
                  highlight: d.model === "DNABERT-2"
                }))}
              />
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-ink-900 dark:text-ink-100">Protein encoders (test ROC-AUC)</h3>
            <div className="mt-3">
              <BarChart
                max={1}
                bars={t.encoderSelection.protein.map((d) => ({
                  label: d.model,
                  value: d.rocAuc,
                  highlight: d.model === "ESM-2"
                }))}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Adaptation strategies */}
      <section className="mt-12 border-t border-line pt-10 dark:border-line-dark">
        <SectionHeading eyebrow="Adaptation Strategy" title="Frozen vs. fine-tuned representations" />
        <p className="mt-3 max-w-prose text-sm text-ink-600 dark:text-ink-300">{t.adaptation.conclusion}</p>
        <div className="mt-6 overflow-x-auto">
          <table className="data-table min-w-[520px]">
            <thead>
              <tr><th>DNABERT-2 adaptation</th><th>Trainable %</th><th>Val F1</th><th>Val MCC</th></tr>
            </thead>
            <tbody>
              {t.adaptation.dnabert2.map((r) => (
                <tr key={r.strategy}>
                  <td className="font-sans">{r.strategy}</td>
                  <td>{r.trainablePct !== null ? `${r.trainablePct}%` : "—"}</td>
                  <td>{r.valF1}</td>
                  <td>{r.valMcc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Model comparison / progression */}
      <section className="mt-12 border-t border-line pt-10 dark:border-line-dark">
        <SectionHeading eyebrow="Model Comparison" title="From unimodal baselines to the selected model" />
        <div className="mt-6">
          <BarChart
            max={1}
            valueFormat={(v) => v.toFixed(3)}
            bars={t.crossModalProgression.map((m) => ({
              label: m.model,
              value: m.f1,
              highlight: m.model.includes("CM-5")
            }))}
          />
        </div>
        <p className="mt-3 text-xs text-ink-400 dark:text-ink-500">
          Validation F1-score shown across progressively integrated configurations. CM-5 (DNA-centric,
          selected) achieves the strongest DNA-based prediction while ESM-2 alone remains the strongest
          unimodal baseline overall — consistent with the framework&apos;s goal of improving DNA-only
          inference rather than beating a protein-only model.
        </p>
      </section>

      {/* Final test results */}
      <section className="mt-12 border-t border-line pt-10 dark:border-line-dark">
        <SectionHeading eyebrow="Evaluation" title="Final held-out test performance" />
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

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="text-sm font-medium text-ink-900 dark:text-ink-100">Confusion matrix (test set, n=223)</h3>
            <div className="mt-3">
              <ConfusionMatrix {...t.finalTest.confusionMatrix} />
            </div>
          </div>
          <Figure
            src="/figures/thesis-cross-attention-heatmap.png"
            alt="DNA-to-protein cross-attention heatmap"
            caption="Learned DNA-to-protein cross-attention map (CM-3), showing the model attends to localized token positions rather than relying only on globally pooled representations."
            source="Thesis, Fig. 5.18"
          />
        </div>

        <p className="prose-body mt-6 max-w-prose text-sm">
          Precision (0.919) exceeds recall (0.829) on the held-out test set, meaning the final model
          is conservative about flagging a sequence as plastic-degrading — it misses some true
          positives rather than over-calling negatives as positives. Global DNA–protein alignment
          reached a best mean positive cosine similarity of {t.alignment.meanPositiveCosineAtBest} at
          epoch {t.alignment.bestEpoch}.
        </p>
      </section>

      {/* Limitations & future work */}
      <section className="mt-12 border-t border-line pt-10 dark:border-line-dark">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="font-serif text-lg font-semibold text-ink-900 dark:text-ink-100">Limitations</h2>
            <ul className="mt-3 space-y-2 text-sm text-ink-600 dark:text-ink-300">
              {t.limitations.map((l) => (
                <li key={l} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-400" />
                  {l}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-serif text-lg font-semibold text-ink-900 dark:text-ink-100">Future Work</h2>
            <ul className="mt-3 space-y-2 text-sm text-ink-600 dark:text-ink-300">
              {t.futureWork.map((l) => (
                <li key={l} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                  {l}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Reproducibility */}
      <section className="mt-12 border-t border-line pt-10 dark:border-line-dark">
        <h2 className="font-serif text-lg font-semibold text-ink-900 dark:text-ink-100">Reproducibility</h2>
        <p className="mt-2 max-w-prose text-sm text-ink-600 dark:text-ink-300">
          Environment: PyTorch 2.11.0+cu128, CUDA 12.8, Transformers 4.38.2, PEFT 0.10.0, scikit-learn
          1.7.2, trained on an NVIDIA RTX 5090 (31.35 GB). {t.githubNote}
        </p>
      </section>
    </Container>
  );
}
