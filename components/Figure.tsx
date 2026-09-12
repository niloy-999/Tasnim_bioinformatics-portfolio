"use client";

import Image from "next/image";
import { useState } from "react";
import { Maximize2, X } from "lucide-react";

export default function Figure({
  src,
  alt,
  caption,
  source,
  aspect = "aspect-[4/3]"
}: {
  src: string;
  alt: string;
  caption: string;
  source?: string;
  aspect?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <figure className="border border-line dark:border-line-dark">
      <div className={`relative ${aspect} w-full bg-ink-100 dark:bg-ink-900`}>
        <Image src={src} alt={alt} fill className="object-contain" sizes="(max-width: 768px) 100vw, 700px" />
        <button
          onClick={() => setOpen(true)}
          aria-label="Expand figure"
          className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded border border-line bg-paper/90 text-ink-600 hover:text-amber-600 dark:border-line-dark dark:bg-paper-dark/90 dark:text-ink-300"
        >
          <Maximize2 size={14} />
        </button>
      </div>
      <figcaption className="border-t border-line px-4 py-3 text-sm text-ink-600 dark:border-line-dark dark:text-ink-300">
        {caption}
        {source && <span className="mt-1 block text-xs text-ink-400 dark:text-ink-500">Source: {source}</span>}
      </figcaption>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/90 p-6"
          onClick={() => setOpen(false)}
        >
          <button
            aria-label="Close"
            className="absolute right-5 top-5 inline-flex h-10 w-10 items-center justify-center rounded border border-ink-300 text-paper"
          >
            <X size={18} />
          </button>
          <div className="relative h-full max-h-[85vh] w-full max-w-4xl">
            <Image src={src} alt={alt} fill className="object-contain" sizes="90vw" />
          </div>
        </div>
      )}
    </figure>
  );
}
