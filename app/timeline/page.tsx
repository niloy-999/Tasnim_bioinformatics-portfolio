import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { timeline } from "@/content/timeline";

export const metadata: Metadata = {
  title: "Timeline",
  description: "Research and academic timeline from 2020 to present."
};

export default function TimelinePage() {
  return (
    <Container className="py-14">
      <SectionHeading
        eyebrow="Timeline"
        title="Progression"
        description="Student → bioinformatics programmer → researcher → computational genomics researcher."
      />

      <ol className="relative mt-12 border-l border-line pl-8 dark:border-line-dark">
        {timeline.map((t) => (
          <li key={t.year} className="mb-10 last:mb-0">
            <span className="absolute -left-[7px] mt-1.5 h-3 w-3 rounded-full border-2 border-paper bg-amber-500 dark:border-paper-dark" />
            <p className="font-mono text-sm text-amber-600 dark:text-amber-400">{t.year}</p>
            <h2 className="mt-1 font-serif text-lg font-semibold text-ink-900 dark:text-ink-100">
              {t.title}
            </h2>
            <p className="mt-1 max-w-prose text-sm text-ink-600 dark:text-ink-300">{t.detail}</p>
          </li>
        ))}
      </ol>
    </Container>
  );
}
