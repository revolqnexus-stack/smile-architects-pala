import type { Metadata } from "next";
import { CLINIC } from "./site-config";

interface PageMetaOptions {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  noIndex?: boolean;
  type?: "website" | "article";
}

export function buildMetadata(options: PageMetaOptions = {}): Metadata {
  const {
    title,
    description = CLINIC.seo.defaultDescription,
    canonical,
    ogImage = CLINIC.seo.ogImage,
    noIndex = false,
    type = "website",
  } = options;

  const resolvedTitle = title
    ? `${title} | ${CLINIC.seo.siteName}`
    : CLINIC.seo.defaultTitle;

  const resolvedUrl = canonical
    ? `${CLINIC.seo.siteUrl}${canonical}`
    : CLINIC.seo.siteUrl;

  return {
    title: resolvedTitle,
    description,
    metadataBase: new URL(CLINIC.seo.siteUrl),
    alternates: {
      canonical: resolvedUrl,
    },
    openGraph: {
      title: resolvedTitle,
      description,
      url: resolvedUrl,
      siteName: CLINIC.seo.siteName,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: resolvedTitle,
        },
      ],
      locale: "en_IN",
      type,
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
  };
}
