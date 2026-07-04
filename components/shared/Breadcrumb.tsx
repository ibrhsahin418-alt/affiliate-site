import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" style={{ marginBottom: "1.5rem" }}>
      <ol
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "0.25rem",
          listStyle: "none",
          padding: 0,
          margin: 0,
          fontSize: "0.875rem",
          color: "#6b7280",
        }}
      >
        <li>
          <Link href="/" style={{ color: "#6b7280", textDecoration: "none", display: "flex", alignItems: "center", gap: "0.25rem" }} className="hover:text-blue-600 transition-colors">
            <Home size={13} />
            Home
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
            <ChevronRight size={13} />
            {item.href ? (
              <Link href={item.href} style={{ color: "#6b7280", textDecoration: "none" }} className="hover:text-blue-600 transition-colors">
                {item.label}
              </Link>
            ) : (
              <span style={{ color: "#111827", fontWeight: 500 }}>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
