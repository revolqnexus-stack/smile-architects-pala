import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";
import { TREATMENTS } from "@/lib/site-config";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { TreatmentIconFor, ArrowRightIcon } from "@/components/ui/icons";

export const metadata: Metadata = buildMetadata({
  title: "Dental Treatments in Pala, Kottayam | Smile Architects",
  description:
    "Dental treatments at Smile Architects, Pala — orthodontics, dental implants, root canal treatment, cosmetic dentistry, smile design, paediatric dentistry and more in Kottayam, Kerala.",
  canonical: "/treatments",
});

const TREATMENT_CATEGORIES = [
  {
    category: "Preventive & General",
    treatments: ["general-dentistry", "pediatric-dentistry"],
  },
  {
    category: "Orthodontics",
    treatments: ["orthodontics", "braces", "clear-aligners", "lingual-braces"],
  },
  {
    category: "Restorative & Surgical",
    treatments: ["dental-implants", "root-canal-treatment", "restorative-dentistry", "oral-surgery"],
  },
  {
    category: "Cosmetic",
    treatments: ["cosmetic-dentistry", "smile-design", "veneers"],
  },
  {
    category: "Periodontics & Prosthodontics",
    treatments: ["periodontal-treatment", "prosthodontics", "crowns", "bridges", "dentures"],
  },
];

export default function TreatmentsPage() {
  return (
    <>
      {/* Hero section — botanical warm background */}
      <div className="section-padding section-warm">
        <div className="container-xl">
          <Breadcrumb items={[{ label: "Treatments", href: "/treatments" }]} />
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
            Dental treatments in Pala, Kottayam
          </h1>
          <p style={{ 
            color: "var(--color-olive)", 
            fontSize: "1.0625rem", 
            maxWidth: "560px", 
            lineHeight: 1.65,
            fontFamily: "var(--font-sans)"
          }}>
            Smile Architects offers comprehensive dental care — from routine general dentistry
            to specialist orthodontics, implants and cosmetic treatments — all in Pala, Kottayam.
          </p>
        </div>
      </div>

      {/* Treatment categories — light background with botanical cards */}
      <section className="section-padding section-light">
        <div className="container-xl">
          {TREATMENT_CATEGORIES.map((cat, categoryIndex) => {
            const catTreatments = cat.treatments
              .map((id) => TREATMENTS.find((t) => t.id === id))
              .filter(Boolean);
            return (
              <div key={cat.category} style={{ marginBottom: categoryIndex === TREATMENT_CATEGORIES.length - 1 ? 0 : "4rem" }}>
                <div className="accent-line" />
                <p className="eyebrow" style={{ marginBottom: "1.25rem" }}>
                  {cat.category}
                </p>
                <div className="treatments-grid">
                  {catTreatments.map((t) =>
                    t ? (
                      <Link
                        key={t.id}
                        href={`/treatments/${t.slug}`}
                        className="treatment-card-link"
                        aria-label={`Learn about ${t.title} in Pala`}
                      >
                        <div className="card-treatment">
                          {/* Treatment icon */}
                          <div style={{ marginBottom: "1.125rem", color: "var(--color-dark-moss)" }}>
                            <TreatmentIconFor slug={t.slug} size="lg" />
                          </div>
                          <h3 className="treatment-card-title">{t.title}</h3>
                          <p className="treatment-card-body">{t.shortDescription}</p>
                          <span className="card-learn-more">
                            Learn more <ArrowRightIcon size="sm" />
                          </span>
                        </div>
                      </Link>
                    ) : null
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA section — dark moss background */}
      <section className="section-padding section-dark">
        <div className="container-xl" style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.25rem" }}>
          <h2 style={{ 
            fontFamily: "var(--font-serif)", 
            fontSize: "clamp(1.75rem, 3vw, 2.25rem)", 
            color: "var(--color-honeydew)", 
            fontWeight: 400,
            maxWidth: "520px",
            lineHeight: 1.2
          }}>
            Not sure which treatment you need?
          </h2>
          <p style={{ 
            color: "var(--color-honeydew)", 
            opacity: 0.85,
            maxWidth: "460px", 
            lineHeight: 1.65,
            fontSize: "1rem",
            fontFamily: "var(--font-sans)"
          }}>
            Book a consultation at Smile Architects and our team will assess your dental health and
            discuss the most appropriate treatment options for you.
          </p>
          <div style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap", justifyContent: "center", marginTop: "0.5rem" }}>
            <Link href="/book-appointment" className="btn btn-secondary btn-lg">Book a Consultation</Link>
            <Link href="/contact" className="btn btn-ghost-light">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
