import { sql } from "./db";
import { supabase } from "./supabase";
import type { Artisan, Product } from "./types";

export async function getRandomFeaturedProducts(limit = 4): Promise<Product[]> {
  const rows = await sql<Product[]>`
    SELECT
      p.id, p.name, p.description, p.price_cents, p.image_url, p.artisan_id,
      a.name as artisan_name
    FROM products p
    LEFT JOIN artisans a ON a.id = p.artisan_id
    ORDER BY random()
    LIMIT ${limit};
  `;
  return rows;
}

// ✅ NEW: Get all products for /products page
export async function getAllProducts(limit = 200): Promise<Product[]> {
  const rows = await sql<Product[]>`
    SELECT
      p.id, p.name, p.description, p.price_cents, p.image_url, p.artisan_id,
      a.name as artisan_name
    FROM products p
    LEFT JOIN artisans a ON a.id = p.artisan_id
    ORDER BY p.name
    LIMIT ${limit};
  `;
  return rows;
}

/**
 * Get a single product by ID
 */
export async function getProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .select(`
      id,
      name,
      description,
      price_cents,
      image_url,
      artisan_id,
      artisans ( name )
    `)
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching product:", error);
    return null;
  }

  if (!data) return null;

  return {
    id: data.id,
    name: data.name,
    description: data.description,
    price_cents: data.price_cents,
    image_url: data.image_url,
    artisan_id: data.artisan_id,
    artisan_name: (data as any).artisans?.name ?? null,
  };
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
