"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/cart/CartProvider";
import styles from "./checkout.module.css";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart } = useCart();
  const subtotal = items.reduce((sum, item) => sum + item.price_cents * item.quantity, 0) / 100;

  const handlePay = () => {
    clearCart();
    router.push("/checkout/thank-you");
  };

  return (
    <section className={styles.checkoutPage}>
      <div className={styles.checkoutGrid}>
        <div className={styles.itemsCard}>
          <h1 className={styles.title}>Checkout</h1>

          {items.length === 0 ? (
            <p className={styles.emptyText}>Your cart is empty. Add items before checking out.</p>
          ) : (
            <ul className={styles.itemList}>
              {items.map((item) => {
                const itemTotal = (item.price_cents * item.quantity) / 100;

                return (
                  <li key={item.id} className={styles.itemRow}>
                    <div className={styles.itemLeft}>
                      <div className={styles.imageWrap}>
                        <Image
                          src={item.image_url}
                          alt={item.name}
                          fill
                          sizes="120px"
                          className={styles.itemImage}
                        />
                      </div>

                      <div>
                        <h2 className={styles.itemName}>{item.name}</h2>
                        <p className={styles.itemPrice}>{formatCurrency(item.price_cents / 100)}</p>
                      </div>
                    </div>

                    <div className={styles.itemRight}>
                      <p className={styles.itemQuantity}>Qty: {item.quantity}</p>
                      <p className={styles.itemTotal}>{formatCurrency(itemTotal)}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
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

          <button type="button" className={styles.payBtn} onClick={handlePay} disabled={items.length === 0}>
            Pay Now
          </button>
          <Link href="/cart" className={styles.backBtn}>
            Back to Cart
          </Link>
        </aside>
      </div>
    </section>
  );
}