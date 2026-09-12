import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import PublicationsExplorer from "@/components/PublicationsExplorer";

export const metadata: Metadata = {
  title: "Publications & Scientific Works",
  description: "Peer-reviewed publications, manuscripts under review, computational genomics preprints, and conference presentations by Tasnim Ul Islam."
};

export default function PublicationsPage() {
  return (
    <Container className="py-12 sm:py-16">
      <SectionHeading
        eyebrow="Academic Outputs & Scholarship"
        title="Publications & Scientific Communications"
        description="Scientific contributions categorized strictly by peer-review status — differentiating published Springer conference/journal papers from manuscripts actively under review or in preparation across computational genomics and sequence foundation models."
      />

      <PublicationsExplorer />
    </Container>
  );
}
