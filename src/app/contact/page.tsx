import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";
import { CLINIC } from "@/lib/site-config";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ContactForm from "@/components/ui/ContactForm";
import TrackedLink from "@/components/ui/TrackedLink";
import { PhoneIcon, MailIcon, MapPinIcon, ClockIcon, WhatsAppIcon } from "@/components/ui/icons";

export const metadata: Metadata = buildMetadata({
  title: "Contact | Dental Clinic in Pala, Kottayam",
  description:
    "Contact Smile Architects dental clinic in Pala, Kottayam, Kerala. Call +91 9446 999 333, email or use our online appointment form. Open Mon–Sat 9:30 AM–8:00 PM.",
  canonical: "/contact",
});

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <div className="section-padding section-warm">
        <div className="container-xl">
          <Breadcrumb items={[{ label: "Contact", href: "/contact" }]} />
          <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto" }}>
            <h1
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
                color: "var(--color-dark-moss)",
                fontWeight: 400,
                marginTop: "1.5rem",
                marginBottom: "1rem",
                lineHeight: 1.1,
              }}
            >
              Contact Smile Architects
            </h1>
            <p style={{ 
              color: "var(--color-olive)", 
              fontSize: "clamp(1rem, 2.5vw, 1.25rem)", 
              lineHeight: 1.6,
              marginBottom: "2rem",
            }}>
              Dental clinic in Pala, Kottayam, Kerala. Get in touch with our team for appointments, 
              consultations, or any questions about our dental services.
            </p>
            
            {/* Quick contact options */}
            <div style={{ 
              display: "flex", 
              gap: "1rem", 
              justifyContent: "center", 
              flexWrap: "wrap",
              marginBottom: "1rem",
            }}>
              <TrackedLink
                href={`tel:${CLINIC.contact.phone}`}
                eventName="phone_click"
                className="btn btn-primary"
                style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}
              >
                <PhoneIcon size="sm" />
                {CLINIC.contact.phoneDisplay}
              </TrackedLink>
              <TrackedLink
                href={CLINIC.social.whatsapp}
                eventName="whatsapp_click"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}
              >
                <WhatsAppIcon size="sm" />
                WhatsApp
              </TrackedLink>
            </div>
          </div>
        </div>
      </div>

      {/* Main Contact Section */}
      <section className="section-padding section-light">
        <div className="container-xl">
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "1fr 1fr", 
            gap: "4rem", 
            alignItems: "start",
          }}>
            
            {/* Contact Information & Map */}
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              
              {/* Contact Cards */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                
                {/* Address Card */}
                <div className="card-warm" style={{ padding: "1.75rem", display: "flex", gap: "1rem" }}>
                  <div style={{ 
                    flexShrink: 0, 
                    width: "48px", 
                    height: "48px", 
                    backgroundColor: "var(--color-jonquil)", 
                    borderRadius: "12px", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center",
                  }}>
                    <MapPinIcon size="md" color="var(--color-dark-moss)" />
                  </div>
                  <div>
                    <h3 style={{ 
                      fontFamily: "var(--font-sans)", 
                      fontSize: "1rem", 
                      color: "var(--color-dark-moss)", 
                      fontWeight: 600, 
                      marginBottom: "0.5rem",
                    }}>
                      Visit Our Clinic
                    </h3>
                    <address style={{ fontStyle: "normal", color: "var(--color-olive)", lineHeight: 1.6 }}>
                      {CLINIC.address.street}<br />
                      {CLINIC.address.city}, {CLINIC.address.district}<br />
                      {CLINIC.address.state} – {CLINIC.address.pincode}<br />
                      <span style={{ fontSize: "0.875rem", opacity: 0.8 }}>{CLINIC.address.landmark}</span>
                    </address>
                  </div>
                </div>

                {/* Phone Card */}
                <div className="card-warm" style={{ padding: "1.75rem", display: "flex", gap: "1rem" }}>
                  <div style={{ 
                    flexShrink: 0, 
                    width: "48px", 
                    height: "48px", 
                    backgroundColor: "var(--color-jonquil)", 
                    borderRadius: "12px", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center",
                  }}>
                    <PhoneIcon size="md" color="var(--color-dark-moss)" />
                  </div>
                  <div>
                    <h3 style={{ 
                      fontFamily: "var(--font-sans)", 
                      fontSize: "1rem", 
                      color: "var(--color-dark-moss)", 
                      fontWeight: 600, 
                      marginBottom: "0.5rem",
                    }}>
                      Call Us
                    </h3>
                    <TrackedLink
                      href={`tel:${CLINIC.contact.phone}`}
                      eventName="phone_click"
                      style={{ 
                        fontSize: "1.125rem", 
                        color: "var(--color-dark-moss)", 
                        fontWeight: 500,
                        textDecoration: "none",
                      }}
                    >
                      {CLINIC.contact.phoneDisplay}
                    </TrackedLink>
                    <p style={{ fontSize: "0.875rem", color: "var(--color-olive)", marginTop: "0.25rem" }}>
                      Available Mon–Sat, 9:30 AM – 8:00 PM
                    </p>
                  </div>
                </div>

                {/* Email Card */}
                <div className="card-warm" style={{ padding: "1.75rem", display: "flex", gap: "1rem" }}>
                  <div style={{ 
                    flexShrink: 0, 
                    width: "48px", 
                    height: "48px", 
                    backgroundColor: "var(--color-jonquil)", 
                    borderRadius: "12px", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center",
                  }}>
                    <MailIcon size="md" color="var(--color-dark-moss)" />
                  </div>
                  <div>
                    <h3 style={{ 
                      fontFamily: "var(--font-sans)", 
                      fontSize: "1rem", 
                      color: "var(--color-dark-moss)", 
                      fontWeight: 600, 
                      marginBottom: "0.5rem",
                    }}>
                      Email Us
                    </h3>
                    <a 
                      href={`mailto:${CLINIC.contact.email}`} 
                      style={{ 
                        color: "var(--color-dark-moss)", 
                        fontWeight: 500,
                        textDecoration: "none",
                      }}
                    >
                      {CLINIC.contact.email}
                    </a>
                    <p style={{ fontSize: "0.875rem", color: "var(--color-olive)", marginTop: "0.25rem" }}>
                      We respond within 24 hours
                    </p>
                  </div>
                </div>

                {/* Hours Card */}
                <div className="card-warm" style={{ padding: "1.75rem", display: "flex", gap: "1rem" }}>
                  <div style={{ 
                    flexShrink: 0, 
                    width: "48px", 
                    height: "48px", 
                    backgroundColor: "var(--color-jonquil)", 
                    borderRadius: "12px", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center",
                  }}>
                    <ClockIcon size="md" color="var(--color-dark-moss)" />
                  </div>
                  <div>
                    <h3 style={{ 
                      fontFamily: "var(--font-sans)", 
                      fontSize: "1rem", 
                      color: "var(--color-dark-moss)", 
                      fontWeight: 600, 
                      marginBottom: "0.5rem",
                    }}>
                      Opening Hours
                    </h3>
                    <div style={{ color: "var(--color-olive)" }}>
                      <p><strong style={{ color: "var(--color-dark-moss)" }}>Mon–Sat:</strong> 9:30 AM – 8:00 PM</p>
                      <p><strong style={{ color: "var(--color-dark-moss)" }}>Sunday:</strong> Closed</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div>
                <h3 style={{ 
                  fontFamily: "var(--font-serif)", 
                  fontSize: "1.25rem", 
                  color: "var(--color-dark-moss)", 
                  fontWeight: 400, 
                  marginBottom: "1rem",
                }}>
                  Find Us on the Map
                </h3>
                <div
                  style={{
                    borderRadius: "20px",
                    overflow: "hidden",
                    border: "2px solid var(--color-tea-green)",
                    aspectRatio: "4/3",
                    marginBottom: "1rem",
                  }}
                >
                  <iframe
                    title="Smile Architects dental clinic location — Kattakkayam Road, Pala, Kottayam, Kerala"
                    src={CLINIC.platforms.googleMaps.embedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0, display: "block" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <TrackedLink
                  href={CLINIC.platforms.googleMaps.directionsUrl}
                  eventName="directions_click"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ textDecoration: "none" }}
                >
                  Get Directions
                </TrackedLink>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <ContactForm variant="light" />
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="section-padding section-dark">
        <div className="container-xl" style={{ textAlign: "center" }}>
          <h2 style={{ 
            fontFamily: "var(--font-serif)", 
            fontSize: "clamp(1.5rem, 3vw, 2rem)", 
            color: "var(--color-honeydew)", 
            fontWeight: 400,
            marginBottom: "1rem",
          }}>
            Need Emergency Dental Care?
          </h2>
          <p style={{ 
            color: "var(--color-honeydew)", 
            opacity: 0.9,
            fontSize: "1.0625rem", 
            lineHeight: 1.6,
            marginBottom: "2rem",
            maxWidth: "520px",
            margin: "0 auto 2rem",
          }}>
            For urgent dental emergencies outside office hours, call us directly. 
            We prioritize emergency cases and will do our best to accommodate urgent needs.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <TrackedLink
              href={`tel:${CLINIC.contact.phone}`}
              eventName="emergency_phone_click"
              className="btn btn-secondary btn-lg"
              style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}
            >
              <PhoneIcon size="sm" />
              Emergency: {CLINIC.contact.phoneDisplay}
            </TrackedLink>
            <TrackedLink
              href={CLINIC.social.whatsapp}
              eventName="emergency_whatsapp_click"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost-light btn-lg"
              style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}
            >
              <WhatsAppIcon size="sm" />
              WhatsApp Emergency
            </TrackedLink>
          </div>
        </div>
      </section>

      {/* Mobile Responsive Styles */}
      <style>{`
        @media (max-width: 768px) {
          .container-xl > div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
          
          .card-warm {
            padding: 1.5rem !important;
          }
        }
      `}</style>
    </>
  );
}
