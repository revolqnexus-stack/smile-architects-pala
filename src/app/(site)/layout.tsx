import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import MobileAppointmentBar from "@/components/layout/MobileAppointmentBar";
import LenisProvider from "@/components/providers/LenisProvider";
import { CLINIC } from "@/lib/site-config";

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
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <LenisProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicSchema) }}
      />
      {/* Skip navigation for accessibility */}
      <a href="#main-content" className="skip-link">Skip to main content</a>

      <SiteHeader />

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
  );
}
