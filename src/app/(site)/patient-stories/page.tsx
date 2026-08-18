import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";
import { CLINIC } from "@/lib/site-config";
import Breadcrumb from "@/components/ui/Breadcrumb";
import {
  RevealUp,
  RevealFade,
  StaggerContainer,
  StaggerItem,
  HoverScale,
} from "@/components/motion/REVOLQComponents";

export const metadata: Metadata = buildMetadata({
  title: "Patient Stories | Smile Architects, Pala",
  description:
    "Read what patients say about Smile Architects dental clinic in Pala, Kottayam, Kerala — orthodontics, dental implants, smile design and general dentistry.",
  canonical: "/patient-stories",
});

const STORIES = [
  {
    id: 1,
    name: "Riya M.",
    location: "Pala",
    treatment: "Orthodontics & Braces",
    treatmentSlug: "braces",
    quote:
      "I had been putting off braces for years. Dr. Jeo took the time to explain every option — braces, aligners, lingual braces — without any pressure. I went with ceramic braces and the result after 14 months was beyond what I expected.",
    verified: true,
  },
  {
    id: 2,
    name: "Arun K.",
    location: "Kottayam",
    treatment: "Dental Implants",
    treatmentSlug: "dental-implants",
    quote:
      "I lost a tooth in an accident and was really anxious about implant surgery. The team were incredibly calm and professional throughout. The implant has been perfect for over a year now — I forget it's not my natural tooth.",
    verified: true,
  },
  {
    id: 3,
    name: "Shalini J.",
    location: "Ettumanoor",
    treatment: "Lingual Braces",
    treatmentSlug: "lingual-braces",
    quote:
      "I work in a client-facing role so visible braces were not an option for me. I didn't know lingual braces were available locally. Dr. Jeo is one of the few specialists with the training to place them and my experience was excellent.",
    verified: true,
  },
  {
    id: 4,
    name: "Thomas V.",
    location: "Pala",
    treatment: "Root Canal Treatment",
    treatmentSlug: "root-canal-treatment",
    quote:
      "I was terrified of root canal treatment after everything I had heard. The reality was nothing like the horror stories. It was over in one visit and the tooth has been completely fine since. I genuinely had no pain during the procedure.",
    verified: true,
  },
  {
    id: 5,
    name: "Meera A.",
    location: "Changanacherry",
    treatment: "Clear Aligners",
    treatmentSlug: "clear-aligners",
    quote:
      "The aligners fitted perfectly and I could remove them for events. The results were clear after just a few months. The whole process was explained clearly at the start so I knew exactly what to expect.",
    verified: true,
  },
  {
    id: 6,
    name: "George P.",
    location: "Pala",
    treatment: "General Dentistry",
    treatmentSlug: "general-dentistry",
    quote:
      "My family has been coming to Smile Architects for three years now. The clinic is clean and well-organised, the team is friendly and professional, and we've never had to wait long. It is exactly what a local dental clinic should be.",
    verified: true,
  },
];

export default function PatientStoriesPage() {
  return (
    <>
      {/* ── HEADER ─────────────────────────────────────────────── */}
      <div className="section-padding section-warm">
        <div className="container-xl">
          <RevealFade>
            <Breadcrumb items={[{ label: "Patient Stories", href: "/patient-stories" }]} />
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
              }}
            >
              Patient stories
            </h1>
            <p style={{ color: "var(--color-cafe-noir)", fontSize: "1.0625rem", maxWidth: "540px", lineHeight: 1.65 }}>
              What patients at Smile Architects, Pala say about their experience — from orthodontic
              treatment to dental implants and routine care.
            </p>
          </RevealUp>
        </div>
      </div>

      {/* ── STORIES GRID ───────────────────────────────────────── */}
      <section className="section-padding section-light" aria-label="Patient testimonials">
        <div className="container-xl">
          <StaggerContainer
            stagger={0.09}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {STORIES.map((story) => (
              <StaggerItem key={story.id}>
                <article
                  style={{
                    backgroundColor: "var(--color-white)",
                    borderRadius: "var(--radius-lg)",
                    padding: "1.75rem",
                    border: "2px solid var(--color-tea-green)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.25rem",
                    height: "100%",
                    transition: "border-color 260ms ease, box-shadow 260ms ease, transform 260ms ease",
                  }}
                  className="card"
                >
                  {/* Stars */}
                  <div style={{ display: "flex", gap: "0.25rem" }} aria-label="5 out of 5 stars" role="img">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="var(--color-jonquil)" aria-hidden="true">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote style={{ margin: 0, flex: 1 }}>
                    <p
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "1rem",
                        color: "var(--color-dark-moss)",
                        lineHeight: 1.7,
                        fontStyle: "italic",
                      }}
                    >
                      &ldquo;{story.quote}&rdquo;
                    </p>
                  </blockquote>

                  {/* Patient + treatment */}
                  <footer style={{ marginTop: "auto", paddingTop: "1rem", borderTop: "1px solid var(--color-tea-green)" }}>
                    <p style={{
                      fontSize: "0.9375rem",
                      color: "var(--color-dark-moss)",
                      fontWeight: 600,
                      fontFamily: "var(--font-sans)",
                      marginBottom: "0.2rem",
                    }}>
                      {story.name}
                    </p>
                    <p style={{
                      fontSize: "0.8125rem",
                      color: "var(--color-moss)",
                      fontFamily: "var(--font-sans)",
                      marginBottom: "0.75rem",
                    }}>
                      {story.location}
                    </p>
                    <Link
                      href={`/treatments/${story.treatmentSlug}`}
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--color-dark-moss)",
                        fontFamily: "var(--font-sans)",
                        fontWeight: 500,
                        backgroundColor: "var(--color-tea-green)",
                        border: "1px solid var(--color-olive)",
                        padding: "0.25rem 0.75rem",
                        borderRadius: "999px",
                        display: "inline-block",
                        transition: "background-color 200ms ease, border-color 200ms ease",
                      }}
                    >
                      {story.treatment}
                    </Link>
                  </footer>
                </article>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Review platform links */}
          <RevealUp delay={0.15}>
            <div
              style={{
                marginTop: "3rem",
                padding: "2.5rem",
                backgroundColor: "var(--color-honeydew)",
                borderRadius: "var(--radius-xl)",
                border: "2px solid var(--color-tea-green)",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <p style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.375rem",
                color: "var(--color-dark-moss)",
                fontWeight: 400,
              }}>
                Read more reviews
              </p>
              <p style={{ color: "var(--color-cafe-noir)", maxWidth: "480px", lineHeight: 1.65, fontSize: "0.9375rem" }}>
                Smile Architects is listed on Google and Practo. You can find more patient reviews and
                ratings on these platforms.
              </p>
              <div style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap", justifyContent: "center" }}>
                <HoverScale scale={1.04}>
                  <a
                    href={CLINIC.platforms.practo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    style={{ fontSize: "0.875rem" }}
                    aria-label="View Smile Architects on Practo"
                  >
                    View on Practo
                  </a>
                </HoverScale>
              </div>
            </div>
          </RevealUp>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────── */}
      <section className="section-dark" style={{ padding: "3.5rem 0" }}>
        <div
          className="container-xl"
          style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.25rem" }}
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
              Become a patient at Smile Architects
            </h2>
            <p style={{ color: "var(--color-honeydew)", opacity: 0.85, maxWidth: "440px", lineHeight: 1.65, margin: "0 auto" }}>
              Book a consultation at our dental clinic in Pala, Kottayam. Open Monday to Saturday,
              9:30 AM to 8:00 PM.
            </p>
            <div style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap", justifyContent: "center", marginTop: "1rem" }}>
              <HoverScale scale={1.04}>
                <Link href="/book-appointment" className="btn btn-secondary">
                  Book an Appointment
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
