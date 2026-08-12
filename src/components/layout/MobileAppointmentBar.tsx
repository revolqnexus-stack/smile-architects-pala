"use client";

import Link from "next/link";
import { CLINIC } from "@/lib/site-config";
import { PhoneIcon, WhatsAppIcon, CalendarIcon } from "@/components/ui/icons";

/**
 * Ultra-sleek floating action pill for mobile.
 * Minimal, rounded pill anchored to bottom with proper safe-area.
 */
export default function MobileAppointmentBar() {
  return (
    <>
      {/* Floating Action Pill */}
      <div
        aria-label="Quick actions"
        style={{
          position: "fixed",
          bottom: "max(1rem, env(safe-area-inset-bottom) + 1rem)", // Safe area + margin
          left: "1rem",
          right: "1rem",
          zIndex: 35, // Lower than navbar but above content
          backgroundColor: "rgba(37, 78, 6, 0.92)",
          backdropFilter: "blur(20px) saturate(160%)",
          WebkitBackdropFilter: "blur(20px) saturate(160%)",
          borderRadius: "20px",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          padding: "0.75rem",
          display: "flex",
          gap: "0.5rem",
          justifyContent: "space-between",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
        }}
        className="mobile-action-bar"
      >
        {/* Call */}
        <a
          href={`tel:${CLINIC.contact.phone}`}
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.375rem",
            padding: "0.75rem 0.875rem",
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            color: "var(--color-honeydew)",
            textDecoration: "none",
            borderRadius: "14px",
            fontSize: "0.8125rem", // Smaller text
            fontWeight: 600,
            fontFamily: "var(--font-sans)",
            transition: "all 0.2s ease",
            minHeight: "44px", // 44px minimum touch target
          }}
          onTouchStart={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.15)";
          }}
          onTouchEnd={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.08)";
          }}
          aria-label={`Call ${CLINIC.contact.phoneDisplay}`}
        >
          <PhoneIcon size="sm" />
          <span>Call</span>
        </a>

        {/* WhatsApp - Primary */}
        <a
          href={CLINIC.social.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            flex: 1.1, // Slightly larger for primary action
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.375rem",
            padding: "0.75rem 0.875rem",
            backgroundColor: "#25D366",
            color: "#ffffff",
            textDecoration: "none",
            borderRadius: "14px",
            fontSize: "0.8125rem", // Smaller text
            fontWeight: 600,
            fontFamily: "var(--font-sans)",
            transition: "all 0.2s ease",
            minHeight: "44px", // 44px minimum touch target
          }}
          onTouchStart={(e) => {
            e.currentTarget.style.backgroundColor = "#20BA5A";
          }}
          onTouchEnd={(e) => {
            e.currentTarget.style.backgroundColor = "#25D366";
          }}
          aria-label="Chat on WhatsApp"
        >
          <WhatsAppIcon size="sm" />
          <span>WhatsApp</span>
        </a>

        {/* Book */}
        <Link
          href="/book-appointment"
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.375rem",
            padding: "0.75rem 0.875rem",
            backgroundColor: "var(--color-jonquil)",
            color: "var(--color-dark-moss)",
            textDecoration: "none",
            borderRadius: "14px",
            fontSize: "0.8125rem", // Smaller text
            fontWeight: 600,
            fontFamily: "var(--font-sans)",
            transition: "all 0.2s ease",
            minHeight: "44px", // 44px minimum touch target
          }}
          onTouchStart={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-harvest-gold)";
          }}
          onTouchEnd={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-jonquil)";
          }}
          aria-label="Book appointment"
        >
          <CalendarIcon size="sm" />
          <span>Book</span>
        </Link>
      </div>

      <style>{`
        @media (min-width: 768px) { 
          .mobile-action-bar { 
            display: none !important; 
          } 
        }
        
        /* CRITICAL: Proper content padding so nothing is hidden by floating bar */
        @media (max-width: 767px) {
          main {
            padding-bottom: max(120px, env(safe-area-inset-bottom) + 120px) !important;
          }
        }
      `}</style>
    </>
  );
}


