"use client";

import { useState, useMemo } from "react";
import {
  Search,
  X,
  BookOpen,
  FileCheck2,
  FlaskConical,
  Presentation,
  Mic,
  Calendar,
  MapPin,
  Sparkles,
  Copy,
  Check,
  Layers,
  Filter,
  ArrowUpRight
} from "lucide-react";
import Card3D from "@/components/Card3D";
import PublicationCard from "@/components/PublicationCard";
import { publications, presentations, type Publication, type Presentation as PresentationType } from "@/content/publications";

type FilterTab = "all" | "peer-reviewed" | "under-review" | "in-revision" | "in-preparation" | "conferences";

export default function PublicationsExplorer() {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Summary counts
  const countPeer = publications.filter((p) => p.status === "Peer-reviewed").length;
  const countReview = publications.filter((p) => p.status === "Under review").length;
  const countRevision = publications.filter((p) => p.status === "In revision").length;
  const countPrep = publications.filter((p) => p.status === "In preparation").length;
  const countConferences = presentations.length;
  const totalCount = publications.length + presentations.length;

  // Filter logic
  const filteredPubs = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return publications.filter((p) => {
      // Tab filter
      if (activeTab === "peer-reviewed" && p.status !== "Peer-reviewed") return false;
      if (activeTab === "under-review" && p.status !== "Under review") return false;
      if (activeTab === "in-revision" && p.status !== "In revision") return false;
      if (activeTab === "in-preparation" && p.status !== "In preparation") return false;
      if (activeTab === "conferences") return false; // Handled separately

      // Search query filter
      if (!q) return true;
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchAuthors = p.authors.toLowerCase().includes(q);
      const matchVenue = p.venue.toLowerCase().includes(q);
      const matchTopic = p.topic.toLowerCase().includes(q);
      const matchSummary = p.summary ? p.summary.toLowerCase().includes(q) : false;
      const matchKeywords = p.keywords ? p.keywords.some((k) => k.toLowerCase().includes(q)) : false;

      return matchTitle || matchAuthors || matchVenue || matchTopic || matchSummary || matchKeywords;
    });
  }, [activeTab, searchQuery]);

  const filteredPresentations = useMemo(() => {
    if (activeTab !== "all" && activeTab !== "conferences") return [];
    const q = searchQuery.toLowerCase().trim();
    return presentations.filter((pres) => {
      if (!q) return true;
      const matchTitle = pres.title.toLowerCase().includes(q);
      const matchVenue = pres.venue.toLowerCase().includes(q);
      const matchTopic = pres.topic ? pres.topic.toLowerCase().includes(q) : false;
      const matchLocation = pres.location ? pres.location.toLowerCase().includes(q) : false;
      const matchAbstract = pres.abstractSnippet ? pres.abstractSnippet.toLowerCase().includes(q) : false;

      return matchTitle || matchVenue || matchTopic || matchLocation || matchAbstract;
    });
  }, [activeTab, searchQuery]);

  const copyPresentationCitation = (pres: PresentationType, index: number) => {
    const text = `Ul Islam, T. (${pres.date}). "${pres.title}". ${pres.type} presented at ${pres.venue}, ${pres.location || ""}.`;
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="mt-8 space-y-10">
      {/* 4 Stat Overview Badges */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {/* Peer-reviewed */}
        <button
          onClick={() => { setActiveTab("peer-reviewed"); setSearchQuery(""); }}
          className={`group flex items-center gap-3 rounded-2xl border p-4 text-left backdrop-blur-md transition-all duration-300 sm:p-5 ${
            activeTab === "peer-reviewed"
              ? "border-emerald-500 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
              : "border-line/80 bg-white/70 hover:border-emerald-500/40 hover:bg-white/90 dark:border-line-dark/80 dark:bg-slate-900/60 dark:hover:border-emerald-500/40"
          }`}
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
            <BookOpen size={20} />
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif text-2xl font-bold text-ink-900 dark:text-white">{countPeer}</span>
              <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">PUBLISHED</span>
            </div>
            <p className="mt-0.5 text-xs text-ink-600 dark:text-ink-300">Springer LNNS</p>
          </div>
        </button>

        {/* Under Review & Revision */}
        <button
          onClick={() => { setActiveTab("under-review"); setSearchQuery(""); }}
          className={`group flex items-center gap-3 rounded-2xl border p-4 text-left backdrop-blur-md transition-all duration-300 sm:p-5 ${
            activeTab === "under-review" || activeTab === "in-revision"
              ? "border-bio-cyan bg-bio-cyan/10 shadow-[0_0_20px_rgba(6,182,212,0.2)]"
              : "border-line/80 bg-white/70 hover:border-bio-cyan/40 hover:bg-white/90 dark:border-line-dark/80 dark:bg-slate-900/60 dark:hover:border-cyan-500/40"
          }`}
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-bio-cyan/15 text-bio-cyan dark:bg-cyan-500/20 dark:text-cyan-400">
            <FileCheck2 size={20} />
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif text-2xl font-bold text-ink-900 dark:text-white">{countReview + countRevision}</span>
              <span className="text-[11px] font-semibold text-bio-cyan dark:text-cyan-400">REVIEW / REVISION</span>
            </div>
            <p className="mt-0.5 text-xs text-ink-600 dark:text-ink-300">Hilsa Mitogenomics</p>
          </div>
        </button>

        {/* In Preparation */}
        <button
          onClick={() => { setActiveTab("in-preparation"); setSearchQuery(""); }}
          className={`group flex items-center gap-3 rounded-2xl border p-4 text-left backdrop-blur-md transition-all duration-300 sm:p-5 ${
            activeTab === "in-preparation"
              ? "border-purple-500 bg-purple-500/10 shadow-[0_0_20px_rgba(168,85,247,0.2)]"
              : "border-line/80 bg-white/70 hover:border-purple-500/40 hover:bg-white/90 dark:border-line-dark/80 dark:bg-slate-900/60 dark:hover:border-purple-500/40"
          }`}
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-500/15 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400">
            <FlaskConical size={20} />
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif text-2xl font-bold text-ink-900 dark:text-white">{countPrep}</span>
              <span className="text-[11px] font-semibold text-purple-600 dark:text-purple-400">IN PREPARATION</span>
            </div>
            <p className="mt-0.5 text-xs text-ink-600 dark:text-ink-300">WGS, AI & Genomics</p>
          </div>
        </button>

        {/* Conferences & Talks */}
        <button
          onClick={() => { setActiveTab("conferences"); setSearchQuery(""); }}
          className={`group flex items-center gap-3 rounded-2xl border p-4 text-left backdrop-blur-md transition-all duration-300 sm:p-5 ${
            activeTab === "conferences"
              ? "border-amber-500 bg-amber-500/10 shadow-[0_0_20px_rgba(245,158,11,0.2)]"
              : "border-line/80 bg-white/70 hover:border-amber-500/40 hover:bg-white/90 dark:border-line-dark/80 dark:bg-slate-900/60 dark:hover:border-amber-500/40"
          }`}
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400">
            <Presentation size={20} />
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif text-2xl font-bold text-ink-900 dark:text-white">{countConferences}</span>
              <span className="text-[11px] font-semibold text-amber-600 dark:text-amber-400">TALKS & POSTERS</span>
            </div>
            <p className="mt-0.5 text-xs text-ink-600 dark:text-ink-300">Symposia & Presentations</p>
          </div>
        </button>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col gap-4 rounded-2xl border border-line/80 bg-white/70 p-4 shadow-sm backdrop-blur-md dark:border-line-dark/80 dark:bg-slate-900/70 sm:p-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setActiveTab("all")}
              className={`rounded-xl px-3.5 py-1.5 font-mono text-xs font-semibold transition-all ${
                activeTab === "all"
                  ? "btn-primary"
                  : "border border-line bg-paper text-ink-600 hover:border-bio-cyan/40 hover:text-ink-900 dark:border-line-dark dark:bg-slate-800/80 dark:text-ink-300 dark:hover:border-cyan-400"
              }`}
            >
              All Outputs ({totalCount})
            </button>

            <button
              onClick={() => setActiveTab("peer-reviewed")}
              className={`rounded-xl px-3.5 py-1.5 font-mono text-xs font-semibold transition-all ${
                activeTab === "peer-reviewed"
                  ? "bg-emerald-600 text-white shadow-[0_0_12px_rgba(16,185,129,0.4)] dark:bg-emerald-500 dark:text-slate-950"
                  : "border border-line bg-paper text-ink-600 hover:border-emerald-500/40 hover:text-ink-900 dark:border-line-dark dark:bg-slate-800/80 dark:text-ink-300 dark:hover:border-emerald-400"
              }`}
            >
              Peer-Reviewed ({countPeer})
            </button>

            <button
              onClick={() => setActiveTab("under-review")}
              className={`rounded-xl px-3.5 py-1.5 font-mono text-xs font-semibold transition-all ${
                activeTab === "under-review"
                  ? "bg-cyan-600 text-white shadow-[0_0_12px_rgba(6,182,212,0.4)] dark:bg-cyan-400 dark:text-slate-950"
                  : "border border-line bg-paper text-ink-600 hover:border-cyan-500/40 hover:text-ink-900 dark:border-line-dark dark:bg-slate-800/80 dark:text-ink-300 dark:hover:border-cyan-400"
              }`}
            >
              Under Review ({countReview})
            </button>

            <button
              onClick={() => setActiveTab("in-revision")}
              className={`rounded-xl px-3.5 py-1.5 font-mono text-xs font-semibold transition-all ${
                activeTab === "in-revision"
                  ? "bg-amber-600 text-white shadow-[0_0_12px_rgba(245,158,11,0.4)] dark:bg-amber-400 dark:text-slate-950"
                  : "border border-line bg-paper text-ink-600 hover:border-amber-500/40 hover:text-ink-900 dark:border-line-dark dark:bg-slate-800/80 dark:text-ink-300 dark:hover:border-amber-400"
              }`}
            >
              In Revision ({countRevision})
            </button>

            <button
              onClick={() => setActiveTab("in-preparation")}
              className={`rounded-xl px-3.5 py-1.5 font-mono text-xs font-semibold transition-all ${
                activeTab === "in-preparation"
                  ? "bg-purple-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.4)] dark:bg-purple-400 dark:text-slate-950"
                  : "border border-line bg-paper text-ink-600 hover:border-purple-500/40 hover:text-ink-900 dark:border-line-dark dark:bg-slate-800/80 dark:text-ink-300 dark:hover:border-purple-400"
              }`}
            >
              In Preparation ({countPrep})
            </button>

            <button
              onClick={() => setActiveTab("conferences")}
              className={`rounded-xl px-3.5 py-1.5 font-mono text-xs font-semibold transition-all ${
                activeTab === "conferences"
                  ? "bg-amber-500 text-white shadow-[0_0_12px_rgba(245,158,11,0.4)] dark:bg-amber-400 dark:text-slate-950"
                  : "border border-line bg-paper text-ink-600 hover:border-amber-500/40 hover:text-ink-900 dark:border-line-dark dark:bg-slate-800/80 dark:text-ink-300 dark:hover:border-amber-400"
              }`}
            >
              Conferences ({countConferences})
            </button>
          </div>

          {/* Real-time Search Box */}
          <div className="relative min-w-[260px] lg:w-72">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400 dark:text-ink-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topic, title, Springer..."
              className="w-full rounded-xl border border-line bg-paper/90 py-2 pl-9 pr-8 text-xs text-ink-900 placeholder:text-ink-400 focus:border-bio-cyan focus:outline-none focus:ring-1 focus:ring-bio-cyan dark:border-line-dark dark:bg-slate-800/90 dark:text-ink-100 dark:placeholder:text-ink-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-700 dark:text-ink-400 dark:hover:text-white"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Active Query Alert */}
        {searchQuery && (
          <div className="flex items-center justify-between border-t border-line/60 pt-2 text-xs text-ink-500 dark:border-line-dark/60 dark:text-ink-400">
            <span>
              Showing results matching &ldquo;<strong className="text-bio-cyan">{searchQuery}</strong>&rdquo;
            </span>
            <button
              onClick={() => setSearchQuery("")}
              className="font-mono text-xs text-bio-cyan underline decoration-bio-cyan/40 hover:text-bio-cyan/80"
            >
              Clear filter
            </button>
          </div>
        )}
      </div>

      {/* Publications Grid */}
      {filteredPubs.length > 0 && (
        <div>
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-bio-cyan/15 text-bio-cyan dark:bg-cyan-500/20 dark:text-cyan-400">
                <BookOpen size={14} />
              </span>
              <h2 className="font-serif text-lg font-bold text-ink-900 dark:text-ink-100 sm:text-xl">
                Research Papers & Manuscripts ({filteredPubs.length})
              </h2>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {filteredPubs.map((pub) => (
              <Card3D key={pub.title} maxTilt={3} className="h-full">
                <PublicationCard pub={pub} />
              </Card3D>
            ))}
          </div>
        </div>
      )}

      {/* Conferences & Symposia Section */}
      {filteredPresentations.length > 0 && (
        <div className="pt-4">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-amber-500/15 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400">
                <Presentation size={14} />
              </span>
              <h2 className="font-serif text-lg font-bold text-ink-900 dark:text-ink-100 sm:text-xl">
                Conference Talks & Symposia ({filteredPresentations.length})
              </h2>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredPresentations.map((pres, idx) => (
              <Card3D key={pres.title} maxTilt={3} className="h-full">
                <div className="flex h-full flex-col justify-between rounded-2xl border border-line/80 bg-white/75 p-5 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-amber-500/50 hover:shadow-[0_0_20px_rgba(245,158,11,0.15)] dark:border-line-dark/80 dark:bg-slate-900/70 sm:p-6">
                  <div>
                    {/* Top Row: Type & Date */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[11px] font-semibold ${
                        pres.type.includes("Oral")
                          ? "border-amber-500/40 bg-amber-50/80 text-amber-800 dark:border-amber-500/40 dark:bg-amber-950/40 dark:text-amber-300"
                          : "border-purple-500/40 bg-purple-50/80 text-purple-800 dark:border-purple-500/40 dark:bg-purple-950/40 dark:text-purple-300"
                      }`}>
                        {pres.type.includes("Oral") ? <Mic size={11} /> : <Presentation size={11} />}
                        {pres.type}
                      </span>
                      <span className="inline-flex items-center gap-1 font-mono text-xs text-ink-500 dark:text-ink-400">
                        <Calendar size={12} className="text-amber-500" />
                        {pres.date}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="mt-3.5 font-serif text-base font-bold leading-snug text-ink-900 dark:text-ink-100">
                      {pres.title}
                    </h3>

                    {/* Venue & Location */}
                    <div className="mt-3 space-y-1 rounded-xl border border-line/60 bg-paper/60 p-3 text-xs text-ink-700 dark:border-line-dark/60 dark:bg-slate-800/40 dark:text-ink-200">
                      <p className="font-semibold text-ink-800 dark:text-ink-100">{pres.venue}</p>
                      {pres.location && (
                        <div className="flex items-center gap-1 text-ink-500 dark:text-ink-400">
                          <MapPin size={11} className="text-amber-500" />
                          <span>{pres.location}</span>
                        </div>
                      )}
                    </div>

                    {/* Abstract / Summary */}
                    {pres.abstractSnippet && (
                      <p className="mt-3 text-justify text-xs leading-relaxed text-ink-600 dark:text-ink-300">
                        {pres.abstractSnippet}
                      </p>
                    )}

                    {/* Topic */}
                    {pres.topic && (
                      <div className="mt-3 inline-flex items-center gap-1 rounded-md bg-paper px-2 py-0.5 font-mono text-[10px] text-ink-500 dark:bg-slate-800 dark:text-ink-400">
                        <span>Theme: {pres.topic}</span>
                      </div>
                    )}
                  </div>

                  {/* Copy Presentation Citation */}
                  <div className="mt-5 border-t border-line/60 pt-3 dark:border-line-dark/60">
                    <button
                      onClick={() => copyPresentationCitation(pres, idx)}
                      className="inline-flex items-center gap-1.5 font-mono text-xs text-ink-500 transition-colors hover:text-amber-500 dark:text-ink-400 dark:hover:text-amber-400"
                    >
                      {copiedIndex === idx ? (
                        <>
                          <Check size={12} className="text-emerald-500" />
                          <span className="text-emerald-500 font-semibold">Citation Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={12} />
                          <span>Copy Citation</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </Card3D>
            ))}
          </div>
        </div>
      )}

      {/* Empty State when no results found */}
      {filteredPubs.length === 0 && filteredPresentations.length === 0 && (
        <div className="rounded-2xl border border-line/80 bg-white/70 p-12 text-center backdrop-blur-md dark:border-line-dark/80 dark:bg-slate-900/60">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-bio-cyan/15 text-bio-cyan">
            <Search size={22} />
          </div>
          <h3 className="mt-4 font-serif text-lg font-bold text-ink-900 dark:text-white">
            No matching research outputs found
          </h3>
          <p className="mx-auto mt-2 max-w-md text-xs text-ink-500 dark:text-ink-400">
            No papers or presentations matched &ldquo;{searchQuery}&rdquo;. Try another term like &ldquo;mitogenomics&rdquo;, &ldquo;Springer&rdquo;, &ldquo;Hilsa&rdquo;, or &ldquo;metacaspase&rdquo;.
          </p>
          <button
            onClick={() => { setActiveTab("all"); setSearchQuery(""); }}
            className="btn-primary mt-5 rounded-lg px-4 py-2 text-xs font-semibold"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Scholarly Profiles Footer Box */}
      <div className="rounded-2xl border border-line/80 bg-gradient-to-r from-bio-cyan/10 via-paper to-bio-emerald/10 p-6 backdrop-blur-md dark:border-line-dark/80 dark:from-cyan-950/40 dark:via-slate-900/60 dark:to-emerald-950/40 sm:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-bio-cyan/30 bg-bio-cyan/10 px-3 py-0.5 font-mono text-xs font-semibold text-bio-cyan dark:text-cyan-300">
              <Sparkles size={12} />
              Open Scholarship & Reproducibility
            </span>
            <h3 className="mt-2 font-serif text-xl font-bold text-ink-900 dark:text-ink-100">
              Academic Profiles & Preprint Repositories
            </h3>
            <p className="mt-1 max-w-xl text-justify text-xs text-ink-600 dark:text-ink-300 sm:text-sm">
              All scripts, sequence alignment pipelines, and model architectures corresponding to ongoing manuscripts are committed under version control for reproducible bioinformatics research.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href="https://orcid.org/0009-0004-9556-9442"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-white/80 px-3.5 py-2 font-mono text-xs font-medium text-ink-800 transition-all hover:border-[#A6CE39] hover:text-[#A6CE39] dark:border-line-dark dark:bg-slate-800/90 dark:text-ink-200"
            >
              ORCID <ArrowUpRight size={13} />
            </a>
            <a
              href="https://github.com/tasnim-ul-islam"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-white/80 px-3.5 py-2 font-mono text-xs font-medium text-ink-800 transition-all hover:border-bio-cyan hover:text-bio-cyan dark:border-line-dark dark:bg-slate-800/90 dark:text-ink-200"
            >
              GitHub <ArrowUpRight size={13} />
            </a>
            <a
              href="https://doi.org/10.1007/978-981-97-3937-0_11"
              target="_blank"
              rel="noreferrer"
              className="btn-primary inline-flex items-center gap-1.5 rounded-xl px-4 py-2 font-mono text-xs font-semibold"
            >
              Springer Chapter <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}
