import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";
import { DOCTORS } from "@/lib/site-config";
import Breadcrumb from "@/components/ui/Breadcrumb";
import DoctorPhoto from "@/components/ui/DoctorPhoto";

export const metadata: Metadata = buildMetadata({
  title: "Our Dentists | Pala, Kottayam | Smile Architects",
  description:
    "Meet the dentists at Smile Architects, Pala — Dr. Jeo Tom Charls (MDS Orthodontics), Dr. Jintu Joan Jose and Dr. Ann Tresa T. Srambickal. Dental clinic in Pala, Kottayam, Kerala.",
  canonical: "/dentists",
});

export default function DentistsPage() {
  return (
    <>
      <div className="section-padding section-warm">
        <div className="container-xl">
          <Breadcrumb items={[{ label: "Our Doctors", href: "/dentists" }]} />
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "var(--color-dark-moss)",
              fontWeight: 400,
              marginTop: "1.5rem",
              marginBottom: "0.75rem",
            }}
          >
            Meet the dentists
          </h1>
          <p style={{ color: "var(--color-olive)", fontSize: "1.0625rem", maxWidth: "520px", lineHeight: 1.65 }}>
            The Smile Architects team brings specialist and general dental expertise under one roof
            in Pala, Kottayam, Kerala.
          </p>
        </div>
      </div>

      <section className="section-padding section-light">
        <div className="container-xl">
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {DOCTORS.map((doctor) => {
              const schema = {
                "@context": "https://schema.org",
                "@type": "Physician",
                name: doctor.name,
                description: doctor.bio,
                worksFor: { "@type": "MedicalOrganization", name: "Smile Architects" },
                medicalSpecialty: doctor.specialty,
                honorificSuffix: doctor.qualifications,
                ...(doctor.registrationNumber
                  ? { identifier: { "@type": "PropertyValue", name: doctor.registrationBody, value: doctor.registrationNumber } }
                  : {}),
              };

              return (
                <div key={doctor.id}>
                  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
                  <div className="card-warm" style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: "2rem", alignItems: "start" }}>
                    {/* Photo */}
                    <DoctorPhoto name={doctor.name} photo={doctor.photo} size="md" />
                    {/* Info */}
                    <div>
                      <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", color: "var(--color-dark-moss)", fontWeight: 400, marginBottom: "0.25rem" }}>
                        {doctor.name}
                      </h2>
                      <p className="credentials" style={{ marginBottom: "0.25rem" }}>
                        {doctor.qualifications} — {doctor.specialty}
                      </p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.125rem" }}>
                        {doctor.roles.map((role) => (
                          <span key={role} style={{ 
                            fontSize: "0.8125rem", 
                            color: "var(--color-olive)", 
                            fontFamily: "var(--font-mono)", 
                            fontWeight: 500,
                            letterSpacing: "0.01em"
                          }}>
                            {role}
                          </span>
                        ))}
                      </div>
                      <p style={{ fontSize: "0.9rem", color: "var(--color-dark-moss)", lineHeight: 1.65, marginTop: "0.875rem", maxWidth: "560px", opacity: 0.9 }}>
                        {doctor.bio}
                      </p>
                      {doctor.registrationNumber && (
                        <p style={{ fontSize: "0.8rem", color: "var(--color-olive)", marginTop: "0.5rem", fontFamily: "var(--font-sans)" }}>
                          {doctor.registrationBody} Reg. No. {doctor.registrationNumber} ({doctor.registrationYear})
                        </p>
                      )}
                    </div>
                    {/* CTA */}
                    <div style={{ flexShrink: 0 }}>
                      <Link
                        href={`/dentists/${doctor.slug}`}
                        className="btn btn-secondary btn-sm"
                        aria-label={`View full profile of ${doctor.name}`}
                      >
                        View profile
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-dark" style={{ padding: "3.5rem 0" }}>
        <div className="container-xl" style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.25rem" }}>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.375rem, 2.5vw, 1.875rem)", color: "var(--color-honeydew)", fontWeight: 400 }}>
            Book a consultation at Smile Architects, Pala
          </h2>
          <div style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap", justifyContent: "center" }}>
            <Link href="/book-appointment" className="btn btn-secondary">Book Appointment</Link>
            <Link href="/contact" className="btn btn-ghost-light">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
