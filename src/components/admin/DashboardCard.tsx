'use client';

import Link from 'next/link';
import { useState } from 'react';

interface DashboardCardProps {
  title: string;
  description: string;
  href: string;
  count: number | null;
  accentColor: string;
}

export default function DashboardCard({ title, description, href, count, accentColor }: DashboardCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      <div
        style={{
          backgroundColor: '#161b27',
          border: `1px solid ${isHovered ? accentColor + '66' : 'rgba(255,255,255,0.06)'}`,
          borderRadius: '10px',
          padding: '1.25rem 1.5rem',
          cursor: 'pointer',
          transition: 'border-color 0.15s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div>
          <div style={{ fontSize: '0.9375rem', fontWeight: 500, color: '#e2e8f0', marginBottom: '0.25rem' }}>
            {title}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
            {description}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
          {count !== null && (
            <div style={{
              fontSize: '1.25rem',
              fontWeight: 700,
              color: accentColor,
              minWidth: '2rem',
              textAlign: 'right',
            }}>
              {count}
            </div>
          )}
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#475569" strokeWidth={2}>
            <path d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
