/**
 * DOCTOR PHOTO COMPONENT
 *
 * Shows the actual photo when a `photo` path is provided.
 * Falls back to a styled initials avatar if no photo exists.
 */

import Image from "next/image";

interface DoctorPhotoProps {
  name: string;
  photo?: string | null;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  priority?: boolean;
}

const SIZE_MAP = {
  sm:  { px: 60,  font: "1.125rem", badge: 16, badgeIcon: 8  },
  md:  { px: 88,  font: "1.625rem", badge: 20, badgeIcon: 10 },
  lg:  { px: 120, font: "2.25rem",  badge: 24, badgeIcon: 12 },
  xl:  { px: 200, font: "3rem",     badge: 32, badgeIcon: 16 },
};

export default function DoctorPhoto({
  name,
  photo,
  size = "md",
  className = "",
  priority = false,
}: DoctorPhotoProps) {
  const { px, font, badge, badgeIcon } = SIZE_MAP[size];
  const initials = name
    .split(" ")
    .map((p) => p.charAt(0).toUpperCase())
    .slice(0, 2)
    .join("");

  return (
    <div
      className={`doctor-photo ${className}`}
      style={{
        width: px,
        height: px,
        borderRadius: "50%",
        border: "3px solid var(--color-olive)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        flexShrink: 0,
        boxShadow: "var(--shadow-sm)",
        backgroundColor: "var(--color-tea-green)",
      }}
    >
      {photo ? (
        <Image
          src={photo}
          alt={`Photo of ${name}`}
          fill
          sizes={`${px}px`}
          priority={priority}
          style={{ objectFit: "cover", objectPosition: "top center" }}
        />
      ) : (
        /* Initials fallback */
        <span
          style={{
            fontSize: font,
            fontFamily: "var(--font-serif)",
            fontWeight: 600,
            color: "var(--color-dark-moss)",
            lineHeight: 1,
            userSelect: "none",
          }}
        >
          {initials}
        </span>
      )}

      {/* Verified badge */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: badge,
          height: badge,
          backgroundColor: "var(--color-jonquil)",
          border: "2px solid white",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width={badgeIcon} height={badgeIcon} viewBox="0 0 24 24" fill="none">
          <path
            d="M9 12L11 14L15 10"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
