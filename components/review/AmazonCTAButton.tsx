import { buildAffiliateLink } from "@/data/config";
import { ExternalLink, AlertCircle } from "lucide-react";

interface AmazonCTAButtonProps {
  asin: string;
  productName: string;
  size?: "sm" | "md" | "lg";
}

export default function AmazonCTAButton({ asin, productName, size = "lg" }: AmazonCTAButtonProps) {
  // ✅ buildAffiliateLink() uses your affiliate tag from data/config.ts
  // Update amazonAffiliateTag in data/config.ts to use your real tag
  const affiliateLink = buildAffiliateLink(asin);

  const padding = size === "sm" ? "0.5rem 1rem" : size === "md" ? "0.75rem 1.5rem" : "1rem 2.5rem";
  const fontSize = size === "sm" ? "0.875rem" : size === "md" ? "0.95rem" : "1.05rem";

  return (
    <div>
      <a
        href={affiliateLink}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="btn-amazon"
        style={{ padding, fontSize, display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
        aria-label={`Check price for ${productName} on Amazon (affiliate link)`}
      >
        {/* Amazon "a" logo placeholder */}
        <span style={{ fontWeight: 900, fontSize: "1.1em", fontFamily: "Georgia, serif", fontStyle: "italic" }}>a</span>
        Check Price on Amazon
        <ExternalLink size={14} />
      </a>
      <p
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "0.375rem",
          marginTop: "0.625rem",
          fontSize: "0.75rem",
          color: "#9ca3af",
          lineHeight: "1.5",
        }}
      >
        <AlertCircle size={12} style={{ marginTop: "1px", flexShrink: 0 }} />
        Prices and availability are subject to change. As an Amazon Associate we earn from qualifying
        purchases.
      </p>
    </div>
  );
}
