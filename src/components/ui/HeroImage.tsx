/**
 * HERO IMAGE COMPONENT
 */

import { ImageReveal } from "@/components/motion/REVOLQComponents";
import { CheckIcon } from "@/components/ui/icons";

interface HeroImageProps {
  alt: string;
  className?: string;
}

export default function HeroImage({ alt, className = '' }: HeroImageProps) {
  return (
    <ImageReveal delay={0.5} className={className}>
      <div
        style={{
          width: '100%',
          aspectRatio: '4/5',
          position: 'relative',
          borderRadius: 'var(--radius-2xl)',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, var(--color-honeydew) 0%, var(--color-tea-green) 50%, var(--color-olive) 100%)',
          border: '3px solid var(--color-dark-moss)',
          boxShadow: 'var(--shadow-xl)',
        }}
      >
        {/* Main visual area */}
        <div
          style={{
            position: 'absolute',
            inset: '20px',
            borderRadius: 'var(--radius-xl)',
            background: 'linear-gradient(45deg, var(--color-vanilla) 0%, var(--color-honeydew) 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '2rem',
          }}
        >
          {/* Dental clinic icon */}
          <div
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: 'var(--color-tea-green)',
              border: '4px solid var(--color-dark-moss)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.5rem',
              boxShadow: 'var(--shadow-lg)',
            }}
          >
            <svg 
              width="60" 
              height="60" 
              viewBox="0 0 24 24" 
              fill="none"
              style={{ color: 'var(--color-dark-moss)' }}
            >
              <path 
                d="M12 3C8.13 3 5 6.13 5 10C5 14.17 8.42 17.92 12 19.5C15.58 17.92 19 14.17 19 10C19 6.13 15.87 3 12 3Z" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                fill="var(--color-honeydew)"
              />
              <circle 
                cx="12" 
                cy="10" 
                r="3" 
                stroke="currentColor" 
                strokeWidth="1.5"
                fill="var(--color-jonquil)"
                fillOpacity="0.5"
              />
            </svg>
          </div>

          {/* Clinic metadata */}
          <div style={{ marginBottom: '1rem' }}>
            <h3
              style={{
                fontSize: '1.375rem',
                fontFamily: 'var(--font-serif)',
                color: 'var(--color-dark-moss)',
                fontWeight: 600,
                marginBottom: '0.5rem',
                lineHeight: 1.2,
              }}
            >
              Smile Architects
            </h3>
            <p
              style={{
                fontSize: '0.9375rem',
                color: 'var(--color-olive)',
                fontFamily: 'var(--font-sans)',
                fontWeight: 500,
                marginBottom: '0.75rem',
              }}
            >
              Pala, Kottayam
            </p>
          </div>

          {/* Feature badges */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              fontSize: '0.8125rem',
              color: 'var(--color-cafe-noir)',
              fontFamily: 'var(--font-sans)',
              textAlign: 'left',
            }}
          >
            {[
              'Multispeciality Dental Clinic',
              'Advanced Orthodontic Centre',
              'Digital X-Ray & Modern Equipment',
            ].map((text) => (
              <span key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckIcon size="sm" color="var(--color-dark-moss)" />
                {text}
              </span>
            ))}
          </div>
        </div>

        {/* Floating metadata label */}
        <div
          style={{
            position: 'absolute',
            top: '16px',
            left: '16px',
            backgroundColor: 'var(--color-jonquil)',
            color: 'var(--color-dark-moss)',
            padding: '0.375rem 0.75rem',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.75rem',
            fontFamily: 'var(--font-utility)',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          Kerala · India
        </div>

        {/* Decorative elements */}
        <div
          style={{
            position: 'absolute',
            top: '-20%',
            right: '-15%',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, var(--color-jonquil) 0%, transparent 70%)',
            opacity: 0.15,
            pointerEvents: 'none',
          }}
        />
        
        <div
          style={{
            position: 'absolute',
            bottom: '-25%',
            left: '-10%',
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, var(--color-olive) 0%, transparent 70%)',
            opacity: 0.1,
            pointerEvents: 'none',
          }}
        />
      </div>
    </ImageReveal>
  );
}