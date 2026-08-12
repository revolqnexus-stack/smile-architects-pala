import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";
import { CLINIC, TREATMENTS, DOCTORS } from "@/lib/site-config";
import Breadcrumb from "@/components/ui/Breadcrumb";
import AppointmentForm from "@/components/ui/AppointmentForm";
import { MapPinIcon, PhoneIcon, ClockIcon, CareIcon, CheckIcon } from "@/components/ui/icons";

export const metadata: Metadata = buildMetadata({
  title: "Dental Clinic Serving Kottayam District from Pala | Smile Architects",
  description:
    "Smile Architects is located in Pala, Kottayam District. Comprehensive dental care and orthodontic treatment for patients from Kottayam town and across Kottayam District. MDS Orthodontist, dental implants, lingual braces.",
  canonical: "/areas-served/kottayam",
});

const KOTTAYAM_TRAVEL_INFO = [
  { route: "Kottayam to Pala", distance: "35 km", time: "45-60 minutes", road: "Via SH-15 and MC Road" },
  { route: "Changanassery to Pala", distance: "18 km", time: "30-40 minutes", road: "Via Pala-Changanassery Road" },
  { route: "Ettumanoor to Pala", distance: "25 km", time: "35-45 minutes", road: "Via NH183" },
];

const ORTHODONTIC_SPECIALTIES = [
  "Conventional metal and ceramic braces",
  "Damon self-ligating bracket systems", 
  "Lingual braces (hidden behind teeth)",
  "Clear aligner treatment (ClearPath certified)",
  "Surgical orthodontics coordination",
  "Adult orthodontic treatment",
  "Growth modification for children",
];

export default function KottayamServicePage() {
  const leadOrthodontist = DOCTORS.find(d => d.id === "dr-jeo-tom-charls");
  
  return (
    <>
      {/* Location Clarity Statement */}
      <div className="section-padding section-warm">
        <div className="container-xl">
          <Breadcrumb items={[
            { label: "Areas Served", href: "/areas-served" },
            { label: "Kottayam District", href: "/areas-served/kottayam" }
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
              This page describes the clinic's regional service area and does not represent a physical 
              branch in Kottayam town. Our dental clinic is physically located at Kattakkayam Road, Pala.
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
            Dental Care for Patients from Kottayam District
          </h1>
          <p style={{ 
            color: "var(--color-olive)", 
            fontSize: "1.0625rem", 
            maxWidth: "600px", 
            lineHeight: 1.65,
            fontFamily: "var(--font-sans)"
          }}>
            Patients from Kottayam town and across the district regularly visit Smile Architects in Pala 
            for comprehensive dental care and specialist orthodontic treatment.
          </p>
        </div>
      </div>

      <section className="section-padding section-white">
        <div className="container-xl">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "3rem", alignItems: "start" }}>
            
            {/* Left column */}
            <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
              
              {/* Why patients from Kottayam choose Pala */}
              <div>
                <div className="accent-line" />
                <h2 style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.75rem",
                  color: "var(--color-dark-moss)",
                  fontWeight: 400,
                  marginBottom: "1rem",
                }}>
                  Why Patients from Kottayam District Visit Pala
                </h2>
                <p style={{ color: "var(--color-cafe-noir)", lineHeight: 1.75, fontSize: "1rem", marginBottom: "1.5rem" }}>
                  When considering orthodontic treatment or comprehensive dental care, the choice of clinic 
                  often depends on the specialist qualifications available, the treatment options offered, 
                  and the continuity of care provided throughout your treatment journey.
                </p>
                
                <div style={{ display: "grid", gap: "1.25rem" }}>
                  <div className="card-tea" style={{ padding: "1.5rem" }}>
                    <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--color-dark-moss)", marginBottom: "0.75rem" }}>
                      MDS Orthodontic Specialist
                    </h3>
                    <p style={{ color: "var(--color-olive)", fontSize: "1rem", lineHeight: 1.6, marginBottom: "1rem" }}>
                      Dr. Jeo Tom Charls holds a Master of Dental Surgery (MDS) degree in Orthodontics and 
                      Dentofacial Orthopaedics from Sri Balaji Dental College, Chennai. This specialized 
                      postgraduate qualification focuses exclusively on tooth movement, jaw growth, and bite correction.
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
                        View Dr. Jeo Tom Charls' profile →
                      </Link>
                    )}
                  </div>
                  
                  <div className="card-tea" style={{ padding: "1.5rem" }}>
                    <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--color-dark-moss)", marginBottom: "0.75rem" }}>
                      Advanced Orthodontic Training
                    </h3>
                    <p style={{ color: "var(--color-olive)", fontSize: "1rem", lineHeight: 1.6, marginBottom: "1rem" }}>
                      Specialized training in lingual orthodontics (hidden braces), CAD/CAM lingual bracket systems, 
                      and ClearPath clear aligner certification allows for a comprehensive range of treatment options.
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                      {["Lingual Braces", "Clear Aligners", "Damon System"].map((specialty) => (
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
                      Comprehensive Dental Care
                    </h3>
                    <p style={{ color: "var(--color-olive)", fontSize: "1rem", lineHeight: 1.6 }}>
                      Beyond orthodontics, the clinic provides general dentistry, dental implants, cosmetic dentistry, 
                      root canal treatment, and pediatric care — allowing for coordinated treatment planning 
                      when multiple procedures are needed.
                    </p>
                  </div>
                </div>
              </div>

              {/* Orthodontic treatments available */}
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
                  The full range of modern orthodontic appliances and techniques are available at Smile Architects:
                </p>
                
                <div style={{ display: "grid", gap: "0.75rem" }}>
                  {ORTHODONTIC_SPECIALTIES.map((specialty) => (
                    <div key={specialty} style={{ 
                      display: "flex", 
                      alignItems: "center", 
                      gap: "0.75rem",
                      padding: "0.75rem",
                      backgroundColor: "var(--color-honeydew)",
                      borderRadius: "0.5rem"
                    }}>
                      <CheckIcon size="sm" color="var(--color-jonquil)" />
                      <span style={{ color: "var(--color-dark-moss)", fontSize: "0.9375rem" }}>
                        {specialty}
                      </span>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: "1.5rem", display: "flex", gap: "0.875rem", flexWrap: "wrap" }}>
                  <Link href="/treatments/orthodontics" className="btn btn-primary">
                    Learn About Orthodontics
                  </Link>
                  <Link href="/treatments/lingual-braces" className="btn btn-ghost">
                    Lingual Braces
                  </Link>
                </div>
              </div>

              {/* Travel and accessibility */}
              <div>
                <h2 style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.75rem",
                  color: "var(--color-dark-moss)",
                  fontWeight: 400,
                  marginBottom: "1rem",
                }}>
                  Traveling from Kottayam District
                </h2>
                <p style={{ color: "var(--color-cafe-noir)", lineHeight: 1.75, fontSize: "1rem", marginBottom: "1.5rem" }}>
                  Pala is well-connected by road to major towns across Kottayam District. Here are typical 
                  travel times and routes:
                </p>
                
                <div style={{ display: "grid", gap: "1rem" }}>
                  {KOTTAYAM_TRAVEL_INFO.map((info) => (
                    <div key={info.route} className="card-light" style={{ padding: "1.25rem" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                        <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "var(--color-dark-moss)" }}>
                          {info.route}
                        </h3>
                        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                          <span style={{ 
                            fontSize: "0.8125rem", 
                            color: "var(--color-jonquil)", 
                            fontWeight: 600,
                            backgroundColor: "rgba(234, 200, 0, 0.1)",
                            padding: "0.25rem 0.5rem",
                            borderRadius: "0.5rem"
                          }}>
                            {info.distance}
                          </span>
                          <span style={{ fontSize: "0.8125rem", color: "var(--color-olive)", fontWeight: 500 }}>
                            {info.time}
                          </span>
                        </div>
                      </div>
                      <p style={{ color: "var(--color-olive)", fontSize: "0.875rem" }}>
                        {info.road}
                      </p>
                    </div>
                  ))}
                </div>
                
                <div style={{ marginTop: "1.5rem", padding: "1.25rem", backgroundColor: "var(--color-honeydew)", borderRadius: "0.75rem" }}>
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
                        Parking Available
                      </h3>
                      <p style={{ color: "var(--color-cafe-noir)", fontSize: "0.9375rem", lineHeight: 1.6 }}>
                        Ample car parking is available at the clinic for patients traveling from other parts 
                        of Kottayam District. The clinic is easily accessible from the main Pala town area.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Appointment planning */}
              <div>
                <h2 style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.75rem",
                  color: "var(--color-dark-moss)",
                  fontWeight: 400,
                  marginBottom: "1rem",
                }}>
                  Planning Your Orthodontic Treatment
                </h2>
                <p style={{ color: "var(--color-cafe-noir)", lineHeight: 1.75, fontSize: "1rem", marginBottom: "1.5rem" }}>
                  For patients traveling from Kottayam District, understanding the treatment process and 
                  appointment schedule can help in planning your care:
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
                        Initial Consultation (60-90 minutes)
                      </h3>
                      <p style={{ color: "var(--color-cafe-noir)", fontSize: "0.9375rem", lineHeight: 1.6 }}>
                        Comprehensive orthodontic assessment, X-rays, photographs, and treatment planning. 
                        This longer appointment allows for detailed discussion of all treatment options.
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
                        Regular Adjustments (Every 4-8 weeks)
                      </h3>
                      <p style={{ color: "var(--color-cafe-noir)", fontSize: "0.9375rem", lineHeight: 1.6 }}>
                        Shorter appointments (20-30 minutes) for brace adjustments or aligner progress checks. 
                        Frequency depends on the type of treatment and stage of progress.
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
                        Retention Phase
                      </h3>
                      <p style={{ color: "var(--color-cafe-noir)", fontSize: "0.9375rem", lineHeight: 1.6 }}>
                        After active treatment, retainer appointments every 3-6 months help maintain 
                        your results. These appointments are brief and less frequent.
                      </p>
                    </div>
                  </div>
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
                  heading="Book Orthodontic Consultation"
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
              Ready to Start Your Treatment?
            </h2>
            <p style={{ 
              color: "var(--color-honeydew)", 
              opacity: 0.85,
              maxWidth: "500px", 
              margin: "0 auto",
              lineHeight: 1.65,
              fontSize: "1rem"
            }}>
              Contact Smile Architects to schedule your orthodontic consultation. We'll discuss 
              your treatment goals and create a plan that works for your schedule and travel requirements.
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
              Get Directions
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}