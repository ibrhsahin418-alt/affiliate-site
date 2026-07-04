import { Category } from "./types";

export const categories: Category[] = [
  {
    id: "home-kitchen",
    slug: "home-kitchen",
    name: "Home & Kitchen",
    description:
      "Discover top-rated kitchen appliances, cookware, and home essentials. Our research-backed guides help you find the best products for your home.",
    icon: "🍳",
    image: "/images/categories/home-kitchen.jpg",
    color: "from-orange-400 to-red-500",
    productCount: 24,
  },
  {
    id: "tools-home-improvement",
    slug: "tools-home-improvement",
    name: "Tools & Home Improvement",
    description:
      "Find the right power tools, hand tools, and home improvement gear. Compare specs, read expert analysis, and make confident buying decisions.",
    icon: "🔧",
    image: "/images/categories/tools.jpg",
    color: "from-blue-500 to-indigo-600",
    productCount: 18,
  },
  {
    id: "baby-kids",
    slug: "baby-kids",
    name: "Baby & Kids",
    description:
      "Safety-first product reviews for baby monitors, strollers, car seats, and more. We research products so parents can make informed choices.",
    icon: "👶",
    image: "/images/categories/baby-kids.jpg",
    color: "from-pink-400 to-purple-500",
    productCount: 15,
  },
  {
    id: "electronics",
    slug: "electronics",
    name: "Electronics",
    description:
      "Unbiased comparisons of headphones, smart home devices, laptops, and accessories. Cut through the specs with our plain-language guides.",
    icon: "🎧",
    image: "/images/categories/electronics.jpg",
    color: "from-cyan-400 to-blue-500",
    productCount: 31,
  },
  {
    id: "health-personal-care",
    slug: "health-personal-care",
    name: "Health & Personal Care",
    description:
      "Research-backed reviews of fitness equipment, personal care devices, supplements, and wellness products to help you live better.",
    icon: "💊",
    image: "/images/categories/health.jpg",
    color: "from-green-400 to-teal-500",
    productCount: 20,
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
