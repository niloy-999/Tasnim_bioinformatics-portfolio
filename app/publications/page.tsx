import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import PublicationCard from "@/components/PublicationCard";
import { publications, presentations } from "@/content/publications";

export const metadata: Metadata = {
  title: "Publications",
  description: "Peer-reviewed publications, manuscripts under review or in preparation, and conference presentations."
};

export default function PublicationsPage() {
  const peerReviewed = publications.filter((p) => p.status === "Peer-reviewed");
  const underReview = publications.filter((p) => p.status === "Under review");
  const inRevision = publications.filter((p) => p.status === "In revision");
  const inPrep = publications.filter((p) => p.status === "In preparation");

  return (
    <Container className="py-14">
      <SectionHeading
        eyebrow="Publications"
        title="Papers & manuscripts"
        description="Publication status is tracked precisely — peer-reviewed work is kept separate from manuscripts still under review, in revision, or in preparation."
      />

      <div className="mt-12 space-y-14">
        <div>
          <h2 className="font-serif text-xl font-semibold text-ink-900 dark:text-ink-100">Peer-Reviewed</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {peerReviewed.map((p) => <PublicationCard key={p.title} pub={p} />)}
          </div>
        </div>

        <div>
          <h2 className="font-serif text-xl font-semibold text-ink-900 dark:text-ink-100">Under Review</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {underReview.map((p) => <PublicationCard key={p.title} pub={p} />)}
          </div>
        </div>

        <div>
          <h2 className="font-serif text-xl font-semibold text-ink-900 dark:text-ink-100">In Revision</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {inRevision.map((p) => <PublicationCard key={p.title} pub={p} />)}
          </div>
        </div>

        <div>
          <h2 className="font-serif text-xl font-semibold text-ink-900 dark:text-ink-100">Manuscripts in Preparation</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {inPrep.map((p) => <PublicationCard key={p.title} pub={p} />)}
          </div>
        </div>

        <div>
          <h2 className="font-serif text-xl font-semibold text-ink-900 dark:text-ink-100">Conferences & Presentations</h2>
          <ul className="mt-4 space-y-3">
            {presentations.map((p) => (
              <li key={p.title} className="border border-line p-4 text-sm dark:border-line-dark">
                <p className="font-medium text-ink-900 dark:text-ink-100">{p.title}</p>
                <p className="mt-1 text-ink-600 dark:text-ink-300">{p.venue}</p>
                <p className="mt-1 text-xs text-ink-400 dark:text-ink-500">{p.type} · {p.date}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Container>
  );
}
