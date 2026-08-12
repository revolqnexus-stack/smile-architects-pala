import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";
import { CLINIC, DOCTORS } from "@/lib/site-config";
import Breadcrumb from "@/components/ui/Breadcrumb";
import AppointmentForm from "@/components/ui/AppointmentForm";
import DoctorPhoto from "@/components/ui/DoctorPhoto";
import { CheckIcon, ArrowRightIcon } from "@/components/ui/icons";
import {
  RevealUp,
  RevealFade,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/REVOLQComponents";

export const metadata: Metadata = buildMetadata({
  title: "Lingual Braces in Pala for Kottayam Patients | Smile Architects",
  description:
    "Lingual braces (hidden braces) at Smile Architects, Pala — fitted to the inner surface of teeth for complete invisibility. Dr. Jeo Tom Charls has dedicated lingual orthodontics and CAD/CAM training. Serving Kottayam District.",
  canonical: "/orthodontics/lingual-braces",
});

const ADVANTAGES = [
  "Completely hidden from view — even when you open your mouth",
  "Fixed appliance — no compliance required, unlike clear aligners",
  "Can treat most of the same cases as conventional braces",
  "No change to the appearance of your smile during treatment",
  "Suitable for professional and public-facing roles",
];

const CONSIDERATIONS = [
  "Initial speech adjustment — most patients adapt within 2–4 weeks",
  "Tongue discomfort for the first week or two as the tongue adapts",
  "Oral hygiene requires careful technique and specific tools",
  "Not suitable for patients with very small teeth or certain bite patterns",
  "Requires a clinical assessment to confirm suitability",
];

const FAQS = [
  {
    q: "What are lingual braces?",
    a: "Lingual braces are fixed orthodontic brackets bonded to the inner (tongue-facing, or 'lingual') surfaces of the teeth. Because they are hidden behind the teeth, they are not visible from the front or sides — even when the mouth is open. They are the only truly invisible fixed orthodontic appliance.",
  },
  {
    q: "Do lingual braces affect speech?",
    a: "Most patients experience some change in speech — particularly with 's', 'sh' and 't' sounds — during the first one to two weeks. This is because the tongue needs to adapt to the presence of brackets on the inner tooth surfaces. The majority of patients adapt fully within a few weeks and return to normal speech.",
  },
  {
    q: "Are lingual braces suitable for everyone?",
    a: "Lingual braces can treat most orthodontic problems, but suitability depends on the size and shape of your teeth, the nature of your bite, and individual patient factors. A full clinical assessment by Dr. Jeo Tom Charls is required to confirm whether lingual treatment is appropriate for your case.",
  },
  {
    q: "What training does Dr. Jeo Tom Charls have in lingual orthodontics?",
    a: "Dr. Jeo Tom Charls has completed dedicated lingual orthodontics training and CAD/CAM lingual bracket training, in addition to his MDS qualification in Orthodontics and Dentofacial Orthopaedics from Sri Balaji Dental College, Chennai. Lingual orthodontics requires specific additional training due to the different clinical working conditions involved.",
  },
  {
    q: "How do lingual braces compare to clear aligners?",
    a: "Both options are less visible than conventional fixed braces, but they work differently. Lingual braces are fixed — they are attached throughout treatment and do not need to be removed. Clear aligners are removable, which offers convenience but requires disciplined wear (typically 20–22 hours per day). Lingual braces can often handle more complex tooth movements than aligners. Your orthodontist will advise which is more appropriate for your specific case.",
  },
  {
    q: "What is CAD/CAM lingual bracket training?",
    a: "CAD/CAM (computer-aided design and manufacturing) lingual systems involve custom-fabricated brackets designed from digital impressions or scans of your teeth. This precision approach allows for individually tailored appliances that fit the inner surfaces of each tooth more accurately, which is particularly important given the complex anatomy of lingual surfaces.",
  },
];

export default function LingualBracesPage() {
  const orthodontist = DOCTORS.find((d) => d.id === "dr-jeo-tom-charls");

  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: "Lingual Braces",
    alternateName: ["Hidden Braces", "Lingual Orthodontics", "Inner Braces"],
    description:
      "Lingual braces — fixed orthodontic appliances bonded to the inner surfaces of the teeth — at Smile Architects, Pala, Kottayam District, Kerala. Specialist lingual orthodontics training including CAD/CAM bracket systems.",
    procedureType: "https://health-lifesci.schema.org/DentalProcedure",
    bodyLocation: "Teeth",
    performer: {
      "@type": "Physician",
      name: orthodontist?.name,
      hasCredential: orthodontist?.qualifications,
      medicalSpecialty: orthodontist?.specialty,
      worksFor: {
        "@type": "Dentist",
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
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: CLINIC.seo.siteUrl },
      { "@type": "ListItem", position: 2, name: "Orthodontics", item: `${CLINIC.seo.siteUrl}/orthodontics` },
      { "@type": "ListItem", position: 3, name: "Lingual Braces", item: `${CLINIC.seo.siteUrl}/orthodontics/lingual-braces` },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* ── PAGE HEADER ──────────────────────────────────────────── */}
      <div className="section-padding section-warm">
        <div className="container-xl">
          <RevealFade>
            <Breadcrumb
              items={[
                { label: "Orthodontics", href: "/orthodontics" },
                { label: "Lingual Braces", href: "/orthodontics/lingual-braces" },
              ]}
            />
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
              Lingual Braces: Behind-the-Teeth Orthodontic Treatment
            </h1>
            <p
              style={{
                color: "var(--color-olive)",
                fontSize: "1.0625rem",
                maxWidth: "600px",
                lineHeight: 1.65,
                fontFamily: "var(--font-sans)",
              }}
            >
              Hidden braces fitted to the inner surfaces of teeth — completely invisible from the
              front. Available at Smile Architects, Pala, with dedicated lingual orthodontics and
              CAD/CAM training.
            </p>
          </RevealUp>
        </div>
      </div>

      {/* ── MAIN CONTENT ────────────────────────────────────────── */}
      <section className="section-padding section-white">
        <div className="container-xl">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "3rem", alignItems: "start" }}>
            {/* ── LEFT COLUMN ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>

              {/* What are they */}
              <RevealUp>
                <div>
                  <div className="accent-line" />
                  <h2
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "1.75rem",
                      color: "var(--color-dark-moss)",
                      fontWeight: 400,
                      marginBottom: "1rem",
                    }}
                  >
                    What are lingual braces?
                  </h2>
                  <p style={{ color: "var(--color-cafe-noir)", lineHeight: 1.75, fontSize: "1rem", marginBottom: "1.25rem" }}>
                    Lingual braces are conventional fixed orthodontic brackets bonded to the inner — or
                    tongue-facing — surface of the teeth, rather than the outer surface. Because they sit
                    behind your teeth, they are completely invisible from the front and sides, even when
                    your mouth is open.
                  </p>
                  <p style={{ color: "var(--color-cafe-noir)", lineHeight: 1.75, fontSize: "1rem", marginBottom: "1.25rem" }}>
                    They work on exactly the same mechanical principle as conventional braces: brackets
                    bonded to teeth, an archwire threaded through, and controlled forces moving teeth
                    progressively to their planned positions.
                  </p>
                  <p style={{ color: "var(--color-cafe-noir)", lineHeight: 1.75, fontSize: "1rem" }}>
                    Lingual orthodontics requires additional specialist training — the anatomy and
                    clinical working conditions are significantly different from labial (outer) braces.
                    Dr. Jeo Tom Charls has completed dedicated lingual orthodontics training and CAD/CAM
                    lingual bracket training, in addition to his MDS in Orthodontics.
                  </p>
                </div>
              </RevealUp>

              {/* Advantages and considerations */}
              <RevealUp delay={0.05}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
                  <div className="card-tea" style={{ padding: "1.5rem" }}>
                    <h2
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "1.25rem",
                        color: "var(--color-dark-moss)",
                        fontWeight: 400,
                        marginBottom: "1rem",
                      }}
                    >
                      Advantages
                    </h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                      {ADVANTAGES.map((a) => (
                        <div key={a} style={{ display: "flex", gap: "0.625rem", alignItems: "flex-start" }}>
                          <span style={{ color: "var(--color-jonquil)", flexShrink: 0, marginTop: "0.1em" }}>
                            <CheckIcon size="sm" />
                          </span>
                          <p style={{ color: "var(--color-cafe-noir)", fontSize: "0.875rem", lineHeight: 1.6, margin: 0 }}>
                            {a}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="card-warm" style={{ padding: "1.5rem" }}>
                    <h2
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "1.25rem",
                        color: "var(--color-dark-moss)",
                        fontWeight: 400,
                        marginBottom: "1rem",
                      }}
                    >
                      Considerations
                    </h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                      {CONSIDERATIONS.map((c) => (
                        <div key={c} style={{ display: "flex", gap: "0.625rem", alignItems: "flex-start" }}>
                          <span
                            style={{
                              color: "var(--color-olive)",
                              flexShrink: 0,
                              marginTop: "0.3em",
                              width: "5px",
                              height: "5px",
                              borderRadius: "50%",
                              backgroundColor: "var(--color-olive)",
                              display: "inline-block",
                            }}
                          />
                          <p style={{ color: "var(--color-cafe-noir)", fontSize: "0.875rem", lineHeight: 1.6, margin: 0 }}>
                            {c}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </RevealUp>

              {/* Specialist training section */}
              {orthodontist && (
                <RevealUp delay={0.05}>
                  <div>
                    <h2
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "1.75rem",
                        color: "var(--color-dark-moss)",
                        fontWeight: 400,
                        marginBottom: "1rem",
                      }}
                    >
                      Specialist training at Smile Architects
                    </h2>
                    <p style={{ color: "var(--color-cafe-noir)", lineHeight: 1.75, fontSize: "1rem", marginBottom: "1.5rem" }}>
                      Lingual orthodontics is a technically demanding specialty. The working environment
                      behind the teeth requires specific instruments, techniques and experience. At Smile
                      Architects, lingual braces are provided by Dr. Jeo Tom Charls, who has completed:
                    </p>
                    <StaggerContainer stagger={0.06} style={{ display: "flex", flexDirection: "column", gap: "0.625rem", marginBottom: "1.5rem" }}>
                      {[
                        "MDS — Orthodontics and Dentofacial Orthopaedics",
                        "Dedicated lingual orthodontics training",
                        "CAD/CAM lingual bracket training",
                        "Practical workshops in lingual orthodontic techniques",
                      ].map((item) => (
                        <StaggerItem key={item}>
                          <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                            <span style={{ color: "var(--color-jonquil)", flexShrink: 0, marginTop: "0.1em" }}>
                              <CheckIcon size="sm" />
                            </span>
                            <p style={{ color: "var(--color-cafe-noir)", fontSize: "0.9375rem", lineHeight: 1.6, margin: 0 }}>
                              {item}
                            </p>
                          </div>
                        </StaggerItem>
                      ))}
                    </StaggerContainer>
                    <Link href={`/dentists/${orthodontist.slug}`} style={{ textDecoration: "none" }}>
                      <div
                        className="card-tea"
                        style={{ padding: "1.5rem", display: "flex", alignItems: "center", gap: "1.5rem" }}
                      >
                        <DoctorPhoto name={orthodontist.name} photo={orthodontist.photo} size="sm" />
                        <div style={{ flex: 1 }}>
                          <p
                            style={{
                              fontFamily: "var(--font-serif)",
                              fontSize: "1.0625rem",
                              color: "var(--color-dark-moss)",
                              marginBottom: "0.25rem",
                            }}
                          >
                            {orthodontist.name}
                          </p>
                          <p className="credentials">{orthodontist.qualifications} — {orthodontist.specialty}</p>
                        </div>
                        <span
                          style={{
                            color: "var(--color-olive)",
                            fontFamily: "var(--font-sans)",
                            flexShrink: 0,
                            fontWeight: 600,
                            display: "flex",
                            alignItems: "center",
                            gap: "0.25rem",
                            fontSize: "0.875rem",
                          }}
                        >
                          View profile <ArrowRightIcon size="sm" />
                        </span>
                      </div>
                    </Link>
                  </div>
                </RevealUp>
              )}

              {/* Lingual vs clear aligners */}
              <RevealUp delay={0.05}>
                <div className="card-light" style={{ padding: "1.75rem" }}>
                  <h2
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "1.375rem",
                      color: "var(--color-dark-moss)",
                      fontWeight: 400,
                      marginBottom: "1rem",
                    }}
                  >
                    Lingual braces versus clear aligners
                  </h2>
                  <p style={{ color: "var(--color-cafe-noir)", lineHeight: 1.75, fontSize: "0.9375rem", marginBottom: "1rem" }}>
                    Both lingual braces and clear aligners are less visible than conventional fixed braces.
                    The right choice depends on your clinical needs, lifestyle, and preferences:
                  </p>
                  <div style={{ display: "grid", gap: "0.75rem" }}>
                    {[
                      { aspect: "Visibility", lingual: "Completely hidden (fixed behind teeth)", aligner: "Nearly invisible when worn" },
                      { aspect: "Removal", lingual: "Fixed — not removable", aligner: "Removable for eating and hygiene" },
                      { aspect: "Compliance", lingual: "Works continuously — no compliance needed", aligner: "Must be worn 20–22 hours/day" },
                      { aspect: "Complex cases", lingual: "Suitable for most cases including complex", aligner: "Better for mild to moderate cases" },
                      { aspect: "Speech", lingual: "Short adjustment period for most patients", aligner: "Minimal speech effect" },
                    ].map((row) => (
                      <div
                        key={row.aspect}
                        style={{
                          display: "grid",
                          gridTemplateColumns: "120px 1fr 1fr",
                          gap: "0.75rem",
                          padding: "0.75rem",
                          backgroundColor: "var(--color-honeydew)",
                          borderRadius: "0.5rem",
                          fontSize: "0.875rem",
                        }}
                      >
                        <span style={{ fontWeight: 600, color: "var(--color-dark-moss)" }}>{row.aspect}</span>
                        <span style={{ color: "var(--color-cafe-noir)" }}>{row.lingual}</span>
                        <span style={{ color: "var(--color-cafe-noir)" }}>{row.aligner}</span>
                      </div>
                    ))}
                  </div>
                  <p style={{ fontSize: "0.8125rem", color: "var(--color-olive)", marginTop: "1rem", lineHeight: 1.5 }}>
                    A consultation with Dr. Jeo Tom Charls will determine which option is clinically
                    appropriate for your specific case — both are available at Smile Architects.
                  </p>
                </div>
              </RevealUp>

              {/* FAQs */}
              <RevealUp delay={0.05}>
                <div>
                  <h2
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "1.75rem",
                      color: "var(--color-dark-moss)",
                      fontWeight: 400,
                      marginBottom: "1.5rem",
                    }}
                  >
                    Frequently asked questions
                  </h2>
                  <div style={{ display: "grid", gap: "1.25rem" }}>
                    {FAQS.map((faq) => (
                      <div key={faq.q} className="card-light" style={{ padding: "1.375rem" }}>
                        <h3
                          style={{
                            fontSize: "1rem",
                            fontWeight: 600,
                            color: "var(--color-dark-moss)",
                            marginBottom: "0.625rem",
                          }}
                        >
                          {faq.q}
                        </h3>
                        <p
                          style={{
                            color: "var(--color-cafe-noir)",
                            fontSize: "0.9375rem",
                            lineHeight: 1.65,
                            margin: 0,
                          }}
                        >
                          {faq.a}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </RevealUp>

              {/* Related */}
              <RevealUp delay={0.05}>
                <div>
                  <h2
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "1.375rem",
                      color: "var(--color-dark-moss)",
                      fontWeight: 400,
                      marginBottom: "1rem",
                    }}
                  >
                    Related treatments
                  </h2>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                      gap: "0.75rem",
                    }}
                  >
                    {[
                      { label: "Braces (Metal & Ceramic)", href: "/orthodontics/braces" },
                      { label: "Clear Aligners", href: "/orthodontics/clear-aligners" },
                      { label: "All Orthodontics", href: "/orthodontics" },
                    ].map((item) => (
                      <Link key={item.href} href={item.href} style={{ textDecoration: "none" }}>
                        <div className="card-light" style={{ padding: "1rem 1.25rem" }}>
                          <p
                            style={{
                              fontFamily: "var(--font-serif)",
                              fontSize: "0.9375rem",
                              color: "var(--color-dark-moss)",
                              marginBottom: "0.25rem",
                            }}
                          >
                            {item.label}
                          </p>
                          <p
                            style={{
                              fontSize: "0.8125rem",
                              color: "var(--color-olive)",
                              fontFamily: "var(--font-sans)",
                              fontWeight: 600,
                            }}
                          >
                            Learn more →
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </RevealUp>
            </div>

            {/* ── RIGHT COLUMN ── */}
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
                  <AppointmentForm compact heading="Book Lingual Braces Consultation" />
                </div>
              </div>
            </RevealFade>
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ──────────────────────────────────────────── */}
      <section className="section-padding section-dark">
        <div className="container-xl" style={{ textAlign: "center" }}>
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.75rem",
              color: "var(--color-honeydew)",
              fontWeight: 400,
              marginBottom: "1rem",
            }}
          >
            Find out if lingual braces are right for you
          </h2>
          <p
            style={{
              color: "var(--color-honeydew)",
              opacity: 0.85,
              maxWidth: "500px",
              margin: "0 auto 2rem",
              lineHeight: 1.65,
              fontSize: "1rem",
            }}
          >
            A clinical assessment is required to determine suitability. Book a consultation with
            Dr. Jeo Tom Charls at Smile Architects, Pala, Kottayam District.
          </p>
          <div style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap", justifyContent: "center" }}>
            <Link href="/book-appointment" className="btn btn-secondary btn-lg">
              Book Consultation
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
