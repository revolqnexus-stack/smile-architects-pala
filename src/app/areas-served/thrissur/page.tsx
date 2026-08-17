import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";
import { CLINIC, TREATMENTS, DOCTORS } from "@/lib/site-config";
import Breadcrumb from "@/components/ui/Breadcrumb";
import AppointmentForm from "@/components/ui/AppointmentForm";
import { MapPinIcon, PhoneIcon, ClockIcon, CareIcon, CheckIcon } from "@/components/ui/icons";

export const metadata: Metadata = buildMetadata({
  title: "Dental & Orthodontic Care for Patients from Thrissur | Smile Architects",
  description:
    "Smile Architects is located in Pala, Kottayam District. Explore dental and orthodontic treatments for patients from Thrissur, including treatment information, travel guidance and appointments.",
  canonical: "/areas-served/thrissur",
});

const SPECIALIST_TREATMENTS = [
  {
    title: "Lingual Braces",
    description: "Hidden braces fitted behind teeth — requires specialized training",
    href: "/orthodontics/lingual-braces"
  },
  {
    title: "Clear Aligners",
    description: "Transparent removable aligners for discreet treatment",
    href: "/orthodontics/clear-aligners"
  },
  {
    title: "Damon System",
    description: "Self-ligating brackets for faster, more comfortable treatment",
    href: "/orthodontics/braces"
  },
  {
    title: "Dental Implants",
    description: "Permanent tooth replacement solutions",
    href: "/treatments/dental-implants"
  },
  {
    title: "Smile Design",
    description: "Comprehensive cosmetic smile transformation",
    href: "/treatments/smile-design"
  },
];

const FAQS_THRISSUR = [
  {
    question: "Is Smile Architects located in Thrissur?",
    answer: "No. Smile Architects is located in Pala, Kottayam District. Patients from Thrissur can travel to our Pala clinic for consultation and treatment."
  },
  {
    question: "Can I travel from Thrissur for orthodontic treatment?",
    answer: "Yes. Many patients travel from Thrissur to Smile Architects in Pala for specialist orthodontic treatment, including lingual braces and clear aligner therapy. Treatment appointments can be scheduled to accommodate your travel requirements."
  },
  {
    question: "How often will I need to visit the clinic?",
    answer: "Initial consultations typically require 60-90 minutes. During active orthodontic treatment, adjustment appointments are usually scheduled every 4-8 weeks and take 20-30 minutes. After treatment completion, retainer check appointments every 3-6 months help maintain results."
  },
  {
    question: "Can I book a consultation before travelling?",
    answer: "Yes. You can book appointments by calling +91 9446 999 333 or using the online appointment form. We recommend scheduling in advance to ensure convenient appointment times."
  },
  {
    question: "Where is the clinic located?",
    answer: "Smile Architects is located at Kattakkayam Road, Pala, Kottayam District, Kerala – 686575. The clinic is near Federal Bank in Pala Town, with ample parking available for patients."
  },
  {
    question: "How do I get to Smile Architects from Thrissur?",
    answer: "Travel time and route can vary depending on your starting point and traffic conditions. The clinic is accessible via NH544 and NH183. We recommend using GPS navigation for the most current route. Call us for specific directions if needed."
  },
];

export default function ThrissurServicePage() {
  const leadOrthodontist = DOCTORS.find(d => d.id === "dr-jeo-tom-charls");
  
  return (
    <>
      {/* Location Clarity Statement */}
      <div className="section-padding section-warm">
        <div className="container-xl">
          <Breadcrumb items={[
            { label: "Areas Served", href: "/areas-served" },
            { label: "Thrissur", href: "/areas-served/thrissur" }
          ]} />
          
          {/* Important disclaimer */}
          <div className="card-light" style={{ 
            padding: "1.5rem", 
            marginTop: "1.5rem",
            marginBottom: "2rem", 
            backgroundColor: "var(--color-vanilla)",
            border: "2px solid var(--color-jonquil)"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.75rem" }}>
              <MapPinIcon size="lg" color="var(--color-dark-moss)" />
              <p style={{ 
                fontSize: "1rem", 
                fontWeight: 600, 
                color: "var(--color-dark-moss)",
                margin: 0
              }}>
                Important: Smile Architects is located in Pala, Kottayam District
              </p>
            </div>
            <p style={{ 
              color: "var(--color-cafe-noir)", 
              fontSize: "0.9375rem", 
              lineHeight: 1.6,
              margin: 0
            }}>
              Smile Architects does not have a branch in Thrissur. This page provides information for 
              patients from Thrissur who are considering travelling to our Pala clinic for specialist 
              dental or orthodontic treatment.
            </p>
          </div>

          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "var(--color-dark-moss)",
              fontWeight: 400,
              marginBottom: "0.75rem",
              lineHeight: 1.15,
            }}
          >
            Dental & Orthodontic Care for Patients from Thrissur
          </h1>
          <p style={{ 
            color: "var(--color-olive)", 
            fontSize: "1.0625rem", 
            maxWidth: "650px", 
            lineHeight: 1.65,
            fontFamily: "var(--font-sans)"
          }}>
            Smile Architects is located in Pala, Kottayam District, Kerala. Patients from Thrissur who 
            are considering specialist dental or orthodontic treatment can travel to our Pala clinic for 
            consultation and treatment.
          </p>
        </div>
      </div>

      <section className="section-padding section-white">
        <div className="container-xl">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "3rem", alignItems: "start" }}>
            
            {/* Left column */}
            <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
              
              {/* Why consider travelling */}
              <div>
                <div className="accent-line" />
                <h2 style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.75rem",
                  color: "var(--color-dark-moss)",
                  fontWeight: 400,
                  marginBottom: "1rem",
                }}>
                  Considering Travelling from Thrissur to Pala?
                </h2>
                <p style={{ color: "var(--color-cafe-noir)", lineHeight: 1.75, fontSize: "1rem", marginBottom: "1.5rem" }}>
                  When considering orthodontic treatment or specialist dental care, some patients choose 
                  to travel for access to specific qualifications, treatment techniques, or continuity of 
                  specialist care throughout their treatment journey.
                </p>
                
                <div style={{ display: "grid", gap: "1.25rem" }}>
                  <div className="card-tea" style={{ padding: "1.5rem" }}>
                    <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--color-dark-moss)", marginBottom: "0.75rem" }}>
                      Specialist Orthodontic Qualification
                    </h3>
                    <p style={{ color: "var(--color-olive)", fontSize: "1rem", lineHeight: 1.6, marginBottom: "1rem" }}>
                      Dr. Jeo Tom Charls holds a Master of Dental Surgery (MDS) degree in Orthodontics and 
                      Dentofacial Orthopaedics — a specialized postgraduate qualification focusing exclusively 
                      on tooth movement, jaw growth, and bite correction.
                    </p>
                    {leadOrthodontist && (
                      <Link 
                        href={`/dentists/${leadOrthodontist.slug}`}
                        style={{ 
                          color: "var(--color-dark-moss)", 
                          textDecoration: "none", 
                          fontWeight: 600,
                          fontSize: "0.9375rem"
                        }}
                      >
                        View Dr. Jeo Tom Charls' qualifications →
                      </Link>
                    )}
                  </div>
                  
                  <div className="card-tea" style={{ padding: "1.5rem" }}>
                    <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--color-dark-moss)", marginBottom: "0.75rem" }}>
                      Advanced Treatment Options
                    </h3>
                    <p style={{ color: "var(--color-olive)", fontSize: "1rem", lineHeight: 1.6, marginBottom: "1rem" }}>
                      Specialized training in lingual orthodontics (hidden braces), CAD/CAM lingual bracket 
                      systems, and clear aligner certification allows for treatment options that may require 
                      additional specialist training.
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                      {["Lingual Braces", "Clear Aligners", "Surgical Orthodontics"].map((specialty) => (
                        <span key={specialty} style={{
                          backgroundColor: "rgba(234, 200, 0, 0.15)",
                          color: "var(--color-dark-moss)",
                          padding: "0.25rem 0.75rem",
                          borderRadius: "1rem",
                          fontSize: "0.8125rem",
                          fontWeight: 600
                        }}>
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="card-tea" style={{ padding: "1.5rem" }}>
                    <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--color-dark-moss)", marginBottom: "0.75rem" }}>
                      Continuity of Specialist Care
                    </h3>
                    <p style={{ color: "var(--color-olive)", fontSize: "1rem", lineHeight: 1.6 }}>
                      Orthodontic treatment typically spans 12-24 months. Having the same MDS-qualified 
                      orthodontist manage your entire treatment from diagnosis through retention ensures 
                      consistent clinical decisions and treatment outcomes.
                    </p>
                  </div>
                </div>
              </div>

              {/* Specialist treatments */}
              <div>
                <h2 style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.75rem",
                  color: "var(--color-dark-moss)",
                  fontWeight: 400,
                  marginBottom: "1rem",
                }}>
                  Specialist Orthodontic & Dental Treatments
                </h2>
                <p style={{ color: "var(--color-cafe-noir)", lineHeight: 1.75, fontSize: "1rem", marginBottom: "1.5rem" }}>
                  The following specialist treatments are available at Smile Architects in Pala:
                </p>
                
                <div style={{ display: "grid", gap: "1rem" }}>
                  {SPECIALIST_TREATMENTS.map((treatment) => (
                    <Link 
                      key={treatment.title}
                      href={treatment.href}
                      style={{ textDecoration: "none" }}
                    >
                      <div className="card-light" style={{ 
                        padding: "1.25rem",
                        transition: "all 0.2s ease",
                        cursor: "pointer"
                      }}>
                        <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "var(--color-dark-moss)", marginBottom: "0.5rem" }}>
                          {treatment.title}
                        </h3>
                        <p style={{ color: "var(--color-olive)", fontSize: "0.9375rem", lineHeight: 1.6 }}>
                          {treatment.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>

                <div style={{ marginTop: "1.5rem", display: "flex", gap: "0.875rem", flexWrap: "wrap" }}>
                  <Link href="/orthodontics" className="btn btn-primary">
                    Explore Orthodontic Treatments
                  </Link>
                  <Link href="/treatments" className="btn btn-ghost">
                    All Treatments
                  </Link>
                </div>
              </div>

              {/* Meet the clinical team */}
              <div>
                <h2 style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.75rem",
                  color: "var(--color-dark-moss)",
                  fontWeight: 400,
                  marginBottom: "1rem",
                }}>
                  Meet the Clinical Team
                </h2>
                <p style={{ color: "var(--color-cafe-noir)", lineHeight: 1.75, fontSize: "1rem", marginBottom: "1.5rem" }}>
                  Our team of dental specialists and general dentists work together to provide 
                  comprehensive care:
                </p>
                
                <div style={{ display: "grid", gap: "1rem" }}>
                  {DOCTORS.filter(d => !d.visiting).slice(0, 3).map((doctor) => (
                    <Link 
                      key={doctor.id}
                      href={`/dentists/${doctor.slug}`}
                      style={{ textDecoration: "none" }}
                    >
                      <div className="card-tea" style={{ 
                        padding: "1.25rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                        transition: "all 0.2s ease",
                        cursor: "pointer"
                      }}>
                        <div style={{ flex: 1 }}>
                          <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "var(--color-dark-moss)", marginBottom: "0.25rem" }}>
                            {doctor.name}
                          </h3>
                          <p className="credentials" style={{ marginBottom: "0.25rem" }}>
                            {doctor.qualifications} — {doctor.specialty}
                          </p>
                          <p style={{ fontSize: "0.875rem", color: "var(--color-olive)" }}>
                            {doctor.roles[0]}
                          </p>
                        </div>
                        <span style={{ 
                          color: "var(--color-jonquil)", 
                          fontSize: "0.875rem",
                          fontWeight: 600,
                          flexShrink: 0
                        }}>
                          View profile →
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Planning treatment from Thrissur */}
              <div>
                <h2 style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.75rem",
                  color: "var(--color-dark-moss)",
                  fontWeight: 400,
                  marginBottom: "1rem",
                }}>
                  Planning Treatment from Thrissur
                </h2>
                <p style={{ color: "var(--color-cafe-noir)", lineHeight: 1.75, fontSize: "1rem", marginBottom: "1.5rem" }}>
                  Understanding the treatment process and appointment schedule can help you plan your 
                  orthodontic or dental care:
                </p>
                
                <div style={{ display: "grid", gap: "1.25rem" }}>
                  <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                    <div style={{ 
                      backgroundColor: "var(--color-tea-green)", 
                      borderRadius: "50%", 
                      padding: "0.75rem",
                      flexShrink: 0,
                      minWidth: "3rem"
                    }}>
                      <span style={{ 
                        color: "var(--color-dark-moss)", 
                        fontWeight: "bold",
                        fontSize: "1.125rem"
                      }}>
                        1
                      </span>
                    </div>
                    <div>
                      <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "var(--color-dark-moss)", marginBottom: "0.5rem" }}>
                        Initial Consultation
                      </h3>
                      <p style={{ color: "var(--color-cafe-noir)", fontSize: "0.9375rem", lineHeight: 1.6 }}>
                        Comprehensive assessment including clinical examination, X-rays, photographs, and 
                        treatment planning discussion. This appointment typically requires 60-90 minutes and 
                        allows for detailed evaluation of your treatment needs and options.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                    <div style={{ 
                      backgroundColor: "var(--color-tea-green)", 
                      borderRadius: "50%", 
                      padding: "0.75rem",
                      flexShrink: 0,
                      minWidth: "3rem"
                    }}>
                      <span style={{ 
                        color: "var(--color-dark-moss)", 
                        fontWeight: "bold",
                        fontSize: "1.125rem"
                      }}>
                        2
                      </span>
                    </div>
                    <div>
                      <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "var(--color-dark-moss)", marginBottom: "0.5rem" }}>
                        Treatment Appointments
                      </h3>
                      <p style={{ color: "var(--color-cafe-noir)", fontSize: "0.9375rem", lineHeight: 1.6 }}>
                        Orthodontic adjustment appointments are typically scheduled every 4-8 weeks during 
                        active treatment and usually require 20-30 minutes. Appointment scheduling can be 
                        arranged to accommodate your travel requirements where possible.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                    <div style={{ 
                      backgroundColor: "var(--color-tea-green)", 
                      borderRadius: "50%", 
                      padding: "0.75rem",
                      flexShrink: 0,
                      minWidth: "3rem"
                    }}>
                      <span style={{ 
                        color: "var(--color-dark-moss)", 
                        fontWeight: "bold",
                        fontSize: "1.125rem"
                      }}>
                        3
                      </span>
                    </div>
                    <div>
                      <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "var(--color-dark-moss)", marginBottom: "0.5rem" }}>
                        Follow-up Care
                      </h3>
                      <p style={{ color: "var(--color-cafe-noir)", fontSize: "0.9375rem", lineHeight: 1.6 }}>
                        After active treatment completion, retainer check appointments help maintain your 
                        results. These appointments are less frequent (typically every 3-6 months) and brief.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Travel information */}
              <div>
                <h2 style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.75rem",
                  color: "var(--color-dark-moss)",
                  fontWeight: 400,
                  marginBottom: "1rem",
                }}>
                  Travel Information
                </h2>
                <p style={{ color: "var(--color-cafe-noir)", lineHeight: 1.75, fontSize: "1rem", marginBottom: "1.5rem" }}>
                  Practical information for patients travelling from Thrissur to Pala:
                </p>
                
                <div style={{ display: "grid", gap: "1.25rem" }}>
                  <div className="card-light" style={{ padding: "1.5rem" }}>
                    <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "var(--color-dark-moss)", marginBottom: "0.75rem" }}>
                      Distance & Route
                    </h3>
                    <p style={{ color: "var(--color-cafe-noir)", fontSize: "0.9375rem", lineHeight: 1.6, marginBottom: "0.75rem" }}>
                      Travel time and route can vary depending on your starting point, route choice, and 
                      traffic conditions. The clinic is accessible via NH544 and NH183. We recommend using 
                      GPS navigation for the most current route information.
                    </p>
                    <p style={{ color: "var(--color-olive)", fontSize: "0.875rem", fontStyle: "italic" }}>
                      Call us at {CLINIC.contact.phoneDisplay} if you need specific directions.
                    </p>
                  </div>

                  <div className="card-light" style={{ padding: "1.5rem" }}>
                    <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                      <div style={{ 
                        backgroundColor: "var(--color-tea-green)", 
                        borderRadius: "50%", 
                        padding: "0.75rem",
                        flexShrink: 0 
                      }}>
                        <CareIcon size="md" color="var(--color-dark-moss)" />
                      </div>
                      <div>
                        <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "var(--color-dark-moss)", marginBottom: "0.5rem" }}>
                          Parking & Accessibility
                        </h3>
                        <p style={{ color: "var(--color-cafe-noir)", fontSize: "0.9375rem", lineHeight: 1.6 }}>
                          Ample car parking is available at the clinic for patients travelling from other 
                          areas. The facility is located on Kattakkayam Road, near Federal Bank in Pala Town.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="card-light" style={{ padding: "1.5rem" }}>
                    <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                      <div style={{ 
                        backgroundColor: "var(--color-tea-green)", 
                        borderRadius: "50%", 
                        padding: "0.75rem",
                        flexShrink: 0 
                      }}>
                        <ClockIcon size="md" color="var(--color-dark-moss)" />
                      </div>
                      <div>
                        <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "var(--color-dark-moss)", marginBottom: "0.5rem" }}>
                          Appointment Scheduling
                        </h3>
                        <p style={{ color: "var(--color-cafe-noir)", fontSize: "0.9375rem", lineHeight: 1.6 }}>
                          We recommend booking appointments in advance. Treatment scheduling can be arranged 
                          to accommodate your travel requirements where possible. Call {CLINIC.contact.phoneDisplay} or 
                          use our online booking form.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Clinic location */}
              <div>
                <h2 style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.75rem",
                  color: "var(--color-dark-moss)",
                  fontWeight: 400,
                  marginBottom: "1rem",
                }}>
                  Clinic Location
                </h2>
                <p style={{ color: "var(--color-cafe-noir)", lineHeight: 1.75, fontSize: "1rem", marginBottom: "1.5rem" }}>
                  Smile Architects is located in Pala, Kottayam District:
                </p>
                
                <div className="card-tea" style={{ padding: "1.5rem", marginBottom: "1.5rem" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", marginBottom: "1rem" }}>
                    <MapPinIcon size="lg" color="var(--color-dark-moss)" />
                    <div>
                      <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--color-dark-moss)", marginBottom: "0.5rem" }}>
                        Full Address
                      </h3>
                      <p style={{ color: "var(--color-olive)", fontSize: "0.9375rem", lineHeight: 1.6 }}>
                        {CLINIC.address.full}<br />
                        {CLINIC.address.landmark}
                      </p>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap" }}>
                    <Link 
                      href={CLINIC.platforms.googleMaps.directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-sm"
                    >
                      Get Directions
                    </Link>
                    <a href={`tel:${CLINIC.contact.phone}`} className="btn btn-ghost btn-sm">
                      Call Clinic
                    </a>
                  </div>
                </div>

                <div className="map-frame" style={{ aspectRatio: "16/10", borderRadius: "var(--radius-lg)" }}>
                  <iframe
                    title="Smile Architects location — Kattakkayam Road, Pala, Kottayam"
                    src={CLINIC.platforms.googleMaps.embedUrl}
                    width="100%" height="100%"
                    style={{ border: 0, display: "block", borderRadius: "inherit" }}
                    allowFullScreen loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>

              {/* FAQs */}
              <div>
                <h2 style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.75rem",
                  color: "var(--color-dark-moss)",
                  fontWeight: 400,
                  marginBottom: "1rem",
                }}>
                  Frequently Asked Questions for Thrissur Patients
                </h2>
                
                <div style={{ display: "grid", gap: "1rem" }}>
                  {FAQS_THRISSUR.map((faq, index) => (
                    <details key={index} className="faq-item" style={{ 
                      padding: "1.25rem",
                      backgroundColor: "var(--color-honeydew)",
                      borderRadius: "0.75rem",
                      border: "1px solid var(--color-tea-green)"
                    }}>
                      <summary style={{ 
                        fontSize: "1.0625rem", 
                        fontWeight: 600, 
                        color: "var(--color-dark-moss)", 
                        cursor: "pointer",
                        listStyle: "none",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                      }}>
                        {faq.question}
                        <span style={{ color: "var(--color-jonquil)", fontSize: "1.25rem" }}>+</span>
                      </summary>
                      <div style={{ marginTop: "0.75rem", paddingTop: "0.75rem", borderTop: "1px solid var(--color-tea-green)" }}>
                        <p style={{ color: "var(--color-cafe-noir)", fontSize: "0.9375rem", lineHeight: 1.65 }}>
                          {faq.answer}
                        </p>
                      </div>
                    </details>
                  ))}
                </div>
              </div>

            </div>

            {/* Right column — sticky appointment form */}
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
                  heading="Book Consultation in Pala"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Contact and directions */}
      <section className="section-padding section-dark">
        <div className="container-xl">
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <h2 style={{ 
              fontFamily: "var(--font-serif)", 
              fontSize: "1.75rem", 
              color: "var(--color-honeydew)", 
              fontWeight: 400,
              marginBottom: "0.75rem"
            }}>
              Ready to Discuss Your Treatment Options?
            </h2>
            <p style={{ 
              color: "var(--color-honeydew)", 
              opacity: 0.85,
              maxWidth: "550px", 
              margin: "0 auto",
              lineHeight: 1.65,
              fontSize: "1rem"
            }}>
              Contact Smile Architects to schedule a consultation. We'll discuss your treatment goals 
              and create a plan that works for your requirements and schedule.
            </p>
          </div>

          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
            gap: "2rem",
            marginBottom: "2rem"
          }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ 
                backgroundColor: "rgba(255, 255, 255, 0.1)", 
                borderRadius: "50%", 
                padding: "1rem",
                display: "inline-flex",
                marginBottom: "1rem"
              }}>
                <PhoneIcon size="lg" color="var(--color-honeydew)" />
              </div>
              <h3 style={{ color: "var(--color-honeydew)", fontSize: "1.125rem", marginBottom: "0.5rem" }}>
                Call Clinic
              </h3>
              <p style={{ color: "var(--color-honeydew)", opacity: 0.8 }}>
                <a href={`tel:${CLINIC.contact.phone}`} style={{ color: "inherit", textDecoration: "none" }}>
                  {CLINIC.contact.phoneDisplay}
                </a>
              </p>
            </div>

            <div style={{ textAlign: "center" }}>
              <div style={{ 
                backgroundColor: "rgba(255, 255, 255, 0.1)", 
                borderRadius: "50%", 
                padding: "1rem",
                display: "inline-flex",
                marginBottom: "1rem"
              }}>
                <ClockIcon size="lg" color="var(--color-honeydew)" />
              </div>
              <h3 style={{ color: "var(--color-honeydew)", fontSize: "1.125rem", marginBottom: "0.5rem" }}>
                Clinic Hours
              </h3>
              <p style={{ color: "var(--color-honeydew)", opacity: 0.8 }}>
                {CLINIC.hours.weekdays.label}<br />
                {CLINIC.hours.weekdays.open} – {CLINIC.hours.weekdays.close}
              </p>
            </div>

            <div style={{ textAlign: "center" }}>
              <div style={{ 
                backgroundColor: "rgba(255, 255, 255, 0.1)", 
                borderRadius: "50%", 
                padding: "1rem",
                display: "inline-flex",
                marginBottom: "1rem"
              }}>
                <MapPinIcon size="lg" color="var(--color-honeydew)" />
              </div>
              <h3 style={{ color: "var(--color-honeydew)", fontSize: "1.125rem", marginBottom: "0.5rem" }}>
                Location
              </h3>
              <p style={{ color: "var(--color-honeydew)", opacity: 0.8 }}>
                {CLINIC.address.street}<br />
                {CLINIC.address.city}, {CLINIC.address.district}
              </p>
            </div>
          </div>

          <div style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap", justifyContent: "center" }}>
            <Link href="/book-appointment" className="btn btn-secondary btn-lg">
              Book Consultation
            </Link>
            <Link 
              href={CLINIC.platforms.googleMaps.directionsUrl}
              target="_blank"
              rel="noopener noreferrer" 
              className="btn btn-ghost-light"
            >
              Get Directions to Pala
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
