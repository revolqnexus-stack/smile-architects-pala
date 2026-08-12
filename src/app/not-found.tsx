import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ 
      padding: "4rem 2rem", 
      backgroundColor: "var(--color-dark-moss)", 
      minHeight: "100dvh" 
    }}>
      <div
        style={{
          maxWidth: "500px",
          margin: "0 auto",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            color: "var(--color-honeydew)",
            fontWeight: 400,
          }}
        >
          Page not found
        </h1>
        <p style={{ 
          color: "var(--color-honeydew)", 
          opacity: 0.8, 
          fontSize: "1.0625rem", 
          lineHeight: 1.65 
        }}>
          The page you're looking for doesn't exist or may have been moved.
        </p>
        <Link href="/" className="btn btn-secondary" style={{ alignSelf: "center" }}>
          Back to home
        </Link>
      </div>
    </div>
  );
}