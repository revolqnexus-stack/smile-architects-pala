"use client";

import { useEffect, useRef, useState } from "react";

/**
 * REVOLQ-style animation hook
 * 
 * Creates an IntersectionObserver that flips `isVisible` when element enters viewport.
 * On desktop: immediately visible (no animation)
 * On mobile: animates in when 15% of element is visible
 */
interface UseMobileRevealOptions {
  /** Enable animation (false = immediately visible, true = animate on scroll) */
  enabled?: boolean;
  /** Threshold for visibility trigger (default: 0.15) */
  threshold?: number;
  /** Root margin for earlier/later trigger (default: "0px") */
  rootMargin?: string;
}

export function useMobileReveal(options: UseMobileRevealOptions = {}) {
  const {
    enabled = true,
    threshold = 0.15,
    rootMargin = "0px",
  } = options;

  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(!enabled); // If disabled, immediately visible

  useEffect(() => {
    if (!enabled || !ref.current) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Fire once only
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [enabled, threshold, rootMargin]);

  return { ref, isVisible };
}

/**
 * Check if we're on mobile (used to enable/disable animations)
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
}

/**
 * REVOLQ animation styles
 * Returns inline styles for opacity + translateY reveal
 */
interface RevealStyleOptions {
  isVisible: boolean;
  duration?: number;
  delay?: number;
  distance?: number;
}

export function getRevealStyles({
  isVisible,
  duration = 600,
  delay = 0,
  distance = 20,
}: RevealStyleOptions): React.CSSProperties {
  return {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0px)' : `translateY(${distance}px)`,
    transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
  };
}

/**
 * Hero animation styles (different system — CSS keyframes on page load)
 */
export function getHeroStyles(delay: number): React.CSSProperties {
  return {
    animationDelay: `${delay}ms`,
  };
}