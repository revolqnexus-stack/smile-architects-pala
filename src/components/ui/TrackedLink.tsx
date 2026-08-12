"use client";

interface TrackedLinkProps {
  href: string;
  eventName: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  target?: string;
  rel?: string;
  "aria-label"?: string;
}

/**
 * Client component wrapper for links that need Google Analytics tracking.
 * Use this for external links or actions where you need to track user interactions.
 */
export default function TrackedLink({
  href,
  eventName,
  children,
  className,
  style,
  target,
  rel,
  "aria-label": ariaLabel,
}: TrackedLinkProps) {
  const handleClick = () => {
    if (typeof window !== "undefined" && (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag) {
      (window as unknown as { gtag: (...a: unknown[]) => void }).gtag("event", eventName);
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={className}
      style={style}
      target={target}
      rel={rel}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
}
