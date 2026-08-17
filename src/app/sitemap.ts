import type { MetadataRoute } from "next";
import { CLINIC, TREATMENTS } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = CLINIC.seo.siteUrl;
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    // Core pages
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/book-appointment`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    // Doctor / Team
    { url: `${base}/dentists`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    // Treatments hub
    { url: `${base}/treatments`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    // Orthodontics cluster — high priority specialty content
    { url: `${base}/orthodontics`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/orthodontics/braces`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/orthodontics/lingual-braces`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/orthodontics/clear-aligners`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    // Geographic / regional service
    { url: `${base}/areas-served`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/areas-served/kottayam`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/areas-served/thrissur`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    // Content
    { url: `${base}/dental-guides`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/patient-stories`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/technology`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];

  const doctorPages: MetadataRoute.Sitemap = [
    {
      url: `${base}/dentists/dr-jeo-tom-charls`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/dentists/dr-jintu-joan-jose`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/dentists/dr-ann-tresa-t-srambickal`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const treatmentPages: MetadataRoute.Sitemap = TREATMENTS.map((t) => ({
    url: `${base}/treatments/${t.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: t.featured ? 0.8 : 0.65,
  }));

  const guidePages: MetadataRoute.Sitemap = [
    "braces-what-to-expect",
    "clear-aligners-vs-braces",
    "lingual-braces-guide",
    "dental-implants-guide",
    "root-canal-myths",
    "childrens-dental-health",
    "smile-design-guide",
    "oral-hygiene-tips",
  ].map((slug) => ({
    url: `${base}/dental-guides/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...doctorPages, ...treatmentPages, ...guidePages];
}
