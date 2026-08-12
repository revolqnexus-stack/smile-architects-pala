"use client";

import { useState, useRef } from "react";
import { CLINIC } from "@/lib/site-config";
import { SendIcon, CheckIcon } from "@/components/ui/icons";

interface ContactFormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  reason: string;
}

interface ContactFormProps {
  variant?: "light" | "dark";
}

export default function ContactForm({ variant = "light" }: ContactFormProps) {
  const [form, setForm] = useState<ContactFormState>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    reason: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    
    // GA4 conversion event
    if (typeof window !== "undefined" && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
      (window as unknown as { gtag: (...args: unknown[]) => void }).gtag("event", "contact_form_submit", {
        reason: form.reason || "general_inquiry",
      });
    }

    // Simulate sending (replace with actual implementation)
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("success");
    formRef.current?.reset();
    setForm({ name: "", email: "", phone: "", subject: "", message: "", reason: "" });
  };

  // Theme colors
  const isDark = variant === "dark";
  const bgColor = isDark ? "var(--color-dark-moss)" : "var(--color-honeydew)";
  const cardBg = isDark ? "rgba(236,245,226,0.08)" : "var(--color-white)";
  const textPrimary = isDark ? "var(--color-honeydew)" : "var(--color-dark-moss)";
  const textSecondary = isDark ? "rgba(236,245,226,0.8)" : "var(--color-olive)";
  const labelColor = isDark ? "var(--color-jonquil)" : "var(--color-olive)";
  const inputBg = isDark ? "rgba(255,255,255,0.1)" : "var(--color-white)";
  const inputBorder = isDark ? "rgba(236,245,226,0.2)" : "var(--color-tea-green)";
  const inputFocus = isDark ? "var(--color-jonquil)" : "var(--color-dark-moss)";

  if (status === "success") {
    return (
      <div
        style={{
          backgroundColor: cardBg,
          borderRadius: "24px",
          padding: "3rem",
          border: `2px solid ${isDark ? "rgba(236,245,226,0.15)" : "var(--color-tea-green)"}`,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.5rem",
        }}
      >
        {/* Success icon */}
        <div
          style={{
            width: "72px",
            height: "72px",
            borderRadius: "50%",
            backgroundColor: "var(--color-jonquil)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "0.5rem",
          }}
        >
          <CheckIcon size="lg" color="var(--color-dark-moss)" stroke={2.5} />
        </div>

        <div>
          <h3
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.75rem",
              color: textPrimary,
              fontWeight: 400,
              marginBottom: "0.75rem",
              lineHeight: 1.2,
            }}
          >
            Message sent successfully
          </h3>
          <p
            style={{
              color: textSecondary,
              fontSize: "1rem",
              lineHeight: 1.6,
              marginBottom: "1.5rem",
              maxWidth: "420px",
            }}
          >
            Thank you for contacting Smile Architects. Our team will review your message and respond within 24 hours.
          </p>
        </div>

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
          <a
            href={`tel:${CLINIC.contact.phone}`}
            className="btn btn-secondary"
            style={{ textDecoration: "none" }}
          >
            Call {CLINIC.contact.phoneDisplay}
          </a>
          <a
            href={CLINIC.social.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost"
            style={{ textDecoration: "none" }}
          >
            WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: cardBg,
        borderRadius: "24px",
        padding: "3rem",
        border: `2px solid ${isDark ? "rgba(236,245,226,0.15)" : "var(--color-tea-green)"}`,
        boxShadow: isDark ? "0 8px 32px rgba(0,0,0,0.2)" : "0 8px 32px rgba(37,78,6,0.08)",
      }}
    >
      <div style={{ marginBottom: "2rem" }}>
        <h2
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1.5rem, 3vw, 2rem)",
            color: textPrimary,
            fontWeight: 400,
            marginBottom: "0.75rem",
            lineHeight: 1.2,
          }}
        >
          Send us a message
        </h2>
        <p
          style={{
            color: textSecondary,
            fontSize: "1rem",
            lineHeight: 1.6,
          }}
        >
          Complete the form below and our team will get back to you within 24 hours.
        </p>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {/* Row 1: Name + Email */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
          <div>
            <label
              htmlFor="contact-name"
              style={{
                display: "block",
                fontSize: "0.8125rem",
                color: labelColor,
                marginBottom: "0.5rem",
                fontFamily: "var(--font-utility)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              Full Name <span style={{ color: "var(--color-jonquil)" }}>*</span>
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder="Your full name"
              value={form.name}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "1rem 1.25rem",
                backgroundColor: inputBg,
                border: `2px solid ${inputBorder}`,
                borderRadius: "12px",
                color: textPrimary,
                fontSize: "1rem",
                fontFamily: "var(--font-sans)",
                outline: "none",
                transition: "all 0.3s ease",
              }}
              onFocus={(e) => { e.target.style.borderColor = inputFocus; }}
              onBlur={(e) => { e.target.style.borderColor = inputBorder; }}
            />
          </div>
          <div>
            <label
              htmlFor="contact-email"
              style={{
                display: "block",
                fontSize: "0.8125rem",
                color: labelColor,
                marginBottom: "0.5rem",
                fontFamily: "var(--font-utility)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              Email Address <span style={{ color: "var(--color-jonquil)" }}>*</span>
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="your.email@example.com"
              value={form.email}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "1rem 1.25rem",
                backgroundColor: inputBg,
                border: `2px solid ${inputBorder}`,
                borderRadius: "12px",
                color: textPrimary,
                fontSize: "1rem",
                fontFamily: "var(--font-sans)",
                outline: "none",
                transition: "all 0.3s ease",
              }}
              onFocus={(e) => { e.target.style.borderColor = inputFocus; }}
              onBlur={(e) => { e.target.style.borderColor = inputBorder; }}
            />
          </div>
        </div>

        {/* Row 2: Phone + Reason */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
          <div>
            <label
              htmlFor="contact-phone"
              style={{
                display: "block",
                fontSize: "0.8125rem",
                color: labelColor,
                marginBottom: "0.5rem",
                fontFamily: "var(--font-utility)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              Phone Number
            </label>
            <input
              id="contact-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="+91 XXXXX XXXXX"
              value={form.phone}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "1rem 1.25rem",
                backgroundColor: inputBg,
                border: `2px solid ${inputBorder}`,
                borderRadius: "12px",
                color: textPrimary,
                fontSize: "1rem",
                fontFamily: "var(--font-sans)",
                outline: "none",
                transition: "all 0.3s ease",
              }}
              onFocus={(e) => { e.target.style.borderColor = inputFocus; }}
              onBlur={(e) => { e.target.style.borderColor = inputBorder; }}
            />
          </div>
          <div>
            <label
              htmlFor="contact-reason"
              style={{
                display: "block",
                fontSize: "0.8125rem",
                color: labelColor,
                marginBottom: "0.5rem",
                fontFamily: "var(--font-utility)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              Reason for Contact
            </label>
            <select
              id="contact-reason"
              name="reason"
              value={form.reason}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "1rem 1.25rem",
                backgroundColor: inputBg,
                border: `2px solid ${inputBorder}`,
                borderRadius: "12px",
                color: form.reason ? textPrimary : textSecondary,
                fontSize: "1rem",
                fontFamily: "var(--font-sans)",
                outline: "none",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
              onFocus={(e) => { e.target.style.borderColor = inputFocus; }}
              onBlur={(e) => { e.target.style.borderColor = inputBorder; }}
            >
              <option value="">Select a reason</option>
              <option value="appointment">Book an Appointment</option>
              <option value="emergency">Emergency / Urgent Care</option>
              <option value="consultation">General Consultation</option>
              <option value="treatment_inquiry">Treatment Information</option>
              <option value="insurance">Insurance Questions</option>
              <option value="feedback">Feedback or Complaint</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {/* Subject */}
        <div>
          <label
            htmlFor="contact-subject"
            style={{
              display: "block",
              fontSize: "0.8125rem",
              color: labelColor,
              marginBottom: "0.5rem",
              fontFamily: "var(--font-utility)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            Subject
          </label>
          <input
            id="contact-subject"
            name="subject"
            type="text"
            placeholder="Brief subject line"
            value={form.subject}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "1rem 1.25rem",
              backgroundColor: inputBg,
              border: `2px solid ${inputBorder}`,
              borderRadius: "12px",
              color: textPrimary,
              fontSize: "1rem",
              fontFamily: "var(--font-sans)",
              outline: "none",
              transition: "all 0.3s ease",
            }}
            onFocus={(e) => { e.target.style.borderColor = inputFocus; }}
            onBlur={(e) => { e.target.style.borderColor = inputBorder; }}
          />
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor="contact-message"
            style={{
              display: "block",
              fontSize: "0.8125rem",
              color: labelColor,
              marginBottom: "0.5rem",
              fontFamily: "var(--font-utility)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            Message <span style={{ color: "var(--color-jonquil)" }}>*</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            required
            placeholder="Tell us how we can help you..."
            value={form.message}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "1rem 1.25rem",
              backgroundColor: inputBg,
              border: `2px solid ${inputBorder}`,
              borderRadius: "12px",
              color: textPrimary,
              fontSize: "1rem",
              fontFamily: "var(--font-sans)",
              outline: "none",
              transition: "all 0.3s ease",
              resize: "vertical",
              minHeight: "120px",
              lineHeight: 1.6,
            }}
            onFocus={(e) => { e.target.style.borderColor = inputFocus; }}
            onBlur={(e) => { e.target.style.borderColor = inputBorder; }}
          />
        </div>

        {/* Submit */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "flex-start", marginTop: "1rem" }}>
          <button
            type="submit"
            disabled={status === "sending" || !form.name || !form.email || !form.message}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "1.125rem 2.5rem",
              backgroundColor: "var(--color-jonquil)",
              color: "var(--color-dark-moss)",
              border: "none",
              borderRadius: "14px",
              fontSize: "1rem",
              fontFamily: "var(--font-utility)",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              cursor: status === "sending" || !form.name || !form.email || !form.message ? "not-allowed" : "pointer",
              opacity: status === "sending" || !form.name || !form.email || !form.message ? 0.6 : 1,
              transition: "all 0.3s ease",
              outline: "none",
            }}
            onMouseEnter={(e) => {
              if (form.name && form.email && form.message && status !== "sending") {
                e.currentTarget.style.backgroundColor = "var(--color-harvest-gold)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "var(--color-jonquil)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <SendIcon size="md" />
            {status === "sending" ? "Sending..." : "Send Message"}
          </button>

          <p
            style={{
              fontSize: "0.8125rem",
              color: textSecondary,
              lineHeight: 1.5,
              opacity: 0.8,
            }}
          >
            By submitting this form you agree to be contacted by Smile Architects regarding your inquiry.
            We typically respond within 24 hours.
          </p>
        </div>
      </form>

      {/* Mobile responsive adjustments */}
      <style>{`
        @media (max-width: 640px) {
          #contact-form-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}