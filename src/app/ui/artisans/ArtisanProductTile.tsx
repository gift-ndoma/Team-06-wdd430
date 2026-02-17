"use client";

import styles from "@/app/ui/artisans/artisans.module.css";
import type { ProductRow } from "@/app/lib/artisans-db";
import { useCart } from "@/components/cart/CartProvider";

function formatCents(cents: number) {
  if (!Number.isFinite(cents)) return "$0.00";
  return `$${(cents / 100).toFixed(2)}`;
}

export default function ArtisanProductTile({ p }: { p: ProductRow }) {
  const { items, addItem, updateQuantity } = useCart();

  const cartItem = items.find((it) => it.id === p.id);
  const qty = cartItem?.quantity ?? 0;

  return (
    <div className={styles.productsRow}>
      <div className={styles.cell}>{p.name}</div>
      <div className={styles.cell}>{formatCents(p.price_cents)}</div>

      <div className={styles.cell}>
        {qty === 0 ? (
          <button
            className={styles.addButton}
            type="button"
            onClick={() =>
              addItem(
                {
                  id: p.id,
                  name: p.name,
                  price_cents: p.price_cents,
                  image_url: p.image_url,
                },
                1
              )
            }
          >
            Add to cart
          </button>
        ) : (
          <div className={styles.qtyControl} aria-label={`${p.name} quantity controls`}>
            <button
              type="button"
              className={styles.qtyBtn}
              aria-label={`Decrease quantity for ${p.name}`}
              onClick={() => updateQuantity(p.id, qty - 1)}
            >
              −
            </button>

            <span className={styles.qtyValue} aria-label={`${p.name} quantity in cart`}>
              {qty}
            </span>

            <button
              type="button"
              className={styles.qtyBtn}
              aria-label={`Increase quantity for ${p.name}`}
              onClick={() =>
                addItem(
                  {
                    id: p.id,
                    name: p.name,
                    price_cents: p.price_cents,
                    image_url: p.image_url,
                  },
                  1
                )
              }
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
