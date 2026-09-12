"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  FileDown,
  Github,
  Linkedin,
  ExternalLink,
  Dna,
  User,
  FlaskConical,
  Cpu,
  FolderGit2,
  BookOpen,
  Code,
  Milestone,
  Mail,
  ChevronRight
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { site } from "@/content/site";

const navItems = [
  { href: "/about", label: "About", icon: User, desc: "Biography & Academic Path" },
  { href: "/research", label: "Research", icon: FlaskConical, desc: "BFRI WGS & Mitogenomics" },
  { href: "/thesis", label: "Thesis", icon: Cpu, desc: "Cross-Modal AI for Gene Discovery" },
  { href: "/projects", label: "Projects", icon: FolderGit2, desc: "Bioinformatics Software & Repos" },
  { href: "/publications", label: "Publications", icon: BookOpen, desc: "Springer LNNS & Manuscripts" },
  { href: "/skills", label: "Skills", icon: Code, desc: "Genomics, ML/DL & Tools" },
  { href: "/timeline", label: "Timeline", icon: Milestone, desc: "Academic Milestones" },
  { href: "/contact", label: "Contact", icon: Mail, desc: "Inquiries & Collaborations" }
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  // Close mobile drawer on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line/80 bg-white/85 backdrop-blur-md dark:border-line-dark/80 dark:bg-[#030712]/85">
        <div className="mx-auto flex max-w-content items-center justify-between px-4 py-3 sm:px-6 lg:px-8">

          {/* Brand / Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2 font-serif text-lg font-semibold tracking-tight text-ink-900 transition-colors dark:text-ink-100"
            onClick={() => setOpen(false)}
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-bio-cyan/15 text-bio-cyan transition-transform group-hover:scale-110 dark:bg-cyan-500/20 dark:text-cyan-400">
              <Dna size={17} />
            </span>
            <span className="flex items-center gap-1.5">
              Tasnim Ul Islam
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-bio-emerald animate-pulse" />
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden items-center gap-0.5 lg:flex">
            {navItems.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${
                    active
                      ? "text-bio-cyan dark:text-cyan-300 bg-bio-cyan/10 dark:bg-cyan-500/15 font-semibold"
                      : "text-ink-600 hover:text-ink-900 hover:bg-ink-100/60 dark:text-ink-300 dark:hover:text-white dark:hover:bg-slate-800/60"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            <div className="ml-2 flex items-center gap-2 border-l border-line pl-3 dark:border-line-dark">
              <Link
                href="/cv"
                className="btn-primary inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold"
              >
                <FileDown size={14} /> CV
              </Link>
              <ThemeToggle />
            </div>
          </nav>

          {/* Mobile Actions in Header Bar */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/cv"
              className="inline-flex items-center gap-1 rounded-lg border border-line bg-paper/90 px-2.5 py-1.5 text-xs font-semibold text-ink-700 hover:border-bio-cyan hover:text-bio-cyan dark:border-line-dark dark:bg-slate-800/90 dark:text-ink-200"
              aria-label="Download CV"
            >
              <FileDown size={14} />
              <span className="hidden xs:inline">CV</span>
            </Link>
            <ThemeToggle />

            {/* 3-Bar Hamburger Toggle Button */}
            <button
              type="button"
              aria-label={open ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={open}
              onClick={() => setOpen((prev) => !prev)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-paper/90 text-ink-800 shadow-sm transition-all hover:border-bio-cyan hover:text-bio-cyan dark:border-line-dark dark:bg-slate-800/90 dark:text-ink-100 dark:hover:border-cyan-400"
            >
              {open ? <X size={21} className="text-bio-cyan" /> : <Menu size={21} />}
            </button>
          </div>

        </div>
      </header>

      {/* Full-Screen Mobile Navigation Overlay (Always Visible on Top when Opened) */}
      {open && (
        <div
          className="fixed inset-0 z-[100] flex flex-col bg-white/98 backdrop-blur-2xl lg:hidden dark:bg-[#030712]/98 animate-in fade-in duration-200"
          style={{ overscrollBehavior: "contain" }}
        >
          {/* Top Bar inside Drawer (Matches Header Position) */}
          <div className="flex items-center justify-between border-b border-line/80 px-4 py-3.5 sm:px-6 dark:border-line-dark/80">
            <Link
              href="/"
              className="flex items-center gap-2 font-serif text-lg font-semibold tracking-tight text-ink-900 dark:text-ink-100"
              onClick={() => setOpen(false)}
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-bio-cyan/15 text-bio-cyan dark:bg-cyan-500/20 dark:text-cyan-400">
                <Dna size={17} />
              </span>
              <span>Tasnim Ul Islam</span>
            </Link>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-paper text-ink-800 transition-colors hover:border-bio-cyan hover:text-bio-cyan dark:border-line-dark dark:bg-slate-800 dark:text-ink-100 dark:hover:border-cyan-400"
              >
                <X size={21} />
              </button>
            </div>
          </div>

          {/* Scrollable Mobile Menu Body */}
          <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6">

            {/* Quick Status Pill */}
            <div className="flex items-center gap-3 rounded-2xl border border-line/80 bg-paper/60 p-3.5 backdrop-blur-sm dark:border-line-dark/80 dark:bg-slate-900/70">
              <span className="relative flex h-3 w-3 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-400"></span>
              </span>
              <div className="text-xs">
                <p className="font-semibold text-ink-900 dark:text-white">Bioinformatics Engineering</p>
                <p className="text-ink-500 dark:text-cyan-300/80">Bangladesh Agricultural University</p>
              </div>
            </div>

            {/* Navigation Options List */}
            <div className="space-y-1.5">
              <p className="px-2 text-[11px] font-mono uppercase tracking-wider text-ink-400 dark:text-ink-500">
                Navigation Menu
              </p>

              {navItems.map((item) => {
                const Icon = item.icon;
                const active =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 transition-all ${
                      active
                        ? "border border-bio-cyan/40 bg-bio-cyan/15 text-bio-cyan shadow-sm dark:border-cyan-500/40 dark:bg-cyan-950/50 dark:text-cyan-300"
                        : "border border-transparent bg-paper/40 text-ink-800 hover:border-line hover:bg-paper dark:bg-slate-900/40 dark:text-ink-100 dark:hover:border-line-dark dark:hover:bg-slate-900/80"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                        active
                          ? "bg-bio-cyan/20 text-bio-cyan dark:bg-cyan-500/30 dark:text-cyan-300"
                          : "bg-paper text-ink-500 dark:bg-slate-800 dark:text-ink-400"
                      }`}>
                        <Icon size={17} />
                      </span>
                      <div>
                        <p className="text-base font-semibold leading-tight">{item.label}</p>
                        <p className="text-[11px] text-ink-500 dark:text-ink-400">{item.desc}</p>
                      </div>
                    </div>

                    <ChevronRight size={16} className={active ? "text-bio-cyan dark:text-cyan-400" : "text-ink-400"} />
                  </Link>
                );
              })}
            </div>

            {/* Direct Quick Actions */}
            <div className="border-t border-line/80 pt-6 dark:border-line-dark/80">
              <p className="mb-3 px-2 text-[11px] font-mono uppercase tracking-wider text-ink-400 dark:text-ink-500">
                Direct Actions
              </p>
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/cv"
                  onClick={() => setOpen(false)}
                  className="btn-primary py-3 text-center text-xs font-semibold justify-center"
                >
                  <FileDown size={16} /> CV (PDF)
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="btn-secondary py-3 text-center text-xs font-semibold justify-center"
                >
                  <Mail size={16} /> Contact
                </Link>
              </div>

              {/* Social Profiles */}
              <div className="mt-6 flex items-center justify-center gap-4 border-t border-line/60 pt-6 dark:border-line-dark/60">
                <a
                  href={site.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-paper text-ink-700 transition-colors hover:border-bio-cyan hover:text-bio-cyan dark:border-line-dark dark:bg-slate-800 dark:text-ink-200"
                  aria-label="GitHub Profile"
                >
                  <Github size={19} />
                </a>
                <a
                  href={site.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-paper text-ink-700 transition-colors hover:border-bio-cyan hover:text-bio-cyan dark:border-line-dark dark:bg-slate-800 dark:text-ink-200"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin size={19} />
                </a>
                <a
                  href={site.links.orcid}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-paper text-ink-700 transition-colors hover:border-bio-cyan hover:text-bio-cyan dark:border-line-dark dark:bg-slate-800 dark:text-ink-200"
                  aria-label="ORCID Profile"
                >
                  <ExternalLink size={19} />
                </a>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
