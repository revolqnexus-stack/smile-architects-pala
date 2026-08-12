"use client";

/**
 * FEATURE MARQUEE COMPONENT
 * 
 * Infinite horizontal scrolling marquee for clinic features
 * Replaces static trust signals with animated marquee
 */

import { useEffect, useRef } from 'react';

interface FeatureMarqueeProps {
  items: string[];
  speed?: number;
  className?: string;
}

export default function FeatureMarquee({ 
  items, 
  speed = 50,
  className = '' 
}: FeatureMarqueeProps) {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    // Duplicate items for seamless loop
    const marqueeContent = marquee.querySelector('.marquee-content');
    if (marqueeContent) {
      const clone = marqueeContent.cloneNode(true);
      marquee.appendChild(clone);
    }

    // Set up animation
    let animationId: number;
    let startTime: number;
    let translateX = 0;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      
      const elapsed = timestamp - startTime;
      translateX = -(elapsed * speed) / 1000;
      
      const contentWidth = marqueeContent?.scrollWidth || 0;
      if (Math.abs(translateX) >= contentWidth) {
        translateX = 0;
        startTime = timestamp;
      }
      
      if (marqueeContent) {
        (marqueeContent as HTMLElement).style.transform = `translateX(${translateX}px)`;
        const clone = marquee.children[1] as HTMLElement;
        if (clone) {
          clone.style.transform = `translateX(${translateX + contentWidth}px)`;
        }
      }
      
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    // Pause on hover
    const handleMouseEnter = () => {
      cancelAnimationFrame(animationId);
    };

    const handleMouseLeave = () => {
      startTime = performance.now();
      animationId = requestAnimationFrame(animate);
    };

    marquee.addEventListener('mouseenter', handleMouseEnter);
    marquee.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      marquee.removeEventListener('mouseenter', handleMouseEnter);
      marquee.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [speed]);

  return (
    <div
      ref={marqueeRef}
      className={`feature-marquee ${className}`}
      style={{
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        backgroundColor: 'var(--color-dark-moss)',
        padding: '1.5rem 0',
        position: 'relative',
      }}
    >
      <div
        className="marquee-content"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '3rem',
          paddingRight: '3rem',
        }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              fontSize: '0.875rem',
              color: 'var(--color-honeydew)',
              fontFamily: 'var(--font-sans)',
              fontWeight: 500,
              whiteSpace: 'nowrap',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-jonquil)',
                flexShrink: 0,
              }}
              aria-hidden="true"
            />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}