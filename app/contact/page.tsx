import type { Metadata } from "next";
import { siteConfig } from "@/data/config";
import { Mail, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Contact ${siteConfig.name} for questions, review requests, corrections, or feedback.`,
};

export default function ContactPage() {
  return (
    <div className="section-padding">
      <div className="container-main" style={{ maxWidth: "700px" }}>
        <div style={{ marginBottom: "2.5rem" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "#111827", marginBottom: "0.75rem" }}>
            Contact Us
          </h1>
          <p style={{ fontSize: "1rem", color: "#6b7280", lineHeight: 1.7 }}>
            Have a question, a product review request, or spotted an error in our content? We&apos;d
            love to hear from you.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2.5rem" }}>
          <div className="card" style={{ padding: "1.25rem", display: "flex", gap: "0.75rem" }}>
            <Mail size={18} style={{ color: "#1a56db", flexShrink: 0, marginTop: "2px" }} />
            <div>
              <p style={{ fontSize: "0.8rem", fontWeight: 700, color: "#374151", marginBottom: "0.25rem" }}>Email Us</p>
              <a href={`mailto:${siteConfig.email}`} style={{ fontSize: "0.875rem", color: "#1a56db" }}>
                {siteConfig.email}
              </a>
            </div>
          </div>
          <div className="card" style={{ padding: "1.25rem", display: "flex", gap: "0.75rem" }}>
            <MessageSquare size={18} style={{ color: "#1a56db", flexShrink: 0, marginTop: "2px" }} />
            <div>
              <p style={{ fontSize: "0.8rem", fontWeight: 700, color: "#374151", marginBottom: "0.25rem" }}>Response Time</p>
              <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>Typically within 2-3 business days</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="card" style={{ padding: "2rem" }}>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#111827", marginBottom: "1.5rem" }}>
            Send a Message
          </h2>
          <form style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label htmlFor="contact-name" style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#374151", marginBottom: "0.375rem" }}>
                  Your Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  placeholder="Jane Smith"
                  style={{ width: "100%", padding: "0.625rem 0.875rem", border: "1px solid #e5e7eb", borderRadius: "0.5rem", fontSize: "0.9rem", outline: "none" }}
                />
              </div>
              <div>
                <label htmlFor="contact-email" style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#374151", marginBottom: "0.375rem" }}>
                  Email Address
                </label>
                <input
                  id="contact-email"
                  type="email"
                  placeholder="jane@example.com"
                  style={{ width: "100%", padding: "0.625rem 0.875rem", border: "1px solid #e5e7eb", borderRadius: "0.5rem", fontSize: "0.9rem", outline: "none" }}
                />
              </div>
            </div>

            <div>
              <label htmlFor="contact-subject" style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#374151", marginBottom: "0.375rem" }}>
                Subject
              </label>
              <select
                id="contact-subject"
                style={{ width: "100%", padding: "0.625rem 0.875rem", border: "1px solid #e5e7eb", borderRadius: "0.5rem", fontSize: "0.9rem", outline: "none", background: "white" }}
              >
                <option>General Question</option>
                <option>Review Request</option>
                <option>Content Correction</option>
                <option>Partnership Inquiry</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="contact-message" style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#374151", marginBottom: "0.375rem" }}>
                Message
              </label>
              <textarea
                id="contact-message"
                rows={5}
                placeholder="Your message here..."
                style={{ width: "100%", padding: "0.625rem 0.875rem", border: "1px solid #e5e7eb", borderRadius: "0.5rem", fontSize: "0.9rem", outline: "none", resize: "vertical" }}
              />
            </div>

            <div
              style={{
                background: "#fffbeb",
                border: "1px solid #fde68a",
                borderRadius: "0.5rem",
                padding: "0.75rem 1rem",
                fontSize: "0.8rem",
                color: "#78350f",
              }}
            >
              <strong>Note:</strong> This form is for editorial contact only. We do not accept paid
              placements, sponsored reviews, or manufacturer submissions that require positive coverage.
            </div>

            <button
              type="submit"
              className="btn-primary"
              style={{ alignSelf: "flex-start" }}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
