const styles: Record<string, string> = {
  "Peer-reviewed": "border-emerald-600/40 text-emerald-700 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/40 dark:border-emerald-500/30",
  "Under review": "border-amber-600/40 text-amber-700 bg-amber-50 dark:text-amber-400 dark:bg-amber-950/40 dark:border-amber-500/30",
  "In revision": "border-amber-600/40 text-amber-700 bg-amber-50 dark:text-amber-400 dark:bg-amber-950/40 dark:border-amber-500/30",
  "In preparation": "border-ink-400/40 text-ink-600 bg-ink-100 dark:text-ink-300 dark:bg-ink-800/60 dark:border-ink-500/30",
  "Research-use": "border-ink-400/40 text-ink-600 bg-ink-100 dark:text-ink-300 dark:bg-ink-800/60 dark:border-ink-500/30",
  Prototype: "border-ink-400/40 text-ink-600 bg-ink-100 dark:text-ink-300 dark:bg-ink-800/60 dark:border-ink-500/30",
  Experimental: "border-ink-400/40 text-ink-600 bg-ink-100 dark:text-ink-300 dark:bg-ink-800/60 dark:border-ink-500/30",
  Coursework: "border-ink-300/40 text-ink-500 bg-ink-50 dark:text-ink-400 dark:bg-ink-900 dark:border-ink-600/30",
  Stable: "border-emerald-600/40 text-emerald-700 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/40 dark:border-emerald-500/30"
};

export default function StatusBadge({ status }: { status: string }) {
  const cls = styles[status] || "border-ink-300 text-ink-600 bg-ink-50";
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${cls}`}>
      {status}
    </span>
  );
}
