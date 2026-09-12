export const bfri = {
  title: "Fish Genomics Research Internship",
  host: "Fish Genomics Laboratory, Bangladesh Fisheries Research Institute (BFRI)",
  year: "2026",
  supervisors: [
    { name: "Md. Amdadul Haque", role: "Scientific Officer, BFRI (on-site supervisor)" },
    { name: "Dr. Md. Rakib Hossain", role: "Professor, BAU (computational resources & academic supervision)" },
    { name: "Dr. Md. Macbah Uddin", role: "Academic supervisor, BAU" }
  ],
  species: ["Tor tor (red-finned Mahseer)", "Tenualosa ilisha (Hilsa shad)"],
  summary:
    "A multi-omics computational internship spanning whole-genome assembly and annotation, complete mitochondrial genome analysis, and large-scale population genomics, for two commercially and ecologically important, under-characterized regional fish species.",
  wetLab: {
    steps: [
      "Genomic DNA extraction from fish tissue",
      "PCR amplification of targeted mitochondrial loci",
      "Confirmation of amplification by agarose gel electrophoresis",
      "Illumina short-read sequencing of amplified/whole-genome material"
    ]
  },
  wgs: {
    title: "Whole-Genome Sequencing & Reference-Guided Assembly of Tor tor",
    objective:
      "Generate a contiguous, annotated reference-quality genome for the endangered red-finned Mahseer, and identify candidate genes relevant to growth, immunity, and environmental tolerance to support future breeding programs.",
    reference: "Tor sinensis chromosome-level Hap2 assembly (GCA_056882195.1, NCBI, submitted by Ministry of Water Resources / Chinese Academy of Sciences)",
    sequencing: {
      platform: "Illumina NovaSeq 6000",
      readLength: "150 bp, paired-end",
      forwardReads: 81252065,
      reverseReads: 81252065,
      downloadTool: "SRA Toolkit"
    },
    pipeline: [
      { step: "Quality control", tool: "FastQC", detail: "Per-base quality, GC content, duplication level on raw reads." },
      { step: "Preprocessing", tool: "fastp", detail: "Adapter trimming, quality trimming (Q≥25 cut, min length 75 bp), paired-end error correction." },
      { step: "Alignment", tool: "BWA-MEM + SAMtools", detail: "Reference-guided alignment to T. sinensis, SAM→sorted/indexed BAM." },
      { step: "Coverage QC", tool: "mosdepth", detail: "Validated alignment depth/coverage and flagged poorly covered regions." },
      { step: "Variant calling", tool: "BCFtools", detail: "Genotype likelihoods and SNP/indel calling against the reference." },
      { step: "Variant filtering", tool: "BCFtools filter", detail: "Hard filter: QUAL≥30, DP≥10, MQ≥40, biallelic, homozygous-alt — removing likely misalignment artifacts." },
      { step: "Consensus genome", tool: "BCFtools consensus", detail: "Filtered, left-aligned variants integrated into the T. sinensis reference to produce the Tor tor consensus FASTA." },
      { step: "Assembly QC", tool: "QUAST + BUSCO", detail: "Assembly statistics and evolutionary completeness against actinopterygii_odb10." },
      { step: "Structural annotation", tool: "GeMoMa (+ AGAT, gffread)", detail: "Homology-based gene prediction using T. sinensis and Danio rerio as reference species; longest-isoform and protein FASTA extraction." },
      { step: "Functional annotation", tool: "eggNOG-mapper + DIAMOND", detail: "Ortholog assignment, GO terms, EC numbers, KEGG Orthology (KO)." },
      { step: "ncRNA annotation", tool: "tRNAscan-SE + Infernal/Rfam (cmscan)", detail: "tRNA loci and structures; genome-wide miRNA/snoRNA/rRNA search." }
    ],
    results: {
      rawReads: { forward: 81252065, reverse: 81252065, totalBases: "24,375,619,500 bp" },
      afterFastp: {
        totalReadsBefore: 162504130,
        totalReadsAfter: 160219686,
        q30RateBefore: "95.89%",
        q30RateAfter: "96.80%",
        duplicationRate: "8.54%"
      },
      referenceGenomeSize: "868.2 Mb (25 chromosomes, T. sinensis Hap2)",
      mapping: {
        totalMapped: "165,161,447 reads (98.53%)",
        properlyPaired: "144,228,750 (90.02%)",
        meanDepth: "21.49×"
      },
      variants: { totalRecords: 2629645, snps: 2382367, indels: 247278, tiTvRatio: 1.89 },
      consensusGenome: { length: "868,218,227 bp", netDeltaFromReference: "+49,360 bp" },
      quast: { contigs: 25, n50: "33,867,070 bp", gcContent: "37.34%" },
      buscoGenome: {
        complete: "97.8% (C:97.8% [S:97.0%, D:0.8%], F:0.5%, M:1.7%, n=3,640)",
        lineage: "actinopterygii_odb10"
      },
      buscoProteins: {
        complete: "92.5% (C:92.5% [S:90.6%, D:1.9%], F:2.4%, M:5.1%, n=3,640)"
      },
      annotation: {
        finalGenes: 48169,
        mrnaTranscripts: 55274,
        cdsFeatures: 343774,
        totalProteins: 48169,
        avgProteinLength: "412.1 aa",
        proteinsWithDiamondHits: "37,397 (77.64%)",
        proteinsWithGO: "19,761 (41.03%)",
        proteinsWithKO: "20,333 (42.21%)",
        proteinsWithEC: "12,727 (26.42%)",
        uniqueGoTerms: 23214,
        uniqueKeggPathways: 393,
        uniqueCogClasses: 24
      }
    }
  },
  mitogenomics: {
    title: "Complete Mitochondrial Genome Analysis",
    objective:
      "Characterize genome architecture, nucleotide composition/skew, codon usage (RSCU), tRNA/rRNA secondary structure, control-region repeats, and evolutionary constraint (Ka/Ks) of the complete mitochondrial genomes of Tor tor and Tenualosa ilisha, and place Tor tor phylogenetically among related cyprinids.",
    dataCollection:
      "9 reference mitogenomes collected from NCBI (Tor putitora, T. sinensis, T. tambra, T. tambroides, Labeo spp., Cyprinus) alongside the focal species; extraction and downstream analysis via PhyloSuite v1.2.2.",
    tools: ["PhyloSuite v1.2.2", "MACSE (PCG alignment)", "MAFFT v7 (tRNA/rRNA alignment)", "MitoFish / MitoAnnotator", "Proksee", "IQ-TREE v2.2.2.6", "iTOL v6", "MITOS2 (Galaxy)", "Tandem Repeats Finder", "KaKs_Calculator v2.0", "Python (pandas, NumPy, matplotlib, seaborn, Biopython, SciPy)", "R (ape, pegas, seqinr, ggplot2, dplyr)"],
    tortor: {
      accession: "NC_027488.1",
      length: "16,554 bp",
      genes: "37 standard genes: 13 PCGs, 22 tRNAs, 2 rRNAs, plus a non-coding control region (D-loop)",
      gcContent: "43.14% (AT-biased overall, 56.86% AT)",
      skew: { atSkew: 0.1201, gcSkew: -0.2702 },
      controlRegion: { length: "906 bp", atContent: "69.98%" },
      pcgSpan: "11,409 bp total across all 13 PCGs; ND5 longest (1,824 bp), ATP8 shortest (165 bp)",
      rscu: "Strong translational bias toward Leucine and Serine, driven especially by CUA and UCA codon usage.",
      trnaStructure: "21 of 22 tRNAs fold into the canonical cloverleaf secondary structure; tRNA-Ser(GCT) lacks the dihydrouridine (D) arm.",
      kaks: {
        note: "All 13 PCGs show mean Ka/Ks (ω) < 1.0, consistent with strict purifying selection.",
        mostRelaxed: "ATP8 (ω = 0.0774)",
        mostConserved: "COX3 (ω = 0.0093)"
      },
      phylogeny:
        "Maximum-likelihood tree (IQ-TREE, 1000 ultrafast bootstraps) built from all 13 PCGs places Tor as a distinct, strongly supported monophyletic clade relative to Labeo and Cyprinus outgroups (bootstrap support ~1.00)."
    },
    ilisha: {
      accession: "NC_016682.1",
      length: "16,821 bp",
      gcContent: "48%",
      skew: { atSkew: 0.072, gcSkew: -0.35 },
      controlRegion: { atContent: "63.8%" },
      slidingWindow:
        "Sliding-window polymorphism analysis of the ~1,200 bp control region shows three distinct nucleotide-diversity peaks (centered near 300 bp, 500 bp, 740 bp).",
      kaks: {
        note: "All 13 PCGs again show ω well under 1.0 (purifying selection); ND6 is the least constrained (ω = 0.2109), while COI (ω ≈ 0.0148) and Cyt b (ω ≈ 0.0196) are the most conserved."
      }
    }
  },
  populationGenomics: {
    title: "Population Genomics from Partial COI and Cyt b Markers",
    objective:
      "Compare the resolving power of the COI barcode versus the faster-evolving Cyt b marker for tracing fine-scale population structure, and characterize Tor tor population structure across the Indian subcontinent using Cyt b/COI-type markers.",
    scale: "Over 900 partial mitochondrial gene sequences processed across two species and two markers.",
    tools: ["NCBI E-utilities", "MAFFT", "AliView (trimming)", "IQ-TREE + iTOL", "PopART (Median-Joining haplotype networks)", "Biopython", "R (AMOVA, neutrality tests)", "Cartopy / geopandas (sampling maps)"],
    ilishaCoi: {
      sequencesDownloaded: 343,
      sequencesAfterTrimming: 329,
      uniqueHaplotypes: 78,
      singletonHaplotypes: 53,
      mostCommonHaplotype: "H1 (frequency 86)",
      amova: { amongPopulationsPct: "41.89%", phiSt: 0.4189, pValue: "< 0.001" }
    },
    ilishaCytB: {
      sequencesDownloaded: 583,
      sequencesAfterDedup: 580,
      uniqueHaplotypes: 293,
      lengthRange: "250–16,821 bp (avg. 961.6 bp before trimming of complete-genome-length outliers)"
    },
    comparison: {
      conclusion:
        "Cyt b substantially outperforms COI for intra-species phylogeography in T. ilisha: 243 unique lineages vs. 78 for COI, and higher haplotype diversity (Hd = 0.9576 vs. 0.8809).",
      tajimasD: "Both markers show negative Tajima's D (COI: -2.0442, Cyt b: -2.5462), consistent with an excess of rare variants / population expansion signal."
    },
    tortorPopgen: {
      sequences: 251,
      alignmentLength: "525 bp",
      polymorphicSites: "407 of 525 (77.52%)",
      geographicSpread:
        "Sampled across numerous Indian states/regions (Madhya Pradesh, Rajasthan, Chhattisgarh, Maharashtra, Uttaranchal, and others) plus limited Bangladesh/Nepal representation.",
      amova: { amongPopulationsPct: "46.22%", withinPopulationsPct: "53.78%" },
      diversityHighlights:
        "Madhya Pradesh (n=88) shows the highest haplotype count (45) and nucleotide diversity among well-sampled populations; several small-n populations show 0 or 1 haplotype and were not testable for neutrality (N<3)."
    }
  },
  novelty: {
    level: "Self-assessed as Level 3 (Applied Novelty), enhanced by Level 2 (Optimization through custom pipeline engineering).",
    points: [
      "WGS of Tor tor: standard assembly/annotation algorithms applied to generate the first baseline reference genome for this specific, under-characterized regional Mahseer strain.",
      "Mitogenomics: custom Python/R scripts automating RSCU, Ka/Ks, and skew calculations replaced slow, manual GUI-based workflows.",
      "Population genomics: automated alignment and polymorphism extraction across 900+ sequences provided a quantitative demonstration that Cyt b outperforms COI for this species' phylogeography."
    ]
  },
  limitations: [
    "Mitochondrial genome analysis relied on published NCBI reference genomes rather than newly sequenced material; direct sequencing is recommended for future work.",
    "Large raw WGS datasets (>75 GB) required careful computational resource management under hardware constraints.",
    "Author's stated hardware wishlist for future large-scale work: 256 GB–1 TB RAM, 4 TB storage."
  ],
  compute: {
    os: "Linux (Ubuntu)",
    envManager: "Conda",
    languages: "Python 3.10/3.11 (pandas, NumPy, matplotlib, seaborn, Biopython, SciPy), R 4.3/4.5 (ape, pegas, seqinr, ggplot2, dplyr)"
  }
};
