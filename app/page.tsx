import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/data/config";
import { categories } from "@/data/categories";
import { getAllGuides } from "@/lib/mdx";
import { getFeaturedProducts } from "@/lib/products";
import CategoryCard from "@/components/shared/CategoryCard";
import StarRating from "@/components/shared/StarRating";
import AmazonCTAButton from "@/components/review/AmazonCTAButton";
import {
  Search,
  Shield,
  BookOpen,
  BarChart2,
  CheckCircle,
  ArrowRight,
  Award,
  Clock,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: `${siteConfig.name} — Independent Product Research & Reviews`,
  description: siteConfig.description,
  openGraph: {
    title: `${siteConfig.name} — Independent Product Research & Reviews`,
    description: siteConfig.description,
  },
};

export default function HomePage() {
  const guides = getAllGuides().filter((g) => g.frontmatter.featured).slice(0, 3);
  const featuredProducts = getFeaturedProducts().slice(0, 3);

  return (
    <>
      {/* ─── HERO ──────────────────────────────────────────── */}
      <section
        style={{
          background: "linear-gradient(135deg, #1e3a8a 0%, #1a56db 50%, #2563eb 100%)",
          padding: "5rem 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.05)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-150px",
            left: "-80px",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.05)",
            pointerEvents: "none",
          }}
        />

        <div className="container-main" style={{ position: "relative", textAlign: "center" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(8px)",
              borderRadius: "9999px",
              padding: "0.375rem 1rem",
              marginBottom: "1.5rem",
              color: "rgba(255,255,255,0.9)",
              fontSize: "0.85rem",
              fontWeight: 600,
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <Shield size={13} />
            Independent Research · No Fake Reviews · Amazon Affiliate
          </div>

          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3.25rem)",
              fontWeight: 800,
              color: "white",
              lineHeight: 1.2,
              marginBottom: "1.25rem",
              letterSpacing: "-0.025em",
            }}
          >
            Smarter Buying Decisions,
            <br />
            <span style={{ color: "#fde68a" }}>Backed by Research</span>
          </h1>

          <p
            style={{
              fontSize: "1.1rem",
              color: "rgba(255,255,255,0.85)",
              maxWidth: "600px",
              margin: "0 auto 2.5rem",
              lineHeight: 1.7,
            }}
          >
            In-depth product reviews, honest comparisons, and expert buying guides to help you
            spend wisely. Our research does the hard work so you don&apos;t have to.
          </p>

          {/* Search Bar */}
          <form
            action="/categories"
            method="GET"
            style={{
              display: "flex",
              maxWidth: "540px",
              margin: "0 auto 2rem",
              background: "white",
              borderRadius: "0.75rem",
              overflow: "hidden",
              boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", padding: "0 1rem", flex: 1 }}>
              <Search size={18} style={{ color: "#9ca3af", marginRight: "0.5rem", flexShrink: 0 }} />
              <input
                type="text"
                name="q"
                placeholder="Search product reviews, guides..."
                style={{
                  border: "none",
                  outline: "none",
                  fontSize: "0.95rem",
                  color: "#111827",
                  width: "100%",
                  padding: "1rem 0",
                  background: "transparent",
                }}
              />
            </div>
            <button
              type="submit"
              className="btn-primary"
              style={{ borderRadius: "0", padding: "1rem 1.5rem", fontSize: "0.9rem" }}
            >
              Search
            </button>
          </form>

          {/* Quick links */}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.75rem" }}>
            {categories.slice(0, 4).map((cat) => (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                style={{
                  background: "rgba(255,255,255,0.15)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.25)",
                  color: "white",
                  padding: "0.4rem 0.875rem",
                  borderRadius: "9999px",
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  textDecoration: "none",
                  transition: "background 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.375rem",
                }}
              >
                {cat.icon} {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STATS ─────────────────────────────────────────── */}
      <section style={{ background: "#f9fafb", borderBottom: "1px solid #e5e7eb", padding: "1.5rem 0" }}>
        <div className="container-main">
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "2rem",
              textAlign: "center",
            }}
          >
            {[
              { icon: <BookOpen size={20} style={{ color: "#1a56db" }} />, value: "50+", label: "Buying Guides" },
              { icon: <Award size={20} style={{ color: "#f59e0b" }} />, value: "200+", label: "Products Researched" },
              { icon: <Users size={20} style={{ color: "#10b981" }} />, value: "10K+", label: "Monthly Readers" },
              { icon: <Clock size={20} style={{ color: "#8b5cf6" }} />, value: "Updated", label: "Regularly" },
            ].map((stat, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div
                  style={{
                    background: "white",
                    borderRadius: "0.625rem",
                    padding: "0.5rem",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  }}
                >
                  {stat.icon}
                </div>
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontWeight: 800, color: "#111827", fontSize: "1.1rem" }}>{stat.value}</div>
                  <div style={{ fontSize: "0.8rem", color: "#6b7280" }}>{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED CATEGORIES ───────────────────────────── */}
      <section className="section-padding" style={{ background: "white" }}>
        <div className="container-main">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <p style={{ fontSize: "0.8rem", fontWeight: 700, color: "#1a56db", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.375rem" }}>
                Browse by Category
              </p>
              <h2 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#111827" }}>
                What Are You Shopping For?
              </h2>
            </div>
            <Link href="/categories" className="btn-outline" style={{ fontSize: "0.875rem" }}>
              All Categories <ArrowRight size={14} />
            </Link>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {categories.map((cat) => (
              <CategoryCard key={cat.slug} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── LATEST BUYING GUIDES ──────────────────────────── */}
      <section className="section-padding" style={{ background: "#f9fafb" }}>
        <div className="container-main">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <p style={{ fontSize: "0.8rem", fontWeight: 700, color: "#1a56db", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.375rem" }}>
                Expert Guides
              </p>
              <h2 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#111827" }}>
                Latest Buying Guides
              </h2>
            </div>
            <Link href="/guides" className="btn-outline" style={{ fontSize: "0.875rem" }}>
              All Guides <ArrowRight size={14} />
            </Link>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {guides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="card group"
                style={{ textDecoration: "none", display: "block", padding: "1.5rem" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
                  <span
                    style={{
                      background: "#eff6ff",
                      color: "#1a56db",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      padding: "0.2rem 0.6rem",
                      borderRadius: "9999px",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Buying Guide
                  </span>
                  <span style={{ fontSize: "0.75rem", color: "#9ca3af" }}>
                    {new Date(guide.frontmatter.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                </div>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#111827", lineHeight: 1.4, marginBottom: "0.5rem" }}>
                  {guide.frontmatter.title}
                </h3>
                <p style={{ fontSize: "0.875rem", color: "#6b7280", lineHeight: 1.6, marginBottom: "1rem" }}>
                  {guide.frontmatter.excerpt.substring(0, 120)}...
                </p>
                <span
                  style={{
                    color: "#1a56db",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    gap: "0.25rem",
                  }}
                >
                  Read Guide <ArrowRight size={13} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED PRODUCTS COMPARISON ─────────────────── */}
      <section className="section-padding" style={{ background: "white" }}>
        <div className="container-main">
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <p style={{ fontSize: "0.8rem", fontWeight: 700, color: "#1a56db", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.375rem" }}>
              Our Top Picks
            </p>
            <h2 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#111827", marginBottom: "0.75rem" }}>
              Featured Product Comparison
            </h2>
            <p style={{ fontSize: "0.95rem", color: "#6b7280", maxWidth: "520px", margin: "0 auto" }}>
              This guide compares our highest-rated picks across categories. Updated regularly based on our ongoing research.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {featuredProducts.map((product) => (
              <div key={product.id} className="card" style={{ padding: "1.5rem" }}>
                {product.tag && (
                  <div style={{ marginBottom: "1rem" }}>
                    <span
                      className={`tag-pill ${
                        product.tag === "Best Overall"
                          ? "tag-best-overall"
                          : product.tag === "Best Budget"
                          ? "tag-best-budget"
                          : product.tag === "Best Premium"
                          ? "tag-best-premium"
                          : "tag-editors-pick"
                      }`}
                    >
                      🏆 {product.tag}
                    </span>
                  </div>
                )}

                <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#111827", lineHeight: 1.4, marginBottom: "0.5rem" }}>
                  {product.shortTitle}
                </h3>
                <p style={{ fontSize: "0.8rem", color: "#9ca3af", marginBottom: "0.75rem" }}>
                  {product.brand}
                </p>

                <StarRating rating={product.rating} reviewCount={product.reviewCount} />

                <p style={{ fontSize: "0.875rem", color: "#6b7280", lineHeight: 1.6, margin: "1rem 0" }}>
                  {product.summary.substring(0, 130)}...
                </p>

                <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                  <AmazonCTAButton asin={product.asin} productName={product.shortTitle} size="sm" />
                  <Link
                    href={`/reviews/${product.slug === "cordless-drill" ? "dewalt-cordless-drill-review" : product.slug === "kitchen-knife-set" ? "victorinox-kitchen-knife-set-review" : "#"}`}
                    className="btn-outline"
                    style={{ fontSize: "0.8rem", padding: "0.5rem 1rem" }}
                  >
                    Full Review
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TRUST SECTION ─────────────────────────────────── */}
      <section
        className="section-padding"
        style={{
          background: "linear-gradient(135deg, #1e3a8a 0%, #1a56db 100%)",
          color: "white",
        }}
      >
        <div className="container-main">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "1.75rem", fontWeight: 800, color: "white", marginBottom: "0.75rem" }}>
              Why Trust Our Research?
            </h2>
            <p style={{ color: "rgba(255,255,255,0.8)", maxWidth: "520px", margin: "0 auto" }}>
              We publish independent product research — no paid placements, no incentivized reviews.
              Here&apos;s what that means for you.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem" }}>
            {[
              {
                icon: <Shield size={24} />,
                title: "Independent Research",
                desc: "We are not sponsored by or affiliated with manufacturers. Our rankings are based solely on research and analysis.",
              },
              {
                icon: <CheckCircle size={24} />,
                title: "No Fake Reviews",
                desc: "We do not fabricate user reviews or testimonials. Content uses honest language: 'Our research suggests...'",
              },
              {
                icon: <BarChart2 size={24} />,
                title: "Data-Driven Comparisons",
                desc: "We compare real specs, CADR ratings, test data, and community feedback — not marketing claims.",
              },
              {
                icon: <BookOpen size={24} />,
                title: "Transparent Disclosure",
                desc: "We earn affiliate commissions on qualifying purchases. This never influences our recommendations.",
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  background: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "1rem",
                  padding: "1.5rem",
                }}
              >
                <div style={{ marginBottom: "0.875rem", color: "#fde68a" }}>{item.icon}</div>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "white", marginBottom: "0.5rem" }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <Link href="/affiliate-disclosure" className="btn-outline" style={{ borderColor: "rgba(255,255,255,0.5)", color: "white", fontSize: "0.875rem" }}>
              Read Our Full Disclosure
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
