"use client";

import Image from "next/image";
import Card3D from "@/components/Card3D";
import { Sparkles, Terminal, Cpu } from "lucide-react";

export default function HeroProfileImage() {
  return (
    <Card3D maxTilt={4} className="h-full">
      <div className="group relative mx-auto w-full max-w-[500px] overflow-hidden rounded-3xl border border-line/90 bg-white/90 p-2.5 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-bio-cyan/60 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_30px_rgba(6,182,212,0.25)] dark:border-cyan-500/30 dark:bg-slate-900/90 sm:p-3">

        {/* Main Image Frame */}
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-ink-950">
          <Image
            src="/images/tasnim-bioinformatics.jpg"
            alt="Tasnim Ul Islam — Bioinformatics Engineer in Computational Genomics Laboratory"
            width={700}
            height={700}
            priority
            className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
          />

          {/* Subtle Corner Vignette Overlay for Depth */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-ink-950/20" />

          {/* Floating Top-Left Lab Status Pill */}
          <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-white/30 bg-ink-950/75 px-3 py-1 font-mono text-[11px] font-semibold text-white shadow-lg backdrop-blur-md dark:border-cyan-500/30 dark:bg-slate-900/85 dark:text-cyan-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span>Bioinformatics Engineer</span>
          </div>

          {/* Floating Top-Right Computational Badge */}
          <div className="absolute right-3 top-3 hidden sm:flex items-center gap-1 rounded-full border border-white/30 bg-ink-950/75 px-2.5 py-1 font-mono text-[10px] font-medium text-slate-200 shadow-lg backdrop-blur-md dark:border-cyan-500/30 dark:bg-slate-900/85 dark:text-slate-300">
            <Cpu size={11} className="text-bio-cyan" />
            <span>Genomic AI &amp; WGS</span>
          </div>

          {/* Floating Bottom Bar: Motto Callout */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-xl border border-white/20 bg-ink-950/80 px-3.5 py-2 text-xs text-white shadow-lg backdrop-blur-md dark:border-cyan-500/30 dark:bg-slate-900/85">
            <div className="flex items-center gap-2">
              <Terminal size={14} className="text-bio-cyan shrink-0" />
              <span className="font-mono text-[11px] font-medium tracking-wide text-cyan-200">
                &lt;/&gt; Better Data · Better Biology
              </span>
            </div>
            <span className="font-mono text-[10px] text-slate-300 dark:text-slate-400">
              BAU
            </span>
          </div>
        </div>

      </div>
    </Card3D>
  );
}
