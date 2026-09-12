"use client";

import { CheckCircle2, AlertTriangle, ShieldCheck } from "lucide-react";

export default function ConfusionMatrix({
  tn,
  fp,
  fn,
  tp
}: {
  tn: number;
  fp: number;
  fn: number;
  tp: number;
}) {
  const total = tn + fp + fn + tp;
  const accuracy = ((tp + tn) / total) * 100;
  const precision = (tp / (tp + fp)) * 100;
  const recall = (tp / (tp + fn)) * 100;
  const specificity = (tn / (tn + fp)) * 100;

  return (
    <div className="flex flex-col gap-5">
      {/* 2x2 Matrix */}
      <div className="grid grid-cols-[auto,1fr,1fr] gap-2.5 text-xs font-mono">
        {/* Top Left Empty */}
        <div />
        <div className="rounded-lg bg-paper py-1.5 text-center font-bold text-ink-700 dark:bg-slate-800/80 dark:text-ink-200">
          Pred: Negative (0)
        </div>
        <div className="rounded-lg bg-paper py-1.5 text-center font-bold text-ink-700 dark:bg-slate-800/80 dark:text-ink-200">
          Pred: Positive (1)
        </div>

        {/* Row 1: Actual Negative */}
        <div className="flex items-center justify-center rounded-lg bg-paper px-2 text-center font-bold text-ink-700 dark:bg-slate-800/80 dark:text-ink-200" style={{ writingMode: "vertical-rl" }}>
          Actual: Neg (0)
        </div>

        {/* TN Cell */}
        <div className="flex aspect-square flex-col items-center justify-center rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-center shadow-[0_0_15px_rgba(16,185,129,0.1)] transition-all hover:scale-[1.02] dark:border-emerald-500/40 dark:bg-emerald-950/40">
          <span className="font-serif text-2xl sm:text-3xl font-bold text-emerald-600 dark:text-emerald-400">
            {tn}
          </span>
          <span className="mt-1 font-mono text-xs font-bold text-emerald-700 dark:text-emerald-300">
            True Negative (TN)
          </span>
          <span className="mt-0.5 text-[10px] text-ink-500 dark:text-ink-400">
            {((tn / total) * 100).toFixed(1)}% of test set
          </span>
        </div>

        {/* FP Cell */}
        <div className="flex aspect-square flex-col items-center justify-center rounded-xl border border-rose-500/30 bg-rose-500/5 p-4 text-center transition-all hover:scale-[1.02] dark:border-rose-500/30 dark:bg-rose-950/20">
          <span className="font-serif text-2xl sm:text-3xl font-bold text-rose-500 dark:text-rose-400">
            {fp}
          </span>
          <span className="mt-1 font-mono text-xs font-bold text-rose-600 dark:text-rose-300">
            False Positive (FP)
          </span>
          <span className="mt-0.5 text-[10px] text-ink-500 dark:text-ink-400">
            {((fp / total) * 100).toFixed(1)}% error
          </span>
        </div>

        {/* Row 2: Actual Positive */}
        <div className="flex items-center justify-center rounded-lg bg-paper px-2 text-center font-bold text-ink-700 dark:bg-slate-800/80 dark:text-ink-200" style={{ writingMode: "vertical-rl" }}>
          Actual: Pos (1)
        </div>

        {/* FN Cell */}
        <div className="flex aspect-square flex-col items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-center transition-all hover:scale-[1.02] dark:border-amber-500/30 dark:bg-amber-950/20">
          <span className="font-serif text-2xl sm:text-3xl font-bold text-amber-500 dark:text-amber-400">
            {fn}
          </span>
          <span className="mt-1 font-mono text-xs font-bold text-amber-600 dark:text-amber-300">
            False Negative (FN)
          </span>
          <span className="mt-0.5 text-[10px] text-ink-500 dark:text-ink-400">
            {((fn / total) * 100).toFixed(1)}% error
          </span>
        </div>

        {/* TP Cell */}
        <div className="flex aspect-square flex-col items-center justify-center rounded-xl border border-bio-cyan/50 bg-bio-cyan/10 p-4 text-center shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-all hover:scale-[1.02] dark:border-cyan-500/40 dark:bg-cyan-950/40">
          <span className="font-serif text-2xl sm:text-3xl font-bold text-bio-cyan dark:text-cyan-300">
            {tp}
          </span>
          <span className="mt-1 font-mono text-xs font-bold text-bio-cyan dark:text-cyan-300">
            True Positive (TP)
          </span>
          <span className="mt-0.5 text-[10px] text-ink-500 dark:text-ink-400">
            {((tp / total) * 100).toFixed(1)}% of test set
          </span>
        </div>
      </div>

      {/* Derived Metric Pills */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 font-mono text-xs">
        <div className="rounded-lg border border-line bg-paper/60 p-2.5 dark:border-line-dark dark:bg-slate-800/50">
          <span className="text-[10px] text-ink-500">PRECISION</span>
          <p className="text-sm font-bold text-bio-cyan dark:text-cyan-300">{precision.toFixed(2)}%</p>
          <span className="text-[9px] text-ink-400">TP / (TP + FP)</span>
        </div>

        <div className="rounded-lg border border-line bg-paper/60 p-2.5 dark:border-line-dark dark:bg-slate-800/50">
          <span className="text-[10px] text-ink-500">RECALL</span>
          <p className="text-sm font-bold text-bio-emerald dark:text-emerald-300">{recall.toFixed(2)}%</p>
          <span className="text-[9px] text-ink-400">TP / (TP + FN)</span>
        </div>

        <div className="rounded-lg border border-line bg-paper/60 p-2.5 dark:border-line-dark dark:bg-slate-800/50">
          <span className="text-[10px] text-ink-500">SPECIFICITY</span>
          <p className="text-sm font-bold text-ink-800 dark:text-ink-100">{specificity.toFixed(2)}%</p>
          <span className="text-[9px] text-ink-400">TN / (TN + FP)</span>
        </div>

        <div className="rounded-lg border border-line bg-paper/60 p-2.5 dark:border-line-dark dark:bg-slate-800/50">
          <span className="text-[10px] text-ink-500">ACCURACY</span>
          <p className="text-sm font-bold text-purple-600 dark:text-purple-300">{accuracy.toFixed(2)}%</p>
          <span className="text-[9px] text-ink-400">(TP + TN) / Total</span>
        </div>
      </div>

      {/* Laboratory Interpretation */}
      <div className="rounded-xl border border-bio-cyan/20 bg-bio-cyan/5 p-3 text-xs text-ink-700 dark:border-cyan-500/20 dark:bg-cyan-950/20 dark:text-ink-300">
        <p className="text-justify leading-relaxed">
          <strong>Laboratory Significance:</strong> High Precision (<strong>91.89%</strong>) with only <strong>6 False Positives</strong> ensures that candidate genes flagged by the pipeline have a ~92% probability of exhibiting true plastic-degrading enzymatic activity, saving substantial wet-lab validation costs.
        </p>
      </div>

    </div>
  );
}
