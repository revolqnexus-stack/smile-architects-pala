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
  title: "Braces in Pala, Kottayam District | Smile Architects",
  description:
    "Metal, ceramic and self-ligating braces at Smile Architects, Pala. Led by Dr. Jeo Tom Charls, MDS Orthodontics. Serving patients from Kottayam District, Kerala. Call +91 9446 999 333.",
  canonical: "/orthodontics/braces",
});

const BRACE_TYPES = [
  {
    title: "Metal Braces",
    description:
      "The most commonly used fixed appliance. Stainless steel brackets are bonded to the outer tooth surface and connected by a metal archwire. Highly effective for all degrees of crowding, spacing and bite problems.",
    suitableFor: "All ages and most cases, including complex bite corrections",
    notes: "Durable, cost-effective, and reliably predictable for a wide range of problems.",
  },
  {
    title: "Ceramic Braces",
    description:
      "Tooth-coloured ceramic brackets that blend with the natural colour of teeth. The archwire may also be tooth-coloured. Aesthetically more discreet than metal braces while working on the same mechanical principle.",
    suitableFor: "Adults and older teenagers who prefer a less noticeable appliance",
    notes: "Slightly more delicate than metal brackets. Oral hygiene instruction is particularly important.",
  },
  {
    title: "Damon / Self-Ligating Braces",
    description:
      "Self-ligating brackets use a built-in clip mechanism instead of elastic ties to hold the archwire. This may reduce friction and can allow for more comfortable tooth movement in some cases.",
    suitableFor: "Patients where reduced friction and fewer elastic tie changes are preferred",
    notes: "Available in metal and ceramic versions. Dr. Jeo Tom Charls has clinical experience with Damon systems.",
  },
];

const TREATMENT_STEPS = [
  {
    step: "1",
    title: "Initial Assessment",
    description:
      "Comprehensive orthodontic examination including clinical assessment, digital X-rays, photographs, and, where required, study models. All treatment options — braces, lingual braces, clear aligners — are discussed during this appointment.",
  },
  {
    step: "2",
    title: "Treatment Planning",
    description:
      "A personalised treatment plan is prepared, outlining the type of appliance recommended, any preparatory treatment (such as extractions), the estimated duration, and the appointment schedule.",
  },
  {
    step: "3",
    title: "Brace Fitting",
    description:
      "Brackets are bonded to the teeth using dental adhesive, and the archwire is inserted. The appointment typically takes 45–90 minutes. Some soreness for a few days afterwards is normal as teeth begin to move.",
  },
  {
    step: "4",
    title: "Regular Adjustments",
    description:
      "Appointments every 4–8 weeks to change the wire, replace elastic ties, and monitor progress. Each appointment takes around 20–30 minutes.",
  },
  {
    step: "5",
    title: "Brace Removal and Retention",
    description:
      "Once treatment is complete, the braces are removed and retainers are fitted. Retainers are essential to maintain the result — teeth will shift without them.",
  },
];

const FAQS = [
  {
    q: "At what age should my child have an orthodontic assessment?",
    a: "An initial orthodontic assessment from around age 7–9 is generally useful — this is when a mix of milk and permanent teeth allows the orthodontist to identify emerging bite issues. Early assessment does not always mean early treatment, but it allows appropriate monitoring and timely intervention if needed.",
  },
  {
    q: "Do braces hurt?",
    a: "Most patients experience some soreness and sensitivity for a few days after fitting and after each adjustment appointment. This is normal and is caused by the gentle pressure moving the teeth. Over-the-counter pain relief is usually sufficient. Discomfort typically settles within a few days.",
  },
  {
    q: "How long will I need to wear braces?",
    a: "Treatment duration varies from around 12 months for simple cases to 24–30 months for more complex situations. Your orthodontist will give an estimated duration after assessing your specific case.",
  },
  {
    q: "Can adults have braces?",
    a: "Yes. Adult orthodontic treatment is very common and can be just as effective as treatment in younger patients, provided teeth and gums are healthy. The main difference is that adults do not have the advantage of active jaw growth. All appliance types — including more discreet options like ceramic braces, lingual braces or clear aligners — are available.",
  },
  {
    q: "What happens if I don't wear my retainer after treatment?",
    a: "Teeth have a natural tendency to drift back towards their original positions. Without consistent retainer wear, this relapse can occur — sometimes within months. Retainers are prescribed as part of every orthodontic treatment. Full-time wear is usually required initially, transitioning to night-time wear long-term.",
  },
];

export default function BracesPage() {
  const orthodontist = DOCTORS.find((d) => d.id === "dr-jeo-tom-charls");

  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: "Dental Braces",
    alternateName: ["Fixed Orthodontic Appliance", "Orthodontic Braces", "Ceramic Braces", "Metal Braces"],
    description:
      "Fixed orthodontic braces treatment — metal, ceramic and self-ligating — at Smile Architects, Pala, Kottayam District, Kerala.",
    procedureType: "https://health-lifesci.schema.org/DentalProcedure",
    bodyLocation: "Teeth and Jaws",
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
      { "@type": "ListItem", position: 3, name: "Braces", item: `${CLINIC.seo.siteUrl}/orthodontics/braces` },
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

      {/* ── PAGE HEADER ────────────────────────────────────────── */}
      <div className="section-padding section-warm">
        <div className="container-xl">
          <RevealFade>
            <Breadcrumb
              items={[
                { label: "Orthodontics", href: "/orthodontics" },
                { label: "Braces", href: "/orthodontics/braces" },
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
              Braces in Pala, Kottayam District
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
              Metal, ceramic and self-ligating braces, led by Dr. Jeo Tom Charls — MDS Orthodontics and
              Dentofacial Orthopaedics — at Smile Architects, Pala.
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

              {/* Introduction */}
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
                    Fixed orthodontic braces
                  </h2>
                  <p style={{ color: "var(--color-cafe-noir)", lineHeight: 1.75, fontSize: "1rem", marginBottom: "1.25rem" }}>
                    Fixed braces are bonded to the outer surfaces of the teeth and work continuously —
                    without relying on the patient to remember to insert or wear them. Brackets and an
                    archwire create controlled, sustained pressure to move teeth precisely into the planned
                    positions.
                  </p>
                  <p style={{ color: "var(--color-cafe-noir)", lineHeight: 1.75, fontSize: "1rem" }}>
                    At Smile Architects, braces treatment is planned and supervised by Dr. Jeo Tom Charls,
                    who holds a Master of Dental Surgery (MDS) in Orthodontics and Dentofacial Orthopaedics
                    — a postgraduate qualification dedicated exclusively to tooth movement, jaw growth and
                    bite correction.
                  </p>
                </div>
              </RevealUp>

              {/* Brace types */}
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
                    Types of braces available
                  </h2>
                  <p style={{ color: "var(--color-cafe-noir)", lineHeight: 1.75, fontSize: "1rem", marginBottom: "1.5rem" }}>
                    The appropriate brace type depends on your clinical needs, aesthetic preferences, age
                    and lifestyle. All the following are available at Smile Architects:
                  </p>
                  <StaggerContainer stagger={0.07} style={{ display: "grid", gap: "1.25rem" }}>
                    {BRACE_TYPES.map((type) => (
                      <StaggerItem key={type.title}>
                        <div className="card-tea" style={{ padding: "1.5rem" }}>
                          <h3
                            style={{
                              fontSize: "1.125rem",
                              fontWeight: 600,
                              color: "var(--color-dark-moss)",
                              marginBottom: "0.625rem",
                            }}
                          >
                            {type.title}
                          </h3>
                          <p
                            style={{
                              color: "var(--color-cafe-noir)",
                              fontSize: "0.9375rem",
                              lineHeight: 1.65,
                              marginBottom: "0.875rem",
                            }}
                          >
                            {type.description}
                          </p>
                          <p style={{ fontSize: "0.8125rem", color: "var(--color-olive)", lineHeight: 1.5, marginBottom: "0.5rem" }}>
                            <strong style={{ color: "var(--color-dark-moss)" }}>Suitable for:</strong>{" "}
                            {type.suitableFor}
                          </p>
                          <p style={{ fontSize: "0.8125rem", color: "var(--color-olive)", lineHeight: 1.5 }}>
                            {type.notes}
                          </p>
                        </div>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </div>
              </RevealUp>

              {/* Treatment steps */}
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
                    The treatment process
                  </h2>
                  <div style={{ display: "grid", gap: "1.25rem" }}>
                    {TREATMENT_STEPS.map((s) => (
                      <div key={s.step} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                        <div
                          style={{
                            backgroundColor: "var(--color-jonquil)",
                            borderRadius: "50%",
                            width: "2.75rem",
                            height: "2.75rem",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          <span
                            style={{
                              color: "var(--color-dark-moss)",
                              fontWeight: 700,
                              fontSize: "1rem",
                              fontFamily: "var(--font-sans)",
                            }}
                          >
                            {s.step}
                          </span>
                        </div>
                        <div>
                          <h3
                            style={{
                              fontSize: "1.0625rem",
                              fontWeight: 600,
                              color: "var(--color-dark-moss)",
                              marginBottom: "0.375rem",
                            }}
                          >
                            {s.title}
                          </h3>
                          <p
                            style={{
                              color: "var(--color-cafe-noir)",
                              fontSize: "0.9375rem",
                              lineHeight: 1.65,
                            }}
                          >
                            {s.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </RevealUp>

              {/* Important considerations — YMYL */}
              <RevealUp delay={0.05}>
                <div className="card-warm" style={{ padding: "1.75rem" }}>
                  <h2
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "1.375rem",
                      color: "var(--color-dark-moss)",
                      fontWeight: 400,
                      marginBottom: "1rem",
                    }}
                  >
                    Important considerations
                  </h2>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {[
                      "Treatment duration depends on case complexity, bone response, and consistent attendance at adjustment appointments.",
                      "Oral hygiene during brace treatment requires additional effort — poor hygiene increases the risk of white-spot lesions and decay.",
                      "Some discomfort after fitting and adjustments is normal. Persistent or severe pain should be reported.",
                      "Retainer compliance after treatment is essential. Teeth will move without it.",
                      "Braces are not suitable for patients with significant active gum disease — this must be stabilised first.",
                    ].map((point, i) => (
                      <div
                        key={i}
                        style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}
                      >
                        <span style={{ color: "var(--color-jonquil)", flexShrink: 0, marginTop: "0.1em" }}>
                          <CheckIcon size="sm" />
                        </span>
                        <p
                          style={{
                            color: "var(--color-cafe-noir)",
                            fontSize: "0.9375rem",
                            lineHeight: 1.6,
                            margin: 0,
                          }}
                        >
                          {point}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </RevealUp>

              {/* Your orthodontist */}
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
                      Your orthodontist
                    </h2>
                    <Link href={`/dentists/${orthodontist.slug}`} style={{ textDecoration: "none" }}>
                      <div
                        className="card-tea"
                        style={{ padding: "1.75rem", display: "flex", alignItems: "center", gap: "1.5rem" }}
                      >
                        <DoctorPhoto
                          name={orthodontist.name}
                          photo={orthodontist.photo}
                          size="sm"
                        />
                        <div style={{ flex: 1 }}>
                          <p
                            style={{
                              fontFamily: "var(--font-serif)",
                              fontSize: "1.125rem",
                              color: "var(--color-dark-moss)",
                              marginBottom: "0.25rem",
                            }}
                          >
                            {orthodontist.name}
                          </p>
                          <p className="credentials">{orthodontist.qualifications} — {orthodontist.specialty}</p>
                          <p
                            style={{
                              color: "var(--color-olive)",
                              fontSize: "0.875rem",
                              lineHeight: 1.55,
                              marginTop: "0.5rem",
                            }}
                          >
                            {orthodontist.registrationBody} Reg. No. {orthodontist.registrationNumber}
                          </p>
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

              {/* Related treatments */}
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
                    Compare treatment options
                  </h2>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                      gap: "0.75rem",
                    }}
                  >
                    {[
                      { label: "Lingual Braces (Hidden)", href: "/orthodontics/lingual-braces" },
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
                  <AppointmentForm compact heading="Book Orthodontic Consultation" />
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
            Book an orthodontic consultation in Pala
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
            Discuss your case with Dr. Jeo Tom Charls. The initial assessment includes a full
            clinical examination, X-rays where required, and a discussion of all treatment options.
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
