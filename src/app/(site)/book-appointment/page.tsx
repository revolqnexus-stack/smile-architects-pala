import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { CLINIC } from "@/lib/site-config";
import Breadcrumb from "@/components/ui/Breadcrumb";
import AppointmentForm from "@/components/ui/AppointmentForm";
import WhatsAppForm from "@/components/ui/WhatsAppForm";

export const metadata: Metadata = buildMetadata({
  title: "Book an Appointment | Dental Clinic in Pala, Kottayam",
  description:
    "Book an appointment at Smile Architects dental clinic in Pala, Kottayam, Kerala. Call +91 9446 999 333, WhatsApp or complete the online form. Open Mon–Sat 9:30 AM–8:00 PM.",
  canonical: "/book-appointment",
});

export default function BookAppointmentPage() {
  return (
    <>
      <div className="section-padding section-warm">
        <div className="container-xl">
          <Breadcrumb items={[{ label: "Book Appointment", href: "/book-appointment" }]} />
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
            Book an appointment
          </h1>
          <p style={{ color: "var(--color-olive)", fontSize: "1.0625rem", maxWidth: "540px", lineHeight: 1.65 }}>
            Call, WhatsApp or complete the form below. The Smile Architects team will confirm your
            appointment as soon as possible.
          </p>
        </div>
      </div>

      {/* WhatsApp Quick Book Section - Dark green background */}
      <section 
        className="section-padding" 
        style={{ 
          backgroundColor: "var(--color-dark-moss)",
          color: "var(--color-honeydew)",
        }}
      >
        <div className="container-xl">
          <div 
            style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 480px), 1fr))", 
              gap: "3rem", 
              alignItems: "center" 
            }}
          >
            {/* Left side - Messaging */}
            <div>
              <div 
                className="eyebrow" 
                style={{ 
                  color: "var(--color-jonquil)",
                  marginBottom: "1rem",
                }}
              >
                Fastest Way to Book
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  color: "var(--color-honeydew)",
                  fontWeight: 400,
                  marginBottom: "1rem",
                  lineHeight: 1.1,
                }}
              >
                Book instantly via WhatsApp
              </h2>
              <p 
                style={{ 
                  color: "var(--color-honeydew)", 
                  fontSize: "1.0625rem", 
                  lineHeight: 1.7,
                  opacity: 0.9,
                  marginBottom: "1.5rem",
                }}
              >
                Skip the wait. Fill the form and your appointment request will open in WhatsApp — 
                just hit send and our team will confirm your slot within minutes.
              </p>
              
              {/* WhatsApp Benefits */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="var(--color-jonquil)" 
                    strokeWidth="2.5"
                    style={{ flexShrink: 0, marginTop: "2px" }}
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <p style={{ color: "var(--color-honeydew)", fontSize: "0.9375rem", margin: 0, lineHeight: 1.6 }}>
                    <strong style={{ fontWeight: 600 }}>Instant confirmation</strong> — Get your appointment confirmed in real-time
                  </p>
                </div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="var(--color-jonquil)" 
                    strokeWidth="2.5"
                    style={{ flexShrink: 0, marginTop: "2px" }}
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <p style={{ color: "var(--color-honeydew)", fontSize: "0.9375rem", margin: 0, lineHeight: 1.6 }}>
                    <strong style={{ fontWeight: 600 }}>Direct chat</strong> — Ask questions or request specific time slots
                  </p>
                </div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="var(--color-jonquil)" 
                    strokeWidth="2.5"
                    style={{ flexShrink: 0, marginTop: "2px" }}
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <p style={{ color: "var(--color-honeydew)", fontSize: "0.9375rem", margin: 0, lineHeight: 1.6 }}>
                    <strong style={{ fontWeight: 600 }}>Reminders</strong> — Get appointment reminders right on WhatsApp
                  </p>
                </div>
              </div>
            </div>

            {/* Right side - WhatsApp Form */}
            <div 
              style={{ 
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                border: "2px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "20px",
                padding: "2.5rem",
                backdropFilter: "blur(12px)",
              }}
            >
              <WhatsAppForm darkMode={true} heading="Quick WhatsApp Booking" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding section-white">
        <div className="container-xl">
          <div 
            style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))", 
              gap: "4rem", 
              alignItems: "start" 
            }}
          >
            {/* Contact options */}
            <div>
              <h2
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.625rem",
                  color: "var(--color-dark-moss)",
                  fontWeight: 400,
                  marginBottom: "1.75rem",
                }}
              >
                Contact the clinic directly
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {/* Phone */}
                <a
                  href={`tel:${CLINIC.contact.phone}`}
                  className="contact-card"
                  aria-label={`Call Smile Architects: ${CLINIC.contact.phoneDisplay}`}
                >
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      backgroundColor: "var(--color-tea-green)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                    aria-hidden="true"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-olive)" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.28h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.5a16 16 0 0 0 6 6l.97-.97a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16z" />
                    </svg>
                  </div>
                  <div>
                    <p style={{ fontSize: "0.75rem", color: "var(--color-olive)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "var(--font-sans)", marginBottom: "0.25rem" }}>
                      Call us
                    </p>
                    <p style={{ fontSize: "1.0625rem", color: "var(--color-dark-moss)", fontWeight: 500, fontFamily: "var(--font-sans)" }}>
                      {CLINIC.contact.phoneDisplay}
                    </p>
                  </div>
                </a>

                {/* WhatsApp */}
                <a
                  href={CLINIC.social.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-card"
                  aria-label="Chat with Smile Architects on WhatsApp"
                >
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      backgroundColor: "var(--color-tea-green)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                    aria-hidden="true"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--color-olive)" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0 0 20.885 3.49z" />
                    </svg>
                  </div>
                  <div>
                    <p style={{ fontSize: "0.75rem", color: "var(--color-olive)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "var(--font-sans)", marginBottom: "0.25rem" }}>
                      WhatsApp
                    </p>
                    <p style={{ fontSize: "1.0625rem", color: "var(--color-dark-moss)", fontWeight: 500, fontFamily: "var(--font-sans)" }}>
                      Message us on WhatsApp
                    </p>
                  </div>
                </a>

                {/* Hours */}
                <div
                  style={{
                    padding: "1.25rem 1.5rem",
                    backgroundColor: "var(--color-honeydew)",
                    borderRadius: "16px",
                    border: "2px solid var(--color-tea-green)",
                  }}
                >
                  <p style={{ fontSize: "0.75rem", color: "var(--color-olive)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "var(--font-sans)", marginBottom: "0.875rem" }}>
                    Clinic hours
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.9375rem", fontFamily: "var(--font-sans)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: "var(--color-olive)" }}>Monday – Saturday</span>
                      <span style={{ color: "var(--color-dark-moss)" }}>9:30 AM – 8:00 PM</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: "var(--color-olive)" }}>Sunday</span>
                      <span style={{ color: "var(--color-moss)" }}>Closed</span>
                    </div>
                  </div>
                  <p style={{ fontSize: "0.8125rem", color: "var(--color-olive)", marginTop: "0.875rem", lineHeight: 1.5, fontFamily: "var(--font-sans)" }}>
                    {CLINIC.hours.note}
                  </p>
                </div>

                {/* Address */}
                <div
                  style={{
                    padding: "1.25rem 1.5rem",
                    backgroundColor: "var(--color-honeydew)",
                    borderRadius: "16px",
                    border: "2px solid var(--color-tea-green)",
                  }}
                >
                  <p style={{ fontSize: "0.75rem", color: "var(--color-olive)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "var(--font-sans)", marginBottom: "0.875rem" }}>
                    Location
                  </p>
                  <address style={{ fontStyle: "normal", fontSize: "0.9375rem", color: "var(--color-dark-moss)", lineHeight: 1.7, fontFamily: "var(--font-sans)" }}>
                    {CLINIC.address.street}<br />
                    {CLINIC.address.city}, {CLINIC.address.district}<br />
                    {CLINIC.address.state} – {CLINIC.address.pincode}
                  </address>
                  <p style={{ fontSize: "0.875rem", color: "var(--color-olive)", marginTop: "0.375rem", fontFamily: "var(--font-sans)" }}>
                    {CLINIC.address.landmark}
                  </p>
                  <a
                    href={CLINIC.platforms.googleMaps.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: "inline-block", fontSize: "0.8125rem", color: "var(--color-olive)", marginTop: "0.75rem", fontFamily: "var(--font-sans)" }}
                  >
                    Get directions →
                  </a>
                </div>
              </div>
            </div>

            {/* Appointment form */}
            <div>
              <AppointmentForm heading="Request an appointment online" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
