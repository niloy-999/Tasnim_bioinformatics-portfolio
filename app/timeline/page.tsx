import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Card3D from "@/components/Card3D";
import { timeline } from "@/content/timeline";

export const metadata: Metadata = {
  title: "Timeline",
  description: "Academic progression, milestones, and computational biology trajectory of Tasnim Ul Islam from 2020 to present."
};

export default function TimelinePage() {
  return (
    <Container className="py-12 sm:py-16">
      <SectionHeading
        eyebrow="Academic & Research Trajectory"
        title="Progression Timeline"
        description="From early programming fundamentals and competitive algorithms to whole-genome assembly, population genomics, and deep sequence representation learning."
      />

      <div className="relative mt-12 pl-6 sm:pl-8">
        {/* Glowing vertical connector line */}
        <div className="absolute left-[11px] top-3 bottom-3 w-[2px] bg-gradient-to-b from-bio-cyan via-bio-emerald to-amber-500 opacity-60 sm:left-[15px]" />

        <div className="space-y-8">
          {timeline.map((t, idx) => (
            <div key={t.year} className="relative">
              {/* Glowing Node */}
              <div className="absolute -left-[19px] top-5 flex h-4 w-4 items-center justify-center rounded-full bg-paper ring-4 ring-bio-cyan/20 dark:bg-paper-dark sm:-left-[23px]">
                <span className="h-2 w-2 rounded-full bg-bio-cyan animate-pulse" />
              </div>

              {/* Milestone Card */}
              <Card3D maxTilt={3}>
                <div className="rounded-xl border border-line/80 bg-white/75 p-5 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-bio-cyan/50 hover:shadow-glow dark:border-line-dark/80 dark:bg-ink-900/50 sm:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="inline-block rounded-full bg-bio-cyan/10 px-2.5 py-0.5 font-mono text-xs font-semibold text-bio-cyan dark:bg-bio-cyan/20 dark:text-cyan-300">
                      {t.year}
                    </span>
                    <span className="font-mono text-[11px] text-ink-400 dark:text-ink-500">
                      Milestone 0{idx + 1}
                    </span>
                  </div>

                  <h2 className="mt-3 font-serif text-lg font-semibold text-ink-900 dark:text-ink-100 sm:text-xl">
                    {t.title}
                  </h2>

                  <p className="mt-2 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
                    {t.detail}
                  </p>
                </div>
              </Card3D>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
