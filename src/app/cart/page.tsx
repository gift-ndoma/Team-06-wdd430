"use client";

import Link from "next/link";
import styles from "./cart.module.css";
import CartItems from "@/components/cart/CartItems";
import { useCart } from "@/components/cart/CartProvider";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);

export default function CartPage() {
  const { items, updateQuantity, removeItem } = useCart();
  const subtotal = items.reduce((sum, item) => sum + item.price_cents * item.quantity, 0) / 100;

  return (
    <section className={styles.cartPage}>
      <div className={styles.cartGrid}>
        <div className={styles.itemsCard}>
          <h1 className={styles.title}>Items in Your Cart</h1>

          <CartItems
            items={items}
            updateQuantity={updateQuantity}
            removeItem={removeItem}
            formatCurrency={formatCurrency}
          />
        </div>

        <aside className={styles.summaryCard}>
          <h2 className={styles.summaryTitle}>Order Summary</h2>

          <div className={styles.summaryRow}>
            <span>Subtotal:</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Shipping:</span>
            <span>FREE</span>
          </div>

          <div className={styles.divider} />

          <div className={`${styles.summaryRow} ${styles.totalRow}`}>
            <span>Total:</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>

          <Link href="/checkout" className={styles.checkoutBtn}>
            Proceed to Checkout
          </Link>
          <Link href="/products" className={styles.continueBtn}>
            Continue Shopping
          </Link>
        </aside>
      </div>
    </section>
  );
}
