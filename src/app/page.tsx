import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";
import { CLINIC, TREATMENTS, DOCTORS, FAQS_GENERAL, FACILITIES } from "@/lib/site-config";
import AppointmentForm from "@/components/ui/AppointmentForm";
import TrackedLink from "@/components/ui/TrackedLink";
import FeatureMarquee from "@/components/ui/FeatureMarquee";
import DoctorPhoto from "@/components/ui/DoctorPhoto";
import {
  TreatmentIconFor, CheckIcon, ArrowRightIcon,
  XRayIcon, ClinicIcon, SmileDesignIcon, CareIcon,
  ClockIcon, PhoneIcon,
} from "@/components/ui/icons";
import PremiumFAQ from "@/components/ui/PremiumFAQ";
import {
  RevealUp,
  RevealFade,
  StaggerReveal,
  StaggerContainer,
  StaggerItem,
  HoverScale,
  ImageReveal,
} from "@/components/motion/REVOLQComponents";

export const metadata: Metadata = buildMetadata({
  title: "Dentist in Pala, Kottayam District | Smile Architects",
  description:
    "Smile Architects — Multispeciality Dental Clinic & Advanced Orthodontic Centre in Pala, Kottayam District, Kerala. MDS Orthodontist, dental implants, lingual braces, smile design and more. Call +91 9446 999 333.",
  canonical: "/",
});

const FEATURED_TREATMENTS = TREATMENTS.filter((t) => t.featured);

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS_GENERAL.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── HERO WITH VIDEO BACKGROUND ────────────────────────── */}
      <section
        aria-labelledby="hero-heading"
        style={{
          position: "relative",
          minHeight: "100dvh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
        className="hero-section"
      >
        {/* ── Full-bleed video ── */}
        <video
          autoPlay loop muted playsInline preload="auto"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}
          aria-hidden="true"
        >
          <source src="/images/hero video.mp4" type="video/mp4" />
        </video>

        {/* ── Left-side gradient scrim — keeps text legible without killing the video ── */}
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0, zIndex: 1,
          background: "linear-gradient(105deg, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.42) 45%, rgba(0,0,0,0.08) 75%, transparent 100%)",
        }} />
        {/* Bottom fade */}
        <div aria-hidden="true" style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "220px", zIndex: 1,
          background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)",
        }} />

        {/* ── Content layer ── */}
        <div className="container-xl hero-container" style={{ position: "relative", zIndex: 2, width: "100%", paddingTop: "120px", paddingBottom: "80px" }}>
          <div className="hero-layout">

            {/* ── LEFT: Editorial text + feature cards ── */}
            <div className="hero-left">

              {/* Eyebrow */}
              <RevealUp delay={0.05}>
                <p className="hero-eyebrow">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ display: "inline", marginRight: "6px", verticalAlign: "middle" }}>
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="rgba(255,255,255,0.7)" />
                  </svg>
                  Pala, Kottayam, Kerala
                </p>
              </RevealUp>

              {/* Headline */}
              <RevealUp delay={0.15}>
                <h1 id="hero-heading" className="hero-title">
                  <span className="hero-title-white">Advanced Dental<br />Care &amp;</span>
                  <br />
                  <span className="hero-title-gold">Smile Design</span>
                </h1>
              </RevealUp>

              {/* Description */}
              <RevealUp delay={0.25}>
                <p className="hero-desc">
                  Multispeciality dental clinic &amp; advanced orthodontics led by{" "}
                  <span style={{ color: "var(--color-jonquil)", fontWeight: 500 }}>Dr. Jeo Tom Charls</span>, MDS.
                </p>
              </RevealUp>

              {/* CTAs */}
              <RevealUp delay={0.35}>
                <div className="hero-cta-row">
                  <Link href="/treatments" className="hero-btn-primary">Explore Treatments</Link>
                  <Link href="/book-appointment" className="hero-btn-ghost">Book an Appointment →</Link>
                </div>
              </RevealUp>

              {/* Four feature cards */}
              <RevealUp delay={0.5}>
                <div className="hero-feature-cards">
                  {[
                    { icon: <XRayIcon size={22} />,        label: "Advanced\nTechnology" },
                    { icon: <ClinicIcon size={22} />,      label: "Multispeciality\nCare" },
                    { icon: <SmileDesignIcon size={22} />, label: "Smile Design\nExperts" },
                    { icon: <CareIcon size={22} />,        label: "Patient First\nApproach" },
                  ].map(({ icon, label }) => (
                    <div key={label} className="hero-feature-card">
                      <span className="hero-feature-icon">{icon}</span>
                      <span className="hero-feature-label">{label.split("\n").map((l, i) => (
                        <span key={i} style={{ display: "block" }}>{l}</span>
                      ))}</span>
                    </div>
                  ))}
                </div>
              </RevealUp>
            </div>

            {/* ── RIGHT: Floating clinic card ── */}
            <RevealUp delay={0.4} className="hero-clinic-card-wrap">
              <div className="hero-clinic-card">
                {/* Header */}
                <div className="clinic-card-header">
                  <ClockIcon size={16} color="var(--color-olive)" />
                  <span className="clinic-card-eyebrow">Clinic Hours</span>
                </div>

                {/* Hours */}
                <div className="clinic-card-hours">
                  <p className="clinic-day">Mon – Sat</p>
                  <p className="clinic-time">9:30 AM – 8:00 PM</p>
                </div>

                <hr className="clinic-card-divider" />

                {/* Features */}
                <ul className="clinic-card-features">
                  {["Experienced Specialists", "Modern Infrastructure", "Personalized Care"].map((item) => (
                    <li key={item} className="clinic-card-feature-item">
                      <span className="clinic-check-icon"><CheckIcon size={15} color="var(--color-dark-moss)" /></span>
                      {item}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a href={`tel:${CLINIC.contact.phone}`} className="clinic-call-btn">
                  <PhoneIcon size={16} />
                  Tap to Call
                </a>
              </div>
            </RevealUp>

          </div>
        </div>

        {/* ── Styles ── */}
        <style>{`
          /* ── Layout ── */
          .hero-layout {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 2rem;
            width: 100%;
          }
          .hero-left {
            flex: 1;
            max-width: 580px;
          }

          /* ── Eyebrow ── */
          .hero-eyebrow {
            font-size: 0.75rem;
            letter-spacing: 0.16em;
            text-transform: uppercase;
            color: rgba(255,255,255,0.72);
            font-weight: 600;
            font-family: var(--font-utility);
            margin-bottom: 1.25rem;
          }

          /* ── Headline ── */
          .hero-title {
            font-family: var(--font-serif);
            font-size: clamp(2.75rem, 5.5vw, 5rem);
            font-weight: 400;
            line-height: 1.08;
            letter-spacing: -0.03em;
            margin-bottom: 1.375rem;
          }
          .hero-title-white { color: #ffffff; }
          .hero-title-gold  { color: var(--color-jonquil); }

          /* ── Description ── */
          .hero-desc {
            font-size: clamp(0.9375rem, 1.6vw, 1.0625rem);
            color: rgba(255,255,255,0.88);
            line-height: 1.7;
            font-family: var(--font-sans);
            font-weight: 300;
            max-width: 460px;
            margin-bottom: 2rem;
          }

          /* ── CTAs ── */
          .hero-cta-row {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 1rem 1.5rem;
            margin-bottom: 2.5rem;
          }
          .hero-btn-primary {
            display: inline-flex;
            align-items: center;
            padding: 14px 32px;
            background: var(--color-jonquil);
            color: var(--color-dark-moss);
            border-radius: 9999px;
            font-size: 0.9375rem;
            font-weight: 700;
            font-family: var(--font-sans);
            text-decoration: none;
            box-shadow: 0 6px 20px rgba(234,200,0,0.28);
            transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
            min-height: 48px;
            letter-spacing: 0.01em;
          }
          .hero-btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 28px rgba(234,200,0,0.38);
          }
          .hero-btn-ghost {
            color: rgba(255,255,255,0.88);
            font-size: 0.9375rem;
            font-family: var(--font-sans);
            font-weight: 500;
            text-decoration: none;
            border-bottom: 1px solid rgba(255,255,255,0.35);
            padding-bottom: 2px;
            transition: all 0.25s ease;
          }
          .hero-btn-ghost:hover {
            color: #fff;
            border-bottom-color: rgba(255,255,255,0.75);
          }

          /* ── Feature Cards ── */
          .hero-feature-cards {
            display: flex;
            gap: 0.75rem;
            flex-wrap: wrap;
          }
          .hero-feature-card {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 0.5rem;
            padding: 0.875rem 1rem;
            background: rgba(255,255,255,0.12);
            border: 1px solid rgba(255,255,255,0.22);
            backdrop-filter: blur(12px) saturate(120%);
            -webkit-backdrop-filter: blur(12px) saturate(120%);
            border-radius: 16px;
            min-width: 90px;
            flex: 1;
            transition: background 0.25s ease, transform 0.25s ease;
          }
          .hero-feature-card:hover {
            background: rgba(255,255,255,0.2);
            transform: translateY(-2px);
          }
          .hero-feature-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            background: rgba(255,255,255,0.18);
            border-radius: 10px;
            color: #ffffff;
          }
          .hero-feature-label {
            font-size: 0.75rem;
            color: rgba(255,255,255,0.9);
            font-family: var(--font-sans);
            font-weight: 500;
            line-height: 1.3;
          }

          /* ── Clinic Card ── */
          .hero-clinic-card-wrap {
            flex-shrink: 0;
            width: 300px;
          }
          .hero-clinic-card {
            background: rgba(255,255,255,0.97);
            backdrop-filter: blur(32px) saturate(140%);
            -webkit-backdrop-filter: blur(32px) saturate(140%);
            border-radius: 28px;
            padding: 2rem;
            box-shadow: 0 20px 60px rgba(0,0,0,0.15), 0 4px 16px rgba(0,0,0,0.08);
            border: 1px solid rgba(255,255,255,0.6);
          }
          .clinic-card-header {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 1.25rem;
          }
          .clinic-card-eyebrow {
            font-size: 0.6875rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: var(--color-olive);
            font-family: var(--font-utility);
          }
          .clinic-card-hours {
            margin-bottom: 1.5rem;
          }
          .clinic-day {
            font-size: 1.375rem;
            font-weight: 700;
            color: var(--color-dark-moss);
            font-family: var(--font-sans);
            margin-bottom: 0.25rem;
          }
          .clinic-time {
            font-size: 1rem;
            color: var(--color-olive);
            font-family: var(--font-sans);
            font-weight: 400;
          }
          .clinic-card-divider {
            border: none;
            border-top: 1px solid rgba(0,0,0,0.08);
            margin: 0 0 1.25rem 0;
          }
          .clinic-card-features {
            list-style: none;
            padding: 0;
            margin: 0 0 1.5rem 0;
            display: flex;
            flex-direction: column;
            gap: 0.625rem;
          }
          .clinic-card-feature-item {
            display: flex;
            align-items: center;
            gap: 0.625rem;
            font-size: 0.9rem;
            color: var(--color-dark-moss);
            font-family: var(--font-sans);
            font-weight: 500;
          }
          .clinic-check-icon {
            flex-shrink: 0;
            display: flex;
          }
          .clinic-call-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            width: 100%;
            padding: 1rem;
            background: var(--color-dark-moss);
            color: white;
            border-radius: 14px;
            text-decoration: none;
            font-family: var(--font-sans);
            font-weight: 700;
            font-size: 1rem;
            transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
            box-shadow: 0 4px 14px rgba(37,78,6,0.25);
          }
          .clinic-call-btn:hover {
            background: var(--color-olive);
            transform: translateY(-2px);
            box-shadow: 0 8px 22px rgba(37,78,6,0.35);
          }

          /* ── Responsive ── */
          @media (max-width: 1023px) {
            .hero-clinic-card-wrap { display: none; }
            .hero-layout { flex-direction: column; align-items: flex-start; }
          }

          @media (max-width: 768px) {
            .hero-container {
              padding-top: 90px !important;
              padding-bottom: 100px !important;
            }
            .hero-feature-cards {
              gap: 0.5rem;
            }
            .hero-feature-card {
              min-width: 75px;
              padding: 0.75rem 0.625rem;
            }
            .hero-feature-label { font-size: 0.6875rem; }
          }

          @media (max-width: 480px) {
            .hero-feature-cards { gap: 0.4rem; }
            .hero-cta-row { flex-direction: column; align-items: flex-start; }
          }

          /* ── Reduced motion ── */
          @media (prefers-reduced-motion: reduce) {
            video { display: none; }
          }
        `}</style>
      </section>

      {/* ── ANIMATED MARQUEE STRIP ─────────────────────────────── */}
      <FeatureMarquee
        items={[
          "Multispeciality Dental Clinic",
          "Advanced Orthodontic Centre",
          "MDS Orthodontist",
          "Digital X-Ray",
          "Individual Treatment Rooms",
          "Near Federal Bank, Pala",
          "Clear Aligners",
          "Dental Implants",
          "Lingual Braces",
        ]}
      />

      {/* ── TREATMENTS ─────────────────────────────────────────── */}
      <section aria-labelledby="treatments-heading" className="section-padding section-light">
        <div className="container-xl">

          <div className="section-header">
            <div className="accent-line" />
            <StaggerReveal type="eyebrow">
              <p className="eyebrow">Our Services</p>
            </StaggerReveal>
            <StaggerReveal type="heading">
              <h2 id="treatments-heading" className="section-title">
                Dental treatments in Pala
              </h2>
            </StaggerReveal>
            <StaggerReveal type="body">
              <p className="section-body">
                From routine check-ups to advanced orthodontic treatment and dental implants —
                all under one roof in Pala, Kottayam.
              </p>
            </StaggerReveal>
          </div>

          <StaggerContainer
            stagger={0.07}
            className="treatments-grid"
          >
            {FEATURED_TREATMENTS.map((t) => (
              <StaggerItem key={t.id}>
                <Link
                  href={`/treatments/${t.slug}`}
                  className="treatment-card-link"
                  aria-label={`Learn about ${t.title}`}
                >
                  <div className="card-treatment">
                    {/* Icon — only shown if there's a semantic match for the slug */}
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
              </StaggerItem>
            ))}
          </StaggerContainer>

          <StaggerReveal type="cta">
            <div style={{ textAlign: "center", marginTop: "3rem" }}>
              <Link href="/treatments" className="btn btn-accent btn-lg">
                View all treatments
              </Link>
            </div>
          </StaggerReveal>
        </div>
      </section>

      {/* ── ORTHODONTICS FEATURE ───────────────────────────────── */}
      <section aria-labelledby="orthodontics-heading" className="section-padding section-warm">
        <div className="container-xl">
          <div className="feature-split">

            <RevealUp delay={0.05} className="feature-split-text">
              <div className="accent-line" />
              <StaggerReveal type="eyebrow">
                <p className="eyebrow">Orthodontics & Advanced Braces</p>
              </StaggerReveal>
              <StaggerReveal type="heading">
                <h2 id="orthodontics-heading" className="section-title">
                  Braces and aligner treatment in Pala
                </h2>
              </StaggerReveal>
              <StaggerReveal type="body">
                <p className="section-body">
                  Dr. Jeo Tom Charls — MDS Orthodontics and Dentofacial Orthopaedics —
                  specialises in the full range of orthodontic treatments. Braces, aligners,
                  and growth modification, planned with clinical precision.
                </p>
              </StaggerReveal>
              <StaggerReveal type="content">
                <ul className="check-list">
                  {[
                    "Metal and ceramic braces",
                    "Damon / self-ligating systems",
                    "Lingual braces (hidden braces)",
                    "Clear aligners",
                    "Surgical orthodontics",
                    "Growth modification for children",
                  ].map((item) => (
                    <li key={item} className="check-item">
                      <span style={{ color: "var(--color-jonquil)", flexShrink: 0, display: "flex" }}><CheckIcon size="sm" /></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </StaggerReveal>
              <StaggerReveal type="cta">
                <div className="btn-group">
                  <Link href="/orthodontics" className="btn btn-primary">
                    Orthodontic treatments
                  </Link>
                  <Link href="/dentists/dr-jeo-tom-charls" className="btn btn-ghost">
                    Dr. Jeo Tom Charls
                  </Link>
                </div>
              </StaggerReveal>
            </RevealUp>

            <ImageReveal delay={0.2} className="feature-split-image">
              <div className="feature-image-frame" aria-label="Orthodontic treatment at Smile Architects, Pala">
                <div className="feature-image-inner">
                  <div className="feature-image-badge">MDS Orthodontics</div>
                  <div className="feature-image-icon">
                    <svg width="72" height="72" viewBox="0 0 24 24" fill="none">
                      <rect x="4" y="8" width="16" height="8" rx="2" stroke="var(--color-dark-moss)" strokeWidth="1.5" fill="var(--color-tea-green)" />
                      <line x1="7" y1="8" x2="7" y2="16" stroke="var(--color-dark-moss)" strokeWidth="1.5"/>
                      <line x1="12" y1="8" x2="12" y2="16" stroke="var(--color-dark-moss)" strokeWidth="1.5"/>
                      <line x1="17" y1="8" x2="17" y2="16" stroke="var(--color-dark-moss)" strokeWidth="1.5"/>
                      <circle cx="7" cy="12" r="1.5" fill="var(--color-jonquil)"/>
                      <circle cx="12" cy="12" r="1.5" fill="var(--color-jonquil)"/>
                      <circle cx="17" cy="12" r="1.5" fill="var(--color-jonquil)"/>
                    </svg>
                  </div>
                  <p className="feature-image-label">Orthodontics at Smile Architects</p>
                  <p className="feature-image-sub">Dr. Jeo Tom Charls, MDS<br />Pala, Kottayam</p>
                </div>
                <div className="feature-image-glow" aria-hidden="true" />
              </div>
            </ImageReveal>

          </div>
        </div>
      </section>

      {/* ── DOCTORS ────────────────────────────────────────────── */}
      <section aria-labelledby="doctors-heading" className="section-padding section-white">
        <div className="container-xl">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div className="accent-line" style={{ margin: "0 auto 1.5rem" }} />
            <StaggerReveal type="eyebrow">
              <p className="eyebrow">Our Team</p>
            </StaggerReveal>
            <StaggerReveal type="heading">
              <h2 id="doctors-heading" className="section-title" style={{ maxWidth: "520px", margin: "0 auto" }}>
                Meet the dentists
              </h2>
            </StaggerReveal>
          </div>

          <StaggerContainer stagger={0.1} className="doctors-grid">
            {DOCTORS.map((doctor) => (
              <StaggerItem key={doctor.id}>
                <Link href={`/dentists/${doctor.slug}`} style={{ textDecoration: "none" }} aria-label={`Profile of ${doctor.name}`}>
                  <HoverScale className="doctor-card">
                    <DoctorPhoto name={doctor.name} photo={doctor.photo} size="lg" />
                    <div className="doctor-card-body">
                      <h3 className="doctor-card-name">{doctor.name}</h3>
                      <p className="credentials">{doctor.qualifications}</p>
                      <p className="doctor-card-specialty">{doctor.specialty}</p>
                    </div>
                    <span className="card-learn-more">
                      View profile <ArrowRightIcon size="sm" />
                    </span>
                  </HoverScale>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── FACILITIES ─────────────────────────────────────────── */}
      <section aria-labelledby="facilities-heading" className="section-padding section-light">
        <div className="container-xl">
          <div className="section-header">
            <div className="accent-line" />
            <StaggerReveal type="eyebrow">
              <p className="eyebrow">The Clinic</p>
            </StaggerReveal>
            <StaggerReveal type="heading">
              <h2 id="facilities-heading" className="section-title">
                What to expect at Smile Architects
              </h2>
            </StaggerReveal>
          </div>

          <StaggerContainer stagger={0.07} className="facilities-grid">
            {FACILITIES.map((f) => (
              <StaggerItem key={f.name}>
                <div className="card-tea facility-card">
                  <div className="facility-check">
                    <CheckIcon size="sm" color="var(--color-dark-moss)" stroke={2.2} />
                  </div>
                  <h3 className="facility-name">{f.name}</h3>
                  <p className="facility-desc">{f.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── REGIONAL SERVICE AREA ───────────────────────────── */}
      <section aria-labelledby="service-area-heading" className="section-padding section-white">
        <div className="container-xl">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "center" }}>
            <RevealUp delay={0.05}>
              <div className="accent-line" />
              <StaggerReveal type="eyebrow">
                <p className="eyebrow">Serving Kottayam District</p>
              </StaggerReveal>
              <StaggerReveal type="heading">
                <h2 id="service-area-heading" className="section-title">
                  Patients from across Kottayam District
                </h2>
              </StaggerReveal>
              <StaggerReveal type="body">
                <p className="section-body">
                  Smile Architects is located in Pala, Kottayam District. Patients regularly travel from
                  Kottayam town, Changanassery, Ettumanoor and surrounding areas for specialist orthodontic
                  treatment and comprehensive dental care.
                </p>
              </StaggerReveal>
              <StaggerReveal type="cta">
                <div className="btn-group" style={{ marginTop: "1.5rem" }}>
                  <Link href="/areas-served/kottayam" className="btn btn-primary">
                    Patients from Kottayam
                  </Link>
                  <Link href="/contact" className="btn btn-ghost">
                    Location &amp; Directions
                  </Link>
                </div>
              </StaggerReveal>
            </RevealUp>
            <RevealFade delay={0.15}>
              <div style={{ display: "grid", gap: "1rem" }}>
                {[
                  { area: "Pala (Palai)", note: "Clinic location — Kattakkayam Road, near Federal Bank" },
                  { area: "Changanassery", note: "Approx. 18 km" },
                  { area: "Ettumanoor", note: "Approx. 25 km" },
                  { area: "Kottayam town", note: "Approx. 35 km" },
                  { area: "Erattupetta", note: "Approx. 12 km" },
                ].map((item) => (
                  <div key={item.area} style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0.875rem 1.25rem",
                    backgroundColor: "var(--color-honeydew)",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--color-tea-green)",
                  }}>
                    <span style={{ fontFamily: "var(--font-serif)", fontSize: "1rem", color: "var(--color-dark-moss)", fontWeight: 500 }}>
                      {item.area}
                    </span>
                    <span style={{ fontSize: "0.8125rem", color: "var(--color-olive)", fontFamily: "var(--font-sans)" }}>
                      {item.note}
                    </span>
                  </div>
                ))}
              </div>
            </RevealFade>
          </div>
        </div>
      </section>

      {/* ── PREMIUM FAQs ───────────────────────────────────────── */}
      <section aria-labelledby="faqs-heading" className="section-padding section-warm">
        <div className="container-xl" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div className="section-header" style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div className="accent-line" style={{ margin: "0 auto 1.5rem" }} />
            <StaggerReveal type="eyebrow">
              <p className="eyebrow">Common Questions</p>
            </StaggerReveal>
            <StaggerReveal type="heading">
              <h2 id="faqs-heading" className="section-title">
                Frequently asked questions
              </h2>
            </StaggerReveal>
          </div>

          <RevealFade delay={0.2}>
            <PremiumFAQ faqs={FAQS_GENERAL} />
          </RevealFade>
        </div>
      </section>

      {/* ── LOCATION ───────────────────────────────────────────── */}
      <section aria-labelledby="location-heading" className="section-padding section-white">
        <div className="container-xl">
          <div className="location-split">

            <RevealUp delay={0.05} className="location-text">
              <div className="accent-line" />
              <StaggerReveal type="eyebrow">
                <p className="eyebrow">Find Us</p>
              </StaggerReveal>
              <StaggerReveal type="heading">
                <h2 id="location-heading" className="section-title">
                  Dental clinic in Pala, Kottayam
                </h2>
              </StaggerReveal>
              <StaggerReveal type="body">
                <address style={{ fontStyle: "normal", lineHeight: 1.8, marginBottom: "1.5rem" }}>
                  <p className="address-primary">
                    {CLINIC.address.street}<br />
                    {CLINIC.address.city}, {CLINIC.address.district}<br />
                    {CLINIC.address.state} – {CLINIC.address.pincode}
                  </p>
                  <p className="address-landmark">{CLINIC.address.landmark}</p>
                </address>
              </StaggerReveal>
              <StaggerReveal type="content">
                <div className="hours-card">
                  <div className="hours-row">
                    <span className="hours-label">Hours</span>
                    <span className="hours-value">Mon–Sat: 9:30 AM – 8:00 PM<br />Sunday: Closed</span>
                  </div>
                  <div className="divider" />
                  <div className="hours-row">
                    <span className="hours-label">Phone</span>
                    <a href={`tel:${CLINIC.contact.phone}`} className="hours-phone">{CLINIC.contact.phoneDisplay}</a>
                  </div>
                  <div className="divider" />
                  <div className="hours-row">
                    <span className="hours-label">Parking</span>
                    <span className="hours-value">Ample car parking available</span>
                  </div>
                </div>
              </StaggerReveal>
              <StaggerReveal type="cta">
                <div className="btn-group" style={{ marginTop: "1.5rem" }}>
                  <TrackedLink
                    href={CLINIC.platforms.googleMaps.directionsUrl}
                    eventName="directions_click"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    Get Directions
                  </TrackedLink>
                  <Link href="/contact" className="btn btn-ghost">Contact Details</Link>
                </div>
              </StaggerReveal>
            </RevealUp>

            <ImageReveal delay={0.2} className="location-map">
              <div className="map-frame">
                <iframe
                  title="Smile Architects location map — Kattakkayam Road, Pala, Kottayam"
                  src={CLINIC.platforms.googleMaps.embedUrl}
                  width="100%" height="100%"
                  style={{ border: 0, display: "block" }}
                  allowFullScreen loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </ImageReveal>

          </div>
        </div>
      </section>

      {/* ── BOOK APPOINTMENT ───────────────────────────────────── */}
      <section aria-labelledby="book-heading" className="section-padding section-dark">
        <div className="container-xl" style={{ maxWidth: "720px" }}>
          <RevealFade>
            <AppointmentForm heading="Book an appointment at Smile Architects" />
          </RevealFade>
        </div>
      </section>
    </>
  );
}
