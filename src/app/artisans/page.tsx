import Link from "next/link";
import styles from "@/app/ui/artisans/artisans.module.css";
import ArtisanCard from "@/app/ui/artisans/ArtisanCard";
import { getArtisans } from "@/app/lib/artisans-db";

export default async function Page() {
  const artisans = await getArtisans();

  return (
    <main className={styles.pageWrap}>
      <div className={styles.container}>
        <h1 className={styles.heading}>Welcome to our Artisans</h1>

        <p className={styles.intro}>
          Explore the talented makers behind Handcrafted Haven. Click an artisan
          to read their biography and browse their products.
        </p>

        <div style={{ marginBottom: "1rem" }}>
          <Link href="/">← Back to Home</Link>
        </div>

        <section className={styles.grid} aria-label="Artisan cards">
          {artisans.map((a) => {
            const slug = a.slug ?? a.id; // fallback just in case
            return (
              <ArtisanCard
                key={a.id}
                slug={slug}
                name={a.name}
                shortDescription={a.short_description ?? a.location}
                profileImageUrl={a.profile_image_url}
                imageFocus={a.id === "a1" ? "center 15%" : "center top"}
              />
            );
          })}
        </section>
      </div>
    </main>
  );
}





