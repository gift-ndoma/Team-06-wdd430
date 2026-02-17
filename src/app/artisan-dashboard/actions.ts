'use server';

import { sql } from '@/library/db';
import { revalidatePath } from 'next/cache';
import getUser from '@/app/lib/getUser';

type ArtisanProfile = {
  id: string;
  name: string;
  bio: string;
  location: string;
  profile_image_url: string;
  slug?: string;
  short_description?: string;
};

export async function getArtisanByEmail(email: string): Promise<ArtisanProfile | null> {
  try {
    const artisan = await sql<ArtisanProfile[]>`
      SELECT 
        artisans.id,
        artisans.name,
        bio,
        location,
        profile_image_url,
        slug,
        short_description
      FROM artisans JOIN users ON users.artisan_id = artisans.id WHERE email = ${email}
    `;
    
    return artisan[0] || null;
  } catch (error) {
    console.error('Failed to fetch artisan:', error);
    return null;
  }
}

export async function deleteProduct(productId: string) {
  const user = await getUser();
  if(!user) return { success: false, error: 'Failed to fetch user' };
  const artisan = await getArtisanByEmail(user.email);
  
  if (!artisan) {
    throw new Error('Artisan not found');
  }

  try {
    // Verify the product belongs to this artisan before deleting
    await sql`
      DELETE FROM products 
      WHERE id = ${productId} AND artisan_id = ${artisan.id}
    `;
    
    revalidatePath('/artisan-dashboard/products');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete product:', error);
    return { success: false, error: 'Failed to delete product' };
  }
}

export async function addProduct(formData: FormData) {
  const user = await getUser();
  if(!user) return { success: false, error: 'Failed to fetch user' };
  const artisan = await getArtisanByEmail(user.email);
  
  if (!artisan) {
    throw new Error('Artisan not found');
  }

  const name = formData.get('name')?.toString();
  const description = formData.get('description')?.toString();
  const priceStr = formData.get('price')?.toString();
  const imageUrl = formData.get('image_url')?.toString();

  if (!name || !description || !priceStr || !imageUrl) {
    return { success: false, error: 'All fields are required' };
  }

  const price = parseFloat(priceStr);
  if (isNaN(price) || price <= 0) {
    return { success: false, error: 'Invalid price' };
  }

  const priceCents = Math.round(price * 100);

  try {
    // Generate a unique ID
    const productId = `p-${artisan.id}-${Date.now()}`;
    
    await sql`
      INSERT INTO products (id, name, description, price_cents, image_url, artisan_id, artisan_name)
      VALUES (${productId}, ${name}, ${description}, ${priceCents}, ${imageUrl}, ${artisan.id}, ${artisan.name})
    `;
    
    revalidatePath('/artisan-dashboard/products');
    return { success: true };
  } catch (error) {
    console.error('Failed to add product:', error);
    return { success: false, error: 'Failed to add product' };
  }
}
