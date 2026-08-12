"use client";

/**
 * HERO SECTION — Smile Architects
 *
 * Deliberate editorial composition for both desktop and mobile.
 * Desktop: text left, visual right (asymmetric grid)
 * Mobile:  eyebrow → headline → body → CTAs → visual (vertical stack, full width)
 */

import Link from "next/link";
import { motion } from "framer-motion";
import { ToothIcon, CheckIcon, ArrowRightIcon } from "@/components/ui/icons";

const EASE = [0.16, 1, 0.3, 1] as const;

interface HeroSectionProps {
  eyebrow: string;
  headlineLines: string[];
  accentLine?: string;
  body: string;
  primaryCTA: { text: string; href: string };
  secondaryCTA: { text: string; href: string };
  metaItems: Array<{ label: string; value: string }>;
}

export default function HeroSection({
  eyebrow,
  headlineLines,
  accentLine,
  body,
  primaryCTA,
  secondaryCTA,
  metaItems,
}: HeroSectionProps) {
  return (
    <section
      aria-labelledby="hero-heading"
      className="hero-section section-warm"
    >
      {/* Decorative glow */}
      <div className="hero-glow" aria-hidden="true" />

      <div className="container-xl hero-inner">

        {/* ── TEXT COLUMN ─────────────────────────────────────── */}
        <div className="hero-text">

          {/* Eyebrow */}
          <motion.p
            className="hero-eyebrow"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          >
            <span className="hero-eyebrow-line" aria-hidden="true" />
            {eyebrow}
          </motion.p>

          {/* Headline */}
          <motion.h1
            id="hero-heading"
            className="hero-headline"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          >
            {headlineLines.map((line, i) => (
              <span key={i} className="hero-headline-line">
                {accentLine && line === accentLine ? (
                  <span className="text-gradient-botanical">{line}</span>
                ) : (
                  line
                )}
              </span>
            ))}
          </motion.h1>

          {/* Body */}
          <motion.p
            className="hero-body"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
          >
            {body}
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="hero-ctas"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.42, ease: EASE }}
          >
            <Link href={primaryCTA.href} className="btn btn-primary btn-lg">
              {primaryCTA.text}
            </Link>
            <Link href={secondaryCTA.href} className="btn btn-secondary btn-lg">
              {secondaryCTA.text}
            </Link>
          </motion.div>

          {/* Meta strip */}
          <motion.div
            className="hero-meta"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {metaItems.map((item) => (
              <div key={item.label} className="hero-meta-item">
                <p className="hero-meta-label">{item.label}</p>
                <p className="hero-meta-value">{item.value}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── VISUAL COLUMN ───────────────────────────────────── */}
        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, y: 32, scale: 1.03 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.5, ease: EASE }}
        >
          {/* Main image frame */}
          <div className="hero-image-frame" aria-label="Smile Architects dental clinic in Pala, Kottayam">
            <div className="hero-image-content">
              {/* Clinic emblem */}
              <div className="hero-image-emblem">
                <ToothIcon size={48} color="var(--color-dark-moss)" stroke={1.5} />
              </div>
              <p className="hero-image-title">Smile Architects</p>
              <p className="hero-image-sub">Multispeciality Dental Clinic<br />Pala, Kottayam</p>
              <ul className="hero-image-features">
                <li><CheckIcon size="sm" color="var(--color-jonquil)" stroke={2} /> MDS Orthodontist</li>
                <li><CheckIcon size="sm" color="var(--color-jonquil)" stroke={2} /> Digital X-Ray</li>
                <li><CheckIcon size="sm" color="var(--color-jonquil)" stroke={2} /> Modern Equipment</li>
              </ul>
            </div>
            <div className="hero-image-glow" aria-hidden="true" />
          </div>

          {/* Floating stat badge */}
          <div className="hero-stat-badge">
            <p className="hero-stat-number">15+</p>
            <p className="hero-stat-label">Years of Excellence</p>
          </div>
        </motion.div>

      </div>

      <style>{`
        .hero-section {
          padding-top: clamp(4rem, 10vw, 8rem);
          padding-bottom: clamp(4rem, 10vw, 8rem);
          position: relative;
          overflow: hidden;
        }

        .hero-glow {
          position: absolute;
          top: -15%;
          right: -5%;
          width: 480px;
          height: 480px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(234,200,0,0.09) 0%, transparent 65%);
          pointer-events: none;
        }

        .hero-inner {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: center;
        }

        @media (min-width: 900px) {
          .hero-inner {
            grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr);
            gap: 5rem;
          }
        }

        /* Text column */
        .hero-text {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .hero-eyebrow {
          font-size: 0.8125rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-olive);
          font-weight: 600;
          font-family: var(--font-utility);
          display: flex;
          align-items: center;
          gap: 0.625rem;
          margin-bottom: 1.375rem;
        }

        .hero-eyebrow-line {
          display: inline-block;
          width: 28px;
          height: 2px;
          background: var(--color-jonquil);
          flex-shrink: 0;
        }

        .hero-headline {
          font-family: var(--font-serif);
          font-size: clamp(2.75rem, 7vw + 0.5rem, 5.25rem);
          font-weight: 400;
          color: var(--color-dark-moss);
          line-height: 1.02;
          letter-spacing: -0.03em;
          margin-bottom: 1.625rem;
        }

        .hero-headline-line {
          display: block;
        }

        .hero-body {
          font-size: clamp(0.9375rem, 2vw, 1.125rem);
          color: var(--color-cafe-noir);
          line-height: 1.75;
          max-width: 540px;
          font-family: var(--font-sans);
          margin-bottom: 2.25rem;
        }

        .hero-ctas {
          display: flex;
          gap: 0.875rem;
          flex-wrap: wrap;
          margin-bottom: 2.5rem;
        }

        /* On medium mobile: stack CTAs side-by-side */
        @media (max-width: 600px) {
          .hero-ctas {
            gap: 0.75rem;
          }
          .hero-ctas .btn {
            flex: 1 1 auto;
            min-width: 140px;
            padding: 1rem 1.5rem;
          }
        }

        /* On small mobile: stack CTAs full-width */
        @media (max-width: 420px) {
          .hero-ctas {
            flex-direction: column;
            gap: 1rem;
          }
          .hero-ctas .btn {
            width: 100%;
            justify-content: center;
            text-align: center;
            padding: 1.25rem 1.5rem;
          }
        }

        .hero-meta {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 1.25rem;
          padding-top: 1.75rem;
          border-top: 1.5px solid var(--color-tea-green);
        }

        @media (max-width: 480px) {
          .hero-meta {
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem 1rem;
            padding-top: 1.5rem;
          }
        }

        @media (max-width: 320px) {
          .hero-meta {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
        }

        .hero-meta-label {
          font-size: 0.6875rem;
          color: var(--color-olive);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-family: var(--font-utility);
          margin-bottom: 0.25rem;
        }

        .hero-meta-value {
          font-size: 0.9375rem;
          color: var(--color-dark-moss);
          font-family: var(--font-sans);
          font-weight: 500;
        }

        /* Visual column */
        .hero-visual {
          position: relative;
        }

        /* On mobile, visual sits below text with reduced aspect ratio */
        @media (max-width: 899px) {
          .hero-visual {
            max-width: 480px;
            margin: 0 auto;
            width: 100%;
          }
        }

        .hero-image-frame {
          width: 100%;
          aspect-ratio: 3 / 4;
          border-radius: var(--radius-2xl);
          border: 2.5px solid var(--color-dark-moss);
          background: linear-gradient(135deg, var(--color-honeydew) 0%, var(--color-tea-green) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          position: relative;
          box-shadow: var(--shadow-xl);
        }

        /* On mobile, 3:4 aspect ratio is too tall — switch to 4:3 landscape */
        @media (max-width: 899px) {
          .hero-image-frame {
            aspect-ratio: 4 / 3;
          }
          .hero-stat-badge {
            right: 0.75rem;
            bottom: -0.75rem;
          }
        }

        .hero-image-content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 2rem;
          gap: 0.625rem;
        }

        .hero-image-emblem {
          width: 88px;
          height: 88px;
          background: var(--color-tea-green);
          border: 2.5px solid var(--color-dark-moss);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: var(--shadow-md);
          margin-bottom: 0.375rem;
        }

        .hero-image-title {
          font-family: var(--font-serif);
          font-size: 1.25rem;
          font-weight: 500;
          color: var(--color-dark-moss);
        }

        .hero-image-sub {
          font-size: 0.875rem;
          color: var(--color-olive);
          font-family: var(--font-sans);
          font-weight: 500;
          line-height: 1.5;
        }

        .hero-image-features {
          list-style: none;
          padding: 0;
          margin-top: 0.375rem;
          display: flex;
          flex-direction: column;
          gap: 0.375rem;
          font-size: 0.875rem;
          color: var(--color-cafe-noir);
          font-family: var(--font-sans);
        }

        .hero-image-features li {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .hero-image-glow {
          position: absolute;
          bottom: -25%;
          left: -15%;
          width: 250px;
          height: 250px;
          border-radius: 50%;
          background: radial-gradient(circle, var(--color-jonquil) 0%, transparent 70%);
          opacity: 0.15;
          pointer-events: none;
        }

        .hero-stat-badge {
          position: absolute;
          bottom: -1.25rem;
          right: -1.25rem;
          background: var(--color-jonquil);
          border: 2px solid var(--color-dark-moss);
          border-radius: var(--radius-lg);
          padding: 1.125rem 1.375rem;
          box-shadow: var(--shadow-md);
          text-align: center;
        }

        .hero-stat-number {
          font-family: var(--font-serif);
          font-size: 2rem;
          font-weight: 700;
          color: var(--color-dark-moss);
          line-height: 1;
          margin-bottom: 0.25rem;
        }

        .hero-stat-label {
          font-size: 0.8125rem;
          color: var(--color-dark-moss);
          font-family: var(--font-sans);
          font-weight: 600;
          white-space: nowrap;
        }
      `}</style>
    </section>
  );
}
