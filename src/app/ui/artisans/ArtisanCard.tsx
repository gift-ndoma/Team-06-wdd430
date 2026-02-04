import Image from "next/image";
import Link from "next/link";
import styles from "./artisans.module.css";

export default function ArtisanCard({
  slug,
  name,
  shortDescription,
  profileImageUrl,
  imageFocus, // e.g. "center 10%" or "center top"
}: {
  slug: string;
  name: string;
  shortDescription: string;
  profileImageUrl: string;
  imageFocus?: string;
}) {
  return (
    <Link href={`/artisans/${slug}`} className={styles.cardLink}>
      <article className={styles.card} aria-label={`View ${name}`}>
        <div className={styles.cardImageWrap}>
          <Image
            src={profileImageUrl}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className={styles.cardImage}
            style={{ objectPosition: imageFocus ?? "center 20%" }}
          />
        </div>

        <div className={styles.cardBody}>
          <h3 className={styles.cardTitle}>{name}</h3>
          <p className={styles.cardDesc}>{shortDescription}</p>
        </div>
      </article>
    </Link>
  );
}
