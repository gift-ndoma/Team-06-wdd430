"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import type { Product } from "@/library/types";

export type CartItem = {
    id: string;
    name: string;
    price_cents: number;
    image_url: string;
    quantity: number;
};

export type CartProduct = Pick<Product, "id" | "name" | "price_cents" | "image_url">;

type CartContextValue = {
    items: CartItem[];
    itemCount: number;
    addItem: (product: CartProduct, quantity?: number) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    removeItem: (productId: string) => void;
    clearCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);
const STORAGE_KEY = "handcrafted-haven-cart";

function safeParseCart(raw: string | null): CartItem[] {
    if (!raw) return [];
    try {
        const parsed = JSON.parse(raw) as CartItem[];
        if (!Array.isArray(parsed)) return [];
        return parsed.filter((item) => item && typeof item.id === "string");
    } catch {
        return [];
    }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const hasHydrated = useRef(false);

    useEffect(() => {
        const stored = safeParseCart(window.localStorage.getItem(STORAGE_KEY));
        setItems(stored);
        hasHydrated.current = true;
    }, []);

    useEffect(() => {
        if (!hasHydrated.current) return;
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }, [items]);

    const addItem = useCallback((product: CartProduct, quantity = 1) => {
        setItems((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
                );
            }

            return [
                ...prev,
                {
                    id: product.id,
                    name: product.name,
                    price_cents: product.price_cents,
                    image_url: product.image_url,
                    quantity,
                },
            ];
        });
    }, []);

    const updateQuantity = useCallback((productId: string, quantity: number) => {
        setItems((prev) =>
            prev
            .map((item) =>
                item.id === productId ? { ...item, quantity } : item
            )
            .filter((item) => item.quantity > 0)
            );
    }, []);

    const removeItem = useCallback((productId: string) => {
        setItems((prev) => prev.filter((item) => item.id !== productId));
    }, []);

    const clearCart = useCallback(() => {
        setItems([]);
    }, []);

    const itemCount = useMemo(
        () => items.reduce((sum, item) => sum + item.quantity, 0),
        [items]
    );

    const value = useMemo(
        () => ({
            items,
            itemCount,
            addItem,
            updateQuantity,
            removeItem,
            clearCart,
        }),
        [items, itemCount, addItem, updateQuantity, removeItem, clearCart]
    );

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within CartProvider");
    }
    return context;
}