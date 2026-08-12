"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import * as motionSystem from "@/lib/motion";
import { CheckIcon } from "@/components/ui/icons";
import { IconAlertTriangle } from "@tabler/icons-react";

interface FormInputProps {
  label: string;
  type?: "text" | "email" | "tel" | "password" | "number";
  value: string;
  onChange: (value: string) => void;
  error?: string;
  success?: boolean;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
}

export default function FormInput({
  label,
  type = "text",
  value,
  onChange,
  error,
  success,
  required,
  placeholder,
  disabled,
}: FormInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value.length > 0;
  const shouldFloat = isFocused || hasValue;

  const getBorderColor = () => {
    if (error) return "var(--color-error)";
    if (success) return "var(--color-success)";
    if (isFocused) return "var(--color-jonquil)";
    return "var(--color-border-light)";
  };

  const getLabelColor = () => {
    if (error) return "var(--color-error)";
    if (isFocused) return "var(--color-jonquil)";
    return "var(--color-olive)";
  };

  return (
    <div style={{ position: "relative", marginBottom: "1.5rem" }}>
      {/* Floating Label */}
      <motion.label
        htmlFor={label.replace(/\s+/g, "-").toLowerCase()}
        animate={{
          y: shouldFloat ? -26 : 0,
          scale: shouldFloat ? 0.85 : 1,
          color: getLabelColor(),
        }}
        transition={{ 
          duration: 0.2, 
          ease: motionSystem.ease.primary,
        }}
        style={{
          position: "absolute",
          left: "1.25rem",
          top: "0.875rem",
          pointerEvents: "none",
          fontFamily: "var(--font-sans)",
          fontSize: "0.9375rem",
          fontWeight: 500,
          transformOrigin: "left center",
          backgroundColor: shouldFloat ? "var(--color-white)" : "transparent",
          padding: shouldFloat ? "0 0.25rem" : "0",
          zIndex: 1,
        }}
      >
        {label}{required && " *"}
      </motion.label>
      
      {/* Input */}
      <motion.input
        id={label.replace(/\s+/g, "-").toLowerCase()}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={isFocused ? placeholder : ""}
        disabled={disabled}
        animate={{
          borderColor: getBorderColor(),
        }}
        whileFocus={{ 
          scale: 1.005,
          boxShadow: error 
            ? "0 0 0 3px rgba(255, 60, 60, 0.1)"
            : success
            ? "0 0 0 3px rgba(126, 132, 7, 0.1)"
            : "0 0 0 3px rgba(234, 200, 0, 0.1)",
        }}
        transition={{ 
          duration: 0.2, 
          ease: motionSystem.ease.primary,
        }}
        style={{
          width: "100%",
          padding: "0.875rem 1.25rem",
          border: "2px solid",
          borderRadius: "var(--radius-md)",
          fontFamily: "var(--font-sans)",
          fontSize: "1rem",
          color: "var(--color-dark-moss)",
          backgroundColor: disabled ? "var(--color-honeydew)" : "var(--color-white)",
          outline: "none",
          cursor: disabled ? "not-allowed" : "text",
          opacity: disabled ? 0.6 : 1,
        }}
      />
      
      {/* Error Message */}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.2 }}
          className="error-message"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.375rem",
            marginTop: "0.5rem",
          }}
        >
          <IconAlertTriangle size={16} stroke={1.75} aria-hidden />
          {error}
        </motion.p>
      )}
      
      {/* Success Message */}
      {success && !error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.2 }}
          className="success-message"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.375rem",
            marginTop: "0.5rem",
          }}
        >
          <CheckIcon size="sm" />
          Looks good!
        </motion.p>
      )}
    </div>
  );
}
