import Image from "next/image";
import Link from "next/link";
import type { Artisan } from "@/library/types";
import styles from "@/app/page.module.css";

export default function MeetArtisans({ artisans }: { artisans: Artisan[] }) {
  return (
    <section id="artisans" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2>Meet the Artisans</h2>
        </div>

        <div className={styles.cardGrid}>
          {artisans.map((a) => (
            <div key={a.id} className={styles.card}>
              {/* Bigger photo at top of card */}
              <div className={styles.artisanCardImage}>
                <Image
                  src={a.profile_image_url}
                  alt={a.name}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>

              <div className={styles.cardBody}>
                <div className={styles.artisanTopRow}>
                  <div className={styles.avatarWrap}>
                    <Image
                      src={a.profile_image_url}
                      alt={a.name}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>

                  <div>
                    <p className={styles.artisanName}>{a.name}</p>
                    <p className={styles.artisanLocation}>{a.location}</p>
                  </div>
                </div>

                <p className={styles.cardDesc}>{a.bio}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Button under the artisan cards */}
        <div className={styles.centerButton}>
          <Link href="/artisans" className={styles.buttonLink}>
            View All Artisans →
          </Link>
        </div>
      </div>
    </section>
  );
}
