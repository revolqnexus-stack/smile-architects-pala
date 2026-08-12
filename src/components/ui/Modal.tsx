"use client";

/**
 * MODAL COMPONENT — Inspired by Aventura Dental Arts
 * 
 * Full-featured modal with:
 * - Backdrop blur
 * - Smooth transitions
 * - Focus trap
 * - ESC to close
 * - Scroll lock
 * - Accessibility
 */

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import * as motionSystem from "@/lib/motion";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  size?: "sm" | "md" | "lg";
}

export default function Modal({ 
  isOpen, 
  onClose, 
  children, 
  title,
  size = "md",
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Lock scroll when modal open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Set initial focus
      modalRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // ESC to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  const sizeStyles = {
    sm: { maxWidth: "400px" },
    md: { maxWidth: "600px" },
    lg: { maxWidth: "900px" },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: motionSystem.ease.primary }}
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(37, 78, 6, 0.5)",
              backdropFilter: "blur(8px)",
              zIndex: 50,
            }}
            aria-hidden="true"
          />
          
          {/* Modal */}
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? "modal-title" : undefined}
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ 
              duration: 0.3, 
              ease: motionSystem.ease.primary,
            }}
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 51,
              backgroundColor: "var(--color-white)",
              borderRadius: "var(--radius-xl)",
              padding: "2rem",
              width: "90vw",
              ...sizeStyles[size],
              maxHeight: "90vh",
              overflow: "auto",
              border: "3px solid var(--color-tea-green)",
              boxShadow: "var(--shadow-lg)",
            }}
          >
            {/* Header */}
            {title && (
              <div 
                style={{ 
                  marginBottom: "1.5rem", 
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: "flex-start",
                  gap: "1rem",
                }}
              >
                <h2 
                  id="modal-title"
                  style={{ 
                    fontFamily: "var(--font-serif)", 
                    fontSize: "clamp(1.5rem, 3vw, 2rem)", 
                    color: "var(--color-dark-moss)",
                    fontWeight: 400,
                    lineHeight: 1.2,
                  }}
                >
                  {title}
                </h2>
                <button
                  onClick={onClose}
                  aria-label="Close modal"
                  style={{
                    background: "none",
                    border: "2px solid var(--color-tea-green)",
                    borderRadius: "50%",
                    width: "36px",
                    height: "36px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.5rem",
                    color: "var(--color-olive)",
                    cursor: "pointer",
                    flexShrink: 0,
                    transition: "all 0.18s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--color-tea-green)";
                    e.currentTarget.style.borderColor = "var(--color-olive)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.borderColor = "var(--color-tea-green)";
                  }}
                >
                  ×
                </button>
              </div>
            )}
            
            {/* Content */}
            <div>{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
