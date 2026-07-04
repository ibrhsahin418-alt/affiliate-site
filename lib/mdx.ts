import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { ReviewFrontmatter, GuideFrontmatter, MDXContent } from "@/data/types";

const reviewsDir = path.join(process.cwd(), "content/reviews");
const guidesDir = path.join(process.cwd(), "content/guides");

// ─── Reviews ─────────────────────────────────────────────────────────────────

export function getAllReviewSlugs(): string[] {
  if (!fs.existsSync(reviewsDir)) return [];
  return fs
    .readdirSync(reviewsDir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getReview(slug: string): MDXContent<ReviewFrontmatter> | null {
  const filePath = path.join(reviewsDir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    frontmatter: data as ReviewFrontmatter,
    content,
    slug,
  };
}

export function getAllReviews(): MDXContent<ReviewFrontmatter>[] {
  const slugs = getAllReviewSlugs();
  return slugs
    .map((slug) => getReview(slug))
    .filter(Boolean) as MDXContent<ReviewFrontmatter>[];
}

export function getReviewsByCategory(
  categorySlug: string
): MDXContent<ReviewFrontmatter>[] {
  return getAllReviews().filter(
    (r) => r.frontmatter.category === categorySlug
  );
}

// ─── Guides ──────────────────────────────────────────────────────────────────

export function getAllGuideSlugs(): string[] {
  if (!fs.existsSync(guidesDir)) return [];
  return fs
    .readdirSync(guidesDir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getGuide(slug: string): MDXContent<GuideFrontmatter> | null {
  const filePath = path.join(guidesDir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    frontmatter: data as GuideFrontmatter,
    content,
    slug,
  };
}

export function getAllGuides(): MDXContent<GuideFrontmatter>[] {
  const slugs = getAllGuideSlugs();
  return slugs
    .map((slug) => getGuide(slug))
    .filter(Boolean) as MDXContent<GuideFrontmatter>[];
}

export function getGuidesByCategory(
  categorySlug: string
): MDXContent<GuideFrontmatter>[] {
  return getAllGuides().filter(
    (g) => g.frontmatter.category === categorySlug
  );
}
