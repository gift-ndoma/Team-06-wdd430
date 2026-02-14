'use server';

import { sql } from '@/library/db';
import { revalidatePath } from 'next/cache';

type ArtisanProfile = {
  id: string;
  name: string;
};

async function getArtisanByEmail(email: string): Promise<ArtisanProfile | null> {
  try {
    const user = await sql<{ id: number; name: string }[]>`
      SELECT id, name FROM users WHERE email = ${email}
    `;
    
    if (!user || user.length === 0) return null;
    
    // First try to match by user_id (proper relationship)
    let artisan = await sql<ArtisanProfile[]>`
      SELECT id, name FROM artisans WHERE user_id = ${user[0].id}
    `;
    
    // Fallback to name matching (temporary until all artisans are linked)
    if (!artisan || artisan.length === 0) {
      artisan = await sql<ArtisanProfile[]>`
        SELECT id, name FROM artisans WHERE name = ${user[0].name}
      `;
    }
    
    return artisan[0] || null;
  } catch (error) {
    console.error('Failed to fetch artisan:', error);
    return null;
  }
}

export async function deleteProduct(productId: string) {
  // For demo purposes, using first artisan
  // In production, you'd get artisan from session/auth
  const artisans = await sql<ArtisanProfile[]>`
    SELECT id, name FROM artisans LIMIT 1
  `;
  
  const artisan = artisans[0];
  
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
  // For demo purposes, using first artisan
  // In production, you'd get artisan from session/auth
  const artisans = await sql<ArtisanProfile[]>`
    SELECT id, name FROM artisans LIMIT 1
  `;
  
  const artisan = artisans[0];
  
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
