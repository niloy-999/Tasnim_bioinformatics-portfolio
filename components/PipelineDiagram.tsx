interface Step {
  step: string;
  tool?: string;
  detail?: string;
}

export default function PipelineDiagram({ steps }: { steps: Step[] }) {
  return (
    <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {steps.map((s, i) => (
        <li
          key={s.step}
          className="relative border border-line bg-paper p-4 dark:border-line-dark dark:bg-paper-dark"
        >
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-xs text-amber-600 dark:text-amber-400">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="font-medium text-ink-900 dark:text-ink-100">{s.step}</span>
          </div>
          {s.tool && (
            <p className="mt-1 font-mono text-xs text-ink-500 dark:text-ink-400">{s.tool}</p>
          )}
          {s.detail && (
            <p className="mt-2 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
              {s.detail}
            </p>
          )}
        </li>
      ))}
    </ol>
  );
}
