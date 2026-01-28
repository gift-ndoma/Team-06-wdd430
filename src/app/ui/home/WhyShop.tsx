import styles from "@/app/page.module.css";

const points = [
  {
    title: "Support Local",
    body: "Every purchase directly supports real Artisan Makers.",
  },
  {
    title: "One-of-a-kind",
    body: "Unique pieces you won't find anywhere else in big stores.",
  },
  {
    title: "Made to last",
    body: "Craftsmanship, quality materials, and care goes into the products our Artisans make.",
  },
];

export default function WhyShop() {
  return (
    <section id="why" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2>Why Shop With Us</h2>
        </div>

        <ul className={styles.whyList}>
          {points.map((p) => (
            <li key={p.title} className={styles.whyItem}>
              <h3 className={styles.whyTitle}>{p.title}</h3>
              <p className={styles.whyBody}>{p.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
