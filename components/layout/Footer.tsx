import Link from "next/link";
import { siteConfig } from "@/data/config";
import { categories } from "@/data/categories";
import { Shield, ExternalLink } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ background: "#111827", color: "#d1d5db" }}>
      {/* Affiliate Disclosure Banner */}
      <div
        style={{
          background: "#1f2937",
          borderBottom: "1px solid #374151",
          padding: "1rem 1.5rem",
        }}
      >
        <div className="container-main">
          <div className="flex items-start gap-3">
            <Shield size={18} style={{ color: "#f59e0b", marginTop: "2px", flexShrink: 0 }} />
            <p style={{ fontSize: "0.85rem", color: "#9ca3af", lineHeight: "1.6" }}>
              <strong style={{ color: "#f3f4f6" }}>Amazon Affiliate Disclosure:</strong>{" "}
              {siteConfig.amazonDisclosure} We are a participant in the Amazon Services LLC
              Associates Program, an affiliate advertising program designed to provide a means for
              sites to earn advertising fees by advertising and linking to Amazon.com.{" "}
              <strong style={{ color: "#f3f4f6" }}>
                Amazon does not sponsor, endorse, or support this website.
              </strong>
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-main" style={{ padding: "3rem 1.5rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "2.5rem",
            marginBottom: "2.5rem",
          }}
        >
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div
                style={{
                  background: "linear-gradient(135deg, #1a56db 0%, #3b82f6 100%)",
                  borderRadius: "0.5rem",
                  width: "2rem",
                  height: "2rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ color: "white", fontWeight: 800, fontSize: "0.9rem" }}>B</span>
              </div>
              <span style={{ fontWeight: 800, color: "white", fontSize: "1.1rem" }}>
                {siteConfig.name}
              </span>
            </div>
            <p style={{ fontSize: "0.875rem", color: "#9ca3af", lineHeight: "1.7", marginBottom: "1rem" }}>
              Independent product research and reviews. We help you make smarter buying decisions.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 style={{ color: "white", fontSize: "0.875rem", fontWeight: 700, marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Categories
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/categories/${cat.slug}`}
                    style={{ fontSize: "0.875rem", color: "#9ca3af", textDecoration: "none", display: "flex", alignItems: "center", gap: "0.5rem" }}
                    className="hover:text-white transition-colors"
                  >
                    <span>{cat.icon}</span>
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Content */}
          <div>
            <h3 style={{ color: "white", fontSize: "0.875rem", fontWeight: 700, marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Content
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {[
                { label: "All Reviews", href: "/reviews" },
                { label: "Buying Guides", href: "/guides" },
                { label: "All Categories", href: "/categories" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{ fontSize: "0.875rem", color: "#9ca3af", textDecoration: "none" }}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 style={{ color: "white", fontSize: "0.875rem", fontWeight: 700, marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Legal
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {[
                { label: "About Us", href: "/about" },
                { label: "Contact", href: "/contact" },
                { label: "Privacy Policy", href: "/privacy-policy" },
                { label: "Affiliate Disclosure", href: "/affiliate-disclosure" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{ fontSize: "0.875rem", color: "#9ca3af", textDecoration: "none" }}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: "1px solid #374151",
            paddingTop: "1.5rem",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <p style={{ fontSize: "0.8rem", color: "#6b7280" }}>
            © {currentYear} {siteConfig.name}. All rights reserved. Independent product reviews —
            not affiliated with, sponsored by, or endorsed by Amazon.com.
          </p>
          <p style={{ fontSize: "0.8rem", color: "#6b7280", display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <ExternalLink size={12} />
            Amazon and the Amazon logo are trademarks of Amazon.com, Inc.
          </p>
        </div>
      </div>
    </footer>
  );
}
