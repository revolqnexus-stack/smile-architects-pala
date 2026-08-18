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
        {/* ── Video-to-page melt — hero bleeds into Services section ── */}
        <div aria-hidden="true" style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "160px", zIndex: 2,
          background: "linear-gradient(to bottom, transparent 0%, #F3F8E9 100%)",
          pointerEvents: "none",
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
      <section aria-labelledby="treatments-heading" className="section-padding treatments-section">
        {/* Organic background decorations */}
        <div aria-hidden="true" className="treatments-bg-decor">
          <div className="treatments-blob treatments-blob-1" />
          <div className="treatments-blob treatments-blob-2" />
          <svg className="treatments-tooth-bg" viewBox="0 0 200 220" fill="none" aria-hidden="true">
            <path d="M100 10 C60 10 30 35 25 70 C20 100 30 130 35 150 C40 170 45 200 60 200 C70 200 75 185 80 175 C85 165 90 158 100 158 C110 158 115 165 120 175 C125 185 130 200 140 200 C155 200 160 170 165 150 C170 130 180 100 175 70 C170 35 140 10 100 10 Z" stroke="currentColor" strokeWidth="3" fill="none"/>
          </svg>
          <svg className="treatments-yellow-arc" viewBox="0 0 120 40" fill="none" aria-hidden="true">
            <path d="M10 30 Q60 5 110 30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
          </svg>
        </div>

        <div className="container-xl" style={{ position: "relative", zIndex: 1 }}>
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

        {/* ── Treatments → Orthodontics soft wave ── */}
        <div aria-hidden="true" style={{
          position: "absolute", bottom: -2, left: 0, right: 0,
          width: "100%", lineHeight: 0, pointerEvents: "none", zIndex: 2,
        }}>
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none"
            style={{ display: "block", width: "100%", height: "clamp(36px, 5vw, 80px)" }}
            xmlns="http://www.w3.org/2000/svg">
            <path d="M0,40 C360,72 720,10 1080,46 C1260,62 1380,32 1440,40 L1440,82 L0,82 Z" fill="#ffffff"/>
            <path d="M0,40 C360,72 720,10 1080,46 C1260,62 1380,32 1440,40"
              fill="none" stroke="rgba(126,132,7,0.12)" strokeWidth="1.2"/>
          </svg>
        </div>

        <style>{`
          /* treatments section needs overflow:hidden for wave */
          .treatments-section {
            position: relative;
            overflow: hidden;
            background:
              radial-gradient(circle at 88% 15%, rgba(255,255,255,0.75), transparent 28%),
              radial-gradient(circle at 8%  92%, rgba(210,230,185,0.4),  transparent 32%),
              #F3F8E9;
          }
          .treatments-bg-decor {
            position: absolute; inset: 0;
            pointer-events: none; overflow: hidden; z-index: 0;
          }
          .treatments-blob {
            position: absolute; border-radius: 50%; filter: blur(72px);
          }
          .treatments-blob-1 {
            width: 520px; height: 520px; top: -140px; right: -100px;
            background: rgba(215,235,175,0.32);
          }
          .treatments-blob-2 {
            width: 400px; height: 400px; bottom: -100px; left: -80px;
            background: rgba(215,227,164,0.28);
          }
          .treatments-tooth-bg {
            position: absolute; right: 3%; top: 50%; transform: translateY(-50%);
            width: clamp(180px, 22vw, 320px); height: auto;
            color: rgba(37,78,6,0.028); pointer-events: none;
          }
          .treatments-yellow-arc {
            position: absolute;
            left: clamp(1rem, 6vw, 8rem); top: clamp(2rem, 7vw, 5rem);
            width: clamp(60px, 8vw, 110px); height: auto;
            color: rgba(234,200,0,0.45); pointer-events: none;
            transform: rotate(-8deg);
          }
          @media (max-width: 768px) {
            .treatments-blob-1 { width: 280px; height: 280px; }
            .treatments-blob-2 { width: 220px; height: 220px; }
          }
        `}</style>
      </section>

      {/* ── ORTHODONTICS FEATURE ───────────────────────────────── */}
      <section aria-labelledby="orthodontics-heading" className="section-padding section-white" style={{ position: "relative" }}>
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
      <section aria-labelledby="doctors-heading" className="section-padding section-light">
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
      <section aria-labelledby="facilities-heading" className="section-padding section-white">
        <div className="container-xl">
          {/* Header */}
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
            <StaggerReveal type="body">
              <p className="section-body">
                A comfortable, modern environment designed around your care and experience.
              </p>
            </StaggerReveal>
          </div>

          {/* 2×2 numbered cards */}
          <StaggerContainer stagger={0.08} className="facilities-numbered-grid">
            {FACILITIES.map((f, i) => (
              <StaggerItem key={f.name}>
                <div className="facility-numbered-card">
                  {/* Number + yellow accent line */}
                  <div className="facility-numbered-header">
                    <span className="facility-number">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="facility-number-line" aria-hidden="true" />
                  </div>
                  <h3 className="facility-numbered-title">{f.name}</h3>
                  <p className="facility-numbered-desc">{f.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        <style>{`
          .facilities-numbered-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1.25rem;
          }
          .facility-numbered-card {
            background: #ffffff;
            border: 1.5px solid #dce8c5;
            border-radius: 20px;
            padding: 2rem 2rem 1.75rem;
            transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;
          }
          .facility-numbered-card:hover {
            border-color: var(--color-olive);
            box-shadow: 0 8px 28px rgba(37,78,6,0.07);
            transform: translateY(-3px);
          }
          .facility-numbered-header {
            display: flex;
            align-items: center;
            gap: 0.875rem;
            margin-bottom: 1rem;
          }
          .facility-number {
            font-size: 0.8125rem;
            font-weight: 700;
            font-family: var(--font-utility);
            color: var(--color-jonquil);
            letter-spacing: 0.04em;
            flex-shrink: 0;
          }
          .facility-number-line {
            flex: 1;
            height: 2px;
            background: linear-gradient(90deg, var(--color-jonquil) 0%, rgba(234,200,0,0.15) 100%);
            border-radius: 99px;
            max-width: 56px;
          }
          .facility-numbered-title {
            font-family: var(--font-serif);
            font-size: 1.125rem;
            font-weight: 500;
            color: var(--color-dark-moss);
            margin-bottom: 0.5rem;
            line-height: 1.3;
          }
          .facility-numbered-desc {
            font-size: 0.9375rem;
            color: var(--color-olive);
            line-height: 1.65;
            margin: 0;
            font-weight: 400;
          }
          @media (max-width: 640px) {
            .facilities-numbered-grid {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </section>

      {/* ── REGIONAL SERVICE AREA ───────────────────────────── */}
      <section aria-labelledby="service-area-heading" className="section-padding section-warm" style={{ position: "relative", overflow: "hidden", paddingBottom: "clamp(5rem, 10vw, 8rem)" }}>
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
                  Kottayam town, Changanassery, Ettumanoor and surrounding areas, as well as from Thrissur,
                  for specialist orthodontic treatment and comprehensive dental care.
                </p>
              </StaggerReveal>
              <StaggerReveal type="cta">
                <div className="btn-group" style={{ marginTop: "1.5rem" }}>
                  <Link href="/areas-served/kottayam" className="btn btn-primary">
                    Patients from Kottayam
                  </Link>
                  <Link href="/areas-served/thrissur" className="btn btn-ghost">
                    Patients from Thrissur
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

        {/* ── Organic wave divider — transitions into FAQ's off-white ── */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: -2,
            left: 0,
            right: 0,
            width: "100%",
            lineHeight: 0,
            pointerEvents: "none",
            zIndex: 2,
          }}
        >
          {/* Faint olive outline wave — sits just above the fill wave */}
          <svg
            viewBox="0 0 1440 110"
            preserveAspectRatio="none"
            style={{ display: "block", width: "100%", height: "clamp(45px, 8vw, 110px)" }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,52 C180,92 360,20 540,58 C720,96 900,18 1080,55 C1260,92 1380,38 1440,52 L1440,112 L0,112 Z"
              fill="#FAFAF7"
            />
            {/* Subtle olive/yellow accent line along the wave edge */}
            <path
              d="M0,52 C180,92 360,20 540,58 C720,96 900,18 1080,55 C1260,92 1380,38 1440,52"
              fill="none"
              stroke="rgba(126,132,7,0.18)"
              strokeWidth="1.5"
            />
          </svg>
        </div>

        {/* ── Decorative botanical left ── */}
        <svg
          aria-hidden="true"
          viewBox="0 0 120 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: "absolute",
            bottom: 60,
            left: -10,
            width: 120,
            opacity: 0.09,
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          <path d="M60 180 Q20 140 30 90 Q40 40 60 20 Q80 40 90 90 Q100 140 60 180Z" stroke="var(--color-dark-moss)" strokeWidth="1.2" fill="none"/>
          <path d="M60 160 Q15 120 25 70" stroke="var(--color-dark-moss)" strokeWidth="1" fill="none"/>
          <path d="M60 160 Q105 120 95 70" stroke="var(--color-dark-moss)" strokeWidth="1" fill="none"/>
          <path d="M60 130 Q30 110 35 80" stroke="var(--color-dark-moss)" strokeWidth="0.8" fill="none"/>
          <path d="M60 130 Q90 110 85 80" stroke="var(--color-dark-moss)" strokeWidth="0.8" fill="none"/>
        </svg>

        {/* ── Decorative dot grid right ── */}
        <svg
          aria-hidden="true"
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: "absolute",
            bottom: 70,
            right: 24,
            width: 80,
            opacity: 0.1,
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          {[0,1,2,3].map(row =>
            [0,1,2,3].map(col => (
              <circle
                key={`${row}-${col}`}
                cx={col * 20 + 10}
                cy={row * 20 + 10}
                r="2.5"
                fill="var(--color-olive)"
              />
            ))
          )}
        </svg>
      </section>

      {/* ── PREMIUM FAQs ───────────────────────────────────────── */}
      <section aria-labelledby="faqs-heading" className="section-padding" style={{ backgroundColor: "#FAFAF7", position: "relative", overflow: "hidden", marginTop: "-2px" }}>
        <div className="container-xl">
          <div className="faq-editorial-layout">

            {/* Left: heading */}
            <RevealUp delay={0.05} className="faq-editorial-left">
              <div className="accent-line" />
              <p className="eyebrow">Common Questions</p>
              <h2 id="faqs-heading" className="faq-editorial-heading">
                Frequently asked<br />questions
              </h2>
              <p className="faq-editorial-sub">
                Everything you need to know before visiting Smile Architects.
              </p>
              {/* Small decorative element */}
              <div className="faq-deco-line" aria-hidden="true" />
            </RevealUp>

            {/* Right: accordion */}
            <RevealFade delay={0.2} className="faq-editorial-right">
              <PremiumFAQ faqs={FAQS_GENERAL} />
            </RevealFade>

          </div>
        </div>

        <style>{`
          .faq-editorial-layout {
            display: grid;
            grid-template-columns: 1fr 1.6fr;
            gap: 4rem;
            align-items: start;
          }
          .faq-editorial-left {
            position: sticky;
            top: 120px;
          }
          .faq-editorial-heading {
            font-family: var(--font-serif);
            font-size: clamp(2rem, 3.5vw, 3rem);
            font-weight: 400;
            color: var(--color-dark-moss);
            line-height: 1.15;
            letter-spacing: -0.025em;
            margin-bottom: 1.25rem;
          }
          .faq-editorial-sub {
            font-size: 1rem;
            color: var(--color-olive);
            line-height: 1.7;
            font-family: var(--font-sans);
            font-weight: 400;
            margin-bottom: 1.75rem;
            max-width: 280px;
          }
          .faq-deco-line {
            width: 40px;
            height: 3px;
            background: linear-gradient(90deg, var(--color-jonquil), rgba(234,200,0,0.3));
            border-radius: 99px;
          }
          @media (max-width: 900px) {
            .faq-editorial-layout {
              grid-template-columns: 1fr;
              gap: 2.5rem;
            }
            .faq-editorial-left {
              position: static;
            }
          }
        `}</style>
      </section>

      {/* ── LOCATION ───────────────────────────────────────────── */}
      <section aria-labelledby="location-heading" className="section-padding section-white" style={{ position: "relative" }}>
        {/* FAQ → Location top gradient whisper */}
        <div aria-hidden="true" style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 160,
          background: "radial-gradient(ellipse at 50% 0%, rgba(215,231,190,0.18), transparent 60%)",
          pointerEvents: "none", zIndex: 0,
        }} />
        <div className="container-xl">
          <div className="location-editorial">

            {/* Left: text */}
            <RevealUp delay={0.05} className="location-editorial-text">
              <div className="accent-line" />
              <p className="eyebrow">Find Us</p>
              <h2 id="location-heading" className="location-editorial-heading">
                Dental clinic in Pala,<br />Kottayam
              </h2>

              <address className="location-address-block" style={{ fontStyle: "normal" }}>
                <div className="location-address-item">
                  <span className="location-address-label">Address</span>
                  <span className="location-address-value">
                    {CLINIC.address.street}<br />
                    {CLINIC.address.city}, {CLINIC.address.district}<br />
                    {CLINIC.address.state} – {CLINIC.address.pincode}
                  </span>
                </div>
                <div className="location-address-divider" />
                <div className="location-address-item">
                  <span className="location-address-label">Landmark</span>
                  <span className="location-address-value">{CLINIC.address.landmark}</span>
                </div>
                <div className="location-address-divider" />
                <div className="location-address-item">
                  <span className="location-address-label">Hours</span>
                  <span className="location-address-value">Mon–Sat: 9:30 AM – 8:00 PM<br />Sunday: Closed</span>
                </div>
                <div className="location-address-divider" />
                <div className="location-address-item">
                  <span className="location-address-label">Phone</span>
                  <a href={`tel:${CLINIC.contact.phone}`} className="location-phone-link">
                    {CLINIC.contact.phoneDisplay}
                  </a>
                </div>
              </address>

              <div className="location-cta-row">
                <TrackedLink
                  href={CLINIC.platforms.googleMaps.directionsUrl}
                  eventName="directions_click"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Get Directions →
                </TrackedLink>
                <a href={`tel:${CLINIC.contact.phone}`} className="btn btn-ghost">
                  Call Clinic
                </a>
              </div>
            </RevealUp>

            {/* Right: map */}
            <ImageReveal delay={0.2} className="location-editorial-map">
              <div className="location-map-frame">
                <iframe
                  title="Smile Architects location map — Kattakkayam Road, Pala, Kottayam"
                  src={CLINIC.platforms.googleMaps.embedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, display: "block", borderRadius: "inherit" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </ImageReveal>

          </div>
        </div>

        <style>{`
          /* Editorial location layout */
          .location-editorial {
            display: grid;
            grid-template-columns: 1fr 1.1fr;
            gap: 4rem;
            align-items: center;
          }
          .location-editorial-heading {
            font-family: var(--font-serif);
            font-size: clamp(1.875rem, 3vw, 2.75rem);
            font-weight: 400;
            color: var(--color-dark-moss);
            line-height: 1.15;
            letter-spacing: -0.025em;
            margin-bottom: 2rem;
          }
          /* Address block */
          .location-address-block {
            display: flex;
            flex-direction: column;
            margin-bottom: 2rem;
          }
          .location-address-item {
            display: grid;
            grid-template-columns: 80px 1fr;
            gap: 1rem;
            padding: 0.875rem 0;
          }
          .location-address-label {
            font-size: 0.6875rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: var(--color-olive);
            font-family: var(--font-utility);
            padding-top: 2px;
          }
          .location-address-value {
            font-size: 0.9375rem;
            color: var(--color-dark-moss);
            font-family: var(--font-sans);
            font-weight: 400;
            line-height: 1.6;
          }
          .location-address-divider {
            height: 1px;
            background: var(--color-tea-green);
            margin: 0;
          }
          .location-phone-link {
            font-size: 0.9375rem;
            color: var(--color-dark-moss);
            font-family: var(--font-sans);
            font-weight: 600;
            text-decoration: none;
            border-bottom: 1px solid var(--color-tea-green);
            padding-bottom: 1px;
            transition: border-color 0.2s ease, color 0.2s ease;
          }
          .location-phone-link:hover {
            color: var(--color-olive);
            border-bottom-color: var(--color-olive);
          }
          .location-cta-row {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
          }
          /* Map frame */
          .location-editorial-map {
            height: 100%;
          }
          .location-map-frame {
            width: 100%;
            height: clamp(340px, 50vh, 520px);
            border-radius: 28px;
            overflow: hidden;
            border: 1.5px solid var(--color-tea-green);
            box-shadow: 0 12px 40px rgba(37,78,6,0.09);
          }
          @media (max-width: 900px) {
            .location-editorial {
              grid-template-columns: 1fr;
              gap: 2.5rem;
            }
            .location-map-frame {
              height: 320px;
              border-radius: 20px;
            }
          }
          @media (max-width: 480px) {
            .location-address-item {
              grid-template-columns: 1fr;
              gap: 0.25rem;
            }
            .location-map-frame {
              height: 260px;
            }
          }
        `}</style>
      </section>

      {/* ── BOOK APPOINTMENT ───────────────────────────────────── */}
      <section aria-labelledby="book-heading" className="section-padding section-dark" style={{ position: "relative", overflow: "hidden" }}>
        {/* Location → Appointment green curve */}
        <div aria-hidden="true" style={{
          position: "absolute", top: -2, left: 0, right: 0,
          width: "100%", lineHeight: 0, pointerEvents: "none", zIndex: 2,
        }}>
          <svg viewBox="0 0 1440 70" preserveAspectRatio="none"
            style={{ display: "block", width: "100%", height: "clamp(32px, 4.5vw, 70px)" }}
            xmlns="http://www.w3.org/2000/svg">
            <path d="M0,0 L0,28 C240,58 480,8 720,36 C960,62 1200,16 1440,28 L1440,0 Z"
              fill="var(--color-dark-moss)"/>
          </svg>
        </div>
        <div className="container-xl" style={{ maxWidth: "720px" }}>
          <RevealFade>
            <AppointmentForm heading="Book an appointment at Smile Architects" />
          </RevealFade>
        </div>
      </section>
    </>
  );
}
