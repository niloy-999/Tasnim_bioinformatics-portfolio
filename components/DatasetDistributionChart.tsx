"use client";

import { Database, ShieldCheck, PieChart, Layers } from "lucide-react";
import { thesis } from "@/content/thesis";

export default function DatasetDistributionChart() {
  const d = thesis.dataset;

  return (
    <div className="rounded-2xl border border-line/80 bg-white/75 p-5 shadow-sm backdrop-blur-md dark:border-line-dark/80 dark:bg-slate-900/60 sm:p-6">

      {/* Header */}
      <div className="flex flex-col gap-2 pb-4 border-b border-line/70 dark:border-line-dark/70 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-bio-emerald/15 text-bio-emerald dark:bg-emerald-500/20 dark:text-emerald-400">
              <PieChart size={14} />
            </span>
            <h3 className="font-serif text-base font-bold text-ink-900 dark:text-ink-100 sm:text-lg">
              Cluster-Aware Dataset Distribution & Class Balance
            </h3>
          </div>
          <p className="mt-1 text-xs text-ink-500 dark:text-ink-400">
            Total 1,501 curated non-redundant DNA-protein pairs across non-overlapping CD-HIT clusters (60% identity).
          </p>
        </div>

        <div className="flex items-center gap-3 font-mono text-[11px]">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-cyan-400" />
            <span className="text-ink-700 dark:text-ink-200">Positive (Plastic-Active)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-slate-400 dark:bg-slate-600" />
            <span className="text-ink-700 dark:text-ink-200">Negative (Control)</span>
          </div>
        </div>
      </div>

      {/* 3 Dataset Partition Rows */}
      <div className="mt-5 space-y-4">
        {d.splits.map((s) => {
          const posPct = ((s.positive / s.total) * 100).toFixed(1);
          const negPct = ((s.negative / s.total) * 100).toFixed(1);

          return (
            <div
              key={s.split}
              className="rounded-xl border border-line/60 bg-paper/40 p-3.5 dark:border-line-dark/60 dark:bg-slate-800/30"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs pb-2">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-sm font-bold text-ink-900 dark:text-ink-100">
                    {s.split} Partition
                  </span>
                  <span className="rounded-md bg-paper px-2 py-0.5 font-mono text-[10px] text-ink-500 dark:bg-slate-800 dark:text-ink-400">
                    {s.total} samples ({s.clusters} clusters)
                  </span>
                </div>

                <div className="flex items-center gap-3 font-mono text-[11px]">
                  <span className="text-bio-cyan dark:text-cyan-400 font-semibold">
                    {s.positive} Pos ({posPct}%)
                  </span>
                  <span className="text-ink-400">·</span>
                  <span className="text-ink-600 dark:text-ink-300 font-semibold">
                    {s.negative} Neg ({negPct}%)
                  </span>
                </div>
              </div>

              {/* Stacked Percentage Bar */}
              <div className="flex h-6 w-full overflow-hidden rounded-lg border border-line/60 bg-white/70 dark:border-line-dark/60 dark:bg-slate-900/60 font-mono text-[10px] font-bold">
                <div
                  className="flex items-center justify-center bg-gradient-to-r from-cyan-500 to-teal-400 text-slate-950 transition-all duration-500"
                  style={{ width: `${posPct}%` }}
                >
                  {posPct}% Pos
                </div>
                <div
                  className="flex items-center justify-center bg-slate-300 text-slate-700 dark:bg-slate-700 dark:text-slate-200 transition-all duration-500"
                  style={{ width: `${negPct}%` }}
                >
                  {negPct}% Neg
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Homology Leakage Verification Callout */}
      <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-3.5 text-xs text-ink-700 dark:border-emerald-500/20 dark:bg-emerald-950/20 dark:text-ink-200">
        <ShieldCheck size={16} className="mt-0.5 text-emerald-500 shrink-0" />
        <p className="text-justify leading-relaxed">
          <strong>Zero Homology Leakage Guarantee:</strong> Pairwise CD-HIT cluster overlap confirmed exactly <strong>0 shared clusters</strong> between train, validation, and test splits (615 / 140 / 157 unique clusters), ensuring the test set measures true generalizability to unseen enzyme families rather than trivial memorization of close homologs.
        </p>
      </div>

    </div>
  );
}
