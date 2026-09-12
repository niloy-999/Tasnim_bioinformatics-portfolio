import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { skillGroups, certifications, awards, leadership } from "@/content/skills";

export const metadata: Metadata = {
  title: "Skills",
  description: "Technical skills organized by depth: programming, genomics, phylogenetics, machine learning, and data science."
};

export default function SkillsPage() {
  return (
    <Container className="py-14">
      <SectionHeading eyebrow="Skills" title="Technical background" />

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {skillGroups.map((g) => (
          <div key={g.category} className="border border-line p-5 dark:border-line-dark">
            <h2 className="font-serif text-base font-semibold text-ink-900 dark:text-ink-100">
              {g.category}
            </h2>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {g.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-line px-2.5 py-1 font-mono text-xs text-ink-600 dark:border-line-dark dark:text-ink-300"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-14 grid gap-8 border-t border-line pt-10 dark:border-line-dark md:grid-cols-3">
        <div>
          <h2 className="font-serif text-base font-semibold text-ink-900 dark:text-ink-100">
            Certifications
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-ink-600 dark:text-ink-300">
            {certifications.map((c) => <li key={c}>{c}</li>)}
          </ul>
        </div>
        <div>
          <h2 className="font-serif text-base font-semibold text-ink-900 dark:text-ink-100">
            Awards
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-ink-600 dark:text-ink-300">
            {awards.map((a) => <li key={a}>{a}</li>)}
          </ul>
        </div>
        <div>
          <h2 className="font-serif text-base font-semibold text-ink-900 dark:text-ink-100">
            Leadership
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-ink-600 dark:text-ink-300">
            {leadership.map((l) => <li key={l}>{l}</li>)}
          </ul>
        </div>
      </div>
    </Container>
  );
}
