import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";
import { CLINIC, TREATMENTS, DOCTORS, FAQS_GENERAL, FACILITIES } from "@/lib/site-config";
import AppointmentForm from "@/components/ui/AppointmentForm";
import TrackedLink from "@/components/ui/TrackedLink";
import FeatureMarquee from "@/components/ui/FeatureMarquee";
import DoctorPhoto from "@/components/ui/DoctorPhoto";
import { TreatmentIconFor, CheckIcon, ArrowRightIcon } from "@/components/ui/icons";
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
          minHeight: "100dvh", // Dynamic viewport height instead of 100vh
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          paddingTop: "100px", // Add padding for slim navbar
        }}
        className="hero-section"
      >
        {/* Full-bleed video background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: -1,
          }}
          aria-hidden="true"
        >
          <source src="/images/hero video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Mobile gradient overlay for text contrast */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 40%, transparent 80%)",
            zIndex: 0,
            display: "block",
          }}
          className="mobile-hero-overlay"
          aria-hidden="true"
        />

        {/* Content overlay */}
        <div className="container-xl" style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              maxWidth: "680px",
              color: "var(--color-honeydew)",
            }}
          >
            {/* Eyebrow */}
            <RevealUp delay={0.1}>
              <p
                style={{
                  fontSize: "0.8125rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--color-jonquil)",
                  fontWeight: 600,
                  fontFamily: "var(--font-utility)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.625rem",
                  marginBottom: "1.375rem",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: "28px",
                    height: "2px",
                    background: "var(--color-jonquil)",
                    flexShrink: 0,
                  }}
                  aria-hidden="true"
                />
                Pala · Kottayam · Kerala
              </p>
            </RevealUp>

            {/* Headline */}
            <RevealUp delay={0.2}>
              <h1
                id="hero-heading"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(2.25rem, 6vw + 0.5rem, 5.25rem)", // Smaller starting size on mobile
                  fontWeight: 400,
                  color: "var(--color-honeydew)",
                  lineHeight: "clamp(1.1, 2vw + 0.9, 1.02)", // Better mobile line height
                  letterSpacing: "-0.03em",
                  marginBottom: "1.625rem",
                  textShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
                }}
              >
                <span style={{ display: "block" }}>Dental Clinic in</span>
                <span style={{ display: "block" }} className="text-gradient-botanical">Pala, Kottayam District</span>
              </h1>
            </RevealUp>

            {/* Body */}
            <RevealUp delay={0.3}>
              <p
                style={{
                  fontSize: "clamp(0.9375rem, 2vw, 1.125rem)",
                  color: "var(--color-honeydew)",
                  lineHeight: 1.75,
                  maxWidth: "540px",
                  fontFamily: "var(--font-sans)",
                  marginBottom: "2.25rem",
                  opacity: 0.95,
                  textShadow: "0 1px 4px rgba(0, 0, 0, 0.2)",
                }}
              >
                Smile Architects is a multispeciality dental clinic and advanced orthodontic centre in Pala, Kottayam. General dentistry, braces, dental implants, smile design and more — led by Dr. Jeo Tom Charls, MDS Orthodontics.
              </p>
            </RevealUp>

            {/* CTAs */}
            <RevealUp delay={0.42}>
              <div
                style={{
                  display: "flex",
                  gap: "0.875rem",
                  flexWrap: "wrap",
                  marginBottom: "2.5rem",
                }}
              >
                <Link href="/book-appointment" className="btn btn-secondary btn-lg">
                  Book an Appointment
                </Link>
                <Link href={`tel:${CLINIC.contact.phone}`} className="btn btn-ghost-light btn-lg">
                  Call {CLINIC.contact.phoneDisplay}
                </Link>
              </div>
            </RevealUp>

            {/* Meta strip */}
            <RevealUp delay={0.6}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                  gap: "1.25rem",
                  paddingTop: "1.75rem",
                  borderTop: "1.5px solid rgba(236, 245, 226, 0.3)",
                  maxWidth: "480px",
                }}
              >
                {[
                  { label: "Mon–Sat", value: "9:30 AM – 8:00 PM" },
                  { label: "Location", value: "Pala, Kottayam" },
                  { label: "Orthodontics", value: "MDS Specialist" },
                ].map((item) => (
                  <div key={item.label}>
                    <p
                      style={{
                        fontSize: "0.6875rem",
                        color: "var(--color-jonquil)",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        fontFamily: "var(--font-utility)",
                        marginBottom: "0.25rem",
                      }}
                    >
                      {item.label}
                    </p>
                    <p
                      style={{
                        fontSize: "0.9375rem",
                        color: "var(--color-honeydew)",
                        fontFamily: "var(--font-sans)",
                        fontWeight: 500,
                        opacity: 0.9,
                      }}
                    >
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </RevealUp>
          </div>
        </div>

        <style>{`
          @media (max-width: 600px) {
            .btn-lg {
              flex: 1 1 auto;
              min-width: 140px;
              padding: 1rem 1.5rem;
            }
          }
          @media (max-width: 420px) {
            .btn-lg {
              width: 100%;
              justify-content: center;
              text-align: center;
              padding: 1.25rem 1.5rem;
            }
          }
          /* Ensure video covers full viewport on mobile - USE DYNAMIC VIEWPORT UNITS */
          @media (max-width: 768px) {
            .hero-section {
              min-height: 100dvh; /* Dynamic viewport height for mobile browsers */
              padding-top: 40px !important; /* Much less padding for ultra-slim navbar */
            }
          }
          /* Text shadows for video contrast */
          .hero-section h1 {
            text-shadow: 0 2px 12px rgba(0, 0, 0, 0.6), 0 1px 3px rgba(0, 0, 0, 0.3) !important;
          }
          .hero-section p {
            text-shadow: 0 1px 8px rgba(0, 0, 0, 0.5) !important;
          }
          /* Mobile overlay - only show on mobile */
          @media (min-width: 769px) {
            .mobile-hero-overlay {
              display: none !important;
            }
          }
          /* Pause video on reduced motion preference */
          @media (prefers-reduced-motion: reduce) {
            video {
              animation-play-state: paused !important;
            }
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
            <PremiumFAQ faqs={FAQS_GENERAL as typeof FAQS_GENERAL} />
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
