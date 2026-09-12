import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: "Academic background, research interests, and future research direction of Tasnim Ul Islam."
};

export default function AboutPage() {
  return (
    <Container className="py-14">
      <SectionHeading eyebrow="About" title="Who I Am" />

      <div className="prose-body mt-6 max-w-prose">
        <p>
          I&apos;m a final-year Bioinformatics Engineering student at Bangladesh Agricultural
          University, working at the intersection of computational genomics, evolutionary
          biology, and machine learning. Over the past year my work has spanned three areas:
          reference-guided whole-genome assembly and annotation, complete mitochondrial genome
          and population-genetic analysis of two commercially important Bangladeshi fish species,
          and a DNA–protein cross-modal deep learning framework for discovering plastic-degrading
          genes in bacteria.
        </p>
        <p>
          I&apos;m drawn to problems where a computational method can meaningfully narrow down
          what a wet lab needs to test — prioritizing candidate genes, flagging population
          structure worth sampling further, or surfacing a reference genome where none existed.
          I try to be explicit about what a given result does and doesn&apos;t show: an in silico
          prediction is a hypothesis to test, not a conclusion.
        </p>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr,1fr]">
        <div>
          <h2 className="font-serif text-xl font-semibold text-ink-900 dark:text-ink-100">
            Academic Background
          </h2>
          <div className="mt-4 border border-line p-5 dark:border-line-dark">
            <p className="font-medium text-ink-900 dark:text-ink-100">
              B.Sc. in Bioinformatics Engineering
            </p>
            <p className="text-sm text-ink-600 dark:text-ink-300">{site.institution}</p>
            <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">
              Session 2020–21 · CGPA 3.463 / 4.00 · Rank 5th · Expected graduation 2026
            </p>
            <div className="mt-3 border-t border-line pt-3 text-sm text-ink-500 dark:border-line-dark dark:text-ink-400">
              <p>HSC — Kushtia Govt. College (2020), GPA 5.00/5.00</p>
              <p>SSC — Kushtia Zilla School (2018), GPA 5.00/5.00</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-serif text-xl font-semibold text-ink-900 dark:text-ink-100">
            Research Experience
          </h2>
          <ul className="mt-4 space-y-3">
            <li className="border border-line p-4 text-sm dark:border-line-dark">
              <p className="font-medium text-ink-900 dark:text-ink-100">
                Research Intern, Fish Genomics Laboratory — Bangladesh Fisheries Research Institute
              </p>
              <p className="mt-1 text-ink-600 dark:text-ink-300">
                2026 · Whole-genome assembly, mitogenomics, and population genetics of Tor tor and Tenualosa ilisha.
              </p>
            </li>
            <li className="border border-line p-4 text-sm dark:border-line-dark">
              <p className="font-medium text-ink-900 dark:text-ink-100">
                Undergraduate Project — DNA–Protein Cross-Modal Deep Learning
              </p>
              <p className="mt-1 text-ink-600 dark:text-ink-300">
                2025–2026 · Multimodal representation learning for plastic-degrading gene discovery.
              </p>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="font-serif text-xl font-semibold text-ink-900 dark:text-ink-100">
          Computational & Scientific Interests
        </h2>
        <p className="prose-body mt-3 max-w-prose">
          My work so far has combined classical population-genetic and phylogenetic methods with
          modern sequence-representation learning. I&apos;m particularly interested in the point
          where these two traditions meet: using foundation models trained on large sequence
          corpora (DNABERT-2, ESM-2) to complement, rather than replace, the careful dataset
          curation and evolutionary reasoning that population genetics and mitogenomics require.
        </p>
      </div>

      <div className="mt-12 border border-line bg-ink-100 p-6 dark:border-line-dark dark:bg-ink-800">
        <h2 className="font-serif text-xl font-semibold text-ink-900 dark:text-ink-100">
          Future Research Direction
        </h2>
        <p className="mt-2 text-sm text-ink-600 dark:text-ink-300">
          What I&apos;d like to work on next, for prospective supervisors and collaborators:
        </p>
        <ul className="mt-4 grid gap-2 text-sm text-ink-700 dark:text-ink-200 sm:grid-cols-2">
          {[
            "Conservation and population genomics of understudied or threatened freshwater fish",
            "Biological foundation models and DNA–protein representation learning",
            "Multimodal biological AI that preserves practical single-modality inference",
            "Comparative and evolutionary genomics (mitogenomics, selection analysis)",
            "Reproducible bioinformatics pipeline and scientific software development"
          ].map((item) => (
            <li key={item} className="flex gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}
