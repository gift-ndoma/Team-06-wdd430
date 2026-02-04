// src/library/queries.ts



import type { Product, Artisan } from "@/library/types";

/**
 * Get random featured products
 */
export async function getRandomFeaturedProducts(
  limit: number
): Promise<Product[]> {
  const products: Product[] = [
    {
      id: 'prod_1',
      name: 'Handmade Ceramic Mug',
      description: 'A beautifully handcrafted ceramic mug.',
      price_cents: 2800,
      image_url: 'https://example.com/images/mug.jpg',
      artisan_id: 'art_1',
      artisan_name: 'Jane Potter',
    },
    {
      id: 'prod_2',
      name: 'Woven Cotton Scarf',
      description: 'Soft, breathable cotton scarf made on a loom.',
      price_cents: 4500,
      image_url: 'https://example.com/images/scarf.jpg',
      artisan_id: 'art_2',
      artisan_name: 'Liam Weaver',
    },
    {
      id: 'prod_3',
      name: 'Wooden Serving Board',
      description: 'Locally sourced walnut serving board.',
      price_cents: 7200,
      image_url: 'https://example.com/images/board.jpg',
      artisan_id: null,
      artisan_name: null,
    },
  ];

  return products.slice(0, limit);
}

/**
 * Get random artisans
 */
export async function getRandomArtisans(
  limit: number
): Promise<Artisan[]> {
  const artisans: Artisan[] = [
    {
      id: 'art_1',
      name: 'Jane Potter',
      bio: 'Ceramic artist inspired by natural forms.',
      location: 'Asheville, NC',
      profile_image_url: 'https://example.com/images/jane.jpg',
    },
    {
      id: 'art_2',
      name: 'Liam Weaver',
      bio: 'Textile maker specializing in traditional weaving.',
      location: 'Portland, OR',
      profile_image_url: 'https://example.com/images/liam.jpg',
    },
    {
      id: 'art_3',
      name: 'Sofia Wood',
      bio: 'Woodworker focused on sustainable materials.',
      location: 'Boulder, CO',
      profile_image_url: 'https://example.com/images/sofia.jpg',
    },
  ];

  return artisans.slice(0, limit);
}

