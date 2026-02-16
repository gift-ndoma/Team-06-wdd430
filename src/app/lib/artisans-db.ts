import postgres from "postgres";

/**
 * Database connection
 */
const connectionString =
  process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_URL;

if (!connectionString) {
  throw new Error("Missing POSTGRES_URL (or POSTGRES_URL_NON_POOLING) in env");
}

const sql = postgres(connectionString, { ssl: "require" });

/**
 * Types
 */
export type ArtisanRow = {
  id: string;
  name: string;
  bio: string;
  location: string;
  profile_image_url: string | null;
  slug: string | null;
  short_description: string | null;
};

export type ProductRow = {
  id: string;
  name: string;
  description: string;
  price_cents: number;
  image_url: string;
};

/**
 * Get ALL artisans (for /artisans page)
 */
export async function getArtisans(): Promise<ArtisanRow[]> {
  return sql<ArtisanRow[]>`
    SELECT id, name, bio, location, profile_image_url, slug, short_description
    FROM artisans
    ORDER BY name;
  `;
}

/**
 * Get artisans for HOME page (limit to 3, must have slug)
 */
export async function getHomeArtisans(
  limit = 3
): Promise<ArtisanRow[]> {
  return sql<ArtisanRow[]>`
    SELECT id, name, bio, location, profile_image_url, slug, short_description
    FROM artisans
    WHERE slug IS NOT NULL
    ORDER BY name
    LIMIT ${limit};
  `;
}

/**
 * Get artisan by ID (admin / internal use)
 */
export async function getArtisanById(
  id: string
): Promise<(ArtisanRow & { products: ProductRow[] }) | null> {
  const rows = await sql<ArtisanRow[]>`
    SELECT id, name, bio, location, profile_image_url, slug, short_description
    FROM artisans
    WHERE id = ${id}
    LIMIT 1;
  `;

  const artisan = rows[0];
  if (!artisan) return null;

  const products = await sql<ProductRow[]>`
    SELECT id, name, description, price_cents, image_url
    FROM products
    WHERE artisan_id = ${artisan.id}
    ORDER BY name;
  `;

  return { ...artisan, products };
}

/**
 * Get artisan by SLUG (public bio page)
 */
export async function getArtisanBySlug(
  slug: string
): Promise<(ArtisanRow & { products: ProductRow[] }) | null> {
  const safeSlug = decodeURIComponent(slug).trim();
  if (!safeSlug) return null;

  const rows = await sql<ArtisanRow[]>`
    SELECT id, name, bio, location, profile_image_url, slug, short_description
    FROM artisans
    WHERE slug = ${safeSlug}
    LIMIT 1;
  `;

  const artisan = rows[0];
  if (!artisan) return null;

  const products = await sql<ProductRow[]>`
    SELECT id, name, description, price_cents, image_url
    FROM products
    WHERE artisan_id = ${artisan.id}
    ORDER BY name;
  `;

  return { ...artisan, products };
}



