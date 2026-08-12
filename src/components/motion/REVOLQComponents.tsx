"use client";

/**
 * EDITORIAL MOTION SYSTEM — Smile Architects
 * 
 * Premium framer-motion components for editorial healthcare design.
 * Runs on both desktop and mobile — no "mobile only" restriction.
 */

import { type ReactNode, useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  type Variants,
} from "framer-motion";

// ─── EASINGS ─────────────────────────────────────────────────────────────────

export const EASE_SMOOTH  = [0.16, 1, 0.3, 1] as const;
export const EASE_NATURAL = [0.25, 0.1, 0.25, 1] as const;

// ─── SHARED INTERFACE ────────────────────────────────────────────────────────

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}

// ─── CORE PRIMITIVES ─────────────────────────────────────────────────────────

/** Fade + rise from 24px — most common entrance */
export function RevealUp({ children, delay = 0, className, style }: RevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.7, delay, ease: EASE_SMOOTH }}
    >
      {children}
    </motion.div>
  );
}

/** Pure opacity fade — no movement */
export function RevealFade({ children, delay = 0, className, style }: RevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8, delay, ease: EASE_NATURAL }}
    >
      {children}
    </motion.div>
  );
}

/** Reveal with clip-path mask — for images and visual blocks */
export function ImageReveal({
  children,
  delay = 0,
  className,
  style,
}: RevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ overflow: "hidden", ...style }}
      initial={{ clipPath: "inset(100% 0% 0% 0%)", scale: 1.05 }}
      animate={
        inView
          ? { clipPath: "inset(0% 0% 0% 0%)", scale: 1 }
          : { clipPath: "inset(100% 0% 0% 0%)", scale: 1.05 }
      }
      transition={{ duration: 1.1, delay, ease: EASE_SMOOTH }}
    >
      {children}
    </motion.div>
  );
}

// ─── STAGGER SYSTEM ──────────────────────────────────────────────────────────

interface StaggerContainerProps {
  children: ReactNode;
  /** Seconds between each child reveal */
  stagger?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function StaggerContainer({
  children,
  stagger = 0.09,
  className,
  style,
}: StaggerContainerProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -5% 0px" });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: stagger, delayChildren: 0.05 },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE_SMOOTH },
  },
};

export function StaggerItem({ children, className, style }: Omit<RevealProps, "delay">) {
  return (
    <motion.div className={className} style={style} variants={itemVariants}>
      {children}
    </motion.div>
  );
}

// ─── SECTION STAGGER (eyebrow → heading → body → content → cta) ─────────────

const SECTION_DELAYS = {
  eyebrow:  0,
  heading:  0.1,
  body:     0.2,
  content:  0.3,
  cta:      0.4,
} as const;

interface StaggerRevealProps extends Omit<RevealProps, "delay"> {
  type: keyof typeof SECTION_DELAYS;
}

export function StaggerReveal({ children, type, className, style }: StaggerRevealProps) {
  return (
    <RevealUp delay={SECTION_DELAYS[type]} className={className} style={style}>
      {children}
    </RevealUp>
  );
}

// ─── HOVER PRIMITIVES ────────────────────────────────────────────────────────

interface HoverScaleProps {
  children: ReactNode;
  scale?: number;
  className?: string;
  style?: React.CSSProperties;
}

/** Subtle scale on hover — no framer props leak to DOM */
export function HoverScale({ children, scale = 1.02, className, style }: HoverScaleProps) {
  return (
    <motion.div
      className={className}
      style={style}
      whileHover={{ scale }}
      whileTap={{ scale: scale * 0.98 }}
      transition={{ duration: 0.2, ease: EASE_NATURAL }}
    >
      {children}
    </motion.div>
  );
}

/** Magnetic pull toward cursor */
export function MagneticButton({ children, className, style }: Omit<HoverScaleProps, "scale">) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 25, stiffness: 300 });
  const springY = useSpring(y, { damping: 25, stiffness: 300 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.18);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.18);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ ...style, x: springX, y: springY, display: "inline-block" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      whileTap={{ scale: 0.96 }}
    >
      {children}
    </motion.div>
  );
}

// ─── TEXT REVEAL ─────────────────────────────────────────────────────────────

interface TextRevealProps extends Omit<RevealProps, "children"> {
  children: string;
  stagger?: number;
}

/** Word-by-word text reveal */
export function TextReveal({ children, delay = 0, stagger = 0.04, className, style }: TextRevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  return (
    <motion.span
      ref={ref}
      className={className}
      style={style}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {children.split(" ").map((word, i) => (
        <motion.span
          key={i}
          style={{ display: "inline-block", marginRight: "0.28em" }}
          variants={{
            hidden: { opacity: 0, y: 18 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_SMOOTH } },
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}
