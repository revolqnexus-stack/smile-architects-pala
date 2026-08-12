import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";
import { CLINIC, DOCTORS, FACILITIES } from "@/lib/site-config";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { CheckIcon } from "@/components/ui/icons";
import DoctorPhoto from "@/components/ui/DoctorPhoto";
import {
  RevealUp,
  RevealFade,
  ImageReveal,
  StaggerContainer,
  StaggerItem,
  HoverScale,
} from "@/components/motion/REVOLQComponents";

export const metadata: Metadata = buildMetadata({
  title: "About Smile Architects | Dental Clinic in Pala, Kottayam",
  description:
    "About Smile Architects — multispeciality dental clinic and advanced orthodontic centre in Pala, Kottayam, Kerala. Patient-first care led by Dr. Jeo Tom Charls, MDS Orthodontics.",
  canonical: "/about",
});

export default function AboutPage() {
  return (
    <>
      {/* ── HEADER ─────────────────────────────────────────────── */}
      <div className="section-padding section-warm">
        <div className="container-xl">
          <RevealFade>
            <Breadcrumb items={[{ label: "About", href: "/about" }]} />
          </RevealFade>
          <RevealUp delay={0.05}>
            <div style={{ marginTop: "1.5rem" }}>
              <div className="accent-line" />
              <h1
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(2rem, 4vw, 3.25rem)",
                  color: "var(--color-dark-moss)",
                  fontWeight: 400,
                  marginBottom: "0.75rem",
                }}
              >
                About Smile Architects
              </h1>
              <p style={{ color: "var(--color-cafe-noir)", fontSize: "1.0625rem", maxWidth: "580px", lineHeight: 1.65 }}>
                A multispeciality dental clinic and advanced orthodontic centre at Kattakkayam Road,
                Pala, Kottayam, Kerala.
              </p>
            </div>
          </RevealUp>
        </div>
      </div>

      {/* ── ABOUT CONTENT ──────────────────────────────────────── */}
      <section className="section-padding section-white">
        <div className="container-xl">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>
            <RevealUp>
              <div>
                <h2 style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)",
                  color: "var(--color-dark-moss)",
                  fontWeight: 400,
                  marginBottom: "1.25rem",
                }}>
                  Patient-first dentistry in Pala
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <p style={{ color: "var(--color-cafe-noir)", lineHeight: 1.75 }}>
                    Smile Architects is a multispeciality dental clinic providing comprehensive dental care
                    for patients in Pala, Kottayam and the surrounding Meenachil region. The clinic
                    combines general and preventive dentistry with specialist orthodontic treatment and
                    advanced cosmetic dental care.
                  </p>
                  <p style={{ color: "var(--color-cafe-noir)", lineHeight: 1.75 }}>
                    Led by Dr. Jeo Tom Charls — an MDS-qualified orthodontist registered with the Kerala
                    State Dental Council — the clinical team places patient comfort and accurate diagnosis
                    at the centre of every consultation. Individual treatment rooms, strict sterilisation
                    protocols and digital X-ray ensure a safe, professional environment.
                  </p>
                  <p style={{ color: "var(--color-cafe-noir)", lineHeight: 1.75 }}>
                    The clinic is located on Kattakkayam Road, near Federal Bank in Pala Town, with ample
                    car parking and convenient Monday to Saturday hours.
                  </p>
                </div>
                <div style={{ display: "flex", gap: "0.875rem", marginTop: "2rem", flexWrap: "wrap" }}>
                  <HoverScale scale={1.04}>
                    <Link href="/dentists" className="btn btn-primary">Meet the doctors</Link>
                  </HoverScale>
                  <HoverScale scale={1.04}>
                    <Link href="/book-appointment" className="btn btn-secondary">Book appointment</Link>
                  </HoverScale>
                </div>
              </div>
            </RevealUp>

            {/* Clinic photo placeholder */}
            <ImageReveal delay={0.15}>
              <div
                style={{
                  aspectRatio: "4/3",
                  backgroundColor: "var(--color-tea-green)",
                  borderRadius: "var(--radius-2xl)",
                  border: "3px solid var(--color-olive)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--color-moss)",
                  fontSize: "0.875rem",
                  fontFamily: "var(--font-sans)",
                  textAlign: "center",
                  padding: "2rem",
                  boxShadow: "var(--shadow-lg)",
                }}
              >
                <span>Clinic exterior / reception photo<br />(clinic to supply)</span>
              </div>
            </ImageReveal>
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHY ─────────────────────────────────────────── */}
      <section className="section-padding section-light">
        <div className="container-xl" style={{ maxWidth: "860px" }}>
          <RevealUp>
            <div className="accent-line" />
            <p style={{
              fontSize: "0.75rem",
              color: "var(--color-olive)",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              marginBottom: "0.75rem",
              fontFamily: "var(--font-sans)",
            }}>
              Our Approach
            </p>
            <h2 style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)",
              color: "var(--color-dark-moss)",
              fontWeight: 400,
              marginBottom: "2.5rem",
            }}>
              The clinic approach
            </h2>
          </RevealUp>
          <StaggerContainer
            stagger={0.11}
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem" }}
          >
            {[
              { heading: "Accurate diagnosis", body: "Every treatment decision begins with a thorough clinical assessment and, where indicated, digital radiography." },
              { heading: "Patient comfort", body: "Individual treatment rooms and a calm environment ensure patients feel at ease throughout their visit." },
              { heading: "Clear communication", body: "Treatment plans are explained clearly before any procedure begins. Questions are always welcome." },
              { heading: "Sterilisation standards", body: "Strict infection control and sterilisation protocols are maintained throughout the clinic." },
            ].map((item) => (
              <StaggerItem key={item.heading}>
                <div className="card-warm" style={{ height: "100%" }}>
                  <div className="icon-botanical" style={{ marginBottom: "1rem", width: "40px", height: "40px" }}>
                    <CheckIcon size="md" />
                  </div>
                  <h3 style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.9375rem",
                    fontWeight: 600,
                    color: "var(--color-dark-moss)",
                    marginBottom: "0.625rem",
                  }}>
                    {item.heading}
                  </h3>
                  <p style={{ fontSize: "0.875rem", color: "var(--color-cafe-noir)", lineHeight: 1.65 }}>
                    {item.body}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── FACILITIES ─────────────────────────────────────────── */}
      <section className="section-padding section-dark">
        <div className="container-xl">
          <RevealFade>
            <div style={{ marginBottom: "2.5rem" }}>
              <div className="accent-line" style={{ background: "linear-gradient(90deg, var(--color-jonquil), var(--color-harvest-gold))" }} />
              <p style={{
                fontSize: "0.75rem",
                color: "var(--color-jonquil)",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                marginBottom: "0.75rem",
                fontFamily: "var(--font-sans)",
              }}>
                The Clinic
              </p>
              <h2 style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)",
                color: "var(--color-honeydew)",
                fontWeight: 400,
              }}>
                Facilities
              </h2>
            </div>
          </RevealFade>
          <StaggerContainer
            stagger={0.09}
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1rem" }}
          >
            {FACILITIES.map((f) => (
              <StaggerItem key={f.name}>
                <div className="card-dark" style={{ height: "100%" }}>
                  <h3 style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 600,
                    fontSize: "0.9375rem",
                    color: "var(--color-honeydew)",
                    marginBottom: "0.5rem",
                  }}>
                    {f.name}
                  </h3>
                  <p style={{ fontSize: "0.875rem", color: "var(--color-honeydew)", lineHeight: 1.6, opacity: 0.8 }}>
                    {f.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── TEAM PREVIEW ───────────────────────────────────────── */}
      <section className="section-padding section-light">
        <div className="container-xl">
          <RevealUp>
            <div style={{ marginBottom: "2.5rem" }}>
              <div className="accent-line" />
              <p style={{
                fontSize: "0.75rem",
                color: "var(--color-olive)",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                marginBottom: "0.75rem",
                fontFamily: "var(--font-sans)",
              }}>
                Our Team
              </p>
              <h2 style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)",
                color: "var(--color-dark-moss)",
                fontWeight: 400,
              }}>
                The dental team
              </h2>
            </div>
          </RevealUp>
          <StaggerContainer
            stagger={0.09}
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1rem", marginBottom: "2rem" }}
          >
            {DOCTORS.map((doctor) => (
              <StaggerItem key={doctor.id}>
                <Link href={`/dentists/${doctor.slug}`} style={{ textDecoration: "none", display: "block", height: "100%" }}>
                  <HoverScale>
                    <div className="card" style={{ height: "100%" }}>
                      <div style={{ marginBottom: "1rem" }}>
                        <DoctorPhoto name={doctor.name} photo={doctor.photo} size="sm" />
                      </div>
                      <h3 style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "1.125rem",
                        color: "var(--color-dark-moss)",
                        fontWeight: 400,
                        marginBottom: "0.25rem",
                      }}>
                        {doctor.name}
                      </h3>
                      <p className="credentials" style={{ marginBottom: "0.375rem" }}>
                        {doctor.qualifications}
                      </p>
                      <p style={{ fontSize: "0.875rem", color: "var(--color-olive)", fontFamily: "var(--font-sans)" }}>
                        {doctor.specialty}
                      </p>
                    </div>
                  </HoverScale>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <RevealFade delay={0.1}>
            <HoverScale scale={1.04}>
              <Link href="/dentists" className="btn btn-secondary">
                View all doctors
              </Link>
            </HoverScale>
          </RevealFade>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────── */}
      <section className="section-dark" style={{ padding: "3.5rem 0" }}>
        <div className="container-xl" style={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.25rem",
        }}>
          <RevealFade>
            <h2 style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              color: "var(--color-honeydew)",
              fontWeight: 400,
            }}>
              Ready to visit Smile Architects in Pala?
            </h2>
            <p style={{ color: "var(--color-honeydew)", opacity: 0.85, maxWidth: "420px", lineHeight: 1.65, margin: "0 auto" }}>
              Open Monday to Saturday, 9:30 AM to 8:00 PM. No referral needed.
            </p>
            <div style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap", justifyContent: "center", marginTop: "1rem" }}>
              <HoverScale scale={1.04}>
                <Link href="/book-appointment" className="btn btn-secondary">Book an Appointment</Link>
              </HoverScale>
              <HoverScale scale={1.04}>
                <a href={`tel:${CLINIC.contact.phone}`} className="btn btn-ghost-light">
                  Call {CLINIC.contact.phoneDisplay}
                </a>
              </HoverScale>
            </div>
          </RevealFade>
        </div>
      </section>
    </>
  );
}
