import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";
import { TREATMENTS, CLINIC, DOCTORS } from "@/lib/site-config";
import Breadcrumb from "@/components/ui/Breadcrumb";
import AppointmentForm from "@/components/ui/AppointmentForm";
import { CheckIcon, ArrowRightIcon } from "@/components/ui/icons";
import DoctorPhoto from "@/components/ui/DoctorPhoto";
import {
  RevealUp,
  RevealFade,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/REVOLQComponents";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return TREATMENTS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const treatment = TREATMENTS.find((t) => t.slug === slug);
  if (!treatment) return {};

  // Orthodontic treatments get their own dedicated cluster pages — point canonical there
  const orthodonticSlugs = ["braces", "lingual-braces", "clear-aligners", "orthodontics"];
  const isOrthodontic = orthodonticSlugs.includes(slug);
  const canonicalBase = isOrthodontic ? `/orthodontics/${slug}` : `/treatments/${slug}`;
  // Orthodontics overview and braces/lingual/aligner point to their own cluster pages
  const canonical = slug === "orthodontics" ? "/orthodontics" : isOrthodontic && slug !== "orthodontics" ? `/orthodontics/${slug}` : `/treatments/${slug}`;

  return buildMetadata({
    title: `${treatment.title} in Pala, Kottayam | Smile Architects`,
    description: `${treatment.title} at Smile Architects — ${treatment.shortDescription} Multispeciality dental clinic in Pala, Kottayam District, Kerala. Call +91 9446 999 333.`,
    canonical: `/treatments/${treatment.slug}`,
  });
}

// Per-treatment rich content (description, points, who performs it)
const TREATMENT_DETAILS: Record<
  string,
  {
    intro: string;
    points: string[];
    doctorId?: string;
    relatedSlugs?: string[];
  }
> = {
  "general-dentistry": {
    intro:
      "General dentistry forms the foundation of good oral health. At Smile Architects, routine dental care includes check-ups, professional cleaning (scaling and polishing), fillings, tooth extractions and preventive advice. Regular visits allow early detection of problems before they become more complex or costly to treat.",
    points: [
      "Comprehensive dental examination and oral health assessment",
      "Scaling and polishing (professional cleaning)",
      "Tooth-coloured fillings (composite restorations)",
      "Tooth extraction, including simple surgical extractions",
      "Emergency dental care for pain or trauma",
      "Preventive advice: diet, brushing technique, fluoride",
      "Oral hygiene instruction tailored to your needs",
    ],
    relatedSlugs: ["root-canal-treatment", "pediatric-dentistry", "restorative-dentistry"],
  },
  "pediatric-dentistry": {
    intro:
      "Children's dental health requires a gentle, patient-centred approach. The team at Smile Architects is experienced in treating children across all ages — from first tooth check-ups through adolescence — in a calm, reassuring environment. Early dental visits help establish good habits and address issues like tooth decay, spacing or bite development before they worsen.",
    points: [
      "First dental visit check-ups for young children",
      "Preventive care: fluoride treatment and fissure sealants",
      "Fillings for primary (milk) and permanent teeth",
      "Space maintainers after early tooth loss",
      "Tooth extraction under local anaesthetic",
      "Guidance on thumb-sucking and oral habits",
      "Orthodontic assessment and growth monitoring",
    ],
    doctorId: "dr-jeo-tom-charls",
    relatedSlugs: ["general-dentistry", "orthodontics"],
  },
  "dental-implants": {
    intro:
      "Dental implants are the closest modern dentistry comes to a natural tooth replacement. A titanium post is surgically placed in the jawbone, integrates with the bone over time, and is then restored with a crown. The result is a fixed, stable tooth that looks, feels and functions like a natural tooth.",
    points: [
      "Single tooth implant placement and restoration",
      "Implant-supported bridges for multiple missing teeth",
      "Pre-implant assessment and treatment planning",
      "Digital X-ray and imaging for accurate implant placement",
      "Post-operative care and implant maintenance guidance",
      "Suitable for patients with healthy gums and adequate bone",
    ],
    relatedSlugs: ["prosthodontics", "bridges", "crowns"],
  },
  "cosmetic-dentistry": {
    intro:
      "Cosmetic dentistry improves the appearance of your teeth, gums and smile. At Smile Architects, cosmetic treatments are carried out with attention to natural aesthetics — results should look like a better version of your own smile, not an artificial one. Dr. Jeo Tom Charls has additional training in aesthetic dentistry.",
    points: [
      "Teeth whitening (professional in-clinic and take-home)",
      "Tooth-coloured composite bonding",
      "Porcelain and composite veneers",
      "Gum contouring and aesthetic gum treatment",
      "Smile makeover planning",
      "Replacing old metal fillings with tooth-coloured restorations",
    ],
    doctorId: "dr-jeo-tom-charls",
    relatedSlugs: ["smile-design", "veneers", "orthodontics"],
  },
  "smile-design": {
    intro:
      "Digital Smile Design (DSD) is a planning tool that allows you to preview your new smile before any treatment begins. Using photographs, digital design software and detailed clinical measurements, your desired outcome is visualised and agreed upon, then used to guide every step of the actual treatment. It brings together orthodontics, restorative and cosmetic dentistry into a single, coordinated plan.",
    points: [
      "Photographic analysis and digital smile simulation",
      "Combined treatment planning across specialties",
      "Mock-up trials before permanent treatment",
      "Coordination of orthodontics, veneers and restorations",
      "Smile design for weddings, special occasions and career goals",
      "Detailed digital treatment preview and discussion",
    ],
    doctorId: "dr-jeo-tom-charls",
    relatedSlugs: ["cosmetic-dentistry", "veneers", "orthodontics"],
  },
  "root-canal-treatment": {
    intro:
      "Root canal treatment (endodontic treatment) relieves pain and saves teeth that would otherwise need to be extracted. When the nerve or pulp inside a tooth becomes infected or irreversibly inflamed — typically due to deep decay, a crack or trauma — the infected tissue is removed, the root canals are cleaned and shaped, and the tooth is sealed and restored. Modern root canal treatment is performed under local anaesthetic and is generally no more uncomfortable than a routine filling.",
    points: [
      "Single and multi-visit root canal procedures",
      "Treatment of infected, painful or abscessed teeth",
      "Digital X-ray for accurate canal length measurement",
      "Post and core placement where required",
      "Crown placement to restore the treated tooth",
      "Re-treatment of previously root-filled teeth",
    ],
    relatedSlugs: ["general-dentistry", "crowns", "oral-surgery"],
  },
  "restorative-dentistry": {
    intro:
      "Restorative dentistry focuses on repairing damaged, decayed or missing teeth. At Smile Architects the goal is to restore both function and aesthetics — fillings, inlays, onlays, crowns and bridges are matched to natural tooth colour wherever possible.",
    points: [
      "Direct composite fillings (tooth-coloured)",
      "Amalgam replacement with composite or ceramic restorations",
      "Inlays and onlays for large cavities",
      "Dental crowns for heavily damaged or root-treated teeth",
      "Bridges to replace missing teeth",
      "Post and core build-ups",
    ],
    relatedSlugs: ["crowns", "bridges", "dental-implants"],
  },
  "oral-surgery": {
    intro:
      "Oral and maxillofacial surgery at Smile Architects covers the surgical procedures needed for teeth, jaws and surrounding structures — from routine extractions to minor surgical procedures. Complex surgical needs are assessed and referred appropriately.",
    points: [
      "Simple and surgical tooth extractions",
      "Impacted wisdom tooth assessment and extraction",
      "Minor cyst and lesion removal",
      "Frenectomy (frenum removal)",
      "Alveoloplasty and ridge preparation for dentures",
      "Pre-implant surgical procedures",
    ],
    relatedSlugs: ["dental-implants", "general-dentistry", "root-canal-treatment"],
  },
  orthodontics: {
    intro:
      "Orthodontic treatment corrects misaligned teeth and jaws to improve both function and appearance. At Smile Architects, Dr. Jeo Tom Charls — MDS Orthodontics and Dentofacial Orthopaedics — provides a full range of orthodontic treatment for children, adolescents and adults. A detailed orthodontic assessment determines the most appropriate appliance and treatment duration.",
    points: [
      "Comprehensive orthodontic assessment including X-rays and study models",
      "Metal and ceramic fixed appliances (braces)",
      "Damon / self-ligating brace systems",
      "Lingual braces (hidden braces on the inner tooth surface)",
      "Clear aligner treatment",
      "Growth modification and functional appliances for children",
      "Surgical orthodontics in coordination with oral surgeons",
      "Retainers and post-treatment monitoring",
    ],
    doctorId: "dr-jeo-tom-charls",
    relatedSlugs: ["braces", "clear-aligners", "lingual-braces"],
  },
  braces: {
    intro:
      "Dental braces use a system of brackets, wires and elastic ties to gradually reposition teeth. Smile Architects offers metal braces, ceramic (tooth-coloured) braces and self-ligating systems such as Damon brackets. The choice of appliance depends on your clinical needs, aesthetic preferences and budget. Treatment is led by Dr. Jeo Tom Charls, MDS Orthodontics.",
    points: [
      "Metal braces — durable and cost-effective",
      "Ceramic braces — tooth-coloured brackets for a discreet look",
      "Damon / self-ligating brackets — lower friction for potentially shorter treatment",
      "Regular adjustment appointments every 4–8 weeks",
      "Digital X-rays and progress records throughout treatment",
      "Retainers provided at end of treatment",
    ],
    doctorId: "dr-jeo-tom-charls",
    relatedSlugs: ["orthodontics", "lingual-braces", "clear-aligners"],
  },
  "clear-aligners": {
    intro:
      "Clear aligners are a series of transparent, removable trays that gradually move teeth to the desired position. They are virtually invisible when worn, can be removed for eating and cleaning, and are a popular choice for adults and older teenagers. Dr. Jeo Tom Charls has completed ClearPath aligner certification training.",
    points: [
      "Custom-fabricated clear aligner series",
      "Suitable for mild to moderate crowding, spacing and bite issues",
      "Removable for eating, drinking and oral hygiene",
      "Shorter chair-time compared to fixed appliances",
      "ClearPath certified treatment",
      "Digital treatment planning with predicted tooth movements",
      "Retainers on completion",
    ],
    doctorId: "dr-jeo-tom-charls",
    relatedSlugs: ["orthodontics", "braces", "lingual-braces"],
  },
  "lingual-braces": {
    intro:
      "Lingual braces are fixed orthodontic appliances bonded to the inner (tongue-side) surface of the teeth. When you smile, they are completely hidden. Dr. Jeo Tom Charls has completed dedicated lingual orthodontics training and CAD/CAM lingual bracket training, allowing him to offer this highly specialised treatment at Smile Architects.",
    points: [
      "Brackets bonded to the inner surface of teeth — invisible from the front",
      "Suitable for the same range of cases as conventional braces",
      "CAD/CAM customised lingual bracket systems",
      "Dedicated training in lingual orthodontic techniques",
      "Regular monitoring appointments throughout treatment",
      "Retainers provided on completion",
    ],
    doctorId: "dr-jeo-tom-charls",
    relatedSlugs: ["orthodontics", "braces", "clear-aligners"],
  },
  "periodontal-treatment": {
    intro:
      "Periodontal (gum) disease is one of the most common causes of tooth loss in adults, and can also affect general health. At Smile Architects, gum health is assessed at every routine visit. Scaling and root planing, oral hygiene reinforcement and targeted periodontal treatment are provided where indicated.",
    points: [
      "Periodontal assessment and probing",
      "Professional scaling and root planing (deep cleaning)",
      "Oral hygiene instruction and technique review",
      "Monitoring and maintenance programmes",
      "Referral for advanced surgical periodontal treatment where required",
    ],
    relatedSlugs: ["general-dentistry", "dental-implants"],
  },
  prosthodontics: {
    intro:
      "Prosthodontics focuses on restoring and replacing teeth using dental prostheses. At Smile Architects this includes crowns, bridges, dentures and implant-supported restorations. The aim is to restore comfortable function, natural aesthetics and confidence.",
    points: [
      "Dental crowns (ceramic, PFM, zirconia)",
      "Fixed dental bridges",
      "Complete and partial dentures",
      "Implant-supported crowns and bridges",
      "Implant-supported overdentures",
      "Temporary and immediate prostheses",
    ],
    relatedSlugs: ["crowns", "bridges", "dentures", "dental-implants"],
  },
  crowns: {
    intro:
      "A dental crown is a cap placed over a damaged, weakened or root-treated tooth to restore its shape, strength and appearance. Modern crowns are made from tooth-coloured materials — zirconia or all-ceramic — that blend naturally with surrounding teeth.",
    points: [
      "All-ceramic and zirconia crowns for natural aesthetics",
      "Porcelain-fused-to-metal (PFM) crowns",
      "Crowns for root canal treated teeth",
      "Crowns to restore fractured or heavily filled teeth",
      "Implant crowns",
      "Temporary crowns during fabrication",
    ],
    relatedSlugs: ["bridges", "dental-implants", "restorative-dentistry"],
  },
  bridges: {
    intro:
      "A dental bridge replaces one or more missing teeth by using adjacent teeth (or implants) as supports. A bridge is fixed — it is permanently cemented and does not need to be removed. It restores chewing function, prevents remaining teeth from drifting and maintains facial structure.",
    points: [
      "Three-unit and multi-unit fixed bridges",
      "All-ceramic and PFM bridge options",
      "Implant-supported bridges (no preparation of adjacent teeth)",
      "Maryland bonded bridges for conservative treatment",
      "Temporary bridges during fabrication",
    ],
    relatedSlugs: ["dental-implants", "crowns", "prosthodontics"],
  },
  dentures: {
    intro:
      "Dentures are removable replacements for missing teeth and surrounding gum tissue. At Smile Architects, complete dentures (for patients missing all teeth in an arch) and partial dentures (for patients with some remaining natural teeth) are provided. Implant-supported overdentures offer a more stable alternative.",
    points: [
      "Complete acrylic dentures for full tooth loss",
      "Partial dentures — acrylic and metal-based (cobalt chrome)",
      "Immediate dentures placed the same day as extractions",
      "Denture relines and repairs",
      "Implant-supported overdentures for greater stability",
    ],
    relatedSlugs: ["dental-implants", "prosthodontics", "bridges"],
  },
  veneers: {
    intro:
      "Dental veneers are thin shells of porcelain or composite resin bonded to the front surface of teeth to improve their colour, shape, size or length. Porcelain veneers are highly lifelike and stain-resistant. Composite veneers can often be completed in a single visit with minimal tooth preparation.",
    points: [
      "Porcelain (ceramic) veneers — lab-fabricated, highly aesthetic",
      "Direct composite veneers — single-visit, minimal preparation",
      "Suitable for discolouration, chips, gaps and minor misalignment",
      "Digital smile design mock-up before any tooth preparation",
      "No or minimal tooth reduction for direct composite veneers",
    ],
    doctorId: "dr-jeo-tom-charls",
    relatedSlugs: ["cosmetic-dentistry", "smile-design", "crowns"],
  },
};

export default async function TreatmentPage({ params }: Props) {
  const { slug } = await params;
  const treatment = TREATMENTS.find((t) => t.slug === slug);
  if (!treatment) notFound();

  const details = TREATMENT_DETAILS[slug] ?? {
    intro: treatment.shortDescription,
    points: [],
    relatedSlugs: [],
  };

  const performingDoctor = details.doctorId
    ? DOCTORS.find((d) => d.id === details.doctorId)
    : null;

  const relatedTreatments = (details.relatedSlugs ?? [])
    .map((s) => TREATMENTS.find((t) => t.slug === s))
    .filter(Boolean);

  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: treatment.title,
    description: details.intro,
    procedureType: "https://health-lifesci.schema.org/PsychiatricProcedure",
    bodyLocation: "Mouth",
    followup: `Book a consultation at Smile Architects, Pala — ${CLINIC.contact.phoneDisplay}`,
    recognizingAuthority: {
      "@type": "MedicalOrganization",
      name: "Smile Architects",
      url: CLINIC.seo.siteUrl,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Page header */}
      <div className="section-padding section-warm">
        <div className="container-xl">
          <RevealFade>
            <Breadcrumb
              items={[
                { label: "Treatments", href: "/treatments" },
                { label: treatment.title },
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
              }}
            >
              {treatment.title}
            </h1>
            <p style={{ color: "var(--color-olive)", fontSize: "1.0625rem", maxWidth: "560px", lineHeight: 1.65 }}>
              {treatment.shortDescription} — Smile Architects, Pala, Kottayam.
            </p>
          </RevealUp>
        </div>
      </div>

      {/* Main content */}
      <section className="section-padding section-white">
        <div className="container-xl">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "3rem", alignItems: "start" }}>
            {/* Left column */}
            <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
              {/* Overview */}
              <RevealUp>
                <div>
                  <div className="accent-line" />
                  <h2
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                      color: "var(--color-dark-moss)",
                      fontWeight: 400,
                      marginBottom: "1rem",
                    }}
                  >
                    {treatment.title} in Pala, Kottayam
                  </h2>
                  <p style={{ color: "var(--color-cafe-noir)", lineHeight: 1.75, fontSize: "1rem" }}>{details.intro}</p>
                </div>
              </RevealUp>

              {/* What's involved */}
              {details.points.length > 0 && (
                <RevealUp delay={0.05}>
                  <div>
                    <h2
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "1.5rem",
                        color: "var(--color-dark-moss)",
                        fontWeight: 400,
                        marginBottom: "1rem",
                      }}
                    >
                      What this includes
                    </h2>
                    <StaggerContainer stagger={0.06} style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                      {details.points.map((point) => (
                        <StaggerItem key={point}>
                          <div
                            style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", fontSize: "0.9375rem", color: "var(--color-cafe-noir)", fontFamily: "var(--font-sans)", lineHeight: 1.6 }}
                          >
                            <span style={{ color: "var(--color-jonquil)", marginTop: "0.1em", flexShrink: 0 }}>
                              <CheckIcon size="sm" />
                            </span>
                            {point}
                          </div>
                        </StaggerItem>
                      ))}
                    </StaggerContainer>
                  </div>
                </RevealUp>
              )}

              {/* Performing doctor */}
              {performingDoctor && (
                <RevealUp delay={0.05}>
                  <div>
                    <h2
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "1.5rem",
                        color: "var(--color-dark-moss)",
                        fontWeight: 400,
                        marginBottom: "1rem",
                      }}
                    >
                      Your specialist
                    </h2>
                    <Link
                      href={`/dentists/${performingDoctor.slug}`}
                      style={{ textDecoration: "none" }}
                      aria-label={`View profile of ${performingDoctor.name}`}
                    >
                      <div
                        className="card-light"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "1.25rem",
                        }}
                      >
                        <DoctorPhoto name={performingDoctor.name} photo={performingDoctor.photo} size="sm" />
                        <div style={{ flex: 1 }}>
                          <p style={{ fontFamily: "var(--font-serif)", fontSize: "1.0625rem", color: "var(--color-dark-moss)", marginBottom: "0.25rem" }}>
                            {performingDoctor.name}
                          </p>
                          <p className="credentials">
                            {performingDoctor.qualifications} — {performingDoctor.specialty}
                          </p>
                        </div>
                        <span style={{ color: "var(--color-olive)", fontFamily: "var(--font-sans)", flexShrink: 0, fontWeight: 600, display: "flex", alignItems: "center", gap: "0.25rem" }}>
                          View profile <ArrowRightIcon size="sm" />
                        </span>
                      </div>
                    </Link>
                  </div>
                </RevealUp>
              )}

              {/* Related treatments */}
              {relatedTreatments.length > 0 && (
                <div>
                  <h2
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "1.5rem",
                      color: "var(--color-dark-moss)",
                      fontWeight: 400,
                      marginBottom: "1rem",
                    }}
                  >
                    Related treatments
                  </h2>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "0.75rem" }}>
                    {relatedTreatments.map((t) =>
                      t ? (
                        <Link
                          key={t.id}
                          href={`/treatments/${t.slug}`}
                          style={{ textDecoration: "none" }}
                          aria-label={`Learn about ${t.title}`}
                        >
                          <div className="card-light" style={{ padding: "1rem 1.25rem" }}>
                            <p style={{ fontFamily: "var(--font-serif)", fontSize: "1rem", color: "var(--color-dark-moss)", marginBottom: "0.25rem" }}>
                              {t.title}
                            </p>
                            <p style={{ fontSize: "0.8125rem", color: "var(--color-olive)", fontFamily: "var(--font-sans)", fontWeight: 600 }}>
                              Learn more →
                            </p>
                          </div>
                        </Link>
                      ) : null
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Right column — sticky appointment form */}
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
                  <AppointmentForm
                    compact
                    surface="light"
                    heading={`Book for ${treatment.title}`}
                  />
                </div>
              </div>
            </RevealFade>
          </div>
        </div>
      </section>

      {/* Back to treatments + CTA */}
      <section
        style={{
          backgroundColor: "var(--color-dark-moss)",
          padding: "2.5rem 0",
        }}
      >
        <div
          className="container-xl"
          style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}
        >
          <Link href="/treatments" className="footer-link" style={{ fontWeight: 500 }}>
            ← All treatments
          </Link>
          <div style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap" }}>
            <Link href="/book-appointment" className="btn btn-secondary btn-sm">
              Book Appointment
            </Link>
            <a href={`tel:${CLINIC.contact.phone}`} className="btn btn-ghost-light btn-sm">
              {CLINIC.contact.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
