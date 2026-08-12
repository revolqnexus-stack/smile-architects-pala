import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";
import { CLINIC, TREATMENTS, DOCTORS } from "@/lib/site-config";
import Breadcrumb from "@/components/ui/Breadcrumb";
import AppointmentForm from "@/components/ui/AppointmentForm";
import { MapPinIcon, PhoneIcon, ClockIcon, CareIcon } from "@/components/ui/icons";

export const metadata: Metadata = buildMetadata({
  title: "Areas Served by Smile Architects | Dental Clinic Serving Kottayam District from Pala",
  description:
    "Smile Architects dental clinic in Pala serves patients from across Kottayam District, Kerala. Comprehensive dental care and orthodontic treatment convenient for patients from Kottayam, Changanassery, Ettumanoor and surrounding areas.",
  canonical: "/areas-served",
});

const NEARBY_AREAS = [
  { name: "Kottayam", distance: "35 km", description: "District headquarters with good road connectivity" },
  { name: "Changanassery", distance: "18 km", description: "Major town in Kottayam District" },
  { name: "Ettumanoor", distance: "25 km", description: "Well-connected via NH183" },
  { name: "Mundakayam", distance: "15 km", description: "Hill station area" },
  { name: "Erattupetta", distance: "12 km", description: "Neighboring town" },
  { name: "Meenachil", distance: "8 km", description: "Local region" },
];

export default function AreasServedPage() {
  return (
    <>
      {/* Hero section */}
      <div className="section-padding section-warm">
        <div className="container-xl">
          <Breadcrumb items={[{ label: "Areas Served", href: "/areas-served" }]} />
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
            Dental Care for Patients from Kottayam District
          </h1>
          <p style={{ 
            color: "var(--color-olive)", 
            fontSize: "1.0625rem", 
            maxWidth: "600px", 
            lineHeight: 1.65,
            fontFamily: "var(--font-sans)"
          }}>
            Smile Architects is located in Pala, Kottayam District. We welcome patients from across 
            the district who are seeking comprehensive dental care and specialist orthodontic treatment.
          </p>
        </div>
      </div>

      {/* Location clarity */}
      <section className="section-padding section-white">
        <div className="container-xl">
          <div className="card-light" style={{ padding: "2rem", marginBottom: "3rem", backgroundColor: "var(--color-vanilla)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
              <MapPinIcon size="lg" color="var(--color-dark-moss)" />
              <h2 style={{ 
                fontFamily: "var(--font-serif)", 
                fontSize: "1.5rem", 
                color: "var(--color-dark-moss)", 
                fontWeight: 400,
                margin: 0 
              }}>
                Our Location
              </h2>
            </div>
            <p style={{ 
              color: "var(--color-cafe-noir)", 
              fontSize: "1rem", 
              lineHeight: 1.65, 
              marginBottom: "1rem"
            }}>
              <strong>Smile Architects is physically located in Pala, Kottayam District.</strong> This page 
              describes our regional service area and does not represent a physical branch in Kottayam town.
            </p>
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
              gap: "1.5rem",
              marginTop: "1.5rem"
            }}>
              <div>
                <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--color-dark-moss)", marginBottom: "0.5rem" }}>
                  Address
                </h3>
                <p style={{ color: "var(--color-olive)", fontSize: "0.9375rem" }}>
                  {CLINIC.address.full}<br />
                  {CLINIC.address.landmark}
                </p>
              </div>
              <div>
                <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--color-dark-moss)", marginBottom: "0.5rem" }}>
                  Phone
                </h3>
                <p style={{ color: "var(--color-olive)", fontSize: "0.9375rem" }}>
                  <a href={`tel:${CLINIC.contact.phone}`} style={{ color: "inherit", textDecoration: "none" }}>
                    {CLINIC.contact.phoneDisplay}
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "3rem", alignItems: "start" }}>
            {/* Left column */}
            <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
              
              {/* Why choose Smile Architects */}
              <div>
                <div className="accent-line" />
                <h2 style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.75rem",
                  color: "var(--color-dark-moss)",
                  fontWeight: 400,
                  marginBottom: "1rem",
                }}>
                  Why Patients Choose Smile Architects
                </h2>
                <p style={{ color: "var(--color-cafe-noir)", lineHeight: 1.75, fontSize: "1rem", marginBottom: "1.5rem" }}>
                  If you're considering orthodontic treatment or comprehensive dental care and live elsewhere 
                  in Kottayam District, your choice of clinic may depend on the specialist qualifications 
                  available, the range of treatment options, and how the clinic manages your ongoing care.
                </p>
                
                <div style={{ display: "grid", gap: "1rem" }}>
                  <div className="card-tea" style={{ padding: "1.25rem" }}>
                    <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "var(--color-dark-moss)", marginBottom: "0.5rem" }}>
                      MDS Orthodontic Specialist
                    </h3>
                    <p style={{ color: "var(--color-olive)", fontSize: "0.9375rem", lineHeight: 1.6 }}>
                      Dr. Jeo Tom Charls holds an MDS in Orthodontics and Dentofacial Orthopaedics, with specialized 
                      training in lingual braces and clear aligner systems.
                    </p>
                  </div>
                  
                  <div className="card-tea" style={{ padding: "1.25rem" }}>
                    <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "var(--color-dark-moss)", marginBottom: "0.5rem" }}>
                      Comprehensive Treatment Range
                    </h3>
                    <p style={{ color: "var(--color-olive)", fontSize: "0.9375rem", lineHeight: 1.6 }}>
                      From routine general dentistry to advanced orthodontics, dental implants, 
                      and cosmetic procedures — all available under one roof.
                    </p>
                  </div>

                  <div className="card-tea" style={{ padding: "1.25rem" }}>
                    <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "var(--color-dark-moss)", marginBottom: "0.5rem" }}>
                      Modern Facilities
                    </h3>
                    <p style={{ color: "var(--color-olive)", fontSize: "0.9375rem", lineHeight: 1.6 }}>
                      Individual treatment rooms, digital X-ray, strict sterilization protocols, 
                      and ample parking for patient convenience.
                    </p>
                  </div>
                </div>
              </div>

              {/* Nearby areas */}
              <div>
                <h2 style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.75rem",
                  color: "var(--color-dark-moss)",
                  fontWeight: 400,
                  marginBottom: "1rem",
                }}>
                  Nearby Areas We Serve
                </h2>
                <p style={{ color: "var(--color-cafe-noir)", lineHeight: 1.75, fontSize: "1rem", marginBottom: "1.5rem" }}>
                  Patients regularly visit Smile Architects from these areas across Kottayam District:
                </p>
                
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
                  {NEARBY_AREAS.map((area) => (
                    <div key={area.name} className="card-light" style={{ padding: "1.25rem" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                        <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "var(--color-dark-moss)" }}>
                          {area.name}
                        </h3>
                        <span style={{ 
                          fontSize: "0.8125rem", 
                          color: "var(--color-jonquil)", 
                          fontWeight: 600,
                          backgroundColor: "rgba(234, 200, 0, 0.1)",
                          padding: "0.25rem 0.5rem",
                          borderRadius: "0.5rem"
                        }}>
                          {area.distance}
                        </span>
                      </div>
                      <p style={{ color: "var(--color-olive)", fontSize: "0.875rem", lineHeight: 1.5 }}>
                        {area.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Planning your visit */}
              <div>
                <h2 style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.75rem",
                  color: "var(--color-dark-moss)",
                  fontWeight: 400,
                  marginBottom: "1rem",
                }}>
                  Planning Your Visit
                </h2>
                
                <div style={{ display: "grid", gap: "1.25rem" }}>
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
                        We recommend booking appointments in advance. Treatment planning consultations 
                        typically require 45-60 minutes. Follow-up appointments are usually shorter.
                      </p>
                    </div>
                  </div>

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
                        Ample car parking is available at the clinic. The facility is located on 
                        Kattakkayam Road, near Federal Bank in Pala Town.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                    <div style={{ 
                      backgroundColor: "var(--color-tea-green)", 
                      borderRadius: "50%", 
                      padding: "0.75rem",
                      flexShrink: 0 
                    }}>
                      <PhoneIcon size="md" color="var(--color-dark-moss)" />
                    </div>
                    <div>
                      <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "var(--color-dark-moss)", marginBottom: "0.5rem" }}>
                        Contact & Directions
                      </h3>
                      <p style={{ color: "var(--color-cafe-noir)", fontSize: "0.9375rem", lineHeight: 1.6 }}>
                        Call {CLINIC.contact.phoneDisplay} for appointment booking or directions. 
                        WhatsApp messages are also welcome for appointment inquiries.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Services available */}
              <div>
                <h2 style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.75rem",
                  color: "var(--color-dark-moss)",
                  fontWeight: 400,
                  marginBottom: "1rem",
                }}>
                  Dental Services Available
                </h2>
                <p style={{ color: "var(--color-cafe-noir)", lineHeight: 1.75, fontSize: "1rem", marginBottom: "1.5rem" }}>
                  Our comprehensive range of dental treatments includes:
                </p>
                
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0.75rem" }}>
                  {TREATMENTS.filter(t => t.featured).map((treatment) => (
                    <Link
                      key={treatment.id}
                      href={`/treatments/${treatment.slug}`}
                      style={{ textDecoration: "none" }}
                    >
                      <div className="card-light" style={{ 
                        padding: "1rem 1.25rem",
                        transition: "all 0.2s ease",
                        "&:hover": { backgroundColor: "var(--color-tea-green)" }
                      }}>
                        <p style={{ 
                          fontFamily: "var(--font-serif)", 
                          fontSize: "0.9375rem", 
                          color: "var(--color-dark-moss)", 
                          marginBottom: "0.25rem",
                          fontWeight: 500
                        }}>
                          {treatment.title}
                        </p>
                        <p style={{ 
                          fontSize: "0.8125rem", 
                          color: "var(--color-olive)", 
                          fontFamily: "var(--font-sans)", 
                          fontWeight: 600 
                        }}>
                          Learn more →
                        </p>
                      </div>
                    </Link>
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
                  heading="Book Your Visit to Pala"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Map and directions */}
      <section className="section-padding section-light">
        <div className="container-xl">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "center" }}>
            <div>
              <div className="accent-line" />
              <h2 style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.75rem",
                color: "var(--color-dark-moss)",
                fontWeight: 400,
                marginBottom: "1rem",
              }}>
                Getting to Smile Architects
              </h2>
              <p style={{ color: "var(--color-cafe-noir)", lineHeight: 1.75, fontSize: "1rem", marginBottom: "1.5rem" }}>
                We're conveniently located on Kattakkayam Road in Pala, with good road connectivity 
                to major towns across Kottayam District.
              </p>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
                <div>
                  <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--color-dark-moss)", marginBottom: "0.5rem" }}>
                    Clinic Hours
                  </h3>
                  <p style={{ color: "var(--color-olive)", fontSize: "0.9375rem" }}>
                    {CLINIC.hours.weekdays.label}: {CLINIC.hours.weekdays.open} – {CLINIC.hours.weekdays.close}<br />
                    {CLINIC.hours.sunday.label}: {CLINIC.hours.sunday.status}
                  </p>
                </div>
                <div>
                  <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--color-dark-moss)", marginBottom: "0.5rem" }}>
                    Appointments
                  </h3>
                  <p style={{ color: "var(--color-olive)", fontSize: "0.9375rem" }}>
                    {CLINIC.hours.note}
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap" }}>
                <Link 
                  href={CLINIC.platforms.googleMaps.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Get Directions
                </Link>
                <a href={`tel:${CLINIC.contact.phone}`} className="btn btn-ghost">
                  Call Clinic
                </a>
              </div>
            </div>

            <div>
              <div className="map-frame" style={{ aspectRatio: "16/12", borderRadius: "var(--radius-lg)" }}>
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
          </div>
        </div>
      </section>
    </>
  );
}