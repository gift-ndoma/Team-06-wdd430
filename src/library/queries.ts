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
  try {
    return (await sql<Product[]>`
      SELECT
        p.id,
        p.name,
        p.description,
        p.price_cents,
        p.image_url,
        p.artisan_id,
        a.name as artisan_name,
        a.slug as artisan_slug,
        AVG(r.rating) AS rating
      FROM
        products p
        LEFT JOIN artisans a
          ON a.id = p.artisan_id
        LEFT JOIN reviews r
          ON p.id=r.product_id
      WHERE p.id=${id}
      GROUP BY p.id, a.name, a.slug;
    `)[0] ?? null
  }
  catch (error) {
    console.error("Error fetching product:", error);
    return null;
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

export async function getReviewsByProductId(id: string): Promise<{
  reviews: Review[],
  ratingsCount: number,
  reviewsCount: number,
} | null> {
  try {
    const results = {
      reviews: await sql<Review[]>`
        SELECT 
          r.id,
          r.rating,
          r.body,
          COALESCE(u.name, 'Anonymous') AS name
        FROM
          reviews r
          LEFT JOIN users u
            ON r.user_id = u.id
        WHERE 
          r.product_id = ${id}
          AND r.body IS NOT NULL;
      `,
      ratingsCount: (await sql<{count: number}[]>`
        SELECT
          COUNT(id) AS "count"
        FROM
          reviews
        WHERE
          product_id = ${id};
      `)[0]?.count ?? 0,
      reviewsCount: 0,
    };
    results.reviewsCount = results.reviews.length;

    return results;
  }
  catch(error) {
    console.log("Error fetching reviews:", error);
    return null;
  }
}
