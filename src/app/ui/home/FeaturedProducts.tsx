"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/library/types";
import styles from "@/app/page.module.css";

function formatPrice(cents: number) {
  return new Intl.NumberFormat("en-NZ", {
    style: "currency",
    currency: "NZD",
  }).format(cents / 100);
}

export default function FeaturedProducts({ products }: { products: Product[] }) {
  // Create an initial quantity map: { [productId]: 1 }
  const initialQty = useMemo(() => {
    const entries = products.map((p) => [p.id, 1] as const);
    return Object.fromEntries(entries) as Record<string, number>;
  }, [products]);

  const [qtyById, setQtyById] = useState<Record<string, number>>(initialQty);

  function setQty(id: string, next: number) {
    setQtyById((prev) => ({
      ...prev,
      [id]: Math.max(1, next), // never below 1
    }));
  }

  function handleAddToCart(product: Product) {
    const qty = qtyById[product.id] ?? 1;

    // Temporary placeholder until you build the real cart
    console.log("Add to cart:", { productId: product.id, name: product.name, qty });
    alert(`Added ${qty} × ${product.name} to cart (placeholder).`);
  
    // ✅ Reset quantity back to 1 after adding
    setQtyById((prev) => ({
        ...prev,
        [product.id]: 1,
    }));
    }

  return (
    <section id="featured" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2>Featured Products</h2>
        </div>

        <div className={styles.cardGrid}>
          {products.map((p) => {
            const qty = qtyById[p.id] ?? 1;

            return (
              <div key={p.id} className={styles.card}>
                <div className={styles.cardImage}>
                  <Image
                    src={p.image_url}
                    alt={p.name}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>

                <div className={styles.cardBody}>
                  <div className={styles.cardTopRow}>
                    <h3>{p.name}</h3>
                    <span>{formatPrice(p.price_cents)}</span>
                  </div>

                  <p className={styles.cardDesc}>{p.description}</p>

                  {p.artisan_name && (
                    <p className={styles.cardSmallText}>Made by {p.artisan_name}</p>
                  )}

                  {/* Quantity + Add to Cart */}
                  <div className={styles.cardActions}>
                    <div className={styles.qtyControl} aria-label="Quantity selector">
                      <button
                        type="button"
                        className={styles.qtyBtn}
                        onClick={() => setQty(p.id, qty - 1)}
                        aria-label={`Decrease quantity for ${p.name}`}
                      >
                        –
                      </button>

                      <span className={styles.qtyValue} aria-label={`Quantity: ${qty}`}>
                        {qty}
                      </span>

                      <button
                        type="button"
                        className={styles.qtyBtn}
                        onClick={() => setQty(p.id, qty + 1)}
                        aria-label={`Increase quantity for ${p.name}`}
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      className={styles.addToCartBtn}
                      onClick={() => handleAddToCart(p)}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Button under the cards */}
        <div className={styles.centerButton}>
          <Link href="/products" className={styles.buttonLink}>
            View all products →
          </Link>
        </div>
      </div>
    </section>
  );
}
