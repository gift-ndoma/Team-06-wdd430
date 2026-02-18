import { sql } from "./db";
import type { Artisan, Product, Review } from "./types";

export async function getRandomFeaturedProducts(limit = 4): Promise<Product[]> {
  const rows = await sql<Product[]>`
    SELECT
      p.id, p.name, p.description, p.price_cents, p.image_url, p.artisan_id,
      a.name AS artisan_name, a.slug AS artisan_slug,
      AVG(r.rating) AS rating
    FROM products p
    LEFT JOIN artisans a ON a.id = p.artisan_id
    LEFT JOIN reviews  r ON r.product_id = p.id
    GROUP BY p.id, a.name, a.slug
    ORDER BY random()
    LIMIT ${limit};
  `;
  return rows;
}

// ✅ NEW: Get all products for /products page
export async function getAllProducts(limit = 200): Promise<Product[]> {
  const rows = await sql<Product[]>`
    SELECT
      p.id,
      p.name,
      p.description,
      p.price_cents,
      p.image_url,
      p.artisan_id,
      a.name as artisan_name,
      a.slug as artisan_slug,
      AVG(r.rating) AS "rating"
    FROM
      products p
      LEFT JOIN artisans a
        ON a.id = p.artisan_id
      LEFT JOIN reviews r
        ON p.id=r.product_id
    GROUP BY p.id, a.name, a.slug
    ORDER BY p.name
    LIMIT ${limit};
  `;
  return rows;
}

/**
 * Get a single product by ID, including its average rating
 */
export async function getProductById(id: string): Promise<Product | null> {
  const rows = await sql<Product[]>`
    SELECT
      p.id,
      p.name,
      p.description,
      p.price_cents,
      p.image_url,
      p.artisan_id,
      a.name  AS artisan_name,
      a.slug  AS artisan_slug,
      AVG(r.rating) AS rating
    FROM products p
    LEFT JOIN artisans a ON a.id = p.artisan_id
    LEFT JOIN reviews  r ON r.product_id = p.id
    WHERE p.id = ${id}
    GROUP BY p.id, a.name, a.slug;
  `;
  return rows[0] ?? null;
}

/**
 * Get all reviews for a product, newest first
 */
export async function getReviewsByProductId(productId: string): Promise<Review[]> {
  try {
    const rows = await sql<Review[]>`
      SELECT id, product_id, rating, comment, created_at
      FROM reviews
      WHERE product_id = ${productId}
      ORDER BY created_at DESC;
    `;
    return rows;
  } catch {
    return [];
  }
}

export async function getRandomArtisans(limit = 3): Promise<Artisan[]> {
  const rows = await sql<Artisan[]>`
    SELECT id, name, bio, location, profile_image_url
    FROM artisans
    ORDER BY random()
    LIMIT ${limit};
  `;
  return rows;
}
