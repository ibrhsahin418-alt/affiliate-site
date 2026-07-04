import Link from "next/link";
import { Category } from "@/data/types";
import { ArrowRight } from "lucide-react";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="card group block"
      style={{ textDecoration: "none", overflow: "hidden" }}
    >
      {/* Gradient Header */}
      <div
        style={{
          background: `linear-gradient(135deg, var(--tw-gradient-from), var(--tw-gradient-to))`,
          height: "5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "2.5rem",
          position: "relative",
        }}
        className={`bg-gradient-to-br ${category.color}`}
      >
        <span role="img" aria-label={category.name}>{category.icon}</span>
      </div>

      <div style={{ padding: "1.25rem" }}>
        <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#111827", marginBottom: "0.375rem" }}>
          {category.name}
        </h3>
        <p style={{ fontSize: "0.8rem", color: "#6b7280", lineHeight: "1.6", marginBottom: "0.75rem" }}>
          {category.description.substring(0, 90)}...
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "0.8rem",
          }}
        >
          <span style={{ color: "#9ca3af" }}>{category.productCount ?? 0} products</span>
          <span
            style={{ color: "#1a56db", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.25rem" }}
            className="group-hover:gap-2 transition-all"
          >
            Browse <ArrowRight size={13} />
          </span>
        </div>
      </div>
    </Link>
  );
}
