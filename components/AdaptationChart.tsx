"use client";

import { useState } from "react";
import { Sliders, Cpu, Dna, AlertTriangle, CheckCircle } from "lucide-react";
import { thesis } from "@/content/thesis";

export default function AdaptationChart() {
  const [encoder, setEncoder] = useState<"dnabert2" | "esm2">("dnabert2");

  const dnabertData = thesis.adaptation.dnabert2;
  const esmData = thesis.adaptation.esm2;

  return (
    <div className="rounded-2xl border border-line/80 bg-white/75 p-5 shadow-sm backdrop-blur-md dark:border-line-dark/80 dark:bg-slate-900/60 sm:p-6">

      {/* Header and Toggle */}
      <div className="flex flex-col gap-3 pb-5 border-b border-line/70 dark:border-line-dark/70 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-purple-500/15 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400">
              <Sliders size={14} />
            </span>
            <h3 className="font-serif text-base font-bold text-ink-900 dark:text-ink-100 sm:text-lg">
              Parameter-Efficient Adaptation Strategies
            </h3>
          </div>
          <p className="mt-1 text-xs text-ink-500 dark:text-ink-400">
            Comparing Frozen, Partial Fine-Tuning, Full Fine-Tuning, LoRA, and (IA)³ parameter efficiency.
          </p>
        </div>

        {/* Encoder Switcher */}
        <div className="flex items-center gap-1.5 rounded-xl border border-line bg-paper p-1 dark:border-line-dark dark:bg-slate-800">
          <button
            onClick={() => setEncoder("dnabert2")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1 font-mono text-xs font-semibold transition-all ${
              encoder === "dnabert2"
                ? "bg-bio-cyan text-slate-950 shadow-sm"
                : "text-ink-600 hover:text-ink-900 dark:text-ink-300 dark:hover:text-white"
            }`}
          >
            <Dna size={12} />
            DNABERT-2
          </button>
          <button
            onClick={() => setEncoder("esm2")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1 font-mono text-xs font-semibold transition-all ${
              encoder === "esm2"
                ? "bg-bio-emerald text-slate-950 shadow-sm"
                : "text-ink-600 hover:text-ink-900 dark:text-ink-300 dark:hover:text-white"
            }`}
          >
            <Cpu size={12} />
            ESM-2
          </button>
        </div>
      </div>

      {/* Critical Insight Banner */}
      <div className="mt-4 rounded-xl border border-purple-500/30 bg-purple-500/5 p-3.5 text-xs text-ink-700 dark:border-purple-500/20 dark:bg-purple-950/20 dark:text-ink-200">
        <div className="flex items-start gap-2">
          <CheckCircle size={15} className="mt-0.5 text-purple-600 dark:text-purple-400 shrink-0" />
          <p className="text-justify leading-relaxed">
            <strong>Key Finding:</strong> Partial fine-tuning achieved the best trade-off for both encoders. For DNABERT-2, full fine-tuning (100% params) underperformed partial fine-tuning (24.31% params) across every single metric (F1 0.7451 vs 0.7853), demonstrating that updating all weights risks catastrophic forgetting on specialized biological corpora.
          </p>
        </div>
      </div>

      {/* Strategy Table & Visual Bar Grid */}
      <div className="mt-6 space-y-3.5">
        {encoder === "dnabert2" ? (
          dnabertData.map((item) => {
            const isBest = item.strategy === "Partial fine-tuning";
            const f1Pct = (item.valF1 / 1.0) * 100;
            const paramPct = item.trainablePct !== null ? item.trainablePct : 0.5;

            return (
              <div
                key={item.strategy}
                className={`rounded-xl border p-4 transition-all ${
                  isBest
                    ? "border-bio-cyan/60 bg-bio-cyan/10 shadow-[0_0_15px_rgba(6,182,212,0.15)] dark:border-cyan-500/50 dark:bg-cyan-950/30"
                    : "border-line/60 bg-paper/50 dark:border-line-dark/60 dark:bg-slate-800/30"
                }`}
              >
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between text-xs pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-sm font-bold text-ink-900 dark:text-ink-100">
                      {item.strategy}
                    </span>
                    {isBest && (
                      <span className="rounded bg-bio-cyan/20 px-2 py-0.5 font-mono text-[10px] font-bold text-bio-cyan dark:text-cyan-300">
                        Selected Optimal
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 font-mono text-xs">
                    <span className="text-ink-500">
                      Trainable Params: <strong className="text-ink-800 dark:text-ink-200">{item.trainablePct !== null ? `${item.trainablePct}%` : "PEFT (<1%)"}</strong>
                    </span>
                    <span className="text-ink-500">
                      Val F1: <strong className="text-bio-cyan dark:text-cyan-300 font-bold">{item.valF1.toFixed(4)}</strong>
                    </span>
                  </div>
                </div>

                {/* Dual Bars: F1 (Cyan) vs Trainable Params (Slate/Indigo) */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center gap-2 text-[11px]">
                    <span className="w-16 font-mono text-ink-500">Val F1</span>
                    <div className="relative h-5 flex-1 overflow-hidden rounded-md border border-line/60 bg-white/70 dark:border-line-dark/60 dark:bg-slate-900/60">
                      <div
                        className={`h-full rounded-md transition-all duration-500 flex items-center justify-end pr-2 font-mono text-[10px] font-bold ${
                          isBest
                            ? "bg-gradient-to-r from-cyan-500 to-teal-400 text-slate-950"
                            : "bg-slate-400 dark:bg-slate-600 text-white"
                        }`}
                        style={{ width: `${f1Pct}%` }}
                      >
                        {(item.valF1 * 100).toFixed(1)}%
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[11px]">
                    <span className="w-16 font-mono text-ink-500">Params %</span>
                    <div className="relative h-3 flex-1 overflow-hidden rounded-md border border-line/40 bg-white/50 dark:border-line-dark/40 dark:bg-slate-900/40">
                      <div
                        className="h-full rounded-md bg-purple-500/70 dark:bg-purple-400/70"
                        style={{ width: `${Math.min(100, Math.max(2, paramPct))}%` }}
                      />
                    </div>
                    <span className="font-mono text-[10px] text-ink-500 w-12 text-right">
                      {item.trainablePct !== null ? `${item.trainablePct}%` : "<1%"}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          esmData.map((item) => {
            const isBest = item.strategy === "Partial fine-tuning";
            const f1Pct = (item.valF1 / 1.0) * 100;
            const paramPct = item.trainablePct !== null ? item.trainablePct : 0.5;

            return (
              <div
                key={item.strategy}
                className={`rounded-xl border p-4 transition-all ${
                  isBest
                    ? "border-bio-emerald/60 bg-bio-emerald/10 shadow-[0_0_15px_rgba(16,185,129,0.15)] dark:border-emerald-500/50 dark:bg-emerald-950/30"
                    : "border-line/60 bg-paper/50 dark:border-line-dark/60 dark:bg-slate-800/30"
                }`}
              >
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between text-xs pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-sm font-bold text-ink-900 dark:text-ink-100">
                      {item.strategy}
                    </span>
                    {isBest && (
                      <span className="rounded bg-bio-emerald/20 px-2 py-0.5 font-mono text-[10px] font-bold text-bio-emerald dark:text-emerald-300">
                        Selected Optimal
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 font-mono text-xs">
                    <span className="text-ink-500">
                      Trainable Params: <strong className="text-ink-800 dark:text-ink-200">{item.trainablePct !== null ? `${item.trainablePct}%` : "PEFT (<1%)"}</strong>
                    </span>
                    <span className="text-ink-500">
                      Val F1: <strong className="text-bio-emerald dark:text-emerald-300 font-bold">{item.valF1.toFixed(3)}</strong>
                    </span>
                  </div>
                </div>

                {/* Dual Bars */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center gap-2 text-[11px]">
                    <span className="w-16 font-mono text-ink-500">Val F1</span>
                    <div className="relative h-5 flex-1 overflow-hidden rounded-md border border-line/60 bg-white/70 dark:border-line-dark/60 dark:bg-slate-900/60">
                      <div
                        className={`h-full rounded-md transition-all duration-500 flex items-center justify-end pr-2 font-mono text-[10px] font-bold ${
                          isBest
                            ? "bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950"
                            : "bg-slate-400 dark:bg-slate-600 text-white"
                        }`}
                        style={{ width: `${f1Pct}%` }}
                      >
                        {(item.valF1 * 100).toFixed(1)}%
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[11px]">
                    <span className="w-16 font-mono text-ink-500">Params %</span>
                    <div className="relative h-3 flex-1 overflow-hidden rounded-md border border-line/40 bg-white/50 dark:border-line-dark/40 dark:bg-slate-900/40">
                      <div
                        className="h-full rounded-md bg-purple-500/70 dark:bg-purple-400/70"
                        style={{ width: `${Math.min(100, Math.max(2, paramPct))}%` }}
                      />
                    </div>
                    <span className="font-mono text-[10px] text-ink-500 w-12 text-right">
                      {item.trainablePct !== null ? `${item.trainablePct}%` : "<1%"}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
