import fs from "fs";
import path from "path";
import { Product } from "@/data/types";

const productsDir = path.join(process.cwd(), "content/products");

export function getAllProducts(): Product[] {
  if (!fs.existsSync(productsDir)) return [];
  const files = fs.readdirSync(productsDir).filter((f) => f.endsWith(".json"));
  return files.map((file) => {
    const raw = fs.readFileSync(path.join(productsDir, file), "utf-8");
    return JSON.parse(raw) as Product;
  });
}

export function getProductById(id: string): Product | null {
  const all = getAllProducts();
  return all.find((p) => p.id === id) ?? null;
}

export function getProductBySlug(slug: string): Product | null {
  const all = getAllProducts();
  return all.find((p) => p.slug === slug) ?? null;
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return getAllProducts().filter((p) => p.category === categorySlug);
}

export function getFeaturedProducts(): Product[] {
  return getAllProducts().filter((p) => p.featured);
}
