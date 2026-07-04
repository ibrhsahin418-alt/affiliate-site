/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [],
    // Allow local images from /public
  },
  // Enable MDX support
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
};

module.exports = nextConfig;
