"use client";

import { useState } from "react";
import type { CartProduct } from "@/components/cart/CartProvider";
import { useCart } from "@/components/cart/CartProvider";

type AddToCartButtonProps = {
    product: CartProduct;
    className?: string;
};

export default function AddToCartButton({ product, className }: AddToCartButtonProps) {
    const { addItem } = useCart();
    const [added, setAdded] = useState(false);

    return (
        <button
            type="button"
            className={className}
            onClick={() => {
                addItem(product, 1);
                setAdded(true);
                window.setTimeout(() => setAdded(false), 1200);
            }}
            aria-live="polite"
        >
            {added ? "Added!" : "Add to cart"}
        </button>
    );
}