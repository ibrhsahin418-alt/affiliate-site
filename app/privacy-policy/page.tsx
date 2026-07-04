import type { Metadata } from "next";
import { siteConfig } from "@/data/config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${siteConfig.name}. Learn how we collect, use, and protect your information.`,
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "June 1, 2024";

  return (
    <div className="section-padding">
      <div className="container-main" style={{ maxWidth: "800px" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "#111827", marginBottom: "0.375rem" }}>
          Privacy Policy
        </h1>
        <p style={{ fontSize: "0.85rem", color: "#9ca3af", marginBottom: "2.5rem" }}>
          Last updated: {lastUpdated}
        </p>

        <div className="prose" style={{ maxWidth: "none" }}>
          <p>
            {siteConfig.name} (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting your privacy.
            This Privacy Policy explains how we collect, use, and share information when you visit{" "}
            {siteConfig.siteUrl}.
          </p>

          <h2>1. Information We Collect</h2>
          <p>We may collect the following types of information:</p>
          <ul>
            <li><strong>Usage Data:</strong> Pages visited, time on site, browser type, and referring URLs collected through analytics tools (e.g., Google Analytics)</li>
            <li><strong>Contact Form Submissions:</strong> Name, email address, and message content when you use our contact form</li>
            <li><strong>Cookies:</strong> Small data files stored on your device for analytics and functionality</li>
          </ul>
          <p>We do not collect payment information. We do not sell or rent your personal data to third parties.</p>

          <h2>2. How We Use Information</h2>
          <ul>
            <li>To operate and improve the website</li>
            <li>To respond to your contact form submissions</li>
            <li>To analyze site traffic and content performance</li>
            <li>To comply with legal obligations</li>
          </ul>

          <h2>3. Amazon Affiliate Links</h2>
          <p>
            When you click an affiliate link on our site and visit Amazon.com, Amazon may place
            cookies on your browser to track your session. Amazon&apos;s use of cookies is governed by{" "}
            <a href="https://www.amazon.com/privacy" target="_blank" rel="noopener noreferrer">
              Amazon&apos;s Privacy Notice
            </a>
            . We are a participant in the Amazon Services LLC Associates Program and may earn
            commissions from qualifying purchases.
          </p>

          <h2>4. Cookies</h2>
          <p>We use cookies for:</p>
          <ul>
            <li><strong>Analytics:</strong> Understanding how visitors use our site (Google Analytics)</li>
            <li><strong>Functionality:</strong> Remembering your preferences</li>
          </ul>
          <p>You can disable cookies in your browser settings, but some features may not function correctly.</p>

          <h2>5. Third-Party Services</h2>
          <p>We may use the following third-party services that have their own privacy policies:</p>
          <ul>
            <li>Google Analytics — for website analytics</li>
            <li>Amazon Associates — for affiliate link tracking</li>
          </ul>

          <h2>6. Children&apos;s Privacy</h2>
          <p>
            This website is not directed to children under 13. We do not knowingly collect personal
            information from children.
          </p>

          <h2>7. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. The &quot;Last updated&quot; date above
            will reflect the most recent changes.
          </p>

          <h2>8. Contact</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us at{" "}
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
