export type ProjectStatus = "Research-use" | "Prototype" | "Experimental" | "Coursework" | "Stable";

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  status: ProjectStatus;
  period: string;
  problem: string;
  approach: string;
  technology: string[];
  result: string;
  contribution: string;
  github?: string;
  demo?: string;
  doi?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    slug: "bioseqinsight",
    name: "BioSeqInsight",
    tagline: "Local desktop tool for DNA sequence analysis and protein structure lookup",
    status: "Research-use",
    period: "2025 – Present",
    problem:
      "Basic DNA sequence characterization (composition, motifs, ORFs) and structure lookup for a protein of interest usually means juggling several separate web tools and copy-pasting between them, which is slow for exploratory work and doesn't work offline.",
    approach:
      "A Python desktop application that runs sequence analysis locally — GC content, melting temperature, motif search, translation, and ORF prediction — and integrates with public structure resources (ESM Atlas, AlphaFold DB, RCSB PDB) to retrieve or predict structures for a queried protein, without needing a browser tab per tool.",
    technology: ["Python", "Biopython", "ESM Atlas API", "AlphaFold DB", "RCSB PDB"],
    result:
      "Benchmarked structure retrieval on 25 public proteins: 16 of 25 returned a live fold (e.g. CDK2 retrieved at pLDDT 90.25), with the rest requiring prediction rather than lookup.",
    contribution: "Sole developer — designed and implemented the full desktop application.",
    github: "https://github.com/niloy-999/BioSeqInsight",
    featured: true
  },
  {
    slug: "scrna-pipeline",
    name: "scRNA-seq Analysis Platform",
    tagline: "Interactive Streamlit app for single-cell RNA-seq QC, embedding, and clustering",
    status: "Research-use",
    period: "2025 – 2026",
    problem:
      "Standard single-cell RNA-seq workflows (QC → HVG selection → dimensionality reduction → clustering → marker export) are usually run as one-off notebooks, which makes it hard to interactively compare preprocessing choices like PCA vs. a learned VAE embedding on the same dataset.",
    approach:
      "A Streamlit application built on Scanpy and PyTorch that walks through QC, highly-variable-gene selection, a choice of PCA or VAE embeddings, Leiden/K-means clustering, and marker-gene export, so different embedding and clustering choices can be compared interactively on the same uploaded dataset.",
    technology: ["Python", "Scanpy", "PyTorch", "Streamlit"],
    result: "Released as v0.1.0 with documentation and an archived DOI via Zenodo.",
    contribution: "Sole developer — designed and implemented the pipeline and interface.",
    github: "https://github.com/niloy-999/scRNA-pipeline",
    doi: "https://doi.org/10.5281/zenodo.22132422",
    featured: true
  },
  {
    slug: "gene-expression-analysis",
    name: "Gene Expression Analysis",
    tagline: "R pipeline to identify and visualize differentially expressed genes",
    status: "Research-use",
    period: "2023",
    problem: "Differential expression analysis and reporting needed a repeatable script rather than manual steps.",
    approach: "An R-based workflow that identifies differentially expressed genes from expression data and generates a visual report.",
    technology: ["R"],
    result: "A reusable differential-expression scripting pipeline, published on GitHub.",
    contribution: "Sole developer.",
    github: "https://github.com/niloy-999/Gene_expression_analysis"
  },
  {
    slug: "dna-basic-analysis",
    name: "DNA Basic Analysis",
    tagline: "Early Python scripts for fundamental DNA sequence analysis",
    status: "Coursework",
    period: "2024",
    problem: "Foundational practice implementing core sequence-analysis operations from first principles.",
    approach: "Python scripts covering fundamental DNA sequence analysis tasks.",
    technology: ["Python"],
    result: "Early portfolio piece demonstrating core bioinformatics scripting.",
    contribution: "Sole developer.",
    github: "https://github.com/niloy-999/DNA-Basic-analysis"
  }
];

export const otherRepos = [
  { name: "HeartCare-Analytics", desc: "MongoDB-based big-data heart disease analytics and prediction system.", tech: "Python", url: "https://github.com/niloy-999/HeartCare-Analytics" },
  { name: "AI_Smart_Home_Assistant_System", desc: "English & Bangla voice/text-activated smart home assistant with traffic, weather, and reminders.", tech: "Python", url: "https://github.com/niloy-999/AI_Smart_Home_Assistant_System" },
  { name: "password-based-lock-for-bike-ignition-key", desc: "8051-microcontroller-based password-protected bike ignition security system.", tech: "C / Keil uVision5", url: "https://github.com/niloy-999/password-based-lock-for-bike-ignition-key" },
  { name: "Movie_Recommendation_Systems", desc: "Web app for movie recommendations.", tech: "PHP", url: "https://github.com/niloy-999/Movie_Recommendation_Systems" },
  { name: "Expression_evaluation", desc: "Java expression evaluation and algorithms coursework.", tech: "Java", url: "https://github.com/niloy-999/Expression_evaluation" },
  { name: "Digital_clock", desc: "Java digital clock project.", tech: "Java", url: "https://github.com/niloy-999/Digital_clock" },
  { name: "Modified_sorting_dataset", desc: "Sorting algorithm coursework on a modified dataset.", tech: "—", url: "https://github.com/niloy-999/Modified_sorting_dataset" }
];
