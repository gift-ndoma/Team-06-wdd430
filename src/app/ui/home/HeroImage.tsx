import styles from "@/app/page.module.css";

export default function HeroImage() {
  return (<>
    <div className={styles.heroimage}>
      <img
        src="/images/hero-image.png"
        width="5120"
        height="3416"
      />
    </div>
    <div>
      <h1>About Us</h1>
    </div>
  </ >)
}