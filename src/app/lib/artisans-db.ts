import postgres from "postgres";

const connectionString =
  process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_URL;

if (!connectionString) {
  throw new Error("Missing POSTGRES_URL (or POSTGRES_URL_NON_POOLING) in env");
}

const sql = postgres(connectionString, { ssl: "require" });

export type ArtisanRow = {
  id: string;
  name: string;
  bio: string;
  location: string;
  profile_image_url: string;
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

export async function getArtisans(): Promise<ArtisanRow[]> {
  return sql<ArtisanRow[]>`
    select id, name, bio, location, profile_image_url, slug, short_description
    from artisans
    order by name;
  `;
}

export async function getArtisanById(
  id: string
): Promise<(ArtisanRow & { products: ProductRow[] }) | null> {
  const rows = await sql<ArtisanRow[]>`
    select id, name, bio, location, profile_image_url, slug, short_description
    from artisans
    where id = ${id}
    limit 1;
  `;

  const artisan = rows[0];
  if (!artisan) return null;

  const products = await sql<ProductRow[]>`
    select id, name, description, price_cents, image_url
    from products
    where artisan_id = ${artisan.id}
    order by name;
  `;

  return { ...artisan, products };
}

export async function getArtisanBySlug(
  slug: string
): Promise<(ArtisanRow & { products: ProductRow[] }) | null> {
  const rows = await sql<ArtisanRow[]>`
    select id, name, bio, location, profile_image_url, slug, short_description
    from artisans
    where slug = ${slug}
    limit 1;
  `;

  const artisan = rows[0];
  if (!artisan) return null;

  const products = await sql<ProductRow[]>`
    select id, name, description, price_cents, image_url
    from products
    where artisan_id = ${artisan.id}
    order by name;
  `;

  return { ...artisan, products };
}
