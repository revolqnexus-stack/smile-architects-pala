import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { CLINIC } from "@/lib/site-config";
import Breadcrumb from "@/components/ui/Breadcrumb";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy | Smile Architects, Pala",
  description: "Privacy policy for Smile Architects dental clinic website — how we collect, use and protect your personal data.",
  canonical: "/privacy-policy",
  noIndex: true, // Keep privacy pages out of search index by convention
});

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* Hero section with dark background */}
      <div className="section-padding section-dark">
        <div className="container-xl">
          <Breadcrumb items={[{ label: "Privacy Policy", href: "/privacy-policy" }]} />
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "var(--color-honeydew)",
              fontWeight: 400,
              marginTop: "1.5rem",
              marginBottom: "0.75rem",
            }}
          >
            Privacy Policy
          </h1>
          <p style={{ 
            color: "var(--color-honeydew)", 
            opacity: 0.7, 
            fontSize: "0.9375rem", 
            fontFamily: "var(--font-sans)" 
          }}>
            Last updated: {new Date().getFullYear()}
          </p>
        </div>
      </div>

      {/* Content section with light background for readability */}
      <section className="section-padding section-light">
        <div className="container-xl" style={{ maxWidth: "780px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2.5rem",
              color: "var(--color-dark-moss)",
              fontFamily: "var(--font-sans)",
              fontSize: "0.9375rem",
              lineHeight: 1.75,
            }}
          >
            {[
              {
                heading: "1. Who we are",
                body: `This website is operated by Smile Architects — Multispeciality Dental Clinic & Advanced Orthodontic Centre, located at ${CLINIC.address.full}. References to "we", "us" or "our" in this policy refer to Smile Architects. You can contact us at ${CLINIC.contact.email} or ${CLINIC.contact.phoneDisplay}.`,
              },
              {
                heading: "2. What information we collect",
                body: `We may collect the following personal information when you use this website:\n\n• Name, phone number and email address — when you submit an appointment request or contact form.\n• Preferred appointment date and treatment area — when provided in a form submission.\n• Technical data — including IP address, browser type and pages visited — collected automatically by analytics tools (where enabled).`,
              },
              {
                heading: "3. How we use your information",
                body: `Information you provide through appointment forms or contact forms is used solely to:\n\n• Contact you to confirm or discuss an appointment at Smile Architects.\n• Respond to your enquiry.\n\nWe do not use your personal information for marketing without your explicit consent.`,
              },
              {
                heading: "4. Legal basis for processing",
                body: `We process personal data on the basis of:\n\n• Your consent (when you submit a form and agree to be contacted).\n• Legitimate interests — to respond to patient enquiries and manage appointments.`,
              },
              {
                heading: "5. Data sharing",
                body: `We do not sell, rent or share your personal data with third parties for marketing purposes. Your information may be shared only where required by law or with service providers directly involved in delivering the services on this website (such as email or hosting providers), under appropriate data processing agreements.`,
              },
              {
                heading: "6. Data retention",
                body: `Appointment enquiry data is retained for the period necessary to fulfil the request and for reasonable operational records. Contact data is not retained longer than necessary. Clinical records held by the dental practice are subject to separate data handling obligations under applicable healthcare regulations.`,
              },
              {
                heading: "7. Cookies and analytics",
                body: `This website may use cookies and analytics tools (such as Google Analytics) to understand how visitors use the site. These tools collect anonymised data including pages visited, time on site and browser information. No personally identifiable information is collected through analytics cookies. You can control cookie settings through your browser.`,
              },
              {
                heading: "8. Your rights",
                body: `You have the right to:\n\n• Access the personal data we hold about you.\n• Request correction of inaccurate data.\n• Request deletion of your data, subject to legal obligations.\n• Withdraw consent to being contacted at any time.\n\nTo exercise any of these rights, contact us at ${CLINIC.contact.email}.`,
              },
              {
                heading: "9. External links",
                body: `This website contains links to external platforms (Google Maps, WhatsApp, Practo). We are not responsible for the privacy practices of external websites. We recommend reviewing the privacy policies of any third-party sites you visit.`,
              },
              {
                heading: "10. Changes to this policy",
                body: `We may update this privacy policy from time to time. The most current version will always be available on this page. Continued use of the website after changes are posted constitutes acceptance of the updated policy.`,
              },
              {
                heading: "11. Contact",
                body: `If you have questions about this privacy policy or how your data is handled, contact us:\n\nSmile Architects\n${CLINIC.address.full}\nEmail: ${CLINIC.contact.email}\nPhone: ${CLINIC.contact.phoneDisplay}`,
              },
            ].map((section) => (
              <div key={section.heading}>
                <h2
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: "var(--color-dark-moss)",
                    marginBottom: "0.75rem",
                  }}
                >
                  {section.heading}
                </h2>
                <div style={{ whiteSpace: "pre-line", opacity: 0.9 }}>{section.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
