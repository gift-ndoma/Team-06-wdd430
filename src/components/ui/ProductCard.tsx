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
