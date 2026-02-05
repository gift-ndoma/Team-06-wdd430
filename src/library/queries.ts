// src/library/queries.ts
import { supabase } from "./supabase";
import type { Product, Artisan } from "@/library/types";

/**
 * Get random featured products
 */

export async function getRandomFeaturedProducts(limit: number): Promise<Product[]> {
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
    .limit(limit);

  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }

  // Map the joined artisan name
  return (data ?? []).map((p: any) => ({
    id: p.id,
    name: p.name,
    description: p.description,
    price_cents: p.price_cents,
    image_url: p.image_url,
    artisan_id: p.artisan_id,
    artisan_name: p.artisans?.name ?? null,
  }));
}

/**
 * Get all products
 */
export async function getAllProducts(): Promise<Product[]> {
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
    `);

  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }

  return (data ?? []).map((p: any) => ({
    id: p.id,
    name: p.name,
    description: p.description,
    price_cents: p.price_cents,
    image_url: p.image_url,
    artisan_id: p.artisan_id,
    artisan_name: p.artisans?.name ?? null,
  }));
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

