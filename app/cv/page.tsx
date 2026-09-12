import type { Metadata } from "next";
import Link from "next/link";
import { FileDown } from "lucide-react";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "CV",
  description: "Academic curriculum vitae of Tasnim Ul Islam."
};

export default function CvPage() {
  return (
    <Container className="py-14">
      <SectionHeading eyebrow="CV" title="Curriculum Vitae" />

      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href="/cv/Tasnim_Ul_Islam_Academic_CV.pdf"
          download
          className="inline-flex items-center gap-2 bg-ink-900 px-5 py-2.5 text-sm font-medium text-paper hover:bg-ink-700 dark:bg-amber-500 dark:text-ink-900 dark:hover:bg-amber-400"
        >
          <FileDown size={15} /> Download PDF
        </a>
        <Link href="/publications" className="inline-flex items-center gap-2 border border-line px-5 py-2.5 text-sm font-medium text-ink-800 hover:border-amber-500 hover:text-amber-600 dark:border-line-dark dark:text-ink-100">
          View publications
        </Link>
        <Link href="/research" className="inline-flex items-center gap-2 border border-line px-5 py-2.5 text-sm font-medium text-ink-800 hover:border-amber-500 hover:text-amber-600 dark:border-line-dark dark:text-ink-100">
          View research
        </Link>
        <Link href="/contact" className="inline-flex items-center gap-2 border border-line px-5 py-2.5 text-sm font-medium text-ink-800 hover:border-amber-500 hover:text-amber-600 dark:border-line-dark dark:text-ink-100">
          Contact me
        </Link>
      </div>

      <p className="prose-body mt-8 max-w-prose text-sm text-ink-500 dark:text-ink-400">
        The downloadable PDF above is the authoritative CV. The summary below mirrors it, kept
        intentionally brief — for full detail on any item, see the dedicated Research,
        Publications, or Skills pages.
      </p>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div className="border border-line p-5 dark:border-line-dark">
          <h2 className="font-serif text-base font-semibold text-ink-900 dark:text-ink-100">Contact</h2>
          <dl className="mt-3 space-y-1.5 text-sm text-ink-600 dark:text-ink-300">
            <div className="flex justify-between"><dt>Email</dt><dd>{site.email}</dd></div>
            <div className="flex justify-between"><dt>Phone</dt><dd>{site.phone}</dd></div>
            <div className="flex justify-between"><dt>Location</dt><dd>{site.location}</dd></div>
          </dl>
        </div>
        <div className="border border-line p-5 dark:border-line-dark">
          <h2 className="font-serif text-base font-semibold text-ink-900 dark:text-ink-100">Education</h2>
          <p className="mt-3 text-sm text-ink-600 dark:text-ink-300">
            B.Sc. in Bioinformatics Engineering, {site.institution}
          </p>
          <p className="text-sm text-ink-500 dark:text-ink-400">
            Session 2020–21 · CGPA 3.463/4.00 · Rank 5th
          </p>
        </div>
      </div>
    </Container>
  );
}
