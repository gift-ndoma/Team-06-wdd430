"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/library/types";
import { useCart } from "@/components/cart/CartProvider";
import styles from "@/app/page.module.css";

function formatPrice(cents: number) {
  return new Intl.NumberFormat("en-NZ", {
    style: "currency",
    currency: "NZD",
  }).format(cents / 100);
}

function StarRating({ rating }: { rating: number | null }) {
  if (rating === null) return null;
  const numeric = Number(rating);
  if (isNaN(numeric)) return null;
  const rounded = Math.round(numeric);
  return (
    <div className={styles.starRating} aria-label={`Rated ${rounded} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill={i < rounded ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
      <span className={styles.starLabel}>{numeric.toFixed(1)}</span>
    </div>
  );
}

export default function FeaturedProducts({ products }: { products: Product[] }) {
  // Create an initial quantity map: { [productId]: 1 }
  const initialQty = useMemo(() => {
    const entries = products.map((p) => [p.id, 1] as const);
    return Object.fromEntries(entries) as Record<string, number>;
  }, [products]);

  const [qtyById, setQtyById] = useState<Record<string, number>>(initialQty);
  const { addItem } = useCart();

  function setQty(id: string, next: number) {
    setQtyById((prev) => ({
      ...prev,
      [id]: Math.max(1, next), // never below 1
    }));
  }

  function handleAddToCart(e: React.MouseEvent, product: Product) {
    e.preventDefault();
    e.stopPropagation();
    const qty = qtyById[product.id] ?? 1;

    addItem(product, qty);
  
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
              <Link key={p.id} href={`/products/${p.id}`} className={styles.card}>
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
                    <p className={styles.cardSmallText}>
                      Made by{" "}
                      <button
                        type="button"
                        className={styles.artisanLink}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          window.location.href = `/artisans/${p.artisan_slug}`;
                        }}
                      >
                        {p.artisan_name}
                      </button>
                    </p>
                  )}

                  <StarRating rating={p.rating} />

                  {/* Quantity + Add to Cart */}
                  <div className={styles.cardActions} onClick={(e) => e.preventDefault()}>
                    <div className={styles.qtyControl} aria-label="Quantity selector">
                      <button
                        type="button"
                        className={styles.qtyBtn}
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setQty(p.id, qty - 1); }}
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
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setQty(p.id, qty + 1); }}
                        aria-label={`Increase quantity for ${p.name}`}
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      className={styles.addToCartBtn}
                      onClick={(e) => handleAddToCart(e, p)}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </Link>
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
