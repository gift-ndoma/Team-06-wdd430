import Image from "next/image";
import styles from "@/app/ui/artisans/artisans.module.css";
import { getArtisanBySlug } from "@/app/lib/artisans-db";
import { notFound } from "next/navigation";
import ArtisanProductTile from "@/app/ui/artisans/ArtisanProductTile";
import type { ProductRow } from "@/app/lib/artisans-db";

export default async function ArtisanDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // ✅ Next.js 16 requires unwrapping

  if (!slug) return notFound(); // extra safety

  const artisan = await getArtisanBySlug(slug);
  if (!artisan) return notFound();

  const profileImg = `/images/artisans/${slug}.jpg`;

  return (
    <main className={styles.pageWrap}>
      <div className={styles.container}>
        <h1 className={styles.detailTitle}>{artisan.name}</h1>

        <div className={styles.detailHeroImage}>
          <Image
            src={profileImg}
            alt={`${artisan.name} profile photo`}
            width={900}
            height={500}
            style={{ objectFit: "cover", width: "100%", height: "auto" }}
            priority
          />
        </div>

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

            {artisan.products.map((p: ProductRow) => (
              <ArtisanProductTile p={p} key={p.id} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
