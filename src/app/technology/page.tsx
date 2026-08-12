import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";
import { CLINIC } from "@/lib/site-config";
import Breadcrumb from "@/components/ui/Breadcrumb";
import {
  XRayIcon,
  ClinicIcon,
  SafetyIcon,
  SystemsIcon,
  OrthodonticsIcon,
  AlignersIcon,
  ArrowRightIcon,
  PhoneIcon,
} from "@/components/ui/icons";
import {
  RevealUp,
  RevealFade,
  StaggerContainer,
  StaggerItem,
  HoverScale,
} from "@/components/motion/REVOLQComponents";

export const metadata: Metadata = buildMetadata({
  title: "Clinical Technology | Smile Architects, Pala",
  description:
    "Clinical technology and equipment at Smile Architects dental clinic, Pala — digital X-ray, individual treatment rooms, sterilisation systems and more.",
  canonical: "/technology",
});

const TECH_ITEMS = [
  {
    title: "Digital X-Ray (RVG)",
    description:
      "Digital radiography (Radiovisiography) produces high-resolution dental X-ray images at a fraction of the radiation dose of conventional film X-rays. Images are available instantly on screen, can be magnified and enhanced for accurate diagnosis, and are stored securely as part of the patient's digital record.",
    benefit: "Lower radiation · Instant images · Enhanced diagnostic accuracy",
    icon: XRayIcon,
  },
  {
    title: "Individual Treatment Rooms",
    description:
      "Each patient is treated in a private, dedicated treatment room — not in an open bay. This ensures patient privacy, dignity and comfort throughout every procedure, and supports strict infection control protocols.",
    benefit: "Privacy · Comfort · Infection control",
    icon: ClinicIcon,
  },
  {
    title: "Sterilisation Systems",
    description:
      "Smile Architects maintains strict sterilisation and infection control protocols across all instruments and surfaces. All reusable instruments are sterilised using autoclave technology between every patient use. Single-use instruments are used where appropriate.",
    benefit: "Patient safety · Rigorous infection control",
    icon: SafetyIcon,
  },
  {
    title: "Digital Smile Design Tools",
    description:
      "Digital Smile Design (DSD) uses photographic analysis and digital design software to create a visual preview of a proposed smile transformation. The digital mock-up is reviewed and approved by the patient before any treatment begins, allowing collaborative planning and predictable outcomes.",
    benefit: "Visualise your result · Collaborative planning",
    icon: SystemsIcon,
  },
  {
    title: "CAD/CAM Lingual Bracket Systems",
    description:
      "Lingual orthodontic treatment at Smile Architects uses CAD/CAM-designed lingual brackets — precision components custom-designed to fit the inner surfaces of each patient's individual teeth. Dr. Jeo Tom Charls has completed dedicated training in CAD/CAM lingual bracket systems.",
    benefit: "Precision · Customised to each patient",
    icon: OrthodonticsIcon,
  },
  {
    title: "ClearPath Aligner System",
    description:
      "Clear aligner treatment at Smile Architects is provided through the ClearPath system. Dr. Jeo Tom Charls has completed ClearPath aligner certification training. The system produces a series of custom, transparent trays that progressively align teeth with minimal visibility.",
    benefit: "Certified aligner provider · Custom digital planning",
    icon: AlignersIcon,
  },
];

export default function TechnologyPage() {
  return (
    <>
      {/* ── HEADER ─────────────────────────────────────────────── */}
      <div className="section-padding section-warm">
        <div className="container-xl">
          <RevealFade>
            <Breadcrumb items={[{ label: "Technology", href: "/technology" }]} />
          </RevealFade>
          <RevealUp delay={0.05}>
            <div style={{ marginTop: "1.5rem" }}>
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
                Our Equipment
              </p>
              <h1
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  color: "var(--color-dark-moss)",
                  fontWeight: 400,
                  marginBottom: "0.75rem",
                }}
              >
                Clinical technology
              </h1>
              <p style={{
                color: "var(--color-cafe-noir)",
                fontSize: "1.0625rem",
                maxWidth: "560px",
                lineHeight: 1.65,
              }}>
                The equipment and systems used at Smile Architects to deliver accurate diagnosis,
                effective treatment and a comfortable patient experience.
              </p>
            </div>
          </RevealUp>
        </div>
      </div>

      {/* ── TECHNOLOGY LIST ────────────────────────────────────── */}
      <section className="section-padding section-light" aria-labelledby="tech-heading">
        <div className="container-xl">
          <StaggerContainer
            stagger={0.09}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {TECH_ITEMS.map((item) => (
              <StaggerItem key={item.title}>
                <HoverScale>
                  <article
                    style={{
                      backgroundColor: "var(--color-white)",
                      borderRadius: "var(--radius-xl)",
                      padding: "2rem",
                      border: "2px solid var(--color-tea-green)",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.875rem",
                      height: "100%",
                      transition: "border-color 260ms ease, box-shadow 260ms ease, transform 260ms ease",
                    }}
                  >
                    {/* Icon */}
                    <div className="icon-botanical" style={{ marginBottom: "0.5rem" }}>
                      <item.icon size="lg" />
                    </div>

                    <h2
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "1.25rem",
                        color: "var(--color-dark-moss)",
                        fontWeight: 400,
                        lineHeight: 1.2,
                      }}
                    >
                      {item.title}
                    </h2>
                    <p style={{
                      fontSize: "0.9375rem",
                      color: "var(--color-cafe-noir)",
                      lineHeight: 1.7,
                      flex: 1,
                    }}>
                      {item.description}
                    </p>

                    {/* Benefit strip */}
                    <div style={{
                      paddingTop: "1rem",
                      borderTop: "1px solid var(--color-tea-green)",
                      display: "flex",
                      gap: "0.375rem",
                      flexWrap: "wrap",
                    }}>
                      {item.benefit.split(" · ").map((b) => (
                        <span key={b} className="tag" style={{ fontSize: "0.7rem" }}>
                          {b}
                        </span>
                      ))}
                    </div>
                  </article>
                </HoverScale>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── COMMITMENT SECTION ─────────────────────────────────── */}
      <section className="section-padding section-warm">
        <div className="container-xl" style={{ maxWidth: "760px" }}>
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
              Our Commitment
            </p>
            <h2 style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              color: "var(--color-dark-moss)",
              fontWeight: 400,
              marginBottom: "1.25rem",
            }}>
              Modern care, personal attention
            </h2>
            <p style={{
              color: "var(--color-cafe-noir)",
              lineHeight: 1.75,
              fontSize: "1.0625rem",
              marginBottom: "1rem",
            }}>
              At Smile Architects, clinical investment is purposeful — every piece of equipment
              is chosen to improve diagnostic accuracy, treatment outcomes, or the patient
              experience. We continuously update our systems and training to stay current
              with developments in dental practice.
            </p>
            <p style={{
              color: "var(--color-cafe-noir)",
              lineHeight: 1.75,
              fontSize: "1.0625rem",
            }}>
              Modern technology works best alongside attentive, personalised care. Both are
              central to how we practise at Smile Architects.
            </p>
          </RevealUp>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────── */}
      <section className="section-dark" style={{ padding: "3.5rem 0" }}>
        <div
          className="container-xl"
          style={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1.25rem",
          }}
        >
          <RevealFade>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.375rem, 2.5vw, 1.875rem)",
                color: "var(--color-honeydew)",
                fontWeight: 400,
              }}
            >
              Book a consultation at Smile Architects, Pala
            </h2>
            <p style={{
              color: "var(--color-honeydew)",
              opacity: 0.85,
              maxWidth: "440px",
              lineHeight: 1.65,
              margin: "0 auto",
            }}>
              Open Monday to Saturday, 9:30 AM to 8:00 PM. No referral needed.
            </p>
            <div style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap", justifyContent: "center", marginTop: "1rem" }}>
              <HoverScale scale={1.04}>
                <Link href="/book-appointment" className="btn btn-secondary">
                  Book Appointment
                </Link>
              </HoverScale>
              <HoverScale scale={1.04}>
                <a href={`tel:${CLINIC.contact.phone}`} className="btn btn-ghost-light">
                  {CLINIC.contact.phoneDisplay}
                </a>
              </HoverScale>
            </div>
          </RevealFade>
        </div>
      </section>
    </>
  );
}
