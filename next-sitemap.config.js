/** @type {import('next-sitemap').IConfig} */
module.exports = {
  // ✅ UPDATE THIS: Replace with your actual domain before publishing
  siteUrl: process.env.SITE_URL || "https://yourdomain.com",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
    ],
  },
  exclude: ["/api/*"],
  changefreq: "weekly",
  priority: 0.7,
};
