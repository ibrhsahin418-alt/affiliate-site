import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/data/config";
import { categories } from "@/data/categories";
import CategoryCard from "@/components/shared/CategoryCard";
import { LayoutGrid, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "All Categories",
  description: `Browse all product review categories on ${siteConfig.name}. Find expert buying guides and in-depth reviews for Home & Kitchen, Electronics, Baby & Kids, Tools, and Health products.`,
  openGraph: {
    title: `All Categories | ${siteConfig.name}`,
    description: `Browse all product categories and buying guides.`,
  },
};

export default function CategoriesPage() {
  return (
    <div className="section-padding">
      <div className="container-main">
        {/* Header */}
        <div style={{ marginBottom: "2.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
            <LayoutGrid size={18} style={{ color: "#1a56db" }} />
            <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#1a56db", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              All Categories
            </span>
          </div>
          <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "#111827", marginBottom: "0.75rem" }}>
            Browse by Product Category
          </h1>
          <p style={{ fontSize: "1rem", color: "#6b7280", maxWidth: "560px", lineHeight: 1.7 }}>
            Our research covers {categories.length} major product categories. Select a category to
            find buying guides, comparisons, and in-depth reviews.
          </p>
        </div>

        {/* Category Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "1.25rem",
            marginBottom: "3rem",
          }}
        >
          {categories.map((cat) => (
            <CategoryCard key={cat.slug} category={cat} />
          ))}
        </div>

        {/* CTA */}
        <div
          style={{
            background: "#eff6ff",
            border: "1px solid #bfdbfe",
            borderRadius: "1rem",
            padding: "2rem",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <div>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1e3a8a", marginBottom: "0.375rem" }}>
              Can&apos;t find what you&apos;re looking for?
            </h2>
            <p style={{ fontSize: "0.875rem", color: "#3b5fc0" }}>
              Browse our buying guides or contact us with a review request.
            </p>
          </div>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <Link href="/guides" className="btn-primary" style={{ fontSize: "0.875rem" }}>
              Buying Guides <ArrowRight size={13} />
            </Link>
            <Link href="/contact" className="btn-outline" style={{ fontSize: "0.875rem" }}>
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
