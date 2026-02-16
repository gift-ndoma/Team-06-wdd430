import styles from "@/app/ui/artisans/artisans.module.css";
import { getArtisans, type ArtisanRow } from "@/app/lib/artisans-db";
import ArtisanCard from "@/app/ui/artisans/ArtisanCard";

function pickProfileImageUrl(a: ArtisanRow) {
  const url = a.profile_image_url?.trim();

  // If DB has a URL/path, use it (works for https://... AND /images/...)
  if (url) return url;

  // Otherwise fall back to the legacy local jpg naming
  const slug = a.slug?.trim();
  if (slug) return `/images/artisans/${slug}.jpg`;

  return "/images/artisans/placeholder.jpg";
}

export default async function ArtisansPage() {
  const artisans = await getArtisans();

  // Keep only artisans that have a usable slug
  const safeArtisans = artisans
    .map((a) => ({ ...a, slug: a.slug?.trim() ?? null }))
    .filter((a): a is ArtisanRow & { slug: string } => !!a.slug);

  return (
    <main className={styles.pageWrap}>
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>Our Artisans</h1>

        <div className={styles.grid}>
          {safeArtisans.map((a) => (
            <ArtisanCard
              key={a.id}
              slug={a.slug} // trimmed + non-null
              name={a.name}
              shortDescription={a.short_description ?? ""}
              profileImageUrl={pickProfileImageUrl(a)}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
