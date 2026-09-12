export default function ArchitectureDiagram() {
  return (
    <div className="overflow-x-auto border border-line bg-paper p-4 dark:border-line-dark dark:bg-paper-dark">
      <svg viewBox="0 0 980 420" className="min-w-[760px]" role="img" aria-label="DNA-protein cross-modal architecture diagram">
        <defs>
          <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" className="fill-ink-500 dark:fill-ink-300" />
          </marker>
        </defs>

        {/* DNA branch */}
        <g fontFamily="var(--font-mono)" fontSize="11">
          <rect x="20" y="30" width="200" height="46" rx="2" className="fill-ink-100 stroke-ink-400 dark:fill-ink-800 dark:stroke-ink-500" strokeWidth="1" />
          <text x="120" y="58" textAnchor="middle" className="fill-ink-800 dark:fill-ink-100">DNA sequence (CDS)</text>

          <line x1="120" y1="76" x2="120" y2="106" className="stroke-ink-400 dark:stroke-ink-500" strokeWidth="1.5" markerEnd="url(#arrow)" />

          <rect x="20" y="106" width="200" height="46" rx="2" className="fill-amber-100 stroke-amber-500 dark:fill-amber-900/30 dark:stroke-amber-500" strokeWidth="1" />
          <text x="120" y="128" textAnchor="middle" className="fill-ink-900 dark:fill-amber-200" fontWeight="600">DNABERT-2</text>
          <text x="120" y="142" textAnchor="middle" className="fill-ink-600 dark:fill-amber-300/80" fontSize="9">768-dim, partial fine-tune</text>

          <line x1="120" y1="152" x2="120" y2="182" className="stroke-ink-400 dark:stroke-ink-500" strokeWidth="1.5" markerEnd="url(#arrow)" />

          <rect x="20" y="182" width="200" height="40" rx="2" className="fill-ink-100 stroke-ink-400 dark:fill-ink-800 dark:stroke-ink-500" strokeWidth="1" />
          <text x="120" y="206" textAnchor="middle" className="fill-ink-800 dark:fill-ink-100" fontSize="10">512-d DNA representation</text>
        </g>

        {/* Protein branch */}
        <g fontFamily="var(--font-mono)" fontSize="11">
          <rect x="20" y="250" width="200" height="46" rx="2" className="fill-ink-100 stroke-ink-400 dark:fill-ink-800 dark:stroke-ink-500" strokeWidth="1" />
          <text x="120" y="278" textAnchor="middle" className="fill-ink-800 dark:fill-ink-100">Protein sequence</text>

          <line x1="120" y1="296" x2="120" y2="326" className="stroke-ink-400 dark:stroke-ink-500" strokeWidth="1.5" markerEnd="url(#arrow)" />

          <rect x="20" y="326" width="200" height="46" rx="2" className="fill-amber-100 stroke-amber-500 dark:fill-amber-900/30 dark:stroke-amber-500" strokeWidth="1" />
          <text x="120" y="348" textAnchor="middle" className="fill-ink-900 dark:fill-amber-200" fontWeight="600">ESM-2</text>
          <text x="120" y="362" textAnchor="middle" className="fill-ink-600 dark:fill-amber-300/80" fontSize="9">1280-dim, partial fine-tune</text>

          <line x1="220" y1="349" x2="330" y2="349" className="stroke-ink-400 dark:stroke-ink-500" strokeWidth="1.5" />
          <line x1="330" y1="349" x2="330" y2="240" className="stroke-ink-400 dark:stroke-ink-500" strokeWidth="1.5" markerEnd="url(#arrow)" />
        </g>

        {/* Convergence to cross-attention */}
        <line x1="220" y1="127" x2="330" y2="127" className="stroke-ink-400 dark:stroke-ink-500" strokeWidth="1.5" />
        <line x1="330" y1="127" x2="330" y2="200" className="stroke-ink-400 dark:stroke-ink-500" strokeWidth="1.5" markerEnd="url(#arrow)" />

        <g fontFamily="var(--font-mono)" fontSize="11">
          <rect x="330" y="140" width="230" height="100" rx="2" className="fill-ink-800 stroke-ink-900 dark:fill-ink-900 dark:stroke-amber-500" strokeWidth="1.5" />
          <text x="445" y="168" textAnchor="middle" className="fill-paper" fontWeight="600">Bidirectional</text>
          <text x="445" y="184" textAnchor="middle" className="fill-paper" fontWeight="600">Cross-Attention</text>
          <text x="445" y="202" textAnchor="middle" className="fill-ink-300" fontSize="9">8 heads · 512-dim · InfoNCE-aligned</text>
          <text x="445" y="216" textAnchor="middle" className="fill-ink-300" fontSize="9">DNA ↔ protein, both directions</text>
        </g>

        <line x1="560" y1="190" x2="620" y2="190" className="stroke-ink-400 dark:stroke-ink-500" strokeWidth="1.5" markerEnd="url(#arrow)" />

        <g fontFamily="var(--font-mono)" fontSize="11">
          <rect x="620" y="150" width="180" height="80" rx="2" className="fill-ink-100 stroke-ink-400 dark:fill-ink-800 dark:stroke-ink-500" strokeWidth="1" />
          <text x="710" y="178" textAnchor="middle" className="fill-ink-800 dark:fill-ink-100" fontWeight="600">DNA-centric pool</text>
          <text x="710" y="196" textAnchor="middle" className="fill-ink-600 dark:fill-ink-300" fontSize="9">Mean pooling over</text>
          <text x="710" y="209" textAnchor="middle" className="fill-ink-600 dark:fill-ink-300" fontSize="9">DNA-side tokens only</text>
        </g>

        <line x1="800" y1="190" x2="860" y2="190" className="stroke-ink-400 dark:stroke-ink-500" strokeWidth="1.5" markerEnd="url(#arrow)" />

        <g fontFamily="var(--font-mono)" fontSize="11">
          <rect x="860" y="140" width="105" height="100" rx="2" className="fill-amber-500 stroke-amber-600" strokeWidth="1" />
          <text x="912" y="170" textAnchor="middle" className="fill-ink-900" fontWeight="700" fontSize="10">Classifier</text>
          <text x="912" y="186" textAnchor="middle" className="fill-ink-900" fontSize="9">512→256→2</text>
          <text x="912" y="204" textAnchor="middle" className="fill-ink-900" fontSize="9">degrading /</text>
          <text x="912" y="216" textAnchor="middle" className="fill-ink-900" fontSize="9">non-degrading</text>
        </g>

        {/* Training vs inference note */}
        <g fontFamily="var(--font-sans)" fontSize="11">
          <line x1="20" y1="380" x2="965" y2="380" strokeDasharray="3 3" className="stroke-ink-300 dark:stroke-ink-600" />
          <text x="20" y="400" className="fill-ink-500 dark:fill-ink-400">
            Training: both branches active. Inference: DNA branch alone is sufficient — no paired protein sequence required.
          </text>
        </g>
      </svg>
    </div>
  );
}
