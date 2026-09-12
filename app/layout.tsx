import type { Metadata } from "next";
import { Source_Serif_4, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThemeScript from "@/components/ThemeScript";

const serif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
  display: "swap"
});

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap"
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: {
    default: "Tasnim Ul Islam — Bioinformatics & Computational Biology",
    template: "%s — Tasnim Ul Islam"
  },
  description:
    "Research portfolio of Tasnim Ul Islam: bioinformatics engineering, mitochondrial genomics, population genetics, and DNA-protein cross-modal deep learning.",
  keywords: [
    "Tasnim Ul Islam",
    "Bioinformatics Engineering",
    "Computational Biology",
    "Genomics",
    "Mitochondrial Genomics",
    "Population Genetics",
    "Phylogenetics",
    "DNA Protein Learning",
    "DNABERT-2",
    "ESM-2",
    "Bangladesh Agricultural University"
  ],
  openGraph: {
    title: "Tasnim Ul Islam — Bioinformatics & Computational Biology",
    description:
      "Research portfolio: mitochondrial genomics, population genetics, and DNA-protein cross-modal deep learning for gene discovery.",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Tasnim Ul Islam — Bioinformatics & Computational Biology"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-4 focus:rounded focus:bg-ink-900 focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
