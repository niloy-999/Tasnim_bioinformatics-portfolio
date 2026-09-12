export interface Stat {
  value: string;
  label: string;
}

export default function StatGrid({ stats }: { stats: Stat[] }) {
  return (
    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded border border-line bg-line dark:border-line-dark dark:bg-line-dark sm:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label} className="bg-paper px-4 py-5 dark:bg-paper-dark">
          <dt className="text-xs text-ink-500 dark:text-ink-400">{s.label}</dt>
          <dd className="mt-1 font-mono text-xl font-semibold text-ink-900 dark:text-ink-100">
            {s.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
