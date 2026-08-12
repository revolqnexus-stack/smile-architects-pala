"use client";

/**
 * TICKER COMPONENT — Inspired by Aventura Dental Arts
 * 
 * Infinite horizontal marquee for trust signals, credentials, highlights.
 * Seamless loop with pause on hover.
 */

import { motion } from "framer-motion";
import * as motionSystem from "@/lib/motion";

interface TickerProps {
  items: string[];
  speed?: number; // seconds for full cycle
  className?: string;
  iconColor?: string;
  textColor?: string;
}

export default function Ticker({ 
  items, 
  speed = 28, 
  className = "",
  iconColor = "var(--color-jonquil)",
  textColor = "var(--color-honeydew)",
}: TickerProps) {
  // Duplicate items for seamless loop
  const duplicatedItems = [...items, ...items];
  
  if (motionSystem.prefersReducedMotion()) {
    return (
      <div className={`ticker-container overflow-hidden ${className}`}>
        <div className="flex gap-12 flex-wrap justify-center">
          {items.map((item, i) => (
            <span
              key={i}
              className="ticker-item whitespace-nowrap"
              style={{
                fontSize: "0.8125rem",
                color: textColor,
                display: "flex",
                alignItems: "center",
                gap: "0.625rem",
                opacity: 0.9,
                fontFamily: "var(--font-sans)",
              }}
            >
              <span style={{
                display: "inline-block",
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                backgroundColor: iconColor,
                flexShrink: 0,
              }} aria-hidden="true" />
              {item}
            </span>
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div className={`ticker-container ${className}`} style={{ overflow: "hidden" }}>
      <motion.div
        className="ticker-track"
        style={{
          display: "flex",
          gap: "3rem",
          width: "max-content",
        }}
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          duration: speed,
          ease: "linear",
          repeat: Infinity,
        }}
        whileHover={{ animationPlayState: "paused" }}
      >
        {duplicatedItems.map((item, i) => (
          <span
            key={i}
            className="ticker-item"
            style={{
              fontSize: "0.8125rem",
              color: textColor,
              display: "flex",
              alignItems: "center",
              gap: "0.625rem",
              whiteSpace: "nowrap",
              opacity: 0.9,
              fontFamily: "var(--font-sans)",
            }}
          >
            <span style={{
              display: "inline-block",
              width: "4px",
              height: "4px",
              borderRadius: "50%",
              backgroundColor: iconColor,
              flexShrink: 0,
            }} aria-hidden="true" />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
