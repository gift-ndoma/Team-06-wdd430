'use client';

import { useState } from 'react';
import { deleteProduct } from '../actions';
import styles from './products.module.css';

type Product = {
  id: string;
  name: string;
  description: string;
  price_cents: number;
  image_url: string;
};

export default function ProductList({ products }: { products: Product[] }) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleDelete(productId: string) {
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }

    setDeletingId(productId);
    const result = await deleteProduct(productId);
    
    if (!result.success) {
      alert('Failed to delete product');
      setDeletingId(null);
    }
    // If successful, the page will revalidate and the product will disappear
  }

  return (
    <div className={styles.productGrid}>
      {products.map((product) => (
        <div key={product.id} className={styles.productCard}>
          <div className={styles.productImage}>
            <img src={product.image_url} alt={product.name} />
          </div>
          <div className={styles.productInfo}>
            <h3>{product.name}</h3>
            <p className={styles.productDescription}>{product.description}</p>
            <p className={styles.productPrice}>
              ${(product.price_cents / 100).toFixed(2)}
            </p>
          </div>
          <div className={styles.productActions}>
            <button
              onClick={() => handleDelete(product.id)}
              className={styles.deleteBtn}
              disabled={deletingId === product.id}
            >
              {deletingId === product.id ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
