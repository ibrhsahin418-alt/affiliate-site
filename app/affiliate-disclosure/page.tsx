import type { Metadata } from "next";
import { siteConfig } from "@/data/config";
import { Shield, CheckCircle, XCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  description: `Affiliate disclosure for ${siteConfig.name}. Learn how our Amazon Associates affiliate relationship works and how it affects our content.`,
};

export default function AffiliateDisclosurePage() {
  return (
    <div className="section-padding">
      <div className="container-main" style={{ maxWidth: "800px" }}>
        {/* Hero disclosure box */}
        <div
          style={{
            background: "#fffbeb",
            border: "2px solid #f59e0b",
            borderRadius: "1rem",
            padding: "2rem",
            marginBottom: "2.5rem",
            display: "flex",
            gap: "1rem",
          }}
        >
          <Shield size={32} style={{ color: "#f59e0b", flexShrink: 0 }} />
          <div>
            <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#111827", marginBottom: "0.75rem" }}>
              Affiliate Disclosure
            </h1>
            <p style={{ fontSize: "1rem", fontWeight: 600, color: "#78350f", lineHeight: 1.6 }}>
              As an Amazon Associate I earn from qualifying purchases.
            </p>
            <p style={{ fontSize: "0.9rem", color: "#92400e", lineHeight: 1.7, marginTop: "0.5rem" }}>
              {siteConfig.amazonDisclosure}
            </p>
          </div>
        </div>

        <div className="prose" style={{ maxWidth: "none" }}>
          <h2>What This Means</h2>
          <p>
            {siteConfig.name} is a participant in the Amazon Services LLC Associates Program, an
            affiliate advertising program designed to provide a means for sites to earn advertising
            fees by advertising and linking to Amazon.com.
          </p>
          <p>
            When you click a &quot;Check Price on Amazon&quot; button or other affiliate link on this website
            and make a qualifying purchase, we earn a small commission from Amazon. This commission
            comes at <strong>no additional cost to you</strong> — you pay the same price you would
            normally pay on Amazon.
          </p>

          <h2>How This Affects Our Content</h2>
          <p>
            <strong>Our affiliate relationship does not influence our rankings, recommendations, or
            editorial content.</strong> We include products in our guides based on research merit, not
            commission rates. Amazon pays a standard commission rate for most product categories —
            there is no incentive for us to recommend one product over another based on commission.
          </p>

          <h2>What We Do</h2>
          {[
            "Disclose our affiliate relationship clearly on every page with affiliate links",
            "Recommend products based on research quality and value",
            "Use honest language: 'Our research suggests...' and 'This guide compares...'",
            "Update our guides when products are discontinued or significantly change",
            "Link to Amazon for price checking only — we do not display live prices",
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <CheckCircle size={16} style={{ color: "#16a34a", marginTop: "2px", flexShrink: 0 }} />
              <span style={{ fontSize: "0.9rem", color: "#374151" }}>{item}</span>
            </div>
          ))}

          <h2 style={{ marginTop: "1.5rem" }}>What We Do Not Do</h2>
          {[
            "Accept payment for product rankings, featured placements, or positive reviews",
            "Claim products are tested unless we explicitly state they were tested",
            "Display live Amazon prices (prices change; our links go to Amazon for current pricing)",
            "Scrape Amazon product data or reproduce Amazon product images",
            "Claim Amazon sponsors, endorses, or supports this website",
            "Publish fake user reviews or fabricated testimonials",
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <XCircle size={16} style={{ color: "#dc2626", marginTop: "2px", flexShrink: 0 }} />
              <span style={{ fontSize: "0.9rem", color: "#374151" }}>{item}</span>
            </div>
          ))}

          <h2>Amazon Trademarks</h2>
          <p>
            Amazon, the Amazon logo, and Amazon Associates are trademarks of Amazon.com, Inc. or its
            affiliates. {siteConfig.name} is not affiliated with, sponsored by, or endorsed by
            Amazon.com, Inc.
          </p>

          <h2>Price and Availability Disclaimer</h2>
          <p>
            Product prices and availability are accurate as of the date/time indicated and are subject
            to change. Any price and availability information displayed on Amazon at the time of
            purchase will apply to the purchase of the product. We do not display live prices on this
            website.
          </p>

          <h2>Questions?</h2>
          <p>
            If you have any questions about our affiliate disclosure or editorial practices, please{" "}
            <a href="/contact">contact us</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
