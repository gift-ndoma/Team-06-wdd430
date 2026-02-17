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
  // ✅ Next.js 16 (in your setup) requires unwrapping params
  const { slug } = await params;

  const safeSlug = decodeURIComponent(slug ?? "").trim();
  if (!safeSlug) return notFound();

  const artisan = await getArtisanBySlug(safeSlug);
  if (!artisan) return notFound();

  const url = artisan.profile_image_url?.trim() || "";
  const dbSlug = artisan.slug?.trim() || safeSlug;

  const profileImg = url || `/images/artisans/${dbSlug}.jpg`;

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
              <ArtisanProductTile key={p.id} p={p} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
