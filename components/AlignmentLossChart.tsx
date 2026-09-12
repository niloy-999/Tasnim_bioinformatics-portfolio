"use client";

import { useState } from "react";
import { Activity, Zap, CheckCircle2 } from "lucide-react";
import { thesis } from "@/content/thesis";

const epochData = [
  { epoch: 0, loss: 1.546, cosine: 0.182 },
  { epoch: 2, loss: 1.210, cosine: 0.315 },
  { epoch: 4, loss: 0.945, cosine: 0.428 },
  { epoch: 6, loss: 0.780, cosine: 0.512 },
  { epoch: 8, loss: 0.642, cosine: 0.575 },
  { epoch: 10, loss: 0.528, cosine: 0.612 },
  { epoch: 12, loss: 0.441, cosine: 0.638 },
  { epoch: 14, loss: 0.375, cosine: 0.651 },
  { epoch: 16, loss: 0.325, cosine: 0.660 },
  { epoch: 18, loss: 0.292, cosine: 0.665 },
  { epoch: 19, loss: 0.280, cosine: 0.668 }
];

export default function AlignmentLossChart() {
  const [activeEpoch, setActiveEpoch] = useState<number>(19);
  const al = thesis.alignment;

  const width = 600;
  const height = 220;
  const padding = { top: 25, right: 35, bottom: 35, left: 45 };

  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;

  // X scale: 0 to 19
  const getX = (epoch: number) => padding.left + (epoch / 19) * innerWidth;
  // Y scale for Loss: 0 to 1.8
  const getY = (loss: number) => padding.top + innerHeight - (loss / 1.8) * innerHeight;
  // Y scale for Cosine: 0 to 1.0
  const getCosineY = (cos: number) => padding.top + innerHeight - cos * innerHeight;

  // Build SVG path for Loss
  const points = epochData.map((d) => `${getX(d.epoch)},${getY(d.loss)}`).join(" ");
  const areaPoints = `${getX(0)},${padding.top + innerHeight} ${points} ${getX(19)},${padding.top + innerHeight}`;

  // Build SVG path for Cosine
  const cosinePoints = epochData.map((d) => `${getX(d.epoch)},${getCosineY(d.cosine)}`).join(" ");

  const currentData = epochData.find((d) => d.epoch === activeEpoch) || epochData[epochData.length - 1];

  return (
    <div className="rounded-2xl border border-line/80 bg-white/75 p-5 shadow-sm backdrop-blur-md dark:border-line-dark/80 dark:bg-slate-900/60 sm:p-6">

      {/* Header */}
      <div className="flex flex-col gap-2 pb-4 border-b border-line/70 dark:border-line-dark/70 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-bio-cyan/15 text-bio-cyan dark:bg-cyan-500/20 dark:text-cyan-400">
              <Activity size={14} />
            </span>
            <h3 className="font-serif text-base font-bold text-ink-900 dark:text-ink-100 sm:text-lg">
              InfoNCE Contrastive Alignment Dynamics
            </h3>
          </div>
          <p className="mt-1 text-xs text-ink-500 dark:text-ink-400">
            Symmetric InfoNCE loss reduction and positive cosine similarity convergence across 20 training epochs.
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 font-mono text-[11px]">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
            <span className="text-ink-700 dark:text-ink-200">InfoNCE Loss</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            <span className="text-ink-700 dark:text-ink-200">Cosine Sim</span>
          </div>
        </div>
      </div>

      {/* 3 Key Stats Badges */}
      <div className="mt-4 grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-line/60 bg-paper/50 p-3 dark:border-line-dark/60 dark:bg-slate-800/40">
          <span className="font-mono text-[10px] text-ink-500 dark:text-ink-400">LOSS REDUCTION</span>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="font-mono text-base font-bold text-ink-900 dark:text-white">
              {al.trainingLossInitial} → {al.trainingLossFinal}
            </span>
            <span className="rounded bg-emerald-500/15 px-1 py-0.2 font-mono text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
              -81.9%
            </span>
          </div>
        </div>

        <div className="rounded-xl border border-line/60 bg-paper/50 p-3 dark:border-line-dark/60 dark:bg-slate-800/40">
          <span className="font-mono text-[10px] text-ink-500 dark:text-ink-400">VAL COSINE AT BEST</span>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="font-mono text-base font-bold text-bio-cyan dark:text-cyan-300">
              {al.meanPositiveCosineAtBest}
            </span>
            <span className="font-mono text-[10px] text-ink-500">
              (Epoch {al.bestEpoch})
            </span>
          </div>
        </div>

        <div className="rounded-xl border border-line/60 bg-paper/50 p-3 dark:border-line-dark/60 dark:bg-slate-800/40">
          <span className="font-mono text-[10px] text-ink-500 dark:text-ink-400">MAX COSINE SIMILARITY</span>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="font-mono text-base font-bold text-bio-emerald dark:text-emerald-300">
              {al.meanPositiveCosineMax}
            </span>
            <span className="font-mono text-[10px] text-ink-500">peak</span>
          </div>
        </div>
      </div>

      {/* SVG Chart */}
      <div className="mt-4 overflow-hidden rounded-xl border border-line/60 bg-paper/30 p-2 dark:border-line-dark/60 dark:bg-slate-950/40">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="h-auto w-full overflow-visible"
        >
          <defs>
            <linearGradient id="lossGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="cosineGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 0.5, 1.0, 1.5].map((gridVal) => (
            <g key={gridVal}>
              <line
                x1={padding.left}
                y1={getY(gridVal)}
                x2={width - padding.right}
                y2={getY(gridVal)}
                stroke="currentColor"
                className="text-line/40 dark:text-line-dark/40"
                strokeDasharray="3 3"
              />
              <text
                x={padding.left - 8}
                y={getY(gridVal) + 4}
                textAnchor="end"
                className="fill-ink-400 font-mono text-[10px]"
              >
                {gridVal.toFixed(1)}
              </text>
            </g>
          ))}

          {/* X Axis Labels */}
          {[0, 5, 10, 15, 19].map((ep) => (
            <text
              key={ep}
              x={getX(ep)}
              y={height - 12}
              textAnchor="middle"
              className="fill-ink-400 font-mono text-[10px]"
            >
              Ep {ep}
            </text>
          ))}

          {/* Area beneath loss curve */}
          <polygon points={areaPoints} fill="url(#lossGradient)" />

          {/* Line for Loss */}
          <polyline
            fill="none"
            stroke="#06B6D4"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={points}
          />

          {/* Line for Cosine Similarity */}
          <polyline
            fill="none"
            stroke="#10B981"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={cosinePoints}
          />

          {/* Interactive Data Nodes */}
          {epochData.map((d) => (
            <g key={d.epoch}>
              <circle
                cx={getX(d.epoch)}
                y={getY(d.loss)}
                r={activeEpoch === d.epoch ? "5.5" : "3.5"}
                className="cursor-pointer transition-all fill-cyan-400 stroke-slate-900"
                strokeWidth="2"
                onMouseEnter={() => setActiveEpoch(d.epoch)}
              />
              <circle
                cx={getX(d.epoch)}
                y={getCosineY(d.cosine)}
                r={activeEpoch === d.epoch ? "5.5" : "3.5"}
                className="cursor-pointer transition-all fill-emerald-400 stroke-slate-900"
                strokeWidth="2"
                onMouseEnter={() => setActiveEpoch(d.epoch)}
              />
            </g>
          ))}
        </svg>
      </div>

      {/* Active Epoch Data Callout */}
      <div className="mt-3 flex items-center justify-between font-mono text-xs rounded-lg bg-paper p-2.5 dark:bg-slate-800/80">
        <span className="text-ink-600 dark:text-ink-300">
          Selected Epoch: <strong className="text-ink-900 dark:text-white">{currentData.epoch}</strong>
        </span>
        <div className="flex items-center gap-4">
          <span className="text-cyan-600 dark:text-cyan-400">
            Loss: <strong>{currentData.loss.toFixed(3)}</strong>
          </span>
          <span className="text-emerald-600 dark:text-emerald-400">
            Cosine Sim: <strong>{currentData.cosine.toFixed(3)}</strong>
          </span>
        </div>
      </div>

    </div>
  );
}
