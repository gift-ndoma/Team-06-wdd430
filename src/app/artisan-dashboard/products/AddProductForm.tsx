'use client';

import { useState } from 'react';
import { addProduct } from '../actions';
import styles from './products.module.css';

export default function AddProductForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setMessage(null);

    const result = await addProduct(formData);

    if (result.success) {
      setMessage({ type: 'success', text: 'Product added successfully!' });
      // Reset form
      const form = document.getElementById('add-product-form') as HTMLFormElement;
      form?.reset();
    } else {
      setMessage({ type: 'error', text: result.error || 'Failed to add product' });
    }

    setIsSubmitting(false);
  }

  return (
    <div className={styles.formCard}>
      <form id="add-product-form" action={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="e.g., Handmade Ceramic Mug"
            disabled={isSubmitting}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            required
            placeholder="Describe your product..."
            rows={4}
            disabled={isSubmitting}
          />
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="price">Price ($)</label>
            <input
              type="number"
              id="price"
              name="price"
              step="0.01"
              min="0"
              required
              placeholder="29.99"
              disabled={isSubmitting}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="image_url">Image URL</label>
            <input
              type="url"
              id="image_url"
              name="image_url"
              required
              placeholder="https://..."
              disabled={isSubmitting}
            />
          </div>
        </div>

        {message && (
          <div className={`${styles.message} ${styles[message.type]}`}>
            {message.text}
          </div>
        )}

        <button 
          type="submit" 
          className={styles.submitBtn}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adding...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
}
