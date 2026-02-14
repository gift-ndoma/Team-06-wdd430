import { sql } from '@/library/db';
import ProductList from './ProductList';
import AddProductForm from './AddProductForm';
import styles from './products.module.css';

type Product = {
  id: string;
  name: string;
  description: string;
  price_cents: number;
  image_url: string;
  artisan_id: string;
  artisan_name: string;
};

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

async function getArtisanProducts(artisanId: string): Promise<Product[]> {
  try {
    const products = await sql<Product[]>`
      SELECT * FROM products WHERE artisan_id = ${artisanId}
      ORDER BY name
    `;
    return products;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return [];
  }
}

export default async function ProductsPage() {
  // For demo purposes, showing first artisan
  // In production, you'd identify the artisan by session/auth
  const artisans = await sql<ArtisanProfile[]>`
    SELECT id, name FROM artisans LIMIT 1
  `;
  
  const artisan = artisans[0];

  if (!artisan) {
    return (
      <div className={styles.container}>
        <div className={styles.notFound}>
          <h1>Artisan Profile Not Found</h1>
          <p>Your account is not linked to an artisan profile yet.</p>
        </div>
      </div>
    );
  }

  const products = await getArtisanProducts(artisan.id);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Manage Products</h1>
        <p>Add, edit, or remove your products</p>
      </div>

      <div className={styles.section}>
        <h2>Add New Product</h2>
        <AddProductForm />
      </div>

      <div className={styles.section}>
        <h2>Your Products ({products.length})</h2>
        {products.length === 0 ? (
          <p className={styles.emptyMessage}>You haven&apos;t added any products yet.</p>
        ) : (
          <ProductList products={products} />
        )}
      </div>
    </div>
  );
}
