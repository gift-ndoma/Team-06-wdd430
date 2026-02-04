import styles from "@/app/ui/artisans/artisans.module.css";
import { getArtisanBySlug } from "@/app/lib/artisans-db";
import { notFound } from "next/navigation";
import ArtisanProductTile from "@/app/ui/artisans/ArtisanProductTile"
import { ProductRow } from "@/app/lib/artisans-db";

export default async function ArtisanDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const artisan = await getArtisanBySlug((await params).slug);
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

            {artisan.products.map((p: ProductRow) => (<ArtisanProductTile p={p} key={p.id} />))}
          </div>
        </section>
      </div>
    </main>
  );
}
