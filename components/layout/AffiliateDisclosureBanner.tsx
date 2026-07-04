import { siteConfig } from "@/data/config";
import { Shield } from "lucide-react";
import Link from "next/link";

export default function AffiliateDisclosureBanner() {
  return (
    <div className="disclosure-banner">
      <div className="container-main flex items-center justify-center gap-2 flex-wrap">
        <Shield size={13} />
        <span>
          <strong>Affiliate Disclosure:</strong> {siteConfig.amazonDisclosure}{" "}
          <Link
            href="/affiliate-disclosure"
            style={{ color: "#92400e", textDecoration: "underline", fontWeight: 600 }}
          >
            Learn more
          </Link>
        </span>
      </div>
    </div>
  );
}
