import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { siteConfig } from "@/data/config";
import { getCategoryBySlug, categories } from "@/data/categories";
import { getReviewsByCategory, getGuidesByCategory } from "@/lib/mdx";
import { getProductsByCategory } from "@/lib/products";
import Breadcrumb from "@/components/shared/Breadcrumb";
import StarRating from "@/components/shared/StarRating";
import AmazonCTAButton from "@/components/review/AmazonCTAButton";
import { ArrowRight, BookOpen, FileText } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return categories.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) return {};
  const title = `${cat.name} Reviews & Buying Guides`;
  const description = `${cat.description} Browse our research-backed product reviews and buying guides for ${cat.name}.`;
  return {
    title,
    description,
    openGraph: { title: `${title} | ${siteConfig.name}`, description },
  };
}

// JSON-LD for category pages
function CategoryJsonLd({ catName, url }: { catName: string; url: string }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${catName} Reviews & Buying Guides`,
    url,
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.siteUrl },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) notFound();

  const reviews = getReviewsByCategory(slug);
  const guides = getGuidesByCategory(slug);
  const products = getProductsByCategory(slug);

  return (
    <>
      <CategoryJsonLd catName={cat.name} url={`${siteConfig.siteUrl}/categories/${slug}`} />

      {/* Category Hero */}
      <div className={`bg-gradient-to-br ${cat.color}`} style={{ padding: "3rem 0" }}>
        <div className="container-main">
          <Breadcrumb items={[{ label: "Categories", href: "/categories" }, { label: cat.name }]} />
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span style={{ fontSize: "3rem" }}>{cat.icon}</span>
            <div>
              <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "white", marginBottom: "0.375rem" }}>
                {cat.name}
              </h1>
              <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "0.95rem", maxWidth: "500px" }}>
                {cat.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="section-padding">
        <div className="container-main">

          {/* Buying Guides */}
          {guides.length > 0 && (
            <div style={{ marginBottom: "3rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#111827", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <BookOpen size={20} style={{ color: "#1a56db" }} /> Buying Guides
                </h2>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.25rem" }}>
                {guides.map((guide) => (
                  <Link
                    key={guide.slug}
                    href={`/guides/${guide.slug}`}
                    className="card group"
                    style={{ textDecoration: "none", display: "block", padding: "1.5rem" }}
                  >
                    <span style={{ background: "#eff6ff", color: "#1a56db", fontSize: "0.7rem", fontWeight: 700, padding: "0.2rem 0.6rem", borderRadius: "9999px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      Buying Guide
                    </span>
                    <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#111827", lineHeight: 1.4, margin: "0.75rem 0 0.5rem" }}>
                      {guide.frontmatter.title}
                    </h3>
                    <p style={{ fontSize: "0.875rem", color: "#6b7280", lineHeight: 1.6, marginBottom: "1rem" }}>
                      {guide.frontmatter.excerpt.substring(0, 100)}...
                    </p>
                    <span style={{ color: "#1a56db", fontSize: "0.85rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.25rem" }}>
                      Read Guide <ArrowRight size={13} />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Reviews */}
          {reviews.length > 0 && (
            <div style={{ marginBottom: "3rem" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#111827", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <FileText size={20} style={{ color: "#1a56db" }} /> Product Reviews
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.25rem" }}>
                {reviews.map((review) => (
                  <Link
                    key={review.slug}
                    href={`/reviews/${review.slug}`}
                    className="card group"
                    style={{ textDecoration: "none", display: "block", padding: "1.5rem" }}
                  >
                    <span style={{ background: "#f0fdf4", color: "#166534", fontSize: "0.7rem", fontWeight: 700, padding: "0.2rem 0.6rem", borderRadius: "9999px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      Review
                    </span>
                    <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#111827", lineHeight: 1.4, margin: "0.75rem 0 0.5rem" }}>
                      {review.frontmatter.title}
                    </h3>
                    <p style={{ fontSize: "0.875rem", color: "#6b7280", lineHeight: 1.6, marginBottom: "1rem" }}>
                      {review.frontmatter.excerpt.substring(0, 100)}...
                    </p>
                    <span style={{ color: "#1a56db", fontSize: "0.85rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.25rem" }}>
                      Read Review <ArrowRight size={13} />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Products in category */}
          {products.length > 0 && (
            <div>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#111827", marginBottom: "1.5rem" }}>
                Products in This Category
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.25rem" }}>
                {products.map((product) => (
                  <div key={product.id} className="card" style={{ padding: "1.25rem" }}>
                    {product.tag && (
                      <span className={`tag-pill ${product.tag === "Best Overall" ? "tag-best-overall" : product.tag === "Best Budget" ? "tag-best-budget" : "tag-best-premium"}`} style={{ marginBottom: "0.75rem", display: "inline-flex" }}>
                        {product.tag}
                      </span>
                    )}
                    <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#111827", lineHeight: 1.4, marginBottom: "0.25rem" }}>
                      {product.shortTitle}
                    </h3>
                    <p style={{ fontSize: "0.8rem", color: "#9ca3af", marginBottom: "0.5rem" }}>{product.brand}</p>
                    <StarRating rating={product.rating} reviewCount={product.reviewCount} size={13} />
                    <p style={{ fontSize: "0.8rem", color: "#6b7280", margin: "0.75rem 0" }}>
                      {product.summary.substring(0, 100)}...
                    </p>
                    <AmazonCTAButton asin={product.asin} productName={product.shortTitle} size="sm" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {reviews.length === 0 && guides.length === 0 && products.length === 0 && (
            <div style={{ textAlign: "center", padding: "4rem 0", color: "#9ca3af" }}>
              <p style={{ fontSize: "1.1rem" }}>Content for this category is coming soon.</p>
              <Link href="/categories" className="btn-primary" style={{ marginTop: "1rem", display: "inline-flex" }}>
                Browse All Categories
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
