import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";
import { CLINIC } from "@/lib/site-config";
import Breadcrumb from "@/components/ui/Breadcrumb";

type Props = { params: Promise<{ slug: string }> };

// Guide content — each guide has a structured article
const GUIDES: Record<
  string,
  {
    title: string;
    category: string;
    readTime: string;
    metaDescription: string;
    sections: { heading: string; body: string }[];
    relatedTreatmentSlug?: string;
    relatedTreatmentLabel?: string;
  }
> = {
  "braces-what-to-expect": {
    title: "What to expect from braces treatment",
    category: "Orthodontics",
    readTime: "4 min read",
    metaDescription:
      "A clear guide to braces treatment at Smile Architects — from your first orthodontic assessment through to retainers and aftercare.",
    sections: [
      {
        heading: "Initial orthodontic assessment",
        body: "The first step is a detailed orthodontic consultation. Dr. Jeo Tom Charls will examine your teeth, take digital X-rays and, where required, orthodontic study models. He will assess your bite, jaw relationship, degree of crowding or spacing, and discuss the treatment options available to you — including fixed braces, lingual braces and clear aligners.",
      },
      {
        heading: "Treatment planning",
        body: "Once the assessment is complete, a personalised treatment plan is discussed. This outlines the type of appliance recommended, the estimated treatment duration, and the number and frequency of adjustment appointments. For some cases, extractions or other preparatory work may be needed first.",
      },
      {
        heading: "Fitting the braces",
        body: "The brace-fitting appointment typically takes 45–90 minutes. The teeth are cleaned and prepared, brackets are bonded to the tooth surfaces using dental adhesive, and the archwire is threaded through and secured. You may experience some soreness and sensitivity for a few days after fitting as teeth begin to move — this is normal and usually settles with over-the-counter pain relief.",
      },
      {
        heading: "Adjustment appointments",
        body: "Throughout treatment you will attend regular appointments, typically every 4–8 weeks, where the wire and elastic ties are changed to maintain the force moving your teeth. These appointments usually take 20–30 minutes. Progress X-rays may be taken at intervals.",
      },
      {
        heading: "Oral hygiene with braces",
        body: "Keeping your teeth and braces clean is critical during treatment. Food traps more easily around brackets and wires, increasing the risk of decay and white-spot lesions. Brushing after every meal, using interdental brushes and a fluoride mouthwash are all recommended. The team will provide detailed oral hygiene guidance at your fitting appointment.",
      },
      {
        heading: "Retainers and after treatment",
        body: "Once the braces are removed, retainers are fitted to hold the teeth in their new positions. Retainers are usually worn full-time for the first few months and then at night long-term. Teeth have a natural tendency to drift back, so consistent retainer wear is essential to maintain your result.",
      },
    ],
    relatedTreatmentSlug: "braces",
    relatedTreatmentLabel: "Dental Braces",
  },
  "clear-aligners-vs-braces": {
    title: "Clear aligners vs braces: which is right for you?",
    category: "Orthodontics",
    readTime: "5 min read",
    metaDescription:
      "A balanced comparison of clear aligner systems and fixed braces — covering aesthetics, comfort, cost and which cases each is best suited to.",
    sections: [
      {
        heading: "How they work",
        body: "Both fixed braces and clear aligners move teeth through sustained, controlled pressure — but in different ways. Braces use bonded brackets and an archwire that is progressively tightened at each appointment. Clear aligners use a series of custom-fitted transparent trays, each worn for one to two weeks before progressing to the next.",
      },
      {
        heading: "Appearance",
        body: "Clear aligners are virtually invisible when worn, which is their main aesthetic advantage. Ceramic (tooth-coloured) braces are more discreet than metal braces but still visible at close range. Lingual braces are bonded to the inner tooth surface and are completely hidden from the front — for patients who want fixed appliances without any visible hardware.",
      },
      {
        heading: "Clinical suitability",
        body: "Fixed braces can address a broader range of orthodontic problems — including complex bite corrections, rotations and significant crowding — more predictably than aligners. Clear aligners work well for mild to moderate cases and are particularly popular among adults with spacing or mild crowding. Not all cases are suitable for aligners; your orthodontist will advise based on your clinical needs.",
      },
      {
        heading: "Compliance and lifestyle",
        body: "Clear aligners must be worn 20–22 hours a day to be effective. They are removed for eating and cleaning, which many patients find convenient — but the outcome depends heavily on consistent wear. Fixed braces are non-removable, so compliance is built in.",
      },
      {
        heading: "Comfort",
        body: "Most patients experience some discomfort during the first few days after new trays or a brace adjustment as teeth begin to move. Aligners generally produce fewer episodes of sharp discomfort compared to metal braces. Lingual braces can initially affect speech and tongue comfort more than labial (outer) appliances.",
      },
      {
        heading: "Treatment duration",
        body: "Both systems typically take 12–24 months for moderate cases, though simple cases can be shorter. Complex cases are more predictably managed with fixed braces. Your orthodontist will provide an estimated treatment duration after examining your case.",
      },
      {
        heading: "Making the decision",
        body: "The best appliance is the one that is clinically appropriate for your teeth and fits your lifestyle. At Smile Architects, Dr. Jeo Tom Charls will assess your case and present the options available to you — without pushing one system over another. A full range of fixed, lingual and clear aligner options are available.",
      },
    ],
    relatedTreatmentSlug: "orthodontics",
    relatedTreatmentLabel: "Orthodontics",
  },
  "lingual-braces-guide": {
    title: "Lingual braces (hidden braces): a patient guide",
    category: "Orthodontics",
    readTime: "4 min read",
    metaDescription:
      "How lingual braces work, what the treatment experience is like, and who they are suitable for — a patient guide from Smile Architects, Pala.",
    sections: [
      {
        heading: "What are lingual braces?",
        body: "Lingual braces are orthodontic brackets bonded to the inner (tongue-side, or lingual) surfaces of the teeth. Because they are hidden behind the teeth, they are completely invisible from the front and sides — even when you open your mouth. They are the only truly hidden fixed orthodontic appliance.",
      },
      {
        heading: "How they work",
        body: "Lingual brackets work on the same mechanical principle as conventional braces — brackets bonded to the teeth, an archwire threaded through, and progressive force moving the teeth to the desired position. The difference is only in where they are placed.",
      },
      {
        heading: "Specialist training",
        body: "Lingual orthodontics requires additional clinical training — the anatomy and working conditions are significantly different from labial (outer) braces. Dr. Jeo Tom Charls has completed dedicated lingual orthodontics training as well as CAD/CAM lingual bracket training, qualifying him to provide this treatment at Smile Architects.",
      },
      {
        heading: "Speech adaptation",
        body: "Most patients experience some change in speech — particularly the 's' and 't' sounds — for the first one to two weeks of treatment. This is because the tongue needs to adapt to the presence of brackets on the inner tooth surfaces. The vast majority of patients adapt fully within a few weeks.",
      },
      {
        heading: "Oral hygiene",
        body: "Cleaning lingual braces requires careful technique. An angled toothbrush, interdental brushes and floss threaders or a water flosser are recommended. The team at Smile Architects will provide detailed oral hygiene instruction at your fitting appointment.",
      },
      {
        heading: "Who is a candidate?",
        body: "Lingual braces can treat most of the same cases as conventional braces. They are particularly popular with adults in professional or public-facing roles who want effective fixed treatment without visible hardware. A full clinical assessment by Dr. Jeo Tom Charls will determine if lingual braces are appropriate for your case.",
      },
    ],
    relatedTreatmentSlug: "lingual-braces",
    relatedTreatmentLabel: "Lingual Braces",
  },
  "dental-implants-guide": {
    title: "Dental implants: your questions answered",
    category: "Implants",
    readTime: "6 min read",
    metaDescription:
      "A comprehensive patient guide to dental implants at Smile Architects, Pala — covering the procedure, healing time, candidacy, costs and long-term care.",
    sections: [
      {
        heading: "What is a dental implant?",
        body: "A dental implant is a small titanium post that is surgically placed into the jawbone to act as an artificial tooth root. Once the implant has bonded with the bone (a process called osseointegration, which takes several months), a custom crown, bridge or denture is attached to it. The result is a fixed, stable restoration that looks and functions like a natural tooth.",
      },
      {
        heading: "Am I a suitable candidate?",
        body: "Good candidates for implants have healthy gums, sufficient jawbone volume to support the implant, and no uncontrolled systemic conditions that would impair healing. Smoking significantly increases the risk of implant failure. If bone volume is insufficient, bone grafting may be possible before implant placement. A thorough assessment at Smile Architects will determine your suitability.",
      },
      {
        heading: "The procedure step by step",
        body: "The process typically involves: (1) Initial assessment and treatment planning, including X-rays or cone-beam CT imaging. (2) Surgical placement of the implant post under local anaesthetic — most patients find this no more uncomfortable than a tooth extraction. (3) A healing period of 3–6 months for the implant to integrate with the bone. (4) Placement of the abutment (connector). (5) Fitting of the permanent crown or restoration.",
      },
      {
        heading: "Healing and aftercare",
        body: "Some swelling and soreness in the days after implant surgery is normal. Over-the-counter pain relief is usually sufficient. Soft food is advised for the first week. Strict oral hygiene around the implant site is important during healing, and the team will provide specific aftercare guidance.",
      },
      {
        heading: "How long do implants last?",
        body: "With proper care — regular brushing, flossing, and professional dental check-ups — dental implants can last many decades. Studies show high long-term survival rates. The crown on top may need replacing after 10–15 years due to normal wear.",
      },
      {
        heading: "Costs",
        body: "Implant costs vary depending on the number of implants, the type of restoration needed, and whether any preparatory procedures are required. At Smile Architects, a detailed treatment plan with costs will be provided at your consultation before any commitment is required.",
      },
    ],
    relatedTreatmentSlug: "dental-implants",
    relatedTreatmentLabel: "Dental Implants",
  },
  "root-canal-myths": {
    title: "Root canal treatment: separating fact from fiction",
    category: "General Dentistry",
    readTime: "3 min read",
    metaDescription:
      "Root canal treatment has an unfair reputation. We address the most common patient concerns and explain what modern endodontic treatment actually involves.",
    sections: [
      {
        heading: "\"Root canal treatment is very painful\"",
        body: "This is the most common misconception. Root canal treatment is performed under local anaesthetic, so the procedure itself should be no more painful than a filling. Any pre-existing pain from the infection is what patients often associate with the treatment — not the treatment itself. Mild soreness after the procedure is normal and typically settles within a few days.",
      },
      {
        heading: "\"It is better to just extract the tooth\"",
        body: "Preserving a natural tooth is almost always preferable to extraction if it can be saved. Natural teeth function better than any replacement, and losing a tooth has consequences: the remaining teeth may shift, chewing efficiency may be reduced, and replacing the missing tooth with a bridge or implant is more complex and expensive than treating it.",
      },
      {
        heading: "\"Root canal treatment takes many visits\"",
        body: "Many root canal treatments can be completed in one or two visits. More complex cases — involving multiple root canals or severe infection — may require additional appointments. Your dentist will give you a realistic estimate after examining your tooth.",
      },
      {
        heading: "\"The tooth will need extracting eventually anyway\"",
        body: "A well-performed root canal treatment, followed by an appropriate restoration (usually a crown), can allow a tooth to function for many years or even a lifetime. Regular dental check-ups allow the treated tooth to be monitored.",
      },
      {
        heading: "What to expect",
        body: "After local anaesthetic is administered, the dentist removes the infected pulp tissue from inside the tooth, cleans and shapes the root canals, and seals them. The tooth is then restored — typically with a post and core build-up followed by a crown. You can drive yourself home after treatment.",
      },
    ],
    relatedTreatmentSlug: "root-canal-treatment",
    relatedTreatmentLabel: "Root Canal Treatment",
  },
  "childrens-dental-health": {
    title: "Children's dental health: a parent's guide",
    category: "Paediatric Dentistry",
    readTime: "5 min read",
    metaDescription:
      "When to take your child to the dentist, how to manage milk teeth and decay, and what to watch for as permanent teeth come through — a guide from Smile Architects.",
    sections: [
      {
        heading: "When should my child first visit the dentist?",
        body: "The first dental visit should happen around the time the first tooth appears — typically at 6–12 months. Early visits help children become familiar with the dental environment, allow early detection of any issues, and give parents guidance on feeding, teething and oral hygiene.",
      },
      {
        heading: "Milk teeth matter",
        body: "Primary (milk) teeth are not 'just temporary'. They maintain the space for permanent teeth, help with speech development, and allow normal chewing. Decay in milk teeth can be painful, can spread, and can affect the developing permanent teeth beneath. Treating and preserving milk teeth is important.",
      },
      {
        heading: "Preventing tooth decay in children",
        body: "Limit sugary snacks and drinks to mealtimes. Brush teeth twice daily with a fluoride toothpaste — a smear for children under 3, a pea-sized amount from age 3. Children need help and supervision with brushing until they are around 7–8 years old. Fissure sealants on permanent back teeth can significantly reduce the risk of decay.",
      },
      {
        heading: "Orthodontic assessment",
        body: "From around age 7–8, the mix of milk and permanent teeth allows an orthodontist to identify emerging bite problems. Early assessment does not always mean early treatment — but it allows the clinician to monitor development and intervene at the optimal time if needed.",
      },
      {
        heading: "Dental anxiety in children",
        body: "Children who have positive early dental experiences are less likely to develop dental anxiety later in life. The Smile Architects team takes time to explain procedures in child-friendly terms, build rapport, and ensure visits are as calm and comfortable as possible.",
      },
    ],
    relatedTreatmentSlug: "pediatric-dentistry",
    relatedTreatmentLabel: "Paediatric Dentistry",
  },
  "smile-design-guide": {
    title: "Smile design: what is it and who is it for?",
    category: "Cosmetic Dentistry",
    readTime: "4 min read",
    metaDescription:
      "A guide to Digital Smile Design at Smile Architects — how the process works, what treatments it can include, and who it is suitable for.",
    sections: [
      {
        heading: "What is Digital Smile Design?",
        body: "Digital Smile Design (DSD) is a clinical and communication tool that uses photographs, measurements and digital design software to create a preview of your new smile. The final design is agreed upon with you before any treatment begins — so there are no surprises.",
      },
      {
        heading: "Who is it for?",
        body: "Smile design is suitable for anyone who wants to improve the appearance of their smile in a comprehensive, coordinated way. It is particularly valuable for patients considering multiple treatments — for example, combining orthodontics with veneers or teeth whitening — or for those who want to see a realistic preview before committing.",
      },
      {
        heading: "What treatments can be included?",
        body: "A smile design plan can incorporate orthodontics (braces or aligners) to correct alignment, tooth-coloured restorations or veneers to improve shape and colour, teeth whitening, gum contouring, dental implants for missing teeth, and crown or bridge work. The combination is tailored to your goals and clinical needs.",
      },
      {
        heading: "The process",
        body: "The smile design process starts with a detailed consultation, including clinical examination and high-quality photographs. Dr. Jeo Tom Charls creates a digital design that maps tooth proportions, midline, gum line and overall aesthetics. A wax mock-up or digital preview is shared with you. Once agreed, treatment begins — with the design serving as a blueprint throughout.",
      },
      {
        heading: "Is it worth it?",
        body: "For patients planning significant smile changes, a smile design consultation saves time and prevents misaligned expectations. Seeing a realistic preview before treatment begins gives confidence, helps clarify goals, and results in a more predictable outcome.",
      },
    ],
    relatedTreatmentSlug: "smile-design",
    relatedTreatmentLabel: "Smile Design",
  },
  "oral-hygiene-tips": {
    title: "Oral hygiene: the basics that make a real difference",
    category: "General Dentistry",
    readTime: "3 min read",
    metaDescription:
      "Simple, evidence-based oral hygiene guidance from Smile Architects — brushing technique, flossing, diet and why regular dental check-ups matter.",
    sections: [
      {
        heading: "Brushing",
        body: "Brush for two minutes, twice a day — last thing at night and at one other time. Use a fluoride toothpaste (at least 1350–1500ppm fluoride for adults). A soft to medium manual or electric toothbrush works well; electric brushes may be more effective for those with limited dexterity. Do not rinse with water immediately after brushing — spit but do not rinse, to allow the fluoride to remain in contact with teeth.",
      },
      {
        heading: "Cleaning between teeth",
        body: "Brushing alone does not clean between teeth, where most decay and gum disease starts. Interdental brushes (small bottle-brush-like tools sized for your gaps) are the most effective option for most people. Dental floss is the alternative for very tight contacts. Aim to clean between all teeth once a day.",
      },
      {
        heading: "Diet and frequency",
        body: "It is not just how much sugar you consume — it is how often. Every time you eat or drink something sugary or acidic, your teeth are under attack for up to an hour. Limiting sugar and acid to mealtimes gives teeth recovery time. Drink water or plain milk between meals. Chewing sugar-free gum after meals can help neutralise acid.",
      },
      {
        heading: "Regular dental check-ups",
        body: "Routine dental check-ups allow early detection of decay, gum disease and other issues before they become more complex. How often you need to attend depends on your individual risk — your dentist will advise. Professional cleaning (scaling and polishing) removes calculus (hardened plaque) that cannot be removed by brushing alone.",
      },
      {
        heading: "Fluoride",
        body: "Fluoride strengthens enamel and makes teeth more resistant to decay. It is present in most toothpastes at effective concentrations. Additional fluoride — in the form of a mouthwash or higher-concentration toothpaste — may be recommended for patients at higher risk of decay.",
      },
    ],
    relatedTreatmentSlug: "general-dentistry",
    relatedTreatmentLabel: "General Dentistry",
  },
};

export async function generateStaticParams() {
  return Object.keys(GUIDES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = GUIDES[slug];
  if (!guide) return {};
  return buildMetadata({
    title: guide.title,
    description: guide.metaDescription,
    canonical: `/dental-guides/${slug}`,
    type: "article",
  });
}

export default async function DentalGuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = GUIDES[slug];
  if (!guide) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.metaDescription,
    // Date fields — use actual publish/review dates if available
    // [CLINIC TO VERIFY: Set actual publication and review dates for each guide]
    datePublished: "2024-01-01",
    dateModified: new Date().toISOString().split("T")[0],
    author: {
      "@type": "Organization",
      name: "Smile Architects",
      url: CLINIC.seo.siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Smile Architects",
      url: CLINIC.seo.siteUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${CLINIC.seo.siteUrl}/dental-guides/${slug}`,
    },
    about: {
      "@type": "MedicalOrganization",
      name: CLINIC.name,
      address: {
        "@type": "PostalAddress",
        addressLocality: CLINIC.address.city,
        addressRegion: CLINIC.address.state,
        addressCountry: "IN",
      },
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      {/* Header */}
      <div className="section-padding section-warm">
        <div className="container-xl" style={{ maxWidth: "860px" }}>
          <Breadcrumb
            items={[
              { label: "Dental Guides", href: "/dental-guides" },
              { label: guide.title },
            ]}
          />
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginTop: "1.5rem", marginBottom: "1rem" }}>
            <span className="tag-olive">
              {guide.category}
            </span>
            <span style={{ fontSize: "0.8125rem", color: "var(--color-olive)", fontFamily: "var(--font-sans)" }}>
              {guide.readTime}
            </span>
          </div>
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.875rem, 4vw, 2.75rem)",
              color: "var(--color-dark-moss)",
              fontWeight: 400,
              lineHeight: 1.1,
            }}
          >
            {guide.title}
          </h1>
          <p style={{ color: "var(--color-olive)", fontSize: "0.875rem", marginTop: "1rem", fontFamily: "var(--font-sans)" }}>
            Published by the Smile Architects team · Pala, Kottayam, Kerala
          </p>
        </div>
      </div>

      {/* Article body */}
      <section className="section-padding section-white">
        <div className="container-xl" style={{ maxWidth: "860px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: "3rem", alignItems: "start" }}>
            {/* Article sections */}
            <article>
              {guide.sections.map((section, i) => (
                <div key={i} style={{ marginBottom: "2rem" }}>
                  <h2
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "1.375rem",
                      color: "var(--color-dark-moss)",
                      fontWeight: 400,
                      marginBottom: "0.75rem",
                    }}
                  >
                    {section.heading}
                  </h2>
                  <p style={{ color: "var(--color-dark-moss)", lineHeight: 1.75, fontSize: "0.9375rem", opacity: 0.9 }}>{section.body}</p>
                </div>
              ))}

              {/* Disclaimer */}
              <div className="card-warm" style={{ marginTop: "2.5rem" }}>
                <p style={{ fontSize: "0.8125rem", color: "var(--color-olive)", lineHeight: 1.6, fontFamily: "var(--font-sans)" }}>
                  <strong style={{ color: "var(--color-dark-moss)" }}>Note:</strong> This guide is for general
                  informational purposes and does not constitute dental advice. Individual clinical
                  needs vary. Please consult the team at Smile Architects — or your own dental
                  professional — for advice specific to your situation.
                </p>
              </div>
            </article>

            {/* Sidebar */}
            <aside style={{ position: "sticky", top: "100px", display: "flex", flexDirection: "column", gap: "1rem" }}>
              {/* Related treatment */}
              {guide.relatedTreatmentSlug && (
                <div className="card-light">
                  <p style={{ fontSize: "0.75rem", color: "var(--color-olive)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "var(--font-sans)", marginBottom: "0.75rem" }}>
                    Related treatment
                  </p>
                  <Link
                    href={`/treatments/${guide.relatedTreatmentSlug}`}
                    style={{ fontSize: "1rem", color: "var(--color-dark-moss)", fontFamily: "var(--font-serif)", display: "block", marginBottom: "0.75rem" }}
                  >
                    {guide.relatedTreatmentLabel}
                  </Link>
                  <Link
                    href={`/treatments/${guide.relatedTreatmentSlug}`}
                    className="btn btn-secondary btn-sm"
                    style={{ width: "100%", justifyContent: "center" }}
                  >
                    Treatment details →
                  </Link>
                </div>
              )}

              {/* Book CTA */}
              <div className="card-dark">
                <p style={{ fontFamily: "var(--font-serif)", fontSize: "1.125rem", color: "var(--color-honeydew)" }}>
                  Ready to discuss your treatment?
                </p>
                <Link href="/book-appointment" className="btn btn-secondary btn-sm" style={{ justifyContent: "center", marginTop: "1rem" }}>
                  Book Appointment
                </Link>
                <a href={`tel:${CLINIC.contact.phone}`} className="btn btn-ghost-light btn-sm" style={{ justifyContent: "center", marginTop: "0.5rem" }}>
                  {CLINIC.contact.phoneDisplay}
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Back to guides */}
      <div className="section-light" style={{ padding: "2rem 0" }}>
        <div className="container-xl">
          <Link href="/dental-guides" style={{ fontSize: "0.875rem", color: "var(--color-olive)", fontFamily: "var(--font-sans)" }}>
            ← All dental guides
          </Link>
        </div>
      </div>
    </>
  );
}
