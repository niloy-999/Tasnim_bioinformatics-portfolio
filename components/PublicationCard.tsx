"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ExternalLink,
  BookOpen,
  Quote,
  Check,
  Copy,
  Code2,
  ArrowRight,
  Tag,
  UserCheck,
  Calendar
} from "lucide-react";
import StatusBadge from "@/components/StatusBadge";
import type { Publication } from "@/content/publications";

export default function PublicationCard({ pub }: { pub: Publication }) {
  const [copied, setCopied] = useState(false);
  const [showBibtex, setShowBibtex] = useState(false);

  // Format standard citation string
  const formattedCitation = `${pub.authors} (${pub.year || "in press"}). "${pub.title}." ${pub.venue}.${pub.doi ? ` DOI: ${pub.doi}` : ""}`;

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback
    }
  };

  // Helper to render author string with Tasnim Ul Islam highlighted
  const renderAuthors = (authorsStr: string) => {
    const parts = authorsStr.split(/(Ul Islam, T\.(?: \(equal contribution\))?|Ul Islam, T\.)/g);
    return (
      <span>
        {parts.map((part, i) => {
          if (part.includes("Ul Islam, T.")) {
            return (
              <span
                key={i}
                className="rounded bg-bio-cyan/15 px-1.5 py-0.5 font-semibold text-bio-cyan dark:bg-cyan-500/20 dark:text-cyan-300 shadow-[0_0_8px_rgba(6,182,212,0.15)]"
              >
                {part}
              </span>
            );
          }
          return <span key={i}>{part}</span>;
        })}
      </span>
    );
  };

  return (
    <div className="group relative flex h-full flex-col justify-between rounded-2xl border border-line/80 bg-white/80 p-6 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-bio-cyan/60 hover:shadow-glow dark:border-line-dark/80 dark:bg-slate-900/70 sm:p-7">

      {/* Top Header Row: Status, Type, and Year */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={pub.status} />
            {pub.type && (
              <span className="inline-flex items-center rounded-md bg-paper px-2.5 py-0.5 font-mono text-[11px] font-medium text-ink-600 dark:bg-slate-800/80 dark:text-ink-300">
                {pub.type}
              </span>
            )}
          </div>
          {pub.year && (
            <span className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-ink-400 dark:text-cyan-300/80">
              <Calendar size={12} className="text-bio-cyan" />
              {pub.year}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="mt-4 font-serif text-lg font-bold leading-snug text-ink-900 transition-colors group-hover:text-bio-cyan dark:text-ink-100 dark:group-hover:text-cyan-300 sm:text-xl">
          {pub.title}
        </h3>

        {/* Authors */}
        <p className="mt-2.5 text-xs text-ink-600 dark:text-ink-300 sm:text-sm">
          {renderAuthors(pub.authors)}
        </p>

        {/* Venue Callout */}
        <div className="mt-3.5 flex items-start gap-2.5 rounded-xl border border-line/60 bg-paper/60 p-3 text-xs italic text-ink-700 dark:border-line-dark/60 dark:bg-slate-800/50 dark:text-ink-200">
          <BookOpen size={15} className="mt-0.5 shrink-0 text-bio-cyan dark:text-cyan-400" />
          <span className="leading-relaxed">{pub.venue}</span>
        </div>

        {/* Scientific Summary / Takeaway */}
        {pub.summary && (
          <p className="mt-3.5 text-justify text-xs leading-relaxed text-ink-600 dark:text-ink-300 sm:text-sm">
            {pub.summary}
          </p>
        )}

        {/* Role & Topic Grid */}
        <div className="mt-4 grid grid-cols-1 gap-2 border-t border-line/70 pt-3 text-xs dark:border-line-dark/70 sm:grid-cols-2">
          <div className="flex items-center gap-1.5 text-ink-500 dark:text-ink-400">
            <UserCheck size={13} className="text-bio-cyan shrink-0" />
            <span className="truncate">
              Role: <strong className="text-ink-800 dark:text-ink-200">{pub.role}</strong>
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-ink-500 dark:text-ink-400">
            <Tag size={13} className="text-bio-emerald shrink-0" />
            <span className="truncate">
              Topic: <strong className="text-ink-800 dark:text-ink-200">{pub.topic}</strong>
            </span>
          </div>
        </div>

        {/* Keywords tags */}
        {pub.keywords && pub.keywords.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {pub.keywords.map((kw) => (
              <span
                key={kw}
                className="rounded-md border border-line/50 bg-paper/80 px-2 py-0.5 font-mono text-[10px] text-ink-600 dark:border-line-dark/50 dark:bg-slate-800/40 dark:text-slate-300"
              >
                #{kw}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Action Bar Footer */}
      <div className="mt-6 border-t border-line/70 pt-4 dark:border-line-dark/70">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {/* Direct Link to DOI */}
            {pub.doi ? (
              <a
                href={pub.doi}
                target="_blank"
                rel="noreferrer"
                className="btn-primary inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold"
              >
                Access Publisher / DOI <ExternalLink size={13} />
              </a>
            ) : (
              <span className="inline-flex items-center gap-1 font-mono text-[11px] text-ink-400 dark:text-ink-500">
                Manuscript in Pipeline
              </span>
            )}

            {/* Related Research Link */}
            {pub.relatedUrl && (
              <Link
                href={pub.relatedUrl}
                className="inline-flex items-center gap-1 rounded-lg border border-bio-cyan/40 bg-bio-cyan/10 px-2.5 py-1.5 text-xs font-medium text-bio-cyan transition-colors hover:bg-bio-cyan/20 dark:border-cyan-500/40 dark:bg-cyan-950/40 dark:text-cyan-300"
              >
                Related Research <ArrowRight size={12} />
              </Link>
            )}
          </div>

          {/* Citation & BibTeX Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => copyToClipboard(formattedCitation)}
              title="Copy formatted citation"
              className="inline-flex items-center gap-1 rounded-lg border border-line bg-paper px-2.5 py-1.5 font-mono text-[11px] font-medium text-ink-600 transition-colors hover:border-bio-cyan hover:text-bio-cyan dark:border-line-dark dark:bg-slate-800 dark:text-ink-300 dark:hover:border-cyan-400 dark:hover:text-cyan-300"
            >
              {copied ? (
                <>
                  <Check size={12} className="text-emerald-500" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={12} />
                  <span>Cite</span>
                </>
              )}
            </button>

            {pub.bibtex && (
              <button
                onClick={() => setShowBibtex(!showBibtex)}
                title="Toggle BibTeX entry"
                className={`inline-flex items-center gap-1 rounded-lg border px-2.5 py-1.5 font-mono text-[11px] font-medium transition-colors ${
                  showBibtex
                    ? "border-bio-cyan bg-bio-cyan/10 text-bio-cyan dark:border-cyan-400 dark:text-cyan-300"
                    : "border-line bg-paper text-ink-600 hover:border-bio-cyan hover:text-bio-cyan dark:border-line-dark dark:bg-slate-800 dark:text-ink-300 dark:hover:border-cyan-400 dark:hover:text-cyan-300"
                }`}
              >
                <Code2 size={12} />
                <span>BibTeX</span>
              </button>
            )}
          </div>
        </div>

        {/* Expandable BibTeX snippet */}
        {showBibtex && pub.bibtex && (
          <div className="mt-3 overflow-hidden rounded-xl border border-bio-cyan/30 bg-ink-900 p-3.5 text-slate-200 shadow-inner">
            <div className="flex items-center justify-between pb-2 text-[10px] font-mono text-cyan-400">
              <span>BIBTEX ENTRY</span>
              <button
                onClick={() => copyToClipboard(pub.bibtex || "")}
                className="inline-flex items-center gap-1 text-slate-300 hover:text-cyan-300"
              >
                <Copy size={11} />
                <span>Copy BibTeX</span>
              </button>
            </div>
            <pre className="overflow-x-auto font-mono text-[11px] leading-relaxed text-cyan-200/90">
              {pub.bibtex}
            </pre>
          </div>
        )}
      </div>

    </div>
  );
}
