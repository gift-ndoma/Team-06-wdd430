// src/app/artisans/page.tsx
import styles from "@/app/ui/artisans/artisans.module.css";
import { getArtisans } from "@/app/lib/artisans-db";
import ArtisanCard from "@/app/ui/artisans/ArtisanCard";

export default async function ArtisansPage() {
  const artisans = await getArtisans();

  // ✅ Option A: only render artisans that have a slug (so links/images always work)
  const safeArtisans = artisans.filter(
    (a): a is typeof a & { slug: string } =>
      typeof a.slug === "string" && a.slug.trim().length > 0
  );

  return (
    <main className={styles.pageWrap}>
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>Our Artisans</h1>

        <div className={styles.grid}>
          {safeArtisans.map((a) => (
            <ArtisanCard
              key={a.id}
              slug={a.slug} // ✅ guaranteed string
              name={a.name}
              shortDescription={a.short_description ?? ""}
              profileImageUrl={`/images/artisans/${a.slug}.jpg`} // ✅ always string
            />
          ))}
        </div>
      </div>
    </main>
  );
}
