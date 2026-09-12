export interface Publication {
  id?: string;
  status: "Peer-reviewed" | "Under review" | "In revision" | "In preparation";
  title: string;
  authors: string;
  venue: string;
  year?: string;
  doi?: string;
  role: string;
  topic: string;
  type?: string;
  summary?: string;
  keywords?: string[];
  bibtex?: string;
  relatedUrl?: string;
}

export interface Presentation {
  title: string;
  venue: string;
  date: string;
  type: string;
  location?: string;
  abstractSnippet?: string;
  topic?: string;
}

export const publications: Publication[] = [
  {
    id: "pseudo-knighted-cocktail-sort",
    status: "Peer-reviewed",
    title: "Pseudo-Knighted Cocktail Shaker Sort",
    authors: "Ul Islam, T., Shahriar, S., Uddin, M., Hassan, M. R.",
    venue:
      "Proceedings of Trends in Electronics and Health Informatics (TEHI 2023), Lecture Notes in Networks and Systems, vol. 1034, pp. 149–167. Springer, Singapore.",
    year: "2025",
    doi: "https://doi.org/10.1007/978-981-97-3937-0_11",
    role: "Co-author",
    topic: "Algorithm design (sorting algorithm variant)",
    type: "Conference Proceedings (Springer)",
    summary:
      "Introduces an optimized bidirectional sorting algorithm variant integrating chess-knight leap mechanics to drastically lower comparison overhead and pass count across uniform and perturbed permutations.",
    keywords: ["Sorting Algorithms", "Computational Complexity", "Springer LNNS", "Benchmarking"],
    bibtex: `@inproceedings{ulislam2025pseudoknighted,
  title={Pseudo-Knighted Cocktail Shaker Sort},
  author={Ul Islam, Tasnim and Shahriar, S. and Uddin, M. and Hassan, M. R.},
  booktitle={Proceedings of Trends in Electronics and Health Informatics (TEHI 2023)},
  series={Lecture Notes in Networks and Systems},
  volume={1034},
  pages={149--167},
  year={2025},
  publisher={Springer, Singapore},
  doi={10.1007/978-981-97-3937-0_11}
}`
  },
  {
    id: "mitogenomics-tenualosa-ilisha",
    status: "Under review",
    title: "Mitogenomics of Hilsa Shad (Tenualosa ilisha): genome architecture, evolutionary patterns, and phylogeny",
    authors: "Haque, M. A., Ul Islam, T., et al.",
    venue: "Manuscript under review in peer-reviewed genomics journal",
    year: "2025",
    role: "Co-author (computational analysis)",
    topic: "Comparative mitogenomics",
    type: "Genomics Research Article",
    summary:
      "Presents comprehensive circular mitogenome sequencing, gene rearrangement inspection, relative synonymous codon usage (RSCU), tRNA secondary structures, and Bayesian phylogenetic reconstruction of Tenualosa ilisha.",
    keywords: ["Mitochondrial Genomics", "Tenualosa ilisha", "Phylogenetics", "RSCU", "Ka/Ks"],
    relatedUrl: "/research/mitochondrial-genomics",
    bibtex: `@article{haque2025mitogenomics,
  title={Mitogenomics of Hilsa Shad (Tenualosa ilisha): genome architecture, evolutionary patterns, and phylogeny},
  author={Haque, M. A. and Ul Islam, Tasnim and others},
  journal={Under Review},
  year={2025}
}`
  },
  {
    id: "mitochondrial-markers-hilsa",
    status: "In revision",
    title: "Comparative analysis of mitochondrial markers: genetic diversity, population structure, and demographic history of Tenualosa ilisha",
    authors: "Haque, M. A., Ul Islam, T., et al.",
    venue: "Manuscript in revision in peer-reviewed journal",
    year: "2025",
    role: "Co-author (computational analysis)",
    topic: "Population genomics",
    type: "Population Genetics Article",
    summary:
      "Evaluates mitochondrial D-loop and Cytochrome b loci across major river systems and the Bay of Bengal to quantify haplotype diversity, AMOVA genetic differentiation, and historical demographic expansion.",
    keywords: ["Population Structure", "Haplotype Networks", "Demographic History", "Tajima's D"],
    relatedUrl: "/research/mitochondrial-genomics",
    bibtex: `@article{haque2025markers,
  title={Comparative analysis of mitochondrial markers: genetic diversity, population structure, and demographic history of Tenualosa ilisha},
  author={Haque, M. A. and Ul Islam, Tasnim and others},
  journal={In Revision},
  year={2025}
}`
  },
  {
    id: "tor-tor-whole-genome",
    status: "In preparation",
    title: "Reference-guided whole-genome analysis of Tor tor",
    authors: "Haque, M. A., et al. (including Ul Islam, T.)",
    venue: "Manuscript in preparation (BFRI Project Collaboration)",
    year: "2025",
    role: "Co-author (computational analysis)",
    topic: "Whole-genome sequencing & assembly",
    type: "WGS Assembly & Annotation",
    summary:
      "Reference-guided scaffold assembly, quality assessment (BUSCO >93%), repeat masking, structural variant profiling, and KEGG/GO functional annotation of the endangered freshwater Tor tor.",
    keywords: ["Tor tor", "Whole-Genome Sequencing", "BFRI", "BUSCO", "Variant Calling"],
    relatedUrl: "/research/bfri",
    bibtex: `@article{haque2025tortorwgs,
  title={Reference-guided whole-genome analysis of Tor tor},
  author={Haque, M. A. and others and Ul Islam, Tasnim},
  journal={In Preparation},
  year={2025}
}`
  },
  {
    id: "tor-tor-mitogenome",
    status: "In preparation",
    title: "Comparative mitochondrial gene analysis of Tor tor",
    authors: "Haque, M. A., et al. (including Ul Islam, T.)",
    venue: "Manuscript in preparation",
    year: "2025",
    role: "Co-author (computational analysis)",
    topic: "Comparative mitogenomics",
    type: "Comparative Mitogenomics",
    summary:
      "Comparative mitochondrial gene order, nucleotide composition skew, non-synonymous to synonymous substitution rates (Ka/Ks), and phylogenetic positioning within the Cyprinidae family.",
    keywords: ["Tor tor", "Mitogenome", "Ka/Ks Selection", "Cyprinidae", "Evolutionary Biology"],
    relatedUrl: "/research/mitochondrial-genomics",
    bibtex: `@article{haque2025tortormito,
  title={Comparative mitochondrial gene analysis of Tor tor},
  author={Haque, M. A. and others and Ul Islam, Tasnim},
  journal={In Preparation},
  year={2025}
}`
  },
  {
    id: "oryza-metacaspase-gene-family",
    status: "In preparation",
    title: "Genome-Wide Identification and Expression Analysis of the Metacaspase Gene Family in Oryza Species",
    authors: "Ul Islam, T., Ul-Arif, M. T., Hossen, M. B., et al.",
    venue: "Manuscript in preparation",
    year: "2025",
    role: "First / Lead Author",
    topic: "Comparative genomics / gene family analysis",
    type: "Genome-Wide Identification",
    summary:
      "Genome-wide identification, chromosomal distribution, gene duplication collinearity, conserved motif analysis, and RNA-seq derived abiotic stress-responsive expression patterns of metacaspases across Oryza taxa.",
    keywords: ["Metacaspase Family", "Oryza sativa", "Gene Duplication", "Collinearity", "Abiotic Stress"],
    bibtex: `@article{ulislam2025metacaspase,
  title={Genome-Wide Identification and Expression Analysis of the Metacaspase Gene Family in Oryza Species},
  author={Ul Islam, Tasnim and Ul-Arif, M. T. and Hossen, M. B. and others},
  journal={In Preparation},
  year={2025}
}`
  },
  {
    id: "dna-protein-cross-modal-dl",
    status: "In preparation",
    title: "A DNA–protein cross-modal deep-learning framework for discovering plastic-degrading genes in bacteria",
    authors: "Shahriar, S., Ul Islam, T. (equal contribution), et al.",
    venue: "Journal version of undergraduate thesis; experimental validation planned",
    year: "2025",
    role: "Equal-contribution co-author",
    topic: "Multimodal deep learning for gene discovery",
    type: "AI & Sequence Foundation Models",
    summary:
      "Architects a multimodal contrastive representation pipeline coupling DNABERT-2 genomic representations with ESM-2 protein embeddings (InfoNCE loss) to predict and rank novel PET/microplastic enzymatic degraders.",
    keywords: ["DNABERT-2", "ESM-2", "Contrastive Learning", "Enzyme Discovery", "PETase"],
    relatedUrl: "/thesis",
    bibtex: `@article{shahriar2025plasticdegrading,
  title={A DNA--protein cross-modal deep-learning framework for discovering plastic-degrading genes in bacteria},
  author={Shahriar, S. and Ul Islam, Tasnim and others},
  journal={In Preparation},
  year={2025}
}`
  }
];

export const presentations: Presentation[] = [
  {
    title: "BioSeqInsight: An Integrated Local Platform for DNA-to-Protein Sequence Analysis and Structure Prediction",
    venue: "Regional Statistical Conference 2026 (BAU DAAS / BSA)",
    date: "April 2026",
    type: "Oral presentation",
    location: "Mymensingh, Bangladesh",
    topic: "Bioinformatics Software & Sequence Analytics",
    abstractSnippet:
      "Demonstrated the architecture and performance benchmarks of BioSeqInsight, an offline-first Python desktop suite for batch sequence processing, physicochemical property calculation, and structural visualization."
  },
  {
    title: "Genome-Wide Identification and Expression Analysis of the Metacaspase Gene Family in Oryza Species",
    venue: "International Conference on Regenerative Agriculture for Sustainable Food Security",
    date: "December 2025",
    type: "Oral presentation",
    location: "Gazipur Agricultural University, Bangladesh",
    topic: "Plant Comparative Genomics",
    abstractSnippet:
      "Presented genome-wide identification of metacaspase genes across cultivated and wild rice genomes, elucidating evolutionary expansion events and divergent expression profiles under saline and drought stresses."
  },
  {
    title: "In-Silico discovery of Sandhoff Disease causing key molecular signatures and therapeutic agents through single-cell RNA-Seq analysis",
    venue: "International Conference on Applied Statistics and Data Science 2025",
    date: "2025",
    type: "Contributory poster",
    location: "Dhaka, Bangladesh",
    topic: "Single-Cell Transcriptomics & Drug Repurposing",
    abstractSnippet:
      "Investigated neurodegenerative pathomechanisms using scRNA-seq differential expression, cell-type clustering, protein-protein interaction networking, and molecular docking of prospective neuroprotective candidates."
  }
];
