import { sql } from '@/library/db';
import ProductList from './ProductList';
import AddProductForm from './AddProductForm';
import styles from './products.module.css';
import { getArtisanByEmail } from '../actions';
import getUser from '@/app/lib/getUser';

type Product = {
  id: string;
  name: string;
  description: string;
  price_cents: number;
  image_url: string;
  artisan_id: string;
  artisan_name: string;
};

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
  const user = await getUser();
  const artisan = user ? await getArtisanByEmail(user.email) : null;

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
