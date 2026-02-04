'use client'

import styles from "@/app/ui/artisans/artisans.module.css";
import { ProductRow } from "@/app/lib/artisans-db";

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
  return <div key={key} className={styles.productsRow}>
    <div className={styles.cell}>{p.name}</div>
    <div className={styles.cell}>{formatCents(p.price_cents)}</div>
    <div className={styles.cell}>
      <button
        className={styles.addButton}
        type="button"
        onClick={() => alert(`Added "${p.name}" to cart (placeholder)`)}
      >
        Add to cart
      </button>
    </div>
  </div>
}