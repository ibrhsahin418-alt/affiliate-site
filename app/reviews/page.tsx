import type { Metadata } from "next";
import Link from "next/link";
import { getAllReviews } from "@/lib/mdx";
import { siteConfig } from "@/data/config";
import { getCategoryBySlug } from "@/data/categories";
import { FileText, ArrowRight, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Product Reviews",
  description: `Browse all product reviews on ${siteConfig.name}. In-depth, research-backed reviews across Home & Kitchen, Electronics, Baby & Kids, Tools, and Health categories.`,
};

export default function ReviewsPage() {
  const reviews = getAllReviews();

  return (
    <div className="section-padding">
      <div className="container-main">
        <div style={{ marginBottom: "2.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
            <FileText size={18} style={{ color: "#1a56db" }} />
            <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#1a56db", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              All Reviews
            </span>
          </div>
          <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "#111827", marginBottom: "0.75rem" }}>
            Product Reviews
          </h1>
          <p style={{ fontSize: "1rem", color: "#6b7280", maxWidth: "560px", lineHeight: 1.7 }}>
            Our research-backed product reviews cover the most popular items across major categories.
            Honest analysis with no fake reviews.
          </p>
        </div>

        {reviews.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {reviews.map((review) => {
              const category = review.frontmatter.category ? getCategoryBySlug(review.frontmatter.category) : null;
              return (
                <Link
                  key={review.slug}
                  href={`/reviews/${review.slug}`}
                  className="card group"
                  style={{ textDecoration: "none", display: "block", padding: "1.5rem" }}
                >
                  <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
                    <span style={{ background: "#f0fdf4", color: "#166534", fontSize: "0.7rem", fontWeight: 700, padding: "0.2rem 0.6rem", borderRadius: "9999px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      Review
                    </span>
                    {category && (
                      <span style={{ background: "#eff6ff", color: "#1e40af", fontSize: "0.7rem", padding: "0.2rem 0.6rem", borderRadius: "9999px", fontWeight: 600 }}>
                        {category.icon} {category.name}
                      </span>
                    )}
                  </div>
                  <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#111827", lineHeight: 1.4, marginBottom: "0.5rem" }}>
                    {review.frontmatter.title}
                  </h2>
                  <p style={{ fontSize: "0.875rem", color: "#6b7280", lineHeight: 1.6, marginBottom: "1rem" }}>
                    {review.frontmatter.excerpt.substring(0, 120)}...
                  </p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "0.75rem", color: "#9ca3af", display: "flex", alignItems: "center", gap: "0.25rem" }}>
                      <Calendar size={11} />
                      {new Date(review.frontmatter.publishedAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                    </span>
                    <span style={{ color: "#1a56db", fontSize: "0.85rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.25rem" }}>
                      Read <ArrowRight size={13} />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "4rem 0", color: "#9ca3af" }}>
            <p>Reviews are coming soon. Check back shortly!</p>
          </div>
        )}
      </div>
    </div>
  );
}
