"use client";

import { useState, useMemo } from "react";
import { Search, Award, GraduationCap, Users, Dna, Code, Database, Microscope, Network, Sparkles } from "lucide-react";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Card3D from "@/components/Card3D";
import { skillGroups, certifications, awards, leadership } from "@/content/skills";

const categoryIcons: Record<string, React.ReactNode> = {
  Programming: <Code size={18} className="text-bio-cyan" />,
  "Genomics & Assembly": <Dna size={18} className="text-bio-emerald" />,
  "Phylogenetics & Population Genetics": <Network size={18} className="text-amber-500" />,
  "Structural & Functional Annotation": <Microscope size={18} className="text-bio-violet" />,
  "Machine Learning & Deep Learning": <Sparkles size={18} className="text-bio-cyan" />,
  "Data Science": <Database size={18} className="text-bio-emerald" />,
  "Wet Lab": <Microscope size={18} className="text-amber-500" />,
  Languages: <Users size={18} className="text-bio-violet" />
};

export default function SkillsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = useMemo(() => {
    return ["All", ...skillGroups.map((g) => g.category)];
  }, []);

  const filteredGroups = useMemo(() => {
    return skillGroups
      .filter((g) => {
        if (selectedCategory === "All") return true;
        return g.category === selectedCategory;
      })
      .map((g) => {
        if (!searchQuery.trim()) return g;
        const q = searchQuery.toLowerCase();
        const matchesCat = g.category.toLowerCase().includes(q);
        const filteredItems = g.items.filter((item) =>
          item.toLowerCase().includes(q)
        );
        if (matchesCat) return g;
        return { ...g, items: filteredItems };
      })
      .filter((g) => g.items.length > 0);
  }, [selectedCategory, searchQuery]);

  return (
    <Container className="py-12 sm:py-16">
      <SectionHeading
        eyebrow="Technical Stack & Competencies"
        title="Skills & Scientific Toolkit"
        description="A comprehensive inventory of computational genomics, machine learning, phylogenetics, and experimental biology capabilities."
      />

      {/* Filter and Search Bar */}
      <div className="mt-8 space-y-4">
        {/* Search input */}
        <div className="relative max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400 dark:text-ink-500" />
          <input
            type="text"
            placeholder="Search tools, models, languages (e.g., PyTorch, BWA, ESM-2)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-line bg-white/70 py-2.5 pl-10 pr-4 text-sm text-ink-900 placeholder:text-ink-400 backdrop-blur focus:border-bio-cyan focus:outline-none focus:ring-1 focus:ring-bio-cyan dark:border-line-dark dark:bg-ink-900/60 dark:text-ink-100 dark:placeholder:text-ink-500"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5 scrollbar-thin">
          {categories.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                  active
                    ? "bg-ink-900 text-white shadow-sm dark:bg-cyan-400 dark:text-slate-950 dark:font-semibold dark:shadow-glow border dark:border-cyan-300/80"
                    : "border border-line/80 bg-white/60 text-ink-700 hover:border-bio-cyan hover:text-bio-cyan dark:border-cyan-500/30 dark:bg-slate-900/70 dark:text-cyan-200 dark:hover:border-cyan-400 dark:hover:text-white"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Skill Cards Grid */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-2">
        {filteredGroups.map((g) => (
          <Card3D key={g.category} maxTilt={3}>
            <div className="flex h-full flex-col rounded-xl border border-line/80 bg-white/75 p-5 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-bio-cyan/50 hover:shadow-glow dark:border-line-dark/80 dark:bg-ink-900/50">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink-100/80 dark:bg-ink-800/80">
                  {categoryIcons[g.category] || <Dna size={16} />}
                </span>
                <h2 className="font-serif text-base font-semibold text-ink-900 dark:text-ink-100">
                  {g.category}
                </h2>
                <span className="ml-auto font-mono text-[11px] text-ink-400 dark:text-ink-500">
                  {g.items.length} skills
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {g.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-line/80 bg-paper px-2.5 py-1 font-mono text-xs text-ink-700 transition-colors hover:border-bio-cyan hover:text-bio-cyan dark:border-line-dark/80 dark:bg-ink-800/60 dark:text-ink-200 dark:hover:border-cyan-400 dark:hover:text-cyan-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Card3D>
        ))}
      </div>

      {filteredGroups.length === 0 && (
        <div className="mt-12 rounded-xl border border-dashed border-line p-8 text-center dark:border-line-dark">
          <p className="text-sm text-ink-500 dark:text-ink-400">
            No skills found matching &ldquo;{searchQuery}&rdquo;.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
            }}
            className="mt-3 text-xs font-medium text-bio-cyan hover:underline dark:text-cyan-400"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Certifications, Awards, and Leadership Section */}
      <div className="mt-16 grid gap-6 border-t border-line/80 pt-12 dark:border-line-dark/80 md:grid-cols-3">
        {/* Certifications */}
        <Card3D maxTilt={3}>
          <div className="flex h-full flex-col rounded-xl border border-line/80 bg-white/70 p-5 shadow-sm backdrop-blur-sm dark:border-line-dark/80 dark:bg-ink-900/50">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-bio-cyan/15 text-bio-cyan dark:bg-bio-cyan/20">
                <GraduationCap size={16} />
              </span>
              <h2 className="font-serif text-base font-semibold text-ink-900 dark:text-ink-100">
                Certifications
              </h2>
            </div>
            <ul className="mt-4 space-y-2.5 text-xs text-ink-600 dark:text-ink-300">
              {certifications.map((c) => (
                <li key={c} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-bio-cyan" />
                  <span className="leading-relaxed">{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card3D>

        {/* Awards & Recognition */}
        <Card3D maxTilt={3}>
          <div className="flex h-full flex-col rounded-xl border border-line/80 bg-white/70 p-5 shadow-sm backdrop-blur-sm dark:border-line-dark/80 dark:bg-ink-900/50">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/15 text-amber-500 dark:bg-amber-500/20">
                <Award size={16} />
              </span>
              <h2 className="font-serif text-base font-semibold text-ink-900 dark:text-ink-100">
                Awards & Contests
              </h2>
            </div>
            <ul className="mt-4 space-y-2.5 text-xs text-ink-600 dark:text-ink-300">
              {awards.map((a) => (
                <li key={a} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                  <span className="leading-relaxed">{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card3D>

        {/* Leadership */}
        <Card3D maxTilt={3}>
          <div className="flex h-full flex-col rounded-xl border border-line/80 bg-white/70 p-5 shadow-sm backdrop-blur-sm dark:border-line-dark/80 dark:bg-ink-900/50">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-bio-emerald/15 text-bio-emerald dark:bg-bio-emerald/20">
                <Users size={16} />
              </span>
              <h2 className="font-serif text-base font-semibold text-ink-900 dark:text-ink-100">
                Leadership
              </h2>
            </div>
            <ul className="mt-4 space-y-2.5 text-xs text-ink-600 dark:text-ink-300">
              {leadership.map((l) => (
                <li key={l} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-bio-emerald" />
                  <span className="leading-relaxed">{l}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card3D>
      </div>
    </Container>
  );
}
