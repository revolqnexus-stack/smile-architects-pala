"use client";

import { useState, useRef } from "react";
import { CLINIC, TREATMENTS } from "@/lib/site-config";

interface FormState {
  name: string;
  phone: string;
  treatment: string;
  date: string;
  message: string;
}

interface AppointmentFormProps {
  compact?: boolean;
  heading?: string;
  /**
   * Set to "dark" when the form sits on a dark-moss/dark section background.
   * Defaults to "light" — works on vanilla/honeydew/white backgrounds.
   */
  surface?: "light" | "dark";
}

export default function AppointmentForm({
  compact = false,
  heading = "Book an Appointment",
  surface = "dark",
}: AppointmentFormProps) {
  const [form, setForm] = useState<FormState>({ name: "", phone: "", treatment: "", date: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    if (typeof window !== "undefined" && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
      (window as unknown as { gtag: (...args: unknown[]) => void }).gtag("event", "appointment_submit", { treatment: form.treatment });
    }
    await new Promise((r) => setTimeout(r, 800));
    setStatus("success");
    formRef.current?.reset();
    setForm({ name: "", phone: "", treatment: "", date: "", message: "" });
  };

  // ── Semantic color tokens based on surface ──────────────────────────────────
  const isDark = surface === "dark";

  // Text
  const headingColor   = isDark ? "var(--color-honeydew)"     : "var(--color-dark-moss)";
  const labelColor     = isDark ? "var(--color-jonquil)"      : "var(--color-olive)";
  const bodyColor      = isDark ? "rgba(236,245,226,0.75)"    : "var(--color-olive)";
  const captionColor   = isDark ? "rgba(236,245,226,0.55)"    : "var(--color-moss)";
  const accentColor    = isDark ? "var(--color-jonquil)"      : "var(--color-olive)";

  // Input surface
  const inputBg        = isDark ? "rgba(255,255,255,0.08)"    : "var(--color-white)";
  const inputText      = isDark ? "var(--color-honeydew)"     : "var(--color-dark-moss)";
  const inputBorder    = isDark ? "rgba(236,245,226,0.18)"    : "var(--color-tea-green)";
  const inputFocus     = isDark ? "var(--color-jonquil)"      : "var(--color-olive)";
  const placeholderClr = isDark ? "rgba(236,245,226,0.38)"    : "rgba(37,78,6,0.38)";

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.875rem 1rem",
    backgroundColor: inputBg,
    border: `1.5px solid ${inputBorder}`,
    borderRadius: "10px",
    color: inputText,
    fontSize: "1rem",            // ≥16px — prevents iOS zoom
    fontFamily: "var(--font-sans)",
    fontWeight: 400,
    outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <div>
      {heading && (
        <h2 style={{ fontFamily: "var(--font-serif)", fontSize: compact ? "1.5rem" : "clamp(1.5rem,3vw,2rem)", color: headingColor, fontWeight: 400, marginBottom: "0.5rem", lineHeight: 1.2 }}>
          {heading}
        </h2>
      )}
      <p style={{ color: bodyColor, fontSize: "0.9375rem", marginBottom: "1.75rem", lineHeight: 1.65 }}>
        Call{" "}
        <a href={`tel:${CLINIC.contact.phone}`} style={{ color: accentColor, fontWeight: 600 }}>
          {CLINIC.contact.phoneDisplay}
        </a>{" "}
        or complete the form and the team will confirm your appointment.
      </p>

      {status === "success" ? (
        <div role="alert" style={{ padding: "1.5rem", backgroundColor: isDark ? "rgba(234,200,0,0.1)" : "var(--color-tea-green)", borderRadius: "12px", border: `1px solid ${isDark ? "rgba(234,200,0,0.3)" : "var(--color-olive)"}`, textAlign: "center" }}>
          <p style={{ color: isDark ? "var(--color-jonquil)" : "var(--color-dark-moss)", fontWeight: 600, marginBottom: "0.25rem" }}>Request received</p>
          <p style={{ color: bodyColor, fontSize: "0.875rem" }}>
            The team will contact you at {form.phone || "your number"} to confirm your slot.
          </p>
        </div>
      ) : (
        <form ref={formRef} onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "1.125rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: compact ? "1fr" : "repeat(auto-fit,minmax(200px,1fr))", gap: "1rem" }}>
            {/* Name */}
            <div>
              <label htmlFor="appt-name" style={{ display: "block", fontSize: "0.75rem", color: labelColor, marginBottom: "0.4rem", fontFamily: "var(--font-utility)", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600 }}>
                Name <span aria-hidden="true" style={{ color: "var(--color-jonquil)" }}>*</span>
              </label>
              <input id="appt-name" name="name" type="text" required autoComplete="name" placeholder="Your name" value={form.name} onChange={handleChange} style={inputStyle}
                onFocus={(e) => { e.target.style.borderColor = inputFocus; e.target.style.boxShadow = `0 0 0 3px ${isDark ? "rgba(234,200,0,0.12)" : "rgba(126,132,7,0.1)"}`; }}
                onBlur={(e)  => { e.target.style.borderColor = inputBorder; e.target.style.boxShadow = "none"; }}
                aria-required="true"
              />
            </div>
            {/* Phone */}
            <div>
              <label htmlFor="appt-phone" style={{ display: "block", fontSize: "0.75rem", color: labelColor, marginBottom: "0.4rem", fontFamily: "var(--font-utility)", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600 }}>
                Phone <span aria-hidden="true" style={{ color: "var(--color-jonquil)" }}>*</span>
              </label>
              <input id="appt-phone" name="phone" type="tel" required autoComplete="tel" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={handleChange} style={inputStyle}
                onFocus={(e) => { e.target.style.borderColor = inputFocus; e.target.style.boxShadow = `0 0 0 3px ${isDark ? "rgba(234,200,0,0.12)" : "rgba(126,132,7,0.1)"}`; }}
                onBlur={(e)  => { e.target.style.borderColor = inputBorder; e.target.style.boxShadow = "none"; }}
                aria-required="true"
              />
            </div>
          </div>

          {/* Treatment */}
          <div>
            <label htmlFor="appt-treatment" style={{ display: "block", fontSize: "0.75rem", color: labelColor, marginBottom: "0.4rem", fontFamily: "var(--font-utility)", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600 }}>
              Treatment
            </label>
            <select id="appt-treatment" name="treatment" value={form.treatment} onChange={handleChange}
              style={{ ...inputStyle, cursor: "pointer", colorScheme: isDark ? "dark" : "light" }}
              onFocus={(e) => { e.target.style.borderColor = inputFocus; }}
              onBlur={(e)  => { e.target.style.borderColor = inputBorder; }}
            >
              <option value="">Select a treatment (optional)</option>
              {TREATMENTS.map((t) => (
                <option key={t.id} value={t.title}>{t.title}</option>
              ))}
              <option value="General check-up">General check-up</option>
              <option value="Emergency / pain">Emergency / pain</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Date */}
          <div>
            <label htmlFor="appt-date" style={{ display: "block", fontSize: "0.75rem", color: labelColor, marginBottom: "0.4rem", fontFamily: "var(--font-utility)", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600 }}>
              Preferred date
            </label>
            <input id="appt-date" name="date" type="date" value={form.date} onChange={handleChange}
              style={{ ...inputStyle, colorScheme: isDark ? "dark" : "light" }}
              onFocus={(e) => { e.target.style.borderColor = inputFocus; }}
              onBlur={(e)  => { e.target.style.borderColor = inputBorder; }}
            />
          </div>

          {/* Notes */}
          <div>
            <label htmlFor="appt-message" style={{ display: "block", fontSize: "0.75rem", color: labelColor, marginBottom: "0.4rem", fontFamily: "var(--font-utility)", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600 }}>
              Additional notes
            </label>
            <textarea id="appt-message" name="message" rows={3} placeholder="Any details that would help us prepare…" value={form.message} onChange={handleChange}
              style={{ ...inputStyle, resize: "vertical", minHeight: "90px", lineHeight: 1.6 }}
              onFocus={(e) => { e.target.style.borderColor = inputFocus; }}
              onBlur={(e)  => { e.target.style.borderColor = inputBorder; }}
            />
          </div>

          {/* Placeholder colour via CSS — JS style objects can't set ::placeholder */}
          <style>{`
            #appt-name::placeholder,#appt-phone::placeholder,#appt-message::placeholder{color:${placeholderClr};}
          `}</style>

          <button type="submit" disabled={status === "sending"} className="btn btn-secondary"
            style={{ justifyContent: "center", opacity: status === "sending" ? 0.7 : 1, cursor: status === "sending" ? "wait" : "pointer", marginTop: "0.25rem" }}
            aria-busy={status === "sending"}
          >
            {status === "sending" ? "Sending…" : "Request Appointment"}
          </button>

          <p style={{ fontSize: "0.75rem", color: captionColor, textAlign: "center", lineHeight: 1.55 }}>
            By submitting you agree to be contacted by Smile Architects. Your details will not be shared.
          </p>
        </form>
      )}
    </div>
  );
}
