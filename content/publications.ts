export interface Publication {
  status: "Peer-reviewed" | "Under review" | "In revision" | "In preparation";
  title: string;
  authors: string;
  venue: string;
  year?: string;
  doi?: string;
  role: string;
  topic: string;
}

export const publications: Publication[] = [
  {
    status: "Peer-reviewed",
    title: "Pseudo-Knighted Cocktail Shaker Sort",
    authors: "Ul Islam, T., Shahriar, S., Uddin, M., Hassan, M. R.",
    venue:
      "Proceedings of Trends in Electronics and Health Informatics (TEHI 2023), Lecture Notes in Networks and Systems, vol. 1034, pp. 149–167. Springer, Singapore.",
    year: "2025",
    doi: "https://doi.org/10.1007/978-981-97-3937-0_11",
    role: "Co-author",
    topic: "Algorithm design (sorting algorithm variant)"
  },
  {
    status: "Under review",
    title: "Mitogenomics of Hilsa Shad (Tenualosa ilisha): genome architecture, evolutionary patterns, and phylogeny",
    authors: "Haque, M. A., Ul Islam, T., et al.",
    venue: "Manuscript under review",
    role: "Co-author (computational analysis)",
    topic: "Comparative mitogenomics"
  },
  {
    status: "In revision",
    title: "Comparative analysis of mitochondrial markers: genetic diversity, population structure, and demographic history of Tenualosa ilisha",
    authors: "Haque, M. A., Ul Islam, T., et al.",
    venue: "Manuscript in revision",
    role: "Co-author (computational analysis)",
    topic: "Population genomics"
  },
  {
    status: "In preparation",
    title: "Reference-guided whole-genome analysis of Tor tor",
    authors: "Haque, M. A., et al. (including Ul Islam, T.)",
    venue: "Manuscript in preparation",
    role: "Co-author (computational analysis)",
    topic: "Whole-genome sequencing & assembly"
  },
  {
    status: "In preparation",
    title: "Comparative mitochondrial gene analysis of Tor tor",
    authors: "Haque, M. A., et al. (including Ul Islam, T.)",
    venue: "Manuscript in preparation",
    role: "Co-author (computational analysis)",
    topic: "Comparative mitogenomics"
  },
  {
    status: "In preparation",
    title: "Genome-Wide Identification and Expression Analysis of the Metacaspase Gene Family in Oryza Species",
    authors: "Ul Islam, T., Ul-Arif, M. T., Hossen, M. B., et al.",
    venue: "Manuscript in preparation",
    role: "Author",
    topic: "Comparative genomics / gene family analysis"
  },
  {
    status: "In preparation",
    title: "A DNA–protein cross-modal deep-learning framework for discovering plastic-degrading genes in bacteria",
    authors: "Shahriar, S., Ul Islam, T. (equal contribution), et al.",
    venue: "Journal version of the undergraduate project; experimental validation planned",
    role: "Equal-contribution co-author",
    topic: "Multimodal deep learning for gene discovery"
  }
];

export const presentations = [
  {
    title: "BioSeqInsight: An Integrated Local Platform for DNA-to-Protein Sequence Analysis and Structure Prediction",
    venue: "Regional Statistical Conference 2026 (BAU DAAS / BSA)",
    date: "April 2026",
    type: "Oral presentation"
  },
  {
    title: "Genome-Wide Identification and Expression Analysis of the Metacaspase Gene Family in Oryza Species",
    venue: "International Conference on Regenerative Agriculture for Sustainable Food Security, Gazipur Agricultural University",
    date: "December 2025",
    type: "Oral presentation"
  },
  {
    title: "In-Silico discovery of Sandhoff Disease causing key molecular signatures and therapeutic agents through single-cell RNA-Seq analysis",
    venue: "International Conference on Applied Statistics and Data Science 2025",
    date: "2025",
    type: "Contributory poster"
  }
];
