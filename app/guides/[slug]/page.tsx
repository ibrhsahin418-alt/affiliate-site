import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllGuideSlugs, getGuide } from "@/lib/mdx";
import { getProductById } from "@/lib/products";
import { siteConfig } from "@/data/config";
import { getCategoryBySlug } from "@/data/categories";
import Breadcrumb from "@/components/shared/Breadcrumb";
import AmazonCTAButton from "@/components/review/AmazonCTAButton";
import StarRating from "@/components/shared/StarRating";
import { Shield, Calendar, ChevronDown, BookOpen } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  const fm = guide.frontmatter;
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
    },
  };
}

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const { frontmatter: fm, content } = guide;
  const category = fm.category ? getCategoryBySlug(fm.category) : null;
  const featuredProducts = (fm.productIds || [])
    .map((id) => getProductById(id))
    .filter(Boolean);

  // JSON-LD for Article + FAQPage
  const jsonLd: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: fm.title,
      description: fm.excerpt,
      author: { "@type": "Organization", name: fm.author },
      publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.siteUrl },
      datePublished: fm.publishedAt,
      dateModified: fm.updatedAt || fm.publishedAt,
      url: `${siteConfig.siteUrl}/guides/${slug}`,
    },
  ];

  if (fm.faqs && fm.faqs.length > 0) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: fm.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    });
  }

  return (
    <>
      {jsonLd.map((ld, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      ))}

      <div style={{ background: "#f9fafb", minHeight: "100vh" }}>
        {/* Hero */}
        <div style={{ background: "white", borderBottom: "1px solid #e5e7eb", padding: "2.5rem 0" }}>
          <div className="container-main">
            <Breadcrumb
              items={[
                { label: "Guides", href: "/guides" },
                ...(category ? [{ label: category.name, href: `/categories/${category.slug}` }] : []),
                { label: "Guide" },
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
                <strong>Affiliate Disclosure:</strong> {siteConfig.amazonDisclosure} Our research is
                independent and our rankings are never influenced by commissions.{" "}
                <a href="/affiliate-disclosure" style={{ color: "#92400e", textDecoration: "underline" }}>
                  Learn more
                </a>
              </span>
            </div>

            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
              <span style={{ background: "#eff6ff", color: "#1e40af", fontSize: "0.7rem", fontWeight: 700, padding: "0.25rem 0.75rem", borderRadius: "9999px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                <BookOpen size={10} style={{ display: "inline", marginRight: "0.25rem" }} />
                Buying Guide
              </span>
              {category && (
                <span style={{ background: "#f3f4f6", color: "#374151", fontSize: "0.7rem", fontWeight: 700, padding: "0.25rem 0.75rem", borderRadius: "9999px" }}>
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
        <div className="container-main" style={{ padding: "2.5rem 1.5rem", maxWidth: "900px" }}>
          {/* Featured Products Quick Links */}
          {featuredProducts.length > 0 && (
            <div
              style={{
                background: "#eff6ff",
                border: "1px solid #bfdbfe",
                borderRadius: "0.75rem",
                padding: "1.25rem",
                marginBottom: "2rem",
              }}
            >
              <p style={{ fontSize: "0.8rem", fontWeight: 700, color: "#1e40af", marginBottom: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Products in This Guide
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {featuredProducts.map((p, i) => p && (
                  <div key={p.id} style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
                    <span style={{ fontWeight: 700, color: "#1e40af", fontSize: "0.8rem" }}>{i + 1}.</span>
                    <span style={{ fontSize: "0.875rem", color: "#1e3a8a", fontWeight: 600 }}>{p.shortTitle}</span>
                    {p.tag && (
                      <span className={`tag-pill ${p.tag === "Best Overall" ? "tag-best-overall" : p.tag === "Best Budget" ? "tag-best-budget" : "tag-best-premium"}`}>
                        {p.tag}
                      </span>
                    )}
                    <StarRating rating={p.rating} size={12} />
                    <AmazonCTAButton asin={p.asin} productName={p.shortTitle} size="sm" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Main MDX Content */}
          <div className="card prose" style={{ padding: "2rem", maxWidth: "none", marginBottom: "2rem" }}>
            <MDXRemote source={content} />
          </div>

          {/* FAQ Section */}
          {fm.faqs && fm.faqs.length > 0 && (
            <div className="card" style={{ padding: "2rem", marginBottom: "2rem" }}>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#111827", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                ❓ Frequently Asked Questions
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {fm.faqs.map((faq, i) => (
                  <details
                    key={i}
                    style={{
                      border: "1px solid #e5e7eb",
                      borderRadius: "0.625rem",
                      overflow: "hidden",
                    }}
                  >
                    <summary
                      style={{
                        padding: "1rem 1.25rem",
                        cursor: "pointer",
                        fontSize: "0.95rem",
                        fontWeight: 600,
                        color: "#111827",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        listStyle: "none",
                        userSelect: "none",
                        background: "#f9fafb",
                      }}
                    >
                      <span>{faq.question}</span>
                      <ChevronDown size={16} style={{ flexShrink: 0, color: "#6b7280" }} />
                    </summary>
                    <div style={{ padding: "1rem 1.25rem", fontSize: "0.9rem", color: "#6b7280", lineHeight: 1.7, background: "white" }}>
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          )}

          {/* Final Recommendation / CTA */}
          {featuredProducts[0] && (
            <div
              style={{
                background: "linear-gradient(135deg, #1e3a8a 0%, #1a56db 100%)",
                borderRadius: "1rem",
                padding: "2rem",
                color: "white",
              }}
            >
              <h2 style={{ fontSize: "1.1rem", fontWeight: 800, color: "white", marginBottom: "0.5rem" }}>
                Our Top Recommendation
              </h2>
              <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.9rem", marginBottom: "1.25rem" }}>
                Based on our research, the <strong>{featuredProducts[0].shortTitle}</strong> is our top
                pick in this category. Check the current price on Amazon below.
              </p>
              <AmazonCTAButton asin={featuredProducts[0].asin} productName={featuredProducts[0].shortTitle} size="md" />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
