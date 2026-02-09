import Image from "next/image";
import Link from "next/link";
import styles from "@/app/page.module.css";
import type { ArtisanRow } from "@/app/lib/artisans-db";

export default function MeetArtisans({ artisans }: { artisans: ArtisanRow[] }) {
  const safeArtisans = artisans.filter(
    (a): a is ArtisanRow & { slug: string } =>
      typeof a.slug === "string" && a.slug.trim().length > 0
  );

  return (
    <section id="artisans" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2>Meet the Artisans</h2>
        </div>

        <div className={styles.cardGrid}>
          {safeArtisans.map((a) => {
            const imgSrc = `/images/artisans/${a.slug}.jpg`;

            return (
              <Link key={a.id} href={`/artisans/${a.slug}`} className={styles.card}>
                <div className={styles.artisanCardImage}>
                  <Image
                    src={imgSrc}
                    alt={a.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: "cover", objectPosition: "center 20%" }}
                  />
                </div>

                <div className={styles.cardBody}>
                  <p className={styles.artisanName}>{a.name}</p>
                  <p className={styles.artisanLocation}>{a.location}</p>
                  <p className={styles.cardDesc}>{a.short_description}</p>
                </div>
              </Link>
            );
          })}
        </div>

        <div className={styles.centerButton}>
          <Link href="/artisans" className={styles.buttonLink}>
            View All Artisans →
          </Link>
        </div>
      </div>
    </section>
  );
}
