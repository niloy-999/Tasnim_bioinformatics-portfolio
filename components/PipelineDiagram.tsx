import Card3D from "@/components/Card3D";

interface Step {
  step: string;
  tool?: string;
  detail?: string;
}

export default function PipelineDiagram({ steps }: { steps: Step[] }) {
  return (
    <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {steps.map((s, i) => (
        <li key={s.step} className="h-full">
          <Card3D maxTilt={3} className="h-full">
            <div className="flex h-full flex-col rounded-xl border border-line/80 bg-white/70 p-4 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-bio-cyan/50 hover:shadow-glow dark:border-line-dark/80 dark:bg-ink-900/50">
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-xs font-semibold text-bio-cyan dark:text-cyan-400">
                  Step {String(i + 1).padStart(2, "0")}
                </span>
                {s.tool && (
                  <span className="rounded bg-ink-100/70 px-2 py-0.5 font-mono text-[11px] text-ink-600 dark:bg-ink-800/70 dark:text-ink-300">
                    {s.tool}
                  </span>
                )}
              </div>
              <h4 className="mt-2 font-serif text-base font-semibold text-ink-900 dark:text-ink-100">
                {s.step}
              </h4>
              {s.detail && (
                <p className="mt-2 text-xs leading-relaxed text-ink-600 dark:text-ink-300">
                  {s.detail}
                </p>
              )}
            </div>
          </Card3D>
        </li>
      ))}
    </ol>
  );
}
