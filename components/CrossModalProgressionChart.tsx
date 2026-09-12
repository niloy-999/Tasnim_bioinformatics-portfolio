"use client";

import { useState } from "react";
import { TrendingUp, Layers, CheckCircle2, ArrowRight } from "lucide-react";
import { thesis } from "@/content/thesis";

type MetricKey = "f1" | "accuracy" | "mcc";

const metricInfo: Record<MetricKey, { name: string; max: number }> = {
  f1: { name: "F1-Score", max: 1.0 },
  accuracy: { name: "Accuracy", max: 1.0 },
  mcc: { name: "MCC", max: 1.0 }
};

export default function CrossModalProgressionChart() {
  const [metric, setMetric] = useState<MetricKey>("f1");
  const models = thesis.crossModalProgression;

  const dnaBaseline = models[0][metric];
  const selectedModel = models[models.length - 1][metric];
  const deltaPct = ((selectedModel - dnaBaseline) * 100).toFixed(2);

  const getModalityColor = (modality: string) => {
    switch (modality) {
      case "DNA":
        return "border-sky-500/40 bg-sky-500/10 text-sky-700 dark:text-sky-300";
      case "Protein":
        return "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300";
      case "DNA + Protein":
        return "border-purple-500/40 bg-purple-500/10 text-purple-700 dark:text-purple-300";
      case "DNA-centric":
        return "border-bio-cyan/60 bg-bio-cyan/15 text-bio-cyan dark:text-cyan-300 font-bold shadow-[0_0_10px_rgba(6,182,212,0.3)]";
      default:
        return "border-line bg-paper text-ink-600";
    }
  };

  return (
    <div className="rounded-2xl border border-line/80 bg-white/75 p-5 shadow-sm backdrop-blur-md dark:border-line-dark/80 dark:bg-slate-900/60 sm:p-6">

      {/* Header and Controls */}
      <div className="flex flex-col gap-3 pb-5 border-b border-line/70 dark:border-line-dark/70 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-bio-cyan/15 text-bio-cyan dark:bg-cyan-500/20 dark:text-cyan-400">
              <TrendingUp size={14} />
            </span>
            <h3 className="font-serif text-base font-bold text-ink-900 dark:text-ink-100 sm:text-lg">
              Cross-Modal Framework Ablation Progression
            </h3>
          </div>
          <p className="mt-1 text-xs text-ink-500 dark:text-ink-400">
            Performance gain achieved by distilling protein sequence context into the DNA representation.
          </p>
        </div>

        {/* Metric Switcher */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto">
          {(Object.keys(metricInfo) as MetricKey[]).map((m) => (
            <button
              key={m}
              onClick={() => setMetric(m)}
              className={`rounded-lg px-3 py-1 font-mono text-xs font-semibold transition-all ${
                metric === m
                  ? "bg-bio-cyan text-slate-950 shadow-[0_0_12px_rgba(6,182,212,0.4)]"
                  : "border border-line bg-paper text-ink-600 hover:border-bio-cyan/50 dark:border-line-dark dark:bg-slate-800/80 dark:text-ink-300 dark:hover:border-cyan-400"
              }`}
            >
              {metricInfo[m].name}
            </button>
          ))}
        </div>
      </div>

      {/* Gain Highlight Pill */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-bio-cyan/30 bg-bio-cyan/5 px-4 py-3 text-xs text-ink-700 dark:border-cyan-500/20 dark:bg-cyan-950/30 dark:text-ink-200">
        <div className="flex items-center gap-2">
          <CheckCircle2 size={16} className="text-bio-cyan shrink-0" />
          <span>
            Selected Architecture <strong>CM-5</strong> achieves an absolute gain of{" "}
            <strong className="text-bio-cyan dark:text-cyan-300">+{deltaPct}% {metricInfo[metric].name}</strong> over the unimodal DNA baseline.
          </span>
        </div>
        <span className="font-mono text-[11px] font-semibold text-bio-cyan dark:text-cyan-300">
          Inference Modality: DNA Only
        </span>
      </div>

      {/* Progression Bar List */}
      <div className="mt-6 space-y-4">
        {models.map((item, idx) => {
          const val = item[metric];
          const isSelected = item.model.includes("CM-5");
          const isDnaBase = item.model.includes("DNABERT-2 only");
          const pct = (val / 1.0) * 100;

          return (
            <div
              key={item.model}
              className={`rounded-xl border p-3.5 transition-all ${
                isSelected
                  ? "border-bio-cyan/60 bg-bio-cyan/10 shadow-[0_0_20px_rgba(6,182,212,0.15)] dark:border-cyan-500/50 dark:bg-cyan-950/40"
                  : "border-line/60 bg-paper/40 dark:border-line-dark/60 dark:bg-slate-800/30"
              }`}
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-semibold text-ink-400 dark:text-ink-500">
                    Step {idx + 1}
                  </span>
                  <span className="font-serif text-sm font-bold text-ink-900 dark:text-ink-100">
                    {item.model}
                  </span>
                  <span className={`rounded-full border px-2 py-0.5 font-mono text-[10px] ${getModalityColor(item.modality)}`}>
                    {item.modality}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {isSelected && (
                    <span className="rounded bg-bio-cyan/20 px-2 py-0.5 font-mono text-[10px] font-bold text-bio-cyan dark:text-cyan-300">
                      SELECTED FINAL ARCHITECTURE
                    </span>
                  )}
                  <span className="font-mono text-sm font-bold text-ink-900 dark:text-cyan-300">
                    {val.toFixed(4)}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative mt-2.5 h-6 w-full overflow-hidden rounded-lg border border-line/60 bg-white/70 dark:border-line-dark/60 dark:bg-slate-900/60">
                <div
                  className={`h-full rounded-md transition-all duration-500 ease-out flex items-center justify-end pr-2 ${
                    isSelected
                      ? "bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                      : isDnaBase
                      ? "bg-gradient-to-r from-sky-400 to-blue-500"
                      : "bg-slate-400 dark:bg-slate-600"
                  }`}
                  style={{ width: `${pct}%` }}
                >
                  <span className={`font-mono text-[10px] font-bold ${isSelected ? "text-slate-950" : "text-white"}`}>
                    {(val * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
