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
  title: "Clear Aligners in Pala, Kottayam District | Smile Architects",
  description:
    "Clear aligner orthodontic treatment at Smile Architects, Pala, Kottayam District. ClearPath certified. Dr. Jeo Tom Charls, MDS Orthodontics. Transparent, removable aligners for adults and teenagers. Call +91 9446 999 333.",
  canonical: "/orthodontics/clear-aligners",
});

const HOW_IT_WORKS = [
  {
    step: "1",
    title: "Assessment and planning",
    description:
      "A comprehensive orthodontic assessment determines whether clear aligners are suitable for your case. Digital records — including photographs and X-rays where required — are used to plan the tooth movements and generate the aligner series.",
  },
  {
    step: "2",
    title: "Aligner fabrication",
    description:
      "A custom series of clear plastic trays is manufactured. Each tray is slightly different from the previous one and progressively moves the teeth towards the planned final position.",
  },
  {
    step: "3",
    title: "Wearing the aligners",
    description:
      "Aligners are worn for 20–22 hours per day. They are removed only for eating, drinking anything other than water, and oral hygiene. Each set of trays is typically worn for one to two weeks before progressing to the next.",
  },
  {
    step: "4",
    title: "Progress reviews",
    description:
      "Regular appointments (typically every 6–10 weeks) allow the orthodontist to assess progress, make any refinements needed, and issue the next set of trays.",
  },
  {
    step: "5",
    title: "Refinements and completion",
    description:
      "Some cases require additional refinement aligners — additional trays to fine-tune the final result. Once treatment is complete, retainers are provided to maintain the outcome.",
  },
];

const SUITABLE_FOR = [
  "Mild to moderate crowding or spacing",
  "Minor overbite or underbite correction",
  "Closing small gaps between teeth",
  "Patients who prefer a removable appliance",
  "Adults who want discretion during treatment",
  "Cases where compliance is high",
];

const NOT_IDEAL_FOR = [
  "Severe rotations or complex bite problems (typically better managed with fixed braces)",
  "Patients who cannot commit to 20–22 hours of daily wear",
  "Cases requiring significant vertical movements",
  "Younger patients with mixed dentition",
];

const FAQS = [
  {
    q: "What brand of clear aligners does Smile Architects use?",
    a: "Dr. Jeo Tom Charls holds ClearPath aligner certification. ClearPath is a recognised clear aligner system. The appropriate aligner system for your case will be discussed during your consultation.",
  },
  {
    q: "How long does clear aligner treatment take?",
    a: "Treatment duration depends on the complexity of tooth movement required. Simple cases may be completed in 6–12 months; more involved cases can take 18–24 months or longer. Your orthodontist will give an estimated duration based on your clinical assessment.",
  },
  {
    q: "Do I have to remove aligners to eat?",
    a: "Yes. Aligners should be removed before eating or drinking anything other than plain water. This prevents damage to the trays and avoids trapping food or liquid against the teeth. Aligners should be cleaned and teeth brushed before reinserting after meals.",
  },
  {
    q: "What are attachments (buttons) on clear aligners?",
    a: "For certain tooth movements, small tooth-coloured composite 'buttons' are bonded to specific teeth. These attachments give the aligner something to grip, enabling more precise movements that would otherwise be difficult with aligners alone. They blend with natural tooth colour and are removed at the end of treatment.",
  },
  {
    q: "What happens if I lose or break an aligner tray?",
    a: "Contact Smile Architects as soon as possible. Depending on how far into that aligner you are, you may be advised to move to the next tray or have a replacement fabricated. Replacement trays involve an additional cost.",
  },
  {
    q: "Are clear aligners suitable for teenagers?",
    a: "Clear aligners can work well for older teenagers with good compliance and most of their permanent teeth present. The requirement for disciplined daily wear means they are less predictable in patients who may not reliably maintain 20–22 hours per day of wear. This is worth discussing openly during consultation.",
  },
  {
    q: "Are retainers needed after aligner treatment?",
    a: "Yes. Retainers are essential after any orthodontic treatment, including clear aligners. Without retainers, teeth will gradually shift back towards their original positions. Retainers are typically worn full-time initially, then long-term at night.",
  },
];

export default function ClearAlignersPage() {
  const orthodontist = DOCTORS.find((d) => d.id === "dr-jeo-tom-charls");

  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: "Clear Aligner Orthodontic Treatment",
    alternateName: ["Clear Aligners", "Transparent Aligners", "Removable Aligners"],
    description:
      "Clear aligner orthodontic treatment — custom transparent removable trays to straighten teeth — at Smile Architects, Pala, Kottayam District, Kerala. ClearPath certified.",
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
      { "@type": "ListItem", position: 3, name: "Clear Aligners", item: `${CLINIC.seo.siteUrl}/orthodontics/clear-aligners` },
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
                { label: "Clear Aligners", href: "/orthodontics/clear-aligners" },
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
              Clear Aligners in Pala, Kottayam District
            </h1>
            <p
              style={{
                color: "var(--color-olive)",
                fontSize: "1.0625rem",
                maxWidth: "620px",
                lineHeight: 1.65,
                fontFamily: "var(--font-sans)",
              }}
            >
              Transparent, removable aligner treatment at Smile Architects, Pala. ClearPath certified,
              led by Dr. Jeo Tom Charls — MDS Orthodontics and Dentofacial Orthopaedics.
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

              {/* How aligners work */}
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
                    How clear aligners work
                  </h2>
                  <p style={{ color: "var(--color-cafe-noir)", lineHeight: 1.75, fontSize: "1rem", marginBottom: "1.25rem" }}>
                    Clear aligners are a series of custom-made, transparent plastic trays. Each tray
                    is fabricated to be slightly different from the previous one — incrementally moving
                    the teeth towards the planned final position. Worn in sequence over the course of
                    treatment, they gradually shift teeth without the need for brackets or wires.
                  </p>
                  <p style={{ color: "var(--color-cafe-noir)", lineHeight: 1.75, fontSize: "1rem" }}>
                    Because they are removable, they can be taken out for eating, drinking and oral
                    hygiene — but they must be worn for 20–22 hours per day to be effective. Consistency
                    of wear is one of the most important factors in the success of aligner treatment.
                  </p>
                </div>
              </RevealUp>

              {/* How it works step by step */}
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
                    {HOW_IT_WORKS.map((s) => (
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

              {/* Suitability */}
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
                      Clear aligners may be suitable for
                    </h2>
                    <StaggerContainer stagger={0.05} style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                      {SUITABLE_FOR.map((s) => (
                        <StaggerItem key={s}>
                          <div style={{ display: "flex", gap: "0.625rem", alignItems: "flex-start" }}>
                            <span style={{ color: "var(--color-jonquil)", flexShrink: 0, marginTop: "0.1em" }}>
                              <CheckIcon size="sm" />
                            </span>
                            <p style={{ color: "var(--color-cafe-noir)", fontSize: "0.875rem", lineHeight: 1.6, margin: 0 }}>{s}</p>
                          </div>
                        </StaggerItem>
                      ))}
                    </StaggerContainer>
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
                      May not be the best option for
                    </h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                      {NOT_IDEAL_FOR.map((n) => (
                        <div key={n} style={{ display: "flex", gap: "0.625rem", alignItems: "flex-start" }}>
                          <span
                            style={{
                              color: "var(--color-olive)",
                              flexShrink: 0,
                              marginTop: "0.4em",
                              width: "5px",
                              height: "5px",
                              borderRadius: "50%",
                              backgroundColor: "var(--color-olive)",
                              display: "inline-block",
                            }}
                          />
                          <p style={{ color: "var(--color-cafe-noir)", fontSize: "0.875rem", lineHeight: 1.6, margin: 0 }}>{n}</p>
                        </div>
                      ))}
                    </div>
                    <p style={{ fontSize: "0.8125rem", color: "var(--color-olive)", marginTop: "1rem", lineHeight: 1.5 }}>
                      A clinical assessment is required to determine if aligners are suitable for your
                      specific case.
                    </p>
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
                          <p style={{ color: "var(--color-olive)", fontSize: "0.875rem", marginTop: "0.375rem" }}>
                            ClearPath aligner certification · MDS Orthodontics
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

              {/* Cost information — honest, no numbers */}
              <RevealUp delay={0.05}>
                <div className="card-light" style={{ padding: "1.75rem" }}>
                  <h2
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "1.375rem",
                      color: "var(--color-dark-moss)",
                      fontWeight: 400,
                      marginBottom: "0.875rem",
                    }}
                  >
                    Treatment costs
                  </h2>
                  <p style={{ color: "var(--color-cafe-noir)", lineHeight: 1.75, fontSize: "0.9375rem" }}>
                    Clear aligner treatment fees depend on the complexity of tooth movement required,
                    the number of aligner trays in the series, and whether refinement aligners are
                    needed. A detailed treatment plan — including all relevant costs — is provided at
                    your consultation before any commitment is required.
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
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "0.75rem" }}>
                    {[
                      { label: "Braces (Metal & Ceramic)", href: "/orthodontics/braces" },
                      { label: "Lingual Braces (Hidden)", href: "/orthodontics/lingual-braces" },
                      { label: "All Orthodontics", href: "/orthodontics" },
                    ].map((item) => (
                      <Link key={item.href} href={item.href} style={{ textDecoration: "none" }}>
                        <div className="card-light" style={{ padding: "1rem 1.25rem" }}>
                          <p style={{ fontFamily: "var(--font-serif)", fontSize: "0.9375rem", color: "var(--color-dark-moss)", marginBottom: "0.25rem" }}>
                            {item.label}
                          </p>
                          <p style={{ fontSize: "0.8125rem", color: "var(--color-olive)", fontFamily: "var(--font-sans)", fontWeight: 600 }}>
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
                  <AppointmentForm compact heading="Book Aligner Consultation" />
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
            Book a clear aligner assessment in Pala
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
            Dr. Jeo Tom Charls will assess your case and advise whether clear aligners are
            clinically appropriate — and how they compare with other options available to you.
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
