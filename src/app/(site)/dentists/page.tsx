import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { buildMetadata } from "@/lib/metadata";
import { DOCTORS } from "@/lib/site-config";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { ArrowRightIcon } from "@/components/ui/icons";
import {
  RevealUp,
  StaggerReveal,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/REVOLQComponents";

export const metadata: Metadata = buildMetadata({
  title: "Our Dentists | Pala, Kottayam | Smile Architects",
  description:
    "Meet the dentists at Smile Architects, Pala — Dr. Jeo Tom Charls (MDS Orthodontics), Dr. Jintu Joan Jose and Dr. Ann Tresa T. Srambickal. Dental clinic in Pala, Kottayam, Kerala.",
  canonical: "/dentists",
});

export default function DentistsPage() {
  return (
    <>
      {/* Editorial page intro */}
      <div className="section-padding section-warm">
        <div className="container-xl">
          <Breadcrumb items={[{ label: "Our Doctors", href: "/dentists" }]} />
          
          <RevealUp delay={0.1}>
            <div className="doctors-page-intro">
              <p className="eyebrow">Our Doctors</p>
              <h1 className="doctors-page-title">
                Meet the specialists behind your smile
              </h1>
              <p className="doctors-page-description">
                A multidisciplinary team of dental specialists providing comprehensive care under one roof in Pala, Kottayam, Kerala.
              </p>
            </div>
          </RevealUp>
        </div>
      </div>

      {/* Doctor portrait cards grid */}
      <section className="section-padding section-light">
        <div className="container-xl">
          <StaggerContainer stagger={0.12} className="doctors-portrait-grid">
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
                <StaggerItem key={doctor.id}>
                  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
                  
                  <Link 
                    href={`/dentists/${doctor.slug}`} 
                    className="doctor-portrait-card-link" 
                    aria-label={`View profile of ${doctor.name}`}
                  >
                    <article className="doctor-portrait-card">
                      {/* Large portrait image */}
                      <div className="doctor-portrait-image">
                        {doctor.photo ? (
                          <Image
                            src={doctor.photo}
                            alt={`${doctor.name}, ${doctor.specialty}`}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                            style={{ objectFit: "cover", objectPosition: "top center" }}
                            className="doctor-portrait-img"
                          />
                        ) : (
                          <div className="doctor-portrait-placeholder">
                            <span className="doctor-portrait-initials">
                              {doctor.name.split(" ").map(p => p.charAt(0).toUpperCase()).slice(0, 2).join("")}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Card content */}
                      <div className="doctor-portrait-content">
                        <h2 className="doctor-portrait-name">{doctor.name}</h2>
                        <p className="doctor-portrait-credentials">
                          {doctor.qualifications} — {doctor.specialty}
                        </p>
                        <p className="doctor-portrait-role">{doctor.roles[0]}</p>
                        
                        {doctor.visiting && (
                          <span className="doctor-visiting-badge">Visiting Consultant</span>
                        )}
                        
                        <span className="doctor-portrait-cta">
                          View profile <ArrowRightIcon size="sm" />
                        </span>
                      </div>
                    </article>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA section */}
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
