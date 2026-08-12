/**
 * SMILE ARCHITECTS — MOTION DESIGN SYSTEM
 * 
 * Motion is part of the brand identity.
 * Motion should feel: fluid, organic, sophisticated, editorial, tactile, responsive, alive.
 * 
 * This is NOT a collection of random animations.
 * This is a deliberate motion language.
 */

import type { Transition, Variants } from "framer-motion";

// ─── MOTION TOKENS ────────────────────────────────────────────────────────

/**
 * Timing scales for different interaction types
 */
export const duration = {
  /** UI micro-interactions: 150–200ms */
  fast: 0.15,
  /** Interactive elements: 250–400ms */
  interactive: 0.3,
  /** Content reveals: 600–900ms */
  reveal: 0.7,
  /** Hero/primary reveals: 800–1200ms */
  hero: 1.0,
  /** Organic ambient motion: 8–15s */
  organic: 10,
} as const;

/**
 * Easing curves — prefer natural, sophisticated motion
 * Primary easing matches REVOLQ's smooth, slightly elastic feel
 */
export const ease = {
  /** Primary easing — smooth with slight elastic feel (matches REVOLQ) */
  primary: [0.16, 1, 0.3, 1] as const,
  /** Natural smooth easing */
  natural: [0.4, 0, 0.2, 1] as const,
  /** Smooth out (content entering) */
  out: [0.22, 1, 0.36, 1] as const,
  /** Smooth in (content leaving) */
  in: [0.4, 0, 1, 1] as const,
  /** Smooth in-out */
  inOut: [0.45, 0.05, 0.55, 0.95] as const,
  /** Editorial reveal */
  editorial: [0.6, 0.14, 0, 1] as const,
  /** Curtain slide (preloader style) */
  curtain: [0.76, 0, 0.24, 1] as const,
} as const;

/**
 * Spring configurations for organic motion
 */
export const spring = {
  /** Gentle spring for UI */
  gentle: { type: "spring", stiffness: 100, damping: 15 } as const,
  /** Smooth spring for content */
  smooth: { type: "spring", stiffness: 80, damping: 20 } as const,
  /** Bouncy for playful elements */
  bouncy: { type: "spring", stiffness: 200, damping: 10 } as const,
} as const;

// ─── TRANSITION PRESETS ───────────────────────────────────────────────────

export const transition = {
  fast: { duration: duration.fast, ease: ease.primary } as Transition,
  interactive: { duration: duration.interactive, ease: ease.primary } as Transition,
  reveal: { duration: 0.6, ease: ease.primary } as Transition,
  revealMobile: { duration: 0.65, ease: ease.primary } as Transition,
  hero: { duration: duration.hero, ease: ease.primary } as Transition,
  organic: { duration: duration.organic, ease: ease.inOut, repeat: Infinity, repeatType: "reverse" as const } as Transition,
  curtain: { duration: 1.1, ease: ease.curtain } as Transition,
} as const;

// ─── MOTION PRIMITIVES ────────────────────────────────────────────────────

/**
 * RevealUp — Classic content reveal with upward translation
 * Mobile-optimized with REVOLQ-style easing
 */
export const revealUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: transition.revealMobile,
  },
};

/**
 * RevealFade — Simple fade without translation
 */
export const revealFade: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: transition.revealMobile,
  },
};

/**
 * RevealScale — Subtle scale reveal for images/cards
 */
export const revealScale: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: transition.revealMobile,
  },
};

/**
 * ImageReveal — Image reveal with scale effect
 * Container clips, image scales from 1.03 to 1 (REVOLQ pattern)
 */
export const imageReveal: Variants = {
  hidden: { 
    clipPath: "inset(8% 8% 8% 8%)",
  },
  visible: { 
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 0.8, ease: ease.primary },
  },
};

export const imageScale: Variants = {
  hidden: { scale: 1.03 },
  visible: { 
    scale: 1,
    transition: { duration: 0.85, ease: ease.primary },
  },
};

/**
 * HorizontalReveal — Enter from side
 */
export const horizontalReveal: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: transition.reveal,
  },
};

/**
 * Hero entrance sequence timings
 */
export const heroSequence = {
  eyebrow: { delay: 0.1, duration: 0.4 },
  headline: { delay: 0.2, duration: 0.8 },
  headlineStagger: 0.1,
  body: { delay: 0.5, duration: 0.6 },
  cta: { delay: 0.7, duration: 0.5 },
  visual: { delay: 0.4, duration: 1.0 },
  accent: { delay: 0.9, duration: 0.6 },
} as const;

/**
 * Typography reveal — for editorial headings
 */
export const typographyReveal: Variants = {
  hidden: { 
    opacity: 0,
    y: 20,
    clipPath: "inset(0 0 100% 0)",
  },
  visible: { 
    opacity: 1,
    y: 0,
    clipPath: "inset(0 0 0% 0)",
    transition: { 
      duration: 0.8, 
      ease: ease.editorial,
    },
  },
};

/**
 * Stagger configuration for sequential reveals
 * Pattern: 60-120ms delays between sequential elements (REVOLQ standard)
 */
export const stagger = {
  tight: { staggerChildren: 0.06 },      // 60ms — compact lists
  normal: { staggerChildren: 0.08 },     // 80ms — standard cards/items
  comfortable: { staggerChildren: 0.1 },  // 100ms — feature sections
  spacious: { staggerChildren: 0.12 },   // 120ms — editorial content
  editorial: { staggerChildren: 0.12, delayChildren: 0.2 },
} as const;

/**
 * Container variants for staggered children
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// ─── ORGANIC MOTION ───────────────────────────────────────────────────────

/**
 * Ambient organic motion for decorative elements
 * Very subtle, botanical feel
 */
export const organicFloat: Variants = {
  initial: { y: 0, x: 0 },
  animate: { 
    y: [0, -15, 0],
    x: [0, 10, 0],
    transition: {
      duration: 12,
      ease: ease.inOut,
      repeat: Infinity,
    },
  },
};

/**
 * Gentle rotation for organic shapes
 */
export const organicRotate: Variants = {
  initial: { rotate: 0 },
  animate: { 
    rotate: [0, 2, -2, 0],
    transition: {
      duration: 15,
      ease: ease.inOut,
      repeat: Infinity,
    },
  },
};

// ─── HOVER INTERACTIONS ───────────────────────────────────────────────────

/**
 * Button hover state
 */
export const buttonHover = {
  y: -1,
  transition: { duration: 0.18, ease: ease.primary },
};

export const buttonTap = {
  scale: 0.98,
};

/**
 * Card hover state (REVOLQ-inspired)
 */
export const cardHover = {
  y: -2,
  transition: { duration: 0.26, ease: ease.primary },
};

/**
 * Arrow movement on hover
 */
export const arrowHover = {
  x: 4,
  y: -2,
  transition: { duration: 0.18, ease: ease.primary },
};

/**
 * Image hover subtle scale (REVOLQ pattern: 850ms)
 */
export const imageHover = {
  scale: 1.02,
  transition: { duration: 0.85, ease: ease.primary },
};

/**
 * Link gap expansion on hover
 */
export const linkGapHover = {
  gap: "12px",
  transition: { duration: 0.25, ease: ease.primary },
};

// ─── VIEWPORT CONFIGURATION ───────────────────────────────────────────────

/**
 * Viewport configuration for scroll-based reveals
 * Intersection Observer thresholds
 */
export const viewport = {
  /** Trigger when 20% visible */
  default: { once: true, amount: 0.2, margin: "0px 0px -10% 0px" } as const,
  /** Trigger when 30% visible */
  partial: { once: true, amount: 0.3, margin: "0px 0px -15% 0px" } as const,
  /** Trigger when fully visible */
  full: { once: true, amount: 0.8 } as const,
  /** Trigger immediately */
  immediate: { once: true, amount: 0.1, margin: "0px 0px 10% 0px" } as const,
  /** Mobile optimized — earlier trigger */
  mobile: { once: true, amount: 0.15, margin: "0px 0px -5% 0px" } as const,
} as const;

// ─── PAGE TRANSITIONS ─────────────────────────────────────────────────────

/**
 * Page enter animation
 */
export const pageTransition: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: ease.out },
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.3, ease: ease.in },
  },
};

// ─── REDUCED MOTION ───────────────────────────────────────────────────────

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

/**
 * Get safe transition (respects reduced motion)
 */
export const safeTransition = (normalTransition: Transition): Transition => {
  if (prefersReducedMotion()) {
    return { duration: 0.01 };
  }
  return normalTransition;
};

/**
 * Get safe variants (respects reduced motion)
 */
export const safeVariants = (variants: Variants): Variants => {
  if (prefersReducedMotion()) {
    // Return simplified variants with no animation
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.01 } },
    };
  }
  return variants;
};

// ─── PARALLAX ─────────────────────────────────────────────────────────────

/**
 * Parallax configuration (very subtle)
 */
export const parallax = {
  subtle: { y: [0, 20] } as const,
  moderate: { y: [0, 40] } as const,
} as const;

// ─── CROSSFADE TRANSITIONS ────────────────────────────────────────────────

/**
 * Crossfade pattern (inspired by REVOLQ exhibition wall)
 * Content fades out, new content fades in with staggered reveals
 */
export const crossfadeOut: Variants = {
  visible: { opacity: 1 },
  hidden: { 
    opacity: 0,
    transition: { duration: 0.2, ease: ease.primary },
  },
};

export const crossfadeIn: Variants = {
  hidden: { opacity: 0, y: 10, scale: 1.03 },
  visible: { 
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: ease.primary },
  },
};

/**
 * Staggered content reveal (for crossfade sequences)
 */
export const crossfadeStagger = {
  image: { delay: 0 },
  badge: { delay: 0.06 },
  category: { delay: 0.12 },
  title: { delay: 0.18 },
  description: { delay: 0.24 },
  tags: { delay: 0.3 },
} as const;

// ─── UTILITIES ────────────────────────────────────────────────────────────

/**
 * Create staggered delay for items (REVOLQ pattern: 60-120ms)
 */
export const getStaggerDelay = (index: number, baseDelay = 0.08): number => {
  return index * baseDelay;
};

/**
 * Combine variants
 */
export const combineVariants = (...variants: Variants[]): Variants => {
  return variants.reduce((acc, variant) => ({ ...acc, ...variant }), {});
};

/**
 * Add will-change for performance optimization
 */
export const withWillChange = (style: React.CSSProperties = {}): React.CSSProperties => {
  return {
    ...style,
    willChange: "transform, opacity",
  };
};
