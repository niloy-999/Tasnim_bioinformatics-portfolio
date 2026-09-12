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
  const max = Math.max(tn, fp, fn, tp);
  const cellStyle = (v: number, correct: boolean) => {
    const intensity = 0.15 + 0.65 * (v / max);
    return {
      backgroundColor: correct
        ? `rgba(192,138,46,${intensity})`
        : `rgba(28,58,94,${intensity * 0.6})`
    };
  };

  const cells = [
    { label: "True Negative", v: tn, correct: true },
    { label: "False Positive", v: fp, correct: false },
    { label: "False Negative", v: fn, correct: false },
    { label: "True Positive", v: tp, correct: true }
  ];

  return (
    <div className="max-w-sm">
      <div className="grid grid-cols-[auto,1fr,1fr] gap-1 text-xs">
        <div />
        <div className="pb-1 text-center text-ink-500 dark:text-ink-400">Predicted 0</div>
        <div className="pb-1 text-center text-ink-500 dark:text-ink-400">Predicted 1</div>

        <div className="flex items-center justify-center pr-1 text-ink-500 dark:text-ink-400" style={{ writingMode: "vertical-rl" }}>
          Actual 0
        </div>
        <div
          className="flex aspect-square flex-col items-center justify-center border border-line text-ink-900 dark:border-line-dark dark:text-ink-100"
          style={cellStyle(cells[0].v, cells[0].correct)}
        >
          <span className="font-mono text-lg font-semibold">{tn}</span>
          <span className="text-[10px] text-ink-500 dark:text-ink-400">TN</span>
        </div>
        <div
          className="flex aspect-square flex-col items-center justify-center border border-line text-ink-900 dark:border-line-dark dark:text-ink-100"
          style={cellStyle(cells[1].v, cells[1].correct)}
        >
          <span className="font-mono text-lg font-semibold">{fp}</span>
          <span className="text-[10px] text-ink-500 dark:text-ink-400">FP</span>
        </div>

        <div className="flex items-center justify-center pr-1 text-ink-500 dark:text-ink-400" style={{ writingMode: "vertical-rl" }}>
          Actual 1
        </div>
        <div
          className="flex aspect-square flex-col items-center justify-center border border-line text-ink-900 dark:border-line-dark dark:text-ink-100"
          style={cellStyle(cells[2].v, cells[2].correct)}
        >
          <span className="font-mono text-lg font-semibold">{fn}</span>
          <span className="text-[10px] text-ink-500 dark:text-ink-400">FN</span>
        </div>
        <div
          className="flex aspect-square flex-col items-center justify-center border border-line text-ink-900 dark:border-line-dark dark:text-ink-100"
          style={cellStyle(cells[3].v, cells[3].correct)}
        >
          <span className="font-mono text-lg font-semibold">{tp}</span>
          <span className="text-[10px] text-ink-500 dark:text-ink-400">TP</span>
        </div>
      </div>
    </div>
  );
}
