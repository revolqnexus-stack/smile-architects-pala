import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";
import { DOCTORS, CLINIC } from "@/lib/site-config";
import Breadcrumb from "@/components/ui/Breadcrumb";
import AppointmentForm from "@/components/ui/AppointmentForm";
import { CheckIcon, ArrowRightIcon } from "@/components/ui/icons";
import DoctorPhoto from "@/components/ui/DoctorPhoto";
import {
  RevealUp,
  RevealFade,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/REVOLQComponents";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return DOCTORS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doctor = DOCTORS.find((d) => d.slug === slug);
  if (!doctor) return {};
  return buildMetadata({
    title: doctor.seo.title,
    description: doctor.seo.description,
    canonical: `/dentists/${doctor.slug}`,
  });
}

export default async function DoctorProfilePage({ params }: Props) {
  const { slug } = await params;
  const doctor = DOCTORS.find((d) => d.slug === slug);
  if (!doctor) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: doctor.name,
    description: doctor.bio,
    jobTitle: doctor.roles[0],
    honorificSuffix: doctor.qualifications,
    worksFor: {
      "@type": "MedicalOrganization",
      name: CLINIC.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: CLINIC.address.street,
        addressLocality: CLINIC.address.city,
        addressRegion: CLINIC.address.state,
        postalCode: CLINIC.address.pincode,
        addressCountry: "IN",
      },
    },
    medicalSpecialty: doctor.specialty,
    alumniOf: doctor.education.map((e) => ({ "@type": "EducationalOrganization", name: e.institution })),
    memberOf: doctor.memberships.map((m) => ({ "@type": "Organization", name: m })),
    ...(doctor.registrationNumber ? {
      identifier: {
        "@type": "PropertyValue",
        name: doctor.registrationBody,
        value: doctor.registrationNumber,
      }
    } : {}),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* ── HEADER ─────────────────────────────────────────────── */}
      <div className="section-padding section-warm">
        <div className="container-xl">
          <RevealFade>
            <Breadcrumb
              items={[
                { label: "Doctors", href: "/dentists" },
                { label: doctor.name },
              ]}
            />
          </RevealFade>
          <RevealUp delay={0.05}>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "2rem",
                marginTop: "2rem",
                flexWrap: "wrap",
              }}
            >
              {/* Photo placeholder */}
              {/* Photo */}
              <DoctorPhoto name={doctor.name} photo={doctor.photo} size="lg" priority />
              <div>
                <h1
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(1.875rem, 4vw, 2.75rem)",
                    color: "var(--color-dark-moss)",
                    fontWeight: 400,
                    marginBottom: "0.5rem",
                  }}
                >
                  {doctor.name}
                </h1>
                <p style={{
                  fontSize: "1rem",
                  color: "var(--color-olive)",
                  fontWeight: 600,
                  fontFamily: "var(--font-sans)",
                  marginBottom: "0.75rem",
                }}>
                  {doctor.qualifications} — {doctor.specialty}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem", marginBottom: "0.75rem" }}>
                  {doctor.roles.map((role) => (
                    <span
                      key={role}
                      className="tag"
                    >
                      {role}
                    </span>
                  ))}
                </div>
                <p style={{ fontSize: "0.875rem", color: "var(--color-moss)", fontFamily: "var(--font-sans)" }}>
                  Smile Architects · Pala, Kottayam, Kerala
                </p>
                {doctor.registrationNumber && (
                  <p style={{ fontSize: "0.8rem", color: "var(--color-moss)", marginTop: "0.375rem", fontFamily: "var(--font-sans)" }}>
                    {doctor.registrationBody} Reg. No. {doctor.registrationNumber} ({doctor.registrationYear})
                  </p>
                )}
              </div>
            </div>
          </RevealUp>
        </div>
      </div>

      {/* ── MAIN CONTENT ───────────────────────────────────────── */}
      <section className="section-padding section-light">
        <div className="container-xl">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "3rem", alignItems: "start" }}>

            {/* ── LEFT COLUMN ──── */}
            <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>

              {/* Bio */}
              <RevealUp>
                <div>
                  <div className="accent-line" />
                  <h2 style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.5rem",
                    color: "var(--color-dark-moss)",
                    fontWeight: 400,
                    marginBottom: "1rem",
                  }}>
                    About {doctor.name}
                  </h2>
                  <p style={{ color: "var(--color-cafe-noir)", lineHeight: 1.75, fontSize: "1rem" }}>
                    {doctor.bio}
                  </p>
                </div>
              </RevealUp>

              {/* Education */}
              {doctor.education.filter(e => e.institution).length > 0 && (
                <RevealUp delay={0.05}>
                  <div>
                    <h2 style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "1.5rem",
                      color: "var(--color-dark-moss)",
                      fontWeight: 400,
                      marginBottom: "1rem",
                    }}>
                      Education
                    </h2>
                    <StaggerContainer stagger={0.06} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                      {doctor.education.filter(e => e.institution).map((edu, i) => (
                        <StaggerItem key={i}>
                          <div style={{
                            padding: "1rem 1.25rem",
                            backgroundColor: "var(--color-white)",
                            borderRadius: "var(--radius-md)",
                            border: "2px solid var(--color-tea-green)",
                          }}>
                            <p style={{
                              fontWeight: 600,
                              color: "var(--color-dark-moss)",
                              fontSize: "0.9375rem",
                              fontFamily: "var(--font-sans)",
                              marginBottom: "0.25rem",
                            }}>
                              {edu.degree}
                            </p>
                            {edu.institution && (
                              <p style={{ color: "var(--color-moss)", fontSize: "0.875rem", fontFamily: "var(--font-sans)" }}>
                                {edu.institution}{edu.year ? `, ${edu.year}` : ""}
                              </p>
                            )}
                          </div>
                        </StaggerItem>
                      ))}
                    </StaggerContainer>
                  </div>
                </RevealUp>
              )}

              {/* Areas of expertise */}
              {doctor.areasOfExpertise.length > 0 && (
                <RevealUp delay={0.05}>
                  <div>
                    <h2 style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "1.5rem",
                      color: "var(--color-dark-moss)",
                      fontWeight: 400,
                      marginBottom: "1rem",
                    }}>
                      Areas of expertise
                    </h2>
                    <ul style={{ listStyle: "none", padding: 0, display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                      {doctor.areasOfExpertise.map((area) => (
                        <li key={area} className="tag">
                          {area}
                        </li>
                      ))}
                    </ul>
                  </div>
                </RevealUp>
              )}

              {/* Training */}
              {doctor.training.length > 0 && (
                <RevealUp delay={0.05}>
                  <div>
                    <h2 style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "1.5rem",
                      color: "var(--color-dark-moss)",
                      fontWeight: 400,
                      marginBottom: "1rem",
                    }}>
                      Training &amp; professional development
                    </h2>
                    <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                      {doctor.training.map((t) => (
                        <li key={t} style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "0.75rem",
                          fontSize: "0.9375rem",
                          color: "var(--color-cafe-noir)",
                          fontFamily: "var(--font-sans)",
                          lineHeight: 1.5,
                        }}>
                          <span style={{
                            color: "var(--color-jonquil)",
                            marginTop: "0.125em",
                            flexShrink: 0,
                          }}>
                            <CheckIcon size="sm" />
                          </span>
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </RevealUp>
              )}

              {/* Memberships */}
              {doctor.memberships.length > 0 && (
                <RevealUp delay={0.05}>
                  <div>
                    <h2 style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "1.5rem",
                      color: "var(--color-dark-moss)",
                      fontWeight: 400,
                      marginBottom: "1rem",
                    }}>
                      Professional memberships
                    </h2>
                    <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      {doctor.memberships.map((m) => (
                        <li key={m} style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.75rem",
                          fontSize: "0.9375rem",
                          color: "var(--color-dark-moss)",
                          fontFamily: "var(--font-sans)",
                        }}>
                          <span style={{ 
                            color: "var(--color-jonquil)", 
                            fontSize: "0.5rem",
                            width: "4px", 
                            height: "4px", 
                            backgroundColor: "currentColor",
                            borderRadius: "50%",
                            flexShrink: 0
                          }}></span>
                          {m}
                        </li>
                      ))}
                    </ul>
                  </div>
                </RevealUp>
              )}

              {/* Experience */}
              {doctor.professionalExperience.length > 0 && (
                <RevealUp delay={0.05}>
                  <div>
                    <h2 style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "1.5rem",
                      color: "var(--color-dark-moss)",
                      fontWeight: 400,
                      marginBottom: "1rem",
                    }}>
                      Professional experience
                    </h2>
                    <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      {doctor.professionalExperience.map((exp) => (
                        <li key={exp} style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "0.75rem",
                          fontSize: "0.9375rem",
                          color: "var(--color-cafe-noir)",
                          fontFamily: "var(--font-sans)",
                          lineHeight: 1.5,
                        }}>
                          <span style={{ 
                            color: "var(--color-jonquil)",
                            marginTop: "0.4em",
                            width: "4px", 
                            height: "4px", 
                            backgroundColor: "currentColor",
                            borderRadius: "50%",
                            flexShrink: 0
                          }}></span>
                          {exp}
                        </li>
                      ))}
                    </ul>
                  </div>
                </RevealUp>
              )}
            </div>

            {/* ── RIGHT COLUMN — sticky appointment form ──── */}
            <RevealFade delay={0.1}>
              <div style={{ position: "sticky", top: "100px" }}>
                <div
                  style={{
                    backgroundColor: "var(--color-white)",
                    borderRadius: "var(--radius-xl)",
                    padding: "2rem",
                    border: "2px solid var(--color-tea-green)",
                    boxShadow: "var(--shadow-md)",
                  }}
                >
                  <AppointmentForm compact heading={`Book with ${doctor.name.split(" ")[0]}`} />
                </div>
              </div>
            </RevealFade>
          </div>
        </div>
      </section>

      {/* ── FOOTER BAR ─────────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: "var(--color-dark-moss)",
          padding: "2rem 0",
          borderTop: "1px solid rgba(236,245,226,0.1)",
        }}
      >
        <div className="container-xl" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <p style={{ fontSize: "0.875rem", color: "var(--color-honeydew)", opacity: 0.75, fontFamily: "var(--font-sans)" }}>
            {doctor.name} practises at Smile Architects · {CLINIC.address.street}, {CLINIC.address.city}, {CLINIC.address.district}
          </p>
          <Link
            href="/dentists"
            className="footer-link"
            style={{ fontWeight: 500 }}
          >
            ← All doctors
          </Link>
        </div>
      </section>
    </>
  );
}
