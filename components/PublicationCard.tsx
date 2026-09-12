import { ExternalLink } from "lucide-react";
import StatusBadge from "@/components/StatusBadge";
import type { Publication } from "@/content/publications";

export default function PublicationCard({ pub }: { pub: Publication }) {
  return (
    <div className="border border-line p-5 dark:border-line-dark">
      <div className="flex flex-wrap items-center gap-2">
        <StatusBadge status={pub.status} />
        {pub.year && <span className="text-xs text-ink-400 dark:text-ink-500">{pub.year}</span>}
      </div>
      <h3 className="mt-2 font-serif text-lg font-semibold leading-snug text-ink-900 dark:text-ink-100">
        {pub.title}
      </h3>
      <p className="mt-1 text-sm text-ink-600 dark:text-ink-300">{pub.authors}</p>
      <p className="mt-1 text-sm italic text-ink-500 dark:text-ink-400">{pub.venue}</p>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-500 dark:text-ink-400">
        <span>Role: {pub.role}</span>
        <span>Topic: {pub.topic}</span>
      </div>
      {pub.doi && (
        <a
          href={pub.doi}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex items-center gap-1 text-sm text-amber-600 hover:underline dark:text-amber-400"
        >
          View DOI <ExternalLink size={13} />
        </a>
      )}
    </div>
  );
}
