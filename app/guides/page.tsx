import type { Metadata } from "next";
import Link from "next/link";
import { getAllGuides } from "@/lib/mdx";
import { siteConfig } from "@/data/config";
import { getCategoryBySlug } from "@/data/categories";
import { BookOpen, ArrowRight, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Buying Guides",
  description: `Browse all buying guides on ${siteConfig.name}. Expert comparison guides for Home & Kitchen, Electronics, Baby & Kids, Tools, and Health products.`,
};

export default function GuidesPage() {
  const guides = getAllGuides();

  return (
    <div className="section-padding">
      <div className="container-main">
        <div style={{ marginBottom: "2.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
            <BookOpen size={18} style={{ color: "#1a56db" }} />
            <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#1a56db", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              Buying Guides
            </span>
          </div>
          <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "#111827", marginBottom: "0.75rem" }}>
            Expert Buying Guides
          </h1>
          <p style={{ fontSize: "1rem", color: "#6b7280", maxWidth: "560px", lineHeight: 1.7 }}>
            In-depth comparison guides to help you make the right buying decision. Each guide
            compares multiple products with honest analysis and no paid placements.
          </p>
        </div>

        {guides.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "1.5rem" }}>
            {guides.map((guide) => {
              const category = guide.frontmatter.category ? getCategoryBySlug(guide.frontmatter.category) : null;
              return (
                <Link
                  key={guide.slug}
                  href={`/guides/${guide.slug}`}
                  className="card group"
                  style={{ textDecoration: "none", display: "block", padding: "1.75rem" }}
                >
                  <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
                    <span style={{ background: "#eff6ff", color: "#1e40af", fontSize: "0.7rem", fontWeight: 700, padding: "0.2rem 0.6rem", borderRadius: "9999px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      Buying Guide
                    </span>
                    {category && (
                      <span style={{ background: "#f3f4f6", color: "#374151", fontSize: "0.7rem", padding: "0.2rem 0.6rem", borderRadius: "9999px", fontWeight: 600 }}>
                        {category.icon} {category.name}
                      </span>
                    )}
                  </div>
                  <h2 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#111827", lineHeight: 1.4, marginBottom: "0.5rem" }}>
                    {guide.frontmatter.title}
                  </h2>
                  <p style={{ fontSize: "0.875rem", color: "#6b7280", lineHeight: 1.6, marginBottom: "1.25rem" }}>
                    {guide.frontmatter.excerpt.substring(0, 140)}...
                  </p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "0.75rem", color: "#9ca3af", display: "flex", alignItems: "center", gap: "0.25rem" }}>
                      <Calendar size={11} />
                      {new Date(guide.frontmatter.publishedAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                    </span>
                    <span style={{ color: "#1a56db", fontSize: "0.85rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.25rem" }}>
                      Read Guide <ArrowRight size={13} />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "4rem 0", color: "#9ca3af" }}>
            <p>Guides are coming soon. Check back shortly!</p>
          </div>
        )}
      </div>
    </div>
  );
}
