interface Bar {
  label: string;
  value: number;
  highlight?: boolean;
}

export default function BarChart({
  bars,
  max = 1,
  valueFormat = (v: number) => v.toFixed(3),
  height = 28
}: {
  bars: Bar[];
  max?: number;
  valueFormat?: (v: number) => string;
  height?: number;
}) {
  return (
    <div className="space-y-2">
      {bars.map((b) => {
        const pct = Math.max(0, Math.min(100, (b.value / max) * 100));
        return (
          <div key={b.label} className="flex items-center gap-3">
            <div className="w-40 shrink-0 text-right text-xs text-ink-600 dark:text-ink-300 sm:w-48">
              {b.label}
            </div>
            <div
              className="relative flex-1 bg-ink-100 dark:bg-ink-800"
              style={{ height }}
            >
              <div
                className={`h-full ${b.highlight ? "bg-amber-500" : "bg-ink-500 dark:bg-ink-400"}`}
                style={{ width: `${pct}%` }}
              />
            </div>
            <div className="w-14 shrink-0 font-mono text-xs text-ink-700 dark:text-ink-200">
              {valueFormat(b.value)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
