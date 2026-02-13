import Link from "next/link";
import styles from "./thank-you.module.css";

export default function ThankYouPage() {
    return (
        <section className={styles.thankYouPage}>
            <div className={styles.card}>
                <h1 className={styles.title}>Thank You for Shopping With Us!</h1>
                <p className={styles.message}>
                    Your payment was successful and your order is now being prepared.
                </p>
                <Link href="/products" className={styles.ctaButton}>
                    Continue Browsing Products
                </Link>
            </div>
        </section>
    );
}
