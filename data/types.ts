// ============================================================
// TYPESCRIPT TYPES
// Shared interfaces for products, reviews, guides, categories
// ============================================================

export interface Product {
  id: string;
  slug: string;
  asin: string; // Amazon Standard Identification Number
  title: string;
  shortTitle: string;
  category: string; // category slug
  brand: string;
  image: string; // path to /public/images/...
  rating: number; // 1-5
  reviewCount: number;
  summary: string;
  pros: string[];
  cons: string[];
  bestFor: string[];
  keyFeatures: KeyFeature[];
  verdict: string;
  tag?: "Best Overall" | "Best Budget" | "Best Premium" | "Editor's Pick";
  featured?: boolean;
}

export interface KeyFeature {
  name: string;
  value: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string; // emoji or icon name
  image: string;
  color: string; // Tailwind gradient class
  productCount?: number;
}

export interface ReviewFrontmatter {
  title: string;
  slug: string;
  productId: string; // links to a Product
  category: string;
  excerpt: string;
  publishedAt: string; // ISO date string
  updatedAt?: string;
  author: string;
  coverImage: string;
  featured?: boolean;
  seoTitle?: string;
  seoDescription?: string;
}

export interface GuideFrontmatter {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  coverImage: string;
  featured?: boolean;
  productIds: string[]; // products featured in this guide
  seoTitle?: string;
  seoDescription?: string;
  faqs?: FAQ[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface MDXContent<T> {
  frontmatter: T;
  content: string;
  slug: string;
}
