'use client'

import styles from "@/app/ui/artisans/artisans.module.css";
import { ProductRow } from "@/app/lib/artisans-db";
import { useCart } from "@/components/cart/CartProvider";

function formatCents(cents: number) {
  if (!Number.isFinite(cents)) return "$0.00";
  return `$${(cents / 100).toFixed(2)}`;
}

export default function ArtisanProductTile({
  p,
  key,
}: {
  p: ProductRow;
  key: string;
}) {
  const { addItem } = useCart();
  
  return <div key={key} className={styles.productsRow}>
    <div className={styles.cell}>{p.name}</div>
    <div className={styles.cell}>{formatCents(p.price_cents)}</div>
    <div className={styles.cell}>
      <button
        className={styles.addButton}
        type="button"
        onClick={() => addItem({
          id: p.id,
          name: p.name,
          price_cents: p.price_cents,
          image_url: p.image_url,
        }, 1)}      
      >
        Add to cart
      </button>
    </div>
  </div>
}