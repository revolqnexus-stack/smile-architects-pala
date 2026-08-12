import Link from "next/link";
import { CLINIC } from "@/lib/site-config";
import { PhoneIcon, WhatsAppIcon } from "@/components/ui/icons";
import Aurora from "@/components/ui/Aurora";

const FOOTER_TREATMENTS = [
  { label: "General Dentistry", href: "/treatments/general-dentistry" },
  { label: "Dental Implants", href: "/treatments/dental-implants" },
  { label: "Cosmetic Dentistry", href: "/treatments/cosmetic-dentistry" },
  { label: "Root Canal Treatment", href: "/treatments/root-canal-treatment" },
  { label: "Smile Design", href: "/treatments/smile-design" },
  { label: "View All Treatments", href: "/treatments" },
];

const FOOTER_ORTHODONTICS = [
  { label: "Orthodontics Overview", href: "/orthodontics" },
  { label: "Braces", href: "/orthodontics/braces" },
  { label: "Lingual Braces (Hidden)", href: "/orthodontics/lingual-braces" },
  { label: "Clear Aligners", href: "/orthodontics/clear-aligners" },
];

const FOOTER_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Our Doctors", href: "/dentists" },
  { label: "Dental Guides", href: "/dental-guides" },
  { label: "Areas Served", href: "/areas-served" },
  { label: "Kottayam District", href: "/areas-served/kottayam" },
  { label: "Patient Stories", href: "/patient-stories" },
  { label: "Contact", href: "/contact" },
  { label: "Book Appointment", href: "/book-appointment" },
];

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      style={{
        backgroundColor: "#1a3905", // Darker base for Aurora visibility
        borderTop: "2px solid var(--color-olive)",
        color: "var(--color-honeydew)",
        fontFamily: "var(--font-sans)",
        position: "relative",
        overflow: "hidden",
        minHeight: "600px", // More height for Aurora
      }}
    >
      {/* Aurora Background - BEHIND everything */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0, // EXPLICIT z-index behind content
          opacity: 0.85,
          pointerEvents: "none",
        }}
      >
        <Aurora 
          colorStops={["#7E8407", "#EAC800", "#254E06"]}
          amplitude={2.0}
          blend={0.9} 
          speed={1.0}
        />
      </div>
      {/* Pre-footer CTA */}
      <div
        style={{
          background: "linear-gradient(180deg, var(--color-olive), var(--color-dark-moss))",
          borderBottom: "1px solid rgba(234, 200, 0, 0.15)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          className="container-xl"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            paddingTop: "4rem",
            paddingBottom: "4rem",
            gap: "1.5rem",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.75rem, 3vw, 2.75rem)",
              color: "var(--color-honeydew)",
              fontWeight: 400,
              maxWidth: "560px",
              lineHeight: 1.15,
            }}
          >
            Ready for a dental consultation in Pala?
          </h2>
          <p style={{ color: "var(--color-honeydew)", opacity: 0.9, maxWidth: "480px", fontSize: "1rem", lineHeight: 1.6 }}>
            Call or book online. The clinic is open Monday to Saturday, 9:30 AM to 8:00 PM at
            Kattakkayam Road, Pala — near Federal Bank.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
            <Link href="/book-appointment" className="btn btn-secondary">
              Book an Appointment
            </Link>
            <a href={`tel:${CLINIC.contact.phone}`} className="btn btn-ghost-light">
              Call {CLINIC.contact.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      {/* Footer grid */}
      <div className="container-xl" style={{ paddingTop: "3.5rem", paddingBottom: "2rem", position: "relative", zIndex: 1 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "2.5rem 2rem",
            marginBottom: "2.5rem",
          }}
        >
          {/* Brand column */}
          <div style={{ gridColumn: "span 1" }}>
            <Link
              href="/"
              style={{
                display: "block",
                marginBottom: "0.75rem",
                textDecoration: "none",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo.png"
                alt="Smile Architects"
                style={{
                  height: "24px",
                  width: "auto",
                  objectFit: "contain",
                  filter: "brightness(0) invert(1)", // Make logo white for dark footer
                }}
              />
            </Link>
            <p style={{ fontSize: "0.75rem", color: "var(--color-jonquil)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem", fontWeight: 600 }}>
              Multispeciality Dental Clinic<br />Advanced Orthodontic Centre
            </p>
            <address style={{ fontStyle: "normal", fontSize: "0.875rem", lineHeight: 1.7, color: "var(--color-honeydew)", opacity: 0.8 }}>
              {CLINIC.address.street}<br />
              {CLINIC.address.city}, {CLINIC.address.district}<br />
              {CLINIC.address.state} – {CLINIC.address.pincode}<br />
              <span style={{ fontSize: "0.8125rem", opacity: 0.7 }}>Near Federal Bank, Pala Town</span>
            </address>
            <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <a
                href={`tel:${CLINIC.contact.phone}`}
                style={{ fontSize: "0.9rem", color: "var(--color-jonquil)", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <PhoneIcon size="sm" color="var(--color-jonquil)" />
                {CLINIC.contact.phoneDisplay}
              </a>
              <a
                href={`mailto:${CLINIC.contact.email}`}
                style={{ fontSize: "0.8125rem", color: "var(--color-honeydew)", opacity: 0.7 }}
              >
                {CLINIC.contact.email}
              </a>
            </div>
          </div>

          {/* Treatments */}
          <div>
            <h3 style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-jonquil)", fontWeight: 600, marginBottom: "1rem" }}>
              Treatments
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {FOOTER_TREATMENTS.map((t) => (
                <li key={t.href}>
                  <Link href={t.href} className="footer-link">{t.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Orthodontics */}
          <div>
            <h3 style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-jonquil)", fontWeight: 600, marginBottom: "1rem" }}>
              Orthodontics
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {FOOTER_ORTHODONTICS.map((t) => (
                <li key={t.href}>
                  <Link href={t.href} className="footer-link">{t.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h3 style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-jonquil)", fontWeight: 600, marginBottom: "1rem" }}>
              Quick Links
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {FOOTER_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="footer-link">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-jonquil)", fontWeight: 600, marginBottom: "1rem" }}>
              Clinic Hours
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.875rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}>
                <span style={{ color: "var(--color-honeydew)", opacity: 0.7 }}>Monday – Saturday</span>
                <span style={{ color: "var(--color-honeydew)", fontWeight: 500 }}>9:30 AM – 8:00 PM</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}>
                <span style={{ color: "var(--color-honeydew)", opacity: 0.7 }}>Sunday</span>
                <span style={{ color: "var(--color-honeydew)", opacity: 0.7 }}>Closed</span>
              </div>
            </div>
            <div style={{ marginTop: "1.5rem" }}>
              <a
                href={CLINIC.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-whatsapp"
                aria-label="Chat with Smile Architects on WhatsApp"
              >
                <WhatsAppIcon size="sm" />
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(236, 245, 226, 0.15)",
            paddingTop: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: "0.75rem", color: "var(--color-honeydew)", opacity: 0.7 }}>
            © {year} Smile Architects, Pala, Kottayam, Kerala. All rights reserved.
          </p>
          <p style={{ fontSize: "0.75rem", color: "var(--color-honeydew)", opacity: 0.7, maxWidth: "580px", lineHeight: 1.5 }}>
            The information on this website is for general informational purposes only and is not a
            substitute for professional dental advice, diagnosis or treatment. Always consult a
            qualified dental professional for your specific needs.
          </p>
          <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", justifyContent: "center" }}>
            <Link 
              href="/privacy-policy" 
              className="footer-legal-link"
            >
              Privacy Policy
            </Link>
            <Link 
              href="/sitemap.xml" 
              className="footer-legal-link"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
