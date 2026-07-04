import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllReviewSlugs, getReview } from "@/lib/mdx";
import { getProductById } from "@/lib/products";
import { siteConfig } from "@/data/config";
import { getCategoryBySlug } from "@/data/categories";
import Breadcrumb from "@/components/shared/Breadcrumb";
import StarRating from "@/components/shared/StarRating";
import AmazonCTAButton from "@/components/review/AmazonCTAButton";
import { CheckCircle, XCircle, Target, Zap, Award, Shield, Calendar } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllReviewSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const review = getReview(slug);
  if (!review) return {};
  const fm = review.frontmatter;
  const title = fm.seoTitle || fm.title;
  const description = fm.seoDescription || fm.excerpt;
  return {
    title,
    description,
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      type: "article",
      publishedTime: fm.publishedAt,
      modifiedTime: fm.updatedAt,
      images: [fm.coverImage],
    },
    twitter: { card: "summary_large_image", title, description, images: [fm.coverImage] },
  };
}

export default async function ReviewPage({ params }: PageProps) {
  const { slug } = await params;
  const review = getReview(slug);
  if (!review) notFound();

  const { frontmatter: fm, content } = review;
  const product = fm.productId ? getProductById(fm.productId) : null;
  const category = fm.category ? getCategoryBySlug(fm.category) : null;

  // JSON-LD Article + Product structured data
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: fm.title,
    description: fm.excerpt,
    author: { "@type": "Organization", name: fm.author },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.siteUrl,
    },
    datePublished: fm.publishedAt,
    dateModified: fm.updatedAt || fm.publishedAt,
    url: `${siteConfig.siteUrl}/reviews/${slug}`,
    image: fm.coverImage,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      <div style={{ background: "#f9fafb", minHeight: "100vh" }}>
        {/* Hero */}
        <div style={{ background: "white", borderBottom: "1px solid #e5e7eb", padding: "2.5rem 0" }}>
          <div className="container-main">
            <Breadcrumb
              items={[
                { label: "Categories", href: "/categories" },
                ...(category ? [{ label: category.name, href: `/categories/${category.slug}` }] : []),
                { label: "Review" },
              ]}
            />

            {/* Affiliate Disclosure */}
            <div
              style={{
                background: "#fffbeb",
                border: "1px solid #fde68a",
                borderRadius: "0.625rem",
                padding: "0.75rem 1rem",
                display: "flex",
                alignItems: "flex-start",
                gap: "0.5rem",
                marginBottom: "1.5rem",
                fontSize: "0.8rem",
                color: "#78350f",
              }}
            >
              <Shield size={14} style={{ marginTop: "1px", flexShrink: 0 }} />
              <span>
                <strong>Affiliate Disclosure:</strong> {siteConfig.amazonDisclosure} Our rankings are
                never influenced by commissions.{" "}
                <a href="/affiliate-disclosure" style={{ color: "#92400e", textDecoration: "underline" }}>
                  Learn more
                </a>
              </span>
            </div>

            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
              <span style={{ background: "#f0fdf4", color: "#166534", fontSize: "0.7rem", fontWeight: 700, padding: "0.25rem 0.75rem", borderRadius: "9999px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Product Review
              </span>
              {category && (
                <span style={{ background: "#eff6ff", color: "#1e40af", fontSize: "0.7rem", fontWeight: 700, padding: "0.25rem 0.75rem", borderRadius: "9999px" }}>
                  {category.name}
                </span>
              )}
            </div>

            <h1 style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 800, color: "#111827", lineHeight: 1.25, marginBottom: "1rem" }}>
              {fm.title}
            </h1>

            <p style={{ fontSize: "1rem", color: "#6b7280", lineHeight: 1.7, maxWidth: "700px", marginBottom: "1rem" }}>
              {fm.excerpt}
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center", fontSize: "0.8rem", color: "#9ca3af" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                <Calendar size={13} />
                Published {new Date(fm.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </span>
              {fm.updatedAt && (
                <span>Updated {new Date(fm.updatedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
              )}
              <span>By {fm.author}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container-main" style={{ padding: "2.5rem 1.5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2rem", maxWidth: "1100px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 300px", gap: "2rem" }} className="review-grid">
              {/* Main Content */}
              <div>
                {product && (
                  <>
                    {/* Product Summary */}
                    <div className="card" style={{ padding: "1.5rem", marginBottom: "1.5rem" }}>
                      <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#111827", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <Award size={16} style={{ color: "#f59e0b" }} /> Quick Summary
                      </h2>
                      <StarRating rating={product.rating} reviewCount={product.reviewCount} />
                      <p style={{ marginTop: "0.75rem", fontSize: "0.9rem", color: "#6b7280", lineHeight: 1.7 }}>
                        {product.summary}
                      </p>
                      {product.tag && (
                        <div style={{ marginTop: "0.75rem" }}>
                          <span className={`tag-pill ${product.tag === "Best Overall" ? "tag-best-overall" : product.tag === "Best Budget" ? "tag-best-budget" : "tag-best-premium"}`}>
                            🏆 {product.tag}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Pros & Cons */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
                      <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "0.75rem", padding: "1.25rem" }}>
                        <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "#166534", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.375rem" }}>
                          <CheckCircle size={15} /> Pros
                        </h3>
                        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                          {product.pros.map((pro, i) => (
                            <li key={i} style={{ fontSize: "0.85rem", color: "#166534", display: "flex", alignItems: "flex-start", gap: "0.375rem" }}>
                              <CheckCircle size={13} style={{ marginTop: "2px", flexShrink: 0, color: "#16a34a" }} />
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "0.75rem", padding: "1.25rem" }}>
                        <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "#991b1b", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.375rem" }}>
                          <XCircle size={15} /> Cons
                        </h3>
                        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                          {product.cons.map((con, i) => (
                            <li key={i} style={{ fontSize: "0.85rem", color: "#991b1b", display: "flex", alignItems: "flex-start", gap: "0.375rem" }}>
                              <XCircle size={13} style={{ marginTop: "2px", flexShrink: 0, color: "#dc2626" }} />
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Best For */}
                    <div className="card" style={{ padding: "1.25rem", marginBottom: "1.5rem" }}>
                      <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#111827", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.375rem" }}>
                        <Target size={15} style={{ color: "#1a56db" }} /> Best For
                      </h3>
                      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        {product.bestFor.map((item, i) => (
                          <li key={i} style={{ fontSize: "0.875rem", color: "#374151", display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                            <span style={{ color: "#1a56db", fontWeight: 700 }}>✓</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Key Features */}
                    <div className="card" style={{ padding: "1.25rem", marginBottom: "1.5rem" }}>
                      <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#111827", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.375rem" }}>
                        <Zap size={15} style={{ color: "#f59e0b" }} /> Key Features
                      </h3>
                      <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <tbody>
                          {product.keyFeatures.map((feat, i) => (
                            <tr key={i} style={{ borderBottom: i < product.keyFeatures.length - 1 ? "1px solid #f3f4f6" : "none" }}>
                              <td style={{ padding: "0.5rem 0.25rem", fontSize: "0.8rem", fontWeight: 600, color: "#6b7280", width: "40%" }}>{feat.name}</td>
                              <td style={{ padding: "0.5rem 0.25rem", fontSize: "0.85rem", color: "#111827" }}>{feat.value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}

                {/* MDX Content */}
                <div className="card prose" style={{ padding: "2rem", maxWidth: "none" }}>
                  <MDXRemote source={content} />
                </div>

                {/* Verdict */}
                {product && (
                  <div
                    style={{
                      background: "linear-gradient(135deg, #1e3a8a 0%, #1a56db 100%)",
                      borderRadius: "1rem",
                      padding: "2rem",
                      marginTop: "1.5rem",
                      color: "white",
                    }}
                  >
                    <h2 style={{ fontSize: "1.1rem", fontWeight: 800, color: "white", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <Award size={18} style={{ color: "#fde68a" }} /> Our Verdict
                    </h2>
                    <p style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.9)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                      {product.verdict}
                    </p>
                    <AmazonCTAButton asin={product.asin} productName={product.shortTitle} size="md" />
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {product && (
                  <>
                    {/* Quick Buy */}
                    <div className="card" style={{ padding: "1.5rem", position: "sticky", top: "5rem" }}>
                      <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "#111827", marginBottom: "1rem" }}>
                        {product.shortTitle}
                      </h3>
                      <StarRating rating={product.rating} reviewCount={product.reviewCount} size={13} />
                      {product.tag && (
                        <span className={`tag-pill ${product.tag === "Best Overall" ? "tag-best-overall" : product.tag === "Best Budget" ? "tag-best-budget" : "tag-best-premium"}`} style={{ marginTop: "0.75rem", display: "inline-flex" }}>
                          🏆 {product.tag}
                        </span>
                      )}
                      <div style={{ margin: "1.25rem 0" }}>
                        <AmazonCTAButton asin={product.asin} productName={product.shortTitle} size="md" />
                      </div>
                      <p style={{ fontSize: "0.75rem", color: "#9ca3af", lineHeight: 1.5 }}>
                        As an Amazon Associate we earn from qualifying purchases. Prices and
                        availability may change.
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .review-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
