import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://smilearchitectspala.com" },
      ...items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: item.label,
        ...(item.href ? { item: `https://smilearchitectspala.com${item.href}` } : {}),
      })),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav aria-label="Breadcrumb">
        <ol className="breadcrumb" style={{ listStyle: "none", padding: 0, margin: 0 }}>
          <li>
            <Link href="/" style={{ color: "inherit" }}>Home</Link>
          </li>
          {items.map((item, i) => (
            <li key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span className="breadcrumb-sep" aria-hidden="true">/</span>
              {item.href && i < items.length - 1 ? (
                <Link href={item.href} style={{ color: "inherit" }}>{item.label}</Link>
              ) : (
                <span className="breadcrumb-current" aria-current="page">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
