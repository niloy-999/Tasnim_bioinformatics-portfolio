"use client";

import { useState } from "react";
import { Dna, Cpu, Award, Sparkles } from "lucide-react";
import { thesis } from "@/content/thesis";

type MetricKey = "rocAuc" | "prAuc" | "f1" | "mcc" | "accuracy";

const metricLabels: Record<MetricKey, { name: string; desc: string }> = {
  rocAuc: { name: "ROC-AUC", desc: "Area Under Receiver Operating Characteristic" },
  prAuc: { name: "PR-AUC", desc: "Precision-Recall Area Under Curve" },
  f1: { name: "F1-Score", desc: "Harmonic mean of precision and recall" },
  mcc: { name: "MCC", desc: "Matthews Correlation Coefficient (-1 to +1)" },
  accuracy: { name: "Accuracy", desc: "Overall classification accuracy" }
};

export default function EncoderSelectionChart() {
  const [selectedMetric, setSelectedMetric] = useState<MetricKey>("rocAuc");

  const dnaModels = thesis.encoderSelection.dna;
  const proteinModels = thesis.encoderSelection.protein;

  const getMetricValue = (model: typeof dnaModels[0], metric: MetricKey) => {
    return model[metric];
  };

  return (
    <div className="rounded-2xl border border-line/80 bg-white/75 p-5 shadow-sm backdrop-blur-md dark:border-line-dark/80 dark:bg-slate-900/60 sm:p-6">

      {/* Metric Switcher Header */}
      <div className="flex flex-col gap-3 pb-5 border-b border-line/70 dark:border-line-dark/70 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-bio-cyan/15 text-bio-cyan dark:bg-cyan-500/20 dark:text-cyan-400">
              <Sparkles size={14} />
            </span>
            <h3 className="font-serif text-base font-bold text-ink-900 dark:text-ink-100 sm:text-lg">
              Foundation Model Benchmark Comparison
            </h3>
          </div>
          <p className="mt-1 text-xs text-ink-500 dark:text-ink-400">
            {metricLabels[selectedMetric].desc} across independent SVM representation probes.
          </p>
        </div>

        {/* Metric Selector Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {(Object.keys(metricLabels) as MetricKey[]).map((m) => (
            <button
              key={m}
              onClick={() => setSelectedMetric(m)}
              className={`rounded-lg px-2.5 py-1 font-mono text-xs font-semibold transition-all ${
                selectedMetric === m
                  ? "bg-bio-cyan text-slate-950 shadow-[0_0_12px_rgba(6,182,212,0.4)]"
                  : "border border-line bg-paper text-ink-600 hover:border-bio-cyan/50 dark:border-line-dark dark:bg-slate-800/80 dark:text-ink-300 dark:hover:border-cyan-400"
              }`}
            >
              {metricLabels[m].name}
            </button>
          ))}
        </div>
      </div>

      {/* Two Column Grid: DNA Encoders vs Protein Encoders */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">

        {/* DNA Encoders */}
        <div className="rounded-xl border border-line/60 bg-paper/50 p-4 dark:border-line-dark/60 dark:bg-slate-800/40">
          <div className="flex items-center justify-between pb-3">
            <div className="flex items-center gap-2">
              <Dna size={16} className="text-bio-cyan" />
              <h4 className="font-serif text-sm font-bold text-ink-900 dark:text-ink-100">
                DNA Foundation Models
              </h4>
            </div>
            <span className="rounded bg-bio-cyan/15 px-2 py-0.5 font-mono text-[10px] font-bold text-bio-cyan dark:bg-cyan-500/20 dark:text-cyan-300">
              DNABERT-2 Selected
            </span>
          </div>

          <div className="mt-3 space-y-3">
            {dnaModels.map((m, idx) => {
              const val = getMetricValue(m, selectedMetric);
              const isWinner = m.model === "DNABERT-2";
              const pct = (val / 1.0) * 100;

              return (
                <div key={m.model} className="group">
                  <div className="flex items-center justify-between text-xs pb-1">
                    <div className="flex items-center gap-1.5 font-medium text-ink-800 dark:text-ink-200">
                      <span className="font-mono text-[10px] text-ink-400">#{idx + 1}</span>
                      <span>{m.model}</span>
                      {isWinner && (
                        <Award size={13} className="text-amber-500 inline shrink-0" />
                      )}
                    </div>
                    <span className="font-mono text-xs font-bold text-ink-900 dark:text-cyan-300">
                      {val.toFixed(3)}
                    </span>
                  </div>

                  <div className="relative h-7 w-full overflow-hidden rounded-lg border border-line/60 bg-white/70 dark:border-line-dark/60 dark:bg-slate-900/60">
                    <div
                      className={`h-full rounded-md transition-all duration-500 ease-out flex items-center justify-end pr-2 ${
                        isWinner
                          ? "bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 shadow-[0_0_12px_rgba(6,182,212,0.35)]"
                          : "bg-slate-300 dark:bg-slate-700"
                      }`}
                      style={{ width: `${pct}%` }}
                    >
                      <span className={`font-mono text-[10px] font-bold ${isWinner ? "text-slate-950" : "text-white"}`}>
                        {(val * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Protein Encoders */}
        <div className="rounded-xl border border-line/60 bg-paper/50 p-4 dark:border-line-dark/60 dark:bg-slate-800/40">
          <div className="flex items-center justify-between pb-3">
            <div className="flex items-center gap-2">
              <Cpu size={16} className="text-bio-emerald" />
              <h4 className="font-serif text-sm font-bold text-ink-900 dark:text-ink-100">
                Protein Foundation Models
              </h4>
            </div>
            <span className="rounded bg-bio-emerald/15 px-2 py-0.5 font-mono text-[10px] font-bold text-bio-emerald dark:bg-emerald-500/20 dark:text-emerald-300">
              ESM-2 Selected
            </span>
          </div>

          <div className="mt-3 space-y-3">
            {proteinModels.map((m, idx) => {
              const val = getMetricValue(m, selectedMetric);
              const isWinner = m.model === "ESM-2";
              const pct = (val / 1.0) * 100;

              return (
                <div key={m.model} className="group">
                  <div className="flex items-center justify-between text-xs pb-1">
                    <div className="flex items-center gap-1.5 font-medium text-ink-800 dark:text-ink-200">
                      <span className="font-mono text-[10px] text-ink-400">#{idx + 1}</span>
                      <span>{m.model}</span>
                      {isWinner && (
                        <Award size={13} className="text-amber-500 inline shrink-0" />
                      )}
                    </div>
                    <span className="font-mono text-xs font-bold text-ink-900 dark:text-emerald-300">
                      {val.toFixed(3)}
                    </span>
                  </div>

                  <div className="relative h-7 w-full overflow-hidden rounded-lg border border-line/60 bg-white/70 dark:border-line-dark/60 dark:bg-slate-900/60">
                    <div
                      className={`h-full rounded-md transition-all duration-500 ease-out flex items-center justify-end pr-2 ${
                        isWinner
                          ? "bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 shadow-[0_0_12px_rgba(16,185,129,0.35)]"
                          : "bg-slate-300 dark:bg-slate-700"
                      }`}
                      style={{ width: `${pct}%` }}
                    >
                      <span className={`font-mono text-[10px] font-bold ${isWinner ? "text-slate-950" : "text-white"}`}>
                        {(val * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Benchmark Summary Callout */}
      <div className="mt-5 rounded-xl border border-bio-cyan/30 bg-bio-cyan/5 p-3.5 text-xs text-ink-700 dark:border-cyan-500/20 dark:bg-cyan-950/30 dark:text-ink-200">
        <p className="text-justify leading-relaxed">
          <strong>Key Empirical Finding:</strong> DNABERT-2 (0.955 ROC-AUC) and ESM-2 (0.956 ROC-AUC) established statistically superior representation quality compared to HyenaDNA, NTv2, ProtT5, and Ankh on independent representation probing, justifying their selection as the core foundation encoders for cross-modal alignment.
        </p>
      </div>

    </div>
  );
}
