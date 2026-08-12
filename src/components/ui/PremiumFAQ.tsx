"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
}

interface PremiumFAQProps {
  faqs: FAQItem[];
}

export default function PremiumFAQ({ faqs }: PremiumFAQProps) {
  const [openItem, setOpenItem] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenItem(openItem === index ? null : index);
  };

  return (
    <div className="premium-faq">
      {faqs.map((faq, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="faq-item-premium"
          style={{
            borderBottom: "2px solid var(--color-tea-green)",
            overflow: "hidden",
          }}
        >
          {/* Question Header */}
          <motion.button
            onClick={() => toggleItem(index)}
            className="faq-question-premium"
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "clamp(1.125rem, 3vw, 1.5rem) 0",
              background: "none",
              border: "none",
              cursor: "pointer",
              textAlign: "left",
              fontSize: "clamp(0.9375rem, 2.5vw, 1.0625rem)",
              fontFamily: "var(--font-serif)",
              fontWeight: 500,
              lineHeight: 1.4,
              color: openItem === index ? "var(--color-dark-moss)" : "var(--color-olive)",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              borderRadius: "8px",
            }}
            whileHover={{
              backgroundColor: "rgba(215, 227, 164, 0.4)",
              paddingLeft: "0.75rem",
              paddingRight: "0.75rem",
              scale: 1.01,
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span>{faq.question}</span>
            
            {/* Animated Icon with glow effect */}
            <motion.span
              style={{
                fontSize: "1.5rem",
                color: "var(--color-jonquil)",
                fontWeight: 300,
                width: "28px",
                height: "28px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                borderRadius: "50%",
                backgroundColor: openItem === index ? "rgba(234, 200, 0, 0.15)" : "transparent",
                transition: "background-color 0.3s ease",
              }}
              animate={{
                rotate: openItem === index ? 45 : 0,
              }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              whileHover={{
                backgroundColor: "rgba(234, 200, 0, 0.2)",
                scale: 1.1,
              }}
            >
              +
            </motion.span>
          </motion.button>

          {/* Answer Content */}
          <AnimatePresence mode="wait">
            {openItem === index && (
              <motion.div
                initial={{
                  height: 0,
                  opacity: 0,
                }}
                animate={{
                  height: "auto",
                  opacity: 1,
                }}
                exit={{
                  height: 0,
                  opacity: 0,
                }}
                transition={{
                  height: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
                  opacity: { duration: 0.3, delay: openItem === index ? 0.1 : 0 },
                }}
                style={{
                  overflow: "hidden",
                }}
              >
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ 
                    duration: 0.3, 
                    delay: 0.1,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                  style={{
                    paddingBottom: "clamp(1.125rem, 3vw, 1.5rem)",
                    paddingRight: "clamp(1rem, 4vw, 2.5rem)",
                    paddingLeft: "0.75rem",
                    borderLeft: "3px solid var(--color-jonquil)",
                    marginLeft: "0.75rem",
                    backgroundColor: "rgba(236, 245, 226, 0.3)",
                    borderRadius: "0 8px 8px 0",
                  }}
                >
                  <p
                    style={{
                      fontSize: "clamp(0.9375rem, 2vw, 1rem)",
                      color: "var(--color-cafe-noir)",
                      lineHeight: 1.7,
                      margin: 0,
                      fontFamily: "var(--font-sans)",
                    }}
                  >
                    {faq.answer}
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}

      <style>{`
        .premium-faq {
          max-width: 820px;
        }
        
        .faq-item-premium:hover {
          background-color: rgba(215, 227, 164, 0.15);
          border-radius: 12px;
          margin: -4px;
          padding: 4px;
          border-bottom: 2px solid var(--color-olive) !important;
        }
        
        .faq-question-premium:hover {
          color: var(--color-dark-moss) !important;
        }
        
        .faq-question-premium:focus {
          outline: 2px solid var(--color-jonquil);
          outline-offset: 4px;
          border-radius: 8px;
        }
        
        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .faq-item-premium *,
          .premium-faq * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
}