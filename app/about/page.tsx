import type { Metadata } from "next";
import { siteConfig } from "@/data/config";
import { Shield, BookOpen, CheckCircle, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${siteConfig.name} — our mission, how we research products, and why we publish independent buying guides and reviews.`,
};

export default function AboutPage() {
  return (
    <div className="section-padding">
      <div className="container-main" style={{ maxWidth: "800px" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "#111827", marginBottom: "0.75rem" }}>
          About {siteConfig.name}
        </h1>
        <p style={{ fontSize: "1.1rem", color: "#6b7280", lineHeight: 1.7, marginBottom: "3rem" }}>
          We help everyday consumers make smarter buying decisions with research-backed product reviews
          and comparison guides.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem", marginBottom: "3rem" }}>
          {[
            { icon: <Shield size={24} style={{ color: "#1a56db" }} />, title: "Independent", desc: "We are not paid by manufacturers. Our research is unbiased and editorially independent." },
            { icon: <BookOpen size={24} style={{ color: "#1a56db" }} />, title: "Research-Based", desc: "Our guides are based on spec analysis, community feedback, and publicly available test data." },
            { icon: <CheckCircle size={24} style={{ color: "#1a56db" }} />, title: "Transparent", desc: "We disclose that we earn affiliate commissions from qualifying purchases. This never influences our rankings." },
            { icon: <Users size={24} style={{ color: "#1a56db" }} />, title: "Reader-First", desc: "We write for our readers, not for advertisers. We recommend what we genuinely believe is best." },
          ].map((item, i) => (
            <div key={i} className="card" style={{ padding: "1.5rem" }}>
              <div style={{ marginBottom: "0.75rem" }}>{item.icon}</div>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#111827", marginBottom: "0.375rem" }}>{item.title}</h3>
              <p style={{ fontSize: "0.875rem", color: "#6b7280", lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="prose" style={{ maxWidth: "none" }}>
          <h2>Our Mission</h2>
          <p>
            Shopping online is overwhelming. There are thousands of options for every product, and
            it&apos;s hard to know what&apos;s genuinely good versus what&apos;s just heavily marketed.
            {siteConfig.name} exists to cut through the noise.
          </p>
          <p>
            We research products across major categories — Home &amp; Kitchen, Electronics, Baby &amp; Kids, Tools &amp;
            Home Improvement, and Health &amp; Personal Care — and publish honest, structured buying
            guides and reviews that help you make confident purchasing decisions.
          </p>

          <h2>How We Research Products</h2>
          <p>Our research process draws from multiple sources:</p>
          <ul>
            <li><strong>Manufacturer specifications</strong> — We analyze official specs and certifications</li>
            <li><strong>Independent lab data</strong> — Where publicly available (e.g., AHAM CADR data for air purifiers)</li>
            <li><strong>Community feedback</strong> — We analyze patterns in verified purchaser feedback</li>
            <li><strong>Expert consensus</strong> — We review published expert analyses and comparisons</li>
          </ul>
          <p>
            We use language like &quot;Our research suggests...&quot; and &quot;This guide compares...&quot; because we
            are honest about the nature of our analysis. We do not test products in a lab unless we
            explicitly state we have.
          </p>

          <h2>Amazon Affiliate Disclosure</h2>
          <p>
            {siteConfig.name} participates in the Amazon Services LLC Associates Program. When you
            click our affiliate links and make a qualifying purchase, we earn a small commission at
            no additional cost to you.
          </p>
          <p>
            <strong>Our editorial independence is never compromised by this relationship.</strong> We
            recommend products because our research indicates they are the best choice — not because
            they earn us higher commissions. Amazon does not sponsor, endorse, or review our content.
          </p>

          <h2>Content Standards</h2>
          <ul>
            <li>We do not publish fake user reviews or fabricated testimonials</li>
            <li>We do not accept payment for product rankings or reviews</li>
            <li>We do not display live prices (as they change frequently and we cannot guarantee accuracy)</li>
            <li>We do not scrape or reproduce Amazon product images</li>
            <li>We update guides when products are discontinued or significantly changed</li>
          </ul>

          <h2>Contact Us</h2>
          <p>
            For questions, review requests, or corrections, please reach out via our{" "}
            <a href="/contact">Contact page</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
