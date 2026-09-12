"use client";

interface Bar {
  label: string;
  value: number;
  highlight?: boolean;
  sublabel?: string;
}

export default function BarChart({
  bars,
  max = 1,
  valueFormat = (v: number) => v.toFixed(3),
  height = 32
}: {
  bars: Bar[];
  max?: number;
  valueFormat?: (v: number) => string;
  height?: number;
}) {
  return (
    <div className="space-y-3">
      {bars.map((b) => {
        const pct = Math.max(0, Math.min(100, (b.value / max) * 100));
        return (
          <div key={b.label} className="group flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
            <div className="w-full text-xs font-medium text-ink-700 dark:text-ink-200 sm:w-44 sm:shrink-0 sm:text-right">
              <span>{b.label}</span>
              {b.sublabel && (
                <span className="ml-1 text-[10px] text-ink-400 dark:text-ink-500">({b.sublabel})</span>
              )}
            </div>

            <div className="relative flex-1 overflow-hidden rounded-lg bg-paper border border-line/60 dark:border-line-dark/60 dark:bg-slate-800/80" style={{ height }}>
              <div
                className={`h-full rounded-md transition-all duration-500 ease-out flex items-center justify-end pr-2 ${
                  b.highlight
                    ? "bg-gradient-to-r from-bio-cyan via-teal-400 to-bio-emerald shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                    : "bg-gradient-to-r from-slate-400 to-slate-500/80 dark:from-slate-700 dark:to-slate-600"
                }`}
                style={{ width: `${pct}%` }}
              >
                {pct > 25 && (
                  <span className={`font-mono text-[11px] font-bold ${b.highlight ? "text-slate-950" : "text-white"}`}>
                    {valueFormat(b.value)}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between sm:w-16 sm:shrink-0 sm:justify-end">
              {pct <= 25 && (
                <span className="font-mono text-xs font-bold text-ink-800 dark:text-ink-200">
                  {valueFormat(b.value)}
                </span>
              )}
              {b.highlight && (
                <span className="ml-2 rounded bg-bio-cyan/15 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-bio-cyan dark:bg-cyan-500/20 dark:text-cyan-300">
                  Best
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
