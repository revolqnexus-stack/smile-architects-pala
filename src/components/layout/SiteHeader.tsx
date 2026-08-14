"use client";

/**
 * LIQUID GLASS FLOATING NAVBAR — Smile Architects
 *
 * Architectural concept: one floating glass object, not logo+links+buttons.
 *
 * Desktop: floating pill at top: 20px, max-width ~1400px, centered
 * Mobile:  floating pill at top: 12px, left/right: 16px
 *
 * Scroll states:
 *   at-top  → larger, lighter glass, subtle border
 *   scrolled → tighter, stronger blur, slightly more opaque, shadow
 *
 * Active page: persistent glass pill indicator on the nav item
 * Hover: translucent pill fades in behind each item + subtle y lift
 * Treatments: animated glass dropdown with staggered items
 * Mobile menu: full-screen dark-moss panel, staggered entrances
 */

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CLINIC } from "@/lib/site-config";

// ─── DATA ────────────────────────────────────────────────────────────────────

const NAV_TREATMENTS = [
  { label: "General Dentistry",   href: "/treatments/general-dentistry" },
  { label: "Orthodontics",        href: "/orthodontics" },
  { label: "Braces",              href: "/orthodontics/braces" },
  { label: "Lingual Braces",      href: "/orthodontics/lingual-braces" },
  { label: "Clear Aligners",      href: "/orthodontics/clear-aligners" },
  { label: "Dental Implants",     href: "/treatments/dental-implants" },
  { label: "Cosmetic Dentistry",  href: "/treatments/cosmetic-dentistry" },
  { label: "Smile Design",        href: "/treatments/smile-design" },
  { label: "Root Canal",          href: "/treatments/root-canal-treatment" },
  { label: "Paediatric Dentistry",href: "/treatments/pediatric-dentistry" },
];

const NAV_LINKS = [
  { label: "About",           href: "/about" },
  { label: "Our Doctors",     href: "/dentists" },
  { label: "Treatments",      href: "/treatments", hasDropdown: true },
  { label: "Dental Guides",   href: "/dental-guides" },
  { label: "Patient Stories", href: "/patient-stories" },
  { label: "Contact",         href: "/contact" },
];

const EASE_SPRING = [0.16, 1, 0.3, 1] as const;

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

export default function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled]         = useState(false);
  const [mobileOpen, setMobileOpen]     = useState(false);
  const [treatmentOpen, setTreatmentOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  /* scroll detection */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* close treatment dropdown on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node))
        setTreatmentOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* lock body scroll when mobile menu open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  /* close mobile menu on route change */
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const closeMobile = () => setMobileOpen(false);

  // Glass layer values — crisp, minimal glass effect (NO MUDDY BACKGROUNDS)
  const bgOpacity   = scrolled ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.35)";
  const blurAmount  = "blur(16px)";
  const shadowValue = scrolled
    ? "0 4px 6px -1px rgba(0,0,0,0.05)"
    : "0 2px 4px -1px rgba(0,0,0,0.03)";
  const borderColor = "rgba(255,255,255,0.6)";

  return (
    <>
      {/* ── LIQUID GLASS NAVBAR (FULL WIDTH FILLED) ──────────────────────────────────── */}
      <motion.header
        role="banner"
        initial={{ opacity: 0, y: -10 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          backgroundColor: bgOpacity,
          boxShadow: shadowValue,
          borderBottomColor: borderColor,
        }}
        transition={{ duration: 0.5, ease: EASE_SPRING }}
        className="navbar-root"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          backdropFilter: blurAmount,
          WebkitBackdropFilter: blurAmount,
          borderBottom: "1px solid",
          // Clean glass highlight layer
          backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 100%)",
        }}
      >
        <div
          className="navbar-container"
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: scrolled ? "0.75rem 1.5rem" : "1rem 1.5rem",
            gap: "2rem",
            transition: "padding 0.3s cubic-bezier(0.16,1,0.3,1)",
            position: "relative",
          }}
        >
          {/* Glass inner highlight - subtle shine */}
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "1px",
            background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
            pointerEvents: "none",
          }} aria-hidden="true" />

          {/* ── LOGO ─────────────────────────────────────────── */}
          <Link
            href="/"
            aria-label="Smile Architects — Home"
            style={{ textDecoration: "none", flexShrink: 0, zIndex: 1 }}
          >
            <motion.div 
              className="navbar-logo-wrapper"
              whileHover={{ scale: 1.02 }} 
              transition={{ duration: 0.2 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.625rem",
              }}
            >
              {/* Logo icon - desktop logo.png */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo.png"
                alt=""
                aria-hidden="true"
                className="navbar-logo-img navbar-logo-desktop"
                style={{
                  height: scrolled ? "36px" : "40px",
                  width: "auto",
                  objectFit: "contain",
                  transition: "height 0.3s cubic-bezier(0.16,1,0.3,1)",
                }}
              />
              {/* Logo icon - mobile MOBILE LOGO.png */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/MOBILE LOGO.png"
                alt=""
                aria-hidden="true"
                className="navbar-logo-img navbar-logo-mobile"
                style={{
                  height: scrolled ? "36px" : "40px",
                  width: "auto",
                  objectFit: "contain",
                  transition: "height 0.3s cubic-bezier(0.16,1,0.3,1)",
                  display: "none",
                }}
              />
              {/* Wordmark - mobile only */}
              <span
                className="navbar-logo-text"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: scrolled ? "1.125rem" : "1.25rem",
                  fontWeight: 400,
                  color: "var(--color-dark-moss)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                  whiteSpace: "nowrap",
                  transition: "font-size 0.3s cubic-bezier(0.16,1,0.3,1)",
                }}
              >
                Smile Architects
              </span>
            </motion.div>
          </Link>

          {/* ── DESKTOP NAV ──────────────────────────────────── */}
          <nav
            aria-label="Main navigation"
            className="navbar-nav"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2px",
              flex: 1,
              justifyContent: "center",
            }}
          >
            {NAV_LINKS.map((link) =>
              link.hasDropdown ? (
                <TreatmentsDropdown
                  key={link.label}
                  ref={dropdownRef}
                  open={treatmentOpen}
                  onToggle={() => setTreatmentOpen((v) => !v)}
                  onClose={() => setTreatmentOpen(false)}
                  isActive={pathname.startsWith("/treatments")}
                />
              ) : (
                <NavItem
                  key={link.label}
                  href={link.href}
                  label={link.label}
                  isActive={
                    link.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(link.href)
                  }
                />
              )
            )}
          </nav>

          {/* ── DESKTOP ACTIONS ──────────────────────────────── */}
          <div
            className="navbar-actions"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              flexShrink: 0,
              zIndex: 1,
            }}
          >
            {/* WhatsApp glass pill */}
            <motion.a
              href={CLINIC.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.18 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "0.5rem 1.125rem",
                borderRadius: "9999px",
                border: "1px solid rgba(126,132,7,0.3)",
                backgroundColor: "rgba(215,227,164,0.35)",
                backdropFilter: "blur(8px)",
                fontSize: "0.8125rem", // Smaller action buttons (13px)
                fontWeight: 600,
                color: "var(--color-dark-moss)",
                fontFamily: "var(--font-sans)",
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              <WhatsAppIcon />
              WhatsApp
            </motion.a>

            {/* Book Appointment — yellow CTA pill */}
            <motion.div
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.18 }}
            >
              <Link
                href="/book-appointment"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "0.5625rem 1.375rem",
                  borderRadius: "9999px",
                  backgroundColor: "var(--color-jonquil)",
                  border: "1px solid rgba(37,78,6,0.15)",
                  fontSize: "0.8125rem", // Smaller action buttons (13px)
                  fontWeight: 700,
                  color: "var(--color-dark-moss)",
                  fontFamily: "var(--font-sans)",
                  textDecoration: "none",
                  boxShadow: "0 2px 12px rgba(234,200,0,0.35)",
                  whiteSpace: "nowrap",
                  letterSpacing: "0.01em",
                }}
              >
                Book Appointment
                <ArrowIcon />
              </Link>
            </motion.div>
          </div>

          {/* ── HAMBURGER (mobile) ───────────────────────────── */}
          <button
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen((v) => !v)}
            className="hamburger-btn"
            style={{
              display: "none",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "5px",
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              background: "rgba(215,227,164,0.4)",
              border: "1px solid rgba(126,132,7,0.2)",
              cursor: "pointer",
              flexShrink: 0,
              zIndex: 1,
              transition: "all 0.2s ease",
            }}
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.22 }}
              style={{ display: "block", width: "18px", height: "1.5px", background: "var(--color-dark-moss)", borderRadius: "2px", transformOrigin: "center" }}
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.18 }}
              style={{ display: "block", width: "18px", height: "1.5px", background: "var(--color-dark-moss)", borderRadius: "2px" }}
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.22 }}
              style={{ display: "block", width: "18px", height: "1.5px", background: "var(--color-dark-moss)", borderRadius: "2px", transformOrigin: "center" }}
            />
          </button>

        </div>
      </motion.header>

      {/* ── FULL-SCREEN MOBILE MENU ──────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && <MobileMenu onClose={closeMobile} pathname={pathname} />}
      </AnimatePresence>

      <style>{`
        /* Desktop: show nav + actions, hide hamburger, hide clinic name, larger logo, show desktop logo */
        @media (min-width: 1024px) {
          .navbar-nav    { display: flex !important; }
          .navbar-actions { display: flex !important; }
          .hamburger-btn { display: none !important; }
          .navbar-logo-text { display: none !important; }
          .navbar-logo-desktop { display: block !important; height: 70px !important; }
          .navbar-logo-mobile { display: none !important; }
        }
        /* Mobile/tablet: hide nav + actions, show hamburger, show clinic name, show mobile logo */
        @media (max-width: 1023px) {
          .navbar-nav     { display: none !important; }
          .navbar-actions { display: none !important; }
          .hamburger-btn  { display: flex !important; }
          .navbar-logo-text { display: block !important; }
          .navbar-logo-desktop { display: none !important; }
          .navbar-logo-mobile { display: block !important; }
        }
        
        /* MOBILE NAVBAR - Filled glass bar */
        @media (max-width: 768px) {
          .navbar-container {
            padding: 0.875rem 1rem !important;
          }
          .navbar-logo-text {
            font-size: 1.0625rem !important;
          }
          .hamburger-btn:active {
            transform: scale(0.95);
          }
        }
        
        /* Extra small screens */
        @media (max-width: 480px) {
          .navbar-container {
            padding: 0.75rem 0.875rem !important;
            gap: 1rem !important;
          }
        }
        
        /* Ensure links have min tap height */
        .navbar-root a, .navbar-root button { min-height: 36px; }
      `}</style>
    </>
  );
}

// ─── NAV ITEM — desktop link with hover pill + active indicator ──────────────

function NavItem({
  href,
  label,
  isActive,
}: {
  href: string;
  label: string;
  isActive: boolean;
}) {
  return (
    <Link href={href} style={{ textDecoration: "none", position: "relative" }}>
      <motion.div
        whileHover="hover"
        initial="rest"
        animate="rest"
        style={{ position: "relative", padding: "0.4375rem 0.75rem" }}
      >
        {/* Hover/active glass pill */}
        <motion.span
          aria-hidden="true"
          variants={{
            rest:  { opacity: isActive ? 1 : 0 },
            hover: { opacity: 1 },
          }}
          transition={{ duration: 0.18 }}
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "9999px",
            backgroundColor: isActive
              ? "rgba(215,227,164,0.55)"
              : "rgba(215,227,164,0.4)",
            border: isActive ? "1px solid rgba(126,132,7,0.3)" : "1px solid rgba(126,132,7,0.18)",
          }}
        />
        {/* Label — subtle lift on hover */}
        <motion.span
          variants={{ rest: { y: 0 }, hover: { y: -1 } }}
          transition={{ duration: 0.18 }}
          style={{
            position: "relative",
            fontSize: "0.875rem", // Smaller text for minimal navbar (14px)
            fontWeight: isActive ? 600 : 500,
            color: isActive ? "var(--color-dark-moss)" : "var(--color-olive)",
            fontFamily: "var(--font-sans)",
            display: "block",
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </motion.span>
      </motion.div>
    </Link>
  );
}

// ─── TREATMENTS DROPDOWN ──────────────────────────────────────────────────────

import { forwardRef } from "react";

const TreatmentsDropdown = forwardRef<
  HTMLDivElement,
  { open: boolean; onToggle: () => void; onClose: () => void; isActive: boolean }
>(function TreatmentsDropdown({ open, onToggle, onClose, isActive }, ref) {
  return (
    <div ref={ref} style={{ position: "relative" }}>
      {/* Trigger button styled like a NavItem */}
      <motion.button
        onClick={onToggle}
        aria-haspopup="true"
        aria-expanded={open}
        whileHover="hover"
        initial="rest"
        animate="rest"
        style={{
          position: "relative",
          padding: "0.4375rem 0.75rem",
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "4px",
        }}
      >
        <motion.span
          aria-hidden="true"
          variants={{
            rest:  { opacity: isActive || open ? 1 : 0 },
            hover: { opacity: 1 },
          }}
          transition={{ duration: 0.18 }}
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "9999px",
            backgroundColor: isActive || open
              ? "rgba(215,227,164,0.55)"
              : "rgba(215,227,164,0.4)",
            border: "1px solid rgba(126,132,7,0.2)",
          }}
        />
        <motion.span
          variants={{ rest: { y: 0 }, hover: { y: -1 } }}
          transition={{ duration: 0.18 }}
          style={{
            position: "relative",
            fontSize: "0.875rem", // Smaller text for minimal navbar (14px)
            fontWeight: isActive || open ? 600 : 500,
            color: isActive || open ? "var(--color-dark-moss)" : "var(--color-olive)",
            fontFamily: "var(--font-sans)",
            whiteSpace: "nowrap",
          }}
        >
          Treatments
        </motion.span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.22 }}
          style={{ position: "relative", display: "flex", alignItems: "center" }}
        >
          <ChevronIcon />
        </motion.span>
      </motion.button>

      {/* Dropdown panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: 10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0,  scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "absolute",
              top: "calc(100% + 14px)",
              left: "50%",
              transform: "translateX(-50%)",
              width: "260px",
              backgroundColor: "rgba(240,246,228,0.88)",
              backdropFilter: "blur(28px) saturate(160%)",
              WebkitBackdropFilter: "blur(28px) saturate(160%)",
              border: "1px solid rgba(215,227,164,0.6)",
              borderRadius: "20px",
              padding: "0.625rem",
              boxShadow: "0 16px 48px rgba(37,78,6,0.14), inset 0 1px 0 rgba(255,255,255,0.5)",
              zIndex: 200,
              // Glass highlight
              backgroundImage: "linear-gradient(170deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 40%)",
            }}
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.04, delayChildren: 0.04 } },
              }}
            >
              {NAV_TREATMENTS.map((t) => (
                <motion.div
                  key={t.href}
                  variants={{
                    hidden:   { opacity: 0, x: -8 },
                    visible:  { opacity: 1, x: 0, transition: { duration: 0.25 } },
                  }}
                >
                  <Link
                    href={t.href}
                    role="menuitem"
                    onClick={onClose}
                    className="dropdown-item"
                  >
                    {t.label}
                  </Link>
                </motion.div>
              ))}
              <div style={{ borderTop: "1px solid rgba(126,132,7,0.15)", marginTop: "6px", paddingTop: "6px" }}>
                <Link href="/treatments" role="menuitem" onClick={onClose} className="dropdown-item dropdown-item-all">
                  View all treatments <ArrowIcon />
                </Link>
              </div>
            </motion.div>

            {/* Dropdown glass highlight */}
            <div style={{
              position: "absolute", inset: 0, borderRadius: "inherit",
              background: "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 50%)",
              pointerEvents: "none",
            }} aria-hidden="true" />
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .dropdown-item {
          display: block;
          padding: 0.5625rem 0.875rem;
          font-size: 0.9rem;
          color: var(--color-dark-moss);
          font-family: var(--font-sans);
          font-weight: 500;
          border-radius: 12px;
          text-decoration: none;
          transition: background 0.15s;
        }
        .dropdown-item:hover {
          background: rgba(215,227,164,0.5);
          color: var(--color-dark-moss);
        }
        .dropdown-item-all {
          color: var(--color-olive);
          font-weight: 600;
        }
      `}</style>
    </div>
  );
});

// ─── MOBILE MENU ─────────────────────────────────────────────────────────────

function MobileMenu({ onClose, pathname }: { onClose: () => void; pathname: string }) {
  return (
    <motion.div
      id="mobile-nav"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      initial={{ opacity: 0, clipPath: "inset(0 0 100% 0 round 28px)" }}
      animate={{ opacity: 1, clipPath: "inset(0 0 0% 0 round 0px)" }}
      exit={{ opacity: 0, clipPath: "inset(0 0 100% 0 round 28px)" }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999,
        backgroundColor: "var(--color-dark-moss)",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
      }}
    >
      {/* Menu header */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "clamp(1.25rem, 5vw, 1.75rem) clamp(1.25rem, 6vw, 2rem)",
        borderBottom: "1px solid rgba(215,227,164,0.12)",
        flexShrink: 0,
      }}>
        <Link href="/" onClick={onClose} style={{ textDecoration: "none" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo.png"
            alt="Smile Architects"
            style={{
              height: "28px",
              width: "auto",
              objectFit: "contain",
              filter: "brightness(0) invert(1)", // Make logo white for dark mobile menu
            }}
          />
        </Link>
        <motion.button
          onClick={onClose}
          aria-label="Close menu"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.93 }}
          style={{
            width: "44px", height: "44px",
            borderRadius: "12px",
            background: "rgba(215,227,164,0.1)",
            border: "1px solid rgba(215,227,164,0.2)",
            cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "var(--color-honeydew)",
            flexShrink: 0,
          }}
        >
          <CloseIcon />
        </motion.button>
      </div>

      {/* Nav links */}
      <nav
        aria-label="Mobile navigation"
        style={{
          flex: 1,
          padding: "clamp(1.75rem, 5vw, 2.5rem) clamp(1.25rem, 6vw, 2rem)",
          display: "flex",
          flexDirection: "column",
          gap: "0",
        }}
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07, delayChildren: 0.12 } } }}
        >
          {NAV_LINKS.map((link, i) => {
            const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <motion.div
                key={link.label}
                variants={{
                  hidden:  { opacity: 0, x: -28 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.42, ease: [0.16,1,0.3,1] } },
                }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "clamp(1rem, 3.5vw, 1.375rem) 0",
                    fontSize: "clamp(1.4375rem, 6vw, 1.875rem)",
                    color: isActive ? "var(--color-jonquil)" : "var(--color-honeydew)",
                    fontFamily: "var(--font-serif)",
                    fontWeight: 400,
                    borderBottom: "1px solid rgba(215,227,164,0.1)",
                    textDecoration: "none",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {link.label}
                  <span style={{
                    color: isActive ? "var(--color-jonquil)" : "rgba(215,227,164,0.4)",
                    transition: "color 0.2s",
                    display: "flex",
                    alignItems: "center",
                  }}><ArrowIcon /></span>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Treatment chips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          style={{ marginTop: "2.5rem" }}
        >
          <p style={{
            fontSize: "0.625rem",
            color: "var(--color-tea-green)",
            textTransform: "uppercase",
            letterSpacing: "0.14em",
            fontFamily: "var(--font-utility)",
            fontWeight: 600,
            marginBottom: "1rem",
            opacity: 0.7,
          }}>
            Treatments
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {NAV_TREATMENTS.slice(0, 6).map((t) => (
              <Link
                key={t.href}
                href={t.href}
                onClick={onClose}
                style={{
                  fontSize: "0.8125rem",
                  color: "rgba(236,245,226,0.8)",
                  fontFamily: "var(--font-sans)",
                  padding: "0.4375rem 0.875rem",
                  border: "1px solid rgba(215,227,164,0.22)",
                  borderRadius: "9999px",
                  textDecoration: "none",
                  transition: "border-color 0.2s, background 0.2s",
                  backgroundColor: "rgba(215,227,164,0.05)",
                }}
              >
                {t.label}
              </Link>
            ))}
          </div>
        </motion.div>
      </nav>

      {/* Bottom CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.4, ease: [0.16,1,0.3,1] }}
        style={{
          padding: "clamp(1.25rem, 5vw, 1.75rem) clamp(1.25rem, 6vw, 2rem)",
          borderTop: "1px solid rgba(215,227,164,0.12)",
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
          flexShrink: 0,
        }}
      >
        <Link
          href="/book-appointment"
          onClick={onClose}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            backgroundColor: "var(--color-jonquil)",
            color: "var(--color-dark-moss)",
            fontFamily: "var(--font-sans)",
            fontWeight: 700,
            fontSize: "1rem",
            padding: "1rem 1.5rem",
            borderRadius: "9999px",
            textDecoration: "none",
            minHeight: "56px",
            boxShadow: "0 4px 20px rgba(234,200,0,0.3)",
            letterSpacing: "0.01em",
          }}
        >
          Book an Appointment <ArrowIcon />
        </Link>
        <a
          href={`tel:${CLINIC.contact.phone}`}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            backgroundColor: "rgba(236,245,226,0.08)",
            color: "var(--color-honeydew)",
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            fontSize: "0.9375rem",
            padding: "0.875rem 1.5rem",
            borderRadius: "9999px",
            textDecoration: "none",
            border: "1px solid rgba(215,227,164,0.2)",
            minHeight: "52px",
          }}
        >
          <PhoneIcon /> Call {CLINIC.contact.phoneDisplay}
        </a>
      </motion.div>
    </motion.div>
  );
}

// ─── ICONS ───────────────────────────────────────────────────────────────────

function ChevronIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true" style={{ color: "var(--color-olive)" }}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0 0 20.885 3.49z"/>
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.28h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.5a16 16 0 0 0 6 6l.97-.97a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.73 16z"/>
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}
