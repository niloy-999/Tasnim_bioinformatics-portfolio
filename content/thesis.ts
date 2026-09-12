export const thesis = {
  title:
    "A DNA-Protein Cross-Modal Deep Learning Framework for Discovering Plastic-Degrading Genes in Bacteria with In Silico Analysis",
  course: "CSM 4230: Project Work and Report",
  degree: "B.Sc. in Bioinformatics Engineering",
  institution: "Bangladesh Agricultural University, Mymensingh-2202, Bangladesh",
  date: "August 2026",
  status: "Completed undergraduate project report",
  authorNote:
    "Equal-contribution, second author (with Shahad Shahriar as first author/submitting student). A journal version with additional experimental validation is in preparation.",
  supervisors: [
    { name: "Dr. Machbah Uddin", role: "Supervisor, Associate Professor, Dept. of Computer Science and Mathematics, BAU" },
    { name: "Dr. Fahmida Khatun", role: "Co-Supervisor, Professor, Institute of Biotechnology, BAU" }
  ],
  researchQuestion:
    "Can protein sequence information provide functional supervision to a DNA representation during training, improving prediction of plastic-degrading genes, while allowing the final model to predict from DNA sequence alone at inference?",
  motivation: [
    "Global plastic production exceeds 300 million tonnes per year, and conventional plastics such as LDPE/HDPE can take on the order of centuries to degrade naturally.",
    "Microbial plastic biodegradation is real but only a limited number of responsible genes/proteins have been experimentally characterized.",
    "Laboratory screening methods for degradation activity (weight loss assays, FTIR, SEM, GC-MS) are accurate but slow, expensive, and hard to scale to genome-wide candidate search.",
    "Most sequences in public databases (UniProt, NCBI) are not experimentally annotated, so a computational method that prioritizes promising candidates before wet-lab validation has direct practical value."
  ],
  biologicalChallenge:
    "Plastic-degrading enzymes are hydrophobic, structurally varied, and lack a single conserved sequence motif that alignment-based tools (BLAST, HMMER) can reliably detect across distant homologs. DNA-only models miss functional context that is more directly encoded in protein structure and biochemistry; protein-only models cannot be applied directly to raw genomic scans without first knowing the coding sequence. The framework addresses this by using protein information as a training-time teacher for a DNA-centric model that remains usable directly on genomic DNA.",
  dataset: {
    positiveSource:
      "PAZy (Plastics-Active Enzymes Database) and PlasticDB — experimentally characterized plastic-active enzymes/microorganisms.",
    negativeSource:
      "Reviewed UniProt entries for related enzyme families (ester hydrolases, oxidative enzymes) with explicit plastic-degradation evidence excluded by name/activity/function.",
    cdsSource:
      "Corresponding CDS retrieved via EMBL/GenBank/DDBJ accessions, primarily through the European Nucleotide Archive (ENA) with NCBI as fallback, to keep each DNA–protein pair from the same annotated gene.",
    initialPositive: 758,
    finalPositive: 549,
    finalNegative: 952,
    finalTotal: 1501,
    redundancyReduction:
      "Exact de-duplication within and across classes, followed by CD-HIT clustering of protein sequences at 60% identity, used as the unit for train/validation/test assignment (cluster-aware split) to minimize homology-driven data leakage.",
    splits: [
      { split: "Training", total: 1048, positive: 396, negative: 652, clusters: 615 },
      { split: "Validation", total: 230, positive: 71, negative: 159, clusters: 140 },
      { split: "Test", total: 223, positive: 82, negative: 141, clusters: 157 }
    ],
    leakageCheck:
      "Pairwise cluster-overlap analysis confirmed zero shared protein clusters between training/validation, training/test, and validation/test partitions.",
    cdsLength: "90–22,563 bp across splits (training mean ≈ 1,262 bp, median 1,133 bp)",
    proteinLength: "13–4,558 aa (training mean ≈ 385 aa, median 364 aa)"
  },
  architecture: {
    dnaEncoder: "DNABERT-2 (117M params, 768-dim hidden representation, BPE tokenization, ~512 token context)",
    proteinEncoder: "ESM-2 (150M params used for selection benchmark; 1280-dim hidden representation in the cross-modal implementation, per-residue tokenization)",
    sharedSpace: "512-dimensional shared projection space for both modalities",
    alignment: "Symmetric InfoNCE contrastive alignment (temperature 0.07) trains only the projection layers while foundation-model weights stay fixed at this stage.",
    crossAttention:
      "8-head bidirectional token-level cross-attention (attention dim 512, 64 per head) computed in both directions — DNA-as-query/protein-as-key-value and the reverse — each followed by a residual connection and layer normalization.",
    dnaCentric:
      "The selected model (CM-5) pools only the DNA-side cross-attended representation (mean pooling over valid DNA tokens) for the final 512-d protein-guided DNA representation, rather than concatenating both modalities at the classification head.",
    classifier: "Linear(512→256) → ReLU → Dropout(0.2) → Linear(256→2), trained with cross-entropy.",
    inferenceProperty:
      "During training, both DNA and protein representations participate in cross-modal learning via contrastive alignment and cross-attention. During inference, only the DNA sequence is required — the model does not need a paired protein sequence to score a candidate gene, which matters because most genome-wide screening starts from DNA alone."
  },
  training: {
    optimizer: "AdamW, learning rate 1×10⁻⁴, weight decay 0.01",
    loss: "Cross-entropy (classification head); symmetric InfoNCE (alignment stage)",
    epochs: "20 epochs for the CM-3/CM-4/CM-5 cross-modal stages; foundation-model encoders frozen during cross-modal training",
    hardware: "NVIDIA GeForce RTX 5090 (31.35 GB), PyTorch 2.11.0+cu128, CUDA 12.8, Transformers 4.38.2, PEFT 0.10.0"
  },
  encoderSelection: {
    dna: [
      { model: "DNABERT-2", accuracy: 0.906, precision: 0.867, recall: 0.878, f1: 0.873, rocAuc: 0.955, prAuc: 0.94, mcc: 0.798 },
      { model: "HyenaDNA", accuracy: 0.848, precision: 0.853, recall: 0.707, f1: 0.773, rocAuc: 0.875, prAuc: 0.837, mcc: 0.667 },
      { model: "Nucleotide Transformer v2", accuracy: 0.83, precision: 0.806, recall: 0.707, f1: 0.753, rocAuc: 0.864, prAuc: 0.839, mcc: 0.627 }
    ],
    protein: [
      { model: "ESM-2", accuracy: 0.901, precision: 0.866, recall: 0.866, f1: 0.866, rocAuc: 0.956, prAuc: 0.938, mcc: 0.788 },
      { model: "ProtT5", accuracy: 0.897, precision: 0.847, recall: 0.878, f1: 0.862, rocAuc: 0.956, prAuc: 0.934, mcc: 0.78 },
      { model: "Ankh", accuracy: 0.803, precision: 0.738, recall: 0.72, f1: 0.728, rocAuc: 0.872, prAuc: 0.809, mcc: 0.574 }
    ],
    note:
      "Selection was based exclusively on training/validation-stage performance under an independent representation-probe (SVM) framework; the held-out test set was untouched until the final evaluation."
  },
  adaptation: {
    dnabert2: [
      { strategy: "Frozen", trainablePct: 0.17, valF1: 0.7307, valPrAuc: 0.7453, valMcc: 0.599 },
      { strategy: "Partial fine-tuning", trainablePct: 24.31, valF1: 0.7853, valPrAuc: 0.8262, valMcc: 0.68 },
      { strategy: "Full fine-tuning", trainablePct: 100.0, valF1: 0.7451, valPrAuc: 0.7756, valMcc: 0.622 },
      { strategy: "LoRA", trainablePct: null, valF1: 0.7757, valPrAuc: 0.7926, valMcc: 0.669 },
      { strategy: "IA3", trainablePct: 0.19, valF1: 0.7721, valPrAuc: 0.7816, valMcc: 0.662 }
    ],
    esm2: [
      { strategy: "Frozen", trainablePct: null, valAcc: 0.904, valF1: 0.851, valPrAuc: 0.912, valMcc: 0.782 },
      { strategy: "Partial fine-tuning", trainablePct: 12.15, valAcc: 0.939, valF1: 0.902, valPrAuc: 0.939, valMcc: 0.858 },
      { strategy: "Full fine-tuning", trainablePct: 100.0, valAcc: 0.926, valF1: 0.877, valPrAuc: 0.928, valMcc: 0.622 },
      { strategy: "LoRA", trainablePct: 0.41, valAcc: 0.926, valF1: 0.882, valPrAuc: 0.938, valMcc: 0.829 },
      { strategy: "IA3", trainablePct: null, valAcc: 0.878, valF1: 0.805, valPrAuc: 0.903, valMcc: 0.717 }
    ],
    conclusion:
      "Partial fine-tuning gave the best validation trade-off for both encoders; full fine-tuning underperformed partial fine-tuning on every evaluated metric for DNABERT-2."
  },
  crossModalProgression: [
    { model: "DNABERT-2 only", modality: "DNA", accuracy: 0.848, f1: 0.785, mcc: 0.684 },
    { model: "ESM-2 only", modality: "Protein", accuracy: 0.939, f1: 0.903, mcc: 0.859 },
    { model: "CM-2 (InfoNCE alignment)", modality: "DNA + Protein", accuracy: 0.835, f1: 0.821, mcc: 0.73 },
    { model: "CM-3 (Cross-attention)", modality: "DNA + Protein", accuracy: 0.845, f1: 0.832, mcc: 0.745 },
    { model: "CM-4 (Alignment + attention)", modality: "DNA + Protein", accuracy: 0.855, f1: 0.843, mcc: 0.76 },
    { model: "CM-5 (DNA-centric, selected)", modality: "DNA-centric", accuracy: 0.9087, f1: 0.8609, mcc: 0.7965 }
  ],
  alignment: {
    method: "Symmetric InfoNCE, temperature 0.07, shared 512-d projection",
    bestEpoch: 19,
    trainingLossInitial: 1.546,
    trainingLossFinal: 0.28,
    validationLossBest: 0.552,
    meanPositiveCosineAtBest: 0.668,
    meanPositiveCosineMax: 0.682
  },
  finalTest: {
    accuracy: 0.9103,
    balancedAccuracy: 0.8934,
    precision: 0.9189,
    recall: 0.8293,
    f1: 0.8718,
    rocAuc: 0.968,
    prAuc: 0.9575,
    mcc: 0.8056,
    confusionMatrix: { tn: 135, fp: 6, fn: 14, tp: 68 }
  },
  limitations: [
    "Performance depends on the size and diversity of experimentally verified plastic-degradation genes currently in PAZy/PlasticDB; the curated dataset is relatively small.",
    "Training DNABERT-2 and ESM-2 jointly requires substantial GPU memory even with parameter-efficient adaptation.",
    "In silico performance is promising but wet-lab validation of predicted candidate genes has not yet been performed.",
    "A full grid search over all architectural and training hyperparameters could not be completed due to GPU/time constraints.",
    "Predictions for highly divergent or previously unseen degradation mechanisms should be interpreted cautiously despite cluster-aware splitting."
  ],
  futureWork: [
    "Determine whether learned cross-attention patterns correspond to biologically meaningful motifs or regulatory regions.",
    "Design synthetic plasmids for high-confidence candidate genes, express and purify the proteins, and test degradation activity experimentally (with HPLC quantification of degradation products).",
    "Incorporate 3D protein structure information (e.g. via structure-aware encoders) and expand the dataset to a wider range of environmental pollutants and their degradation enzymes."
  ],
  githubNote:
    "The project code, environment, and dataset composition are intended to be released as supplementary information alongside the report; repository link to be added here once published. [NEEDS VERIFICATION]"
};
