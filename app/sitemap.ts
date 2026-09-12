import type { MetadataRoute } from "next";

const routes = [
  "",
  "/about",
  "/research",
  "/research/bfri",
  "/research/mitochondrial-genomics",
  "/thesis",
  "/projects",
  "/projects/bioseqinsight",
  "/projects/scrna-pipeline",
  "/publications",
  "/timeline",
  "/skills",
  "/cv",
  "/contact"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://example.com";
  return routes.map((r) => ({
    url: `${base}${r}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: r === "" ? 1 : 0.7
  }));
}
