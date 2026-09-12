interface StatusBadgeProps {
  status: string;
  showDot?: boolean;
}

const styles: Record<string, { border: string; dot: string }> = {
  "Peer-reviewed": {
    border: "border-emerald-500/40 text-emerald-700 bg-emerald-50/90 dark:text-emerald-300 dark:bg-emerald-950/60 dark:border-emerald-500/40 shadow-sm",
    dot: "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.7)]"
  },
  "Under review": {
    border: "border-cyan-500/40 text-cyan-800 bg-cyan-50/90 dark:text-cyan-300 dark:bg-cyan-950/60 dark:border-cyan-500/40 shadow-sm",
    dot: "bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.7)]"
  },
  "In revision": {
    border: "border-amber-500/40 text-amber-800 bg-amber-50/90 dark:text-amber-300 dark:bg-amber-950/60 dark:border-amber-500/40 shadow-sm",
    dot: "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.7)]"
  },
  "In preparation": {
    border: "border-purple-500/40 text-purple-800 bg-purple-50/90 dark:text-purple-300 dark:bg-purple-950/60 dark:border-purple-500/40 shadow-sm",
    dot: "bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.7)]"
  },
  "Research-use": {
    border: "border-teal-500/40 text-teal-800 bg-teal-50/90 dark:text-teal-300 dark:bg-teal-950/60 dark:border-teal-500/40",
    dot: "bg-teal-500"
  },
  Prototype: {
    border: "border-amber-500/40 text-amber-800 bg-amber-50/90 dark:text-amber-300 dark:bg-amber-950/60 dark:border-amber-500/40",
    dot: "bg-amber-500"
  },
  Experimental: {
    border: "border-rose-500/40 text-rose-800 bg-rose-50/90 dark:text-rose-300 dark:bg-rose-950/60 dark:border-rose-500/40",
    dot: "bg-rose-500"
  },
  Coursework: {
    border: "border-slate-400/40 text-slate-700 bg-slate-50 dark:text-slate-300 dark:bg-slate-800/60 dark:border-slate-600/40",
    dot: "bg-slate-400"
  },
  Stable: {
    border: "border-emerald-500/40 text-emerald-700 bg-emerald-50/90 dark:text-emerald-300 dark:bg-emerald-950/60 dark:border-emerald-500/40",
    dot: "bg-emerald-500"
  }
};

export default function StatusBadge({ status, showDot = true }: StatusBadgeProps) {
  const current = styles[status] || {
    border: "border-line text-ink-600 bg-ink-100 dark:text-ink-300 dark:bg-ink-800/60 dark:border-ink-500/30",
    dot: "bg-ink-400"
  };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[11px] font-semibold tracking-wide ${current.border}`}>
      {showDot && (
        <span className={`h-1.5 w-1.5 rounded-full ${current.dot} animate-pulse`} />
      )}
      {status}
    </span>
  );
}
