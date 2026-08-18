import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";
import { CLINIC } from "@/lib/site-config";
import Breadcrumb from "@/components/ui/Breadcrumb";

export const metadata: Metadata = buildMetadata({
  title: "Dental Guides | Smile Architects, Pala",
  description:
    "Patient guides on dental health from Smile Architects — orthodontics, braces, dental implants, root canal treatment and more. Dental clinic in Pala, Kottayam, Kerala.",
  canonical: "/dental-guides",
});

const GUIDES = [
  {
    slug: "braces-what-to-expect",
    title: "What to expect from braces treatment",
    category: "Orthodontics",
    excerpt:
      "From your first orthodontic assessment to retainers — a clear overview of the braces treatment journey at Smile Architects.",
    readTime: "4 min read",
  },
  {
    slug: "clear-aligners-vs-braces",
    title: "Clear aligners vs braces: which is right for you?",
    category: "Orthodontics",
    excerpt:
      "A balanced comparison of clear aligner systems and fixed braces — covering aesthetics, cost, comfort and clinical suitability.",
    readTime: "5 min read",
  },
  {
    slug: "lingual-braces-guide",
    title: "Lingual braces (hidden braces): a patient guide",
    category: "Orthodontics",
    excerpt:
      "How lingual braces work, what to expect during treatment, and why some patients prefer them over conventional or clear aligner options.",
    readTime: "4 min read",
  },
  {
    slug: "dental-implants-guide",
    title: "Dental implants: your questions answered",
    category: "Implants",
    excerpt:
      "Everything you need to know before considering a dental implant — the procedure, healing time, costs and long-term care.",
    readTime: "6 min read",
  },
  {
    slug: "root-canal-myths",
    title: "Root canal treatment: separating fact from fiction",
    category: "General Dentistry",
    excerpt:
      "Root canal treatment has an unfair reputation. Here we address the most common concerns and explain what modern endodontic treatment actually involves.",
    readTime: "3 min read",
  },
  {
    slug: "childrens-dental-health",
    title: "Children's dental health: a parent's guide",
    category: "Paediatric Dentistry",
    excerpt:
      "When to bring your child to the dentist, how to manage milk teeth, preventing decay, and what to watch for as permanent teeth emerge.",
    readTime: "5 min read",
  },
  {
    slug: "smile-design-guide",
    title: "Smile design: what is it and who is it for?",
    category: "Cosmetic Dentistry",
    excerpt:
      "Digital Smile Design allows you to preview your new smile before treatment. Learn how the process works and what treatments it can include.",
    readTime: "4 min read",
  },
  {
    slug: "oral-hygiene-tips",
    title: "Oral hygiene: the basics that make a real difference",
    category: "General Dentistry",
    excerpt:
      "Simple, evidence-based guidance on brushing, flossing, diet and regular check-ups — the everyday habits that protect teeth and gums long-term.",
    readTime: "3 min read",
  },
];

const CATEGORIES = [...new Set(GUIDES.map((g) => g.category))];

export default function DentalGuidesPage() {
  return (
    <>
      {/* Header */}
      <div className="section-padding section-warm">
        <div className="container-xl">
          <Breadcrumb items={[{ label: "Dental Guides", href: "/dental-guides" }]} />
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
            Dental guides
          </h1>
          <p style={{ color: "var(--color-olive)", fontSize: "1.0625rem", maxWidth: "560px", lineHeight: 1.65 }}>
            Patient guides on dental treatments and oral health — written by the Smile Architects
            team to help you make informed decisions about your dental care.
          </p>
        </div>
      </div>

      {/* Guides by category */}
      <section 
        className="section-padding"
        style={{
          background: "linear-gradient(135deg, #FDFDFD 0%, #F4F6F5 100%)",
        }}
      >
        <div className="container-xl">
          {CATEGORIES.map((category) => {
            const categoryGuides = GUIDES.filter((g) => g.category === category);
            return (
              <div key={category} style={{ marginBottom: "3.5rem" }}>
                <h2
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.75rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--color-olive)",
                    fontWeight: 600,
                    marginBottom: "1.25rem",
                  }}
                >
                  {category}
                </h2>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                    gap: "1.5rem",
                  }}
                >
                  {categoryGuides.map((guide) => (
                    <Link
                      key={guide.slug}
                      href={`/dental-guides/${guide.slug}`}
                      style={{ textDecoration: "none" }}
                      aria-label={guide.title}
                    >
                      <article className="guide-card">
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.75rem" }}>
                          <span className="tag-olive">
                            {guide.category}
                          </span>
                          <span style={{ fontSize: "0.75rem", color: "var(--color-moss)", fontFamily: "var(--font-sans)", whiteSpace: "nowrap" }}>
                            {guide.readTime}
                          </span>
                        </div>
                        <h3>
                          {guide.title}
                        </h3>
                        <p>
                          {guide.excerpt}
                        </p>
                        <span className="read-link">
                          Read guide <span className="arrow">→</span>
                        </span>
                      </article>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="section-dark" style={{ padding: "3.5rem 0" }}>
        <div
          className="container-xl"
          style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.25rem" }}
        >
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.375rem, 2.5vw, 1.875rem)",
              color: "var(--color-honeydew)",
              fontWeight: 400,
            }}
          >
            Questions about a treatment?
          </h2>
          <p style={{ color: "var(--color-honeydew)", opacity: 0.9, maxWidth: "460px", lineHeight: 1.65 }}>
            The Smile Architects team is happy to discuss any treatment before you commit to
            anything. Book a consultation or call us directly.
          </p>
          <div style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap", justifyContent: "center" }}>
            <Link href="/book-appointment" className="btn btn-secondary">
              Book a Consultation
            </Link>
            <a href={`tel:${CLINIC.contact.phone}`} className="btn btn-ghost-light">
              {CLINIC.contact.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
