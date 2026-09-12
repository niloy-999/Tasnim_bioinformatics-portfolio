# Tasnim Ul Islam — Bioinformatics Research Portfolio

A Next.js 14 (App Router) + TypeScript + Tailwind CSS academic/research portfolio site,
built from verified content in three source documents: the undergraduate thesis report,
the BFRI internship report, and the academic CV.

## ⚠️ Important: this was built without network access

This project was scaffolded in a sandboxed environment with **no internet access**, so
`npm install` and `next build` could not be run or verified here. The code was written
carefully and follows standard Next.js 14 App Router conventions, but **you must run a
build yourself before deploying** to catch anything that needs fixing:

```bash
npm install
npm run dev      # local dev server at http://localhost:3000
npm run build    # production build — run this before deploying, and fix any errors it reports
```

If `next build` reports type errors or missing dependencies, they should be small and
mechanical (e.g. a missing `@types/*` package) — nothing in the content or page logic
was left unfinished.

## Stack

- Next.js 14 (App Router), TypeScript, Tailwind CSS
- Fonts: Source Serif 4 (headings), IBM Plex Sans (body/UI), IBM Plex Mono (data/sequences) — via `next/font/google`
- No chart library dependency — all charts (bar charts, confusion matrix, architecture
  diagram) are hand-built SVG/React components in `components/`, so there's nothing to
  verify against an external API surface I couldn't test.
- Dark mode via a `class` strategy + a small inline script (`components/ThemeScript.tsx`)
  to avoid a flash of the wrong theme.
- `lucide-react` is the only runtime UI dependency beyond React/Next itself.

## Project structure

```
app/                  Routes (App Router). One folder per page.
  page.tsx            Homepage
  about/               /about
  research/            /research (index), /research/bfri, /research/mitochondrial-genomics
  thesis/              /thesis
  projects/            /projects (index), /projects/bioseqinsight, /projects/scrna-pipeline
  publications/        /publications
  timeline/            /timeline
  skills/              /skills
  cv/                  /cv
  contact/             /contact
  sitemap.ts           Auto-generated sitemap.xml
components/           Reusable UI: Navbar, Footer, Figure, cards, charts, diagrams
content/               Typed data files — this is the "content management" layer
public/
  figures/             Real extracted figures from the thesis + BFRI report
  cv/                  The actual CV PDF (served for download on /cv)
```

## Adding a new project or updating content

There's no CMS/MDX layer (deliberately, to keep the build simple and dependency-light).
Content lives in typed TypeScript objects under `content/`:

- `content/site.ts` — name, contact info, social links
- `content/thesis.ts` — every number on the /thesis page
- `content/bfri.ts` — every number on the BFRI and mitochondrial-genomics pages
- `content/projects.ts` — project cards + case studies (add an object here, then add a
  matching page under `app/projects/<slug>/page.tsx` using `<ProjectTemplate project={...} />`)
- `content/publications.ts` — publications and presentations
- `content/skills.ts`, `content/timeline.ts`

To add a new project: add an entry to the `projects` array in `content/projects.ts`,
then create `app/projects/<slug>/page.tsx` copying the pattern in
`app/projects/bioseqinsight/page.tsx`.

## Content inventory & what still needs your input

Everything in `content/` was taken directly from the three PDFs you provided (thesis
report, BFRI internship report, CV) — nothing was invented. A few things are flagged or
still open:

1. **Domain** — `metadataBase` in `app/layout.tsx` and `app/sitemap.ts` currently point
   to a placeholder `https://example.com`. Replace with your real domain once chosen (per
   your own brief's domain-strategy section — `niloy.bio` etc.).
2. **Thesis GitHub repository** — the thesis report doesn't give a repo URL, so
   `content/thesis.ts` marks this `[NEEDS VERIFICATION]`. Add the real link once you
   decide whether/how to publish the code and dataset.
3. **BFRI manuscript repos/data accessions** — some accession numbers in the internship
   report are partially redacted in the source PDF itself (e.g. SRR/GCA numbers); I did
   not fabricate the missing digits, so those fields use the same level of detail as the
   source document.
4. **A minor inconsistency in the thesis source PDF itself**: the encoder-selection table
   lists ESM-2 (`esm2_t30_150M_UR50D`) with a 640-dim embedding, but the architecture
   section states the cross-modal implementation uses a 1280-dim protein representation
   (i.e. a different ESM-2 checkpoint size was used at that stage). I represented both
   numbers as given rather than silently picking one — see `content/thesis.ts →
   architecture.proteinEncoder`.
5. **Live demos** — BioSeqInsight and the scRNA-seq platform are currently
   local/desktop tools per your CV (no hosted demo URL), so no "Live Demo" link is shown.
   If you deploy either as a hosted app, add a `demo:` field to its entry in
   `content/projects.ts`.
6. **GitHub API integration** (live star counts, latest commit, etc.) was not wired up —
   it would need a server component with authenticated API calls, which I couldn't test
   without network access. The "Other repositories" list on `/projects` is static, taken
   from your repo listing.

## What was intentionally scoped down

Given the size of the original brief (50 sections), a few "nice-to-have" items were not
built, to keep everything else genuinely correct and complete rather than half-working:

- No live GitHub API integration (see above).
- No dedicated `/analyses` gallery or `/tools` page — tool/analysis content is folded
  into `/projects` and the two `/research/*` pages instead.
- No custom interactive phylogenetic tree viewer (zoom/collapse/search) — the ML tree,
  haplotype network, mitogenome maps, tRNA structures, and cross-attention heatmap are
  shown as real static figures extracted from your reports via the `Figure` component
  (which does support click-to-expand/fullscreen).
- No MDX content pipeline — see "Adding a new project" above for the TypeScript-based
  alternative actually used.

## Figures

All images in `public/figures/` are real figures extracted directly from your PDFs
(the thesis report and the BFRI internship report), not placeholders or AI-generated
illustrations. Each is captioned with its source in the `Figure` component.
