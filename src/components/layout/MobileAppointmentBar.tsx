"use client";

import Link from "next/link";
import { CLINIC } from "@/lib/site-config";
import { PhoneIcon, WhatsAppIcon, CalendarIcon } from "@/components/ui/icons";

/**
 * Floating action pill for mobile — fixed to bottom with proper safe-area.
 * z-index: 40 — above content, below navbar (1000), avoids chat bubbles.
 */
export default function MobileAppointmentBar() {
  return (
    <>
      {/* Floating Action Pill */}
      <div
        aria-label="Quick actions"
        role="navigation"
        style={{
          position: "fixed",
          // Use calc to sit above gesture zone + give visual breathing room
          bottom: "calc(env(safe-area-inset-bottom, 0px) + 1rem)",
          left: "1rem",
          right: "1rem",
          zIndex: 40,
          backgroundColor: "rgba(30, 60, 6, 0.95)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          borderRadius: "22px",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          padding: "0.625rem",
          display: "flex",
          gap: "0.5rem",
          boxShadow: "0 -2px 0 rgba(255,255,255,0.04), 0 8px 32px rgba(0,0,0,0.3)",
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
            padding: "0.75rem 0.5rem",
            backgroundColor: "rgba(255, 255, 255, 0.07)",
            color: "rgba(236, 245, 226, 0.9)",
            textDecoration: "none",
            borderRadius: "16px",
            fontSize: "0.8125rem",
            fontWeight: 600,
            fontFamily: "var(--font-sans)",
            minHeight: "44px",
          }}
          aria-label={`Call ${CLINIC.contact.phoneDisplay}`}
        >
          <PhoneIcon size="sm" />
          <span>Call</span>
        </a>

        {/* WhatsApp */}
        <a
          href={CLINIC.social.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            flex: 1.2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.375rem",
            padding: "0.75rem 0.5rem",
            backgroundColor: "#25D366",
            color: "#ffffff",
            textDecoration: "none",
            borderRadius: "16px",
            fontSize: "0.8125rem",
            fontWeight: 600,
            fontFamily: "var(--font-sans)",
            minHeight: "44px",
            boxShadow: "0 2px 8px rgba(37,211,102,0.3)",
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
            padding: "0.75rem 0.5rem",
            backgroundColor: "var(--color-jonquil)",
            color: "var(--color-dark-moss)",
            textDecoration: "none",
            borderRadius: "16px",
            fontSize: "0.8125rem",
            fontWeight: 700,
            fontFamily: "var(--font-sans)",
            minHeight: "44px",
            boxShadow: "0 2px 8px rgba(234,200,0,0.25)",
          }}
          aria-label="Book appointment"
        >
          <CalendarIcon size="sm" />
          <span>Book</span>
        </Link>
      </div>

      <style>{`
        /* Only show on mobile */
        @media (min-width: 768px) { 
          .mobile-action-bar { 
            display: none !important; 
          } 
        }
        
        /* Ensure content scrolls past the bar height + safe area */
        @media (max-width: 767px) {
          main {
            padding-bottom: calc(env(safe-area-inset-bottom, 0px) + 100px) !important;
          }
        }
      `}</style>
    </>
  );
}