import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Smile Architects CMS',
  robots: 'noindex, nofollow',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0f1117',
      color: '#e2e8f0',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", sans-serif',
      WebkitFontSmoothing: 'antialiased',
    }}>
      {children}
    </div>
  );
}
