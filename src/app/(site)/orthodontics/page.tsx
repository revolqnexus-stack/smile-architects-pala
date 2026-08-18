import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";
import { CLINIC, TREATMENTS, DOCTORS } from "@/lib/site-config";
import Breadcrumb from "@/components/ui/Breadcrumb";
import AppointmentForm from "@/components/ui/AppointmentForm";
import DoctorPhoto from "@/components/ui/DoctorPhoto";
import { CheckIcon, ArrowRightIcon, TreatmentIconFor } from "@/components/ui/icons";
import {
  RevealUp,
  RevealFade,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/REVOLQComponents";

export const metadata: Metadata = buildMetadata({
  title: "Orthodontic Treatment in Pala | Orthodontist Kottayam & Thrissur Patients | Smile Architects",
  description:
    "Orthodontic treatment at Smile Architects, Pala — Dr. Jeo Tom Charls, MDS Orthodontics. Braces, lingual braces, clear aligners, adult orthodontics. Serving patients from Kottayam District and Thrissur, Kerala.",
  canonical: "/orthodontics",
});

const ORTHODONTIC_CONCERNS = [
  "Crowded or crooked teeth",
  "Gaps between teeth (spacing)",
  "Overbite (upper teeth protruding)",
  "Underbite (lower jaw protruding)", 
  "Crossbite (upper and lower teeth misaligned)",
  "Open bite (front teeth don't meet)",
  "Jaw growth and development issues"
];

const TREATMENT_OPTIONS = [
  {
    title: "Metal Braces",
    slug: "braces",
    description: "Durable and effective conventional braces",
    icon: "braces",
    suitableFor: "All ages, complex cases"
  },
  {
    title: "Ceramic Braces", 
    slug: "braces",
    description: "Tooth-colored brackets for discretion",
    icon: "braces",
    suitableFor: "Adults, aesthetic concerns"
  },
  {
    title: "Lingual Braces",
    slug: "lingual-braces", 
    description: "Hidden braces on inner tooth surfaces",
    icon: "lingual",
    suitableFor: "Adults, complete invisibility"
  },
  {
    title: "Clear Aligners",
    slug: "clear-aligners",
    description: "Removable transparent aligners", 
    icon: "aligner",
    suitableFor: "Mild to moderate cases"
  }
];

const TREATMENT_PROCESS = [
  {
    step: "1",
    title: "Initial Consultation",
    duration: "60-90 minutes",
    description: "Comprehensive orthodontic assessment, X-rays, photographs, and detailed treatment planning discussion."
  },
  {
    step: "2", 
    title: "Treatment Planning",
    duration: "1-2 weeks",
    description: "Analysis of records, treatment options discussion, and appliance selection based on your needs and preferences."
  },
  {
    step: "3",
    title: "Active Treatment", 
    duration: "12-30 months",
    description: "Regular appointments every 4-8 weeks for adjustments. Duration depends on case complexity and patient compliance."
  },
  {
    step: "4",
    title: "Retention Phase",
    duration: "Lifelong",
    description: "Retainers to maintain results. Regular check-ups every 3-6 months to ensure stability."
  }
];

export default function OrthodonticsPage() {
  const orthodontist = DOCTORS.find(d => d.id === "dr-jeo-tom-charls");
  
  const orthodonticsSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure", 
    name: "Orthodontic Treatment",
    description: "Comprehensive orthodontic treatment including braces, lingual braces, and clear aligners in Pala, Kottayam District",
    procedureType: "https://health-lifesci.schema.org/DentalProcedure",
    bodyLocation: "Mouth",
    performer: {
      "@type": "Physician",
      name: orthodontist?.name,
      hasCredential: orthodontist?.qualifications,
      worksFor: {
        "@type": "Dentist",
        name: CLINIC.name,
        address: {
          "@type": "PostalAddress",
          streetAddress: CLINIC.address.street,
          addressLocality: CLINIC.address.city,
          addressRegion: CLINIC.address.state, 
          postalCode: CLINIC.address.pincode,
          addressCountry: "IN"
        }
      }
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orthodonticsSchema) }} />
      
      {/* Hero section */}
      <div className="section-padding section-warm">
        <div className="container-xl">
          <RevealFade>
            <Breadcrumb items={[{ label: "Orthodontic Treatment", href: "/orthodontics" }]} />
          </RevealFade>
          <RevealUp delay={0.05}>
            <h1
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "var(--color-dark-moss)",
                fontWeight: 400,
                marginTop: "1.5rem", 
                marginBottom: "0.75rem",
                lineHeight: 1.15,
              }}
            >
              Orthodontic Treatment in Pala
            </h1>
            <p style={{ 
              color: "var(--color-olive)", 
              fontSize: "1.0625rem", 
              maxWidth: "600px", 
              lineHeight: 1.65,
              fontFamily: "var(--font-sans)"
            }}>
              Comprehensive orthodontic care led by Dr. Jeo Tom Charls, MDS Orthodontics and Dentofacial Orthopaedics. 
              Braces, lingual braces, clear aligners, and growth modification in Pala, serving Kottayam District.
            </p>
          </RevealUp>
        </div>
      </div>

      <section className="section-padding section-white">
        <div className="container-xl">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "3rem", alignItems: "start" }}>
            
            {/* Left column */}
            <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
              
              {/* Introduction */}
              <RevealUp>
                <div>
                  <div className="accent-line" />
                  <h2 style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.75rem",
                    color: "var(--color-dark-moss)",
                    fontWeight: 400,
                    marginBottom: "1rem",
                  }}>
                    Specialist Orthodontic Care
                  </h2>
                  <p style={{ color: "var(--color-cafe-noir)", lineHeight: 1.75, fontSize: "1rem", marginBottom: "1.5rem" }}>
                    Orthodontic treatment straightens teeth and corrects bite relationships to improve both 
                    function and appearance. At Smile Architects, orthodontic care is led by Dr. Jeo Tom Charls, 
                    who holds a Master of Dental Surgery (MDS) degree specifically in Orthodontics and 
                    Dentofacial Orthopaedics.
                  </p>
                  <p style={{ color: "var(--color-cafe-noir)", lineHeight: 1.75, fontSize: "1rem" }}>
                    This specialized postgraduate qualification, combined with additional training in lingual 
                    orthodontics and clear aligner systems, allows for comprehensive treatment planning 
                    across all age groups — from growing children through to adults.
                  </p>
                </div>
              </RevealUp>

              {/* Orthodontic concerns */}
              <RevealUp delay={0.05}>
                <div>
                  <h2 style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.75rem", 
                    color: "var(--color-dark-moss)",
                    fontWeight: 400,
                    marginBottom: "1rem",
                  }}>
                    Orthodontic Concerns We Treat
                  </h2>
                  <p style={{ color: "var(--color-cafe-noir)", lineHeight: 1.75, fontSize: "1rem", marginBottom: "1.5rem" }}>
                    Orthodontic treatment can address a wide range of tooth and jaw alignment issues:
                  </p>
                  
                  <StaggerContainer stagger={0.05} style={{ display: "grid", gap: "0.75rem" }}>
                    {ORTHODONTIC_CONCERNS.map((concern) => (
                      <StaggerItem key={concern}>
                        <div style={{ 
                          display: "flex", 
                          alignItems: "center", 
                          gap: "0.75rem",
                          padding: "0.75rem",
                          backgroundColor: "var(--color-honeydew)",
                          borderRadius: "0.5rem"
                        }}>
                          <CheckIcon size="sm" color="var(--color-jonquil)" />
                          <span style={{ color: "var(--color-dark-moss)", fontSize: "0.9375rem" }}>
                            {concern}
                          </span>
                        </div>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </div>
              </RevealUp>

              {/* Treatment options */}
              <RevealUp delay={0.05}>
                <div>
                  <h2 style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.75rem",
                    color: "var(--color-dark-moss)", 
                    fontWeight: 400,
                    marginBottom: "1rem",
                  }}>
                    Orthodontic Treatment Options
                  </h2>
                  <p style={{ color: "var(--color-cafe-noir)", lineHeight: 1.75, fontSize: "1rem", marginBottom: "1.5rem" }}>
                    The choice of orthodontic appliance depends on your specific case, aesthetic preferences, 
                    lifestyle considerations, and budget. All options are available at Smile Architects:
                  </p>
                  
                  <div style={{ display: "grid", gap: "1.25rem" }}>
                    {TREATMENT_OPTIONS.map((option) => (
                      <Link
                        key={option.title}
                        href={`/treatments/${option.slug}`}
                        style={{ textDecoration: "none" }}
                      >
                        <div className="card-tea" style={{ 
                          padding: "1.5rem",
                          transition: "all 0.2s ease",
                          cursor: "pointer"
                        }}>
                          <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                            <div style={{ 
                              color: "var(--color-dark-moss)",
                              flexShrink: 0,
                              marginTop: "0.25rem"
                            }}>
                              <TreatmentIconFor slug={option.icon} size="lg" />
                            </div>
                            <div style={{ flex: 1 }}>
                              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                                <h3 style={{ 
                                  fontSize: "1.25rem", 
                                  fontWeight: 600, 
                                  color: "var(--color-dark-moss)",
                                  margin: 0
                                }}>
                                  {option.title}
                                </h3>
                                <ArrowRightIcon size="sm" color="var(--color-olive)" />
                              </div>
                              <p style={{ 
                                color: "var(--color-olive)", 
                                fontSize: "1rem", 
                                lineHeight: 1.6,
                                marginBottom: "0.75rem"
                              }}>
                                {option.description}
                              </p>
                              <p style={{ 
                                fontSize: "0.8125rem", 
                                color: "var(--color-jonquil)", 
                                fontWeight: 600,
                                backgroundColor: "rgba(234, 200, 0, 0.1)",
                                display: "inline-block",
                                padding: "0.25rem 0.75rem",
                                borderRadius: "1rem"
                              }}>
                                Best for: {option.suitableFor}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </RevealUp>

              {/* Treatment process */}
              <RevealUp delay={0.05}>
                <div>
                  <h2 style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.75rem",
                    color: "var(--color-dark-moss)",
                    fontWeight: 400, 
                    marginBottom: "1rem",
                  }}>
                    What to Expect During Treatment
                  </h2>
                  <p style={{ color: "var(--color-cafe-noir)", lineHeight: 1.75, fontSize: "1rem", marginBottom: "1.5rem" }}>
                    Understanding the orthodontic treatment process helps you plan your time and 
                    expectations throughout your journey to a straighter smile:
                  </p>
                  
                  <div style={{ display: "grid", gap: "1.5rem" }}>
                    {TREATMENT_PROCESS.map((phase) => (
                      <div key={phase.step} className="card-light" style={{ padding: "1.5rem" }}>
                        <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                          <div style={{ 
                            backgroundColor: "var(--color-jonquil)", 
                            borderRadius: "50%", 
                            padding: "0.75rem",
                            flexShrink: 0,
                            minWidth: "3rem",
                            textAlign: "center"
                          }}>
                            <span style={{ 
                              color: "var(--color-dark-moss)", 
                              fontWeight: "bold",
                              fontSize: "1.125rem"
                            }}>
                              {phase.step}
                            </span>
                          </div>
                          <div>
                            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.5rem" }}>
                              <h3 style={{ 
                                fontSize: "1.25rem", 
                                fontWeight: 600, 
                                color: "var(--color-dark-moss)",
                                margin: 0
                              }}>
                                {phase.title}
                              </h3>
                              <span style={{ 
                                fontSize: "0.8125rem", 
                                color: "var(--color-olive)", 
                                fontWeight: 600,
                                backgroundColor: "var(--color-honeydew)",
                                padding: "0.25rem 0.75rem",
                                borderRadius: "1rem"
                              }}>
                                {phase.duration}
                              </span>
                            </div>
                            <p style={{ 
                              color: "var(--color-cafe-noir)", 
                              fontSize: "0.9375rem", 
                              lineHeight: 1.6
                            }}>
                              {phase.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </RevealUp>

              {/* Your orthodontist */}
              {orthodontist && (
                <RevealUp delay={0.05}>
                  <div>
                    <h2 style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "1.75rem",
                      color: "var(--color-dark-moss)",
                      fontWeight: 400,
                      marginBottom: "1rem",
                    }}>
                      Your Orthodontist
                    </h2>
                    <Link
                      href={`/dentists/${orthodontist.slug}`}
                      style={{ textDecoration: "none" }}
                    >
                      <div className="card-tea" style={{
                        padding: "2rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "1.5rem",
                      }}>
                        <DoctorPhoto name={orthodontist.name} photo={orthodontist.photo} size="lg" />
                        <div style={{ flex: 1 }}>
                          <h3 style={{ 
                            fontFamily: "var(--font-serif)", 
                            fontSize: "1.5rem", 
                            color: "var(--color-dark-moss)", 
                            marginBottom: "0.5rem" 
                          }}>
                            {orthodontist.name}
                          </h3>
                          <p className="credentials" style={{ marginBottom: "0.75rem" }}>
                            {orthodontist.qualifications} — {orthodontist.specialty}
                          </p>
                          <p style={{ 
                            color: "var(--color-olive)", 
                            fontSize: "0.9375rem", 
                            lineHeight: 1.6,
                            marginBottom: "1rem"
                          }}>
                            Specialized training in lingual orthodontics, CAD/CAM lingual brackets, 
                            and ClearPath clear aligner systems. MDS from Sri Balaji Dental College, Chennai.
                          </p>
                          <span style={{ 
                            color: "var(--color-dark-moss)", 
                            fontWeight: 600,
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem"
                          }}>
                            View full profile <ArrowRightIcon size="sm" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                </RevealUp>
              )}

            </div>

            {/* Right column — sticky appointment form */}
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
                  <AppointmentForm
                    compact
                    heading="Book Orthodontic Consultation"
                  />
                </div>
              </div>
            </RevealFade>

          </div>
        </div>
      </section>

      {/* FAQ section */}
      <section className="section-padding section-light">
        <div className="container-xl">
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <div className="accent-line" style={{ margin: "0 auto 1.5rem" }} />
              <h2 style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.75rem",
                color: "var(--color-dark-moss)",
                fontWeight: 400,
                marginBottom: "1rem",
              }}>
                Frequently Asked Questions
              </h2>
            </div>
            
            <div style={{ display: "grid", gap: "1.5rem" }}>
              <div className="card-light" style={{ padding: "1.5rem" }}>
                <h3 style={{ 
                  fontSize: "1.125rem", 
                  fontWeight: 600, 
                  color: "var(--color-dark-moss)", 
                  marginBottom: "0.75rem" 
                }}>
                  What age is best to start orthodontic treatment?
                </h3>
                <p style={{ color: "var(--color-cafe-noir)", fontSize: "0.9375rem", lineHeight: 1.6 }}>
                  While treatment can be successful at any age, the ideal time for assessment is around age 7-9. 
                  However, many adults successfully undergo orthodontic treatment. The key is healthy teeth and gums.
                </p>
              </div>

              <div className="card-light" style={{ padding: "1.5rem" }}>
                <h3 style={{ 
                  fontSize: "1.125rem", 
                  fontWeight: 600, 
                  color: "var(--color-dark-moss)", 
                  marginBottom: "0.75rem" 
                }}>
                  How long does orthodontic treatment take?
                </h3>
                <p style={{ color: "var(--color-cafe-noir)", fontSize: "0.9375rem", lineHeight: 1.6 }}>
                  Treatment duration varies from 12-30 months depending on case complexity, the type of appliance used, 
                  and patient compliance. Simple cases may be completed faster, while complex cases require more time.
                </p>
              </div>

              <div className="card-light" style={{ padding: "1.5rem" }}>
                <h3 style={{ 
                  fontSize: "1.125rem", 
                  fontWeight: 600, 
                  color: "var(--color-dark-moss)", 
                  marginBottom: "0.75rem" 
                }}>
                  Are lingual braces suitable for everyone?
                </h3>
                <p style={{ color: "var(--color-cafe-noir)", fontSize: "0.9375rem", lineHeight: 1.6 }}>
                  Lingual braces can treat most orthodontic cases, but suitability depends on tooth shape, 
                  bite pattern, and patient tolerance. Dr. Jeo Tom Charls will assess whether lingual treatment 
                  is appropriate during your consultation.
                </p>
              </div>

              <div className="card-light" style={{ padding: "1.5rem" }}>
                <h3 style={{ 
                  fontSize: "1.125rem", 
                  fontWeight: 600, 
                  color: "var(--color-dark-moss)", 
                  marginBottom: "0.75rem" 
                }}>
                  Do I need to wear retainers after treatment?
                </h3>
                <p style={{ color: "var(--color-cafe-noir)", fontSize: "0.9375rem", lineHeight: 1.6 }}>
                  Yes, retainers are essential to maintain your results. Without retention, teeth naturally 
                  tend to shift back towards their original positions. The retention phase is lifelong, 
                  though check-up frequency reduces over time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="section-padding section-dark">
        <div className="container-xl" style={{ textAlign: "center" }}>
          <h2 style={{ 
            fontFamily: "var(--font-serif)", 
            fontSize: "1.75rem", 
            color: "var(--color-honeydew)", 
            fontWeight: 400,
            marginBottom: "1rem"
          }}>
            Ready to Start Your Orthodontic Journey?
          </h2>
          <p style={{ 
            color: "var(--color-honeydew)", 
            opacity: 0.85,
            maxWidth: "500px", 
            margin: "0 auto 2rem",
            lineHeight: 1.65,
            fontSize: "1rem"
          }}>
            Book a comprehensive orthodontic consultation with Dr. Jeo Tom Charls. 
            We'll assess your case and discuss all treatment options available.
          </p>
          <div style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap", justifyContent: "center" }}>
            <Link href="/book-appointment" className="btn btn-secondary btn-lg">
              Book Orthodontic Consultation
            </Link>
            <a href={`tel:${CLINIC.contact.phone}`} className="btn btn-ghost-light">
              Call {CLINIC.contact.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}