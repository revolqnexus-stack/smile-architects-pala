import type { Metadata } from "next";
import {
  Playfair_Display,
  Inter,
  Space_Grotesk,
  Barlow_Condensed,
  IBM_Plex_Mono,
} from "next/font/google";
import "./globals.css";
import { CLINIC } from "@/lib/site-config";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import MobileAppointmentBar from "@/components/layout/MobileAppointmentBar";
import LenisProvider from "@/components/providers/LenisProvider";
import { buildMetadata } from "@/lib/metadata";

// ─── FONT LOADING ─────────────────────────────────────────────────────────────
// Mirrors REVOLQ's 5-font system, adapted for a dental clinic context.

/** Editorial display — h1, h2, h3, hero headlines, prices */
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

/** Workhorse body — paragraphs, labels, nav, forms, everything non-headline */
const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

/** Technical/metadata feel — credentials, tags, doctor qualifications, specs */
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

/** Compressed impact — hero headline only (large weight, tight tracking) */
const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  style: ["normal"],
  variable: "--font-condensed",
  display: "swap",
});

/** Utility / eyebrow labels — UPPERCASE section labels, CTA tag text, eyebrow copy */
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-utility",
  display: "swap",
});

// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = buildMetadata();

// JSON-LD structured data for the clinic
const clinicSchema = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  "@id": `${CLINIC.seo.siteUrl}/#dentist`,
  name: CLINIC.name,
  description: `${CLINIC.tagline} in ${CLINIC.address.city}, ${CLINIC.address.district}, ${CLINIC.address.state}.`,
  url: CLINIC.seo.siteUrl,
  telephone: CLINIC.contact.phone,
  email: CLINIC.contact.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: CLINIC.address.street,
    addressLocality: CLINIC.address.city,
    addressRegion: CLINIC.address.state,
    postalCode: CLINIC.address.pincode,
    addressCountry: "IN",
  },
  // [CLINIC TO VERIFY: Confirm geo coordinates from Google Maps]
  // geo: { "@type": "GeoCoordinates", latitude: 9.7126, longitude: 76.6830 },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:30",
      closes: "20:00",
    },
  ],
  hasMap: CLINIC.platforms.googleMaps.directionsUrl,
  image: `${CLINIC.seo.siteUrl}${CLINIC.seo.ogImage}`,
  priceRange: "₹",
  currenciesAccepted: "INR",
  paymentAccepted: "Cash, UPI",
  areaServed: [
    { "@type": "City", name: "Pala" },
    { "@type": "AdministrativeArea", name: "Kottayam District" },
  ],
  medicalSpecialty: ["Dentistry", "Orthodontics"],
  employee: [
    {
      "@type": "Physician",
      name: "Dr. Jeo Tom Charls",
      hasCredential: "BDS, MDS — Orthodontics and Dentofacial Orthopaedics",
      jobTitle: "Orthodontist and Dental Surgeon",
    },
  ],
  sameAs: [
    // [CLINIC TO VERIFY: Add verified Google Business Profile URL and social profiles]
    // "https://g.co/kgs/...",
    // "https://www.facebook.com/...",
    // "https://www.instagram.com/...",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${playfair.variable} ${inter.variable} ${spaceGrotesk.variable} ${barlowCondensed.variable} ${ibmPlexMono.variable}`}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicSchema) }}
        />
      </head>
      <body>
        <LenisProvider>
          {/* Skip navigation for accessibility */}
          <a href="#main-content" className="skip-link">Skip to main content</a>

          <SiteHeader />

          {/*
           * Offset for the fixed floating navbar.
           * Desktop: pill is ~72px tall + 8px top offset ≈ 88px
           * Mobile:  pill is ~52px tall + 6px top offset ≈ 68px
           * Using clamp so it scales gracefully.
           */}
          <main
            id="main-content"
            tabIndex={-1}
            style={{ paddingTop: "clamp(68px, 8vw, 88px)" }}
          >
            {children}
          </main>

          <SiteFooter />

          {/* Sticky mobile CTA bar */}
          <MobileAppointmentBar />
        </LenisProvider>
      </body>
    </html>
  );
}
