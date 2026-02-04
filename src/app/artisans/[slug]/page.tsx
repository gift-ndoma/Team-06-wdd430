import styles from "@/app/ui/artisans/artisans.module.css";
import { getArtisanBySlug } from "@/app/lib/artisans-db";
import { notFound } from "next/navigation";

function formatCents(cents: number) {
  if (!Number.isFinite(cents)) return "$0.00";
  return `$${(cents / 100).toFixed(2)}`;
}

export default async function ArtisanDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const artisan = await getArtisanBySlug(params.slug);
  if (!artisan) return notFound();

  return (
    <main className={styles.pageWrap}>
      <div className={styles.container}>
        <h1 className={styles.detailTitle}>{artisan.name}</h1>

        <p className={styles.bio}>
          <strong>Location:</strong> {artisan.location}
          <br />
          {artisan.bio}
        </p>

        <section aria-label="Products">
          <div className={styles.productsGrid}>
            <div className={styles.productsHeader}>Product</div>
            <div className={styles.productsHeader}>Price</div>
            <div className={styles.productsHeader}></div>

            {artisan.products.map((p) => (
              <div key={p.id} className={styles.productsRow}>
                <div className={styles.cell}>{p.name}</div>
                <div className={styles.cell}>{formatCents(p.price_cents)}</div>
                <div className={styles.cell}>
                  <button
                    className={styles.addButton}
                    type="button"
                    onClick={() => alert(`Added "${p.name}" to cart (placeholder)`)}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
