"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/library/types";
import { useCart } from "@/components/cart/CartProvider";
import styles from "./ProductCard.module.css";

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

export default function ProductCard({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const { addItem } = useCart();


  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, qty);
    setQty(1);
  }

  return (
    <Link href={`/products/${product.id}`} className={styles.card}>
      <div className={styles.cardImage}>
        <Image
          src={product.image_url}
          alt={product.name}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>

      <div className={styles.cardBody}>
        <div className={styles.cardTopRow}>
          <h3>{product.name}</h3>
          <span>{formatPrice(product.price_cents)}</span>
        </div>

        <p className={styles.cardDesc}>{product.description}</p>

        {product.artisan_name && (
          <p className={styles.cardSmallText}>
            Made by{" "}
            <button
              type="button"
              className={styles.artisanLink}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.location.href = `/artisans/${product.artisan_slug}`;
              }}
            >
              {product.artisan_name}
            </button>
          </p>
        )}

        <StarRating rating={product.rating} />

        <div className={styles.cardActions} onClick={(e) => e.preventDefault()}>
          <div className={styles.qtyControl} aria-label="Quantity selector">
            <button
              type="button"
              className={styles.qtyBtn}
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setQty((q) => Math.max(1, q - 1)); }}
              aria-label={`Decrease quantity for ${product.name}`}
            >
              –
            </button>

            <span className={styles.qtyValue} aria-label={`Quantity: ${qty}`}>
              {qty}
            </span>

            <button
              type="button"
              className={styles.qtyBtn}
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setQty((q) => q + 1); }}
              aria-label={`Increase quantity for ${product.name}`}
            >
              +
            </button>
          </div>

          <button
            type="button"
            className={styles.addToCartBtn}
            onClick={handleAddToCart}
          >
            Add to cart
          </button>
        </div>
      </div>
    </Link>
  );
}
