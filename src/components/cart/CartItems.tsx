"use client";

import Image from "next/image";
import styles from "@/app/cart/cart.module.css";
import type { CartItem } from "./CartProvider";

type CartItemsProps = {
    items: CartItem[];
    updateQuantity: (productId: string, quantity: number) => void;
    removeItem: (productId: string) => void;
    formatCurrency: (value: number) => string;
};

export default function CartItems({ items, updateQuantity, removeItem, formatCurrency }: CartItemsProps) {
    if (items.length === 0) {
        return <p className={styles.emptyText}>Your cart is empty.</p>;
    }

    return (
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
                            <div className={styles.quantityControl}>
                                <button
                                    type="button"
                                    aria-label={`Decrease quantity for ${item.name}`}
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                >
                                    −
                                </button>
                                <span>{item.quantity}</span>
                                <button
                                    type="button"
                                    aria-label={`Increase quantity for ${item.name}`}
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                    +
                                </button>
                            </div>

                            <p className={styles.itemTotal}>{formatCurrency(itemTotal)}</p>

                            <button type="button" className={styles.removeBtn} onClick={() => removeItem(item.id)}>
                                Remove
                            </button>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
}
