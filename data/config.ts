// ============================================================
// SITE CONFIGURATION
// Update these values before publishing your site
// ============================================================

export const siteConfig = {
  name: "BestPicksReview",
  tagline: "Independent Product Research You Can Trust",
  description:
    "We help you make smarter buying decisions with in-depth product reviews, comparison guides, and expert recommendations across Home & Kitchen, Electronics, Baby & Kids, Tools, and Health.",
  // ✅ UPDATE THIS: Replace with your actual domain before going live
  siteUrl: "https://yourdomain.com",
  // ✅ UPDATE THIS: Replace YOURTAG-20 with your real Amazon Associates tracking ID
  // You can find your tracking ID in your Amazon Associates dashboard
  // Example: "johnsmith-20"
  amazonAffiliateTag: "ibrhshn-20",
  // Social / contact
  email: "contact@yourdomain.com",
  // Amazon disclosure (required by Amazon Associates Program)
  amazonDisclosure:
    "As an Amazon Associate I earn from qualifying purchases. This means we may earn a commission if you click through and make a purchase, at no extra cost to you.",
  // Open Graph / Social sharing defaults
  ogImage: "/images/og-default.jpg",
  twitterHandle: "@yourhandle",
};

// ============================================================
// AFFILIATE LINK BUILDER
// Uses amazonAffiliateTag above — update the tag once and all
// links across the site automatically use the correct tag.
// ============================================================
export function buildAffiliateLink(asin: string): string {
  // ✅ This function automatically uses your affiliate tag from siteConfig
  // Just update amazonAffiliateTag above and all links will update
  return `https://www.amazon.com/dp/${asin}?tag=${siteConfig.amazonAffiliateTag}`;
}
